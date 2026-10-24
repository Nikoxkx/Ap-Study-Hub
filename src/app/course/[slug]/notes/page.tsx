import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourse } from "@/lib/catalog";
import { Markdown } from "@/lib/markdown";
import { UnitNav } from "@/components/UnitNav";
import { LessonContent } from "@/components/LessonContent";
import { absoluteUrl } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const { subject, counts } = course;
  const title = `${subject.familiar} deep lessons`;
  const description = `${counts.units} curriculum-aligned ${subject.official} lessons with ${counts.paragraphs} substantive teaching paragraphs, glossaries, exam and rubric connections, and visible sources.`;

  return {
    title,
    description,
    alternates: { canonical: `/course/${subject.slug}/notes` },
    openGraph: { title: `${title} · AP Study Hub`, description, url: absoluteUrl(`/course/${subject.slug}/notes`) },
  };
}

/** Server-rendered, long-form course lessons with a contents rail. */
export default async function NotesPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const { subject, units, counts } = course;
  if (units.length === 0) notFound();

  return (
    <div className="wrap py-12 md:py-16">
      <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
        <UnitNav
          units={units.map((unit) => ({
            id: `unit-${unit.unitNumber}`,
            number: unit.unitNumber,
            title: unit.title,
          }))}
        />

        <div className="min-w-0">
          <header className="mb-12 max-w-[68ch]">
            <p className="label mb-2">
              {counts.units} deep lessons · {counts.paragraphs} teaching paragraphs · about {counts.readingMinutes} minutes
            </p>
            <h2 className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)]" style={{ letterSpacing: "-0.025em" }}>
              {subject.familiar}, lesson by lesson
            </h2>
            <p className="lede mt-4">
              Every lesson has at least ten full teaching paragraphs, learning objectives, a glossary,
              curriculum and scoring connections, and cited sources. Follow the official course sequence,
              or use the contents to repair a specific gap.
            </p>
          </header>

          {units.map((unit) => (
            <article
              key={unit.unitNumber}
              id={`unit-${unit.unitNumber}`}
              className="mb-20 scroll-mt-32"
            >
              <div className="mb-7 rule-top pt-6">
                <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p
                    className="text-[0.75rem] tabular-nums"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--subject-ink)" }}
                  >
                    Lesson {String(unit.unitNumber).padStart(2, "0")}
                  </p>
                  {unit.lesson?.audience ? <span className="tag tag-subject">{unit.lesson.audience}</span> : null}
                </div>
                <h3 className="text-[clamp(1.45rem,1.15rem+1vw,1.9rem)]" style={{ letterSpacing: "-0.02em" }}>
                  {unit.title}
                </h3>
                <p className="mt-3 max-w-[68ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {unit.description}
                </p>
                {unit.lesson ? (
                  <p className="mt-3 text-[0.75rem]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
                    Curriculum weight · {unit.lesson.examWeight}
                  </p>
                ) : null}

                {!unit.lesson && unit.keyTerms.length > 0 ? (
                  <>
                    <h4 className="label mb-2 mt-5">Define these without looking</h4>
                    <ul className="flex flex-wrap gap-1.5">
                      {unit.keyTerms.map((term) => (
                        <li key={term} className="tag tag-subject">
                          {term}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>

              {unit.lesson ? (
                <LessonContent lesson={unit.lesson} courseSlug={subject.slug} />
              ) : (
                <div className="prose">
                  <Markdown source={unit.content} idPrefix={`u${unit.unitNumber}-`} />
                </div>
              )}

              <p className="mt-7 text-[0.8125rem]">
                <a href="#unit-contents" className="link-underlined" style={{ color: "var(--ink-faint)" }}>
                  ↑ Back to contents
                </a>
              </p>
            </article>
          ))}

          <aside className="sunk mt-12 p-5">
            <h3 className="label mb-2">Next</h3>
            <p className="text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
              Reading is the easy part. Go and get some of it wrong on the{" "}
              <Link href={`/course/${subject.slug}/practice`} className="link-underlined" style={{ color: "var(--ink)" }}>
                lesson-linked practice questions
              </Link>
              {course.essays.length > 0 ? (
                <>
                  , then read a{" "}
                  <Link href={`/course/${subject.slug}/essays`} className="link-underlined" style={{ color: "var(--ink)" }}>
                    marked essay
                  </Link>
                </>
              ) : null}
              .
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
