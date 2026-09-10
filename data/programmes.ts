import type { Audience, Programme } from "@/lib/types";

/**
 * THE FIVE PROGRAMMES
 *
 * Every specification below is quoted from the client content document. Where a
 * programme does not state a value — session duration for Distance Coaching,
 * for instance — the field is simply absent and the comparison renders a dash
 * rather than an assumption.
 *
 * NO PRICING. None has been supplied, and none may be inferred.
 */
export const programmes: Programme[] = [
  {
    slug: "group-high-performance",
    code: "01",
    title: "Group High Performance",
    audience: "Athletes training alongside a squad",
    description:
      "Sport-specific programming delivered in a training group, with progressions and regressions adjusted to each athlete inside the session.",
    specs: {
      frequency: "4 sessions / week",
      duration: "60–75 min",
      ratio: "Up to 10 athletes per batch",
      individualisation: "Individual progressions & regressions",
    },
    inclusions: [
      "Sports specific program",
      "Individual progressions & regressions modified as per needs",
    ],
    accent: "performance",
  },
  {
    slug: "hybrid-high-performance",
    code: "02",
    title: "Hybrid High Performance",
    audience: "Competing athletes who need individual programming",
    description:
      "A small-group format with a programme written for the individual, sport-science technology in the session, and support that continues while the athlete is away competing.",
    specs: {
      frequency: "4 sessions / week",
      duration: "Up to 90 min",
      ratio: "Up to 3 athletes per batch",
      individualisation: "Individual specific, tailor-made programs",
    },
    inclusions: [
      "Individual specific, tailor-made programs",
      "Tournament follow-ups & online support during tour travel",
      "Sport science tech incorporation",
      "Percussion Therapy",
      "1 × Compression boots",
    ],
    accent: "performance",
  },
  {
    slug: "high-performance-pro",
    code: "03",
    title: "High Performance PRO",
    audience: "Athletes requiring one-to-one preparation",
    description:
      "One-to-one personal training with a fully individualised programme, sport-science technology, and virtual training that travels with the athlete through the competitive season.",
    specs: {
      frequency: "4 sessions / week",
      duration: "Up to 90 min",
      ratio: "1:1 Personal Training",
      individualisation: "Individual specific, tailor-made programs",
    },
    inclusions: [
      "Individual specific, tailor-made programs",
      "Tournament follow-ups & virtual training during tour travel",
      "Sports science tech incorporation",
      "Percussion Therapy",
      "3 × Compression boots",
    ],
    accent: "performance",
  },
  {
    slug: "online-coaching",
    code: "04",
    title: "Online Coaching",
    audience: "Athletes and clients training from anywhere",
    description:
      "Coached one-to-one sessions delivered online, built on an individualised sport-specific programme with conditioning work alongside it.",
    specs: {
      frequency: "Weekly 3 sessions",
      duration: "60 min",
      ratio: "1:1 sessions",
      individualisation: "Individualised, sports specific program",
    },
    inclusions: [
      "Individualised, sports specific Program",
      "2 days Cardio Program",
    ],
    remote: true,
    accent: "performance",
  },
  {
    slug: "distance-coaching",
    code: "05",
    title: "Distance Coaching",
    audience: "Athletes training in their own environment",
    description:
      "A written individualised programme with a scheduled review call and day-to-day coaching access, for athletes who train independently.",
    specs: {
      individualisation: "Individualised, sports specific program",
    },
    inclusions: [
      "Individualised, sports specific Program",
      "Weekly once review call",
      "WhatsApp assistance (6am–10pm IST)",
    ],
    remote: true,
    accent: "performance",
  },
];

export const getProgramme = (slug: string) =>
  programmes.find((programme) => programme.slug === slug);

/**
 * WHO KINETIC EDGE WORKS WITH
 *
 * Performance is not only for elite athletes — this is the point the content
 * document makes first, and it drives the whole positioning.
 */
export const audiences: Audience[] = [
  {
    code: "01",
    label: "Athletes",
    description:
      "Competing athletes preparing for the physical demands of their sport.",
    icon: "trophy",
  },
  {
    code: "02",
    label: "Youth Athletes",
    description:
      "Long-term athletic development, built around training age and stage rather than a scaled-down adult programme.",
    icon: "sprout",
  },
  {
    code: "03",
    label: "General Fitness",
    description:
      "Strength, conditioning and movement for people training for their own goals and everyday capacity.",
    icon: "users",
  },
  {
    code: "04",
    label: "Return from Injury",
    description:
      "Structured rehabilitation through to return to training, sport and performance.",
    icon: "activity",
  },
  {
    code: "05",
    label: "Online / Distance",
    description:
      "Athletes and clients coached remotely, wherever they train.",
    icon: "globe",
  },
];
