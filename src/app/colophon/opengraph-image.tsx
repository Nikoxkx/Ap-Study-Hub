import { renderOgCard, ogSize, ogContentType } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Colophon — the typefaces, paper and code behind AP Study Hub";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Colophon",
    title: "The typefaces, the paper, the code.",
    description:
      "Newsreader, Public Sans and JetBrains Mono, self-hosted; a photographed sheet of ruled paper; Next.js with no analytics and no accounts.",
    facts: ["Three typefaces", "No trackers", "Open source"],
    stamp: "Colophon",
  });
}
