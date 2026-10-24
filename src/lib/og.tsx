import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * The social card, in one place.
 *
 * Every route used to fall back to the single home-page card, so a link to
 * "APUSH flashcards" and a link to the privacy page looked identical in a
 * message. Each route now draws its own card from this builder: same paper,
 * same red margin rule, but with the page's own title, its own one-line
 * description, and a stamp carrying the number that matters on that page — 9
 * lessons, 168 cards, 30 questions, a 55-minute paper.
 *
 * Fonts: the site's real faces, subset to Latin and instanced at the two
 * weights satori can use. Without them the card would be set in the default
 * sans, which looks like a different website from the one it links to.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

let fontCache: Promise<{ name: string; data: ArrayBuffer; weight: 400 | 500 | 600; style: "normal" }[]> | null = null;

async function loadAssets() {
  if (!fontCache) {
    fontCache = (async () => {
      const dir = join(process.cwd(), "assets", "og");
      const [display, sans, sansBold] = await Promise.all([
        readFile(join(dir, "newsreader-500.ttf")),
        readFile(join(dir, "public-sans-400.ttf")),
        readFile(join(dir, "public-sans-600.ttf")),
      ]);
      const toArray = (buffer: Buffer) =>
        buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
      return [
        { name: "Newsreader", data: toArray(display), weight: 500 as const, style: "normal" as const },
        { name: "Public Sans", data: toArray(sans), weight: 400 as const, style: "normal" as const },
        { name: "Public Sans", data: toArray(sansBold), weight: 600 as const, style: "normal" as const },
      ];
    })();
  }
  return fontCache;
}

let paperCache: Promise<string> | null = null;

/** The photographed sheet again, as a data URI, so the card is not a flat colour. */
async function paperDataUri() {
  if (!paperCache) {
    paperCache = (async () => {
      const file = await readFile(join(process.cwd(), "public", "textures", "paper-crumple.jpg"));
      return `data:image/jpeg;base64,${file.toString("base64")}`;
    })();
  }
  return paperCache;
}

export interface OgCard {
  /** Small caps line at the top — course code, section, or a date. */
  eyebrow: string;
  /** The headline of the card. Two to eight words is right. */
  title: string;
  /** One or two sentences, written for a stranger reading a link preview. */
  description: string;
  /** Up to three short facts, shown along the bottom rule. */
  facts?: string[];
  /** A big number or short label, boxed in the corner like a library stamp. */
  stamp?: string;
  /** Accent colour: the course ink, or the site's marking red. */
  accent?: string;
  /** Which mark to draw beside the nameplate. */
  mark?: "site" | "course" | "note";
}

const SITE_INK = "#b0392a";

export async function renderOgCard({
  eyebrow,
  title,
  description,
  facts = [],
  stamp,
  accent = SITE_INK,
  mark = "site",
}: OgCard) {
  const [fonts, paper] = await Promise.all([loadAssets(), paperDataUri()]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#f6f3ec",
          color: "#1c1b17",
          fontFamily: "Public Sans",
        }}
      >
        {/* satori renders a plain <img>; next/image does not exist inside an
            ImageResponse, so the lint rule is disabled here deliberately. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={paper}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            left: -24,
            top: -16,
            width: 1248,
            height: 662,
            objectFit: "cover",
            opacity: 0.26,
          }}
        />
        {/* the wash that keeps the card readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "rgba(246,243,236,0.82)",
          }}
        />
        {/* margin rule and ruled lines, exactly as on the notes */}
        {/* A spine, not a stripe: the subject's ink colour, inset a little from
            the edge the way a bound edge sits proud of the page. */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 9, height: 630, background: accent, display: "flex" }} />
        <div style={{ position: "absolute", left: 82, top: 120, width: 1, height: 420, background: "rgba(178,85,74,0.32)", display: "flex" }} />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "54px 62px 48px 112px",
          }}
        >
          {/* nameplate */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <svg width="40" height="40" viewBox="0 0 32 32">
                <path d="M6 27V9l6-5h14v23z" fill="#fffdf7" stroke="#1c1b17" strokeWidth={1.8} />
                <path d="M12 4v5H6z" fill="#ddd6c6" stroke="#1c1b17" strokeWidth={1.8} />
                {mark === "course" ? (
                  <path d="M11 15h10M11 20h10" stroke={accent} strokeWidth={1.8} />
                ) : mark === "note" ? (
                  <path d="M11 14h10M11 18h10M11 22h6" stroke={accent} strokeWidth={1.6} />
                ) : (
                  <path d="M11 15h10M11 20h10" stroke={SITE_INK} strokeWidth={1.5} />
                )}
              </svg>
              <span style={{ fontFamily: "Newsreader", fontSize: 26, letterSpacing: "-0.01em" }}>AP Study Hub</span>
            </div>
            <span
              style={{
                fontFamily: "Public Sans",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(87,83,74,0.9)",
              }}
            >
              Free · No account
            </span>
          </div>

          {/* headline block */}
          <div style={{ display: "flex", flexDirection: "column", marginTop: 44 }}>
            <span
              style={{
                fontFamily: "Public Sans",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "0.19em",
                textTransform: "uppercase",
                color: accent,
              }}
            >
              {eyebrow}
            </span>
            <span
              style={{
                display: "flex",
                fontFamily: "Newsreader",
                fontSize: title.length > 52 ? 54 : title.length > 40 ? 60 : title.length > 28 ? 68 : 78,
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                marginTop: 14,
                maxWidth: 1000,
                color: "#1c1b17",
              }}
            >
              {title}
            </span>
            <span
              style={{
                display: "flex",
                fontSize: 22,
                lineHeight: 1.42,
                color: "#4d4941",
                marginTop: 20,
                maxWidth: 900,
              }}
            >
              {description}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "auto" }}>
            <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
              <div style={{ display: "flex", width: 760, height: 2, background: "#1c1b17", marginBottom: 16 }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 26 }}>
                {facts.map((fact) => (
                  <span
                    key={fact}
                    style={{
                      fontFamily: "Public Sans",
                      fontWeight: 600,
                      fontSize: 15,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#57534a",
                    }}
                  >
                    {fact}
                  </span>
                ))}
              </div>
            </div>

            {stamp ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 118,
                  padding: "14px 18px",
                  border: `2px solid ${accent}`,
                  color: accent,
                  transform: "rotate(-2.5deg)",
                  backgroundColor: "rgba(255,253,247,0.72)",
                }}
              >
                <span
                  style={{
                    fontFamily: "Newsreader",
                    fontSize: stamp.length > 5 ? 26 : 38,
                    lineHeight: 1.05,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {stamp}
                </span>
                <span
                  style={{
                    fontFamily: "Public Sans",
                    fontWeight: 600,
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginTop: 6,
                    opacity: 0.8,
                  }}
                >
                  AP Study Hub
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts,
    },
  );
}
