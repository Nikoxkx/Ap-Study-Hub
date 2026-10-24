import katex from "katex";
import type { ReactNode } from "react";

/**
 * Mathematical notation is rendered by KaTeX, with accessible MathML included.
 * New content should use ordinary TeX inside \(...\) or $$...$$. The normalizer
 * also accepts the Unicode-first notation used by the original Calculus notes,
 * so old expressions become real mathematics instead of monospaced lookalikes.
 */

const SUPERSCRIPTS: Record<string, string> = {
  "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
  "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9",
  "⁺": "+", "⁻": "-", "ⁿ": "n", "ˣ": "x", "ⁱ": "i",
};

const SUBSCRIPTS: Record<string, string> = {
  "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4",
  "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9",
  "ₐ": "a", "ₑ": "e", "ₕ": "h", "ᵢ": "i", "ₖ": "k",
  "ₘ": "m", "ₙ": "n", "ₒ": "o", "ₚ": "p", "ᵣ": "r",
  "ₛ": "s", "ₜ": "t", "ᵤ": "u", "ᵥ": "v", "ₓ": "x",
};

function replaceScripts(value: string): string {
  let output = "";
  for (let index = 0; index < value.length;) {
    const char = value[index];
    if (SUPERSCRIPTS[char] !== undefined) {
      let script = "";
      while (index < value.length && SUPERSCRIPTS[value[index]] !== undefined) {
        script += SUPERSCRIPTS[value[index]];
        index += 1;
      }
      output += `^{${script}}`;
    } else if (SUBSCRIPTS[char] !== undefined) {
      let script = "";
      while (index < value.length && SUBSCRIPTS[value[index]] !== undefined) {
        script += SUBSCRIPTS[value[index]];
        index += 1;
      }
      output += `_{${script}}`;
    } else {
      output += char;
      index += 1;
    }
  }
  return output;
}

/** Convert √( … ) with balanced parentheses, plus the common √x form. */
function replaceRoots(value: string): string {
  let output = "";
  for (let index = 0; index < value.length;) {
    if (value[index] !== "√") {
      output += value[index];
      index += 1;
      continue;
    }

    if (value[index + 1] === "(") {
      let depth = 1;
      let end = index + 2;
      while (end < value.length && depth > 0) {
        if (value[end] === "(") depth += 1;
        if (value[end] === ")") depth -= 1;
        end += 1;
      }
      if (depth === 0) {
        output += `\\sqrt{${replaceRoots(value.slice(index + 2, end - 1))}}`;
        index = end;
        continue;
      }
    }

    const operand = /^[A-Za-z0-9.]+/.exec(value.slice(index + 1));
    if (operand) {
      output += `\\sqrt{${operand[0]}}`;
      index += 1 + operand[0].length;
    } else {
      output += "\\sqrt{}";
      index += 1;
    }
  }
  return output;
}

export function normalizeMath(source: string): string {
  let value = source.trim();

  value = replaceRoots(value);
  value = replaceScripts(value)
    .replaceAll("−", "-")
    .replaceAll("→", "\\to ")
    .replaceAll("↔", "\\leftrightarrow ")
    .replaceAll("±", "\\pm ")
    .replaceAll("∓", "\\mp ")
    .replaceAll("×", "\\times ")
    .replaceAll("·", "\\cdot ")
    .replaceAll("≠", "\\ne ")
    .replaceAll("≤", "\\le ")
    .replaceAll("≥", "\\ge ")
    .replaceAll("≈", "\\approx ")
    .replaceAll("∞", "\\infty ")
    .replaceAll("π", "\\pi ")
    .replaceAll("θ", "\\theta ")
    .replaceAll("α", "\\alpha ")
    .replaceAll("β", "\\beta ")
    .replaceAll("χ", "\\chi ")
    .replaceAll("μ", "\\mu ")
    .replaceAll("Δ", "\\Delta ")
    .replaceAll("∫", "\\int ")
    .replaceAll("∑", "\\sum ")
    .replaceAll("⟨", "\\langle ")
    .replaceAll("⟩", "\\rangle ")
    .replaceAll("′", "'")
    .replaceAll("″", "''")
    .replaceAll("…", "\\ldots ")
    .replaceAll("⋯", "\\cdots ");

  // lim(x→a) is authoring shorthand, not a function call.
  value = value.replace(/\\?lim\(([^)]+)\)/g, "\\lim_{$1}");
  value = value.replace(/(?<![\\A-Za-z])lim(?![A-Za-z])/g, "\\lim ");

  const functions = ["arcsin", "arccos", "arctan", "arcsec", "sin", "cos", "tan", "sec", "csc", "cot", "ln", "log", "exp", "max", "min"];
  for (const name of functions) {
    const replacement = name === "arcsec" ? "\\operatorname{arcsec}" : `\\${name} `;
    value = value.replace(new RegExp(`(?<![\\\\A-Za-z])${name}(?![A-Za-z])`, "g"), replacement);
  }

  // Readable multi-letter subscripts: f_avg and T_environment.
  value = value.replace(/_([A-Za-z]{2,})/g, "_{\\mathrm{$1}}");

  // Convert the unambiguous short fractions in the legacy notes. More complex
  // new work is authored directly with \frac and balanced braces.
  const atom = String.raw`(?:\\sqrt\{(?:[^{}]|\{[^{}]*\})*\}|\([^()]*\)|\[[^\[\]]*\]|\\?[A-Za-z0-9.]+(?:\^\{[^{}]+\})?)`;
  const fraction = new RegExp(`(${atom})\\/(${atom})`, "g");
  value = value.replace(fraction, "\\frac{$1}{$2}");
  value = value.replace(fraction, "\\frac{$1}{$2}");

  return value.replace(/[ \t]+/g, " ").trim();
}

export function mathHtml(source: string, displayMode = false): string {
  return katex.renderToString(normalizeMath(source), {
    displayMode,
    throwOnError: true,
    strict: "ignore",
    trust: false,
    maxExpand: 100,
    output: "htmlAndMathml",
  });
}

export function Math({
  children,
  block = false,
  className = "",
}: {
  children: string;
  block?: boolean;
  className?: string;
}) {
  let html: string | null = null;
  try {
    html = mathHtml(children, block);
  } catch {
    html = null;
  }
  if (html === null) {
    // A malformed expression remains readable and testable; it never prevents
    // the rest of a lesson from rendering.
    return block ? (
      <pre className={`math-fallback ${className}`} data-math-error={children}>{children}</pre>
    ) : (
      <code className={`math-fallback ${className}`} data-math-error={children}>{children}</code>
    );
  }
  return block ? (
    <div className={`math-block ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <span className={`math-inline ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

/** Inline Markdown/math for labels and question banks that are not full pages. */
function looksLikeCompleteMath(value: string): boolean {
  if (!/[=≠≤≥→±∫∑√²³ⁿ₀₁₂₃₄₅₆₇₈₉]/.test(value)) return false;
  if (!/^[A-Za-z0-9\s+\-−=<>≤≥≠/()[\]{}^_'′″.·×∫∑∞πθ√|,;]+$/.test(value)) return false;
  // Long alphabetic runs are usually prose, not notation. Known mathematical
  // descriptors remain valid inside an otherwise symbolic option.
  const words = value.match(/[A-Za-z]{5,}/g) ?? [];
  return words.every((word) => ["arcsin", "arccos", "arctan", "arcsec", "outer", "inner", "right", "left", "bottom"].includes(word));
}

/** Render explicitly delimited math, or a math-only legacy answer choice. */
export function MathAwareText({ children }: { children: string }): ReactNode {
  if (!children.includes("\\(") && !children.includes("$$") && looksLikeCompleteMath(children)) {
    return <Math>{children}</Math>;
  }
  return <InlineMathText>{children}</InlineMathText>;
}

export function InlineMathText({ children }: { children: string }): ReactNode {
  const parts = children.split(/(\\\([\s\S]+?\\\)|\$\$[\s\S]+?\$\$)/g);
  return parts.map((part, index) => {
    if (part.startsWith("\\(") && part.endsWith("\\)")) {
      return <Math key={index}>{part.slice(2, -2)}</Math>;
    }
    if (part.startsWith("$$") && part.endsWith("$$")) {
      return <Math key={index} block>{part.slice(2, -2)}</Math>;
    }
    return part;
  });
}
