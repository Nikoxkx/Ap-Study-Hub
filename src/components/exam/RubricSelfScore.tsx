"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useStoredState } from "@/lib/use-stored-state";
import type { ExamFrq, Rubric, RubricRow } from "@/content/exams/types";
import { writtenWorkCopy } from "@/lib/subjects";

/**
 * Self-scoring against the official rubric.
 *
 * The written tasks are not graded for the student. The panel shows the actual
 * published rubric rows — the descriptors the AP reader in May will use — and
 * the student awards each row themselves, recording why. The only automatic
 * part is a word count and a short checklist of things readers look for, which
 * is there to make an honest judgement easier, not to replace it.
 *
 * Marks are saved per course and task, so a re-read a week later starts from the
 * previous decision rather than from a blank form.
 */

interface SelfMark {
  points: Record<string, number>;
  notes: Record<string, string>;
  markedAt: number | null;
}

const EMPTY_MARK: SelfMark = { points: {}, notes: {}, markedAt: null };

function reviveMark(value: unknown): SelfMark | null {
  if (typeof value !== "object" || value === null) return null;
  const record = value as Record<string, unknown>;
  const points: Record<string, number> = {};
  const notes: Record<string, string> = {};
  if (typeof record.points === "object" && record.points) {
    for (const [key, entry] of Object.entries(record.points as Record<string, unknown>)) {
      if (typeof entry === "number" && Number.isFinite(entry)) points[key] = entry;
    }
  }
  if (typeof record.notes === "object" && record.notes) {
    for (const [key, entry] of Object.entries(record.notes as Record<string, unknown>)) {
      if (typeof entry === "string") notes[key] = entry;
    }
  }
  return {
    points,
    notes,
    markedAt: typeof record.markedAt === "number" ? record.markedAt : null,
  };
}

/** Descriptors are written top-down; the scale is the row's legal point values. */
function scaleOf(row: RubricRow): number[] {
  const fromDescriptors = row.descriptors.map((descriptor) => descriptor.points);
  return [...new Set([...row.scale, ...fromDescriptors])].sort((a, b) => b - a);
}

function descriptorFor(row: RubricRow, points: number): string {
  return (
    row.descriptors.find((descriptor) => descriptor.points === points)?.text ??
    row.descriptors[row.descriptors.length - 1]?.text ??
    ""
  );
}

export function RubricSelfScore({
  courseSlug,
  frq,
  rubric,
  response,
  onScored,
}: {
  courseSlug: string;
  frq: ExamFrq;
  rubric: Rubric;
  response: string;
  onScored: (frqId: string, earned: number) => void;
}) {
  const [mark, setMark] = useStoredState<SelfMark>(`aps.selfscore.${courseSlug}.${frq.id}`, EMPTY_MARK, reviveMark);
  const [showRubric, setShowRubric] = useState(true);
  const written = writtenWorkCopy(courseSlug);

  const words = useMemo(() => {
    const plain = response.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ");
    return plain.trim() ? (plain.trim().match(/\S+/g) ?? []).length : 0;
  }, [response]);

  const earned = rubric.rows.reduce((sum, row) => sum + (mark.points[row.id] ?? 0), 0);
  const complete = rubric.rows.every((row) => mark.points[row.id] !== undefined);

  const setPoints = (rowId: string, points: number, at: number) => {
    const next: SelfMark = {
      ...mark,
      points: { ...mark.points, [rowId]: points },
      markedAt: at,
    };
    setMark(next);
    onScored(
      frq.id,
      rubric.rows.reduce((sum, row) => sum + (next.points[row.id] ?? 0), 0),
    );
  };

  return (
    <div className="selfscore">
      <div className="selfscore-head">
        <div>
          <p className="label">Score it yourself · official rubric</p>
          <h4>{rubric.title}</h4>
          <p className="selfscore-source">{rubric.source}</p>
        </div>
        <div className="selfscore-total" data-complete={complete ? "true" : "false"}>
          <strong>{earned}</strong>
          <span>/{rubric.total}</span>
          <p>{complete ? "every row marked" : "rows still unmarked"}</p>
        </div>
      </div>

      {words < 25 ? (
        <p className="selfscore-warn">
          This response is {words} words. A reader would not see a complete {written.singular} here — mark the rows
          honestly rather than generously.
        </p>
      ) : null}

      <div className="selfscore-actions">
        <button type="button" className="btn btn-quiet btn-sm" onClick={() => setShowRubric((value) => !value)}>
          {showRubric ? "Hide the descriptors" : "Show the descriptors"}
        </button>
        <span className="selfscore-words">{words} words</span>
        <Link href={`/course/${courseSlug}/essays`} className="selfscore-link">
          Compare with a full-credit exemplar →
        </Link>
      </div>

      <ol className="selfscore-rows">
        {rubric.rows.map((row) => {
          const scale = scaleOf(row);
          const chosen = mark.points[row.id];
          return (
            <li key={row.id} data-row={row.id}>
              <div className="selfscore-row-head">
                <div>
                  <strong>{row.label}</strong>
                  <span className="selfscore-max">{row.maxPoints} possible</span>
                </div>
                <div className="selfscore-scale" role="group" aria-label={`${row.label} points`}>
                  {scale.map((points) => (
                    <button
                      key={points}
                      type="button"
                      aria-pressed={chosen === points}
                      data-chosen={chosen === points ? "true" : "false"}
                      onClick={() => setPoints(row.id, points, Date.now())}
                    >
                      {points}
                    </button>
                  ))}
                </div>
              </div>

              {showRubric ? (
                <ul className="selfscore-descriptors">
                  {[...row.descriptors]
                    .sort((a, b) => b.points - a.points)
                    .map((descriptor) => (
                      <li key={descriptor.points} data-current={chosen === descriptor.points ? "true" : "false"}>
                        <span className="selfscore-points">{descriptor.points}</span>
                        <span>{descriptor.text}</span>
                      </li>
                    ))}
                </ul>
              ) : chosen !== undefined ? (
                <p className="selfscore-chosen">
                  <span className="label">You awarded {chosen}</span> {descriptorFor(row, chosen)}
                </p>
              ) : null}

              <label className="selfscore-note">
                <span className="label">Why did you award that? (optional, saves as you type)</span>
                <textarea
                  className="field"
                  rows={2}
                  value={mark.notes[row.id] ?? ""}
                  placeholder="Quote the sentence that earned it, or the one that was missing."
                  onChange={(event) =>
                    setMark({ ...mark, notes: { ...mark.notes, [row.id]: event.target.value }, markedAt: Date.now() })
                  }
                />
              </label>
            </li>
          );
        })}
      </ol>

      <div className="selfscore-foot">
        <p>
          {mark.markedAt
            ? `Last marked ${new Date(mark.markedAt).toLocaleDateString()} · saved in this browser.`
            : "Nothing marked yet. Work top-down: a thesis is worth one point or none, and the evidence rows are decided by what the commentary explains, not by how much is quoted."}
        </p>
        <p className="selfscore-fine">
          The AP reader awards these rows in May. This panel exists so you practise reading your own writing the
          way that reader will, not so a machine can replace the judgement.
        </p>
      </div>
    </div>
  );
}
