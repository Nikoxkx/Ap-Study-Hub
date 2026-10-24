import { OG_CONTENT_TYPE, OG_SIZE, renderSocialCard } from "@/lib/og";

export const alt = "AP revision guides: how to spend six weeks, which order to study in, and the mistakes that cost the most points.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderSocialCard({
    kicker: "Revision guides",
    title: "Six weeks, in the order that actually works",
    subtitle: "Diagnose with real questions, compress the unit you are weakest in, retrieve daily, then write under a clock. No 47-step morning routine.",
    accent: "#2f5f56",
    plate: "6wk",
    plateLabel: "PLAN",
    chips: [
      { value: "4", label: "phases" },
      { value: "220", label: "words a minute" },
    ],
  });
}
