import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aboutSummary } from "@/data/story";
import { team } from "@/data/team";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealMask } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TeamCard } from "@/components/ui/TeamCard";

/**
 * About Kinetic Edge, on the homepage — who is behind it, in one screen.
 *
 * The two founders carry the section: the pair photograph leads and the
 * founder portrait sits beneath it, offset, so the pair reads as one
 * art-directed composition rather than two tiles in a grid. Both are real
 * supplied photographs; nothing here is a placeholder plate.
 *
 * The history, the approach in full and the complete team directory live on
 * /about; nothing here tries to be that page.
 *
 * The team row prefers people with a real photograph, so it reads as one set of
 * portraits rather than a mix of faces and initials. It rebalances on its own
 * as more portraits are supplied.
 */
export function AboutPreview({ index = "10" }: { index?: string }) {
  const photographed = team.filter((member) => member.image).slice(0, 6);

  return (
    <section data-accent="performance" className="ke-section bg-paper">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel index={index} className="mb-6">
                About Kinetic Edge
              </SectionLabel>
              <h2 className="ke-h2 max-w-[13ch] text-ink">{aboutSummary.mission}</h2>
              <p className="ke-lead mt-7 max-w-xl text-ink/85">{aboutSummary.intro}</p>
              <p className="ke-body mt-5 max-w-xl text-steel">{aboutSummary.philosophy}</p>
              <div className="mt-9">
                <CTAButton href="/about" variant="primary">
                  About Kinetic Edge
                </CTAButton>
              </div>
            </Reveal>
          </div>

          {/* The founders. Two frames, offset, rather than a tidy pair. */}
          <div className="grid grid-cols-5 items-start gap-4 lg:col-span-7 lg:gap-6">
            <RevealMask className="col-span-3">
              <Figure
                imageKey="foundersTogether"
                ratio="4/5"
                sizes="(min-width: 1024px) 34vw, 55vw"
                tone="dark"
              />
            </RevealMask>

            <RevealMask delay={0.12} className="col-span-2 mt-10 lg:mt-20">
              <Figure
                imageKey="founder"
                ratio="4/5"
                sizes="(min-width: 1024px) 23vw, 37vw"
                tone="dark"
              />
            </RevealMask>
          </div>
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
