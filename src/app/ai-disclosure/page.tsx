import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, SectionHead } from "@/components/Furniture";
import { site, absoluteUrl, formatDate } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "AI Disclosure — Where AI was used",
  description:
    "Full disclosure of where AI tools were used to build AP Study Hub: scaffolding, components, content drafts, docs, and what was human-checked.",
  alternates: { canonical: "/ai-disclosure" },
  openGraph: {
    title: "AI Disclosure · AP Study Hub",
    description:
      "Where AI was used across AP Study Hub — code, content, design, and docs — and how everything was human-reviewed.",
    url: absoluteUrl("/ai-disclosure"),
  },
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
    used: "Drafting README, colophon, privacy, accessibility, study guides, flashcard wording, practice question distractors, essay outlines, banner script, and refactoring Tailwind classes.",
  },
  {
    name: "Claude",
    provider: "Anthropic",
    used: "Alternative drafting for long-form unit notes from CEDs, summarization, and proofreading for tone consistency.",
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
    human: "Tuned weights, 180ms debounce, GET form fallback at /search, 646 docs indexed at module scope",
  },
  {
    area: "Design system",
    files: "globals.css, next.config.ts, SubjectMark.tsx, build-banners.mjs",
    ai: "Tailwind 4 setup, CSP template, SVG generation idea",
    human: "Paper #f6f3ec, ink #1c1b17, mark #b0392a, binding-cloth subject colors, hand-drawn 32-unit SVG marks, contrast checked at actual size",
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
    type: "Unit notes",
    where: "unitsData in data.ts",
    ai: "First-pass summaries from CEDs, key terms extraction, markdown",
    human: "Rewrote in personal revision voice, kept CED order/numbering, flagged required docs/cases, added where-I-got-confused notes",
  },
  {
    type: "Flashcards",
    where: "flashcardsData — 201 cards",
    ai: "Front/back pairs from key terms, varied phrasing",
    human: "Pruned hallucinations, ensured back is what you must produce on exam, Fisher–Yates unbiased shuffle",
  },
  {
    type: "Practice Qs",
    where: "quizData — 138 questions",
    ai: "Stems, plausible distractors, explanations",
    human: "Verified no secure material reproduced, distractors from real mistakes, explanations say why wrong options fail",
  },
  {
    type: "Essays & rubrics",
    where: "essaysData — 6 essays, mockExamsData — 3 papers",
    ai: "Outlines for DBQ, LEQ, synthesis, rhetorical analysis, argument, IWA/IWR + rubric breakdowns",
    human: "Rewrote in exam register, checked rubric alignment, ensured sophistication point requires nuance, no auto-grading — rubric checklist for self-marking",
  },
  {
    type: "Resources",
    where: "resourcesData (45 links), channels.ts (7 YouTube channels)",
    ai: "Candidate link collection",
    human: "Every link opened by a person before listing, date-checked, channels not video IDs (handles survive reorgs)",
  },
  {
    type: "Docs",
    where: "README.md, colophon, about, guides, privacy, accessibility",
    ai: "Drafted catalogue table, build/security notes, study method guides",
    human: "Rewrote voice to personal, added 11-tabs story, verified 3 localStorage keys, listed known defects",
  },
];

export default function AiDisclosurePage() {
  const trail = [
    { name: "Home", href: "/" },
    { name: "AI Disclosure", href: "/ai-disclosure" },
  ];

  return (
    <>
      <JsonLd schema={breadcrumbSchema(trail)} />

      <div className="wrap py-12 md:py-16">
        <div className="max-w-[68ch]">
          <Breadcrumbs trail={trail} />
          <p className="label mb-3">Last updated {formatDate("2026-10-04")} · Content revision {site.contentRevision}</p>
          <h1
            className="text-[clamp(1.9rem,1.5rem+1.8vw,2.9rem)]"
            style={{ letterSpacing: "-0.028em", lineHeight: 1.05 }}
          >
            Where AI was used to build this site, written down plainly.
          </h1>
          <p className="lede mt-5">
            AI was a collaborator, not an autopilot. Drafts and boilerplate were often AI-assisted,
            but structure, fact-checking, curation, and final decisions were human. No student data is
            ever sent to AI tools — there are no accounts, no analytics, and no runtime AI features.
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
          <SectionHead folio="01" title="TL;DR" id="tldr-heading" />
          <div className="prose">
            <ul>
              <li>
                <strong>Code:</strong> v0.dev scaffolded the first Next.js App Router version (hence the
                v0-project URL). Copilot and ChatGPT helped draft components. All were rewritten for
                accessibility, static generation, and no UI library.
              </li>
              <li>
                <strong>Content:</strong> Unit notes, cards, questions, and essay samples had AI-assisted
                first drafts from College Board CEDs. Every item was human-reviewed, edited, and checked
                against required documents/cases.
              </li>
              <li>
                <strong>Docs:</strong> README, colophon, about, guides, privacy — AI helped draft, human
                rewrote in personal voice and verified claims.
              </li>
              <li>
                <strong>No runtime AI:</strong> No chatbot, no AI grading, no AI API calls in production.
                Search is a hand-rolled scored index over 646 documents.
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="tools-heading">
          <SectionHead folio="02" title="Tools used" id="tools-heading" />
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
            No AI image generators were used for content. All subject marks are hand-drawn SVG on a 32-unit
            grid (<code style={{ fontFamily: "var(--font-mono)", fontSize: "0.85em" }}>SubjectMark.tsx</code>).
            README banners are deterministic SVG from <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.85em" }}>build-banners.mjs</code>, not diffusion models.
          </p>
        </section>

        <section className="mt-16" aria-labelledby="code-heading">
          <SectionHead folio="03" title="Code & architecture — AI-assisted, human-reviewed" id="code-heading" />
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
          <SectionHead folio="04" title="Course content — human-curated, AI-drafted" id="content-heading">
            <p className="mb-6 max-w-[68ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
              Structure follows the College Board Course and Exam Descriptions in order. AI accelerated
              drafting; it did not replace study. Counts are computed at build time from <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.85em" }}>data.ts</code> via{" "}
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.85em" }}>catalog.ts</code>.
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
          <SectionHead folio="05" title="What was NOT AI-generated" id="not-heading" />
          <ul className="grid gap-x-12 gap-y-5 md:grid-cols-2">
            {[
              {
                h: "Personal experience",
                p: "Only 7 courses because I have only sat seven. Rule: nothing goes up unless I would have used it the week before the exam.",
              },
              {
                h: "Editorial judgment",
                p: "Paper #f6f3ec, ink #1c1b17, mark #b0392a (teacher's red pen), 7 binding-cloth colors, rules not cards, 4px max radius.",
              },
              {
                h: "Fact-checking",
                p: "Every note checked against CED, textbook, or primary source. No secure exam material reproduced — original questions only.",
              },
              {
                h: "Accessibility & privacy",
                p: "Keyboard-only card deck (Space/Enter flip, arrows, 1/2 mark, S shuffle), aria-live practice feedback, 3 localStorage keys listed in /privacy. Manually tested.",
              },
              {
                h: "No runtime AI",
                p: "No chatbot, no AI grading, no AI API. Timed papers use rubric checklists for self-marking — not a word counter wearing a rubric.",
              },
              {
                h: "Affiliation",
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
          <SectionHead folio="06" title="How it was checked" id="verify-heading" />
          <ol className="rule-top">
            {[
              {
                n: "01",
                title: "CED-first",
                body: "Units follow CED order and numbering. Required documents, cases, and practices flagged verbatim.",
              },
              {
                n: "02",
                title: "Link check",
                body: "Every outbound link opened by a person before listing, with date in channels.ts / resourcesData. YouTube linked as channels not video IDs.",
              },
              {
                n: "03",
                title: "Type safety",
                body: "Content is TypeScript modules. pnpm typecheck catches malformed units at build time rather than at read time. pnpm check = typecheck + lint + build.",
              },
              {
                n: "04",
                title: "Original questions",
                body: "Practice questions original, difficulty band matched, distractors from real mistakes. Released College Board questions linked, never reproduced.",
              },
              {
                n: "05",
                title: "Static output",
                body: "Every content page generated at build time. One dynamic route: /api/search. No DB, no CMS, no runtime fetching.",
              },
              {
                n: "06",
                title: "Human review",
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
          <SectionHead folio="07" title="How to cite this disclosure" id="cite-heading" />
          <div className="prose">
            <p>
              If you reference this project, please use:
            </p>
            <blockquote style={{ borderLeft: "3px solid var(--mark)", paddingLeft: "1rem", color: "var(--ink-soft)", fontStyle: "italic" }}>
              AP Study Hub uses AI tools (v0.dev, ChatGPT, Claude, GitHub Copilot) for drafting and
              scaffolding. All course content was human-reviewed, fact-checked against College Board CEDs,
              and edited by the author. See AI_DISCLOSURE.md for full breakdown.
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
          <Link href="/colophon" className="link-underlined" style={{ color: "var(--ink)" }}>colophon</Link>,{" "}
          <Link href="/privacy" className="link-underlined" style={{ color: "var(--ink)" }}>privacy</Link>,{" "}
          <Link href="/accessibility" className="link-underlined" style={{ color: "var(--ink)" }}>accessibility</Link>.
        </p>
      </div>
    </>
  );
}
