import type { WrittenWork } from "@/content/written-work";
import { usesMathematics } from "@/content/written-work";
import { InlineMathText, Math } from "@/lib/math";

/**
 * The written example, on paper.
 *
 * Which paper is not a style choice. If the answer contains arithmetic the
 * work sits on quadrille paper, because that is the paper a student will copy
 * it onto and the grid keeps columns of working aligned. If it does not, the
 * answer sits on ruled loose-leaf paper, because lined paper is what you
 * write a paragraph on.
 */
export function WrittenExample({ work }: { work: WrittenWork }) {
  const math = usesMathematics(work.example);
  const paper = math ? "quad-paper" : "scratch-paper";

  return (
    <article className="written-example">
      <header className="written-example-head">
        <p className="label mb-2">What the answer looks like</p>
        <h5 className="written-prompt">
          <InlineMathText>{work.prompt}</InlineMathText>
        </h5>
      </header>

      <div className="written-plan">
        <p className="label mb-2">Two decisions before you write a word</p>
        <ol className="written-plan-list">
          {work.plan.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>

      <div className={`written-paper ${paper}`} aria-label={math ? "Worked answer on quadrille paper" : "Worked answer on ruled paper"}>
        <p className="written-paper-tab" aria-hidden="true">
          {math ? "squared paper · worked answer" : "ruled paper · worked answer"}
        </p>
        {work.example.map((line, index) =>
          math && line.trim().startsWith("\\[") ? (
            <div className="written-line written-line-math" key={index}>
              <Math block>{line.trim().replace(/^\\\[/, "").replace(/\\\]$/, "")}</Math>
            </div>
          ) : (
            <p className="written-line" key={index}>
              <InlineMathText>{line}</InlineMathText>
            </p>
          ),
        )}
      </div>

      <div className="written-because">
        <p className="label mb-2">Why this earns the mark</p>
        <p>
          <InlineMathText>{work.because}</InlineMathText>
        </p>
      </div>

      <div className="written-trap">
        <p className="label mb-2">The mistake a strong student makes here</p>
        <p>
          <InlineMathText>{work.trap}</InlineMathText>
        </p>
      </div>
    </article>
  );
}
