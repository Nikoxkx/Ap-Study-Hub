import type { Metadata } from "next";
import Link from "next/link";
import { getCatalog, getTotals, nextExam } from "@/lib/catalog";
import { subjects, formatExamDate, examInstant, examTimeLabel } from "@/lib/subjects";
import { daysUntil } from "@/lib/clock";
import { SubjectMark, SiteMark } from "@/components/SubjectMark";
import { Countdown } from "@/components/Countdown";
import { StudySystemVisual } from "@/components/StudySystemVisual";
import { Stat } from "@/components/Furniture";
import { GlassCard } from "@/components/ui/GlassCard";
import { BanterLoader } from "@/components/ui/BanterLoader";
import { JsonLd, catalogSchema, faqSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

const faqs = [
  {
    question: "Do I need an account to use AP Study Hub?",
    answer:
      "No. There is no sign-up, no email capture, and no paywall. Nothing on the site is gated, and no page requires JavaScript to read.",
  },
  {
    question: "Is AP Study Hub affiliated with the College Board?",
    answer:
      "No. It is an independent site written by a student. AP and Advanced Placement are registered trademarks of the College Board, which has not reviewed or endorsed anything here.",
  },
  {
    question: "Are these real AP exam questions?",
    answer:
      "No. Practice questions here are original and labeled as such. Released College Board questions are linked from each course's resources page rather than reproduced.",
  },
  {
    question: "Which AP courses are covered?",
    answer:
      "Seven: AP United States History, AP English Language and Composition, AP Seminar, AP United States Government and Politics, AP Biology, AP Calculus AB/BC, and AP Research.",
  },
];

const studySurfaces = [
  {
    name: "Deep Lessons",
    badge: "10+ paragraphs",
    body: "Curriculum-aligned lessons with learning objectives, glossaries, rubric connections, and section-level citations.",
  },
  {
    name: "Recall Cards",
    badge: "Fisher–Yates",
    body: "Term on the front, the explanation you must produce cold on the back — keyboard-driven and saved locally.",
  },
  {
    name: "Original Practice",
    badge: "Reasoned feedback",
    body: "Multiple-choice sets with option-level explanations and a direct route back to the exact teaching section.",
  },
  {
    name: "Marked Essays",
    badge: "Rubric rows",
    body: "Full sample responses broken out point by point: thesis, evidence, commentary, and complexity.",
  },
  {
    name: "Timed Papers & Studio",
    badge: "Notebook scratch",
    body: "Original timed sets, interactive course labs, and lined notebook paper for equations and free-response drafts.",
  },
  {
    name: "Verified Unit Videos",
    badge: "Privacy-first",
    body: "Real YouTube thumbnails for every unit across all seven courses, with opt-in privacy-enhanced players.",
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

      {/* ── Centered Open-Canvas Hero + Floating Glass Showcase Window ──── */}
      <section className="wrap pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="tag mb-6 px-3.5 py-1.5">
            <SiteMark size={18} />
            <span>Built by a student · Free since 2025 · {totals.courses} AP courses</span>
          </div>

          <h1
            className="canvas-heading text-[clamp(2.25rem,1.5rem+3.4vw,4.25rem)] font-semibold"
            style={{ letterSpacing: "-0.032em", lineHeight: 1.04 }}
          >
            Learn seven AP subjects deeply — on a quieter kind of study hub.
          </h1>

          <p className="canvas-subtext mt-6 max-w-2xl text-[clamp(1.05rem,0.96rem+0.45vw,1.25rem)] leading-relaxed">
            {totals.units} lessons and {totals.paragraphs} teaching paragraphs explain the why
            behind every unit. Recall cards, original practice, marked essays, and unit videos help
            you earn a score your college may accept for credit — with zero accounts or paywalls.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="#catalogue" className="btn">
              Find your course
            </Link>
            <Link href="/study" className="btn">
              Open your study desk
            </Link>
          </div>
        </div>

        {/* Floating Glass Workspace Window */}
        <GlassCard padding="lg" className="mx-auto mt-12 max-w-6xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/60 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="tag font-semibold">Library overview</span>
              <Link href="/study" className="tag no-underline hover:bg-white/60">
                Study Desk
              </Link>
              <Link href="/videos" className="tag no-underline hover:bg-white/60">
                Unit Videos
              </Link>
              <Link href="/guides" className="tag no-underline hover:bg-white/60">
                Study Guides
              </Link>
              <Link href="/search" className="tag no-underline hover:bg-white/60">
                Search
              </Link>
            </div>
            <span className="label">No account · Local-first</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.95fr)] lg:items-start">
            <div>
              <p className="label mb-1.5">Real counts, computed from the corpus</p>
              <h2 className="text-[1.5rem] font-semibold">What is actually inside the library</h2>

              <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-2xl border border-white/75 bg-white/30 p-4 dark:bg-white/5">
                  <Stat value={totals.units} label="deep lessons" />
                </div>
                <div className="rounded-2xl border border-white/75 bg-white/30 p-4 dark:bg-white/5">
                  <Stat value={totals.flashcards} label="recall cards" />
                </div>
                <div className="rounded-2xl border border-white/75 bg-white/30 p-4 dark:bg-white/5">
                  <Stat value={totals.questions} label="practice items" />
                </div>
                <div className="rounded-2xl border border-white/75 bg-white/30 p-4 dark:bg-white/5">
                  <Stat value={totals.paragraphs} label="paragraphs" />
                </div>
              </dl>

              <div className="mt-6">
                <StudySystemVisual />
              </div>
            </div>

            {upcoming ? (
              <aside
                className="rounded-2xl border border-white/80 bg-white/32 p-6 dark:bg-white/5"
                aria-labelledby="next-exam-heading"
              >
                <p className="label mb-1.5">
                  {upcoming.exam.window === "deadline" ? "Soonest deadline" : "Soonest exam"}
                </p>
                <h3 id="next-exam-heading" className="text-[1.35rem] font-semibold">
                  {upcoming.official}
                </h3>
                <p className="mt-1.5 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                  <time dateTime={upcoming.exam.date}>{formatExamDate(upcoming)}</time> ·{" "}
                  {examTimeLabel(upcoming)}
                </p>

                <div className="my-5 h-px w-full bg-white/60" />

                <Countdown
                  target={examInstant(upcoming)}
                  label={upcoming.familiar}
                  initialDays={daysToNext}
                />

                <Link
                  href={`/course/${upcoming.slug}`}
                  className="link-draw mt-5 inline-block text-[0.875rem] font-semibold"
                >
                  Open {upcoming.familiar} →
                </Link>
              </aside>
            ) : null}
          </div>
        </GlassCard>
      </section>

      {/* ── 01 · Centered Section Heading + 3-Column Glass Course Cards ─── */}
      <section id="catalogue" className="wrap py-14 md:py-20" aria-labelledby="catalogue-heading">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="label mb-2">01 · Seven AP Courses</p>
          <h2
            id="catalogue-heading"
            className="canvas-heading text-[clamp(1.85rem,1.4rem+1.8vw,2.75rem)] font-semibold"
          >
            Built for students who would rather understand than cram.
          </h2>
          <p className="canvas-subtext mt-3 text-[1rem]">
            Every course gives you curriculum-ordered lessons, recall cards, original practice,
            curated unit videos, and cited sources.
          </p>
        </div>

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.map((course, index) => {
            const { subject, counts } = course;
            return (
              <li key={subject.slug} className="flex">
                <Link
                  href={`/course/${subject.slug}`}
                  className="glass-box glass-box-interactive group flex w-full flex-col justify-between p-6 no-underline"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white/45 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:bg-white/75 group-hover:shadow-md dark:border-white/25 dark:bg-white/10 dark:group-hover:bg-white/20"
                        title={subject.symbolLabel}
                      >
                        <SubjectMark
                          subject={subject.mark}
                          size={25}
                          label={subject.symbolLabel}
                          className="transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3"
                        />
                      </span>
                      <span className="tag transition-transform duration-200 group-hover:-translate-y-0.5">
                        {subject.familiar}
                      </span>
                    </div>

                    <p className="label mb-1.5">{subject.topic}</p>
                    <h3 className="text-[1.25rem] font-semibold leading-snug">
                      {subject.official}
                    </h3>
                    <p className="mt-2.5 text-[0.9rem]" style={{ color: "var(--ink-soft)" }}>
                      {subject.summary}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/60 pt-4 dark:border-white/15">
                    <div
                      className="flex flex-wrap gap-x-3 gap-y-1 text-[0.72rem]"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
                    >
                      <span>{counts.units} lessons</span>
                      <span>{counts.flashcards} cards</span>
                      <span>{counts.questions} Qs</span>
                      {counts.essays > 0 ? <span>{counts.essays} essays</span> : null}
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[0.8125rem]">
                      <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
                        {formatExamDate(subject, "short")}
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold">
                        <span>Open course</span>
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                  <span className="sr-only">{`Course ${index + 1} of ${catalog.length}`}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ── 02 · Asymmetric 2-Column Split ──────────────────────────────── */}
      <section className="wrap py-14 md:py-20" aria-labelledby="anatomy-heading">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
          <GlassCard padding="lg">
            <div className="mb-4 flex items-center gap-3">
              <BanterLoader size={28} label="Connected study modules" />
              <p className="label">02 · Connected Study System</p>
            </div>
            <h2
              id="anatomy-heading"
              className="text-[clamp(1.75rem,1.35rem+1.5vw,2.45rem)] font-semibold"
            >
              Revision stops being eleven open browser tabs.
            </h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Six study surfaces work together in the order you actually use them. Every mode has
              its own bookmarkable URL and feeds your local review schedule without tracking you.
            </p>

            <ul className="mt-6 space-y-3.5 text-[0.9rem]">
              {[
                {
                  title: "Lessons written to explain",
                  detail: "Ten-plus developed paragraphs per unit with dated curriculum citations.",
                },
                {
                  title: "Spaced retrieval & mistake notebook",
                  detail: "Missed cards and practice items resurface automatically on your Study Desk.",
                },
                {
                  title: "Lined notebook scratch work",
                  detail: "Work out Calculus steps, FRQ outlines, and synthesis matrices in place.",
                },
              ].map((row) => (
                <li key={row.title} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black text-[0.7rem] font-bold text-white dark:bg-white dark:text-black"
                  >
                    ✓
                  </span>
                  <span>
                    <strong className="block font-semibold">{row.title}</strong>
                    <span style={{ color: "var(--ink-soft)" }}>{row.detail}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link href="/study" className="btn btn-sm">
                Open Study Desk
              </Link>
              <Link href="/guides" className="link-underlined text-[0.875rem] font-semibold">
                Read the study method →
              </Link>
            </div>
          </GlassCard>

          <GlassCard padding="md" className="space-y-3">
            <div className="flex items-center justify-between px-2 pb-2">
              <span className="label">Six ways into every course</span>
              <span className="tag">{totals.units} units covered</span>
            </div>
            {studySurfaces.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-white/75 bg-white/32 p-4 transition-colors hover:bg-white/48 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-[1rem] font-semibold">{item.name}</h3>
                  <span className="tag">{item.badge}</span>
                </div>
                <p className="mt-1.5 text-[0.85rem]" style={{ color: "var(--ink-soft)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </GlassCard>
        </div>
      </section>

      {/* ── 03 · 2027 Exam Calendar ─────────────────────────────────────── */}
      <section className="wrap py-14 md:py-20" aria-labelledby="calendar-heading">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="label mb-2">03 · 2027 Schedule</p>
          <h2
            id="calendar-heading"
            className="canvas-heading text-[clamp(1.85rem,1.4rem+1.8vw,2.65rem)] font-semibold"
          >
            Your 2027 deadlines, in plain sight.
          </h2>
          <p className="canvas-subtext mt-3 text-[0.975rem]">
            Published 2027 dates and the AP Research portfolio deadline. Confirm exact local
            reporting times with your school’s AP coordinator.
          </p>
        </div>

        <GlassCard padding="md">
          <div className="table-scroll">
            <table className="data-table">
              <caption className="sr-only">
                AP exam dates for the seven courses covered on this site
              </caption>
              <thead>
                <tr>
                  <th scope="col">Course</th>
                  <th scope="col">Date</th>
                  <th scope="col">Session</th>
                  <th scope="col">Format note</th>
                </tr>
              </thead>
              <tbody>
                {[...subjects]
                  .sort((a, b) => a.exam.date.localeCompare(b.exam.date))
                  .map((subject) => (
                    <tr key={subject.slug}>
                      <th scope="row">
                        <Link
                          href={`/course/${subject.slug}`}
                          className="inline-flex items-center gap-2.5 link-underlined"
                        >
                          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/75 bg-white/45 dark:border-white/20 dark:bg-white/10">
                            <SubjectMark subject={subject.mark} size={15} label={subject.symbolLabel} />
                          </span>
                          <span>{subject.official}</span>
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
      </section>

      {/* ── 04 · Student Note & Honest Boundaries ───────────────────────── */}
      <section className="wrap py-14 md:py-20" aria-labelledby="note-heading">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <GlassCard padding="lg">
            <p className="label mb-2.5">04 · From the Author</p>
            <h2
              id="note-heading"
              className="mb-8 border-b border-black/10 pb-5 text-[1.8rem] font-semibold dark:border-white/15"
            >
              Why a student built this for you
            </h2>
            <div className="prose pt-1">
              <p className="dropcap">
                Halfway through junior year I had eleven tabs open and none of them were useful. One
                site wanted nine dollars a month. One wanted an account before it would show me a
                single flashcard. The free ones were mostly other people&rsquo;s sets with the
                answers wrong, and the good YouTube explanations were buried four rows down in a
                recommendation feed.
              </p>
              <p>
                So I started keeping my own notes properly, and at some point it was obvious they
                would be more useful in public than in a private doc. Nothing goes up unless I would
                have used it myself the week before an exam. That is why there are seven courses and
                not thirty — I have only sat seven.
              </p>
              <p>
                If something here is wrong,{" "}
                <a href={`${site.repo}/issues`} rel="noopener noreferrer" target="_blank">
                  open an issue
                </a>{" "}
                and I will fix it.
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
                — {site.author.name}
              </p>
            </div>
          </GlassCard>

          <GlassCard as="aside" padding="lg" aria-labelledby="limits-heading">
            <p className="label mb-2.5">Clear Boundaries</p>
            <h3
              id="limits-heading"
              className="mb-6 border-b border-black/10 pb-4 text-[1.35rem] font-semibold dark:border-white/15"
            >
              What this site will not do
            </h3>
            <ul className="space-y-3 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
              {[
                "Not affiliated with the College Board, and not reviewed by them.",
                "Not a source of unreleased exam questions. Everything here is written from scratch.",
                "Not a replacement for your teacher, your textbook, or AP Classroom.",
                "Not tracking you. No analytics, no cookies, no third-party scripts.",
                "Not hiding uneven coverage — exact counts appear on every course card.",
                "Not hiding AI use — see /ai-disclosure for how drafts were checked.",
              ].map((line) => (
                <li key={line} className="flex gap-2.5">
                  <span aria-hidden="true" className="font-bold">
                    —
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link href="/about" className="btn btn-sm">
                Meet the student →
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ── 05 · FAQ Grid ───────────────────────────────────────────────── */}
      <section className="wrap pb-10 pt-10 md:pt-14" aria-labelledby="faq-heading">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="label mb-2">05 · Common Questions</p>
          <h2
            id="faq-heading"
            className="canvas-heading text-[clamp(1.75rem,1.35rem+1.5vw,2.4rem)] font-semibold"
          >
            Questions you might be asking
          </h2>
        </div>

        <dl className="grid gap-6 md:grid-cols-2">
          {faqs.map((faq) => (
            <GlassCard key={faq.question} padding="md">
              <dt className="text-[1.0625rem] font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                {faq.question}
              </dt>
              <dd className="mt-2 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                {faq.answer}
              </dd>
            </GlassCard>
          ))}
        </dl>
      </section>
    </>
  );
}
