"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { primaryCta, site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Figure } from "@/components/ui/Figure";
import { DrawRule, HeroLines, MountReveal } from "@/components/ui/Reveal";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { HeroBackdrop } from "./HeroBackdrop";
import { useIsFinePointer } from "@/lib/useIsFinePointer";

/**
 * Homepage hero — signature moment 01.
 *
 * No counters, no ratings, no social proof. The proof on this site is the
 * verified athlete results further down the page.
 *
 * The headline is authored as two lines and must never wrap inside one. That is
 * held by `max-w-[22ch]` plus the `font-stretch` ramp on `ke-display`, which
 * narrows Archivo's width axis on small screens instead of shrinking the type.
 *
 * ENTRANCE  eyebrow 0s · lines from 0.15s at 90ms · lead 0.55s · CTAs 0.68s ·
 *           accent rule 0.9s. After that the CTAs never move again — the
 *           conversion target is not an animation target.
 * SCROLL    background 1.06 → 1.00 and copy 0 → -40px across the first 30% of
 *           the hero. Transform-only, desktop pointer only.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const finePointer = useIsFinePointer();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Both map across the first 30% of the hero's own travel.
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1.06, 1]);
  const copyY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  const scrub = finePointer && !reduce;

  return (
    <section
      ref={ref}
      data-accent="performance"
      className="surface-dark relative isolate flex min-h-[86svh] flex-col justify-center overflow-hidden bg-night text-white md:min-h-[92svh] lg:min-h-[100svh] lg:justify-end"
    >
      {/* Background frame. Priority-loaded: the only true LCP image on the site. */}
      <m.div
        className="absolute inset-0 -z-10"
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

        {/* One directional scrim for the copy, one bottom anchor for the seam.
            The upper right of the photograph is left largely alone. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(7,19,32,0.92)_0%,rgba(7,19,32,0.66)_38%,rgba(7,19,32,0.12)_78%,transparent_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night via-night/55 to-transparent"
        />
        <HeroBackdrop />
      </m.div>

      <m.div style={scrub ? { y: copyY } : undefined}>
        <Container className="relative pb-16 pt-28 sm:pb-20 lg:pb-24 lg:pt-40">
          <MountReveal delay={0} y={10}>
            <p className="ke-label mb-7 flex items-center gap-2.5 text-steel-400">
              <MapPin className="h-3.5 w-3.5 text-ke-blue" aria-hidden="true" />
              {site.address.short}
            </p>
          </MountReveal>

          <h1 className="ke-display max-w-[19ch] text-white">
            <HeroLines
              lines={["Optimising", "Human Performance."]}
              delay={0.15}
              stagger={0.09}
            />
          </h1>

          <MountReveal delay={0.55} y={16}>
            <p className="ke-lead mt-8 max-w-xl text-white/75">
              Individualised, evidence-informed performance solutions for
              athletes and everyday people. Strength &amp; conditioning,
              physiotherapy, nutrition, psychology and recovery — working
              together.
            </p>
            <p className="ke-label mt-5 text-steel-400">
              In person. Online. Anywhere.
            </p>
          </MountReveal>

          <MountReveal delay={0.68} y={16}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CTAButton href={primaryCta.href} variant="light" size="lg">
                Start Your Journey
              </CTAButton>
              <CTAButton href="/services" variant="outlineLight" size="lg">
                Explore Our Services
              </CTAButton>
            </div>
          </MountReveal>
        </Container>
      </m.div>

      <ScrollCue className="absolute bottom-10 right-5 hidden sm:right-8 sm:block lg:right-12" />

      {/* Closing rule — the accent segment marks the performance environment. */}
      <div aria-hidden="true" className="relative h-px w-full bg-white/10">
        <DrawRule
          onMount
          delay={0.9}
          className="absolute inset-y-0 left-0 block w-[22%] bg-ke-blue"
        />
      </div>
    </section>
  );
}
