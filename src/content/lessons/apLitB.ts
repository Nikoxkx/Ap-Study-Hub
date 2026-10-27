import { section } from "./build";
import type { Lesson } from "./types";

/** AP Literature, Units 6–9: narration and irony, interpretive complexity, allusion, the whole work. */
export const apLitLessonsB: Lesson[] = [
  {
    unitNumber: 6,
    title: "Unit 6 · Longer fiction and drama II: narration you cannot quite trust",
    description:
      "Point of view as evidence, unreliable narration, dramatic irony, and the difference between a character's account and the work's argument.",
    examWeight: "Longer Fiction or Drama · 15–18% of multiple-choice passage weight across Units 3, 6, and 9",
    objectives: [
      "Identify evidence that a narrator's account is partial or self-serving.",
      "Explain how dramatic irony shapes an audience's judgement of a character.",
      "Distinguish the narrator's perspective from the implied perspective of the work.",
    ],
    sections: [
      section("Every narrator has an interest", ["cb-ap-lit-ced", "gutenberg-literature"], `
A narrator who insists on being reasonable may be making an argument about themselves. When a character reports that her husband "does not believe I am sick" and immediately asks "what can one do?", the question form performs helplessness while the sentence has already accused him. The gap between the performance and the accusation is the evidence of an unreliable account, and noticing it is a defensible interpretive move.

Unreliability is not the same as lying. A narrator may be sincere, limited, self-deceived, or selective, and each version produces a different reading of the work. Say which kind you are arguing for, and support it with two moments where the account strains against itself. That specificity is what distinguishes an interpretation from the suspicion that nobody in a book can be trusted.
`),
      section("Dramatic irony as structure", ["cb-ap-lit-ced", "folger-shakespeare"], `
Dramatic irony places the audience ahead of a character. In drama this is often literal — the audience hears a soliloquy and then watches a companion receive the polished version. In prose, the equivalent is a narrative comment the focal character does not hear. The effect is judgement: the audience is invited to interpret behaviour that the character is still explaining to themselves.

The strongest irony is structural rather than local. A character who has been deceived throughout a play does not merely deliver one ironic line at the end; every earlier scene becomes retrospective evidence once the audience learns what was withheld. When you write about irony, show the structure: what the audience knows, when they learn it, and what the earlier scenes look like afterwards.
`),
      section("The implied author is not the narrator", ["cb-ap-lit-ced", "poetry-foundation-terms"], `
The implied author is the intelligence the work as a whole projects — its arrangement, its ironies, its judgements. The narrator is one device inside that design. Confusing the two produces the commonest error in student essays: treating a character's opinion as the book's opinion. A novel can be narrated by a snob and still be a critique of snobbery, and the difference is visible in what the structure rewards and punishes.

Use the arrangement as evidence. Which scenes are placed next to each other? Whose account is contradicted by a later chapter? What does the final paragraph allow the reader to see that the narrator cannot? These structural facts let you make claims about the work's argument rather than about its narrator's opinions.
`),
      section("Silence, gaps, and what is never explained", ["cb-ap-lit-ced", "gutenberg-literature"], `
Longer works create meaning by omission. A missing year, an unexplained death, a conversation the reader is not shown — each gap asks the reader to infer. Some gaps are deliberate ambiguity; others are realistic gaps in a character's knowledge. Deciding which is which requires the rest of the pattern.

When you write about a gap, state what the text gives the reader instead. If a wedding is absent from a novel about marriage, describe what occupies its place and what that substitution suggests. This is an interpretive claim grounded in structure, which is much stronger than the assertion that the absence is symbolic.
`),
      section("Prose analysis under the clock", ["cb-ap-lit-ced", "cb-ap-lit-exam"], `
For a prose-analysis essay, the first five minutes decide the score. Read for the shift: where does the passage change what it is doing? Then choose two or three details that can carry paragraphs. A thesis that names the shift and the detail pattern gives you a line of reasoning rather than a topic.

During the draft, keep the ratio of quotation to commentary visible on the page. If a paragraph contains more quoted words than your own, it is probably summary. Revise by explaining the effect of one quoted word precisely rather than adding a second quotation.
`),
    ],
    glossary: [
      { term: "Unreliable narrator", definition: "A narrator whose account is limited, self-serving, or mistaken in ways the text signals to the reader." },
      { term: "Implied author", definition: "The intelligence and values projected by the work as a whole, distinct from the narrator." },
      { term: "Dramatic irony", definition: "A discrepancy between what an audience understands and what a character understands." },
      { term: "Focal character", definition: "The character through whose perceptions a third-person narrative is filtered." },
      { term: "Structural irony", definition: "Irony produced by the arrangement of a whole work rather than by a single line." },
    ],
    examAlignment: {
      title: "Narration and irony",
      description: "Questions about point of view and irony test whether you can separate the speaker's account from the work's design.",
      criteria: [
        "Name the kind of unreliability you are arguing for and cite two moments that support it.",
        "Explain irony through structure: what the audience knows, and when.",
        "Distinguish the narrator's judgement from the implied author's.",
      ],
      sources: ["cb-ap-lit-ced", "cb-ap-lit-frq"],
    },
    practice: [
      {
        question: "A narrator describes her husband's medical opinion, then asks 'what is one to do?' Which reading is best supported?",
        options: [
          "The narrator is entirely reliable and merely confused.",
          "The question performs helplessness while the surrounding sentences accuse the husband, so the account is partial.",
          "The narrator is lying about the medical opinion.",
          "The husband is the story's protagonist.",
        ],
        correctIndex: 1,
        explanation: "The evidence is the tension between the rhetorical question and the accusation it contains. That is a partial account, not necessarily a lie.",
        skill: "Unreliable narration",
      },
      {
        question: "The audience learns in Act I that a character is trusted falsely, and watches him praised in Act III. What creates the irony?",
        options: [
          "The character's dialogue is humorous.",
          "The audience knows what the praising characters do not, so praise becomes evidence of danger.",
          "The play is a comedy.",
          "The character speaks in prose rather than verse.",
        ],
        correctIndex: 1,
        explanation: "Dramatic irony depends on unequal knowledge between audience and characters; here the structural gap turns praise into dramatic evidence.",
        skill: "Dramatic irony",
      },
    ],
  },
  {
    unitNumber: 7,
    title: "Unit 7 · Short fiction III: endings, complexity, and competing readings",
    description:
      "Interpret whole passages at the difficulty the exam uses: endings that reframe, narrators who withhold, and two readings that can both be defended.",
    examWeight: "Short Fiction · 42–49% of multiple-choice passage weight across Units 1, 4, and 7",
    objectives: [
      "Explain how an ending reframes what precedes it.",
      "Argue for a reading while acknowledging a genuine alternative.",
      "Choose evidence that discriminates between competing interpretations.",
    ],
    sections: [
      section("Endings are arguments", ["cb-ap-lit-ced", "gutenberg-literature"], `
The last sentence of a story tells the reader how to weigh everything before it. A return to an opening image can make the intervening action feel like a loop; a sudden shift in register can make the previous calm look like denial. When an ending is ambiguous, the ambiguity is usually a claim about the unresolvability of the situation rather than a failure of nerve.

Read the ending twice: once as a continuation and once as a verdict. Then choose which reading the details support. In a story about a woman who has just recognised freedom, an ending that returns her to a staircase and a heart condition is not only a plot twist; it makes the recognition and its cancellation simultaneous. That is an argument about how much a moment of insight can change.
`),
      section("Competing readings, held together", ["cb-ap-lit-ced", "cb-ap-lit-frq"], `
A sophisticated reading does not pretend that ambiguity is agreement. It states the strongest alternative and explains why the evidence favours one reading, or why the text deliberately refuses to choose. The sophistication row on the rubric rewards the first and, more rarely, the second.

Use the same evidence for both readings and show that it discriminates. If an image of spring can support both renewal and indifference, explain which the surrounding verbs support. The reader is judging whether your reasoning can survive the other reading, not whether you noticed that another reading exists.
`),
      section("Selection: evidence that decides", ["cb-ap-lit-ced", "cb-ap-lit-exam"], `
Not all evidence is equal. A detail that appears once in passing may be atmospheric; a detail that the narrative returns to at a moment of decision is structural. Choose the second. The exam's multiple-choice distractors often quote a real detail but attach it to the wrong function, so asking "what does this detail do here" is the same skill in both sections.

A practical test: could your evidence support the opposite claim just as easily? If yes, it is not discriminating. Find a detail whose position in the scene commits the text to something, and say where in the passage it falls — in an opening description, at the moment of decision, or in the final image. Position is part of the evidence.
`),
      section("Close reading at speed", ["cb-ap-lit-ced", "poetry-foundation-terms"], `
Under exam conditions, annotation should be minimal: the shift, the speaker, the repeated word, the final image. Four marks are enough to write three body paragraphs. Readers do not reward decoration; they reward a line of reasoning that can be followed.

Practise on a single paragraph rather than a whole story. Give yourself eight minutes, produce one thesis and two body paragraphs, then check whether each paragraph contains more explanation than quotation. This is the smallest useful unit of practice, and it improves faster than rereading whole anthologies.
`),
      section("From passage to whole work", ["cb-ap-lit-ced", "gutenberg-literature"], `
Short passages on the exam are excerpts, and the best answers remember that. A moment of cruelty in a novel may be framed by later regret; a moment of tenderness may be ironised by the next chapter. You cannot use what is not printed, but you can avoid claims that the passage does not support.

Write about the passage you have, then add one sentence connecting it to the kind of whole work it implies. That sentence belongs in a conclusion or in a qualification, and it is often what lifts an essay from competent to sophisticated.
`),
    ],
    glossary: [
      { term: "Reframing", definition: "A later moment that changes how earlier material is understood without altering its words." },
      { term: "Discriminating evidence", definition: "A detail whose function supports one reading better than its rival." },
      { term: "Open ending", definition: "A conclusion that leaves the outcome unresolved in a way the text has prepared." },
      { term: "Epiphany", definition: "A moment of sudden understanding that may or may not change a character's behaviour." },
      { term: "Register", definition: "The level and manner of language a text uses, such as formal, colloquial, or liturgical." },
    ],
    examAlignment: {
      title: "Prose fiction analysis, third pass",
      description: "The hardest prose passages on the exam reward discrimination between readings, not recognition of devices.",
      criteria: [
        "Explain how the ending reframes the passage rather than summarising the twist.",
        "Use evidence that favours one reading over its rival.",
        "Concede an alternative reading and answer it in one sentence.",
      ],
      sources: ["cb-ap-lit-ced", "cb-ap-lit-frq"],
    },
    practice: [
      {
        question: "A story ends by returning to the staircase where it began, after the protagonist has recognised her freedom. What is the most defensible claim about the ending?",
        options: [
          "The return shows that nothing has changed, so the recognition was meaningless.",
          "The return makes the recognition and its cancellation simultaneous, so the story argues about how much insight can alter a life.",
          "The return is an error in the story's chronology.",
          "The staircase is a symbol of the protagonist's childhood.",
        ],
        correctIndex: 1,
        explanation: "The ending does not erase the recognition; it places it against its limit, which is the story's argument. The other options either dismiss the structure or invent a conventional symbol.",
        skill: "Endings and meaning",
      },
      {
        question: "Which piece of evidence would best discriminate between reading a narrator as grieving and reading her as relieved?",
        options: [
          "The story is set in spring.",
          "The narrator's sister is named Josephine.",
          "The narrator repeats the word 'free' in a whisper she cannot stop.",
          "The story was published in 1894.",
        ],
        correctIndex: 2,
        explanation: "A whispered repetition of 'free' commits the text to a reading in a way setting, a name, or a publication date cannot.",
        skill: "Evidence selection",
      },
    ],
  },
  {
    unitNumber: 8,
    title: "Unit 8 · Poetry III: allusion, tradition, and poems in conversation",
    description:
      "Read poems against the traditions they inherit: allusion, form, and the comparison of two poems on the same subject.",
    examWeight: "Poetry · 36–45% of multiple-choice passage weight across Units 2, 5, and 8",
    objectives: [
      "Explain how an allusion changes a poem's available meanings.",
      "Compare two poems' arguments about a shared subject.",
      "Analyse a poem's use of a received form as an argument rather than a container.",
    ],
    sections: [
      section("Allusion is a compression", ["cb-ap-lit-ced", "poetry-foundation-terms"], `
An allusion borrows authority, irony, or pathos from another text. A poem that echoes a psalm may be claiming consolation or measuring the distance from it. The analysis should say which, and the answer is usually in the tone of the surrounding lines rather than in the allusion itself.

Never explain the allusion at length. One clause identifies it; the rest of the paragraph explains what it does here. A reader who knows the source does not need a summary, and a reader who does not will still follow the argument about function.
`),
      section("Form as inheritance and as pressure", ["cb-ap-lit-ced", "folger-shakespeare"], `
Writing in a received form — sonnet, elegy, ballad — places a poem in a conversation. The form carries expectations: elegies console, sonnets turn, ballads repeat. A poem that uses the form and refuses its expectation is making an argument about the subject. That refusal is often the most interesting thing to write about.

Check the turn, the rhyme scheme, and the closing move against what the form conventionally does. If an elegy ends without consolation, the absence is the meaning. If a sonnet refuses to resolve at the couplet, the refusal is a claim about the problem it describes.
`),
      section("Comparing two poems", ["cb-ap-lit-ced", "cb-ap-lit-frq"], `
Comparison questions require a shared axis: both poems treat the same subject, or use the same image, or address the same audience. Compare them on that axis, not on a checklist of devices. A comparison that says poem A is sad and poem B is hopeful is not analysis; a comparison that explains how each poem's imagery makes the same season mean different things is.

The strongest comparison states a claim about the difference and then shows how each poem's choices produce it. If one poem's syntax delays consolation while the other's arrives early, the difference in pacing is the difference in argument.
`),
      section("Tradition and the individual poem", ["cb-ap-lit-ced", "poetry-foundation-terms"], `
Poems are written in a field of other poems. A love poem that mocks Petrarchan convention is arguing with a tradition; a poem that adopts it may be sincere or ironic, and the surrounding diction tells you which. Placing a poem in a tradition is not name-dropping if you explain what the placement does.

Use tradition sparingly in the essay. One sentence locating the poem within a convention, followed by two sentences explaining how the poem modifies it, is enough. The reader wants your reading, not a literary history. If you cannot say what the poem gains by invoking the tradition, the reference is decoration and should be cut before it dilutes the paragraph around it.
`),
      section("Comparative thesis, quickly", ["cb-ap-lit-ced", "cb-ap-lit-exam"], `
A comparative thesis has three parts: the shared subject, the difference in argument, and the technique that produces the difference. Write it before reading either poem closely a second time, and revise it once you have your evidence. The thesis is a working hypothesis, and the body paragraphs are where it earns its keep.

On the exam, comparative questions appear mainly in multiple choice, but the skill transfers directly to the synthesis essay in AP Language and to any essay that must weigh two moments in one work. Comparison is a habit of argument, not a special topic.
`),
    ],
    glossary: [
      { term: "Allusion", definition: "A brief reference to another text, figure, or tradition that borrows or contests its meaning." },
      { term: "Convention", definition: "An inherited expectation about form, subject, or style that a text may satisfy or resist." },
      { term: "Elegy", definition: "A poem of mourning that conventionally moves toward consolation, though it may refuse to." },
      { term: "Petrarchan conceit", definition: "An elaborate comparison in the tradition of Petrarch's love poetry, often strained or conventional." },
      { term: "Comparative claim", definition: "A statement about how two texts differ in argument, supported by technique rather than topic." },
    ],
    examAlignment: {
      title: "Tradition and comparison in poetry",
      description: "Questions about allusion and paired poems test whether you can use context to explain function.",
      criteria: [
        "Identify an allusion in one clause, and spend the paragraph on what it does here.",
        "Compare two poems on a shared axis and name the technique that produces the difference.",
        "Explain how a poem's use or refusal of a convention supports its argument.",
      ],
      sources: ["cb-ap-lit-ced", "cb-ap-lit-frq"],
    },
    practice: [
      {
        question: "A poem echoes a well-known psalm but ends with an image of silence. What is the most defensible reading?",
        options: [
          "The poet ran out of ideas.",
          "The allusion raises the expectation of consolation, and the silence measures the distance from it.",
          "The psalm is the poem's true subject.",
          "The poem is not religious.",
        ],
        correctIndex: 1,
        explanation: "The allusion is a structural resource: it imports an expectation that the ending then qualifies. That gap is the poem's argument.",
        skill: "Allusion and meaning",
      },
      {
        question: "Two poems describe autumn. One moves quickly to consolation, the other delays resolution for twelve lines. What is the strongest comparative claim?",
        options: [
          "Both poems are about autumn but one is longer.",
          "The second poem's delayed syntax makes consolation something that must be argued for, while the first's early resolution makes it available.",
          "The first poem is better written.",
          "Autumn is a common subject in poetry.",
        ],
        correctIndex: 1,
        explanation: "The comparison is on a shared axis (autumn) and explains how pacing produces a difference in argument, rather than ranking or describing.",
        skill: "Comparative analysis",
      },
    ],
  },
  {
    unitNumber: 9,
    title: "Unit 9 · The whole work: context, theme, and preparing Question 3",
    description:
      "Bring a complete work to the literary-argument essay: choose well, use context without lecturing, and make a claim about the work as a whole.",
    examWeight: "Longer Fiction or Drama · 15–18% of multiple-choice passage weight; Question 3 is 18.3% of the exam",
    objectives: [
      "Select a work and a set of scenes that can support a defensible claim under time pressure.",
      "Use historical or social context without letting it replace textual evidence.",
      "Write a thesis about how an element contributes to the meaning of a whole work.",
    ],
    sections: [
      section("Choose the work that fits the question", ["cb-ap-lit-ced", "cb-ap-lit-frq"], `
Question 3 offers a concept — a character's relation to an unacknowledged truth, the function of a minor character, the significance of a journey — and asks you to select a work. The best work is not the most famous one; it is the one you can support with two or three specific scenes. A single accurately remembered scene outranks a vague acquaintance with a masterpiece.

Prepare four or five works across genres in advance. For each, memorise three moments, one recurring image, and one sentence about the ending. That preparation covers almost any prompt, and it prevents the improvisation that produces plot summary.
`),
      section("Context, used sparingly", ["cb-ap-lit-ced", "gutenberg-literature"], `
Historical context can sharpen an interpretation, but it cannot substitute for reading. A paragraph about Victorian marriage law is useful only if the next sentence shows what the novel does with it. The exam rubric rewards evidence and commentary, not background knowledge.

Use context as a frame of one or two sentences: what was assumed, what was contested, what the work makes visible. Then return to the text. If your paragraph on context contains no quotation, it is probably history rather than literary analysis.
`),
      section("The thesis about a whole work", ["cb-ap-lit-ced", "cb-ap-lit-exam"], `
A whole-work thesis names the element, the pattern, and the claim about meaning. "In the novel, the recurring image of the locked door shows that the protagonist's freedom is always conditional" is a thesis; "the novel explores freedom" is a topic. The first can be supported by three scenes; the second invites summary.

Place the thesis at the start, then treat each body paragraph as evidence for one part of it. If a paragraph cannot be connected to the thesis in one sentence, cut it or revise the thesis. The reader is scoring the fit between claim and evidence.
`),
      section("Complexity without hedging", ["cb-ap-lit-ced", "cb-ap-lit-frq"], `
The sophistication row rewards a genuine complication: an alternative interpretation addressed, a tension named, a limit acknowledged. It does not reward uncertainty. "The novel could mean many things" is not complexity; "the novel presents the door as both escape and trap, which means freedom in the book is inseparable from surveillance" is.

Practise the move with one sentence per essay: "The strongest objection to this reading is ___, but the evidence of ___ suggests otherwise." That sentence is worth more than a page of additional summary, because it shows a reader that your reading has been tested rather than asserted, and that you know which part of it is most vulnerable.
`),
      section("The last ten minutes", ["cb-ap-lit-ced", "cb-ap-lit-exam"], `
In the final ten minutes of the free-response section, do not add a new argument. Check three things: the thesis answers the prompt's verb, every body paragraph contains commentary that explains evidence, and the conclusion says something the introduction did not. Then fix the first sentence that sounds like plot summary.

Mechanics matter less than reasoning on this exam, but a sentence that cannot be parsed costs clarity. Read your own essay aloud in your head, sentence by sentence, and break anything over about forty words. Readers are not looking for errors; they are looking for a line of reasoning they can follow on the first pass. Two minutes of this check routinely recovers a point that a rushed final paragraph would have lost.
`),
    ],
    glossary: [
      { term: "Whole-work claim", definition: "A thesis about how an element functions across a complete literary work." },
      { term: "Literary merit", definition: "The quality of writing and complexity of thought that makes a work suitable for analysis." },
      { term: "Contextual reading", definition: "Interpretation informed by the historical, social, or biographical circumstances of a work." },
      { term: "Line of reasoning", definition: "The connected sequence of claims and evidence that advances a thesis." },
      { term: "Qualification", definition: "A statement of the conditions under which a claim holds, which strengthens rather than weakens it." },
    ],
    examAlignment: {
      title: "Literary argument, final pass",
      description: "Question 3 is a whole-work essay: choose a work you know in scenes, and argue about meaning rather than plot.",
      criteria: [
        "Prepare four or five works with three specific scenes each.",
        "Write a thesis that names the element and makes a claim about the work as a whole.",
        "Use context in one or two sentences and return immediately to textual evidence.",
      ],
      sources: ["cb-ap-lit-ced", "cb-ap-lit-frq"],
    },
    practice: [
      {
        question: "A prompt asks how a minor character contributes to the meaning of a work. Which preparation is most useful?",
        options: [
          "Remembering the minor character's full name and family history.",
          "Knowing two scenes in which the minor character's presence changes how the protagonist acts.",
          "Knowing the year the work was published.",
          "Being able to summarise the entire plot.",
        ],
        correctIndex: 1,
        explanation: "The essay is scored on evidence and commentary, so scenes that show the character's function are worth more than biographical detail or plot recall.",
        skill: "Whole-work evidence",
      },
      {
        question: "Which sentence demonstrates sophistication rather than hedging?",
        options: [
          "The novel could be interpreted in many different ways.",
          "The recurring locked door is both escape route and surveillance point, so the novel makes freedom inseparable from being watched.",
          "The author uses many symbols to convey themes.",
          "The ending is ambiguous and hard to understand.",
        ],
        correctIndex: 1,
        explanation: "Complexity is a specific tension argued from evidence. The other options either announce uncertainty or name devices without a claim.",
        skill: "Sophistication",
      },
    ],
  },
];
