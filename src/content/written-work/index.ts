import type { SubjectSlug } from "@/lib/subjects";
import type { CourseDefense, WrittenWork } from "./types";
import { apushWrittenWork, apushDefense } from "./apush";
import { apLangWrittenWork, apLangDefense } from "./apLang";
import { apLitWrittenWork, apLitDefense } from "./apLit";
import { apSeminarWrittenWork, apSeminarDefense } from "./apSeminar";
import { apGovWrittenWork, apGovDefense } from "./apGov";
import { apBioWrittenWork, apBioDefense } from "./apBio";
import { apCalcWrittenWork, apCalcDefense } from "./apCalc";
import { apResearchWrittenWork, apResearchDefense } from "./apResearch";
import { apMacroWrittenWork, apMacroDefense } from "./apMacro";
import { apEnvWrittenWork, apEnvDefense } from "./apEnv";

/**
 * One written example and one spoken defense per lesson, for all ten courses,
 * because a unit that is only explained is a unit you have not yet had to
 * defend.
 */
export const writtenWork: WrittenWork[] = [
  ...apushWrittenWork,
  ...apLangWrittenWork,
  ...apLitWrittenWork,
  ...apSeminarWrittenWork,
  ...apGovWrittenWork,
  ...apBioWrittenWork,
  ...apCalcWrittenWork,
  ...apResearchWrittenWork,
  ...apMacroWrittenWork,
  ...apEnvWrittenWork,
];

export const courseDefenses: CourseDefense[] = [
  apushDefense,
  apLangDefense,
  apLitDefense,
  apSeminarDefense,
  apGovDefense,
  apBioDefense,
  apCalcDefense,
  apResearchDefense,
  apMacroDefense,
  apEnvDefense,
];

const workByUnit = new Map<string, WrittenWork>(
  writtenWork.map((work) => [`${work.courseSlug}-${work.unitNumber}`, work]),
);

const defenseByCourse = new Map<string, CourseDefense>(
  courseDefenses.map((defense) => [defense.courseSlug, defense]),
);

export function getWrittenWork(courseSlug: string, unitNumber?: number): WrittenWork[] {
  if (unitNumber === undefined) return writtenWork.filter((work) => work.courseSlug === courseSlug);
  const work = workByUnit.get(`${courseSlug}-${unitNumber}`);
  return work ? [work] : [];
}

export function getCourseDefense(courseSlug: string | SubjectSlug): CourseDefense | undefined {
  return defenseByCourse.get(courseSlug);
}

export function getUnitDefense(courseSlug: string, unitNumber: number) {
  return getCourseDefense(courseSlug)?.units.find((unit) => unit.unitNumber === unitNumber);
}

export type { WrittenWork, UnitDefense, CourseDefense } from "./types";
export { usesMathematics } from "./types";
