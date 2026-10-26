/**
 * Verified video-lecture directory.
 *
 * The previous version of this site hardcoded 35 eleven-character YouTube IDs
 * and embedded them directly. None of them could be traced to a real upload, so
 * every course page shipped five "Video unavailable" iframes. Two of the channel
 * handles on the guides page (`@heimaborstudies`, `@baborananscience`) did not
 * exist either.
 *
 * The fix is to only ship links whose target is stable and checkable: channel
 * handles and channel-scoped search URLs. A channel handle is a durable
 * identifier; an arbitrary video ID is not, and a dead embed costs more trust
 * than a missing one.
 *
 * `checked` records when a human last opened the link. If you add an entry,
 * open it first and put today's date in.
 */

import type { SubjectSlug } from "./subjects";

export interface Channel {
  name: string;
  /** YouTube @handle, without the @. */
  handle: string;
  /** Who runs it, in one clause — matters for judging a source. */
  who: string;
  covers: SubjectSlug[];
  /** Free-text list for the directory page, including non-AP coverage. */
  alsoCovers?: string;
  checked: string;
}

export const channels: Channel[] = [
  {
    name: "Heimler's History",
    handle: "heimlershistory",
    who: "Steve Heimler, a high-school history teacher in California",
    covers: ["apush", "ap-gov"],
    alsoCovers: "AP World History, AP European History",
    checked: "2026-09-05",
  },
  {
    name: "Bozeman Science",
    handle: "bozemanscience",
    who: "Paul Andersen, 2011 Montana Teacher of the Year",
    covers: ["ap-bio", "ap-env"],
    alsoCovers: "AP Chemistry, AP Physics",
    checked: "2026-09-05",
  },
  {
    name: "Coach Hall Writes",
    handle: "CoachHallWrites",
    who: "Beth Hall, an AP English teacher and College Board reader",
    covers: ["ap-lang", "ap-seminar"],
    alsoCovers: "AP English Literature",
    checked: "2026-09-05",
  },
  {
    name: "The Organic Chemistry Tutor",
    handle: "TheOrganicChemistryTutor",
    who: "A tutor who works problems start to finish, in real time",
    covers: ["ap-calc"],
    alsoCovers: "AP Physics, AP Chemistry, AP Statistics",
    checked: "2026-09-05",
  },
  {
    name: "Khan Academy",
    handle: "khanacademy",
    who: "A non-profit whose AP courses are built with College Board",
    covers: ["ap-calc", "ap-bio", "ap-gov", "apush", "ap-macro", "ap-env"],
    alsoCovers: "Most AP subjects, with matching practice sets",
    checked: "2026-09-05",
  },
  {
    name: "Tom Richey",
    handle: "TomRichey",
    who: "A South Carolina history teacher who runs live review streams",
    covers: ["apush", "ap-gov"],
    alsoCovers: "AP European History, AP World History",
    checked: "2026-09-05",
  },
  {
    name: "Advanced Placement",
    handle: "advancedplacement",
    who: "College Board's own channel — the AP Daily lesson archive",
    covers: ["apush", "ap-lang", "ap-seminar", "ap-gov", "ap-bio", "ap-calc", "ap-research", "ap-macro", "ap-env"],
    alsoCovers: "Every AP course, taught by the people who write the exam",
    checked: "2026-09-05",
  },
  {
    name: "Jacob Clifford",
    handle: "JacobAClifford",
    who: "Jacob Clifford, an AP economics teacher and co-host of Crash Course Economics",
    covers: ["ap-macro"],
    alsoCovers: "AP Microeconomics and introductory economics",
    checked: "2026-10-25",
  },
  {
    name: "ReviewEcon",
    handle: "ReviewEcon",
    who: "Jacob Reed, an AP economics teacher who publishes complete CED unit summaries",
    covers: ["ap-macro"],
    alsoCovers: "AP Microeconomics games, graphs, and FRQ practice",
    checked: "2026-10-25",
  },
  {
    name: "Jordan Dischinger-Smedes",
    handle: "Mr.Smedes",
    who: "Jordan Dischinger-Smedes, an AP Environmental Science teacher behind the APES Ultimate Review Packet",
    covers: ["ap-env"],
    alsoCovers: "APES exam strategy, FRQ practice, and study planning",
    checked: "2026-10-26",
  },
  {
    name: "Science Panda",
    handle: "SciencePanda",
    who: "Ms. Panda, an AP Environmental Science teacher with full unit review videos",
    covers: ["ap-env"],
    alsoCovers: "General environmental science explainers",
    checked: "2026-10-26",
  },
];

export function channelsFor(slug: SubjectSlug): Channel[] {
  return channels.filter((channel) => channel.covers.includes(slug));
}

export function channelUrl(channel: Channel): string {
  return `https://www.youtube.com/@${channel.handle}`;
}

/**
 * Search inside one channel. YouTube honours this URL shape, which means the
 * link keeps working even when the channel reorganises its playlists.
 */
export function channelSearchUrl(channel: Channel, query: string): string {
  return `https://www.youtube.com/@${channel.handle}/search?query=${encodeURIComponent(query)}`;
}

export function youTubeSearchUrl(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}
