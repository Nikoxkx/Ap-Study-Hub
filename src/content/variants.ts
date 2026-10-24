import type { SubjectSlug } from "@/lib/subjects";

export interface GeneratedVariant {
  id: string;
  templateId: string;
  courseSlug: SubjectSlug;
  courseLabel: string;
  unitNumber: number;
  skill: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface VariantTemplate {
  id: string;
  courseSlug: SubjectSlug;
  courseLabel: string;
  unitNumber: number;
  skill: string;
  generate: (seed: number) => Omit<GeneratedVariant, "id" | "templateId" | "courseSlug" | "courseLabel" | "unitNumber" | "skill">;
}

function hashSeed(value: string): number {
  let hash = 2166136261;
  for (const char of value) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return hash >>> 0;
}

function randomStream(seed: number) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function integer(random: () => number, min: number, max: number): number {
  return min + Math.floor(random() * (max - min + 1));
}

function pick<T>(random: () => number, values: readonly T[]): T {
  return values[Math.floor(random() * values.length)];
}

function numberText(value: number): string {
  return String(Math.round(value * 10_000) / 10_000);
}

function numericOptions(correct: number, candidates: number[], random: () => number): { options: string[]; correctIndex: number; correctText: string } {
  const correctText = numberText(correct);
  const values = [correctText];
  for (const candidate of candidates) {
    const text = numberText(candidate);
    if (Number.isFinite(candidate) && !values.includes(text)) values.push(text);
  }
  let offset = 1;
  while (values.length < 4) {
    const text = numberText(correct + offset);
    if (!values.includes(text)) values.push(text);
    offset += 1;
  }
  const options = values.slice(0, 4);
  for (let index = options.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [options[index], options[swap]] = [options[swap], options[index]];
  }
  return { options, correctIndex: options.indexOf(correctText), correctText };
}

const templates: VariantTemplate[] = [
  {
    id: "power-derivative", courseSlug: "ap-calc", courseLabel: "AP Calculus", unitNumber: 2, skill: "Differentiation · power rule",
    generate(seed) {
      const random = randomStream(seed);
      const a = integer(random, 2, 8), n = integer(random, 2, 5), x = integer(random, 1, 3);
      const correct = a * n * x ** (n - 1);
      const { options, correctIndex, correctText } = numericOptions(correct, [a * x ** n, a * n * x ** n, a * (n - 1) * x ** (n - 2), correct + a], random);
      return {
        prompt: String.raw`If \(f(x)=${a}x^${n}\), what is \(f'(${x})\)?`, options, correctIndex,
        explanation: String.raw`The power rule gives \(f'(x)=${a * n}x^${n - 1}\). Substituting \(x=${x}\) gives \(${a * n}\cdot${x ** (n - 1)}=${correctText}\).`,
      };
    },
  },
  {
    id: "definite-integral", courseSlug: "ap-calc", courseLabel: "AP Calculus", unitNumber: 6, skill: "Integration · definite integral",
    generate(seed) {
      const random = randomStream(seed);
      const n = integer(random, 1, 3), base = integer(random, 1, 4), b = integer(random, 1, 3);
      const a = base * (n + 1);
      const correct = base * b ** (n + 1);
      const { options, correctIndex, correctText } = numericOptions(correct, [a * b ** n, correct / (n + 1), correct * (n + 1), correct + a], random);
      return {
        prompt: String.raw`Evaluate \(\displaystyle\int_0^${b} ${a}x^${n}\,dx\).`, options, correctIndex,
        explanation: String.raw`An antiderivative is \(\frac{${a}}{${n + 1}}x^${n + 1}=${base}x^${n + 1}\). Evaluate at the bounds: \(${base}(${b})^${n + 1}-0=${correctText}\). Definite integrals do not need \(+C\).`,
      };
    },
  },
  {
    id: "percent-change", courseSlug: "ap-bio", courseLabel: "AP Biology", unitNumber: 2, skill: "Data analysis · percent change",
    generate(seed) {
      const random = randomStream(seed);
      const initial = pick(random, [8, 10, 12, 20] as const);
      const percent = pick(random, [-20, -10, 5, 10, 20, 25] as const);
      const final = initial * (1 + percent / 100);
      const { options, correctIndex, correctText } = numericOptions(percent, [-percent, percent + 10, percent - 5, ((final - initial) / final) * 100], random);
      return {
        prompt: String.raw`A dialysis bag changes from \(${initial}\,\text{g}\) to \(${numberText(final)}\,\text{g}\). What is its percent mass change?`, options, correctIndex,
        explanation: String.raw`Use initial mass in the denominator: \(\frac{${numberText(final)}-${initial}}{${initial}}\times100\%=${correctText}\%\). The sign indicates gain or loss; it does not identify which solutes moved.`,
      };
    },
  },
  {
    id: "hardy-weinberg", courseSlug: "ap-bio", courseLabel: "AP Biology", unitNumber: 7, skill: "Evolution · Hardy–Weinberg model",
    generate(seed) {
      const random = randomStream(seed);
      const qSquared = pick(random, [0.04, 0.09, 0.16, 0.25, 0.36] as const);
      const q = Math.sqrt(qSquared), p = 1 - q, heterozygous = 2 * p * q;
      const { options, correctIndex, correctText } = numericOptions(heterozygous, [qSquared, q, p * p, 1 - heterozygous], random);
      return {
        prompt: String.raw`In a population meeting Hardy–Weinberg assumptions, \(q^2=${qSquared}\). What is the expected heterozygote frequency \(2pq\)?`, options, correctIndex,
        explanation: String.raw`First \(q=\sqrt{${qSquared}}=${numberText(q)}\), so \(p=1-q=${numberText(p)}\). Then \(2pq=2(${numberText(p)})(${numberText(q)})=${correctText}\).`,
      };
    },
  },
];

export function generateVariants(courseSlug: SubjectSlug, seedText: string): GeneratedVariant[] {
  return templates.filter((template) => template.courseSlug === courseSlug).map((template) => ({
    id: `variant:${template.id}:${seedText.trim() || "0"}`,
    templateId: template.id,
    courseSlug: template.courseSlug,
    courseLabel: template.courseLabel,
    unitNumber: template.unitNumber,
    skill: template.skill,
    ...template.generate(hashSeed(`${template.id}:${seedText.trim() || "0"}`)),
  }));
}

export function variantCourseLabel(courseSlug: SubjectSlug): string {
  return templates.find((template) => template.courseSlug === courseSlug)?.courseLabel ?? courseSlug;
}
