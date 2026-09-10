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
import { AudienceCards } from "@/components/sections/AudienceCards";
import { CollaborationTimeline } from "@/components/sections/CollaborationTimeline";
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
        title="Optimising human performance."
        lead={`Founded in ${site.founded} by Deepak, a Sports Science graduate, and co-founded by Lakshmi Priyanka Subramanian, a professional badminton player — Kinetic Edge has grown from a strength & conditioning freelance practice into an integrated human performance ecosystem.`}
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
      <AudienceCards index="05" />
      <CollaborationTimeline index="06" />
      <TeamGrid index="07" variant="full" />
      <ContactCTA
        title="Start where every athlete starts."
        body="An assessment sets the baseline. Everything after it — training, testing or rehabilitation — is written against what it shows."
      />
    </>
  );
}
