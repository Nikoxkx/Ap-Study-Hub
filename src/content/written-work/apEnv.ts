import type { CourseDefense, WrittenWork } from "./types";

/**
 * AP Environmental Science written work and defense.
 *
 * The paper rewards arithmetic with units, a stated assumption, and a
 * calculation tied back to a system. These examples are the four question
 * types that turn up most: a calculation with a percentage change, a
 * population, an energy comparison, and a design-an-investigation prompt.
 */
export const apEnvWrittenWork: WrittenWork[] = [
  {
    id: "ap-env-1",
    courseSlug: "ap-env",
    unitNumber: 1,
    prompt:
      "A forest plot stores \\(180\\,\\text{tonnes}\\) of carbon per hectare. A fire removes \\(35\\%\\) of that carbon, and \\(15\\%\\) of the removed carbon is returned to the atmosphere as carbon dioxide. Calculate the mass of carbon released as \\(\\text{CO}_2\\), and explain what happens to the rest.",
    plan: [
      "Work in tonnes of carbon throughout, then convert only at the end.",
      "The remainder is the part most answers forget — say where it goes, not only how much.",
    ],
    example: [
      "Step 1 — carbon removed: \\(0.35 \\times 180 = 63\\,\\text{tonnes of C}\\)",
      "Step 2 — carbon returned as \\(\\text{CO}_2\\): \\(0.15 \\times 63 = 9.45\\,\\text{tonnes of C}\\)",
      "Step 3 — convert to \\(\\text{CO}_2\\) mass using the ratio \\(\\frac{44}{12}\\):",
      "\\[9.45 \\times \\frac{44}{12} \\approx 34.7\\,\\text{tonnes of }\\text{CO}_2\\]",
      "The remaining \\(53.6\\) tonnes of carbon are not released as gas. Some stays as charcoal and ash in the soil, some becomes dead wood and is decomposed over years, and some is exported downstream as dissolved organic carbon. Only the fraction that burns completely reaches the atmosphere quickly.",
    ],
    because:
      "The arithmetic is stepped, the carbon-to-\\(\\text{CO}_2\\) conversion is shown with its ratio, and the fate of the remainder is described in mechanisms rather than left as a subtraction. The conversion is where most answers lose a point, because they report tonnes of carbon as though it were tonnes of \\(\\text{CO}_2\\).",
    say: [
      "I kept the units as tonnes of carbon until the last step, because converting early makes the arithmetic harder to check.",
      "The ratio forty-four over twelve is the mass of carbon dioxide per mass of carbon, and I wrote it out rather than using a remembered number.",
      "The interesting part is the rest. A fire does not put all the carbon in the air that day; a lot of it moves slowly through soil and water.",
      "If someone asked about methane, I would say I have not accounted for it, and a real inventory would.",
    ],
    trap:
      "Reporting \\(9.45\\) tonnes as the answer. Carbon and carbon dioxide are different masses, and the 44/12 factor is worth a point.",
  },
  {
    id: "ap-env-2",
    courseSlug: "ap-env",
    unitNumber: 3,
    prompt:
      "A population of \\(1{,}500\\) grows at \\(2.4\\%\\) per year. Calculate the doubling time and the population after \\(20\\) years, and explain one assumption in your calculation.",
    plan: [
      "The rule of 70 is an approximation. Say so, and say when it is acceptable.",
      "Compound growth, not linear growth. \\(2.4\\%\\) of the first year is not \\(2.4\\%\\) of the twentieth.",
    ],
    example: [
      "Doubling time: \\(t_d \\approx \\dfrac{70}{2.4} \\approx 29.2\\) years.",
      "Population after 20 years:",
      "\\[N = 1500 \\times (1.024)^{20} \\approx 1500 \\times 1.606 \\approx 2409\\]",
      "The growth is exponential, so the population adds about 36 people in the first year and about 56 in the twentieth, for the same percentage.",
      "Assumption: the rate stays constant for twenty years. Real growth rates fall as a population approaches its carrying capacity, so this is a projection and not a prediction.",
    ],
    because:
      "The approximate rule is used with its approximation admitted, the compounding is done properly, and the final paragraph names the assumption and its direction. That last sentence is what separates a calculation from an environmental science answer.",
    say: [
      "I used the rule of seventy for the doubling time and I labeled it as an approximation.",
      "I compounded rather than multiplying by twenty, because a percentage growth rate compounds.",
      "The sentence about the first year versus the twentieth is how I know it is exponential, and it is also a useful thing to say out loud.",
      "The assumption is a constant rate. It will not be constant, and it will probably fall, so my number is an upper bound.",
    ],
    trap:
      "Calculating \\(1500 \\times 0.024 \\times 20\\) and adding. That is linear growth, and it understates the answer by hundreds of people.",
  },
  {
    id: "ap-env-2b",
    courseSlug: "ap-env",
    unitNumber: 2,
    prompt:
      "A wetland of \\(40\\,\\text{hectares}\\) is drained for a car park. One wetland hectare supports about \\(2.5\\times10^{4}\\,\\text{m}^3\\) of floodwater storage. Calculate the storage lost and explain one way the loss appears somewhere else.",
    plan: [
      "Multiply the rate by the area before converting anything.",
      "The second half asks where the water goes. Answer with a direction, not a feeling.",
    ],
    example: [
      "\\[40\\,\\text{ha} \\times 2.5\\times10^{4}\\,\\text{m}^3\\,\\text{ha}^{-1} = 1.0\\times10^{6}\\,\\text{m}^3\\]",
      "That is one million cubic meters of floodwater storage removed, which is roughly the volume of 400 Olympic swimming pools.",
      "The water does not disappear. It reaches the drainage network sooner and in a larger pulse, so the same rainfall produces a higher peak downstream, and the cost appears as flood damage in a neighborhood that did not lose a wetland.",
      "The loss is also not only storage. The wetland was removing nutrients and slowing sediment, and those jobs now happen somewhere the town has to pay for.",
    ],
    because:
      "The calculation is one line with the units cancelling correctly, and the explanation follows the water rather than naming an abstraction. Naming a second lost service is what turns a calculation into an ecosystem-services answer.",
    say: [
      "I multiplied hectares by cubic meters per hectare, so the hectare units cancel and I am left with volume.",
      "One million cubic meters is hard to picture, so I compared it with swimming pools. That is for the reader, not for the mark.",
      "The water goes downstream and arrives faster. That is the mechanism.",
      "The part I would add in a longer answer is nutrient removal, because a wetland does more than hold water.",
    ],
    trap:
      "Answering 'habitat is lost' only. Habitat loss is true, and the question is about a service — the flood storage has to be accounted for separately.",
  },

  {
    id: "ap-env-3",
    courseSlug: "ap-env",
    unitNumber: 6,
    prompt:
      "A home uses \\(11{,}000\\,\\text{kWh}\\) of electricity per year. Compare the \\(\\text{CO}_2\\) emissions of a coal plant \\((0.95\\,\\text{kg}\\,\\text{CO}_2/\\text{kWh})\\) and a natural gas plant \\((0.42\\,\\text{kg}\\,\\text{CO}_2/\\text{kWh})\\), and calculate the percentage reduction if the home's supply switched.",
    plan: [
      "Multiply before dividing. The percentages are the smaller part of the answer.",
      "The percentage reduction is relative to the original, not to the difference.",
    ],
    example: [
      "Coal: \\(11{,}000 \\times 0.95 = 10{,}450\\,\\text{kg}\\) of \\(\\text{CO}_2\\) per year.",
      "Gas: \\(11{,}000 \\times 0.42 = 4{,}620\\,\\text{kg}\\) of \\(\\text{CO}_2\\) per year.",
      "Difference: \\(10{,}450 - 4{,}620 = 5{,}830\\,\\text{kg}\\) per year.",
      "\\[\\text{Percentage reduction} = \\frac{5{,}830}{10{,}450} \\times 100\\% \\approx 55.8\\%\\]",
      "That is about 5.8 tonnes of \\(\\text{CO}_2\\) avoided, which is meaningful for one home and small next to a power station's total. The comparison also holds only at the point of generation; it does not count methane leaking during gas extraction, which would reduce the advantage.",
    ],
    because:
      "Both totals are computed before the percentage, the percentage is taken relative to the original, and the last sentence adds a real limitation about the fuel cycle. That final caveat is what the evaluation row is looking for.",
    say: [
      "I calculated both totals first, because a percentage of a number I have not computed is a guess.",
      "The percentage is the difference over the original, which is about 56 percent.",
      "I put the avoided mass in perspective, because 5.8 tonnes sounds large on its own.",
      "And I flagged methane leakage, because if you count extraction, gas is less clean than this calculation suggests.",
    ],
    trap:
      "Dividing the difference by the smaller number. That gives 126%, which should be a warning sign — you cannot reduce emissions by more than all of them.",
  },
  {
    id: "ap-env-4",
    courseSlug: "ap-env",
    unitNumber: 5,
    prompt:
      "Design an investigation to test whether street trees reduce surface temperature. Identify the variables and one reason your result might be misleading.",
    plan: [
      "Independent, dependent, and at least two controls. Name them in that order.",
      "The reason the result might mislead is a separate point, and it is usually the best one.",
    ],
    example: [
      "Hypothesis: if tree canopy cover lowers surface temperature, then streets with greater canopy will have lower surface temperatures at the same time of day and in the same weather.",
      "Design: choose twelve street segments in one city, matched in pairs by street width and surface material, differing in canopy cover. Measure surface temperature with an infrared thermometer at five fixed points on each segment, three times on each of three hot, clear days, at the same hours.",
      "Variables: independent variable is percentage canopy cover (measured from a canopy map or by densiometer); dependent variable is surface temperature in °C; controlled variables include time of day, cloud cover, surface material, traffic density and distance from the city center.",
      "One reason the result could mislead: streets with more canopy may also be wealthier, better maintained and less heavily trafficked, so temperature differences could be produced by irrigation, paving age or vehicle heat rather than by shade. Pairing by street width and material removes some of that, and it does not remove all of it.",
    ],
    because:
      "The design names a controlled comparison, gives replication in both space and time, and identifies a confounder with a direction. The last clause — what pairing removes and what it does not — is the difference between a plausible design and a thoughtful one.",
    say: [
      "I started with a hypothesis that could fail. If canopy has no effect, my design should show no difference.",
      "My independent variable is canopy cover and my dependent variable is surface temperature, measured, not felt.",
      "I paired streets by width and material so I am comparing similar streets.",
      "The weakness is confounding by income, and I would collect the data anyway and then say so in the conclusion rather than pretending the comparison is clean.",
    ],
    trap:
      "Designing a comparison between one treed street and one bare street. With one of each, any difference could be caused by anything, and there is no replication to check.",
  },
  {
    id: "ap-env-4b",
    courseSlug: "ap-env",
    unitNumber: 4,
    prompt:
      "A soil sample from \\(0.25\\,\\text{m}^2\\) to a depth of \\(0.20\\,\\text{m}\\) has a bulk density of \\(1.3\\,\\text{g}\\,\\text{cm}^{-3}\\). Calculate the mass of soil in the sample and the mass of organic carbon if it is \\(2.0\\%\\) carbon by mass.",
    plan: [
      "Convert everything to consistent units before multiplying. Centimeters and meters will bite.",
      "The percentage is by mass, so it applies to the mass you just computed.",
    ],
    example: [
      "Step 1 — volume: \\(0.25\\,\\text{m}^2 \\times 0.20\\,\\text{m} = 0.050\\,\\text{m}^3\\)",
      "Step 2 — convert to cubic centimeters: \\(0.050\\,\\text{m}^3 \\times 10^{6} = 5.0\\times10^{4}\\,\\text{cm}^3\\)",
      "Step 3 — mass: \\(5.0\\times10^{4} \\times 1.3 = 6.5\\times10^{4}\\,\\text{g} = 65\\,\\text{kg}\\)",
      "Step 4 — carbon: \\(0.020 \\times 65 = 1.3\\,\\text{kg of carbon}\\)",
      "Scaling up, one hectare to the same depth holds about \\(5.2\\times10^{4}\\,\\text{kg}\\) of carbon, which is why soil carbon is measured in tonnes per hectare rather than grams.",
    ],
    because:
      "The unit conversion is done explicitly and the mass is reported in kilograms, and the scaling sentence at the end shows why the answer matters. Soil carbon questions are mostly unit-conversion questions wearing a lab coat.",
    say: [
      "I converted the volume to cubic centimeters first, because bulk density is in grams per cubic centimeter.",
      "Millilitres and cubic centimeters are the same thing, which is why this conversion is safe.",
      "The percentage is by mass, so I applied it to the sixty-five kilograms and not to the volume.",
      "The hectare scaling is there so the number means something. One point three kilograms of carbon in a tray of soil sounds tiny until you multiply it by ten thousand.",
    ],
    trap:
      "Multiplying square meters by depth and treating the result as cubic centimeters. The volume is in cubic meters, and there are a million cubic centimeters in one.",
  },

  {
    id: "ap-env-5",
    courseSlug: "ap-env",
    unitNumber: 9,
    prompt:
      "A coastal city's sea level rose \\(3.2\\,\\text{mm}\\) per year on average between 1993 and 2020. Calculate the total rise over that period and explain why the average may understate the risk.",
    plan: [
      "The number of years is the trap. Count it explicitly.",
      "The second half asks for a mechanism, not an adjective.",
    ],
    example: [
      "Period: \\(2020 - 1993 = 27\\) years.",
      "\\[\\text{Total rise} = 3.2\\,\\text{mm/yr} \\times 27\\,\\text{yr} = 86.4\\,\\text{mm} \\approx 8.6\\,\\text{cm}\\]",
      "The average may understate the risk for three reasons. The rate has increased, so a straight average over the period hides the fact that later years contributed more than earlier ones. Storm surge and high tides matter more than the mean, because damage happens at the extreme rather than at the average. And subsidence can be local and larger than the global average, especially where groundwater has been pumped out from beneath the city.",
    ],
    because:
      "The arithmetic is trivial and the marks are in the explanation, which names three distinct mechanisms. Subsidence is the one students forget, and it is often the larger local term.",
    say: [
      "I counted the years explicitly, because an off-by-one in the period changes the answer.",
      "The average is a line through points that are curving upward, so it hides the acceleration.",
      "Damage happens at the high tide and the storm, not at the mean sea level.",
      "And locally, the land may be sinking faster than the sea is rising, which is why two cities with the same number can have very different problems.",
    ],
    trap:
      "Responding to 'why may this understate risk' with 'climate change is worse than it looks'. The question wants mechanisms: acceleration, extremes, subsidence.",
  },
  {
    id: "ap-env-7b",
    courseSlug: "ap-env",
    unitNumber: 7,
    prompt:
      "A city's air monitoring shows that ozone peaks at 3 p.m. while nitrogen dioxide peaks at 8 a.m. Explain why the two peaks do not coincide.",
    plan: [
      "Ozone is secondary. Say what it is made from and what it needs.",
      "Traffic explains the first peak; sunlight explains the delay.",
    ],
    example: [
      "Nitrogen dioxide is a primary pollutant, so its peak follows the traffic that produces it: the morning commute puts it into the air by 8 a.m. Ozone is secondary, made when nitrogen oxides react with volatile organic compounds in the presence of sunlight, and that chemistry needs both the precursors and time. By the time the sun is high and the reaction has had hours to proceed, the nitrogen dioxide has been largely converted, so ozone peaks in the afternoon while its raw material is already declining.",
      "That is why an ozone alert is an afternoon event and a nitrogen dioxide alert is a morning one, and why controlling traffic at 8 a.m. reduces the afternoon ozone only partly.",
    ],
    because:
      "The answer distinguishes a primary from a secondary pollutant, names the reaction conditions, and follows the timing through. Explaining why the early-morning control is only partly effective is what makes it an environmental science answer rather than a chemistry definition.",
    say: [
      "I would start by saying the two pollutants peak apart because one is emitted and one is made.",
      "Nitrogen dioxide follows traffic, so it peaks with the commute.",
      "Ozone needs sunlight and time, so it peaks when the sun has been working on the air for hours.",
      "That is why the nitrogen dioxide is already falling when ozone is highest, which is the counter-intuitive bit.",
    ],
    trap:
      "Saying ozone comes from cars. Cars emit precursors; ozone is formed downwind and later, which is exactly why the peaks separate.",
  },
  {
    id: "ap-env-8b",
    courseSlug: "ap-env",
    unitNumber: 8,
    prompt:
      "A lake receives \\(120\\,\\text{kg}\\) of phosphorus per year from a sewage plant and \\(80\\,\\text{kg}\\) per year from farmland runoff. The lake's volume is \\(4.0\\times10^{5}\\,\\text{m}^3\\). Calculate the annual loading per cubic meter and explain why the nonpoint source is harder to reduce.",
    plan: [
      "Total both sources before dividing. A per-source rate is not the loading.",
      "Point versus nonpoint is about attribution and enforcement, not about size.",
    ],
    example: [
      "Total loading: \\(120 + 80 = 200\\,\\text{kg of phosphorus per year}\\).",
      "\\[\\frac{200\\,\\text{kg}}{4.0\\times10^{5}\\,\\text{m}^3} = 5.0\\times10^{-4}\\,\\text{kg}\\,\\text{m}^{-3}\\text{ per year} = 0.50\\,\\text{mg}\\,\\text{L}^{-1}\\text{ per year}\\]",
      "The sewage plant is a point source: one pipe, one permit, one number that can be measured and capped. The farmland is a nonpoint source, because the phosphorus leaves hundreds of fields at different times depending on rain, slope, tillage and fertiliser timing. There is no pipe to sample, which means no permit to write and no single party to hold responsible, so the policy tools are incentives, buffer strips and timing rules rather than a limit at a discharge.",
      "That is why the smaller source is often the harder one to control, even when it is the larger share of the load.",
    ],
    because:
      "The loading is computed per unit volume and converted sensibly, and the explanation of point versus nonpoint is about measurement and attribution rather than about which is worse. The closing sentence is a claim worth defending, which is the point of an FRQ explanation.",
    say: [
      "I added the two sources first, because loading is the total entering the lake.",
      "Then I divided by the volume, and I converted to milligrams per litre so the number is comparable with water quality standards.",
      "Point versus nonpoint is about whether there is a pipe. That is why one can be permitted and the other cannot.",
      "The sentence I would stand behind is that the smaller source can be the harder one. Farmland here is only forty percent of the load and it is the part the regulator cannot point at.",
    ],
    trap:
      "Describing nonpoint pollution as 'diffuse' and stopping. The mark is for why diffusion defeats the policy tools — attribution, timing, and no single responsible party.",
  },
];

export const apEnvDefense: CourseDefense = {
  courseSlug: "ap-env",
  claim:
    "That your numbers have units, your assumptions are stated, and your conclusion admits what the data cannot show.",
  frames: [
    "I calculated…, and the units are…",
    "This assumes…, which would overstate / understate the result if…",
    "The trend is…, and the point that departs from it is…",
    "This is a correlation in the data I collected; the mechanism would be…",
    "The confound I could not remove is…, and here is what I did about it.",
  ],
  markedOn: [
    "Whether every quantity carries a unit",
    "Whether assumptions are stated before they are needed",
    "Whether the conclusion distinguishes description from cause",
    "Whether you can name a confound in your own design",
  ],
  units: [
    {
      unitNumber: 1,
      keep: ["One carbon store", "One pathway by which carbon leaves it"],
      question: "\"Where does the carbon go if it does not go into the air?\"",
      answer: [
        "Into soil as charcoal and organic matter, into dead wood that decomposes over years, and downstream as dissolved carbon.",
        "That is why a fire is not a single pulse of carbon dioxide.",
        "A full accounting would need to follow those stores, and I only calculated the fast pathway.",
      ],
    },
    {
      unitNumber: 2,
      keep: ["One ecosystem service", "Who pays for it"],
      question: "\"Why do biodiversity losses matter economically?\"",
      answer: [
        "Because ecosystems provide services I would otherwise have to buy: pollination, water filtration, flood buffering.",
        "I would use the economic argument to make the loss visible, not as the only reason it matters.",
        "The weakness I would name is that these services are hard to price, which is why the numbers vary so much between studies.",
      ],
    },
    {
      unitNumber: 3,
      keep: ["The growth rate", "The doubling time and what it assumes"],
      question: "\"Will that population actually double?\"",
      answer: [
        "Only if the rate stays constant, which it will not near carrying capacity.",
        "The projection is an upper bound, and I said so.",
        "A logistic model would predict a slower approach and a plateau, and I would use it if I had K.",
      ],
    },
    {
      unitNumber: 4,
      keep: ["One natural source", "One human amplification of it"],
      question: "\"Is this pollution natural or human-caused?\"",
      answer: [
        "Both. The natural source exists; the human contribution changes the rate and the concentration.",
        "That is the distinction I would draw before assigning responsibility.",
        "The evidence I would point to is the isotope ratios, because they differ between sources.",
      ],
    },
    {
      unitNumber: 5,
      keep: ["Your independent variable", "One confound you cannot remove"],
      question: "\"How do you know the trees did it?\"",
      answer: [
        "I do not know it. I matched streets on width and material, which removes some confounding and not all.",
        "The remaining confound is income, which correlates with canopy and with maintenance.",
        "The honest claim is an association, and a randomized planting would be the test.",
      ],
    },
    {
      unitNumber: 6,
      keep: ["A conversion factor with its unit", "One limitation of the comparison"],
      question: "\"Is natural gas a clean fuel?\"",
      answer: [
        "I would only claim that it is cleaner than coal per kilowatt-hour at the point of generation, and I would keep the claim that narrow.",
        "Methane leakage during extraction can reduce or erase the advantage.",
        "So I would call it lower-carbon rather than clean.",
      ],
    },
    {
      unitNumber: 7,
      keep: ["One primary pollutant", "One secondary pollutant made from it"],
      question: "\"Is the pollution from the factory or from the sky?\"",
      answer: [
        "Both, in sequence. The factory emits a primary pollutant, and sunlight plus other compounds convert it into a secondary one.",
        "That is why I would expect the harm to show up downwind rather than at the stack itself.",
        "The policy consequence I would draw is that controlling the stack is necessary and not sufficient.",
      ],
    },
    {
      unitNumber: 8,
      keep: ["One point source", "One nonpoint source"],
      question: "\"Why is nonpoint pollution harder to regulate?\"",
      answer: [
        "Because there is no single pipe for me to permit or measure, which is the whole difficulty.",
        "The loads arrive from many fields and streets at once, so I cannot attribute them to one owner.",
        "That is why I would reach for incentives and land management rather than a permit.",
      ],
    },
    {
      unitNumber: 9,
      keep: ["A rate and a period", "One reason the average hides the risk"],
      question: "\"Is sea level rise the biggest risk to a coastal city?\"",
      answer: [
        "Not on its own. The risk I would describe is mean rise, storm surge and subsidence arriving together.",
        "The average understates the extremes, and I would point out that the damage happens at the extremes.",
        "Local subsidence can be larger than the global rate, which is how I would explain why two coastal cities face different numbers.",
      ],
    },
  ],
};
