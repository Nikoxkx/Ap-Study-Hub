import type { CourseDefense, WrittenWork } from "./types";

/**
 * AP Calculus written work and defense.
 *
 * On the calculus paper the answer is worth one point and the justification
 * is worth the rest, so every example below writes the sentence that has to
 * go next to the algebra. The defense lines are the same sentences, said out
 * loud — which is how a student discovers whether they know why a step is
 * legal or only know that it usually works.
 */
export const apCalcWrittenWork: WrittenWork[] = [
  {
    id: "ap-calc-1",
    courseSlug: "ap-calc",
    unitNumber: 1,
    prompt: "Evaluate \\(\\displaystyle\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}\\).",
    plan: [
      "Substitute first. If it breaks, you know which method you need before you spend time factoring.",
      "Say why cancelling is legal — the limit does not include \\(x = 3\\).",
    ],
    example: [
      "Step 1 — substitute: \\(\\dfrac{3^2 - 9}{3 - 3} = \\dfrac{0}{0}\\), an indeterminate form, so the expression needs rewriting.",
      "Step 2 — factor: \\(x^2 - 9 = (x-3)(x+3)\\)",
      "Step 3 — cancel, noting \\(x \\neq 3\\):",
      "\\[\\frac{(x-3)(x+3)}{x-3} = x + 3 \\quad \\text{for } x \\neq 3\\]",
      "Step 4 — evaluate: \\(\\displaystyle\\lim_{x\\to3} (x+3) = 6\\)",
      "The function still has a removable discontinuity at \\(x = 3\\). The limit describes the approach, not the value there.",
    ],
    because:
      "The substitution is shown rather than implied, the cancellation carries the condition \\(x \\neq 3\\), and the last sentence distinguishes the limit from the function value. That last sentence is often the difference between full credit and a method point, because it shows you know what a limit is.",
    say: [
      "I substituted first, because if it had not been indeterminate I would have been finished in one line.",
      "Getting zero over zero tells me the top and bottom share a factor, so I factored rather than reaching for L'Hôpital immediately.",
      "I wrote x not equal to three next to the cancellation, because cancelling is only legal away from the hole.",
      "The final sentence is me saying that six is where the graph is heading, not where the graph is. There is still no point at three.",
    ],
    trap:
      "Cancelling without saying why it is allowed, then writing \\(f(3) = 6\\). Both are small slips and both are marked.",
  },
  {
    id: "ap-calc-2",
    courseSlug: "ap-calc",
    unitNumber: 2,
    prompt:
      "Use the limit definition to find \\(f'(2)\\) for \\(f(x) = x^2 + 3x\\).",
    plan: [
      "Expand the numerator completely before dividing by \\(h\\).",
      "Keep the \\(h \\neq 0\\) condition until the limit is applied.",
    ],
    example: [
      "\\[f'(2) = \\lim_{h \\to 0} \\frac{f(2+h) - f(2)}{h}\\]",
      "\\[f(2+h) = (2+h)^2 + 3(2+h) = 4 + 4h + h^2 + 6 + 3h = 10 + 7h + h^2\\]",
      "\\[f(2) = 4 + 6 = 10\\]",
      "\\[f'(2) = \\lim_{h\\to0} \\frac{(10 + 7h + h^2) - 10}{h} = \\lim_{h\\to0} \\frac{7h + h^2}{h}\\]",
      "\\[= \\lim_{h \\to 0} (7 + h) \\quad (h \\neq 0)\\]",
      "\\[= 7\\]",
      "Check: \\(f'(x) = 2x + 3\\), so \\(f'(2) = 7\\). ✓",
    ],
    because:
      "The expansion is complete, the \\(h\\) cancels cleanly, and the answer is checked against the power rule. The check costs ten seconds and catches most sign errors.",
    say: [
      "I expanded the numerator fully before dividing, because dividing first is where people lose terms.",
      "I kept h not equal to zero above the limit line, because the expression is undefined at zero and the limit is what rescues it.",
      "The check at the end is the power rule. If it disagreed, I would assume my algebra was wrong, not the rule.",
      "If asked what this number means, it is the slope of the tangent at x equals two, which is also the instantaneous rate of change there.",
    ],
    trap:
      "Writing \\(\\frac{0}{0} = 1\\) or dropping the limit notation too early. The notation is the argument; losing it loses the point.",
  },
  {
    id: "ap-calc-3",
    courseSlug: "ap-calc",
    unitNumber: 3,
    prompt:
      "Given \\(f(1) = 2\\), \\(f'(1) = 4\\), and \\(g(x) = f^{-1}(x)\\), find \\(g'(2)\\).",
    plan: [
      "Find the input to \\(f\\) that produces 2. That is the whole problem.",
      "State the inverse rule before substituting, so the reasoning is visible.",
    ],
    example: [
      "Since \\(f(1) = 2\\), the inverse satisfies \\(g(2) = 1\\).",
      "The inverse rule: \\(g'(x) = \\dfrac{1}{f'(g(x))}\\)",
      "So \\(g'(2) = \\dfrac{1}{f'(g(2))} = \\dfrac{1}{f'(1)} = \\dfrac{1}{4}\\)",
      "The rule requires \\(f'(1) \\neq 0\\), which holds here.",
    ],
    because:
      "The corresponding input is identified first, the rule is written before substitution, and the condition \\(f' \\neq 0\\) is stated. Three lines, three points, and none of them is the arithmetic.",
    say: [
      "I did not solve for the inverse function, because I do not need it and it usually cannot be found.",
      "The trick is that g of 2 equals 1, which comes straight from f of 1 equals 2. Everything follows from that.",
      "I wrote the rule before substituting so the marker can see I know it, not just that I got a quarter.",
      "I checked that f prime at 1 is not zero, because if it were, the inverse would not be differentiable there.",
    ],
    trap:
      "Confusing \\(g'(2)\\) with \\(f'(2)\\). The derivative of the inverse is evaluated at the output of \\(f\\), which is \\(g(2)\\), not 2.",
  },
  {
    id: "ap-calc-4",
    courseSlug: "ap-calc",
    unitNumber: 4,
    prompt:
      "A balloon's radius increases at \\(2\\,\\text{cm/s}\\). How fast is the volume increasing when \\(r = 5\\,\\text{cm}\\)?",
    plan: [
      "Write the relationship between the quantities before differentiating.",
      "Name which rate you were given and which you want. This is the whole method.",
    ],
    example: [
      "Volume: \\(V = \\frac{4}{3}\\pi r^3\\)",
      "Differentiate with respect to time, using the chain rule:",
      "\\[\\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt}\\]",
      "Given \\(\\frac{dr}{dt} = 2\\) and \\(r = 5\\):",
      "\\[\\frac{dV}{dt} = 4\\pi (25)(2) = 200\\pi \\approx 628\\,\\text{cm}^3/\\text{s}\\]",
      "The units are cubic centimeters per second, which matches a volume rate.",
    ],
    because:
      "The relationship is stated first, the chain rule is explicit rather than a leap, the given values are substituted after differentiating, and the units are checked. Substituting numbers before differentiating is the classic error, and this order avoids it.",
    say: [
      "I wrote the volume formula first because related rates always start with an equation that connects the two quantities.",
      "Then I differentiated with respect to time rather than with respect to r, and the chain rule is what carries the dr dt factor.",
      "I substituted the numbers last, because if I substitute first I am differentiating a constant.",
      "The unit check is quick and it catches a wrong exponent. Volume per second has to be cubic length over time.",
    ],
    trap:
      "Plugging \\(r = 5\\) into the formula before differentiating. That gives the volume, not the rate — and it is worth zero.",
  },
  {
    id: "ap-calc-5",
    courseSlug: "ap-calc",
    unitNumber: 5,
    prompt:
      "Find and classify the critical points of \\(f(x) = x^3 - 3x\\) on \\([-2, 2]\\).",
    plan: [
      "Critical points come from \\(f' = 0\\) and from \\(f'\\) undefined. Say which you are using.",
      "Classify with a sign chart or the second derivative, then check the endpoints — the interval is closed.",
    ],
    example: [
      "\\[f'(x) = 3x^2 - 3 = 3(x-1)(x+1)\\]",
      "Critical points at \\(x = -1\\) and \\(x = 1\\), both inside \\([-2,2]\\).",
      "Sign of \\(f'\\): positive on \\((-\\infty,-1)\\), negative on \\((-1,1)\\), positive on \\((1,\\infty)\\).",
      "So \\(f\\) increases to \\(x = -1\\), decreases to \\(x = 1\\), and increases after — a local maximum at \\(x = -1\\) and a local minimum at \\(x = 1\\).",
      "\\[f(-1) = 2, \\quad f(1) = -2, \\quad f(-2) = -2, \\quad f(2) = 2\\]",
      "On the closed interval the absolute maximum is \\(2\\) (at \\(x = -2\\) and \\(x = -1\\)) and the absolute minimum is \\(-2\\) (at \\(x = 1\\) and \\(x = 2\\)).",
    ],
    because:
      "The derivative is factored so the signs are readable, the classification uses a sign chart rather than a guess, and the endpoints are evaluated because the interval is closed. Missing endpoints is the most common way to lose the absolute-extremum point.",
    say: [
      "I factored the derivative instead of using the quadratic formula, because factored form gives me the sign chart for free.",
      "I said increasing then decreasing, which is the justification for a local maximum. 'The derivative is zero' on its own does not classify anything.",
      "Then I evaluated the function at the endpoints as well as the critical points, because the question gives a closed interval.",
      "If the interval had been open, the endpoints would not count, and my answer would be different.",
    ],
    trap:
      "Finding both critical points and never checking the endpoints on a closed interval. The largest value on \\([-2,2]\\) can be at \\(x = -2\\), and often is.",
  },
  {
    id: "ap-calc-6",
    courseSlug: "ap-calc",
    unitNumber: 6,
    prompt:
      "If \\(g(x) = \\displaystyle\\int_1^{x^2} \\sin t\\, dt\\), find \\(g'(x)\\).",
    plan: [
      "Name the upper limit, so the composition is visible.",
      "Apply the Fundamental Theorem and then the chain rule — two steps, not one.",
    ],
    example: [
      "Let \\(u = x^2\\), so that \\(g(x) = \\displaystyle\\int_1^{u} \\sin t\\, dt\\).",
      "By the Fundamental Theorem of Calculus: \\(\\dfrac{d}{du}\\displaystyle\\int_1^u \\sin t\\,dt = \\sin u\\)",
      "By the chain rule: \\(\\dfrac{du}{dx} = 2x\\)",
      "\\[g'(x) = \\sin(u) \\cdot 2x = 2x\\sin(x^2)\\]",
      "Check: at \\(x = 0\\) the upper limit stops moving, so \\(g'(0) = 0\\), which the formula gives.",
    ],
    because:
      "The substitution makes the composition explicit, both theorems are named, and the substitution back is shown. The check at \\(x = 0\\) is a cheap way to catch a missing chain-rule factor.",
    say: [
      "I named the upper limit u so that I could see the two functions I am composing.",
      "The Fundamental Theorem handles the integral and the chain rule handles the x squared. Forgetting the second one is the standard error.",
      "I substituted u back at the end, because an answer in u is not an answer in x.",
      "My check is x equals zero: the integral's upper limit is not moving there, so the derivative should vanish, and it does.",
    ],
    trap:
      "Writing just \\(\\sin(x^2)\\) and stopping. That is the derivative with respect to the upper limit; it is missing the inner derivative.",
  },
  {
    id: "ap-calc-7",
    courseSlug: "ap-calc",
    unitNumber: 7,
    prompt: "Solve \\(\\dfrac{dy}{dx} = xy\\) with \\(y(0) = 4\\).",
    plan: [
      "Separate, integrate both sides, then find the constant from the initial condition.",
      "Say where you divided by \\(y\\), and what that excludes.",
    ],
    example: [
      "For \\(y \\neq 0\\): \\(\\dfrac{1}{y}\\,dy = x\\,dx\\)",
      "Integrate: \\(\\ln|y| = \\dfrac{x^2}{2} + C\\)",
      "Exponentiate: \\(|y| = e^{C}e^{x^2/2}\\), so \\(y = Ae^{x^2/2}\\) with \\(A = \\pm e^C\\)",
      "Use \\(y(0) = 4\\): \\(4 = Ae^{0} \\Rightarrow A = 4\\)",
      "\\[y = 4e^{x^2/2}\\]",
      "Check: \\(y' = 4e^{x^2/2}\\cdot x = xy\\) ✓ and \\(y(0) = 4\\) ✓",
    ],
    because:
      "The division by \\(y\\) is flagged, the absolute value is resolved rather than ignored, the constant is found from the condition, and the solution is differentiated back. Solving a differential equation without checking is answering half the question.",
    say: [
      "I separated the variables first, and I noted that this requires y not equal to zero.",
      "The absolute value is real, not decoration. It becomes a plus or minus that is absorbed into the constant, and the initial condition then chooses the sign.",
      "I found A from y of zero equals four, which is one line.",
      "The check is differentiating my answer and getting the original equation back. If it had come out as two xy or zero, I would know immediately.",
    ],
    trap:
      "Dropping the constant and reporting \\(y = e^{x^2/2 + C}\\) with \\(C\\) still in it. An initial value problem ends with a number, not a letter.",
  },
  {
    id: "ap-calc-8",
    courseSlug: "ap-calc",
    unitNumber: 8,
    prompt: "Find the area enclosed by \\(y = 2x\\) and \\(y = x^2\\).",
    plan: [
      "Intersections first — they are the bounds.",
      "Decide which curve is on top by testing a midpoint, not by assuming.",
    ],
    example: [
      "Intersections: \\(2x = x^2 \\Rightarrow x^2 - 2x = 0 \\Rightarrow x(x-2) = 0\\), so \\(x = 0\\) and \\(x = 2\\).",
      "Test \\(x = 1\\): \\(2(1) = 2\\) and \\(1^2 = 1\\), so \\(2x \\geq x^2\\) on \\([0,2]\\).",
      "\\[A = \\int_0^2 \\left(2x - x^2\\right) dx\\]",
      "\\[= \\left[x^2 - \\frac{x^3}{3}\\right]_0^2 = 4 - \\frac{8}{3} = \\frac{4}{3}\\]",
      "The area is \\(\\frac43\\) square units, and it is positive, which is a check on the upper-minus-lower order.",
    ],
    because:
      "The bounds come from solving, the upper curve is verified rather than assumed, the integral is set up with upper minus lower, and the sign is used as a check. Each of those is a separate point on the rubric.",
    say: [
      "I found the intersections first, because those are the limits and guessing them is how you lose the setup point.",
      "I tested x equals one to see which curve is higher, because on some intervals the answer flips.",
      "Upper minus lower is the rule, and I wrote it that way rather than subtracting the integrals from memory.",
      "The check is the sign. Area cannot be negative, so a negative answer means I subtracted the wrong way round.",
    ],
    trap:
      "Integrating from \\(0\\) to \\(2\\) without checking which curve is on top. If it is reversed, the answer is \\(-\\frac43\\) and the method point goes with it.",
  },
  {
    id: "ap-calc-9",
    courseSlug: "ap-calc",
    unitNumber: 9,
    prompt:
      "A particle moves with \\(x(t) = 3\\cos t\\), \\(y(t) = 3\\sin t\\). Find the distance traveled from \\(t = 0\\) to \\(t = 2\\pi\\), and explain why the answer is what it is.",
    plan: [
      "The speed is the magnitude of the velocity vector. Write both derivatives first.",
      "Simplify with the Pythagorean identity before integrating — it usually collapses.",
    ],
    example: [
      "\\[\\frac{dx}{dt} = -3\\sin t, \\qquad \\frac{dy}{dt} = 3\\cos t\\]",
      "\\[\\text{speed} = \\sqrt{(-3\\sin t)^2 + (3\\cos t)^2} = \\sqrt{9(\\sin^2 t + \\cos^2 t)} = 3\\]",
      "\\[L = \\int_0^{2\\pi} 3\\,dt = 6\\pi\\]",
      "The particle travels at constant speed 3 on a circle of radius 3, so the distance is the circumference \\(2\\pi r = 6\\pi\\), which agrees.",
    ],
    because:
      "The derivatives come first, the identity is used to simplify rather than to impress, and the geometry is used as an independent check on the integral. Two methods agreeing is the strongest check available on this topic.",
    say: [
      "I wrote both derivatives before doing anything with them, because the speed formula needs both.",
      "The simplification matters. If the speed had depended on t, the integral would need more work; here it is constant, which is the reason the answer is a circle's circumference.",
      "I checked the integral against the geometry, because circumference is something I already know.",
      "The weakness is that this problem is unusually clean. A general parametric curve would not simplify, and I would have to integrate numerically.",
    ],
    trap:
      "Forgetting the square root and adding the derivatives. Distance is the integral of speed; speed is the magnitude of the velocity vector.",
  },
  {
    id: "ap-calc-10",
    courseSlug: "ap-calc",
    unitNumber: 10,
    prompt:
      "Write the third-degree Maclaurin polynomial for \\(f(x) = e^x\\), use it to approximate \\(e^{0.1}\\), and say whether the approximation is too high or too low.",
    plan: [
      "Build the polynomial from the derivatives at zero, not from memory.",
      "For the error direction, look at the next term's sign — that is the fastest argument available.",
    ],
    example: [
      "\\(f^{(k)}(0) = e^0 = 1\\) for every \\(k\\), so",
      "\\[P_3(x) = 1 + x + \\frac{x^2}{2} + \\frac{x^3}{6}\\]",
      "\\[P_3(0.1) = 1 + 0.1 + 0.005 + 0.0001\\overline{6} \\approx 1.10517\\]",
      "The next term is \\(\\dfrac{x^4}{24} = \\dfrac{0.0001}{24} > 0\\), and the terms after it are all positive for \\(x > 0\\), so \\(P_3(0.1)\\) is an underestimate: \\(e^{0.1} > 1.10517\\).",
    ],
    because:
      "The polynomial is derived, the arithmetic is laid out term by term, and the error direction is argued from the sign of the next term rather than asserted. That argument is worth more than the approximation itself.",
    say: [
      "Every derivative of e to the x is itself, so every derivative at zero is one. That is why the coefficients are one over k factorial.",
      "I wrote the factorial division on every term rather than skipping to the numbers, because the structure is the point.",
      "The error direction comes from the next term. If it is positive and I have stopped before it, I am below the true value.",
      "For x greater than zero every term is positive, which is why the argument works here and would need more care for a negative x.",
    ],
    trap:
      "Claiming the approximation is too high because 'truncating loses value'. The direction of the error depends on the sign of the remaining terms, and here they are positive.",
  },
];

export const apCalcDefense: CourseDefense = {
  courseSlug: "ap-calc",
  claim:
    "That each line is legal, each answer is checked, and you can say what the number means — not just that you found it.",
  frames: [
    "The first thing I did was check whether direct substitution works, because it decides the method.",
    "This step is legal because…, and the condition is…",
    "I checked the answer against…, and it agrees / does not agree, which means…",
    "The quantity I was given is…, and the quantity I want is…, and the relationship between them is…",
    "The answer means…, in this context, which is why the sign is…",
  ],
  markedOn: [
    "Whether the setup is written before the algebra",
    "Whether each step is justified, not just performed",
    "Whether the answer is checked against an independent method",
    "Whether the final value is interpreted in context",
  ],
  units: [
    {
      unitNumber: 1,
      keep: ["The substitution result", "The fact that the limit is not the function value"],
      question: "\"Why are you allowed to cancel there?\"",
      answer: [
        "I can cancel because the limit approaches three without ever reaching it, so x minus three is never zero for the purposes of the limit.",
        "I would add that the function itself still has no value at three, and that hole is exactly why the cancellation is legal here.",
        "If this had been a limit at infinity I would have divided by the highest power instead, so the method is doing real work, not just notation.",
      ],
    },
    {
      unitNumber: 2,
      keep: ["The expanded numerator", "The \\(h \\neq 0\\) condition"],
      question: "\"Why can you divide by h if h goes to zero?\"",
      answer: [
        "Because h is not zero at the point where I divide; it is only approaching zero.",
        "I take the limit after I divide, which is exactly what makes the expression defined for every h except zero.",
        "That is why the condition is written above the limit line and the answer is what remains.",
      ],
    },
    {
      unitNumber: 3,
      keep: ["\\(g(2) = 1\\)", "The inverse-derivative rule, written out"],
      question: "\"Why is the answer at 2 not \\(1/f'(2)\\)?\"",
      answer: [
        "Because the rule evaluates f prime at the input that produces 2, which is 1, not at 2.",
        "I found that input from f of 1 equals 2.",
        "The rule also requires f prime not to be zero there, and I checked.",
      ],
    },
    {
      unitNumber: 4,
      keep: ["The relationship between the variables", "The two rates, named"],
      question: "\"Why not put the numbers in first?\"",
      answer: [
        "Because if I substitute r equals five before differentiating, I am differentiating a constant and get zero.",
        "The relationship has to be differentiated while both quantities are still variables.",
        "The units check the result: a volume per second has to be cubic centimeters per second.",
      ],
    },
    {
      unitNumber: 5,
      keep: ["The factored derivative", "The endpoint values"],
      question: "\"Why is a zero derivative not enough to call it a maximum?\"",
      answer: [
        "Because a zero derivative is a candidate, not a conclusion. The sign has to change from positive to negative.",
        "I used the sign chart to show that change.",
        "And the interval is closed, so the endpoints can beat the critical points, and here they tie.",
      ],
    },
    {
      unitNumber: 6,
      keep: ["The substitution \\(u = x^2\\)", "The chain-rule factor"],
      question: "\"Where did the \\(2x\\) come from?\"",
      answer: [
        "It came from differentiating the upper limit. The Fundamental Theorem gives me the integrand evaluated at that limit, and the chain rule supplies the derivative of the limit itself.",
        "If I leave it out, my answer is missing a factor, and the check at zero is what catches me.",
        "I only need it because the upper limit is a function of x rather than plain x, which is the condition I would state before using the rule.",
      ],
    },
    {
      unitNumber: 7,
      keep: ["The separation step", "The constant found from the initial condition"],
      question: "\"Why is there a constant at all?\"",
      answer: [
        "Because integrating gives a family of solutions, and the initial condition picks one member.",
        "I resolved the absolute value into a sign that gets absorbed into that constant.",
        "Then I differentiated my answer to confirm it solves the original equation.",
      ],
    },
    {
      unitNumber: 8,
      keep: ["The intersection bounds", "The test that decided upper from lower"],
      question: "\"How do you know which curve is on top?\"",
      answer: [
        "I tested a point between the intersections instead of assuming it.",
        "At x equals one, 2x is 2 and x squared is 1.",
        "The positive result is the check. A negative area would mean I had them the wrong way round.",
      ],
    },
    {
      unitNumber: 9,
      keep: ["Both derivatives", "The factorization that made speed constant"],
      question: "\"Why is the answer a circumference?\"",
      answer: [
        "Because the speed works out to a constant three and the path is a circle of radius three, so the arc-length integral collapses to something I can do in my head.",
        "Constant speed on a circle means distance is speed times time, which gives me the circumference.",
        "My check was to compute it the other way; the two methods agreeing is what makes me trust it. If they had disagreed, one of my derivatives would be wrong.",
      ],
    },
    {
      unitNumber: 10,
      keep: ["The polynomial with factorials", "The sign of the next term"],
      question: "\"Is your approximation too high or too low, and how do you know?\"",
      answer: [
        "Too low, because the next term is positive for x greater than zero and I stopped before it.",
        "I am not guessing the direction; the sign of the remainder decides it.",
        "If x were negative the terms would alternate in sign, and I would have to argue differently.",
      ],
    },
  ],
};
