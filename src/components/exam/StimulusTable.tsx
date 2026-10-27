import type { Stimulus } from "@/content/exams/types";

/**
 * A data figure, rendered as a table.
 *
 * The paper exam prints numbers in columns with a caption, and a question about
 * a trend is easier to answer when the years line up. When a stimulus carries a
 * structured table it is drawn here; otherwise the caller falls back to the
 * passage text.
 */
export function StimulusTable({ stimulus }: { stimulus: Stimulus }) {
  const table = stimulus.table;
  if (!table) return null;

  return (
    <figure className="stimulus-table">
      {table.caption ? <figcaption>{table.caption}</figcaption> : null}
      <table>
        <thead>
          <tr>
            {table.head.map((cell) => (
              <th key={cell} scope="col">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={`${cell}-${index}`} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={`${cell}-${index}`}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {stimulus.attribution ? <p className="stimulus-table-note">{stimulus.attribution}</p> : null}
    </figure>
  );
}
