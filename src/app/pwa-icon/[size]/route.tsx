import { ImageResponse } from "next/og";

export function generateStaticParams() {
  return [{ size: "192" }, { size: "512" }];
}

export async function GET(_request: Request, { params }: { params: Promise<{ size: string }> }) {
  const { size: raw } = await params;
  const size = raw === "512" ? 512 : raw === "192" ? 192 : 0;
  if (!size) return new Response("Not found", { status: 404 });
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f6f3ec" }}>
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32">
        <path d="M6 27V9l6-5h14v23z" fill="#fffdf7" stroke="#1c1b17" strokeWidth={1.2} strokeLinejoin="miter" />
        <path d="M12 4v5H6z" fill="#ddd6c6" stroke="#1c1b17" strokeWidth={1.2} strokeLinejoin="miter" />
        <path d="M11 15h10M11 20h10" fill="none" stroke="#b0392a" strokeWidth={1.35} />
      </svg>
    </div>,
    { width: size, height: size },
  );
}
