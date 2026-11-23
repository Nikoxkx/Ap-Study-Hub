"use client";

import { useId, type ChangeEvent, type ReactNode } from "react";

/**
 * The form vocabulary of /settings.
 *
 * Small, boring, accessible controls with one job each. They wrap native inputs
 * rather than reimplementing them, so keyboard support, screen readers, and
 * mobile pickers behave the way people already expect. The only custom chrome is
 * a switch drawn on top of a checkbox that keeps its native semantics.
 */

export function Panel({
  title,
  description,
  children,
  aside,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="settings-panel glass-box" aria-label={title}>
      <header className="settings-panel-head">
        <div>
          <h3 className="settings-panel-title">{title}</h3>
          {description ? <p className="settings-panel-note">{description}</p> : null}
        </div>
        {aside}
      </header>
      <div className="settings-panel-body">{children}</div>
    </section>
  );
}

export function Row({
  label,
  hint,
  children,
  htmlFor,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="settings-row">
      <div className="settings-row-label">
        <label htmlFor={htmlFor}>{label}</label>
        {hint ? <p>{hint}</p> : null}
      </div>
      <div className="settings-row-control">{children}</div>
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <label className={`pref-switch${disabled ? " is-disabled" : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="pref-switch-track" aria-hidden="true">
        <span className="pref-switch-thumb" />
      </span>
      <span className="sr-only">{label}</span>
    </label>
  );
}

export function Slider({
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
  id,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
  id?: string;
}) {
  const generated = useId();
  const inputId = id ?? generated;
  return (
    <div className="pref-slider">
      <input
        id={inputId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(Number(event.target.value))}
      />
      <output htmlFor={inputId}>{format ? format(value) : value}</output>
    </div>
  );
}

export function TextField({
  value,
  onChange,
  placeholder,
  id,
  type = "text",
  maxLength = 200,
  list,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  type?: "text" | "url" | "email" | "tel" | "date";
  maxLength?: number;
  list?: string;
}) {
  const generated = useId();
  return (
    <input
      id={id ?? generated}
      className="field"
      type={type}
      value={value}
      list={list}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
  id,
  maxLength = 600,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  id?: string;
  maxLength?: number;
}) {
  const generated = useId();
  return (
    <textarea
      id={id ?? generated}
      className="field"
      rows={rows}
      value={value}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export function Select<T extends string>({
  value,
  onChange,
  options,
  id,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  id?: string;
}) {
  const generated = useId();
  return (
    <select
      id={id ?? generated}
      className="field"
      value={value}
      onChange={(event) => onChange(event.target.value as T)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

/**
 * A colour picker with a hex field beside it.
 *
 * Native `<input type="color">` only speaks `#rrggbb`, so the text field is the
 * source of truth for pasted values and the swatch is for picking. `null` means
 * "use the shipped colour", which the clear button restores.
 */
export function ColorField({
  value,
  fallback,
  onChange,
  label,
}: {
  value: string | null;
  fallback: string;
  onChange: (value: string | null) => void;
  label: string;
}) {
  const id = useId();
  return (
    <div className="pref-color">
      <input
        id={id}
        type="color"
        aria-label={`${label} colour picker`}
        value={value ?? fallback}
        onChange={(event) => onChange(event.target.value)}
      />
      <input
        className="field pref-color-hex"
        aria-label={`${label} hex value`}
        value={value ?? ""}
        placeholder={fallback}
        maxLength={7}
        onChange={(event) => {
          const next = event.target.value.trim();
          if (next === "") onChange(null);
          else if (/^#[0-9a-f]{6}$/i.test(next)) onChange(next.toLowerCase());
        }}
      />
      <button type="button" className="pref-mini" onClick={() => onChange(null)} disabled={value === null}>
        Reset
      </button>
    </div>
  );
}

export function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  label: string;
}) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function Note({ children, tone = "quiet" }: { children: ReactNode; tone?: "quiet" | "warn" | "good" }) {
  return <p className={`settings-note settings-note-${tone}`}>{children}</p>;
}

export function DangerButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" className="btn btn-danger" onClick={onClick}>
      {children}
    </button>
  );
}
