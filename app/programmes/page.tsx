import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { programmes } from "@/data/programmes";
import { primaryCta } from "@/data/site";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { CTAButton } from "@/components/ui/CTAButton";
import { PageHero } from "@/components/ui/PageHero";
import { ProgrammeGrid } from "@/components/sections/ProgrammeGrid";
import { MethodProcess } from "@/components/sections/MethodProcess";
import { AudienceCards } from "@/components/sections/AudienceCards";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = pageMetadata({
  title: "Programmes",
  description:
    "Group High Performance, Hybrid High Performance, High Performance PRO, Online Coaching and Distance Coaching at Kinetic Edge, Chennai — compared by frequency, format and individualisation.",
  path: "/programmes",
});

export default function ProgrammesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Programmes", path: "/programmes" },
        ]}
      />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Programmes" }]}
        label="Programmes"
        title="Find the format that fits."
        lead={`${programmes.length} ways to train with Kinetic Edge — in a squad, in a small group, one to one, or remotely from wherever you are based.`}
        actions={
          <CTAButton href={primaryCta.href} variant="light">
            {primaryCta.label}
          </CTAButton>
        }
      />

      <ProgrammeGrid index="01" />

      {/* The process is the same whichever format is chosen. */}
      <MethodProcess index="02" variant="compact" tone="dark" />

      <AudienceCards index="03" />

      <ContactCTA
        title="Not Sure Which One?"
        body="Start with a consultation. What the assessment shows decides the programme — not the other way round."
      />
    </>
  );
}
