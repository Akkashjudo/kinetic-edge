import type { Centre } from "@/lib/types";

/**
 * The two-environment model.
 *
 * Centre 02 has no address supplied and must never be placed on a map or given
 * a location anywhere in the UI.
 */
export const centres: Centre[] = [
  {
    id: "01",
    code: "CENTRE 01",
    name: "Performance",
    accent: "performance",
    headline: "The training environment.",
    description:
      "Built for athletic development — where physical qualities are tested, trained and progressed against the demands of the sport.",
    highlights: [
      "Strength & Conditioning",
      "Athlete Development",
      "Performance Testing",
      "Sports-Specific Conditioning",
      "Distance & Online Coaching",
    ],
    services: [
      "Strength & Conditioning",
      "Athletic Development",
      "Speed & Acceleration",
      "Strength & Power",
      "Agility & Change of Direction",
      "Conditioning",
      "Performance Testing",
      "Sports-Specific Preparation",
      "Injury Prevention",
      "Long-Term Athlete Development",
    ],
    href: "/services/strength-conditioning",
    imageKey: "performanceCentre",
  },
  {
    id: "02",
    code: "CENTRE 02",
    name: "Rehabilitation",
    accent: "rehab",
    headline: "The clinical environment.",
    description:
      "Built for assessment, treatment and progressive rehabilitation — through to a criteria-based return to full training and competition.",
    highlights: [
      "Sports Physiotherapy",
      "Sports Rehabilitation",
      "Return to Sport",
      "Injury Prevention",
      "Mobility & Recovery",
    ],
    services: [
      "Sports Physiotherapy",
      "Injury Assessment",
      "Sports Rehabilitation",
      "Pain Management",
      "Mobility Restoration",
      "Return-to-Sport Rehabilitation",
      "Post-operative Rehabilitation",
      "Movement Correction",
      "Recovery",
      "Injury Prevention",
    ],
    href: "/services/sports-physiotherapy",
    imageKey: "rehabCentre",
  },
];
