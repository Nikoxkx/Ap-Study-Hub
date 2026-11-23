"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useStoredState } from "./use-stored-state";

/**
 * Day/night choice, shared by the header switch and the settings page.
 *
 * The theme predates the preferences record and is stored on its own key, which
 * the pre-paint boot script in `app/layout.tsx` reads before React exists. Rather
 * than move it (and risk a flash of the wrong theme), both the switch and the
 * settings control read and write this one key through the same hook, so the two
 * can never disagree.
 */

export const THEME_STORAGE_KEY = "aps.theme";
export type ThemeChoice = "light" | "dark" | "system";

export function applyTheme(choice: ThemeChoice) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = choice === "dark" || (choice === "system" && prefersDark);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.dataset.theme = choice;
}

export function reviveTheme(value: unknown): ThemeChoice | null {
  return value === "light" || value === "dark" || value === "system" ? value : null;
}

function subscribeSystemDark(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function useThemeChoice() {
  const [choice, setChoice] = useStoredState<ThemeChoice>(THEME_STORAGE_KEY, "system", reviveTheme);
  const systemDark = useSyncExternalStore(
    subscribeSystemDark,
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    () => false,
  );

  useEffect(() => {
    applyTheme(choice);
  }, [choice, systemDark]);

  return {
    choice,
    setChoice,
    isDark: choice === "dark" || (choice === "system" && systemDark),
  };
}
