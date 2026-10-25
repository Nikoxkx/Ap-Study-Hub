import React from "react";

/**
 * Three-circle bouncing loading indicator with ground shadows (`circle7124` / `shadow046`).
 *
 * Uses the exact 200×60 `.wrapper` coordinate frame, optionally scaled inside a
 * tight bounding box for compact inline contexts (such as live search popovers).
 */
export function LoadingSpinner({
  label = "Loading…",
  scale = 1,
  className,
}: {
  label?: string;
  scale?: number;
  className?: string;
}) {
  const width = Math.round(200 * scale);
  const height = Math.round(70 * scale);

  return (
    <div
      role="status"
      aria-label={label}
      className={["uiverse-bounce-shell", className].filter(Boolean).join(" ")}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div
        className="uiverse-bounce-loader wrapper"
        style={
          scale === 1
            ? undefined
            : {
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }
        }
      >
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="shadow" />
        <div className="shadow" />
        <div className="shadow" />
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default LoadingSpinner;
