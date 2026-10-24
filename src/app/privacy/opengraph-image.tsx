import { OG_CONTENT_TYPE, OG_SIZE, renderSocialCard } from "@/lib/og";

export const alt = "AP Study Hub privacy: no cookies, no analytics and no third-party scripts; progress stays in the browser.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderSocialCard({
    kicker: "Privacy",
    title: "No cookies. No analytics. No third-party scripts.",
    subtitle: "What is stored in your browser, what never leaves it, and the one button that deletes all of it.",
    accent: "#31456b",
    plate: "0",
    plateLabel: "TRACKERS",
    chips: [{ value: "0", label: "cookies" }, { value: "local", label: "storage only" }],
  });
}
