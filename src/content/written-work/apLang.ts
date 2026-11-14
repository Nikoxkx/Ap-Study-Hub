import type { CourseDefense, WrittenWork } from "./types";

/**
 * AP English Language written work and defense.
 *
 * Three essays, 55% of the score, and one habit underneath all three: every
 * sentence after the thesis has to do something the thesis did not already
 * do. The examples are shaped like marked student responses — good ones, with
 * a visible weak point — because a flawless exemplar teaches a student
 * nothing about what to do when their own draft is not flawless.
 */
export const apLangWrittenWork: WrittenWork[] = [
  {
    id: "ap-lang-1",
    courseSlug: "ap-lang",
    unitNumber: 1,
    prompt:
      "Rhetorical analysis body paragraph: Explain how a principal's letter announcing a phone ban persuades parents. Write one paragraph.",
    plan: [
      "Name the move, the effect, and the audience — in that order, once each.",
      "Quote four to seven words, not a whole sentence. Then say what the words do.",
    ],
    example: [
      "The letter opens by conceding the parents' objection before it can harden into opposition. The principal writes that the policy is \"not a judgment about your parenting\", a sentence that does very little on its own but quietly removes the insult parents might have expected to feel. By naming the fear — that a school is criticizing the family — and setting it aside, the letter keeps an audience that is already skeptical from reading the rest of the policy as an accusation.",
      "The concession also buys credibility for what follows. Three sentences later the letter cites a survey of teachers and a rise in reported distraction, and that evidence lands harder for arriving after a moment of generosity rather than before it. The argument is not subtle, but it is well ordered: reassurance first, evidence second, and the rule itself last.",
    ],
    because:
      "Each paragraph has one move and one effect. The quotation is short enough to analyze, and the writing says what the words do to a reader rather than simply labelling them 'ethos'. That is the difference between naming a device and analyzing one, which is worth most of the points.",
    say: [
      "My claim is that the concession does the persuading, not the survey. So I analyzed the concession first and used the survey to show why the order matters.",
      "I quoted four words, because a long quotation leaves you nothing to explain.",
      "The phrase I would defend hardest is 'quietly removes the insult', because that is an effect on a reader and not just a label on a sentence.",
      "My weak point: I only discuss one paragraph of the letter. A stronger answer would show a second move and say how the two fit.",
    ],
    trap:
      "Writing 'this appeals to ethos' and moving on. Naming the appeal is the start of a sentence, not the end of one — the mark is in the effect on the audience.",
  },
  {
    id: "ap-lang-2",
    courseSlug: "ap-lang",
    unitNumber: 2,
    prompt:
      "Thesis writing: Turn this into a defensible thesis about a speech that argues for a later school start time. The speech uses student sleep data first and a personal story last.",
    plan: [
      "A thesis takes a position about how the argument works, not about whether you agree.",
      "Say something no other student in the room would say in the same words.",
    ],
    example: [
      "Weak: The speaker uses statistics and a personal story to convince the school board to start school later.",
      "Better: By opening with sleep data and closing with one student's morning, the speaker moves the board from a policy decision it can defer to a person it would have to say no to, and that order is the argument.",
    ],
    because:
      "The second version makes a claim about the movement between the two kinds of evidence and says what that movement is for. The first version describes the ingredients and takes a position on nothing, so there is nothing to defend later in the essay.",
    say: [
      "I wrote a descriptive sentence first, then deleted everything except the part that actually argues.",
      "My real claim is about order — data first, person last — because the shift is what gives the ending its weight.",
      "I could defend this against a classmate who said the story was the weaker evidence, because my thesis is about placement, not about which part is stronger.",
      "The limit: a thesis about order does not explain the board's own interests, and a full essay would need that too.",
    ],
    trap:
      "Writing a thesis that can be proved by summary. If someone can agree with your thesis after reading the passage once, it is not an argument.",
  },
  {
    id: "ap-lang-3",
    courseSlug: "ap-lang",
    unitNumber: 3,
    prompt:
      "Evidence and commentary: Write one body paragraph for an essay arguing that a city should fund public libraries instead of a new stadium.",
    plan: [
      "One piece of evidence per paragraph is enough if the commentary is real.",
      "Every sentence after the evidence should say what the evidence proves, not what happened.",
    ],
    example: [
      "A stadium's economic case rests on spending that mostly moves rather than grows. When a city builds one, the money spent in its restaurants is largely money that would have been spent somewhere else in the same city, so the net gain is smaller than the headline figure suggests, while the cost — land, infrastructure, debt service — is real and immediate. The comparison matters because it is not stadiums against nothing; it is stadiums against the branch library that stays open on Saturdays.",
      "That is the argument for libraries in one line: a stadium concentrates benefits on a few event days and a library spreads them across ordinary ones. A family without a car, a student without a quiet room at home, and someone applying for work online all use the same building on the same afternoon, and none of them needs to buy a ticket.",
    ],
    because:
      "The evidence is one idea, stated accurately, and the paragraph spends more words on what it means than on what it is. The second paragraph is commentary doing the work — it is not repeating the first, it is drawing the distinction the first paragraph set up.",
    say: [
      "I used one fact, because one fact explained well beats four facts listed.",
      "The sentence 'it is not stadiums against nothing' is the pivot. That is where I stop describing the stadium and start arguing for the library.",
      "I deliberately did not say libraries are better than sports. I said the money reaches different people, which is arguable.",
      "If I had to cut this paragraph to half, I would keep the last two sentences and lose the tax detail.",
    ],
    trap:
      "Evidence, then a restatement of the evidence in different words. 'This shows that the stadium is expensive' is not commentary; it is the same sentence twice.",
  },
  {
    id: "ap-lang-4",
    courseSlug: "ap-lang",
    unitNumber: 4,
    prompt:
      "Synthesis body paragraph: Using at least two of the sources, argue about whether a school should ban phones outright or restrict them during class.",
    plan: [
      "Synthesis wants your position, built from sources — not a summary of what the sources say.",
      "Pick two sources that pull in different directions, then take the harder position.",
    ],
    example: [
      "The strongest case is for a class-time restriction rather than an all-day ban, and the sources only support that conclusion once you read them against each other. One source reports that test scores rose after phones were removed from classrooms entirely, which is the strongest piece of evidence for a ban. Another describes students using phones to coordinate care for a sibling during the school day, which is the strongest evidence against one. A school that bans phones outright has to enforce that second case at the office; a school that restricts them in class only has to enforce the first.",
      "That does not settle the question, but it changes it. The argument is no longer about whether phones harm attention — both sources agree they do — but about how much enforcement a school is willing to run, and who carries the cost when it does not.",
    ],
    because:
      "Two sources are used, they disagree, and the disagreement is turned into the argument. The paragraph takes a side that is harder than either source alone, which is what synthesis rewards and what 'source A says X and source B says Y' never does.",
    say: [
      "I chose sources that disagree, because agreement would have given me nothing to argue with.",
      "My position is the middle one, and I justified it on enforcement rather than on opinion — that is the only reason a middle position is not a cop-out.",
      "The sentence 'it changes the question' is the one I would point to if asked where my argument happens.",
      "I know one weakness: I did not cite the third source at all, so a marker might say I used two when I had three.",
    ],
    trap:
      "Writing a paragraph that could be assembled by a machine — source one, source two, therefore my opinion. Synthesis marks your reasoning about the sources, not your ability to cite them.",
  },
  {
    id: "ap-lang-5",
    courseSlug: "ap-lang",
    unitNumber: 5,
    prompt:
      "Coherence and qualification: Add one sentence to this claim so it stops overreaching. Claim: 'Social media has destroyed teenagers' ability to concentrate.'",
    plan: [
      "Find the word that does the most damage. Here it is 'destroyed'.",
      "Qualify without collapsing: keep the strong claim, narrow its scope.",
    ],
    example: [
      "Before: Social media has destroyed teenagers' ability to concentrate.",
      "After: Constant notifications have made sustained attention harder for many teenagers, though the effect is uneven and shows up most clearly in tasks that give no immediate feedback.",
    ],
    because:
      "The revised sentence keeps a real claim and adds two limits — 'many', and 'tasks that give no immediate feedback'. A reader can now disagree with something specific, which is the whole point of qualifying. Losing the claim entirely would be the opposite error: 'social media may affect some teenagers' is true and unfalsifiable.",
    say: [
      "I located the absolute word first — 'destroyed' — because that is where the sentence is vulnerable.",
      "I replaced it with a scope instead of a hedge word. 'Many' says who; 'tasks without immediate feedback' says where the effect is strongest.",
      "I did not want to write 'may' and 'might' all over it, because a paragraph of hedges argues nothing.",
      "The test I use: can a smart person disagree with my sentence? If not, I have written a truism, not a claim.",
    ],
    trap:
      "Qualifying until there is nothing left to disagree with. 'May possibly have some effect on some people in some situations' is safe, and worth nothing.",
  },
  {
    id: "ap-lang-6",
    courseSlug: "ap-lang",
    unitNumber: 6,
    prompt:
      "Credibility and bias: A company's own report says its factory's emissions are 'within permitted levels'. Write two sentences that use the report fairly.",
    plan: [
      "Fair use is not the same as accepting it or dismissing it.",
      "Say what the source can establish and what it cannot.",
    ],
    example: [
      "Sentence 1 — what the report can support:",
      "\"The report establishes that measured emissions fell below the legal limit, which is a real standard and not nothing.\"",
      "Sentence 2 — what it cannot support, and why:",
      "\"It cannot establish that the level is safe, because the company chose the measurement method and the permit came out of a process the company lobbied in, so the honest reading is 'compliant', not 'harmless'.\"",
    ],
    because:
      "Both sentences do work. The first grants the source what it actually proves, which earns credibility for the writer; the second names exactly why the claim cannot stretch further, without accusing anyone of lying. That is a more useful move than either 'the report says so, therefore it is true' or 'it is a company report, therefore it is worthless'.",
    say: [
      "I gave the report its due first, because a reader who thinks I dismiss evidence will stop trusting my argument.",
      "Then I separated 'compliant' from 'safe'. Those are different claims and the report only supports one.",
      "I did not call the company dishonest, because I cannot show that. I showed what the choice of method does to the claim.",
      "If the company released its raw measurements, I would change my mind about the second sentence, and I would say so.",
    ],
    trap:
      "Deciding a source is biased and therefore unusable. Almost every source is interested in something; the skill is saying precisely what the interest prevents it from proving.",
  },
  {
    id: "ap-lang-7",
    courseSlug: "ap-lang",
    unitNumber: 7,
    prompt:
      "Counterargument: You are arguing that a town should keep its minimum wage at the current level. Write the paragraph that takes the other side seriously.",
    plan: [
      "State the objection in its strongest form, not a version you can knock down.",
      "Then say what would have to be true for you to be wrong.",
    ],
    example: [
      "The best objection is not that workers do not need more money; it is that a small town's businesses compete with businesses one town over that pay less, so a wage rise here may simply move customers and jobs across the line. If that is what happens, the policy helps the people who keep their jobs and hurts the ones who lose them, and the people who lose them are usually the ones with the least room to absorb it.",
      "I still think the wage should stay where it is, for a narrower reason than I started with: this town's employers are mostly services that cannot relocate, so the competition story describes a smaller share of the local economy than it would in a manufacturing town. If a large employer here could move, I would want a phased rise instead.",
    ],
    because:
      "The objection is stated in a form its own supporters would recognize, and the response concedes the conditions under which it wins. That is what 'complexity' means on the rubric — not a paragraph of 'some people say', but a real argument met with a real limit.",
    say: [
      "I wrote the objection the way its smartest supporter would write it, because knocking down a weak version persuades nobody.",
      "Then I said what would change my mind, which is the most honest sentence in the paragraph.",
      "My concession is specific — the share of local employers who cannot relocate — not a vague 'it depends'.",
      "The weakest part is that I did not give a number. I would want the actual share of local businesses that are services.",
    ],
    trap:
      "The straw man paragraph: 'Some may argue that businesses will leave, but this is unlikely.' If the counterargument is easy to beat, it was not the real one.",
  },
  {
    id: "ap-lang-8",
    courseSlug: "ap-lang",
    unitNumber: 8,
    prompt:
      "Style and audience: Rewrite this sentence for a letter to a landlord, then for a message to a friend. Original: 'The heating situation has become untenable and requires immediate remediation.'",
    plan: [
      "Same facts, different relationship. The audience decides the register, not the truth.",
      "Keep the ask identical in both, so only the tone changes.",
    ],
    example: [
      "To the landlord: The heat in the flat has not worked since 3 November, and I have kept the flat at 15°C with a space heater. Please arrange a repair this week, and let me know what date works.",
      "To a friend: Still no heating. I have been living in a coat and I am about to become annoying about it.",
    ],
    because:
      "Both versions contain the same two facts and the same request. The letter gives dates and a clear ask, because a landlord needs something they can act on; the message to a friend drops the dates because the friend is not going to fix anything. The original sentence is not wrong, it is just written for a form nobody is reading.",
    say: [
      "I kept the facts identical and changed only what the reader needs to do.",
      "For the landlord I added dates and a specific ask, because a vague complaint is easy to ignore.",
      "For the friend I kept the joke, because the relationship allows it and the information still gets across.",
      "The thing I would defend: I did not exaggerate the temperature in either version. Different tone, same facts.",
    ],
    trap:
      "Thinking formal means better. In a letter that asks for a repair, a plain sentence with a date in it is more persuasive than 'untenable and requires immediate remediation'.",
  },
  {
    id: "ap-lang-9",
    courseSlug: "ap-lang",
    unitNumber: 9,
    prompt:
      "Full argument introduction: Write the first paragraph of an essay on whether schools should teach handwriting. Take a position.",
    plan: [
      "State the position, the reason, and the shape of what follows — in one paragraph.",
      "Give the reader a reason to keep reading that is not a joke.",
    ],
    example: [
      "Schools should keep teaching handwriting, but not for the reason usually offered. The romantic case — that a generation is losing a craft — is weak, because most people who can write by hand rarely do. The practical case is stronger: forming letters by hand slows writing down, and the slowness is the point, because a student who cannot type faster than they think gets an extra second to notice that a sentence is wrong.",
      "That does not mean an hour a day or a rule about pens. It means handwriting as a tool students can still reach for, taught long enough to become automatic, and then left alone.",
    ],
    because:
      "The introduction makes a specific claim, rejects the obvious version of its own side, and gives the essay a shape — here is why, here is what it does not mean. Rejecting your own side's popular argument is a fast way to look like a writer rather than a participant in a debate.",
    say: [
      "I started by disagreeing with the usual argument for my own position, because that is the fastest way to show I have thought about it.",
      "My real claim is about speed — slower writing gives you time to catch a mistake.",
      "The second paragraph exists to stop the essay sounding like a demand for an hour of cursive a day.",
      "The weak point is 'the slowness is the point', which is a nice sentence and only half evidence. My body paragraphs have to earn it.",
    ],
    trap:
      "Opening with a definition or a sweeping statement about the modern world. 'Since the dawn of time, communication has been essential' tells the reader you had nothing to say yet.",
  },
];

export const apLangDefense: CourseDefense = {
  courseSlug: "ap-lang",
  claim:
    "That you read closely and wrote deliberately — every sentence after the thesis does a job you can name.",
  frames: [
    "The writer's move here is…, and the effect on this audience is…",
    "I chose this quotation because it is where the change happens, not because it is the loudest line.",
    "My claim is arguable because a reasonable reader could say…",
    "I qualified this on purpose: the limit is…, and without it the sentence would overreach.",
    "The counterargument I take most seriously is…, and it would beat me if…",
  ],
  markedOn: [
    "Whether your thesis could be argued against",
    "Whether you analyze the words rather than labelling the device",
    "Whether your evidence is quoted precisely",
    "Whether you can name the limit of your own claim",
  ],
  units: [
    {
      unitNumber: 1,
      keep: ["One short quotation", "One sentence naming the effect on a specific audience"],
      question: "\"What is the difference between naming a device and analyzing it?\"",
      answer: [
        "Naming is a label, analyzing is an effect. 'Ethos' is a label; 'this removes the insult the parent expected' is an effect.",
        "My evidence is the four words I quoted, and the analysis is the sentence after them.",
        "If you asked me what the writer could have written instead, I could show you why this choice was the persuasive one.",
      ],
    },
    {
      unitNumber: 2,
      keep: ["Your thesis in one sentence", "The word in it that makes it arguable"],
      question: "\"Could someone disagree with your thesis after reading the same passage?\"",
      answer: [
        "Yes — they could say the ordering does not matter and the story alone does the work.",
        "That disagreement is the reason the thesis is worth writing about.",
        "If nobody could disagree, I would have written a summary and I would rewrite it.",
      ],
    },
    {
      unitNumber: 3,
      keep: ["One piece of evidence, stated accurately", "Two sentences of commentary for it"],
      question: "\"Which is doing more work in your paragraph, the evidence or the commentary?\"",
      answer: [
        "The commentary, and it should be, because the evidence is available to everybody in the room.",
        "I can prove it: delete my commentary and the paragraph becomes a fact with no argument attached.",
        "The risk is that commentary can become opinion. Mine stays tied to the evidence by saying what it shows.",
      ],
    },
    {
      unitNumber: 4,
      keep: ["Two sources that disagree", "The sentence where you take a side between them"],
      question: "\"Which source did you find hardest to use, and what did you do with it?\"",
      answer: [
        "The one that argued against my position, because I could not just cite it and move on.",
        "I used it to narrow my claim, which is more honest than ignoring it.",
        "If I had used three sources instead of two, my position would have been stronger and messier — that is the trade.",
      ],
    },
    {
      unitNumber: 5,
      keep: ["One overreaching sentence", "One revised version with a scope instead of a hedge"],
      question: "\"Is your revised sentence weaker or just more honest?\"",
      answer: [
        "More honest, and stronger in an essay, because a reader can now disagree with something specific.",
        "I replaced an absolute with a scope: who it affects and where the effect is clearest.",
        "The failure mode I avoided is the paragraph of 'may' and 'might' that says nothing.",
      ],
    },
    {
      unitNumber: 6,
      keep: ["One claim a source can support", "One claim it cannot"],
      question: "\"When would you trust a company's report?\"",
      answer: [
        "When the claim is one the company cannot gain from faking — compliance with a standard it did not write.",
        "It cannot establish safety, because safety is a judgment about a level nobody measured.",
        "I would change my mind if the raw data came out, and I would say so in the same sentence.",
      ],
    },
    {
      unitNumber: 7,
      keep: ["The strongest version of the other side", "The condition under which you would lose"],
      question: "\"What would have to be true for you to be wrong?\"",
      answer: [
        "If a large share of local employers could relocate, the wage rise would move jobs rather than raise pay.",
        "I named that condition in the paragraph, which is why the argument is not just assertion.",
        "I did not give a number for the share, and that is the first thing I would fix.",
      ],
    },
    {
      unitNumber: 8,
      keep: ["Two versions of the same sentence for two readers", "One fact that stayed identical"],
      question: "\"Why does the version to the landlord sound less clever?\"",
      answer: [
        "Because it has dates and an ask in it, and cleverness is not what a landlord needs.",
        "The facts did not change between versions, only what I asked the reader to do.",
        "That is the test I use for tone: same information, different relationship.",
      ],
    },
    {
      unitNumber: 9,
      keep: ["The claim", "The argument for your own side that you reject"],
      question: "\"Why open by disagreeing with your own side?\"",
      answer: [
        "Because the popular version of my argument is weak, and a reader notices when I pretend otherwise.",
        "It also sets up the real claim, which is about speed rather than craft.",
        "The risk is that it reads as contrarian, so I only do it when the weak argument is genuinely the common one.",
      ],
    },
  ],
};
