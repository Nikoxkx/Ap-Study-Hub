import type { Metadata } from "next";
import { formatExamDate } from "@/lib/subjects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourse } from "@/lib/catalog";
import { Markdown } from "@/lib/markdown";
import { UnitNav } from "@/components/UnitNav";
import { LessonContent } from "@/components/LessonContent";
import { VideoShelf } from "@/components/VideoShelf";
import { TornNote } from "@/components/Paper";
import { videosForUnit } from "@/lib/videos";
import { describe, pageSocial } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const { subject, counts, units } = course;
  const title = `${subject.familiar} deep lessons`;
  const description = describe(
    `${counts.units} curriculum-aligned ${subject.official} lessons and ${counts.paragraphs} teaching paragraphs.`,
    `Each lesson carries objectives, a glossary, worked solutions and cited sources.`,
    `About ${counts.readingMinutes} minutes of reading, exam ${formatExamDate(subject, "short")}.`,
    units.length > 0 ? `Unit 1: ${units[0].title}.` : "",
  );

  return {
    title,
    description,
    ...pageSocial({ title, description, path: `/course/${subject.slug}/notes`, type: "article" }),
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
              <div className="mb-7 rule-top pt-6 lesson-opener">
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

              {videosForUnit(subject.slug, unit.unitNumber).length > 0 ? (
                <section aria-label={`Video for ${unit.title}`} className="mt-10">
                  <h4 className="mb-1 text-[1.0625rem]">If this unit is still not landing</h4>
                  <p className="mb-4 max-w-[60ch] text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                    A teacher working the same unit in the same order, embedded here rather than
                    linked away. Checked and playable; nothing loads until you press play.
                  </p>
                  <VideoShelf
                    videos={videosForUnit(subject.slug, unit.unitNumber)}
                    compact
                  />
                </section>
              ) : null}

              <p className="mt-9 text-[0.8125rem]">
                <a href="#unit-contents" className="link-underlined" style={{ color: "var(--ink-faint)" }}>
                  ↑ Back to contents
                </a>
              </p>
            </article>
          ))}

          <TornNote label="A note on the way out">
            <p>
              Reading is the easy part. Before you close this tab, write down — on paper, from memory —
              the three claims you would use in an essay on this course, and the one piece of evidence
              for each. If you cannot, you have found what to review, and the mistake notebook on your{" "}
              <Link href="/study" style={{ color: "inherit", textDecoration: "underline" }}>
                study desk
              </Link>{" "}
              is where it should go.
            </p>
          </TornNote>

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
