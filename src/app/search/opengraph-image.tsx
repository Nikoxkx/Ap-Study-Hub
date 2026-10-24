import { OG_CONTENT_TYPE, OG_SIZE, renderSocialCard } from "@/lib/og";

export const alt = "Search AP Study Hub: every lesson paragraph, key term, card and practice question in one index.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderSocialCard({
    kicker: "Search",
    title: "Find the paragraph you can only half remember",
    subtitle: "One index across all seven courses: lesson text, glossary terms, cards and questions, each with the unit it came from.",
    accent: "#31456b",
    plate: "FIND",
    plateLabel: "INDEX",
    chips: [
      { value: "510", label: "paragraphs" },
      { value: "405", label: "cards" },
      { value: "240", label: "questions" },
    ],
  });
}
