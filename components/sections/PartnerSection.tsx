import Image from "next/image";
import { partners, type Partner } from "@/data/partners";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Confirmed partners only — currently Hundred, the apparel sponsor. The VALD
 * Performance partnership was removed at the client's request on 25 Sep 2026.
 *
 * Two variants: a quiet band for the homepage, and the fuller treatment for
 * /partners. Both lay out from the data, so the section reads correctly with
 * one partner or several — no empty cells.
 *
 * The supplied marks are white on transparency, so on these light grounds they
 * are shown as ink silhouettes (`brightness-0`) — a surface treatment that
 * leaves each mark's shape and proportions untouched. Heights are set per logo
 * (see data/partners.ts) so different ratios read as a set.
 *
 * Competitions are never shown here.
 */
export function PartnerSection({
  index = "08",
  variant = "strip",
  title = "The kit behind the work.",
  lead = "Kinetic Edge names who it works with. Only confirmed partners appear here.",
}: {
  index?: string;
  variant?: "strip" | "full";
  title?: string;
  lead?: string;
}) {
  if (partners.length === 0) return null;
  if (variant === "strip") return <PartnerStrip index={index} />;

  return (
    <section data-accent="performance" className="ke-section bg-paper">
      <Container>
        <Reveal>
          <SectionHeading index={index} label="Partners" title={title} lead={lead} />
        </Reveal>

        <ul
          className={cn(
            "mt-14 grid gap-px border border-line bg-line lg:mt-18",
            partners.length > 1 && "sm:grid-cols-2",
          )}
        >
          {partners.map((partner, i) => (
            <Reveal
              key={partner.name}
              as="li"
              delay={i * 0.08}
              className="flex flex-col items-center gap-8 bg-paper px-8 py-14 md:px-12 md:py-16"
            >
              <PartnerLogo partner={partner} className="h-20 md:h-24" />
              <div className="text-center">
                <p className="ke-label text-accent-ink">{partner.role}</p>
                <p className="mt-3 font-display text-lg font-bold tracking-[-0.02em] text-ink">
                  {partner.name}
                </p>
                {partner.description ? (
                  <p className="ke-body-sm mx-auto mt-4 max-w-md text-steel">
                    {partner.description}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** The homepage band — one quiet line, generous space around the marks. */
function PartnerStrip({ index }: { index: string }) {
  return (
    <section data-accent="performance" className="ke-section-tight bg-paper">
      <Container>
        <div className="flex flex-col items-start gap-10 border-y border-line py-10 sm:flex-row sm:items-center sm:justify-between sm:gap-14 lg:py-12">
          <Reveal>
            <SectionLabel index={index} className="mb-4">
              Partners
            </SectionLabel>
            <h2 className="ke-h3 max-w-[16ch] text-ink">The kit behind the work.</h2>
          </Reveal>

          <Reveal delay={0.06} className="w-full sm:w-auto">
            <ul className="flex flex-wrap items-center gap-x-12 gap-y-8">
              {partners.map((partner) => (
                <li key={partner.name} className="group flex items-center gap-6">
                  <PartnerLogo
                    partner={partner}
                    className="w-auto"
                    imageClassName="opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span className="ke-label text-steel">{partner.role}</span>
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
 * stretched — `max-h-full` + `w-auto` once collapsed this box to 0×0, which
 * also stopped lazy loading from ever firing.
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
    <div className={cn("flex items-center justify-center", className)}>
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
