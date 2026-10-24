import { ImageResponse } from "next/og";

/**
 * Social artwork.
 *
 * One renderer for every page's link preview, so a pasted URL looks like it
 * belongs to the same publication whether it is the home page, a course, or a
 * policy page. The composition is the same paper-and-ink system as the site:
 * warm stock, a coloured spine taken from the course, a typographic plate on
 * the right, and real counts along the bottom.
 *
 * Satori (behind next/og) supports a subset of CSS — flexbox, absolute
 * positioning, gradients, borders — but no web fonts here: the fonts in
 * /public are variable WOFF2, which Satori cannot parse, and pulling a TTF from
 * Google would put a network dependency in the build. The system sans that
 * ships with ImageResponse is used instead, with the layout doing the work.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

export interface SocialCardOptions {
  /** Small caps line above the title, e.g. "AP UNITED STATES HISTORY · NOTES". */
  kicker: string;
  title: string;
  subtitle?: string;
  /** Spine colour, usually the subject's ink. */
  accent: string;
  /** Bottom row: real numbers from the catalogue, not decoration. */
  chips?: { value: string; label: string }[];
  /** Big text on the right plate, e.g. "USH", "09", "51". */
  plate?: string;
  /** Caption under the plate. */
  plateLabel?: string;
  /** Footer left, defaults to the site's standing line. */
  footnote?: string;
}

function BookMark({ accent }: { accent: string }) {
  return (
    <svg width="46" height="46" viewBox="0 0 32 32">
      <path d="M5 28V8l7-5h15v25z" fill="#fffdf7" stroke="#1c1b17" strokeWidth={1.7} />
      <path d="M12 3v5H5z" fill="#e5ddca" stroke="#1c1b17" strokeWidth={1.7} />
      <path d="M10 14h11M10 19h11" stroke={accent} strokeWidth={1.6} />
      <path d="M10 23.5h6" stroke="#8b8577" strokeWidth={1.2} />
    </svg>
  );
}

export function renderSocialCard({
  kicker,
  title,
  subtitle,
  accent,
  chips = [],
  plate,
  plateLabel,
  footnote = "Free · No account · No ads · Written by a student",
}: SocialCardOptions): ImageResponse {
  // Long titles get a smaller size rather than three cramped lines.
  const titleSize = title.length > 86 ? 46 : title.length > 56 ? 54 : 62;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f6f3ec",
          color: "#1c1b17",
          position: "relative",
        }}
      >
        {/* Spine */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 16, background: accent, display: "flex" }} />

        {/* Paper texture: two pale rules, no image requests. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 148, height: 1, background: "#ddd6c6", display: "flex" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 118, height: 1, background: "#ddd6c6", display: "flex" }} />

        {/* Right plate: a course card resting on the desk. */}
        {plate ? (
          <div
            style={{
              position: "absolute",
              right: 62,
              top: 96,
              width: 268,
              height: 372,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "26px 24px",
              background: "#fffdf7",
              border: "1px solid #c3baa5",
              borderTop: `4px solid ${accent}`,
              boxShadow: "0 18px 32px -22px rgba(28,27,23,0.55)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontFamily: "monospace", fontSize: 13, letterSpacing: 2, color: "#8b8577" }}>
                {plateLabel ?? "AP STUDY HUB"}
              </div>
              <div style={{ display: "flex", marginTop: 8, fontFamily: "monospace", fontSize: 76, lineHeight: 1, color: accent }}>
                {plate}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {[1, 2, 3, 4].map((line) => (
                <div key={line} style={{ display: "flex", height: 2, width: line === 4 ? 82 : 190, background: "#d9d2c0" }} />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "1px solid #ddd6c6",
                paddingTop: 12,
                fontFamily: "monospace",
                fontSize: 12,
                letterSpacing: 1,
                color: "#57534a",
              }}
            >
              <span>2026–27</span>
              <span style={{ color: accent }}>FREE</span>
            </div>
          </div>
        ) : null}

        {/* Text column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "42px 72px 36px 76px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <BookMark accent={accent} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 25, fontWeight: 700, letterSpacing: -0.4 }}>AP Study Hub</span>
              <span style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: 1.6, color: "#8b8577" }}>
                DEEP LESSONS · ACTIVE RECALL · ORIGINAL PRACTICE
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: plate ? 700 : 1000, paddingTop: 16 }}>
            <div
              style={{
                display: "flex",
                fontFamily: "monospace",
                fontSize: 15,
                letterSpacing: 2.2,
                textTransform: "uppercase",
                color: accent,
                marginBottom: 16,
              }}
            >
              {kicker}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: titleSize,
                lineHeight: 1.08,
                letterSpacing: -1.8,
                color: "#1c1b17",
              }}
            >
              {title}
            </div>
            {subtitle ? (
              <div
                style={{
                  display: "flex",
                  marginTop: 18,
                  maxWidth: plate ? 640 : 900,
                  fontSize: 21,
                  lineHeight: 1.45,
                  color: "#57534a",
                }}
              >
                {subtitle}
              </div>
            ) : null}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {chips.length ? (
              <div style={{ display: "flex", gap: 34 }}>
                {chips.slice(0, 4).map((chip) => (
                  <div key={chip.label} style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 28, fontWeight: 700, color: accent, lineHeight: 1 }}>{chip.value}</span>
                    <span style={{ fontSize: 13, color: "#57534a", marginTop: 4 }}>{chip.label}</span>
                  </div>
                ))}
              </div>
            ) : null}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontFamily: "monospace", fontSize: 12.5, letterSpacing: 1.2, color: "#8b8577" }}>{footnote}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
