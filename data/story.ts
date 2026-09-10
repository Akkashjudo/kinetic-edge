import type { StoryChapter } from "@/lib/types";

/**
 * Brand story, per the client content document.
 *
 * Verified: founded 2020 by Deepak, a Sports Science graduate, and co-founded by
 * Lakshmi Priyanka Subramanian, a professional badminton player. Grew from a
 * strength & conditioning freelance practice into an integrated human
 * performance ecosystem across two specialised centres.
 *
 * Do not embellish these statements, attach athlete numbers to any year, or
 * infer dates that were not supplied.
 */
export const storyChapters: StoryChapter[] = [
  {
    year: "2020",
    title: "A freelance practice",
    body: "Kinetic Edge is founded by Deepak, a Sports Science graduate, and co-founded by Lakshmi Priyanka Subramanian, a professional badminton player — working in strength & conditioning without a facility.",
  },
  {
    year: "2023",
    title: "The performance floor",
    body: "A dedicated strength & conditioning centre opens in Chennai, giving the practice a home and a training environment of its own.",
  },
  {
    year: "2024",
    title: "Rehabilitation in-house",
    body: "Physiotherapy and rehabilitation are brought inside the system, forming the second specialised centre.",
  },
  {
    year: "Today",
    title: "One performance ecosystem",
    body: "Strength & Conditioning, Physiotherapy, Sport Nutrition, Sport Psychology and Recovery working together — from everyday fitness to high performance.",
  },
];

/**
 * WHY KINETIC EDGE — the credibility section.
 *
 * Each point describes the approach. None of them claims an outcome, a success
 * rate or a comparison against anyone else.
 */
export const differentiators = [
  {
    title: "Individualised",
    body: "Programmes are written for the person in front of us, against what their assessment actually showed.",
    icon: "user-round",
  },
  {
    title: "Evidence-informed",
    body: "Decisions are grounded in sports science rather than in habit or trend.",
    icon: "flask-conical",
  },
  {
    title: "Integrated team",
    body: "Coaching, physiotherapy, nutrition, psychology and recovery work on the same athlete, not in separate rooms.",
    icon: "network",
  },
  {
    title: "Measured and re-tested",
    body: "Baselines are set, progress is tracked, and the programme moves on evidence of the work completed.",
    icon: "line-chart",
  },
  {
    title: "Sport-specific",
    body: "Preparation is built from the demands of the sport — its positions, actions and intensities.",
    icon: "target",
  },
  {
    title: "Return to performance",
    body: "Rehabilitation is planned through to full training and competition, not stopped at symptom relief.",
    icon: "undo-2",
  },
  {
    title: "In person or remote",
    body: "The same process is delivered on the floor in Chennai and to athletes training anywhere.",
    icon: "globe",
  },
  {
    title: "For every starting point",
    body: "Competitive athletes, youth athletes, general fitness and people returning from injury.",
    icon: "users",
  },
];
