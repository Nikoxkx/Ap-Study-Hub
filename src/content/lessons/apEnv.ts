import { section } from "./build";
import type { Lesson } from "./types";

/** Current College Board framework: nine units, 80 multiple-choice questions, and three free-response questions. */
export const apEnvLessons: Lesson[] = [
  {
    unitNumber: 1,
    title: "Unit 1 · The living world: ecosystems",
    description: "Trace energy and matter through ecosystems: species interactions, biomes, biogeochemical cycles, and the productivity that supports every food web.",
    examWeight: "6–8% of multiple-choice weighting",
    objectives: [
      "Explain how species interactions and resource partitioning shape community structure.",
      "Compare terrestrial and aquatic biomes using temperature, precipitation, and productivity.",
      "Trace carbon, nitrogen, phosphorus, and water through their reservoirs and fluxes.",
    ],
    sections: [
      section("Species interactions structure communities", ["cb-env-ced", "openstax-biology"], `
Species in a community interact as competitors, predators and prey, mutualists, commensals, and parasites, and each relationship distributes energy and limits population sizes. Predation can keep prey populations below what resources alone would allow, while mutualisms such as pollination link the survival of species that never eat each other. The exam favors examples, so attach each interaction type to a concrete pair of organisms.

When two species need the same limited resource, **competitive exclusion** can eliminate the weaker competitor locally. Species avoid that outcome through **resource partitioning**, dividing resources by time, space, or form, as when warbler species feed at different heights in the same tree. Partitioning is evidence of past competition that natural selection has softened into coexistence.
`),
      section("Biomes: climate written in vegetation", ["cb-env-ced", "openstax-biology"], `
Terrestrial biomes are classified by temperature and precipitation, which together determine the growing season and the plant forms that dominate. Tropical rainforests combine warmth and year-round rain into the highest terrestrial productivity and species richness, while deserts, limited by water rather than temperature, support sparse, water-conserving life. Tundra is limited instead by cold and a short thaw, storing carbon in permafrost soils.

Aquatic biomes are organized by light, depth, and salinity. The photic zone supports photosynthesis, so coastal and shallow waters with nutrient inputs, such as estuaries and coral reefs, are disproportionately productive and biodiverse. Open-ocean water is a biological desert by comparison, clear and nutrient-poor despite its enormous volume, a contrast exam questions test with productivity data.
`),
      section("Biogeochemical cycles move matter", ["cb-env-ced", "usgs-water"], `
The carbon cycle moves carbon among the atmosphere, oceans, biosphere, and geological reservoirs through photosynthesis, respiration, decomposition, combustion, and sedimentation. Fast biological exchanges balance each other in an undisturbed system, while fossil-fuel combustion adds geologically stored carbon to the air faster than sinks absorb it. Oceans are the largest active reservoir and buffer atmospheric change at the cost of acidification.

Nitrogen and phosphorus cycles differ in ways the exam loves. Nitrogen gas is abundant but unusable until fixation by bacteria, lightning, or industry converts it to ammonia and nitrates. Phosphorus has no significant atmospheric phase; it weathers from rock, moves through food webs, and settles into sediments, which is why it so often limits freshwater productivity and why runoff triggers algal blooms.
`),
      section("Energy flow and the 10% rule", ["cb-env-ced", "openstax-biology"], `
Energy enters most ecosystems as sunlight captured by producers. **Gross primary productivity** is the total captured; **net primary productivity** subtracts what producers burn in respiration and is the energy actually available to consumers and decomposers. NPP, measured per area per year, is the single best summary of how much life an ecosystem can support.

Only about ten percent of energy at one trophic level becomes biomass at the next, because most is lost to respiration heat, waste, and uneaten material. This **10% rule** explains why food chains are short, why top predators are rare, and why eating lower on the food chain supports more people per hectare. Calculations usually give an efficiency and ask for energy at a higher level, so work the percentages level by level.
`),
      section("How Unit 1 is tested", ["cb-env-ced", "cb-env-exam", "cb-env-frq"], `
Unit 1 questions pair definitions with data: a productivity table to rank biomes, a cycle diagram with one flux to identify, or a species-interaction scenario to classify. The calculation staple is trophic transfer: given producer energy and a transfer efficiency, compute what reaches a named consumer level, showing each ten-percent step rather than guessing a single jump.

Free-response questions often open with a Unit 1 setup, an ecosystem described in a paragraph, before moving to pollution or policy in later parts. Underline the organisms, the interaction, and any cycle named in the prompt; the first points usually reward accurate identification before the question asks you to predict a change.
`),
    ],
    glossary: [
      { term: "Net primary productivity", definition: "Gross primary productivity minus producer respiration; the energy available to consumers in an ecosystem." },
      { term: "Resource partitioning", definition: "The division of a shared resource by time, space, or form that reduces competition between species." },
      { term: "10% rule", definition: "The approximation that about one-tenth of energy at one trophic level becomes biomass at the next." },
      { term: "Biome", definition: "A large region classified by climate and the dominant plant and animal life it supports." },
    ],
    examAlignment: {
      title: "Ecosystem processes with named examples",
      description: "The opening unit supplies the cycle diagrams, biome logic, and energy arithmetic used across the exam.",
      criteria: [
        "Attach every interaction type to a specific pair of organisms rather than defining it abstractly.",
        "Rank biomes by productivity using temperature, precipitation, and nutrient evidence.",
        "Show each trophic-transfer step when applying the 10% rule to a calculation.",
      ],
      sources: ["cb-env-ced", "cb-env-exam", "cb-env-frq"],
    },
    practice: [
      {
        question: "Producers in a grassland fix 20,000 kcal/m²/yr. Using the 10% rule, approximately how much energy is available to secondary consumers?",
        options: ["20 kcal/m²/yr", "200 kcal/m²/yr", "2,000 kcal/m²/yr", "18,000 kcal/m²/yr"],
        correctIndex: 1,
        explanation: "Primary consumers get about 10% of 20,000 = 2,000; secondary consumers get about 10% of that = 200 kcal/m²/yr.",
        skill: "Trophic energy calculation",
      },
      {
        question: "Which statement correctly distinguishes the nitrogen and phosphorus cycles?",
        options: ["Phosphorus has a major atmospheric reservoir; nitrogen does not.", "Nitrogen must be fixed before most organisms can use it; phosphorus cycles mainly through rock, water, and sediments.", "Both cycles are driven by combustion of fossil fuels.", "Nitrogen is usually the limiting nutrient in oceans because it cannot be fixed."],
        correctIndex: 1,
        explanation: "Nitrogen gas is unusable until fixation converts it. Phosphorus lacks a significant gaseous phase and weathers from rock, often limiting freshwater systems.",
        skill: "Biogeochemical cycles",
      },
      {
        question: "A wetland has gross primary productivity of \\(2{,}000\\ \\mathrm{kcal\\,m^{-2}\\,yr^{-1}}\\) and producer respiration of \\(1{,}200\\ \\mathrm{kcal\\,m^{-2}\\,yr^{-1}}\\). Its net primary productivity is",
        options: ["\\(3{,}200\\ \\mathrm{kcal\\,m^{-2}\\,yr^{-1}}\\)", "\\(800\\ \\mathrm{kcal\\,m^{-2}\\,yr^{-1}}\\)", "\\(1{,}200\\ \\mathrm{kcal\\,m^{-2}\\,yr^{-1}}\\)", "\\(2{,}000\\ \\mathrm{kcal\\,m^{-2}\\,yr^{-1}}\\)"],
        correctIndex: 1,
        explanation: "Net primary productivity equals gross primary productivity minus respiration: \\(\\mathrm{NPP}=\\mathrm{GPP}-\\mathrm{R}=2{,}000-1{,}200=800\\ \\mathrm{kcal\\,m^{-2}\\,yr^{-1}}\\), which is the energy left available to consumers.",
        skill: "Productivity calculation",
      },
      {
        question: "The largest actively exchanging reservoir of carbon in the carbon cycle is",
        options: ["The atmosphere", "Terrestrial vegetation", "The oceans", "Fossil fuel deposits"],
        correctIndex: 2,
        explanation: "Oceans hold far more carbon than the atmosphere or land vegetation and exchange it continuously, buffering atmospheric change.",
        skill: "Carbon cycle",
      },
    ],
  },
  {
    unitNumber: 2,
    title: "Unit 2 · The living world: biodiversity",
    description: "Measure diversity at genetic, species, and ecosystem levels, value what ecosystems provide for free, and explain island biogeography, specialization, and disturbance.",
    examWeight: "6–8% of multiple-choice weighting",
    objectives: [
      "Distinguish genetic, species, and ecosystem diversity and explain why each supports resilience.",
      "Describe the four categories of ecosystem services with concrete examples.",
      "Use island biogeography to predict species richness from island size and distance.",
    ],
    sections: [
      section("Three levels of biodiversity", ["cb-env-ced", "openstax-biology"], `
**Biodiversity** exists at three nested levels. Genetic diversity is the variety of alleles within a population, the raw material for adaptation when conditions change. Species diversity combines richness, the number of species, with evenness, how balanced their abundances are. Ecosystem diversity is the variety of habitats and communities across a landscape, which shelters species that need different conditions at different life stages.

Diverse systems are generally more resilient because functionally similar species can compensate when one declines, an insurance effect visible in grassland drought experiments. Low genetic diversity creates the opposite risk: genetically uniform crops and cheetah populations share susceptibility to a single disease or environmental shift. Exam questions often give two communities' species counts and abundances and ask which is more diverse, which requires weighing evenness as well as richness.
`),
      section("Ecosystem services: nature's unpaid work", ["cb-env-ced", "epa-topics"], `
Ecosystems provide **provisioning services** such as food, timber, and fresh water; **regulating services** such as pollination, flood control, water purification, and carbon storage; **cultural services** such as recreation and spiritual value; and **supporting services** such as soil formation and nutrient cycling that make the others possible. Wetlands are the standard example because one system visibly delivers several categories at once.

These services have economic value precisely because replacing them costs money: a city can protect a watershed forest or build a filtration plant instead. When a free-response question asks for an economic benefit of conservation, name a specific service, the human beneficiary, and the replacement cost avoided, rather than writing that biodiversity is valuable in general terms.
`),
      section("Island biogeography", ["cb-env-ced", "openstax-biology"], `
The theory of **island biogeography** holds that species richness on an island reflects a balance between immigration and extinction. Large islands support more species because they offer more habitats and larger populations that resist extinction. Near islands receive more immigrants than distant ones. The richest islands are therefore large and near a mainland source; the poorest are small and far.

The model extends beyond literal islands to habitat fragments: a forest patch in farmland behaves like an island in a hostile sea. Conservation design uses the theory directly, favoring large, connected reserves over small isolated ones and using corridors to raise the effective immigration between fragments. Exam graphs typically plot immigration and extinction curves and ask where equilibrium richness falls as size or distance changes.
`),
      section("Specialists, generalists, and disturbance", ["cb-env-ced", "epa-topics"], `
**Specialist** species use a narrow niche, like pandas eating bamboo, and excel under stable conditions but collapse when their one resource changes. **Generalists**, like raccoons and cockroaches, tolerate wide conditions and shifting diets, so they dominate disturbed and human-altered habitats. Invasive species are usually generalists with no local predators, which is why they spread so aggressively.

Disturbances such as fire, flood, and storms reset succession and, at intermediate frequency and intensity, can maximize diversity by preventing competitive dominants from excluding everyone else. Ecosystems respond through resistance, staying unchanged, or resilience, recovering after change. The exam tests whether you can predict which species traits win under a stated disturbance regime rather than labeling disturbance simply good or bad.
`),
      section("How Unit 2 is tested", ["cb-env-ced", "cb-env-exam", "cb-env-frq"], `
Expect data-based multiple choice: species abundance tables for a diversity judgment, island diagrams for a richness ranking, and a development scenario asking which fragment design best conserves species. The vocabulary is precise: richness is not diversity, a provisioning service is not a regulating one, and habitat fragmentation is not the same process as habitat destruction outright.

Free-response connections run forward to Unit 9, where biodiversity loss is tallied as a global-change outcome. When a prompt asks why losing one species matters, answer at the level the question sets: genetic, species, or ecosystem, and name the service or food-web role that disappears with it.
`),
    ],
    glossary: [
      { term: "Species richness", definition: "The number of different species in a community; one component of species diversity alongside evenness." },
      { term: "Ecosystem services", definition: "Benefits humans obtain from ecosystems, grouped as provisioning, regulating, cultural, and supporting." },
      { term: "Island biogeography", definition: "The theory that island species richness balances immigration and extinction rates set by island size and isolation." },
      { term: "Specialist species", definition: "A species with a narrow niche that thrives under stable conditions but is vulnerable to change." },
    ],
    examAlignment: {
      title: "Diversity measured, valued, and mapped",
      description: "Unit 2 turns biodiversity from a slogan into counts, services, and spatial predictions.",
      criteria: [
        "Judge diversity using both richness and evenness when abundance data are given.",
        "Classify an ecosystem service into the correct category and name its human beneficiary.",
        "Predict richness changes from island area and distance using immigration–extinction balance.",
      ],
      sources: ["cb-env-ced", "cb-env-exam", "cb-env-frq"],
    },
    practice: [
      {
        question: "Community A has 5 species with abundances 20, 20, 20, 20, 20. Community B has 5 species with abundances 92, 2, 2, 2, 2. Which is more diverse and why?",
        options: ["B, because it has a dominant species.", "A, because equal richness with greater evenness means higher diversity.", "They are equally diverse because richness is identical.", "B, because total abundance is higher."],
        correctIndex: 1,
        explanation: "Both have richness 5, but A's abundances are perfectly even while B is dominated by one species. Diversity incorporates evenness, so A is more diverse.",
        skill: "Diversity data analysis",
      },
      {
        question: "A mangrove swamp filters sediment, shelters juvenile fish, and protects a town from storm surge. These are primarily examples of:",
        options: ["Provisioning services only.", "Regulating and supporting services that also underpin a provisioning fishery.", "Cultural services.", "Abiotic factors with no economic relevance."],
        correctIndex: 1,
        explanation: "Water filtration and storm protection are regulating services; nursery habitat is a supporting service that sustains the provisioning service of fisheries.",
        skill: "Ecosystem services",
      },
      {
        question: "Which trait most helps an invasive species outcompete native species in a disturbed habitat?",
        options: ["A narrow specialist diet", "Generalist feeding and rapid reproduction with few local predators", "A very long generation time", "Dependence on a single host species"],
        correctIndex: 1,
        explanation: "Generalists tolerate varied conditions and reproduce quickly, and release from natural enemies lets their populations explode.",
        skill: "Invasive species",
      },
      {
        question: "Sea otters keep sea urchin populations in check, preventing urchins from destroying kelp forests. The otter is best described as a",
        options: ["Keystone species whose impact is disproportionate to its abundance", "Foundation species that builds the habitat structure", "Apex predator with no ecological role beyond predation", "Indicator species used only for monitoring"],
        correctIndex: 0,
        explanation: "Keystone species have effects on community structure far larger than their numbers suggest; removing otters collapses the kelp system.",
        skill: "Keystone species",
      },
    ],
  },
  {
    unitNumber: 3,
    title: "Unit 3 · Populations",
    description: "Model how populations grow, crash, and stabilize, and apply the same mathematics to human demography: age structure, fertility, and the demographic transition.",
    examWeight: "10–15% of multiple-choice weighting",
    objectives: [
      "Compare exponential and logistic growth and interpret carrying capacity and survivorship curves.",
      "Read age-structure diagrams to predict future growth or decline.",
      "Calculate growth rates, doubling time with the rule of 70, and describe the demographic transition.",
    ],
    sections: [
      section("Population growth models", ["cb-env-ced", "openstax-biology"], `
A population grows exponentially when resources are unlimited: the growth rate stays constant, numbers multiply, and the curve bends upward in the classic J shape. Real populations meet limits. In the **logistic model**, growth slows as the population approaches the environment's **carrying capacity (K)**, producing an S-shaped curve as competition, predation, disease, and waste accumulation bite harder at higher density.

Populations can overshoot K when resource depletion lags behind reproduction, then crash below it, sometimes oscillating as predator and prey numbers chase each other with a time delay. Density-dependent factors, like disease and competition, intensify with crowding, while density-independent factors, like a flood or freeze, kill regardless of density. Classifying a stated limiting factor correctly is a perennial multiple-choice task.
`),
      section("Life histories and survivorship", ["cb-env-ced", "openstax-biology"], `
Species allocate reproduction along a spectrum. **r-selected** species, like insects and many fish, produce many small offspring with little care, exploiting unstable environments where most young die. **K-selected** species, like elephants and humans, produce few offspring with heavy investment, competing well near carrying capacity. Most species fall between the extremes, and exam questions ask you to place an organism from its described traits.

Survivorship curves summarize the same trade-off. Type I species (humans) survive well until old age; Type II (many birds) face constant mortality risk; Type III (oysters, trees) lose most young early, with rare survivors living long. A curve's shape lets you infer parental care and reproductive strategy without being told either.
`),
      section("Human population: age structure and fertility", ["cb-env-ced", "epa-topics"], `
Human demography runs on births, deaths, and migration. The **total fertility rate** is the average number of children a woman has in her lifetime; replacement level is about 2.1 in countries with low infant mortality. Even after fertility falls to replacement, a young age structure keeps population growing for decades, a momentum effect visible in age-structure diagrams.

Age-structure diagrams plot males and females by age cohort. A broad-based pyramid signals rapid future growth, a column signals stability, and a narrow base below wider middle cohorts signals coming decline and an aging population with more dependents per worker. The exam asks you to predict, from a diagram's shape alone, future demand for schools versus elder care and the direction of population change.
`),
      section("The demographic transition and growth math", ["cb-env-ced", "cb-env-exam"], `
The **demographic transition** describes four stages as societies industrialize: high birth and death rates with slow growth; falling death rates with continued high births causing rapid growth; falling birth rates slowing growth; and low birth and death rates stabilizing population. The rapid-growth stage is a gap between mortality decline, which comes first through sanitation and medicine, and fertility decline, which follows education, urbanization, and contraception access.

The arithmetic is compact but heavily tested. Percent growth rate is (births minus deaths, per thousand) divided by ten, and doubling time is **70 divided by the percent growth rate**. A country growing at 2 percent per year doubles in about 35 years. Show the formula, keep per-thousand and percent straight, and state whether migration is included before calculating.
`),
      section("How Unit 3 is tested", ["cb-env-ced", "cb-env-exam", "cb-env-frq"], `
This is a calculation-heavy unit. Multiple choice asks for doubling times, growth rates from crude birth and death rates, and the stage of demographic transition matching a described country. Graph questions use survivorship and age-structure shapes as data, so practice reading the axes before interpreting any story attached to them.

Free-response quantitative questions (the third FRQ is calculation-focused) frequently build a chain: compute a growth rate, then a doubling time, then project a population or resource demand. Write each step with units and round sensibly; a correct method with one arithmetic slip usually still earns most of the available points, while an unsupported number earns none.
`),
    ],
    glossary: [
      { term: "Carrying capacity", definition: "The maximum population size an environment can sustain over time given available resources." },
      { term: "Rule of 70", definition: "Doubling time in years equals 70 divided by the percent annual growth rate." },
      { term: "Total fertility rate", definition: "The average number of children born to a woman over her lifetime in a population." },
      { term: "Demographic transition", definition: "The shift from high birth and death rates to low ones as a society industrializes, with rapid growth in between." },
    ],
    examAlignment: {
      title: "Growth mathematics and demographic reading",
      description: "Unit 3 supplies the population models and formulas behind the exam's quantitative free-response question.",
      criteria: [
        "Choose exponential or logistic language to match whether the scenario names a resource limit.",
        "Infer growth, stability, or decline from an age-structure diagram's base relative to its middle.",
        "Apply the rule of 70 and percent-change formulas with units shown at every step.",
      ],
      sources: ["cb-env-ced", "cb-env-exam", "cb-env-frq"],
    },
    practice: [
      {
        question: "A country has a crude birth rate of 18 per 1,000 and a crude death rate of 8 per 1,000, with no net migration. Its doubling time is approximately:",
        options: ["7 years", "10 years", "70 years", "700 years"],
        correctIndex: 2,
        explanation: "Growth rate = (18 − 8)/10 = 1.0% per year. Doubling time = 70/1.0 = 70 years.",
        skill: "Doubling-time calculation",
      },
      {
        question: "An age-structure diagram with a base narrower than its middle-aged cohorts most likely predicts:",
        options: ["Rapid population growth and rising school enrollment.", "Future population decline and a rising share of elderly dependents.", "A population exactly at carrying capacity.", "High infant mortality with a Type III survivorship pattern."],
        correctIndex: 1,
        explanation: "Fewer young people than middle-aged adults means smaller cohorts will replace larger ones, so the population shrinks and ages.",
        skill: "Age-structure interpretation",
      },
      {
        question: "A species of fish produces thousands of tiny eggs with no parental care, and nearly all offspring die within days. Its survivorship curve is",
        options: ["Type I", "Type II", "Type III", "Type IV"],
        correctIndex: 2,
        explanation: "Type III curves show very high early mortality with few survivors living long, typical of r-selected species with minimal parental investment.",
        skill: "Survivorship curves",
      },
      {
        question: "A town's population grows from \\(50{,}000\\) to \\(51{,}000\\) in one year with no net migration. Its percent growth rate is",
        options: ["\\(1\\%\\)", "\\(2\\%\\)", "\\(0.2\\%\\)", "\\(20\\%\\)"],
        correctIndex: 1,
        explanation: "The percent growth rate is the change in population divided by the starting population, multiplied by one hundred: \\(\\frac{51{,}000-50{,}000}{50{,}000}\\times 100\\%=2\\%\\) per year.",
        skill: "Growth rate calculation",
      },
    ],
  },
  {
    unitNumber: 4,
    title: "Unit 4 · Earth systems and resources",
    description: "Read the planet's machinery: plate tectonics, soil formation and texture, the atmosphere's layers, watersheds, and the solar geometry behind seasons and El Niño.",
    examWeight: "10–15% of multiple-choice weighting",
    objectives: [
      "Connect plate boundaries to earthquakes, volcanoes, and mountain building.",
      "Analyze soil horizons and use the soil texture triangle to classify a sample.",
      "Explain atmospheric structure, watersheds, and how Earth's tilt and ocean circulation pattern climate events.",
    ],
    sections: [
      section("Plate tectonics shapes the map", ["cb-env-ced", "usgs-water"], `
Earth's lithosphere is broken into plates moving over the ductile asthenosphere, driven by mantle convection, slab pull, and ridge push. At **divergent boundaries** plates separate and new crust forms at mid-ocean ridges and rift valleys. At **convergent boundaries** the denser plate subducts, producing deep trenches, volcanic arcs, and the largest earthquakes; where two continental plates collide, crust crumples into ranges like the Himalayas instead.

**Transform boundaries** slide plates horizontally, storing and releasing strain as earthquakes without creating or destroying crust, as along the San Andreas Fault. The practical exam skill is locational: given a map or a description of volcanism, trench depth, or earthquake pattern, name the boundary type and the direction of movement that explains it.
`),
      section("Soil: horizons, texture, and fertility", ["cb-env-ced", "epa-topics"], `
Soil forms as parent rock weathers and organisms add organic matter, developing horizons: the organic O layer, topsoil A rich in humus and nutrients, a leached E in some forests, the mineral-accumulating B, weathered parent material C, and bedrock R. Erosion that strips the A horizon removes centuries of formation in a season, which is why soil is treated as effectively nonrenewable on human timescales.

Texture, the proportions of sand, silt, and clay, controls water holding, permeability, and nutrient retention. Sand drains fast and holds few nutrients; clay holds water and nutrients tightly but drains poorly and compacts; loam balances the three and farms best. The soil texture triangle is a guaranteed graph skill: plot percent sand against percent clay, read silt by difference, and name the texture class where the lines cross.
`),
      section("Atmosphere and watersheds", ["cb-env-ced", "noaa-climate"], `
The atmosphere is layered by temperature trend: the troposphere, where weather happens and temperature falls with altitude; the stratosphere, warmed by the ozone layer absorbing ultraviolet radiation; then the mesosphere and thermosphere. Knowing which layer hosts the ozone shield matters because Unit 9 contrasts stratospheric ozone protection with ground-level ozone pollution in the troposphere.

A **watershed** is the land area draining to a common outlet, bounded by ridges of high ground. Everything applied within it, fertilizer, road salt, spilled oil, can travel downhill to the same stream, which is why water management is organized by watershed rather than by political boundary. Exam maps ask you to trace which of several sites shares a watershed with a given point, using elevation and stream direction.
`),
      section("Solar geometry, seasons, and El Niño", ["cb-env-ced", "noaa-climate"], `
Earth's 23.5-degree axial tilt, not its distance from the sun, causes seasons by changing the angle and duration of sunlight each hemisphere receives. Solar intensity is greatest where rays strike perpendicular to the surface, near the equator and at each hemisphere's summer solstice, and this uneven heating drives atmospheric circulation cells, prevailing winds, and the rain shadows that sit behind mountain ranges.

**El Niño** begins when Pacific trade winds weaken and warm surface water sloshes east toward South America, suppressing the nutrient-rich upwelling that feeds Peruvian fisheries. The shifted convection rearranges rainfall worldwide: drought in Australia and Indonesia, flooding in western South America and the southern United States. Its cold counterpart, La Niña, strengthens the usual pattern. Questions give a weather anomaly map and ask you to name the phase and the wind change behind it.
`),
      section("How Unit 4 is tested", ["cb-env-ced", "cb-env-exam", "cb-env-frq"], `
Unit 4 is the exam's spatial-reasoning unit: tectonic maps, the soil texture triangle, watershed diagrams, and sunlight-angle figures. The common error is answering from the story instead of the figure. Read axes, legends, and elevation cues first; the correct choice is usually the one the diagram directly supports.

Free-response questions use Unit 4 as the physical setup for later impacts: soil that erodes under a farming practice, a watershed carrying a pollutant, a coastal city in an El Niño year. Identify the Earth-system mechanism in one precise sentence before calculating or proposing anything, because that identification is typically its own point.
`),
    ],
    glossary: [
      { term: "Subduction", definition: "The process by which one tectonic plate sinks beneath another at a convergent boundary." },
      { term: "Soil texture triangle", definition: "A diagram that classifies soil from its percentages of sand, silt, and clay." },
      { term: "Watershed", definition: "The land area that drains precipitation and runoff to a common body of water." },
      { term: "El Niño", definition: "A Pacific climate pattern from weakened trade winds and warm eastern surface water, shifting global rainfall." },
    ],
    examAlignment: {
      title: "Earth-system diagrams read literally",
      description: "Unit 4 tests whether physical mechanisms can be read off maps, triangles, and cross-sections.",
      criteria: [
        "Infer boundary type from the pattern of trenches, volcanoes, and earthquakes shown.",
        "Classify a soil from sand–silt–clay percentages and state one agricultural implication.",
        "Trace drainage within a watershed and name the wind change behind an El Niño or La Niña pattern.",
      ],
      sources: ["cb-env-ced", "cb-env-exam", "cb-env-frq"],
    },
    practice: [
      {
        question: "A soil sample is 40% sand, 40% silt, and 20% clay. Using the soil texture triangle, it is classified as:",
        options: ["Sandy clay", "Loam", "Silty clay loam", "Sand"],
        correctIndex: 1,
        explanation: "Roughly equal sand and silt with about 20% clay falls in the central loam region of the triangle, the balanced texture preferred for agriculture.",
        skill: "Soil texture triangle",
      },
      {
        question: "A deep ocean trench with a parallel chain of volcanic islands most likely marks:",
        options: ["A divergent boundary where new crust forms.", "A transform boundary sliding horizontally.", "A convergent boundary where an oceanic plate subducts.", "A watershed divide between two drainage basins."],
        correctIndex: 2,
        explanation: "Subduction of oceanic lithosphere creates both the trench and the volcanic island arc from melting mantle above the sinking slab.",
        skill: "Plate boundary identification",
      },
      {
        question: "A soil with very high clay content is most likely to have",
        options: ["Excellent drainage and low nutrient holding", "High water and nutrient holding but poor drainage and aeration", "No effect on plant growth", "A pH near zero at all times"],
        correctIndex: 1,
        explanation: "Clay particles are tiny and charged, holding water and nutrient cations tightly, but the small pore spaces drain slowly and compact easily.",
        skill: "Soil properties",
      },
      {
        question: "Weather occurs in the troposphere, while the protective ozone layer is concentrated in the",
        options: ["Mesosphere", "Thermosphere", "Stratosphere", "Exosphere"],
        correctIndex: 2,
        explanation: "The stratosphere hosts the ozone layer that absorbs ultraviolet radiation; the troposphere below it contains nearly all weather.",
        skill: "Atmospheric layers",
      },
    ],
  },
  {
    unitNumber: 5,
    title: "Unit 5 · Land and water use",
    description: "Follow human claims on land and water: the tragedy of the commons, forestry and agriculture from Green Revolution to irrigation, mining, fishing, and cities.",
    examWeight: "6–8% of multiple-choice weighting",
    objectives: [
      "Apply the tragedy of the commons to shared resources and match remedies to the failure.",
      "Compare agricultural systems and irrigation methods by yield, water use, and environmental cost.",
      "Explain how mining, fishing pressure, and urban growth each degrade a named resource and how practice can reduce it.",
    ],
    sections: [
      section("The tragedy of the commons", ["cb-env-ced", "epa-topics"], `
Shared resources that no one owns and everyone can use, open-ocean fisheries, the atmosphere, public grazing land, tend toward overuse because each user captures the full benefit of taking more while the cost of depletion is spread across everyone. This is the **tragedy of the commons**, and it is a problem of incentives, not of careless people: restraint by one user simply leaves more for the next.

Remedies change the incentive structure: assign ownership or use rights, regulate harvest with enforceable quotas and seasons, price access, or manage the resource collectively with monitored rules. Free-response questions describe a depleted commons and ask for a solution; the scored move is naming the mechanism, privatization, regulation, or tradable permits, and explaining how it makes conservation pay for the individual user.
`),
      section("Forests, agriculture, and the Green Revolution", ["cb-env-ced", "epa-topics"], `
Forests are cleared for agriculture, timber, and settlement, and deforestation removes carbon storage, habitat, and the evapotranspiration that feeds regional rainfall. Sustainable forestry counters with selective cutting, replanting, and certification, though plantations of a single species store less carbon and shelter far less biodiversity than the primary forest they replace.

The **Green Revolution** spread high-yield crop varieties with synthetic fertilizer, pesticides, and irrigation, multiplying harvests and preventing famine for a growing population. Its costs are the through-line of this course: fertilizer runoff (Unit 8), aquifer depletion, pesticide resistance, salinized soil, and fields of genetically uniform crops. Industrial agriculture maximizes yield per hectare; sustainable methods, crop rotation, intercropping, contour plowing, integrated pest management, trade some peak yield for soil and water that last.
`),
      section("Irrigation, water scarcity, and aquifers", ["cb-env-ced", "usgs-water"], `
Agriculture takes roughly seventy percent of global freshwater withdrawals, and the irrigation method decides how much is lost. Flood and furrow irrigation can lose half its water to evaporation and runoff; sprinkler systems do better; **drip irrigation** delivers water to roots and can exceed ninety percent efficiency, at higher installation cost. Exam comparisons give efficiency percentages and ask which method conserves most or what volume a stated efficiency saves.

Groundwater mining compounds the problem. The Ogallala Aquifer under the Great Plains is being pumped far faster than it recharges, and falling water tables raise pumping costs until irrigation fails. Surface water has its own version: the Colorado River is allocated on paper beyond its average flow, so reservoirs shrink in dry decades. Scarcity questions reward naming whether a source is renewable on human timescales and matching the conservation method to the loss pathway.
`),
      section("Mining, fishing, and urban land", ["cb-env-ced", "epa-topics", "usgs-water"], `
Mining moves enormous volumes of earth for small concentrations of ore. Surface methods, strip mining and mountaintop removal, destroy habitat and bury streams, while underground mining endangers miners and leaves acid mine drainage that leaches metals into waterways for decades. The useful life-cycle idea: impacts occur at extraction, processing, use, and disposal, not only at the mine mouth.

Fisheries show the commons at sea. Industrial fleets with sonar and factory processing can hold catches high while the stock collapses, the pattern behind the 1992 Newfoundland cod moratorium. Trawling also destroys seafloor habitat, and bycatch kills non-target species. Remedies mirror the commons solutions: catch limits set from stock assessments, marine protected areas, and gear rules. Urbanization adds impervious surfaces that speed runoff and flooding, plus heat-island effects, each a land-use choice with a water consequence.
`),
      section("How Unit 5 is tested", ["cb-env-ced", "cb-env-exam", "cb-env-frq"], `
Unit 5 scenarios are management problems: a fishery declining, a farm losing soil, a city flooding. Multiple choice asks which practice best reduces the named harm, so match the fix to the mechanism: cover crops against erosion, drip lines against evaporation loss, catch shares against the race to fish. Generic answers like 'use less water' lose to the option that targets the actual pathway.

The unit's one calculation family is efficiency: water delivered versus water applied, or land required at a stated yield. As always, show the ratio, multiply by one hundred for a percentage, and check whether the question wants water saved, water used, or water lost, three numbers students routinely swap.
`),
    ],
    glossary: [
      { term: "Tragedy of the commons", definition: "The overuse of a shared, unowned resource because users capture the benefits while sharing the costs of depletion." },
      { term: "Green Revolution", definition: "The mid-1900s spread of high-yield crops with fertilizer, pesticides, and irrigation that sharply raised harvests." },
      { term: "Drip irrigation", definition: "Delivering water slowly to plant roots through lines or emitters, minimizing evaporation and runoff losses." },
      { term: "Bycatch", definition: "Non-target species caught and often killed unintentionally during fishing operations." },
    ],
    examAlignment: {
      title: "Management fixes matched to mechanisms",
      description: "Unit 5 asks which practice repairs which resource failure, and at what efficiency.",
      criteria: [
        "Name the incentive failure in a commons scenario and the remedy class that corrects it.",
        "Compare irrigation and farming methods by efficiency and by the specific harm each creates.",
        "Calculate water saved or lost from a stated efficiency without swapping the two quantities.",
      ],
      sources: ["cb-env-ced", "cb-env-exam", "cb-env-frq"],
    },
    practice: [
      {
        question: "A farmer applies 1,000 liters of irrigation water; crops actually use 550 liters with furrow irrigation and 920 liters after switching to drip. The switch saves approximately how much water per 1,000 liters applied?",
        options: ["80 liters", "370 liters", "450 liters", "920 liters"],
        correctIndex: 1,
        explanation: "Water used by crops rises from 550 to 920 liters per 1,000 applied, so losses fall by 920 − 550 = 370 liters per 1,000 liters applied.",
        skill: "Irrigation efficiency calculation",
      },
      {
        question: "Which policy most directly addresses the tragedy of the commons in an open-access fishery?",
        options: ["Subsidizing larger fishing vessels.", "Setting an enforceable total catch limit divided among licensed fishers.", "Encouraging fishers to fish earlier in the season.", "Building more fish-processing plants on shore."],
        correctIndex: 1,
        explanation: "A capped, allocated catch removes the race to harvest before others do, aligning each fisher's incentive with conserving the stock.",
        skill: "Commons remedies",
      },
      {
        question: "Acid mine drainage most directly results from",
        options: ["Rain washing fertilizer off abandoned mines into rivers", "Exposure of sulfide minerals in mine waste to air and water, forming sulfuric acid that leaches metals", "Methane released from flooded mine shafts", "Saltwater intrusion into coastal mines"],
        correctIndex: 1,
        explanation: "Oxidation of sulfide ores produces acidic runoff that dissolves heavy metals, contaminating streams long after mining ends.",
        skill: "Mining impacts",
      },
      {
        question: "Integrated pest management (IPM) reduces pesticide use primarily by",
        options: ["Spraying stronger chemicals less often", "Combining monitoring, biological controls, and targeted chemicals only when pest thresholds are exceeded", "Releasing sterile pests in every field regardless of need", "Banning all pest control of any kind"],
        correctIndex: 1,
        explanation: "IPM uses pest counts, natural predators, crop rotation, and narrowly timed applications so chemicals become the last resort rather than the first.",
        skill: "Sustainable agriculture",
      },
    ],
  },
  {
    unitNumber: 6,
    title: "Unit 6 · Energy resources and consumption",
    description: "Compare every major energy source, renewable and not, and master the energy arithmetic: consumption trends, power plant efficiency, and cost per unit of electricity.",
    examWeight: "10–15% of multiple-choice weighting",
    objectives: [
      "Describe how fossil fuels form and how each is extracted, refined, and burned for electricity.",
      "Compare nuclear, solar, wind, hydro, geothermal, and biomass on mechanism, siting, and waste.",
      "Calculate energy use, efficiency losses, and electricity costs from stated rates and prices.",
    ],
    sections: [
      section("Fossil fuels: formation to combustion", ["cb-env-ced", "epa-topics"], `
Coal, oil, and natural gas are the compressed, heated remains of ancient organisms, which is why their carbon returns to the atmosphere as carbon dioxide when burned. Coal forms from swamp plants and is graded by carbon content from lignite to anthracite. Oil and gas form from marine plankton buried under sediment and are extracted by drilling, increasingly with hydraulic fracturing that cracks shale with pressurized fluid.

In a thermal power plant the chain is identical across fuels: burn fuel to boil water, spin a turbine with steam, and turn a generator. Only about thirty-five to forty percent of the fuel's energy becomes electricity; the rest leaves as waste heat, an efficiency ceiling the exam tests with input-output numbers. Natural gas burns cleaner than coal per unit of electricity, roughly half the carbon dioxide and far less sulfur and particulates, which explains its rise even as total fossil use persists.
`),
      section("Nuclear power and its waste problem", ["cb-env-ced", "epa-topics"], `
Nuclear plants split uranium-235 nuclei in a controlled chain reaction, using the released heat in the same steam-turbine chain as fossil plants, but with no combustion emissions during operation. Control rods absorb neutrons to regulate the reaction, and coolant carries heat away; the catastrophic failures at Three Mile Island, Chernobyl, and Fukushima were all, at root, losses of cooling followed by core damage.

The unresolved cost is waste. Spent fuel remains radioactive for thousands of years and is stored on site at most plants because permanent repositories face geological and political obstacles. Exam questions separate operation, which is carbon-free, from the fuel cycle, mining, enrichment, accident risk, and waste storage, and ask you to evaluate both halves rather than declaring nuclear simply clean or simply dangerous.
`),
      section("Renewables: solar, wind, hydro, geothermal, biomass", ["cb-env-ced", "noaa-climate"], `
Solar photovoltaic cells convert sunlight directly to electricity, while solar thermal systems concentrate heat. Wind turbines harvest moving air and now rank among the cheapest new electricity sources, but both solar and wind are **intermittent**, generating only when the sun shines or wind blows, which creates the storage and grid-balancing problem at the center of modern energy policy.

Hydroelectric dams deliver controllable, low-carbon power but flood valleys, block fish migration, and trap sediment. Geothermal taps Earth's internal heat where it nears the surface. Biomass burns recently living carbon, nominally carbon-neutral if regrown, though land and fertilizer inputs complicate the ledger. Hydrogen serves as an energy carrier rather than a source: it stores energy made elsewhere, often from natural gas or electrolysis. Match each source's siting constraint, desert sun, windy plains, tectonic margins, to the scenario given.
`),
      section("Energy trends and the arithmetic of use", ["cb-env-ced", "cb-env-exam"], `
Global energy use rises with population and income, and the mix shifts slowly because infrastructure lasts decades. Developed countries use far more energy per capita; efficiency standards for vehicles, buildings, and appliances flatten demand even as economies grow, while developing countries' consumption climbs with industrialization. Cogeneration, capturing waste heat for buildings or industry, raises a plant's total useful efficiency dramatically and appears whenever a question offers two outputs for one fuel input.

The calculations are unit gymnastics. Energy consumption equals power multiplied by time, so a 100-watt bulb for 10 hours uses one kilowatt-hour. Cost is kilowatt-hours multiplied by price per kilowatt-hour. Efficiency questions give energy in and useful energy out; percent efficiency is out divided by in times one hundred. Convert watts to kilowatts before multiplying, the single most common arithmetic error in this unit.
`),
      section("How Unit 6 is tested", ["cb-env-ced", "cb-env-exam", "cb-env-frq"], `
Energy is the most calculation-dense unit in the multiple-choice section and usually anchors the quantitative FRQ: a household's appliance use, a city's solar installation, a plant's fuel requirement at a stated efficiency. Build a unit chain for every problem, writing each conversion as a fraction that cancels, and the arithmetic becomes nearly self-checking.

Concept questions compare sources on a stated criterion: lowest carbon per kilowatt-hour, best for a landlocked cloudy region, safest waste profile. There is rarely a universally best source, and the exam knows it; the correct answer is the one whose siting and waste characteristics fit the scenario's constraints.
`),
    ],
    glossary: [
      { term: "Intermittent", definition: "Generating electricity only when natural conditions allow, as with solar at night or wind in calm weather." },
      { term: "Cogeneration", definition: "Producing both electricity and useful heat from one fuel input to raise total efficiency." },
      { term: "Kilowatt-hour", definition: "A unit of energy: one kilowatt of power sustained for one hour, the basis of electricity billing." },
      { term: "Hydraulic fracturing", definition: "Cracking underground rock with pressurized fluid to release oil and natural gas from shale." },
    ],
    examAlignment: {
      title: "Source comparison plus energy arithmetic",
      description: "Unit 6 weighs every source's mechanism and waste against scenario constraints, with kilowatt-hour math throughout.",
      criteria: [
        "Describe the steam-turbine chain once and apply it to coal, gas, nuclear, and geothermal alike.",
        "Match a renewable source to a site using its specific geographic or timing constraint.",
        "Convert watts, hours, and price into kilowatt-hours and cost with cancelling units shown.",
      ],
      sources: ["cb-env-ced", "cb-env-exam", "cb-env-frq"],
    },
    practice: [
      {
        question: "A 1,500 W space heater runs 6 hours per day for 30 days. At $0.12 per kWh, the monthly cost is:",
        options: ["$3.24", "$32.40", "$324.00", "$0.32"],
        correctIndex: 1,
        explanation: "1.5 kW × 6 h × 30 = 270 kWh. Cost = 270 × $0.12 = $32.40.",
        skill: "Electricity cost calculation",
      },
      {
        question: "Which pairing of energy source and siting constraint is correct?",
        options: ["Geothermal — requires a wide, slow river.", "Solar thermal — most effective in persistently cloudy northern regions.", "Wind — most productive where winds are strong and steady, such as coastal plains and passes.", "Hydroelectric — requires uranium deposits nearby."],
        correctIndex: 2,
        explanation: "Wind output depends on consistent wind resources. Geothermal needs near-surface heat, hydro needs flowing water and elevation change, and solar needs insolation.",
        skill: "Energy source siting",
      },
      {
        question: "A power plant takes in \\(100\\) units of fuel energy and produces \\(35\\) units of electricity. Its generation efficiency is",
        options: ["\\(65\\%\\)", "\\(35\\%\\)", "\\(3.5\\%\\)", "\\(135\\%\\)"],
        correctIndex: 1,
        explanation: "Efficiency \\(=\\frac{35}{100}\\times 100\\%=35\\%\\); the remaining energy leaves mostly as waste heat.",
        skill: "Efficiency calculation",
      },
      {
        question: "A photovoltaic panel differs from a solar water-heating system because the panel",
        options: ["Burns sunlight to boil water for a turbine", "Converts sunlight directly into electricity in semiconductor cells", "Stores sunlight as chemical fuel", "Must be installed on a roof to function"],
        correctIndex: 1,
        explanation: "Photovoltaics generate electric current directly from photons striking silicon, with no steam cycle or moving parts.",
        skill: "Solar energy",
      },
    ],
  },
  {
    unitNumber: 7,
    title: "Unit 7 · Atmospheric pollution",
    description: "Identify the criteria air pollutants and their sources, build photochemical smog step by step, and evaluate the controls, from catalytic converters to the Clean Air Act.",
    examWeight: "7–10% of multiple-choice weighting",
    objectives: [
      "Distinguish primary from secondary pollutants and name a source for each criteria pollutant.",
      "Explain photochemical smog formation, thermal inversions, and acid deposition chemistry.",
      "Describe control technologies and legislation that reduce specific pollutants.",
    ],
    sections: [
      section("Criteria pollutants and their sources", ["cb-env-ced", "epa-topics"], `
The Clean Air Act directs the EPA to set standards for six **criteria pollutants**: particulate matter, ground-level ozone, carbon monoxide, sulfur dioxide, nitrogen dioxide, and lead. **Primary pollutants** are emitted directly, carbon monoxide from incomplete combustion, sulfur dioxide from burning coal. **Secondary pollutants** form in the atmosphere when primaries react, ground-level ozone and acid rain being the standard examples.

Sources sort into point sources with a single identifiable outlet, like a power plant stack, and nonpoint sources spread over an area, like vehicle fleets and farms. Coal combustion is the exam's recurring villain because it emits sulfur dioxide, nitrogen oxides, particulates, mercury, and carbon dioxide together, letting one scenario test five pollutants at once. Transportation dominates nitrogen oxides, carbon monoxide, and ozone precursors in cities.
`),
      section("Photochemical smog and thermal inversions", ["cb-env-ced", "epa-topics"], `
**Photochemical smog** brews on sunny days when nitrogen dioxide from engines absorbs sunlight and releases an oxygen atom that forms ozone; volatile organic compounds from fuel and solvents keep the cycle regenerating ozone instead of consuming it. The result is the brownish, eye-stinging haze of Los Angeles-type smog, worst on hot, still afternoons. Contrast it with industrial (London-type) smog, built from sulfur dioxide and particulates in cool, damp coal smoke.

A **thermal inversion** traps whatever forms. Normally air cools with altitude and surface air rises and disperses; in an inversion a warm layer sits above cool surface air like a lid, so pollutants accumulate near the ground. Valleys and coastal basins under high pressure suffer most. Exam questions describe a city's weather and topography and ask why pollution spiked, and the inversion is usually the mechanism to name.
`),
      section("Acid deposition and indoor air", ["cb-env-ced", "epa-topics"], `
Sulfur dioxide and nitrogen oxides oxidize in the atmosphere into sulfuric and nitric acids, returning as **acid deposition** in rain, snow, fog, or dry particles, sometimes hundreds of kilometers from the source. Acidified lakes lose sensitive fish and invertebrates, soils leach nutrient cations and release toxic aluminum, and limestone buildings and statues dissolve. Granite-bedrock regions with little buffering capacity suffer most, a detail that decides between two otherwise similar lake scenarios.

Indoor air carries its own hazards: carbon monoxide from faulty furnaces, radon gas seeping from bedrock into basements (a leading cause of lung cancer in nonsmokers), formaldehyde and other VOCs from pressed-wood products, asbestos fibers in old insulation, and secondhand smoke. Developing-world households burning wood or dung indoors face dangerous particulate exposure. The exam tests whether you can rank a described home's risks rather than treating outdoor smog as the only air problem.
`),
      section("Controls: technology and law", ["cb-env-ced", "epa-topics", "cb-env-exam"], `
Control technology is pollutant-specific. Catalytic converters turn vehicle carbon monoxide and nitrogen oxides into carbon dioxide, nitrogen, and water. Electrostatic precipitators and bag filters strip particulates from smokestack gas; scrubbers wash out sulfur dioxide; and switching to low-sulfur coal or natural gas prevents it upstream. Vapor recovery, reformulated fuels, and emissions inspections attack urban ozone precursors.

The **Clean Air Act** is the legal frame: national ambient standards for criteria pollutants, state implementation plans, and amendments that created the acid-rain cap-and-trade program for sulfur dioxide, which cut emissions faster and cheaper than projected. That program is the model answer whenever a question asks how market mechanisms reduce pollution, and it links forward to carbon trading proposals in Unit 9.
`),
      section("How Unit 7 is tested", ["cb-env-ced", "cb-env-exam", "cb-env-frq"], `
Questions give an emitter and ask for its pollutant, or give a pollutant and ask for its control. Build the pairing table in your head: coal plant, SO2 and scrubber; gasoline car, NOx and catalytic converter; and remember ozone is secondary, never emitted directly, so any answer choice with a smokestack emitting ozone is wrong on its face.

Free-response air questions often ask for a health or ecosystem effect with the mechanism attached: ozone damaging leaf tissue and crop yield, particulates aggravating asthma, acid deposition mobilizing aluminum that damages fish gills. Name the tissue or process; 'harms the environment' earns nothing.
`),
    ],
    glossary: [
      { term: "Secondary pollutant", definition: "A pollutant formed in the atmosphere by reactions among primary pollutants, such as ground-level ozone." },
      { term: "Photochemical smog", definition: "A secondary-pollutant haze formed when sunlight drives reactions among nitrogen oxides and VOCs." },
      { term: "Thermal inversion", definition: "A warm air layer over cool surface air that traps pollutants near the ground." },
      { term: "Acid deposition", definition: "Sulfuric and nitric acids and related compounds deposited from the atmosphere onto surfaces and waters." },
    ],
    examAlignment: {
      title: "Pollutant–source–control pairing",
      description: "Unit 7 grades precise pairings among pollutants, their origins, their effects, and their fixes.",
      criteria: [
        "Classify each pollutant as primary or secondary and name a realistic source.",
        "Sequence photochemical smog formation from NO2, sunlight, and VOCs to ozone accumulation.",
        "Match a control technology or law to the specific pollutant it reduces.",
      ],
      sources: ["cb-env-ced", "cb-env-exam", "cb-env-frq"],
    },
    practice: [
      {
        question: "Ground-level ozone is classified as a secondary pollutant because it:",
        options: ["Is emitted directly by vehicle tailpipes.", "Forms in sunlight from reactions involving nitrogen oxides and VOCs.", "Is only found indoors.", "Comes from volcanic eruptions."],
        correctIndex: 1,
        explanation: "No smokestack or tailpipe emits ozone itself; sunlight-driven chemistry among NOx and VOCs produces it in the air.",
        skill: "Primary versus secondary pollutants",
      },
      {
        question: "A city in a mountain valley experiences its worst smog during calm winter mornings. The most likely contributing condition is:",
        options: ["A thermal inversion trapping pollutants near the surface.", "Increased stratospheric ozone depletion over the valley.", "Acid deposition washing pollutants out of the air.", "Higher wind speeds dispersing pollutants into the valley."],
        correctIndex: 0,
        explanation: "Calm conditions and valley topography favor temperature inversions, which cap vertical mixing and let pollutants accumulate.",
        skill: "Inversion reasoning",
      },
      {
        question: "Which technology removes sulfur dioxide from coal-plant exhaust gases?",
        options: ["Catalytic converter", "Wet scrubber that reacts the gas with a limestone slurry", "Electrostatic precipitator alone", "Baghouse filter alone"],
        correctIndex: 1,
        explanation: "Scrubbers wash flue gas with alkaline slurry that captures SO2; precipitators and baghouses capture particulates, and catalytic converters serve vehicles.",
        skill: "Pollution control technology",
      },
      {
        question: "Radon poses an indoor health risk primarily because it",
        options: ["Reacts with paint to form lead dust", "Is a radioactive gas that seeps from bedrock into basements and increases lung-cancer risk", "Blocks oxygen from entering homes", "Causes immediate chemical burns to skin"],
        correctIndex: 1,
        explanation: "Radon is an inert radioactive gas from uranium decay in rock and soil; its decay products damage lung tissue when inhaled over time.",
        skill: "Indoor air pollution",
      },
    ],
  },
  {
    unitNumber: 8,
    title: "Unit 8 · Aquatic and terrestrial pollution",
    description: "Track pollutants through water and land: eutrophication and oxygen sag, pathogens and sewage treatment, oil spills, endocrine disruptors, solid waste, and remediation.",
    examWeight: "7–10% of multiple-choice weighting",
    objectives: [
      "Sequence eutrophication from nutrient input to hypoxic dead zone and read an oxygen sag curve.",
      "Explain sewage treatment levels and what each removes, plus how pathogens are detected.",
      "Compare waste disposal and remediation options by what happens to the pollutant afterward.",
    ],
    sections: [
      section("Eutrophication and the oxygen sag", ["cb-env-ced", "epa-topics", "usgs-water"], `
Excess nitrogen and phosphorus from fertilizer runoff, manure, and sewage trigger **eutrophication**: algae bloom, die, and feed decomposer bacteria whose respiration strips dissolved oxygen from the water. The result can be a hypoxic **dead zone** where fish and shellfish cannot survive, like the seasonal zone at the Mississippi River's mouth in the Gulf of Mexico. Cultural eutrophication is the same process accelerated by human nutrient loading.

When biodegradable waste enters a stream, dissolved oxygen follows the **oxygen sag curve**: it dips downstream of the discharge as decomposition peaks, then recovers as reaeration and declining waste restore balance, assuming no further inputs. The biochemical oxygen demand (BOD) measures how much oxygen microbes need to break the waste down. Graph questions give the sag and ask where the discharge sits or which organism, oxygen-sensitive fish or sludge worms, dominates each zone.
`),
      section("Pathogens, sewage, and water treatment", ["cb-env-ced", "epa-topics"], `
Waterborne pathogens, bacteria, viruses, and parasites from fecal contamination cause cholera, typhoid, hepatitis, and dysentery, and remain a leading killer where sanitation is absent. Because testing for every pathogen is impractical, water is screened for indicator organisms such as fecal coliform and E. coli; their presence signals likely fecal contamination. The Safe Drinking Water Act sets the standards this testing enforces.

Sewage treatment proceeds in levels. **Primary treatment** physically screens and settles solids. **Secondary treatment** uses bacteria in aeration tanks to decompose dissolved organic matter, cutting BOD sharply. **Tertiary treatment** removes nutrients, nitrogen and phosphorus, and disinfects, targeting eutrophication and pathogens specifically. Septic systems do the first two jobs on site in a tank and drain field. Exam questions ask what a described stage removes and what passes through it untouched.
`),
      section("Toxins: oil, metals, and endocrine disruptors", ["cb-env-ced", "epa-topics"], `
Oil spills coat feathers and fur, destroying insulation, and smother intertidal life; cleanup ranges from skimming and booms to dispersants that trade surface slicks for water-column exposure. Heavy metals such as mercury and lead arrive from mining, industry, and coal combustion, then **bioaccumulate** in fatty tissue and **biomagnify** up food chains, so top predators and the people eating them carry the highest doses, the mechanism behind fish-consumption advisories.

A newer class, **endocrine disruptors** such as atrazine, BPA, and some pesticides, mimics or blocks hormones at tiny concentrations, altering reproduction and development in wildlife and raising human health questions. Persistent organic pollutants share the dangerous trio of traits: long-lived, fat-soluble, and mobile over long distances, which is why Arctic peoples carry industrial chemicals produced continents away.
`),
      section("Solid waste and remediation", ["cb-env-ced", "epa-topics"], `
Municipal solid waste is mostly paper, food, yard trimmings, and plastics; only a minority is recycled or composted, and the rest goes to landfills or incinerators. A modern sanitary landfill is engineered: a clay and plastic liner, leachate collection, and methane capture, because decomposing waste generates both contaminated liquid and a potent greenhouse gas. Incineration slashes volume and can generate electricity but concentrates toxic ash and emits air pollutants that must be scrubbed.

Remediation cleans what containment missed. Bioremediation feeds microbes that digest oil or solvents; phytoremediation uses plants to extract metals into harvestable tissue; hazardous waste law (RCRA, and Superfund for abandoned sites) assigns cleanup responsibility. The exam's comparative question is always where the pollutant ends up: destroyed, stored, transferred, or merely diluted, and which option actually eliminates the hazard.
`),
      section("How Unit 8 is tested", ["cb-env-ced", "cb-env-exam", "cb-env-frq"], `
This unit feeds the analyze-a-problem free-response question: a described dead zone, contaminated well, or landfill, followed by 'identify the pollutant, explain the harm, propose and justify a solution.' Structure answers as a causal chain with a named organism or process at each link, and make the solution attack the chain's first link, nutrient input, rather than its last symptom.

Graph work centers on the oxygen sag curve and dissolved-oxygen data. Identify the discharge point at the sag's start, the minimum-oxygen zone where sensitive species vanish, and the recovery zone. If a question gives BOD values, higher BOD means greater oxygen demand and a deeper sag, never the reverse.
`),
    ],
    glossary: [
      { term: "Eutrophication", definition: "Nutrient enrichment of water that drives algal blooms whose decomposition depletes dissolved oxygen." },
      { term: "Oxygen sag curve", definition: "The dip and recovery of dissolved oxygen downstream of a biodegradable waste discharge." },
      { term: "Biomagnification", definition: "The increasing concentration of a persistent, fat-soluble toxin at higher trophic levels." },
      { term: "BOD", definition: "Biochemical oxygen demand: the oxygen microbes require to decompose the organic matter in a water sample." },
    ],
    examAlignment: {
      title: "Pollution problems analyzed end to end",
      description: "Unit 8 supplies the problem–mechanism–solution chain used by the second free-response question.",
      criteria: [
        "Order eutrophication from nutrient input through algal death to oxygen depletion and its biological effect.",
        "State what primary, secondary, and tertiary sewage treatment each remove and what remains.",
        "Judge a cleanup option by the pollutant's final fate: destroyed, contained, or transferred.",
      ],
      sources: ["cb-env-ced", "cb-env-exam", "cb-env-frq"],
    },
    practice: [
      {
        question: "On an oxygen sag curve, the point of lowest dissolved oxygen downstream of a sewage discharge corresponds to:",
        options: ["The exact location of the discharge pipe.", "The zone where decomposition of the waste is at its peak and oxygen demand is greatest.", "The fully recovered zone where fish diversity is highest.", "A zone caused by acid deposition entering the stream."],
        correctIndex: 1,
        explanation: "Oxygen bottoms out downstream, where microbial decomposition of the accumulated waste peaks; recovery follows as waste is exhausted and reaeration dominates.",
        skill: "Oxygen sag interpretation",
      },
      {
        question: "Which treatment stage is specifically designed to remove nitrogen and phosphorus before discharge?",
        options: ["Primary settling.", "Chlorination of raw sewage.", "Tertiary treatment.", "Screening of grit and debris."],
        correctIndex: 2,
        explanation: "Tertiary treatment targets nutrients (and disinfection); primary treatment removes solids physically and secondary treatment removes most BOD biologically.",
        skill: "Sewage treatment levels",
      },
      {
        question: "A river sample has a very high biochemical oxygen demand (BOD). This indicates",
        options: ["The water is exceptionally clean and oxygen-rich", "Microbes will consume large amounts of dissolved oxygen decomposing the organic matter present", "The water contains high levels of dissolved oxygen already", "Photosynthesis is occurring faster than respiration"],
        correctIndex: 1,
        explanation: "BOD measures the oxygen microbes need to break down organic waste; high BOD predicts a deep oxygen sag downstream.",
        skill: "Water quality indicators",
      },
      {
        question: "Phytoremediation cleans contaminated soil by",
        options: ["Washing it with high-pressure detergent", "Using plants to absorb contaminants such as heavy metals into harvestable tissue", "Burning the soil at high temperature", "Burying it beneath a clay cap"],
        correctIndex: 1,
        explanation: "Phytoremediation plants take up metals or degrade organics; the contaminated biomass is then harvested and disposed of safely.",
        skill: "Remediation methods",
      },
    ],
  },
  {
    unitNumber: 9,
    title: "Unit 9 · Global change",
    description: "Weigh the planetary-scale threats: stratospheric ozone depletion, greenhouse warming and ocean change, invasive species, and biodiversity loss, plus the laws answering them.",
    examWeight: "15–20% of multiple-choice weighting",
    objectives: [
      "Separate stratospheric ozone depletion from greenhouse warming by cause, location, and remedy.",
      "Explain the greenhouse effect, feedback loops, and evidence for human-caused climate change.",
      "Evaluate threats to biodiversity (HIPPCO) and the protections offered by major environmental laws.",
    ],
    sections: [
      section("Stratospheric ozone: a different problem", ["cb-env-ced", "epa-topics", "noaa-climate"], `
High in the stratosphere, ozone absorbs ultraviolet radiation, shielding DNA from damage. Chlorofluorocarbons (CFCs), once used as refrigerants and propellants, drift up intact, release chlorine under ultraviolet light, and each chlorine atom catalytically destroys thousands of ozone molecules, opening the seasonal Antarctic ozone hole. Effects include increased skin cancer, cataracts, and phytoplankton damage at the base of ocean food webs.

The **Montreal Protocol** phased out CFCs and is the most successful environmental treaty ever, with the ozone layer slowly recovering. Keep this problem rigorously separate from climate change in your answers: different chemicals (CFCs versus greenhouse gases), different layer concerns, different treaty. Confusing the ozone hole with the cause of global warming is the single most penalized misconception in this unit.
`),
      section("The greenhouse effect and climate evidence", ["cb-env-ced", "noaa-climate"], `
**Greenhouse gases**, water vapor, carbon dioxide, methane, nitrous oxide, and others, are transparent to incoming visible sunlight but absorb the infrared radiation Earth re-emits, warming the surface. The natural effect keeps Earth habitable; the human enhancement, chiefly carbon dioxide from fossil fuels and deforestation plus methane from livestock, landfills, and fossil-fuel leaks, drives current warming. Gases differ in potency and lifetime, summarized as global warming potential.

Evidence lines converge: direct thermometer and satellite records, retreating glaciers, rising seas, earlier springs, shifting species ranges, and carbon isotope fingerprints showing the added CO2 comes from fossil carbon. Feedbacks amplify or dampen the trend: melting ice lowers albedo and absorbs more heat (positive feedback), water vapor increases with warmth, while some cloud changes may partly offset. Exam questions present a described feedback and ask only whether it is positive or negative, a labeling exercise students overthink.
`),
      section("Oceans and ecosystems under warming", ["cb-env-ced", "noaa-climate", "epa-topics"], `
The ocean absorbs most excess heat and about a third of human-emitted carbon dioxide. Warming water expands and melts land ice, raising sea level and flooding coasts and wetlands; warmer surface water also fuels stronger hurricanes and bleaches coral when symbiotic algae are expelled. Absorbed CO2 forms carbonic acid, and **ocean acidification** lowers pH and carbonate availability, so shell-builders from oysters to pteropods form thinner shells, a direct chemical consequence independent of temperature.

On land, species shift poleward and uphill tracking their climate niches, but habitat fragmentation (Unit 2) blocks many migrations, and mountaintop species have nowhere higher to go. Phenology shifts, earlier flowering, earlier migration, can uncouple mutualists timed to each other. The exam links these into impact chains: forcing, physical change, biological response, human consequence, and asks you to supply the missing link.
`),
      section("Biodiversity threats and the laws that answer", ["cb-env-ced", "epa-topics", "cb-env-exam"], `
Threats to biodiversity are summarized as **HIPPCO**: habitat destruction and fragmentation (the largest), invasive species, population growth of humans, pollution, climate change, and overexploitation. Invasive species, from zebra mussels clogging intake pipes to kudzu smothering southern forests, share generalist traits and missing predators; prevention and early eradication cost a fraction of controlling an established invasion.

The legal toolkit includes the Endangered Species Act, which protects listed species and their critical habitat and restricts trade together with CITES; Lacey Act rules on importing injurious species; the Clean Water and Clean Air Acts for pollution pathways; and international agreements from Montreal to the Paris climate framework. Questions name a threat and ask for the law or action that addresses it, so keep each statute attached to its target rather than memorizing a list of acronyms.
`),
      section("How Unit 9 is tested", ["cb-env-ced", "cb-env-exam", "cb-env-frq"], `
As the heaviest-weighted unit, Global Change anchors data questions: temperature and CO2 curves to correlate, sea-level projections to read, species-range maps to interpret. The discipline is attribution language: the data can show correlation and consistency with a mechanism, and the strongest answers state the mechanism (greenhouse absorption, catalytic chlorine chemistry) rather than claiming a graph 'proves' a cause by itself.

Free-response questions close the exam with mitigation and adaptation: propose a practice that cuts a named greenhouse gas at its source, or a design that helps a community adapt to a stated impact, and justify it with the unit's mechanism. Distinguish the two words precisely; planting mangroves against storm surge is adaptation, while replacing coal generation is mitigation, and swapping them forfeits the point.
`),
    ],
    glossary: [
      { term: "Ozone depletion", definition: "The catalytic destruction of stratospheric ozone by chlorine and bromine from human-made chemicals such as CFCs." },
      { term: "Greenhouse gas", definition: "A gas that absorbs outgoing infrared radiation, warming the lower atmosphere; examples include CO2, methane, and nitrous oxide." },
      { term: "Ocean acidification", definition: "The lowering of ocean pH as absorbed carbon dioxide forms carbonic acid, reducing carbonate available to shell-builders." },
      { term: "HIPPCO", definition: "The major threats to biodiversity: habitat loss, invasive species, population growth, pollution, climate change, and overexploitation." },
    ],
    examAlignment: {
      title: "Two atmospheric problems kept rigorously apart",
      description: "The heaviest unit rewards separating ozone chemistry from greenhouse physics and matching laws to threats.",
      criteria: [
        "Attribute ozone loss to CFC chlorine chemistry in the stratosphere and warming to infrared absorption by greenhouse gases.",
        "Label a described feedback as positive or negative and state what it amplifies or dampens.",
        "Match a biodiversity threat to the statute or practice that targets it, distinguishing mitigation from adaptation.",
      ],
      sources: ["cb-env-ced", "cb-env-exam", "cb-env-frq"],
    },
    practice: [
      {
        question: "Which statement correctly separates two atmospheric problems?",
        options: ["The ozone hole is the main cause of recent global warming.", "CFCs destroy stratospheric ozone, while carbon dioxide and methane warm the climate by absorbing infrared radiation.", "Ground-level ozone depletion causes acid rain.", "The Montreal Protocol regulates carbon dioxide emissions."],
        correctIndex: 1,
        explanation: "Ozone depletion (CFCs, stratosphere, Montreal Protocol) and greenhouse warming (CO2, methane; infrared absorption) are distinct problems with distinct remedies.",
        skill: "Ozone versus climate distinction",
      },
      {
        question: "Warming melts Arctic sea ice, exposing dark ocean that absorbs more sunlight and causes more warming. This is an example of:",
        options: ["A negative feedback that stabilizes climate.", "A positive feedback that amplifies the initial change.", "Ocean acidification reducing carbonate levels.", "The demographic transition in polar regions."],
        correctIndex: 1,
        explanation: "The loop reinforces the original warming through reduced albedo, the defining structure of a positive feedback.",
        skill: "Feedback identification",
      },
      {
        question: "Methane is a climate concern distinct from carbon dioxide mainly because methane",
        options: ["Is the most abundant greenhouse gas in the atmosphere", "Has a much higher warming potency per molecule, though it breaks down faster", "Does not absorb infrared radiation", "Comes only from volcanoes"],
        correctIndex: 1,
        explanation: "Methane traps far more heat per molecule than CO2 over short horizons but oxidizes within about a decade, unlike long-lived CO2.",
        skill: "Greenhouse gases",
      },
      {
        question: "Permafrost thaw releases methane and carbon dioxide, which warm the climate further and thaw more permafrost. This loop is",
        options: ["A negative feedback that stabilizes temperature", "A positive feedback that amplifies the initial warming", "An example of stratospheric ozone repair", "The demographic transition of the Arctic"],
        correctIndex: 1,
        explanation: "The response reinforces the original change, the defining structure of a positive feedback loop.",
        skill: "Climate feedbacks",
      },
    ],
  },
];
