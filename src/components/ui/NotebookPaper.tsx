import React from "react";

/**
 * Ruled notebook paper surface for scratch work, worked math steps, and drafts.
 *
 * Uses `#f1f1f1` paper with a `#ffb4b8` pink vertical margin rule at 50px–52px
 * and `#e1e1e1` horizontal rules every 30px.
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
