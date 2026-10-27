import type { Metadata } from "next";
import { StudyDashboard } from "@/components/StudyDashboard";
import { getStudyCourses, getStudyItems } from "@/lib/study-data";
import { isSubjectSlug } from "@/lib/subjects";

export const metadata: Metadata = {
  title: "What should I work on today?",
  description: "A private study desk for spaced review, mistakes, realistic plans, focus sessions, video notes, goals, reports, and optional sync across ten AP courses.",
  robots: { index: false, follow: true },
};

const validTabs = ["today", "review", "mistakes", "plan", "focus", "exams", "progress", "data", "advanced"] as const;
type StudyTab = typeof validTabs[number];

export default async function StudyPage({ searchParams }: { searchParams: Promise<{ tab?: string | string[]; course?: string | string[] }> }) {
  const query = await searchParams;
  const rawTab = Array.isArray(query.tab) ? query.tab[0] : query.tab;
  const rawCourse = Array.isArray(query.course) ? query.course[0] : query.course;
  const initialTab: StudyTab = validTabs.includes(rawTab as StudyTab) ? rawTab as StudyTab : "today";
  const initialCourse = rawCourse && isSubjectSlug(rawCourse) ? rawCourse : "all";
  const items = getStudyItems();
  const courses = getStudyCourses();

  return <div className="wrap study-page-wrap py-10 md:py-14"><StudyDashboard items={items} courses={courses} initialTab={initialTab} initialCourse={initialCourse} /></div>;
}
