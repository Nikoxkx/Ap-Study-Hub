"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/use-adaptive";

/** Kinds that are recorded once when a page is opened. */
type PageSignal = "course" | "lesson" | "studio";

/**
 * Records that a page was opened, for the local adaptive profile.
 *
 * It is a component rather than a line in the server page because recording is
 * a browser-only concern: the server renders the same HTML for every visitor,
 * and only the visitor's own browser decides whether an action is remembered.
 *
 * The module-level `seen` set makes the signal idempotent within one tab: React
 * may mount an effect twice in development, and a re-render must not look like a
 * second lesson. A genuine second visit after a reload counts again, which is
 * the honest reading of "opened the lesson".
 */
export function AdaptiveSignal({ kind, subject }: { kind: PageSignal; subject: string }) {
  const fired = useRef(false);

  useEffect(() => {
    const key = `${kind}:${subject}`;
    if (fired.current || seen.has(key)) return;
    fired.current = true;
    seen.add(key);
    track[kind](subject);
  }, [kind, subject]);

  return null;
}

const seen = new Set<string>();
