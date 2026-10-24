import { getCourse } from "./catalog";
import type { CourseBundle } from "./catalog";
import type { Lesson } from "@/content/lessons/types";
import type { Subject } from "./subjects";

/**
 * Lesson films.
 *
 * The site ships its own films instead of embedding someone else's player.
 * That was a deliberate decision, not a shortcut: an embedded YouTube video
 * cannot be checked from the build, rots silently when a channel re-uploads or
 * goes private, brings cookies and a logo into a page that promises neither,
 * and — worst for a study site — cannot be kept in step with the lesson it is
 * supposed to explain.
 *
 * Every film here is assembled from the lesson text itself: the objectives, the
 * section headings, the sentence that opens each section, the key terms, and
 * the exam alignment notes. So a unit film is *guaranteed* to be about that
 * unit, cannot 404, cannot autoplay an advert, and updates the moment the notes
 * do. The player is a normal React component with a real clock, so it pauses,
 * scrubs, changes speed, and reads as a transcript without a network request.
 *
 * Each scene holds long enough to read at ~150 words a minute; captions are the
 * narration, which also means the film works with the sound off in a library.
 */

export interface FilmScene {
  /** Chapter label. Two to four words, used in the chapter list. */
  heading: string;
  /** The spoken line. Reads as a sentence from the lesson, not a bullet. */
  caption: string;
  /** On-screen support points, optional. */
  points?: string[];
  /** Seconds this scene is held, derived from how much there is to read. */
  seconds: number;
}

export interface Film {
  id: string;
  courseSlug: string;
  /** Undefined for the course's opening film. */
  unitNumber?: number;
  title: string;
  summary: string;
  /** Why a student would press play: stated as a symptom, not a topic. */
  watchFor: string;
  scenes: FilmScene[];
  /** Total run time in seconds. */
  duration: number;
  lessonHref?: string;
  practiceHref: string;
}

const WORDS_PER_SECOND = 2.5;

/** Long enough to read the line and glance at the points, short enough to hold attention. */
function hold(caption: string, points: string[] = []): number {
  const words = caption.split(/\s+/).filter(Boolean).length + points.join(" ").split(/\s+/).filter(Boolean).length * 0.6;
  return Math.min(18, Math.max(6, Math.round(words / WORDS_PER_SECOND) + 2));
}

/**
 * Strips the site's Markdown subset down to one spoken sentence.
 *
 * Lessons use `**bold**`, `*italic*`, `[text](url)`, inline `code` and the
 * occasional `$x^2$`. None of that should be read aloud, and a caption should
 * not start mid-clause, so this cuts at the first sentence end after a
 * reasonable length.
 */
export function spokenLine(markdown: string, limit = 190): string {
  const plain = markdown
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1$2")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\$([^$]+)\$/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= limit) return plain;

  // Prefer a sentence break, then a clause break, then a word break. Anything
  // cut before the end keeps the ellipsis, so a caption reads as a quotation
  // that continues rather than a sentence that stopped making sense.
  const window = plain.slice(0, limit);
  const sentence = Math.max(window.lastIndexOf(". "), window.lastIndexOf("? "), window.lastIndexOf("! "));
  if (sentence > 70) return window.slice(0, sentence + 1);
  const clause = Math.max(window.lastIndexOf("; "), window.lastIndexOf(", "), window.lastIndexOf(" — "));
  if (clause > 90) return `${window.slice(0, clause).replace(/[,;—\s]+$/, "")}…`;
  const word = window.lastIndexOf(" ");
  return `${window.slice(0, word > 60 ? word : window.length).replace(/[,;:—\s]+$/, "")}…`;
}

function firstSentence(paragraphs: string[], limit = 190): string {
  const joined = paragraphs.join(" ");
  return spokenLine(joined, limit);
}

function shortTerms(lesson: Lesson, count = 3): string[] {
  return lesson.glossary
    .map((entry) => entry.term)
    .filter((term) => term.length <= 34)
    .slice(0, count);
}

function finish(scenes: Omit<FilmScene, "seconds">[]): FilmScene[] {
  return scenes.map((scene) => ({ ...scene, seconds: hold(scene.caption, scene.points) }));
}

function total(scenes: FilmScene[]): number {
  return scenes.reduce((sum, scene) => sum + scene.seconds, 0);
}

/**
 * Builds a unit film out of the lesson. Four teaching beats, the common trap,
 * and a recap — the shape of a good ten-minute office-hours conversation,
 * compressed to about ninety seconds.
 */
export function buildUnitFilm(course: CourseBundle, lesson: Lesson): Film {
  const subject = course.subject;
  const sections = lesson.sections.slice(0, 4);

  const scenes = finish([
    {
      heading: `Unit ${lesson.unitNumber}`,
      caption: `${lesson.title}. ${spokenLine(lesson.description, 210)}`,
      points: lesson.objectives.slice(0, 2).map((objective) => spokenLine(objective, 78)),
    },
    ...sections.map((section) => ({
      heading: section.heading,
      caption: firstSentence(section.paragraphs),
      points: [] as string[],
    })),
    {
      heading: "The trap",
      caption: `${lesson.examAlignment.title}. ${spokenLine(lesson.examAlignment.description, 150)}`,
      points: lesson.examAlignment.criteria.slice(0, 3).map((criterion) => spokenLine(criterion, 76)),
    },
    {
      heading: "Say it back",
      caption:
        "Close the notes. Say these three things out loud, in your own words, before you touch a practice question — if one of them stalls, that is the section to reread.",
      points: lesson.objectives.slice(0, 3).map((objective) => spokenLine(objective, 76)),
    },
    {
      heading: "Terms to keep",
      caption:
        "These are the words the exam will use without defining them. Cover the definition, say the meaning, then check.",
      points: shortTerms(lesson, 4),
    },
  ]);

  return {
    id: `${subject.slug}-u${lesson.unitNumber}`,
    courseSlug: subject.slug,
    unitNumber: lesson.unitNumber,
    title: lesson.title,
    summary: spokenLine(lesson.description, 170),
    watchFor: `Press play when Unit ${lesson.unitNumber} feels like a list of facts with no order to it.`,
    scenes,
    duration: total(scenes),
    lessonHref: `/course/${subject.slug}/notes#unit-${lesson.unitNumber}`,
    practiceHref: `/course/${subject.slug}/practice?unit=${lesson.unitNumber}`,
  };
}

/**
 * The course film. Written by hand rather than assembled, because it has a
 * different job: it explains why the course is shaped the way it is, and where
 * students usually lose the most points.
 *
 * Each entry: the frame, then four beats, then the honest closing line.
 */
const courseScreenplays: Record<
  string,
  { watchFor: string; scenes: { heading: string; caption: string; points: string[] }[] }
> = {
  apush: {
    watchFor: "Press play when the periods blur together and every essay prompt looks the same.",
    scenes: [
      {
        heading: "The shape of it",
        caption:
          "APUSH is not a memory test about 1491 to the present. It is a test of whether you can explain change over time using evidence, and the exam pays for the explanation, not the date.",
        points: ["9 periods", "1491 → present", "55% of the score is written"],
      },
      {
        heading: "Cause, not list",
        caption:
          "Every period in this course turns on a small number of engines: land, labour, migration, and who gets to vote. Learn the engines and the events attach themselves.",
        points: ["Land", "Labour", "Migration", "The franchise"],
      },
      {
        heading: "The documents",
        caption:
          "In the DBQ, the documents are not the argument. They are evidence you sort. Group them by what they reveal about power, then write a thesis that says something a reader could disagree with.",
        points: ["Group before you write", "Thesis must be arguable", "Use 6 of 7 documents"],
      },
      {
        heading: "Where points go",
        caption:
          "Most lost points are not missing facts. They are a thesis that describes instead of argues, and outside evidence that never arrives. One specific example per body paragraph fixes both.",
        points: ["Describe → argue", "Outside evidence", "Contextualisation in 2–3 sentences"],
      },
      {
        heading: "How to use this site",
        caption:
          "Read the period notes once for the story. Then let the cards and the mistake notebook decide what you reread. Your memory is a worse judge of what you know than your last twenty answers.",
        points: ["Read once", "Recall daily", "Let the queue choose"],
      },
    ],
  },
  "ap-lang": {
    watchFor: "Press play when you can analyse a passage but still run out of things to say.",
    scenes: [
      {
        heading: "What is scored",
        caption:
          "AP Lang does not ask whether you liked the passage. It asks what the writer did, on purpose, to move a specific reader — and whether you can prove it with the text in front of you.",
        points: ["Rhetorical analysis", "Argument", "Synthesis"],
      },
      {
        heading: "Read for choices",
        caption:
          "Train your eye to catch decisions rather than themes. A concession, a one-sentence paragraph, a shift from we to you: those are choices, and each one is a paragraph waiting to be written.",
        points: ["Concessions", "Sentence length as pacing", "Pronoun shifts"],
      },
      {
        heading: "Thesis in one line",
        caption:
          "A defensible thesis names the choice, the effect, and the audience. If your sentence would still be true for a different passage, it is a summary, not an analysis.",
        points: ["Choice", "Effect", "Audience"],
      },
      {
        heading: "Synthesis",
        caption:
          "The synthesis essay is an argument with sources attached, not a report on the sources. Take a position in the first paragraph, then use at least three sources as witnesses.",
        points: ["Position first", "Three sources minimum", "Address the counterargument"],
      },
      {
        heading: "Style you can borrow",
        caption:
          "Short sentences carry verdicts. Long ones carry reasoning. Read your draft aloud; wherever you run out of breath is where the reader will lose the thread.",
        points: ["Vary length deliberately", "Read it aloud", "Cut the throat-clearing"],
      },
    ],
  },
  "ap-seminar": {
    watchFor: "Press play when your IRR keeps turning into a literature review.",
    scenes: [
      {
        heading: "Two tasks",
        caption:
          "Seminar asks two different things. The IRR explains a problem and why it matters. The IWA takes a position on a solution and defends it. Mixing them costs you on both.",
        points: ["IRR: the problem", "IWA: the argument", "TMP: the conversation"],
      },
      {
        heading: "A real question",
        caption:
          "A research question should be answerable with evidence and narrow enough to argue in 2,000 words. If every answer is yes or no, widen it until there is a real disagreement to enter.",
        points: ["Answerable", "Narrow", "Contested"],
      },
      {
        heading: "Lens, not decoration",
        caption:
          "The lens is how you look, not a paragraph you paste at the top. Economic, ethical, historical, artistic: pick the one that changes what you notice in your sources.",
        points: ["One lens", "Apply it to every source", "Say what it hides"],
      },
      {
        heading: "Evidence with a job",
        caption:
          "Every source needs a sentence that says what it does for your argument. If you cannot finish the phrase 'this source matters because', it belongs in the bibliography, not the paper.",
        points: ["Attribute", "Interpret", "Connect"],
      },
      {
        heading: "The defence",
        caption:
          "In the defence, the panel is testing whether the argument is yours. Answer in one sentence, then give the evidence. Long answers read as uncertainty.",
        points: ["Answer first", "Then evidence", "Know your weakest link"],
      },
    ],
  },
  "ap-gov": {
    watchFor: "Press play when the required documents and cases start sounding identical.",
    scenes: [
      {
        heading: "The argument",
        caption:
          "American government is one long argument about how much power the federal government should have, and which institution gets to decide. Every case and clause is a move in that argument.",
        points: ["Federalism", "Separation of powers", "Civil liberties"],
      },
      {
        heading: "Documents do work",
        caption:
          "The required documents are not quotations to memorise. Each one was written to win a specific fight. Learn the fight and the quotation follows.",
        points: ["Federalist 10", "Brutus 1", "Letter from Birmingham Jail"],
      },
      {
        heading: "Cases as rules",
        caption:
          "Compress each required case to one sentence: the rule it created. Then learn one fact that shows the rule in action. Two sentences per case beats a paragraph of facts every time.",
        points: ["Rule", "One fact", "The dissent's worry"],
      },
      {
        heading: "Data questions",
        caption:
          "The quantitative section rewards reading the axis labels before the numbers. State the trend, then name the institution or behaviour that explains it. Never describe a chart without explaining it.",
        points: ["Read the axes", "State the trend", "Explain the mechanism"],
      },
      {
        heading: "The essay",
        caption:
          "For the argument essay, take a clear side, use two pieces of evidence from different parts of the course, and answer the strongest objection in your own words.",
        points: ["Side", "Two kinds of evidence", "Answer the objection"],
      },
    ],
  },
  "ap-bio": {
    watchFor: "Press play when biology feels like vocabulary instead of a system.",
    scenes: [
      {
        heading: "Four ideas",
        caption:
          "The whole course hangs on four ideas: information flows, systems maintain themselves, matter and energy move, and everything interacts. Nearly every question is one of those four wearing a costume.",
        points: ["Information", "Regulation", "Energy", "Interaction"],
      },
      {
        heading: "Structure is function",
        caption:
          "When a question asks why a membrane, enzyme or organelle looks the way it does, the answer is what it needs to do. Shape is the argument.",
        points: ["Shape → job", "Surface area", "Specificity"],
      },
      {
        heading: "Energy, both ways",
        caption:
          "Photosynthesis and respiration are the same river running in opposite directions. Learn the electron carriers once and both pathways get cheaper to remember.",
        points: ["NADH / NADPH", "Proton gradients", "ATP yield"],
      },
      {
        heading: "Math and graphs",
        caption:
          "The grid-in questions are arithmetic, not tricks: water potential, chi-square, surface-area-to-volume. Write the formula, substitute with units, then sanity-check the sign.",
        points: ["Water potential", "Chi-square", "SA:V"],
      },
      {
        heading: "Experimental design",
        caption:
          "Know what makes a control a control. When a prompt describes an experiment, find the independent variable, the dependent variable, and the one thing they failed to hold constant.",
        points: ["IV / DV", "Control group", "Confounds"],
      },
    ],
  },
  "ap-calc": {
    watchFor: "Press play when you can take derivatives but freeze on a free-response part (c).",
    scenes: [
      {
        heading: "One idea",
        caption:
          "Calculus is two ideas facing each other: a rate at a point, and an accumulation over an interval. The Fundamental Theorem is the sentence that says they are the same idea.",
        points: ["Derivative: rate", "Integral: total", "FTC: the bridge"],
      },
      {
        heading: "Justify everything",
        caption:
          "On the free response, the answer earns one point and the justification earns the rest. Name the theorem. Say the function is continuous. Then conclude.",
        points: ["IVT", "MVT", "EVT"],
      },
      {
        heading: "Choose a representation",
        caption:
          "For each problem, ask which of the four views makes it easy: equation, graph, table, or words. The same question is often trivial in one and brutal in another.",
        points: ["Algebraic", "Graphical", "Tabular", "Verbal"],
      },
      {
        heading: "The usual wounds",
        caption:
          "Forgotten chain rule, a missing plus C, a limit written without the fraction, and an answer left unlabelled. These cost more points across a year than any hard topic.",
        points: ["Chain rule", "+ C", "Show the limit", "Label units"],
      },
      {
        heading: "Calculator discipline",
        caption:
          "The calculator section rewards setup, not button speed. Write the integral or derivative first, then compute, then interpret the number in the context of the problem.",
        points: ["Set up", "Compute", "Interpret"],
      },
    ],
  },
  "ap-research": {
    watchFor: "Press play when the paper has sources but no argument yet.",
    scenes: [
      {
        heading: "One question",
        caption:
          "AP Research is a single question pursued honestly for a year. Everything else — the literature, the method, the paper — exists to answer it, and the question is where most projects succeed or fail.",
        points: ["Narrow", "Answerable", "Worth a year"],
      },
      {
        heading: "The gap",
        caption:
          "Your literature review is not a summary. It is an argument that a gap exists, built from what other people found and what they could not. End the review at the gap you intend to fill.",
        points: ["What is known", "What is disputed", "What is missing"],
      },
      {
        heading: "Method fits question",
        caption:
          "Choose the method the question needs, not the one that is easiest to run. Then say what your method cannot see. Limitations written before the study are a sign of a serious researcher.",
        points: ["Fit", "Feasibility", "Ethics"],
      },
      {
        heading: "Analysis, not decoration",
        caption:
          "Charts should answer a question. If you cannot say what a figure shows in one sentence, it is not evidence yet. Report what surprised you as carefully as what you expected.",
        points: ["One sentence per figure", "Effect size", "Uncertainty"],
      },
      {
        heading: "The defence",
        caption:
          "The panel asks about your choices, not your topic. Keep a short list of the three decisions you would defend to the end, and the one you would change. Both answers demonstrate judgement.",
        points: ["Three decisions", "One regret", "No improvisation"],
      },
    ],
  },
};

export function buildCourseFilm(course: CourseBundle): Film {
  const subject: Subject = course.subject;
  const screenplay = courseScreenplays[subject.slug];
  const scenes = finish(
    screenplay.scenes.map((scene) => ({
      heading: scene.heading,
      caption: scene.caption,
      points: scene.points,
    })),
  );

  return {
    id: `${subject.slug}-course`,
    courseSlug: subject.slug,
    title: `${subject.familiar} in ninety seconds`,
    summary: `${subject.official}: what the exam is actually testing, and where the points are usually lost.`,
    watchFor: screenplay.watchFor,
    scenes,
    duration: total(scenes),
    practiceHref: `/course/${subject.slug}/practice`,
  };
}

/** Every film for one course: the opening film first, then one per unit. */
export function getCourseFilms(slug: string): Film[] {
  const course = getCourse(slug);
  if (!course) return [];
  const unitFilms = course.units
    .filter((unit) => unit.lesson)
    .map((unit) => buildUnitFilm(course, unit.lesson as Lesson));
  return [buildCourseFilm(course), ...unitFilms];
}

export function getCourseFilm(slug: string): Film | null {
  const course = getCourse(slug);
  return course ? buildCourseFilm(course) : null;
}

export function getUnitFilm(slug: string, unitNumber: number): Film | null {
  const course = getCourse(slug);
  const unit = course?.units.find((candidate) => candidate.unitNumber === unitNumber);
  if (!course || !unit?.lesson) return null;
  return buildUnitFilm(course, unit.lesson);
}

/** `92` -> `1:32`. Used on the card and in the player's time readout. */
export function formatRuntime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const rest = Math.round(seconds % 60);
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}
