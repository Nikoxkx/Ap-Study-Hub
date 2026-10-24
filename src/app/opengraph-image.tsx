import { getTotals } from "@/lib/catalog";
import { renderOgCard, ogSize, ogContentType } from "@/lib/og";

export const runtime = "nodejs";
export const alt =
  "AP Study Hub — deep lessons, index cards, original practice and marked essays for seven AP courses";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage() {
  const totals = getTotals();
  return renderOgCard({
    eyebrow: "Independent · 2026–27 edition",
    title: "Seven AP courses, rebuilt around deep lessons.",
    description: `Not quick definitions. ${totals.units} lessons with ${totals.paragraphs} teaching paragraphs, ${totals.flashcards} index cards, original practice and marked essays — free, with no account.`,
    facts: [`${totals.courses} courses`, `${totals.units} lessons`, `${totals.flashcards} cards`, `${totals.questions} questions`],
    stamp: "Free",
  });
}
