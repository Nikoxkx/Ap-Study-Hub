import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse } from "@/lib/catalog";
import { PracticeSet } from "@/components/PracticeSet";
import { GlassCard } from "@/components/ui/GlassCard";
import { absoluteUrl, socialImages } from "@/lib/site";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ unit?: string | string[] }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const { subject, counts } = course;
  const title = `${subject.familiar} questions worth getting wrong`;
  const description = `${counts.questions} original ${subject.familiar} practice questions with reasoned explanations and lesson-linked sets for every unit.`;

  return {
    title,
    description,
    alternates: { canonical: `/course/${subject.slug}/practice` },
    openGraph: {
      images: socialImages,
      title: `${title} · AP Study Hub`,
      description,
      url: absoluteUrl(`/course/${subject.slug}/practice`),
    },
    twitter: { card: "summary_large_image", images: socialImages },
  };
}

export default async function PracticePage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const course = getCourse(slug);
  if (!course) notFound();

  const { subject, questions, counts } = course;
  if (questions.length === 0) notFound();

  const skills = [...new Set(questions.map((q) => q.skill).filter(Boolean))] as string[];
  const requestedUnit = Array.isArray(query.unit) ? query.unit[0] : query.unit;
  const parsedUnit = Number(requestedUnit);
  const initialUnit =
    Number.isInteger(parsedUnit) && questions.some((question) => question.unitNumber === parsedUnit)
      ? parsedUnit
      : undefined;

  return (
    <div className="wrap py-8 md:py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <GlassCard as="header" padding="lg">
          <p className="label mb-2">{counts.questions} questions worth trying</p>
          <h2
            className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)] font-semibold"
            style={{ letterSpacing: "-0.025em" }}
          >
            {subject.familiar} practice that explains your mistakes
          </h2>
          <p className="lede mt-3">
            Original questions with reasoned feedback. Filter to one lesson for focused retrieval,
            or work through the full course set.
          </p>

          {skills.length > 0 ? (
            <div className="mt-5">
              <h3 className="label mb-2">Skills covered</h3>
              <ul className="flex flex-wrap gap-1.5">
                {skills.slice(0, 12).map((skill) => (
                  <li key={skill} className="tag">
                    {skill}
                  </li>
                ))}
                {skills.length > 12 ? <li className="tag">+ {skills.length - 12} more</li> : null}
              </ul>
            </div>
          ) : null}
        </GlassCard>

        <GlassCard padding="lg">
          <PracticeSet questions={questions} courseSlug={subject.slug} initialUnit={initialUnit} />
        </GlassCard>

        <GlassCard as="aside" padding="md">
          <h3 className="label mb-2">A note on where these come from</h3>
          <p className="text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
            None of these are real College Board questions. Released official questions are linked
            from the{" "}
            <a href={`/course/${subject.slug}/resources`} className="link-underlined">
              sources page
            </a>
            .
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
