"use client";

import Link from "next/link";
import { useState } from "react";
import { mcqStrategies } from "@/content/exams/rubrics";
import type { Assessment, ExamQuestion, Stimulus } from "@/content/exams/types";
import { WritingCoach } from "./WritingCoach";
import { ExemplarResponse } from "./ExemplarResponse";
import { getExemplar } from "@/content/exams/exemplars";
import { StimulusTable } from "./StimulusTable";

/**
 * Guided walkthrough.
 *
 * The same paper, taught rather than timed. Each multiple-choice item is
 * unpacked as a procedure: what the stem is asking, what to predict before
 * reading the options, which trap the distractors are built to catch, and why
 * the credited option survives. Each written task opens the full writing coach
 * and the full-credit outline.
 *
 * Nothing here is automatic: the answer stays hidden until the student commits
 * to an attempt, because a walkthrough that shows the answer first teaches
 * recognition instead of reasoning.
 */

const LETTERS = ["A", "B", "C", "D", "E"];

const TRAPS: { match: RegExp; trap: string }[] = [
  { match: /tone|attitude/i, trap: "The trap is an answer that describes the subject of the passage rather than the speaker's attitude toward it. Reread the last two lines before choosing." },
  { match: /figurative|imagery|metaphor|symbol/i, trap: "The trap is an answer that names a device without explaining its effect, or that reads a metaphor literally. Ask what the image makes the reader see." },
  { match: /structure|volta|shift/i, trap: "The trap is an answer that is true of the text but does not describe the structural move the question asks about." },
  { match: /diction|syntax|punctuation/i, trap: "The trap is a plausible-sounding effect with no textual evidence in the lines cited. Locate the exact words first." },
  { match: /character/i, trap: "The trap is an inference the passage never supports. Character answers need a line that shows the trait, not just a line that is consistent with it." },
  { match: /theme|meaning|interpretation/i, trap: "The trap is a moral or cliché that the passage gestures at but does not argue." },
  { match: /irony|narrative voice|point of view/i, trap: "The trap is reading the narrator's voice as the author's opinion. Separate who speaks from who wrote." },
  { match: /calculation|math|quantitative|numeric/i, trap: "The trap is a units error or an inverted ratio. Write the formula before substituting." },
  { match: /graph|data|figure/i, trap: "The trap is a trend that is true in one part of the graph but not the whole period. Read the axes and the legend first." },
  { match: /federalism|institution|constitution/i, trap: "The trap is naming the right principle for the wrong level of government. Identify the actor before the concept." },
  { match: /required|document|case/i, trap: "The trap is a case name with another case's holding. Say the holding before you answer." },
  { match: /experiment|variable|control/i, trap: "The trap is a control that is really a constant, or a design with no comparison group." },
  { match: /evolution|selection|allele/i, trap: "The trap is teleology: 'the organism adapted in order to survive'. Selection acts on variation, not on intention." },
  { match: /energy|efficiency|trophic/i, trap: "The trap is using the wrong trophic level as the denominator, or forgetting to convert units." },
  { match: /policy|solution|management/i, trap: "The trap is a proposal with no mechanism. Say what the intervention changes and why that matters." },
];

function trapFor(skill: string): string {
  return (
    TRAPS.find((entry) => entry.match.test(skill))?.trap ??
    "The trap is an option that is true in general but does not answer this exact question. Underline the verb in the stem before reading the choices."
  );
}

function Passage({ stimulus }: { stimulus: Stimulus }) {
  return (
    <figure className="exam-stimulus">
      <figcaption>
        <span className="label">{stimulus.kind}</span>
        <strong>{stimulus.title}</strong>
        {stimulus.attribution ? <span className="exam-attribution">{stimulus.attribution}</span> : null}
      </figcaption>
      {stimulus.table ? <StimulusTable stimulus={stimulus} /> : <pre className="exam-passage">{stimulus.text}</pre>}
    </figure>
  );
}

function QuestionWalk({
  question,
  index,
  courseSlug,
  strategy,
}: {
  question: ExamQuestion;
  index: number;
  courseSlug: string;
  strategy?: string[];
}) {
  const [choice, setChoice] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [steps, setSteps] = useState(false);
  const correct = question.correctIndex;

  return (
    <li className="walk-question" data-revealed={revealed ? "true" : "false"}>
      <div className="walk-question-head">
        <span className="walk-number">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <p className="walk-question-text">{question.question}</p>
          <p className="walk-skill">
            <span className="label">Testing</span> {question.skill}
          </p>
        </div>
      </div>

      <div className="walk-options">
        {question.options.map((option, optionIndex) => (
          <label
            key={optionIndex}
            data-state={
              revealed
                ? optionIndex === correct
                  ? "correct"
                  : optionIndex === choice
                    ? "chosen-wrong"
                    : "neutral"
                : optionIndex === choice
                  ? "chosen"
                  : "neutral"
            }
          >
            <input
              type="radio"
              name={`walk-${question.key}`}
              checked={choice === optionIndex}
              disabled={revealed}
              onChange={() => {
                setChoice(optionIndex);
                setRevealed(true);
              }}
              className="sr-only"
            />
            <span className="exam-option-letter">{LETTERS[optionIndex]}</span>
            <span>{option}</span>
          </label>
        ))}
      </div>

      <div className="walk-actions">
        <button type="button" className="btn btn-outline btn-sm" onClick={() => setSteps((value) => !value)}>
          {steps ? "Hide the method" : "Show the method"}
        </button>
        {!revealed ? (
          <button type="button" className="btn btn-quiet btn-sm" onClick={() => setRevealed(true)}>
            Show the answer
          </button>
        ) : null}
      </div>

      {steps ? (
        <ol className="walk-steps">
          <li>
            <strong>Read the stem for its task.</strong> Underline the verb — describe, explain, analyse,
            identify. Answering a different verb is the most common lost point.
          </li>
          <li>
            <strong>Predict before you look.</strong> Cover the options and say your own answer in four words.
            The choices are written to tempt a reader without a prediction.
          </li>
          <li>
            <strong>Eliminate on evidence.</strong> {trapFor(question.skill)}
          </li>
          {strategy?.[1] ? (
            <li>
              <strong>Course-specific move.</strong> {strategy[1]}
            </li>
          ) : null}
          <li>
            <strong>Check the credited answer against the whole passage</strong>, not just the line you were
            reading when you chose.
          </li>
        </ol>
      ) : null}

      {revealed ? (
        <div className="walk-reveal">
          <p>
            <strong>
              {choice === null
                ? "The answer"
                : choice === correct
                  ? "You chose the credited answer"
                  : `You chose ${LETTERS[choice]}; the credited answer is ${LETTERS[correct]}`}
              :
            </strong>{" "}
            {LETTERS[correct]} — {question.options[correct]}
          </p>
          <p>{question.explanation}</p>
          {choice !== null && choice !== correct ? (
            <p className="walk-diagnosis">
              <span className="label">Why yours fails</span>{" "}
              {question.optionExplanations?.[choice] ??
                `Option ${LETTERS[choice]} is not supported as directly as the credited reading. Compare the two against the exact lines the question cites, and ask which one the passage would have to change to make true.`}
            </p>
          ) : null}
          {question.unitNumber ? (
            <p className="walk-lesson">
              <Link href={`/course/${courseSlug}/notes#unit-${question.unitNumber}`} className="link-underlined">
                Read lesson {question.unitNumber}
                {question.lessonTitle ? ` · ${question.lessonTitle}` : ""} →
              </Link>
            </p>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}

export function GuidedWalkthrough({
  assessment,
  courseSlug,
  courseLabel,
}: {
  assessment: Assessment;
  courseSlug: string;
  courseLabel: string;
}) {
  const [sectionIndex, setSectionIndex] = useState(0);
  const section = assessment.sections[sectionIndex];
  const strategy = mcqStrategies[courseSlug];

  return (
    <div className="walkthrough">
      <header className="walk-head">
        <p className="label">Guided walkthrough · no clock</p>
        <h3>Learn how to answer {courseLabel} questions</h3>
        <p>
          The same paper as the simulation, taught one question at a time. Commit to an answer, then read the
          method and the reasoning. Use this mode the day before; use the simulation the week before.
        </p>
      </header>

      {strategy ? (
        <section className="walk-strategy">
          <h4 className="label">{strategy.title}</h4>
          <p className="walk-timing">{strategy.timing}</p>
          <ol>
            {strategy.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      ) : null}

      <nav className="walk-sections" aria-label="Sections">
        {assessment.sections.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={index === sectionIndex}
            onClick={() => setSectionIndex(index)}
          >
            {item.name.replace(/^(Section [IV]+[^—]*|Part [AB])/, (match) => match.trim())}
            <span>
              {item.type === "mcq" ? `${item.questions.length} questions` : `${item.frqs.length} written`}
            </span>
          </button>
        ))}
      </nav>

      {section.type === "mcq" ? (
        <ol className="walk-list">
          {section.questions.map((question, index) => {
            const stimulus = question.stimulusId
              ? section.stimuli.find((candidate) => candidate.id === question.stimulusId)
              : undefined;
            const previous = section.questions[index - 1];
            const showStimulus = stimulus && previous?.stimulusId !== stimulus.id;
            return (
              <li key={question.key} className="walk-item">
                {showStimulus && stimulus ? <Passage stimulus={stimulus} /> : null}
                <QuestionWalk
                  question={question}
                  index={index}
                  courseSlug={courseSlug}
                  strategy={strategy?.steps}
                />
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="walk-frqs">
          {section.frqs.map((frq) => {
            const exemplar = getExemplar(frq.id);
            return (
            <article key={frq.id} className="sheet walk-frq">
              <header>
                <p className="label">
                  {frq.taskType} · {frq.points} points · {frq.minutes} minutes
                </p>
                <h4>{frq.title}</h4>
              </header>
              {(frq.stimulusIds ?? []).map((id) => {
                const stimulus = section.stimuli.find((candidate) => candidate.id === id);
                return stimulus ? <Passage key={id} stimulus={stimulus} /> : null;
              })}
              <p className="walk-frq-prompt">{frq.prompt}</p>
              <div className="walk-frq-plan">
                <h5 className="label">Write it in this order</h5>
                <ol>
                  {frq.coach.steps.map((step) => (
                    <li key={step.title}>
                      <strong>{step.title}.</strong> {step.detail}
                      {step.frame ? <em> Frame: “{step.frame}”</em> : null}
                    </li>
                  ))}
                </ol>
              </div>
              <WritingCoach frq={frq} rubricTotal={frq.points} />
              {exemplar ? <ExemplarResponse exemplar={exemplar} /> : null}
            </article>
            );
          })}
        </div>
      )}

      <p className="walk-footnote">
        Nothing is scored in this mode. The score report belongs to the simulation.
      </p>
    </div>
  );
}
