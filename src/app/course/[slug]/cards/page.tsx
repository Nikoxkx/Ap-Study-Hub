import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourse } from "@/lib/catalog";
import { CardDeck } from "@/components/CardDeck";
import { GlassCard } from "@/components/ui/GlassCard";
import { absoluteUrl, socialImages } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const { subject, counts } = course;
  const title = `${subject.familiar} recall cards`;
  const description = `${counts.flashcards} ${subject.familiar} cards covering the terms the exam expects you to define. Keyboard-driven, marks what you miss, no account.`;

  return {
    title,
    description,
    alternates: { canonical: `/course/${subject.slug}/cards` },
    openGraph: {
      images: socialImages,
      title: `${title} · AP Study Hub`,
      description,
      url: absoluteUrl(`/course/${subject.slug}/cards`),
    },
    twitter: { card: "summary_large_image", images: socialImages },
  };
}

export default async function CardsPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const { subject, flashcards, counts } = course;
  if (flashcards.length === 0) notFound();

  return (
    <div className="wrap py-8 md:py-12">
      <div className="mx-auto max-w-3xl space-y-10">
        <GlassCard as="header" padding="lg">
          <p className="label mb-2">{counts.flashcards} cards to recall</p>
          <h2
            className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)] font-semibold"
            style={{ letterSpacing: "-0.025em" }}
          >
            {subject.familiar} recall cards
          </h2>
          <p className="lede mt-3">
            Lesson glossaries feed this deck automatically alongside the original course cards.
            Front is the prompt, back is a definition worth producing cold.
          </p>
        </GlassCard>

        <GlassCard padding="lg">
          <CardDeck cards={flashcards} courseSlug={subject.slug} courseLabel={subject.familiar} />
        </GlassCard>

        <GlassCard as="section" padding="lg" aria-labelledby="all-cards-heading">
          <div className="mb-6">
            <h3 id="all-cards-heading" className="text-[1.375rem] font-semibold">
              Every card, as a list
            </h3>
            <p className="mt-2 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
              The same {counts.flashcards} cards written out for reading on a phone, printing, or
              pasting into whatever you already use.
            </p>
          </div>

          <dl className="divide-y divide-white/60 border-t border-white/60">
            {flashcards.map((card, index) => (
              <div
                key={`${card.front}-${index}`}
                className="grid gap-x-6 gap-y-1 py-3.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]"
              >
                <dt className="flex gap-2.5 text-[0.9375rem] font-semibold">
                  <span
                    aria-hidden="true"
                    className="shrink-0 tabular-nums"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--ink-faint)",
                      lineHeight: "1.5rem",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{card.front}</span>
                </dt>
                <dd className="pl-[1.8rem] text-[0.9375rem] sm:pl-0" style={{ color: "var(--ink-soft)", margin: 0 }}>
                  {card.back}
                  {card.unitNumber ? (
                    <Link
                      href={`/course/${subject.slug}/notes#unit-${card.unitNumber}`}
                      className="link-underlined mt-1.5 block text-[0.75rem]"
                      style={{ color: "var(--ink-faint)" }}
                    >
                      Lesson {card.unitNumber}
                      {card.lessonTitle ? ` · ${card.lessonTitle}` : ""}
                    </Link>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </GlassCard>
      </div>
    </div>
  );
}
