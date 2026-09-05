import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ThemeScript } from "@/components/ThemeControl";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema, JsonLd } from "@/lib/schema";

/**
 * Typography and preload.
 *
 * The @font-face declarations live in globals.css and the files are served from
 * /public/fonts. The two faces that paint above the fold — the display serif for
 * the headline and the interface sans for everything else — are preloaded here
 * so they are requested in parallel with the stylesheet rather than after it.
 *
 * The mono face is not preloaded: it only sets small labels, so swapping it in
 * a beat late costs nothing and saves 40 KB on the critical path.
 */

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author.name }],
  creator: site.author.name,
  keywords: [
    "AP exam prep",
    "APUSH notes",
    "AP Lang synthesis essay",
    "AP Seminar IRR",
    "AP Government required cases",
    "AP Biology unit review",
    "AP Calculus AB BC",
    "AP Research academic paper",
    "free AP study guide",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.origin,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false, address: false, email: false },
  category: "education",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#141412" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link
          rel="preload"
          href="/fonts/newsreader-latin-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/public-sans-latin-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <JsonLd schema={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
