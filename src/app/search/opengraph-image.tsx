import { getTotals } from "@/lib/catalog";
import { renderOgCard, ogSize, ogContentType } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Search every AP Study Hub lesson, card, question and essay";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  const totals = getTotals();
  return renderOgCard({
    eyebrow: "Search",
    title: "Find the one paragraph you actually need.",
    description: `Every lesson, card, question and essay in ${totals.courses} courses, searchable by topic, term or exam skill. Press ⌘K on any page.`,
    facts: [`${totals.units} lessons`, `${totals.flashcards} cards`, `${totals.questions} questions`],
    stamp: "⌘K",
  });
}
