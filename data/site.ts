import type { NavItem } from "@/lib/types";

/**
 * VERIFIED BUSINESS DATA ONLY.
 *
 * Do not add an email address, ratings, review counts, prices or award data to
 * this file. Where a value is not confirmed it is absent by design, and the UI is
 * built to render correctly without it.
 *
 * Centre 02's address WAS supplied by the client on 28 Aug 2026 and is now
 * published — see `rehab` below. Its hours and any separate phone number are
 * still unverified and remain absent.
 */

const PHONE_E164 = "+917010053659";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://kinetic-edge-one.vercel.app");

export const site = {
  legalName: "Kinetic Edge High Performance Centre",
  name: "Kinetic Edge",
  /** Primary positioning, per the client content document. */
  tagline: "Optimising Human Performance.",
  /** Used where a second line is needed alongside the tagline. */
  taglineSupport: "In person. Online. Anywhere.",
  founded: "2020",
  description:
    "An integrated human performance ecosystem in Chennai — strength & conditioning, physiotherapy & rehabilitation, sport nutrition, sport psychology and recovery.",

  /**
   * Deployed origin — drives every canonical URL, the sitemap, Open Graph and
   * the schema.org @id, so it must match what the site is actually served from.
   *
   * Resolution order:
   *   1. NEXT_PUBLIC_SITE_URL — set this once the real domain is live.
   *   2. VERCEL_PROJECT_PRODUCTION_URL — set automatically by Vercel, so a
   *      fresh deployment gets correct URLs with no configuration at all.
   *   3. The literal below, as a local-development fallback.
   */
  url: SITE_URL,

  phone: {
    display: "+91 70100 53659",
    e164: PHONE_E164,
    href: "tel:" + PHONE_E164,
  },

  whatsapp: {
    display: "+91 70100 53659",
    /** wa.me expects the number without the leading plus. */
    href: "https://wa.me/" + PHONE_E164.replace("+", ""),
  },

  /** Centre 01. Kept as `address` so existing call sites and the schema.org
   *  LocalBusiness entry are unaffected. */
  address: {
    street: "253, Justice Rathinavel Pandian Road",
    locality: "Golden George Nagar, Mogappair East",
    city: "Chennai",
    region: "Tamil Nadu",
    postalCode: "600107",
    country: "India",
    countryCode: "IN",
    full: "253, Justice Rathinavel Pandian Road, Golden George Nagar, Mogappair East, Chennai, Tamil Nadu 600107, India",
    short: "Mogappair East · Chennai",
  },

  geo: {
    latitude: 13.0827,
    longitude: 80.1929,
  },

  /**
   * Centre 02 — the rehabilitation centre.
   *
   * Supplied by the client on 28 Aug 2026 via a Google Maps share link, which
   * reverses the earlier rule that Centre 02 had no location. Address taken from
   * that link with an unverified "A, Pagadala" prefix removed at the client's
   * direction.
   *
   * Deliberately absent: separate opening hours and a separate telephone number.
   * Neither has been verified for this address, so neither is published — the
   * hours shown on the site remain the ones verified for Centre 01.
   */
  rehab: {
    name: "Kinetic Edge Fitness & Rehabilitation Centre",
    street: "No. 18, Rangaswamy Street",
    locality: "Golden George Nagar, Nerkundram",
    city: "Chennai",
    region: "Tamil Nadu",
    postalCode: "600107",
    country: "India",
    countryCode: "IN",
    full: "No. 18, Rangaswamy Street, Golden George Nagar, Nerkundram, Chennai, Tamil Nadu 600107, India",
    short: "Nerkundram · Chennai",
    maps: "https://maps.app.goo.gl/VFyJskUubidjYmc4A",
  },

  hours: [
    { days: "Monday — Saturday", time: "06:00 — 21:30" },
    { days: "Sunday", time: "07:00 — 12:00" },
  ],

  /** schema.org openingHoursSpecification source data. */
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "06:00",
      closes: "21:30",
    },
    { days: ["Sunday"], opens: "07:00", closes: "12:00" },
  ],

  areasServed: [
    "Chennai",
    "Mogappair East",
    "Anna Nagar",
    "Ambattur",
    "Padi",
    "Nolambur",
  ],

  links: {
    maps: "https://maps.app.goo.gl/my8JoC9uWXiJU3BY8",
    instagram: "https://www.instagram.com/kinetic.edge_sportscience",
    linkedin:
      "https://www.linkedin.com/in/kinetic-edge-high-performance-and-fitness-centre-3562752a2",
    youtube: "https://youtube.com/@kineticedgehpc",
  },
} as const;

export const socialLinks = [
  { label: "Instagram", href: site.links.instagram },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "YouTube", href: site.links.youtube },
] as const;

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Strength & Conditioning",
        href: "/services/strength-conditioning",
        description: "Build the physical qualities your sport demands.",
        accent: "performance",
      },
      {
        label: "Athlete Development",
        href: "/services/athlete-development",
        description: "Long-term physical preparation, not one-off workouts.",
        accent: "performance",
      },
      {
        label: "Performance Testing",
        href: "/services/performance-testing",
        description: "Measure, understand and progress physical qualities.",
        accent: "performance",
      },
      {
        label: "Sports Physiotherapy",
        href: "/services/sports-physiotherapy",
        description: "Assessment and treatment with the demands of sport in mind.",
        accent: "rehab",
      },
      {
        label: "Sports Rehabilitation",
        href: "/services/sports-rehabilitation",
        description: "Progressive rehabilitation through to return to sport.",
        accent: "rehab",
      },
      {
        label: "Distance & Online Coaching",
        href: "/services/online-coaching",
        description: "Structured coaching beyond the facility.",
        accent: "performance",
      },
    ],
  },
  { label: "Programmes", href: "/programmes" },
  { label: "Athletes", href: "/athletes" },
  { label: "KE Education", href: "/education" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Programmes", href: "/programmes" },
  { label: "Athletes", href: "/athletes" },
  { label: "KE Education", href: "/education" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
] as const;

export const primaryCta = {
  label: "Book an Assessment",
  href: "/contact",
} as const;
