import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourse } from "@/lib/catalog";
import { formatExamDate } from "@/lib/subjects";
import { SectionHead, EmptyNote, ExternalLink } from "@/components/Furniture";
import { channelsFor, channelUrl, channelSearchUrl } from "@/lib/channels";
import { videosFor } from "@/lib/videos";
import { VideoShelf } from "@/components/VideoShelf";
import { describe, pageSocial } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const { subject, counts } = course;
  const title = `${subject.familiar} — notes, cards and practice`;
  const description = describe(
    `${counts.units} deep lessons, ${counts.flashcards} cards and ${counts.questions} practice questions for ${subject.official}.`,
    subject.summary,
    `Exam ${formatExamDate(subject, "short")}.`,
    "Free, no account.",
  );

  return {
    title,
    description,
    ...pageSocial({ title, description, path: `/course/${subject.slug}`, type: "article" }),
  };
}

export default async function CourseOverviewPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const { subject, counts, units, tips } = course;
  const base = `/course/${subject.slug}`;
  const channels = channelsFor(subject.slug);
  const videos = videosFor(subject.slug);

  const modes = [
    {
      href: `${base}/notes`,
      label: "Notes",
      count: counts.units,
      unit: counts.units === 1 ? "lesson" : "lessons",
      body: "Ten-plus teaching paragraphs per lesson, with sources and rubric links.",
      show: counts.units > 0,
    },
    {
      href: `${base}/cards`,
      label: "Cards",
      count: counts.flashcards,
      unit: "cards",
      body: "Keyboard-driven. Mark the ones you miss and drill those again.",
      show: counts.flashcards > 0,
    },
    {
      href: `${base}/practice`,
      label: "Practice",
      count: counts.questions,
      unit: "questions",
      body: "One at a time, with an explanation after each answer.",
      show: counts.questions > 0,
    },
    {
      href: `${base}/essays`,
      label: "Essays",
      count: counts.essays,
      unit: counts.essays === 1 ? "sample" : "samples",
      body: "Full responses with the rubric marked point by point.",
      show: counts.essays > 0,
    },
    {
      href: `${base}/exam`,
      label: "Timed paper",
      count: course.mockExams.length,
      unit: course.mockExams.length === 1 ? "paper" : "papers",
      body: "Original timed practice, a running clock, and source packets.",
      show: course.mockExams.length > 0,
    },
    {
      href: `${base}/resources`,
      label: "Sources",
      count: counts.resources,
      unit: "links",
      body: "College Board material, archives and the teachers worth watching.",
      show: counts.resources > 0,
    },
  ].filter((mode) => mode.show);

  return (
    <div className="wrap py-12 md:py-16">
      {/* Study modes */}
      <section aria-labelledby="modes-heading">
        <SectionHead folio="01" title="Where to start" id="modes-heading">
          Six ways into the same material. If you have a week, do the notes then the practice; if
          you have a night, do the cards.
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
          <SectionHead folio="02" title="Lessons at a glance" id="units-heading">
            The official framework in order, with curriculum weighting and the terms each lesson expects
            you to be able to define without looking them up.
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
          <SectionHead folio="02" title="Lessons at a glance" />
          <EmptyNote>
            Unit notes for {subject.familiar} are not written yet. The cards and practice questions
            below are, and the sources page links to material that covers the full framework.
          </EmptyNote>
        </section>
      )}

      {/* Course-specific advice */}
      {tips.length > 0 ? (
        <section className="mt-16" aria-labelledby="tips-heading">
          <SectionHead folio="03" title={`Things I wish I had known about ${subject.familiar}`} id="tips-heading">
            Written after the exam, not before it. The pattern in these is almost always the same:
            the content was known, the form of the answer was not.
          </SectionHead>
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

      {/* Video lessons — embeds that were checked one by one */}
      {videos.length > 0 ? (
        <section className="mt-20" aria-labelledby="videos-heading">
          <SectionHead folio={tips.length > 0 ? "04" : "03"} title="Watch a teacher work through it" id="videos-heading">
            {videos.length} videos chosen for the units students actually get stuck on, embedded here
            so you do not have to leave the notes. Each one was opened and checked before it was
            listed: it plays, it has not been taken down, and it teaches this course rather than a
            neighbouring one. Press play when you want it; nothing loads from YouTube until you do.
          </SectionHead>

          <VideoShelf videos={videos} headingId="videos-heading" />

          <p className="mt-5 text-[0.8125rem]" style={{ color: "var(--ink-faint)" }}>
            Videos are third-party teaching, not part of this site&apos;s own material. If one has
            been removed since it was checked,{" "}
            <ExternalLink href={`${channels[0] ? channelUrl(channels[0]) : "https://www.youtube.com"}`} className="link-underlined">
              the channel
            </ExternalLink>{" "}
            will still have the rest of the series.
          </p>
        </section>
      ) : null}

      {/* Lectures */}
      {channels.length > 0 ? (
        <section className="mt-20" aria-labelledby="lectures-heading">
          <SectionHead folio={videos.length > 0 ? (tips.length > 0 ? "05" : "04") : tips.length > 0 ? "04" : "03"} title="Who to watch" id="lectures-heading">
            The channels behind those videos, plus the ones worth following for the whole course. A
            channel handle keeps working when a creator reorganises their playlists, which is why
            these are links rather than another row of embeds.
          </SectionHead>

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
