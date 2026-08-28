import type { AthleteResult } from "@/lib/types";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  VERIFIED ATHLETE COMPETITION RESULTS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  ⚠  THIS FILE IS INTENTIONALLY EMPTY.
 *
 *  21 verified athlete results exist for Kinetic Edge but were not available to
 *  this build. Nothing has been invented to fill the gap, and no result has been
 *  carried across from the previous site: several of the old alt tags credited
 *  one athlete with another athlete's result.
 *
 *  TO POPULATE
 *  Add one object per verified result to the array below. Everything downstream
 *  — the homepage results section, the /athletes page, sport filters, featured
 *  cards and the results count in navigation — reads from this array and starts
 *  rendering as soon as it is filled. No component changes are required.
 *
 *  EXAMPLE SHAPE (replace entirely with verified data):
 *
 *    {
 *      id: "unique-slug",             // stable key, e.g. "surname-competition-year"
 *      athleteName: "Full Name",      // exactly as verified
 *      sport: "Badminton",            // drives the sport filter
 *      competition: "Tamil Nadu State Ranking",
 *      category: "U-17 Boys Singles", // optional
 *      result: "Winner",              // e.g. "Winner", "Runner-Up", "Bronze", "Quarter-Finalist"
 *      year: "2025",                  // optional
 *      image: "/images/athletes/name-competition.webp", // optional
 *      featured: true,                // optional — promotes to a large editorial card
 *    }
 *
 *  RULES
 *  • Never aggregate these into medal totals, athlete counts or success rates.
 *  • Alt text is generated from the verified fields on this object — never write
 *    it by hand and never reuse alt text from the previous site.
 *  • If a field is not verified, omit it. Do not guess a year or a category.
 */
export const athleteResults: AthleteResult[] = [];

/** True once verified results are supplied — results sections hide until then. */
export const hasAthleteResults = athleteResults.length > 0;

/** Distinct sports present in the data, used to build the filter row. */
export const athleteSports = Array.from(
  new Set(athleteResults.map((result) => result.sport)),
).sort();

export const featuredResults = athleteResults.filter((result) => result.featured);

/** Results not promoted to the editorial cards, in supplied order. */
export const gridResults = athleteResults.filter((result) => !result.featured);

/**
 * Alt text is derived, never authored per-image. This guarantees an athlete can
 * never be described with another athlete's result.
 */
export function resultAlt(result: AthleteResult): string {
  const parts = [result.athleteName, result.sport, result.competition];
  if (result.category) parts.push(result.category);
  parts.push(result.result);
  if (result.year) parts.push(result.year);
  return parts.join(" — ");
}
