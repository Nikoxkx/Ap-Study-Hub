"use client";

import { usePrefs } from "@/lib/use-prefs";

/**
 * A heading that the visitor can rename in settings.
 *
 * Renders the shipped text on the server and during hydration, then swaps to the
 * saved name. That keeps the HTML identical for everyone who has not renamed
 * anything — which is everyone, most of the time — and avoids a hydration
 * mismatch for the people who have.
 */
export function PrefText({ prefKey, fallback }: { prefKey: string; fallback: string }) {
  const { prefs } = usePrefs();
  const renamed = prefs.layout.renamed[prefKey];
  return <>{renamed || fallback}</>;
}
