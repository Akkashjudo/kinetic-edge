import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { competitions } from "@/data/competitions";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PartnerSection } from "@/components/sections/PartnerSection";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = pageMetadata({
  title: "Partners",
  description:
    "VALD Performance is the technology and testing partner of Kinetic Edge, Chennai — supporting objective performance testing and re-testing.",
  path: "/partners",
});

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
        index="06"
        label="Partners"
        title="Performance requires the right tools."
        lead="Kinetic Edge names the technology it uses. Only confirmed partners appear on this page."
        actions={
          <CTAButton href="/services/performance-testing" variant="light">
            Performance Testing
          </CTAButton>
        }
      />

      <PartnerSection
        index="01"
        title="Technology & testing."
        lead="Objective measurement sits underneath the method — it is what makes assess and re-test mean something."
      />

      {/* ⚠ Competitions are NOT partners. Kept in a separate, clearly labelled
          section so the two can never be read as the same thing. */}
      <section data-accent="performance" className="ke-section bg-bone">
        <Container>
          <Reveal>
            <SectionHeading
              index="03"
              label="Competitions"
              title="Competitions our athletes participate in."
              lead="These are events Kinetic Edge athletes have competed at. They are competitions, not partners, sponsors or affiliations."
            />
          </Reveal>

          {/* A plain index, deliberately different from the card grid on
              /athletes so the two pages do not read as duplicates. */}
          <Reveal delay={0.06}>
            <ul className="mt-12 border-t border-line lg:mt-16">
              {competitions.map((competition, index) => (
                <li
                  key={competition}
                  className="flex items-baseline gap-5 border-b border-line py-4 sm:gap-8 sm:py-5"
                >
                  <span className="ke-label w-6 shrink-0 text-steel">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-base font-bold leading-snug tracking-[-0.025em] text-ink sm:text-lg lg:text-xl">
                    {competition}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
