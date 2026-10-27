/**
 * Writing analysis for rubric-based grading.
 *
 * This module measures things that are actually on the page: sentence
 * boundaries, quotations, citations, commentary markers, hedges, numerical
 * work, and a set of named mechanics rules. Nothing here assigns a grade on its
 * own; `grade.ts` maps these measurements onto the rubric rows a reader would
 * use, and the server route can replace the mapping with a language model when
 * one is configured.
 *
 * Two design rules:
 *   - Every judgement must be explainable in one sentence, quoting the student.
 *   - Nothing may reward length. A long vague essay and a short precise one
 *     must not score the same, and the longer one must not score higher by
 *     default.
 */

export interface Sentence {
  text: string;
  /** Character offset in the original response. */
  start: number;
  /** Zero-based paragraph index. */
  paragraph: number;
  wordCount: number;
}

export interface MechanicsIssue {
  rule: string;
  message: string;
  snippet: string;
  suggestion?: string;
  severity: "error" | "warning" | "note";
}

export interface WritingFeatures {
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  averageSentenceLength: number;
  longestSentence: number;
  sentences: Sentence[];
  quotationCount: number;
  quotedPhrases: string[];
  citationCount: number;
  citationExamples: string[];
  commentaryCount: number;
  commentaryExamples: string[];
  reasoningLinks: number;
  reasoningExamples: string[];
  transitionCount: number;
  thesisSentence: string | null;
  thesisReason: string;
  hasThesis: boolean;
  counterargumentMoves: string[];
  qualificationMoves: string[];
  contextMoves: string[];
  sourcesUsed: string[];
  sourcingMoves: string[];
  specificFacts: string[];
  numberedWork: number;
  mathOperators: number;
  /** Written mathematics: equations, integrals, derivatives, limits. */
  mathExpressions: number;
  unitsFound: string[];
  justificationMoves: number;
  experimentalDesignTerms: string[];
  graphTerms: string[];
  comparisonMoves: string[];
  definitionMoves: number;
  conclusionMoves: string[];
  firstPerson: number;
  secondPerson: number;
  contractions: string[];
  cliches: string[];
  mechanics: MechanicsIssue[];
  mechanicsRate: number;
  lexicalDiversity: number;
}

const COMMENTARY_VERBS = [
  "reveals", "suggests", "illustrates", "conveys", "emphasises", "emphasizes", "implies",
  "demonstrates", "shows", "functions", "creates", "underscores", "exposes", "complicates",
  "contrasts", "reflects", "argues", "establishes", "indicates", "signals", "positions",
  "transforms", "reinforces", "undercuts", "qualifies", "frames", "constructs", "mirrors",
  "amplifies", "complicates", "subverts", "elevates", "diminishes", "enacts", "performs",
  "proves", "explains", "accounts", "results", "causes", "produces", "increases", "reduces",
];

const TRANSITIONS = [
  "however", "therefore", "moreover", "furthermore", "consequently", "similarly", "conversely",
  "in contrast", "by contrast", "nevertheless", "nonetheless", "thus", "meanwhile", "ultimately",
  "first", "second", "finally", "in addition", "as a result", "for example", "for instance",
  "on the other hand", "in particular", "specifically",
];

const CLICHES = [
  "since the dawn of time",
  "in today's society",
  "throughout history",
  "the dictionary defines",
  "webster's dictionary",
  "in conclusion, as you can see",
  "it is what it is",
  "at the end of the day",
  "only time will tell",
];

const SUBJECT_VERB_RULES: { pattern: RegExp; message: string; suggestion: string }[] = [
  { pattern: /\b(they|we|you)\s+was\b/i, message: "'they/we/you was' is not standard agreement.", suggestion: "Use 'were'." },
  { pattern: /\b(he|she|it)\s+were\b/i, message: "'he/she/it were' is not standard agreement (except in the subjunctive).", suggestion: "Use 'was'." },
  { pattern: /\bI\s+is\b/i, message: "'I is' is not standard agreement.", suggestion: "Use 'I am'." },
  { pattern: /\bthere\s+is\s+(many|several|two|three|four|five|numerous)\b/i, message: "Plural noun with 'there is'.", suggestion: "Use 'there are'." },
];

const STOP_CAPITALS = new Set([
  "The", "This", "These", "Those", "There", "Then", "Their", "They", "However", "Although", "While",
  "Because", "After", "Before", "During", "When", "Where", "Which", "What", "With", "Within",
  "In", "On", "At", "For", "From", "And", "But", "So", "Yet", "Still", "Even", "Overall", "Ultimately",
  "Finally", "First", "Second", "Third", "Next", "Also", "Thus", "Therefore", "Both", "Each",
  "Every", "Some", "Many", "Most", "One", "Two", "Three", "Document", "Source", "If", "As", "By",
  "It", "Its", "I", "His", "Her", "Our", "My", "You", "Your", "Not", "No", "Yes", "Such", "That",
]);

const WORD_CONFUSIONS: { pattern: RegExp; message: string; suggestion: string }[] = [
  { pattern: /\bcould of\b/i, message: "'could of' is a mishearing of 'could have'.", suggestion: "could have" },
  { pattern: /\bshould of\b/i, message: "'should of' is a mishearing of 'should have'.", suggestion: "should have" },
  { pattern: /\bwould of\b/i, message: "'would of' is a mishearing of 'would have'.", suggestion: "would have" },
  { pattern: /\balot\b/i, message: "'alot' is not a word.", suggestion: "a lot" },
  { pattern: /\birregardless\b/i, message: "'irregardless' is nonstandard.", suggestion: "regardless" },
  { pattern: /\bmore\s+\w+\s+then\b/i, message: "'then' used for comparison.", suggestion: "than" },
  { pattern: /\bthe affect of\b/i, message: "'affect' is the verb; the noun is 'effect'.", suggestion: "the effect of" },
  { pattern: /\bdefiantly\b(?=\s+(?:be|do|not|the)) /i, message: "'defiantly' where 'definitely' is meant.", suggestion: "definitely" },
  { pattern: /\bloose\s+(the|a|an)\b/i, message: "'loose' where 'lose' is meant.", suggestion: "lose" },
  { pattern: /\bits\s+(a|an|the|going|not|been)\b/i, message: "'its' is possessive; 'it's' means 'it is'.", suggestion: "it's" },
  { pattern: /\bit's\s+own\b/i, message: "'it's own' needs the possessive.", suggestion: "its own" },
  { pattern: /\byour\s+(welcome|going|the|a|an)\b/i, message: "'your' is possessive; 'you're' means 'you are'.", suggestion: "you're" },
  { pattern: /\bthere\s+(own|house|going)\b/i, message: "'there' is a place; 'their' is possessive.", suggestion: "their" },
  { pattern: /\btheir\s+(is|are|was|were)\b/i, message: "'their' is possessive; the sentence needs 'there'.", suggestion: "there" },
  { pattern: /\b(?:to)\s+(much|many|late|early|quick|slow|big|small|loud|quiet)\b/i, message: "'to' is a preposition; the degree word is 'too'.", suggestion: "too" },
  { pattern: /\bamount\s+of\s+(students|people|questions|essays|readers|sources)\b/i, message: "Countable nouns take 'number of', not 'amount of'.", suggestion: "number of" },
  { pattern: /\bcould\s+care\s+less\b/i, message: "The idiom is 'couldn't care less'.", suggestion: "couldn't care less" },
  { pattern: /\bfor\s+all\s+intensive\s+purposes\b/i, message: "The phrase is 'for all intents and purposes'.", suggestion: "for all intents and purposes" },
  { pattern: /\bpass\s+away\b/i, message: "'pass away' is a euphemism; AP readers expect the plain verb.", suggestion: "died" },
];

/** Split into paragraphs and sentences without a dependency. */
export function segment(text: string): { paragraphs: string[]; sentences: Sentence[] } {
  const paragraphs = text
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n|\n(?=\s*[-•\d])/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const sentences: Sentence[] = [];
  let offset = 0;
  paragraphs.forEach((paragraph, paragraphIndex) => {
    const start = text.indexOf(paragraph, offset);
    offset = start === -1 ? offset : start + paragraph.length;
    // Split on terminal punctuation followed by a space and a capital or quote,
    // while protecting common abbreviations and decimals.
    const parts = paragraph
      .replace(/\b(Mr|Mrs|Ms|Dr|St|No|vs|etc|e\.g|i\.e)\./g, "$1<dot>")
      .match(/[^.!?]+[.!?]+["'”’)]*|[^.!?]+$/g) ?? [paragraph];
    let cursor = start === -1 ? 0 : start;
    for (const part of parts) {
      const cleaned = part.replace(/<dot>/g, ".").trim();
      if (!cleaned) continue;
      const wordCount = (cleaned.match(/\S+/g) ?? []).length;
      sentences.push({ text: cleaned, start: cursor, paragraph: paragraphIndex, wordCount });
      const found = text.indexOf(cleaned, cursor);
      cursor = found === -1 ? cursor + cleaned.length : found + cleaned.length;
    }
  });

  return { paragraphs, sentences };
}

function uniqueMatch(text: string, pattern: RegExp, limit = 6): string[] {
  const found = new Set<string>();
  for (const match of text.matchAll(pattern)) {
    const value = (match[0] ?? "").trim();
    if (value) found.add(value.toLowerCase());
    if (found.size >= limit) break;
  }
  return [...found];
}

function countMatches(text: string, pattern: RegExp): number {
  let count = 0;
  for (const _ of text.matchAll(pattern)) {
    void _;
    count += 1;
  }
  return count;
}

/** Quoted fragments of two or more words are evidence, not scare quotes. */
function extractQuotations(text: string): string[] {
  const results: string[] = [];
  const patterns = [/"([^"]{3,180})"/g, /“([^”]{3,180})”/g, /'([^']{12,180})'/g];
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      const phrase = match[1].trim();
      if ((phrase.match(/\S+/g) ?? []).length >= 2) results.push(phrase);
    }
  }
  return results.slice(0, 20);
}

export function analyzeWriting(response: string, options: { vocabulary?: Set<string> } = {}): WritingFeatures {
  const text = response ?? "";
  const { paragraphs, sentences } = segment(text);
  const words = text.match(/[A-Za-z][A-Za-z'’-]*/g) ?? [];
  const lower = text.toLowerCase();
  const wordCount = (text.match(/\S+/g) ?? []).length;
  const sentenceCount = sentences.length || (text.trim() ? 1 : 0);
  const averageSentenceLength = sentenceCount ? Math.round((wordCount / sentenceCount) * 10) / 10 : 0;
  const longestSentence = sentences.reduce((max, sentence) => Math.max(max, sentence.wordCount), 0);

  const quotations = extractQuotations(text);

  const citationPatterns =
    /(lines?\s+\d+(?:\s*[-–]\s*\d+)?|page\s+\d+|paragraph\s+\d+|chapter\s+\d+|source\s+[A-F]|document\s+[A-F]|figure\s+\d+|table\s+\d+|\(\s*\d{4}\s*\)|\b\d{4}\b)/gi;
  const citationExamples = uniqueMatch(text, citationPatterns);
  const citationCount = countMatches(text, citationPatterns);

  const commentarySentences = sentences.filter((sentence) =>
    COMMENTARY_VERBS.some((verb) => new RegExp(`\\b${verb}s?\\b`, "i").test(sentence.text)),
  );
  const commentaryExamples = commentarySentences
    .slice(0, 4)
    .map((sentence) => sentence.text.slice(0, 160));

  const reasoningPattern =
    /\b(because|therefore|thus|hence|which (?:shows|means|suggests|reveals|allows|makes)|so that|as a result|in order to|consequently|this (?:shows|means|suggests|reveals))\b/gi;
  const reasoningExamples = uniqueMatch(text, reasoningPattern);
  const reasoningLinks = countMatches(text, reasoningPattern);

  const transitionCount = TRANSITIONS.reduce(
    (sum, transition) => sum + countMatches(lower, new RegExp(`\\b${transition.replace(/ /g, "\\s+")}\\b`, "g")),
    0,
  );

  const thesis = findThesis(paragraphs, sentences);

  const counterargumentMoves = uniqueMatch(
    text,
    /\b(however|although|critics?|opponents?|some (?:argue|contend|believe)|others? (?:argue|contend)|on the other hand|counterargument|objection|alternative (?:reading|interpretation|perspective)|one could argue)\b/gi,
  );
  const qualificationMoves = uniqueMatch(
    text,
    /\b(although|while|unless|except|rather than|not merely|in part|tends? to|in most cases|qualified|to some extent|not simply|neither)\b/gi,
  );
  const contextMoves = uniqueMatch(
    text,
    /\b(context|era|period|century|decade|years (?:before|after|later)|historically|after the|before the|during the|background)\b/gi,
  );

  const sourceMatches = new Set<string>();
  for (const match of text.matchAll(/\b(?:source|document)\s+([A-F])\b/gi)) {
    sourceMatches.add(match[1].toUpperCase());
  }

  // Sourcing: a sentence that both names a document and analyses who wrote it,
  // for whom, when, or why. Naming a document is not sourcing it.
  const sourcingMoves: string[] = [];
  for (const sentence of sentences) {
    const namesDocument = /\b(?:source|document|doc\.)\s+[A-F]\b/i.test(sentence.text);
    const analysesSource =
      /\b(author|writer|speaker|publisher|published|delivered|written|addressed|audience|purpose|point of view|perspective|occasion|in the (?:speech|letter|report)|as a (?:senator|president|congressman|historian|journalist|activist|slave|merchant|general))\b/i.test(
        sentence.text,
      );
    if (namesDocument && analysesSource) sourcingMoves.push(sentence.text.slice(0, 150));
  }

  // Specific outside facts: dates, statistics, and proper nouns that are not
  // sentence-initial words. Enough to tell "the North and South disagreed" from
  // "the Kansas-Nebraska Act of 1854".
  const factSet = new Set<string>();
  for (const match of text.matchAll(/\b(?:1[5-9]\d{2}|20\d{2})\b/g)) factSet.add(match[0]);
  for (const match of text.matchAll(/\b\d+(?:\.\d+)?\s?(?:%|percent|million|billion|thousand)\b/gi)) {
    factSet.add(match[0].trim());
  }
  for (const sentence of sentences) {
    const words = sentence.text.split(/\s+/).map((word) => word.replace(/^[^A-Za-z]+|[^A-Za-z'-]+$/g, ""));
    for (let index = 0; index < words.length; index += 1) {
      const word = words[index];
      if (!/^[A-Z]/.test(word) || STOP_CAPITALS.has(word)) continue;
      const next = words[index + 1] ?? "";
      // A capitalised phrase ("Kansas-Nebraska Act", "Republican Party") is a
      // named development. A single capitalised adjective ("Civil", "Northern")
      // is not, unless it is long enough to be a name in its own right
      // ("Reconstruction", "Antietam").
      if (/^[A-Z]/.test(next) && !STOP_CAPITALS.has(next)) {
        factSet.add(`${word} ${next}`);
      } else if (word.length >= 8) {
        factSet.add(word);
      }
    }
  }
  const specificFacts = [...factSet].slice(0, 12);

  const numberedWork = countMatches(text, /\b\d+(?:\.\d+)?\b/g);
  const mathOperators = countMatches(text, /(=|×|÷|∫|∑|\+|−|\/|\^|√)/g);
  // Written mathematics, not merely digits. A response that says "the answer
  // is 42" has numbers; a response that sets up work has equations. Readers
  // award the method rows for the latter, so the offline pass counts the
  // notation that actually carries an argument: an equality, an integral with
  // a differential, a derivative, or a limit.
  const equations = countMatches(text, /[A-Za-z0-9)\]}][^\n]{0,40}?=\s*[-−]?[A-Za-z0-9(∫]/g);
  const calculusNotation = countMatches(
    text,
    /(∫|\bd[A-Za-z]\s*\/\s*d[A-Za-z]\b|\bdy\/dx\b|\bdP\/dt\b|\bv\(t\)|\blim\b|\bdx\b|\bdt\b)/g,
  );
  const mathExpressions = equations + calculusNotation;
  const unitsFound = uniqueMatch(text, /\b(kg|g|mg|mL|L|km|cm|m\/s|m\/s²|kWh|MW|GW|J|kJ|N|mol|M|%|°C|ppm|ppb|tonnes?|billion|million|trillion|litres?|meters?|metres?|hours?|seconds?|years?)\b/gi, 8);
  const justificationMoves = countMatches(text, /\b(because|since|therefore|thus|as a result|which means|so that|explains?|justif(?:y|ies)|due to)\b/gi);
  const experimentalDesignTerms = uniqueMatch(
    text,
    /\b(independent variable|dependent variable|control(?:led|led)? group|control|constant|replicat\w+|sample size|treatment|hypothesis|measured|data|trial)\b/gi,
    10,
  );
  const graphTerms = uniqueMatch(
    text,
    /\b(axis|axes|label(?:led|ed)?|curve|shift(?:s|ed)?|equilibrium|aggregate demand|aggregate supply|AD|SRAS|LRAS|supply|demand|intersection|slope|intercept)\b/gi,
    10,
  );
  const comparisonMoves = uniqueMatch(
    text,
    /\b(both|unlike|similar(?:ity)?|differ(?:s|ence)?|whereas|in contrast|compared with|like .{2,30}|as (?:does|did|is))\b/gi,
  );
  const definitionMoves = countMatches(
    text,
    /\b(is|are|refers to|means|defined as|consists of|describes|describes as)\b/gi,
  );
  const conclusionMoves = uniqueMatch(
    text,
    /\b(in conclusion|ultimately|overall|therefore|this suggests|as a result|for these reasons|the result is|this reveals)\b/gi,
  );

  const firstPerson = countMatches(text, /\b(I|me|my|mine)\b/g);
  const secondPerson = countMatches(text, /\b(you|your|yours)\b/gi);
  const contractions = uniqueMatch(text, /\b\w+'(?:t|re|ve|ll|d|m|s)\b/gi, 8);
  const cliches = CLICHES.filter((cliche) => lower.includes(cliche));

  const mechanics = checkMechanics(text, sentences, paragraphs, options.vocabulary);

  const distinct = new Set(words.map((word) => word.toLowerCase()));
  const lexicalDiversity = words.length ? Math.round((distinct.size / words.length) * 100) / 100 : 0;

  return {
    wordCount,
    sentenceCount,
    paragraphCount: paragraphs.length,
    averageSentenceLength,
    longestSentence,
    sentences,
    quotationCount: quotations.length,
    quotedPhrases: quotations.slice(0, 6),
    citationCount,
    citationExamples,
    commentaryCount: commentarySentences.length,
    commentaryExamples,
    reasoningLinks,
    reasoningExamples,
    transitionCount,
    thesisSentence: thesis.sentence,
    thesisReason: thesis.reason,
    hasThesis: Boolean(thesis.sentence),
    counterargumentMoves,
    qualificationMoves,
    contextMoves,
    sourcesUsed: [...sourceMatches].sort(),
    sourcingMoves,
    specificFacts,
    numberedWork,
    mathOperators,
    mathExpressions,
    unitsFound,
    justificationMoves,
    experimentalDesignTerms,
    graphTerms,
    comparisonMoves,
    definitionMoves,
    conclusionMoves,
    firstPerson,
    secondPerson,
    contractions,
    cliches: cliches,
    mechanics,
    mechanicsRate: sentenceCount ? Math.max(0, 1 - mechanics.filter((issue) => issue.severity === "error").length / (sentenceCount * 0.75)) : 0,
    lexicalDiversity,
  };
}

/**
 * Thesis detection.
 *
 * A thesis is a sentence, in the opening or closing paragraph, that makes a
 * claim about the text or issue and could be disputed. The heuristics look for
 * claim language plus an interpretive verb or evaluative term, and reject
 * sentences that announce the essay ("In this essay I will..."), ask a
 * question, or merely describe.
 */
function findThesis(paragraphs: string[], sentences: Sentence[]): { sentence: string | null; reason: string } {
  if (!sentences.length) return { sentence: null, reason: "There is no text to analyse yet." };
  const announcement =
    /^(in this essay|this essay will|i will|i am going to|the purpose of this essay|i think|i believe|i feel|in my opinion|to me,)/i;
  const mereEvaluation =
    /\b(?:is|was)\s+(?:just\s+|really\s+|very\s+)?(?:a\s+)?(?:good|bad|great|nice|interesting|boring|sad|happy|amazing|terrible|beautiful)\s+(?:poem|book|story|play|novel|passage|essay|text)\b/i;
  const claimPhrases =
    /\b(argues?|argu(?:ment|ably)|suggests?|reveals?|demonstrates?|shows?|illustrates?|conveys?|implies|establishes?|creates?|functions? as|serves? as|is best understood|should|must|ought|reflects?|exposes?|complicates?|undermines?|challenges?|proves?|makes clear|insists?|contends?|maintains?)\b/i;
  const candidates = sentences
    .filter((sentence) => sentence.paragraph === 0 || sentence.paragraph === Math.max(0, paragraphs.length - 1))
    .filter((sentence) => sentence.wordCount >= 8 && sentence.wordCount <= 55)
    .filter((sentence) => !sentence.text.trim().endsWith("?"))
    .filter((sentence) => !announcement.test(sentence.text.trim()))
    .filter((sentence) => !mereEvaluation.test(sentence.text));

  // A thesis belongs in the first few sentences of the opening paragraph or in
  // the conclusion. A claim-signal verb buried in sentence four is usually a
  // body sentence, so it is not treated as the thesis.
  const strong = candidates.slice(0, 3).find((sentence) => claimPhrases.test(sentence.text));
  if (strong) {
    return { sentence: strong.text, reason: "A claim-bearing sentence appears near the start or end of the response." };
  }
  const fallback = candidates.find((sentence) => sentence.wordCount >= 12);
  if (fallback) {
    return {
      sentence: fallback.text,
      reason:
        "The opening or closing sentence is substantive, but it contains no explicit claim language ('argues', 'reveals', 'should'), so a reader may treat it as description.",
    };
  }
  return { sentence: null, reason: "No sentence in the opening or closing paragraph states a claim." };
}

/* ------------------------------------------------------------------ */
/* Mechanics                                                          */
/* ------------------------------------------------------------------ */

function snippetOf(text: string, index: number, length = 80): string {
  const start = Math.max(0, index - 28);
  const end = Math.min(text.length, index + length);
  return `${start > 0 ? "…" : ""}${text.slice(start, end).trim()}${end < text.length ? "…" : ""}`;
}

function editDistance(a: string, b: string, limit = 2): number {
  if (Math.abs(a.length - b.length) > limit) return limit + 1;
  const previous = new Array(b.length + 1).fill(0).map((_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let last = previous[0];
    previous[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const temp = previous[j];
      previous[j] = Math.min(
        previous[j] + 1,
        previous[j - 1] + 1,
        last + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      last = temp;
    }
  }
  return previous[b.length];
}

/**
 * A word counts as known if it is in the lexicon or is a regular inflection or
 * derivation of a word that is. Without this, every "surrendered" and
 * "poststructuralist" would be flagged, and a spell-check that cries wolf is
 * worse than none.
 */
export function isKnownForm(word: string, vocabulary: Set<string>): boolean {
  if (vocabulary.has(word)) return true;
  const suffixes = [
    "ations", "ation", "ments", "ment", "ness", "ities", "ity", "ives", "ive", "ical", "ically",
    "ing", "ings", "ed", "es", "s", "ly", "est", "er", "ers", "ion", "ions", "al", "ial", "ic",
    "ful", "less", "able", "ible", "ous", "ish", "ize", "ise", "ized", "ised", "izing", "ising",
    "ies", "y", "d",
  ];
  for (const suffix of suffixes) {
    if (!word.endsWith(suffix)) continue;
    const stem = word.slice(0, -suffix.length);
    if (stem.length < 3) continue;
    if (vocabulary.has(stem) || vocabulary.has(stem + "e") || vocabulary.has(stem + "y")) return true;
    if (stem.length >= 4 && stem[stem.length - 1] === stem[stem.length - 2] && vocabulary.has(stem.slice(0, -1))) {
      return true;
    }
  }
  const prefixes = [
    "un", "re", "in", "im", "dis", "non", "pre", "post", "over", "under", "out", "mis", "sub",
    "inter", "anti", "co", "de", "semi", "multi", "mono", "bi", "tri", "counter", "neo",
  ];
  for (const prefix of prefixes) {
    if (!word.startsWith(prefix)) continue;
    const stem = word.slice(prefix.length);
    if (stem.length >= 4 && (vocabulary.has(stem) || vocabulary.has(stem + "e"))) return true;
  }
  return false;
}

/** Damerau–Levenshtein with a cutoff, so a transposition costs one edit. */
export function damerauDistance(a: string, b: string, limit = 2): number {
  if (Math.abs(a.length - b.length) > limit) return limit + 1;
  const rows = a.length + 1;
  const cols = b.length + 1;
  const grid: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(0));
  for (let i = 0; i < rows; i += 1) grid[i][0] = i;
  for (let j = 0; j < cols; j += 1) grid[0][j] = j;
  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      grid[i][j] = Math.min(grid[i - 1][j] + 1, grid[i][j - 1] + 1, grid[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        grid[i][j] = Math.min(grid[i][j], grid[i - 2][j - 2] + 1);
      }
    }
  }
  return grid[a.length][b.length];
}

export function suggestSpelling(word: string, vocabulary: Set<string>): string | null {
  const target = word.toLowerCase();
  let best: string | null = null;
  let bestScore = Number.POSITIVE_INFINITY;
  for (const candidate of vocabulary) {
    if (Math.abs(candidate.length - target.length) > 2) continue;
    if (candidate[0] !== target[0]) continue;
    const distance = damerauDistance(target, candidate, 2);
    if (distance > 2) continue;
    // Prefer candidates that keep the same first and last letter and share a
    // long prefix: "becuase" should suggest "because", not "became".
    const sameLast = candidate[candidate.length - 1] === target[target.length - 1] ? 1 : 0;
    let shared = 0;
    while (shared < candidate.length && shared < target.length && candidate[shared] === target[shared]) shared += 1;
    const score = distance * 10 - shared - sameLast * 2;
    if (score < bestScore) {
      bestScore = score;
      best = candidate;
    }
  }
  return best;
}

function checkMechanics(
  text: string,
  sentences: Sentence[],
  paragraphs: string[],
  vocabulary?: Set<string>,
): MechanicsIssue[] {
  const issues: MechanicsIssue[] = [];

  // 1. Sentence-initial capitalisation.
  for (const sentence of sentences) {
    const trimmed = sentence.text.trim();
    if (!trimmed) continue;
    const first = trimmed[0];
    if (/[a-z]/.test(first)) {
      issues.push({
        rule: "capitalisation",
        message: "A sentence begins with a lowercase letter.",
        snippet: trimmed.slice(0, 60),
        suggestion: `Capitalise “${first.toUpperCase()}”.`,
        severity: "error",
      });
    }
  }

  // 2. Standalone lowercase 'i'.
  for (const match of text.matchAll(/(^|[^A-Za-z])i([^A-Za-z']|$)/g)) {
    issues.push({
      rule: "pronoun",
      message: "The pronoun 'I' is capitalised in English.",
      snippet: snippetOf(text, match.index ?? 0),
      suggestion: "Write 'I'.",
      severity: "error",
    });
    if (issues.length > 24) break;
  }

  // 3. Repeated words.
  for (const match of text.matchAll(/\b(\w+)\s+\1\b/gi)) {
    if (/^(that|had|is|very)$/i.test(match[1])) continue;
    issues.push({
      rule: "repetition",
      message: "The same word appears twice in a row.",
      snippet: snippetOf(text, match.index ?? 0),
      suggestion: `Delete one “${match[1]}”.`,
      severity: "error",
    });
  }

  // 4. Missing space after punctuation.
  for (const match of text.matchAll(/[,;:](?=[A-Za-z])/g)) {
    issues.push({
      rule: "spacing",
      message: "Punctuation is followed immediately by a word.",
      snippet: snippetOf(text, match.index ?? 0),
      suggestion: "Add a space after the punctuation mark.",
      severity: "warning",
    });
    if (issues.length > 30) break;
  }

  // 5. Subject–verb agreement and word confusions.
  for (const rule of SUBJECT_VERB_RULES) {
    for (const match of text.matchAll(new RegExp(rule.pattern.source, "gi"))) {
      issues.push({
        rule: "agreement",
        message: rule.message,
        snippet: snippetOf(text, match.index ?? 0),
        suggestion: rule.suggestion,
        severity: "error",
      });
    }
  }
  for (const rule of WORD_CONFUSIONS) {
    for (const match of text.matchAll(new RegExp(rule.pattern.source, "gi"))) {
      issues.push({
        rule: "word-choice",
        message: rule.message,
        snippet: snippetOf(text, match.index ?? 0),
        suggestion: `Consider “${rule.suggestion}”.`,
        severity: "error",
      });
    }
  }

  // 6. Comma splice: comma + pronoun + finite verb.
  for (const match of text.matchAll(/,\s+(?:I|he|she|it|they|we)\s+(?:is|are|was|were|has|have|had|will|would|can|could|does|do|did|\w+ed|\w+s)\b/g)) {
    const clauseStart = (match.index ?? 0) - 40;
    const clause = text.slice(Math.max(0, clauseStart), match.index ?? 0);
    if (!/\b(and|but|so|or|yet|which|because|although)\b\s*$/i.test(clause)) {
      issues.push({
        rule: "comma-splice",
        message: "Two independent clauses are joined by a comma alone.",
        snippet: snippetOf(text, match.index ?? 0),
        suggestion: "Use a semicolon, a period, or add a conjunction.",
        severity: "error",
      });
    }
  }

  // 7. Run-on sentences.
  for (const sentence of sentences) {
    if (sentence.wordCount > 55) {
      issues.push({
        rule: "run-on",
        message: `A sentence runs to ${sentence.wordCount} words; the reader loses the main clause.`,
        snippet: sentence.text.slice(0, 90),
        suggestion: "Split it at the second independent clause.",
        severity: "warning",
      });
    }
  }

  // 8. Fragment heuristic: a "sentence" with no finite verb.
  // Common irregular past forms are listed because a fragment check that flags
  // "the war made compromise impossible" is noise, not feedback.
  const finiteVerb =
    /\b(is|are|was|were|be|been|being|am|has|have|had|do|does|did|will|would|shall|should|can|could|may|might|must|seems?|appears?|becomes?|became|makes?|made|takes?|took|gives?|gave|shows?|showed|shown|means?|meant|remains?|remained|began|begun|brought|broke|brought|came|comes?|drove|drew|fell|felt|found|grew|held|kept|lost|led|left|met|paid|rose|ran|said|saw|sold|sent|set|spoke|spent|stood|taught|told|thought|understood|went|won|wrote|written|arose|arises?|resulted|reflected|represented|demonstrated|\w+ed|\w+s)\b/i;
  for (const sentence of sentences) {
    const words = sentence.wordCount;
    if (words >= 6 && words <= 40 && !finiteVerb.test(sentence.text) && !/[?!]$/.test(sentence.text)) {
      issues.push({
        rule: "fragment",
        message: "This may be a sentence fragment: no finite verb is detectable.",
        snippet: sentence.text.slice(0, 90),
        suggestion: "Add a main clause, or attach it to the previous sentence.",
        severity: "warning",
      });
    }
    if (issues.length > 40) break;
  }

  // 9. Empty paragraph-level spacing.
  if (paragraphs.length === 1 && text.length > 900) {
    issues.push({
      rule: "paragraphing",
      message: "The response is a single block of text, which makes the argument harder to follow.",
      snippet: "—",
      suggestion: "Break at each new claim.",
      severity: "warning",
    });
  }

  // 10. Spelling against the lexicon, when supplied. Reported only when a close
  // candidate exists, and inflected forms of known words are exempt.
  if (vocabulary && vocabulary.size > 100) {
    const seen = new Set<string>();
    for (const match of text.matchAll(/[A-Za-z][A-Za-z'’-]{2,}/g)) {
      const raw = match[0].replace(/[’']s$/, "");
      const word = raw.toLowerCase();
      if (seen.has(word) || isKnownForm(word, vocabulary)) continue;
      if (/^[A-Z]/.test(raw) && (match.index ?? 0) > 0) continue; // probable proper noun
      if (/[-–]/.test(word) || word.includes("'")) continue;
      seen.add(word);
      const suggestion = suggestSpelling(word, vocabulary);
      if (suggestion) {
        issues.push({
          rule: "spelling",
          message: `“${raw}” is not in the grader's 30,000-word lexicon. Check the spelling.`,
          snippet: snippetOf(text, match.index ?? 0),
          suggestion: `Did you mean “${suggestion}”?`,
          severity: "error",
        });
      }
      if (issues.length > 45) break;
    }
  }

  return issues.slice(0, 45);
}
