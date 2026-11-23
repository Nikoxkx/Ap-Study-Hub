/**
 * Regenerate the 1200×630 link preview (`public/og-image.png` and
 * `public/social-preview.png`) — the picture every chat app, social post, and
 * search result shows when someone pastes an AP Study Hub link.
 *
 * The card is built around the product, not around a screenshot of it: a sheet
 * of the same light-blue graph paper the math scratchpads use (16px squares, a
 * red margin rule, clean unprinted edges) sits on the classroom wallpaper,
 * carrying the headline and a short worked example in handwriting. The ten
 * course symbols sit beside it so the breadth of the catalogue is legible at
 * 300px wide, which is roughly how big a preview appears in a Slack channel.
 *
 * Every number printed here comes from the same content the site renders, so
 * the card cannot quietly drift out of date. Regenerate with:
 *
 *     pnpm build:social
 *
 * Fonts: `assets/social/fonts/*.ttf` are static instances of the OFL faces the
 * site already self-hosts (`public/fonts/*.woff2`), instanced because resvg
 * reads TrueType but not WOFF2. Kalam ships as a TrueType original. See
 * `assets/social/fonts/README.md`.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import { getTotals } from "../src/lib/catalog";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 630;

/* --------------------------------------------------------------------------
   Copy — measured from the catalogue so the pill "75 lessons" is never a lie.
   -------------------------------------------------------------------------- */

const totals = getTotals();
const number = (n: number) => n.toLocaleString("en-US");

const courses = [
  { slug: "apush", label: "APUSH" },
  { slug: "ap-lang", label: "AP Lang" },
  { slug: "ap-lit", label: "AP Lit" },
  { slug: "ap-seminar", label: "AP Seminar" },
  { slug: "ap-gov", label: "AP Gov" },
  { slug: "ap-bio", label: "AP Bio" },
  { slug: "ap-calc", label: "AP Calc" },
  { slug: "ap-research", label: "AP Research" },
  { slug: "ap-macro", label: "AP Macro" },
  { slug: "ap-env", label: "APES" },
].map((course) => ({
  ...course,
  iconB64: readFileSync(join(root, `public/icons/courses/${course.slug}-dark.png`)).toString("base64"),
}));

/* --------------------------------------------------------------------------
   Assets + fonts
   -------------------------------------------------------------------------- */

const fontDir = join(root, "assets/social/fonts");
const fontFiles = [
  join(fontDir, "Newsreader-Bold.ttf"),
  join(fontDir, "PublicSans-Regular.ttf"),
  join(fontDir, "PublicSans-SemiBold.ttf"),
  join(fontDir, "JetBrainsMono-Bold.ttf"),
  join(root, "assets/social/Kalam-Regular.ttf"),
];
const missingFonts = fontFiles.filter((file) => !existsSync(file));
if (missingFonts.length > 0) {
  throw new Error(
    `Missing font files for the social card:\n  ${missingFonts.join("\n  ")}\nSee assets/social/fonts/README.md.`,
  );
}

const bgB64 = readFileSync(join(root, "public/bg-music-class.jpg")).toString("base64");

const SERIF = "'Newsreader'";
const SANS = "'Public Sans'";
const MONO = "'JetBrains Mono'";
const HAND = "'Kalam'";

/* --------------------------------------------------------------------------
   Marks
   -------------------------------------------------------------------------- */

/** The 45°-rotated seven-square mark, in one fill colour. */
function rotatedSevenSquareLogo(cx: number, cy: number, scale: number, fill: string) {
  const cells: [number, number][] = [
    [0, 0],
    [32, 0],
    [64, 0],
    [64, 32],
    [32, 32],
    [32, 64],
    [0, 64],
  ];
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale}) rotate(45)">
      <g transform="translate(-48 -48)">
        ${cells
          .map(([x, y]) => `<rect x="${x + 2}" y="${y + 2}" width="28" height="28" rx="2" fill="${fill}" />`)
          .join("")}
      </g>
    </g>`;
}

/* --------------------------------------------------------------------------
   The paper sheet
   -------------------------------------------------------------------------- */

const PAPER = { x: 52, y: 46, w: 716, h: 538, tilt: -1.2 };
const GRID = 16;
const HEAD = 56;
const FOOT = 32;
const EDGE = 16;
const MARGIN_X = 92;

const ink = "#0f0f0f";
const inkSoft = "#39434f";
const rule = "#c6dcf0";
const marginRed = "#ee4152";

const paperContent = `
  <rect x="${PAPER.x}" y="${PAPER.y}" width="${PAPER.w}" height="${PAPER.h}" rx="5" fill="#ffffff" />

  <rect
    x="${PAPER.x + EDGE}" y="${PAPER.y + HEAD}"
    width="${PAPER.w - EDGE * 2}" height="${PAPER.h - HEAD - FOOT}"
    fill="url(#graph)" />

  <line
    x1="${PAPER.x + MARGIN_X}" y1="${PAPER.y}"
    x2="${PAPER.x + MARGIN_X}" y2="${PAPER.y + PAPER.h}"
    stroke="${marginRed}" stroke-width="2" />

  <text x="${PAPER.x + MARGIN_X + 20}" y="${PAPER.y + 52}" font-family="${MONO}" font-size="11.5"
    font-weight="700" letter-spacing="1.9" fill="#4d5866">AP STUDY HUB · FREE · NO ACCOUNT</text>

  <text x="${PAPER.x + MARGIN_X + 16}" y="${PAPER.y + 142}" font-family="${SERIF}" font-size="47"
    font-weight="700" letter-spacing="-0.7" fill="${ink}">Learn it deeply.</text>
  <text x="${PAPER.x + MARGIN_X + 16}" y="${PAPER.y + 200}" font-family="${SERIF}" font-size="47"
    font-weight="700" letter-spacing="-0.7" fill="${ink}">Remember it on exam day.</text>

  <text x="${PAPER.x + MARGIN_X + 16}" y="${PAPER.y + 274}" font-family="${SANS}" font-size="17"
    fill="${inkSoft}">${number(totals.units)} cited lessons · ${number(totals.paragraphs)} teaching paragraphs · ${number(totals.flashcards)} recall cards</text>
  <text x="${PAPER.x + MARGIN_X + 16}" y="${PAPER.y + 300}" font-family="${SANS}" font-size="17"
    fill="${inkSoft}">${number(totals.questions)} original practice items · marked essays &amp; FRQs · unit videos</text>

  <text x="${PAPER.x + MARGIN_X + 16}" y="${PAPER.y + 392}" font-family="${HAND}" font-size="26"
    fill="#26374a">2x² − 8 = 0</text>
  <text x="${PAPER.x + MARGIN_X + 16}" y="${PAPER.y + 424}" font-family="${HAND}" font-size="26"
    fill="#26374a">x² = 4</text>
  <text x="${PAPER.x + MARGIN_X + 16}" y="${PAPER.y + 456}" font-family="${HAND}" font-size="26"
    fill="#26374a">x = ±2</text>
  <path d="M${PAPER.x + MARGIN_X + 16} ${PAPER.y + 464} q 44 6 88 0" stroke="${marginRed}"
    stroke-width="2" fill="none" stroke-linecap="round" opacity="0.92" />
  <text x="${PAPER.x + MARGIN_X + 124}" y="${PAPER.y + 458}" font-family="${HAND}" font-size="20"
    fill="${marginRed}">both roots check out</text>

  <text x="${PAPER.x + MARGIN_X + 16}" y="${PAPER.y + 502}" font-family="${SANS}" font-size="15"
    fill="#5a6472">Every worked example, every rubric, on the same paper you would use in class.</text>
`;

/* --------------------------------------------------------------------------
   The right rail: wordmark + all ten course symbols
   -------------------------------------------------------------------------- */

const railX = 966;
const tileW = 156;
const tileH = 54;
const tileGapX = 14;
const tileGapY = 10;
const tilesX = railX - (tileW * 2 + tileGapX) / 2;
const tilesY = 226;

const tiles = courses
  .map((course, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = tilesX + col * (tileW + tileGapX);
    const y = tilesY + row * (tileH + tileGapY);
    return `
      <g transform="translate(${x} ${y})">
        <rect width="${tileW}" height="${tileH}" rx="10" fill="rgba(255,255,255,0.64)"
          stroke="rgba(255,255,255,0.92)" stroke-width="1.2" />
        <image href="data:image/png;base64,${course.iconB64}" x="13" y="12" width="30" height="30" />
        <text x="53" y="34" font-family="${SANS}" font-size="14" font-weight="600" fill="#101418"
          >${course.label}</text>
      </g>`;
  })
  .join("");

const rail = `
  ${rotatedSevenSquareLogo(railX, 96, 0.58, "#ffffff")}
  <text x="${railX}" y="172" text-anchor="middle" font-family="${SERIF}" font-size="31" font-weight="700"
    letter-spacing="-0.4" fill="#ffffff">AP Study Hub</text>
  <text x="${railX}" y="196" text-anchor="middle" font-family="${SANS}" font-size="13"
    fill="rgba(255,255,255,0.86)">ten AP courses · one quiet workspace</text>
  ${tiles}
  <text x="${railX}" y="570" text-anchor="middle" font-family="${MONO}" font-size="11"
    letter-spacing="0.8" fill="rgba(255,255,255,0.78)">ap-study-hub-five.vercel.app</text>
`;

/* --------------------------------------------------------------------------
   Compose
   -------------------------------------------------------------------------- */

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="graph" width="${GRID}" height="${GRID}" patternUnits="userSpaceOnUse">
      <path d="M0 0.5H${GRID}M0.5 0V${GRID}" stroke="${rule}" stroke-width="1" fill="none" />
    </pattern>
    <filter id="soften" x="-6%" y="-6%" width="112%" height="112%">
      <feGaussianBlur stdDeviation="3.5" />
    </filter>
    <filter id="sheet" x="-12%" y="-12%" width="130%" height="132%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#080a10" flood-opacity="0.32" />
    </filter>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0.35">
      <stop offset="0" stop-color="#14121a" stop-opacity="0.38" />
      <stop offset="0.52" stop-color="#14121a" stop-opacity="0.26" />
      <stop offset="1" stop-color="#14121a" stop-opacity="0.50" />
    </linearGradient>
  </defs>

  <image href="data:image/jpeg;base64,${bgB64}" x="0" y="0" width="${W}" height="${H}"
    preserveAspectRatio="xMidYMid slice" filter="url(#soften)" />
  <rect width="${W}" height="${H}" fill="url(#scrim)" />

  ${rail}

  <g filter="url(#sheet)" transform="rotate(${PAPER.tilt} ${PAPER.x + PAPER.w / 2} ${PAPER.y + PAPER.h / 2})">
    ${paperContent}
  </g>
</svg>
`;

writeFileSync(join(root, "assets/social/og-image.svg"), svg, "utf8");

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: W },
  font: {
    fontFiles,
    loadSystemFonts: false,
    defaultFontFamily: "Public Sans",
  },
});

const png = resvg.render().asPng();
writeFileSync(join(root, "public/og-image.png"), png);
writeFileSync(join(root, "public/social-preview.png"), png);
console.log(
  `Wrote 1200×630 card (${png.length.toLocaleString()} bytes) to public/og-image.png and public/social-preview.png`,
);
console.log(
  `  ${totals.units} lessons · ${totals.paragraphs} paragraphs · ${totals.flashcards} cards · ${totals.questions} questions · ${courses.length} course marks`,
);
