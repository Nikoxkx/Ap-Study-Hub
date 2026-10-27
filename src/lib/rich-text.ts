/**
 * Rich text for the written section.
 *
 * The digital AP exam gives students a small editor — bold, italic, underline,
 * and lists — and saves as they type. A plain `<textarea>` cannot do that, so
 * the response box is a `contentEditable` region and the draft is stored as a
 * small, closed set of tags.
 *
 * Because the draft goes into `localStorage` and is later rendered as HTML, it
 * is sanitised on the way in *and* on the way out: only the tags below survive,
 * with no attributes at all. That keeps a stored draft from ever being a way to
 * inject a script into the report page, even if the browser profile is shared.
 */

const ALLOWED_TAGS = new Set(["B", "STRONG", "I", "EM", "U", "UL", "OL", "LI", "P", "BR", "DIV", "SPAN"]);

/** Plain text with paragraph breaks, safe to grade and to count. */
export function richTextToPlain(html: string): string {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li)>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function richTextWordCount(html: string): number {
  const plain = richTextToPlain(html);
  return plain ? (plain.match(/\S+/g) ?? []).length : 0;
}

/**
 * Sanitise a stored draft.
 *
 * Rather than parse with a DOM (which is unavailable during server rendering),
 * the string is tokenised: tags are kept only if they are on the allowlist and
 * carry no attributes, and every other angle bracket is escaped. Text content
 * is left alone because it cannot become markup once `<` is escaped.
 */
export function sanitizeRichText(html: string): string {
  if (!html) return "";
  let output = "";
  let index = 0;
  while (index < html.length) {
    const open = html.indexOf("<", index);
    if (open === -1) {
      output += escapeText(html.slice(index));
      break;
    }
    output += escapeText(html.slice(index, open));
    const close = html.indexOf(">", open);
    if (close === -1) {
      output += escapeText(html.slice(open));
      break;
    }
    const raw = html.slice(open + 1, close).trim();
    const closing = raw.startsWith("/");
    const name = raw.replace(/^\//, "").split(/[\s/>]/)[0]?.toUpperCase() ?? "";
    const selfClosing = raw.endsWith("/");
    if (ALLOWED_TAGS.has(name)) {
      if (closing) output += `</${name.toLowerCase()}>`;
      else if (selfClosing || name === "BR") output += "<br>";
      else output += `<${name.toLowerCase()}>`;
    }
    index = close + 1;
  }
  return output.replace(/(<br>\s*){3,}/gi, "<br><br>").trim();
}

function escapeText(text: string): string {
  return text.replace(/&(?!#?\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Is the editor effectively empty? `<div><br></div>` is not an answer. */
export function richTextIsEmpty(html: string): boolean {
  return richTextToPlain(html).length === 0;
}

/** Seconds since the last edit, phrased the way the exam app phrases it. */
export function savedLabel(savedAt: number | null, now: number): string {
  if (!savedAt) return "Answer not saved yet";
  const seconds = Math.max(0, Math.round((now - savedAt) / 1000));
  if (seconds < 2) return "Answer saved";
  if (seconds < 60) return `Answer saved ${seconds} seconds ago`;
  const minutes = Math.round(seconds / 60);
  return `Answer saved ${minutes} minute${minutes === 1 ? "" : "s"} ago`;
}
