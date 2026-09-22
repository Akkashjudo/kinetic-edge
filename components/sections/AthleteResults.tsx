import { athleteResults, hasAthleteResults } from "@/data/athlete-results";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResultsGrid } from "./ResultsGrid";

/**
 * Homepage proof — verified competition results.
 *
 * The composition is built and waiting: one featured record leads, six
 * supporting records follow, and the whole section appears the moment
 * `data/athlete-results.ts` is populated.
 *
 * Until then it renders nothing at all. An empty results heading on the
 * homepage promised proof it could not show; nothing is fabricated to fill the
 * gap — no placeholder athletes, no medal totals, no counts.
 */
export function AthleteResults({ index }: { index?: string }) {
  if (!hasAthleteResults) return null;

  // One featured record plus six supporting ones. The full archive is /athletes.
  const featured = athleteResults.filter((result) => result.featured).slice(0, 1);
  const supporting = athleteResults
    .filter((result) => !featured.includes(result))
    .slice(0, 6);

  return (
    <section className="ke-section-lg bg-bone">
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

      <Container className="mt-14 lg:mt-18">
        <ResultsGrid results={[...featured, ...supporting]} showFilters={false} />
      </Container>
    </section>
  );
}
