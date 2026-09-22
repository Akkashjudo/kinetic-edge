import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { athleteResults, hasAthleteResults } from "@/data/athlete-results";
import { primaryCta } from "@/data/site";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Figure } from "@/components/ui/Figure";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealMask } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AthleteAmbassadors } from "@/components/sections/AthleteAmbassadors";
import { ResultsGrid } from "@/components/sections/ResultsGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = pageMetadata({
  title: "Athletes",
  description:
    "Athletes who represent Kinetic Edge, Chennai — including international badminton player and former World Junior No. 1 Sankar Muthusamy.",
  path: "/athletes",
});

/**
 * Athletes.
 *
 * The ambassadors lead. Verified competition results follow the moment
 * `data/athlete-results.ts` is populated; until then an honest interim section
 * describes the preparation instead, with nothing fabricated to fill the gap.
 *
 * The competitions list that used to sit here was removed at the client's
 * request ("Where Our Athletes Compete"). Its data remains in
 * data/competitions.ts.
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
        lead="Training is judged by what it transfers to. Every athlete here is assessed, programmed, tracked and re-tested — then they compete."
        imageKey="athletesHero"
        actions={
          <CTAButton href={primaryCta.href} variant="light">
            {primaryCta.label}
          </CTAButton>
        }
      />

      <AthleteAmbassadors index="01" tone="light" showCta={false} />

      {hasAthleteResults ? (
        <section className="ke-section-lg bg-bone">
          <Container>
            <Reveal>
              <SectionHeading
                index="02"
                label="Results"
                title="Verified competition results."
                lead="Every result listed here is verified. Nothing is aggregated into medal totals or athlete counts."
                className="mb-14"
              />
            </Reveal>
            <ResultsGrid results={athleteResults} />
          </Container>
        </section>
      ) : (
        <section className="ke-section bg-bone">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal>
                <SectionHeading
                  index="02"
                  label="The work"
                  title="Prepared for the demands of the sport."
                  lead="Every athlete who competes under the Kinetic Edge name is assessed, given an individual plan, tracked and re-tested. Competition is where that preparation is put to the test."
                />
                <div className="mt-9">
                  <CTAButton href="/services/athlete-performance" variant="outline">
                    Athlete Performance Training
                  </CTAButton>
                </div>
              </Reveal>

              <RevealMask delay={0.08}>
                <Figure
                  imageKey="sprinting"
                  ratio="4/3"
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  tone="dark"
                />
              </RevealMask>
            </div>
          </Container>
        </section>
      )}

      <ContactCTA
        title="Train Where the Work Is Measured"
        body="Every athlete starts the same way — an assessment that sets the baseline the programme is written against."
      />
    </>
  );
}
