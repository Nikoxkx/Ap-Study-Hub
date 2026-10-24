import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourse } from "@/lib/catalog";
import { CardDeck } from "@/components/CardDeck";
import { describe, pageSocial } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const { subject, counts } = course;
  const title = `${subject.familiar} flashcards`;
  const description = describe(
    `${counts.flashcards} ${subject.familiar} index cards covering the terms the exam expects you to define.`,
    `Answer on the back, keyboard-driven, and it remembers which ones you keep missing.`,
    `Free, no account.`,
  );

  return {
    title,
    description,
    ...pageSocial({ title, description, path: `/course/${subject.slug}/cards`, type: "article" }),
  };
}

/**
 * Cards.
 *
 * The interactive deck needs JavaScript, so the full list is also rendered
 * underneath as plain definition markup. That is not a fallback bolted on for
 * politeness — it is the version a crawler indexes, the version that prints,
 * and the version that works on a school network that has broken something.
 */
export default async function CardsPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const { subject, flashcards, counts } = course;
  if (flashcards.length === 0) notFound();

  return (
    <div className="wrap py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-9">
          <p className="label mb-2">{counts.flashcards} cards</p>
          <h2 className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)]" style={{ letterSpacing: "-0.025em" }}>
            {subject.familiar} cards
          </h2>
          <p className="lede mt-4">
            Lesson glossaries now feed this deck automatically, alongside the original course cards.
            Front is the prompt, back is a definition worth producing cold. Linked cards take you
            straight to the full lesson; &ldquo;again&rdquo; marks stay only in your browser.
          </p>
        </header>

        <CardDeck cards={flashcards} courseSlug={subject.slug} courseLabel={subject.familiar} />

        <section className="mt-20" aria-labelledby="all-cards-heading">
          <div className="mb-6 rule-top pt-5">
            <h3 id="all-cards-heading" className="text-[1.375rem]">
              Every card, as a list
            </h3>
            <p className="mt-2 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
              The same {counts.flashcards} cards written out, for reading on a phone, printing, or
              pasting into whatever you already use.
            </p>
          </div>

          <dl className="rule-top">
            {flashcards.map((card, index) => (
              <div
                key={`${card.front}-${index}`}
                className="grid gap-x-6 gap-y-1 rule-bottom py-3.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]"
              >
                <dt className="flex gap-2.5 text-[0.9375rem] font-semibold">
                  <span
                    aria-hidden="true"
                    className="shrink-0 tabular-nums"
                    style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--rule-strong)", lineHeight: "1.5rem" }}
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
                      Lesson {card.unitNumber}{card.lessonTitle ? ` · ${card.lessonTitle}` : ""}
                    </Link>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="mt-10 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
          Once these are solid, go and{" "}
          <Link href={`/course/${subject.slug}/practice`} className="link-underlined" style={{ color: "var(--ink)" }}>
            use them under exam conditions
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
