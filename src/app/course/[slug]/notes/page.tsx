import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourse } from "@/lib/catalog";
import { Markdown } from "@/lib/markdown";
import { UnitNav } from "@/components/UnitNav";
import { LessonContent } from "@/components/LessonContent";
import { GlassCard } from "@/components/ui/GlassCard";
import { absoluteUrl, socialImages } from "@/lib/site";
import { writtenWorkCopy } from "@/lib/subjects";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const { subject, counts } = course;
  const title = `${subject.familiar}, explained by someone who sat it`;
  const description = `${counts.units} ${subject.official} lessons written in plain English: ${counts.paragraphs} teaching paragraphs, one worked answer per lesson, a spoken defense for every unit, glossaries, rubric connections and sources you can check.`;

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
  const written = writtenWorkCopy(subject.slug);

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
              {counts.units} lessons · {counts.paragraphs} paragraphs · about{" "}
              {counts.readingMinutes} minutes of reading
            </p>
            <h2
              className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)] font-semibold"
              style={{ letterSpacing: "-0.025em" }}
            >
              {subject.familiar}, one lesson at a time
            </h2>
            <p className="lede mt-3">
              Read the lesson, copy one full answer, then say the defense out loud. That is the whole
              loop, and it is the same for every unit.
            </p>

            <div className="notes-howto">
              <div>
                <p className="label mb-1.5">Every lesson has the same four parts</p>
                <ol className="notes-howto-list">
                  <li><strong>Read it.</strong> Ten or more paragraphs, with the source for each section in the margin.</li>
                  <li><strong>Write one like it.</strong> The question this unit is most likely to ask, a full answer, and why each sentence earns its mark.</li>
                  <li><strong>Defend it.</strong> What to keep as evidence, the question that actually gets asked, and the words to answer with.</li>
                  <li><strong>Check it.</strong> Glossary, rubric connections, and the practice set for this unit.</li>
                </ol>
              </div>
              <div className="notes-paper-key">
                <p className="label mb-1.5">Why the paper changes</p>
                <p>
                  <span className="paper-swatch paper-swatch-quad" aria-hidden="true" />
                  <strong>Squared paper</strong> for anything with numbers in it. The grid keeps
                  columns of working lined up, which is how you stop losing a minus sign halfway down.
                </p>
                <p>
                  <span className="paper-swatch paper-swatch-ruled" aria-hidden="true" />
                  <strong>Ruled paper</strong> for writing with no arithmetic in it — thesis lines,
                  evidence, commentary, and the sentences you would say out loud.
                </p>
              </div>
            </div>
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
                <LessonContent lesson={unit.lesson} courseSlug={subject.slug} subject={subject} />
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
                    marked {written.singular}
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
