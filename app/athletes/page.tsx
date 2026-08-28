import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { athleteResults, hasAthleteResults } from "@/data/athlete-results";
import { competitions } from "@/data/competitions";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Figure } from "@/components/ui/Figure";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealMask } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResultsGrid } from "@/components/sections/ResultsGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = pageMetadata({
  title: "Athletes",
  description:
    "Kinetic Edge athletes compete at state, national and international level. Verified competition results from athletes training in Mogappair East, Chennai.",
  path: "/athletes",
});

/**
 * The athlete archive.
 *
 * Image-led by construction: the verified results render as a featured record
 * plus a filterable archive the moment `data/athlete-results.ts` is populated,
 * and until then the page leans on training photography rather than four
 * screens of type.
 *
 * The method section was removed from this page — it was filler here, and it
 * appears in full on the homepage, /about and /services.
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
        index="04"
        label="Athletes"
        title="The work shows up in competition."
        lead="Training is judged by what it transfers to. These are the competitions Kinetic Edge athletes step onto."
        imageKey="athletesHero"
        actions={
          <CTAButton href="/contact" variant="light">
            Train with Kinetic Edge
          </CTAButton>
        }
      />

      {/* Verified results. Renders as soon as data/athlete-results.ts is filled. */}
      {hasAthleteResults ? (
        <section className="ke-section-lg bg-paper">
          <Container>
            <Reveal>
              <SectionHeading
                index="01"
                label="Results"
                title="Verified competition results."
                lead="Every result listed here is verified. Nothing is aggregated into medal totals or athlete counts."
                className="mb-14"
              />
            </Reveal>
          </Container>

          <Container>
            <ResultsGrid results={athleteResults} />
          </Container>
        </section>
      ) : (
        /* Honest interim state. No fabricated proof — training photography and
           the verified competition list carry the page until results arrive. */
        <section className="ke-section bg-paper">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal>
                <SectionHeading
                  index="01"
                  label="The work"
                  title="Prepared for the demands of the sport."
                  lead="Every athlete who competes under the Kinetic Edge name is assessed, prescribed for, monitored and re-tested. What follows is where that preparation is put to the test."
                />
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

      {/* Competitions — verified, secondary proof, and never presented as partners. */}
      <section className="ke-section bg-bone">
        <Container>
          <Reveal>
            <SectionHeading
              index={hasAthleteResults ? "02" : "02"}
              label="Competitions"
              title="Where our athletes compete."
              lead="Kinetic Edge athletes compete at state, national and international level across a range of sports."
            />
          </Reveal>

          {/* Not links — so they carry no hover state implying they are. */}
          <Reveal delay={0.06}>
            <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-18 lg:grid-cols-4">
              {competitions.map((competition, index) => (
                <li
                  key={competition}
                  className="flex min-h-36 flex-col justify-between gap-6 bg-paper p-6 lg:min-h-44 lg:p-7"
                >
                  <span className="ke-label text-steel">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-base font-bold leading-snug tracking-[-0.025em] text-ink lg:text-lg">
                    {competition}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <ContactCTA
        title="Train where the work is measured."
        body="Every athlete starts the same way — an assessment that sets the baseline the programme is written against."
      />
    </>
  );
}
