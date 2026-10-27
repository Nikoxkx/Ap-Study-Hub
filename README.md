<div align="center">
  <a href="https://ap-study-hub-five.vercel.app">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./assets/readme/banner-dark.png" />
      <source media="(prefers-color-scheme: light)" srcset="./assets/readme/banner-light.png" />
      <img src="./assets/readme/banner-light.png" width="100%" alt="AP Study Hub — ten AP courses with lessons, flashcards, and practice" />
    </picture>
  </a>

  <br />

  <p>
    <strong>Ten AP courses in one study hub — with 75 cited lessons, 568 recall cards, 447 original practice questions, ten full-length interim assessments, 93 unit videos, and loose-leaf scratch paper.</strong>
  </p>

  <p>
    <a href="https://ap-study-hub-five.vercel.app"><img alt="Live site" src="https://img.shields.io/badge/live_site-v0--project--roan--six--20.vercel.app-121212?style=flat-square&labelColor=262626" /></a>
    <a href="#the-catalogue"><img alt="10 AP courses · 75 lessons · 750 paragraphs" src="https://img.shields.io/badge/10_courses-75_lessons_·_750_paragraphs-121212?style=flat-square&labelColor=262626" /></a>
    <a href="#the-catalogue"><img alt="568 cards · 447 questions · 93 videos" src="https://img.shields.io/badge/practice-568_cards_·_447_questions_·_93_videos-121212?style=flat-square&labelColor=262626" /></a>
    <a href="./LICENSE"><img alt="MIT license" src="https://img.shields.io/badge/license-MIT-404040?style=flat-square&labelColor=262626" /></a>
    <a href="./AI_DISCLOSURE.md"><img alt="AI disclosure" src="https://img.shields.io/badge/AI_assistance-disclosed-404040?style=flat-square&labelColor=262626" /></a>
  </p>

  <p>
    <a href="https://ap-study-hub-five.vercel.app"><strong>Open the hub</strong></a>
    &nbsp;·&nbsp;
    <a href="https://ap-study-hub-five.vercel.app/study">Study Desk</a>
    &nbsp;·&nbsp;
    <a href="https://ap-study-hub-five.vercel.app/videos">Unit Videos</a>
    &nbsp;·&nbsp;
    <a href="https://ap-study-hub-five.vercel.app/guides">Study Guides</a>
    &nbsp;·&nbsp;
    <a href="./AI_DISCLOSURE.md">AI Disclosure</a>
  </p>
</div>

---

## Why this exists

Studying for several AP classes at once usually turns into eleven browser tabs — a 240-page Course and Exam Description PDF, a summary sheet with half the units missing, an ad-heavy flashcard deck, and a video queue full of unrelated recommendations.

**AP Study Hub** puts the entire study loop for ten AP subjects inside one quiet, zero-account workspace:

- **Complete cited lessons** — 75 full-length unit lessons (`750` cited prose paragraphs, learning objectives, worked examples, primary sources, and common mistakes).
- **Cold-recall decks** — 568 active-recall flashcards (course decks + unit glossary terms) with keyboard flip, Fisher–Yates shuffle, and local spaced-review scheduling.
- **Exam-register practice & timed writing** — 447 original multiple-choice questions that link wrong answers back to the exact lesson section, plus a full-length **interim assessment for every course** with the official section counts, clock, and breaks, and college-ruled scratch paper.
- **Real rubric grading** — every written response is marked row by row against the published College Board rubric, with the sentences that earned or missed each point, grammar and spelling findings, and a study link for every question you missed.

There are **no accounts, no paywalls, no ad scripts, and no analytics trackers**. Progress, due cards, missed questions, and timed drafts live locally in `localStorage` on your own device and can be exported to JSON or Markdown at any time.

---

## The Catalogue

Every count in the UI and metadata is computed at build time from `src/content/` and verified by `pnpm check`.

| Course | White Symbol | Units & Lessons | Cited Paragraphs | Recall Cards | Practice Qs | Essays & Interim Papers | Unit Videos |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **AP U.S. History** (`apush`) | Waving U.S. flag | 9 | 90 | 89 | 66 | 1 essay · 1 interim | 13 |
| **AP English Language** (`ap-lang`) | Open book | 9 | 90 | 81 | 66 | 3 essays · 1 interim | 9 |
| **AP English Literature** (`ap-lit`) | Engraved rose | 9 | 90 | 43 | 18 | 0 essays · 1 interim | 11 |
| **AP Seminar** (`ap-seminar`) | Source documents | 5 | 50 | 56 | 48 | 1 essay · 1 mock | 10 |
| **AP U.S. Gov & Politics** (`ap-gov`) | Classical capitol | 5 | 50 | 40 | 35 | 4 essays · 1 interim | 6 |
| **AP Biology** (`ap-bio`) | DNA double helix | 8 | 80 | 52 | 47 | 0 essays · 1 interim | 8 |
| **AP Calculus AB** (`ap-calc`) | Right triangle (`cos θ`) | 10 | 100 | 55 | 50 | 0 essays · 1 interim | 10 |
| **AP Research** (`ap-research`) | Magnifying glass | 5 | 50 | 32 | 30 | 1 essay · 1 interim | 10 |
| **AP Macroeconomics** (`ap-macro`) | Rising market graph | 6 | 60 | 54 | 39 | 1 essay · 1 interim | 6 |
| **AP Environmental Science** (`ap-env`) | Leaf | 9 | 90 | 66 | 48 | 1 essay · 1 interim | 10 |
| **Total** | **10 white RGBA icons** | **75** | **750** | **568** | **447** | **12 essays · 10 interims** | **93** |

---

## Architecture & Study Flow

```text
  Lessons (/course/[slug]/notes)            Recall Decks (/cards)             Practice & Studio (/practice · /exam)
 ┌──────────────────────────────────┐      ┌──────────────────────────┐      ┌───────────────────────────────────────┐
 │ 75 lessons · 750 cited paragraphs│ ───► │ 568 recall cards         │ ───► │ 447 MCQs + 12 essays + 10 interims     │
 │ Objectives, worked examples,     │      │ Space/Enter flip,        │      │ Wrong answers jump straight back to   │
 │ primary sources, unit videos     │ ◄─── │ local SM-2 review queue  │ ◄─── │ the exact lesson section & scratchpad │
 └──────────────────────────────────┘      └──────────────────────────┘      └───────────────────────────────────────┘
```

### Privacy-first unit videos (`UnitVideoPlayer`)
- Every course unit includes vetted review videos (`Heimler's History`, `Coach Hall Writes`, `Garden of English`, `Bozeman Science`, `Amoeba Sisters`, `3Blue1Brown`, `Professor Leonard`, `Carey LaManna`, and official `Advanced Placement` playlists) verified via YouTube oEmbed (`scripts/validate-videos.ts`).
- Pages render static `i.ytimg.com` thumbnails first — **no YouTube scripts or `<iframe>` embeds load until you explicitly opt in** (`youtube-nocookie.com`), or you can open the video directly on YouTube in a new tab.

### Local-first persistence & optional integrations
- Core study state uses clean `aps:*` `localStorage` keys (`use-stored-state.ts` + `study-store.ts`) — zero cookies, zero telemetry, instant JSON backup/restore, `.apkg`-ready Anki TSV/CSV export, `.ics` exam calendar export, and Markdown portfolio export.
- Optional student-supplied connectors (`/integrations`) support **GitHub Gist** cross-device sync and **Google Drive / Notion / Quizlet / Obsidian** import-export formats using tokens you control locally.

---

## The Interim Assessments

Each course has one paper at `/course/<slug>/exam` with two modes and a score report.

- **Official shape.** Section order, question counts, minutes, calculator rules, and breaks come from the published exam format — 55 MCQs in 60 minutes and three 40-minute essays for AP Lit, 55 in 55 plus SAQ/DBQ/LEQ for APUSH, 30 no-calculator and 15 calculator MCQs for Calculus, and so on. `scripts/validate` keeps the counts honest.
- **Public-domain passages.** Every poem, prose excerpt, and document is public domain or written for this site. Nothing is presented as a released College Board question.
- **Rubric grading.** Written tasks are marked against the published rows (thesis, evidence and commentary, sophistication; DBQ's seven points; SAQ's three; the six-point Gov argument; the four-row Research paper). Each row shows what it measured in your own sentences, what was missing, and one revision that would earn the next point.
- **Grammar and spelling.** A dependency-free analyser checks agreement, fragments, comma splices, confused words, capitalisation, spacing, register, and spelling against a 30,275-word lexicon built from the site's corpus plus frequency-ranked English. Findings quote the sentence and suggest a fix.
- **Nothing is hardcoded.** The default grader is `src/lib/grading/grade.ts`, which computes points from measured features. Model grading is opt-in: paste your own provider key in the grading panel and `/api/grade` forwards the response, prompt, and rubric to that provider for a stricter second read. The key never touches the server's storage.
- **A study link for every miss.** The score report lists every response — right, wrong, blank, flagged — with the skill it tested, the explanation, and the lesson to open next, filtered by status so a review pass can start with the wrong ones.
- **Guided walkthrough.** The same paper, taught question by question: how to read the stem, why each distractor fails, the method for the essay, and a writing coach with a timed plan, evidence checklist, and sentence frames.

### The exam room

Sitting a paper takes over the screen instead of scrolling a page.

- **One question at a time, passage beside it.** A two-pane room: the passage, document set, data figure, or poem stays on the left while the question or essay prompt sits on the right, so nothing has to be scrolled back to. The layout is identical for all ten courses — the pane only changes what it is showing.
- **A bar that answers the three questions you actually have:** where am I, how long is left, and how do I get out. The clock counts down against a wall-clock deadline (a backgrounded tab cannot steal minutes), turns amber with five minutes left, and stops at zero.
- **Answer sheet.** A monospace grid of every question in the section, marked answered / flagged / blank, letting you jump anywhere. It doubles as the review surface at the end.
- **Full screen, and a phone that works.** One button asks the browser for full screen; below 900px the two panes become one column with a Passage / Question switch, so the same room is usable on a phone in a corridor.
- **Breaks and sections.** Section changes and the scheduled break are enforced by the same state machine, so the paper cannot be sat out of order.
- **Autosave.** Answers, flags, and essay drafts are written to `localStorage` on every keystroke under `aps.assessment.<course>.*`; closing the tab does not lose the paper.

### The answer sheet, on paper

`/course/<slug>/exam/answers` prints a blank answer sheet in the same shape as the paper: one bubble row per multiple-choice question (labelled with the options that question actually offers), ruled space sized to each written task, and nothing that gives the answer away. It is `noindex`, prints without the site chrome, and lets a paper be sat with a pen — or re-sat from a marked sheet without reprinting the questions.

### The study desk knows about exams

`/study?tab=exams` lists every course's paper with its clock, section counts, and rubric total; it reads the same `localStorage` keys the exam room writes, so it can say *"23/55 answered · 1/3 written"* and offer Resume, Answer sheet, or Studio. The report a finished paper produces turns weak units into the desk's normal review and mistake queue.

Cut scores are not published by the College Board, so the 1–5 figure is an estimate from public scoring worksheets and is labelled as an estimate everywhere it appears.

## Quick Start & Verification

Requires **Node.js 20+** and **pnpm 9+** (`corepack enable`).

```bash
git clone https://github.com/Nikoxkx/Ap-Study-Hub.git
cd Ap-Study-Hub
corepack pnpm install
corepack pnpm dev          # http://localhost:3000
```

Run the full validation and production build pipeline before opening a PR:

```bash
corepack pnpm validate:content        # 75 lessons, 750 paragraphs, citations, glossary & practice schema
corepack pnpm validate:exams          # section counts, minutes, breaks, rubric totals & score arithmetic for all 10 papers
corepack pnpm validate:study          # 1,015 study items, KaTeX math, scheduling, backups, plans & calendar
corepack pnpm validate:presentation   # dark-mode neutral hex tokens, white RGBA marks, CSP, 1200×630 OG PNGs
corepack pnpm validate:videos         # 93 verified 11-char YouTube IDs, course/unit mapping & thumbnails
corepack pnpm build:banners           # regenerate assets/readme/banner-{light,dark}.png
corepack pnpm build:social            # regenerate public/og-image.png & public/social-preview.png
corepack pnpm check                   # runs all 4 validators + tsc --noEmit + eslint + next build
corepack pnpm audit --audit-level low # checks direct and transitive dependencies for known advisories
```

The dependency audit also runs on dependency-changing pull requests, on merges to `main`, and weekly via GitHub Actions. Keep `pnpm-lock.yaml` in sync with `package.json` so the audit checks the versions actually installed.

---

## Repository Map

```text
assets/
  readme/
    build-banners.mjs           renders README banners over bg-music-class.jpg with frosted glass UI & Logo
    banner-light.png            1600×580 light-mode classroom wallpaper + frosted glass UI banner
    banner-dark.png             1600×580 dark-mode twilight classroom + smoked glass UI banner
  social/
    og-image.svg                1200×630 Open Graph / social card source SVG
public/
  bg-music-class.jpg            wallpaper: /, /about
  bg-corridor.jpg               wallpaper: /study, /search, /integrations, /ai-disclosure
  bg-class.jpg                  wallpaper: /course/[slug], /cards, /videos, /guides
  bg-class2.jpg                 wallpaper: /notes, /practice, /studio, /essays, /exam, /resources, /print
  fonts/                        self-hosted WOFF2 subsets (Newsreader, Public Sans, JetBrains Mono, Kalam)
  icons/courses/                10 pure-white (#FFFFFF) transparent RGBA AP course symbols
  og-image.png                  compiled 1200×630 Open Graph card
  social-preview.png            compiled 1200×630 GitHub / social preview card
  sw.js                         same-origin offline service worker
scripts/
  validate-lessons.ts           verifies lesson depth, citations, cards, and practice integrity
  validate-study.ts             verifies study catalog joins, KaTeX math, scheduling, backups, and exports
  validate-videos.ts            verifies curated YouTube IDs and unit coverage
  validate-presentation.mjs     enforces neutral dark tokens, SubjectMark icons, video privacy, and PNG headers
  build-social-image.mjs        renders 1200×630 social cards over bg-music-class.jpg via @resvg/resvg-js
src/
  app/                          Next.js 16 App Router (static routes, loading boundaries, /api/search)
  components/
    SiteHeader.tsx              single-row leveled header bar (Logo, TopClassBar, Jump to ⌘K, MobileNav)
    SiteHeaderShell.tsx         directional scroll-fade shell preserving fixed modal viewports
    TopClassBar.tsx             hover-reveal AP Courses bar + mobile touch sheet with white AP symbols
    MobileNav.tsx               unified Menu popover (SiteSearch, Study Desk, links, ThemeSwitch)
    StudySystemVisual.tsx       interactive ten-course cold-recall card preview inside the homepage hero
    StudyDashboard.tsx          spacious local-first Study Desk with white AP course filter pills & 9 tabs
    SubjectMark.tsx             10 pure-white RGBA AP course symbols across light glass & neutral night mode
    UnitVideoPlayer.tsx         click-to-load youtube-nocookie player + conflict-free full-screen view
    CardDeck.tsx                keyboard-first active-recall flashcard deck
    PracticeSet.tsx             accessible multiple-choice runner with section-level remediation
    exam/
      TimedPaper.tsx            full-screen exam room: two panes, clock, answer sheet, breaks, autosave
      ExamHub.tsx               briefing, simulation, guided walkthrough, and score report switch
      ScoreReport.tsx           composite arithmetic, per-response review, rubric marking
      GraderPanel.tsx           rubric rows, mechanics list, optional model-key second read
      GuidedWalkthrough.tsx     the same paper taught question by question
      WritingCoach.tsx          timed plan, evidence checklist, sentence frames per essay
    study/AdvancedDesk.tsx      spaced-review queue, missed-question drill, and study analytics
    ui/
      PageBackground.tsx        route-mapped full-viewport classroom/corridor wallpaper layer
      Logo.tsx                  universal 45°-rotated 7-square geometric mark
      BanterLoader.tsx          9-box kinetic geometric symbol
      LoadingSpinner.tsx        universal 3-circle + 3-shadow bouncing loader
      ThemeSwitch.tsx           compact Sun / Moon / Clouds / Stars theme switch
      NotebookPaper.tsx         reusable college-ruled loose-leaf scratch paper sheet
      ScrollEffects.tsx         60fps exponential-lerp bidirectional viewport-edge fade controller
  content/                      typed curriculum, 75 deep lessons, 10 exam blueprints, sources, and unit videos
  lib/                          catalog aggregator, weighted search index, local store, and JSON-LD schema
```

---

## Honesty, Trademarks & License

- **Independent student project** — AP® and Advanced Placement® are registered trademarks of the College Board, which was not involved in the production of, and does not endorse, this site. All 447 practice questions, 568 recall cards, 75 lessons, and 10 interim assessments are original study material written from public curriculum frameworks and open textbooks; no secure exam items are reproduced. Interim essays are marked against the published College Board rubric rows, and the score estimate is labelled as an estimate because cut scores are not published.
- **Fonts & artwork** — Self-hosted `Newsreader`, `Public Sans`, `JetBrains Mono`, and `Kalam` are licensed under the SIL Open Font License 1.1 (`public/fonts/`). Background classroom and corridor paintings are original environment illustrations by Arseniy Chebynkin.
- **AI transparency** — Every place where AI tools assisted with scaffolding, drafting, or validation is documented openly in [`AI_DISCLOSURE.md`](./AI_DISCLOSURE.md) and [`/ai-disclosure`](https://ap-study-hub-five.vercel.app/ai-disclosure).
- **Code license** — Released under the [MIT License](./LICENSE).
