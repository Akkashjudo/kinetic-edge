import { audiences } from "@/data/programmes";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Who trains at Kinetic Edge — connective tissue between two heavier sections,
 * and deliberately quiet.
 *
 * The A/01–A/06 codes were removed: audiences are not a sequence, so numbering
 * them implied an order that does not exist. A hairline carries the same
 * structural separation without asserting anything untrue.
 *
 * One reveal for the whole block. Six short labels do not warrant seven.
 */
export function AudienceStrip() {
  return (
    <section
      data-accent="performance"
      className="surface-dark ke-section-connective border-y border-white/10 bg-ink text-white"
    >
      <Container>
        <Reveal>
          <SectionLabel tone="dark" className="mb-8">
            Who we work with
          </SectionLabel>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-0 sm:gap-x-8 lg:grid-cols-3">
            {audiences.map((audience) => (
              <li
                key={audience.code}
                className="group flex items-center gap-3.5 border-b border-white/10 py-4 sm:py-5"
              >
                <span
                  aria-hidden="true"
                  className="h-px w-4 shrink-0 bg-white/25 transition-colors duration-300 group-hover:bg-accent sm:w-6"
                />
                <span className="font-display text-[0.9375rem] font-semibold leading-snug tracking-[-0.02em] text-white/90 sm:text-lg lg:text-xl">
                  {audience.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
