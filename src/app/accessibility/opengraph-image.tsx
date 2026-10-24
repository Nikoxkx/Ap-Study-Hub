import { OG_CONTENT_TYPE, OG_SIZE, renderSocialCard } from "@/lib/og";

export const alt = "AP Study Hub accessibility: keyboard paths, contrast ratios, reduced-motion handling and an honest list of what is still broken.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderSocialCard({
    kicker: "Accessibility",
    title: "What works, and what is still broken",
    subtitle: "Contrast measured rather than assumed, every study mode reachable by keyboard, and the gaps written down instead of hidden.",
    accent: "#4f6b32",
    plate: "AA",
    plateLabel: "CONFORMANCE",
    chips: [{ value: "4.5:1", label: "body contrast" }, { value: "0", label: "motion by default" }],
  });
}
