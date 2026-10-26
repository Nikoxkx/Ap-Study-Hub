import { section } from "./build";
import type { Lesson } from "./types";

/**
 * The single ap-calc course follows the ten-unit BC sequence. Units 1–8 are
 * explicitly shared with AB; BC extensions are named inside their units.
 */
export const apCalcLessons: Lesson[] = [
  {
    unitNumber: 1,
    title: "Unit 1 · Limits and continuity",
    description: "Read limiting behavior from formulas, graphs, and tables; evaluate limits algebraically; and use continuity and the Intermediate Value Theorem precisely.",
    examWeight: "AB 10–15% · BC 5–10% of multiple-choice weighting",
    audience: "Shared AB/BC foundation",
    objectives: [
      "Distinguish a function’s value from its limiting behavior and determine when limits exist.",
      "Evaluate limits using algebraic, graphical, numerical, and squeeze-theorem methods.",
      "Apply continuity tests and the Intermediate Value Theorem with all hypotheses stated.",
    ],
    sections: [
      section("Limits describe approach, not arrival", ["cb-calc-ced", "openstax-calc-1"], `
The statement \\(lim(x→a) f(x) = L\\) means that \\(f(x)\\) can be made arbitrarily close to \\(L\\) by taking \\(x\\) sufficiently close to \\(a\\), without requiring \\(x = a\\). The function may be undefined at \\(a\\), defined at a different value, or defined exactly at \\(L\\); the limit remains concerned with nearby behavior. This distinction is why limits can describe holes and instantaneous rates before those values are directly computable.

A two-sided limit exists only when the left- and right-hand limits exist and agree. If \\(lim(x→a⁻) f(x) = 2\\) and \\(lim(x→a⁺) f(x) = 5\\), then the two-sided limit does not exist, even if \\(f(a) = 2\\). Unbounded growth is different again: writing \\(lim(x→a) f(x) = ∞\\) describes infinite behavior, while saying the limit exists as a finite real number would be incorrect.
`),
      section("Graphs, tables, and algebraic evaluation", ["cb-calc-ced", "openstax-calc-1"], `
On a graph, trace the \\(y\\)-values approached from each side and ignore the plotted point when finding the limit. On a table, look for stabilization as inputs approach the target from both sides; numerical estimates support but do not prove an exact limit. A calculator’s rounded display can conceal oscillation or a very narrow feature, so algebraic or graphical confirmation remains valuable.

Direct substitution works for continuous functions such as polynomials and for rational functions where the denominator is nonzero. If substitution gives \\(0/0\\), that is an indeterminate form, not an answer. Factor, rationalize, expand, or rewrite trigonometric expressions to reveal cancellation. For example, \\((x²−9)/(x−3)\\) simplifies to \\(x+3\\) for \\(x ≠ 3\\), so its limit as \\(x→3\\) is \\(6\\), even though the original expression is undefined there.
`),
      section("Squeeze, trigonometric limits, and asymptotes", ["cb-calc-ced", "openstax-calc-1"], `
The squeeze theorem applies when \\(g(x) ≤ f(x) ≤ h(x)\\) near a point and both outer functions approach the same limit \\(L\\); then \\(f(x)\\) also approaches \\(L\\). It is especially useful for bounded oscillation. Since \\(−1 ≤ sin(1/x) ≤ 1\\), we have \\(−|x| ≤ x sin(1/x) ≤ |x|\\) for nonzero \\(x\\), and the outer limits force the product toward zero as \\(x→0\\).

The fundamental limit \\(lim(x→0) sin(x)/x = 1\\) uses radian measure and supports many trigonometric evaluations. Vertical asymptotes arise from infinite limiting behavior, while horizontal asymptotes describe end behavior as \\(x→±∞\\). A hole is removable discontinuity, not a vertical asymptote. Use sign analysis on one-sided limits: a denominator approaching zero can produce \\(+∞\\) or \\(−∞\\) depending on the numerator and approaching side.
`),
      section("Continuity and the Intermediate Value Theorem", ["cb-calc-ced", "openstax-calc-1"], `
A function is continuous at \\(a\\) when \\(f(a)\\) is defined, \\(lim(x→a) f(x)\\) exists, and the two are equal. All three conditions matter. Removable discontinuities can be repaired by redefining one point; jump discontinuities have unequal one-sided limits; infinite discontinuities involve unbounded behavior. On an interval, continuity means this local condition holds at every interior point with appropriate one-sided behavior at endpoints.

The Intermediate Value Theorem states that if \\(f\\) is continuous on \\([a,b]\\) and \\(N\\) lies between \\(f(a)\\) and \\(f(b)\\), then some \\(c\\) in \\((a,b)\\) satisfies \\(f(c)=N\\). It guarantees existence, not uniqueness or a formula for \\(c\\). To justify a root, compute endpoint values and explicitly invoke continuity. For \\(f(x)=x³+x−1\\), values at \\(0\\) and \\(1\\) are \\(−1\\) and \\(1\\), so a root lies between them.
`),
      section("End behavior and exam communication", ["cb-calc-ced", "cb-calc-ab-exam", "cb-calc-bc-exam"], `
For rational functions, compare polynomial degrees to determine end behavior. Equal degrees give a horizontal asymptote at the ratio of leading coefficients; a higher-degree denominator gives \\(y=0\\); a higher-degree numerator gives no finite horizontal asymptote and may produce slant or nonlinear end behavior. Exponential and logarithmic functions require separate reasoning rather than polynomial degree rules.

In free response, do not merely write a number when the prompt asks for justification. Name the property used, show the necessary one-sided or continuity check, and preserve domain restrictions. Beginning May 2027, both exams have 42 multiple-choice questions in 1 hour 40 minutes: 29 noncalculator questions for 62 minutes, then 13 calculator-required questions for 38 minutes. The six-question, 90-minute free-response section remains half the score, so exact limit notation and theorem conditions are worth practicing.
`),
    ],
    glossary: [
      { term: "One-sided limit", definition: "The value approached as the input approaches a point from only the left or only the right." },
      { term: "Indeterminate form", definition: "A symbolic form such as 0/0 or ∞/∞ that requires further analysis rather than giving a limit directly." },
      { term: "Removable discontinuity", definition: "A discontinuity where a finite limit exists but the point value is missing or mismatched." },
      { term: "Intermediate Value Theorem", definition: "A continuous-function theorem guaranteeing every intermediate output between two endpoint values." },
    ],
    examAlignment: {
      title: "Definitions, conditions, and representations",
      description: "Limits appear directly and inside derivatives and integrals; scoring rewards both procedure and correct mathematical language.",
      criteria: [
        "Check both sides before declaring a two-sided limit exists.",
        "State continuity before using the Intermediate Value Theorem.",
        "Keep domain exclusions visible after algebraic cancellation.",
      ],
      sources: ["cb-calc-ced", "cb-calc-ab-course", "cb-calc-bc-course", "cb-calc-ab-exam", "cb-calc-bc-exam"],
    },
    practice: [
      {
        question: "If f(x)=(x²−4)/(x−2) for x≠2, what is lim(x→2) f(x)?",
        options: ["0", "2", "4", "The limit does not exist because f(2) is undefined"],
        correctIndex: 2,
        explanation: "For x≠2, f(x)=x+2, which approaches 4; the missing point value does not affect the limit.",
        skill: "Evaluate limits algebraically",
      },
      {
        question: "A continuous function has f(1)=−2 and f(3)=7. What does IVT guarantee?",
        options: ["A unique maximum", "Some c in (1,3) with f(c)=0", "f′(2)=3", "Exactly one root on every interval"],
        correctIndex: 1,
        explanation: "Zero lies between the endpoint outputs, so continuity guarantees at least one input where it is attained.",
        skill: "Apply IVT",
      },
      {
        question: "\\(\\lim_{x\\to 3}\\frac{x^{2}-9}{x-3}\\) equals",
        options: ["\\(0\\)", "\\(3\\)", "\\(6\\)", "The limit does not exist"],
        correctIndex: 2,
        explanation: "For \\(x\\ne 3\\), \\(\\frac{x^{2}-9}{x-3}=x+3\\), and \\(x+3\\to 6\\) as \\(x\\to 3\\). The hole at \\(x=3\\) does not affect the limit.",
        skill: "Evaluate limits by factoring",
      },
      {
        question: "A function is defined by \\(f(x)=x^{2}\\) for \\(x<1\\) and \\(f(x)=a x^{2}\\) for \\(x\\ge 1\\). For which value of \\(a\\) is \\(f\\) continuous at \\(x=1\\)?",
        options: ["\\(a=0\\)", "\\(a=1\\)", "\\(a=2\\)", "\\(a=4\\)"],
        correctIndex: 1,
        explanation: "Continuity at \\(x=1\\) requires the left-hand limit \\(1^{2}=1\\) to equal \\(f(1)=a\\cdot 1^{2}=a\\), so \\(a=1\\).",
        skill: "Enforce continuity at a point",
      },
    ],
  },
  {
    unitNumber: 2,
    title: "Unit 2 · Derivative definition and fundamental rules",
    description: "Build the derivative from difference quotients, connect it to continuity and tangent lines, and differentiate elementary functions accurately.",
    examWeight: "AB 10–15% · BC 5–10% of multiple-choice weighting",
    audience: "Shared AB/BC foundation",
    objectives: [
      "Use both standard forms of the derivative definition and interpret their quantities.",
      "Apply power, constant, sum, product, quotient, exponential, logarithmic, and trigonometric rules.",
      "Explain differentiability, tangent behavior, and units of instantaneous change.",
    ],
    sections: [
      section("From average to instantaneous change", ["cb-calc-ced", "openstax-calc-1"], `
The difference quotient \\([f(a+h)−f(a)]/h\\) measures average rate of change over an interval of width \\(h\\). The derivative \\(f′(a)=lim(h→0) [f(a+h)−f(a)]/h\\) is the instantaneous rate when that limit exists. Equivalently, \\(f′(a)=lim(x→a) [f(x)−f(a)]/(x−a)\\). Both forms represent the slope of the secant line approaching the tangent slope.

For \\(f(x)=x²\\), the quotient at \\(a\\) is \\((2ah+h²)/h=2a+h\\) for nonzero \\(h\\), so the derivative is \\(2a\\). The calculation is not “set \\(h=0\\) first,” which would destroy the quotient; simplify while \\(h≠0\\), then take the limit. This same structure later explains why the derivative measures velocity, marginal change, and local sensitivity.
`),
      section("Differentiability and continuity", ["cb-calc-ced", "openstax-calc-1"], `
If \\(f\\) is differentiable at \\(a\\), it is continuous there. The converse is false: \\(|x|\\) is continuous at zero but has left derivative \\(−1\\) and right derivative \\(1\\), so it is not differentiable. Cusps, corners, vertical tangents, and discontinuities can all prevent a finite two-sided derivative. A smooth-looking graph is evidence to inspect, not a substitute for a definition when exact justification is required.

Derivative notation carries meaning. \\(f′(x)\\), \\(dy/dx\\), and \\(d/dx[f(x)]\\) describe the same operation in suitable settings, while \\(f′(a)\\) is a number and \\(f′\\) is a function. Higher derivatives such as \\(f″\\) differentiate the derivative. A common error is treating \\(dy/dx\\) as an ordinary fraction in every context; some later procedures justify fraction-like manipulation, but the symbol itself denotes a limit.
`),
      section("Core differentiation rules", ["cb-calc-ced", "openstax-calc-1"], `
The power rule gives \\(d/dx[xⁿ]=nxⁿ⁻¹\\) for applicable real exponents. Constant multiples and sums differentiate term by term. Products require \\( (fg)′=f′g+fg′ \\), and quotients require \\( (f/g)′=(f′g−fg′)/g² \\); neither is obtained by differentiating numerator and denominator independently. Memorize the structures, then verify signs and factors with a simple example.

Exponential and logarithmic rules include \\((eˣ)′=eˣ\\), \\((aˣ)′=aˣ ln(a)\\), and \\((ln x)′=1/x\\) for \\(x>0\\). Trigonometric derivatives include \\(sin′=cos\\), \\(cos′=−sin\\), and \\(tan′=sec²\\). Keep domains visible: \\(ln|x|\\) has derivative \\(1/x\\) on either side of zero, while \\(ln x\\) is defined only for positive inputs.
`),
      section("Tangent lines and rates in context", ["cb-calc-ced", "openstax-calc-1"], `
The tangent line at \\((a,f(a))\\) is \\(y−f(a)=f′(a)(x−a)\\). It is the line matching the function’s value and instantaneous slope at that point. A horizontal tangent has derivative zero, but derivative zero does not automatically imply a local maximum or minimum. A vertical tangent involves unbounded derivative behavior and requires separate analysis.

In applications, derivative units are output units divided by input units. If \\(s(t)\\) is position in meters and \\(t\\) is seconds, \\(s′(t)\\) is velocity in meters per second and \\(s″(t)\\) is acceleration in meters per second squared. A statement such as “the derivative is 4” is incomplete in a contextual free response; identify what is changing, at what time, at what rate, and in which direction.
`),
      section("Reading derivatives from tables and graphs", ["cb-calc-ced", "cb-calc-ab-exam", "cb-calc-bc-exam"], `
A graph of \\(f\\) reveals derivative sign through increasing or decreasing behavior and approximate slope through tangent steepness. A graph of \\(f′\\) gives slope values directly; do not read its \\(y\\)-coordinate as the original function’s value. From a table, a symmetric difference such as \\([f(a+h)−f(a−h)]/(2h)\\) can estimate \\(f′(a)\\), while one-sided differences estimate from only one direction. State that these are approximations unless a definition or model supplies exact values.

On the current exams, calculator policy varies by part, but mathematical reasoning remains necessary in both. Calculator output can support numerical differentiation, yet free-response justification often requires a rule, definition, or interpretation. Practice writing complete equations with consistent notation. A final answer with no derivative symbol, no point of evaluation, and no units may fail to communicate the result even when the underlying calculation was intended correctly.
`),
    ],
    glossary: [
      { term: "Difference quotient", definition: "The ratio of output change to input change over an interval, used to define the derivative through a limit." },
      { term: "Differentiable", definition: "Having a finite derivative at a point or throughout a stated domain." },
      { term: "Tangent line", definition: "The line through a curve point with slope equal to the function’s derivative there." },
      { term: "Instantaneous rate", definition: "The limiting rate of change at a particular input value." },
    ],
    examAlignment: {
      title: "Procedure plus interpretation",
      description: "The derivative is assessed through formulas, graphs, tables, and contextual meaning, not only symbolic fluency.",
      criteria: [
        "Simplify the difference quotient before taking its limit.",
        "Use the correct product or quotient structure and preserve function domains.",
        "Interpret derivative values with output/input units and a stated input.",
      ],
      sources: ["cb-calc-ced", "cb-calc-ab-course", "cb-calc-bc-course", "cb-calc-ab-exam", "cb-calc-bc-exam"],
    },
    practice: [
      {
        question: "For f(x)=x³, which expression equals f′(2) by definition?",
        options: ["lim(h→0) [(2+h)³−8]/h", "lim(h→0) [h³−8]/h", "(2³)/2", "lim(x→2) (x³+8)/(x+2)"],
        correctIndex: 0,
        explanation: "The quotient compares f(2+h) with f(2)=8 and divides by input change h.",
        skill: "Use the derivative definition",
      },
      {
        question: "If position s(t) is in meters, what are the units of s″(t)?",
        options: ["Meters", "Seconds per meter", "Meters per second", "Meters per second squared"],
        correctIndex: 3,
        explanation: "The second derivative measures change in velocity (m/s) per unit time (s).",
        skill: "Interpret derivative units",
      },
      {
        question: "If \\(f(x)=3x^{2}-5x\\), then \\(f'(x)=\\)",
        options: ["\\(6x-5\\)", "\\(3x-5\\)", "\\(6x^{2}-5\\)", "\\(x^{3}-\\frac{5}{2}x^{2}\\)"],
        correctIndex: 0,
        explanation: "Apply the power rule term by term: \\(\\frac{d}{dx}[3x^{2}]=6x\\) and \\(\\frac{d}{dx}[-5x]=-5\\).",
        skill: "Differentiate polynomials",
      },
      {
        question: "What is the slope of the tangent line to \\(y=x^{3}\\) at \\(x=2\\)?",
        options: ["\\(6\\)", "\\(8\\)", "\\(12\\)", "\\(4\\)"],
        correctIndex: 2,
        explanation: "\\(y'=3x^{2}\\), so at \\(x=2\\) the slope is \\(3(2)^{2}=12\\).",
        skill: "Slope of a tangent line",
      },
    ],
  },
  {
    unitNumber: 3,
    title: "Unit 3 · Composite, implicit, and inverse differentiation",
    description: "Differentiate nested functions, implicitly defined curves, inverses, and inverse trigonometric forms while preserving inner structure and domains.",
    examWeight: "AB 5–10% · BC 5–10% of multiple-choice weighting",
    audience: "Shared AB/BC foundation",
    objectives: [
      "Apply the chain rule to compositions and nested compositions.",
      "Use implicit and logarithmic differentiation for dependent and independent variables.",
      "Differentiate inverse functions and inverse trigonometric functions with correct evaluation and domains.",
    ],
    sections: [
      section("The chain rule tracks nested change", ["cb-calc-ced", "openstax-calc-1"], `
If \\(y=f(g(x))\\), then \\(dy/dx=f′(g(x))·g′(x)\\). The outer derivative is evaluated at the inner function, then multiplied by the inner derivative. For \\(y=sin(x²)\\), the derivative is \\(cos(x²)·2x\\), not \\(cos(2x)\\) and not \\(2x cos(x)\\). Writing \\(u=x²\\) can make the substitution visible until the structure becomes automatic.

Nested chains multiply every layer. For \\(y=e^{sin(3x)}\\), differentiation gives \\(e^{sin(3x)}·cos(3x)·3\\). The original exponential factor remains. A reliable check is to ask, “What is the outermost operation?” Apply its rule first, then differentiate its input. Product, quotient, and chain rules often appear together, so mark components before differentiating rather than relying on visual guesswork.
`),
      section("Implicit differentiation keeps y dependent on x", ["cb-calc-ced", "openstax-calc-1"], `
When a relation such as \\(x²+y²=25\\) defines \\(y\\) implicitly as a function of \\(x\\), differentiate both sides with respect to \\(x\\). Every \\(y\\) term requires the chain rule: \\(d/dx[y²]=2y·dy/dx\\). The result \\(2x+2y y′=0\\) gives \\(y′=−x/y\\) where \\(y≠0\\). This formula correctly produces different slopes on the upper and lower semicircles.

Products involving \\(x\\) and \\(y\\) need both product and chain rules. For \\(xy\\), the derivative is \\(y+x y′\\). After differentiating, solve algebraically for \\(y′\\); if evaluating at a point, use both coordinates in the relation. A slope answer expressed only in \\(x\\) may discard necessary information. Check that the point actually lies on the original curve before using it.
`),
      section("Inverse functions reverse input and output", ["cb-calc-ced", "openstax-calc-1"], `
If \\(f\\) is one-to-one and differentiable with \\(f′(f⁻¹(x))≠0\\), then \\((f⁻¹)′(x)=1/f′(f⁻¹(x))\\). The formula follows by differentiating \\(f(f⁻¹(x))=x\\). To find an inverse derivative at \\(x=b\\), first find \\(a\\) such that \\(f(a)=b\\), then evaluate \\(1/f′(a)\\). The point \\((b,a)\\) lies on the inverse, not \\((a,b)\\).

For example, if \\(f(x)=x³+x\\), then \\(f(1)=2\\), so \\((f⁻¹)′(2)=1/(3·1²+1)=1/4\\). There is no need to solve the cubic inverse explicitly. The reciprocal applies to the derivative at the corresponding input, not to \\(f′(x)\\) at an unrelated point. This distinction is a frequent AP target.
`),
      section("Inverse trigonometry and logarithmic differentiation", ["cb-calc-ced", "openstax-calc-1"], `
Standard forms include \\(d/dx[arcsin x]=1/√(1−x²)\\), \\(d/dx[arctan x]=1/(1+x²)\\), and \\(d/dx[arcsec x]=1/(|x|√(x²−1))\\) on appropriate domains. For compositions, multiply by the inner derivative. For \\(arctan(2x)\\), the result is \\(2/(1+4x²)\\). Absolute values and domain restrictions matter, particularly with \\(arcsec\\) and logarithms.

Logarithmic differentiation helps with products, quotients, powers, and variable exponents. For \\(y=xˣ\\) with \\(x>0\\), take \\(ln y=x ln x\\), differentiate to get \\(y′/y=ln x+1\\), and conclude \\(y′=xˣ(ln x+1)\\). Do not apply the ordinary power rule to a variable exponent or the exponential rule to a variable base; logarithmic rewriting handles both.
`),
      section("Selecting a procedure and checking the result", ["cb-calc-ced", "cb-calc-ab-exam", "cb-calc-bc-exam"], `
Before differentiating, classify the expression: composition calls for chain rule, multiplied functions for product rule, a relation not solved for \\(y\\) for implicit differentiation, and variable base and exponent for logarithmic differentiation. Many expressions require several. A structured first line often prevents errors; for example, label \\(u\\), \\(v\\), and their derivatives before beginning a quotient with nested trigonometric terms.

Afterward, check reasonableness using a point, graph, or calculator derivative when allowed. In free response, show enough symbolic work to justify your answer and do not replace exact values with decimals unless requested or appropriate. If a question asks for \\(d²y/dx²\\) of an implicit relation, differentiate your first-derivative equation again, remembering that every \\(y′\\) may itself depend on \\(x\\). Clear notation is part of the solution, not an optional polish.
`),
    ],
    glossary: [
      { term: "Chain rule", definition: "The rule for differentiating a composition by multiplying the outer derivative by the inner derivative." },
      { term: "Implicit differentiation", definition: "Differentiating a relation while treating one variable as dependent on another." },
      { term: "Inverse derivative rule", definition: "The reciprocal relationship between derivatives of inverse functions at corresponding points." },
      { term: "Logarithmic differentiation", definition: "Taking logarithms before differentiating to simplify powers, products, or variable exponents." },
    ],
    examAlignment: {
      title: "Structure recognition and notation",
      description: "These techniques recur throughout later units; exam questions often combine them with interpretation or graph reasoning.",
      criteria: [
        "Multiply by every inner derivative in a composition.",
        "Include y′ whenever differentiating a function of y with respect to x.",
        "Find corresponding inverse points before applying the reciprocal derivative rule.",
      ],
      sources: ["cb-calc-ced", "cb-calc-ab-course", "cb-calc-bc-course", "cb-calc-ab-exam", "cb-calc-bc-exam"],
    },
    practice: [
      {
        question: "What is d/dx[ln(cos x)] where cos x>0?",
        options: ["tan x", "−tan x", "sec x", "−cos x/sin x"],
        correctIndex: 1,
        explanation: "The chain rule gives (1/cos x)(−sin x)=−tan x.",
        skill: "Apply the chain rule",
      },
      {
        question: "For x²+y²=25, what is dy/dx at (3,4)?",
        options: ["3/4", "−3/4", "−4/3", "4/3"],
        correctIndex: 1,
        explanation: "Implicit differentiation gives y′=−x/y, so at (3,4), y′=−3/4.",
        skill: "Differentiate implicitly",
      },
      {
        question: "\\(\\frac{d}{dx}\\left[\\sin\\left(x^{2}\\right)\\right]=\\)",
        options: ["\\(\\cos\\left(x^{2}\\right)\\)", "\\(2x\\cos\\left(x^{2}\\right)\\)", "\\(2x\\sin\\left(x^{2}\\right)\\)", "\\(-2x\\cos\\left(x^{2}\\right)\\)"],
        correctIndex: 1,
        explanation: "The chain rule gives \\(\\cos(x^{2})\\) times the derivative of the inside, \\(2x\\).",
        skill: "Chain rule with trig functions",
      },
      {
        question: "If \\(xy=4\\), then \\(\\frac{dy}{dx}=\\)",
        options: ["\\(\\frac{y}{x}\\)", "\\(-\\frac{y}{x}\\)", "\\(-\\frac{x}{y}\\)", "\\(4\\)"],
        correctIndex: 1,
        explanation: "Differentiate implicitly, treating y as a function of x: \\(y+x\\frac{dy}{dx}=0\\), then solve for the derivative to get \\(\\frac{dy}{dx}=-\\frac{y}{x}\\).",
        skill: "Implicit differentiation",
      },
    ],
  },
  {
    unitNumber: 4,
    title: "Unit 4 · Contextual applications of differentiation",
    description: "Translate changing quantities into derivatives, solve motion and related-rates problems, approximate locally, and evaluate indeterminate limits with L’Hôpital’s Rule.",
    examWeight: "AB 10–15% · BC 5–10% of multiple-choice weighting",
    audience: "Shared AB/BC foundation",
    objectives: [
      "Interpret derivatives and higher derivatives in motion and other applied contexts.",
      "Model and solve related-rates problems with explicit relationships and timing.",
      "Use linearization and L’Hôpital’s Rule only under their correct conditions.",
    ],
    sections: [
      section("Derivatives tell a contextual story", ["cb-calc-ced", "openstax-calc-1"], `
A derivative value is meaningful only with its quantity, input, sign, and units. If \\(C(t)\\) is the concentration of a medication in milligrams per liter after \\(t\\) hours and \\(C′(3)=−0.8\\), then three hours after administration the concentration is decreasing at an instantaneous rate of \\(0.8 mg/L per hour\\). It does not say the concentration itself is \\(−0.8\\) or that the total decrease over the next hour must be exactly \\(0.8\\).

Local linearity justifies short-interval estimates: \\(C(3+h)≈C(3)+C′(3)h\\). The approximation uses the instantaneous rate as though it stayed constant, so accuracy depends on the function and interval. In writing, label it as an approximation and identify the model’s assumptions. Contextual interpretation is assessed separately from calculating a derivative.
`),
      section("Position, velocity, speed, and acceleration", ["cb-calc-ced", "openstax-calc-1"], `
For position \\(s(t)\\), velocity is \\(v(t)=s′(t)\\) and acceleration is \\(a(t)=v′(t)=s″(t)\\). Velocity sign indicates direction; speed is \\(|v(t)|\\) and is nonnegative. A particle is speeding up when velocity and acceleration have the same sign and slowing down when their signs differ. Negative acceleration alone does not establish slowing down because a negative velocity could then be becoming more negative.

Displacement over \\([a,b]\\) is \\(s(b)−s(a)=∫ₐᵇv(t)dt\\), while total distance is \\(∫ₐᵇ|v(t)|dt\\). To compute distance from a velocity formula, find sign changes within the interval and split the integral. “At rest” means velocity zero at an instant, not necessarily a change of direction; examine velocity sign on both sides before claiming a turnaround.
`),
      section("Related rates: differentiate a relationship in time", ["cb-calc-ced", "openstax-calc-1"], `
Related-rates problems link quantities that all vary with time. First draw and label the situation, assign variables, and identify the given and desired rates with units. Then write a geometric or physical equation relating the variables before substituting the particular instant’s measurements. Differentiate with respect to time using the chain rule, substitute the instant’s values, and solve for the unknown rate.

For a ladder of length \\(10\\) sliding down a wall, \\(x²+y²=100\\) gives \\(2x dx/dt+2y dy/dt=0\\). If the base moves outward, \\(dx/dt\\) is positive and the top’s \\(dy/dt\\) is negative while contact remains. Substituting \\(x\\) and \\(y\\) before differentiating would incorrectly freeze them. A sign check at the end often catches setup mistakes.
`),
      section("Linearization and differentials", ["cb-calc-ced", "openstax-calc-1"], `
The linearization of \\(f\\) at \\(a\\) is \\(L(x)=f(a)+f′(a)(x−a)\\), the tangent-line approximation. For \\(f(x)=√x\\) at \\(a=9\\), \\(L(x)=3+(x−9)/6\\), so \\(√9.3≈3.05\\). Whether this is an overestimate or underestimate can be inferred from concavity: a concave-down function lies below its tangent, making the tangent estimate high on the relevant interval.

Differentials express the same local relationship as \\(dy≈f′(x)dx\\) for small changes. Linear approximation is not an exact equation and does not replace evaluating the original function when exactness is required. In optimization or error estimation, distinguish actual change \\(Δy\\) from estimated change \\(dy\\). The approximation’s value comes from replacing a complicated local calculation with a simple linear one.
`),
      section("L’Hôpital’s Rule and its limits", ["cb-calc-ced", "openstax-calc-1", "cb-calc-ab-exam"], `
L’Hôpital’s Rule applies to limits producing \\(0/0\\) or \\(∞/∞\\) under suitable differentiability conditions: consider \\(lim f′(x)/g′(x)\\) and use its behavior to determine the original limit. It is not the quotient rule and should not be applied merely because an expression is a fraction. Other indeterminate forms such as \\(0·∞\\), \\(∞−∞\\), \\(1^∞\\), \\(0^0\\), and \\(∞^0\\) must first be rewritten into a qualifying form or handled with logarithms.

For \\(lim(x→0) (eˣ−1−x)/x²\\), substitution gives \\(0/0\\); differentiating numerator and denominator yields \\((eˣ−1)/(2x)\\), still \\(0/0\\); a second application gives \\(eˣ/2→1/2\\). Each application requires checking the form. On free response, writing “by L’Hôpital” without showing the indeterminate form leaves an important part of the justification invisible.
`),
    ],
    glossary: [
      { term: "Speed", definition: "The absolute value of velocity, representing how fast position changes without direction." },
      { term: "Related rates", definition: "Problems linking rates of change of variables through a time-dependent relationship." },
      { term: "Linearization", definition: "The tangent-line function used to approximate a differentiable function near a point." },
      { term: "L’Hôpital’s Rule", definition: "A derivative-based method for qualifying 0/0 or ∞/∞ limits under appropriate hypotheses." },
    ],
    examAlignment: {
      title: "Model, compute, interpret",
      description: "Contextual FRQs require a correct setup, calculus procedure, and sentence interpreting the answer in the scenario.",
      criteria: [
        "Differentiate related-rates equations before substituting instant-specific values.",
        "Distinguish velocity from speed and displacement from total distance.",
        "Verify an indeterminate form before each use of L’Hôpital’s Rule.",
      ],
      sources: ["cb-calc-ced", "cb-calc-ab-course", "cb-calc-bc-course", "cb-calc-ab-exam", "cb-calc-bc-exam"],
    },
    practice: [
      {
        question: "A particle has v(t)<0 and a(t)<0 at an instant. What is happening to its speed?",
        options: ["It is speeding up because velocity and acceleration have the same sign.", "It is slowing down because acceleration is negative.", "Its speed is zero.", "Its position must be increasing."],
        correctIndex: 0,
        explanation: "Same-sign velocity and acceleration increase the magnitude of velocity in the negative direction.",
        skill: "Interpret motion",
      },
      {
        question: "When should values for a particular instant be substituted in a related-rates problem?",
        options: ["Before writing any relationship", "Before differentiating, to simplify", "After differentiating the general relationship with respect to time", "Only after checking the answer"],
        correctIndex: 2,
        explanation: "Early substitution turns changing quantities into constants and destroys the rate relationship.",
        skill: "Solve related rates",
      },
      {
        question: "A circle's radius grows at \\(2\\ \\mathrm{cm}\\cdot\\mathrm{s}^{-1}\\). How fast is its area growing when \\(r=5\\ \\text{cm}\\)?",
        options: ["\\(20\\pi\\ \\mathrm{cm}^{2}\\cdot\\mathrm{s}^{-1}\\)", "\\(10\\pi\\ \\mathrm{cm}^{2}\\cdot\\mathrm{s}^{-1}\\)", "\\(40\\pi\\ \\mathrm{cm}^{2}\\cdot\\mathrm{s}^{-1}\\)", "\\(25\\pi\\ \\mathrm{cm}^{2}\\cdot\\mathrm{s}^{-1}\\)"],
        correctIndex: 2,
        explanation: "Differentiate the area formula with respect to time: \\(A=\\pi r^{2}\\) gives \\(\\frac{dA}{dt}=2\\pi r\\frac{dr}{dt}=2\\pi(5)(2)=40\\pi\\ \\mathrm{cm}^{2}\\cdot\\mathrm{s}^{-1}\\), so the area grows at that rate.",
        skill: "Related rates",
      },
      {
        question: "A particle has position \\(s(t)=t^{3}-6t^{2}\\) meters. Its acceleration at \\(t=1\\) second is",
        options: ["\\(-6\\ \\mathrm{m}\\cdot\\mathrm{s}^{-2}\\)", "\\(6\\ \\mathrm{m}\\cdot\\mathrm{s}^{-2}\\)", "\\(-9\\ \\mathrm{m}\\cdot\\mathrm{s}^{-2}\\)", "\\(0\\ \\mathrm{m}\\cdot\\mathrm{s}^{-2}\\)"],
        correctIndex: 0,
        explanation: "Velocity is the derivative of position and acceleration is the derivative of velocity: \\(v(t)=3t^{2}-12t\\) and \\(a(t)=6t-12\\), so at one second the acceleration is \\(a(1)=6-12=-6\\ \\mathrm{m}\\cdot\\mathrm{s}^{-2}\\).",
        skill: "Motion along a line",
      },
    ],
  },
  {
    unitNumber: 5,
    title: "Unit 5 · Analytical applications of differentiation",
    description: "Use derivatives and major theorems to justify monotonicity, concavity, extrema, optimization, and relationships among function graphs.",
    examWeight: "AB 15–20% · BC 10–15% of multiple-choice weighting",
    audience: "Shared AB/BC foundation",
    objectives: [
      "Use critical points and derivative signs to classify local and absolute extrema.",
      "Apply the Extreme Value and Mean Value Theorems with hypotheses.",
      "Justify concavity, optimization, and graph relationships rather than relying on appearance alone.",
    ],
    sections: [
      section("Critical points and monotonicity", ["cb-calc-ced", "openstax-calc-1"], `
A critical point in the domain occurs where \\(f′(c)=0\\) or \\(f′(c)\\) does not exist. Critical points are candidates for local extrema, not guaranteed extrema. If \\(f′\\) changes from positive to negative at \\(c\\), \\(f\\) has a local maximum; negative to positive gives a local minimum; no sign change generally means no local extremum by the first-derivative test.

Increasing and decreasing intervals should be justified by derivative sign, not by where the original graph is high or low. Points where the derivative is undefined can partition the sign chart but must belong to the function’s domain to be critical points of \\(f\\). A derivative zero at an endpoint does not automatically produce an interior local extremum, so interval and domain conventions matter.
`),
      section("Concavity and the second derivative", ["cb-calc-ced", "openstax-calc-1"], `
Concavity describes how slope changes. On an interval where \\(f″>0\\), \\(f′\\) is increasing and \\(f\\) is concave up; where \\(f″<0\\), \\(f′\\) is decreasing and \\(f\\) is concave down. An inflection point is a point on the graph where concavity actually changes. \\(f″(c)=0\\) or undefined marks a candidate, but a sign change must be verified.

The second-derivative test can classify a stationary point: if \\(f′(c)=0\\) and \\(f″(c)>0\\), there is a local minimum; if \\(f″(c)<0\\), a local maximum. If \\(f″(c)=0\\), the test is inconclusive and you should use another method. Concavity is not the same as increasing: a function can increase with decreasing slope, like a decelerating rise.
`),
      section("EVT and MVT require conditions", ["cb-calc-ced", "openstax-calc-1"], `
The Extreme Value Theorem says a continuous function on a closed, bounded interval \\([a,b]\\) attains both an absolute maximum and minimum there. To find them, evaluate endpoints and all critical points inside the interval, then compare outputs. Checking only stationary points can miss endpoint extrema or nondifferentiable candidates.

The Mean Value Theorem requires continuity on \\([a,b]\\) and differentiability on \\((a,b)\\). It guarantees some \\(c\\) with \\(f′(c)=[f(b)−f(a)]/(b−a)\\): instantaneous slope equals average slope at least once. The theorem does not identify \\(c\\) without further work and does not promise every point has that slope. Rolle’s Theorem is the special case where endpoint values agree.
`),
      section("Optimization turns constraints into a function", ["cb-calc-ced", "openstax-calc-1"], `
An optimization solution begins with a quantity to maximize or minimize and a constraint relating the variables. Use the constraint to write one variable in terms of another, identify the physically allowable domain, and then differentiate. For a rectangle with fixed perimeter, maximizing area requires expressing area in one dimension and checking the domain where lengths remain positive.

A critical point alone does not complete the justification. Use the first- or second-derivative test for a local extremum, then compare endpoints or limiting behavior when an absolute optimum is requested. Finally, report the requested dimensions or quantity with units. In applied problems, a mathematically valid negative length or zero-radius cylinder may be outside the feasible domain and should not be accepted silently.
`),
      section("Connecting f, f′, and f″ in exam responses", ["cb-calc-ced", "cb-calc-ab-exam", "cb-calc-bc-exam"], `
When given a graph of \\(f′\\), its sign determines where \\(f\\) increases or decreases, and its slope determines the sign of \\(f″\\) and concavity of \\(f\\). Zeros of \\(f′\\) are possible extrema of \\(f\\); extrema of \\(f′\\) are possible inflection points of \\(f\\). Do not use the height of \\(f′\\) as the height of \\(f\\). Accumulated area under \\(f′\\) is needed to recover changes in \\(f\\).

Free-response prompts often ask for a reason rather than a list of features. Write complete statements such as “\\(f\\) has a local minimum at \\(x=2\\) because \\(f′\\) changes from negative to positive there.” If using MVT or EVT, name the theorem and verify its conditions. The current scoring guidelines frequently allocate distinct credit to the answer and its justification, so an unlabeled \\(x=2\\) can lose the reasoning point even when correct.
`),
    ],
    glossary: [
      { term: "Critical point", definition: "A domain point where the derivative is zero or undefined, making it a candidate for local extrema." },
      { term: "Concavity", definition: "The direction in which a function’s slope changes, indicated by the sign of the second derivative where applicable." },
      { term: "Inflection point", definition: "A point on a function’s graph where concavity changes." },
      { term: "Mean Value Theorem", definition: "A theorem guaranteeing an instantaneous rate equal to the average rate under continuity and differentiability hypotheses." },
    ],
    examAlignment: {
      title: "Justification is the mathematical work",
      description: "Analytical application questions reward correct conclusions supported by derivative signs or theorem conditions.",
      criteria: [
        "Verify a sign change before naming an extremum or inflection point.",
        "Include endpoints and nondifferentiable domain points when finding absolute extrema.",
        "State all hypotheses when invoking EVT, MVT, or Rolle’s Theorem.",
      ],
      sources: ["cb-calc-ced", "cb-calc-ab-course", "cb-calc-bc-course", "cb-calc-ab-exam", "cb-calc-bc-exam"],
    },
    practice: [
      {
        question: "If f′ changes from negative to positive at x=4 and f is continuous there, what follows?",
        options: ["A local maximum at x=4", "A local minimum at x=4", "An inflection point must occur", "f(4)=0"],
        correctIndex: 1,
        explanation: "The function changes from decreasing to increasing, producing a local minimum.",
        skill: "Apply the first-derivative test",
      },
      {
        question: "What must be checked to find an absolute maximum on [a,b]?",
        options: ["Only points where f′=0", "Only endpoints", "Endpoint values and all interior critical-point values, assuming EVT applies", "Only the largest derivative"],
        correctIndex: 2,
        explanation: "Absolute extrema can occur at endpoints or any interior critical point, not just stationary points.",
        skill: "Find absolute extrema",
      },
      {
        question: "The Mean Value Theorem applied to \\(f(x)=x^{2}\\) on \\([1,3]\\) gives \\(c=\\)",
        options: ["\\(1\\)", "\\(2\\)", "\\(\\frac{3}{2}\\)", "\\(\\sqrt{5}\\)"],
        correctIndex: 1,
        explanation: "The average rate is \\(\\frac{9-1}{3-1}=4\\). Setting \\(f'(c)=2c=4\\) gives \\(c=2\\), which lies in \\((1,3)\\).",
        skill: "Mean Value Theorem",
      },
      {
        question: "At which point does \\(f(x)=x^{3}-3x\\) have a local maximum?",
        options: ["\\(x=1\\)", "\\(x=0\\)", "\\(x=-1\\)", "\\(x=3\\)"],
        correctIndex: 2,
        explanation: "\\(f'(x)=3x^{2}-3=0\\) at \\(x=\\pm 1\\). The sign of \\(f'\\) changes from positive to negative at \\(x=-1\\), a local maximum.",
        skill: "First derivative test",
      },
    ],
  },
  {
    unitNumber: 6,
    title: "Unit 6 · Integration and accumulation of change",
    description: "Move from Riemann sums to the Fundamental Theorem, build accumulation functions, and select antidifferentiation methods including the BC extensions.",
    examWeight: "AB 15–20% · BC 15–20% of multiple-choice weighting",
    audience: "Shared AB/BC core · integration by parts, partial fractions, and improper integrals extend BC",
    objectives: [
      "Interpret definite integrals as limits of sums and net accumulation.",
      "Use both parts of the Fundamental Theorem and initial conditions correctly.",
      "Select substitution and, for BC, parts, partial fractions, and improper-limit techniques.",
    ],
    sections: [
      section("Riemann sums become definite integrals", ["cb-calc-ced", "openstax-calc-1"], `
A Riemann sum approximates accumulation by partitioning \\([a,b]\\), sampling the function on subintervals, and adding products \\(f(xᵢ*)Δxᵢ\\). Left, right, midpoint, and trapezoidal approximations use different sample or averaging choices. For an increasing function, left sums typically underestimate and right sums overestimate area, but this simple comparison depends on sign and monotonicity. More rectangles usually improve an approximation without changing its underlying definition.

The definite integral is the limit of such sums as the maximum subinterval width approaches zero, when the limit exists. It measures net signed area, so regions below the \\(x\\)-axis contribute negatively. Total geometric area requires integrating \\(|f(x)|\\) or splitting at zeros. Units multiply: integrating a rate in liters per minute with respect to minutes produces liters.
`),
      section("The Fundamental Theorem connects the two halves of calculus", ["cb-calc-ced", "openstax-calc-1"], `
If \\(f\\) is continuous on \\([a,b]\\) and \\(F′=f\\), then \\(∫ₐᵇ f(x)dx=F(b)−F(a)\\). This evaluation part turns accumulation into antiderivative differences. The other part says that if \\(g(x)=∫ₐˣ f(t)dt\\), then \\(g′(x)=f(x)\\) under continuity conditions. Here \\(x\\) is the upper limit and \\(t\\) is a dummy variable, so their roles must not be confused.

For \\(g(x)=∫₁^{x²} sin(t)dt\\), the chain rule gives \\(g′(x)=sin(x²)·2x\\). If the variable appears in the lower limit, reversing limits introduces a negative sign. Accumulation models also use \\(F(x)=F(a)+∫ₐˣ f(t)dt\\), which says final value equals initial value plus accumulated change. Omitting \\(F(a)\\) is a common modeling error.
`),
      section("Antiderivatives and substitution", ["cb-calc-ced", "openstax-calc-1"], `
An indefinite integral \\(∫f(x)dx\\) represents a family of antiderivatives, so include \\(+C\\). Basic rules reverse derivatives: \\(∫xⁿdx=xⁿ⁺¹/(n+1)+C\\) for \\(n≠−1\\), while \\(∫x⁻¹dx=ln|x|+C\\). Definite integrals do not need \\(+C\\) because it cancels in \\(F(b)−F(a)\\). Check every antiderivative by differentiating, especially signs and chain-rule factors.

Substitution reverses the chain rule. For \\(∫2x cos(x²)dx\\), let \\(u=x²\\), so \\(du=2x dx\\), and integrate \\(cos(u)\\) to get \\(sin(x²)+C\\). In a definite integral, either convert bounds to \\(u\\) or return to \\(x\\) before evaluating; do not mix \\(u\\) integrands with \\(x\\) bounds. Sometimes algebraic simplification or long division must precede substitution.
`),
      section("BC techniques: parts and partial fractions", ["cb-calc-ced", "openstax-calc-2"], `
Integration by parts reverses the product rule: \\(∫u dv=uv−∫v du\\). Choose \\(u\\) and \\(dv\\) so the new integral is simpler; \\(∫x eˣdx\\) becomes \\(x eˣ−∫eˣdx=x eˣ−eˣ+C\\). Definite versions require evaluating the \\(uv\\) term at both bounds. Cyclic forms may return to the original integral and need algebraic solving rather than endless repetition.

Partial fractions decompose suitable rational functions into simpler terms. For distinct linear factors, \\((3x+5)/((x+1)(x+2))\\) can be written \\(A/(x+1)+B/(x+2)\\) and integrated using logarithms. Perform polynomial long division first if the numerator degree is at least the denominator degree. BC students should choose among substitution, parts, algebraic rewriting, and partial fractions by structure rather than applying one favorite method everywhere.
`),
      section("Improper integrals and exam justification", ["cb-calc-ced", "openstax-calc-2", "cb-calc-bc-exam"], `
Improper integrals require limits when an interval is infinite or the integrand is unbounded. Write \\(∫₁^∞ 1/x² dx\\) as \\(lim(b→∞) ∫₁ᵇ x⁻²dx\\), which evaluates to \\(1\\). If an interior discontinuity occurs at \\(c\\), split into two improper integrals; both pieces must converge. Never evaluate across an infinite discontinuity as though it were an ordinary point.

On the exam, antidifferentiation is only one layer. You may need to interpret an integral as accumulated change, use a table to estimate one, or explain why a model’s sign makes sense. Calculator-active questions can request numerical integration, but setup and units still matter. BC’s added methods do not replace the shared AB foundation; the same Fundamental Theorem and accumulation reasoning govern the more elaborate integrals.
`),
    ],
    glossary: [
      { term: "Riemann sum", definition: "A sum of function-value times interval-width products used to approximate and define accumulation." },
      { term: "Accumulation function", definition: "A function defined by an integral with a variable limit, representing accumulated change." },
      { term: "Integration by parts", definition: "A product-rule-based method using ∫u dv = uv − ∫v du; included in BC." },
      { term: "Improper integral", definition: "An integral defined through limits because of infinite interval or unbounded integrand; included in BC." },
    ],
    examAlignment: {
      title: "Accumulation, structure, and limits",
      description: "This heavily weighted unit combines numerical approximation, symbolic integration, graphical reasoning, and contextual interpretation.",
      criteria: [
        "Distinguish net signed area from total area and displacement from total accumulation of magnitude.",
        "Apply the chain rule when differentiating an integral with a variable upper limit.",
        "Rewrite every improper integral with appropriate limit notation before evaluating.",
      ],
      sources: ["cb-calc-ced", "cb-calc-ab-course", "cb-calc-bc-course", "cb-calc-ab-exam", "cb-calc-bc-exam"],
    },
    practice: [
      {
        question: "If g(x)=∫₂ˣ t³ dt, what is g′(x)?",
        options: ["x³", "3x²", "x⁴/4", "2x"],
        correctIndex: 0,
        explanation: "By the Fundamental Theorem, the derivative of an accumulation function is the integrand evaluated at x.",
        skill: "Apply the Fundamental Theorem",
      },
      {
        question: "What is ∫₀¹ 2x e^(x²) dx?",
        options: ["e−1", "e", "2e", "1−e"],
        correctIndex: 0,
        explanation: "With u=x², the integral becomes ∫₀¹ e^u du = e−1.",
        skill: "Use substitution",
      },
      {
        question: "\\(\\int_{0}^{2} 3x^{2}\\,dx=\\)",
        options: ["\\(4\\)", "\\(8\\)", "\\(12\\)", "\\(24\\)"],
        correctIndex: 1,
        explanation: "An antiderivative is \\(x^{3}\\), so the integral is \\(2^{3}-0^{3}=8\\).",
        skill: "Definite integrals by the FTC",
      },
      {
        question: "\\(\\frac{d}{dx}\\int_{1}^{x}\\left(t^{2}+1\\right)dt=\\)",
        options: ["\\(2x\\)", "\\(\\frac{x^{3}}{3}+x\\)", "\\(x^{2}+1\\)", "\\(x^{2}\\)"],
        correctIndex: 2,
        explanation: "By the first part of the Fundamental Theorem of Calculus, the derivative of the accumulation function is the integrand evaluated at \\(x\\): \\(x^{2}+1\\).",
        skill: "FTC part 1",
      },
    ],
  },
  {
    unitNumber: 7,
    title: "Unit 7 · Differential equations",
    description: "Translate rates into differential equations, interpret slope fields, solve separable equations, and use exponential and BC logistic or Euler models.",
    examWeight: "AB 5–10% · BC 5–10% of multiple-choice weighting",
    audience: "Shared AB/BC core · Euler’s method and logistic models extend BC",
    objectives: [
      "Verify and interpret differential-equation solutions and slope fields.",
      "Solve separable equations with initial conditions and appropriate domains.",
      "Use exponential models and, for BC, Euler approximation and logistic dynamics.",
    ],
    sections: [
      section("A differential equation states a rate law", ["cb-calc-ced", "openstax-calc-2"], `
A differential equation relates a function to its derivatives. \\(dy/dt=ky\\) says the quantity’s instantaneous rate is proportional to its current amount; \\(dP/dt=0.03P(1−P/500)\\) describes growth that slows near a capacity. Modeling requires identifying what each variable and parameter means, including units and initial conditions. A solution is a function or family of functions satisfying the relationship, not merely an algebraic rearrangement.

To verify a proposed solution, differentiate it and substitute into the equation. If \\(y=Ce^{3t}\\), then \\(y′=3Ce^{3t}=3y\\), so it satisfies \\(y′=3y\\). An initial condition such as \\(y(0)=7\\) selects \\(C=7\\). General solutions contain constants; particular solutions use additional information to determine them.
`),
      section("Slope fields visualize many solutions", ["cb-calc-ced", "openstax-calc-2"], `
A slope field plots short segments whose slopes equal \\(dy/dx\\) at sampled points. If the equation depends only on \\(y\\), slopes remain constant along horizontal rows; if it depends only on \\(x\\), they remain constant along vertical columns. A solution curve follows the field’s directions and passes through its initial point without abruptly crossing incompatible slopes.

Equilibrium solutions occur where the derivative is zero for all relevant inputs. Their stability can sometimes be inferred from nearby slope signs: solutions moving toward an equilibrium suggest stability, while movement away suggests instability. A slope field is a qualitative representation; do not read exact values from tiny segments unless the grid and equation support them. Matching fields to equations begins with structural tests before checking individual points.
`),
      section("Separation of variables", ["cb-calc-ced", "openstax-calc-2"], `
A separable equation can be written \\(dy/dx=g(x)h(y)\\). Rewrite as \\(dy/h(y)=g(x)dx\\), integrate both sides, and solve for \\(y\\) when possible. The justification comes from treating the derivative relationship through differential forms and integration. Keep \\(+C\\) on one side only and use the initial condition after integration. Do not divide by an expression that could be zero without checking equilibrium solutions separately.

For \\(dy/dx=xy\\), separation gives \\(dy/y=x dx\\), so \\(ln|y|=x²/2+C\\) and \\(y=Ae^{x²/2}\\) with \\(A≠0\\); the zero function is also a solution. If \\(y(0)=4\\), then \\(A=4\\). Absolute values and domain intervals matter, especially when an initial condition selects a positive or negative branch.
`),
      section("Exponential change and applications", ["cb-calc-ced", "openstax-calc-2"], `
The model \\(dy/dt=ky\\) has solution \\(y=y₀e^{kt}\\). Positive \\(k\\) gives growth and negative \\(k\\) gives decay. If a quantity doubles after \\(T\\), then \\(k=ln2/T\\); if it halves, \\(k=−ln2/T\\). These parameters should come from stated data rather than memorized formulas. Newton’s law of cooling uses \\(dT/dt=−k(T−T_environment)\\), so the temperature difference, not necessarily temperature itself, decays exponentially.

Continuous exponential models are not appropriate for every repeated percentage change. A process increasing by 5% each year follows a discrete factor \\(1.05^t\\), which can also be written exponentially but has a different instantaneous interpretation from a stated continuous rate of 5%. Read whether the rate is per year continuously, per compounding period, or over a measured interval.
`),
      section("BC: Euler approximation and logistic growth", ["cb-calc-ced", "openstax-calc-2", "cb-calc-bc-exam"], `
Euler’s method approximates a solution from \\(y′=F(x,y)\\) using \\(y_{n+1}=y_n+hF(x_n,y_n)\\). It follows tangent-line steps of width \\(h\\). Smaller steps often improve accuracy but do not guarantee a particular error without analysis. Concavity can indicate whether tangent approximations tend to overestimate or underestimate a particular solution under suitable conditions.

The logistic model \\(dP/dt=kP(1−P/K)\\) has growth rate proportional both to population and remaining capacity. The growth rate \\(dP/dt\\) is maximized at \\(P=K/2\\), not at \\(P=K\\). Solutions approach \\(K\\) from positive non-equilibrium initial values under standard positive parameters. BC questions may ask for the differential equation, a slope-field interpretation, a particular solution, or a qualitative conclusion without requiring full integration.
`),
    ],
    glossary: [
      { term: "Slope field", definition: "A graphical display of derivative values at grid points, showing directions of solution curves." },
      { term: "Separable equation", definition: "A differential equation whose variables can be placed on opposite sides for integration." },
      { term: "Euler’s method", definition: "A BC numerical method that steps along successive tangent-line slopes." },
      { term: "Logistic model", definition: "A BC growth model in which per-capita growth declines linearly as population approaches capacity." },
    ],
    examAlignment: {
      title: "Models, families, and particular solutions",
      description: "Questions combine verbal modeling, graphical interpretation, symbolic solution, and contextual conclusions.",
      criteria: [
        "Differentiate and substitute to verify a claimed solution.",
        "Check equilibrium solutions when dividing during separation.",
        "For BC, distinguish maximum population growth rate from maximum population size.",
      ],
      sources: ["cb-calc-ced", "cb-calc-ab-course", "cb-calc-bc-course", "cb-calc-ab-exam", "cb-calc-bc-exam"],
    },
    practice: [
      {
        question: "Which function satisfies y′=2y with y(0)=5?",
        options: ["y=5e^(2t)", "y=2e^(5t)", "y=5t²", "y=e^(2t)+4"],
        correctIndex: 0,
        explanation: "The exponential solution is y=y₀e^(kt), with y₀=5 and k=2.",
        skill: "Solve exponential differential equations",
      },
      {
        question: "For dP/dt=kP(1−P/K), where is dP/dt maximized for 0<P<K?",
        options: ["P=0", "P=K/2", "P=K", "P=2K"],
        correctIndex: 1,
        explanation: "The quadratic product P(K−P) has its maximum at the midpoint K/2.",
        skill: "Analyze logistic growth",
      },
      {
        question: "The solution of \\(\\frac{dy}{dx}=2y\\) with \\(y(0)=3\\) is",
        options: ["\\(y=3e^{2x}\\)", "\\(y=e^{2x}+2\\)", "\\(y=2e^{3x}\\)", "\\(y=3\\cdot 2^{x}\\)"],
        correctIndex: 0,
        explanation: "Separate and integrate: \\(y=Ce^{2x}\\). The initial condition \\(y(0)=3\\) gives \\(C=3\\).",
        skill: "Solve separable equations",
      },
      {
        question: "On the slope field for \\(\\frac{dy}{dx}=x-y\\), the slope of the segment at \\((2,1)\\) is",
        options: ["\\(3\\)", "\\(1\\)", "\\(-1\\)", "\\(0\\)"],
        correctIndex: 1,
        explanation: "Substitute the point into the differential equation: \\(2-1=1\\). Slope field segments depend on position, not on any particular solution.",
        skill: "Read slope fields",
      },
    ],
  },
  {
    unitNumber: 8,
    title: "Unit 8 · Applications of integration",
    description: "Set up integrals for average value, motion, area, volume, and BC arc length with careful geometry, sign, and units.",
    examWeight: "AB 10–15% · BC 5–10% of multiple-choice weighting",
    audience: "Shared AB/BC core · arc length extends BC",
    objectives: [
      "Use integrals to compute average value, displacement, distance, and contextual accumulation.",
      "Set up areas and volumes using correct boundaries, slices, and orientations.",
      "Apply the BC arc-length formula and distinguish it from distance traveled along parametric paths.",
    ],
    sections: [
      section("Average value and accumulated change", ["cb-calc-ced", "openstax-calc-1"], `
The average value of a continuous function on \\([a,b]\\) is \\(f_avg=(1/(b−a))∫ₐᵇ f(x)dx\\). Dividing by interval width is essential because the integral alone gives accumulation. If \\(v(t)\\) is velocity, this formula gives average velocity over time, which equals displacement divided by elapsed time. It is not generally the arithmetic mean of initial and final values unless velocity changes linearly.

For any rate \\(R(t)\\), total accumulation is \\(∫ₐᵇR(t)dt\\), and final amount equals initial amount plus that integral. If a tank begins with \\(40\\) liters and has net rate \\(R(t)\\) in liters per minute, then \\(V(t)=40+∫₀ᵗR(u)du\\). An inflow-minus-outflow rate can be negative; interpret the result as net change rather than total liquid entering.
`),
      section("Motion: displacement versus distance", ["cb-calc-ced", "openstax-calc-1"], `
Displacement is \\(∫ₐᵇv(t)dt\\), while total distance traveled is \\(∫ₐᵇ|v(t)|dt\\). If velocity is negative on part of the interval, split at zeros and take absolute values of the signed pieces. Suppose \\(v(t)=t−2\\) on \\([0,3]\\): displacement is \\(−1.5\\), while distance is \\(0.5·2·2+0.5·1·1=2.5\\). The difference is the backward travel canceled in displacement.

Position requires an initial condition: \\(s(t)=s(0)+∫₀ᵗv(u)du\\). Speed is \\(|v(t)|\\), so distance is the accumulation of speed. These formulas mirror the derivative relationships from Unit 4 and illustrate the Fundamental Theorem. In a table-based problem, approximate the relevant integrals with the requested numerical method and preserve the time and distance units.
`),
      section("Area between curves", ["cb-calc-ced", "openstax-calc-1"], `
For vertical slices, area is \\(∫ₐᵇ(top−bottom)dx\\), where top and bottom are determined by the actual graph on each interval. Find intersection points and split if the ordering changes. For horizontal slices, use \\(∫cᵈ(right−left)dy\\). Choosing the more convenient orientation can avoid splitting or difficult inverse calculations, but both require a clear sketch and consistent variable limits.

Do not assume the \\(x\\)-axis or \\(y\\)-axis is always a boundary. If a region lies between \\(y=x²\\) and \\(y=2x\\), intersections at \\(0\\) and \\(2\\) define the interval and \\(2x−x²\\) is nonnegative there. Area is positive even if the entire region lies below an axis because the integrand compares vertical positions, not signed distance from zero.
`),
      section("Volumes by rotation and cross-section", ["cb-calc-ced", "openstax-calc-2"], `
The disk method integrates circular cross-sections: \\(V=π∫R²dx\\) for rotation about a horizontal axis with no hole. The washer method uses \\(V=π∫(R_outer²−R_inner²)dx\\). Radii are distances from the axis of rotation to the relevant curves, not simply the functions’ \\(y\\)-values when the axis is shifted. Sketch one representative slice and label both radii before integrating.

For known cross-sections perpendicular to an axis, integrate the area formula: \\(V=∫A(x)dx\\). A square with side \\(s\\) has area \\(s²\\); an equilateral triangle has area \\((√3/4)s²\\); a semicircle with radius \\(r\\) has area \\((π/2)r²\\). Identify whether the given base length is side, diameter, or radius. Most volume mistakes come from geometry before any calculus occurs.
`),
      section("BC arc length and deliberate setup", ["cb-calc-ced", "openstax-calc-2", "cb-calc-bc-exam"], `
For a smooth function \\(y=f(x)\\) on \\([a,b]\\), arc length is \\(L=∫ₐᵇ√(1+(f′(x))²)dx\\). This accumulates infinitesimal straight-line distances along the curve and is not the area under \\(√(1+(f′)²)\\) in a geometric interpretation problem. Many resulting integrals require substitution or numerical evaluation. If \\(x=g(y)\\) is easier, use \\(L=∫cᵈ√(1+(g′(y))²)dy\\).

In free response, a correct integral setup may earn substantial credit even before evaluation. Label the region, show intersections, identify the slicing variable, and write units. Calculator use does not remove the need to define \\(R\\), \\(r\\), or \\(A(x)\\). AB students should focus on average value, motion, area, and volumes; BC students add arc length and more technically demanding integrals while using the same accumulation logic.
`),
    ],
    glossary: [
      { term: "Average value", definition: "A function’s definite integral over an interval divided by the interval’s length." },
      { term: "Washer method", definition: "A volume method integrating the area between outer and inner circular radii." },
      { term: "Cross-section", definition: "A slice of a solid whose area is integrated to obtain volume." },
      { term: "Arc length", definition: "Distance along a curve, accumulated through a square-root integral; a BC topic here." },
    ],
    examAlignment: {
      title: "Geometry before evaluation",
      description: "Application questions reward the integral’s boundaries and integrand as much as its numerical result.",
      criteria: [
        "Sketch and label a representative slice before choosing an area or volume formula.",
        "Split motion and area integrals wherever signs or boundary ordering change.",
        "Include initial values and interpret final units in contextual accumulation.",
      ],
      sources: ["cb-calc-ced", "cb-calc-ab-course", "cb-calc-bc-course", "cb-calc-ab-exam", "cb-calc-bc-exam"],
    },
    practice: [
      {
        question: "Which integral gives the area between y=x and y=x² on [0,1]?",
        options: ["∫₀¹(x−x²)dx", "∫₀¹(x²−x)dx", "∫₀¹x dx only", "π∫₀¹(x−x²)²dx"],
        correctIndex: 0,
        explanation: "On [0,1], x≥x², so top minus bottom is x−x².",
        skill: "Set up area",
      },
      {
        question: "A region rotates about the x-axis and has a hole. Which form is appropriate?",
        options: ["π∫(R²−r²)dx", "π∫(R−r)²dx always", "∫(top−bottom)dx with no π", "∫|v|dt"],
        correctIndex: 0,
        explanation: "Washer area is the outer disk area minus inner disk area: π(R²−r²).",
        skill: "Set up volume",
      },
      {
        question: "The area between \\(y=x\\) and \\(y=x^{2}\\) on \\([0,1]\\) is",
        options: ["\\(\\frac{1}{3}\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{1}{6}\\)", "\\(\\frac{5}{6}\\)"],
        correctIndex: 2,
        explanation: "On \\([0,1]\\), \\(x\\ge x^{2}\\), so the area is \\(\\int_{0}^{1}(x-x^{2})\\,dx=\\frac{1}{2}-\\frac{1}{3}=\\frac{1}{6}\\).",
        skill: "Area between curves",
      },
      {
        question: "The average value of \\(f(x)=x^{2}\\) on \\([0,3]\\) is",
        options: ["\\(9\\)", "\\(3\\)", "\\(1\\)", "\\(\\frac{9}{2}\\)"],
        correctIndex: 1,
        explanation: "The average value equals one over the interval length times the definite integral: \\(\\frac{1}{3-0}\\int_{0}^{3}x^{2}\\,dx=\\frac{1}{3}\\cdot 9=3\\), so the function averages three on this interval.",
        skill: "Average value of a function",
      },
    ],
  },
  {
    unitNumber: 9,
    title: "Unit 9 · Parametric, polar, and vector-valued functions",
    description: "Analyze curves and planar motion through parameters and vectors, calculate slopes and accumulated distance, and work with polar slopes and areas.",
    examWeight: "BC only · 10–15% of multiple-choice weighting",
    audience: "BC only",
    objectives: [
      "Differentiate parametric and vector-valued functions and interpret planar motion.",
      "Calculate parametric arc length and distinguish speed from velocity.",
      "Convert polar relationships and set up polar slopes and areas correctly.",
    ],
    sections: [
      section("Parameters describe a path and its timing", ["cb-calc-ced", "openstax-calc-2"], `
A parametric curve gives \\(x=f(t)\\) and \\(y=g(t)\\), so the same geometric path can be traced at different speeds or directions by different parameterizations. Orientation matters. Eliminating the parameter can reveal the path’s shape but may discard timing and restrict domain information. Keep the original parameter interval when determining which portion of a curve is traversed.

Where \\(dx/dt≠0\\), the slope is \\(dy/dx=(dy/dt)/(dx/dt)\\). Horizontal tangents generally require \\(dy/dt=0\\) with \\(dx/dt≠0\\); vertical tangents generally require \\(dx/dt=0\\) with \\(dy/dt≠0\\). If both vanish, further analysis is needed. The second derivative is \\(d²y/dx²=[d/dt(dy/dx)]/(dx/dt)\\), not simply \\(y″(t)/x″(t)\\).
`),
      section("Vector-valued motion", ["cb-calc-ced", "openstax-calc-2"], `
A position vector \\(r(t)=⟨x(t),y(t)⟩\\) differentiates component by component: velocity is \\(r′(t)=⟨x′(t),y′(t)⟩\\) and acceleration is \\(r″(t)\\). Speed is the magnitude \\(|v(t)|=√((x′)²+(y′)²)\\), a scalar. Direction comes from the velocity vector, so a nonzero speed does not by itself describe whether the particle moves left, right, up, or down.

Displacement over \\([a,b]\\) is \\(r(b)−r(a)=∫ₐᵇv(t)dt\\) componentwise. Distance traveled is \\(∫ₐᵇ|v(t)|dt\\). If given acceleration, integrate to recover velocity and use an initial velocity vector before integrating again for position. Each integration introduces vector constants determined by initial conditions, just as in one-dimensional motion.
`),
      section("Parametric arc length", ["cb-calc-ced", "openstax-calc-2"], `
For a smooth parametric curve traversed once, arc length is \\(L=∫ₐᵇ√((dx/dt)²+(dy/dt)²)dt\\). The integrand is speed, making this formula the accumulated distance along the path. If a parameterization retraces part of the curve, the integral computes travel distance rather than the length of the distinct geometric set unless the interval is adjusted.

For example, \\(x=3cos t\\), \\(y=3sin t\\) on \\([0,2π]\\) has speed \\(3\\), so length is \\(6π\\), matching a circle of radius three. The formula for function arc length from Unit 8 is a special case with \\(x=t\\). Always simplify the speed before reaching for a complicated antiderivative; many AP examples use Pythagorean identities.
`),
      section("Polar coordinates and slope", ["cb-calc-ced", "openstax-calc-2"], `
Polar coordinates locate points through \\(x=r cosθ\\), \\(y=r sinθ\\), with \\(r\\) able to be negative under convention, producing a point in the opposite direction. The same point has infinitely many representations. To find slope for \\(r=f(θ)\\), differentiate \\(x\\) and \\(y\\) with respect to \\(θ\\): \\(dy/dx=(r′ sinθ+r cosθ)/(r′ cosθ−r sinθ)\\) where the denominator is nonzero.

Symmetry tests can help sketch \\(r=1+cosθ\\) or rose curves, but they are not substitutes for evaluating representative angles. Negative \\(r\\) values can surprise students when interpreting petals or loops. Identify the parameter interval needed to trace a region once before integrating; a full \\(0\\) to \\(2π\\) interval may repeat or include unintended portions depending on the curve.
`),
      section("Polar area and exam setup", ["cb-calc-ced", "openstax-calc-2", "cb-calc-bc-exam"], `
A small polar sector has area approximately \\((1/2)r²Δθ\\), so polar area is \\(A=(1/2)∫α^β [r(θ)]² dθ\\). For area between curves, use \\((1/2)∫(r_outer²−r_inner²)dθ\\) with appropriate angular intervals and radial ordering. Find intersections by solving equations while also checking the pole, which different coordinate representations may share without matching \\(θ\\) values.

BC free-response questions often combine polar or parametric setup with motion, tangent lines, or accumulation. State whether you are computing slope, speed, displacement, distance, or area; these have different formulas. Calculator evaluation may be necessary, but the integral’s limits and integrand communicate the mathematical model. Label angles in radians and keep the \\(1/2\\) factor in polar area.
`),
    ],
    glossary: [
      { term: "Parameter", definition: "An independent variable used to define coordinates or components along a curve." },
      { term: "Velocity vector", definition: "The componentwise derivative of position, containing both direction and rate of motion." },
      { term: "Parametric arc length", definition: "The integral of speed over a parameter interval, giving distance traveled along a smooth path." },
      { term: "Polar area", definition: "Area accumulated through sectors using one-half the integral of squared radius." },
    ],
    examAlignment: {
      title: "BC representations of curves and motion",
      description: "Unit 9 requires translation among coordinate systems, vectors, derivatives, and accumulation.",
      criteria: [
        "Divide the derivative of parametric slope by dx/dt again when finding the second derivative.",
        "Use speed magnitude for distance and componentwise velocity for displacement.",
        "Find polar intersections and angular intervals before writing an area integral.",
      ],
      sources: ["cb-calc-ced", "cb-calc-ab-course", "cb-calc-bc-course", "cb-calc-bc-exam"],
    },
    practice: [
      {
        question: "For x=t² and y=t³, what is dy/dx for t≠0?",
        options: ["3t/2", "2/(3t)", "6t", "t"],
        correctIndex: 0,
        explanation: "Differentiate each coordinate: dy/dt=3t² and dx/dt=2t, so dy/dx=(3t²)/(2t)=3t/2 for nonzero t.",
        skill: "Differentiate parametric curves",
      },
      {
        question: "Which expression gives area enclosed by r=f(θ) from α to β under the usual tracing assumptions?",
        options: ["∫α^β f(θ)dθ", "(1/2)∫α^β [f(θ)]²dθ", "π∫α^β f(θ)dθ", "∫α^β √(1+[f(θ)]²)dθ"],
        correctIndex: 1,
        explanation: "Polar sector area produces the one-half squared-radius integral.",
        skill: "Set up polar area",
      },
      {
        question: "If \\(x=t^{2}\\) and \\(y=t^{3}\\), then \\(\\frac{dy}{dx}=\\)",
        options: ["\\(\\frac{3t}{2}\\)", "\\(\\frac{2t}{3}\\)", "\\(6t\\)", "\\(\\frac{t}{2}\\)"],
        correctIndex: 0,
        explanation: "For parametric curves the derivative is the ratio of the two rates of change: \\(\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}=\\frac{3t^{2}}{2t}=\\frac{3t}{2}\\), which is valid for \\(t\\ne 0\\).",
        skill: "Parametric derivatives",
      },
      {
        question: "A particle moves with position \\(\\mathbf{r}(t)=\\langle\\cos t,\\ \\sin t\\rangle\\). Its speed at any time \\(t\\) is",
        options: ["\\(0\\)", "\\(1\\)", "\\(\\sin t+\\cos t\\)", "\\(t\\)"],
        correctIndex: 1,
        explanation: "Velocity is \\(\\langle-\\sin t,\\ \\cos t\\rangle\\), whose magnitude is \\(\\sqrt{\\sin^{2}t+\\cos^{2}t}=1\\).",
        skill: "Speed of a vector-valued function",
      },
    ],
  },
  {
    unitNumber: 10,
    title: "Unit 10 · Infinite sequences and series",
    description: "Determine convergence with appropriate tests, analyze power series, build Taylor representations, and bound approximation error.",
    examWeight: "BC only · 15–20% of multiple-choice weighting",
    audience: "BC only",
    objectives: [
      "Distinguish sequence convergence from series convergence and select appropriate tests.",
      "Determine radius and interval of convergence, including endpoint checks.",
      "Construct Taylor/Maclaurin polynomials and justify approximation error bounds.",
    ],
    sections: [
      section("Sequences, partial sums, and geometric series", ["cb-calc-ced", "openstax-calc-2"], `
A sequence \\({aₙ}\\) converges when its terms approach a finite limit as \\(n→∞\\). A series \\(∑aₙ\\) converges when its sequence of partial sums \\(S_N=a₁+⋯+a_N\\) converges. These are different objects: terms may approach zero while their series diverges, as the harmonic series demonstrates. Always identify whether a question concerns the terms or their accumulated sum.

A geometric series \\(∑_{n=0}^∞ arⁿ\\) converges to \\(a/(1−r)\\) when \\(|r|<1\\) and diverges otherwise except trivial cases. The formula applies to the infinite sum, not to a partial sum. A finite geometric partial sum is \\(a(1−r^{N+1})/(1−r)\\) for \\(r≠1\\). Rewriting a repeating decimal as a geometric series is one direct application.
`),
      section("Divergence, p-series, integral, and comparison tests", ["cb-calc-ced", "openstax-calc-2"], `
The nth-term test says that if \\(lim aₙ≠0\\), then \\(∑aₙ\\) diverges. If the limit is zero, the test is inconclusive. A p-series \\(∑1/nᵖ\\) converges for \\(p>1\\) and diverges for \\(p≤1\\). The integral test applies to positive, continuous, decreasing terms and relates the series to an improper integral; it can also support remainder estimates.

Direct comparison bounds a positive-term series against a known convergent or divergent series in the correct direction. Limit comparison is often easier when terms have similar asymptotic behavior: if \\(aₙ,bₙ>0\\) and \\(lim aₙ/bₙ\\) is a finite positive number, both series share convergence behavior. Do not use comparison reasoning to claim that a smaller positive series must diverge or a larger one must converge.
`),
      section("Alternating, ratio, and absolute convergence", ["cb-calc-ced", "openstax-calc-2"], `
The alternating series test applies when terms alternate, their absolute values decrease eventually, and \\(lim bₙ=0\\); then the series converges. The remainder after \\(N\\) terms is at most the first omitted absolute term \\(b_{N+1}\\) and has the sign of that term under the test’s conditions. This error bound is distinct from the Lagrange form used for Taylor polynomials.

The ratio test examines \\(L=lim |a_{n+1}/aₙ|\\): \\(L<1\\) gives absolute convergence, \\(L>1\\) or infinity gives divergence, and \\(L=1\\) is inconclusive. It is especially useful with factorials and exponentials. A series is absolutely convergent if \\(∑|aₙ|\\) converges and conditionally convergent if it converges only with its signs. Absolute convergence implies convergence, not the converse.
`),
      section("Power series and intervals of convergence", ["cb-calc-ced", "openstax-calc-2"], `
A power series \\(∑cₙ(x−a)ⁿ\\) is centered at \\(a\\). The ratio or root test usually yields a radius \\(R\\): absolute convergence for \\(|x−a|<R\\) and divergence for \\(|x−a|>R\\). The radius can be zero, finite, or infinite. The center is not the radius, and convergence inside does not tell you what happens at the endpoints.

Test \\(x=a−R\\) and \\(x=a+R\\) separately because the ratio test is inconclusive there. The resulting interval may include neither, one, or both endpoints. New power series can be created by substitution, algebraic manipulation, differentiation, or integration within the radius, but endpoint behavior may change after calculus operations. Keep track of the new center and any domain restrictions.
`),
      section("Taylor polynomials and error", ["cb-calc-ced", "openstax-calc-2", "cb-calc-bc-exam"], `
The Taylor polynomial of degree \\(n\\) centered at \\(a\\) is \\(Pₙ(x)=∑_{k=0}^n [f^{(k)}(a)/k!](x−a)^k\\); a Maclaurin polynomial has \\(a=0\\). It matches the function’s derivatives at the center through degree \\(n\\). Standard series for \\(eˣ\\), \\(sin x\\), \\(cos x\\), \\(ln(1+x)\\), and \\(1/(1−x)\\) can be transformed instead of recomputing every coefficient.

The Lagrange error bound states that \\(|Rₙ(x)|≤M|x−a|^{n+1}/(n+1)!\\), where \\(M\\) bounds \\(|f^{(n+1)}|\\) on the relevant interval. Use a defensible maximum, not simply the derivative at the center unless monotonicity justifies it. Alternating series error may be simpler when its conditions hold. In FRQs, identify which theorem you use, show the bound, and conclude with appropriate approximation or convergence language.
`),
    ],
    glossary: [
      { term: "Partial sum", definition: "The finite sum of the first N terms, whose limit determines series convergence." },
      { term: "Conditional convergence", definition: "Convergence of a signed series while the corresponding absolute-value series diverges." },
      { term: "Radius of convergence", definition: "The distance from a power series’ center within which absolute convergence is guaranteed by the standard test." },
      { term: "Lagrange error bound", definition: "A Taylor-remainder bound using a maximum of the next derivative and a factorial denominator." },
    ],
    examAlignment: {
      title: "Test selection and justified approximation",
      description: "This heavily weighted BC unit rewards choosing a valid test and stating exactly what it proves.",
      criteria: [
        "Never conclude convergence from terms approaching zero alone.",
        "Check both endpoints separately after finding a finite radius of convergence.",
        "Name the error theorem and justify the derivative bound or alternating conditions.",
      ],
      sources: ["cb-calc-ced", "cb-calc-ab-course", "cb-calc-bc-course", "cb-calc-bc-exam"],
    },
    practice: [
      {
        question: "What does lim(n→∞) aₙ=0 establish about ∑aₙ?",
        options: ["It always converges.", "It always diverges.", "It may converge or diverge; more analysis is required.", "It converges to zero."],
        correctIndex: 2,
        explanation: "Zero term limit is necessary for convergence but not sufficient, as the harmonic series shows.",
        skill: "Apply the divergence test correctly",
      },
      {
        question: "A power series has radius 3 centered at 2. What remains after applying the ratio test?",
        options: ["Nothing; all real x converge", "Check x=−1 and x=5 separately to determine the interval", "Only check x=2", "Declare conditional convergence everywhere"],
        correctIndex: 1,
        explanation: "The endpoints are 2±3=−1,5, and the ratio test gives no conclusion at either.",
        skill: "Determine interval of convergence",
      },
      {
        question: "\\(3+1+\\frac{1}{3}+\\frac{1}{9}+\\cdots=\\)",
        options: ["\\(3\\)", "\\(4\\)", "\\(\\frac{9}{2}\\)", "The series diverges"],
        correctIndex: 2,
        explanation: "This geometric series has \\(a=3\\) and \\(r=\\frac{1}{3}\\), so the sum is \\(\\frac{3}{1-\\frac{1}{3}}=\\frac{9}{2}\\).",
        skill: "Geometric series",
      },
      {
        question: "The series \\(\\sum_{n=1}^{\\infty}\\frac{1}{n^{2}}\\)",
        options: ["Diverges by the \\(p\\)-test with \\(p=2\\)", "Converges by the \\(p\\)-test with \\(p=2>1\\)", "Diverges by the ratio test", "Converges to \\(1\\)"],
        correctIndex: 1,
        explanation: "A \\(p\\)-series converges when \\(p>1\\); here \\(p=2\\), so the series converges (its exact sum is not required).",
        skill: "p-series test",
      },
    ],
  },
];
