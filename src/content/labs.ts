import type { SubjectSlug } from "@/lib/subjects";

interface LabBase {
  id: string;
  courseSlug: SubjectSlug;
  unitNumber: number;
  title: string;
  instructions: string;
}

export interface CalculusLab extends LabBase {
  kind: "calculus";
  model: "quadratic" | "sine";
  domain: [number, number];
}

export interface DataLab extends LabBase {
  kind: "data";
  context: string;
  columns: string[];
  rows: (string | number)[][];
  xLabel: string;
  yLabel: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  calculation: string;
}

export interface AnnotationLab extends LabBase {
  kind: "annotation";
  sourceTitle: string;
  sourceContext: string;
  prompt: string;
  tags: string[];
  segments: { id: string; text: string; annotation: string }[];
}

export interface MatchLab extends LabBase {
  kind: "match";
  principles: string[];
  cases: { id: string; name: string; holding: string; principle: string; explanation: string }[];
}

export interface MatrixLab extends LabBase {
  kind: "matrix";
  question: string;
  sources: { id: string; title: string; perspective: string; evidence: string; limitation: string }[];
  modelSynthesis: string;
}

export interface ResearchLab extends LabBase {
  kind: "research";
  questionTemplate: string;
  fields: { id: string; label: string; placeholder: string }[];
  defensePrompts: { id: string; category: string; prompt: string; listenFor: string }[];
  defenseCriteria: string[];
}

export type CourseLab = CalculusLab | DataLab | AnnotationLab | MatchLab | MatrixLab | ResearchLab;

/** Original interactive content; historical excerpts are public domain. */
export const courseLabs: CourseLab[] = [
  {
    id: "calc-quadratic-change", courseSlug: "ap-calc", unitNumber: 2, kind: "calculus",
    title: "See slope become accumulation", model: "quadratic", domain: [-4, 4],
    instructions: "Adjust a, h, and k, then move x. Compare the function, tangent slope, and signed accumulated area. The graph and every readout use the same parameters.",
  },
  {
    id: "calc-sine-accumulation", courseSlug: "ap-calc", unitNumber: 6, kind: "calculus",
    title: "Trace change on a sine model", model: "sine", domain: [-6.2832, 6.2832],
    instructions: "Adjust amplitude and frequency. In accumulation mode, signed area can cancel even while the curve itself stays visible.",
  },
  {
    id: "bio-dialysis-data", courseSlug: "ap-bio", unitNumber: 2, kind: "data",
    title: "Infer an isotonic point from mass change",
    context: "Constructed class data: identical dialysis bags began at 10.0 g and were placed in different sucrose solutions for 30 minutes. Only water crossed in measurable amounts.",
    instructions: "Read the trend, inspect the plotted sign change, then choose the best-supported conclusion.",
    columns: ["Sucrose (M)", "Final mass (g)", "Mass change (%)"],
    rows: [[0, 12, 20], [0.2, 11, 10], [0.4, 10, 0], [0.6, 9, -10], [0.8, 8, -20]],
    xLabel: "Sucrose concentration (M)", yLabel: "Mass change (%)",
    prompt: "Which conclusion is best supported by these data?",
    choices: ["The bag contents are approximately isotonic to 0.4 M sucrose.", "Water always moves from low to high water potential.", "Sucrose crossed faster at 0.8 M.", "The bags gained mass in every solution."],
    correctIndex: 0,
    explanation: "Net mass change is zero at 0.4 M in this constructed dataset. That supports an isotonic approximation under the stated conditions; it does not demonstrate sucrose movement or reverse the water-potential relationship.",
    calculation: String.raw`\%\Delta m=\frac{m_f-m_i}{m_i}\times100\%`,
  },
  {
    id: "bio-selection-data", courseSlug: "ap-bio", unitNumber: 7, kind: "data",
    title: "Evaluate allele frequencies across generations",
    context: "Constructed population model: a recessive phenotype is observed in the same large population over four samples. Assume the phenotype accurately identifies qq individuals.",
    instructions: "Look for a trend rather than treating one sample as proof of a mechanism.",
    columns: ["Sample", "qq frequency", "Estimated q"],
    rows: [[1, 0.25, 0.5], [2, 0.16, 0.4], [3, 0.09, 0.3], [4, 0.04, 0.2]],
    xLabel: "Sample", yLabel: "qq frequency",
    prompt: "What can reasonably be concluded from this pattern alone?",
    choices: ["The data are consistent with a changing allele frequency; the mechanism needs further evidence.", "Natural selection definitely caused every change.", "Mutation is the only possible explanation.", "The population remains in Hardy–Weinberg equilibrium because q changes."],
    correctIndex: 0,
    explanation: "The recessive phenotype frequency and inferred q decline together. Selection, migration, drift, mutation, or sampling processes could produce patterns; the table alone does not identify a cause.",
    calculation: String.raw`q^2=f(qq),\qquad q=\sqrt{f(qq)}`,
  },
  {
    id: "apush-declaration-annotation", courseSlug: "apush", unitNumber: 3, kind: "annotation",
    title: "Annotate an argument about legitimate government",
    sourceTitle: "Declaration of Independence (1776), public-domain excerpt",
    sourceContext: "The Second Continental Congress explained independence to domestic and international audiences.",
    instructions: "Select a highlighted passage, choose an analytical tag, and write your own note before comparing with the model annotation.",
    prompt: "How does this passage connect a political principle to a justification for action?",
    tags: ["Claim", "Enlightenment idea", "Audience", "Historical context", "Reasoning"],
    segments: [
      { id: "truths", text: "We hold these truths to be self-evident, that all men are created equal,", annotation: "The declarative opening presents equality as a foundational claim rather than a conclusion still being negotiated. Its universal language also invites analysis of who was excluded in practice." },
      { id: "rights", text: "that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.", annotation: "Natural-rights language locates rights beyond government grant. That premise supports the later claim that people may alter government." },
      { id: "consent", text: "That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed,", annotation: "This states popular sovereignty and limits legitimate power by consent. It supplies the criterion by which British rule is judged." },
      { id: "alter", text: "That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it,", annotation: "The conditional phrasing turns the preceding principles into a right of resistance when government violates its purpose. In a DBQ, connect this reasoning to the document's purpose rather than quoting it without commentary." },
    ],
  },
  {
    id: "lang-inaugural-annotation", courseSlug: "ap-lang", unitNumber: 1, kind: "annotation",
    title: "Trace rhetorical choices in a public address",
    sourceTitle: "Abraham Lincoln, Second Inaugural Address (1865), public-domain excerpt",
    sourceContext: "Lincoln delivered the address near the end of the Civil War, before an audience divided by the conflict.",
    instructions: "Select a phrase, identify the rhetorical choice, and explain its likely effect in context before revealing the model commentary.",
    prompt: "How do wording and structure shape the address's purpose?",
    tags: ["Diction", "Parallelism", "Tone", "Audience", "Purpose"],
    segments: [
      { id: "malice", text: "With malice toward none;", annotation: "The opening prepositional phrase rejects revenge through compressed, balanced diction. Beginning with 'malice' but negating it acknowledges anger while directing the audience away from it." },
      { id: "charity", text: "with charity for all;", annotation: "The repeated structure pairs with the preceding phrase. The shift from 'none' to 'all' widens the ethical appeal and creates a memorable antithesis." },
      { id: "firmness", text: "with firmness in the right, as God gives us to see the right,", annotation: "The phrase preserves conviction without claiming infallibility. The qualifying clause presents moral judgment as limited and received, tempering certainty with humility." },
      { id: "finish", text: "let us strive on to finish the work we are in; to bind up the nation's wounds;", annotation: "The inclusive 'us' and the movement from work to healing join continued resolve with reconciliation. The medical metaphor makes national repair a shared task." },
    ],
  },
  {
    id: "gov-case-principles", courseSlug: "ap-gov", unitNumber: 3, kind: "match",
    title: "Connect required cases to constitutional principles",
    instructions: "Choose the principle that best organizes each holding, then check every match and read the explanation.",
    principles: ["Judicial review", "Selective incorporation and due process", "Free speech", "Establishment Clause", "Equal protection", "Federalism"],
    cases: [
      { id: "marbury", name: "Marbury v. Madison (1803)", holding: "The Court declared part of a federal statute unconstitutional.", principle: "Judicial review", explanation: "Marbury establishes judicial review: courts can declare governmental acts unconstitutional." },
      { id: "gideon", name: "Gideon v. Wainwright (1963)", holding: "States must provide counsel to felony defendants who cannot afford it.", principle: "Selective incorporation and due process", explanation: "The Sixth Amendment right to counsel applies to the states through the Fourteenth Amendment's Due Process Clause." },
      { id: "tinker", name: "Tinker v. Des Moines (1969)", holding: "Student symbolic speech is protected unless it substantially disrupts school or invades others' rights.", principle: "Free speech", explanation: "Tinker applies First Amendment speech protection in the public-school setting, with a context-specific limit." },
      { id: "engel", name: "Engel v. Vitale (1962)", holding: "A state-composed prayer for voluntary recitation in public schools is unconstitutional.", principle: "Establishment Clause", explanation: "Engel concerns government sponsorship of prayer under the Establishment Clause, not a general ban on private religious expression." },
      { id: "brown", name: "Brown v. Board of Education (1954)", holding: "Racial segregation in public schools violates the Constitution.", principle: "Equal protection", explanation: "Brown applies the Fourteenth Amendment's Equal Protection Clause and rejects 'separate but equal' in public education." },
    ],
  },
  {
    id: "seminar-synthesis-matrix", courseSlug: "ap-seminar", unitNumber: 4, kind: "matrix",
    title: "Build a synthesis instead of a source list",
    question: "How should a city balance expanded public transit with concerns about cost and neighborhood change?",
    instructions: "The sources below are constructed for practice. Add a possible use and a limitation to your own line of reasoning, then compare with the synthesis model.",
    sources: [
      { id: "ridership", title: "Constructed Source A · Ridership evaluation", perspective: "Transit planners", evidence: "Ridership rose where frequent routes connected housing to employment centers.", limitation: "Two-year evaluation in one corridor; no long-term housing-cost analysis." },
      { id: "budget", title: "Constructed Source B · Budget analysis", perspective: "Municipal finance office", evidence: "Capital costs are concentrated early, while operating benefits and revenue arrive later.", limitation: "Depends on fare, grant, and maintenance assumptions." },
      { id: "residents", title: "Constructed Source C · Resident interviews", perspective: "Renters and neighborhood associations", evidence: "Residents value access but fear displacement and loss of local businesses.", limitation: "Small qualitative sample; not representative of every neighborhood." },
    ],
    modelSynthesis: "A defensible proposal can use Source A to support route design, Source B to justify phased funding and explicit assumptions, and Source C to require tenant and small-business protections. The sources do not merely agree: each changes what a responsible plan must include.",
  },
  {
    id: "research-question-defense", courseSlug: "ap-research", unitNumber: 1, kind: "research",
    title: "Refine the question, then rehearse the defense",
    instructions: "Build a focused question from your own project variables. Then rehearse a timed defense response and check the reasoning your answer actually contains.",
    questionTemplate: "How does {factor} affect {outcome} for {population} in {context}?",
    fields: [
      { id: "factor", label: "Factor or intervention", placeholder: "e.g. access to a school garden" },
      { id: "outcome", label: "Measurable outcome", placeholder: "e.g. self-reported dietary choice" },
      { id: "population", label: "Population or case", placeholder: "e.g. ninth-grade students" },
      { id: "context", label: "Bounded context", placeholder: "e.g. one public high school" },
    ],
    defensePrompts: [
      { id: "method", category: "Method", prompt: "Why was your method the best feasible way to answer this question, and what could it not establish?", listenFor: "A method–question link plus a specific limitation, not a list of generic weaknesses." },
      { id: "evidence", category: "Evidence", prompt: "Which result most strongly supports your conclusion, and what evidence complicates it?", listenFor: "Specific evidence, an interpretive link, and engagement with tension rather than only confirmation." },
      { id: "ethics", category: "Ethics", prompt: "Where did consent, privacy, representation, or potential harm shape your design?", listenFor: "Concrete safeguards and an explanation of why they mattered for these participants or materials." },
      { id: "scope", category: "Scope", prompt: "What is the furthest defensible generalization from your findings?", listenFor: "A bounded claim tied to the sample, context, and method." },
    ],
    defenseCriteria: ["Answer the panelist's question directly.", "Use a specific detail from the project.", "Explain the reasoning behind a choice or conclusion.", "Acknowledge a real limitation without dismissing the work."],
  },
];

export function getCourseLabs(courseSlug: SubjectSlug | string): CourseLab[] {
  return courseLabs.filter((lab) => lab.courseSlug === courseSlug);
}
