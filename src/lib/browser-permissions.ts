/**
 * The browser-side half of "permissions".
 *
 * The honest list for this site is short. It has no camera, microphone,
 * location, contact, or notification code, so those permissions are never
 * requested — a prompt you cannot justify is a prompt that teaches people to
 * click Allow without reading. What it *does* ask for is one thing:
 * persistent storage, so a wallpaper the visitor uploaded and the preferences
 * they spent time on are not evicted the first time the disk gets full.
 *
 * Nothing here is required. Every function resolves to a state the UI can print.
 */

export type PersistenceState = "granted" | "denied" | "default" | "unsupported";

export interface StorageReport {
  state: PersistenceState;
  usage: number | null;
  quota: number | null;
}

function store(): StorageManager | null {
  if (typeof navigator === "undefined") return null;
  return navigator.storage ?? null;
}

export async function readStorage(): Promise<StorageReport> {
  const manager = store();
  if (!manager || typeof manager.persisted !== "function") {
    return { state: "unsupported", usage: null, quota: null };
  }
  let persisted = false;
  try {
    persisted = await manager.persisted();
  } catch {
    return { state: "unsupported", usage: null, quota: null };
  }
  let usage: number | null = null;
  let quota: number | null = null;
  if (typeof manager.estimate === "function") {
    try {
      const estimate = await manager.estimate();
      usage = typeof estimate.usage === "number" ? estimate.usage : null;
      quota = typeof estimate.quota === "number" ? estimate.quota : null;
    } catch {
      // An estimate is a nicety; its absence is not a failure.
    }
  }
  return { state: persisted ? "granted" : "default", usage, quota };
}

/**
 * Asks the browser to stop evicting this origin's data.
 *
 * Chrome and Firefox answer from a heuristic — engaged sites are usually
 * granted without a dialog — and Safari answers `false` for anything that is
 * not an installed home-screen app. `denied` is therefore a normal answer, not
 * an error, and the copy says so.
 */
export async function requestPersistence(): Promise<PersistenceState> {
  const manager = store();
  if (!manager || typeof manager.persist !== "function") return "unsupported";
  try {
    const granted = await manager.persist();
    return granted ? "granted" : "denied";
  } catch {
    return "denied";
  }
}

/** Bytes → "1.4 MB", for the storage line. */
export function formatBytes(bytes: number | null): string {
  if (bytes === null) return "unknown";
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unit]}`;
}

/**
 * What Google actually hands over, spelled out. Supabase requests the base
 * `openid email profile` scopes and nothing else: no Drive, no Calendar, no
 * contacts. This constant is the single source of that sentence, so the sign-in
 * card, the account card, and the docs cannot drift apart.
 */
export const GOOGLE_SCOPES = [
  { scope: "openid", plain: "that you are signed in" },
  { scope: "email", plain: "your email address, so the same account is found on every device" },
  { scope: "profile", plain: "your name and profile photo, to label the account" },
] as const;

export const NOT_REQUESTED = [
  "Camera and microphone",
  "Precise location",
  "Contacts and calendar",
  "Drive, Docs, or Gmail files",
  "Push notifications",
  "Clipboard history",
] as const;
