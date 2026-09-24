import type { Metadata } from "next";
import { collaborations } from "@/data/collaborations";
import { site } from "@/data/site";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { AudienceCards } from "@/components/sections/AudienceCards";
import { CentreCards } from "@/components/sections/CentreCards";
import { AthleteAmbassadors } from "@/components/sections/AthleteAmbassadors";
import { AthleteShowcase } from "@/components/sections/AthleteShowcase";
import { MethodProcess } from "@/components/sections/MethodProcess";
import { PartnerSection } from "@/components/sections/PartnerSection";
import { CollaborationTimeline } from "@/components/sections/CollaborationTimeline";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { CTAButton } from "@/components/ui/CTAButton";

export const metadata: Metadata = {
  title: `${site.legalName} — Chennai`,
  description:
    "High-performance training, strength & conditioning, sports rehabilitation and performance development in Chennai — for athletes and individuals who want to perform at their best.",
  alternates: { canonical: "/" },
};

/**
 * Homepage.
 *
 * Clear first. Premium second. Animated third.
 *
 * Each section answers one question a first-time visitor has, in the order
 * they have it:
 *
 *   What is this?                 Hero
 *   How can it help me?           Services
 *   Is it for someone like me?    Who we work with
 *   Where is it?                  Two centres
 *   Who represents it?            Athlete ambassador
 *   Does the training work?       Athletes and their results
 *   How does it work?             The Kinetic Edge System
 *   What is it built on?          Partners · Collaborations
 *   Who is behind it?             About + team
 *   What do I do next?            Final call to action
 *
 * Light and dark alternate deliberately: the hero and the ambassador are the
 * only full dark bands, so no two dark sections ever stack.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview index="02" />
      <AudienceCards index="03" />
      <CentreCards index="04" />
      <AthleteAmbassadors index="05" />
      <AthleteShowcase index="06" variant="preview" surface="paper" />
      <MethodProcess index="07" />
      <PartnerSection index="08" variant="strip" />

      {/* KE Education — the collaborations record, and nothing else. */}
      <CollaborationTimeline
        index="09"
        events={collaborations.slice(0, 5)}
        surface="bone"
        aside={
          <CTAButton href="/education" variant="outline">
            All collaborations
          </CTAButton>
        }
      />

      <AboutPreview index="10" />
      <ContactCTA />
    </>
  );
}
