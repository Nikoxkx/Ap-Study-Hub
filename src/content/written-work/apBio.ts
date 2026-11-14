import type { CourseDefense, WrittenWork } from "./types";

/**
 * AP Biology written work and defense.
 *
 * Biology FRQs are marked on the words, not just the number: a calculation
 * with no unit, or a claim with no mechanism, loses the point it looked like
 * it had earned. So every example below shows the working on squared paper
 * and the sentence that has to sit next to it.
 */
export const apBioWrittenWork: WrittenWork[] = [
  {
    id: "ap-bio-1",
    courseSlug: "ap-bio",
    unitNumber: 2,
    prompt:
      "A cell with an internal solute concentration of \\(0.30\\,\\text{M}\\) is placed in a beaker of \\(0.10\\,\\text{M}\\) sucrose. Calculate the water potential of each solution at \\(27^{\\circ}\\text{C}\\) and predict the direction of net water movement. \\((R = 0.0831\\,\\text{L}\\,\\text{bar}\\,\\text{mol}^{-1}\\,\\text{K}^{-1})\\)",
    plan: [
      "Convert temperature to kelvin first — this is the step people skip and it changes the answer by a lot.",
      "State the direction of water movement only after comparing the two numbers, not before.",
    ],
    example: [
      "Step 1 — temperature: \\(T = 27 + 273 = 300\\,\\text{K}\\)",
      "Step 2 — solute potential of the beaker: \\(\\Psi_s = -iCRT = -(1)(0.10)(0.0831)(300) = -2.49\\,\\text{bar}\\)",
      "Step 3 — solute potential inside the cell: \\(\\Psi_s = -(1)(0.30)(0.0831)(300) = -7.48\\,\\text{bar}\\)",
      "Step 4 — total water potential, with \\(\\Psi_p = 0\\) assumed in both: \\(\\Psi_{beaker} = -2.49\\,\\text{bar}\\), \\(\\Psi_{cell} = -7.48\\,\\text{bar}\\)",
      "Step 5 — direction: water moves from higher water potential to lower, so from the beaker into the cell. Net movement is inward, and the cell gains mass.",
    ],
    because:
      "The working is laid out in numbered steps with units on every line, and the prediction rests on the comparison of the two totals rather than on the word 'hypertonic'. That last point matters: a student who says 'inward, because the cell is hypertonic' has the right answer and a weaker justification than one who shows the two numbers.",
    say: [
      "The first thing I did was turn 27 degrees into kelvin, because the formula needs kelvin and forgetting that is the most common way to lose this question.",
      "I calculated the beaker's potential first because it is the simpler number and it gives me a control to compare against.",
      "Then I compared the two totals, not the concentrations. Water potential is the number that decides direction.",
      "I assumed pressure potential was zero in both, and I would say that out loud, because a plant cell with a wall would have a pressure term.",
    ],
    trap:
      "Comparing concentrations and writing 'water moves to the hypertonic solution' with no calculation. It is the right answer with the wrong evidence, and it does not earn the calculation point.",
  },
  {
    id: "ap-bio-2",
    courseSlug: "ap-bio",
    unitNumber: 5,
    prompt:
      "A dihybrid cross is expected to produce a \\(9:3:3:1\\) ratio. In a sample of 160 offspring you observe 96, 30, 24 and 10. Test the fit with a chi-square test and state your conclusion. Critical value at \\(df = 3\\), \\(\\alpha = 0.05\\) is \\(7.81\\).",
    plan: [
      "Convert the ratio into expected counts before you touch the formula.",
      "The conclusion is a sentence about the model, not the word 'reject' on its own.",
    ],
    example: [
      "Step 1 — expected counts from \\(160 \\times \\tfrac{9}{16}\\), \\(\\tfrac{3}{16}\\), \\(\\tfrac{3}{16}\\), \\(\\tfrac{1}{16}\\): \\(90,\\ 30,\\ 30,\\ 10\\)",
      "Step 2 — each contribution \\(\\frac{(O-E)^2}{E}\\):",
      "\\[\\frac{(96-90)^2}{90} = 0.400\\]",
      "\\[\\frac{(30-30)^2}{30} = 0\\]",
      "\\[\\frac{(24-30)^2}{30} = 1.200\\]",
      "\\[\\frac{(10-10)^2}{10} = 0\\]",
      "Step 3 — total: \\(\\chi^2 = 0.400 + 0 + 1.200 + 0 = 1.60\\)",
      "Step 4 — compare: \\(1.60 < 7.81\\), so we fail to reject the \\(9:3:3:1\\) model at the 5% level.",
    ],
    because:
      "Every step is visible, the expected values are derived rather than asserted, and the conclusion is stated as a sentence about the model. 'Fail to reject' with the comparison shown is the shape that earns the full point; 'the ratio is 9:3:3:1' claims more than the test can support.",
    say: [
      "I turned the ratio into counts first, because a chi-square test compares counts, not proportions.",
      "Each contribution is its own line so that an arithmetic slip is easy to find and easy to mark.",
      "I compared my total to the critical value at the same degrees of freedom the question gave me.",
      "The conclusion I wrote is about the model, not about the data. Failing to reject does not mean the ratio is correct; it means these data do not contradict it.",
    ],
    trap:
      "Saying 'the hypothesis is proven' after a small chi-square. A small value means the data are consistent with the model; it does not confirm it.",
  },
  {
    id: "ap-bio-3",
    courseSlug: "ap-bio",
    unitNumber: 3,
    prompt:
      "An enzyme-catalyzed reaction runs at \\(2.0\\,\\mu\\text{mol}\\,\\text{min}^{-1}\\) at \\(20^{\\circ}\\text{C}\\) and \\(5.6\\,\\mu\\text{mol}\\,\\text{min}^{-1}\\) at \\(30^{\\circ}\\text{C}\\). Calculate \\(Q_{10}\\) and explain what the value means for the enzyme.",
    plan: [
      "Write the formula with the rate ratio in brackets and the temperature difference in the exponent.",
      "Interpret the number biologically; a bare number earns half the point.",
    ],
    example: [
      "\\[Q_{10} = \\left(\\frac{R_2}{R_1}\\right)^{\\frac{10}{T_2 - T_1}}\\]",
      "\\[Q_{10} = \\left(\\frac{5.6}{2.0}\\right)^{\\frac{10}{30-20}} = (2.8)^{1} = 2.8\\]",
      "A \\(Q_{10}\\) of 2.8 means the reaction rate nearly triples for every \\(10^{\\circ}\\text{C}\\) rise in this range, which is above the roughly two-fold change typical of a simple \\(Q_{10}\\) of 2. The most likely explanation is that temperature is increasing the proportion of enzyme molecules with enough kinetic energy to clear the activation barrier, without yet denaturing the enzyme.",
    ],
    because:
      "The calculation is correct, the units of the ratio cancel and are not invented, and the interpretation names a mechanism. Saying 'the enzyme works faster when it is warmer' is true and earns almost nothing; 'more molecules clear the activation barrier' is the biological explanation.",
    say: [
      "I used the ratio of rates first because that is the part of the formula with the data in it.",
      "The exponent is one because the temperatures differ by exactly ten degrees. If it had been fifteen, the exponent would be two thirds and the answer would change.",
      "The number 2.8 needs a sentence next to it, or it is just arithmetic.",
      "I would add that this cannot hold forever — at some higher temperature the enzyme denatures and the rate falls sharply. The model is local.",
    ],
    trap:
      "Reporting \\(Q_{10}\\) with a unit. It is a ratio of rates at two temperatures, so it has no unit, and adding one signals that the formula was applied without being understood.",
  },
  {
    id: "ap-bio-4",
    courseSlug: "ap-bio",
    unitNumber: 7,
    prompt:
      "In a population at Hardy–Weinberg equilibrium, \\(4\\%\\) of individuals show a recessive phenotype. Calculate the allele frequencies and the frequency of carriers. Then explain one reason real populations rarely meet the assumptions.",
    plan: [
      "The recessive phenotype is \\(q^2\\), not \\(q\\). Say this explicitly in your answer.",
      "Check that the three genotype frequencies sum to one before you move on.",
    ],
    example: [
      "\\[q^2 = 0.04 \\quad\\Rightarrow\\quad q = \\sqrt{0.04} = 0.20\\]",
      "\\[p = 1 - q = 0.80\\]",
      "Carriers: \\(2pq = 2(0.80)(0.20) = 0.32\\), so about \\(32\\%\\) of the population are heterozygous.",
      "Check: \\(p^2 + 2pq + q^2 = 0.64 + 0.32 + 0.04 = 1.00\\) ✓",
      "Real populations rarely meet the assumptions. One clear reason is non-random mating: if individuals tend to mate with neighbors, the population is subdivided into smaller groups in which drift acts more strongly, and allele frequencies diverge from the single-population model even when no selection is acting.",
    ],
    because:
      "The square root step is shown, the frequencies are checked, and the limitation is a named mechanism rather than the word 'mutations'. Selecting one assumption and explaining its consequence is worth more than listing all five.",
    say: [
      "The first thing I checked is which phenotype the 4% refers to, because the recessive phenotype is q squared.",
      "I took the square root to get q, and then p came from p plus q equals one.",
      "I added the check line, because it catches a mistake immediately and it shows the marker I know the frequencies should sum to one.",
      "For the limitation I picked non-random mating and followed it to drift, because a named mechanism is worth more than a list.",
    ],
    trap:
      "Treating \\(4\\%\\) as \\(q\\) and reporting \\(q = 0.04\\). That one error changes every downstream number, and it is the single most common mistake on this topic.",
  },
  {
    id: "ap-bio-5",
    courseSlug: "ap-bio",
    unitNumber: 4,
    prompt:
      "A culture of \\(2.0 \\times 10^{4}\\) cells is treated with a drug that halves the mitotic rate. Predict the cell number after three doubling times of the untreated culture, and explain how a checkpoint inhibitor would produce a different result.",
    plan: [
      "Halving the rate halves the doublings per unit time — say that before calculating.",
      "Compare the two mechanisms: slower division versus arrested division is not the same thing.",
    ],
    example: [
      "Untreated, three doubling times give \\(2.0\\times10^{4} \\times 2^{3} = 1.6\\times10^{5}\\) cells.",
      "With the mitotic rate halved, the culture completes half as many doublings in the same period: \\(1.5\\) doublings, so \\(N = 2.0\\times10^{4} \\times 2^{1.5} \\approx 5.7\\times10^{4}\\) cells.",
      "A checkpoint inhibitor does something different. Rather than slowing the cycle, it arrests cells at a checkpoint such as the \\(G_1\\)/\\(S\\) transition, so cells accumulate in one phase and the population stops growing rather than growing more slowly. Slowing the rate and stopping the cycle both reduce the final count, but only the inhibitor produces a population stuck in a single phase.",
    ],
    because:
      "The fractional doubling is handled properly, and the second mechanism is contrasted rather than just described. The distinction between 'slower' and 'arrested' is exactly the kind of claim that separates a 3 from a 4 on a long FRQ.",
    say: [
      "I did the untreated case first because it gives me a number to compare against.",
      "Halving the rate means half as many doublings, not half as many cells, and I said that out loud before calculating.",
      "The inhibitor paragraph is different because the cells stop rather than slow, and the evidence would be a distribution of cells across phases.",
      "The weak point is that I used a fractional doubling, which is a model. A real culture divides asynchronously.",
    ],
    trap:
      "Halving the final cell number when the rate is halved. Cell numbers grow exponentially, so halving the rate is not halving the answer.",
  },
  {
    id: "ap-bio-6",
    courseSlug: "ap-bio",
    unitNumber: 6,
    prompt:
      "A mutation changes a single base in the third position of a codon. Predict the effect on the protein and explain why your prediction is more likely for this position than for the first.",
    plan: [
      "Third position, silent mutation, redundancy. Say the mechanism, not just the term.",
      "Then say when the prediction fails — the exception is where the mark is.",
    ],
    example: [
      "A change in the third base of a codon is often silent, because the genetic code is redundant at that position: several codons specify the same amino acid, and many of the differences between them sit in the third base. If the codon changes from one that specifies the same amino acid, the polypeptide is identical and the protein's function is unchanged.",
      "The prediction is weaker than it sounds, because redundancy is not uniform. A third-position change can still substitute an amino acid, and it can also create or destroy a splice site or change a regulatory sequence, which would matter far more than the codon itself. A first-position change is more likely to alter the amino acid simply because the code is less redundant there.",
    ],
    because:
      "The answer gives the mechanism behind redundancy, makes a directional prediction, and then names the ways the prediction fails. On a genetics FRQ, the exception is usually worth as much as the rule.",
    say: [
      "I said why the third position is often silent — the code is redundant there — rather than just using the word 'degenerate'.",
      "The mutation could still change the protein, so I said 'often' and not 'always'.",
      "The splice site point is the one I would raise if a teacher asked what else could go wrong.",
      "The weakest part is that I have not named a specific codon, so my answer is general. A specific example would be stronger.",
    ],
    trap:
      "Saying 'silent mutations have no effect'. They have no effect on the amino acid sequence; they can still change splicing, stability and translation rate.",
  },
  {
    id: "ap-bio-7",
    courseSlug: "ap-bio",
    unitNumber: 8,
    prompt:
      "A population of \\(500\\) individuals has \\(K = 1000\\) and \\(r = 0.20\\) per year. Calculate the growth rate under exponential and logistic models, and explain which is more realistic here.",
    plan: [
      "Two formulas, two numbers, and a reason for the difference.",
      "Say why the logistic model fits a population near half its carrying capacity.",
    ],
    example: [
      "Exponential: \\(\\frac{dN}{dt} = rN = 0.20 \\times 500 = 100\\) individuals per year.",
      "Logistic: \\(\\frac{dN}{dt} = rN\\left(\\frac{K-N}{K}\\right) = 0.20 \\times 500 \\times \\frac{1000-500}{1000} = 100 \\times 0.50 = 50\\) individuals per year.",
      "The logistic model is more realistic for a population with a finite habitat, because it includes density dependence: as \\(N\\) approaches \\(K\\), the remaining fraction \\((K-N)/K\\) shrinks and growth slows. At \\(N = 500\\) the population is at half its carrying capacity and is growing at its maximum absolute rate, which is why the logistic model predicts exactly half the exponential rate at this point.",
    ],
    because:
      "The numbers are correct and the interpretation uses the term \\((K-N)/K\\), which is the mechanism. Saying 'carrying capacity limits it' without naming the fraction is a definition rather than an explanation.",
    say: [
      "I calculated the exponential case first because it is the simpler formula and it gives me a ceiling.",
      "The logistic number is exactly half because the population is exactly at half of K. That is not a coincidence.",
      "The mechanism is density dependence, and I named the fraction that produces it.",
      "The honest limit is that real populations do not know what K is in advance, so the model is a description, not a prediction.",
    ],
    trap:
      "Subtracting \\(N\\) from \\(K\\) and stopping, or forgetting to divide by \\(K\\). The term is a fraction between zero and one, and that is what makes it a rate modifier.",
  },
  {
    id: "ap-bio-8",
    courseSlug: "ap-bio",
    unitNumber: 1,
    prompt:
      "A solution of \\(0.50\\,\\text{M}\\) glucose at \\(25^{\\circ}\\text{C}\\) is separated from pure water by a membrane permeable only to water. Calculate the osmotic pressure and explain what it predicts.",
    plan: [
      "\\(i = 1\\) for glucose, because it does not dissociate. That is the whole trap.",
      "Use the same \\(R\\) as the water-potential formula so the two are consistent.",
    ],
    example: [
      "\\[\\Pi = iCRT = (1)(0.50\\,\\text{M})(0.0831\\,\\text{L}\\,\\text{bar}\\,\\text{mol}^{-1}\\,\\text{K}^{-1})(298\\,\\text{K})\\]",
      "\\[\\Pi \\approx 12.4\\,\\text{bar}\\]",
      "An osmotic pressure of about \\(12.4\\,\\text{bar}\\) is the pressure that would have to be applied to the glucose solution to stop net water movement into it. In the absence of that pressure, water moves across the membrane from the pure water into the glucose solution, and the volume on the glucose side increases.",
    ],
    because:
      "The van't Hoff factor is justified, the temperature is converted, and the result is interpreted as a pressure that would stop the flow rather than left as a number. That interpretation is what connects the calculation to the membrane.",
    say: [
      "I set i to one because glucose does not split into ions. For sodium chloride it would be two, and this question is testing whether I noticed.",
      "I converted to kelvin, again, and I wrote the value in the working so it is checkable.",
      "The pressure is what would stop the flow, which is why it is a prediction about movement and not just a number.",
      "The limitation: the membrane is not perfectly semipermeable, so real values drift from the calculation.",
    ],
    trap:
      "Using \\(i = 2\\) because 'that is the number in the formula'. The van't Hoff factor is a property of the solute, and glucose stays as one particle.",
  },
];

export const apBioDefense: CourseDefense = {
  courseSlug: "ap-bio",
  claim:
    "That every number has a unit, every claim has a mechanism, and you can say where the model stops working.",
  frames: [
    "I calculated… by using…, and the units are…",
    "The mechanism behind this result is…, which produces…",
    "This model assumes…, so it would fail if…",
    "My evidence is the number and the direction of the change, not only the number.",
    "I checked the answer by asking whether it is the right order of magnitude, and whether the sign makes sense.",
  ],
  markedOn: [
    "Whether the calculation is shown step by step",
    "Whether units are carried through and reported",
    "Whether the explanation names a mechanism, not just a term",
    "Whether you can name an assumption and what breaks it",
  ],
  units: [
    {
      unitNumber: 1,
      keep: ["\\(i\\) for your solute", "One assumption behind the calculation"],
      question: "\"Why is \\(i\\) different for glucose and for salt?\"",
      answer: [
        "I would start with particle count: salt dissociates into two ions and glucose does not, so the same molarity gives me a different number of particles.",
        "That is also why salt raises osmotic pressure more at the same molarity, which is the connection I would make explicit.",
        "The assumption I am making is complete dissociation, and I would say out loud that a real solution does not fully satisfy it.",
      ],
    },
    {
      unitNumber: 2,
      keep: ["Water potential on both sides", "The direction of net movement"],
      question: "\"Does water move toward the higher concentration or the lower water potential?\"",
      answer: [
        "Toward the lower water potential, which is usually the higher solute concentration — usually, not always.",
        "Pressure potential can reverse it, which is why a plant cell does not burst.",
        "My calculation assumed pressure potential was zero, and I said so.",
      ],
    },
    {
      unitNumber: 3,
      keep: ["The rate ratio", "What the \\(Q_{10}\\) value means biologically"],
      question: "\"Why does the rate keep rising with temperature?\"",
      answer: [
        "It does not keep rising. It rises in this range and then falls sharply when the enzyme denatures.",
        "The rise is more molecules clearing the activation barrier; the fall is a change in shape.",
        "That is why I called the model local rather than general.",
      ],
    },
    {
      unitNumber: 4,
      keep: ["The number of doublings", "The difference between slower and arrested"],
      question: "\"Why is halving the rate not halving the cell count?\"",
      answer: [
        "Because growth is exponential, so halving the rate halves the exponent, not the answer.",
        "I converted the rate change into a change in doublings before multiplying.",
        "A checkpoint inhibitor is different again, because the cells stop rather than slow.",
      ],
    },
    {
      unitNumber: 5,
      keep: ["Expected counts, not expected percentages", "The comparison with the critical value"],
      question: "\"What does your chi-square value actually tell you?\"",
      answer: [
        "That the observed counts are close enough to the model that these data do not contradict it.",
        "It does not tell me the model is correct, and I wrote 'fail to reject' rather than 'proved'.",
        "The degrees of freedom depend on the number of categories minus one, and I used the value given.",
      ],
    },
    {
      unitNumber: 6,
      keep: ["The codon position", "One way the prediction can fail"],
      question: "\"Is a silent mutation harmless?\"",
      answer: [
        "Not necessarily. It does not change the amino acid, and it can still change splicing or translation rate.",
        "I said 'often silent' rather than 'always silent' for that reason.",
        "The strongest counterexample is a change that creates a splice site, which can remove a whole exon.",
      ],
    },
    {
      unitNumber: 7,
      keep: ["\\(p\\) and \\(q\\)", "The check that they sum to one"],
      question: "\"Which Hardy–Weinberg assumption is most likely to fail in a real population?\"",
      answer: [
        "I would pick random mating, because real populations are structured and neighbors mate with neighbors rather than at random.",
        "That structure produces subdivision, and once you have subgroups, drift acts differently in each one.",
        "The test I would run is to compare observed heterozygosity with \\(2pq\\); a deficit suggests the structure is real.",
      ],
    },
    {
      unitNumber: 8,
      keep: ["\\(rN\\) and the density term", "Why the logistic rate is lower at \\(N = K/2\\)"],
      question: "\"Is the 10% rule a law?\"",
      answer: [
        "No, it is a rough model, and the real transfer varies by ecosystem and by what you measure.",
        "The exam expects the model, and a good answer says it is a model.",
        "If asked what would change it, I would say the efficiency of assimilation at each step.",
      ],
    },
  ],
};
