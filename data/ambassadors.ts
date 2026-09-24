import type { Ambassador } from "@/lib/types";

/**
 * ATHLETE AMBASSADORS
 *
 * The section renders one card per entry, so a second ambassador is added here
 * and appears on the homepage and /athletes with no component changes.
 *
 * ⚠ THE ARTWORK IS SHOWN WHOLE. The client asked on 25 Sep 2026 for the full
 * supplied photograph to be visible — no crop of his head, body, racket, hands
 * or legs, at any breakpoint. The section renders it at its own aspect ratio
 * with `object-contain`. Do not switch it to a cropped card frame.
 *
 * ⚠ NO BOOKING, CONSULTATION OR PROFILE CALL TO ACTION. The section states that
 * he represents Kinetic Edge; he is not offering appointments. The "View
 * profile" control was removed on 25 Sep 2026 and must not be replaced.
 *
 * ⚠ THE TESTIMONIAL IS DELIBERATELY NULL.
 *
 * The client content document carries a bracketed placeholder where Sankar's
 * quote will go — "[Insert Sankar's testimonial here …]". That is not content,
 * and inventing a quote and attributing it to a real, named international
 * athlete would be the single worst thing this site could do.
 *
 * `testimonial` stays null until an approved quote is supplied, and nothing
 * renders in its place — no empty frame, no "coming soon", no paraphrase. For
 * the same reason `statement` is set as a headline, never inside quotation
 * marks: it is the section's line, not his.
 *
 *   TO PUBLISH ONE   testimonial: { quote: "…", attribution: "Sankar Muthusamy" }
 *
 * No ranking, result, statistic or date beyond the verified credentials below
 * may be added.
 */
export const ambassadors: Ambassador[] = [
  {
    slug: "sankar-muthusamy",
    name: "Sankar Muthusamy",
    sport: "Badminton",
    achievement: "Former World Junior No. 1",
    credentials: ["International Badminton Player", "Former World Junior No. 1"],
    role: "Kinetic Edge Athlete Ambassador",
    statement: "Performance is not built on the court alone.",
    body: [
      "For international badminton player Sankar Muthusamy, preparation goes beyond skill and competition. It is about building the strength, speed, movement, resilience and consistency required to perform at the highest level.",
      "At Kinetic Edge, we are proud to be part of that journey — working with Sankar to support his physical preparation and performance through an individualised, evidence-informed approach.",
    ],
    closing: "Train. Prepare. Perform. Repeat.",
    testimonial: null,
    poster: {
      src: "/images/athletes/sankar-poster.webp",
      width: 1536,
      height: 1024,
    },
  },
];
