import { section } from "./build";
import type { Lesson } from "./types";

/** QUEST lessons for the current 2026–27 assessment, not the 2027–28 redesign. */
export const apSeminarLessons: Lesson[] = [
  {
    unitNumber: 1,
    title: "Big Idea 1 · Question and explore",
    description: "Turn a broad interest into a researchable problem, map its context, retrieve useful evidence, and refine a question as understanding develops.",
    examWeight: "QUEST Big Idea 1 · assessed across PT1, PT2, and the end-of-course exam",
    objectives: [
      "Distinguish a topic, problem, research question, and practical inquiry plan.",
      "Develop a focused, open, feasible question with meaningful context.",
      "Use an iterative search and annotation system to refine inquiry.",
    ],
    sections: [
      section("A topic is not yet a question", ["cb-seminar-ced", "purdue-research"], `
Inquiry begins when you identify something that needs explanation rather than merely a subject you like. “Urban trees” is a topic; “How do tree-planting programs distribute heat-related benefits across neighborhoods?” frames a problem that evidence can address. The second version identifies an intervention, an outcome, and an equity dimension. It invites investigation because the answer is not already obvious and cannot be reduced to a yes/no preference.

A strong AP Seminar question is focused enough to research within the task’s limits and rich enough to support multiple perspectives. “Are urban trees good?” is broad and evaluative without criteria. “How should a mid-sized city prioritize street-tree planting to reduce pedestrian heat exposure while protecting affordable housing?” creates a genuine decision problem. It also signals that environmental, public-health, economic, and housing perspectives may be necessary.
`),
      section("Context reveals why the question matters", ["cb-seminar-ced", "purdue-research"], `
Contextualizing an issue means locating it in time, place, institutions, and an ongoing conversation. Start with what is known, what is disputed, who is affected, and why the issue matters now. A question about student phone use might sit within changing platform design, school safety concerns, classroom research, and unequal access to devices outside school. These layers prevent an inquiry from treating a local controversy as though it appeared from nowhere.

Prior knowledge is useful when you make it visible and testable. Write down your initial assumptions and the experiences behind them. If you assume phones primarily distract students, look for evidence that could challenge that view as well as support it. This habit reduces confirmation bias and helps you distinguish personal experience from a general claim. Curiosity becomes scholarly when you are willing to revise your starting story.
`),
      section("Search is an iterative strategy", ["cb-seminar-ced", "purdue-research"], `
Begin with a concept map and a list of synonyms, stakeholders, settings, and outcome measures. For “food deserts,” related searches might include “food access,” “grocery retail,” “transportation,” “healthy food affordability,” and a named locality. A general encyclopedia or review article can orient you to vocabulary and major debates, while scholarly databases, government data, and local reporting provide more specific evidence. One perfect search phrase rarely completes the job.

Keep a research log with the query, database, date, result, and next decision. Record full citation information before you download or close a source. Your log should show refinement: perhaps the national question becomes a city comparison, or “academic performance” becomes attendance because the available evidence is stronger. This record also supports required checkpoints and makes your process easier to explain in a presentation or oral defense.
`),
      section("Feasibility and scope are design choices", ["cb-seminar-ced", "cb-capstone-policy"], `
Feasibility includes time, access, word limits, team responsibilities, and the kinds of evidence you can ethically obtain. A question requiring confidential medical records or a nationwide experiment may be important but unsuitable. Narrow by population, place, mechanism, or time period rather than making the question trivial. “How did one school’s breakfast program affect attendance over one semester?” is more researchable than “Does nutrition solve educational inequality?”

Scope also determines which perspectives you can treat responsibly. A local study cannot establish a universal solution, but it can reveal mechanisms or conditions that matter elsewhere. Make the boundaries explicit. For team research, distinguish the shared problem from each member’s individual lens so reports complement rather than duplicate one another. Follow your teacher’s checkpoints and current AP Capstone policies; those requirements govern what assistance and tools are permitted.
`),
      section("Connecting inquiry to assessed work", ["cb-seminar-exam", "cb-seminar-frq"], `
In Performance Task 1, the team’s shared question must support individual research reports and a collective argument or solution. In Performance Task 2, your individual written argument grows from stimulus materials but should not be controlled by them. The end-of-course evidence-based argument similarly requires you to enter a supplied conversation with your own position. Across tasks, question quality shapes the quality of every later decision.

For the current 2026–27 assessment, PT1 is 20%, PT2 is 35%, and the two-hour end-of-course exam is 45%. Performance tasks are due April 30, 2027 at 11:59 p.m. ET. The announced AP Seminar redesign begins in 2027–28 and should not be mixed into this year’s plan. Use the current task directions and scoring guidelines as your authority, and treat this lesson as preparation rather than a substitute for them.
`),
    ],
    glossary: [
      { term: "Research question", definition: "A focused, open question that guides systematic inquiry and can be addressed through evidence." },
      { term: "Contextualization", definition: "Locating an issue within relevant circumstances, stakeholders, conversations, and conditions." },
      { term: "Feasibility", definition: "The practicality of completing an inquiry within ethical, evidentiary, time, and task constraints." },
      { term: "Research log", definition: "A dated record of searches, sources, decisions, and revisions throughout an inquiry." },
    ],
    examAlignment: {
      title: "Inquiry that can survive the full task",
      description: "The official rubrics reward a clear focus, contextual understanding, purposeful evidence, and a coherent argument built from the initial question.",
      criteria: [
        "Write a question that requires analysis rather than a definition or obvious yes/no answer.",
        "Document how search results changed your scope or assumptions.",
        "Check the current task directions before applying any advice about word counts, components, or tools.",
      ],
      sources: ["cb-seminar-ced", "cb-seminar-exam", "cb-capstone-policy"],
    },
    practice: [
      {
        question: "Which is the strongest AP Seminar research question?",
        options: ["What is recycling?", "Is technology bad?", "How could one city’s transit redesign improve access to health care for residents without cars?", "Why is everything unequal everywhere?"],
        correctIndex: 2,
        explanation: "It identifies a setting, intervention, population, and outcome while remaining open to evidence and multiple solutions.",
        skill: "Develop an inquiry question",
      },
      {
        question: "What is the best response when early evidence shows your original question is too broad?",
        options: ["Keep it unchanged to prove commitment.", "Narrow a population, setting, mechanism, or time frame and record why.", "Delete all contrary sources.", "Turn it into a yes/no question."],
        correctIndex: 1,
        explanation: "Deliberate, documented narrowing is a normal part of recursive inquiry and preserves a meaningful research problem.",
        skill: "Refine inquiry",
      },
      {
        question: "Which research question is best suited for an AP Seminar investigation?",
        options: ["How do after-school jobs affect the sleep and grades of students at suburban high schools?", "What are all the causes of poverty throughout human history?", "Is social media good or bad for society?", "Why do people like music?"],
        correctIndex: 0,
        explanation: "A viable question is specific in population and variables, debatable, and researchable in the available time; the others are too vast or purely matters of taste.",
        skill: "Question formulation (Big Idea 1)",
      },
      {
        question: "A student begins with the broad topic of “water scarcity.” The most productive next step is to",
        options: ["narrow by place, population, and lens—for example, how one city's pricing policy affects low-income households", "read one encyclopedia article and write the final paper", "choose the conclusion first, then find sources that agree", "outline the presentation slides before doing research"],
        correctIndex: 0,
        explanation: "Question and Explore rewards iterative narrowing through contexts and lenses; starting from a conclusion or skipping inquiry undermines the whole performance task.",
        skill: "Question formulation (Big Idea 1)",
      },
    ],
  },
  {
    unitNumber: 2,
    title: "Big Idea 2 · Understand and analyze arguments",
    description: "Reconstruct an author’s line of reasoning, evaluate evidence in context, and distinguish accurate comprehension from evaluation or agreement.",
    examWeight: "QUEST Big Idea 2 · 30% of the end-of-course exam component is argument analysis",
    objectives: [
      "Identify a text’s main claim, supporting claims, evidence, and warrants.",
      "Evaluate the relevance and credibility of evidence without dismissing perspective automatically.",
      "Explain how conclusions, solutions, and limitations follow from reasoning.",
    ],
    sections: [
      section("Comprehend before you critique", ["cb-seminar-ced", "purdue-argument"], `
Careful analysis begins with an account the author would recognize. Identify the issue, main claim, intended audience, and purpose before deciding whether you agree. Then outline the supporting claims in order. If your summary changes a qualified “may improve” into “proves,” your evaluation will attack a position the author did not take. Accurate comprehension is therefore an ethical practice as well as an assessed skill.

Separate what the text says from what you infer. An author may report rising absenteeism and argue for later start times; your inference might be that transportation schedules will also need adjustment. That inference could be valuable, but label it as your own reasoning. In an argument-analysis response, this distinction prevents you from presenting your reaction as the author’s explicit claim.
`),
      section("Map the line of reasoning", ["cb-seminar-ced", "purdue-argument"], `
A line of reasoning connects claims so that each supports the next or contributes to the main conclusion. Draw arrows between claims and attach evidence beneath the claim it supports. Then write the **warrant**: the often unstated principle that makes the evidence relevant. If a writer uses one neighborhood’s tree loss to argue for citywide investment, a warrant might be that the neighborhood represents conditions found elsewhere.

This mapping exposes hidden assumptions and missing steps. The evidence may show a local pattern but not representativeness. Or the writer may demonstrate that a problem exists without proving the proposed solution will work. These are different gaps requiring different responses. Analysis becomes much sharper when you can name exactly where the reasoning succeeds or fails rather than calling the whole article “convincing” or “weak.”
`),
      section("Evidence has a context and a job", ["cb-seminar-ced", "purdue-research"], `
Evaluate evidence according to its role. A historical example may establish precedent; a statistic may estimate prevalence; an expert quotation may interpret mechanism; a personal narrative may illuminate experience. None performs every job. Ask whether the evidence is relevant, credible, sufficient, and interpreted accurately. A large sample does not rescue an irrelevant measure, and a moving anecdote does not establish frequency.

Credibility involves expertise, method, transparency, and context. An environmental scientist may be well qualified to explain heat absorption but not automatically qualified to predict housing politics. A government dataset may be reliable for reported incidents while excluding unreported ones. Describe these boundaries precisely. “The source is biased” is too general to guide judgment; “the survey excludes residents without internet access” identifies who may disappear from the conclusion.
`),
      section("Conclusions, solutions, and implications", ["cb-seminar-ced", "purdue-argument"], `
An argument’s conclusion should follow from its premises with an appropriate level of certainty. Solutions add another layer: even if the problem and cause are established, a proposed remedy must address that cause, be feasible, and account for side effects. A writer may persuasively show that heat is dangerous but offer only a vague call for “awareness.” The gap is not awareness itself; it is the missing mechanism from awareness to reduced exposure.

Implications are consequences that follow if the argument is accepted. They can concern policy, future research, resource allocation, or how a concept should be understood. Limitations identify boundaries in evidence or application. Strong writers acknowledge both without undermining their entire argument. When analyzing, distinguish a limitation the author recognizes from one you supply, and explain why it matters to the conclusion’s scope.
`),
      section("End-of-course Part A strategy", ["cb-seminar-exam", "cb-seminar-frq"], `
The current end-of-course exam allocates a suggested 30 minutes to three short-answer questions about understanding and analyzing an argument. Read the questions before the passage so you know what to mark. Track the main claim, reasoning sequence, and evidence functions as you read. Respond to each verb directly: **identify** requires a precise answer, **explain** requires a relationship, and **evaluate** requires a supported judgment.

Use evidence from the passage in your explanation, but do not substitute long quotation for analysis. If asked about evidence effectiveness, name the claim it supports and assess the connection. Practice with released questions and scoring guidelines because short responses can still require several linked ideas. The three short answers represent 30% of the end-of-course component; the remaining 70% is the evidence-based argument essay, so save the suggested 90 minutes for that task.
`),
    ],
    glossary: [
      { term: "Warrant", definition: "The stated or unstated principle explaining why evidence supports a claim." },
      { term: "Premise", definition: "A claim or piece of evidence offered as a reason to accept a conclusion." },
      { term: "Implication", definition: "A consequence or further conclusion that follows from an argument." },
      { term: "Limitation", definition: "A boundary in evidence, method, scope, or applicability that restricts a conclusion." },
    ],
    examAlignment: {
      title: "Argument analysis in three short answers",
      description: "The first end-of-course task rewards accurate comprehension, explanation of reasoning, and supported evaluation.",
      criteria: [
        "State the author’s claim with its actual qualifiers before evaluating it.",
        "Connect every evidence judgment to the specific claim that evidence must support.",
        "Answer the command verb directly and budget time for the longer second task.",
      ],
      sources: ["cb-seminar-ced", "cb-seminar-exam", "cb-seminar-frq"],
    },
    practice: [
      {
        question: "An author uses one school’s attendance increase to recommend a national policy. Which warrant needs examination?",
        options: ["Attendance is measured in days.", "The school’s conditions and outcome are sufficiently comparable to other settings.", "The author used complete sentences.", "National policies are always popular."],
        correctIndex: 1,
        explanation: "Generalizing from one case requires a reason to believe the case and mechanism apply beyond it.",
        skill: "Analyze warrants",
      },
      {
        question: "Which is the strongest evaluation of a statistic?",
        options: ["It is a number, so it is objective.", "It is from a biased source, so ignore it.", "It measures reported incidents but excludes unreported cases, limiting the conclusion’s scope.", "It appears in a long article, so it is sufficient."],
        correctIndex: 2,
        explanation: "The response identifies what the measure captures and how that boundary affects inference.",
        skill: "Evaluate evidence in context",
      },
      {
        question: "In Part A of the End-of-Course Exam, an author claims school uniforms improve discipline, citing one principal's opinion. The strongest critique is that",
        options: ["a single authority's opinion is weak evidence for a causal claim affecting many schools", "the author should have used more adjectives in the argument", "uniforms are unpopular with most students surveyed online", "the claim is written at too high a reading level"],
        correctIndex: 0,
        explanation: "Understand and Analyze Arguments asks students to identify the main idea, explain the line of reasoning, and evaluate the evidence's effectiveness—here, anecdotal authority cannot carry a broad causal claim.",
        skill: "Argument evaluation (Big Idea 2)",
      },
      {
        question: "An author's line of reasoning is most clearly revealed by examining",
        options: ["how each reason and piece of evidence connects back to the main claim", "the number of paragraphs in the essay", "whether the author uses first-person pronouns", "the publication date printed on the first page"],
        correctIndex: 0,
        explanation: "Line of reasoning is the chain from reasons and evidence to claim; surface features like length or pronouns do not show whether the argument holds together.",
        skill: "Line of reasoning (Big Idea 2)",
      },
    ],
  },
  {
    unitNumber: 3,
    title: "Big Idea 3 · Evaluate multiple perspectives",
    description: "Compare lenses and arguments fairly, identify assumptions and objections, and use disagreement to reveal an issue’s complexity.",
    examWeight: "QUEST Big Idea 3 · essential to IRR, IWA, TMP, and evidence-based argument",
    objectives: [
      "Distinguish perspectives, positions, lenses, and stakeholder interests.",
      "Compare arguments through shared criteria and evidence.",
      "Evaluate objections, implications, and limitations from more than one viewpoint.",
    ],
    sections: [
      section("Perspectives are more than pro and con", ["cb-seminar-ced", "purdue-research"], `
A perspective is a way of seeing shaped by discipline, experience, role, values, culture, or method. A public-health researcher, landlord, tenant organizer, and climate scientist may all discuss the same housing policy while attending to different outcomes. Their positions may overlap even when their perspectives differ. Organizing research only into “agree” and “disagree” hides these deeper relationships.

A **lens** is an analytical approach you deliberately apply, such as economic, ethical, historical, environmental, or cultural analysis. Lenses are not stickers to place in a report title. If you choose an economic lens, ask about costs, incentives, distribution, and tradeoffs; then show how those factors change understanding of the problem. A cultural lens requires attention to meanings, practices, identity, and power rather than a vague paragraph about “society.”
`),
      section("Stakeholders and situated knowledge", ["cb-seminar-ced", "purdue-research"], `
Stakeholders are people or groups affected by an issue or able to influence it. Their knowledge may come from professional expertise, lived experience, administrative records, or community memory. Treat lived experience as evidence of experience and impact, not automatically as a representative estimate. Treat professional expertise as bounded by field and method. A fair evaluation asks what each position enables someone to notice.

Power affects which perspectives are documented and heard. If a digital divide report contains only survey responses collected online, people with the least connectivity may be underrepresented. Silence in a dataset is not necessarily absence of an opinion. Researchers can address this by seeking alternative collection methods or acknowledging the limitation. Multiple-perspective work is therefore partly about evidence architecture, not just finding one quotation from each side.
`),
      section("Compare through shared criteria", ["cb-seminar-ced", "purdue-argument"], `
To compare arguments fairly, decide which criteria matter: accuracy of evidence, strength of warrants, feasibility, ethical consequences, scope, or treatment of uncertainty. Apply the same criteria to each. You might find that a proposal has strong short-term evidence but weak long-term funding, while an alternative is slower but more durable. This comparison is more useful than declaring one author “more credible” overall.

A comparison table can help, but the synthesis comes from interpreting the pattern. If two authors use different definitions of “access,” their numerical conclusions may not be directly comparable. If they agree on a problem but prioritize different values, explain that conflict explicitly. Your goal is not forced balance. Evidence may justify favoring one perspective after you have represented and tested the others fairly.
`),
      section("Objections, implications, and blind spots", ["cb-seminar-ced", "purdue-argument"], `
An objection challenges a claim, warrant, method, or implication. Strong objections engage the actual argument rather than its weakest caricature. For example, a city may propose congestion pricing to reduce traffic. An equity objection gains force when it identifies who pays, what exemptions exist, and whether transit alternatives are usable. A response can then modify the policy through exemptions or reinvestment instead of merely asserting that sustainability matters.

Every perspective has limitations because attention is selective. An economic model may simplify behavior; a case study may sacrifice breadth for depth; a community account may not capture institutional constraints. Identifying a limitation does not require rejecting the perspective. It helps you decide where the conclusion applies and what additional evidence would strengthen it. This practice also creates opportunities for a more original and defensible solution.
`),
      section("Using perspectives in assessed arguments", ["cb-seminar-exam", "cb-seminar-frq"], `
In the individual research report, multiple perspectives should help explain the team problem and its complexity, not appear as disconnected source summaries. In the individual written argument, use stimulus sources and outside research to develop your position while addressing alternative views. In the team presentation, members’ lenses should converge on a coherent argument or solution rather than sounding like separate mini-reports.

On the end-of-course essay, you must create an evidence-based argument from supplied materials. Read for perspectives and relationships before choosing your position. A source may support your premise while challenging your proposed solution; using both roles demonstrates control. Current scoring guidelines and samples show that sophisticated work is not simple agreement with every source. It is accurate selection, explanation, and evaluation in service of your own reasoned conclusion.
`),
    ],
    glossary: [
      { term: "Perspective", definition: "A vantage point shaped by role, experience, discipline, values, culture, or method." },
      { term: "Lens", definition: "A deliberate analytical framework used to identify particular features and relationships in an issue." },
      { term: "Stakeholder", definition: "A person or group affected by an issue or positioned to influence its outcome." },
      { term: "Objection", definition: "A reasoned challenge to a claim, warrant, method, conclusion, or implication." },
    ],
    examAlignment: {
      title: "Complexity through genuine comparison",
      description: "AP Seminar rubrics repeatedly reward the interpretation and evaluation of perspectives rather than source accumulation.",
      criteria: [
        "Explain what each perspective reveals and what its method or position leaves out.",
        "Compare arguments with consistent criteria rather than alternating unsupported summaries.",
        "Let alternative perspectives modify or sharpen the final argument where evidence requires it.",
      ],
      sources: ["cb-seminar-ced", "cb-seminar-frq", "cb-seminar-exam"],
    },
    practice: [
      {
        question: "Which example best demonstrates two perspectives sharing a position?",
        options: ["Both authors support the policy, one emphasizing public health and the other emphasizing municipal costs.", "One author supports it and one opposes it.", "Both authors use the same word.", "One source is longer than the other."],
        correctIndex: 0,
        explanation: "Their positions align, but their priorities and ways of evaluating the policy differ.",
        skill: "Distinguish perspective and position",
      },
      {
        question: "What is the strongest way to handle an objection?",
        options: ["Misstate it so it is easy to defeat.", "Ignore it if your thesis is already written.", "Represent it accurately, evaluate its evidence and assumptions, and revise or respond as needed.", "Mention it without connecting it to your argument."],
        correctIndex: 2,
        explanation: "Fair representation and substantive response make the final argument more credible and often more precise.",
        skill: "Evaluate objections",
      },
      {
        question: "Two sources agree that a city's bike-share program cut car trips but disagree about whether it helped low-income riders. A strong response would",
        options: ["present both perspectives, examine the evidence and context behind each, and weigh their relative credibility", "quote only the source that matches the student's own opinion", "average the two conclusions into a single vague statement", "declare the question impossible and end the analysis"],
        correctIndex: 0,
        explanation: "Evaluate Multiple Perspectives requires fair representation plus judgment—comparing evidence, assumptions, and implications rather than stacking quotes.",
        skill: "Multiple perspectives (Big Idea 3)",
      },
      {
        question: "A perspective's limitations are best identified by asking",
        options: ["what the source's context, assumptions, and evidence leave out or cannot show", "whether the author is famous enough to trust completely", "how long the source is compared with other sources", "whether the conclusion sounds confident in tone"],
        correctIndex: 0,
        explanation: "Every lens has bounds; naming what a source cannot establish—missing populations, dated data, assumed causation—is central to Seminar's evaluation skill.",
        skill: "Evaluating limitations (Big Idea 3)",
      },
    ],
  },
  {
    unitNumber: 4,
    title: "Big Idea 4 · Synthesize ideas into an argument",
    description: "Move from source collection to an original, evidence-based argument with linked claims, ethical attribution, and a feasible conclusion or solution.",
    examWeight: "QUEST Big Idea 4 · central to IWA and evidence-based argument essay",
    objectives: [
      "Build an original line of reasoning that synthesizes rather than summarizes sources.",
      "Link evidence to claims through explicit warrants and commentary.",
      "Attribute ideas accurately and develop conclusions or solutions consistent with the evidence.",
    ],
    sections: [
      section("Synthesis changes the shape of the material", ["cb-seminar-ced", "purdue-research"], `
A summary preserves the organization of an existing text; synthesis reorganizes evidence around your own question and claims. You may combine a national dataset with a local case study to show both scale and mechanism, or place two studies in tension to identify a condition that explains their different outcomes. The resulting idea belongs to your argument even though its components are borrowed and cited.

Start with a claim map rather than a source map. Write your main conclusion, the supporting claims needed to establish it, and the evidence that can test each one. Then identify gaps. This approach prevents the common structure in which each paragraph explains one article and the conclusion abruptly announces your opinion. Sources should enter because your reasoning calls for them, not because they appeared next in your notes.
`),
      section("From evidence to warrant to claim", ["cb-seminar-ced", "purdue-argument"], `
For each major claim, articulate the reasoning that makes the evidence relevant. Suppose a district reports that breakfast participation rose after meals moved into classrooms. To claim the change reduced a barrier, you need to explain why location affected access and consider alternative explanations such as menu changes or a simultaneous awareness campaign. The warrant connects the observed pattern to your interpretation.

When evidence is mixed, narrow or complicate the claim rather than hiding the discrepancy. “The program increased participation overall, but the smallest gains occurred among students with early bus arrivals” identifies a remaining implementation problem. That statement can support a more targeted solution. Strong synthesis does not force every source into agreement; it explains the pattern of agreement and disagreement.
`),
      section("Solutions require a causal theory", ["cb-seminar-ced", "purdue-argument"], `
A proposed solution should specify who acts, what changes, through which mechanism, and with what expected outcome. “Schools should address stress” names a value but not a solution. “The counseling department should offer confidential drop-in appointments during lunch, reducing scheduling and stigma barriers for students who avoid the main office” supplies actors, action, mechanism, and intended beneficiaries.

Evaluate feasibility and unintended consequences using the same care as the problem analysis. Consider cost, staffing, time, incentives, accessibility, and effects on people not directly targeted. A solution need not be perfect, but its limitations should be acknowledged and, where possible, mitigated. The best proposal follows from the causes your evidence established rather than importing a fashionable intervention unrelated to the diagnosis.
`),
      section("Attribution and academic integrity", ["cb-seminar-ced", "cb-capstone-policy", "purdue-research"], `
Cite ideas, data, images, and distinctive language according to the required style, whether you quote or paraphrase. Keep source-linked notes so you can distinguish another author’s wording from your own commentary. A paraphrase must genuinely re-express the idea without changing its meaning, and a citation does not excuse a patchwork of substituted synonyms. Bibliography entries cannot compensate for missing in-text attribution.

AP Capstone also has rules about authenticity, required checkpoints, collaboration, falsification, fabrication, and tool use. Do not invent data or present another person’s work as your own. If using any permitted tool for brainstorming or feedback, follow the current policy and teacher directions and preserve your responsibility for verification and authorship. Policies can change, so consult the current official documents rather than relying on a general statement about AI.
`),
      section("The IWA and evidence-based essay", ["cb-seminar-exam", "cb-seminar-frq"], `
Performance Task 2 currently includes a 2,000-word individual written argument, a 6–8-minute individual multimedia presentation, and two oral-defense questions. The IWA represents 70% of PT2’s 35% weight. Its stimulus materials are starting points for inquiry, not an outline you must reproduce. Your argument needs a clear focus, relevant evidence from the stimulus and additional research, commentary, and accurate attribution.

The end-of-course evidence-based argument has a suggested 90 minutes and represents 70% of the exam component. Use the supplied sources selectively to support your own thesis, address complexity, and explain your reasoning. Review official scoring guidelines rather than assuming the IWA and exam essay are identical documents. They share synthesis skills but differ in research time, materials, length, and task conditions.
`),
    ],
    glossary: [
      { term: "Synthesis", definition: "The integration of evidence and perspectives into a new argument organized around the writer’s own reasoning." },
      { term: "Causal theory", definition: "An explanation of how a proposed action is expected to produce a particular outcome." },
      { term: "Attribution", definition: "Clear identification of the origin of ideas, language, data, or other creative work." },
      { term: "Fabrication", definition: "Inventing data, evidence, sources, or results and presenting them as genuine." },
    ],
    examAlignment: {
      title: "Original argument with ethical evidence",
      description: "High-quality synthesis maintains your line of reasoning while accurately integrating and citing source material.",
      criteria: [
        "Organize paragraphs around supporting claims, not around individual sources.",
        "Explain the mechanism linking a proposed solution to the diagnosed cause.",
        "Follow current AP Capstone integrity rules and attribute every borrowed idea or wording.",
      ],
      sources: ["cb-seminar-ced", "cb-seminar-exam", "cb-capstone-policy"],
    },
    practice: [
      {
        question: "Which paragraph plan shows synthesis?",
        options: ["One paragraph summarizing each article in alphabetical order.", "A claim about a cause supported by a survey and a case study, followed by commentary explaining how they complement each other.", "A list of quotations without a thesis.", "A paragraph that changes the source’s conclusion to fit your opinion."],
        correctIndex: 1,
        explanation: "The sources serve an original claim and their relationship is explained rather than left implicit.",
        skill: "Synthesize evidence",
      },
      {
        question: "Which proposal is most actionable?",
        options: ["The city should care more about heat.", "Someone should solve the problem soon.", "The parks department should prioritize shaded waiting areas at the ten highest-exposure bus stops and evaluate temperature and use after installation.", "Trees are good for everyone."],
        correctIndex: 2,
        explanation: "It identifies an actor, targeted action, mechanism, and way to evaluate outcomes.",
        skill: "Develop an evidence-based solution",
      },
      {
        question: "In the Individual Research-Based Essay and Presentation, synthesis is demonstrated when the student",
        options: ["combines insights from multiple sources and perspectives into a new, supported conclusion of their own", "summarizes each source in its own paragraph without connecting them", "copies the strongest source's argument with new examples", "lists citations at the end without using them in the text"],
        correctIndex: 0,
        explanation: "Synthesize Ideas means the conclusion could not come from any single source; it emerges from putting sources into conversation under the student's own claim.",
        skill: "Synthesis (Big Idea 4)",
      },
      {
        question: "Which thesis for a team multimedia presentation shows an arguable, evidence-ready position?",
        options: ["Because it cuts emergency response times and costs less per resident, the county should replace two fire stations with three smaller, strategically placed stations.", "Fire stations are an interesting part of local government.", "This presentation will explore fire stations from many angles.", "Some people like fire stations and others do not."],
        correctIndex: 0,
        explanation: "An effective Seminar thesis is debatable, specific, and previewed by its reasons—ready to be supported with credible evidence and qualified where needed.",
        skill: "Argument construction (Big Idea 4)",
      },
    ],
  },
  {
    unitNumber: 5,
    title: "Big Idea 5 · Team, transform, and transmit",
    description: "Collaborate with individual accountability, adapt an argument for audience and medium, design purposeful visuals, and defend decisions through reflection.",
    examWeight: "QUEST Big Idea 5 · TMP, IMP, and oral-defense components",
    objectives: [
      "Plan equitable team work with documented roles and shared decision points.",
      "Transform a written argument into an audience-centered oral and multimedia presentation.",
      "Use reflection and oral defense to explain choices, limitations, and revisions.",
    ],
    sections: [
      section("Teams need process, not just tasks", ["cb-seminar-ced", "cb-capstone-policy"], `
Effective collaboration begins with a shared question, common criteria for evidence, and explicit decision points. Dividing the work into isolated sections can produce duplication and contradiction. Instead, agree on the problem definition, assign complementary lenses, and schedule meetings where each member’s findings can alter the group’s emerging argument. A team charter can record expectations for deadlines, communication, file naming, and conflict resolution.

Individual accountability matters within collective work. Keep a contribution log and make authorship boundaries clear, especially for the individual research report. The team multimedia presentation receives a group score under the current PT1 structure, but your teacher must be able to affirm required processes and your own participation. If one member falls behind, respond early through redistribution and support rather than quietly allowing one person to write everything.
`),
      section("Convergence creates a team argument", ["cb-seminar-ced", "cb-seminar-frq"], `
A team presentation should not sound like several reports placed back to back. After individual research, identify the shared conclusion and the claims each member can best support. One person may establish scale, another mechanism, another stakeholder impacts, and another feasibility. Repetition should be deliberate, such as returning to a shared criterion, rather than accidental restatement of background.

Disagreement can improve the final argument if the team evaluates it openly. Test competing interpretations against evidence and record why the group selected one. If the issue remains genuinely unresolved, the presentation can propose conditional recommendations or further inquiry. A coherent team argument does not require forced unanimity; it requires a transparent relationship among claims, evidence, and conclusions.
`),
      section("Transform rather than read the paper", ["cb-seminar-ced", "cb-seminar-frq"], `
Oral communication changes how audiences process information. Listeners cannot easily reread a dense sentence, so presentations need clear signposting, manageable claims, and purposeful repetition. Transform the paper by selecting the reasoning essential to the conclusion, not by deleting every other sentence. Open with the problem and stakes, preview the direction, and make transitions audible: “The first study established access; the next explains why cost still prevents use.”

Audience and context shape tone, pace, and content. A specialist panel may want more methodological detail; a community audience may need local implications and fewer technical terms. Oral defense also requires knowing the full argument, including choices that do not appear on slides. Practice explaining why you selected sources, rejected alternatives, and limited your conclusion without reading a script.
`),
      section("Media should carry evidence", ["cb-seminar-ced", "cb-seminar-frq"], `
A slide is effective when it helps the audience see a relationship, remember a claim, or inspect evidence. A graph may reveal a trend better than a paragraph; a map may expose distribution; a simple diagram may explain your solution’s mechanism. Dense paragraphs copied onto slides divide attention between reading and listening. Use readable type, concise labels, and a clear verbal explanation of every important visual.

Charts require ethical design. Label axes and units, show the relevant scale, identify the source, and avoid truncating an axis in a way that exaggerates an effect. Decorative images should not displace evidence or introduce stereotypes. Accessibility matters too: describe visual content, maintain contrast, and avoid relying on color alone. Design is part of argument because it determines what the audience can perceive and verify.
`),
      section("Current presentation and defense requirements", ["cb-seminar-exam", "cb-capstone-policy", "cb-seminar-frq"], `
For 2026–27, PT1’s team multimedia presentation lasts 8–10 minutes plus defense questions and represents half of PT1’s 20% weight. PT2’s individual multimedia presentation lasts 6–8 minutes and represents 20% of PT2’s 35%; its separate oral defense uses two teacher questions and represents 10% of PT2. Teachers score these components under the current rules. Do not substitute the presentation weights announced for the 2027–28 redesign.

Prepare for defense by maintaining a decision journal: why this question, why these sources, why this method or solution, what changed, and what remains uncertain. Responses should be specific and honest rather than improvised praise for your own work. If you do not know an answer, explain how you would find out. Reflection demonstrates ownership when it identifies real choices and limitations rather than reciting the rubric.
`),
    ],
    glossary: [
      { term: "Team charter", definition: "A shared agreement about goals, roles, communication, deadlines, and conflict resolution." },
      { term: "Signposting", definition: "Verbal cues that help listeners understand a presentation’s structure and transitions." },
      { term: "Transformation", definition: "Adapting an argument’s form, organization, language, and media for a new audience or context." },
      { term: "Oral defense", definition: "Responses to questions that explain and justify research, argument, and presentation decisions." },
    ],
    examAlignment: {
      title: "Presentation, collaboration, and ownership",
      description: "Teacher-scored presentation and defense components assess both communication and the thinking behind the submitted argument.",
      criteria: [
        "Make each team member’s work advance a shared conclusion rather than duplicate background.",
        "Use visuals that clarify evidence and make the same argument as the spoken presentation.",
        "Prepare to explain source selection, revision, limitations, and individual contributions specifically.",
      ],
      sources: ["cb-seminar-exam", "cb-seminar-frq", "cb-capstone-policy"],
    },
    practice: [
      {
        question: "Which team structure is most likely to produce a coherent presentation?",
        options: ["Each member writes an unrelated report and reads it aloud.", "Members research complementary lenses, then reorganize findings around shared claims and a common conclusion.", "One member completes all work without telling the teacher.", "The team avoids discussing disagreement."],
        correctIndex: 1,
        explanation: "Complementary inquiry plus collective synthesis preserves individual contribution while creating one argument.",
        skill: "Collaborate and synthesize",
      },
      {
        question: "Which slide best supports an oral argument?",
        options: ["The full paper pasted in small type", "An unlabeled decorative image", "A labeled graph with source and units, explained verbally for its relevance to the claim", "A slide whose message contradicts the speaker"],
        correctIndex: 2,
        explanation: "The visual makes evidence inspectable while the speaker supplies its argumentative meaning.",
        skill: "Design audience-centered media",
      },
      {
        question: "During the Team Multimedia Presentation, each member's strongest contribution is to",
        options: ["own a defined part of the argument while connecting it explicitly to teammates' sections", "repeat the same introduction in four different voices", "read slides word for word so nothing is missed", "answer every audience question personally, even about others' research"],
        correctIndex: 0,
        explanation: "Team, Transform, and Media rewards an integrated argument with individual ownership; oral defense questions then probe each member's own choices and evidence.",
        skill: "Team presentation (Big Idea 5)",
      },
      {
        question: "In the oral defense, a student asked why a key source might be challenged should respond by",
        options: ["acknowledging the source's limitation and explaining how other evidence or qualification addresses it", "insisting the source is perfect because it was peer reviewed", "saying the team did not really use that source", "changing the subject to the presentation's visual design"],
        correctIndex: 0,
        explanation: "Defense responses earn credit for reflective, accurate discussion of choices—limitations included—not for pretending the research was flawless.",
        skill: "Oral defense (Big Idea 5)",
      },
    ],
  },
];
