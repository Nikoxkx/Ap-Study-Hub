import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalog, getCourse } from "@/lib/catalog";
import { getAssessment } from "@/lib/exams";
import { ExamHub } from "@/components/exam/ExamHub";
import { GlassCard } from "@/components/ui/GlassCard";
import { absoluteUrl, socialImages } from "@/lib/site";
import { formatExamDate } from "@/lib/subjects";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getCatalog().map((course) => ({ slug: course.subject.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  const assessment = getAssessment(slug);
  if (!course || !assessment) return {};

  const { subject } = course;
  const minutes = assessment.totalMinutes;
  const title = `${subject.familiar} mock interim assessment`;
  const description = `A ${minutes}-minute ${subject.familiar} interim assessment in the official format: ${assessment.mcqCount} multiple-choice questions and ${assessment.frqCount} written tasks, marked against the published rubric rows, with a step-by-step guided walkthrough of the same paper.`;

  return {
    title,
    description,
    alternates: { canonical: `/course/${subject.slug}/exam` },
    openGraph: {
      images: socialImages,
      title: `${title} · AP Study Hub`,
      description,
      url: absoluteUrl(`/course/${subject.slug}/exam`),
    },
    twitter: { card: "summary_large_image", images: socialImages },
  };
}

export default async function ExamPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  const assessment = getAssessment(slug);
  if (!course || !assessment) notFound();

  const { subject } = course;
  const base = `/course/${subject.slug}`;
  const breakMinutes = assessment.blueprint.breaks.reduce((sum, item) => sum + item.minutes, 0);

  return (
    <div className="wrap space-y-8 py-8 md:py-12">
      <GlassCard as="header" padding="lg" className="mx-auto max-w-5xl">
        <p className="label mb-2">
          Mock interim assessment · {subject.official}
        </p>
        <h2 className="text-[clamp(1.55rem,1.3rem+1.2vw,2.25rem)] font-semibold" style={{ letterSpacing: "-0.025em" }}>
          The whole exam, in the official format
        </h2>
        <p className="lede mt-3 max-w-[70ch]">
          {assessment.blueprint.officialFormat}
        </p>

        <dl className="exam-meta">
          <div>
            <dt>Timed</dt>
            <dd>{Math.floor(assessment.totalMinutes / 60)}h {assessment.totalMinutes % 60}m</dd>
          </div>
          <div>
            <dt>Break</dt>
            <dd>{breakMinutes ? `${breakMinutes} min` : "none scheduled"}</dd>
          </div>
          <div>
            <dt>Multiple choice</dt>
            <dd>{assessment.mcqCount || "—"}</dd>
          </div>
          <div>
            <dt>Written tasks</dt>
            <dd>{assessment.frqCount || "—"}</dd>
          </div>
          <div>
            <dt>Exam date</dt>
            <dd>{formatExamDate(subject, "short")}</dd>
          </div>
        </dl>

        <ul className="exam-header-links">
          <li>
            <Link href={`${base}/notes`} className="link-underlined">
              Read the lessons
            </Link>
          </li>
          <li>
            <Link href={`${base}/practice`} className="link-underlined">
              Untimed practice
            </Link>
          </li>
          <li>
            <Link href={`${base}/essays`} className="link-underlined">
              Marked exemplars
            </Link>
          </li>
          <li>
            <Link href="/guides" className="link-underlined">
              How to sit a timed paper
            </Link>
          </li>
        </ul>
      </GlassCard>

      <GlassCard padding="lg" className="mx-auto max-w-5xl">
        <ExamHub assessment={assessment} courseSlug={subject.slug} courseLabel={subject.familiar} />
      </GlassCard>

      <GlassCard padding="md" className="mx-auto max-w-5xl">
        <h3 className="label mb-2">What this is, and what it is not</h3>
        <p className="text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
          The section order, question counts, minutes, calculator rules, and break are copied from the
          published format for {subject.official}. The passages are public domain or written for this site, and
          every question and prompt here is original: none is a released College Board question. Scores are
          practice estimates — the AP reader in May is the only authority on your exam score. Written responses
          are marked row by row against the published rubric, either by a language model you configure or by
          this site&apos;s measured analysis, and the method used is printed on every score report.
        </p>
      </GlassCard>
    </div>
  );
}
