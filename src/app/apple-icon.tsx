import { ImageResponse } from "next/og";

/** Maskable home-screen version of the same SiteMark sheet geometry. */
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
          background: "#f6f3ec",
        }}
      >
        <svg width="116" height="116" viewBox="0 0 32 32">
          <path d="M6 27V9l6-5h14v23z" fill="#fffdf7" stroke="#1c1b17" strokeWidth={1.65} strokeLinejoin="miter" />
          <path d="M12 4v5H6z" fill="#ddd6c6" stroke="#1c1b17" strokeWidth={1.65} strokeLinejoin="miter" />
          <path d="M11 15h10M11 20h10" fill="none" stroke="#b0392a" strokeWidth={1.45} />
        </svg>
      </div>
    ),
    size,
  );
}
