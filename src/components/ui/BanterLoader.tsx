import React from "react";

/**
 * 9-box sliding grid kinetic symbol (`banter-loader`).
 *
 * Uses pure GPU `transform: translate(...)` keyframes on a 72×72 coordinate
 * frame, centered inside an arbitrary `size × size` bounding box.
 */
interface BanterLoaderProps {
  size?: number;
  className?: string;
  label?: string;
}

export function BanterLoader({ size = 36, className, label }: BanterLoaderProps) {
  const scale = size / 72;

  return (
    <span
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={["banter-loader-wrap", className].filter(Boolean).join(" ")}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <span
        className="banter-loader"
        style={{
          transform: `scale(${scale.toFixed(4)})`,
        }}
      >
        <span className="banter-loader__box" />
        <span className="banter-loader__box" />
        <span className="banter-loader__box" />
        <span className="banter-loader__box" />
        <span className="banter-loader__box" />
        <span className="banter-loader__box" />
        <span className="banter-loader__box" />
        <span className="banter-loader__box" />
        <span className="banter-loader__box" />
      </span>
    </span>
  );
}

export default BanterLoader;
