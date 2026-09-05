"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Read and write a JSON value in localStorage as if it were React state.
 *
 * The usual way to do this is `useState` plus a `useEffect` that reads storage
 * after mount. That pattern has three problems, and this module exists because
 * all three of them bit this site:
 *
 *  1. It renders twice on every mount — once with the placeholder, once with
 *    the real value — which is exactly what React's compiler flags as a
 *    cascading render.
 *  2. It cannot be done with a lazy `useState` initialiser instead, because
 *    `localStorage` does not exist during the server render, so the two passes
 *    disagree and hydration fails.
 *  3. Two tabs open on the same flashcard deck silently diverge, and whichever
 *    one you close last wins.
 *
 * `useSyncExternalStore` is built for precisely this shape: give it a server
 * snapshot, a client snapshot and a subscription, and it handles hydration
 * correctly by construction. Subscribing to the `storage` event on the way
 * past fixes the third problem for free.
 *
 * The one sharp edge is that `getSnapshot` must return a referentially stable
 * value or React re-renders forever, and `JSON.parse` returns a fresh object
 * every time. So parsed values are memoised against the exact raw string they
 * came from, in a module-level cache, and only reparsed when that string
 * changes.
 */

interface Entry {
  raw: string | null;
  parsed: unknown;
}

const parsed = new Map<string, Entry>();
const listeners = new Map<string, Set<() => void>>();

function notify(key: string) {
  const set = listeners.get(key);
  if (set) for (const listener of set) listener();
}

function subscribeTo(key: string, listener: () => void): () => void {
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  set.add(listener);

  // Fires in *other* tabs only, which is the case a local write cannot cover.
  // A null key means the whole store was cleared, so treat it as a change too.
  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) listener();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    set.delete(listener);
    if (set.size === 0) listeners.delete(key);
    window.removeEventListener("storage", onStorage);
  };
}

/** Storage access throws outright in some private-browsing modes. */
function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function discard(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Nothing sensible to do — the value is unusable either way.
  }
}

/**
 * Turns whatever came out of storage into a value of type T, or returns null to
 * say "this is not mine, throw it away". Passing one is strongly encouraged:
 * localStorage is user-writable and shared across every version of the site
 * this browser has ever loaded, so last month's shape can and does turn up.
 */
export type Revive<T> = (value: unknown) => T | null;

function snapshotOf<T>(key: string, fallback: T, revive?: Revive<T>): T {
  const raw = readRaw(key);

  const cached = parsed.get(key);
  if (cached && cached.raw === raw) return cached.parsed as T;

  let value = fallback;
  if (raw !== null) {
    try {
      const decoded: unknown = JSON.parse(raw);
      const revived = revive ? revive(decoded) : (decoded as T);
      if (revived === null) {
        discard(key);
      } else {
        value = revived;
      }
    } catch {
      // Truncated or hand-edited JSON. Drop it rather than leaving a value
      // that will fail to parse on every single render from now on.
      discard(key);
    }
  }

  parsed.set(key, { raw, parsed: value });
  return value;
}

/**
 * State backed by localStorage.
 *
 * Returns the current value and a setter with the same call signature as
 * `useState`'s, including the updater-function form. The value is `fallback`
 * during the server render and during hydration, then the stored value.
 *
 * `fallback` and `revive` are read on every snapshot but are not dependencies:
 * changing them mid-life is not supported, and neither is two components using
 * the same key with different fallbacks.
 */
export function useStoredState<T>(
  key: string,
  fallback: T,
  revive?: Revive<T>,
): [T, (next: T | ((current: T) => T)) => void] {
  const subscribe = useCallback((listener: () => void) => subscribeTo(key, listener), [key]);

  const value = useSyncExternalStore(
    subscribe,
    () => snapshotOf(key, fallback, revive),
    () => fallback,
  );

  const setValue = useCallback(
    (next: T | ((current: T) => T)) => {
      const current = snapshotOf(key, fallback, revive);
      const resolved = typeof next === "function" ? (next as (c: T) => T)(current) : next;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // Quota exceeded, or storage disabled. Cache the value anyway so the
        // interface still responds — it just will not survive a reload.
        parsed.set(key, { raw: null, parsed: resolved });
      }
      notify(key);
    },
    // `fallback` and `revive` are deliberately not dependencies. Callers pass
    // them as inline literals, so including them would rebuild the setter on
    // every render and defeat the point of memoising it; the contract is that
    // both are fixed for the life of the hook.
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [key],
  );

  return [value, setValue];
}
