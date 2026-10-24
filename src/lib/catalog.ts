import {
  unitsData,
  flashcardsData,
  quizData,
  essaysData,
  tipsData,
  resourcesData,
  mockExamsData,
} from "./data";
import { getLessons, getSource } from "@/content/lessons";
import type { Lesson } from "@/content/lessons";
import { countWords } from "@/content/lessons/text";
import { subjects, type Subject, type SubjectSlug } from "./subjects";

/**
 * The join between the subject registry, the deep lesson library, and the
 * original drills. Every study surface reads through this catalog so notes,
 * search, cards, practice, counts, and source links cannot drift apart.
 */

export interface Unit {
  unitNumber: number;
  title: string;
  description: string;
  /** Searchable/legacy Markdown projection. Rich pages use `lesson` directly. */
  content: string;
  keyTerms: string[];
  lesson?: Lesson;
}

export interface Flashcard {
  /** Stable content identity, independent of deck order. */
  id: string;
  front: string;
  back: string;
  unitNumber?: number;
  lessonTitle?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  skill?: string;
  optionExplanations?: string[];
  unitNumber?: number;
  lessonTitle?: string;
}

export interface Essay {
  id: string;
  title: string;
  type: string;
  prompt: string;
  sampleEssay: string;
  score: number;
  rubricBreakdown: {
    category: string;
    points: number;
    maxPoints: number;
    explanation: string;
  }[];
  sources?: { id: string; title: string; content: string }[];
}

export interface Resource {
  title: string;
  url: string;
  description: string;
  type: string;
}

export interface Tip {
  title: string;
  content: string;
  category: string;
}

export interface CourseBundle {
  subject: Subject;
  units: Unit[];
  flashcards: Flashcard[];
  questions: QuizQuestion[];
  essays: Essay[];
  tips: Tip[];
  resources: Resource[];
  mockExams: (typeof mockExamsData)[string];
  counts: {
    units: number;
    paragraphs: number;
    teachingWords: number;
    flashcards: number;
    questions: number;
    essays: number;
    resources: number;
    /** Rough reading time for the teaching prose, at 220 wpm. */
    readingMinutes: number;
  };
}

function displayTitle(title: string): string {
  return title.replace(/^(?:Unit|Period|Big Idea) \d+ · /, "");
}

function lessonMarkdown(lesson: Lesson): string {
  return lesson.sections
    .map((section) => `## ${section.heading}\n\n${section.paragraphs.join("\n\n")}`)
    .join("\n\n");
}

function normalized(value: string): string {
  return value.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

function inferCardUnit(front: string, legacyUnits: (typeof unitsData)[string]): number | undefined {
  const needle = normalized(front);
  return legacyUnits.find((unit) =>
    unit.keyTerms.some((term) => {
      const candidate = normalized(term);
      return needle === candidate || needle.includes(candidate) || candidate.includes(needle);
    }),
  )?.unitNumber;
}

export function getCourse(slug: SubjectSlug | string): CourseBundle | null {
  const subject = subjects.find((s) => s.slug === slug);
  if (!subject) return null;

  const legacyUnits = unitsData[subject.slug] ?? [];
  const lessons = getLessons(subject.slug);
  const units: Unit[] = lessons.length
    ? lessons.map((lesson) => ({
        unitNumber: lesson.unitNumber,
        title: displayTitle(lesson.title),
        description: lesson.description,
        content: lessonMarkdown(lesson),
        keyTerms: lesson.glossary.map((entry) => entry.term),
        lesson,
      }))
    : legacyUnits;

  // Glossary cards come first and win duplicate term checks: they have the
  // richer definition and an explicit lesson reference. Legacy cards remain
  // where they add something, with a unit inferred only from an exact topic map.
  const seenTerms = new Set<string>();
  const flashcards: Flashcard[] = [];
  const addCard = (card: Omit<Flashcard, "id"> & { id?: string }) => {
    const key = normalized(card.front);
    if (seenTerms.has(key)) return;
    seenTerms.add(key);
    const contentKey = key.replace(/\s+/g, "-").slice(0, 140);
    flashcards.push({
      ...card,
      id: card.id ?? `${card.unitNumber ?? "course"}:${contentKey}`,
    });
  };

  for (const lesson of lessons) {
    for (const entry of lesson.glossary) {
      addCard({
        front: entry.term,
        back: entry.definition,
        unitNumber: lesson.unitNumber,
        lessonTitle: displayTitle(lesson.title),
      });
    }
  }
  for (const card of flashcardsData[subject.slug] ?? []) {
    const unitNumber = inferCardUnit(card.front, legacyUnits);
    const lesson = lessons.find((candidate) => candidate.unitNumber === unitNumber);
    addCard({
      ...card,
      unitNumber,
      lessonTitle: lesson ? displayTitle(lesson.title) : undefined,
    });
  }

  const lessonQuestions = lessons.flatMap((lesson) =>
    lesson.practice.map((question) => ({
      ...question,
      unitNumber: lesson.unitNumber,
      lessonTitle: displayTitle(lesson.title),
    })),
  );
  // Legacy IDs stay stable because timed papers address this bank by ID.
  // Lesson-linked questions are appended and exposed through the unit filter.
  const questions: QuizQuestion[] = [
    ...(quizData[subject.slug] ?? []),
    ...lessonQuestions,
  ].map((question, id) => ({ ...question, id }));

  const essays = essaysData[subject.slug] ?? [];
  const tips = tipsData[subject.slug] ?? [];
  const mockExams = mockExamsData[subject.slug] ?? [];

  // Curriculum and scoring references cited by the lessons become visible on
  // the resources route as well as beside the relevant teaching section.
  const citedSourceIds = new Set(
    lessons.flatMap((lesson) => [
      ...lesson.sections.flatMap((section) => section.sources),
      ...lesson.examAlignment.sources,
    ]),
  );
  const citedResources: Resource[] = [...citedSourceIds].map((id) => {
    const source = getSource(id);
    return {
      title: source.title,
      url: source.url,
      description: `${source.description} Reviewed ${source.checked}.`,
      type: source.kind.startsWith("Official") ? "official" : source.kind === "Open textbook" ? "reading" : "reference",
    };
  });
  const citedUrls = new Set(citedResources.map((resource) => resource.url));
  const resources = [
    ...citedResources,
    ...(resourcesData[subject.slug] ?? []).filter((resource) => !citedUrls.has(resource.url)),
  ];

  const words = lessons.length
    ? lessons.reduce(
        (total, lesson) => total + lesson.sections.reduce(
          (sum, section) => sum + section.paragraphs.reduce((inner, paragraph) => inner + countWords(paragraph), 0),
          0,
        ),
        0,
      )
    : units.reduce((total, unit) => total + countWords(unit.content), 0);
  const paragraphs = lessons.reduce(
    (total, lesson) => total + lesson.sections.reduce((sum, section) => sum + section.paragraphs.length, 0),
    0,
  );

  return {
    subject,
    units,
    flashcards,
    questions,
    essays,
    tips,
    resources,
    mockExams,
    counts: {
      units: units.length,
      paragraphs,
      teachingWords: words,
      flashcards: flashcards.length,
      questions: questions.length,
      essays: essays.length,
      resources: resources.length,
      readingMinutes: Math.max(1, Math.round(words / 220)),
    },
  };
}

/** Every course, in catalogue order, with counts resolved. Used on the home page. */
export function getCatalog(): CourseBundle[] {
  return subjects
    .map((s) => getCourse(s.slug))
    .filter((c): c is CourseBundle => c !== null);
}

/** Site-wide totals. Real numbers beat "comprehensive". */
export function getTotals() {
  const catalog = getCatalog();
  return catalog.reduce(
    (totals, course) => ({
      courses: totals.courses + 1,
      units: totals.units + course.counts.units,
      paragraphs: totals.paragraphs + course.counts.paragraphs,
      teachingWords: totals.teachingWords + course.counts.teachingWords,
      flashcards: totals.flashcards + course.counts.flashcards,
      questions: totals.questions + course.counts.questions,
      essays: totals.essays + course.counts.essays,
      readingMinutes: totals.readingMinutes + course.counts.readingMinutes,
    }),
    { courses: 0, units: 0, paragraphs: 0, teachingWords: 0, flashcards: 0, questions: 0, essays: 0, readingMinutes: 0 },
  );
}

/** The next exam or submission deadline relative to `now`. */
export function nextExam(now = Date.now()): Subject | null {
  const upcoming = subjects
    .filter((s) => Date.parse(`${s.exam.date}T23:59:59Z`) >= now)
    .sort((a, b) => a.exam.date.localeCompare(b.exam.date));
  return upcoming[0] ?? null;
}
