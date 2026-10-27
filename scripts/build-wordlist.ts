/**
 * Build the spelling vocabulary used by the offline grader.
 *
 * The lexicon combines two sources:
 *
 *   1. the site's own corpus of correct academic prose (lessons, worked
 *      examples, prompts, documentation), with single-occurrence words dropped
 *      so a typo cannot license itself; and
 *   2. the 29,000 most frequent English words from the `wordfreq` project
 *      (Speer, 2022), exported to a plain list and committed only as a spelling
 *      lexicon. Frequency data keeps ordinary student vocabulary — "imperative",
 *      "surrendered" — from being flagged as misspellings, which is the failure
 *      mode that makes spell-checks useless.
 *
 * Run with: npx tsx scripts/build-wordlist.ts
 *
 * Run with: npx tsx scripts/build-wordlist.ts
 */

import { existsSync, readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["src/content", "src/lib/data.ts", "README.md", "AI_DISCLOSURE.md"];

const BASE_WORDS = `the of and to in a is that it for as with was on be by this are or from at not have an
but they you we he she his her their its which can will would could should may might must do does did
been being has had having were if then than so because while although when where why how who whom whose
what there here these those such more most much many few some any all each every both either neither
one two three four five six seven eight nine ten first second third last next other another same own
about above across after again against almost alone along already also always among around before behind
below beneath beside between beyond during except inside into near off onto out outside over past since
through throughout toward under until up upon within without yes no nor yet still even ever never often
sometimes usually rather quite very too just only also however therefore thus hence moreover furthermore
consequently nevertheless nonetheless meanwhile instead indeed perhaps arguably ultimately overall
student students teacher teachers exam exams answer answers question questions evidence claim claims
argument arguments thesis paragraph paragraphs sentence sentences reading passage passages poem poems
poetry prose drama character speaker narrator audience author reader meaning analysis analyze analyse
write writing written reader readers text texts literary literature language rhetorical rhetoric
support supports supported develop develops developed explain explains explained describe describes
identify identifies compare comparison contrast evaluate justify prediction calculate calculation
data graph table figure study studies research experiment design method analysis result results
sample population variable variables control treatment measure measured increase decrease rate
energy water carbon population species ecosystem climate change policy government court case law
function derivative integral limit rate area volume slope equation value values score points point
correct incorrect option choice response essay response prompt rubric section minutes answer year
history historical economic market price cost benefit risk social political culture system process
structure form pattern effect effects cause causes reason reasons example examples detail details
specific general clear clearly strong stronger precise precisely complex nuance qualified
my me mine our ours your yours him his hers them themselves myself yourself itself ourselves
don't doesn't didn't isn't aren't wasn't weren't can't cannot won't wouldn't shouldn't couldn't
it's that's there's here's what's who's let's i'm you're we're they're i've we've you've they've
zeugma synecdoche metonymy chiasmus asyndeton polysyndeton epistrophe anaphora anadiplosis
antimetabole litotes meiosis bathos ethos pathos logos kairos exigence bildungsroman denouement
verisimilitude enjambment caesura scansion iamb trochee anapest dactyl spondee quatrain sestet
octave couplet villanelle pantoum terza rima volta conceit apostrophe juxtaposition motif
subjunctive nominative accusative participle gerund infinitive appositive clause subordinate
independent dependent predicate modifier antecedent pronoun conjunction preposition interjection
alliteration assonance consonance onomatopoeia hyperbole understatement paradox oxymoron
personification imagery symbolism allegory allusion ambiguity irony satire parody elegy ode
sonnet ballad limerick haiku epic tragedy comedy farce soliloquy monologue aside tableau
hamartia catharsis hubris peripeteia anagnorisis stichomythia`
  .split(/\s+/)
  .map((word) => word.trim().toLowerCase())
  .filter(Boolean);

function collectFiles(target: string): string[] {
  const stats = statSync(target, { throwIfNoEntry: false });
  if (!stats) return [];
  if (stats.isFile()) return [target];
  return readdirSync(target).flatMap((entry) => collectFiles(join(target, entry)));
}

const counts = new Map<string, number>();
for (const file of ROOTS.flatMap(collectFiles)) {
  if (!/\.(ts|tsx|md|json)$/.test(file)) continue;
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(/[A-Za-z][A-Za-z'’-]{2,}/g)) {
    const word = match[0].toLowerCase().replace(/[’']s$/, "");
    if (word.length < 3 || word.length > 22) continue;
    if (/^\d/.test(word)) continue;
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
}

const FREQUENCY_LIST = "/tmp/wf-words.txt";

const vocabulary = new Set<string>(BASE_WORDS);
if (existsSync(FREQUENCY_LIST)) {
  for (const word of readFileSync(FREQUENCY_LIST, "utf8").split("\n")) {
    const trimmed = word.trim();
    if (trimmed.length >= 2) vocabulary.add(trimmed);
  }
} else {
  console.warn("No frequency list found at /tmp/wf-words.txt; corpus-only lexicon.");
}
for (const [word, count] of counts) {
  if (count < 3) continue;
  if (!/[aeiouy]/.test(word)) continue;
  vocabulary.add(word);
}
// Inflections are handled by stemming in the analyzer rather than by listing
// every form here, which keeps this module small enough to send to a browser.

// Words that appear in the corpus or in subtitle-derived frequency data as
// typos must never license themselves.
const STOP = new Set([
  "alot", "thier", "becuase", "recieve", "recieved", "seperate", "separate", "definately",
  "occured", "untill", "wich", "teh", "adn", "waht", "existance", "persistant", "neccessary",
  "accomodate", "arguement", "enviroment", "goverment", "independant", "publically", "succesful",
]);
for (const word of STOP) vocabulary.delete(word);

const words = [...vocabulary].sort();
const payload = words.join(" ");
const output = `/**
 * Spelling vocabulary for the offline grader.
 *
 * Generated by scripts/build-wordlist.ts from the site's own teaching corpus
 * (lessons, prompts, and documentation) plus the most frequent English words
 * from the wordfreq project. ${words.length.toLocaleString()} words.
 *
 * Do not edit by hand; rerun the script after adding content.
 */

export const SPELLING_WORDS = ${JSON.stringify(payload)};

let cached: Set<string> | null = null;

export function spellingVocabulary(): Set<string> {
  if (!cached) cached = new Set(SPELLING_WORDS.split(" "));
  return cached;
}
`;

writeFileSync("src/lib/grading/wordlist.ts", output);
console.log(`${words.length.toLocaleString()} words written to src/lib/grading/wordlist.ts`);
console.log(`${Math.round(output.length / 1024)} KB`);
