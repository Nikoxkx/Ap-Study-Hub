import { OG_CONTENT_TYPE, OG_SIZE, renderSocialCard } from "@/lib/og";

export const alt = "AP Study Hub colophon: the typefaces, the paper palette and the reasoning behind each choice.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderSocialCard({
    kicker: "Colophon",
    title: "Two typefaces and a paper palette",
    subtitle: "Newsreader for reading, Public Sans for the interface, one red for the marks. Why each one is here, and what it replaced.",
    accent: "#6b3f6e",
    plate: "Aa",
    plateLabel: "TYPE",
    chips: [{ value: "2", label: "families" }, { value: "1", label: "accent" }],
  });
}
