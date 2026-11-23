/**
 * Storage for files the visitor uploads (wallpapers, images used in custom
 * blocks, a profile picture).
 *
 * These live in IndexedDB, not localStorage: a 4 MB photograph does not fit in
 * the ~5 MB string quota, and re-encoding it as a base64 data URL would inflate
 * it by a third and block the main thread on every read. A Blob in IndexedDB
 * stays binary, is read asynchronously, and is released with the origin's data.
 *
 * Security posture:
 *
 *  • Only raster images are accepted. SVG is refused on purpose — an SVG is a
 *    document that can carry script and remote references, and this site renders
 *    uploads inside an `<img>`, where an SVG could still be a tracking beacon.
 *  • The type is checked against the declared MIME *and* the file's leading
 *    bytes, because a `.png` extension is a suggestion and `File.type` is
 *    attacker-controlled.
 *  • Size is capped before the bytes are read, so a 2 GB file cannot be used to
 *    exhaust memory.
 *  • Reads return a Blob; nothing is ever injected as HTML or CSS `url()`.
 */

export const ASSET_DB = "aps-assets";
const STORE = "assets";
const DB_VERSION = 1;
export const MAX_ASSET_BYTES = 4 * 1024 * 1024;

export interface StoredAsset {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: number;
}

const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

/** Leading-byte signatures for the formats above. */
function sniff(bytes: Uint8Array): string | null {
  if (bytes.length < 12) return null;
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "image/png";
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) return "image/gif";
  return null;
}

export type AssetRejectionReason = "too-large" | "bad-type" | "empty";

export type AssetRejection =
  | { ok: false; reason: AssetRejectionReason }
  | { ok: true; type: string };

/** Pure type/size gate — also used by the validator and by the settings UI copy. */
export function checkAssetCandidate(file: { size: number; type: string }): AssetRejection {
  if (file.size <= 0) return { ok: false, reason: "empty" };
  if (file.size > MAX_ASSET_BYTES) return { ok: false, reason: "too-large" };
  const declared = file.type.trim().toLowerCase();
  // Spelled out rather than left to the allow-list: an SVG is a document that
  // can carry script and remote references, and "why was my file refused" is
  // easier to answer when the refusal is explicit.
  if (declared === "image/svg+xml" || declared === "image/svg") return { ok: false, reason: "bad-type" };
  if (declared && declared !== "application/octet-stream" && !ALLOWED_TYPES.has(declared)) {
    return { ok: false, reason: "bad-type" };
  }
  return { ok: true, type: declared || "application/octet-stream" };
}

/** Reads the first bytes and confirms they really are one of the accepted types. */
export async function verifyAssetBytes(file: Blob): Promise<string | null> {
  const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  return sniff(head);
}

let dbPromise: Promise<IDBDatabase | null> | null = null;

function openDb(): Promise<IDBDatabase | null> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve) => {
    if (typeof indexedDB === "undefined") {
      resolve(null);
      return;
    }
    const request = indexedDB.open(ASSET_DB, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
    request.onblocked = () => resolve(null);
  });
  return dbPromise;
}

/** Session-only fallback when IndexedDB is unavailable (private windows, old Safari). */
const memory = new Map<string, Blob>();

function newId(): string {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);
  return `asset-${random.replace(/[^a-z0-9-]/gi, "").slice(0, 40)}`;
}

export async function putAsset(file: File): Promise<{ ok: true; asset: StoredAsset } | { ok: false; reason: AssetRejectionReason | "bad-bytes" }> {
  const gate = checkAssetCandidate(file);
  if (!gate.ok) return gate;
  const sniffed = await verifyAssetBytes(file);
  if (!sniffed || !ALLOWED_TYPES.has(sniffed)) return { ok: false, reason: "bad-bytes" };

  const asset: StoredAsset = {
    id: newId(),
    name: file.name.slice(0, 120) || "upload",
    type: sniffed,
    size: file.size,
    createdAt: Date.now(),
  };

  const db = await openDb();
  if (!db) {
    memory.set(asset.id, new Blob([file], { type: sniffed }));
    return { ok: true, asset };
  }

  const stored = await new Promise<boolean>((resolve) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put({ ...asset, blob: new Blob([file], { type: sniffed }) });
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => resolve(false);
    tx.onabort = () => resolve(false);
  });

  if (!stored) {
    memory.set(asset.id, new Blob([file], { type: sniffed }));
  }
  return { ok: true, asset };
}

export async function getAssetBlob(id: string): Promise<Blob | null> {
  if (memory.has(id)) return memory.get(id) ?? null;
  const db = await openDb();
  if (!db) return null;
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, "readonly");
    const request = tx.objectStore(STORE).get(id);
    request.onsuccess = () => {
      const value = request.result as (StoredAsset & { blob?: Blob }) | undefined;
      resolve(value?.blob instanceof Blob ? value.blob : null);
    };
    request.onerror = () => resolve(null);
  });
}

const urlCache = new Map<string, string>();

/**
 * A stable `blob:` URL for an asset. Object URLs leak for the lifetime of the
 * document unless revoked, so they are cached per asset id and reused — the
 * count is bounded by the number of uploads, which the settings UI caps at 12.
 */
export async function getAssetUrl(id: string): Promise<string | null> {
  const cached = urlCache.get(id);
  if (cached) return cached;
  const blob = await getAssetBlob(id);
  if (!blob) return null;
  const url = URL.createObjectURL(blob);
  urlCache.set(id, url);
  return url;
}

export async function deleteAsset(id: string): Promise<void> {
  memory.delete(id);
  const url = urlCache.get(id);
  if (url) {
    URL.revokeObjectURL(url);
    urlCache.delete(id);
  }
  const db = await openDb();
  if (!db) return;
  await new Promise<void>((resolve) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
    tx.onabort = () => resolve();
  });
}

/** Everything the visitor has uploaded, newest first. Used by the data panel. */
export async function listAssets(): Promise<StoredAsset[]> {
  const db = await openDb();
  const fromDb = db
    ? await new Promise<StoredAsset[]>((resolve) => {
        const tx = db.transaction(STORE, "readonly");
        const request = tx.objectStore(STORE).getAll();
        request.onsuccess = () => {
          resolve(
            (request.result as (StoredAsset & { blob?: Blob })[]).map(
              ({ id, name, type, size, createdAt }) => ({ id, name, type, size, createdAt }),
            ),
          );
        };
        request.onerror = () => resolve([]);
      })
    : [];
  const ids = new Set(fromDb.map((asset) => asset.id));
  const extras = [...memory.entries()]
    .filter(([id]) => !ids.has(id))
    .map(([id, blob]) => ({ id, name: "upload", type: blob.type, size: blob.size, createdAt: 0 }));
  return [...fromDb, ...extras].sort((a, b) => b.createdAt - a.createdAt);
}
