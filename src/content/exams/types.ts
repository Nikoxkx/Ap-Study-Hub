/**
 * Interim assessment data model.
 *
 * The site previously shipped three hand-written "mock papers" and seven
 * courses with no timed paper at all. Every course now gets an assessment whose
 * section structure, question counts, clock, and break schedule are copied from
 * the published exam format for that course, and whose written tasks are marked
 * against the actual published rubric rows.
 *
 * Two honesty rules run through this folder:
 *   1. Every passage and question is original or public domain. Nothing is
 *      presented as a released College Board question.
 *   2. The format is replicated; the cut scores are published estimates and say
 *      so wherever they are displayed.
 */

export type SubjectSlugLike = string;

export type StimulusKind = "poetry" | "prose" | "drama" | "document" | "data" | "source";

/** A reading passage, document set, or data table that questions hang from. */
export interface Stimulus {
  id: string;
  title: string;
  kind: StimulusKind;
  /** Author, date, or a note making clear what this text is. */
  attribution?: string;
  /** Full text. Poetry keeps real line breaks; prose keeps paragraphs. */
  text: string;
  /** Optional examination note shown above the passage. */
  note?: string;
  /**
   * Structured table for a data figure. When present it is rendered as a real
   * table (with a caption) instead of a block of text, so numbers line up in
   * columns the way they do on the paper exam.
   */
  table?: {
    caption?: string;
    head: string[];
    rows: string[][];
  };
}

/** A single multiple-choice item in an interim assessment. */
export interface ExamQuestion {
  key: string;
  /** Stimulus this question reads from, where the section is passage-based. */
  stimulusId?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  /** Skill tag used by the score report to group performance. */
  skill: string;
  /** Unit of the course this item tests, for "what should I study next" links. */
  unitNumber?: number;
  lessonTitle?: string;
  optionExplanations?: string[];
}

export type SignalType =
  | "thesis"
  | "evidence"
  | "quotation"
  | "citation"
  | "commentary"
  | "line-of-reasoning"
  | "organization"
  | "conclusion"
  | "counterargument"
  | "qualification"
  | "context"
  | "synthesis"
  | "sourcing"
  | "outside-evidence"
  | "numeric-work"
  | "units"
  | "justification"
  | "experimental-design"
  | "graph-labels"
  | "comparison"
  | "definition"
  | "final-answer"
  | "mechanics";

/** One machine-checkable expectation attached to a rubric row. */
export interface RubricSignal {
  type: SignalType;
  /** Minimum measured count or ratio; meaning depends on the signal type. */
  min?: number;
  /** Short student-facing description of what is being checked. */
  note: string;
}

export interface RubricRow {
  id: string;
  label: string;
  maxPoints: number;
  /** Allowed point values for this row, high to low. */
  scale: number[];
  descriptors: { points: number; text: string }[];
  /** Signals the local analyzer measures. AI grading uses the descriptors. */
  signals: RubricSignal[];
}

export interface Rubric {
  id: string;
  title: string;
  rows: RubricRow[];
  /** Total points the rubric is worth. */
  total: number;
  /** One-line statement of the College Board rubric this mirrors. */
  source: string;
}

/** Step-by-step guidance a student can follow while writing. */
export interface CoachGuide {
  /** What the task actually asks for, in plain language. */
  task: string;
  /** Minutes to spend in each stage; the sum matches the section clock. */
  timeline: { label: string; minutes: number; detail: string }[];
  /** Ordered moves from blank page to finished essay. */
  steps: { title: string; detail: string; frame?: string }[];
  /** How to select and deploy evidence for this task type. */
  evidence: string[];
  /** Argument structures that earn the upper rows of the rubric. */
  argument: string[];
  /** Sentence-level frames a student can adapt (not copy verbatim). */
  frames: string[];
  /** The mistakes that most often cost a point here. */
  pitfalls: string[];
}

export interface ExamFrq {
  id: string;
  /** Short task label, e.g. "Poetry Analysis" or "Concept Application". */
  taskType: string;
  title: string;
  prompt: string;
  /** Printed directions above the prompt, in College Board register. */
  directions?: string;
  /** Suggested minutes, used by the coaching timeline. */
  minutes: number;
  rubricId: string;
  /** Prompt-specific rubric rows when the rubric is bespoke (e.g. AP Bio). */
  rubric?: Rubric;
  stimulusIds?: string[];
  coach: CoachGuide;
  /** A compact outline of a full-credit answer; not a full sample essay. */
  modelPath: string[];
  /** Total points available on this task. */
  points: number;
}

/** Calculator policy for a section part. */
export type CalculatorPolicy = "required" | "permitted" | "not-permitted";

export interface ExamPart {
  label: string;
  minutes: number;
  questionCount?: number;
  calculator?: CalculatorPolicy;
  note?: string;
}

export interface ExamSection {
  id: string;
  name: string;
  subtitle?: string;
  type: "mcq" | "frq";
  minutes: number;
  /** Percent of the total AP score this section represents. */
  weight: number;
  directions: string;
  questionCount?: number;
  parts?: ExamPart[];
  frqIds?: string[];
  calculator?: CalculatorPolicy;
  /** Screen-reader-friendly reminder of what this section is. */
  summary: string;
}

export interface ExamBreak {
  afterSectionId: string;
  minutes: number;
  label: string;
  detail: string;
}

export interface ScoreCurve {
  five: number;
  four: number;
  three: number;
  two: number;
}

export interface ExamBlueprint {
  slug: SubjectSlugLike;
  id: string;
  title: string;
  subtitle: string;
  /** One sentence naming the official exam this mirrors. */
  officialFormat: string;
  /** Officially timed testing minutes, excluding breaks. */
  timedMinutes: number;
  /** Structural notes shown on the briefing screen. */
  notes: string[];
  sections: ExamSection[];
  breaks: ExamBreak[];
  mcqWeight: number;
  frqWeight: number;
  mcqTotal: number;
  frqTotal: number;
  curve: ScoreCurve;
  /** True when the official exam has no multiple-choice section. */
  hasMcq: boolean;
  /** Where the multiple-choice items come from. */
  questionSource: "bank" | "authored" | "mixed";
  /** Stimulus-based sections read their items from an authored bank. */
  authoredBank?: string;
}

export interface ResolvedSection extends ExamSection {
  questions: ExamQuestion[];
  stimuli: Stimulus[];
  frqs: ExamFrq[];
  points: number;
}

export interface Assessment {
  blueprint: ExamBlueprint;
  sections: ResolvedSection[];
  totalMinutes: number;
  totalPoints: number;
  mcqCount: number;
  frqCount: number;
  /** Every stimulus referenced anywhere in the paper, in reading order. */
  stimuli: Stimulus[];
}
