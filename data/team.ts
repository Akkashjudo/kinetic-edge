import type { TeamMember, TeamGroup } from "@/lib/types";

/**
 * VERIFIED NAMES AND ROLES ONLY.
 *
 * No credentials, qualifications, registration numbers, years of experience or
 * biographies are verified for any member of this team — so none are stored or
 * rendered. Add a `bio` field only when real copy is supplied.
 *
 * Photographs: leave `image` undefined until a real photograph exists. The card
 * renders a branded monogram placeholder in the meantime. Never substitute a
 * stock or generated portrait for a real person.
 *
 * The five supplied portraits were normalised from the original camera files so
 * the grid reads as one set: each is cropped 4:5 around the detected face, with
 * the face at the same point in the frame and the same apparent size. Anyone
 * without a photograph keeps the initials placeholder.
 */
export const team: TeamMember[] = [
  {
    name: "Deepak",
    role: "Founder · Head of Strength & Conditioning",
    group: "Leadership",
    image: "/images/team/deepak.webp",
  },
  {
    name: "Lakshmi Priyanka Subramanian",
    role: "Co-Founder · Mental Performance Coach",
    group: "Leadership",
    image: "/images/team/lakshmi-priyanka-subramanian.webp",
  },
  {
    name: "Atchaya T.",
    role: "Head — Sport Science",
    group: "Sport Science & Coaching",
    image: "/images/team/atchaya-t.webp",
  },
  {
    name: "Sanjay K.",
    role: "Strength & Conditioning Coach",
    group: "Sport Science & Coaching",
    image: "/images/team/sanjay-k.webp",
  },
  { name: "Viswabujithan", role: "Strength & Conditioning Coach", group: "Sport Science & Coaching" },
  {
    name: "Vinoth",
    role: "Associate Strength & Conditioning Coach",
    group: "Sport Science & Coaching",
    image: "/images/team/vinoth.webp",
  },
  { name: "Vignesh", role: "Associate Strength & Conditioning Coach", group: "Sport Science & Coaching" },
  {
    name: "Anand",
    role: "Associate Strength & Conditioning Coach",
    group: "Sport Science & Coaching",
    image: "/images/team/anand.webp",
  },
  { name: "Karthik Baskaran", role: "Consultant Physiotherapist", group: "Clinical & Support" },
  { name: "Jayaveena", role: "Consultant Nutritionist", group: "Clinical & Support" },
  { name: "Akkash Raj", role: "Social Media Manager", group: "Clinical & Support" },
];

export const teamGroups: TeamGroup[] = [
  "Leadership",
  "Sport Science & Coaching",
  "Clinical & Support",
];

export const teamByGroup = teamGroups.map((group) => ({
  group,
  members: team.filter((member) => member.group === group),
}));
