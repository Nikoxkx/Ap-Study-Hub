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
import { SkyRadio } from "@/components/ui/SkyRadio";
import { SkyLoader } from "@/components/ui/SkyLoader";

export const metadata: Metadata = {
  title: `${site.name} — Under open sky, learn what lasts`,
  description: site.description,
  alternates: { canonical: "/" },
};

const faqs = [
  {
    question: "Do I need an account to use AP Study Hub?",
    answer: "No. There is no sign-up, no email capture and no paywall. Nothing on the site is gated, and no page requires JavaScript to read — just like air, it's there when you look up.",
  },
  {
    question: "Is AP Study Hub affiliated with the College Board?",
    answer: "No. It is an independent site written by a student. AP and Advanced Placement are registered trademarks of the College Board, which has not reviewed or endorsed anything here.",
  },
  {
    question: "Are these real AP exam questions?",
    answer: "No. Practice questions here are original and are labeled as such — fresh drafts, not screenshots of the storm that already passed. Released College Board questions are linked from each course's resources page rather than reproduced.",
  },
  {
    question: "Which AP courses are covered?",
    answer: "Seven: AP United States History, AP English Language and Composition, AP Seminar, AP United States Government and Politics, AP Biology, AP Calculus AB/BC, and AP Research — seven different skies, seven different ways the light moves.",
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

      {/* ── HERO — the storm shelf ─────────────────────────────────────── */}
      <section className="sky-section sky-hero relative overflow-hidden rule-bottom">
        <div className="wrap relative grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1.58fr)_minmax(0,0.95fr)] lg:gap-14 items-start">
          <div>
            <p className="label mb-4" style={{ color: "rgba(255,255,255,0.88)", letterSpacing: "0.12em" }}>
              Built by a student · Free since 2025 · {totals.courses} AP courses <span style={{ opacity: 0.7 }}>—</span> Atmospheric edition
            </p>
            <p className="atmo-kicker mb-3" style={{ color: "#cbd5e1" }}>
              From shelf cloud to clear air — the whole sky, explained
            </p>
            <h1 className="atmo-title text-[clamp(2.05rem,1.4rem+3.1vw,3.85rem)] text-white">
              Learn seven AP subjects deeply — from overcast to open sky — and turn what sticks into college credit.
            </h1>

            <p className="lede mt-6 text-[clamp(1.02rem,0.96rem+0.45vw,1.22rem)]" style={{ color: "rgba(255,255,255,0.94)", maxWidth: "52ch" }}>
              Every AP starts under heavy cloud — new terms, dense periods, half-remembered graphs. This hub is a weather system for studying: {totals.units} lessons and {totals.paragraphs} paragraphs that move like a front across the whole sky, from the dark shelf over Period 1 to the high, thin cirrus of synthesis. {totals.flashcards} recall cards are the clearings where you test the air. {totals.questions} original questions are where the front hits. Watch the storm break. Remember what matters. Walk into May with clear air — and a score your college may accept for credit.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <NeumorphicButton href="#catalogue" variant="sky" size="lg">
                Find your sky — pick a course
              </NeumorphicButton>
              <NeumorphicButton href="/about" variant="soft" size="lg">
                Meet the student chasing the weather
              </NeumorphicButton>
            </div>

            {/* Sky input demo — atmospheric search */}
            <div className="mt-8 max-w-[26rem]">
              <div className="glass-card p-3 flex items-center gap-2" style={{ background: "rgba(255,255,255,0.18)", borderColor: "rgba(255,255,255,0.35)", backdropFilter: "blur(14px)" }}>
                <div className="flex-1">
                  <div className="sky-input-group sky-input-group--search" style={{ maxWidth: "100%" }}>
                    <input type="text" placeholder=" " id="hero-sky-search" defaultValue="" autoComplete="off" style={{ background: "rgba(255,255,255,0.88)", borderColor: "rgba(255,255,255,0.9)" }} />
                    <label htmlFor="hero-sky-search" style={{ color: "#334155" }}>
                      Search the horizon
                    </label>
                  </div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "rgba(255,255,255,0.82)", marginTop: 6 }}>
                    Try <em>federalism</em> · <em>mitosis</em> · <em>DBQ</em> — press <kbd style={{ padding: "1px 4px", background: "rgba(255,255,255,0.9)", color: "#334155", borderRadius: 3 }}>↵</kbd> to scan the whole sky
                  </p>
                </div>
                <NeumorphicButton href="/search" variant="primary" size="sm">
                  Search
                </NeumorphicButton>
              </div>
            </div>

            <dl className="mt-9 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              <div className="glass-card p-3 text-center" style={{ background: "rgba(255,255,255,0.16)", borderColor: "rgba(255,255,255,0.32)" }}>
                <div className="stat-value text-[1.35rem]" style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff" }}>
                  {totals.units}
                </div>
                <div className="label mt-1" style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.625rem" }}>
                  lessons that explain · shelf to cirrus
                </div>
              </div>
              <div className="glass-card p-3 text-center" style={{ background: "rgba(255,255,255,0.16)", borderColor: "rgba(255,255,255,0.32)" }}>
                <div className="stat-value text-[1.35rem]" style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff" }}>
                  {totals.flashcards}
                </div>
                <div className="label mt-1" style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.625rem" }}>
                  recall cards · clearings
                </div>
              </div>
              <div className="glass-card p-3 text-center" style={{ background: "rgba(255,255,255,0.16)", borderColor: "rgba(255,255,255,0.32)" }}>
                <div className="stat-value text-[1.35rem]" style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff" }}>
                  {totals.questions}
                </div>
                <div className="label mt-1" style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.625rem" }}>
                  original questions · where the front hits
                </div>
              </div>
              <div className="glass-card p-3 text-center" style={{ background: "rgba(255,255,255,0.16)", borderColor: "rgba(255,255,255,0.32)" }}>
                <div className="stat-value text-[1.35rem]" style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff" }}>
                  {totals.paragraphs}
                </div>
                <div className="label mt-1" style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.625rem" }}>
                  paragraphs that teach · open sky
                </div>
              </div>
            </dl>
          </div>

          {/* Next exam — glass station under the storm */}
          {upcoming ? (
            <GlassCard className="self-start p-0 overflow-hidden" hover={false} style={{ borderTop: "3px solid var(--subject-ink)" } as any} >
              <div className="subject-scope p-6" style={subjectVars(upcoming)}>
                <p className="label mb-1">{upcoming.exam.window === "deadline" ? "Next pressure drop — deadline" : "Next front — exam"}</p>
                <h2 id="next-exam-heading" className="text-[1.32rem] leading-tight" style={{ fontFamily: "var(--font-display)", color: "var(--subject-ink)" }}>
                  {upcoming.official}
                </h2>
                <p className="mt-1 text-[0.875rem] flex items-center gap-2" style={{ color: "var(--ink-soft)" }}>
                  <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 999, background: "var(--subject-ink)" }} aria-hidden="true" />
                  <time dateTime={upcoming.exam.date}>{formatExamDate(upcoming)}</time>, {examTimeLabel(upcoming)}
                </p>
                <div className="my-5 h-px w-full" style={{ background: "var(--rule)" }} />
                <Countdown target={examInstant(upcoming)} label={upcoming.familiar} initialDays={daysToNext} />
                <div className="mt-5 flex gap-2">
                  <NeumorphicButton href={`/course/${upcoming.slug}`} variant="sky" size="sm">
                    Open {upcoming.familiar} →
                  </NeumorphicButton>
                  <NeumorphicButton href="/videos" variant="soft" size="sm">
                    Watch unit
                  </NeumorphicButton>
                </div>
                <p className="mt-4 text-[0.6875rem] leading-snug" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
                  Like a forecast — confirm your reporting time with your AP coordinator. School schedules and late-testing windows can shift the front by hours.
                </p>
              </div>
              <div className="h-24 relative overflow-hidden" style={{ background: "#0b0b0b" }}>
                <img
                  src="/images/chris-doretz-skyvol1-artstation-store-thumbnail-02.jpg"
                  alt="Dark shelf cloud over flat field — heavy weather before the exam front"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%", opacity: 0.92 }}
                  loading="eager"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent 60%)" }} />
                <div className="absolute bottom-2 left-3 text-[0.625rem] tracking-[0.08em] uppercase" style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.9)" }}>
                  Atmospheric station · image 02 — shelf cloud
                </div>
              </div>
            </GlassCard>
          ) : null}
        </div>
      </section>

      {/* Thin horizon line */}
      <hr className="horizon-line" />

      {/* ── Catalogue — bright cumulus field ─────────────────────────────── */}
      <section id="catalogue" className="sky-section sky-catalogue wrap py-16 md:py-20" aria-labelledby="catalogue-heading">
        <SectionHead folio="01" title="Pick your sky. Each course is a different atmosphere." id="catalogue-heading">
          Nine periods of history sit under a broad high; rhetoric condenses into tight towers; living systems breathe like a diurnal cycle. Each card is a weather map for one course — notes that explain like a forecast discussion, cards that make you recall, original practice, marked essays, timed work, and sources you can check. The counts are what is actually written, not a promise of sun.
        </SectionHead>

        {/* Atmospheric filter using provided Radio component */}
        <div className="mb-8 flex flex-wrap items-center gap-6">
          <SkyRadio
            name="atmosphere-filter"
            defaultValue="all"
            options={[
              { value: "all", label: "All skies" },
              { value: "clear", label: "Clear & bright" },
              { value: "overcast", label: "Overcast — dig deeper" },
            ]}
          />
          <p className="text-[0.8125rem] max-w-[38ch]" style={{ color: "var(--ink-soft)" }}>
            Filter by how it feels overhead. “Clear” is wide, bright synthesis. “Overcast” is dense, low, ready to work. The metaphor helps; the content still does the job.
          </p>
        </div>

        <div className="catalogue-glass-list">
          {catalog.map((course, index) => {
            const { subject, counts } = course;
            // alternate sky thumb per course so all eight images appear across the grid
            const thumbs = [
              "/images/chris-doretz-skyvol1-artstation-store-thumbnail-04.jpg",
              "/images/chris-doretz-skyvol1-artstation-store-thumbnail-05.jpg",
              "/images/chris-doretz-skyvol1-artstation-store-thumbnail-08.jpg",
              "/images/chris-doretz-skyvol1-artstation-store-thumbnail-01-wo.jpg",
              "/images/chris-doretz-skyvol1-artstation-store-thumbnail-06.jpg",
              "/images/chris-doretz-skyvol1-artstation-store-thumbnail-09.jpg",
              "/images/chris-doretz-skyvol1-artstation-store-thumbnail-03.jpg",
            ];
            const thumb = thumbs[index % thumbs.length];
            return (
              <Link key={subject.slug} href={`/course/${subject.slug}`} className="catalogue-glass-item subject-scope" style={subjectVars(subject)}>
                <div className="glass-card">
                  <span className="flex flex-col items-center gap-1.5 pt-1" style={{ color: "var(--subject-ink)" }} title={subject.symbolLabel}>
                    <SubjectMark subject={subject.mark} size={28} label={subject.symbolLabel} />
                    <span className="max-w-[4.75rem] text-center text-[0.625rem] leading-tight tracking-[0.02em]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
                      {subject.topic}
                    </span>
                  </span>

                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-[1.2rem] font-medium" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}>
                        {subject.official}
                      </span>
                      <span className="tag">{subject.familiar}</span>
                      <span className="tag tag-subject" style={{ borderColor: "color-mix(in srgb, var(--subject-ink) 35%, transparent)" }}>
                        ☁︎ {index % 2 === 0 ? "towering cumulus" : "high cirrus"} · image {String(index + 2).padStart(2, "0")}
                      </span>
                    </span>
                    <span className="mt-2 block max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                      {subject.summary}
                    </span>
                    <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.75rem]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
                      <span>{counts.units} lessons · {counts.paragraphs} paragraphs</span>
                      <span>{counts.flashcards} cards</span>
                      <span>{counts.questions} questions</span>
                      {counts.essays > 0 ? <span>{counts.essays} essays</span> : null}
                      <span>~{counts.readingMinutes} min under this sky</span>
                    </span>
                  </span>

                  <span className="catalogue-meta flex flex-col items-end gap-2 shrink-0">
                    <span
                      className="hidden md:block h-[84px] w-[120px] overflow-hidden rounded-[8px] border"
                      style={{ borderColor: "rgba(255,255,255,0.6)", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                    >
                      <img src={thumb} alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                    </span>
                    <span className="text-[0.75rem] tabular-nums" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
                      {formatExamDate(subject, "short")}
                    </span>
                    <span className="neumorph-btn neumorph-btn--sky neumorph-btn--sm" aria-hidden="true">
                      Open →
                    </span>
                  </span>
                  <span className="sr-only">{`Course ${index + 1} of ${catalog.length}`}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <NeumorphicButton href="/guides" variant="primary" size="md">
            How to study under any sky
          </NeumorphicButton>
          <NeumorphicButton href="/videos" variant="soft" size="md">
            Watch by unit — see the front move
          </NeumorphicButton>
        </div>
      </section>

      {/* ── Anatomy — wispy cirrus ───────────────────────────────────────── */}
      <section className="sky-section sky-anatomy rule-top py-16 md:py-20" aria-labelledby="anatomy-heading">
        <div className="wrap">
          <SectionHead folio="02" title="Six currents in one weather system" id="anatomy-heading">
            High cirrus, low stratus, and everything between — in the order you will actually use them. Each has its own URL, so you can bookmark the bit you need instead of scrolling past the rest, like marking pressure on a chart.
          </SectionHead>

          <GlassCard className="mb-10 p-0 overflow-hidden" hover={false}>
            <div className="p-4" style={{ background: "rgba(255,255,255,0.72)", borderBottom: "1px solid rgba(221,214,198,0.6)" }}>
              <p className="label">System visual · image 05 — filament cirrus over blue</p>
            </div>
            <figure className="m-0">
              <div style={{ padding: "1rem", background: "rgba(255,255,255,0.35)" }}>
                <StudySystemVisual />
              </div>
              <div className="h-[84px] relative overflow-hidden" style={{ borderTop: "1px solid var(--rule)" }}>
                <img
                  src="/images/chris-doretz-skyvol1-artstation-store-thumbnail-05.jpg"
                  alt="Wispy white cirrus streaks across bright blue sky"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 28%" }}
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(255,255,255,0.55) 100%)" }} />
              </div>
              <figcaption className="px-4 py-3 text-[0.8125rem]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)", background: "var(--paper-raised)" }}>
                The expanded library is one connected atmosphere: read the teaching like a forecast discussion, retrieve the idea like checking the sky, practise an original question like a sounding, then return to the exact section that needs another look.
              </figcaption>
            </figure>
          </GlassCard>

          <div className="glass-grid">
            {[
              {
                n: "i",
                name: "Notes — the sounding",
                body: "Curriculum-aligned lessons with at least ten developed paragraphs each, objectives, glossaries, rubric connections, and section-level citations. A vertical profile through the whole atmosphere.",
                sky: "04 — cumulus congestus",
              },
              {
                n: "ii",
                name: "Cards — clearings",
                body: "Term on the front, the answer you would actually have to produce on the back. Shuffles with a real Fisher–Yates, keyboard-driven, and it remembers which ones stayed overcast for you.",
                sky: "01-wo — tower",
              },
              {
                n: "iii",
                name: "Practice — the front",
                body: "Original multiple choice with reasoned feedback, lesson filters, and a route back to the exact teaching when an answer goes wrong. Where instability meets lift.",
                sky: "08 — bright field",
              },
              {
                n: "iv",
                name: "Essays — measured light",
                body: "Full sample responses with the rubric broken out point by point: what earned the thesis mark, what earned evidence, what would have earned sophistication — like parsing lumens through cloud.",
                sky: "06 — sun shafts",
              },
              {
                n: "v",
                name: "Timed paper — sustained wind",
                body: "Original timed sets with a running clock and constructed source packets. These build stamina without pretending to be full-length released exams. Hold heading under pressure.",
                sky: "03 — evening",
              },
              {
                n: "vi",
                name: "Sources — ground truth",
                body: "Official curriculum and scoring references sit beside supporting textbooks and archives, with checked dates and lesson-level citations. The surface observation that keeps the forecast honest.",
                sky: "02 — shelf",
              },
            ].map((item) => (
              <GlassCard key={item.name} className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-3">
                    <span className="shrink-0 text-[0.75rem] lowercase" style={{ fontFamily: "var(--font-mono)", color: "var(--mark)" }} aria-hidden="true">
                      {item.n}
                    </span>
                    <h3 className="text-[1.08rem] font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                      {item.name}
                    </h3>
                  </div>
                  <span className="tag" style={{ fontSize: "0.625rem" }}>
                    sky {item.sky}
                  </span>
                </div>
                <p className="mt-3 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {item.body}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calendar — sun breaking through ──────────────────────────────── */}
      <section className="sky-section sky-calendar wrap py-16 md:py-20" aria-labelledby="calendar-heading">
        <SectionHead folio="03" title="Your 2027 horizon — when the front arrives" id="calendar-heading">
          Dates and the AP Research portfolio deadline as published for 2027 — the ridge and trough of your May. Confirm your own reporting time with your AP coordinator — school schedules and late-testing windows can differ, fronts shift.
        </SectionHead>

        <GlassCard className="p-0 overflow-hidden" hover={false}>
          <div className="h-24 relative overflow-hidden" style={{ borderBottom: "1px solid var(--rule)" }}>
            <img
              src="/images/chris-doretz-skyvol1-artstation-store-thumbnail-06.jpg"
              alt="Dark heavy clouds with sun breaking through in golden shafts"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 38%" }}
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.18), transparent 55%)" }} />
            <div className="absolute bottom-2 left-4 text-[0.625rem] tracking-[0.08em] uppercase px-2 py-1 rounded" style={{ fontFamily: "var(--font-mono)", color: "#fff", background: "rgba(0,0,0,0.42)", border: "1px solid rgba(255,255,255,0.22)" }}>
              Image 06 — crepuscular rays · light finally finding a gap
            </div>
          </div>
          <div className="p-4">
            <div className="table-scroll" style={{ border: "none" }}>
              <table className="data-table" style={{ background: "rgba(255,255,255,0.72)", borderRadius: 8, overflow: "hidden" }}>
                <caption className="sr-only">AP exam dates for the seven courses covered on this site</caption>
                <thead>
                  <tr>
                    <th scope="col">Course</th>
                    <th scope="col">Date</th>
                    <th scope="col">Start</th>
                    <th scope="col">Sky note</th>
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
            <p className="mt-4 text-[0.8125rem]" style={{ color: "var(--ink-faint)", fontFamily: "var(--font-mono)" }}>
              Like a 7-day outlook: check again closer to the date. Your AP coordinator is ground truth.
            </p>
          </div>
        </GlassCard>
      </section>

      {/* ── The note — bright cumulus day ───────────────────────────────── */}
      <section className="sky-section sky-note rule-top py-16 md:py-20" aria-labelledby="note-heading">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.95fr)]">
          <div>
            <SectionHead folio="04" title="Why a student built this — chasing clearer sky" id="note-heading" />
            <GlassCard className="p-6 md:p-8">
              <div className="prose" style={{ maxWidth: "none" }}>
                <p className="dropcap">
                  Halfway through junior year the forecast was grey and the tools were greyer. One site wanted nine dollars a month to part the clouds. One wanted an account before it would show me a single flashcard. The free ones were mostly other people&rsquo;s Quizlet sets with the answers wrong — like a forecast copied from three days ago — and the good YouTube explanations were buried four rows down in a feed that would rather show me something else.
                </p>
                <p>
                  So I started keeping my own notes properly, watching each unit move across the sky from that first dark shelf of colonization to the bright, towering anvils of modern policy. At some point it was obvious they would be more useful in public than in a Google Doc. The rule I gave myself is that nothing goes up unless I would have used it myself the week before an exam, under that low, heavy pressure when you can&rsquo;t afford haze. That is why there are seven courses and not thirty — I have only sat seven, only walked under those seven skies.
                </p>
                <div
                  className="my-6 h-28 overflow-hidden rounded-[10px] border"
                  style={{ borderColor: "rgba(255,255,255,0.7)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
                >
                  <img
                    src="/images/chris-doretz-skyvol1-artstation-store-thumbnail-08.jpg"
                    alt="Bright white cumulus clouds building against blue sky"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 34%" }}
                    loading="lazy"
                  />
                </div>
                <p>
                  If something here is wrong, it is wrong because I got it wrong, and I would rather know — a pilot would rather know the altimeter is off before the clouds close in.{" "}
                  <a href={`${site.repo}/issues`} rel="noopener noreferrer" target="_blank">
                    Open an issue
                  </a>{" "}
                  and I will fix it.
                </p>
                <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--ink-soft)" }}>— {site.author.name}</p>
              </div>
            </GlassCard>
          </div>

          <div className="space-y-4">
            <GlassCard className="p-6">
              <h3 id="limits-heading" className="label mb-4">
                What this sky will not do
              </h3>
              <ul className="space-y-3 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
                {[
                  "Not affiliated with the College Board, and not reviewed by them — independent observations only.",
                  "Not a source of real, unreleased exam questions. Everything here is written from scratch, like a fresh sounding.",
                  "Not a replacement for your teacher, your textbook, or AP Classroom — ground truth lives there.",
                  "Not tracking you. No analytics, no cookies, no third-party scripts. Video thumbnails are images; players and sync are opt-in. Your sky is yours.",
                  "Not finished. Coverage is uneven — the counts on each course tell you exactly how uneven, like a cloud-cover percentage.",
                  "Not hiding AI use — see /ai-disclosure for where AI helped draft and how it was checked, transparent as clear air.",
                ].map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <span aria-hidden="true" style={{ color: "var(--mark)" }}>
                      —
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <NeumorphicButton href="/ai-disclosure" variant="soft" size="sm">
                  Read AI disclosure
                </NeumorphicButton>
              </div>
            </GlassCard>

            <GlassCard className="p-4">
              <p className="label mb-2">Sky over this page</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { img: "/images/chris-doretz-skyvol1-artstation-store-thumbnail-02.jpg", cap: "02 shelf" },
                  { img: "/images/chris-doretz-skyvol1-artstation-store-thumbnail-04.jpg", cap: "04 cumulus" },
                  { img: "/images/chris-doretz-skyvol1-artstation-store-thumbnail-05.jpg", cap: "05 cirrus" },
                  { img: "/images/chris-doretz-skyvol1-artstation-store-thumbnail-06.jpg", cap: "06 rays" },
                  { img: "/images/chris-doretz-skyvol1-artstation-store-thumbnail-08.jpg", cap: "08 bright" },
                  { img: "/images/chris-doretz-skyvol1-artstation-store-thumbnail-01-wo.jpg", cap: "01 tower" },
                ].map((t) => (
                  <div key={t.cap} className="overflow-hidden rounded-[8px] border" style={{ borderColor: "rgba(255,255,255,0.6)" }}>
                    <img src={t.img} alt="" aria-hidden="true" style={{ width: "100%", height: 64, objectFit: "cover", display: "block" }} loading="lazy" />
                    <div className="text-center py-1" style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", color: "var(--ink-faint)", background: "rgba(255,255,255,0.7)" }}>
                      {t.cap}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[0.6875rem] leading-snug" style={{ color: "var(--ink-faint)", fontFamily: "var(--font-mono)" }}>
                All eight photographs from Chris Doretz Sky Vol. 1 — shelf to tower. Hover a course card above to see its sky.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ── FAQ — evening sky ───────────────────────────────────────────── */}
      <section className="sky-section sky-faq wrap py-16 md:py-20" aria-labelledby="faq-heading">
        <SectionHead folio="05" title="Clearance — questions before the sky opens" id="faq-heading">
          Like a pre-flight clearance: short, plain, no jargon. If the cloud is still over something, ask — the correction is faster than waiting for it to drift.
        </SectionHead>

        <div className="glass-grid">
          {faqs.map((faq) => (
            <GlassCard key={faq.question} className="p-6">
              <dt className="text-[1.05rem] font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                {faq.question}
              </dt>
              <dd className="mt-3 text-[0.9375rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                {faq.answer}
              </dd>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="mt-10 p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="label">Still overcast?</p>
            <p className="mt-1 text-[0.9375rem] max-w-[56ch]" style={{ color: "var(--ink-soft)" }}>
              Try the guides: study methods field-tested under real pressure, not marketing. Or open your study desk — it gathers what stayed overcast for you and lifts it first.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <NeumorphicButton href="/guides" variant="primary" size="md">
              Study guides
            </NeumorphicButton>
            <NeumorphicButton href="/study" variant="sky" size="md">
              Your study desk
            </NeumorphicButton>
          </div>
        </GlassCard>

        {/* Loader demo — shows provided Loader component in context */}
        <div className="mt-12">
          <p className="label mb-3">Loading state — when the next front is still en route</p>
          <GlassCard className="p-6">
            <SkyLoader label="Scanning the horizon for your next lesson…" />
            <p className="mt-3 text-center text-[0.75rem]" style={{ color: "var(--ink-faint)", fontFamily: "var(--font-mono)" }}>
              The three orbs are sun through cloud — a small sky while the big one loads. Used across course pages when videos and practice are fetching.
            </p>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
