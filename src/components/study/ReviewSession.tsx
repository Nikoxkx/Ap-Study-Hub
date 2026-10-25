"use client";

import Link from "next/link";
import { useState } from "react";
import { MathAwareText } from "@/lib/math";
import { scheduleReview, type ReviewGrade, type StudyItem } from "@/lib/study-model";
import { useStudyState } from "@/lib/use-study-state";

const grades: { id: ReviewGrade; label: string; detail: string }[] = [
  { id: "again", label: "Again", detail: "10 min" },
  { id: "hard", label: "Hard", detail: "shorter step" },
  { id: "good", label: "Good", detail: "normal step" },
  { id: "easy", label: "Easy", detail: "longer step" },
];

export function ReviewSession({ items, limit = 12, onComplete }: { items: StudyItem[]; limit?: number; onComplete?: () => void }) {
  const [revealed, setRevealed] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [finished, setFinished] = useState(false);
  const [target] = useState(() => Math.min(limit, items.length));
  const [, setStudy] = useStudyState();
  const item = items[0];

  const grade = (value: ReviewGrade) => {
    if (!item) return;
    setStudy((current) => scheduleReview(current, {
      itemId: item.id, item: item.kind === "variant" || item.kind === "lab" ? item : undefined,
      courseSlug: item.courseSlug, kind: "review", grade: value,
      correct: value !== "again", chosen: value === "again" ? "Could not retrieve during Due Today" : undefined,
    }));
    const next = completed + 1;
    setCompleted(next); setRevealed(false);
    if (next >= target) { setFinished(true); onComplete?.(); }
  };

  if (finished || (!item && completed > 0)) {
    return <div className="study-empty"><p className="label">Nice work</p><h3>{completed} {completed === 1 ? "item" : "items"} retrieved</h3><p>Your ratings have set the next intervals. Missed items remain in the notebook with their explanations and lesson links.</p>{onComplete ? <button type="button" className="btn btn-solid btn-sm" onClick={onComplete}>Continue focus session</button> : null}</div>;
  }
  if (!item) {
    return <div className="study-empty"><p className="label">All clear</p><h3>Your queue is clear for now</h3><p>Choose another course or add work from cards, practice, variants, or an interactive lab.</p></div>;
  }

  return (
    <div className="review-session">
      <div className="review-progress">
        <p className="label">Due Today · {Math.min(completed + 1, target)} of {target}</p>
        <div role="progressbar" aria-valuemin={0} aria-valuemax={target} aria-valuenow={completed} aria-label="Review session progress"><span style={{ width: `${target ? (completed / target) * 100 : 0}%` }} /></div>
        <p>{item.courseLabel} · {item.kind}{item.skill ? ` · ${item.skill}` : ""}</p>
      </div>
      <article className="review-card">
        <p className="review-prompt"><MathAwareText>{item.prompt}</MathAwareText></p>
        {!revealed ? <button type="button" className="btn btn-outline" onClick={() => setRevealed(true)}>Reveal answer</button> : <div className="review-answer enter-fade">
          <p className="label mb-2">Answer</p>
          <p><MathAwareText>{item.answer}</MathAwareText></p>
          {item.explanation ? <p className="review-explanation"><MathAwareText>{item.explanation}</MathAwareText></p> : null}
          {item.lessonHref ? <Link href={item.lessonHref} className="link-underlined">Review {item.lessonTitle ? `· ${item.lessonTitle}` : `lesson ${item.unitNumber}`} →</Link> : null}
        </div>}
      </article>
      <div className="review-grades" aria-label="Schedule next review">
        {grades.map((option) => <button key={option.id} type="button" data-grade={option.id} disabled={!revealed} onClick={() => grade(option.id)}>
          <span>{option.label}</span><small>{option.detail}</small>
        </button>)}
      </div>
      <p className="review-hint">Grade retrieval honestly. “Again” returns in ten minutes; the other intervals grow from your previous ratings.</p>
    </div>
  );
}
