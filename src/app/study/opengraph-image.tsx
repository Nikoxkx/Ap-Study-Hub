import { renderOgCard, ogSize, ogContentType } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Your study desk — spaced review, mistakes, plans and focus sessions";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Your study desk",
    title: "One queue for everything due today.",
    description:
      "Spaced retrieval, a mistake notebook, objective confidence, a plan built around your free evenings, scratch paper and focus sessions. No account.",
    facts: ["Due Today", "Mistake notebook", "Focus sessions"],
    stamp: "Desk",
    mark: "note",
  });
}
