"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { primaryCta } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { ArtDirectedImage } from "@/components/ui/ArtDirectedImage";
import { DrawRule, HeroLines, MountReveal } from "@/components/ui/Reveal";
import { HeroBackdrop } from "./HeroBackdrop";
import { useIsFinePointer } from "@/lib/useIsFinePointer";

/**
 * Homepage hero.
 *
 * One job: say what Kinetic Edge is and offer the two next steps. No counters,
 * ratings, badges or social proof — the brief is "clear first".
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * THREE PHOTOGRAPHS, ONE PER BREAKPOINT
 *
 * The same room, shot three times for three shapes — not one frame cropped
 * three ways:
 *
 *   below 768   `heroMobile`  · 9:16 portrait, shot vertically
 *   768–1023    `heroTablet`  · 4:3 landscape, shot from the entrance
 *   1024 and up `hero`        · THE DESKTOP FRAME. Do not change it, do not
 *                               reposition it, do not re-crop it.
 *
 * `ArtDirectedImage` renders this as a `<picture>`, which is the only markup
 * that makes the browser fetch exactly one of the three. Read the note at the
 * top of that file before replacing it with `next/image`.
 *
 * The section's min-height is tuned per breakpoint so each frame is shown at
 * close to its own ratio — 100% of the portrait at 390 and 430, 96–100% of the
 * landscape from 768 to 1023 — rather than cut to fit a box that suits some
 * other screen.
 *
 * Below lg the copy is bottom-aligned and the scrim is weighted from the
 * bottom, so the type sits over the empty floor and the room reads clear above
 * it. At lg nothing about the composition changed.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * The headline is authored as two lines and must never wrap inside one. That is
 * held by `max-w-[19ch]` plus the `font-stretch` ramp on `ke-display`.
 *
 * ENTRANCE  eyebrow 0s · lines from 0.15s at 90ms · lead 0.5s · CTAs 0.62s ·
 *           accent rule 0.85s. After that the CTAs never move again.
 * SCROLL    background 1.06 → 1.00 and copy 0 → -40px across the first 30% of
 *           the hero. Transform-only, fine pointer only, clipped by the section.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const finePointer = useIsFinePointer();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1.06, 1]);
  const copyY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  const scrub = finePointer && !reduce;

  return (
    <section
      ref={ref}
      data-accent="performance"
      className="surface-dark relative isolate flex min-h-[min(178vw,96svh,56rem)] flex-col justify-end overflow-hidden bg-night text-white md:min-h-[min(78vw,48rem)] lg:min-h-[90svh]"
    >
      {/* The photograph. Priority-loaded: the LCP image on every screen. */}
      <m.div
        className="absolute inset-0 -z-10"
        style={scrub ? { scale: imageScale } : undefined}
      >
        <ArtDirectedImage
          // Mutually exclusive on purpose — see the note on `media` in
          // ArtDirectedImage. Overlapping ranges preload all three frames.
          sources={[
            { imageKey: "hero", media: "(min-width: 1024px)" },
            {
              imageKey: "heroTablet",
              media: "(min-width: 768px) and (max-width: 1023.98px)",
            },
            { imageKey: "heroMobile", media: "(max-width: 767.98px)" },
          ]}
          alt="The Kinetic Edge training floor in Mogappair East — the turf acceleration lane, plyometric boxes and the strength area beyond the entrance"
          sizes="100vw"
          priority
          // One focal point per frame. The lg value is the one this hero has
          // always used.
          className="object-cover object-[50%_42%] md:object-[50%_50%] lg:object-[center_45%]"
        />

        {/* Below lg the copy runs the full width over the foot of the frame, so
            the scrim is weighted from the bottom and stays nearly clear across
            the top half — the room is the point. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,19,32,0.95)_0%,rgba(7,19,32,0.89)_26%,rgba(7,19,32,0.62)_46%,rgba(7,19,32,0.22)_74%,rgba(7,19,32,0.06)_100%)] lg:hidden"
        />
        {/* Keeps the header legible over a bright ceiling. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-night/70 to-transparent lg:hidden"
        />

        {/* lg and up, unchanged: the copy sits in the left third, so the right
            of the photograph stays open. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-[linear-gradient(100deg,rgba(7,19,32,0.92)_0%,rgba(7,19,32,0.66)_38%,rgba(7,19,32,0.12)_78%,transparent_100%)] lg:block"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-night via-night/55 to-transparent lg:block"
        />
      </m.div>

      {/* Atmosphere. After the photograph in source order, so it reads over it. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <HeroBackdrop />
      </div>

      <m.div style={scrub ? { y: copyY } : undefined}>
        <Container className="relative pb-14 pt-20 sm:pt-28 lg:pb-24 lg:pt-40">
          <MountReveal delay={0} y={10}>
            <p className="ke-label mb-6 flex items-center gap-2.5 text-white/80 lg:mb-7 lg:text-steel-400">
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
            <p className="ke-lead mt-6 max-w-[34rem] text-white/80 lg:mt-8 lg:text-white/75">
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
