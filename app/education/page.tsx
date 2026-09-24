import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { CTAButton } from "@/components/ui/CTAButton";
import { PageHero } from "@/components/ui/PageHero";
import { CollaborationTimeline } from "@/components/sections/CollaborationTimeline";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = pageMetadata({
  title: "KE Education",
  description:
    "KE Education — the camps, workshops, assessments and collaborations Kinetic Edge has delivered with schools, networks and institutions across Chennai and Tamil Nadu since 2023.",
  path: "/education",
});

/**
 * KE Education.
 *
 * One record: the collaborations, year by year. The workshop feature, the
 * focus-area grid and the announcements block were all removed at the client's
 * request on 25 Sep 2026 — the section is the collaborations and nothing else.
 *
 * No attendance figures, outcomes, feedback or upcoming dates are fabricated
 * anywhere on this page.
 */
export default function EducationPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "KE Education", path: "/education" },
        ]}
      />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "KE Education" }]}
        label="KE Education"
        title="From practice to education."
        lead="Sharing practical knowledge in strength & conditioning, sports science and performance development."
        actions={
          <CTAButton href={site.links.instagram} external variant="outlineLight">
            Follow for announcements
          </CTAButton>
        }
      />

      <CollaborationTimeline index="01" surface="paper" />

      <ContactCTA
        surface="bone"
        title="Bring KE Education to Your Group"
        body="For camps, workshops or applied sessions with your school, club or team, get in touch by phone or WhatsApp."
      />
    </>
  );
}
