import type { Metadata } from "next";
import Link from "next/link";
import { getCatalog, getTotals, nextExam } from "@/lib/catalog";
import { subjects, formatExamDate, examInstant, examTimeLabel, subjectVars } from "@/lib/subjects";
import { daysUntil } from "@/lib/clock";
import { SubjectMark } from "@/components/SubjectMark";
import { Countdown } from "@/components/Countdown";
import { SectionHead, Stat } from "@/components/Furniture";
import { JsonLd, catalogSchema, faqSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * Home page.
 *
 * Structured as an index, not a landing page: what this is, what is in it, the
 * catalogue, how to use it, who wrote it, and what it deliberately does not do.
 * Every number on the page is computed from the content that exists.
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
      "No. Every practice question here is written from scratch in the style and difficulty band of the real exam. Released College Board questions are linked to on each course's resources page rather than reproduced.",
  },
  {
    question: "Which AP courses are covered?",
    answer:
      "Seven: AP United States History, AP English Language and Composition, AP Seminar, AP United States Government and Politics, AP Biology, AP Calculus AB/BC, and AP Research.",
  },
];

export default function HomePage() {
  const catalog = getCatalog();
  const totals = getTotals();
  const upcoming = nextExam();
  const daysToNext = upcoming ? daysUntil(examInstant(upcoming)) : 0;

  return (
    <>
      <JsonLd schema={[catalogSchema(), faqSchema(faqs)]} />

      {/* ── Opening ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden grain rule-bottom">
        <div className="ruled absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="wrap relative grid gap-12 py-14 md:py-20 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="label mb-5">Independent · Est. 2025 · {totals.courses} courses</p>
            <h1
              className="text-[clamp(2.1rem,1.4rem+3.1vw,3.9rem)]"
              style={{ letterSpacing: "-0.028em", lineHeight: 1.04 }}
            >
              Seven AP courses, written up the way I actually revised for them.
            </h1>

            <p className="lede mt-6">
              Unit notes, the cards I drilled on the bus, and sample essays with the rubric points
              marked in the margin. I sat these exams. This is what I wish had existed.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="#catalogue" className="btn btn-solid">
                Browse the seven courses
              </Link>
              <Link href="/about" className="btn btn-outline">
                How this is put together
              </Link>
            </div>

            <dl className="mt-11 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
              <Stat value={totals.units} label="units of notes" tone="mark" />
              <Stat value={totals.flashcards} label="index cards" />
              <Stat value={totals.questions} label="practice questions" />
              <Stat value={totals.essays} label="marked essays" />
            </dl>
          </div>

          {/* Standing block: the next exam. Live data, not an ornament. */}
          {upcoming ? (
            <aside
              className="sheet-tabbed self-start p-6"
              style={subjectVars(upcoming)}
              aria-labelledby="next-exam-heading"
            >
              <p className="label mb-1">Soonest exam</p>
              <h2
                id="next-exam-heading"
                className="text-[1.375rem]"
                style={{ color: "var(--subject-ink)" }}
              >
                {upcoming.official}
              </h2>
              <p className="mt-1 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                <time dateTime={upcoming.exam.date}>{formatExamDate(upcoming)}</time>,{" "}
                {examTimeLabel(upcoming)}
              </p>

              <div className="my-5 h-px w-full" style={{ background: "var(--rule)" }} />

              <Countdown
                target={examInstant(upcoming)}
                label={upcoming.familiar}
                initialDays={daysToNext}
              />

              <Link
                href={`/course/${upcoming.slug}`}
                className="link-draw mt-6 inline-block text-[0.875rem] font-semibold"
                style={{ color: "var(--subject-ink)" }}
              >
                Open {upcoming.familiar} →
              </Link>
            </aside>
          ) : null}
        </div>
      </section>

      {/* ── Catalogue ───────────────────────────────────────────────────── */}
      <section id="catalogue" className="wrap py-16 md:py-20" aria-labelledby="catalogue-heading">
        <SectionHead folio="01" title="The catalogue" id="catalogue-heading">
          Every course page is the same seven parts: notes, cards, practice, essays where the exam
          has them, a timed paper, and a list of sources worth your time. Counts below are what is
          actually written, not what is planned.
        </SectionHead>

        <ol className="rule-top">
          {catalog.map((course, index) => {
            const { subject, counts } = course;
            return (
              <li key={subject.slug} style={subjectVars(subject)}>
                <Link
                  href={`/course/${subject.slug}`}
                  className="group relative grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-2 rule-bottom py-5 no-underline transition-[padding,background-color] duration-200 ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:pl-3 md:grid-cols-[2.6rem_minmax(0,1fr)_auto] md:gap-x-6 md:py-6"
                >
                  {/* Spine that draws in on hover — the one hover idiom, reused. */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 transition-transform duration-250 ease-[cubic-bezier(0.2,0.7,0.3,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
                    style={{ background: "var(--subject-ink)" }}
                  />

                  <span
                    className="flex flex-col items-center gap-1.5 pt-0.5"
                    style={{ color: "var(--subject-ink)" }}
                  >
                    <SubjectMark subject={subject.mark} size={26} />
                    <span
                      className="text-[0.625rem] tracking-[0.1em]"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
                    >
                      {subject.code}
                    </span>
                  </span>

                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span
                        className="text-[1.1875rem] font-medium"
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}
                      >
                        {subject.official}
                      </span>
                      <span className="tag">{subject.familiar}</span>
                    </span>
                    <span
                      className="mt-1.5 block max-w-[62ch] text-[0.9375rem]"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      {subject.summary}
                    </span>
                    <span
                      className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[0.75rem]"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
                    >
                      <span>{counts.units} units</span>
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
      </section>

      {/* ── How a course page works ─────────────────────────────────────── */}
      <section
        className="rule-top py-16 md:py-20"
        style={{ background: "var(--paper-raised)" }}
        aria-labelledby="anatomy-heading"
      >
        <div className="wrap">
          <SectionHead folio="02" title="What is on a course page" id="anatomy-heading">
            Six things, in the order you are likely to want them. Each one is its own URL, so you
            can bookmark the bit you are working through instead of scrolling past the rest.
          </SectionHead>

          <ol className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                n: "i",
                name: "Notes",
                body: "Unit-by-unit write-ups following the College Board framework, with the key terms pulled out at the top of each unit so you can self-test before reading.",
              },
              {
                n: "ii",
                name: "Cards",
                body: "Term on the front, the answer you would actually have to produce on the back. Shuffles with a real Fisher–Yates, keyboard-driven, and it remembers which ones you got wrong.",
              },
              {
                n: "iii",
                name: "Practice",
                body: "Multiple choice written in exam register — plausible distractors, not three obviously wrong answers — with an explanation for why each option fails.",
              },
              {
                n: "iv",
                name: "Essays",
                body: "Full sample responses with the rubric broken out point by point: what earned the thesis mark, what earned evidence, what would have earned sophistication.",
              },
              {
                n: "v",
                name: "Timed paper",
                body: "The full-length format with a running clock and the source documents embedded, so you find out how long forty minutes really is before it counts.",
              },
              {
                n: "vi",
                name: "Sources",
                body: "Links out to College Board material, archives and the teachers worth watching. Every link was opened by a person before it was added.",
              },
            ].map((item) => (
              <li key={item.name} className="rule-top pt-4">
                <div className="flex items-baseline gap-3">
                  <span
                    className="shrink-0 text-[0.75rem] lowercase"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--mark)" }}
                    aria-hidden="true"
                  >
                    {item.n}
                  </span>
                  <h3 className="text-[1.0625rem] font-semibold">{item.name}</h3>
                </div>
                <p className="mt-2 pl-[1.9rem] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Exam calendar ───────────────────────────────────────────────── */}
      <section className="wrap py-16 md:py-20" aria-labelledby="calendar-heading">
        <SectionHead folio="03" title="2026 exam calendar" id="calendar-heading">
          Dates as published by the College Board for the May 2026 administration. Confirm your own
          schedule with your AP coordinator — late-testing windows differ by school.
        </SectionHead>

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
      </section>

      {/* ── The note ────────────────────────────────────────────────────── */}
      <section
        className="rule-top py-16 md:py-20"
        style={{ background: "var(--paper-raised)" }}
        aria-labelledby="note-heading"
      >
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div>
            <SectionHead folio="04" title="Why this exists" id="note-heading" />
            <div className="prose">
              <p className="dropcap">
                Halfway through junior year I had eleven tabs open and none of them were useful. One
                site wanted nine dollars a month. One wanted an account before it would show me a
                single flashcard. The free ones were mostly other people&rsquo;s Quizlet sets with
                the answers wrong, and the good YouTube explanations were buried four rows down in a
                recommendation feed that would rather show me something else.
              </p>
              <p>
                So I started keeping my own notes properly, and at some point it was obvious they
                would be more useful in public than in a Google Doc. The rule I gave myself is that
                nothing goes up unless I would have used it myself the week before an exam. That is
                why there are seven courses and not thirty — I have only sat seven.
              </p>
              <p>
                If something here is wrong, it is wrong because I got it wrong, and I would rather
                know.{" "}
                <a href={`${site.repo}/issues`} rel="noopener noreferrer" target="_blank">
                  Open an issue
                </a>{" "}
                and I will fix it.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  color: "var(--ink-soft)",
                }}
              >
                — {site.author.name}
              </p>
            </div>
          </div>

          {/* Marginalia: the disclosure block. */}
          <aside className="self-start sunk p-6" aria-labelledby="limits-heading">
            <h3 id="limits-heading" className="label mb-4">
              What this site is not
            </h3>
            <ul className="space-y-3 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
              {[
                "Not affiliated with the College Board, and not reviewed by them.",
                "Not a source of real, unreleased exam questions. Everything here is written from scratch.",
                "Not a replacement for your teacher, your textbook, or AP Classroom.",
                "Not tracking you. No analytics, no cookies, no third-party scripts.",
                "Not finished. Coverage is uneven — the counts on each course tell you exactly how uneven.",
              ].map((line) => (
                <li key={line} className="flex gap-2.5">
                  <span aria-hidden="true" style={{ color: "var(--mark)" }}>
                    —
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ── Questions ───────────────────────────────────────────────────── */}
      <section className="wrap py-16 md:py-20" aria-labelledby="faq-heading">
        <SectionHead folio="05" title="Questions people actually ask" id="faq-heading" />
        <dl className="grid gap-x-12 gap-y-7 md:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.question} className="rule-top pt-4">
              <dt className="text-[1.0625rem] font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                {faq.question}
              </dt>
              <dd className="mt-2 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
