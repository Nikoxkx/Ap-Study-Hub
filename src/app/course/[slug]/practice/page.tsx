import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse } from "@/lib/catalog";
import { PracticeSet } from "@/components/PracticeSet";
import { absoluteUrl } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const { subject, counts } = course;
  const title = `${subject.familiar} practice questions`;
  const description = `${counts.questions} multiple-choice questions written in ${subject.familiar} exam register, each with an explanation of why the other options fail.`;

  return {
    title,
    description,
    alternates: { canonical: `/course/${subject.slug}/practice` },
    openGraph: { title: `${title} · AP Study Hub`, description, url: absoluteUrl(`/course/${subject.slug}/practice`) },
  };
}

export default async function PracticePage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const { subject, questions, counts } = course;
  if (questions.length === 0) notFound();

  const skills = [...new Set(questions.map((q) => q.skill).filter(Boolean))] as string[];

  return (
    <div className="wrap py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-9">
          <p className="label mb-2">{counts.questions} questions</p>
          <h2 className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)]" style={{ letterSpacing: "-0.025em" }}>
            {subject.familiar} practice
          </h2>
          <p className="lede mt-4">
            Written from scratch to match the difficulty band and the wording style of the real
            paper. The distractors are the ones people actually pick.
          </p>

          {skills.length > 0 ? (
            <div className="mt-5">
              <h3 className="label mb-2">Skills covered</h3>
              <ul className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <li key={skill} className="tag">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </header>

        <PracticeSet questions={questions} />

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
