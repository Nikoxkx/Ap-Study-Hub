import React from "react";

/**
 * Universal symbol and logo for AP Study Hub.
 *
 * Uses the exact 7-square 45-degree rotating choreography on a 96×96 coordinate
 * space, centered and scaled via GPU `transform: translate3d` so keyframe
 * offsets (0, 32px, 64px) stay geometrically exact with zero layout thrashing.
 */
interface LogoProps {
  size?: number;
  className?: string;
  label?: string;
}

export function Logo({ size = 32, className, label }: LogoProps) {
  // A 96×96 square rotated 45deg has a diagonal of 96 * sqrt(2) ≈ 135.76px.
  const scale = size / 136;

  return (
    <span
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={["uiverse-logo", className].filter(Boolean).join(" ")}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <span
        className="uiverse-logo-loader"
        style={{
          transform: `translate(-50%, -50%) scale(${scale.toFixed(4)}) rotate(45deg)`,
        }}
      >
        <span className="uiverse-logo-square" />
        <span className="uiverse-logo-square" />
        <span className="uiverse-logo-square" />
        <span className="uiverse-logo-square" />
        <span className="uiverse-logo-square" />
        <span className="uiverse-logo-square" />
        <span className="uiverse-logo-square" />
      </span>
    </span>
  );
}

export default Logo;
