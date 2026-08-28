/**
 * PARTNERS
 *
 * VALD Performance and Hundred are the confirmed partners. Do not add sponsors,
 * associations or accreditations beyond these, and do not list competitions
 * here — competitions live in data/competitions.ts and must never be presented
 * as partners.
 *
 * Logos are the supplied marks recovered onto transparency, so they can sit on
 * the dark partner surface without altering their shape. Intrinsic dimensions
 * are recorded so next/image reserves the right box and nothing shifts on load.
 */
export interface Partner {
  name: string;
  role: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  /**
   * Rendered height. Set per logo rather than shared: VALD is a 4.1:1 wordmark
   * and Hundred is a 1.8:1 mark-over-wordmark, so matching their heights would
   * make VALD dominate. These values balance them optically instead.
   */
  displayHeight: string;
  /** Optional — only written where the relationship is actually understood. */
  description?: string;
}

export const partners: Partner[] = [
  {
    name: "VALD Performance",
    role: "Technology & Testing Partner",
    logo: "/brand/partners/vald.png",
    logoWidth: 591,
    logoHeight: 143,
    displayHeight: "clamp(1.75rem, 3.2vw, 2.375rem)",
    description:
      "Objective testing technology used within performance testing and re-testing at Kinetic Edge — measuring force production and jump characteristics so training decisions are made on data rather than impression.",
  },
  {
    name: "Hundred",
    role: "Apparel Sponsor",
    logo: "/brand/partners/hundred.png",
    logoWidth: 562,
    logoHeight: 313,
    displayHeight: "clamp(2.75rem, 5vw, 3.75rem)",
  },
];
