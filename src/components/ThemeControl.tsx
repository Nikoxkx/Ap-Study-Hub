"use client";

import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { THEME_STORAGE_KEY, useThemeChoice, type ThemeChoice } from "@/lib/theme";

export type { ThemeChoice };

export function ThemeControl() {
  const { choice, setChoice, isDark } = useThemeChoice();

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
  const source = `(function(){try{var c=localStorage.getItem("${THEME_STORAGE_KEY}");var m=window.matchMedia("(prefers-color-scheme: dark)").matches;if(c==="dark"||((c==="system"||!c)&&m)){document.documentElement.classList.add("dark")}document.documentElement.dataset.theme=c||"system"}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}
