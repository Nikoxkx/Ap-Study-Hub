import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse, getCatalog } from "@/lib/catalog";
import { TimedPaper } from "@/components/TimedPaper";
import { GlassCard } from "@/components/ui/GlassCard";
import { absoluteUrl, socialImages } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getCatalog()
    .filter((course) => course.mockExams.length > 0)
    .map((course) => ({ slug: course.subject.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const { subject, mockExams } = course;
  const minutes = mockExams[0]?.sections.reduce((sum, s) => sum + s.timeMinutes, 0) ?? 0;
  const title = `${subject.familiar} under exam conditions`;
  const description = `A ${minutes}-minute original ${subject.familiar} timed practice set with a running clock, constructed source packets, and transparent self-check criteria.`;

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
  if (!course) notFound();

  const { subject, mockExams, questions } = course;
  if (mockExams.length === 0) notFound();

  return (
    <div className="wrap space-y-8 py-8 md:py-12">
      <GlassCard as="header" padding="lg" className="mx-auto max-w-4xl">
        <p className="label mb-2">With the clock running</p>
        <h2
          className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)] font-semibold"
          style={{ letterSpacing: "-0.025em" }}
        >
          {subject.familiar}, with the clock running
        </h2>
        <p className="lede mt-3">
          A running clock feels different from untimed practice. Written responses use lined
          notebook scratch paper and autosave locally.
        </p>
      </GlassCard>

      {mockExams.map((exam) => (
        <GlassCard key={exam.id} padding="lg" className="mx-auto max-w-4xl">
          <TimedPaper exam={exam} allQuestions={questions} courseSlug={subject.slug} />
        </GlassCard>
      ))}
    </div>
  );
}
