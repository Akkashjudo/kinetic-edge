import type { Pillar } from "@/lib/types";

/**
 * THE KINETIC EDGE PERFORMANCE SYSTEM
 *
 * ASSESS → TRAIN → RESTORE → FUEL → PERFORM → RECOVER
 *
 * Six disciplines that work on the same athlete rather than in six separate
 * rooms. Every service listed here is quoted from the client content document —
 * nothing has been added, renamed or inferred.
 *
 * The `summary` on each pillar is written for the site; the `services` arrays
 * are the supplied lists verbatim.
 */
export const pillars: Pillar[] = [
  {
    slug: "assess",
    code: "Assess",
    title: "Athlete High-Performance Assessment",
    summary:
      "Establish the starting point. What the assessment shows is what the programme is written against — and what every re-test is measured back to.",
    icon: "gauge",
    accent: "performance",
    href: "/services/athlete-performance",
    services: [
      "Comprehensive Physical Assessment",
      "Movement Screening",
      "Strength Assessment",
      "Power Assessment",
      "Speed & Acceleration Testing",
      "Change of Direction Assessment",
      "Jump & Reactive Strength Assessment",
      "Mobility & Flexibility Assessment",
      "Aerobic & Anaerobic Capacity Testing",
      "Performance Profiling",
      "Return-to-Performance Testing",
      "Baseline & Benchmark Testing",
      "Re-testing & Progress Tracking",
      "Athlete Monitoring & Performance Reports",
    ],
  },
  {
    slug: "train",
    code: "Train",
    title: "Strength & Conditioning",
    summary:
      "Build the physical qualities the goal demands — for a competing athlete, someone training for everyday capacity, or a young athlete developing over years.",
    icon: "dumbbell",
    accent: "performance",
    href: "/services/strength-conditioning",
    services: [],
    groups: [
      {
        title: "Athlete High Performance",
        services: [
          "Sport-Specific Physical Preparation",
          "Strength Development",
          "Maximal & Relative Strength",
          "Power Development",
          "Speed & Acceleration",
          "Deceleration & Change of Direction",
          "Reactive Strength",
          "Conditioning & Energy-System Development",
          "Injury-Risk Reduction Strategies",
          "Return-to-Training Conditioning",
        ],
      },
      {
        title: "General Population",
        services: [
          "Strength Training",
          "Fitness & Conditioning",
          "Fat Loss & Body Composition",
          "Muscle Development",
          "Mobility & Movement",
          "Functional Capacity",
          "Strength for Everyday Life",
          "Youth Strength & Physical Development",
          "Senior Fitness & Strength",
        ],
      },
      {
        title: "Online / Distance",
        services: [
          "Online Coaching",
          "Distance Coaching",
          "Individualised Programming",
          "Performance Programming",
          "Remote Monitoring",
          "Video-Based Exercise Feedback",
          "Training Load Monitoring",
          "Programme Review & Progression",
        ],
      },
    ],
  },
  {
    slug: "restore",
    code: "Restore",
    title: "Physiotherapy & Rehabilitation",
    summary:
      "Assessment, treatment and progressive loading — planned toward return to training, return to sport and return to performance rather than stopping at symptom relief.",
    icon: "activity",
    accent: "rehab",
    href: "/services/physiotherapy-rehabilitation",
    services: [
      "Sports Injury Assessment",
      "Musculoskeletal Assessment",
      "Orthopaedic Rehabilitation",
      "Sports Injury Rehabilitation",
      "Post-Operative Rehabilitation",
      "Exercise-Based Rehabilitation",
      "Strength & Conditioning for Rehabilitation",
      "Return-to-Training",
      "Return-to-Sport",
      "Return-to-Performance",
      "Movement & Load Management",
      "Injury-Risk Reduction",
      "Mobility & Flexibility Rehabilitation",
      "Neuromuscular Rehabilitation",
      "Recovery & Reconditioning",
    ],
  },
  {
    slug: "fuel",
    code: "Fuel",
    title: "Sport Nutrition",
    summary:
      "Nutrition planned around the training being done and the competition being prepared for — including the days spent travelling to it.",
    icon: "apple",
    accent: "performance",
    services: [
      "Athlete Nutrition Assessment",
      "Individualised Nutrition Planning",
      "Performance Nutrition",
      "Training & Competition Nutrition",
      "Pre-Competition Nutrition",
      "Post-Training Recovery Nutrition",
      "Hydration Strategies",
      "Body Composition Management",
      "Weight Management",
      "Muscle Gain & Lean Mass Development",
      "Fat Loss Nutrition",
      "Youth Athlete Nutrition",
      "Travel & Tournament Nutrition",
      "Nutrition Monitoring & Follow-Up",
    ],
  },
  {
    slug: "perform",
    code: "Perform",
    title: "Mental Performance Coaching",
    summary:
      "The psychological side of competing — preparation, focus, regulation and consistency, coached with the same structure as the physical work.",
    icon: "brain",
    accent: "performance",
    services: [
      "Performance Profiling",
      "Goal Setting",
      "Confidence Development",
      "Focus & Concentration",
      "Competition Preparation",
      "Pre-Performance Routines",
      "Performance Anxiety Management",
      "Emotional Regulation",
      "Resilience & Coping Strategies",
      "Motivation & Consistency",
      "Visualization & Imagery",
      "Mindset Development",
      "Post-Competition Reflection",
      "Athlete Wellbeing Support",
    ],
  },
  {
    slug: "recover",
    code: "Recover",
    title: "Recovery & Regeneration",
    summary:
      "Recovery planned against training load rather than left to chance — through the training week, around competition and across travel.",
    icon: "heart-pulse",
    accent: "rehab",
    services: [
      "Sports Massage",
      "Recovery Therapy",
      "Mobility & Recovery Sessions",
      "Active Recovery",
      "Recovery Monitoring",
      "Post-Training Recovery",
      "Competition Recovery",
      "Travel & Tournament Recovery",
      "Recovery Planning",
      "Sleep & Recovery Education",
      "Recovery Strategies Based on Training Load",
    ],
  },
];

export const getPillar = (slug: string) =>
  pillars.find((pillar) => pillar.slug === slug);

/** Total services across the system — derived, never hand-counted. */
export const pillarServiceCount = (pillar: Pillar) =>
  pillar.services.length +
  (pillar.groups?.reduce((n, g) => n + g.services.length, 0) ?? 0);
