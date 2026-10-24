import { OG_CONTENT_TYPE, OG_SIZE, renderSocialCard } from "@/lib/og";

export const alt = "AP Study Hub AI disclosure: which parts were drafted with help, what was checked by hand, and what is never generated.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderSocialCard({
    kicker: "Disclosure",
    title: "Where AI was used, and where it was not",
    subtitle: "Drafting help, voice edits and code scaffolding. Not: sources, scores, or anything presented as a primary document.",
    accent: "#6b3f6e",
    plate: "AI",
    plateLabel: "DISCLOSURE",
    chips: [{ value: "100%", label: "claims sourced" }],
  });
}
