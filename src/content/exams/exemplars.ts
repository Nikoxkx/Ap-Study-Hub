import type { SubjectSlug } from "@/lib/subjects";
import { apLitFrqs } from "./apLit";
import { authoredFrqs } from "./authored";

/**
 * Full-credit exemplars.
 *
 * For every written task in every course there is a complete response that
 * would earn every point on the official rubric, and a row-by-row account of
 * where each point comes from — the sentence that earns it, and the reason a
 * reader awards it. Nothing here is a summary or an outline: these are the
 * responses a strong student would actually hand in, written to the published
 * word and time limits.
 *
 * The breakdowns quote the exemplar itself, so a student can move between the
 * rubric and the sentence doing the work.
 */

export interface ExemplarPoint {
  /** Rubric row this point belongs to, matching the rubric's row label. */
  row: string;
  /** Points this row is worth in the exemplar. */
  earned: string;
  /** The exact words in the response that earn it. */
  evidence: string;
  /** Why a reader awards the point — the reasoning, not a restatement. */
  why: string;
}

export interface Exemplar {
  /** The task this responds to. */
  frqId: string;
  courseSlug: SubjectSlug;
  /** What kind of artefact this is. */
  kind: "essay" | "short-answer" | "paper" | "performance-task";
  /** Shown above the response, e.g. "Poetry analysis · Q1". */
  label: string;
  /** One line naming the task. */
  title: string;
  /** Total at stake, written the way a score report writes it. */
  score: string;
  /** What to notice before reading the response. */
  framing: string;
  /** Response body, split into labelled sections. */
  sections: { heading?: string; paragraphs: string[] }[];
  /** Row-by-row accounting of the score. */
  breakdown: ExemplarPoint[];
  /** Moves a reader rewards, in plain language. */
  craft: string[];
  /** The mistakes this exemplar deliberately avoids. */
  avoids: string[];
  /** Roughly how long the response is and how long it should take. */
  scale: string;
  /** Printed prompt, when the task predates the authored prompt registry. */
  promptOverride?: string;
}

const AP_LIT: Exemplar[] = [
  {
    frqId: "ap-lit-poetry",
    courseSlug: "ap-lit",
    kind: "essay",
    label: "Question 1 · Poetry analysis",
    title: "Christina Rossetti, “Remember” — how a farewell becomes a permission",
    score: "6 / 6",
    framing:
      "The prompt asks about a “complex attitude”. The easy essay says the speaker is sad. This one says the speaker is arguing with herself, and that the sonnet's turn is where the argument changes sides — which is why every body paragraph is built on a before-and-after, not on a device list.",
    sections: [
      {
        paragraphs: [
          "Christina Rossetti's “Remember” is usually read as a plea, and the poem does begin as one: an imperative, repeated, that asks a beloved to hold on. But the sonnet's real subject is the moment the speaker stops asking. By moving from the octave's insistence to the sestet's release, and by turning the verb “remember” from a demand into a permission, Rossetti dramatises a speaker who talks herself out of the consolation she begins by demanding. The poem's complex attitude toward being remembered is therefore not grief but renunciation: she discovers that being remembered well may mean being forgotten kindly.",
          "The first eight lines establish the demand, and the point of view is what makes it feel like a burden rather than a comfort. The speaker never says “I want”; she issues four imperatives — “Remember me when I am gone away,” “Remember me when no more day by day” — and the repetition places the obligation entirely on the person addressed. “Gone far away into the silent land” uses the abstraction of the silent land rather than any specific heaven or grave, so the place she is going is defined only by its lack of speech: it is a country where “It will be late to counsel then or pray.” That clause is quietly devastating, because it tells us the speaker knows that by the time she is remembered she will be unable to advise anyone. The imperative form is not tyrannical, then; it is the last authority available to someone who is losing all the others.",
          "What complicates the plea is that it is already half-conceded. “Nor I half turn to go yet turning stay” is the poem's most physical detail, and its ambiguity is deliberate: the speaker is at once leaving and lingering, and the line's two halves enact that hesitation in its syntax. Rossetti also refuses sentimentality in her diction. “Darkness and corruption” is blunt, almost theological language, and it refuses to soften death into sleep. Because the poem is so unsentimental about what is coming, the request in the octave does not read as self-pity; it reads as bargaining by someone who has already accepted the terms.",
          "The turn at “Yet if you should forget me for a while” is where the argument reverses, and the reversal is grammatical before it is emotional. The word “Yet” cancels the octave, and the poem moves from imperative to conditional — from “Remember me” to “if you should forget”. The speaker then supplies the release she has spent eight lines refusing: “do not grieve.” The final couplet makes the reversal explicit, preferring the beloved's smile to her own memorial: “Better by far you should forget and smile / Than that you should remember and be sad.” The comparative “better by far” is the poem's true thesis, and it is an argument, not a feeling — it weighs two futures and chooses the one in which the speaker is lost.",
          "Read this way, the poem does not resolve its attitude so much as expose the cost of resolving it. The speaker's generosity is real, but it is also a way of controlling what she cannot control: having failed to secure memory by command, she secures it by renouncing the demand. A reader might object that this makes her selfless when she is merely managing her own fear, and the poem supports that objection, because the tenderness of the sestet only exists because the octave's fear was so insistent. Rossetti's achievement is that “Remember” ends up being about the difficulty of loving someone more than you love being loved — and it makes that difficulty audible in a single, repeated verb.",
        ],
      },
    ],
    breakdown: [
      {
        row: "Thesis",
        earned: "1 / 1",
        evidence:
          "“The poem's complex attitude toward being remembered is therefore not grief but renunciation: she discovers that being remembered well may mean being forgotten kindly.”",
        why: "It answers the prompt's actual question (the attitude is complex) and commits to an interpretation that could be argued against — a reader could claim the speaker never accepts forgetting. It names the mechanism (the turn from demand to permission) in the same sentence, so the essay's structure is visible from the start.",
      },
      {
        row: "Evidence and Commentary",
        earned: "4 / 4",
        evidence:
          "“she issues four imperatives — ‘Remember me when I am gone away,’ ‘Remember me when no more day by day’ — and the repetition places the obligation entirely on the person addressed… The imperative form is not tyrannical, then; it is the last authority available to someone who is losing all the others.”",
        why: "Four paragraphs each make one claim, quote briefly, then spend two or more sentences explaining how the quoted words produce the effect. Evidence is embedded in the writer's own syntax instead of dropped in, and each paragraph carries a causal link (“because”, “so”, “then”) that advances the line of reasoning rather than restating it. The turn paragraph explains a grammatical shift, not just a mood shift.",
      },
      {
        row: "Sophistication",
        earned: "1 / 1",
        evidence:
          "“A reader might object that this makes her selfless when she is merely managing her own fear, and the poem supports that objection, because the tenderness of the sestet only exists because the octave's fear was so insistent.”",
        why: "It raises a genuine alternative reading and then uses it, rather than mentioning and dismissing it. The final sentence reframes the whole poem — love versus being loved — which is the kind of interpretive move the sophistication point exists to reward.",
      },
    ],
    craft: [
      "Read the poem twice before writing: first for what happens, second for the one word that repeats.",
      "Build each body paragraph on a before/after pair (“the octave does X; the sestet does Y”), so commentary has somewhere to go.",
      "Quote four to eight words, embedded in your own sentence, and cite the line.",
      "Spend two sentences of commentary for every one sentence of evidence.",
      "Save a paragraph for the objection a sceptical reader would raise, then answer it.",
    ],
    avoids: [
      "Naming a device without saying what it does (“Rossetti uses imagery to convey emotion”).",
      "Retelling the poem in the first paragraph instead of making a claim.",
      "Treating the volta as decoration rather than as the argument's hinge.",
      "Closing by restating the thesis instead of sharpening it.",
    ],
    scale: "About 620 words — the length a handwritten 40-minute response runs to.",
  },
  {
    frqId: "ap-lit-prose",
    courseSlug: "ap-lit",
    kind: "essay",
    label: "Question 2 · Prose fiction analysis",
    title: "Charlotte Perkins Gilman, “The Yellow Wallpaper” — a voice that confesses by explaining",
    score: "6 / 6",
    framing:
      "The passage is a first-person diary written by a woman being treated for “nerves”. The trap is to write about madness in general. This exemplar stays inside the sentence-level evidence: the pronouns, the repetition, and the way the narrator's reasonable tone is itself the symptom.",
    sections: [
      {
        paragraphs: [
          "The opening of “The Yellow Wallpaper” sounds like the beginning of a sensible memoir: a woman records a summer house, her husband's judgement, her own doubts. That tone is the story's central technique. Gilman gives the narrator a confiding, orderly voice and then lets us hear the effort it takes to keep it orderly, so that the narrator's relation to the authority around her is revealed less by what she says about John than by the way she says anything at all. The diary is at once an act of obedience and the only space in which she is not obedient.",
          "The narrative voice is intimate and unaddressed, which is precisely what makes it a confession. The narrator writes in the present tense and in the first person, and she keeps breaking off to reassure an imagined listener: “John is a physician, and perhaps — (I would not say it to a living soul, of course, but this is dead paper and a great relief to my mind —) perhaps that is one reason I do not get well faster.” The parenthesis is the key structural move of the passage. In it, the narrator admits that she is writing what she cannot speak, and the phrase “dead paper” tells us she understands the difference between paper and a person. Yet even inside the parenthesis she hedges with “perhaps”, bargaining with an authority she has already internalised.",
          "Repetition does the same work at the level of grammar. “Personally” recurs — “Personally, I disagree with their ideas”, “personally, I believe” — as though stating a preference were a position she must keep re-establishing. More telling is her use of “one”: “what is one to do?” The pronoun removes her from her own sentence. A woman who says “one” instead of “I” when describing her own obedience has already accepted the medical verdict that her feelings are not data. Because the narrator's grammar keeps dissolving her agency, the reader registers the pressure of authority without the narrator ever naming it directly.",
          "The imagery works the same way, turning the house into a diagnosis. She calls it “a colonial mansion, a hereditary estate” and then corrects herself: “I would say a haunted house.” The hesitation between the two descriptions is the passage in miniature; the respectable word is offered first, and the true one slips out after it. The house “is let so cheaply” and “has stood so long untenanted”, and those commercial details do not merely set a gothic scene — they establish that everything in this world, including her rest cure, is a transaction someone else has arranged. “There is something queer about it” is the narrator's most direct statement of unease, and the adjective is deliberately vague, because a woman in her position cannot afford a more precise word.",
          "Gilman's craft is that she never lets the narrator sound mad, only managed. The final impression is of a mind circling an authority that it can describe but not confront: John's “high standing” is asserted so often that it becomes a wall. That irony is the story's argument. Because the diary must perform sanity in order to be written at all, the passage becomes both a symptom of the rest cure and the only protest available inside it — and the reader, not the narrator, is left to say the thing that cannot be said aloud.",
        ],
      },
    ],
    breakdown: [
      {
        row: "Thesis",
        earned: "1 / 1",
        evidence:
          "“Gilman gives the narrator a confiding, orderly voice and then lets us hear the effort it takes to keep it orderly… The diary is at once an act of obedience and the only space in which she is not obedient.”",
        why: "It makes a claim about technique and meaning together, and the paradox in the second sentence is arguable — nothing in the passage literally says the diary is disobedience. It also tells the reader exactly what the three body paragraphs will prove.",
      },
      {
        row: "Evidence and Commentary",
        earned: "4 / 4",
        evidence:
          "“The parenthesis is the key structural move of the passage. In it, the narrator admits that she is writing what she cannot speak… Yet even inside the parenthesis she hedges with ‘perhaps’, bargaining with an authority she has already internalised.”",
        why: "Quotation is short, embedded and cited to a specific textual feature (a parenthesis). The commentary explains function twice — what the parenthesis admits and what the hedge inside it concedes — so the paragraph reasons rather than lists. The pronoun paragraph does the same for grammar, and the imagery paragraph for diction, giving three different scales of evidence for one claim.",
      },
      {
        row: "Sophistication",
        earned: "1 / 1",
        evidence:
          "“Because the diary must perform sanity in order to be written at all, the passage becomes both a symptom of the rest cure and the only protest available inside it.”",
        why: "It resolves the essay's tension instead of restating it, and it produces a reading of the whole story from the passage's form. This is the move that separates a 5 from a 6.",
      },
    ],
    craft: [
      "Choose textual features that are visible on the page — a parenthesis, a pronoun, an adjective — not broad categories like “imagery”.",
      "Explain each quotation twice: what it shows, then what that admission costs the speaker.",
      "Keep the narrator's tone part of the evidence; how something is said is analysable data.",
      "Use one paragraph per scale of evidence: voice, grammar, image.",
      "Let the last paragraph state the argument the passage makes, not the argument you made.",
    ],
    avoids: [
      "Diagnosing the narrator (“she is clearly insane”) instead of analysing the prose.",
      "Summarising the plot of the story you already know from elsewhere.",
      "Quoting whole sentences and then paraphrasing them as commentary.",
      "Claiming Gilman “uses imagery to show oppression” without showing which image and how.",
    ],
    scale: "About 640 words — a full 40-minute response.",
  },
  {
    frqId: "ap-lit-argument",
    courseSlug: "ap-lit",
    kind: "essay",
    label: "Question 3 · Literary argument",
    title: "Hamlet — the truth a court agrees not to know",
    score: "6 / 6",
    framing:
      "Question 3 rewards a work you know cold and a claim that costs something. This response takes Hamlet, keeps plot summary to two sentences, and spends its length on how the concealment shapes the play's language and its ending.",
    sections: [
      {
        paragraphs: [
          "In Shakespeare's Hamlet, the prince learns from his father's ghost that Claudius murdered him, and then discovers that knowing is not the same as being able to say. Every courtier around him has an interest in not acknowledging the killing, and the play is built out of that refusal: Hamlet carries a truth that the state has agreed not to know. His relation to that unacknowledged truth is what shapes the tragedy, because it turns a revenge plot into a study of a man who can only speak sideways — in riddles, in plays, in soliloquies addressed to no one who can answer — until the truth finally arrives as a body count rather than a confession.",
          "The concealment begins as political necessity and becomes a habit of mind. Hamlet's first response to the ghost is to swear his companions to silence, and he immediately adopts an “antic disposition” that gives him a licence to say true things in forms no one must take seriously. When Polonius asks what he is reading, Hamlet answers “Words, words, words” — a joke that is also a thesis about Elsinore, where language has been emptied of obligation. Because the truth cannot be stated plainly, Hamlet's speech becomes the only place it can live, which is why the soliloquies are urgent and the public dialogue is riddled with performance.",
          "The play-within-the-play is the clearest evidence that the concealment, not the murder, is Hamlet's real problem. “The Mousetrap” is an attempt to force acknowledgement without accusation: he stages a murder and watches Claudius's face for the confession the court will not permit in words. When Claudius rises and calls for lights, Hamlet has proof and still cannot use it, because a reaction is not a statement. The scene demonstrates the play's central insight — that a truth everyone privately holds can remain publicly unsaid, and that the person who needs it said is isolated by the very knowledge he possesses.",
          "The cost of that isolation is visible in the two characters who love him. Ophelia is destroyed by a conversation she cannot enter; Hamlet's cruelty to her is the cruelty of a man who cannot explain himself without naming the king. Gertrude, meanwhile, is asked to look at a portrait and compare “the counterfeit presentment of two brothers”, and her failure to answer is the moment the play makes the concealment domestic as well as political. Both women are harmed not by ignorance but by being kept at the edge of a truth that the men around them handle as a weapon. This is the argument Claudius cannot escape either: he admits in soliloquy that his offence “smells to heaven”, yet he keeps the language of kingship intact, and the gap between his prayer and his intent is the play's proof that concealment corrupts the concealer most of all.",
          "By the final act, the truth can only be delivered in the only syntax left available: the poisoned rapier, the swapped cup, the dying exchange of forgiveness. Hamlet does finally speak — he names Claudius and stabs him — but he does it in the last thirty lines of the play, after almost everyone who could have heard the truth is dead. Shakespeare's design is exact: the court that agreed not to know the murder ends by being unable to know anything, ruled instead by Fortinbras, a stranger who has no stake in the secret. Hamlet therefore argues that a truth a community refuses to acknowledge does not disappear; it accumulates interest, and it is finally paid in the currency of the whole house. What makes the play tragic is that its hero is destroyed not by ignorance but by knowing too early and being believed too late.",
        ],
      },
    ],
    breakdown: [
      {
        row: "Thesis",
        earned: "1 / 1",
        evidence:
          "“His relation to that unacknowledged truth is what shapes the tragedy, because it turns a revenge plot into a study of a man who can only speak sideways… until the truth finally arrives as a body count rather than a confession.”",
        why: "It names the work, answers the prompt's question about the character's relation to the truth, and makes a claim about the whole play's meaning rather than about one scene. The phrase “rather than a confession” is a judgement a reader could dispute, which is what makes it a thesis.",
      },
      {
        row: "Evidence and Commentary",
        earned: "4 / 4",
        evidence:
          "“When Polonius asks what he is reading, Hamlet answers ‘Words, words, words’ — a joke that is also a thesis about Elsinore, where language has been emptied of obligation… which is why the soliloquies are urgent and the public dialogue is riddled with performance.”",
        why: "Specific, brief, accurate quotation from the play, followed by commentary that connects the line to the whole-work argument. Five paragraphs each advance a stage of the reasoning (the vow, the play, the women, the king, the ending), so the line of reasoning is continuous rather than a set of examples.",
      },
      {
        row: "Sophistication",
        earned: "1 / 1",
        evidence:
          "“What makes the play tragic is that its hero is destroyed not by ignorance but by knowing too early and being believed too late.”",
        why: "It reframes the tragedy in a way that competes with the standard reading of Hamlet as a procrastinator, and the essay has already earned the right to it by tracing the concealment through four scenes. That is a complication of the work's meaning, which is exactly what the row asks for.",
      },
    ],
    craft: [
      "Choose a work you can quote accurately from memory, and name it in the first sentence.",
      "Keep plot to two sentences; the rest is analysis of how the concealment shapes language and structure.",
      "Anchor each body paragraph in one scene you know line by line.",
      "Show the cost of the truth to someone other than the protagonist — that is where whole-work meaning lives.",
      "End on the design of the ending rather than a moral lesson.",
    ],
    avoids: [
      "Retelling the plot for four paragraphs.",
      "Choosing a work that only loosely fits the prompt and forcing the fit.",
      "Quoting a line you half-remember; approximate quotation is penalised.",
      "Ignoring the second half of the prompt — how the truth contributes to the meaning of the whole work.",
    ],
    scale: "About 680 words — a full 40-minute response.",
  },
];

/** Marked-essay shape the reader component already renders. */
export interface ExemplarEssay {
  id: string;
  title: string;
  type: string;
  prompt: string;
  sampleEssay: string;
  score: number;
  rubricBreakdown: { category: string; points: number; maxPoints: number; explanation: string }[];
}

function numberOf(value: string): number {
  const match = /(\d+)/.exec(value);
  return match ? Number.parseInt(match[1], 10) : 0;
}

/** The prompt as printed, taken from the task itself so it can never drift. */
function promptFor(exemplar: Exemplar): string {
  const frq = [...apLitFrqs, ...authoredFrqs].find((item) => item.id === exemplar.frqId);
  return frq?.prompt ?? exemplar.promptOverride ?? "";
}

function toEssay(exemplar: Exemplar): ExemplarEssay {
  return {
    id: `exemplar-${exemplar.frqId}`,
    title: exemplar.title,
    type: `${exemplar.label} · ${exemplar.score}`,
    prompt: promptFor(exemplar),
    sampleEssay: exemplar.sections
      .flatMap((section) => (section.heading ? [`${section.heading}.`, ...section.paragraphs] : section.paragraphs))
      .join("\n\n"),
    score: numberOf(exemplar.score),
    rubricBreakdown: exemplar.breakdown.map((point) => ({
      category: point.row,
      points: numberOf(point.earned),
      maxPoints: Number.parseInt(point.earned.split("/")[1] ?? "0", 10) || numberOf(point.earned),
      explanation: `${point.why} The words doing the work: “${point.evidence}”`,
    })),
  };
}

const AP_LANG: Exemplar[] = [
  {
    frqId: "ap-lang-synthesis",
    courseSlug: "ap-lang",
    kind: "essay",
    label: "Question 1 · Synthesis",
    title: "Public libraries — a position that uses the sources instead of counting them",
    score: "6 / 6",
    framing:
      "The synthesis row is not “how many sources did you name” but “does each source change what your argument has to say”. This essay takes one clear position, then lets the sources constrain and qualify it — including the two that disagree.",
    sections: [
      {
        paragraphs: [
          "Public libraries should not be asked to prove their relevance by becoming something else. The evidence in these sources points to a narrower and more defensible claim: libraries remain essential precisely because they are the only civic institution that combines free access, trained staff, and physical space, and the communities that lost them paid for it. The right reform is therefore not reinvention but investment in the hybrid role libraries already perform — physical sanctuary plus digital access — funded at a level that stops treating the second as a substitute for the first.",
          "Source A establishes that the demand is real rather than nostalgic: a majority of Americans used a public library in the past year, and the fastest-growing use is not borrowed print but computers, wifi, and job-search help. That detail matters because it reframes the budget argument. If libraries were merely warehouses for books, Source C's figure — 2.3% of a municipal budget for 180,000 residents — would be a plausible place to cut. Read alongside Source A, the same line item looks like the cheapest public computing infrastructure a city owns. Source C's own denominator, a cost per resident of roughly twenty-three dollars a year, is the strongest argument its author did not make.",
          "The objections deserve a real answer, not a dismissal. Source F argues that e-books are cheaper and always available, so physical branches are sentiment. The claim is half right and its conclusion does not follow. Digital distribution is cheaper per title, but it does not supply the thing Source D describes: a child doing homework at a table for three hours while a parent works an evening shift, or an adult using a printer, a proctor, and a librarian in the same afternoon. Source E gives that anecdote a population-scale shape. Communities that closed branches between 2008 and 2018 saw measurable declines in precisely the outcomes the closures were supposed to improve elsewhere — a finding that makes closure a cost, not a saving. Source B supplies the historical frame that resolves the apparent conflict: libraries have absorbed every previous media shift, from scrolls to microfilm to internet terminals, by adding rather than replacing, and the branch that survives is the one that keeps adding.",
          "That synthesis yields a specific position. Cities should protect branch hours and staffing, treat digital services as an addition funded on top of the physical footprint rather than as a justification for shrinking it, and measure success by use — sessions, referrals, programs — rather than by circulation alone, since circulation is exactly the metric that makes a modern library look obsolete. The strongest counterargument is that this is a wish list attached to a fixed budget, and Source C's author would rightly ask what gets cut instead. The honest answer is that the comparison is not library versus nothing; it is library versus emergency room, unemployment office, and after-school program, all of which Source D's testimony shows the branch is quietly absorbing. A city that closes the branch has not saved twenty-three dollars per resident. It has moved the cost somewhere less visible.",
        ],
      },
    ],
    breakdown: [
      {
        row: "Thesis",
        earned: "1 / 1",
        evidence:
          "“The right reform is therefore not reinvention but investment in the hybrid role libraries already perform — physical sanctuary plus digital access — funded at a level that stops treating the second as a substitute for the first.”",
        why: "It takes a position on the exact question asked (how should libraries evolve), it is specific enough to be argued against, and it arrives in the first paragraph rather than after two paragraphs of summary.",
      },
      {
        row: "Evidence and Commentary",
        earned: "4 / 4",
        evidence:
          "“Source C's own denominator, a cost per resident of roughly twenty-three dollars a year, is the strongest argument its author did not make.”",
        why: "Each source is used to do work inside the argument rather than to show coverage: A reframes C, E converts D's anecdote into a population claim, B resolves the conflict with F. The essay also cites by letter so the reader can check every use, and commentary consistently explains why the evidence supports the claim.",
      },
      {
        row: "Sophistication",
        earned: "1 / 1",
        evidence:
          "“The honest answer is that the comparison is not library versus nothing; it is library versus emergency room, unemployment office, and after-school program, all of which Source D's testimony shows the branch is quietly absorbing.”",
        why: "It concedes the strongest objection (a fixed budget), then reframes the trade-off instead of ignoring it. That move — taking the opposing source seriously enough to use it — is what the sophistication row rewards.",
      },
    ],
    craft: [
      "Write the thesis before you read all the sources, then revise it once the sources complicate it.",
      "Use each source for a different job: one to establish, one to reframe, one to object.",
      "Attribute by letter every time, even when paraphrasing.",
      "Convert one anecdotal source into a structural claim; that is usually where the sophistication point lives.",
      "Answer the objection you find most persuasive, not the weakest one.",
    ],
    avoids: [
      "“Source A says… Source B says… Source C says…” as three paragraphs of summary.",
      "Ignoring the sources that disagree with the thesis.",
      "A thesis that could have been written without reading any of the sources.",
      "Ending with a restatement instead of a consequence.",
    ],
    scale: "About 640 words — a full 45-minute synthesis response.",
  },
  {
    frqId: "ap-lang-rhetorical",
    courseSlug: "ap-lang",
    kind: "essay",
    label: "Question 2 · Rhetorical analysis",
    title: "A climate address — analysing how urgency is built, not just announced",
    score: "6 / 6",
    framing:
      "The passage opens with a hinge metaphor. A weak essay says the speaker “uses imagery to create urgency”. This one tracks how the address moves from shared history to shared risk to a specific ask, and shows the syntax doing the persuading.",
    sections: [
      {
        paragraphs: [
          "The address does not begin by demanding action; it begins by placing its audience inside a story they already share. “We stand at a hinge point in human history” borrows the authority of a historical survey and converts it into a decision point, and everything that follows depends on that reframing: a listener who accepts the metaphor of the hinge has already accepted that this moment is different in kind from the ones before it. The speech's persuasive work is therefore cumulative rather than declarative, moving from a collective past, to a conditional future, to a concrete request, and it builds its authority by making the audience co-authors of each step.",
          "The first movement earns trust by conceding what the audience already knows. The speaker specifies “ten thousand years of relative climate stability — the entire span of human civilization”, a sentence built on an em dash that pauses to define its own terms. That parenthesis is a rhetorical choice, not a stylistic tic: it treats the audience as capable of handling scale, and it delays the alarming clause that follows (“Ahead of us… well, that depends”). The hesitation marked by the ellipsis and the informal “well” is equally deliberate. It performs the speaker's own uncertainty, which makes the confidence of the next paragraph feel earned rather than performed.",
          "Urgency is then produced syntactically. The address shifts from first-person plural description to second-person address, and the sentences shorten as the stakes rise, so the audience feels the argument accelerating. Where the opening allowed a long subordinate clause and a definitional aside, the later paragraphs use short declaratives and repeated openings — the structure of a list delivered aloud, which is how a speaker makes a listener anticipate the next item. Because the syntax contracts as the content darkens, the form enacts the narrowing of options the speech describes: the audience experiences less room to manoeuvre at exactly the moment the speaker claims there is less room.",
          "The address also manages blame with unusual care. Rather than accusing its audience, it distributes responsibility across generations and then concentrates it in a single moment of choice, which is a way of converting guilt into agency. This is where the rhetoric is most strategic: a listener who feels accused defends, but a listener who feels entrusted acts. The final request is correspondingly modest and specific, which is the classic close after a large opening — the speech expands the frame to the scale of civilisation, then asks for something the audience can do this week. That disproportion is the technique. It makes the small action feel like the hinge the opening promised.",
          "None of this is dishonest, but it is worth naming what the address declines to do. It never quantifies a cost, never names an opponent, and never lets the audience sit with the possibility that the hinge has already turned. Those omissions are the limits of its appeal to reason, and they are also why it works: the speech persuades by controlling the emotional temperature of the room, moving from reassurance to urgency to a specific and manageable ask, and it trusts syntax to do the work that statistics would do in a policy paper. A reader who can describe that sequence — concession, contraction, entrustment — can write about any speech on the exam.",
        ],
      },
    ],
    breakdown: [
      {
        row: "Thesis",
        earned: "1 / 1",
        evidence:
          "“The speech's persuasive work is therefore cumulative rather than declarative, moving from a collective past, to a conditional future, to a concrete request, and it builds its authority by making the audience co-authors of each step.”",
        why: "It analyses the writer's choices (cumulative structure, co-authorship) rather than summarising the passage or listing devices, and it commits to a claim about how the effect is produced.",
      },
      {
        row: "Evidence and Commentary",
        earned: "4 / 4",
        evidence:
          "“Where the opening allowed a long subordinate clause and a definitional aside, the later paragraphs use short declaratives and repeated openings — the structure of a list delivered aloud… Because the syntax contracts as the content darkens, the form enacts the narrowing of options the speech describes.”",
        why: "The paragraph quotes precisely (the em dash, the ellipsis, “well”), names the technique at the level of syntax, then explains the effect twice: on the listener's experience and on the speech's argument. Four paragraphs cover four different scales of choice — metaphor, concession, syntax, blame — and each advances the same line of reasoning.",
      },
      {
        row: "Sophistication",
        earned: "1 / 1",
        evidence:
          "“Those omissions are the limits of its appeal to reason, and they are also why it works… it trusts syntax to do the work that statistics would do in a policy paper.”",
        why: "It names what the speech deliberately does not do and treats that as a strength and a limit at once — a complication rather than a verdict. The closing sentence converts the analysis into a transferable method.",
      },
    ],
    craft: [
      "Identify the movement of the passage (concession → escalation → request) before naming any device.",
      "Quote the punctuation when the punctuation is doing rhetorical work — dashes, ellipses, semicolons.",
      "Explain each choice twice: what the audience feels, and what the argument gains.",
      "Analyse one deliberate omission; restraint is a rhetorical choice too.",
      "Keep the writer as the agent of every sentence: “the address shifts…”, not “the tone shifts…”.",
    ],
    avoids: [
      "A device hunt (“the author uses pathos, logos, and ethos”).",
      "Quoting a whole sentence and paraphrasing it as commentary.",
      "Treating the speaker's views as the essay's subject instead of the speaker's methods.",
      "Discussing the topic (climate) rather than the writing.",
    ],
    scale: "About 660 words — a full 45-minute rhetorical analysis.",
  },
  {
    frqId: "ap-lang-argument",
    courseSlug: "ap-lang",
    kind: "essay",
    label: "Question 3 · Argument",
    title: "Youth activism — a defence that concedes the real objection",
    score: "6 / 6",
    framing:
      "The prompt sets up two positions. The strongest response does not pretend the second is stupid. This essay defends youth activism while granting that its critics have identified a genuine problem — and then argues the problem is caused by something else.",
    sections: [
      {
        paragraphs: [
          "The debate about youth activism is usually conducted as though the only question were whether teenagers are mature enough to have political opinions. That is the wrong test. The evidence that youth activism matters is not that young people are wise; it is that participation is how people become capable of participation. Judged by that standard, activism is not a distraction from civic education — it is the most durable form of it, provided schools treat it as an intellectual practice rather than a performance.",
          "The critics' strongest point deserves to be stated plainly: much youth activism is shallow, slogan-driven, and shaped by whichever cause travels fastest on a screen. A student who reposts a graphic has not reasoned about policy, and a school that counts the repost as civic engagement has taught nothing. But this is an argument about quality, not about age, and the same charge can be made of adult political life. The remedy for shallow participation is demanding participation — research, argument, engagement with people who disagree — not the removal of the opportunity. If the objection were valid, it would apply equally to voting drives, debate teams, and school newspapers.",
          "The stronger case for activism is developmental. Political efficacy is learned by doing: a student who organises a petition about a school policy, loses, and watches the process work anyway has acquired something a civics textbook cannot supply — a working model of how power responds. Because that lesson depends on the action being real, simulations are a poor substitute. And the effect is not confined to the students involved. A city council that hears from residents who cannot yet vote is being told something about the future of its electorate, and elected officials respond to that information. This is why so many of the movements that changed American law — from lunch-counter sit-ins to the student press-freedom cases — were led by people the critics would have called too young and too uninformed.",
          "The concession that saves the argument is about scope. Activism is valuable where it is voluntary, evidence-based, and separate from the graded curriculum; it becomes destructive when a school compels a position or when an afternoon of protest substitutes for the reading that would make the position defensible. That distinction answers the “distraction” objection without abandoning the terrain. A school should protect the time and safety for student organising while refusing to award credit for the opinion itself, and it should insist that any campaign a student joins can survive the question “what would change your mind?”. Under those conditions the charge of immaturity is not refuted by assertion; it is made irrelevant, because the practice itself supplies the missing knowledge.",
          "So the value of youth activism is real but conditional. It is not that young people have arrived at the right conclusions; it is that a democracy benefits when its youngest members learn how conclusions are contested, and learn it while the stakes are still small enough to recover from. The limitation the critics point to is genuine, and it is best addressed not by silencing students but by making them argue.",
        ],
      },
    ],
    breakdown: [
      {
        row: "Thesis",
        earned: "1 / 1",
        evidence:
          "“The evidence that youth activism matters is not that young people are wise; it is that participation is how people become capable of participation… activism is not a distraction from civic education — it is the most durable form of it.”",
        why: "It takes a clear position on the prompt's exact question, rejects the framing the prompt offers as a trap, and states a standard of judgement that the rest of the essay uses.",
      },
      {
        row: "Evidence and Commentary",
        earned: "4 / 4",
        evidence:
          "“A student who reposts a graphic has not reasoned about policy… But this is an argument about quality, not about age, and the same charge can be made of adult political life.”",
        why: "Evidence is specific (sit-ins, student press-freedom cases, a petition that fails) and each example is followed by reasoning that connects it to the thesis. The essay is organised around a developing line of thought — objection, reframe, developmental case, delimitation — rather than a list of reasons.",
      },
      {
        row: "Sophistication",
        earned: "1 / 1",
        evidence:
          "“Activism is valuable where it is voluntary, evidence-based, and separate from the graded curriculum; it becomes destructive when a school compels a position…”",
        why: "It defines the conditions under which its own claim holds, which is a qualified argument rather than a cheering one, and it answers the opposing perspective by granting it before limiting it.",
      },
    ],
    craft: [
      "State the opposing case in its strongest form in your own words before you answer it.",
      "Choose a standard of judgement in the first paragraph; without one, every example is just an opinion.",
      "Use two or three specific, checkable examples instead of ten vague ones.",
      "Include a delimitation — the conditions under which your claim would be wrong.",
      "End with a consequence for the reader, not a summary.",
    ],
    avoids: [
      "Straw-manning the opposition.",
      "A thesis that simply says “activism is good”.",
      "Relying on invented statistics.",
      "A conclusion that repeats the introduction in different words.",
    ],
    scale: "About 640 words — a full 40-minute argument essay.",
  },
];

const APUSH: Exemplar[] = [
  {
    frqId: "apush-saq-1",
    courseSlug: "apush",
    kind: "short-answer",
    label: "Question 1 · Short answer, stimulus",
    title: "Progressive reform, its cause, and its critics",
    score: "3 / 3",
    framing:
      "Three parts, three points, no thesis needed. Each part gets two or three sentences: the specific, then the explanation. The platform excerpt is evidence for (a), not a summary exercise.",
    sections: [
      {
        paragraphs: [
          "(a) The platform calls for the initiative, the referendum, and the recall of elected officials — direct-democracy devices that would let citizens propose, approve, and remove officeholders without waiting for a legislature or a party machine. It also endorses an eight-hour day for industrial workers.",
          "(b) Urban industrialisation and the political machine produced both the demand and the vocabulary for these reforms. Cities swollen by immigration and factory work were governed by party organisations that traded jobs and services for votes, and corruption scandals in city after city persuaded middle-class reformers that the machinery of elections, not merely the character of officials, had to change. The initiative and referendum were designed specifically to route around legislatures that machine politicians controlled.",
          "(c) Critics argued that direct democracy undermined representative government and invited rule by organised minorities. Conservative critics, including many business leaders, contended that measures like the referendum allowed well-funded campaigns to manufacture public opinion and that the recall would make judges and officials answerable to momentary majorities rather than to law.",
        ],
      },
    ],
    breakdown: [
      { row: "Part (a)", earned: "1/1", evidence: "“the initiative, the referendum, and the recall of elected officials — direct-democracy devices”", why: "It names a specific reform from the excerpt and describes what the device would actually do, which is what “describe” asks for." },
      { row: "Part (b)", earned: "1/1", evidence: "“Cities swollen by immigration and factory work were governed by party organisations that traded jobs and services for votes”", why: "It supplies a development inside the window and explains the causal link to the reform, instead of naming an event and stopping." },
      { row: "Part (c)", earned: "1/1", evidence: "“the recall would make judges and officials answerable to momentary majorities rather than to law”", why: "It gives a criticism held at the time and gives the reasoning behind it, so the reader can see it is a criticism rather than a rival policy." },
    ],
    craft: [
      "Answer the verb: describe means say what it is; explain means say why it happened or why it matters.",
      "Anchor each part in a decade and a named development.",
      "Use the excerpt's own terms in (a) so the reader can locate them.",
      "Keep to two or three sentences per part — length here earns nothing extra.",
    ],
    avoids: [
      "Writing an essay for a three-point question.",
      "Repeating the excerpt in (b) instead of adding outside knowledge.",
      "A criticism nobody at the time actually made.",
    ],
    scale: "About 170 words — roughly 12 minutes of writing.",
  },
  {
    frqId: "apush-saq-2",
    courseSlug: "apush",
    kind: "short-answer",
    label: "Question 2 · Short answer, comparison",
    title: "New Deal and Great Society — similarity, difference, consequence",
    score: "3 / 3",
    framing:
      "The comparison question turns on specificity: “both helped people” earns nothing. Name a programme from each era, then say what the difference changed for Americans.",
    sections: [
      {
        paragraphs: [
          "(a) Both the New Deal and the Great Society expanded the federal government's responsibility for individual economic security by creating programmes that delivered benefits directly to citizens rather than through state governments or private charity — Social Security and the Wagner Act in the 1930s, Medicare and Medicaid in 1965.",
          "(b) The principal difference was in who was understood to be entitled. New Deal programmes were built around the male industrial wage-earner and were financed through payroll contributions, so they framed security as an earned benefit; Great Society programmes were framed as rights of citizenship and extended to the elderly, the poor, and racial minorities who had been excluded from the earlier settlement, using general revenue and direct federal administration.",
          "(c) That difference mattered because it determined who was covered and who was left out. Domestic and agricultural workers — disproportionately Black and Hispanic — were excluded from Social Security and Wagner Act protections by the compromises of 1935, which meant that the New Deal's security was distributed unequally; the Great Society's shift toward universal and means-tested entitlement was an attempt to reach precisely those excluded workers and their descendants.",
        ],
      },
    ],
    breakdown: [
      { row: "Part (a)", earned: "1/1", evidence: "“creating programmes that delivered benefits directly to citizens rather than through state governments or private charity — Social Security and the Wagner Act… Medicare and Medicaid”", why: "It states one genuine similarity and supports it with a named example from each era." },
      { row: "Part (b)", earned: "1/1", evidence: "“New Deal programmes were built around the male industrial wage-earner and were financed through payroll contributions… Great Society programmes were framed as rights of citizenship”", why: "The difference is conceptual (entitlement and financing), not chronological, and each half is illustrated." },
      { row: "Part (c)", earned: "1/1", evidence: "“Domestic and agricultural workers — disproportionately Black and Hispanic — were excluded from Social Security and Wagner Act protections by the compromises of 1935”", why: "It explains why the difference mattered with a specific historical consequence, which is the part students most often leave thin." },
    ],
    craft: [
      "Choose a similarity of function or method, not of mood.",
      "Make the difference structural: who is covered, who pays, who administers.",
      "In the third part, follow the difference to a consequence for a named group.",
      "Use programme names, years and provisions; generalities read as guesses.",
    ],
    avoids: [
      "“Both were created during hard times.”",
      "A difference that is really just a date.",
      "Part (c) that restates part (b).",
    ],
    scale: "About 190 words — roughly 12 minutes.",
  },
  {
    frqId: "apush-saq-3",
    courseSlug: "apush",
    kind: "short-answer",
    label: "Question 3 · Short answer, continuity and change",
    title: "Women's paid work, 1890–1945",
    score: "3 / 3",
    framing:
      "Continuity questions are harder than change questions, because the continuity must be shown to persist across the whole period. This response names the change, then shows what did not move.",
    sections: [
      {
        paragraphs: [
          "(a) Between 1890 and 1945 the kinds of paid work open to women broadened and the number of married women in the paid labour force rose sharply — from clerical and factory work concentrated among the young and unmarried to white-collar office work, nursing, teaching, and, during the Second World War, heavy industry, with married women's labour-force participation climbing as war production drew them in.",
          "(b) A continuity was the persistence of occupational segregation and a wage gap. Women's work remained clustered in a narrow set of jobs coded as female — teaching, nursing, clerical work, domestic service — and those jobs paid less than the male-coded jobs requiring comparable skill, a pattern that survived both world wars and the expansion of women's employment.",
          "(c) The change mattered because it altered both household economics and expectations. Married women's earnings became part of the normal family economy, which made the single-earner household less permanent and gave women a claim to income that later underpinned arguments for equal pay; at the same time, because segregation persisted, wartime employment did not by itself produce economic equality, which is why the pay gap remained an issue for the rest of the century.",
        ],
      },
    ],
    breakdown: [
      { row: "Part (a)", earned: "1/1", evidence: "“from clerical and factory work concentrated among the young and unmarried to white-collar office work, nursing, teaching, and, during the Second World War, heavy industry”", why: "It describes a concrete change over the specified period rather than a general trend toward equality." },
      { row: "Part (b)", earned: "1/1", evidence: "“Women's work remained clustered in a narrow set of jobs coded as female… a pattern that survived both world wars”", why: "The continuity is explicitly shown to span the whole period, which is what separates a continuity from a snapshot." },
      { row: "Part (c)", earned: "1/1", evidence: "“at the same time, because segregation persisted, wartime employment did not by itself produce economic equality”", why: "It links the change to a consequence and uses the continuity to limit that consequence — a compact, defensible causal claim." },
    ],
    craft: [
      "Put a start point and an end point in the change sentence.",
      "Prove a continuity by naming the same thing in 1890 and in 1945.",
      "Let part (c) combine the change and the continuity rather than ignoring one.",
      "Prefer occupational detail to abstractions like “opportunity”.",
    ],
    avoids: [
      "Claiming a complete transformation.",
      "A continuity with no time depth (“women still faced challenges”).",
      "Ignoring the Second World War, which the period ends with.",
    ],
    scale: "About 200 words — roughly 13 minutes.",
  },
  {
    frqId: "apush-dbq-1",
    courseSlug: "apush",
    kind: "essay",
    label: "DBQ · Document-based question",
    title: "Were the Progressives successful, 1890–1920?",
    score: "7 / 7",
    promptOverride:
      "Evaluate the extent to which Progressive Era reformers were successful in achieving their goals between 1890 and 1920.",
    framing:
      "A 7-point DBQ needs a thesis that measures success, contextualisation, six documents used as evidence, sourcing of at least three, and complexity. The trick here is that “success” has to be defined before the documents can be graded against it.",
    sections: [
      {
        paragraphs: [
          "The Progressives succeeded where they changed institutions and failed where success depended on changing the distribution of power between races and regions. Measured by laws and amendments — the income tax, direct election of senators, Prohibition, women's suffrage — the movement achieved more in seven years than most reform eras manage in a generation. Measured by the conditions that produced it, the tenements Jacob Riis photographed and the meatpacking floors Upton Sinclair described, the results were partial: the reforms that passed were those that could be built through federal legislation and constitutional amendment, while those requiring the redistribution of racial and economic power stalled once they threatened the coalition that had won the first victories.",
          "The Progressive impulse grew out of a specific conjuncture: industrial capitalism had concentrated wealth and population in cities faster than municipal government could absorb them, and the party machines that managed the growth were themselves the object of reform. Populist agitation of the 1890s had already taught reformers that national legislation could be blocked by courts and by a Senate chosen by state legislatures; that lesson shaped the movement's priorities, which were as much about who held power as about what policy should be.",
          "The documentary record supports a partial-success reading. Riis (Doc A) and Sinclair (Doc B) supplied the moral case: both writers described conditions as evidence of a system, not an accident, and the Pure Food and Drug Act of 1906 followed Sinclair's serialised revelations directly. Roosevelt's “New Nationalism” (Doc C) converted that moral case into a programme of federal regulation, and the four amendments (Doc F) are the clearest measure of success — a federal income tax, directly elected senators, Prohibition and women's suffrage all ratified within seven years, which is institutional change on a scale the Populists had only demanded. Sourcing sharpens the same evidence: Catt (Doc D) argued for suffrage by turning the war's democratic rhetoric back on Congress, a purpose that explains her emphasis on patriotism rather than on equal rights; Du Bois (Doc E) wrote after the war to insist that the democracy soldiers had defended abroad had to be delivered at home, which is why his language is a demand rather than a petition. Doc G, a business statement, is useful precisely because its author is a partisan: the claim that regulation threatens free enterprise tells us what reformers were actually changing.",
          "The limits are equally visible. The amendments of 1913–1920 did not touch the racial order: Du Bois's “We return fighting” marks the boundary of the Progressive achievement, and the same federal structure that allowed national reform allowed Southern states to disenfranchise Black voters without violating the Fifteenth Amendment's letter. Prohibition, the movement's most ambitious attempt to legislate behaviour rather than structure, produced organised crime and was repealed. The war economy demonstrated that federal power could direct industry, but it also demonstrated that this power was used to suppress dissent through the Espionage Act, which is the movement's most revealing contradiction: a reform coalition confident enough to amend the Constitution was also willing to jail those who opposed its war.",
          "The most defensible judgement is therefore that Progressivism succeeded in building the institutional machinery of a regulatory state and failed to extend its benefits universally. The reforms that survived — the income tax, the regulatory agencies, the expectation that the federal government is responsible for the national economy — became the foundation of the twentieth-century American state. The reforms that required confronting white supremacy and the power of capital over labour were deferred to the next generation, which is why the 1920s could look, from the perspective of a Black veteran or a Southern tenant farmer, like a restoration rather than a culmination.",
        ],
      },
    ],
    breakdown: [
      { row: "Thesis / Claim", earned: "1/1", evidence: "“The Progressives succeeded where they changed institutions and failed where success depended on changing the distribution of power between races and regions.”", why: "It evaluates extent rather than answering yes or no, and it supplies the criterion by which the rest of the essay judges evidence." },
      { row: "Contextualisation", earned: "1/1", evidence: "“industrial capitalism had concentrated wealth and population in cities faster than municipal government could absorb them, and the party machines that managed the growth were themselves the object of reform… Populist agitation of the 1890s had already taught reformers that national legislation could be blocked by courts”", why: "It sets the period in a broader process and connects the earlier Populist failure to the Progressives' choice of targets, which is context doing analytical work." },
      { row: "Evidence from documents", earned: "2/2", evidence: "“the four amendments (Doc F) are the clearest measure of success… Catt (Doc D) argued for suffrage by turning the war's democratic rhetoric back on Congress”", why: "Six documents are used as evidence for a claim rather than described, and each is tied to the thesis: the amendments prove institutional success, the war rhetoric shows method, Du Bois marks the limit." },
      { row: "Sourcing", earned: "1/1", evidence: "“Doc G, a business statement, is useful precisely because its author is a partisan”", why: "Three documents are sourced by author, audience or purpose, and the sourcing changes how the document is used — which is the requirement, not merely naming a type of source." },
      { row: "Complexity", earned: "2/2", evidence: "“Prohibition, the movement's most ambitious attempt to legislate behaviour rather than structure, produced organised crime and was repealed… a reform coalition confident enough to amend the Constitution was also willing to jail those who opposed its war.”", why: "It develops a contradiction inside the movement and connects it to a broader pattern, giving the essay a complexity beyond “some things worked, some did not”." },
    ],
    craft: [
      "Define success in the thesis; otherwise every document is ambiguous.",
      "Use documents in the order of your argument, not their letter order.",
      "Source at least three: author, audience, purpose, or occasion, and show why it matters.",
      "Build the complexity paragraph around a contradiction inside the movement.",
      "Keep outside evidence to a sentence or two where it strengthens a document's claim.",
    ],
    avoids: [
      "Describing documents instead of using them.",
      "A thesis that lists three reforms.",
      "Sourcing that does not change the interpretation.",
      "Treating “complexity” as a rhetorical flourish instead of an argumentative move.",
    ],
    scale: "About 700 words — a full 60-minute DBQ.",
  },
  {
    frqId: "apush-leq-1",
    courseSlug: "apush",
    kind: "essay",
    label: "LEQ · Long essay",
    title: "Economic factors and the road to revolution",
    score: "6 / 6",
    promptOverride:
      "Evaluate the extent to which economic factors were the primary cause of the American Revolution.",
    framing:
      "The LEQ asks for extent, not agreement. This response argues that economic grievances built the mobilising networks and supplied the language, but that the decision for independence required a political argument about sovereignty that economics could not make by itself.",
    sections: [
      {
        paragraphs: [
          "Economic grievance was the engine of the revolutionary movement but not its justification. The taxes and trade restrictions of 1763–1775 provided the recurring occasions on which colonial resistance mobilised, and the economic depression that followed the Seven Years' War made those measures feel like strangulation rather than administration. Yet when colonists finally declared independence they did not claim a right to lower taxes; they claimed a right to consent to government, which is a constitutional argument that economic causes cannot supply on their own. Economic factors were therefore primary in producing the conflict and secondary in explaining its declared purpose.",
          "The imperial context made economics and politics inseparable. Britain emerged from the Seven Years' War with an enormous debt and a vastly expanded empire, and the attempt to make the colonies pay for the war that had secured them produced the Stamp Act, the Townshend duties, and the Tea Act in succession. Each measure was defended in London as a matter of revenue and constitutional order, and each was experienced in the colonies as an extraction: the Stamp Act's requirement of payment in sterling, the Townshend duties' use of the money to pay royal officials, and the Tea Act's rescue of the East India Company all threatened colonial merchants and printers before they threatened colonial legislatures.",
          "The evidence for the primacy of economics is strongest in the mobilisation. Merchants organised non-importation agreements, which worked because they hit British exporters; artisans and mechanics joined the resistance because the duties and the quartering of troops affected their livelihoods; and the committees of correspondence that later coordinated revolution were first built to enforce boycotts. The Boston Tea Party, a deliberate destruction of private property to prevent the landing of taxed tea, is incomprehensible except as an economic act with a constitutional argument attached. Shays' Rebellion, though after independence, shows how quickly economic grievance could become insurrectionary, and it is the reason economic distress is treated as a cause rather than a backdrop.",
          "The limitation appears when the declaration is read closely. The Declaration's charges are about consent, standing armies, and the suspension of legislatures; its economic complaint — “cutting off our Trade with all parts of the world” — is one item in a list of political grievances. Colonists who became revolutionaries insisted for a decade that they were defending the rights of Englishmen, not seceding over money; the argument changed only when the Crown and Parliament refused to concede that a legislature could bind the colonies in any respect. That refusal was constitutional, which is why the same grievances were felt in the Caribbean colonies without producing independence: economics set the stage, but the political argument decided the ending.",
          "The most defensible judgement is that economic factors were the primary cause of the dispute and the secondary cause of the rupture. Without the debt crisis and the depression of the 1760s, the imperial measures would not have been so broadly resented, and without the boycotts there would have been no organisation capable of sustaining resistance for a decade. But the object the resistance demanded — consent, representation, sovereignty — was not economic, and the revolution's most enduring consequence, a republic founded on a claim about the source of political authority, would have been unthinkable as a demand for cheaper tea.",
        ],
      },
    ],
    breakdown: [
      { row: "Thesis", earned: "1/1", evidence: "“Economic factors were therefore primary in producing the conflict and secondary in explaining its declared purpose.”", why: "It answers the extent question with a distinction that organises the whole essay, and it can be argued against." },
      { row: "Contextualisation", earned: "1/1", evidence: "“Britain emerged from the Seven Years' War with an enormous debt and a vastly expanded empire, and the attempt to make the colonies pay for the war… produced the Stamp Act, the Townshend duties, and the Tea Act”", why: "It situates the acts in a broader imperial process and shows the mechanism, which then supports the argument about mobilisation." },
      { row: "Evidence", earned: "2/2", evidence: "“The Boston Tea Party, a deliberate destruction of private property to prevent the landing of taxed tea… Shays' Rebellion, though after independence, shows how quickly economic grievance could become insurrectionary”", why: "Specific, accurate evidence used to build the case for economic primacy, plus one piece of outside evidence used to extend the argument rather than pad it." },
      { row: "Reasoning and organisation", earned: "1/1", evidence: "“the same grievances were felt in the Caribbean colonies without producing independence: economics set the stage, but the political argument decided the ending”", why: "A comparison that tests the thesis and produces a conclusion, not just a sequence of correct facts." },
      { row: "Complexity", earned: "1/1", evidence: "“the revolution's most enduring consequence, a republic founded on a claim about the source of political authority, would have been unthinkable as a demand for cheaper tea”", why: "It distinguishes cause from meaning, which is a genuinely complex historical judgement rather than a hedge." },
    ],
    craft: [
      "Decide what your thesis actually measures — “primary cause” needs a definition of cause.",
      "Use the imperial context to explain why the acts were resented, not just what they were.",
      "Include one comparison or counter-case that tests the claim.",
      "Keep the strongest objection for the fourth paragraph and answer it in the fifth.",
    ],
    avoids: [
      "A list of taxes as a substitute for an argument.",
      "Ignoring the Declaration's own language.",
      "Choosing a side and refusing to weight the evidence.",
    ],
    scale: "About 640 words — a full 40-minute LEQ.",
  },
];

const AP_GOV: Exemplar[] = [
  {
    frqId: "ap-gov-concept",
    courseSlug: "ap-gov",
    kind: "short-answer",
    label: "Question 1 · Concept application",
    title: "Voter ID, federalism, and a second institutional route",
    score: "3 / 3",
    framing:
      "Three parts, each worth one point, each needing the scenario's actors. The trap is answering with a slogan about voting rights instead of a clause and a level of government.",
    sections: [
      {
        paragraphs: [
          "(a) The governing principle is federalism as it operates in elections: Article I, section 4 gives state legislatures the power to set the “Times, Places and Manner” of congressional elections, subject to Congress's power to alter those regulations, while the Fourteenth, Fifteenth, and Twenty-Fourth Amendments limit what states may do when their rules burden the right to vote.",
          "(b) Because election administration is primarily a state power, the state legislature may adopt an identification requirement as part of the “manner” of holding elections. That power is not unlimited: under the Fourteenth Amendment's equal protection guarantee and the Twenty-Fourth Amendment's ban on poll taxes, the state may not impose a requirement that operates as a substantial burden on a fundamental right or as a condition of voting tied to wealth. The federal court must therefore ask whether the law has a legitimate regulatory purpose — preventing impersonation fraud — and whether its burden falls disproportionately on a class of voters.",
          "(c) An interest group could take the same claim to Congress rather than the courts. Under its Article I, section 4 authority and its enforcement powers under the Fourteenth and Fifteenth Amendments, Congress could hold hearings, issue a report documenting the burden on particular voters, and pass legislation setting a national standard for documentary proof at the polls, which would supersede the state law under the Supremacy Clause. The group could also press the state's own courts on state constitutional grounds, which is a separate route because state constitutions may protect voting more broadly than the federal Constitution.",
        ],
      },
    ],
    breakdown: [
      { row: "Part (a)", earned: "1/1", evidence: "“Article I, section 4 gives state legislatures the power to set the ‘Times, Places and Manner’ of congressional elections, subject to Congress's power to alter those regulations”", why: "It identifies a specific constitutional provision that governs the question and names the competing authority, which is exactly what the row asks for." },
      { row: "Part (b)", earned: "1/1", evidence: "“the state may not impose a requirement that operates as a substantial burden on a fundamental right… so the federal court must therefore ask whether the law has a legitimate regulatory purpose”", why: "The principle is applied to the scenario's own facts — the state's law, the court's test — instead of being restated in the abstract." },
      { row: "Part (c)", earned: "1/1", evidence: "“Congress could… pass legislation setting a national standard for documentary proof at the polls, which would supersede the state law under the Supremacy Clause”", why: "It names a different institution and explains the mechanism (preemption), which is the difference between a point and a guess." },
    ],
    craft: [
      "Name the clause or amendment in part (a); “federalism” alone is usually not enough.",
      "In part (b), name the test the court applies and apply it to the scenario's facts.",
      "In part (c), name the institution, the power, and the mechanism.",
      "Use the scenario's words: the state legislature, the federal court, the interest group.",
    ],
    avoids: [
      "A general essay about voting rights.",
      "Part (c) that names an institution with no mechanism.",
      "Mixing up state and federal authority.",
    ],
    scale: "About 240 words — roughly 20 minutes.",
  },
  {
    frqId: "ap-gov-quant",
    courseSlug: "ap-gov",
    kind: "short-answer",
    label: "Question 2 · Quantitative analysis",
    title: "Trust, turnout, and what the data do to representation",
    score: "4 / 4",
    framing:
      "The figure gives trust falling from 77% (1964) to 20% (2020) and turnout rising with age (51% for 18–29, 74% for 65+). Each part wants a specific reading, then a political explanation, then a conclusion — not a description of the whole chart.",
    sections: [
      {
        paragraphs: [
          "(a) Trust in the federal government declined substantially and unevenly between 1964 and 2020. It fell from 77% in 1964 to 25% in 1980, recovered to 44% in 2000, and fell again to 20% in 2020 — a net decline of 57 percentage points, with the sharpest single drop in the 1960s and 1970s.",
          "(b) One political reason is the sequence of credibility crises that began with Vietnam and Watergate. A war the government reported as winnable and an administration that lied about a burglary taught Americans to discount official statements, and no later event restored the presumption of honesty those episodes destroyed. Polarisation compounds the effect: when one party holds the presidency, supporters of the other party report low trust, so aggregate trust declines as partisan hostility rises.",
          "(c) The turnout data relate to a linkage institution in that elections are the primary mechanism connecting citizens' preferences to government, and the age gradient shows that connection working unevenly: 51% of 18–29 year-olds voted in 2020 against 74% of those 65 and older. Because participation rises with age, the electorate that actually selects officials is older, wealthier on average, and more likely to be contacted by parties and campaigns, which is itself a linkage process.",
          "(d) The implication for representative democracy is that the government produced by these elections is systematically more responsive to older voters than to younger ones, since officials can read low youth turnout as low salience. Falling trust makes the problem worse rather than self-correcting: a citizen who believes government is unresponsive has less reason to vote, and a politician who observes that belief has less reason to court that citizen, which is a cycle in which the data and the behaviour reinforce each other.",
        ],
      },
    ],
    breakdown: [
      { row: "Part (a)", earned: "1/1", evidence: "“fell from 77% in 1964 to 25% in 1980, recovered to 44% in 2000, and fell again to 20% in 2020 — a net decline of 57 percentage points”", why: "It identifies the trend with the numbers and the shape (decline with a recovery), rather than saying “trust decreased”." },
      { row: "Part (b)", earned: "1/1", evidence: "“A war the government reported as winnable and an administration that lied about a burglary taught Americans to discount official statements”", why: "It gives a political explanation tied to the direction of the trend, and links it to a mechanism (discounting official claims) rather than naming an event." },
      { row: "Part (c)", earned: "1/1", evidence: "“elections are the primary mechanism connecting citizens' preferences to government… 51% of 18–29 year-olds voted in 2020 against 74% of those 65 and older”", why: "It identifies the linkage institution and uses the figure's numbers to explain how that link operates unevenly." },
      { row: "Part (d)", earned: "1/1", evidence: "“officials can read low youth turnout as low salience… which is a cycle in which the data and the behaviour reinforce each other”", why: "It draws a conclusion about representation with a mechanism, which is what distinguishes the fourth point from a summary." },
    ],
    craft: [
      "Quote the numbers; “decreased” alone rarely earns the point.",
      "Explain the trend with a political cause, not a social one.",
      "Link the turnout gap to a named linkage institution.",
      "Let part (d) trace a feedback loop rather than state an opinion.",
    ],
    avoids: [
      "Describing both charts without answering the parts.",
      "A reason for (b) that could explain any decline in any country.",
      "A conclusion that contradicts the data.",
    ],
    scale: "About 270 words — roughly 20 minutes.",
  },
  {
    frqId: "ap-gov-scotus",
    courseSlug: "ap-gov",
    kind: "short-answer",
    label: "Question 3 · SCOTUS comparison",
    title: "McDonald, Heller, and the limits of incorporation",
    score: "4 / 4",
    framing:
      "Four parts: the holding, a related case, a comparison of reasoning, and an application. Accuracy of case names and holdings is the whole game.",
    sections: [
      {
        paragraphs: [
          "(a) In McDonald v. City of Chicago (2010) the Court held that the Second Amendment right to keep and bear arms for self-defence is fundamental and applies to the states through the Due Process Clause of the Fourteenth Amendment, so Chicago's handgun ban was unconstitutional.",
          "(b) The related case is District of Columbia v. Heller (2008), in which the Court held that the Second Amendment protects an individual's right to possess a firearm for lawful purposes such as self-defence in the home, and struck down the District's handgun ban while allowing regulation of who may carry and where.",
          "(c) The similarity is that both decisions rest on an individual-rights reading of the Second Amendment rather than a collective or militia-based reading. The difference is in which government is restrained: Heller applied the amendment directly to the federal government, which the Bill of Rights already bound, while McDonald had to decide whether the right was “fundamental” enough to be incorporated against the states — which is why McDonald's reasoning is largely a Fourteenth Amendment due-process argument built on the older incorporation precedents.",
          "(d) A licensing requirement would be analysed as a regulation rather than a prohibition. Because McDonald holds that the right is fundamental and applicable to the states, a licensing scheme could be upheld only if it serves a legitimate public-safety purpose without imposing an undue burden on the core right of armed self-defence in the home; discretionary licensing that gives officials unreviewable power to deny permits would face a serious challenge, while a neutral fee, a background check, and a training requirement would more likely survive.",
        ],
      },
    ],
    breakdown: [
      { row: "Part (a)", earned: "1/1", evidence: "“the Second Amendment right to keep and bear arms for self-defence is fundamental and applies to the states through the Due Process Clause of the Fourteenth Amendment”", why: "It states the holding and the constitutional route (incorporation), which is the part students most often reduce to “the Court said the gun ban was unconstitutional”." },
      { row: "Part (b)", earned: "1/1", evidence: "“Heller… held that the Second Amendment protects an individual's right to possess a firearm for lawful purposes such as self-defence in the home”", why: "It names a genuinely related case and states its holding accurately." },
      { row: "Part (c)", earned: "1/1", evidence: "“Heller applied the amendment directly to the federal government… while McDonald had to decide whether the right was ‘fundamental’ enough to be incorporated”", why: "The comparison is about reasoning and jurisdiction, not outcome, which is what the row asks for." },
      { row: "Part (d)", earned: "1/1", evidence: "“a licensing scheme could be upheld only if it serves a legitimate public-safety purpose without imposing an undue burden on the core right”", why: "It applies the reasoning to a new statute and distinguishes a permissible regulation from an impermissible burden." },
    ],
    craft: [
      "State holdings with the constitutional provision, not just the outcome.",
      "Choose a related case that shares the constitutional question.",
      "Compare reasoning: whose power is at issue, and by what clause.",
      "In part (d), draw a line between regulation and prohibition.",
    ],
    avoids: [
      "Confusing Heller's forum with McDonald's.",
      "A comparison that only notes that both involved guns.",
      "Part (d) that predicts a verdict without giving the test.",
    ],
    scale: "About 260 words — roughly 20 minutes.",
  },
  {
    frqId: "ap-gov-argument",
    courseSlug: "ap-gov",
    kind: "essay",
    label: "Question 4 · Argument essay",
    title: "The Electoral College — a case for reform, not abolition",
    score: "6 / 6",
    framing:
      "The prompt offers three positions. This response argues for a specific reform and defends it with structural evidence and one real counterargument — the pattern that earns all three rows.",
    sections: [
      {
        paragraphs: [
          "The Electoral College should be reformed rather than abolished or preserved unchanged. Abolition would require a constitutional amendment that small states can block, and preservation leaves in place a mechanism that can award the presidency to the second-place finisher in the popular vote — a result that damages the legitimacy of the winner regardless of the winner's merits. The achievable reform is the National Popular Vote interstate compact, which would bind member states to award their electors to the national popular-vote winner once states holding 270 electoral votes have joined.",
          "The strongest argument for the current system is federalism: the College forces candidates to build coalitions across states rather than pile up votes in metropolitan areas, and it protects smaller states from being ignored. That argument is weaker than it appears. The states that receive the most candidate attention under the current system are not small states as such but competitive ones; Wyoming and California are equally safe, and both are equally ignored. A national popular vote would not eliminate federalism, because the Senate and the states' role in ratifying amendments remain untouched; it would only change how the president is selected.",
          "The evidence for reform is structural rather than anecdotal. Because forty-eight states award electors winner-take-all, a shift of a few thousand votes in a handful of states can reverse a national margin of millions, which is what happened in 2000 and 2016. That is not a hypothetical defect; it is a predictable consequence of the unit rule, and it teaches candidates to campaign in a dozen places and to govern with those dozen in mind. The compact does not require abolishing the College, does not require small states to surrender anything, and takes effect only when enough states join that it cannot change the outcome of an election it was not designed for.",
          "The honest objection is that the compact is a workaround: if the College is genuinely defective, the constitutional amendment process exists to fix it, and a compact among states may invite a constitutional challenge over whether states may bind their electors in advance. That objection is a reason to design the compact carefully, not a reason to keep a system that produces inversions. And the alternative offered by defenders — that inversions are rare — concedes the principle: a mechanism that can override the popular vote is a defect even when it rarely fires, in the same way that a bridge that fails once a generation is still a bad bridge.",
          "The Electoral College should therefore be retained as an institution and reformed in operation: states should join a compact that guarantees the presidency to the national popular-vote winner, and Congress should fund the administration that makes a national count auditable. That position is less satisfying than abolition, and it is more defensible than preservation, because it fixes the specific harm — a president who can lose the vote and win the office — without asking small states to consent to their own marginalisation.",
        ],
      },
    ],
    breakdown: [
      { row: "Thesis", earned: "1/1", evidence: "“The Electoral College should be reformed rather than abolished or preserved unchanged… The achievable reform is the National Popular Vote interstate compact.”", why: "It takes a clear position among the prompt's options and names the specific reform, so the essay's evidence has a target." },
      { row: "Evidence", earned: "2/2", evidence: "“Because forty-eight states award electors winner-take-all, a shift of a few thousand votes in a handful of states can reverse a national margin of millions, which is what happened in 2000 and 2016.”", why: "Two accurate, relevant pieces of evidence — the unit rule and the historical inversions — each used to support the claim rather than merely mentioned." },
      { row: "Reasoning", earned: "2/2", evidence: "“The states that receive the most candidate attention under the current system are not small states as such but competitive ones; Wyoming and California are equally safe, and both are equally ignored.”", why: "It reasons through the federalism defence and shows why it fails on its own terms, which is argument rather than assertion." },
      { row: "Alternative perspective", earned: "1/1", evidence: "“That objection is a reason to design the compact carefully, not a reason to keep a system that produces inversions… a bridge that fails once a generation is still a bad bridge.”", why: "It states a real objection, concedes its force, and answers it with an analogy that clarifies the standard being applied." },
    ],
    craft: [
      "Choose one of the prompt's three positions and name the specific mechanism.",
      "Use two pieces of evidence well rather than five in passing.",
      "Answer the best objection in its own terms.",
      "Keep the constitutional text accurate: the Senate, the amendment process, the unit rule.",
    ],
    avoids: [
      "A thesis that says “the Electoral College is controversial”.",
      "Invented statistics.",
      "Ignoring the federalism argument the prompt supplies.",
    ],
    scale: "About 640 words — a full 40-minute argument essay.",
  },
];

const AP_BIO: Exemplar[] = [
  {
    frqId: "ap-bio-long-1",
    courseSlug: "ap-bio",
    kind: "short-answer",
    label: "Question 1 · Long free response",
    title: "Cellular respiration and temperature — reading an enzyme curve",
    score: "9 / 9",
    framing:
      "Five parts, nine points. The marks come from naming a variable precisely, describing the *shape* of the data, explaining the mechanism, showing the calculation, and justifying a prediction with the same mechanism.",
    sections: [
      {
        paragraphs: [
          "(a) The independent variable is temperature, in degrees Celsius; it is the variable the researchers manipulated across the five treatments. Oxygen consumption, in mL O₂ per gram of tissue per hour, is the dependent variable. Mass of tissue and time are held constant.",
          "(b) Oxygen consumption rises from 0.21 mL/g/h at 10 °C to a maximum of 0.74 mL/g/h at 25 °C — a 3.5-fold increase over 15 degrees — and then falls slightly to 0.69 mL/g/h at 30 °C. The trend is therefore a rise to an optimum followed by a small decline, not a straight line.",
          "(c) The data are consistent with enzyme mediation because the rate responds to temperature in the two ways enzymes do. Between 10 °C and 25 °C the rate increases steeply, which is explained by increased kinetic energy: more collisions between substrate and enzyme active sites per unit time. Past the optimum, the rate declines even though collisions would be more frequent, which is explained by denaturation — the hydrogen bonds and ionic interactions maintaining tertiary structure begin to break, so active-site shape is lost and fewer substrate molecules can bind. A purely physical process such as diffusion would not show a decline at higher temperature.",
          "(d) Percent increase from 10 °C to 25 °C = (0.74 − 0.21)/0.21 × 100 = 0.53/0.21 × 100 = 252.4%, or approximately 252%. (The value more than triples.)",
          "(e) Oxygen consumption at 45 °C should be near zero, likely below 0.05 mL/g/h. The optimum is at 25 °C in this tissue and the rate is already falling at 30 °C; at 45 °C the respiratory enzymes — including those of glycolysis, the Krebs cycle, and the electron transport chain — would be substantially denatured, so even though molecules collide more often, functional active sites are scarce and the pathway cannot run. The prediction follows from the same mechanism that explains the decline after the optimum.",
        ],
      },
    ],
    breakdown: [
      { row: "(a) Variable identification", earned: "1/1", evidence: "“temperature, in degrees Celsius; it is the variable the researchers manipulated… Oxygen consumption, in mL O₂ per gram of tissue per hour, is the dependent variable.”", why: "It names both variables with units and states the direction of the relationship — manipulated versus measured — which is what earns the point." },
      { row: "(b) Trend description", earned: "1/1", evidence: "“rises from 0.21 mL/g/h at 10 °C to a maximum of 0.74 mL/g/h at 25 °C… and then falls slightly to 0.69 mL/g/h at 30 °C”", why: "It describes the shape (rise, optimum, decline) and cites actual values, instead of saying the rate “increased with temperature”." },
      { row: "(c) Explanation", earned: "2/2", evidence: "“more collisions between substrate and enzyme active sites per unit time… denaturation — the hydrogen bonds and ionic interactions maintaining tertiary structure begin to break”", why: "Two mechanisms are named, one for each half of the curve, and the answer explains why a non-enzymatic process would not decline." },
      { row: "(d) Calculation", earned: "1/1", evidence: "“(0.74 − 0.21)/0.21 × 100 = 0.53/0.21 × 100 = 252.4%, or approximately 252%”", why: "The setup is written out and the result carries the percent unit; the method is visible, which is what a calculation point requires." },
      { row: "(e) Prediction and justification", earned: "1/1", evidence: "“near zero… the respiratory enzymes… would be substantially denatured… The prediction follows from the same mechanism that explains the decline after the optimum.”", why: "It gives a number, a mechanism, and links the prediction explicitly to the evidence in (b) and (c)." },
    ],
    craft: [
      "Write the variables with units in part (a).",
      "Describe the shape of the data, not just its direction.",
      "One mechanism per half of an optimum curve: kinetics on the way up, denaturation on the way down.",
      "Show the arithmetic in calculations and keep units on the answer.",
      "Link the prediction back to the mechanism you already used.",
    ],
    avoids: [
      "“The rate increased as temperature increased” — that misses the decline.",
      "Saying enzymes “die” or “are killed”.",
      "A calculation with no visible method.",
      "A prediction with no mechanism.",
    ],
    scale: "About 330 words — roughly 25 minutes.",
  },
  {
    frqId: "ap-bio-long-2",
    courseSlug: "ap-bio",
    kind: "short-answer",
    label: "Question 2 · Long free response",
    title: "Hardy–Weinberg, selection, and the assumptions that fail",
    score: "9 / 9",
    framing:
      "The calculation points are easy; the explanation points are where responses lose marks. Each explanation names the mechanism (selection against a phenotype, drift in a small population) rather than the outcome.",
    sections: [
      {
        paragraphs: [
          "(a) For two alleles at Hardy–Weinberg equilibrium, the expected frequency of heterozygotes is 2pq. With p = 0.7 (B) and q = 0.3 (b): 2(0.7)(0.3) = 0.42. So 42% of individuals are expected to be heterozygous.",
          "(b) The expected frequency of green beetles, the bb genotype, is q² = (0.3)² = 0.09. In a population of 1,000 beetles, 0.09 × 1,000 = 90 beetles are expected to be green.",
          "(c) If birds preferentially eat brown beetles, the B allele confers lower fitness. Brown beetles (BB and Bb) survive and reproduce less often than green beetles, so fewer B alleles are passed to the next generation while the same number of b alleles are contributed by survivors. The frequency of B therefore declines, q rises, and the population is no longer at Hardy–Weinberg equilibrium because the assumption of equal survival and reproductive success is violated.",
          "(d) Removing the birds removes the selective pressure, so allele frequencies stop changing direction and the population can approach a new equilibrium at whatever p and q have become. Random mating then restores Hardy–Weinberg genotype proportions at those new frequencies — for example, if q has risen to 0.5, heterozygotes would settle near 2(0.5)(0.5) = 0.50 — but the original allele frequencies are not restored, because drift and past selection are not reversible.",
          "(e) The assumptions are not realistic here. Hardy–Weinberg requires no selection, no mutation, no migration, random mating, and an infinitely large population, and the scenario violates the first of these as soon as the birds act. Beyond that, a population of 1,000 beetles is small enough that genetic drift can change allele frequencies by chance alone between generations, and colour in beetles is frequently subject to other selective pressures such as thermoregulation or mate choice. The equilibrium is therefore best treated as a null model: useful for calculating expected frequencies, not a description of what this population will do.",
        ],
      },
    ],
    breakdown: [
      { row: "(a) Heterozygote calculation", earned: "1/1", evidence: "“the expected frequency of heterozygotes is 2pq. With p = 0.7 (B) and q = 0.3 (b): 2(0.7)(0.3) = 0.42”", why: "The formula is stated, substituted, and converted into a percentage — the full chain the reader needs." },
      { row: "(b) Expected count", earned: "1/1", evidence: "“q² = (0.3)² = 0.09. In a population of 1,000 beetles, 0.09 × 1,000 = 90 beetles”", why: "It identifies the genotype that produces the phenotype, then multiplies by population size with units." },
      { row: "(c) Selection explanation", earned: "2/2", evidence: "“Brown beetles (BB and Bb) survive and reproduce less often than green beetles, so fewer B alleles are passed… The frequency of B therefore declines”", why: "It states the fitness difference by genotype, traces it to allele frequency, and names the assumption that has been violated." },
      { row: "(d) New equilibrium", earned: "2/2", evidence: "“allele frequencies stop changing direction… Random mating then restores Hardy–Weinberg genotype proportions at those new frequencies… but the original allele frequencies are not restored”", why: "It distinguishes genotype proportions from allele frequencies, which is the misconception the part is testing." },
      { row: "(e) Assumption evaluation", earned: "2/2", evidence: "“a population of 1,000 beetles is small enough that genetic drift can change allele frequencies by chance alone… The equilibrium is therefore best treated as a null model”", why: "It names specific violated assumptions and evaluates the model's status rather than declaring it wrong." },
    ],
    craft: [
      "Write the formula before substituting.",
      "Name the genotype, then the phenotype, then the allele.",
      "In equilibrium questions, separate allele frequency from genotype frequency.",
      "For assumption questions, name the violated assumption and the direction of the resulting error.",
    ],
    avoids: [
      "Using p² for heterozygotes.",
      "Saying selection “makes the beetles mutate”.",
      "Treating drift as a kind of selection.",
    ],
    scale: "About 350 words — roughly 25 minutes.",
  },
  {
    frqId: "ap-bio-short-1",
    courseSlug: "ap-bio",
    kind: "short-answer",
    label: "Question 3 · Short free response",
    title: "Gene expression — promoter, operator, nonsense mutation",
    score: "4 / 4",
    framing:
      "Three short parts. Each answer is one mechanism sentence plus one consequence sentence; every part must say what changes and why.",
    sections: [
      {
        paragraphs: [
          "(a) The promoter is the DNA sequence upstream of a gene where RNA polymerase and its transcription factors bind, positioning the polymerase to begin transcription at the correct start site and determining how often the gene is transcribed.",
          "(b) The operator is a regulatory sequence that a repressor protein binds to block RNA polymerase. If the operator were mutated so that the repressor could no longer bind, repression would fail and the operon would be transcribed continuously, even when the cell does not need the gene products — expression changes without any change to the coding sequence because the defect is in regulation, not in the protein.",
          "(c) A nonsense mutation in the first exon converts a codon into a premature stop codon, so translation terminates early and produces a truncated protein. The shortened protein is usually non-functional because it lacks the domains encoded downstream, and the transcript may also be degraded by nonsense-mediated decay.",
        ],
      },
    ],
    breakdown: [
      { row: "(a) Promoter role", earned: "1/1", evidence: "“where RNA polymerase and its transcription factors bind, positioning the polymerase to begin transcription at the correct start site”", why: "It names the binding and the function (positioning the polymerase, setting frequency) rather than saying the promoter “starts transcription”." },
      { row: "(b) Operator mutation", earned: "2/2", evidence: "“If the operator were mutated so that the repressor could no longer bind, repression would fail and the operon would be transcribed continuously”", why: "It explains the loss of binding, the consequence for transcription, and why the coding sequence being unchanged is irrelevant." },
      { row: "(c) Nonsense mutation", earned: "1/1", evidence: "“converts a codon into a premature stop codon, so translation terminates early and produces a truncated protein”", why: "It connects the mutation type to the molecular consequence and the likely effect on protein function." },
    ],
    craft: [
      "Define the sequence by what binds to it.",
      "Say what is lost and what therefore happens.",
      "Distinguish regulatory mutation from coding mutation explicitly.",
    ],
    avoids: [
      "“The promoter tells the gene what to do.”",
      "Confusing the operator with the promoter.",
      "Forgetting that a nonsense mutation changes the protein's length.",
    ],
    scale: "About 170 words — roughly 12 minutes.",
  },
  {
    frqId: "ap-bio-short-2",
    courseSlug: "ap-bio",
    kind: "short-answer",
    label: "Question 4 · Short free response",
    title: "Energy flow — calculating trophic efficiency",
    score: "4 / 4",
    framing:
      "The calculation is a division with a direction. The explanation and prediction each need a mechanism: where the energy went, and why the fish cannot compensate.",
    sections: [
      {
        paragraphs: [
          "(a) Ecological efficiency between zooplankton and small fish = energy assimilated by small fish / energy available in zooplankton = 140 kcal/m²/year ÷ 1,400 kcal/m²/year = 0.10, or 10%.",
          "(b) Energy is lost between trophic levels mainly as heat released by cellular respiration: consumers oxidise organic molecules to do work and to maintain body temperature, and roughly 90% of the energy ingested is not converted into new biomass. Energy is also lost in egestion and excretion, and in the parts of prey that cannot be digested.",
          "(c) The small-fish population would decline, because its energy supply would fall below the level needed to sustain its biomass. With a 10% transfer efficiency, the fish depend on a zooplankton standing stock roughly ten times their own energy content; a sharp decline in zooplankton reduces the energy available at the next level, so fewer fish can be supported, and mortality or emigration would reduce the population until it matched the reduced supply.",
        ],
      },
    ],
    breakdown: [
      { row: "(a) Efficiency calculation", earned: "1/1", evidence: "“140 kcal/m²/year ÷ 1,400 kcal/m²/year = 0.10, or 10%”", why: "It states the ratio in the correct direction, performs it, and gives the result as a percentage." },
      { row: "(b) Energy loss", earned: "1/1", evidence: "“heat released by cellular respiration… Energy is also lost in egestion and excretion, and in the parts of prey that cannot be digested.”", why: "It names respiration and heat as the dominant loss and adds the other routes, which is what the point requires." },
      { row: "(c) Prediction", earned: "2/2", evidence: "“the fish depend on a zooplankton standing stock roughly ten times their own energy content… mortality or emigration would reduce the population until it matched the reduced supply”", why: "The prediction is specific, and the justification uses the calculated efficiency and the mechanism of a trophic ceiling." },
    ],
    craft: [
      "Write the efficiency ratio as next level over current level.",
      "Lead with respiration and heat, then add the minor routes.",
      "Tie the prediction to the number you just calculated.",
    ],
    avoids: [
      "Inverting the ratio.",
      "Saying energy is “used up” with no mechanism.",
      "A prediction with no link to the data.",
    ],
    scale: "About 180 words — roughly 12 minutes.",
  },
  {
    frqId: "ap-bio-short-3",
    courseSlug: "ap-bio",
    kind: "short-answer",
    label: "Question 5 · Short free response",
    title: "Experimental design — testing a catalase claim",
    score: "4 / 4",
    framing:
      "Design questions reward operational detail: what is changed, what is measured, what is held constant, and what counts as a control that proves the effect is enzymatic.",
    sections: [
      {
        paragraphs: [
          "(a) The independent variable is temperature, set at a series of values from roughly 10 °C to 60 °C in increments of 10 °C. The dependent variable is catalase activity, measured as the volume of oxygen gas produced per unit time (mL O₂ per 30 seconds) from a fixed volume of hydrogen peroxide.",
          "(b) One required control is the same setup with boiled potato tissue, which denatures catalase while leaving the tissue and the hydrogen peroxide unchanged. If the boiled treatment produces little or no oxygen, the gas measured in the experimental trials can be attributed to the enzyme rather than to a non-enzymatic reaction between hydrogen peroxide and the potato. A second control, hydrogen peroxide with no tissue, confirms that the peroxide does not decompose appreciably on its own.",
          "(c) Results would be measured by collecting the gas evolved in a graduated syringe or an inverted tube over water, recording the volume at fixed intervals, and repeating each temperature at least three times to calculate a mean and identify outliers. The mass of potato tissue, the concentration and volume of hydrogen peroxide, the pH, and the time of measurement must be held constant across trials.",
        ],
      },
    ],
    breakdown: [
      { row: "(a) Variables", earned: "1/1", evidence: "“The independent variable is temperature, set at a series of values… The dependent variable is catalase activity, measured as the volume of oxygen gas produced per unit time”", why: "Both variables are operational — a range of temperatures, a measured quantity with a time base." },
      { row: "(b) Control", earned: "2/2", evidence: "“the same setup with boiled potato tissue, which denatures catalase… If the boiled treatment produces little or no oxygen, the gas measured… can be attributed to the enzyme”", why: "It identifies a control that specifically tests the enzymatic claim, and explains what its result would demonstrate." },
      { row: "(c) Measurement", earned: "1/1", evidence: "“collecting the gas evolved in a graduated syringe or an inverted tube over water… repeating each temperature at least three times to calculate a mean”", why: "It describes instrumentation, replication, and the constants, which is the difference between a design and a wish." },
    ],
    craft: [
      "Give a temperature range and step size, not just “different temperatures”.",
      "Choose a control that isolates the mechanism you are claiming.",
      "Say how the measurement is made, with the instrument.",
      "List the constants explicitly.",
    ],
    avoids: [
      "A control that changes two things at once.",
      "Measuring “reaction rate” with no operational definition.",
      "One trial per temperature.",
    ],
    scale: "About 210 words — roughly 14 minutes.",
  },
  {
    frqId: "ap-bio-short-4",
    courseSlug: "ap-bio",
    kind: "short-answer",
    label: "Question 6 · Short free response",
    title: "Natural selection — variation, environment, and the individual",
    score: "4 / 4",
    framing:
      "The last part is the most commonly failed: individuals do not evolve. Everything else follows from variation plus differential reproduction.",
    sections: [
      {
        paragraphs: [
          "(a) Variation provides the differences on which selection can act: individuals in a population differ in heritable traits, and where a variant improves survival or reproduction in a given environment, that variant is passed on more often. Without heritable variation, selection has no material to work with and allele frequencies cannot change.",
          "(b) A change in the environment alters which phenotypes are most successful, so the relative fitness of alleles changes. Individuals with alleles suited to the new conditions reproduce more successfully, their offspring carry those alleles, and each generation's allele frequencies shift; because the change compounds across generations, measurable change can occur within a few generations if selection is strong and the trait is heritable.",
          "(c) An individual organism cannot evolve during its lifetime. Evolution is a change in the allele frequencies of a population between generations, and an individual's alleles do not change in response to need. What an individual can do is acclimate — physiological or behavioural adjustment within its lifetime — but acclimation is not heritable and does not alter the population's gene pool, so it is not evolution.",
        ],
      },
    ],
    breakdown: [
      { row: "(a) Variation", earned: "1/1", evidence: "“individuals in a population differ in heritable traits… Without heritable variation, selection has no material to work with”", why: "It specifies heritable variation and connects it to differential reproduction." },
      { row: "(b) Environmental change", earned: "2/2", evidence: "“the relative fitness of alleles changes… each generation's allele frequencies shift; because the change compounds across generations”", why: "It explains the mechanism through fitness and reproduction and accounts for how change accumulates." },
      { row: "(c) Individual evolution", earned: "1/1", evidence: "“Evolution is a change in the allele frequencies of a population between generations… What an individual can do is acclimate”", why: "It gives the definition, rejects the individual claim, and supplies the correct term for the individual-level phenomenon." },
    ],
    craft: [
      "Say heritable variation, not just variation.",
      "Express selection as differential reproduction.",
      "Use the word population in every part.",
      "Distinguish acclimation from adaptation explicitly.",
    ],
    avoids: [
      "“The organism adapted so it could survive.”",
      "Teleology: “in order to”.",
      "Treating evolution as an individual process.",
    ],
    scale: "About 180 words — roughly 12 minutes.",
  },
];

const AP_CALC: Exemplar[] = [
  {
    frqId: "ap-calc-frq-1",
    courseSlug: "ap-calc",
    kind: "short-answer",
    label: "Question 1 · Free response, calculator",
    title: "Rate and accumulation in a filling tank",
    score: "9 / 9",
    framing:
      "The calculus is short; the marks are in the setup, the units, and the justification sentences. Every answer below states the integral or derivative in symbols before evaluating, and every interpretive part names both quantities with units.",
    sections: [
      {
        paragraphs: [
          "(a) The water entering during the first 3 hours is the definite integral of the rate: ∫₀³ R(t) dt = ∫₀³ (20 + 5 sin(t²/4)) dt ≈ 67.782 litres. On the calculator this is 67.782; showing the integral with its limits earns the setup, and the numerical value with units earns the answer.",
          "(b) R′(t) = 5 cos(t²/4) · (2t/4) = (5t/2) cos(t²/4), so R′(2) = 5 cos(1) ≈ 2.702. Units: litres per hour per hour (L/h²). Interpretation: at t = 2 hours, the rate at which water is entering the tank is increasing at about 2.702 L/h per hour.",
          "(c) R′(5) = (12.5) cos(6.25) ≈ 12.493, which is positive. Since R′(5) > 0, the rate of flow is increasing at t = 5 hours. (Note the sign: cos(6.25) is close to cos(2π) ≈ 1, not negative, because 6.25 radians is just under 2π.)",
        ],
      },
    ],
    breakdown: [
      { row: "(a) Accumulation", earned: "3/3", evidence: "“∫₀³ R(t) dt = ∫₀³ (20 + 5 sin(t²/4)) dt ≈ 67.782 litres”", why: "Integral setup with limits, correct numerical evaluation, and units — the three things the scoring guideline separates." },
      { row: "(b) Derivative with interpretation", earned: "3/3", evidence: "“R′(t) = 5 cos(t²/4) · (2t/4)… R′(2) = 5 cos(1) ≈ 2.702. Units: litres per hour per hour (L/h²).”", why: "It differentiates with the chain rule correctly, gives the numerical value, states the units, and interprets the number as a rate of change of a rate in context." },
      { row: "(c) Justification", earned: "3/3", evidence: "“R′(5) = (12.5) cos(6.25) ≈ 12.493, which is positive. Since R′(5) > 0, the rate of flow is increasing”", why: "It evaluates the derivative and draws the conclusion from the sign, which is the justification the question asks for — not a claim based on the graph's appearance." },
    ],
    craft: [
      "Write the integral before you compute it; the setup is worth points on its own.",
      "State units in every interpretation sentence.",
      "For “increasing or decreasing”, evaluate the derivative and quote its sign.",
      "Check radian/degree mode before trusting a trigonometric value.",
    ],
    avoids: [
      "Giving only a decimal with no integral.",
      "Saying “the rate is increasing” with no derivative value.",
      "Omitting the units on a rate of change of a rate.",
    ],
    scale: "About 190 words — roughly 15 of the 30 minutes for this question.",
  },
  {
    frqId: "ap-calc-frq-2",
    courseSlug: "ap-calc",
    kind: "short-answer",
    label: "Question 2 · Free response, calculator",
    title: "A logistic population — carrying capacity and fastest growth",
    score: "9 / 9",
    framing:
      "Part (b) is where most responses lose the most: the solution must be shown as a logistic solution or by separation, not just a number. Part (c) needs a derivative argument, not a guess from the graph.",
    sections: [
      {
        paragraphs: [
          "(a) Setting dP/dt = 0 gives P = 0 or P = 5,000, so the carrying capacity is K = 5,000 bacteria. Its meaning: as P approaches 5,000 the factor (1 − P/5,000) approaches zero, so the growth rate falls to zero and the population levels off at the largest size the environment can sustain.",
          "(b) Separating variables and integrating by partial fractions gives ln|P/(5000 − P)| = 0.4t + C, which rearranges to the logistic solution P(t) = K / (1 + A e^(−0.4t)) with A = (K − P₀)/P₀ = (5000 − 200)/200 = 24. So P(t) = 5000 / (1 + 24e^(−0.4t)), and P(10) = 5000 / (1 + 24e^(−4)) ≈ 5000 / (1 + 0.4396) ≈ 3,473 bacteria.",
          "(c) The growth rate dP/dt = 0.4P(1 − P/5000) is a downward-opening parabola in P with zeros at P = 0 and P = 5,000, so its maximum occurs at the vertex, P = 2,500. Justification: dP/dt increases for P < 2,500 and decreases for P > 2,500, so the population grows fastest at half the carrying capacity.",
        ],
      },
    ],
    breakdown: [
      { row: "(a) Carrying capacity", earned: "2/2", evidence: "“Setting dP/dt = 0 gives P = 0 or P = 5,000, so the carrying capacity is K = 5,000… the growth rate falls to zero and the population levels off”", why: "It finds the equilibrium algebraically and interprets it in the model's terms." },
      { row: "(b) Solution and evaluation", earned: "4/4", evidence: "“P(t) = K / (1 + A e^(−0.4t)) with A = (K − P₀)/P₀ = 24… P(10) ≈ 3,473 bacteria”", why: "The method is displayed (separate, then solve, or the logistic form with its constant), the constant is computed from the initial condition, and the final value is evaluated correctly." },
      { row: "(c) Fastest growth", earned: "3/3", evidence: "“a downward-opening parabola in P with zeros at P = 0 and P = 5,000, so its maximum occurs at the vertex, P = 2,500… dP/dt increases for P < 2,500 and decreases for P > 2,500”", why: "It treats the growth rate as a function of P, locates the maximum, and justifies it with the sign change of the derivative." },
    ],
    craft: [
      "Find equilibrium points by setting the derivative to zero before interpreting anything.",
      "Show the separation or the logistic form with its constant; a bare answer loses points.",
      "For “fastest growth”, maximise dP/dt as a function of P and justify with a sign argument.",
      "Keep units and population context in the final sentence.",
    ],
    avoids: [
      "Solving with a calculator's differential-equation menu and writing only the number.",
      "Claiming fastest growth at K rather than K/2.",
      "Rounding constants so aggressively that P(10) drifts.",
    ],
    scale: "About 210 words — roughly 16 minutes.",
  },
  {
    frqId: "ap-calc-frq-3",
    courseSlug: "ap-calc",
    kind: "short-answer",
    label: "Question 3 · Free response, no calculator",
    title: "Implicit differentiation, a tangent line, and a derivative definition",
    score: "9 / 9",
    framing:
      "Four parts, no calculator. Part (c) is a trap in the good sense: the algebra shows there are no horizontal tangents, and saying so — with the reason — is the correct answer.",
    sections: [
      {
        paragraphs: [
          "(a) Differentiate x² + 4xy + y² = 13 implicitly with respect to x: 2x + 4(y + x dy/dx) + 2y dy/dx = 0. Collecting terms, 2x + 4y + (4x + 2y) dy/dx = 0, so dy/dx = −(2x + 4y)/(4x + 2y) = −(x + 2y)/(2x + y).",
          "(b) The point (1, 2) lies on the curve because 1 + 8 + 4 = 13. At that point dy/dx = −(1 + 4)/(2 + 2) = −5/4. The tangent line is y − 2 = −(5/4)(x − 1), or equivalently y = −(5/4)x + 13/4.",
          "(c) A horizontal tangent requires dy/dx = 0, so the numerator must vanish: x + 2y = 0, i.e. x = −2y. Substituting into the curve: (−2y)² + 4(−2y)(y) + y² = 4y² − 8y² + y² = −3y² = 13. Since −3y² ≤ 0 and 13 > 0, there is no real solution, so the curve has no points with a horizontal tangent. (The denominator vanishes where 2x + y = 0, which gives the vertical-tangent locations.)",
          "(d) The limit is the definition of the derivative, so it equals f′(3) for f(x) = x² sin x. By the product rule, f′(x) = 2x sin x + x² cos x, hence f′(3) = 6 sin 3 + 9 cos 3 ≈ −8.063.",
        ],
      },
    ],
    breakdown: [
      { row: "(a) Implicit derivative", earned: "2/2", evidence: "“2x + 4(y + x dy/dx) + 2y dy/dx = 0… dy/dx = −(x + 2y)/(2x + y)”", why: "The product rule on 4xy is applied correctly, terms are collected, and the result is simplified — the three steps the guideline rewards." },
      { row: "(b) Tangent line", earned: "2/2", evidence: "“The point (1, 2) lies on the curve because 1 + 8 + 4 = 13… dy/dx = −5/4… y − 2 = −(5/4)(x − 1)”", why: "It verifies the point, evaluates the slope, and writes the line in point-slope form." },
      { row: "(c) Horizontal tangents", earned: "3/3", evidence: "“x = −2y… −3y² = 13. Since −3y² ≤ 0 and 13 > 0, there is no real solution”", why: "It sets the numerator to zero, substitutes, and justifies the absence of solutions — a complete argument rather than “none”." },
      { row: "(d) Limit as derivative", earned: "2/2", evidence: "“the definition of the derivative, so it equals f′(3)… f′(x) = 2x sin x + x² cos x, hence f′(3) ≈ −8.063”", why: "It recognises the difference-quotient form, names the rule used, and evaluates." },
    ],
    craft: [
      "When differentiating 4xy, write the product rule out — that is where the marks are.",
      "Check that a given point is on the curve before using it.",
      "For horizontal tangents, set the numerator to zero and test whether the result is on the curve.",
      "Recognise limit-of-difference-quotient questions as derivative evaluations.",
    ],
    avoids: [
      "Forgetting the chain rule on y.",
      "Declaring “no horizontal tangents” without the algebra.",
      "Applying the quotient rule to the difference quotient.",
    ],
    scale: "About 220 words — roughly 16 minutes.",
  },
  {
    frqId: "ap-calc-frq-4",
    courseSlug: "ap-calc",
    kind: "short-answer",
    label: "Question 4 · Free response, no calculator",
    title: "Area, volume by squares, and a rotation integral",
    score: "9 / 9",
    framing:
      "Part (b) needs the cross-section expression (side length is f(x), so area is f(x)²); part (c) is explicitly “write, but do not evaluate”, so the integral must be correct and unevaluated, with the correct radii.",
    sections: [
      {
        paragraphs: [
          "(a) The graph of f(x) = 4 − x² meets the x-axis at x = ±2, so R = { (x, y) : −2 ≤ x ≤ 2, 0 ≤ y ≤ 4 − x² }. Area = ∫_{−2}^{2} (4 − x²) dx = [4x − x³/3]_{−2}^{2} = (8 − 8/3) − (−8 + 8/3) = 32/3.",
          "(b) Squares perpendicular to the x-axis have side length s(x) = 4 − x², so each cross-section has area s(x)² = (4 − x²)². Volume = ∫_{−2}^{2} (4 − x²)² dx = ∫_{−2}^{2} (16 − 8x² + x⁴) dx = [16x − (8/3)x³ + x⁵/5]_{−2}^{2} = 512/15.",
          "(c) Rotating R about the horizontal line y = 5 produces washers: the outer radius is 5 − 0 = 5 and the inner radius is 5 − (4 − x²) = 1 + x². So V = π ∫_{−2}^{2} [5² − (1 + x²)²] dx = π ∫_{−2}^{2} [25 − (1 + x²)²] dx. (Not evaluated, as instructed.)",
        ],
      },
    ],
    breakdown: [
      { row: "(a) Area", earned: "3/3", evidence: "“Area = ∫_{−2}^{2} (4 − x²) dx = [4x − x³/3]_{−2}^{2} = 32/3”", why: "Intersection points, integral setup, antiderivative, and exact value are all present." },
      { row: "(b) Volume, square cross-sections", earned: "3/3", evidence: "“side length s(x) = 4 − x², so each cross-section has area s(x)²… Volume = ∫ (4 − x²)² dx = 512/15”", why: "It identifies the side length, squares it for area, integrates, and gives the exact value — the two-step reasoning the guideline rewards." },
      { row: "(c) Rotation integral", earned: "3/3", evidence: "“the outer radius is 5 − 0 = 5 and the inner radius is 5 − (4 − x²) = 1 + x². So V = π ∫_{−2}^{2} [5² − (1 + x²)²] dx”", why: "Both radii are derived from the axis of rotation, the difference of squares is set up correctly, and the integral is left unevaluated as the prompt requires." },
    ],
    craft: [
      "For cross-sections, find the side length first, then the area, then integrate.",
      "For a rotation about y = k, both radii are measured from that line.",
      "Obey “write, but do not evaluate” literally.",
      "Give exact values (32/3, 512/15) rather than decimals when there is no calculator.",
    ],
    avoids: [
      "Using f(x)² as the volume integral when the region is not square-based.",
      "Assuming the inner radius is zero when rotating about y = 5.",
      "Evaluating an integral the question asked you to leave alone.",
    ],
    scale: "About 220 words — roughly 16 minutes.",
  },
  {
    frqId: "ap-calc-frq-5",
    courseSlug: "ap-calc",
    kind: "short-answer",
    label: "Question 5 · Free response, no calculator",
    title: "Particle motion — rest, distance, and direction",
    score: "9 / 9",
    framing:
      "Distance is not displacement. The response splits the interval wherever v changes sign, integrates each piece, and takes absolute values, which is exactly what the guideline checks.",
    sections: [
      {
        paragraphs: [
          "(a) The particle is at rest where v(t) = 0: t² − 6t + 8 = (t − 2)(t − 4) = 0, so t = 2 and t = 4 seconds. Both lie in (0, 5).",
          "(b) Distance travelled = ∫₀⁵ |v(t)| dt. Since v > 0 on (0, 2), v < 0 on (2, 4), and v > 0 on (4, 5), the integral splits into ∫₀² v dt − ∫₂⁴ v dt + ∫₄⁵ v dt. With antiderivative s(t) = t³/3 − 3t² + 8t (taking s(0) = 0): s(2) = 8/3 − 12 + 16 = 20/3 ≈ 6.667; s(4) = 64/3 − 48 + 32 = 16/3 ≈ 5.333; s(5) = 125/3 − 75 + 40 = 20/3 ≈ 6.667. Distance = |20/3 − 0| + |16/3 − 20/3| + |20/3 − 16/3| = 20/3 + 4/3 + 4/3 = 28/3 ≈ 9.333 metres.",
          "(c) a(t) = v′(t) = 2t − 6, so a(1) = −4 m/s². At t = 1, v(1) = 1 − 6 + 8 = 3 m/s, which is positive, so the particle is moving in the positive direction while its acceleration is negative: it is slowing down at that instant.",
          "(d) Position at t = 5 is x(5) = x(0) + ∫₀⁵ v dt = 3 + [s(5) − s(0)] = 3 + 20/3 = 29/3 ≈ 9.667 metres, since the displacement is the net (signed) integral, not the distance.",
        ],
      },
    ],
    breakdown: [
      { row: "(a) Times at rest", earned: "2/2", evidence: "“t² − 6t + 8 = (t − 2)(t − 4) = 0, so t = 2 and t = 4 seconds”", why: "It factors and solves, and confirms both solutions are in the specified interval." },
      { row: "(b) Total distance", earned: "3/3", evidence: "“∫₀⁵ |v(t)| dt… the integral splits into ∫₀² v dt − ∫₂⁴ v dt + ∫₄⁵ v dt… Distance = 20/3 + 4/3 + 4/3 = 28/3”", why: "It identifies the sign changes, integrates each subinterval separately with correct signs, and reaches an exact total — the standard three-point split." },
      { row: "(c) Acceleration and description", earned: "2/2", evidence: "“a(1) = −4 m/s². At t = 1, v(1) = 3 m/s, which is positive… it is slowing down”", why: "It gives the acceleration value with units and interprets the opposing signs as deceleration." },
      { row: "(d) Position", earned: "2/2", evidence: "“x(5) = x(0) + ∫₀⁵ v dt = 3 + 20/3 = 29/3”", why: "It uses the initial condition and the net displacement, distinguishing position from distance." },
    ],
    craft: [
      "Factor the velocity to find sign changes before integrating.",
      "Split the distance integral at every zero of v.",
      "Use v and a signs together to describe speeding up or slowing down.",
      "Position uses signed displacement; distance uses absolute value.",
    ],
    avoids: [
      "Reporting ∫₀⁵ v dt as the distance.",
      "Forgetting the initial position.",
      "Saying “accelerating” when the particle is slowing down.",
    ],
    scale: "About 260 words — roughly 17 minutes.",
  },
  {
    frqId: "ap-calc-frq-6",
    courseSlug: "ap-calc",
    kind: "short-answer",
    label: "Question 6 · Free response, no calculator",
    title: "Reading a derivative graph",
    score: "9 / 9",
    framing:
      "With g′ given, every question is an area or a sign. The response states the area interpretation explicitly for each extreme, because “because g′ changes from negative to positive” is the justification, not a description.",
    sections: [
      {
        paragraphs: [
          "(a) g has a local minimum at x = −1. Justification: g′(x) = 0 there (the graph of g′ crosses the x-axis between (−4, −3) and (2, 3), at x = −1), and g′ changes from negative to positive at that point, so g changes from decreasing to increasing.",
          "(b) g is concave down where g′ is decreasing, which is the interval (2, 4): on that stretch the graph of g′ falls from 3 to 0, so g′ is decreasing and therefore g″ < 0.",
          "(c) Using g(0) = 1 and areas under g′: g(4) = g(0) + ∫₀⁴ g′(x) dx = 1 + 4 + 3 = 8, where 4 is the trapezoid area from x = 0 to x = 2 (average height 2, base 2) and 3 is the triangle area from x = 2 to x = 4 (base 2, height 3). For x < 0, g(−4) = g(0) − ∫_{−4}^{0} g′(x) dx = 1 − (−4) = 5, since the region from −4 to 0 lies below the axis and has signed area −4. Because g increases on (−1, 4) and decreases on (−4, −1), the absolute maximum on [−4, 4] occurs at an endpoint: g(−4) = 5 and g(4) = 8, so the absolute maximum is g(4) = 8.",
          "(d) g(4) = 8, as computed by adding the signed areas under g′ to g(0) = 1.",
        ],
      },
    ],
    breakdown: [
      { row: "(a) Local minimum", earned: "3/3", evidence: "“g′(x) = 0 there… and g′ changes from negative to positive at that point, so g changes from decreasing to increasing”", why: "The location is correct and the justification is the sign change of g′, which is the required reasoning rather than “the graph goes down then up”." },
      { row: "(b) Concavity", earned: "2/2", evidence: "“g is concave down where g′ is decreasing, which is the interval (2, 4)”", why: "It connects concavity to g′ decreasing and identifies the interval from the graph." },
      { row: "(c) Absolute maximum", earned: "2/2", evidence: "“g(−4) = 1 − (−4) = 5… g(4) = 8, so the absolute maximum is g(4) = 8”", why: "It evaluates both endpoints using signed areas and compares them — the complete argument for an absolute extremum on a closed interval." },
      { row: "(d) Value of g(4)", earned: "2/2", evidence: "“g(4) = g(0) + ∫₀⁴ g′(x) dx = 1 + 4 + 3 = 8”", why: "The Fundamental Theorem is applied with the initial condition and the correct areas." },
    ],
    craft: [
      "Translate every question into a statement about the sign or the area of g′.",
      "Justify extrema with the sign change of g′, not with the appearance of g.",
      "Use signed area below the axis.",
      "Check both endpoints when the domain is closed.",
    ],
    avoids: [
      "Reading g′ as if it were g.",
      "Treating area below the x-axis as positive when computing g.",
      "Assuming an interior point is the absolute maximum.",
    ],
    scale: "About 260 words — roughly 17 minutes.",
  },
];

const AP_MACRO: Exemplar[] = [
  {
    frqId: "ap-macro-frq-1",
    courseSlug: "ap-macro",
    kind: "short-answer",
    label: "Question 1 · Long free response",
    title: "Closing a $200 billion recessionary gap",
    score: "10 / 10",
    framing:
      "The graph must be described precisely, the multiplier must be shown, and part (d) is a trap: a tax cut does less per dollar than a spending increase because the first increment is saved, so the two multipliers must be handled separately. The scoring points are in the arithmetic and the chain of causation.",
    sections: [
      {
        paragraphs: [
          "(a) The AD–AS diagram is drawn with real GDP on the horizontal axis and the price level on the vertical. The short-run aggregate supply curve slopes upward; the aggregate demand curve slopes downward and intersects SRAS at an equilibrium real GDP to the left of the long-run aggregate supply curve, which is drawn vertical at full-employment output. The horizontal distance between the equilibrium output and full-employment output is labelled the recessionary gap, and the price level at the new intersection is labelled PL₁, lower than the full-employment price level.",
          "(b) The spending multiplier is 1/(1 − MPC) = 1/(1 − 0.8) = 5. The minimum change in government spending required is ΔG = gap / multiplier = $200 billion / 5 = $40 billion. An increase in government spending of $40 billion shifts aggregate demand right by $200 billion once the multiplier process works through consumption.",
          "(c) Financing the spending increase raises the government's demand for loanable funds, shifting the demand curve for loanable funds to the right. The equilibrium real interest rate rises. Higher real interest rates crowd out some private investment and interest-sensitive consumption, so the realised increase in aggregate demand is somewhat smaller than the initial multiplier calculation implies — which is why the $40 billion figure is a minimum.",
          "(d) The tax multiplier is −MPC/(1 − MPC) = −0.8/0.2 = −4, so a $200 billion tax cut raises equilibrium output by 4 × $200 billion = $800 billion — far more than the $200 billion gap, and four times the effect of the $40 billion spending increase. The two tools differ because a dollar of new government spending is spent in full, while a dollar of tax cut first passes through households that save 20% of it: the first-round change in consumption is only 0.8 × $200 billion = $160 billion, and the multiplier then works on that smaller amount. Because the tax cut is less powerful per dollar than spending, closing the gap exactly with taxes alone would require a cut of $200 billion ÷ 4 = $50 billion.",
        ],
      },
    ],
    breakdown: [
      { row: "(a) Graph", earned: "3/3", evidence: "“the aggregate demand curve slopes downward and intersects SRAS at an equilibrium real GDP to the left of the long-run aggregate supply curve… The horizontal distance… is labelled the recessionary gap”", why: "Axes, all three curves, labels and the gap are all specified, which is what the graph point requires." },
      { row: "(b) Calculation", earned: "3/3", evidence: "“The spending multiplier is 1/(1 − MPC) = 1/(1 − 0.8) = 5… ΔG = gap / multiplier = $200 billion / 5 = $40 billion”", why: "The multiplier formula, its substitution, the division, and the units are all shown." },
      { row: "(c) Loanable funds", earned: "2/2", evidence: "“raises the government's demand for loanable funds, shifting the demand curve for loanable funds to the right. The equilibrium real interest rate rises… crowd out some private investment”", why: "It traces the financing to the interest rate and to crowding out, which is the required chain." },
      { row: "(d) Tax versus spending", earned: "2/2", evidence: "“the tax multiplier is −0.8/0.2 = −4, so a $200 billion tax cut raises equilibrium output by $800 billion… the first-round change in consumption is only 0.8 × $200 billion = $160 billion”", why: "It computes the tax multiplier correctly, applies it, and explains the difference from spending through the marginal propensity to save — the reasoning the rubric asks for." },
    ],
    craft: [
      "Label axes, curves, equilibrium, and the gap — an unlabelled graph earns nothing.",
      "Write the multiplier formula before substituting.",
      "Trace fiscal policy through loanable funds to interest rates in every long FRQ.",
      "For tax versus spending, use the MPC to explain the first-round difference.",
    ],
    avoids: [
      "Using the tax multiplier when the question asks about spending.",
      "A graph with no long-run curve.",
      "Claiming government spending has no effect on interest rates.",
    ],
    scale: "About 330 words — roughly 25 minutes.",
  },
  {
    frqId: "ap-macro-frq-2",
    courseSlug: "ap-macro",
    kind: "short-answer",
    label: "Question 2 · Short free response",
    title: "Contractionary open-market operations",
    score: "5 / 5",
    framing:
      "Above full employment means inflationary gap, so the central bank sells bonds. The chain from the money market to investment to aggregate demand is the answer; the limitation is about time lags and the political constraints, not about the graph.",
    sections: [
      {
        paragraphs: [
          "(a) The money market is drawn with the nominal interest rate on the vertical axis and the quantity of money on the horizontal. The money supply curve is vertical; the money demand curve slopes downward. To reduce aggregate demand the central bank sells government bonds, which removes reserves from the banking system, so the money supply curve shifts left and the equilibrium nominal interest rate rises from i₁ to i₂.",
          "(b) The higher nominal interest rate raises the real cost of borrowing, so firms reduce planned investment and households reduce interest-sensitive consumption such as durable goods and housing. Lower investment is a component of aggregate demand, so the aggregate demand curve shifts left, moving the economy back toward full employment and reducing the price level.",
          "(c) One limitation is the recognition-and-impact lag: the central bank must first identify the output gap, then the policy works through lending and spending decisions that take months to change, so the tightening may bite after the economy has already corrected itself. A second limitation is that investment may not respond much if firms are pessimistic about future demand, in which case higher interest rates reduce output more slowly than the model predicts.",
        ],
      },
    ],
    breakdown: [
      { row: "(a) Money market", earned: "2/2", evidence: "“The money supply curve is vertical… the central bank sells government bonds, which removes reserves… so the money supply curve shifts left and the equilibrium nominal interest rate rises”", why: "The graph is described with correct axes and shifts, and the operation is linked to reserves." },
      { row: "(b) Transmission", earned: "2/2", evidence: "“higher nominal interest rate raises the real cost of borrowing, so firms reduce planned investment… so the aggregate demand curve shifts left”", why: "The chain interest rate → investment → AD is complete, which is the point being scored." },
      { row: "(c) Limitation", earned: "1/1", evidence: "“the recognition-and-impact lag… investment may not respond much if firms are pessimistic”", why: "It names a specific limitation with a mechanism rather than saying monetary policy “sometimes fails”." },
    ],
    craft: [
      "State the policy action first: sell bonds to contract.",
      "Draw the chain explicitly: reserves → money supply → interest rate → investment → AD.",
      "For limitations, name the lag or the responsiveness problem.",
    ],
    avoids: [
      "Buying bonds when the economy is above full employment.",
      "Confusing the money market with the loanable funds market.",
      "A limitation that is really a restatement of the policy.",
    ],
    scale: "About 210 words — roughly 15 minutes.",
  },
  {
    frqId: "ap-macro-frq-3",
    courseSlug: "ap-macro",
    kind: "short-answer",
    label: "Question 3 · Short free response",
    title: "Higher U.S. rates and the dollar",
    score: "5 / 5",
    framing:
      "The foreign exchange market for dollars is a supply-and-demand diagram where the price is the euro price of a dollar. Higher U.S. rates attract capital, so demand for dollars rises and the dollar appreciates.",
    sections: [
      {
        paragraphs: [
          "(a) The foreign exchange market is drawn with the euro price of a dollar on the vertical axis and the quantity of dollars on the horizontal. Demand for dollars slopes downward, supply slopes upward, and the equilibrium exchange rate is initially e₁. Because higher U.S. real interest rates make dollar-denominated assets more attractive relative to euro-denominated assets, European investors demand more dollars to buy U.S. financial assets; the demand curve for dollars shifts right and the equilibrium value of the dollar rises to e₂ — the dollar appreciates.",
          "(b) A stronger dollar makes U.S. exports more expensive for foreign buyers and imports cheaper for Americans, so exports fall and imports rise. Net exports therefore decline.",
          "(c) The decline in net exports reduces aggregate demand, shifting the AD curve left. A leftward shift in aggregate demand lowers both real output and the price level in the short run, so the appreciation feeds back into the domestic economy as slower growth and reduced inflationary pressure.",
        ],
      },
    ],
    breakdown: [
      { row: "(a) Foreign exchange graph", earned: "2/2", evidence: "“the euro price of a dollar on the vertical axis… the demand curve for dollars shifts right and the equilibrium value of the dollar rises to e₂”", why: "The price on the axis is the euro price of a dollar, and the shift is traced to the capital flow, which is what the graph point rewards." },
      { row: "(b) Net exports", earned: "2/2", evidence: "“a stronger dollar makes U.S. exports more expensive… so exports fall and imports rise. Net exports therefore decline.”", why: "Both directions are stated with the price mechanism." },
      { row: "(c) Feedback", earned: "1/1", evidence: "“reduces aggregate demand, shifting the AD curve left… lowers both real output and the price level”", why: "It carries the change through to AD and the price level, which the prompt asks for explicitly." },
    ],
    craft: [
      "Label the exchange rate as the foreign-currency price of the domestic currency.",
      "Trace the capital flow: rate differential → demand for dollars → appreciation.",
      "Say exports fall and imports rise, then net exports fall.",
    ],
    avoids: [
      "Plotting the dollar price of euros.",
      "Stopping at “the dollar appreciates” without the AD consequence.",
      "Confusing appreciation with an increase in the quantity of dollars.",
    ],
    scale: "About 190 words — roughly 14 minutes.",
  },
];

const AP_ENV: Exemplar[] = [
  {
    frqId: "ap-env-frq-1",
    courseSlug: "ap-env",
    kind: "short-answer",
    label: "Question 1 · Investigation design",
    title: "Testing whether a development is feeding the algae",
    score: "9 / 9",
    framing:
      "Design questions are graded on operational specificity: a named variable, an instrument, a control site, and constants. The consequence and the management strategy each need a mechanism.",
    sections: [
      {
        paragraphs: [
          "(a) Nitrate concentration (mg/L NO₃⁻-N), with phosphate as a secondary indicator, would show nutrient pollution. It would be measured by collecting surface water samples at a fixed depth in clean amber bottles, filtering them, and analysing with a portable spectrophotometer or a colorimetric test kit; three replicate samples per site, taken at the same time of day, would be averaged.",
          "(b) Sample along transects running from the shoreline nearest the development out to open water, plus an upstream reference inlet and a comparable lake arm with no development as controls. Compare nitrate and phosphate concentrations and algal chlorophyll-a across sites. Hold sampling date and season, depth, time of day, and bottle handling constant, and record rainfall in the preceding 48 hours to account for runoff events. If concentrations fall with distance from the development and are elevated relative to the undeveloped arm, the development is implicated.",
          "(c) Continued nutrient loading causes eutrophication, which leads to hypoxia. The added nutrients allow algae to bloom; when the algae die they sink and are decomposed by aerobic bacteria, whose respiration consumes dissolved oxygen faster than it is replaced, so deep water drops below the 2 mg/L threshold and fish that cannot escape die.",
          "(d) A vegetated riparian buffer strip between the lawns and the shoreline, combined with a septic inspection and maintenance programme, would reduce loading. The buffer slows surface runoff so sediment settles, and plant roots take up dissolved nitrogen and phosphorus while soil microbes denitrify part of the load, so less nutrient reaches the lake; repairing failing septic systems removes a direct point source of nutrients and pathogens.",
        ],
      },
    ],
    breakdown: [
      { row: "(a) Variable and measurement", earned: "2/2", evidence: "“Nitrate concentration (mg/L NO₃⁻-N)… analysed with a portable spectrophotometer or a colorimetric test kit; three replicate samples per site”", why: "It names the variable with units, the instrument, and replication — the components the design row separates." },
      { row: "(b) Investigation with control", earned: "3/3", evidence: "“an upstream reference inlet and a comparable lake arm with no development as controls… Hold sampling date and season, depth, time of day, and bottle handling constant”", why: "There is a genuine comparison, listed constants, and a stated inference rule." },
      { row: "(c) Consequence and mechanism", earned: "2/2", evidence: "“algae… sink and are decomposed by aerobic bacteria, whose respiration consumes dissolved oxygen faster than it is replaced”", why: "The consequence is named and the sequence from nutrient to oxygen depletion is explained." },
      { row: "(d) Management", earned: "2/2", evidence: "“The buffer slows surface runoff so sediment settles, and plant roots take up dissolved nitrogen and phosphorus while soil microbes denitrify part of the load”", why: "The strategy includes the mechanism by which it reduces loading, not just a policy name." },
    ],
    craft: [
      "Name the pollutant and its unit; “water quality” is not a variable.",
      "Specify an instrument and a replicate count.",
      "Include a control site and a list of constants.",
      "Give each management strategy a mechanism sentence.",
    ],
    avoids: [
      "Proposing a solution without explaining how it interrupts the pathway.",
      "A control that is simply “another lake”.",
      "Describing eutrophication as “too much algae” without the oxygen step.",
    ],
    scale: "About 300 words — roughly 22 minutes.",
  },
  {
    frqId: "ap-env-frq-2",
    courseSlug: "ap-env",
    kind: "short-answer",
    label: "Question 2 · Problem analysis",
    title: "Emissions from a regional electricity mix",
    score: "9 / 9",
    framing:
      "Two calculations, each requiring a visible chain of units, then two mechanism answers. The intensity calculation is a weighted average, which is the step most responses skip.",
    sections: [
      {
        paragraphs: [
          "(a) Coal generation = 0.60 × 4,800 GWh = 2,880 GWh = 2.88 × 10⁹ kWh. Emissions = 2.88 × 10⁹ kWh × 1,000 g CO₂/kWh = 2.88 × 10¹² g = 2.88 × 10⁶ tonnes ≈ 2.88 million tonnes of CO₂ per year.",
          "(b) The CO₂ intensity of the mix is the generation-weighted average of the fuel intensities: (0.60 × 1,000) + (0.25 × 450) + (0.15 × 0) = 600 + 112.5 + 0 = 712.5 g CO₂ per kWh.",
          "(c) Coal combustion releases sulphur dioxide and nitrogen oxides, which react in the atmosphere to form sulphuric and nitric acids and return as acid deposition. Acid deposition acidifies soils and lakes, mobilises aluminium that damages fish gills, and leaches base cations such as calcium from soil, reducing forest growth. Coal also emits fine particulate matter and mercury, and coal ash contains heavy metals that can leach from storage ponds.",
          "(d) The region may not replace coal immediately because wind is intermittent and the grid needs firm capacity and transmission to integrate it, while closing a coal plant strand assets and threatens local employment. A policy that addresses this is a capacity mechanism combined with storage investment and a transmission build-out: paying for firm capacity lets the grid keep reliability without coal, and funding batteries or pumped hydro makes wind output dispatchable.",
        ],
      },
    ],
    breakdown: [
      { row: "(a) Coal emissions", earned: "3/3", evidence: "“2,880 GWh = 2.88 × 10⁹ kWh… × 1,000 g CO₂/kWh = 2.88 × 10¹² g = 2.88 × 10⁶ tonnes”", why: "The unit chain from GWh to kWh to grams to tonnes is visible and correct, which is what earns the calculation points." },
      { row: "(b) Intensity", earned: "2/2", evidence: "“(0.60 × 1,000) + (0.25 × 450) + (0.15 × 0) = 600 + 112.5 + 0 = 712.5 g CO₂ per kWh”", why: "It weights each fuel by its share and includes the zero-carbon share explicitly." },
      { row: "(c) Impact", earned: "2/2", evidence: "“sulphur dioxide and nitrogen oxides, which react in the atmosphere to form sulphuric and nitric acids… mobilises aluminium that damages fish gills”", why: "An impact other than CO₂ is named with its chemical pathway and a biological consequence." },
      { row: "(d) Constraint and policy", earned: "2/2", evidence: "“wind is intermittent and the grid needs firm capacity… a capacity mechanism combined with storage investment and a transmission build-out”", why: "The barrier is specific and the policy is matched to it, rather than a general call for “more renewables”." },
    ],
    craft: [
      "Write the unit conversion as a chain: GWh → kWh → g → tonnes.",
      "For a mix, weight each fuel's intensity by its share.",
      "Name a pollutant and its chemical pathway, not just “pollution”.",
      "Match the policy to the specific barrier you named.",
    ],
    avoids: [
      "Multiplying total generation by coal's intensity without applying the 60% share.",
      "Reporting grams when the question asks for million tonnes.",
      "A policy with no connection to the stated reason.",
    ],
    scale: "About 280 words — roughly 22 minutes.",
  },
  {
    frqId: "ap-env-frq-3",
    courseSlug: "ap-env",
    kind: "short-answer",
    label: "Question 3 · Solution and justification",
    title: "Diverting organics from a coastal landfill",
    score: "9 / 9",
    framing:
      "Arithmetic with a per-capita conversion, then a mechanism for the landfill problem, then a strategy justified on two axes — environmental and economic — and honestly limited.",
    sections: [
      {
        paragraphs: [
          "(a) Annual waste = 1,100 tonnes/day × 365 days = 401,500 tonnes/year = 401,500,000 kg/year. Per capita = 401,500,000 kg ÷ 900,000 people ≈ 446 kg per person per year, or about 1.22 kg per person per day.",
          "(b) Landfilled waste produces leachate: rainwater percolating through the waste dissolves organic acids, heavy metals, and salts, and if the liner or leachate collection system fails, this liquid contaminates groundwater used for drinking. Anaerobic decomposition also generates methane, a greenhouse gas with far greater warming potential than CO₂ over twenty years, and the landfill occupies land that cannot be developed while it is capped.",
          "(c) Separate collection of food scraps and yard waste for composting would reduce landfilled tonnage. Environmentally, diverting organics removes the material that produces most landfill methane and reduces leachate strength; composting returns carbon and nutrients to soil and improves water retention. Economically, it lowers tipping fees and extends landfill life, avoiding the capital cost of a new cell, and finished compost can be sold or used on municipal land, offsetting collection costs.",
          "(d) A limitation is contamination: if residents put plastic or glass in the organics bin, the compost is unusable and the load may be landfilled anyway. That can be mitigated with pay-as-you-throw pricing, a separate small bin for organics, clear labelling in the languages spoken locally, and a sampling programme at the composting facility that gives neighbourhood-level feedback.",
        ],
      },
    ],
    breakdown: [
      { row: "(a) Per-capita calculation", earned: "3/3", evidence: "“401,500 tonnes/year = 401,500,000 kg/year… ÷ 900,000 people ≈ 446 kg per person per year”", why: "Tonnes per day are converted to tonnes per year, then to kilograms, then divided by population, with the intermediate results shown." },
      { row: "(b) Landfill problem", earned: "2/2", evidence: "“rainwater percolating through the waste dissolves organic acids, heavy metals, and salts… this liquid contaminates groundwater”", why: "It names leachate and explains its formation and its pathway to groundwater." },
      { row: "(c) Strategy with two justifications", earned: "2/2", evidence: "“diverting organics removes the material that produces most landfill methane… it lowers tipping fees and extends landfill life”", why: "Both an environmental and an economic reason are given, each with a mechanism." },
      { row: "(d) Limitation and mitigation", earned: "2/2", evidence: "“if residents put plastic or glass in the organics bin, the compost is unusable… mitigated with pay-as-you-throw pricing… and a sampling programme”", why: "The limitation is realistic and the mitigation is specific to it." },
    ],
    craft: [
      "Convert per day to per year before dividing by population, and show the intermediate numbers.",
      "Name leachate and methane separately; they are different problems.",
      "Give one environmental and one economic justification, each with a mechanism.",
      "Choose a limitation you can actually mitigate.",
    ],
    avoids: [
      "Forgetting the 365-day conversion.",
      "Reporting kg per day when asked for per year.",
      "A limitation followed by a vague call for “more education”.",
    ],
    scale: "About 290 words — roughly 22 minutes.",
  },
];

const AP_SEMINAR: Exemplar[] = [
  {
    frqId: "ap-seminar-part-a",
    courseSlug: "ap-seminar",
    kind: "short-answer",
    label: "Part A · Argument analysis",
    title: "Analysing the automation article — identify, explain, evaluate",
    score: "15 / 15",
    framing:
      "Part A is three separate tasks worth 3, 6 and 6 points. The middle task wants the *connections* between claims, not a list of them; the third wants judgement about the evidence, not agreement with the author.",
    sections: [
      {
        paragraphs: [
          "1. The author's argument, in my words: technological change destroys particular jobs but expands total employment, because cheaper production per unit lets firms expand and because the new jobs require different, harder-to-automate skills. The claim is qualified in one important way: the historical pattern is offered as a reason not to block automation, but the author concedes that the transition can be brutal for the individuals displaced, and concludes that policy should therefore smooth transitions rather than prevent the technology.",
          "2. The line of reasoning runs through three linked claims. The first is a mechanism claim — that automation lowers costs, which lets firms serve more customers and open more sites. The second is the evidence for that mechanism: the ATM example, in which cheaper branches produced a 10% increase in teller employment between 1980 and 2010, and the CAD example, in which cheaper design iteration expanded the design industry. The third is a scope claim: the aggregate gain does not distribute itself, because a 55-year-old machinist cannot become a CNC programmer without retraining. That third claim is what licenses the policy conclusion, and it is the pivot of the article: the author moves from an economic claim (jobs are created) to a political one (therefore support transition programmes, not restrictions), and the pivot depends on accepting that the displaced worker's loss is real even when the aggregate is positive.",
          "3. The evidence is relevant and well chosen for the mechanism, but it is not sufficient for the generalisation it supports. The ATM and CAD cases are both examples of a technology that automated a routine task inside an expanding market, which is the most favourable case for the author's claim; they do not show what happens when automation removes a task in a shrinking industry or in a region that cannot attract the new jobs. The employment figures are also presented without a source or a comparison group, so the reader cannot check whether the 10% figure reflects automation or the deregulation-driven branch expansion of the same period. The article's strongest evidence is its weakest link: the concession about the 55-year-old machinist is an admission that the model has distributive costs, and the author provides no evidence about how large those costs are or how long transitions take. The reasoning is therefore coherent and honestly qualified, but it establishes a conditional conclusion — automation is beneficial when transition support exists — rather than the broader one the policy recommendation implies.",
        ],
      },
    ],
    breakdown: [
      { row: "Identify the argument", earned: "3/3", evidence: "“technological change destroys particular jobs but expands total employment… The claim is qualified in one important way… the author concedes that the transition can be brutal”", why: "It restates the thesis accurately in the writer's own words and captures the qualification, which is what separates a 3 from a 2." },
      { row: "Explain the line of reasoning", earned: "6/6", evidence: "“the author moves from an economic claim (jobs are created) to a political one (therefore support transition programmes, not restrictions), and the pivot depends on accepting that the displaced worker's loss is real”", why: "It identifies multiple claims and explains how each supports the next, including the pivot on which the conclusion depends — the connection work the row rewards." },
      { row: "Evaluate the evidence", earned: "6/6", evidence: "“both examples of a technology that automated a routine task inside an expanding market, which is the most favourable case… the employment figures are also presented without a source or a comparison group”", why: "It judges relevance, scope and credibility, and says what the evidence cannot establish — evaluation rather than description." },
    ],
    craft: [
      "Restate the argument with its qualification attached.",
      "Build task 2 around transitions: claim → evidence → conclusion.",
      "In task 3, name what the evidence cannot show, then judge sufficiency.",
      "Never simply agree with or attack the author; evaluate the argument's construction.",
    ],
    avoids: [
      "A task 2 that lists points without connecting them.",
      "A task 3 that summarises the evidence instead of judging it.",
      "Confusing the author's examples with the author's claim.",
    ],
    scale: "About 420 words — roughly 30 minutes.",
  },
  {
    frqId: "ap-seminar-part-b",
    courseSlug: "ap-seminar",
    kind: "essay",
    label: "Part B · Evidence-based argument",
    title: "Should governments invest in space exploration?",
    score: "24 / 24",
    framing:
      "The Part B rubric has four rows of six: perspective, reasoning, evidence, and conventions. The exemplar uses all four sources — including the one that rejects the premise — and keeps a single, qualified perspective visible in every paragraph.",
    sections: [
      {
        paragraphs: [
          "Governments should invest in space exploration, but not at the scale and in the form its advocates usually defend. The strongest case for public spending in space is not the spinoffs or the spectacle; it is that some of the work — Earth observation, climate monitoring, and the scientific questions that no single firm can capture the returns from — is a public good that markets under-provide. Judged by that standard, the right programme is smaller than a Mars-first ambition, more heavily weighted toward Earth observation and basic science, and explicitly justified by what it produces that no one else would produce.",
          "Source 1 makes the conventional economic case: a return of seven to fourteen dollars per dollar invested, and thousands of commercial products. That claim is weaker than it looks, and Source 1 itself supplies the reason — the James Webb telescope's $10 billion might have produced higher immediate returns as infrastructure. A multiplier that counts every downstream product as a return of the space programme is close to unfalsifiable, because it cannot distinguish discovery that required space from discovery that space happened to fund. The stronger economic argument is narrower: launch and satellite infrastructure has network characteristics, and government investment in it lowers costs for everyone, which is visible in the 90% fall in launch costs that Source 4 attributes to private competition operating on publicly funded foundations.",
          "Source 2 shifts the argument from economics to capability, and this is where the case becomes defensible. Earth-observing satellites are the instruments on which climate monitoring, disaster response, and agricultural planning depend; the data are non-excludable and non-rival in a way that makes private provision unlikely, because a firm cannot charge every farmer who benefits from a weather forecast. That is the textbook justification for public provision, and it survives Source 3's objection.",
          "Source 3 is the strongest challenge, and it deserves a direct answer rather than a dismissal. It argues that the cost of a single Mars mission could provide clean water to everyone who lacks it, and that the spinoff argument proves too much, since anything might produce useful knowledge. The first point is an opportunity-cost claim, and it is partly right: at the margin, a dollar spent on a Mars mission is not spent on water infrastructure. But the comparison is not genuinely either-or. Public budgets are not a single pool in which space competes dollar-for-dollar with development assistance, and the programmes that deliver water infrastructure are funded by different institutions with different mandates. The second point is the more damaging one, and the correct response is to accept it: the spinoff argument should be abandoned, not defended, because a benefit that could have been produced more cheaply by direct research is not a reason to fund the indirect route.",
          "Source 4 adds a dimension the other sources ignore: the strategic environment. If China is returning lunar samples, building a permanent station, and planning crewed missions, and if satellites are essential to navigation and surveillance, then a state that disinvests does not opt out of competition; it accepts a subordinate position in it. This is an argument about relative position rather than absolute benefit, and it is the reason the question cannot be answered by comparing a space budget with a water budget in isolation.",
          "The perspective this yields is deliberately conditional: public investment should be concentrated on Earth observation, basic science, and technologies with non-excludable benefits, and on maintaining the infrastructure that keeps the strategic position from deteriorating, while funding water and development directly rather than relying on spinoffs to deliver them. That position uses all four sources, concedes the strongest objection, and gives up the weakest argument rather than defending everything. It also states what would change its mind: if Earth-observation data could be supplied commercially at comparable cost and coverage, the public-good case would shrink to basic science alone.",
        ],
      },
    ],
    breakdown: [
      { row: "Establish a perspective", earned: "6/6", evidence: "“Governments should invest in space exploration, but not at the scale and in the form its advocates usually defend… a public good that markets under-provide”", why: "The perspective is nuanced, responds directly to the question, and is restated and developed in every paragraph rather than announced once." },
      { row: "Establish reasoning", earned: "6/6", evidence: "“Source 3 is the strongest challenge… The first point is an opportunity-cost claim, and it is partly right… The second point is the more damaging one, and the correct response is to accept it”", why: "The argument progresses: economic case, capability case, objection, concession, strategic dimension, synthesis. Each section advances rather than repeats." },
      { row: "Select and use evidence", earned: "6/6", evidence: "“the 90% fall in launch costs that Source 4 attributes to private competition operating on publicly funded foundations”", why: "All four sources are used, each for a distinct job, and the use is accurate to what the source actually says — including a source that cuts against the thesis." },
      { row: "Apply conventions", earned: "6/6", evidence: "“The perspective this yields is deliberately conditional… It also states what would change its mind”", why: "Attribution, register, and structure are controlled; the essay reads as an academic argument with clear signposting and no unsupported assertion." },
    ],
    craft: [
      "Write a perspective that could lose an argument — a qualified claim is stronger than a slogan.",
      "Give each source a different job.",
      "Concede the best objection, and drop the weakest of your own arguments.",
      "State what would change your mind; it is the cheapest way to earn the top band.",
    ],
    avoids: [
      "Using sources as a list of quotations.",
      "Defending every argument, including the indefensible one.",
      "Ignoring the source that disagrees.",
      "A conclusion that repeats the introduction.",
    ],
    scale: "About 700 words — a full 90-minute Part B essay, abbreviated here by roughly a fifth.",
  },
];

const AP_RESEARCH: Exemplar[] = [
  {
    frqId: "ap-research-paper",
    courseSlug: "ap-research",
    kind: "paper",
    label: "Component 1 · Academic paper section",
    title: "Method, analysis, and limitations — a complete paper section",
    score: "24 / 24",
    framing:
      "This is written as a real academic paper section, on a question a student could actually pursue in one year. Note the shape: question, method with justification, analysis with numbers, alternative explanation, limitation, bounded conclusion.",
    sections: [
      {
        heading: "Research question and purpose",
        paragraphs: [
          "To what extent does access to a school garden affect ninth-grade students' self-reported vegetable consumption at one urban public high school? The purpose is not to establish a universal effect of gardens but to test, in a single bounded setting, whether a plausible mechanism — proximity, familiarity, and repeated exposure — produces a measurable change in what students report eating, and to identify what a one-school study can and cannot establish.",
        ],
      },
      {
        heading: "Method",
        paragraphs: [
          "The study used a quasi-experimental pre/post design with a comparison group, because random assignment of students to a garden programme would have been neither ethical nor feasible within the school's existing schedule. Participants were 118 ninth-grade students: 61 in four classes that received a nine-week garden curriculum (two 45-minute sessions per week, including planting, harvest, and a tasting component) and 57 in four comparable classes that continued the standard science curriculum. Classes were assigned by the school's scheduling office before the study began, and the two groups were compared on baseline consumption, gender, and eligibility for free or reduced-price lunch; no statistically significant baseline differences were found.",
          "Consumption was measured with a seven-day food frequency questionnaire administered in class before the programme and again in the final week, asking students to report how often they ate vegetables at lunch and at home. The instrument is self-report and therefore measures what students say they eat, not what they eat; this is the study's central measurement limitation. Two additional data sources were used: plate-waste observation in the cafeteria on four sampled days, counting vegetable servings taken and returned, and semi-structured interviews with twelve students, six from each group, to check whether the questionnaire categories matched how students described their own eating.",
          "Analysis used a difference-in-differences comparison of mean weekly vegetable servings, with a paired t-test within the garden group and an independent-samples test between groups, and interview transcripts were coded inductively for reasons students gave for changing or not changing their behaviour. The mixed method matters because the quantitative result establishes whether a change is detectable while the interviews establish whether the students' own explanations are consistent with the mechanism the study proposes.",
        ],
      },
      {
        heading: "Analysis and evaluation",
        paragraphs: [
          "The garden group's self-reported vegetable servings rose from a mean of 8.4 to 10.9 per week (a 30% increase; t(60) = 3.42, p < .01), while the comparison group moved from 8.6 to 8.9 (a 3.5% increase that was not statistically significant). The difference-in-differences estimate is approximately 2.2 additional servings per week. Plate-waste observation complicates the self-report: vegetable servings taken in the cafeteria rose by 12% in the garden group, but the proportion returned uneaten also rose slightly, from 31% to 34%, which suggests that some of the reported increase reflects greater willingness to take vegetables rather than greater consumption.",
          "The interviews offer a plausible mechanism and a caution. Students in the garden group most often described trying vegetables they had grown and then eating them at home because a family member cooked them, which is consistent with an exposure-and-familiarity pathway. Students who reported no change described cost, availability, and family food preferences as decisive, which indicates that the programme's effect is conditional on the household food environment rather than universal.",
          "An alternative explanation must be considered: the garden group also received nine weeks of additional adult attention and a novel activity, and novelty alone can produce short-term behaviour change. The comparison group's flat result argues against a school-wide seasonal effect, but it cannot rule out a novelty effect specific to the intervention. Evidence quality is therefore moderate: the design controls for maturation and history reasonably well, the sample is adequate for a within-school comparison, and the measurement is self-report with a corroborating but imperfect observational check.",
        ],
      },
      {
        heading: "Limitations",
        paragraphs: [
          "Three limitations bound the findings. First, self-report food frequency data are subject to social desirability bias, and students in the garden group knew the programme's purpose, so some of the reported increase may be an artefact of knowing what the study hoped to find. Second, the follow-up occurred in the final week of the programme, so the study cannot distinguish a durable change in diet from a short-term effect that decays once the garden is no longer part of the school day. Third, the sample is one school and one grade, with classes rather than students assigned to conditions, which means the effective sample size for inference is closer to eight classes than 118 students.",
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "The findings support a bounded conclusion: at this school, a nine-week garden curriculum was associated with a modest increase in self-reported vegetable consumption, roughly two additional servings per week, with observational data suggesting part of that increase involved taking vegetables rather than eating them. The study does not establish that school gardens improve adolescent diets in general, that the effect persists beyond the programme, or that the mechanism is the garden rather than the attention. The defensible next step is a follow-up measurement one semester after the programme ends, with household food-environment data collected alongside the food frequency questionnaire, which would test both durability and the conditional mechanism the interviews identified.",
        ],
      },
    ],
    breakdown: [
      { row: "Question and purpose", earned: "6/6", evidence: "“To what extent does access to a school garden affect ninth-grade students' self-reported vegetable consumption at one urban public high school?”", why: "The question names a factor, an outcome, a population and a bound, and the purpose paragraph states what the study can and cannot establish." },
      { row: "Method, process, or approach", earned: "6/6", evidence: "“a quasi-experimental pre/post design with a comparison group… classes were assigned by the school's scheduling office before the study began, and the two groups were compared on baseline consumption”", why: "Design choices are named, justified against the alternative that was infeasible, and the assignment and baseline checks are described precisely enough to be replicated." },
      { row: "Analysis and evaluation", earned: "6/6", evidence: "“rose from a mean of 8.4 to 10.9 per week (a 30% increase; t(60) = 3.42, p < .01)… Plate-waste observation complicates the self-report… An alternative explanation must be considered”", why: "Results are interpreted against the question, a competing explanation is tested, and the evidence's strength is judged rather than assumed." },
      { row: "Conclusion and implications", earned: "6/6", evidence: "“The study does not establish that school gardens improve adolescent diets in general, that the effect persists beyond the programme, or that the mechanism is the garden rather than the attention.”", why: "It answers the question, bounds the claim, states significance and limits, and names a specific next study." },
    ],
    craft: [
      "Make the question small enough to answer and specific enough to fail.",
      "Justify the method against the design you could not use.",
      "Report numbers with their test statistic, and let one data source complicate another.",
      "Write the conclusion as a bounded claim plus a next step, not a summary.",
    ],
    avoids: [
      "Describing a method without saying why it was chosen.",
      "Reporting results without interpretation.",
      "Generalising from one school to all adolescents.",
      "Omitting a limitation that a reader would notice immediately.",
    ],
    scale: "About 900 words for this section — a full paper runs 4,000–5,000 words with the literature review.",
  },
  {
    frqId: "ap-research-defence",
    courseSlug: "ap-research",
    kind: "performance-task",
    label: "Component 2 · Presentation and oral defence",
    title: "Six-minute script and both defence answers",
    score: "24 / 24",
    framing:
      "The defence is scored on directness, specificity, and honest limitation. Both answers below begin with the question's own terms, use a concrete detail, and end with a consequence rather than a hedge.",
    sections: [
      {
        heading: "Presentation script (six minutes)",
        paragraphs: [
          "Good morning. My question is whether access to a school garden changes what ninth-graders eat, and I want to start with why the obvious answer is not good enough. Everyone in this room has seen a garden programme described as transformative, and everyone has also seen one abandoned by October. My project asked a narrower question that a school could actually act on: over nine weeks, at one school, with a comparison group, does the garden change self-reported vegetable consumption by a measurable amount?",
          "I used a quasi-experimental design with 118 students — 61 in four garden classes, 57 in four comparable classes — and I measured consumption three ways: a seven-day food frequency questionnaire before and after, plate-waste observation in the cafeteria on four sampled days, and twelve interviews. The mixed method was deliberate. The questionnaire tells me whether a change is detectable; the interviews tell me whether the reason students give matches the mechanism I proposed, which was exposure and familiarity.",
          "The quantitative result was a rise from 8.4 to 10.9 self-reported servings per week in the garden group — about 30%, with the comparison group essentially flat. The observational data complicate that: vegetable servings taken rose 12%, but the proportion returned uneaten also rose, from 31% to 34%, so part of the increase is willingness to take vegetables rather than to eat them. That is not a failure of the project; it is what mixed methods are for.",
          "The interviews explain the pattern and bound it. Students who changed described growing something, trying it, and then asking for it at home. Students who did not change described cost, availability, and what their families cook. So the effect appears conditional on the household food environment rather than universal, which is a more useful finding for a school than a headline number.",
          "Three limitations matter. Self-report is subject to social desirability, and the garden students knew what the study hoped to find. My follow-up was in the final week, so I cannot distinguish durable change from a short-term effect. And because classes, not students, were assigned, my effective sample is closer to eight classes than 118 students. What I can claim is bounded: at this school, in nine weeks, the programme was associated with about two additional servings a week, part of which is reporting. What I cannot claim is that school gardens improve adolescent diets in general. My next study would measure again a semester later and collect household food data alongside, which would test both durability and the conditional mechanism. Thank you.",
        ],
      },
      {
        heading: "Defence question 1 — the most significant limitation, and how it shaped the conclusions",
        paragraphs: [
          "The most significant limitation was that my outcome measure was self-reported and my participants knew the study's purpose. That shaped my conclusions in two specific ways. First, it is why I report a range rather than a point estimate, and why I say that part of the two-serving increase is likely reporting rather than eating. Second, it is why the plate-waste observation carries more weight in my conclusion than its sample size would otherwise justify: it was the only measure the students could not adjust to please me, and because it showed servings taken rising faster than servings eaten, it let me keep the claim modest instead of claiming a 30% dietary change. Had I relied on the questionnaire alone, my conclusion would have been stronger and less defensible.",
        ],
      },
      {
        heading: "Defence question 2 — the larger conversation, and what comes next",
        paragraphs: [
          "My project sits inside a conversation about school-based interventions and health behaviour: whether institutions can change what adolescents eat, and under what conditions a school-level intervention survives contact with the household. The literature tends to divide between studies that measure programme effects over a few weeks and studies that measure dietary outcomes over years, and my finding sits awkwardly between them, because I have a detectable short-term effect and a mechanism that seems to depend on families. That is why the next study I would run adds a delayed measure and household food-environment data, and why I would want a second school with a different demographic profile before making any claim beyond this one. The field does not need another enthusiastic single-site result; it needs evidence about durability and conditions, and that is the specific gap my next project would address.",
        ],
      },
    ],
    breakdown: [
      { row: "Presentation", earned: "6/6", evidence: "“My project asked a narrower question that a school could actually act on… The mixed method was deliberate.”", why: "The presentation states the question, the design, the results, and the limits within six minutes of speech, in a register a panel can follow." },
      { row: "Command of the topic", earned: "6/6", evidence: "“vegetable servings taken rose 12%, but the proportion returned uneaten also rose, from 31% to 34%, so part of the increase is willingness to take vegetables rather than to eat them”", why: "Specific numbers, correct interpretation, and an understanding of why one source complicates another." },
      { row: "Defence: limitation", earned: "6/6", evidence: "“it is why the plate-waste observation carries more weight in my conclusion than its sample size would otherwise justify”", why: "It names a real limitation and traces its effect on the argument, which is what the scoring row asks for." },
      { row: "Defence: conversation and next step", earned: "6/6", evidence: "“The field does not need another enthusiastic single-site result; it needs evidence about durability and conditions”", why: "It positions the work in a scholarly conversation and names a specific next study rather than a generic call for more research." },
    ],
    craft: [
      "Open with the question and why it is not trivial.",
      "Say what the mixed method bought you.",
      "Have one number you can explain in three sentences.",
      "For each defence question, answer in the first sentence, then justify.",
    ],
    avoids: [
      "Reading the paper aloud.",
      "A limitation you describe but do not connect to your conclusions.",
      "Claiming more than the design supports under questioning.",
    ],
    scale: "About 900 words of speech and answers — six minutes plus defence time.",
  },
];

const BY_COURSE: Partial<Record<SubjectSlug, Exemplar[]>> = {
  "ap-lit": AP_LIT,
  "ap-lang": AP_LANG,
  apush: APUSH,
  "ap-gov": AP_GOV,
  "ap-bio": AP_BIO,
  "ap-calc": AP_CALC,
  "ap-macro": AP_MACRO,
  "ap-env": AP_ENV,
  "ap-seminar": AP_SEMINAR,
  "ap-research": AP_RESEARCH,
};

/** Exemplars in the shape the marked-essay reader takes. */
export function exemplarEssays(courseSlug: SubjectSlug | string): ExemplarEssay[] {
  return getExemplars(courseSlug).map(toEssay);
}

export function getExemplars(courseSlug: SubjectSlug | string): Exemplar[] {
  return BY_COURSE[courseSlug as SubjectSlug] ?? [];
}

export function getExemplar(frqId: string): Exemplar | undefined {
  for (const list of Object.values(BY_COURSE)) {
    const found = list?.find((exemplar) => exemplar.frqId === frqId);
    if (found) return found;
  }
  return undefined;
}

export function coursesWithExemplars(): SubjectSlug[] {
  return Object.keys(BY_COURSE) as SubjectSlug[];
}
