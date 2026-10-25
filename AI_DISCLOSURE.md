# AI Disclosure

> **Last updated:** 2026-10-25  
> **Live version:** [`/ai-disclosure`](https://ap-study-hub-five.vercel.app/ai-disclosure)

AP Study Hub is an open-source, student-built study workspace for seven Advanced Placement subjects. AI coding and writing assistants helped scaffold, draft, and refactor parts of this repository, while human authors chose the architecture, verified official curriculum alignment, checked every source link, and hold full responsibility for accuracy.

---

## 1. Tools Used

| Tool | Provider | How it was used |
| :--- | :--- | :--- |
| **v0.dev** | Vercel | Initial Next.js App Router scaffolding and early layout shells (hence the historic deployment hostname `v0-project-roan-six-20.vercel.app`). |
| **ChatGPT / GPT-4o** | OpenAI | Early drafts of study guides, flashcard phrasing, practice distractors, essay outlines, and documentation prose. |
| **Claude** | Anthropic | Long-form unit note drafting from public Course and Exam Descriptions (CEDs) and editorial tone review. |
| **Arena.ai Agent Mode** | Arena.ai | 2026–27 deep-lesson expansion (51 cited lessons, 510 paragraphs), verified unit-video integration, local-first study store & optional connectors, and the 2026–27 transparent glass + realistic college-ruled paper UI overhaul, navigation redesign, motion/loading components, and deterministic SVG/PNG generators. |
| **GitHub Copilot** | GitHub | Inline TypeScript completions across `CardDeck`, `PracticeSet`, `TimedPaper`, `SiteSearch`, and catalog helpers. |

---

## 2. Strictly Human-Crafted & Non-AI Visual Policy

- **Zero AI-generated icons or content illustrations:** All seven course symbols in `src/components/SubjectMark.tsx` (`public/icons/courses/*.png`: U.S. flag, open book, source documents, classical capitol, DNA double helix, right triangle trigonometry, magnifying glass) are monochrome transparent RGBA assets paired with the geometric 45°-rotated 7-square `Logo`, 9-box `BanterLoader`, and 3-circle bouncing `LoadingSpinner`.
- **Authentic typography & ruled paper:** The **AP Study Hub Method (2026–27)** breakdown (`src/components/StudySystemVisual.tsx`) and scratchpads (`src/components/ui/NotebookPaper.tsx`, `.scratch-paper`) use loose-leaf ruled paper (`#ffffff` stock, `#de7c7b` full-height margin rule, `#b8cee5` `32px` blue lines inset from the outer edges) paired with the open-source `Kalam` 300 handwriting typeface (`public/fonts/kalam-latin-300-normal.woff2`, SIL OFL 1.1) in `#30455a` ballpoint ink — never synthetic AI diagram images.
- **Deterministic repository banners & Open Graph cards:** `assets/readme/banner-light.svg`, `assets/readme/banner-dark.svg`, `public/og-image.png`, and `public/social-preview.png` are built deterministically from code via `assets/readme/build-banners.mjs` and `scripts/build-social-image.mjs`.
- **Environment wallpapers:** Full-page classroom and corridor background paintings (`public/bg-*.jpg`) are original artwork by illustrator Arseniy Chebynkin.

---

## 3. Code & Content Verification Pipeline

Every AI-assisted draft passes four deterministic checks in `corepack pnpm check` before shipping:

1. **`pnpm validate:content` (`scripts/validate-lessons.ts`)** — Verifies all 51 lessons, 510 cited paragraphs, learning objectives, worked examples, glossary cards, practice explanations, and dated official source IDs.
2. **`pnpm validate:study` (`scripts/validate-study.ts`)** — Verifies 645 shared study items, 729 KaTeX expressions, deterministic practice variants, scheduling, backups, plans, and calendar serializers.
3. **`pnpm validate:videos` (`scripts/validate-videos.ts`)** — Verifies all 66 curated 11-character YouTube video IDs, educator attributions, and unit mappings across all 7 courses.
4. **`pnpm validate:presentation` (`scripts/validate-presentation.mjs`)** — Enforces neutral `.dark` hex tokens, `.dark body { background-image: none; }`, monochrome `SubjectMark` accessibility labels, click-to-load `youtube-nocookie.com` privacy invariants, and `1200×630` PNG headers on `public/og-image.png` and `public/social-preview.png`.

---

## 4. Reporting Errors

If you spot a factual inaccuracy, broken link, citation mismatch, or accessibility bug, please [open an issue on GitHub](https://github.com/Nikoxkx/Ap-Study-Hub/issues) naming the course, unit, and section so it can be corrected promptly.
