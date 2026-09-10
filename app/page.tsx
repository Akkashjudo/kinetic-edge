import type { Metadata } from "next";
import { site } from "@/data/site";
import { Hero } from "@/components/sections/Hero";
import { AudienceCards } from "@/components/sections/AudienceCards";
import { PillarSystem } from "@/components/sections/PillarSystem";
import { ServicesMarquee } from "@/components/sections/ServicesMarquee";
import { CentreSplit } from "@/components/sections/CentreSplit";
import { ProgrammeGrid } from "@/components/sections/ProgrammeGrid";
import { AmbassadorFeature } from "@/components/sections/AmbassadorFeature";
import { WhyKineticEdge } from "@/components/sections/WhyKineticEdge";
import { AthleteResults } from "@/components/sections/AthleteResults";
import { CollaborationTimeline } from "@/components/sections/CollaborationTimeline";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { PartnerSection } from "@/components/sections/PartnerSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: `${site.legalName} — Chennai`,
  description:
    "Kinetic Edge is an integrated human performance ecosystem in Mogappair East, Chennai — strength & conditioning, physiotherapy & rehabilitation, sport nutrition, sport psychology and recovery, for athletes and everyday people.",
  alternates: { canonical: "/" },
};

/**
 * Homepage.
 *
 * Ordered so a visitor answers seven questions in sequence: what this is, who
 * it is for, how the system works, what it costs them to start, who vouches for
 * it, who does the work, and where to go.
 *
 * Rhythm is carried by the four section scales — connective bands compress
 * between the heavier blocks, and only the true signature moments (hero, the six
 * pillars, the ambassador) take `ke-section-lg`.
 */
export default function HomePage() {
  return (
    <>
      {/* 1 — What this is */}
      <Hero />

      {/* 2 — Who it is for */}
      <AudienceCards index="02" />

      {/* 3 — How the system works: ASSESS → … → RECOVER */}
      <PillarSystem index="03" />
      <ServicesMarquee />

      {/* 4 — Where it happens */}
      <CentreSplit />

      {/* 5 — How to work with us */}
      <ProgrammeGrid index="05" />

      {/* 6 — Who vouches for it */}
      <AmbassadorFeature index="06" />

      {/* 7 — Why this approach */}
      <WhyKineticEdge index="07" />

      {/* 8 — Proof, when the verified results land */}
      <AthleteResults index="08" />

      {/* 9 — Track record */}
      <CollaborationTimeline index="09" />

      {/* 10 — Who does the work */}
      <TeamGrid index="10" variant="preview" />

      {/* 11 — Technology and apparel partners */}
      <PartnerSection index="11" />

      {/* 12 — Where to find us, and how to start */}
      <LocationSection index="12" />
      <ContactCTA
        title="Start your performance journey."
        body="Whether you're training for competition, returning from injury or simply trying to move and perform better — start with the right assessment and plan."
      />
    </>
  );
}
