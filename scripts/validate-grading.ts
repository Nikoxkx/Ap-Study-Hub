/**
 * Grading regression checks.
 *
 * The offline grader is the default path, so it is worth knowing that it still
 * separates a summary from an argument and a number dump from worked
 * mathematics. These assertions are deliberately coarse — the grader measures
 * signals, not truth — but they catch the two failures that matter: a rubric
 * that pays everyone the same number of points, and a rubric that punishes a
 * strong response.
 *
 * Run with: npx tsx scripts/validate-grading.ts
 */

import { gradeLocally } from "../src/lib/grading/grade";
import { analyzeWriting } from "../src/lib/grading/analyze";
import { spellingVocabulary } from "../src/lib/grading/wordlist";
import { getAssessment, getRubricForFrq } from "../src/lib/exams";

const failures: string[] = [];

function check(label: string, condition: boolean, detail: string): void {
  if (condition) {
    console.log(`  ✓ ${label}`);
    return;
  }
  failures.push(`${label} — ${detail}`);
  console.log(`  ✗ ${label} — ${detail}`);
}

const lit = getAssessment("ap-lit")!;
const litFrq = lit.sections.flatMap((section) => section.frqs).find((frq) => frq.id === "ap-lit-poetry")!;
const litRubric = getRubricForFrq(litFrq)!;
const litSources = lit.stimuli.find((stimulus) => stimulus.id === "lit-rossetti-remember")?.text ?? "";

const weakEssay = `The poem is about remembering someone. She says remember me. It is a sad poem about death and memory. The poet uses imagery and structure to show her feelings and point of view. This is shown throughout the poem many times in the text with words. The speaker wants to be remembered after she dies and this is clear from what she says about the silent land and the future.`;

const middleEssay = `Christina Rossetti's "Remember" is a poem about a speaker who asks her beloved to remember her after death. The speaker says "Remember me when I am gone away", which shows that she is worried about being forgotten. She also describes "the silent land", and this imagery suggests that death is a quiet and distant place. The poem uses a sonnet structure, which is a traditional form for love poetry, and Rossetti uses it to talk about memory and loss. In the sestet the speaker says it is "Better by far you should forget and smile", which shows that she changes her mind and cares about the beloved's happiness more than her own memory.`;

const strongEssay = [
  `Christina Rossetti's "Remember" turns the conventional plea of a departing lover into an argument against remembrance itself. The octave issues the command "Remember me when I am gone away", but the sestet revises it: "Better by far you should forget and smile / Than that you should remember and be sad." That reversal is the poem's meaning, and Rossetti builds it out of the sonnet's own structure — the turn at "Yet" converts possession into generosity.`,
  `The first quatrain fixes the beloved in the future tense, where memory is a hand that can no longer be held. The imagery is spatial and silent: "the silent land" is a place the speaker cannot describe, only gesture toward, and the phrase "Nor I half turn to go yet turning stay" catches the speaker between departure and hesitation. Rossetti's point of view is intimate but oddly impersonal, since the speaker speaks only to give orders about her own absence.`,
  `The second quatrain narrows the address to "day by day / You tell me of our future that you plann'd", exposing a future that will not happen. The verb "plann'd" is possessive and domestic, and its apostrophe marks a life already receding into the past tense. When the speaker says "It will be late to counsel then or pray", she concedes that grief arrives after advice has stopped working, which prepares the sestet's permission to forget.`,
  `The volta at "Yet" is where the poem earns its distinction. Having spent eight lines insisting on memory, the speaker releases the beloved from it, reasoning that "the darkness and corruption" will leave only "a vestige of the thoughts that once I had". The final couplet converts consolation into a moral claim: to remember and be sad is worse than to forget and smile. Rossetti thus uses the sonnet's compression to dramatise a love that prefers the other person's happiness to its own continuance, which is both generous and a little proud.`,
].join("\n\n");

const weakGrade = gradeLocally(weakEssay, litRubric, { sources: litSources });
const middleGrade = gradeLocally(middleEssay, litRubric, { sources: litSources });
const strongGrade = gradeLocally(strongEssay, litRubric, { sources: litSources });

console.log("\nAnalytic rubric · AP English Literature Q1");
console.log(`  weak ${weakGrade.earned}/${weakGrade.possible} · middle ${middleGrade.earned}/${middleGrade.possible} · strong ${strongGrade.earned}/${strongGrade.possible}`);

check(
  "a summary scores below a developed essay",
  weakGrade.earned < middleGrade.earned,
  `weak ${weakGrade.earned} vs middle ${middleGrade.earned}`,
);
check(
  "a developed essay scores below a full argument",
  middleGrade.earned < strongGrade.earned,
  `middle ${middleGrade.earned} vs strong ${strongGrade.earned}`,
);
check(
  "a full argument can reach the top of the rubric",
  strongGrade.earned === strongGrade.possible,
  `strong scored ${strongGrade.earned}/${strongGrade.possible}`,
);
check(
  "every rubric row is scored, none is skipped",
  strongGrade.rows.length === litRubric.rows.length,
  `${strongGrade.rows.length} rows graded of ${litRubric.rows.length}`,
);
check(
  "the sophistication row is not free",
  middleGrade.rows.find((row) => row.id === "sophistication")?.points === 0,
  "a middle essay was awarded sophistication",
);
check(
  "a polished essay is not flagged for spelling",
  strongGrade.mechanics.filter((issue) => issue.rule === "spelling").length === 0,
  strongGrade.mechanics
    .filter((issue) => issue.rule === "spelling")
    .map((issue) => issue.message)
    .join("; "),
);

const calc = getAssessment("ap-calc")!;
const calcFrq = calc.sections.flatMap((section) => section.frqs).find((frq) => frq.id === "ap-calc-frq-1")!;
const calcRubric = getRubricForFrq(calcFrq)!;

const numberDump =
  "The answer is 42 because 42 is always the answer. I think 7 and 12 and 3 are numbers. The integral of the rate gives volume in litres.";
const workedMath = [
  "V = int_0^3 R(t) dt = 62.506 litres.",
  "R'(t) = 2.5t cos(t^2/4), so R'(2) = 2.701 litres per hour per hour.",
  "Therefore the average rate is (1/6) int_0^6 R(t) dt = 20.621 litres per hour.",
].join(" ");

const junkGrade = gradeLocally(numberDump, calcRubric);
const workedGrade = gradeLocally(workedMath, calcRubric);

console.log("\nPoint rubric · AP Calculus FRQ 1");
console.log(`  number dump ${junkGrade.earned}/${junkGrade.possible} · worked mathematics ${workedGrade.earned}/${workedGrade.possible}`);

check(
  "numbers without setup do not earn method points",
  junkGrade.earned <= 2,
  `a number dump scored ${junkGrade.earned}/${junkGrade.possible}`,
);
check(
  "shown mathematics earns the method rows",
  workedGrade.earned === workedGrade.possible,
  `worked mathematics scored ${workedGrade.earned}/${workedGrade.possible}`,
);
check(
  "an empty response earns nothing",
  gradeLocally("I did not get to this question.", calcRubric).earned === 0,
  "a blank response earned points",
);

const features = analyzeWriting(strongEssay, { vocabulary: spellingVocabulary(), sources: litSources });
check(
  "quotation detection survives apostrophes",
  features.quotedPhrases.length >= 5,
  `found ${features.quotedPhrases.length} quotations`,
);
check(
  "British spellings are not misspellings",
  !features.mechanics.some((issue) => /dramatise|dramatize/.test(issue.message)),
  "dramatise was flagged",
);

if (failures.length) {
  console.error(`\n✗ ${failures.length} grading check${failures.length === 1 ? "" : "s"} failed:`);
  for (const failure of failures) console.error(`   · ${failure}`);
  process.exit(1);
}

console.log("\n✓ Rubric grading separates weak, middle, and strong responses, and stays honest about method points.\n");
