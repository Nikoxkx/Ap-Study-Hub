import type { CourseDefense, WrittenWork } from "./types";

/**
 * AP English Literature written work and defense.
 *
 * The poems and passages quoted here are short, public-domain lines, and the
 * prompts are original. The marking is the published six-point analytic
 * rubric: thesis, evidence and commentary, sophistication.
 */
export const apLitWrittenWork: WrittenWork[] = [
  {
    id: "ap-lit-1",
    courseSlug: "ap-lit",
    unitNumber: 1,
    prompt:
      "Prose body paragraph: In this excerpt, a character returns to a house after years away. Explain how the setting reveals what she will not say aloud.",
    plan: [
      "Choose one detail about the house and one about her. That pair is the paragraph.",
      "Say what the setting is doing for the character, not what it symbolizes in general.",
    ],
    example: [
      "The house does the talking that the character will not. She notices the height of the doorframes before she notices the rooms, and the detail is the reader's first clue that she is measuring herself against a place she no longer fits; the passage never says she is changed, it says she has to duck. In the same paragraph the furniture is described as 'kept', a word that suggests maintenance rather than use, and the suggestion lands on her rather than on the chairs: someone has been preserving this room, and she is the reason it was preserved.",
      "By giving the setting the sentences the character refuses to speak, the excerpt makes her return feel like an argument she is losing quietly. Nothing in the passage is described as sad. The sadness is in what she notices, and in what she chooses not to touch.",
    ],
    because:
      "The paragraph has a thesis about function — the setting speaks for her — and two pieces of evidence that support it without repeating it. The last line refuses the easy word 'sad' and says where the feeling actually lives, which is the difference between the top two rows of the rubric and the middle one.",
    say: [
      "My claim is that the setting says what she cannot, so every piece of evidence has to be a detail she would notice.",
      "I chose the doorframes because the detail is physical and it implies a change in her without the narrator stating it.",
      "The word 'kept' is doing a lot of work, so I spent a sentence on it instead of quoting a longer passage.",
      "What I would say if challenged: I do not know why she left. The paragraph argues about her return, and I kept the claim inside what the excerpt shows.",
    ],
    trap:
      "Turning every object into a symbol. A chair is a chair until the passage makes it something else. If your evidence would work in any story about any house, it is not close reading.",
  },
  {
    id: "ap-lit-2",
    courseSlug: "ap-lit",
    unitNumber: 2,
    prompt:
      "Poetry: Read the first stanza of a poem about a stopped clock. Write one paragraph on how the line breaks create the sense of time stalling.",
    plan: [
      "Read the stanza out loud once, then read it again stopping at every line ending.",
      "Pick two line breaks that do different things and put them side by side.",
    ],
    example: [
      "The line breaks do the work the poem says it is doing. The first stanza ends a line on the word 'still', so the reader hangs there for a beat before the next line supplies 'the hands', and in that pause 'still' means both motionless and continuing — the two senses the poem needs at once. Later, a break falls in the middle of a sentence and forces the reader to carry the grammar across the gap, which makes the reading itself feel like something being held up.",
      "Those two breaks are not decoration. One makes a word mean double, and the other makes the reader experience the delay the poem is describing. A poem can say that time has stopped; this one makes you wait.",
    ],
    because:
      "Two line breaks, two different effects, and the paragraph explains both in terms of what happens in a reader's mouth and mind. The sentence 'a poem can say that time has stopped; this one makes you wait' is an interpretation, not a summary, which is what the commentary row rewards.",
    say: [
      "I read it aloud first, because line breaks are a sound effect and not a shape on a page.",
      "The word 'still' is my best evidence, because the break lets it mean two things at once.",
      "My second example shows the reader experiencing the delay, which supports my claim about time.",
      "The weakness is that I have not talked about meter at all, and a full essay would need to say whether the pauses are regular.",
    ],
    trap:
      "Writing 'the enjambment creates flow'. Sometimes it does; sometimes it obstructs. Say which, here, and what the obstruction does.",
  },
  {
    id: "ap-lit-3",
    courseSlug: "ap-lit",
    unitNumber: 3,
    prompt:
      "Drama: In this scene, a servant contradicts his mistress in front of guests. Write one paragraph on how the stage directions shape the conflict.",
    plan: [
      "Stage directions are evidence. Quote them the way you would quote a line.",
      "Ask who can see whom. Drama is about visibility as much as speech.",
    ],
    example: [
      "The stage directions decide the scene before anybody finishes a sentence. The servant is directed to speak 'without moving from the door', which puts the whole width of the room between him and his mistress and makes his contradiction a public event even though he never raises his voice. When she crosses to the window, the direction is doing her arguing for her: she is refusing to look at him while refusing to leave the room, and the guests have to choose which of them to watch.",
      "That is why the exchange reads as a defeat for her even though she wins on the facts. The dialogue gives her the better argument, and the staging gives him the better position, and an audience remembers the picture rather than the line.",
    ],
    because:
      "The paragraph treats stage directions as text, quotes them, and reads them for what they do to an audience. It also handles a real interpretive problem — she wins the argument and loses the scene — without flattening it into a moral.",
    say: [
      "My claim is that the staging decides the scene, not the dialogue.",
      "Both pieces of evidence are directions, because in drama the director's information is part of the poem.",
      "The point about the guests is what makes it public. A private contradiction would be a different scene.",
      "If someone said I am over-reading, my answer is that the direction specifies the door and the window and I did not invent either.",
    ],
    trap:
      "Writing about characters as though they were real people with motives, and ignoring what the play tells an audience to look at. On a drama prompt, staging is evidence.",
  },
  {
    id: "ap-lit-4",
    courseSlug: "ap-lit",
    unitNumber: 4,
    prompt:
      "Short fiction: A story spends a paragraph on a woman's coat. Write one paragraph on how the coat carries the story's attitude toward her.",
    plan: [
      "Attitude, not symbolism. The question is how the story feels about her, not what the coat stands for.",
      "Look at the adjectives. They are where the narrator's judgment leaks out.",
    ],
    example: [
      "The coat paragraph tells us how the story feels about her before she says anything. It is 'good', we are told, and then the narrator lists the repairs, which means the coat's goodness has been maintained rather than bought, and the word 'maintained' carries the story's whole attitude: admiring, a little sorry, and unwilling to say either out loud. The detail that does the most work is the lining, described as newer than the wool, because it is hidden, functional, and the only part of the coat anybody bothered to replace.",
      "That is how the story manages to be tender without being sentimental. It never calls her poor or brave. It describes a coat carefully enough that the reader does the arithmetic, and the arithmetic is the emotion.",
    ],
    because:
      "The paragraph keeps asking about attitude rather than meaning, which is the distinction the prompt makes. It uses the narrator's own adjectives as evidence, and its final sentence offers a reading of the story's method rather than a summary of its plot.",
    say: [
      "I kept saying 'what does the coat mean' and it was not working, so I asked instead what the story's tone toward her is.",
      "The telling detail is that the lining is newer than the wool, because it implies something had to be replaced and the outside was worth preserving.",
      "The sentence 'the reader does the arithmetic' is my claim about method, and it is the one I would defend.",
      "I have not said who is narrating, which matters. If the narrator is a neighbor, my reading changes.",
    ],
    trap:
      "Writing 'the coat symbolizes poverty'. That is a label with no reading attached. The rubric wants what the coat does in this story, for this narrator.",
  },
  {
    id: "ap-lit-5",
    courseSlug: "ap-lit",
    unitNumber: 5,
    prompt:
      "Poetry: Write one paragraph on how sound supports meaning in a poem whose last line repeats its first.",
    plan: [
      "Read for the repeated sound, not only the repeated word.",
      "Say what the repetition does to the reader's sense of an ending.",
    ],
    example: [
      "The repetition at the end does not close the poem, it reopens it. The first line and the last line are the same words, but the sounds around them have changed, so the final line arrives with a ring the opening line did not have. Where the opening is mostly long vowels and takes its time, the closing line crowds consonants together, and the effect is of a door being pulled shut rather than swung — the same sentence, arrived at with effort.",
      "That is what makes the ending feel earned rather than tidy. A circle that closes perfectly would suggest nothing has happened; this one closes with a scrape, and the scrape is where the poem's argument about return sits.",
    ],
    because:
      "The paragraph analyzes sound as evidence — vowels, consonants, pace — and uses it for a claim about the ending. Saying 'a circle that closes perfectly would suggest nothing has happened' shows the reasoning behind the reading rather than just asserting it.",
    say: [
      "I compared the sound of the first line and the last, not just the words, because the words are identical.",
      "My evidence is the vowel and consonant difference, which I read aloud to check before I wrote it down.",
      "The claim is about effort — the return costs something, and the sound shows the cost.",
      "If someone said the difference is just performance, my answer is that poems are performed, and the sound is part of what the line means.",
    ],
    trap:
      "Writing 'the repetition emphasizes the theme' with no evidence from the sounds themselves. Rhyme and rhythm are only evidence if you say what they do.",
  },
  {
    id: "ap-lit-6",
    courseSlug: "ap-lit",
    unitNumber: 6,
    prompt:
      "Unreliable narration: In this passage, a narrator describes a conversation he was not present for. Write one paragraph on what the narration reveals about him.",
    plan: [
      "Notice where the narrator supplies detail he could not have.",
      "Say what the invention is for. Unreliable narration is usually self-serving in a specific way.",
    ],
    example: [
      "The narrator tells us what his wife said in a room he was not in, and the confidence of the telling is the evidence. He reports her tone, her pauses, the look she gave a third person, and none of it could be his to know, which means the reader is being given his reconstruction as though it were a record. What he invents is instructive: in his version she is composed and slightly cold, and the third person is the one who is flustered. He cannot report the conversation, so he builds one in which he is not the humiliated party.",
      "The story does not correct him. It leaves the reader to notice, which is a harder and better way of showing a man who cannot bear to be seen clearly.",
    ],
    because:
      "The paragraph shows the narrator's unreliability with a specific kind of evidence — the detail he could not know — and then says what the invention protects him from. That is analysis of character through technique, which is the highest row on the rubric.",
    say: [
      "I did not start by saying he is unreliable. I found the evidence first: the things he could not possibly have seen.",
      "Then I asked what the invention does for him, and the answer is that it protects him from being the fool in his own story.",
      "The strongest sentence is 'the confidence of the telling is the evidence', because reliability is about how something is told.",
      "The risk is that I sound certain about a narrator who is uncertain. My claim is about the pattern, not about one sentence.",
    ],
    trap:
      "Calling a narrator unreliable without showing what the unreliability achieves. Everyone can spot a liar; the skill is saying what the lie is for.",
  },
  {
    id: "ap-lit-7",
    courseSlug: "ap-lit",
    unitNumber: 7,
    prompt:
      "Complexity: A story ends with a character laughing at a funeral. Write one paragraph that explains the ending without resolving it.",
    plan: [
      "Resist explaining the laugh. Explain what the laugh makes possible.",
      "Name two readings and say what each one costs.",
    ],
    example: [
      "The laugh is the story refusing to land. Read as grief, it is the body breaking under pressure — the wrong sound at the wrong moment, which is how some people cry. Read as relief, it is uglier and more interesting: somebody is glad, and the story will not say who. The two readings are not compatible, and the last paragraph is written so that neither can be ruled out; every sentence holds both, which is why the ending feels uncomfortable rather than clever.",
      "A story that explained the laugh would be smaller. What it does instead is leave the reader holding two possibilities at once, and that discomfort is the point of the ending rather than a flaw in it.",
    ],
    because:
      "The paragraph offers an interpretation without pretending to resolve the ambiguity, and it explains how the ending produces that effect. Holding two readings at once and saying why the text supports both is the sophistication row — it is not hedging, it is a claim about how the story works.",
    say: [
      "I deliberately did not choose between the readings, because the story does not.",
      "My evidence is structural: the last paragraph is written so that either reading survives it.",
      "The sentence I would defend hardest is 'uncomfortable rather than clever', because it says what the technique is for.",
      "If you told me the author said it was grief, I would say the text still holds both, and the text is what we mark.",
    ],
    trap:
      "Picking the reading your teacher would like and ignoring the other one. On a poem or story with a genuinely ambiguous ending, saying one thing confidently is usually less sophisticated than showing why both survive.",
  },
  {
    id: "ap-lit-8",
    courseSlug: "ap-lit",
    unitNumber: 8,
    prompt:
      "Allusion: A contemporary poem quotes a line from a nineteenth-century poem. Write one paragraph on what the quotation does.",
    plan: [
      "Say what the old line meant there, then what it costs here.",
      "The interesting claim is usually about the difference, not the resemblance.",
    ],
    example: [
      "The modern poem borrows a line the older poem used as a promise, and uses it as an apology. In the original, the line arrives at the end of a poem that has spent its length arguing that the promise is possible; here it arrives early, in quotation marks, and the quotation marks do the damage — the speaker is saying something she has read rather than something she believes. The rest of the poem then measures the distance between the borrowed promise and the life it was borrowed into.",
      "That is a more interesting use of inheritance than a nod of respect. The older poem is not there to be admired; it is there to be the standard the speaker fails against, and the failure is the poem.",
    ],
    because:
      "The paragraph knows the original context and uses the difference in placement and tone as evidence. It also avoids the two traps of allusion writing — assuming the reader knows the source, and treating the reference as praise.",
    say: [
      "I went and read the older poem, because I could not say what the quotation does without knowing what it did there.",
      "Then I compared the position — end versus early — and the tone, promise versus apology.",
      "My claim is about measurement. The old poem is a ruler the speaker holds herself against.",
      "I am relying on the reader knowing the original, which the poem also does. That is a risk I would mention in an essay.",
    ],
    trap:
      "Writing 'this alludes to a famous poem, adding depth'. Depth is not a finding. Say what the older text supplies that the new one could not supply on its own.",
  },
  {
    id: "ap-lit-9",
    courseSlug: "ap-lit",
    unitNumber: 9,
    prompt:
      "Question 3 preparation: Build a plan for an essay on a novel in which a character's loyalty is tested. You may use any novel you have read closely.",
    plan: [
      "Choose a novel you can quote three times from memory, not the one that sounds most impressive.",
      "Plan the third body paragraph first; it is the one that earns complexity.",
    ],
    example: [
      "Novel: a book you have read twice. Not the longest one, and not one you have only seen filmed.",
      "Thesis: The novel tests the character's loyalty less through temptation than through delay, and what breaks is not her commitment but her belief that commitment can be shown.",
      "Body 1: the first refusal, where loyalty is easy and costs nothing. Evidence: the early scene where she gives up something small and is thanked for it.",
      "Body 2: the middle, where loyalty is quiet and expensive. Evidence: the choice she makes off the page, reported in a subordinate clause.",
      "Body 3: the end, where the novel refuses to reward the loyalty, and the discomfort is the argument. Evidence: the final exchange, and what the novel does not let her say.",
    ],
    because:
      "The plan is built around a thesis that could be argued against, and the third body paragraph is designed in advance to carry the complication. That is how a Question 3 essay earns the sophistication point — by showing the novel's idea is more complicated than the thesis first suggested, without abandoning the thesis.",
    say: [
      "I chose this novel because I can find three passages in it from memory, which matters more than how impressive it sounds in a sentence.",
      "My thesis is about delay rather than temptation, because that is what the novel actually does and it is a claim another reader could disagree with.",
      "I planned the third paragraph first, because that is where the essay either becomes interesting or becomes a list.",
      "If asked why not a more famous book, my answer is that a book I can quote will beat a book I can only describe.",
    ],
    trap:
      "Choosing a novel you have not read closely because it looks serious on a college application. The exam marks your knowledge of the text, and an essay with no quotations cannot earn the evidence points.",
  },
];

export const apLitDefense: CourseDefense = {
  courseSlug: "ap-lit",
  claim:
    "That your reading is grounded in the words on the page, and that you can say why another reading is weaker without pretending it is stupid.",
  frames: [
    "My reading is that…, and the words I would point to first are…",
    "The detail that made me change my mind mid-poem was…",
    "Another reader could say…, and here is what that reading has to explain away.",
    "I am not claiming the poem means only this. I am claiming this reading accounts for more of the text.",
    "The part of the passage I still cannot place is…, and that is a limit on my argument.",
  ],
  markedOn: [
    "Whether the thesis is defensible, not just true",
    "Whether the evidence is quoted from this text and nowhere else",
    "Whether the commentary explains how the evidence works",
    "Whether your reading survives a plausible rival",
  ],
  units: [
    {
      unitNumber: 1,
      keep: ["One physical detail about the setting", "One word that carries the narrator's judgment"],
      question: "\"Where does the story say she is sad?\"",
      answer: [
        "It does not, and that is my point. It says she has to duck, and the sadness is in what she notices.",
        "My evidence is the doorframes and the word 'kept'.",
        "If the narrator stated her feelings outright, my reading would be weaker, not stronger.",
      ],
    },
    {
      unitNumber: 2,
      keep: ["Two line endings that do different things", "The word that changes meaning because of a break"],
      question: "\"Does the line break make the poem flow or stop?\"",
      answer: [
        "One does each, which is why I chose them as a pair rather than a list.",
        "The break after 'still' makes a word mean two things; the break inside a sentence makes the reader wait.",
        "The rhyme scheme is regular, so the pauses land against a steady beat — that is what makes them feel deliberate.",
      ],
    },
    {
      unitNumber: 3,
      keep: ["One stage direction, quoted", "One piece of blocking that gives somebody power"],
      question: "\"Why does the staging matter more than what they say?\"",
      answer: [
        "Because an audience leaves with the picture, and the picture puts the servant at the door and the mistress at the window.",
        "She wins the argument and loses the scene, and I am not going to smooth that over.",
        "If I were directing it, I would keep the distance and cut nothing.",
      ],
    },
    {
      unitNumber: 4,
      keep: ["Two adjectives from the coat paragraph", "One detail that implies something hidden"],
      question: "\"Is the story sympathetic to her or mocking her?\"",
      answer: [
        "Sympathetic and slightly sorry, and it will not say either out loud.",
        "The adjective 'good' and the repair listed after it is how I can tell.",
        "The lining is my best evidence, because it is the part that had to be replaced.",
      ],
    },
    {
      unitNumber: 5,
      keep: ["The repeated line", "One sound difference between its two appearances"],
      question: "\"If the first and last lines are identical, what changed?\"",
      answer: [
        "The sound around them, and the effort of arriving at them.",
        "The opening is long vowels; the ending crowds consonants, so the same words cost more.",
        "That is why I said the circle closes with a scrape rather than neatly.",
      ],
    },
    {
      unitNumber: 6,
      keep: ["One detail the narrator could not know", "One detail that flatters him"],
      question: "\"How do you know the narrator is unreliable if he never lies?\"",
      answer: [
        "I would not call him a liar — I would call him a reconstructor. He reports a room he was not in, down to her tone and her pauses, and none of that could be his to know.",
        "The detail I would point at first is what the invention protects him from: in his version she is composed and the other man is flustered, so the version flatters him.",
        "The story never corrects him. I have to notice it myself, which is why the invention is evidence rather than decoration.",
      ],
    },
    {
      unitNumber: 7,
      keep: ["Two incompatible readings of the ending", "The evidence that keeps both alive"],
      question: "\"Can a laugh at a funeral mean two things, or is that indecision?\"",
      answer: [
        "Two things, and the indecision is the story's, not mine.",
        "The final paragraph is written so that neither reading can be ruled out.",
        "If the author told me it was only grief, I would say the text still holds both.",
      ],
    },
    {
      unitNumber: 8,
      keep: ["What the borrowed line meant in its own poem", "What it means in this one"],
      question: "\"Why not just read the modern poem on its own?\"",
      answer: [
        "Because the quotation is doing the work, and it only works if the older promise is in the reader's ear.",
        "In the original it is a conclusion; here it is a quotation, and the quotation marks are the whole point.",
        "The risk is that the poem requires a reader who knows the source, and I said so.",
      ],
    },
    {
      unitNumber: 9,
      keep: ["Three quotations you can find from memory", "The complication you plan into paragraph three"],
      question: "\"Why this novel and not a more impressive one?\"",
      answer: [
        "Because I can quote this one, and an essay without quotations cannot earn evidence points.",
        "My third paragraph is planned first, because that is where the essay becomes an argument.",
        "I would rather write a smaller claim about a book I know than a grand claim about a book I have only read once.",
      ],
    },
  ],
};
