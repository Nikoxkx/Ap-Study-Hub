"use client";

import React, { useId } from "react";

/**
 * Diagonal-fill 30×30 rounded checkbox control.
 *
 * Slides a 45-degree rotated white square across the viewport when checked.
 */
interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function Checkbox({
  label,
  id,
  className,
  onCheckedChange,
  onChange,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <span
      className={["inline-flex items-center gap-2.5", className]
        .filter(Boolean)
        .join(" ")}
    >
      <label htmlFor={inputId} className="uiverse-checkbox">
        <input
          id={inputId}
          type="checkbox"
          onChange={(event) => {
            onChange?.(event);
            onCheckedChange?.(event.target.checked);
          }}
          {...props}
        />
        <span className="transition" aria-hidden="true" />
      </label>
      {label ? (
        <label htmlFor={inputId} className="cursor-pointer select-none text-sm">
          {label}
        </label>
      ) : null}
    </span>
  );
}

export default Checkbox;
