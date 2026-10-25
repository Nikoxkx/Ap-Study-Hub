import { ImageResponse } from "next/og";

/** Maskable home-screen version of the universal rotated 7-square logo. */
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
          background: "#1c1c1c",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 136 136">
          <g transform="translate(68 8) rotate(45)" fill="#ffffff">
            <rect x="2" y="2" width="24" height="24" />
            <rect x="34" y="2" width="24" height="24" />
            <rect x="66" y="2" width="24" height="24" />
            <rect x="66" y="34" width="24" height="24" />
            <rect x="34" y="34" width="24" height="24" />
            <rect x="34" y="66" width="24" height="24" />
            <rect x="2" y="66" width="24" height="24" />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
