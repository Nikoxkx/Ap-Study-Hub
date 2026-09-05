import { ImageResponse } from "next/og";
import { getTotals } from "@/lib/catalog";
import { site } from "@/lib/site";

/**
 * Social preview card.
 *
 * A site with no OG image gets a bare grey link box in every chat app, which is
 * one of the fastest ways to look unfinished. This is drawn to match the site:
 * paper ground, a heavy rule, the nameplate, and real counts rather than a
 * slogan.
 */

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const totals = getTotals();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f3ec",
          color: "#1c1b17",
          padding: "68px 76px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="46" height="46" viewBox="0 0 32 32">
              <g fill="none" stroke="#1c1b17" strokeWidth={2.2}>
                <path d="M6 27V9l6-5h14v23z" />
                <path d="M12 4v5H6" />
              </g>
              <path d="M11 15h10M11 20h10" stroke="#b0392a" strokeWidth={1.8} />
            </svg>
            <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em" }}>
              AP Study Hub
            </span>
          </div>
          <span style={{ fontSize: 20, color: "#7e786c", letterSpacing: "0.08em" }}>
            FREE · NO ACCOUNT
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ width: "100%", height: 3, background: "#1c1b17", display: "flex" }} />
          <div style={{ fontSize: 68, lineHeight: 1.08, letterSpacing: "-0.025em", maxWidth: 900, display: "flex" }}>
            Notes, drills and marked essays for seven AP courses.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 44 }}>
            {[
              [`${totals.units}`, "units of notes"],
              [`${totals.flashcards}`, "cards"],
              [`${totals.questions}`, "questions"],
              [`${totals.essays}`, "marked essays"],
            ].map(([value, label]) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 40, fontWeight: 600, color: "#b0392a" }}>{value}</span>
                <span style={{ fontSize: 18, color: "#57534a" }}>{label}</span>
              </div>
            ))}
          </div>
          <span style={{ fontSize: 18, color: "#7e786c" }}>Written by {site.author.name}</span>
        </div>
      </div>
    ),
    size,
  );
}
