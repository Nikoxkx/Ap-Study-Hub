import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, SectionHead } from "@/components/Furniture";
import { GlassCard } from "@/components/ui/GlassCard";
import { site, absoluteUrl, formatDate, socialImages } from "@/lib/site";
import { getTotals } from "@/lib/catalog";
import { unitVideos } from "@/lib/video-lessons";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Colophon · how the hub is built and checked",
  description:
    "How AP Study Hub is built: Next.js 16 static pages, self-hosted variable typefaces including Caveat handwriting, hue-free frosted glass surfaces, college-ruled notebook sheets, security headers, and zero tracking.",
  alternates: { canonical: "/colophon" },
  openGraph: {
    images: socialImages,
    title: "Colophon · AP Study Hub",
    description:
      "Stack, typography, glass & paper surface architecture, local-first storage, and security headers.",
    url: absoluteUrl("/colophon"),
  },
  twitter: { card: "summary_large_image", images: socialImages },
};

const spec: [string, string][] = [
  ["Framework", "Next.js 16 (App Router) on React 19, TypeScript 5 (`strict: true`)"],
  ["Rendering", "Static generation (`generateStaticParams`) for all 7 courses and sub-routes; one tiny edge-free search handler at `/api/search`"],
  ["Styling", "Tailwind CSS 4 + hand-authored design tokens in `src/app/globals.css` — hue-free `.glass-box` surfaces, neutral `.dark` charcoal palette, and `.realistic-paper` loose-leaf sheets"],
  ["Typefaces", "Newsreader (editorial display & lesson prose), Public Sans (UI & controls), JetBrains Mono (citations, timers, shortcuts), and Caveat (natural handwriting on 32px college-ruled paper) — all self-hosted WOFF2 under SIL OFL 1.1"],
  ["Iconography", "Universal 45°-rotated 7-square geometric `Logo`, 9-box `BanterLoader`, 3-circle bouncing `LoadingSpinner`, and 7 human-crafted monochrome 32-unit SVG `SubjectMark` course glyphs"],
  ["Motion", "60fps time-normalized exponential lerp viewport-edge scroll fade (`ScrollEffects`) + directional header hysteresis (`SiteHeaderShell`), automatically disabled under `prefers-reduced-motion: reduce`"],
  ["Persistence", "Browser `localStorage` only (`aps:*` keys) via `useSyncExternalStore` — zero accounts, zero cookies, zero third-party analytics"],
  ["Verification", "`pnpm check` runs `validate:content`, `validate:study`, `validate:presentation`, `validate:videos`, `tsc --noEmit`, `eslint .`, and `next build`"],
];

export default function ColophonPage() {
  const totals = getTotals();

  return (
    <div className="container-page py-10 sm:py-14">
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Colophon", href: "/colophon" },
        ])}
      />
      <Breadcrumbs
        trail={[
          { name: "Home", href: "/" },
          { name: "Colophon", href: "/colophon" },
        ]}
      />

      <div className="measure-wide">
        <p className="eyebrow">Colophon · revised {formatDate("2026-10-25")}</p>
        <h1
          className="mt-2 font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
          }}
        >
          How this site is put together.
        </h1>
        <p className="mt-4 text-base sm:text-lg" style={{ color: "var(--ink-soft)" }}>
          Every design and engineering choice here optimizes for quiet reading, fast static loads,
          honest citations, and zero tracking. The full source lives at{" "}
          <a href={site.repo} className="prose-link">
            {site.repo.replace("https://", "")}
          </a>{" "}
          under the MIT license.
        </p>
      </div>

      <section className="mt-12" aria-labelledby="spec-heading">
        <SectionHead
          folio="Technical sheet"
          title="The stack in eight lines"
          id="spec-heading"
        />
        <GlassCard className="mt-6 p-0 overflow-hidden">
          <dl>
            {spec.map(([k, v], i) => (
              <div
                key={k}
                className="grid gap-1 px-5 py-4 sm:grid-cols-12 sm:gap-6"
                style={{
                  borderTop: i === 0 ? "none" : "1px solid var(--rule)",
                }}
              >
                <dt
                  className="sm:col-span-3 text-sm font-semibold"
                  style={{ color: "var(--ink)" }}
                >
                  {k}
                </dt>
                <dd
                  className="sm:col-span-9 text-sm leading-relaxed"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </GlassCard>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-2" aria-labelledby="design-heading">
        <GlassCard className="p-6 sm:p-7">
          <p className="eyebrow">Surfaces &amp; paper</p>
          <h2
            id="design-heading"
            className="mt-1 text-xl font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Colorless glass over calm rooms, plus real ruled paper
          </h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            Each route group rests over a dedicated classroom or corridor painting
            (<code style={{ fontFamily: "var(--font-mono)" }}>PageBackground.tsx</code>) while dark
            mode switches cleanly to a flat neutral charcoal canvas (
            <code style={{ fontFamily: "var(--font-mono)" }}>#121212</code>) with zero background
            imagery. Content containers use hue-free translucent glass so text contrast stays crisp.
          </p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            Whenever you work through the <strong>Read → Recall → Respond</strong> method or write
            scratch notes during timed essays and mock exams, the workspace switches to realistic
            college-ruled loose-leaf paper (<code style={{ fontFamily: "var(--font-mono)" }}>.realistic-paper</code>)
            with a single pink margin line and 32px horizontal blue rules — with{" "}
            <code style={{ fontFamily: "var(--font-mono)" }}>Caveat</code> baselines locked directly
            onto the blue lines.
          </p>
        </GlassCard>

        <GlassCard className="p-6 sm:p-7">
          <p className="eyebrow">Content &amp; privacy</p>
          <h2
            className="mt-1 text-xl font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {totals.units} lessons · {totals.flashcards} cards · {totals.questions} questions · {unitVideos.length} videos
          </h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            Every count across the site is derived directly from{" "}
            <code style={{ fontFamily: "var(--font-mono)" }}>src/content/</code> at build time and
            checked by four automated validation scripts before any build passes.
          </p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            Unit video players render static thumbnails first and never load{" "}
            <code style={{ fontFamily: "var(--font-mono)" }}>youtube-nocookie.com</code> scripts or frames until you explicitly click to load
            an inline player. Strict <code style={{ fontFamily: "var(--font-mono)" }}>Content-Security-Policy</code> headers keep fonts (
            <code style={{ fontFamily: "var(--font-mono)" }}>font-src &apos;self&apos;</code>) and scripts same-origin. See{" "}
            <Link href="/ai-disclosure" className="prose-link">
              AI Disclosure
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="prose-link">
              Privacy
            </Link>{" "}
            for full details.
          </p>
        </GlassCard>
      </section>
    </div>
  );
}
