"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Entrance animations.
 *
 * THREE RULES HOLD THIS FILE TOGETHER
 *
 * 1. The rendered markup never branches on reduced motion. `useReducedMotion`
 *    resolves differently on the server and the client, so branching the tree on
 *    it produces a hydration mismatch. The markup is always identical and only
 *    the transition duration changes — reduced motion collapses the animation to
 *    an instant state change rather than removing the element.
 *
 * 2. Every animated wrapper carries `data-ke-reveal`, so the no-JavaScript
 *    fallback in the root layout can force it visible. Without that, a failed
 *    script would leave the page rendered at opacity 0.
 *
 * 3. `m.*`, never `motion.*` — the app is wrapped in a strict `LazyMotion`, so
 *    the full component would throw rather than silently reintroduce the bundle.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const INSTANT = { duration: 0 };

/** Shared viewport trigger. One place to tune when reveals feel early or late. */
const ONCE_IN_VIEW = { once: true, margin: "-72px" } as const;

interface RevealProps {
  children: ReactNode;
  /** Seconds. Stagger related items with 0.06–0.08 steps, capped at 5. */
  delay?: number;
  /** Distance travelled on entry. */
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "span";
}

/** Scroll-triggered entrance. Animates once. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = m[as];

  return (
    <MotionTag
      data-ke-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={ONCE_IN_VIEW}
      transition={reduce ? INSTANT : { duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/** Entrance on mount — for content already in view when the page loads. */
export function MountReveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <m.div
      data-ke-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? INSTANT : { duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

/**
 * Line-by-line mask reveal for the hero headline.
 *
 * Each entry in `lines` is one authored visual line, sitting in its own clipping
 * box. The headline's max-width and `font-stretch` must be set so that no entry
 * wraps — a wrapped entry animates as a two-line slab and the cascade is lost.
 */
export function HeroLines({
  lines,
  className,
  lineClassName,
  delay = 0.15,
  /** Seconds between lines. 0.09 desktop, 0.07 mobile. */
  stagger = 0.09,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <span className={className}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden pb-[0.06em]">
          <m.span
            data-ke-reveal=""
            className={lineClassName}
            style={{ display: "block" }}
            initial={{ y: "108%" }}
            animate={{ y: "0%" }}
            transition={
              reduce
                ? INSTANT
                : { duration: 0.9, delay: delay + index * stagger, ease: EASE }
            }
          >
            {line}
          </m.span>
        </span>
      ))}
    </span>
  );
}

/** Image mask reveal — the frame wipes upward to expose the photograph. */
export function RevealMask({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <m.div
      data-ke-reveal=""
      className={className}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-64px" }}
      transition={reduce ? INSTANT : { duration: 1, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

/**
 * A rule that draws itself in from the left.
 *
 * Uses `scaleX` rather than animating `width` — same result, but it stays on the
 * compositor instead of triggering layout on every frame.
 */
export function DrawRule({
  delay = 0,
  className,
  onMount = false,
}: {
  delay?: number;
  className?: string;
  /** Draw on load rather than on scroll — used in the hero. */
  onMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const target = { scaleX: 1 };

  return (
    <m.span
      data-ke-reveal=""
      aria-hidden="true"
      className={className}
      style={{ transformOrigin: "left" }}
      initial={{ scaleX: 0 }}
      animate={onMount ? target : undefined}
      whileInView={onMount ? undefined : target}
      viewport={onMount ? undefined : ONCE_IN_VIEW}
      transition={reduce ? INSTANT : { duration: 0.9, delay, ease: EASE }}
    />
  );
}
