import { renderOgCard, ogSize, ogContentType } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "How to revise for an AP exam — spacing, self-testing and the last fortnight";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Study guides",
    title: "How to revise for an AP exam.",
    description:
      "Spacing, self-testing, reading a stimulus, the last fortnight, and what an AP score is actually worth at the colleges that grant credit.",
    facts: ["Spacing", "Retrieval", "Last fortnight"],
    stamp: "Guide",
    mark: "note",
  });
}
