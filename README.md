<div align="center">
  <a href="https://v0-project-roan-six-20.vercel.app">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./assets/readme/banner-dark.svg" />
      <source media="(prefers-color-scheme: light)" srcset="./assets/readme/banner-light.svg" />
      <img src="./assets/readme/banner-light.svg" width="100%" alt="AP Study Hub — learn seven AP subjects deeply with zero noise" />
    </picture>
  </a>

  <br />

  <p>
    <strong>Seven AP courses in one calm, transparent glass study hub — with 51 cited lessons, recall cards, original practice, real unit-video previews, and college-ruled notebook scratch paper.</strong>
  </p>

  <p>
    <a href="https://v0-project-roan-six-20.vercel.app"><img alt="Live site" src="https://img.shields.io/badge/live_site-v0--project--roan--six--20.vercel.app-121212?style=flat-square&labelColor=262626" /></a>
    <a href="#the-catalogue"><img alt="7 AP courses · 51 lessons · 510 paragraphs" src="https://img.shields.io/badge/7_courses-51_lessons_·_510_paragraphs-121212?style=flat-square&labelColor=262626" /></a>
    <a href="#the-catalogue"><img alt="405 cards · 240 questions · 66 videos" src="https://img.shields.io/badge/practice-405_cards_·_240_questions_·_66_videos-121212?style=flat-square&labelColor=262626" /></a>
    <a href="./LICENSE"><img alt="MIT license" src="https://img.shields.io/badge/license-MIT-404040?style=flat-square&labelColor=262626" /></a>
    <a href="./AI_DISCLOSURE.md"><img alt="AI disclosure" src="https://img.shields.io/badge/AI_assistance-disclosed-404040?style=flat-square&labelColor=262626" /></a>
  </p>

  <p>
    <a href="https://v0-project-roan-six-20.vercel.app"><strong>Open the hub</strong></a>
    &nbsp;·&nbsp;
    <a href="https://v0-project-roan-six-20.vercel.app/study">Study Desk</a>
    &nbsp;·&nbsp;
    <a href="https://v0-project-roan-six-20.vercel.app/videos">Unit Videos</a>
    &nbsp;·&nbsp;
    <a href="https://v0-project-roan-six-20.vercel.app/guides">Study Guides</a>
    &nbsp;·&nbsp;
    <a href="https://v0-project-roan-six-20.vercel.app/colophon">Colophon</a>
    &nbsp;·&nbsp;
    <a href="./AI_DISCLOSURE.md">AI Disclosure</a>
  </p>
</div>

---

## Why this exists

Studying for several AP classes at once usually turns into eleven browser tabs — a 240-page Course and Exam Description PDF, a summary sheet with half the units missing, an ad-heavy flashcard deck, and a video queue full of unrelated recommendations.

**AP Study Hub** puts the entire study loop for seven AP subjects inside one quiet, zero-account workspace:

1. **Read deeply** — 51 full-length lessons (`510` cited prose paragraphs, learning objectives, worked examples, primary sources, and common mistakes).
2. **Recall cold** — 405 active-recall flashcards (course decks + unit glossary terms) with keyboard flip, Fisher–Yates shuffle, and local spaced-review buckets.
3. **Respond under exam conditions** — 240 original multiple-choice questions that route wrong answers back to the exact lesson section, plus timed essay outlines and mock papers with lined scratch paper.

There are **no accounts, no paywalls, no ad scripts, and no analytics trackers**. Progress, due cards, missed questions, and timed drafts live locally in `localStorage` on your own device and can be exported to JSON or Markdown at any time.

---

## Interface & Design System (2026–27 Overhaul)

The entire front-end was rebuilt around calm legibility, transparent glass surfaces, human-made monochrome iconography, and physical study materials:

- **Per-route painted classroom & corridor wallpapers (`PageBackground`)** — Full-viewport illustrations (`public/bg-music-class.jpg`, `bg-corridor.jpg`, `bg-class.jpg`, `bg-class2.jpg`) anchor distinct route families (`/`, `/study`, `/course/[slug]`, and deep study sub-tabs) without ever repeating inside interior containers. Switching into `.dark` mode disables photographic backgrounds (`background-image: none`) in favor of a pure neutral charcoal canvas (`#121212`).
- **Hue-free frosted glass surfaces (`.glass-box`)** — Every card, lesson reader, header bar, and modal uses colorless translucent glass (`backdrop-filter: blur(5px)`, crisp `1px` borders, zero color tints) paired with monochrome ink tokens and a soft classroom-light periwinkle text `::selection` highlight.
- **Single-row leveled navigation (`SiteHeaderShell`, `TopClassBar`, `MobileNav`)** — `AP Study Hub`, `AP Courses`, `Jump to ⌘K`, and the compact `Menu` button sit leveled on one `38px` row:
  - **Hover-reveal `AP Courses` bar** (with a touch-friendly bottom sheet on mobile) previews all 7 courses without cluttering the viewport and fades away when unhovered or on scroll.
  - **Unified `Menu` popover** houses instant `SiteSearch`, `Study Desk`, hub links, and the interactive Sun / Moon / Clouds / Stars `ThemeSwitch`.
  - **Directional scroll fade** smoothly hides the header while reading downward and restores it on upward scroll without breaking fixed modals (`CommandPalette`).
- **Universal geometric & kinetic symbols** —
  - **45°-rotated 7-square `Logo`** — The universal emblem across the masthead, footer, README banners, and social preview card.
  - **Monochrome `SubjectMark` course glyphs** — Seven human-crafted 32-unit black-and-white SVG symbols (U.S. flag, quotation marks, speech bubbles, scales of justice, DNA helix, integral sign, magnifying glass) — zero AI-generated icons or colored badges.
  - **3-circle + 3-shadow bouncing `LoadingSpinner`** — Displayed seamlessly whenever routes (`loading.tsx`) or async components (`SiteSearch`, `StudyDashboard`, `AdvancedDesk`, `UnitVideoPlayer`, `OfflinePackButton`) load.
  - **9-box `BanterLoader`** — Tactile geometric accent accompanying the Study Desk workspace.
- **Realistic college-ruled notebook paper (`StudySystemVisual`, `NotebookPaper`)** — Both the homepage **AP Study Hub Method (2026–27)** sheet and every scratchpad inside timed essays, mock exams, and Study Studio render authentic loose-leaf college-ruled paper (`#fbf9f3`, single pink vertical margin rule, horizontal `32px` blue lines, zero extra CSS dividers or dots). On the Method sheet, self-hosted `Caveat` handwriting sits directly on the blue baselines.
- **60fps bidirectional scroll fade (`ScrollEffects`)** — Time-normalized `requestAnimationFrame` exponential interpolation (`smoothstep` viewport edge bands) gently fades sections in and out at both top and bottom viewport edges without abrupt mouse-wheel snapping, while honoring `prefers-reduced-motion: reduce`.

---

## The Catalogue

Every count in the UI and metadata is computed at build time from `src/content/` and verified by `pnpm check`.

| Course | Mark | Units & Lessons | Cited Paragraphs | Recall Cards | Practice Qs | Essays & Mock Papers | Unit Videos |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **AP U.S. History** (`apush`) | U.S. flag | 9 | 90 | 89 | 48 | 1 essay · 1 mock | 13 |
| **AP English Language** (`ap-lang`) | Quotation marks | 9 | 90 | 81 | 48 | 3 essays · 1 mock | 9 |
| **AP Seminar** (`ap-seminar`) | Speech bubbles | 5 | 50 | 56 | 38 | 1 essay · 1 mock | 10 |
| **AP U.S. Gov & Politics** (`ap-gov`) | Scales of justice | 5 | 50 | 40 | 25 | 0 · 0 | 6 |
| **AP Biology** (`ap-bio`) | DNA | 8 | 80 | 52 | 31 | 0 · 0 | 8 |
| **AP Calculus AB** (`ap-calc`) | Integral sign | 10 | 100 | 55 | 30 | 0 · 0 | 10 |
| **AP Research** (`ap-research`) | Magnifying glass | 5 | 50 | 32 | 20 | 1 essay · 0 mocks | 10 |
| **Total** | **7 glyphs** | **51** | **510** | **405** | **240** | **6 essays · 3 mocks** | **66** |

---

## Architecture & Study Loop

```text
  Read deeply (/course/[slug]/notes)         Recall cold (/cards)              Respond (/practice · /essays · /exam)
 ┌──────────────────────────────────┐      ┌──────────────────────────┐      ┌───────────────────────────────────────┐
 │ 51 lessons · 510 cited paragraphs│ ───► │ 405 recall cards         │ ───► │ 240 MCQs + 6 essays + 3 mock papers   │
 │ Objectives, worked examples,     │      │ Space/Enter flip,        │      │ Wrong answers link straight back to   │
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
corepack pnpm validate:content        # 51 lessons, 510 paragraphs, citations, glossary & practice schema
corepack pnpm validate:study          # 645 study items, KaTeX math, scheduling, backups, plans & calendar
corepack pnpm validate:presentation   # dark-mode neutral hex tokens, monochrome marks, CSP, 1200×630 OG PNGs
corepack pnpm validate:videos         # 66 verified 11-char YouTube IDs, course/unit mapping & thumbnails
corepack pnpm build:banners           # regenerate assets/readme/banner-{light,dark}.svg
corepack pnpm build:social            # regenerate public/og-image.png & public/social-preview.png
corepack pnpm check                   # runs all 4 validators + tsc --noEmit + eslint + next build
```

---

## Repository Map

```text
assets/
  readme/
    build-banners.mjs           deterministic SVG generator (embeds SIL-OFL Caveat WOFF2)
    banner-light.svg            light-mode frosted glass + college-ruled paper README banner
    banner-dark.svg             dark-mode frosted glass + college-ruled paper README banner
  social/
    og-image.svg                1200×630 Open Graph / social card source SVG
public/
  bg-music-class.jpg            wallpaper: /, /about, /colophon
  bg-corridor.jpg               wallpaper: /study, /search, /integrations, /ai-disclosure
  bg-class.jpg                  wallpaper: /course/[slug], /cards, /videos, /guides
  bg-class2.jpg                 wallpaper: /notes, /practice, /studio, /essays, /exam, /resources, /print
  fonts/                        self-hosted WOFF2 subsets (Newsreader, Public Sans, JetBrains Mono, Caveat)
  og-image.png                  compiled 1200×630 Open Graph card
  social-preview.png            compiled 1200×630 GitHub / social preview card
  sw.js                         same-origin offline service worker
scripts/
  validate-lessons.ts           verifies lesson depth, citations, cards, and practice integrity
  validate-study.ts             verifies study catalog joins, KaTeX math, scheduling, backups, and exports
  validate-videos.ts            verifies curated YouTube IDs and unit coverage
  validate-presentation.mjs     enforces neutral dark tokens, SubjectMark labels, video privacy, and PNG headers
  build-social-image.mjs        renders assets/social/og-image.svg to public/*.png via @resvg/resvg-js
src/
  app/                          Next.js 16 App Router (static routes, loading boundaries, /api/search)
  components/
    SiteHeader.tsx              single-row leveled header bar (Logo, TopClassBar, Jump to ⌘K, MobileNav)
    SiteHeaderShell.tsx         directional scroll-fade shell preserving fixed modal viewports
    TopClassBar.tsx             hover-reveal AP Courses popover + mobile touch bottom sheet
    MobileNav.tsx               unified Menu popover (SiteSearch, Study Desk, links, ThemeSwitch)
    StudySystemVisual.tsx       Caveat handwritten Method sheet locked to 32px blue notebook rules
    SubjectMark.tsx             7 monochrome hand-drawn 32-unit SVG course symbols
    UnitVideoPlayer.tsx         click-to-load youtube-nocookie player + static thumbnail previews
    CardDeck.tsx                keyboard-first active-recall flashcard deck
    PracticeSet.tsx             accessible multiple-choice runner with section-level remediation
    TimedPaper.tsx              essay & mock-exam workspace with autosave + NotebookPaper scratchpad
    study/AdvancedDesk.tsx      spaced-review queue, missed-question drill, and study analytics
    ui/
      PageBackground.tsx        route-mapped full-viewport classroom/corridor wallpaper layer
      Logo.tsx                  universal 45°-rotated 7-square geometric mark
      BanterLoader.tsx          9-box kinetic geometric symbol
      LoadingSpinner.tsx        universal 3-circle + 3-shadow bouncing loader
      ThemeSwitch.tsx           compact Sun / Moon / Clouds / Stars theme switch
      NotebookPaper.tsx         reusable college-ruled loose-leaf scratch paper sheet
      ScrollEffects.tsx         60fps exponential-lerp bidirectional viewport-edge fade controller
  content/                      typed curriculum, 51 deep lessons, sources, channels, and unit videos
  lib/                          catalog aggregator, weighted search index, local store, and JSON-LD schema
```

---

## Honesty, Trademarks & License

- **Independent student project** — AP® and Advanced Placement® are registered trademarks of the College Board, which was not involved in the production of, and does not endorse, this site. All 240 practice questions, 405 recall cards, and 51 lessons are original study material written from public curriculum frameworks and open textbooks; no secure exam items are reproduced.
- **Fonts & artwork** — Self-hosted `Newsreader`, `Public Sans`, `JetBrains Mono`, and `Caveat` are licensed under the SIL Open Font License 1.1 (`public/fonts/`). Background classroom and corridor paintings are original environment illustrations by Arseniy Chebynkin.
- **AI transparency** — Every place where AI tools assisted with scaffolding, drafting, or validation is documented openly in [`AI_DISCLOSURE.md`](./AI_DISCLOSURE.md) and [`/ai-disclosure`](https://v0-project-roan-six-20.vercel.app/ai-disclosure).
- **Code license** — Released under the [MIT License](./LICENSE).
