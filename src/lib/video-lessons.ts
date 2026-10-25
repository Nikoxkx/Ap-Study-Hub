import { getSubject, isSubjectSlug, type SubjectSlug } from "./subjects";

/**
 * Unit-level video registry.
 *
 * This file is generated from the reviewed rows of the companion Google Sheet
 * "AP Study Hub — Unit Video Registry (Oct 2026)". It is committed as typed
 * data on purpose: a missing video ID is caught by `pnpm validate:videos`
 * instead of surfacing as a blank iframe in production. Thumbnails are static
 * images from YouTube's image host and fall back to smaller sizes, so an
 * unavailable thumbnail never breaks the lesson page or loads an embed.
 *
 * Selection rules, in order: curriculum alignment to the unit; a creator with
 * a sustained AP teaching record; a public YouTube watch page; a useful length;
 * and a direct player that works with youtube-nocookie embeds. Videos are
 * independent creator work, not College Board material. Each unit has at least
 * one full review; sparse AP Capstone units also get a second skill-focused
 * video. No claim of official endorsement is made.
 */

export type VideoRole = "Full unit review" | "Unit breakdown" | "Skill focus" | "Exam strategy" | "Worked example" | "Course overview";

export interface UnitVideo {
  /** Eleven-character YouTube video ID. */
  id: string;
  courseSlug: SubjectSlug;
  unit: number;
  title: string;
  creator: string;
  role: VideoRole;
  /** A short, honest description of why this video belongs next to the lesson. */
  focus: string;
  checked: string;
}

export const VIDEO_CHECKED = "2026-10-24";
export const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

function video(
  courseSlug: SubjectSlug,
  unit: number,
  id: string,
  title: string,
  creator: string,
  role: VideoRole,
  focus: string,
): UnitVideo {
  return { id, courseSlug, unit, title, creator, role, focus, checked: VIDEO_CHECKED };
}

export const unitVideos: UnitVideo[] = [
  // AP U.S. History — Heimler's 2025 unit reviews for periods 1–4 and Maximum
  // Insight's complete 2025–26 reviews for periods 5–9.
  video("apush", 1, "fTv4S1q7p_c", "APUSH Unit 1 REVIEW [Period 1: 1491–1607]", "Heimler's History", "Full unit review", "Native societies, European contact, and the Columbian Exchange"),
  video("apush", 1, "jqf_c9Pw8gs", "APUSH Unit 1 REVIEW (Period 1: 1491–1607)", "Heimler's History", "Unit breakdown", "The earlier concise pass through period 1's big picture"),
  video("apush", 2, "t0wIU4R0MhI", "APUSH Unit 2 REVIEW [Period 2: 1607–1754]", "Heimler's History", "Full unit review", "Colonial regions, Atlantic trade, and imperial rivalry"),
  video("apush", 2, "gKnX0bCiUDU", "APUSH Unit 2 REVIEW (Period 2: 1607–1754)", "Maximum Insight", "Unit breakdown", "A second full pass for colonial comparison questions"),
  video("apush", 3, "1oNumKYNUaE", "APUSH Unit 3 REVIEW [Period 3: 1754–1800]", "Heimler's History", "Full unit review", "Revolution, republican government, and the Constitution"),
  video("apush", 3, "YhqXNJngvTo", "APUSH Unit 3 Review (Period 3: 1754–1800)", "Heimler's History", "Unit breakdown", "The earlier period-3 review for repeated retrieval"),
  video("apush", 4, "kO5cfLxN44Y", "APUSH Unit 4 REVIEW [Period 4: 1800–1848]", "Heimler's History", "Full unit review", "Democracy, markets, reform, and early national expansion"),
  video("apush", 4, "-wnDpr9PMnc", "APUSH Unit 4 REVIEW [Period 4: 1800–1848]", "Heimler's History", "Unit breakdown", "A second explanation of the Second Great Awakening and reform"),
  video("apush", 5, "GFiFCusy75E", "APUSH Unit 5 REVIEW (Period 5: 1844–1877)", "Maximum Insight", "Full unit review", "Manifest Destiny, sectional crisis, Civil War, and Reconstruction"),
  video("apush", 6, "mn3-S4FHW5U", "APUSH Unit 6 REVIEW (Period 6: 1865–1898)", "Maximum Insight", "Full unit review", "Industrial capitalism, labor, migration, and Gilded Age politics"),
  video("apush", 7, "j7v3_wmnEfI", "APUSH Unit 7 REVIEW (Period 7: 1890–1945)", "Maximum Insight", "Full unit review", "Imperialism, progressivism, world wars, Depression, and New Deal"),
  video("apush", 8, "DNOs1lHnHho", "APUSH Unit 8 REVIEW (Period 8: 1945–1980)", "Maximum Insight", "Full unit review", "Cold War, civil rights, Vietnam, and the conservative turn"),
  video("apush", 9, "CHTZJvj_yMU", "APUSH Unit 9 REVIEW (Period 9: 1980–Present)", "Maximum Insight", "Full unit review", "Conservatism, globalization, technology, and 21st-century challenges"),

  // AP English Language — one video from a single nine-unit playlist keeps the
  // sequence and vocabulary consistent with the site's AP Lang spiral.
  video("ap-lang", 1, "3ngrJhJdZ6w", "Understand the Rhetorical Situation — AP Lang Unit 1", "How to AP English", "Unit breakdown", "Author, audience, context, exigence, purpose, and message"),
  video("ap-lang", 2, "ZgoEf6XRo1Q", "Understanding Claims and Evidence — AP Lang Unit 2", "How to AP English", "Unit breakdown", "Claims, evidence, and the reading-writing connection"),
  video("ap-lang", 3, "ngi9ehUWDb8", "Analyzing Evidence and Commentary — AP Lang Unit 3", "How to AP English", "Unit breakdown", "Turning evidence into commentary rather than summary"),
  video("ap-lang", 4, "w3xHBlq9SUw", "Rhetoric, Overarching Thesis, and Comparisons — AP Lang Unit 4", "How to AP English", "Unit breakdown", "Purposeful structure and methods of development"),
  video("ap-lang", 5, "1R4BjJQ0Dh0", "Definitions and Perspectives — AP Lang Unit 5", "How to AP English", "Unit breakdown", "Coherence, qualification, and sentence-level control"),
  video("ap-lang", 6, "N-2L6lGOSxM", "Analyzing Style and Diction — AP Lang Unit 6", "How to AP English", "Unit breakdown", "Credibility, bias, and how style shapes a perspective"),
  video("ap-lang", 7, "CI4RR_mDzgM", "Sentence Structure and Word Flow — AP Lang Unit 7", "How to AP English", "Unit breakdown", "Nuance, syntax, and complex claims"),
  video("ap-lang", 8, "7Sd_tqTDur4", "The Impact of the Rhetorical Situation — AP Lang Unit 8", "How to AP English", "Unit breakdown", "Audience-centered style and voice"),
  video("ap-lang", 9, "OQPC8VpSQvA", "Credibility and Validity of Claims — AP Lang Unit 9", "How to AP English", "Unit breakdown", "Synthesis, rebuttal, and evaluating an argument"),

  // AP Seminar — the public video corpus is thinner than exam-subject courses,
  // so each unit gets a full explanation plus a focused skill video.
  video("ap-seminar", 1, "Z5V3SsjuRoE", "AP Seminar Performance Task 1: IRR and TMP", "Aiming for A's", "Exam strategy", "How question-and-explore becomes the individual report and team presentation"),
  video("ap-seminar", 1, "0vpMhhrGg3E", "What is AP Seminar? The QUEST Framework", "AP Educators", "Course overview", "Question, explore, understand, synthesize, and transmit as one cycle"),
  video("ap-seminar", 2, "pP8dWURrEF0", "Analyzing the Argument, Part 1", "Snap Language", "Skill focus", "Claims, premises, conclusions, and critical reading"),
  video("ap-seminar", 2, "jVf_iJpSIrM", "Analyzing the Argument, Part 2: Evaluating Evidence", "Snap Language", "Skill focus", "Testing the evidence behind an argument"),
  video("ap-seminar", 3, "Yaj6QOYpSJY", "Developing Multiple Perspectives for IRR and IWA", "Paul Henry", "Skill focus", "Putting lenses and perspectives into conversation"),
  video("ap-seminar", 3, "KabPtKWu3gU", "Multiple Perspectives in AP Seminar", "Paul Henry", "Skill focus", "A second explanation of perspective and lens analysis"),
  video("ap-seminar", 4, "5ammL6h5SY0", "IWA Body Paragraphs", "Zachary Zivkovich", "Skill focus", "Synthesizing sources into a line of reasoning"),
  video("ap-seminar", 4, "K_Up65nbcvQ", "Synthesize and Argue", "Bethel University Library", "Skill focus", "Using a synthesis matrix to move from reading to argument"),
  video("ap-seminar", 5, "u8MTW5gCHCU", "AP Seminar Line of Reasoning Break Down", "Kristy Emily Lay-Evans", "Skill focus", "Transforming research into a defensible team presentation"),
  video("ap-seminar", 5, "6YSnw3mZA5Q", "Identifying Main Idea and Line of Reasoning: EOC A", "Justin Galusha", "Exam strategy", "Transmitting a clear argument under exam conditions"),

  // AP U.S. Government — Heimler's 2026 unit 1 and 2 reviews plus Carey
  // LaManna's 2024 unit reviews for the remaining three units.
  video("ap-gov", 1, "dCfpbSGsUKI", "AP GOV Unit 1 REVIEW — Everything You NEED to Know", "Heimler's History", "Full unit review", "Foundations, federalism, and the 2026–27 required-document updates"),
  video("ap-gov", 2, "zWss308JFD0", "AP Government Unit 2 Review", "Heimler's History", "Full unit review", "Congress, presidency, courts, bureaucracy, and checks and balances"),
  video("ap-gov", 2, "FepoztzFG4E", "AP Government UNIT 2 REVIEW", "Heimler's History", "Unit breakdown", "The earlier complete pass through branches and policymaking"),
  video("ap-gov", 3, "I62kUjkCKUw", "AP Gov Unit 3 Review — Civil Liberties and Civil Rights", "Ultimate Review Packet", "Full unit review", "Required cases, amendments, and the rights-protection balance"),
  video("ap-gov", 4, "Yu35_ZI-YgQ", "AP Gov Unit 4 Review — Political Ideologies and Beliefs", "Ultimate Review Packet", "Full unit review", "Political socialization, ideology, and public opinion"),
  video("ap-gov", 5, "flyWNFQMOrM", "AP Gov Unit 5 Review — Political Participation", "Ultimate Review Packet", "Full unit review", "Parties, interest groups, elections, media, and voting behavior"),

  // AP Biology — a single eight-video teacher-led review series covers the
  // whole CED in order, with consistent pacing and exam emphasis.
  video("ap-bio", 1, "kgNBHcPvsGw", "AP Biology Review: Unit 1 Chemistry of Life", "AP Bio Penguins", "Full unit review", "Water, elements of life, macromolecules, and functional groups"),
  video("ap-bio", 2, "euG2f8Y81cU", "AP Biology Review: Unit 2 The Cell", "AP Bio Penguins", "Full unit review", "Organelles, membranes, transport, and compartmentalization"),
  video("ap-bio", 3, "clXsWjApSE8", "AP Biology Review: Unit 3 Cellular Energetics", "AP Bio Penguins", "Full unit review", "Enzymes, photosynthesis, respiration, and energy transfer"),
  video("ap-bio", 4, "VtTdMYPrEWM", "AP Biology Review: Unit 4 Cell Communication & Cell Cycle", "AP Bio Penguins", "Full unit review", "Signal transduction, feedback, mitosis, and cancer"),
  video("ap-bio", 5, "3H4YA7oXG-k", "AP Biology Review: Unit 5 Heredity", "AP Bio Penguins", "Full unit review", "Meiosis, Mendelian genetics, pedigrees, and non-Mendelian inheritance"),
  video("ap-bio", 6, "l9phFc0oWIU", "AP Biology Review: Unit 6 Gene Expression & Regulation", "AP Bio Penguins", "Full unit review", "Replication, transcription, translation, mutations, and gene control"),
  video("ap-bio", 7, "47H34Me6S0g", "AP Biology Review: Unit 7 Natural Selection", "AP Bio Penguins", "Full unit review", "Selection, Hardy-Weinberg, speciation, phylogeny, and origins of life"),
  video("ap-bio", 8, "nLr8VZRQtBo", "AP Biology Review: Unit 8 Ecology", "AP Bio Penguins", "Full unit review", "Population dynamics, communities, energy flow, and ecosystem disruption"),

  // AP Calculus AB/BC — concise full reviews for units 1–6 and 8, Krista
  // King's unit 3 deep dive, and BC-specific units 9–10.
  video("ap-calc", 1, "SVb9OV0bLzI", "AP Calculus AB/BC Unit 1 FULL REVIEW: Limits and Continuity", "Maximum Insight", "Full unit review", "Limits from graphs, tables, algebra, and continuity tests"),
  video("ap-calc", 2, "7qNE_B0r4z4", "AP Calculus AB/BC Unit 2 FULL REVIEW: Derivatives", "Maximum Insight", "Full unit review", "Average and instantaneous change, derivative definition, and rules"),
  video("ap-calc", 3, "MftbWpwHLRI", "AP Calculus AB and BC Unit 3 Review", "Krista King", "Full unit review", "Chain rule, implicit differentiation, inverses, and higher-order derivatives"),
  video("ap-calc", 4, "uxcVSfBB6cs", "AP Calculus AB/BC Unit 4 FULL REVIEW: Contextual Applications", "Maximum Insight", "Full unit review", "Motion, related rates, linearization, and L'Hôpital's rule"),
  video("ap-calc", 5, "JVZfjsMXTo8", "AP Calculus AB/BC Unit 5 FULL REVIEW: Analytical Applications", "Maximum Insight", "Full unit review", "Mean value theorem, extrema, derivative tests, and optimization"),
  video("ap-calc", 6, "3W1Uf2pnreY", "AP Calculus AB/BC Unit 6 FULL REVIEW: Integration and Accumulation", "Maximum Insight", "Full unit review", "Riemann sums, the FTC, antiderivatives, and substitution"),
  video("ap-calc", 7, "PN7yIOkR0iw", "AP Calculus AB Unit 7 Review: Differential Equations", "Calculus by Christee", "Full unit review", "Slope fields, separation of variables, and exponential models"),
  video("ap-calc", 8, "yUWCrbChtAI", "Applications of Integrals Review — All of AP Calculus Unit 8", "turksvids", "Full unit review", "Average value, motion, area, volume, and accumulation applications"),
  video("ap-calc", 9, "Tw4q1rs2Dqg", "AP Calculus BC Unit 9 Review", "Meek Extra Help", "Full unit review", "Parametric equations, polar coordinates, and vector-valued functions"),
  video("ap-calc", 10, "VZs81fFXnnQ", "AP Calculus BC Unit 10 Review for the AP Exam", "ProjectExplained", "Full unit review", "Sequences, series, convergence tests, and Taylor polynomials"),

  // AP Research — a full-paper walkthrough, AP-specific method and literature
  // guidance, data-as-evidence, and a real presentation/defense example.
  video("ap-research", 1, "k-3G03VNBAg", "What is AP Research? Overview and Explanation", "AP Capstone Corner", "Course overview", "The gap, research question, and every section of the academic paper"),
  video("ap-research", 1, "vXRaFvknxFY", "How to Survive AP Research", "silvia", "Exam strategy", "Choosing a feasible topic and question from a student perspective"),
  video("ap-research", 2, "eKIY-OjWlG0", "AP Research Method Explained: Correlational Analysis", "AP Capstone Corner", "Skill focus", "Matching a method to the research question and collecting usable data"),
  video("ap-research", 2, "gRUW95_Xm74", "Using Data as Evidence in AP Research", "DataClassroom", "Skill focus", "Refining a question, collecting evidence, and analysing data"),
  video("ap-research", 3, "4Oh7z8Mt3rY", "The Structure of the Literature Review", "Paul Henry", "Skill focus", "Organising prior research around themes, debates, and gaps"),
  video("ap-research", 3, "zIYC6zG265E", "How to Write a Literature Review: 3-Minute Guide", "Scribbr", "Skill focus", "Search, evaluate, synthesise, outline, and write the review"),
  video("ap-research", 4, "3xpQcwizXOQ", "How to Write a Findings Section", "Qual Scholars", "Skill focus", "Presenting results and analysis without overstating conclusions"),
  video("ap-research", 4, "GzC-3kwb9pI", "Research Chapters 4 & 5: Data, Analysis, and Conclusion", "DyeyzzonTeaches", "Skill focus", "Linking results, discussion, limitations, and recommendations"),
  video("ap-research", 5, "zciazWHOwKQ", "AP Research Final Presentation and Oral Defense", "Tyler Brandt", "Worked example", "A complete presentation-and-defense example to critique"),
  video("ap-research", 5, "aKVB-Rxlpoc", "AP Research Oral Defense", "sheefra", "Worked example", "A second defense example for comparison and rehearsal"),
];

export function videoWatchUrl(v: UnitVideo): string {
  return `https://www.youtube.com/watch?v=${v.id}`;
}

export function videoEmbedUrl(v: UnitVideo): string {
  return `https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1&playsinline=1`;
}

/**
 * Actual YouTube thumbnail, requested directly from YouTube's static image
 * host. `hqdefault.jpg` is available for every public video; the smaller
 * variants are tried in order if it cannot be fetched. These are images, not
 * the embedded player, and are allowlisted in the content security policy.
 */
export type VideoThumbnailSize = "hq" | "mq" | "default";
export const VIDEO_THUMBNAIL_SIZES: readonly VideoThumbnailSize[] = ["hq", "mq", "default"];

export function videoThumbnailUrl(v: UnitVideo, size: VideoThumbnailSize = "hq"): string {
  const file = size === "hq" ? "hqdefault.jpg" : size === "mq" ? "mqdefault.jpg" : "default.jpg";
  return `https://i.ytimg.com/vi/${v.id}/${file}`;
}

export function videoSearchUrl(v: UnitVideo): string {
  const subject = getSubject(v.courseSlug);
  const query = `${subject?.official ?? v.courseSlug} unit ${v.unit} ${v.creator} ${v.title}`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export function getUnitVideos(courseSlug: string, unit: number): UnitVideo[] {
  if (!isSubjectSlug(courseSlug)) return [];
  return unitVideos.filter((v) => v.courseSlug === courseSlug && v.unit === unit);
}

export function getCourseVideos(courseSlug: string): UnitVideo[] {
  if (!isSubjectSlug(courseSlug)) return [];
  return unitVideos.filter((v) => v.courseSlug === courseSlug).sort((a, b) => a.unit - b.unit || a.title.localeCompare(b.title));
}

export function getVideoCoverage(): { units: number; videos: number; byCourse: Record<SubjectSlug, { units: number; videos: number }> } {
  const byCourse = {} as Record<SubjectSlug, { units: number; videos: number }>;
  const units = new Set<string>();
  for (const v of unitVideos) {
    const key = `${v.courseSlug}:${v.unit}`;
    units.add(key);
    const row = byCourse[v.courseSlug] ?? { units: 0, videos: 0 };
    row.videos += 1;
    byCourse[v.courseSlug] = row;
  }
  for (const [key, row] of Object.entries(byCourse)) {
    row.units = new Set(unitVideos.filter((v) => v.courseSlug === key).map((v) => v.unit)).size;
  }
  return { units: units.size, videos: unitVideos.length, byCourse };
}
