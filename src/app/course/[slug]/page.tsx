import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourse } from "@/lib/catalog";
import { formatExamDate } from "@/lib/subjects";
import { EmptyNote, ExternalLink } from "@/components/Furniture";
import { GlassCard } from "@/components/ui/GlassCard";
import { DownloadButton } from "@/components/ui/DownloadButton";
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
    openGraph: {
      images: socialImages,
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
      label: "Sit the interim",
      count: course.interim?.minutes ?? 0,
      unit: "minutes",
      body: "The whole exam in the official format, then the same paper taught step by step.",
      show: Boolean(course.interim),
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
    <div className="wrap space-y-12 py-8 md:py-12">
      {/* Study modes grid + Quick Quad */}
      <section aria-labelledby="modes-heading">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="label mb-1.5">01 · Study Modes</p>
            <h2
              id="modes-heading"
              className="canvas-heading text-[clamp(1.55rem,1.25rem+1.1vw,2.15rem)] font-semibold"
            >
              Start where you are
            </h2>
            <p className="canvas-subtext mt-2 text-[0.95rem]">
              Pick the way you learn best. Read the notes then practise, or watch the unit video
              and drill the recall cards.
            </p>
          </div>
          <DownloadButton href={`${base}/print`} internal>
            Printable packet
          </DownloadButton>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modes.map((mode) => (
            <li key={mode.href} className="flex">
              <Link
                href={mode.href}
                className="glass-box glass-box-interactive flex w-full flex-col justify-between p-5 no-underline"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[1.0625rem] font-semibold">{mode.label}</span>
                    <span className="tag tabular-nums">
                      {mode.count} {mode.unit}
                    </span>
                  </div>
                  <p className="mt-2.5 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                    {mode.body}
                  </p>
                </div>
                <span className="mt-4 inline-block text-[0.8125rem] font-semibold">
                  Open →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Unit index */}
      {units.length > 0 ? (
        <GlassCard as="section" padding="lg" aria-labelledby="units-heading">
          <p className="label mb-1.5">02 · Official Sequence</p>
          <h2 id="units-heading" className="text-[1.6rem] font-semibold">
            Your route through the units
          </h2>
          <p className="mt-2 max-w-[60ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
            The official framework in order, with unit weights and the terms you should be able to
            explain without peeking.
          </p>

          <ol className="mt-6 divide-y divide-white/60">
            {units.map((unit) => (
              <li key={unit.unitNumber} className="py-4">
                <div className="flex gap-4">
                  <span
                    className="mt-0.5 shrink-0 text-[0.75rem] tabular-nums"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
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
                          <li key={term} className="tag">
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
        </GlassCard>
      ) : (
        <GlassCard as="section" padding="lg">
          <h2 className="mb-3 text-[1.5rem] font-semibold">Your route through the units</h2>
          <EmptyNote>
            Unit notes for {subject.familiar} are not written yet. The cards and practice questions
            below are, and the sources page links to material that covers the full framework.
          </EmptyNote>
        </GlassCard>
      )}

      {/* Course-specific advice */}
      {tips.length > 0 ? (
        <section aria-labelledby="tips-heading">
          <div className="mb-6">
            <p className="label mb-1.5">03 · Practical Advice</p>
            <h2
              id="tips-heading"
              className="canvas-heading text-[1.6rem] font-semibold"
            >
              What I wish I knew before {subject.familiar}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {tips.map((tip) => (
              <GlassCard key={tip.title} as="article" padding="md">
                <p className="label mb-1.5">{tip.category}</p>
                <h3 className="text-[1.0625rem] font-semibold">{tip.title}</h3>
                <p className="mt-1.5 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {tip.content}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>
      ) : null}

      {/* Lectures */}
      {channels.length > 0 ? (
        <GlassCard as="section" padding="lg" aria-labelledby="lectures-heading">
          <p className="label mb-1.5">{tips.length > 0 ? "04" : "03"} · Teachers & Channels</p>
          <h2 id="lectures-heading" className="text-[1.6rem] font-semibold">
            People who explain it well
          </h2>
          <p className="mt-2 max-w-[68ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
            <Link href={`${base}/videos`} className="link-underlined">
              Open the {subject.familiar} video library
            </Link>{" "}
            to play the {getCourseVideos(subject.slug).length} curated videos for this course, or
            explore these channels for deeper playlists.
          </p>

          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {channels.map((channel) => (
              <li
                key={channel.handle}
                className="rounded-2xl border border-white/75 bg-white/30 p-4 dark:bg-white/5"
              >
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
                <p
                  className="mt-2 text-[0.6875rem]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
                >
                  Link checked {channel.checked}
                </p>
              </li>
            ))}
          </ul>
        </GlassCard>
      ) : null}
    </div>
  );
}
