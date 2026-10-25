"use client";

import Link from "next/link";
import { useState } from "react";
import { MathAwareText } from "@/lib/math";
import type { MistakeRecord, StudyItem } from "@/lib/study-model";
import { useStudyState } from "@/lib/use-study-state";
import type { SubjectSlug } from "@/lib/subjects";

export function MistakeNotebook({ items, courseSlug, onReview }: { items: StudyItem[]; courseSlug: SubjectSlug | "all"; onReview: () => void }) {
  const [study, setStudy] = useStudyState();
  const [showResolved, setShowResolved] = useState(false);
  const byId = new Map(items.map((item) => [item.id, item]));
  const mistakes = Object.values(study.mistakes)
    .filter((mistake) => showResolved || !mistake.resolvedAt)
    .map((mistake) => ({ mistake, item: byId.get(mistake.itemId) }))
    .filter((entry): entry is { mistake: MistakeRecord; item: StudyItem } => Boolean(entry.item))
    .filter((entry) => courseSlug === "all" || entry.item.courseSlug === courseSlug)
    .sort((a, b) => b.mistake.at - a.mistake.at);

  return (
    <section aria-labelledby="mistake-notebook-heading">
      <div className="panel-heading">
        <div><p className="label">Your mistake notebook</p><h2 id="mistake-notebook-heading">Fix the thinking, not just the answer</h2><p>Missed practice, lab conclusions, case matches, variants, and “again” marks arrive here with their original explanation.</p></div>
        <button type="button" className="btn btn-outline btn-sm" aria-pressed={showResolved} onClick={() => setShowResolved((value) => !value)}>{showResolved ? "Hide resolved" : "Include resolved"}</button>
      </div>
      {mistakes.length === 0 ? <div className="study-empty"><h3>No {showResolved ? "" : "unresolved "}mistakes in this filter</h3><p>Complete a practice item or review a card. A miss will appear here automatically; nothing is uploaded.</p></div> : <ol className="mistake-list">
        {mistakes.map(({ mistake, item }) => <li key={item.id} className="mistake-entry" data-resolved={Boolean(mistake.resolvedAt)}>
          <div className="mistake-meta"><span>{item.courseLabel} · {item.skill || item.kind}</span><time dateTime={new Date(mistake.at).toISOString()}>{new Date(mistake.at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</time></div>
          <h3><MathAwareText>{item.prompt}</MathAwareText></h3>
          <div className="mistake-answers">
            <p><span>Your response</span><MathAwareText>{mistake.chosen || "Not answered"}</MathAwareText></p>
            <p><span>Correct answer</span><MathAwareText>{item.answer}</MathAwareText></p>
          </div>
          {item.explanation ? <p className="mistake-explanation"><MathAwareText>{item.explanation}</MathAwareText></p> : null}
          <div className="mistake-actions no-print">
            {item.lessonHref ? <Link href={item.lessonHref} className="link-underlined">Review lesson {item.unitNumber}{item.lessonTitle ? ` · ${item.lessonTitle}` : ""} →</Link> : <Link href={item.href} className="link-underlined">Open original activity →</Link>}
            <button type="button" className="btn btn-outline btn-sm" onClick={() => {
              setStudy((current) => ({ ...current, reviews: { ...current.reviews, [item.id]: { ...(current.reviews[item.id] ?? { interval: 0, ease: 2.5, reps: 0, lapses: 0, lastAt: Date.now(), lastGrade: "again" }), due: 0 } } }));
              onReview();
            }}>Review now</button>
            <button type="button" className="btn btn-quiet btn-sm" onClick={() => setStudy((current) => ({ ...current, mistakes: { ...current.mistakes, [item.id]: { ...mistake, resolvedAt: mistake.resolvedAt ? undefined : Date.now() } } }))}>
              {mistake.resolvedAt ? "Reopen" : "Mark resolved"}
            </button>
          </div>
        </li>)}
      </ol>}
    </section>
  );
}
