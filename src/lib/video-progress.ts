"use client";

import { useStoredState } from "./use-stored-state";

/** Local, per-video watch and note state shared by lesson players and the Study Desk. */
export const VIDEO_PROGRESS_KEY = "aps.video-progress.v1";

export interface VideoProgressEntry {
  watched: boolean;
  at: number;
  notes: string;
}

export type VideoProgress = Record<string, VideoProgressEntry>;

export const EMPTY_VIDEO_PROGRESS: VideoProgress = Object.freeze({});

/** localStorage is user-writable, so every value is checked before use. */
export function reviveVideoProgress(value: unknown): VideoProgress | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const clean: VideoProgress = {};
  for (const [id, raw] of Object.entries(value as Record<string, unknown>).slice(0, 500)) {
    if (typeof raw !== "object" || raw === null || Array.isArray(raw)) continue;
    const entry = raw as Record<string, unknown>;
    clean[id.slice(0, 120)] = {
      watched: entry.watched === true,
      at: typeof entry.at === "number" && Number.isFinite(entry.at) ? entry.at : 0,
      notes: typeof entry.notes === "string" ? entry.notes.slice(0, 4000) : "",
    };
  }
  return clean;
}

export function useVideoProgress() {
  return useStoredState<VideoProgress>(VIDEO_PROGRESS_KEY, EMPTY_VIDEO_PROGRESS, reviveVideoProgress);
}
