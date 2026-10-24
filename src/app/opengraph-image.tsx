import { ImageResponse } from "next/og";
import { getTotals } from "@/lib/catalog";
import { site } from "@/lib/site";

export const alt = `${site.name} — deep lessons, active recall, and original AP practice`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social artwork drawn from the same paper, ink, and study-loop language as the site. */
export default function OpenGraphImage() {
  const totals = getTotals();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f6f3ec",
          color: "#1c1b17",
          padding: "52px 60px",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", left: 0, top: 0, width: 12, height: 630, background: "#b0392a", display: "flex" }} />
        <div style={{ width: "58%", display: "flex", flexDirection: "column", justifyContent: "space-between", paddingRight: 42 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <svg width="48" height="48" viewBox="0 0 32 32">
              <path d="M6 27V9l6-5h14v23z" fill="#fffdf7" stroke="#1c1b17" strokeWidth={1.8} />
              <path d="M12 4v5H6z" fill="#ddd6c6" stroke="#1c1b17" strokeWidth={1.8} />
              <path d="M11 15h10M11 20h10" stroke="#b0392a" strokeWidth={1.5} />
            </svg>
            <span style={{ fontSize: 29, fontWeight: 600 }}>AP Study Hub</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 16, color: "#7e786c", letterSpacing: "0.12em", marginBottom: 20 }}>
              2026–27 EDITION · SEVEN AP COURSES
            </span>
            <span style={{ fontSize: 59, lineHeight: 1.07, letterSpacing: "-0.025em" }}>
              Read deeply. Recall actively. Practise deliberately.
            </span>
            <span style={{ fontSize: 22, lineHeight: 1.4, color: "#57534a", marginTop: 22 }}>
              Curriculum-linked lessons with ten or more substantive paragraphs, visible sources, and a route back from every mistake.
            </span>
          </div>

          <div style={{ display: "flex", gap: 30, borderTop: "2px solid #1c1b17", paddingTop: 20 }}>
            {[
              [`${totals.units}`, "deep lessons"],
              [`${totals.paragraphs}`, "paragraphs"],
              [`${totals.flashcards}`, "cards"],
              [`${totals.questions}`, "questions"],
            ].map(([value, label]) => (
              <div key={label} style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 34, fontWeight: 600, color: "#b0392a" }}>{value}</span>
                <span style={{ fontSize: 15, color: "#57534a" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: "42%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 430, height: 510, display: "flex", position: "relative" }}>
          <svg width="430" height="510" viewBox="0 0 430 510" style={{ position: "absolute", left: 0, top: 0 }}>
            <rect x="24" y="34" width="370" height="428" fill="#ece7db" stroke="#c3baa5" transform="rotate(3 209 248)" />
            <rect x="18" y="20" width="370" height="428" fill="#fffdf7" stroke="#1c1b17" strokeWidth="2" />
            <path d="M340 20h48v48" fill="#ddd6c6" stroke="#1c1b17" strokeWidth="2" />
            <path d="M340 20v48h48" fill="none" stroke="#1c1b17" strokeWidth="2" />
            {["#9c3b2e", "#31456b", "#6b3f6e", "#2f5f56", "#4f6b32", "#9a6520", "#57534a"].map((color, index) => (
              <rect key={color} x={44 + index * 40} y={8} width={28} height={12} fill={color} />
            ))}
            {[0, 1, 2, 3, 4].map((line) => (
              <path key={line} d={`M48 ${184 + line * 25}H${line % 2 ? 315 : 340}`} stroke="#7e786c" strokeWidth="4" opacity="0.5" />
            ))}
            <path d="M48 324H340" stroke="#c3baa5" strokeWidth="2" />
            <rect x="48" y="351" width="132" height="54" fill="#e0ebe8" stroke="#2f5f56" />
            <rect x="202" y="351" width="138" height="54" fill="#f3e6e2" stroke="#b0392a" />
          </svg>
          <span style={{ position: "absolute", left: 48, top: 84, color: "#b0392a", fontSize: 14, letterSpacing: 2 }}>DEEP LESSON → STUDY LOOP</span>
          <span style={{ position: "absolute", left: 48, top: 126, color: "#1c1b17", fontSize: 31 }}>Understand the idea.</span>
          <span style={{ position: "absolute", left: 65, top: 366, color: "#2f5f56", fontSize: 16 }}>RECALL →</span>
          <span style={{ position: "absolute", left: 219, top: 366, color: "#b0392a", fontSize: 16 }}>PRACTISE →</span>
          <span style={{ position: "absolute", left: 0, top: 466, width: 430, justifyContent: "center", color: "#57534a", fontSize: 15 }}>FREE · NO ACCOUNT · NO TRACKING</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
