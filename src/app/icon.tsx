import { ImageResponse } from "next/og";

/**
 * Browser-tab icon: static frame of the universal rotated 7-square diamond logo.
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
          background: "#1c1c1c",
          borderRadius: "7px",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 136 136">
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
