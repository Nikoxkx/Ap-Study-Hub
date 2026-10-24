import { getCourse } from "@/lib/catalog";
import { OG_CONTENT_TYPE, OG_SIZE, renderSocialCard } from "@/lib/og";

export const alt = "An AP Study Hub card deck: one question on the front, a definition you can produce cold on the back.";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  const subject = course?.subject;

  if (!course || !subject) {
    return renderSocialCard({
      kicker: "AP Study Hub",
      title: "Cards that ask, not cards that tell",
      subtitle: "Keyboard-driven decks built from the lesson glossaries, with the ones you miss coming back sooner.",
      accent: "#31456b",
    });
  }

  return renderSocialCard({
    kicker: `${subject.familiar} · index cards`,
    title: `${course.counts.flashcards} cards, and a queue that remembers what you missed`,
    subtitle: "Space toggles the answer, 1–4 grades it, and anything you fumble is scheduled back into tomorrow instead of vanishing into a deck you never reopen.",
    accent: subject.ink,
    plate: String(course.counts.flashcards),
    plateLabel: "CARDS",
    chips: [
      { value: String(course.counts.flashcards), label: "cards" },
      { value: String(course.counts.units), label: "unit decks" },
      { value: "0", label: "accounts" },
    ],
  });
}
