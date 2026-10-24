"use client";

import { useEffect } from "react";
import { useStoredState } from "@/lib/use-stored-state";

/**
 * Theme control.
 *
 * Three explicit states shown as a segmented control, rather than one icon
 * button that silently cycles light → dark → system. A user pressing the old
 * button had no way to know which of the three states they had landed in.
 *
 * The inline script in <head> (see ThemeScript) sets the class before first
 * paint so there is no flash; this component only handles user input and keeps
 * the OS listener wired up while "System" is selected.
 */

export type ThemeChoice = "light" | "dark" | "system";

const STORAGE_KEY = "aps.theme";

function apply(choice: ThemeChoice) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = choice === "dark" || (choice === "system" && prefersDark);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.dataset.theme = choice;
}

const options: { value: ThemeChoice; label: string; title: string }[] = [
  { value: "light", label: "Day", title: "Always use the light theme" },
  { value: "dark", label: "Night", title: "Always use the dark theme" },
  { value: "system", label: "Auto", title: "Follow your operating system setting" },
];

/** localStorage is user-writable, so never trust what comes out of it. */
function reviveChoice(value: unknown): ThemeChoice | null {
  return value === "light" || value === "dark" || value === "system" ? value : null;
}

/* --------------------------------------------------------------------------
   Lamp
   --------------------------------------------------------------------------
   A control that exists only in the dark theme. It changes how much light the
   room has — a softer board, a warmer glow, a brighter desk — and nothing else:
   text and paper contrast are unaffected, because a theme switch that can make
   the page unreadable is a trap rather than a preference.
   -------------------------------------------------------------------------- */

export type LampChoice = "soft" | "warm" | "clear";

const LAMP_KEY = "aps.lamp";
const warmDefault: LampChoice = "warm";

const lamps: { value: LampChoice; label: string; title: string }[] = [
  { value: "soft", label: "Low", title: "Low light: the darkest board, the smallest glow" },
  { value: "warm", label: "Warm", title: "Warm light: the default night desk" },
  { value: "clear", label: "Bright", title: "Reading lamp: a lighter board and stronger glare" },
];

function reviveLamp(value: unknown): LampChoice | null {
  return value === "soft" || value === "warm" || value === "clear" ? value : null;
}

function LampGlyph({ level }: { level: LampChoice }) {
  const rays = level === "soft" ? 3 : level === "clear" ? 5 : 4;
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
      <circle cx="8" cy="8" r={level === "soft" ? 2 : 2.4} fill="currentColor" stroke="none" />
      {Array.from({ length: rays }, (_, index) => {
        const angle = (Math.PI * 2 * index) / rays - Math.PI / 2;
        return (
          <line
            key={index}
            x1={8 + Math.cos(angle) * 4}
            y1={8 + Math.sin(angle) * 4}
            x2={8 + Math.cos(angle) * 5.8}
            y2={8 + Math.sin(angle) * 5.8}
          />
        );
      })}
    </svg>
  );
}

export function LampControl() {
  const [lamp, setLamp] = useStoredState<LampChoice>(LAMP_KEY, warmDefault, reviveLamp);

  useEffect(() => {
    document.documentElement.dataset.lamp = lamp;
  }, [lamp]);

  return (
    <div className="lamp-control" role="group" aria-label="Lamp brightness">
      <span aria-hidden="true">Lamp</span>
      {lamps.map((option) => (
        <button
          key={option.value}
          type="button"
          title={option.title}
          aria-label={option.title}
          aria-pressed={lamp === option.value}
          onClick={() => setLamp(option.value)}
        >
          <LampGlyph level={option.value} />
        </button>
      ))}
    </div>
  );
}

export function ThemeControl() {
  const [choice, setChoice] = useStoredState<ThemeChoice>(STORAGE_KEY, "system", reviveChoice);

  // Push the choice out to the document element. This is the one thing that
  // genuinely belongs in an effect: the class on <html> is external state that
  // React does not own, and it has to be kept in step with the value here.
  // The inline script has already set it correctly for the first paint, so on
  // mount this is a no-op write rather than a visible change.
  useEffect(() => {
    apply(choice);
  }, [choice]);

  // While "Auto" is selected the OS can change underneath us.
  useEffect(() => {
    if (choice !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [choice]);

  return (
    <fieldset
      className="flex items-center gap-0 border border-[var(--rule-strong)] rounded-[var(--radius-cut)] p-[2px]"
      style={{ margin: 0 }}
    >
      <legend className="sr-only">Colour theme</legend>
      {options.map((option) => {
        const active = choice === option.value;
        return (
          <label
            key={option.value}
            title={option.title}
            className="relative cursor-pointer px-2 py-1 text-[0.6875rem] font-mono uppercase tracking-[0.08em] rounded-[2px] transition-colors"
            style={{
              fontFamily: "var(--font-mono)",
              background: active ? "var(--ink)" : "transparent",
              color: active ? "var(--paper)" : "var(--ink-faint)",
            }}
          >
            <input
              type="radio"
              name="theme"
              value={option.value}
              checked={active}
              onChange={() => setChoice(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        );
      })}
    </fieldset>
  );
}

/**
 * Runs before paint. Kept to one statement in a try/catch: if localStorage
 * throws (Safari private mode used to), we fall through to the OS preference
 * rather than blocking render.
 */
export function ThemeScript() {
  const source = `(function(){try{var c=localStorage.getItem("${STORAGE_KEY}");var l=localStorage.getItem("${LAMP_KEY}");var m=window.matchMedia("(prefers-color-scheme: dark)").matches;if(c==="dark"||((c==="system"||!c)&&m)){document.documentElement.classList.add("dark")}document.documentElement.dataset.theme=c||"system";document.documentElement.dataset.lamp=(l==="soft"||l==="clear")?l:"warm"}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}
