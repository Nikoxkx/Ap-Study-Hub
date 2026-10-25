/**
 * Realistic loose-leaf ruled paper breakdown of the AP Study Hub method.
 *
 * Matches the `realistichandwriting.com` sheet format (`handwritten-document.pdf`):
 * pure white loose-leaf stock (`#ffffff`), full-height `#de7c7b` vertical margin
 * rule, `#b8cee5` horizontal blue lines inset from the outer paper edges with a
 * clean white top header, and uniform `Kalam` 300 ballpoint ink (`#30455a`)
 * resting directly on each 32px blue ruled line — with zero extra CSS borders,
 * dividers, or dots.
 */

const steps = [
  {
    num: "1.",
    lead: "Read deeply — A complete lesson (10+ paragraphs, sources at section level)",
    detail: "Objectives, context, and worked examples written out in full.",
  },
  {
    num: "2.",
    lead: "Recall — Can you produce the idea cold? (Flip, mark, redo)",
    detail: "Term on the front, your own explanation before flipping.",
  },
  {
    num: "3.",
    lead: "Respond — Original practice (Feedback to exact lesson section)",
    detail: "Every distractor explained with a direct section link.",
  },
] as const;

export function StudySystemVisual() {
  return (
    <div
      className="realistic-paper"
      role="region"
      aria-label="The AP Study Hub Method: Read deeply, Recall, and Respond"
    >
      <p className="realistic-paper-heading">
        The AP Study Hub Method (2026–27) — Read, Recall, Respond
      </p>

      <ol className="realistic-paper-list">
        {steps.map((step) => (
          <li key={step.num} className="realistic-paper-item">
            <p className="realistic-paper-num">{step.num}</p>
            <p className="realistic-paper-line">{step.lead}</p>
            <p className="realistic-paper-detail">{step.detail}</p>
          </li>
        ))}
      </ol>

      <p className="realistic-paper-closing">
        A wrong answer becomes a route back to understanding — not just a score.
      </p>
    </div>
  );
}
