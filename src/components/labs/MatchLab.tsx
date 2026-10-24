"use client";

import { useState } from "react";
import type { MatchLab as MatchLabDefinition } from "@/content/labs";
import { scheduleReview, type StudyItem, type StudyState } from "@/lib/study-model";
import { useStudyState } from "@/lib/use-study-state";

export function MatchLab({ lab, courseLabel }: { lab: MatchLabDefinition; courseLabel: string }) {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [, setStudy] = useStudyState();
  const correct = lab.cases.filter((item) => matches[item.id] === item.principle).length;

  const check = () => {
    setChecked(true);
    setStudy((current) => lab.cases.reduce((state: StudyState, item) => {
      const chosen = matches[item.id];
      const isCorrect = chosen === item.principle;
      const studyItem: StudyItem = {
        id: `lab:${lab.id}:${item.id}`, kind: "lab", courseSlug: lab.courseSlug, courseLabel,
        prompt: `Which constitutional principle best connects to ${item.name}?`,
        answer: item.principle, explanation: item.explanation,
        href: `/course/${lab.courseSlug}/studio?tab=lab`,
        lessonHref: `/course/${lab.courseSlug}/notes#unit-${lab.unitNumber}`,
        unitNumber: lab.unitNumber, skill: "Case–principle connections",
      };
      return scheduleReview(state, {
        itemId: studyItem.id, item: studyItem, courseSlug: lab.courseSlug, kind: "practice",
        correct: isCorrect, grade: isCorrect ? "good" : "again", chosen,
      });
    }, current));
  };

  return (
    <div>
      <div className="match-list">
        {lab.cases.map((item) => {
          const isCorrect = matches[item.id] === item.principle;
          return <article key={item.id} className="match-card" data-correct={checked ? isCorrect : undefined}>
            <div>
              <h4>{item.name}</h4>
              <p>{item.holding}</p>
            </div>
            <label>
              <span className="label">Constitutional principle</span>
              <select className="field mt-2" value={matches[item.id] ?? ""} disabled={checked}
                aria-label={`Principle for ${item.name}`}
                onChange={(event) => setMatches((current) => ({ ...current, [item.id]: event.target.value }))}>
                <option value="" disabled>Choose a principle</option>
                {lab.principles.map((principle) => <option key={principle}>{principle}</option>)}
              </select>
            </label>
            {checked ? <p className="match-explanation"><strong>{isCorrect ? "Connected" : `Best connection: ${item.principle}`}</strong> {item.explanation}</p> : null}
          </article>;
        })}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="button" className="btn btn-solid btn-sm" onClick={check}
          disabled={checked || lab.cases.some((item) => !matches[item.id])}>Check all connections</button>
        {checked ? <>
          <span className="tnum text-[0.875rem]" aria-live="polite">{correct}/{lab.cases.length} connected</span>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => { setChecked(false); setMatches({}); }}>Reset matches</button>
        </> : null}
      </div>
    </div>
  );
}
