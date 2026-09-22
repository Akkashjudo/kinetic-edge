import type { EducationEvent } from "@/lib/types";

/**
 * KE EDUCATION
 *
 * Only the verified workshop below exists. It has already taken place, so it is
 * marked "past" and no registration is offered anywhere in the UI.
 *
 * Do not fabricate upcoming workshops, attendee numbers, feedback or pricing.
 * When a real event is confirmed, add it with status: "upcoming".
 */
export const educationEvents: EducationEvent[] = [
  {
    slug: "x-plosive-plyometric-workshop-2",
    title: "X-Plosive Plyometric Workshop 2.0",
    subtitle: "From Data to Performance",
    status: "past",
    date: "21 June 2026",
    isoDate: "2026-06-21",
    time: "09:00 — 12:00 IST",
    venue:
      "Kinetic Edge, 253 Justice Rathinavel Pandian Road, Mogappair East, Chennai 600107",
    instructor: "Deepak",
    partner: "VALD Performance",
    topics: [
      "Plyometric Science",
      "Programming",
      "Jump Diagnostics",
      "Force Plates",
      "RFD",
      "Reactive Strength",
      "Benchmarking",
      "Return to Play",
    ],
  },
];

/** What KE Education is, in the client's words from the redesign brief. */
export const educationIntro =
  "Sharing practical knowledge in strength & conditioning, sports science and performance development.";

/** The areas KE Education works in — descriptive, not a list of events. */
export const educationFocus = [
  "Workshops",
  "Seminars",
  "Coach education",
  "Sports science learning",
  "Professional collaborations",
];

export const featuredEvent = educationEvents[0];

export const upcomingEvents = educationEvents.filter(
  (event) => event.status === "upcoming",
);

export const pastEvents = educationEvents.filter(
  (event) => event.status === "past",
);
