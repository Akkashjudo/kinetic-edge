import type { CollaborationEvent } from "@/lib/types";

/**
 * COLLABORATIONS & EVENTS — 2023 to 2025
 *
 * Camps, workshops, assessments and representations Kinetic Edge has delivered.
 * Every entry is quoted from the client content document. No attendance figures,
 * outcomes or feedback are recorded, because none were supplied.
 *
 * NOTE ON ONE DATE: the source lists the Kumaraguru National Conclave under the
 * 2023 heading but dates it March 2024. It is filed here under its stated date.
 * Confirm with the client if the heading was the correct one.
 */
export const collaborations: CollaborationEvent[] = [
  // ── 2025 ────────────────────────────────────────────────────────────────
  {
    year: "2025",
    title: "Physical Assessment for P.Ed Staff, DAV group of Schools",
    withWhom: "DAV Krida Kendram",
    date: "June 2025",
    kind: "Assessment",
  },
  {
    year: "2025",
    title: "ZENKIDS Summer Camp",
    date: "May 2025",
    kind: "Camp",
  },
  {
    year: "2025",
    title: "Women's Day Workshop",
    withWhom: "SES Network",
    date: "March 2025",
    kind: "Workshop",
  },
  {
    year: "2025",
    title: "Introduction to Powerlifting Workshop",
    withWhom: "SES Network",
    date: "February 2025",
    kind: "Workshop",
  },
  {
    year: "2025",
    title:
      "High Performance Athletic Camp, Sri Gnanandha Matriculation Higher Secondary School, Thirukoilur",
    kind: "Camp",
  },

  // ── 2024 ────────────────────────────────────────────────────────────────
  {
    year: "2024",
    title: "Workshop — SBD for High Performance",
    date: "December 2024",
    kind: "Workshop",
  },
  {
    year: "2024",
    title: "High Performance Athletic Camp",
    withWhom: "DAV group of Schools — KRIDA KENDRAM",
    date: "April 2024",
    kind: "Camp",
  },
  {
    year: "2024",
    title:
      "Founders represented Kinetic Edge at the National Conclave on Sports Science, Kumaraguru College of Liberal Arts and Science",
    date: "March 2024",
    kind: "Representation",
  },

  // ── 2023 ────────────────────────────────────────────────────────────────
  {
    year: "2023",
    title: "Workshop — Speed Science: Master the Art of Sprinting",
    date: "October 2023",
    kind: "Workshop",
  },
  {
    year: "2023",
    title: "Youth Fitness Summer Camp — Long Term Athletic Development",
    date: "April–May 2023",
    kind: "Camp",
  },
];

/** Groups events newest-first by year, for the timeline. */
export function byYear(events: CollaborationEvent[]) {
  return Array.from(new Set(events.map((event) => event.year))).map((year) => ({
    year,
    events: events.filter((event) => event.year === year),
  }));
}

/**
 * KE Education splits the record in two, so nothing is listed twice:
 * workshops sit under Workshops, and everything else — camps, assessments and
 * representations — under Collaborations.
 */
export const pastWorkshops = collaborations.filter(
  (event) => event.kind === "Workshop",
);

export const otherCollaborations = collaborations.filter(
  (event) => event.kind !== "Workshop",
);
