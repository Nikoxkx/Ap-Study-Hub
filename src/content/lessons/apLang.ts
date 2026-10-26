import { section } from "./build";
import type { Lesson } from "./types";

/**
 * AP Lang has no required list of nonfiction works. These nine lessons follow
 * the official skill spiral and use short, original examples rather than
 * pretending that a particular anthology is mandated.
 */
export const apLangLessons: Lesson[] = [
  {
    unitNumber: 1,
    title: "Unit 1 · Rhetorical situations and defensible claims",
    description: "Read exigence, writer, audience, purpose, context, and message as a working system, then write claims and evidence that respond to that system.",
    examWeight: "Rhetorical Situation and Claims & Evidence skills · 11–16% MCQ ranges",
    objectives: [
      "Identify the six components of a rhetorical situation and explain their relationships.",
      "Distinguish a claim, evidence, and commentary in an argument.",
      "Write a defensible claim supported by relevant evidence in a focused paragraph.",
    ],
    sections: [
      section("A text answers a situation", ["cb-lang-ced", "purdue-rhetoric"], `
Rhetoric is the strategic use of communication within a situation, not a synonym for empty persuasion. A school-board speech, research abstract, memorial address, and social-media post can discuss the same issue while making very different choices. Start with the **exigence**: the circumstance that invites or demands a response. A new attendance policy may be the occasion, but the writer’s exigence could be a pattern of exclusions revealed by that policy. Naming the spark precisely gives later analysis a direction.

The **writer** is more than a name in the byline. Relevant features might include professional role, lived experience, public commitments, or a reputation the audience already knows. The **audience** includes intended recipients and may include secondary audiences who encounter the text later. Avoid vague claims such as “the audience is everyone.” A union president addressing members and a superintendent addressing parents have different shared knowledge, concerns, and reasons to trust or resist the speaker.
`),
      section("Purpose, context, and message work together", ["cb-lang-ced", "purdue-rhetoric"], `
**Purpose** is what the writer seeks to accomplish through the text: to redefine a problem, defend a decision, change a policy, commemorate a person, or create a particular emotional and intellectual response. “To persuade” is usually too broad to be useful. A sharper purpose might be “to persuade hesitant parents that a later start time is feasible by reframing transportation costs as manageable investments.” That statement already suggests what evidence and tone the writer may choose.

**Context** includes the time, place, institutions, cultural debates, and surrounding conversation that shape meaning. The **message** is the central idea the writer communicates about the subject. Context is not a list of current events, and message is not a plot summary. If a scientist writes after a widely publicized flood, that event may make readers receptive to resilience planning but also skeptical of expensive promises. Your analysis should show how the situation makes a particular choice timely, risky, or effective.
`),
      section("Claims require support", ["cb-lang-ced", "purdue-argument"], `
A **claim** asserts something that a reasonable reader could dispute. “This essay discusses school start times” identifies a topic; “The district should pilot a later high-school start because the current schedule shifts health and transportation costs onto students” makes a defensible claim. Claims can concern fact, definition, cause, value, or policy. Recognizing the type matters: a causal claim needs different support from a claim about whether an action is ethical.

**Evidence** is information offered to make a claim credible: an observation, example, statistic, expert finding, historical case, or textual detail. Evidence does not interpret itself. **Commentary** explains the relationship between the evidence and the claim, including the assumptions that make the evidence relevant. If a survey reports insufficient sleep among teenagers, you still need to explain why a schedule change addresses the cause and whether the surveyed population resembles the district. The reasoning is part of the argument, not decorative filler after a quotation.
`),
      section("A worked rhetorical reading", ["cb-lang-ced", "purdue-rhetoric"], `
Imagine a mayor saying, “We cannot build a city for the average resident, because no average resident wheels a stroller onto our buses, reads our signs in every language, or navigates our curbs with a cane.” The exigence might be a proposed accessibility ordinance, and the immediate audience could be council members worried about cost. The message rejects design around an imaginary “average” person. Repetition of concrete situations turns an abstract principle into experiences listeners can picture.

A weak analysis would stop at “the mayor uses anaphora and pathos.” A stronger reading explains the chain: the repeated “our” assigns shared ownership of public infrastructure; the examples broaden the audience’s idea of who counts as a resident; and that redefinition supports the purpose of making accessibility seem routine rather than special. Notice that the device label appears only as shorthand. The analytical value lies in explaining why this audience, at this moment, might respond to that choice.
`),
      section("From situation to your own paragraph", ["cb-lang-ced", "cb-lang-exam", "cb-lang-frq"], `
Before writing, complete a quick situational brief: What happened? Who needs to act or reconsider? What do they currently believe? What do I want them to understand or do? Then draft a claim narrow enough to prove in the available space. Select evidence because it answers the audience’s strongest doubt, not because it is the first fact you remember. If your reader fears implementation problems, an example of a workable pilot may be more useful than another statement of moral urgency.

On the AP exam, this same awareness governs all three essays and many multiple-choice questions. A thesis must respond to the actual prompt and establish a line of reasoning, not simply agree or list devices. The six-point analytic rubric allocates one point for thesis, up to four for evidence and commentary, and one for sophistication. Unit 1 therefore builds the foundation for every row: interpret the task, make a defensible claim, and explain evidence rather than treating a quotation as self-explanatory.
`),
    ],
    glossary: [
      { term: "Exigence", definition: "The circumstance, problem, or occasion that prompts a communicator to respond." },
      { term: "Rhetorical situation", definition: "The interacting exigence, writer, audience, purpose, context, and message surrounding a text." },
      { term: "Defensible claim", definition: "An arguable assertion that can be supported through evidence and reasoning." },
      { term: "Commentary", definition: "Explanation of how and why evidence supports a claim within a line of reasoning." },
    ],
    examAlignment: {
      title: "Foundation for the analytic rubric",
      description: "Every AP Lang essay begins with a prompt-specific thesis and depends on commentary that makes evidence relevant.",
      criteria: [
        "Answer the prompt’s exact verb and subject rather than writing about the general topic.",
        "Explain at least one audience need or assumption that makes a rhetorical choice significant.",
        "After every important piece of evidence, state the reasoning that connects it to your claim.",
      ],
      sources: ["cb-lang-ced", "cb-lang-exam", "cb-lang-frq"],
    },
    practice: [
      {
        question: "Which statement best identifies exigence in a principal’s email proposing a phone-storage policy after repeated classroom disruptions?",
        options: ["The principal’s years of experience", "The disruptions that prompted the proposed response", "The students who receive the email", "The claim that phones can distract"],
        correctIndex: 1,
        explanation: "Exigence is the prompting circumstance; the other options identify writer, audience, or message.",
        skill: "Identify rhetorical situation",
      },
      {
        question: "Which addition most improves the paragraph: ‘Students sleep too little. A district survey found 68% sleep under seven hours.’?",
        options: ["Another unrelated sleep statistic", "A sentence explaining how the survey supports a schedule claim and acknowledging its limits", "A longer quotation from the survey", "A list of pathos, ethos, and logos"],
        correctIndex: 1,
        explanation: "The missing intellectual work is commentary connecting evidence to a particular claim while qualifying its support.",
        skill: "Develop evidence and commentary",
      },
      {
        question: "A writer analyzing the rhetorical situation of a commencement speech should FIRST consider which combination?",
        options: ["The speaker, the graduating audience, and the celebratory occasion that shapes the message", "The number of words in the speech and the font used to print it", "Whether the speech uses iambic pentameter throughout", "The speaker's income and the school's athletic record"],
        correctIndex: 0,
        explanation: "Exigence, audience, speaker, purpose, and context form the rhetorical situation; a commencement address is shaped by the graduates, families, and the ceremonial occasion before any device is named.",
        skill: "Rhetorical situation analysis",
      },
      {
        question: "Which statement is the most defensible (arguable) claim for an argument essay?",
        options: ["School districts should replace some late-start bus routes with early college-credit courses because they expand opportunity without new taxes.", "School is important for students in many ways.", "There are advantages and disadvantages to every school policy.", "Education has changed a lot over the past hundred years."],
        correctIndex: 0,
        explanation: "A defensible claim takes a specific, contestable position with reasons; the other options are vague, balanced to the point of emptiness, or merely factual.",
        skill: "Defensible claims (Thesis, Row A)",
      },
    ],
  },
  {
    unitNumber: 2,
    title: "Unit 2 · Audience, thesis, and strategic organization",
    description: "Design arguments around an audience’s values and needs, create a purposeful thesis, and arrange claims so each step prepares the next.",
    examWeight: "Rhetorical Situation: Writing and Reasoning & Organization · 11–16% MCQ ranges",
    objectives: [
      "Explain how audience beliefs and needs influence evidence, tone, and structure.",
      "Draft a thesis that previews a defensible line of reasoning.",
      "Evaluate paragraph order and transitions as strategic choices.",
    ],
    sections: [
      section("Audience is an analytical model", ["cb-lang-ced", "purdue-rhetoric"], `
Writers never meet an entirely generic audience. They infer what readers know, fear, value, and expect from the context, then make choices on that basis. An expert panel may need methodological caveats, while affected residents may first need evidence that their experiences are understood. This does not mean pandering. Audience awareness can mean respectfully challenging a belief, provided you supply a bridge that makes the challenge hearable and logically supported.

A useful question is “What would have to be true for this reader to accept my claim?” The answer reveals the work your argument must do. If a commuter opposes a bike lane because parking is scarce, statistics about national cycling trends alone miss the objection. A block-level parking study, a phased design, or evidence of changed travel behavior addresses the actual concern. The audience thus affects not only tone but the selection and sequence of proof.
`),
      section("Thesis as a map of reasoning", ["cb-lang-ced", "purdue-argument"], `
A thesis is the central claim your essay defends. In AP writing, a formulaic preview can help you start, but the thesis should express a relationship among ideas rather than merely name three devices or sources. “The writer uses imagery, repetition, and tone to persuade” does not tell readers where the argument is going. “By contrasting clinical statistics with intimate portraits, the writer makes an abstract budget decision feel like a personal moral obligation” supplies an interpretive claim and a direction.

Your own argument thesis should also be narrow enough to defend and broad enough to matter. “Libraries are good” is not defensible in a meaningful way; “The city should preserve evening library hours because they provide supervised study space and internet access to students whose homes cannot reliably supply either” identifies action, mechanism, and affected group. The body can then develop those linked reasons rather than search for unrelated benefits.
`),
      section("A line of reasoning, not a stack of paragraphs", ["cb-lang-ced", "purdue-argument"], `
The **line of reasoning** is the logical progression that leads a reader from the thesis through supporting claims to the conclusion. Each body paragraph should perform a job that the previous paragraph has made necessary. You might first establish that a problem is unequally distributed, then demonstrate that a proposed intervention reaches those most affected, and finally address feasibility. That sequence is argumentative because later claims depend on earlier ones.

To test organization, write the claim of each paragraph in the margin without the evidence. If the resulting outline reads like “another reason,” “another example,” and “a final example,” the essay may have evidence but no progression. Rearranging paragraphs can sometimes reveal the missing logic. In rhetorical analysis, the equivalent test is to explain why the writer moves from one section to another rather than describing the text in chronological order and calling that analysis.
`),
      section("Transitions reveal logical relationships", ["cb-lang-ced", "purdue-argument"], `
Transitions are not decorative words inserted to satisfy a checklist. “Therefore” signals consequence, “however” marks contrast, “for example” introduces illustration, and “more importantly” ranks claims. Using the wrong transition can make an otherwise sound paragraph illogical. If two pieces of evidence support the same claim, “consequently” may falsely imply that the second results from the first. Choose language that accurately represents the relationship you intend.

Cohesion also comes from repeated key terms, controlled synonyms, and references that point clearly to earlier ideas. Repeating a precise term such as “public accountability” can maintain focus; varying among “this,” “that,” and “it” without clear antecedents creates confusion. When revising, read only the final sentence of one paragraph and first sentence of the next. The junction should make the new step feel connected but not redundant.
`),
      section("Planning under exam conditions", ["cb-lang-ced", "cb-lang-exam", "cb-lang-frq"], `
A five-minute plan can save twenty minutes of drifting prose. Write your thesis, list two or three claims that must be true for it to hold, and attach evidence to each. Place the strongest or most necessary claim where it can support the next step. Leave room for a qualification if the prompt involves complexity. You do not need a five-paragraph essay; you need enough development to make your position and reasoning clear.

The thesis point requires a defensible position or interpretation that responds to the prompt. Burying that position in the final sentence after a broad introduction makes planning harder, even if it is technically present. The evidence-and-commentary row then depends on the line of reasoning you established. Before submitting, check whether each paragraph changes the reader’s understanding or merely repeats the thesis with a new quotation. Revision of structure often matters more than adding another sophisticated-sounding word.
`),
    ],
    glossary: [
      { term: "Line of reasoning", definition: "The ordered logical progression connecting a thesis, supporting claims, evidence, and conclusion." },
      { term: "Audience appeal", definition: "A choice shaped by the audience’s knowledge, values, needs, or expectations, not limited to emotional language." },
      { term: "Cohesion", definition: "The quality of clear connection among sentences and paragraphs through logic, reference, and language." },
      { term: "Strategic organization", definition: "An arrangement chosen because it advances a particular argument for a particular audience." },
    ],
    examAlignment: {
      title: "Thesis and line of reasoning",
      description: "The thesis row is only an entry point; high evidence-and-commentary scores require a sustained, organized argument.",
      criteria: [
        "Make the thesis interpretive or argumentative, not a device list or topic announcement.",
        "Give every body paragraph a distinct role in proving the thesis.",
        "Use transitions that name genuine relationships among claims rather than ornamental connectors.",
      ],
      sources: ["cb-lang-ced", "cb-lang-exam", "cb-lang-frq"],
    },
    practice: [
      {
        question: "Which thesis offers the clearest line of reasoning for an argument essay about community gardens?",
        options: ["Community gardens are interesting and popular.", "This essay will discuss soil, food, and people.", "The city should lease vacant lots for gardens because resident stewardship can improve food access while creating accountable neighborhood gathering places.", "Gardens use ethos, pathos, and logos."],
        correctIndex: 2,
        explanation: "It makes a policy claim and previews linked mechanisms and benefits that body paragraphs can defend.",
        skill: "Develop a thesis",
      },
      {
        question: "A paragraph proves a program is necessary; the next proves it is affordable. Which transition best connects them?",
        options: ["For example", "Similarly", "Establishing need, however, does not settle feasibility.", "In conclusion"],
        correctIndex: 2,
        explanation: "The transition identifies a new logical requirement created by the preceding claim.",
        skill: "Organize reasoning",
      },
      {
        question: "In an argument essay, a line of reasoning is best described as",
        options: ["the logical arrangement of claims and evidence that leads a reader to the thesis", "the list of sources cited at the end of the essay", "the writer's most emotional sentence in the conclusion", "a summary of every opposing viewpoint available"],
        correctIndex: 0,
        explanation: "AP readers reward a visible line of reasoning: claims in a deliberate order, each developed so the conclusion feels earned rather than announced.",
        skill: "Line of reasoning (Thesis, Row A)",
      },
      {
        question: "Which thesis best previews an organized line of reasoning?",
        options: ["Because it lowers costs, raises graduation rates, and frees classroom space, the district should adopt a four-day week with optional Friday enrichment.", "The four-day school week is a topic many people feel strongly about.", "This essay will discuss the four-day school week in great detail.", "Four-day weeks exist in several states across the country."],
        correctIndex: 0,
        explanation: "The thesis names three parallel reasons—cost, graduation, space—that the body paragraphs can develop in order, creating an easy-to-follow line of reasoning.",
        skill: "Thesis construction",
      },
    ],
  },
  {
    unitNumber: 3,
    title: "Unit 3 · Perspectives, evidence, and commentary",
    description: "Read arguments as positions within a conversation, integrate sources without losing your voice, and use commentary to make evidence do analytical work.",
    examWeight: "Claims & Evidence plus Reasoning & Organization · synthesis and argument FRQs",
    objectives: [
      "Distinguish a source’s position from the perspective that informs it.",
      "Integrate paraphrase and quotation accurately with clear attribution.",
      "Develop commentary that interprets evidence and advances a claim.",
    ],
    sections: [
      section("Position and perspective are not synonyms", ["cb-lang-ced", "purdue-rhetoric"], `
A **position** is the stance a writer takes: support, opposition, or a qualified response to a proposal. A **perspective** is the vantage point shaped by experience, discipline, values, role, or commitments through which the writer sees the issue. Two urban planners may share a professional perspective but reach opposite positions on congestion pricing. A nurse and an economist may agree on a vaccine policy while explaining its value through different priorities.

This distinction prevents shallow source grouping. Writing “Source A agrees and Source B disagrees” identifies positions but not a conversation. Ask why each source reaches its conclusion, what it treats as most important, and what evidence it considers legitimate. Your synthesis becomes stronger when you can say, “Both sources prioritize reliability, but the engineer measures it through system uptime while the caregiver measures whether an older adult can use the system without assistance.”
`),
      section("Relevance, credibility, and sufficiency", ["cb-lang-ced", "purdue-research"], `
Relevant evidence bears directly on the claim; credible evidence comes through a process or source you have reason to trust; sufficient evidence is enough in variety and depth to support the claim’s scope. A compelling anecdote may be relevant and truthful but insufficient to establish a national trend. A large dataset may be credible yet irrelevant if it measures a different population or outcome. Evaluate evidence against the exact job it must perform.

Credibility is not a permanent badge attached to an institution. Ask about method, expertise, transparency, incentives, and proximity to the subject. A government report can offer strong administrative data while reflecting the categories an agency chose to collect. A first-person account can provide indispensable experiential evidence without being representative. Rather than dismissing a source as “biased,” explain its limitations and decide what it can responsibly establish.
`),
      section("Quotation and paraphrase with control", ["cb-lang-ced", "purdue-research"], `
Quote when the source’s wording itself matters: a definition, a striking formulation, a contested phrase, or language you will analyze. Paraphrase when the information matters more than the wording. Both require accurate attribution, and paraphrase requires genuine transformation of syntax and expression rather than replacing a few synonyms. If you copy a distinctive phrase inside an otherwise paraphrased sentence, use quotation marks and preserve the source’s meaning.

Integration should make the source’s role clear. Instead of dropping a quotation between two claims, use a signal phrase and follow with interpretation: “The transit audit reports that missed transfers account for most delays (Source B). That finding shifts the problem from the number of buses to the coordination among routes.” The source supplies a fact; your sentence identifies its consequence. Ellipses and brackets can make a quotation grammatical, but they must not distort the original claim.
`),
      section("Commentary is the argument’s engine", ["cb-lang-ced", "cb-lang-frq"], `
Useful commentary answers several possible questions: What does this evidence show? Why does it matter for this claim? What assumption connects them? How does it affect the broader thesis? You do not need to answer all four every time, but you must do more than paraphrase the evidence. After quoting that a neighborhood has fewer trees, do not merely repeat that it lacks shade; explain how canopy disparity produces heat exposure and why that makes tree planting an equity measure rather than only beautification.

A practical revision technique is to highlight evidence in one color and commentary in another. Long stretches of source language with only a sentence of response signal that the sources are controlling the essay. Commentary should vary in depth according to the evidence’s importance. A key study may deserve several sentences about method and implication, while a small illustrative example may need one precise connection.
`),
      section("Synthesis without becoming a source summary", ["cb-lang-ced", "cb-lang-exam", "cb-lang-frq"], `
The AP synthesis essay supplies a mini-conversation and asks you to develop your own position. Read the prompt before mining the sources so you know what claim the task requires. Then mark each source for useful evidence, perspective, and possible tensions. A source can support part of your argument while challenging another; using that tension often produces a more defensible thesis than sorting sources into “for” and “against” columns.

For the highest evidence-and-commentary level, the rubric expects specific evidence from at least three provided sources supporting all claims in a line of reasoning, with consistent explanation. That requirement is not an invitation to cite every source mechanically. Three purposeful references with analysis beat six drive-by citations. Official samples and scoring guidelines show how students maintain their own voices. This site’s practice questions are original; use the released AP samples to calibrate against actual scoring.
`),
    ],
    glossary: [
      { term: "Position", definition: "The stance an author takes on an issue or claim." },
      { term: "Perspective", definition: "The vantage point formed by experiences, values, discipline, role, and commitments." },
      { term: "Sufficiency", definition: "The adequacy of evidence in amount, range, and depth for the scope of a claim." },
      { term: "Signal phrase", definition: "Attribution language that introduces a source and often indicates its role or stance." },
    ],
    examAlignment: {
      title: "Evidence and commentary, up to four points",
      description: "This rubric row rewards specific support for all claims and consistent explanation, not quotation quantity.",
      criteria: [
        "For synthesis, use specific evidence from at least three provided sources while maintaining your own argument.",
        "Explain how each major piece of evidence supports the claim it accompanies.",
        "Represent a source’s position and limitations accurately before agreeing or disagreeing.",
      ],
      sources: ["cb-lang-ced", "cb-lang-exam", "cb-lang-frq"],
    },
    practice: [
      {
        question: "Which sentence best distinguishes perspective from position?",
        options: ["Source C supports the proposal, so it has no perspective.", "Both sources oppose the fee, but the small-business owner emphasizes cash flow while the commuter emphasizes fare equity.", "Source A is longer than Source B.", "A perspective is any statistic used as evidence."],
        correctIndex: 1,
        explanation: "The positions align, while different roles and priorities produce different perspectives and reasoning.",
        skill: "Analyze multiple perspectives",
      },
      {
        question: "Which revision most directly strengthens commentary?",
        options: ["Add a second quotation saying the same thing.", "Explain why the quoted result supports the paragraph’s causal claim and note any assumption.", "Replace the claim with a broader claim.", "Remove the source attribution."],
        correctIndex: 1,
        explanation: "Commentary supplies the warrant and boundaries that make evidence useful to the argument.",
        skill: "Develop commentary",
      },
      {
        question: "Commentary differs from summary because commentary",
        options: ["explains how the evidence proves the claim rather than retelling what the evidence says", "is always written in the first person", "repeats the quotation in different words", "appears only in the introduction of an essay"],
        correctIndex: 0,
        explanation: "The Evidence and Commentary row (0–4 points) is earned by interpretation: connecting specific evidence to the claim with reasoning, not by piling up quotations.",
        skill: "Evidence and commentary (Row B)",
      },
      {
        question: "Which sentence provides commentary rather than summary? A writer quotes a city report showing library visits rose 40% after hours were extended.",
        options: ["By linking longer hours to measurable use, the statistic turns a budget debate into evidence that access itself creates demand.", "The report says library visits increased by forty percent after the change.", "Libraries are open longer now than they were last year.", "Many people enjoy visiting the public library in the evening."],
        correctIndex: 0,
        explanation: "Only the first option interprets the evidence—explaining what the statistic proves about access and demand—while the others restate or wander from it.",
        skill: "Evidence and commentary (Row B)",
      },
    ],
  },
  {
    unitNumber: 4,
    title: "Unit 4 · Methods of development and purposeful structure",
    description: "Use definition, comparison, cause–effect, narration, description, and process analysis as tools for developing claims, introductions, and conclusions.",
    examWeight: "Reasoning & Organization skills · reading, revision, and all FRQ tasks",
    objectives: [
      "Identify the function of common methods of development in a passage.",
      "Select a method that fits a claim rather than following a fixed template.",
      "Write introductions and conclusions that establish stakes and extend implications.",
    ],
    sections: [
      section("Methods are jobs, not essay types", ["cb-lang-ced", "purdue-argument"], `
A method of development is a way of making an idea understandable and persuasive. **Definition** establishes the meaning or boundaries of a term; **comparison** illuminates similarity or difference; **cause–effect** explains mechanisms or consequences; **narration** develops events across time; **description** makes features concrete; and **process analysis** shows how something occurs. One essay normally combines several methods instead of choosing a single permanent label.

The method should answer a problem in the audience’s understanding. If readers use “independent” in conflicting ways, define it before evaluating a policy. If they underestimate a risk, narrating one person’s experience may create recognition, followed by data establishing scale. If they assume two programs are equivalent, comparison can expose a consequential difference. The analytical question is not “Which method is present?” but “Why does the argument need this method here?”
`),
      section("Definition and classification shape the debate", ["cb-lang-ced", "purdue-argument"], `
Arguments often turn on category boundaries. Calling a platform worker a “contractor” rather than an “employee” changes legal obligations; calling a wetland “wasteland” changes what protection seems reasonable. Writers can define by criteria, example, contrast, function, or etymology, but a dictionary quotation rarely resolves a live dispute. An operational definition tells readers how the term will work in your argument and why that definition is appropriate.

Classification divides a subject into meaningful groups, while division examines a whole’s parts. Both require a consistent principle. Sorting transportation into “cars, buses, and things young people use” mixes vehicle type with user stereotype. A strong classification might distinguish trips by distance, physical demand, or scheduling flexibility. Those categories then support different claims. When reading, ask who benefits from a definition and what it includes or excludes.
`),
      section("Comparison and causal reasoning", ["cb-lang-ced", "purdue-argument"], `
A useful comparison establishes a shared basis and identifies the significance of the similarities or differences. Comparing two tutoring programs by cost, hours, and student outcomes is more coherent than listing everything about one and then everything about the other. An analogy compares unlike things to clarify a relationship, but its usefulness depends on whether the relevant features actually correspond. A memorable analogy can still be misleading.

Causal development requires more than chronological order. “After the app launched, attendance rose” does not prove the app caused the increase; a new schedule or marketing campaign may also explain it. Strong causal reasoning proposes a mechanism, considers alternatives, and calibrates certainty. You may be able to argue that a policy contributed to an outcome without claiming it was the sole cause. That precision increases credibility rather than weakening your voice.
`),
      section("Introductions establish a contract", ["cb-lang-ced", "cb-lang-frq"], `
An introduction should orient readers to the issue and present a defensible thesis. A vivid image or brief context can establish exigence, but broad openings such as “Since the dawn of time” waste space and often claim too much. In rhetorical analysis, identify the text and situation efficiently, then move to your interpretation of the writer’s choices. You do not need to retell the entire passage before saying anything analytical.

The thesis and introduction together create a contract about what the essay will do. If the introduction promises to evaluate fairness but the body discusses only cost, the structure has broken that contract. During timed writing, keep the opening proportionate: two or three purposeful sentences can be enough. The rubric does not award a separate point for a hook, so a dramatic first line cannot substitute for a clear position and line of reasoning.
`),
      section("Conclusions open implications", ["cb-lang-ced", "cb-lang-exam", "cb-lang-frq"], `
A conclusion can clarify stakes, resolve a tension, or connect the argument to a broader implication without merely repeating the thesis. If you have argued for a pilot program, the conclusion might explain what evidence should determine expansion. If you have analyzed a speech, you might show how its final return to an opening image completes the writer’s effort to transform private grief into public responsibility. The ending should grow out of the reasoning already developed.

Sophistication is not earned by adding a grand universal statement in the last paragraph. Official guidance treats it as a quality that can emerge through nuanced argument, complex treatment of sources or rhetorical choices, or especially effective style. A thoughtful limitation or a well-framed implication can contribute, but only within an already strong essay. The conclusion is therefore an opportunity to clarify significance, not a magic container for the sophistication point.
`),
    ],
    glossary: [
      { term: "Method of development", definition: "A patterned way of explaining or supporting ideas, such as definition, comparison, narration, or cause–effect." },
      { term: "Operational definition", definition: "A definition that specifies how a term will be understood or measured within an argument." },
      { term: "Analogy", definition: "A comparison of unlike things intended to clarify a relationship or principle through relevant similarities." },
      { term: "Implication", definition: "A consequence or broader significance that follows from an argument’s reasoning." },
    ],
    examAlignment: {
      title: "Organization across reading and writing",
      description: "AP readers look for purposeful development; multiple-choice revision tasks also test whether a proposed sentence fits a paragraph’s function.",
      criteria: [
        "Identify what a section does for the argument, not only which device or method it contains.",
        "Use definitions and comparisons with consistent, relevant criteria.",
        "Treat introduction and conclusion as reasoning spaces rather than rubric superstitions.",
      ],
      sources: ["cb-lang-ced", "cb-lang-exam", "cb-lang-frq"],
    },
    practice: [
      {
        question: "Which method best addresses readers who disagree about what ‘fair grading’ means?",
        options: ["An operational definition followed by criteria", "A longer list of unrelated examples", "A chronological history of schools", "A more emotional hook"],
        correctIndex: 0,
        explanation: "The disagreement is conceptual, so defining the contested term gives later evaluation a shared basis.",
        skill: "Select methods of development",
      },
      {
        question: "Which conclusion most extends an argument for a six-month bus pilot?",
        options: ["Buses are important and always will be.", "This essay has discussed buses in three paragraphs.", "Ridership, accessibility, and cost data from the pilot should determine whether the route becomes permanent.", "In conclusion, the thesis is correct."],
        correctIndex: 2,
        explanation: "It identifies a concrete implication and decision rule arising from the pilot argument.",
        skill: "Develop implications",
      },
      {
        question: "A writer who opens with a problem, explores its causes, and then proposes a solution is using which method of development?",
        options: ["Problem–cause–solution organization", "Chronological narration only", "Alphabetical classification", "Stream of consciousness"],
        correctIndex: 0,
        explanation: "Methods of development—narration, description, cause–effect, comparison, problem–solution—are chosen for purpose; structure is a rhetorical decision, not a formula.",
        skill: "Methods of development",
      },
      {
        question: "In a rhetorical analysis, identifying that a speech moves from personal anecdote to national statistics primarily helps the writer explain",
        options: ["how the structure shifts the audience from emotion toward evidence, widening the argument's scope", "the speaker's favorite rhetorical device", "why the speech should have been shorter", "the exact date the speech was delivered"],
        correctIndex: 0,
        explanation: "Structural analysis connects arrangement to effect: the movement from one family's story to national data makes the issue feel both human and widespread.",
        skill: "Structure and purpose",
      },
    ],
  },
  {
    unitNumber: 5,
    title: "Unit 5 · Coherence, qualification, and sentence control",
    description: "Maintain a clear argument through modifiers, commentary, transitions, and sentence structures that express exact relationships among ideas.",
    examWeight: "Style: Reading and Writing · 11–14% MCQ weighting each",
    objectives: [
      "Use modifiers and qualification to align a claim with its evidence.",
      "Revise sentence structure to clarify relationships and emphasis.",
      "Diagnose coherence problems at paragraph and whole-essay levels.",
    ],
    sections: [
      section("Coherence is managed meaning", ["cb-lang-ced", "purdue-style"], `
A coherent essay allows readers to follow the argument without reconstructing missing connections themselves. That does not require simple sentences or predictable formulas. It requires stable key terms, clear references, and logical development. If “reform” means a budget cut in one paragraph and a new staffing model in the next, readers lose the thread even if every sentence is grammatical. Define important terms and keep their use consistent.

Coherence can break when a paragraph introduces a new claim without signaling its role. Read your topic sentences as a sequence: they should not all say the same thing, but they should visibly belong to the same argument. Within paragraphs, each sentence should either advance the claim, supply evidence, interpret it, or address a limitation. Beautiful but irrelevant sentences still weaken coherence because they compete for the reader’s attention.
`),
      section("Modifiers make claims accurate", ["cb-lang-ced", "purdue-style"], `
Modifiers specify conditions, degree, frequency, and scope. Words such as **often**, **in this sample**, **primarily**, **under these conditions**, and **may** can prevent an argument from claiming more than its evidence proves. Qualification is not hedging every sentence into meaninglessness. It is choosing the strength of assertion that the support warrants. A well-designed experiment may justify a confident causal statement within its studied conditions but not a universal law.

Placement matters as much as the modifier itself. “Only the committee reviewed anonymous surveys” and “The committee reviewed only anonymous surveys” describe different restrictions. Misplaced introductory phrases can create absurd meanings, while vague “this” references can leave a claim’s scope unclear. During revision, underline qualifiers and ask what word or clause they modify. Precise grammar becomes a form of precise reasoning.
`),
      section("Subordination expresses reasoning", ["cb-lang-ced", "purdue-style"], `
Coordination joins ideas as grammatically equal; subordination makes one idea depend on another. “The policy reduced costs, and residents opposed it” leaves the relationship open. “Although the policy reduced costs, residents opposed it because the savings came from reduced service” identifies concession and cause. Choosing **although**, **because**, **while**, or **if** is therefore a logical decision, not merely a grammatical one.

Sentence combining can reveal relationships you had not articulated. Start with two factual statements and ask whether one causes, qualifies, contrasts, or exemplifies the other. Then choose a structure that puts the main claim in the independent clause. Avoid stacking so many subordinate clauses that the reader loses the central point. Complexity of syntax is useful only when it mirrors complexity of thought.
`),
      section("Parallelism, rhythm, and emphasis", ["cb-lang-ced", "purdue-style"], `
Parallel structure presents comparable ideas in comparable grammatical form. “The proposal promises to reduce waste, improving access, and lower costs” mixes forms; “to reduce waste, improve access, and lower costs” makes the three goals easy to process. Parallelism can also create rhythm and emphasis in persuasive writing, but its first virtue is clarity. Readers can compare items without solving avoidable grammatical puzzles.

Sentence length and information placement guide attention. A short sentence after a long, heavily qualified explanation can emphasize a conclusion. Placing the most important idea at the end of a sentence often gives it weight, while a periodic sentence delays the main clause to build suspense. These are options, not rules to use constantly. In AP revision questions, select the version whose emphasis and logic fit the surrounding passage, not simply the longest or most ornate option.
`),
      section("A revision protocol that works", ["cb-lang-ced", "cb-lang-exam", "cb-lang-frq"], `
Revise in passes rather than trying to solve every problem at once. First check the thesis and paragraph claims; then test evidence and commentary; then inspect transitions and key terms; finally edit sentences for precision and grammar. If the argument is missing a step, polishing a comma will not rescue it. Reading aloud can expose missing connections and overloaded sentences because your ear notices where meaning becomes difficult to track.

The exam’s writing multiple-choice questions ask you to make similar strategic decisions within a passage. Consider the writer’s purpose, the paragraph’s job, and the relationship among sentences before choosing a revision. In free response, do not sacrifice thinking time to manufacture elaborate syntax. Clear, controlled prose with specific evidence scores better than vague “sophisticated” language. Style earns its value by advancing the argument.
`),
    ],
    glossary: [
      { term: "Qualification", definition: "A limitation on a claim’s scope, certainty, or conditions that makes it more defensible." },
      { term: "Subordination", definition: "A grammatical structure that makes one clause depend on another, often expressing cause, concession, or condition." },
      { term: "Parallelism", definition: "The use of matching grammatical forms for comparable ideas, improving clarity and sometimes rhythm." },
      { term: "Antecedent", definition: "The word or idea to which a pronoun or other reference points." },
    ],
    examAlignment: {
      title: "Style serves accuracy and argument",
      description: "Style questions test purposeful choices; essay readers reward control when it helps sustain and complicate reasoning.",
      criteria: [
        "Match claim strength to evidence through deliberate modifiers and conditions.",
        "Use subordination and transitions to make logical relationships explicit.",
        "Revise argument structure before sentence polish during timed practice.",
      ],
      sources: ["cb-lang-ced", "cb-lang-exam", "purdue-style"],
    },
    practice: [
      {
        question: "Which sentence most accurately limits a claim based on one school’s survey?",
        options: ["Every teenager nationwide hates mornings.", "In this school’s survey, most respondents reported difficulty concentrating during first period.", "All research proves school should start later.", "The survey is biased and therefore useless."],
        correctIndex: 1,
        explanation: "It limits both population and claim to what the reported evidence can establish.",
        skill: "Qualify claims",
      },
      {
        question: "Which revision best expresses concession?",
        options: ["The plan is expensive, and it may reduce emissions.", "Although the plan is expensive, its long-term savings could offset the initial cost.", "The plan is expensive because it may reduce emissions.", "The plan is expensive, for example, it may reduce emissions."],
        correctIndex: 1,
        explanation: "‘Although’ accurately frames cost as a complicating consideration rather than an unrelated fact or cause.",
        skill: "Use subordination strategically",
      },
      {
        question: "Which revision best improves coherence between two paragraphs—one on school gardens reducing lunch waste, the next on gardens improving science scores?",
        options: ["Add a transition explaining that the same hands-on programs producing less waste also give students living data for science class.", "Move the second paragraph to the conclusion without changes.", "Delete the first paragraph so the essay has one idea only.", "Repeat the thesis word for word at the start of both paragraphs."],
        correctIndex: 0,
        explanation: "Coherence comes from explaining relationships between ideas; the added sentence makes the second paragraph a continuation of the first idea's logic, not a new topic dropped beside it.",
        skill: "Coherence and transitions",
      },
      {
        question: "Which sentence is most effectively qualified (neither overclaiming nor vague)?",
        options: ["For most urban districts, later start times appear to improve attendance, though rural transportation schedules may limit the benefit.", "Later start times always improve everything for every student everywhere.", "Later start times might possibly do something for some students somehow.", "Later start times are a thing that schools have considered."],
        correctIndex: 0,
        explanation: "Effective qualification specifies scope (most urban districts), evidence strength (appear to), and a limit (rural transportation)—precise without being wishy-washy.",
        skill: "Qualification and precision",
      },
    ],
  },
  {
    unitNumber: 6,
    title: "Unit 6 · Credibility, bias, and multiple perspectives",
    description: "Evaluate the limits of evidence, account for conflicting sources, and analyze how tone reveals a writer’s relationship to subject and audience.",
    examWeight: "Claims & Evidence plus Style · synthesis, analysis, and MCQ",
    objectives: [
      "Evaluate evidence through method, relevance, incentives, and limitations.",
      "Revise a claim when contradictory evidence requires it.",
      "Explain tone and tone shifts through specific language choices.",
    ],
    sections: [
      section("Bias is not a magic dismissal", ["cb-lang-ced", "purdue-research"], `
Every source emerges from a perspective, but calling it “biased” does not tell readers whether its evidence is trustworthy. A pharmaceutical company funding a drug trial creates an incentive worth examining, yet the study may still use a strong design and transparent reporting. A patient advocacy group may have a clear agenda and also provide essential evidence about lived effects. Evaluation should identify how position, method, and incentives shape particular claims.

Use a layered check: Who produced the information? What method generated it? Can the evidence be inspected or replicated? What alternatives were considered? What is missing? Then decide what weight the source deserves. “The author is biased, so the claim is false” commits a genetic fallacy by rejecting information because of origin alone. “The sample overrepresents heavy users, so the satisfaction estimate may not generalize” identifies a concrete limitation.
`),
      section("Contradiction is information", ["cb-lang-ced", "purdue-argument"], `
When sources disagree, do not automatically choose the one closest to your original thesis. Determine whether they actually address the same question. One study may measure short-term productivity while another measures long-term retention; both can be correct. Apparent contradiction can also result from different definitions, populations, time frames, or baseline assumptions. Reconciling those differences often produces a more precise and useful claim.

Sometimes new evidence genuinely weakens your position. Revise rather than hide it. “The program improves attendance in every context” might become “The program improved attendance in schools that paired it with advising, suggesting that mentorship may be a necessary condition.” The revised thesis accounts for more evidence and identifies a mechanism. In synthesis writing, this responsiveness demonstrates control over the conversation rather than dependence on a preselected answer.
`),
      section("Corroboration and independence", ["cb-lang-ced", "purdue-research"], `
Two articles repeating the same press release are not two independent confirmations. Corroboration gains strength when evidence comes through genuinely different methods or sources: administrative records, interviews, observation, or independent measurement. Triangulation does not require every form of evidence to agree perfectly; it uses comparison to identify robust patterns and unexplained discrepancies. A single eyewitness can be valuable, but memory and vantage point still matter.

Citation quality also matters. A respected publication’s summary of a study may simplify or exaggerate the original result. When possible, inspect the underlying report, sample, or transcript. In a timed synthesis essay you cannot conduct outside research, but you can read the provided source information and distinguish reported findings from the source author’s interpretation. Attribute claims to the actual actor: “the researchers estimate” is not interchangeable with “Source D proves.”
`),
      section("Tone is constructed through choices", ["cb-lang-ced", "purdue-rhetoric"], `
Tone is the writer’s apparent attitude toward subject, audience, or self, created through diction, syntax, imagery, detail, and arrangement. “The policy is an ill-conceived surrender” sounds combative because of judgment-laden nouns, while “The policy trades durable safeguards for uncertain savings” sounds critical but analytical. Avoid one-word tone labels floating without evidence. Pair the label with language and explain how it affects the audience’s perception.

Tone can shift when the argument’s purpose changes. A speaker may begin with mournful remembrance, move to restrained factual accounting, and end with resolute demands. The shift matters because it can move listeners from shared emotion toward action. Do not describe every change in punctuation as a tone shift. Identify a meaningful change in attitude and connect it to the text’s development.
`),
      section("Applying evaluation on the exam", ["cb-lang-ced", "cb-lang-exam", "cb-lang-frq"], `
In synthesis, source evaluation can enter your commentary without becoming a separate research report. A sentence such as “Because Source B surveys only current subscribers, its enthusiasm may overstate demand among residents who have not yet used the service” both uses and qualifies evidence. That move may help create nuance, but it must support your argument rather than display a memorized credibility checklist.

In rhetorical analysis, credibility is part of the rhetorical situation. A writer may cite experts, acknowledge limitations, or adopt a self-deprecating voice to earn trust. Explain why those strategies fit the audience and purpose. Multiple-choice questions may ask which revision best accounts for a counterargument or preserves a tone; read the full context instead of selecting the most formal wording. Across tasks, accuracy and calibrated confidence are more persuasive than absolute language.
`),
    ],
    glossary: [
      { term: "Corroboration", definition: "Evidence from additional sources or methods that strengthens, complicates, or challenges an initial finding." },
      { term: "Triangulation", definition: "Using different kinds of evidence or methods to examine the same question from multiple angles." },
      { term: "Tone", definition: "The attitude conveyed by a writer’s language and choices toward a subject, audience, or self." },
      { term: "Genetic fallacy", definition: "Rejecting or accepting a claim solely because of its origin rather than evaluating its support." },
    ],
    examAlignment: {
      title: "Qualified evidence and credible voice",
      description: "Strong essays account for source limitations and maintain a tone suited to audience and purpose.",
      criteria: [
        "Explain a specific limitation instead of dismissing a source as biased.",
        "Revise or qualify a thesis when evidence genuinely conflicts.",
        "Support every tone description with textual choices and a rhetorical effect.",
      ],
      sources: ["cb-lang-ced", "cb-lang-frq", "purdue-research"],
    },
    practice: [
      {
        question: "Which statement offers the strongest source evaluation?",
        options: ["The source is biased, so ignore it.", "The study was funded by industry, so every result is fabricated.", "The survey oversamples frequent users, limiting how far its satisfaction rate can represent all residents.", "The author has a perspective and cannot provide evidence."],
        correctIndex: 2,
        explanation: "It names a sampling limitation and defines exactly how that limitation affects the claim.",
        skill: "Evaluate evidence",
      },
      {
        question: "Two sources seem contradictory. What should a writer do first?",
        options: ["Delete the less convenient source.", "Assume both are dishonest.", "Check whether they use different definitions, populations, time frames, or outcome measures.", "Average their conclusions without explanation."],
        correctIndex: 2,
        explanation: "Apparent conflicts may dissolve when the sources’ actual questions and methods are compared.",
        skill: "Account for multiple perspectives",
      },
      {
        question: "A writer citing a 30-year study by a university research center alongside one viral social-media post should, in the essay,",
        options: ["weight the peer-reviewed study more heavily and note the limits of anecdotal posts", "treat both sources as equally authoritative evidence", "use only the social-media post because it is more recent", "avoid mentioning either source's origin or credentials"],
        correctIndex: 0,
        explanation: "Evaluating credibility—expertise, method, peer review, recency for the claim at hand—is part of using evidence responsibly and persuades informed audiences.",
        skill: "Source credibility",
      },
      {
        question: "Which choice best addresses bias without dismissing a source entirely?",
        options: ["Acknowledging that the industry-funded report may emphasize benefits, then checking its figures against independent data", "Rejecting every claim the report makes without reading it", "Hiding the funding source from the reader", "Assuming funding automatically makes data false"],
        correctIndex: 0,
        explanation: "Sophisticated writers note perspective and corroborate; bias is a reason to verify, not an automatic refutation.",
        skill: "Bias and perspective",
      },
    ],
  },
  {
    unitNumber: 7,
    title: "Unit 7 · Nuance, counterargument, and complex claims",
    description: "Build arguments that account for tensions, objections, and exceptions through qualification, concession, rebuttal, and carefully developed reasoning.",
    examWeight: "Advanced Claims & Evidence and Reasoning · sophistication within strong essays",
    objectives: [
      "Distinguish concession, refutation, rebuttal, and qualification.",
      "Develop a claim that accounts for conditions and alternative perspectives.",
      "Explain complexity without making an argument indecisive or self-contradictory.",
    ],
    sections: [
      section("Complexity begins with the real issue", ["cb-lang-ced", "purdue-argument"], `
A complex argument is not one that uses difficult words or mentions both sides once. It recognizes that significant issues involve competing values, uneven evidence, tradeoffs, or conditions under which a claim changes. Should a city expand bus service? The answer may depend on route design, funding stability, disability access, and which neighborhoods currently lack service. A thesis can support expansion while identifying the conditions that make it beneficial.

Start by mapping tensions rather than manufacturing them. Which values conflict—speed and access, privacy and safety, uniformity and local control? Where is evidence mixed? Which groups experience different effects? A tension is useful only if it changes the argument. “Some people disagree” adds no complexity; “although the policy reduces average travel time, its benefits bypass residents without reliable first-mile connections” identifies a distributional problem that the thesis should address.
`),
      section("Concession and refutation do different work", ["cb-lang-ced", "purdue-argument"], `
A **concession** acknowledges a valid part of another perspective or a limitation of your own position. **Refutation** explains why an opposing claim or inference is mistaken. **Rebuttal** responds more broadly to an objection, often through a combination of evidence and reasoning. These moves can coexist: concede that a security system collects sensitive data, then argue that a narrower design can preserve benefits while reducing that risk.

Accurate representation is essential. A straw-man version of the opposition makes refutation easy but unconvincing. State the strongest reasonable objection in terms its supporter would recognize. Then identify whether your disagreement concerns facts, values, priorities, or predicted outcomes. If the dispute is about values, more statistics alone may not resolve it; you need to explain why one value should take priority under the circumstances.
`),
      section("Qualifiers create defensible boundaries", ["cb-lang-ced", "purdue-argument"], `
Qualifiers such as **usually**, **for first-year students**, **when trained staff are available**, and **to the extent that** specify where a claim applies. They are not escape hatches that make every statement unfalsifiable. A qualified thesis still commits to a position and gives readers a way to evaluate it. “The district should expand tutoring where diagnostic data show skill gaps and attendance support makes participation consistent” is clearer and more testable than “tutoring always works.”

Rebuttals can also qualify. Rather than proving that every objection is absurd, show that it applies only in limited circumstances or carries less weight than another consideration. This calibration can strengthen credibility. However, avoid stacking so many caveats around the thesis that no reader can tell what you recommend. Put the central action or interpretation in clear language, then place conditions around it deliberately.
`),
      section("Placement and development of counterargument", ["cb-lang-ced", "cb-lang-frq"], `
A counterargument can appear early when the audience is likely to object immediately, after a major claim when evidence raises a natural question, or near the end when you have built enough support to address a difficult alternative. There is no universally superior location. The key is to integrate the objection into the line of reasoning rather than confining it to an isolated “counterargument paragraph” that never affects the thesis.

Develop the response with the same care as your positive argument. If you devote one sentence to the opposing view and five paragraphs to your own, the concession may look perfunctory. On the other hand, an extended summary can surrender your essay’s voice. Summarize only what readers need, then spend your analytical energy on the objection’s assumptions, evidence, and implications. Return explicitly to your refined claim.
`),
      section("Sophistication without superstition", ["cb-lang-ced", "cb-lang-exam", "cb-lang-frq"], `
The sophistication point is not awarded for using a counterargument, naming a rhetorical fallacy, or writing a long conclusion. Official scoring guidance describes qualities such as a nuanced thesis, accounting for tensions or complexities, and a particularly vivid or persuasive style. These qualities must operate within the essay as a whole. A formula added at the end cannot compensate for thin evidence or inconsistent commentary.

One reliable route is to let your research change your thesis before you write. Another is to explain why a rhetorical choice succeeds with one audience while risking another response. In an argument essay, explore the conditions under which your position would no longer hold and explain why those conditions do not defeat the present case. Treat sophistication as careful thinking made visible, not as a separate ornament.
`),
    ],
    glossary: [
      { term: "Concession", definition: "Acknowledgment of a valid point, condition, or limitation associated with another perspective or one’s own claim." },
      { term: "Refutation", definition: "Reasoning and evidence demonstrating why a claim or inference is unsound." },
      { term: "Straw man", definition: "A distorted or weakened version of an opposing argument presented to make refutation easier." },
      { term: "Nuance", definition: "Precise attention to distinctions, conditions, tensions, and degrees rather than oversimplified categories." },
    ],
    examAlignment: {
      title: "Complexity inside the whole argument",
      description: "Sophistication can emerge from nuance and tension, but it is inseparable from thesis, evidence, commentary, and style.",
      criteria: [
        "Represent the strongest reasonable objection before responding to it.",
        "Use qualification to define the conditions and limits of your claim.",
        "Never assume a counterargument template automatically earns sophistication.",
      ],
      sources: ["cb-lang-ced", "cb-lang-exam", "cb-lang-frq"],
    },
    practice: [
      {
        question: "Which response is a genuine concession?",
        options: ["Opponents are wrong and uninformed.", "The inspection requirement does add short-term costs for small landlords, although those costs must be weighed against documented safety gains.", "Everyone agrees with me, but some do not.", "The counterargument is too stupid to discuss."],
        correctIndex: 1,
        explanation: "It acknowledges a real burden while maintaining a reasoned comparison of costs and benefits.",
        skill: "Develop concession",
      },
      {
        question: "Which thesis is most defensibly qualified?",
        options: ["Technology always improves learning.", "Technology never improves learning.", "When paired with timely feedback and accessible design, adaptive practice can improve retention for students who need targeted review.", "Technology is a complex topic with two sides."],
        correctIndex: 2,
        explanation: "It takes a position while identifying mechanisms, conditions, and the population for which the claim is made.",
        skill: "Qualify a thesis",
      },
      {
        question: "A counterargument strengthens an essay most when the writer",
        options: ["presents the strongest opposing point fairly, then rebuts or concedes part of it with reasoning", "lists the weakest opposing claim and mocks it briefly", "ignores disagreement so the thesis seems uncontested", "agrees with every side equally in the conclusion"],
        correctIndex: 0,
        explanation: "Fair treatment of counterargument—then rebuttal or qualified concession—is a hallmark of the Sophistication point and of mature argument generally.",
        skill: "Counterargument and rebuttal",
      },
      {
        question: "Which sentence shows nuance rather than a simple either/or position?",
        options: ["Although open-data policies can expose errors in policing, they protect communities only when paired with clear limits on personal information.", "Open-data policies are simply good and everyone should support them.", "There are two sides to open-data policies and both are mentioned here.", "Open-data policies exist in many cities in the United States."],
        correctIndex: 0,
        explanation: "Nuance holds benefit and condition together in one claim; merely naming two sides or offering facts does not create complexity.",
        skill: "Nuanced claims",
      },
    ],
  },
  {
    unitNumber: 8,
    title: "Unit 8 · Style, voice, and audience-centered choice",
    description: "Analyze and use diction, imagery, figurative language, syntax, and comparisons to shape tone, credibility, emphasis, and audience response.",
    examWeight: "Style: Reading and Writing · rhetorical analysis FRQ and MCQ",
    objectives: [
      "Move from identifying stylistic choices to explaining their rhetorical work.",
      "Analyze comparisons and figurative language without reducing them to decoration.",
      "Revise voice and sentence rhythm for a specific audience and purpose.",
    ],
    sections: [
      section("Diction carries histories and judgments", ["cb-lang-ced", "purdue-rhetoric"], `
Diction includes not only formality but the connotations, precision, and social meanings of words. “Frugal,” “cheap,” and “economical” can describe similar behavior while implying different judgments. A writer who calls protesters “a disciplined assembly” rather than “a mob” frames legitimacy before presenting any explicit argument. Record the exact words and explain their implications rather than translating them into a neutral summary and losing the choice.

Technical diction can establish expertise and precision, but it can also exclude readers who lack shared vocabulary. Inclusive writers often define a necessary term or pair it with a concrete example. Plain language is not automatically superior; a medical researcher may need precise terminology to avoid false claims. The best diction is calibrated to the audience’s knowledge and the writer’s purpose.
`),
      section("Comparing through metaphor and analogy", ["cb-lang-ced", "purdue-argument"], `
A metaphor asks readers to understand one thing through another. Calling a city budget “a diet” foregrounds reduction and discipline but may hide investments that create future capacity. An extended analogy can organize an entire argument by carrying a comparison through several stages. Analyze both what the comparison reveals and what it distorts. That double movement is especially useful for complex rhetorical analysis.

Figurative language also shapes emotional and ethical response. Describing a river as “an artery” may encourage readers to see pollution as harm to a living body. The image does not prove an environmental claim by itself, but it can make the stakes intelligible and memorable. Avoid writing “this metaphor appeals to pathos” without explaining the particular association and why it matters to the argument.
`),
      section("Syntax directs attention", ["cb-lang-ced", "purdue-style"], `
Short sentences can create urgency, finality, or clarity; long sentences can accumulate detail, mirror complexity, or sustain suspense. These are tendencies, not fixed meanings. A one-word sentence might feel dramatic in one context and awkward in another. Analyze the surrounding rhythm and the idea being emphasized. “He listed the injuries in one breathless sentence, then paused: ‘Preventable.’” The abrupt final word turns accumulated detail into judgment.

Repetition, anaphora, antithesis, and rhetorical questions also direct attention. Anaphora can unite examples under a shared principle; antithesis places contrasting ideas in parallel structures to sharpen a choice; a rhetorical question can position the audience as already knowing the answer. None guarantees persuasion. Explain how the pattern organizes the audience’s thinking and whether it clarifies or oversimplifies the issue.
`),
      section("Voice, credibility, and restraint", ["cb-lang-ced", "purdue-rhetoric"], `
Voice is the recognizable presence created by recurring choices in diction, syntax, detail, and stance. An authoritative voice may use precise evidence and calibrated claims; an intimate voice may use direct address and personal narrative; an ironic voice may create distance between literal statement and intended meaning. Credibility does not require sounding detached. It requires that the voice fit the situation and that the argument earn the confidence it projects.

Overstatement, excessive qualifiers, and constant rhetorical flourishes can all weaken voice. If every sentence is urgent, none stands out. Restraint can be rhetorically powerful: a neutral list of verified harms may be more disturbing than an emotional condemnation. When revising your own writing, choose one or two places where style can clarify stakes, then let evidence and reasoning carry the rest.
`),
      section("Writing rhetorical analysis paragraphs", ["cb-lang-ced", "cb-lang-exam", "cb-lang-frq"], `
A productive paragraph follows an analytical chain: make a claim about the writer’s strategy, cite a specific choice, explain its immediate effect, and connect that effect to audience and purpose. You might argue that a speaker’s repeated legal vocabulary reframes protest as constitutional duty. The quoted terms show the pattern; your commentary explains how it challenges an audience that associates protest with disorder. The paragraph advances an interpretation rather than cataloguing techniques.

The rhetorical-analysis thesis should make a defensible claim about how choices contribute to meaning or purpose. Evidence can come from throughout the text, but commentary must consistently connect it to that thesis. Official released samples are the best calibration for depth and specificity. Do not memorize a list of devices to hunt regardless of context. Start with what the writer is trying to change in the audience’s understanding, then ask which choices make that change possible.
`),
    ],
    glossary: [
      { term: "Connotation", definition: "The associations and evaluative meanings a word carries beyond its literal definition." },
      { term: "Anaphora", definition: "Repetition of a word or phrase at the beginning of successive clauses or sentences." },
      { term: "Antithesis", definition: "The juxtaposition of contrasting ideas, often in parallel grammatical structures." },
      { term: "Voice", definition: "The distinctive writerly presence produced by recurring language, structure, and stance." },
    ],
    examAlignment: {
      title: "From device to purpose",
      description: "Rhetorical-analysis evidence and commentary depend on explaining how choices work for a specific audience and purpose.",
      criteria: [
        "Pair every important stylistic identification with an interpretive claim.",
        "Analyze what comparisons both illuminate and conceal when complexity matters.",
        "Calibrate your own style for emphasis rather than forcing a device into every paragraph.",
      ],
      sources: ["cb-lang-ced", "cb-lang-exam", "cb-lang-frq"],
    },
    practice: [
      {
        question: "Which sentence provides rhetorical analysis rather than device identification?",
        options: ["The author uses a metaphor and imagery.", "There are three short sentences and one long sentence.", "By calling the archive ‘a public memory,’ the writer frames preservation as a shared civic responsibility rather than a hobby for specialists.", "The author has a strong tone and uses pathos."],
        correctIndex: 2,
        explanation: "It links a specific metaphor to a reframing of responsibility and explains its argumentative significance.",
        skill: "Analyze style and purpose",
      },
      {
        question: "What is the best caution when analyzing an analogy?",
        options: ["Every analogy is literally true.", "Only identify whether it is positive or negative.", "Examine whether the compared features are relevant and note what the comparison omits.", "Assume figurative language has no argumentative role."],
        correctIndex: 2,
        explanation: "Analogies clarify selected relationships while potentially hiding important differences; both effects matter.",
        skill: "Evaluate figurative reasoning",
      },
      {
        question: "In the sentence “We came, we saw, we filed the paperwork,” the humor comes primarily from",
        options: ["parallel structure whose final item deliberately breaks the expected grand pattern", "an accidental grammatical error in the last clause", "the use of Latin vocabulary throughout the sentence", "a metaphor comparing paperwork to warfare"],
        correctIndex: 0,
        explanation: "The parallel triad builds expectation of a heroic finish; the bathos of “filed the paperwork” is a purposeful stylistic choice—the kind of device-to-purpose link rhetorical analysis rewards.",
        skill: "Style: parallelism and effect",
      },
      {
        question: "A writer shifts from formal diction in a policy proposal to a brief, plain-spoken anecdote. The most plausible purpose is to",
        options: ["make the abstract policy feel concrete and human for the audience before returning to evidence", "confuse the audience so they stop reading carefully", "hide the absence of any statistics in the proposal", "prove that formal language is always ineffective"],
        correctIndex: 0,
        explanation: "Voice shifts are audience-centered choices: the anecdote gives readers a person to attach the policy to, strengthening ethos and pathos before the data resume.",
        skill: "Voice and audience",
      },
    ],
  },
  {
    unitNumber: 9,
    title: "Unit 9 · Synthesis, rebuttal, and the full AP argument",
    description: "Integrate the course’s reading and writing skills to enter a source conversation, defend a qualified position, and revise for rubric-aligned depth.",
    examWeight: "Synthesis, rhetorical analysis, and argument · 55% of exam score",
    objectives: [
      "Plan and write synthesis that uses sources to advance an independent line of reasoning.",
      "Distinguish among the three AP free-response tasks and their evidence demands.",
      "Use official rubric language to diagnose a draft without reducing writing to formulas.",
    ],
    sections: [
      section("Three tasks, three evidence relationships", ["cb-lang-ced", "cb-lang-exam", "cb-lang-frq"], `
The AP Lang free-response section gives you 2 hours 15 minutes for synthesis, rhetorical analysis, and argument, together worth 55% of the score. **Synthesis** asks you to develop a position using provided sources. **Rhetorical analysis** asks you to interpret how a writer’s choices achieve meaning and purpose. **Argument** asks you to support a position with evidence from your own knowledge, reading, observation, or experience. All require thesis and commentary, but the evidence relationship differs.

Confusing the tasks creates avoidable problems. A rhetorical-analysis essay that argues whether the author’s policy position is right leaves the assigned work. A synthesis essay that summarizes sources without developing a position does the same. An argument essay that offers only generalized assertions lacks specific support. Begin each response by writing the task in your own words and deciding what kind of evidence will count.
`),
      section("A synthesis workflow", ["cb-lang-ced", "cb-lang-frq", "purdue-research"], `
Read the synthesis prompt’s central question, background, and assignment carefully; they are not interchangeable. Then preview each source’s citation and stance. Make brief notes about useful claims, evidence, and limitations. Draft your position before allowing the source order to determine your essay. You can change that position as you read, but by the drafting stage your thesis should control which sources enter and why.

A body paragraph might use one source to establish a pattern and another to explain its cause or complication. This creates genuine synthesis because the relationship exists in your reasoning, not just in the presence of two citations. Attribute with the prompt’s source labels and represent each source accurately. You are not expected to conduct outside research or produce a formal bibliography during the exam.
`),
      section("Evidence for the open argument", ["cb-lang-ced", "cb-lang-frq"], `
Open-argument evidence can include historical events, scientific findings, literature, public affairs, or carefully bounded personal observation. Specificity matters more than prestige. A well-remembered example from a novel or local policy can outperform a vaguely recalled famous event. Never invent a statistic, quotation, or study. If you are uncertain about a detail, use the part you know accurately or select another example.

The evidence must also fit the claim’s logical type. A single example can illustrate possibility or mechanism but rarely proves a universal trend. Several varied examples may establish a pattern, while a causal claim may require explaining why the example’s outcome followed from particular conditions. Commentary is where you establish that fit. “This shows that…” is only a beginning; the next sentence should explain how.
`),
      section("Rebuttal across the whole essay", ["cb-lang-ced", "purdue-argument"], `
By this stage, counterargument should be part of your thinking rather than a mandatory paragraph. In synthesis, one provided source may challenge your position; use its strongest evidence to refine your claim or demonstrate why a different priority controls the case. In argument, anticipate the objection a knowledgeable reader would raise. In rhetorical analysis, consider how the writer anticipates audience resistance or how a choice might produce competing responses.

Rebuttal does not always mean total rejection. You can argue that an objection identifies a genuine cost but not a decisive one, or that an alternative solution addresses a different problem. These judgments require criteria: Which outcome matters most, for whom, over what time frame, and with what evidence? Making criteria explicit allows readers to follow your evaluation even if they begin with another position.
`),
      section("A rubric-based final audit", ["cb-lang-ced", "cb-lang-exam", "cb-lang-frq"], `
Use the six-point rubric diagnostically. For **thesis**, can a reader locate a defensible response to the prompt and predict your reasoning? For **evidence and commentary**, does every major claim have specific support and explanation, with at least three sources in synthesis? For **sophistication**, does the essay genuinely engage complexity, context, or especially effective style rather than performing a memorized move? These questions help you revise without pretending the rows are independent tricks.

Finally, reserve a few minutes for accuracy. Check that source labels, names, and central claims are correct; repair unclear pronouns and sentences that change your meaning. The 45-question, 60-minute multiple-choice section requires a separate rhythm of reading and revision practice, while the essays reward deliberate planning. Across the whole exam, the durable skill is the same: understand the situation, make a reasoned claim, and show your reader exactly why the evidence justifies it.
`),
    ],
    glossary: [
      { term: "Synthesis", definition: "The creation of an independent argument by placing evidence and perspectives from multiple sources into relation." },
      { term: "Open argument", definition: "An AP task requiring a defensible position supported by evidence drawn from one’s own knowledge and experience." },
      { term: "Rebuttal", definition: "A developed response to an objection or alternative perspective, often combining concession and refutation." },
      { term: "Analytic rubric", definition: "A scoring guide that evaluates thesis, evidence/commentary, and sophistication as distinct but connected dimensions." },
    ],
    examAlignment: {
      title: "Six points, three dimensions",
      description: "Each AP Lang essay is scored 0–1 for thesis, 0–4 for evidence/commentary, and 0–1 for sophistication.",
      criteria: [
        "Synthesis: support all claims with specific evidence from at least three sources and consistent commentary.",
        "Rhetorical analysis: interpret the writer’s choices rather than debating the subject.",
        "Argument: use accurate, specific evidence and explain why it proves the claim’s type and scope.",
      ],
      sources: ["cb-lang-ced", "cb-lang-exam", "cb-lang-frq"],
    },
    practice: [
      {
        question: "Which plan is strongest for a synthesis essay?",
        options: ["Summarize each source in prompt order and agree at the end.", "Use only one source repeatedly.", "Develop a thesis and line of reasoning, then bring sources into relation as support, explanation, or complication.", "Avoid taking a position to remain objective."],
        correctIndex: 2,
        explanation: "Synthesis requires an independent argument in which sources perform purposeful relationships, not a sequence of summaries.",
        skill: "Plan synthesis",
      },
      {
        question: "Which evidence strategy best fits the open argument task?",
        options: ["Cite at least three provided sources.", "Analyze only the prompt writer’s stylistic choices.", "Use accurate, specific examples from knowledge or observation and explain their relevance.", "Invent a precise statistic to sound authoritative."],
        correctIndex: 2,
        explanation: "Open argument supplies no source packet; credible specific evidence and reasoning are essential.",
        skill: "Distinguish FRQ evidence demands",
      },
      {
        question: "In a synthesis essay, the strongest use of sources is to",
        options: ["put sources in conversation with each other to support the writer's own position", "summarize each source one at a time in separate paragraphs", "quote the longest passage from the most famous source", "use only sources that agree completely with the thesis"],
        correctIndex: 0,
        explanation: "Synthesis means sources answer one another inside your argument; serial summary and one-sided selection earn fewer Evidence and Commentary points.",
        skill: "Synthesis (Row B)",
      },
      {
        question: "Which closing move most likely earns the Sophistication point (Row C)?",
        options: ["Extending the argument to a broader implication—what the decision reveals about the community's values—while keeping claims qualified", "Restating the thesis in slightly different words", "Introducing a brand-new statistic with no explanation", "Ending with “In conclusion, that is my opinion on this topic.”"],
        correctIndex: 0,
        explanation: "Row C rewards insightful extension, consistently vivid style, and nuance; the first option widens the argument's significance instead of merely repeating it.",
        skill: "Sophistication (Row C)",
      },
    ],
  },
];
