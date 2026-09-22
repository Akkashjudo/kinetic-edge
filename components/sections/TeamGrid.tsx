import { teamByGroup } from "@/data/team";
import { primaryCta } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamCard } from "@/components/ui/TeamCard";

/**
 * The full team directory, grouped by department — /about only. The homepage
 * shows a row of faces instead (AboutPreview).
 *
 * Verified names and roles only. No credentials, qualifications or biographies
 * are shown, because none are verified. Departments with nobody named in them
 * are not rendered at all.
 *
 * Entrance is group-level, not per card: eleven individual reveals would put
 * more choreography into a staff list than into anything else on the page.
 */
export function TeamGrid({ index = "05" }: { index?: string }) {
  return (
    <section
      id="team"
      data-accent="performance"
      className="ke-section bg-paper"
    >
      <Container>
        <Reveal>
          <SectionHeading
            index={index}
            label="Team"
            title="The team behind the system."
            lead="Coaching, sport science and clinical practice under one roof — so an athlete is supported by the same group whether they are training or rehabilitating."
            aside={
              <CTAButton href={primaryCta.href} variant="outline">
                Work with the team
              </CTAButton>
            }
          />
        </Reveal>

        <div className="mt-14 space-y-14 lg:mt-18 lg:space-y-16">
          {teamByGroup.map((band, bandIndex) => (
            <Reveal key={band.group} delay={bandIndex * 0.06}>
              <h3 className="ke-label mb-7 border-t border-line pt-5 text-steel">
                {band.group}
              </h3>
              <ul className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-6">
                {band.members.map((member) => (
                  <li key={member.name}>
                    <TeamCard member={member} headingLevel="h4" />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
