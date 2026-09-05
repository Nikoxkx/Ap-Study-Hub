<div align="center">

  <a href="https://apstudyhub.vercel.app">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./assets/readme/banner-dark.svg" />
      <img src="./assets/readme/banner-light.svg" width="100%" alt="AP Study Hub — unit notes, index cards, marked essays and timed practice for seven AP courses" />
    </picture>
  </a>

  <p>
    <a href="https://apstudyhub.vercel.app"><img src="https://img.shields.io/badge/apstudyhub.vercel.app-live-b0392a?style=flat-square&labelColor=1c1b17" alt="Live site" /></a>
    <img src="https://img.shields.io/badge/courses-7-57534a?style=flat-square&labelColor=1c1b17" alt="Seven courses" />
    <img src="https://img.shields.io/badge/account-not%20required-2f5f56?style=flat-square&labelColor=1c1b17" alt="No account required" />
    <img src="https://img.shields.io/badge/tracking-none-3f6b46?style=flat-square&labelColor=1c1b17" alt="No tracking" />
    <br />
    <img src="https://img.shields.io/badge/Next.js-16-57534a?style=flat-square&labelColor=1c1b17&logo=nextdotjs&logoColor=f6f3ec" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/React-19-57534a?style=flat-square&labelColor=1c1b17&logo=react&logoColor=f6f3ec" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-strict-57534a?style=flat-square&labelColor=1c1b17&logo=typescript&logoColor=f6f3ec" alt="TypeScript, strict" />
    <img src="https://img.shields.io/badge/node-%E2%89%A520.9-57534a?style=flat-square&labelColor=1c1b17&logo=nodedotjs&logoColor=f6f3ec" alt="Node 20.9 or newer" />
    <img src="https://img.shields.io/badge/accessibility-WCAG%202.2%20AA-3f6b46?style=flat-square&labelColor=1c1b17" alt="WCAG 2.2 AA target" />
    <img src="https://img.shields.io/badge/licence-MIT-57534a?style=flat-square&labelColor=1c1b17" alt="Licence: MIT" />
  </p>

</div>

# Seven AP courses, written up the way I actually revised for them.

Unit notes, the cards I drilled on the bus, and sample essays with the rubric points
marked in the margin — plus timed practice papers with a running clock. I sat these
exams. This is what I wish had existed.

**Live at <https://apstudyhub.vercel.app>** — no account, no paywall, no tracking.

<p align="center">
  <strong>44</strong> units of notes &nbsp;·&nbsp; <strong>201</strong> index cards &nbsp;·&nbsp;
  <strong>138</strong> practice questions &nbsp;·&nbsp; <strong>6</strong> marked essays
  &nbsp;·&nbsp; <strong>3</strong> timed papers &nbsp;·&nbsp; <strong>45</strong> checked links
  &nbsp;·&nbsp; <strong>19,400+</strong> words of content
</p>
<p align="center">
  <strong>0</strong> accounts &nbsp;·&nbsp; <strong>0</strong> cookies &nbsp;·&nbsp;
  <strong>0</strong> analytics scripts &nbsp;·&nbsp; <strong>1</strong> student, accountable by name
</p>

Not affiliated with the College Board. AP and Advanced Placement are their registered
trademarks, and nothing here has been reviewed or endorsed by them.

---

**In this README**

- [01 — The catalogue](#01--the-catalogue) — every course, with the real counts
- [02 — What is on a course page](#02--what-is-on-a-course-page) — the six study modes, in detail
- [03 — 2026 exam calendar](#03--2026-exam-calendar) — dates as published by the College Board
- [04 — The study guides](#04--the-study-guides) — method, the last fortnight, exam day, what a score buys
- [05 — Why this exists](#05--why-this-exists) — and who is writing it
- [06 — What this site is not](#06--what-this-site-is-not)
- [07 — Questions people actually ask](#07--questions-people-actually-ask)
- [08 — How it is built](#08--how-it-is-built) — search, privacy, accessibility, SEO, security
- [09 — Running it locally](#09--running-it-locally)
- [10 — How the repo is laid out](#10--how-the-repo-is-laid-out)
- [11 — Adding content and fixing errors](#11--adding-content-and-fixing-errors)
- [12 — Contributing](#12--contributing)

---

## 01 — The catalogue

Every number below is what the site itself computes from the content at build time —
not a marketing figure. The live versions of all the counts are on
[`/about`](https://apstudyhub.vercel.app/about).

| Spine | Course | Units | Cards | Questions | Essays | Timed paper | Notes read | Last worked on |
| :---- | :----- | ----: | ----: | --------: | -----: | ----------: | ---------: | :------------- |
| `USH` | [AP United States History](https://apstudyhub.vercel.app/course/apush) | 9 | 53 | 30 | 1 | 1 | ~4 min | 30 August 2026 |
| `LNG` | [AP English Language and Composition](https://apstudyhub.vercel.app/course/ap-lang) | 6 | 45 | 30 | 3 | 1 | ~2 min | 22 August 2026 |
| `SEM` | [AP Seminar](https://apstudyhub.vercel.app/course/ap-seminar) | 5 | 36 | 28 | 1 | 1 | ~1 min | 19 July 2026 |
| `GOV` | [AP United States Government and Politics](https://apstudyhub.vercel.app/course/ap-gov) | 5 | 20 | 15 | — | — | ~2 min | 28 June 2026 |
| `BIO` | [AP Biology](https://apstudyhub.vercel.app/course/ap-bio) | 8 | 20 | 15 | — | — | ~3 min | 11 August 2026 |
| `CAL` | [AP Calculus AB and BC](https://apstudyhub.vercel.app/course/ap-calc) | 6 | 15 | 10 | — | — | ~2 min | 31 May 2026 |
| `RES` | [AP Research](https://apstudyhub.vercel.app/course/ap-research) | 5 | 12 | 10 | 1 | — | ~2 min | 4 July 2026 |
| | **All seven** | **44** | **201** | **138** | **6** | **3** | ~16 min | |

What each spine actually contains:

- **USH — APUSH.** Nine chronological periods from 1491 to the present, organised the
  way the rubric reads: context, evidence, then complexity. Weighted toward the essay
  half of the exam (DBQ and long essay), with the timed paper mirroring the real thing
  — 55 minutes of multiple choice, then a 60-minute DBQ and a 40-minute LEQ.
- **LNG — AP Lang.** Rhetorical analysis, synthesis and argument — three essays in two
  hours and fifteen minutes, where two thirds of the score lives. The three marked
  samples show which sentence earned which rubric point.
- **SEM — AP Seminar.** Two performance tasks worth 65% of the score, plus the
  two-hour end-of-course paper. The exemplar is annotated against the actual scoring
  guidelines, and the timed practice splits into Part A source analysis and Part B
  constructing an argument.
- **GOV — AP Gov.** Nine required Supreme Court cases and fifteen founding documents
  you are expected to cite by name; the notes flag every required text, because the
  free-response section will make you apply them to a scenario you have never seen.
- **BIO — AP Bio.** Eight units under the four big ideas. The practice set is weighted
  toward the analysis skills the scoring guidelines actually reward — reading a graph,
  defending a claim, justifying a conclusion.
- **CAL — AP Calculus AB and BC.** AB and BC share a spine, so one page covers both and
  marks the BC-only material (series, polar, parametric). Half the exam is
  calculator-active; the notes say which half, because that changes how you set a
  problem up.
- **RES — AP Research.** One 4,000–5,000 word paper, a presentation and an oral
  defence — there is no May exam at all, so everything here is about the paper:
  research question, literature review, methodology, structure, and surviving the
  defence.

Coverage is deliberately uneven, and the table says exactly how uneven. Where a course
has no essays or timed paper, the tab is not rendered at all rather than shown empty —
a tab advertising a gap is worse than no tab.

## 02 — What is on a course page

Six things, in the order you are likely to want them. Each one is its own URL, so you
can bookmark the bit you are working through instead of scrolling past the rest.

| | Mode | What it is |
| :-- | :--- | :--------- |
| `i` | **Notes** | Unit-by-unit write-ups following the College Board course and exam description, in its order and unit numbering. The key terms are pulled to the top of each unit so you can self-test before you read; every unit has its own anchor, and search deep-links straight into the middle of one. |
| `ii` | **Cards** | Term on the front, the answer you would actually have to produce on the back. Shuffles with a real Fisher–Yates, fully keyboard-driven, and it remembers the ones you got wrong — including a “missed only” pass and a reset, with marks stored per course so they survive a reload. |
| `iii` | **Practice** | Multiple choice written in exam register — plausible distractors drawn from the mistakes people actually make, not three obviously wrong answers — with an explanation of why each option fails, and a review pass at the end that lists what you missed instead of hiding behind a bare score. |
| `iv` | **Essays** | Full sample responses laid out like a paper handed back: the response in the main column, the rubric broken out point by point in the margin, the prompt and source documents folded away above and below. What earned the thesis mark, what earned evidence, what would have earned sophistication. |
| `v` | **Timed paper** | The full-length format with a running clock and the source documents embedded, so you find out how long forty minutes really is before it counts. |
| `vi` | **Sources** | Links out to College Board material, archives and the teachers worth watching, each with the date a person last opened it. |

### The card deck, key by key

Shortcuts are scoped to the deck — they fire only while it holds focus, so they never
hijack typing anywhere else on the page.

| Key | Action |
| :-- | :----- |
| `Space` / `Enter` | Flip the card |
| `←` / `→` | Previous / next (wraps around) |
| `1` | “got it” — mark and move on |
| `2` | “again” — mark as a miss and move on |
| `S` | Shuffle (Fisher–Yates — unbiased, unlike sorting by a random comparator) |

The status line keeps the count honest: `Card 12 of 53 · 40 reviewed · 7 to redo`.

### Practice sets, honestly

The options are real radio inputs in a fieldset — arrow keys move between them for
free, the group announces itself properly, and the result of each answer lands in an
`aria-live` region so a screen reader hears it without hunting. The end of the set is
a review of every question you missed, with its explanation, because a bare percentage
teaches nothing.

### Timed papers, without the fake grading

The previous generation of practice-exam sites “graded” essays by counting words.
That is not marking, it is a word counter wearing a rubric, and a student who trusted
it would learn to pad. Here the multiple choice is marked properly, and the written
sections give you the **actual rubric rows as a checklist to mark yourself against** —
which is what AP teachers have students do. Answers and drafts are kept in
`localStorage`, so a mistyped URL or a closed tab mid-paper does not cost two hours
of writing.

| Course | Paper | Length | Sections |
| :----- | :---- | -----: | :------- |
| [APUSH](https://apstudyhub.vercel.app/course/apush/exam) | APUSH Practice Exam | 155 min | Multiple choice (55 min, 15 questions) · DBQ (60 min) · Long essay (40 min) · 7 source documents |
| [AP Lang](https://apstudyhub.vercel.app/course/ap-lang/exam) | AP Lang Practice Exam | 180 min | Multiple choice (60 min, 10 questions) · Free response (120 min, 3 questions) · 6 source documents |
| [AP Seminar](https://apstudyhub.vercel.app/course/ap-seminar/exam) | AP Seminar EOC Practice | 120 min | Part A: Source analysis (30 min) · Part B: Constructing an argument (90 min) · 5 source documents |

### Sources, checked by a person

45 outbound resource links across the seven courses, and a directory of 7 verified
YouTube channels — Heimler’s History, Bozeman Science, Coach Hall Writes, The Organic
Chemistry Tutor, Khan Academy, Tom Richey, and the College Board’s own AP channel —
each with a date recording when it was last opened. Video lectures are linked as
**channels, not video IDs**, because a channel handle survives a creator reorganising
their playlists and a video ID does not.

## 03 — 2026 exam calendar

Dates as published by the College Board for the May 2026 administration, as they are
held in [`src/lib/subjects.ts`](src/lib/subjects.ts). Confirm your own schedule with
your AP coordinator — late-testing windows differ by school.

| Course | Date 2026 | Start (local) |
| :----- | :-------- | :------------ |
| [AP Research](https://apstudyhub.vercel.app/course/ap-research) | Thursday, 30 April | Digital portfolio deadline — no sit-down exam |
| [AP Government and Politics](https://apstudyhub.vercel.app/course/ap-gov) | Tuesday, 5 May | 12:00 p.m. |
| [AP Seminar](https://apstudyhub.vercel.app/course/ap-seminar) | Thursday, 7 May | 12:00 p.m. |
| [AP United States History](https://apstudyhub.vercel.app/course/apush) | Saturday, 9 May | 8:00 a.m. |
| [AP Biology](https://apstudyhub.vercel.app/course/ap-bio) | Tuesday, 12 May | 8:00 a.m. |
| [AP Calculus AB and BC](https://apstudyhub.vercel.app/course/ap-calc) | Wednesday, 13 May | 8:00 a.m. |
| [AP English Language and Composition](https://apstudyhub.vercel.app/course/ap-lang) | Thursday, 14 May | 8:00 a.m. |

While an exam is still ahead, the home page shows a live countdown to the soonest one,
and every course page shows a countdown to its own — the day count is rendered on the
server, and the hours, minutes and seconds come alive after the page loads. Once the
season is over the blocks simply stop appearing.

## 04 — The study guides

[`/guides`](https://apstudyhub.vercel.app/guides) is the part of the site that is not
about any one course — study method that survives contact with a real AP exam.

1. **How to revise.** Space it out, even badly; test, do not review; do full questions,
   not fragments; mark your own work honestly; track what you get wrong, not what you
   cover.
2. **Reading a stimulus.** Read the question before the passage; annotate for
   structure, not for beauty; name the move, not the device; attribute before you use.
3. **The last fortnight.** A day-by-day plan: 14 days out sit a full timed paper; 10
   days out work only the three weakest units; 7 days out write one essay of each type
   under time; 3 days out cards and fixed lists; 1 day out read gently, then sleep.
4. **Exam day.** Answer every multiple-choice question (there is no penalty); spend
   the first minutes planning, not writing; write the thesis you can defend; if you
   run out of time, outline — a structured outline can still pick up evidence credit.
5. **What a score is actually worth.** The 1–5 bands, with what each one means on the
   College Board’s scale and what it actually gets you — credit versus placement, and
   where selective schools draw the line.

## 05 — Why this exists

Halfway through junior year I had eleven tabs open and none of them were useful. One
site wanted nine dollars a month. One wanted an account before it would show me a
single flashcard. The free ones were mostly other people’s Quizlet sets with the
answers wrong, and the good YouTube explanations were buried four rows down in a
recommendation feed that would rather show me something else.

So I started keeping my own notes properly, and at some point it was obvious they
would be more useful in public than in a Google Doc. The rule I gave myself is that
nothing goes up unless I would have used it myself the week before an exam. That is
why there are seven courses and not thirty — I have only sat seven.

My name is **Yeisbel Pena**. I am a student, not a teacher, not a tutoring company,
and not a content agency. Every note, card and practice question on this site was
written by me, for exams I have sat or am sitting. That is the main thing worth
knowing about it, in both directions: the notes are written from the position of
someone who was recently confused by the same material, and there is no department of
fact-checkers behind them. Where I am not confident about something, the page says so.

The content follows four rules, applied to everything:

1. **Nothing goes up that I would not have used myself.** Filler that exists to make a
   unit look complete does not pass, which is why some units are short.
2. **Framework first, then everything else.** Units follow the College Board course
   and exam description in its order. Where the framework names a required document,
   case or practice, it is flagged rather than paraphrased away.
3. **Practice questions are original.** None are reproduced from secure exam material.
   They are written to sit in the same difficulty band, with distractors drawn from
   the mistakes people actually make.
4. **Every outbound link is opened before it is listed.** Links carry the date they
   were last checked.

## 06 — What this site is not

- Not affiliated with the College Board, and not reviewed by them.
- Not a source of real, unreleased exam questions. Everything here is written from
  scratch; released College Board material is linked, never reproduced.
- Not a replacement for your teacher, your textbook, or AP Classroom.
- Not tracking you. No analytics, no cookies, no third-party scripts.
- Not finished. Coverage is uneven — the counts on each course tell you exactly how
  uneven.

## 07 — Questions people actually ask

**Do I need an account to use AP Study Hub?**
No. There is no sign-up, no email capture and no paywall. Nothing on the site is
gated, and no page requires JavaScript to read.

**Is AP Study Hub affiliated with the College Board?**
No. It is an independent site written by a student. AP and Advanced Placement are
registered trademarks of the College Board, which has not reviewed or endorsed
anything here.

**Are these real AP exam questions?**
No. Every practice question is written from scratch in the style and difficulty band
of the real exam. Released College Board questions are linked to on each course’s
resources page rather than reproduced.

**Which AP courses are covered?**
Seven: AP United States History, AP English Language and Composition, AP Seminar,
AP United States Government and Politics, AP Biology, AP Calculus AB/BC, and AP
Research.

## 08 — How it is built

Design decisions are written up on
[`/colophon`](https://apstudyhub.vercel.app/colophon); accessibility conformance and
the known defects are on [`/accessibility`](https://apstudyhub.vercel.app/accessibility).
The short version:

- **Static.** Every content page is generated at build time. The only dynamic route is
  `/api/search`. There is no database, no CMS and no runtime data fetching — the
  content is TypeScript modules, so the type checker catches a malformed unit at
  build time rather than at read time.
- **Reads with JavaScript off.** The notes, essays, practice questions and the search
  results page are all server-rendered HTML. Only the card deck, the countdown and the
  header combobox need the client — and the search form still posts to
  [`/search`](https://apstudyhub.vercel.app/search) with `method="get"` if you never
  load a script at all.
- **Search without a search engine.** A hand-rolled, scored index over 646 documents
  (the seven courses, all units, key terms, cards, questions, essays and tips). Every
  term in the query has to appear somewhere; titles weigh more than bodies; each
  document kind has its own weight; and one result per title keeps “Federalism” from
  filling the list five times. The header combobox debounces 180 ms and calls
  `/api/search`; the results page is the no-JavaScript fallback.
- **No UI library.** 14 hand-written components, no component kit, no icon package.
  Every glyph is hand-drawn SVG on a 32-unit grid, and every control is a native
  element.
- **Three self-hosted typefaces.** Newsreader for long-form text, Public Sans for the
  interface, JetBrains Mono anywhere digits need to line up — latin-subset variable
  WOFF2, about 192 KB total across four files, cached immutable. Nothing is requested
  from a font CDN. Licences are in `public/fonts/`.
- **Day / Night / System theme.** A three-way control, applied by an inline script
  before first paint so there is no flash of the wrong theme, remembered per browser.
- **Exactly three `localStorage` keys**, all of them the reader’s own study state:
  `aps.theme` (theme choice), `aps.cards.{course}` (which cards you marked as missed),
  `aps.exam.{course}.{paper}` (in-progress timed-paper answers and drafts). Every key
  is listed and explained on [`/privacy`](https://apstudyhub.vercel.app/privacy).
  Nothing else is stored. Nothing is sent anywhere.
- **Accessibility as a budget line.** The target is WCAG 2.2 AA: body text sits at
  roughly 16:1, every subject colour was measured at the size it is actually used in
  both themes, the study tools are fully keyboard-operable (see the key table in
  section 02), feedback lands in `aria-live` regions, and everything animates only
  when `prefers-reduced-motion` says it may. The conformance claims and the known
  problems that have not been fixed yet are written down on
  [`/accessibility`](https://apstudyhub.vercel.app/accessibility).
- **Built to be found.** Per-page metadata with whole-sentence descriptions (never
  cut mid-sentence), canonical URLs, a sitemap whose `lastModified` dates are the
  dates the *content* was last worked on — not the build time — `robots.txt`, a web
  manifest, generated Open Graph images, and JSON-LD structured data (Organization,
  WebSite, Course, BreadcrumbList and FAQPage).
- **Security headers on every response.** A deliberately tight Content-Security-Policy
  — this site loads nothing from anywhere, and the only external frame it will ever
  allow is `youtube-nocookie.com` — plus HSTS with preload, `nosniff`,
  `X-Frame-Options: SAMEORIGIN`, a strict referrer policy, and a
  `Permissions-Policy` that turns off camera, microphone, geolocation and
  `interest-cohort`. The server signature is removed.
- **No dead links to the past.** The old build served every study mode from one long
  page with fragment links; those URLs are still in people’s histories, so
  `/course/:slug/flashcards` → `/cards`, `/mock-exam` → `/exam`,
  `/study-guides` → `/notes` and `/courses` → the catalogue, all permanent redirects.

## 09 — Running it locally

Requires **Node 20.9+** and **pnpm** (10.x — the repo pins `pnpm@10.29.1`).

```bash
pnpm install              # installs exactly what pnpm-lock.yaml says
pnpm dev                  # dev server on http://localhost:3000

pnpm typecheck            # tsc --noEmit
pnpm lint                 # eslint
pnpm build                # production build (this is what ships to Vercel)
pnpm check                # all three, in that order — run this before opening a PR
```

There is no database to start, no CMS to configure and no environment file to create.
`NEXT_PUBLIC_SITE_URL` is the only variable the app reads, and it only affects
canonical URLs and the sitemap; without it the production domain is assumed (Vercel
preview deployments are picked up automatically from
`NEXT_PUBLIC_VERCEL_URL`).

## 10 — How the repo is laid out

<details>
<summary>Open the file map</summary>

<br />

```text
assets/readme/              the two banners above, and the script that draws them
public/fonts/               four self-hosted variable WOFF2 files + their licences
src/
  app/
    layout.tsx              root shell: metadata, fonts, theme script, header, footer, JSON-LD
    page.tsx                home
    globals.css             design tokens, @font-face, component classes
    error.tsx               the in-app error page
    not-found.tsx           the 404 page
    course/[slug]/          one course: one shell, six study modes under it
      layout.tsx              header plate, exam countdown, tab strip, course JSON-LD
      page.tsx                overview
      notes/                  unit notes, server-rendered
      cards/                  flashcard deck
      practice/               multiple-choice sets
      essays/                 sample responses with the rubric alongside
      exam/                   timed paper
      resources/              checked links
    search/                 server-rendered results (works with JavaScript off)
    guides/                 study method, the last fortnight, exam day, credit bands
    about/                  who writes it, how, and where it is thin
    colophon/               the design decisions, written down
    privacy/                the three localStorage keys, named
    accessibility/          WCAG conformance, keyboard map, known defects
    api/search/route.ts     JSON endpoint for the header combobox
    sitemap.ts              content-dated sitemap
    robots.ts manifest.ts icon.tsx apple-icon.tsx opengraph-image.tsx
  components/               14 components, all hand-written, no UI library
    CardDeck.tsx Countdown.tsx CourseTabs.tsx EssayReader.tsx Furniture.tsx
    MobileNav.tsx PracticeSet.tsx SiteFooter.tsx SiteHeader.tsx SiteSearch.tsx
    SubjectMark.tsx ThemeControl.tsx TimedPaper.tsx UnitNav.tsx
  lib/
    data.ts                 all course content (units, cards, questions, essays, tips, resources, papers)
    catalog.ts              joins content to subjects, computes every count on the site
    subjects.ts             the seven courses: spine code, colours, exam date, revised date
    search.ts               the scored index and its ranking rules
    channels.ts             the seven YouTube channels, each with a date it was checked
    clock.ts                exam-instant arithmetic for the countdowns
    use-stored-state.ts     localStorage through useSyncExternalStore
    markdown.tsx            the small subset of Markdown the notes use
    schema.tsx              JSON-LD builders
    site.ts                 origin, names, dates, the content revision
```

</details>

## 11 — Adding content and fixing errors

Everything a reader can see lives in `src/lib/data.ts`, keyed by course slug
(`apush`, `ap-lang`, `ap-seminar`, `ap-gov`, `ap-bio`, `ap-calc`, `ap-research`).
The shapes it must satisfy are the interfaces in `src/lib/catalog.ts`, so the type
checker will stop you shipping a card with no back or a question with no answer.

When you touch a course’s content:

1. **Bump its `revised` date** in `src/lib/subjects.ts`. That date is shown on the
   course page and is the `lastModified` the sitemap reports for it — bump it when
   the content actually moved, not on every deploy.
2. **If the change is material, bump `contentRevision`** in `src/lib/site.ts`. It is
   shown in the footer and is how readers can tell the content set changed.
3. **Any new outbound link gets a checked date** — open it, then record when you
   opened it. This is a rule, not a suggestion; the whole trust model of the site
   rests on it.
4. **Never hard-code a count.** The numbers on the home page, the about page and this
   README’s catalogue table all derive from the content at build time, so adding a
   card updates the totals everywhere.

If you find something wrong, the fastest path is still
[an issue](https://github.com/Nikoxkx/Ap-Study-Hub/issues) with the page address and
what is wrong with it — corrections are the most useful contribution, because the
notes compress a lot and some of it will be wrong.

## 12 — Contributing

Corrections first, additions second. The most valuable pull request in this repo is
one that fixes a fact; the second most valuable is one that adds content in the
existing shape (see section 11). Before opening anything, run `pnpm check` and let it
pass.

- Code changes should keep the constraints in section 08: static pages, no UI
  library, native controls, no new runtime dependency for things the type system can
  do.
- Content changes should keep the voice: what a person who just sat the exam would
  have written, not what a course catalogue would write.

## Licence

Code is **MIT**. Course content is © the author, and the bundled typefaces are under
the **SIL Open Font License 1.1** (licence text in `public/fonts/`).

---

<div align="center">
  <sub>
    AP Study Hub · Independent · Est. 2025 · Not affiliated with or endorsed by the College Board<br />
    AP and Advanced Placement are registered trademarks of the College Board.
  </sub>
</div>
