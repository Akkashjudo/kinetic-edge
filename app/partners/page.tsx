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
    "VALD Performance, technology and testing partner, and Hundred, apparel sponsor — the confirmed partners of Kinetic Edge, Chennai.",
  path: "/partners",
});

/**
 * Confirmed partners only. The competitions list that used to follow was
 * removed at the client's request; competitions are never shown as partners.
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
        title="Performance requires the right tools."
        lead="Kinetic Edge names the technology it uses. Only confirmed partners appear on this page."
        actions={
          <CTAButton href="/services/athlete-performance" variant="light">
            Athlete Performance Training
          </CTAButton>
        }
      />

      <PartnerSection
        index="01"
        variant="full"
        title="Technology, testing and kit."
        lead="Objective measurement sits underneath the process — it is what makes assess and re-test mean something."
      />

      <ContactCTA surface="bone" />
    </>
  );
}
