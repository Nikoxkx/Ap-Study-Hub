import { section } from "./build";
import type { Lesson } from "./types";

/** Current fall 2026 framework, including all four newly required documents. */
export const apGovLessons: Lesson[] = [
  {
    unitNumber: 1,
    title: "Unit 1 · Foundations of American democracy",
    description: "Read founding arguments in context, trace constitutional compromises, and explain how federalism, separation of powers, and competing democratic ideals distribute power.",
    examWeight: "15–22% of multiple-choice weighting",
    objectives: [
      "Compare democratic ideals and the Federalist–Anti-Federalist debate using foundational documents.",
      "Explain how constitutional design and federalism allocate and limit power.",
      "Use required documents as specific evidence in an argument rather than as quotation decoration.",
    ],
    sections: [
      section("Ideals before institutions", ["cb-gov-ced", "archives-documents", "openstax-government"], `
The Declaration of Independence grounds legitimate government in natural rights, equality, popular consent, and the people’s right to alter destructive government. It is both a philosophical statement and a revolutionary brief against George III. Those purposes matter: the document’s universal language coexisted with slavery and limited political membership. Later Americans repeatedly used its principles to challenge those exclusions, making the Declaration an argument people could reclaim rather than a fixed description of society.

**Popular sovereignty** locates ultimate authority in the people; **republicanism** emphasizes representative government and the public good; **limited government** means rulers are bound by law; and **rule of law** requires even those in power to remain accountable. These ideals can conflict. A majority may demand a policy that threatens a minority’s rights, so constitutional design must enable popular government while restraining some exercises of power.
`),
      section("From confederation to constitutional compromise", ["cb-gov-ced", "archives-documents", "constitution-annotated"], `
The Articles of Confederation preserved substantial state sovereignty and created a central government with limited capacity to tax, regulate commerce, or execute policy independently. Those weaknesses reflected fear of concentrated authority after empire, not simple administrative incompetence. Shays’ Rebellion and interstate economic conflict strengthened calls for reform. The Constitution responded with a more energetic government whose power was divided among branches and between nation and states.

Compromise shaped representation and slavery. The Connecticut Compromise joined a population-based House to equal state representation in the Senate. The Three-Fifths Compromise boosted slaveholding states’ representation without recognizing enslaved people as citizens. The Electoral College created an indirect method of presidential selection. Analyzing these arrangements requires explaining the interests they reconciled and the inequalities they entrenched, not treating every provision as a timeless ideal.
`),
      section("The ratification debate", ["cb-gov-ced", "cb-gov-2026", "constitution-annotated", "openstax-government"], `
Federalist No. 10 argues that factions are inevitable where liberty exists and that a large republic can moderate their effects through representation and a multiplicity of interests. Brutus No. 1 warns that consolidation and distant representation may threaten state authority and accountable government. The disagreement is not “for government” versus “against government”; it concerns the scale, structure, and likely behavior of republican power.

Federalist No. 51 explains separation of powers and checks and balances: ambition should counteract ambition, with each branch given means and motives to resist encroachment. Federalist No. 39, newly required for 2026–27, argues that the Constitution is neither wholly national nor wholly federal. Ratification, congressional representation, and the source of authority display different mixtures. Use these essays together to show that structure and theory are linked, not separate memorization lists.
`),
      section("Federalism as a changing relationship", ["cb-gov-ced", "constitution-annotated", "oyez"], `
Federalism divides authority between national and state governments. Some powers are enumerated for Congress, others are reserved to states, and some are concurrent. The Supremacy Clause makes valid federal law supreme when conflict occurs, while the Tenth Amendment reserves nondelegated powers to states or the people. These statements do not create a clean permanent boundary. Courts, fiscal policy, emergencies, and political bargaining continually reshape the relationship.

*McCulloch v. Maryland* interpreted the Necessary and Proper Clause to support implied federal powers and rejected state taxation of the national bank. *United States v. Lopez* later limited Congress’s Commerce Clause authority by finding that possessing a gun near a school was not sufficiently economic in the relevant sense. Together the cases show that federal power is broad but judicially bounded. Grants-in-aid and mandates add fiscal and administrative dimensions beyond constitutional text alone.
`),
      section("Documents as evidence for FRQ 4", ["cb-gov-ced", "cb-gov-2026", "cb-gov-exam", "cb-gov-frq"], `
The argument essay asks for a defensible thesis supported by at least two pieces of specific, relevant evidence under the prompt’s rules, including foundational-document evidence when required. Naming *Federalist No. 10* is not enough. Explain its extended-republic argument and connect it to the question. If the prompt concerns participatory democracy, you might contrast Madison’s concern about faction with Brutus’s concern about distant government.

For 2026–27, the required set also includes the Emancipation Proclamation, Gettysburg Address, and core principles from Adam Smith’s *Wealth of Nations*, in addition to the earlier nine documents. The Gettysburg Address reconnects equality and popular sovereignty to national survival; it can support arguments about founding ideals. Always use the document options supplied in the actual prompt and explain relevance. Official released FRQs are the safest way to practice the exact evidence rules.
`),
    ],
    glossary: [
      { term: "Popular sovereignty", definition: "The principle that governmental authority ultimately derives from the people." },
      { term: "Faction", definition: "A group united by a shared interest or opinion that may conflict with others’ rights or the public good." },
      { term: "Checks and balances", definition: "Institutional powers allowing branches to restrain one another’s actions." },
      { term: "Implied powers", definition: "Federal authority inferred from enumerated powers and the Necessary and Proper Clause." },
    ],
    examAlignment: {
      title: "Source analysis and constitutional argument",
      description: "Foundational documents are evidence for claims about democratic principles, institutional design, and federalism.",
      criteria: [
        "Explain a document’s argument and context instead of quoting only a famous phrase.",
        "Use McCulloch and Lopez to illustrate both expansion and limitation of federal authority.",
        "Follow the specific evidence instructions printed with each argument-essay prompt.",
      ],
      sources: ["cb-gov-ced", "cb-gov-2026", "cb-gov-exam", "cb-gov-frq"],
    },
    practice: [
      {
        question: "Which statement best represents Federalist No. 39?",
        options: ["The Constitution is wholly national and eliminates states.", "The Constitution combines national and federal features in its authority and institutions.", "Only state legislatures possess sovereignty.", "A large republic necessarily destroys liberty."],
        correctIndex: 1,
        explanation: "Madison describes a compound republic with both national and federal characteristics.",
        skill: "Interpret foundational documents",
      },
      {
        question: "Which pairing best illustrates a constitutional boundary on Commerce Clause power?",
        options: ["McCulloch and Marbury", "Lopez’s rejection of a federal gun-free-school-zone law and the Commerce Clause’s economic-activity limits", "Brown and equal protection", "Tinker and symbolic speech"],
        correctIndex: 1,
        explanation: "Lopez limited Congress’s reliance on commerce for a noneconomic criminal possession statute.",
        skill: "Apply Supreme Court decisions",
      },
      {
        question: "Federalist No. 10 argues that the proposed Constitution controls the effects of factions primarily by",
        options: ["creating a large republic in which many interests make majority tyranny less likely", "abolishing political parties through constitutional amendment", "giving state governments the power to nullify federal laws", "limiting voting rights to property owners in all elections"],
        correctIndex: 0,
        explanation: "Madison's extended republic multiplies factions so no single majority faction can easily form and dominate; the document is required for the SCOTUS comparison and argument essay FRQs.",
        skill: "Required foundational documents",
      },
      {
        question: "Brutus No. 1 warned that the proposed Constitution would most likely",
        options: ["create a distant national government that would erode state power and liberty", "make the presidency too weak to execute the laws", "give the judiciary power to rewrite the Constitution", "end taxation by state governments entirely"],
        correctIndex: 0,
        explanation: "The Anti-Federalist essay feared consolidation: a large republic, the necessary and proper and supremacy clauses, and a standing army would swallow the states—arguments that produced the Bill of Rights.",
        skill: "Required foundational documents",
      },
    ],
  },
  {
    unitNumber: 2,
    title: "Unit 2 · Interactions among branches of government",
    description: "Explain how Congress, the presidency, bureaucracy, and courts make policy through formal powers, informal influence, and mutual restraint.",
    examWeight: "25–36% of multiple-choice weighting",
    objectives: [
      "Compare institutional structures, powers, and incentives across the three branches and bureaucracy.",
      "Explain how checks, oversight, and policy implementation shape interbranch conflict.",
      "Apply Federalist Nos. 70 and 78 and required cases to institutional scenarios.",
    ],
    sections: [
      section("Congress: representation and collective action", ["cb-gov-ced", "openstax-government", "constitution-annotated"], `
The House and Senate represent people differently. Two-year House terms, population-based districts, and revenue-bill initiation create one incentive structure; six-year staggered Senate terms, equal state representation, and advice-and-consent powers create another. Committees allow specialization and agenda control, while party leadership coordinates votes and strategy. The filibuster makes many Senate measures effectively require sixty votes to end debate, although rules and exceptions change.

Legislating requires repeated coalition building across committees, chambers, and the presidency. A bill’s journey is not just a flowchart: each stage offers veto points where opponents can reshape or stop it. Gerrymandering can distort district representation, while *Baker v. Carr* opened legislative-districting questions to federal judicial review and *Shaw v. Reno* constrained race as a predominant redistricting factor without a sufficiently compelling justification.
`),
      section("The presidency: energy within constraints", ["cb-gov-ced", "openstax-government", "constitution-annotated"], `
Federalist No. 70 defends a single executive because unity can supply energy, decisiveness, accountability, and protection against legislative encroachment. Formal powers include command of the military, veto, appointments, treaties with Senate consent, and execution of laws. Informal tools include public persuasion, agenda setting, executive orders, and influence over administration. An executive order is not automatically superior to statute; its authority must derive from the Constitution or law and remains subject to review.

Presidential power expands and contracts through crisis, congressional action, judicial decisions, and public expectations. The new Emancipation Proclamation requirement offers a Civil War example of executive action justified through war powers, limited in geographic scope and transformative in war aims. It should not be reduced to “the president can make any law.” The Twenty-second Amendment, impeachment, appropriations, and elections illustrate continuing constraints.
`),
      section("Bureaucracy and implementation", ["cb-gov-ced", "openstax-government"], `
The bureaucracy translates statutes into regulations, services, enforcement, and expertise. Cabinet departments, independent agencies, government corporations, and regulatory commissions have different structures and degrees of political insulation. Congress grants authority and funding, holds oversight hearings, and can revise statutes. Presidents nominate leaders and use management tools. Courts review whether agencies exceed legal authority or violate procedures and rights.

Rulemaking and enforcement involve discretion because legislation often establishes goals without specifying every detail. That discretion can enable expert adaptation but also raises accountability concerns. Iron triangles describe durable relationships among agencies, congressional committees, and interest groups; issue networks are broader, more fluid sets of participants. Use these models as analytical simplifications, not proof that every policy is controlled by a closed conspiracy.
`),
      section("Judiciary, review, and independence", ["cb-gov-ced", "oyez", "constitution-annotated"], `
Federalist No. 78 argues for judicial independence through tenure during good behavior and protected compensation, while describing courts as having judgment rather than force or will. *Marbury v. Madison* established judicial review as a basis for invalidating government acts that conflict with the Constitution. Alexander Hamilton’s expectation of relative institutional weakness must be reconciled with the judiciary’s substantial influence over policy and rights.

Judicial restraint and judicial activism describe approaches or criticisms, not precise mechanical rules. Courts depend on other actors to implement decisions and are shaped by appointment, jurisdiction, precedent, and public legitimacy. *Brown v. Board of Education*, for example, required executive and local action and further litigation to approach desegregation. In scenario questions, distinguish the Court’s holding from its practical enforcement and from later political responses.
`),
      section("Concept application and data analysis", ["cb-gov-ced", "cb-gov-exam", "cb-gov-frq"], `
The concept-application FRQ gives a political scenario and asks you to describe or explain institutions, behavior, or processes. Read each verb and identify the actor. If asked how Congress can check an agency, “oversight” alone is incomplete: explain that a committee can hold hearings, question officials, publicize findings, and use subsequent legislation or appropriations to influence behavior. The mechanism turns vocabulary into an answer.

Quantitative questions require reading a graph before interpreting it. Identify the variables, units, years, and actual trend, then connect the pattern to a political principle. Do not infer causation from correlation without support. If trust in one branch falls after a scandal, the chart alone may not establish why. Official samples show the difference between a data description, a conclusion, and a connection to course content—three related but distinct moves.
`),
    ],
    glossary: [
      { term: "Filibuster", definition: "Extended Senate debate or obstruction that can delay a vote and often makes cloture necessary." },
      { term: "Executive order", definition: "A presidential directive to the executive branch grounded in constitutional or statutory authority." },
      { term: "Bureaucratic discretion", definition: "Agency judgment in implementing broad statutes through rules, enforcement, and administration." },
      { term: "Judicial review", definition: "The judiciary’s authority to assess government actions against constitutional requirements." },
    ],
    examAlignment: {
      title: "Mechanisms of institutional power",
      description: "High-quality responses explain how an institution or process produces an effect in a given scenario.",
      criteria: [
        "Name the relevant actor, formal or informal tool, target, and causal pathway.",
        "Separate a Supreme Court holding from implementation and political response.",
        "Describe quantitative patterns accurately before connecting them to political principles.",
      ],
      sources: ["cb-gov-ced", "cb-gov-exam", "cb-gov-frq"],
    },
    practice: [
      {
        question: "Which is the clearest example of Congress checking the bureaucracy?",
        options: ["A committee holds oversight hearings and revises an agency’s funding or statutory authority.", "The president issues a signing statement.", "A court grants certiorari.", "A state calls a constitutional convention."],
        correctIndex: 0,
        explanation: "Oversight, legislation, and appropriations are congressional tools directed at agency behavior.",
        skill: "Apply institutional processes",
      },
      {
        question: "How does Federalist No. 70 support a single executive?",
        options: ["By defending lifetime judicial tenure", "By arguing that unity supplies energy, decisiveness, and clear accountability", "By rejecting all emergency power", "By proposing equal state representation"],
        correctIndex: 1,
        explanation: "Hamilton links executive unity to effective action and identifiable responsibility.",
        skill: "Use foundational-document reasoning",
      },
      {
        question: "A president rejects a bill passed by both houses of Congress, and Congress then passes it again with two-thirds of each chamber. This sequence illustrates",
        options: ["the veto and congressional override as checks within the lawmaking process", "judicial review of executive action by the courts", "the Senate's advice-and-consent power over appointments", "a pocket veto during congressional adjournment"],
        correctIndex: 0,
        explanation: "Article I's presentment process lets the president veto, and a two-thirds override in both chambers enacts the bill anyway—a core interaction among branches tested in Unit 2.",
        skill: "Interactions among branches",
      },
      {
        question: "The Senate's power to confirm presidential nominees is an example of",
        options: ["a check by the legislative branch on the executive branch", "judicial supremacy over both political branches", "an implied power of the states under the Tenth Amendment", "the president's power to issue executive orders"],
        correctIndex: 0,
        explanation: "Advice and consent lets the Senate block appointments to the executive branch and judiciary, balancing presidential selection power; it applies to nominees, not to executive orders.",
        skill: "Checks and balances",
      },
    ],
  },
  {
    unitNumber: 3,
    title: "Unit 3 · Civil liberties and civil rights",
    description: "Distinguish protections against government from guarantees of equal citizenship, apply required cases, and explain how social movements and courts expand or restrict rights.",
    examWeight: "13–18% of multiple-choice weighting",
    objectives: [
      "Distinguish civil liberties from civil rights and apply the Bill of Rights through selective incorporation.",
      "Explain balancing among expression, religion, due process, public safety, and equal protection.",
      "Compare required Supreme Court cases and connect legal change to political mobilization.",
    ],
    sections: [
      section("Two kinds of rights claims", ["cb-gov-ced", "constitution-annotated", "openstax-government"], `
**Civil liberties** generally protect people from unjust government interference, including speech, religious exercise, and procedural protections. **Civil rights** concern equal treatment and protection against discrimination, often requiring government action. The categories overlap in real cases, but the distinction clarifies the requested remedy. A challenge to prior restraint asks government not to censor; a challenge to segregated schooling asks for equal protection and institutional change.

The Bill of Rights initially constrained the federal government. Through selective incorporation, the Fourteenth Amendment’s Due Process Clause has applied many protections to states. *Gitlow* is useful background, while *McDonald v. Chicago* specifically incorporated the Second Amendment against state and local governments. Incorporation does not make every right absolute; it determines which level of government must respect the protection.
`),
      section("Expression and press", ["cb-gov-ced", "oyez", "constitution-annotated"], `
*Tinker v. Des Moines* protected student symbolic speech that did not materially and substantially disrupt school operations or invade others’ rights. *Schenck v. United States* upheld Espionage Act convictions and articulated a historical test tied to clear and present danger, later superseded by the more protective Brandenburg standard. Avoid treating Schenck’s famous “fire in a theater” line as the complete current law.

*New York Times Co. v. United States* rejected a prior restraint on publishing the Pentagon Papers, placing a heavy burden on government to justify censorship. That does not eliminate every national-security claim or authorize every publication. When comparing cases, identify speaker, government action, asserted interest, legal test, and holding. The facts determine how a principle applies; a slogan such as “free speech wins” cannot substitute for that analysis.
`),
      section("Religion, due process, and criminal procedure", ["cb-gov-ced", "oyez", "constitution-annotated"], `
The First Amendment contains both the Establishment Clause and Free Exercise Clause. *Engel v. Vitale* held that state-sponsored prayer in public schools violated establishment principles even if participation was formally voluntary. *Wisconsin v. Yoder* protected Amish parents’ religious exemption from compulsory schooling beyond eighth grade, emphasizing the burdens on their community and faith. These cases address different clauses and government actions; do not collapse them into “religion allowed” or “religion banned.”

Procedural rights include counsel, due process, and protections against unreasonable searches and self-incrimination. *Gideon v. Wainwright* required state courts to provide counsel for indigent felony defendants, incorporating a fundamental fairness protection. *Roe v. Wade* remains a required case for understanding its privacy and trimester reasoning; later decisions, especially *Dobbs*, changed the controlling constitutional landscape. Historical required-case analysis and current-law statements must be kept distinct.
`),
      section("Equal protection and struggles for citizenship", ["cb-gov-ced", "archives-documents", "oyez"], `
The Reconstruction Amendments transformed constitutional citizenship. The Thirteenth abolished slavery except as criminal punishment, the Fourteenth established birthright citizenship and equal-protection and due-process language, and the Fifteenth prohibited racial voting restrictions. Formal text did not enforce itself. Segregation, disfranchisement, and exclusion required litigation, legislation, federal enforcement, and sustained activism to challenge.

*Brown v. Board of Education* rejected separate-but-equal in public education because segregated schooling generated unequal status and effects. The newly required Emancipation Proclamation illustrates executive wartime action with bounded scope; the Gettysburg Address articulates equality and popular government as national purposes. “Letter from Birmingham Jail” argues that unjust laws and unjust application can create a moral responsibility for nonviolent direct action. Together they connect constitutional ideals to contested enforcement.
`),
      section("SCOTUS comparison without case-name soup", ["cb-gov-ced", "cb-gov-exam", "cb-gov-frq"], `
The SCOTUS-comparison FRQ supplies information about a nonrequired case and expects you to use a required case’s facts, holding, or reasoning to explain a relevant similarity or difference. Choose the required case with the closest constitutional issue, not merely the one you remember best. State accurate information about it, identify the shared principle, and explain how that principle applies to the supplied scenario.

For example, a nonrequired student-speech case might pair with *Tinker*. Explain Tinker’s substantial-disruption standard, then compare whether the new facts satisfy it. If the scenario concerns a school-sponsored religious exercise, *Engel* may be more relevant. The required cases form a comparative library. Use Oyez and Constitution Annotated to check holdings and reasoning, and use official scoring samples to see how much explanation each response component requires.
`),
    ],
    glossary: [
      { term: "Selective incorporation", definition: "The case-by-case application of many Bill of Rights protections to states through the Fourteenth Amendment." },
      { term: "Prior restraint", definition: "Government action preventing expression before it occurs, bearing a heavy constitutional presumption against validity." },
      { term: "Equal protection", definition: "The Fourteenth Amendment constraint against unjustified governmental discrimination among people." },
      { term: "Civil disobedience", definition: "Open, nonviolent lawbreaking undertaken to challenge injustice, often accepting legal consequences to dramatize a moral claim." },
    ],
    examAlignment: {
      title: "Case facts, holdings, and constitutional reasoning",
      description: "Required cases must be applied to new facts; civil-rights documents must be connected to political principles and action.",
      criteria: [
        "Distinguish the constitutional clause and government action involved in each case.",
        "Use a required case’s precise holding or reasoning to compare a nonrequired scenario.",
        "Separate a required historical holding, such as Roe’s reasoning, from subsequent changes in controlling law.",
      ],
      sources: ["cb-gov-ced", "cb-gov-frq", "oyez"],
    },
    practice: [
      {
        question: "Which case is most relevant to a public school punishing nondisruptive political armbands?",
        options: ["Tinker v. Des Moines", "McCulloch v. Maryland", "Baker v. Carr", "United States v. Lopez"],
        correctIndex: 0,
        explanation: "Tinker supplies the required student-expression and substantial-disruption framework.",
        skill: "Select a required case",
      },
      {
        question: "Why is McDonald v. Chicago an incorporation case?",
        options: ["It applied the Second Amendment to state and local governments through the Fourteenth Amendment.", "It created the Electoral College.", "It prohibited all gun regulation.", "It concerned school prayer under the Establishment Clause."],
        correctIndex: 0,
        explanation: "McDonald extended Second Amendment protection against state and local infringement; it did not eliminate all regulation.",
        skill: "Explain selective incorporation",
      },
      {
        question: "In Tinker v. Des Moines (1969), the Supreme Court protected students' armband protest because",
        options: ["student speech is protected unless it substantially disrupts school operations", "the First Amendment protects all speech in all places without exception", "schools may never regulate any student expression of any kind", "the armbands were a form of commercial speech"],
        correctIndex: 0,
        explanation: "The Court held students do not shed their First Amendment rights at the schoolhouse gate; the substantial-disruption standard from Tinker anchors school-speech analysis, including the Mahanoy comparison.",
        skill: "Required Supreme Court cases",
      },
      {
        question: "The incorporation doctrine applies the Bill of Rights to state governments through which amendment?",
        options: ["The Fourteenth Amendment's Due Process Clause", "The Tenth Amendment's reserved powers", "The Second Amendment's right to bear arms", "The Ninth Amendment's unenumerated rights"],
        correctIndex: 0,
        explanation: "Selective incorporation uses the Fourteenth Amendment (1868) case by case—Gideon, Mapp, and others—extending most Bill of Rights protections against state action.",
        skill: "Civil liberties and incorporation",
      },
    ],
  },
  {
    unitNumber: 4,
    title: "Unit 4 · American political ideologies and beliefs",
    description: "Analyze how political socialization, ideology, economic values, and public opinion shape policy debates—and how to interpret polling data responsibly.",
    examWeight: "10–15% of multiple-choice weighting",
    objectives: [
      "Compare liberal, conservative, libertarian, and other ideological tendencies on policy dimensions.",
      "Explain agents of political socialization and generational or life-cycle effects.",
      "Evaluate polling methodology and connect public opinion to policy without overstating causation.",
    ],
    sections: [
      section("Ideology is a pattern, not a single label", ["cb-gov-ced", "openstax-government"], `
Political ideology is a more or less coherent set of beliefs about government’s role, individual freedom, equality, order, and markets. Contemporary American liberalism generally supports a more active government in economic regulation and social provision while emphasizing many personal freedoms. Conservatism more often favors limited economic regulation, traditional social values, and a strong national defense. These are tendencies with internal factions, not descriptions that fit every voter.

Libertarianism prioritizes individual liberty and skepticism of state intervention across many economic and social issues. Populist and progressive currents can cut across party labels by emphasizing concentrated power and ordinary people’s interests. On any policy, identify the dimension involved: taxation, health care, criminal justice, privacy, or foreign policy may activate different principles. A person’s position on one issue does not reliably reveal every other position.
`),
      section("Economic thought and the new Smith requirement", ["cb-gov-ced", "cb-gov-2026", "openstax-government", "archives-documents"], `
Core principles from Adam Smith’s *The Wealth of Nations* are newly required for 2026–27. The selected ideas emphasize self-interest, specialization, exchange, competition, and markets’ capacity to coordinate resources with limited government direction. These principles inform arguments for free enterprise. They should not be simplified into the claim that Smith supported no public obligations or that every modern market outcome is automatically just or efficient.

Policy debates often concern when markets fail or produce unacceptable distributions. Monopoly, externalities, unequal bargaining power, public goods, and information gaps provide reasons people propose regulation or public provision. Others argue that government intervention creates its own inefficiencies and threats to liberty. Use Smith as evidence for a particular theory of economic coordination, then compare that theory with competing assumptions rather than treating “the invisible hand” as a complete answer.
`),
      section("How political beliefs form", ["cb-gov-ced", "openstax-government"], `
Political socialization is the process through which people acquire political beliefs, identities, and habits. Family, schools, peers, religious institutions, media, workplaces, and major events all contribute. Family influence can be strong, but people revise views through new experiences and information. Socialization is not a one-time childhood download; it continues across a lifetime and varies by social context.

Generational effects occur when a cohort’s shared formative events leave a durable imprint, while life-cycle effects arise as people age into different roles and responsibilities. Period effects affect many age groups at once. If polling shows younger adults more concerned about climate policy, you cannot immediately conclude that people become less concerned as they age. Distinguishing these explanations requires longitudinal or carefully designed comparative evidence.
`),
      section("Public opinion and polling quality", ["cb-gov-ced", "openstax-government", "cb-gov-frq"], `
A scientific poll seeks to estimate a population’s views through a representative sample. Sampling frame, sample size, nonresponse, wording, question order, and weighting all affect quality. A margin of sampling error quantifies one form of uncertainty, not every possible bias. A huge voluntary online poll can be less representative than a smaller probability-based sample. “1,000 people responded” is incomplete without knowing how they were selected.

Interpret results at the level the question supports. Favorability toward “government action” may differ sharply from support for a specific tax or regulation. Trend lines can reveal change, but cross-sectional polls do not by themselves prove why opinion shifted. In quantitative FRQs, identify the actual difference or trend with numbers and units, then make a bounded connection to elections, federalism, policy responsiveness, or another course concept.
`),
      section("Opinion, parties, and policy responsiveness", ["cb-gov-ced", "openstax-government", "cb-gov-exam"], `
Elected officials may respond to public opinion through legislation, messaging, or agenda changes, but the relationship is not automatic. Intensity, salience, organized interests, donor networks, safe districts, constitutional structures, and elite cues all influence outcomes. A majority may favor a broad goal while disagreeing about implementation. Conversely, a highly organized minority can exert influence beyond its numerical share.

Political parties aggregate interests and provide cues, while polarization can strengthen party loyalty and reduce cross-party compromise. When writing an argument about democracy, avoid claiming either that government always follows majority opinion or that opinion never matters. Use specific institutional mechanisms and evidence. You might argue that multiple veto points weaken responsiveness, or that elections and federalism create multiple access points—Federalist No. 39 can support the latter institutional observation.
`),
    ],
    glossary: [
      { term: "Political socialization", definition: "The lifelong process through which individuals acquire political beliefs, identities, and patterns of participation." },
      { term: "Margin of sampling error", definition: "A statistical estimate of sampling uncertainty under stated assumptions, not a measure of every survey error." },
      { term: "Externality", definition: "A cost or benefit of an activity affecting people outside the immediate transaction." },
      { term: "Policy responsiveness", definition: "The degree to which government actions reflect public preferences or demands." },
    ],
    examAlignment: {
      title: "Data, ideology, and bounded inference",
      description: "Unit 4 questions frequently require connecting opinion data or economic principles to political institutions and behavior.",
      criteria: [
        "Describe poll findings with the correct population, measure, direction, and uncertainty.",
        "Use Smith’s principles as a defined argument about markets, not a universal endorsement of every policy.",
        "Distinguish correlation from explanations of why opinion or policy changed.",
      ],
      sources: ["cb-gov-ced", "cb-gov-2026", "cb-gov-exam", "cb-gov-frq"],
    },
    practice: [
      {
        question: "Which polling design is generally strongest for estimating national opinion?",
        options: ["A voluntary website poll open to anyone", "A probability-based sample with documented wording, response rate, and weighting", "A poll of the writer’s friends", "A large sample drawn only from one campaign rally"],
        correctIndex: 1,
        explanation: "Transparent probability sampling and methodological reporting support more defensible population estimates.",
        skill: "Evaluate quantitative evidence",
      },
      {
        question: "Which statement best reflects the required Smith principles?",
        options: ["Central planning is the only efficient economic system.", "Specialization, exchange, competition, and self-interest can coordinate economic activity with limited direction.", "Government must set every price.", "Self-interest always guarantees equal outcomes."],
        correctIndex: 1,
        explanation: "The required selection emphasizes market coordination, not central planning or guaranteed equality.",
        skill: "Connect documents to ideology",
      },
      {
        question: "A poll reports 51% support with a margin of error of ±3 percentage points. The most accurate interpretation is that",
        options: ["true support in the population most likely falls between 48% and 54%", "exactly 51% of all voters support the proposal", "the poll is invalid because it did not survey every voter", "support will rise by 3% before the election occurs"],
        correctIndex: 0,
        explanation: "The margin of error defines a range around the sample estimate; quantitative analysis FRQs reward precise reading of sampling, wording, and methodology rather than treating polls as exact counts.",
        skill: "Quantitative analysis of polling",
      },
      {
        question: "Political socialization research shows that a person's political ideology is most strongly shaped early in life by",
        options: ["family and other primary socializing agents", "campaign advertisements seen in the last week before voting", "the alphabetical order of candidates on the ballot", "the design of their voter registration card"],
        correctIndex: 0,
        explanation: "Family is the dominant early agent, with schools, peers, media, and major events adding influence later; ideology then filters how new information is received.",
        skill: "Political ideology and socialization",
      },
    ],
  },
  {
    unitNumber: 5,
    title: "Unit 5 · Political participation",
    description: "Explain voting, campaigns, parties, interest groups, social movements, and media as interconnected channels through which people seek political influence.",
    examWeight: "20–27% of multiple-choice weighting",
    objectives: [
      "Explain variation in voter turnout and the effects of electoral rules and campaign finance.",
      "Compare parties, interest groups, movements, and media as linkage institutions.",
      "Use documents, cases, and quantitative evidence to construct an argument about participation.",
    ],
    sections: [
      section("Voting rights and turnout", ["cb-gov-ced", "openstax-government", "archives-documents"], `
The expansion of suffrage involved constitutional amendments, legislation, litigation, and activism. The Fifteenth, Nineteenth, Twenty-fourth, and Twenty-sixth Amendments address racial restrictions, sex, poll taxes in federal elections, and age eighteen voting respectively. The Voting Rights Act of 1965 supplied federal enforcement against racial discrimination. Formal eligibility still differs from actual participation because registration, scheduling, identification rules, mobility, and political engagement affect turnout.

Turnout varies by age, education, income, civic attitudes, competitiveness, and institutional convenience. Socioeconomic resources can provide time, information, and recruitment networks, but no demographic variable determines an individual’s choice. When comparing states or countries, keep election type and year consistent. A presidential election usually draws more voters than a midterm or local contest, so raw comparisons across those settings can mislead.
`),
      section("Elections, districts, and campaigns", ["cb-gov-ced", "openstax-government", "oyez"], `
Single-member plurality districts tend to favor two major parties because smaller parties struggle to convert dispersed support into seats. Primaries select nominees, while general elections choose officeholders; their electorates and incentives can differ. The Electoral College allocates state-level influence in presidential elections and usually produces winner-take-all outcomes within states, except Maine and Nebraska’s district methods. These rules shape campaign geography and strategy.

Campaigns raise and spend money for staff, advertising, data, and voter contact. *Citizens United v. FEC* held that independent political expenditures by corporations and unions could not be banned under the relevant First Amendment framework, leading to major changes in outside spending through Super PACs. Independent expenditure is legally distinct from direct contribution to a candidate. Coordination rules and disclosure remain important when analyzing scenarios.
`),
      section("Parties and interest groups", ["cb-gov-ced", "openstax-government"], `
Political parties recruit candidates, organize campaigns, aggregate interests, structure government, and offer voters cues. Party realignment involves durable changes in coalitions and issue agendas, while dealignment describes weakened attachments. Divided government and polarization can alter incentives for compromise. Third parties may influence debate even when they rarely win national office, especially by introducing issues that larger parties later absorb.

Interest groups seek influence without running government directly. They lobby, litigate, conduct research, mobilize members, and shape elections. Pluralist theory emphasizes competition among groups, while elite theory warns that resources and access are unequally distributed. A group’s success depends on membership intensity, money, expertise, alliances, and the institutional venue. Comparing groups requires asking not only how large they are but how effectively they can act.
`),
      section("Movements, protest, and media", ["cb-gov-ced", "archives-documents", "openstax-government"], `
Social movements use sustained collective action outside and inside formal institutions. Tactics include demonstrations, boycotts, strikes, litigation, digital campaigns, and civil disobedience. “Letter from Birmingham Jail” defends nonviolent direct action as a way to create constructive crisis and force negotiation when ordinary channels preserve injustice. Its argument about just and unjust laws can support broader claims about participation, but explain its context rather than quoting it generically.

Media inform, investigate, frame, and set agendas. Agenda setting concerns which issues receive attention; framing concerns how they are presented; priming affects the criteria audiences use to judge leaders or policies. Fragmented and partisan media can reinforce identities and spread misinformation, while local reporting can expose government performance. Evaluate evidence behind a viral claim and distinguish news reporting, commentary, paid content, and fabricated material.
`),
      section("Building the participation argument essay", ["cb-gov-ced", "cb-gov-exam", "cb-gov-frq"], `
A participation prompt may ask whether electoral rules, interest groups, or democratic ideals help or hinder responsive government. Start with a defensible thesis, then select evidence that performs distinct jobs. Federalist No. 10 can support an argument about factions; Brutus No. 1 can support concerns about distant representation; “Letter from Birmingham Jail” can support claims about extra-electoral participation; a turnout graph can illustrate an empirical pattern.

Use reasoning to connect each item to the thesis and address an alternative perspective. If you argue that primaries increase participation, acknowledge that low-turnout, unrepresentative primary electorates can also pull candidates away from the median general-election voter. Complexity should arise from the institution’s actual effects. The current exam is fully digital and includes 55 multiple-choice questions plus four FRQs, each section worth 50%, so practice both document fluency and timed digital composition.
`),
    ],
    glossary: [
      { term: "Linkage institution", definition: "A channel connecting people to government, including parties, elections, interest groups, and media." },
      { term: "Super PAC", definition: "An independent-expenditure-only political committee that may raise unlimited funds but may not contribute directly to or coordinate with candidates." },
      { term: "Agenda setting", definition: "Media influence over which issues audiences perceive as important." },
      { term: "Realignment", definition: "A durable shift in party coalitions, issue commitments, and electoral advantage." },
    ],
    examAlignment: {
      title: "Participation, evidence, and institutional effects",
      description: "The unit supplies scenarios, graphs, documents, and cases well suited to all four FRQ types.",
      criteria: [
        "Explain how an electoral rule changes incentives or access rather than merely defining it.",
        "Distinguish independent expenditures from direct campaign contributions.",
        "Connect foundational-document reasoning and empirical evidence to a defensible participation thesis.",
      ],
      sources: ["cb-gov-ced", "cb-gov-exam", "cb-gov-frq"],
    },
    practice: [
      {
        question: "Which statement about Super PACs is accurate?",
        options: ["They may make unlimited independent expenditures but may not legally coordinate with candidates.", "They are branches of Congress.", "They may secretly give unlimited money directly to candidates.", "They were created by the Twenty-sixth Amendment."],
        correctIndex: 0,
        explanation: "Super PAC activity is defined by independent expenditure and legal separation from candidate campaigns.",
        skill: "Apply campaign-finance rules",
      },
      {
        question: "What does media framing describe?",
        options: ["The number of polling respondents", "The presentation and emphasis that shape how an issue is understood", "The constitutional amendment process", "The direct coordination of a campaign"],
        correctIndex: 1,
        explanation: "Framing selects and emphasizes aspects of an issue, influencing interpretation beyond mere topic salience.",
        skill: "Analyze media influence",
      },
      {
        question: "A state's requirement that voters show government-issued photo identification most directly interacts with participation because it",
        options: ["adds a cost to voting that can reduce turnout among voters lacking qualifying ID", "guarantees that turnout will increase in every election", "applies only to voters in federal primary elections", "replaces the need for voter registration systems"],
        correctIndex: 0,
        explanation: "Voting rules shape the cost of participation; Unit 5 links such structural barriers to turnout patterns debated in policy and measured in quantitative FRQs.",
        skill: "Voting rules and turnout",
      },
      {
        question: "Interest groups use lobbying primarily to",
        options: ["influence government policy by providing information and access to decision-makers", "nominate candidates for office in primary elections", "count and certify ballots after each election", "appoint members of the federal judiciary"],
        correctIndex: 0,
        explanation: "Unlike parties, interest groups seek policy influence rather than office itself; lobbying, litigation, and grassroots pressure are their main linkage tools between citizens and government.",
        skill: "Interest groups and linkage institutions",
      },
    ],
  },
];
