"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useStoredState } from "@/lib/use-stored-state";

/**
 * Card deck.
 *
 * The previous version had a `<div onClick>` for the card, which meant it could
 * not be reached or operated by keyboard at all, and its "shuffle" was
 * `sort(() => Math.random() - 0.5)` — a comparator that is not a valid ordering,
 * so it produces a measurably biased permutation. Both are fixed here.
 *
 * Behaviour:
 *   Space / Enter  flip
 *   ← →            previous / next
 *   1 / 2          mark "got it" / "again"
 *   s              shuffle
 * Progress is kept in localStorage per course so a session survives a reload,
 * which is the whole point of marking a card wrong.
 */

export interface Card {
  front: string;
  back: string;
}

type Verdict = "again" | "got";

interface DeckProps {
  cards: Card[];
  courseSlug: string;
  courseLabel: string;
}

/** Fisher–Yates. Unbiased, unlike sorting by a random comparator. */
function shuffled<T>(input: T[]): T[] {
  const output = [...input];
  for (let i = output.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [output[i], output[j]] = [output[j], output[i]];
  }
  return output;
}

/** Frozen module constant: the hook needs a fallback with a stable identity. */
const NO_VERDICTS: Record<number, Verdict> = Object.freeze({});

export function CardDeck({ cards, courseSlug, courseLabel }: DeckProps) {
  const storageKey = `aps.cards.${courseSlug}`;

  const [order, setOrder] = useState<number[]>(() => cards.map((_, i) => i));
  const [position, setPosition] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [onlyMissed, setOnlyMissed] = useState(false);

  const cardRef = useRef<HTMLButtonElement>(null);

  // Marks live in localStorage and are read through useSyncExternalStore, so
  // there is no restore-then-rerender on mount and two tabs on the same deck
  // stay in step. `reviveVerdicts` throws away anything that is not a mark for
  // a card that still exists — decks get edited, and last term's indices are
  // not this term's.
  const reviveVerdicts = useCallback(
    (value: unknown): Record<number, Verdict> | null => {
      if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
      const clean: Record<number, Verdict> = {};
      for (const [key, mark] of Object.entries(value as Record<string, unknown>)) {
        const index = Number(key);
        if (Number.isInteger(index) && index >= 0 && index < cards.length) {
          if (mark === "again" || mark === "got") clean[index] = mark;
        }
      }
      return clean;
    },
    [cards.length],
  );

  const [verdicts, setVerdicts] = useStoredState<Record<number, Verdict>>(
    storageKey,
    NO_VERDICTS,
    reviveVerdicts,
  );

  const missedCount = useMemo(
    () => Object.values(verdicts).filter((v) => v === "again").length,
    [verdicts],
  );

  const activeOrder = useMemo(() => {
    if (!onlyMissed) return order;
    const missed = order.filter((index) => verdicts[index] === "again");
    return missed.length > 0 ? missed : order;
  }, [order, onlyMissed, verdicts]);

  const cardIndex = activeOrder[Math.min(position, activeOrder.length - 1)] ?? 0;
  const card = cards[cardIndex];

  const step = useCallback(
    (delta: number) => {
      setFlipped(false);
      setPosition((current) => {
        const next = current + delta;
        if (next < 0) return activeOrder.length - 1;
        if (next >= activeOrder.length) return 0;
        return next;
      });
    },
    [activeOrder.length],
  );

  const mark = useCallback(
    (verdict: Verdict) => {
      setVerdicts((current) => ({ ...current, [cardIndex]: verdict }));
      step(1);
    },
    [cardIndex, step, setVerdicts],
  );

  const shuffle = useCallback(() => {
    setOrder((current) => shuffled(current));
    setPosition(0);
    setFlipped(false);
    cardRef.current?.focus();
  }, []);

  const reset = useCallback(() => {
    setVerdicts(NO_VERDICTS);
    setOnlyMissed(false);
    setOrder(cards.map((_, i) => i));
    setPosition(0);
    setFlipped(false);
  }, [cards, setVerdicts]);

  // Shortcuts are scoped to when the deck itself holds focus, so they do not
  // hijack typing anywhere else on the page.
  function onKeyDown(event: React.KeyboardEvent) {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        step(1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        step(-1);
        break;
      case "1":
        event.preventDefault();
        mark("got");
        break;
      case "2":
        event.preventDefault();
        mark("again");
        break;
      case "s":
      case "S":
        event.preventDefault();
        shuffle();
        break;
      default:
        break;
    }
  }

  if (cards.length === 0) return null;

  const verdict = verdicts[cardIndex];
  const reviewed = Object.keys(verdicts).length;

  return (
    <div onKeyDown={onKeyDown}>
      {/* Status line */}
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="text-[0.8125rem] tabular-nums" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
          Card {position + 1} of {activeOrder.length}
          {onlyMissed ? " · missed only" : ""}
        </p>
        <p className="text-[0.8125rem] tabular-nums" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
          {reviewed} reviewed · {missedCount} to redo
        </p>
      </div>

      <div
        className="mb-6 h-[3px] w-full overflow-hidden"
        style={{ background: "var(--paper-sunk)" }}
        role="progressbar"
        aria-valuenow={position + 1}
        aria-valuemin={1}
        aria-valuemax={activeOrder.length}
        aria-label="Position in deck"
      >
        <div
          className="h-full transition-[width] duration-300 ease-[cubic-bezier(0.2,0.7,0.3,1)]"
          style={{
            width: `${((position + 1) / activeOrder.length) * 100}%`,
            background: "var(--subject-ink)",
          }}
        />
      </div>

      {/* The card. A button, because it does one thing when you press it. */}
      <button
        ref={cardRef}
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        className="group relative block w-full cursor-pointer text-left"
        style={{ perspective: "1400px" }}
      >
        <span
          className="relative block w-full transition-transform duration-[420ms] ease-[cubic-bezier(0.2,0.7,0.3,1)]"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateX(-180deg)" : "none",
            minHeight: "16rem",
          }}
        >
          <CardFace side="front" hidden={flipped}>
            <span className="label mb-4 block">
              {courseLabel} · card {String(cardIndex + 1).padStart(2, "0")}
            </span>
            <span
              className="block text-[clamp(1.125rem,1rem+0.7vw,1.5rem)]"
              style={{ fontFamily: "var(--font-display)", lineHeight: 1.3 }}
            >
              {card.front}
            </span>
            <span
              className="mt-auto block pt-6 text-[0.75rem]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
            >
              Press to reveal
            </span>
          </CardFace>

          <CardFace side="back" hidden={!flipped}>
            <span className="label mb-4 block">Answer</span>
            <span
              className="block text-[1.0625rem]"
              style={{ fontFamily: "var(--font-display)", lineHeight: 1.55, color: "var(--ink)" }}
            >
              {card.back}
            </span>
            <span
              className="mt-auto block pt-6 text-[0.75rem]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
            >
              1 — got it · 2 — again
            </span>
          </CardFace>
        </span>
      </button>

      {/* Screen readers get the text directly; the 3D flip is meaningless to them. */}
      <p className="sr-only" aria-live="polite">
        {flipped ? `Answer: ${card.back}` : `Card ${position + 1} of ${activeOrder.length}. ${card.front}`}
      </p>

      {/* Controls */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => step(-1)} className="btn btn-outline btn-sm">
          ← Previous
        </button>
        <button type="button" onClick={() => step(1)} className="btn btn-outline btn-sm">
          Next →
        </button>

        <span className="mx-1 hidden h-5 w-px sm:block" style={{ background: "var(--rule)" }} />

        <button
          type="button"
          onClick={() => mark("got")}
          className="btn btn-sm"
          style={{
            border: "1px solid var(--good)",
            color: verdict === "got" ? "var(--paper-raised)" : "var(--good)",
            background: verdict === "got" ? "var(--good)" : "transparent",
          }}
        >
          Got it
        </button>
        <button
          type="button"
          onClick={() => mark("again")}
          className="btn btn-sm"
          style={{
            border: "1px solid var(--mark)",
            color: verdict === "again" ? "var(--paper-raised)" : "var(--mark)",
            background: verdict === "again" ? "var(--mark)" : "transparent",
          }}
        >
          Again
        </button>

        <span className="mx-1 hidden h-5 w-px sm:block" style={{ background: "var(--rule)" }} />

        <button type="button" onClick={shuffle} className="btn btn-quiet btn-sm">
          Shuffle
        </button>
        <button
          type="button"
          onClick={() => {
            setOnlyMissed((v) => !v);
            setPosition(0);
            setFlipped(false);
          }}
          className="btn btn-quiet btn-sm"
          aria-pressed={onlyMissed}
          disabled={missedCount === 0}
        >
          {onlyMissed ? "All cards" : `Redo missed (${missedCount})`}
        </button>
        {reviewed > 0 ? (
          <button type="button" onClick={reset} className="btn btn-quiet btn-sm">
            Clear marks
          </button>
        ) : null}
      </div>

      <p className="mt-5 text-[0.75rem]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
        Keyboard: space flip · ← → move · 1 got it · 2 again · s shuffle
      </p>
    </div>
  );
}

function CardFace({
  side,
  hidden,
  children,
}: {
  side: "front" | "back";
  hidden: boolean;
  children: React.ReactNode;
}) {
  const back = side === "back";
  return (
    <span
      aria-hidden={hidden}
      className="flex flex-col p-7 sm:p-9"
      style={{
        position: back ? "absolute" : "relative",
        inset: back ? 0 : undefined,
        minHeight: "16rem",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: back ? "rotateX(180deg)" : undefined,
        background: back ? "var(--subject-tint)" : "var(--paper-raised)",
        border: "1px solid var(--rule-strong)",
        borderTop: `3px solid var(--subject-ink)`,
        borderRadius: "var(--radius-cut)",
        boxShadow: "var(--shadow-lift)",
        // Faint ruling, so it reads as an index card rather than a div.
        backgroundImage: back
          ? undefined
          : "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, color-mix(in srgb, var(--rule) 60%, transparent) 31px, color-mix(in srgb, var(--rule) 60%, transparent) 32px)",
        backgroundPosition: "0 3.4rem",
      }}
    >
      {children}
    </span>
  );
}
