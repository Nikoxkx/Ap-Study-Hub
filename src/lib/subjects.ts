/**
 * Subject registry.
 *
 * Before this file existed the same colour lookup table was copy-pasted into six
 * components, each with a slightly different set of keys, and three of them
 * silently fell back to blue for four of the seven courses. One table, one place.
 *
 * Colours are drawn from bookbinding cloth swatches rather than a framework
 * palette, so nothing here is `blue-600`. Each has a `-lit` variant hand-checked
 * to clear 4.5:1 against the dark paper colour and a `-wash` tint that sits at
 * roughly 8% ink over the light paper colour.
 */

export type SubjectSlug =
  | "apush"
  | "ap-lang"
  | "ap-seminar"
  | "ap-gov"
  | "ap-bio"
  | "ap-calc"
  | "ap-research";

export interface Subject {
  slug: SubjectSlug;
  /** Three-letter spine label used on the shelf marks. */
  code: string;
  /** What students actually call it. */
  familiar: string;
  /** What College Board calls it. */
  official: string;
  /** One sentence, written to describe this course and no other. */
  summary: string;
  /** Longer intro used at the top of the course page and in meta descriptions. */
  intro: string;
  /** 2027 exam date/session, or the AP Research portfolio deadline. */
  exam: { date: string; window: "morning" | "afternoon" | "deadline" };
  ink: string;
  lit: string;
  wash: string;
  washDark: string;
  /** Key into the SubjectMark glyph set. */
  mark: SubjectSlug;
  /**
   * ISO date this course's notes were last worked on. Shown on the course page
   * and used as `lastModified` in the sitemap, so a crawler can tell which
   * courses have moved since it last called. Bump it when you edit the content
   * for that course, not on every deploy.
   */
  revised: string;
}

export const subjects: Subject[] = [
  {
    slug: "apush",
    code: "USH",
    familiar: "APUSH",
    official: "AP United States History",
    summary:
      "Nine chronological periods from 1491 to the present, weighted toward the essay half of the exam.",
    intro:
      "APUSH is less about memorising dates than about arguing with them. The exam gives you a DBQ, a long essay and 55 multiple-choice questions built on stimulus material, so the unit notes below are organised the way the rubric reads: context, evidence, then complexity.",
    exam: { date: "2027-05-07", window: "morning" },
    ink: "#9c3b2e",
    lit: "#e59283",
    wash: "#f3e6e2",
    washDark: "#241c1c",
    revised: "2026-10-24",
    mark: "apush",
  },
  {
    slug: "ap-lang",
    code: "LNG",
    familiar: "AP Lang",
    official: "AP English Language and Composition",
    summary:
      "Rhetorical analysis, synthesis and argument — three essays in two hours and fifteen minutes.",
    intro:
      "AP Lang is a writing exam wearing a reading exam's coat. Everything here is built around the three free-response tasks, because that is where 55% of the score lives. The marked samples show which sentence earned which rubric point.",
    exam: { date: "2027-05-12", window: "morning" },
    ink: "#31456b",
    lit: "#93aada",
    wash: "#e3e7f0",
    washDark: "#1a1e26",
    revised: "2026-10-24",
    mark: "ap-lang",
  },
  {
    slug: "ap-seminar",
    code: "SEM",
    familiar: "AP Seminar",
    official: "AP Seminar",
    summary:
      "Two performance tasks worth 55% of the score, plus a two-hour written exam worth 45%.",
    intro:
      "Most of AP Seminar is submitted long before exam day. The Individual Research Report, the Individual Written Argument and the team project carry 55% of the grade; the May exam carries the other 45%. The exemplars here are annotated against the actual scoring guidelines.",
    exam: { date: "2027-05-10", window: "afternoon" },
    ink: "#6b3f6e",
    lit: "#c79aca",
    wash: "#eee4ef",
    washDark: "#221d24",
    revised: "2026-10-24",
    mark: "ap-seminar",
  },
  {
    slug: "ap-gov",
    code: "GOV",
    familiar: "AP Gov",
    official: "AP United States Government and Politics",
    summary:
      "Fifteen required Supreme Court cases and thirteen foundational documents you are expected to use precisely.",
    intro:
      "AP Gov rewards precision over breadth. For 2026–27, the College Board names thirteen required documents and fifteen required cases, and the free-response section will ask you to apply them to a scenario you have never seen. The notes flag every required text.",
    exam: { date: "2027-05-04", window: "morning" },
    ink: "#2f5f56",
    lit: "#79bdb0",
    wash: "#e0ebe8",
    washDark: "#1a2220",
    revised: "2026-10-24",
    mark: "ap-gov",
  },
  {
    slug: "ap-bio",
    code: "BIO",
    familiar: "AP Bio",
    official: "AP Biology",
    summary:
      "Eight units, four big ideas, and six free-response questions that lean hard on experimental design.",
    intro:
      "AP Bio's free-response section is mostly about reading a graph and defending a claim. Content matters, but the points come from justification. The practice set below is weighted toward the analysis skills the scoring guidelines actually reward.",
    exam: { date: "2027-05-03", window: "afternoon" },
    ink: "#4f6b32",
    lit: "#a9c67e",
    wash: "#e7ecdf",
    washDark: "#1e231b",
    revised: "2026-10-24",
    mark: "ap-bio",
  },
  {
    slug: "ap-calc",
    code: "CAL",
    familiar: "AP Calc",
    official: "AP Calculus AB and BC",
    summary:
      "Limits through integrals for AB; series, polar and parametric on top of that for BC.",
    intro:
      "AB and BC share the first eight units in this library, while BC adds parametric/polar work and infinite series. Unit labels make that distinction explicit. For May 2027, each exam has 42 multiple-choice questions and six free-response questions; calculator access depends on the part, so the setup always matters before the keystrokes.",
    exam: { date: "2027-05-10", window: "morning" },
    ink: "#9a6520",
    lit: "#e0ad64",
    wash: "#f3e9d9",
    washDark: "#25201a",
    revised: "2026-10-24",
    mark: "ap-calc",
  },
  {
    slug: "ap-research",
    code: "RES",
    familiar: "AP Research",
    official: "AP Research",
    summary:
      "One 4,000–5,000 word paper, a presentation and an oral defence. There is no May exam.",
    intro:
      "AP Research has no sit-down exam at all. The whole grade is the academic paper (75%), the presentation and the oral defence (25%), all due to the College Board digital portfolio at the end of April. Everything below is about the paper.",
    exam: { date: "2027-04-30", window: "deadline" },
    ink: "#57534a",
    lit: "#bdb5a7",
    wash: "#eae7e0",
    washDark: "#202123",
    revised: "2026-10-24",
    mark: "ap-research",
  },
];

const bySlug = new Map<string, Subject>(subjects.map((s) => [s.slug, s]));

export function getSubject(slug: string): Subject | undefined {
  return bySlug.get(slug);
}

export function isSubjectSlug(slug: string): slug is SubjectSlug {
  return bySlug.has(slug);
}

/** Inline CSS custom properties so a subject can theme a subtree without a class explosion. */
export function subjectVars(subject: Subject): React.CSSProperties {
  return {
    ["--subject" as string]: subject.ink,
    ["--subject-lit" as string]: subject.lit,
    ["--subject-wash" as string]: subject.wash,
    ["--subject-wash-dark" as string]: subject.washDark,
  };
}

const LONG_DATE = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const SHORT_DATE = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export function formatExamDate(subject: Subject, style: "long" | "short" = "long") {
  const d = new Date(`${subject.exam.date}T12:00:00Z`);
  return style === "long" ? LONG_DATE.format(d) : SHORT_DATE.format(d);
}

/** Session labels follow the 2027 schedule; schools confirm exact reporting times. */
export function examTimeLabel(subject: Subject) {
  if (subject.exam.window === "deadline") return "11:59 p.m. ET submission deadline";
  return subject.exam.window === "morning" ? "Session 1 · typically morning" : "Session 2 · typically afternoon";
}

/** Reference instant for the countdown: a typical Eastern session start or the exact ET deadline. */
export function examInstant(subject: Subject): number {
  if (subject.exam.window === "deadline") return Date.parse(`${subject.exam.date}T23:59:59-04:00`);
  const hourUtc = subject.exam.window === "morning" ? 12 : 16; // Typical 8am/12pm EDT starts.
  return Date.parse(`${subject.exam.date}T${String(hourUtc).padStart(2, "0")}:00:00Z`);
}
