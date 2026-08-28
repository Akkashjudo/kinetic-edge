import type { FaqItem } from "@/lib/types";

/**
 * Answers describe the approach only.
 *
 * Nothing here states a price, a session duration, a waiting time, a success
 * rate, a clinical outcome or a regulatory position — none of those are verified.
 */
export const servicesFaq: FaqItem[] = [
  {
    question: "Do I need to be a professional athlete?",
    answer:
      "No. Kinetic Edge works with elite and professional athletes, competitive and developing athletes, recreational athletes, general population and special population. The training is different for each; the process behind it is the same, and it starts with an assessment.",
  },
  {
    question: "What is the difference between Performance and Rehabilitation?",
    answer:
      "Performance is the training environment — where physical qualities are tested, trained and progressed against the demands of the sport. Rehabilitation is the clinical environment — assessment, treatment and progressive rehabilitation through to a criteria-based return to full training and competition. They are two environments inside one system, not two separate businesses.",
  },
  {
    question: "What does an assessment include?",
    answer:
      "An assessment establishes the starting point: training and injury history, current physical qualities, how you move, and what your sport or goal actually asks of you. What is measured depends on whether you are entering the performance pathway or the rehabilitation pathway. Everything prescribed afterwards is written against that baseline, and re-tested against it later.",
  },
  {
    question: "How is sports rehabilitation different from a general clinic?",
    answer:
      "Rehabilitation here is planned toward the demands of the sport rather than finishing at symptom relief. Progression through each stage is based on meeting criteria, and the performance floor is part of the process — so reloading, reconditioning and return-to-sport work happen inside the same system rather than being handed off.",
  },
  {
    question: "Do you work with youth athletes?",
    answer:
      "Yes. Long-term athletic development for youth athletes is part of the high performance programme, delivered with training age and stage of development in mind rather than as a scaled-down adult programme.",
  },
  {
    question: "Is online coaching available?",
    answer:
      "Yes. Distance and online coaching is available for athletes and for general population training away from the centre. It follows the same process — an initial consultation, a prescribed programme, remote training, monitoring, feedback and progression.",
  },
];

export const contactFaq: FaqItem[] = [
  {
    question: "What happens during my first assessment?",
    answer:
      "The first appointment is about establishing your starting point — your history, your current physical qualities or your injury, and what you are working toward. From there a programme is prescribed, the work is monitored as it is done, and progress is re-tested against the original baseline.",
  },
  {
    question: "Do I need a referral before booking physiotherapy?",
    answer:
      "You can enquire directly by phone or WhatsApp to arrange an assessment. If you are already under the care of a doctor or surgeon, share any reports, scans or post-operative instructions so that rehabilitation can be planned around the guidance you have already been given.",
  },
  {
    question: "What should I bring?",
    answer:
      "Training kit and the footwear you train or compete in. If you are coming for physiotherapy or rehabilitation, bring any relevant scans, reports or post-operative notes, and be ready to talk through how the injury happened and how it behaves.",
  },
  {
    question: "Can I train at one centre and rehab through the other?",
    answer:
      "Yes — that is the point of the two-environment model. Performance and rehabilitation operate as one connected system, so an athlete can be rehabilitating an injury and continuing to train the rest of their body without the two plans working against each other.",
  },
];
