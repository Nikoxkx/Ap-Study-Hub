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
// The wallpaper lives behind body::before, so checking the body alone misses a
// full-page overlay. Neither theme may wash it out (light mode used to sit a
// 30–52% off-white gradient there) or dim it (night mode once did the same with
// black). Panels are frosted individually; the painting itself stays untouched.
for (const [, declaration] of css.matchAll(/body::before\s*\{([^}]*)\}/g)) {
  if (!/background(?:-image)?:\s*none\s*;/.test(declaration)) {
    fail("A page-wide veil is painting over the wallpaper; it must show at its own brightness");
  }
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

// 5. Personalisation, the adaptive layer, and the settings page.
//
//    The risk here is not "does it look right" but "can a visitor break their
//    own site". Every assertion below exists because a saved preference or a
//    pasted URL is untrusted input: it has to be clamped on the way in and
//    interpreted safely on the way out.
const prefs = read("src/lib/site-prefs.ts");
const prefsTheme = read("src/lib/prefs-theme.ts");
const home = read("src/app/page.tsx");
const settingsClient = read("src/components/settings/SettingsClient.tsx");
const sourcesPanel = read("src/components/settings/SourcesPanel.tsx");
const linkRoute = read("src/app/api/link-preview/route.ts");
const assets = read("src/lib/custom-assets.ts");

// Every tab the shell claims must be switchable, and the deep link must work.
for (const tab of ["appearance", "layout", "content", "sources", "adaptive", "privacy", "advanced"]) {
  if (!settingsClient.includes(`id: "${tab}"`)) fail(`SettingsClient is missing the ${tab} tab`);
}
if (!settingsClient.includes('get("tab")') || !settingsClient.includes("tabFromUrl")) {
  fail("Settings lost its ?tab= deep link");
}

// A stored value is normalised through `revivePrefs`, never trusted raw.
if (!prefs.includes("export function revivePrefs")) fail("site-prefs lost revivePrefs: stored settings would be trusted raw");
if (!prefs.includes("clampNumber(")) fail("site-prefs no longer clamps numeric preferences");
if (!prefs.includes("export function safeUrl")) fail("site-prefs lost safeUrl: a stored link could carry javascript:");
if (!prefs.includes("export function sanitizeCustomCss")) fail("site-prefs lost sanitizeCustomCss");

// The override sheet has to address both palettes, or a custom ink silently
// does nothing at night, and it must never paint a page-wide veil over the
// wallpaper (the standing rule from the previous change).
if (!prefsTheme.includes('selector: ":root"')) fail("prefs CSS does not emit the light palette");
if (!prefsTheme.includes('selector: "html.dark"')) fail("prefs CSS does not emit the night palette");
if (!prefsTheme.includes("readableInk(")) fail("prefs CSS no longer contrast-corrects custom inks");
if (!prefsTheme.includes("sanitizeCustomCss(advanced.customCss)")) fail("custom CSS is appended without being sanitised");
if (/body::before/.test(prefsTheme)) fail("prefs CSS paints a page-wide layer over the wallpaper");

// Sections are reordered with CSS order and hidden with display, so no module
// is ever unmounted — a renamed or moved section keeps its state.
if (!home.includes("<HomeOrder />")) fail("the home page no longer mounts HomeOrder");
const moduleIds = [...prefs.matchAll(/\{ id: "([a-z-]+)", label:/gu)].map((m) => m[1]);
if (moduleIds.length < 6) fail("HOME_MODULES shrank below the documented six sections");
for (const id of moduleIds) {
  if (!home.includes(`data-home-module="${id}"`) && !home.includes("<AdaptiveHero")) {
    fail(`home page has no data-home-module="${id}" element, so that section cannot be reordered or hidden`);
  }
}
if (!home.includes("<AdaptiveHero")) fail("the home hero is no longer rendered through AdaptiveHero");

// The one outbound request on the site stays guarded.
if (!linkRoute.includes("function isPrivateAddress")) fail("link preview lost its private-address guard");
if (!linkRoute.includes("lookup(host, { all: true")) fail("link preview no longer resolves every address before fetching");
if (!linkRoute.includes('redirect: "manual"')) fail("link preview follows redirects without re-checking the target");
if (!linkRoute.includes("MAX_BYTES") || !linkRoute.includes("TIMEOUT_MS")) fail("link preview lost its size or time cap");
if (!/protocol !== "http:" && url\.protocol !== "https:"/.test(linkRoute)) fail("link preview accepts non-http schemes");
if (!sourcesPanel.includes("/api/link-preview")) fail("SourcesPanel no longer calls the link-preview route");

// Uploads stay images: SVG is refused and the size cap is enforced.
if (!assets.includes("image/svg")) fail("custom-assets no longer names SVG as refused");
if (!assets.includes("MAX_ASSET_BYTES")) fail("custom-assets lost its size cap");

// The privacy page has to name every new key, or it describes an older site.
for (const key of ["aps.prefs.v1", "aps.adaptive.v1", "aps.sources.v1", "aps-assets"]) {
  if (!read("src/app/privacy/page.tsx").includes(key)) fail(`privacy page does not mention ${key}`);
}
if (!read("src/app/privacy/page.tsx").includes("link-preview")) fail("privacy page does not explain the link-preview request");

// 6. Optional accounts, and readable small type.
//
//    Accounts must stay a switch, not a requirement: no secret in the bundle, no
//    password flow, and RLS on every table the client can reach.
const supabaseLib = read("src/lib/supabase.ts");
const authLib = read("src/lib/use-auth.tsx");
const accountPage = read("src/app/account/page.tsx");
const migration = read("supabase/migrations/20261122120000_create_profiles_and_stats.sql");

if (!layout.includes("<AuthProvider>")) fail("layout.tsx does not mount AuthProvider");
if (!settingsClient.includes('id: "account"')) fail("Settings is missing the account tab");
if (!authLib.includes("signInWithOtp") || !authLib.includes("verifyOtp")) {
  fail("use-auth no longer signs in with a one-time code");
}
if (/signInWithPassword/.test(authLib)) fail("a password flow appeared; this site has no password field");
if (!supabaseLib.includes("NEXT_PUBLIC_SUPABASE_ANON_KEY")) fail("supabase.ts lost its public key wiring");
if (/SERVICE_ROLE/i.test(supabaseLib) || /SERVICE_ROLE/i.test(authLib) || /SERVICE_ROLE/i.test(accountPage)) {
  fail("a service-role key is referenced in client code");
}
if (!accountPage.includes('canonical: "/account"')) fail("/account lost its canonical metadata");
if (!migration.includes("enable row level security")) fail("account migration does not enable RLS");
if ((migration.match(/auth\.uid\(\)/g) ?? []).length < 6) fail("account policies are not keyed to auth.uid()");
if (!migration.includes("'avatars'")) fail("account migration does not create the avatars bucket");
if (!migration.includes("file_size_limit")) fail("avatar bucket lost its size limit");

// Small mono labels have to hold up over a photograph seen through glass. The
// light faint ink is asserted against the page's own surface colour, and the
// halo rule is asserted so a future reset of the ink cannot quietly undo it.
const faintInk = css.match(/--color-ink-faint:\s*(#[0-9a-fA-F]{6})/)?.[1];
const lin = (value) => (value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
const luminance = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
if (!faintInk) {
  fail("light --color-ink-faint is not a plain hex colour");
} else {
  const surface = luminance("#f1efe9");
  const ratio = (Math.max(surface, luminance(faintInk)) + 0.05) / (Math.min(surface, luminance(faintInk)) + 0.05);
  if (ratio < 9) fail(`light --color-ink-faint is ${faintInk}, only ${ratio.toFixed(1)}:1 on the page surface — small labels will wash out`);
}
if (!/:root:not\(\.dark\) \.label,/.test(css)) fail("small labels lost their light-mode halo");
if (!/Legibility over the wallpaper/.test(css)) fail("the legibility block was removed from globals.css");

// 7. Night-mode text, and feedback that actually reads.
//
//    Two failures are easy to ship and hard to notice on a developer's own
//    machine: text that inherits a colour while its background inverts (white on
//    white the moment the theme flips), and "wrong answer" rendered in grey, so
//    nothing distinguishes a mistake from a neutral option.
const darkBlock = css.match(/\.dark \{([\s\S]*?)\n\}/)?.[1] ?? "";
const rootBlock = css.match(/:root \{([\s\S]*?)\n\}/)?.[1] ?? "";
const tokenIn = (blockText, name) =>
  blockText.match(new RegExp(`${name.replaceAll("-", "\\-")}:\\s*([^;]+);`))?.[1]?.trim() ?? "";
const lum = (value) => {
  const hex = value.match(/#([0-9a-fA-F]{6})/)?.[1];
  if (!hex) return null;
  return luminance(`#${hex}`);
};

const onInkLight = lum(tokenIn(rootBlock, "--on-ink"));
const onInkDark = lum(tokenIn(darkBlock, "--on-ink"));
if (onInkLight === null || onInkLight < 0.85) {
  fail("--on-ink is not white in day mode: text on a filled control would be dim");
}
if (onInkDark === null || onInkDark > 0.15) {
  fail("--on-ink is not dark at night, so a filled control would render white-on-white");
}
const darkInk = lum(tokenIn(darkBlock, "--ink"));
if (darkInk === null || darkInk < 0.88) fail("night --ink is no longer near-white");
const darkFaint = lum(tokenIn(darkBlock, "--ink-faint"));
if (darkFaint === null || darkFaint < 0.7) fail("night --ink-faint is too dim to read over the wallpaper");
// 11px mono caps cannot survive a wide dark glow: the night rim has to stay hairline.
const darkLabelHalo = css.match(/\.dark \.label,\s*\n\.dark \.folio,[\s\S]*?\{([^}]*)\}/)?.[1] ?? "";
if (/0 0 (?:[3-9]|\d{2,})px/.test(darkLabelHalo)) {
  fail("the night label halo is wider than the glyph, so the letters read as dark smears");
}
if (!/font-weight:\s*600/.test(css.match(/\.dark \.label \{([^}]*)\}/)?.[1] ?? "")) {
  fail("night labels are not weighted up, so hairline mono caps disappear over the painting");
}

// The exact screenshot bug: a pressed segment filled with ink must not inherit
// the accent colour, or the label vanishes at night.
for (const selector of [
  '.segmented button[aria-pressed="true"]',
  '.exam-room-finish',
  '.packet-unit-links a[aria-current="page"]',
]) {
  const rule = css.match(new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([^}]*)\\}`))?.[1] ?? "";
  if (!rule) fail(`missing rule for ${selector}`);
  else if (!/color:\s*var\(--on-ink\)/.test(rule)) {
    fail(`${selector} fills with ink but does not set color: var(--on-ink)`);
  }
}

// Explanation copy in worked solutions used to be a fixed dark grey, which
// vanished on the night panel; it has to ride the ink scale.
const workedReason = css.match(/\.worked-reason \{([^}]*)\}/)?.[1] ?? "";
if (!/color:\s*var\(--ink-soft\)/.test(workedReason)) {
  fail("worked-solution explanations are not using the ink scale, so night mode can hide them");
}

// The surface ladder: one number from clear glass to solid paper, with a floor
// in each palette below which the text would stop clearing contrast.
const prefsSource = read("src/lib/site-prefs.ts");
const themeSource = read("src/lib/prefs-theme.ts");
const appearanceSource = read("src/components/settings/AppearancePanel.tsx");
for (const id of ["clear", "semi", "frosted", "solid", "paper"]) {
  if (!new RegExp(`id: "${id}"`).test(prefsSource)) {
    fail(`the surface ladder is missing the "${id}" stop`);
  }
}
if (!/export const SURFACE_STOPS[\s\S]*?value: 0,[\s\S]*?value: 100,/.test(prefsSource)) {
  fail("the surface ladder does not run from 0 (clear) to 100 (paper)");
}
const floors = themeSource.match(/const SURFACE_FLOOR = \{ light: ([\d.]+), dark: ([\d.]+) \}/);
if (!floors) fail("the surface ladder has no per-palette legibility floor");
else {
  const lightFloor = Number(floors[1]);
  const darkFloor = Number(floors[2]);
  // Contrast of the shipped inks over each painting's worst patch at the floor
  // alpha; anything under 4.5 would make "Clear" a trap rather than a choice.
  const over = (paper, alpha, behind) =>
    paper.map((channel, i) => alpha * channel + (1 - alpha) * behind[i]);
  const contrast = (a, b) => {
    const lum = (rgb) =>
      0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
    const channel = (value) => {
      const c = value / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
  };
  const dayWorst = contrast(over([226, 226, 226], lightFloor, [57, 36, 45]), [11, 11, 11]);
  const nightWorst = contrast(over([18, 18, 18], darkFloor, [225, 235, 250]), [247, 247, 247]);
  if (dayWorst < 4.5) fail(`clear day glass drops body text to ${dayWorst.toFixed(2)}:1`);
  if (nightWorst < 4.5) fail(`clear night glass drops body text to ${nightWorst.toFixed(2)}:1`);
}
if (!/readableTint\(rawTint, glassAlpha, palette\.theme\)/.test(themeSource)) {
  fail("a hand-picked glass tint is not contrast-corrected against the composite");
}
if (!/export function readableTint/.test(themeSource) || !/contrastRatio\(toHex\(composite\)/.test(themeSource)) {
  fail("the glass-tint correction does not measure contrast");
}
if (!/surfaceAlpha\(appearance\.surface/.test(themeSource)) {
  fail("the generated stylesheet ignores the surface setting");
}
if (!/--surface-blur/.test(themeSource) || !/--glass-bg/.test(themeSource)) {
  fail("the surface setting is not wired to the panel tokens");
}
if (!/surface: surfaceStopOf\(prefs\.appearance\.surface\)/.test(themeSource)) {
  fail("the surface stop is not published as a data attribute");
}
if (!/label="Panel surface"/.test(appearanceSource) || !/label="Panel opacity"/.test(appearanceSource)) {
  fail("Settings → Appearance does not expose the surface ladder");
}
if (!/SURFACE_STOPS\.map/.test(appearanceSource)) {
  fail("the surface presets are not rendered from the shared ladder");
}
if (!/--label-halo/.test(css) || !/var\(--surface-blur/.test(css)) {
  fail("the glass rules do not consume the surface blur token");
}

// Feedback states must be chromatic and must set their own text colour.
for (const [selector, token] of [
  [".adaptive-quiz-option.is-correct", "--answer-correct"],
  [".adaptive-quiz-option.is-wrong", "--answer-wrong"],
]) {
  const rule = css.match(new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([^}]*)\\}`))?.[1] ?? "";
  if (!rule.includes(`var(${token}`)) fail(`${selector} does not use ${token}`);
  if (!/\n\s+color:\s*var\(--ink\)/.test(rule)) fail(`${selector} does not set its own text colour`);
}
const isChromatic = (value) => {
  const hex = value.match(/#([0-9a-fA-F]{6})/)?.[1];
  if (!hex) return false;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return Math.max(r, g, b) - Math.min(r, g, b) > 24;
};
for (const token of ["--answer-correct", "--answer-wrong"]) {
  const day = tokenIn(rootBlock, token) || css.match(new RegExp(`${token}:\\s*(#[0-9a-fA-F]{6})`))?.[1] || "";
  const night = tokenIn(darkBlock, token) || "";
  if (!isChromatic(day)) fail(`${token} is not a colour in day mode — a wrong answer would read as grey`);
  if (night && !isChromatic(night)) fail(`${token} is not a colour at night`);
}

if (errors.length) {
  console.error(`Presentation validation failed with ${errors.length} issue${errors.length === 1 ? "" : "s"}:`);
  for (const error of errors) console.error(`  • ${error}`);
  process.exit(1);
}
console.log("✓ Print sheet, neutral night mode, symbols, thumbnails, social preview, personalisation, readable labels, night text, answer feedback, the surface ladder, and the optional account layer are intact.");
