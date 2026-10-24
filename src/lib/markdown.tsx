import type { ReactNode } from "react";
import { Math } from "./math";

/**
 * A deliberately small, safe Markdown subset. Text is returned as React nodes;
 * the only generated HTML is KaTeX's sanitized, trusted math output.
 *
 * Supported: headings, lists, tables, quotes, rules, bold, italic, code,
 * \(...\) inline mathematics, and $$...$$ / \[...\] display mathematics.
 */

type Block =
  | { kind: "heading"; level: 2 | 3 | 4; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "quote"; lines: string[] }
  | { kind: "math"; text: string }
  | { kind: "rule" };

const TABLE_ROW = /^\|(.+)\|\s*$/;
const TABLE_DIVIDER = /^\|[\s:|-]+\|\s*$/;
const ORDERED_ITEM = /^(\d+)[.)]\s+(.*)$/;
const BULLET_ITEM = /^[-*+]\s+(.*)$/;

function splitRow(line: string): string[] {
  return line.replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
}

export function parseBlocks(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i += 1; continue; }

    if (line.startsWith("$$") || line.startsWith("\\[")) {
      const closing = line.startsWith("$$") ? "$$" : "\\]";
      const openingLength = line.startsWith("$$") ? 2 : 2;
      const math: string[] = [];
      const remainder = line.slice(openingLength);
      if (remainder.endsWith(closing) && remainder.length >= closing.length) {
        math.push(remainder.slice(0, -closing.length));
        i += 1;
      } else {
        if (remainder) math.push(remainder);
        i += 1;
        while (i < lines.length && !lines[i].trim().endsWith(closing)) {
          math.push(lines[i]);
          i += 1;
        }
        if (i < lines.length) {
          math.push(lines[i].trim().slice(0, -closing.length));
          i += 1;
        }
      }
      blocks.push({ kind: "math", text: math.join("\n").trim() });
      continue;
    }

    if (/^(-{3,}|_{3,}|\*{3,})$/.test(line)) {
      blocks.push({ kind: "rule" }); i += 1; continue;
    }

    const heading = /^(#{2,4})\s+(.*)$/.exec(line);
    if (heading) {
      blocks.push({ kind: "heading", level: heading[1].length as 2 | 3 | 4, text: heading[2].trim() });
      i += 1;
      continue;
    }

    if (TABLE_ROW.test(line) && i + 1 < lines.length && TABLE_DIVIDER.test(lines[i + 1].trim())) {
      const head = splitRow(line);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && TABLE_ROW.test(lines[i].trim())) {
        rows.push(splitRow(lines[i].trim())); i += 1;
      }
      blocks.push({ kind: "table", head, rows });
      continue;
    }

    if (line.startsWith("> ")) {
      const quoted: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoted.push(lines[i].trim().slice(2)); i += 1;
      }
      blocks.push({ kind: "quote", lines: quoted });
      continue;
    }

    if (BULLET_ITEM.test(line) || ORDERED_ITEM.test(line)) {
      const ordered = ORDERED_ITEM.test(line);
      const items: string[] = [];
      while (i < lines.length) {
        const candidate = lines[i].trim();
        const bullet = BULLET_ITEM.exec(candidate);
        const numbered = ORDERED_ITEM.exec(candidate);
        if (ordered && numbered) items.push(numbered[2]);
        else if (!ordered && bullet) items.push(bullet[1]);
        else if (candidate && items.length && !/^(#{2,4})\s/.test(candidate) && !TABLE_ROW.test(candidate)) {
          items[items.length - 1] += ` ${candidate}`;
        } else break;
        i += 1;
      }
      blocks.push({ kind: "list", ordered, items });
      continue;
    }

    const paragraph: string[] = [];
    while (i < lines.length) {
      const candidate = lines[i].trim();
      if (!candidate || /^(#{2,4})\s/.test(candidate) || BULLET_ITEM.test(candidate) ||
          ORDERED_ITEM.test(candidate) || TABLE_ROW.test(candidate) || candidate.startsWith("> ") ||
          candidate.startsWith("$$") || candidate.startsWith("\\[")) break;
      paragraph.push(candidate);
      i += 1;
    }
    blocks.push({ kind: "paragraph", text: paragraph.join(" ") });
  }
  return blocks;
}

/** Inline pass: math first, then bold, italic and code. */
export function InlineMarkdown({ children: text }: { children: string }): ReactNode {
  return <>{inline(text, "inline")}</>;
}

function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\\\([\s\S]+?\\\)|\$\$[\s\S]+?\$\$|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  let n = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
    const token = match[0];
    const key = `${keyPrefix}-${n++}`;

    if (token.startsWith("\\(")) {
      nodes.push(<Math key={key}>{token.slice(2, -2)}</Math>);
    } else if (token.startsWith("$$")) {
      nodes.push(<Math key={key}>{token.slice(2, -2)}</Math>);
    } else if (token.startsWith("**")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>);
    } else {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    }
    cursor = match.index + token.length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
}

export function Markdown({ source, idPrefix = "" }: { source: string; idPrefix?: string }) {
  const blocks = parseBlocks(source);
  return blocks.map((block, index) => {
    const key = `${idPrefix}b${index}`;
    switch (block.kind) {
      case "heading": {
        const Tag = `h${block.level}` as "h2" | "h3" | "h4";
        return <Tag key={key} id={`${idPrefix}${slugify(block.text)}`}>{inline(block.text, key)}</Tag>;
      }
      case "paragraph": return <p key={key}>{inline(block.text, key)}</p>;
      case "math": return <Math key={key} block>{block.text}</Math>;
      case "rule": return <hr key={key} />;
      case "quote":
        return <blockquote key={key}>{block.lines.map((line, li) => <p key={`${key}q${li}`}>{inline(line, `${key}q${li}`)}</p>)}</blockquote>;
      case "list": {
        const Tag = block.ordered ? "ol" : "ul";
        return <Tag key={key}>{block.items.map((item, li) => <li key={`${key}i${li}`}>{inline(item, `${key}i${li}`)}</li>)}</Tag>;
      }
      case "table":
        return (
          <div className="table-scroll" key={key}>
            <table>
              <thead><tr>{block.head.map((cell, ci) => <th key={`${key}h${ci}`} scope="col">{inline(cell, `${key}h${ci}`)}</th>)}</tr></thead>
              <tbody>{block.rows.map((row, ri) => (
                <tr key={`${key}r${ri}`}>{row.map((cell, ci) => ci === 0
                  ? <th key={`${key}r${ri}c${ci}`} scope="row">{inline(cell, `${key}r${ri}c${ci}`)}</th>
                  : <td key={`${key}r${ri}c${ci}`}>{inline(cell, `${key}r${ri}c${ci}`)}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
        );
    }
  });
}

/** Plain-text projection for search indexing and metadata. */
export function toPlainText(source: string): string {
  return source
    .replace(/\\\(([\s\S]*?)\\\)/g, "$1")
    .replace(/\$\$([\s\S]*?)\$\$/g, "$1")
    .replace(/`{1,3}([^`]*)`{1,3}/g, "$1")
    .replace(/[#>|*_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
