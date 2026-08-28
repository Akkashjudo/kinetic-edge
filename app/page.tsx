import type { Metadata } from "next";
import { site } from "@/data/site";
import { Hero } from "@/components/sections/Hero";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { CentreSplit } from "@/components/sections/CentreSplit";
import { ServicesMarquee } from "@/components/sections/ServicesMarquee";
import { MethodProcess } from "@/components/sections/MethodProcess";
import { ProgrammeGrid } from "@/components/sections/ProgrammeGrid";
import { AthleteResults } from "@/components/sections/AthleteResults";
import { AudienceStrip } from "@/components/sections/AudienceStrip";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { EducationFeature } from "@/components/sections/EducationFeature";
import { PartnerSection } from "@/components/sections/PartnerSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: `${site.legalName} — Chennai`,
  description:
    "Kinetic Edge brings strength & conditioning, sport science, sports physiotherapy and rehabilitation into one connected athlete-development system in Mogappair East, Chennai.",
  alternates: { canonical: "/" },
};

/**
 * Homepage rhythm.
 *
 * Four high-emphasis moments — hero, two centres, method, athlete proof — with
 * everything between them deliberately quieter. Connective bands (the two
 * marquees and the audience strip) compress rather than repeat the standard
 * section beat, and the partner section is grounded dark so the run of light
 * sections toward the foot of the page breaks.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <CentreSplit />
      <ServicesMarquee />
      <MethodProcess />
      <ProgrammeGrid />
      <AthleteResults />
      <AudienceStrip />
      <TeamGrid index="06" variant="preview" />
      <EducationFeature index="07" />
      <PartnerSection index="08" />
      <LocationSection index="09" />
      <ContactCTA />
    </>
  );
}
