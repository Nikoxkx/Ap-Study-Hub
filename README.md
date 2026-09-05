# AP Study Hub

Unit notes, index cards, marked sample essays and timed practice papers for seven
Advanced Placement courses. No account, no paywall, no tracking.

Live at **https://apstudyhub.vercel.app**

Not affiliated with the College Board. AP and Advanced Placement are their
registered trademarks; nothing here has been reviewed or endorsed by them.

---

## What is in it

| Course | Units | Cards | Questions | Marked essays | Timed paper |
| --- | --- | --- | --- | --- | --- |
| AP US History | yes | yes | yes | yes | yes |
| AP English Language | yes | yes | yes | yes | yes |
| AP Seminar | yes | yes | yes | yes | yes |
| AP Research | yes | yes | yes | yes | yes |
| AP US Government | yes | yes | yes | — | — |
| AP Biology | yes | yes | yes | — | — |
| AP Calculus AB | yes | yes | yes | — | — |

Coverage is deliberately uneven and the site says so on every page it affects —
routes and navigation tabs for content that does not exist are not rendered at
all, rather than leading to an empty page. The live counts are generated from
the content itself and shown on `/about`.

## Running it

Requires Node 20.9+ and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Other scripts:

```bash
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint
pnpm build        # production build
pnpm check        # all three, in that order
```

There is no database, no CMS and no environment file to create. `NEXT_PUBLIC_SITE_URL`
is the only variable the app reads, and it only affects canonical URLs and the
sitemap; without it the production domain is assumed.

## How it is laid out

```
src/
  app/
    layout.tsx              root shell: metadata, fonts, header, footer, JSON-LD
    page.tsx                home
    globals.css             design tokens, @font-face, component classes
    course/[slug]/          one course, seven child routes
      layout.tsx              course shell: breadcrumbs, countdown, tabs
      page.tsx                overview
      notes/                  unit notes, server-rendered
      cards/                  flashcard deck
      practice/               multiple-choice sets
      essays/                 sample responses with the rubric alongside
      exam/                   timed paper
      resources/              checked links
    search/                 server-rendered results (works with JS off)
    guides/ about/ colophon/ privacy/ accessibility/
    api/search/route.ts     JSON endpoint for the header combobox
    sitemap.ts robots.ts manifest.ts icon.tsx apple-icon.tsx opengraph-image.tsx
  components/               14 components, all hand-written, no UI library
  lib/
    data.ts                 all course content
    catalog.ts              joins content to subjects, computes counts
    subjects.ts             the seven courses: colour, exam date, metadata
    search.ts               scored index over the content
    channels.ts             YouTube channels, each with a date it was checked
    markdown.tsx            the small subset of Markdown the notes use
    schema.tsx              JSON-LD builders
    site.ts                 origin, names, dates
public/fonts/               four self-hosted variable WOFF2 files + licences
```

## Notes on the build

- **Static.** Every content page is generated at build time. The only dynamic
  route is `/api/search`.
- **No UI library.** No component kit, no icon package. Every glyph is
  hand-drawn SVG on a 32-unit grid; every control is a native element.
- **Three self-hosted typefaces.** Newsreader, Public Sans and JetBrains Mono,
  latin-subset variable WOFF2, about 192 KB total. Nothing is requested from a
  font CDN. Licences are in `public/fonts/`.
- **No client-side data fetching.** Content is imported as TypeScript modules,
  so it is type-checked and it ships in the HTML.
- **Three localStorage keys**, all of them the reader's own study state. They
  are listed and explained on `/privacy`.
- Design decisions are written down in `/colophon`; accessibility conformance
  and known defects are in `/accessibility`.

## Contributing

Corrections are the most useful contribution — the notes compress a lot and
some of it will be wrong. Open an issue with the page address and what is
wrong with it, and it gets fixed and the content revision in the footer gets
bumped.

If you want to add content, keep the existing shape: everything lives in
`src/lib/data.ts`, keyed by course slug, and anything with a URL needs a date
recording when a human last opened it.

## Licence

Code is MIT. Course content is © the author, and the bundled typefaces are under
the SIL Open Font License 1.1 (licence text in `public/fonts/`).
