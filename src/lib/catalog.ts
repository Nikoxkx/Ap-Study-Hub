import {
  unitsData,
  flashcardsData,
  quizData,
  essaysData,
  tipsData,
  resourcesData,
  mockExamsData,
} from "./data";
import { subjects, type Subject, type SubjectSlug } from "./subjects";

/**
 * The join between the subject registry (identity, colour, exam date) and the
 * content store (notes, cards, questions). Pages read from here so no component
 * has to know that `unitsData` is a bare Record that may not have its key.
 */

export interface Unit {
  unitNumber: number;
  title: string;
  description: string;
  content: string;
  keyTerms: string[];
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  skill?: string;
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
    flashcards: number;
    questions: number;
    essays: number;
    resources: number;
    /** Rough reading time for the notes, at 220 wpm. */
    readingMinutes: number;
  };
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export function getCourse(slug: SubjectSlug | string): CourseBundle | null {
  const subject = subjects.find((s) => s.slug === slug);
  if (!subject) return null;

  const units = unitsData[subject.slug] ?? [];
  const flashcards = flashcardsData[subject.slug] ?? [];
  const questions = (quizData[subject.slug] ?? []).map((q, i) => ({ id: i, ...q }));
  const essays = essaysData[subject.slug] ?? [];
  const tips = tipsData[subject.slug] ?? [];
  const resources = resourcesData[subject.slug] ?? [];
  const mockExams = mockExamsData[subject.slug] ?? [];

  const words = units.reduce((total, unit) => total + wordCount(unit.content), 0);

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
      flashcards: totals.flashcards + course.counts.flashcards,
      questions: totals.questions + course.counts.questions,
      essays: totals.essays + course.counts.essays,
      readingMinutes: totals.readingMinutes + course.counts.readingMinutes,
    }),
    { courses: 0, units: 0, flashcards: 0, questions: 0, essays: 0, readingMinutes: 0 },
  );
}

/**
 * The next exam that has not happened yet, relative to `now`. Drives the
 * "up next" line in the masthead. Returns null once the season is over.
 */
export function nextExam(now = Date.now()): Subject | null {
  const upcoming = subjects
    .filter((s) => Date.parse(`${s.exam.date}T23:59:59Z`) >= now)
    .sort((a, b) => a.exam.date.localeCompare(b.exam.date));
  return upcoming[0] ?? null;
}
