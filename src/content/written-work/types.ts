import type { SubjectSlug } from "@/lib/subjects";

/**
 * Written work and the defense of it.
 *
 * The notes explain a unit. This is the other half: what an answer to that
 * unit's most likely question actually looks like on paper, and the words a
 * student would say if a teacher stopped at the desk and asked "how did you
 * get there?"
 *
 * Every unit in every course has both, because the two skills fail
 * separately. Plenty of students can produce a decent paragraph and freeze
 * when asked to explain it, and plenty can talk confidently about work they
 * could not reproduce under a clock. The example is on the page; the defense
 * is out loud.
 */

export interface WrittenWork {
  /** `course-unit`, so a link to a unit's work is stable. */
  id: string;
  courseSlug: SubjectSlug;
  unitNumber: number;
  /** The task in the words a student would meet on the paper. */
  prompt: string;
  /** Two decisions to make before writing a word. */
  plan: string[];
  /**
   * The answer itself, line by line or paragraph by paragraph. Math is
   * written in `\(...\)` and is set on squared paper.
   */
  example: string[];
  /** Why this answer earns the mark — plain, and without overselling it. */
  because: string;
  /** What you would say out loud, in the order you would say it. */
  say: string[];
  /** The mistake a strong student makes here, not only a weak one. */
  trap: string;
}

export interface UnitDefense {
  unitNumber: number;
  /** What to keep from the unit so the defense has evidence in it. */
  keep: string[];
  /** The question that actually gets asked. */
  question: string;
  /** How to answer, in the order the words come out. */
  answer: string[];
}

export interface CourseDefense {
  courseSlug: SubjectSlug;
  /** What this course is really asking you to stand behind. */
  claim: string;
  /** Five sentence frames that sound right in this subject and nowhere else. */
  frames: string[];
  /** How a spoken defense in this subject is judged, in plain words. */
  markedOn: string[];
  units: UnitDefense[];
}

/**
 * Whether a set of lines contains arithmetic, and so belongs on squared paper.
 *
 * Deliberately conservative. An en dash inside a date range ("1993–2020") is
 * not a subtraction, and a page of prose that happens to contain a year should
 * not be set on graph paper. TeX delimiters are the strongest signal; a bare
 * operator between digits is the fallback.
 */
export function usesMathematics(lines: string[]): boolean {
  return lines.some((line) => {
    if (/\\\(|\\\[|\\frac|\\sqrt|\\int|\\sum|\\times|\\approx/.test(line)) return true;
    return /(^|\s)[0-9][\d,.]*\s*[+\-*/=<>≤≥]\s*[0-9(]/.test(line);
  });
}
