import type { Metadata } from "next";
import { formatExamDate } from "@/lib/subjects";
import { notFound } from "next/navigation";
import { getCourse, getCatalog } from "@/lib/catalog";
import { TimedPaper } from "@/components/TimedPaper";
import { describe, pageSocial } from "@/lib/site";

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
  const description = describe(
    `Sit an original ${minutes}-minute ${subject.familiar} paper with a running clock and constructed source packets.`,
    `Every question is written for this site, with the answers and self-check criteria shown afterwards.`,
    `Exam ${formatExamDate(subject, "short")}. Free, no account.`,
  );

  return {
    title,
    description,
    ...pageSocial({ title, description, path: `/course/${subject.slug}/exam`, type: "article" }),
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
          A running clock feels different from untimed practice. These original sets build pacing and stamina;
          they are not full-length released exams. Use the official papers linked in Sources for that.
        </p>
      </header>

      {mockExams.map((exam) => (
        <TimedPaper key={exam.id} exam={exam} allQuestions={questions} courseSlug={subject.slug} />
      ))}
    </div>
  );
}
