"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useStoredState } from "@/lib/use-stored-state";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";

export type ThemeChoice = "light" | "dark" | "system";

const STORAGE_KEY = "aps.theme";

function apply(choice: ThemeChoice) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = choice === "dark" || (choice === "system" && prefersDark);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.dataset.theme = choice;
}

function reviveChoice(value: unknown): ThemeChoice | null {
  return value === "light" || value === "dark" || value === "system" ? value : null;
}

function subscribeSystemDark(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getSystemDarkSnapshot() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getSystemDarkServerSnapshot() {
  return false;
}

export function ThemeControl() {
  const [choice, setChoice] = useStoredState<ThemeChoice>(STORAGE_KEY, "system", reviveChoice);
  const systemDark = useSyncExternalStore(
    subscribeSystemDark,
    getSystemDarkSnapshot,
    getSystemDarkServerSnapshot,
  );

  useEffect(() => {
    apply(choice);
  }, [choice, systemDark]);

  const isDark = choice === "dark" || (choice === "system" && systemDark);

  return (
    <div className="inline-flex items-center gap-2">
      <ThemeSwitch
        checked={isDark}
        size={17}
        onChange={(checked) => setChoice(checked ? "dark" : "light")}
        label={isDark ? "Switch to day mode" : "Switch to night mode"}
        title={isDark ? "Night mode active — click for day mode" : "Day mode active — click for night mode"}
      />
      {choice !== "system" ? (
        <button
          type="button"
          onClick={() => setChoice("system")}
          className="tag cursor-pointer px-2 py-0.5 text-[0.625rem] hover:opacity-80"
          title="Follow operating system theme"
        >
          Auto
        </button>
      ) : null}
    </div>
  );
}

/**
 * Runs before paint to apply saved or OS theme with no flash.
 */
export function ThemeScript() {
  const source = `(function(){try{var c=localStorage.getItem("${STORAGE_KEY}");var m=window.matchMedia("(prefers-color-scheme: dark)").matches;if(c==="dark"||((c==="system"||!c)&&m)){document.documentElement.classList.add("dark")}document.documentElement.dataset.theme=c||"system"}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}
