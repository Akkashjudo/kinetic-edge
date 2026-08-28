import type { ServiceDetail } from "@/lib/types";

/**
 * Service copy describes the approach only.
 *
 * No outcome is guaranteed, no timeline is promised and no medical claim is made
 * anywhere in this file.
 */
export const services: ServiceDetail[] = [
  {
    slug: "strength-conditioning",
    title: "Strength & Conditioning",
    href: "/services/strength-conditioning",
    accent: "performance",
    label: "01 / PERFORMANCE",
    summary: "Build the physical qualities your sport demands.",
    headline: "Build the physical qualities your sport demands.",
    intro:
      "Strength and conditioning at Kinetic Edge starts with what the sport asks of the athlete, and works backwards. Physical qualities are assessed, trained deliberately and re-tested — so training is directed at what actually needs to change.",
    imageKey: "strengthTraining",
    cta: { label: "Book a Performance Assessment", href: "/contact" },
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
      { title: "Injury Prevention", body: "Addressing the qualities and asymmetries that leave an athlete exposed, before they cost them a season." },
    ],
    metaTitle: "Strength & Conditioning in Chennai",
    metaDescription:
      "Strength and conditioning at Kinetic Edge, Mogappair East, Chennai. Strength, power, speed, agility and conditioning built around the demands of your sport.",
  },
  {
    slug: "athlete-development",
    title: "Athlete Development",
    href: "/services/athlete-development",
    accent: "performance",
    label: "02 / PERFORMANCE",
    summary: "Long-term physical preparation, not one-off workouts.",
    headline: "Develop the athlete, not just the workout.",
    intro:
      "A session can be hard and still take an athlete nowhere. Athlete development is the long view — physical qualities built in the right order, over time, against the demands of the sport and the stage the athlete is at.",
    imageKey: "athleteDevelopment",
    cta: { label: "Book a Performance Assessment", href: "/contact" },
    blocks: [
      { title: "Long-Term Development", body: "Training planned in blocks across a season and across seasons, not written week to week." },
      { title: "Physical Preparation", body: "Preparing the athlete for the training and competition load ahead of them, not just for the next session." },
      { title: "Strength", body: "Built to a level that supports the sport, then maintained through the competitive period." },
      { title: "Speed", body: "Developed as a trainable quality with its own progressions, coaching and recovery requirements." },
      { title: "Power", body: "Bridging strength and speed — including jumping, landing and the ability to produce force quickly." },
      { title: "Movement", body: "Coordination, control and positions that hold up when the athlete is fatigued." },
      { title: "Conditioning", body: "Matched to the demands of the sport and to where the athlete is in their calendar." },
      { title: "Sport Demands", body: "Every decision traces back to what the sport asks — the positions, the actions and the intensities." },
    ],
    metaTitle: "Athlete Development in Chennai",
    metaDescription:
      "Long-term athlete development at Kinetic Edge, Chennai. Strength, speed, power, movement and conditioning developed in order, around the demands of the sport.",
  },
  {
    slug: "performance-testing",
    title: "Performance Testing",
    href: "/services/performance-testing",
    accent: "performance",
    label: "03 / PERFORMANCE",
    summary: "Measure, understand and progress physical qualities.",
    headline: "Measure. Understand. Progress.",
    intro:
      "Testing is what turns training from an opinion into a decision. It establishes where an athlete is, informs what gets prescribed, and shows whether the work is doing what it was meant to do.",
    imageKey: "jumpTesting",
    cta: { label: "Book Performance Testing", href: "/contact" },
    blocks: [
      { title: "Baseline Assessment", body: "The starting point every programme is written against — and the reference every re-test is compared to." },
      { title: "Jump Diagnostics", body: "Jump testing used to look past jump height into how force was produced to get there." },
      { title: "Force Production", body: "How much force an athlete can produce, and how quickly they can produce it." },
      { title: "Reactive Strength", body: "How efficiently an athlete absorbs and re-uses force through the stretch-shortening cycle." },
      { title: "Benchmarking", body: "Results read in context — against the athlete's own history and against the demands of their sport." },
      { title: "Re-testing", body: "Scheduled repeat testing, so progression is confirmed rather than assumed and the next block is set on evidence." },
    ],
    metaTitle: "Performance Testing in Chennai",
    metaDescription:
      "Performance testing at Kinetic Edge, Chennai. Baseline assessment, jump diagnostics, force production and reactive strength, with structured re-testing.",
  },
  {
    slug: "sports-physiotherapy",
    title: "Sports Physiotherapy",
    href: "/services/sports-physiotherapy",
    accent: "rehab",
    label: "04 / REHABILITATION",
    summary: "Assessment and treatment with the demands of sport in mind.",
    headline: "Rehab with the demands of sport in mind.",
    intro:
      "Physiotherapy at Kinetic Edge is delivered inside a performance environment. The assessment considers the injury and the sport the athlete is going back to — so treatment is planned toward training, not only toward comfort.",
    imageKey: "physiotherapy",
    cta: { label: "Book a Physiotherapy Assessment", href: "/contact" },
    blocks: [
      { title: "Assessment", body: "Understanding the injury, how it behaves, what provokes it and what the athlete needs to get back to." },
      { title: "Pain Management", body: "Settling symptoms so that meaningful rehabilitation can begin and progress." },
      { title: "Mobility Restoration", body: "Restoring range and control at the joints and tissues the sport relies on." },
      { title: "Progressive Loading", body: "Load reintroduced deliberately and in stages, building tolerance rather than testing it." },
      { title: "Strength Rebuilding", body: "Rebuilding capacity in the affected area and in the qualities that support it." },
      { title: "Return-to-Training Preparation", body: "Closing the gap between clinical progress and the demands of full training." },
    ],
    metaTitle: "Sports Physiotherapy in Chennai",
    metaDescription:
      "Sports physiotherapy at Kinetic Edge, Mogappair East, Chennai. Assessment, pain management, mobility restoration and progressive loading toward return to training.",
  },
  {
    slug: "sports-rehabilitation",
    title: "Sports Rehabilitation",
    href: "/services/sports-rehabilitation",
    accent: "rehab",
    label: "05 / REHABILITATION",
    summary: "Progressive rehabilitation through to return to sport.",
    headline: "From injury back to performance.",
    intro:
      "Rehabilitation does not end when the pain does. It ends when the athlete can meet the demands of their sport again. Kinetic Edge runs rehabilitation as a progression with criteria at each stage — and the performance floor is part of it.",
    imageKey: "rehabilitation",
    cta: { label: "Book a Rehabilitation Assessment", href: "/contact" },
    blocks: [
      { title: "Criteria, not calendar", body: "Progression through each stage is earned by meeting criteria, rather than granted by time passing." },
      { title: "One continuous system", body: "Rehabilitation moves from the clinical environment onto the performance floor without a handover gap." },
      { title: "Post-operative rehabilitation", body: "Structured progression that works alongside the plan set by the athlete's surgeon or doctor." },
      { title: "Movement correction", body: "Addressing how the athlete moves, so the same problem is less likely to present again." },
      { title: "Reconditioning", body: "Rebuilding strength, power and conditioning to the level competition actually requires." },
      { title: "Return to sport", body: "Reintegration into full training and competition, with prevention work carried forward." },
    ],
    metaTitle: "Sports Rehabilitation & Return to Sport in Chennai",
    metaDescription:
      "Sports rehabilitation at Kinetic Edge, Chennai. A criteria-based progression from assessment and reloading through reconditioning to return to sport.",
  },
  {
    slug: "online-coaching",
    title: "Distance & Online Coaching",
    href: "/services/online-coaching",
    accent: "performance",
    label: "06 / PERFORMANCE",
    summary: "Structured coaching beyond the facility.",
    headline: "Structured coaching, beyond the facility.",
    intro:
      "Athletes who cannot train at Mogappair East can still be coached by Kinetic Edge. The process is the same one used on the floor — assess, prescribe, monitor, re-test — delivered remotely and built around the equipment and schedule actually available.",
    imageKey: "onlineCoaching",
    cta: { label: "Enquire About Online Coaching", href: "/contact" },
    blocks: [
      { title: "Built for the environment you train in", body: "The programme is written around the equipment, facility and time the athlete genuinely has access to." },
      { title: "Coached, not just programmed", body: "Execution, load and technique are reviewed — a written plan on its own is not coaching." },
      { title: "Progressed on evidence", body: "The programme moves forward on the work completed, not on a fixed schedule." },
      { title: "For athletes and general population", body: "Available to competitive athletes training elsewhere and to people training for their own goals." },
    ],
    metaTitle: "Online & Distance Coaching",
    metaDescription:
      "Distance and online coaching from Kinetic Edge, Chennai. Consultation, programme prescription, remote training, monitoring, feedback and progression.",
  },
];

export const getService = (slug: string) =>
  services.find((service) => service.slug === slug);

export const serviceSlugs = services.map((service) => service.slug);

/** Category split used on the services index page. */
export const serviceCategories = [
  {
    accent: "performance" as const,
    code: "01",
    title: "Performance",
    description:
      "The training environment. Physical qualities tested, trained and progressed against the demands of the sport.",
    items: [
      { label: "Strength & Conditioning", href: "/services/strength-conditioning" },
      { label: "Athlete Development", href: "/services/athlete-development" },
      { label: "Performance Testing", href: "/services/performance-testing" },
      { label: "Sports-Specific Conditioning", href: "/services/strength-conditioning" },
      { label: "Distance & Online Coaching", href: "/services/online-coaching" },
    ],
  },
  {
    accent: "rehab" as const,
    code: "02",
    title: "Rehabilitation",
    description:
      "The clinical environment. Assessment, treatment and progressive rehabilitation through to a criteria-based return to sport.",
    items: [
      { label: "Sports Physiotherapy", href: "/services/sports-physiotherapy" },
      { label: "Sports Rehabilitation", href: "/services/sports-rehabilitation" },
      { label: "Return to Sport", href: "/services/sports-rehabilitation" },
      { label: "Injury Prevention", href: "/services/sports-physiotherapy" },
      { label: "Mobility & Recovery", href: "/services/sports-physiotherapy" },
    ],
  },
];

/** Scrolling index of what happens across both environments. */
export const serviceMarqueeItems = [
  "Strength & Conditioning",
  "Sports Performance",
  "Athlete Development",
  "Physiotherapy",
  "Sports Rehabilitation",
  "Injury Prevention",
  "Return to Sport",
  "Performance Testing",
  "Mobility",
  "Recovery",
  "Online Coaching",
];
