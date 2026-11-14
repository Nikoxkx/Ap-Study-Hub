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
      body: "The why, in plain English, with one full written answer and one spoken defense per lesson.",
      show: counts.units > 0,
    },
    {
      href: `${base}/videos`,
      label: "Watch a teacher",
      count: getCourseVideos(subject.slug).length,
      unit: "videos",
      body: "Someone else explaining it, when the page is not landing. One per unit.",
      show: getCourseVideos(subject.slug).length > 0,
    },
    {
      href: `${base}/cards`,
      label: "Make it stick",
      count: counts.flashcards,
      unit: "cards",
      body: "Question on the front, answer on the back. The ones you miss come back tomorrow.",
      show: counts.flashcards > 0,
    },
    {
      href: `${base}/practice`,
      label: "Try it yourself",
      count: counts.questions,
      unit: "questions",
      body: "Get it wrong here, where a wrong answer tells you which paragraph to reread.",
      show: counts.questions > 0,
    },
    {
      href: `${base}/essays`,
      label: "See it marked",
      count: counts.essays,
      unit: counts.essays === 1 ? "sample" : "samples",
      body: "Marked against the real rubric, sentence by sentence, including what did not earn a point.",
      show: counts.essays > 0,
    },
    {
      href: `${base}/exam`,
      label: "Sit the interim",
      count: course.interim?.minutes ?? 0,
      unit: "minutes",
      body: "The whole paper on the clock, then the same paper taught question by question.",
      show: Boolean(course.interim),
    },
    {
      href: `${base}/defense`,
      label: "Defend it out loud",
      count: counts.units,
      unit: "defenses",
      body: "What to keep as evidence, the question that actually gets asked, and the words to answer with.",
      show: counts.units > 0,
    },
    {
      href: `${base}/resources`,
      label: "Check the source",
      count: counts.resources,
      unit: "links",
      body: "The official framework, the scoring documents, and a short list of teachers worth your time.",
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
              Read the lesson, copy one full answer, then say the defense out loud. If you only have ten
              minutes, do the recall cards. Which one you pick matters less than doing one properly.
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

      {/* Written work and the spoken defense: the part every course has and
          most revision sites do not. */}
      <GlassCard as="section" padding="lg">
        <p className="label mb-1.5">02 · Written work and defense</p>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
          <div>
            <h2 className="text-[1.6rem] font-semibold">Every unit has an answer, and a defense of it</h2>
            <p className="mt-2 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
              Each lesson now ends with the question it is most likely to ask, a full-credit answer, and
              the words to say out loud when a teacher asks how you got there. The answer sits on squared
              paper if there is arithmetic in it and ruled paper if there is not, because you will copy it
              onto one of those two.
            </p>
            <ul className="mt-4 space-y-2 text-[0.9rem]" style={{ color: "var(--ink-soft)" }}>
              {[
                "A written example per lesson, with the reason each sentence earns its mark.",
                "The mistake a strong student makes on that question — the useful one, not only the obvious one.",
                "A spoken defense per unit: what to keep as evidence, the question that gets asked, and the order to answer in.",
              ].map((line) => (
                <li key={line} className="flex gap-2.5">
                  <span aria-hidden="true" style={{ color: "var(--mark)" }}>→</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`${base}/defense`} className="btn btn-sm">
                Open the {subject.familiar} defenses
              </Link>
              <Link href={`${base}/notes`} className="link-underlined self-center text-[0.875rem] font-semibold">
                Or read a lesson →
              </Link>
            </div>
          </div>
          <aside className="sunk p-5">
            <p className="label mb-2">What a defense sounds like</p>
            <ol className="space-y-2.5 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
              {[
                "\u201cThe first thing I did was check whether direct substitution worked, because that decides the method.\u201d",
                "\u201cThen I factored, which is legal here because the limit never reaches the hole.\u201d",
                "\u201cMy check was the power rule, and it agreed, so the algebra is probably right.\u201d",
                "\u201cThe weak part is that I assumed the interval was closed, and I should have said so.\u201d",
              ].map((line, index) => (
                <li key={line} className="flex gap-2.5">
                  <span className="shrink-0 text-[0.6875rem]" style={{ fontFamily: "var(--font-mono)", color: "var(--mark)" }}>
                    {index + 1}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </GlassCard>

      {/* Unit index */}
      {units.length > 0 ? (
        <GlassCard as="section" padding="lg" aria-labelledby="units-heading">
          <p className="label mb-1.5">03 · Official Sequence</p>
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
            <p className="label mb-1.5">04 · Practical Advice</p>
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
