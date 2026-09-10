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
 * The section is composed to read as complete without it — the quote block does
 * not exist rather than sitting empty.
 *
 * THE KEY ART
 * The supplied artwork is a designed composite poster with its own typography
 * baked in. It runs full-bleed as the section's opening image, letterboxed with
 * `object-contain` over `--night` — the poster's own ground is the same value,
 * so it reads edge to edge without being cropped or stretched at any width.
 *
 * That typography is only legible at size, so below `sm` the poster is swapped
 * for a crop taken clear of all lettering. Only one is ever in the layout, so
 * only one is announced. Either way the real name, credentials and quote are set
 * in HTML underneath — sharp, selectable, and available to screen readers.
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
        <Reveal>
          <SectionLabel index={index} tone="dark" className="mb-8">
            Athlete Ambassador
          </SectionLabel>
        </Reveal>
      </Container>

      {/* Key art — full-bleed, uncropped */}
      <RevealMask className="relative mt-2">
        {/* Small screens: the crop, where the poster's own type would be
            too small to read. */}
        <Image
          src={images.action}
          alt={`${name}, ${credentials[0]}`}
          width={1060}
          height={944}
          sizes="100vw"
          priority={false}
          className="h-auto w-full object-cover sm:hidden"
        />

        {/* sm and up: the designed poster, letterboxed over the matching ground. */}
        <Image
          src={images.poster}
          alt={`${name} — ${credentials.join(", ")}, ${role}`}
          width={1536}
          height={1024}
          sizes="100vw"
          priority={false}
          className="hidden max-h-[72vh] w-full bg-night object-contain sm:block"
        />
      </RevealMask>

      <Container className="relative mt-14 lg:mt-18">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          {/* His words carry the heading; the identity sits beneath it. */}
          <Reveal>
            <h2 className="ke-h2 max-w-[16ch] text-white">
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
                <li className="ke-label flex items-center gap-3 text-accent-on-dark">
                  <span aria-hidden="true" className="text-white/25">
                    /
                  </span>
                  {role}
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-4">
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
      </Container>
    </section>
  );
}
