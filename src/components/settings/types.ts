import type { SitePrefs } from "@/lib/site-prefs";

/** The catalogue facts the settings page needs, passed from the server. */
export interface SettingsSubject {
  slug: string;
  familiar: string;
  official: string;
}

export interface SettingsTotals {
  courses: number;
  units: number;
  paragraphs: number;
  flashcards: number;
  questions: number;
}

export interface PanelProps {
  prefs: SitePrefs;
  update: (mutator: (draft: SitePrefs) => void) => void;
  subjects: SettingsSubject[];
  totals: SettingsTotals;
}
