import { renderOgCard, ogSize, ogContentType } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Accessibility statement for AP Study Hub";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Accessibility",
    title: "What works, what does not, and how to report it.",
    description:
      "Keyboard paths for every interactive deck, contrast measured rather than assumed, reduced-motion support, and the parts that still need work.",
    facts: ["Keyboard first", "Measured contrast", "Reduced motion"],
    stamp: "AA",
  });
}
