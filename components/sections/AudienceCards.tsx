import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Sprout,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { audiences } from "@/data/programmes";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const ICONS: Record<string, LucideIcon> = {
  trophy: Trophy,
  sprout: Sprout,
  users: Users,
  activity: Activity,
};

/**
 * Who Kinetic Edge works with.
 *
 * The content document's first point: performance is not only for elite
 * athletes. Each row ends on the service that visitor should look at first, so
 * the section answers "is this for me?" and "where do I go?" together.
 *
 * Deliberately NOT a card grid. It sits directly under the four service cards,
 * and a second four-up grid of the same shape made the page read as a template.
 * This is an index: the heading holds the left column and stays put while four
 * full-width rows run past it. Same design system, different instrument.
 *
 * The whole row is the link — one stretched anchor, so it is a single tab stop
 * and a single announcement rather than a row plus a link inside it.
 */
export function AudienceCards({
  index = "03",
  title = "Built for Every Level of Performance",
  lead = "Performance isn't only for elite athletes. It's your ability to do what matters to you — better.",
}: {
  index?: string;
  title?: string;
  lead?: string;
}) {
  return (
    <section data-accent="performance" className="ke-section bg-bone">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20 xl:gap-28">
          <Reveal>
            {/* Sticky only where there is room for it to travel. */}
            <div className="lg:sticky lg:top-32">
              <SectionLabel index={index} className="mb-6">
                Who We Work With
              </SectionLabel>
              <h2 className="ke-h2 max-w-[14ch] text-ink">{title}</h2>
              <p className="ke-lead mt-6 max-w-md">{lead}</p>
            </div>
          </Reveal>

          <ol className="border-b border-line">
            {audiences.map((audience, i) => {
              const Icon = ICONS[audience.icon] ?? Users;

              return (
                <Reveal key={audience.code} as="li" delay={Math.min(i, 3) * 0.06}>
                  <Link
                    href={audience.href}
                    className="group relative block border-t border-line py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:py-9"
                  >
                    {/* The rule above the row draws in on hover. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -top-px h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-ke)] group-hover:scale-x-100"
                    />

                    <div className="grid gap-x-8 gap-y-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
                      <div className="flex gap-4 sm:gap-6">
                        <span className="flex shrink-0 items-center gap-2.5 pt-1">
                          <span className="ke-label text-steel">
                            {audience.code}
                          </span>
                          <Icon
                            aria-hidden="true"
                            strokeWidth={1.75}
                            className="h-4 w-4 text-accent-ink transition-transform duration-500 ease-[var(--ease-ke)] group-hover:scale-110"
                          />
                        </span>

                        <div className="min-w-0">
                          <h3 className="font-display text-xl font-bold leading-tight tracking-[-0.025em] text-ink transition-colors duration-300 group-hover:text-accent-ink lg:text-2xl">
                            {audience.label}
                          </h3>
                          <p className="ke-body-sm mt-2.5 max-w-[54ch] text-steel">
                            {audience.description}
                          </p>
                        </div>
                      </div>

                      <span className="flex items-baseline gap-3 md:justify-end md:pt-1 md:text-right">
                        <span>
                          <span className="ke-label mb-1.5 block text-steel">
                            Start with
                          </span>
                          <span className="ke-underline text-[0.875rem] font-medium text-ink transition-colors group-hover:text-accent-ink">
                            {audience.linkLabel}
                          </span>
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 translate-y-0.5 text-steel transition-transform duration-300 ease-[var(--ease-ke)] group-hover:translate-x-1 group-hover:text-accent-ink"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
