import { isSubjectSlug, type SubjectSlug } from "./subjects";

export type StudyItemKind = "card" | "question" | "variant" | "lab";
export type ReviewGrade = "again" | "hard" | "good" | "easy";
export type ObjectiveLevel = 0 | 1 | 2 | 3;

export interface StudyItem {
  id: string;
  kind: StudyItemKind;
  courseSlug: SubjectSlug;
  courseLabel: string;
  prompt: string;
  answer: string;
  explanation?: string;
  href: string;
  lessonHref?: string;
  lessonTitle?: string;
  unitNumber?: number;
  skill?: string;
}

export interface ReviewSchedule {
  due: number;
  interval: number;
  ease: number;
  reps: number;
  lapses: number;
  lastAt: number;
  lastGrade: ReviewGrade;
}

export interface MistakeRecord {
  itemId: string;
  chosen: string;
  at: number;
  resolvedAt?: number;
}

export interface StudyEvent {
  id: string;
  at: number;
  type: "review" | "practice" | "focus" | "frq" | "video";
  courseSlug?: SubjectSlug;
  itemId?: string;
  correct?: boolean;
  minutes?: number;
}

export interface StudyPlanSettings {
  courseSlug: SubjectSlug;
  minutes: 15 | 25 | 40 | 60;
  days: number[];
  createdAt: number;
}

export interface StudyState {
  version: 1;
  reviews: Record<string, ReviewSchedule>;
  mistakes: Record<string, MistakeRecord>;
  objectives: Record<string, ObjectiveLevel>;
  events: StudyEvent[];
  customItems: Record<string, StudyItem>;
  plan: StudyPlanSettings | null;
  completedPlanItems: Record<string, number>;
}

export const STUDY_STORAGE_KEY = "aps.study.v1";
export const DEFAULT_STUDY_STATE: StudyState = Object.freeze({
  version: 1,
  reviews: {},
  mistakes: {},
  objectives: {},
  events: [],
  customItems: {},
  plan: null,
  completedPlanItems: {},
}) as StudyState;

export function questionStudyId(courseSlug: string, id: number): string {
  return `${courseSlug}:question:${id}`;
}

export function cardStudyId(courseSlug: string, id: string): string {
  return `${courseSlug}:card:${id}`;
}

export function objectiveStudyId(courseSlug: string, unitNumber: number, index: number): string {
  return `${courseSlug}:objective:${unitNumber}:${index}`;
}

const DAY = 86_400_000;
const GRADES: ReviewGrade[] = ["again", "hard", "good", "easy"];

function object(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function finite(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function text(value: unknown, max = 4000): string {
  return typeof value === "string" ? value.slice(0, max) : "";
}

/** Validate a backup or a storage value instead of trusting its TypeScript cast. */
export function reviveStudyState(value: unknown): StudyState | null {
  if (!object(value) || value.version !== 1) return null;
  const clean: StudyState = {
    version: 1,
    reviews: {}, mistakes: {}, objectives: {}, events: [], customItems: {},
    plan: null, completedPlanItems: {},
  };

  if (object(value.reviews)) {
    for (const [id, raw] of Object.entries(value.reviews).slice(0, 3000)) {
      if (!object(raw)) continue;
      clean.reviews[id.slice(0, 240)] = {
        due: finite(raw.due), interval: Math.max(0, finite(raw.interval)),
        ease: Math.min(3, Math.max(1.3, finite(raw.ease, 2.5))),
        reps: Math.max(0, Math.floor(finite(raw.reps))),
        lapses: Math.max(0, Math.floor(finite(raw.lapses))),
        lastAt: finite(raw.lastAt),
        lastGrade: GRADES.includes(raw.lastGrade as ReviewGrade) ? raw.lastGrade as ReviewGrade : "good",
      };
    }
  }

  if (object(value.mistakes)) {
    for (const [id, raw] of Object.entries(value.mistakes).slice(0, 3000)) {
      if (!object(raw)) continue;
      clean.mistakes[id.slice(0, 240)] = {
        itemId: text(raw.itemId, 240) || id,
        chosen: text(raw.chosen, 1000), at: finite(raw.at),
        resolvedAt: raw.resolvedAt === undefined ? undefined : finite(raw.resolvedAt),
      };
    }
  }

  if (object(value.objectives)) {
    for (const [id, level] of Object.entries(value.objectives).slice(0, 3000)) {
      if (level === 0 || level === 1 || level === 2 || level === 3) clean.objectives[id.slice(0, 240)] = level;
    }
  }

  if (Array.isArray(value.events)) {
    clean.events = value.events.slice(-800).flatMap((raw, index) => {
      if (!object(raw) || !["review", "practice", "focus", "frq", "video"].includes(String(raw.type))) return [];
      const courseSlug = text(raw.courseSlug, 60);
      return [{
        id: text(raw.id, 240) || `restored-${index}`,
        at: finite(raw.at), type: raw.type as StudyEvent["type"],
        courseSlug: isSubjectSlug(courseSlug) ? courseSlug : undefined,
        itemId: text(raw.itemId, 240) || undefined,
        correct: typeof raw.correct === "boolean" ? raw.correct : undefined,
        minutes: raw.minutes === undefined ? undefined : Math.max(0, Math.min(1440, finite(raw.minutes))),
      }];
    });
  }

  if (object(value.customItems)) {
    for (const [id, raw] of Object.entries(value.customItems).slice(0, 500)) {
      if (!object(raw) || typeof raw.id !== "string" || !raw.id.trim() || typeof raw.prompt !== "string" || !raw.prompt.trim() || typeof raw.answer !== "string" || !raw.answer.trim()) continue;
      const courseSlug = text(raw.courseSlug, 60);
      if (!isSubjectSlug(courseSlug)) continue;
      clean.customItems[id.slice(0, 240)] = {
        id: text(raw.id, 240), kind: raw.kind === "lab" ? "lab" : "variant", courseSlug,
        courseLabel: text(raw.courseLabel, 120), prompt: text(raw.prompt), answer: text(raw.answer),
        explanation: text(raw.explanation) || undefined, href: text(raw.href, 500),
        lessonHref: text(raw.lessonHref, 500) || undefined,
        lessonTitle: text(raw.lessonTitle, 240) || undefined,
        unitNumber: raw.unitNumber === undefined ? undefined : finite(raw.unitNumber),
        skill: text(raw.skill, 160) || undefined,
      };
    }
  }

  if (object(value.plan)) {
    const minutes = finite(value.plan.minutes);
    const days = Array.isArray(value.plan.days)
      ? [...new Set(value.plan.days.filter((day) => Number.isInteger(day) && day >= 0 && day <= 6))] as number[]
      : [];
    const courseSlug = text(value.plan.courseSlug, 60);
    if ([15, 25, 40, 60].includes(minutes) && days.length && isSubjectSlug(courseSlug)) {
      clean.plan = {
        courseSlug,
        minutes: minutes as StudyPlanSettings["minutes"], days,
        createdAt: finite(value.plan.createdAt),
      };
    }
  }

  if (object(value.completedPlanItems)) {
    for (const [id, at] of Object.entries(value.completedPlanItems).slice(0, 3000)) {
      if (typeof at === "number" && Number.isFinite(at)) clean.completedPlanItems[id.slice(0, 300)] = at;
    }
  }
  return clean;
}

export function scheduleReview(
  state: StudyState,
  input: { itemId: string; grade: ReviewGrade; courseSlug?: SubjectSlug; kind?: "review" | "practice"; correct?: boolean; chosen?: string; item?: StudyItem },
  now = Date.now(),
): StudyState {
  const previous = state.reviews[input.itemId] ?? {
    due: 0, interval: 0, ease: 2.5, reps: 0, lapses: 0, lastAt: 0, lastGrade: "good" as ReviewGrade,
  };
  let interval: number;
  let due: number;
  let ease = previous.ease;
  let reps = previous.reps;
  let lapses = previous.lapses;

  if (input.grade === "again") {
    interval = 0; due = now + 10 * 60_000; reps = 0; lapses += 1; ease = Math.max(1.3, ease - 0.2);
  } else if (input.grade === "hard") {
    interval = Math.max(1, Math.round((previous.interval || 1) * 1.2));
    due = now + interval * DAY; reps += 1; ease = Math.max(1.3, ease - 0.15);
  } else if (input.grade === "easy") {
    interval = previous.reps === 0 ? 2 : Math.max(4, Math.round((previous.interval || 1) * ease * 1.3));
    due = now + interval * DAY; reps += 1; ease = Math.min(3, ease + 0.1);
  } else {
    interval = previous.reps === 0 ? 1 : previous.reps === 1 ? 3 : Math.max(4, Math.round(previous.interval * ease));
    due = now + interval * DAY; reps += 1;
  }

  const correct = input.correct ?? input.grade !== "again";
  const existingMistake = state.mistakes[input.itemId];
  const mistakes = { ...state.mistakes };
  if (!correct && input.chosen !== undefined) {
    mistakes[input.itemId] = { itemId: input.itemId, chosen: input.chosen, at: now };
  } else if (correct && existingMistake && !existingMistake.resolvedAt) {
    mistakes[input.itemId] = { ...existingMistake, resolvedAt: now };
  }

  const customItems = input.item
    ? { ...state.customItems, [input.item.id]: input.item }
    : state.customItems;
  const event: StudyEvent = {
    id: `${now}:${input.itemId}`, at: now, type: input.kind ?? "review",
    courseSlug: input.courseSlug ?? input.item?.courseSlug, itemId: input.itemId,
    correct,
  };

  return {
    ...state,
    reviews: { ...state.reviews, [input.itemId]: { due, interval, ease, reps, lapses, lastAt: now, lastGrade: input.grade } },
    mistakes, customItems,
    events: [...state.events, event].slice(-800),
  };
}

export function addStudyEvent(state: StudyState, event: Omit<StudyEvent, "id">): StudyState {
  return { ...state, events: [...state.events, { ...event, id: `${event.at}:${event.type}:${state.events.length}` }].slice(-800) };
}

export function localDateKey(value: number | Date): string {
  const date = typeof value === "number" ? new Date(value) : value;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function dailyHash(id: string, day: string): number {
  let hash = 2166136261;
  for (const char of `${day}:${id}`) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return hash >>> 0;
}

export const DAILY_NEW_ITEMS_PER_COURSE = 6;

/**
 * Due work and unresolved mistakes stay available. New work is introduced at a
 * bounded daily rate per course, selected by a stable date + item hash rather
 * than by array position or a random shuffle. A session limit controls visible
 * work; this separate rule controls what enters the learning queue at all.
 */
export function getReviewQueue(items: StudyItem[], state: StudyState, now = Date.now(), courseSlug?: SubjectSlug): StudyItem[] {
  const day = localDateKey(now);
  const scoped = items.filter((item) => !courseSlug || item.courseSlug === courseSlug);
  const unresolved = (item: StudyItem) => Boolean(state.mistakes[item.id] && !state.mistakes[item.id].resolvedAt);
  const due = scoped.filter((item) => {
    const schedule = state.reviews[item.id];
    return Boolean(schedule && (schedule.due <= now || unresolved(item)));
  });
  const fresh = scoped.filter((item) => !state.reviews[item.id]);
  const byCourse = new Map<SubjectSlug, StudyItem[]>();
  for (const item of fresh) {
    const courseItems = byCourse.get(item.courseSlug) ?? [];
    courseItems.push(item);
    byCourse.set(item.courseSlug, courseItems);
  }
  const introduced = [...byCourse.values()].flatMap((courseItems) => courseItems
    .sort((a, b) => dailyHash(a.id, day) - dailyHash(b.id, day))
    .slice(0, DAILY_NEW_ITEMS_PER_COURSE));

  return [...due, ...introduced].sort((a, b) => {
    const aMistake = unresolved(a) ? 1 : 0;
    const bMistake = unresolved(b) ? 1 : 0;
    if (aMistake !== bMistake) return bMistake - aMistake;
    const aDue = state.reviews[a.id]?.due ?? Number.MAX_SAFE_INTEGER;
    const bDue = state.reviews[b.id]?.due ?? Number.MAX_SAFE_INTEGER;
    if (aDue !== bDue && (aDue !== Number.MAX_SAFE_INTEGER || bDue !== Number.MAX_SAFE_INTEGER)) return aDue - bDue;
    return dailyHash(a.id, day) - dailyHash(b.id, day);
  });
}

export function getWeeklySummary(events: StudyEvent[], now = Date.now()) {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - 6);
  const recent = events.filter((event) => event.at >= start.getTime() && event.at <= now + DAY);
  const attempts = recent.filter((event) => event.correct !== undefined);
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start); date.setDate(start.getDate() + index);
    const key = localDateKey(date);
    const dayEvents = recent.filter((event) => localDateKey(event.at) === key);
    return { key, label: date.toLocaleDateString("en-US", { weekday: "short" }), count: dayEvents.length, minutes: dayEvents.reduce((sum, event) => sum + (event.minutes ?? 0), 0) };
  });
  return {
    attempts: attempts.length,
    correct: attempts.filter((event) => event.correct).length,
    videos: recent.filter((event) => event.type === "video").length,
    minutes: Math.round(recent.reduce((sum, event) => sum + (event.minutes ?? 0), 0)),
    activeDays: days.filter((day) => day.count > 0).length,
    days,
  };
}
