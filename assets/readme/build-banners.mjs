/**
 * Build the 2026–27 README banners as dependency-free, resolution-independent SVG.
 *
 * Embeds the SIL-OFL `Kalam` 300 Latin WOFF2 subset directly in the SVG so GitHub
 * viewers on every OS see genuine `realistichandwriting.com`-style loose-leaf
 * paper (`#ffffff` sheet, `#de7c7b` full-height vertical rule, `#b8cee5` inset
 * blue lines, and `#30455a` ballpoint ink resting directly on each blue line).
 *
 * Run: node assets/readme/build-banners.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const outDir = dirname(fileURLToPath(import.meta.url));
const rootDir = join(outDir, "../..");
const kalamWoff2 = readFileSync(join(rootDir, "public/fonts/kalam-latin-300-normal.woff2")).toString("base64");

const W = 1200;
const H = 430;

const SERIF = "'Newsreader', Georgia, 'Iowan Old Style', 'Times New Roman', serif";
const SANS = "'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const HAND = "'Kalam', 'Segoe Print', 'Bradley Hand', cursive";

const themes = {
  light: {
    canvasA: "#dfe4f2",
    canvasB: "#ece8e1",
    glassFill: "rgba(255, 255, 255, 0.68)",
    glassStroke: "#ffffff",
    ink: "#0f0f0f",
    soft: "#2d2d2d",
    faint: "#525252",
    pillFill: "rgba(255, 255, 255, 0.78)",
    logoFill: "#121212",
  },
  dark: {
    canvasA: "#121318",
    canvasB: "#1a1a1d",
    glassFill: "rgba(24, 24, 24, 0.76)",
    glassStroke: "rgba(255, 255, 255, 0.42)",
    ink: "#f2f2f2",
    soft: "#cccccc",
    faint: "#9a9a9a",
    pillFill: "rgba(255, 255, 255, 0.1)",
    logoFill: "#ffffff",
  },
};

function rotatedSevenSquareLogo(fill) {
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
    <g transform="translate(80 76) scale(0.34) rotate(45)">
      <g transform="translate(-48 -48)">
        ${cells
          .map(
            ([x, y]) =>
              `<rect x="${x + 2}" y="${y + 2}" width="28" height="28" fill="${fill}" />`,
          )
          .join("")}
      </g>
    </g>`;
}

function realisticNotebookSheet() {
  const sheetW = 446;
  const sheetH = 362;
  const lineStep = 23;
  const firstRuleY = 48;
  const ruleYs = Array.from({ length: 13 }, (_, i) => firstRuleY + i * lineStep);

  return `
    <g transform="translate(710 34)">
      <rect x="4" y="6" width="${sheetW}" height="${sheetH}" rx="3" fill="rgba(0,0,0,0.14)" />
      <rect width="${sheetW}" height="${sheetH}" rx="3" fill="#ffffff" stroke="#b8c2d0" stroke-width="1" />

      <!-- Horizontal light-blue lines inset from outer edges -->
      ${ruleYs
        .map(
          (y) =>
            `<line x1="16" y1="${y}" x2="${sheetW - 16}" y2="${y}" stroke="#b8cee5" stroke-width="1" />`,
        )
        .join("\n      ")}

      <!-- Full-height red vertical margin rule -->
      <line x1="50" y1="0" x2="50" y2="${sheetH}" stroke="#de7c7b" stroke-width="1.4" />

      <!-- Kalam 300 ballpoint ink aligned directly on the blue lines -->
      <g font-family="${HAND}" font-weight="300" font-size="14.6" fill="#30455a">
        <text x="62" y="${ruleYs[0] - 2}">The AP Study Hub Method (2026–27) — Read, Recall, Respond</text>

        <text x="62" y="${ruleYs[2] - 2}">1.</text>
        <text x="62" y="${ruleYs[3] - 2}">Read deeply — A complete lesson (10+ cited paragraphs)</text>
        <text x="62" y="${ruleYs[4] - 2}">Objectives, context, and worked examples written in full.</text>

        <text x="62" y="${ruleYs[6] - 2}">2.</text>
        <text x="62" y="${ruleYs[7] - 2}">Recall — Can you produce the idea cold? (Flip, mark, redo)</text>
        <text x="62" y="${ruleYs[8] - 2}">Term on the front, your own explanation before flipping.</text>

        <text x="62" y="${ruleYs[10] - 2}">3.</text>
        <text x="62" y="${ruleYs[11] - 2}">Respond — Original practice (Feedback to lesson section)</text>
        <text x="62" y="${ruleYs[12] - 2}">A wrong answer becomes a route back to understanding.</text>
      </g>
    </g>`;
}

function banner(mode) {
  const t = themes[mode];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="title desc">
  <title id="title">AP Study Hub — learn seven AP subjects deeply on a quieter kind of study hub</title>
  <desc id="desc">Frosted glass masthead with the 45-degree 7-square emblem alongside a realistic loose-leaf notebook sheet showing the Read, Recall, Respond study loop across 7 AP courses.</desc>
  <defs>
    <style>
      @font-face {
        font-family: 'Kalam';
        font-style: normal;
        font-weight: 300;
        src: url("data:font/woff2;base64,${kalamWoff2}") format("woff2");
      }
    </style>
    <linearGradient id="bg-${mode}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.canvasA}" />
      <stop offset="100%" stop-color="${t.canvasB}" />
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg-${mode})" />

  <!-- Left Frosted Glass Card -->
  <rect x="44" y="34" width="640" height="362" rx="17" fill="${t.glassFill}" stroke="${t.glassStroke}" stroke-width="1.2" />

  ${rotatedSevenSquareLogo(t.logoFill)}
  <text x="112" y="84" font-family="${SERIF}" font-size="28" font-weight="600" fill="${t.ink}">AP Study Hub</text>

  <rect x="488" y="60" width="166" height="30" rx="15" fill="${t.pillFill}" stroke="${t.glassStroke}" stroke-width="1" />
  <text x="571" y="79" text-anchor="middle" font-family="${MONO}" font-size="10.5" letter-spacing="0.8" fill="${t.soft}">7 AP COURSES · FREE</text>

  <text x="72" y="158" font-family="${SERIF}" font-size="43" font-weight="600" letter-spacing="-1" fill="${t.ink}">Learn seven AP subjects</text>
  <text x="72" y="208" font-family="${SERIF}" font-size="43" font-weight="600" letter-spacing="-1" fill="${t.ink}">deeply — with zero noise.</text>

  <text x="72" y="252" font-family="${SANS}" font-size="15" fill="${t.soft}">Transparent glass workspace, monochrome course icons, cited lessons,</text>
  <text x="72" y="276" font-family="${SANS}" font-size="15" fill="${t.soft}">recall cards, full-screen unit videos, and lined scratch paper.</text>

  <text x="72" y="328" font-family="${MONO}" font-size="13" font-weight="600" fill="${t.ink}">51 LESSONS  ·  510 PARAGRAPHS  ·  405 CARDS  ·  240 QUESTIONS  ·  66 VIDEOS</text>
  <text x="72" y="362" font-family="${MONO}" font-size="11.5" letter-spacing="1.1" fill="${t.faint}">NO ACCOUNT  ·  LOCAL-FIRST  ·  OPEN SOURCE  ·  2026–27 EDITION</text>

  ${realisticNotebookSheet()}
</svg>\n`;
}

for (const mode of ["light", "dark"]) {
  const file = join(outDir, `banner-${mode}.svg`);
  writeFileSync(file, banner(mode), "utf8");
  console.log(`wrote ${file}`);
}
