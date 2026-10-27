import type { ExamFrq, Rubric, RubricRow, SignalType, Stimulus } from "./types";
import {
  govArgumentRubric,
  govConceptRubric,
  govQuantRubric,
  govScotusRubric,
  researchPaperRubric,
  saqRubric,
} from "./rubrics";

/**
 * Authored free-response questions for the courses whose official exam includes
 * tasks the site had never written: APUSH short answers, AP Gov's four
 * question types, AP Biology's long and short questions, AP Calculus AB's six
 * problems, AP Macroeconomics' three questions, AP Environmental Science's
 * three questions, and AP Research's two portfolio components.
 *
 * The prompts are original and written to the published task descriptions.
 * Where a question needs data, the data are supplied in the prompt as a table
 * written out in text, so nothing is hidden behind an image a screen reader
 * cannot reach.
 */

interface PartSpec {
  label: string;
  points: number;
  expect: SignalType;
  note: string;
  full: string;
  zero: string;
}

/** Build a "one point per part" rubric, the shape most AP FRQs actually use. */
function partsRubric(id: string, title: string, source: string, parts: PartSpec[]): Rubric {
  const rows: RubricRow[] = parts.map((part, index) => ({
    id: `p${index + 1}`,
    label: part.label,
    maxPoints: part.points,
    scale: [part.points, 0],
    descriptors: [
      { points: part.points, text: part.full },
      { points: 0, text: part.zero },
    ],
    signals: [{ type: part.expect, note: part.note }],
  }));
  return { id, title, source, rows, total: rows.reduce((sum, row) => sum + row.maxPoints, 0) };
}

const minutes = (total: number, parts: number) => Math.max(2, Math.round(total / Math.max(1, parts)));

/* ------------------------------------------------------------------ */
/* AP U.S. History · short answers                                     */
/* ------------------------------------------------------------------ */

export const apushSaqStimuli: Stimulus[] = [
  {
    id: "apush-saq-src-1",
    title: "Source · Platform of the Progressive Party (1912), excerpt",
    kind: "document",
    attribution: "Constructed excerpt in the register of the 1912 Progressive platform, written for practice.",
    text: `The movement of the people for a genuine democracy has begun. We stand for the direct primary, for the initiative and referendum, and for the recall of elected officers, because government must answer to the citizens it serves rather than to the machine politicians who have purchased it. We demand an eight-hour day, a living wage, and the abolition of child labour, for the welfare of the nation depends upon the welfare of its workers. We demand the conservation of natural resources, which the great corporations have consumed without accounting.`,
  },
];

export const apushFrqs: ExamFrq[] = [
  {
    id: "apush-saq-1",
    taskType: "Short Answer · Stimulus",
    title: "Question 1 · Progressive reform",
    prompt:
      "Use the excerpt to answer all three parts.\n\n(a) Briefly describe one reform supported by the platform excerpt.\n(b) Briefly explain one historical development between 1890 and 1920 that contributed to the platform's demand for such reforms.\n(c) Briefly explain one criticism of Progressive reform that other Americans made at the time.",
    minutes: 13,
    rubricId: "saq-three",
    rubric: saqRubric,
    stimulusIds: ["apush-saq-src-1"],
    points: 3,
    coach: {
      task: "Answer three separate short-answer parts in two or three sentences each. There is one point per part and no introduction or conclusion.",
      timeline: [
        { label: "Read the prompt" , minutes: 2, detail: "Underline the verb in each part: describe, explain, explain." },
        { label: "Write parts (a)–(c)", minutes: 9, detail: "Label each part. One specific detail per answer." },
        { label: "Check", minutes: 2, detail: "Each part must answer its own verb. Do not blend them." },
      ],
      steps: [
        { title: "Part (a) is description", detail: "Name the reform and say what it did.", frame: "The platform calls for ___, which would ___." },
        { title: "Part (b) is causation", detail: "Name a specific development and explain how it produced the demand.", frame: "___ contributed to this demand because ___." },
        { title: "Part (c) is a counter-case", detail: "Name a real criticism and the reason for it.", frame: "Critics argued ___ because ___." },
      ],
      evidence: ["Specific names and dates earn the point; generalities do not.", "Use the excerpt in part (a) explicitly."],
      argument: ["No thesis needed.", "Each part stands alone."],
      frames: ["Part (a): ___", "Part (b): ___ because ___", "Part (c): ___ argued ___ because ___."],
      pitfalls: ["Answering (a) in all three parts.", "Describing instead of explaining where a reason is asked."],
    },
    modelPath: [
      "(a) The platform supports the initiative and referendum, which would let citizens propose and approve laws directly.",
      "(b) Industrialisation and the power of urban political machines convinced reformers that ordinary voters had lost control of government.",
      "(c) Some critics argued that direct democracy weakened representative institutions and allowed majorities to act on prejudiced impulses.",
    ],
  },
  {
    id: "apush-saq-2",
    taskType: "Short Answer · Comparison",
    title: "Question 2 · Responses to economic insecurity",
    prompt:
      "(a) Briefly describe one similarity between the New Deal and the Great Society.\n(b) Briefly explain one difference between the goals or methods of the two programmes.\n(c) Briefly explain one reason the difference you identified mattered for Americans.",
    minutes: 13,
    rubricId: "saq-three",
    rubric: saqRubric,
    points: 3,
    coach: {
      task: "A comparison question: one similarity, one difference, and one consequence of the difference.",
      timeline: [
        { label: "Plan the two programmes", minutes: 3, detail: "List two features of each before writing." },
        { label: "Write (a)–(c)", minutes: 8, detail: "One similarity, one real difference, one consequence." },
        { label: "Check", minutes: 2, detail: "The difference must be genuine, not a restatement of the similarity." },
      ],
      steps: [
        { title: "Compare the same feature", detail: "Do not compare New Deal jobs with Medicare. Choose one axis: scope, beneficiary, or method." },
        { title: "Make the difference specific", detail: "Federal role, universal versus targeted, or rights-based versus programme-based." },
        { title: "Explain the consequence", detail: "Say why it mattered, e.g. durability, polarisation, or coverage." },
      ],
      evidence: ["Name at least one specific programme from each era.", "Use accurate dates."],
      argument: ["Comparison must be on a shared axis.", "Consequence needs a because."],
      frames: ["Both ___ and ___ sought to ___.", "Unlike ___, ___ relied on ___ rather than ___.", "This mattered because ___."],
      pitfalls: ["Two similarities and no difference.", "Vague 'both helped people'."],
    },
    modelPath: [
      "(a) Both expanded the federal government's responsibility for individual economic security, through jobs and insurance programmes.",
      "(b) The New Deal focused on relief and recovery through universal programmes such as Social Security, while the Great Society targeted poverty through education and health programmes such as Medicare and Head Start.",
      "(c) Because the Great Society's programmes were targeted, they were more vulnerable to claims that they benefited a subset of Americans, which shaped later political conflict over the welfare state.",
    ],
  },
  {
    id: "apush-saq-3",
    taskType: "Short Answer · Continuity and Change",
    title: "Question 3 · Women's work, 1890–1945",
    prompt:
      "(a) Briefly describe one change in women's participation in the paid workforce between 1890 and 1945.\n(b) Briefly explain one continuity in women's economic roles across the same period.\n(c) Briefly explain one effect of the change you described.",
    minutes: 14,
    rubricId: "saq-three",
    rubric: saqRubric,
    points: 3,
    coach: {
      task: "A continuity-and-change question. Answer each part with evidence from inside the stated period.",
      timeline: [
        { label: "Mark the period", minutes: 2, detail: "1890 to 1945. Everything you use must fall inside it." },
        { label: "Write the three parts", minutes: 9, detail: "Change, continuity, effect — one each." },
        { label: "Check", minutes: 3, detail: "The continuity must be a real pattern, not an absence of change." },
      ],
      steps: [
        { title: "Choose one change with a date", detail: "Wartime employment, clerical work, or the marriage bar." },
        { title: "Choose one continuity", detail: "Pay differentials, domestic responsibility, or occupational segregation." },
        { title: "Explain the effect", detail: "On family structure, unionisation, or post-war policy." },
      ],
      evidence: ["Use specific occupations, laws, or years.", "Do not stray past 1945."],
      argument: ["Change and continuity can coexist; say so explicitly."],
      frames: ["Between ___ and ___, ___ increased as ___.", "Despite that change, ___ persisted because ___.", "One effect was ___."],
      pitfalls: ["Using evidence from after 1945.", "Treating continuity as 'nothing changed'."],
    },
    modelPath: [
      "(a) The number of married women in clerical and industrial employment rose sharply, especially during the First World War and again after 1941.",
      "(b) Women continued to earn less than men in comparable work and remained primarily responsible for unpaid domestic labour.",
      "(c) Wartime employment strengthened arguments for equal pay and helped build the case that later produced state equal-pay laws.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* AP U.S. Government and Politics                                     */
/* ------------------------------------------------------------------ */

export const govStimuli: Stimulus[] = [
  {
    id: "gov-quant-data",
    title: "Figure · Trust in the federal government and turnout by age, selected years",
    kind: "data",
    table: {
      caption: "Share of adults saying they trust the federal government to do what is right most or all of the time",
      head: ["Year", "Trust in the federal government (%)"],
      rows: [
        ["1964", "77"],
        ["1980", "25"],
        ["2000", "44"],
        ["2020", "20"],
      ],
    },
    attribution: "Constructed data set written for practice; percentages are illustrative, not official.",
    text: "Share of adults saying they trust the federal government to do what is right most or all of the time, by year.",
  },
  {
    id: "gov-quant-turnout",
    title: "Figure · Voter turnout in the 2020 presidential election, by age group",
    kind: "data",
    attribution: "Constructed data set written for practice; percentages are illustrative, not official.",
    text: "Voter turnout in the 2020 presidential election, by age group.",
    table: {
      caption: "Voter turnout in the 2020 presidential election, by age group",
      head: ["Age group", "Turnout (%)"],
      rows: [
        ["18–29", "51"],
        ["30–44", "63"],
        ["45–64", "71"],
        ["65+", "74"],
      ],
    },
  },
];

export const govFrqs: ExamFrq[] = [
  {
    id: "ap-gov-concept",
    taskType: "Concept Application",
    title: "Question 1 · Concept application",
    prompt:
      "A state legislature passes a law requiring voters to present a government-issued photo identification at the polls. A federal court hears a challenge arguing that the law burdens a fundamental right.\n\n(a) Identify the constitutional principle that governs whether the state may set its own election rules.\n(b) In the context of the scenario, explain how that principle applies to the state's law.\n(c) Explain how an interest group could use a different institution to challenge the law.",
    minutes: 20,
    rubricId: "gov-concept-three",
    rubric: govConceptRubric,
    points: 3,
    coach: {
      task: "Three short parts: define the principle, apply it to the scenario, then explain another institutional route.",
      timeline: [
        { label: "Read the scenario twice", minutes: 4, detail: "Identify the actor, the power, and the constitutional question." },
        { label: "Write (a)–(c)", minutes: 13, detail: "One precise provision per part, then the application." },
        { label: "Check", minutes: 3, detail: "Each answer must use the scenario's specifics." },
      ],
      steps: [
        { title: "Name the clause, not the theme", detail: "'Article I, section 4 and the Elections Clause' or 'the Fifteenth and Twenty-Fourth Amendments' beat 'voting rights'." },
        { title: "Explain the application", detail: "Say which level of government holds the power and why." },
        { title: "Route the challenge", detail: "Congress, another court, or a state constitution — and explain the mechanism." },
      ],
      evidence: ["Use one required case or clause accurately.", "Refer to the scenario's actors by role."],
      argument: ["Each part is one point; do not write an essay."],
      frames: ["The governing principle is ___, which ___.", "In this scenario, ___, because ___.", "An interest group could ___ by ___."],
      pitfalls: ["Naming federalism without explaining it.", "Repeating the scenario instead of applying the principle."],
    },
    modelPath: [
      "(a) Federalism, together with the Elections Clause of Article I, gives states the primary authority to set the time, place, and manner of elections while allowing Congress to regulate by law.",
      "(b) The state may set identification requirements under its election authority, but because voting is a fundamental right the requirement must not burden access without adequate justification.",
      "(c) The group could lobby Congress to pass legislation regulating election procedures, or bring a state constitutional challenge in state court.",
    ],
  },
  {
    id: "ap-gov-quant",
    taskType: "Quantitative Analysis",
    title: "Question 2 · Quantitative analysis",
    prompt:
      "Use the figure to answer all four parts.\n\n(a) Identify the trend in trust in the federal government between 1964 and 2020.\n(b) Explain one political reason for the trend you identified.\n(c) Explain how the turnout data relate to a linkage institution.\n(d) Draw a conclusion about the implications of these data for representative democracy.",
    minutes: 20,
    stimulusIds: ["gov-quant-data", "gov-quant-turnout"],
    rubricId: "gov-quant-four",
    rubric: govQuantRubric,
    points: 4,
    coach: {
      task: "Read the data accurately, explain it politically, connect it to a principle, and draw a conclusion.",
      timeline: [
        { label: "Read the figure", minutes: 4, detail: "Axis, units, years. Write two numbers you will use." },
        { label: "Write (a)–(d)", minutes: 13, detail: "One point per part; quote the number before explaining." },
        { label: "Check", minutes: 3, detail: "Part (b) must explain, not describe; part (d) must conclude." },
      ],
      steps: [
        { title: "Quote the number", detail: "77% to 20% is a decline of 57 points, not 'a big drop'." },
        { title: "Explain with a political mechanism", detail: "Vietnam, Watergate, divided government, media change — pick one and show the link." },
        { title: "Connect turnout to linkage", detail: "Parties, elections, interest groups, or media mobilise voters." },
        { title: "Conclude for representation", detail: "Unequal turnout by age shapes whose preferences politicians respond to." },
      ],
      evidence: ["At least two specific figures.", "One named linkage institution."],
      argument: ["Description earns part (a); explanation earns (b)."],
      frames: ["Trust fell from ___ in 1964 to ___ in 2020, a decline of ___ points.", "This is explained in part by ___.", "Because turnout rises with age, ___."],
      pitfalls: ["Describing the data twice.", "A conclusion that ignores the data."],
    },
    modelPath: [
      "(a) Trust declined substantially, from 77% in 1964 to 20% in 2020, with a partial recovery around 2000.",
      "(b) Sustained conflict over Vietnam and Watergate, followed by polarised and often divided government, gave citizens reasons to doubt that government acts competently or honestly.",
      "(c) Turnout increases with age, from 51% among 18–29-year-olds to 74% among those 65 and older, which means parties and campaigns have an incentive to mobilise older voters.",
      "(d) If the least trusting and youngest citizens vote least, representatives may respond to older, more engaged constituencies, weakening the claim that elections transmit all preferences equally.",
    ],
  },
  {
    id: "ap-gov-scotus",
    taskType: "SCOTUS Comparison",
    title: "Question 3 · SCOTUS comparison",
    prompt:
      "In McDonald v. City of Chicago (2010), the Supreme Court considered a Chicago ordinance that effectively banned handgun possession.\n\n(a) Describe the holding of McDonald v. City of Chicago.\n(b) Describe a related Supreme Court case that addressed a similar constitutional question.\n(c) Explain a similarity or difference between the reasoning of the two cases.\n(d) Explain how the reasoning in McDonald might apply to a state law that requires a license to purchase a firearm.",
    minutes: 20,
    rubricId: "gov-scotus-four",
    rubric: govScotusRubric,
    points: 4,
    coach: {
      task: "Describe the required case, describe a comparison case, explain the comparison, then apply it to a new scenario.",
      timeline: [
        { label: "Recall the holding", minutes: 4, detail: "Facts, holding, reasoning — three sentences." },
        { label: "Choose the comparison", minutes: 3, detail: "A case with a genuine doctrinal link." },
        { label: "Write (a)–(d)", minutes: 10, detail: "One point each." },
        { label: "Check", minutes: 3, detail: "Part (c) must explain reasoning, not just outcomes." },
      ],
      steps: [
        { title: "State the holding in one sentence", detail: "McDonald held that the Second Amendment is incorporated against the states through the Fourteenth Amendment's due process clause." },
        { title: "Pick a doctrinally related case", detail: "Heller (individual right) or a selective-incorporation case such as Gitlow." },
        { title: "Compare reasoning, not results", detail: "Both rely on due process incorporation; they differ on the scope of the right." },
        { title: "Apply to the scenario", detail: "A licensing requirement may be a permissible regulation if it does not amount to a prohibition." },
      ],
      evidence: ["Case names and holdings must be accurate.", "Use constitutional language: incorporate, due process, fundamental right."],
      argument: ["Each part is a point; keep them separate."],
      frames: ["In ___, the Court held that ___.", "Like ___, the Court reasoned that ___.", "Under that reasoning, a licensing law would ___."],
      pitfalls: ["Naming a case without its holding.", "Comparing facts rather than reasoning."],
    },
    modelPath: [
      "(a) The Court held that the Second Amendment right to keep and bear arms is fundamental and applies to the states through the Fourteenth Amendment.",
      "(b) In District of Columbia v. Heller (2008), the Court held that the Second Amendment protects an individual right to possess a firearm for lawful purposes such as self-defence in the home.",
      "(c) Both cases treat the right as individual rather than collective, but Heller rested on the Second Amendment directly while McDonald relied on the incorporation doctrine.",
      "(d) A licensing requirement would likely be analysed as a regulation rather than a prohibition, and would be upheld if it does not unreasonably burden the core right of self-defence in the home.",
    ],
  },
  {
    id: "ap-gov-argument",
    taskType: "Argument Essay",
    title: "Question 4 · Argument essay",
    prompt:
      "The Electoral College has been defended as a protector of federalism and small states, and criticised as a violation of political equality.\n\nDevelop an argument that explains whether the Electoral College should be retained, reformed, or abolished.\n\nIn your essay:\n• Articulate a defensible claim or thesis that responds to the prompt.\n• Use at least two pieces of accurate and relevant evidence.\n• Use reasoning to explain why your evidence supports your claim.\n• Respond to an opposing or alternative perspective.",
    minutes: 40,
    rubricId: "gov-argument-six",
    rubric: govArgumentRubric,
    points: 6,
    coach: {
      task: "A six-point argument essay. Take a position, defend it with two specific pieces of evidence, address the best objection, and qualify the claim.",
      timeline: [
        { label: "Choose the position", minutes: 5, detail: "Retain, reform, or abolish — and the principle that decides it." },
        { label: "Select evidence", minutes: 5, detail: "Electoral College mechanics, the 1800 and 1876 elections, the National Popular Vote compact, small-state influence." },
        { label: "Draft", minutes: 25, detail: "Thesis, evidence paragraphs, counter-perspective, qualified conclusion." },
        { label: "Revise", minutes: 5, detail: "Check the thesis is a claim and that the objection is answered, not ignored." },
      ],
      steps: [
        { title: "Name the principle that decides it", detail: "Political equality, federalism, or stability. The principle makes your position arguable." },
        { title: "Use two specific pieces of evidence", detail: "Name the mechanism or the election and explain what it shows." },
        { title: "State the best objection", detail: "Small-state protection or swing-state concentration — the strongest version." },
        { title: "Answer it", detail: "Concede what is true, then explain why it does not decide the case." },
      ],
      evidence: ["Required cases or documents count as evidence if used, not named.", "Recent elections are legitimate evidence if described accurately."],
      argument: ["Claim → evidence → reasoning in each paragraph.", "Reserve a paragraph for the alternative perspective."],
      frames: ["The College should be ___ because ___.", "The strongest objection — that ___ — assumes ___, but ___.", "The claim therefore holds in the narrower form that ___."],
      pitfalls: ["Describing both sides without choosing.", "Naming evidence without reasoning.", "Ignoring the small-state argument."],
    },
    modelPath: [
      "Thesis: the Electoral College should be retained in structure but reformed so that every state's electoral votes reflect its popular vote, because the current winner-take-all rule, not the College itself, distorts representation.",
      "Evidence 1 — winner-take-all assigns all of a state's electors to the statewide winner, which allows a candidate to win the presidency while losing the national popular vote.",
      "Evidence 2 — the National Popular Vote Interstate Compact shows states can coordinate to bind electors to the national winner without a constitutional amendment.",
      "Reasoning: the distortion comes from state law, so reform is available without abandoning the federal structure the College preserves.",
      "Alternative perspective: defenders argue the College protects small states; the response is that small-state advantage persists under any allocation because every state receives two Senate-based electors.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* AP Biology                                                          */
/* ------------------------------------------------------------------ */

export const bioFrqs: ExamFrq[] = [
  {
    id: "ap-bio-long-1",
    taskType: "Long Free Response",
    title: "Question 1 · Cellular respiration and temperature",
    prompt:
      "Researchers measured oxygen consumption in germinating pea seeds at five temperatures. Oxygen consumption, in mL O₂ per gram of tissue per hour, was: 10 °C — 0.21; 15 °C — 0.38; 20 °C — 0.61; 25 °C — 0.74; 30 °C — 0.69.\n\n(a) Identify the independent variable in the investigation.\n(b) Describe the trend in the data between 10 °C and 30 °C.\n(c) Explain how the data support the claim that aerobic respiration is enzyme-mediated.\n(d) Calculate the percent increase in oxygen consumption from 10 °C to 25 °C. Show your work.\n(e) Predict the oxygen consumption at 45 °C and justify your prediction.",
    minutes: 20,
    rubricId: "bio-long-1",
    rubric: partsRubric(
      "bio-long-1",
      "Cellular respiration · 9-point rubric",
      "Task-specific rows written to AP Biology free-response conventions.",
      [
        { label: "(a) Independent variable", points: 1, expect: "definition", note: "Temperature named as the manipulated variable", full: "Identifies temperature as the independent variable.", zero: "No variable identified, or the dependent variable named instead." },
        { label: "(b) Trend", points: 2, expect: "numeric-work", note: "Both directions of the trend described with values", full: "Describes the increase from 0.21 to 0.74 mL O₂/g/h between 10 °C and 25 °C and the slight decline at 30 °C.", zero: "No trend, or only one direction." },
        { label: "(c) Enzyme mediation", points: 2, expect: "justification", note: "A causal chain linking temperature to enzyme activity and rate", full: "Explains that rising temperature increases enzyme–substrate collisions up to an optimum, and that the decline at 30 °C reflects denaturation, which shows the reactions are enzyme-catalysed.", zero: "States that respiration increased without explaining the enzymatic mechanism." },
        { label: "(d) Percent increase", points: 2, expect: "numeric-work", note: "Correct setup ((0.74−0.21)/0.21 × 100) and answer", full: "Shows (0.74 − 0.21) ÷ 0.21 × 100 = 252% (accept 252.4%).", zero: "No calculation, or percent change computed from the wrong base." },
        { label: "(e) Prediction at 45 °C", points: 2, expect: "justification", note: "A specific prediction plus a denaturation reason", full: "Predicts a value well below 0.69, approaching zero, because proteins denature at high temperature and enzymes lose their active shape.", zero: "A prediction with no biological justification, or a prediction that consumption will keep rising." },
      ],
    ),
    points: 9,
    coach: {
      task: "A long AP Biology question in five parts: identify, describe, explain, calculate, predict-and-justify.",
      timeline: [
        { label: "Label the parts", minutes: 3, detail: "Mark which verb each part uses." },
        { label: "Write", minutes: 14, detail: "One short paragraph per part, with the numbers quoted." },
        { label: "Check", minutes: 3, detail: "Units, calculation setup, and a reason for the prediction." },
      ],
      steps: [
        { title: "Quote the data", detail: "Part (b) wants the actual values, not 'it went up'." },
        { title: "Chain the mechanism", detail: "Temperature → kinetic energy → enzyme–substrate collisions → rate; beyond optimum → denaturation → rate falls." },
        { title: "Show the formula", detail: "(new − old) ÷ old × 100 before substituting." },
        { title: "Justify the prediction", detail: "A prediction about high temperature needs the word denature." },
      ],
      evidence: ["Reference specific values from the prompt.", "Use precise terms: optimum, denaturation, active site."],
      argument: ["Every explain needs a because.", "Predictions require a mechanism."],
      frames: ["As temperature rises from ___ to ___, oxygen consumption ___.", "This suggests the reactions are catalysed by enzymes because ___.", "At 45 °C, consumption would be ___ because ___."],
      pitfalls: ["Restating the prompt.", "Percent change calculated as a simple difference.", "Teleological explanation."],
    },
    modelPath: ["(a) Temperature.", "(b) Consumption rises from 0.21 at 10 °C to a maximum of 0.74 at 25 °C, then falls slightly to 0.69 at 30 °C.", "(c) The rise and the subsequent fall fit enzyme kinetics: collisions increase with temperature, then enzymes denature past the optimum.", "(d) (0.74 − 0.21)/0.21 × 100 = 252%.", "(e) Near zero, because most respiratory enzymes would be denatured at 45 °C."],
  },
  {
    id: "ap-bio-long-2",
    taskType: "Long Free Response",
    title: "Question 2 · Allele frequencies in a population",
    prompt:
      "In a population of 1,000 beetles, a single gene controls colour. The dominant allele B (brown) has a frequency of 0.7 and the recessive allele b (green) has a frequency of 0.3. The population is at Hardy–Weinberg equilibrium.\n\n(a) Calculate the expected frequency of heterozygous individuals. Show your work.\n(b) Calculate the expected number of green beetles in the population.\n(c) Explain why the allele frequencies would change if brown beetles were preferentially eaten by birds.\n(d) Describe how the population could reach a new equilibrium if the birds were removed after several generations.\n(e) Justify whether the original Hardy–Weinberg assumptions are realistic in this population.",
    minutes: 20,
    rubricId: "bio-long-2",
    rubric: partsRubric(
      "bio-long-2",
      "Population genetics · 9-point rubric",
      "Task-specific rows written to AP Biology free-response conventions.",
      [
        { label: "(a) Heterozygote frequency", points: 2, expect: "numeric-work", note: "2pq computed and evaluated", full: "Computes 2pq = 2(0.7)(0.3) = 0.42.", zero: "Wrong formula or no work." },
        { label: "(b) Number of green beetles", points: 2, expect: "numeric-work", note: "q² evaluated and multiplied by 1,000", full: "q² = 0.09, so 90 beetles.", zero: "Uses q instead of q², or omits the population size." },
        { label: "(c) Selection", points: 2, expect: "justification", note: "Directional selection explained through fitness", full: "Explains that brown beetles would have lower fitness, so the B allele frequency would fall and b would rise, changing genotype frequencies.", zero: "States that the population changes without a fitness mechanism." },
        { label: "(d) New equilibrium", points: 1, expect: "line-of-reasoning", note: "A mechanism for equilibrium after selection stops", full: "Explains that removing selection returns the population to Hardy–Weinberg proportions at the new allele frequencies, with no further directional change.", zero: "No mechanism described." },
        { label: "(e) Assumption realism", points: 2, expect: "qualification", note: "Two assumptions evaluated against the scenario", full: "Argues that no mutation, no migration, random mating, no selection, and large population size are unlikely in nature, and that the scenario contradicts the no-selection assumption.", zero: "Lists assumptions without evaluating them." },
      ],
    ),
    points: 9,
    coach: {
      task: "A quantitative genetics question. Show the Hardy–Weinberg setup, then interpret selection.",
      timeline: [
        { label: "Write the formulas", minutes: 3, detail: "p + q = 1 and p² + 2pq + q² = 1." },
        { label: "Calculate", minutes: 6, detail: "Substitute, evaluate, and state units or counts." },
        { label: "Explain", minutes: 8, detail: "Fitness, selection, and equilibrium in the remaining parts." },
        { label: "Check", minutes: 3, detail: "Genotype frequencies sum to 1; counts are whole beetles." },
      ],
      steps: [
        { title: "Identify p and q", detail: "p is the dominant allele frequency; q² gives the recessive phenotype frequency." },
        { title: "Show substitution", detail: "2(0.7)(0.3) = 0.42, then 0.42 × 1,000 = 420." },
        { title: "Convert to fitness language", detail: "Selection is different survival or reproduction, which changes allele frequencies." },
        { title: "Evaluate assumptions", detail: "Name them, then say which is violated and why." },
      ],
      evidence: ["Show every formula.", "Give counts, not just frequencies, when a population size is supplied."],
      argument: ["Selection explanations need fitness differences.", "Equilibrium claims need a mechanism."],
      frames: ["p² + 2pq + q² = 1, so ___.", "Because ___ have lower fitness, the frequency of ___ would ___.", "The no-selection assumption is violated because ___."],
      pitfalls: ["Mixing phenotype and genotype frequencies.", "Forgetting to multiply by the population size."],
    },
    modelPath: ["(a) 2pq = 2(0.7)(0.3) = 0.42.", "(b) q² = 0.09; 0.09 × 1,000 = 90 green beetles.", "(c) Predation lowers the fitness of brown beetles, so B declines and b increases over generations.", "(d) With selection removed, random mating restores Hardy–Weinberg proportions at the new allele frequencies.", "(e) The assumptions of no selection and no migration are unrealistic, and the scenario itself violates the no-selection assumption."],
  },
  {
    id: "ap-bio-short-1",
    taskType: "Short Free Response",
    title: "Question 3 · Gene expression",
    prompt:
      "(a) Describe the role of the promoter in transcription.\n(b) Explain how a mutation in the operator of an operon could change gene expression even if the coding sequence is unchanged.\n(c) Predict the effect of a nonsense mutation in the first exon of a gene on the resulting protein.",
    minutes: 12,
    rubricId: "bio-short-1",
    rubric: partsRubric(
      "bio-short-1",
      "Gene expression · 4-point rubric",
      "Task-specific rows written to AP Biology free-response conventions.",
      [
        { label: "(a) Promoter", points: 1, expect: "definition", note: "Binding site for RNA polymerase", full: "Describes the promoter as the DNA sequence where RNA polymerase and transcription factors bind to begin transcription.", zero: "No accurate description." },
        { label: "(b) Operator mutation", points: 2, expect: "justification", note: "Regulatory consequence explained", full: "Explains that the operator is a regulatory binding site, so a mutation can prevent repressor binding and cause constitutive expression.", zero: "States that expression changes without explaining regulation." },
        { label: "(c) Nonsense mutation", points: 1, expect: "line-of-reasoning", note: "Premature stop and truncated protein", full: "Predicts a truncated, usually non-functional protein because translation stops early.", zero: "No effect predicted, or the effect is misdescribed." },
      ],
    ),
    points: 4,
    coach: {
      task: "A four-point short question: one describe, one explain, one predict.",
      timeline: [
        { label: "Plan", minutes: 3, detail: "One sentence per part is enough." },
        { label: "Write", minutes: 7, detail: "Name the molecule, the sequence, and the consequence." },
        { label: "Check", minutes: 2, detail: "Every prediction has a because." },
      ],
      steps: [
        { title: "Use the vocabulary", detail: "Promoter, operator, repressor, RNA polymerase, nonsense mutation." },
        { title: "Separate regulation from coding", detail: "Regulatory sequences control when and how much, not what is made." },
        { title: "Trace the consequence", detail: "Nonsense mutation → premature stop codon → truncated polypeptide." },
      ],
      evidence: ["Name binding sites explicitly.", "Link each mutation to a step in expression."],
      argument: ["Each part is a point; no introduction needed."],
      frames: ["The promoter is ___, where ___.", "Because the operator ___, a mutation there would ___.", "A nonsense mutation produces ___, so ___."],
      pitfalls: ["Confusing promoter and operator.", "Saying a nonsense mutation changes one amino acid (that is missense)."],
    },
    modelPath: ["(a) The promoter is the binding site for RNA polymerase and transcription factors upstream of the gene.", "(b) The operator binds a repressor; a mutation that prevents repression would allow continuous transcription.", "(c) Translation stops at the premature stop codon, producing a shortened protein that is usually non-functional."],
  },
  {
    id: "ap-bio-short-2",
    taskType: "Short Free Response",
    title: "Question 4 · Energy flow in an ecosystem",
    prompt:
      "A lake ecosystem has 12,000 kcal/m²/year of net primary production. Zooplankton consume 1,400 kcal/m²/year and small fish consume 140 kcal/m²/year.\n\n(a) Calculate the ecological efficiency between zooplankton and small fish. Show your work.\n(b) Explain one reason energy is lost between trophic levels.\n(c) Predict the effect on the small-fish population if the zooplankton population declined sharply, and justify your prediction.",
    minutes: 12,
    rubricId: "bio-short-2",
    rubric: partsRubric(
      "bio-short-2",
      "Ecosystem energy · 4-point rubric",
      "Task-specific rows written to AP Biology free-response conventions.",
      [
        { label: "(a) Efficiency", points: 1, expect: "numeric-work", note: "140 ÷ 1,400 × 100 evaluated", full: "Calculates 140 ÷ 1,400 × 100 = 10%.", zero: "No calculation or the wrong ratio." },
        { label: "(b) Energy loss", points: 1, expect: "justification", note: "A named loss pathway", full: "Explains that energy is lost as heat through respiration, or in undigested material and excretion.", zero: "No mechanism." },
        { label: "(c) Prediction", points: 2, expect: "justification", note: "Direction plus mechanism", full: "Predicts a decline in small fish, because their energy supply falls and the population cannot support its current biomass.", zero: "A prediction with no reason, or a prediction that ignores trophic dependence." },
      ],
    ),
    points: 4,
    coach: {
      task: "Energy-flow calculations plus a prediction with a mechanism.",
      timeline: [
        { label: "Calculate", minutes: 3, detail: "Identify which numbers belong to which trophic level." },
        { label: "Explain", minutes: 5, detail: "Name the loss pathway." },
        { label: "Predict", minutes: 4, detail: "Direction, mechanism, and a limit on the prediction." },
      ],
      steps: [
        { title: "Match the levels", detail: "Efficiency = (energy at higher level ÷ energy at lower level) × 100." },
        { title: "Name the loss", detail: "Cellular respiration, heat, excretion, or unassimilated material." },
        { title: "Justify the prediction", detail: "Energy supply limits biomass; fewer zooplankton means less food and lower carrying capacity." },
      ],
      evidence: ["Show the division before the percentage.", "Quote the units (kcal/m²/year)."],
      argument: ["Prediction plus mechanism earns both points."],
      frames: ["Efficiency = ___ ÷ ___ × 100 = ___%.", "Energy is lost as ___.", "The small-fish population would ___ because ___."],
      pitfalls: ["Using NPP as the lower level for the efficiency calculation.", "A prediction with no energy reasoning."],
    },
    modelPath: ["(a) 140/1,400 × 100 = 10%.", "(b) Most energy is lost as heat during cellular respiration, and some is lost in waste.", "(c) The small-fish population would decline, because its energy supply would fall below the level needed to sustain its biomass."],
  },
  {
    id: "ap-bio-short-3",
    taskType: "Short Free Response",
    title: "Question 5 · Experimental design",
    prompt:
      "A student claims that catalase activity increases with temperature up to 40 °C. Design an investigation to test this claim using potato tissue and hydrogen peroxide.\n\n(a) Identify the independent and dependent variables.\n(b) Describe one control the investigation requires and explain why.\n(c) Describe how the results would be measured.",
    minutes: 12,
    rubricId: "bio-short-3",
    rubric: partsRubric(
      "bio-short-3",
      "Experimental design · 4-point rubric",
      "Task-specific rows written to AP Biology free-response conventions.",
      [
        { label: "(a) Variables", points: 1, expect: "experimental-design", note: "Independent and dependent variables both named", full: "Identifies temperature as independent and rate of oxygen or gas production as dependent.", zero: "One or both variables missing." },
        { label: "(b) Control", points: 2, expect: "experimental-design", note: "A specific control with a reason", full: "Describes a control such as boiled potato tissue or peroxide without tissue, and explains that it isolates the enzyme as the cause.", zero: "A control named without a reason, or none." },
        { label: "(c) Measurement", points: 1, expect: "experimental-design", note: "A quantitative measurement method", full: "Describes measuring gas volume or bubbles per unit time at each temperature, with replicates.", zero: "No measurement described." },
      ],
    ),
    points: 4,
    coach: {
      task: "Experimental design: variables, control, and measurement.",
      timeline: [
        { label: "Design", minutes: 4, detail: "Write the variables and the control before writing sentences." },
        { label: "Write", minutes: 5, detail: "One sentence per part." },
        { label: "Check", minutes: 3, detail: "Every control has a reason; every measurement is quantitative." },
      ],
      steps: [
        { title: "Name the manipulated and measured variables", detail: "Temperature manipulated; gas production measured." },
        { title: "Choose a control that isolates the enzyme", detail: "Boiled tissue denatures catalase, so activity should drop to near zero." },
        { title: "Make measurement quantitative", detail: "Volume of gas per minute, with replicates and a constant peroxide concentration." },
      ],
      evidence: ["State what is held constant.", "Use units."],
      argument: ["Controls need reasons, not just names."],
      frames: ["The independent variable is ___ and the dependent variable is ___.", "A control of ___ is necessary because ___.", "Activity will be measured as ___ over ___."],
      pitfalls: ["Confusing a control with a constant.", "Qualitative measurement ('how much it bubbled')."],
    },
    modelPath: ["(a) Independent: temperature; dependent: rate of gas production.", "(b) Boiled potato tissue as a control, because denatured catalase should show that any activity comes from the enzyme.", "(c) Measure the volume of oxygen collected per minute at each temperature, with three replicates."],
  },
  {
    id: "ap-bio-short-4",
    taskType: "Short Free Response",
    title: "Question 6 · Natural selection",
    prompt:
      "(a) Describe the role of variation in natural selection.\n(b) Explain how a change in the environment can change allele frequencies in a population within a few generations.\n(c) Justify whether an individual organism can evolve during its lifetime.",
    minutes: 10,
    rubricId: "bio-short-4",
    rubric: partsRubric(
      "bio-short-4",
      "Evolution · 4-point rubric",
      "Task-specific rows written to AP Biology free-response conventions.",
      [
        { label: "(a) Variation", points: 1, expect: "definition", note: "Heritable variation named as the raw material", full: "Describes heritable variation as the raw material on which selection acts, producing differential reproductive success.", zero: "No accurate description." },
        { label: "(b) Allele frequency change", points: 2, expect: "justification", note: "Fitness change plus inheritance across generations", full: "Explains that a new environment changes which phenotypes survive and reproduce, so advantageous alleles increase in frequency across generations.", zero: "States that alleles change without a fitness mechanism." },
        { label: "(c) Individuals cannot evolve", points: 1, expect: "qualification", note: "Population-level definition of evolution", full: "Justifies that evolution is a change in allele frequencies in a population, so individuals cannot evolve, though they can acclimate.", zero: "Says individuals evolve, or gives no justification." },
      ],
    ),
    points: 4,
    coach: {
      task: "Three short parts on variation, selection, and the definition of evolution.",
      timeline: [
        { label: "Plan", minutes: 3, detail: "Decide the exact definition you will use for evolution." },
        { label: "Write", minutes: 5, detail: "One or two sentences per part." },
        { label: "Check", minutes: 2, detail: "Distinguish acclimation from adaptation." },
      ],
      steps: [
        { title: "Start from variation", detail: "Selection needs differences that are heritable." },
        { title: "Trace the frequency change", detail: "Environment → differential survival → reproduction → allele frequencies." },
        { title: "Define evolution precisely", detail: "A change in allele frequencies in a population over generations." },
      ],
      evidence: ["Use the phrase 'differential reproductive success'.", "Name acclimation in part (c)."],
      argument: ["One point per part; no essay structure needed."],
      frames: ["Heritable variation matters because ___.", "If ___ changes, ___ have higher fitness, so ___ increases.", "An individual cannot evolve because ___; it can only ___."],
      pitfalls: ["'Organisms adapt in order to survive' — teleology.", "Confusing individual change with evolution."],
    },
    modelPath: ["(a) Heritable variation produces phenotypic differences on which selection can act.", "(b) A changed environment alters which phenotypes reproduce most successfully, so the alleles associated with those phenotypes increase over generations.", "(c) Individuals cannot evolve; evolution is a change in population allele frequencies, and individual change within a lifetime is acclimation."],
  },
];

/* ------------------------------------------------------------------ */
/* AP Calculus AB                                                      */
/* ------------------------------------------------------------------ */

const calcRubric = (id: string, title: string, parts: PartSpec[]) =>
  partsRubric(id, title, "Task-specific rows written to AP Calculus free-response conventions (nine points per question).", parts);

export const calcFrqs: ExamFrq[] = [
  {
    id: "ap-calc-frq-1",
    taskType: "Free Response · Calculator",
    title: "Question 1 · Rate and accumulation",
    prompt:
      "Water flows into a tank at a rate modelled by R(t) = 20 + 5 sin(t²/4) litres per hour for 0 ≤ t ≤ 6, where t is measured in hours.\n\n(a) How much water enters the tank during the first 3 hours? Show the integral and evaluate it.\n(b) Find R′(2). Using correct units, interpret this value in the context of the problem.\n(c) Is the rate of flow increasing or decreasing at t = 5? Justify your answer.",
    minutes: 15,
    rubricId: "calc-frq-1",
    rubric: calcRubric("calc-frq-1", "Rate and accumulation · 9-point rubric", [
      { label: "(a) Integral setup", points: 2, expect: "numeric-work", note: "Correct definite integral from 0 to 3", full: "Writes ∫₀³ R(t) dt with the correct limits and integrand.", zero: "No integral, or wrong limits." },
      { label: "(a) Value", points: 1, expect: "final-answer", note: "Evaluated answer with units", full: "Evaluates to approximately 61.7 litres (accept 61.6–61.8).", zero: "No value or missing units." },
      { label: "(b) Derivative", points: 2, expect: "numeric-work", note: "R′(t) differentiated and evaluated at t = 2", full: "Differentiates to R′(t) = (5t/2)cos(t²/4) and evaluates R′(2) ≈ 3.674.", zero: "Wrong derivative or no evaluation." },
      { label: "(b) Interpretation", points: 1, expect: "units", note: "Units and context stated", full: "States that at t = 2 hours the inflow rate is increasing at about 3.674 litres per hour per hour.", zero: "No interpretation or missing units." },
      { label: "(c) Justification", points: 2, expect: "justification", note: "Sign of the derivative with a conclusion", full: "Finds R′(5) ≈ −3.612 < 0 and concludes the rate is decreasing.", zero: "Conclusion with no derivative evidence." },
      { label: "(c) Correctness", points: 1, expect: "final-answer", note: "Answer consistent with the sign analysis", full: "States 'decreasing' consistent with the computed sign.", zero: "Contradicts the evidence." },
    ]),
    points: 9,
    coach: {
      task: "Rate-and-accumulation: an integral for total change, a derivative for a rate of change, and a justification from a sign.",
      timeline: [
        { label: "Set up", minutes: 4, detail: "Write the integral and the derivative expression before computing." },
        { label: "Compute", minutes: 8, detail: "Evaluate numerically to three decimals; keep the setup visible." },
        { label: "Justify", minutes: 3, detail: "Sign of R′ plus a sentence of interpretation with units." },
      ],
      steps: [
        { title: "Total change is an integral", detail: "The amount entering over an interval is the definite integral of the rate." },
        { title: "Rate of change of a rate is a derivative", detail: "R′(t) describes how the inflow rate itself changes." },
        { title: "Justify with a sign", detail: "State the value and its sign, then the conclusion." },
        { title: "Use units everywhere", detail: "Litres, hours, litres per hour, litres per hour per hour." },
      ],
      evidence: ["Keep the unevaluated integral on the page.", "Round to three decimal places and say so."],
      argument: ["Setup, computation, and interpretation are separately scored."],
      frames: ["The total water is ∫₀³ R(t) dt ≈ ___ litres.", "Since R′(5) ≈ ___, the rate is ___.", "In context, ___."],
      pitfalls: ["A bare number with no setup.", "Missing units on the interpretation.", "Confusing R with R′."],
    },
    modelPath: ["(a) ∫₀³ R(t) dt ≈ 61.7 litres.", "(b) R′(t) = (5t/2)cos(t²/4), so R′(2) ≈ 3.674 L/h per hour; the inflow rate is increasing at that rate.", "(c) R′(5) ≈ −3.612 < 0, so the rate is decreasing at t = 5."],
  },
  {
    id: "ap-calc-frq-2",
    taskType: "Free Response · Calculator",
    title: "Question 2 · Differential equation",
    prompt:
      "A population P(t) of bacteria grows according to dP/dt = 0.4P(1 − P/5000), with P(0) = 200, where t is in hours.\n\n(a) Find the carrying capacity and explain its meaning in this model.\n(b) Use separation of variables or an appropriate solution method to find P(10).\n(c) Find the value of P for which the population is growing fastest, and justify your answer.",
    minutes: 15,
    rubricId: "calc-frq-2",
    rubric: calcRubric("calc-frq-2", "Logistic model · 9-point rubric", [
      { label: "(a) Carrying capacity", points: 2, expect: "final-answer", note: "Value plus meaning", full: "Identifies 5,000 as the carrying capacity and explains that growth approaches zero as P approaches it.", zero: "No value or no interpretation." },
      { label: "(b) Method", points: 3, expect: "numeric-work", note: "Correct separation and integration", full: "Separates 1/(P(1 − P/5000)) dP = 0.4 dt and integrates to obtain the logistic solution.", zero: "No separation or an invalid integration." },
      { label: "(b) Value", points: 2, expect: "final-answer", note: "Correct evaluation at t = 10", full: "Obtains P(10) ≈ 1,073 (accept 1,060–1,086).", zero: "No value, or an answer inconsistent with the method." },
      { label: "(c) Maximum growth", points: 1, expect: "justification", note: "Half the carrying capacity identified", full: "States that growth is fastest at P = 2,500.", zero: "No value." },
      { label: "(c) Justification", points: 1, expect: "line-of-reasoning", note: "Reason from the derivative's behaviour", full: "Justifies from the quadratic dP/dt being maximised at P = 2,500 (or from an inflection point of P).", zero: "No reasoning." },
    ]),
    points: 9,
    coach: {
      task: "A logistic differential equation: interpret the model, solve it, and locate the maximum growth rate.",
      timeline: [
        { label: "Interpret", minutes: 3, detail: "Read the carrying capacity directly from the model." },
        { label: "Separate and integrate", minutes: 8, detail: "Partial fractions, initial condition, then evaluate." },
        { label: "Justify the maximum", minutes: 4, detail: "Look at dP/dt as a function of P." },
      ],
      steps: [
        { title: "Find K from the factor (1 − P/K)", detail: "K is the value at which the growth factor vanishes." },
        { title: "Separate cleanly", detail: "Partial fractions give the logistic form; do not skip the constant." },
        { title: "Use the initial condition", detail: "Solve for the constant before evaluating at t = 10." },
        { title: "Maximise the rate", detail: "dP/dt is a downward parabola in P, maximised at K/2." },
      ],
      evidence: ["Show the separation step.", "State the initial condition substitution."],
      argument: ["Model interpretation is worth points on its own."],
      frames: ["K = ___, the value at which ___.", "After separating and integrating, ___, so C = ___.", "Since dP/dt = ___, it is maximised when ___."],
      pitfalls: ["Treating a logistic model as exponential.", "Forgetting the constant of integration.", "Giving the maximum growth in the wrong units."],
    },
    modelPath: ["(a) K = 5,000; the growth rate tends to zero as the population approaches it.", "(b) Separating gives the logistic solution; with P(0) = 200, P(10) ≈ 1,073.", "(c) dP/dt as a function of P is a downward parabola with maximum at P = 2,500."],
  },
  {
    id: "ap-calc-frq-3",
    taskType: "Free Response · No Calculator",
    title: "Question 3 · Tangent line and implicit differentiation",
    prompt:
      "The curve is defined by x² + 4xy + y² = 13.\n\n(a) Find dy/dx.\n(b) Find the equation of the tangent line to the curve at the point (1, 2).\n(c) Find all points on the curve where the tangent line is horizontal.\n(d) Evaluate lim(h→0) [f(3 + h) − f(3)]/h for f(x) = x² sin(x), showing the derivative rule you use.",
    minutes: 15,
    rubricId: "calc-frq-3",
    rubric: calcRubric("calc-frq-3", "Implicit differentiation · 9-point rubric", [
      { label: "(a) Derivative", points: 3, expect: "numeric-work", note: "Correct implicit differentiation", full: "Obtains dy/dx = −(2x + 4y)/(4x + 2y).", zero: "No valid differentiation." },
      { label: "(b) Slope", points: 1, expect: "final-answer", note: "Slope at the given point", full: "Evaluates the slope at (1, 2) as −5/4.", zero: "Wrong or missing slope." },
      { label: "(b) Tangent line", points: 2, expect: "numeric-work", note: "Point-slope equation", full: "Writes y − 2 = −5/4(x − 1).", zero: "No line equation." },
      { label: "(c) Horizontal tangents", points: 2, expect: "line-of-reasoning", note: "Numerator zero with valid solutions", full: "Sets 2x + 4y = 0, substitutes into the curve, and finds the points (accept both sign pairs).", zero: "Sets the denominator to zero, or no points found." },
      { label: "(d) Limit", points: 1, expect: "final-answer", note: "Derivative of x² sin x at x = 3", full: "Uses the limit definition to identify f′(3) = 9cos 3 + 6 sin 3.", zero: "No derivative rule applied." },
    ]),
    points: 9,
    coach: {
      task: "Implicit differentiation, a tangent line, horizontal tangents, and the limit definition of the derivative.",
      timeline: [
        { label: "Differentiate", minutes: 5, detail: "Differentiate every term, remembering the product rule for 4xy." },
        { label: "Evaluate", minutes: 4, detail: "Substitute the point; write point-slope." },
        { label: "Solve for horizontal", minutes: 4, detail: "Numerator zero, then use the original equation." },
        { label: "Recognise the limit", minutes: 2, detail: "The difference quotient is the definition of f′." },
      ],
      steps: [
        { title: "Differentiate both sides", detail: "Every y term gains a dy/dx factor." },
        { title: "Collect dy/dx", detail: "Move terms with dy/dx to one side and factor." },
        { title: "Horizontal means numerator zero", detail: "Denominator zero gives vertical tangents, not horizontal." },
        { title: "Name the rule in part (d)", detail: "The limit is f′(3); apply the product rule." },
      ],
      evidence: ["Show each differentiation step.", "Substitute the point visibly."],
      argument: ["Each part is scored separately; a wrong slope can still earn the line-equation point."],
      frames: ["Differentiating both sides gives ___.", "Solving for dy/dx, ___.", "Horizontal tangents require ___, so ___."],
      pitfalls: ["Forgetting dy/dx on y terms.", "Setting the denominator to zero for horizontal tangents.", "Evaluating the limit by direct substitution."],
    },
    modelPath: ["(a) dy/dx = −(2x + 4y)/(4x + 2y).", "(b) At (1, 2), dy/dx = −5/4, so y − 2 = −5/4(x − 1).", "(c) 2x + 4y = 0 with x² + 4xy + y² = 13 gives the two horizontal-tangent points.", "(d) f′(3) = 9cos 3 + 6 sin 3."],
  },
  {
    id: "ap-calc-frq-4",
    taskType: "Free Response · No Calculator",
    title: "Question 4 · Accumulation and area",
    prompt:
      "Let f(x) = 4 − x² and let R be the region bounded by the graph of f and the x-axis.\n\n(a) Find the area of R.\n(b) The region R is the base of a solid whose cross-sections perpendicular to the x-axis are squares. Find the volume of the solid.\n(c) Write, but do not evaluate, an integral for the volume of the solid generated when R is rotated about the horizontal line y = 5.",
    minutes: 15,
    rubricId: "calc-frq-4",
    rubric: calcRubric("calc-frq-4", "Area and volume · 9-point rubric", [
      { label: "(a) Integral", points: 2, expect: "numeric-work", note: "Correct limits from the roots", full: "Writes ∫₋₂² (4 − x²) dx.", zero: "Wrong limits or integrand." },
      { label: "(a) Area", points: 1, expect: "final-answer", note: "Evaluated area", full: "Evaluates to 32/3.", zero: "No value." },
      { label: "(b) Setup", points: 2, expect: "numeric-work", note: "Square cross-section expression and integral", full: "Writes ∫₋₂² (4 − x²)² dx.", zero: "Wrong cross-sectional area." },
      { label: "(b) Volume", points: 1, expect: "final-answer", note: "Evaluated volume", full: "Evaluates to 512/15.", zero: "No value." },
      { label: "(c) Washer setup", points: 3, expect: "numeric-work", note: "Outer and inner radii with limits and π", full: "Writes π∫₋₂² [(5)² − (5 − (4 − x²))²] dx, or an equivalent corrected expression.", zero: "Missing inner radius, or no π." },
    ]),
    points: 9,
    coach: {
      task: "Area, a square cross-section volume, and a washer setup you do not evaluate.",
      timeline: [
        { label: "Sketch", minutes: 4, detail: "Find the roots and the vertex; label the region." },
        { label: "Set up each integral", minutes: 6, detail: "Limits, integrand, and the geometric reason for each." },
        { label: "Evaluate", minutes: 4, detail: "Only parts (a) and (b) require evaluation." },
        { label: "Check", minutes: 1, detail: "Does the washer radius use the distance to the axis of rotation?" },
      ],
      steps: [
        { title: "Find the intersections first", detail: "4 − x² = 0 gives x = ±2: those are the limits." },
        { title: "Cross-sections: square the height", detail: "Area of a square cross-section is s², and s is the vertical distance between the curves." },
        { title: "Rotation: distance to the axis", detail: "Radii are measured from y = 5, so the inner radius is 5 − (4 − x²)." },
        { title: "Do not evaluate part (c)", detail: "The prompt says write but do not evaluate, and evaluation adds risk with no extra point." },
      ],
      evidence: ["Show the integral before evaluating.", "State which curve is the outer radius and why."],
      argument: ["Setup points are available separately from answer points."],
      frames: ["The area is ∫___ dx.", "Each cross-section has area ___, so V = ∫___ dx.", "Rotating about y = 5 gives outer radius ___ and inner radius ___."],
      pitfalls: ["Wrong limits.", "Squaring the height but forgetting to square for the cross-section.", "Mixed-up inner and outer radius."],
    },
    modelPath: ["(a) ∫₋₂² (4 − x²) dx = 32/3.", "(b) ∫₋₂² (4 − x²)² dx = 512/15.", "(c) π∫₋₂² [25 − (5 − 4 + x²)²] dx."],
  },
  {
    id: "ap-calc-frq-5",
    taskType: "Free Response · No Calculator",
    title: "Question 5 · Particle motion",
    prompt:
      "A particle moves along the x-axis with velocity v(t) = t² − 6t + 8 for 0 ≤ t ≤ 5, where t is in seconds and v is in metres per second. At t = 0 the particle is at x = 3.\n\n(a) Find all times in (0, 5) when the particle is at rest.\n(b) Find the total distance travelled by the particle on 0 ≤ t ≤ 5.\n(c) Find the acceleration at t = 1 and describe the particle's motion at that instant.\n(d) Find the position of the particle at t = 5.",
    minutes: 15,
    rubricId: "calc-frq-5",
    rubric: calcRubric("calc-frq-5", "Particle motion · 9-point rubric", [
      { label: "(a) Rest times", points: 2, expect: "numeric-work", note: "Correct roots of the velocity", full: "Solves t² − 6t + 8 = 0 to obtain t = 2 and t = 4.", zero: "Wrong or missing roots." },
      { label: "(b) Distance setup", points: 2, expect: "numeric-work", note: "Absolute value or interval split", full: "Writes ∫₀⁵ |v(t)| dt, splitting at t = 2 and t = 4.", zero: "Integrates velocity without absolute value." },
      { label: "(b) Distance value", points: 1, expect: "final-answer", note: "Evaluated distance", full: "Evaluates to 13 metres (accept 13.0).", zero: "No value." },
      { label: "(c) Acceleration", points: 1, expect: "numeric-work", note: "a(1) computed", full: "a(t) = 2t − 6, so a(1) = −4 m/s².", zero: "No acceleration computed." },
      { label: "(c) Description", points: 1, expect: "justification", note: "Interpretation of signs", full: "States that at t = 1 the velocity is positive and the acceleration negative, so the particle is moving right and slowing down.", zero: "No interpretation." },
      { label: "(d) Position", points: 2, expect: "numeric-work", note: "Integral of velocity plus the initial condition", full: "x(5) = 3 + ∫₀⁵ v(t) dt = 3 + 20/3 = 29/3.", zero: "No accumulation or initial condition included." },
    ]),
    points: 9,
    coach: {
      task: "Particle motion: rest points, total distance (absolute value), acceleration, and position.",
      timeline: [
        { label: "Factor the velocity", minutes: 3, detail: "Roots give the sign intervals." },
        { label: "Sign analysis", minutes: 4, detail: "Positive and negative velocity intervals determine the direction." },
        { label: "Integrate", minutes: 6, detail: "Distance is the integral of speed; position is the integral of velocity from the start." },
        { label: "Check", minutes: 2, detail: "Distance cannot be less than |displacement|." },
      ],
      steps: [
        { title: "Rest means v = 0", detail: "Factor rather than using the quadratic formula where possible." },
        { title: "Total distance uses speed", detail: "Integrate |v|, which means splitting at the roots and flipping the sign on negative intervals." },
        { title: "Acceleration is v′", detail: "Differentiate, then interpret the signs together." },
        { title: "Position accumulates velocity", detail: "x(5) = x(0) + ∫v dt; do not forget x(0)." },
      ],
      evidence: ["Show the sign chart or the split integrals.", "Give units on displacement and distance."],
      argument: ["A common error is treating displacement as distance; the rubric separates them."],
      frames: ["v(t) = 0 at t = ___, so ___.", "The distance is ∫___ + ∫___ = ___.", "Since v(1) ___ and a(1) ___, the particle ___."],
      pitfalls: ["Integrating v for distance.", "Forgetting x(0).", "Sign errors in the split integrals."],
    },
    modelPath: ["(a) v = (t − 2)(t − 4), so t = 2 and t = 4.", "(b) |∫₀²| + |∫₂⁴| + |∫₄⁵| = 13 m.", "(c) a(1) = −4 m/s²; velocity is positive, so the particle moves right and slows.", "(d) x(5) = 3 + ∫₀⁵ v dt = 29/3."],
  },
  {
    id: "ap-calc-frq-6",
    taskType: "Free Response · No Calculator",
    title: "Question 6 · Function analysis from a derivative graph",
    prompt:
      "The function g is defined on [−4, 4]. Its derivative g′ is continuous, and the graph of g′ is a straight line from (−4, −3) to (2, 3) and then a straight line from (2, 3) to (4, 0). It is given that g(0) = 1.\n\n(a) Find all x in (−4, 4) where g has a local minimum. Justify your answer.\n(b) Find the intervals on which g is concave down. Justify your answer.\n(c) Find the absolute maximum value of g on [−4, 4].\n(d) Find the value of g(4).",
    minutes: 15,
    rubricId: "calc-frq-6",
    rubric: calcRubric("calc-frq-6", "Curve analysis · 9-point rubric", [
      { label: "(a) Local minimum", points: 2, expect: "line-of-reasoning", note: "Sign change of g′ from negative to positive", full: "Identifies x = −4? correctly excludes endpoints; finds the sign change at x = 0? — accepts the interior sign change with justification.", zero: "No sign-change justification." },
      { label: "(b) Concavity", points: 2, expect: "justification", note: "g′ decreasing where g is concave down", full: "States that g is concave down where g′ is decreasing, on (2, 4).", zero: "Concavity asserted without derivative evidence." },
      { label: "(c) Candidates", points: 2, expect: "numeric-work", note: "Accumulation from the areas under g′", full: "Computes g at the critical points and endpoints using signed areas: the maximum occurs where accumulated area is greatest.", zero: "No candidate comparison." },
      { label: "(c) Value", points: 1, expect: "final-answer", note: "Absolute maximum identified with its value", full: "Identifies the correct x and value.", zero: "No value." },
      { label: "(d) g(4)", points: 2, expect: "numeric-work", note: "Signed-area accumulation from x = 0", full: "Adds the signed area from 0 to 4 to g(0) and gives the resulting value.", zero: "No accumulation." },
    ]),
    points: 9,
    coach: {
      task: "Read a derivative graph: extrema, concavity, absolute maximum, and an accumulated value.",
      timeline: [
        { label: "Zeros of g′", minutes: 3, detail: "Mark where g′ crosses the axis." },
        { label: "Sign and slope of g′", minutes: 4, detail: "Sign gives increasing/decreasing; slope gives concavity." },
        { label: "Areas", minutes: 6, detail: "Compute signed areas of triangles and add from the known value." },
        { label: "Check", minutes: 2, detail: "Compare every candidate: endpoints and critical points." },
      ],
      steps: [
        { title: "Extrema are sign changes", detail: "Negative to positive gives a local minimum; positive to negative gives a local maximum." },
        { title: "Concavity uses the slope of g′", detail: "g is concave down where g′ decreases." },
        { title: "Absolute maximum needs all candidates", detail: "Critical points and endpoints; compare accumulated values." },
        { title: "Accumulate signed areas", detail: "g(b) − g(a) is the signed area under g′ from a to b." },
      ],
      evidence: ["State the theorem you are using.", "Show the area computation, including negative areas."],
      argument: ["Every claim must be justified from g′, not from the value of g itself."],
      frames: ["g′ changes from ___ to ___ at x = ___, so g has a local ___.", "g is concave down on ___ because g′ is ___.", "The signed area from 0 to 4 is ___, so g(4) = ___."],
      pitfalls: ["Confusing g with g′.", "Using only critical points for the absolute maximum.", "Ignoring negative area."],
    },
    modelPath: ["(a) The interior sign change from negative to positive gives the local minimum.", "(b) g′ decreases on (2, 4), so g is concave down there.", "(c) Compare accumulated values at critical points and endpoints.", "(d) g(4) = g(0) + signed area from 0 to 4."],
  },
];

/* ------------------------------------------------------------------ */
/* AP Macroeconomics                                                   */
/* ------------------------------------------------------------------ */

export const macroFrqs: ExamFrq[] = [
  {
    id: "ap-macro-frq-1",
    taskType: "Long Free Response",
    title: "Question 1 · Recessionary gap and fiscal policy",
    prompt:
      "Assume the United States economy is in short-run equilibrium below full employment. The marginal propensity to consume is 0.8.\n\n(a) Draw a correctly labelled aggregate demand–aggregate supply graph showing the current equilibrium, labelling the recessionary gap.\n(b) Calculate the minimum change in government spending needed to close the gap if the gap is $200 billion. Show your work.\n(c) Explain how the spending change you calculated affects the loanable funds market and real interest rates.\n(d) Suppose instead the government cuts taxes by $200 billion. Calculate the change in aggregate demand this produces, and explain why a $200 billion tax cut has a different effect from a $200 billion increase in government spending.",
    minutes: 30,
    rubricId: "macro-frq-1",
    rubric: partsRubric(
      "macro-frq-1",
      "Fiscal policy · 10-point rubric",
      "Task-specific rows written to AP Macroeconomics free-response conventions.",
      [
        { label: "(a) AD–AS graph", points: 3, expect: "graph-labels", note: "Axes, AD, SRAS, LRAS, equilibrium, and the gap labelled", full: "Draws labelled price level and real GDP axes, downward-sloping AD, upward-sloping SRAS, vertical LRAS, and marks the equilibrium below LRAS with the gap identified.", zero: "Unlabelled graph, or no gap shown." },
        { label: "(b) Multiplier", points: 2, expect: "numeric-work", note: "1/(1 − MPC) computed", full: "Calculates 1/(1 − 0.8) = 5.", zero: "No multiplier or an inverted formula." },
        { label: "(b) Spending change", points: 1, expect: "final-answer", note: "Gap divided by the multiplier with direction", full: "States an increase of $40 billion.", zero: "No value or the wrong direction." },
        { label: "(c) Loanable funds", points: 2, expect: "line-of-reasoning", note: "Demand shift, interest rate effect, crowding out", full: "Explains that government borrowing increases demand for loanable funds, raising the real interest rate and reducing private investment.", zero: "No mechanism or no interest-rate effect." },
        { label: "(d) Tax multiplier", points: 2, expect: "justification", note: "Tax multiplier is smaller in magnitude", full: "Computes the tax multiplier −MPC/(1 − MPC) = −4, so a $200 billion cut raises aggregate demand by $800 billion, and explains that the effect differs from spending because the first increment of a tax cut is partly saved (0.8 × $200 = $160 billion of new consumption).", zero: "Asserts that taxes do not work, with no multiplier reasoning." },
      ],
    ),
    points: 10,
    coach: {
      task: "A ten-point macro question: graph, multiplier arithmetic, loanable funds, and a comparison of policy tools.",
      timeline: [
        { label: "Graph", minutes: 8, detail: "Axes, three curves, equilibrium, and the gap." },
        { label: "Calculate", minutes: 8, detail: "Multiplier, then policy size, then direction." },
        { label: "Explain", minutes: 10, detail: "Loanable funds mechanism and tax-multiplier comparison." },
        { label: "Check", minutes: 4, detail: "Labels, units, and whether every part is answered." },
      ],
      steps: [
        { title: "Label the graph before shifting", detail: "Price level vertical, real GDP horizontal, AD, SRAS, LRAS." },
        { title: "Compute the multiplier first", detail: "1/(1 − 0.8) = 5, then gap ÷ multiplier." },
        { title: "Trace crowding out", detail: "Borrowing → demand for loanable funds → real interest rate → investment." },
        { title: "Compare multipliers", detail: "The tax multiplier is smaller than the spending multiplier because some of a tax cut is saved." },
      ],
      evidence: ["Every graph needs labelled axes and a marked new equilibrium.", "Every number needs units: billions of dollars."],
      argument: ["Explain the mechanism, not just the direction of the shift."],
      frames: ["The spending multiplier is 1/(1 − MPC) = ___.", "A $___ billion increase in government spending shifts AD right by ___.", "Government borrowing shifts ___ to the ___, raising ___."],
      pitfalls: ["Shifting SRAS for a demand policy.", "Forgetting to label the gap.", "Treating the tax multiplier as equal to the spending multiplier."],
    },
    modelPath: ["(a) AD shifts right from AD₁ to AD₂, moving equilibrium toward LRAS.", "(b) Multiplier = 5; $200B ÷ 5 = $40B increase in spending.", "(c) Deficit borrowing raises demand for loanable funds, pushing real interest rates up and crowding out some investment.", "(d) The tax multiplier is −0.8/0.2 = −4, so a $200 billion tax cut raises aggregate demand by $800 billion; it is smaller per dollar than the spending multiplier of 5 because households save 20% of the cut, so the first round adds only $160 billion of consumption."],
  },
  {
    id: "ap-macro-frq-2",
    taskType: "Short Free Response",
    title: "Question 2 · Monetary policy",
    prompt:
      "Assume the economy is operating above full employment and the central bank uses open-market operations.\n\n(a) Draw a correctly labelled money market graph and show the effect of the central bank's action.\n(b) Explain how the change in the nominal interest rate affects investment and aggregate demand.\n(c) Explain one limitation of monetary policy in this situation.",
    minutes: 15,
    rubricId: "macro-frq-2",
    rubric: partsRubric(
      "macro-frq-2",
      "Monetary policy · 5-point rubric",
      "Task-specific rows written to AP Macroeconomics free-response conventions.",
      [
        { label: "(a) Money market graph", points: 2, expect: "graph-labels", note: "Nominal rate axis, MS shift, new equilibrium", full: "Draws a vertical money supply curve shifting left, with the nominal interest rate rising to a new equilibrium.", zero: "Unlabelled or unshifted graph." },
        { label: "(b) Transmission", points: 2, expect: "line-of-reasoning", note: "Interest rate to investment to AD", full: "Explains that a higher interest rate reduces investment, which reduces aggregate demand and closes the inflationary gap.", zero: "No transmission mechanism." },
        { label: "(c) Limitation", points: 1, expect: "qualification", note: "A named limit with a reason", full: "Explains a limitation such as lags, the liquidity trap, or the inability to target a specific sector.", zero: "No limitation or no reason." },
      ],
    ),
    points: 5,
    coach: {
      task: "A short macro question: money market graph, transmission mechanism, and a limitation.",
      timeline: [
        { label: "Graph", minutes: 4, detail: "Vertical MS, downward MD, new equilibrium." },
        { label: "Explain", minutes: 7, detail: "Nominal rate → investment → AD → output." },
        { label: "Limit", minutes: 4, detail: "One named limitation with a reason." },
      ],
      steps: [
        { title: "Do not shift money demand", detail: "Open-market sales shift money supply, not demand." },
        { title: "Keep the chain explicit", detail: "Rate up → investment down → AD left → price level down." },
        { title: "Name the limitation precisely", detail: "Recognition lag, impact lag, or liquidity trap." },
      ],
      evidence: ["Label the nominal interest rate on the vertical axis.", "State the direction of every shift."],
      argument: ["Mechanism earns both transmission points."],
      frames: ["A sale of bonds shifts MS ___, raising the nominal rate to ___.", "Higher rates reduce ___, shifting AD ___.", "One limit is ___, because ___."],
      pitfalls: ["Shifting the money demand curve.", "Mixing real and nominal rates on the graph."],
    },
    modelPath: ["(a) MS shifts left, nominal interest rate rises.", "(b) Higher rates reduce investment, reducing AD and closing the inflationary gap.", "(c) Policy lags mean the tightening may take effect after the economy has already slowed."],
  },
  {
    id: "ap-macro-frq-3",
    taskType: "Short Free Response",
    title: "Question 3 · Foreign exchange",
    prompt:
      "Real interest rates in the United States rise relative to those in the euro area.\n\n(a) Draw a correctly labelled foreign exchange market for dollars, showing the effect on the exchange rate.\n(b) Explain how the change in the dollar's value affects net exports.\n(c) Explain how the change in net exports feeds back into aggregate demand and the price level.",
    minutes: 15,
    rubricId: "macro-frq-3",
    rubric: partsRubric(
      "macro-frq-3",
      "Foreign exchange · 5-point rubric",
      "Task-specific rows written to AP Macroeconomics free-response conventions.",
      [
        { label: "(a) Forex graph", points: 2, expect: "graph-labels", note: "Dollar demand shift and appreciation", full: "Draws the price of dollars in euros against quantity, shifting demand for dollars right and showing an appreciated exchange rate.", zero: "Unlabelled graph or no shift." },
        { label: "(b) Net exports", points: 2, expect: "line-of-reasoning", note: "Appreciation makes exports dearer and imports cheaper", full: "Explains that an appreciated dollar raises the foreign price of US exports and lowers the domestic price of imports, reducing net exports.", zero: "Direction with no reasoning." },
        { label: "(c) Feedback", points: 1, expect: "justification", note: "AD shifts left with a price-level consequence", full: "Explains that falling net exports shift aggregate demand left, lowering real output and the price level.", zero: "No feedback described." },
      ],
    ),
    points: 5,
    coach: {
      task: "Foreign exchange: draw the market, trace the effect on trade, then feed it back into AD.",
      timeline: [
        { label: "Graph", minutes: 4, detail: "Price of dollars in euros, quantity of dollars; shift demand." },
        { label: "Trade", minutes: 6, detail: "Exports and imports with a price mechanism." },
        { label: "Feedback", minutes: 5, detail: "Net exports and AD." },
      ],
      steps: [
        { title: "Higher relative rates attract capital", detail: "Demand for dollars rises, so the dollar appreciates." },
        { title: "Price the exports", detail: "An appreciated dollar makes US goods more expensive abroad and foreign goods cheaper in the US." },
        { title: "Close the loop", detail: "Net exports are a component of AD, so a fall shifts AD left." },
      ],
      evidence: ["Label both axes of the forex graph.", "State the currency whose price is on the axis."],
      argument: ["Each part is scored separately; the graph and the mechanism both matter."],
      frames: ["The demand for dollars shifts ___ because ___.", "An appreciated dollar makes ___, so net exports ___.", "Because net exports are part of AD, ___."],
      pitfalls: ["Confusing appreciation and depreciation.", "Graphing the euro market while discussing dollars."],
    },
    modelPath: ["(a) Demand for dollars shifts right; the dollar appreciates.", "(b) Exports become more expensive abroad, imports become cheaper, so net exports fall.", "(c) AD shifts left, lowering real GDP and the price level."],
  },
];

/* ------------------------------------------------------------------ */
/* AP Environmental Science                                            */
/* ------------------------------------------------------------------ */

export const envFrqs: ExamFrq[] = [
  {
    id: "ap-env-frq-1",
    taskType: "Investigation Design",
    title: "Question 1 · Design an investigation",
    prompt:
      "A town's lake has shown increasing algal blooms near a new housing development. Residents suspect runoff from lawns and septic systems.\n\n(a) Identify one water-quality variable that would indicate nutrient pollution, and describe how it would be measured.\n(b) Describe an investigation that would test whether the development is the source of the nutrients, including a control and one variable held constant.\n(c) Identify one environmental consequence of continued nutrient loading, and explain the mechanism that produces it.\n(d) Propose one management strategy and explain how it would reduce the loading.",
    minutes: 23,
    rubricId: "env-frq-1",
    rubric: partsRubric(
      "env-frq-1",
      "Investigation design · 9-point rubric",
      "Task-specific rows written to AP Environmental Science free-response conventions.",
      [
        { label: "(a) Indicator and method", points: 2, expect: "experimental-design", note: "Named variable plus measurement method", full: "Identifies nitrate or phosphate concentration and describes measuring it with a test kit or spectrophotometer at multiple sites.", zero: "Vague indicator or no method." },
        { label: "(b) Design", points: 3, expect: "experimental-design", note: "Comparison sites, control, and a constant", full: "Compares nutrient concentrations upstream of the development (control) with sites adjacent to it, holding sampling depth and season constant, with replicate samples.", zero: "No control or no comparison." },
        { label: "(c) Consequence and mechanism", points: 2, expect: "justification", note: "Eutrophication chain with oxygen depletion", full: "Explains that nutrients drive algal growth, whose decomposition consumes dissolved oxygen, producing hypoxic conditions and fish kills.", zero: "Names a consequence without the mechanism." },
        { label: "(d) Strategy", points: 2, expect: "justification", note: "A specific strategy with a reduction mechanism", full: "Proposes riparian buffers or upgraded septic systems, explaining that they intercept or treat nutrients before they reach the lake.", zero: "A general appeal without a mechanism." },
      ],
    ),
    points: 9,
    coach: {
      task: "Design an investigation with real variables, then explain a mechanism and justify a management strategy.",
      timeline: [
        { label: "Plan variables", minutes: 6, detail: "Indicator, method, control, constant, replicates." },
        { label: "Write design", minutes: 8, detail: "One paragraph that a reader could repeat." },
        { label: "Explain and propose", minutes: 9, detail: "Mechanism chain, then a strategy with a reduction mechanism." },
      ],
      steps: [
        { title: "Choose a measurable nutrient", detail: "Nitrate or phosphate concentration, with units (mg/L)." },
        { title: "Use an upstream control", detail: "A reference site unaffected by the development." },
        { title: "Chain the eutrophication mechanism", detail: "Nutrients → algae → decomposition → oxygen depletion → hypoxia." },
        { title: "Justify the strategy", detail: "Say what it intercepts and why that reduces loading." },
      ],
      evidence: ["Name units for every measurement.", "Say what is held constant and why."],
      argument: ["Mechanism earns the explanation point; a strategy alone does not."],
      frames: ["Nitrate concentration will be measured in mg/L using ___.", "Sites downstream of the development will be compared with ___, holding ___ constant.", "The loading will produce ___, because ___.", "A ___ would reduce loading by ___."],
      pitfalls: ["Confusing a control with a constant.", "Naming eutrophication without the oxygen mechanism.", "A management strategy with no mechanism."],
    },
    modelPath: ["(a) Nitrate concentration in mg/L, measured with a spectrophotometer at fixed depth.", "(b) Compare an upstream reference site with sites bordering the development, with replicate samples at the same depth and season.", "(c) Eutrophication: nutrients stimulate algae, decomposition consumes dissolved oxygen, and hypoxic water kills fish.", "(d) Riparian buffers filter runoff before it reaches the lake."],
  },
  {
    id: "ap-env-frq-2",
    taskType: "Problem Analysis",
    title: "Question 2 · Analyse an environmental problem",
    prompt:
      "A region generates 4,800 GWh of electricity per year from a mix of coal (60%), natural gas (25%), and wind (15%). Coal emits about 1,000 g CO₂ per kWh and natural gas about 450 g CO₂ per kWh.\n\n(a) Calculate the annual CO₂ emissions from coal generation in million tonnes. Show your work.\n(b) Calculate the CO₂ intensity of the region's electricity mix in g CO₂ per kWh.\n(c) Describe one environmental impact of coal combustion other than CO₂, and explain its mechanism.\n(d) Describe one reason the region might not immediately replace coal with wind, and one policy that could address it.",
    minutes: 23,
    rubricId: "env-frq-2",
    rubric: partsRubric(
      "env-frq-2",
      "Energy and emissions · 9-point rubric",
      "Task-specific rows written to AP Environmental Science free-response conventions.",
      [
        { label: "(a) Coal emissions", points: 3, expect: "numeric-work", note: "Unit conversion and correct result", full: "Coal generation is 2,880 GWh = 2.88 × 10⁹ kWh; at 1,000 g/kWh this is 2.88 million tonnes CO₂.", zero: "No conversion or wrong magnitude." },
        { label: "(b) Mix intensity", points: 2, expect: "numeric-work", note: "Weighted average computed", full: "0.60(1,000) + 0.25(450) + 0.15(0) = 712.5 g CO₂/kWh.", zero: "Unweighted average or no calculation." },
        { label: "(c) Impact and mechanism", points: 2, expect: "justification", note: "A named pollutant with a mechanism", full: "Explains that SO₂ and NOₓ from coal form sulfuric and nitric acids, producing acid deposition that acidifies soils and water.", zero: "A pollutant named without a mechanism." },
        { label: "(d) Barrier and policy", points: 2, expect: "qualification", note: "A specific barrier plus a plausible policy", full: "Explains intermittency and transmission costs, then proposes storage investment, grid expansion, or a capacity market.", zero: "A barrier or policy that is not specific." },
      ],
    ),
    points: 9,
    coach: {
      task: "Quantitative energy analysis, a pollution mechanism, and a policy judgement.",
      timeline: [
        { label: "Convert units", minutes: 6, detail: "GWh to kWh, grams to tonnes." },
        { label: "Calculate", minutes: 8, detail: "Weighted average for intensity." },
        { label: "Explain and propose", minutes: 9, detail: "Mechanism and a specific barrier with a policy." },
      ],
      steps: [
        { title: "Convert before multiplying", detail: "1 GWh = 10⁶ kWh; 1 tonne = 10⁶ g." },
        { title: "Weight the average", detail: "Multiply each share by its intensity, then add." },
        { title: "Name the pollutant pathway", detail: "SO₂ and NOₓ → sulfuric and nitric acid → deposition." },
        { title: "Address the real barrier", detail: "Intermittency, transmission, or capital cost, then a policy that targets it." },
      ],
      evidence: ["Show conversions explicitly.", "Give units in every answer."],
      argument: ["Policy answers need a mechanism, not an opinion."],
      frames: ["2,880 GWh = ___ kWh, so emissions are ___ tonnes.", "The weighted intensity is 0.60(___) + 0.25(___) = ___ g/kWh.", "Coal also emits ___, which ___."],
      pitfalls: ["Forgetting the GWh-to-kWh conversion.", "Averaging the three intensities without weights.", "Confusing acid deposition with ozone depletion."],
    },
    modelPath: ["(a) 2,880 GWh = 2.88 × 10⁹ kWh → 2.88 million tonnes CO₂.", "(b) 712.5 g CO₂/kWh.", "(c) SO₂ and NOₓ form acids that acidify soils and surface water.", "(d) Intermittency is a barrier; storage and transmission investment, or a capacity market, would address it."],
  },
  {
    id: "ap-env-frq-3",
    taskType: "Solution and Justification",
    title: "Question 3 · Propose and justify a solution",
    prompt:
      "A coastal city of 900,000 people sends 1,100 tonnes of municipal solid waste to landfill each day.\n\n(a) Calculate the annual per-capita waste generation in kilograms. Show your work.\n(b) Describe one environmental problem caused by landfilling this waste, and explain its mechanism.\n(c) Propose one strategy to reduce landfilled waste, and justify it with an environmental and an economic reason.\n(d) Identify one limitation of your strategy and explain how it could be mitigated.",
    minutes: 24,
    rubricId: "env-frq-3",
    rubric: partsRubric(
      "env-frq-3",
      "Waste management · 9-point rubric",
      "Task-specific rows written to AP Environmental Science free-response conventions.",
      [
        { label: "(a) Per-capita waste", points: 3, expect: "numeric-work", note: "Annual total divided by population, in kg", full: "1,100 t/day × 365 = 401,500 t/year = 4.015 × 10⁸ kg; ÷ 900,000 = about 446 kg per person per year.", zero: "No conversion to kilograms or no annualisation." },
        { label: "(b) Problem", points: 2, expect: "justification", note: "A named problem with a mechanism", full: "Explains that anaerobic decomposition produces methane, a potent greenhouse gas, and that leachate can contaminate groundwater.", zero: "A problem named without a mechanism." },
        { label: "(c) Strategy with two reasons", points: 2, expect: "justification", note: "Environmental and economic justification", full: "Proposes source separation and composting, reducing methane and landfill tipping costs while producing soil amendment.", zero: "Only one reason, or no mechanism." },
        { label: "(d) Limitation and mitigation", points: 2, expect: "qualification", note: "A real limitation plus a mitigation", full: "Notes contamination in compost streams or participation rates, and proposes education, collection design, or contamination standards.", zero: "No limitation or no mitigation." },
      ],
    ),
    points: 9,
    coach: {
      task: "A calculation, a mechanism, a justified solution, and an honest limitation.",
      timeline: [
        { label: "Calculate", minutes: 6, detail: "Daily to annual to per-capita, in kilograms." },
        { label: "Explain the problem", minutes: 7, detail: "Methane and leachate mechanisms." },
        { label: "Propose and qualify", minutes: 11, detail: "Strategy, two reasons, one limitation, one mitigation." },
      ],
      steps: [
        { title: "Convert tonnes to kilograms", detail: "1 tonne = 1,000 kg." },
        { title: "Show the chain", detail: "Daily → annual → per capita." },
        { title: "Justify with two currencies", detail: "One environmental reason and one economic reason." },
        { title: "Name the limitation honestly", detail: "A proposal with a limitation is stronger than a perfect-sounding one." },
      ],
      evidence: ["Show the annualisation step.", "Give units for the per-capita figure."],
      argument: ["Every 'justify' needs a because; every limitation needs a mitigation."],
      frames: ["1,100 t/day × 365 = ___ t/year = ___ kg/year.", "Landfilled waste produces ___ through ___.", "This strategy is justified because it ___ and it ___.", "Its main limitation is ___, which could be mitigated by ___."],
      pitfalls: ["Omitting the 365-day annualisation.", "Giving only an environmental reason.", "A limitation with no mitigation."],
    },
    modelPath: ["(a) 1,100 × 365 = 401,500 t = 4.015 × 10⁸ kg; ÷ 900,000 ≈ 446 kg per person per year.", "(b) Anaerobic decomposition releases methane; leachate can carry contaminants into groundwater.", "(c) Source separation and composting reduce methane and tipping fees while producing a soil amendment.", "(d) Contamination of compost streams is a limitation; separate collection and contamination standards mitigate it."],
  },
];

/* ------------------------------------------------------------------ */
/* AP Research                                                         */
/* ------------------------------------------------------------------ */

export const researchFrqs: ExamFrq[] = [
  {
    id: "ap-research-paper",
    taskType: "Academic Paper Section",
    title: "Component 1 · Method, analysis, and limitations",
    prompt:
      "Write the method, analysis, and limitations section of your academic paper. State your research question first, then:\n\n(a) describe and justify the method, including the evidence or data you used;\n(b) explain your analytic process and what it produced;\n(c) evaluate the strength of the evidence and state at least one limitation;\n(d) state what your findings do and do not allow you to conclude.",
    directions:
      "Write in the register of an academic paper, with citations where you would cite. This is a rehearsal of the portfolio, not a timed exam.",
    minutes: 90,
    rubricId: "research-paper",
    rubric: researchPaperRubric,
    points: 24,
    coach: {
      task: "Write one section of the academic paper so that a reader could evaluate the question, the method, and the limits of the findings.",
      timeline: [
        { label: "Restate the question", minutes: 10, detail: "Copy your research question and check the section answers part of it." },
        { label: "Plan the section", minutes: 20, detail: "One claim per paragraph, each tied to method or evidence." },
        { label: "Draft", minutes: 45, detail: "Method, analysis, limitations, conclusion." },
        { label: "Revise", minutes: 15, detail: "Every claim traceable; every limitation stated where it occurs." },
      ],
      steps: [
        { title: "Justify method choices", detail: "Why this design, this sample, this instrument?" },
        { title: "Separate results from interpretation", detail: "Report what you found, then what you make of it." },
        { title: "State limitations as limits on inference", detail: "Not modesty — precision about what the evidence supports." },
        { title: "Answer the question explicitly", detail: "The conclusion should say what the study establishes." },
      ],
      evidence: ["Cite sources and your own data.", "Give sample sizes and instruments."],
      argument: ["Method → evidence → interpretation → limitation → next question.", "Distinguish finding from hope."],
      frames: ["This study used ___ in order to ___, because ___.", "The results suggest ___, although ___ limits the inference.", "A follow-up study could isolate ___ by ___."],
      pitfalls: ["Reporting results without interpretation.", "Overgeneralising beyond the sample.", "Limitations omitted or tacked on."],
    },
    modelPath: ["State the research question and purpose.", "Describe the method and justify each choice.", "Report the analysis and interpret it against the question.", "State limitations as limits on inference, then the conclusion."],
  },
  {
    id: "ap-research-defence",
    taskType: "Presentation and Oral Defence",
    title: "Component 2 · Presentation script and defence",
    prompt:
      "Write the script for a six-minute presentation of your research, then answer both defence questions in full sentences:\n\nQuestion 1: What was the most significant limitation of your method, and how did it shape your conclusions?\nQuestion 2: How does your project connect to a larger conversation in the field, and what would you study next?",
    minutes: 30,
    rubricId: "research-paper",
    rubric: researchPaperRubric,
    points: 24,
    coach: {
      task: "Write a spoken script that a panel can follow, then answer the two defence questions with the specificity of the paper.",
      timeline: [
        { label: "Plan the arc", minutes: 8, detail: "Question, gap, method, finding, limitation, next step." },
        { label: "Write the script", minutes: 12, detail: "Speakable sentences; define terms; signpost the argument." },
        { label: "Answer the questions", minutes: 10, detail: "Two paragraphs, each with a claim and a reason." },
      ],
      steps: [
        { title: "Open with the question, not the topic", detail: "The panel needs your question in the first thirty seconds." },
        { title: "Name the contribution", detail: "What does your project add that the sources did not?" },
        { title: "Answer defence questions directly", detail: "First sentence answers; the rest justifies." },
      ],
      evidence: ["Give one number or finding in the script.", "Refer to sources by author."],
      argument: ["Every spoken paragraph needs a claim and a reason."],
      frames: ["My research asked whether ___.", "The most significant limitation was ___, which means ___.", "This connects to ___ because ___."],
      pitfalls: ["Reading a paper aloud instead of presenting.", "A defence answer that never states a limitation."],
    },
    modelPath: ["Script: question, gap, method, finding, limitation, implication.", "Defence 1: name the limitation and its effect on the conclusion.", "Defence 2: name the scholarly conversation and the next study."],
  },
];

export const authoredFrqs: ExamFrq[] = [
  ...apushFrqs,
  ...govFrqs,
  ...bioFrqs,
  ...calcFrqs,
  ...macroFrqs,
  ...envFrqs,
  ...researchFrqs,
];

export { partsRubric };
