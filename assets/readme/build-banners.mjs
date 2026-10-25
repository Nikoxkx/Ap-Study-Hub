/**
 * Build the GitHub README banners (`banner-light.png` & `banner-dark.png`)
 * directly over the website's painted classroom wallpaper (`public/bg-music-class.jpg`),
 * using authentic Gaussian-blurred frosted glass UI elements, the 45°-rotated
 * 7-square `Logo`, and all 7 white RGBA AP class symbols.
 *
 * Run: node assets/readme/build-banners.mjs
 */
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const outDir = dirname(fileURLToPath(import.meta.url));
const rootDir = join(outDir, "../..");

const W = 1600;
const H = 580;

const bgJpgB64 = readFileSync(join(rootDir, "public/bg-music-class.jpg")).toString("base64");

const courses = [
  { slug: "apush", label: "APUSH", w: 114 },
  { slug: "ap-lang", label: "AP Lang", w: 124 },
  { slug: "ap-seminar", label: "AP Seminar", w: 148 },
  { slug: "ap-gov", label: "AP Gov", w: 118 },
  { slug: "ap-bio", label: "AP Bio", w: 114 },
  { slug: "ap-calc", label: "AP Calc", w: 120 },
  { slug: "ap-research", label: "AP Research", w: 154 },
].map((c) => ({
  ...c,
  darkIconB64: readFileSync(join(rootDir, `public/icons/courses/${c.slug}-dark.png`)).toString("base64"),
  whiteIconB64: readFileSync(join(rootDir, `public/icons/courses/${c.slug}-white.png`)).toString("base64"),
}));

const dejavuDir = "/usr/share/fonts/truetype/dejavu";
const candidateFonts = [
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

function buildBannerSvg(mode) {
  const isDark = mode === "dark";

  const glassFill = isDark ? "rgba(20, 22, 26, 0.68)" : "rgba(226, 228, 232, 0.58)";
  const glassStroke = isDark ? "rgba(255, 255, 255, 0.52)" : "rgba(255, 255, 255, 0.94)";
  const innerCardFill = isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.40)";
  const innerCardStroke = isDark ? "rgba(255, 255, 255, 0.24)" : "rgba(255, 255, 255, 0.80)";
  const darkPillFill = isDark ? "rgba(12, 13, 16, 0.78)" : "rgba(20, 20, 22, 0.64)";
  const ink = isDark ? "#f5f5f5" : "#0f0f0f";
  const soft = isDark ? "#d6d6d6" : "#262626";
  const faint = isDark ? "#a8a8a8" : "#454545";
  const logoFill = isDark ? "#ffffff" : "#111111";

  // Course pills layout inside main hero card (dark icons on light glass in light mode; white icons in night mode)
  let pillX = 96;
  const pillY = 442;
  const coursePillFill = isDark ? "rgba(18, 19, 24, 0.78)" : "rgba(255, 255, 255, 0.68)";
  const coursePillStroke = isDark ? "rgba(255, 255, 255, 0.68)" : "rgba(255, 255, 255, 0.96)";
  const coursePillText = isDark ? "#ffffff" : "#111111";
  const coursePills = courses
    .map((c) => {
      const x = pillX;
      pillX += c.w + 9;
      const icon = isDark ? c.whiteIconB64 : c.darkIconB64;
      return `
        <g transform="translate(${x} ${pillY})">
          <rect width="${c.w}" height="42" rx="21" fill="${coursePillFill}" stroke="${coursePillStroke}" stroke-width="1.2" />
          <image href="data:image/png;base64,${icon}" x="12" y="9" width="24" height="24" />
          <text x="42" y="26" font-family="${SANS}" font-size="13.5" font-weight="600" fill="${coursePillText}">${c.label}</text>
        </g>`;
    })
    .join("");

  const stats = [
    ["51", "FULL LESSONS", "510 cited paragraphs"],
    ["405", "RECALL CARDS", "Cold retrieval + shuffle"],
    ["240", "PRACTICE ITEMS", "Linked to lesson sections"],
    ["66", "UNIT VIDEOS", "Full-screen, zero tracking"],
  ];

  const statBoxes = stats
    .map(([num, label, sub], idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const bx = 1142 + col * 196;
      const by = 198 + row * 126;
      return `
        <g transform="translate(${bx} ${by})">
          <rect width="180" height="110" rx="14" fill="${innerCardFill}" stroke="${innerCardStroke}" stroke-width="1.1" />
          <text x="18" y="46" font-family="${SERIF}" font-size="36" font-weight="700" fill="${ink}">${num}</text>
          <text x="18" y="71" font-family="${MONO}" font-size="10.5" font-weight="700" letter-spacing="1" fill="${soft}">${label}</text>
          <text x="18" y="91" font-family="${SANS}" font-size="11.5" fill="${faint}">${sub}</text>
        </g>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <filter id="frosted" x="-8%" y="-8%" width="116%" height="116%">
      <feGaussianBlur stdDeviation="6.5" />
    </filter>
    <filter id="card-shadow" x="-10%" y="-10%" width="125%" height="125%">
      <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#000000" flood-opacity="${isDark ? "0.42" : "0.22"}" />
    </filter>
    <clipPath id="glass-regions">
      <rect x="60" y="30" width="222" height="46" rx="23" />
      <rect x="716" y="30" width="168" height="46" rx="23" />
      <rect x="1340" y="30" width="142" height="46" rx="23" />
      <rect x="1494" y="30" width="46" height="46" rx="23" />
      <rect x="60" y="102" width="1040" height="436" rx="20" />
      <rect x="1120" y="102" width="420" height="436" rx="20" />
    </clipPath>
  </defs>

  <!-- 1. Authentic Website Classroom Background -->
  <image href="data:image/jpeg;base64,${bgJpgB64}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice" />
  ${isDark ? `<rect width="${W}" height="${H}" fill="rgba(10, 12, 18, 0.50)" />` : `<rect width="${W}" height="${H}" fill="rgba(255, 255, 255, 0.04)" />`}

  <!-- 2. Genuine Frosted Backdrop Blur Inside All UI Glass Elements -->
  <g clip-path="url(#glass-regions)">
    <image href="data:image/jpeg;base64,${bgJpgB64}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice" filter="url(#frosted)" />
    ${isDark ? `<rect width="${W}" height="${H}" fill="rgba(10, 12, 18, 0.50)" />` : ""}
  </g>

  <!-- 3. Top Leveled Website Header Row -->
  <g filter="url(#card-shadow)">
    <!-- Brand Pill -->
    <rect x="60" y="30" width="222" height="46" rx="23" fill="${glassFill}" stroke="${glassStroke}" stroke-width="1.3" />
    ${rotatedSevenSquareLogo(90, 53, 0.25, logoFill)}
    <text x="114" y="59" font-family="${SERIF}" font-size="20" font-weight="700" fill="${ink}">AP Study Hub</text>

    <!-- Center AP Courses Hover Trigger Pill -->
    <rect x="716" y="30" width="168" height="46" rx="23" fill="${darkPillFill}" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" />
    <text x="792" y="58" text-anchor="middle" font-family="${SANS}" font-size="14.5" font-weight="600" fill="#ffffff">AP Courses</text>
    <text x="854" y="57" text-anchor="middle" font-family="${SANS}" font-size="12" fill="rgba(255,255,255,0.8)">▾</text>

    <!-- Jump to ⌘K Pill -->
    <rect x="1340" y="30" width="142" height="46" rx="23" fill="${darkPillFill}" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" />
    <text x="1364" y="58" font-family="${SANS}" font-size="13.5" font-weight="600" fill="#ffffff">Jump to</text>
    <rect x="1428" y="40" width="38" height="26" rx="13" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.45)" stroke-width="1" />
    <text x="1447" y="57" text-anchor="middle" font-family="${MONO}" font-size="11.5" font-weight="700" fill="#ffffff">⌘K</text>

    <!-- Compact Menu Button -->
    <rect x="1494" y="30" width="46" height="46" rx="23" fill="${darkPillFill}" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" />
    <line x1="1508" y1="46" x2="1526" y2="46" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" />
    <line x1="1508" y1="53" x2="1526" y2="53" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" />
    <line x1="1508" y1="60" x2="1526" y2="60" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" />
  </g>

  <!-- 4. Main Transparent Glass Hero Card -->
  <g filter="url(#card-shadow)">
    <rect x="60" y="102" width="1040" height="436" rx="20" fill="${glassFill}" stroke="${glassStroke}" stroke-width="1.4" />
  </g>

  <text x="96" y="154" font-family="${MONO}" font-size="12" font-weight="700" letter-spacing="1.6" fill="${faint}">SEVEN AP COURSES  ·  FREE  ·  NO ACCOUNT  ·  LOCAL-FIRST</text>

  <text x="96" y="226" font-family="${SERIF}" font-size="60" font-weight="700" letter-spacing="-1.2" fill="${ink}">Learn seven AP subjects</text>
  <text x="96" y="294" font-family="${SERIF}" font-size="60" font-weight="700" letter-spacing="-1.2" fill="${ink}">deeply — with zero noise.</text>

  <text x="96" y="348" font-family="${SANS}" font-size="18.5" fill="${soft}">Complete cited lessons, cold-recall card decks, original practice questions, vetted</text>
  <text x="96" y="376" font-family="${SANS}" font-size="18.5" fill="${soft}">full-screen unit videos, and loose-leaf scratchpads in one transparent workspace.</text>

  <line x1="96" y1="414" x2="1064" y2="414" stroke="${innerCardStroke}" stroke-width="1" />

  ${coursePills}

  <!-- 5. Right Companion Glass Card: Inside the Library -->
  <g filter="url(#card-shadow)">
    <rect x="1120" y="102" width="420" height="436" rx="20" fill="${glassFill}" stroke="${glassStroke}" stroke-width="1.4" />
  </g>

  ${rotatedSevenSquareLogo(1160, 148, 0.28, logoFill)}
  <text x="1188" y="144" font-family="${MONO}" font-size="11" font-weight="700" letter-spacing="1.4" fill="${faint}">INSIDE THE LIBRARY</text>
  <text x="1188" y="166" font-family="${SERIF}" font-size="22" font-weight="700" fill="${ink}">2026–27 Open Edition</text>

  ${statBoxes}

  <rect x="1142" y="458" width="376" height="52" rx="14" fill="${darkPillFill}" stroke="rgba(255,255,255,0.75)" stroke-width="1.1" />
  <text x="1330" y="489" text-anchor="middle" font-family="${MONO}" font-size="11.5" font-weight="700" letter-spacing="1.1" fill="#ffffff">ZERO TRACKERS  ·  MIT OPEN SOURCE</text>
</svg>`;
}

for (const oldSvg of ["banner-light.svg", "banner-dark.svg"]) {
  const p = join(outDir, oldSvg);
  if (existsSync(p)) rmSync(p);
}

for (const mode of ["light", "dark"]) {
  const svg = buildBannerSvg(mode);
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: W },
    font: {
      fontFiles: candidateFonts,
      defaultFontFamily: hasGoogleFonts ? "Public Sans" : "DejaVu Sans",
    },
  });
  const png = resvg.render().asPng();
  const outPath = join(outDir, `banner-${mode}.png`);
  writeFileSync(outPath, png);
  console.log(`Wrote ${outPath} (${png.length.toLocaleString()} bytes)`);
}
