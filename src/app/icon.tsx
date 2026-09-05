import { ImageResponse } from "next/og";

/**
 * Favicon, generated rather than shipped as a .ico.
 *
 * The stacked-sheets mark from SiteMark, redrawn with heavier strokes because
 * a 1.9px stroke disappears at 32px. Ink on paper, so it reads on both a light
 * and a dark browser chrome.
 */

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
        <svg width="26" height="26" viewBox="0 0 32 32">
          <g fill="none" stroke="#f6f3ec" strokeWidth={2.6} strokeLinejoin="miter">
            <path d="M6 27V9l6-5h14v23z" />
            <path d="M12 4v5H6" />
          </g>
          <path d="M11 15h10M11 20h10" stroke="#b0392a" strokeWidth={2.2} />
        </svg>
      </div>
    ),
    size,
  );
}
