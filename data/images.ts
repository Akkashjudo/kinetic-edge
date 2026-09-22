/**
 * CENTRAL IMAGE REGISTRY
 *
 * Every photograph on the site is referenced through this file. Components never
 * hardcode an image path.
 *
 * HOW TO ADD A REAL PHOTOGRAPH
 *  1. Drop the file into /public/images/... using the path already written in
 *     `src` below (WebP preferred, sized per the `shot` note).
 *  2. Change `src` from null to that path.
 *  3. Update `alt` to describe the photograph that was actually supplied.
 *
 * While `src` is null the UI renders a branded placeholder panel — the layout,
 * crop and aspect ratio are already final, so swapping in the photograph does
 * not shift anything on the page.
 *
 * Placeholder IMAGES are acceptable. Placeholder FACTS are not: never caption a
 * placeholder with an invented athlete, result, credential or statistic.
 */

export interface SiteImage {
  /** Public path once a real photograph exists, otherwise null. */
  src: string | null;
  /** Describes the supplied photograph — rewrite when the image lands. */
  alt: string;
  /** Art direction note for whoever supplies the photograph. */
  shot: string;
  /** CSS object-position, tuned per slot so athlete faces are never cropped badly. */
  position?: string;
}

const imageRegistry = {
  /* ---------------------------------------------------------------- Homepage */
  hero: {
    src: null,
    alt: "Athlete training on the Kinetic Edge performance floor in Chennai",
    shot: "Wide, low-light cinematic frame of real athlete training. Landscape 21:9, min 2400px wide. Leave clear space on the left third for the headline.",
    position: "center 40%",
  },
  brandIntro: {
    src: null,
    alt: "Coach and athlete working through a prescribed session at Kinetic Edge",
    shot: "Portrait 4:5 coaching moment — coach observing, athlete under load. Min 1400px wide.",
  },

  /* ----------------------------------------------------------------- Centres */
  performanceCentre: {
    src: "/images/centres/centre-01-exterior.webp",
    alt: "Kinetic Edge High Performance & Fitness Centre on Justice Rathinavel Pandian Road, Mogappair East",
    shot: "SUPPLIED — Centre 01 exterior. A frame of the training floor itself (racks, platforms, turf) would be a stronger fit here when one exists.",
  },
  rehabCentre: {
    src: "/images/centres/centre-02-exterior.webp",
    alt: "The frontage of Kinetic Edge Fitness & Rehabilitation Centre, signed for strength and cardiovascular training and physiotherapy",
    shot: "SUPPLIED — exterior of the rehabilitation centre. An interior frame (plinth, assessment area, rehab equipment) would still be worth adding as a second slot.",
    // The signage runs along the very top of this frame; any crop wider than
    // the source takes it from the bottom instead.
    position: "center top",
  },

  /* ---------------------------------------------------------------- Services */
  strengthTraining: {
    src: null,
    alt: "Athlete performing a barbell lift under coaching supervision",
    shot: "Barbell work, side-on, coach in frame. Landscape 3:2, min 1800px wide.",
  },
  sprinting: {
    src: null,
    alt: "Athlete accelerating during a speed session",
    shot: "Sprint / acceleration frame, panned or frozen. Landscape 3:2, min 1800px wide.",
  },
  athleteDevelopment: {
    src: null,
    alt: "Youth athletes in a long-term development session",
    shot: "Group of developing athletes mid-session. Landscape 3:2, min 1800px wide.",
  },
  jumpTesting: {
    src: null,
    alt: "Countermovement jump being recorded during performance testing",
    shot: "Jump test in progress with the testing setup visible. Landscape 3:2, min 1800px wide.",
  },
  forcePlate: {
    src: null,
    alt: "Force plate testing session at Kinetic Edge",
    shot: "Force plates in use, screen or tablet readout visible. Landscape 3:2, min 1800px wide.",
  },
  valdTesting: {
    src: null,
    alt: "Athlete testing session using VALD Performance technology",
    shot: "VALD hardware in use during a testing session. Landscape 3:2, min 1800px wide.",
  },
  physiotherapy: {
    src: null,
    alt: "Physiotherapy assessment at Kinetic Edge",
    shot: "Hands-on assessment or treatment in the clinical space. Landscape 3:2, min 1800px wide.",
  },
  rehabilitation: {
    src: null,
    alt: "Athlete progressing through a loaded rehabilitation exercise",
    shot: "Rehab under load — bridging the clinical and performance environments. Landscape 3:2, min 1800px wide.",
  },
  returnToSport: {
    src: null,
    alt: "Athlete completing return-to-sport testing",
    shot: "On-field or on-court reconditioning, sport-specific. Landscape 3:2, min 1800px wide.",
  },
  mobility: {
    src: null,
    alt: "Mobility and recovery work at Kinetic Edge",
    shot: "Mobility / recovery session, calm and clinical. Landscape 3:2, min 1800px wide.",
  },
  onlineCoaching: {
    src: null,
    alt: "Athlete following a prescribed Kinetic Edge programme remotely",
    shot: "Athlete training with a programme on a phone or tablet. Landscape 3:2, min 1800px wide.",
  },

  /* -------------------------------------------------------------------- Team */
  founder: {
    src: null,
    alt: "Deepak, Founder and Head of Strength & Conditioning at Kinetic Edge",
    shot: "Founder portrait, coaching context preferred. Portrait 4:5, min 1200px wide.",
  },
  teamGroup: {
    src: null,
    alt: "The Kinetic Edge coaching and clinical team",
    shot: "Full team on the performance floor. Landscape 16:9, min 2200px wide.",
  },

  /* --------------------------------------------------------------- Athletes */
  athletesHero: {
    src: null,
    alt: "Kinetic Edge athlete in competition",
    shot: "Competition frame — the strongest single image available. Landscape 21:9, min 2400px wide.",
    position: "center 35%",
  },

  /* -------------------------------------------------------------- Education */
  workshop: {
    src: null,
    alt: "X-Plosive Plyometric Workshop 2.0 delivered at Kinetic Edge",
    shot: "Workshop delivery — presenting, or attendees around a testing setup. Landscape 3:2, min 1800px wide.",
  },

  /* --------------------------------------------------------------- Facility */
  facility: {
    src: "/images/centres/centre-01-exterior.webp",
    alt: "The entrance to Kinetic Edge High Performance & Fitness Centre on Justice Rathinavel Pandian Road, Mogappair East, Chennai",
    shot: "SUPPLIED — exterior of Centre 01.",
  },
  facilityInterior: {
    src: null,
    alt: "Inside the Kinetic Edge High Performance Centre",
    shot: "Wide interior showing the scale of the floor. Landscape 16:9, min 2200px wide.",
  },
} satisfies Record<string, SiteImage>;

export type SiteImageKey = keyof typeof imageRegistry;

/** Widened to SiteImage so every slot is read uniformly, keys preserved. */
export const siteImages: Record<SiteImageKey, SiteImage> = imageRegistry;

export const getImage = (key: SiteImageKey): SiteImage => siteImages[key];
