import type { ServiceDetail } from "@/lib/types";

/**
 * THE FOUR SERVICES
 *
 * Service copy describes the approach only. No outcome is guaranteed, no
 * timeline is promised and no medical claim is made anywhere in this file —
 * `goal` states what a service works toward, not what it will deliver.
 *
 * These four replace the earlier six service pages. The old URLs redirect
 * permanently in next.config.ts:
 *
 *   athlete-development, performance-testing → athlete-performance
 *   sports-physiotherapy, sports-rehabilitation → physiotherapy-rehabilitation
 *   online-coaching → distance-coaching
 *
 * `focus` lists are the client's own wording from the redesign brief.
 */
export const services: ServiceDetail[] = [
  {
    slug: "strength-conditioning",
    title: "Strength & Conditioning",
    navLabel: "Strength & Conditioning",
    href: "/services/strength-conditioning",
    accent: "performance",
    label: "01 / PERFORMANCE",
    summary: "Strength, power, speed and conditioning.",
    what: "Structured, coached training for strength, power, speed and conditioning.",
    audience: "Athletes at every level, and anyone who wants to train with purpose.",
    goal: "A stronger, faster, more resilient body, built for your sport or goal.",
    focus: [
      "Strength",
      "Power",
      "Speed",
      "Agility",
      "Movement quality",
      "Injury resilience",
    ],
    exploreLabel: "Explore Strength & Conditioning",
    headline: "Build the physical qualities your sport demands.",
    intro:
      "Strength and conditioning at Kinetic Edge starts with what the sport asks of the athlete, and works backwards. Physical qualities are assessed, trained deliberately and re-tested — so training is directed at what actually needs to change.",
    imageKey: "strengthTraining",
    blocks: [
      { title: "Strength", body: "The foundation everything else is built on. Trained progressively and to a standard the sport can use." },
      { title: "Power", body: "The ability to express strength quickly — developed through loading and velocity, not one or the other." },
      { title: "Speed", body: "Maximum velocity mechanics and the qualities that support them, coached rather than assumed." },
      { title: "Acceleration", body: "The first steps. Force applied into the ground in the right direction, in the time the sport allows." },
      { title: "Agility", body: "Reacting to what is happening — reading the situation, then moving, under time pressure." },
      { title: "Change of Direction", body: "Decelerating, re-orienting and re-accelerating with control at the angles the sport demands." },
      { title: "Conditioning", body: "Built against the work-to-rest patterns of the sport, not against generic endurance targets." },
      { title: "Movement Quality", body: "Positions, control and coordination under load — the base that allows training to progress." },
      { title: "Long-Term Development", body: "Blocks of work that build on each other, planned around the competitive calendar." },
      { title: "Injury Resilience", body: "Addressing the qualities and asymmetries that leave an athlete exposed, before they cost them a season." },
    ],
    metaTitle: "Strength & Conditioning in Chennai",
    metaDescription:
      "Strength and conditioning at Kinetic Edge, Mogappair East, Chennai. Strength, power, speed, agility and conditioning built around the demands of your sport.",
  },
  {
    slug: "athlete-performance",
    title: "Athlete Performance Training",
    navLabel: "Athlete Performance",
    href: "/services/athlete-performance",
    accent: "performance",
    label: "02 / PERFORMANCE",
    summary: "Assessment-led preparation for competition.",
    what: "Assessment-led preparation, planned around the demands of your sport.",
    audience: "Competitive and developing athletes preparing for competition.",
    goal: "To arrive at competition physically prepared for what your sport asks.",
    focus: [
      "Performance assessment",
      "Strength development",
      "Speed & power",
      "Movement efficiency",
      "Competition preparation",
      "Individualised programming",
    ],
    exploreLabel: "Explore Athlete Training",
    headline: "Prepared for the demands of your sport.",
    intro:
      "A session can be hard and still take an athlete nowhere. Athlete performance training starts by measuring where the athlete is, is planned against what their sport and competition calendar demand, and is re-tested — so progress is confirmed rather than assumed.",
    imageKey: "athleteDevelopment",
    blocks: [
      { title: "Performance Assessment", body: "The baseline every programme is written against — force production, jump characteristics, speed and movement, measured rather than estimated." },
      { title: "Strength Development", body: "Built to a level that supports the sport, then maintained through the competitive period." },
      { title: "Speed & Power", body: "Acceleration, top speed and the ability to produce force quickly — developed as trainable qualities with their own progressions." },
      { title: "Movement Efficiency", body: "Coordination, control and positions that hold up when the athlete is fatigued." },
      { title: "Competition Preparation", body: "Preparing the athlete for the training and competition load ahead of them, planned around the competitive calendar." },
      { title: "Individualised Programming", body: "Every decision traces back to what the sport asks and what the assessment showed — never a template." },
      { title: "Long-Term Development", body: "Training planned in blocks across a season and across seasons, with young athletes trained for their stage of development." },
      { title: "Re-testing", body: "Scheduled repeat testing, so progression is confirmed rather than assumed and the next block is set on evidence." },
    ],
    metaTitle: "Athlete Performance Training in Chennai",
    metaDescription:
      "Athlete performance training at Kinetic Edge, Chennai. Performance assessment, strength, speed and power, movement efficiency and competition preparation — re-tested against a baseline.",
  },
  {
    slug: "physiotherapy-rehabilitation",
    title: "Physiotherapy & Sports Rehabilitation",
    navLabel: "Physiotherapy & Rehabilitation",
    href: "/services/physiotherapy-rehabilitation",
    accent: "rehab",
    label: "03 / REHABILITATION",
    summary: "Assessment, treatment and return to sport.",
    what: "Injury assessment, treatment and progressive rehabilitation in a performance environment.",
    audience: "Anyone recovering from injury or surgery — athletes and non-athletes alike.",
    goal: "A structured return to training, sport and everyday activity.",
    focus: [
      "Injury assessment",
      "Rehabilitation",
      "Return-to-sport training",
      "Movement correction",
      "Pain management",
      "Performance rehabilitation",
    ],
    exploreLabel: "Explore Rehabilitation",
    headline: "From injury back to performance.",
    intro:
      "Physiotherapy at Kinetic Edge is delivered inside a performance environment. The assessment considers the injury and what you are going back to — and rehabilitation runs as a progression with criteria at each stage, through to a return to training and sport.",
    imageKey: "physiotherapy",
    blocks: [
      { title: "Injury Assessment", body: "Understanding the injury, how it behaves, what provokes it and what you need to get back to." },
      { title: "Pain Management", body: "Settling symptoms so that meaningful rehabilitation can begin and progress." },
      { title: "Progressive Rehabilitation", body: "Load reintroduced deliberately and in stages, building tolerance rather than testing it." },
      { title: "Movement Correction", body: "Addressing how you move, so the same problem is less likely to present again." },
      { title: "Post-operative Rehabilitation", body: "Structured progression that works alongside the plan set by your surgeon or doctor." },
      { title: "Performance Rehabilitation", body: "Rebuilding strength, power and conditioning to the level training and competition actually require." },
      { title: "Return-to-Sport Training", body: "Reintegration into full training and competition, with prevention work carried forward." },
      { title: "Criteria, not Calendar", body: "Progression through each stage is earned by meeting criteria, rather than granted by time passing." },
    ],
    metaTitle: "Physiotherapy & Sports Rehabilitation in Chennai",
    metaDescription:
      "Physiotherapy and sports rehabilitation at Kinetic Edge, Chennai. Injury assessment, pain management, progressive rehabilitation and return-to-sport training in a performance environment.",
  },
  {
    slug: "distance-coaching",
    title: "Distance Coaching",
    navLabel: "Distance Coaching",
    href: "/services/distance-coaching",
    accent: "performance",
    label: "04 / PERFORMANCE",
    summary: "Individual coaching, wherever you train.",
    what: "Individualised programming and coaching, delivered remotely wherever you train.",
    audience: "Athletes and clients training away from our Chennai centres.",
    goal: "Structured, coached progress — without needing to be in the building.",
    focus: [
      "Individualised training programmes",
      "Progress tracking",
      "Coach feedback",
      "Performance monitoring",
      "Remote support",
    ],
    exploreLabel: "Explore Distance Coaching",
    headline: "Structured coaching, wherever you train.",
    intro:
      "Athletes and clients who cannot train at our Chennai centres can still be coached by Kinetic Edge. The process is the same one used on the floor — assess, plan, train, track, improve — delivered remotely and built around the equipment and schedule you actually have.",
    imageKey: "onlineCoaching",
    blocks: [
      { title: "Individualised Training Programmes", body: "Written around the equipment, facility and time you genuinely have access to." },
      { title: "Coach Feedback", body: "Execution, load and technique are reviewed — a written plan on its own is not coaching." },
      { title: "Progress Tracking", body: "Sessions and progression are reviewed against what was prescribed." },
      { title: "Performance Monitoring", body: "The programme moves forward on the evidence of the work completed, not on a fixed schedule." },
      { title: "Remote Support", body: "Review calls and WhatsApp access to your coach, depending on the programme you choose." },
      { title: "For Athletes and Everyone Else", body: "Available to competitive athletes training elsewhere and to people training for their own goals." },
    ],
    metaTitle: "Distance & Online Coaching",
    metaDescription:
      "Distance and online coaching from Kinetic Edge, Chennai. Individualised programmes, progress tracking, coach feedback and remote support, wherever you train.",
  },
];

export const getService = (slug: string) =>
  services.find((service) => service.slug === slug);

export const serviceSlugs = services.map((service) => service.slug);
