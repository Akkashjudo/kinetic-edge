import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { PageHero } from "@/components/ui/PageHero";
import { CTAButton } from "@/components/ui/CTAButton";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { CentreSplit } from "@/components/sections/CentreSplit";
import { MethodProcess } from "@/components/sections/MethodProcess";
import { AudienceStrip } from "@/components/sections/AudienceStrip";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Kinetic Edge is a high performance and rehabilitation centre in Mogappair East, Chennai, founded in 2020. Strength & conditioning, sport science and physiotherapy in one connected system.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        index="01"
        label="About Kinetic Edge"
        title="Performance is a process."
        lead={`Founded in ${site.founded}, Kinetic Edge is a high performance and rehabilitation centre in Mogappair East, Chennai — built so that training, testing and rehabilitation answer to the same plan.`}
        imageKey="facilityInterior"
        actions={
          <>
            <CTAButton href="/contact" variant="light">
              Book an Assessment
            </CTAButton>
            <CTAButton href="/services" variant="outlineLight">
              Explore Services
            </CTAButton>
          </>
        }
      />

      <BrandIntro />
      <StoryTimeline />
      <CentreSplit />
      {/* The full method treatment belongs here — this is where a reader has
          come to understand how the place works. */}
      <MethodProcess index="04" />
      <AudienceStrip />
      <TeamGrid index="05" variant="full" />
      <ContactCTA
        title="Start where every athlete starts."
        body="An assessment sets the baseline. Everything after it — training, testing or rehabilitation — is written against what it shows."
      />
    </>
  );
}
