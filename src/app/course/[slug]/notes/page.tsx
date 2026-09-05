import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourse } from "@/lib/catalog";
import { Markdown } from "@/lib/markdown";
import { UnitNav } from "@/components/UnitNav";
import { absoluteUrl } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const { subject, counts } = course;
  const title = `${subject.familiar} unit notes`;
  const description = `All ${counts.units} units of ${subject.official} written up in order, with key terms per unit. About ${counts.readingMinutes} minutes of reading.`;

  return {
    title,
    description,
    alternates: { canonical: `/course/${subject.slug}/notes` },
    openGraph: { title: `${title} · AP Study Hub`, description, url: absoluteUrl(`/course/${subject.slug}/notes`) },
  };
}

/**
 * Notes.
 *
 * A two-column reading layout: contents rail on the left, prose on the right,
 * measure capped at 68 characters. The whole thing is server-rendered static
 * HTML — no accordions, no "click to expand". The old version hid every unit
 * inside a collapsed <details>, which meant a crawler saw the headings and none
 * of the body, and a reader had to click nine times to read a chapter.
 */
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
          <header className="mb-10">
            <p className="label mb-2">
              {counts.units} units · about {counts.readingMinutes} minutes
            </p>
            <h2 className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)]" style={{ letterSpacing: "-0.025em" }}>
              {subject.familiar} unit notes
            </h2>
            <p className="lede mt-4">
              Written in the order the course is taught. Bold terms are the ones worth being able to
              define cold — they are the same terms on the{" "}
              <Link href={`/course/${subject.slug}/cards`} className="link-underlined">
                cards
              </Link>
              .
            </p>
          </header>

          {units.map((unit) => (
            <article
              key={unit.unitNumber}
              id={`unit-${unit.unitNumber}`}
              className="mb-16 scroll-mt-32"
            >
              <div className="mb-6 rule-top pt-5">
                <p
                  className="mb-1.5 text-[0.75rem] tabular-nums"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--subject-ink)" }}
                >
                  Unit {String(unit.unitNumber).padStart(2, "0")}
                </p>
                <h3 className="text-[clamp(1.3rem,1.1rem+0.8vw,1.6rem)]" style={{ letterSpacing: "-0.02em" }}>
                  {unit.title}
                </h3>
                <p className="mt-2 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {unit.description}
                </p>

                {unit.keyTerms.length > 0 ? (
                  <>
                    <h4 className="label mt-5 mb-2">Define these without looking</h4>
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

              <div className="prose">
                <Markdown source={unit.content} idPrefix={`u${unit.unitNumber}-`} />
              </div>

              <p className="mt-6 text-[0.8125rem]">
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
                practice questions
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
