import { Clock, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealMask } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * Both centres.
 *
 * Centre 02's address was supplied by the client on 28 Aug 2026, which reverses
 * the earlier rule that it had no location. What has NOT been supplied is a
 * separate set of opening hours or a separate telephone number for it, so the
 * hours block sits under Centre 01 — the only place they are verified — and the
 * one verified number serves both.
 *
 * `compact` drops the photography for pages that already carry the full
 * treatment elsewhere.
 */
export function LocationSection({
  index = "09",
  variant = "full",
}: {
  index?: string;
  variant?: "full" | "compact";
}) {
  const compact = variant === "compact";

  return (
    <section className="ke-section bg-paper">
      <Container>
        <Reveal>
          <SectionHeading
            index={index}
            label="Location"
            title="Where to find us."
            lead="Both centres are in Golden George Nagar, Chennai. One number and one WhatsApp line serve both."
          />
        </Reveal>
      </Container>

      <div className="mt-14 lg:mt-18">
        <Container>
          <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
            {/* ---------------------------------------------- Centre 01 */}
            <Reveal
              data-accent="performance"
              className="flex flex-col bg-paper p-6 md:p-9 lg:p-10"
            >
              <div data-accent="performance" className="flex h-full flex-col">
                {!compact ? (
                  <RevealMask className="mb-8">
                    <Figure
                      imageKey="facility"
                      ratio="4/3"
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      tone="dark"
                    />
                  </RevealMask>
                ) : null}

                <p className="ke-label mb-5 flex items-center gap-2.5 text-accent-ink">
                  <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
                  Centre 01 — Performance
                </p>

                <address className="not-italic">
                  <p className="flex gap-4">
                    <MapPin
                      className="mt-1 h-4 w-4 shrink-0 text-accent-ink"
                      aria-hidden="true"
                    />
                    <span className="font-display text-lg font-semibold leading-snug tracking-[-0.02em] text-ink md:text-xl">
                      {site.address.street},
                      <br />
                      {site.address.locality},
                      <br />
                      {site.address.city}, {site.address.region}{" "}
                      {site.address.postalCode}
                    </span>
                  </p>
                </address>

                {/* Hours are verified for this address only. */}
                <div className="mt-8 border-t border-line pt-7">
                  <h3 className="ke-label mb-5 flex items-center gap-2 text-steel">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    Opening hours
                  </h3>
                  <dl className="space-y-3">
                    {site.hours.map((slot) => (
                      <div key={slot.days} className="flex items-baseline gap-4">
                        <dt className="ke-body-sm shrink-0 text-steel">
                          {slot.days}
                        </dt>
                        <span
                          aria-hidden="true"
                          className="min-w-4 flex-1 translate-y-[-0.25rem] border-b border-dotted border-line"
                        />
                        <dd className="shrink-0 font-mono text-base tabular-nums tracking-tight text-ink md:text-lg">
                          {slot.time}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-auto pt-8">
                  <CTAButton href={site.links.maps} external variant="primary">
                    Open in Google Maps
                  </CTAButton>
                </div>
              </div>
            </Reveal>

            {/* ---------------------------------------------- Centre 02 */}
            <Reveal
              delay={0.08}
              className="flex flex-col bg-paper p-6 md:p-9 lg:p-10"
            >
              <div data-accent="rehab" className="flex h-full flex-col">
                {!compact ? (
                  <RevealMask className="mb-8">
                    <Figure
                      imageKey="rehabCentre"
                      ratio="4/3"
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      tone="dark"
                    />
                  </RevealMask>
                ) : null}

                <p className="ke-label mb-5 flex items-center gap-2.5 text-accent-ink">
                  <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
                  Centre 02 — Rehabilitation
                </p>

                <address className="not-italic">
                  <p className="flex gap-4">
                    <MapPin
                      className="mt-1 h-4 w-4 shrink-0 text-accent-ink"
                      aria-hidden="true"
                    />
                    <span className="font-display text-lg font-semibold leading-snug tracking-[-0.02em] text-ink md:text-xl">
                      {site.rehab.street},
                      <br />
                      {site.rehab.locality},
                      <br />
                      {site.rehab.city}, {site.rehab.region}{" "}
                      {site.rehab.postalCode}
                    </span>
                  </p>
                </address>

                <p className="ke-body-sm mt-8 border-t border-line pt-7 text-steel">
                  The clinical environment — assessment, treatment and progressive
                  rehabilitation, through to a criteria-based return to sport.
                </p>

                <div className="mt-auto pt-8">
                  <CTAButton href={site.rehab.maps} external variant="primary">
                    Open in Google Maps
                  </CTAButton>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>

        {/* Shared contact — one verified number serves both centres. */}
        <Container>
          <Reveal>
            <div className="mt-10 grid gap-8 border-t border-line pt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <p className="ke-label mb-3 text-steel">Both centres</p>
                <a
                  href={site.phone.href}
                  className="flex items-center gap-3 font-display text-xl font-bold tracking-[-0.025em] text-ink transition-colors hover:text-ke-blue-600 md:text-2xl"
                >
                  <Phone className="h-5 w-5 shrink-0 text-ke-blue" aria-hidden="true" />
                  {site.phone.display}
                </a>
                {!compact ? (
                  <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                    {site.areasServed.map((area) => (
                      <li key={area} className="ke-body-sm text-ink/80">
                        {area}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <CTAButton
                href={site.whatsapp.href}
                external
                variant="outline"
                arrow={false}
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp Kinetic Edge
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
