import { ImageResponse } from "next/og";

/**
 * Home-screen icon for iOS, and the maskable icon the web manifest points at.
 *
 * Same mark as the favicon, redrawn rather than scaled: at 180px the strokes
 * that keep the 32px version legible look clumsy, so this one is thinner and
 * the page rules read as rules instead of as blobs.
 *
 * The mark is inset well inside the canvas because both iOS and Android crop
 * a maskable icon to whatever shape the platform wants — a full-bleed mark
 * loses its corners.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1c1b17",
        }}
      >
        <svg width="104" height="104" viewBox="0 0 32 32">
          <g fill="none" stroke="#f6f3ec" strokeWidth={1.9} strokeLinejoin="miter">
            <path d="M6 27V9l6-5h14v23z" />
            <path d="M12 4v5H6" />
          </g>
          <path d="M11 14h10M11 18.5h10M11 23h6" stroke="#b0392a" strokeWidth={1.7} />
        </svg>
      </div>
    ),
    size,
  );
}
