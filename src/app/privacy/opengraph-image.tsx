import { renderOgCard, ogSize, ogContentType } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Privacy — what AP Study Hub stores, and what it does not";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Privacy",
    title: "No accounts. No analytics. Nothing to sell.",
    description:
      "Progress, notes and plans live in your browser's own storage. The only third-party request a page can make is a video you pressed play on.",
    facts: ["No cookies", "Local storage only", "No analytics"],
    stamp: "Privacy",
  });
}
