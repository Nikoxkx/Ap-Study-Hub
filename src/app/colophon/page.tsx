import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, SectionHead, ExternalLink } from "@/components/Furniture";
import { subjects } from "@/lib/subjects";
import { indexSize } from "@/lib/search";
import { site, absoluteUrl } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Colophon",
  description:
    "The typefaces, palette, build and design decisions behind AP Study Hub, written down so they can be argued with.",
  alternates: { canonical: "/colophon" },
  openGraph: {
    title: "Colophon · AP Study Hub",
    description: "Typefaces, palette, stack and the reasoning behind each choice.",
    url: absoluteUrl("/colophon"),
  },
};

/**
 * Colophon.
 *
 * A print convention: the page at the back that records how the book was set.
 * It is here because a design decision you cannot explain is usually a default
 * you did not notice making, and writing them down is the cheapest way to keep
 * yourself honest.
 */

const typefaces = [
  {
    name: "Newsreader",
    designer: "Production Type, for Google Fonts",
    role: "Headings, long-form notes, essay text",
    why: "A text serif drawn for screens, with low stroke contrast and a large x-height, so it holds together at 17px where a display serif would fall apart. Notes are read for twenty minutes at a stretch; that ruled out setting body copy in a sans.",
    licence: "SIL Open Font License 1.1",
  },
  {
    name: "Public Sans",
    designer: "US Web Design System",
    role: "Interface: navigation, buttons, controls, tables",
    why: "Drawn for the US federal government's design system. On a site about American history and government that is a small joke that also happens to be the right typeface: it is neutral without being characterless, and it was engineered for exactly this — dense, functional, legible interface text.",
    licence: "SIL Open Font License 1.1",
  },
  {
    name: "JetBrains Mono",
    designer: "JetBrains",
    role: "Labels, timers, scores, section numbers, dates",
    why: "Anywhere digits need to line up in a column. Tabular figures by default, and a tall x-height that keeps small uppercase labels readable at 11px.",
    licence: "SIL Open Font License 1.1",
  },
];

const decisions = [
  {
    heading: "Paper, not white",
    body: "The background is #f6f3ec, sampled off uncoated book stock, and the text is #1c1b17 rather than pure black. Pure black on pure white is 21:1 contrast, which sounds ideal and is uncomfortable to read for twenty minutes on a backlit screen. The warm pair still clears 16:1.",
  },
  {
    heading: "One accent, and it is a red pen",
    body: "Section numbers, the active state, and anything that needs to be noticed use #b0392a. It is the colour a teacher marks in, which is a reason, and it is used sparingly enough to still mean something. There is no second accent.",
  },
  {
    heading: "Subject colours from bookbinding cloth",
    body: "Each course has one colour drawn from library binding swatches — brick, ink navy, aubergine, bottle, moss, ochre, graphite. Muted on purpose: seven saturated colours competing on one page is a toy, not an index. Each has a hand-checked light variant for the dark theme.",
  },
  {
    heading: "Rules instead of cards",
    body: "Structure comes from hairline rules and whitespace rather than from putting everything in a rounded box with a shadow. Radii top out at 4px. Where a surface does need to lift off the page, it gets a 3px coloured top edge, like a tabbed file card.",
  },
  {
    heading: "One motion idiom",
    body: "Interactive things either draw a line in from one edge or move 1–3px. Two easing curves, both custom, and a documented reason for each. Everything is disabled under prefers-reduced-motion.",
  },
  {
    heading: "No icon library",
    body: "Every glyph on the site — the seven subject marks, the site mark, the arrows — is hand-drawn SVG on a 32-unit grid. There is no icon package, and there are no emoji standing in for icons. Emoji render differently on every platform, cannot inherit colour, and read as a placeholder nobody came back to.",
  },
];

const stack = [
  ["Framework", "Next.js 16, App Router, React 19"],
  ["Rendering", "Static generation for every content page; one dynamic route for the search API"],
  ["Styling", "Tailwind CSS 4 for layout, hand-written CSS custom properties for the design tokens"],
  ["Type", "Self-hosted WOFF2 variable fonts, latin subset, 192 KB total"],
  ["Search", "Hand-rolled scored index over the content, no search dependency"],
  ["Content", "TypeScript modules — no CMS, no database, no runtime data fetching"],
  ["Hosting", "Vercel, static output"],
  ["Analytics", "None"],
];

export default function ColophonPage() {
  const trail = [
    { name: "Home", href: "/" },
    { name: "Colophon", href: "/colophon" },
  ];

  return (
    <>
      <JsonLd schema={breadcrumbSchema(trail)} />

      <div className="wrap py-12 md:py-16">
        <div className="max-w-[68ch]">
          <Breadcrumbs trail={trail} />
          <p className="label mb-3">Colophon</p>
          <h1 className="text-[clamp(1.9rem,1.5rem+1.8vw,2.9rem)]" style={{ letterSpacing: "-0.028em" }}>
            How this site is set.
          </h1>
          <p className="lede mt-5">
            Books used to print this at the back: the typefaces, the paper, who set it. It is a good
            habit. A design decision you cannot explain is usually a default you did not notice
            making.
          </p>
        </div>

        <section className="mt-16" aria-labelledby="type-heading">
          <SectionHead folio="01" title="Typefaces" id="type-heading">
            Three faces, one job each. All three are self-hosted from{" "}
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.85em" }}>/fonts</code> as
            latin-subset variable WOFF2, so the site makes no request to Google or anyone else.
          </SectionHead>

          <div className="space-y-10">
            {typefaces.map((face) => (
              <article key={face.name} className="rule-top pt-5">
                <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
                  <div>
                    <p
                      className="mb-2 text-[2.25rem] leading-none"
                      style={{
                        fontFamily:
                          face.name === "Newsreader"
                            ? "var(--font-display)"
                            : face.name === "Public Sans"
                              ? "var(--font-ui)"
                              : "var(--font-mono)",
                        fontWeight: 500,
                      }}
                    >
                      Aa Gg 0123
                    </p>
                    <h3 className="text-[1.125rem] font-semibold">{face.name}</h3>
                    <p className="mt-1 text-[0.8125rem]" style={{ color: "var(--ink-faint)" }}>
                      {face.designer}
                    </p>
                    <p
                      className="mt-1 text-[0.6875rem]"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
                    >
                      {face.licence}
                    </p>
                  </div>
                  <div>
                    <p className="label mb-1.5">{face.role}</p>
                    <p className="text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                      {face.why}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="palette-heading">
          <SectionHead folio="02" title="Palette" id="palette-heading">
            Seven subject colours plus a neutral paper-and-ink base and one accent. Every pairing
            used for text was checked against WCAG AA at its actual size.
          </SectionHead>

          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {subjects.map((subject) => (
              <li key={subject.slug}>
                <div
                  className="mb-2 h-16 w-full"
                  style={{ background: subject.ink, borderRadius: "var(--radius-edge)" }}
                  aria-hidden="true"
                />
                <p className="text-[0.8125rem] font-semibold">{subject.familiar}</p>
                <p
                  className="text-[0.6875rem] uppercase"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
                >
                  {subject.ink}
                </p>
              </li>
            ))}
          </ul>

          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["Paper", "#f6f3ec", "background"],
              ["Ink", "#1c1b17", "body text"],
              ["Mark", "#b0392a", "the one accent"],
              ["Rule", "#ddd6c6", "hairlines"],
            ].map(([name, hex, role]) => (
              <li key={name}>
                <div
                  className="mb-2 h-16 w-full"
                  style={{ background: hex, border: "1px solid var(--rule)", borderRadius: "var(--radius-edge)" }}
                  aria-hidden="true"
                />
                <p className="text-[0.8125rem] font-semibold">{name}</p>
                <p
                  className="text-[0.6875rem] uppercase"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}
                >
                  {hex} · {role}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16" aria-labelledby="decisions-heading">
          <SectionHead folio="03" title="Decisions, and why" id="decisions-heading" />
          <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
            {decisions.map((item) => (
              <article key={item.heading} className="rule-top pt-4">
                <h3 className="text-[1.0625rem] font-semibold">{item.heading}</h3>
                <p className="mt-2 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="stack-heading">
          <SectionHead folio="04" title="Build" id="stack-heading" />
          <div className="table-scroll">
            <table className="data-table">
              <caption className="sr-only">The technical stack behind AP Study Hub</caption>
              <tbody>
                {stack.map(([label, value]) => (
                  <tr key={label}>
                    <th scope="row" style={{ width: "10rem" }}>
                      {label}
                    </th>
                    <td style={{ color: "var(--ink-soft)" }}>{value}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">Search index</th>
                  <td style={{ color: "var(--ink-soft)" }}>
                    {indexSize().toLocaleString("en-US")} documents, built at module scope
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
            The whole thing is public.{" "}
            <ExternalLink href={site.repo} className="link-underlined">
              Read the source
            </ExternalLink>
            , or take it apart for your own subject.
          </p>
        </section>

        <p className="mt-14 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
          Accessibility choices are documented separately, on the{" "}
          <Link href="/accessibility" className="link-underlined" style={{ color: "var(--ink)" }}>
            accessibility page
          </Link>
          .
        </p>
      </div>
    </>
  );
}
