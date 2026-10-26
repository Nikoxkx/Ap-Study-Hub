import type { SubjectSlug } from "@/lib/subjects";

export interface CourseConnection {
  id: string;
  from: { courseSlug: SubjectSlug; unitNumber: number };
  to: { courseSlug: SubjectSlug; unitNumber: number };
  title: string;
  explanation: string;
}

/** Cross-course links are curriculum relationships, not decorative course chips. */
export const courseConnections: CourseConnection[] = [
  { id: "declaration-founding", from: { courseSlug: "apush", unitNumber: 3 }, to: { courseSlug: "ap-gov", unitNumber: 1 }, title: "Natural rights → constitutional design", explanation: "Trace the Declaration's claims about consent and legitimate power into the Constitution's structures and later arguments about federalism." },
  { id: "reconstruction-rights", from: { courseSlug: "apush", unitNumber: 5 }, to: { courseSlug: "ap-gov", unitNumber: 3 }, title: "Reconstruction Amendments → civil rights doctrine", explanation: "The historical struggle over Reconstruction supplies essential context for equal protection, incorporation, and later Supreme Court cases." },
  { id: "derivative-population", from: { courseSlug: "ap-calc", unitNumber: 2 }, to: { courseSlug: "ap-bio", unitNumber: 8 }, title: "Rate of change → population growth", explanation: "dN/dt is an instantaneous rate. The derivative's meaning remains the same even when the variables describe individuals and time rather than position." },
  { id: "accumulation-energetics", from: { courseSlug: "ap-calc", unitNumber: 6 }, to: { courseSlug: "ap-bio", unitNumber: 3 }, title: "Accumulation → changing biological systems", explanation: "An accumulated net rate gives total change. That way of thinking helps distinguish a process rate from the amount present at a particular time." },
  { id: "logistic-model", from: { courseSlug: "ap-calc", unitNumber: 7 }, to: { courseSlug: "ap-bio", unitNumber: 8 }, title: "Differential equations → logistic growth", explanation: "The logistic model uses a rate that depends on the current population and carrying capacity; compare its predictions with actual ecological data." },
  { id: "evidence-commentary", from: { courseSlug: "ap-lang", unitNumber: 3 }, to: { courseSlug: "ap-seminar", unitNumber: 4 }, title: "Warrant → line of reasoning", explanation: "In both courses, evidence needs commentary that explains how it supports a claim. A quotation without that link is not yet synthesis." },
  { id: "rhetoric-presentation", from: { courseSlug: "ap-lang", unitNumber: 1 }, to: { courseSlug: "ap-seminar", unitNumber: 5 }, title: "Rhetorical situation → presentation choices", explanation: "Audience, purpose, context, and speaker should shape evidence selection, visual design, pace, and delivery." },
  { id: "inquiry-question", from: { courseSlug: "ap-seminar", unitNumber: 1 }, to: { courseSlug: "ap-research", unitNumber: 1 }, title: "Inquiry → focused research question", explanation: "Seminar's question-and-explore process becomes a bounded, researchable question with a feasible method in Research." },
  { id: "methods-synthesis", from: { courseSlug: "ap-research", unitNumber: 2 }, to: { courseSlug: "ap-seminar", unitNumber: 2 }, title: "Methodological literacy → source evaluation", explanation: "Knowing sampling, validity, reliability, and limitations helps you evaluate what a source can establish rather than treating publication as proof." },
  { id: "defense-communication", from: { courseSlug: "ap-research", unitNumber: 5 }, to: { courseSlug: "ap-seminar", unitNumber: 5 }, title: "Oral defense → evidence under questioning", explanation: "Both defenses reward precise claims, direct answers, and honest acknowledgment of limits rather than memorized generalities." },
  { id: "depression-stabilization", from: { courseSlug: "apush", unitNumber: 7 }, to: { courseSlug: "ap-macro", unitNumber: 3 }, title: "Great Depression \u2192 stabilization policy", explanation: "The Depression and New Deal are the historical backdrop for AD-AS stabilization: a collapsing aggregate demand, a slow self-correction, and a permanent argument about fiscal intervention." },
  { id: "federal-reserve-institutions", from: { courseSlug: "ap-gov", unitNumber: 2 }, to: { courseSlug: "ap-macro", unitNumber: 4 }, title: "Independent agencies \u2192 monetary policy", explanation: "The Federal Reserve is an independent agency in the AP Gov sense and the central bank in the AP Macro sense. Its insulation from elections is exactly why it can raise interest rates when doing so is unpopular." },
  { id: "ecology-to-ecosystems", from: { courseSlug: "ap-bio", unitNumber: 8 }, to: { courseSlug: "ap-env", unitNumber: 1 }, title: "Ecology \u2192 ecosystem processes", explanation: "AP Bio's population and community ecology becomes applied in APES: the same energy flow, nutrient cycling, and interaction logic, now used to predict what a pollutant or land-use change will do." },
  { id: "biodiversity-to-global-change", from: { courseSlug: "ap-bio", unitNumber: 7 }, to: { courseSlug: "ap-env", unitNumber: 9 }, title: "Evolution \u2192 biodiversity under pressure", explanation: "Natural selection explains both why diverse gene pools buffer change and why rapid warming, fragmentation, and invasive species outpace adaptation for many specialists." },
  { id: "scarcity-to-commons", from: { courseSlug: "ap-macro", unitNumber: 1 }, to: { courseSlug: "ap-env", unitNumber: 5 }, title: "Scarcity \u2192 tragedy of the commons", explanation: "Macro's scarcity and opportunity cost are the engine of the commons problem: each user weighs a private benefit against a shared depletion cost, which is why quotas, rights, and prices are the remedies." },
];

export function getConnectionsFor(courseSlug: SubjectSlug | string): CourseConnection[] {
  return courseConnections.filter((connection) => connection.from.courseSlug === courseSlug || connection.to.courseSlug === courseSlug);
}
