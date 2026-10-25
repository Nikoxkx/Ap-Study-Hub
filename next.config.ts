import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * Fonts are self-hosted and there is no analytics. Static YouTube thumbnails
 * load automatically on video pages, but they are images only. The two opt-in
 * third-party boundaries remain the privacy-enhanced YouTube player and the
 * optional Supabase sync endpoint; both are allowlisted explicitly and no
 * player or sync request is made until the visitor chooses it.
 *
 * `unsafe-inline` is present for style-src because Tailwind and the inline
 * `style` props used for CSS custom properties require it, and for script-src
 * because the theme script has to run before paint to avoid a flash. Both are
 * the standard trade-off; the nonce-based alternative would force every page to
 * become dynamic, which would cost more than it buys on a static content site.
 */
const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  isDev ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'" : "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://i.ytimg.com",
  "font-src 'self'",
  "connect-src 'self' https://*.supabase.co",
  "frame-src https://www.youtube-nocookie.com",
  "form-action 'self'",
  isDev ? "frame-ancestors *" : "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  ...(isDev ? [] : [{ key: "X-Frame-Options", value: "SAMEORIGIN" }]),
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    // Nothing here needs a camera, a microphone or a location; allow fullscreen for embedded unit videos.
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), fullscreen=*",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  allowedDevOrigins: ["*.e2b.app"],

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
      {
        // Social scrapers fetch this directly, sometimes from a different origin
        // and often with an aggressive cache. Explicit CORS and a day of browser
        // cache with a long CDN cache keep the preview reliable without making a
        // changed card impossible to roll out.
        source: "/og-image.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
        ],
      },
      {
        source: "/social-preview.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
        ],
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
      // AI disclosure aliases — common guesses.
      { source: "/ai", destination: "/ai-disclosure", permanent: true },
      { source: "/ai-disclosures", destination: "/ai-disclosure", permanent: true },
      { source: "/ai-use", destination: "/ai-disclosure", permanent: true },
      // The previous generated social-image route could return 500. Keep old
      // caches pointed at a real static PNG instead of a broken endpoint.
      { source: "/opengraph-image", destination: "/og-image.png", permanent: true },
      { source: "/opengraph-image.png", destination: "/og-image.png", permanent: true },
      { source: "/twitter-image", destination: "/og-image.png", permanent: true },
      { source: "/twitter-image.png", destination: "/og-image.png", permanent: true },
    ];
  },
};

export default nextConfig;
