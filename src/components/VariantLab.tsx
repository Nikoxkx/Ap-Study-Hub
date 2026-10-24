"use client";

import { useMemo, useState } from "react";
import { generateVariants, type GeneratedVariant } from "@/content/variants";
import { MathAwareText } from "@/lib/math";
import { scheduleReview, type StudyItem } from "@/lib/study-model";
import { useStudyState } from "@/lib/use-study-state";
import type { SubjectSlug } from "@/lib/subjects";

export function VariantLab({ courseSlug }: { courseSlug: SubjectSlug }) {
  const [seed, setSeed] = useState("1");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [, setStudy] = useStudyState();
  const variants = useMemo(() => generateVariants(courseSlug, seed), [courseSlug, seed]);

  const check = (variant: GeneratedVariant) => {
    const choice = answers[variant.id];
    if (choice === undefined) return;
    const correct = choice === variant.correctIndex;
    setChecked((current) => ({ ...current, [variant.id]: true }));
    const item: StudyItem = {
      id: variant.id, kind: "variant", courseSlug, courseLabel: variant.courseLabel,
      prompt: variant.prompt, answer: variant.options[variant.correctIndex], explanation: variant.explanation,
      href: `/course/${courseSlug}/studio?tab=variants`,
      lessonHref: `/course/${courseSlug}/notes#unit-${variant.unitNumber}`,
      unitNumber: variant.unitNumber, skill: variant.skill,
    };
    setStudy((current) => scheduleReview(current, {
      itemId: item.id, item, courseSlug, kind: "practice", correct,
      grade: correct ? "good" : "again", chosen: variant.options[choice],
    }));
  };

  return (
    <div>
      <div className="variant-toolbar no-print">
        <label><span className="label">Reproducible seed</span><input className="field mt-2" value={seed} maxLength={40}
          onChange={(event) => setSeed(event.target.value)} /></label>
        <div><p className="label mb-2">Same seed, same questions</p><p className="text-[0.8125rem]">Share the seed to compare reasoning, or change it for a fresh validated set.</p></div>
        <button type="button" className="btn btn-outline btn-sm" onClick={() => { setAnswers({}); setChecked({}); setSeed((current) => String((Number.parseInt(current, 10) || 0) + 1)); }}>Next seed</button>
      </div>
      <div className="variant-grid">
        {variants.map((variant) => {
          const choice = answers[variant.id];
          const done = Boolean(checked[variant.id]);
          const valid = new Set(variant.options).size === variant.options.length && variant.correctIndex >= 0 && variant.correctIndex < variant.options.length;
          return <article key={variant.id} className="variant-card">
            <p className="label mb-2">{variant.skill} · lesson {variant.unitNumber}</p>
            <p className="variant-prompt"><MathAwareText>{variant.prompt}</MathAwareText></p>
            {valid ? <fieldset disabled={done}>
              <legend className="sr-only">{variant.prompt}</legend>
              {variant.options.map((option, index) => <label key={option} className="lab-choice" data-selected={choice === index}>
                <input type="radio" name={variant.id} checked={choice === index} onChange={() => setAnswers((current) => ({ ...current, [variant.id]: index }))} />
                <span><MathAwareText>{option}</MathAwareText></span>
              </label>)}
            </fieldset> : <p role="alert">This variant failed validation and was not presented for scoring.</p>}
            <div className="mt-4 flex items-center gap-3">
              <button type="button" className="btn btn-solid btn-sm" disabled={!valid || choice === undefined || done} onClick={() => check(variant)}>Check answer</button>
              {done ? <span className="label" aria-live="polite">{choice === variant.correctIndex ? "Correct" : "Added to mistakes"}</span> : null}
            </div>
            {done ? <div className="feedback-box mt-4" data-correct={choice === variant.correctIndex}>
              <strong>{choice === variant.correctIndex ? "Correct" : `Correct answer: ${variant.options[variant.correctIndex]}`}</strong>
              <p><MathAwareText>{variant.explanation}</MathAwareText></p>
            </div> : null}
          </article>;
        })}
      </div>
    </div>
  );
}
