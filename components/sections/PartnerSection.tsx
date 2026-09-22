import Image from "next/image";
import { partners, type Partner } from "@/data/partners";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealMask } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Confirmed partners only — VALD Performance and Hundred.
 *
 * Two variants:
 *  · strip — the homepage. One quiet band: a heading, two logos, two roles.
 *  · full  — /partners, with what the technology partnership actually does.
 *
 * Both sit on light grounds. The supplied marks are white on transparency, so
 * they are shown as ink silhouettes (`brightness-0`) — a surface treatment that
 * leaves each mark's shape and proportions untouched. Heights are set per logo
 * (see data/partners.ts) because VALD is a 4.1:1 wordmark and Hundred a 1.8:1
 * lock-up; matching their heights would make VALD dominate.
 *
 * Competitions are never shown here.
 */
export function PartnerSection({
  index = "07",
  variant = "strip",
  title = "Performance requires the right tools.",
  lead = "Objective measurement is part of the method. Where technology is used, it is named.",
}: {
  index?: string;
  variant?: "strip" | "full";
  title?: string;
  lead?: string;
}) {
  if (variant === "strip") return <PartnerStrip index={index} />;

  const vald = partners.find((p) => p.name === "VALD Performance");

  return (
    <section data-accent="performance" className="ke-section bg-paper">
      <Container>
        <Reveal>
          <SectionHeading index={index} label="Partners" title={title} lead={lead} />
        </Reveal>

        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-18">
          {partners.map((partner, i) => (
            <Reveal
              key={partner.name}
              as="li"
              delay={i * 0.08}
              className="flex flex-col items-center gap-8 bg-paper px-8 py-12 md:px-12 md:py-16"
            >
              <PartnerLogo partner={partner} className="h-20 md:h-24" />
              <div className="text-center">
                <p className="ke-label text-accent-ink">{partner.role}</p>
                <p className="mt-3 font-display text-lg font-bold tracking-[-0.02em] text-ink">
                  {partner.name}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        {vald?.description ? (
          <div className="mt-px grid gap-px border border-t-0 border-line bg-line lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            <Reveal className="flex flex-col justify-center bg-bone p-8 md:p-10 lg:p-12">
              <p className="ke-label mb-4 flex items-center gap-2 text-accent-ink">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
                How it is used
              </p>
              <h3 className="ke-h3 text-ink">{vald.name}</h3>
              <p className="ke-body mt-4 max-w-xl text-steel">{vald.description}</p>
            </Reveal>

            <RevealMask delay={0.08} className="bg-bone">
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

/** The homepage band — minimal on purpose. */
function PartnerStrip({ index }: { index: string }) {
  return (
    <section data-accent="performance" className="ke-section-tight bg-paper">
      <Container>
        <div className="grid items-center gap-10 border-y border-line py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-16 lg:py-12">
          <Reveal>
            <SectionLabel index={index} className="mb-5">
              Partners
            </SectionLabel>
            <h2 className="ke-h3 max-w-[20ch] text-ink">
              Performance Technology &amp; Partners
            </h2>
            <p className="ke-body-sm mt-3 max-w-sm text-steel">
              The testing technology and the kit behind the work.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="grid grid-cols-2 gap-px border border-line bg-line">
              {partners.map((partner) => (
                <li
                  key={partner.name}
                  className="group flex flex-col items-center justify-center gap-5 bg-paper px-4 py-8 sm:px-8"
                >
                  <PartnerLogo
                    partner={partner}
                    className="h-16"
                    imageClassName="opacity-75 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <p className="ke-label text-center text-steel">{partner.role}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/**
 * Height is set explicitly and width follows the intrinsic ratio, so nothing is
 * stretched — `max-h-full` + `w-auto` once collapsed this box to 0×0, which also
 * stopped lazy loading from ever firing.
 */
function PartnerLogo({
  partner,
  className,
  imageClassName,
}: {
  partner: Partner;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={cn("flex w-full items-center justify-center", className)}>
      <Image
        src={partner.logo}
        alt={`${partner.name} logo`}
        width={partner.logoWidth}
        height={partner.logoHeight}
        sizes="240px"
        className={cn("w-auto object-contain brightness-0", imageClassName)}
        style={{ height: partner.displayHeight }}
      />
    </div>
  );
}
