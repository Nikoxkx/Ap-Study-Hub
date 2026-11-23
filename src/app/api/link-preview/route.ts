import { NextResponse } from "next/server";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

import { guessCourse } from "@/lib/course-hints";
import { subjects } from "@/lib/subjects";

const COURSE_SLUGS = subjects.map((subject) => subject.slug);

/**
 * Fetch a page's <head> on the visitor's behalf and hand back a title, a
 * description and a best-guess course.
 *
 * This is the only endpoint on the site that makes an outbound request, so it is
 * written as if it were hostile input: the URL is re-validated on every redirect
 * hop, the hostname is resolved and rejected if *any* address is loopback,
 * private, link-local or CGNAT (defeating `evil.example → 127.0.0.1`), the
 * response must be text, is capped at 512 KB, and times out after 5 seconds.
 * Nothing is cached server-side and the body is never stored.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 512 * 1024;
const TIMEOUT_MS = 5_000;
const MAX_REDIRECTS = 3;
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 10 * 60 * 1000;

/** In-memory, per-instance counter. Enough to stop a bored visitor hammering
 *  the endpoint; a real deployment behind a shared cache would use a KV bucket. */
const hits = new Map<string, { count: number; reset: number }>();

/** Hostnames that must never be reachable from this endpoint, before DNS. */
const BLOCKED_HOSTS = new Set([
  "localhost",
  "localhost.localdomain",
  "metadata.google.internal",
  "instance-data",
  "169.254.169.254",
  "metadata",
]);

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + RATE_WINDOW_MS });
    if (hits.size > 5_000) {
      for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
    }
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

const PRIVATE_V4: [string, number][] = [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.0.2.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["198.51.100.0", 24],
  ["203.0.113.0", 24],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
];

function v4ToInt(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let out = 0;
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) return null;
    const n = Number(part);
    if (n > 255) return null;
    out = out * 256 + n;
  }
  return out;
}

function isPrivateV4(ip: string): boolean {
  const value = v4ToInt(ip);
  if (value === null) return true;
  return PRIVATE_V4.some(([base, bits]) => {
    const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
    const start = v4ToInt(base);
    if (start === null) return false;
    return (value & mask) >>> 0 === (start & mask) >>> 0;
  });
}

function isPrivateV6(ip: string): boolean {
  const lower = ip.toLowerCase();
  if (lower === "::" || lower === "::1") return true;
  // IPv4-mapped / -compatible forms: re-check the tail as IPv4.
  const mapped = lower.match(/(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPrivateV4(mapped[1]);
  if (/^f[cd][0-9a-f]{2}:/.test(lower)) return true; // fc00::/7 unique-local
  if (/^fe[89ab][0-9a-f]:/.test(lower)) return true; // fe80::/10 link-local
  if (lower.startsWith("::ffff:")) return true;
  return false;
}

function isPrivateAddress(ip: string): boolean {
  const family = isIP(ip);
  if (family === 4) return isPrivateV4(ip);
  if (family === 6) return isPrivateV6(ip);
  return true;
}

type GuardResult = { ok: true; url: URL } | { ok: false; reason: string };

async function guard(raw: string): Promise<GuardResult> {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return { ok: false, reason: "That does not look like a web address." };
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { ok: false, reason: "Only http and https links can be previewed." };
  }
  if (url.username || url.password) {
    return { ok: false, reason: "Links with embedded credentials are refused." };
  }
  url.hash = "";
  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  if (!host) return { ok: false, reason: "That link has no host." };
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) {
    return { ok: false, reason: "Local-network addresses cannot be previewed." };
  }
  if (BLOCKED_HOSTS.has(host)) {
    return { ok: false, reason: "That host is not allowed." };
  }
  if (isIP(host)) {
    if (isPrivateAddress(host)) {
      return { ok: false, reason: "Private and loopback addresses cannot be previewed." };
    }
    return { ok: true, url };
  }
  // Resolve every record and refuse if a single one is internal — otherwise a
  // hostname with one public and one private answer would still reach localhost.
  try {
    const records = await lookup(host, { all: true, verbatim: true });
    if (!records.length) return { ok: false, reason: "That host did not resolve." };
    if (records.some((record) => isPrivateAddress(record.address))) {
      return { ok: false, reason: "Private and loopback addresses cannot be previewed." };
    }
  } catch {
    return { ok: false, reason: "That host could not be reached." };
  }
  return { ok: true, url };
}

function decodeEntities(input: string): string {
  return input
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => safeCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => safeCodePoint(parseInt(dec, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function safeCodePoint(value: number): string {
  if (!Number.isFinite(value) || value < 1 || value > 0x10ffff) return "";
  try {
    return String.fromCodePoint(value);
  } catch {
    return "";
  }
}

function clean(value: string | undefined, max: number): string {
  if (!value) return "";
  return decodeEntities(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function attr(tag: string, name: string): string | undefined {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  if (!match) return undefined;
  return match[2] ?? match[3] ?? match[4];
}

function metaTag(html: string, keys: string[]): string | undefined {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const key of keys) {
    for (const tag of tags) {
      const name = (attr(tag, "property") ?? attr(tag, "name") ?? "").toLowerCase();
      if (name === key) return attr(tag, "content");
    }
  }
  return undefined;
}

function parseHead(html: string) {
  const titleTag = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  const title =
    clean(metaTag(html, ["og:title", "twitter:title"]), 140) || clean(titleTag, 140);
  const description = clean(
    metaTag(html, ["og:description", "twitter:description", "description"]),
    280,
  );
  const siteName = clean(metaTag(html, ["og:site_name", "application-name"]), 80);
  return { title, description, siteName };
}

/** Read at most MAX_BYTES of the body, then stop downloading. */
async function readCapped(response: Response): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) return "";
  const decoder = new TextDecoder("utf-8", { fatal: false });
  let total = 0;
  let text = "";
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      text += decoder.decode(value, { stream: true });
      if (total >= MAX_BYTES) break;
    }
    text += decoder.decode();
  } finally {
    await reader.cancel().catch(() => undefined);
  }
  return text.slice(0, MAX_BYTES);
}

async function fetchPage(start: URL, signal: AbortSignal): Promise<Response> {
  let current = start;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    const checked = await guard(current.href);
    if (!checked.ok) throw new Error(checked.reason);
    const response = await fetch(checked.url, {
      redirect: "manual",
      signal,
      headers: {
        accept: "text/html,application/xhtml+xml;q=0.9,text/plain;q=0.5",
        "user-agent": "APStudyHub-LinkPreview/1.0 (+https://ap-study-hub.vercel.app)",
      },
      cache: "no-store",
    });
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) throw new Error("That link redirected nowhere.");
      await response.body?.cancel().catch(() => undefined);
      current = new URL(location, checked.url);
      continue;
    }
    return response;
  }
  throw new Error("That link redirected too many times.");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many previews from this browser. Try again in a few minutes." },
      { status: 429, headers: { "cache-control": "no-store" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
  }
  const raw = typeof (body as { url?: unknown })?.url === "string" ? (body as { url: string }).url.trim() : "";
  if (!raw || raw.length > 2_000) {
    return NextResponse.json({ error: "Paste a full http or https link." }, { status: 400 });
  }

  const checked = await guard(raw);
  if (!checked.ok) {
    return NextResponse.json({ error: checked.reason }, { status: 400 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetchPage(checked.url, controller.signal);
    if (!response.ok) {
      await response.body?.cancel().catch(() => undefined);
      return NextResponse.json(
        { error: `That page answered ${response.status}.` },
        { status: 422 },
      );
    }
    const type = (response.headers.get("content-type") ?? "").toLowerCase();
    if (!/^(text\/html|application\/xhtml\+xml|text\/plain)/.test(type)) {
      await response.body?.cancel().catch(() => undefined);
      return NextResponse.json({ error: "That link is not a web page." }, { status: 415 });
    }
    const html = await readCapped(response);
    const parsed = parseHead(html);
    const haystack = `${parsed.title} ${parsed.description} ${checked.url.pathname} ${checked.url.hostname}`;
    return NextResponse.json(
      {
        title: parsed.title,
        description: parsed.description,
        siteName: parsed.siteName || checked.url.hostname.replace(/^www\./, ""),
        course: guessCourse(haystack, COURSE_SLUGS),
      },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "That page took too long to answer."
        : error instanceof Error && error.message.startsWith("That ")
          ? error.message
          : "That page could not be read.";
    return NextResponse.json({ error: message }, { status: 422 });
  } finally {
    clearTimeout(timer);
  }
}
