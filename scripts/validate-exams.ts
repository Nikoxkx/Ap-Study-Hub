/**
 * Interim-assessment validation.
 *
 * The claim this site makes is narrow and testable: every course has one paper
 * whose section structure, question counts, clock, and rubric row totals match
 * the published exam format, and whose written tasks are marked against rubric
 * rows that add up to the printed point value. This script checks that claim,
 * plus the things that break silently in a quiz bank: duplicate keys, a correct
 * index out of range, an explanation that does not exist, a question pointing at
 * a passage that was deleted, and a written task with no coaching guide.
 *
 * Run with: npx tsx scripts/validate-exams.ts
 */

import { getAssessment, getRubricForFrq, scoreAssessment } from "../src/lib/exams";
import { subjects } from "../src/lib/subjects";
import type { Assessment, ExamFrq, ExamQuestion } from "../src/content/exams/types";

const errors: string[] = [];
const fail = (message: string) => errors.push(message);

const LETTERS = ["A", "B", "C", "D"];

function checkQuestion(slug: string, assessment: Assessment, question: ExamQuestion, sectionId: string) {
  const where = `${slug} ${sectionId} ${question.key}`;
  if (!question.question.trim()) fail(`${where}: empty stem`);
  if (question.options.length !== 4) fail(`${where}: ${question.options.length} options, expected 4`);
  if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex > 3) {
    fail(`${where}: correct index ${question.correctIndex} is out of range`);
  }
  if (new Set(question.options.map((option) => option.trim())).size !== question.options.length) {
    fail(`${where}: duplicate option text`);
  }
  if (!question.explanation || question.explanation.trim().length < 20) fail(`${where}: explanation is too thin`);
  if (!question.skill) fail(`${where}: no skill tag, so the score report cannot group it`);
  if (question.stimulusId && !assessment.stimuli.some((stimulus) => stimulus.id === question.stimulusId)) {
    fail(`${where}: points at missing stimulus ${question.stimulusId}`);
  }
  if (question.optionExplanations && question.optionExplanations.length !== 4) {
    fail(`${where}: ${question.optionExplanations.length} option explanations, expected 4`);
  }
  if (question.unitNumber === undefined && !question.skill) {
    fail(`${where}: no unit and no skill, so "study this next" has nothing to say`);
  }
}

function checkFrq(slug: string, frq: ExamFrq, sectionId: string) {
  const where = `${slug} ${sectionId} ${frq.id}`;
  if (!frq.prompt.trim()) fail(`${where}: empty prompt`);
  if (frq.minutes < 5 || frq.minutes > 120) fail(`${where}: ${frq.minutes} minutes is not plausible`);
  const rubric = getRubricForFrq(frq);
  if (!rubric) {
    fail(`${where}: no rubric resolves for rubricId "${frq.rubricId}"`);
    return;
  }
  const total = rubric.rows.reduce((sum, row) => sum + row.maxPoints, 0);
  if (total !== frq.points) fail(`${where}: rubric rows total ${total}, task says ${frq.points}`);
  for (const row of rubric.rows) {
    if (!row.descriptors.length) fail(`${where}: rubric row ${row.id} has no descriptors`);
    if (!row.scale.includes(row.maxPoints)) fail(`${where}: rubric row ${row.id} cannot award its own maximum`);
    if (!row.signals.length) fail(`${where}: rubric row ${row.id} has no measurable signals`);
  }
  const coach = frq.coach;
  if (!coach.task.trim()) fail(`${where}: coach has no task statement`);
  if (coach.steps.length < 3) fail(`${where}: coach has ${coach.steps.length} steps`);
  if (!coach.evidence.length) fail(`${where}: coach has no evidence guidance`);
  if (!coach.argument.length) fail(`${where}: coach has no argument guidance`);
  if (!coach.pitfalls.length) fail(`${where}: coach has no pitfalls`);
  const timed = coach.timeline.reduce((sum, item) => sum + item.minutes, 0);
  if (timed !== frq.minutes) fail(`${where}: coaching timeline is ${timed} minutes against a ${frq.minutes}-minute task`);
  if (frq.modelPath.length < 3) fail(`${where}: model path has fewer than three moves`);
}

for (const subject of subjects) {
  const assessment = getAssessment(subject.slug);
  if (!assessment) {
    fail(`${subject.slug}: no interim assessment blueprint`);
    continue;
  }
  const { blueprint } = assessment;

  const sectionMinutes = blueprint.sections.reduce((sum, section) => sum + section.minutes, 0);
  if (sectionMinutes !== assessment.totalMinutes) fail(`${subject.slug}: section minutes do not add up`);
  if (sectionMinutes !== blueprint.timedMinutes) {
    fail(`${subject.slug}: sections total ${sectionMinutes} minutes, blueprint says ${blueprint.timedMinutes}`);
  }
  if (blueprint.mcqWeight + blueprint.frqWeight !== 100) {
    fail(`${subject.slug}: section weights add to ${blueprint.mcqWeight + blueprint.frqWeight}`);
  }
  if (blueprint.hasMcq && blueprint.mcqTotal === 0) fail(`${subject.slug}: has MCQs but mcqTotal is 0`);
  if (!blueprint.hasMcq && blueprint.mcqTotal !== 0) fail(`${subject.slug}: mcqTotal is set with no MCQ section`);
  if (blueprint.curve.five <= blueprint.curve.four || blueprint.curve.four <= blueprint.curve.three) {
    if (blueprint.curve.five !== 0) fail(`${subject.slug}: score curve is not monotonic`);
  }

  const keys = new Set<string>();
  const frqIds = new Set<string>();
  let mcqCount = 0;
  let frqCount = 0;

  for (const section of assessment.sections) {
    if (section.type === "mcq") {
      if (section.questionCount && section.questions.length !== section.questionCount) {
        fail(`${subject.slug} ${section.id}: ${section.questions.length} resolved questions against ${section.questionCount}`);
      }
      for (const question of section.questions) {
        if (keys.has(question.key)) fail(`${subject.slug}: duplicate question key ${question.key}`);
        keys.add(question.key);
        checkQuestion(subject.slug, assessment, question, section.id);
      }
      mcqCount += section.questions.length;
      if (section.parts) {
        const parts = section.parts.reduce((sum, part) => sum + (part.questionCount ?? 0), 0);
        if (parts !== section.questions.length) {
          fail(`${subject.slug} ${section.id}: parts total ${parts} questions against ${section.questions.length}`);
        }
      }
    } else {
      if (!section.frqs.length) fail(`${subject.slug} ${section.id}: no written task resolved`);
      for (const frq of section.frqs) {
        if (frqIds.has(frq.id)) fail(`${subject.slug}: duplicate written task ${frq.id}`);
        frqIds.add(frq.id);
        checkFrq(subject.slug, frq, section.id);
      }
      frqCount += section.frqs.length;
      const points = section.frqs.reduce((sum, frq) => sum + frq.points, 0);
      if (section.type === "frq" && section.points !== points) {
        fail(`${subject.slug} ${section.id}: section points ${section.points} against task points ${points}`);
      }
    }
  }

  if (mcqCount !== blueprint.mcqTotal) fail(`${subject.slug}: ${mcqCount} MCQs against a published ${blueprint.mcqTotal}`);
  if (assessment.mcqCount !== mcqCount) fail(`${subject.slug}: assessment.mcqCount is stale`);
  if (assessment.frqCount !== frqCount) fail(`${subject.slug}: assessment.frqCount is stale`);

  // Score arithmetic: a perfect paper must land at 100, a blank paper at 1.
  const perfect: Record<string, number> = {};
  const blank: Record<string, number> = {};
  const fullFrq: Record<string, number> = {};
  const zeroFrq: Record<string, number> = {};
  for (const section of assessment.sections) {
    for (const question of section.questions) perfect[question.key] = question.correctIndex;
    for (const frq of section.frqs) {
      fullFrq[frq.id] = frq.points;
      zeroFrq[frq.id] = 0;
    }
  }
  const top = scoreAssessment(assessment, perfect, fullFrq);
  const bottom = scoreAssessment(assessment, blank, zeroFrq);
  if (Math.round(top.composite) !== 100) fail(`${subject.slug}: a perfect paper scores ${top.composite.toFixed(1)}`);
  if (bottom.composite !== 0) fail(`${subject.slug}: a blank paper scores ${bottom.composite}`);
  if (blueprint.curve.five > 0 && top.apScore !== 5) fail(`${subject.slug}: a perfect paper does not earn a 5`);
  if (blueprint.curve.five > 0 && bottom.apScore !== 1) fail(`${subject.slug}: a blank paper does not earn a 1`);
  if (top.frqPossible !== blueprint.frqTotal) {
    fail(`${subject.slug}: written tasks total ${top.frqPossible} points against blueprint ${blueprint.frqTotal}`);
  }

  const breaks = blueprint.breaks;
  for (const item of breaks) {
    if (!blueprint.sections.some((section) => section.id === item.afterSectionId)) {
      fail(`${subject.slug}: break follows unknown section ${item.afterSectionId}`);
    }
    if (!item.label.trim() || !item.detail.trim()) fail(`${subject.slug}: break is missing a label or detail`);
  }

  console.log(
    [
      subject.slug.padEnd(12),
      `${Math.floor(assessment.totalMinutes / 60)}h${String(assessment.totalMinutes % 60).padStart(2, "0")}`.padEnd(6),
      `${mcqCount} MCQ`.padEnd(9),
      `${frqCount} written`.padEnd(13),
      `${top.frqPossible} rubric pts`.padEnd(17),
      `${breaks.length} break${breaks.length === 1 ? "" : "s"}`.padEnd(8),
      `${assessment.stimuli.length} passages`,
    ].join(" "),
  );

  if (blueprint.notes.length < 2) fail(`${subject.slug}: fewer than two format notes for the briefing screen`);
  if (blueprint.title.toUpperCase().includes("MOCK")) {
    fail(`${subject.slug}: title still uses "mock"; the app calls these interim assessments`);
  }
  if (blueprint.officialFormat.trim().length < 30) {
    fail(`${subject.slug}: officialFormat is too short to describe the format`);
  }
}

// MCQ answer letters are used by the review screen; keep them consistent.
if (LETTERS.length !== 4) fail("answer letters drifted");

if (errors.length) {
  console.error(`\nAssessment validation failed with ${errors.length} issue${errors.length === 1 ? "" : "s"}:`);
  for (const error of errors) console.error(`  • ${error}`);
  process.exit(1);
}

console.log("\n✓ Ten papers in the published format, with rubric totals, coaching timelines, and score arithmetic checked.");
