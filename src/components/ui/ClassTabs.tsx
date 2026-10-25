"use client";

import Link from "next/link";
import React from "react";

/**
 * Segmented radio/link bar for top-level AP classes and mode switchers.
 *
 * Uses the exact `.uiverse-radio-inputs` styling (#EEE translucent pill rail,
 * white active pill with 600 weight). Supports either `href` navigation links
 * (used in the top classes bar & course tabs) or radio `onChange` state.
 */
export interface ClassTabOption {
  value: string;
  label: React.ReactNode;
  href?: string;
  title?: string;
}

interface ClassTabsProps {
  name: string;
  options: ClassTabOption[];
  value?: string;
  onChange?: (value: string) => void;
  ariaLabel?: string;
  className?: string;
}

export function ClassTabs({
  name,
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: ClassTabsProps) {
  return (
    <div
      role={options.some((o) => o.href) ? "navigation" : "radiogroup"}
      aria-label={ariaLabel}
      className={["uiverse-radio-inputs", className].filter(Boolean).join(" ")}
    >
      {options.map((option) => {
        const active = value === option.value;
        if (option.href) {
          return (
            <Link
              key={option.value}
              href={option.href}
              title={option.title}
              aria-current={active ? "page" : undefined}
              className="radio no-underline"
              data-checked={active ? "true" : "false"}
            >
              <span className="name">{option.label}</span>
            </Link>
          );
        }

        return (
          <label key={option.value} className="radio" title={option.title}>
            <input
              type="radio"
              name={name}
              checked={active}
              onChange={() => onChange?.(option.value)}
            />
            <span className="name">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}

export default ClassTabs;
