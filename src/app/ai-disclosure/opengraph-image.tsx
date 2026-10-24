import { renderOgCard, ogSize, ogContentType } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "AI disclosure — how AI assistance is used on AP Study Hub";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    eyebrow: "AI disclosure",
    title: "Where AI helped, and what was checked by hand.",
    description:
      "Drafted with assistance, edited and verified against the course frameworks, with sources dated and corrections published rather than quietly applied.",
    facts: ["Dated sources", "Hand-checked", "Public corrections"],
    stamp: "AI",
    mark: "note",
  });
}
