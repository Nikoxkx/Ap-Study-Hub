import type { Metadata } from "next";
import { StudyDashboard } from "@/components/StudyDashboard";
import { getStudyCourses, getStudyItems } from "@/lib/study-data";
import { isSubjectSlug } from "@/lib/subjects";
import { pageMetadata } from "@/lib/metadata";
import { getCourseFilms } from "@/lib/films";
import type { ShelfFilm } from "@/components/study/FilmShelf";
import { subjects } from "@/lib/subjects";

export const metadata: Metadata = pageMetadata({
  title: "Your study desk",
  description:
    "Due Today spaced review, a mistake notebook, objective confidence, personal plans, Focus Sessions, weekly diagnostics, and local backups across every AP course.",
  path: "/study",
  ogTitle: "One page that tells you what to do next",
  ogDescription:
    "Due Today, the mistakes you still owe, and a plan that fits the evenings you actually have. Everything stays in your browser.",
  robots: { index: false, follow: true },
});

const validTabs = ["today", "review", "mistakes", "plan", "focus", "progress", "data"] as const;
type StudyTab = typeof validTabs[number];

export default async function StudyPage({ searchParams }: { searchParams: Promise<{ tab?: string | string[]; course?: string | string[] }> }) {
  const query = await searchParams;
  const rawTab = Array.isArray(query.tab) ? query.tab[0] : query.tab;
  const rawCourse = Array.isArray(query.course) ? query.course[0] : query.course;
  const initialTab: StudyTab = validTabs.includes(rawTab as StudyTab) ? rawTab as StudyTab : "today";
  const initialCourse = rawCourse && isSubjectSlug(rawCourse) ? rawCourse : "all";
  const items = getStudyItems();
  const courses = getStudyCourses();

  /* Only the fields the shelf prints, so fifty-odd films cost a few kilobytes
     of props rather than the whole screenplay. */
  const films: ShelfFilm[] = courses.flatMap((course) => {
    const subject = subjects.find((candidate) => candidate.slug === course.slug);
    if (!subject) return [];
    return getCourseFilms(course.slug).map((film) => ({
      id: film.id,
      title: film.title,
      courseLabel: subject.familiar,
      courseSlug: course.slug,
      opening: film.unitNumber === undefined,
      unitNumber: film.unitNumber ?? null,
      seconds: film.duration,
    }));
  });

  return (
    <div className="wrap study-page-wrap py-10 md:py-14">
      <StudyDashboard
        items={items}
        courses={courses}
        films={films}
        initialTab={initialTab}
        initialCourse={initialCourse}
      />
    </div>
  );
}
