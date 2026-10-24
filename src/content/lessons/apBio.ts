import { section } from "./build";
import type { Lesson } from "./types";

/** Eight-unit AP Biology sequence with mechanism, representation, and practice. */
export const apBioLessons: Lesson[] = [
  {
    unitNumber: 1,
    title: "Unit 1 · Chemistry of life",
    description: "Explain how water, chemical bonds, carbon chemistry, and macromolecule structure create the properties required for living systems.",
    examWeight: "8–11% of multiple-choice weighting",
    objectives: [
      "Relate water’s molecular structure to its biological properties.",
      "Explain how monomers, bonds, and folding determine macromolecule function.",
      "Interpret experiments involving pH, indicators, or molecular structure.",
    ],
    sections: [
      section("Water’s polarity explains its behavior", ["cb-bio-ced", "openstax-biology"], `
Water’s oxygen atom attracts shared electrons more strongly than its hydrogen atoms, producing partial charges and a bent polar molecule. Hydrogen bonds form among molecules, creating cohesion and contributing to surface tension. Adhesion to other polar or charged surfaces helps water move through narrow xylem vessels. These properties are emergent: a single water molecule does not have surface tension, but a network of interacting molecules does.

Hydrogen bonding also gives water a relatively high specific heat and heat of vaporization. Energy must disrupt many interactions before temperature rises or molecules escape as vapor. Organisms therefore buffer temperature changes and can cool through evaporation. Ice floats because the solid’s ordered hydrogen-bond lattice spaces molecules farther apart than in liquid water. Floating ice insulates aquatic environments, but “all solids are less dense” is not a general rule.
`),
      section("Carbon skeletons and functional groups", ["cb-bio-ced", "openstax-biology"], `
Carbon’s four valence electrons allow four covalent bonds and diverse chains, branches, and rings. The geometry of a carbon skeleton influences how a molecule fits other structures, while attached functional groups change reactivity, polarity, and acidity. Hydroxyl groups tend to increase polarity; carboxyl groups can donate hydrogen ions; amino groups can accept them; phosphate groups participate in energy transfer and nucleic-acid backbones.

Isomers share a molecular formula but differ in structure, and those differences can alter biological function. Enzymes and receptors often recognize shape and charge with high specificity. A small change from one stereoisomer to another may dramatically change binding. When interpreting a structural diagram, do not memorize every atom; identify the skeleton, major functional groups, and regions likely to interact with water or another molecule.
`),
      section("Carbohydrates and lipids", ["cb-bio-ced", "openstax-biology"], `
Carbohydrates include monosaccharides, disaccharides, and polysaccharides. Glucose is a rapid fuel and monomer; starch stores glucose in plants; glycogen stores it in animals; cellulose forms plant cell walls; chitin strengthens fungal walls and arthropod exoskeletons. Cellulose and starch both contain glucose but differ in glycosidic-bond orientation and branching. Human enzymes can hydrolyze starch but not cellulose, illustrating how bond geometry controls function.

Lipids are grouped by hydrophobic behavior rather than one shared polymer structure. Triglycerides store energy, phospholipids form bilayers, and steroids have characteristic fused rings. Fatty-acid saturation affects packing: saturated chains tend to pack closely, while cis unsaturated chains have kinks that increase fluidity. Lipids are not simply “bad fats”; their structures enable energy storage, membranes, and signaling.
`),
      section("Proteins and nucleic acids", ["cb-bio-ced", "openstax-biology"], `
Proteins are amino-acid polymers whose sequence is their primary structure. Local hydrogen bonding creates secondary structures such as alpha helices and beta sheets; side-chain interactions produce tertiary shape; multiple polypeptides can form quaternary structure. Folding determines active sites, binding surfaces, and mechanical properties. Heat or pH changes can disrupt interactions and denature a protein without necessarily breaking its peptide bonds.

DNA and RNA are nucleotide polymers. Each nucleotide contains a sugar, phosphate, and nitrogenous base. Antiparallel DNA strands pair A with T and G with C through complementary hydrogen bonding, while the sugar-phosphate backbone provides directionality. RNA uses uracil and often folds into functional single-stranded structures. Sequence stores information; three-dimensional form and chemical interactions allow that information to be copied, read, or catalytically used.
`),
      section("Bonds, pH, and experimental reasoning", ["cb-bio-ced", "cb-bio-frq", "cb-bio-labs"], `
Dehydration synthesis joins monomers with removal of water, while hydrolysis uses water to break polymers. These descriptions apply to many macromolecules, but enzymes make the reactions biologically practical. pH measures hydrogen-ion activity on a logarithmic scale: a change from pH 6 to pH 5 represents approximately ten times the hydrogen-ion concentration. Buffers resist pH change by accepting or donating ions within limits.

In an indicator experiment, identify what the reagent actually detects and include positive and negative controls when appropriate. If iodine darkens, it indicates starch under the test conditions, not every carbohydrate. When changing pH to test an enzyme, keep substrate, enzyme concentration, temperature, and time controlled. On free response, connect a measured result to molecular mechanism rather than writing “pH affects enzymes” without explaining altered interactions and active-site shape.
`),
    ],
    glossary: [
      { term: "Hydrogen bond", definition: "A relatively weak attraction involving a partially positive hydrogen and an electronegative atom, crucial in water and molecular structure." },
      { term: "Denaturation", definition: "Disruption of a protein’s functional shape through altered environmental conditions, usually without primary-sequence cleavage." },
      { term: "Dehydration synthesis", definition: "A polymer-forming reaction that links subunits while releasing water." },
      { term: "Specific heat", definition: "The energy required to raise a substance’s temperature by a defined amount per unit mass." },
    ],
    examAlignment: {
      title: "Structure–function explanations",
      description: "Unit 1 commonly supplies diagrams or experiments and asks how molecular structure explains a measured biological effect.",
      criteria: [
        "Use the language of polarity, bonding, shape, or sequence to explain function.",
        "Calculate pH changes logarithmically and identify the variable an indicator measures.",
        "State controls and held-constant variables when proposing an experiment.",
      ],
      sources: ["cb-bio-ced", "cb-bio-exam", "cb-bio-frq"],
    },
    practice: [
      {
        question: "Why can humans digest starch but not cellulose, although both contain glucose?",
        options: ["Cellulose contains no carbon.", "Their glycosidic bonds and polymer geometry differ, so digestive enzymes have different binding compatibility.", "Starch is a lipid.", "Cellulose has no monomers."],
        correctIndex: 1,
        explanation: "Structure and bond orientation determine whether enzymes can bind and hydrolyze the polymer.",
        skill: "Explain structure–function",
      },
      {
        question: "A solution changes from pH 7 to pH 5. What happened to hydrogen-ion concentration?",
        options: ["It doubled.", "It decreased twofold.", "It increased approximately 100-fold.", "It stayed constant."],
        correctIndex: 2,
        explanation: "Each pH unit represents a tenfold change; two units lower means about 10² more hydrogen ions.",
        skill: "Use quantitative reasoning",
      },
    ],
  },
  {
    unitNumber: 2,
    title: "Unit 2 · Cell structure and function",
    description: "Connect membrane structure, organelles, surface area, and transport to the maintenance of distinct internal cellular environments.",
    examWeight: "10–13% of multiple-choice weighting",
    objectives: [
      "Explain how compartmentalization and organelle interactions support cell function.",
      "Predict membrane transport and water movement from gradients and conditions.",
      "Use surface-area-to-volume ratios and experimental data to evaluate cell models.",
    ],
    sections: [
      section("Cells share features but differ in organization", ["cb-bio-ced", "openstax-biology"], `
All cells have plasma membranes, cytoplasm, genetic material, and ribosomes. Prokaryotic cells lack a membrane-bound nucleus and usually have smaller, simpler internal organization, though they can form complex infoldings and communities. Eukaryotic cells contain membrane-bound organelles that create specialized chemical environments. “Simple” does not mean primitive or incapable: bacteria regulate genes, harvest energy, communicate, and evolve rapidly.

Cell size is constrained in part by exchange and transport. As a cell grows, volume increases faster than surface area, so the surface-area-to-volume ratio falls. Nutrient uptake and waste removal may become less efficient per unit cytoplasm. Flattened shapes, infoldings, transport systems, and small size can compensate. A model cell experiment using agar cubes tests diffusion geometry, not every aspect of living-cell physiology.
`),
      section("Membrane structure creates selective exchange", ["cb-bio-ced", "openstax-biology"], `
The fluid mosaic model describes a phospholipid bilayer with embedded and associated proteins, cholesterol, and carbohydrates. Hydrophilic heads face aqueous environments while hydrophobic tails form the interior. Small nonpolar molecules can cross relatively easily; ions and large polar molecules generally require proteins. Channel proteins provide passages, carriers change shape, and pumps use energy to move substances against gradients.

Membrane fluidity depends on lipid composition, cholesterol, and temperature. Unsaturated tails usually reduce packing, while cholesterol buffers fluidity changes across temperatures. Membrane proteins also support cell recognition, adhesion, and signaling. A membrane is therefore not a passive bag. When an experiment uses a toxin, identify which component or process it disrupts before predicting changes in transport or homeostasis.
`),
      section("Organelles cooperate in production and recycling", ["cb-bio-ced", "openstax-biology"], `
The nucleus stores DNA and controls access to genetic information through regulated transport and gene expression. Ribosomes synthesize proteins either free in the cytosol or on rough endoplasmic reticulum. Rough ER modifies and folds many secreted and membrane proteins; the Golgi apparatus further modifies, sorts, and packages them; vesicles move cargo among compartments. Smooth ER participates in lipid synthesis and detoxification.

Lysosomes contain acid hydrolases for macromolecule breakdown, while peroxisomes conduct reactions including detoxification. Mitochondria and chloroplasts generate ATP through chemiosmosis and contain their own DNA and ribosomes, supporting endosymbiotic ancestry. Vacuoles contribute to storage, turgor, and breakdown. These are interacting systems, not isolated definitions: disrupting Golgi function can affect secretion even if transcription and translation initially continue.
`),
      section("Passive and active transport", ["cb-bio-ced", "openstax-biology", "cb-bio-labs"], `
Passive transport moves substances down their electrochemical gradients without direct metabolic-energy input. Simple diffusion occurs through the bilayer; facilitated diffusion uses channels or carriers; osmosis is net water movement across a selectively permeable membrane. Active transport uses energy, often ATP hydrolysis or an existing ion gradient, to move solutes against gradients. Secondary active transport couples one substance’s downhill movement to another’s uphill movement.

Tonicity compares effective solute concentrations across a membrane. In a hypotonic environment, animal cells may swell and lyse while plant cells become more turgid; in a hypertonic environment, water leaves and plant membranes may pull from walls in plasmolysis. “Water wants to dilute the salt” is a useful intuition but not an explanation. Predict direction using relative water potential or solute conditions and membrane permeability.
`),
      section("Experimental design with cells", ["cb-bio-ced", "cb-bio-exam", "cb-bio-frq"], `
In dialysis-tubing investigations, the membrane’s pore size determines which solutes cross. Mass change can reflect water movement, but you must know whether the surrounding solution or bag contents changed and whether any solute leaked. Calculate percent change as \((final-initial)/initial \times 100\%\), retaining sign and units. A line of best fit can estimate an isotonic point where net mass change is zero.

For microscopy or transport questions, propose a mechanism that matches all observations. If a cell stops pumping ions after ATP production is inhibited, the evidence supports energy dependence but does not identify the exact pump without more information. Include replicates and controls, and distinguish what was measured from what was inferred. AP scoring often awards separate points for prediction, justification, and experimental support, so write each explicitly.
`),
    ],
    glossary: [
      { term: "Selective permeability", definition: "A membrane’s differential allowance of substances based on properties and transport mechanisms." },
      { term: "Electrochemical gradient", definition: "The combined concentration and electrical-potential gradient influencing ion movement." },
      { term: "Plasmolysis", definition: "Shrinkage of a plant cell’s plasma membrane away from the wall due to water loss." },
      { term: "Endomembrane system", definition: "Interrelated membranes and organelles including ER, Golgi, vesicles, lysosomes, and nuclear envelope." },
    ],
    examAlignment: {
      title: "Models, transport, and investigation",
      description: "Unit 2 lends itself to diagrams, percent-change calculations, and predictions about disrupted cellular systems.",
      criteria: [
        "Explain how organelles or membrane components contribute to a process, not just their names.",
        "Predict osmosis from membrane permeability and relative conditions on both sides.",
        "Separate experimental observation from mechanistic inference.",
      ],
      sources: ["cb-bio-ced", "cb-bio-exam", "cb-bio-frq"],
    },
    practice: [
      {
        question: "A plant cell is placed in a hypertonic solution. What is the most likely result?",
        options: ["Water enters and the cell bursts immediately.", "Water leaves, causing plasmolysis.", "Solute disappears from all compartments.", "The cell wall dissolves."],
        correctIndex: 1,
        explanation: "Net water loss shrinks the protoplast away from the cell wall in sufficiently hypertonic conditions.",
        skill: "Predict osmosis",
      },
      {
        question: "Why does a larger spherical cell have a lower surface-area-to-volume ratio?",
        options: ["Surface area grows with the radius cubed while volume grows with the radius squared.", "Volume grows faster than surface area as radius increases.", "Its membrane stops forming phospholipids.", "Its DNA leaves the nucleus."],
        correctIndex: 1,
        explanation: "Area scales with r² and volume with r³, so area per unit volume decreases with size.",
        skill: "Analyze cell models",
      },
    ],
  },
  {
    unitNumber: 3,
    title: "Unit 3 · Cellular energetics",
    description: "Trace energy through enzymes, ATP, photosynthesis, and respiration, and evaluate how organisms regulate and investigate these pathways.",
    examWeight: "12–16% of multiple-choice weighting",
    objectives: [
      "Explain enzyme activity and regulation through structure, energy, and feedback.",
      "Trace matter and energy through photosynthesis and cellular respiration.",
      "Design and interpret experiments on metabolic rates and environmental effects.",
    ],
    sections: [
      section("Enzymes change rates, not equilibrium", ["cb-bio-ced", "openstax-biology"], `
Enzymes lower activation energy by stabilizing transition states and orienting substrates, increasing reaction rates without being consumed. They do not change the overall free-energy difference or make an energetically unfavorable process favorable by themselves. Active-site shape and chemical environment create specificity, but induced fit means the interaction can involve dynamic adjustment rather than a rigid lock and key.

Temperature and pH affect molecular motion and protein interactions. Moderate warming can increase collisions until denaturation or other constraints reduce activity. Extreme pH can alter side-chain charge and folding. Enzyme concentration, substrate concentration, inhibitors, and cofactors also influence rate. An enzyme’s optimum is condition-dependent; not every enzyme works best at human body temperature or neutral pH.
`),
      section("ATP couples energy-releasing and energy-requiring work", ["cb-bio-ced", "openstax-biology"], `
ATP stores usable free energy in its chemical structure and transfers phosphate groups through coupled reactions. Hydrolysis to ADP and inorganic phosphate releases free energy that can drive transport, movement, and biosynthesis when the reactions are properly coupled. ATP is not a long-term energy warehouse; cells continuously regenerate it from ADP using energy from organic molecules or light.

Energy transformations are inefficient, with some energy dispersed as heat, consistent with thermodynamics. Organisms remain ordered by taking in energy and matter and exporting waste and heat; they do not violate the second law. In diagrams, distinguish energy flow from carbon atoms. Carbon cycles among molecules and reservoirs, while usable energy must be continually supplied.
`),
      section("Photosynthesis: capturing and storing energy", ["cb-bio-ced", "openstax-biology"], `
In chloroplasts, light-dependent reactions occur in thylakoid membranes. Photosystems absorb light, energize electrons, split water, release oxygen, and generate a proton gradient. The electron transport chain powers proton movement, and ATP synthase produces ATP through chemiosmosis. NADP⁺ accepts electrons and protons to form NADPH. Oxygen comes from water, not carbon dioxide—a common misconception worth correcting with isotope evidence.

The Calvin cycle occurs in the stroma and uses ATP and NADPH to fix carbon dioxide into carbohydrate precursors. Rubisco catalyzes carbon fixation but can also bind oxygen in photorespiration, reducing efficiency under some conditions. C4 and CAM pathways concentrate carbon dioxide or separate uptake in time to reduce that problem. These adaptations involve tradeoffs in energy cost and environment.
`),
      section("Cellular respiration and fermentation", ["cb-bio-ced", "openstax-biology"], `
Glycolysis in the cytosol converts glucose to pyruvate, producing a small net ATP yield and NADH. Pyruvate oxidation links glycolysis to the citric acid cycle in mitochondria, where carbon dioxide is released and electron carriers are reduced. The inner-membrane electron transport chain uses those electrons to pump protons; oxygen is the final electron acceptor, forming water. ATP synthase then produces most aerobic ATP.

Without oxygen, many cells regenerate NAD⁺ through fermentation so glycolysis can continue. Lactic-acid and alcohol fermentation follow different pathways but do not themselves produce the large mitochondrial ATP yield. Respiration is not simply breathing, and oxygen’s role is not “burning food” directly. Inhibitor questions become manageable if you track proton gradients, electron carriers, and substrate availability step by step.
`),
      section("Regulation and metabolic investigations", ["cb-bio-ced", "cb-bio-labs", "cb-bio-frq"], `
Feedback inhibition can conserve resources when a pathway’s end product inhibits an earlier enzyme. Allosteric regulation changes protein activity through binding away from the active site, while competitive inhibition directly competes for that site. Noncompetitive inhibition generally lowers effective enzyme capacity rather than being overcome simply by adding substrate. Use rate graphs and inhibitor mechanisms together rather than memorizing one curve shape.

Respirometers can estimate oxygen consumption, while floating leaf disks can estimate relative photosynthetic oxygen production under controlled conditions. Control temperature, light, organism mass, and starting material as appropriate. Rate should include time and often normalization by mass. If asked to graph, label axes with units and choose a scale that shows the data. A mechanism-based prediction before looking at the answer choices is often the fastest way to avoid distractors.
`),
    ],
    glossary: [
      { term: "Activation energy", definition: "The energy input needed to reach a reaction’s transition state." },
      { term: "Chemiosmosis", definition: "ATP production powered by ion movement down an electrochemical gradient through ATP synthase." },
      { term: "Calvin cycle", definition: "The stromal pathway using ATP and NADPH to incorporate carbon into organic molecules." },
      { term: "Feedback inhibition", definition: "Regulation in which a pathway’s product reduces activity of an earlier step." },
    ],
    examAlignment: {
      title: "Pathway models and rate data",
      description: "AP questions often disrupt one step or change one condition and ask for a mechanism-based prediction.",
      criteria: [
        "Trace electrons, protons, carbon, and ATP separately when analyzing energetics.",
        "Distinguish an enzyme’s effect on activation energy from reaction equilibrium.",
        "Report rates with time and relevant normalization, and support predictions with pathway reasoning.",
      ],
      sources: ["cb-bio-ced", "cb-bio-exam", "cb-bio-frq"],
    },
    practice: [
      {
        question: "What is oxygen’s direct role in aerobic cellular respiration?",
        options: ["It fixes carbon in the Calvin cycle.", "It accepts electrons and protons at the end of the electron transport chain, forming water.", "It catalyzes glycolysis in the cytosol.", "It splits water in photosystem II."],
        correctIndex: 1,
        explanation: "Oxygen’s terminal electron-acceptor role allows continued electron flow and proton pumping.",
        skill: "Explain a pathway",
      },
      {
        question: "Which statement about enzymes is accurate?",
        options: ["They are consumed in every reaction.", "They raise activation energy.", "They increase reaction rates without changing overall free-energy difference.", "They make every reaction exergonic."],
        correctIndex: 2,
        explanation: "Catalysis changes kinetics, not the thermodynamic energy difference between reactants and products.",
        skill: "Explain enzyme function",
      },
    ],
  },
  {
    unitNumber: 4,
    title: "Unit 4 · Cell communication and cell cycle",
    description: "Explain how cells receive and amplify signals, coordinate division, respond to checkpoints, and maintain or restore homeostasis.",
    examWeight: "10–15% of multiple-choice weighting",
    objectives: [
      "Trace signal transduction from reception to cellular response.",
      "Explain mitosis, cytokinesis, and cell-cycle checkpoints.",
      "Predict effects of communication or checkpoint disruption, including cancer-related changes.",
    ],
    sections: [
      section("Cells communicate across many distances", ["cb-bio-ced", "openstax-biology"], `
Cell communication can involve direct contact, local signals, or long-distance hormones. Quorum sensing lets bacteria alter group behavior when signal concentration indicates population density. Plants and animals use diverse ligands to coordinate growth, metabolism, immunity, and development. A signal’s meaning depends on the receiving cell’s receptor and internal machinery, not only on the molecule itself.

The same ligand can produce different responses in different cell types. Epinephrine may affect heart and liver cells differently because their receptors, relay proteins, and effector systems differ. This explains why multicellular organisms can coordinate many responses with a limited set of signals. In diagrams, distinguish the sending cell, signal, receptor, target cell, and response before predicting consequences.
`),
      section("Signal transduction converts information into response", ["cb-bio-ced", "openstax-biology"], `
Transduction typically involves reception, relay, and response. A ligand binding a membrane receptor can activate a G protein or kinase cascade, while lipid-soluble signals may bind intracellular receptors that influence transcription. Second messengers such as cyclic AMP or calcium ions spread information rapidly. Phosphorylation cascades amplify signals by allowing one activated protein to activate many downstream proteins.

Amplification is useful but requires control. Phosphatases remove phosphates, second messengers are degraded or sequestered, and receptors can be internalized or desensitized. A mutation that keeps a relay protein permanently active can cause a response even without ligand. When asked whether such a mutation increases or decreases response, locate the protein’s normal role and whether the change is gain or loss of function.
`),
      section("Homeostasis depends on feedback", ["cb-bio-ced", "openstax-biology"], `
Negative feedback counteracts a change and stabilizes a variable around a functional range. Blood-glucose regulation uses insulin and glucagon to influence cellular uptake, storage, and release, though diabetes demonstrates that signaling can fail at production or response. Thermoregulation and osmoregulation likewise rely on sensors, control centers, and effectors. “Negative” refers to opposing change, not a harmful outcome.

Positive feedback reinforces a process until a specific endpoint, as in fruit ripening through ethylene or certain developmental cascades. It is less suited to maintaining a stable set point but valuable when rapid completion matters. In free response, identify the initial stimulus, the direction of each response, and how the loop ends. A diagram with arrows alone is incomplete unless you explain what each component does.
`),
      section("The cell cycle and mitosis preserve information", ["cb-bio-ced", "openstax-biology"], `
Interphase includes G1 growth, S-phase DNA replication, and G2 preparation. Mitosis then distributes duplicated chromosomes: chromosomes condense in prophase, align at the metaphase plate, sister chromatids separate in anaphase, and nuclei reform in telophase. Cytokinesis divides the cytoplasm. After replication, each chromosome initially contains two sister chromatids; chromosome number is counted by centromeres, not by the amount of DNA.

Checkpoints monitor conditions such as cell size, DNA damage, and spindle attachment. Cyclins and cyclin-dependent kinases help regulate transitions. Mitosis produces genetically similar nuclei except for mutation and is used for growth, repair, and asexual reproduction. Meiosis is not merely “mitosis for sex cells”; it has distinct pairing and division events that generate haploid cells and genetic variation.
`),
      section("Cancer, apoptosis, and evidence", ["cb-bio-ced", "cb-bio-frq", "cb-bio-labs"], `
Cancer involves accumulated changes that disrupt regulation of division, survival, and genome maintenance. Proto-oncogenes normally promote appropriate growth; activating changes can convert them into oncogenes. Tumor-suppressor genes normally restrain division or support repair; loss of function can remove that restraint. One mutation is usually not the whole explanation. Metastasis adds the ability to invade and establish growth elsewhere.

Apoptosis is programmed cell death used in development and damaged-cell removal, distinct from uncontrolled necrosis. Experiments may compare mitotic indices, kinase activity, or responses to drugs. If a treatment reduces the proportion of cells in mitosis, it may block a checkpoint or slow division, but additional evidence is needed to locate the target. Use official scoring samples to practice making each prediction and justification a separate, visible statement.
`),
    ],
    glossary: [
      { term: "Ligand", definition: "A signaling molecule that binds specifically to a receptor." },
      { term: "Second messenger", definition: "An intracellular molecule that relays and often amplifies a signal after receptor activation." },
      { term: "Cyclin-dependent kinase", definition: "A kinase activated by cyclin binding that helps regulate cell-cycle transitions." },
      { term: "Apoptosis", definition: "Regulated programmed cell death important in development and cellular quality control." },
    ],
    examAlignment: {
      title: "Representations of signaling and regulation",
      description: "Unit 4 frequently asks students to analyze a pathway model or predict the outcome of altered regulation.",
      criteria: [
        "Trace a signal from receptor to response before evaluating a mutation.",
        "Identify feedback direction and how a regulatory loop terminates.",
        "Distinguish mitotic stages by chromosome behavior and count chromosomes by centromeres.",
      ],
      sources: ["cb-bio-ced", "cb-bio-exam", "cb-bio-frq"],
    },
    practice: [
      {
        question: "A mutation keeps a kinase active even without its ligand. What is the most likely immediate effect?",
        options: ["The downstream pathway may remain active without the normal signal.", "The receptor must disappear.", "DNA replication always stops.", "The kinase becomes a ligand."],
        correctIndex: 0,
        explanation: "A constitutively active relay can bypass normal receptor-dependent control and sustain downstream signaling.",
        skill: "Predict pathway disruption",
      },
      {
        question: "What happens during anaphase of mitosis?",
        options: ["Homologous chromosomes pair.", "Sister chromatids separate toward opposite poles.", "DNA is replicated.", "The nuclear envelope first forms."],
        correctIndex: 1,
        explanation: "Sister-chromatid separation defines anaphase; DNA replication occurred earlier in S phase.",
        skill: "Describe mitosis",
      },
    ],
  },
  {
    unitNumber: 5,
    title: "Unit 5 · Heredity",
    description: "Use meiosis, probability, pedigrees, and chromosomal behavior to explain inheritance patterns beyond simple dominant–recessive shortcuts.",
    examWeight: "8–11% of multiple-choice weighting",
    objectives: [
      "Explain how meiosis creates haploid cells and heritable variation.",
      "Solve inheritance problems using probability and appropriate genetic models.",
      "Evaluate pedigree and cross data for linkage, sex linkage, and non-Mendelian patterns.",
    ],
    sections: [
      section("Meiosis creates both haploidy and variation", ["cb-bio-ced", "openstax-biology"], `
Meiosis begins after DNA replication and includes two divisions. Homologous chromosomes pair during prophase I, crossing over exchanges corresponding segments, and homologs separate in anaphase I. Meiosis II separates sister chromatids. The result is haploid cells with new combinations of alleles. Random fertilization adds another source of variation by combining independently produced gametes.

Independent assortment arises from the random orientation of homologous pairs at metaphase I. It applies most directly to genes on different chromosomes or far apart on the same chromosome. Nondisjunction is the failure of chromosomes or chromatids to separate properly and can produce aneuploid gametes. Its timing affects which gametes are abnormal, so analyze a diagram before assuming every product has the same error.
`),
      section("Mendel’s model and probability", ["cb-bio-ced", "openstax-biology"], `
Mendel’s crosses supported the idea that inherited factors occur in pairs, segregate into gametes, and can produce predictable ratios. A monohybrid cross between two heterozygotes yields a 1:2:1 genotype ratio and, under complete dominance, a 3:1 phenotype ratio. These are probabilities across many offspring, not guarantees for every family of four. Each conception is an independent event under the model.

Use the product rule for independent events and the sum rule for mutually exclusive alternatives. The probability that two heterozygotes have two affected recessive children is \(1/4 \times 1/4 = 1/16\); the probability of one dominant and one recessive phenotype in either order is \(2 \times 3/4 \times 1/4 = 3/8\). Drawing a small probability tree often prevents omitted cases.
`),
      section("Beyond complete dominance", ["cb-bio-ced", "openstax-biology"], `
Incomplete dominance produces an intermediate heterozygote phenotype, while codominance expresses both alleles distinctly, as in certain blood-group patterns. Multiple alleles mean more than two allele forms exist in a population, though an individual diploid still carries at most two. Pleiotropy means one gene affects multiple traits; polygenic inheritance means multiple genes influence one trait. These terms describe different relationships and should not be interchanged.

Environment can influence phenotype without changing genotype. Temperature-dependent coat color, nutrition, and developmental conditions demonstrate gene–environment interaction. Penetrance describes whether individuals with a genotype show the associated phenotype, while expressivity describes degree. A trait running in a family is not automatically genetic because shared environment and learned behavior can also cluster.
`),
      section("Sex linkage and pedigrees", ["cb-bio-ced", "openstax-biology"], `
X-linked recessive traits often appear more frequently in XY individuals because one recessive allele can determine phenotype, whereas XX individuals typically need two copies for a recessive phenotype. An affected father does not transmit his X chromosome to sons, so father-to-son transmission rules out straightforward X linkage. Y-linked and mitochondrial inheritance have different patterns and should be tested rather than assumed.

A pedigree is evidence for a model, not always a definitive answer. Start with individuals whose phenotypes force genotype assignments, then infer others. Ask whether both sexes are affected, whether the trait skips generations, and whether transmission passes through mothers or fathers. Small families and incomplete penetrance can make several models plausible; state your assumptions when constructing a response.
`),
      section("Linkage, mapping, and experimental crosses", ["cb-bio-ced", "cb-bio-frq", "cb-bio-labs"], `
Linked genes lie close enough on the same chromosome that they tend to be inherited together, violating simple independent assortment. Crossing over can separate them, and recombination frequency provides an approximate map distance over short ranges. A testcross with a homozygous recessive individual reveals gamete types in the offspring’s phenotypes. Parental combinations should exceed recombinants under linkage.

Chi-square analysis can test whether observed offspring differ significantly from an expected ratio. Calculate \(\chi^2=\sum((O-E)^2/E)\), choose degrees of freedom appropriately, and compare with the critical value. Failing to reject a model does not prove it true; it means the data do not provide sufficient evidence against it at the chosen threshold. AP responses should connect the statistical conclusion to the inheritance claim.
`),
    ],
    glossary: [
      { term: "Crossing over", definition: "Exchange of corresponding segments between homologous chromosomes during prophase I, producing recombinant chromatids." },
      { term: "Nondisjunction", definition: "Failure of chromosomes or sister chromatids to separate correctly during division." },
      { term: "Codominance", definition: "Distinct simultaneous expression of both alleles in a heterozygote." },
      { term: "Recombination frequency", definition: "The proportion of recombinant offspring, used to estimate genetic linkage distance over suitable ranges." },
    ],
    examAlignment: {
      title: "Quantitative and model-based genetics",
      description: "Unit 5 rewards explicit probability, model selection, and reasoning from cross or pedigree evidence.",
      criteria: [
        "State the genetic model and assumptions before calculating expected outcomes.",
        "Use recombinant frequencies or pedigree constraints as evidence, not memorized ratios alone.",
        "Interpret statistical results with appropriate caution and biological meaning.",
      ],
      sources: ["cb-bio-ced", "cb-bio-exam", "cb-bio-frq"],
    },
    practice: [
      {
        question: "Two heterozygotes for a recessive condition have one child. What is the probability the child is affected?",
        options: ["0", "1/4", "1/2", "3/4"],
        correctIndex: 1,
        explanation: "Each parent contributes the recessive allele with probability 1/2; 1/2 × 1/2 = 1/4.",
        skill: "Apply probability",
      },
      {
        question: "Two genes show 8% recombinant offspring in a testcross. What does this suggest?",
        options: ["They assort completely independently.", "They are linked but crossing over sometimes separates them.", "They must be on different chromosomes.", "No gametes were produced."],
        correctIndex: 1,
        explanation: "A recombination rate below 50% supports linkage, with recombinants generated by crossing over.",
        skill: "Analyze linkage",
      },
    ],
  },
  {
    unitNumber: 6,
    title: "Unit 6 · Gene expression and regulation",
    description: "Follow genetic information from DNA replication through RNA and protein, then analyze regulation, mutation, viruses, and biotechnology.",
    examWeight: "12–16% of multiple-choice weighting",
    objectives: [
      "Explain replication, transcription, RNA processing, and translation with directionality.",
      "Compare prokaryotic and eukaryotic gene regulation.",
      "Predict molecular and phenotypic effects of mutations and biotechnological manipulations.",
    ],
    sections: [
      section("DNA replication preserves sequence", ["cb-bio-ced", "openstax-biology"], `
DNA replication is semiconservative: each daughter molecule contains one original strand and one newly synthesized strand. Helicase unwinds DNA, single-strand binding proteins stabilize templates, and primase lays RNA primers. DNA polymerase extends from a free 3′ hydroxyl, so new DNA grows 5′ to 3′. Complementary base pairing and proofreading support accuracy, though errors and damage still occur.

Because strands are antiparallel, one new strand is synthesized continuously toward the moving fork and the other discontinuously as Okazaki fragments. DNA ligase joins fragments after primer replacement. Topoisomerase relieves twisting stress. Rather than memorizing enzymes as a list, place each at a replication fork and explain the physical problem it solves. That approach also helps with inhibitor and mutation scenarios.
`),
      section("Transcription and RNA processing", ["cb-bio-ced", "openstax-biology"], `
During transcription, RNA polymerase reads a DNA template 3′ to 5′ and synthesizes RNA 5′ to 3′. Promoters and transcription factors regulate initiation. The coding strand resembles the RNA sequence except T replaces U; the template is complementary. Confusing these strands changes the predicted sequence, so write direction labels before translating or comparing.

In eukaryotes, pre-mRNA commonly receives a 5′ cap, poly-A tail, and splicing that removes introns and joins exons. Alternative splicing allows one gene to produce different RNA isoforms. Mature RNA then exits the nucleus for translation or other functions. Prokaryotes generally lack this nuclear separation, allowing transcription and translation to be coupled.
`),
      section("Translation builds polypeptides", ["cb-bio-ced", "openstax-biology"], `
Ribosomes read mRNA codons 5′ to 3′. Initiation begins at an appropriate start codon, tRNAs deliver amino acids through anticodon pairing, and peptide bonds form in the large ribosomal subunit. The ribosome moves through A, P, and E sites until a stop codon recruits release factors. The genetic code is redundant but not ambiguous: several codons can specify one amino acid, while each codon has one standard meaning.

The polypeptide’s amino-acid sequence then influences folding and function. Signal sequences can direct proteins to particular compartments, and post-translational modifications can alter activity. Gene expression therefore does not end at translation. If a question asks why a nuclear protein is absent despite normal mRNA, consider translation, localization, degradation, and processing rather than assuming transcription must be defective.
`),
      section("Regulation matches expression to conditions", ["cb-bio-ced", "openstax-biology"], `
Bacterial operons coordinate genes with related functions. The lac operon responds to lactose availability and glucose conditions through repressor binding and positive regulation; the trp operon illustrates repression when tryptophan is abundant. Avoid reducing these to “lactose turns on” or “tryptophan turns off” without explaining the regulatory molecules and the cell’s resulting resource use.

Eukaryotic regulation includes chromatin accessibility, transcription factors, enhancers, RNA processing, RNA stability, translation, and protein modification. DNA methylation often represses transcription in regulatory regions, while histone acetylation commonly increases accessibility, but context matters. Different cell types share nearly identical genomes yet express different gene sets. Development and environment alter expression without requiring different DNA sequences in every cell.
`),
      section("Mutation, viruses, and biotechnology", ["cb-bio-ced", "cb-bio-frq", "cb-bio-labs"], `
Substitutions can be silent, missense, or nonsense; insertions and deletions can shift the reading frame unless their total length preserves it. Effects depend on location and protein role, and mutations can be harmful, neutral, or beneficial. Viruses package genetic material and depend on host machinery, with replication strategies varying by genome and envelope. Retroviruses use reverse transcriptase to produce DNA from RNA.

Biotechnology uses these mechanisms deliberately. Restriction enzymes, ligation, PCR, gel electrophoresis, and transformation support analysis and engineering; CRISPR-based systems use programmable targeting and repair outcomes. Gel bands separate primarily by size and charge in standard DNA electrophoresis, with smaller fragments typically migrating farther. In an experiment, include appropriate controls and distinguish detecting a sequence from demonstrating its function.
`),
    ],
    glossary: [
      { term: "Semiconservative replication", definition: "DNA copying in which each daughter duplex contains one parental and one newly synthesized strand." },
      { term: "Alternative splicing", definition: "Different exon combinations from one pre-mRNA, producing multiple RNA isoforms." },
      { term: "Operon", definition: "A bacterial regulatory unit containing coordinated genes and associated control sequences." },
      { term: "Frameshift", definition: "A change in codon grouping caused by insertion or deletion not preserving the reading frame." },
    ],
    examAlignment: {
      title: "Information flow and molecular evidence",
      description: "Unit 6 questions often supply sequences, gels, expression graphs, or pathway diagrams requiring directional reasoning.",
      criteria: [
        "Label 5′ and 3′ ends before predicting RNA or protein sequences.",
        "Explain regulation at the actual level affected—transcription, RNA, translation, or protein.",
        "Use controls to distinguish detection of a molecule from evidence of its biological effect.",
      ],
      sources: ["cb-bio-ced", "cb-bio-exam", "cb-bio-frq"],
    },
    practice: [
      {
        question: "Why is one DNA strand synthesized discontinuously?",
        options: ["RNA polymerase can only move in short bursts.", "DNA polymerase synthesizes 5′ to 3′ while the two templates are antiparallel.", "Ligase unwinds DNA.", "Ribosomes block one strand."],
        correctIndex: 1,
        explanation: "Polymerase directionality plus antiparallel templates requires repeated primer initiation on the lagging template.",
        skill: "Explain replication",
      },
      {
        question: "A nonsense mutation most directly causes what?",
        options: ["A premature stop codon and usually a shortened polypeptide", "A different amino acid with no possibility of truncation", "Doubling of every chromosome", "Removal of the cell membrane"],
        correctIndex: 0,
        explanation: "A nonsense substitution creates a stop codon, terminating translation earlier than normal.",
        skill: "Predict mutation effects",
      },
    ],
  },
  {
    unitNumber: 7,
    title: "Unit 7 · Natural selection and evolution",
    description: "Analyze evidence for common ancestry, model allele-frequency change, and explain how selection, drift, gene flow, and reproductive isolation shape populations.",
    examWeight: "13–20% of multiple-choice weighting",
    objectives: [
      "Explain evolution as population-level heritable change across generations.",
      "Use Hardy–Weinberg and selection models to evaluate population data.",
      "Interpret phylogenies, speciation, extinction, and evidence of common ancestry.",
    ],
    sections: [
      section("Evolution is not individual self-improvement", ["cb-bio-ced", "openstax-biology"], `
Evolution is a change in heritable characteristics or allele frequencies in a population over generations. Individuals can acclimate or develop, but they do not evolve because they try to adapt. Natural selection occurs when heritable variants affect reproductive success in a particular environment. The environment selects among existing variation; it does not generally create a needed mutation on demand.

Fitness means relative reproductive contribution to future generations, not strength or longevity alone. A trait beneficial in one environment can be costly in another. Antibiotic resistance illustrates selection: susceptible cells die or reproduce less, resistant variants increase, and inappropriate antibiotic use can strengthen selection. The first resistant bacterium did not appear because the antibiotic “taught” it what to do.
`),
      section("Selection, drift, and gene flow", ["cb-bio-ced", "openstax-biology"], `
Directional selection shifts a trait distribution, stabilizing selection favors intermediate phenotypes, and disruptive selection favors extremes under some conditions. Sexual selection arises from differences in mating success and can produce costly displays. Artificial selection is human-directed breeding and provides evidence that inherited variation can produce large population changes, though it is not the same mechanism as natural selection.

Genetic drift is random change, often stronger in small populations. Bottlenecks and founder effects can reduce variation and alter allele frequencies independently of fitness. Gene flow moves alleles among populations and can homogenize them or introduce new variation. Mutation ultimately generates new alleles. Evolution usually involves several mechanisms at once, so do not assume every trait difference is adaptive.
`),
      section("Hardy–Weinberg as a null model", ["cb-bio-ced", "cb-bio-labs", "openstax-biology"], `
The Hardy–Weinberg model predicts genotype frequencies from allele frequencies when no evolution occurs: no selection, no mutation, no migration, random mating, and an infinitely large population. For two alleles, \(p+q=1\) and \(p^2+2pq+q^2=1\). Real populations violate assumptions, making the model a baseline for detecting change rather than a description of perfect nature.

If 16% of a population shows a recessive phenotype, \(q^2=0.16\), so \(q=0.4\), \(p=0.6\), and expected heterozygote frequency is \(2pq=0.48\). Check that frequencies sum to one and distinguish allele frequency from phenotype frequency. If a disease allele is rare, carriers can be far more common than affected individuals. Statistical departures require biological interpretation; they do not identify which assumption failed by themselves.
`),
      section("Evidence and phylogenetic reasoning", ["cb-bio-ced", "openstax-biology"], `
Fossils, biogeography, comparative anatomy, developmental patterns, and molecular sequences provide evidence of common ancestry. Homologous structures share ancestry even when functions differ; analogous structures perform similar functions without the same origin. Molecular data can reveal relationships obscured by morphology, but every dataset has limitations. Conserved sequences often reflect functional constraint, while rapidly changing regions can resolve closer relationships.

A phylogenetic tree is a hypothesis about relationships. Nodes represent common ancestors, sister taxa share an immediate ancestor, and branch rotation at a node does not change relationships. A trait present in an outgroup and descendants can help infer ancestral states. The tree’s tips are not ranked from primitive to advanced, and an ancestor is not necessarily one of the living species shown.
`),
      section("Speciation, extinction, and continuing change", ["cb-bio-ced", "cb-bio-exam", "cb-bio-frq"], `
Speciation occurs when gene pools diverge and reproductive isolation reduces gene flow. Allopatric speciation involves geographic separation; sympatric speciation occurs without it through mechanisms such as polyploidy or disruptive ecological and mating divergence. Prezygotic barriers prevent mating or fertilization, while postzygotic barriers reduce hybrid viability or fertility. The biological species concept is useful but not universal for asexual organisms or fossils.

Extinction removes lineages and can open ecological opportunities, while adaptive radiation produces rapid diversification from a common ancestor. Evolution continues in pathogens, pests, crops, and wild populations. In free response, connect evidence to the mechanism requested rather than offering “survival of the fittest” as a universal explanation. If data show no allele-frequency change, consider whether the environment, time scale, or measured locus limits your inference.
`),
    ],
    glossary: [
      { term: "Fitness", definition: "Relative contribution of fertile offspring to later generations in a particular environment." },
      { term: "Genetic drift", definition: "Random fluctuation in allele frequencies, especially consequential in small populations." },
      { term: "Homology", definition: "Similarity due to shared ancestry, regardless of current functional similarity." },
      { term: "Reproductive isolation", definition: "Barriers that prevent or reduce successful gene flow between populations." },
    ],
    examAlignment: {
      title: "Population models and evolutionary evidence",
      description: "The unit combines calculations, tree interpretation, and causal explanations of population change.",
      criteria: [
        "Define evolution at population level and identify the mechanism operating in the scenario.",
        "Use Hardy–Weinberg equations with correct frequency conversions and a null-model interpretation.",
        "Read common ancestry from nodes rather than tip order on a phylogenetic tree.",
      ],
      sources: ["cb-bio-ced", "cb-bio-exam", "cb-bio-frq"],
    },
    practice: [
      {
        question: "If q² = 0.09 in a Hardy–Weinberg population, what is the expected heterozygote frequency?",
        options: ["0.09", "0.21", "0.42", "0.91"],
        correctIndex: 2,
        explanation: "q = 0.3 and p = 0.7, so 2pq = 2(0.7)(0.3) = 0.42.",
        skill: "Calculate population genetics",
      },
      {
        question: "Which event is evolution by natural selection?",
        options: ["An individual lifts weights and becomes stronger.", "A heritable heat-tolerance variant becomes more common after generations of high temperatures.", "A researcher mutates one cell in a dish.", "A tree grows toward light during its lifetime."],
        correctIndex: 1,
        explanation: "Heritable variant frequency changes across generations because of differential reproductive success.",
        skill: "Explain natural selection",
      },
    ],
  },
  {
    unitNumber: 8,
    title: "Unit 8 · Ecology",
    description: "Connect organismal responses, energy flow, population dynamics, community interactions, biodiversity, and human disruption across ecological scales.",
    examWeight: "10–15% of multiple-choice weighting",
    objectives: [
      "Explain how behavior and physiology respond to environmental variation.",
      "Analyze energy flow, nutrient cycling, population growth, and community interactions quantitatively.",
      "Evaluate human impacts and conservation strategies using ecological evidence.",
    ],
    sections: [
      section("Organisms respond to environments", ["cb-bio-ced", "openstax-biology"], `
Behavior and physiology reflect both inherited programs and environmental input. Phototropism directs plant growth toward light, while animal taxis and migration change location in response to stimuli. Photoperiod can regulate flowering or reproduction, and communication signals coordinate mating, alarm, and cooperation. A behavior’s immediate mechanism differs from its evolutionary function; both questions may be asked in an ecological scenario.

Responses involve tradeoffs because energy and time are limited. Defending a territory may improve access to resources while increasing injury risk and energy expenditure. Physiological acclimation can help an individual tolerate change, but limits remain. Avoid claiming every observed behavior is optimal or perfectly adapted. Historical constraints, changing environments, and competing demands shape ecological outcomes.
`),
      section("Energy flow and primary productivity", ["cb-bio-ced", "openstax-biology", "cb-bio-labs"], `
Primary producers capture energy through photosynthesis or chemosynthesis. Gross primary productivity is total captured energy; net primary productivity is what remains after producers’ respiration. Only a fraction transfers between trophic levels because organisms use energy for metabolism, lose heat, and leave material unconsumed or undigested. The familiar approximate 10% transfer is a rough pattern, not a universal constant.

Energy pyramids represent flow through trophic levels, while biomass pyramids represent standing stock and can occasionally invert in aquatic systems with rapid producer turnover. Food webs are more realistic than isolated chains because consumers often occupy multiple trophic levels. When calculating energy availability, identify whether values are gross, net, ingested, assimilated, or respired before applying an efficiency estimate.
`),
      section("Population ecology and growth models", ["cb-bio-ced", "openstax-biology"], `
Exponential growth occurs when per-capita growth remains positive and resources are effectively unlimited: \(dN/dt=rN\). Logistic growth adds density-dependent limitation through carrying capacity \(K\): \(dN/dt=rN((K-N)/K)\). Growth is fastest around intermediate population size in the simple logistic model and approaches zero near K. Real carrying capacities vary with seasons, resources, and disturbance rather than remaining perfectly fixed.

Density-dependent factors include competition, disease, and predation; density-independent factors include many weather events, though their effects can still vary with density. Survivorship curves summarize mortality patterns but are idealized types. Life-history strategies involve tradeoffs among offspring number, parental investment, growth, and survival. The r-selected/K-selected shorthand can guide comparison but should not replace species-specific evidence.
`),
      section("Communities, niches, and biodiversity", ["cb-bio-ced", "openstax-biology"], `
Competition, predation, herbivory, parasitism, mutualism, and commensalism shape communities. A niche includes resource use and environmental conditions, not just a physical address. Competitive exclusion can occur when niches overlap strongly and one species dominates, while resource partitioning allows coexistence. Keystone species have effects disproportionate to their abundance, and ecosystem engineers physically alter habitats.

Biodiversity includes genetic, species, and ecosystem diversity. Species richness counts types; evenness describes relative abundance. Simpson or Shannon indices combine aspects of diversity, so report which measure you use. Disturbance can maintain diversity at intermediate levels by preventing dominance, but severe or novel disturbance can simplify communities. Succession follows changes in community composition after disturbance or habitat formation.
`),
      section("Human disruption and evidence-based conservation", ["cb-bio-ced", "cb-bio-exam", "cb-bio-frq"], `
Habitat loss, fragmentation, invasive species, overharvest, pollution, and climate change interact. Fragmentation reduces habitat and increases edge effects, while small isolated populations face drift and inbreeding risks. Nutrient runoff can cause eutrophication: algal growth followed by decomposition consumes oxygen and harms aquatic life. Carbon, nitrogen, phosphorus, and water cycles link biological and physical reservoirs, so local actions can have distant effects.

Conservation strategies should address the measured mechanism. Corridors can reconnect populations, protected areas can preserve habitat, and sustainable harvest rules require population data. Restoring one species without addressing water quality or land use may fail. On the exam, interpret graphs and propose testable explanations rather than offering generic advice to “save nature.” Include units, controls, and the ecological level at which your claim applies.
`),
    ],
    glossary: [
      { term: "Net primary productivity", definition: "Energy stored in producer biomass after subtracting producers’ respiratory energy use." },
      { term: "Carrying capacity", definition: "The population size an environment can sustain under a model’s specified conditions." },
      { term: "Keystone species", definition: "A species whose ecological effect is disproportionately large relative to its abundance." },
      { term: "Eutrophication", definition: "Nutrient-driven enrichment that can stimulate producer growth and subsequent oxygen-depleting decomposition." },
    ],
    examAlignment: {
      title: "Ecological systems and data analysis",
      description: "Unit 8 often combines food webs, growth curves, diversity indices, and environmental investigations.",
      criteria: [
        "Identify the ecological scale and mechanism before proposing an explanation.",
        "Use the correct growth or productivity quantity and keep units explicit.",
        "Link a conservation recommendation to the specific disruption shown by evidence.",
      ],
      sources: ["cb-bio-ced", "cb-bio-exam", "cb-bio-frq"],
    },
    practice: [
      {
        question: "In logistic growth, what happens as N approaches K in the simple model?",
        options: ["Growth rate approaches zero.", "Growth becomes infinitely negative.", "The carrying capacity must double.", "Reproduction becomes impossible in every individual."],
        correctIndex: 0,
        explanation: "The density-dependent term (K−N)/K approaches zero, slowing net population growth.",
        skill: "Analyze population models",
      },
      {
        question: "Which sequence best explains eutrophication-related fish kills?",
        options: ["Nutrient input → algal growth → decomposition → lower dissolved oxygen", "Less algae → more oxygen → immediate extinction", "More sunlight → no bacteria → lower carbon dioxide", "Fish evolve gills instantly after pollution"],
        correctIndex: 0,
        explanation: "Nutrient enrichment fuels blooms, and microbial decomposition of dead material can deplete oxygen.",
        skill: "Explain ecological disruption",
      },
    ],
  },
];
