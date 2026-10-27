import { getCatalog, getCourse } from "./catalog";
import { getAssessment } from "./exams";
import { cardStudyId, questionStudyId, type StudyItem } from "./study-model";
import type { SubjectSlug } from "./subjects";

export interface StudyCourse {
  slug: SubjectSlug;
  label: string;
  official: string;
  examDate: string;
  examLabel: string;
  readingMinutes: number;
  /** The interim assessment this course is sat on, if one is built. */
  exam: {
    minutes: number;
    mcqCount: number;
    frqCount: number;
    points: number;
    sections: { name: string; type: "mcq" | "frq"; minutes: number; questions: number }[];
  } | null;
  units: {
    unitNumber: number;
    title: string;
    description: string;
    objectives: string[];
    questionCount: number;
  }[];
}

export function toStudyCourse(slug: SubjectSlug): StudyCourse | null {
  const course = getCourse(slug);
  if (!course) return null;
  return {
    slug: course.subject.slug,
    label: course.subject.familiar,
    official: course.subject.official,
    examDate: course.subject.exam.date,
    examLabel: course.subject.exam.window === "deadline" ? "Portfolio deadline" : "Exam date",
    readingMinutes: course.counts.readingMinutes,
    exam: (() => {
      const assessment = getAssessment(course.subject.slug);
      if (!assessment) return null;
      return {
        minutes: assessment.totalMinutes,
        mcqCount: assessment.mcqCount,
        frqCount: assessment.frqCount,
        points: assessment.totalPoints,
        sections: assessment.sections.map((section) => ({
          name: section.name,
          type: section.type,
          minutes: section.minutes,
          questions: section.type === "mcq" ? section.questions.length : section.frqs.length,
        })),
      };
    })(),
    units: course.units.map((unit) => ({
      unitNumber: unit.unitNumber,
      title: unit.title,
      description: unit.description,
      objectives: unit.lesson?.objectives ?? [],
      questionCount: course.questions.filter((question) => question.unitNumber === unit.unitNumber).length,
    })),
  };
}

export function getStudyCourses(): StudyCourse[] {
  return getCatalog().flatMap((course) => {
    const summary = toStudyCourse(course.subject.slug);
    return summary ? [summary] : [];
  });
}

export function getStudyItems(): StudyItem[] {
  return getCatalog().flatMap((course) => {
    const base = `/course/${course.subject.slug}`;
    const cards: StudyItem[] = course.flashcards.map((card) => ({
      id: cardStudyId(course.subject.slug, card.id),
      kind: "card",
      courseSlug: course.subject.slug,
      courseLabel: course.subject.familiar,
      prompt: card.front,
      answer: card.back,
      href: `${base}/cards`,
      lessonHref: card.unitNumber ? `${base}/notes#unit-${card.unitNumber}` : undefined,
      lessonTitle: card.lessonTitle,
      unitNumber: card.unitNumber,
      skill: card.lessonTitle,
    }));
    const questions: StudyItem[] = course.questions.map((question) => ({
      id: questionStudyId(course.subject.slug, question.id),
      kind: "question",
      courseSlug: course.subject.slug,
      courseLabel: course.subject.familiar,
      prompt: question.question,
      answer: question.options[question.correctIndex],
      explanation: question.explanation,
      href: `${base}/practice${question.unitNumber ? `?unit=${question.unitNumber}` : ""}`,
      lessonHref: question.unitNumber ? `${base}/notes#unit-${question.unitNumber}` : undefined,
      lessonTitle: question.lessonTitle,
      unitNumber: question.unitNumber,
      skill: question.skill,
    }));
    return [...cards, ...questions];
  });
}
