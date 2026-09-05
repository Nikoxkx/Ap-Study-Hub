import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse, getCatalog } from "@/lib/catalog";
import { EssayReader } from "@/components/EssayReader";
import { absoluteUrl } from "@/lib/site";

type Params = Promise<{ slug: string }>;
/**
 * Only four courses have essays written against them yet, so only those four
 * get built. The rest fall through to notFound() on request, and CourseTabs
 * never links to them in the first place.
 */
export function generateStaticParams() {
  return getCatalog()
    .filter((course) => course.essays.length > 0)
    .map((course) => ({ slug: course.subject.slug }));
}


export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const { subject, essays } = course;
  const types = [...new Set(essays.map((e) => e.type))].join(", ");
  const title = `${subject.familiar} sample essays with rubric`;
  const description = `${essays.length} full ${subject.familiar} responses (${types}) with every rubric point broken out and explained.`;

  return {
    title,
    description,
    alternates: { canonical: `/course/${subject.slug}/essays` },
    openGraph: { title: `${title} · AP Study Hub`, description, url: absoluteUrl(`/course/${subject.slug}/essays`) },
  };
}

export default async function EssaysPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const { subject, essays } = course;
  if (essays.length === 0) notFound();

  return (
    <div className="wrap py-12 md:py-16">
      <header className="mb-10 max-w-[62ch]">
        <p className="label mb-2">
          {essays.length} {essays.length === 1 ? "response" : "responses"}
        </p>
        <h2 className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)]" style={{ letterSpacing: "-0.025em" }}>
          {subject.familiar} essays, marked
        </h2>
        <p className="lede mt-4">
          A high-scoring response is not a magic text — it is a set of decisions, each of which
          earned a specific point. The margin tells you which decision earned which.
        </p>
      </header>

      <EssayReader essays={essays} />

      <aside className="sunk mt-14 max-w-[62ch] p-5">
        <h3 className="label mb-2">How to use these</h3>
        <p className="text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
          Do not copy the sentences. Copy the moves: where the thesis sits, how a source gets
          introduced before it gets used, what a sentence of commentary looks like when it is doing
          work rather than restating the evidence. Write your own on the same prompt first, then
          come back and mark yours against the same rubric rows.
        </p>
      </aside>
    </div>
  );
}
