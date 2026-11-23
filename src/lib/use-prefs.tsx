"use client";

/**
 * The single client boundary that reads `SitePrefs` and makes the whole site
 * obey them.
 *
 * It renders nothing visible. Its job is to keep two things in sync with the
 * stored record:
 *
 *  1. a `<style>` element in `<head>` holding the generated overrides
 *     (colours, type, radius, motion, density, visitor CSS), and
 *  2. a small set of `data-*` attributes on `<html>` that CSS can select on.
 *
 * Both are updated in an effect, so they never run during the server render and
 * can never disagree with what the server sent. A visitor who has customised
 * nothing gets the same bytes as before this feature existed: the generated
 * stylesheet is identical to the shipped tokens, so there is no flash to hide.
 *
 * **Safe mode.** `/any-page?safe=1` ignores the stored record and renders the
 * shipped defaults. That is the escape hatch for a custom stylesheet that has
 * made a page unusable — the settings page is always one URL away, and this
 * makes the whole site reachable even if the settings page itself is unreadable.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import Link from "next/link";
import { DEFAULT_PREFS, PREF_STORAGE_KEY, revivePrefs, type SitePrefs } from "./site-prefs";
import { buildPrefsCss, prefsAttributes } from "./prefs-theme";
import { useStoredState } from "./use-stored-state";

const STYLE_ID = "aps-prefs-style";

/** A subscription that never fires: `useSyncExternalStore` only needs a stable one. */
function subscribeNothing() {
  return () => undefined;
}

function hasSafeModeFlag(): boolean {
  try {
    return new URLSearchParams(window.location.search).get("safe") === "1";
  } catch {
    return false;
  }
}

interface PrefsContextValue {
  prefs: SitePrefs;
  /** Apply a change. Mutate the draft; it is cloned, validated, and persisted. */
  update: (mutator: (draft: SitePrefs) => void) => void;
  reset: () => void;
  /** True once the stored record has been read (false during SSR and hydration). */
  hydrated: boolean;
  safeMode: boolean;
}

const PrefsContext = createContext<PrefsContextValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useStoredState<SitePrefs>(PREF_STORAGE_KEY, DEFAULT_PREFS, revivePrefs);

  // "Have we reached the browser yet" is an external fact, so it is read as one
  // rather than held in state and flipped from an effect. The server snapshot is
  // always false, which keeps the first HTML byte-identical for everyone.
  const hydrated = useSyncExternalStore(subscribeNothing, () => true, () => false);
  const safeMode = hydrated ? hasSafeModeFlag() : false;

  const prefs = safeMode ? DEFAULT_PREFS : stored;
  const css = useMemo(() => buildPrefsCss(prefs), [prefs]);

  useEffect(() => {
    let element = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!element) {
      element = document.createElement("style");
      element.id = STYLE_ID;
      document.head.appendChild(element);
    }
    if (element.textContent !== css) element.textContent = css;
  }, [css]);

  useEffect(() => {
    const root = document.documentElement;
    const attributes = prefsAttributes(prefs);
    for (const [key, value] of Object.entries(attributes)) root.dataset[key] = value;
  }, [prefs]);

  const update = useCallback(
    (mutator: (draft: SitePrefs) => void) => {
      setStored((current) => {
        // Clone so a mutator cannot share a reference with the stored record,
        // and re-run the normalizer so nothing unvalidated ever reaches CSS.
        const draft = typeof structuredClone === "function"
          ? structuredClone(current)
          : (JSON.parse(JSON.stringify(current)) as SitePrefs);
        mutator(draft);
        return revivePrefs(draft);
      });
    },
    [setStored],
  );

  const reset = useCallback(() => setStored(DEFAULT_PREFS), [setStored]);

  const value = useMemo<PrefsContextValue>(
    () => ({ prefs, update, reset, hydrated, safeMode }),
    [prefs, update, reset, hydrated, safeMode],
  );

  return (
    <PrefsContext.Provider value={value}>
      {children}
      {safeMode ? (
        <div className="safe-mode-banner" role="status">
          <span>
            <strong>Safe mode.</strong> Your saved appearance and custom CSS are switched off for this
            page.
          </span>
          <Link href="/settings">Open settings</Link>
        </div>
      ) : null}
    </PrefsContext.Provider>
  );
}

/** Read and change the site preferences. Throws outside the provider, by design. */
export function usePrefs(): PrefsContextValue {
  const context = useContext(PrefsContext);
  if (!context) {
    throw new Error("usePrefs must be used inside <PreferencesProvider> (see app/layout.tsx).");
  }
  return context;
}
