import type { Metadata } from "next";
import Link from "next/link";
import { getCatalog, getTotals, nextExam } from "@/lib/catalog";
import { formatExamDate, examInstant, examTimeLabel } from "@/lib/subjects";
import { daysUntil } from "@/lib/clock";
import { Countdown } from "@/components/Countdown";
import { JsonLd, catalogSchema, faqSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";
import { SkyInput } from "@/components/ui/SkyInput";
import { SkyLoader } from "@/components/ui/SkyLoader";
import { StatsPanel } from "@/components/StatsPanel";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

const faqs = [
  {
    question: "Do I need an account to use AP Study Hub?",
    answer:
      "No. There is no sign-up, no email capture and no paywall. Nothing on the site is gated, and no page requires JavaScript to read.",
  },
  {
    question: "Is AP Study Hub affiliated with the College Board?",
    answer:
      "No. It is an independent site written by a student. AP and Advanced Placement are registered trademarks of the College Board, which has not reviewed or endorsed anything here.",
  },
  {
    question: "Are these real AP exam questions?",
    answer:
      "No. Practice questions here are original and are labeled as such — fresh drafts, not screenshots of past papers. Released College Board questions are linked from each course's resources page rather than reproduced.",
  },
  {
    question: "Which AP courses are covered?",
    answer:
      "Seven: AP United States History, AP English Language and Composition, AP Seminar, AP United States Government and Politics, AP Biology, AP Calculus AB/BC, and AP Research.",
  },
];

const featureCards = [
  {
    title: "Notes that carry their sources",
    body: "Every unit reads like a lesson, not a summary — and every claim links back to the page it came from.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
        <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v16h5.5A2.5 2.5 0 0 1 20 21.5z" />
      </svg>
    ),
    stats: [
      { label: "Units of teaching prose", value: "units" as const },
      { label: "Estimated reading time", value: "readingMinutes" as const },
    ],
  },
  {
    title: "Practice that explains itself",
    body: "Original multiple choice with an explanation under every option — including the one you picked.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 11.5 11 13.5 15.5 9" />
        <rect x="4" y="4" width="16" height="16" rx="4" />
      </svg>
    ),
    stats: [
      { label: "Practice questions", value: "questions" as const },
      { label: "Flashcards", value: "flashcards" as const },
    ],
  },
  {
    title: "Essays scored like the real thing",
    body: "Rhetorical analysis, synthesis and argument, each broken down against the published rubric row by row.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 20V10" />
        <path d="M12 20V4" />
        <path d="M19 20v-7" />
      </svg>
    ),
    stats: [
      { label: "Scored sample essays", value: "essays" as const },
      { label: "Courses covered", value: "courses" as const },
    ],
  },
];

export default function HomePage() {
  const catalog = getCatalog();
  const totals = getTotals();
  const upcoming = nextExam();
  const daysToNext = upcoming ? daysUntil(examInstant(upcoming)) : 0;

  const panelCourses = catalog.map((course) => ({
    slug: course.subject.slug,
    label: course.subject.familiar,
    questions: course.counts.questions,
    flashcards: course.counts.flashcards,
    units: course.counts.units,
  }));

  const statValue = (key: "units" | "readingMinutes" | "questions" | "flashcards" | "essays" | "courses") => {
    const value = totals[key];
    return key === "readingMinutes" ? `${value} min` : value.toLocaleString("en-US");
  };

  return (
    <>
      <JsonLd schema={[catalogSchema(), faqSchema(faqs)]} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="band hero-band relative" style={{ zIndex: 10 }}>
        <div className="wrap flex flex-col items-center pt-16 text-center md:pt-24">
          <p className="label" data-reveal style={{ color: "var(--ink-soft)" }}>
            Free · No account · Built by a student · {totals.courses} AP courses
          </p>
          <h1
            className="mt-5 max-w-[16ch]"
            data-reveal
            style={{ fontSize: "clamp(2.5rem, 1.6rem + 4.6vw, 4.6rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.02 }}
          >
            A quieter kind of AP prep.
          </h1>
          <p className="lede mt-6 max-w-[54ch]" data-reveal>
            Seven courses of notes, flashcards, practice and scored essays — free, in your
            browser, with nothing to sign up for.
          </p>
          <div className="neumorph-row mt-8 justify-center" data-reveal>
            <NeumorphicButton href="/#courses" size="lg">
              Start a course
              <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </NeumorphicButton>
            <NeumorphicButton href="/videos" variant="soft" size="lg">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
                <path d="M5 3.5v9l7-4.5z" />
              </svg>
              Watch a unit lesson
            </NeumorphicButton>
          </div>
        </div>

        {/* Study desk mock — overlaps the fold into the band below. */}
        <div className="wrap relative z-20 -mb-32 mt-14 md:-mb-40 md:mt-20" data-reveal>
          <GlassCard hover={false} className="overflow-hidden">
            <div
              className="flex flex-wrap items-center justify-between gap-2 border-b px-5 py-4 sm:px-6"
              style={{ borderColor: "var(--rule)" }}
            >
              <p className="text-[0.9375rem]" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>
                Study desk overview
              </p>
              <span className="label" style={{ color: "var(--ink-faint)" }}>
                Live counts from the catalog
              </span>
            </div>

            <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1.55fr_1fr]">
              <StatsPanel courses={panelCourses} totals={totals} />

              <div className="flex flex-col gap-4">
                <form action="/search" method="get" className="sunk p-4">
                  <p className="label mb-3">Search the library</p>
                  <SkyInput name="q" label="Search" placeholder="e.g. Federalism, mitosis, DBQ" />
                  <NeumorphicButton type="submit" size="sm" variant="primary" className="mt-3 w-full">
                    Search
                  </NeumorphicButton>
                </form>

                {upcoming ? (
                  <div className="sunk p-4">
                    <p className="label">Next exam</p>
                    <p className="mt-1.5 text-[0.9375rem]" style={{ fontWeight: 600 }}>
                      {upcoming.official}
                    </p>
                    <p className="mt-0.5 text-[0.8125rem]" style={{ color: "var(--ink-faint)" }}>
                      {formatExamDate(upcoming, "short")} · {examTimeLabel(upcoming)}
                    </p>
                    <div className="mt-3">
                      <Countdown target={examInstant(upcoming)} label={upcoming.familiar} initialDays={daysToNext} />
                    </div>
                  </div>
                ) : null}

                <div className="sunk">
                  <SkyLoader label="Generating your practice set…" />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section className="band features-band glass-band pt-44 pb-20 md:pt-52 md:pb-28">
        <div className="wrap">
          <div className="mx-auto max-w-[46ch] text-center" data-reveal>
            <p className="label" style={{ color: "var(--ink-faint)" }}>
              What is inside
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)]" style={{ fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.08 }}>
              Built for students who would rather not live in the textbook.
            </h2>
          </div>

          <div className="glass-grid mt-12">
            {featureCards.map((card) => (
              <GlassCard key={card.title} data-reveal className="p-6">
                <div className="feature-tile">{card.icon}</div>
                <h3 className="text-[1.125rem]" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
                  {card.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  {card.body}
                </p>
                <dl className="mt-5">
                  {card.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-baseline justify-between border-t py-2.5"
                      style={{ borderColor: "var(--rule)" }}
                    >
                      <dt className="text-[0.8125rem]" style={{ color: "var(--ink-faint)" }}>
                        {stat.label}
                      </dt>
                      <dd className="tnum text-[0.9375rem]" style={{ fontWeight: 700 }}>
                        {statValue(stat.value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES ──────────────────────────────────────────────────── */}
      <section id="courses" className="band courses-band glass-band py-20 md:py-28">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <p className="label" style={{ color: "var(--ink-faint)" }}>
              The library
            </p>
            <h2 className="mt-3 max-w-[17ch] text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)]" style={{ fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.08 }}>
              The semester stops being the place you live.
            </h2>
            <p className="mt-4 max-w-[46ch] text-[1rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              One search, one desk, one place for the notes, the cards, the practice and the
              essays — across every course you are sitting this year.
            </p>

            <ul className="mt-7 space-y-4">
              {[
                "Seven courses sharing one search index and one study desk.",
                "No account, no paywall, no streak emails — just open the page.",
                "Original questions with explanations, plus links to released College Board material.",
              ].map((line) => (
                <li key={line} className="check-bullet">
                  <span className="check-bullet__icon" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3.5 8.5 3 3 6-7" />
                    </svg>
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                    {line}
                  </span>
                </li>
              ))}
            </ul>

            <div className="neumorph-row mt-8">
              <NeumorphicButton href="/study" size="lg">
                Open your study desk
              </NeumorphicButton>
              <NeumorphicButton href="/integrations" variant="soft" size="lg">
                See how it is built
              </NeumorphicButton>
            </div>
          </div>

          <GlassCard data-reveal hover={false} className="p-2 sm:p-3">
            <div className="px-4 pt-3 pb-2">
              <p className="label" style={{ color: "var(--ink-faint)" }}>
                All {totals.courses} courses · 2027 exams
              </p>
            </div>
            {catalog.map((course) => (
              <Link key={course.subject.slug} href={`/course/${course.subject.slug}`} className="course-row">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.9375rem]" style={{ fontWeight: 600 }}>
                    {course.subject.official}
                  </p>
                  <p className="mt-0.5 truncate text-[0.8125rem]" style={{ color: "var(--ink-faint)" }}>
                    {course.counts.units} units · {course.counts.flashcards} cards ·{" "}
                    {course.counts.questions} questions
                  </p>
                </div>
                <span className="label tnum shrink-0" style={{ color: "var(--ink-soft)" }}>
                  {formatExamDate(course.subject, "short")}
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                  className="shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--ink-faint)" }}
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            ))}
          </GlassCard>
        </div>
      </section>

      {/* ── PLANS ────────────────────────────────────────────────────── */}
      <section className="band plans-band glass-band py-20 md:py-28">
        <div className="wrap">
          <div className="mx-auto max-w-[44ch] text-center" data-reveal>
            <p className="label" style={{ color: "var(--ink-faint)" }}>
              Pricing
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)]" style={{ fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.08 }}>
              Free, and it stays that way.
            </h2>
            <p className="mt-4 text-[1rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              One price for every plan below. There is no upgrade button hiding anywhere.
            </p>
          </div>

          <div className="glass-grid mt-12 items-start">
            <GlassCard data-reveal className="flex flex-col p-7 text-center">
              <h3 className="text-[1rem]" style={{ fontWeight: 700 }}>
                Reader
              </h3>
              <p className="mt-4 text-[clamp(2.25rem,2rem+1vw,2.75rem)]" style={{ fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
                $0
                <span className="text-[0.875rem]" style={{ fontWeight: 500, color: "var(--ink-faint)", letterSpacing: 0 }}>
                  {" "}
                  / forever
                </span>
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                Every lesson, every source, every course — read it like a book.
              </p>
              <ul className="mt-5 mb-7 space-y-2.5 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                <li>All seven course libraries</li>
                <li>Cited sources on every page</li>
                <li>Works without an account</li>
              </ul>
              <NeumorphicButton href="/#courses" variant="soft" className="mt-auto w-full">
                Browse courses
              </NeumorphicButton>
            </GlassCard>

            <GlassCard data-reveal className="relative flex flex-col p-7 text-center">
              <span className="plan-badge absolute -top-3 left-1/2 -translate-x-1/2">Most popular</span>
              <h3 className="text-[1rem]" style={{ fontWeight: 700 }}>
                Student
              </h3>
              <p className="mt-4 text-[clamp(2.25rem,2rem+1vw,2.75rem)]" style={{ fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
                $0
                <span className="text-[0.875rem]" style={{ fontWeight: 500, color: "var(--ink-faint)", letterSpacing: 0 }}>
                  {" "}
                  / forever
                </span>
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                The full desk — flashcards, practice, essays and saved progress.
              </p>
              <ul className="mt-5 mb-7 space-y-2.5 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                <li>Everything in Reader</li>
                <li>Flashcards and practice sets</li>
                <li>Scored essays with rubric rows</li>
                <li>Progress kept on your device</li>
              </ul>
              <NeumorphicButton href="/study" className="mt-auto w-full">
                Open the study desk
              </NeumorphicButton>
            </GlassCard>

            <GlassCard data-reveal className="flex flex-col p-7 text-center">
              <h3 className="text-[1rem]" style={{ fontWeight: 700 }}>
                Print &amp; paper
              </h3>
              <p className="mt-4 text-[clamp(2.25rem,2rem+1vw,2.75rem)]" style={{ fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
                $0
                <span className="text-[0.875rem]" style={{ fontWeight: 500, color: "var(--ink-faint)", letterSpacing: 0 }}>
                  {" "}
                  / forever
                </span>
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                Clean black-and-white packets for students who think on paper.
              </p>
              <ul className="mt-5 mb-7 space-y-2.5 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                <li>Printable study packets</li>
                <li>Answer keys included</li>
                <li>No clipping margins, no colour ink</li>
              </ul>
              <NeumorphicButton href="/course/apush/print" variant="soft" className="mt-auto w-full">
                See a sample packet
              </NeumorphicButton>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="band faq-band glass-band py-20 md:py-28">
        <div className="wrap">
          <div className="mx-auto max-w-[40ch] text-center" data-reveal>
            <p className="label" style={{ color: "var(--ink-faint)" }}>
              FAQ
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)]" style={{ fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.08 }}>
              Questions, answered.
            </h2>
          </div>

          <div className="mx-auto mt-11 grid max-w-[62rem] gap-5 md:grid-cols-2">
            {faqs.map((faq) => (
              <GlassCard key={faq.question} data-reveal className="p-6">
                <h3 className="text-[1rem]" style={{ fontWeight: 700, letterSpacing: "-0.015em" }}>
                  {faq.question}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  {faq.answer}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
