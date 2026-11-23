import React from "react";

/**
 * Graph paper for scratch work, worked math steps, and drafts.
 *
 * The surface is the math notebook paper students actually write on: `#ffffff`
 * stock with a `16px` `#c2dbf1` grid, a `#ee4152` full-height margin rule two
 * squares in, and clean unprinted edges — all drawn with CSS gradients (see
 * `.scratch-paper` in `globals.css`) so it stays crisp at any zoom and costs no
 * image request. Handwriting uses the `Kalam` face in `#2e4257` ink.
 *
 * The grid is shared by every scratch surface, math or not: the worked example
 * under a lesson, the draft box in the FRQ studio, and the lab textareas.
 */
interface NotebookPaperProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function NotebookPaper({
  className,
  children,
  ...props
}: NotebookPaperProps) {
  return (
    <div
      className={["scratch-paper", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export default NotebookPaper;
