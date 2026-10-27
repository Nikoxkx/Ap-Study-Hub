import type { ExamFrq, ExamQuestion, Stimulus } from "./types";
import { sixPointLiterary } from "./rubrics";

/**
 * AP English Literature and Composition — interim assessment bank.
 *
 * Five passage sets, in the official pattern: two poetry, two prose fiction,
 * and a fifth set from drama. Eleven questions per set, fifty-five in total,
 * which is the published count for Section I.
 *
 * Every passage here is public domain and reproduced with its original line
 * numbering or paragraph structure. The questions are original; none is a
 * released College Board item, and the prompts follow the published task
 * descriptions rather than reproducing released prompts.
 */

interface LitItem {
  q: string;
  options: [string, string, string, string];
  correct: number;
  explanation: string;
  skill: string;
  unit: number;
}

const toQuestions = (stimulusId: string, items: LitItem[]): ExamQuestion[] =>
  items.map((item, index) => ({
    key: `${stimulusId}-q${index + 1}`,
    stimulusId,
    question: item.q,
    options: item.options,
    correctIndex: item.correct,
    explanation: item.explanation,
    skill: item.skill,
    unitNumber: item.unit,
  }));

export const apLitWorkList = [
  "Jane Austen, Pride and Prejudice",
  "Charlotte Brontë, Jane Eyre",
  "Emily Brontë, Wuthering Heights",
  "Kate Chopin, The Awakening",
  "Joseph Conrad, Heart of Darkness",
  "Charles Dickens, Great Expectations",
  "F. Scott Fitzgerald, The Great Gatsby",
  "Charlotte Perkins Gilman, 'The Yellow Wallpaper'",
  "Nathaniel Hawthorne, The Scarlet Letter",
  "Henrik Ibsen, A Doll's House",
  "Henry James, The Turn of the Screw",
  "Toni Morrison, Beloved",
  "William Shakespeare, Hamlet",
  "William Shakespeare, Macbeth",
  "Mary Shelley, Frankenstein",
  "Oscar Wilde, The Picture of Dorian Gray",
  "Tennessee Williams, A Streetcar Named Desire",
];

/** The literary-argument question prints a list of works instead of a passage. */
export const apLitWorkListStimulus: Stimulus = {
  id: "lit-work-list",
  title: "Suggested works of literary merit",
  kind: "source",
  attribution:
    "The College Board prints a list of works with Question 3. Any work of comparable literary merit is acceptable; this list is a starting point, not a requirement.",
  text: apLitWorkList.map((work) => `• ${work}`).join("\n"),
};

export const apLitStimuli: Stimulus[] = [
  {
    id: "lit-sonnet-73",
    title: "Sonnet 73",
    kind: "poetry",
    attribution: "William Shakespeare, first published 1609. Public domain.",
    note: "Read the poem carefully before answering the questions that follow.",
    text: `That time of year thou mayst in me behold
When yellow leaves, or none, or few, do hang
Upon those boughs which shake against the cold,
Bare ruined choirs, where late the sweet birds sang.
In me thou see'st the twilight of such day
As after sunset fadeth in the west,
Which by and by black night doth take away,
Death's second self, that seals up all in rest.
In me thou see'st the glowing of such fire
That on the ashes of his youth doth lie,
As the deathbed whereon it must expire,
Consumed with that which it was nourished by.
This thou perceiv'st, which makes thy love more strong,
To love that well which thou must leave ere long.`,
  },
  {
    id: "lit-dickinson-death",
    title: "Because I could not stop for Death (c. 1863)",
    kind: "poetry",
    attribution: "Emily Dickinson. Public domain.",
    note: "Read the poem carefully before answering the questions that follow.",
    text: `Because I could not stop for Death –
He kindly stopped for me –
The Carriage held but just Ourselves –
And Immortality.

We slowly drove – He knew no haste
And I had put away
My labor and my leisure too,
For His Civility –

We passed the School, where Children strove
At Recess – in the Ring –
We passed the Fields of Gazing Grain –
We passed the Setting Sun –

Or rather – He passed Us –
The Dews drew quivering and Chill –
For only Gossamer, my Gown –
My Tippet – only Tulle –

We paused before a House that seemed
A Swelling of the Ground –
The Roof was scarcely visible –
The Cornice – in the Ground –

Since then – 'tis Centuries – and yet
Feels shorter than the Day
I first surmised the Horses' Heads
Were toward Eternity –`,
  },
  {
    id: "lit-austen-opening",
    title: "Pride and Prejudice, Chapter I (1813)",
    kind: "prose",
    attribution: "Jane Austen. Public domain.",
    note: "Read the passage carefully before answering the questions that follow.",
    text: `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.

However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters.

"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"

Mr. Bennet replied that he had not.

"But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."

Mr. Bennet made no answer.

"Do you not want to know who has taken it?" cried his wife impatiently.

"You want to tell me, and I have no objection to hearing it."

This was invitation enough.

"Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it that he agreed with Mr. Morris immediately; that he is to take possession before Michaelmas, and some of his servants are to be in the house by the end of next week."

"What is his name?"

"Bingley."

"Is he married or single?"

"Oh! single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!"

"How so? how can it affect them?"

"My dear Mr. Bennet," replied his wife, "how can you be so tiresome! You must know that I am thinking of his marrying one of them."

"Is that his design in settling here?"

"Design! nonsense, how can you talk so! But it is very likely that he may fall in love with one of them, and therefore you must visit him as soon as he comes."`,
  },
  {
    id: "lit-chopin-story",
    title: "The Story of an Hour (1894), opening",
    kind: "prose",
    attribution: "Kate Chopin. Public domain.",
    note: "Read the passage carefully before answering the questions that follow.",
    text: `Knowing that Mrs. Mallard was afflicted with a heart trouble, great care was taken to break to her as gently as possible the news of her husband's death.

It was her sister Josephine who told her, in broken sentences; veiled hints that revealed in half concealing. Her husband's friend Richards was there, too, near her. It was he who had been in the newspaper office when intelligence of the railroad disaster was received, with Brently Mallard's name leading the list of "killed." He had only taken the time to assure himself of its truth by a second telegram, and had hastened to forestall any less careful, less tender friend in bearing the sad message.

She did not hear the story as many women have heard the same, with a paralyzed inability to accept its significance. She wept at once, with sudden, wild abandonment, in her sister's arms. When the storm of grief had spent itself she went away to her room alone. She would have no one follow her.

There stood, facing the open window, a comfortable, roomy armchair. Into this she sank, pressed down by a physical exhaustion that haunted her body and seemed to reach into her soul.

She could see in the open square before her house the tops of trees that were all aquiver with the new spring life. The delicious breath of rain was in the air. In the street below a peddler was crying his wares. The notes of a distant song which some one was singing reached her faintly, and countless sparrows were twittering in the eaves.`,
  },
  {
    id: "lit-macbeth-17",
    title: "Macbeth, Act I, scene vii, lines 1–28 (c. 1606)",
    kind: "drama",
    attribution: "William Shakespeare. Public domain.",
    note: "Read the soliloquy carefully before answering the questions that follow.",
    text: `MACBETH:
If it were done when 'tis done, then 'twere well
It were done quickly. If th' assassination
Could trammel up the consequence and catch
With his surcease success, that but this blow
Might be the be-all and the end-all here,
But here upon this bank and shoal of time,
We'd jump the life to come. But in these cases
We still have judgment here, that we but teach
Bloody instructions, which being taught, return
To plague th' inventor. This even-handed justice
Commends th' ingredience of our poisoned chalice
To our own lips. He's here in double trust:
First, as I am his kinsman and his subject,
Strong both against the deed; then, as his host,
Who should against his murderer shut the door,
Not bear the knife myself. Besides, this Duncan
Hath borne his faculties so meek, hath been
So clear in his great office, that his virtues
Will plead like angels, trumpet-tongued, against
The deep damnation of his taking-off;
And pity, like a naked new-born babe,
Striding the blast, or heaven's cherubin horsed
Upon the sightless couriers of the air,
Shall blow the horrid deed in every eye,
That tears shall drown the wind. I have no spur
To prick the sides of my intent, but only
Vaulting ambition, which o'erleaps itself
And falls on th' other.`,
  },
  {
    id: "lit-rossetti-remember",
    title: "Remember (1862)",
    kind: "poetry",
    attribution: "Christina Rossetti. Public domain.",
    note: "Read the poem carefully. Then write an essay in response to the prompt.",
    text: `Remember me when I am gone away,
Gone far away into the silent land;
When you can no more hold me by the hand,
Nor I half turn to go yet turning stay.
Remember me when no more day by day
You tell me of our future that you plann'd:
Only remember me; you understand
It will be late to counsel then or pray.
Yet if you should forget me for a while
And afterwards remember, do not grieve:
For if the darkness and corruption leave
A vestige of the thoughts that once I had,
Better by far you should forget and smile
Than that you should remember and be sad.`,
  },
  {
    id: "lit-gilman-yellowpaper",
    title: "The Yellow Wallpaper (1892), opening",
    kind: "prose",
    attribution: "Charlotte Perkins Gilman. Public domain.",
    note: "Read the passage carefully. Then write an essay in response to the prompt.",
    text: `It is very seldom that mere ordinary people like John and myself secure ancestral halls for the summer.

A colonial mansion, a hereditary estate, I would say a haunted house, and reach the height of romantic felicity—but that would be asking too much of fate!

Still I will proudly declare that there is something queer about it.

Else, why should it be let so cheaply? And why have stood so long untenanted?

John laughs at me, of course, but one expects that in marriage.

John is a physician, and perhaps—(I would not say it to a living soul, of course, but this is dead paper and a great relief to my mind)—perhaps that is one reason I do not get well faster.

You see, he does not believe I am sick!

And what can one do?

If a physician of high standing, and one's own husband, assures friends and relatives that there is really nothing the matter with one but temporary nervous depression—a slight hysterical tendency—what is one to do?

Personally, I disagree with their ideas.

Personally, I believe that congenial work, with excitement and change, would do me good.

But what is one to do?`,
  },
  apLitWorkListStimulus,
];

export const apLitQuestions: ExamQuestion[] = [
  ...toQuestions("lit-sonnet-73", [
    {
      q: "The three quatrains of the poem develop their argument chiefly through",
      options: [
        "a sequence of metaphors for approaching death drawn from the seasons, the day, and a fire",
        "a narrative of a journey the speaker has taken away from the beloved",
        "allusions to classical mythology that distance the speaker from his own decline",
        "direct dialogue between the speaker and the young man he addresses",
      ],
      correct: 0,
      explanation:
        "Each quatrain supplies one metaphor for the speaker's age — late autumn, twilight, and a dying fire — and each is introduced by the same frame, 'In me thou see'st'. The poem never narrates a journey and has no dialogue.",
      skill: "Structure and extended metaphor",
      unit: 2,
    },
    {
      q: "In line 4, 'Bare ruined choirs' most probably refers to",
      options: [
        "church choirs disbanded during the Reformation",
        "the bare branches of trees where birds once sang",
        "the speaker's abandoned religious faith",
        "the songs the beloved will no longer hear",
      ],
      correct: 1,
      explanation:
        "The phrase completes the image of boughs that 'shake against the cold' and 'where late the sweet birds sang'. The choir is a metaphor for the branches, not a literal reference to church music, though the religious resonance colours the line.",
      skill: "Figurative language",
      unit: 2,
    },
    {
      q: "In line 8, 'Death's second self' is a figure for",
      options: ["the beloved", "winter", "night", "memory"],
      correct: 2,
      explanation:
        "The preceding lines describe 'black night' which 'doth take away' the day; night is named death's likeness because it 'seals up all in rest'. Winter appears earlier only as the season of the first quatrain.",
      skill: "Close reading of a line",
      unit: 2,
    },
    {
      q: "The repetition of 'In me thou see'st' in lines 5 and 9 chiefly serves to",
      options: [
        "emphasise the speaker's self-absorption at the expense of the listener",
        "structure the poem as parallel meditations while insisting that the beloved look at him",
        "imply that the beloved is imagining the speaker's decline",
        "signal that the poem's argument has begun to contradict itself",
      ],
      correct: 1,
      explanation:
        "The repeated clause is anaphora: it builds the three-part structure and keeps the second person ('thou') active. The poem's argument depends on the beloved recognising the decline, so self-absorption is the wrong reading.",
      skill: "Diction and syntax",
      unit: 2,
    },
    {
      q: "The poem turns, in the couplet, because the speaker moves from",
      options: [
        "images of natural decay to a statement about the effect of that decay on love",
        "the beloved's feelings to his own feelings",
        "metaphor to literal statement about the weather",
        "certainty about death to doubt about an afterlife",
      ],
      correct: 0,
      explanation:
        "The first twelve lines present three images of decline; line 13 shifts to consequence — 'This thou perceiv'st, which makes thy love more strong'. That is the volta.",
      skill: "Structure and volta",
      unit: 2,
    },
    {
      q: "The tone of the first three quatrains is best described as",
      options: [
        "self-pitying and accusatory",
        "meditative and unflinching",
        "bitter and sarcastic",
        "anxious and pleading",
      ],
      correct: 1,
      explanation:
        "The speaker catalogues his decline with images rather than complaint, and the elegiac calm is what makes the couplet's warmth credible. There is no accusation of the beloved.",
      skill: "Tone and attitude",
      unit: 2,
    },
    {
      q: "Line 12, 'Consumed with that which it was nourished by,' is best understood as",
      options: [
        "a paradox in which the fire is destroyed by the same material that sustained it",
        "a reference to the beloved's indifference",
        "a warning that love consumes those who feel it",
        "a description of the sunset fading into night",
      ],
      correct: 0,
      explanation:
        "The fire 'on the ashes of his youth doth lie': the fuel that once fed the flame is now the material that extinguishes it. The paradox makes aging self-consuming rather than merely passive.",
      skill: "Paradox and figurative language",
      unit: 2,
    },
    {
      q: "The couplet implies that the beloved's love grows stronger because",
      options: [
        "the beloved pities the speaker's weakness",
        "the speaker has asked for reassurance",
        "what must be lost is recognised as precious",
        "the beloved is frightened of being alone",
      ],
      correct: 2,
      explanation:
        "'To love that well which thou must leave ere long' links intensity of love to awareness of loss. Pity is not the claim; the poem has just spent twelve lines avoiding self-pity.",
      skill: "Theme and implication",
      unit: 2,
    },
    {
      q: "The syntax of the poem is characterised by",
      options: [
        "short paratactic clauses with almost no subordination",
        "long periodic sentences whose main claims arrive late",
        "imperatives addressed to the reader",
        "questions that remain unanswered",
      ],
      correct: 1,
      explanation:
        "Sentences such as lines 5–8 suspend the main clause behind relative clauses ('Which by and by black night doth take away'). The effect is deliberation, not haste.",
      skill: "Syntax",
      unit: 2,
    },
    {
      q: "The personification in 'those boughs which shake against the cold' contributes to the poem's meaning by",
      options: [
        "making the landscape seem indifferent to human suffering",
        "presenting the speaker's frailty as a bodily shivering shared with the trees",
        "introducing a religious metaphor",
        "suggesting that the season is unusually severe",
      ],
      correct: 1,
      explanation:
        "The boughs shiver like a body, so the opening image quietly makes the speaker's body present before he names it. The landscape is not indifferent; it is an image of him.",
      skill: "Figurative language",
      unit: 2,
    },
    {
      q: "The metaphor of twilight in the second quatrain contributes chiefly by",
      options: [
        "presenting death as a gradual fading rather than a single event",
        "suggesting that the speaker fears the dark",
        "introducing the theme of religious doubt",
        "contrasting the speaker's age with the beloved's youth",
      ],
      correct: 0,
      explanation:
        "Twilight 'fadeth in the west' and is then taken away by night: the image gives death a slow, incremental motion, which the fire image continues.",
      skill: "Figurative language and meaning",
      unit: 2,
    },
  ]),
  ...toQuestions("lit-dickinson-death", [
    {
      q: "Death, in the first stanza, is characterised as",
      options: [
        "a violent abductor",
        "a courteous gentleman caller",
        "an abstraction the speaker cannot picture",
        "a figure the speaker resists openly",
      ],
      correct: 1,
      explanation:
        "'He kindly stopped for me' and 'His Civility' cast Death as a polite escort; the carriage and the caller's patience belong to courtship, not kidnapping.",
      skill: "Characterisation and personification",
      unit: 8,
    },
    {
      q: "The poem's matter-of-fact tone is achieved chiefly through",
      options: [
        "biblical allusion",
        "calm, conversational diction applied to a solemn subject",
        "heavy alliteration and onomatopoeia",
        "a regular rhyme scheme",
      ],
      correct: 1,
      explanation:
        "The speaker reports her own death in the register of a social call ('I had put away / My labor and my leisure too'). The incongruity between manner and subject produces the tone.",
      skill: "Tone",
      unit: 8,
    },
    {
      q: "'He knew no haste' most strongly suggests",
      options: [
        "Death is inefficient",
        "the speaker is impatient to arrive",
        "Death operates outside human time",
        "the journey is short",
      ],
      correct: 2,
      explanation:
        "The slow drive, elaborated in the following stanzas, removes the journey from ordinary time; by the final stanza centuries feel shorter than a day.",
      skill: "Interpretation of detail",
      unit: 8,
    },
    {
      q: "The three 'We passed' clauses in stanza three",
      options: [
        "catalogue stages of life — childhood, maturity, and the setting sun — in a measured processional rhythm",
        "describe a single afternoon in chronological order",
        "show that the speaker is losing her memory",
        "introduce the poem's only natural imagery",
      ],
      correct: 0,
      explanation:
        "School, grain, and sunset are conventionally read as childhood, adulthood, and the end of life; the anaphora gives the passage its ceremonial pace.",
      skill: "Structure and symbolism",
      unit: 8,
    },
    {
      q: "The correction 'Or rather – He passed Us –' implies that",
      options: [
        "the speaker has misremembered the journey",
        "the sun has overtaken the carriage because the speaker is no longer in time",
        "the driver has changed direction",
        "the speaker is addressing the reader directly",
      ],
      correct: 1,
      explanation:
        "The speaker revises her own verb: it is not that they passed the sun, but that the sun passed them, because time has ceased to apply to her.",
      skill: "Close reading of a shift",
      unit: 8,
    },
    {
      q: "'Gossamer' and 'Tulle' in stanza four suggest",
      options: [
        "wealth and social display",
        "the lightness and insubstantiality of the speaker's state",
        "the coldness of the weather",
        "a wedding dress worn ironically",
      ],
      correct: 1,
      explanation:
        "Both fabrics are transparent and nearly weightless; with 'quivering and Chill' they make the speaker's condition spectral rather than merely chilly.",
      skill: "Diction",
      unit: 8,
    },
    {
      q: "The 'House' in stanza five is best read as",
      options: ["the speaker's childhood home", "a church", "the grave", "the house of eternity"],
      correct: 2,
      explanation:
        "It is 'A Swelling of the Ground' whose roof is 'scarcely visible' and whose cornice is in the earth: a grave, seen from outside and slightly above.",
      skill: "Symbolism",
      unit: 8,
    },
    {
      q: "The dashes in the poem function chiefly to",
      options: [
        "indicate that lines have been lost from the manuscript",
        "create pauses that shift emphasis and imitate reflective speech",
        "separate the poem into sentences of equal length",
        "mark quotations from another text",
      ],
      correct: 1,
      explanation:
        "Dickinson's dashes are rhythmic and syntactic: they hold a thought, then release it, which is why the poem reads as thinking aloud.",
      skill: "Punctuation and syntax",
      unit: 8,
    },
    {
      q: "The final stanza changes the poem's temporal frame by",
      options: [
        "returning to the day of the ride and describing it in detail",
        "speaking from a vantage point in which centuries have already passed",
        "announcing the speaker's resurrection",
        "revealing that the journey was a dream",
      ],
      correct: 1,
      explanation:
        "'Since then – 'tis Centuries' establishes that the speaker now speaks after death, and the compression of time ('Feels shorter than the Day') completes the poem's argument about eternity.",
      skill: "Point of view and time",
      unit: 8,
    },
    {
      q: "The tone of the poem as a whole is best described as",
      options: [
        "horrified and resisting",
        "wry, unhurried acceptance",
        "sentimental mourning",
        "angry accusation",
      ],
      correct: 1,
      explanation:
        "The courtesy, the slow drive, and the matter-of-fact final stanza all withhold horror; the poem's wit is in treating death as an ordinary engagement.",
      skill: "Tone",
      unit: 8,
    },
    {
      q: "The carriage ride is best understood as an allegory of",
      options: [
        "a courtship that ends in marriage",
        "the journey from life into eternity",
        "a journey the speaker takes to escape grief",
        "the soul's judgement before God",
      ],
      correct: 1,
      explanation:
        "The elements of the ride — escort, slow pace, passing landscape, grave, eternity — map onto dying itself. The courtship imagery serves the allegory rather than replacing it.",
      skill: "Allegory",
      unit: 8,
    },
  ]),
  ...toQuestions("lit-austen-opening", [
    {
      q: "The effect of the opening sentence depends on",
      options: [
        "a universal-sounding maxim that the rest of the passage quietly contradicts",
        "a quotation from an unnamed philosopher",
        "an anecdote about a neighbouring family",
        "direct address to the reader",
      ],
      correct: 0,
      explanation:
        "The sentence announces a 'truth universally acknowledged' which is in fact a statement about what neighbourhood families want. The narrator's irony is in the gap between the claim and its source.",
      skill: "Irony",
      unit: 1,
    },
    {
      q: "'A truth universally acknowledged' is best described as",
      options: [
        "a sincere statement of the narrator's beliefs",
        "an ironic cliché that the novel proceeds to test",
        "a quotation from Mr. Bennet",
        "a legal formula used in property disputes",
      ],
      correct: 1,
      explanation:
        "The novel's plot tests the maxim repeatedly; the phrasing wears its authority as a joke, and the second paragraph's 'rightful property' continues the legalistic irony.",
      skill: "Narrative voice",
      unit: 1,
    },
    {
      q: "Mr. Bennet's character is established chiefly through",
      options: [
        "description of his appearance",
        "his dry, deflating replies to his wife",
        "reported opinions from Mrs. Long",
        "his financial dealings",
      ],
      correct: 1,
      explanation:
        "'You want to tell me, and I have no objection to hearing it' is characteristic: he withholds reaction and lets his wife perform, which the narrator finds amusing.",
      skill: "Characterisation through dialogue",
      unit: 1,
    },
    {
      q: "Mrs. Bennet's speech is characterised by",
      options: [
        "measured argument and qualification",
        "exclamations, rapid shifts, and impatient rhetorical questions",
        "long subordinate clauses and legal diction",
        "deliberate understatement",
      ],
      correct: 1,
      explanation:
        "'Oh! single, my dear, to be sure!' and 'how can you be so tiresome!' show the exclamatory, impatient register that the narrator reports without comment.",
      skill: "Diction and characterisation",
      unit: 1,
    },
    {
      q: "The phrase 'the rightful property of some one or other of their daughters' is ironic because",
      options: [
        "it applies the language of ownership to a marriage prospect",
        "it is factually inaccurate about the entailment",
        "it is spoken by Mrs. Bennet",
        "it contradicts the first sentence",
      ],
      correct: 0,
      explanation:
        "The legal register ('rightful property') turns a young man into an object to be claimed, which exposes the market logic behind the neighbourhood's interest.",
      skill: "Irony and diction",
      unit: 1,
    },
    {
      q: "The narrative point of view in the passage is",
      options: [
        "first person, from Mrs. Bennet's perspective",
        "third-person omniscient with an ironic narrator who moves between both characters' motives",
        "third-person limited to Mr. Bennet",
        "dramatic, with no narrator's commentary",
      ],
      correct: 1,
      explanation:
        "The narrator reports both characters' minds ('This was invitation enough') and comments on them. There is no 'I' among the characters, but the narrator's judgement is audible.",
      skill: "Point of view",
      unit: 1,
    },
    {
      q: "Mr. Bennet's question 'Is that his design in settling here?' functions to",
      options: [
        "express genuine curiosity about Bingley's plans",
        "pretend to take his wife's assumption literally so that it sounds absurd",
        "criticise the entailment of the estate",
        "reveal that he has already met Bingley",
      ],
      correct: 1,
      explanation:
        "By asking whether marrying one of the daughters is Bingley's 'design', he holds the inference up to the light. The joke is at his wife's expense, and she notices — 'Design! nonsense'.",
      skill: "Irony and characterisation",
      unit: 1,
    },
    {
      q: "The passage's humour depends most on",
      options: [
        "slapstick stage business",
        "the reader's awareness of a gap between what is said and what the narrator thinks",
        "unusual vocabulary",
        "an unexpected reversal at the end",
      ],
      correct: 1,
      explanation:
        "Austen's irony is stable: the narrator's judgement is available to a reader who notices the inflated maxim and the deflating replies, even though no character states it.",
      skill: "Irony",
      unit: 1,
    },
    {
      q: "The opening of the novel serves the whole work chiefly by",
      options: [
        "introducing every major character",
        "establishing marriage as a social and economic transaction the plot will complicate",
        "explaining the system of entailment",
        "foreshadowing a specific ending",
      ],
      correct: 1,
      explanation:
        "The chapter sets the market in husbands against which the novel's later marriages — including one based on esteem rather than property — are measured.",
      skill: "Structure and theme",
      unit: 1,
    },
    {
      q: "The narrator's description of Mrs. Bennet as 'impatient' after her exclamation is an example of",
      options: [
        "free indirect discourse that lends the narrator's judgement",
        "a stage direction",
        "Mrs. Bennet's own reported speech",
        "an objective report with no evaluation",
      ],
      correct: 0,
      explanation:
        "The narration slides into the character's manner while keeping the narrator's disapproving frame; the adjective judges as it reports, a hallmark of Austen's free indirect style.",
      skill: "Narrative technique",
      unit: 1,
    },
    {
      q: "The phrase 'This was invitation enough' implies that",
      options: [
        "Mrs. Bennet has been formally invited to speak",
        "Mr. Bennet's minimal response is all the encouragement his wife needs",
        "the couple is expecting guests for dinner",
        "the narrator disapproves of Mr. Bennet's silence",
      ],
      correct: 1,
      explanation:
        "The clause names what the reader has just seen: a husband who says almost nothing and a wife who requires almost nothing to continue. It is comic shorthand for the marriage.",
      skill: "Close reading",
      unit: 1,
    },
  ]),
  ...toQuestions("lit-chopin-story", [
    {
      q: "The phrase 'a heart trouble' in the first sentence functions as",
      options: [
        "a medical detail with no further significance",
        "a literal condition that also anticipates the story's emotional and ironic ending",
        "a metaphor for her unhappy marriage from the outset",
        "a hint that she will recover",
      ],
      correct: 1,
      explanation:
        "The phrase is literal — she has a cardiac condition — and the story's ending depends on it, while 'heart' also carries the emotional weight the narrative will complicate.",
      skill: "Foreshadowing",
      unit: 4,
    },
    {
      q: "'Veiled hints that revealed in half concealing' is an example of",
      options: [
        "paradox used to describe language that both hides and discloses",
        "hyperbole",
        "understatement",
        "apostrophe",
      ],
      correct: 0,
      explanation:
        "The phrase yokes 'revealed' and 'concealing' in one description of Josephine's broken sentences; the contradiction is the point.",
      skill: "Figurative language",
      unit: 4,
    },
    {
      q: "The narrator notes that she 'did not hear the story as many women have heard the same' in order to",
      options: [
        "criticise her for insufficient grief",
        "signal that her response will differ from the expected one",
        "show that she did not understand the news",
        "establish the story's religious frame",
      ],
      correct: 1,
      explanation:
        "The comparison sets up an expectation — 'paralyzed inability to accept' — that the next sentence overturns with 'She wept at once'. The difference matters to the plot.",
      skill: "Narrative setup",
      unit: 4,
    },
    {
      q: "'The storm of grief' is effective because",
      options: [
        "it compares an inward state to a violent external force, then gives way to calm",
        "it describes the weather outside the house",
        "it is a mixed metaphor",
        "it prepares for the railroad disaster",
      ],
      correct: 0,
      explanation:
        "The metaphor makes grief a weather event that 'had spent itself', which allows the narrative to move her from the storm into the quiet room where the story's real subject emerges.",
      skill: "Metaphor",
      unit: 4,
    },
    {
      q: "The description of the armchair as 'comfortable, roomy' most likely suggests",
      options: [
        "the modest wealth of the Mallards",
        "an embrace that is welcoming rather than oppressive",
        "the emptiness of the house",
        "her physical exhaustion alone",
      ],
      correct: 1,
      explanation:
        "The adjectives choose the chair's receptiveness; 'she sank' into it, and the room that follows is full of life rather than death.",
      skill: "Connotation",
      unit: 4,
    },
    {
      q: "The images outside the window — 'new spring life', 'delicious breath of rain', sparrows — function to",
      options: [
        "contrast the vitality of the world with the death indoors",
        "show that the season is spring",
        "establish the story's setting in a city",
        "distract the reader from the plot",
      ],
      correct: 0,
      explanation:
        "Every detail is alive and forward-looking while the house contains a reported death, which prepares the reader for the feeling she is about to recognise but cannot yet name.",
      skill: "Imagery and contrast",
      unit: 4,
    },
    {
      q: "The point of view of the passage is",
      options: [
        "first person",
        "third-person limited, tracking Louise's perceptions and sensations",
        "omniscient, with access to every character's mind",
        "dramatic, with dialogue only",
      ],
      correct: 1,
      explanation:
        "The narration stays at the surface of her body and attention — what she sees, feels, and refuses to name — which is why the later realisation arrives as a discovery rather than a statement.",
      skill: "Point of view",
      unit: 4,
    },
    {
      q: "The phrase 'pressed down by a physical exhaustion that haunted her body and seemed to reach into her soul' implies",
      options: [
        "that her exhaustion is only physical",
        "that grief and something else are already mixed in her response",
        "that she is pretending to be tired",
        "that she is physically ill from the news alone",
      ],
      correct: 1,
      explanation:
        "'Haunted' and 'seemed to reach into her soul' leave the cause of the exhaustion ambiguous, which the story needs: she is not only grieving.",
      skill: "Ambiguity and diction",
      unit: 4,
    },
    {
      q: "The passage's structural movement is from",
      options: [
        "private feeling to public event",
        "reported news and public ritual to private sensation in the room",
        "dialogue to description",
        "the past to the present",
      ],
      correct: 1,
      explanation:
        "It begins with how the news was broken to her and ends with her alone at a window, which is the direction the whole story takes.",
      skill: "Structure",
      unit: 4,
    },
    {
      q: "The tone of the passage is best described as",
      options: [
        "detached and clinical",
        "restrained, then quietly expectant",
        "satirical",
        "sentimental and overwrought",
      ],
      correct: 1,
      explanation:
        "The prose reports grief with restraint, then fills the room with sensory life; the effect is expectancy rather than mourning or mockery.",
      skill: "Tone",
      unit: 4,
    },
    {
      q: "The detail that Richards 'had only taken the time to assure himself of its truth by a second telegram' is included to",
      options: [
        "show that the report of the death is reliable",
        "criticise the telegraph system",
        "reveal Richards's romantic interest in Louise",
        "establish the story's historical period",
      ],
      correct: 0,
      explanation:
        "The double-check removes doubt about the news, which makes the story's ending — and the reader's understanding of it — depend on something other than a mistake about the death.",
      skill: "Authorial choice",
      unit: 4,
    },
  ]),
  ...toQuestions("lit-macbeth-17", [
    {
      q: "The repetition of 'done' in the first line plays on the difference between",
      options: [
        "an action completed and an action finished with",
        "a public act and a private one",
        "past and future tenses",
        "a deed and a word",
      ],
      correct: 0,
      explanation:
        "The line wishes the murder could be 'done' in the sense of completed and also 'done' in the sense of finished with — no consequences. The distinction drives the whole speech.",
      skill: "Wordplay",
      unit: 3,
    },
    {
      q: "'This bank and shoal of time' presents human life as",
      options: [
        "a river that flows toward the sea",
        "a narrow, precarious strip between two eternities",
        "a marketplace of ambition",
        "a battlefield",
      ],
      correct: 1,
      explanation:
        "A bank or shoal is a shallow shelf surrounded by deeper water; the metaphor makes mortal life a small, risky interval before the 'life to come'.",
      skill: "Figurative language",
      unit: 3,
    },
    {
      q: "'We'd jump the life to come' most nearly means",
      options: [
        "we would leap into eternal life",
        "we would risk or gamble away the afterlife",
        "we would skip over our remaining years",
        "we would escape judgement",
      ],
      correct: 1,
      explanation:
        "The conditional logic is: if the murder had no consequence here, we would accept the risk to the afterlife. It is a wager, not a hope.",
      skill: "Interpretation of a line",
      unit: 3,
    },
    {
      q: "The image of the 'poisoned chalice' returned to 'our own lips' conveys",
      options: [
        "the inevitability of retribution for bloodshed",
        "the sacrament of communion",
        "Duncan's fondness for wine",
        "the weakness of the king",
      ],
      correct: 0,
      explanation:
        "'This even-handed justice' hands the poison back to the poisoner: the speech's argument is that violent instruction returns to its teacher.",
      skill: "Figurative language",
      unit: 3,
    },
    {
      q: "'He's here in double trust' refers to Duncan's trust in Macbeth as",
      options: [
        "a soldier and a friend",
        "a kinsman and a subject, and then as his host",
        "a thane and a prophet",
        "a cousin and a rival",
      ],
      correct: 1,
      explanation:
        "The speech lists four relations: kinsman, subject, host, and then adds the duty a host owes a guest. Double trust names two categories, each of which multiplies his obligation.",
      skill: "Close reading of argument",
      unit: 3,
    },
    {
      q: "The comparison of Duncan's virtues to 'angels, trumpet-tongued' works by",
      options: [
        "making the king's goodness vocal and public, so that the murder will be universally condemned",
        "suggesting that Duncan is divine",
        "introducing a musical motif",
        "implying that the king is weak",
      ],
      correct: 0,
      explanation:
        "The virtues 'plead' and 'blow the horrid deed in every eye': goodness becomes a publicity that makes concealment impossible.",
      skill: "Figurative language",
      unit: 3,
    },
    {
      q: "The image of pity as 'a naked new-born babe, / Striding the blast' is striking because it",
      options: [
        "compares helplessness to power, mixing vulnerability with force",
        "refers to Macbeth's own childhood",
        "suggests that Duncan is childish",
        "introduces a Christian allegory",
      ],
      correct: 0,
      explanation:
        "A newborn cannot stride a storm; the mixed image makes pity both utterly weak and unstoppable, which is exactly the paradox Macbeth is trying to reason away.",
      skill: "Imagery and paradox",
      unit: 3,
    },
    {
      q: "The movement of the soliloquy is from",
      options: [
        "hypothetical reasoning to moral condemnation of the deed",
        "grief to anger",
        "loyalty to open rebellion",
        "prayer to blasphemy",
      ],
      correct: 0,
      explanation:
        "It begins with 'If it were done' and ends with ambition overreaching itself; the sequence is argument, not emotion, which is why it is so chilling.",
      skill: "Structure of argument",
      unit: 3,
    },
    {
      q: "'Vaulting ambition, which o'erleaps itself / And falls on th' other' suggests that ambition",
      options: [
        "is a noble but doomed quality",
        "overreaches and destroys the one who has it",
        "is the only motive Macbeth has ever had",
        "is a horse that cannot be controlled",
      ],
      correct: 1,
      explanation:
        "The equestrian metaphor — a rider who vaults over the saddle and falls — makes ambition self-defeating. It is the speech's conclusion, not its premise.",
      skill: "Metaphor and theme",
      unit: 3,
    },
    {
      q: "'I have no spur / To prick the sides of my intent, but only / Vaulting ambition' reveals that Macbeth",
      options: [
        "believes his ambition is a sufficient reason to kill",
        "recognises that ambition is the only motive he has, and that it is not a good one",
        "has decided not to kill Duncan",
        "is afraid of being discovered",
      ],
      correct: 1,
      explanation:
        "'Only' is the operative word: stripped of every other justification, he finds ambition alone, and the metaphor then tells him it destroys itself. He knows and proceeds.",
      skill: "Characterisation",
      unit: 3,
    },
    {
      q: "Dramatically, the soliloquy's chief effect is to",
      options: [
        "delay the plot without advancing character",
        "build tragic sympathy by showing a conscience at work before the crime",
        "reveal that Macbeth has no conscience",
        "establish the supernatural",
      ],
      correct: 1,
      explanation:
        "The audience hears a man argue himself out of murder on moral grounds and then watch him do it; the sympathy that produces is the tragedy's engine.",
      skill: "Dramatic effect",
      unit: 3,
    },
  ]),
];

/* ------------------------------------------------------------------ */
/* Free response                                                       */
/* ------------------------------------------------------------------ */

const literaryCoach = (minutes: number) => ({
  task:
    "Write an interpretation of a literary text, arguing what it means and how the writer's choices produce that meaning. The passage is your only evidence.",
  timeline: [
    { label: "Read twice", minutes: Math.round(minutes * 0.12), detail: "First pass: who speaks, what changes. Second pass: mark the turn, one repeated word, one strange image." },
    { label: "Thesis", minutes: Math.round(minutes * 0.1), detail: "Name the interpretation and the device or pattern that carries it. One sentence, no plot summary." },
    { label: "Draft", minutes: Math.round(minutes * 0.63), detail: "Four or five paragraphs. Each body paragraph: claim, short quotation, two sentences of commentary." },
    { label: "Revise", minutes: Math.round(minutes * 0.15), detail: "Cut every sentence that only retells. Check each paragraph advances the claim." },
  ],
  steps: [
    { title: "Annotate structure, not plot", detail: "Mark the volta, the stanza breaks, the pronouns. In a sonnet the turn is almost always the argument.", frame: "The poem turns at line ___ from ___ to ___." },
    { title: "Choose three details that repeat or change", detail: "Repetition, imagery, diction, syntax, punctuation. These become your body paragraphs." },
    { title: "Write a thesis that takes a risk", detail: "A claim that could be argued the other way earns the thesis point; a claim nobody would dispute usually does not.", frame: "By ___, the writer turns ___ into ___, revealing ___." },
    { title: "Commentary at two to one", detail: "For every line of quotation, write two sentences about how it works." },
    { title: "Close on meaning", detail: "End with what the text claims about its subject, not with a restatement of your thesis." },
  ],
  evidence: [
    "Quote four to eight words at a time and embed the quotation in your own sentence.",
    "Cite line numbers (poetry) or paragraphs (prose) so the reader can find it instantly.",
    "One detail explained deeply beats three details named.",
  ],
  argument: [
    "One device per body paragraph, one claim per device.",
    "Every paragraph should contain 'which' or 'because' linking evidence to meaning.",
    "Answer an alternative reading in one sentence — that is the cheapest sophistication point.",
  ],
  frames: [
    "The speaker's ___ suggests ___, but the ___ that follows complicates that reading by ___.",
    "The shift in ___ at line ___ reveals ___ rather than ___, which changes how we read the final ___.",
    "What looks like ___ is better understood as ___, because ___.",
  ],
  pitfalls: [
    "Summarising the passage instead of interpreting it.",
    "Naming a device without explaining its effect.",
    "Block quotations with no commentary.",
    "A thesis that lists three devices instead of making one claim.",
  ],
});

export const apLitFrqs: ExamFrq[] = [
  {
    id: "ap-lit-poetry",
    taskType: "Poetry Analysis",
    title: "Question 1 · Poetry analysis",
    prompt:
      "The following poem, 'Remember' by Christina Rossetti, is a sonnet in which a speaker addresses a loved one. Read the poem carefully. Then, in a well-written essay, analyze how Rossetti's use of point of view, imagery, and structure conveys the speaker's complex attitude toward being remembered.",
    directions:
      "Read the poem carefully. Then write an essay in which you analyze how the poet uses literary elements and techniques to convey the speaker's complex attitude. Your essay should present a defensible thesis and support it with evidence from the poem.",
    minutes: 40,
    rubricId: "six-literary",
    stimulusIds: ["lit-rossetti-remember"],
    points: 6,
    coach: literaryCoach(40),
    modelPath: [
      "Thesis: the poem's imperative 'remember' is also a release; the speaker's control of address turns a request for memory into a permission to forget, which is the poem's real gift.",
      "Body 1 — point of view: the second person and repeated imperative place the burden of remembering on the addressee, so the speaker's authority is paradoxically gentle.",
      "Body 2 — imagery: 'the silent land', 'darkness and corruption' make death a place without speech or counsel; the abstractions keep grief from becoming sentimental.",
      "Body 3 — structure: the sonnet's turn at 'Yet if you should forget me for a while' reverses the argument; the octave asks to be remembered, the sestet releases the addressee.",
      "Sophistication: the final line prefers the beloved's happiness to the speaker's memory, which makes the title an instruction that the poem itself learns to relax.",
    ],
  },
  {
    id: "ap-lit-prose",
    taskType: "Prose Fiction Analysis",
    title: "Question 2 · Prose fiction analysis",
    prompt:
      "The following is the opening of Charlotte Perkins Gilman's 1892 story 'The Yellow Wallpaper'. Read the passage carefully. Then, in a well-written essay, analyze how Gilman uses narrative voice, repetition, and imagery to establish the narrator's relation to the authority around her.",
    directions:
      "Read the passage carefully. Then write an essay analyzing how the author uses literary techniques to develop the narrator's perspective.",
    minutes: 40,
    rubricId: "six-literary",
    stimulusIds: ["lit-gilman-yellowpaper"],
    points: 6,
    coach: literaryCoach(40),
    modelPath: [
      "Thesis: the narrator's rational, confiding voice is itself evidence of the pressure she is under; her repeated 'what is one to do?' shows a mind circling an authority it cannot name directly.",
      "Body 1 — narrative voice: first person, present tense, and the aside in parentheses ('this is dead paper') create intimacy and a confession addressed to no one who can answer.",
      "Body 2 — repetition: 'personally', 'one', 'queer' recur, and the pronoun 'one' absorbs her own agency, showing how the medical judgement has colonised her grammar.",
      "Body 3 — imagery: the gothic house that is 'haunted' and 'let so cheaply' externalises her suspicion and her confinement.",
      "Sophistication: the narrator writes what she cannot say aloud, so the diary is both symptom and protest; her irony about John's 'high standing' is the only resistance available to her.",
    ],
  },
  {
    id: "ap-lit-argument",
    taskType: "Literary Argument",
    title: "Question 3 · Literary argument",
    prompt:
      "In many works of literature, a character must live with a truth that others cannot or will not acknowledge. Either from your own reading or from the list of suggested works, select a work of literary merit in which such a character appears. Then, in a well-written essay, analyze how the character's relation to that unacknowledged truth contributes to the meaning of the work as a whole. Do not merely summarize the plot.",
    directions:
      "Choose a work of literary merit. You may use a work from the list of suggested works beside this question or another work of comparable literary merit. Write an essay that presents a defensible thesis and supports it with specific evidence from the work you name.",
    minutes: 40,
    rubricId: "six-literary",
    points: 6,
    stimulusIds: ["lit-work-list"],
    coach: literaryCoach(40),
    modelPath: [
      "Thesis: in the chosen work, the character's unacknowledged truth is the pressure that structures every relationship, so the novel's meaning depends on what cannot be said aloud.",
      "Body 1 — establish the truth and who is excluded from it, with a specific scene.",
      "Body 2 — show how the concealment shapes language: what characters say instead, and to whom.",
      "Body 3 — show the cost at the climax; the moment the truth surfaces is the moment the work's argument becomes visible.",
      "Sophistication: consider whether the concealment protects anyone, complicating a simple judgement about honesty.",
    ],
  },
];


