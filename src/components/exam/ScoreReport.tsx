"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useStoredState } from "@/lib/use-stored-state";
import type { Assessment } from "@/content/exams/types";
import { getRubricForFrq, scoreAssessment, skillBreakdown, unitBreakdown } from "@/lib/exams";
import { GraderPanel } from "./GraderPanel";

/**
 * Score report.
 *
 * What it does, in order: computes the composite the way the exam weights its
 * sections; converts that to a published-estimate AP score with the caveat on
 * screen; lists every multiple-choice response with the lesson that teaches it;
 * and hands each written answer to the rubric grader, which returns row-by-row
 * points, quoted evidence, and mechanics errors.
 *
 * The response list is the part students actually use, so it is filterable by
 * outcome and every row links to the exact lesson unit it belongs to.
 */

const LETTERS = ["A", "B", "C", "D", "E"];

type Filter = "all" | "wrong" | "right" | "blank" | "flagged";

function formatMinutes(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

interface Attempt {
  at: string;
  composite: number;
  apScore: number | null;
  mcqCorrect: number;
  mcqTotal: number;
  frqEarned: number;
  frqPossible: number;
}

function reviveAttempts(value: unknown): Attempt[] | null {
  if (!Array.isArray(value)) return null;
  return value.filter((item): item is Attempt => typeof item === "object" && item !== null && "at" in item);
}

export function ScoreReport({
  assessment,
  courseSlug,
  courseLabel,
  mcqAnswers,
  flags,
  frqScores,
  elapsedBySection,
  drafts,
  onFrqScore,
  onRetake,
}: {
  assessment: Assessment;
  courseSlug: string;
  courseLabel: string;
  mcqAnswers: Record<string, number>;
  flags: Record<string, boolean>;
  frqScores: Record<string, number>;
  elapsedBySection: Record<string, number>;
  drafts: Record<string, string>;
  onFrqScore: (frqId: string, earned: number) => void;
  onRetake: () => void;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [attempts, setAttempts] = useStoredState<Attempt[]>(`aps.attempts.${courseSlug}`, [], reviveAttempts);

  const score = useMemo(
    () => scoreAssessment(assessment, mcqAnswers, frqScores),
    [assessment, mcqAnswers, frqScores],
  );
  const skills = useMemo(() => skillBreakdown(assessment, mcqAnswers), [assessment, mcqAnswers]);
  const units = useMemo(() => unitBreakdown(assessment, mcqAnswers), [assessment, mcqAnswers]);

  const allMcq = assessment.sections.flatMap((section) =>
    section.questions.map((question) => ({ section, question })),
  );

  const filtered = allMcq.filter(({ question }) => {
    const given = mcqAnswers[question.key];
    const correct = given === question.correctIndex;
    if (filter === "wrong") return given !== undefined && !correct;
    if (filter === "right") return correct;
    if (filter === "blank") return given === undefined;
    if (filter === "flagged") return Boolean(flags[question.key]);
    return true;
  });

  const counts = {
    all: allMcq.length,
    wrong: allMcq.filter(({ question }) => mcqAnswers[question.key] !== undefined && mcqAnswers[question.key] !== question.correctIndex).length,
    right: allMcq.filter(({ question }) => mcqAnswers[question.key] === question.correctIndex).length,
    blank: allMcq.filter(({ question }) => mcqAnswers[question.key] === undefined).length,
    flagged: allMcq.filter(({ question }) => flags[question.key]).length,
  };

  const weakUnits = [...units]
    .filter((unit) => unit.total > 0 && unit.correct / unit.total < 0.75)
    .sort((a, b) => a.correct / a.total - b.correct / b.total)
    .slice(0, 3);
  const weakSkills = skills.filter((skill) => skill.total > 0 && skill.correct / skill.total < 0.7).slice(0, 3);

  const frqs = assessment.sections.flatMap((section) =>
    section.frqs.map((frq) => ({ section, frq })),
  );

  const saveAttempt = () => {
    const attempt: Attempt = {
      at: new Date().toISOString(),
      composite: Math.round(score.composite * 10) / 10,
      apScore: score.apScore,
      mcqCorrect: score.mcqCorrect,
      mcqTotal: score.mcqTotal,
      frqEarned: score.frqEarned,
      frqPossible: score.frqPossible,
    };
    setAttempts([attempt, ...attempts].slice(0, 8));
  };

  return (
    <div className="score-report">
      <section className="score-hero">
        <div>
          <p className="label">Interim assessment · {courseLabel}</p>
          <h3 className="score-title">Your score report</h3>
          <p className="score-blurb">
            Section weights follow the published exam: {assessment.blueprint.mcqWeight}% multiple choice,{" "}
            {assessment.blueprint.frqWeight}% free response. Written answers count only after you mark them with
            the rubric grader, so the estimate below rises as you grade each essay.
          </p>
        </div>
        <div className="score-hero-figures">
          <div>
            <p className="score-big">
              {score.mcqTotal ? `${score.mcqCorrect}/${score.mcqTotal}` : "—"}
            </p>
            <p className="label">multiple choice</p>
          </div>
          <div>
            <p className="score-big">
              {score.frqPossible ? `${score.frqEarned}/${score.frqPossible}` : "—"}
            </p>
            <p className="label">rubric points</p>
          </div>
          <div>
            <p className="score-big score-ap">
              {score.apScore ?? "—"}
              <span>{score.apScore ? "/5" : ""}</span>
            </p>
            <p className="label">estimated AP score</p>
          </div>
        </div>
      </section>

      <p className="score-caveat">
        Composite: {score.composite.toFixed(1)}/100 using this paper&apos;s weights. The 1–5 estimate uses
        published cut-score estimates, not the College Board&apos;s conversion for this year; treat it as a
        sanity check, not a prediction.
      </p>

      <section className="score-sections">
        <h4 className="label">By section</h4>
        <table>
          <thead>
            <tr>
              <th scope="col">Section</th>
              <th scope="col">Questions</th>
              <th scope="col">Points</th>
              <th scope="col">Time used</th>
            </tr>
          </thead>
          <tbody>
            {score.sections.map((section) => {
              const full = assessment.sections.find((candidate) => candidate.id === section.sectionId);
              const elapsed = elapsedBySection[section.name] ?? 0;
              return (
                <tr key={section.sectionId}>
                  <th scope="row">{section.name}</th>
                  <td>{section.total ? `${section.correct}/${section.total}` : "—"}</td>
                  <td>{section.possible ? `${section.earned}/${section.possible}` : "—"}</td>
                  <td>
                    {formatMinutes(elapsed)} / {formatMinutes((full?.minutes ?? 0) * 60)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {(weakUnits.length || weakSkills.length) && allMcq.length ? (
        <section className="score-next">
          <h4 className="label">Study this next</h4>
          <ul>
            {weakUnits.map((unit) => (
              <li key={`unit-${unit.unitNumber}`}>
                <Link href={`/course/${courseSlug}/notes#unit-${unit.unitNumber}`} className="link-underlined">
                  Lesson {unit.unitNumber}
                </Link>{" "}
                — {unit.correct}/{unit.total} correct on this paper. Read the lesson, then redo those questions.
              </li>
            ))}
            {weakSkills.map((skill) => (
              <li key={`skill-${skill.skill}`}>
                <strong>{skill.skill}</strong> — {skill.correct}/{skill.total}.{" "}
                <Link href={`/course/${courseSlug}/practice`} className="link-underlined">
                  Drill this skill
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {allMcq.length ? (
        <section className="score-responses">
          <div className="score-responses-head">
            <div>
              <h4 className="label">Every response</h4>
              <p className="score-blurb">
                {counts.all} questions · {counts.right} right · {counts.wrong} wrong · {counts.blank} blank ·{" "}
                {counts.flagged} flagged. Each row names the skill and the lesson to revisit.
              </p>
            </div>
            <div className="response-filters" role="group" aria-label="Filter responses">
              {(["all", "wrong", "right", "blank", "flagged"] as Filter[]).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={filter === value}
                  onClick={() => setFilter(value)}
                >
                  {value} <span>{counts[value]}</span>
                </button>
              ))}
            </div>
          </div>

          <ol className="response-list">
            {filtered.map(({ question }, index) => {
              const given = mcqAnswers[question.key];
              const correct = given === question.correctIndex;
              return (
                <li key={question.key} data-correct={given === undefined ? "blank" : correct ? "true" : "false"}>
                  <div className="response-head">
                    <span className="response-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="response-status">
                      {given === undefined ? "Blank" : correct ? "Correct" : "Incorrect"}
                    </span>
                    <span className="response-skill">{question.skill}</span>
                    {flags[question.key] ? <span className="response-flag">⚑ flagged</span> : null}
                  </div>
                  <p className="response-question">{question.question}</p>
                  <p className="response-choice">
                    <strong>You chose:</strong>{" "}
                    {given === undefined ? "nothing" : `${LETTERS[given]} — ${question.options[given]}`}
                  </p>
                  {!correct ? (
                    <p className="response-choice response-answer">
                      <strong>Answer:</strong> {LETTERS[question.correctIndex]} — {question.options[question.correctIndex]}
                    </p>
                  ) : null}
                  <p className="response-explanation">{question.explanation}</p>
                  {question.unitNumber ? (
                    <p className="response-lesson">
                      <Link href={`/course/${courseSlug}/notes#unit-${question.unitNumber}`} className="link-underlined">
                        Study lesson {question.unitNumber}
                        {question.lessonTitle ? ` · ${question.lessonTitle}` : ""} →
                      </Link>
                    </p>
                  ) : (
                    <p className="response-lesson">
                      <Link href={`/course/${courseSlug}/practice`} className="link-underlined">
                        Practise {question.skill.toLowerCase()} →
                      </Link>
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      ) : null}

      {frqs.length ? (
        <section className="score-frqs">
          <h4 className="label">Written responses, marked row by row</h4>
          <p className="score-blurb">
            Each task is marked against the rubric printed with it. Use the row-level evidence to check the
            judgement; a reader awards points for what is present, not for what was intended.
          </p>
          {frqs.map(({ frq }) => {
            const rubric = getRubricForFrq(frq);
            return (
            <article key={frq.id} className="sheet score-frq">
              <header>
                <p className="label">
                  {frq.taskType} · {frq.points} points
                </p>
                <h5>{frq.title}</h5>
              </header>
              <p className="score-frq-prompt">{frq.prompt}</p>
              <details className="score-frq-rubric">
                <summary>Rubric rows</summary>
                <ul>
                  {(rubric?.rows ?? []).map((row) => (
                    <li key={row.id}>
                      <strong>
                        {row.label} ({row.maxPoints})
                      </strong>
                      <ul>
                        {row.descriptors.map((descriptor) => (
                          <li key={descriptor.points} data-points={descriptor.points}>
                            {descriptor.points} — {descriptor.text}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </details>
              <div className="score-frq-response">
                <h5 className="label">What you wrote</h5>
                <p>{drafts[frq.id]?.trim() || "Nothing was written for this task."}</p>
              </div>
              {rubric ? (
                <GraderPanel
                  courseSlug={courseSlug}
                  frq={frq}
                  rubric={rubric}
                  response={drafts[frq.id] ?? ""}
                  onGraded={onFrqScore}
                />
              ) : null}
            </article>
            );
          })}
        </section>
      ) : null}

      <section className="score-attempts">
        <div className="score-attempts-head">
          <div>
            <h4 className="label">Attempt history</h4>
            <p className="score-blurb">Saved in this browser only. Compare sittings to see whether the pacing or the knowledge changed.</p>
          </div>
          <div className="score-attempts-actions">
            <button type="button" className="btn btn-outline btn-sm" onClick={saveAttempt}>
              Save this attempt
            </button>
            <button type="button" className="btn btn-solid btn-sm" onClick={onRetake}>
              Sit it again
            </button>
          </div>
        </div>
        {attempts.length ? (
          <ol className="attempt-list">
            {attempts.map((attempt) => (
              <li key={attempt.at}>
                <span>{new Date(attempt.at).toLocaleString()}</span>
                <span>
                  {attempt.mcqCorrect}/{attempt.mcqTotal} MC · {attempt.frqEarned}/{attempt.frqPossible} rubric
                </span>
                <span>{attempt.composite.toFixed(1)}/100</span>
                <strong>{attempt.apScore ?? "—"}</strong>
              </li>
            ))}
          </ol>
        ) : (
          <p className="score-blurb">No saved attempts yet.</p>
        )}
      </section>
    </div>
  );
}
