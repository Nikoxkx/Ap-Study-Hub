import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f6f3ec",
    theme_color: "#f6f3ec",
    categories: ["education", "books", "productivity"],
    lang: "en-US",
    dir: "ltr",
    // Generated icons share the same sheet geometry at every size; the larger
    // entries make the offline app installable on desktop and mobile platforms.
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "any" },
      { src: "/pwa-icon/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa-icon/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa-icon/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Your study desk", short_name: "Study", url: "/study" },
      { name: "Advanced desk", short_name: "Advanced", url: "/study?tab=advanced" },
      { name: "Unit videos", short_name: "Videos", url: "/videos" },
      { name: "Search", short_name: "Search", url: "/search" },
      { name: "Study guides", short_name: "Guides", url: "/guides" },
    ],
  };
}
