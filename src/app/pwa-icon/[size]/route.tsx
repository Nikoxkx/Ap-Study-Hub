import { ImageResponse } from "next/og";

export function generateStaticParams() {
  return [{ size: "192" }, { size: "512" }];
}

export async function GET(_request: Request, { params }: { params: Promise<{ size: string }> }) {
  const { size: raw } = await params;
  const size = raw === "512" ? 512 : raw === "192" ? 192 : 0;
  if (!size) return new Response("Not found", { status: 404 });
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1c1c1c" }}>
        <svg width={Math.round(size * 0.72)} height={Math.round(size * 0.72)} viewBox="0 0 136 136">
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
    { width: size, height: size },
  );
}
