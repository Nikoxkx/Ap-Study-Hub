/**
 * Regenerate the 1200×630 Open Graph / social preview card (`public/og-image.png`
 * and `public/social-preview.png`) directly over the website's classroom wallpaper
 * (`public/bg-music-class.jpg`) with frosted-glass UI elements, the 45°-rotated
 * 7-square `Logo`, and all 7 white RGBA AP course symbols.
 *
 * Run: pnpm build:social
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 630;

const bgJpgB64 = readFileSync(join(root, "public/bg-music-class.jpg")).toString("base64");

const courses = [
  { slug: "apush", label: "APUSH", w: 112 },
  { slug: "ap-lang", label: "AP Lang", w: 122 },
  { slug: "ap-seminar", label: "AP Seminar", w: 146 },
  { slug: "ap-gov", label: "AP Gov", w: 116 },
  { slug: "ap-bio", label: "AP Bio", w: 112 },
  { slug: "ap-calc", label: "AP Calc", w: 118 },
  { slug: "ap-research", label: "AP Research", w: 150 },
  { slug: "ap-macro", label: "AP Macro", w: 122 },
  { slug: "ap-env", label: "APES", w: 92 },
].map((c) => ({
  ...c,
  iconB64: readFileSync(join(root, `public/icons/courses/${c.slug}-dark.png`)).toString("base64"),
}));

const dejavuDir = "/usr/share/fonts/truetype/dejavu";
const fontFiles = [
  "/tmp/banner-fonts/Newsreader.ttf",
  "/tmp/banner-fonts/PublicSans.ttf",
  "/tmp/banner-fonts/JetBrainsMono.ttf",
  join(dejavuDir, "DejaVuSerif.ttf"),
  join(dejavuDir, "DejaVuSerif-Bold.ttf"),
  join(dejavuDir, "DejaVuSans.ttf"),
  join(dejavuDir, "DejaVuSans-Bold.ttf"),
  join(dejavuDir, "DejaVuSansMono.ttf"),
  join(dejavuDir, "DejaVuSansMono-Bold.ttf"),
].filter(existsSync);

const hasGoogleFonts = existsSync("/tmp/banner-fonts/Newsreader.ttf");
const SERIF = hasGoogleFonts ? "'Newsreader', 'DejaVu Serif', serif" : "'DejaVu Serif', Georgia, serif";
const SANS = hasGoogleFonts ? "'Public Sans', 'DejaVu Sans', sans-serif" : "'DejaVu Sans', sans-serif";
const MONO = hasGoogleFonts ? "'JetBrains Mono', 'DejaVu Sans Mono', monospace" : "'DejaVu Sans Mono', monospace";

function rotatedSevenSquareLogo(cx, cy, scale, fill) {
  const cells = [
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
          .map(
            ([x, y]) =>
              `<rect x="${x + 2}" y="${y + 2}" width="28" height="28" rx="2" fill="${fill}" />`,
          )
          .join("")}
      </g>
    </g>`;
}

let pillX = 88;
const pillY = 486;
const coursePills = courses
  .map((c) => {
    const x = pillX;
    pillX += c.w + 8;
    return `
      <g transform="translate(${x} ${pillY})">
        <rect width="${c.w}" height="40" rx="20" fill="rgba(255, 255, 255, 0.70)" stroke="rgba(255,255,255,0.96)" stroke-width="1.2" />
        <image href="data:image/png;base64,${c.iconB64}" x="11" y="9" width="22" height="22" />
        <text x="39" y="25" font-family="${SANS}" font-size="13" font-weight="600" fill="#111111">${c.label}</text>
      </g>`;
  })
  .join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <filter id="frosted" x="-8%" y="-8%" width="116%" height="116%">
      <feGaussianBlur stdDeviation="6.5" />
    </filter>
    <filter id="card-shadow" x="-10%" y="-10%" width="125%" height="125%">
      <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#000000" flood-opacity="0.22" />
    </filter>
    <clipPath id="glass-regions">
      <rect x="52" y="34" width="218" height="44" rx="22" />
      <rect x="518" y="34" width="164" height="44" rx="22" />
      <rect x="954" y="34" width="138" height="44" rx="22" />
      <rect x="1104" y="34" width="44" height="44" rx="22" />
      <rect x="52" y="104" width="1096" height="482" rx="20" />
    </clipPath>
  </defs>

  <image href="data:image/jpeg;base64,${bgJpgB64}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice" />
  <rect width="${W}" height="${H}" fill="rgba(255, 255, 255, 0.04)" />

  <g clip-path="url(#glass-regions)">
    <image href="data:image/jpeg;base64,${bgJpgB64}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice" filter="url(#frosted)" />
  </g>

  <g filter="url(#card-shadow)">
    <rect x="52" y="34" width="218" height="44" rx="22" fill="rgba(226, 228, 232, 0.60)" stroke="rgba(255, 255, 255, 0.94)" stroke-width="1.3" />
    ${rotatedSevenSquareLogo(81, 56, 0.24, "#111111")}
    <text x="104" y="62" font-family="${SERIF}" font-size="19.5" font-weight="700" fill="#0f0f0f">AP Study Hub</text>

    <rect x="518" y="34" width="164" height="44" rx="22" fill="rgba(20, 20, 22, 0.62)" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" />
    <text x="593" y="61" text-anchor="middle" font-family="${SANS}" font-size="14" font-weight="600" fill="#ffffff">AP Courses</text>
    <text x="654" y="60" text-anchor="middle" font-family="${SANS}" font-size="11.5" fill="rgba(255,255,255,0.8)">▾</text>

    <rect x="954" y="34" width="138" height="44" rx="22" fill="rgba(20, 20, 22, 0.62)" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" />
    <text x="976" y="61" font-family="${SANS}" font-size="13" font-weight="600" fill="#ffffff">Jump to</text>
    <rect x="1038" y="43" width="38" height="26" rx="13" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.45)" stroke-width="1" />
    <text x="1057" y="60" text-anchor="middle" font-family="${MONO}" font-size="11" font-weight="700" fill="#ffffff">⌘K</text>

    <rect x="1104" y="34" width="44" height="44" rx="22" fill="rgba(20, 20, 22, 0.62)" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" />
    <line x1="1117" y1="49" x2="1135" y2="49" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" />
    <line x1="1117" y1="56" x2="1135" y2="56" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" />
    <line x1="1117" y1="63" x2="1135" y2="63" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" />

    <rect x="52" y="104" width="1096" height="482" rx="20" fill="rgba(226, 228, 232, 0.58)" stroke="rgba(255, 255, 255, 0.94)" stroke-width="1.4" />
  </g>

  <text x="88" y="162" font-family="${MONO}" font-size="12" font-weight="700" letter-spacing="1.6" fill="#454545">SEVEN AP COURSES  ·  FREE  ·  NO ACCOUNT  ·  LOCAL-FIRST</text>

  <text x="88" y="238" font-family="${SERIF}" font-size="62" font-weight="700" letter-spacing="-1.2" fill="#0f0f0f">Learn nine AP subjects</text>
  <text x="88" y="308" font-family="${SERIF}" font-size="62" font-weight="700" letter-spacing="-1.2" fill="#0f0f0f">deeply — with zero noise.</text>

  <text x="88" y="366" font-family="${SANS}" font-size="19" fill="#262626">66 cited lessons · 660 paragraphs · 525 recall cards · 429 practice questions · 82 unit videos</text>
  <text x="88" y="396" font-family="${SANS}" font-size="18" fill="#3a3a3a">Transparent workspace, white course symbols, full-screen video player, and loose-leaf scratchpads.</text>

  <line x1="88" y1="448" x2="1112" y2="448" stroke="rgba(255,255,255,0.82)" stroke-width="1" />

  ${coursePills}
</svg>\n`;

writeFileSync(join(root, "assets/social/og-image.svg"), svg, "utf8");

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: W },
  font: {
    fontFiles,
    defaultFontFamily: hasGoogleFonts ? "Public Sans" : "DejaVu Sans",
  },
});

const png = resvg.render().asPng();
writeFileSync(join(root, "public/og-image.png"), png);
writeFileSync(join(root, "public/social-preview.png"), png);
console.log(`Wrote 1200×630 PNG (${png.length.toLocaleString()} bytes) to public/og-image.png and public/social-preview.png`);
