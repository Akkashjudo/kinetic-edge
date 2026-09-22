"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { m, useReducedMotion } from "framer-motion";
import { useRevealInView } from "@/lib/useRevealInView";

/**
 * Entrance animations.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * NEVER USE `whileInView` HERE
 *
 * The app is wrapped in `LazyMotion features={domAnimation}`. That bundle is
 * animations + gestures only — the viewport feature is NOT in it, so
 * `whileInView` silently does nothing: the element renders its `initial` state
 * and never leaves it. With `initial={{ opacity: 0 }}` that is permanently
 * invisible content across the whole site, with no error anywhere.
 *
 * Reveals are driven by `useRevealInView` (see lib/useRevealInView.ts) feeding
 * the `animate` prop, which IS in `domAnimation`. That hook is ours, and it
 * fails open — see the note there for why that matters.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * TWO OTHER RULES HOLD THIS FILE TOGETHER
 *
 * · The rendered markup never branches on reduced motion. `useReducedMotion`
 *   resolves differently on the server and the client, so branching the tree on
 *   it is a hydration mismatch. Markup stays identical; only the transition
 *   duration changes. `useInView` starts `false` on both the server and the
 *   first client render, so `animate` matches `initial` at hydration.
 *
 * · Every animated wrapper carries `data-ke-reveal`, so the no-JavaScript
 *   fallback in the root layout can force it visible.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const INSTANT = { duration: 0 };

/** Shared viewport trigger. One place to tune when reveals feel early or late. */
const IN_VIEW = { once: true, margin: "-72px" };

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
  const ref = useRef<HTMLElement>(null);
  const inView = useRevealInView(ref, IN_VIEW);
  const reduce = useReducedMotion();
  // `m[as]` is a union of element components, so a single ref type never
  // satisfies all of them. Widened here rather than casting the ref at the
  // call site — the props below are still checked by the motion types.
  const MotionTag = m[as] as ElementType;

  return (
    <MotionTag
      ref={ref}
      data-ke-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
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

/**
 * Image mask reveal — the frame wipes upward to expose the photograph.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * THE OBSERVED ELEMENT IS NEVER THE CLIPPED ONE
 *
 * Chrome does not reliably update an IntersectionObserver that has a
 * `rootMargin` when the target's own `clip-path` hides it completely. Measured
 * on the service pages: the mask scrolled into view, and its observer reported
 * nothing until the watchdog unclipped the frame two seconds later — every
 * image sat as an empty box for 2s. Observers on unclipped elements fired on
 * the same frame.
 *
 * So the outer element is observed and carries the layout classes, and the
 * inner element is the one that animates `clip-path`. `data-ke-reveal` stays on
 * the inner element, where the no-JS, reduced-motion and watchdog fallbacks
 * need it.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function RevealMask({
  children,
  delay = 0,
  className,
  innerClassName = "h-full",
}: {
  children: ReactNode;
  delay?: number;
  /** Layout classes — margins, grid order, display, stickiness. */
  className?: string;
  /** Classes for the clipped frame, e.g. `flex flex-1` to pass flex through. */
  innerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useRevealInView(ref, { once: true, margin: "-64px" });
  const reduce = useReducedMotion();

  const hidden = { clipPath: "inset(100% 0% 0% 0%)" };
  const shown = { clipPath: "inset(0% 0% 0% 0%)" };

  return (
    <div ref={ref} className={className}>
      <m.div
        data-ke-reveal=""
        className={innerClassName}
        initial={hidden}
        animate={inView ? shown : hidden}
        transition={reduce ? INSTANT : { duration: 1, delay, ease: EASE }}
      >
        {children}
      </m.div>
    </div>
  );
}

/**
 * A rule that draws itself in from the left.
 *
 * Uses `scaleX` rather than animating `width` — same result, but it stays on the
 * compositor instead of triggering layout on every frame.
 *
 * Only ever used with `onMount` today. If it is ever scroll-triggered, give it an
 * unscaled wrapper to observe, for the same reason RevealMask has one: an
 * element scaled to nothing is as unreliable an IntersectionObserver target as
 * one clipped to nothing.
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
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useRevealInView(ref, IN_VIEW);
  const reduce = useReducedMotion();

  const active = onMount || inView;

  return (
    <m.span
      ref={ref}
      data-ke-reveal=""
      aria-hidden="true"
      className={className}
      style={{ transformOrigin: "left" }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: active ? 1 : 0 }}
      transition={reduce ? INSTANT : { duration: 0.9, delay, ease: EASE }}
    >
      {}
    </m.span>
  );
}
