"use client";

import { useRef, useState } from "react";
import { useStoredState, type Revive } from "@/lib/use-stored-state";

/**
 * Scratch pad.
 *
 * A sheet of ruled paper that remembers what you wrote. Two things matter here
 * and nothing else does:
 *
 *  - The rules have to line up with the writing, or it looks like a textarea
 *    with a decorative picture behind it. So the line height is a single custom
 *    property, `--scratch-line`, used by both the paper's ruled gradient and the
 *    textarea's `line-height`, and the padding is measured in whole lines.
 *  - The writing has to survive a reload without a save button. State is
 *    written to localStorage on every keystroke through the same store the
 *    rest of the study desk uses.
 *
 * The paper itself is a real photograph of a crumpled sheet, laid under the
 * crisp rules at low opacity. Photograph for texture, drawn lines for accuracy.
 */

interface ScratchDoc {
  body: string;
  pen: PenColour;
  updatedAt: number;
}

type PenColour = "ink" | "pencil" | "red" | "blue";

const PENS: { value: PenColour; label: string; swatch: string }[] = [
  { value: "ink", label: "Ink", swatch: "#20201c" },
  { value: "pencil", label: "Pencil", swatch: "#6d6960" },
  { value: "red", label: "Red pen", swatch: "#b23a2b" },
  { value: "blue", label: "Blue pen", swatch: "#2f4f86" },
];

const EMPTY: ScratchDoc = { body: "", pen: "ink", updatedAt: 0 };

const reviveScratch: Revive<ScratchDoc> = (value) => {
  if (!value || typeof value !== "object") return null;
  const doc = value as Partial<ScratchDoc>;
  const pen = PENS.some((p) => p.value === doc.pen) ? (doc.pen as PenColour) : "ink";
  return {
    body: typeof doc.body === "string" ? doc.body : "",
    pen,
    updatedAt: typeof doc.updatedAt === "number" ? doc.updatedAt : 0,
  };
};

function wordCount(text: string) {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

function stamp(ms: number) {
  if (!ms) return "not saved yet";
  return new Date(ms).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function ScratchPad({ courseLabel }: { courseLabel?: string }) {
  const [doc, setDoc] = useStoredState<ScratchDoc>("aph:scratch-pad:v1", EMPTY, reviveScratch);
  const [cleared, setCleared] = useState(false);
  const areaRef = useRef<HTMLTextAreaElement | null>(null);

  const update = (patch: Partial<ScratchDoc>) => {
    setDoc((current) => ({ ...current, ...patch, updatedAt: Date.now() }));
    setCleared(false);
  };

  const download = () => {
    const blob = new Blob([doc.body || ""], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `scratch-${new Date().toISOString().slice(0, 10)}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="scratch" aria-labelledby="scratch-heading">
      <div className="scratch-toolbar">
        <div>
          <p className="label">Scratch pad · saves as you type</p>
          <h2 id="scratch-heading" className="scratch-title">
            Rough work, on paper
          </h2>
        </div>
        <div className="scratch-tools">
          <fieldset className="scratch-pens">
            <legend className="sr-only">Pen colour</legend>
            {PENS.map((pen) => (
              <button
                key={pen.value}
                type="button"
                aria-pressed={doc.pen === pen.value}
                aria-label={pen.label}
                title={pen.label}
                onClick={() => update({ pen: pen.value })}
              >
                <span aria-hidden="true" style={{ background: pen.swatch }} />
              </button>
            ))}
          </fieldset>
          <button type="button" className="btn btn-outline btn-sm" onClick={download}>
            Download
          </button>
          <button
            type="button"
            className="btn btn-quiet btn-sm"
            onClick={() => {
              if (!doc.body.trim() && !cleared) return;
              update({ body: "" });
              setCleared(true);
              areaRef.current?.focus();
            }}
          >
            {cleared ? "Cleared" : "Clear"}
          </button>
        </div>
      </div>

      <div className="scratch-sheet" data-pen={doc.pen}>
        <label className="sr-only" htmlFor="scratch-input">
          Scratch pad for {courseLabel ?? "this course"}
        </label>
        <textarea
          id="scratch-input"
          ref={areaRef}
          className="scratch-input"
          value={doc.body}
          spellCheck
          placeholder={
            "Work the problem here. Show the setup, the substitution, then the answer on its own line.\n\nThe lines are real: one line of writing, one rule."
          }
          onChange={(event) => update({ body: event.target.value })}
        />
        <div className="scratch-foot">
          <span>
            {courseLabel ? `${courseLabel} · ` : ""}
            {wordCount(doc.body)} words · {doc.body.length} characters
          </span>
          {/* `updatedAt` is 0 in the server render — the stored value arrives on
              hydration — so this line reads "not saved yet" until there is
              something to report, without a second render pass to find out. */}
          <span>{doc.updatedAt ? `Last saved ${stamp(doc.updatedAt)}` : "Nothing on the pad yet"}</span>
        </div>
      </div>
      <p className="scratch-note">
        Kept in this browser only, never uploaded. Download it if you want it in a notebook you
        keep.
      </p>
    </section>
  );
}
