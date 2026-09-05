/**
 * Generates the two README banners (light and dark) from one description of the
 * composition, so the two never drift apart.
 *
 *   node assets/readme/build-banners.mjs
 *
 * No dependencies. Output: banner-light.svg, banner-dark.svg.
 *
 * Why SVG rather than a screenshot: it stays sharp at any container width, it
 * is 4 KB instead of 400 KB, and it can be recoloured from this file when the
 * palette changes. The subject colours and glyph paths are copied from
 * src/lib/subjects.ts and src/components/SubjectMark.tsx — keep them in step.
 *
 * Displayed at roughly 0.7 scale inside a GitHub README, so every size below is
 * set larger than it looks: a 13px label arrives on screen at about 9px.
 */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const outDir = dirname(fileURLToPath(import.meta.url));

const W = 1200;
const H = 360;

/* ── Type ─────────────────────────────────────────────────────────────────── */

const SERIF = "Georgia, 'Iowan Old Style', 'Times New Roman', Times, serif";
const MONO =
  "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

/* ── Palette ─────────────────────────────────────────────────────────────── */

const theme = {
  light: {
    paper: "#f6f3ec",
    rule: "#ddd6c6",
    ruleStrong: "#c3baa5",
    ink: "#1c1b17",
    inkSoft: "#57534a",
    inkFaint: "#7e786c",
    mark: "#b0392a",
    ruledOpacity: 0.55,
    book: "wash",
    bookInk: "ink",
    codeOpacity: 0.9,
  },
  dark: {
    paper: "#141412",
    rule: "#302e28",
    ruleStrong: "#454138",
    ink: "#ece7dc",
    inkSoft: "#a8a193",
    inkFaint: "#837c6f",
    mark: "#e08a78",
    ruledOpacity: 0.5,
    book: "washDark",
    bookInk: "lit",
    codeOpacity: 0.85,
  },
};

/* ── Subjects ─────────────────────────────────────────────────────────────── */

/**
 * `height` is the only invented number: the spines are drawn as a shelf of
 * books of slightly different heights so the row reads as objects rather than
 * as a grid of equal boxes. Everything else is real data.
 */
const subjects = [
  { code: "USH", ink: "#9c3b2e", lit: "#e59283", wash: "#f3e6e2", washDark: "#2a1a17", height: 132, glyph: "flag" },
  { code: "LNG", ink: "#31456b", lit: "#93aada", wash: "#e3e7f0", washDark: "#171c29", height: 116, glyph: "nib" },
  { code: "SEM", ink: "#6b3f6e", lit: "#c79aca", wash: "#eee4ef", washDark: "#241a26", height: 126, glyph: "lenses" },
  { code: "GOV", ink: "#2f5f56", lit: "#79bdb0", wash: "#e0ebe8", washDark: "#13221f", height: 112, glyph: "portico" },
  { code: "BIO", ink: "#4f6b32", lit: "#a9c67e", wash: "#e7ecdf", washDark: "#1c2416", height: 130, glyph: "helix" },
  { code: "CAL", ink: "#9a6520", lit: "#e0ad64", wash: "#f3e9d9", washDark: "#2a2012", height: 108, glyph: "curve" },
  { code: "RES", ink: "#57534a", lit: "#bdb5a7", wash: "#eae7e0", washDark: "#211f1c", height: 122, glyph: "scope" },
];

/**
 * The hand-drawn course marks, on the same 32×32 grid as the components.
 * `frame` strokes at 2.4, `line` details at 1.4 and half opacity, `fill` solid.
 */
const glyphs = {
  flag: `
    <rect x="4" y="6" width="24" height="20" rx="1" class="frame" />
    <path d="M4 11h24M4 16h24M4 21h24" class="line" />
    <rect x="4" y="6" width="11" height="10" class="fill" />`,
  nib: `
    <path d="M9 26 L20 7a3 3 0 0 1 5 3L14 29z" class="frame" />
    <path d="M11.5 22.5H22" class="line" />
    <circle cx="12" cy="26" r="1.6" class="fill" />`,
  lenses: `
    <circle cx="12" cy="13" r="7.5" class="frame" />
    <circle cx="20" cy="13" r="7.5" class="frame" />
    <circle cx="16" cy="20" r="7.5" class="frame" />
    <circle cx="16" cy="15.5" r="2" class="fill" />`,
  portico: `
    <path d="M3 12 L16 5 L29 12" class="frame" />
    <path d="M7 12v12M13 12v12M19 12v12M25 12v12" class="line" />
    <path d="M4 24h24M2 28h28" class="frame" />`,
  helix: `
    <path d="M11 4c0 7 10 9 10 12s-10 5-10 12" class="frame" />
    <path d="M21 4c0 7-10 9-10 12s10 5 10 12" class="frame" />
    <path d="M12.5 9h7M11 16h10M12.5 23h7" class="line" />`,
  curve: `
    <path d="M5 27V5M5 27h22" class="frame" />
    <path d="M5 24C11 24 13 8 27 8" class="frame" />
    <path d="M10 27v-6M15 27V16M20 27V11" class="line" />`,
  scope: `
    <circle cx="16" cy="16" r="10" class="frame" />
    <path d="M16 2v6M16 24v6M2 16h6M24 16h6" class="line" />
    <circle cx="16" cy="16" r="3" class="fill" />`,
};

/* ── Composition ──────────────────────────────────────────────────────────── */

const PAD = 64;
const SHELF_X = 760; // left edge of the first spine
const SHELF_RIGHT = 1128; // right edge of the last spine
const SHELF_Y = 296; // the shelf line the books stand on
const SPINE_W = 44;
const SPINE_GAP = 10;
const GLYPH_SIZE = 26;
const DIVIDER_X = 716;

function spine(subject, index, t) {
  const x = SHELF_X + index * (SPINE_W + SPINE_GAP);
  const top = SHELF_Y - subject.height;
  const cx = x + SPINE_W / 2;
  const scale = GLYPH_SIZE / 32;
  const glyphX = cx - GLYPH_SIZE / 2;
  const glyphY = top + 17;

  return `
    <g>
      <rect x="${x}" y="${top}" width="${SPINE_W}" height="${subject.height}" rx="2"
            fill="${subject[t.book]}" stroke="${subject[t.bookInk]}" stroke-width="1.5" />
      <rect x="${x}" y="${SHELF_Y - 21}" width="${SPINE_W}" height="3"
            fill="${subject[t.bookInk]}" opacity="0.45" />
      <g transform="translate(${glyphX} ${glyphY}) scale(${scale})"
         fill="none" stroke="${subject[t.bookInk]}" stroke-width="2.4"
         stroke-linecap="square" stroke-linejoin="miter">
        ${glyphs[subject.glyph].replace(/class="fill"/g, `class="fill" fill="${subject[t.bookInk]}" stroke="none"`)}
      </g>
      <text x="${cx}" y="${top + 60}" text-anchor="middle" font-family="${MONO}"
            font-size="13" letter-spacing="1.2" fill="${subject[t.bookInk]}"
            opacity="${t.codeOpacity}">${subject.code}</text>
    </g>`;
}

function banner(mode) {
  const t = theme[mode];
  const alt =
    "AP Study Hub — unit notes, index cards, marked essays and timed practice for seven AP courses";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${alt}">
  <title>AP Study Hub</title>
  <defs>
    <pattern id="ruled" width="8" height="24" patternUnits="userSpaceOnUse">
      <path d="M0 23.5H8" stroke="${t.rule}" stroke-width="1" opacity="${t.ruledOpacity}" />
    </pattern>
    <style>
      .frame { stroke-width: 2.4; }
      .line  { stroke-width: 1.4; opacity: 0.55; }
    </style>
  </defs>

  <rect width="${W}" height="${H}" fill="${t.paper}" />
  <rect width="${W}" height="${H}" fill="url(#ruled)" />
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="${t.rule}" />

  <!-- eyebrow -->
  <text x="${PAD}" y="86" font-family="${MONO}" font-size="14" letter-spacing="1.9"
        fill="${t.inkFaint}">INDEPENDENT · EST. 2025 · SEVEN COURSES</text>

  <!-- title -->
  <text x="${PAD}" y="162" font-family="${SERIF}" font-size="74" letter-spacing="-1.6"
        fill="${t.ink}">AP Study Hub</text>
  <rect x="${PAD + 2}" y="184" width="78" height="4" fill="${t.mark}" />

  <!-- lede -->
  <text x="${PAD}" y="234" font-family="${SERIF}" font-size="24" fill="${t.inkSoft}">Unit notes, index cards, marked essays and</text>
  <text x="${PAD}" y="266" font-family="${SERIF}" font-size="24" fill="${t.inkSoft}">timed practice for seven AP courses.</text>

  <!-- footer line -->
  <text x="${PAD}" y="318" font-family="${MONO}" font-size="13" letter-spacing="1.6"
        fill="${t.inkFaint}">NO ACCOUNT · NO PAYWALL · NO TRACKING</text>

  <!-- column rule -->
  <path d="M${DIVIDER_X} 70V318" stroke="${t.rule}" stroke-width="1" />

  <!-- the shelf -->
  <path d="M${SHELF_X - 14} ${SHELF_Y + 0.75}H${SHELF_RIGHT + 14}"
        stroke="${t.ruleStrong}" stroke-width="1.5" />
  ${subjects.map((s, i) => spine(s, i, t)).join("\n  ")}
</svg>
`;
}

for (const mode of ["light", "dark"]) {
  const file = join(outDir, `banner-${mode}.svg`);
  writeFileSync(file, banner(mode), "utf8");
  console.log(`wrote ${file}`);
}
