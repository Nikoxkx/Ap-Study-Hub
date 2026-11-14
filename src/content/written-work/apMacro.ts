import type { CourseDefense, WrittenWork } from "./types";

/**
 * AP Macroeconomics written work and defense.
 *
 * Macroeconomics FRQs are marked on three things: the labels on a graph, the
 * direction of a shift, and arithmetic that follows from the model. Every
 * example here shows the arithmetic on squared paper and the labeled graph
 * described in words, because a verbal description of a graph is still a
 * graph on a spoken defense.
 */
export const apMacroWrittenWork: WrittenWork[] = [
  {
    id: "ap-macro-1",
    courseSlug: "ap-macro",
    unitNumber: 2,
    prompt:
      "An economy has a labor force of \\(160\\) million, \\(152\\) million employed and \\(8\\) million unemployed. Calculate the unemployment rate. Then \\(2\\) million unemployed workers stop looking. Calculate the new rate and explain why it changed.",
    plan: [
      "The unemployment rate is unemployed divided by the labor force — not by the population.",
      "When people stop looking they leave the labor force, so the denominator changes too.",
    ],
    example: [
      "Step 1 — current rate:",
      "\\[\\frac{8}{160} \\times 100\\% = 5.0\\%\\]",
      "Step 2 — after 2 million stop looking: unemployed \\(= 6\\) million, labor force \\(= 158\\) million",
      "\\[\\frac{6}{158} \\times 100\\% \\approx 3.8\\%\\]",
      "Step 3 — the rate fell by \\(1.2\\) percentage points, and nobody found a job. Discouraged workers left the labor force, which shrinks the numerator and the denominator, and because the numerator is the smaller number the ratio falls. The official rate understates the problem in exactly this situation.",
    ],
    because:
      "Both the numerator and the denominator are updated, and the explanation says why the arithmetic does what it does. That is the sentence that earns the reasoning point — the calculation alone is worth one point out of three.",
    say: [
      "I divided by the labor force, not by the population, because that is what the definition says.",
      "When the two million stop looking, I changed both numbers. Keeping the labor force at 160 is the mistake this question is fishing for.",
      "The rate falls and nothing good happened, which is the interesting part. A falling unemployment rate is not automatically good news.",
      "This is why economists also look at the labor force participation rate, and I would mention it in the next sentence.",
    ],
    trap:
      "Subtracting two million from the unemployed and leaving the labor force unchanged. That gives \\(6/160 = 3.75\\%\\), which is close enough to look right and wrong in the reason.",
  },
  {
    id: "ap-macro-2",
    courseSlug: "ap-macro",
    unitNumber: 1,
    prompt:
      "An economy can produce either \\(200\\) tonnes of wheat or \\(50\\) machines with its resources. Calculate the opportunity cost of one machine, and explain what a point inside the curve means.",
    plan: [
      "Set up the trade-off as a ratio, then reduce it to a per-unit cost.",
      "Inside the curve is not 'efficient but unequal'. Say what it actually is.",
    ],
    example: [
      "The production possibilities curve has two endpoints: \\(200\\) tonnes of wheat with no machines, and \\(50\\) machines with no wheat.",
      "\\[\\text{Opportunity cost of one machine} = \\frac{200}{50} = 4\\text{ tonnes of wheat}\\]",
      "In the other direction, one tonne of wheat costs \\(\\frac{50}{200} = 0.25\\) of a machine.",
      "A point inside the curve means resources are not fully or not efficiently used: some workers are unemployed, or land is idle, or production is organized badly. More of both goods is possible without giving anything up, which is why the inside of the curve is the one place where the trade-off disappears.",
    ],
    because:
      "The ratio is computed in both directions, which is the check that the reciprocals are right, and the inside-the-curve explanation names the mechanisms. Saying 'more of both is possible' is the sentence that shows the definition was understood rather than memorized.",
    say: [
      "I wrote the two endpoints first, because the opportunity cost is the slope of the line between them.",
      "Two hundred divided by fifty is four, so each machine costs four tonnes of wheat. I checked the other direction and got a quarter.",
      "Inside the curve is not about fairness. It is about idle or badly used resources.",
      "That is why the curve is a frontier rather than a budget — everything inside it is a waste you could fix.",
    ],
    trap:
      "Reporting the opportunity cost upside down. Four tonnes of wheat per machine is right; four machines per tonne of wheat is the reciprocal, and the units tell you which is which.",
  },
  {
    id: "ap-macro-3",
    courseSlug: "ap-macro",
    unitNumber: 3,
    prompt:
      "The economy is \\(400\\) billion dollars below potential output and the marginal propensity to consume is \\(0.8\\). Calculate the minimum change in government spending needed to close the gap, and explain why it is the minimum.",
    plan: [
      "Multiplier first: \\(1/(1-\\text{MPC})\\). Then divide the gap by it.",
      "Say what the calculation assumes, because part (c) usually asks.",
    ],
    example: [
      "\\[\\text{multiplier} = \\frac{1}{1 - 0.8} = \\frac{1}{0.2} = 5\\]",
      "\\[\\Delta G = \\frac{400\\text{ billion}}{5} = 80\\text{ billion}\\]",
      "The government needs to increase spending by \\(80\\) billion, which through the multiplier produces \\(80 \\times 5 = 400\\) billion of additional real GDP, closing the gap.",
      "It is a minimum because the model assumes every dollar of new income is spent at the full MPC within the economy. If part of the spending goes to imports or is saved beyond the model, or if the increase in income raises interest rates and crowds out investment, the actual effect is smaller and the required spending is larger.",
    ],
    because:
      "The multiplier is computed before it is used, the result is stated with units, and the explanation of 'minimum' names two real-world leaks that make the model optimistic. Naming crowding out is what turns part (d) from a guess into an answer.",
    say: [
      "I computed the multiplier from the MPC first, because the gap divided by the multiplier is the whole calculation.",
      "Eighty billion times five is four hundred, which is exactly the gap, so the arithmetic checks itself.",
      "The word 'minimum' is doing the work in the question. The model gives the smallest number that could work, not the number that will work.",
      "Crowding out is my main reason. If the government borrows, interest rates rise, and investment falls, so the net effect is smaller.",
    ],
    trap:
      "Multiplying the gap by the multiplier instead of dividing. \\(400 \\times 5 = 2000\\) billion is a spectacular answer, and it comes from one inverted fraction.",
  },
  {
    id: "ap-macro-4",
    courseSlug: "ap-macro",
    unitNumber: 3,
    prompt:
      "Draw and explain the effect of an increase in government spending on an AD–AS diagram when the economy is already at potential output.",
    plan: [
      "Describe the axes, both curves, and the initial equilibrium before you move anything.",
      "Short run and long run give different answers. Say which one you are describing.",
    ],
    example: [
      "Graph: price level on the vertical axis and real GDP on the horizontal. Downward-sloping AD, upward-sloping SRAS, and vertical LRAS at potential output, with the initial equilibrium where AD and SRAS meet at the LRAS line.",
      "Short run: higher government spending shifts AD to the right. The new equilibrium lies on the same SRAS curve at a higher price level and higher real GDP, which is above potential. The gap between actual and potential output is an inflationary gap.",
      "Long run: the economy is above potential, so nominal wages and input prices adjust upward. SRAS shifts left until the new equilibrium is back at the LRAS line, at a higher price level and the original real GDP. The long-run effect of the spending is on the price level, not on output.",
      "Nominal GDP rises in the long run; real GDP does not.",
    ],
    because:
      "The answer distinguishes the short run from the long run, which is worth more than any single label, and it ends with the distinction between nominal and real GDP that the exam routinely asks for. Describing the graph in words is also what a student needs to do out loud.",
    say: [
      "I described the axes and the three curves before moving anything, because an unlabeled diagram earns nothing.",
      "In the short run, AD shifts right and output rises above potential. That is the inflationary gap.",
      "In the long run, wages catch up, SRAS shifts left, and output returns to potential with a higher price level.",
      "The sentence I would say last is that nominal GDP rose and real GDP did not. That is the difference the examiner is looking for.",
    ],
    trap:
      "Shifting LRAS. Government spending does not change potential output; it changes demand. Moving the vertical line is a five-second way to lose two points.",
  },
  {
    id: "ap-macro-5",
    courseSlug: "ap-macro",
    unitNumber: 4,
    prompt:
      "The central bank buys government bonds on the open market. Explain the effect on the money supply, the nominal interest rate, and investment, in that order.",
    plan: [
      "Chain the effects. Each step has to cause the next one, not merely follow it.",
      "Money market graph: vertical money supply, downward-sloping money demand.",
    ],
    example: [
      "Step 1 — money supply: the central bank buys bonds and pays for them by crediting reserves, so the money supply increases and the vertical money supply line shifts right.",
      "Step 2 — interest rate: with money demand unchanged, the rightward shift moves the equilibrium down the money demand curve, so the nominal interest rate falls.",
      "Step 3 — investment: a lower interest rate reduces the cost of borrowing, so investment spending rises. The increase in investment shifts aggregate demand right, which raises real GDP and the price level in the short run.",
      "The weak link is step 3. Investment responds to the real interest rate and to expectations about future demand, so a firm that expects a recession may not borrow even at a low rate.",
    ],
    because:
      "The chain is explicit and each step is caused by the one before it, and the last paragraph names the link most likely to fail. That is the difference between describing a transmission mechanism and reciting one.",
    say: [
      "I did it in the order the question asked, because each step causes the next and the order is the argument.",
      "Buying bonds increases reserves, so the money supply line moves right and the rate falls.",
      "Lower rates make borrowing cheaper, so investment rises, and that is what moves aggregate demand.",
      "The honest caveat is confidence. In a deep recession, cheap money does not make firms invest, which is why this mechanism sometimes fails.",
    ],
    trap:
      "Saying 'the central bank lowers the interest rate' as though it sets it directly. It changes reserves; the rate is the market's response, and the exam marks the mechanism.",
  },
  {
    id: "ap-macro-6",
    courseSlug: "ap-macro",
    unitNumber: 5,
    prompt:
      "The economy is at potential output and inflation is \\(3\\%\\). The central bank raises its target interest rate. Explain what happens to the short-run Phillips curve and why the long-run curve does not move.",
    plan: [
      "The short-run curve shifts; the long-run curve is a position. Say the difference in those terms.",
      "Name the variable that adjusts — expectations — not just 'wages'.",
    ],
    example: [
      "A contractionary policy reduces aggregate demand, so real GDP falls below potential and unemployment rises. Along the short-run Phillips curve, that movement is a trade-off: higher unemployment, lower inflation. The short-run curve has not shifted; the economy has moved along it.",
      "What shifts the short-run curve is expectations. Once workers and firms come to expect lower inflation, wage demands moderate and the curve shifts so that lower inflation is consistent with the natural rate of unemployment. The long-run Phillips curve is vertical at the natural rate, so it does not move with aggregate demand: in the long run, monetary policy changes the price level and not the unemployment rate.",
      "That is why the honest short answer is 'inflation falls and unemployment rises temporarily, and only the inflation change lasts'.",
    ],
    because:
      "The answer separates a movement along a curve from a shift of it, which is the distinction the question is testing, and it names expectations as the adjuster. Ending with a plain-language summary of the result is what makes it defensible out loud.",
    say: [
      "First I said which curve moves. Contractionary policy moves the economy along the short-run curve; expectations shift the curve later.",
      "The long-run curve is vertical at the natural rate, so it cannot move with demand. That is the whole point of calling it long run.",
      "So the unemployment increase is temporary and the inflation change is not.",
      "If asked why the natural rate sits where it does, I would say institutions and labor market structure, and I would not defend a precise number.",
    ],
    trap:
      "Saying the long-run Phillips curve shifts left. It does not shift; the short-run curve does, and the long-run curve is already vertical at the natural rate.",
  },
  {
    id: "ap-macro-7",
    courseSlug: "ap-macro",
    unitNumber: 6,
    prompt:
      "Country A's currency depreciates against Country B's. Explain the effect on A's exports, imports and net exports, and name one condition that would weaken the effect.",
    plan: [
      "Work through price effects in order: exports cheaper abroad, imports dearer at home.",
      "The condition is the part most students drop, and it is worth a point.",
    ],
    example: [
      "A depreciation makes A's goods cheaper in B's currency, so the quantity of A's exports tends to rise; it makes B's goods more expensive in A's currency, so the quantity of A's imports tends to fall. Both movements increase net exports \\((X - M)\\), which raises aggregate demand in A and can close a recessionary gap.",
      "The effect is weaker if import demand is inelastic. If A must import fuel and machinery whatever the price, the quantity of imports barely falls while the price of each import rises, so the import bill can increase and net exports can worsen before they improve. That pattern is the J-curve, and it is why a depreciation is not an automatic fix.",
    ],
    because:
      "Both price effects are spelled out with the currency in which each price changes, and the condition is a named mechanism with a direction. That is more than 'exports go up, imports go down'.",
    say: [
      "I said which currency each price changed in, because 'cheaper' is meaningless without saying cheaper for whom.",
      "The J-curve is the condition I would name. If import demand is inelastic, the bill rises before the volume falls.",
      "That is why a depreciation helps with a lag and sometimes not at all.",
      "The thing I would check before defending this hard is what A actually imports, because that decides the elasticity.",
    ],
    trap:
      "Assuming a depreciation always improves net exports. Volume takes time to adjust, and in the short run the price effect can dominate.",
  },
];

export const apMacroDefense: CourseDefense = {
  courseSlug: "ap-macro",
  claim:
    "That you can label the graph, state the direction of each shift, and say why the model is only a model.",
  frames: [
    "The axes are…, and the initial equilibrium is…",
    "The curve that shifts is…, and the direction is…, because…",
    "The multiplier is…, so the arithmetic is…",
    "This result assumes…, and in the real world…",
    "The short-run and long-run answers differ, and here is why.",
  ],
  markedOn: [
    "Whether the graph is labeled before it is used",
    "Whether the shift direction is stated with a reason",
    "Whether the arithmetic is shown and the units named",
    "Whether you can name a real-world leak in the model",
  ],
  units: [
    {
      unitNumber: 1,
      keep: ["One definition said precisely", "One example of an opportunity cost"],
      question: "\"Is every purchase a cost to the economy?\"",
      answer: [
        "No. A transfer or an intermediate good can raise spending without raising output, which is the distinction I would draw first.",
        "The test I would use is whether the transaction is counted in GDP, and that depends on what is being bought.",
        "That distinction is why I can say two countries had the same spending and different output without contradicting myself.",
      ],
    },
    {
      unitNumber: 2,
      keep: ["Unemployed and labor force, separately", "One person who is not counted"],
      question: "\"Does the unemployment rate measure how hard it is to find work?\"",
      answer: [
        "Imperfectly. Someone who has stopped looking is not in the labor force, so they are not counted as unemployed.",
        "That is why the rate can fall while nothing improves.",
        "Participation is the number I would report beside it.",
      ],
    },
    {
      unitNumber: 3,
      keep: ["The multiplier", "The gap it closes"],
      question: "\"Why divide by the multiplier instead of multiplying?\"",
      answer: [
        "Because the multiplier tells me how much output each dollar of spending produces, so the spending needed is the gap divided by it.",
        "My check is that my answer times the multiplier returns the gap.",
        "The result is a minimum, because the model assumes no leak of demand abroad or into saving beyond the MPC.",
      ],
    },
    {
      unitNumber: 4,
      keep: ["The direction of the money supply shift", "The direction of the interest-rate movement"],
      question: "\"Why does buying bonds increase the money supply?\"",
      answer: [
        "Because the central bank pays for the bonds by crediting reserves, so I get more reserves and a larger money supply in the same step.",
        "On my diagram the vertical supply line moves right, and the rate falls along the money demand curve rather than being pushed down by anyone.",
        "The part I would stress is that the rate is a market result, not a decree, because that is where most explanations go wrong.",
      ],
    },
    {
      unitNumber: 5,
      keep: ["A short-run effect", "The long-run adjustment"],
      question: "\"Does expansionary policy raise output forever?\"",
      answer: [
        "No. In the long run wages adjust, SRAS shifts, and output returns to potential with a higher price level.",
        "The short-run gain in real GDP is real, and it is temporary.",
        "That is why I distinguish nominal from real GDP when I say what rose.",
      ],
    },
    {
      unitNumber: 6,
      keep: ["The direction of the currency change", "The condition under which it does not help"],
      question: "\"Does a weaker currency always help exporters?\"",
      answer: [
        "No. If import demand is inelastic, the import bill rises before volumes adjust.",
        "That is the J-curve, and it is why the improvement comes with a lag.",
        "I would want to know what the country imports before predicting the size of the effect.",
      ],
    },
  ],
};
