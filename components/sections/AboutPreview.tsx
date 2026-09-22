import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aboutSummary } from "@/data/story";
import { team } from "@/data/team";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TeamCard } from "@/components/ui/TeamCard";

/**
 * About Kinetic Edge, on the homepage — who is behind it, in one screen.
 *
 * A short introduction, the philosophy, and the team as faces. The history,
 * the approach in full and the complete team directory all live on /about;
 * nothing here tries to be that page.
 *
 * The team row prefers people with a real photograph, so it reads as one set of
 * portraits rather than a mix of faces and initials. It rebalances on its own as
 * more portraits are supplied.
 */
export function AboutPreview({ index = "09" }: { index?: string }) {
  const photographed = team.filter((member) => member.image).slice(0, 6);

  return (
    <section data-accent="performance" className="ke-section bg-paper">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionLabel index={index} className="mb-6">
              About Kinetic Edge
            </SectionLabel>
            <h2 className="ke-h2 max-w-[13ch] text-ink">{aboutSummary.mission}</h2>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-7 lg:pt-11">
            <p className="ke-lead max-w-2xl text-ink/85">{aboutSummary.intro}</p>
            <p className="ke-body mt-5 max-w-2xl text-steel">{aboutSummary.philosophy}</p>
            <div className="mt-9">
              <CTAButton href="/about" variant="primary">
                About Kinetic Edge
              </CTAButton>
            </div>
          </Reveal>
        </div>

        {photographed.length > 0 ? (
          <div className="mt-16 border-t border-line pt-10 lg:mt-20">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <p className="ke-label text-steel">The team</p>
                <Link
                  href="/about#team"
                  className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink transition-colors hover:text-accent-ink"
                >
                  <span className="ke-underline">Meet the full team</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </Reveal>

            {/* One reveal for the row, not one per face. */}
            <Reveal delay={0.06}>
              <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 xl:grid-cols-6">
                {photographed.map((member) => (
                  <li key={member.name}>
                    <TeamCard member={member} />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
