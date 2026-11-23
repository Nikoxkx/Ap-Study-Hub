/**
 * Turns a `SitePrefs` record into the two things a browser understands:
 * a stylesheet and a handful of `data-*` attributes on `<html>`.
 *
 * Keeping this as a pure string builder (no DOM) means the validator can assert
 * that every override a visitor can pick still produces a readable page, and the
 * provider stays a thin "write the string into a <style> element" component.
 *
 * The stylesheet is deliberately two blocks, not one:
 *
 *   :root      — the day palette, then `html.dark` — the night palette.
 *
 * The site switches themes with a class, and its dark tokens are declared
 * directly on `.dark` (not derived from the light ones), so overriding
 * `--color-ink` on `:root` would silently do nothing at night. Emitting both
 * blocks and letting specificity pick the winner keeps day and night honest, and
 * lets each palette get its own contrast correction — a navy that reads on paper
 * needs to be a pale blue on charcoal.
 */
import {
  HOME_MODULE_ORDER,
  contrastRatio,
  readableInk,
  sanitizeCustomCss,
  surfaceStopOf,
  type SitePrefs,
} from "./site-prefs";

/** The four classroom paintings the site ships with. */
export const WALLPAPERS = [
  { path: "/bg-music-class.jpg", label: "Music room", note: "Warm, sunlit, the original" },
  { path: "/bg-class.jpg", label: "Classroom", note: "Wide desks and a green board" },
  { path: "/bg-class2.jpg", label: "Second classroom", note: "Cooler light, quieter" },
  { path: "/bg-corridor.jpg", label: "Corridor", note: "Long, empty, good for reading" },
] as const;

const FONT_STACKS = {
  serif: '"Newsreader", Georgia, "Times New Roman", serif',
  sans: '"Public Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
  mono: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
  hand: '"Kalam", "Segoe Print", "Bradley Hand", cursive',
} as const;

/** Approximate surface the text actually lands on, per theme. */
const LIGHT_SURFACE = "#f1efe9";
const DARK_SURFACE = "#141414";

/** Shipped tokens, used as the base an override is corrected against. */
export const BASE_TOKENS = {
  light: { ink: "#0f0f0f", inkSoft: "#242424", inkFaint: "#3d3d3d", mark: "#0f0f0f", highlight: "#ffe08a", glass: [226, 226, 226, 0.44] as const },
  dark: { ink: "#ededed", inkSoft: "#c4c4c4", inkFaint: "#9a9a9a", mark: "#ededed", highlight: "#3a3320", glass: [18, 18, 18, 0.55] as const },
};

function rgba(rgb: readonly [number, number, number], alpha: number): string {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${Number(alpha.toFixed(3))})`;
}

function hexToRgbArray(value: string): [number, number, number] {
  return [
    parseInt(value.slice(1, 3), 16),
    parseInt(value.slice(3, 5), 16),
    parseInt(value.slice(5, 7), 16),
  ];
}

/** A highlight wash: the chosen colour at low alpha so text on top still reads. */
function washOf(value: string, theme: "light" | "dark"): string {
  const [r, g, b] = hexToRgbArray(value);
  return rgba([r, g, b], theme === "light" ? 0.34 : 0.32);
}


/**
 * The thinnest a panel may get in each palette.
 *
 * Sampled from the shipped paintings: the darkest patch is a shadowed wall near
 * #39242d, the brightest is sunlit plaster near #e1ebfa.
 *
 *   light 0.44 → ink #0b0b0b over the dark patch lands at ~4.7:1
 *   dark  0.56 → ink #f7f7f7 over the bright patch lands at ~4.6:1
 *
 * Those are the shipped glass values themselves: the site has always sat on the
 * legibility floor. The ladder therefore runs *up* from there — 0 is the look
 * the site ships with, 100 is a solid page — which is the honest range. There is
 * no "fully transparent" stop because text over bare painting does not pass.
 */
const SURFACE_FLOOR = { light: 0.44, dark: 0.56 } as const;


/**
 * Keep a hand-picked glass tint readable, the same way `readableInk` keeps a
 * hand-picked text colour readable.
 *
 * The tint is a *colour*, but what the text actually sits on is the tint
 * composited over the painting behind the panel. A visitor who picks charcoal as
 * the glass tint in the day palette would otherwise get near-black text on a
 * near-black panel. So the tint is nudged along its own lightness axis toward
 * paper (day) or ink (night) until the composite clears 4.6:1 against that
 * palette's ink, measured over the worst patch of the shipped paintings.
 */
const WORST_BEHIND = { light: [57, 36, 45], dark: [225, 235, 250] } as const;
const INK_ON_SURFACE = { light: "#0b0b0b", dark: "#f7f7f7" } as const;

export function readableTint(
  tint: readonly [number, number, number],
  alpha: number,
  theme: "light" | "dark",
): [number, number, number] {
  const behind = WORST_BEHIND[theme];
  const ink = INK_ON_SURFACE[theme];
  const target = theme === "light" ? 255 : 0;
  const toHex = (rgb: readonly number[]) =>
    `#${rgb.map((channel) => Math.round(Math.min(255, Math.max(0, channel))).toString(16).padStart(2, "0")).join("")}`;
  for (let step = 0; step <= 20; step += 1) {
    const mix = step / 20;
    const mixed = tint.map((channel) => channel + (target - channel) * mix);
    const composite = mixed.map((channel, index) => alpha * channel + (1 - alpha) * behind[index]);
    if (contrastRatio(toHex(composite), ink) >= 4.6) {
      return [Math.round(mixed[0]), Math.round(mixed[1]), Math.round(mixed[2])];
    }
  }
  return theme === "light" ? [255, 255, 255] : [0, 0, 0];
}

/** Map the 0–100 ladder onto a real panel alpha for one palette. */
export function surfaceAlpha(percent: number, theme: "light" | "dark"): number {
  const turns = Math.min(1, Math.max(0, percent / 100));
  const floor = SURFACE_FLOOR[theme];
  return Number((floor + (1 - floor) * Math.pow(turns, 1.6)).toFixed(3));
}

/** Thinner panels blur harder, so the painting softens instead of getting busy. */
export function surfaceBlur(percent: number): number {
  const turns = Math.min(1, Math.max(0, percent / 100));
  return Number((16 - 10 * turns).toFixed(1));
}

export interface PrefsAttributes {
  motion: string;
  density: string;
  wallpaperFit: string;
  wallpaper: string;
  glass: string;
  wide: string;
  header: string;
  scale: string;
  surface: string;
}

/** Values the provider writes to `document.documentElement.dataset`. */
export function prefsAttributes(prefs: SitePrefs): PrefsAttributes {
  return {
    motion: prefs.appearance.motion,
    density: prefs.appearance.density,
    wallpaperFit: prefs.appearance.wallpaperFit,
    wallpaper: prefs.appearance.showWallpaper ? "on" : "off",
    glass: prefs.appearance.surface < 55 ? "thin" : "solid",
    wide: prefs.layout.wideContent ? "on" : "off",
    header: prefs.layout.headerAutoHide ? "auto" : "pinned",
    scale: String(prefs.appearance.fontScale),
    surface: surfaceStopOf(prefs.appearance.surface),
  };
}

/**
 * Build the override stylesheet.
 *
 * `surface` values are what each palette's text sits on: the glass panels over
 * the classroom paintings. Every custom ink is passed through `readableInk`
 * against that surface, so a visitor cannot accidentally choose an unreadable
 * page — the colour is honoured, just nudged until it clears 4.5:1.
 *
 * Custom CSS, when enabled, is appended last so it can win against everything
 * above it — that is the point of the box — and is sanitised first.
 */
export function buildPrefsCss(prefs: SitePrefs): string {
  const { appearance, advanced } = prefs;
  const lines: string[] = [];

  const palettes = [
    {
      selector: ":root",
      theme: "light" as const,
      base: BASE_TOKENS.light,
      ink: appearance.ink ?? BASE_TOKENS.light.ink,
      inkSoft: appearance.inkSoft ?? BASE_TOKENS.light.inkSoft,
      inkFaint: appearance.inkFaint ?? BASE_TOKENS.light.inkFaint,
      mark: appearance.accent ?? BASE_TOKENS.light.mark,
      highlight: appearance.highlight ?? BASE_TOKENS.light.highlight,
    },
    {
      selector: "html.dark",
      theme: "dark" as const,
      base: BASE_TOKENS.dark,
      ink: appearance.ink
        ? readableInk(appearance.ink, DARK_SURFACE, 4.5)
        : BASE_TOKENS.dark.ink,
      inkSoft: appearance.inkSoft
        ? readableInk(appearance.inkSoft, DARK_SURFACE, 4.5)
        : BASE_TOKENS.dark.inkSoft,
      inkFaint: appearance.inkFaint
        ? readableInk(appearance.inkFaint, DARK_SURFACE, 4.5)
        : BASE_TOKENS.dark.inkFaint,
      mark: appearance.accent
        ? readableInk(appearance.accent, DARK_SURFACE, 4.5)
        : BASE_TOKENS.dark.mark,
      highlight: appearance.highlight ?? BASE_TOKENS.dark.highlight,
    },
  ];

  for (const palette of palettes) {
    const glassBase = palette.base.glass;
    const glassAlpha = surfaceAlpha(appearance.surface, palette.theme);
    const rawTint: [number, number, number] = appearance.glassTint
      ? hexToRgbArray(appearance.glassTint)
      : [glassBase[0], glassBase[1], glassBase[2]];
    const tint = readableTint(rawTint, glassAlpha, palette.theme);
    const blur = surfaceBlur(appearance.surface);
    const isNight = palette.theme === "dark";
    // Night paper is the same material as the night panels, so it follows the
    // ladder too. Day paper is deliberately transparent by default (the glass
    // carries the day colour), so it is only pinned at the opaque end.
    // The paper tokens were tuned separately from the glass, so each keeps its
    // shipped value as its own floor and only moves up with the ladder. `lift`
    // is 0 at the bottom stop and 1 at Paper, which lets every token keep the
    // exact colour it shipped with until the visitor actually asks for more.
    const floor = SURFACE_FLOOR[palette.theme];
    const lift = floor >= 1 ? 0 : Math.max(0, (glassAlpha - floor) / (1 - floor));
    const paperAlpha = isNight ? Math.max(0.66, glassAlpha) : lift >= 1 ? 1 : 0;
    const paperRaisedAlpha = (isNight ? 0.58 : 0.26) + ((isNight ? 0.42 : 0.34) * lift);
    const paperSunkAlpha = (isNight ? 0.62 : 0.18) + ((isNight ? 0.38 : 0.32) * lift);
    const radius = appearance.radius;
    lines.push(
      `${palette.selector} {`,
      `  --ink: ${readableInk(palette.ink, palette.theme === "light" ? LIGHT_SURFACE : DARK_SURFACE)};`,
      `  --ink-soft: ${readableInk(palette.inkSoft, palette.theme === "light" ? LIGHT_SURFACE : DARK_SURFACE)};`,
      `  --ink-faint: ${readableInk(palette.inkFaint, palette.theme === "light" ? LIGHT_SURFACE : DARK_SURFACE)};`,
      `  --mark: ${palette.mark};`,
      `  --mark-wash: ${washOf(palette.highlight, palette.theme)};`,
      `  --aps-highlight: ${palette.highlight};`,
      `  --aps-highlight-wash: ${washOf(palette.highlight, palette.theme)};`,
      `  --glass-bg: ${rgba([tint[0], tint[1], tint[2]], glassAlpha)};`,
      `  --surface-blur: ${blur}px;`,
      isNight
        ? `  --paper: ${rgba([15, 15, 15], paperAlpha)};`
        : `  --paper: ${paperAlpha >= 1 ? "#ffffff" : "transparent"};`,
      isNight
        ? `  --paper-raised: ${rgba([28, 28, 28], paperRaisedAlpha)};`
        : `  --paper-raised: ${rgba([255, 255, 255], Math.min(0.6, paperRaisedAlpha))};`,
      isNight
        ? `  --paper-sunk: ${rgba([8, 8, 8], paperSunkAlpha)};`
        : `  --paper-sunk: ${rgba([255, 255, 255], Math.min(0.5, paperSunkAlpha))};`,
      `  --radius-edge: ${Number((8 * radius).toFixed(1))}px;`,
      `  --radius-cut: ${Number((17 * radius).toFixed(1))}px;`,
      `  --font-display: ${FONT_STACKS[appearance.displayFont]};`,
      `  --font-ui: ${FONT_STACKS[appearance.uiFont]};`,
      "}",
    );
  }

  lines.push(
    `html { font-size: ${Number((100 * appearance.fontScale).toFixed(1))}%; }`,
    `body { line-height: ${appearance.lineHeight}; }`,
    // The highlight is also the text-selection colour: it is the one place the
    // visitor's accent is guaranteed to be seen.
    `::selection { background: var(--aps-highlight); color: #101010; }`,
    `html[data-motion="off"] *,`,
    `html[data-motion="off"] *::before,`,
    `html[data-motion="off"] *::after {`,
    "  animation-duration: 1ms !important;",
    "  animation-delay: 0ms !important;",
    "  transition-duration: 1ms !important;",
    "  scroll-behavior: auto !important;",
    "}",
    `html[data-motion="reduced"] *,`,
    `html[data-motion="reduced"] *::before,`,
    `html[data-motion="reduced"] *::after {`,
    "  animation-duration: 200ms !important;",
    "  animation-iteration-count: 1 !important;",
    "}",
    `html[data-density="compact"] .wrap { --measure: 74ch; }`,
    // Paper is a printed page, not glass: drop the blur as well as the alpha.
    `html[data-surface="paper"] :is(.glass-box, .sheet, .sheet-tabbed) { backdrop-filter: none; -webkit-backdrop-filter: none; }`,
    // The ladder's top half is dense enough to take a heavier panel border
    // without it reading as a white outline on white.
    `html[data-surface="solid"] :is(.glass-box, .sheet, .sheet-tabbed),`,
    `html[data-surface="paper"] :is(.glass-box, .sheet, .sheet-tabbed) { border-color: var(--rule); }`,
    `html[data-wallpaper="off"] .page-wallpaper { display: none; }`,
    `html[data-wide="on"] .wrap { max-width: 82rem; }`,
    // A pinned masthead keeps the auto-hide component mounted but overrides the
    // state it sets, so scrolling still works and the reveal-on-hover path is
    // simply never needed.
    `html[data-header="pinned"] .site-header[data-hidden="true"] { opacity: 1; pointer-events: auto; }`,
    `html[data-header="pinned"] .site-header { transition: none; }`,
    // Radius and density are token-level: the glass surfaces read --radius-cut.
    `.glass-box, .sheet, .sheet-tabbed, .glass-box-interactive { border-radius: var(--radius-cut); }`,
    `html[data-density="compact"] .glass-box { padding: 1rem; }`,
  );

  if (advanced.customCssEnabled && advanced.customCss.trim()) {
    lines.push("/* visitor custom css */", sanitizeCustomCss(advanced.customCss));
  }

  return lines.join("\n");
}

/** Order for the home page, with hidden modules removed. */
export function visibleHomeModules(prefs: SitePrefs): string[] {
  const hidden = new Set(prefs.layout.hidden);
  return HOME_MODULE_ORDER.filter((id) => !hidden.has(id)).length === 0
    ? [...HOME_MODULE_ORDER]
    : prefs.layout.order.filter((id) => !hidden.has(id));
}

/** The `order` CSS value for a module id. */
export function moduleOrder(prefs: SitePrefs, id: string): number {
  const index = prefs.layout.order.indexOf(id);
  return index === -1 ? HOME_MODULE_ORDER.indexOf(id) : index;
}

export type { SitePrefs };
