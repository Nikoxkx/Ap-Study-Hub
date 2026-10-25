"use client";

import { useState } from "react";
import type { MatrixLab as MatrixLabDefinition } from "@/content/labs";
import { useStoredState } from "@/lib/use-stored-state";

interface MatrixState { uses: Record<string, string>; synthesis: string }
const EMPTY: MatrixState = Object.freeze({ uses: {}, synthesis: "" });
function revive(value: unknown): MatrixState | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  if (!("uses" in value) || typeof value.uses !== "object" || value.uses === null || Array.isArray(value.uses)) return null;
  const uses: Record<string, string> = {};
  for (const [id, text] of Object.entries(value.uses)) if (typeof text === "string") uses[id] = text.slice(0, 4000);
  return { uses, synthesis: "synthesis" in value && typeof value.synthesis === "string" ? value.synthesis.slice(0, 8000) : "" };
}

export function MatrixLab({ lab }: { lab: MatrixLabDefinition }) {
  const [showModel, setShowModel] = useState(false);
  const [state, setState] = useStoredState<MatrixState>(`aps.matrix.v1.${lab.id}`, EMPTY, revive);
  const usedSources = lab.sources.filter((source) => state.uses[source.id]?.trim()).length;
  const ready = usedSources >= 2 && state.synthesis.trim().length >= 40;

  return (
    <div>
      <p className="lab-question"><strong>Inquiry question:</strong> {lab.question}</p>
      <div className="synthesis-matrix">
        <div className="matrix-header" aria-hidden="true"><span>Source & perspective</span><span>Evidence & limitation</span><span>Your planned use</span></div>
        {lab.sources.map((source) => <article key={source.id} className="matrix-row">
          <div data-label="Source"><h4>{source.title}</h4><p>{source.perspective}</p></div>
          <div data-label="Evidence & limitation"><p>{source.evidence}</p><p className="matrix-limit"><strong>Limit:</strong> {source.limitation}</p></div>
          <div data-label="Your planned use">
            <label className="sr-only" htmlFor={`matrix-${lab.id}-${source.id}`}>How you will use {source.title}</label>
            <textarea id={`matrix-${lab.id}-${source.id}`} className="field scratch-paper" rows={4} value={state.uses[source.id] ?? ""}
              onChange={(event) => setState((current) => ({ ...current, uses: { ...current.uses, [source.id]: event.target.value } }))}
              placeholder="Which claim will this source complicate or support?" />
          </div>
        </article>)}
      </div>
      <label className="label mt-6 block" htmlFor={`synthesis-${lab.id}`}>Your line of reasoning</label>
      <textarea id={`synthesis-${lab.id}`} className="field mt-2 scratch-paper" rows={6} value={state.synthesis}
        onChange={(event) => setState((current) => ({ ...current, synthesis: event.target.value }))}
        placeholder="Explain how at least two sources work together, where they tension, and what a defensible response must include." />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button type="button" className="btn btn-outline btn-sm" disabled={!ready} onClick={() => setShowModel((value) => !value)}>
          {showModel ? "Hide synthesis model" : "Compare with synthesis model"}
        </button>
        {!ready ? <span className="text-[0.75rem]" style={{ color: "var(--ink-faint)" }}>Plan at least two source uses and write a line of reasoning first.</span> : null}
      </div>
      {showModel ? <div className="model-note mt-4"><p className="label mb-2">One possible synthesis</p><p>{lab.modelSynthesis}</p></div> : null}
    </div>
  );
}
