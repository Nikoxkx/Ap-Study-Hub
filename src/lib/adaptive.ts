/**
 * The adaptive layer: a private, on-device model of what this visitor actually
 * does, and the small decisions the site makes from it.
 *
 * Design constraints, in order:
 *
 *  1. **Nothing leaves the device.** There is no endpoint, no cookie, no
 *     fingerprint, no third-party script. Events are appended to localStorage,
 *     read back by this module, and turned into numbers that only ever render
 *     into this visitor's own page. Deleting site data deletes the model.
 *  2. **It must be explainable.** Every personalised element can say why it is
 *     there ("because you opened three AP Calc videos"), which is only possible
 *     if the profile is a handful of legible counters rather than a black box.
 *  3. **It must be off-able.** `adaptive.enabled` and `privacy.*` gate both the
 *     recording and the rendering; with them off the site is exactly the static
 *     site it was before.
 *  4. **It must not flicker the layout.** Everything here is a pure function of
 *     (events, clock), so the same day produces the same hero, quiz, and module
 *     set on every load — variation comes from the calendar, not from
 *     randomness on each render.
 */
import { PREF_STORAGE_KEY, revivePrefs, type SitePrefs } from "./site-prefs";

export const ADAPTIVE_STORAGE_KEY = "aps.adaptive.v1";
export const ADAPTIVE_VERSION = 1;
const MAX_EVENTS = 400;

export type AdaptiveKind =
  | "search"
  | "video"
  | "card"
  | "practice"
  | "quiz"
  | "lesson"
  | "course"
  | "studio"
  | "link";

export interface AdaptiveEvent {
  t: number;
  kind: AdaptiveKind;
  subject?: string;
  value?: string;
}

export interface AdaptiveState {
  version: number;
  firstSeen: number;
  events: AdaptiveEvent[];
}

export const EMPTY_ADAPTIVE: AdaptiveState = { version: ADAPTIVE_VERSION, firstSeen: 0, events: [] };

const KINDS: AdaptiveKind[] = [
  "search",
  "video",
  "card",
  "practice",
  "quiz",
  "lesson",
  "course",
  "studio",
  "link",
];

/** How much one action says about a subject. A video is a stronger signal than a click. */
const WEIGHT: Record<AdaptiveKind, number> = {
  search: 0.5,
  video: 2,
  card: 1.2,
  practice: 1.5,
  quiz: 1.6,
  lesson: 2.2,
  course: 0.8,
  studio: 1.5,
  link: 0.3,
};

const HALF_LIFE_DAYS = 10;
const DAY = 86_400_000;

/* --------------------------------------------------------------------------
   Store
   -------------------------------------------------------------------------- */

/**
 * Same-tab change notification.
 *
 * `useStoredState` listens for the browser's `storage` event, which by
 * specification only fires in *other* documents. Recording an action happens
 * outside React (a click handler deep in a player), so after writing we announce
 * the key ourselves. Dispatching a real StorageEvent rather than inventing a
 * second listener registry means there is exactly one way the interface hears
 * about stored changes, and React sees them for free.
 */
function announce() {
  try {
    window.dispatchEvent(new StorageEvent("storage", { key: ADAPTIVE_STORAGE_KEY }));
  } catch {
    // Older engines without a StorageEvent constructor: the write still applied,
    // the current page just will not re-render until its next navigation.
  }
}

export function reviveAdaptive(value: unknown): AdaptiveState {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return EMPTY_ADAPTIVE;
  const raw = value as Record<string, unknown>;
  const events: AdaptiveEvent[] = [];
  if (Array.isArray(raw.events)) {
    for (const entry of raw.events.slice(-MAX_EVENTS)) {
      if (typeof entry !== "object" || entry === null) continue;
      const event = entry as Record<string, unknown>;
      const kind = event.kind as AdaptiveKind;
      if (!KINDS.includes(kind)) continue;
      const t = typeof event.t === "number" && Number.isFinite(event.t) ? event.t : 0;
      if (t <= 0) continue;
      events.push({
        t,
        kind,
        subject: typeof event.subject === "string" ? event.subject.slice(0, 40) : undefined,
        value: typeof event.value === "string" ? event.value.slice(0, 120) : undefined,
      });
    }
  }
  return {
    version: ADAPTIVE_VERSION,
    firstSeen: typeof raw.firstSeen === "number" && raw.firstSeen > 0 ? raw.firstSeen : events[0]?.t ?? 0,
    events,
  };
}

export function readAdaptive(): AdaptiveState {
  try {
    const raw = window.localStorage.getItem(ADAPTIVE_STORAGE_KEY);
    if (!raw) return EMPTY_ADAPTIVE;
    return reviveAdaptive(JSON.parse(raw));
  } catch {
    return EMPTY_ADAPTIVE;
  }
}

function currentPrefs(): SitePrefs {
  try {
    const raw = window.localStorage.getItem(PREF_STORAGE_KEY);
    return revivePrefs(raw ? JSON.parse(raw) : {});
  } catch {
    return revivePrefs({});
  }
}

/** Reads the preferences without React, for the recording path. */
function recordingAllowed(prefs: SitePrefs, kind: AdaptiveKind): boolean {
  if (!prefs.adaptive.enabled || !prefs.adaptive.recordEvents) return false;
  if (kind === "search" && !prefs.privacy.rememberSearches) return false;
  if (kind === "video" && !prefs.privacy.rememberVideos) return false;
  return true;
}

/**
 * Append one action. Safe to call from anywhere: it no-ops when recording is
 * switched off, swallows quota errors, and never throws into a click handler.
 *
 * Returns the event that was stored, or null when nothing was recorded — the
 * caller does not need the result, but validators and tests use it.
 */
export function recordAdaptive(
  kind: AdaptiveKind,
  data: { subject?: string; value?: string } = {},
): AdaptiveEvent | null {
  if (typeof window === "undefined") return null;
  const prefs = currentPrefs();
  if (!recordingAllowed(prefs, kind)) return null;

  const event: AdaptiveEvent = {
    t: Date.now(),
    kind,
    subject: data.subject?.slice(0, 40),
    value: data.value?.slice(0, 120),
  };

  const state = readAdaptive();
  const events = [...state.events, event].slice(-MAX_EVENTS);
  const next: AdaptiveState = {
    version: ADAPTIVE_VERSION,
    firstSeen: state.firstSeen || event.t,
    events,
  };

  try {
    window.localStorage.setItem(ADAPTIVE_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Quota or disabled storage: nothing was persisted, so nothing is announced.
    return event;
  }
  announce();
  return event;
}

export function clearAdaptive() {
  try {
    window.localStorage.removeItem(ADAPTIVE_STORAGE_KEY);
  } catch {
    // Nothing to clear.
  }
  announce();
}

/* --------------------------------------------------------------------------
   The profile
   -------------------------------------------------------------------------- */

export interface SubjectAffinity {
  slug: string;
  score: number;
  events: number;
  lastAt: number;
}

export interface AdaptiveProfile {
  /** Meaningful actions (weight > 0.9) recorded. */
  signals: number;
  events: number;
  engaged: boolean;
  daysActive: number;
  streak: number;
  lastActive: number | null;
  hour: number | null;
  affinity: SubjectAffinity[];
  topSubject: string | null;
  topScore: number;
  secondSubject: string | null;
  confidence: number;
  recentSearches: string[];
  watchedVideos: string[];
  momentum: "new" | "steady" | "surging" | "returning" | "quiet";
  dayKey: string;
}

function dayKeyOf(date: Date): string {
  // Local calendar day, so "today's quiz" changes at the visitor's midnight.
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function localDayNumber(t: number): number {
  const date = new Date(t);
  return Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / DAY,
  );
}

export function buildProfile(state: AdaptiveState, now = Date.now()): AdaptiveProfile {
  const dayKey = dayKeyOf(new Date(now));
  const scores = new Map<string, { score: number; events: number; lastAt: number }>();
  const days = new Set<number>();
  const hours = new Map<number, number>();
  const searches: string[] = [];
  const videos: string[] = [];
  let signals = 0;

  for (const event of state.events) {
    days.add(localDayNumber(event.t));
    const ageDays = Math.max(0, (now - event.t) / DAY);
    const weight = WEIGHT[event.kind] * 0.5 ** (ageDays / HALF_LIFE_DAYS);
    if (WEIGHT[event.kind] >= 0.9) signals += 1;

    const hour = new Date(event.t).getHours();
    hours.set(hour, (hours.get(hour) ?? 0) + 1);

    if (event.kind === "search" && event.value) searches.unshift(event.value);
    if (event.kind === "video" && event.value) videos.unshift(event.value);

    if (!event.subject) continue;
    const current = scores.get(event.subject) ?? { score: 0, events: 0, lastAt: 0 };
    current.score += weight;
    current.events += 1;
    current.lastAt = Math.max(current.lastAt, event.t);
    scores.set(event.subject, current);
  }

  const affinity = [...scores.entries()]
    .map(([slug, value]) => ({ slug, ...value, score: Number(value.score.toFixed(2)) }))
    .sort((a, b) => b.score - a.score);

  // Streak: consecutive calendar days with at least one event, counted back from
  // today or yesterday (a streak survives until midnight tonight).
  const today = localDayNumber(now);
  let streak = 0;
  if (days.size > 0) {
    let cursor = days.has(today) ? today : days.has(today - 1) ? today - 1 : null;
    while (cursor !== null && days.has(cursor)) {
      streak += 1;
      cursor -= 1;
    }
  }

  const lastActive = state.events.length ? state.events[state.events.length - 1].t : null;
  const lastWeek = state.events.filter((event) => now - event.t <= 7 * DAY).length;
  const previousWeek = state.events.filter(
    (event) => now - event.t > 7 * DAY && now - event.t <= 14 * DAY,
  ).length;

  const momentum: AdaptiveProfile["momentum"] =
    state.events.length === 0
      ? "new"
      : lastActive !== null && now - lastActive > 21 * DAY
        ? "returning"
        : lastWeek >= previousWeek * 1.6 && lastWeek >= 4
          ? "surging"
          : lastWeek === 0
            ? "quiet"
            : "steady";

  const top = affinity[0] ?? null;
  const favouriteHour =
    hours.size > 0 ? [...hours.entries()].sort((a, b) => b[1] - a[1])[0][0] : null;

  return {
    signals,
    events: state.events.length,
    engaged: signals >= 6,
    daysActive: days.size,
    streak,
    lastActive,
    hour: favouriteHour,
    affinity,
    topSubject: top?.slug ?? null,
    topScore: top?.score ?? 0,
    secondSubject: affinity[1]?.slug ?? null,
    confidence: Math.min(1, signals / 40),
    recentSearches: [...new Set(searches)].slice(0, 6),
    watchedVideos: [...new Set(videos)].slice(0, 8),
    momentum,
    dayKey,
  };
}

/* --------------------------------------------------------------------------
   Deterministic selection
   -------------------------------------------------------------------------- */

/** FNV-1a, so a day + intent always produces the same choice. */
export function hash(seed: string): number {
  let value = 0x811c9dc5;
  for (let index = 0; index < seed.length; index += 1) {
    value ^= seed.charCodeAt(index);
    value = Math.imul(value, 0x01000193);
  }
  return value >>> 0;
}

function pick<T>(seed: string, options: readonly T[]): T {
  return options[hash(seed) % options.length];
}

export interface HeroCopy {
  badge: string;
  title: string;
  subtitle: string;
  /** Why this copy was chosen — shown in settings, never on the hero itself. */
  reason: string;
}

/**
 * The headline. There is always a plain, always-true variant; personal ones only
 * appear once the visitor has actually done enough for them to be accurate, and
 * only when they asked for them.
 */
export function chooseHero(
  profile: AdaptiveProfile,
  options: {
    prefs: SitePrefs;
    totals: { courses: number; units: number; paragraphs: number; flashcards: number; questions: number };
    familiarOf: (slug: string) => string;
    hour?: number;
  },
): HeroCopy {
  const { prefs, totals, familiarOf } = options;
  const hour = options.hour ?? new Date().getHours();
  const daypart = hour < 5 ? "late night" : hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  const generic: HeroCopy[] = [
    {
      badge: `Built by a student · Free since 2025 · ${totals.courses} AP courses`,
      title: "Learn ten AP subjects deeply — on a quieter kind of study hub.",
      subtitle: `${totals.units} lessons and ${totals.paragraphs} teaching paragraphs explain the why behind every unit. Recall cards, original practice, marked essays and FRQs, and unit videos help you earn a score your college may accept for credit — with zero accounts or paywalls.`,
      reason: "The default headline: no personal data needed.",
    },
    {
      badge: `Free · No account · ${totals.units} cited lessons`,
      title: "The notes you wish you had in September.",
      subtitle: `Every unit explained in full, with the sources attached: ${totals.flashcards} recall cards, ${totals.questions} original questions, and worked examples you can cover up and retry.`,
      reason: "Second default headline, rotated by date.",
    },
    {
      badge: `${totals.courses} courses · ${totals.questions} original questions`,
      title: "Read it. Recall it. Then prove it on paper.",
      subtitle: "Deep notes, spaced recall, and a full-length interim assessment for every course — with rubric grading that shows the sentence that earned each point.",
      reason: "Third default headline, rotated by date.",
    },
  ];

  const personalised: HeroCopy[] = [];
  const top = profile.topSubject;
  if (top) {
    const familiar = familiarOf(top);
    personalised.push({
      badge: `Good ${daypart} · ${familiar} is your focus`,
      title: `${familiar} keeps pulling you back. Good.`,
      subtitle: `Pick up where you stopped: the unit notes and worked examples are laid out in order, and the practice set underneath them links every miss back to the paragraph that explains it.`,
      reason: `You have the most activity in ${familiar} (${profile.affinity[0].events} signals).`,
    });
  }
  if (profile.streak >= 2) {
    personalised.push({
      badge: `${profile.streak}-day streak · keep it alive`,
      title: `${profile.streak} days in a row. Today's card is the one that counts.`,
      subtitle: "A short review is enough to hold the streak: five due cards, one explanation in your own words, and you are done.",
      reason: `You have studied ${profile.streak} days in a row.`,
    });
  }
  if (profile.momentum === "returning") {
    personalised.push({
      badge: "Welcome back · nothing was lost",
      title: "Your place is still here — the desk keeps it for you.",
      subtitle: "Due cards, missed questions, and half-finished drafts are exactly where you left them. Start with the review queue; it is built from what you actually got wrong.",
      reason: "Your last visit was more than three weeks ago.",
    });
  }
  if (profile.momentum === "surging") {
    personalised.push({
      badge: "You are moving faster this week",
      title: "Twice the work of last week. Let's finish the unit.",
      subtitle: "You are close enough that one more focused session finishes the unit and puts the whole thing into the review queue at the right intervals.",
      reason: "Your activity this week is well above last week's.",
    });
  }

  if (!prefs.adaptive.personalizedHero || !prefs.adaptive.enabled || !profile.engaged || personalised.length === 0) {
    return pick(`hero:${profile.dayKey}`, generic);
  }

  // Personal copy rotates daily among the variants that currently apply, so the
  // page is not frozen on one line forever, but never changes mid-session.
  return pick(`hero:${profile.dayKey}:${profile.topSubject ?? "none"}`, personalised);
}

export interface SpotLight {
  id: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  subject: string | null;
  /** Days remaining in the window, for the "closes in" line. */
  daysLeft: number;
}

interface SpotlightSeed {
  id: string;
  title: string;
  body: string;
  href: (slug: string) => string;
  cta: string;
  subject: string | null;
}

const SPOTLIGHTS: SpotlightSeed[] = [
  {
    id: "calc-graphs",
    title: "This week: sketch before you solve",
    body: "Open the AP Calc studio, put the function on the graph, and predict the answer before you differentiate. Graphs make the algebra checkable.",
    href: (slug) => `/course/${slug}/studio?tab=lab`,
    cta: "Open the graph lab",
    subject: "ap-calc",
  },
  {
    id: "ush-sources",
    title: "This week: one primary source a day",
    body: "APUSH free-response rewards documents you can actually quote. Read one source, write one sentence about its point of view, repeat tomorrow.",
    href: (slug) => `/course/${slug}/resources`,
    cta: "Open the source list",
    subject: "apush",
  },
  {
    id: "bio-diagrams",
    title: "This week: draw the pathway from memory",
    body: "Close the notes, draw the pathway, then compare. The gap between your drawing and the diagram is the exact thing to review tonight.",
    href: (slug) => `/course/${slug}/notes`,
    cta: "Open biology notes",
    subject: "ap-bio",
  },
  {
    id: "lang-synthesis",
    title: "This week: build one synthesis packet",
    body: "Three sources, one argument, forty minutes. The writing studio times it and marks the argument row by row when you are done.",
    href: (slug) => `/course/${slug}/studio?tab=writing`,
    cta: "Open the writing studio",
    subject: "ap-lang",
  },
  {
    id: "exam-timing",
    title: "This week: sit one timed section",
    body: "Timing is a skill you rehearse, not a thing you hope for. Twenty-five minutes, one section, real section counts and the real clock.",
    href: () => "/course/ap-calc/exam",
    cta: "Open the exam room",
    subject: null,
  },
];

/**
 * The limited-time module. It is limited in the honest sense: the window really
 * does close, because it is derived from the calendar week. Nothing is hidden
 * from a visitor who ignores it — the underlying lesson is always reachable.
 */
export function chooseSpotlight(
  profile: AdaptiveProfile,
  options: { prefs: SitePrefs; now?: number },
): SpotLight | null {
  if (!options.prefs.adaptive.enabled || !options.prefs.adaptive.limitedTime) return null;
  const now = options.now ?? Date.now();
  const date = new Date(now);
  // Weeks start on Monday.
  const weekday = (date.getDay() + 6) % 7;
  const daysLeft = 7 - weekday;

  const preferred = profile.topSubject
    ? SPOTLIGHTS.filter((spot) => spot.subject === profile.topSubject)
    : [];
  const pool = preferred.length > 0 ? preferred : SPOTLIGHTS;
  // Rotate weekly rather than daily: a window that closes tomorrow is noise.
  const week = Math.floor((localDayNumber(now) + 3) / 7);
  const spot = pool[week % pool.length];
  const slug = spot.subject ?? profile.topSubject ?? "ap-calc";

  return {
    id: spot.id,
    title: spot.title,
    body: spot.body,
    href: spot.href(slug),
    cta: spot.cta,
    subject: spot.subject,
    daysLeft,
  };
}

/* --------------------------------------------------------------------------
   Daily picks
   -------------------------------------------------------------------------- */

/**
 * One question for the day.
 *
 * Taken from the visitor's strongest course once they have one, and from the
 * whole library before that. The seed includes the day and the chosen subject, so
 * reloading the page gives the same question and tomorrow gives a different one.
 */
export function chooseQuiz<T extends { subject: string }>(
  profile: AdaptiveProfile,
  pool: readonly T[],
  dayKey = profile.dayKey,
): T | null {
  if (pool.length === 0) return null;
  const focused =
    profile.engaged && profile.topSubject
      ? pool.filter((item) => item.subject === profile.topSubject)
      : [];
  const items = focused.length > 0 ? focused : pool;
  return pick(`quiz:${dayKey}:${profile.topSubject ?? "any"}`, items);
}

export interface NextStep {
  label: string;
  href: string;
  why: string;
}

/** The single most useful next click, given what the profile actually shows. */
export function nextStepFor(
  profile: AdaptiveProfile,
  options: { familiarOf: (slug: string) => string; dailyGoalCards: number },
): NextStep {
  if (profile.events === 0) {
    return {
      label: "Start with one lesson",
      href: "/course/ap-calc/notes",
      why: "Nothing recorded yet — a single lesson is enough to make the rest of the page useful.",
    };
  }
  if (profile.streak === 0) {
    return {
      label: "Review due cards",
      href: "/study?tab=review",
      why: "Your streak has lapsed. The review queue is the shortest path back.",
    };
  }
  if (profile.topSubject) {
    const familiar = options.familiarOf(profile.topSubject);
    return {
      label: `Continue ${familiar}`,
      href: `/course/${profile.topSubject}/practice`,
      why: `${familiar} is your strongest subject by activity — practice locks it in better than rereading.`,
    };
  }
  return {
    label: "Open your study desk",
    href: "/study",
    why: `Your daily goal is ${options.dailyGoalCards} cards; the desk tracks it.`,
  };
}
