/**
 * Public links to the connector-backed artifacts that ship with this update.
 *
 * These are ordinary URLs, not credentials. No Google, Linear, or Supabase
 * token is compiled into the client bundle. Runtime sync uses an opt-in edge
 * function URL and a visitor-held sync code only.
 */
export const integrations = {
  sheet: {
    name: "AP Study Hub — Unit Video Registry (Oct 2026)",
    url: "https://docs.google.com/spreadsheets/d/1uFGBvTYtIpxJbQflqaTNo8NoS6SjVnR5VLqZYtMB0_c/edit",
    description: "93 verified videos covering 75 units, with a filter, frozen headers, banded rows, and a coverage chart.",
  },
  drive: {
    name: "AP Study Hub — Web Assets (Oct 2026)",
    url: "https://drive.google.com/drive/folders/169_iz_UDtQJRexrFAEm9Vix9TDu9tZGN",
    description: "Public folder containing the static social PNG, its mirror, the CSV registry, the JSON export, and the editorial brief.",
    files: {
      socialImage: "https://drive.google.com/file/d/11tCAqUI8E6PFFW7nds4RSPPVdnXqKh-2/view",
      socialImageMirror: "https://drive.google.com/file/d/1RiNP7pAsLKWrODrBFakMvSgi1jF-9Sbx/view",
      registryJson: "https://drive.google.com/file/d/1rMz4kBcZVPGSJ8PUkzv9YIk3rZ3LN1vB/view",
    },
  },
  doc: {
    name: "AP Study Hub — Video & Integration Implementation Brief",
    url: "https://docs.google.com/document/d/14vEIgp0RvpOAFxqvA95_Y4uO347E94UT3PqyN338-eM/edit",
    description: "Editorial criteria for video selection, QA checklist, connector map, and Supabase deployment steps.",
  },
  linear: {
    project: "AP Study Hub — Video & Study Desk Expansion",
    projectId: "beeffc1c-0efd-4ae7-8fd7-6ae335087a75",
    tracker: "https://linear.app/yeisbel/issue/YEI-12/ship-the-advanced-study-desk-tab",
    syncIssue: "https://linear.app/yeisbel/issue/YEI-13/activate-supabase-project-and-deploy-study-desk-sync",
  },
  supabase: {
    projectRef: "unfplzqqotubcfcswnlo",
    status: "active" as const,
    functionSlug: "study-desk-sync",
    defaultEndpoint: "https://unfplzqqotubcfcswnlo.supabase.co/functions/v1/study-desk-sync",
    note: "Project restored, migration applied, and edge function deployed. Secrets stay in Supabase; sync remains opt-in.",
  },
  local: {
    socialImage: "/og-image.png",
    socialImageMirror: "/social-preview.png",
    registryCsv: "/unit-video-registry.csv",
    registryJson: "/unit-video-registry.json",
    roadmapJson: "/roadmap.json",
  },
} as const;

export type IntegrationKey = keyof typeof integrations;
