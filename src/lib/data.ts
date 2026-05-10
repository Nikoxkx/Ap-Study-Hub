// Static data - comprehensive AP exam content

export const coursesData = [
  {
    id: 1,
    slug: "apush",
    name: "AP United States History",
    shortName: "APUSH",
    description: "Explore the cultural, economic, political, and social developments that have shaped the United States from c. 1491 to the present.",
    color: "blue",
    icon: "🇺🇸",
    examDate: "May 10, 2025",
  },
  {
    id: 2,
    slug: "ap-lang",
    name: "AP English Language and Composition",
    shortName: "AP Lang",
    description: "Develop your ability to read and write with critical awareness of rhetorical strategies and techniques.",
    color: "emerald",
    icon: "✍️",
    examDate: "May 13, 2025",
  },
  {
    id: 3,
    slug: "ap-seminar",
    name: "AP Seminar",
    shortName: "AP Seminar",
    description: "Engage in cross-curricular conversations that explore the complexities of academic and real-world topics through multiple lenses.",
    color: "purple",
    icon: "🔬",
    examDate: "May 7, 2025",
  },
];

export const unitsData: Record<string, { unitNumber: number; title: string; description: string; content: string; keyTerms: string[] }[]> = {
  apush: [
    { unitNumber: 1, title: "Period 1: 1491–1607", description: "European contact and early exploration", content: `## Native American Societies Before European Contact\n\nBefore Europeans arrived, diverse and complex Native American societies existed across North America.\n\n### Major Societies\n- **Pueblo peoples** (Southwest): Irrigation agriculture, adobe architecture\n- **Mississippian culture**: Cahokia — largest pre-Columbian settlement north of Mexico\n- **Iroquois Confederacy**: Political alliance of Haudenosaunee nations\n- **Great Plains peoples**: Nomadic buffalo-hunting cultures\n\n## European Exploration & Colonization\n\n### Motivations — "God, Gold, and Glory"\n- **Economic**: New trade routes, gold, natural resources\n- **Religious**: Spreading Christianity\n- **Political**: National prestige, competition\n\n### The Columbian Exchange\nThe transfer of plants, animals, diseases, and ideas between hemispheres.\n- **To Europe**: Potatoes, corn, tomatoes, tobacco\n- **To Americas**: Horses, cattle, wheat, smallpox, measles\n- **Demographic catastrophe**: 50–90% of indigenous populations decimated by disease\n\n### Spanish Colonial System\n- **Encomienda**: Granted colonists control over indigenous labor\n- **Casta system**: Racial hierarchy\n- **Mission system**: Forced conversion`, keyTerms: ["Columbian Exchange", "Encomienda", "Cahokia", "Iroquois Confederacy"] },
    { unitNumber: 2, title: "Period 2: 1607–1754", description: "Colonial America development", content: `## Chesapeake Colonies\n\n### Virginia\n- **Jamestown (1607)**: First permanent English settlement\n- **Tobacco**: Cash crop that defined Virginia's economy\n- **House of Burgesses (1619)**: First representative assembly\n\n### Bacon's Rebellion (1676)\n- Frontier settlers vs. coastal elites\n- Accelerated shift to African slavery\n\n## New England Colonies\n- **Plymouth (1620)**: Pilgrims; Mayflower Compact\n- **Massachusetts Bay (1630)**: Puritans; "city upon a hill"\n- **Town meetings**: Direct democratic participation\n\n## Colonial Society\n- **Mercantilism**: Colonies exist for mother country's benefit\n- **Navigation Acts**: Trade must pass through England\n- **Salutary neglect**: Lax enforcement → self-governance\n- **Great Awakening (1730s-1740s)**: Religious revival`, keyTerms: ["Jamestown", "Bacon's Rebellion", "Mayflower Compact", "Great Awakening", "Salutary Neglect"] },
    { unitNumber: 3, title: "Period 3: 1754–1800", description: "Revolution and the Early Republic", content: `## Road to Revolution\n\n### French and Indian War (1754–1763)\n- British vs. French for North American dominance\n- British victory → massive debt → new taxes\n- **Proclamation of 1763**: No settlement west of Appalachians\n\n### Acts & Colonial Response\n- **Stamp Act (1765)**: "No taxation without representation"\n- **Boston Massacre (1770)**: 5 colonists killed\n- **Boston Tea Party (1773)**\n- **Intolerable Acts (1774)**\n\n## Revolution\n- **Common Sense (1776)**: Thomas Paine\n- **Declaration of Independence**: Natural rights, social contract\n- **Saratoga (1777)**: Secured French alliance\n- **Yorktown (1781)**: British surrender\n\n## Building the Republic\n- **Articles of Confederation**: Weak central government\n- **Shays' Rebellion (1786-87)**: Exposed weaknesses\n- **Constitution (1787)**: Great Compromise, Three-Fifths Compromise\n- **Bill of Rights (1791)**: First 10 amendments`, keyTerms: ["French and Indian War", "Stamp Act", "Declaration of Independence", "Constitution", "Bill of Rights"] },
    { unitNumber: 4, title: "Period 4: 1800–1848", description: "Democracy, expansion, and reform", content: `## Jefferson's Presidency\n- **Revolution of 1800**: Peaceful transfer of power\n- **Louisiana Purchase (1803)**: Doubled nation's size\n- **Marbury v. Madison (1803)**: Judicial review\n\n## Jacksonian Democracy\n- Expanded suffrage for white males\n- **Spoils system**: Patronage in government\n- **Indian Removal Act / Trail of Tears**\n- **Nullification Crisis**: States' rights debate\n\n## Reform Movements\n- **Second Great Awakening**: Religious revival\n- **Abolitionism**: Garrison, Douglass, Tubman\n- **Seneca Falls Convention (1848)**: Women's rights\n- **Transcendentalism**: Emerson, Thoreau\n\n## Manifest Destiny\n- Belief in divine right to expand westward\n- **Mexican-American War (1846-48)**\n- **Wilmot Proviso**: Attempted slavery ban`, keyTerms: ["Louisiana Purchase", "Marbury v. Madison", "Trail of Tears", "Manifest Destiny", "Seneca Falls"] },
    { unitNumber: 5, title: "Period 5: 1844–1877", description: "Civil War and Reconstruction", content: `## Sectionalism\n- **Compromise of 1850**: California free; Fugitive Slave Act\n- **Kansas-Nebraska Act (1854)**: "Bleeding Kansas"\n- **Dred Scott v. Sandford (1857)**: Slaves not citizens\n- **John Brown's Raid (1859)**\n\n## Civil War (1861-1865)\n- **Election of 1860**: Lincoln wins → secession\n- **Emancipation Proclamation (1863)**\n- **Gettysburg (1863)**: Turning point\n- **Appomattox (1865)**: Lee surrenders\n\n## Reconstruction\n- **13th Amendment**: Abolished slavery\n- **14th Amendment**: Equal protection, citizenship\n- **15th Amendment**: Voting rights\n- **Freedmen's Bureau**\n- **Compromise of 1877**: End of Reconstruction`, keyTerms: ["Compromise of 1850", "Dred Scott", "Emancipation Proclamation", "13th Amendment", "14th Amendment", "15th Amendment"] },
    { unitNumber: 6, title: "Period 6: 1865–1898", description: "Industrialization and Gilded Age", content: `## Industrialization\n- **Transcontinental Railroad (1869)**\n- **Carnegie (steel)**: Vertical integration\n- **Rockefeller (oil)**: Horizontal integration; Standard Oil\n- **Social Darwinism**: "Survival of the fittest"\n\n## Labor Movement\n- **Knights of Labor / AFL**\n- **Haymarket (1886), Homestead (1892), Pullman (1894)**\n\n## Immigration & Politics\n- **New immigrants**: Southern/Eastern Europe, China\n- **Chinese Exclusion Act (1882)**\n- **Political machines**: Tammany Hall\n- **Pendleton Act (1883)**: Civil service reform\n- **Sherman Antitrust Act (1890)**\n\n## Race & the West\n- **Plessy v. Ferguson (1896)**: "Separate but equal"\n- **Dawes Act (1887)**: Broke up tribal lands`, keyTerms: ["Gilded Age", "Carnegie", "Rockefeller", "Plessy v. Ferguson", "Chinese Exclusion Act"] },
    { unitNumber: 7, title: "Period 7: 1890–1945", description: "Imperialism, wars, and the New Deal", content: `## American Imperialism\n- **Spanish-American War (1898)**\n- **Roosevelt Corollary**\n- **Panama Canal**\n\n## Progressive Era\n- **Muckrakers**: Sinclair, Tarbell\n- **16th-19th Amendments**\n- **Federal Reserve Act (1913)**\n\n## World War I\n- U.S. enters 1917\n- **Great Migration**\n- **Wilson's Fourteen Points**\n\n## 1920s & Great Depression\n- Consumer culture, Harlem Renaissance\n- **Crash of 1929** → Depression\n- **FDR's New Deal**: CCC, WPA, Social Security\n\n## World War II\n- **Pearl Harbor (1941)**\n- **D-Day (1944)**\n- **Hiroshima & Nagasaki (1945)**`, keyTerms: ["Progressive Era", "New Deal", "Pearl Harbor", "D-Day", "Great Migration"] },
    { unitNumber: 8, title: "Period 8: 1945–1980", description: "Cold War and Civil Rights", content: `## Cold War\n- **Containment**: Truman Doctrine, Marshall Plan\n- **Korean War (1950-53)**\n- **McCarthyism**\n- **Cuban Missile Crisis (1962)**\n- **Vietnam War**\n\n## Civil Rights Movement\n- **Brown v. Board (1954)**\n- **Montgomery Bus Boycott (1955-56)**\n- **March on Washington (1963)**\n- **Civil Rights Act (1964)**\n- **Voting Rights Act (1965)**\n\n## Other Movements\n- **Feminism**: NOW, Title IX\n- **Chicano Movement**: César Chávez\n- **Environmentalism**: EPA (1970)\n\n## Politics\n- **LBJ's Great Society**\n- **Nixon & Watergate**`, keyTerms: ["Cold War", "Containment", "Brown v. Board", "Civil Rights Act", "Vietnam War", "Watergate"] },
    { unitNumber: 9, title: "Period 9: 1980–Present", description: "Modern America", content: `## Reagan Era\n- **Reaganomics**: Tax cuts, deregulation\n- **End of Cold War (1991)**\n\n## 1990s-2000s\n- **Clinton**: Economic boom, NAFTA\n- **September 11, 2001**\n- **War on Terror**\n- **Great Recession (2008)**\n\n## Recent Era\n- **Obama**: First Black president; ACA\n- **Political polarization**\n- **Social justice movements**\n- **Technology transformation**`, keyTerms: ["Reaganomics", "9/11", "War on Terror", "Great Recession"] },
  ],
  "ap-lang": [
    { unitNumber: 1, title: "Rhetorical Situation", description: "Understanding context and purpose", content: `## The Rhetorical Situation\n\n### SOAPSTone Analysis\n- **Speaker**: Who is communicating?\n- **Occasion**: What prompted this?\n- **Audience**: Who is the intended audience?\n- **Purpose**: Why is the speaker communicating?\n- **Subject**: What is the topic?\n- **Tone**: What is the speaker's attitude?\n\n### Rhetorical Triangle\n- **Ethos**: Credibility/character\n- **Pathos**: Emotional appeals\n- **Logos**: Logical reasoning\n\n### Claims\n- **Claims of Fact**: Something is true/false\n- **Claims of Value**: Something is good/bad\n- **Claims of Policy**: Something should be done`, keyTerms: ["SOAPSTone", "Ethos", "Pathos", "Logos", "Rhetorical Situation"] },
    { unitNumber: 2, title: "Claims and Evidence", description: "Building arguments with support", content: `## Types of Evidence\n- Statistics and data\n- Expert testimony\n- Historical examples\n- Anecdotes\n- Textual evidence\n\n## Reasoning\n- **Warrant**: Connection between evidence and claim\n- **Backing**: Support for the warrant\n- **Qualifier**: Limits on the claim\n\n## Logical Fallacies\n- **Ad hominem**: Attacking the person\n- **Straw man**: Misrepresenting an argument\n- **False dilemma**: Only two options\n- **Slippery slope**: Extreme consequences\n- **Red herring**: Irrelevant distraction`, keyTerms: ["Evidence", "Warrant", "Logical Fallacy", "Ad Hominem", "Straw Man"] },
    { unitNumber: 3, title: "Rhetorical Strategies", description: "Devices and their effects", content: `## Figurative Language\n- **Metaphor / Simile**\n- **Personification**\n- **Hyperbole / Understatement**\n\n## Schemes\n- **Anaphora**: Repetition at start\n- **Parallelism**: Balanced structure\n- **Antithesis**: Contrasting ideas\n- **Chiasmus**: Reversed parallel\n\n## Diction & Syntax\n- **Diction**: Word choice\n- **Syntax**: Sentence structure\n- **Periodic**: Main clause at end\n- **Cumulative**: Main clause first`, keyTerms: ["Anaphora", "Parallelism", "Antithesis", "Chiasmus", "Diction", "Syntax"] },
    { unitNumber: 4, title: "Synthesis", description: "Combining multiple sources", content: `## What is Synthesis?\nCombining information from multiple sources to develop YOUR argument.\n\n### Keys to Synthesis\n1. Have a clear thesis first\n2. Use sources as evidence\n3. Create conversation between sources\n4. Maintain your voice\n\n## Integration Techniques\n- **Quoting**: Exact wording\n- **Paraphrasing**: Your own words\n- **Summarizing**: Condense main ideas\n\n## Synthesis Essay (AP Exam)\n- 6-7 sources provided\n- Must use at least 3\n- ~40 minutes`, keyTerms: ["Synthesis", "Paraphrasing", "Quoting", "Source Integration"] },
    { unitNumber: 5, title: "Rhetorical Analysis", description: "Analyzing author's techniques", content: `## The Rhetorical Analysis Essay\nAnalyze HOW an author builds an argument.\n\n### Focus Questions\n1. What choices does the author make?\n2. Why these choices?\n3. How do they affect the audience?\n\n### Writing Structure\n- **Intro**: Context + analytical thesis\n- **Body**: Strategy → Evidence → Effect\n- **Conclusion**: Overall effectiveness\n\n### Strong Verbs\nemploys, leverages, crafts, establishes, undermines, reinforces, invokes, juxtaposes`, keyTerms: ["Rhetorical Analysis", "Purpose", "Audience", "Tone Shift"] },
    { unitNumber: 6, title: "Argumentation", description: "Writing the argument essay", content: `## The Argument Essay\n- Take a position on a topic\n- Use your own knowledge\n- ~40 minutes\n\n## Evidence Types\n- Historical events\n- Literary references\n- Current events\n- Personal experience\n\n## AP Exam Format\n\n### Multiple Choice (45%)\n- 45 questions, 60 minutes\n\n### Free Response (55%)\n1. Synthesis Essay (6 pts)\n2. Rhetorical Analysis (6 pts)\n3. Argument Essay (6 pts)\n\n### Rubric Categories\n- Thesis (0-1)\n- Evidence & Commentary (0-4)\n- Sophistication (0-1)`, keyTerms: ["Argument Essay", "Synthesis Essay", "Sophistication", "Rubric"] },
  ],
  "ap-seminar": [
    { unitNumber: 1, title: "QUEST Framework", description: "The inquiry process", content: `## The QUEST Framework\n\n- **Q — Question & Explore**: Formulate research questions\n- **U — Understand & Analyze**: Critically read sources\n- **E — Evaluate Multiple Perspectives**: Consider diverse viewpoints\n- **S — Synthesize Ideas**: Combine into your argument\n- **T — Team, Transform, Transmit**: Collaborate and communicate\n\n## Good Research Questions\n- Open-ended (not yes/no)\n- Researchable\n- Significant\n- Focused`, keyTerms: ["QUEST Framework", "Research Question", "Inquiry", "Critical Thinking"] },
    { unitNumber: 2, title: "Source Evaluation", description: "Finding and evaluating sources", content: `## Types of Sources\n- **Primary**: Original documents, data\n- **Secondary**: Analysis of primary sources\n- **Scholarly vs. Popular**\n\n## The CRAAP Test\n- **Currency**: Timeliness\n- **Relevance**: Importance to topic\n- **Authority**: Author credentials\n- **Accuracy**: Supported by evidence?\n- **Purpose**: Why does it exist?\n\n## Identifying Bias\n- Selection bias\n- Confirmation bias\n- Funding bias`, keyTerms: ["Primary Source", "Secondary Source", "CRAAP Test", "Bias", "Credibility"] },
    { unitNumber: 3, title: "Building Arguments", description: "Academic writing and argumentation", content: `## Argument Structure\n\n### PIE Paragraphs\n- **P — Point**: Topic sentence\n- **I — Illustration**: Evidence\n- **E — Explanation**: Analysis\n\n### Counterarguments\n- Acknowledge → Explain → Respond\n\n## Academic Writing\n- Formal tone\n- Define key terms\n- Use hedging language\n- Cite everything`, keyTerms: ["Thesis", "PIE Structure", "Counterargument", "Citation", "Academic Tone"] },
    { unitNumber: 4, title: "Presentation Skills", description: "Effective communication", content: `## Presentation Tips\n- Know your audience\n- Vary pace and tone\n- Minimal notes\n- Simple, visual slides\n\n## Oral Defense\n- Listen carefully\n- Pause before answering\n- Use evidence\n- It's okay to say "I'd need to research that"\n\n## Team Collaboration\n- Establish roles\n- Regular check-ins\n- Peer review\n- Resolve conflicts constructively`, keyTerms: ["Oral Defense", "Presentation", "Collaboration", "Visual Aids"] },
    { unitNumber: 5, title: "AP Seminar Assessment", description: "Exam format and expectations", content: `## Performance Task 1 (20%)\n- Team presentation (8-10 min)\n- Individual Written Report (2000 words)\n- Individual Oral Defense\n\n## Performance Task 2 (35%)\n- Individual presentation (6-8 min)\n- Individual Written Argument (2000 words)\n- Individual Oral Defense\n\n## End-of-Course Exam (45%)\n- **Part A** (30 min): Analyze one source\n- **Part B** (90 min): Build argument from 4 sources\n\n## Scoring (0-5 each)\n- Understanding & Analysis\n- Argument Development\n- Research Process\n- Communication`, keyTerms: ["Performance Task 1", "Performance Task 2", "EOC Exam", "IWR", "IWA"] },
  ],
};

// Expanded flashcards with 50+ per course
export const flashcardsData: Record<string, { front: string; back: string }[]> = {
  apush: [
    // Period 1
    { front: "What was the Columbian Exchange?", back: "The transfer of plants, animals, diseases, and ideas between the Americas and the Old World after 1492. Caused 50-90% indigenous population decline from disease." },
    { front: "What was the encomienda system?", back: "Spanish colonial labor system granting colonists control over indigenous peoples for labor and tribute in exchange for protection and Christian instruction." },
    { front: "What was Cahokia?", back: "The largest pre-Columbian settlement north of Mexico, located near modern-day St. Louis. Center of Mississippian culture with sophisticated urban planning." },
    { front: "What were the three G's of exploration?", back: "God, Gold, and Glory — religious conversion, economic profit, and national prestige that motivated European exploration." },
    // Period 2
    { front: "What was Bacon's Rebellion (1676)?", back: "Virginia frontier settlers vs. coastal elites over Native American policy. Accelerated the shift from indentured servitude to African slavery." },
    { front: "What was salutary neglect?", back: "British policy of lax enforcement of trade regulations in the colonies, allowing colonial self-governance to develop." },
    { front: "What was the Great Awakening?", back: "1730s-1740s religious revival movement emphasizing emotional spirituality and individual salvation. Challenged established churches and promoted equality." },
    { front: "What was the Mayflower Compact?", back: "1620 agreement among Pilgrims establishing self-governance. One of the first examples of written self-government in America." },
    { front: "What was the House of Burgesses?", back: "First representative assembly in colonial America, established in Virginia in 1619." },
    { front: "What was mercantilism?", back: "Economic theory that colonies exist to benefit the mother country through favorable trade balance and resource extraction." },
    // Period 3
    { front: "What did Marbury v. Madison establish?", back: "Judicial review — the Supreme Court's power to declare laws unconstitutional." },
    { front: "What was the Stamp Act (1765)?", back: "British tax on printed materials in the colonies. Led to 'no taxation without representation' protests and colonial unity." },
    { front: "What was the significance of Saratoga?", back: "1777 American victory that convinced France to ally with the colonies, providing crucial military and financial support." },
    { front: "What was the Three-Fifths Compromise?", back: "Constitutional agreement counting three-fifths of enslaved population for representation and taxation purposes." },
    { front: "What were the Articles of Confederation?", back: "First U.S. governing document (1781-1789). Created weak central government with no power to tax or regulate trade." },
    { front: "What was Shays' Rebellion?", back: "1786-87 armed uprising of Massachusetts farmers against debt collection and taxation. Exposed weaknesses of Articles of Confederation." },
    // Period 4
    { front: "What was Manifest Destiny?", back: "19th-century belief that American expansion across the continent was divinely ordained and inevitable." },
    { front: "What was the Louisiana Purchase?", back: "1803 acquisition of French territory that doubled U.S. size for $15 million. Tested constitutional limits on presidential power." },
    { front: "What was the Trail of Tears?", back: "Forced relocation of Cherokee and other Native Americans from southeastern U.S. to Oklahoma (1838-39). Thousands died during the journey." },
    { front: "What was the Second Great Awakening?", back: "Early 19th-century religious revival that inspired reform movements including abolitionism, temperance, and women's rights." },
    { front: "What was the Seneca Falls Convention?", back: "1848 women's rights convention that produced the Declaration of Sentiments demanding equality, including suffrage." },
    { front: "What was the Nullification Crisis?", back: "1832-33 confrontation over South Carolina's claim that states could nullify federal tariffs. Jackson threatened military force." },
    // Period 5
    { front: "What were the Reconstruction Amendments?", back: "13th: Abolished slavery. 14th: Equal protection + citizenship. 15th: Voting rights regardless of race." },
    { front: "What was the Emancipation Proclamation?", back: "1863 executive order freeing enslaved people in Confederate states. Transformed the war into a fight for freedom." },
    { front: "What was the Compromise of 1850?", back: "Package of bills admitting California as free state, strengthened Fugitive Slave Act, and allowed popular sovereignty in new territories." },
    { front: "What was Dred Scott v. Sandford?", back: "1857 Supreme Court ruling that African Americans were not citizens and Congress couldn't ban slavery in territories." },
    { front: "What was the Kansas-Nebraska Act?", back: "1854 law allowing popular sovereignty in Kansas and Nebraska territories, leading to violent conflict known as 'Bleeding Kansas.'" },
    { front: "What was the Freedmen's Bureau?", back: "Federal agency (1865-1872) providing food, housing, education, and legal assistance to formerly enslaved people and poor whites." },
    // Period 6
    { front: "What was the Gilded Age?", back: "Late 19th century era of rapid industrialization, wealth inequality, political corruption, and social change (term from Mark Twain)." },
    { front: "Who was Andrew Carnegie?", back: "Steel magnate who used vertical integration to control all aspects of production. Later became major philanthropist." },
    { front: "Who was John D. Rockefeller?", back: "Oil tycoon who used horizontal integration to create Standard Oil monopoly. Pioneered trust business structure." },
    { front: "What was Plessy v. Ferguson?", back: "1896 Supreme Court ruling establishing 'separate but equal' doctrine, legalizing racial segregation until Brown v. Board (1954)." },
    { front: "What was the Chinese Exclusion Act?", back: "1882 law prohibiting Chinese immigration — first major federal restriction on immigration based on nationality." },
    { front: "What was the Sherman Antitrust Act?", back: "1890 law prohibiting monopolies and trusts that restrained trade. Initially used weakly but strengthened in Progressive Era." },
    // Period 7
    { front: "What was the New Deal?", back: "FDR's response to the Great Depression. Three Rs: Relief (CCC, WPA), Recovery (TVA), Reform (Social Security)." },
    { front: "What was the Progressive Era?", back: "Early 20th century reform movement addressing industrialization's problems: corruption, monopolies, working conditions, and social issues." },
    { front: "Who were the muckrakers?", back: "Investigative journalists exposing corruption and social problems. Examples: Upton Sinclair (meat industry), Ida Tarbell (Standard Oil)." },
    { front: "What was the Great Migration?", back: "Mass movement of African Americans from rural South to urban North (1910s-1970s). Transformed American demographics and culture." },
    { front: "What caused the Great Depression?", back: "Stock market crash (1929), bank failures, reduced consumer spending, overproduction, and Federal Reserve policy failures." },
    { front: "What was Pearl Harbor?", back: "December 7, 1941 Japanese attack on U.S. naval base in Hawaii. Brought America into World War II." },
    // Period 8
    { front: "What was the policy of containment?", back: "U.S. Cold War strategy to prevent communism's spread. Led to Korea, Vietnam, and proxy conflicts." },
    { front: "What did Brown v. Board of Education decide?", back: "Ruled school segregation unconstitutional, overturning Plessy v. Ferguson's 'separate but equal' doctrine." },
    { front: "What was the Cuban Missile Crisis?", back: "1962 confrontation over Soviet missiles in Cuba. Closest the Cold War came to nuclear war; resolved through diplomacy." },
    { front: "What was the Civil Rights Act of 1964?", back: "Landmark legislation outlawing discrimination based on race, color, religion, sex, or national origin in employment and public accommodations." },
    { front: "What was the Voting Rights Act of 1965?", back: "Federal law prohibiting racial discrimination in voting, including literacy tests and other barriers to African American voting." },
    { front: "What was Watergate?", back: "1972-74 political scandal involving Nixon administration's cover-up of break-in at DNC headquarters. Led to Nixon's resignation." },
    { front: "What was the Gulf of Tonkin Resolution?", back: "1964 Congressional resolution giving Johnson authority to escalate U.S. military involvement in Vietnam without formal declaration of war." },
    { front: "What was McCarthyism?", back: "1950s anti-communist hysteria led by Senator Joseph McCarthy. Characterized by unfounded accusations and political persecution." },
    // Period 9
    { front: "What was Reaganomics?", back: "Reagan's economic policy: tax cuts, deregulation, reduced social spending, and increased military spending. 'Supply-side' or 'trickle-down' economics." },
    { front: "What was September 11, 2001?", back: "Terrorist attacks by al-Qaeda killing nearly 3,000 people. Led to War on Terror, invasions of Afghanistan and Iraq." },
    { front: "What was the Great Recession?", back: "2007-2009 economic crisis triggered by housing market collapse and financial sector failures. Worst recession since Great Depression." },
    { front: "What was NAFTA?", back: "North American Free Trade Agreement (1994) eliminating most tariffs between U.S., Canada, and Mexico. Replaced by USMCA in 2020." },
    { front: "What was the Affordable Care Act?", back: "2010 healthcare reform expanding insurance coverage, prohibiting denial for pre-existing conditions, and creating healthcare exchanges." },
  ],
  "ap-lang": [
    // Rhetorical Appeals
    { front: "What is ethos?", back: "Appeal to the speaker's credibility, character, or authority. Established through expertise, fair treatment of opponents, and ethical behavior." },
    { front: "What is pathos?", back: "Appeal to the audience's emotions. Uses vivid language, imagery, anecdotes, and emotional examples to create connection." },
    { front: "What is logos?", back: "Appeal to logic and reason. Uses facts, statistics, expert testimony, and logical arguments to persuade." },
    { front: "What is kairos?", back: "The opportune moment or timeliness of an argument. Considers when and why the argument is being made now." },
    // Rhetorical Devices
    { front: "What is anaphora?", back: "Repetition of a word/phrase at the beginning of successive clauses. Example: 'We shall fight on the beaches, we shall fight on the landing grounds...'" },
    { front: "What is antithesis?", back: "Juxtaposition of contrasting ideas in balanced phrases. Example: 'It was the best of times, it was the worst of times.'" },
    { front: "What is parallelism?", back: "Using similar grammatical structures to express related ideas. Creates rhythm, emphasis, and memorability." },
    { front: "What is chiasmus?", back: "Reversal of grammatical structures in successive phrases. Example: 'Ask not what your country can do for you; ask what you can do for your country.'" },
    { front: "What is epistrophe?", back: "Repetition of a word or phrase at the end of successive clauses. Example: 'government of the people, by the people, for the people.'" },
    { front: "What is asyndeton?", back: "Omission of conjunctions between words or clauses. Creates speed, urgency, or emphasis. Example: 'I came, I saw, I conquered.'" },
    { front: "What is polysyndeton?", back: "Deliberate use of many conjunctions. Slows pace and adds emphasis. Example: 'We have ships and men and money and stores.'" },
    { front: "What is hyperbole?", back: "Deliberate exaggeration for emphasis or effect. Not meant to be taken literally." },
    { front: "What is understatement (litotes)?", back: "Deliberate minimization for emphasis or ironic effect. Often uses double negatives: 'not uncommon.'" },
    { front: "What is juxtaposition?", back: "Placing two elements side by side to highlight contrast or comparison between them." },
    // Logical Fallacies
    { front: "What is a straw man fallacy?", back: "Misrepresenting an opponent's argument to make it easier to attack, rather than addressing the actual argument." },
    { front: "What is ad hominem?", back: "Attacking the person making the argument rather than the argument itself." },
    { front: "What is a false dilemma?", back: "Presenting only two options when more exist. Forces an either/or choice on a complex issue." },
    { front: "What is a slippery slope?", back: "Claiming one action will inevitably lead to extreme consequences without sufficient evidence." },
    { front: "What is a red herring?", back: "Introducing an irrelevant topic to divert attention from the original issue." },
    { front: "What is an appeal to authority?", back: "Using an authority figure's opinion as evidence, especially when they lack relevant expertise." },
    { front: "What is circular reasoning?", back: "Using the conclusion as a premise; the argument assumes what it's trying to prove." },
    { front: "What is hasty generalization?", back: "Drawing broad conclusions from insufficient or unrepresentative evidence." },
    { front: "What is post hoc fallacy?", back: "Assuming that because B followed A, A caused B. Confuses correlation with causation." },
    { front: "What is a bandwagon appeal?", back: "Arguing something is true or good because many people believe or do it." },
    // Analysis Framework
    { front: "What is SOAPSTone?", back: "Analysis framework: Speaker, Occasion, Audience, Purpose, Subject, Tone." },
    { front: "What is the Toulmin model?", back: "Argument framework: Claim + Data/Grounds + Warrant + Backing + Qualifier + Rebuttal." },
    { front: "What is a warrant?", back: "The logical connection between evidence and claim; the underlying assumption that explains WHY evidence supports the claim." },
    { front: "What is a qualifier?", back: "Words that limit the scope or certainty of a claim: 'usually,' 'often,' 'in most cases.'" },
    { front: "What is a concession?", back: "Acknowledging the validity of an opposing point while maintaining your overall argument." },
    { front: "What is a refutation?", back: "Directly addressing and disproving an opposing argument with evidence and reasoning." },
    // Syntax and Style
    { front: "What is a periodic sentence?", back: "Sentence where the main clause or point comes at the end, building suspense and emphasis." },
    { front: "What is a cumulative sentence?", back: "Sentence where the main clause comes first, followed by modifying phrases that add detail." },
    { front: "What is diction?", back: "Word choice. Includes considerations of formality, connotation, complexity, and specificity." },
    { front: "What is syntax?", back: "Sentence structure and arrangement of words. Includes sentence length, type, and complexity." },
    { front: "What is tone?", back: "The author's attitude toward the subject or audience, conveyed through diction, syntax, and imagery." },
    { front: "What is voice?", back: "The distinctive style and personality of the writer as expressed through tone, word choice, and syntax." },
    // Essay Types
    { front: "What is a synthesis essay?", back: "Essay combining information from multiple sources to develop your own argument. Must use at least 3 sources." },
    { front: "What is a rhetorical analysis essay?", back: "Essay analyzing HOW an author builds an argument through rhetorical strategies and techniques." },
    { front: "What is an argument essay?", back: "Essay taking a position on a topic using your own knowledge and reasoning as evidence." },
    { front: "What earns the sophistication point?", back: "Demonstrating nuanced understanding, situating argument in broader context, acknowledging complexity, or employing effective rhetoric." },
    // Additional Terms
    { front: "What is an allusion?", back: "Indirect reference to a well-known person, place, event, or work. Adds depth and creates shared understanding." },
    { front: "What is an analogy?", back: "Extended comparison explaining an unfamiliar concept by relating it to something familiar." },
    { front: "What is imagery?", back: "Descriptive language that appeals to the senses, creating mental pictures for the reader." },
    { front: "What is irony?", back: "Contrast between expectation and reality. Types: verbal (saying opposite of meaning), situational, dramatic." },
    { front: "What is satire?", back: "Use of humor, irony, or exaggeration to criticize and expose foolishness or corruption." },
  ],
  "ap-seminar": [
    // Research Framework
    { front: "What is the QUEST framework?", back: "Question & Explore → Understand & Analyze → Evaluate Perspectives → Synthesize Ideas → Team, Transform, Transmit." },
    { front: "What makes a good research question?", back: "Open-ended (not yes/no), researchable, significant, focused, and allows for multiple perspectives." },
    { front: "What is the CRAAP test?", back: "Source evaluation: Currency, Relevance, Authority, Accuracy, Purpose." },
    { front: "What is a primary source?", back: "Original documents, data, or artifacts created during the period being studied. Examples: diaries, speeches, research data." },
    { front: "What is a secondary source?", back: "Analysis, interpretation, or commentary on primary sources. Examples: textbooks, documentaries, scholarly articles." },
    { front: "What is a tertiary source?", back: "Compilations or summaries of primary and secondary sources. Examples: encyclopedias, almanacs, textbooks." },
    // Source Evaluation
    { front: "What is selection bias?", back: "When data or evidence is gathered in a way that produces skewed or non-representative results." },
    { front: "What is confirmation bias?", back: "Tendency to search for, interpret, and favor information that confirms existing beliefs." },
    { front: "What is peer review?", back: "Process where scholarly work is evaluated by experts in the field before publication." },
    { front: "What makes a source credible?", back: "Expert author, reputable publication, peer-reviewed, current, well-documented, minimal bias." },
    { front: "How do you identify bias in sources?", back: "Check funding, author background, publication type, language used, what's omitted, and who benefits." },
    // Argument Structure
    { front: "What is the PIE paragraph structure?", back: "Point (topic sentence), Illustration (evidence), Explanation (analysis connecting to your argument)." },
    { front: "What is a thesis statement?", back: "Clear, specific, arguable claim that presents your main argument and guides your paper." },
    { front: "What is a counterargument?", back: "An opposing viewpoint that you acknowledge and address to strengthen your own argument." },
    { front: "What is a rebuttal?", back: "Your response to a counterargument, explaining why your position is still valid or stronger." },
    { front: "What is hedging language?", back: "Qualifiers that acknowledge limitations: 'suggests,' 'may,' 'often,' 'in many cases.'" },
    { front: "What is synthesis vs. summary?", back: "Summary restates content; synthesis combines multiple sources to create new understanding or argument." },
    // Academic Writing
    { front: "What is academic tone?", back: "Formal, objective, precise language avoiding slang, contractions, and first-person (usually)." },
    { front: "What is paraphrasing?", back: "Restating someone's ideas in your own words while maintaining the meaning. Still requires citation." },
    { front: "What is quoting vs. paraphrasing?", back: "Quote when exact words matter (memorable phrasing, technical terms). Paraphrase for ideas you can say better." },
    { front: "What is signal phrase?", back: "Words introducing a source: 'According to Smith,' 'Research suggests,' 'Critics argue.'" },
    { front: "What is in-text citation?", back: "Brief reference within your text pointing to full citation. Format depends on style guide (APA, MLA, etc.)." },
    // Performance Tasks
    { front: "What is Performance Task 1?", back: "Team Project (20%): Group presentation, Individual Written Report (2000 words), and Oral Defense." },
    { front: "What is Performance Task 2?", back: "Individual Project (35%): Solo presentation, Individual Written Argument (2000 words), and Oral Defense." },
    { front: "What is the End-of-Course Exam?", back: "Part A (30 min): Analyze one source. Part B (90 min): Build argument from 4 sources. Worth 45%." },
    { front: "What is the Individual Written Report (IWR)?", back: "PT1 component: 2000-word report on your individual contribution to the team research." },
    { front: "What is the Individual Written Argument (IWA)?", back: "PT2 component: 2000-word argument paper on a topic of your choice with proper research." },
    // Presentation Skills
    { front: "What is an oral defense?", back: "Q&A session where you defend your research and conclusions to evaluators. Tests depth of understanding." },
    { front: "How do you prepare for oral defense?", back: "Anticipate questions, know your sources, understand limitations, practice explaining your reasoning." },
    { front: "What makes an effective presentation?", back: "Clear organization, audience awareness, visual aids, varied delivery, and confident body language." },
    { front: "What is a team multimedia presentation?", back: "PT1 component: 8-10 minute group presentation with visual aids on your research question." },
    // Critical Thinking
    { front: "What is a lens?", back: "A perspective or framework for analyzing an issue (economic, ethical, historical, scientific, etc.)." },
    { front: "What is stakeholder analysis?", back: "Identifying all parties affected by an issue and understanding their interests and perspectives." },
    { front: "What is a complexity acknowledgment?", back: "Recognizing that issues have multiple causes, effects, and valid perspectives without oversimplifying." },
    { front: "What is an assumption?", back: "Unstated belief underlying an argument. Identifying assumptions helps evaluate argument validity." },
    { front: "What is implications analysis?", back: "Considering the consequences and effects of an argument, policy, or action." },
  ],
};

// Expanded quiz data with 30+ questions per course
export const quizData: Record<string, { question: string; options: string[]; correctIndex: number; explanation: string; skill?: string }[]> = {
  apush: [
    { question: "Which most directly contributed to the demographic catastrophe among indigenous peoples after European contact?", options: ["Warfare with European armies", "Introduction of Old World diseases", "Forced labor in silver mines", "Loss of hunting grounds"], correctIndex: 1, explanation: "European diseases like smallpox devastated indigenous populations who had no immunity. Estimates suggest 50-90% died from disease.", skill: "Causation" },
    { question: "Bacon's Rebellion (1676) most directly resulted in:", options: ["Expansion of religious tolerance", "Increased reliance on African slave labor", "Greater autonomy from England", "Establishment of representative government"], correctIndex: 1, explanation: "After the rebellion exposed dangers of discontented servants, Virginia elites shifted to African slavery as more controllable.", skill: "Causation" },
    { question: "The Battle of Saratoga (1777) was a turning point primarily because it:", options: ["Demonstrated Continental Army superiority", "Led to the French alliance", "Resulted in capturing the British capital", "Ended Native American frontier attacks"], correctIndex: 1, explanation: "The American victory convinced France that Americans could win, leading to the critical Franco-American alliance of 1778.", skill: "Causation" },
    { question: "The Three-Fifths Compromise addressed:", options: ["Counting enslaved people for representation", "Establishing a national judiciary", "Regulating interstate commerce", "Admitting new states"], correctIndex: 0, explanation: "It determined that three-fifths of the enslaved population would be counted for both taxation and House representation.", skill: "Contextualization" },
    { question: "The Emancipation Proclamation (1863) freed enslaved people:", options: ["In all U.S. states", "Only in border states", "Only in Confederate states in rebellion", "In Washington, D.C. only"], correctIndex: 2, explanation: "It freed enslaved people only in states rebelling against the Union, not in border states or Union-controlled areas.", skill: "Contextualization" },
    { question: "Which New Deal program addressed long-term economic security for the elderly?", options: ["Civilian Conservation Corps", "Works Progress Administration", "Social Security Act", "Tennessee Valley Authority"], correctIndex: 2, explanation: "The Social Security Act of 1935 created old-age pensions, unemployment insurance, and aid to dependent children.", skill: "Causation" },
    { question: "The policy of salutary neglect most directly contributed to:", options: ["Colonial economic dependence on Britain", "Development of colonial self-governance", "Strengthening of royal authority", "Decline of colonial manufacturing"], correctIndex: 1, explanation: "Britain's lax enforcement of trade laws allowed colonies to develop their own governing institutions and practices.", skill: "Causation" },
    { question: "The Great Awakening of the 1730s-1740s most directly:", options: ["Strengthened established churches", "Promoted religious emotionalism and individual spirituality", "Decreased church membership", "Supported religious uniformity"], correctIndex: 1, explanation: "The Great Awakening emphasized personal religious experience and challenged established religious authority.", skill: "Contextualization" },
    { question: "The Louisiana Purchase (1803) was significant because it:", options: ["Ended French influence in North America", "Doubled the size of the United States", "Resolved border disputes with Spain", "Guaranteed free navigation of the Mississippi"], correctIndex: 1, explanation: "The purchase from France roughly doubled U.S. territory, opening vast western lands for expansion.", skill: "Causation" },
    { question: "The principle of judicial review was established by:", options: ["The Constitution", "Marbury v. Madison (1803)", "McCulloch v. Maryland (1819)", "Gibbons v. Ogden (1824)"], correctIndex: 1, explanation: "Chief Justice Marshall established the Supreme Court's power to declare laws unconstitutional in Marbury v. Madison.", skill: "Contextualization" },
    { question: "The Trail of Tears was a direct result of:", options: ["The Missouri Compromise", "The Indian Removal Act", "The Compromise of 1850", "The Kansas-Nebraska Act"], correctIndex: 1, explanation: "The Indian Removal Act of 1830 authorized forced relocation of southeastern tribes to territory west of the Mississippi.", skill: "Causation" },
    { question: "Which reform movement was most directly inspired by the Second Great Awakening?", options: ["The temperance movement", "The labor movement", "The populist movement", "The progressive movement"], correctIndex: 0, explanation: "Religious revival sparked moral reform movements including temperance, abolitionism, and women's rights.", skill: "Causation" },
    { question: "The Dred Scott decision (1857) ruled that:", options: ["Slavery was unconstitutional", "Congress could prohibit slavery in territories", "African Americans were not citizens", "Popular sovereignty determined slavery status"], correctIndex: 2, explanation: "The Court ruled that African Americans could not be citizens and Congress could not ban slavery in territories.", skill: "Contextualization" },
    { question: "The Compromise of 1877 ended Reconstruction by:", options: ["Passing the Civil Rights Act", "Withdrawing federal troops from the South", "Granting voting rights to women", "Creating the Freedmen's Bureau"], correctIndex: 1, explanation: "The compromise resolved the disputed 1876 election by withdrawing federal troops, effectively ending Reconstruction.", skill: "Causation" },
    { question: "Andrew Carnegie's business strategy of vertical integration involved:", options: ["Buying out competitors", "Controlling all stages of production", "Creating holding companies", "Establishing monopolies in multiple industries"], correctIndex: 1, explanation: "Carnegie controlled everything from iron mines to steel mills to shipping, reducing costs and eliminating middlemen.", skill: "Contextualization" },
    { question: "Plessy v. Ferguson (1896) established the doctrine of:", options: ["Due process", "Separate but equal", "Equal protection", "Judicial review"], correctIndex: 1, explanation: "The decision legalized segregation as long as facilities were 'separate but equal,' which they rarely were.", skill: "Contextualization" },
    { question: "The Sherman Antitrust Act was passed primarily to:", options: ["Regulate labor unions", "Break up monopolies and trusts", "Protect farmers from railroads", "Establish the Federal Reserve"], correctIndex: 1, explanation: "The 1890 act aimed to prevent business practices that restrained trade, though it was initially weakly enforced.", skill: "Contextualization" },
    { question: "The Progressive Era muckrakers were known for:", options: ["Supporting big business", "Exposing corruption and social problems", "Opposing women's suffrage", "Promoting laissez-faire economics"], correctIndex: 1, explanation: "Muckrakers like Upton Sinclair and Ida Tarbell used investigative journalism to expose social and business abuses.", skill: "Contextualization" },
    { question: "The Great Migration involved the movement of:", options: ["European immigrants to cities", "African Americans from South to North", "Farmers from East to West", "Native Americans to reservations"], correctIndex: 1, explanation: "From 1910-1970, millions of African Americans moved from the rural South to urban areas in the North and West.", skill: "Contextualization" },
    { question: "The primary cause of the Great Depression was:", options: ["World War I debts", "Stock market speculation and crash", "Federal Reserve policies alone", "Natural disasters"], correctIndex: 1, explanation: "The 1929 crash, combined with bank failures, reduced spending, overproduction, and policy failures caused the Depression.", skill: "Causation" },
    { question: "Brown v. Board of Education (1954) overturned:", options: ["Marbury v. Madison", "Plessy v. Ferguson", "Dred Scott v. Sandford", "McCulloch v. Maryland"], correctIndex: 1, explanation: "Brown declared school segregation unconstitutional, overturning the 'separate but equal' doctrine of Plessy.", skill: "Contextualization" },
    { question: "The Truman Doctrine established the policy of:", options: ["Massive retaliation", "Containment of communism", "Détente with the Soviet Union", "Nuclear disarmament"], correctIndex: 1, explanation: "Truman pledged to support nations resisting communist expansion, establishing containment as U.S. Cold War policy.", skill: "Contextualization" },
    { question: "The Cuban Missile Crisis was resolved when:", options: ["The U.S. invaded Cuba", "The Soviet Union collapsed", "Both sides agreed to remove missiles", "NATO intervened"], correctIndex: 2, explanation: "The Soviets agreed to remove missiles from Cuba; the U.S. pledged not to invade Cuba and secretly removed missiles from Turkey.", skill: "Contextualization" },
    { question: "The Civil Rights Act of 1964 prohibited discrimination in:", options: ["Only federal employment", "Public accommodations and employment", "Housing only", "Voting only"], correctIndex: 1, explanation: "The Act banned discrimination in public places, employment, and federally funded programs based on race, color, religion, sex, or national origin.", skill: "Contextualization" },
    { question: "The Gulf of Tonkin Resolution gave the president authority to:", options: ["Declare war on Vietnam", "Use military force in Southeast Asia", "Impose economic sanctions", "Deploy nuclear weapons"], correctIndex: 1, explanation: "The 1964 resolution authorized military action without a formal declaration of war, escalating U.S. involvement in Vietnam.", skill: "Contextualization" },
    { question: "President Nixon resigned because of:", options: ["The Vietnam War", "The Watergate scandal cover-up", "Economic recession", "Impeachment conviction"], correctIndex: 1, explanation: "Nixon resigned in 1974 facing certain impeachment for obstruction of justice in covering up the Watergate break-in.", skill: "Contextualization" },
    { question: "Reaganomics was characterized by:", options: ["Increased taxes and spending", "Tax cuts and deregulation", "Nationalization of industries", "Expansion of welfare programs"], correctIndex: 1, explanation: "Reagan's economic policy featured tax cuts, reduced regulation, and spending cuts on social programs.", skill: "Contextualization" },
    { question: "The attacks of September 11, 2001 led directly to:", options: ["The Vietnam War", "The War on Terror", "The Great Society programs", "The Cold War"], correctIndex: 1, explanation: "The attacks prompted the War on Terror, including invasions of Afghanistan and Iraq and expanded security measures.", skill: "Causation" },
    { question: "Which event most directly caused the Great Recession of 2008?", options: ["Rising oil prices", "Housing market collapse", "Trade wars", "Federal budget deficits"], correctIndex: 1, explanation: "The collapse of the housing bubble and resulting financial crisis triggered the worst recession since the Great Depression.", skill: "Causation" },
    { question: "The Affordable Care Act (2010) primarily aimed to:", options: ["Privatize healthcare", "Expand health insurance coverage", "Eliminate Medicare", "Reduce healthcare spending only"], correctIndex: 1, explanation: "The ACA expanded coverage through mandates, exchanges, Medicaid expansion, and protections for pre-existing conditions.", skill: "Contextualization" },
  ],
  "ap-lang": [
    { question: "A speaker citing their twenty years of medical experience is primarily employing:", options: ["Pathos", "Logos", "Ethos", "Kairos"], correctIndex: 2, explanation: "Citing professional experience establishes ethos — the speaker's credibility and authority on the subject.", skill: "Rhetorical Analysis" },
    { question: "'We shall fight on the beaches, we shall fight on the landing grounds' is an example of:", options: ["Chiasmus", "Anaphora", "Epistrophe", "Antithesis"], correctIndex: 1, explanation: "Anaphora is repetition at the beginning of successive clauses. 'We shall fight' repeats at each clause's start.", skill: "Rhetorical Analysis" },
    { question: "Which describes a 'straw man' fallacy?", options: ["Attacking the person making the argument", "Presenting only two options", "Misrepresenting an opponent's position", "Assuming correlation means causation"], correctIndex: 2, explanation: "A straw man misrepresents an opponent's argument to create a weaker version that's easier to attack.", skill: "Argumentation" },
    { question: "In Toulmin's model, the 'warrant' refers to:", options: ["The main claim", "The evidence", "The logical connection between evidence and claim", "Limitations on the claim"], correctIndex: 2, explanation: "The warrant is the underlying assumption that connects evidence to claim — it explains WHY the evidence supports the claim.", skill: "Argumentation" },
    { question: "The 'sophistication' point on the AP Lang rubric is earned by:", options: ["Writing more than five paragraphs", "Using advanced vocabulary", "Demonstrating nuanced understanding or persuasive style", "Incorporating all sources"], correctIndex: 2, explanation: "Sophistication rewards essays showing nuance, acknowledging complexity, situating arguments in broader context, or employing effective rhetoric.", skill: "Essay Writing" },
    { question: "'It was the best of times, it was the worst of times' is an example of:", options: ["Anaphora", "Antithesis", "Parallelism only", "Chiasmus"], correctIndex: 1, explanation: "Antithesis juxtaposes contrasting ideas in parallel structure — 'best' contrasted with 'worst' in balanced phrases.", skill: "Rhetorical Analysis" },
    { question: "When an author uses vivid imagery describing a starving child to argue for food aid, they are primarily using:", options: ["Logos", "Ethos", "Pathos", "Kairos"], correctIndex: 2, explanation: "Emotional imagery appeals to pathos — the audience's feelings of sympathy and compassion.", skill: "Rhetorical Analysis" },
    { question: "'Ask not what your country can do for you; ask what you can do for your country' is an example of:", options: ["Anaphora", "Antithesis", "Chiasmus", "Parallelism only"], correctIndex: 2, explanation: "Chiasmus reverses the grammatical structure: 'country...you' becomes 'you...country.'", skill: "Rhetorical Analysis" },
    { question: "A periodic sentence is one that:", options: ["Uses simple vocabulary", "Places the main clause at the end", "Contains multiple paragraphs", "Avoids complex ideas"], correctIndex: 1, explanation: "Periodic sentences build suspense by delaying the main point until the end, keeping readers engaged.", skill: "Rhetorical Analysis" },
    { question: "The SOAPSTone method helps analyze:", options: ["Scientific data", "The rhetorical situation", "Grammar errors", "Citation formats"], correctIndex: 1, explanation: "SOAPSTone (Speaker, Occasion, Audience, Purpose, Subject, Tone) provides a framework for analyzing rhetorical context.", skill: "Rhetorical Analysis" },
    { question: "A red herring fallacy involves:", options: ["Attacking the speaker's character", "Introducing an irrelevant topic", "Making a false comparison", "Circular reasoning"], correctIndex: 1, explanation: "A red herring diverts attention from the original issue by introducing something unrelated.", skill: "Argumentation" },
    { question: "Which technique involves omitting conjunctions for effect?", options: ["Polysyndeton", "Asyndeton", "Parallelism", "Antithesis"], correctIndex: 1, explanation: "Asyndeton omits conjunctions ('I came, I saw, I conquered') to create speed and emphasis.", skill: "Rhetorical Analysis" },
    { question: "In synthesis writing, 'conversation between sources' means:", options: ["Quoting sources back-to-back", "Showing how sources relate to each other", "Summarizing all sources", "Using only agreeing sources"], correctIndex: 1, explanation: "Good synthesis shows relationships between sources — agreement, disagreement, qualification — while developing your argument.", skill: "Essay Writing" },
    { question: "An appeal to authority fallacy occurs when:", options: ["Citing an expert in the relevant field", "Using an authority figure lacking relevant expertise", "Presenting logical evidence", "Using multiple sources"], correctIndex: 1, explanation: "It's fallacious to cite authorities outside their expertise (a celebrity endorsing medicine, for example).", skill: "Argumentation" },
    { question: "The purpose of a concession in an argument is to:", options: ["Admit you are wrong", "Acknowledge valid opposing points while maintaining your position", "End the argument", "Avoid counterarguments"], correctIndex: 1, explanation: "Concessions strengthen arguments by showing you've considered opposing views and still find your position valid.", skill: "Argumentation" },
    { question: "Post hoc ergo propter hoc means:", options: ["Everyone believes it, so it must be true", "After this, therefore because of this", "The exception proves the rule", "Attacking the person, not the argument"], correctIndex: 1, explanation: "This fallacy assumes that because B followed A, A must have caused B — confusing correlation with causation.", skill: "Argumentation" },
    { question: "In a rhetorical analysis essay, you should focus on:", options: ["Whether you agree with the author", "HOW the author builds the argument", "The historical context only", "Your personal opinion on the topic"], correctIndex: 1, explanation: "Rhetorical analysis examines the strategies and techniques an author uses, not whether the argument is correct.", skill: "Essay Writing" },
    { question: "Polysyndeton involves:", options: ["Removing conjunctions", "Using many conjunctions", "Reversing sentence structure", "Contrasting ideas"], correctIndex: 1, explanation: "Polysyndeton uses multiple conjunctions ('ships and men and money and stores') to slow pace and add weight.", skill: "Rhetorical Analysis" },
    { question: "A qualifier in an argument:", options: ["Makes the claim absolute", "Limits the scope or certainty of the claim", "Provides evidence", "States the main point"], correctIndex: 1, explanation: "Qualifiers like 'usually,' 'often,' or 'in most cases' acknowledge that claims may not be universally true.", skill: "Argumentation" },
    { question: "When writing a thesis for a rhetorical analysis, you should:", options: ["Simply state the topic", "Make an analytical claim about HOW the rhetoric works", "Summarize the passage", "State whether you agree"], correctIndex: 1, explanation: "A rhetorical analysis thesis argues how specific strategies create specific effects, not just what the passage is about.", skill: "Essay Writing" },
    { question: "Litotes is a form of:", options: ["Exaggeration", "Understatement using negation", "Repetition", "Comparison"], correctIndex: 1, explanation: "Litotes uses double negatives or negation for understatement: 'not uncommon,' 'not without merit.'", skill: "Rhetorical Analysis" },
    { question: "The argument essay on the AP exam asks you to:", options: ["Analyze a given passage", "Synthesize multiple sources", "Take a position using your own evidence", "Compare two texts"], correctIndex: 2, explanation: "The argument essay requires you to develop a position on a given topic using your own knowledge as evidence.", skill: "Essay Writing" },
    { question: "Which best describes diction?", options: ["Sentence structure", "Word choice", "Paragraph organization", "Thesis placement"], correctIndex: 1, explanation: "Diction refers to word choice, including considerations of formality, connotation, and specificity.", skill: "Rhetorical Analysis" },
    { question: "A hasty generalization fallacy:", options: ["Attacks the person arguing", "Draws broad conclusions from limited evidence", "Presents only two options", "Uses circular reasoning"], correctIndex: 1, explanation: "Hasty generalization jumps to conclusions based on insufficient or unrepresentative examples.", skill: "Argumentation" },
    { question: "In the synthesis essay, you must use at least:", options: ["1 source", "2 sources", "3 sources", "All sources"], correctIndex: 2, explanation: "The AP synthesis essay requires using at least 3 of the provided sources to support your argument.", skill: "Essay Writing" },
    { question: "Kairos refers to:", options: ["Emotional appeal", "Logical appeal", "Credibility appeal", "Timeliness of the argument"], correctIndex: 3, explanation: "Kairos is the opportune moment — why this argument matters now, in this particular context.", skill: "Rhetorical Analysis" },
    { question: "An effective refutation:", options: ["Ignores opposing arguments", "Addresses and counters opposing points", "Only restates your thesis", "Admits the opposition is right"], correctIndex: 1, explanation: "Refutation directly engages opposing arguments with evidence and reasoning to show why your position is stronger.", skill: "Argumentation" },
    { question: "Syntax refers to:", options: ["Word choice", "Sentence structure", "Paragraph length", "Thesis statement"], correctIndex: 1, explanation: "Syntax is the arrangement of words and phrases to create sentences — including length, type, and complexity.", skill: "Rhetorical Analysis" },
    { question: "The bandwagon fallacy argues that:", options: ["Experts must be wrong", "Something is true because many believe it", "All slippery slopes are real", "Past events cause future events"], correctIndex: 1, explanation: "Bandwagon appeals claim popularity equals validity — 'everyone's doing it, so it must be right.'", skill: "Argumentation" },
    { question: "Tone is best described as:", options: ["What the text is about", "The author's attitude toward the subject", "The structure of paragraphs", "The intended audience"], correctIndex: 1, explanation: "Tone is the author's attitude toward the subject or audience, conveyed through diction, syntax, and other choices.", skill: "Rhetorical Analysis" },
  ],
  "ap-seminar": [
    { question: "In the QUEST framework, 'E' represents:", options: ["Examine and Explore", "Evaluate Multiple Perspectives", "Edit and Enhance", "Engage and Elaborate"], correctIndex: 1, explanation: "E stands for 'Evaluate Multiple Perspectives' — considering diverse viewpoints and their strengths/weaknesses.", skill: "Research Process" },
    { question: "Which is a PRIMARY source?", options: ["A textbook about World War I", "A documentary about civil rights", "A diary entry from a Civil War soldier", "A newspaper editorial about an election"], correctIndex: 2, explanation: "A diary entry is a firsthand, original document created during the period being studied.", skill: "Source Evaluation" },
    { question: "In the CRAAP test, 'Authority' refers to:", options: ["Date of publication", "Author's credentials and expertise", "Whether information is verifiable", "Intended audience"], correctIndex: 1, explanation: "Authority assesses who wrote the source and their qualifications — are they an expert with relevant credentials?", skill: "Source Evaluation" },
    { question: "The PIE paragraph structure stands for:", options: ["Problem, Idea, Evidence", "Point, Illustration, Explanation", "Position, Information, Example", "Premise, Inference, Evaluation"], correctIndex: 1, explanation: "PIE = Point (topic sentence), Illustration (evidence), Explanation (analysis connecting evidence to argument).", skill: "Academic Writing" },
    { question: "A good research question should be:", options: ["Answerable with yes or no", "Open-ended and significant", "Already answered in sources", "Narrowly focused on one source"], correctIndex: 1, explanation: "Good research questions are open-ended, significant, researchable, and allow for multiple perspectives.", skill: "Research Process" },
    { question: "What is confirmation bias?", options: ["Rejecting all evidence", "Favoring information that confirms existing beliefs", "Accepting all expert opinions", "Using only primary sources"], correctIndex: 1, explanation: "Confirmation bias is the tendency to search for and favor information that confirms what you already believe.", skill: "Source Evaluation" },
    { question: "Performance Task 1 is worth what percentage of the AP Seminar score?", options: ["15%", "20%", "35%", "45%"], correctIndex: 1, explanation: "PT1 (team project) is worth 20% of the total score.", skill: "Assessment" },
    { question: "What distinguishes a scholarly source from a popular source?", options: ["Length only", "Peer review and citations", "Publication date", "Author fame"], correctIndex: 1, explanation: "Scholarly sources undergo peer review, cite sources, and are written by experts for academic audiences.", skill: "Source Evaluation" },
    { question: "Hedging language is used to:", options: ["Make claims sound absolute", "Acknowledge limitations and uncertainty", "Avoid any claims", "Cite sources"], correctIndex: 1, explanation: "Hedging (may, suggests, often) acknowledges that claims have limits and shows intellectual honesty.", skill: "Academic Writing" },
    { question: "The Individual Written Argument (IWA) should be approximately:", options: ["1000 words", "1500 words", "2000 words", "3000 words"], correctIndex: 2, explanation: "The IWA for Performance Task 2 should be approximately 2000 words.", skill: "Assessment" },
    { question: "A lens in academic analysis refers to:", options: ["A magnifying glass", "A perspective or framework for analysis", "A type of source", "A citation format"], correctIndex: 1, explanation: "Lenses are perspectives (economic, ethical, historical, scientific) through which you can analyze an issue.", skill: "Research Process" },
    { question: "What is the purpose of an oral defense?", options: ["To memorize your presentation", "To demonstrate deep understanding through Q&A", "To read your paper aloud", "To avoid written work"], correctIndex: 1, explanation: "Oral defense tests whether you truly understand your research by answering questions from evaluators.", skill: "Presentation" },
    { question: "Which is an example of a secondary source?", options: ["Interview transcript", "Original data set", "Scholarly article analyzing primary sources", "Diary entry"], correctIndex: 2, explanation: "Secondary sources analyze, interpret, or comment on primary sources — like a scholarly article about historical events.", skill: "Source Evaluation" },
    { question: "What makes an effective counterargument?", options: ["Ignoring opposing views", "Acknowledging and then responding to opposing views", "Agreeing completely with opponents", "Attacking the opposition personally"], correctIndex: 1, explanation: "Effective counterarguments acknowledge valid opposing points, then explain why your position remains stronger.", skill: "Argumentation" },
    { question: "The End-of-Course Exam is worth what percentage?", options: ["20%", "35%", "45%", "55%"], correctIndex: 2, explanation: "The EOC Exam (Part A: source analysis, Part B: argument synthesis) is worth 45% of the total score.", skill: "Assessment" },
    { question: "What is synthesis in academic writing?", options: ["Summarizing one source", "Combining sources to create new understanding", "Quoting sources extensively", "Listing sources alphabetically"], correctIndex: 1, explanation: "Synthesis integrates multiple sources to develop your own argument, showing relationships between sources.", skill: "Academic Writing" },
    { question: "Which question type is best for research?", options: ["Yes/no questions", "Questions with obvious answers", "Open-ended questions allowing multiple perspectives", "Questions answered by one source"], correctIndex: 2, explanation: "Open-ended questions generate richer research by allowing exploration of multiple viewpoints and complexity.", skill: "Research Process" },
    { question: "In the CRAAP test, 'Purpose' asks:", options: ["When was it written?", "Who is the author?", "Why does the source exist?", "How long is the source?"], correctIndex: 2, explanation: "Purpose examines why the source exists — to inform, persuade, sell, entertain — and whether bias affects reliability.", skill: "Source Evaluation" },
    { question: "A thesis statement should be:", options: ["A question", "An arguable claim", "A simple fact", "A summary of sources"], correctIndex: 1, explanation: "A thesis is an arguable claim — a position that requires evidence and reasoning to support.", skill: "Academic Writing" },
    { question: "What is a stakeholder in issue analysis?", options: ["Anyone who has money invested", "Any party affected by or interested in an issue", "Only government officials", "Only experts on the topic"], correctIndex: 1, explanation: "Stakeholders are all parties who have an interest in or are affected by an issue or decision.", skill: "Research Process" },
    { question: "Performance Task 2 is completed:", options: ["As a team", "Individually", "With a partner", "By the teacher"], correctIndex: 1, explanation: "PT2 is an individual project including a solo presentation, written argument, and oral defense.", skill: "Assessment" },
    { question: "Which best describes academic tone?", options: ["Casual and conversational", "Formal, objective, and precise", "Emotional and persuasive only", "Simple and brief"], correctIndex: 1, explanation: "Academic tone is formal, avoids slang and contractions, uses precise language, and maintains objectivity.", skill: "Academic Writing" },
    { question: "What is the difference between quoting and paraphrasing?", options: ["Quoting requires citation; paraphrasing does not", "Quoting uses exact words; paraphrasing uses your own words", "Paraphrasing is longer than quoting", "There is no difference"], correctIndex: 1, explanation: "Quoting uses the source's exact words; paraphrasing restates ideas in your own words. Both require citation.", skill: "Academic Writing" },
    { question: "A signal phrase is used to:", options: ["End a paragraph", "Introduce a source or quotation", "Create a thesis", "Avoid citations"], correctIndex: 1, explanation: "Signal phrases (According to..., Research shows..., Smith argues...) introduce and attribute source material.", skill: "Academic Writing" },
    { question: "What is selection bias?", options: ["Choosing only peer-reviewed sources", "Gathering data in a way that produces skewed results", "Selecting too many sources", "Using random sampling"], correctIndex: 1, explanation: "Selection bias occurs when the way data is collected produces non-representative or skewed results.", skill: "Source Evaluation" },
    { question: "The team multimedia presentation in PT1 should be:", options: ["3-5 minutes", "8-10 minutes", "15-20 minutes", "30 minutes"], correctIndex: 1, explanation: "The PT1 team presentation should be 8-10 minutes total, with visual aids supporting the research.", skill: "Assessment" },
    { question: "What makes a claim arguable?", options: ["It's a fact everyone agrees on", "It requires evidence and can be disputed", "It's impossible to prove", "It's a personal preference only"], correctIndex: 1, explanation: "Arguable claims can be supported with evidence but are not simply facts — reasonable people could disagree.", skill: "Argumentation" },
    { question: "In Part B of the EOC Exam, you must:", options: ["Analyze one source in detail", "Build an argument from 4 sources", "Present orally", "Work with a team"], correctIndex: 1, explanation: "Part B (90 minutes) requires building an argument using evidence from 4 provided sources.", skill: "Assessment" },
  ],
};

// Sample essays with detailed rubric explanations
export const essaysData: Record<string, {
  id: string;
  title: string;
  type: string;
  prompt: string;
  sampleEssay: string;
  score: number;
  rubricBreakdown: {
    category: string;
    points: number;
    maxPoints: number;
    explanation: string;
  }[];
  sources?: { id: string; title: string; content: string }[];
}[]> = {
  "ap-lang": [
    {
      id: "synthesis-1",
      title: "Technology in Education",
      type: "Synthesis",
      prompt: "Technology has become increasingly prevalent in educational settings. Write an essay that synthesizes material from at least three of the provided sources and develops your position on the role technology should play in education.",
      sources: [
        {
          id: "source-a",
          title: "Source A (Smith)",
          content: "A 2023 study by Stanford researchers found that students who used laptops in class scored 11% lower on exams than those who took handwritten notes. The researchers attributed this to 'shallow processing' — students typing verbatim rather than synthesizing information. However, the same study noted that students with learning disabilities showed improved performance when using assistive technology."
        },
        {
          id: "source-b",
          title: "Source B (Chen)",
          content: "Digital literacy is no longer optional in the modern workforce. According to the Bureau of Labor Statistics, 77% of jobs now require some level of digital proficiency. Schools that fail to integrate technology are leaving students unprepared for the economic realities they will face. The question is not whether to use technology, but how to use it effectively."
        },
        {
          id: "source-c",
          title: "Source C (Garcia)",
          content: "The promise of educational technology has largely failed to materialize. After decades and billions of dollars invested, student achievement has not significantly improved. Meanwhile, screen time has been linked to attention problems, anxiety, and sleep disruption in young people. Perhaps it's time to return to proven traditional methods."
        },
        {
          id: "source-d",
          title: "Source D (Infographic)",
          content: "STUDENT DEVICE ACCESS 2024:\n- 94% of students have smartphone access\n- 73% have home computer access\n- 47% have school-provided device\n- Low-income students: 52% have reliable internet\n- High-income students: 98% have reliable internet\nThe digital divide persists despite increased device availability."
        },
        {
          id: "source-e",
          title: "Source E (Johnson)",
          content: "The most successful technology integration I've seen focuses on creation rather than consumption. When students use technology to make videos, build websites, or code programs, engagement soars. When they simply read from screens instead of textbooks, we've just traded one passive experience for another. The tool matters less than the pedagogy."
        },
        {
          id: "source-f",
          title: "Source F (National Education Report)",
          content: "Schools implementing 'blended learning' models — combining face-to-face instruction with online components — showed modest gains in standardized test scores (3-5%). More significantly, these schools reported 23% higher graduation rates and improved student attendance. Teacher training was identified as the key factor in successful implementation."
        }
      ],
      sampleEssay: `As classrooms increasingly fill with glowing screens and clicking keyboards, educators face a critical question: how should technology shape the future of learning? While some advocate for wholesale digital transformation and others call for a return to chalkboards and textbooks, the evidence suggests a more nuanced approach. Technology should serve as a strategic tool in education — enhancing rather than replacing traditional instruction, addressing equity concerns, and focusing on active creation rather than passive consumption.

The case for thoughtful technology integration rests partly on economic necessity. As Chen observes, "77% of jobs now require some level of digital proficiency," making digital literacy a fundamental skill rather than an optional enhancement (Source B). Schools that ignore this reality risk producing graduates unprepared for the modern workforce. However, this practical argument must be balanced against research showing potential drawbacks. The Stanford study cited by Smith found that laptop users scored "11% lower on exams" due to "shallow processing" when typing notes verbatim (Source A). This paradox — that technology is necessary yet potentially harmful — points toward selective rather than universal implementation.

The most promising evidence supports a "blended learning" approach that combines digital and traditional methods. According to the National Education Report, schools using this model showed "3-5%" gains in test scores but, more importantly, "23% higher graduation rates and improved student attendance" (Source F). These outcomes suggest that technology's value lies not in replacing human instruction but in supplementing it. The report identifies teacher training as "the key factor in successful implementation," underscoring that technology alone achieves nothing — its effectiveness depends entirely on thoughtful pedagogical integration.

Equally important is how technology is used. Johnson distinguishes between technology for "creation" versus "consumption," arguing that engagement increases when students "make videos, build websites, or code programs" rather than "simply read from screens instead of textbooks" (Source E). This insight reveals that the technology debate often misses the point: a student passively scrolling through a digital textbook experiences the same "shallow processing" as one typing notes verbatim. The tool matters less than whether it activates students as creators and critical thinkers or reduces them to passive recipients of information.

Any discussion of educational technology must also confront the digital divide. Source D's infographic reveals a troubling disparity: while "98% of high-income students have reliable internet access, only 52% of low-income students do. Simply mandating technology use without addressing infrastructure and access creates new inequities. Interestingly, Smith's research notes that "students with learning disabilities showed improved performance when using assistive technology" (Source A), reminding us that thoughtful implementation can promote rather than undermine equity.

Critics like Garcia argue that educational technology "has largely failed to materialize" its promise despite "billions of dollars invested" (Source C). This skepticism is valuable — it guards against the assumption that newer is automatically better. However, Garcia's call to "return to proven traditional methods" overlooks both the economic necessity Chen identifies and the genuine successes documented in blended learning models. The failure of poorly implemented technology does not invalidate well-implemented technology.

Technology in education is neither savior nor villain — it is a tool whose value depends entirely on how we wield it. The evidence supports strategic integration focused on creation over consumption, supported by robust teacher training, and attentive to equity concerns. Rather than asking whether to use technology, educators should ask: Does this particular use actively engage students as thinkers and creators? Does it complement rather than replace skilled instruction? Does it narrow rather than widen existing inequities? When technology meets these standards, it earns its place in the classroom.`,
      score: 6,
      rubricBreakdown: [
        {
          category: "Thesis",
          points: 1,
          maxPoints: 1,
          explanation: "The essay presents a defensible thesis that takes a clear position: 'Technology should serve as a strategic tool in education — enhancing rather than replacing traditional instruction, addressing equity concerns, and focusing on active creation rather than passive consumption.' This thesis is specific, arguable, and provides a roadmap for the argument."
        },
        {
          category: "Evidence and Commentary",
          points: 4,
          maxPoints: 4,
          explanation: "The essay uses all six sources effectively, integrating them through quotation and paraphrase. More importantly, it doesn't just cite sources but creates 'conversation' between them — comparing Smith's concerns about shallow processing with Johnson's distinction between creation and consumption, for example. Each source is analyzed for its implications, not just summarized. The commentary consistently explains how evidence supports the thesis and addresses potential objections."
        },
        {
          category: "Sophistication",
          points: 1,
          maxPoints: 1,
          explanation: "The essay demonstrates sophistication through several means: it acknowledges complexity rather than oversimplifying (technology is 'neither savior nor villain'), it situates the argument in broader context (economic realities, equity concerns), it addresses counterarguments substantively (Garcia's critique), and it employs effective rhetorical strategies (the concluding rhetorical questions that reframe the debate). The prose style is varied and purposeful."
        }
      ]
    },
    {
      id: "rhetorical-1",
      title: "Churchill's 'We Shall Fight' Speech",
      type: "Rhetorical Analysis",
      prompt: "Read the following passage from Winston Churchill's 1940 speech to Parliament. Write an essay that analyzes the rhetorical choices Churchill makes to achieve his purpose.",
      sources: [
        {
          id: "passage",
          title: "Speech Excerpt",
          content: `We shall go on to the end. We shall fight in France, we shall fight on the seas and oceans, we shall fight with growing confidence and growing strength in the air, we shall defend our island, whatever the cost may be. We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets, we shall fight in the hills; we shall never surrender, and if, which I do not for a moment believe, this island or a large part of it were subjugated and starving, then our Empire beyond the seas, armed and guarded by the British Fleet, would carry on the struggle, until, in God's good time, the New World, with all its power and might, steps forth to the rescue and the liberation of the old.`
        }
      ],
      sampleEssay: `On June 4, 1940, with German forces having just conquered France and Britain standing virtually alone against Nazi aggression, Winston Churchill faced Parliament with a seemingly impossible task: to transform a nation reeling from military catastrophe into one prepared to fight on. His "We Shall Fight" speech accomplishes this through masterful deployment of anaphora, strategic progression from concrete to abstract, and a carefully calibrated balance of defiance and hope that refuses to sugarcoat reality while refusing to surrender to despair.

The speech's most immediately striking feature is its relentless anaphora — the repetition of "we shall fight" at the beginning of successive clauses. This rhetorical choice serves multiple purposes simultaneously. On the most basic level, repetition creates emphasis and memorability; audiences remember parallel structures. But Churchill's anaphora does more than stick in the mind. The phrase "we shall" positions the commitment as collective (not "I" but "we") and certain (the definitive "shall" rather than the weaker "will" or conditional "would"). Each repetition hammers this collective resolve deeper into listeners' consciousness until resistance to Nazi aggression feels not merely possible but inevitable. The cumulative effect transforms a statement of intent into something approaching a sacred vow.

The structure of what follows each "we shall fight" reveals equally careful craft. Churchill moves from the specific and immediate — "in France," "on the seas and oceans," "in the air" — toward the increasingly domestic and personal — "on the beaches," "on the landing grounds," "in the fields and in the streets," "in the hills." This progression serves a crucial psychological function. By beginning with external battlefields, Churchill acknowledges present military reality without dwelling on defeat. By moving to British beaches and streets, he prepares his audience mentally for the possibility of invasion while suggesting that such invasion would only deepen rather than end British resistance. The geographic narrowing paradoxically expands the commitment: Britain will fight not only where soldiers conventionally fight but everywhere, suggesting a nation unified in total resistance.

Churchill balances this defiance with strategic acknowledgment of grim possibility. The phrase "whatever the cost may be" refuses to offer false comfort; Churchill does not pretend the path forward will be easy or casualties light. Similarly, his hypothetical scenario — "if, which I do not for a moment believe, this island or a large part of it were subjugated and starving" — acknowledges the possibility of defeat while immediately undercutting it with his interjection of disbelief. This rhetorical move accomplishes something remarkable: it allows Churchill to plan for worst-case scenarios without conceding their likelihood, demonstrating both realism and confidence simultaneously.

The speech's conclusion pivots from immediate defiance to longer-term hope, invoking "our Empire beyond the seas" and eventually "the New World, with all its power and might." This progression suggests that even in the worst case, resistance would continue and ultimately succeed. The phrase "in God's good time" adds a religious dimension, framing eventual victory as not merely possible but providential. Churchill positions Britain not as a nation fighting alone but as the defender of civilization itself, awaiting inevitable reinforcement. The final image of the New World stepping "forth to the rescue and the liberation of the old" transforms Britain from potential victim into noble standard-bearer, holding the line until allies arrive.

Throughout, Churchill's syntax reinforces his message. The sentences are long but not convoluted, building momentum through accumulation rather than complexity. Punctuation is sparing; semicolons allow the rhythm to continue almost breathlessly, creating a sense of inexorable forward motion. The speech sounds like what it argues for: determined, relentless, unstoppable.

Churchill's speech succeeded because it offered neither false hope nor paralyzing despair but something more powerful: defiant realism that acknowledged present danger while asserting unconquerable will. Through anaphora, strategic structure, and syntax that embodies its message, Churchill transformed a moment of potential national collapse into a declaration of unbreakable resolve that helped define Britain's finest hour.`,
      score: 6,
      rubricBreakdown: [
        {
          category: "Thesis",
          points: 1,
          maxPoints: 1,
          explanation: "The thesis identifies specific rhetorical strategies (anaphora, progression from concrete to abstract, balance of defiance and hope) and connects them to Churchill's purpose. It's analytical rather than merely descriptive: the essay doesn't just say Churchill uses repetition but explains what that repetition accomplishes."
        },
        {
          category: "Evidence and Commentary",
          points: 4,
          maxPoints: 4,
          explanation: "The essay provides specific textual evidence for each analytical claim (direct quotes of 'we shall,' the geographic progression, 'whatever the cost may be,' etc.). Commentary consistently explains the effect of each choice on the audience and connects choices to purpose. The analysis addresses not just individual devices but their interaction — how anaphora, structure, and syntax work together."
        },
        {
          category: "Sophistication",
          points: 1,
          maxPoints: 1,
          explanation: "The essay demonstrates sophistication through nuanced analysis (explaining how 'we shall' differs from 'I will' or 'we would'), recognition of complexity (Churchill acknowledging defeat while undercutting it), attention to multiple levels simultaneously (word choice, syntax, structure), and stylistic control (the essay's own prose is purposeful, particularly the penultimate paragraph's analysis of syntax)."
        }
      ]
    },
    {
      id: "argument-1",
      title: "Value of Failure",
      type: "Argument",
      prompt: "Failure is a necessary part of learning. Write an essay that argues your position on this statement using appropriate evidence to support your argument.",
      sampleEssay: `Every biography of success contains chapters of failure that made it possible. Abraham Lincoln lost eight elections before winning the presidency. J.K. Rowling's Harry Potter was rejected by twelve publishers. Thomas Edison tested thousands of materials before finding one that worked as a lightbulb filament. These examples are so common they risk becoming cliché, yet they persist because they reveal a fundamental truth: failure is not merely an obstacle to learning but its essential mechanism. Without the feedback, motivation, and resilience that failure provides, genuine learning rarely occurs.

Failure functions as information in ways success cannot. When an approach works, it confirms what we already suspected; when it fails, it reveals what we didn't know we didn't know. Consider scientific progress, which advances not through continuous success but through hypotheses disproven. The history of medicine is largely a history of treatments that didn't work, each failure narrowing the search for treatments that would. Edison didn't "fail" thousands of times — he discovered thousands of materials that couldn't serve as filaments, information that guided him toward materials that could. Without access to what doesn't work, learners cannot triangulate toward what does.

Beyond providing information, failure supplies motivation that success cannot match. Psychologists have documented what they call "desirable difficulties" — challenges that slow initial learning but deepen long-term retention. Students who struggle with problems before being shown solutions remember those solutions longer than students given answers immediately. The effort of failed attempts creates cognitive pathways that successful shortcuts never build. Struggle, frustration, and yes, failure are not bugs in the learning process but features — the mental equivalent of the muscle strain that produces physical strength.

Perhaps most importantly, failure builds the resilience necessary for any substantial achievement. The infant learning to walk falls dozens of times before succeeding; the child who was never allowed to fall would never learn to walk at all. Each failure survived becomes evidence that failure is survivable, building the psychological resources needed to persist through the larger failures that accompany larger ambitions. Studies of "gritty" high achievers consistently find not that they experienced less failure but that they responded to failure differently — viewing it as information and motivation rather than verdict.

The counterargument is obvious: excessive or punitive failure can crush motivation rather than build it. A student who fails repeatedly without support may conclude that learning is impossible rather than developing persistence. This objection, however, argues for better-designed failure — failure accompanied by feedback, scaffolding, and encouragement — not for eliminating failure altogether. The solution to bad failure is not success at all costs but failure that teaches rather than merely punishes.

Our educational systems, unfortunately, often treat failure as something to be avoided rather than learned from. Grade inflation, participation trophies, and curricula designed to minimize struggle all reflect a well-intentioned but misguided attempt to protect students from failure's pain. The result is students who reach adulthood having been shielded from the very experiences that build resilience and depth of understanding. They can recite what they were told but crumble when confronted with problems not previously solved for them.

Failure is painful — there is no pretending otherwise. But the pain serves a purpose, signaling that something needs to change and motivating the search for what that something might be. Learning to embrace failure's lessons while managing its emotional toll is not a distraction from learning but perhaps the most important learning of all. Those biographies of success that begin with failure chapters end with success not despite those chapters but because of them.`,
      score: 6,
      rubricBreakdown: [
        {
          category: "Thesis",
          points: 1,
          maxPoints: 1,
          explanation: "The essay presents a clear, defensible thesis that goes beyond simply agreeing with the prompt: 'failure is not merely an obstacle to learning but its essential mechanism. Without the feedback, motivation, and resilience that failure provides, genuine learning rarely occurs.' This thesis is arguable and provides the structure for the essay."
        },
        {
          category: "Evidence and Commentary",
          points: 4,
          maxPoints: 4,
          explanation: "The essay draws on multiple types of evidence: historical examples (Lincoln, Rowling, Edison), scientific process, psychological research ('desirable difficulties,' studies of 'gritty' achievers), and reasoning from first principles (the walking infant analogy). Each piece of evidence is analyzed rather than merely cited, with clear explanation of how it supports the thesis. The essay also addresses counterarguments substantively."
        },
        {
          category: "Sophistication",
          points: 1,
          maxPoints: 1,
          explanation: "The essay demonstrates sophistication by acknowledging complexity (failure can crush motivation if handled poorly), situating the argument in broader context (critique of educational systems), reframing familiar examples with fresh analysis (Edison's 'failures' as information), and employing varied, purposeful prose style (the parallel structure of the opening, the rhetorical questions and pivots)."
        }
      ]
    }
  ],
  apush: [
    {
      id: "dbq-1",
      title: "Causes of the American Revolution",
      type: "Document-Based Question (DBQ)",
      prompt: "Evaluate the extent to which colonial responses to British policies between 1763 and 1776 reflected a growing sense of American identity.",
      sources: [
        {
          id: "doc-a",
          title: "Document A: Patrick Henry's Speech (1765)",
          content: "Caesar had his Brutus; Charles the First his Cromwell; and George the Third — may profit by their example. If this be treason, make the most of it! ... The distinctions between Virginians, Pennsylvanians, New Yorkers, and New Englanders are no more. I am not a Virginian, but an American."
        },
        {
          id: "doc-b",
          title: "Document B: Stamp Act Congress Resolution (1765)",
          content: "That the only representatives of the people of these colonies are persons chosen therein, by themselves; and that no taxes ever have been, or can be constitutionally imposed on them, but by their respective legislatures... That it is the indispensable duty of these colonies to the best of sovereigns... to procure the repeal of the Act."
        },
        {
          id: "doc-c",
          title: "Document C: Letters from a Farmer in Pennsylvania (John Dickinson, 1767)",
          content: "Let us take care of our rights, and we therein take care of our property. We are but parts of a whole; and therefore there must exist a power somewhere to preside... If a resolution is passed that we shall be treated as colonists and not as Britons, we shall be thereby degraded."
        },
        {
          id: "doc-d",
          title: "Document D: Boston Gazette Illustration (1770)",
          content: "[Description: Paul Revere's engraving 'The Bloody Massacre' depicting British soldiers firing on unarmed colonists. Labeled 'Butcher's Hall' with text reading 'Unhappy Boston! See thy sons deplore, Thy hallow'd walks besmear'd with guiltless gore.']"
        },
        {
          id: "doc-e",
          title: "Document E: Thomas Paine's 'Common Sense' (1776)",
          content: "Europe, and not England, is the parent country of America. This new world hath been the asylum for the persecuted lovers of civil and religious liberty from every part of Europe... Everything that is right or natural pleads for separation. The blood of the slain, the weeping voice of nature cries, 'TIS TIME TO PART."
        },
        {
          id: "doc-f",
          title: "Document F: Loyalist Proclamation (1775)",
          content: "We... do hereby declare our utmost abhorrence of all such treasonable associations... Duty to our King, love to our country, and sincere affection for our countrymen in Britain ought to unite us... Those who call themselves 'Sons of Liberty' are sons of anarchy and confusion."
        },
        {
          id: "doc-g",
          title: "Document G: Declaration of Independence (1776)",
          content: "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights... When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another... a decent respect to the opinions of mankind requires that they should declare the causes."
        }
      ],
      sampleEssay: `Between 1763 and 1776, colonial responses to British policies underwent a fundamental transformation — from protests demanding rights as British subjects to a declaration asserting the existence of a distinct American people. While this evolution reflected a genuinely growing American identity, it also revealed significant limitations and contradictions in that identity. Colonial resistance increasingly emphasized unity and distinctiveness but remained divided by class, region, and the fundamental contradiction of demanding liberty while perpetuating slavery.

Early colonial resistance emphasized not American distinctiveness but British rights. The Stamp Act Congress of 1765 protested taxation while affirming "indispensable duty... to the best of sovereigns" and seeking "repeal of the Act" rather than independence (Document B). Similarly, John Dickinson's Letters from a Farmer acknowledged colonies "are but parts of a whole" and complained of being treated "as colonists and not as Britons" — the grievance was exclusion from Britishness, not rejection of it (Document C). Even Patrick Henry, while dramatically warning George III of Caesar's and Charles I's fates, still operated within a framework of British precedent and monarchical governance (Document A). These early responses sought reformation of the imperial relationship, not its dissolution.

The shift toward American identity accelerated through the late 1760s and early 1770s, driven by British policies that increasingly unified previously disparate colonies. Intercolonial organizations like the Sons of Liberty, Committees of Correspondence, and Continental Congress created structures for collective action that had not previously existed. Visual propaganda like Paul Revere's "Bloody Massacre" (Document D) deliberately constructed a shared narrative of British tyranny against American innocence, transforming a local incident into a symbol of colonial-wide oppression. The emotional appeal to "unhappy Boston" and "guiltless gore" created collective identity through shared grievance — Americans defined in opposition to British brutality.

By 1776, this transformation reached its culmination in Thomas Paine's Common Sense and the Declaration of Independence. Paine explicitly rejected British identity, arguing "Europe, and not England, is the parent country of America" and that "everything that is right or natural pleads for separation" (Document E). This was not reform but reconceptualization — Americans were not wayward Britons but a distinct people with a distinct destiny. The Declaration codified this by speaking of "one people" dissolving "political bands" with another, asserting not merely legal grievances but the existence of a separate American nation with rights derived from nature rather than British constitution (Document G).

However, this emerging American identity had significant limitations that complicate any claim of unified national consciousness. Document F reveals the substantial Loyalist opposition — Americans who rejected the Patriot narrative and viewed independence advocates as "sons of anarchy." Historians estimate that as many as one-third of colonists remained loyal to Britain, suggesting "American identity" was always contested rather than universal. Regional, class, and religious differences persisted beneath patriotic rhetoric. The wealthy merchants leading resistance in coastal cities had different interests than backcountry farmers who had rioted against colonial elites only years before (as in the Regulator movement).

Most fundamentally, the American identity expressed in documents like the Declaration rested on a profound contradiction: asserting that "all men are created equal" while maintaining a slave system that denied the humanity of hundreds of thousands. The "American people" whose rights these documents championed was implicitly defined to exclude enslaved Africans, Native Americans, and even most women from full participation. This limitation suggests that emerging American identity was as much about defining who was not American as who was.

In conclusion, colonial responses to British policies between 1763 and 1776 did reflect a growing American identity — but that identity was a process rather than a fact, contested rather than universal, and fundamentally compromised by its internal contradictions. The shift from claiming rights as Britons to asserting existence as a distinct American people was real and consequential, setting the stage for the new nation. But the unity that revolutionaries proclaimed was always partial, the liberty they championed always incomplete.`,
      score: 7,
      rubricBreakdown: [
        {
          category: "Thesis/Claim",
          points: 1,
          maxPoints: 1,
          explanation: "The essay presents a nuanced thesis that takes a position on the extent of American identity ('did reflect a growing American identity') while acknowledging complexity ('significant limitations and contradictions'). This directly addresses the 'evaluate the extent' prompt requirement."
        },
        {
          category: "Contextualization",
          points: 1,
          maxPoints: 1,
          explanation: "The essay provides relevant historical context by situating colonial responses within the broader framework of British imperial policy post-1763 and referencing developments like intercolonial organizations that created structures for collective action."
        },
        {
          category: "Evidence (Documents)",
          points: 3,
          maxPoints: 3,
          explanation: "The essay uses six of the seven documents, accurately describing their content and using them to support the argument. Documents are not merely quoted but analyzed for what they reveal about the development (or limitations) of American identity."
        },
        {
          category: "Evidence (Outside Knowledge)",
          points: 1,
          maxPoints: 1,
          explanation: "The essay incorporates relevant outside evidence including the Regulator movement, estimates of Loyalist population (one-third), Committees of Correspondence, and the implicit exclusion of enslaved people and Native Americans from declared equality."
        },
        {
          category: "Complexity",
          points: 1,
          maxPoints: 1,
          explanation: "The essay demonstrates complex understanding by acknowledging tensions and contradictions within American identity (Loyalists, slavery), explaining both change and continuity, and using Document F to complicate rather than support the narrative of unified identity. The conclusion synthesizes the argument rather than merely summarizing."
        }
      ]
    }
  ],
  "ap-seminar": [
    {
      id: "iwa-1",
      title: "Social Media and Democracy",
      type: "Individual Written Argument (IWA)",
      prompt: "Select a topic that addresses a real-world problem or issue and develop an argument that proposes a solution or takes a position on the issue.",
      sampleEssay: `The Promise and Peril of Social Media in Democratic Discourse

Introduction: When social media platforms emerged in the mid-2000s, they were celebrated as tools of democratization — giving voice to the voiceless, enabling grassroots organizing, and challenging information gatekeepers. Two decades later, these same platforms stand accused of undermining democracy by amplifying misinformation, enabling foreign interference, and fracturing shared reality. This paper argues that social media's effect on democracy is neither purely positive nor negative but contingent on platform design choices that can and should be reformed. By implementing algorithmic transparency, reducing amplification of inflammatory content, and investing in digital literacy education, we can preserve social media's democratic benefits while mitigating its harms.

The Democratic Promise: Social media has genuinely expanded democratic participation in ways impossible through traditional media. The Arab Spring uprisings demonstrated how platforms could coordinate mass movements against authoritarian regimes (Howard & Hussain, 2013). The Black Lives Matter movement leveraged social media to bring police violence into national consciousness when mainstream media had long ignored it (Freelon et al., 2016). For marginalized communities systematically excluded from traditional media ownership, social platforms provide unprecedented access to public discourse. These benefits are real and should not be dismissed in any balanced assessment.

However, acknowledging benefits does not require ignoring costs. Empirical research increasingly documents social media's corrosive effects on democratic norms. A 2018 MIT study found that false news stories spread faster and farther on Twitter than accurate ones, reaching six times more people (Vosoughi et al., 2018). Investigations following the 2016 election revealed sophisticated foreign interference operations exploiting platform vulnerabilities to inflame social divisions (Mueller Report, 2019). Algorithmic amplification, designed to maximize engagement, systematically promotes content triggering outrage over content promoting understanding (Brady et al., 2020). These are not inevitable features of social technology but consequences of specific design choices prioritizing advertising revenue over democratic health.

The key insight is that social media's democratic effects are not fixed but designable. Platform algorithms currently optimize for "engagement" — a metric that rewards inflammatory, divisive, and outrage-inducing content because such content generates more clicks, comments, and shares. But algorithms could be redesigned to optimize for different values. Research suggests that simple changes like adding friction to sharing (requiring users to read articles before retweeting them) significantly reduce the spread of misinformation (Fazio, 2020). Platforms have already implemented some reforms under public pressure, demonstrating that change is technically feasible when incentives align.

Three interconnected reforms would substantially address social media's democratic harms while preserving its benefits. First, platforms should be required to disclose how their algorithms function. Currently, the criteria determining what content billions of people see are corporate secrets. Algorithmic transparency would enable independent researchers, regulators, and users to understand and respond to amplification patterns. The EU's Digital Services Act moves in this direction; similar U.S. legislation is warranted.

Second, platforms should reduce automatic amplification of content likely to be inflammatory or false. This does not require (constitutionally problematic) content removal but rather refusing to boost content through algorithmic recommendation. Free speech protections have never guaranteed anyone the right to algorithmic amplification; distinguishing between allowing speech and actively spreading it is conceptually coherent and legally sound.

Third, public investment in digital literacy education should equip citizens to navigate information environments that schools designed for print media never prepared them for. Finland's comprehensive media literacy curriculum has made its citizens significantly more resistant to misinformation (MacKinnon, 2019); similar programs should be standard in democratic societies.

Counterarguments deserve consideration. Some argue that any regulation of platforms threatens free speech. But transparency requirements and amplification reforms do not prevent anyone from speaking — they merely prevent platforms from spreading certain speech with technological megaphones. Others contend that platform self-regulation is preferable to government intervention. But platforms' advertising-based business models create structural incentives against reforms that might reduce engagement, suggesting self-regulation will remain inadequate without external pressure.

Conclusion: Social media is neither inherently democratic nor inherently anti-democratic; it is a set of technologies whose effects depend on how they are designed and regulated. By demanding transparency, reforming amplification algorithms, and investing in digital literacy, we can shape social media to support rather than undermine democratic discourse. The stakes could not be higher: shared facts and productive disagreement are preconditions for democratic self-governance, and whether we preserve them in the social media age is a choice we are making right now.`,
      score: 5,
      rubricBreakdown: [
        {
          category: "Understanding and Analyzing",
          points: 5,
          maxPoints: 5,
          explanation: "The essay demonstrates thorough understanding of multiple perspectives on social media and democracy, analyzing both benefits (democratization, marginalized voices) and harms (misinformation spread, algorithmic amplification) with nuance. Sources are accurately represented and critically evaluated."
        },
        {
          category: "Synthesizing and Evaluating",
          points: 5,
          maxPoints: 5,
          explanation: "The essay effectively synthesizes diverse sources into a coherent argument, creating 'conversation' between research findings. It evaluates evidence critically, noting that effects depend on 'design choices' rather than being inherent to technology. Counterarguments are addressed substantively."
        },
        {
          category: "Argument Development",
          points: 4,
          maxPoints: 5,
          explanation: "The argument is well-structured with clear thesis, logical progression through evidence, and specific policy recommendations. The three-part reform proposal is concrete and actionable. Some additional development of how reforms would be implemented or evaluated would strengthen the argument."
        },
        {
          category: "Communication",
          points: 5,
          maxPoints: 5,
          explanation: "The essay communicates clearly with appropriate academic tone, effective organization, and proper attribution throughout. Prose is clear and varied, technical concepts are explained, and the conclusion effectively synthesizes the argument."
        }
      ]
    }
  ]
};

export const videosData: Record<string, { id: string; title: string; description: string }[]> = {
  apush: [
    { id: "wq2jG_Ww_xc", title: "APUSH Unit 2 Review (1607-1754)", description: "Colonial America & European colonization methods - Heimler's History (2.2M views)" },
    { id: "-wnDpr9PMnc", title: "APUSH Unit 4 Review (1800-1848)", description: "Early Republic, Market Revolution & Democracy - Heimler's History (2.5M views)" },
    { id: "Xdq9kU7XHMY", title: "APUSH Unit 3 Review (1754-1800)", description: "American Revolution & Constitution - Heimler's History" },
    { id: "qVdmW8VVQP4", title: "APUSH Unit 5 Review (1844-1877)", description: "Civil War & Reconstruction Era - Heimler's History" },
    { id: "mEV2Sl8x1jI", title: "APUSH Unit 6 Review (1865-1898)", description: "Gilded Age & Western Expansion - Heimler's History" },
    { id: "XHVN1k-5Pew", title: "How to Write the DBQ", description: "Document-Based Question step-by-step guide - Heimler's History" },
    { id: "vHE3-S5mSW4", title: "How to Write the LEQ", description: "Long Essay Question structure & tips - Heimler's History" },
    { id: "N-7g_drecGQ", title: "How to Answer SAQs", description: "Short Answer Question strategies - Heimler's History" },
  ],
  "ap-lang": [
    { id: "8Fdt-2LQEUQ", title: "How to Write a Rhetorical Analysis Essay", description: "Step-by-step rhetorical analysis breakdown - Coach Hall Writes" },
    { id: "e7Wy8c13Ps8", title: "AP Lang Synthesis Essay Tips", description: "How to combine sources effectively - Coach Hall Writes" },
    { id: "PJlkbNaO27M", title: "AP Lang Argument Essay Guide", description: "Building compelling arguments with evidence - Coach Hall Writes" },
    { id: "aPD-3VSFmG4", title: "Ethos, Pathos, and Logos Explained", description: "Understanding the three rhetorical appeals" },
    { id: "0xeHQ4u9rpo", title: "AP English Language Exam Overview", description: "What to expect on exam day - College Board" },
    { id: "4LI0Eag10ek", title: "How to Analyze Rhetoric", description: "Breaking down persuasive techniques in texts" },
  ],
  "ap-seminar": [
    { id: "vvLSxsohXYo", title: "AP Seminar Course Overview", description: "Understanding the AP Capstone program - College Board" },
    { id: "N7VuBGkN_Mc", title: "How to Write a Research Paper", description: "Academic research and writing fundamentals" },
    { id: "YMs0SXDIFUE", title: "Evaluating Sources (CRAAP Test)", description: "Critical source evaluation for research" },
    { id: "OEEn2XkMf6g", title: "How to Give a Great Presentation", description: "Public speaking tips for oral defense" },
    { id: "Fy7-hK6LG9U", title: "Building Strong Arguments", description: "Constructing evidence-based claims" },
  ],
};

export const tipsData: Record<string, { title: string; content: string; category: string }[]> = {
  apush: [
    { title: "Master the 9 Periods", content: "Focus on understanding themes and turning points, not memorizing dates. Ask: What changed? What stayed the same? Why?", category: "Study Strategy" },
    { title: "Practice DBQs Weekly", content: "The DBQ is 25% of your score. Practice analyzing documents, grouping by theme, and writing a thesis with outside evidence.", category: "Exam Prep" },
    { title: "Know the Historical Thinking Skills", content: "Causation, comparison, continuity/change, and contextualization appear in every question. Practice identifying which skill each prompt requires.", category: "Study Strategy" },
    { title: "Create Period Summaries", content: "For each period, know: 2-3 major events, key individuals, significant documents, and how it connects to themes like democracy, identity, and expansion.", category: "Study Strategy" },
  ],
  "ap-lang": [
    { title: "Read Nonfiction Daily", content: "Read opinion columns from major newspapers. Identify thesis, strategies, and audience. Active reading builds skills naturally.", category: "Daily Practice" },
    { title: "Commentary Over Evidence", content: "Your analysis should be 2-3x longer than your evidence. Explain WHY and HOW evidence supports your point.", category: "Writing Tips" },
    { title: "Time Your Essays", content: "Practice writing under timed conditions: 40 minutes per essay. Learn to plan quickly and write efficiently.", category: "Exam Prep" },
    { title: "Build Your Rhetorical Vocabulary", content: "Know devices beyond basics: anaphora, antithesis, chiasmus, periodic sentences. Being able to name techniques strengthens analysis.", category: "Study Strategy" },
  ],
  "ap-seminar": [
    { title: "Choose Topics You Care About", content: "For your research project, pick something that genuinely interests you. Passion leads to deeper, more authentic analysis.", category: "Research" },
    { title: "Practice Oral Defense", content: "Prepare for tough questions: Why this topic? What are limitations? How might your argument be challenged?", category: "Presentations" },
    { title: "Evaluate Sources Critically", content: "Use CRAAP test for every source. Consider: Who benefits from this information? What perspectives are missing?", category: "Research" },
    { title: "Cite as You Write", content: "Add citations while drafting, not after. It's easier to remove unnecessary ones than to hunt down sources later.", category: "Writing Tips" },
  ],
};

export const resourcesData: Record<string, { title: string; url: string; description: string; type: string }[]> = {
  apush: [
    { title: "College Board APUSH", url: "https://apstudents.collegeboard.org/courses/ap-united-states-history", description: "Official course page with exam info and rubrics", type: "Official" },
    { title: "AP Classroom", url: "https://apclassroom.collegeboard.org/", description: "Official practice questions and progress checks", type: "Official" },
    { title: "Gilder Lehrman Institute", url: "https://www.gilderlehrman.org/", description: "Primary sources and scholarly essays", type: "Primary Sources" },
    { title: "Digital History", url: "https://www.digitalhistory.uh.edu/", description: "Comprehensive U.S. history resources", type: "Study Guide" },
    { title: "Heimler's History", url: "https://www.youtube.com/@HeimersHistory", description: "Popular APUSH review videos", type: "Video" },
    { title: "APUSH Review", url: "https://www.apushreview.com/", description: "Period reviews and practice questions", type: "Study Guide" },
    { title: "National Archives", url: "https://www.archives.gov/education", description: "Primary documents and teaching resources", type: "Primary Sources" },
    { title: "Library of Congress", url: "https://www.loc.gov/classroom-materials/", description: "Historical documents and photographs", type: "Primary Sources" },
  ],
  "ap-lang": [
    { title: "College Board AP Lang", url: "https://apstudents.collegeboard.org/courses/ap-english-language-and-composition", description: "Official course page and exam information", type: "Official" },
    { title: "AP Classroom", url: "https://apclassroom.collegeboard.org/", description: "Official practice materials and scoring", type: "Official" },
    { title: "Purdue OWL", url: "https://owl.purdue.edu/", description: "Writing and citation guides", type: "Writing Resources" },
    { title: "American Rhetoric", url: "https://www.americanrhetoric.com/", description: "Famous speeches with analysis", type: "Practice Texts" },
    { title: "The New York Times Opinion", url: "https://www.nytimes.com/section/opinion", description: "Contemporary arguments for analysis practice", type: "Practice Texts" },
    { title: "The Atlantic", url: "https://www.theatlantic.com/", description: "Long-form arguments and essays", type: "Practice Texts" },
  ],
  "ap-seminar": [
    { title: "College Board AP Seminar", url: "https://apstudents.collegeboard.org/courses/ap-seminar", description: "Official course page and performance task info", type: "Official" },
    { title: "AP Classroom", url: "https://apclassroom.collegeboard.org/", description: "Performance task resources and rubrics", type: "Official" },
    { title: "Google Scholar", url: "https://scholar.google.com/", description: "Academic article search engine", type: "Research" },
    { title: "JSTOR", url: "https://www.jstor.org/", description: "Academic journals (check school access)", type: "Research" },
    { title: "Pew Research", url: "https://www.pewresearch.org/", description: "Nonpartisan data and analysis", type: "Research" },
    { title: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/", description: "In-depth philosophical analysis", type: "Research" },
    { title: "Purdue OWL: Research", url: "https://owl.purdue.edu/owl/research_and_citation/", description: "Research and citation guides", type: "Writing Resources" },
  ],
};

// AP Exam dates (auto-updating based on College Board schedule)
// Month/day format - year auto-calculated
export const examDatesData: Record<string, { month: number; day: number; time: string }> = {
  apush: { month: 5, day: 9, time: "8:00 AM" },        // APUSH is typically early May
  "ap-lang": { month: 5, day: 14, time: "8:00 AM" },  // AP Lang is mid-May Week 2
  "ap-seminar": { month: 5, day: 7, time: "8:00 AM" }, // AP Seminar is early May Week 1
};


// Mock exam data with embedded sources
export const mockExamsData: Record<string, {
  id: number;
  title: string;
  description: string;
  sections: {
    name: string;
    timeMinutes: number;
    type: "mcq" | "frq";
    instructions: string;
    questionIds?: number[];
    frqPrompts?: {
      id: string;
      prompt: string;
      type: string;
      points: number;
      rubric: string[];
      sources?: { id: string; title: string; content: string }[];
    }[];
  }[];
}[]> = {
  "ap-lang": [
    {
      id: 1,
      title: "AP Lang Practice Exam",
      description: "Full-length practice exam with all three essay types",
      sections: [
        {
          name: "Multiple Choice",
          timeMinutes: 60,
          type: "mcq",
          instructions: "Answer all questions based on the passages provided. Choose the best answer for each question.",
          questionIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        },
        {
          name: "Free Response",
          timeMinutes: 120,
          type: "frq",
          instructions: "You will have 2 hours to complete all three essays. Budget approximately 40 minutes per essay.",
          frqPrompts: [
            {
              id: "synthesis-1",
              prompt: "The role of public libraries in the digital age has been debated as communities face budget constraints and changing information needs. Develop a position on how public libraries should evolve to remain relevant in the 21st century. Synthesize at least three of the following sources in your argument.",
              type: "Synthesis",
              points: 6,
              rubric: ["Thesis: 0-1 point", "Evidence and Commentary: 0-4 points", "Sophistication: 0-1 point"],
              sources: [
                {
                  id: "source-a",
                  title: "Source A (Pew Research)",
                  content: "Pew Research Center, 2023:\n\nDespite predictions of obsolescence, 54% of Americans visited a public library or bookmobile in the past year. However, usage patterns have shifted dramatically. While book borrowing declined 15% over the past decade, digital service usage increased 67%. Libraries now function as community centers, providing free wifi (crucial for the 15% of Americans without home internet), employment resources, and educational programming.\n\nNotably, library usage correlates inversely with income: households earning under $30,000 annually are twice as likely to report the library as their only source of internet access. In focus groups, users described libraries as 'the great equalizer' and 'essential community infrastructure.'"
                },
                {
                  id: "source-b",
                  title: "Source B (The Economist)",
                  content: "The Economist, 'The Transformation of Libraries,' 2024:\n\nThe debate over library relevance misses a crucial point: libraries have always evolved with technology. From clay tablets to codices to computer terminals, the format has changed while the mission remained constant. Today's successful libraries have embraced their role as technology educators, with 87% offering digital literacy programs.\n\nHowever, mission creep poses risks. Libraries attempting to be employment centers, social service hubs, homeless shelters, and makerspaces simultaneously may do none well. Strategic focus remains essential."
                },
                {
                  id: "source-c",
                  title: "Source C (Municipal Budget Report)",
                  content: "Springfield Municipal Budget Committee, 2024:\n\nLibrary operations consume 2.3% of the municipal budget ($4.2 million annually), serving approximately 180,000 residents. Per-visit costs average $12.40, compared to $8.50 for digital-only service delivery. Closure of branch libraries could reduce costs by 35% while maintaining digital services.\n\nCommittee recommends transitioning to a 'digital-first' model with one central physical location for essential in-person services."
                },
                {
                  id: "source-d",
                  title: "Source D (Community Testimony)",
                  content: "Maria Santos, Springfield Public Library patron, testimony to City Council, 2024:\n\n'My children completed their homework at this library every day for three years while I worked evening shifts. Without the children's programming and the staff who helped them, I don't know what we would have done. Digital services are important, but you can't replace human beings. You can't replace a librarian who notices that a child is struggling and takes time to help. My daughter is now in college—the first in our family—and she wrote her application essays at this library.'"
                },
                {
                  id: "source-e",
                  title: "Source E (Academic Study)",
                  content: "Journal of Community Development, Vol. 42, 2023:\n\nA longitudinal study of 47 communities that closed library branches between 2008-2018 found measurable negative effects on surrounding areas. Property values within 1-mile radius declined 4.7% relative to control neighborhoods. Student test scores in affected school districts declined 2.1 percentile points. Reported social isolation among senior residents increased 23%.\n\nResearchers note limitations: communities facing budget pressures severe enough to close libraries may have other underlying economic weaknesses affecting these metrics."
                },
                {
                  id: "source-f",
                  title: "Source F (Editorial)",
                  content: "Tech Forward Blog, 'Time to Digitize Libraries,' 2024:\n\n'The nostalgia for physical libraries ignores reality. E-books are cheaper to distribute, accessible 24/7, and don't require real estate. A fully digital library system would serve more patrons at lower cost while freeing up valuable urban land for housing or commercial development. The romance of physical books shouldn't trump fiscal responsibility.'"
                }
              ]
            },
            {
              id: "rhetorical-1",
              prompt: "The following is an excerpt from a speech delivered by environmental activist and author Bill McKibben at a climate rally in 2023. Read the passage carefully. Then write an essay analyzing the rhetorical strategies McKibben uses to convey his message about climate action.\n\n---\n\nWe stand at a hinge point in human history. Behind us lie ten thousand years of relative climate stability—the entire span of human civilization. Ahead of us... well, that depends on what we do in the next decade.\n\nI know what some of you are thinking: 'We've heard this before.' You're right. Scientists have been warning us for fifty years. And for fifty years, we've found reasons not to listen. The science was uncertain. The technology wasn't ready. The economy couldn't handle it. The timing wasn't right.\n\nBut here's what's different now: the science isn't uncertain anymore. It's terrifyingly precise. We know exactly how much carbon we can still emit. We know exactly how much time we have. And we know exactly what happens if we fail.\n\nSome will tell you that individual action is the answer. Shorter showers. Fewer flights. More recycling. And yes, these matter. But suggesting that individual virtue can solve a systemic crisis is like suggesting that everyone should just personally clean up the oil spill. We need systemic change.\n\nThe fossil fuel industry has known about climate change since 1977. Their own scientists told them. And what did they do? They spent billions spreading doubt, buying politicians, and blocking progress. They made a conscious choice to trade the future of every child on this planet for another decade of profits.\n\nSo when someone asks you why you're here today, tell them this: You're here because you believe that we still have a choice. You're here because you know that despair is a luxury we cannot afford. You're here because you understand that hope is not a feeling—it's a form of action.\n\nThe next generation will ask what we did when we knew. Let's give them an answer we can be proud of.",
              type: "Rhetorical Analysis",
              points: 6,
              rubric: ["Thesis: 0-1 point", "Evidence and Commentary: 0-4 points", "Sophistication: 0-1 point"]
            },
            {
              id: "argument-1",
              prompt: "In many schools and communities, students are increasingly engaged in social and political activism. Some argue that youth activism is essential for civic development and creates meaningful change. Others contend that young people lack the knowledge and maturity for effective activism, and that activism distracts from academic priorities.\n\nWrite an essay that argues your position on the value or limitations of youth activism.",
              type: "Argument",
              points: 6,
              rubric: ["Thesis: 0-1 point", "Evidence and Commentary: 0-4 points", "Sophistication: 0-1 point"]
            }
          ]
        }
      ]
    }
  ],
  apush: [
    {
      id: 1,
      title: "APUSH Practice Exam",
      description: "Full-length practice exam with DBQ and LEQ",
      sections: [
        {
          name: "Multiple Choice",
          timeMinutes: 55,
          type: "mcq",
          instructions: "Answer all questions based on the stimuli provided. Choose the best answer for each question.",
          questionIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        },
        {
          name: "Document-Based Question",
          timeMinutes: 60,
          type: "frq",
          instructions: "Use the documents and your knowledge of the period to construct a coherent essay with a thesis supported by evidence from the documents and your knowledge of the period.",
          frqPrompts: [
            {
              id: "dbq-1",
              prompt: "Evaluate the extent to which Progressive Era reformers were successful in achieving their goals between 1890 and 1920.",
              type: "DBQ",
              points: 7,
              rubric: [
                "Thesis: 0-1 point - Responds with a historically defensible thesis",
                "Contextualization: 0-1 point - Describes broader historical context",
                "Evidence from Documents: 0-3 points - Uses documents to support argument",
                "Evidence Beyond Documents: 0-1 point - Uses additional specific evidence",
                "Sourcing: 0-1 point - Explains POV, purpose, historical situation, or audience"
              ],
              sources: [
                {
                  id: "doc-a",
                  title: "Document A",
                  content: "Jacob Riis, How the Other Half Lives, 1890:\n\n'The sea of a mighty population, held in galling fetters, heaves uneasily in the tenements. The gap between the classes is widening day by day. There is no more dangerous portent in the signs of the times than the growing poverty of the many against the hoarding of the few. If the tenement is here to stay, its worst features must go. Reform must begin with the roof, and work down to the foundations.'\n\n[Context: Riis was a Danish-American journalist and social reformer who documented poverty in New York City through photography and writing.]"
                },
                {
                  id: "doc-b",
                  title: "Document B",
                  content: "Upton Sinclair, The Jungle, 1906 (excerpt):\n\n'There would be meat that had tumbled out on the floor, in the dirt and sawdust, where the workers had tramped and spit uncounted billions of disease germs. There would be meat stored in great piles in rooms; and the water from leaky roofs would drip over it, and thousands of rats would race about on it.'\n\n[Context: Sinclair's novel exposed conditions in the Chicago meatpacking industry. Though Sinclair intended to promote socialism, the book's impact focused on food safety, leading to the Pure Food and Drug Act and Meat Inspection Act of 1906.]"
                },
                {
                  id: "doc-c",
                  title: "Document C",
                  content: "Theodore Roosevelt, 'The New Nationalism' speech, 1910:\n\n'We are face to face with new conceptions of the relations of property to human welfare. The man who wrongly holds that every human right is secondary to his profit must now give way to the advocate of human welfare, who rightly maintains that every man holds his property subject to the general right of the community to regulate its use to whatever degree the public welfare may require it.'\n\n[Context: Roosevelt delivered this speech in Osawatomie, Kansas, after leaving the presidency, articulating his progressive philosophy.]"
                },
                {
                  id: "doc-d",
                  title: "Document D",
                  content: "Carrie Chapman Catt, Address to Congress on Women's Suffrage, 1917:\n\n'Our country is at war. The young men are marching forth to die for Democracy. Do you realize what it means to us women when you ask our young men to give their lives for democracy abroad and you will not permit us to vote for the democracy at home for which they are giving their lives?'\n\n[Context: Catt was president of the National American Woman Suffrage Association. The 19th Amendment was ratified in 1920, three years after this speech.]"
                },
                {
                  id: "doc-e",
                  title: "Document E",
                  content: "W.E.B. Du Bois, 'Returning Soldiers,' The Crisis, 1919:\n\n'We return. We return from fighting. We return fighting. Make way for Democracy! We saved it in France, and by the Great Jehovah, we will save it in the United States of America, or know the reason why. This country of ours is a shameful land. It lynches. It disfranchises its own citizens.'\n\n[Context: Du Bois wrote this editorial as African American soldiers returned from World War I. The post-war period saw increased racial violence, including the Red Summer of 1919.]"
                },
                {
                  id: "doc-f",
                  title: "Document F",
                  content: "16th, 17th, 18th, and 19th Amendments to the Constitution:\n\n- 16th Amendment (1913): Authorized federal income tax\n- 17th Amendment (1913): Direct election of Senators\n- 18th Amendment (1919): Prohibition of alcohol\n- 19th Amendment (1920): Women's suffrage\n\n[Context: These four amendments, ratified within seven years, represented Progressive goals of expanding democracy and promoting moral reform.]"
                },
                {
                  id: "doc-g",
                  title: "Document G",
                  content: "Business leader speaking at National Association of Manufacturers meeting, 1912:\n\n'The so-called Progressive movement threatens the very foundations of our free enterprise system. These agitators seek to interpose government between the employer and his workforce, to dictate prices and working conditions, to steal from the successful and give to the indolent. The Constitution guarantees liberty of contract. What man of enterprise will invest his capital if government can seize his profits at will?'\n\n[Context: The National Association of Manufacturers was a leading opponent of Progressive labor reforms and supported legal challenges to regulations.]"
                }
              ]
            }
          ]
        },
        {
          name: "Long Essay Question",
          timeMinutes: 40,
          type: "frq",
          instructions: "Choose ONE of the following questions and write a well-organized essay.",
          frqPrompts: [
            {
              id: "leq-1",
              prompt: "Evaluate the extent to which economic factors were the primary cause of the American Revolution.\n\nOR\n\nEvaluate the extent to which economic factors were the primary cause of the Civil War.",
              type: "LEQ",
              points: 6,
              rubric: [
                "Thesis: 0-1 point",
                "Contextualization: 0-1 point",
                "Evidence: 0-2 points",
                "Analysis and Reasoning: 0-2 points"
              ]
            }
          ]
        }
      ]
    }
  ],
  "ap-seminar": [
    {
      id: 1,
      title: "AP Seminar EOC Practice",
      description: "End-of-Course exam practice with Part A and Part B",
      sections: [
        {
          name: "Part A: Source Analysis",
          timeMinutes: 30,
          type: "frq",
          instructions: "Read the following source and analyze its argument, evidence, and reasoning.",
          frqPrompts: [
            {
              id: "part-a-1",
              prompt: "Read the source below and complete the following tasks:\n1. Identify the author's main argument or claim.\n2. Analyze the evidence the author uses to support this claim.\n3. Evaluate the strength of the author's reasoning.",
              type: "Part A Analysis",
              points: 5,
              rubric: [
                "Argument Identification: Accurately identifies thesis",
                "Evidence Analysis: Examines types and quality of evidence",
                "Reasoning Evaluation: Assesses logical connections and limitations"
              ],
              sources: [
                {
                  id: "source-1",
                  title: "Source for Analysis",
                  content: "Dr. Sarah Chen, 'The Automation Paradox,' MIT Technology Review, 2024:\n\nThe conventional wisdom about automation displacing workers may have it backwards. Historical evidence suggests that technological advancement creates more jobs than it destroys—but the jobs created differ fundamentally from those eliminated.\n\nConsider the ATM. When introduced in the 1970s, analysts predicted the elimination of bank teller positions. Instead, by reducing the cost per branch, ATMs allowed banks to open more locations, increasing overall teller employment by 10% between 1980 and 2010. Tellers shifted from transaction processing to relationship banking—a more complex, harder-to-automate role.\n\nSimilar patterns emerged with computer-assisted design (CAD) software. Rather than eliminating drafting positions, CAD made design iteration faster and cheaper, expanding the design industry's total output and employment.\n\nHowever, these optimistic examples carry an important caveat: the transition period matters enormously. Workers displaced from routine tasks cannot immediately transition to complex analytical roles. A 55-year-old machinist cannot simply become a CNC programmer without significant retraining and support.\n\nPolicy responses must therefore focus not on blocking automation—a futile effort—but on smoothing transitions. Extended unemployment insurance, portable benefits, and universal retraining programs can help workers navigate displacement. The question is not whether automation will transform work, but whether we will manage that transformation humanely."
                }
              ]
            }
          ]
        },
        {
          name: "Part B: Constructing an Argument",
          timeMinutes: 90,
          type: "frq",
          instructions: "Using the four sources provided, construct an argument addressing the given research question. Your argument should demonstrate understanding of multiple perspectives and synthesize evidence from the sources.",
          frqPrompts: [
            {
              id: "part-b-1",
              prompt: "Research Question: To what extent should governments invest in space exploration given competing priorities for public funding?\n\nConstruct a well-reasoned argument that addresses this question. Use evidence from all four sources to support your argument while demonstrating understanding of multiple perspectives on the issue.",
              type: "Part B Argument",
              points: 5,
              rubric: [
                "Thesis: Clear, defensible argument",
                "Evidence Integration: Effective use of all four sources",
                "Multiple Perspectives: Acknowledges and responds to different viewpoints",
                "Reasoning: Logical connections between claims and evidence",
                "Complexity: Nuanced understanding of the issue"
              ],
              sources: [
                {
                  id: "source-b1",
                  title: "Source 1: Economic Analysis",
                  content: "NASA Economic Impact Report, 2023:\n\nFor every dollar invested in NASA, approximately $7-14 returns to the U.S. economy through technological spinoffs, job creation, and industry development. The space program has produced over 2,000 commercial products including memory foam, water purification systems, and miniaturized electronics.\n\nHowever, opportunity costs must be considered. The James Webb Space Telescope cost $10 billion over its development. The same investment in direct infrastructure—roads, bridges, broadband—might produce higher immediate returns for more citizens."
                },
                {
                  id: "source-b2",
                  title: "Source 2: Scientific Perspective",
                  content: "Dr. Maria Rodriguez, astrophysicist, testimony before Congress, 2024:\n\n'Space exploration addresses fundamental questions about humanity's place in the universe. But more practically, Earth-observing satellites are essential for climate monitoring, disaster response, and agricultural planning. Our understanding of climate change depends on NASA data.\n\nCritics who argue we should solve Earth's problems before exploring space miss this point: space exploration helps us solve Earth's problems. The overview effect—seeing Earth from space—fundamentally changed how we understand our planet's fragility.'"
                },
                {
                  id: "source-b3",
                  title: "Source 3: Critique",
                  content: "Professor James Thompson, public policy analyst, 2024:\n\n'Space exploration captures public imagination precisely because it is spectacular—rockets, astronauts, distant worlds. But spectacular is not synonymous with urgent. For the cost of one Mars mission, we could provide clean water to every person on Earth who currently lacks it.\n\nProponents cite spinoffs, but this is an inefficient way to develop technology. If we want water purification systems, fund water purification research directly. The argument that space exploration indirectly benefits humanity is an argument for anything that might accidentally produce useful knowledge.'"
                },
                {
                  id: "source-b4",
                  title: "Source 4: Strategic Analysis",
                  content: "Foreign Affairs journal, 'The New Space Race,' 2024:\n\n'China's space program has achieved rapid advances: lunar sample returns, a permanent space station, and plans for crewed lunar missions by 2030. Russia and India are expanding capabilities. Private companies like SpaceX have reduced launch costs by 90%.\n\nThe strategic implications are significant. Satellites are essential for military communications, surveillance, and navigation. Nations that fall behind in space technology may find themselves at a strategic disadvantage.\n\nMoreover, space resources—asteroid mining, lunar helium-3—may become economically significant. Early investment in space infrastructure could provide enormous advantages to leading nations.'"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
