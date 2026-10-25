import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourse } from "@/lib/catalog";
import { formatExamDate } from "@/lib/subjects";
import { SectionHead, EmptyNote, ExternalLink } from "@/components/Furniture";
import { channelsFor, channelUrl, channelSearchUrl } from "@/lib/channels";
import { getCourseVideos } from "@/lib/video-lessons";
import { absoluteUrl, describe, socialImages } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const { subject, counts } = course;
  const title = `${subject.familiar} — learn it properly`;
  const description = describe(
    `${counts.units} deep lessons, ${counts.flashcards} cards and ${counts.questions} practice questions for ${subject.official}.`,
    subject.summary,
    `Exam ${formatExamDate(subject, "short")}.`,
    "Free, no account.",
  );

  return {
    title,
    description,
    alternates: { canonical: `/course/${subject.slug}` },
    openGraph: { images: socialImages,
      type: "article",
      title: `${subject.official} · AP Study Hub`,
      description,
      url: absoluteUrl(`/course/${subject.slug}`),
    },
    twitter: { card: "summary_large_image", title, description, images: socialImages },
  };
}

export default async function CourseOverviewPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const { subject, counts, units, tips } = course;
  const base = `/course/${subject.slug}`;
  const channels = channelsFor(subject.slug);

  const modes = [
    {
      href: `${base}/notes`,
      label: "Read the why",
      count: counts.units,
      unit: counts.units === 1 ? "lesson" : "lessons",
      body: "Real explanations, not a glossary. Every lesson shows its sources.",
      show: counts.units > 0,
    },
    {
      href: `${base}/videos`,
      label: "Watch a teacher",
      count: getCourseVideos(subject.slug).length,
      unit: "videos",
      body: "Real YouTube thumbnails and a player beside every unit.",
      show: getCourseVideos(subject.slug).length > 0,
    },
    {
      href: `${base}/cards`,
      label: "Make it stick",
      count: counts.flashcards,
      unit: "cards",
      body: "Find the holes in your memory, then drill just those.",
      show: counts.flashcards > 0,
    },
    {
      href: `${base}/practice`,
      label: "Try it yourself",
      count: counts.questions,
      unit: "questions",
      body: "Get it wrong here, with an explanation, rather than on exam day.",
      show: counts.questions > 0,
    },
    {
      href: `${base}/essays`,
      label: "See it marked",
      count: counts.essays,
      unit: counts.essays === 1 ? "sample" : "samples",
      body: "See exactly which sentence earned which point.",
      show: counts.essays > 0,
    },
    {
      href: `${base}/exam`,
      label: "Beat the clock",
      count: course.mockExams.length,
      unit: course.mockExams.length === 1 ? "paper" : "papers",
      body: "Practise the pacing before the real clock starts.",
      show: course.mockExams.length > 0,
    },
    {
      href: `${base}/resources`,
      label: "Check the source",
      count: counts.resources,
      unit: "links",
      body: "Official material, archives, and teachers worth learning from.",
      show: counts.resources > 0,
    },
  ].filter((mode) => mode.show);

  return (
    <div className="wrap py-12 md:py-16">
      {/* Study modes */}
      <section aria-labelledby="modes-heading">
        <SectionHead folio="01" title="Start where you are" id="modes-heading">
          Pick the way you learn best. If you have a week, read the notes then practise; if you
          have a night, watch the unit video and drill the cards.
        </SectionHead>

        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {modes.map((mode) => (
            <li key={mode.href}>
              <Link
                href={mode.href}
                className="group flex h-full flex-col rule-top pt-4 no-underline"
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-[1.0625rem] font-semibold">{mode.label}</span>
                  <span
                    className="text-[0.75rem] tabular-nums"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--subject-ink)" }}
                  >
                    {mode.count} {mode.unit}
                  </span>
                </span>
                <span
                  className="mt-1.5 flex-1 text-[0.875rem]"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {mode.body}
                </span>
                <span
                  className="mt-3 inline-block text-[0.8125rem] font-semibold transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: "var(--subject-ink)" }}
                >
                  Open →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Unit index */}
      {units.length > 0 ? (
        <section className="mt-16" aria-labelledby="units-heading">
          <SectionHead folio="02" title="Your route through the units" id="units-heading">
            The official framework in order, with unit weights and the terms you should be able to
            explain without peeking.
          </SectionHead>

          <ol>
            {units.map((unit) => (
              <li key={unit.unitNumber} className="rule-top py-4">
                <div className="flex gap-4">
                  <span
                    className="mt-0.5 shrink-0 text-[0.75rem] tabular-nums"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--subject-ink)" }}
                    aria-hidden="true"
                  >
                    {String(unit.unitNumber).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[1.0625rem] font-semibold">
                      <Link href={`${base}/notes#unit-${unit.unitNumber}`} className="link-draw">
                        {unit.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                      {unit.description}
                    </p>
                    {unit.keyTerms.length > 0 ? (
                      <ul className="mt-2.5 flex flex-wrap gap-1.5">
                        {unit.keyTerms.map((term) => (
                          <li key={term} className="tag tag-subject">
                            {term}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : (
        <section className="mt-16">
          <SectionHead folio="02" title="Your route through the units" />
          <EmptyNote>
            Unit notes for {subject.familiar} are not written yet. The cards and practice questions
            below are, and the sources page links to material that covers the full framework.
          </EmptyNote>
        </section>
      )}

      {/* Course-specific advice */}
      {tips.length > 0 ? (
        <section className="mt-16" aria-labelledby="tips-heading">
          <SectionHead folio="03" title={`What I wish I knew before ${subject.familiar}`} id="tips-heading" />
          <div className="grid gap-x-10 gap-y-7 md:grid-cols-2">
            {tips.map((tip) => (
              <article key={tip.title} className="rule-top pt-4">
                <p className="label mb-1.5">{tip.category}</p>
                <h3 className="text-[1.0625rem] font-semibold">{tip.title}</h3>
                <p className="mt-1.5 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {tip.content}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* Lectures */}
      {channels.length > 0 ? (
        <section className="mt-16" aria-labelledby="lectures-heading">
          <SectionHead folio={tips.length > 0 ? "04" : "03"} title="People who explain it well" id="lectures-heading">
            Every unit now has a checked video with its real thumbnail, a direct YouTube link, and
            a replacement search. The channels below are still here for going deeper when a creator reorganises a
            playlist or removes an individual upload.
          </SectionHead>

          <p className="mb-8 max-w-[68ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
            <Link href={`${base}/videos`} className="link-underlined" style={{ color: "var(--ink)" }}>
              Open the {subject.familiar} video library
            </Link>{" "}
            to play the {getCourseVideos(subject.slug).length} curated videos for this course, or find them embedded inside the notes for each unit.
          </p>

          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {channels.map((channel) => (
              <li key={channel.handle} className="rule-top pt-4">
                <h3 className="text-[1.0625rem] font-semibold">
                  <ExternalLink href={channelUrl(channel)} className="link-draw">
                    {channel.name}
                  </ExternalLink>
                </h3>
                <p className="mt-1 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                  {channel.who}.
                </p>
                <p className="mt-2.5">
                  <ExternalLink
                    href={channelSearchUrl(channel, `${subject.familiar} review`)}
                    className="text-[0.8125rem] link-underlined"
                  >
                    Search this channel for {subject.familiar}
                  </ExternalLink>
                </p>
                <p className="mt-2 text-[0.6875rem]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
                  Link checked {channel.checked}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
