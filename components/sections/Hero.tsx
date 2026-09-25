"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { primaryCta } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Figure } from "@/components/ui/Figure";
import { DrawRule, HeroLines, MountReveal } from "@/components/ui/Reveal";
import { HeroBackdrop } from "./HeroBackdrop";
import { useIsFinePointer } from "@/lib/useIsFinePointer";
import { LG, useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Homepage hero.
 *
 * One job: say what Kinetic Edge is and offer the two next steps. No counters,
 * ratings, badges or social proof — the brief is "clear first".
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * TWO COMPOSITIONS, NOT ONE CROP
 *
 * The hero photograph is 4:3. Poured into a phone-shaped box it lost 59% of
 * itself, and the scrim needed to keep white text legible over what was left
 * turned the rest into a dark smear. A 4:3 landscape frame is simply not a
 * portrait hero, and no `object-position` fixes that.
 *
 * So the hero is art-directed at `lg`:
 *
 *   below lg   stacked. Copy on flat night — nothing behind it, so no scrim and
 *              no text over anyone — then the photograph WHOLE, full-bleed, at
 *              its own 4:3. Nothing is cropped and nothing is printed on it.
 *   lg and up  the original full-bleed background composition, unchanged: the
 *              directional scrim leaves the right of the frame open and the copy
 *              sits in the left third.
 *
 * It is ONE `<Image>` doing both. The frame is a 4:3 block in normal flow, and
 * at `lg` the same element becomes `absolute inset-0` behind the copy. Two
 * elements — one hidden per breakpoint — preloaded a candidate that was never
 * painted and warned on every load; do not split it again.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * The headline is authored as two lines and must never wrap inside one. That is
 * held by `max-w-[19ch]` plus the `font-stretch` ramp on `ke-display`.
 *
 * ENTRANCE  eyebrow 0s · lines from 0.15s at 90ms · lead 0.5s · CTAs 0.62s ·
 *           accent rule 0.85s. After that the CTAs never move again.
 * SCROLL    background 1.06 → 1.00 and copy 0 → -40px across the first 30% of
 *           the hero. Transform-only, and gated on a fine pointer AND lg — the
 *           scale would otherwise push the in-flow mobile frame off both edges.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const finePointer = useIsFinePointer();
  // The scrub belongs to the desktop composition only. Below lg the photograph
  // is a block in normal flow, and scaling it to 1.06 pushed 3% of the frame
  // past both edges — a crop, in the one place the brief says never to crop.
  const desktop = useMediaQuery(LG);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1.06, 1]);
  const copyY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  const scrub = finePointer && desktop && !reduce;

  return (
    <section
      ref={ref}
      data-accent="performance"
      className="surface-dark relative isolate flex flex-col overflow-hidden bg-night text-white lg:min-h-[90svh] lg:justify-end"
    >
      {/* Atmosphere. Behind the copy at every width; behind the photograph too,
          below lg, where the photograph is in normal flow above it. */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <HeroBackdrop />
      </div>

      <m.div style={scrub ? { y: copyY } : undefined}>
        <Container className="relative pb-12 pt-24 sm:pb-14 sm:pt-28 lg:pb-24 lg:pt-40">
          <MountReveal delay={0} y={10}>
            <p className="ke-label mb-6 flex items-center gap-2.5 text-steel-400 lg:mb-7">
              <MapPin className="h-3.5 w-3.5 text-ke-blue" aria-hidden="true" />
              High Performance Centre · Chennai
            </p>
          </MountReveal>

          <h1 className="ke-display max-w-[19ch] text-white">
            <HeroLines
              lines={["Train Better.", "Perform Better."]}
              delay={0.15}
              stagger={0.09}
            />
          </h1>

          <MountReveal delay={0.5} y={16}>
            <p className="ke-lead mt-6 max-w-[34rem] text-white/75 lg:mt-8">
              High-performance training, strength &amp; conditioning, sports
              rehabilitation and performance development for athletes and
              individuals who want to perform at their best.
            </p>
          </MountReveal>

          <MountReveal delay={0.62} y={16}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-10">
              <CTAButton href="/services" variant="light" size="lg">
                Explore Our Services
              </CTAButton>
              <CTAButton
                href={primaryCta.href}
                variant="outlineLight"
                size="lg"
              >
                {primaryCta.label}
              </CTAButton>
            </div>
          </MountReveal>
        </Container>
      </m.div>

      {/* THE PHOTOGRAPH.
          Below lg it is a 4:3 band in normal flow under the copy — whole,
          edge to edge, nothing printed on it. At lg the same element becomes
          the full-bleed background and the scrims come in with it. */}
      <m.div
        className="relative aspect-4/3 w-full lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto"
        style={scrub ? { scale: imageScale } : undefined}
      >
        <Figure
          imageKey="hero"
          ratio="auto"
          sizes="100vw"
          priority
          tone="dark"
          className="h-full w-full"
        />

        {/* Directional scrim, lg and up: the copy sits in the left third, so
            the right of the photograph stays open. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-[linear-gradient(100deg,rgba(7,19,32,0.92)_0%,rgba(7,19,32,0.66)_38%,rgba(7,19,32,0.12)_78%,transparent_100%)] lg:block"
        />
        {/* A short fade at the foot of the frame below lg, and the full
            grounding gradient above it. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-night/70 to-transparent lg:h-1/2 lg:from-night lg:via-night/55"
        />
      </m.div>

      {/* Closing rule — the accent segment marks the performance environment. */}
      <div aria-hidden="true" className="relative h-px w-full bg-white/10">
        <DrawRule
          onMount
          delay={0.85}
          className="absolute inset-y-0 left-0 block w-[22%] bg-ke-blue"
        />
      </div>
    </section>
  );
}
