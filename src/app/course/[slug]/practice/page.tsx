import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse } from "@/lib/catalog";
import { PracticeSet } from "@/components/PracticeSet";
import { pageMetadata } from "@/lib/metadata";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ unit?: string | string[] }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const { subject, counts } = course;
  const title = `${subject.familiar} practice questions`;
  const description = `${counts.questions} original ${subject.familiar} practice questions with reasoned explanations and lesson-linked sets for every unit.`;

  return pageMetadata({
    title,
    description,
    path: `/course/${subject.slug}/practice`,
    ogTitle: `${counts.questions} questions, every wrong answer explained`,
    ogDescription: description,
    type: "article",
    modified: subject.revised,
    keywords: [`${subject.familiar} practice questions`, `${subject.familiar} multiple choice`, `AP ${subject.familiar} quiz`],
  });
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
  const initialUnit = Number.isInteger(parsedUnit) && questions.some((question) => question.unitNumber === parsedUnit)
    ? parsedUnit
    : undefined;

  return (
    <div className="wrap py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-9">
          <p className="label mb-2">{counts.questions} questions</p>
          <h2 className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)]" style={{ letterSpacing: "-0.025em" }}>
            {subject.familiar} practice
          </h2>
          <p className="lede mt-4">
            Original questions with reasoned feedback. Filter to one lesson for focused retrieval,
            or work through the full course set; every lesson-linked answer includes a route back to
            the teaching you need.
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
        </header>

        <PracticeSet questions={questions} courseSlug={subject.slug} initialUnit={initialUnit} />

        <aside className="sunk mt-14 p-5">
          <h3 className="label mb-2">A note on where these come from</h3>
          <p className="text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
            None of these are real College Board questions. Reproducing secure exam material would
            be both illegal and useless — you would be memorising items you will never see again.
            Released official questions, which are the genuine article, are linked from the{" "}
            <a href={`/course/${subject.slug}/resources`} className="link-underlined" style={{ color: "var(--ink)" }}>
              sources page
            </a>
            .
          </p>
        </aside>
      </div>
    </div>
  );
}
