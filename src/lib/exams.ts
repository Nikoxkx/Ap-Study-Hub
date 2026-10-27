import { examBlueprints, getBlueprint } from "@/content/exams/blueprints";
import { apLitFrqs, apLitQuestions, apLitStimuli } from "@/content/exams/apLit";
import {
  apushSaqStimuli,
  authoredFrqs,
  govStimuli,
} from "@/content/exams/authored";
import {
  bioSupplements,
  envSupplements,
  govSupplements,
  macroSupplements,
} from "@/content/exams/supplements";
import {
  coachLibrary,
  dbqRubric,
  leqRubric,
  seminarPartARubric,
  seminarPartBRubric,
  sixPointArgument,
  sixPointLiterary,
  sixPointRhetorical,
  sixPointSynthesis,
  saqRubric,
  govConceptRubric,
  govQuantRubric,
  govScotusRubric,
  govArgumentRubric,
  researchPaperRubric,
} from "@/content/exams/rubrics";
import type {
  Assessment,
  Rubric,
  CoachGuide,
  ExamFrq,
  ExamQuestion,
  ExamSection,
  ResolvedSection,
  ScoreCurve,
  Stimulus,
} from "@/content/exams/types";
import type { CourseBundle } from "./catalog";
import { mockExamsData } from "./data";
import { getCourse } from "./catalog";

/**
 * The assessment engine.
 *
 * It does four jobs:
 *   1. resolves a course's blueprint into a paper with real questions attached;
 *   2. adapts the site's existing written prompts into the official section
 *      structure, so nothing already written is thrown away;
 *   3. scores the paper the way the exam weights it, and converts the composite
 *      to an estimated AP score using published cut-score estimates;
 *   4. groups performance by skill and by unit so the review screen can say
 *      which lesson to open next.
 *
 * Question selection is deterministic: the same course always produces the same
 * paper, spread across units, so a student can retake it and compare attempts.
 */

const authoredQuestionBanks: Record<string, ExamQuestion[]> = {
  "ap-lit": apLitQuestions,
  "ap-gov": govSupplements,
  "ap-bio": bioSupplements,
  "ap-macro": macroSupplements,
  "ap-env": envSupplements,
};

const authoredStimuli: Record<string, Stimulus[]> = {
  "ap-lit": apLitStimuli,
  apush: apushSaqStimuli,
  "ap-gov": govStimuli,
};

const frqRegistry = new Map<string, ExamFrq>();
for (const frq of [...apLitFrqs, ...authoredFrqs]) frqRegistry.set(frq.id, frq);

/* ------------------------------------------------------------------ */
/* Legacy prompt adaptation                                            */
/* ------------------------------------------------------------------ */

const legacyIds: Record<string, string[]> = {
  "ap-lang": ["ap-lang-synthesis", "ap-lang-rhetorical", "ap-lang-argument"],
  apush: ["apush-dbq-1", "apush-leq-1"],
  "ap-seminar": ["ap-seminar-part-a", "ap-seminar-part-b"],
};

const legacyRubricByType: Record<string, Rubric> = {
  Synthesis: sixPointSynthesis,
  "Rhetorical Analysis": sixPointRhetorical,
  Argument: sixPointArgument,
  DBQ: dbqRubric,
  LEQ: leqRubric,
  "Part A Analysis": seminarPartARubric,
  "Part B Argument": seminarPartBRubric,
};

const legacyCoachByType: Record<string, CoachGuide> = {
  Synthesis: coachLibrary.synthesis(40),
  "Rhetorical Analysis": coachLibrary.rhetorical(40),
  Argument: coachLibrary.argument(40),
  DBQ: coachLibrary.dbq(60),
  LEQ: coachLibrary.dbq(40),
  "Part A Analysis": coachLibrary.seminarA(30),
  "Part B Argument": coachLibrary.seminarB(90),
};

/** Split "instructions --- passage" prompts so the passage becomes a stimulus. */
function splitPrompt(text: string): { prompt: string; passage?: string } {
  const marker = text.indexOf("\n\n---\n\n");
  if (marker === -1) return { prompt: text };
  return { prompt: text.slice(0, marker).trim(), passage: text.slice(marker + 7).trim() };
}

function buildLegacyFrqs(): void {
  for (const [slug, exams] of Object.entries(mockExamsData)) {
    const ids = legacyIds[slug];
    if (!ids) continue;
    const prompts = exams.flatMap((exam) =>
      exam.sections.flatMap((section) =>
        (section.frqPrompts ?? []).map((prompt) => ({ section, prompt })),
      ),
    );
    prompts.forEach(({ section, prompt }, index) => {
      const id = ids[index];
      if (!id) return;
      const { prompt: text, passage } = splitPrompt(prompt.prompt);
      const stimuli: Stimulus[] = [];
      if (passage) {
        stimuli.push({
          id: `${id}-passage`,
          title: "Passage for analysis",
          kind: "prose",
          attribution: "Original constructed passage written for practice; not a transcript or a published text.",
          text: passage,
        });
      }
      for (const source of prompt.sources ?? []) {
        // The documents in the legacy bank open with their own source line
        // ("Jacob Riis, How the Other Half Lives, 1890:"), which a DBQ booklet
        // prints above the excerpt. Lift it into the caption so the reading
        // pane names the document instead of just numbering it.
        const firstLine = source.content.split("\n")[0]?.trim() ?? "";
        const generic = /^(document|source)\s+[A-F0-9]+$/i.test(source.title.trim());
        stimuli.push({
          id: `${id}-${source.id}`,
          title: generic && firstLine ? `${source.title} · ${firstLine.replace(/:$/, "").slice(0, 90)}` : source.title,
          kind: "source",
          attribution:
            "Historical document reprinted for practice with its original context note. Check the wording against the published source before quoting it in an essay.",
          text: source.content,
        });
      }
      const rubric = legacyRubricByType[prompt.type] ?? sixPointArgument;
      const minutes = Math.max(
        10,
        Math.round(section.timeMinutes / Math.max(1, section.frqPrompts?.length ?? 1)),
      );
      const coach =
        legacyCoachByType[prompt.type]??
        coachLibrary.argument(minutes);
      frqRegistry.set(id, {
        id,
        taskType: prompt.type,
        title: prompt.type,
        prompt: text,
        directions: section.instructions,
        minutes,
        rubricId: rubric.id,
        rubric,
        stimulusIds: stimuli.map((stimulus) => stimulus.id),
        points: rubric.total,
        coach: { ...coach, timeline: scaleTimeline(coach, minutes) },
        modelPath: [
          "Thesis that answers the prompt in one sentence.",
          "Evidence from at least three of the provided sources, explained rather than quoted.",
          "An alternative perspective answered before the conclusion.",
        ],
      });
      for (const stimulus of stimuli) authoredStimuli[slug] = [...(authoredStimuli[slug] ?? []), stimulus];
    });
  }
}

/**
 * The shared coaching timelines are written for a 40-minute essay. When a
 * section gives a different clock, the draft phase absorbs the difference so a
 * student is never told to spend 63 minutes drafting a 15-minute answer.
 */
function scaleTimeline(coach: CoachGuide, minutes: number): CoachGuide["timeline"] {
  const total = coach.timeline.reduce((sum, item) => sum + item.minutes, 0);
  if (!total) return coach.timeline;
  const scaled = coach.timeline.map((item) => ({
    ...item,
    minutes: Math.max(1, Math.round((item.minutes / total) * minutes)),
  }));
  const drift = minutes - scaled.reduce((sum, item) => sum + item.minutes, 0);
  if (drift !== 0) scaled[scaled.length - 1].minutes = Math.max(1, scaled[scaled.length - 1].minutes + drift);
  return scaled;
}

buildLegacyFrqs();

/* ------------------------------------------------------------------ */
/* Question selection                                                  */
/* ------------------------------------------------------------------ */

function bankQuestions(course: CourseBundle): ExamQuestion[] {
  return course.questions.map((question) => ({
    key: `bank-${course.subject.slug}-${question.id}`,
    question: question.question,
    options: question.options,
    correctIndex: question.correctIndex,
    explanation: question.explanation,
    skill: question.skill ?? "Course-wide reasoning",
    unitNumber: question.unitNumber,
    lessonTitle: question.lessonTitle,
  }));
}

/**
 * Take `count` questions with the widest possible unit coverage: round-robin
 * across units, in unit order. Authored exam items (which carry their own
 * stimuli) are placed first when a course supplies them.
 */

/**
 * Even out the answer key.
 *
 * The authored banks were written course by course, and writers (like most
 * people) drift towards "B" when inventing options: across the ten papers the
 * correct answer was B roughly 60% of the time and D almost never. That makes a
 * practice paper gameable and it is nothing like a real key, which is roughly
 * uniform. Options are rotated, never reordered or edited, so each question's
 * content and explanation are untouched while the letters come out balanced.
 */
function hashKey(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

function balanceAnswerKey(questions: ExamQuestion[]): ExamQuestion[] {
  const counts: number[] = [];
  return questions.map((question) => {
    const size = question.options.length;
    if (size < 2) return question;
    while (counts.length < size) counts.push(0);
    const fewest = Math.min(...counts.slice(0, size));
    const candidates = counts
      .slice(0, size)
      .map((count, index) => (count === fewest ? index : -1))
      .filter((index) => index >= 0);
    const target = candidates[hashKey(question.key) % candidates.length];
    counts[target] += 1;
    const shift = (target - question.correctIndex + size) % size;
    if (!shift) return question;
    return {
      ...question,
      options: [
        ...question.options.slice(size - shift),
        ...question.options.slice(0, size - shift),
      ],
      correctIndex: target,
    };
  });
}

function selectQuestions(pool: ExamQuestion[], count: number): ExamQuestion[] {
  const seen = new Set<string>();
  const unique = pool.filter((question) => {
    const key = question.question.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const byUnit = new Map<number, ExamQuestion[]>();
  for (const question of unique) {
    const unit = question.unitNumber ?? 0;
    const list = byUnit.get(unit) ?? [];
    list.push(question);
    byUnit.set(unit, list);
  }
  const units = [...byUnit.keys()].sort((a, b) => a - b);
  const selected: ExamQuestion[] = [];
  let index = 0;
  while (selected.length < Math.min(count, unique.length)) {
    let added = false;
    for (const unit of units) {
      const list = byUnit.get(unit) ?? [];
      if (index < list.length) {
        selected.push(list[index]);
        added = true;
        if (selected.length >= count) break;
      }
    }
    if (!added) break;
    index += 1;
  }
  return selected;
}

const assessmentCache = new Map<string, Assessment>();

export function getAssessment(slug: string): Assessment | null {
  const cached = assessmentCache.get(slug);
  if (cached) return cached;
  const blueprint = getBlueprint(slug);
  if (!blueprint) return null;
  const course = getCourse(slug);
  if (!course) return null;

  const authored = authoredQuestionBanks[slug] ?? [];
  const pool = blueprint.questionSource === "authored" ? authored : [...authored, ...bankQuestions(course)];

  const stimuliById = new Map<string, Stimulus>();
  for (const stimulus of authoredStimuli[slug] ?? []) stimuliById.set(stimulus.id, stimulus);

  const remaining = [...pool];
  const sections: ResolvedSection[] = blueprint.sections.map((section: ExamSection) => {
    let questions: ExamQuestion[] = [];
    if (section.type === "mcq" && section.questionCount) {
      questions = balanceAnswerKey(selectQuestions(remaining, section.questionCount));
      const used = new Set(questions.map((question) => question.key));
      for (let i = remaining.length - 1; i >= 0; i -= 1) {
        if (used.has(remaining[i].key)) remaining.splice(i, 1);
      }
    }
    const frqs = (section.frqIds ?? [])
      .map((id) => frqRegistry.get(id))
      .filter((frq): frq is ExamFrq => Boolean(frq));
    for (const frq of frqs) {
      for (const stimulusId of frq.stimulusIds ?? []) {
        if (!stimuliById.has(stimulusId)) {
          stimuliById.set(stimulusId, {
            id: stimulusId,
            title: "Source",
            kind: "source",
            text: "This source belongs to a prompt whose text is shown in the question.",
          });
        }
      }
    }
    const sectionStimuli = new Set<string>();
    for (const question of questions) if (question.stimulusId) sectionStimuli.add(question.stimulusId);
    for (const frq of frqs) for (const id of frq.stimulusIds ?? []) sectionStimuli.add(id);

    return {
      ...section,
      questions,
      frqs,
      stimuli: [...sectionStimuli]
        .map((id) => stimuliById.get(id))
        .filter((stimulus): stimulus is Stimulus => Boolean(stimulus)),
      points: frqs.reduce((sum, frq) => sum + frq.points, 0),
    };
  });

  const resolvedStimuli: Stimulus[] = [];
  const seenStimuli = new Set<string>();
  for (const section of sections) {
    for (const stimulus of section.stimuli) {
      if (seenStimuli.has(stimulus.id)) continue;
      seenStimuli.add(stimulus.id);
      resolvedStimuli.push(stimulus);
    }
  }

  const assessment: Assessment = {
    blueprint,
    sections,
    totalMinutes: blueprint.sections.reduce((sum, section) => sum + section.minutes, 0),
    totalPoints: sections.reduce((sum, section) => sum + section.points, 0),
    mcqCount: sections.reduce((sum, section) => sum + section.questions.length, 0),
    frqCount: sections.reduce((sum, section) => sum + section.frqs.length, 0),
    stimuli: resolvedStimuli,
  };
  assessmentCache.set(slug, assessment);
  return assessment;
}

export function getInterimAssessments(): { slug: string; title: string; minutes: number; mcqCount: number; frqCount: number }[] {
  return examBlueprints.map((blueprint) => {
    const assessment = getAssessment(blueprint.slug);
    return {
      slug: blueprint.slug,
      title: blueprint.title,
      minutes: assessment?.totalMinutes ?? blueprint.timedMinutes,
      mcqCount: assessment?.mcqCount ?? 0,
      frqCount: assessment?.frqCount ?? 0,
    };
  });
}

const sharedRubrics: Record<string, Rubric> = {
  "six-literary": sixPointLiterary,
  "six-rhetorical": sixPointRhetorical,
  "six-argument": sixPointArgument,
  "six-synthesis": sixPointSynthesis,
  "saq-three": saqRubric,
  "gov-concept-three": govConceptRubric,
  "gov-quant-four": govQuantRubric,
  "gov-scotus-four": govScotusRubric,
  "gov-argument-six": govArgumentRubric,
  "seminar-a": seminarPartARubric,
  "seminar-b": seminarPartBRubric,
  "research-paper": researchPaperRubric,
};

/**
 * Resolve the rubric a task is marked against: the task's own rows first, then
 * the shared registry by `rubricId`, then the legacy type mapping. The grading
 * route calls this server-side so a client cannot substitute a gentler rubric.
 */
export function getRubricForFrq(frq: ExamFrq): Rubric | null {
  return frq.rubric ?? sharedRubrics[frq.rubricId] ?? legacyRubricByType[frq.taskType] ?? null;
}

/* ------------------------------------------------------------------ */
/* Scoring                                                             */
/* ------------------------------------------------------------------ */

export interface SectionScore {
  sectionId: string;
  name: string;
  correct: number;
  total: number;
  earned: number;
  possible: number;
}

export interface AssessmentScore {
  mcqCorrect: number;
  mcqTotal: number;
  mcqPercent: number | null;
  frqEarned: number;
  frqPossible: number;
  frqPercent: number | null;
  composite: number;
  apScore: number | null;
  sections: SectionScore[];
}

export function estimateApScore(composite: number, curve: ScoreCurve): number | null {
  if (!curve.five && !curve.four && !curve.three && !curve.two) return null;
  if (composite >= curve.five) return 5;
  if (composite >= curve.four) return 4;
  if (composite >= curve.three) return 3;
  if (composite >= curve.two) return 2;
  return 1;
}

export function scoreAssessment(
  assessment: Assessment,
  mcqAnswers: Record<string, number>,
  frqScores: Record<string, number>,
): AssessmentScore {
  const sections: SectionScore[] = assessment.sections.map((section) => {
    const correct = section.questions.filter(
      (question) => mcqAnswers[question.key] === question.correctIndex,
    ).length;
    const earned = section.frqs.reduce((sum, frq) => sum + (frqScores[frq.id] ?? 0), 0);
    return {
      sectionId: section.id,
      name: section.name,
      correct,
      total: section.questions.length,
      earned,
      possible: section.points,
    };
  });

  const mcqCorrect = sections.reduce((sum, section) => sum + section.correct, 0);
  const mcqTotal = sections.reduce((sum, section) => sum + section.total, 0);
  const frqEarned = sections.reduce((sum, section) => sum + section.earned, 0);
  const frqPossible = sections.reduce((sum, section) => sum + section.possible, 0);
  const { mcqWeight, frqWeight, curve } = assessment.blueprint;

  const mcqPercent = mcqTotal ? (mcqCorrect / mcqTotal) * 100 : null;
  const frqPercent = frqPossible ? (frqEarned / frqPossible) * 100 : null;

  let composite = 0;
  if (mcqPercent !== null && frqPercent !== null) {
    const totalWeight = mcqWeight + frqWeight;
    composite =
      ((mcqPercent * mcqWeight) + (frqPercent * frqWeight)) / (totalWeight || 1);
  } else if (mcqPercent !== null) {
    composite = mcqPercent;
  } else if (frqPercent !== null) {
    composite = frqPercent;
  }

  return {
    mcqCorrect,
    mcqTotal,
    mcqPercent,
    frqEarned,
    frqPossible,
    frqPercent,
    composite,
    apScore: estimateApScore(composite, curve),
    sections,
  };
}

export interface SkillRow {
  skill: string;
  correct: number;
  total: number;
  unitNumbers: number[];
}

export function skillBreakdown(
  assessment: Assessment,
  mcqAnswers: Record<string, number>,
): SkillRow[] {
  const rows = new Map<string, SkillRow>();
  for (const section of assessment.sections) {
    for (const question of section.questions) {
      const skill = question.skill || "Course-wide reasoning";
      const row = rows.get(skill) ?? { skill, correct: 0, total: 0, unitNumbers: [] };
      row.total += 1;
      if (mcqAnswers[question.key] === question.correctIndex) row.correct += 1;
      if (question.unitNumber && !row.unitNumbers.includes(question.unitNumber)) {
        row.unitNumbers.push(question.unitNumber);
      }
      rows.set(skill, row);
    }
  }
  return [...rows.values()].sort((a, b) => a.correct / a.total - b.correct / b.total);
}

export interface UnitRow {
  unitNumber: number;
  correct: number;
  total: number;
}

export function unitBreakdown(
  assessment: Assessment,
  mcqAnswers: Record<string, number>,
): UnitRow[] {
  const rows = new Map<number, UnitRow>();
  for (const section of assessment.sections) {
    for (const question of section.questions) {
      const unit = question.unitNumber ?? 0;
      const row = rows.get(unit) ?? { unitNumber: unit, correct: 0, total: 0 };
      row.total += 1;
      if (mcqAnswers[question.key] === question.correctIndex) row.correct += 1;
      rows.set(unit, row);
    }
  }
  return [...rows.values()].sort((a, b) => a.unitNumber - b.unitNumber);
}

export type { ExamFrq, ExamQuestion, Stimulus };
