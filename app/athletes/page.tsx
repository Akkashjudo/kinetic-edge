import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { primaryCta } from "@/data/site";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { CTAButton } from "@/components/ui/CTAButton";
import { PageHero } from "@/components/ui/PageHero";
import { AthleteAmbassadors } from "@/components/sections/AthleteAmbassadors";
import { AthleteShowcase } from "@/components/sections/AthleteShowcase";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = pageMetadata({
  title: "Athletes",
  description:
    "Athletes who train at Kinetic Edge, Chennai — verified results in badminton, table tennis and cycling, and athlete ambassador Sankar Muthusamy.",
  path: "/athletes",
});

/**
 * Athletes.
 *
 * The ambassador leads, then every athlete with a verified result. Both read
 * from data — data/ambassadors.ts and data/athletes.ts — so a new result or a
 * new athlete appears here by editing data alone.
 *
 * The competitions list that used to sit here was removed at the client's
 * request ("Where Our Athletes Compete"). Its data remains in
 * data/competitions.ts, unrendered.
 */
export default function AthletesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Athletes", path: "/athletes" },
        ]}
      />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Athletes" }]}
        label="Athletes"
        title="The work shows up in competition."
        lead="Training is judged by what it transfers to. These are the athletes who train at Kinetic Edge, and the results they have on record."
        imageKey="athletesHero"
        actions={
          <CTAButton href={primaryCta.href} variant="light">
            {primaryCta.label}
          </CTAButton>
        }
      />

      <AthleteAmbassadors index="01" tone="light" />

      <AthleteShowcase index="02" variant="full" surface="bone" />

      <ContactCTA
        title="Train Where the Work Is Measured"
        body="Every athlete starts the same way — an assessment that sets the baseline the programme is written against."
      />
    </>
  );
}
