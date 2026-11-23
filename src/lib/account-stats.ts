/**
 * The four numbers an optional account is allowed to hold.
 *
 * Deliberately coarse: counts, not a history. No item IDs, no answers, no
 * per-question record, no timestamps beyond "last active". This is the whole
 * reason the sync surface can be described in one sentence on the privacy page.
 */
import type { StudyState } from "./study-model";
import type { AdaptiveProfile } from "./adaptive";

export interface LocalStats {
  cardsReviewed: number;
  questionsAnswered: number;
  minutes: number;
  streak: number;
  daysActive: number;
  affinity: { slug: string; score: number }[];
}

export function localStats(state: StudyState, profile: AdaptiveProfile): LocalStats {
  let cardsReviewed = 0;
  let questionsAnswered = 0;
  let minutes = 0;

  for (const event of state.events) {
    if (event.type === "review") cardsReviewed += 1;
    else if (event.type === "practice") questionsAnswered += 1;
    else if (event.type === "focus" && typeof event.minutes === "number") {
      minutes += Math.max(0, event.minutes);
    }
  }

  return {
    cardsReviewed,
    questionsAnswered,
    minutes,
    streak: profile.streak,
    daysActive: profile.daysActive,
    affinity: profile.affinity.map((entry) => ({
      slug: entry.slug,
      score: Number(entry.score.toFixed(2)),
    })),
  };
}
