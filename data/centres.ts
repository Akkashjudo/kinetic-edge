import type { Centre } from "@/lib/types";
import { site } from "./site";

/**
 * THE TWO CENTRES
 *
 * Addresses come from data/site.ts, where they are verified — Centre 02's was
 * supplied by the client on 28 Aug 2026 with a Google Maps link. Nothing about
 * either location (hours, parking, size, equipment counts) is added here that
 * has not been supplied.
 *
 * `highlights` name what happens at each centre. Centre 02's signage lists
 * strength and cardiovascular training alongside physiotherapy, which is why it
 * carries a fitness line as well as its clinical ones.
 */
export const centres: Centre[] = [
  {
    id: "01",
    code: "Centre 01",
    name: "High Performance Centre",
    fullName: "Kinetic Edge High Performance & Fitness Centre",
    accent: "performance",
    description:
      "The training environment — where physical qualities are assessed, trained and re-tested against the demands of the sport.",
    highlights: [
      "Strength & Conditioning",
      "Athlete Performance Training",
      "Performance Testing",
      "Youth Athletic Development",
      "General Fitness",
    ],
    street: site.address.street,
    area: site.address.short,
    maps: site.links.maps,
    imageKey: "performanceCentre",
  },
  {
    id: "02",
    code: "Centre 02",
    name: "Rehabilitation Centre",
    fullName: site.rehab.name,
    accent: "rehab",
    description:
      "The clinical environment — assessment, treatment and progressive rehabilitation through to a return to training and sport.",
    highlights: [
      "Physiotherapy",
      "Sports Injury Rehabilitation",
      "Post-operative Rehabilitation",
      "Return-to-Sport Training",
      "Strength & Fitness Training",
    ],
    street: site.rehab.street,
    area: site.rehab.short,
    maps: site.rehab.maps,
    imageKey: "rehabCentre",
  },
];
