"use client";

import React, { useId } from "react";

/**
 * Soft Neumorphic Pill Switch (`translate3d(-75%, 0, 0)` → `translate3d(25%, 0, 0)`).
 */
interface NeumorphicSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  title?: string;
  className?: string;
}

export function NeumorphicSwitch({
  checked,
  onChange,
  label,
  title,
  className,
}: NeumorphicSwitchProps) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      title={title}
      className={["uiverse-switch-label", className].filter(Boolean).join(" ")}
    >
      <span className="uiverse-toggle">
        <input
          id={id}
          type="checkbox"
          className="uiverse-toggle-state"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="uiverse-indicator" aria-hidden="true" />
      </span>
      {label ? <span className="uiverse-switch-text">{label}</span> : null}
    </label>
  );
}

export default NeumorphicSwitch;
