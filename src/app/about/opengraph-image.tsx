import { OG_CONTENT_TYPE, OG_SIZE, renderSocialCard } from "@/lib/og";

export const alt = "About AP Study Hub: who writes it, how the content is checked against the curriculum, and where AI was and was not used.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderSocialCard({
    kicker: "About",
    title: "One student, seven courses, and a pile of primary documents",
    subtitle: "How these notes are written, what gets checked against the official framework, what gets thrown away, and where AI helped.",
    accent: "#b0392a",
    plate: "§1",
    plateLabel: "ABOUT",
    chips: [
      { value: "51", label: "lessons" },
      { value: "7", label: "courses" },
      { value: "0", label: "sponsored posts" },
    ],
  });
}
