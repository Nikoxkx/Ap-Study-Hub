import { section } from "./build";
import type { Lesson } from "./types";

/**
 * AP English Literature and Composition.
 *
 * Nine units following the published skill spiral: three passes through short
 * fiction, poetry, and longer fiction or drama, each pass raising the demand
 * for interpretation rather than identification. The texts discussed here are
 * public domain and can be read in full for free, so a student can check every
 * claim in the prose against the actual poem or chapter.
 */
export const apLitLessons: Lesson[] = [
  {
    unitNumber: 1,
    title: "Unit 1 · Short fiction: character, setting, and the pressure of a scene",
    description:
      "Read a short story as a system of choices: who wants what, where they are, what the scene forbids, and how the narration selects detail.",
    examWeight: "Short Fiction · 42–49% of multiple-choice passage weight across Units 1, 4, and 7",
    objectives: [
      "Distinguish characterisation by action, speech, and narration from characterisation by summary.",
      "Explain how a setting constrains or enables what a character can do.",
      "Write a thesis that interprets a scene rather than summarising its events.",
    ],
    sections: [
      section("A story is a scene under pressure", ["cb-ap-lit-ced", "gutenberg-literature"], `
Literary analysis begins by noticing that a scene is arranged. Someone wants something, something stands in the way, and the prose chooses which moments to slow down. That arrangement is the argument a fiction writer makes about how people behave. When Kate Chopin writes that Mrs. Mallard wept "at once, with sudden, wild abandonment," the phrase matters less as an emotion label than as a contrast with the "paralyzed inability" the narrator has just told us she does not feel.

Once you can name the pressure in a scene, summary stops being tempting. "Louise is sad about her husband" is a paraphrase of events. "Louise's grief is described as a storm that spends itself, which leaves the room available for a feeling the story has not yet named" is an interpretation of craft. The second version is longer only because it is doing work the first cannot: it explains how a metaphor makes the next paragraph possible.
`),
      section("Setting as a limit and an opportunity", ["cb-ap-lit-ced", "poetry-foundation-terms"], `
Setting is not wallpaper. A drawing room with a fixed income determines which marriages are possible; a plantation determines what labour is invisible; a rented room determines who may close a door. Ask what the place makes easy and what it makes impossible, and you have an interpretive claim that can be supported with one or two details of description.

The same discipline applies to time. A story set over an afternoon can hold a single change of mind; a story spanning decades must show change through selection. When the narrative pauses on the open window while a character sits in an armchair, the pause is a decision. Say what the pause allows the reader to notice, and your commentary is already doing rubric work rather than listing devices.
`),
      section("Characterisation: what is shown, said, and withheld", ["cb-ap-lit-ced", "cb-ap-lit-frq"], `
Direct characterisation tells the reader what a person is like; indirect characterisation lets action, speech, and the reactions of others do the work. Examiners reward the second because it requires reading. A character who says "I have no objection to hearing it" has revealed more about his marriage than a paragraph of description could, precisely because the sentence is so flat.

Watch for the gap between what a character says and what the narration implies. That gap is where complexity lives, and it is also where the sophistication row of the essay rubric is earned. A defensible interpretation names the gap, explains how the text creates it, and then says what the gap means for the work's larger claim about its subject.
`),
      section("Narration chooses what you can know", ["cb-ap-lit-ced", "gutenberg-literature"], `
Point of view is an information policy. A first-person narrator cannot report what another character privately thinks; a limited third person reports only the focal character's perceptions; an omniscient narrator may move between minds and may also judge. Each choice makes certain interpretations available and others impossible, so a claim about character should be consistent with what the narration could know.

When a narrator reports a character's sensations rather than their conclusions, the reader is placed in the position of interpreting alongside them. The famous turn in "The Story of an Hour" depends on this: we are given the room, the window, the sparrows, and the word "something" before we are given the word "free". The delay is a narratological choice, and explaining it is more valuable than naming it.
`),
      section("Turning close reading into a thesis", ["cb-ap-lit-ced", "cb-ap-lit-exam"], `
A thesis for a fiction passage should make a claim about meaning and name the technique or pattern that produces it. "Chopin uses imagery" fails on both counts: it is not a claim and the technique is unnamed. "Chopin's imagery of new spring life reframes Louise's grief as relief, so that the room becomes the story's real event" is arguable, specific, and can be supported in two body paragraphs.

On the exam, the six-point analytic rubric rewards a thesis in the first row and commentary in the second. That means the fastest route to a higher score is not a longer essay but a tighter loop: claim, short quotation, explanation of effect, next claim. Practise writing the loop on a single paragraph of prose until the explanation takes more space than the quotation.
`),
    ],
    glossary: [
      { term: "Focalisation", definition: "The perspective through which a narrative filters information, which may differ from the narrator's own knowledge." },
      { term: "Indirect characterisation", definition: "Revealing character through action, speech, and the responses of others rather than direct description." },
      { term: "Scene and summary", definition: "The two speeds of fiction: dramatised moments in detail, and compressed passages that cover time quickly." },
      { term: "Free indirect discourse", definition: "Third-person narration that borrows a character's idiom and judgements without quotation marks." },
      { term: "Interpretive claim", definition: "A statement about meaning that a reasonable reader could dispute and that evidence can support." },
    ],
    examAlignment: {
      title: "Prose fiction analysis",
      description: "Every prose-analysis essay begins with a defensible interpretation and supports it with short evidence and commentary.",
      criteria: [
        "State the interpretation in one sentence and name the pattern or technique carrying it.",
        "Quote briefly and explain how the quotation produces its effect.",
        "Close by saying what the passage claims about its subject, not by repeating the thesis.",
      ],
      sources: ["cb-ap-lit-ced", "cb-ap-lit-frq"],
    },
    practice: [
      {
        question: "A passage describes a character's room in detail before the character speaks. Which of the following best explains why a writer might order the passage this way?",
        options: [
          "To delay the plot so the story can reach a required length",
          "To let the setting establish what the character's speech cannot say directly",
          "To show that the narrator dislikes the character",
          "To prove that the story is set in the past",
        ],
        correctIndex: 1,
        explanation: "Description placed before dialogue invites the reader to read the speech against the room, so the setting supplies context the character withholds. Delay for its own sake would not be an interpretive reason.",
        skill: "Structure and setting",
      },
      {
        question: "Which sentence is a defensible interpretive claim rather than a summary?",
        options: [
          "The story is about a woman who learns her husband has died.",
          "The narrator describes the window and the trees outside.",
          "By filling the room with spring imagery before naming Louise's feeling, the story makes her relief arrive as the reader's discovery rather than her confession.",
          "The story uses a lot of imagery and symbolism.",
        ],
        correctIndex: 2,
        explanation: "Only the third option makes an arguable claim about how the ordering creates meaning. The first summarises, the second describes, and the fourth names devices without asserting anything.",
        skill: "Thesis writing",
      },
    ],
  },
  {
    unitNumber: 2,
    title: "Unit 2 · Poetry: the line, the turn, and the argument of a poem",
    description:
      "Read poems by their decisions — line breaks, turns, images, and pronouns — and learn why a paraphrase of a poem is not yet a reading of it.",
    examWeight: "Poetry · 36–45% of multiple-choice passage weight across Units 2, 5, and 8",
    objectives: [
      "Explain the effect of a line break or a stanza break on meaning.",
      "Locate the volta in a sonnet and describe what changes at it.",
      "Write commentary that connects a figure of speech to an argument about the poem's subject.",
    ],
    sections: [
      section("A poem thinks in lines", ["cb-ap-lit-ced", "poetry-foundation-terms"], `
The line is the unit that distinguishes poetry from prose. A line break can isolate a word, delay a verb, or force a comparison between two endings. When Shakespeare ends a line with "behold" and begins the next with "When", the reader is left holding the speaker's body for a moment before the season arrives. That delay is not decoration; it establishes that the poem will look outward from the speaker rather than inward.

Reading for lines also prevents paraphrase from masquerading as analysis. If you rewrite "That time of year thou mayst in me behold" as "you can see that I am getting old", you have the gist and none of the poem. Explain instead how the metaphor works: autumn is offered as a way of seeing a person, and the second-person address makes the beloved a witness who is asked to recognise what the speaker cannot avoid.
`),
      section("The turn does the arguing", ["cb-ap-lit-ced", "folger-shakespeare"], `
Sonnets are the clearest place to learn the volta, because the form advertises it. In a Shakespearean sonnet the argument often turns at line 13; in a Petrarchan sonnet it turns between the octave and the sestet. At the turn, the poem stops doing one thing and starts doing another: description becomes consequence, complaint becomes consolation, or a question becomes an answer.

Identifying the turn is not the point; explaining its work is. If twelve lines catalogue images of decline and the final couplet says those images make love stronger, the turn reverses the logic of the poem: decay becomes the cause of devotion rather than the enemy of it. A body paragraph that states this reversal, quotes the pivot line, and explains the reversal's effect will reach the upper commentary row without any extra length.
`),
      section("Imagery is an argument about what matters", ["cb-ap-lit-ced", "poetry-foundation-terms"], `
An image asks the reader to see one thing in terms of another, and that transfer carries an evaluation. Twilight is not simply evening; as a metaphor for a life it makes death gradual, and gradualness changes the emotional register from shock to anticipation. Two poems can use the same season and argue opposite things about it, which is why "the poet uses nature imagery" explains nothing.

Strong commentary names the vehicle and the tenor, then states what the comparison makes possible. In "Death's second self, that seals up all in rest", night is death's likeness because both close a day, and the verb "seals" adds finality that the earlier "fadeth" withheld. That is a sentence-level observation about diction that pays off in the commentary row.
`),
      section("Pronouns, address, and the pressure of a listener", ["cb-ap-lit-ced", "cb-ap-lit-frq"], `
Who is spoken to changes what a poem can say. An address to a lover permits confession; an address to a reader permits argument; an address to the dead permits accusation or reconciliation. Where the pronoun shifts — from "I" to "we", from "thou" to "you" — the poem's relationship to its listener changes, and often so does its argument.

Notice when an addressee is asked to do something. Imperatives in a poem are claims about obligation, and a closing imperative can turn a meditation into a request. If the final line asks the beloved to love "that well which thou must leave ere long", the poem's subject is not only mortality but the use of mortality as a reason to love. That is the kind of sentence a reader marks.
`),
      section("Writing the poetry essay", ["cb-ap-lit-ced", "cb-ap-lit-exam"], `
The poetry-analysis prompt almost always asks how a poet conveys a complex attitude. "Complex" is an instruction: the attitude must have more than one component, and your thesis should name the tension rather than resolving it too early. A thesis that says the speaker is simply afraid of death will not survive the couplet, which is warm rather than fearful.

During the 40 minutes, read twice and annotate only shifts and repetitions. Then choose three details that can each carry a paragraph. Each paragraph should follow the same loop — claim, short quotation with a line number, explanation of how the words produce the effect — and the final paragraph should say what the poem argues about its subject. That structure is what a reader can score quickly and fairly.
`),
    ],
    glossary: [
      { term: "Volta", definition: "The turn in a poem, where the argument or tone shifts; conventionally between the octave and sestet, or before the closing couplet." },
      { term: "Enjambment", definition: "A line that runs past its own end without punctuation, carrying the sentence into the next line." },
      { term: "Caesura", definition: "A pause inside a line, often created by punctuation, that interrupts the metre." },
      { term: "Tenor and vehicle", definition: "The subject being described and the image used to describe it in a metaphor." },
      { term: "Apostrophe", definition: "Direct address to an absent person, an abstraction, or an object as though it could reply." },
    ],
    examAlignment: {
      title: "Poetry analysis",
      description: "The poetry essay is scored on thesis, evidence and commentary, and sophistication — in that order of dependency.",
      criteria: [
        "Write a thesis that names a tension in the speaker's attitude and the technique carrying it.",
        "Quote no more than a line at a time and explain the effect of the exact words chosen.",
        "Identify the volta and explain what changes there rather than merely noting that it exists.",
      ],
      sources: ["cb-ap-lit-ced", "cb-ap-lit-frq"],
    },
    practice: [
      {
        question: "A sonnet's first twelve lines describe decline and its final couplet says the beloved's love grows stronger. Which description of the volta is most useful for an essay?",
        options: [
          "The poem has a volta at line 13.",
          "The poem changes topic at the end.",
          "At line 13 the poem reverses its logic, making the decay it has catalogued the cause of love rather than its obstacle.",
          "The final couplet rhymes.",
        ],
        correctIndex: 2,
        explanation: "A useful description of the turn explains what the turn does to the argument. Naming the line, the rhyme, or a topic change does not yet make a claim about meaning.",
        skill: "Volta and structure",
      },
      {
        question: "Which sentence best explains the effect of an enjambed line ending?",
        options: [
          "It shows that the poet could not think of a rhyme.",
          "It makes the reader wait for the completion of the sentence, so the withheld word arrives with emphasis.",
          "It proves the poem is free verse.",
          "It indicates that the speaker is confused.",
        ],
        correctIndex: 1,
        explanation: "Enjambment manages timing: meaning is suspended at the line end and the next line completes it. The effect belongs to the reader's experience of the sentence.",
        skill: "Prosody and effect",
      },
    ],
  },
  {
    unitNumber: 3,
    title: "Unit 3 · Longer fiction and drama: conflict, motive, and the visible scene",
    description:
      "Work at the scale of a whole play or novel: how a character is built across scenes, how a soliloquy makes motive audible, and how structure carries theme.",
    examWeight: "Longer Fiction or Drama · 15–18% of multiple-choice passage weight across Units 3, 6, and 9",
    objectives: [
      "Explain how a soliloquy gives the audience information that other characters lack.",
      "Trace a conflict through at least two scenes and show what changes.",
      "Use a whole-work claim as evidence in the literary-argument essay.",
    ],
    sections: [
      section("Drama is written to be overheard", ["cb-ap-lit-ced", "folger-shakespeare"], `
A soliloquy is a convention that grants the audience access to a mind while the other characters on stage are excluded. That asymmetry does work: it can build sympathy, expose self-deception, or make an audience complicit in a decision before it happens. When Macbeth reasons himself toward murder, the audience hears a conscience operating in real time, which makes the act that follows a tragedy rather than a surprise.

Reading the speech as an argument helps. The first lines test a hypothetical: if the murder could be complete and consequence-free, it would be worth doing. The rest of the speech dismantles the hypothesis with the returns of violence, the obligations of host and kinsman, and the publicity of pity. By the end, only ambition remains, and ambition is described as self-defeating. Track the steps, and the characterisation follows.
`),
      section("Conflict is a structure, not a mood", ["cb-ap-lit-ced", "gutenberg-literature"], `
Conflict in longer works organises scenes. A protagonist's desire meets an opposing force, and each scene tests the balance. If you can name the desire, the obstacle, and the cost of pursuing it, you can predict what a given scene must accomplish. That prediction is useful on the exam, where a passage from the middle of a novel arrives without its earlier chapters.

Drama makes the structure visible because scenes are bounded by entrances and exits. A conversation that begins politely and ends with a threat has changed the balance of power, and the change is the scene's function. In prose, the equivalent is often a shift in who holds information. Ask who knows what at the start of the scene and who knows what at the end; the answer usually names the conflict.
`),
      section("Character across a whole work", ["cb-ap-lit-ced", "cb-ap-lit-frq"], `
A character in a longer work is a pattern rather than a single description. What he does when he has power, what he does when he is watched, and what he says when he believes no one is listening are three different kinds of evidence, and a strong reading holds them together. Contradiction is not a flaw in characterisation; it is usually the material of the work's meaning.

For the literary-argument essay, this is how you avoid plot summary. You are not asked to narrate the book; you are asked to analyse how one element contributes to the meaning of the work as a whole. Choose two or three moments that show the element at work and explain what the pattern argues. A reader can tell within a paragraph whether you know the book or only know about it.
`),
      section("Stagecraft and prose detail", ["cb-ap-lit-ced", "folger-shakespeare"], `
In drama, non-verbal decisions carry meaning: who is on stage, who is silent, what is held, when a door opens. A stage direction is part of the text, not a production note, and a character's silence while another speaks is a choice the playwright has made. Reading for these details keeps analysis specific in a passage that has little narration to quote.

In prose, the equivalent details are objects, gestures, and repeated physical descriptions. A door that is mentioned three times is a pattern; a character who cannot sit down is a piece of characterisation. Choose details that recur, and explain what the recurrence makes the reader suspect. That is the difference between a list of observations and a line of reasoning.
`),
      section("Using a whole work without retelling it", ["cb-ap-lit-ced", "cb-ap-lit-exam"], `
The third essay asks you to select a work of literary merit and analyse it. The most common way to lose points is to spend the first page proving you read the book. Establish the relevant situation in three sentences, then spend the rest of the essay explaining how the chosen element shapes meaning.

Pick a work you can discuss at the level of specific scenes, not a work you read once in ninth grade. If a prompt asks about a character's relation to an unacknowledged truth, you need two or three moments where the truth is felt, avoided, and finally faced. Prepare four or five works in advance with three such moments each, and you will never be reduced to generalities under time pressure.
`),
    ],
    glossary: [
      { term: "Soliloquy", definition: "A speech in which a character, alone on stage, voices thoughts to the audience rather than to another character." },
      { term: "Dramatic irony", definition: "A gap between what the audience knows and what a character knows, used to create tension or judgement." },
      { term: "Tragic flaw", definition: "A quality in a tragic protagonist that, in combination with circumstance, contributes to the character's downfall." },
      { term: "Motivation", definition: "The desires and reasons that explain a character's actions as the text presents them." },
      { term: "Peripeteia", definition: "A reversal of fortune or intention in a plot, often turning an action against the actor." },
    ],
    examAlignment: {
      title: "Literary argument",
      description: "Question 3 rewards a whole-work claim supported by specific scenes, not a summary of the plot.",
      criteria: [
        "Name the work and the element in the thesis, and make a claim about meaning.",
        "Use two or three specific moments as evidence, quoting briefly where possible.",
        "Explain how the pattern bears on the work as a whole, and avoid retelling the story.",
      ],
      sources: ["cb-ap-lit-ced", "cb-ap-lit-frq"],
    },
    practice: [
      {
        question: "A character delivers a soliloquy in which he argues himself out of a crime and then commits it. What is the most defensible interpretation of the soliloquy's function?",
        options: [
          "It shows that the character is not responsible for his actions.",
          "It lets the audience watch a conscience at work, making the coming action tragic rather than merely shocking.",
          "It provides background information about the setting.",
          "It indicates that the play is a comedy.",
        ],
        correctIndex: 1,
        explanation: "The speech makes the audience witnesses to moral reasoning, which is what produces tragic sympathy. It does not remove responsibility, and it is not exposition.",
        skill: "Dramatic function",
      },
      {
        question: "Which is the best evidence for a claim that a novel treats ambition as self-defeating?",
        options: [
          "The novel is long and divided into three parts.",
          "The protagonist says the word 'ambition' twelve times.",
          "Each time the protagonist gains power, the scene ends with an image of the same damaged object he destroyed to gain it.",
          "The novel was written in the nineteenth century.",
        ],
        correctIndex: 2,
        explanation: "A recurring image tied to each gain is a pattern that supports the claim about self-defeat. Length, word counts, and publication dates do not establish meaning.",
        skill: "Evidence selection",
      },
    ],
  },
  {
    unitNumber: 4,
    title: "Unit 4 · Short fiction II: detail, symbol, and tone",
    description:
      "Move from what happens to how detail is selected: symbolism that is earned, tone that is built rather than labelled, and ambiguity that is deliberate.",
    examWeight: "Short Fiction · 42–49% of multiple-choice passage weight across Units 1, 4, and 7",
    objectives: [
      "Distinguish a symbol from an object that is merely mentioned.",
      "Describe tone as a product of diction and syntax rather than a mood label.",
      "Explain how a passage creates deliberate ambiguity and why it matters.",
    ],
    sections: [
      section("Symbols are made by attention", ["cb-ap-lit-ced", "poetry-foundation-terms"], `
Anything can be mentioned; a symbol is an object the text returns to, loads with feeling, and places where a decision is made. A wedding ring described once is furniture; a wedding ring that appears in three scenes and is finally removed is a structure of meaning. The test is not whether the object has a conventional association but whether the text does work with it.

That is why "the window symbolises freedom" is usually a weak sentence. A stronger one explains what the window permits: it frames a view the character cannot enter, so it measures the distance between the life she can see and the room she occupies. The symbol's meaning comes from its position in the scene, not from a dictionary of literary terms.
`),
      section("Tone is built, not announced", ["cb-ap-lit-ced", "cb-ap-lit-frq"], `
Tone questions ask how a passage sounds to a careful reader. That sound is produced by specific choices: Latinate abstraction versus monosyllabic plainness, long periodic sentences versus clipped clauses, exclamation versus understatement, dashes versus commas. Naming the tone is the first step; explaining how the diction and syntax produce it is the second, and only the second earns commentary points.

Consider the difference between "I have no objection to hearing it" and "Tell me everything at once!" Both are responses to the same request. The first is dry, deflating, and slightly amused; the second is eager. The words, not the speaker's personality, create the difference. In commentary, quote the phrase that carries the tone before you name the tone at all.
`),
      section("Ambiguity as a designed effect", ["cb-ap-lit-ced", "gutenberg-literature"], `
Some passages refuse to resolve. A pronoun with two possible antecedents, a final sentence that could be read as hope or as defeat, an image that is both domestic and threatening — these are not failures of clarity. They are invitations to hold two readings at once, and the essay rubric's sophistication row exists partly to reward a student who can articulate the tension.

The discipline is to state both readings and then argue for the relationship between them. "The ending is ambiguous" is not an argument. "The last sentence can be read as release or as death, and the story has prepared both by giving the same room the imagery of a prison and of a window" is an argument, because it shows the text constructing the ambiguity deliberately.
`),
      section("Detail selection is characterisation", ["cb-ap-lit-ced", "cb-ap-lit-exam"], `
Narrators notice what matters to them. A passage that catalogues furniture, or birds, or the sound of a peddler, is telling you what kind of attention is available in that moment. When the selection changes — when the room disappears and only the window remains — the change in attention is the event.

On multiple-choice questions about detail, the credited answer usually explains the function of the detail within the passage's movement, while distractors describe the detail accurately but do not explain it. Eliminate options that are true but inert. The question is rarely "what is mentioned" and almost always "why this, here".
`),
      section("Turning tone into a thesis", ["cb-ap-lit-ced", "cb-ap-lit-frq"], `
A thesis about tone should not stop at an adjective. "The tone is ironic" is a label; "the narrator's irony makes the marriage a transaction the reader is invited to enjoy and then to condemn" is a claim about effect and evaluation. The second version also sets up two body paragraphs, one on the irony's mechanics and one on its ethical turn.

Practise converting every tone word you write into a sentence about consequence. If the tone is elegiac, what does the poem ask the reader to do with the loss? If it is contemptuous, whom does the contempt serve? Answering that question is the difference between describing a passage and interpreting it.
`),
    ],
    glossary: [
      { term: "Tone", definition: "The attitude a text communicates toward its subject and audience, produced by diction, syntax, and detail." },
      { term: "Symbol", definition: "An object, image, or action that the text returns to and loads with meaning beyond its literal function." },
      { term: "Ambiguity", definition: "A deliberate openness to more than one reading, created and controlled by textual detail." },
      { term: "Motif", definition: "A recurring image, phrase, or situation that accumulates meaning across a work." },
      { term: "Understatement", definition: "Deliberate restraint in expression that increases emphasis by refusing it." },
    ],
    examAlignment: {
      title: "Prose fiction analysis, second pass",
      description: "Units 1, 4, and 7 all test the same skill at increasing difficulty: explaining how selection and detail produce meaning.",
      criteria: [
        "Quote the phrase that produces the tone before naming the tone.",
        "Explain a symbol through its position in the scene, not through convention alone.",
        "When a passage is ambiguous, argue for the relationship between the readings.",
      ],
      sources: ["cb-ap-lit-ced", "cb-ap-lit-frq"],
    },
    practice: [
      {
        question: "Which of the following best supports a claim that a window functions as a symbol in a passage?",
        options: [
          "The word 'window' appears in the first paragraph.",
          "The character looks through the window at a life she cannot enter, and the narrative returns to it at the moment she recognises her own feeling.",
          "Windows are traditionally associated with hope.",
          "The story is set in a house with several windows.",
        ],
        correctIndex: 1,
        explanation: "A symbol is established by repeated, meaningful use within the scene. One mention, a conventional association, or architectural description is not enough.",
        skill: "Symbolism",
      },
      {
        question: "A narrator describes a disastrous evening in short, flat sentences with almost no adjectives. The most defensible description of the tone is",
        options: [
          "cheerful, because the sentences are short",
          "restrained, with the flatness making the disaster feel more severe",
          "confused, because adjectives are missing",
          "romantic, because the evening is described in detail",
        ],
        correctIndex: 1,
        explanation: "The syntax withholds emphasis, and that withholding is the tone. Short sentences are not inherently cheerful, and missing adjectives do not imply confusion.",
        skill: "Tone and syntax",
      },
    ],
  },
  {
    unitNumber: 5,
    title: "Unit 5 · Poetry II: sound, metre, and the shape of a sentence",
    description:
      "Hear what a poem is doing: stress and metre, rhyme and refrain, and syntax that stretches or breaks the line it occupies.",
    examWeight: "Poetry · 36–45% of multiple-choice passage weight across Units 2, 5, and 8",
    objectives: [
      "Scan a regular line and explain a meaningful deviation from the pattern.",
      "Explain the effect of rhyme, refrain, or alliteration without merely naming it.",
      "Analyse how syntax works with or against the line.",
    ],
    sections: [
      section("Metre is a pattern and a promise", ["cb-ap-lit-ced", "poetry-foundation-terms"], `
Metre establishes expectation, and expectation is what makes variation meaningful. A line of iambic pentameter sets a rhythm of five unstressed-stressed pairs; when a foot inverts, the reader feels the emphasis shift. The point of scansion is not to label a poem but to notice where the pattern is broken and what the break does.

Two cautions. First, not every poem is metrical, and free verse organises rhythm by other means — breath, repetition, sentence length, the placement of stresses around line breaks. Second, a single metrical fact rarely carries an essay. Pair it with meaning: if the metre breaks on the word "break", the coincidence is worth a sentence of commentary, not a paragraph.
`),
      section("Rhyme and refrain as structure", ["cb-ap-lit-ced", "folger-shakespeare"], `
Rhyme creates relationships between words that have no logical connection, and those relationships can argue. When a poem rhymes "breath" with "death", the sound asserts a kinship the poem may then explore or resist. Refrains do similar work at a larger scale: a repeated line returns changed because the context around it has changed, even when the words are identical.

Ask what the rhyme scheme is doing to the poem's logic. A couplet that closes a sonnet tends to deliver a verdict, because the closed rhyme sounds final. A poem that refuses to rhyme at its most emotional moment may be refusing consolation. These are claims about form as argument, which is exactly what the upper commentary row rewards.
`),
      section("Syntax against the line", ["cb-ap-lit-ced", "poetry-foundation-terms"], `
Poems can place a sentence boundary in the middle of a line or run a sentence across several lines. When syntax and line contradict each other, the tension is expressive. A short sentence in a long line sounds isolated; a long sentence broken across short lines feels breathless or withheld.

Read a stanza aloud and mark where you would pause for grammar, then mark where the line forces a pause. Every mismatch is a candidate for commentary. Then explain what the mismatch does to the reader's understanding: does it delay a verb, isolate a pronoun, or make a clause feel like an afterthought? The explanation, not the observation, is the point.
`),
      section("Sound is sense in the mouth", ["cb-ap-lit-ced", "poetry-foundation-terms"], `
Alliteration, assonance, and consonance are easy to spot and easy to over-claim. The safe question is what the sound makes the reader do: slow down, hiss, stumble, or glide. A cluster of sibilants can be sinister or soothing depending on the words they attach to; the sound alone does not decide.

Choose one sound effect that recurs and explain its work in one sentence. Then move on. An essay that lists five sound devices has described the poem; an essay that explains one has interpreted it. Readers reward the second because the second is harder and more useful.
`),
      section("Writing about form without losing the argument", ["cb-ap-lit-ced", "cb-ap-lit-frq"], `
The risk with formal analysis is that the essay becomes a tour of devices. Guard against it by attaching every formal observation to a claim about meaning. "The poem is written in iambic pentameter" is a fact; "the regularity of the metre makes the poem's single inversion at 'break' sound like the moment the argument gives way" is a claim.

In the exam essay, keep formal vocabulary minimal and purposeful. Two or three precisely used terms, each tied to an effect, will read better than ten labels. The reader is scoring your reasoning, not your glossary.
`),
    ],
    glossary: [
      { term: "Iambic pentameter", definition: "A line of five iambic feet, each an unstressed syllable followed by a stressed one." },
      { term: "Enjambment", definition: "The continuation of a sentence past a line break without punctuation." },
      { term: "Refrain", definition: "A line or phrase repeated at intervals, whose meaning changes with its context." },
      { term: "Assonance", definition: "Repetition of vowel sounds within nearby words." },
      { term: "Free verse", definition: "Poetry without a fixed metrical pattern, organised by other rhythmic means." },
    ],
    examAlignment: {
      title: "Poetry analysis, second pass",
      description: "Formal analysis earns points only when it is tied to a claim about meaning.",
      criteria: [
        "Attach each formal observation to an effect on the reader or a claim about the poem's argument.",
        "Use no more than three technical terms, each explained in context.",
        "Treat rhyme, metre, and syntax as parts of one design rather than separate checklists.",
      ],
      sources: ["cb-ap-lit-ced", "cb-ap-lit-frq"],
    },
    practice: [
      {
        question: "A poem written in regular iambic pentameter inverts the metre on the word 'break'. Which sentence is the strongest commentary?",
        options: [
          "The poem is in iambic pentameter, which is a common metre.",
          "The inversion on 'break' interrupts the pattern at the moment the argument gives way, so the sound enacts the rupture the line describes.",
          "The poet uses an inversion, which is a metrical device.",
          "The poem does not rhyme, which makes it modern.",
        ],
        correctIndex: 1,
        explanation: "Only the second sentence connects the metrical fact to a specific effect and a claim about the poem's argument.",
        skill: "Prosody and meaning",
      },
      {
        question: "What is the most defensible claim about a refrain that repeats the same line four times?",
        options: [
          "The repetition shows the poet had limited vocabulary.",
          "The repeated line means the same thing each time.",
          "Each return recontextualises the line, so its meaning shifts even though its words do not.",
          "Refrains are required in all formal poetry.",
        ],
        correctIndex: 2,
        explanation: "Refrains gather meaning from the stanzas that precede them; the words stay fixed while the context changes them.",
        skill: "Repetition and structure",
      },
    ],
  },
];
