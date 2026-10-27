"use client";

import { useCallback, useMemo, useState } from "react";
import { useStoredState } from "@/lib/use-stored-state";
import type { ExamFrq, Rubric } from "@/content/exams/types";
import type { GradeResult } from "@/lib/grading/grade";

/**
 * Rubric grader panel.
 *
 * Two methods, labelled on screen:
 *   - "Rubric analysis" runs in the browser over the measured features of the
 *     response (no network, no key).
 *   - "AI reader" posts the response and the resolved rubric to /api/grade. It
 *     uses a key from the server environment if the deployment has one, or a
 *     key the student pastes here, which is kept in this browser only.
 *
 * The score is always reported as "on this rubric", never as a College Board
 * score for the essay.
 */

const EMPTY_KEYS = { provider: "openai", key: "", model: "" };

type StoredKeys = typeof EMPTY_KEYS;

function reviveKeys(value: unknown): StoredKeys | null {
  if (typeof value !== "object" || value === null) return null;
  const record = value as Record<string, unknown>;
  return {
    provider: typeof record.provider === "string" ? record.provider : "openai",
    key: typeof record.key === "string" ? record.key : "",
    model: typeof record.model === "string" ? record.model : "",
  };
}

function reviveGrade(value: unknown): GradeResult | null {
  if (typeof value !== "object" || value === null) return null;
  const record = value as Record<string, unknown>;
  if (!Array.isArray(record.rows)) return null;
  return value as GradeResult;
}

export function GraderPanel({
  courseSlug,
  frq,
  rubric,
  response,
  sources,
  onGraded,
}: {
  courseSlug: string;
  frq: ExamFrq;
  rubric: Rubric;
  response: string;
  /** The excerpt or document set printed with the task, if any. */
  sources?: string;
  onGraded: (frqId: string, earned: number) => void;
}) {
  const gradeKey = `aps.grade.${courseSlug}.${frq.id}`;
  const [storedGrade, setStoredGrade] = useStoredState<GradeResult | null>(gradeKey, null, reviveGrade);
  const [keys, setKeys] = useStoredState<StoredKeys>("aps.ai.keys", EMPTY_KEYS, reviveKeys);
  const [showKeys, setShowKeys] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const words = useMemo(() => (response.trim() ? response.trim().split(/\s+/).length : 0), [response]);

  const runLocal = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const { gradeLocally } = await import("@/lib/grading/grade");
      const result = gradeLocally(response, rubric, { sources });
      setStoredGrade(result);
      onGraded(frq.id, result.earned);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The rubric analysis failed.");
    } finally {
      setBusy(false);
    }
  }, [frq.id, onGraded, response, rubric, setStoredGrade, sources]);

  const runAi = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const headers: Record<string, string> = { "content-type": "application/json" };
      if (keys.key.trim()) {
        headers["x-ai-key"] = keys.key.trim();
        headers["x-ai-provider"] = keys.provider;
        if (keys.model.trim()) headers["x-ai-model"] = keys.model.trim();
      }
      const request = await fetch("/api/grade", {
        method: "POST",
        headers,
        body: JSON.stringify({ courseSlug, frqId: frq.id, response }),
      });
      const payload = (await request.json()) as { result?: GradeResult; error?: string };
      if (!request.ok || !payload.result) {
        throw new Error(payload.error ?? `The grader returned ${request.status}.`);
      }
      setStoredGrade(payload.result);
      onGraded(frq.id, payload.result.earned);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The AI reader could not be reached.");
    } finally {
      setBusy(false);
    }
  }, [courseSlug, frq.id, keys, onGraded, response, setStoredGrade]);

  const grade = storedGrade;

  return (
    <div className="grader">
      <div className="grader-actions">
        <button type="button" className="btn btn-solid btn-sm" onClick={runLocal} disabled={busy || words < 5}>
          {busy ? "Marking…" : "Rubric analysis"}
        </button>
        <button type="button" className="btn btn-outline btn-sm" onClick={runAi} disabled={busy || words < 5}>
          AI reader
        </button>
        <button type="button" className="btn btn-quiet btn-sm" onClick={() => setShowKeys((value) => !value)}>
          {keys.key ? "AI key set" : "AI settings"}
        </button>
        <span className="grader-words">{words} words</span>
      </div>

      {showKeys ? (
        <div className="grader-keys">
          <p>
            The AI reader uses a key supplied by this deployment if one is configured. If not, paste your
            own. It is stored in this browser only and sent with each request to your own copy of this site.
          </p>
          <div className="grader-key-row">
            <label>
              <span className="label">Provider</span>
              <select
                value={keys.provider}
                onChange={(event) => setKeys({ ...keys, provider: event.target.value })}
                className="field"
              >
                <option value="openai">OpenAI</option>
                <option value="anthropic">Anthropic</option>
                <option value="google">Google Gemini</option>
              </select>
            </label>
            <label>
              <span className="label">Model (optional)</span>
              <input
                className="field"
                value={keys.model}
                placeholder={keys.provider === "openai" ? "gpt-4o-mini" : keys.provider === "anthropic" ? "claude-3-5-sonnet-latest" : "gemini-2.0-flash"}
                onChange={(event) => setKeys({ ...keys, model: event.target.value })}
              />
            </label>
            <label>
              <span className="label">API key</span>
              <input
                className="field"
                type="password"
                autoComplete="off"
                value={keys.key}
                onChange={(event) => setKeys({ ...keys, key: event.target.value })}
                placeholder="sk-…"
              />
            </label>
          </div>
          <p className="grader-fine">
            Leave the key blank to use only the offline rubric analysis. Nothing is uploaded when the key is
            blank.
          </p>
        </div>
      ) : null}

      {error ? (
        <p role="alert" className="grader-error">
          {error}
        </p>
      ) : null}

      {grade ? (
        <div className="grader-result">
          <div className="grader-score">
            <p className="grader-earned">
              {grade.earned}
              <span>/{grade.possible}</span>
            </p>
            <p className="label">
              {grade.method === "ai"
                ? `AI reader · ${grade.provider ?? "model"}${grade.model ? ` · ${grade.model}` : ""}`
                : "Offline rubric analysis"}
            </p>
          </div>

          <p className="grader-summary">{grade.summary}</p>
          {grade.notice ? <p className="grader-notice">{grade.notice}</p> : null}

          <ol className="rubric-rows">
            {grade.rows.map((row) => (
              <li key={row.id} data-met={row.points === row.maxPoints ? "full" : row.points === 0 ? "none" : "partial"}>
                <div className="rubric-row-head">
                  <strong>{row.label}</strong>
                  <span className="rubric-points">
                    {row.points}/{row.maxPoints}
                  </span>
                </div>
                <p className="rubric-feedback">{row.feedback}</p>
                {row.signals.length ? (
                  <ul className="rubric-signals">
                    {row.signals.map((signal) => (
                      <li key={signal.note} data-ok={signal.satisfied ? "true" : "false"}>
                        <span aria-hidden="true">{signal.satisfied ? "✓" : "✗"}</span>
                        <span>
                          <strong>{signal.note}</strong> — {signal.measured}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <p className="rubric-improve">
                  <span className="label">Next revision</span> {row.improve}
                </p>
              </li>
            ))}
          </ol>

          <div className="grader-grid">
            <section>
              <h4 className="label">What works</h4>
              <ul>
                {grade.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h4 className="label">Fix first</h4>
              <ul>
                {grade.priorities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className="grader-mechanics">
            <h4 className="label">Grammar, spelling, and clarity</h4>
            <p className="grader-fine">{grade.mechanicsSummary}</p>
            {grade.mechanics.length ? (
              <ul>
                {grade.mechanics.map((issue, index) => (
                  <li key={`${issue.rule}-${index}`} data-severity={issue.severity}>
                    <span className="mech-rule">{issue.rule}</span>
                    <span className="mech-message">{issue.message}</span>
                    <span className="mech-snippet">{issue.snippet}</span>
                    {issue.suggestion ? <span className="mech-suggestion">→ {issue.suggestion}</span> : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="grader-fine">No patterns matched. The rules only catch the issues listed in the method note.</p>
            )}
          </section>

          <dl className="grader-stats">
            <div><dt>Sentences</dt><dd>{grade.stats.sentenceCount}</dd></div>
            <div><dt>Paragraphs</dt><dd>{grade.stats.paragraphCount}</dd></div>
            <div><dt>Avg. sentence</dt><dd>{grade.stats.averageSentenceLength} words</dd></div>
            <div><dt>Quotations</dt><dd>{grade.stats.quotationCount}</dd></div>
            <div><dt>Commentary</dt><dd>{grade.stats.commentaryCount}</dd></div>
            <div><dt>Reasoning links</dt><dd>{grade.stats.reasoningLinks}</dd></div>
          </dl>

          <div className="grader-method">
            <h4 className="label">How this was marked</h4>
            <p>
              {grade.method === "ai"
                ? "A language model was given the four rubric rows, the prompt, the passage, and your response, and asked to award each row's points with quoted evidence and to list real mechanics errors. Borderline judgements are pushed to the lower value."
                : "Measured against the rubric rows: thesis detection, quotation and citation counts, commentary-to-evidence ratio, explicit reasoning links, and the named mechanics rules. No measurement reads for meaning the way a human reader does, so use the row-by-row evidence to check the judgement yourself."}
            </p>
            <p className="grader-fine">
              Either way this is practice marking, not an official score. The AP reader in May is the authority.
            </p>
          </div>

          {grade.thesisSentence ? (
            <p className="grader-thesis">
              <span className="label">Claim detected</span> “{grade.thesisSentence}”
            </p>
          ) : (
            <p className="grader-thesis">
              <span className="label">Claim</span> {grade.thesisReason}
            </p>
          )}
        </div>
      ) : (
        <p className="grader-fine">
          {words < 5
            ? "Write a response first. The grader will not mark an empty page."
            : "Run either marker. Both score the same rubric rows; the AI reader can weigh meaning, the offline analysis can only measure what is on the page."}
        </p>
      )}
    </div>
  );
}
