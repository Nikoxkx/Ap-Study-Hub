import { cache } from "react";

/**
 * The clock, for server components.
 *
 * `Date.now()` called directly inside a component is an impure read during
 * render: React's compiler flags it, and it is genuinely a bug waiting to
 * happen here, because the course layout and the page inside it each compute
 * "days until the exam" separately. Two calls a millisecond apart can land on
 * opposite sides of midnight and print different numbers on the same screen.
 *
 * `cache()` memoises per request, so every component in one render sees the
 * same instant. On a statically generated page that instant is build time,
 * which is the correct semantics for a number baked into HTML.
 */
export const renderInstant = cache((): number => Date.now());

const DAY = 86_400_000;

/**
 * Whole days from now until `instant`. Negative once it has passed.
 *
 * Floored rather than rounded, so "1 day" means at least twenty-four hours
 * remain — the friendlier direction to be wrong in when someone is counting
 * down to an exam.
 */
export function daysUntil(instant: number): number {
  return Math.floor((instant - renderInstant()) / DAY);
}
