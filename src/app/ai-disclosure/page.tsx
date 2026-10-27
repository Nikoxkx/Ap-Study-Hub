import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, SectionHead } from "@/components/Furniture";
import { GlassCard } from "@/components/ui/GlassCard";
import { site, absoluteUrl, formatDate, socialImages } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { getTotals } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "AI Disclosure · what was automated, what was checked",
  description:
    "An honest map of where AI helped build AP Study Hub, where people made the decisions, and how everything was checked.",
  alternates: { canonical: "/ai-disclosure" },
  openGraph: { images: socialImages,
    title: "AI helped. Here is where. · AP Study Hub",
    description:
      "Where AI drafted code, content, and docs — and where a person checked the sources and kept responsibility.",
    url: absoluteUrl("/ai-disclosure"),
  },
  twitter: { card: "summary_large_image", images: socialImages },
};

const tools = [
  {
    name: "v0.dev",
    provider: "Vercel",
    used: "Initial project scaffolding. The deployment URL v0-project-roan-six-20.vercel.app comes from v0. Early versions of layout, course shells, tab strip, and component shells.",
  },
  {
    name: "ChatGPT / GPT-4o",
    provider: "OpenAI",
    used: "Drafting README, privacy, accessibility, study guides, flashcard wording, practice question distractors, essay outlines, banner script, and refactoring Tailwind classes.",
  },
  {
    name: "Claude",
    provider: "Anthropic",
    used: "Alternative drafting for long-form unit notes from CEDs, summarization, and proofreading for tone consistency.",
  },
  {
    name: "Arena.ai Agent Mode",
    provider: "Arena.ai",
    used: "2026–27 deep-lesson expansion, official-source research workflow, catalog/search/practice/card integration, structured lesson renderer, validation script, and deterministic visual assets.",
  },
  {
    name: "GitHub Copilot",
    provider: "GitHub",
    used: "Inline completion for CardDeck (Fisher–Yates, keyboard), PracticeSet (aria-live, fieldset), TimedPaper (autosave), SiteSearch, search scoring, and catalog types.",
  },
];

const codeAreas = [
  {
    area: "Scaffold & layout",
    files: "layout.tsx, page.tsx, course/[slug]/layout.tsx, Furniture.tsx, SiteHeader/Footer",
    ai: "v0 generated first App Router structure and responsive shells",
    human: "Rewrote for static generation, WCAG 2.2 AA, no UI library, native controls, keyboard-only flows",
  },
  {
    area: "Study tools",
    files: "CardDeck.tsx, PracticeSet.tsx, TimedPaper.tsx, Countdown.tsx, use-stored-state.ts",
    ai: "Logic drafts, useSyncExternalStore pattern suggestion",
    human: "Focus scoping, JS-off fallback, no fake grading, review pass, 3 localStorage keys only",
  },
  {
    area: "Search",
    files: "search.ts, api/search/route.ts, SiteSearch.tsx",
    ai: "Scoring draft: title weight, doc-type weight, one-result-per-title dedup",
    human: "Tuned weights, 180ms debounce, GET form fallback at /search, and section-level deep links across the expanded lesson library",
  },
  {
    area: "Design system",
    files: "globals.css, next.config.ts, SubjectMark.tsx, StudySystemVisual.tsx, build-banners.mjs",
    ai: "Tailwind 4 setup, CSP template, deterministic SVG & Resvg generation scripts",
    human: "Hue-free frosted glass over classroom/corridor paintings, neutral #121212 dark mode, 45° 7-square logo, 7 transparent monochrome course icons, and Kalam 300 ballpoint ink locked to 32px blue loose-leaf paper lines",
  },
  {
    area: "SEO & meta",
    files: "schema.tsx, sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx",
    ai: "JSON-LD templates, metadataBase logic",
    human: "Whole-sentence descriptions (never cut mid-sentence), lastModified = content revised date, canonical URLs",
  },
];

const contentAreas = [
  {
    type: "Deep lessons",
    where: "src/content/lessons/*",
    ai: "Drafted 66 lessons from official curriculum/scoring pages and supporting open textbooks; generated objectives, examples, and original lesson practice",
    human: "Official claims carry dated source IDs; automated checks require 10+ paragraphs per lesson, valid citations, course sequence, and practice structure; author retains editorial responsibility",
  },
  {
    type: "Flashcards",
    where: "flashcardsData + lesson glossaries",
    ai: "Front/back pairs from key terms, varied phrasing",
    human: "Pruned hallucinations, ensured back is what you must produce on exam, Fisher–Yates unbiased shuffle",
  },
  {
    type: "Practice Qs",
    where: "quizData + lesson practice",
    ai: "Stems, plausible distractors, explanations",
    human: "Verified no secure material reproduced, distractors from real mistakes, explanations say why wrong options fail",
  },
  {
    type: "Essays & rubrics",
    where: "essaysData — 12 marked exemplars, src/content/exams — 10 interim assessments",
    ai: "Outlines for DBQ, LEQ, SAQ, synthesis, rhetorical analysis, argument, prose and poetry analysis, literary argument, IWA/IWR + rubric breakdowns",
    human: "Rewrote in exam register, checked rubric alignment against the published rows, ensured the sophistication point requires nuance, and verified every passage is public domain or written for the site",
  },
  {
    type: "Assessment grading",
    where: "src/lib/grading/*, /api/grade",
    ai: "Rubric row scoring, evidence and commentary detection, grammar and spelling findings, and the written feedback you read after a paper",
    human: "Rubrics copied from the published College Board descriptors; every score shows the sentences it was based on and which row it missed; the local analyser is the default, model grading is opt-in with your own key, and the estimate is labelled as an estimate because cut scores are not published",
  },
  {
    type: "Resources",
    where: "lesson source registry + resourcesData + channels.ts",
    ai: "Candidate link collection",
    human: "Every link opened by a person before listing, date-checked, channels not video IDs (handles survive reorgs)",
  },
  {
    type: "Docs",
    where: "README.md, about, guides, privacy, accessibility",
    ai: "Drafted catalogue table, build/security notes, study method guides",
    human: "Rewrote voice to personal, added 11-tabs story, verified 3 localStorage keys, listed known defects",
  },
];

export default function AiDisclosurePage() {
  const totals = getTotals();
  const trail = [
    { name: "Home", href: "/" },
    { name: "AI Disclosure", href: "/ai-disclosure" },
  ];

  return (
    <>
      <JsonLd schema={breadcrumbSchema(trail)} />

      <div className="wrap py-10 md:py-14">
        <GlassCard padding="lg">
        <div className="max-w-[68ch]">
          <Breadcrumbs trail={trail} />
          <p className="label mb-3">Checked {formatDate("2026-10-24")} · Content revision {site.contentRevision}</p>
          <h1
            className="text-[clamp(1.9rem,1.5rem+1.8vw,2.9rem)]"
            style={{ letterSpacing: "-0.028em", lineHeight: 1.05 }}
          >
            AI helped build this site. Here is exactly where.
          </h1>
          <p className="lede mt-5">
            AI was a collaborator, not an autopilot. Legacy material was human-reviewed; the 2026–27
            expansion was AI-drafted against dated official sources and checked with automated content
            and TypeScript validation. No student data is sent to AI tools — there are no accounts,
            no analytics, and no runtime AI features. Video players and optional sync are opt-in; static YouTube thumbnails load with video pages.
          </p>
          <p className="mt-4 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
            This page is the live version of{" "}
            <a href={`${site.repo}/blob/main/AI_DISCLOSURE.md`} target="_blank" rel="noopener noreferrer" className="link-underlined" style={{ color: "var(--ink)" }}>
              AI_DISCLOSURE.md
            </a>{" "}
            in the repo. Its commit history is public.
          </p>
        </div>

        <section className="mt-16" aria-labelledby="tldr-heading">
          <SectionHead folio="01" title="The short, honest version" id="tldr-heading" />
          <div className="prose">
            <ul>
              <li>
                <strong>Code:</strong> v0.dev scaffolded the first Next.js App Router version (hence the
                v0-project URL). Copilot and ChatGPT helped draft components. All were rewritten for
                accessibility, static generation, and no UI library.
              </li>
              <li>
                <strong>Content:</strong> Lessons, cards, questions, and essay samples had AI-assisted
                drafts. The expanded library cites its sources at section level; automated checks enforce
                depth and structure, while corrections and final editorial decisions remain the author’s responsibility.
              </li>
              <li>
                <strong>Docs:</strong> README, about, guides, privacy — AI helped draft, human
                rewrote in personal voice and verified claims.
              </li>
              <li>
                <strong>No chatbot, and no AI by default:</strong> there is no assistant, no
                generated hint stream, and no training on your work. Written responses are marked
                offline by a measured analyser that ships with the site
                (<code style={{ fontFamily: "var(--font-mono)", fontSize: "0.85em" }}>src/lib/grading</code>) —
                it counts rubric signals in your own sentences and never calls a network.
              </li>
              <li>
                <strong>AI grading is opt-in and uses your own key:</strong> paste a provider key into
                the grading panel and <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.85em" }}>/api/grade</code>{" "}
                forwards that one response, its prompt, and the rubric rows to the provider you chose
                for a stricter second read. The key lives in your browser, is sent per request, and is
                never stored on the server or in a log. Leave it empty and nothing leaves the page.
                Optional sync is an ordinary storage API, not an AI service; search is a hand-rolled
                scored index over the course and lesson corpus.
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="tools-heading">
          <SectionHead folio="02" title="Which tools touched the work" id="tools-heading" />
          <div className="table-scroll">
            <table className="data-table">
              <caption className="sr-only">AI tools used to build AP Study Hub</caption>
              <thead>
                <tr>
                  <th scope="col">Tool</th>
                  <th scope="col">Provider</th>
                  <th scope="col">How it was used</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((t) => (
                  <tr key={t.name}>
                    <th scope="row" style={{ whiteSpace: "nowrap" }}>{t.name}</th>
                    <td style={{ color: "var(--ink-soft)" }}>{t.provider}</td>
                    <td style={{ color: "var(--ink-soft)" }}>{t.used}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-[68ch] text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
            No AI image generators were used for the interface. Nine of the ten subject symbols — flag, quotation
            marks, speech bubbles, scales, DNA, integral, magnifier, a rising market graph, and a leaf — are hand-drawn SVG on a 32-unit
            grid (<code style={{ fontFamily: "var(--font-mono)", fontSize: "0.85em" }}>SubjectMark.tsx</code>).
            The AP English Literature rose is drawn as geometry by
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.85em" }}>scripts/build-ap-lit-mark.mjs</code>{" "}
            (a five-petal bloom, a spiral and two leaves traced as paths), rendered to the same 256px
            RGBA icon set so all ten marks share one stroke weight.
            README banners are deterministic SVG from <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.85em" }}>build-banners.mjs</code>, not diffusion models.
          </p>
        </section>

        <section className="mt-16" aria-labelledby="code-heading">
          <SectionHead folio="03" title="The code: AI-assisted, people-checked" id="code-heading" />
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Area</th>
                  <th scope="col">Files</th>
                  <th scope="col">AI draft</th>
                  <th scope="col">Human check</th>
                </tr>
              </thead>
              <tbody>
                {codeAreas.map((r) => (
                  <tr key={r.area}>
                    <th scope="row">{r.area}</th>
                    <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--ink-soft)" }}>{r.files}</td>
                    <td style={{ color: "var(--ink-soft)" }}>{r.ai}</td>
                    <td style={{ color: "var(--ink-soft)" }}>{r.human}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="content-heading">
          <SectionHead folio="04" title="The lessons: drafted with AI, checked against sources" id="content-heading">
            <p className="mb-6 max-w-[68ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
              Structure follows current College Board frameworks and scoring pages. AI accelerated
              drafting; it did not replace study or source checking. The live catalog currently contains{" "}
              {totals.units} lessons, {totals.paragraphs} teaching paragraphs, {totals.flashcards} cards,
              and {totals.questions} original questions, computed at build time.
            </p>
          </SectionHead>
          <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Where</th>
                    <th scope="col">AI</th>
                    <th scope="col">Human verification</th>
                  </tr>
                </thead>
                <tbody>
                  {contentAreas.map((r) => (
                    <tr key={r.type}>
                      <th scope="row">{r.type}</th>
                      <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--ink-soft)" }}>{r.where}</td>
                      <td style={{ color: "var(--ink-soft)" }}>{r.ai}</td>
                      <td style={{ color: "var(--ink-soft)" }}>{r.human}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        <section className="mt-16" aria-labelledby="not-heading">
          <SectionHead folio="05" title="The decisions no AI made for me" id="not-heading" />
          <ul className="grid gap-x-12 gap-y-5 md:grid-cols-2">
            {[
              {
                h: "I sat these exams",
                p: "Only 9 courses because I have only sat nine. Rule: nothing goes up unless I would have used it the week before the exam.",
              },
              {
                h: "A person chose what to keep",
                p: "Paper #f6f3ec, ink #1c1b17, mark #b0392a (teacher's red pen), 7 binding-cloth colors, rules not cards, 4px max radius.",
              },
              {
                h: "I own the mistakes",
                p: "A named author, public source repository, dated citations, and a corrections route. No secure exam material is intentionally reproduced — original practice is labeled.",
              },
              {
                h: "Access and privacy come first",
                p: "Keyboard-only card deck (Space/Enter flip, arrows, 1/2 mark, S shuffle), aria-live practice feedback, 3 localStorage keys listed in /privacy. Manually tested.",
              },
              {
                h: "No chatbot, and grading you can inspect",
                p: "There is no chat interface and no conversation history. Assessment grading is either the measured analyser in src/lib/grading (deterministic, runs in your browser or on this site's own route) or a model call you enable with your own provider key. Every score shows the row it came from and the sentences it was based on, so you can disagree with it.",
              },
              {
                h: "No College Board endorsement",
                p: "Not affiliated with College Board. AP is their trademark. Nothing reviewed or endorsed by them. Errors are mine.",
              },
            ].map((item) => (
              <li key={item.h} className="rule-top pt-4">
                <h3 className="text-[1.0625rem] font-semibold">{item.h}</h3>
                <p className="mt-1.5 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>{item.p}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16" aria-labelledby="verify-heading">
          <SectionHead folio="06" title="How every claim gets checked" id="verify-heading" />
          <ol className="rule-top">
            {[
              {
                n: "01",
                title: "Start with the official framework",
                body: "Units follow CED order and numbering. Required documents, cases, and practices flagged verbatim.",
              },
              {
                n: "02",
                title: "Open every source",
                body: "Every outbound link opened by a person before listing, with date in channels.ts / resourcesData. Unit video IDs are validated and paired with channel fallbacks.",
              },
              {
                n: "03",
                title: "Let the compiler catch mistakes",
                body: "Content is TypeScript modules. pnpm typecheck catches malformed units at build time rather than at read time. pnpm check = typecheck + lint + build.",
              },
              {
                n: "04",
                title: "Write our own practice",
                body: "Practice questions original, difficulty band matched, distractors from real mistakes. Released College Board questions linked, never reproduced.",
              },
              {
                n: "05",
                title: "Keep it fast and private",
                body: "Every content page generated at build time. One dynamic route: /api/search. No CMS or content database; optional Study Desk sync is opt-in.",
              },
              {
                n: "06",
                title: "A person reads every page",
                body: "Author Yeisbel Pena reads every page before deploy. Corrections via GitHub issues are most-valued contributions.",
              },
            ].map((item) => (
              <li key={item.n} className="grid gap-x-6 gap-y-1.5 rule-bottom py-5 sm:grid-cols-[2rem_minmax(0,1fr)]">
                <span aria-hidden="true" className="text-[0.75rem] tabular-nums" style={{ fontFamily: "var(--font-mono)", color: "var(--mark)" }}>
                  {item.n}
                </span>
                <div>
                  <h3 className="text-[1.0625rem] font-semibold">{item.title}</h3>
                  <p className="mt-1.5 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16" aria-labelledby="cite-heading">
          <SectionHead folio="07" title="How to quote this honestly" id="cite-heading" />
          <div className="prose">
            <p>
              If you reference this project, please use:
            </p>
            <blockquote style={{ borderLeft: "3px solid var(--mark)", paddingLeft: "1rem", color: "var(--ink-soft)", fontStyle: "italic" }}>
              AP Study Hub uses AI tools (v0.dev, ChatGPT, Claude, GitHub Copilot, and Arena.ai Agent Mode)
              for drafting and scaffolding. The expanded lessons are source-linked and automatically validated;
              the named author retains editorial and correction responsibility. See AI_DISCLOSURE.md.
            </blockquote>
            <p>
              Full file: <a href={`${site.repo}/blob/main/AI_DISCLOSURE.md`} target="_blank" rel="noopener noreferrer">AI_DISCLOSURE.md</a> · 
              History: <a href={`${site.repo}/commits/main/AI_DISCLOSURE.md`} target="_blank" rel="noopener noreferrer">commit history</a> · 
              Issues: <a href={`${site.repo}/issues`} target="_blank" rel="noopener noreferrer">report an error</a>
            </p>
          </div>
        </section>

        <p className="mt-14 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
          See also:{" "}
          <Link href="/about" className="link-underlined" style={{ color: "var(--ink)" }}>how content is made</Link>,{" "}
          <Link href="/privacy" className="link-underlined" style={{ color: "var(--ink)" }}>privacy</Link>,{" "}
          <Link href="/accessibility" className="link-underlined" style={{ color: "var(--ink)" }}>accessibility</Link>.
        </p>
        </GlassCard>
      </div>
    </>
  );
}
