"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { centres } from "@/data/centres";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * The two-environment model — signature moment 02.
 *
 * Centre 02 is presented as an environment, never as a location: it has no
 * address, no map and no directions anywhere on the site.
 *
 * Switching `--accent` alone left roughly 0.14% of each panel actually carrying
 * colour, so the two are now differentiated on three axes:
 *
 *   GROUND     performance sits on --night with a blue wash rising from the
 *              lower left; rehabilitation on the lifted --ink-lift with a teal
 *              wash from the upper right.
 *   STRUCTURE  the rehabilitation panel is offset downward on desktop, so the
 *              pair reads as two related environments rather than a symmetric
 *              table. Between them runs a vertical seam carrying a blue→teal
 *              gradient whose position is driven by scroll — as the reader moves
 *              through the section the seam hands over from one to the other.
 *   IMAGE      both panels share a 5:4 frame so the pair reads as a matched
 *              set; the differentiation is carried by ground and structure
 *              rather than by inconsistent crops.
 */
export function CentreSplit({ index = "04" }: { index?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  });

  const smoothed = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });

  // Both start at 0, so the server and client render the same transform.
  const progress = reduce ? scrollYProgress : smoothed;

  // The seam's blue-dominant end travels down as the reader descends.
  const seamY = useTransform(progress, [0, 1], ["-55%", "55%"]);

  return (
    <section className="surface-dark relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="ke-grid-lines absolute inset-0 opacity-60" />

      <Container className="relative pb-14 pt-16 md:pb-16 md:pt-24 lg:pt-28">
        <Reveal>
          <SectionHeading
            index={index}
            label="Two Centres"
            tone="dark"
            title={
              <>
                Two environments.
                <br />
                One performance system.
              </>
            }
            lead="One is built to develop physical qualities. The other is built to restore them. An athlete can move between the two without starting again."
          />
        </Reveal>
      </Container>

      <div ref={ref} className="relative grid lg:grid-cols-2">
        {/* The seam. One system, two environments — stated as a line. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden w-px -translate-x-1/2 overflow-hidden bg-white/10 lg:block"
        >
          {/* `y` is always passed — branching the style object on reduced
              motion would change the rendered attributes between server and
              client. Under reduced motion the value simply tracks scroll
              position directly instead of being springed, and both start at
              the same place. */}
          <m.span
            className="absolute inset-x-0 top-0 block h-[120%] w-full bg-gradient-to-b from-ke-blue via-ke-blue to-ke-teal"
            style={{ y: seamY }}
          />
        </div>

        {centres.map((centre, index) => {
          const isRehab = centre.accent === "rehab";

          return (
            <Reveal
              key={centre.id}
              delay={index * 0.12}
              as="article"
              className={cn(
                "relative isolate flex",
                // Structure: the clinical environment sits lower, so the pair is
                // never read as a symmetric two-column table.
                isRehab && "lg:mt-16 xl:mt-20",
              )}
            >
              <div
                data-accent={centre.accent}
                className={cn(
                  "group relative flex flex-1 flex-col overflow-hidden",
                  isRehab ? "bg-ink-lift" : "bg-night",
                )}
              >
                {/* Ground: each environment has its own atmosphere and origin. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: isRehab
                      ? "radial-gradient(85% 65% at 100% 0%, rgba(15,154,171,0.24) 0%, transparent 62%)"
                      : "radial-gradient(85% 70% at 0% 100%, rgba(19,133,214,0.26) 0%, transparent 62%)",
                  }}
                />
                {/* Accent wash that lifts on hover — 6%, barely there. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-accent opacity-0 transition-opacity duration-700 ease-[var(--ease-ke)] group-hover:opacity-[0.06]"
                />

                {/* Top accent rule — carries colour identity when the panels
                    stack on mobile and the seam is no longer there to do it. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 z-10 h-[3px] bg-accent lg:hidden"
                />

                <div className="relative overflow-hidden">
                  <Figure
                    imageKey={centre.imageKey}
                    /* One shared ratio across both panels. The two source
                       photographs are 3:2 and 6:5; 5:4 crops the wide Centre 01
                       frame horizontally, where there is street to spare, and
                       takes only ~4% off Centre 02, whose signage runs close to
                       the top edge and was being cut at 4:3. */
                    ratio="5/4"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    tone="dark"
                    imageClassName="transition-transform duration-[900ms] ease-[var(--ease-ke)] group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t via-transparent to-transparent",
                      isRehab ? "from-ink-lift" : "from-night",
                    )}
                  />
                  <p className="ke-label absolute left-6 top-6 flex items-center gap-2.5 bg-night/70 px-3 py-2 text-white backdrop-blur-sm lg:left-8 lg:top-8">
                    <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
                    {centre.code}
                  </p>
                </div>

                <div className="relative flex flex-1 flex-col p-6 sm:p-8 lg:p-10 xl:p-12">
                  <h3 className="ke-h2 text-white">
                    {centre.name}
                    <span className="text-accent">.</span>
                  </h3>

                  <p className="mt-4 max-w-md font-display text-lg font-semibold tracking-[-0.02em] text-white/90">
                    {centre.headline}
                  </p>

                  <p className="ke-body mt-3 max-w-lg text-steel-400">
                    {centre.description}
                  </p>

                  <ul className="mt-8 grid gap-x-6 gap-y-2.5 border-t border-white/10 pt-7 sm:grid-cols-2">
                    {centre.highlights.map((item) => (
                      <li
                        key={item}
                        className="ke-body-sm flex items-start gap-2.5 text-white/80"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.45rem] h-1 w-1 shrink-0 bg-accent"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-9">
                    {/* Stretched link: one accessible anchor, whole panel clickable */}
                    <CTAButton
                      href={centre.href}
                      variant="outlineLight"
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {isRehab ? "Explore Rehabilitation" : "Explore Performance"}
                    </CTAButton>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
