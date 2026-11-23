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
  readableInk,
  sanitizeCustomCss,
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

export interface PrefsAttributes {
  motion: string;
  density: string;
  wallpaperFit: string;
  wallpaper: string;
  glass: string;
  wide: string;
  header: string;
  scale: string;
}

/** Values the provider writes to `document.documentElement.dataset`. */
export function prefsAttributes(prefs: SitePrefs): PrefsAttributes {
  return {
    motion: prefs.appearance.motion,
    density: prefs.appearance.density,
    wallpaperFit: prefs.appearance.wallpaperFit,
    wallpaper: prefs.appearance.showWallpaper ? "on" : "off",
    glass: prefs.appearance.glassOpacity < 0.75 ? "thin" : "solid",
    wide: prefs.layout.wideContent ? "on" : "off",
    header: prefs.layout.headerAutoHide ? "auto" : "pinned",
    scale: String(prefs.appearance.fontScale),
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
    const tint = appearance.glassTint ? hexToRgbArray(appearance.glassTint) : [glassBase[0], glassBase[1], glassBase[2]];
    const glassAlpha = Math.min(
      0.92,
      Math.max(0.1, glassBase[3] * appearance.glassOpacity),
    );
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
