import type { SocialCardOptions } from "./og";

/**
 * Copy for the static pages' link previews.
 *
 * Kept out of the route files so the wording can be read in one sitting and
 * compared. A preview card is the first sentence most people ever read from
 * this site, so each one says what the page actually contains instead of
 * repeating the page title in larger type.
 */
export const staticCards: Record<
  "study" | "about" | "guides" | "search" | "privacy" | "accessibility" | "colophon" | "aiDisclosure",
  SocialCardOptions
> = {
  study: {
    kicker: "The study desk",
    title: "Everything you owe today, on one page",
    subtitle:
      "Due Today review, a mistake notebook that re-asks what you missed, objective confidence, and a plan sized to the days you actually have.",
    accent: "#2f5f56",
    plate: "DESK",
    plateLabel: "STUDY LOOP",
    chips: [
      { value: "7", label: "courses in one queue" },
      { value: "6", label: "new cards a day" },
      { value: "0", label: "sign-ins" },
    ],
    footnote: "Stored in this browser. Nothing leaves the device.",
  },
  about: {
    kicker: "About this site",
    title: "Who writes this, and what the sources are",
    subtitle:
      "One student, seven courses, a visible list of every College Board document used, and a plain account of where AI helped.",
    accent: "#57534a",
    plate: "WHO",
    plateLabel: "COLOPHON",
    chips: [
      { value: "1", label: "author" },
      { value: "51", label: "lessons" },
      { value: "0", label: "affiliate links" },
    ],
  },
  guides: {
    kicker: "Revision guides",
    title: "How to revise when the exam is in six weeks",
    subtitle:
      "A workable order of operations: diagnose, compress, retrieve, then write under a clock. No 47-step morning routine.",
    accent: "#9a6520",
    plate: "HOW",
    plateLabel: "REVISION",
    chips: [
      { value: "6wk", label: "plan" },
      { value: "220", label: "words a minute" },
    ],
  },
  search: {
    kicker: "Search",
    title: "Find the paragraph you half-remember",
    subtitle: "Every lesson, key term, card and practice question in one index, with the unit it came from.",
    accent: "#31456b",
    plate: "FIND",
    plateLabel: "INDEX",
    chips: [
      { value: "510", label: "paragraphs" },
      { value: "405", label: "cards" },
      { value: "240", label: "questions" },
    ],
  },
  privacy: {
    kicker: "Privacy",
    title: "No cookies. No analytics. No third-party scripts.",
    subtitle: "What is stored in your browser, what never leaves it, and how to delete all of it in one click.",
    accent: "#2f5f56",
    plate: "§",
    plateLabel: "PRIVACY",
    chips: [{ value: "0", label: "trackers" }],
  },
  accessibility: {
    kicker: "Accessibility",
    title: "What works, and what is still broken",
    subtitle: "Keyboard paths, contrast ratios, reduced-motion handling, and an honest list of the gaps that remain.",
    accent: "#4f6b32",
    plate: "AA",
    plateLabel: "CONFORMANCE",
    chips: [{ value: "4.5:1", label: "body contrast" }],
  },
  colophon: {
    kicker: "Colophon",
    title: "Typefaces, palette, and the reasoning behind each",
    subtitle: "Newsreader for reading, Public Sans for the interface, a paper palette, and a printing press worth of restraint.",
    accent: "#6b3f6e",
    plate: "Aa",
    plateLabel: "TYPE",
    chips: [{ value: "2", label: "families" }],
  },
  aiDisclosure: {
    kicker: "AI disclosure",
    title: "Where AI was used, and where it was not",
    subtitle: "Which parts were drafted with help, which were checked against the CED by hand, and what is never generated.",
    accent: "#9c3b2e",
    plate: "AI",
    plateLabel: "DISCLOSURE",
    chips: [{ value: "100%", label: "sources checked" }],
  },
};
