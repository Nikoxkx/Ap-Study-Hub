import type { SubjectSlug } from "@/lib/subjects";

/**
 * Everyday words for the things this site asks you to do.
 *
 * Students do not arrive wanting a "cold-recall instrument" or a "synthesis
 * matrix". They arrive wanting to know what to do tonight. Every term the
 * interface uses has one plain-language gloss, kept in one place so the Notes
 * tab, the Study Desk and the Excel worksheet cannot drift into three
 * different vocabularies for the same button.
 *
 * Kept deliberately small. A glossary that defines forty words is a sign that
 * thirty of them should have been said differently.
 */
export interface PlainTerm {
  term: string;
  plain: string;
  /** The sentence you would actually say if a friend asked. */
  said: string;
}

export const plainTerms: PlainTerm[] = [
  {
    term: "Recall card",
    plain: "A question with the answer on the back",
    said: "It is a flashcard, but the back has the explanation, not just the word.",
  },
  {
    term: "Interim assessment",
    plain: "A full practice paper in exam conditions",
    said: "It is the whole paper, on the clock, marked with the real rubric.",
  },
  {
    term: "Rubric row",
    plain: "One line of the marking guide",
    said: "Each row is worth a point, and the row tells you the sentence that earns it.",
  },
  {
    term: "Exemplar",
    plain: "A worked answer you can copy the shape of",
    said: "It is what a full-credit answer looks like, with the marking notes beside it.",
  },
  {
    term: "Stimulus",
    plain: "The passage, table, graph or source the question sits on",
    said: "It is the thing they give you before the question.",
  },
  {
    term: "Defense",
    plain: "Explaining your work out loud, step by step",
    said: "You say what you did, why, and where you are unsure.",
  },
  {
    term: "Commentary",
    plain: "The sentence that explains why your evidence matters",
    said: "It is the part after the quotation where you say what it shows.",
  },
  {
    term: "Qualify",
    plain: "Say when your claim stops being true",
    said: "It means you admit the exception instead of pretending there is not one.",
  },
];

/**
 * The defense task for each course. One line for what the exam actually asks
 * a student to stand behind, and one line for the first sentence of a good
 * spoken answer. Both are written in the register a student would use aloud,
 * not in rubric language, because the point of the exercise is to get the
 * words out of the mouth.
 */
export interface DefenseTask {
  courseSlug: SubjectSlug;
  /** What the paper actually marks. */
  standBehind: string;
  /** The opening line a student can genuinely say. */
  opener: string;
  /** The question a teacher would ask that a memorized answer cannot survive. */
  hardestQuestion: string;
}

export const defenseTasks: DefenseTask[] = [
  {
    courseSlug: "apush",
    standBehind:
      "A historical argument you built from documents, not a summary of them.",
    opener:
      "I claimed this change was caused by that one, and the first document I used as evidence was...",
    hardestQuestion:
      "\"You have three documents that agree with you. What would change your mind?\"",
  },
  {
    courseSlug: "ap-lang",
    standBehind:
      "A reading of how a writer moved an audience, supported by the writer's own choices.",
    opener:
      "The writer wanted the audience to feel something specific, and the sentence where I could see it happening was...",
    hardestQuestion:
      "\"You said the tone shifts. Read me the exact words where it shifts.\"",
  },
  {
    courseSlug: "ap-lit",
    standBehind:
      "An interpretation of a text, tied to the words on the page rather than to your feelings about them.",
    opener:
      "I read this poem as being about loss, and the word I keep coming back to is...",
    hardestQuestion:
      "\"Another reader could say the opposite using the same lines. Why is your reading better?\"",
  },
  {
    courseSlug: "ap-seminar",
    standBehind:
      "A research question you narrowed yourself, and a conclusion you can trace back to your sources.",
    opener:
      "My group started by asking something far too broad, and we narrowed it to this question because...",
    hardestQuestion:
      "\"Which source disagreed with you, and what did you do with it?\"",
  },
  {
    courseSlug: "ap-gov",
    standBehind:
      "A claim about how American government works, with the mechanism named and a real case behind it.",
    opener:
      "I said this branch has the stronger hand, and the reason is that the Constitution gives it...",
    hardestQuestion:
      "\"Name the case. What did the Court actually say, not what you wish it said?\"",
  },
  {
    courseSlug: "ap-bio",
    standBehind:
      "A biological explanation where every step is a mechanism and every number has a unit.",
    opener:
      "I predicted the water would move this way, because water potential is higher on that side, and the number I calculated was...",
    hardestQuestion:
      "\"You have a correlation and a mechanism. Which one does your data actually show?\"",
  },
  {
    courseSlug: "ap-calc",
    standBehind:
      "A solution that shows the setup, the justification for each step, and a check that catches a sign error.",
    opener:
      "The first thing I did was check whether substituting broke, because if it did, the whole method changes...",
    hardestQuestion:
      "\"You got the right answer. Explain the line where you canceled, and what would make that illegal.\"",
  },
  {
    courseSlug: "ap-research",
    standBehind:
      "A study you designed, with its limits named before anybody else names them.",
    opener:
      "The strongest objection to my method is probably this one, and here is how I handled it...",
    hardestQuestion:
      "\"Your conclusion is small. Why should anyone care?\"",
  },
  {
    courseSlug: "ap-macro",
    standBehind:
      "A model applied correctly, with the direction of every shift stated and the real-world caveat added.",
    opener:
      "The economy is below potential output here, so I moved this curve this direction, and the number came out as...",
    hardestQuestion:
      "\"Your calculation assumes the multiplier works fully. Give me one reason it would not.\"",
  },
  {
    courseSlug: "ap-env",
    standBehind:
      "A claim about a system, supported by data with units, and with the uncertainty left in.",
    opener:
      "The trend I read from this graph is..., and the part of the graph that does not fit is...",
    hardestQuestion:
      "\"Is that a correlation or a cause? Say which one, then defend it.\"",
  },
];

const defenseByCourse = new Map<string, DefenseTask>(
  defenseTasks.map((task) => [task.courseSlug, task]),
);

export function getDefenseTask(slug: string): DefenseTask | undefined {
  return defenseByCourse.get(slug);
}
