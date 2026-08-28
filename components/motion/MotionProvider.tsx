"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Framer Motion, loaded lean.
 *
 * `domAnimation` covers everything this site actually uses — entrance and
 * scroll-triggered animations, `AnimatePresence`, variants, and hover/tap
 * gestures — without the drag and layout-projection code that shipped with the
 * full `motion` import on every route.
 *
 * `strict` means components must use `m.*` rather than `motion.*`; using the
 * full component would silently reintroduce the bundle we just removed, so the
 * throw is deliberate.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
