import type { CoachGuide, Rubric, RubricRow } from "./types";

/**
 * Rubric and coaching templates.
 *
 * Every row below is a restatement of a published College Board scoring row in
 * plainer language. The point values are the official ones. Where a course uses
 * a task-specific set of rows (AP Biology, AP Calculus, AP Macroeconomics, AP
 * Environmental Science), the rows are written next to the question they belong
 * to in the course file, because that is how the scoring guidelines work.
 *
 * The `signals` arrays are what the offline analyzer measures. They are
 * deliberately mechanical and transparent: a student can see exactly which
 * sentence-level expectation was checked, and a reader can see that the tool is
 * not inventing a grade.
 */

function row(
  id: string,
  label: string,
  maxPoints: number,
  scale: number[],
  descriptors: { points: number; text: string }[],
  signals: RubricRow["signals"],
): RubricRow {
  return { id, label, maxPoints, scale, descriptors, signals };
}

function rubric(id: string, title: string, source: string, rows: RubricRow[]): Rubric {
  return { id, title, source, rows, total: rows.reduce((sum, item) => sum + item.maxPoints, 0) };
}

/* ------------------------------------------------------------------ */
/* AP English Literature and Composition · AP English Language         */
/* ------------------------------------------------------------------ */

const sixPointAnalytic = (kind: "literary" | "rhetorical" | "argument" | "synthesis") => {
  const thesisText =
    kind === "literary"
      ? "Responds to the prompt with a thesis that presents a defensible interpretation of the passage or work."
      : kind === "rhetorical"
        ? "Responds to the prompt with a thesis that analyzes the writer's rhetorical choices rather than summarising the passage."
        : kind === "synthesis"
          ? "Responds to the prompt with a defensible thesis that takes a position and is supported by at least three of the sources."
          : "Responds to the prompt with a defensible thesis that takes a clear position on the issue.";
  return rubric(
    `six-${kind}`,
    kind === "synthesis" ? "Synthesis essay · 6-point analytic rubric" : kind === "argument" ? "Argument essay · 6-point analytic rubric" : kind === "rhetorical" ? "Rhetorical analysis · 6-point analytic rubric" : "Literary analysis · 6-point analytic rubric",
    "AP English analytic rubrics (thesis, evidence and commentary, sophistication).",
    [
      row(
        "thesis",
        "Thesis",
        1,
        [1, 0],
        [
          { points: 1, text: thesisText },
          { points: 0, text: "No defensible thesis, or a thesis that only restates the prompt or describes the passage." },
        ],
        [
          { type: "thesis", note: "A claim-bearing sentence in the opening paragraph" },
          { type: "evidence", min: 0, note: "Committed to an interpretation rather than a summary" },
        ],
      ),
      row(
        "evidence",
        "Evidence and Commentary",
        4,
        [4, 3, 2, 1, 0],
        [
          { points: 4, text: "Well-chosen evidence is consistently integrated, and commentary consistently explains how the evidence supports a line of reasoning and how the writer's or poet's choices produce meaning." },
          { points: 3, text: "Evidence supports a line of reasoning, but some commentary is undeveloped, repetitive, or only partly explains how the evidence works." },
          { points: 2, text: "Some relevant evidence is present, but commentary is superficial, predominantly summary, or only loosely tied to the thesis." },
          { points: 1, text: "Little relevant evidence, or evidence is listed without commentary that connects it to the thesis." },
          { points: 0, text: "No evidence, or the response does not address the prompt." },
        ],
        [
          { type: "quotation", min: kind === "synthesis" ? 2 : 3, note: "Three or more short quoted details from the text(s)" },
          ...(kind === "synthesis"
            ? ([
                { type: "citation", min: 2, note: "Source letters or locators, so the reader can check each use" },
                { type: "synthesis", min: 3, note: "At least three sources used, not just named" },
              ] as RubricRow["signals"])
            : []),
          { type: "commentary", min: 0.45, note: "Commentary sentences outnumber evidence sentences" },
          { type: "organization", min: 3, note: "Commentary sustained across at least three paragraphs" },
          { type: "line-of-reasoning", min: 2, note: "Two or more explicit 'because / therefore / which shows' links" },
        ],
      ),
      row(
        "sophistication",
        "Sophistication",
        1,
        [1, 0],
        [
          { points: 1, text: "Shows sophistication of thought: a qualified or nuanced claim, an alternative reading, a tension the text does not resolve, or a context that genuinely illuminates the argument." },
          { points: 0, text: "Reads as a competent but straightforward response with no complicating move." },
        ],
        [
          { type: "qualification", min: 1, note: "A qualification ('although', 'while', 'rather than') that does real work" },
          { type: "counterargument", min: 1, note: "An alternative reading or acknowledged limit, addressed rather than named" },
        ],
      ),
    ],
  );
};

/* ------------------------------------------------------------------ */
/* AP U.S. History                                                     */
/* ------------------------------------------------------------------ */

export const dbqRubric = rubric(
  "dbq-seven",
  "Document-Based Question · 7-point rubric",
  "AP U.S. History DBQ scoring guidelines: thesis, contextualization, evidence, sourcing, complexity.",
  [
    row("thesis", "Thesis / Claim", 1, [1, 0], [
      { points: 1, text: "Presents a thesis that makes a historically defensible claim and responds to all parts of the question, located in the introduction or conclusion." },
      { points: 0, text: "No thesis, or a thesis that restates the prompt or merely describes the documents." },
    ], [{ type: "thesis", note: "A defensible claim that answers the whole prompt" }]),
    row("context", "Contextualization", 1, [1, 0], [
      { points: 1, text: "Situates the argument in a broader historical context, beyond the documents and the immediate question." },
      { points: 0, text: "No context, or context that is only a general statement with no connection to the argument." },
    ], [{ type: "context", min: 1, note: "A wider development, period, or process framing the question" }]),
    row("docs", "Evidence from the Documents", 2, [2, 1, 0], [
      { points: 2, text: "Uses the content of at least three documents to address the topic of the prompt." },
      { points: 1, text: "Uses the content of at least two documents." },
      { points: 0, text: "Uses one or no documents." },
    ], [{ type: "synthesis", min: 3, note: "Document content used, not just named" }]),
    row("beyond", "Evidence Beyond the Documents", 1, [1, 0], [
      { points: 1, text: "Uses at least one specific historical fact, event, or development not mentioned in the documents to support the argument." },
      { points: 0, text: "No outside evidence, or outside evidence that is vague." },
    ], [{ type: "outside-evidence", min: 1, note: "One specific fact from outside the document set" }]),
    row("sourcing", "Sourcing and Situation", 1, [1, 0], [
      { points: 1, text: "Explains how or why the point of view, purpose, historical situation, or audience of at least two documents is relevant to the argument." },
      { points: 0, text: "Documents are quoted without attention to who wrote them, when, or why." },
    ], [{ type: "sourcing", min: 2, note: "Two documents analysed for point of view, purpose, situation, or audience" }]),
    row("complexity", "Complexity", 1, [1, 0], [
      { points: 1, text: "Demonstrates a complex understanding: nuance, contradictory evidence, continuity and change, or connections across periods." },
      { points: 0, text: "One-dimensional argument." },
    ], [{ type: "qualification", min: 1, note: "A counter-pattern, contradiction, or qualified claim" }]),
  ],
);

export const leqRubric = rubric(
  "leq-six",
  "Long Essay Question · 6-point rubric",
  "AP U.S. History LEQ scoring guidelines: thesis, contextualization, evidence, reasoning.",
  [
    row("thesis", "Thesis / Claim", 1, [1, 0], [
      { points: 1, text: "A historically defensible thesis that responds to all parts of the question." },
      { points: 0, text: "No thesis, or a thesis that restates the prompt." },
    ], [{ type: "thesis", note: "A claim that answers the whole prompt" }]),
    row("context", "Contextualization", 1, [1, 0], [
      { points: 1, text: "Relates the topic to a broader historical context." },
      { points: 0, text: "No wider context." },
    ], [{ type: "context", min: 1, note: "A broader historical development framing the argument" }]),
    row("evidence", "Evidence", 2, [2, 1, 0], [
      { points: 2, text: "Supports the argument with at least two specific, accurate examples of evidence." },
      { points: 1, text: "Supports the argument with one specific example." },
      { points: 0, text: "No specific evidence." },
    ], [{ type: "outside-evidence", min: 2, note: "Two or more specific historical examples" }]),
    row("reasoning", "Analysis and Reasoning", 2, [2, 1, 0], [
      { points: 2, text: "Uses historical reasoning (causation, comparison, or continuity and change) to structure the argument, and demonstrates complexity." },
      { points: 1, text: "Uses historical reasoning inconsistently, or explains significance without a complex understanding." },
      { points: 0, text: "Narrative with no historical reasoning." },
    ], [
      { type: "line-of-reasoning", min: 2, note: "Explicit causal or comparative links" },
      { type: "qualification", min: 1, note: "A counter-pattern or nuance" },
    ]),
  ],
);

export const saqRubric = rubric(
  "saq-three",
  "Short-Answer Question · 3-point rubric",
  "AP History SAQ scoring guidelines: one point per required task, each part answered separately.",
  [
    row("a", "Part (a)", 1, [1, 0], [
      { points: 1, text: "Accurately describes or identifies what part (a) asks for, with specific detail." },
      { points: 0, text: "Vague, inaccurate, or missing." },
    ], [{ type: "outside-evidence", min: 1, note: "A specific detail responsive to part (a)" }]),
    row("b", "Part (b)", 1, [1, 0], [
      { points: 1, text: "Explains what part (b) asks for, using reasoning rather than a label." },
      { points: 0, text: "Vague, inaccurate, or missing." },
    ], [{ type: "justification", min: 1, note: "A causal or analytic link in part (b)" }]),
    row("c", "Part (c)", 1, [1, 0], [
      { points: 1, text: "Answers part (c) fully, with evidence or explanation appropriate to the task." },
      { points: 0, text: "Vague, inaccurate, or missing." },
    ], [{ type: "outside-evidence", min: 1, note: "Specific support for part (c)" }]),
  ],
);

/* ------------------------------------------------------------------ */
/* AP U.S. Government and Politics                                     */
/* ------------------------------------------------------------------ */

export const govConceptRubric = rubric(
  "gov-concept-three",
  "Concept Application · 3-point rubric",
  "AP U.S. Government and Politics concept-application scoring guidelines.",
  [
    row("a", "Part (a) · Describe", 1, [1, 0], [
      { points: 1, text: "Accurately describes the political principle, institution, or behaviour the prompt names." },
      { points: 0, text: "Inaccurate or simply repeats the prompt." },
    ], [{ type: "definition", min: 1, note: "A definition or description in your own words" }]),
    row("b", "Part (b) · Explain the scenario", 1, [1, 0], [
      { points: 1, text: "Explains how the scenario relates to the principle, using specific details from the scenario." },
      { points: 0, text: "General assertion with no link to the scenario." },
    ], [{ type: "justification", min: 1, note: "An explicit link between scenario and principle" }]),
    row("c", "Part (c) · Explain the consequence", 1, [1, 0], [
      { points: 1, text: "Explains a political consequence, effect, or implication the prompt asks for." },
      { points: 0, text: "No consequence, or one that is not explained." },
    ], [{ type: "line-of-reasoning", min: 1, note: "A stated consequence with reasoning" }]),
  ],
);

export const govQuantRubric = rubric(
  "gov-quant-four",
  "Quantitative Analysis · 4-point rubric",
  "AP U.S. Government and Politics quantitative-analysis scoring guidelines.",
  [
    row("a", "Part (a) · Read the data", 1, [1, 0], [
      { points: 1, text: "Accurately identifies the data point, trend, or pattern the prompt asks about." },
      { points: 0, text: "Misreads the figure." },
    ], [{ type: "numeric-work", min: 1, note: "A number, percentage, or trend stated accurately" }]),
    row("b", "Part (b) · Explain the pattern", 1, [1, 0], [
      { points: 1, text: "Explains a political reason for the pattern in the data." },
      { points: 0, text: "Describes the data again instead of explaining it." },
    ], [{ type: "justification", min: 1, note: "A reason for the pattern, not a restatement" }]),
    row("c", "Part (c) · Connect to a principle", 1, [1, 0], [
      { points: 1, text: "Explains how the data relates to a required principle, document, or case." },
      { points: 0, text: "Names a principle without explaining the relation." },
    ], [{ type: "definition", min: 1, note: "A named principle or case plus its relevance" }]),
    row("d", "Part (d) · Draw a conclusion", 1, [1, 0], [
      { points: 1, text: "Draws a conclusion about the implications for government, politics, or policy." },
      { points: 0, text: "No conclusion, or a conclusion unsupported by the data." },
    ], [{ type: "conclusion", min: 1, note: "A consequence or implication drawn from the data" }]),
  ],
);

export const govScotusRubric = rubric(
  "gov-scotus-four",
  "SCOTUS Comparison · 4-point rubric",
  "AP U.S. Government and Politics SCOTUS-comparison scoring guidelines.",
  [
    row("a", "Part (a) · Describe the case", 1, [1, 0], [
      { points: 1, text: "Describes the facts, holding, or reasoning of the required Supreme Court case in the prompt." },
      { points: 0, text: "Case unnamed, misidentified, or described inaccurately." },
    ], [{ type: "definition", min: 1, note: "Case name plus an accurate description" }]),
    row("b", "Part (b) · Describe the comparison case", 1, [1, 0], [
      { points: 1, text: "Describes a second, relevant case (required or from the student's knowledge) with enough detail to compare." },
      { points: 0, text: "No second case, or a case described only by name." },
    ], [{ type: "comparison", min: 1, note: "A second case with a described holding or reasoning" }]),
    row("c", "Part (c) · Explain the comparison", 1, [1, 0], [
      { points: 1, text: "Explains a relevant similarity or difference in the constitutional reasoning of the two cases." },
      { points: 0, text: "Comparison asserted without explaining the reasoning." },
    ], [{ type: "comparison", min: 2, note: "An explicit similarity or difference in reasoning" }]),
    row("d", "Part (d) · Apply to the scenario", 1, [1, 0], [
      { points: 1, text: "Explains how the reasoning of the cases bears on the scenario in the prompt." },
      { points: 0, text: "No application to the scenario." },
    ], [{ type: "justification", min: 1, note: "A link from case reasoning to the scenario" }]),
  ],
);

export const govArgumentRubric = rubric(
  "gov-argument-six",
  "Argument Essay · 6-point rubric",
  "AP U.S. Government and Politics argument-essay scoring guidelines.",
  [
    row("thesis", "Thesis / Claim", 1, [1, 0], [
      { points: 1, text: "A defensible claim about the prompt's topic, taking a position rather than describing both sides." },
      { points: 0, text: "No claim, or a claim that restates the prompt." },
    ], [{ type: "thesis", note: "A position sentence in the opening paragraph" }]),
    row("evidence", "Evidence", 2, [2, 1, 0], [
      { points: 2, text: "Provides two or more specific, relevant pieces of evidence (a case, document, data point, or political development) and uses them in the argument." },
      { points: 1, text: "Provides one relevant piece of evidence, or two that are only named." },
      { points: 0, text: "No specific evidence." },
    ], [{ type: "evidence", min: 2, note: "Two specific required cases, documents, or data points" }]),
    row("reasoning", "Reasoning", 1, [1, 0], [
      { points: 1, text: "Explains how the evidence supports the claim, using political reasoning rather than assertion." },
      { points: 0, text: "Evidence dropped in without explanation." },
    ], [{ type: "line-of-reasoning", min: 1, note: "An explicit link from evidence to claim" }]),
    row("alternative", "Alternative Perspective", 1, [1, 0], [
      { points: 1, text: "Acknowledges and responds to an alternative perspective or a limitation of the argument." },
      { points: 0, text: "No alternative perspective." },
    ], [{ type: "counterargument", min: 1, note: "A named alternative view with a response" }]),
    row("sophistication", "Sophistication", 1, [1, 0], [
      { points: 1, text: "Extends the argument with a nuance, tension, or broader implication in American politics." },
      { points: 0, text: "Straightforward argument with no complicating move." },
    ], [{ type: "qualification", min: 1, note: "A qualification that does real work" }]),
  ],
);

/* ------------------------------------------------------------------ */
/* AP Seminar                                                          */
/* ------------------------------------------------------------------ */

export const seminarPartARubric = rubric(
  "seminar-a",
  "Part A · Argument analysis · 15-point rubric",
  "AP Seminar end-of-course exam Part A scoring guidelines.",
  [
    row("identify", "Identify the argument", 3, [3, 2, 1, 0], [
      { points: 3, text: "Fully identifies the author's argument, main idea, or thesis, including its scope or qualification." },
      { points: 2, text: "Partially identifies the argument, capturing the topic but missing a key qualifier or claim." },
      { points: 1, text: "Misstates or only gestures at the argument." },
      { points: 0, text: "No identification." },
    ], [{ type: "thesis", note: "The author's claim restated accurately in your own words" }]),
    row("reasoning", "Explain the line of reasoning", 6, [6, 4, 2, 0], [
      { points: 6, text: "Explains the line of reasoning by identifying multiple claims and the connections between them, including how the author moves from evidence to conclusion." },
      { points: 4, text: "Identifies several claims but explains only some of the connections." },
      { points: 2, text: "Lists claims without explaining how they build on one another." },
      { points: 0, text: "No line of reasoning." },
    ], [
      { type: "line-of-reasoning", min: 3, note: "Three or more claim-to-claim connections" },
      { type: "commentary", min: 0.4, note: "Explanation rather than quotation" },
    ]),
    row("evidence", "Evaluate the evidence", 6, [6, 4, 2, 0], [
      { points: 6, text: "Evaluates the effectiveness of the evidence: relevance, sufficiency, credibility, and what it cannot establish." },
      { points: 4, text: "Evaluates some evidence, with a general judgement about others." },
      { points: 2, text: "Describes the evidence without judging it." },
      { points: 0, text: "No evaluation of evidence." },
    ], [
      { type: "quotation", min: 2, note: "Named pieces of evidence under evaluation" },
      { type: "qualification", min: 1, note: "A limit, bias, or credibility judgement" },
    ]),
  ],
);

export const seminarPartBRubric = rubric(
  "seminar-b",
  "Part B · Evidence-based argument · 24-point rubric",
  "AP Seminar end-of-course exam Part B scoring guidelines.",
  [
    row("perspective", "Establish a perspective", 6, [6, 4, 2, 0], [
      { points: 6, text: "Establishes a clear, nuanced perspective on the theme that responds to the sources and is sustained throughout." },
      { points: 4, text: "Establishes a perspective but it is general or only partly sustained." },
      { points: 2, text: "Perspective is implied rather than stated." },
      { points: 0, text: "No perspective." },
    ], [{ type: "thesis", note: "A stated perspective that answers the theme" }]),
    row("reasoning", "Establish reasoning", 6, [6, 4, 2, 0], [
      { points: 6, text: "Well-organised argument with a logical progression of claims, each connected to the perspective." },
      { points: 4, text: "Logical progression with at least one gap or undeveloped claim." },
      { points: 2, text: "Claims are listed with weak or missing connections." },
      { points: 0, text: "No discernible organisation." },
    ], [{ type: "line-of-reasoning", min: 3, note: "Three or more explicit claim-to-claim links" }]),
    row("evidence", "Select and use evidence", 6, [6, 4, 2, 0], [
      { points: 6, text: "Selects relevant evidence from at least two sources, integrates it, and explains how it supports each claim." },
      { points: 4, text: "Uses evidence from two sources but explains only some of it." },
      { points: 2, text: "Uses one source, or quotes with little explanation." },
      { points: 0, text: "No source evidence." },
    ], [
      { type: "synthesis", min: 2, note: "At least two provided sources actually used" },
      { type: "commentary", min: 0.4, note: "Explanation of how evidence supports the claim" },
    ]),
    row("conventions", "Apply conventions", 6, [6, 4, 2, 0], [
      { points: 6, text: "Clear, controlled prose with consistent conventions; sources are attributed clearly." },
      { points: 4, text: "Generally clear, with some errors that do not obscure meaning." },
      { points: 2, text: "Frequent errors or unclear attribution that interfere with reading." },
      { points: 0, text: "Meaning is obscured." },
    ], [{ type: "mechanics", min: 0.9, note: "Mechanics errors below the tolerance for this length" }]),
  ],
);

/* ------------------------------------------------------------------ */
/* AP Research                                                         */
/* ------------------------------------------------------------------ */

export const researchPaperRubric = rubric(
  "research-paper",
  "Academic paper · 24-point practice rubric",
  "AP Research academic-paper scoring guidelines, condensed to the four judged categories.",
  [
    row("question", "Question and purpose", 6, [6, 4, 2, 0], [
      { points: 6, text: "A precise, researchable question, a clear purpose, and a defensible rationale grounded in the field." },
      { points: 4, text: "A workable question with a purpose that is only partly explained." },
      { points: 2, text: "Question is broad, descriptive, or not researchable as written." },
      { points: 0, text: "No identifiable question." },
    ], [{ type: "thesis", note: "A stated research question and purpose" }]),
    row("method", "Method, process, or approach", 6, [6, 4, 2, 0], [
      { points: 6, text: "A defensible method with justified choices, acknowledged limitations, and enough detail to repeat." },
      { points: 4, text: "A method described without justifying key choices." },
      { points: 2, text: "Method named but not described." },
      { points: 0, text: "No method." },
    ], [{ type: "experimental-design", min: 2, note: "Design terms: participants, instruments, analysis, limitations" }]),
    row("analysis", "Analysis and evaluation", 6, [6, 4, 2, 0], [
      { points: 6, text: "Interprets results against the question, evaluates evidence quality, and addresses alternative explanations." },
      { points: 4, text: "Interprets results but does not evaluate their strength." },
      { points: 2, text: "Reports results without interpretation." },
      { points: 0, text: "No analysis." },
    ], [
      { type: "commentary", min: 0.4, note: "Interpretation rather than reporting" },
      { type: "counterargument", min: 1, note: "An alternative explanation considered" },
    ]),
    row("conclusion", "Conclusion and implications", 6, [6, 4, 2, 0], [
      { points: 6, text: "Answers the question, states the significance and limits of the findings, and identifies a next step." },
      { points: 4, text: "Answers the question but generalises beyond the evidence or omits limits." },
      { points: 2, text: "Restates the introduction." },
      { points: 0, text: "No conclusion." },
    ], [
      { type: "conclusion", min: 1, note: "A conclusion that answers the question" },
      { type: "qualification", min: 1, note: "Limits of the findings" },
    ]),
  ],
);

/* ------------------------------------------------------------------ */
/* Coaching guides                                                     */
/* ------------------------------------------------------------------ */

const literaryCoach = (minutes: number): CoachGuide => ({
  task:
    "Write an interpretation of a literary passage, arguing what it means and how the writer's choices produce that meaning. The passage is the only evidence you need.",
  timeline: [
    { label: "Read for shift", minutes: Math.round(minutes * 0.12), detail: "Two passes: first for what happens and who speaks, second for the turn, the repeated word, the image that changes." },
    { label: "Plan the thesis", minutes: Math.round(minutes * 0.1), detail: "Name the interpretation and the device or pattern that carries it. One sentence, no plot summary." },
    { label: "Draft", minutes: Math.round(minutes * 0.63), detail: "Four or five paragraphs. Each body paragraph: claim, quotation, commentary on the effect." },
    { label: "Revise", minutes: Math.round(minutes * 0.15), detail: "Check every quotation is short and embedded, every paragraph advances the claim, and the last sentence answers 'so what'." },
  ],
  steps: [
    { title: "Annotate structure, not plot", detail: "Mark the volta or shift, the stanza or paragraph breaks, the first and last lines. In a sonnet, the turn is almost always the argument.", frame: "The poem turns at line ___ from ___ to ___." },
    { title: "Collect three details that repeat or change", detail: "Repetition, imagery, diction, syntax, punctuation, or a single word used twice with different weight. These become your body paragraphs." },
    { title: "Write a thesis that takes a risk", detail: "A thesis that could be argued the other way earns the thesis point; a thesis that could only be agreed with usually does not.", frame: "By [device], the writer turns [X] into [Y], revealing ___." },
    { title: "Commentary in a 2:1 ratio", detail: "For every line of quotation, write two sentences about how it works. The reader gives commentary points for the explanation, not the quote." },
    { title: "Close on meaning, not summary", detail: "End with what the passage claims about its subject and why the reader should care — not with a restatement of your thesis." },
  ],
  evidence: [
    "Quote four to eight words at a time and embed the quotation in your own sentence.",
    "Cite by line number (poetry) or paragraph (prose) so the reader can locate it instantly.",
    "Prefer a detail you can explain deeply over three details you can only name.",
    "If you cannot explain how a quotation creates meaning, cut it and choose another.",
  ],
  argument: [
    "One device per body paragraph, and one claim per device.",
    "Every paragraph should contain the words 'which' or 'because' connecting evidence to meaning.",
    "Consider an alternative reading in one sentence and answer it — that is the cheapest sophistication point on the exam.",
    "Keep tense consistent: write about the text in the present tense.",
  ],
  frames: [
    "The speaker's ___ suggests ___, but the ___ that follows complicates that reading by ___.",
    "The shift in ___ at line ___ reveals ___ rather than ___, which changes how we read the final ___.",
    "What looks like ___ is better understood as ___, because ___.",
  ],
  pitfalls: [
    "Summarising the passage instead of interpreting it.",
    "Naming a device ('the poet uses imagery') without explaining its effect.",
    "Block quotations that carry no commentary.",
    "A thesis that lists three devices instead of making one claim.",
  ],
});

const rhetoricalCoach = (minutes: number): CoachGuide => ({
  task:
    "Analyse how a writer's rhetorical choices — audience, purpose, structure, diction, syntax, evidence — work to achieve a purpose. You are analysing the writing, not agreeing with the argument.",
  timeline: [
    { label: "Read for the rhetorical situation", minutes: Math.round(minutes * 0.12), detail: "Who speaks, to whom, at what moment, and what do they want the audience to do or believe?" },
    { label: "Choose two or three choices", minutes: Math.round(minutes * 0.1), detail: "Pick choices that do different work: one structural, one at the level of diction or syntax, one in evidence or tone." },
    { label: "Draft", minutes: Math.round(minutes * 0.63), detail: "Thesis, then one body paragraph per choice, then a close that names the cumulative effect." },
    { label: "Revise", minutes: Math.round(minutes * 0.15), detail: "Delete summary sentences. Every quotation should be followed by 'which' or 'so that'." },
  ],
  steps: [
    { title: "Name the exigence", detail: "What occasioned this text? What is at stake for the writer right now?", frame: "Writing after ___, the author needs an audience of ___ to ___." },
    { title: "Map the structure", detail: "Where does the argument move? Concession, reversal, anecdote, statistic, direct address. Structure is a choice." },
    { title: "Pick choices with effects", detail: "Two or three choices you can explain at the level of a sentence. Drop anything you can only label." },
    { title: "Write a thesis about strategy", detail: "Not 'the author uses ethos, pathos, and logos' — that is a list. Make a claim about how the choices work together.", frame: "By ___, the writer positions the audience to ___ so that ___." },
    { title: "End with the effect, not the devices", detail: "What does the audience now believe, feel, or do? Close there." },
  ],
  evidence: [
    "Quote the exact words doing the work, then name the choice precisely (anaphora, juxtaposition, appeal to authority).",
    "Tie each quotation to a specific audience effect, not a generic one.",
    "Line or paragraph numbers keep you honest about what is actually on the page.",
  ],
  argument: [
    "Order body paragraphs by how the argument builds, not by device taxonomy.",
    "Explain shifts in tone as strategic moves.",
    "A concession paragraph is not a summary paragraph — it should show what the writer gains by conceding.",
  ],
  frames: [
    "The writer's repeated ___ converts a ___ audience into one prepared to ___.",
    "By placing ___ immediately after ___, the author makes ___ feel inevitable rather than argued.",
    "The shift from ___ to ___ is the argument: it asks the audience to ___.",
  ],
  pitfalls: [
    "Listing rhetorical devices with definitions instead of effects.",
    "Agreeing or disagreeing with the argument instead of analysing it.",
    "Ignoring the audience.",
    "Treating tone as a label ('the tone is critical') with no evidence of how it is built.",
  ],
});

const argumentCoach = (minutes: number): CoachGuide => ({
  task:
    "Take a position and defend it. Your evidence may come from your reading, your studies, or your own observation — specificity matters more than breadth.",
  timeline: [
    { label: "Take a side", minutes: Math.round(minutes * 0.1), detail: "Decide your position and the one counter-argument you will answer." },
    { label: "Choose evidence", minutes: Math.round(minutes * 0.12), detail: "Three concrete examples you actually know: a text, an event, a study, a personal observation with detail." },
    { label: "Draft", minutes: Math.round(minutes * 0.63), detail: "Thesis, two or three evidence paragraphs, one counter-argument paragraph, one conclusion that extends." },
    { label: "Revise", minutes: Math.round(minutes * 0.15), detail: "Check that each paragraph's claim is different and that no example is only named." },
  ],
  steps: [
    { title: "Decide the claim, not the topic", detail: "A defensible claim can be disagreed with. 'Activism matters' cannot." },
    { title: "Choose evidence you can develop", detail: "One example explained in four sentences beats four examples named in one." },
    { title: "Anticipate the strongest objection", detail: "State the best version of the other side and answer it. That is where the upper-half points live." },
    { title: "Qualify deliberately", detail: "Name the condition under which your claim holds. Qualification is not hedging; it is precision." },
  ],
  evidence: [
    "Use a mix: a specific text or study, a historical or current event, and one observation from your own experience.",
    "Give each example a name, a date, or a number.",
  ],
  argument: [
    "Claim → evidence → commentary in every paragraph.",
    "Reserve one paragraph for the counter-argument, placed before the conclusion.",
    "The conclusion should extend the claim, not restate it.",
  ],
  frames: [
    "The strongest objection is ___, but it assumes ___, which ___.",
    "This is not to say ___; rather, ___ holds precisely when ___.",
    "Once ___ is taken into account, the claim is narrower and stronger: ___.",
  ],
  pitfalls: [
    "Both-sides paragraphs that never commit.",
    "Anecdote used as the whole argument.",
    "Emotional assertion standing in for evidence.",
    "A conclusion that introduces a new claim.",
  ],
});

const synthesisCoach = (minutes: number): CoachGuide => ({
  task:
    "Write an argument that takes a position and uses at least three of the provided sources. The sources are material for your argument, not a puzzle to summarise.",
  timeline: [
    { label: "Read sources for tension", minutes: Math.round(minutes * 0.22), detail: "Annotate each source's claim in six words, and mark where two sources disagree." },
    { label: "Take a position", minutes: Math.round(minutes * 0.08), detail: "Choose a position that the sources make arguable, not obvious." },
    { label: "Draft", minutes: Math.round(minutes * 0.55), detail: "Thesis, then paragraphs that pair sources in conversation, then a counter-argument and a close." },
    { label: "Revise", minutes: Math.round(minutes * 0.15), detail: "Check every source letter is doing work, not decoration." },
  ],
  steps: [
    { title: "Summarise each source in one line", detail: "If you cannot, you cannot use it well. Write the line in the margin." },
    { title: "Find the disagreement", detail: "The best synthesis thesis lives where two sources pull apart." },
    { title: "Decide what your position adds", detail: "Your thesis should not be any single source's thesis." },
    { title: "Put sources in conversation", detail: "Source B's data qualifies Source A's claim; Source D's anecdote shows what Source C's model misses." },
    { title: "Attribute precisely", detail: "Use source letters or author names. Never quote without saying which source." },
  ],
  evidence: [
    "Quote or paraphrase at least three sources, and explain what each adds.",
    "Use a source against its own grain where useful (a budget office's numbers arguing against its own recommendation).",
  ],
  argument: [
    "Organise by claim, not by source order.",
    "One paragraph can hold two sources in disagreement; that is often the strongest paragraph.",
    "Address the strongest source that opposes you.",
  ],
  frames: [
    "Source B's finding that ___ undercuts Source A's assumption that ___, unless ___.",
    "Taken together, Sources C and D suggest ___, which neither states on its own.",
    "If Source E is right about ___, then the position in Source F must be revised to say ___.",
  ],
  pitfalls: [
    "A paragraph per source with no argument.",
    "Naming a source without using its content.",
    "Ignoring the sources that complicate your thesis.",
  ],
});

const dbqCoach = (minutes: number): CoachGuide => ({
  task:
    "Write an essay that answers the prompt using at least three of the documents plus your own historical knowledge. The documents are evidence to be interrogated, not a story to retell.",
  timeline: [
    { label: "Read the documents", minutes: 15, detail: "For each: who, when, why, to whom, and what it can and cannot prove." },
    { label: "Plan the thesis", minutes: Math.round(minutes * 0.08), detail: "A claim that answers 'to what extent' with a qualification, not a description." },
    { label: "Draft", minutes: Math.round(minutes * 0.62), detail: "Context, thesis, two or three body paragraphs grouping documents by argument, sourcing sentence in each, conclusion with complexity." },
    { label: "Revise", minutes: Math.round(minutes * 0.15), detail: "Count documents used; add outside evidence; check sourcing language exists for two documents." },
  ],
  steps: [
    { title: "Group documents by argument, not chronology", detail: "Documents that agree become one paragraph; a document that complicates them becomes your complexity paragraph." },
    { title: "Write context in three sentences", detail: "What was happening before and around this question that makes it a question?" },
    { title: "Score documents on reliability", detail: "A campaign poster and a private letter prove different things. Say which and why.", frame: "Because Document C was written by ___ for ___, it reveals ___ but cannot show ___." },
    { title: "Add outside evidence on purpose", detail: "One specific fact the documents omit, placed where it strengthens a claim." },
    { title: "Qualify the thesis in the conclusion", detail: "Name the limit of your argument or the counter-pattern that the documents expose." },
  ],
  evidence: [
    "Use the content of at least three documents; six is safer for the top evidence row.",
    "Source two documents explicitly (point of view, purpose, situation, audience).",
    "Bring at least one fact from outside the document set.",
  ],
  argument: [
    "Thesis must answer every part of the question, including scope ('to what extent').",
    "One paragraph = one claim = at least two documents.",
    "Complexity is usually a counter-pattern that your own evidence implies.",
  ],
  frames: [
    "Although ___, the evidence suggests ___, because ___.",
    "Document ___ is best read as ___, given that its author ___.",
    "The limit of this argument is ___, which the documents reveal but do not resolve.",
  ],
  pitfalls: [
    "Summarising documents in order.",
    "Quoting documents without saying who wrote them.",
    "A thesis that restates the prompt.",
    "No outside evidence.",
  ],
});

const saqCoach = (minutes: number): CoachGuide => ({
  task:
    "Answer each part separately in two or three sentences. There is one point per part, and the parts do not need an introduction or conclusion.",
  timeline: [
    { label: "Read and mark the tasks", minutes: Math.max(1, Math.round(minutes * 0.15)), detail: "Underline each verb: identify, describe, explain, compare." },
    { label: "Answer in order", minutes: Math.round(minutes * 0.7), detail: "Label (a), (b), (c). One idea per part, with a specific detail." },
    { label: "Check coverage", minutes: Math.round(minutes * 0.15), detail: "Confirm each part is answered and each contains a specific fact or explanation." },
  ],
  steps: [
    { title: "Answer the verb", detail: "'Describe' needs detail, not analysis; 'explain' needs a reason, not a label." },
    { title: "One specific example per part", detail: "A name, a date, a case, a clause." },
    { title: "Never blend parts", detail: "If part (b) asks why, do not answer question (a) again in different words." },
  ],
  evidence: ["Use precise terminology and one concrete example per part.", "If the stimulus is provided, use it explicitly."],
  argument: ["No thesis needed; no conclusion needed.", "Sentence two should usually start with 'because' or 'this led to'."],
  frames: ["Part (a): ___ is best described as ___.", "Part (b): This mattered because ___, which ___.", "Part (c): A consequence was ___, as shown by ___."],
  pitfalls: ["Writing an essay for a three-point question.", "Vague references ('things changed').", "Missing a part entirely."],
});

const govCoach = (minutes: number): CoachGuide => ({
  task:
    "Apply required course knowledge — cases, documents, institutions — to a scenario or data set you have not seen before. Precision about what the case held earns the point.",
  timeline: [
    { label: "Read the scenario twice", minutes: Math.max(1, Math.round(minutes * 0.2)), detail: "Identify the actor, the power being exercised, and the constitutional question." },
    { label: "Match required knowledge", minutes: Math.max(1, Math.round(minutes * 0.2)), detail: "Name the case, clause, document, or model that governs." },
    { label: "Write each part", minutes: Math.round(minutes * 0.5), detail: "One point per part; explain the link rather than naming it." },
  ],
  steps: [
    { title: "Name the precise provision", detail: "'The First Amendment's establishment clause' beats 'freedom of speech'." },
    { title: "State the holding, not just the name", detail: "For SCOTUS questions: facts, holding, reasoning." },
    { title: "Explain the 'because'", detail: "The second clause of your sentence should connect knowledge to scenario." },
    { title: "Quantitative parts need numbers", detail: "Quote the figure or trend before explaining it." },
  ],
  evidence: ["Use the required case or document by name, then describe it accurately.", "For data questions, cite the specific figure you are interpreting."],
  argument: ["For the argument essay: thesis, two pieces of evidence, reasoning, an alternative perspective.", "Use federalism, checks and balances, or linkage institutions where they fit the claim."],
  frames: ["In ___, the Court held that ___, which is why ___ in this scenario may ___.", "The data show ___, a pattern explained by ___.", "Although ___, the stronger reading is ___ because ___."],
  pitfalls: ["Naming a case without a holding.", "Describing the scenario instead of applying the concept.", "Ignoring the counter-perspective in the argument essay."],
});

const calcCoach = (minutes: number): CoachGuide => ({
  task:
    "Show the mathematics that earns points. On a free response, the reasoning sentence, the limit statement, and the units are often worth as much as the number.",
  timeline: [
    { label: "Read the whole question", minutes: Math.max(1, Math.round(minutes * 0.15)), detail: "Mark whether each part permits a calculator and what each verb requires (justify, approximate, interpret)." },
    { label: "Set up", minutes: Math.round(minutes * 0.2), detail: "Write the defining equation or theorem before computing; label variables and units." },
    { label: "Compute and justify", minutes: Math.round(minutes * 0.5), detail: "One line of work per point, with a sentence of justification where the prompt asks for one." },
    { label: "Check", minutes: Math.round(minutes * 0.15), detail: "Sign, units, reasonableness, and whether every part is answered." },
  ],
  steps: [
    { title: "Write what you are given and what is asked", detail: "Define variables; state the theorem or definition you will use." },
    { title: "Show the setup line", detail: "An unevaluated integral or derivative expression earns setup points even if arithmetic slips." },
    { title: "Justify in words", detail: "'f is increasing because f′ > 0 on (a, b)' earns the justification point; the inequality alone often does not." },
    { title: "Answer in context", detail: "Use units and interpret: 'the particle is 12 metres left of the origin at t = 3'." },
    { title: "Check the calculator parts", detail: "Round to three decimals and say so; an unrounded answer can lose the point." },
  ],
  evidence: ["Every derivative or integral you use should be visible.", "For a table question, state the difference quotient or Riemann sum explicitly."],
  argument: ["Part (a) usually rewards setup, part (b) justification, part (c) interpretation.", "Never erase work: a wrong answer with correct reasoning frequently earns partial credit."],
  frames: ["Since ___ on ___, ___ is ___ on that interval.", "Using ___, we have ___, so ___.", "Therefore, in context, ___."],
  pitfalls: ["Answers without work.", "Missing units.", "Ignoring the 'justify' verb.", "Using a calculator where it is not permitted."],
});

const bioCoach = (minutes: number): CoachGuide => ({
  task:
    "Answer each part with the biological mechanism and the evidence that supports it. Free-response points are awarded for explaining why, not for restating the question.",
  timeline: [
    { label: "Read and label", minutes: Math.max(1, Math.round(minutes * 0.15)), detail: "Mark each part and what it asks: identify, explain, predict, justify, calculate." },
    { label: "Plan the mechanism", minutes: Math.round(minutes * 0.2), detail: "Name the process, the molecules or organisms involved, and the direction of change." },
    { label: "Write", minutes: Math.round(minutes * 0.5), detail: "One short paragraph per part; include the data or graph reference the prompt provides." },
    { label: "Check", minutes: Math.round(minutes * 0.15), detail: "Units, significance, and whether each 'explain' has a causal chain." },
  ],
  steps: [
    { title: "Use the data", detail: "Reference the specific figure, axis, or treatment. Points for analysis require that you say what the data show." },
    { title: "State the mechanism in a chain", detail: "A → causes → B → causes → C. Uneven chains are where points disappear." },
    { title: "Design experiments explicitly", detail: "Independent variable, dependent variable, control, constants, sample size, and predicted result." },
    { title: "Justify predictions", detail: "A prediction without a reason earns nothing; a prediction with a mechanism earns two." },
    { title: "Do the math visibly", detail: "Show the formula, substitution, and units (e.g. molecules ATP per glucose)." },
  ],
  evidence: ["Reference graph values and error bars.", "Use correct terminology: substrate, concentration gradient, membrane potential."],
  argument: ["Explain, don't describe: every 'because' is a point-bearing connector.", "Connect molecular events to population-level outcomes."],
  frames: ["Because ___, the rate of ___ increases, which causes ___.", "This prediction assumes ___, and the control rules out ___.", "The data in Figure ___ show ___, supporting the claim that ___."],
  pitfalls: ["Restating the prompt as an answer.", "Teleology ('the cell wants to').", "Forgetting a control group.", "Unjustified predictions."],
});

const macroCoach = (minutes: number): CoachGuide => ({
  task:
    "Free response in AP Macro is graph-first. A correctly labelled, correctly shifted graph earns more than a paragraph of prose.",
  timeline: [
    { label: "Read and label parts", minutes: Math.max(1, Math.round(minutes * 0.15)), detail: "Mark every part that says 'draw', 'show', 'calculate', or 'explain'." },
    { label: "Draw and label graphs", minutes: Math.round(minutes * 0.35), detail: "Axes, curves, equilibrium, and any shift arrows with initial and new labels." },
    { label: "Calculate and explain", minutes: Math.round(minutes * 0.35), detail: "Show the formula, the substitution, and one sentence of interpretation." },
    { label: "Check", minutes: Math.round(minutes * 0.15), detail: "Every graph has labelled axes and curves; every number has units." },
  ],
  steps: [
    { title: "Label before you shift", detail: "A graph without labelled axes and curves usually earns nothing." },
    { title: "Use arrows and initial/new labels", detail: "AD₁ → AD₂ with a direction arrow, plus the new equilibrium marked." },
    { title: "Show the multiplier arithmetic", detail: "Write 1/(1−MPC) before computing, then the policy size." },
    { title: "Answer in the language of the model", detail: "Say which curve shifts, in which direction, and why." },
  ],
  evidence: ["Reference the model by name (AD–AS, loanable funds, money market, Phillips curve, foreign exchange).", "State numerical results with units (billions of dollars, percent)."],
  argument: ["Every claim needs a mechanism: lower rates → more investment → AD shifts right → output rises.", "Long-run adjustments belong in long-run questions; do not mix horizons."],
  frames: ["A ___ policy shifts ___ to the ___, raising ___ and lowering ___.", "The spending multiplier is 1/(1−MPC) = ___, so the required change in spending is ___.", "In the long run, ___ adjusts, returning output to ___."],
  pitfalls: ["Shifting the wrong curve.", "Confusing nominal and real rates.", "Forgetting to label a new equilibrium.", "Stating a number with no units."],
});

const envCoach = (minutes: number): CoachGuide => ({
  task:
    "Environmental Science free response asks you to design an investigation, explain an environmental problem, or justify a solution. Each sub-part is usually one or two points.",
  timeline: [
    { label: "Read the parts", minutes: Math.max(1, Math.round(minutes * 0.15)), detail: "Mark the verbs: identify, describe, calculate, propose, justify." },
    { label: "Plan each answer", minutes: Math.round(minutes * 0.2), detail: "One line per part, with the specific term or number you will use." },
    { label: "Write", minutes: Math.round(minutes * 0.5), detail: "One or two sentences per part; include calculations and units." },
    { label: "Check", minutes: Math.round(minutes * 0.15), detail: "Every 'justify' has a because; every calculation has units." },
  ],
  steps: [
    { title: "Name the mechanism", detail: "Eutrophication, biomagnification, thermal inversion — then the chain of consequences." },
    { title: "Design experiments with variables", detail: "Control, treatment, replication, measured variable, and expected outcome." },
    { title: "Show calculations", detail: "Percent change, per-capita use, efficiency, doubling time: write the formula first." },
    { title: "Justify solutions with trade-offs", detail: "A proposal plus its cost, limit, or unintended consequence earns the justification point." },
  ],
  evidence: ["Cite the data, unit, or study the prompt supplies.", "Use the correct environmental science term rather than a colloquial one."],
  argument: ["Connect local action to a global mechanism.", "Name a trade-off when asked to evaluate a solution."],
  frames: ["An investigation would compare ___ with ___ while holding ___ constant, measuring ___.", "This reduces ___ by ___, although it may ___.", "Therefore, the annual ___ is ___ kWh, or ___ per capita."],
  pitfalls: ["Vague solutions ('be more sustainable').", "Missing units.", "Treating correlation as mechanism."],
});

const seminarACoach = (minutes: number): CoachGuide => ({
  task:
    "Analyse one source's argument in three short answers: identify it, explain its line of reasoning, and evaluate its evidence. Be surgical and quote briefly.",
  timeline: [
    { label: "Read and annotate", minutes: Math.max(2, Math.round(minutes * 0.2)), detail: "Mark the thesis, each claim, the evidence types, and the conclusion." },
    { label: "Answer A1–A3", minutes: Math.round(minutes * 0.7), detail: "One paragraph each; explain rather than list." },
    { label: "Check", minutes: Math.round(minutes * 0.1), detail: "Does A2 name the connections between claims? Does A3 judge credibility, not just adequacy?" },
  ],
  steps: [
    { title: "Restate the argument in one sentence", detail: "Include any qualifier the author attaches to it." },
    { title: "Draw the argument's chain", detail: "Claim 1 → evidence → claim 2 → evidence → conclusion. Name the links in words." },
    { title: "Judge the evidence on four axes", detail: "Relevance, sufficiency, credibility, and what it fails to establish." },
  ],
  evidence: ["Quote four to eight words at most.", "Name the type of evidence (case study, statistic, anecdote, expert testimony)."],
  argument: ["A2 is about connection, not summary.", "A3 needs a judgement plus a reason."],
  frames: ["The author argues that ___ because ___.", "The second claim depends on the first in that ___.", "The evidence is credible in part, but as an anecdote it cannot establish ___."],
  pitfalls: ["Describing instead of evaluating.", "Ignoring the author's conclusion.", "Listing evidence without a judgement."],
});

const seminarBCoach = (minutes: number): CoachGuide => ({
  task:
    "Build your own evidence-based argument using at least two of the four sources. The sources disagree; your job is to enter the disagreement with a perspective.",
  timeline: [
    { label: "Read all four sources", minutes: Math.round(minutes * 0.25), detail: "One-line summary each, plus the theme that connects them." },
    { label: "Choose a perspective", minutes: Math.round(minutes * 0.1), detail: "Not a compromise, not a summary: a position the sources make arguable." },
    { label: "Draft", minutes: Math.round(minutes * 0.5), detail: "Thesis, three claims each tied to at least one source, one counter-perspective, conclusion." },
    { label: "Revise", minutes: Math.round(minutes * 0.15), detail: "Check attribution, evidence explanation, and that the perspective is visible in every paragraph." },
  ],
  steps: [
    { title: "Find the theme", detail: "What is the shared question the four sources answer differently?" },
    { title: "Take a position the sources do not take", detail: "A perspective that synthesises or rejects parts of several sources." },
    { title: "Explain each piece of evidence", detail: "Quote or paraphrase, then say how it supports the claim." },
    { title: "Address the strongest counter-perspective", detail: "Use a source that disagrees with you and answer it." },
  ],
  evidence: ["Use at least two sources substantively; naming is not use.", "Attribute with source letters or author names."],
  argument: ["Claims should build: each one should depend on the last.", "Conventions points are for clarity and attribution, so proofread."],
  frames: ["While Source A frames the issue as ___, Source C's evidence suggests ___, which supports the perspective that ___.", "The perspective that ___ is strongest when ___, as Source B's data show.", "Critics such as Source D argue ___, but that objection assumes ___."],
  pitfalls: ["A paragraph per source with no thesis.", "Compromising instead of arguing.", "Unattributed quotation."],
});

const researchCoach = (minutes: number): CoachGuide => ({
  task:
    "Write the section of the academic paper or the presentation script that the prompt names, with the precision a reader scoring an AP Research paper expects.",
  timeline: [
    { label: "Restate the question", minutes: Math.max(2, Math.round(minutes * 0.1)), detail: "Copy your research question, then check the section you are writing answers part of it." },
    { label: "Plan the section", minutes: Math.round(minutes * 0.2), detail: "One claim per paragraph, each tied back to method or evidence." },
    { label: "Draft", minutes: Math.round(minutes * 0.55), detail: "Write in the register of a journal article, not a school essay." },
    { label: "Revise", minutes: Math.round(minutes * 0.15), detail: "Check every claim is traceable to a source or to your own data, and that limitations are stated." },
  ],
  steps: [
    { title: "Answer the question the section asks", detail: "Method sections justify choices; analysis sections interpret; conclusions state limits." },
    { title: "Justify, don't just describe", detail: "Why this method, this sample, this instrument?" },
    { title: "Name the limitations", detail: "A stated limitation increases credibility; a hidden one undermines it." },
    { title: "Trace every claim", detail: "Attribution or data, every time." },
  ],
  evidence: ["Cite sources and your own data explicitly.", "State sample sizes, instruments, and analytic procedures."],
  argument: ["Method → evidence → interpretation → limitation → next question.", "Distinguish what you found from what you hope it means."],
  frames: ["This study used ___ in order to ___, because ___.", "The results suggest ___, although ___ limits the inference.", "A follow-up study could isolate ___ by ___."],
  pitfalls: ["Reporting results without interpretation.", "Overgeneralising beyond the sample.", "Missing limitations."],
});

/* ------------------------------------------------------------------ */
/* Multiple-choice strategy, per course                                */
/* ------------------------------------------------------------------ */

export const mcqStrategies: Record<string, { title: string; steps: string[]; timing: string }> = {
  "ap-lit": {
    title: "Reading a literature passage under time",
    timing: "About 12 minutes per passage set: 4 to read, 8 to answer.",
    steps: [
      "Read the passage once for what changes between the first sentence and the last; do not annotate devices yet.",
      "On the second pass, mark only the shift, the repeated image, and who is speaking to whom.",
      "Answer the questions in the order they appear, but treat them as a guided rereading: each one sends you to a specific line.",
      "For tone and attitude questions, substitute each answer into 'the speaker sounds ___' and reread the final line before deciding.",
      "Eliminate answers that are true about the passage but do not answer the question asked; AP Lit distractors are usually accurate statements.",
      "Never leave a blank: there is no penalty for a wrong answer.",
    ],
  },
  "ap-lang": {
    title: "Rhetorical reading under time",
    timing: "About 60 seconds per question after a first read of the passage.",
    steps: [
      "Read the passage's first and last sentences first; the purpose usually sits between them.",
      "Name the rhetorical situation in the margin: speaker, audience, exigence, purpose.",
      "For 'which choice best describes' questions, predict your own answer before reading the options.",
      "Reject answers that are too absolute ('always', 'never') unless the passage is absolute.",
      "Use paired-passage questions to compare attitude, not topic.",
    ],
  },
  apush: {
    title: "Stimulus-based history questions",
    timing: "About 1 minute per question; 55 in 55 minutes.",
    steps: [
      "Identify the source type first: law, speech, cartoon, graph, letter. It tells you what the document can prove.",
      "Anchor the date and the period before reading the options.",
      "For 'the point of view of the author' questions, ask who benefits from the document's claim.",
      "Eliminate options that are true but from the wrong period.",
      "For causation questions, look for the option that supplies a mechanism, not just a correlation.",
    ],
  },
  "ap-gov": {
    title: "Government and politics questions",
    timing: "About 85 seconds per question; 55 in 80 minutes.",
    steps: [
      "Name the institution, level of government, and constitutional provision before evaluating options.",
      "For data questions, read the axis and the legend before the question.",
      "Required-document questions reward precision: the Federalist number, the clause, the case name.",
      "Beware options describing what 'should' happen; the exam asks what the system does.",
      "For scenario questions, identify which actor holds the power in the scenario.",
    ],
  },
  "ap-bio": {
    title: "Biology multiple choice",
    timing: "About 90 seconds per question; 60 in 90 minutes.",
    steps: [
      "Translate the stem into the biological process being tested.",
      "For graph questions, identify the independent variable, the trend, and any anomaly.",
      "Reject options with mechanism errors (reversed gradient, wrong molecule, wrong direction).",
      "For experimental design questions, look for the option that controls the right variable.",
      "Estimate calculations roughly before computing; most distractors come from order-of-magnitude slips.",
    ],
  },
  "ap-calc": {
    title: "Calculus multiple choice",
    timing: "2 minutes per question in Part A, 3 minutes in Part B.",
    steps: [
      "Decide first whether the question is a concept question (no computation) or a computation question.",
      "For limits, check the form and whether the function is piecewise at that point.",
      "For derivative questions, know what the derivative means in context before differentiating.",
      "For integral questions, sketch the region; signed area kills more students than antidifferentiation.",
      "If a computation stalls, eliminate by sign, magnitude, and units rather than guessing blind.",
    ],
  },
  "ap-macro": {
    title: "Macroeconomics multiple choice",
    timing: "About 70 seconds per question; 60 in 70 minutes.",
    steps: [
      "Identify the model the question is testing before reading options.",
      "Sketch the graph in the margin: it makes shifts and directions concrete.",
      "Distinguish nominal from real, and short run from long run, every time.",
      "For policy questions, trace the chain: tool → interest rate or spending → AD → output → price level.",
      "Watch for 'in the long run' qualifiers; they change almost every answer.",
    ],
  },
  "ap-env": {
    title: "Environmental science multiple choice",
    timing: "About 65 seconds per question; 80 in 90 minutes.",
    steps: [
      "Identify the system level: organism, population, ecosystem, global.",
      "For data questions, read units and axis labels before estimating.",
      "Convert units early; many distractors are unit errors.",
      "For policy or management questions, choose the option that addresses the mechanism, not the symptom.",
      "Eliminate options that confuse correlation with causation.",
    ],
  },
  "ap-seminar": {
    title: "Argument analysis under time",
    timing: "Part A: 30 minutes for three answers. Part B: 90 minutes.",
    steps: [
      "Read the source once for the thesis; write it in six words.",
      "Map the claims and their connections before writing anything.",
      "Judge evidence on relevance, sufficiency, and credibility.",
      "In Part B, take a position the sources do not already take.",
      "Attribute every source you use.",
    ],
  },
  "ap-research": {
    title: "Research reasoning",
    timing: "The paper is scored as a whole; plan section by section.",
    steps: [
      "Restate your research question before writing any section.",
      "Check that every claim is traceable to a source or to your data.",
      "State limitations where they occur, not at the end.",
      "Use the register of a journal, not an essay.",
      "Answer the question explicitly in the conclusion.",
    ],
  },
};

export const sixPointRhetorical = sixPointAnalytic("rhetorical");
export const sixPointLiterary = sixPointAnalytic("literary");
export const sixPointArgument = sixPointAnalytic("argument");
export const sixPointSynthesis = sixPointAnalytic("synthesis");

export const coachLibrary = {
  literary: literaryCoach,
  rhetorical: rhetoricalCoach,
  argument: argumentCoach,
  synthesis: synthesisCoach,
  dbq: dbqCoach,
  saq: saqCoach,
  gov: govCoach,
  calc: calcCoach,
  bio: bioCoach,
  macro: macroCoach,
  env: envCoach,
  seminarA: seminarACoach,
  seminarB: seminarBCoach,
  research: researchCoach,
};

export type CoachKey = keyof typeof coachLibrary;
