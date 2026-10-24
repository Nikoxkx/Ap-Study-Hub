/**
 * Build the 2026–27 README artwork as dependency-free, resolution-independent SVG.
 * Run: node assets/readme/build-banners.mjs
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const outDir = dirname(fileURLToPath(import.meta.url));
const W = 1200;
const H = 420;
const SERIF = "Georgia, 'Iowan Old Style', 'Times New Roman', Times, serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";
const colors = ["#9c3b2e", "#31456b", "#6b3f6e", "#2f5f56", "#4f6b32", "#9a6520", "#57534a"];

const themes = {
  light: {
    paper: "#f6f3ec", raised: "#fffdf7", sunk: "#ece7db", rule: "#ddd6c6",
    strong: "#c3baa5", ink: "#1c1b17", soft: "#57534a", faint: "#7e786c", mark: "#b0392a",
  },
  dark: {
    paper: "#141412", raised: "#1d1c19", sunk: "#24221d", rule: "#302e28",
    strong: "#454138", ink: "#ece7dc", soft: "#a8a193", faint: "#837c6f", mark: "#e08a78",
  },
};

function studySheet(t) {
  return `
    <g transform="translate(735 48)">
      <rect x="22" y="24" width="370" height="292" fill="${t.sunk}" stroke="${t.strong}" transform="rotate(3 207 170)" />
      <rect width="370" height="292" fill="${t.raised}" stroke="${t.ink}" stroke-width="1.5" />
      <path d="M326 0h44v44" fill="${t.sunk}" stroke="${t.ink}" stroke-width="1.5" />
      <path d="M326 0v44h44" fill="none" stroke="${t.ink}" stroke-width="1.5" />
      ${colors.map((color, i) => `<rect x="${25 + i * 41}" y="-12" width="28" height="12" fill="${color}" />`).join("")}
      <text x="28" y="61" font-family="${MONO}" font-size="12" letter-spacing="1.6" fill="${t.mark}">READ → RECALL → RESPOND</text>
      <text x="28" y="102" font-family="${SERIF}" font-size="29" fill="${t.ink}">One connected study loop</text>
      ${[0, 1, 2, 3].map((i) => `<path d="M28 ${133 + i * 22}H${i % 2 ? 302 : 330}" stroke="${t.faint}" stroke-width="3" opacity="0.48" />`).join("")}
      <path d="M28 226H330" stroke="${t.strong}" />
      <rect x="28" y="244" width="128" height="30" fill="${t.sunk}" stroke="${t.strong}" />
      <text x="43" y="264" font-family="${MONO}" font-size="11" fill="${t.soft}">GLOSSARY CARD</text>
      <rect x="174" y="244" width="156" height="30" fill="${t.sunk}" stroke="${t.mark}" />
      <text x="190" y="264" font-family="${MONO}" font-size="11" fill="${t.mark}">ORIGINAL PRACTICE</text>
      <path d="M185 303v25H25v-25" fill="none" stroke="${t.mark}" stroke-width="1.5" stroke-dasharray="4 4" />
      <text x="185" y="352" text-anchor="middle" font-family="${MONO}" font-size="11" letter-spacing="1" fill="${t.faint}">FEEDBACK RETURNS TO THE EXACT SECTION</text>
    </g>`;
}

function banner(mode) {
  const t = themes[mode];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="title desc">
  <title id="title">AP Study Hub — deep lessons, active recall, original practice</title>
  <desc id="desc">Paper-and-ink artwork showing a cited lesson connected to glossary cards and original practice for seven AP courses.</desc>
  <defs>
    <pattern id="rules" width="10" height="24" patternUnits="userSpaceOnUse">
      <path d="M0 23.5H10" stroke="${t.rule}" opacity="0.6" />
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="${t.paper}" />
  <rect width="${W}" height="${H}" fill="url(#rules)" opacity="0.35" />
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="${t.rule}" />
  <rect width="10" height="${H}" fill="${t.mark}" />

  <!-- Exact SiteMark sheet geometry, enlarged for the repository banner. -->
  <g transform="translate(64 47) scale(1.35)" fill="none" stroke="${t.ink}" stroke-width="1.7" stroke-linejoin="miter">
    <path d="M6 27V9l6-5h14v23z" fill="${t.raised}" />
    <path d="M12 4v5H6z" fill="${t.sunk}" />
    <path d="M11 15h10M11 20h10" stroke="${t.mark}" stroke-width="1.4" />
  </g>
  <text x="119" y="80" font-family="${SERIF}" font-size="31" fill="${t.ink}">AP Study Hub</text>
  <text x="64" y="137" font-family="${MONO}" font-size="13" letter-spacing="1.8" fill="${t.faint}">2026–27 EDITION · SEVEN AP COURSES</text>
  <text x="64" y="202" font-family="${SERIF}" font-size="48" letter-spacing="-1" fill="${t.ink}">Read deeply. Recall actively.</text>
  <text x="64" y="252" font-family="${SERIF}" font-size="48" letter-spacing="-1" fill="${t.ink}">Practise deliberately.</text>
  <path d="M64 277H650" stroke="${t.ink}" stroke-width="2" />
  <text x="64" y="315" font-family="${MONO}" font-size="15" fill="${t.mark}">51 LESSONS · 510 PARAGRAPHS · 405 CARDS · 240 QUESTIONS</text>
  <text x="64" y="357" font-family="${MONO}" font-size="12" letter-spacing="1.3" fill="${t.faint}">FREE · NO ACCOUNT · NO PAYWALL · NO TRACKING</text>
  ${studySheet(t)}
</svg>\n`;
}

for (const mode of ["light", "dark"]) {
  const file = join(outDir, `banner-${mode}.svg`);
  writeFileSync(file, banner(mode), "utf8");
  console.log(`wrote ${file}`);
}
