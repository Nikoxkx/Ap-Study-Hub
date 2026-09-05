import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourse } from "@/lib/catalog";
import { subjects, formatExamDate, examTimeLabel, examInstant, subjectVars } from "@/lib/subjects";
import { formatDate } from "@/lib/site";
import { daysUntil } from "@/lib/clock";
import { SubjectMark } from "@/components/SubjectMark";
import { Countdown } from "@/components/Countdown";
import { Breadcrumbs } from "@/components/Furniture";
import { CourseTabs } from "@/components/CourseTabs";
import { JsonLd, courseSchema, breadcrumbSchema } from "@/lib/schema";

/**
 * Course shell.
 *
 * Everything a course page shares: the header plate, the exam countdown, the
 * tab strip and the structured data. The individual study modes are separate
 * routes underneath, so each one is its own URL with its own title and its own
 * entry in the sitemap — rather than six fragment links into one 4,000-word
 * page that could never rank for anything specific.
 */

export function generateStaticParams() {
  return subjects.map((subject) => ({ slug: subject.slug }));
}

export default async function CourseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const { subject, counts } = course;
  const daysOut = daysUntil(examInstant(subject));

  const trail = [
    { name: "Home", href: "/" },
    { name: subject.familiar, href: `/course/${subject.slug}` },
  ];

  return (
    <div style={subjectVars(subject)}>
      <JsonLd schema={[courseSchema(course), breadcrumbSchema(trail)]} />

      <header className="rule-bottom" style={{ background: "var(--paper-raised)" }}>
        <div className="wrap pb-7 pt-6">
          <Breadcrumbs trail={trail} />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="flex gap-5">
              <span
                className="hidden shrink-0 pt-1 sm:block"
                style={{ color: "var(--subject-ink)" }}
              >
                <SubjectMark subject={subject.mark} size={48} />
              </span>

              <div className="min-w-0">
                <p className="label mb-2">
                  <span style={{ color: "var(--subject-ink)" }}>{subject.code}</span>
                  <span aria-hidden="true"> · </span>
                  Advanced Placement
                </p>
                <h1
                  className="text-[clamp(1.6rem,1.25rem+1.6vw,2.5rem)]"
                  style={{ letterSpacing: "-0.025em" }}
                >
                  {subject.official}
                </h1>
                <p className="mt-3 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {subject.intro}
                </p>

                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[0.75rem]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
                  <li>{counts.units} units</li>
                  <li>{counts.flashcards} cards</li>
                  <li>{counts.questions} questions</li>
                  {counts.essays > 0 ? <li>{counts.essays} marked essays</li> : null}
                  <li>~{counts.readingMinutes} min of notes</li>
                  {/* Dated so the freshness claim is checkable rather than
                      implied. Matches the lastModified in the sitemap. */}
                  <li>
                    revised <time dateTime={subject.revised}>{formatDate(subject.revised)}</time>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="shrink-0 border-l-0 pt-5 lg:border-l lg:pl-8 lg:pt-0"
              style={{ borderColor: "var(--rule)" }}
            >
              <p className="label mb-2">
                {subject.slug === "ap-research" ? "Portfolio deadline" : "Exam day"}
              </p>
              <p className="mb-3 text-[0.9375rem] font-semibold">
                <time dateTime={subject.exam.date}>{formatExamDate(subject)}</time>
              </p>
              <p className="mb-4 text-[0.8125rem]" style={{ color: "var(--ink-faint)" }}>
                {examTimeLabel(subject)}
              </p>
              <Countdown target={examInstant(subject)} label={subject.familiar} initialDays={daysOut} />
            </div>
          </div>
        </div>
      </header>

      <CourseTabs
        slug={subject.slug}
        available={{
          notes: counts.units > 0,
          cards: counts.flashcards > 0,
          practice: counts.questions > 0,
          essays: counts.essays > 0,
          exam: course.mockExams.length > 0,
          resources: counts.resources > 0,
        }}
      />

      {children}

      <nav
        aria-label="Other courses"
        className="wrap rule-top py-8"
      >
        <h2 className="label mb-3">Other courses</h2>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {subjects
            .filter((other) => other.slug !== subject.slug)
            .map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/course/${other.slug}`}
                  className="link-draw text-[0.875rem]"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {other.familiar}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
