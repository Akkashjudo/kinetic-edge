import Image from "next/image";
import { ambassador } from "@/data/ambassador";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal, RevealMask } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Athlete ambassador — Sankar Muthusamy.
 *
 * ⚠ NO TESTIMONIAL IS RENDERED while `ambassador.testimonial` is null, and it is
 * null. The source document carries a bracketed placeholder where his quote will
 * go; writing one and attributing it to a real named athlete is not an option.
 * The section is composed so that it reads as complete without it — the quote
 * block simply does not exist rather than sitting empty.
 *
 * The supplied artwork is a composite poster with typography baked in, so the
 * editorial frame uses a clean crop of it and the type is set in HTML: it stays
 * sharp, it is selectable, and screen readers get the words.
 */
export function AmbassadorFeature({ index = "06" }: { index?: string }) {
  const { name, credentials, role, statement, body, closing, testimonial, images } =
    ambassador;

  return (
    <section
      data-accent="performance"
      className="surface-dark ke-section-lg relative overflow-hidden bg-night text-white"
    >
      <div aria-hidden="true" className="ke-grid-lines absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 65% at 15% 90%, rgba(19,133,214,0.24) 0%, transparent 62%)",
        }}
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
          {/* Editorial frame */}
          <RevealMask className="order-1 lg:order-none">
            <div className="relative overflow-hidden border border-white/10">
              <Image
                src={images.action}
                alt={`${name}, ${credentials[0]} and ${role}`}
                width={1060}
                height={944}
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent"
              />
              <p className="ke-label absolute bottom-5 left-5 flex items-center gap-2.5 bg-night/80 px-3 py-2 text-white backdrop-blur-sm">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-ke-blue" />
                Athlete Ambassador
              </p>
            </div>
          </RevealMask>

          <div className="order-2 lg:order-none">
            <Reveal>
              <SectionLabel index={index} tone="dark" className="mb-7">
                Athlete Ambassador
              </SectionLabel>

              {/* His words carry the heading; the identity sits beneath it. */}
              <h2 className="ke-h2 max-w-[18ch] text-white">
                &ldquo;{statement}&rdquo;
              </h2>

              <div className="mt-7 border-t border-white/10 pt-6">
                <p className="font-display text-xl font-bold tracking-[-0.025em] text-white sm:text-2xl">
                  {name}
                </p>
                <ul className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                  {credentials.map((credential, i) => (
                    <li
                      key={credential}
                      className="ke-label flex items-center gap-3 text-steel-400"
                    >
                      {i > 0 ? (
                        <span aria-hidden="true" className="text-white/25">
                          /
                        </span>
                      ) : null}
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-7 space-y-4">
                {body.map((paragraph) => (
                  <p key={paragraph.slice(0, 28)} className="ke-body text-steel-400">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Rendered only when an approved quote exists. */}
              {testimonial ? (
                <figure className="mt-9 border-l-2 border-ke-blue pl-6">
                  <blockquote className="ke-lead text-white/90">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="ke-label mt-4 text-steel-400">
                    {testimonial.attribution}
                  </figcaption>
                </figure>
              ) : null}

              <p className="mt-9 font-display text-lg font-bold tracking-[-0.02em] text-white">
                {closing}
              </p>

              <div className="mt-9">
                <CTAButton href="/contact" variant="light">
                  Start Your Journey
                </CTAButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
