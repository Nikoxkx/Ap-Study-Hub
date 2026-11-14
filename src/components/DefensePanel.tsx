import type { CourseDefense, UnitDefense } from "@/content/written-work";
import type { Subject } from "@/lib/subjects";
import { defenseNote, defenseScript } from "@/content/humanize";
import { getDefenseTask } from "@/content/plain-language";
import { InlineMathText } from "@/lib/math";

/**
 * "Defend it out loud."
 *
 * Every AP paper asks some version of the same question — how do you know? —
 * and almost no revision material prepares a student to answer it in speech.
 * This panel gives them the words: what to keep from the unit as evidence,
 * the question that actually gets asked, and the answer in the order the
 * words come out.
 *
 * The lines are deliberately written the way a student talks, including the
 * hesitations ("I am not certain about…"), because a defense is not an essay
 * read aloud and a student who rehearses an essay will freeze at the first
 * follow-up question.
 */
export function DefensePanel({
  subject,
  courseDefense,
  unitDefense,
  compact = false,
}: {
  subject: Subject;
  courseDefense?: CourseDefense;
  unitDefense?: UnitDefense;
  compact?: boolean;
}) {
  const task = getDefenseTask(subject.slug);
  if (!courseDefense) return null;

  return (
    <section className="defense-panel" aria-labelledby={`defense-${subject.slug}-${unitDefense?.unitNumber ?? "course"}`}>
      <header className="defense-head">
        <div>
          <p className="label mb-2">Defend it out loud</p>
          <h4 id={`defense-${subject.slug}-${unitDefense?.unitNumber ?? "course"}`} className="defense-title">
            {unitDefense ? `How to defend lesson ${unitDefense.unitNumber}` : "How to defend this course"}
          </h4>
        </div>
        <span className="tag defense-tag">
          {unitDefense
            ? `${unitDefense.keep.length} pieces of evidence · ${unitDefense.answer.length} lines`
            : `${courseDefense.frames.length} sentence frames · ${courseDefense.units.length} units`}
        </span>
      </header>

      <p className="defense-lede">{defenseNote}</p>

      {task && !compact ? (
        <div className="defense-two-col">
          <div className="defense-cell">
            <p className="label mb-1.5">What this course really marks</p>
            <p>{courseDefense.claim}</p>
          </div>
          <div className="defense-cell">
            <p className="label mb-1.5">The question you will actually be asked</p>
            <p className="defense-question">{task.hardestQuestion}</p>
          </div>
        </div>
      ) : null}

      {unitDefense ? (
        <div className="defense-body">
          <div className="defense-cell">
            <p className="label mb-2">Keep these from the lesson — they are your evidence</p>
            <ul className="defense-keep">
              {unitDefense.keep.map((item) => (
                <li key={item}>
                  <InlineMathText>{item}</InlineMathText>
                </li>
              ))}
            </ul>
          </div>

          <div className="defense-cell defense-answer">
            <p className="label mb-2">Then say this, in this order</p>
            <ol className="defense-steps">
              {unitDefense.answer.map((step, index) => (
                <li key={step}>
                  <span className="defense-step-number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span>
                    <InlineMathText>{step}</InlineMathText>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : null}

      <details className="defense-script">
        <summary className="defense-script-summary">
          <span className="label">Sentence starters, if you freeze</span>
          <span className="label" aria-hidden="true">
            +
          </span>
        </summary>
        <div className="defense-script-body">
          {(
            [
              ["Open", defenseScript.opener],
              ["Work through it", defenseScript.middle],
              ["Point at your evidence", defenseScript.evidence],
              ["Close", defenseScript.close],
              ["If you are unsure", defenseScript.repair],
            ] as const
          ).map(([label, lines]) => (
            <div key={label}>
              <p className="label mb-1.5">{label}</p>
              <ul className="defense-script-list">
                {lines.map((line) => (
                  <li key={line}>&ldquo;{line}&rdquo;</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>

      {courseDefense ? (
        <details className="defense-script">
          <summary className="defense-script-summary">
            <span className="label">Frames that sound right in {subject.familiar}</span>
            <span className="label" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="defense-script-body">
            <div>
              <p className="label mb-1.5">Say it like this</p>
              <ul className="defense-script-list">
                {courseDefense.frames.map((frame) => (
                  <li key={frame}>&ldquo;{frame}&rdquo;</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label mb-1.5">What a defense in this subject is marked on</p>
              <ul className="defense-keep">
                {courseDefense.markedOn.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      ) : null}
    </section>
  );
}
