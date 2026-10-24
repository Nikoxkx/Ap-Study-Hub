import type { SourceId } from "./sources";

/** One teaching block. Citations belong to the block, not just the whole course. */
export interface LessonSection {
  heading: string;
  /** Full teaching paragraphs in the site's small, safe Markdown subset. */
  paragraphs: string[];
  sources: SourceId[];
}

export interface LessonGlossaryEntry {
  term: string;
  definition: string;
}

export interface LessonPractice {
  question: string;
  options: string[];
  correctIndex: number;
  /** A student-facing explanation of the reasoning, not only the answer letter. */
  explanation: string;
  skill: string;
  /** Why each distractor fails. Optional so legacy questions remain supported. */
  optionExplanations?: string[];
}

export interface LessonExamAlignment {
  title: string;
  description: string;
  /** Concrete actions a student can use in an answer or investigation. */
  criteria: string[];
  sources: SourceId[];
}

export interface Lesson {
  unitNumber: number;
  title: string;
  description: string;
  /** Official published weighting, or a clear skills-based label when none exists. */
  examWeight: string;
  /** AB, BC, or shared labels are written into this field where relevant. */
  audience?: string;
  objectives: string[];
  sections: LessonSection[];
  glossary: LessonGlossaryEntry[];
  examAlignment: LessonExamAlignment;
  practice: LessonPractice[];
}

export interface LessonSource {
  id: string;
  title: string;
  publisher: string;
  url: string;
  kind: "Official framework" | "Official scoring" | "Open textbook" | "Primary source" | "Research and writing" | "Supplement";
  description: string;
  checked: string;
}
