"use client";

import React from "react";

/**
 * Animated SVG stroke-morphing Hamburger / Settings Menu button.
 *
 * Morphs cleanly into a rotated X using stroke-dasharray & stroke-dashoffset
 * transitions when `open` is true.
 */
interface HamburgerButtonProps {
  open: boolean;
  onToggle: (next: boolean) => void;
  ariaControls?: string;
  label?: string;
  className?: string;
  buttonRef?: React.Ref<HTMLLabelElement>;
}

export function HamburgerButton({
  open,
  onToggle,
  ariaControls,
  label = "Open menu and settings",
  className,
  buttonRef,
}: HamburgerButtonProps) {
  return (
    <label
      ref={buttonRef}
      title={label}
      className={["uiverse-hamburger", className].filter(Boolean).join(" ")}
    >
      <input
        type="checkbox"
        checked={open}
        aria-expanded={open}
        aria-controls={ariaControls}
        aria-label={label}
        onChange={(event) => onToggle(event.target.checked)}
      />
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          className="line line-top-bottom"
          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
        />
        <path className="line" d="M7 16 27 16" />
      </svg>
    </label>
  );
}

export default HamburgerButton;
