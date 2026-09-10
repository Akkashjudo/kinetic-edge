/**
 * Shared content types for the Kinetic Edge site.
 *
 * CONTENT RULE: every value rendered from these structures must be verified.
 * Optional fields exist so unverified data can simply be omitted rather than
 * filled with placeholder facts.
 */

import type { siteImages } from "@/data/images";

export type ImageKey = keyof typeof siteImages;

export type Accent = "performance" | "rehab";

export interface NavLink {
  label: string;
  href: string;
  /** Short descriptor used in the services dropdown / mobile accordion. */
  description?: string;
  accent?: Accent;
}

export interface NavItem extends NavLink {
  children?: NavLink[];
}

export interface ServiceSummary {
  slug: string;
  title: string;
  href: string;
  accent: Accent;
  /** One-line summary used on cards and in navigation. */
  summary: string;
}

export interface ServiceDetail extends ServiceSummary {
  label: string;
  headline: string;
  intro: string;
  /** Capability blocks rendered as the numbered body of a service page. */
  blocks: { title: string; body: string }[];
  cta: { label: string; href: string };
  imageKey: ImageKey;
  metaTitle: string;
  metaDescription: string;
}

export interface Centre {
  id: "01" | "02";
  code: string;
  name: string;
  accent: Accent;
  headline: string;
  description: string;
  /** Short list shown on the homepage panel. */
  highlights: string[];
  /** Full list shown on the services page. */
  services: string[];
  href: string;
  imageKey: ImageKey;
}

export interface MethodStep {
  index: string;
  title: string;
  body: string;
}

/**
 * A Kinetic Edge programme. Specifications are quoted from the client content
 * document; anything not stated there — pricing above all — stays absent.
 */
export interface Programme {
  slug: string;
  code: string;
  title: string;
  /** Who the programme is for, in one line. */
  audience: string;
  description: string;
  /** Comparison specs. Only fields actually stated for a programme are set. */
  specs: {
    frequency?: string;
    duration?: string;
    ratio?: string;
    individualisation?: string;
  };
  /** Everything included, as supplied. */
  inclusions: string[];
  /** Marks the programme as delivered remotely. */
  remote?: boolean;
  accent: Accent;
}

/**
 * One of the six pillars of the Kinetic Edge performance system:
 * ASSESS → TRAIN → RESTORE → FUEL → PERFORM → RECOVER.
 */
export interface Pillar {
  slug: string;
  /** ASSESS, TRAIN, … — the pillar verb. */
  code: string;
  /** The discipline that delivers it. */
  title: string;
  summary: string;
  /** Full service list, as supplied. */
  services: string[];
  /** Optional sub-groups where the discipline splits (e.g. TRAIN). */
  groups?: { title: string; services: string[] }[];
  accent: Accent;
  icon: string;
  href?: string;
}

/** A camp, workshop, assessment or collaboration Kinetic Edge has delivered. */
export interface CollaborationEvent {
  year: string;
  title: string;
  /** Partner organisation, where one is named. */
  withWhom?: string;
  /** Month and year as stated, where stated. */
  date?: string;
  kind: "Camp" | "Workshop" | "Assessment" | "Representation";
}

export type TeamGroup =
  | "Leadership"
  | "Sport Science"
  | "Strength & Conditioning"
  | "Physiotherapy"
  | "Nutrition"
  | "Psychology & Recovery"
  | "Operations";

export interface TeamMember {
  name: string;
  role: string;
  group: TeamGroup;
  /** Optional — no photograph is invented for anyone. */
  image?: string;
}

/**
 * A verified competition result for a Kinetic Edge athlete.
 * These must never be aggregated into medal totals or athlete counts.
 */
export interface AthleteResult {
  id: string;
  athleteName: string;
  sport: string;
  competition: string;
  category?: string;
  result: string;
  year?: string;
  image?: string;
  /** Promotes a result to the larger editorial cards. */
  featured?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Audience {
  code: string;
  label: string;
  description: string;
  icon: string;
}

export interface StoryChapter {
  year: string;
  title: string;
  body: string;
}

export interface EducationEvent {
  slug: string;
  title: string;
  subtitle: string;
  status: "past" | "upcoming";
  date: string;
  /** ISO date, used for the <time dateTime> attribute only. */
  isoDate: string;
  time: string;
  venue: string;
  instructor: string;
  partner?: string;
  topics: string[];
}
