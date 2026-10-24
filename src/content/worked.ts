import type { SubjectSlug } from "@/lib/subjects";

/** A worked line is deliberately split into notation and the reason for it. */
export interface WorkedStep {
  math: string;
  note: string;
}

export interface WorkedExample {
  id: string;
  courseSlug: SubjectSlug;
  unitNumber: number;
  title: string;
  problem: string;
  steps: WorkedStep[];
  answer: string;
  check: string;
}

const calc = (
  unitNumber: number,
  id: string,
  title: string,
  problem: string,
  steps: WorkedStep[],
  answer: string,
  check: string,
): WorkedExample => ({ id: `calc-${id}`, courseSlug: "ap-calc", unitNumber, title, problem, steps, answer, check });

const bio = (
  unitNumber: number,
  id: string,
  title: string,
  problem: string,
  steps: WorkedStep[],
  answer: string,
  check: string,
): WorkedExample => ({ id: `bio-${id}`, courseSlug: "ap-bio", unitNumber, title, problem, steps, answer, check });

/**
 * Original scratch-work examples, keyed to the same lesson numbers as the
 * catalog. They are not released College Board questions or official rubrics.
 */
export const workedExamples: WorkedExample[] = [
  calc(1, "factor-limit", "Cancel before substituting",
    String.raw`Evaluate \(\lim_{x\to 3}\frac{x^2-9}{x-3}\).`,
    [
      { math: String.raw`\frac{3^2-9}{3-3}=\frac{0}{0}`, note: "Direct substitution gives an indeterminate form, so more algebra is needed." },
      { math: String.raw`\frac{x^2-9}{x-3}=\frac{(x-3)(x+3)}{x-3}=x+3,\quad x\ne 3`, note: "Factor the difference of squares. Cancelling changes the value at 3, but not the nearby values used by the limit." },
      { math: String.raw`\lim_{x\to 3}(x+3)=6`, note: "Now substitute into the equivalent nearby expression." },
    ],
    String.raw`\boxed{6}`,
    "The original function still has a hole at x = 3; the limit describes the approach, not the missing point."),

  calc(2, "derivative-definition", "Use the derivative definition",
    String.raw`For \(f(x)=x^2\), find \(f'(a)\) from \(f'(a)=\lim_{h\to 0}\frac{f(a+h)-f(a)}{h}\).`,
    [
      { math: String.raw`\frac{(a+h)^2-a^2}{h}`, note: "Substitute a + h and a into the function." },
      { math: String.raw`=\frac{a^2+2ah+h^2-a^2}{h}=\frac{2ah+h^2}{h}`, note: "Expand and combine like terms before taking the limit." },
      { math: String.raw`=2a+h,\quad h\ne 0`, note: "Cancel h only while h is nonzero." },
      { math: String.raw`\lim_{h\to 0}(2a+h)=2a`, note: "Take the limit after simplifying." },
    ],
    String.raw`\boxed{f'(a)=2a}`,
    "The result agrees with the power rule and gives the tangent slope at every a."),

  calc(3, "inverse-derivative", "Differentiate an inverse without solving for it",
    String.raw`Let \(f(x)=x^3+x\). Since \(f(1)=2\), find \((f^{-1})'(2)\).`,
    [
      { math: String.raw`f'(x)=3x^2+1\quad\Rightarrow\quad f'(1)=4`, note: "Differentiate f and evaluate at the corresponding input x = 1." },
      { math: String.raw`(f^{-1})'(2)=\frac{1}{f'(f^{-1}(2))}`, note: "Use the inverse-function derivative relationship." },
      { math: String.raw`f^{-1}(2)=1\quad\Rightarrow\quad(f^{-1})'(2)=\frac14`, note: "Replace the inverse output using the given point (1, 2)." },
    ],
    String.raw`\boxed{\frac14}`,
    "The derivative is nonzero at the corresponding point, so the local inverse relationship applies."),

  calc(6, "ftc-chain", "Accumulation with a variable upper bound",
    String.raw`If \(g(x)=\int_1^{x^2}\sin(t)\,dt\), find \(g'(x)\).`,
    [
      { math: String.raw`u=x^2\quad\Rightarrow\quad g(x)=\int_1^u\sin(t)\,dt`, note: "Name the upper bound so the composition is visible." },
      { math: String.raw`\frac{d}{du}\int_1^u\sin(t)\,dt=\sin(u),\qquad \frac{du}{dx}=2x`, note: "Use the Fundamental Theorem, then the chain rule." },
      { math: String.raw`g'(x)=\sin(u)\cdot 2x=2x\sin(x^2)`, note: "Substitute u = x² back into the result." },
    ],
    String.raw`\boxed{2x\sin(x^2)}`,
    "Differentiating the result reverses the accumulation; the factor 2x is the required inner derivative."),

  calc(6, "parts", "Integrate by parts and verify",
    String.raw`Find \(\int xe^x\,dx\).`,
    [
      { math: String.raw`u=x,\qquad dv=e^x\,dx`, note: "Choose u so differentiating makes it simpler." },
      { math: String.raw`du=dx,\qquad v=e^x`, note: "Differentiate u and integrate dv." },
      { math: String.raw`\int u\,dv=uv-\int v\,du=xe^x-\int e^x\,dx`, note: "Apply the integration-by-parts template." },
      { math: String.raw`xe^x-e^x+C`, note: "Integrate the remaining exponential and include the constant family." },
    ],
    String.raw`\boxed{xe^x-e^x+C}`,
    String.raw`Differentiate: \(\frac{d}{dx}(xe^x-e^x+C)=e^x+xe^x-e^x=xe^x\).`),

  calc(7, "separable", "Separate, integrate, then use the initial condition",
    String.raw`Solve \(\frac{dy}{dx}=xy\) with \(y(0)=4\).`,
    [
      { math: String.raw`\frac{1}{y}\,dy=x\,dx`, note: "For nonzero y, collect each variable with its differential." },
      { math: String.raw`\ln|y|=\frac{x^2}{2}+C`, note: "Integrate both sides." },
      { math: String.raw`|y|=e^Ce^{x^2/2}\quad\Rightarrow\quad y=Ae^{x^2/2}`, note: "Combine the nonzero constants into A; the initial condition selects the positive branch." },
      { math: String.raw`4=Ae^0\quad\Rightarrow\quad A=4`, note: "Substitute x = 0 and y = 4." },
    ],
    String.raw`\boxed{y=4e^{x^2/2}}`,
    String.raw`Then \(y'=4e^{x^2/2}\cdot x=xy\), and \(y(0)=4\).`),

  calc(8, "area", "Area between two curves",
    String.raw`Find the area enclosed by \(y=2x\) and \(y=x^2\).`,
    [
      { math: String.raw`2x=x^2\quad\Rightarrow\quad x(x-2)=0\quad\Rightarrow\quad x=0,2`, note: "Find the intersection bounds." },
      { math: String.raw`2x\ge x^2\quad\text{on }[0,2]`, note: "Identify the upper curve on this interval." },
      { math: String.raw`A=\int_0^2(2x-x^2)\,dx`, note: "Integrate upper minus lower." },
      { math: String.raw`A=\left[x^2-\frac{x^3}{3}\right]_0^2=4-\frac83`, note: "Evaluate the antiderivative at both bounds." },
    ],
    String.raw`\boxed{\frac43\text{ square units}}`,
    "The positive result is consistent with area; using lower minus upper would only reveal a sign error."),

  calc(9, "parametric-length", "Arc length of a parametric circle",
    String.raw`Find the length of \(x=3\cos t,\ y=3\sin t\) for \(0\le t\le 2\pi\).`,
    [
      { math: String.raw`\frac{dx}{dt}=-3\sin t,\qquad \frac{dy}{dt}=3\cos t`, note: "Differentiate both coordinate functions." },
      { math: String.raw`L=\int_0^{2\pi}\sqrt{(-3\sin t)^2+(3\cos t)^2}\,dt`, note: "Use the parametric arc-length integral." },
      { math: String.raw`L=\int_0^{2\pi}\sqrt{9(\sin^2t+\cos^2t)}\,dt=\int_0^{2\pi}3\,dt`, note: "Use the Pythagorean identity." },
    ],
    String.raw`\boxed{6\pi}`,
    "This is the circumference of a radius-3 circle, matching the geometric formula 2πr."),

  calc(10, "maclaurin", "Build and use a Taylor polynomial",
    String.raw`Construct the third-degree Maclaurin polynomial for \(f(x)=e^x\), then approximate \(e^{0.1}\).`,
    [
      { math: String.raw`f^{(k)}(0)=e^0=1\quad\text{for every }k`, note: "Every derivative of eˣ is eˣ, so every derivative at zero is 1." },
      { math: String.raw`P_3(x)=\sum_{k=0}^{3}\frac{f^{(k)}(0)}{k!}x^k=1+x+\frac{x^2}{2}+\frac{x^3}{6}`, note: "Divide each term by the matching factorial." },
      { math: String.raw`P_3(0.1)=1+0.1+\frac{0.01}{2}+\frac{0.001}{6}=1.105166\ldots`, note: "Evaluate the polynomial at the nearby input." },
    ],
    String.raw`\boxed{e^{0.1}\approx 1.10517}`,
    "The approximation is close to the calculator value; the next term is positive and small near zero."),

  bio(2, "water-potential", "Calculate solute and water potential",
    String.raw`A solution at \(293\,\text{K}\) has \(C=0.20\,\text{mol L}^{-1}\), \(i=1\), and pressure potential \(\Psi_p=0\). Using \(R=0.0831\,\text{L bar mol}^{-1}\text{K}^{-1}\), calculate \(\Psi_s\) and total \(\Psi\).`,
    [
      { math: String.raw`\Psi_s=-iCRT`, note: "Select the solute-potential relationship and identify every value with units." },
      { math: String.raw`\Psi_s=-(1)(0.20)(0.0831)(293)=-4.87\,\text{bar}`, note: "Substitute. The negative sign reflects free water associated with solutes." },
      { math: String.raw`\Psi=\Psi_s+\Psi_p=-4.87+0`, note: "Add pressure potential; here it does not offset solute potential." },
    ],
    String.raw`\boxed{\Psi_s=-4.87\,\text{bar},\qquad \Psi=-4.87\,\text{bar}}`,
    "Without a pressure difference, water tends to move toward this lower water potential from a region of higher water potential."),

  bio(2, "dialysis", "Percent mass change in dialysis tubing",
    String.raw`A dialysis bag changes from \(10.0\,\text{g}\) to \(10.8\,\text{g}\). Calculate its percent mass change and interpret the sign.`,
    [
      { math: String.raw`\%\Delta m=\frac{m_f-m_i}{m_i}\times100\%`, note: "Use final minus initial, then divide by the initial mass." },
      { math: String.raw`\%\Delta m=\frac{10.8-10.0}{10.0}\times100\%`, note: "Keep the subtraction in the numerator before dividing." },
      { math: String.raw`\%\Delta m=\frac{0.8}{10.0}\times100\%=8.0\%`, note: "Report the magnitude with the positive sign." },
    ],
    String.raw`\boxed{+8.0\%\text{ mass change}}`,
    "The bag gained mass. If only water crossed and the surrounding solution had higher water potential, this is consistent with net water entry; mass alone does not prove which solutes moved."),

  bio(2, "surface-volume", "Compare surface-area-to-volume ratios",
    String.raw`Compare cubes with side lengths \(1\,\text{cm}\), \(2\,\text{cm}\), and \(3\,\text{cm}\). Calculate each surface-area-to-volume ratio.`,
    [
      { math: String.raw`SA=6s^2,\qquad V=s^3\quad\Rightarrow\quad \frac{SA}{V}=\frac{6}{s}`, note: "Write the two geometry relationships before substituting." },
      { math: String.raw`s=1:\ \frac{SA}{V}=6;\qquad s=2:\ \frac{SA}{V}=3;\qquad s=3:\ \frac{SA}{V}=2`, note: "The corresponding units are cm² per cm³, or cm⁻¹." },
    ],
    String.raw`\boxed{6,\ 3,\ 2\ \text{cm}^{-1}\text{, respectively}}`,
    "As the cube grows, volume increases faster than surface area. The smaller cell-like object has more exchange surface relative to its volume."),

  bio(3, "q10", "Use rate data to calculate Q₁₀",
    String.raw`An enzyme-driven rate is \(2.0\) arbitrary units at \(20^\circ\text{C}\) and \(4.0\) units at \(30^\circ\text{C}\), with other conditions controlled. Estimate \(Q_{10}\).`,
    [
      { math: String.raw`Q_{10}=\left(\frac{R_2}{R_1}\right)^{10/(T_2-T_1)}`, note: "Use the rate ratio adjusted for the actual temperature interval." },
      { math: String.raw`Q_{10}=\left(\frac{4.0}{2.0}\right)^{10/(30-20)}=2^1`, note: "The temperatures differ by exactly 10°C, so the exponent is 1." },
    ],
    String.raw`\boxed{Q_{10}=2.0}`,
    "Over this interval the rate doubled per 10°C. This descriptive ratio does not establish that temperature caused the change unless other variables were controlled."),

  bio(5, "chi-square", "Test an offspring-ratio model",
    String.raw`A cross is expected to produce dominant and recessive phenotypes in a \(3:1\) ratio. Among 100 offspring, 80 are dominant and 20 recessive. Calculate \(\chi^2\) and compare it with the critical value \(3.84\) at \(df=1\), \(\alpha=0.05\).`,
    [
      { math: String.raw`E_D=100\left(\frac34\right)=75,\qquad E_R=100\left(\frac14\right)=25`, note: "Convert the expected ratio into expected counts." },
      { math: String.raw`\chi^2=\sum\frac{(O-E)^2}{E}=\frac{(80-75)^2}{75}+\frac{(20-25)^2}{25}`, note: "Compute one contribution for each phenotype category." },
      { math: String.raw`\chi^2=0.333+1.000=1.333`, note: "Add the category contributions; do not compare percentages with counts." },
    ],
    String.raw`\boxed{\chi^2\approx1.33<3.84;\quad\text{fail to reject the }3:1\text{ model}}`,
    "This does not prove the model. It means these data do not provide sufficient evidence against it at the chosen threshold."),

  bio(7, "hardy-weinberg", "Move from phenotype to carrier frequency",
    String.raw`In a population meeting Hardy–Weinberg assumptions, \(16\%\) show a recessive phenotype. Estimate \(q\), \(p\), and the heterozygote frequency.`,
    [
      { math: String.raw`q^2=0.16\quad\Rightarrow\quad q=\sqrt{0.16}=0.40`, note: "The recessive phenotype corresponds to qq, not directly to q." },
      { math: String.raw`p+q=1\quad\Rightarrow\quad p=1-0.40=0.60`, note: "Use the two-allele frequency relationship." },
      { math: String.raw`2pq=2(0.60)(0.40)=0.48`, note: "Heterozygotes include both Aa and aA in the model." },
    ],
    String.raw`\boxed{q=0.40,\quad p=0.60,\quad 2pq=0.48\text{ or }48\%}`,
    "The frequencies check: 0.36 + 0.48 + 0.16 = 1. Deviations alone would not identify which Hardy–Weinberg assumption changed."),

  bio(8, "logistic", "Compare exponential and logistic growth",
    String.raw`For \(N=500\), \(K=1000\), and \(r=0.20\) per unit time, compare \(dN/dt=rN\) with \(dN/dt=rN\left(\frac{K-N}{K}\right)\).`,
    [
      { math: String.raw`\left(\frac{dN}{dt}\right)_{exp}=0.20(500)=100`, note: "The exponential model applies no density-dependent limitation." },
      { math: String.raw`\frac{K-N}{K}=\frac{1000-500}{1000}=0.50`, note: "At half carrying capacity, the logistic multiplier is one half." },
      { math: String.raw`\left(\frac{dN}{dt}\right)_{log}=0.20(500)(0.50)=50`, note: "Multiply by the remaining-fraction factor." },
    ],
    String.raw`\boxed{100\text{ versus }50\text{ individuals per unit time}}`,
    "The simple logistic model predicts fastest absolute growth at K/2 and growth approaching zero near K; real populations need not follow it exactly."),

  bio(8, "energy-transfer", "Trace energy through trophic levels",
    String.raw`Producers store \(10{,}000\,\text{kcal}\). Using a simplified \(10\%\) transfer at each step, estimate energy reaching primary, secondary, and tertiary consumers.`,
    [
      { math: String.raw`E_{n+1}=0.10E_n`, note: "Apply the stated transfer model separately at each trophic step." },
      { math: String.raw`E_1=0.10(10{,}000)=1{,}000\,\text{kcal}`, note: "Primary consumers eat producers." },
      { math: String.raw`E_2=0.10(1{,}000)=100,\qquad E_3=0.10(100)=10`, note: "Repeat for secondary and tertiary consumers; do not take 10% of the original every time." },
    ],
    String.raw`\boxed{1{,}000,\ 100,\ 10\,\text{kcal, respectively}}`,
    "The 10% rule is a rough model, not a fixed law. Actual transfer varies with organisms, ecosystems, assimilation, and measurement boundaries."),
];

export function getWorkedExamples(courseSlug: SubjectSlug | string, unitNumber?: number): WorkedExample[] {
  return workedExamples.filter((example) => example.courseSlug === courseSlug && (unitNumber === undefined || example.unitNumber === unitNumber));
}
