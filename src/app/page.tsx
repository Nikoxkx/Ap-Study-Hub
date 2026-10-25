import type { Metadata } from "next";
import Link from "next/link";
import { getCatalog, getTotals, nextExam } from "@/lib/catalog";
import { subjects, formatExamDate, examInstant, examTimeLabel, subjectVars } from "@/lib/subjects";
import { daysUntil } from "@/lib/clock";
import { SubjectMark } from "@/components/SubjectMark";
import { Countdown } from "@/components/Countdown";
import { StudySystemVisual } from "@/components/StudySystemVisual";
import { SectionHead, Stat } from "@/components/Furniture";
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

/**
 * Home page.
 *
 * The original index — what this is, what is in it, the catalogue, how the
 * system fits together, the calendar, who wrote it, and the questions —
 * rebuilt on the new visual layer: sky photographs behind glass bands,
 * centred folio section heads, and scroll reveals. Every number on the page
 * is computed from the content that exists.
 */

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

const systemItems = [
  {
    n: "i",
    name: "Notes",
    body: "Curriculum-aligned lessons with at least ten developed paragraphs each, objectives, glossaries, rubric connections, and section-level citations.",
  },
  {
    n: "ii",
    name: "Cards",
    body: "Term on the front, the answer you would actually have to produce on the back. Shuffles with a real Fisher–Yates, keyboard-driven, and it remembers which ones you got wrong.",
  },
  {
    n: "iii",
    name: "Practice",
    body: "Original multiple choice with reasoned feedback, lesson filters, and a route back to the exact teaching when an answer goes wrong.",
  },
  {
    n: "iv",
    name: "Essays",
    body: "Full sample responses with the rubric broken out point by point: what earned the thesis mark, what earned evidence, what would have earned sophistication.",
  },
  {
    n: "v",
    name: "Timed paper",
    body: "Original timed sets with a running clock and constructed source packets. These build stamina without pretending to be full-length released exams.",
  },
  {
    n: "vi",
    name: "Sources",
    body: "Official curriculum and scoring references sit beside supporting textbooks and archives, with checked dates and lesson-level citations.",
  },
];

const willNotDo = [
  "Not affiliated with the College Board, and not reviewed by them.",
  "Not a source of real, unreleased exam questions. Everything here is written from scratch.",
  "Not a replacement for your teacher, your textbook, or AP Classroom.",
  "Not tracking you. No analytics, no cookies, no third-party scripts. Real video thumbnails are images; players and sync are opt-in.",
  "Not finished. Coverage is uneven — the counts on each course tell you exactly how uneven.",
  "Not hiding AI use — see /ai-disclosure for where AI helped draft and how it was checked.",
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

  return (
    <>
      <JsonLd schema={[catalogSchema(), faqSchema(faqs)]} />

      {/* ── Opening ───────────────────────────────────────────────────── */}
      <section className="band hero-band">
        <div className="wrap flex flex-col items-center pt-16 pb-16 text-center md:pt-24 md:pb-20">
          <p className="label" data-reveal style={{ color: "var(--ink-soft)" }}>
            Built by a student · Free since 2025 · {totals.courses} AP courses
          </p>
          <h1
            className="mt-5 max-w-[20ch]"
            data-reveal
            style={{ fontSize: "clamp(2.4rem, 1.5rem + 4.4vw, 4.4rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.04 }}
          >
            Learn seven AP subjects deeply — and turn what sticks into college credit.
          </h1>
          <p className="lede mt-6 max-w-[62ch]" data-reveal>
            {totals.units} lessons and {totals.paragraphs} teaching paragraphs explain the why
            behind every unit. Glossary cards, original practice, marked essays, unit videos, and
            official scoring guidance help you remember it, use it, and earn a score your college
            may accept for credit. Read deeply. Retrieve actively. Study like a person, not a
            test-prep machine.
          </p>
          <div className="neumorph-row mt-8 justify-center" data-reveal>
            <NeumorphicButton href="#catalogue" size="lg">
              Find your course
              <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </NeumorphicButton>
            <NeumorphicButton href="/about" variant="soft" size="lg">
              Meet the student behind it
            </NeumorphicButton>
          </div>

          <dl className="mt-11 grid w-full max-w-2xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4" data-reveal>
            <Stat value={totals.units} label="lessons that explain" tone="mark" />
            <Stat value={totals.flashcards} label="recall cards" />
            <Stat value={totals.questions} label="original questions" />
            <Stat value={totals.paragraphs} label="paragraphs that teach" />
          </dl>

          {/* Study desk overview — live counts, search, next exam, loader. */}
          <div className="mt-12 w-full" data-reveal>
            <GlassCard hover={false} className="overflow-hidden text-left">
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
        </div>
      </section>

      {/* ── 01 · Catalogue ────────────────────────────────────────────── */}
      <section id="catalogue" className="band catalogue-band glass-band py-20 md:py-28" aria-labelledby="catalogue-heading">
        <div className="wrap">
          <div data-reveal>
            <SectionHead folio="01" title="Pick your course. Start with what matters." id="catalogue-heading">
              Each course gives you more than a definition: notes that explain, cards that make you
              recall, original practice, marked essays where they help, timed work, and sources you
              can check. The counts below are what is actually written, not a promise.
            </SectionHead>
          </div>

          <ol className="glass-card mx-auto max-w-[60rem] overflow-hidden p-1.5 sm:p-2" data-reveal>
            {catalog.map((course, index) => {
              const { subject, counts } = course;
              return (
                <li key={subject.slug} className="subject-scope" style={subjectVars(subject)}>
                  <Link
                    href={`/course/${subject.slug}`}
                    className="catalogue-row group relative grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-2 rounded-[14px] px-3 py-4 no-underline md:grid-cols-[2.6rem_minmax(0,1fr)_auto] md:gap-x-6 md:px-4 md:py-5"
                  >
                    <span className="flex flex-col items-center gap-1.5 pt-0.5" style={{ color: "var(--subject-ink)" }} title={subject.symbolLabel}>
                      <SubjectMark subject={subject.mark} size={26} label={subject.symbolLabel} />
                      <span
                        className="max-w-[4.75rem] text-center text-[0.625rem] leading-tight tracking-[0.02em]"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
                      >
                        {subject.topic}
                      </span>
                    </span>

                    <span className="min-w-0">
                      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-[1.125rem] md:text-[1.1875rem]" style={{ fontWeight: 650, letterSpacing: "-0.015em" }}>
                          {subject.official}
                        </span>
                        <span className="tag">{subject.familiar}</span>
                      </span>
                      <span className="mt-1.5 block max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                        {subject.summary}
                      </span>
                      <span
                        className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[0.75rem]"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
                      >
                        <span>{counts.units} lessons · {counts.paragraphs} paragraphs</span>
                        <span>{counts.flashcards} cards</span>
                        <span>{counts.questions} questions</span>
                        {counts.essays > 0 ? <span>{counts.essays} essays</span> : null}
                        <span>~{counts.readingMinutes} min read</span>
                      </span>
                    </span>

                    <span className="col-span-full mt-1 flex items-center gap-4 md:col-span-1 md:mt-0 md:flex-col md:items-end md:gap-1 md:pt-1">
                      <span
                        className="text-[0.75rem] tabular-nums"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
                      >
                        {formatExamDate(subject, "short")}
                      </span>
                      <span
                        className="text-[0.8125rem] font-semibold transition-transform duration-200 group-hover:translate-x-1"
                        style={{ color: "var(--subject-ink)" }}
                      >
                        Open →
                      </span>
                    </span>

                    <span className="sr-only">{`Course ${index + 1} of ${catalog.length}`}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── 02 · How a course page works ──────────────────────────────── */}
      <section id="anatomy" className="band anatomy-band glass-band py-20 md:py-28" aria-labelledby="anatomy-heading">
        <div className="wrap">
          <div data-reveal>
            <SectionHead folio="02" title="Everything you need, without the digging" id="anatomy-heading">
              Six ways in, in the order you will actually use them. Each has its own URL, so you can
              bookmark the bit you need instead of scrolling past the rest.
            </SectionHead>
          </div>

          <figure className="mx-auto mb-12 mt-2 max-w-[62rem]" data-reveal>
            <GlassCard hover={false} className="p-3 sm:p-4">
              <StudySystemVisual />
            </GlassCard>
            <figcaption className="mt-3 text-center text-[0.8125rem]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
              The expanded library is one connected system: read the teaching, retrieve the idea,
              practise an original question, then return to the exact section that needs another look.
            </figcaption>
          </figure>

          <ol className="glass-grid mx-auto max-w-[68rem]">
            {systemItems.map((item) => (
              <li key={item.name}>
                <GlassCard data-reveal className="h-full p-6">
                  <div className="flex items-baseline gap-3">
                    <span
                      className="shrink-0 text-[0.75rem] lowercase"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--mark)" }}
                      aria-hidden="true"
                    >
                      {item.n}
                    </span>
                    <h3 className="text-[1.0625rem]" style={{ fontWeight: 700, letterSpacing: "-0.015em" }}>
                      {item.name}
                    </h3>
                  </div>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                    {item.body}
                  </p>
                </GlassCard>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 03 · Exam calendar ────────────────────────────────────────── */}
      <section id="calendar" className="band calendar-band glass-band py-20 md:py-28" aria-labelledby="calendar-heading">
        <div className="wrap">
          <div data-reveal>
            <SectionHead folio="03" title="Your 2027 deadlines, in plain sight" id="calendar-heading">
              Dates and the AP Research portfolio deadline as published for 2027. Confirm your own
              reporting time with your AP coordinator — school schedules and late-testing windows
              can differ.
            </SectionHead>
          </div>

          <GlassCard data-reveal hover={false} className="mx-auto max-w-[64rem] overflow-hidden p-1.5 sm:p-3">
            <div className="table-scroll">
              <table className="data-table">
                <caption className="sr-only">
                  AP exam dates for the seven courses covered on this site
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Course</th>
                    <th scope="col">Date</th>
                    <th scope="col">Start</th>
                    <th scope="col">Format note</th>
                  </tr>
                </thead>
                <tbody>
                  {[...subjects]
                    .sort((a, b) => a.exam.date.localeCompare(b.exam.date))
                    .map((subject) => (
                      <tr key={subject.slug}>
                        <th scope="row">
                          <Link href={`/course/${subject.slug}`} className="link-underlined">
                            {subject.official}
                          </Link>
                        </th>
                        <td>
                          <time dateTime={subject.exam.date}>{formatExamDate(subject)}</time>
                        </td>
                        <td>{examTimeLabel(subject)}</td>
                        <td style={{ color: "var(--ink-soft)" }}>{subject.summary}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ── 04 · The note ─────────────────────────────────────────────── */}
      <section id="note" className="band note-band glass-band py-20 md:py-28" aria-labelledby="note-heading">
        <div className="wrap">
          <div data-reveal>
            <SectionHead folio="04" title="Why a student built this for you" id="note-heading" />
          </div>

          <div className="mx-auto grid max-w-[68rem] items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <GlassCard data-reveal hover={false} className="p-6 sm:p-8">
              <div className="prose">
                <p className="dropcap">
                  Halfway through junior year I had eleven tabs open and none of them were useful.
                  One site wanted nine dollars a month. One wanted an account before it would show
                  me a single flashcard. The free ones were mostly other people&rsquo;s Quizlet sets
                  with the answers wrong, and the good YouTube explanations were buried four rows
                  down in a recommendation feed that would rather show me something else.
                </p>
                <p>
                  So I started keeping my own notes properly, and at some point it was obvious they
                  would be more useful in public than in a Google Doc. The rule I gave myself is
                  that nothing goes up unless I would have used it myself the week before an exam.
                  That is why there are seven courses and not thirty — I have only sat seven.
                </p>
                <p>
                  If something here is wrong, it is wrong because I got it wrong, and I would rather
                  know.{" "}
                  <a href={`${site.repo}/issues`} rel="noopener noreferrer" target="_blank">
                    Open an issue
                  </a>{" "}
                  and I will fix it.
                </p>
                <p style={{ fontStyle: "italic", color: "var(--ink-soft)" }}>
                  — {site.author.name}
                </p>
              </div>
            </GlassCard>

            <GlassCard data-reveal hover={false} className="p-6">
              <h3 className="label mb-4">What this site will not do</h3>
              <ul className="space-y-3 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                {willNotDo.map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <span aria-hidden="true" style={{ color: "var(--mark)" }}>
                      —
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ── 05 · Questions ────────────────────────────────────────────── */}
      <section id="faq" className="band faq-band glass-band py-20 md:py-28" aria-labelledby="faq-heading">
        <div className="wrap">
          <div data-reveal>
            <SectionHead folio="05" title="Questions you might be asking" id="faq-heading" />
          </div>

          <div className="mx-auto grid max-w-[64rem] gap-5 md:grid-cols-2">
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
