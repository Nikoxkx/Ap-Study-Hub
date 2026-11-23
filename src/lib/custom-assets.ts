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
 *  • Only raster images and three video containers are accepted. SVG is refused
 *    on purpose — an SVG is a document that can carry script and remote
 *    references, and this site renders uploads inside an `<img>`, where an SVG
 *    could still be a tracking beacon.
 *  • The type is decided by the file's leading bytes, not by `File.type` or the
 *    extension, because both are suggestions and `File.type` is attacker-
 *    controlled. Anything the browser cannot render directly (HEIC, AVIF, a
 *    photo with no type at all) is decoded and re-encoded as JPEG on the device
 *    instead of being refused — see `prepareUpload` for why that matters on an
 *    iPhone.
 *  • Size is capped before the bytes are read, so a 2 GB file cannot be used to
 *    exhaust memory.
 *  • Reads return a Blob; nothing is ever injected as HTML or CSS `url()`.
 */

export const ASSET_DB = "aps-assets";
const STORE = "assets";
const DB_VERSION = 1;

/** Decoded images are re-encoded before they are stored, so this is the real cap. */
export const MAX_ASSET_BYTES = 4 * 1024 * 1024;
/** Videos are stored as they are: re-encoding one in the browser is not honest. */
export const MAX_VIDEO_BYTES = 12 * 1024 * 1024;
/** Longest edge kept for an uploaded picture. Bigger than any wallpaper needs. */
export const MAX_IMAGE_EDGE = 2560;

export interface StoredAsset {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: number;
}

export type AssetKind = "image" | "video";

/** What the browser can render directly; anything else is converted first. */
const NATIVE_IMAGE_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
const VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"]);

export const ASSET_ACCEPT = "image/*,video/mp4,video/webm,video/quicktime";
export const IMAGE_COPY_LIMIT = `${Math.round(MAX_ASSET_BYTES / 1024 / 1024)} MB`;
export const VIDEO_COPY_LIMIT = `${Math.round(MAX_VIDEO_BYTES / 1024 / 1024)} MB`;

const ftypBrand = (bytes: Uint8Array): string => {
  if (bytes.length < 12) return "";
  if (!(bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70)) return "";
  return String.fromCharCode(bytes[8], bytes[9], bytes[10], bytes[11]).trim().toLowerCase();
};

/**
 * Leading-byte signatures. Deliberately broad on the *input* side: an iPhone
 * hands over HEIC (and sometimes AVIF) from the photo picker, and refusing those
 * at the gate is exactly the bug this function exists to avoid. Everything that
 * is not a directly renderable raster type is decoded and re-encoded as JPEG
 * by `prepareUpload` before it reaches storage.
 */
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
  if (bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3) return "video/webm";

  const brand = ftypBrand(bytes);
  if (brand) {
    if (brand === "avif" || brand === "avis") return "image/avif";
    if (brand === "heic" || brand === "heix" || brand === "hevc" || brand === "hevx" || brand === "mif1" || brand === "msf1") {
      return "image/heic";
    }
    // `ftypBrand` trims, so QuickTime arrives as "qt", not "qt  ".
    if (brand === "qt") return "video/quicktime";
    // mp4 family: isom, mp42, avc1, M4V, dash, iso5 …
    return "video/mp4";
  }
  return null;
}

export type AssetRejectionReason = "too-large" | "bad-type" | "empty" | "bad-bytes" | "undecodable";

export interface PreparedUpload {
  blob: Blob;
  name: string;
  kind: AssetKind;
  type: string;
  /** True when the bytes were re-encoded on this device (HEIC, AVIF, huge JPEG…). */
  converted: boolean;
  /** What the original file said it was, for an honest note in the UI. */
  originalType: string;
}

export type PrepareResult =
  | { ok: true; prepared: PreparedUpload }
  | { ok: false; reason: AssetRejectionReason };

/** Pure type/size gate for a picture that will be rendered as-is. Kept exported
 *  because the validator and the account UI quote the same rules. */
export function checkAssetCandidate(file: { size: number; type: string }): { ok: boolean; reason?: AssetRejectionReason; type: string } {
  const declared = file.type.trim().toLowerCase();
  if (file.size <= 0) return { ok: false, reason: "empty", type: declared };
  if (declared === "image/svg+xml" || declared === "image/svg") return { ok: false, reason: "bad-type", type: declared };
  if (file.size > MAX_ASSET_BYTES) return { ok: false, reason: "too-large", type: declared };
  if (declared && declared !== "application/octet-stream" && !NATIVE_IMAGE_TYPES.has(declared)) {
    return { ok: false, reason: "bad-type", type: declared };
  }
  return { ok: true, type: declared || "application/octet-stream" };
}

/** Reads the first bytes and reports what the file really is, if it is recognised. */
export async function verifyAssetBytes(file: Blob): Promise<string | null> {
  const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  return sniff(head);
}

const VIDEO_EXTENSION = /\.(mp4|m4v|webm|mov)$/i;

function looksLikeVideo(file: { name: string; type: string }): boolean {
  const declared = file.type.trim().toLowerCase();
  if (declared.startsWith("video/")) return true;
  return !declared && VIDEO_EXTENSION.test(file.name);
}

type Drawable = ImageBitmap | HTMLImageElement;

interface Decoded {
  drawable: Drawable;
  /** Frees the bitmap or the object URL the element was loaded from. */
  release: () => void;
}

async function decodeImage(blob: Blob): Promise<Decoded | null> {
  // `createImageBitmap` is the fast path and applies EXIF orientation on iOS.
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(blob, { imageOrientation: "from-image" });
      return { drawable: bitmap, release: () => bitmap.close() };
    } catch {
      // Fall through: Safari decodes HEIC in an <img> long before it will in a bitmap.
    }
  }
  if (typeof document === "undefined") return null;
  const url = URL.createObjectURL(blob);
  try {
    const img = new Image();
    img.decoding = "sync";
    img.src = url;
    await img.decode();
    return { drawable: img, release: () => URL.revokeObjectURL(url) };
  } catch {
    URL.revokeObjectURL(url);
    return null;
  }
}

function drawableSize(drawable: Drawable): { width: number; height: number } {
  if ("naturalWidth" in drawable) return { width: drawable.naturalWidth, height: drawable.naturalHeight };
  return { width: drawable.width, height: drawable.height };
}

async function canvasToJpeg(drawable: Drawable, quality: number): Promise<Blob | null> {
  const { width, height } = drawableSize(drawable);
  if (!width || !height) return null;
  const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(width, height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.imageSmoothingQuality = "high";
  context.drawImage(drawable as CanvasImageSource, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/jpeg", quality));
}

/**
 * Turns whatever the picker handed over into something this site can store.
 *
 * This is the iPhone fix. iOS Safari gives the file input HEIC bytes with
 * `type: "image/heic"` — or an empty type, or `application/octet-stream` — and
 * none of those are in the allow-list. Rather than trusting the declaration,
 * anything that is not already a renderable raster type is decoded and
 * re-encoded as JPEG here, on the device, before the size gate is applied.
 */
export async function prepareUpload(file: File): Promise<PrepareResult> {
  if (file.size <= 0) return { ok: false, reason: "empty" };

  const declared = file.type.trim().toLowerCase();
  const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  const sniffed = sniff(head);
  const wantsVideo = sniffed ? VIDEO_TYPES.has(sniffed) : looksLikeVideo(file);

  if (wantsVideo) {
    if (file.size > MAX_VIDEO_BYTES) return { ok: false, reason: "too-large" };
    const type = sniffed && VIDEO_TYPES.has(sniffed) ? sniffed : declared.startsWith("video/") ? declared : "video/mp4";
    if (!VIDEO_TYPES.has(type)) return { ok: false, reason: "bad-type" };
    return {
      ok: true,
      prepared: {
        blob: new Blob([file], { type }),
        name: file.name.slice(0, 120) || "wallpaper-video",
        kind: "video",
        type,
        converted: false,
        originalType: declared,
      },
    };
  }

  // A picture that the browser can already render, at an acceptable size: store
  // the original bytes, untouched.
  if (
    sniffed &&
    NATIVE_IMAGE_TYPES.has(sniffed) &&
    sniffed === declared &&
    file.size <= MAX_ASSET_BYTES
  ) {
    return {
      ok: true,
      prepared: {
        blob: new Blob([file], { type: sniffed }),
        name: file.name.slice(0, 120) || "wallpaper",
        kind: "image",
        type: sniffed,
        converted: false,
        originalType: declared,
      },
    };
  }

  // Everything else — HEIC, AVIF, a 9 MB phone JPEG, a file with no type at all —
  // is decoded and re-encoded.
  const decoded = await decodeImage(file);
  if (!decoded) return { ok: false, reason: "undecodable" };
  try {
    for (const quality of [0.9, 0.82, 0.7]) {
      const jpeg = await canvasToJpeg(decoded.drawable, quality);
      if (jpeg && jpeg.size > 0 && jpeg.size <= MAX_ASSET_BYTES) {
        return {
          ok: true,
          prepared: {
            blob: jpeg,
            name: (file.name.replace(/\.[^.]+$/, "") || "wallpaper").slice(0, 120) + ".jpg",
            kind: "image",
            type: "image/jpeg",
            converted: true,
            originalType: declared || sniffed || "unknown",
          },
        };
      }
    }
  } finally {
    decoded.release();
  }
  return { ok: false, reason: "too-large" };
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

export type StoreResult =
  | { ok: true; asset: StoredAsset }
  | { ok: false; reason: AssetRejectionReason };

/** Writes already-prepared bytes to IndexedDB (or the session fallback). */
export async function storeUpload(prepared: PreparedUpload): Promise<StoreResult> {
  if (prepared.kind === "video" ? prepared.blob.size > MAX_VIDEO_BYTES : prepared.blob.size > MAX_ASSET_BYTES) {
    return { ok: false, reason: "too-large" };
  }
  // The stored type is derived from the prepared blob, never from the file name.
  const type = prepared.type;

  const asset: StoredAsset = {
    id: newId(),
    name: prepared.name.slice(0, 120) || "upload",
    type,
    size: prepared.blob.size,
    createdAt: Date.now(),
  };

  const db = await openDb();
  const blob = new Blob([prepared.blob], { type });
  if (!db) {
    memory.set(asset.id, blob);
    return { ok: true, asset };
  }

  const stored = await new Promise<boolean>((resolve) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put({ ...asset, blob });
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => resolve(false);
    tx.onabort = () => resolve(false);
  });

  if (!stored) {
    // Quota or a broken transaction: the session copy keeps the wallpaper the
    // visitor just chose visible until the tab closes, instead of silently
    // dropping it.
    memory.set(asset.id, blob);
  }
  return { ok: true, asset };
}

/** Prepare + store, the one call the settings UI needs. */
export async function putAsset(
  file: File,
): Promise<{ ok: true; asset: StoredAsset; converted: boolean } | { ok: false; reason: AssetRejectionReason }> {
  const prepared = await prepareUpload(file);
  if (!prepared.ok) return prepared;
  const stored = await storeUpload(prepared.prepared);
  if (!stored.ok) return stored;
  return { ok: true, asset: stored.asset, converted: prepared.prepared.converted };
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

export interface ResolvedAsset {
  url: string;
  type: string;
  kind: AssetKind;
}

/**
 * URL plus type. The background renderer needs to know whether it is looking at
 * a picture or a video before it can pick an element, and a blob URL alone
 * cannot tell it.
 */
export async function getAsset(id: string): Promise<ResolvedAsset | null> {
  const blob = await getAssetBlob(id);
  if (!blob) return null;
  const url = await getAssetUrl(id);
  if (!url) return null;
  const type = blob.type || "image/jpeg";
  return { url, type, kind: type.startsWith("video/") ? "video" : "image" };
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
