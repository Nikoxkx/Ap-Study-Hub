import { section } from "./build";
import type { Lesson } from "./types";

/** AP Research lessons for the 4,000–5,000-word paper and 15–20-minute POD. */
export const apResearchLessons: Lesson[] = [
  {
    unitNumber: 1,
    title: "Big Idea 1 · Question, explore, and design a feasible study",
    description: "Develop an original research question, identify a meaningful gap, choose a practical scope, and build an ethical inquiry plan.",
    examWeight: "QUEST Big Idea 1 · foundation for the academic paper (75%) and defense (25%)",
    objectives: [
      "Move from a topic and preliminary assumptions to a focused, researchable question.",
      "Explain the gap or need a proposed study addresses without overstating originality.",
      "Evaluate feasibility, ethics, and alignment among question, evidence, and method.",
    ],
    sections: [
      section("Original inquiry begins with a need to know", ["cb-research-ced", "purdue-methods"], `
AP Research asks you to investigate a question or problem and produce a defensible argument through a method of your own design. “Social media” is a topic; “How does the timing of short-video use relate to sleep onset among students at one high school?” is a possible research question. The latter identifies variables, a population, and a measurable outcome, though it would still need ethical review and a realistic data plan.

Originality does not require discovering something no human has considered. You might apply an established framework to a new setting, compare groups that previous work did not compare, or analyze an existing dataset with a new question. The contribution should be specific and proportionate. “No research exists on this” is usually impossible to prove; “recent studies in this literature have focused on university samples, leaving the local secondary-school context less examined” is more defensible.
`),
      section("Preliminary reading changes the question", ["cb-research-ced", "purdue-research"], `
Begin with broad, reliable reading to learn vocabulary, major debates, common methods, and influential authors. A review article can map a field, while primary studies reveal how evidence was actually produced. Record search strings, databases, inclusion choices, and citation details. This is not yet the full literature review; it is reconnaissance that helps you avoid designing a study around an answered or incoherent question.

Let the reading expose assumptions. If you expect a particular app to reduce attention, ask how researchers define and measure attention, whether effects differ by task, and what alternative explanations they address. Your question may shift from “Does the app harm concentration?” to “How does notification frequency affect accuracy on a ten-minute proofreading task?” The revised question is narrower, more measurable, and less likely to presuppose the result.
`),
      section("A gap must lead to a method", ["cb-research-ced", "purdue-methods"], `
A research gap can concern population, setting, comparison, method, timeframe, or an unresolved relationship among findings. A gap is not merely a topic you personally have not read about. Show how prior work establishes what is known and where uncertainty remains, then explain why your proposed evidence would reduce that uncertainty. The gap should make the study’s purpose intelligible without promising to settle an entire field.

Alignment is the crucial test. If your question asks why participants describe an experience differently, open interviews may be more suitable than a satisfaction score. If it asks whether one condition improves performance, a controlled comparison may be appropriate. If it asks how a policy changed over time, document analysis or longitudinal data may fit. No method is inherently superior; its value depends on the question and the claim you hope to support.
`),
      section("Feasibility and ethics are part of quality", ["cb-research-ced", "cb-capstone-policy", "purdue-methods"], `
A feasible study fits your time, access, skills, equipment, and word limit. Pilot your instrument early. A forty-minute survey distributed to “everyone” may produce fewer useful data than a short, focused instrument with a defined sampling plan. Build time for recruitment failures, missing data, transcription, analysis, and revision. A smaller well-executed study is more credible than an ambitious design abandoned midway.

Research involving people requires informed consent, privacy protection, risk minimization, and any review required by your school or institution. Minors and sensitive topics need particular care. Do not collect identifiers you do not need, and do not promise confidentiality you cannot preserve. Deception, covert recording, and scraping restricted communities raise additional issues. Follow current AP Capstone policies and your teacher’s approval process before collecting data.
`),
      section("Writing the inquiry plan into the paper", ["cb-research-exam", "cb-research-samples"], `
By the final paper, readers should understand the research question, why it matters, what previous work established, and how your chosen method addresses it. The current academic paper is 4,000–5,000 words and represents 75% of the AP Research score. Planning for that length means reserving space for method, results or product, analysis, limitations, and implications rather than allowing background reading to consume the whole argument.

Keep a decision journal from the beginning: question versions, rejected methods, ethics decisions, instrument changes, and analytical choices. These notes support both the paper’s reflective reasoning and the presentation and oral defense, which together last approximately 15–20 minutes and represent 25%. The final performance tasks are due April 30, 2027 at 11:59 p.m. ET; your teacher’s earlier checkpoints will require an earlier working schedule.
`),
    ],
    glossary: [
      { term: "Research gap", definition: "A specific unresolved need in existing knowledge or evidence that a proposed study can address." },
      { term: "Alignment", definition: "Coherence among research question, evidence, method, analysis, and conclusion." },
      { term: "Original contribution", definition: "The new evidence, analysis, application, or understanding produced by a study." },
      { term: "Informed consent", definition: "Voluntary participation based on understandable information about procedures, risks, benefits, and rights." },
    ],
    examAlignment: {
      title: "A question that can support 5,000 words of argument",
      description: "The academic paper rubric expects contextualized inquiry and a coherent research design, not a large information report.",
      criteria: [
        "State a question whose answer is not predetermined by its wording.",
        "Connect the identified gap directly to the evidence your method can produce.",
        "Document feasibility, ethics, and major design decisions for later defense.",
      ],
      sources: ["cb-research-ced", "cb-research-exam", "cb-research-samples"],
    },
    practice: [
      {
        question: "Which research question is most aligned with a small controlled classroom study?",
        options: ["Why is education important?", "How does five minutes of retrieval practice affect recall accuracy on a matched vocabulary test for one class?", "Do phones cause every social problem?", "What is the history of all testing?"],
        correctIndex: 1,
        explanation: "It identifies a feasible intervention, outcome, comparison, and setting that a controlled study can address.",
        skill: "Design aligned inquiry",
      },
      {
        question: "Which statement describes a defensible research gap?",
        options: ["I have not read this topic before.", "No one anywhere has ever studied it.", "Prior studies compare university samples, leaving the target secondary-school setting underexamined.", "The topic is popular online."],
        correctIndex: 2,
        explanation: "It identifies a bounded limitation in the existing literature that the proposed study can address.",
        skill: "Establish context and gap",
      },
      {
        question: "Which research question is most feasible for a year-long AP Research project?",
        options: ["How does a four-day school week affect quiz performance in one district's ninth-grade algebra classes?", "What is the complete history of education reform in the United States since 1776?", "Do students generally prefer learning in the morning or at night?", "Why is mathematics important to modern civilization as a whole?"],
        correctIndex: 0,
        explanation: "A feasible question names a population, a measurable outcome, and a bounded setting—one district, one course—so the student can actually gather and analyze evidence.",
        skill: "Feasible research questions (Big Idea 1)",
      },
      {
        question: "A student's first question proves too broad after reading three sources. The inquiry process expects the student to",
        options: ["revise and narrow the question as understanding develops, documenting the change", "abandon the topic and restart the entire course project", "hide the change and pretend the final question was the original", "collect data first and invent a question that fits it later"],
        correctIndex: 0,
        explanation: "Question, Explore, and Design is iterative; the Academic Paper rewards an explained evolution of the question, not a falsely tidy story.",
        skill: "Iterative inquiry (Big Idea 1)",
      },
    ],
  },
  {
    unitNumber: 2,
    title: "Big Idea 2 · Understand methods and analyze evidence",
    description: "Read primary research through its design, sampling, measurement, and analysis; evaluate what evidence can establish and where inference must stop.",
    examWeight: "QUEST Big Idea 2 · method selection, literature evaluation, and oral defense",
    objectives: [
      "Distinguish primary studies, reviews, commentary, and other source roles.",
      "Analyze sampling, variables, measurement, controls, and analytical choices.",
      "Match conclusions to the strength and limits of a study’s design.",
    ],
    sections: [
      section("Read the method before the headline", ["cb-research-ced", "purdue-methods"], `
A compelling conclusion can hide a weak design. When reading research, identify the question, participants or materials, sampling process, variables, procedure, analytical method, and stated limitations. Then read the conclusion and ask whether it stays within those boundaries. A press release may emphasize a dramatic estimate while the underlying paper presents a narrow population and substantial uncertainty.

Distinguish source roles. A primary empirical study reports new data or analysis; a systematic review synthesizes multiple studies using an explicit method; a theoretical article develops concepts; commentary interprets or argues; journalism translates for a broader audience. Each can be useful, but they should not be cited as interchangeable proof. Trace important numerical or causal claims to their original research whenever possible.
`),
      section("Sampling shapes generalization", ["cb-research-ced", "purdue-methods"], `
A sample’s size matters, but its selection and response process often matter more. Random sampling can support generalization from a defined population under suitable conditions; convenience sampling recruits whoever is accessible and can systematically exclude important groups. Nonresponse can distort even a probability sample if respondents differ meaningfully from nonrespondents. Describe the population to which a result reasonably applies rather than saying “people” without qualification.

Qualitative sampling pursues different goals. Purposive sampling selects information-rich cases, while theoretical sampling follows emerging analysis. Saturation concerns whether new data continue to add meaningful insight, not whether a fixed number has been reached. These designs can produce deep understanding without statistical representativeness. Evaluate them by transparency, fit, and analytical rigor rather than applying an inappropriate large-n standard.
`),
      section("Measurement and operationalization", ["cb-research-ced", "purdue-methods"], `
An abstract concept becomes researchable through **operationalization**: specifying how it will be observed or measured. “Engagement” might mean time on task, completed problems, eye tracking, or interview themes, each capturing something different. Validity concerns whether the measure represents the intended concept; reliability concerns consistency under relevant conditions. A highly reliable stopwatch can still be an invalid measure of motivation.

Survey wording, scale direction, and instrument order can influence responses. Pilot questions with people similar to your participants and check that categories are understandable and not double-barreled. For existing datasets, inspect codebooks and missing-value conventions rather than assuming a column name tells the whole story. In the final paper, define key measures clearly enough for readers to understand what your evidence actually represents.
`),
      section("Causal, correlational, and interpretive inference", ["cb-research-ced", "purdue-methods"], `
Random assignment can support causal inference by balancing known and unknown confounders in expectation, while merely observing two variables leaves alternative explanations. A correlation between tutoring and grades might reflect motivation, prior achievement, or selection into tutoring. Matching, controls, longitudinal designs, and sensitivity analysis can strengthen observational claims, but they do not magically remove every confounder.

Qualitative analysis supports different kinds of claims. Coding can identify patterns in meaning, while case comparison can reveal mechanisms or contextual differences. Quantitative statistical significance addresses compatibility with a null model, not practical importance or probability that a hypothesis is true. Effect size, uncertainty, and context are necessary. Across methods, the rule is the same: make the inference your design supports and no stronger.
`),
      section("Defending methodological choices", ["cb-research-exam", "cb-research-samples"], `
Your method section should explain not only what you did but why those choices fit the question. If you used a survey, describe recruitment, instrument, variables, and analysis; if you conducted textual analysis, describe corpus selection, coding categories, and how interpretations were checked. Enough detail should be present for a reader to evaluate the process, while irrelevant classroom logistics can remain outside the central narrative.

The presentation panel may ask why you rejected an alternative method or how a limitation affects your conclusion. A strong response does not claim perfection. You might explain that a small convenience sample limits generalization but still allows a bounded description of the measured group, then propose how a future probability sample would test broader claims. Official sample papers and scoring guidelines are better models of this alignment than generic research-report templates.
`),
    ],
    glossary: [
      { term: "Operationalization", definition: "The process of defining an abstract concept through observable measures or procedures." },
      { term: "Validity", definition: "The degree to which evidence and measurement support the intended interpretation or claim." },
      { term: "Confounder", definition: "A variable related to both an explanatory variable and outcome that can create a misleading association." },
      { term: "Effect size", definition: "A measure of the magnitude of a relationship or difference, distinct from statistical significance." },
    ],
    examAlignment: {
      title: "Method as an argument about evidence",
      description: "AP Research rewards justified design and analysis that directly address the research question.",
      criteria: [
        "Explain why the chosen sample, instrument, and analysis fit the intended claim.",
        "Distinguish association from causation and statistical from practical significance.",
        "State the population or context to which findings can reasonably transfer.",
      ],
      sources: ["cb-research-ced", "cb-research-exam", "cb-research-samples"],
    },
    practice: [
      {
        question: "A study finds students who choose tutoring earn higher grades. What is the strongest interpretation?",
        options: ["Tutoring definitely causes all improvement.", "The association may reflect tutoring, selection differences, prior achievement, or other confounders.", "The sample proves no relationship.", "Random assignment must have occurred."],
        correctIndex: 1,
        explanation: "Without a design that addresses selection and confounding, the causal claim goes beyond the evidence.",
        skill: "Evaluate inference",
      },
      {
        question: "Which change most improves an ‘engagement’ survey?",
        options: ["Leave the term undefined.", "Combine attention and enjoyment into one question.", "Define the intended construct and pilot clear, single-idea items aligned with it.", "Ask only friends to respond."],
        correctIndex: 2,
        explanation: "Operational clarity and piloting improve measurement validity and interpretability.",
        skill: "Evaluate measurement",
      },
      {
        question: "A researcher surveys 40 volunteers from her own gym about citywide exercise habits. The main methodological weakness is",
        options: ["the sample is neither random nor representative of the city's population", "the survey contains too many questions for anyone to answer", "gym members are unable to report their own exercise habits", "surveys can never produce usable evidence in any study"],
        correctIndex: 0,
        explanation: "Understand and Analyze treats method as an argument: a convenience sample from one gym cannot support claims about a whole city, however carefully the questions are written.",
        skill: "Evaluating methods (Big Idea 2)",
      },
      {
        question: "In an experiment, the control group is essential primarily because it",
        options: ["provides a baseline that isolates the effect of the treatment being tested", "receives the strongest version of the treatment available", "is told the hypothesis so members can help confirm it", "replaces the need to analyze the results statistically"],
        correctIndex: 0,
        explanation: "Comparing treated and untreated groups under otherwise similar conditions is what lets a study argue causation rather than mere association.",
        skill: "Experimental design (Big Idea 2)",
      },
    ],
  },
  {
    unitNumber: 3,
    title: "Big Idea 3 · Evaluate perspectives and build a literature review",
    description: "Synthesize scholarly conversations, compare methods and assumptions, and position your study within prior research instead of producing an annotated bibliography.",
    examWeight: "QUEST Big Idea 3 · literature review, discussion, and defense",
    objectives: [
      "Organize prior research by concepts, debates, and methods rather than by author alone.",
      "Compare findings while accounting for populations, measures, and limitations.",
      "Explain how the current study enters and extends an existing conversation.",
    ],
    sections: [
      section("A literature review is an argument about a field", ["cb-research-ced", "purdue-research"], `
An annotated bibliography summarizes sources one by one; a literature review explains how bodies of work relate. Its purpose is to establish context, identify credible concepts and methods, reveal agreements and tensions, and show why your question remains worth investigating. The review should lead logically to your study rather than ending with an abrupt sentence that “this paper will research the topic.”

Begin with a synthesis matrix. Rows can represent sources and columns can represent population, research question, method, key finding, limitation, and relevance. Patterns then become visible: perhaps quantitative studies show an average effect while interviews explain why experiences differ. Those patterns supply possible paragraph themes. Your matrix is a planning tool, not something that must appear in the final paper.
`),
      section("Grouping by theme and method", ["cb-research-ced", "purdue-research"], `
A thematic paragraph makes a claim about the literature and uses several sources to support it. For example, “Studies generally associate later start times with longer sleep, but the evidence for academic outcomes is less consistent” establishes both pattern and qualification. Follow with studies that illustrate the pattern, explain differences in design, and identify what remains uncertain. Citations appear because they serve the claim.

Method-based synthesis can be equally useful. If small experiments show strong short-term effects but large observational studies show weaker long-term associations, the difference may reflect duration, control, or measurement rather than simple contradiction. Comparing methods helps you choose your own design and anticipate limitations. Do not assume the newest or largest study automatically cancels earlier work.
`),
      section("Perspectives include disciplinary assumptions", ["cb-research-ced", "purdue-research"], `
Different fields may define the same problem through different constructs. A psychologist studying notifications may measure attention; a sociologist may examine norms and inequality; an economist may model incentives; an educator may focus on classroom implementation. These perspectives can complement one another, but their evidence and terms are not always interchangeable. Explain what each approach makes visible.

Also consider who is represented in the literature. Samples concentrated in one country, age group, language, or institution can limit transfer. A result described as universal may rest on a narrow population. This is not a reason to dismiss every study; it is a reason to define the scope of your synthesis and, where feasible, design research that addresses an underexamined context responsibly.
`),
      section("Evaluating disagreement without false balance", ["cb-research-ced", "purdue-argument"], `
When findings conflict, examine whether researchers asked different questions. One paper may measure immediate test performance while another measures delayed retention, or one may evaluate access while another evaluates learning outcomes. Reconcile definitions and timelines before treating the results as incompatible. If genuine disagreement remains, compare sample, method, analytical choices, and uncertainty.

Fair evaluation does not require giving every claim equal weight. Evidence can justify greater confidence in one conclusion. Avoid both “the research is mixed, so nothing is known” and selective citation of only your preferred outcome. Explain which conclusions are robust across studies, which are contested, and how your research can address a specific unresolved aspect.
`),
      section("Positioning your own study", ["cb-research-ced", "cb-research-samples"], `
The final paragraphs of the literature review should make the study’s location in the conversation clear. You might adopt a validated measure from one line of research, apply a conceptual framework from another, and address a population gap identified in a third. This creates continuity without making your work a simple replication. State the contribution in bounded language: extends, compares, reexamines, applies, or explores.

In the discussion section later, return to these sources. Explain whether your findings converge, complicate, or diverge and why. A literature review is therefore not disposable background; it supplies the expectations against which you interpret results. During oral defense, being able to name one or two especially influential studies and explain their role demonstrates ownership more effectively than reciting a long bibliography.
`),
    ],
    glossary: [
      { term: "Literature review", definition: "A critical synthesis of relevant research that establishes context, relationships, and a need for further inquiry." },
      { term: "Synthesis matrix", definition: "A planning table comparing sources across questions, methods, findings, limitations, and relevance." },
      { term: "Transferability", definition: "The reasoned applicability of findings to another context based on relevant similarities and differences." },
      { term: "False balance", definition: "Presenting positions as equally supported when the quality or weight of evidence differs substantially." },
    ],
    examAlignment: {
      title: "From prior work to your contribution",
      description: "Strong papers use literature to contextualize the inquiry and interpret results, not to inflate the bibliography.",
      criteria: [
        "Make thematic claims supported by multiple sources rather than summarizing one author per paragraph.",
        "Compare methods and populations when explaining conflicting findings.",
        "Return to key literature in the discussion to explain the new result’s significance.",
      ],
      sources: ["cb-research-ced", "cb-research-samples", "purdue-research"],
    },
    practice: [
      {
        question: "Which paragraph plan best fits a literature review?",
        options: ["One paragraph per source with no comparisons.", "A claim about a pattern across studies, followed by methodological comparison and the unresolved issue.", "A list of quotations from abstracts.", "Only sources that support the expected result."],
        correctIndex: 1,
        explanation: "The plan synthesizes evidence and leads to a research need instead of producing an annotated bibliography.",
        skill: "Synthesize literature",
      },
      {
        question: "What should you do when two studies report different effects?",
        options: ["Assume one is fraudulent.", "Average the numbers immediately.", "Compare questions, measures, populations, time frames, and methods before judging compatibility.", "Cite neither."],
        correctIndex: 2,
        explanation: "Apparent disagreement may arise from design differences and must be analyzed before synthesis.",
        skill: "Evaluate multiple perspectives",
      },
      {
        question: "A literature review earns the most credit when it",
        options: ["organizes prior research by themes and debates, showing where the new study fits", "summarizes each article in the order the student happened to find them", "quotes the abstract of every source without commentary", "includes only sources that agree with the student's hypothesis"],
        correctIndex: 0,
        explanation: "Evaluate Perspectives in Research means synthesizing a conversation among scholars—agreements, gaps, and disputes—so the student's contribution has a clear place.",
        skill: "Literature review (Big Idea 3)",
      },
      {
        question: "Two respected studies reach opposite conclusions about homework and achievement. The strongest scholarly response is to",
        options: ["compare their populations, measures, and methods to explain why results may differ", "discard both studies since experts clearly cannot be trusted", "cite only the study with the larger headline in the news", "report whichever conclusion the student personally prefers"],
        correctIndex: 0,
        explanation: "Contradiction is information: differences in design often explain different results, and explaining them positions the new study to add evidence.",
        skill: "Evaluating conflicting evidence (Big Idea 3)",
      },
    ],
  },
  {
    unitNumber: 4,
    title: "Big Idea 4 · Synthesize data, analysis, and conclusions",
    description: "Turn raw evidence into a transparent analysis, distinguish results from interpretation, and build a bounded argument about meaning, limitations, and implications.",
    examWeight: "QUEST Big Idea 4 · results, discussion, conclusion, and academic-paper argument",
    objectives: [
      "Select and document analytical procedures suited to the evidence and question.",
      "Present results or a research product clearly before interpreting significance.",
      "Develop conclusions that integrate evidence, literature, limitations, and implications.",
    ],
    sections: [
      section("Analysis is a series of inspectable decisions", ["cb-research-ced", "purdue-methods"], `
Raw responses, images, texts, and measurements do not become findings until you apply an analytical process. For quantitative work, this may involve cleaning data, defining variables, calculating descriptive statistics, visualizing distributions, and fitting an appropriate model. For qualitative work, it may involve transcription, initial coding, theme development, comparison, and memo writing. Record decisions so another reader can understand how evidence changed form.

Do not let software replace judgment. Check impossible values, missingness, outliers, and coding consistency. If you exclude a case, state the criterion before looking at whether it helps your preferred result. If you collapse categories or revise a coding scheme, explain why. Transparency is more persuasive than claiming the analysis was “objective” without showing its steps.
`),
      section("Results present what the evidence showed", ["cb-research-ced", "cb-research-samples"], `
The results or product section presents relevant outcomes in a logical order tied to the research question. Tables should summarize information that would be cumbersome in prose, while figures should reveal patterns such as distribution, change, or comparison. Label variables, units, sample sizes, and uncertainty where appropriate. Do not include every output simply because you generated it.

Keep interpretation proportionate within this section. “The intervention group’s mean score was 4.2 points higher” reports a result; “the intervention improved learning because it reduced anxiety” adds a mechanism that requires separate evidence. Qualitative findings likewise need supporting extracts or observations and an explanation of how they illustrate a theme. Contradictory or unexpected cases belong in the account rather than being hidden.
`),
      section("Discussion creates the research argument", ["cb-research-ced", "cb-research-samples"], `
The discussion explains what the results mean in relation to the question and prior literature. Return to your main finding, connect it to the mechanism or framework you investigated, and compare with earlier studies. If results differ, consider population, measurement, context, and method rather than speculating without evidence. Your interpretation should integrate the findings rather than repeating them with more confident adjectives.

Alternative explanations strengthen credibility when you evaluate them fairly. An attendance increase after a scheduling change could reflect the new schedule, a simultaneous incentive, or seasonal variation. Explain which alternatives your data can address and which remain plausible. The argument becomes stronger by marking uncertainty and showing why your preferred interpretation best fits the available evidence.
`),
      section("Limitations are analytical boundaries", ["cb-research-ced", "purdue-methods"], `
A limitation is not a ritual sentence saying the sample was small. Explain how a specific design feature affects a specific inference. A cross-sectional survey cannot establish the order of events; a single-site study limits generalization; self-reported sleep may differ from measured sleep. Then state what the study can still establish. This balanced treatment prevents both overclaiming and unnecessary self-destruction.

Avoid changing the research question after seeing results without acknowledging the shift. Exploratory findings can be valuable, but label them as exploratory and avoid presenting them as the original confirmatory hypothesis. Future research should address identified boundaries with concrete designs, not merely request “more research.” A larger, more diverse sample, longitudinal measurement, or a different method may answer distinct remaining questions.
`),
      section("Conclusions, implications, and integrity", ["cb-research-ced", "cb-capstone-policy", "cb-research-samples"], `
A conclusion answers the research question at the level the evidence supports and explains why the answer matters. Implications can concern theory, practice, policy, or further inquiry, but each must follow from the findings. If a pilot shows feasibility rather than effectiveness, recommend further evaluation rather than immediate nationwide adoption. Calibrated conclusions are not weak; they demonstrate control over inference.

Never fabricate, falsify, or selectively alter data to create a cleaner story. Preserve original records, cite datasets and instruments, and disclose relevant transformations or assistance according to current policy. The academic paper is assessed as a research argument, so polished prose cannot rescue missing or manipulated evidence. Official scoring samples show that clear alignment among question, method, results, and conclusion is more important than appearing to produce dramatic findings.
`),
    ],
    glossary: [
      { term: "Data cleaning", definition: "Documented checking and preparation of data for analysis, including handling errors and missing values." },
      { term: "Theme", definition: "A patterned meaning developed through qualitative coding and interpretation." },
      { term: "Exploratory finding", definition: "A result identified through open investigation rather than a preregistered or initially specified hypothesis." },
      { term: "Inference boundary", definition: "The limit on the kind, strength, or scope of conclusion supported by a design." },
    ],
    examAlignment: {
      title: "Evidence → analysis → bounded conclusion",
      description: "The paper’s central contribution depends on a transparent connection among raw evidence, analytical choices, and the final argument.",
      criteria: [
        "Distinguish reported results from your interpretation and from prior literature.",
        "Explain how each major limitation changes what can be concluded.",
        "Preserve contrary cases and original data rather than manufacturing a convenient pattern.",
      ],
      sources: ["cb-research-ced", "cb-research-samples", "cb-capstone-policy"],
    },
    practice: [
      {
        question: "Which statement belongs most clearly in a results section?",
        options: ["The treatment proves the theory is universally true.", "The treatment group averaged 82.1 (SD 6.3) and the comparison group averaged 77.4 (SD 7.0).", "The results are amazing and revolutionary.", "Future researchers should change every school."],
        correctIndex: 1,
        explanation: "It reports concrete outcomes with variability, leaving broader interpretation for the discussion.",
        skill: "Present results",
      },
      {
        question: "Which limitation statement is most useful?",
        options: ["My study had limitations.", "The sample was small, so the project is worthless.", "Because data were collected once, the order of events cannot be established and the findings support association rather than causation.", "There are no limitations if the result is significant."],
        correctIndex: 2,
        explanation: "It identifies the design feature and its precise consequence for inference.",
        skill: "Evaluate limitations",
      },
      {
        question: "A study finds a correlation of \\(r = 0.82\\) between ice-cream sales and swimming lessons. The most defensible conclusion is",
        options: ["the variables are strongly associated, but a third factor such as summer weather likely drives both", "ice-cream sales cause families to enroll in swimming lessons", "swimming lessons cause large increases in ice-cream sales", "the correlation coefficient proves the data must be fabricated"],
        correctIndex: 0,
        explanation: "A correlation coefficient measures association strength, never causation by itself; bounded conclusions that name confounders are exactly what Big Idea 4 rewards.",
        skill: "Bounded conclusions (Big Idea 4)",
      },
      {
        question: "When results support the hypothesis in only one of three conditions tested, the Academic Paper should",
        options: ["report the mixed result honestly and limit conclusions to the condition that worked", "present the study as fully confirming the original hypothesis", "delete the two unsuccessful conditions from the paper", "change the hypothesis after the fact without mentioning it"],
        correctIndex: 0,
        explanation: "Synthesize expects conclusions sized to the evidence; acknowledging limits and failures strengthens credibility and suggests future research directions.",
        skill: "Bounded conclusions (Big Idea 4)",
      },
    ],
  },
  {
    unitNumber: 5,
    title: "Big Idea 5 · Transform, present, and defend the research",
    description: "Revise the paper as a coherent research argument, design an audience-centered presentation, and respond to defense questions with evidence and reflection.",
    examWeight: "QUEST Big Idea 5 · presentation and oral defense (25% of score)",
    objectives: [
      "Revise the paper for coherence, attribution, and discipline-appropriate conventions.",
      "Transform the research into a concise visual and oral narrative.",
      "Prepare specific oral-defense explanations of method, evidence, limitations, and decisions.",
    ],
    sections: [
      section("Revision restores the whole argument", ["cb-research-ced", "purdue-research"], `
Long research projects can become collections of sections written at different times. Read the complete paper with the research question in view and label each section’s role. The introduction should establish context and need; literature review should position the study; method should justify the design; results should present the product or evidence; discussion should interpret it; conclusion should answer the question and address implications.

Remove repetition that does not advance the argument, but keep necessary signposting. A reader should understand how the literature informed the method and how the results responded to it. Check that terminology remains consistent: if “engagement,” “attention,” and “motivation” are different constructs, do not alternate among them casually. Coherence is conceptual before it is stylistic.
`),
      section("Attribution and conventions", ["cb-research-ced", "cb-capstone-policy", "purdue-research"], `
Use the citation style required by your discipline and teacher consistently for in-text attribution and the reference list. Cite paraphrases, data, instruments, images, and distinctive frameworks as well as direct quotations. A citation must lead to the correct source and support the statement attached to it. Reference managers can help with formatting but cannot verify whether a source exists or whether your interpretation is accurate.

Figures and tables need informative titles, labels, units, and source notes when adapted. Appendices can hold instruments or supplementary material but should not hide evidence essential to understanding the central argument. Check the current word-count rules and submission requirements rather than assuming appendices bypass them. Authenticity rules apply across writing, visuals, data, and presentation materials.
`),
      section("Build the presentation around decisions", ["cb-research-exam", "cb-research-samples"], `
The current presentation and oral defense together last approximately 15–20 minutes, with the presentation followed by three to four questions from a panel of three evaluators. You cannot read a 5,000-word paper in that time. Select the question and significance, essential literature context, method and rationale, main results, interpretation, limitations, and conclusion. The relative emphasis should make your research decisions understandable.

Design slides for listening rather than reading. Use one clear result figure instead of a wall of output, define specialized terms orally, and make transitions explicit. A method diagram can show alignment better than a paragraph, while a short participant extract can illuminate a qualitative theme when used ethically. Practice with a timer and revise content rather than rushing through every slide.
`),
      section("Delivery supports intellectual access", ["cb-research-exam", "cb-research-samples"], `
Effective delivery is audible, paced, and engaged. Know the argument well enough to look away from notes and respond to the audience. Nervousness is normal; rehearsal should create recovery points, such as a summary sentence at the end of each section, rather than dependence on a memorized script. If technology fails, a printed outline and knowledge of the key result allow you to continue.

Accessibility strengthens the presentation for everyone. Use readable fonts, adequate contrast, descriptive narration for visuals, and captions for meaningful audio or video. Avoid animations that distract from evidence. Delivery techniques are not a substitute for research quality, but poor access can prevent evaluators from seeing that quality. Treat design and delivery as ways to make reasoning inspectable.
`),
      section("Oral defense demonstrates ownership", ["cb-research-exam", "cb-research-samples", "cb-capstone-policy"], `
Prepare for questions about why you chose the question, method, sample, and analysis; how you addressed limitations; what surprised you; and how your findings relate to prior work. Use your decision journal and original records. A strong answer might acknowledge that an interview study could add explanation your survey could not capture, then describe exactly what such a follow-up would investigate.

Do not invent an answer when uncertain. State the boundary, explain what you can infer, and describe how you would check. If a panelist challenges a conclusion, respond with evidence and reasoning rather than repeating the slide. The defense represents part of the 25% presentation-and-oral-defense component, while the academic paper represents 75%. Official sample performances and rubrics should guide your teacher-supervised practice and scoring.
`),
    ],
    glossary: [
      { term: "Research narrative", definition: "The coherent spoken or written progression from question and method through evidence and conclusion." },
      { term: "Signposting", definition: "Language that identifies the argument’s structure and transitions for the audience." },
      { term: "Decision journal", definition: "A record of methodological, analytical, and presentational choices and the reasons behind them." },
      { term: "Oral defense", definition: "Questioned explanation and justification of the research process, findings, and limitations before evaluators." },
    ],
    examAlignment: {
      title: "Communication plus reflective ownership",
      description: "The presentation rubric assesses the research argument, design, delivery, and ability to explain choices under questioning.",
      criteria: [
        "Select content for the time limit instead of compressing the paper word for word.",
        "Make every important visual readable, sourced, and verbally interpreted.",
        "Answer defense questions with specific decisions, evidence, limitations, and possible next steps.",
      ],
      sources: ["cb-research-exam", "cb-research-samples", "cb-capstone-policy"],
    },
    practice: [
      {
        question: "What is the best presentation strategy for a 4,000–5,000-word paper?",
        options: ["Read every paragraph quickly.", "Select the question, rationale, method, main evidence, interpretation, and limitations for the available time.", "Show only decorative images.", "Skip the research method entirely."],
        correctIndex: 1,
        explanation: "A presentation transforms the research into a concise argument rather than reproducing the full paper.",
        skill: "Transform research for an audience",
      },
      {
        question: "A panelist asks about a limitation you had not considered. What is the strongest response?",
        options: ["Invent a statistic to answer.", "Dismiss the question.", "Acknowledge the boundary, explain its possible effect on inference, and describe how you would investigate it.", "Claim the rubric does not allow questions."],
        correctIndex: 2,
        explanation: "Honest, specific reflection demonstrates ownership and methodological understanding better than fabrication.",
        skill: "Defend research decisions",
      },
      {
        question: "In the Presentation and Oral Defense, a student is asked how the study could be improved. The strongest answer",
        options: ["identifies a real limitation and proposes a specific, feasible design change that addresses it", "insists the study had no limitations worth mentioning at all", "blames the panel for asking an unfair question about methods", "repeats the conclusion slide word for word from memory"],
        correctIndex: 0,
        explanation: "Transform and defend rewards reflective ownership: naming limits and concrete improvements shows the student understands the method rather than merely following steps.",
        skill: "Oral defense (Big Idea 5)",
      },
      {
        question: "Which choice best strengthens a poster's communication of results?",
        options: ["One clearly labeled graph of the key comparison, with the takeaway stated in the caption", "Every raw data table printed in the smallest readable font", "Decorative images unrelated to the data being presented", "A full transcript of the entire Academic Paper on one panel"],
        correctIndex: 0,
        explanation: "Communicating research means selecting the single comparison that carries the argument and making it legible; completeness is shown in the paper, clarity on the poster.",
        skill: "Communicating research (Big Idea 5)",
      },
    ],
  },
];
