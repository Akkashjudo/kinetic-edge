/**
 * ATHLETE AMBASSADOR
 *
 * ⚠ THE TESTIMONIAL IS DELIBERATELY NULL.
 *
 * The client content document carries a bracketed placeholder where Sankar's
 * quote will go — "[Insert Sankar's testimonial here …]". That is not content,
 * and inventing a quote and attributing it to a real, named international
 * athlete would be the single worst thing this site could do.
 *
 * `testimonial` stays null until an approved quote is supplied. The component
 * renders no quote block at all while it is null — it does not show an empty
 * frame, a "coming soon", or a paraphrase.
 *
 * TO PUBLISH ONE
 *   testimonial: { quote: "…", attribution: "Sankar Muthusamy" }
 *
 * No ranking, result, statistic or date beyond the two verified credentials
 * below may be added here.
 */
export interface Ambassador {
  name: string;
  credentials: string[];
  role: string;
  /** The section's headline — his words about preparation, not a claim. */
  statement: string;
  body: string[];
  closing: string;
  testimonial: { quote: string; attribution: string } | null;
  images: {
    /** The supplied composite poster, used whole at native resolution. */
    poster: string;
    /** Clean crop with no baked-in typography, for the editorial frame. */
    action: string;
  };
}

export const ambassador: Ambassador = {
  name: "Sankar Muthusamy",
  credentials: ["International Badminton Player", "Former World Junior No. 1"],
  role: "Kinetic Edge Athlete Ambassador",
  statement: "Performance is not built on the court alone.",
  body: [
    "For international badminton player Sankar Muthusamy, preparation goes beyond skill and competition. It is about building the strength, speed, movement, resilience and consistency required to perform at the highest level.",
    "At Kinetic Edge, we are proud to be part of that journey — working with Sankar to support his physical preparation and performance through an individualised, evidence-informed approach.",
  ],
  closing: "Train. Prepare. Perform. Repeat.",
  testimonial: null,
  images: {
    poster: "/images/athletes/sankar-poster.webp",
    action: "/images/athletes/sankar-action.webp",
  },
};
