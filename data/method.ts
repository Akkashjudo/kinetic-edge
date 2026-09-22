import type { MethodStep } from "@/lib/types";

/**
 * The Kinetic Edge System — Assess → Plan → Train → Track → Improve.
 *
 * Every programme runs through these five steps, in person or remotely, for
 * performance and for rehabilitation alike. Each body line describes the
 * process, never an outcome.
 */
export const methodSteps: MethodStep[] = [
  {
    index: "01",
    title: "Assess",
    body: "Establish your starting point — history, current physical qualities, movement and the demands of your sport or goal.",
  },
  {
    index: "02",
    title: "Plan",
    body: "Build an individual programme around what the assessment showed. Never a template.",
  },
  {
    index: "03",
    title: "Train",
    body: "Coached sessions delivered to the plan — at our centres, or remotely wherever you train.",
  },
  {
    index: "04",
    title: "Track",
    body: "Load, progress and response are monitored session to session, and adjusted where needed.",
  },
  {
    index: "05",
    title: "Improve",
    body: "Re-test against the baseline, confirm what has changed, and set the next block of work.",
  },
];

/**
 * The rehabilitation pathway — a longer, criteria-based progression that sits
 * inside the same method.
 */
export const rehabPathway = [
  {
    index: "01",
    title: "Assess",
    body: "Establish the injury, the irritability, the restrictions and the timeline the sport is working to.",
  },
  {
    index: "02",
    title: "Restore",
    body: "Settle symptoms and restore range, control and basic capacity in the affected area.",
  },
  {
    index: "03",
    title: "Reload",
    body: "Reintroduce load progressively, building tolerance in the tissue and confidence in the movement.",
  },
  {
    index: "04",
    title: "Rebuild",
    body: "Rebuild strength, power and conditioning to the level the sport actually demands.",
  },
  {
    index: "05",
    title: "Re-test",
    body: "Test against criteria rather than against the calendar. Progression is earned, not assumed.",
  },
  {
    index: "06",
    title: "Return",
    body: "Reintegrate into full training and competition, with prevention work carried forward.",
  },
] satisfies MethodStep[];

/**
 * Distance & online coaching pathway.
 */
export const onlinePathway = [
  { index: "01", title: "Initial consultation", body: "Understand the athlete, the sport, the schedule and the equipment available." },
  { index: "02", title: "Programme prescription", body: "A written programme built for the goal and the environment being trained in." },
  { index: "03", title: "Remote training", body: "The athlete trains to the programme wherever they are based." },
  { index: "04", title: "Monitoring", body: "Sessions and progression are reviewed against what was prescribed." },
  { index: "05", title: "Feedback", body: "Coaching input on execution, load and technique." },
  { index: "06", title: "Progression", body: "The programme moves forward on the evidence of the work completed." },
] satisfies MethodStep[];
