"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";
import { useStoredState } from "@/lib/use-stored-state";

/**
 * Scratch paper.
 *
 * A sheet, not a `<textarea>` with a grey background: three punched holes down
 * the margin, a red rule, ruled lines the text actually sits on, a printed
 * header, a page number, and a second sheet showing underneath so the stack
 * reads as depth rather than a flat card.
 *
 * Two things make it useful rather than decorative. The rule style and ink are
 * remembered, because a student who writes in blue grid squares should not have
 * to reselect that on every question. And the line height of the textarea is
 * locked to the rule spacing, so handwriting lands on the lines instead of
 * drifting between them — the most common way a "notebook" background looks
 * fake.
 *
 * `onChange` is optional. With it, the parent owns the draft (the timed paper
 * does, so drafts survive a reload). Without it, the sheet keeps its own copy
 * under `storageKey`, which is all a quick scratch pad needs.
 */

type Rule = "lined" | "grid" | "dot" | "plain";
type Ink = "pencil" | "blue" | "black" | "red";
type Tone = "cream" | "white" | "yellow" | "graph";

interface PaperPrefs {
  rule: Rule;
  ink: Ink;
  tone: Tone;
}

const PREFS_KEY = "aps.paper.v1";
const DEFAULT_PREFS: PaperPrefs = { rule: "lined", ink: "blue", tone: "cream" };

function revivePrefs(value: unknown): PaperPrefs | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Partial<PaperPrefs>;
  const rule: Rule = (["lined", "grid", "dot", "plain"] as const).includes(record.rule as Rule)
    ? (record.rule as Rule)
    : DEFAULT_PREFS.rule;
  const ink: Ink = (["pencil", "blue", "black", "red"] as const).includes(record.ink as Ink)
    ? (record.ink as Ink)
    : DEFAULT_PREFS.ink;
  const tone: Tone = (["cream", "white", "yellow", "graph"] as const).includes(record.tone as Tone)
    ? (record.tone as Tone)
    : DEFAULT_PREFS.tone;
  return { rule, ink, tone };
}

const INK_LABEL: Record<Ink, string> = {
  pencil: "Pencil",
  blue: "Blue ink",
  black: "Black ink",
  red: "Red pen",
};

const TONE_LABEL: Record<Tone, string> = {
  cream: "Cream",
  white: "White",
  yellow: "Yellow pad",
  graph: "Graph",
};

const RULE_LABEL: Record<Rule, string> = {
  lined: "Ruled",
  grid: "Grid",
  dot: "Dotted",
  plain: "Blank",
};

function countWords(value: string): number {
  const trimmed = value.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export interface ScratchPaperProps {
  /** Text in the sheet. */
  value: string;
  onChange?: (next: string) => void;
  /** Own storage key used when `onChange` is not supplied. */
  storageKey?: string;
  /** Printed in the header. */
  course?: string;
  /** Printed in the header, e.g. "Section II · Question 1". */
  heading?: string;
  /** Placeholder. Defaults to something that invites working, not padding. */
  placeholder?: string;
  /** Smallest height in rem. */
  minHeight?: number;
  /** Shown under the sheet. */
  note?: string;
  /** Hide the preference row (for tight spaces like a feedback card). */
  compact?: boolean;
}

export function ScratchPaper({
  value,
  onChange,
  storageKey,
  course,
  heading,
  placeholder = "Work it out here. Nothing is uploaded — this sheet lives in your browser.",
  minHeight = 19,
  note,
  compact = false,
}: ScratchPaperProps) {
  const [prefs, setPrefs] = useStoredState<PaperPrefs>(PREFS_KEY, DEFAULT_PREFS, revivePrefs);
  const [own, setOwn] = useStoredState<string>(storageKey ?? "aps.paper.scratch", "");
  const controlled = typeof onChange === "function";

  const text = controlled ? value : own;
  const update = useCallback(
    (next: string) => {
      if (controlled) onChange?.(next);
      else setOwn(next);
    },
    [controlled, onChange, setOwn],
  );

  const sheet = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);

  /* The printed date is intentionally computed during render with hydration
     warnings suppressed: the server writes its own date, the browser rewrites
     it a moment later, and no state or effect is needed to get there. */
  const date = new Date().toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard permission is not worth an error state; leave the text alone.
    }
  }, [text]);

  const clear = useCallback(() => {
    if (!text.trim()) return;
    const confirmed = window.confirm("Tear this sheet out? The writing on it will be gone.");
    if (!confirmed) return;
    update("");
    sheet.current?.focus();
  }, [text, update]);

  const words = countWords(text);

  return (
    <div className="scrap" data-rule={prefs.rule} data-ink={prefs.ink} data-tone={prefs.tone}>
      <div className="scrap-sheet" style={{ "--scrap-line": "2rem" } as CSSProperties}>
        <div className="scrap-holes" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="scrap-head">
          <div className="scrap-field">
            <span>Course</span>
            <strong>{course ?? "Scratch work"}</strong>
          </div>
          <div className="scrap-field" style={{ flex: "1 1 10rem" }}>
            <span>Working on</span>
            <strong>{heading ?? "Whatever is not clicking yet"}</strong>
          </div>
          <div className="scrap-field">
            <span>Date</span>
            <strong suppressHydrationWarning>{date}</strong>
          </div>
          <div className="scrap-field">
            <span>Sheet</span>
            <strong>1 of 1</strong>
          </div>
        </div>

        <div className="scrap-body" style={{ minHeight: `${minHeight}rem` }}>
          <label className="sr-only" htmlFor={`scrap-${storageKey ?? heading ?? "pad"}`}>
            Scratch paper
          </label>
          <textarea
            ref={sheet}
            id={`scrap-${storageKey ?? heading ?? "pad"}`}
            className="scrap-input"
            style={{ minHeight: `${minHeight}rem` }}
            value={text}
            onChange={(event) => update(event.target.value)}
            spellCheck
            placeholder={placeholder}
          />
        </div>

        <div className="scrap-foot">
          <span>
            <strong>{words}</strong> {words === 1 ? "word" : "words"} · {text.length} characters
          </span>
          <span>Kept in this browser only</span>
        </div>
      </div>

      {compact ? null : (
        <div className="scrap-tools">
          <div className="scrap-group" role="group" aria-label="Paper style">
            {(Object.keys(RULE_LABEL) as Rule[]).map((rule) => (
              <button
                key={rule}
                type="button"
                aria-pressed={prefs.rule === rule}
                onClick={() => setPrefs((current) => ({ ...current, rule }))}
              >
                {RULE_LABEL[rule]}
              </button>
            ))}
          </div>

          <div className="scrap-group" role="group" aria-label="Paper stock">
            {(Object.keys(TONE_LABEL) as Tone[]).map((tone) => (
              <button
                key={tone}
                type="button"
                aria-pressed={prefs.tone === tone}
                onClick={() => setPrefs((current) => ({ ...current, tone }))}
              >
                {TONE_LABEL[tone]}
              </button>
            ))}
          </div>

          <div className="scrap-swatches" role="group" aria-label="Ink colour">
            {(Object.keys(INK_LABEL) as Ink[]).map((ink) => (
              <button
                key={ink}
                type="button"
                className="scrap-swatch"
                data-ink={ink}
                aria-pressed={prefs.ink === ink}
                aria-label={INK_LABEL[ink]}
                title={INK_LABEL[ink]}
                onClick={() => setPrefs((current) => ({ ...current, ink }))}
              />
            ))}
          </div>

          <button type="button" className="scrap-standalone" onClick={copy}>
            {copied ? "Copied" : "Copy sheet"}
          </button>
          <button type="button" className="scrap-standalone" onClick={clear}>
            Tear out
          </button>

          {note ? <span className="scrap-note">{note}</span> : null}
        </div>
      )}
    </div>
  );
}
