import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Dumbbell,
  Gauge,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/services";
import type { ServiceDetail } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const ICONS: Record<string, LucideIcon> = {
  "strength-conditioning": Dumbbell,
  "athlete-performance": Gauge,
  "physiotherapy-rehabilitation": Activity,
  "distance-coaching": Globe,
};

/**
 * The four services — the section the brief marks "very important".
 *
 * Every card answers the same questions in the same order, so four services
 * can be compared at a glance: what it is → who it is for → what it focuses on
 * → what it works toward → where to go next. `goal` is an aim, never a result
 * claim; see data/services.ts.
 *
 * Two columns rather than four. Each card carries a real amount of content, and
 * four narrow columns at 1440px turned the focus lists into a tall ribbon of
 * one-word lines.
 */
export function ServicesOverview({
  index = "02",
  title = "How We Help You Perform Better",
  lead = "Four ways to work with Kinetic Edge. Each one starts with an assessment and is built around you.",
}: {
  index?: string;
  title?: string;
  lead?: string;
}) {
  return (
    <section data-accent="performance" className="ke-section bg-paper">
      <Container>
        <Reveal>
          <SectionHeading index={index} label="Services" title={title} lead={lead} />
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-18">
          {services.map((service, i) => (
            <Reveal
              key={service.slug}
              as="li"
              delay={(i % 2) * 0.08}
              className="flex"
            >
              <ServiceSpotlight service={service} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ServiceSpotlight({ service }: { service: ServiceDetail }) {
  const Icon = ICONS[service.slug] ?? Dumbbell;
  const [number, , category] = service.label.split(" ");

  return (
    <SpotlightCard
      data-accent={service.accent}
      className="flex flex-1 flex-col bg-paper p-6 outline-offset-4 outline-accent sm:p-8 lg:p-10 has-[a:focus-visible]:outline-2"
    >
      {/* A soft wash of the accent from the top corner — the only colour on
          the card until it is hovered. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 45% at 0% 0%, var(--accent-tint) 0%, transparent 72%)",
        }}
      />

      <div className="flex items-start justify-between gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-paper transition-colors duration-300 group-hover:border-accent sm:h-12 sm:w-12">
          <Icon aria-hidden="true" strokeWidth={1.5} className="h-5 w-5 text-accent-ink" />
        </span>
        <span className="ke-label pt-1 text-steel">
          {number} <span aria-hidden="true" className="text-line">/</span>{" "}
          {category.charAt(0) + category.slice(1).toLowerCase()}
        </span>
      </div>

      <h3 className="ke-h3 mt-6 max-w-[18ch] text-ink sm:mt-8">{service.title}</h3>
      <p className="ke-body mt-3 max-w-[46ch] text-steel">{service.what}</p>

      <dl className="mt-6 space-y-5 border-t border-line pt-5 sm:mt-7 sm:space-y-6 sm:pt-6">
        <div>
          <dt className="ke-label text-accent-ink">Who it&rsquo;s for</dt>
          <dd className="ke-body-sm mt-2.5 text-ink/85">{service.audience}</dd>
        </div>

        <div>
          <dt className="ke-label text-accent-ink">Focus</dt>
          <dd className="mt-3">
            <ul className="flex flex-wrap gap-1.5">
              {service.focus.map((item) => (
                <li
                  key={item}
                  className="border border-line bg-paper px-2.5 py-1.5 text-[0.8125rem] leading-none text-ink/85"
                >
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </div>

        <div>
          <dt className="ke-label text-accent-ink">What it works toward</dt>
          <dd className="ke-body-sm mt-2.5 text-ink/85">{service.goal}</dd>
        </div>
      </dl>

      {/* One link, stretched over the whole card. The wrapper stays
          unpositioned so the card is the containing block. */}
      <div className="mt-auto pt-7 sm:pt-9">
        <Link
          href={service.href}
          className="ke-underline inline-flex items-center gap-2 font-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink transition-colors focus-visible:outline-none group-hover:text-accent-ink after:absolute after:inset-0 after:content-['']"
        >
          {service.exploreLabel}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 shrink-0 transition-transform duration-300 ease-[var(--ease-ke)] group-hover:translate-x-1"
          />
        </Link>
      </div>
    </SpotlightCard>
  );
}
