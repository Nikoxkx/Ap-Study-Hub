import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, SectionHead } from "@/components/Furniture";
import { site, absoluteUrl, formatDate } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "What AP Study Hub does to meet WCAG 2.2 AA, the keyboard shortcuts on every study tool, and the known problems that have not been fixed yet.",
  alternates: { canonical: "/accessibility" },
  openGraph: {
    title: "Accessibility · AP Study Hub",
    description: "Conformance, keyboard shortcuts, and an honest list of what is still broken.",
    url: absoluteUrl("/accessibility"),
  },
};

/**
 * Accessibility statement.
 *
 * Two things make this worth having rather than boilerplate: the keyboard table,
 * which is genuinely useful to anyone who does not use a mouse, and the "known
 * problems" section. A statement that claims full conformance and lists no
 * defects is a statement nobody tested.
 */

const measures = [
  {
    heading: "Structure before styling",
    body: "Every page is built from landmarks — header, nav, main, aside, footer — with exactly one h1 and no skipped heading levels. Lists are lists, tables have captions and scoped headers, and form controls have real labels rather than placeholder text pretending to be one.",
  },
  {
    heading: "Nothing needs a mouse",
    body: "Every control is a native button, link, radio or checkbox, so it is reachable by Tab and operable by Enter or Space without any extra code. Focus is never trapped, focus outlines are never removed, and a skip link is the first thing in the tab order.",
  },
  {
    heading: "Contrast checked, not assumed",
    body: "Body text sits at roughly 16:1 against the page. Every subject colour, every muted caption tone and both theme variants were measured against WCAG AA at the size they are actually used, including the accent red on both light and dark backgrounds.",
  },
  {
    heading: "Motion is optional",
    body: "Transitions are short and small by default. Under prefers-reduced-motion everything animated collapses to an instant state change — no fades, no card flip rotation, no scroll animation. Nothing on the site moves without you doing something first, and nothing auto-plays.",
  },
  {
    heading: "It works without JavaScript",
    body: "Notes, essays, resources and guides are static HTML. Search has a full server-rendered results page that the header form posts to. Card decks print every card as a plain definition list underneath the interactive deck, so the content is never locked inside a widget.",
  },
  {
    heading: "Announcements where they matter",
    body: "Answer feedback, card faces, timer warnings and result summaries are mirrored into polite live regions, so a screen reader hears a state change that would otherwise only be visible.",
  },
];

const shortcuts = [
  { keys: "Tab / Shift + Tab", where: "Everywhere", does: "Move through controls in reading order" },
  { keys: "Enter", where: "Skip link, first in tab order", does: "Jump straight to the main content" },
  { keys: "Space", where: "Card deck", does: "Flip the current card" },
  { keys: "← / →", where: "Card deck", does: "Previous and next card" },
  { keys: "1 / 2", where: "Card deck", does: "Mark as known, or mark to see again" },
  { keys: "S", where: "Card deck", does: "Shuffle the deck" },
  { keys: "↑ / ↓", where: "Practice questions", does: "Move between answer options within a question" },
  { keys: "Enter", where: "Search box", does: "Go to the full results page" },
  { keys: "Esc", where: "Search box, mobile menu", does: "Close the panel and restore focus" },
];

const known = [
  {
    problem: "The timed paper is hostile on a small screen",
    detail:
      "Sitting a full paper on a phone means a lot of scrolling between the source documents and the answer box. It is usable but not pleasant. The honest advice is to use the largest screen you have — which is also true of the real exam.",
    status: "Not fixed",
  },
  {
    problem: "Long tables scroll sideways",
    detail:
      "The exam calendar and the coverage table scroll horizontally below about 640px rather than reflowing into stacked rows. The scroll container is keyboard focusable and labelled, so it is reachable, but a reflowed layout would be better.",
    status: "Planned",
  },
  {
    problem: "Card flip animation is 3D",
    detail:
      "The flip uses a rotateX transform. It respects prefers-reduced-motion and becomes an instant swap, but if you find the animation uncomfortable and have not set that preference, setting it at the OS level is currently the only way to turn it off.",
    status: "By design, with an escape hatch",
  },
  {
    problem: "Not tested with every screen reader",
    detail:
      "Tested with VoiceOver on macOS and Safari, and with NVDA on Windows and Firefox. Not tested with JAWS, TalkBack or Dragon. If something is broken in one of those, I would not currently know.",
    status: "Gap in testing",
  },
];

export default function AccessibilityPage() {
  const trail = [
    { name: "Home", href: "/" },
    { name: "Accessibility", href: "/accessibility" },
  ];

  return (
    <>
      <JsonLd schema={breadcrumbSchema(trail)} />

      <div className="wrap py-12 md:py-16">
        <div className="max-w-[68ch]">
          <Breadcrumbs trail={trail} />
          <p className="label mb-3">Reviewed {formatDate(site.policyUpdated)}</p>
          <h1 className="text-[clamp(1.9rem,1.5rem+1.8vw,2.9rem)]" style={{ letterSpacing: "-0.028em" }}>
            Accessibility
          </h1>
          <p className="lede mt-5">
            The target is WCAG 2.2 level AA. I believe the site substantially meets it, and I know
            of four places where it falls short. Those are listed below rather than left for you to
            discover.
          </p>
        </div>

        <section className="mt-14" aria-labelledby="measures-heading">
          <SectionHead folio="01" title="What has been done" id="measures-heading" />
          <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
            {measures.map((item) => (
              <article key={item.heading} className="rule-top pt-4">
                <h3 className="text-[1.0625rem] font-semibold">{item.heading}</h3>
                <p className="mt-2 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="keys-heading">
          <SectionHead folio="02" title="Keyboard" id="keys-heading">
            The study tools have shortcuts, because clicking through two hundred cards is worse than
            tapping a key two hundred times. Every shortcut has a visible on-screen control too —
            none of them are the only way to do something.
          </SectionHead>

          <div className="table-scroll">
            <table className="data-table">
              <caption className="sr-only">Keyboard shortcuts available on AP Study Hub</caption>
              <thead>
                <tr>
                  <th scope="col">Keys</th>
                  <th scope="col">Where</th>
                  <th scope="col">What it does</th>
                </tr>
              </thead>
              <tbody>
                {shortcuts.map((row) => (
                  <tr key={`${row.keys}-${row.where}`}>
                    <th scope="row" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", whiteSpace: "nowrap" }}>
                      {row.keys}
                    </th>
                    <td style={{ whiteSpace: "nowrap" }}>{row.where}</td>
                    <td style={{ color: "var(--ink-soft)" }}>{row.does}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
            Single-key shortcuts are only active while the relevant tool has focus, and are ignored
            entirely while you are typing in a text field — so pressing <kbd>s</kbd> mid-sentence in
            a timed paper writes an <em>s</em>, it does not shuffle anything.
          </p>
        </section>

        <section className="mt-14" aria-labelledby="known-heading">
          <SectionHead folio="03" title="Known problems" id="known-heading">
            A statement that claims perfect conformance and lists nothing is a statement nobody
            tested.
          </SectionHead>

          <ol className="rule-top">
            {known.map((item, index) => (
              <li key={item.problem} className="grid gap-x-6 gap-y-2 rule-bottom py-5 sm:grid-cols-[2rem_minmax(0,1fr)]">
                <span
                  aria-hidden="true"
                  className="text-[0.75rem] tabular-nums"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--mark)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-[1.0625rem] font-semibold">{item.problem}</h3>
                    <span className="tag">{item.status}</span>
                  </div>
                  <p className="mt-2 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14" aria-labelledby="how-heading">
          <SectionHead folio="04" title="How it was tested" id="how-heading" />
          <div className="prose">
            <p>
              Keyboard-only passes over every route; VoiceOver on macOS with Safari; NVDA on Windows
              with Firefox; automated checks with axe DevTools and Lighthouse; contrast measured
              per token pair rather than eyeballed; and a pass with JavaScript disabled to confirm
              the content is still readable.
            </p>
            <p>
              Automated tools catch perhaps a third of real problems, so the manual passes are the
              ones that matter. They are also the ones I can get wrong.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="feedback-heading">
          <SectionHead folio="05" title="If something does not work" id="feedback-heading" />
          <div className="prose">
            <p>
              Tell me. Access problems get priority over new content, and I would much rather fix
              one than have someone quietly give up on the site.{" "}
              <a href={`${site.repo}/issues/new`} target="_blank" rel="noopener noreferrer">
                Open an issue
              </a>{" "}
              with the page address, what you were using — browser, screen reader, keyboard only,
              magnification — and what happened. A description in your own words is plenty; you do
              not need to know the WCAG reference.
            </p>
          </div>
        </section>

        <p className="mt-14 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
          The design decisions behind the type and colour choices are in the{" "}
          <Link href="/colophon" className="link-underlined" style={{ color: "var(--ink)" }}>
            colophon
          </Link>
          .
        </p>
      </div>
    </>
  );
}
