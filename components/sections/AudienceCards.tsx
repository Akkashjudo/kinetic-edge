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
import { SectionHeading } from "@/components/ui/SectionHeading";

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
 * athletes. Each card ends on the service that visitor should look at first,
 * so the section answers "is this for me?" and "where do I go?" together.
 *
 * The whole card is the link — one stretched anchor, so it is a single tab stop
 * and a single announcement rather than a card plus a link inside it.
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
        <Reveal>
          <SectionHeading
            index={index}
            label="Who We Work With"
            title={title}
            lead={lead}
          />
        </Reveal>

        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-18 lg:grid-cols-4">
          {audiences.map((audience, i) => {
            const Icon = ICONS[audience.icon] ?? Users;

            return (
              <Reveal
                key={audience.code}
                as="li"
                delay={Math.min(i, 3) * 0.06}
                className="flex"
              >
                <article className="group relative flex flex-1 flex-col bg-paper p-6 transition-colors duration-300 hover:bg-white has-[a:focus-visible]:outline-2 has-[a:focus-visible]:-outline-offset-2 has-[a:focus-visible]:outline-accent lg:p-7">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-ke)] group-hover:scale-x-100"
                  />

                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center bg-accent-tint">
                      <Icon aria-hidden="true" strokeWidth={1.75} className="h-5 w-5 text-accent-ink" />
                    </span>
                    <span className="ke-label text-steel">{audience.code}</span>
                  </div>

                  <h3 className="mt-8 font-display text-xl font-bold leading-tight tracking-[-0.025em] text-ink">
                    {audience.label}
                  </h3>
                  <p className="ke-body-sm mt-3 text-steel">{audience.description}</p>

                  <div className="mt-auto pt-8">
                    <Link
                      href={audience.href}
                      className="flex items-start justify-between gap-3 border-t border-line pt-4 text-[0.875rem] font-medium text-ink transition-colors focus-visible:outline-none group-hover:text-accent-ink after:absolute after:inset-0 after:content-['']"
                    >
                      <span>
                        <span className="ke-label mb-1.5 block text-steel">Start with</span>
                        <span className="ke-underline">{audience.linkLabel}</span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="mt-5 h-4 w-4 shrink-0 transition-transform duration-300 ease-[var(--ease-ke)] group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
