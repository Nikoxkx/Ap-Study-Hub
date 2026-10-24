"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";

/**
 * A short shelf of the films this browser has already started.
 *
 * Why it reads storage by hand instead of using `useStoredState`: films are not
 * known up front — the player writes one key per film (`aps.film.<id>`) only
 * when a reader actually presses play — so there is no fixed key list to
 * subscribe to. `useSyncExternalStore` is still the right primitive; the
 * snapshot is just the whole film namespace flattened into a string, which
 * compares cheaply and stays referentially stable while nothing changes.
 */

export interface ShelfFilm {
  id: string;
  title: string;
  courseLabel: string;
  courseSlug: string;
  /** True for the opening film rather than a unit film. */
  opening: boolean;
  unitNumber: number | null;
  seconds: number;
}

interface Watched {
  at: number;
  done: boolean;
  watchedAt: number;
}

const PREFIX = "aps.film.";

function snapshot(): string {
  try {
    const parts: string[] = [];
    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index);
      if (!key || !key.startsWith(PREFIX)) continue;
      const raw = window.localStorage.getItem(key);
      if (raw) parts.push(`${key}\u0000${raw}`);
    }
    parts.sort();
    return parts.join("\u0001");
  } catch {
    return "";
  }
}

function subscribe(listener: () => void): () => void {
  window.addEventListener("storage", listener);
  // A film started in another tab is the common case; a film started on this
  // page and then this page being hidden is the other one.
  document.addEventListener("visibilitychange", listener);
  return () => {
    window.removeEventListener("storage", listener);
    document.removeEventListener("visibilitychange", listener);
  };
}

function parse(raw: string): Map<string, Watched> {
  const out = new Map<string, Watched>();
  if (!raw) return out;
  for (const chunk of raw.split("\u0001")) {
    const split = chunk.indexOf("\u0000");
    if (split < 0) continue;
    const id = chunk.slice(PREFIX.length, split);
    try {
      const value = JSON.parse(chunk.slice(split + 1)) as Partial<Watched>;
      if (typeof value.at !== "number" || !Number.isFinite(value.at)) continue;
      out.set(id, {
        at: Math.max(0, value.at),
        done: value.done === true,
        watchedAt: typeof value.watchedAt === "number" ? value.watchedAt : 0,
      });
    } catch {
      // A half-written entry is not worth repairing; skip it and move on.
    }
  }
  return out;
}

function runtime(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, "0")}`;
}

export function FilmShelf({ films }: { films: ShelfFilm[] }) {
  /* `subscribe` and `snapshot` are module-level, so their identity is already
     stable across renders and there is nothing to memoise. */
  const raw = useSyncExternalStore(subscribe, snapshot, () => "");

  const rows = useMemo(() => {
    const watched = parse(raw);
    return films
      .map((film) => ({ film, progress: watched.get(film.id) }))
      .filter((row): row is { film: ShelfFilm; progress: Watched } => Boolean(row.progress))
      // Started but unfinished first, then anything finished, most recent first.
      .sort((a, b) => {
        if (a.progress.done !== b.progress.done) return a.progress.done ? 1 : -1;
        return b.progress.watchedAt - a.progress.watchedAt;
      })
      .slice(0, 4);
  }, [films, raw]);

  if (rows.length === 0) return null;

  return (
    <section className="film-shelf" aria-labelledby="film-shelf-heading">
      <div className="film-shelf-head">
        <p className="label" id="film-shelf-heading">
          Picked up earlier
        </p>
        <Link href={`/course/${rows[0].film.courseSlug}/videos`} className="link-underlined">
          The rest of {rows[0].film.courseLabel} →
        </Link>
      </div>
      <ul>
        {rows.map(({ film, progress }) => {
          const percent = film.seconds > 0 ? Math.min(100, (progress.at / film.seconds) * 100) : 0;
          return (
            <li key={film.id}>
              <Link href={`/course/${film.courseSlug}/videos#${film.id}`}>
                <span className="film-shelf-title">{film.title}</span>
                <span className="film-shelf-meta">
                  {film.courseLabel}
                  {film.unitNumber ? ` · Unit ${film.unitNumber}` : " · Opening film"}
                  {progress.done ? " · finished" : ` · ${runtime(progress.at)} of ${runtime(film.seconds)}`}
                </span>
                <span className="film-shelf-bar" aria-hidden="true">
                  <span style={{ width: `${progress.done ? 100 : Math.max(2, percent)}%` }} />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
