"use client";

import { useMemo } from "react";
import { useStoredState } from "./use-stored-state";
import {
  ADAPTIVE_STORAGE_KEY,
  EMPTY_ADAPTIVE,
  buildProfile,
  clearAdaptive,
  recordAdaptive,
  reviveAdaptive,
  type AdaptiveKind,
  type AdaptiveProfile,
  type AdaptiveState,
} from "./adaptive";

/** The raw event log, as React state. */
export function useAdaptiveState() {
  return useStoredState<AdaptiveState>(ADAPTIVE_STORAGE_KEY, EMPTY_ADAPTIVE, reviveAdaptive);
}

/**
 * The derived profile.
 *
 * `buildProfile` is memoised on the event log, not on the clock: the streak and
 * the decayed affinity are recomputed when something is recorded or when the
 * component remounts, which is the granularity that matters. A page left open
 * across midnight will keep yesterday's "today's quiz" until it is reloaded —
 * deliberate, because swapping the quiz under the visitor mid-session would be
 * worse than a slightly stale one.
 */
export function useAdaptiveProfile(): { state: AdaptiveState; profile: AdaptiveProfile } {
  const [state] = useAdaptiveState();
  const profile = useMemo(() => buildProfile(state), [state]);
  return { state, profile };
}

/** Fire-and-forget recording from event handlers. Never throws. */
export const track = {
  search: (value: string) => recordAdaptive("search", { value }),
  video: (subject: string, value: string) => recordAdaptive("video", { subject, value }),
  card: (subject: string) => recordAdaptive("card", { subject }),
  practice: (subject: string) => recordAdaptive("practice", { subject }),
  quiz: (subject: string, value?: string) => recordAdaptive("quiz", { subject, value }),
  lesson: (subject: string) => recordAdaptive("lesson", { subject }),
  course: (subject: string) => recordAdaptive("course", { subject }),
  studio: (subject: string) => recordAdaptive("studio", { subject }),
  link: (value: string) => recordAdaptive("link", { value }),
};

export { recordAdaptive, clearAdaptive };
export type { AdaptiveKind, AdaptiveProfile, AdaptiveState };
