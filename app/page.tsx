import type { Metadata } from "next";
import { site } from "@/data/site";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { AudienceCards } from "@/components/sections/AudienceCards";
import { CentreCards } from "@/components/sections/CentreCards";
import { AthleteAmbassadors } from "@/components/sections/AthleteAmbassadors";
import { AthleteResults } from "@/components/sections/AthleteResults";
import { MethodProcess } from "@/components/sections/MethodProcess";
import { PartnerSection } from "@/components/sections/PartnerSection";
import { EducationPreview } from "@/components/sections/EducationPreview";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";

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
 *   Who trusts it?                Athlete ambassadors (+ results, once supplied)
 *   How does it work?             The Kinetic Edge System
 *   What is it built on?          Partners · KE Education
 *   Who is behind it?             About + team
 *   What do I do next?            Final call to action
 *
 * Light and dark alternate deliberately: the hero and the ambassadors are the
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
      {/* Renders nothing until verified results exist in data/athlete-results.ts. */}
      <AthleteResults />
      <MethodProcess index="06" />
      <PartnerSection index="07" variant="strip" />
      <EducationPreview index="08" />
      <AboutPreview index="09" />
      <ContactCTA />
    </>
  );
}
