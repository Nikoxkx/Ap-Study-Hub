import { ImageResponse } from "next/og";

/**
 * Browser-tab icon. The sheet and folded-corner paths are exactly the SiteMark
 * geometry; only the stroke weight and filled paper are adjusted for 32px.
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
          background: "#f6f3ec",
          border: "1px solid #c3baa5",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 32 32">
          <path d="M6 27V9l6-5h14v23z" fill="#fffdf7" stroke="#1c1b17" strokeWidth={2.25} strokeLinejoin="miter" />
          <path d="M12 4v5H6z" fill="#ddd6c6" stroke="#1c1b17" strokeWidth={2.25} strokeLinejoin="miter" />
          <path d="M11 15h10M11 20h10" fill="none" stroke="#b0392a" strokeWidth={1.9} />
        </svg>
      </div>
    ),
    size,
  );
}
