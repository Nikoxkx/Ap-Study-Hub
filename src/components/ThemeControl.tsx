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
  const source = `(function(){try{var c=localStorage.getItem("${STORAGE_KEY}");var m=window.matchMedia("(prefers-color-scheme: dark)").matches;if(c==="dark"||((c==="system"||!c)&&m)){document.documentElement.classList.add("dark")}document.documentElement.dataset.theme=c||"system"}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}
