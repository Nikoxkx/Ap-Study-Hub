import { analyzeWriting, type MechanicsIssue, type WritingFeatures } from "./analyze";
import { spellingVocabulary } from "./wordlist";
import type { Rubric, RubricRow, RubricSignal } from "@/content/exams/types";

/**
 * Rubric grading.
 *
 * The offline path measures each rubric row's signals against the response and
 * awards the nearest allowed point value. It then explains, row by row, which
 * expectation was met and which was not, quoting the student's own sentences.
 * The AI path (server route) uses the same rubric rows but asks a model to judge
 * them; both return this shape so the interface does not have to care which
 * one ran.
 *
 * Neither path pretends to be a College Board reader. The interface labels the
 * method and states plainly that the reader in May is the authority.
 */

export interface SignalResult {
  note: string;
  satisfied: boolean;
  measured: string;
}

export interface CriterionResult {
  id: string;
  label: string;
  points: number;
  maxPoints: number;
  signals: SignalResult[];
  feedback: string;
  improve: string;
}

export interface GradeResult {
  method: "local" | "ai" | "unavailable";
  provider?: string;
  model?: string;
  rows: CriterionResult[];
  earned: number;
  possible: number;
  summary: string;
  strengths: string[];
  priorities: string[];
  mechanics: MechanicsIssue[];
  mechanicsSummary: string;
  stats: {
    wordCount: number;
    sentenceCount: number;
    paragraphCount: number;
    averageSentenceLength: number;
    quotationCount: number;
    citationCount: number;
    commentaryCount: number;
    reasoningLinks: number;
    lexicalDiversity: number;
  };
  thesisSentence: string | null;
  thesisReason: string;
  evidenceQuotes: string[];
  nextSteps: { title: string; detail: string }[];
  /** Set when an AI call fails after the local result was computed. */
  notice?: string;
}

function rounding(scale: number[], value: number): number {
  return scale.reduce((best, option) =>
    Math.abs(option - value) < Math.abs(best - value) ? option : best,
  scale[0]);
}

function evaluateSignal(signal: RubricSignal, features: WritingFeatures): SignalResult {
  const min = signal.min ?? 1;
  switch (signal.type) {
    case "thesis": {
      return {
        note: signal.note,
        satisfied: features.hasThesis,
        measured: features.hasThesis
          ? `Claim found: “${features.thesisSentence?.slice(0, 140)}…”`
          : features.thesisReason,
      };
    }
    case "quotation": {
      return {
        note: signal.note,
        satisfied: features.quotationCount >= min,
        measured: `${features.quotationCount} quoted phrase${features.quotationCount === 1 ? "" : "s"} found${
          features.quotedPhrases[0] ? `, e.g. “${features.quotedPhrases[0].slice(0, 80)}”` : ""
        }`,
      };
    }
    case "citation": {
      const total = features.citationCount + features.sourcesUsed.length;
      return {
        note: signal.note,
        satisfied: total >= min,
        measured: `${total} locator${total === 1 ? "" : "s"} found${
          features.citationExamples.length ? ` (${features.citationExamples.slice(0, 3).join(", ")})` : ""
        }`,
      };
    }
    case "commentary": {
      const evidenceSentences = Math.max(1, features.quotationCount);
      const ratio = Math.round((features.commentaryCount / evidenceSentences) * 100) / 100;
      return {
        note: signal.note,
        satisfied: ratio >= min,
        measured: `${features.commentaryCount} interpretive sentence${
          features.commentaryCount === 1 ? "" : "s"
        } against ${features.quotationCount} quotation${features.quotationCount === 1 ? "" : "s"} (ratio ${ratio})`,
      };
    }
    case "line-of-reasoning": {
      return {
        note: signal.note,
        satisfied: features.reasoningLinks >= min,
        measured: `${features.reasoningLinks} explicit reasoning link${
          features.reasoningLinks === 1 ? "" : "s"
        }${features.reasoningExamples.length ? ` (${features.reasoningExamples.slice(0, 3).join(", ")})` : ""}`,
      };
    }
    case "organization": {
      return {
        note: signal.note,
        satisfied: features.paragraphCount >= min,
        measured: `${features.paragraphCount} paragraph${features.paragraphCount === 1 ? "" : "s"}`,
      };
    }
    case "conclusion": {
      return {
        note: signal.note,
        satisfied: features.conclusionMoves.length >= min,
        measured: features.conclusionMoves.length
          ? `Closing move found: ${features.conclusionMoves.slice(0, 2).join(", ")}`
          : "No closing or generalising move detected.",
      };
    }
    case "counterargument": {
      return {
        note: signal.note,
        satisfied: features.counterargumentMoves.length >= min,
        measured: features.counterargumentMoves.length
          ? `Alternative or objection language: ${features.counterargumentMoves.slice(0, 3).join(", ")}`
          : "No alternative perspective or objection detected.",
      };
    }
    case "qualification": {
      return {
        note: signal.note,
        satisfied: features.qualificationMoves.length >= min,
        measured: features.qualificationMoves.length
          ? `Qualifying language: ${features.qualificationMoves.slice(0, 3).join(", ")}`
          : "No qualification or limit detected.",
      };
    }
    case "context": {
      return {
        note: signal.note,
        satisfied: features.contextMoves.length >= min,
        measured: features.contextMoves.length
          ? `Contextual language: ${features.contextMoves.slice(0, 3).join(", ")}`
          : "No broader context detected.",
      };
    }
    case "sourcing": {
      const moves = features.sourcingMoves;
      return {
        note: signal.note,
        satisfied: moves.length >= min,
        measured: moves.length
          ? `${moves.length} document${moves.length === 1 ? "" : "s"} analysed for author, purpose, audience, or situation`
          : "No document is analysed for who wrote it, for whom, when, or why.",
      };
    }
    case "outside-evidence": {
      const facts = features.specificFacts;
      return {
        note: signal.note,
        satisfied: facts.length >= min,
        measured: facts.length
          ? `${facts.length} specific fact${facts.length === 1 ? "" : "s"} from outside the sources: ${facts
              .slice(0, 5)
              .join(", ")}${facts.length > 5 ? ", …" : ""}`
          : "No dates, statistics, or named developments outside the documents.",
      };
    }
    case "synthesis": {
      const used = features.sourcesUsed.length;
      return {
        note: signal.note,
        satisfied: used >= min,
        measured: used
          ? `${used} source${used === 1 ? "" : "s"} referenced: ${features.sourcesUsed.join(", ")}`
          : "No source letters or document references detected.",
      };
    }
    case "numeric-work": {
      // Digits alone are not work. The row is awarded for written mathematics —
      // an equality, an integral with its differential, a derivative, a limit —
      // and a prose answer that mentions numbers without setting anything up
      // does not satisfy it.
      return {
        note: signal.note,
        satisfied: features.mathExpressions >= min,
        measured: features.mathExpressions
          ? `${features.mathExpressions} written mathematical expression${
              features.mathExpressions === 1 ? "" : "s"
            } (${features.numberedWork} number${features.numberedWork === 1 ? "" : "s"}, ${
              features.mathOperators
            } operator${features.mathOperators === 1 ? "" : "s"})`
          : `No equation, integral, derivative, or limit shown (${features.numberedWork} bare number${
              features.numberedWork === 1 ? "" : "s"
            })`,
      };
    }
    case "units": {
      return {
        note: signal.note,
        satisfied: features.unitsFound.length >= min,
        measured: features.unitsFound.length
          ? `Units present: ${features.unitsFound.slice(0, 4).join(", ")}`
          : "No units detected in the response.",
      };
    }
    case "justification": {
      return {
        note: signal.note,
        satisfied: features.justificationMoves >= min,
        measured: `${features.justificationMoves} causal or justificatory connector${
          features.justificationMoves === 1 ? "" : "s"
        }`,
      };
    }
    case "experimental-design": {
      return {
        note: signal.note,
        satisfied: features.experimentalDesignTerms.length >= min,
        measured: features.experimentalDesignTerms.length
          ? `Design terms: ${features.experimentalDesignTerms.slice(0, 5).join(", ")}`
          : "No design vocabulary (control, variable, replicate) detected.",
      };
    }
    case "graph-labels": {
      return {
        note: signal.note,
        satisfied: features.graphTerms.length >= min,
        measured: features.graphTerms.length
          ? `Model and label terms: ${features.graphTerms.slice(0, 5).join(", ")}`
          : "No graph-labelling vocabulary detected.",
      };
    }
    case "comparison": {
      return {
        note: signal.note,
        satisfied: features.comparisonMoves.length >= min,
        measured: features.comparisonMoves.length
          ? `Comparative language: ${features.comparisonMoves.slice(0, 3).join(", ")}`
          : "No comparison language detected.",
      };
    }
    case "definition": {
      return {
        note: signal.note,
        satisfied: features.definitionMoves >= min,
        measured: `${features.definitionMoves} definitional construction${
          features.definitionMoves === 1 ? "" : "s"
        }`,
      };
    }
    case "final-answer": {
      const stated = features.conclusionMoves.length + (features.mathExpressions ? 1 : 0);
      return {
        note: signal.note,
        satisfied: features.numberedWork > 0 && stated >= min,
        measured: features.numberedWork
          ? `${features.numberedWork} number${features.numberedWork === 1 ? "" : "s"} reported${
              features.conclusionMoves.length
                ? `, with a stated conclusion (${features.conclusionMoves.slice(0, 2).join(", ")})`
                : ", but no sentence states what the result means"
            }`
          : "No numerical result detected.",
      };
    }
    case "evidence": {
      const total =
        features.quotationCount +
        features.citationCount +
        features.sourcesUsed.length +
        Math.min(features.numberedWork, 6) +
        features.definitionMoves;
      return {
        note: signal.note,
        satisfied: total >= min,
        measured: `${total} evidence marker${total === 1 ? "" : "s"} (quotations, locators, sources, specifics)`,
      };
    }
    case "mechanics": {
      return {
        note: signal.note,
        satisfied: features.mechanicsRate >= min,
        measured: `${features.mechanics.filter((issue) => issue.severity === "error").length} error${
          features.mechanics.filter((issue) => issue.severity === "error").length === 1 ? "" : "s"
        } and ${features.mechanics.filter((issue) => issue.severity === "warning").length} warning${
          features.mechanics.filter((issue) => issue.severity === "warning").length === 1 ? "" : "s"
        } detected`,
      };
    }
    default:
      return { note: signal.note, satisfied: false, measured: "Not measured." };
  }
}

const IMPROVEMENTS: Record<string, string> = {
  thesis:
    "Put the claim in one sentence in the first paragraph, using a verb a reader could disagree with — 'argues', 'reveals', 'should'. Avoid announcing what the essay will do.",
  evidence:
    "Interleave evidence with commentary at roughly one quotation to two sentences of explanation. Short embedded quotations beat long block quotations.",
  sophistication:
    "Add one sentence that states the strongest alternative reading (or the limit of your claim) and answers it. That single move is what the sophistication row rewards.",
  context:
    "Add two sentences before your thesis that place the topic in a wider development — a period, a policy, a precedent.",
  docs: "Use the content of at least three documents, and name the document number each time you use one.",
  beyond: "Bring in one specific fact that is not in the documents and say what it proves.",
  sourcing:
    "For two documents, add a sentence on the author's position: who wrote it, to whom, and why that matters for its reliability.",
  complexity:
    "Name the counter-pattern your own evidence implies, then explain how your argument survives it.",
  reasoning:
    "Make the link from evidence to claim explicit: 'which shows', 'because', 'as a result'.",
  alternative:
    "State the best version of the opposing view and answer it; naming an objection without answering it earns nothing.",
  conventions:
    "Proofread once for the mechanics listed below; keep sentences under about 35 words and paragraph breaks at each new claim.",
  analysis:
    "Interpret the numbers: say what the result means, not only what it is.",
  perspective:
    "State your position in one sentence before the first body paragraph, and repeat its logic in each claim.",
};

function improvementFor(row: RubricRow): string {
  return (
    IMPROVEMENTS[row.id] ??
    IMPROVEMENTS[row.label.toLowerCase()] ??
    "Re-read the row's top descriptor and check that your response contains that move explicitly."
  );
}

function summarizeRow(row: RubricRow, results: SignalResult[]): string {
  const unmet = results.filter((result) => !result.satisfied);
  const met = results.filter((result) => result.satisfied);
  if (!unmet.length) {
    return `All measured expectations for this row are present: ${met.map((result) => result.measured).join("; ")}.`;
  }
  const parts: string[] = [];
  if (met.length) parts.push(`Met: ${met.map((result) => result.measured).join("; ")}.`);
  parts.push(`Missing: ${unmet.map((result) => `${result.note.toLowerCase()} (${result.measured})`).join("; ")}.`);
  return parts.join(" ");
}

export function gradeLocally(
  response: string,
  rubric: Rubric,
  options: { sources?: string } = {},
): GradeResult {
  const features = analyzeWriting(response, {
    vocabulary: spellingVocabulary(),
    sources: options.sources,
  });

  const rows: CriterionResult[] = rubric.rows.map((row) => {
    const results = row.signals.map((signal) => evaluateSignal(signal, features));
    const satisfied = results.filter((result) => result.satisfied).length;
    const ratio = results.length ? satisfied / results.length : 0;

    let points = rounding(row.scale.slice().sort((a, b) => b - a), ratio * row.maxPoints);

    // Hard gates that mirror what a reader would refuse to award.
    const hasAnyEvidence =
      features.quotationCount + features.citationCount + features.sourcesUsed.length + features.numberedWork > 0;
    const isEvidenceRow = /evidence|commentary|docs/i.test(row.id + row.label) && row.maxPoints >= 2;
    if (isEvidenceRow && !hasAnyEvidence) points = 0;
    if (row.id === "thesis" && !features.hasThesis) points = 0;
    if (row.id === "mechanics" || /conventions/i.test(row.label)) {
      points = features.mechanicsRate >= 0.92 ? row.maxPoints : features.mechanicsRate >= 0.8 ? Math.min(row.maxPoints, 4) : Math.min(row.maxPoints, 2);
      if (features.wordCount < 40) points = Math.min(points, 2);
    }
    if (features.wordCount < 25) points = 0;

    // A quantitative rubric cannot be satisfied by prose. If nothing was set
    // up in mathematical notation, no row beyond a stated claim can stand.
    const quantitativeRubric = rubric.rows.some((item) =>
      item.signals.some((signal) => signal.type === "numeric-work" || signal.type === "final-answer"),
    );
    if (quantitativeRubric && features.mathExpressions === 0 && row.id !== "thesis") {
      points = Math.min(points, 1);
    }

    return {
      id: row.id,
      label: row.label,
      points,
      maxPoints: row.maxPoints,
      signals: results,
      feedback: summarizeRow(row, results),
      improve: improvementFor(row),
    };
  });

  const earned = rows.reduce((sum, row) => sum + row.points, 0);
  const possible = rows.reduce((sum, row) => sum + row.maxPoints, 0);

  const weakRows = rows
    .map((row) => ({ row, lost: row.maxPoints - row.points, ratio: row.points / row.maxPoints }))
    .filter((entry) => entry.lost > 0)
    .sort((a, b) => b.lost - a.lost);

  const strengths: string[] = [];
  if (features.hasThesis) strengths.push("A defensible thesis is present.");
  if (features.quotationCount >= 3) strengths.push(`You quoted ${features.quotationCount} specific details from the text.`);
  if (features.commentaryCount >= 4) strengths.push("Commentary outweighs quotation, which is what the rubric rewards.");
  if (features.counterargumentMoves.length) strengths.push("You considered another perspective rather than arguing one side only.");
  if (features.numberedWork >= 3) strengths.push("You showed numerical work rather than a bare answer.");
  if (features.citationCount >= 2) strengths.push("You cited locators, so a reader can check your evidence.");
  if (!strengths.length) strengths.push("You have a draft, which is the only thing that can be improved.");

  // Advice follows the rubric the response was written against. A calculus
  // free response must not be told to embed quotations, and an essay must not
  // be told to label its units.
  const signalTypes = new Set(rubric.rows.flatMap((row) => row.signals.map((signal) => signal.type)));
  const literary = signalTypes.has("quotation") || signalTypes.has("commentary");
  const argumentative = signalTypes.has("counterargument") || signalTypes.has("qualification");
  const quantitative = signalTypes.has("numeric-work") || signalTypes.has("units") || signalTypes.has("final-answer");

  const fullMarks = possible > 0 && earned === possible;
  const priorities: string[] = [];
  if (!features.hasThesis) priorities.push("Write a one-sentence claim in the opening paragraph.");
  if (quantitative && !features.mathExpressions && features.wordCount >= 25) {
    priorities.push(
      "Show the setup, not only the result: write the equation, integral, or derivative before the number.",
    );
  }
  if (signalTypes.has("units") && !features.unitsFound.length && features.wordCount >= 25) {
    priorities.push("Attach units to every number you report, and say what the number measures.");
  }
  if (signalTypes.has("justification") && features.justificationMoves < 2) {
    priorities.push("Justify each claim with 'because' or 'therefore' rather than asserting it.");
  }
  if (literary && features.quotationCount === 0) {
    priorities.push("Embed at least three short quotations so the reader can see the evidence.");
  }
  if (literary && features.commentaryCount < Math.max(2, features.quotationCount)) {
    priorities.push("Explain how your evidence works; at present the quotations outweigh the commentary.");
  }
  if (!features.reasoningLinks && (literary || argumentative)) {
    priorities.push("Add explicit links between evidence and claim ('which shows', 'because').");
  }
  if (argumentative && !features.counterargumentMoves.length) {
    priorities.push("Answer an alternative reading to reach the top rows.");
  }
  if (features.mechanics.filter((issue) => issue.severity === "error").length >= 3) {
    priorities.push("Fix the mechanics errors listed below; they cost clarity even when the argument is sound.");
  }
  // A response that lost nothing should not be handed a list of repairs.
  if (fullMarks) priorities.length = 0;

  if (features.wordCount < 40) {
    priorities.length = 0;
    priorities.push(
      "This response is too short for the rubric to read. A reader cannot award evidence, commentary, or method rows to a sentence.",
      quantitative
        ? "Work each part separately and show the algebra: setup, substitution, answer with units."
        : "Write at least the opening claim and one body paragraph before asking for a score.",
    );
  }
  // Fill the list from the rows that actually lost points, then stop offering
  // advice when nothing is missing.
  const used = new Set(priorities);
  for (const entry of weakRows) {
    if (priorities.length >= 4) break;
    const line = `${entry.row.label}: ${entry.row.improve}`;
    if (used.has(line)) continue;
    used.add(line);
    priorities.push(line);
  }
  if (fullMarks) {
    priorities.push(
      quantitative
        ? "Every measured point was awarded. Check the precision of each number and that every conclusion is stated in words, then try the next paper's harder free response."
        : "Every measured point was awarded under the measured rules. The remaining work is stylistic: cut one sentence of summary from each paragraph, and make sure every quotation is doing a job your own sentence could not do.",
    );
    priorities.push(
      "Read the strongest model path for this task and rewrite one paragraph to match its level of explanation — full marks here are not a guaranteed 6 in May.",
    );
    priorities.push(
      "Do the same task cold, in the printed time, without the coach open. Speed is the difference between this score and an exam score.",
    );
  } else if (priorities.length < 3) {
    const closing = quantitative
      ? "Every measured point was awarded. Check the answer's precision, units, and whether each conclusion is stated in words, then try a harder free response."
      : "Every measured point was awarded. The remaining work is stylistic: tighten repetition, and make sure each paragraph advances one claim rather than restating it.";
    if (!priorities.includes(closing)) priorities.push(closing);
  }
  const filler = [
    quantitative
      ? "Re-read the question's parts: each must be answered, labelled, and justified separately."
      : "Add one more paragraph of commentary that explains how your evidence supports the claim.",
    quantitative
      ? "Show a check: substitute your answer back into the original relationship, or compare it with the units."
      : "Name the writer's choice before you quote it, so the evidence has a job in the sentence.",
    "Read the strongest model answer for this task, then rewrite one paragraph to match its level of explanation.",
  ];
  if (!fullMarks) {
    for (const line of filler) {
      if (priorities.length >= 3) break;
      if (!priorities.includes(line)) priorities.push(line);
    }
  }

  const errorCount = features.mechanics.filter((issue) => issue.severity === "error").length;
  const warningCount = features.mechanics.filter((issue) => issue.severity === "warning").length;
  const mechanicsSummary = errorCount + warningCount === 0
    ? "No mechanics problems were detected by the offline rules. That does not mean the prose is perfect — the rules only check the specific patterns listed in the method note."
    : `${errorCount} likely error${errorCount === 1 ? "" : "s"} and ${warningCount} warning${
        warningCount === 1 ? "" : "s"
      } were detected. Each is listed with the sentence and a suggested fix.`;

  const bodyParagraphs = Math.max(0, features.paragraphCount);
  const summary = `${features.wordCount} words in ${features.sentenceCount} sentences and ${bodyParagraphs} paragraph${
    bodyParagraphs === 1 ? "" : "s"
  }. The measured rows give ${earned} of ${possible} points. ${
    features.hasThesis
      ? "The claim is identifiable."
      : "No claim sentence was identifiable, which caps the upper rows."
  } ${
    features.quotationCount
      ? `${features.quotationCount} quotation${features.quotationCount === 1 ? "" : "s"} were embedded, against ${
          features.commentaryCount
        } sentences of interpretive commentary.`
      : "No quotations were detected."
  }`;

  const nextSteps = [
    ...weakRows.slice(0, 3).map((entry) => ({ title: entry.row.label, detail: entry.row.improve })),
    ...(errorCount
      ? [{ title: "Mechanics", detail: `Correct the ${errorCount} flagged error${errorCount === 1 ? "" : "s"} before rewriting anything else.` }]
      : []),
  ];

  return {
    method: "local",
    rows,
    earned,
    possible,
    summary,
    strengths,
    priorities: priorities.slice(0, 4),
    mechanics: features.mechanics,
    mechanicsSummary,
    stats: {
      wordCount: features.wordCount,
      sentenceCount: features.sentenceCount,
      paragraphCount: features.paragraphCount,
      averageSentenceLength: features.averageSentenceLength,
      quotationCount: features.quotationCount,
      citationCount: features.citationCount,
      commentaryCount: features.commentaryCount,
      reasoningLinks: features.reasoningLinks,
      lexicalDiversity: features.lexicalDiversity,
    },
    thesisSentence: features.thesisSentence,
    thesisReason: features.thesisReason,
    evidenceQuotes: features.quotedPhrases,
    nextSteps,
  };
}
