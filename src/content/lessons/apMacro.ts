import { section } from "./build";
import type { Lesson } from "./types";

/** Current College Board framework: six units, 60 multiple-choice questions, and three free-response questions. */
export const apMacroLessons: Lesson[] = [
  {
    unitNumber: 1,
    title: "Unit 1 · Basic economic concepts",
    description: "Start from scarcity and opportunity cost, model choices with the production possibilities curve, specialize through comparative advantage, and read supply and demand as one market system.",
    examWeight: "5–10% of multiple-choice weighting",
    objectives: [
      "Explain scarcity, choice, and opportunity cost using the production possibilities curve.",
      "Calculate comparative advantage and mutually beneficial terms of trade from an output table.",
      "Predict how demand and supply shifters change equilibrium price and quantity.",
    ],
    sections: [
      section("Scarcity forces every choice", ["cb-macro-ced", "openstax-macro"], `
Economics begins with scarcity: human wants exceed the resources available to satisfy them, so every choice involves giving something up. The true cost of a decision is its **opportunity cost**, the value of the next-best alternative forgone. A student who spends an hour reviewing flashcards gives up the value of the best other use of that hour, whether that is sleep, work, or another subject.

Macroeconomics studies economy-wide aggregates such as total output, the overall price level, unemployment, and growth, while microeconomics studies individual markets and decision makers. The boundary is practical rather than absolute. A drought in one crop market is a microeconomic shock, but if it raises food prices across the economy and changes inflation, it becomes part of the macroeconomic story as well.
`),
      section("The production possibilities curve", ["cb-macro-ced", "openstax-macro"], `
The **production possibilities curve (PPC)** shows the maximum combinations of two goods an economy can produce with its current resources and technology, assuming full and efficient employment. Points on the curve are efficient, points inside are inefficient, and points outside are unattainable for now. Moving along the curve makes opportunity cost visible: producing more of one good requires releasing resources from the other.

A bowed-out PPC reflects the **law of increasing opportunity cost**: resources are not equally suited to both goods, so each additional unit of one good requires sacrificing ever larger amounts of the other. The curve shifts outward with more resources, better technology, or improved productivity, which is why the PPC doubles as the economy's simplest picture of long-run economic growth.
`),
      section("Comparative advantage and trade", ["cb-macro-ced", "openstax-macro"], `
A country has an **absolute advantage** when it can produce more of a good with the same resources. Trade, however, follows **comparative advantage**: the producer with the lower opportunity cost should specialize. Even a country that is better at producing everything gains by specializing where its advantage is greatest and trading for the rest, because total output rises when each producer concentrates on low-opportunity-cost production.

To find comparative advantage from an output table, calculate each producer's opportunity cost for each good and compare. Mutually beneficial terms of trade must lie between the two producers' opportunity costs; outside that range, one side does better producing for itself. Exam questions reward showing the opportunity-cost arithmetic rather than guessing from the biggest output number.
`),
      section("Demand, supply, and equilibrium", ["cb-macro-ced", "openstax-macro"], `
The law of demand says that, other things equal, a higher price reduces the quantity demanded, producing a downward-sloping demand curve. Demand itself shifts when income, tastes, expectations, the prices of substitutes or complements, or the number of buyers change. A change in the good's own price moves along the curve; only a change in a non-price determinant shifts it.

Supply slopes upward because higher prices make additional production profitable. Input prices, technology, taxes and subsidies, expectations, and the number of sellers shift supply. Equilibrium occurs where quantity supplied equals quantity demanded. When both curves shift, one of the two outcomes, price or quantity, may be indeterminate, and recognizing that ambiguity is itself a tested skill.
`),
      section("How Unit 1 is tested", ["cb-macro-ced", "cb-macro-exam", "cb-macro-frq"], `
Unit 1 questions are usually short, but they set up the graph literacy the whole exam assumes. Expect PPC questions that ask you to identify opportunity cost from a movement between points, comparative-advantage tables that require computing both opportunity costs, and market questions where two shifters act at once and one outcome cannot be determined.

Free-response questions often embed Unit 1 inside a larger scenario, for example asking how trade changes a country's consumption possibilities. Drawing practice matters here: label axes with the two goods, mark the specific points the question names, and state opportunity cost in units of the good given up, not in vague language about trade-offs.
`),
    ],
    glossary: [
      { term: "Opportunity cost", definition: "The value of the next-best alternative given up when a choice is made." },
      { term: "Production possibilities curve", definition: "A model showing maximum attainable combinations of two goods given current resources and technology." },
      { term: "Comparative advantage", definition: "The ability to produce a good at a lower opportunity cost than another producer." },
      { term: "Law of demand", definition: "The inverse relationship between a good's price and the quantity demanded, other things equal." },
    ],
    examAlignment: {
      title: "Foundational models and trade arithmetic",
      description: "The opening unit supplies the scarcity model, the trade calculation, and the market graph used across the exam.",
      criteria: [
        "State opportunity cost numerically from PPC points or an output table.",
        "Place terms of trade strictly between the two producers' opportunity costs.",
        "Distinguish a movement along a curve from a shift of the curve and explain the determinant responsible.",
      ],
      sources: ["cb-macro-ced", "cb-macro-exam", "cb-macro-frq"],
    },
    practice: [
      {
        question: "Country A can produce 40 cars or 80 phones. Country B can produce 10 cars or 30 phones. Which statement is correct?",
        options: ["B has the comparative advantage in cars.", "A's opportunity cost of one car is 2 phones, and B's is 3 phones, so A has the comparative advantage in cars.", "B has the absolute advantage in both goods.", "No trade can benefit both countries."],
        correctIndex: 1,
        explanation: "A gives up 80/40 = 2 phones per car; B gives up 30/10 = 3 phones per car. The lower opportunity cost wins, so A specializes in cars.",
        skill: "Comparative advantage calculation",
      },
      {
        question: "An economy currently produces inside its production possibilities curve. Which event would move it toward the curve without shifting it?",
        options: ["A new technology raises productivity in both industries.", "Unemployed workers find jobs using existing equipment.", "The labor force grows through immigration.", "Capital stock increases through investment."],
        correctIndex: 1,
        explanation: "Points inside the curve represent idle resources. Employing them moves production to the existing frontier; the other choices shift the frontier outward.",
        skill: "PPC interpretation",
      },
      {
        question: "If \\(\\mathrm{MPC}=0.75\\), the maximum possible increase in real GDP from a $40 billion rise in investment is",
        options: ["$160 billion, because the spending multiplier is \\(\\dfrac{1}{1-0.75}=4\\)", "$30 billion, because only part of the investment is spent", "$40 billion, because multipliers apply only to government", "$120 billion, because the multiplier is always exactly three"],
        correctIndex: 0,
        explanation: "The multiplier is \\(\\dfrac{1}{1-\\mathrm{MPC}}=\\dfrac{1}{0.25}=4\\), so $40 billion of initial spending can expand GDP by up to \\(4\\times 40=\\$160\\) billion through successive rounds of spending.",
        skill: "Spending multiplier",
      },
      {
        question: "An economy produces both consumer and capital goods on its production possibilities curve. Moving toward more capital goods today most likely results in",
        options: ["slower consumption now but faster economic growth in the future", "more consumption goods both now and in every future year", "an immediate inward shift of the entire curve", "full employment being permanently impossible"],
        correctIndex: 0,
        explanation: "Capital goods build future productive capacity; the PPC shows the opportunity cost today (fewer consumer goods) that purchases a larger PPC tomorrow.",
        skill: "Production possibilities and growth",
      },
    ],
  },
  {
    unitNumber: 2,
    title: "Unit 2 · Economic indicators and the business cycle",
    description: "Measure the economy with GDP, unemployment, and price indexes, separate nominal values from real ones, and locate expansions and recessions on the business cycle.",
    examWeight: "12–17% of multiple-choice weighting",
    objectives: [
      "Calculate GDP with the expenditures approach and explain what the measure excludes.",
      "Compute unemployment and labor-force participation rates and classify types of unemployment.",
      "Use a price index to calculate inflation and convert nominal values into real values.",
    ],
    sections: [
      section("GDP: measuring total production", ["cb-macro-ced", "bea-gdp", "openstax-macro"], `
**Gross domestic product (GDP)** is the market value of all final goods and services produced within a country during a specific period. The expenditures approach adds consumption, gross private investment, government purchases, and net exports. Final goods only are counted, because intermediate inputs are already embodied in the final product's price; counting both would double count the same production.

GDP deliberately excludes several things students often try to add: used goods, purely financial transactions such as stock purchases, transfer payments, and unpaid household production. It also says nothing directly about distribution or well-being. The Bureau of Economic Analysis publishes the official estimates, and exam questions frequently test whether a described transaction belongs in GDP and, if so, in which component.
`),
      section("Nominal values, real values, and the GDP deflator", ["cb-macro-ced", "bea-gdp"], `
Nominal GDP values output at current prices, so it can rise simply because prices rose. Real GDP values output at base-year prices, isolating changes in actual production. The **GDP deflator**, nominal GDP divided by real GDP times 100, is a broad price index covering all domestically produced final goods and services, unlike the consumer-focused CPI.

A quick calculation discipline prevents most errors: if nominal GDP grows faster than real GDP, the deflator rose and the economy experienced inflation. If real GDP falls for a sustained period while unemployment rises, the economy is in recession. Always check whether a question asks about the level of output, its growth rate, or its price-adjusted value before choosing an answer.
`),
      section("Unemployment and the labor force", ["cb-macro-ced", "bls-data", "openstax-macro"], `
The Bureau of Labor Statistics counts people as employed, unemployed, or out of the labor force. The unemployed are jobless, available for work, and actively looking; discouraged workers who stopped searching are outside the labor force, which is why the headline unemployment rate can fall for an unwelcome reason. The unemployment rate is the unemployed divided by the labor force, times 100.

Frictional unemployment comes from normal job search, structural unemployment from skills or locations that no longer match available jobs, and cyclical unemployment from downturns. At the **natural rate of unemployment**, cyclical unemployment is zero but frictional and structural unemployment remain, so full employment never means a measured rate of zero percent.
`),
      section("Inflation and the consumer price index", ["cb-macro-ced", "bls-data"], `
The **consumer price index (CPI)** compares the cost of a fixed market basket in a given year with its cost in a base year, times 100. The inflation rate is the percentage change in the index between periods. Because the basket is fixed, the CPI can overstate inflation when consumers substitute toward relatively cheaper goods, and it may lag changes in product quality and new goods.

Inflation redistributes purchasing power in predictable ways. Unexpected inflation benefits borrowers repaying fixed-rate loans in cheaper dollars and hurts lenders and savers holding cash. Menu costs, shoe-leather costs, and distorted price signals explain why economists treat high or volatile inflation as costly even when some individual debtors gain from it.
`),
      section("The business cycle and Unit 2 calculations", ["cb-macro-ced", "cb-macro-exam", "cb-macro-frq"], `
The business cycle moves through expansion, peak, contraction, and trough in real GDP. The cycle diagram connects directly to later units: a recessionary gap in the AD–AS model is the same event as the contraction phase here, and cyclical unemployment rises exactly then. Treating these as one story told by different models is the core study strategy for macroeconomics.

Released free-response questions repeatedly ask for the same calculation family: GDP from components, a missing unemployment or participation rate, CPI and inflation from a small basket, and a real-versus-nominal conversion. Write the formula first, substitute carefully, and label the result with its unit, because several answer choices usually differ only by a misplaced division.
`),
    ],
    glossary: [
      { term: "GDP deflator", definition: "A broad price index equal to nominal GDP divided by real GDP, times 100." },
      { term: "Natural rate of unemployment", definition: "The unemployment rate from frictional and structural sources when cyclical unemployment is zero." },
      { term: "Consumer price index", definition: "An index comparing the cost of a fixed consumer market basket with its base-year cost." },
      { term: "Labor force", definition: "The sum of employed people and unemployed people actively seeking work." },
    ],
    examAlignment: {
      title: "Measurement accuracy under time pressure",
      description: "Unit 2 supplies the indicator definitions and formulas that later policy analysis depends on.",
      criteria: [
        "Place each transaction in the correct GDP component or exclude it with a stated reason.",
        "Keep nominal and real magnitudes separate and use the deflator or CPI consistently.",
        "Distinguish the unemployment rate from the labor-force participation rate in both formula and interpretation.",
      ],
      sources: ["cb-macro-ced", "cb-macro-exam", "cb-macro-frq"],
    },
    practice: [
      {
        question: "An economy has 90 employed people, 10 unemployed people, and 25 people not in the labor force. What is the unemployment rate?",
        options: ["8%", "10%", "11.1%", "12.5%"],
        correctIndex: 1,
        explanation: "The labor force is 90 + 10 = 100. The unemployment rate is 10/100 × 100 = 10%. People outside the labor force are excluded from both parts of the ratio.",
        skill: "Labor-market calculation",
      },
      {
        question: "Nominal GDP rises 8% while real GDP rises 3%. What most likely happened to the price level?",
        options: ["It fell about 5%.", "It was unchanged.", "It rose about 5%.", "It rose exactly 11%."],
        correctIndex: 2,
        explanation: "Nominal growth approximately equals real growth plus inflation. With 8% nominal and 3% real growth, the GDP deflator rose by roughly 5%.",
        skill: "Nominal versus real interpretation",
      },
      {
        question: "In a year when nominal GDP rises 6% and the GDP deflator rises 4%, real GDP approximately",
        options: ["rises 2%, since real growth removes the price-level increase", "rises 10%, adding output and inflation together", "falls 2%, because inflation always reduces real output", "stays unchanged, since nominal and real GDP move together"],
        correctIndex: 0,
        explanation: "Real GDP strips out inflation: \\(6\\%-4\\%=2\\%\\). The deflator, defined as \\(\\dfrac{\\text{Nominal GDP}}{\\text{Real GDP}}\\times 100\\), is exactly the tool that separates price change from output change.",
        skill: "Nominal vs. real GDP",
      },
      {
        question: "A 55-year-old engineer, laid off six months ago, has stopped applying for jobs after repeated rejections. In official statistics this person is best classified as",
        options: ["a discouraged worker, counted as out of the labor force", "frictionally unemployed and actively seeking work", "cyclically unemployed within the labor force", "structurally unemployed but counted as employed"],
        correctIndex: 0,
        explanation: "Unemployment counts require active job search; discouraged workers leave the labor force, which can make the headline unemployment rate look better even as conditions stay weak.",
        skill: "Labor force measurement",
      },
    ],
  },
  {
    unitNumber: 3,
    title: "Unit 3 · National income and price determination",
    description: "Build the AD–AS model, explain short-run and long-run equilibrium, multiply an initial spending change through the economy, and evaluate fiscal policy responses to output gaps.",
    examWeight: "17–27% of multiple-choice weighting",
    objectives: [
      "Draw and shift aggregate demand and short-run and long-run aggregate supply correctly.",
      "Identify recessionary and inflationary gaps and the self-correction mechanism for each.",
      "Calculate the spending and tax multipliers and the policy change needed to close a gap.",
    ],
    sections: [
      section("Aggregate demand and aggregate supply", ["cb-macro-ced", "openstax-macro"], `
**Aggregate demand (AD)** shows the total quantity of real GDP demanded at each price level; it slopes downward because of the wealth effect, the interest-rate effect, and the exchange-rate effect. Consumption, investment, government purchases, and net exports shift AD, so any Unit 2 spending component can reappear here as a shifter with a story attached.

Short-run aggregate supply (SRAS) slopes upward because sticky wages and prices make output profitable to expand when the price level rises unexpectedly. Long-run aggregate supply (LRAS) is vertical at potential output, determined by resources, technology, and institutions rather than the price level. Input prices, productivity, and supply-side policies shift SRAS; only changes in productive capacity shift LRAS.
`),
      section("Equilibrium, gaps, and self-correction", ["cb-macro-ced", "openstax-macro"], `
Short-run equilibrium occurs where AD crosses SRAS. If that output is below potential, the economy has a **recessionary gap** with unemployment above the natural rate; above potential, an **inflationary gap** puts downward pressure on resources and upward pressure on wages and input prices. Naming the gap correctly is the first scored step in most long free-response questions.

In the long run, the economy self-corrects. A recessionary gap eventually lowers nominal wages and input prices, shifting SRAS right until output returns to potential at a lower price level. An inflationary gap does the reverse. The adjustment is slow, which is precisely why policymakers consider intervening rather than waiting for wages and contracts to renegotiate.
`),
      section("The multiplier process", ["cb-macro-ced", "cb-macro-exam"], `
An initial change in spending becomes a larger change in GDP because one person's spending is another's income, part of which is spent again. The **marginal propensity to consume (MPC)** is the fraction of additional income spent; the marginal propensity to save is 1 minus MPC. The simple spending multiplier equals 1/(1 − MPC), so an MPC of 0.8 produces a multiplier of 5.

The tax multiplier is smaller in absolute value, MPC/(1 − MPC), because a tax cut first raises disposable income and only the consumed fraction enters the spending stream. Balanced-budget changes, where spending and taxes rise by the same amount, still expand GDP in the simple model because the spending multiplier exceeds the tax multiplier by exactly one.
`),
      section("Fiscal policy and its limits", ["cb-macro-ced", "openstax-macro", "cb-macro-frq"], `
**Fiscal policy** is the use of government purchases and taxes to shift aggregate demand. Expansionary policy, higher purchases or lower taxes, targets a recessionary gap; contractionary policy targets an inflationary gap. The required change in purchases equals the size of the gap divided by the multiplier, a calculation the exam asks for in both multiple-choice and free-response formats.

Fiscal policy works with lags: recognizing the downturn, passing legislation, and implementing programs all take time, and the economy may have begun self-correcting meanwhile. Automatic stabilizers such as unemployment insurance and progressive taxes respond without new legislation. Government borrowing to finance deficits can also raise interest rates and crowd out private investment, a connection developed fully in Unit 5.
`),
      section("How Unit 3 is tested", ["cb-macro-ced", "cb-macro-exam", "cb-macro-frq"], `
Unit 3 is the heaviest-weighted part of the course and the backbone of the long free-response question. The standard task gives you an economy in a stated gap, asks for a correctly labeled AD–AS graph, then chains a fiscal or monetary action through the money or loanable funds market and into output, employment, and the price level. Each link is scored separately, so one early error does not erase later reasoning if each step follows from the previous one.

Graph discipline earns quiet points: label the price level and real GDP axes, mark potential output with LRAS, and show the equilibrium moving in the direction the question's policy implies. When a question asks you to calculate the minimum change in purchases, divide the gap by the multiplier rather than multiplying, the single most common arithmetic slip in this unit.
`),
    ],
    glossary: [
      { term: "Recessionary gap", definition: "The amount by which short-run equilibrium output falls below potential output." },
      { term: "Marginal propensity to consume", definition: "The fraction of an additional dollar of income that households spend on consumption." },
      { term: "Spending multiplier", definition: "1/(1 − MPC): the total change in real GDP resulting from an initial change in spending." },
      { term: "Fiscal policy", definition: "Government use of purchases and taxes to influence aggregate demand and stabilize output." },
    ],
    examAlignment: {
      title: "The central model and the long FRQ chain",
      description: "AD–AS analysis with multiplier arithmetic anchors the largest share of both exam sections.",
      criteria: [
        "Draw AD, SRAS, and LRAS with labeled axes and identify the stated gap before applying any policy.",
        "Divide the gap by the multiplier to size a fiscal response, and explain the direction of each shift.",
        "Describe long-run self-correction through wage and input-price adjustment shifting SRAS.",
      ],
      sources: ["cb-macro-ced", "cb-macro-exam", "cb-macro-frq"],
    },
    practice: [
      {
        question: "The MPC is 0.75 and the economy has a recessionary gap of $200 billion. Ignoring crowding out and taxes on new income, the increase in government purchases needed to close the gap is:",
        options: ["$50 billion", "$150 billion", "$200 billion", "$800 billion"],
        correctIndex: 0,
        explanation: "The multiplier is 1/(1 − 0.75) = 4. Required purchases = gap ÷ multiplier = 200/4 = $50 billion.",
        skill: "Multiplier policy calculation",
      },
      {
        question: "An economy is in long-run equilibrium. A sustained increase in consumer confidence will, in the short run, cause:",
        options: ["AD to shift left, lowering output and the price level.", "AD to shift right, raising output above potential and raising the price level.", "SRAS to shift right, lowering the price level.", "LRAS to shift left, creating a recessionary gap."],
        correctIndex: 1,
        explanation: "Consumer confidence raises consumption, shifting AD right. Output temporarily exceeds potential and the price level rises, opening an inflationary gap.",
        skill: "AD–AS shift analysis",
      },
      {
        question: "A $10 billion tax cut with \\(\\mathrm{MPC}=0.8\\) has a smaller GDP effect than $10 billion of government purchases primarily because",
        options: ["households save part of the tax cut, so only $8 billion enters the spending stream initially", "tax cuts never affect consumption at any income level", "government purchases are counted twice in national accounts", "the tax multiplier is always equal to zero in practice"],
        correctIndex: 0,
        explanation: "The tax multiplier is \\(-\\dfrac{\\mathrm{MPC}}{1-\\mathrm{MPC}}=-4\\) versus \\(5\\) for purchases; first-round saving of $2 billion is the entire difference.",
        skill: "Tax vs. spending multipliers",
      },
      {
        question: "If the economy is in a recessionary gap and the government pursues expansionary fiscal policy, the AD–AS model predicts equilibrium will move toward",
        options: ["higher real GDP and a higher price level as aggregate demand shifts right", "lower real GDP and a lower price level in the short run", "unchanged GDP with only the price level rising", "full employment with a permanently lower price level"],
        correctIndex: 0,
        explanation: "Government purchases or tax cuts shift AD right, closing the output gap while putting upward pressure on prices—the standard Unit 3 policy chain.",
        skill: "AD–AS policy analysis",
      },
    ],
  },
  {
    unitNumber: 4,
    title: "Unit 4 · Financial sector",
    description: "Follow money from bank balance sheets into the money market, separate nominal from real interest rates, and explain how the central bank conducts monetary policy in limited- and ample-reserve systems.",
    examWeight: "18–23% of multiple-choice weighting",
    objectives: [
      "Use a bank balance sheet to calculate required and excess reserves and the maximum money creation.",
      "Draw the money market and determine the nominal interest rate and its response to policy.",
      "Explain monetary policy tools in both limited-reserve and ample-reserve banking systems.",
    ],
    sections: [
      section("Money, banks, and the money multiplier", ["cb-macro-ced", "federal-reserve", "openstax-macro"], `
Money serves as a medium of exchange, a unit of account, and a store of value. The money supply most often referenced in this course is M1-style: currency plus checkable deposits. Banks create money when they lend, because a new loan becomes a new deposit elsewhere in the banking system while only a fraction is held back as reserves.

A bank's balance sheet balances assets, reserves plus loans and securities, against liabilities, chiefly customer deposits. With a reserve requirement of 10 percent, a new deposit of 1,000 dollars requires 100 dollars of reserves and permits 900 dollars of lending. The simple **money multiplier**, 1 divided by the reserve ratio, gives the maximum possible expansion of the money supply from new reserves, assuming no currency drain and willing borrowers.
`),
      section("The money market and nominal interest rates", ["cb-macro-ced", "federal-reserve"], `
The money market graph places the nominal interest rate on the vertical axis and the quantity of money on the horizontal. Money demand slopes downward because at lower interest rates the opportunity cost of holding money falls. A vertical money supply, set by the central bank in the standard model, intersects money demand to determine the nominal interest rate.

Transactions and precautionary motives shift money demand when real GDP, the price level, or payment technology changes. Monetary policy shifts money supply. Keeping the two apart is the unit's key discipline: an increase in income shifts money demand right and raises the nominal rate, while an open-market purchase shifts money supply right and lowers it.
`),
      section("Nominal rates, real rates, and loanable funds", ["cb-macro-ced", "openstax-macro"], `
The **Fisher effect** links the nominal interest rate to the real rate plus expected inflation. Lenders care about the real rate, the purchasing-power return, while borrowers can be helped by unexpected inflation that erodes the real value of fixed-rate debt. Expected inflation is therefore built into nominal loan contracts from the start.

The **loanable funds market** models real interest rates using the supply of saving and the demand for investment borrowing. Government deficits increase the demand for loanable funds or reduce national saving, raising real rates. Foreign capital inflows increase supply and lower real rates. This graph, not the money market, is where crowding out and international capital flows are drawn.
`),
      section("Monetary policy: limited and ample reserves", ["cb-macro-ced", "federal-reserve", "cb-macro-exam"], `
In a limited-reserve system, the central bank moves the money supply with open-market operations, the discount rate, and the reserve requirement; buying securities increases reserves and lowers the federal funds rate. Modern systems with **ample reserves** instead steer rates mainly by changing administered rates, especially interest on reserve balances, because reserves are already abundant and small quantity changes barely move the market rate.

Either way, the transmission chain the exam tests is the same: policy shifts the money market, the nominal interest rate changes, interest-sensitive investment and consumption respond, and aggregate demand shifts. In ample-reserve questions, drawing a huge money-supply shift is the classic trap; the scored action is the change in administered rates and the resulting interest-rate movement.
`),
      section("How Unit 4 is tested", ["cb-macro-ced", "cb-macro-exam", "cb-macro-frq"], `
Unit 4 questions chain balance-sheet arithmetic to graph shifts. A typical free-response part states a deposit, gives the reserve ratio, and asks for the immediate change in demand deposits, required reserves, and excess reserves, then the maximum change in the money supply after full lending. Work line by line and remember that the initial deposit itself counts in the maximum money-supply change.

Graph questions then ask which market to draw. Short-run interest-rate effects of central-bank actions belong in the money market with nominal rates; saving, investment, deficits, and capital flows belong in loanable funds with real rates. Choosing the correct graph before shifting anything is where most Unit 4 points are actually won or lost.
`),
    ],
    glossary: [
      { term: "Money multiplier", definition: "1/reserve ratio: the maximum factor by which bank lending can expand the money supply from new reserves." },
      { term: "Fisher effect", definition: "The tendency of nominal interest rates to adjust with expected inflation, keeping real rates stable." },
      { term: "Loanable funds market", definition: "The model matching saving supply with investment demand to determine the real interest rate." },
      { term: "Ample reserves", definition: "A banking regime where reserves are abundant and policy works mainly through administered interest rates." },
    ],
    examAlignment: {
      title: "Balance sheets, interest rates, and the policy chain",
      description: "Unit 4 connects bank arithmetic to the interest-rate mechanism that moves aggregate demand.",
      criteria: [
        "Calculate required reserves, excess reserves, and maximum money creation step by step.",
        "Use the money market for nominal rates and loanable funds for real rates, never interchangeably.",
        "State whether the scenario is limited- or ample-reserve before naming the effective policy tool.",
      ],
      sources: ["cb-macro-ced", "cb-macro-exam", "cb-macro-frq"],
    },
    practice: [
      {
        question: "A bank receives a new $5,000 deposit. The reserve requirement is 20%. After the deposit, the bank's maximum additional lending from this deposit is:",
        options: ["$1,000", "$4,000", "$5,000", "$25,000"],
        correctIndex: 1,
        explanation: "Required reserves are 20% × 5,000 = $1,000. The remaining $4,000 is excess reserves available to lend immediately.",
        skill: "Bank balance-sheet calculation",
      },
      {
        question: "In an ample-reserve system, the central bank wants to raise short-term nominal interest rates. The most direct action is to:",
        options: ["Sell securities to drain most reserves from the system.", "Raise the interest rate paid on reserve balances.", "Raise the reserve requirement to 100%.", "Increase the money multiplier."],
        correctIndex: 1,
        explanation: "With ample reserves, administered rates such as interest on reserve balances set a floor that pulls market rates up; quantity operations have little effect.",
        skill: "Monetary policy regimes",
      },
      {
        question: "The money multiplier when the reserve requirement is 20% and banks hold no excess reserves is",
        options: ["\\(5\\), because \\(\\dfrac{1}{0.20}=5\\)", "\\(0.20\\), because only reserves can be lent", "\\(20\\), because each dollar creates twenty dollars", "\\(2\\), because half of every deposit is retained"],
        correctIndex: 0,
        explanation: "The maximum multiplier is the reciprocal of the reserve ratio: \\(\\dfrac{1}{\\mathrm{rr}}=\\dfrac{1}{0.20}=5\\); excess reserves or cash holdings make the real-world multiplier smaller.",
        skill: "Money creation",
      },
      {
        question: "When the Federal Reserve buys government securities in open-market operations, the immediate effect is to",
        options: ["increase bank reserves and the money supply, putting downward pressure on the federal funds rate", "decrease bank reserves and contract the money supply", "raise the reserve requirement for all commercial banks", "increase taxes to finance the federal deficit"],
        correctIndex: 0,
        explanation: "The Fed pays for securities with newly created reserves; more reserves let banks lend more, expanding money and lowering short-term interest rates.",
        skill: "Monetary policy tools",
      },
    ],
  },
  {
    unitNumber: 5,
    title: "Unit 5 · Long-run consequences of stabilization policies",
    description: "Trace what stabilization leaves behind: Phillips curve trade-offs, budget deficits and national debt, crowding out, the quantity theory of money, and the sources of long-run growth.",
    examWeight: "13–17% of multiple-choice weighting",
    objectives: [
      "Use short-run and long-run Phillips curves to show inflation–unemployment relationships and expectations shifts.",
      "Explain how deficits, debt, and crowding out affect real interest rates and investment.",
      "Apply the quantity theory of money and identify policies that shift LRAS and produce growth.",
    ],
    sections: [
      section("The Phillips curve in the short run and long run", ["cb-macro-ced", "openstax-macro"], `
The short-run **Phillips curve (SRPC)** shows an inverse relationship between the inflation rate and the unemployment rate. Expansionary policy moves the economy up along the SRPC: unemployment falls below the natural rate while inflation rises. Contractionary policy moves it down. The curve is the AD–AS story restated, since a rightward AD shift raises both output and the price level.

The long-run Phillips curve (LRPC) is vertical at the natural rate of unemployment. Once expectations adjust, no permanent trade-off remains: the economy returns to natural unemployment at a higher inflation rate, and the SRPC shifts up by the amount expectations rose. Supply shocks shift the SRPC itself, producing the painful combination of higher inflation and higher unemployment called stagflation.
`),
      section("Deficits, debt, and crowding out", ["cb-macro-ced", "openstax-macro"], `
A budget **deficit** is the annual gap between government spending and tax revenue; the national **debt** is the accumulated stock of past deficits minus surpluses. Financing a deficit means selling government securities, which competes with private borrowers. In the loanable funds market, that added demand raises the real interest rate and reduces private investment, the **crowding out** effect that can blunt fiscal policy's impact on long-run growth.

Crowding out is a matter of degree, not an all-or-nothing law. In a deep recession with idle saving, deficit spending may mainly mobilize unused resources; near full employment, the interest-rate offset is stronger. Foreign purchases of government securities add to the supply of loanable funds and can hold real rates down, at the cost of greater external indebtedness.
`),
      section("Money growth and the quantity theory", ["cb-macro-ced", "federal-reserve", "cb-macro-exam"], `
The equation of exchange, M × V = P × Y, states that the money supply times its velocity equals the price level times real output, which is nominal GDP. As an identity it is always true; as the **quantity theory of money**, it adds the assumptions that velocity and real output are stable in the long run. Under those assumptions, sustained money growth translates proportionally into inflation.

This is why rapid money creation to finance government deficits historically accompanies high inflation and, at extremes, hyperinflation. In the long run money is approximately neutral: doubling the money supply eventually doubles prices without changing real output, real wages, or real interest rates. Short-run non-neutrality, through sticky prices and the interest-rate channel, is what gives monetary policy its stabilization role in the first place.
`),
      section("Long-run economic growth", ["cb-macro-ced", "openstax-macro", "bea-gdp"], `
Long-run growth means a rising LRAS and an outward-shifting PPC: more real output per person over time. Its sources are accumulating physical capital, developing human capital through education and health, securing property rights and stable institutions, and above all improving technology and productivity. Growth rates compound, so small annual differences produce large income differences across decades.

Policy supports growth mainly from the supply side: public investment in infrastructure and research, incentives for saving and private investment, education funding, and openness to trade and ideas. Demand-management policies stabilize the economy around potential, but they do not by themselves raise potential. Exam questions test exactly this boundary by asking which policies shift LRAS rather than merely shifting AD.
`),
      section("How Unit 5 is tested", ["cb-macro-ced", "cb-macro-exam", "cb-macro-frq"], `
Unit 5 questions integrate earlier models, so they reward students who can hold two graphs at once. A typical sequence asks for the Phillips curve response to a policy, then the loanable funds consequence of the resulting deficit, then the effect on investment and long-run growth. Practicing those chains as connected paragraphs, not isolated graphs, is the efficient preparation.

Calculation prompts here are usually proportional: given money growth and real growth under the quantity theory, find inflation; given a deficit and interest rates, reason about debt burdens. The conceptual trap to avoid is treating the national debt like household debt in every respect; governments refinance maturing debt and can grow out of debt ratios, while still facing real crowding-out and interest-cost constraints.
`),
    ],
    glossary: [
      { term: "Phillips curve", definition: "A model relating the inflation rate and the unemployment rate, inverse in the short run and vertical in the long run." },
      { term: "Crowding out", definition: "The reduction in private investment caused when government borrowing raises real interest rates." },
      { term: "Quantity theory of money", definition: "The long-run proposition that, with stable velocity and output, money growth determines inflation." },
      { term: "National debt", definition: "The accumulated stock of government borrowing from past deficits net of surpluses." },
    ],
    examAlignment: {
      title: "Second-round effects of stabilization",
      description: "Unit 5 asks what remains after the gap closes: expectations, debt, interest rates, and growth capacity.",
      criteria: [
        "Move along the SRPC for demand shocks and shift it for expectation changes or supply shocks.",
        "Show crowding out in the loanable funds market and connect it to investment and growth.",
        "Use M × V = P × Y with stated long-run assumptions to solve for inflation or money growth.",
      ],
      sources: ["cb-macro-ced", "cb-macro-exam", "cb-macro-frq"],
    },
    practice: [
      {
        question: "Expansionary fiscal policy raises inflation expectations over time. On the Phillips curve diagram, the long-run result is:",
        options: ["A movement down along the same SRPC.", "The SRPC shifts up, and unemployment returns to the natural rate at higher inflation.", "The LRPC shifts left to a lower natural rate.", "The SRPC shifts down as expectations rise."],
        correctIndex: 1,
        explanation: "Higher expected inflation shifts the SRPC upward. Unemployment returns to the natural rate on the vertical LRPC, but at a higher inflation rate.",
        skill: "Phillips curve dynamics",
      },
      {
        question: "In the quantity theory framework with constant velocity, the money supply grows 7% and real GDP grows 3%. The long-run inflation rate is approximately:",
        options: ["3%", "4%", "7%", "10%"],
        correctIndex: 1,
        explanation: "With V constant, %ΔM = %ΔP + %ΔY, so inflation ≈ 7% − 3% = 4%.",
        skill: "Quantity theory calculation",
      },
      {
        question: "Persistent large federal budget deficits can crowd out private investment because government borrowing",
        options: ["raises demand in the loanable funds market, pushing real interest rates up", "lowers interest rates by increasing the supply of savings", "reduces the national debt held by the public", "forces the central bank to cut the money supply"],
        correctIndex: 0,
        explanation: "In the loanable funds model, added government demand shifts demand right and raises the real interest rate, making private borrowing for investment more expensive.",
        skill: "Loanable funds and crowding out",
      },
      {
        question: "On the long-run Phillips curve, an increase in the expected inflation rate results in",
        options: ["no change in the long-run unemployment rate, which stays at the natural rate", "a permanently lower unemployment rate at higher inflation", "a permanently higher unemployment rate at lower inflation", "unemployment falling to zero at the expected rate"],
        correctIndex: 0,
        explanation: "Long-run Phillips curve is vertical at the natural rate; expectations shifting moves the short-run curve, but unemployment returns to the natural rate once expectations adjust.",
        skill: "Phillips curve",
      },
    ],
  },
  {
    unitNumber: 6,
    title: "Unit 6 · Open economy: international trade and finance",
    description: "Record international transactions in the balance of payments, price currencies in the foreign exchange market, and trace how exchange rates feed back into net exports and capital flows.",
    examWeight: "9–13% of multiple-choice weighting",
    objectives: [
      "Classify transactions in the current account and the capital and financial account.",
      "Draw the foreign exchange market and determine appreciation and depreciation from shifters.",
      "Explain how exchange-rate changes affect net exports, capital flows, and domestic policy outcomes.",
    ],
    sections: [
      section("The balance of payments accounts", ["cb-macro-ced", "openstax-macro", "bea-gdp"], `
The **balance of payments** records a country's transactions with the rest of the world in two main accounts. The **current account** covers trade in goods and services, investment income, and unilateral transfers; a trade deficit in goods and services makes the current account negative. The **capital and financial account** records purchases and sales of assets, such as foreigners buying domestic bonds or residents buying foreign stocks.

Because every international transaction has two sides, the accounts balance in total: a current account deficit is necessarily matched by a capital and financial account surplus, meaning net capital inflows. Saying a country 'loses' because it runs a trade deficit confuses one account with the whole picture; the offsetting inflow finances investment or consumption beyond domestic saving.
`),
      section("Exchange rates and the foreign exchange market", ["cb-macro-ced", "federal-reserve"], `
An **exchange rate** is the price of one currency in terms of another. When a currency **appreciates**, it buys more foreign currency and foreign goods become cheaper at home; when it **depreciates**, the reverse holds. In the foreign exchange market graph, the exchange rate is on the vertical axis and the quantity of the currency on the horizontal, with demand and supply determined by foreigners' and residents' desire to buy goods, services, and assets denominated in that currency.

Relative interest rates are the most heavily tested shifter: higher real interest rates attract foreign capital, increasing demand for the currency and appreciating it. Relative inflation, relative income growth, and tastes for foreign goods also shift the curves. An importing country's faster income growth raises its demand for foreign currency, depreciating its own.
`),
      section("Exchange rates, net exports, and policy feedback", ["cb-macro-ced", "cb-macro-exam", "cb-macro-frq"], `
Exchange rates close the loop back to aggregate demand. A depreciation makes exports cheaper abroad and imports dearer at home, raising net exports and shifting AD right. An appreciation does the opposite. This creates a feedback channel for monetary policy: lower domestic interest rates reduce foreign demand for the currency, causing depreciation that amplifies the policy's effect on net exports.

Capital flows move in the mirror image. Policies that raise real interest rates draw inflows that appreciate the currency and can partially offset a fiscal expansion through falling net exports. Free-response questions exploit these chains deliberately, asking for a loanable funds shift, then the exchange-rate result, then the net-export consequence, all from one initial policy.
`),
      section("Trade policy and its macroeconomic footprint", ["cb-macro-ced", "openstax-macro"], `
Tariffs and quotas restrict imports, but in this course their main exam role is through the exchange rate and net exports rather than the microeconomics of deadweight loss. A tariff reduces demand for foreign currency, which tends to appreciate the domestic currency and offset part of the intended protection as exports become more expensive abroad. Capital flows, driven by interest rates, typically dominate currency movements in any case.

The unit's enduring idea is interdependence: no large economy sets policy in a vacuum. Interest-rate decisions in one major economy shift capital, currencies, and trade balances worldwide, which is why released exam questions so often pair two countries and ask you to track a change through both foreign exchange markets simultaneously, with opposite shifts in each.
`),
      section("How Unit 6 is tested", ["cb-macro-ced", "cb-macro-exam", "cb-macro-frq"], `
Unit 6 usually closes out the multiple-choice section and appears in a short free-response question. The reliable sequence is: classify the transaction in the balance of payments, draw the foreign exchange market with the currency named in the question on the axes, shift the correct curve for the stated cause, and then state the net-export or capital-flow consequence.

Most errors come from graphing the wrong currency or reversing appreciation. Protect yourself by writing, before drawing, whose demand or supply of the graphed currency changed and why. If foreigners want more of your assets, demand for your currency rises and it appreciates; every other shifter can be translated into that same plain-language test.
`),
    ],
    glossary: [
      { term: "Current account", definition: "The balance-of-payments account recording trade in goods and services, investment income, and transfers." },
      { term: "Appreciation", definition: "An increase in a currency's value, so it exchanges for more foreign currency." },
      { term: "Capital and financial account", definition: "The account recording international purchases and sales of assets; its balance offsets the current account." },
      { term: "Net exports", definition: "The value of exports minus imports; a component of GDP and aggregate demand." },
    ],
    examAlignment: {
      title: "Two-country reasoning and currency graphs",
      description: "The final unit links domestic policy to capital flows, exchange rates, and trade balances.",
      criteria: [
        "Classify each transaction in the correct balance-of-payments account and state the offsetting balance.",
        "Graph the currency the question names and justify the shift with a plain-language cause.",
        "Carry the exchange-rate change through to net exports and aggregate demand.",
      ],
      sources: ["cb-macro-ced", "cb-macro-exam", "cb-macro-frq"],
    },
    practice: [
      {
        question: "A U.S. resident buys stock in a Japanese company. In the U.S. balance of payments, this transaction is recorded in the:",
        options: ["Current account as an import.", "Capital and financial account as a capital outflow.", "Current account as investment income.", "Official reserves account only."],
        correctIndex: 1,
        explanation: "Purchasing a foreign asset is a capital outflow in the capital and financial account. Any dividends received later would appear in the current account as investment income.",
        skill: "Balance of payments classification",
      },
      {
        question: "If U.S. real interest rates rise relative to those in the eurozone, the U.S. dollar will most likely:",
        options: ["Depreciate as demand for dollars falls.", "Appreciate as foreign investors demand more dollars to buy U.S. assets.", "Stay fixed because exchange rates ignore interest rates.", "Depreciate because capital flows out of the United States."],
        correctIndex: 1,
        explanation: "Higher relative real returns attract foreign capital. Investors must buy dollars to purchase U.S. assets, raising demand for the dollar and appreciating it.",
        skill: "Foreign exchange analysis",
      },
      {
        question: "If the U.S. dollar appreciates against the euro, the most likely immediate effect is that",
        options: ["European goods become cheaper for U.S. buyers and U.S. exports to Europe become more expensive", "U.S. exports rise because American goods are now cheaper abroad", "imports from Europe become more expensive for U.S. buyers", "the U.S. trade balance must improve within the same month"],
        correctIndex: 0,
        explanation: "A stronger dollar lowers import prices and raises the foreign-currency price of U.S. goods, tending to increase imports and decrease exports, other things equal.",
        skill: "Exchange rates and trade",
      },
      {
        question: "A country records $500 billion of exports and $650 billion of imports of goods and services. Its trade balance is",
        options: ["a deficit of $150 billion, since imports exceed exports by that amount", "a surplus of $150 billion, since trade is measured imports first", "balanced, because both flows are counted in GDP", "a deficit of $1{,}150 billion, the sum of the two flows"],
        correctIndex: 0,
        explanation: "Net exports equal exports minus imports: \\(500-650=-\\$150\\) billion; a negative value is a trade deficit and subtracts from GDP in the expenditure approach.",
        skill: "Balance of payments basics",
      },
    ],
  },
];
