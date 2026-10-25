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

export function AtmosphericFilter({ onChange }: { onChange?: (v: string) => void }) {
  return (
    <div className="sky-radio-wrap">
      <p className="label" style={{ marginBottom: 8 }}>
        View through the atmosphere
      </p>
      <SkyRadio
        name="atmosphere"
        defaultValue="all"
        options={[
          { value: "all", label: "All skies" },
          { value: "clear", label: "Clear" },
          { value: "overcast", label: "Overcast" },
        ]}
        onChange={onChange}
      />
      <p style={{ marginTop: 8, color: "var(--ink-faint)", fontSize: "0.75rem" }}>
        Clear — bright cumulus and high cirrus. Overcast — storm shelves and low stratus. Like sorting what you already know from what still feels heavy overhead.
      </p>
    </div>
  );
}
