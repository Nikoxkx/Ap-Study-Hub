import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse, getCatalog } from "@/lib/catalog";
import { TimedPaper } from "@/components/TimedPaper";
import { absoluteUrl } from "@/lib/site";

type Params = Promise<{ slug: string }>;
/**
 * Same as the essays route: build a page only where there is a paper to sit.
 */
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
  const title = `${subject.familiar} timed practice paper`;
  const description = `A ${minutes}-minute ${subject.familiar} practice paper with a running clock, the source documents embedded, and honest self-marking against the real rubric.`;

  return {
    title,
    description,
    alternates: { canonical: `/course/${subject.slug}/exam` },
    openGraph: { title: `${title} · AP Study Hub`, description, url: absoluteUrl(`/course/${subject.slug}/exam`) },
  };
}

export default async function ExamPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const { subject, mockExams, questions } = course;
  if (mockExams.length === 0) notFound();

  return (
    <div className="wrap py-12 md:py-16">
      <header className="mx-auto mb-10 max-w-3xl">
        <p className="label mb-2">Sit it properly</p>
        <h2 className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)]" style={{ letterSpacing: "-0.025em" }}>
          {subject.familiar} timed paper
        </h2>
        <p className="lede mt-4">
          Forty minutes feels different when it is running. Do this once before exam week and you
          will find out whether your plan for the essay survives contact with a clock.
        </p>
      </header>

      {mockExams.map((exam) => (
        <TimedPaper key={exam.id} exam={exam} allQuestions={questions} courseSlug={subject.slug} />
      ))}
    </div>
  );
}
