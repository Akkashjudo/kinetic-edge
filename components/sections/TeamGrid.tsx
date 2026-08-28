import { team, teamByGroup } from "@/data/team";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamCard } from "@/components/ui/TeamCard";

/**
 * Verified names and roles only. No credentials, qualifications or biographies
 * are shown, because none are verified.
 *
 * Two modes:
 *  · preview — a handful of the team plus a link through to the directory. Used
 *    on the homepage, where eleven staff cards cost 1,700px and persuade less
 *    than the sections around them.
 *  · full — the grouped directory, on /about.
 *
 * Entrance is deliberately group-level, not per card. Eleven individual reveals
 * put more choreography into a staff list than into the method section.
 */
export function TeamGrid({
  index = "06",
  variant = "full",
  showCta = true,
}: {
  index?: string;
  variant?: "preview" | "full";
  showCta?: boolean;
}) {
  if (variant === "preview") {
    /**
     * Prefer the people who have a real photograph, so the homepage row reads as
     * one complete set of faces rather than a mix of portraits and initials.
     * Falls back to leadership and department heads while photography is thin,
     * and re-balances on its own as more portraits are supplied.
     */
    const photographed = team.filter((member) => member.image);
    const bySeniority = [
      ...team.filter((member) => member.group === "Leadership"),
      ...team.filter(
        (member) =>
          member.role.startsWith("Head") ||
          member.role.startsWith("Consultant Physio"),
      ),
    ];
    const featured = (
      photographed.length >= 4 ? photographed : bySeniority
    ).slice(0, 5);

    return (
      <section data-accent="performance" className="ke-section bg-bone">
        <Container>
          <Reveal>
            <SectionHeading
              index={index}
              label="Team"
              title="The team behind the system."
              lead="Coaching, sport science and clinical practice under one roof — so an athlete is supported by the same group whether they are training or rehabilitating."
              aside={
                <CTAButton href="/about#team" variant="outline">
                  Meet the full team
                </CTAButton>
              }
            />
          </Reveal>

          {/* One reveal for the whole row. */}
          <Reveal delay={0.06}>
            <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:mt-18 lg:grid-cols-5 lg:gap-x-6">
              {featured.map((member) => (
                <li key={member.name}>
                  <TeamCard member={member} />
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="team"
      data-accent="performance"
      className="ke-section bg-bone scroll-mt-24"
    >
      <Container>
        <Reveal>
          <SectionHeading
            index={index}
            label="Team"
            title="The team behind the system."
            lead="Coaching, sport science and clinical practice under one roof — so an athlete is supported by the same group whether they are training or rehabilitating."
            aside={
              showCta ? (
                <CTAButton href="/contact" variant="outline">
                  Work with the team
                </CTAButton>
              ) : undefined
            }
          />
        </Reveal>

        <div className="mt-14 space-y-14 lg:mt-18 lg:space-y-16">
          {teamByGroup.map((band, bandIndex) => (
            /* One reveal per band — three in total, rather than eleven. */
            <Reveal key={band.group} delay={bandIndex * 0.08}>
              <h3 className="ke-label mb-7 border-t border-line pt-5 text-steel">
                {band.group}
              </h3>
              <ul className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-6">
                {band.members.map((member) => (
                  <li key={member.name}>
                    <TeamCard member={member} />
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
