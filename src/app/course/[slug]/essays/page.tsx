import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse, getCatalog } from "@/lib/catalog";
import { EssayReader } from "@/components/EssayReader";
import { GlassCard } from "@/components/ui/GlassCard";
import { absoluteUrl, socialImages } from "@/lib/site";

type Params = Promise<{ slug: string }>;

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
  const title = `${subject.familiar} essays, marked and explained`;
  const description = `${essays.length} full ${subject.familiar} responses (${types}) with every rubric point broken out and explained.`;

  return {
    title,
    description,
    alternates: { canonical: `/course/${subject.slug}/essays` },
    openGraph: {
      images: socialImages,
      title: `${title} · AP Study Hub`,
      description,
      url: absoluteUrl(`/course/${subject.slug}/essays`),
    },
    twitter: { card: "summary_large_image", images: socialImages },
  };
}

export default async function EssaysPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const { subject, essays } = course;
  if (essays.length === 0) notFound();

  return (
    <div className="wrap space-y-8 py-8 md:py-12">
      <GlassCard as="header" padding="lg">
        <p className="label mb-2">
          {essays.length} {essays.length === 1 ? "response" : "responses"}
        </p>
        <h2
          className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)] font-semibold"
          style={{ letterSpacing: "-0.025em" }}
        >
          {subject.familiar} essays, marked so you can see why
        </h2>
        <p className="lede mt-3">
          A high-scoring response is a set of decisions, each of which earned a specific point. The
          margin tells you which decision earned which.
        </p>
      </GlassCard>

      <GlassCard padding="lg">
        <EssayReader essays={essays} />
      </GlassCard>

      <GlassCard as="aside" padding="md">
        <h3 className="label mb-2">How to use these</h3>
        <p className="max-w-[65ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
          Do not copy the sentences. Copy the moves: where the thesis sits, how a source gets
          introduced before it gets used, and what a sentence of commentary looks like when it is
          doing work rather than restating evidence.
        </p>
      </GlassCard>
    </div>
  );
}
