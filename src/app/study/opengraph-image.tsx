import { getTotals } from "@/lib/catalog";
import { OG_CONTENT_TYPE, OG_SIZE, renderSocialCard } from "@/lib/og";

export const alt =
  "The AP Study Hub study desk: a Due Today queue, a mistake notebook, objective confidence and a plan sized to the days you have left.";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const totals = getTotals();

  return renderSocialCard({
    kicker: "The study desk",
    title: "One page that tells you what to do next",
    subtitle:
      "Due Today, the mistakes you still owe, objective confidence per unit, and a plan that fits the evenings you actually have. Everything stays in your browser.",
    accent: "#9a6520",
    plate: "TODAY",
    plateLabel: "STUDY DESK",
    chips: [
      { value: String(totals.courses), label: "courses in one queue" },
      { value: String(totals.flashcards), label: "cards" },
      { value: String(totals.questions), label: "questions" },
    ],
    footnote: "No account, no sync, no server copy of your progress",
  });
}
