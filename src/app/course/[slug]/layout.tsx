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
    <div className="subject-scope" style={subjectVars(subject)}>
      <JsonLd schema={[courseSchema(course), breadcrumbSchema(trail)]} />

      <header className="rule-bottom" style={{ background: "var(--glass-raised)", backdropFilter: "blur(16px) saturate(140%)", WebkitBackdropFilter: "blur(16px) saturate(140%)" }}>
        <div className="wrap pb-8 pt-6">
          <Breadcrumbs trail={trail} />

          <div className="flex flex-col items-center text-center">
            <span className="mb-3" style={{ color: "var(--subject-ink)" }}>
              <SubjectMark subject={subject.mark} size={44} label={subject.symbolLabel} />
            </span>

            <p className="label">
              <span style={{ color: "var(--subject-ink)" }} title={subject.symbolLabel}>{subject.topic}</span>
              <span aria-hidden="true"> · </span>
              Advanced Placement
            </p>
            <h1
              className="mt-2 text-[clamp(1.75rem,1.3rem+2vw,2.75rem)]"
              style={{ letterSpacing: "-0.03em", fontWeight: 800, lineHeight: 1.08 }}
            >
              {subject.official}
            </h1>
            <p className="mt-3 max-w-[58ch] text-[0.9375rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {subject.intro}
            </p>

            <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[0.75rem]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
              <li>{counts.units} lessons</li>
              <li>{counts.paragraphs} teaching paragraphs</li>
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

            <div className="mt-6">
              <p className="label mb-2">
                {subject.slug === "ap-research" ? "Your portfolio deadline" : "Your exam day"}
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
          videos: counts.units > 0,
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
        <h2 className="label mb-3">Keep exploring</h2>
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
