/**
 * PARTNERS
 *
 * Hundred is the one confirmed partner. Do not add sponsors, associations,
 * accreditations or technology partners beyond what the client confirms, and do
 * not list competitions here — competitions are not partners.
 *
 * The VALD Performance partnership was removed at the client's request on
 * 25 Sep 2026, along with its logo and every reference to it.
 *
 * Logos are the supplied marks recovered onto transparency. Intrinsic
 * dimensions are recorded so next/image reserves the right box and nothing
 * shifts on load.
 */
export interface Partner {
  name: string;
  role: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  /** Rendered height, set per logo so different mark ratios read as a set. */
  displayHeight: string;
  /** Optional — only written where the relationship is actually understood. */
  description?: string;
}

export const partners: Partner[] = [
  {
    name: "Hundred",
    role: "Apparel Sponsor",
    logo: "/brand/partners/hundred.png",
    logoWidth: 562,
    logoHeight: 313,
    displayHeight: "clamp(2.75rem, 5vw, 3.75rem)",
  },
];
