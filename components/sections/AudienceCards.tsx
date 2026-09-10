import {
  Activity,
  Globe,
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
  globe: Globe,
};

/**
 * Performance, redefined — who Kinetic Edge actually works with.
 *
 * The point the content document makes first: performance is not only for elite
 * athletes. It is the ability to do what matters to you, better. This section
 * carries that argument, so it sits early on the page and is given real weight
 * rather than being a strip of labels.
 */
export function AudienceCards({ index = "02" }: { index?: string }) {
  return (
    <section data-accent="performance" className="ke-section bg-bone">
      <Container>
        <Reveal>
          <SectionHeading
            index={index}
            label="Performance, redefined"
            title="It's not just about athletes."
            lead="Human performance is your ability to do what matters to you — better. For an athlete that might mean becoming stronger, faster and more resilient. For someone else it might mean returning to activity after an injury, building strength, or simply feeling better in everyday life."
          />
        </Reveal>

        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-18 lg:grid-cols-5">
          {audiences.map((audience, i) => {
            const Icon = ICONS[audience.icon] ?? Users;

            return (
              <Reveal
                key={audience.code}
                as="li"
                delay={Math.min(i, 4) * 0.06}
                className="flex"
              >
                <article className="group relative flex flex-1 flex-col gap-8 bg-paper p-6 transition-[background-color,box-shadow,transform] duration-300 ease-[var(--ease-ke)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_40px_-28px_rgba(10,22,38,0.45)] lg:p-7">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-ke)] group-hover:scale-x-100"
                  />

                  <div className="flex items-start justify-between gap-3">
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 text-accent-ink"
                    />
                    <span className="ke-label text-steel">{audience.code}</span>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold leading-snug tracking-[-0.025em] text-ink">
                      {audience.label}
                    </h3>
                    <p className="ke-body-sm mt-2.5 text-steel">
                      {audience.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={0.1}>
          <p className="ke-lead mt-10 max-w-2xl">
            Different goals. Different starting points.{" "}
            <span className="font-medium text-ink">
              One approach — optimising human performance.
            </span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
