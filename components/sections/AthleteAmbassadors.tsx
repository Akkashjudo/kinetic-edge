import Image from "next/image";
import { ambassadors } from "@/data/ambassadors";
import { blurFor } from "@/data/blur";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealMask } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * The athlete ambassador.
 *
 * This section says one thing: Sankar Muthusamy represents Kinetic Edge.
 *
 * ⚠ TWO RULES FROM THE CLIENT, 25 Sep 2026 — do not undo either:
 *
 * 1. NO CALL TO ACTION. No booking, consultation, coaching or "view profile"
 *    control belongs here. He is an ambassador, not a service.
 * 2. THE PHOTOGRAPH IS NEVER CROPPED. It is rendered at its own aspect ratio
 *    with `object-contain`, so his head, body, racket, hands and legs stay in
 *    frame at every breakpoint. Do not put it in a card crop, do not switch to
 *    `object-cover`, and do not swap in a tighter frame on small screens.
 *
 * The artwork is the focus of the section and runs the full width of the
 * container. His name and credentials are also set in HTML beneath it — sharp,
 * selectable, translatable, and available to a screen reader.
 */
export function AthleteAmbassadors({
  index = "05",
  tone = "dark",
}: {
  index?: string;
  tone?: "dark" | "light";
}) {
  const ambassador = ambassadors[0];
  if (!ambassador) return null;

  const dark = tone === "dark";
  const { name, credentials, role, statement, body, closing, testimonial, poster } =
    ambassador;

  return (
    <section
      data-accent="performance"
      className={cn(
        "ke-section relative overflow-hidden",
        dark ? "surface-dark bg-night text-white" : "bg-paper",
      )}
    >
      {dark ? (
        <>
          <div aria-hidden="true" className="ke-grid-lines absolute inset-0 opacity-50" />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 60% at 85% 15%, rgba(19,133,214,0.18) 0%, transparent 62%)",
            }}
          />
        </>
      ) : null}

      <Container className="relative">
        {/* Identity */}
        <Reveal>
          <SectionLabel index={index} tone={tone} className="mb-7">
            Athlete Ambassador
          </SectionLabel>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div>
              <h2 className={cn("ke-h1", dark ? "text-white" : "text-ink")}>{name}</h2>

              <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
                {credentials.map((credential, i) => (
                  <li
                    key={credential}
                    className={cn(
                      "ke-label flex items-center gap-3",
                      dark ? "text-steel-400" : "text-steel",
                    )}
                  >
                    {i > 0 ? (
                      <span aria-hidden="true" className={dark ? "text-white/25" : "text-line"}>
                        /
                      </span>
                    ) : null}
                    {credential}
                  </li>
                ))}
              </ul>
            </div>

            {/* The one thing this section exists to say. */}
            <p className="ke-label inline-flex shrink-0 items-center gap-2.5 self-start bg-ke-blue px-4 py-3 text-white lg:self-auto">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-white" />
              {role}
            </p>
          </div>
        </Reveal>

        {/* The artwork, whole. Its own 3:2 ratio, so `object-contain` letterboxes
            nothing and crops nothing. */}
        <RevealMask className="mt-12 lg:mt-16">
          <div className="relative w-full" style={{ aspectRatio: `${poster.width} / ${poster.height}` }}>
            <Image
              src={poster.src}
              alt={`${name} — ${credentials.join(", ")}, ${role}`}
              fill
              sizes="(min-width: 1440px) 1312px, (min-width: 1024px) 92vw, 100vw"
              placeholder={blurFor(poster.src) ? "blur" : "empty"}
              blurDataURL={blurFor(poster.src)}
              className="object-contain"
            />
          </div>
        </RevealMask>

        {/* His preparation, in words. */}
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <p
              className={cn(
                "font-display text-2xl font-bold leading-[1.15] tracking-[-0.03em] sm:text-3xl lg:text-4xl",
                dark ? "text-white" : "text-ink",
              )}
            >
              {statement}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="space-y-4">
              {body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className={cn("ke-body", dark ? "text-steel-400" : "text-steel")}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Rendered only when an approved quote exists. */}
            {testimonial ? (
              <figure className="mt-8 border-l-2 border-ke-blue pl-6">
                <blockquote className={cn("ke-lead", dark ? "text-white/90" : "text-ink")}>
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption
                  className={cn("ke-label mt-4", dark ? "text-steel-400" : "text-steel")}
                >
                  {testimonial.attribution}
                </figcaption>
              </figure>
            ) : null}

            <p
              className={cn(
                "mt-8 font-display text-lg font-bold tracking-[-0.02em]",
                dark ? "text-white" : "text-ink",
              )}
            >
              {closing}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
