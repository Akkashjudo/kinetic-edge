import {
  FlaskConical,
  Globe,
  LineChart,
  Network,
  Target,
  Undo2,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import { differentiators } from "@/data/story";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS: Record<string, LucideIcon> = {
  "user-round": UserRound,
  "flask-conical": FlaskConical,
  network: Network,
  "line-chart": LineChart,
  target: Target,
  "undo-2": Undo2,
  globe: Globe,
  users: Users,
};

/**
 * Why Kinetic Edge.
 *
 * Every point describes the approach. None claims an outcome, a success rate or
 * a comparison against anyone else — there is no verified data for any of those.
 */
export function WhyKineticEdge({ index = "07" }: { index?: string }) {
  return (
    <section data-accent="performance" className="ke-section bg-paper">
      <Container>
        <Reveal>
          <SectionHeading
            index={index}
            label="How We Work"
            title="How the work is done."
            lead="Not a claim about results — a description of the process every person here is put through."
          />
        </Reveal>

        <ul className="mt-14 grid gap-x-10 gap-y-0 border-t border-line sm:grid-cols-2 lg:mt-18 lg:grid-cols-4 lg:gap-x-12">
          {differentiators.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Target;

            return (
              <Reveal
                key={item.title}
                as="li"
                delay={Math.min(i % 4, 3) * 0.05}
                className="group border-b border-line py-7 md:py-8"
              >
                <Icon
                  aria-hidden="true"
                  className="h-5 w-5 text-accent-ink transition-transform duration-300 ease-[var(--ease-ke)] group-hover:-translate-y-0.5"
                />
                <h3 className="mt-5 font-display text-[1.0625rem] font-bold tracking-[-0.022em] text-ink md:text-[1.125rem]">
                  {item.title}
                </h3>
                <p className="ke-body-sm mt-2.5 text-steel">{item.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
