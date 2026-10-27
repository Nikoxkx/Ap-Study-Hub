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
import { GlassCard } from "@/components/ui/GlassCard";
import { JsonLd, courseSchema, breadcrumbSchema } from "@/lib/schema";

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

      <div className="wrap pt-6">
        <GlassCard as="header" padding="lg">
          <Breadcrumbs trail={trail} />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="flex gap-5">
              <span
                className="subject-accent-chip flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/80 bg-white/45 sm:h-14 sm:w-14 dark:border-white/25 dark:bg-white/10"
                title={subject.symbolLabel}
              >
                <SubjectMark subject={subject.mark} size={32} label={subject.symbolLabel} />
              </span>

              <div className="min-w-0">
                <p className="label mb-2">
                  <span title={subject.symbolLabel}>{subject.topic}</span>
                  <span aria-hidden="true"> · </span>
                  Advanced Placement
                </p>
                <h1
                  className="text-[clamp(1.65rem,1.3rem+1.6vw,2.5rem)] font-semibold"
                  style={{ letterSpacing: "-0.025em" }}
                >
                  {subject.official}
                </h1>
                <p className="mt-3 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {subject.intro}
                </p>

                <ul
                  className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[0.75rem]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
                >
                  <li>{counts.units} lessons</li>
                  <li>{counts.paragraphs} paragraphs</li>
                  <li>{counts.flashcards} cards</li>
                  <li>{counts.questions} questions</li>
                  {counts.essays > 0 ? <li>{counts.essays} marked essays</li> : null}
                  <li>~{counts.readingMinutes} min read</li>
                  <li>
                    revised <time dateTime={subject.revised}>{formatDate(subject.revised)}</time>
                  </li>
                </ul>
              </div>
            </div>

            <div className="shrink-0 border-t border-white/60 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="label mb-2">
                {subject.slug === "ap-research" ? "Your portfolio deadline" : "Your exam day"}
              </p>
              <p className="mb-1 text-[0.9375rem] font-semibold">
                <time dateTime={subject.exam.date}>{formatExamDate(subject)}</time>
              </p>
              <p className="mb-4 text-[0.8125rem]" style={{ color: "var(--ink-faint)" }}>
                {examTimeLabel(subject)}
              </p>
              <Countdown target={examInstant(subject)} label={subject.familiar} initialDays={daysOut} />
            </div>
          </div>
        </GlassCard>
      </div>

      <CourseTabs
        slug={subject.slug}
        available={{
          notes: counts.units > 0,
          videos: counts.units > 0,
          cards: counts.flashcards > 0,
          practice: counts.questions > 0,
          essays: counts.essays > 0,
          exam: Boolean(course.interim),
          resources: counts.resources > 0,
        }}
      />

      {children}

      <div className="wrap mt-8">
        <GlassCard as="nav" padding="md" aria-label="Other courses">
          <h2 className="label mb-3">Keep exploring</h2>
          <ul className="flex flex-wrap gap-2">
            {subjects
              .filter((other) => other.slug !== subject.slug)
              .map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/course/${other.slug}`}
                    className="tag subject-accent subject-accent-tag no-underline hover:bg-white/60"
                    style={subjectVars(other)}
                  >
                    {other.familiar}
                  </Link>
                </li>
              ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
