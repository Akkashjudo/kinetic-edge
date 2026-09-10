import { athleteResults, hasAthleteResults } from "@/data/athlete-results";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResultsGrid } from "./ResultsGrid";

/**
 * Homepage proof — signature moment 04.
 *
 * Verified competition results are the primary proof on this site. The
 * composition is built and waiting: one featured record leads, six supporting
 * records follow, and the whole thing renders the moment
 * `data/athlete-results.ts` is populated.
 *
 * Until then the section stands on its heading and hands over to the verified
 * competition band that follows it. Nothing is fabricated to fill the gap — no
 * placeholder athletes, no medal totals, no counts.
 */
export function AthleteResults({ index = "05" }: { index?: string }) {
  // One featured record plus six supporting ones. The full archive is /athletes.
  const featured = athleteResults.filter((result) => result.featured).slice(0, 1);
  const supporting = athleteResults
    .filter((result) => !featured.includes(result))
    .slice(0, 6);

  return (
    <section className={hasAthleteResults ? "ke-section-lg bg-bone" : "ke-section bg-bone"}>
      <Container>
        <Reveal>
          <SectionHeading
            index={index}
            label="Athletes"
            title={
              <>
                Performance, measured
                <br />
                in competition.
              </>
            }
            lead="Training matters when it transfers to performance."
            aside={
              <CTAButton href="/athletes" variant="outline">
                All athlete results
              </CTAButton>
            }
          />
        </Reveal>
      </Container>

      {hasAthleteResults ? (
        <Container className="mt-14 lg:mt-18">
          <ResultsGrid
            results={[...featured, ...supporting]}
            showFilters={false}
          />
        </Container>
      ) : null}
    </section>
  );
}
