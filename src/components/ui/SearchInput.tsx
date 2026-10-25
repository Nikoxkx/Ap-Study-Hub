"use client";

import React, { useId } from "react";

/**
 * Floating-label transparent search bar.
 *
 * Uses a 2px neutral border, 20px pill radius, transparent fill, and an
 * animated label that floats to the top border on focus or non-empty value.
 */
interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  wrapperClassName?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}

export function SearchInput({
  label = "Search",
  wrapperClassName,
  className,
  id,
  inputRef,
  placeholder = " ",
  ...props
}: SearchInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div
      className={["uiverse-input-group", wrapperClassName]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        ref={inputRef}
        id={inputId}
        placeholder={placeholder}
        autoComplete="off"
        className={["uiverse-input", className].filter(Boolean).join(" ")}
        {...props}
      />
      <label htmlFor={inputId} className="uiverse-input-label">
        {label}
      </label>
    </div>
  );
}

export default SearchInput;
