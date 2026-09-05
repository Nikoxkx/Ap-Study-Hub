import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * The Content-Security-Policy is deliberately tight because this site loads
 * nothing from anywhere: fonts are self-hosted, there is no analytics, and the
 * only third-party frame is the YouTube privacy-enhanced player, which is why
 * youtube-nocookie.com is the sole frame-src entry.
 *
 * `unsafe-inline` is present for style-src because Tailwind and the inline
 * `style` props used for CSS custom properties require it, and for script-src
 * because the theme script has to run before paint to avoid a flash. Both are
 * the standard trade-off; the nonce-based alternative would force every page to
 * become dynamic, which would cost more than it buys on a static content site.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://i.ytimg.com",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://www.youtube-nocookie.com",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    // Nothing here needs a camera, a microphone or a location.
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    // YouTube thumbnails are the only remote images on the site.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Font filenames are stable, so they are cached hard. If a face is ever
        // replaced, rename the file.
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },

  async redirects() {
    return [
      // The old build served every study mode from one long course page with
      // fragment links. Those URLs are in people's history and in Google's
      // index, so they redirect to the page that now owns that content.
      { source: "/course/:slug/study-guides", destination: "/course/:slug/notes", permanent: true },
      { source: "/course/:slug/flashcards", destination: "/course/:slug/cards", permanent: true },
      { source: "/course/:slug/mock-exam", destination: "/course/:slug/exam", permanent: true },
      { source: "/courses", destination: "/#catalogue", permanent: true },
    ];
  },
};

export default nextConfig;
