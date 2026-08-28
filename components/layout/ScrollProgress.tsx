"use client";

import { m, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Reading progress along the bottom edge of the header.
 *
 * Fits the measurement language the rest of the site is built on, and gives the
 * long pages a sense of position. Purely decorative — `aria-hidden`, and it
 * carries no information a reader needs.
 *
 * `scaleX` only, so it stays on the compositor. Framer's `useScroll` shares one
 * listener rather than adding another of its own.
 */
export function ScrollProgress({ visible }: { visible: boolean }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const smoothed = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  // Both start at 0, so SSR and the first client render agree.
  const progress = reduce ? scrollYProgress : smoothed;

  return (
    <m.span
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-ke-blue transition-opacity duration-300"
      style={{ scaleX: progress, opacity: visible ? 1 : 0 }}
    />
  );
}
