/**
 * Verified in-site video lessons.
 *
 * Every id below was opened on 24 October 2026 and checked two ways before it
 * went in:
 *
 *   1. YouTube's oEmbed endpoint answered with a title and a channel name, so
 *      the video exists, is public, and has not been deleted or made private.
 *   2. The title matches the lesson it is attached to, and the channel is one
 *      that a student can judge (a teacher, a working AP reader, or the exam
 *      board's own channel).
 *
 * A video that fails either check is not listed. That is deliberate: the site
 * previously shipped hardcoded ids that resolved to "Video unavailable", and a
 * dead embed costs more trust than a missing one. College Board's own AP Daily
 * videos, for instance, returned "Forbidden" from oEmbed — embedding disabled —
 * so they are linked from the sources page instead of embedded here.
 *
 * Playback is click-to-load: nothing is requested from YouTube until the reader
 * presses play, which keeps the page's own weight down and means the embed can
 * never slow the notes down.
 */

import type { SubjectSlug } from "./subjects";

export interface VideoLesson {
  /** YouTube video id. Verified — see the file header. */
  id: string;
  /** The publisher's own title, unedited, so it can be checked against YouTube. */
  title: string;
  /**
   * What the card says instead of the title.
   *
   * YouTube titles are written for search, not for readers: "APUSH Unit 3 REVIEW
   * [Period 3: 1754-1800]—Everything You NEED to Know!" is a mouthful in a
   * 20rem card and reads like shouting. The verbatim title is still the link
   * text, the accessible name and the thing you can check against YouTube.
   */
  label: string;
  /** A plain-language line about the video and who made it. */
  subtitle: string;
  /** Channel name exactly as YouTube reports it. */
  channel: string;
  /** Channel URL, for readers who want the rest of the series. */
  channelUrl: string;
  /** What this video is actually for, in one sentence, written by hand. */
  why: string;
  /** Unit numbers from this site's curriculum that the video covers. */
  units: number[];
  /** Rough length, minutes. Helps a reader plan. */
  minutes?: number;
  /** Date the link was last opened and checked. */
  checked: string;
}

const CHECKED = "2026-10-24";

export const videoLessons: Record<SubjectSlug, VideoLesson[]> = {
  apush: [
    {
      id: "1oNumKYNUaE",
      title: "APUSH Unit 3 REVIEW [Period 3: 1754-1800]—Everything You NEED to Know!",
      label: "Revolution and the early republic, unit 3",
      subtitle: "Heimler's full Unit 3 review",
      channel: "Heimler's History",
      channelUrl: "https://www.youtube.com/@heimlershistory",
      why: "The Revolution unit, compressed: the war's causes, the Enlightenment arguments, and why the Articles failed. Watch this before you attempt the Unit 3 DBQ.",
      units: [3],
      minutes: 37,
      checked: CHECKED,
    },
    {
      id: "kO5cfLxN44Y",
      title: "APUSH Unit 4 REVIEW [Period 4: 1800-1848]—EVERYTHING You NEED to Know",
      label: "Democracy and reform, unit 4",
      subtitle: "Heimler's full Unit 4 review",
      channel: "Heimler's History",
      channelUrl: "https://www.youtube.com/@heimlershistory",
      why: "Democracy, the market revolution and reform, tied together instead of listed. Good for the causality questions that set two developments against each other.",
      units: [4],
      checked: CHECKED,
    },
    {
      id: "RBb_TVqMy7c",
      title: "APUSH Review: Period 7 In 10 Minutes! (1890 - 1945)",
      label: "Empire and world war, unit 7 — in ten minutes",
      subtitle: "Adam Norris: Period 7 in 10 minutes",
      channel: "Adam Norris",
      channelUrl: "https://www.youtube.com/@AdamNorrisAPUSH",
      why: "Ten minutes on the densest period in the course — empire, the Depression and both world wars. The right length for a first pass before the notes.",
      units: [7],
      minutes: 10,
      checked: CHECKED,
    },
    {
      id: "jAlZEh46ytI",
      title: "APUSH Review: Final Exam Review for the New Curriculum - Periods 1 - 5 (Part I)",
      label: "The first half of the course, 1491–1877",
      subtitle: "Adam Norris: Periods 1–5 exam review",
      channel: "Adam Norris",
      channelUrl: "https://www.youtube.com/@AdamNorrisAPUSH",
      why: "A single sweep from 1491 to 1877 for the week before the exam, when you need the spine of the course rather than another unit.",
      units: [1, 2, 3, 4, 5],
      minutes: 45,
      checked: CHECKED,
    },
    {
      id: "-4aA_ROri6s",
      title: "APUSH Review: Final Exam Review for the New Curriculum: Periods 6-9 (Part II)",
      label: "The second half, 1877 to the present",
      subtitle: "Adam Norris: Periods 6–9 exam review",
      channel: "Adam Norris",
      channelUrl: "https://www.youtube.com/@AdamNorrisAPUSH",
      why: "The second half of the same sweep: Reconstruction's failure through the present, which is where most students lose the contextualisation point.",
      units: [6, 7, 8, 9],
      minutes: 35,
      checked: CHECKED,
    },
  ],
  "ap-lang": [
    {
      id: "oU1_rGvAElg",
      title: "How to Write a Rhetorical Analysis Essay | UPDATED | Coach Hall Writes",
      label: "Writing the rhetorical analysis, start to finish",
      subtitle: "Coach Hall: how to write a rhetorical analysis",
      channel: "Coach Hall Writes",
      channelUrl: "https://www.youtube.com/@CoachHallWrites",
      why: "The whole Q2 essay, start to finish, from a teacher who scores them. Start here if the rhetoric question still feels like a device hunt.",
      units: [1, 2, 3],
      checked: CHECKED,
    },
    {
      id: "zJ-TAoQpqsA",
      title: "How to Write a Defensible Thesis for a Rhetorical Analysis Essay | AP Lang Q2",
      label: "A thesis somebody could argue against",
      subtitle: "Coach Hall: defensible thesis for Q2",
      channel: "Coach Hall Writes",
      channelUrl: "https://www.youtube.com/@CoachHallWrites",
      why: "Fixes the single most expensive sentence in the essay. If your thesis cannot be argued against, the thesis point is gone before the body starts.",
      units: [1, 2],
      checked: CHECKED,
    },
    {
      id: "BESrTtxC6kM",
      title: "Synthesis Thesis Example",
      label: "How to write a synthesis thesis",
      subtitle: "Coach Hall: synthesis thesis example",
      channel: "Coach Hall Writes",
      channelUrl: "https://www.youtube.com/@CoachHallWrites",
      why: "Short, and only about the synthesis thesis — the place where summarising the sources instead of entering the conversation loses the point.",
      units: [6, 9],
      checked: CHECKED,
    },
    {
      id: "aAa-JfSuaNk",
      title: "Line of Reasoning Tips for an Argument Essay | AP Lang Q3",
      label: "Building a line of reasoning",
      subtitle: "Coach Hall: line of reasoning for Q3",
      channel: "Coach Hall Writes",
      channelUrl: "https://www.youtube.com/@CoachHallWrites",
      why: "What a line of reasoning is, and how to build one that survives paragraph three. The rubric names it directly, so it is worth thirty minutes.",
      units: [3, 5, 7],
      checked: CHECKED,
    },
    {
      id: "TwkrI4cRirg",
      title: "Argument Essay Workshop | Coach Hall Writes",
      label: "The argument essay, workshopped",
      subtitle: "Coach Hall: argument essay workshop",
      channel: "Coach Hall Writes",
      channelUrl: "https://www.youtube.com/@CoachHallWrites",
      why: "A full argument workshop, including the commentary that earns evidence and sophistication points. Watch with a draft open.",
      units: [7, 9],
      checked: CHECKED,
    },
  ],
  "ap-seminar": [
    {
      id: "_1bwXiF3M3o",
      title: "AP Seminar: How to Choose an IRR Paper Topic",
      label: "Choosing your IRR lens",
      subtitle: "AP Capstone Corner: choosing an IRR topic",
      channel: "AP Capstone Corner",
      channelUrl: "https://www.youtube.com/@APCapstoneCorner",
      why: "How to go from a team issue to a defensible individual lens. Choose the wrong lens and every later paragraph is uphill.",
      units: [1],
      checked: CHECKED,
    },
    {
      id: "DaVAMzcNPa4",
      title: "AP Seminar IRR: Introduction Paragraph",
      label: "The IRR introduction",
      subtitle: "Alex Hower: IRR introduction paragraph",
      channel: "Alex Hower",
      channelUrl: "https://www.youtube.com/@alexhower4389",
      why: "The introduction's two jobs: establish the issue, then frame the lens. Short and specific to the IRR's word limit.",
      units: [2, 3],
      checked: CHECKED,
    },
    {
      id: "HApr-CvIhNs",
      title: "AP Seminar IRR: Body Paragraph Conversations",
      label: "Making sources talk to each other",
      subtitle: "Alex Hower: IRR body paragraphs",
      channel: "Alex Hower",
      channelUrl: "https://www.youtube.com/@alexhower4389",
      why: "How to make sources talk to each other rather than take turns. This is the difference between synthesis and a source-by-source list.",
      units: [3, 4],
      checked: CHECKED,
    },
    {
      id: "HqFZHELVZCU",
      title: "AP Seminar IRR: Conclusion Paragraph",
      label: "Ending the IRR without repeating it",
      subtitle: "Alex Hower: IRR conclusion",
      channel: "Alex Hower",
      channelUrl: "https://www.youtube.com/@alexhower4389",
      why: "Ends the report without repeating it. Also a useful model for the IWA's conclusion, where the same mistake recurs.",
      units: [4, 5],
      checked: CHECKED,
    },
  ],
  "ap-gov": [
    {
      id: "FepoztzFG4E",
      title: "AP Government UNIT 2 REVIEW [Everything You Need to Know!]",
      label: "Interactions among the branches, unit 2",
      subtitle: "Heimler's AP Gov Unit 2 review",
      channel: "Heimler's History",
      channelUrl: "https://www.youtube.com/@heimlershistory",
      why: "The branches unit, which carries the heaviest weight on the exam. Watch it before the interaction questions, not after.",
      units: [2],
      checked: CHECKED,
    },
    {
      id: "SiKLZD8QHHQ",
      title: "AP Gov Required Cases Exam Review",
      label: "All fifteen required cases in one sitting",
      subtitle: "Carey LaManna: required cases review",
      channel: "Carey LaManna",
      channelUrl: "https://www.youtube.com/@CareyLaManna",
      why: "All fifteen required cases in one sitting, from an AP Gov teacher. Use it as the last pass, after you can already state each holding.",
      units: [2, 3],
      checked: CHECKED,
    },
    {
      id: "weBfbqH835Y",
      title: "McCulloch v Maryland, EXPLAINED [AP Gov Required Supreme Court Cases]",
      label: "McCulloch v. Maryland, explained",
      subtitle: "Heimler: McCulloch v Maryland",
      channel: "Heimler's History",
      channelUrl: "https://www.youtube.com/@heimlershistory",
      why: "The case the whole federalism unit hangs on: implied powers, the necessary and proper clause, and supremacy.",
      units: [1, 2],
      checked: CHECKED,
    },
    {
      id: "vBc-4aET6f8",
      title: "Baker v. Carr, EXPLAINED [AP Gov Required Supreme Court Cases]",
      label: "Baker v. Carr, explained",
      subtitle: "Heimler: Baker v. Carr",
      channel: "Heimler's History",
      channelUrl: "https://www.youtube.com/@heimlershistory",
      why: "Apportionment and justiciability, explained in the language the FRQ expects. Pairs with the comparison question below.",
      units: [2, 3],
      checked: CHECKED,
    },
    {
      id: "ci57dHJxoDo",
      title: "How to: SCOTUS Comparison Question [AP Gov FRQ]",
      label: "The required-case FRQ template",
      subtitle: "Heimler: SCOTUS comparison question",
      channel: "Heimler's History",
      channelUrl: "https://www.youtube.com/@heimlershistory",
      why: "The required-case comparison is the most predictable FRQ in the course. Learn the template once and it pays on every paper.",
      units: [2, 3],
      checked: CHECKED,
    },
  ],
  "ap-bio": [
    {
      id: "O3sQnfByT24",
      title: "AP Biology: Unit 3 on Energetics in 20 MINUTES!",
      label: "Cellular energetics, unit 3",
      subtitle: "Aevo Prep: Unit 3 in 20 minutes",
      channel: "Aevo Prep Academy",
      channelUrl: "https://www.youtube.com/@aevoprep9816",
      why: "Photosynthesis and respiration at exam altitude: what goes in, what comes out, and where the free energy actually moves.",
      units: [3],
      minutes: 20,
      checked: CHECKED,
    },
    {
      id: "1iYUXH9R1fM",
      title: "3.5 Cellular Respiration - AP Biology (Updated 2025-2026)",
      label: "Cellular respiration, topic by topic",
      subtitle: "PoseKnows Biology: 3.5 Cellular Respiration",
      channel: "Gabe Poser - PoseKnows Biology",
      channelUrl: "https://www.youtube.com/@poseknowsbio",
      why: "Topic-level explanation of cellular respiration, matched to the current course description. Slower than the unit recaps, and worth it.",
      units: [3],
      checked: CHECKED,
    },
    {
      id: "PSZTdoFKNFQ",
      title: "(2019 curriculum) Unit 5: Heredity AP Biology RECAP",
      label: "Heredity, unit 5",
      subtitle: "PoseKnows Biology: Unit 5 recap",
      channel: "Gabe Poser - PoseKnows Biology",
      channelUrl: "https://www.youtube.com/@poseknowsbio",
      why: "Meiosis through Mendelian genetics in one capstone recap. The unit numbering still matches the current framework.",
      units: [5],
      checked: CHECKED,
    },
    {
      id: "KmKW1Tdsis8",
      title: "(2019 curriculum) Unit 6: Gene Expression and Regulation AP Biology RECAP",
      label: "Gene expression, unit 6",
      subtitle: "PoseKnows Biology: Unit 6 recap",
      channel: "Gabe Poser - PoseKnows Biology",
      channelUrl: "https://www.youtube.com/@poseknowsbio",
      why: "An hour on the unit that decides most AP Bio scores: replication, transcription, translation, operons and biotechnology.",
      units: [6],
      minutes: 60,
      checked: CHECKED,
    },
  ],
  "ap-calc": [
    {
      id: "YNstP0ESndU",
      title: "Calculus 1 - Introduction to Limits",
      label: "Limits, worked slowly",
      subtitle: "Organic Chemistry Tutor: introduction to limits",
      channel: "The Organic Chemistry Tutor",
      channelUrl: "https://www.youtube.com/@TheOrganicChemistryTutor",
      why: "Limits by substitution, by factoring and graphically, worked slowly. The fix for Unit 1 holes that keep costing points in Unit 5.",
      units: [1],
      checked: CHECKED,
    },
    {
      id: "WsQQvHm4lSw",
      title: "Understand Calculus in 35 Minutes",
      label: "The whole of Calculus 1 in half an hour",
      subtitle: "Organic Chemistry Tutor: calculus in 35 minutes",
      channel: "The Organic Chemistry Tutor",
      channelUrl: "https://www.youtube.com/@TheOrganicChemistryTutor",
      why: "Limits, derivatives and integrals in one pass, with the relationships named out loud. A good diagnostic if you are not sure what is actually broken.",
      units: [1, 2, 6],
      minutes: 35,
      checked: CHECKED,
    },
    {
      id: "WDZMjYJyH6k",
      title: "Basic Integration Rules & Problems, Riemann Sum, Area, Sigma Notation, Fundamental Theorem, Calculus",
      label: "Riemann sums to the Fundamental Theorem",
      subtitle: "Organic Chemistry Tutor: integration rules",
      channel: "The Organic Chemistry Tutor",
      channelUrl: "https://www.youtube.com/@TheOrganicChemistryTutor",
      why: "Riemann sums to the Fundamental Theorem, which is exactly the order the accumulation questions expect you to think in.",
      units: [6, 8],
      checked: CHECKED,
    },
  ],
  "ap-research": [
    {
      id: "4Oh7z8Mt3rY",
      title: "The Structure of the Literature Review and Helping the AP Reader",
      label: "How a reader actually reads your lit review",
      subtitle: "Paul Henry: structure of the literature review",
      channel: "Paul Henry",
      channelUrl: "https://www.youtube.com/@MrHenryAPCapstone",
      why: "How an AP Capstone teacher reads a literature review, section by section, against the actual rubric wording.",
      units: [3],
      checked: CHECKED,
    },
    {
      id: "zIYC6zG265E",
      title: "How to Write a Literature Review: 3 Minute Step-by-step Guide",
      label: "The literature review in three minutes",
      subtitle: "Scribbr: how to write a literature review",
      channel: "Scribbr",
      channelUrl: "https://www.youtube.com/@Scribbr-us",
      why: "Three minutes on the five moves a literature review makes. Thematic organisation, not a list of sources — the same lesson as the rubric.",
      units: [3],
      minutes: 3,
      checked: CHECKED,
    },
    {
      id: "lKTavJj0iZw",
      title: "Setting Up Your POD for Success",
      label: "Setting up the presentation and defence",
      subtitle: "Paul Henry: setting up your POD",
      channel: "Paul Henry",
      channelUrl: "https://www.youtube.com/@MrHenryAPCapstone",
      why: "The presentation and oral defence, which is a quarter of the score and the part nobody practises until the week before.",
      units: [5],
      checked: CHECKED,
    },
  ],
};

/** Everything embedded for a course, in curriculum order. */
export function videosFor(slug: SubjectSlug): VideoLesson[] {
  return videoLessons[slug] ?? [];
}

/** The one video most likely to help with a specific unit, if one exists. */
export function videoForUnit(slug: SubjectSlug, unitNumber: number): VideoLesson | undefined {
  return videosFor(slug).find((video) => video.units.includes(unitNumber));
}

export function videosForUnit(slug: SubjectSlug, unitNumber: number): VideoLesson[] {
  return videosFor(slug).filter((video) => video.units.includes(unitNumber));
}

/**
 * Privacy-enhanced embed host. youtube-nocookie defers the advertising cookies
 * until playback, and it is the only frame origin the site's CSP allows.
 */
export function embedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
}

export function watchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function posterUrl(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
