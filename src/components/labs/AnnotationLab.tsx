"use client";

import { useState } from "react";
import type { AnnotationLab as AnnotationLabDefinition } from "@/content/labs";
import { useStoredState } from "@/lib/use-stored-state";

type Annotations = Record<string, { note: string; tag: string }>;
const EMPTY: Annotations = Object.freeze({});
function revive(value: unknown): Annotations | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const clean: Annotations = {};
  for (const [id, raw] of Object.entries(value)) {
    if (typeof raw === "object" && raw !== null && "note" in raw && "tag" in raw && typeof raw.note === "string" && typeof raw.tag === "string") {
      clean[id] = { note: raw.note.slice(0, 4000), tag: raw.tag.slice(0, 100) };
    }
  }
  return clean;
}

export function AnnotationLab({ lab }: { lab: AnnotationLabDefinition }) {
  const [selectedId, setSelectedId] = useState(lab.segments[0]?.id ?? "");
  const [showModel, setShowModel] = useState(false);
  const [annotations, setAnnotations] = useStoredState<Annotations>(`aps.lab.v1.${lab.id}`, EMPTY, revive);
  const selected = lab.segments.find((segment) => segment.id === selectedId) ?? lab.segments[0];
  const current = annotations[selected.id] ?? { note: "", tag: lab.tags[0] };
  const update = (next: Partial<{ note: string; tag: string }>) => {
    setAnnotations((all) => ({ ...all, [selected.id]: { ...current, ...next } }));
  };

  return (
    <div>
      <div className="source-plate">
        <p className="label">Source</p>
        <h4>{lab.sourceTitle}</h4>
        <p>{lab.sourceContext}</p>
      </div>
      <p className="mt-5 font-semibold">{lab.prompt}</p>
      <div className="annotation-passage" aria-label="Selectable source passages">
        {lab.segments.map((segment) => <button
          key={segment.id}
          type="button"
          className="annotation-segment"
          data-selected={selected.id === segment.id}
          data-annotated={Boolean(annotations[segment.id]?.note.trim())}
          aria-pressed={selected.id === segment.id}
          onClick={() => { setSelectedId(segment.id); setShowModel(false); }}
        >{segment.text}{" "}</button>)}
      </div>

      <div className="annotation-editor">
        <p className="label mb-2">Your annotation</p>
        <blockquote>“{selected.text}”</blockquote>
        <label className="label mt-4 block" htmlFor={`annotation-tag-${lab.id}`}>Analytical lens</label>
        <select id={`annotation-tag-${lab.id}`} className="field mt-2 scratch-paper" value={current.tag} onChange={(event) => update({ tag: event.target.value })}>
          {lab.tags.map((tag) => <option key={tag}>{tag}</option>)}
        </select>
        <label className="label mt-4 block" htmlFor={`annotation-note-${lab.id}`}>Evidence → reasoning</label>
        <textarea id={`annotation-note-${lab.id}`} className="field mt-2 scratch-paper" rows={5} value={current.note}
          onChange={(event) => update({ note: event.target.value })}
          placeholder="Name the choice or feature, then explain how it works in this context. Saved on this device." />
        <button type="button" className="btn btn-outline btn-sm mt-3" disabled={!current.note.trim()} onClick={() => setShowModel((value) => !value)}>
          {showModel ? "Hide model annotation" : "Compare with model annotation"}
        </button>
        {showModel ? <div className="model-note mt-4">
          <p className="label mb-2">Model · {current.tag}</p>
          <p>{selected.annotation}</p>
          <p className="mt-2 text-[0.75rem]">A model is one defensible reading, not a phrase bank. Keep the reasoning in your own annotation that is specific to the passage.</p>
        </div> : null}
      </div>
    </div>
  );
}
