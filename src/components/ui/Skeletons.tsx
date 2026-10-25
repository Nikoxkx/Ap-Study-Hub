import React from "react";

/**
 * Shimmer skeleton card (circle + 4 text lines with linear sweep).
 */
export function ShimmerSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={["uiverse-shimmer-skeleton", className].filter(Boolean).join(" ")}
    >
      <div className="wrapper">
        <div className="circle" />
        <div className="line-1" />
        <div className="line-2" />
        <div className="line-3" />
        <div className="line-4" />
      </div>
    </div>
  );
}

/**
 * Pulse skeleton row (avatar circle + two bars + corner indicator dot).
 */
export function PulseSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={[
        "relative flex w-64 animate-pulse gap-2 p-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="h-12 w-12 shrink-0 rounded-full bg-slate-400/75" />
      <div className="flex-1">
        <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400/75 text-lg" />
        <div className="h-5 w-[90%] rounded-lg bg-slate-400/75 text-sm" />
      </div>
      <div className="absolute bottom-5 right-2 h-4 w-4 rounded-full bg-slate-400/75" />
    </div>
  );
}
