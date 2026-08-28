import type { Audience, Programme } from "@/lib/types";

/**
 * How people work with Kinetic Edge. No prices are published — none are verified.
 */
export const programmes: Programme[] = [
  {
    code: "P/01",
    title: "General Population Fitness Training",
    description:
      "Structured training for people who are not competing, built and progressed with the same process used with athletes.",
    formats: [
      "Personal Training",
      "Hybrid Personal Training",
      "Semi-Personal Training",
      "Online Coaching",
    ],
    accent: "performance",
  },
  {
    code: "P/02",
    title: "High Performance Athlete Training",
    description:
      "Physical preparation for competitive sport — delivered individually, in small groups, or remotely for athletes based elsewhere.",
    formats: [
      "1:1",
      "1:3",
      "Group 1:5",
      "Long-Term Athletic Development — Youth",
      "Online Coaching",
      "Distance Coaching",
    ],
    accent: "performance",
  },
  {
    code: "P/03",
    title: "Clinical & Support Services",
    description:
      "The clinical and support side of the system — assessment, treatment, rehabilitation and the specialist input around it.",
    formats: [
      "Physiotherapy & Rehabilitation",
      "Nutrition Consultation",
      "Sport Psychology Consultation",
      "Performance Testing & Re-testing",
    ],
    accent: "rehab",
  },
];

/** Who trains at Kinetic Edge. Presented as a visual index, not descriptive cards. */
export const audiences: Audience[] = [
  { code: "A/01", label: "Elite & Professional Athletes" },
  { code: "A/02", label: "Competitive Athletes" },
  { code: "A/03", label: "Developing Athletes" },
  { code: "A/04", label: "Recreational Athletes" },
  { code: "A/05", label: "General Population" },
  { code: "A/06", label: "Special Population" },
];
