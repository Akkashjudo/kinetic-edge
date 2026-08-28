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

export interface Programme {
  code: string;
  title: string;
  description: string;
  formats: string[];
  accent: Accent;
}

export type TeamGroup =
  | "Leadership"
  | "Sport Science & Coaching"
  | "Clinical & Support";

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
