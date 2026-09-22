import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { primaryCta, site } from "@/data/site";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { PageHero } from "@/components/ui/PageHero";
import { CTAButton } from "@/components/ui/CTAButton";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { WhyKineticEdge } from "@/components/sections/WhyKineticEdge";
import { CentreCards } from "@/components/sections/CentreCards";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Kinetic Edge is a high performance and rehabilitation centre in Chennai, founded in 2020. Strength & conditioning, sport science and physiotherapy in one connected system, across two specialised centres.",
  path: "/about",
});

/**
 * About — where the detail lives.
 *
 * The homepage carries a short introduction; this page carries the philosophy,
 * the full history, how the work is done, both centres and the complete team.
 * Collaborations now live under KE Education.
 */
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
        label="About Kinetic Edge"
        title="Optimising human performance."
        lead={`Founded in ${site.founded} by Deepak, a Sports Science graduate, and co-founded by Lakshmi Priyanka Subramanian, a professional badminton player — Kinetic Edge has grown from a strength & conditioning freelance practice into an integrated human performance ecosystem.`}
        imageKey="facilityInterior"
        actions={
          <>
            <CTAButton href={primaryCta.href} variant="light">
              {primaryCta.label}
            </CTAButton>
            <CTAButton href="/services" variant="outlineLight">
              Explore Services
            </CTAButton>
          </>
        }
      />

      <BrandIntro />
      <StoryTimeline />
      <WhyKineticEdge index="03" />
      <CentreCards index="04" surface="bone" />
      <TeamGrid index="05" />
      <ContactCTA
        surface="bone"
        title="Start Where Every Athlete Starts"
        body="An assessment sets the baseline. Everything after it — training, testing or rehabilitation — is written against what it shows."
      />
    </>
  );
}
