import type { TeamMember, TeamGroup } from "@/lib/types";

/**
 * VERIFIED NAMES AND ROLES ONLY.
 *
 * Titles and departments follow the client content document, which supersedes
 * the earlier role wording on the site.
 *
 * ⚠ UNFILLED ROLES
 * The content document lists five positions with no name against them:
 *
 *   Sports Medicine Physician · Associate Physiotherapist ·
 *   Consultant Psychologist · Recovery Therapist · Admin
 *
 * They are recorded in `unfilledRoles` below but are NOT rendered. Publishing a
 * role with an empty name would either read as an error or invite the reader to
 * assume a person exists. Add them here as they are confirmed.
 *
 * No credentials, qualifications, registration numbers or years of experience
 * are verified for anyone, so none are stored or rendered.
 *
 * Photographs: leave `image` undefined until a real photograph exists — the card
 * falls back to an initials placeholder. Never substitute a stock or generated
 * portrait for a real person. The six supplied portraits were normalised from
 * the original camera files so the grid reads as one set.
 */
export const team: TeamMember[] = [
  // ── Leadership ──────────────────────────────────────────────────────────
  {
    name: "K. Deepak",
    role: "Founder & Managing Director",
    group: "Leadership",
    image: "/images/team/deepak.webp",
  },
  {
    name: "Lakshmi Priyanka Subramanian S",
    role: "Co-Founder",
    group: "Leadership",
    image: "/images/team/lakshmi-priyanka-subramanian.webp",
  },
  {
    name: "Subramanian",
    role: "Executive Director",
    group: "Leadership",
  },

  // ── Sport Science ───────────────────────────────────────────────────────
  {
    name: "T. Atchaya",
    role: "Head — Sport Science",
    group: "Sport Science",
    image: "/images/team/atchaya-t.webp",
  },

  // ── Strength & Conditioning ─────────────────────────────────────────────
  {
    name: "K. Sanjay",
    role: "Head — Strength & Conditioning",
    group: "Strength & Conditioning",
    image: "/images/team/sanjay-k.webp",
  },
  {
    name: "Viswabujithan",
    role: "Senior — Strength & Conditioning Coach",
    group: "Strength & Conditioning",
  },
  {
    name: "Vinoth",
    role: "Associate — Strength & Conditioning Coach",
    group: "Strength & Conditioning",
    image: "/images/team/vinoth.webp",
  },
  {
    name: "Anand",
    role: "Associate — Strength & Conditioning Coach",
    group: "Strength & Conditioning",
    image: "/images/team/anand.webp",
  },
  {
    name: "Vignesh",
    role: "Associate — Strength & Conditioning Coach",
    group: "Strength & Conditioning",
  },

  // ── Physiotherapy ───────────────────────────────────────────────────────
  {
    name: "Karthik Baskaran",
    role: "Head Physiotherapist",
    group: "Physiotherapy",
  },

  // ── Nutrition ───────────────────────────────────────────────────────────
  {
    name: "Jayaveena",
    role: "Consultant Nutritionist",
    group: "Nutrition",
  },

  // ── Operations ──────────────────────────────────────────────────────────
  {
    name: "Akkash Raj",
    role: "Social Media Manager",
    group: "Operations",
  },
];

/**
 * Disciplines the content document names but has not yet staffed. Kept here so
 * the gap is visible to whoever fills it — never rendered on the site.
 */
export const unfilledRoles = [
  { role: "Sports Medicine Physician", group: "Physiotherapy" },
  { role: "Associate Physiotherapist", group: "Physiotherapy" },
  { role: "Consultant Psychologist", group: "Psychology & Recovery" },
  { role: "Recovery Therapist", group: "Psychology & Recovery" },
  { role: "Admin", group: "Operations" },
] as const;

export const teamGroups: TeamGroup[] = [
  "Leadership",
  "Sport Science",
  "Strength & Conditioning",
  "Physiotherapy",
  "Nutrition",
  "Psychology & Recovery",
  "Operations",
];

/** Only groups that actually have named people in them. */
export const teamByGroup = teamGroups
  .map((group) => ({
    group,
    members: team.filter((member) => member.group === group),
  }))
  .filter((band) => band.members.length > 0);
