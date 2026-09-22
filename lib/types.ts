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
  /** Shorter name for the navigation, where the full title would wrap. */
  navLabel: string;
  /**
   * The homepage service card answers three questions in order — what it is,
   * who it is for, and what it works toward — then lists its focus areas.
   * `goal` describes the aim of the service, never a promised outcome.
   */
  what: string;
  audience: string;
  goal: string;
  focus: string[];
  /** Card call to action, e.g. "Explore Strength & Conditioning". */
  exploreLabel: string;
  headline: string;
  intro: string;
  /** Capability blocks rendered as the numbered body of a service page. */
  blocks: { title: string; body: string }[];
  imageKey: ImageKey;
  metaTitle: string;
  metaDescription: string;
}

export interface Centre {
  id: "01" | "02";
  code: string;
  /** Short name used as the card heading. */
  name: string;
  /** The name on the signage / Google Maps listing. */
  fullName: string;
  accent: Accent;
  description: string;
  /** Main services and facilities, shown on the centre card. */
  highlights: string[];
  /** Street line and area, from the verified address. */
  street: string;
  area: string;
  /** Google Maps listing — the "View Centre" destination. */
  maps: string;
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
  /**
   * One short line of expertise. Only ever set from a verified statement in the
   * client content — never written to fill the card. Absent for most people.
   */
  expertise?: string;
  /** Optional — no photograph is invented for anyone. */
  image?: string;
}

/**
 * An athlete who represents Kinetic Edge. Cards show the name, sport and one
 * headline achievement; the detail view carries the rest.
 */
export interface Ambassador {
  slug: string;
  name: string;
  sport: string;
  /** The single achievement shown on the card. Verified only. */
  achievement: string;
  credentials: string[];
  role: string;
  /** Section headline for the profile. Not presented as the athlete's quote. */
  statement: string;
  body: string[];
  closing: string;
  /** Null until an approved quote exists. Never paraphrased or invented. */
  testimonial: { quote: string; attribution: string } | null;
  images: {
    /** Clean frame with no baked-in typography — cards and small screens. */
    card: { src: string; width: number; height: number; position?: string };
    /** Designed key art, shown in the profile from `sm` up. */
    poster?: { src: string; width: number; height: number };
  };
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
  /** The service this visitor should look at first. */
  href: string;
  linkLabel: string;
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
