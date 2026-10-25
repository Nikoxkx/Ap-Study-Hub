"use client";

import { useState } from "react";

export type RadioOption = { value: string; label: string };

export function SkyRadio({
  options,
  defaultValue,
  name,
  onChange,
}: {
  options: RadioOption[];
  defaultValue?: string;
  name: string;
  onChange?: (v: string) => void;
}) {
  const [value, setValue] = useState(defaultValue ?? options[0]?.value);
  return (
    <div className="sky-radio" role="radiogroup">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <label key={opt.value} className={`sky-radio__option ${active ? "is-active" : ""}`}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={active}
              onChange={() => {
                setValue(opt.value);
                onChange?.(opt.value);
              }}
            />
            <span className="sky-radio__name">{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}
