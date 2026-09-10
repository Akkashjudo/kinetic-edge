"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import {
  Activity,
  Apple,
  ArrowUpRight,
  Brain,
  Dumbbell,
  Gauge,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";
import { pillars } from "@/data/pillars";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS: Record<string, LucideIcon> = {
  gauge: Gauge,
  dumbbell: Dumbbell,
  activity: Activity,
  apple: Apple,
  brain: Brain,
  "heart-pulse": HeartPulse,
};

/**
 * The Kinetic Edge performance system — ASSESS → TRAIN → RESTORE → FUEL →
 * PERFORM → RECOVER.
 *
 * Six disciplines with long service lists behind them. A flat render would be
 * ninety-odd bullet points, so the pillars are a selectable rail: the sequence
 * stays visible as one system, and only the selected discipline expands.
 *
 * The rail is a proper tablist — arrow keys move between pillars, and the panel
 * is associated with its tab — so the whole system is reachable without a mouse.
 * Every service is in the DOM for the selected pillar; nothing is hidden behind
 * hover alone.
 */
export function PillarSystem({ index = "03" }: { index?: string }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const pillar = pillars[active];
  const Icon = ICONS[pillar.icon] ?? Gauge;

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = pillars.length - 1;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i === last ? 0 : i + 1));
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i === 0 ? last : i - 1));
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(last);
    }
  };

  return (
    <section
      data-accent={pillar.accent}
      className="surface-dark ke-section-lg relative overflow-hidden bg-night text-white"
    >
      <div aria-hidden="true" className="ke-grid-lines absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-[background] duration-700"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 0%, color-mix(in srgb, var(--accent) 22%, transparent) 0%, transparent 62%)",
        }}
      />

      <Container className="relative">
        <SectionHeading
          index={index}
          label="The System"
          tone="dark"
          title={
            <>
              One system.
              <br />
              Six disciplines.
            </>
          }
          lead="Training, rehabilitation, nutrition, psychology and recovery are not separate services here. They work on the same person, against the same assessment."
        />

        {/* Pillar rail */}
        <div
          role="tablist"
          aria-label="The Kinetic Edge performance system"
          onKeyDown={onKeyDown}
          className="mt-14 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3 lg:mt-20 lg:grid-cols-6"
        >
          {pillars.map((p, i) => {
            const PIcon = ICONS[p.icon] ?? Gauge;
            const selected = i === active;

            return (
              <button
                key={p.slug}
                role="tab"
                id={`pillar-tab-${p.slug}`}
                aria-selected={selected}
                aria-controls={`pillar-panel-${p.slug}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                data-accent={p.accent}
                className={cn(
                  "group relative flex flex-col items-start gap-4 px-4 py-6 text-left transition-colors duration-300 md:px-5 md:py-7",
                  selected ? "bg-ink-lift" : "bg-night hover:bg-ink-lift/60",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 top-0 h-0.5 origin-left bg-accent transition-transform duration-500 ease-[var(--ease-ke)]",
                    selected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
                <PIcon
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 transition-colors duration-300",
                    selected ? "text-accent-on-dark" : "text-steel-500",
                  )}
                />
                <span>
                  <span className="ke-label block text-steel-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "mt-2 block font-display text-lg font-bold uppercase tracking-[-0.01em] transition-colors duration-300",
                      selected ? "text-white" : "text-steel-400",
                    )}
                  >
                    {p.code}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected discipline */}
        <div
          role="tabpanel"
          id={`pillar-panel-${pillar.slug}`}
          aria-labelledby={`pillar-tab-${pillar.slug}`}
          className="border border-t-0 border-white/10 bg-ink-lift p-7 md:p-10 lg:p-12"
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={pillar.slug}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -6 }}
              transition={
                reduce ? { duration: 0 } : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
                <div>
                  <p className="ke-label mb-4 flex items-center gap-2.5 text-accent-on-dark">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                    {pillar.code}
                  </p>
                  <h3 className="ke-h3 text-white">{pillar.title}</h3>
                  <p className="ke-body mt-4 text-steel-400">{pillar.summary}</p>

                  {pillar.href ? (
                    <Link
                      href={pillar.href}
                      className="ke-tap group mt-7 inline-flex items-center gap-2 font-display text-[0.9375rem] font-semibold text-white underline-offset-4 transition-colors hover:text-accent-on-dark hover:underline"
                    >
                      Learn more
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  ) : null}
                </div>

                <div>
                  {pillar.groups ? (
                    <div className="space-y-8">
                      {pillar.groups.map((group) => (
                        <div key={group.title}>
                          <h4 className="ke-label mb-4 border-t border-white/10 pt-4 text-steel-400">
                            {group.title}
                          </h4>
                          <ServiceList services={group.services} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <h4 className="ke-label mb-4 border-t border-white/10 pt-4 text-steel-400">
                        What this covers
                      </h4>
                      <ServiceList services={pillar.services} />
                    </>
                  )}
                </div>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

function ServiceList({ services }: { services: string[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
      {services.map((service) => (
        <li
          key={service}
          className="ke-body-sm flex items-start gap-2.5 text-white/80"
        >
          <span
            aria-hidden="true"
            className="mt-[0.5rem] h-1 w-1 shrink-0 bg-accent"
          />
          {service}
        </li>
      ))}
    </ul>
  );
}
