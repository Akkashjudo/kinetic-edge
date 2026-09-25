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
  /**
   * Intrinsic pixel size of the supplied file. Set it whenever `src` is set:
   * it is what lets a component ask for `ratio="natural"` and show the
   * photograph whole instead of guessing a frame shape and cutting into it.
   */
  width?: number;
  height?: number;
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
    src: "/images/centre/floor-wide.webp",
    width: 1280,
    height: 960,
    alt: "The Kinetic Edge training floor in Mogappair East — turf acceleration lane, plyometric boxes and the entrance to the performance centre",
    shot: "SUPPLIED — the floor, looking down the turf lane. A frame with athletes mid-session would be stronger still: landscape 21:9, min 2400px wide, clear space on the left third for the headline.",
    position: "center 45%",
  },
  /**
   * The hero is art-directed: three frames of the same room, one per
   * breakpoint. `hero` is the desktop frame and must not change — see the note
   * in components/sections/Hero.tsx. These two are shot for their shapes, so
   * neither is a crop of the other.
   */
  heroTablet: {
    src: "/images/centre/floor-entrance-wide.webp",
    width: 1448,
    height: 1086,
    alt: "The Kinetic Edge training floor from the entrance — the glazed KE door, the strength area beyond it and the turf acceleration lane along the right wall",
    shot: "SUPPLIED — the floor from the entrance, landscape 4:3. Shot for the tablet hero.",
  },
  heroMobile: {
    src: "/images/centre/floor-entrance-tall.webp",
    width: 941,
    height: 1672,
    alt: "The Kinetic Edge training floor from the entrance — the glazed KE door, the strength area beyond it and the turf acceleration lane along the right wall",
    shot: "SUPPLIED — the same frame shot vertically, 9:16. Shot for the mobile hero.",
  },
  brandIntro: {
    src: "/images/founders/founders-conclave.webp",
    width: 1146,
    height: 1600,
    alt: "The founders of Kinetic Edge at the Symbiosis School of Sports Sciences Sports Conclave, 2025",
    shot: "SUPPLIED — the founders representing Kinetic Edge at a sports science conclave.",
    position: "center 25%",
  },

  /* ----------------------------------------------------------------- Centres */
  performanceCentre: {
    src: "/images/centres/centre-01-exterior.webp",
    width: 1500,
    height: 1200,
    alt: "Kinetic Edge High Performance & Fitness Centre on Justice Rathinavel Pandian Road, Mogappair East",
    shot: "SUPPLIED — Centre 01 exterior. A frame of the training floor itself (racks, platforms, turf) would be a stronger fit here when one exists.",
  },
  rehabCentre: {
    src: "/images/centres/centre-02-exterior.webp",
    width: 1170,
    height: 936,
    alt: "The frontage of Kinetic Edge Fitness & Rehabilitation Centre, signed for strength and cardiovascular training and physiotherapy",
    shot: "SUPPLIED — exterior of the rehabilitation centre. An interior frame (plinth, assessment area, rehab equipment) would still be worth adding as a second slot.",
    // The signage runs along the very top of this frame; any crop wider than
    // the source takes it from the bottom instead.
    position: "center top",
  },

  /* ---------------------------------------------------------------- Services */
  strengthTraining: {
    src: "/images/centre/floor-racks.webp",
    width: 1280,
    height: 960,
    alt: "Squat rack, barbells, dumbbells and plyometric boxes on the Kinetic Edge training floor",
    shot: "SUPPLIED — the strength floor. A frame of an athlete under the bar, coach in shot, would be a stronger fit when one exists.",
  },
  sprinting: {
    src: "/images/centre/floor-turf-lane.webp",
    width: 1280,
    height: 960,
    alt: "The indoor turf acceleration lane at Kinetic Edge, marked out for speed work",
    shot: "SUPPLIED — the turf lane. An athlete accelerating down it would be the stronger frame.",
    position: "center 60%",
  },
  athleteDevelopment: {
    src: "/images/centre/floor-rack-trapbar.webp",
    width: 1280,
    height: 960,
    alt: "Trap bar, squat rack and dumbbells on the Kinetic Edge training floor",
    shot: "SUPPLIED — the floor. A group of developing athletes mid-session would be a stronger fit.",
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

  /* ----------------------------------------------------------------- People */
  founder: {
    src: "/images/founders/deepak.webp",
    width: 1070,
    height: 1600,
    alt: "Deepak, Founder and Managing Director of Kinetic Edge",
    shot: "SUPPLIED — founder portrait at the centre.",
    position: "center 30%",
  },
  foundersTogether: {
    src: "/images/founders/founders-ses.webp",
    width: 1170,
    height: 1530,
    alt: "The founders of Kinetic Edge, Deepak and Lakshmi Priyanka Subramanian",
    shot: "SUPPLIED — the two founders together.",
    position: "center 25%",
  },
  coachTrack: {
    src: "/images/centre/athletics-track.webp",
    width: 960,
    height: 1280,
    alt: "A Kinetic Edge coach at the athletics track",
    shot: "SUPPLIED — coach trackside.",
    position: "center 30%",
  },
  teamGroup: {
    src: null,
    alt: "The Kinetic Edge coaching and clinical team",
    shot: "Full team on the performance floor. Landscape 16:9, min 2200px wide.",
  },

  /* --------------------------------------------------------------- Athletes */
  athletesHero: {
    src: "/images/centre/floor-benches.webp",
    width: 1280,
    height: 960,
    alt: "The Kinetic Edge training floor, where its athletes prepare",
    shot: "SUPPLIED — the floor. A competition frame of a Kinetic Edge athlete would be the stronger image here: landscape 21:9, min 2400px wide.",
    position: "center 55%",
  },

  /* --------------------------------------------------------------- Facility */
  facility: {
    src: "/images/centres/centre-01-exterior.webp",
    width: 1500,
    height: 1200,
    alt: "The entrance to Kinetic Edge High Performance & Fitness Centre on Justice Rathinavel Pandian Road, Mogappair East, Chennai",
    shot: "SUPPLIED — exterior of Centre 01.",
  },
  centreBuilding: {
    src: "/images/centre/building.webp",
    width: 1132,
    height: 1600,
    alt: "The Kinetic Edge High Performance & Fitness Centre building on its street in Mogappair East, Chennai",
    shot: "SUPPLIED — the building from the street.",
  },
  facilityInterior: {
    src: "/images/centre/floor-benches.webp",
    width: 1280,
    height: 960,
    alt: "Inside the Kinetic Edge High Performance Centre — benches, racks and the glazed entrance",
    shot: "SUPPLIED — wide interior of the floor.",
    position: "center 55%",
  },
} satisfies Record<string, SiteImage>;

export type SiteImageKey = keyof typeof imageRegistry;

/** Widened to SiteImage so every slot is read uniformly, keys preserved. */
export const siteImages: Record<SiteImageKey, SiteImage> = imageRegistry;

export const getImage = (key: SiteImageKey): SiteImage => siteImages[key];

/**
 * The photograph's own aspect ratio as a CSS value, or null where the file has
 * not been supplied yet (the placeholder plate then keeps the caller's shape).
 *
 * Use this — via `<Figure ratio="natural">` — rather than pouring a portrait
 * into a landscape frame. Several slots here are phone photographs at 2:3; a
 * 16:10 frame threw away 42% of one of them, head and feet included.
 */
export function naturalRatio(key: SiteImageKey): string | null {
  const { width, height } = siteImages[key];
  return width && height ? `${width} / ${height}` : null;
}
