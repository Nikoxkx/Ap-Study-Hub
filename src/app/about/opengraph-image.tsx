import { renderOgCard, ogSize, ogContentType } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "About AP Study Hub — who writes it, how it is checked, where it is thin";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    eyebrow: "About · method and limits",
    title: "Who writes this, and how it is checked.",
    description:
      "One student, a dated source list, and a coverage table that shows exactly where the notes are thin instead of implying they are uniform.",
    facts: ["Named author", "Dated sources", "Public corrections"],
    stamp: "About",
    mark: "note",
  });
}
