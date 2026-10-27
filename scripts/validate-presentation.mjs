/**
 * Guard the parts of the October 2026 update that are easy to regress quietly:
 * a truly neutral night palette, recognisable subject symbols, automatic real
 * YouTube thumbnails, and a static 1200×630 social preview.
 *
 * Run: pnpm validate:presentation
 */
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";

const errors = [];
const read = (path) => readFileSync(path, "utf8");
const isNeutralHex = (hex) => {
  const value = hex.replace("#", "");
  return value.length === 6 && value.slice(0, 2).toLowerCase() === value.slice(2, 4).toLowerCase()
    && value.slice(2, 4).toLowerCase() === value.slice(4, 6).toLowerCase();
};
const fail = (message) => errors.push(message);

const css = read("src/app/globals.css");
const subjects = read("src/lib/subjects.ts");
const layout = read("src/app/layout.tsx");
const config = read("next.config.ts");
const thumbnail = read("src/components/VideoThumbnail.tsx");
const player = read("src/components/UnitVideoPlayer.tsx");
const marks = read("src/components/SubjectMark.tsx");

// 0. The exam room's own sheet is imported after globals.css, so anything it
//    declares for `.exam-room` wins over later-in-file print rules. That is fine
//    for the screen and fatal for paper: assert the sheet carries its own print
//    block, after the fixed shell, that puts the room back into the document.
const examRoom = read("src/app/exam-room.css");
const roomShell = examRoom.indexOf(".exam-room {");
const roomPrint = examRoom.lastIndexOf("@media print");
if (roomShell === -1) fail("exam-room.css no longer declares the room shell");
else if (roomPrint === -1) fail("exam-room.css lost its print block: printing a paper would clip it");
else if (roomPrint < roomShell) fail("exam-room.css print block must come after the fixed shell");
else {
  const printBlock = examRoom.slice(roomPrint);
  for (const declaration of ["position: static", "display: block", "animation: none"]) {
    if (!printBlock.includes(declaration)) fail(`exam-room.css print block is missing ${declaration}`);
  }
  if (!/body\.exam-room-open[\s\S]*position: static !important/.test(printBlock)) {
    fail("exam-room.css print block no longer overrides the pinned scroll-lock body");
  }
}
if (!/import "\.\/exam-room\.css";/.test(layout)) fail("layout.tsx does not import the exam room sheet");

// 1. Night mode is strictly grayscale — no blue, green, or purple cast.
const darkTokens = css.match(/\.dark \{([\s\S]*?)\n\}/)?.[1];
if (!darkTokens) fail("Could not find the .dark token block in globals.css");
else {
  const neutralTokens = [
    "--paper", "--paper-raised", "--paper-sunk", "--ink", "--ink-soft",
    "--ink-faint", "--rule", "--rule-strong", "--mark", "--mark-wash",
    "--good", "--good-wash", "--warn", "--warn-wash", "--subject-tint",
  ];
  for (const token of neutralTokens) {
    const declaration = darkTokens.match(new RegExp(`${token.replaceAll("-", "\\-")}:\\s*([^;]+);`));
    const value = declaration?.[1] ?? "";
    // A surface may be a neutral grey hex or a neutral white/black alpha wash —
    // both are grayscale. Anything with an unequal channel is a colour cast.
    const hex = value.match(/#[0-9a-fA-F]{6}/)?.[0];
    const rgba = value.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,/);
    if (hex) {
      if (!isNeutralHex(hex)) fail(`${token} is tinted: ${hex}`);
    } else if (rgba) {
      const [, r, g, b] = rgba;
      if (r !== g || g !== b) fail(`${token} is tinted: ${value.trim()}`);
    } else {
      fail(`${token} has no colour in .dark`);
    }
  }
}
if (!/\.dark body \{\s*background-image: none;/.test(css)) {
  fail("Night mode still paints a body background wash");
}
for (const oldTint of [
  "#0f1114", "#171a1e", "#0b0d10", "#e9ecf1", "#bcc3cd", "#949da8",
  "#343a42", "#4b535d", "#202329", "#12151a", "#161a20",
  "rgb(226 234 245", "rgb(176 190 208",
]) {
  if (css.includes(oldTint)) fail(`Legacy tinted night-mode colour remains: ${oldTint}`);
}
for (const [, hex] of subjects.matchAll(/washDark:\s*"(#[0-9a-fA-F]{6})"/g)) {
  if (!isNeutralHex(hex)) fail(`Subject washDark is tinted: ${hex}`);
}
const darkThemeColor = layout.match(/prefers-color-scheme: dark\)[^\n]*color:\s*"(#[0-9a-fA-F]{6})"/)?.[1];
if (!darkThemeColor || !isNeutralHex(darkThemeColor)) fail("Viewport dark themeColor is not neutral");

// Semantic grading colors are an intentional exception to neutral surfaces.
for (const token of ["answer-correct", "answer-correct-bg", "answer-wrong", "answer-wrong-bg"]) {
  const values = [...css.matchAll(new RegExp(`--${token}:\\s*(#[0-9a-fA-F]{6});`, "g"))];
  if (values.length !== 2) fail(`Expected light and dark grading colors for ${token}`);
  for (const [, hex] of values) {
    const red = parseInt(hex.slice(1, 3), 16);
    const green = parseInt(hex.slice(3, 5), 16);
    if (token.startsWith("answer-correct") ? green <= red : red <= green) {
      fail(`${token} must remain ${token.startsWith("answer-correct") ? "green" : "red"}: ${hex}`);
    }
  }
}
for (const path of ["src/components/VariantLab.tsx", "src/components/labs/DataLab.tsx"]) {
  if (!read(path).includes("data-correct={")) fail(`${path} is missing graded answer states`);
}

// 2. Every subject has a short topic and a symbol meaning.
const SUBJECT_SLUGS = ["apush", "ap-lang", "ap-seminar", "ap-gov", "ap-bio", "ap-calc", "ap-research", "ap-macro", "ap-env", "ap-lit"];
for (const field of ["topic", "symbolLabel"]) {
  const count = [...subjects.matchAll(new RegExp(`\\b${field}:\\s*"`, "g"))].length;
  if (count !== SUBJECT_SLUGS.length) fail(`Expected ${SUBJECT_SLUGS.length} subject ${field} values, found ${count}`);
}
for (const symbol of ["U.S. flag", "Open book", "Source documents", "Classical capitol", "DNA", "Right triangle trigonometry", "Magnifying glass", "Rising market graph", "Leaf", "Engraved rose"]) {
  if (!marks.includes(symbol)) fail(`SubjectMark is missing the ${symbol} symbol`);
}
/**
 * Decode an 8-bit, non-interlaced RGBA PNG far enough to know what the drawing
 * actually looks like. Byte 25 alone only proves "RGBA"; it cannot tell a white
 * mark from a black one, which is exactly how the AP Lit white variant shipped
 * as an invisible black silhouette. zlib is all this needs.
 */
function inspectMark(path) {
  const png = readFileSync(path);
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  const colourType = png.readUInt8(25);
  const interlace = png.readUInt8(28);
  if (colourType !== 6) return { error: "not RGBA" };
  if (interlace !== 0) return { error: "interlaced" };
  const chunks = [];
  for (let offset = 8; offset < png.length; ) {
    const length = png.readUInt32BE(offset);
    const type = png.toString("ascii", offset + 4, offset + 8);
    if (type === "IDAT") chunks.push(png.subarray(offset + 8, offset + 8 + length));
    offset += 12 + length;
  }
  const raw = inflateSync(Buffer.concat(chunks));
  const stride = width * 4;
  const pixels = Buffer.alloc(stride * height);
  let previous = Buffer.alloc(stride);
  for (let y = 0; y < height; y += 1) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const out = pixels.subarray(y * stride, (y + 1) * stride);
    for (let x = 0; x < stride; x += 1) {
      const left = x >= 4 ? out[x - 4] : 0;
      const up = previous[x];
      const upLeft = x >= 4 ? previous[x - 4] : 0;
      const value = line[x];
      out[x] = filter === 1 ? value + left
        : filter === 2 ? value + up
          : filter === 3 ? value + ((left + up) >> 1)
            : filter === 4 ? value + paeth(left, up, upLeft)
              : value;
    }
    previous = out;
  }
  let opaque = 0;
  let luminance = 0;
  for (let index = 0; index < pixels.length; index += 4) {
    if (pixels[index + 3] < 200) continue;
    opaque += 1;
    luminance += 0.2126 * pixels[index] + 0.7152 * pixels[index + 1] + 0.0722 * pixels[index + 2];
  }
  return {
    coverage: opaque / (width * height),
    luminance: opaque ? luminance / opaque : 0,
  };
}

function paeth(left, up, upLeft) {
  const estimate = left + up - upLeft;
  const toLeft = Math.abs(estimate - left);
  const toUp = Math.abs(estimate - up);
  const toUpLeft = Math.abs(estimate - upLeft);
  return toLeft <= toUp && toLeft <= toUpLeft ? left : toUp <= toUpLeft ? up : upLeft;
}

for (const slug of SUBJECT_SLUGS) {
  for (const [file, expectation] of [
    [slug, "ink"],
    [`${slug}-dark`, "ink"],
    [`${slug}-white`, "white"],
  ]) {
    const iconPath = `public/icons/courses/${file}.png`;
    const icon = readFileSync(iconPath);
    if (icon.readUInt8(25) !== 6) fail(`${iconPath} is not a transparent RGBA PNG`);
    // A mark that is a single flat colour is a blank canvas: it either vanishes
    // into the glass header (all white) or paints a solid tile over it (all dark).
    if (icon.length < 2000) fail(`${iconPath} is too small to contain a drawing (${icon.length} bytes)`);
    const mark = inspectMark(iconPath);
    if (mark.error) {
      fail(`${iconPath} could not be inspected: ${mark.error}`);
      continue;
    }
    if (mark.coverage < 0.04 || mark.coverage > 0.6) {
      fail(`${iconPath} covers ${(mark.coverage * 100).toFixed(1)}% of the canvas — that is a blank tile or a hairline, not a symbol`);
    }
    if (expectation === "white" && mark.luminance < 200) {
      fail(`${iconPath} is meant to be a white symbol but its ink averages ${mark.luminance.toFixed(0)}/255 — it will vanish on dark chrome`);
    }
    if (expectation === "ink" && mark.luminance > 90) {
      fail(`${iconPath} is meant to be dark ink but averages ${mark.luminance.toFixed(0)}/255`);
    }
  }
}

// 3. Real YouTube thumbnails load automatically; the player frame stays opt-in.
if (!config.includes('https://i.ytimg.com')) fail("CSP does not allowlist i.ytimg.com thumbnails");
if (!thumbnail.includes('loading = "eager"')) fail("VideoThumbnail does not default to eager loading");
if (!thumbnail.includes("videoThumbnailUrl(video, size)")) fail("VideoThumbnail is not using the real YouTube thumbnail helper");
if (!player.includes("<VideoThumbnail video={active}")) fail("UnitVideoPlayer poster is not the real YouTube thumbnail");
if (!player.includes("No\n        YouTube scripts or embedded frames")) fail("UnitVideoPlayer no longer explains the opt-in frame boundary");
if (read("src/app/privacy/page.tsx").includes("the poster is local HTML/CSS")) {
  fail("Privacy page still claims the poster is local-only");
}

// 4. The social preview is a real, committed 1200×630 PNG.
for (const path of ["public/og-image.png", "public/social-preview.png"]) {
  const png = readFileSync(path);
  const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (!png.subarray(0, 8).equals(pngSignature)) { fail(`${path} is not a PNG`); continue; }
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  if (width !== 1200 || height !== 630) fail(`${path} is ${width}×${height}, expected 1200×630`);
}

if (errors.length) {
  console.error(`Presentation validation failed with ${errors.length} issue${errors.length === 1 ? "" : "s"}:`);
  for (const error of errors) console.error(`  • ${error}`);
  process.exit(1);
}
console.log("✓ Exam room print sheet, neutral night mode, subject symbols, real video thumbnails, and static social preview are intact.");
