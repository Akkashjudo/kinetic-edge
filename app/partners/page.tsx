import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { CTAButton } from "@/components/ui/CTAButton";
import { PageHero } from "@/components/ui/PageHero";
import { PartnerSection } from "@/components/sections/PartnerSection";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = pageMetadata({
  title: "Partners",
  description:
    "Hundred, apparel sponsor — the confirmed partner of Kinetic Edge, Chennai.",
  path: "/partners",
});

/**
 * Confirmed partners only. The competitions list that used to follow was
 * removed at the client's request; competitions are never shown as partners.
 * The VALD Performance partnership was removed on 25 Sep 2026.
 */
export default function PartnersPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Partners", path: "/partners" },
        ]}
      />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Partners" }]}
        label="Partners"
        title="Who Kinetic Edge works with."
        lead="Only confirmed partners appear on this page. Nothing here is a sponsorship Kinetic Edge has not agreed."
        actions={
          <CTAButton href="/services/athlete-performance" variant="light">
            Athlete Performance Training
          </CTAButton>
        }
      />

      <PartnerSection index="01" variant="full" />

      <ContactCTA surface="bone" />
    </>
  );
}
