"use client";

import { useCallback, useEffect, useState } from "react";
import type { ResearchLab as ResearchLabDefinition } from "@/content/labs";
import { useStoredState } from "@/lib/use-stored-state";
import { useStudyState } from "@/lib/use-study-state";
import { addStudyEvent } from "@/lib/study-model";

const EMPTY: Record<string, string> = Object.freeze({});
function revive(value: unknown): Record<string, string> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const clean: Record<string, string> = {};
  for (const [key, text] of Object.entries(value)) if (typeof text === "string") clean[key] = text.slice(0, 6000);
  return clean;
}
function clock(seconds: number) {
  return `${String(Math.floor(Math.max(0, seconds) / 60)).padStart(2, "0")}:${String(Math.max(0, seconds) % 60).padStart(2, "0")}`;
}

export function ResearchLab({ lab }: { lab: ResearchLabDefinition }) {
  const [notes, setNotes] = useStoredState<Record<string, string>>(`aps.research.v1.${lab.id}`, EMPTY, revive);
  const [, setStudy] = useStudyState();
  const [promptIndex, setPromptIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "running" | "review">("idle");
  const [deadline, setDeadline] = useState(0);
  const [startedAt, setStartedAt] = useState(0);
  const [remaining, setRemaining] = useState(120);
  const [criteria, setCriteria] = useState<Record<number, boolean>>({});
  const prompt = lab.defensePrompts[promptIndex];
  const question = lab.fields.reduce((text, field) => text.replace(`{${field.id}}`, notes[`question:${field.id}`]?.trim() || `[${field.label}]`), lab.questionTemplate);
  const completeQuestion = lab.fields.every((field) => notes[`question:${field.id}`]?.trim());

  const finish = useCallback(() => {
    if (phase !== "running") return;
    const minutes = Math.max(1, Math.round((Date.now() - startedAt) / 60_000));
    setRemaining(0); setPhase("review");
    setStudy((current) => addStudyEvent(current, { at: Date.now(), type: "frq", courseSlug: lab.courseSlug, minutes }));
  }, [phase, startedAt, lab.courseSlug, setStudy]);

  useEffect(() => {
    if (phase !== "running") return;
    const tick = () => {
      const left = Math.round((deadline - Date.now()) / 1000);
      setRemaining(left);
      if (left <= 0) finish();
    };
    tick();
    const id = window.setInterval(tick, 500);
    return () => window.clearInterval(id);
  }, [phase, deadline, finish]);

  const start = () => {
    const now = Date.now();
    setStartedAt(now); setDeadline(now + 120_000); setRemaining(120); setCriteria({}); setPhase("running");
  };

  return (
    <div className="research-lab">
      <section className="research-question-builder" aria-labelledby={`question-builder-${lab.id}`}>
        <p className="label">Part 1 · Research question</p>
        <h4 id={`question-builder-${lab.id}`}>Bound the variables and context</h4>
        <div className="research-field-grid">
          {lab.fields.map((field) => <label key={field.id}>
            <span className="label">{field.label}</span>
            <input className="field mt-2" value={notes[`question:${field.id}`] ?? ""} placeholder={field.placeholder}
              onChange={(event) => setNotes((current) => ({ ...current, [`question:${field.id}`]: event.target.value }))} />
          </label>)}
        </div>
        <div className="generated-question">
          <p className="label mb-2">Generated draft · {completeQuestion ? "complete fields" : "fill every field"}</p>
          <p>{question}</p>
          <p>Completeness is not a quality score. Test whether the outcome is observable, the scope is feasible, and the question requires more than yes or no.</p>
        </div>
      </section>

      <section className="defense-rehearsal" aria-labelledby={`defense-${lab.id}`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="label">Part 2 · Oral defense</p><h4 id={`defense-${lab.id}`}>Two-minute response rehearsal</h4></div>
          {phase !== "idle" ? <p className="defense-clock" data-low={remaining <= 20}>{clock(remaining)}</p> : null}
        </div>
        <label className="label mt-5 block" htmlFor={`defense-prompt-${lab.id}`}>Panel question</label>
        <select id={`defense-prompt-${lab.id}`} className="field mt-2" value={promptIndex} disabled={phase === "running"}
          onChange={(event) => { setPromptIndex(Number(event.target.value)); setPhase("idle"); setRemaining(120); }}>
          {lab.defensePrompts.map((item, index) => <option key={item.id} value={index}>{item.category} · {item.prompt}</option>)}
        </select>
        <blockquote className="defense-prompt">{prompt.prompt}</blockquote>
        <p className="defense-listen"><strong>Strong response includes:</strong> {prompt.listenFor}</p>
        {phase !== "running" ? <button type="button" className="btn btn-solid btn-sm" onClick={start}>Start two minutes</button> :
          <button type="button" className="btn btn-outline btn-sm" onClick={finish}>Stop & self-assess</button>}

        {phase === "review" ? <div className="defense-review mt-6">
          <label className="label mb-2 block" htmlFor={`defense-notes-${lab.id}`}>Response notes / transcript from memory</label>
          <textarea id={`defense-notes-${lab.id}`} className="field" rows={6} value={notes[`defense:${prompt.id}`] ?? ""}
            onChange={(event) => setNotes((current) => ({ ...current, [`defense:${prompt.id}`]: event.target.value }))}
            placeholder="Write what you actually said or the reasoning you want to preserve." />
          <fieldset className="mt-4"><legend className="label mb-2">Your self-check · not an automated grade</legend>
            {lab.defenseCriteria.map((criterion, index) => <label key={criterion} className="check-row">
              <input type="checkbox" checked={Boolean(criteria[index])} onChange={(event) => setCriteria((current) => ({ ...current, [index]: event.target.checked }))} />
              <span>{criterion}</span>
            </label>)}
          </fieldset>
        </div> : null}
      </section>
    </div>
  );
}
