import Image from "next/image";
import { partners } from "@/data/partners";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealMask } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Confirmed partners only — VALD Performance and Hundred.
 *
 * The supplied marks are white-on-orange; they are recovered onto transparency
 * and shown white on the dark ground, which is a surface treatment rather than a
 * change to either mark. Each sits in its own cell with generous clear space and
 * a fixed height, so neither is stretched and the two read as a matched strip
 * despite very different aspect ratios (VALD 4.1:1, Hundred 1.8:1).
 *
 * Competitions are never shown here.
 */
export function PartnerSection({
  index = "08",
  title = "Performance requires the right tools.",
  lead = "Objective measurement is part of the method. Where technology is used, it is named.",
}: {
  index?: string;
  title?: string;
  lead?: string;
}) {
  const vald = partners.find((p) => p.name === "VALD Performance");

  return (
    <section
      data-accent="performance"
      className="surface-dark ke-section relative overflow-hidden bg-ink text-white"
    >
      <div aria-hidden="true" className="ke-grid-lines absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 60% at 85% 15%, rgba(19,133,214,0.16) 0%, transparent 62%)",
        }}
      />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            index={index}
            label="Partners"
            title={title}
            lead={lead}
            tone="dark"
          />
        </Reveal>

        {/* Logo strip */}
        <ul className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:mt-18">
          {partners.map((partner, i) => (
            <Reveal
              key={partner.name}
              as="li"
              delay={i * 0.08}
              className="flex flex-col items-center gap-8 bg-night px-8 py-12 md:px-12 md:py-16"
            >
              {/* Height is set explicitly and width follows the intrinsic ratio,
                  so nothing is stretched. `max-h-full` + `w-auto` collapsed the
                  box to 0x0 here, which also stopped lazy loading from ever
                  firing — a definite height avoids both. */}
              <div className="flex h-20 w-full items-center justify-center md:h-24">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={partner.logoWidth}
                  height={partner.logoHeight}
                  sizes="240px"
                  className="w-auto object-contain"
                  style={{ height: partner.displayHeight }}
                />
              </div>

              <div className="text-center">
                <p className="ke-label text-ke-blue">{partner.role}</p>
                <p className="mt-3 font-display text-lg font-bold tracking-[-0.02em] text-white">
                  {partner.name}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* What the technology partnership actually does */}
        {vald?.description ? (
          <div className="mt-px grid gap-px border border-t-0 border-white/10 bg-white/10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            <Reveal className="flex flex-col justify-center bg-night p-8 md:p-10 lg:p-12">
              <p className="ke-label mb-4 flex items-center gap-2 text-ke-blue">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-ke-blue" />
                How it is used
              </p>
              <h3 className="ke-h3 text-white">{vald.name}</h3>
              <p className="ke-body mt-4 max-w-xl text-steel-400">
                {vald.description}
              </p>
            </Reveal>

            <RevealMask delay={0.08} className="bg-night">
              <Figure
                imageKey="valdTesting"
                ratio="16/10"
                sizes="(min-width: 1024px) 55vw, 100vw"
                tone="dark"
                className="h-full"
              />
            </RevealMask>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
