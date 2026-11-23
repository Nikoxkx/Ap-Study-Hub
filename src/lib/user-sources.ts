"use client";

/**
 * Sources the visitor adds themselves.
 *
 * The site's own source lists are curated and shipped in the repository. This is
 * the other half: a teacher's handout, a textbook chapter, a video your class
 * watched. They are stored locally, attached to a course, and printed on that
 * course's sources page next to the curated ones — the "respective section" the
 * feature promises.
 *
 * They are deliberately *not* blended into the curated list's numbering or
 * claims. A visitor-added link has not been read by the author, so it is shown in
 * its own group, labelled as yours, and deletable in one click.
 */
import { useStoredState } from "./use-stored-state";
import { safeUrl, reviveSource, type UserSource } from "./site-prefs";

export const SOURCES_STORAGE_KEY = "aps.sources.v1";
const MAX_SOURCES = 200;

export type UserSourceList = UserSource[];

export function reviveSources(value: unknown): UserSourceList {
  if (!Array.isArray(value)) return [];
  const list: UserSourceList = [];
  const seen = new Set<string>();
  for (const entry of value.slice(0, MAX_SOURCES)) {
    const source = reviveSource(entry);
    if (!source) continue;
    const key = `${source.course}|${source.url}`;
    if (seen.has(key)) continue;
    seen.add(key);
    list.push(source);
  }
  return list;
}

export function useUserSources() {
  return useStoredState<UserSourceList>(SOURCES_STORAGE_KEY, [], reviveSources);
}

export interface NewSourceInput {
  course: string;
  title: string;
  url: string;
  note?: string;
  type?: UserSource["type"];
}

/**
 * Add a source. Returns the stored record, or a reason it was refused, so the
 * form can explain itself instead of silently doing nothing.
 */
export function addSource(
  current: UserSourceList,
  input: NewSourceInput,
): { ok: true; list: UserSourceList; source: UserSource } | { ok: false; reason: string } {
  const url = safeUrl(input.url);
  if (!url) return { ok: false, reason: "That does not look like an http(s) link." };
  const title = input.title.trim().slice(0, 160);
  if (!title) return { ok: false, reason: "Give the source a title so it means something later." };
  if (!input.course) return { ok: false, reason: "Pick the course this belongs to." };
  if (current.length >= MAX_SOURCES) {
    return { ok: false, reason: `That is ${MAX_SOURCES} sources — delete a few before adding more.` };
  }
  if (current.some((source) => source.course === input.course && source.url === url)) {
    return { ok: false, reason: "You already added that link to this course." };
  }

  const source: UserSource = {
    id: `src-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    course: input.course.slice(0, 40),
    title,
    url,
    note: (input.note ?? "").trim().slice(0, 600),
    type: input.type ?? "reference",
    addedAt: Date.now(),
  };

  return { ok: true, list: [source, ...current], source };
}

export { guessCourse } from "./course-hints";
