import { apushLessons } from "./apush";
import { apLangLessons } from "./apLang";
import { apSeminarLessons } from "./apSeminar";
import { apGovLessons } from "./apGov";
import { apBioLessons } from "./apBio";
import { apCalcLessons } from "./apCalc";
import { apResearchLessons } from "./apResearch";
import type { Lesson } from "./types";

export const lessonLibrary = {
  apush: apushLessons,
  "ap-lang": apLangLessons,
  "ap-seminar": apSeminarLessons,
  "ap-gov": apGovLessons,
  "ap-bio": apBioLessons,
  "ap-calc": apCalcLessons,
  "ap-research": apResearchLessons,
} as const satisfies Record<string, Lesson[]>;

export type LessonCourseSlug = keyof typeof lessonLibrary;

export function getLessons(slug: string): Lesson[] {
  return lessonLibrary[slug as LessonCourseSlug] ?? [];
}

export { lessonSources, getSource } from "./sources";
export type { SourceId } from "./sources";
export type {
  Lesson,
  LessonSection,
  LessonGlossaryEntry,
  LessonPractice,
  LessonExamAlignment,
  LessonSource,
} from "./types";
