"use client";

import { useEffect, useState } from "react";

/**
 * Countdown to an exam.
 *
 * Two things the previous version got wrong, both worth naming:
 *
 * 1. It recomputed `new Date()` during render and passed `targetDate.getTime()`
 *    as a useEffect dependency. The object was new on every render, so the
 *    effect re-ran constantly and tore down its own interval.
 * 2. It rendered "Loading..." on the server. A number that only exists after
 *    hydration is invisible to crawlers and flashes for everyone else. The
 *    server can compute the day count perfectly well — only the seconds need
 *    the client.
 *
 * So: days are rendered on the server from a stable timestamp, and the live
 * hours/minutes/seconds are layered on after mount.
 */

interface CountdownProps {
  /** Exam instant in epoch milliseconds. */
  target: number;
  label: string;
  /** Days remaining as computed on the server, used for the first paint. */
  initialDays: number;
}

function parts(msRemaining: number) {
  const total = Math.max(0, msRemaining);
  return {
    // Kept unclamped so the render can tell "no time left" from "not yet
    // measured" without reading the clock again during render.
    remaining: msRemaining,
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total % 86_400_000) / 3_600_000),
    minutes: Math.floor((total % 3_600_000) / 60_000),
    seconds: Math.floor((total % 60_000) / 1000),
  };
}

export function Countdown({ target, label, initialDays }: CountdownProps) {
  const [live, setLive] = useState<ReturnType<typeof parts> | null>(null);

  useEffect(() => {
    const tick = () => setLive(parts(target - Date.now()));
    tick();

    // Align to the next whole second so the display does not drift or skip.
    const offset = 1000 - (Date.now() % 1000);
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      tick();
      interval = setInterval(tick, 1000);
    }, offset);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [target]);

  // Derived from the last tick rather than from a fresh Date.now(): reading the
  // clock during render makes the output depend on when React happens to run,
  // which is both impure and a source of server/client mismatch.
  const passed = live ? live.remaining <= 0 : initialDays < 0;

  if (passed) {
    return (
      <p className="text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
        The {label} exam has already been sat this year.
      </p>
    );
  }

  const cells: { value: number; unit: string }[] = live
    ? [
        { value: live.days, unit: "days" },
        { value: live.hours, unit: "hrs" },
        { value: live.minutes, unit: "min" },
        { value: live.seconds, unit: "sec" },
      ]
    : [{ value: Math.max(0, initialDays), unit: "days" }];

  return (
    <div>
      <dl className="flex items-baseline gap-4" aria-live="off">
        {cells.map((cell) => (
          <div key={cell.unit}>
            <dd
              className="tnum text-[1.75rem] leading-none"
              style={{ fontFamily: "var(--font-mono)", fontWeight: 500, margin: 0 }}
            >
              {String(cell.value).padStart(2, "0")}
            </dd>
            <dt className="label mt-1">{cell.unit}</dt>
          </div>
        ))}
      </dl>
      {/* One polite announcement per minute is plenty; a per-second live region
          would make a screen reader unusable. */}
      <p className="sr-only" aria-live="polite">
        {live ? `${live.days} days until the ${label} exam.` : ""}
      </p>
    </div>
  );
}
