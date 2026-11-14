import type { CourseDefense, WrittenWork } from "./types";

/**
 * APUSH written work and defense.
 *
 * The paper asks for three shapes of answer and marks them differently: a
 * short-answer question out of 3, a document-based question out of 7, and a
 * long essay out of 6. The examples below are written to the shape they will
 * actually be marked in, and the defense lines are what a student would say
 * out loud about the same work.
 */
export const apushWrittenWork: WrittenWork[] = [
  {
    id: "apush-1",
    courseSlug: "apush",
    unitNumber: 1,
    prompt:
      "Short answer: Briefly explain one way that the Columbian Exchange changed Indigenous societies in the Americas, and one way it changed European societies.",
    plan: [
      "Two changes, one on each side of the Atlantic. Do not spend both sentences on the Americas.",
      "Name the mechanism — disease, horses, maize, silver — rather than the vague word 'exchange'.",
    ],
    example: [
      "The Columbian Exchange changed Indigenous societies most violently through disease. Smallpox and influenza arrived in populations with no prior exposure, so mortality in some regions ran far above anything caused by warfare, and whole communities lost the elders and knowledge-keepers who carried their history. That loss of people was a political event as much as a biological one: it broke the alliances and trade networks that had held confederacies together and made conquest by a small number of Europeans possible.",
      "For Europeans, the same exchange changed what could be eaten and what could be sold. Maize, potatoes and tomatoes grew where European grains struggled, and the calorie supply that came with them supported larger populations; silver from the Americas flowed into European treasuries and into the trade with Asia. Neither change happened in a decade. Both were slow, uneven, and depended on who controlled the route.",
    ],
    because:
      "The question asks for one change on each side, and each paragraph names a specific mechanism and then says what it did. That is the three-point SAQ shape: a claim, specific evidence, and an explanation of why the evidence answers the question. Naming 'the Columbian Exchange' and stopping would only earn the first part.",
    say: [
      "I answered it in two halves because the question has two halves, and I did not want to write two paragraphs about the Americas and leave Europe out.",
      "I chose disease for the Indigenous side because it is the change with the biggest effect and the one with the clearest mechanism — you can say how it worked, not just that it happened.",
      "Then for Europe I picked food and silver, and I said 'slow and uneven' on purpose, because the exchange did not transform everything at once.",
      "The weakness in my answer is that I did not name a specific nation or a specific population, so it is general. If I had another two minutes I would put in one people and one date.",
    ],
    trap:
      "Writing 'the Columbian Exchange changed both societies' twice with different adjectives. Two paragraphs that make the same point is one point written twice, and examiners see it every year.",
  },
  {
    id: "apush-2",
    courseSlug: "apush",
    unitNumber: 2,
    prompt:
      "Long essay: To what extent did the Atlantic economy shape the social structure of the British colonies between 1607 and 1754?",
    plan: [
      "Take a position in one sentence. 'To what extent' wants a degree, not a list.",
      "Pick two regions that behaved differently — Chesapeake and New England — and let the difference carry the argument.",
    ],
    example: [
      "By 1754 the Atlantic economy had shaped colonial society so thoroughly that the differences between Chesapeake and New England are best explained by what each region sold to Europe, though religion and local politics still shaped daily life in ways the market alone cannot account for.",
      "The Chesapeake grew tobacco for a European market, and everything about its society followed from that crop. Tobacco exhausts soil, so planters needed fresh land and stayed scattered along rivers; a scattered population with a cash crop and a short life expectancy did not build towns or schools. Labor was the binding constraint, and the answer to it moved from indentured servants to enslaved Africans as the supply of English servants tightened. The result was a society of great houses and small farms, with a large unfree population at the bottom and few institutions in between.",
      "New England's economy was the Atlantic carrying trade rather than a single staple, and its society looked correspondingly different: towns with churches and schools, families that lived long enough to accumulate property, and a merchant class that made money moving other people's goods. The same ocean, a different product, and a completely different social ladder.",
      "None of this means the market wrote the whole story. The Great Awakening split congregations in ways no trade route can explain, and colonial assemblies fought governors over taxation long before a profit motive was involved. But even those conflicts were shaped by who owned what, and by 1754 the colonies were a set of societies organized around the export of something.",
    ],
    because:
      "The thesis takes a degree ('so thoroughly that... though religion still mattered'), which is the point of a 'to what extent' prompt. The body compares two regions and uses their differences as evidence, and the last paragraph does the hardest thing on a long essay: it concedes a counterargument and then explains why the main claim survives it.",
    say: [
      "I started with 'to what extent' in the prompt, because that phrase means they want a degree and not a summary.",
      "My argument is that what a colony sold to Europe decided who worked, who owned land, and whether there were towns. Chesapeake tobacco versus New England shipping is the comparison that makes that visible.",
      "The third paragraph is me arguing against myself, because one of the six points is reasoning, and if I never admit a limit I lose it.",
      "If someone asked me the hardest question — 'what about the Great Awakening?' — my answer is that I already put it in, and I still think the economy explains more of the pattern.",
    ],
    trap:
      "Taking both sides so carefully that the essay has no position. 'To what extent' wants you to say how much, and a thesis that says 'it affected things in many ways' has not said how much.",
  },
  {
    id: "apush-3",
    courseSlug: "apush",
    unitNumber: 3,
    prompt:
      "Document-based question, body paragraph: Using at least two of the documents, explain how colonial resistance to British taxation shifted toward independence.",
    plan: [
      "Use the document as evidence for a claim you already have, not as a paragraph topic.",
      "Say something about at least one document's origin, because sourcing is a separate point.",
    ],
    example: [
      "Resistance moved from asking Parliament to stop taxing the colonies to denying that Parliament had any right to legislate for them at all, and the change is visible in who was being addressed. An early petition-style document from a colonial assembly confines itself to the grievance — the tax was imposed without consent — and asks for its repeal, which treats Parliament as legitimate but mistaken. Within a decade a pamphlet aimed at ordinary colonists in port towns goes further and calls the connection itself a danger to liberty. The first document is a request; the second is an argument for separation, and it is written for people who might have to fight.",
      "That shift makes sense given who wrote each one. The assembly address is the work of men with property and standing who could expect a hearing, and who wanted the crisis to end with a repeal rather than a rupture. The pamphlet is written to be read aloud in a tavern, by people whose livelihoods depended on the port and who had no seat to lose. The argument hardened as the audience widened, which is the pattern the question is asking about.",
    ],
    because:
      "Two documents are used as evidence for a claim, and both are sourced — the author's position and the audience are used to explain why the argument changed. That is the difference between 'Document 4 says...' and earning the sourcing point: the paragraph says why this writer said this at this moment.",
    say: [
      "My paragraph has a claim at the top, so the reader knows what the documents are proving before I introduce them.",
      "For each document I said who wrote it and who it was for, because a pamphlet read in a tavern and an address to a governor are doing different jobs even when the words overlap.",
      "I put the documents in chronological order on purpose, so the paragraph itself shows the shift rather than just describing it.",
      "What I would improve: I only used two documents when the paper gives seven, and one more from a different colony would have made it less like a story about Massachusetts.",
    ],
    trap:
      "Writing a paragraph that is really a list — 'Document 2 shows this, Document 5 shows that' — with no claim holding them together. That earns evidence points and loses the reasoning ones.",
  },
  {
    id: "apush-4",
    courseSlug: "apush",
    unitNumber: 4,
    prompt:
      "Short answer: Explain how the market revolution changed the work lives of ordinary Americans, and identify one group whose experience does not fit that pattern.",
    plan: [
      "One paragraph on the pattern, one on the exception. The exception is the harder half and worth planning.",
      "Name a mechanism: wages, clocks, the Erie Canal, the cotton gin.",
    ],
    example: [
      "The market revolution moved work out of the household and onto a clock. When canals and then railroads made it possible to sell goods far from where they were made, production shifted into workshops and early factories where the owner controlled the hours, and the wage replaced the exchange of goods between neighbors. For a young woman in Lowell that meant cash of her own and a room away from her father, which is a real kind of freedom; it also meant twelve-hour days and a boarding-house bill that rose whenever the company chose.",
      "The group that fits least well is enslaved people in the cotton South. Their labor was also being sold into a national market — the cotton they picked went to Northern mills and British ones — but they could not sell their own labor, move, or keep the wages, so the story about wage work and clocks does not describe them at all. Their experience is not an exception to the market revolution; it is the same revolution with the freedom removed.",
    ],
    because:
      "The first paragraph gives the pattern with a named mechanism and a named example, and the second takes the harder instruction seriously. Saying the exception is 'the same revolution with the freedom removed' is an argument, not an evasion, and it is the kind of sentence that lifts a short answer out of the middle.",
    say: [
      "I planned it as pattern, then exception, because the question tells me there is one.",
      "For the pattern I used one person — the Lowell mill worker — instead of listing three, because a named person makes the mechanism concrete.",
      "For the exception I chose enslaved workers rather than, say, farmers, because it is the sharper case: same market, opposite freedom.",
      "The bit I would defend hardest is 'same revolution with the freedom removed', because it still answers the first half of the question while refusing to pretend the experience was similar.",
    ],
    trap:
      "Treating the exception as a footnote. If the question asks you to identify a group that does not fit, one clause at the end is not enough; the group needs its own evidence.",
  },
  {
    id: "apush-5",
    courseSlug: "apush",
    unitNumber: 5,
    prompt:
      "Long essay: Evaluate the claim that Reconstruction failed because of Southern resistance rather than Northern indifference.",
    plan: [
      "Both causes are named in the prompt, so your job is to weigh them, not to pick a favorite.",
      "Choose evidence that shows a decision being made and abandoned — the Freedmen's Bureau, the Enforcement Acts, the 1877 withdrawal.",
    ],
    example: [
      "Reconstruction failed because Northern will collapsed faster than Southern resistance weakened, and the two worked together: Southern violence made the cost of enforcement visible, and Northern voters decided the cost was not worth paying.",
      "Southern resistance was real and organized. Paramilitary violence during elections suppressed Black voting, and the sharecropping and vagrancy laws passed in state legislatures restored much of the economic control that emancipation had removed. None of that could have succeeded against a government that was still willing to send troops and prosecutors, which is why the Enforcement Acts of 1870 and 1871 quieted some of the violence when they were used.",
      "The decision that settled the outcome was made in the North. A financial panic turned voters' attention to their own jobs; a series of corruption scandals made federal intervention look like more of the same; and when the disputed election of 1876 was resolved, federal troops left the South and the remaining governments fell. That was a choice, made by people who had the power to do otherwise.",
      "The useful way to weigh the two is to notice that resistance only worked when it was cheaper to tolerate than to stop. Southern whites applied constant pressure; the North supplied the variable — the willingness to pay for enforcement — and it ran out.",
    ],
    because:
      "The essay evaluates a claim rather than choosing one of the two offered causes, which is what 'evaluate' asks for. It also gives a criterion for weighing ('resistance only worked when it was cheaper to tolerate than to stop'), and a criterion is what makes a comparison an argument.",
    say: [
      "I did not just pick a side, because the prompt gives two causes and asks me to evaluate, so my thesis says how they fit together.",
      "My structure is: show resistance was real, show it only worked at certain times, then show what changed at those times in the North.",
      "The sentence I am proudest of is the last one, because a criterion is what turns a list into an argument.",
      "What I would say if challenged: I cannot prove Northern voters were thinking about Reconstruction specifically, so I said 'made the cost visible' rather than 'caused them to abandon it'. That is the hedge I would defend.",
    ],
    trap:
      "Using the word 'evaluate' as decoration and then writing a summary of Reconstruction. The rubric wants a judgment about which cause mattered more and why.",
  },
  {
    id: "apush-6",
    courseSlug: "apush",
    unitNumber: 6,
    prompt:
      "Short answer: Explain one way industrialization changed the American working class, and one way workers responded.",
    plan: [
      "Keep the two halves separate. A response is not a change.",
      "Use a specific strike or organization, not 'workers organized'.",
    ],
    example: [
      "Industrialization reduced the skill a worker had to have. Where a craftsperson once made a whole shoe and set their own pace, the same shoe was made through a sequence of steps in a factory, and each step could be taught in a day. That made the worker replaceable and gave the employer control of the pace, the hours, and the wage, which is the change industrialization was actually selling.",
      "Workers responded in ways that matched the new conditions. Because the skill was gone, a trade union could not protect them on the old craft basis, so the Knights of Labor tried to organize everyone regardless of skill, and later the American Federation of Labor organized the skilled trades that could still shut a shop down. The Pullman strike of 1894 shows how the response ended: a national boycott, a court injunction, federal troops, and a union destroyed.",
    ],
    because:
      "The change is described as a mechanism — replaceability, then control of pace — and the response is a specific organization and a specific strike. Both parts of the question get an answer of the same weight, which is where most short answers lose a point.",
    say: [
      "I answered the first half with a mechanism, not a mood. 'It got worse' is not an explanation; 'the skill went out of the job and the worker became replaceable' is.",
      "For the response I used two unions because they are the two answers to the same problem, and then one strike to show the limits.",
      "I checked that I had not written a response as if it were a change. 'Workers organized' would have been the wrong kind of sentence for the first half.",
      "If a teacher asked me which half was stronger, I would say the first, because the second leans on one strike to do a lot of work.",
    ],
    trap:
      "Answering only the half you find easier. The question has two verbs, and each one carries a point.",
  },
  {
    id: "apush-7",
    courseSlug: "apush",
    unitNumber: 7,
    prompt:
      "Document-based question, paragraph: Explain how the New Deal changed the relationship between the federal government and ordinary citizens. Use two documents.",
    plan: [
      "The change is about expectation as much as spending. Say both.",
      "Use one document from someone receiving help and one from someone opposing it — the pair does more work than two examples of the same view.",
    ],
    example: [
      "The New Deal changed the relationship between the federal government and ordinary citizens by making the government a party to economic life that citizens could expect to hear from, and the documents show that expectation being created and resented at the same moment.",
      "A letter from an ordinary person asking the federal government for help with a mortgage treats Washington as somewhere a citizen can write, which is not how the same person would have written in 1928. It is one letter, but letters got written because programs had been announced and because a Social Security number and a relief office gave people a reason to believe the government knew they existed.",
      "A statement from a business figure warning about federal overreach is the other half of the same change. Its argument is not that the programs fail but that they should not exist, which is a debate about the role of the federal government rather than about the budget. The two documents together show the new relationship being accepted by some citizens and rejected by others, which is more useful than two letters saying thank you.",
    ],
    because:
      "The paragraph chooses documents that disagree, and uses the disagreement as evidence for the claim about a relationship rather than a claim about spending. Naming the shift from 'a citizen can write' is an argument about expectations, which is the part students usually miss.",
    say: [
      "I picked documents that disagree on purpose. Two letters saying thank you would have looked like evidence but only proved one thing.",
      "My claim is about expectations, not money, so I asked of each document: what does this person assume the government is for?",
      "The letter is one person, and I said so. I did not pretend one letter is public opinion.",
      "If I had to defend only one sentence, it would be 'the government knew they existed', because that is the change — being seen, not being paid.",
    ],
    trap:
      "Choosing the two documents that agree with your point. Three pieces of evidence for one side is weaker than two that argue with each other, because the second pair lets you explain the disagreement.",
  },
  {
    id: "apush-8",
    courseSlug: "apush",
    unitNumber: 8,
    prompt:
      "Long essay: Explain how the Cold War shaped the strategies of the civil rights movement between 1945 and 1980.",
    plan: [
      "Pick a causal direction and commit. Containment affected civil rights, and civil rights affected the conduct of the Cold War.",
      "Name two moments where the international and domestic stories touch: Brown and Little Rock, or the 1964 Act and the Cold War image problem.",
    ],
    example: [
      "The Cold War made the civil rights movement both more urgent and more exposed: segregation became a diplomatic liability that the federal government had to address, which gave the movement leverage, and the same competition for world opinion made any Black radicalism a target that could cost the movement its allies.",
      "American officials were arguing to newly independent nations that democracy delivered a better life, and photographs of police dogs in Birmingham traveled faster than any broadcast about the Marshall Plan. That gave civil rights lawyers and organizers an argument aimed at the federal government's own interest: the country could not win a contest for the allegiance of non-white nations while its own courts upheld segregation. Brown v. Board came out of a domestic legal campaign, but it was understood abroad and used at home.",
      "The same logic cut the other way. Once the movement's demands moved from legal equality to economic justice, and once opposition to the Vietnam War joined the same platforms, the movement lost the framing that had made it useful to Washington. Surveillance of organizers and the rhetoric of internal subversion narrowed what could be said out loud, which is why some of the strongest critiques of American society in this period came from outside the mainstream organizations.",
      "By 1980 the movement had won the legal victories the Cold War argument could support and had not won the economic ones it could not. The international contest helped dismantle Jim Crow and helped stop the struggle there.",
    ],
    because:
      "The thesis names a double effect — more urgent and more exposed — and the essay carries both through to the end instead of dropping the second one. That symmetry is what earns reasoning points on a long essay.",
    say: [
      "I set up two effects in the thesis because the honest answer is not 'it helped' or 'it hurt'. It did both, and the second half is where the marks are.",
      "My evidence for the first effect is a photograph, not a policy, because photographs of violence did more diplomatic work than any report.",
      "For the second effect I said who was harmed — organizations under surveillance, and the movement's own coalition — rather than saying 'it became harder'.",
      "The weakest claim in my essay is the surveillance sentence, because I did not name a program. That is what I would fix.",
    ],
    trap:
      "Writing about the civil rights movement with the Cold War bolted on as a first sentence. If the international story disappears after the introduction, the essay has answered a different question.",
  },
  {
    id: "apush-9",
    courseSlug: "apush",
    unitNumber: 9,
    prompt:
      "Short answer: Explain one continuity and one change in American political life between 1980 and the present.",
    plan: [
      "Pair them deliberately. The best answers show a change inside a continuity, not two unrelated facts.",
      "Dating matters here, so keep your evidence after 1980.",
    ],
    example: [
      "One continuity is that Americans have kept arguing about the size of the federal government in almost the same language since 1980. Candidates promise to cut it, and once in office the same candidates discover that the programs they proposed to cut are popular with the voters who elected them, so spending has grown under presidents of both parties. The argument has outlasted the arguments.",
      "One change is where that argument happens. Talk radio, then cable news, then social platforms moved the argument out of the committee room and into feeds chosen by the listener. That did not change what Americans disagree about, but it changed how quickly a disagreement becomes a fundraising appeal, and it made the shared facts a debate could rest on harder to find.",
    ],
    because:
      "The pair is chosen so the change is a change within the continuity: the same fight, fought somewhere else. That is more persuasive than two separate facts, and it is what 'one continuity and one change' is really asking for.",
    say: [
      "I chose a continuity and a change that touch each other, because otherwise the answer is two facts in a coat.",
      "The continuity is the size-of-government argument. The change is where the argument takes place, not what it is about.",
      "I kept everything after 1980, because the question gives a start date and an answer that begins in 1968 would be off the mark.",
      "If you pushed me, the weak part is 'shared facts' — that is a broad claim, and I would want one specific example before I defended it hard.",
    ],
    trap:
      "Choosing a continuity that is really a change — 'partisanship has increased' is a change, so pairing it with another change leaves the first half of the question unanswered.",
  },
];

export const apushDefense: CourseDefense = {
  courseSlug: "apush",
  claim:
    "That a historical argument is yours, not a summary's — you chose the evidence, and you know what would count against you.",
  frames: [
    "My argument is that…, and the strongest evidence for it is…",
    "The document that complicates my claim is…, and here is how I handled it.",
    "This writer said this because…, which is why I trust it this far and no further.",
    "I am treating this as a cause rather than a correlation because…",
    "If I had one more document, I would want one that…",
  ],
  markedOn: [
    "Whether the claim is arguable, not just true",
    "Whether the evidence is specific — a person, a date, a document",
    "Whether you can say why a source says what it says",
    "Whether you know where your argument is weakest",
  ],
  units: [
    {
      unitNumber: 1,
      keep: [
        "One disease and its effect on a named people",
        "One crop or metal and the route it traveled",
      ],
      question: "\"How do you know the exchange was mostly biological rather than commercial?\"",
      answer: [
        "I do not claim it was mostly biological — I claim the biological part changed who was alive, which is prior to any trade.",
        "My evidence is that populations fell before the colonial economies were built on them.",
        "If you showed me a region where trade arrived first and disease later, I would have to change the claim.",
      ],
    },
    {
      unitNumber: 2,
      keep: [
        "Chesapeake tobacco and New England shipping, side by side",
        "One non-economic force, such as the Great Awakening",
      ],
      question: "\"If the economy explains it, why were the colonies so religious?\"",
      answer: [
        "Because a market decides who works and who owns, but it does not decide what people believe.",
        "I put the Awakening in as a limit on my own argument rather than pretending it away.",
        "The test I would apply is what happened when the crop failed: society reorganized around the market first, and only then around the church.",
      ],
    },
    {
      unitNumber: 3,
      keep: [
        "One document's author and audience",
        "One sentence showing the argument hardening",
      ],
      question: "\"Which document would you throw out if you could, and why?\"",
      answer: [
        "The one that only repeats a grievance, because it tells me what people complained about, not what they were willing to do.",
        "I would keep the pamphlet written for a tavern, because it shows the argument being made to people who might fight.",
        "That is a judgment about usefulness, not about truth — the boring document is still accurate.",
      ],
    },
    {
      unitNumber: 4,
      keep: [
        "One mechanism: wages, clocks, or canals",
        "One named person whose experience you can describe",
      ],
      question: "\"Was the market revolution good or bad for workers?\"",
      answer: [
        "I would answer both, and I would say straight away that it was not both for the same people. A mill worker gained cash and independence and lost control of her hours.",
        "I am not going to average those together, because averaging hides the person.",
        "The evidence I would show first is that the same job paid cash for the first time. That is the change, and the cost arrived in the same envelope.",
      ],
    },
    {
      unitNumber: 5,
      keep: [
        "One act of Southern resistance with a name",
        "One Northern decision that let it stand",
      ],
      question: "\"Was Reconstruction doomed from the start?\"",
      answer: [
        "No. It worked while enforcement was funded, which is why the Enforcement Acts quieted violence for a time.",
        "What ran out was the willingness to pay, and that is a decision, not a destiny.",
        "The evidence I would show first is 1877 — troops leaving, governments falling, no resistance required.",
      ],
    },
    {
      unitNumber: 6,
      keep: [
        "The mechanism that made workers replaceable",
        "One union and one strike, with the outcome",
      ],
      question: "\"Why did the unions lose?\"",
      answer: [
        "Partly because the law was against them — injunctions and troops — and partly because the workforce was designed to be replaceable.",
        "Pullman is the case: a national boycott, a court order, and a union gone.",
        "I would not say they achieved nothing. The eight-hour day came from the same pressure, slowly.",
      ],
    },
    {
      unitNumber: 7,
      keep: [
        "One document from someone receiving help",
        "One from someone who thought the help should not exist",
      ],
      question: "\"Did the New Deal end the Depression?\"",
      answer: [
        "Not on its own. It changed what citizens expected from the government, which is a different and longer-lasting change.",
        "Some programs helped directly; the economy only fully recovered with wartime production.",
        "That is why my claim is about the relationship rather than about the recovery — I am defending the part the evidence supports.",
      ],
    },
    {
      unitNumber: 8,
      keep: [
        "One moment where foreign policy and civil rights touched",
        "One cost of that connection to the movement",
      ],
      question: "\"Was the Cold War good for civil rights?\"",
      answer: [
        "It was useful and dangerous at once, and I can name a moment for each.",
        "Useful: images of violence abroad made segregation a diplomatic problem, which gave the federal government a reason to act.",
        "Dangerous: the same frame made radical economics and anti-war criticism unsayable, which narrowed the movement.",
      ],
    },
    {
      unitNumber: 9,
      keep: [
        "One continuity with evidence on both sides of a change of president",
        "One change in where politics happens",
      ],
      question: "\"Is the country more divided now than in 1980?\"",
      answer: [
        "I would separate 'divided' from 'loud'. The arguments are recognizably the same; the speed and the audience are new.",
        "My evidence for continuity is the size-of-government argument surviving both parties.",
        "My evidence for change is where the argument happens, which is why I did not have to claim people disagree more.",
      ],
    },
  ],
};
