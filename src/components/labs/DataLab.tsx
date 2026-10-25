"use client";

import { useState } from "react";
import type { DataLab as DataLabDefinition } from "@/content/labs";
import { Math as Tex } from "@/lib/math";
import { scheduleReview, type StudyItem } from "@/lib/study-model";
import { useStudyState } from "@/lib/use-study-state";

export function DataLab({ lab, courseLabel }: { lab: DataLabDefinition; courseLabel: string }) {
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [, setStudy] = useStudyState();
  const yIndex = Math.max(1, lab.columns.findIndex((column) => column.toLowerCase() === lab.yLabel.toLowerCase()));
  const points = lab.rows.map((row) => ({ x: Number(row[0]), y: Number(row[yIndex]) }));
  const xs = points.map((point) => point.x), ys = points.map((point) => point.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const rawMinY = Math.min(0, ...ys), rawMaxY = Math.max(0, ...ys);
  const padding = Math.max(1, (rawMaxY - rawMinY) * 0.12);
  const minY = rawMinY - padding, maxY = rawMaxY + padding;
  const sx = (value: number) => 56 + ((value - minX) / Math.max(0.0001, maxX - minX)) * 590;
  const sy = (value: number) => 22 + ((maxY - value) / Math.max(0.0001, maxY - minY)) * 260;
  const path = points.map((point, index) => `${index ? "L" : "M"}${sx(point.x)},${sy(point.y)}`).join(" ");

  const check = () => {
    if (choice === null) return;
    const correct = choice === lab.correctIndex;
    setChecked(true);
    const item: StudyItem = {
      id: `lab:${lab.id}`, kind: "lab", courseSlug: lab.courseSlug,
      courseLabel,
      prompt: lab.prompt, answer: lab.choices[lab.correctIndex], explanation: lab.explanation,
      href: `/course/${lab.courseSlug}/studio?tab=lab`,
      lessonHref: `/course/${lab.courseSlug}/notes#unit-${lab.unitNumber}`,
      unitNumber: lab.unitNumber, skill: lab.title,
    };
    setStudy((current) => scheduleReview(current, {
      itemId: item.id, item, courseSlug: lab.courseSlug, kind: "practice",
      correct, grade: correct ? "good" : "again", chosen: lab.choices[choice],
    }));
  };

  return (
    <div>
      <p className="lab-context">{lab.context}</p>
      <div className="data-lab-grid">
        <div className="table-scroll">
          <table className="data-table">
            <caption className="sr-only">{lab.title}: {lab.xLabel} and {lab.yLabel}</caption>
            <thead><tr>{lab.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
            <tbody>{lab.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => cellIndex === 0
              ? <th key={cellIndex} scope="row">{cell}</th>
              : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <svg viewBox="0 0 690 340" className="lab-graph" role="img" aria-label={`${lab.title}: ${lab.xLabel} versus ${lab.yLabel}`}>
          <title>{lab.xLabel} versus {lab.yLabel}</title>
          <line x1={56} x2={646} y1={sy(0)} y2={sy(0)} className="graph-axis" />
          <line x1={56} x2={56} y1={22} y2={282} className="graph-axis" />
          <path d={path} className="graph-data-line" />
          {points.map((point, index) => <g key={index}>
            <circle cx={sx(point.x)} cy={sy(point.y)} r={6} className="graph-point" />
            <text x={sx(point.x)} y={308} textAnchor="middle" className="graph-label">{point.x}</text>
            <text x={sx(point.x)} y={sy(point.y) - 12} textAnchor="middle" className="graph-label">{point.y}</text>
          </g>)}
          <text x={350} y={334} textAnchor="middle" className="graph-label">{lab.xLabel}</text>
          <text x={12} y={22} className="graph-label">{lab.yLabel}</text>
        </svg>
      </div>
      <div className="lab-equation mt-5"><Tex>{lab.calculation}</Tex></div>

      <fieldset className="mt-6" disabled={checked}>
        <legend className="mb-3 font-semibold">{lab.prompt}</legend>
        <div className="space-y-2">
          {lab.choices.map((option, index) => <label key={option} className="lab-choice" data-selected={choice === index} data-correct={checked && (index === lab.correctIndex || choice === index) ? index === lab.correctIndex : undefined}>
            <input type="radio" name={`lab-${lab.id}`} checked={choice === index} onChange={() => setChoice(index)} />
            <span>{option}</span>
                {checked && (index === lab.correctIndex || choice === index) ? <span className="answer-status">{index === lab.correctIndex ? "✓ Correct" : "✗ Incorrect"}</span> : null}
          </label>)}
        </div>
      </fieldset>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" className="btn btn-solid btn-sm" disabled={choice === null || checked} onClick={check}>Check conclusion</button>
        {checked ? <button type="button" className="btn btn-outline btn-sm" onClick={() => { setChecked(false); setChoice(null); }}>Try again</button> : null}
      </div>
      {checked ? <div className="feedback-box mt-4" data-correct={choice === lab.correctIndex} aria-live="polite">
        <strong>{choice === lab.correctIndex ? "Best-supported conclusion" : "Revisit the evidence"}</strong>
        <p>{lab.explanation}</p>
      </div> : null}
    </div>
  );
}
