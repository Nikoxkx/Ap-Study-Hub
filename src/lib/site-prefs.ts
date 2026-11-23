/**
 * The preference record behind /settings.
 *
 * Everything the visitor can change about the site — colours, type, wallpaper,
 * module order, hero copy, custom blocks, adaptive behaviour, privacy — lives in
 * one versioned object. It is written to localStorage and read by a single
 * provider that turns it into CSS custom properties and data attributes.
 *
 * Three rules make that safe, because the value comes back from storage that the
 * visitor (or a browser extension, or a bug) can write anything into:
 *
 *  1. `revivePrefs` never returns null. It starts from the defaults and copies
 *     only values of the right shape, clamping every number to a range that the
 *     layout can actually survive. A corrupted record degrades to defaults
 *     rather than a blank page.
 *  2. Colour overrides are checked for contrast before they are applied. A
 *     visitor may pick whatever ink they like; if it would be unreadable on the
 *     surface it is adjusted until it is not (see `readableInk`).
 *  3. Nothing here touches the DOM or `window`. The provider does that, which
 *     keeps this module importable from a validator and from the server.
 */

export const PREF_STORAGE_KEY = "aps.prefs.v1";
export const PREFS_VERSION = 1;

/** Modules on the home page that may be hidden, renamed, or reordered. */
export const HOME_MODULES = [
  { id: "hero", label: "Hero", note: "Headline, badge, and the two calls to action" },
  { id: "catalogue", label: "Course catalogue", note: "Ten course cards with counts" },
  { id: "adaptive", label: "For you", note: "Pop quiz, recent activity, limited-time module" },
  { id: "anatomy", label: "How the hub works", note: "The two-column breakdown" },
  { id: "calendar", label: "2027 exam calendar", note: "Every AP exam date in one place" },
  { id: "note", label: "Note from the author", note: "The student note and honest limits" },
  { id: "faq", label: "FAQ", note: "Eight questions, answered" },
] as const;

export type HomeModuleId = (typeof HOME_MODULES)[number]["id"];

export interface CustomBlock {
  id: string;
  kind: "text" | "image" | "link";
  title: string;
  body: string;
  /** `https://` URL for link blocks; validated on the way in and on the way out. */
  url: string;
  /** Asset id in IndexedDB for image blocks. */
  assetId: string;
  /** Where it shows up. Home is the only end-user surface today. */
  placement: "home" | "course";
  /** Optional course slug when placement is `course`. */
  course: string;
}

export interface UserSource {
  id: string;
  course: string;
  title: string;
  url: string;
  note: string;
  type: "official" | "practice" | "video" | "reference" | "reading" | "tool";
  addedAt: number;
}

export interface SitePrefs {
  version: number;
  appearance: {
    /** Wallpaper override — a built-in path or `custom:<assetId>`. */
    wallpaper: "auto" | string;
    wallpaperBlur: number;
    wallpaperDim: number;
    wallpaperFit: "cover" | "contain";
    /** Six-digit hex overrides, or null to keep the shipped token. */
    ink: string | null;
    inkSoft: string | null;
    inkFaint: string | null;
    accent: string | null;
    highlight: string | null;
    glassTint: string | null;
    radius: number;
    fontScale: number;
    lineHeight: number;
    displayFont: "serif" | "sans" | "mono" | "hand";
    uiFont: "sans" | "serif" | "mono" | "hand";
    motion: "full" | "reduced" | "off";
    /** 0–100 on the surface ladder: how much paper covers the painting. */
    surface: number;
    density: "comfortable" | "compact";
    showWallpaper: boolean;
  };
  layout: {
    order: string[];
    hidden: string[];
    renamed: Record<string, string>;
    /** Let the floating masthead melt away when scrolling down. */
    headerAutoHide: boolean;
    wideContent: boolean;
  };
  content: {
    /** Empty string means "use the default or the adaptive variant". */
    heroTitle: string;
    heroSubtitle: string;
    heroBadge: string;
    footerNote: string;
    blocks: CustomBlock[];
  };
  adaptive: {
    enabled: boolean;
    recordEvents: boolean;
    personalizedHero: boolean;
    popQuiz: boolean;
    forYou: boolean;
    limitedTime: boolean;
    dynamicLayout: boolean;
    intensity: "subtle" | "balanced" | "eager";
    displayName: string;
    contact: string;
    contactKind: "email" | "phone" | "none";
    examGoal: string;
    dailyGoalCards: number;
  };
  privacy: {
    rememberSearches: boolean;
    rememberVideos: boolean;
    showProfileBadge: boolean;
  };
  advanced: {
    customCss: string;
    customCssEnabled: boolean;
  };
}

/**
 * The panel "surface" ladder, from clear glass to a solid sheet of paper.
 *
 * One number (0–100) drives the whole ladder: it sets the alpha of every frosted
 * panel, how much blur the panel applies, and — at the clear end — how strongly
 * the label halos come forward. The stops below are only named waypoints on that
 * number; the slider between them is continuous, so nothing is limited to four
 * or five values.
 *
 * The two palettes get different floors (see `surfaceAlpha` in prefs-theme):
 * white paper thins to 0.38 before dark ink stops clearing 4.5:1 over the
 * painting, while a night panel has to stay denser because the painting behind
 * it is lighter than the text.
 */
export const SURFACE_STOPS = [
  { id: "clear", label: "Clear", value: 0, note: "The shipped glass — the thinnest veil that still passes contrast" },
  { id: "semi", label: "Semi", value: 30, note: "A little more paper; the painting quiets down" },
  { id: "frosted", label: "Frosted", value: 60, note: "Dense glass — clear separation from the painting" },
  { id: "solid", label: "Solid", value: 85, note: "Almost opaque; only a tint of the painting survives" },
  { id: "paper", label: "Paper", value: 100, note: "Fully opaque, no blur — a plain printed page" },
] as const;

export type SurfaceStop = (typeof SURFACE_STOPS)[number];
export type SurfaceStopId = SurfaceStop["id"];

/** The stop a stored number is closest to, for highlighting the preset row. */
export function surfaceStopOf(value: number): SurfaceStopId {
  let best: SurfaceStop = SURFACE_STOPS[0];
  for (const stop of SURFACE_STOPS) {
    if (Math.abs(stop.value - value) < Math.abs(best.value - value)) best = stop;
  }
  return best.id;
}

export const HOME_MODULE_ORDER: string[] = HOME_MODULES.map((module) => module.id);

export const DEFAULT_PREFS: SitePrefs = {
  version: PREFS_VERSION,
  appearance: {
    wallpaper: "auto",
    wallpaperBlur: 0,
    wallpaperDim: 0,
    wallpaperFit: "cover",
    ink: null,
    inkSoft: null,
    inkFaint: null,
    accent: null,
    highlight: null,
    glassTint: null,
    radius: 1,
    fontScale: 1,
    lineHeight: 1.6,
    displayFont: "serif",
    uiFont: "sans",
    motion: "full",
    surface: 0,
    density: "comfortable",
    showWallpaper: true,
  },
  layout: {
    order: [...HOME_MODULE_ORDER],
    hidden: [],
    renamed: {},
    headerAutoHide: true,
    wideContent: false,
  },
  content: {
    heroTitle: "",
    heroSubtitle: "",
    heroBadge: "",
    footerNote: "",
    blocks: [],
  },
  adaptive: {
    enabled: true,
    recordEvents: true,
    personalizedHero: true,
    popQuiz: true,
    forYou: true,
    limitedTime: true,
    dynamicLayout: true,
    intensity: "balanced",
    displayName: "",
    contact: "",
    contactKind: "none",
    examGoal: "",
    dailyGoalCards: 20,
  },
  privacy: {
    rememberSearches: true,
    rememberVideos: true,
    showProfileBadge: true,
  },
  advanced: {
    customCss: "",
    customCssEnabled: false,
  },
};

/* --------------------------------------------------------------------------
   Primitive coercion
   -------------------------------------------------------------------------- */

const HEX = /^#[0-9a-f]{6}$/i;

function record(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function clampNumber(value: unknown, min: number, max: number, fallback: number): number {
  const number = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
}

function cell(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function hex(value: unknown): string | null {
  return typeof value === "string" && HEX.test(value.trim()) ? value.trim().toLowerCase() : null;
}

function choice<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return options.includes(value as T) ? (value as T) : fallback;
}

function flag(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

/** Only `http:` and `https:` links are ever rendered as links. */
export function safeUrl(value: string): string | null {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

/* --------------------------------------------------------------------------
   Colour: keep an override readable on the surface it lands on
   -------------------------------------------------------------------------- */

function hexToRgb(value: string): [number, number, number] {
  return [
    parseInt(value.slice(1, 3), 16),
    parseInt(value.slice(3, 5), 16),
    parseInt(value.slice(5, 7), 16),
  ];
}

function rgbToHex(rgb: [number, number, number]): string {
  return `#${rgb.map((channel) => Math.round(channel).toString(16).padStart(2, "0")).join("")}`;
}

function rgbToHsl(rgb: [number, number, number]): [number, number, number] {
  const [r, g, b] = rgb.map((channel) => channel / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  if (max === min) return [0, 0, lightness];
  const delta = max - min;
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue: number;
  if (max === r) hue = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
  else if (max === g) hue = ((b - r) / delta + 2) / 6;
  else hue = ((r - g) / delta + 4) / 6;
  return [hue, saturation, lightness];
}

function hslToRgb(hsl: [number, number, number]): [number, number, number] {
  const [h, s, l] = hsl;
  if (s === 0) return [l * 255, l * 255, l * 255];
  const hue2rgb = (p: number, q: number, t: number) => {
    let value = t;
    if (value < 0) value += 1;
    if (value > 1) value -= 1;
    if (value < 1 / 6) return p + (q - p) * 6 * value;
    if (value < 1 / 2) return q;
    if (value < 2 / 3) return p + (q - p) * (2 / 3 - value) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [hue2rgb(p, q, h + 1 / 3) * 255, hue2rgb(p, q, h) * 255, hue2rgb(p, q, h - 1 / 3) * 255];
}

/** WCAG relative luminance. */
export function luminance(value: string): number {
  const [r, g, b] = hexToRgb(value).map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Nudge `ink` along its own lightness axis until it clears `minimum` contrast
 * against `surface`. Hue and saturation are preserved, so a visitor's chosen
 * red stays red — it just gets darker (or lighter) enough to read.
 *
 * Bounded to 40 steps of 2.5% lightness, which is more than the full range, so
 * the loop always terminates. If the target is unreachable (a mid-grey can only
 * ever reach ~4.6:1 against mid-grey) the closest attempt wins.
 */
export function readableInk(ink: string, surface: string, minimum = 4.5): string {
  if (contrastRatio(ink, surface) >= minimum) return ink;
  const [hue, saturation, lightness] = rgbToHsl(hexToRgb(ink));
  const away = luminance(surface) > 0.4 ? -1 : 1;
  let best = ink;
  let bestRatio = contrastRatio(ink, surface);
  for (let step = 1; step <= 40; step += 1) {
    const nextLightness = Math.min(1, Math.max(0, lightness + away * step * 0.025));
    const candidate = rgbToHex(hslToRgb([hue, saturation, nextLightness]));
    const ratio = contrastRatio(candidate, surface);
    if (ratio > bestRatio) {
      best = candidate;
      bestRatio = ratio;
    }
    if (ratio >= minimum) return candidate;
    if (nextLightness === 0 || nextLightness === 1) break;
  }
  return best;
}

/* --------------------------------------------------------------------------
   Normalisation
   -------------------------------------------------------------------------- */

function reviveBlock(value: unknown): CustomBlock | null {
  const raw = record(value);
  const kind = choice(raw.kind, ["text", "image", "link"] as const, "text");
  const title = cell(raw.title, 80);
  const body = cell(raw.body, 600);
  const url = safeUrl(cell(raw.url, 500)) ?? "";
  const assetId = cell(raw.assetId, 80);
  if (!title && !body && !url && !assetId) return null;
  if (kind === "link" && !url) return null;
  if (kind === "image" && !assetId) return null;
  return {
    id: cell(raw.id, 60) || `block-${Math.random().toString(36).slice(2, 10)}`,
    kind,

    title,
    body,
    url,
    assetId,
    placement: choice(raw.placement, ["home", "course"] as const, "home"),
    course: cell(raw.course, 40),
  };
}

export function reviveSource(value: unknown): UserSource | null {
  const raw = record(value);
  const url = safeUrl(cell(raw.url, 800));
  const title = cell(raw.title, 160);
  if (!url || !title) return null;
  return {
    id: cell(raw.id, 60) || `src-${Math.random().toString(36).slice(2, 10)}`,
    course: cell(raw.course, 40),
    title,
    url,
    note: cell(raw.note, 600),
    type: choice(raw.type, ["official", "practice", "video", "reference", "reading", "tool"] as const, "reference"),
    addedAt: clampNumber(raw.addedAt, 0, Number.MAX_SAFE_INTEGER, Date.now()),
  };
}

export function normalizeOrder(order: unknown): string[] {
  const seen = new Set<string>();
  const clean: string[] = [];
  if (Array.isArray(order)) {
    for (const value of order) {
      if (typeof value !== "string") continue;
      if (!HOME_MODULE_ORDER.includes(value) || seen.has(value)) continue;
      seen.add(value);
      clean.push(value);
    }
  }
  // Anything the visitor never positioned keeps its shipped place at the end, so
  // a module added in a later release is never invisible by omission.
  for (const id of HOME_MODULE_ORDER) if (!seen.has(id)) clean.push(id);
  return clean;
}

export function revivePrefs(value: unknown): SitePrefs {
  const raw = record(value);
  const defaults = DEFAULT_PREFS;
  const appearance = record(raw.appearance);
  const layout = record(raw.layout);
  const content = record(raw.content);
  const adaptive = record(raw.adaptive);
  const privacy = record(raw.privacy);
  const advanced = record(raw.advanced);

  const renamed: Record<string, string> = {};
  for (const [key, text] of Object.entries(record(layout.renamed)).slice(0, 24)) {
    const clean = cell(text, 120);
    if (clean) renamed[cell(key, 40)] = clean;
  }

  const blocks: CustomBlock[] = [];
  if (Array.isArray(content.blocks)) {
    for (const entry of content.blocks.slice(0, 12)) {
      const block = reviveBlock(entry);
      if (block) blocks.push(block);
    }
  }

  return {
    version: PREFS_VERSION,
    appearance: {
      wallpaper:
        typeof appearance.wallpaper === "string" &&
        (appearance.wallpaper === "auto" || /^(custom:[a-z0-9-]{1,80}|\/[a-z0-9._-]+\.(jpe?g|png|webp))$/i.test(appearance.wallpaper))
          ? appearance.wallpaper
          : "auto",
      wallpaperBlur: clampNumber(appearance.wallpaperBlur, 0, 16, 0),
      wallpaperDim: clampNumber(appearance.wallpaperDim, 0, 70, 0),
      wallpaperFit: choice(appearance.wallpaperFit, ["cover", "contain"] as const, "cover"),
      ink: hex(appearance.ink),
      inkSoft: hex(appearance.inkSoft),
      inkFaint: hex(appearance.inkFaint),
      accent: hex(appearance.accent),
      highlight: hex(appearance.highlight),
      glassTint: hex(appearance.glassTint),
      radius: clampNumber(appearance.radius, 0, 2, 1),
      fontScale: clampNumber(appearance.fontScale, 0.85, 1.3, 1),
      lineHeight: clampNumber(appearance.lineHeight, 1.35, 1.95, 1.6),
      displayFont: choice(appearance.displayFont, ["serif", "sans", "mono", "hand"] as const, "serif"),
      uiFont: choice(appearance.uiFont, ["sans", "serif", "mono", "hand"] as const, "sans"),
      motion: choice(appearance.motion, ["full", "reduced", "off"] as const, "full"),
      // Older records stored a 0.25–1.6 multiplier; rescale it onto the ladder
      // so a returning visitor keeps roughly the glass they had.
      surface: clampNumber(
        typeof appearance.surface === "number"
          ? appearance.surface
          : Number(appearance.glassOpacity) * 22,
        0,
        100,
        0,
      ),
      density: choice(appearance.density, ["comfortable", "compact"] as const, "comfortable"),
      showWallpaper: flag(appearance.showWallpaper, true),
    },
    layout: {
      order: normalizeOrder(layout.order),
      hidden: Array.isArray(layout.hidden)
        ? layout.hidden.filter((id): id is string => typeof id === "string" && HOME_MODULE_ORDER.includes(id)).slice(0, 12)
        : [],
      renamed,
      headerAutoHide: flag(layout.headerAutoHide, true),
      wideContent: flag(layout.wideContent, false),
    },
    content: {
      heroTitle: cell(content.heroTitle, 140),
      heroSubtitle: cell(content.heroSubtitle, 320),
      heroBadge: cell(content.heroBadge, 120),
      footerNote: cell(content.footerNote, 240),
      blocks,
    },
    adaptive: {
      enabled: flag(adaptive.enabled, true),
      recordEvents: flag(adaptive.recordEvents, true),
      personalizedHero: flag(adaptive.personalizedHero, true),
      popQuiz: flag(adaptive.popQuiz, true),
      forYou: flag(adaptive.forYou, true),
      limitedTime: flag(adaptive.limitedTime, true),
      dynamicLayout: flag(adaptive.dynamicLayout, true),
      intensity: choice(adaptive.intensity, ["subtle", "balanced", "eager"] as const, "balanced"),
      displayName: cell(adaptive.displayName, 60),
      contact: cell(adaptive.contact, 120),
      contactKind: choice(adaptive.contactKind, ["email", "phone", "none"] as const, "none"),
      examGoal: /^\d{4}-\d{2}-\d{2}$/.test(cell(adaptive.examGoal, 10)) ? cell(adaptive.examGoal, 10) : "",
      dailyGoalCards: Math.round(clampNumber(adaptive.dailyGoalCards, 5, 200, 20)),
    },
    privacy: {
      rememberSearches: flag(privacy.rememberSearches, true),
      rememberVideos: flag(privacy.rememberVideos, true),
      showProfileBadge: flag(privacy.showProfileBadge, true),
    },
    advanced: {
      customCss: sanitizeCustomCss(cell(advanced.customCss, 20000)),
      customCssEnabled: flag(advanced.customCssEnabled, false),
    },
  };
}

/**
 * Custom CSS is powerful and therefore mildly dangerous. This drops the four
 * constructs that turn a stylesheet into something else: remote loads
 * (`@import`, `url()` — which would also be a tracking pixel and could exfiltrate
 * a fragment of the page via a crafted URL), script-ish legacy hooks
 * (`expression`, `behavior`, `-moz-binding`), and raw markup.
 *
 * It is a guard against accidents, not a security boundary: the sheet still runs
 * in this page's own stylesheet with the visitor's own privileges, which is
 * exactly why it is opt-in, per-browser, and one click from being switched off.
 */
export function sanitizeCustomCss(value: string): string {
  return value
    .replace(/<\/?[a-z][^>]*>/gi, "")
    .replace(/@import[^;]*;?/gi, "")
    .replace(/url\s*\([^)]*\)/gi, "none")
    .replace(/expression\s*\([^)]*\)/gi, "none")
    .replace(/-moz-binding\s*:[^;]*;?/gi, "")
    .replace(/behavior\s*:[^;]*;?/gi, "")
    .replace(/javascript\s*:/gi, "")
    .slice(0, 20000);
}
