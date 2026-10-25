"use client";

import { useState } from "react";

export function SkyInput({
  label = "Search the horizon",
  placeholder = "e.g. Federalism, mitosis, DBQ",
  name = "q",
  defaultValue = "",
}: {
  label?: string;
  placeholder?: string;
  name?: string;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="sky-input-group">
      <input
        type="text"
        name={name}
        id={`sky-${name}`}
        required
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder=" "
      />
      <label htmlFor={`sky-${name}`}>{label}</label>
      <span className="sky-input-hint">{placeholder}</span>
    </div>
  );
}

export function SkySearchField({
  value,
  onChange,
  onKeyDown,
  placeholder = "Search notes and terms",
  inputRef,
  listId,
  activeId,
  open,
}: {
  value: string;
  onChange: (v: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  listId?: string;
  activeId?: string;
  open?: boolean;
}) {
  return (
    <div className="sky-input-group sky-input-group--search">
      <input
        ref={inputRef as any}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder=" "
        autoComplete="off"
        spellCheck={false}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={activeId}
        id="sky-search"
      />
      <label htmlFor="sky-search">Search</label>
      <span className="sky-input-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="14" height="14">
          <g fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="7" cy="7" r="4.6" />
            <path d="m10.6 10.6 3.2 3.2" strokeLinecap="round" />
          </g>
        </svg>
      </span>
      {/* floating placeholder text lives in label + hint */}
    </div>
  );
}
