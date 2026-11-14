/**
 * How the site talks to a student.
 *
 * Three rules, and they are the same three rules the notes follow:
 *
 * 1. Say the thing in a student's own register. "Which of these five points
 *    would you lose?" beats "Identify the rubric deficiency". Plain, active,
 *    second person; one idea per sentence; define a term the first time it
 *    appears. This is the standard plain-language advice that university
 *    teaching centers, the W3C's cognitive-accessibility guidance and the
 *    GOV.UK style guide all converge on, and it is the register students
 *    actually learn from in an online lesson.
 * 2. Do not claim more than the work supports. Hedges are not weakness; a
 *    student who writes "this suggests" and knows why is doing better
 *    history than one who writes "this proves".
 * 3. Never be cute at the expense of being clear. A joke that costs a reader
 *    a sentence is a bad joke.
 *
 * The strings below are shared so that a phrase appears once and reads the
 * same everywhere it appears.
 */

export const voiceRules = [
  {
    rule: "Write like a good student, not a course catalog",
    detail:
      "Short sentences. Plain words. Where a technical word is the right word — \u201ccounterargument\u201d, \u201cmarginal propensity\u201d — keep it and define it once instead of avoiding it and sounding vague.",
  },
  {
    rule: "Address the reader directly",
    detail:
      "Second person, present tense, active voice: \u201cyou compare\u201d, not \u201cthe comparison is undertaken\u201d. Research on learning from text keeps finding a small, reliable benefit when material talks to the reader rather than about the topic.",
  },
  {
    rule: "Sound like a person who has sat the exam",
    detail:
      "Admit the confusing parts. Name the mistake a strong student makes, not only the one a weak student makes. A page that never admits difficulty reads as though nobody wrote it.",
  },
  {
    rule: "Hedge when the evidence hedges",
    detail:
      "\u201cThis suggests\u201d, \u201cthe data are consistent with\u201d, \u201cone reading is\u201d. Overclaiming is the single fastest way for a written answer to lose a point, and the site should not model the habit it marks down.",
  },
  {
    rule: "One idea per paragraph, and the point first",
    detail:
      "A reader who stops after the first sentence of a paragraph should still have the main thing. The rest of the paragraph is the support for it.",
  },
] as const;

/**
 * Every course gets the same defense routine because every AP paper asks the
 * same underlying question: can you say how you know?
 */
export const defenseScript = {
  opener: [
    "When I first read the prompt, I…",
    "The first thing I did was…",
    "Before I wrote anything, I checked…",
  ],
  middle: [
    "Then I…, because…",
    "The reason I did that step is…",
    "I checked this against…, and it held because…",
    "The part I nearly got wrong was…",
  ],
  evidence: [
    "My evidence for that is…",
    "That comes from…, and it applies here because…",
    "I kept this, and cut that, because…",
  ],
  close: [
    "So the answer is…, and if that were wrong you would see…",
    "If I had time, the next thing I would check is…",
    "The weakest part of my answer is…, and here is why I still think it holds.",
  ],
  repair: [
    "I am not certain about…, so I would check…",
    "If the data showed…, I would change this to…",
    "That is an assumption, not a result, and I should have said so.",
  ],
} as const;

export type DefenseScript = typeof defenseScript;

/** Short reminder shown above every defense panel. */
export const defenseNote =
  "Say it out loud before you write it. The first sentence answers the question; every sentence after that either gives a reason or admits a limit.";

/** Shared label for the write-then-say pattern used across the notes. */
export const sayItAloud = "Say it out loud";

export const sayItAloudNote =
  "Read the line in the right-hand column in a normal voice, as though a teacher had stopped at your desk and asked what you were doing. If a sentence sounds like an essay, rewrite it until it sounds like you.";

/**
 * A house style note shown on the guides page and in the notes footer, so a
 * reader can hold the writing to a stated standard instead of guessing at one.
 */
export const houseStyleSummary =
  "Plain words, short sentences, active voice, one idea per paragraph — and an example for every idea, because an idea you cannot see worked is an idea you have not checked.";

/** The paper convention used by every example in the site. */
export const paperConvention = {
  math: {
    name: "Quadrille notebook paper",
    detail:
      "Squared paper for anything with numbers in it. The grid is there for a reason: it keeps columns of working aligned, which is how most people stop losing a minus sign halfway down a page.",
  },
  writing: {
    name: "Ruled loose-leaf paper",
    detail:
      "Ruled paper for writing with no arithmetic in it — thesis statements, evidence, commentary, and the sentences you would say out loud in a defense.",
  },
} as const;
