import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourse } from "@/lib/catalog";
import { Markdown } from "@/lib/markdown";
import { UnitNav } from "@/components/UnitNav";
import { LessonContent } from "@/components/LessonContent";
import { GlassCard } from "@/components/ui/GlassCard";
import { absoluteUrl, socialImages } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const { subject, counts } = course;
  const title = `${subject.familiar}, explained properly`;
  const description = `${counts.units} curriculum-aligned ${subject.official} lessons with ${counts.paragraphs} substantive teaching paragraphs, glossaries, exam and rubric connections, and visible sources.`;

  return {
    title,
    description,
    alternates: { canonical: `/course/${subject.slug}/notes` },
    openGraph: {
      images: socialImages,
      title: `${title} · AP Study Hub`,
      description,
      url: absoluteUrl(`/course/${subject.slug}/notes`),
    },
    twitter: { card: "summary_large_image", images: socialImages },
  };
}

export default async function NotesPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const { subject, units, counts } = course;
  if (units.length === 0) notFound();

  return (
    <div className="wrap py-8 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <GlassCard padding="sm">
            <UnitNav
              units={units.map((unit) => ({
                id: `unit-${unit.unitNumber}`,
                number: unit.unitNumber,
                title: unit.title,
              }))}
            />
          </GlassCard>
        </div>

        <div className="min-w-0 space-y-10">
          <GlassCard as="header" padding="lg">
            <p className="label mb-2">
              {counts.units} deep lessons · {counts.paragraphs} teaching paragraphs · about{" "}
              {counts.readingMinutes} minutes
            </p>
            <h2
              className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)] font-semibold"
              style={{ letterSpacing: "-0.025em" }}
            >
              {subject.familiar}, one real lesson at a time
            </h2>
            <p className="lede mt-3">
              Every lesson has at least ten full teaching paragraphs, learning objectives, a
              glossary, curriculum and scoring connections, and cited sources.
            </p>
          </GlassCard>

          {units.map((unit) => (
            <GlassCard
              key={unit.unitNumber}
              as="article"
              id={`unit-${unit.unitNumber}`}
              padding="lg"
              className="scroll-mt-32"
            >
              <div className="mb-7 border-b border-white/60 pb-6">
                <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p
                    className="text-[0.75rem] tabular-nums"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
                  >
                    Lesson {String(unit.unitNumber).padStart(2, "0")}
                  </p>
                  {unit.lesson?.audience ? (
                    <span className="tag">{unit.lesson.audience}</span>
                  ) : null}
                </div>
                <h3
                  className="text-[clamp(1.45rem,1.15rem+1vw,1.9rem)] font-semibold"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {unit.title}
                </h3>
                <p className="mt-3 max-w-[68ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {unit.description}
                </p>
                {unit.lesson ? (
                  <p
                    className="mt-3 text-[0.75rem]"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
                  >
                    Curriculum weight · {unit.lesson.examWeight}
                  </p>
                ) : null}

                {!unit.lesson && unit.keyTerms.length > 0 ? (
                  <>
                    <h4 className="label mb-2 mt-5">Define these without looking</h4>
                    <ul className="flex flex-wrap gap-1.5">
                      {unit.keyTerms.map((term) => (
                        <li key={term} className="tag">
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
            </GlassCard>
          ))}

          <GlassCard as="aside" padding="md">
            <h3 className="label mb-2">Next</h3>
            <p className="text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
              Reading is the easy part. Go and get some of it wrong on the{" "}
              <Link href={`/course/${subject.slug}/practice`} className="link-underlined">
                lesson-linked practice questions
              </Link>
              {course.essays.length > 0 ? (
                <>
                  , then read a{" "}
                  <Link href={`/course/${subject.slug}/essays`} className="link-underlined">
                    marked essay
                  </Link>
                </>
              ) : null}
              .
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
