/**
 * Realistic college-ruled notebook paper breakdown of the AP Study Hub method.
 *
 * Written in self-hosted natural handwriting (`Caveat`) locked strictly to a
 * 32px line grid so every line of ink sits directly on a blue ruled line, with
 * zero synthetic borders, punch-hole dots, or extra dividers.
 */
export function StudySystemVisual() {
  const steps = [
    {
      index: "1.",
      heading: "Read deeply — A complete lesson",
      note: "(10+ paragraphs, sources at section level)",
      detail: "Objectives, context, and worked examples written out in full.",
    },
    {
      index: "2.",
      heading: "Recall — Can you produce the idea cold?",
      note: "(Flip, mark, redo)",
      detail: "Term on the front, your own explanation before flipping.",
    },
    {
      index: "3.",
      heading: "Respond — Original practice",
      note: "(Feedback to exact lesson section)",
      detail: "Every distractor explained with a direct section link.",
    },
  ];

  return (
    <div
      className="realistic-paper"
      role="region"
      aria-label="The AP Study Hub Method, 2026–27"
    >
      <p className="realistic-paper-heading">
        The AP Study Hub Method (2026–27) — Read, Recall, Respond
      </p>

      <ol className="realistic-paper-list">
        {steps.map((step) => (
          <li key={step.index} className="realistic-paper-item">
            <span className="realistic-paper-margin-num" aria-hidden="true">
              {step.index}
            </span>
            <p className="realistic-paper-line">
              <strong className="realistic-paper-strong">{step.heading}</strong>{" "}
              <span className="realistic-paper-aside">{step.note}</span>
            </p>
            <p className="realistic-paper-line realistic-paper-subline">{step.detail}</p>
          </li>
        ))}
      </ol>

      <p className="realistic-paper-closing">
        A wrong answer becomes a route back to understanding — not just a score.
      </p>
    </div>
  );
}
