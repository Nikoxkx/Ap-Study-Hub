/**
 * Guess the course a link belongs to from its title, URL, or description.
 *
 * Deliberately dumb: a hand-written keyword map, no model, no network. It only
 * ever pre-selects a dropdown the visitor can change, so a wrong guess costs one
 * click, and a local list is honest about what it does and does not know.
 */
const COURSE_HINTS: { slug: string; pattern: RegExp }[] = [
  { slug: "ap-calc", pattern: /\b(calculus|derivative|integral|limit|riemann|ab|bc)\b/i },
  { slug: "apush", pattern: /\b(ush|united states history|apush|coloni|reconstruction|jackson)\b/i },
  { slug: "ap-lang", pattern: /\b(lang|rhetoric|synthesis|argument|language and composition)\b/i },
  { slug: "ap-lit", pattern: /\b(lit|poetry|novel|literature|prose|fiction)\b/i },
  { slug: "ap-bio", pattern: /\b(bio|cell|photosynthesis|dna|evolution|enzyme)\b/i },
  { slug: "ap-gov", pattern: /\b(gov|government|constitution|congress|federal|court case)\b/i },
  { slug: "ap-macro", pattern: /\b(macro|gdp|inflation|monetary|fiscal|aggregate)\b/i },
  { slug: "ap-env", pattern: /\b(env|environmental|ecosystem|biodiversity|apes|pollution)\b/i },
  { slug: "ap-seminar", pattern: /\b(seminar|irr|tmp|team multimedia|performance task)\b/i },
  { slug: "ap-research", pattern: /\b(research|academic paper|methodology|literature review)\b/i },
];

export function guessCourse(text: string, validSlugs: readonly string[]): string {
  for (const hint of COURSE_HINTS) {
    if (!validSlugs.includes(hint.slug)) continue;
    if (hint.pattern.test(text)) return hint.slug;
  }
  return "";
}
