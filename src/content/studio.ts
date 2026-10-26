import type { SubjectSlug } from "@/lib/subjects";

export interface StudioSource {
  id: string;
  title: string;
  content: string;
}

export interface StudioTask {
  id: string;
  courseSlug: SubjectSlug;
  title: string;
  type: string;
  minutes: number;
  prompt: string;
  sources?: StudioSource[];
  criteria: string[];
  exemplar?: string;
  exemplarNote?: string;
}

/** Original tasks for courses not already covered by a timed-paper prompt. */
export const studioTasks: StudioTask[] = [
  {
    id: "env-investigation-design", courseSlug: "ap-env", title: "Design an investigation studio",
    type: "FRQ 1 practice · design an investigation", minutes: 25,
    prompt: "Students claim that fertilizer runoff from a school lawn is lowering dissolved oxygen in the pond behind the school. Design a laboratory or field investigation to test this claim. Identify the independent and dependent variables, name two controlled variables, describe the data you would collect, and state a result that would support the claim.",
    criteria: [
      "State a testable hypothesis linking fertilizer concentration to dissolved oxygen.",
      "Identify the manipulated variable (fertilizer or nutrient concentration) and the measured variable (dissolved oxygen).",
      "Hold at least two conditions constant, such as water volume, temperature, light, algae amount, and trial duration.",
      "Include replication or multiple concentration levels and a no-fertilizer control.",
      "Describe a supporting result in terms of the measured data, not a restated opinion.",
    ],
    exemplar: `Hypothesis: If pond water receives higher concentrations of fertilizer, then its dissolved oxygen will fall further over seven days, because nutrient enrichment feeds algal growth whose decomposition consumes oxygen.

I would set up twelve identical clear containers with the same volume of pond water and the same initial amount of algae. Four fertilizer concentrations (0, 1, 5, and 10 mg/L of nitrogen fertilizer) would each be assigned to three containers, giving replication at every level. All containers would sit under the same light cycle and at the same room temperature for seven days. The independent variable is the fertilizer concentration; the dependent variable is the dissolved oxygen concentration, measured with a dissolved oxygen probe at the same time each day. Controlled variables include water volume and source, algae quantity, container size, light, temperature, and measurement time.

The claim would be supported if the higher-fertilizer containers show a consistently larger drop in dissolved oxygen than the 0 mg/L control by day seven, with the decline increasing across concentration levels. A result in which all containers lose oxygen equally, or the control falls furthest, would not support the claim.`,
    exemplarNote: "One possible practice response, not an official scoring sample. Compare the variable identification, controls, replication, and the data-based support statement.",
  },
  {
    id: "macro-recession-frq", courseSlug: "ap-macro", title: "Recessionary-gap FRQ studio",
    type: "Long FRQ practice", minutes: 25,
    prompt: "The economy of Alderia is in short-run equilibrium with real GDP below potential output. The MPC is 0.75. (a) Draw a correctly labeled AD-AS graph showing the recessionary gap. (b) Calculate the minimum increase in government purchases needed to close a $120 billion gap. (c) Draw a money market graph showing what happens to the nominal interest rate as the economy expands, with no central-bank action. (d) Explain one reason the real-world effect could be smaller than your part (b) calculation.",
    criteria: [
      "Label the price level and real GDP axes, draw AD and SRAS, and place a vertical LRAS at potential output.",
      "Show current equilibrium output to the left of potential and identify the gap.",
      "Compute the multiplier as 1/(1 - 0.75) = 4 and divide the gap by it: $30 billion.",
      "Shift money demand right in the money market and show the nominal interest rate rising.",
      "Name a valid offset: crowding out through higher interest rates, implementation lags, or imports leaking demand abroad.",
    ],
    exemplar: `Part (a): The correctly labeled graph has the price level on the vertical axis and real GDP on the horizontal axis. AD and SRAS intersect at equilibrium output Ye, which lies to the left of the vertical LRAS at potential output Yp. The distance between Ye and Yp is the recessionary gap, and the equilibrium price level PLe sits at the height of the intersection.

Part (b): The spending multiplier is 1/(1 - 0.75) = 4. The minimum increase in government purchases is the gap divided by the multiplier: $120 billion / 4 = $30 billion.

Part (c): In the money market, the nominal interest rate is on the vertical axis and the quantity of money on the horizontal axis. The money supply is vertical and unchanged. Higher income raises the transactions demand for money, shifting money demand to the right, so the nominal interest rate rises.

Part (d): The calculated $30 billion assumes the simple multiplier works fully. In practice the rising nominal interest rate from part (c) raises borrowing costs and reduces interest-sensitive investment, crowding out part of the expansion, so the actual increase in real GDP would likely be smaller than $120 billion unless purchases rise by more.`,
    exemplarNote: "One possible practice response, not an official scoring sample. Compare the graph labels, the multiplier arithmetic, and the direction of each shift.",
  },
  {
    id: "gov-federalism-argument", courseSlug: "ap-gov", title: "Federalism argument studio",
    type: "Argument essay practice", minutes: 25,
    prompt: "Develop an argument about whether state governments or the national government should have primary responsibility for setting election-administration rules. Use at least one constitutional principle or foundational document, explain your reasoning, and respond to an opposing perspective.",
    criteria: [
      "Take a defensible position with a clear line of reasoning.",
      "Use a specific constitutional clause, amendment, or foundational document accurately.",
      "Explain how the evidence supports the position rather than merely naming it.",
      "Address an opposing perspective with reasoning or evidence.",
      "Distinguish national and state powers without claiming either has unlimited authority.",
    ],
    exemplar: `State governments should retain primary responsibility for election administration because decentralized administration allows rules to reflect local election infrastructure, while national minimums remain necessary to protect constitutional rights. Federalism divides authority rather than giving either level complete control. The Elections Clause gives states a central role in administering congressional elections, but it also permits Congress to make or alter regulations. A strong state-led system therefore cannot become a justification for unequal access.

Federalist No. 39 helps explain this arrangement: the proposed government combines national and federal features rather than operating as a single consolidated system. Applying that principle to election administration supports local implementation of registration, polling places, and ballot logistics. Local officials can respond to differences in population density and available facilities without waiting for a single national procedure.

Opponents reasonably argue that variation can produce unequal burdens. That concern does not require eliminating state administration; it supports enforceable national floors under constitutional protections and federal law. The better balance is state operation subject to national rights-based limits, not unlimited state discretion or uniform control of every detail.`,
    exemplarNote: "One possible practice response, not an official scoring sample. Compare the claim, evidence, reasoning, and rebuttal—not the wording.",
  },
  {
    id: "bio-dialysis-frq", courseSlug: "ap-bio", title: "Data-based free response",
    type: "Biology data analysis", minutes: 20,
    prompt: String.raw`Identical dialysis bags begin at \(10.0\,\text{g}\). After 30 minutes, a bag in solution A has mass \(10.7\,\text{g}\), while a bag in solution B has mass \(9.4\,\text{g}\). Assume only water crosses in measurable amounts. (a) Calculate each percent mass change. (b) Predict the direction of net water movement for each bag. (c) Explain the results in terms of relative water potential and identify one limitation of the conclusion.`,
    criteria: [
      String.raw`Use \(\frac{m_f-m_i}{m_i}\times100\%\) and retain the sign for both bags.`,
      "Connect positive mass change to net water entry and negative mass change to net water exit.",
      "Use relative water potential correctly without equating it to solute concentration in every possible situation.",
      "State a limitation tied to the evidence, such as unknown dissolved solutes, leakage, or measurement conditions.",
    ],
    exemplar: String.raw`(a) For A, \(\frac{10.7-10.0}{10.0}\times100\%=+7.0\%\). For B, \(\frac{9.4-10.0}{10.0}\times100\%=-6.0\%\).

(b) Bag A gained mass, so the data support net water movement into A. Bag B lost mass, supporting net water movement out of B.

(c) Under the stated assumption, A's surroundings initially had higher water potential than its contents, while B's surroundings had lower water potential than its contents. Water moved toward the region of lower water potential in each system. The mass data alone do not identify every solute or prove equilibrium was reached; a leak or evaporation could also affect mass, so controls and repeated trials would strengthen the conclusion.`,
    exemplarNote: "A worked original response. Recalculate the values yourself before comparing reasoning and units.",
  },
  {
    id: "calc-accumulation-frq", courseSlug: "ap-calc", title: "Accumulation free response",
    type: "Calculus modeling", minutes: 15,
    prompt: String.raw`A tank contains \(40\) gallons at \(t=0\). Water flows in at \(R(t)=6-t\) gallons per minute for \(0\le t\le6\), and no water flows out. (a) Find the amount at \(t=3\). (b) Find the instantaneous rate of change at \(t=3\). (c) Find the maximum amount on the interval and justify the location.`,
    criteria: [
      String.raw`Use \(V(t)=40+\int_0^tR(u)\,du\), including the initial amount.`,
      String.raw`Calculate \(V(3)=53.5\) gallons with an antiderivative and units.`,
      String.raw`Distinguish \(V'(3)=R(3)=3\) gallons per minute from the accumulated amount.`,
      "Justify the maximum using the sign of R(t) on the interval, including the endpoint.",
    ],
    exemplar: String.raw`Let \(V(t)\) be gallons in the tank. Accumulation gives
$$V(t)=40+\int_0^t(6-u)\,du=40+6t-\frac{t^2}{2}.$$

(a) \(V(3)=40+18-\frac92=53.5\) gallons.

(b) By the Fundamental Theorem, \(V'(t)=R(t)\). Thus \(V'(3)=6-3=3\) gallons per minute. This is a rate, not an amount.

(c) \(R(t)=6-t\ge0\) on \([0,6]\), so V is nondecreasing there and strictly increasing for \(0\le t<6\). Therefore the maximum occurs at the right endpoint: \(V(6)=40+36-18=58\) gallons.`,
    exemplarNote: "The result is only part of the response. Compare the accumulation expression, units, and endpoint justification.",
  },
  {
    id: "research-method-defense", courseSlug: "ap-research", title: "Methodology oral-defense rehearsal",
    type: "Constructed defense scenario", minutes: 5,
    prompt: "Your project surveyed 82 students at one school about study routines and self-reported quiz preparation. A panelist asks: “Why was a survey appropriate, and what can your study not establish?” Draft a concise spoken response, then assess the reasoning it contains.",
    criteria: [
      "Connect the survey to the actual research question and the kind of information sought.",
      "Use the sample and school context to bound the conclusion.",
      "Distinguish association or self-report from demonstrated causation or directly observed behavior.",
      "Name a feasible improvement or triangulation step without dismissing the entire project.",
    ],
    exemplar: `A survey was appropriate because my question concerned students' reported routines and preparation strategies, which are not all directly observable in a single school day. It allowed me to compare patterns across the 82 responses using the same questions. However, the sample came from one school and participation was voluntary, so I should not treat the respondents as representative of all students. The responses are also self-reports, and an association between a routine and preparation cannot by itself establish that the routine caused an outcome. I would narrow the conclusion to patterns reported by these respondents. A follow-up could combine interviews with anonymized study logs to test whether the reported patterns appear in another kind of evidence.`,
    exemplarNote: "A model response to the constructed scenario only. Your own defense must use your project's actual method and evidence.",
  },
];

export function getCustomStudioTasks(courseSlug: SubjectSlug | string): StudioTask[] {
  return studioTasks.filter((task) => task.courseSlug === courseSlug);
}
