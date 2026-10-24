import { section } from "./build";
import type { Lesson } from "./types";

/** Original teaching and practice aligned to the nine official APUSH periods. */
export const apushLessons: Lesson[] = [
  {
    unitNumber: 1,
    title: "Period 1 · Native worlds and first encounters, 1491–1607",
    description: "Compare complex Indigenous societies, explain European expansion, and evaluate how encounter transformed demographics, labor, ecology, and power across the Atlantic world.",
    examWeight: "4–6% of multiple-choice weighting",
    objectives: [
      "Explain how environment, migration, and exchange shaped different Native American societies before 1492.",
      "Analyze the causes and demographic, ecological, and cultural effects of the Columbian Exchange.",
      "Compare Spanish colonization with the approaches other European powers began to develop.",
    ],
    sections: [
      section("A hemisphere already full of history", ["cb-apush-ced", "openstax-us-history"], `
The phrase “pre-Columbian” can accidentally suggest that the Americas were waiting for history to begin. In fact, societies across the hemisphere had developed distinct political systems, trade routes, agricultural practices, religions, and technologies over thousands of years. The Mississippian city of Cahokia supported large populations and monumental earthworks; the Pueblo peoples built durable settlements in the Southwest; and Mexica, Maya, and Inca states organized labor and tribute on impressive scales. There was no single “Indian way of life,” so a strong answer begins with specific societies rather than a continental stereotype.

Geography influenced these differences without rigidly determining them. In the arid Southwest, irrigation and maize cultivation supported settled villages, while mobile bison hunting became central to many Plains communities only after later changes, including the spread of horses. In the Pacific Northwest, abundant salmon and other resources supported comparatively dense, stratified societies without the same reliance on agriculture. Along the Mississippi and in the Eastern Woodlands, farming, hunting, fishing, and long-distance exchange could coexist. The useful historical question is how people adapted knowledge and institutions to particular environments.
`),
      section("Exchange, adaptation, and diplomacy before conquest", ["cb-apush-ced", "openstax-us-history", "loc-primary-sources"], `
Native communities were connected through exchange as well as separated by language and political rivalry. Copper from the Great Lakes, shells from coasts, obsidian, foodstuffs, and ideas moved along networks that reached far beyond their places of origin. These routes complicate the image of isolated villages. Diplomacy, intermarriage, warfare, adoption, and alliance-making also linked groups. When Europeans arrived, they entered existing relationships; Indigenous nations often evaluated newcomers according to their own strategic interests rather than simply reacting to a European plan.

This agency matters when interpreting a source. A treaty, speech, or account of an alliance is not merely evidence of European expansion; it may reveal a Native leader protecting trade access, balancing a rival nation, or preserving autonomy. Ask who created the source, for which audience, and under what balance of power. A European missionary’s description of a ceremony can preserve useful detail while misunderstanding its meaning. Corroborating with archaeological evidence or a second account lets you use the source without accepting every judgment inside it.
`),
      section("Why Europeans crossed the Atlantic", ["cb-apush-ced", "openstax-us-history"], `
European expansion grew from intertwined economic, political, and religious motives. Demand for Asian spices and luxury goods, new maritime technologies, competition among emerging states, and the desire to spread Christianity all encouraged oceanic voyages. The familiar formula “gold, glory, and God” is a useful memory device only if you explain the mechanisms behind it. Portuguese work along African coasts and Spanish sponsorship of Columbus occurred within a broader struggle for profitable routes, coerced labor, territorial claims, and prestige.

Contact initiated the Columbian Exchange, a two-way movement of plants, animals, microbes, people, and technologies among the Americas, Europe, and Africa. American maize, potatoes, and cacao altered diets and population growth elsewhere; wheat, sugar, horses, and livestock transformed American landscapes and economies. The exchange was not a benign cultural swap. pathogens such as smallpox, against which many Indigenous populations lacked prior exposure, contributed to catastrophic mortality. That demographic collapse reshaped labor systems, settlement, warfare, and imperial power, making disease central rather than incidental to conquest.
`),
      section("Spanish empire, labor, and resistance", ["cb-apush-ced", "openstax-us-history", "loc-primary-sources"], `
Spanish colonizers built an empire through conquest, missions, settlements, and institutions designed to extract wealth and convert Indigenous peoples. The encomienda system granted certain Spaniards claims to Indigenous labor and tribute under the stated obligation to provide protection and Christian instruction. In practice, coercion and abuse were widespread. As epidemics devastated Native populations, colonizers increasingly imported enslaved Africans. The resulting casta classifications attempted to organize a hierarchical society around ancestry, although lived identities and social mobility were more complicated than formal categories imply.

Indigenous responses ranged from adaptation and selective conversion to negotiation, flight, and armed rebellion. Bartolomé de las Casas criticized Spanish cruelty, but his humanitarian argument did not challenge every assumption of empire, and his early position on African labor raises difficult historical questions. The Pueblo Revolt of 1680, although just beyond this unit’s closing date, demonstrates that colonial authority could be forcefully reversed. Avoid presenting conversion or intermarriage as proof of consent: cultural blending occurred inside unequal relationships that varied by place and time.
`),
      section("Comparison and evidence on the exam", ["cb-apush-ced", "cb-apush-frq", "cb-history-2027"], `
Comparing empires requires categories, not a list of national traits. For Spain, France, and England, you might compare economic goals, labor systems, relations with Native nations, settlement patterns, and religious aims. French traders often depended on Indigenous alliances and intermarriage in fur-trading regions, while English settlers more often arrived in family groups and displaced communities from land. Those are tendencies, not absolute rules. A defensible comparison names a meaningful similarity or difference and then explains why it developed in particular colonial settings.

For May 2027 AP History short-answer questions, expect source material and use it actively. If a map shows mortality or trade, identify the pattern before adding outside knowledge. A response such as “disease caused change” earns little analytical traction; explain how population loss weakened some polities, intensified labor demands, and encouraged African enslavement. For contextualization, situate a development within Atlantic competition and exchange rather than reciting everything you know about Columbus. Precision and causation are more valuable than dramatic language.
`),
    ],
    glossary: [
      { term: "Columbian Exchange", definition: "The transatlantic movement of organisms, people, goods, and ideas after 1492, including both agricultural transformation and catastrophic epidemic disease." },
      { term: "Encomienda", definition: "A Spanish colonial grant of Indigenous tribute or labor to a colonist, justified through claims of protection and Christian instruction." },
      { term: "Mississippian", definition: "A network of Native North American cultures known for maize agriculture, mound building, hierarchical polities, and centers such as Cahokia." },
      { term: "Historical agency", definition: "The capacity of historical actors to make choices and pursue goals within constraints, including under colonial rule." },
    ],
    examAlignment: {
      title: "Causation and comparison in Period 1",
      description: "APUSH rewards explanations that connect encounter to changes on both sides of the Atlantic and distinguish among Indigenous and European actors.",
      criteria: [
        "Use specific evidence for at least two societies or regions rather than treating Native Americans as one group.",
        "Explain how disease, labor demands, and imperial competition produced change instead of merely naming them.",
        "Describe a source’s situation or limitation before using it to support a causal claim.",
      ],
      sources: ["cb-apush-ced", "cb-history-2027", "cb-apush-frq"],
    },
    practice: [
      {
        question: "Which development best illustrates how demographic catastrophe after contact affected colonial labor systems?",
        options: ["Spanish colonizers expanded encomienda and imported enslaved African labor as Indigenous populations collapsed.", "Native nations abandoned all agriculture in favor of European livestock.", "European states prohibited migration to the Americas.", "The Columbian Exchange ended competition for American territory."],
        correctIndex: 0,
        explanation: "Epidemic mortality weakened communities and intensified colonizers’ search for controllable labor; enslaved Africans became central to that coercive system.",
        skill: "Explain causation",
      },
      {
        question: "A historian compares Cahokia and a Pacific Northwest community. Which approach is strongest?",
        options: ["Assume both used identical farming systems.", "Rank them by how closely they resembled European states.", "Compare how each organized settlement and resources in a distinct environment.", "Treat the absence of written records as evidence of no political organization."],
        correctIndex: 2,
        explanation: "A sound comparison uses shared categories while preserving regional specificity and does not equate difference with backwardness.",
        skill: "Make connections and comparisons",
      },
    ],
  },
  {
    unitNumber: 2,
    title: "Period 2 · Colonial regions and Atlantic empires, 1607–1754",
    description: "Trace how different colonial economies, labor regimes, religions, and imperial relationships developed—and how enslaved and Indigenous people resisted them.",
    examWeight: "6–8% of multiple-choice weighting",
    objectives: [
      "Compare the Chesapeake, New England, Middle, and Southern Atlantic colonies using consistent categories.",
      "Explain the development of racial slavery and forms of resistance in British North America.",
      "Analyze how imperial wars and Atlantic trade affected colonists and Native nations.",
    ],
    sections: [
      section("Distinct colonies, not one colonial experience", ["cb-apush-ced", "openstax-us-history"], `
Jamestown’s early struggles reveal the importance of labor, food, leadership, and Indigenous power in English settlement. The Chesapeake eventually oriented itself around tobacco, a crop that enriched planters while encouraging land hunger and a demanding labor regime. New England towns more often grew around family migration, mixed farming, and Congregationalist churches. The Middle colonies combined ethnic and religious diversity with commercial agriculture and ports, while the Carolinas and Georgia developed still different relationships to plantation agriculture, trade, and imperial defense.

Regional comparison works best when you keep categories constant. For each region, ask who migrated, how people made a living, what labor they used, how they governed local communities, and how they related to neighboring Native nations. “New England was religious and the South was economic” is too simple: religion shaped Chesapeake life and New England merchants pursued profit. The difference lies in the relative influence of institutions and conditions, not in the total absence of one motive or another.
`),
      section("From indentured labor to hereditary racial slavery", ["cb-apush-ced", "openstax-us-history", "loc-primary-sources"], `
Early Chesapeake planters relied heavily on indentured servants, who exchanged years of labor for passage and the possibility of eventual freedom. Conditions were harsh, and many servants did not survive their terms. During the later seventeenth century, planters increasingly turned to enslaved Africans. Changing labor availability, the profitability of lifelong hereditary bondage, and elite efforts to secure a durable workforce all contributed. Bacon’s Rebellion exposed dangerous tensions among elites, laborers, and Native nations, but slavery’s expansion cannot be explained by that revolt alone.

Colonial law made racial hierarchy durable. Statutes linked enslaved status to the mother’s condition, restricted movement and assembly, and increasingly treated people as chattel property. This was a historical construction, not an inevitable social order. Resistance included preserving languages and kinship, slowing work, escaping, and rebelling. The Stono Rebellion of 1739 demonstrated both the possibility of collective violence and the severity of white retaliation. In New York, conspiracy scares also show how fear could produce dubious accusations and brutal punishment.
`),
      section("Faith, authority, and colonial society", ["cb-apush-ced", "openstax-us-history"], `
Puritan leaders sought a godly commonwealth, but their communities still faced internal disagreement. Roger Williams challenged the entanglement of civil and religious authority and advocated separation that Massachusetts leaders considered dangerous. Anne Hutchinson’s claim to interpret religious truth outside approved channels threatened both clerical authority and gender expectations. Their banishments reveal that intolerance coexisted with debates over conscience. Rhode Island became a haven for some dissenters, though it was not a modern society of unlimited individual freedom.

The First Great Awakening later shook established religious authority across regions. Itinerant preachers emphasized emotional conversion and direct encounters with faith, encouraging some listeners to question inherited hierarchies. New denominations and educational institutions grew from these disputes. Revivalism did not automatically create democratic politics, and many converts defended existing inequalities, but its language of personal spiritual judgment supplied habits and networks that could be turned toward later challenges to authority.
`),
      section("Native power and imperial rivalry", ["cb-apush-ced", "openstax-us-history", "loc-primary-sources"], `
European settlement unfolded within a contested Indigenous landscape. The Powhatan polity, Haudenosaunee, Huron, and many other nations pursued their own diplomatic and economic goals. The fur trade could bring useful goods while increasing dependency, warfare, and exposure to disease. King Philip’s War, or Metacom’s War, grew from land pressure and challenges to Native sovereignty; its devastation altered power in New England. Pueblo resistance in the Southwest similarly showed that imperial borders did not equal uncontested control.

European wars spilled into North America through conflicts often named for monarchs, including King William’s War and Queen Anne’s War. Colonists, enslaved people, and Native nations participated for reasons that did not always match metropolitan aims. The Atlantic economy tied these struggles to sugar, tobacco, manufactured goods, and the forced migration of Africans. Mercantilist policies sought to channel colonial trade toward imperial benefit, but inconsistent enforcement and smuggling left room for colonial enterprise and resentment.
`),
      section("Writing beyond a regional checklist", ["cb-apush-ced", "cb-apush-frq", "cb-history-2027"], `
A comparison essay needs a line of reasoning. You might argue that southern colonies became more dependent on coerced labor than New England because profitable staple crops and land expansion rewarded plantation agriculture, while acknowledging slavery existed in every region. Each paragraph should then advance that claim with paired evidence. A chart of regions can help you revise, but it is not yet an argument. Explain why the similarities and differences matter for the development of colonial society.

For a source-based short answer, connect detail to a larger process. If a runaway advertisement describes an enslaved person’s skills or language, use it as evidence of both human capability and a system that commodified people; consider the enslaver’s purpose and perspective. If an image depicts a revival crowd, do not infer unanimous enthusiasm. Instead, identify what the image can support and what requires corroboration. That distinction between evidence and inference is a core AP historical thinking skill.
`),
    ],
    glossary: [
      { term: "Mercantilism", definition: "An imperial economic approach seeking favorable trade balances and colonial commerce that benefits the parent state." },
      { term: "Chattel slavery", definition: "A hereditary system treating enslaved people as alienable property, enforced through colonial law and violence." },
      { term: "Bacon’s Rebellion", definition: "A 1676 Virginia uprising involving frontier grievances, conflict with Native peoples, and challenges to elite authority." },
      { term: "First Great Awakening", definition: "A series of eighteenth-century revivals emphasizing emotional conversion and sometimes challenging established religious authority." },
    ],
    examAlignment: {
      title: "Comparison, labor systems, and source perspective",
      description: "Period 2 questions often ask students to explain regional divergence and connect slavery or empire to broader social change.",
      criteria: [
        "Compare regions through the same economic, social, or political category.",
        "Connect legal changes in slavery to labor demands and power rather than presenting racism as an unexplained constant.",
        "Identify how an author’s position shapes what a primary source reveals and conceals.",
      ],
      sources: ["cb-apush-ced", "cb-apush-frq"],
    },
    practice: [
      {
        question: "Which change most directly made slavery in British North America hereditary across generations?",
        options: ["Colonial statutes tied a child’s status to the mother’s condition.", "Mercantilists required every colony to grow tobacco.", "Revival preachers abolished indentured servitude.", "The fur trade eliminated plantation agriculture."],
        correctIndex: 0,
        explanation: "Partus sequitur ventrem laws made maternal status determine a child’s enslavement, reinforcing lifelong and inherited racial bondage.",
        skill: "Identify and explain developments",
      },
      {
        question: "What is the best inference from widespread colonial reliance on Native alliances?",
        options: ["European empires exercised uniform control from the moment of settlement.", "Indigenous diplomacy and power remained central to colonial expansion.", "Native nations pursued no independent goals.", "Trade ended conflict among Indigenous groups."],
        correctIndex: 1,
        explanation: "Alliances show that Europeans operated within Indigenous power structures and that Native nations negotiated for their own interests.",
        skill: "Analyze historical evidence",
      },
    ],
  },
  {
    unitNumber: 3,
    title: "Period 3 · Revolution and the early republic, 1754–1800",
    description: "Follow the imperial crisis into revolution, evaluate the Constitution’s compromises, and explain how a fragile republic developed amid internal and international conflict.",
    examWeight: "10–17% of multiple-choice weighting",
    objectives: [
      "Explain how war, taxation, and political ideas moved colonists from protest toward independence.",
      "Evaluate continuity and change in government, rights, labor, and social hierarchy after the Revolution.",
      "Compare Federalist and Anti-Federalist visions and early party conflicts.",
    ],
    sections: [
      section("The Seven Years’ War changes the empire", ["cb-apush-ced", "openstax-us-history", "archives-documents"], `
The Seven Years’ War was a global conflict, and its North American theater began with struggles over the Ohio Valley. Britain’s victory removed France as a major territorial competitor on the continent, but victory brought debt and a larger imperial domain to administer. Native nations did not accept British claims as a transfer of their own sovereignty. Pontiac’s War and the Proclamation of 1763 revealed the gap between imperial declarations and conditions on the ground.

After 1763, British officials sought revenue and tighter control through measures including the Sugar Act, Stamp Act, and Townshend duties. Colonists objected not only to costs but also to constitutional principles: Who could tax them, and what rights accompanied representation? Britain’s answer emphasized virtual representation and parliamentary sovereignty. Colonial resistance moved from petitions and boycotts to coordinated committees and, at times, intimidation. The Revolution emerged from an escalating dispute over authority rather than a single tax.
`),
      section("From resistance to independence", ["cb-apush-ced", "openstax-us-history", "archives-documents"], `
The Boston Massacre, Tea Act, Coercive Acts, and fighting at Lexington and Concord deepened the crisis. Propaganda mattered: engravings and pamphlets selected details to mobilize audiences, so historians must compare accounts rather than treating any one image as a transparent record. Thomas Paine’s *Common Sense* argued in accessible language that monarchy itself was illegitimate and reconciliation inadequate. The Declaration of Independence then joined a philosophical claim about natural rights to a list of grievances against George III.

The Declaration’s assertion that “all men are created equal” coexisted with slavery, women’s exclusion from formal politics, and the dispossession of Native peoples. That contradiction does not make the language meaningless; enslaved petitioners, women writers, and later reformers used its principles to challenge exclusions. At the same time, many enslaved people sought freedom by joining British forces, and many Native nations viewed an expanding United States as the greater threat. Independence meant different things to different communities.
`),
      section("War, confederation, and constitutional design", ["cb-apush-ced", "openstax-us-history", "archives-documents"], `
The Patriot victory depended on endurance, French assistance, geography, and British strategic difficulties as well as battlefield leadership. The war also disrupted households, trade, and slavery. Under the Articles of Confederation, the new states created a union with a weak central government lacking an independent executive and a reliable power to tax. The Northwest Ordinance established an important process for territorial governance and prohibited slavery in the Northwest Territory, while still facilitating settler expansion onto Indigenous lands.

Shays’ Rebellion intensified elite fears that the Confederation could not maintain order, although delegates at Philadelphia disagreed about the remedy. The Constitution created a stronger federal government with separated powers and checks among branches. The Great Compromise balanced population-based and equal state representation; the Three-Fifths Compromise increased the political power of slaveholding states while continuing human bondage. These were not abstract design puzzles: they distributed real power among regions and social groups.
`),
      section("Ratification and competing republics", ["cb-apush-ced", "openstax-us-history", "constitution-annotated"], `
Federalists argued that an energetic national government could preserve the union, manage commerce, and protect rights through an extended republic. Anti-Federalists feared concentrated power, distant representatives, and insufficient explicit protection for liberties. Federalist No. 10 famously argued that a large republic could control factions by multiplying interests; Brutus warned that a vast republic might not represent ordinary people effectively. The promised addition of a bill of rights helped secure ratification, but amendments did not settle every dispute over federal power.

During the 1790s, Hamilton’s financial program promoted assumption of state debts, a national bank, and support for manufactures. Jefferson and Madison feared consolidation and favored a more limited reading of federal authority, though their own later actions could complicate that position. The French Revolution, neutrality, Jay’s Treaty, and conflict over immigration and dissent sharpened party divisions. Washington’s Farewell Address warned against permanent alliances and faction, reflecting concerns rather than a permanent ban on all foreign commitments.
`),
      section("Evaluating revolutionary change", ["cb-apush-ced", "cb-apush-frq", "cb-history-2027"], `
“Was the Revolution revolutionary?” is useful only when you define criteria and groups. Politically, independence replaced monarchy with republican institutions and expanded some forms of participation. Economically, many elites retained property and trade relationships. For enslaved people, emancipation advanced in some northern states while slavery became more entrenched elsewhere. Women gained new rhetorical roles such as republican motherhood but not equal citizenship. Native nations faced intensified pressure. A nuanced argument can find significant change without claiming universal transformation.

For the DBQ, context should establish the broader imperial crisis or Atlantic revolutionary age before the first document is analyzed. Document use means more than quotation: connect a passage to your claim and explain how audience, purpose, or situation affects its significance. A 2027 LEQ presents its choice within the question, so decide promptly which prompt gives you the strongest evidence and reasoning. Outside information should be specific enough to advance the argument, not inserted as a name-dropping contest.
`),
    ],
    glossary: [
      { term: "Republicanism", definition: "A political tradition emphasizing representative government, civic virtue, and the public good, with contested meanings in the early United States." },
      { term: "Articles of Confederation", definition: "The first national governing framework, featuring a weak central government and strong state sovereignty." },
      { term: "Federalism", definition: "A constitutional division of authority between national and state governments, disputed from the founding onward." },
      { term: "Extended republic", definition: "Madison’s argument that a large and diverse republic could make any single oppressive faction less likely to dominate." },
    ],
    examAlignment: {
      title: "Continuity, change, and constitutional argument",
      description: "The period supports causal questions about independence and evaluative questions about how much revolutionary ideals altered society.",
      criteria: [
        "Build a thesis that evaluates the extent of change rather than giving a yes/no label.",
        "Connect constitutional provisions to the interests and conflicts that produced them.",
        "Use source purpose and historical situation as reasoning, not as isolated identification.",
      ],
      sources: ["cb-apush-ced", "cb-history-2027", "cb-apush-frq"],
    },
    practice: [
      {
        question: "Which statement best explains why many enslaved people did not experience independence as liberation?",
        options: ["The Declaration immediately abolished slavery in every state.", "British and Patriot sides offered different and limited paths, while slavery remained entrenched in much of the new republic.", "Enslaved people were unaffected by wartime choices.", "The Constitution outlawed all forms of bondage before 1800."],
        correctIndex: 1,
        explanation: "Freedom seekers pursued varied strategies, but the new republic protected slavery in major ways and emancipation was uneven.",
        skill: "Analyze perspective and continuity",
      },
      {
        question: "Which evidence most directly supports the claim that the Constitution strengthened federal power compared with the Articles?",
        options: ["It created a national government with taxation and separate executive and judicial institutions.", "It retained a unicameral Congress with no executive.", "It prohibited the states from making any laws.", "It dissolved the union into independent republics."],
        correctIndex: 0,
        explanation: "The Constitution supplied independent federal institutions and powers absent under the Articles while preserving significant state authority.",
        skill: "Use specific evidence",
      },
    ],
  },
  {
    unitNumber: 4,
    title: "Period 4 · Democracy, markets, and reform, 1800–1848",
    description: "Connect expanding white male politics and market transformation to sectional divergence, Indigenous removal, women’s activism, and new reform movements.",
    examWeight: "10–17% of multiple-choice weighting",
    objectives: [
      "Analyze how market and transportation changes reshaped work, regions, and political debates.",
      "Explain the expansion and limits of Jacksonian democracy, including Indian removal.",
      "Evaluate how religious and reform movements contested slavery, gender roles, and social order.",
    ],
    sections: [
      section("National development and judicial power", ["cb-apush-ced", "openstax-us-history", "constitution-annotated"], `
Jefferson called the election of 1800 a revolution because power transferred between parties, but his administration did not simply reverse every Federalist policy. The Louisiana Purchase doubled claimed U.S. territory while raising constitutional questions and ignoring that Indigenous nations already inhabited the land. The Lewis and Clark expedition gathered scientific and commercial information through the labor and knowledge of many people, including Sacagawea and the enslaved York. Exploration also served expansionist aims.

The Marshall Court strengthened national judicial authority. *Marbury v. Madison* established judicial review as a central constitutional practice; *McCulloch v. Maryland* upheld implied federal powers and limited state interference with the national bank; *Gibbons v. Ogden* supported a broad federal role in interstate commerce. These decisions did not eliminate conflict over states’ rights. Instead, they supplied precedents that later actors would invoke in new disputes, making them examples of both institutional development and continuing constitutional argument.
`),
      section("The market revolution changes everyday life", ["cb-apush-ced", "openstax-us-history"], `
Canals, steamboats, turnpikes, and railroads reduced transportation costs and connected farms and workshops to distant markets. The Erie Canal helped New York City become a major commercial hub and encouraged settlement and production along its route. New machinery and factory organization changed how goods were made. “Market revolution” names this broad shift toward production for exchange, wage labor, commercial finance, and regional specialization; it does not mean markets were absent before 1800.

The effects varied by class, region, and gender. Lowell’s early textile workforce included young women whose labor was supervised inside and outside the mill, while later immigration changed factory demographics. Northern commercial agriculture and manufacturing coexisted with a southern economy increasingly tied to enslaved labor and cotton. The invention of the cotton gin made short-staple cotton more profitable and helped expand slavery into the interior. Economic interdependence therefore deepened sectional differences rather than simply unifying the nation.
`),
      section("Jacksonian democracy and its boundaries", ["cb-apush-ced", "openstax-us-history", "archives-documents"], `
The expansion of voting rights for white men, popular campaigning, and party organization made politics more participatory for some Americans. Andrew Jackson presented himself as a defender of ordinary people against entrenched elites, yet his own wealth, slaveholding, and policies complicate that image. The spoils system rewarded supporters, while his veto of the national bank’s recharter framed the bank as a privileged monopoly. The Bank War also raised questions about executive power and economic stability.

The era’s democratic language did not extend equally. Indian removal culminated in the Indian Removal Act of 1830 and forced migrations including the Trail of Tears. Cherokee resistance used petitions, diplomacy, and the Supreme Court, but *Worcester v. Georgia* did not secure protection against federal and state expansion. The Nullification Crisis concerned tariff power and states’ claims, while proslavery thinkers increasingly defended slavery as a positive good. Democracy, nationalism, and coercion developed together.
`),
      section("Revivals, reform, and new voices", ["cb-apush-ced", "openstax-us-history"], `
The Second Great Awakening emphasized individual conversion, moral improvement, and voluntary action. Revival networks encouraged temperance, education, prison reform, and abolition, though reformers disagreed about methods and goals. Some sought gradual change and colonization; immediate abolitionists demanded an end to slavery without compensation to enslavers. David Walker, Frederick Douglass, Sojourner Truth, and many Black organizers placed enslaved and free Black experience at the center of the struggle rather than treating abolition as a white philanthropic project alone.

The Seneca Falls Convention of 1848 issued a Declaration of Sentiments that adapted founding language to demand women’s rights. Activism grew from women’s work in religious and antislavery movements and from legal restrictions on property, wages, and political participation. Utopian communities and transcendentalist writers also challenged conventional materialism and authority. These experiments were diverse; grouping them all as eccentric failures misses their role in debating individuality, community, and moral obligation.
`),
      section("Synthesis: interdependence and conflict", ["cb-apush-ced", "cb-apush-frq"], `
Strong Period 4 analysis links processes across regions. Northern factories depended on southern cotton; cotton profits supported national commerce; westward expansion intensified disputes over slavery and Native sovereignty. You can therefore argue that economic integration and sectional polarization increased together. That is more analytical than describing the North and South as two isolated societies. Use evidence such as the Erie Canal, cotton expansion, and internal slave trade to make the relationship concrete.

When asked to evaluate Jacksonian democracy, specify the group and dimension. The period saw broader white male suffrage and energetic party competition but also removal, racial exclusion, and continuing legal inequality for women. A balanced essay is not a list with “however” inserted; it explains why expanded participation for one group could coexist with coercion against others. That line of reasoning can earn complexity by showing how apparently contradictory developments belonged to the same historical order.
`),
    ],
    glossary: [
      { term: "Market revolution", definition: "The antebellum expansion of commercial production, transportation, finance, wage labor, and interregional exchange." },
      { term: "Nullification", definition: "The claimed state power to invalidate a federal law, prominently asserted by South Carolina during the tariff crisis." },
      { term: "Second Great Awakening", definition: "Antebellum Protestant revivals that encouraged conversion, voluntary associations, and varied social reforms." },
      { term: "Indian Removal Act", definition: "The 1830 law authorizing negotiated removal treaties that enabled coercive displacement of Native nations from eastern homelands." },
    ],
    examAlignment: {
      title: "Interdependence, democracy, and exclusion",
      description: "AP tasks commonly connect economic development to sectional and social change or evaluate the limits of political democratization.",
      criteria: [
        "Explain a causal relationship between market growth and another development, such as slavery’s expansion.",
        "Qualify broad terms like democracy by identifying who gained or lost power.",
        "Develop complexity by connecting developments that appear contradictory at first glance.",
      ],
      sources: ["cb-apush-ced", "cb-apush-frq"],
    },
    practice: [
      {
        question: "Which development best supports the claim that economic integration intensified sectional difference?",
        options: ["Northern textile production increased demand for cotton grown by enslaved labor.", "The Erie Canal ended all trade between regions.", "Factories eliminated the need for agricultural raw materials.", "Removal of Native nations reduced cotton cultivation in the Southwest."],
        correctIndex: 0,
        explanation: "Commercial links joined northern manufacturing and southern slavery while reinforcing distinct labor systems and political interests.",
        skill: "Explain causation and connection",
      },
      {
        question: "Which evidence most effectively qualifies a claim that Jacksonian politics was democratic?",
        options: ["Party campaigns used popular symbols.", "White male suffrage expanded.", "Indian removal and continuing racial and gender exclusions restricted political power.", "The national bank had supporters."],
        correctIndex: 2,
        explanation: "The exclusions directly define the limits of democratization rather than merely adding unrelated political detail.",
        skill: "Support and qualify an argument",
      },
    ],
  },
  {
    unitNumber: 5,
    title: "Period 5 · Expansion, Civil War, and Reconstruction, 1844–1877",
    description: "Explain how territorial expansion intensified the slavery crisis, how war transformed the nation, and why Reconstruction brought both constitutional revolution and violent retreat.",
    examWeight: "10–17% of multiple-choice weighting",
    objectives: [
      "Trace the relationship between expansion, political realignment, and the coming of the Civil War.",
      "Explain emancipation as a wartime process shaped by government action and enslaved people’s agency.",
      "Evaluate Reconstruction’s achievements, limits, and overthrow.",
    ],
    sections: [
      section("Expansion and the slavery question", ["cb-apush-ced", "openstax-us-history"], `
Manifest Destiny cast continental expansion as inevitable and virtuous, combining beliefs about national mission, race, land, and economic opportunity. The annexation of Texas and war with Mexico produced enormous territorial gains through the Treaty of Guadalupe Hidalgo. These events were contested from the start. Critics questioned the war’s justification and warned that new territory would extend slavery. The central political problem became whether Congress could or should regulate slavery in the territories.

The Wilmot Proviso, popular sovereignty, and proposals to extend the Missouri Compromise line offered different answers. The Compromise of 1850 admitted California as a free state, organized other territories without a simple slavery ban, addressed the slave trade in Washington, D.C., and enacted a stronger Fugitive Slave Act. That last measure implicated northern residents in slavery’s enforcement and intensified resistance. Compromise delayed rupture but did not resolve the moral and political conflict.
`),
      section("The collapse of the second party system", ["cb-apush-ced", "openstax-us-history", "loc-primary-sources"], `
The Kansas-Nebraska Act of 1854 repealed the Missouri Compromise restriction and allowed popular sovereignty in territories where many had assumed slavery would remain barred. Violence in Kansas and the caning of Charles Sumner exposed the breakdown of ordinary political restraint. The Republican Party formed around opposition to slavery’s expansion, not initially a universal commitment to immediate abolition and racial equality. Its rise reshaped northern politics and alarmed slaveholding leaders.

The *Dred Scott* decision declared that Black people were not citizens in the constitutional sense described by the court and invalidated congressional restriction of slavery in the territories. It transformed a legal case into a sectional crisis by narrowing possible compromises. John Brown’s raid at Harpers Ferry then terrified many white southerners and inspired some abolitionists, while dividing others over violence. Lincoln’s election without southern electoral support triggered secession because slaveholding leaders saw their long-term power at risk.
`),
      section("War aims, emancipation, and human agency", ["cb-apush-ced", "openstax-us-history", "archives-documents"], `
The Confederacy formed to protect slavery and assert independence, while the United States initially emphasized preserving the Union. Enslaved people forced emancipation onto the wartime agenda by escaping to Union lines, providing labor and intelligence, and pressing military authorities to define their status. Contraband policies, confiscation acts, and Black military recruitment developed alongside Lincoln’s evolving position. Emancipation was therefore both a government policy and a social process driven from below.

The Emancipation Proclamation of January 1863 declared freedom for enslaved people in rebellious areas not then under Union control, using war powers and encouraging Black enlistment. It did not immediately free everyone everywhere, and its practical effect expanded with Union military authority. The Thirteenth Amendment later abolished slavery throughout the United States except as punishment for crime. Recognizing the proclamation’s limits is not the same as dismissing its importance: it made emancipation an explicit Union war aim.
`),
      section("Reconstruction’s constitutional revolution", ["cb-apush-ced", "openstax-us-history", "archives-documents"], `
After the war, freedom meant more than the absence of legal ownership. Formerly enslaved people reunited families, built schools and churches, sought land and fair labor contracts, voted, and held office. Presidential Reconstruction and restrictive Black Codes attempted to preserve white control, prompting Congressional Reconstruction and new federal protections. The Fourteenth Amendment established national birthright citizenship and key clauses on privileges or immunities, due process, and equal protection; the Fifteenth prohibited racial restrictions on voting.

The Freedmen’s Bureau assisted with education, labor disputes, and relief, though its resources and authority were limited. Republican governments in the South supported public institutions and infrastructure while facing accusations of corruption that were often racially charged and unevenly applied. Sharecropping provided some autonomy compared with gang labor but could trap families in debt. Evaluating Reconstruction requires attention to both formal constitutional change and the material conditions needed to make freedom secure.
`),
      section("Overthrow, memory, and historical argument", ["cb-apush-ced", "cb-apush-frq", "cb-history-2027"], `
White supremacist organizations used intimidation and mass violence to destroy Republican political organization. The Ku Klux Klan targeted Black voters, officials, teachers, and their allies. Federal Enforcement Acts produced important prosecutions, but sustained national commitment waned. The contested election of 1876 and the Compromise of 1877 removed remaining federal troops from key southern states, accelerating the collapse of Reconstruction governments. Redemption was not simply a peaceful return to normal; it rested on systematic coercion.

A strong essay on Reconstruction avoids the binary of total success or total failure. Constitutional amendments created lasting legal tools, and Black institutions transformed communities, yet landlessness, violence, and later Jim Crow restricted those gains. For a 2027 DBQ, documents may now span a broader chronological range, so compare how later actors remembered or reused Reconstruction rather than assuming every source comes from 1865–1877. Contextualization can link the era to longer struggles over citizenship and federal enforcement.
`),
    ],
    glossary: [
      { term: "Popular sovereignty", definition: "The proposal that territorial voters decide the status of slavery, leaving unresolved who could vote and when the decision occurred." },
      { term: "Fugitive Slave Act of 1850", definition: "Federal legislation strengthening capture and return of accused freedom seekers while limiting their legal protections." },
      { term: "Freedmen’s Bureau", definition: "A federal agency aiding formerly enslaved people and refugees through relief, education, labor oversight, and legal assistance." },
      { term: "Redemption", definition: "The white Democratic overthrow of biracial Republican state governments, often achieved through fraud, intimidation, and violence." },
    ],
    examAlignment: {
      title: "War aims, freedom, and the extent of change",
      description: "This period is central to AP arguments about causation, turning points, citizenship, and the federal government’s role.",
      criteria: [
        "Distinguish slavery’s expansion from immediate abolition when explaining Republican politics.",
        "Explain emancipation through both policy and enslaved people’s actions.",
        "Evaluate Reconstruction using political, economic, and social evidence rather than a single success/failure label.",
      ],
      sources: ["cb-apush-ced", "cb-apush-frq", "cb-history-2027"],
    },
    practice: [
      {
        question: "Why was the Thirteenth Amendment necessary even after the Emancipation Proclamation?",
        options: ["The proclamation had applied only to foreign territories.", "The proclamation was a war measure covering specified rebellious areas, while the amendment abolished slavery nationwide.", "The proclamation had expanded slavery to free states.", "The amendment restored the Missouri Compromise."],
        correctIndex: 1,
        explanation: "The proclamation had a defined wartime scope; the amendment supplied a nationwide constitutional abolition.",
        skill: "Explain legal and historical change",
      },
      {
        question: "Which evidence best challenges the claim that Reconstruction ended because formerly enslaved people rejected politics?",
        options: ["Black men voted, held office, and built civic institutions before violent campaigns suppressed participation.", "The Freedmen’s Bureau existed.", "Some southern governments funded railroads.", "The Fifteenth Amendment used the word race."],
        correctIndex: 0,
        explanation: "Direct evidence of participation refutes the claimed rejection and identifies the coercive forces that dismantled it.",
        skill: "Corroborate and challenge claims",
      },
    ],
  },
  {
    unitNumber: 6,
    title: "Period 6 · Industry, labor, and the Gilded Age, 1865–1898",
    description: "Investigate industrial capitalism, western conquest, urbanization, migration, labor conflict, and the political movements that responded to new concentrations of power.",
    examWeight: "10–17% of multiple-choice weighting",
    objectives: [
      "Explain how technology, corporate organization, and government policy encouraged industrial growth.",
      "Compare the experiences and collective responses of workers, farmers, migrants, and Native nations.",
      "Analyze debates over wealth, government regulation, race, and American expansion.",
    ],
    sections: [
      section("The industrial system takes shape", ["cb-apush-ced", "openstax-us-history"], `
Railroads, steel, petroleum, electricity, and new communication systems helped create national markets and enormous enterprises. Railroads were not just transportation: they stimulated demand for steel and coal, encouraged standardized time, and pioneered complex management. Entrepreneurs used vertical integration to control stages of production and horizontal consolidation to absorb competitors. Access to capital, abundant natural resources, government land grants, and a growing labor supply supported expansion, while boom-and-bust cycles exposed instability.

Business leaders defended accumulation through language about competition and efficiency. Social Darwinism misapplied biological ideas to justify inequality, and Andrew Carnegie’s “Gospel of Wealth” argued that the rich should administer surplus wealth for public benefit. That philanthropy could fund libraries and universities while leaving workers little say over wages or conditions. Instead of labeling industrialists simply heroes or villains, analyze how their choices changed production, opportunity, and power—and how contemporaries contested those choices.
`),
      section("Work, skill, and collective action", ["cb-apush-ced", "openstax-us-history"], `
Industrial work often meant long hours, dangerous machinery, seasonal unemployment, and pressure on skilled crafts. Children and women worked in factories, mines, domestic service, and agriculture, usually under unequal pay and authority. Employers used mechanization and scientific management to control production, while workers sought shorter hours, safer conditions, and bargaining power. The Great Railroad Strike of 1877 showed that local grievances could spread through a national transportation network.

The Knights of Labor attempted broad organization across skill, race, and gender lines, though its inclusiveness had limits, especially toward Chinese workers. The American Federation of Labor emphasized skilled craft unions and practical workplace goals. Haymarket, Homestead, and Pullman became symbols of conflict between labor, employers, and state power. Events were not interchangeable: an anarchist-associated bombing, a lockout and armed confrontation, and a nationwide rail boycott had different causes and outcomes. Accurate chronology strengthens causal explanation.
`),
      section("Western conquest and the reservation system", ["cb-apush-ced", "openstax-us-history", "archives-documents"], `
Railroads, mining rushes, cattle drives, and homesteading accelerated migration into lands still controlled by Native nations. The reservation system and U.S. military campaigns sought to confine Indigenous communities and open resources to settlers. Treaties were repeatedly broken or negotiated under coercion. The Sand Creek and Wounded Knee massacres reveal the violence behind celebratory narratives of frontier settlement, while leaders such as Sitting Bull and Chief Joseph pursued distinct strategies of resistance and survival.

The Dawes Act of 1887 divided communal land into individual allotments and sold “surplus” land, undermining sovereignty and causing massive land loss. Boarding schools attempted to suppress Indigenous languages and identities, most notoriously through the Carlisle model. Assimilation policy was therefore cultural as well as territorial. Native people nevertheless maintained communities, adapted institutions, and preserved traditions. Do not end Native history at Wounded Knee; survival and continuing political action are essential to the longer story.
`),
      section("Cities, migration, and exclusion", ["cb-apush-ced", "openstax-us-history"], `
Industrial jobs, commercial opportunity, violence, and global disruption drove migration to cities. “New” immigration from southern and eastern Europe joined continued arrivals from elsewhere, while African Americans moved within the South and toward northern cities. Urban growth produced crowded tenements and inadequate sanitation but also churches, newspapers, mutual-aid societies, and political organizations. Settlement houses addressed practical needs and created spaces for reform, though middle-class reformers did not always share residents’ priorities.

Nativists portrayed some newcomers as threats to religion, wages, or political order. The Chinese Exclusion Act of 1882 marked a major federal restriction based on race and nationality and built on anti-Chinese violence and labor politics. Migration debates therefore concerned both economic change and definitions of national belonging. When using a cartoon, examine caricature and intended audience: exaggerated features are evidence of prejudice and persuasion, not accurate descriptions of migrants themselves.
`),
      section("Farm protest and Gilded Age politics", ["cb-apush-ced", "openstax-us-history", "cb-apush-frq"], `
Falling crop prices, debt, railroad rates, and tight money fueled agrarian protest. The Grange and Farmers’ Alliances created cooperatives and political pressure; the Populist Party demanded measures including railroad regulation, a graduated income tax, and expanded currency through silver. The 1896 election aligned William Jennings Bryan’s free-silver campaign against William McKinley’s protectionist and gold-standard coalition. Monetary policy mattered because deflation increased the real burden of debts, not because silver was a magical cure.

In an essay about the Gilded Age, connect political conflict to structural economic change. Patronage, party loyalty, and corruption were real, but they do not explain the whole period. Government often aided business through tariffs, land policy, court decisions, and force against strikes. A complex argument might explain how limited-government rhetoric coexisted with active support for capital and western conquest. Specific evidence of policy is more persuasive than relying on the phrase “robber barons.”
`),
    ],
    glossary: [
      { term: "Vertical integration", definition: "Control by one company over multiple stages of production and distribution, such as raw materials, manufacturing, and transport." },
      { term: "Dawes Act", definition: "The 1887 allotment policy that divided tribal lands, promoted assimilation, and facilitated extensive Native land loss." },
      { term: "Chinese Exclusion Act", definition: "The 1882 federal law sharply restricting Chinese labor immigration and codifying racial exclusion." },
      { term: "Free silver", definition: "A monetary campaign for expanded silver coinage intended to increase money supply and ease debt burdens." },
    ],
    examAlignment: {
      title: "Structural change and contested power",
      description: "Questions often link industrialization to labor, migration, western expansion, and demands for government action.",
      criteria: [
        "Distinguish technological change from the corporate and political choices that shaped its effects.",
        "Compare collective responses without treating all unions or reformers as identical.",
        "Analyze visual propaganda as evidence about its creator and audience, not a literal portrait.",
      ],
      sources: ["cb-apush-ced", "cb-apush-frq", "loc-primary-sources"],
    },
    practice: [
      {
        question: "Which policy most directly weakened tribal landholding by converting communal property into individual allotments?",
        options: ["The Homestead Act", "The Dawes Act", "The Sherman Antitrust Act", "The Chinese Exclusion Act"],
        correctIndex: 1,
        explanation: "Allotment under the Dawes Act undermined communal tenure and enabled the sale of large amounts of so-called surplus land.",
        skill: "Identify policy and effects",
      },
      {
        question: "Which statement best explains why farmers supported expanded silver coinage?",
        options: ["They wanted deflation to increase the real value of debts.", "They believed more currency and inflation could ease debt burdens and raise crop prices.", "They sought to end railroad construction.", "They opposed all federal economic action."],
        correctIndex: 1,
        explanation: "An expanded money supply promised relief from deflation and heavy real debt, central concerns of the Populist coalition.",
        skill: "Explain economic causation",
      },
    ],
  },
  {
    unitNumber: 7,
    title: "Period 7 · Empire, depression, and global war, 1890–1945",
    description: "Analyze U.S. expansion, Progressive reform, mass culture, the Great Depression and New Deal, and participation in two world wars.",
    examWeight: "10–17% of multiple-choice weighting",
    objectives: [
      "Evaluate the causes and consequences of overseas expansion and entry into world wars.",
      "Compare Progressive and New Deal efforts to address industrial capitalism’s problems.",
      "Explain how economic crisis and war transformed government, society, and civil liberties.",
    ],
    sections: [
      section("Empire and the world stage", ["cb-apush-ced", "openstax-us-history", "archives-documents"], `
Economic interests, strategic competition, racial ideology, and claims of national mission encouraged overseas expansion. The Spanish-American War followed Cuban rebellion, sensational reporting, and the explosion of the USS *Maine*, though the explosion’s cause was disputed. U.S. victory brought possession or control over territories including Puerto Rico, Guam, and the Philippines. The Philippine-American War demonstrated that an empire acquired in the name of liberation could require violent suppression of another people’s independence.

The Open Door policy sought access to Chinese markets rather than formal annexation, while the Roosevelt Corollary claimed a U.S. role in managing hemispheric disorder. These policies varied in method but expanded assertions of power. Anti-imperialists challenged empire on constitutional, racial, and democratic grounds, though their arguments were not all egalitarian. A nuanced comparison distinguishes supporters’ and opponents’ reasoning rather than assigning every participant a modern position.
`),
      section("Progressive reform and its limits", ["cb-apush-ced", "openstax-us-history"], `
Progressives responded to corporate concentration, unsafe workplaces, urban poverty, political corruption, and environmental destruction. Muckrakers supplied investigations; initiative, referendum, recall, and direct senatorial election promised greater public control. Regulation such as the Pure Food and Drug Act and conservation policies expanded federal responsibility. Reformers disagreed over whether to break up trusts or regulate them, a distinction visible in the 1912 contest between Theodore Roosevelt and Woodrow Wilson.

Many Progressive reforms excluded or targeted people. Segregation, disfranchisement, eugenics, and immigration restriction coexisted with democratic language. Women’s activism advanced labor protections, public health, and suffrage, but the Nineteenth Amendment did not eliminate barriers facing Black, Indigenous, Asian American, and other women. W. E. B. Du Bois and the NAACP challenged accommodationist limits and racial violence. Analyze reform as a contested set of movements rather than a single benevolent impulse.
`),
      section("World War I and the 1920s", ["cb-apush-ced", "openstax-us-history", "archives-documents"], `
U.S. entry into World War I followed submarine warfare, economic ties, and ideological claims about democracy, while neutrality had already been uneven. Mobilization expanded federal coordination of production and labor. The Great Migration accelerated as African Americans sought jobs and escape from Jim Crow violence. Women entered new wartime roles, and propaganda promoted unity. The Espionage and Sedition Acts and the first Red Scare also restricted dissent and targeted radicals and immigrants.

After the war, the Senate rejected the Treaty of Versailles and League membership amid partisan and constitutional conflict. The 1920s brought consumer credit, automobiles, radio, cinema, and new cultural visibility for women and Black artists, alongside Prohibition, the revival of the Ku Klux Klan, and immigration quotas. The Harlem Renaissance was not simply entertainment: writers and artists debated identity, representation, and freedom. Modernity produced celebration and backlash at the same time.
`),
      section("Depression and the New Deal", ["cb-apush-ced", "openstax-us-history"], `
The Great Depression resulted from interacting weaknesses: financial speculation and banking failures, uneven income distribution, farm distress, fragile international finance, and policy mistakes. The stock market crash was a dramatic symptom, not a complete cause. Unemployment, foreclosures, and hunger challenged beliefs about individual responsibility. Hoover used some federal measures but resisted the scale and forms of direct relief later associated with the New Deal; describing him as doing nothing is inaccurate.

Franklin Roosevelt’s programs addressed banking, relief, recovery, labor rights, rural electrification, and social insurance. The WPA employed millions, the Wagner Act protected organizing, and Social Security created a federal safety net, initially excluding many agricultural and domestic workers in ways that disproportionately affected Black and Mexican American workers. The New Deal transformed expectations of government without ending segregation or fully resolving unemployment. Critics from left and right disagreed over whether it went too far or not far enough.
`),
      section("World War II and historical synthesis", ["cb-apush-ced", "openstax-us-history", "cb-apush-frq"], `
Japanese expansion, German aggression, and the failure of appeasement shaped the road to global war. Before Pearl Harbor, U.S. policy moved from formal neutrality toward measures such as Lend-Lease. After entry, wartime production ended mass unemployment and accelerated migration, women’s employment, and federal growth. Japanese American incarceration under Executive Order 9066 was driven by racial prejudice, war hysteria, and political failure—not demonstrated military necessity. The Holocaust and atomic bombings remain central to evaluating the war’s moral and strategic history.

Period 7 invites comparison across crises. Progressivism and the New Deal both expanded state capacity, but they responded to different problems and used different tools. World War I and World War II both mobilized society, yet their economic scale and civil-rights consequences differed. In a 2027 DBQ with a wider chronological range, use later sources to examine memory or consequences without flattening distinctions. Contextualize the period in industrialization and global power, then make documents do specific argumentative work.
`),
    ],
    glossary: [
      { term: "Roosevelt Corollary", definition: "Theodore Roosevelt’s claim that the United States could intervene in Western Hemisphere nations to prevent chronic instability and foreign intervention." },
      { term: "Great Migration", definition: "Large-scale African American movement from the rural South toward northern, midwestern, and later western cities." },
      { term: "New Deal", definition: "The Roosevelt administration’s interlocking relief, recovery, reform, labor, and social-insurance programs during the Depression." },
      { term: "Executive Order 9066", definition: "The 1942 order enabling exclusion that led to mass incarceration of Japanese Americans without individual evidence of disloyalty." },
    ],
    examAlignment: {
      title: "Comparing reform, crisis, and war",
      description: "AP tasks often ask for causal explanations of expansion or depression and comparisons among reform movements and wartime mobilizations.",
      criteria: [
        "Separate an event’s trigger from the deeper conditions that made it consequential.",
        "Assess both expanded federal capacity and exclusions within reform programs.",
        "Compare across periods with a clear analytical category rather than alternating narrative paragraphs.",
      ],
      sources: ["cb-apush-ced", "cb-apush-frq", "cb-history-2027"],
    },
    practice: [
      {
        question: "Which statement most accurately evaluates the New Deal?",
        options: ["It had no lasting effect on federal responsibility.", "It ended racial discrimination and unemployment immediately.", "It expanded federal relief and economic regulation while leaving major exclusions and inequalities.", "It rejected all forms of deficit spending and public works."],
        correctIndex: 2,
        explanation: "The New Deal transformed government’s role but did not fully overcome the Depression or dismantle structural inequality.",
        skill: "Evaluate extent of change",
      },
      {
        question: "What do Progressive conservation and New Deal rural electrification most clearly have in common?",
        options: ["Both used federal power to manage resources or infrastructure for public purposes.", "Both prohibited private property.", "Both ended immigration restriction.", "Both were confined to local government."],
        correctIndex: 0,
        explanation: "The comparison rests on expanded public management, while preserving the programs’ different contexts and aims.",
        skill: "Compare historical developments",
      },
    ],
  },
  {
    unitNumber: 8,
    title: "Period 8 · The Cold War and rights revolutions, 1945–1980",
    description: "Connect global containment and domestic affluence to civil rights, social movements, Vietnam, Watergate, and a growing conservative challenge.",
    examWeight: "10–17% of multiple-choice weighting",
    objectives: [
      "Explain how Cold War conflict shaped foreign policy, domestic politics, and civil liberties.",
      "Evaluate the strategies and achievements of the Black freedom struggle and other rights movements.",
      "Analyze how Vietnam, economic change, and distrust of government altered political coalitions.",
    ],
    sections: [
      section("Containment and a militarized world role", ["cb-apush-ced", "openstax-us-history", "archives-documents"], `
Wartime cooperation between the United States and Soviet Union gave way to conflict over security, ideology, and the reconstruction of Europe. The Truman Doctrine framed aid to Greece and Turkey as resistance to communist expansion, while the Marshall Plan used economic recovery to stabilize Western Europe and limit Soviet influence. NATO institutionalized military alliance. The Berlin blockade and airlift showed how a divided city could become a global test without direct superpower battle.

Containment did not produce one consistent outcome. The Chinese Communist victory and Soviet atomic bomb heightened anxiety; the Korean War ended in stalemate near the original dividing line after extensive devastation. Covert operations in Iran and Guatemala and intervention elsewhere reveal that Cold War policy could undermine elected governments while invoking freedom. Nuclear deterrence discouraged direct war but created existential risk, most dramatically during the Cuban Missile Crisis.
`),
      section("Affluence, suburbia, and domestic anxiety", ["cb-apush-ced", "openstax-us-history"], `
Postwar growth, union contracts, the GI Bill, and consumer credit expanded middle-class life for many Americans. Highways and federally supported mortgages encouraged suburbanization, while redlining and discriminatory lending restricted access for many Black families. The “affluent society” therefore produced both real gains and durable inequality. Television helped create shared national culture and advertising, but it also broadcast civil-rights violence and later Vietnam into homes.

McCarthyism turned fear of communism into investigations, loyalty tests, blacklists, and ruined careers. Accusation often substituted for evidence, making the second Red Scare a civil-liberties issue as well as a foreign-policy story. At the same time, some Cold War liberals supported civil rights partly to strengthen the nation’s international image. Connecting foreign and domestic history can explain why struggles for freedom at home became entangled with competition abroad.
`),
      section("The Black freedom struggle", ["cb-apush-ced", "openstax-us-history", "archives-documents"], `
Civil-rights activists combined litigation, grassroots organizing, economic pressure, and nonviolent direct action. *Brown v. Board of Education* overturned the legal doctrine of separate but equal in public education, but implementation required further conflict. Rosa Parks’s arrest sparked the Montgomery Bus Boycott because an existing network was prepared to act. The Little Rock Nine, sit-ins, Freedom Rides, Birmingham, and Selma exposed segregationist violence and pressed the federal government to intervene.

The Civil Rights Act of 1964 targeted discrimination in public accommodations and employment, while the Voting Rights Act of 1965 attacked disfranchisement through federal enforcement. These victories did not eliminate residential segregation, police violence, or economic inequality. Black Power advocates emphasized self-determination, community control, and pride, and differed among themselves. Rather than setting “nonviolent” and “militant” activists into a simple moral binary, analyze their diagnoses of power and their varying tactics and goals.
`),
      section("The Great Society and widening movements", ["cb-apush-ced", "openstax-us-history"], `
Lyndon Johnson’s Great Society sought to use federal power against poverty, inadequate health care, educational inequality, and environmental damage. Medicare, Medicaid, Head Start, and immigration reform had lasting effects. The War on Poverty achieved important gains but faced funding constraints, local political conflict, and the escalating cost of Vietnam. Liberalism’s ambitions expanded even as its coalition began to fracture.

Other movements borrowed and adapted rights language. César Chávez and Dolores Huerta organized farmworkers through strikes, boycotts, and coalition building. The American Indian Movement demanded sovereignty and treaty rights. Feminists challenged employment discrimination, reproductive restrictions, and cultural expectations, while disagreeing over race, class, sexuality, and strategy. Gay liberation activists resisted police harassment and demanded public dignity. These were connected but distinct movements, not a single undifferentiated “1960s protest.”
`),
      section("Vietnam, Watergate, and conservative resurgence", ["cb-apush-ced", "openstax-us-history", "cb-apush-frq"], `
U.S. escalation in Vietnam grew from containment, credibility concerns, and support for a noncommunist South Vietnamese government. The Tet Offensive contradicted optimistic official claims and intensified public doubt, even though it was a military defeat for communist forces in important respects. Antiwar protest, draft inequities, and revelations such as My Lai undermined support. Nixon’s Vietnamization and expanded bombing sought withdrawal on favorable terms but widened conflict before the Paris settlement.

Watergate exposed abuses of executive power and produced Nixon’s resignation, reinforcing public skepticism. Economic stagflation, deindustrialization, tax revolts, and backlash against busing and rights movements contributed to conservative mobilization. The Sunbelt’s growth shifted population and political influence. For an AP argument, avoid treating 1968 or 1980 as a complete break: liberal institutions persisted, conservative ideas had earlier roots, and activists on all sides continued to contest the meaning of freedom and government.
`),
    ],
    glossary: [
      { term: "Containment", definition: "The strategy of limiting Soviet and communist expansion through alliances, economic aid, military power, and intervention." },
      { term: "Redlining", definition: "Discriminatory mapping and lending practices that restricted housing credit and investment by race and neighborhood." },
      { term: "Voting Rights Act", definition: "The 1965 law providing strong federal tools against racial discrimination in voting and electoral administration." },
      { term: "Stagflation", definition: "The simultaneous combination of stagnant growth, unemployment, and inflation that challenged postwar economic assumptions." },
    ],
    examAlignment: {
      title: "Foreign policy, domestic change, and movement strategy",
      description: "Period 8 rewards students who connect Cold War priorities to domestic life and compare strategies within diverse rights movements.",
      criteria: [
        "Explain both geopolitical and domestic causes or consequences of Cold War policy.",
        "Distinguish legal victories from continuing economic and social inequality.",
        "Avoid treating social movements as uniform; identify each group’s goals, tactics, and constraints.",
      ],
      sources: ["cb-apush-ced", "cb-apush-frq", "archives-documents"],
    },
    practice: [
      {
        question: "Why did civil-rights leaders often use highly visible nonviolent direct action?",
        options: ["To avoid public attention and federal involvement.", "To expose segregationist violence, build moral pressure, and force political response.", "To demonstrate that local laws needed no challenge.", "To replace grassroots organization with litigation only."],
        correctIndex: 1,
        explanation: "Direct action created crises that revealed injustice and made continued federal or local inaction more costly.",
        skill: "Explain strategy and causation",
      },
      {
        question: "Which evidence best supports the claim that postwar prosperity was unequally distributed?",
        options: ["Highway construction increased.", "Television ownership expanded.", "Discriminatory mortgage lending limited Black access to suburban wealth-building.", "The Marshall Plan rebuilt Europe."],
        correctIndex: 2,
        explanation: "Housing discrimination directly restricted access to a major source of postwar asset growth and residential opportunity.",
        skill: "Select relevant evidence",
      },
    ],
  },
  {
    unitNumber: 9,
    title: "Period 9 · Conservatism, globalization, and the recent past, 1980–present",
    description: "Examine the Reagan era, the Cold War’s end, technological and demographic change, terrorism and war, and continuing debates over inequality and government.",
    examWeight: "4–6% of multiple-choice weighting",
    objectives: [
      "Explain the growth of modern conservatism and changes in economic and social policy after 1980.",
      "Analyze how globalization, technological change, and migration reshaped work and politics.",
      "Evaluate major domestic and foreign-policy developments through evidence and cautious periodization.",
    ],
    sections: [
      section("The Reagan coalition and conservative governance", ["cb-apush-ced", "openstax-us-history"], `
Ronald Reagan united several conservative currents: anti-tax and business interests, anti-communists, religious conservatives, and voters frustrated with economic and social change. His administration promoted tax cuts, deregulation, and reduced domestic spending while increasing military expenditure. Supply-side advocates argued that lower marginal taxes would encourage production and growth. Critics emphasized rising deficits and inequality, so assessing “Reaganomics” requires distinguishing predictions from measurable outcomes.

Conservatism also reshaped courts, labor relations, and public debate. Reagan’s confrontation with striking air-traffic controllers signaled a less favorable federal approach to unions. The AIDS crisis exposed both devastating loss and activist demands for research and public-health action, including ACT UP’s challenge to government and pharmaceutical institutions. Culture-war conflicts over schooling, abortion, and family life mobilized voters. Conservatism was a broad coalition with internal tensions, not a single policy checklist.
`),
      section("Cold War’s end and a changing world order", ["cb-apush-ced", "openstax-us-history", "archives-documents"], `
Reagan combined military buildup and forceful rhetoric with eventual negotiations. Mikhail Gorbachev’s reforms, economic strain, popular movements in Eastern Europe, and decisions by multiple leaders all contributed to the Cold War’s end. The fall of the Berlin Wall symbolized a transformation that no single American policy can fully explain. The Soviet Union dissolved in 1991, leaving the United States with enormous influence but no simple roadmap for a unipolar world.

The 1991 Gulf War expelled Iraqi forces from Kuwait through an international coalition and demonstrated U.S. military technology. Interventions in the Balkans, Somalia, and elsewhere raised questions about humanitarian responsibility and national interest. After the Cold War, foreign-policy debate shifted rather than disappeared. When writing causation about 1989–1991, include Soviet and Eastern European agency alongside U.S. strategy; a Washington-only narrative misses decisive parts of the story.
`),
      section("Globalization, technology, and demographic change", ["cb-apush-ced", "openstax-us-history"], `
Trade agreements, container shipping, global finance, and digital communication accelerated the movement of goods, capital, and information. NAFTA reduced barriers among the United States, Canada, and Mexico, generating new commerce while exposing some workers and regions to dislocation. Automation and deindustrialization also changed employment, so job losses cannot responsibly be attributed to trade alone. The service and technology sectors expanded as union density declined and income inequality increased.

Personal computing and the internet transformed commerce, education, politics, and social life. Access and benefits were uneven, creating digital divides. Immigration from Latin America and Asia reshaped communities, while the Immigration Reform and Control Act of 1986 combined legalization for some residents with employer sanctions. Later debates over unauthorized migration and border policy revealed tensions among labor markets, humanitarian concerns, sovereignty, and belonging.
`),
      section("Terrorism, war, and security", ["cb-apush-ced", "openstax-us-history"], `
The attacks of September 11, 2001 killed thousands and transformed U.S. policy. The invasion of Afghanistan targeted al-Qaeda and the Taliban government that harbored it; the 2003 invasion of Iraq was justified through claims about weapons programs and security that became deeply contested. Long wars produced military and civilian casualties, displacement, financial costs, and political consequences across regions. They also changed veterans’ lives and public attitudes toward intervention.

At home, the USA PATRIOT Act expanded surveillance and investigative powers, prompting debate over liberty and security. The Department of Homeland Security reorganized federal responsibilities. Anti-Muslim discrimination and hate crimes demonstrated that security politics could target communities broadly rather than specific threats. Analyzing this period requires both the reality of terrorism and scrutiny of government choices; acknowledging one does not cancel the other.
`),
      section("Recent history and responsible argument", ["cb-apush-ced", "cb-apush-exam", "cb-apush-frq", "cb-history-2027"], `
The 2008 financial crisis emerged from interacting failures in housing finance, banking, ratings, regulation, and risk-taking. Federal rescue measures stabilized institutions but generated public anger over unequal sacrifice. Barack Obama’s election was historically significant without ending structural racism; the Affordable Care Act expanded coverage while provoking enduring conflict. Donald Trump’s presidency, intensified polarization, movements for racial justice, the COVID-19 pandemic, and disputes over election legitimacy reshaped the most recent era. Historians continue to assess these developments with incomplete perspective.

Recent history makes source criticism especially important. Distinguish verified evidence from viral claims, separate policy outcomes from partisan interpretation, and avoid declaring every event unprecedented. For AP writing, use earlier periods to contextualize current debates over federal power, race, or globalization without claiming exact repetition. The 2027 DBQ’s broader range may reward that kind of connection. A strong conclusion can identify a meaningful pattern while acknowledging unresolved change.
`),
    ],
    glossary: [
      { term: "Supply-side economics", definition: "Policies intended to stimulate production and investment, often through lower taxes and reduced regulation." },
      { term: "Globalization", definition: "The intensification of cross-border flows of goods, capital, information, people, and cultural practices." },
      { term: "NAFTA", definition: "The 1994 North American trade agreement reducing barriers among the United States, Canada, and Mexico." },
      { term: "USA PATRIOT Act", definition: "Post-9/11 legislation expanding federal surveillance and investigative authority, generating lasting civil-liberties debates." },
    ],
    examAlignment: {
      title: "Recent history, globalization, and source skepticism",
      description: "The period supports synthesis with earlier debates over government, rights, foreign policy, and economic change.",
      criteria: [
        "Distribute causation among relevant domestic and international actors rather than crediting one leader alone.",
        "Separate a policy’s stated goal from evidence of its varied outcomes.",
        "Use earlier eras for illumination while avoiding unsupported claims that history simply repeats.",
      ],
      sources: ["cb-apush-ced", "cb-apush-frq", "cb-history-2027"],
    },
    practice: [
      {
        question: "Which explanation of the Cold War’s end best reflects historical complexity?",
        options: ["A single U.S. tax policy directly caused Soviet collapse.", "Soviet reform, economic pressures, Eastern European movements, and international diplomacy interacted.", "The Berlin Wall fell without any political causes.", "The Soviet Union dissolved solely because of the Korean War."],
        correctIndex: 1,
        explanation: "The transformation involved multiple actors and structural pressures; monocausal triumphalism omits decisive evidence.",
        skill: "Develop a complex causal explanation",
      },
      {
        question: "Why should claims about recent events be especially qualified?",
        options: ["No sources exist for the recent past.", "Evidence and historical perspective are still developing, and partisan interpretations are active.", "Government policy cannot be studied.", "Earlier history always provides an exact answer."],
        correctIndex: 1,
        explanation: "Recent history is knowable, but archives, outcomes, and interpretations remain incomplete and contested.",
        skill: "Practice evidence-based interpretation",
      },
    ],
  },
];
