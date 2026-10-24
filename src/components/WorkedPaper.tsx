import type { WorkedExample } from "@/content/worked";
import { InlineMathText, Math } from "@/lib/math";

/** Ruled scratch work: the notation and the reason for a step stay side by side. */
export function WorkedPaper({ example, defaultOpen = false }: { example: WorkedExample; defaultOpen?: boolean }) {
  return (
    <details className="worked-wrap" open={defaultOpen}>
      <summary className="worked-summary">
        <span>
          <span className="label mb-1 block">Worked on paper · original example</span>
          <span className="text-[1.0625rem] font-semibold">{example.title}</span>
        </span>
        <span className="label shrink-0">Show steps</span>
      </summary>

      <article className="worked-paper" aria-label={`Worked solution: ${example.title}`}>
        <header className="worked-problem">
          <p className="label mb-2">Problem</p>
          <p><InlineMathText>{example.problem}</InlineMathText></p>
        </header>

        <ol className="worked-steps">
          {example.steps.map((step, index) => (
            <li key={`${example.id}-${index}`} className="worked-step">
              <span className="worked-step-number" aria-hidden="true">{index + 1}</span>
              <div className="worked-notation">
                <Math block>{step.math}</Math>
              </div>
              <p className="worked-reason">{step.note}</p>
            </li>
          ))}
        </ol>

        <div className="worked-answer">
          <p className="label">Result</p>
          <Math block>{example.answer}</Math>
        </div>
        <p className="worked-check">
          <span className="label mr-2">Check / interpretation</span>
          <InlineMathText>{example.check}</InlineMathText>
        </p>
      </article>
    </details>
  );
}
