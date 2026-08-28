"use client";

import { m, useReducedMotion } from "framer-motion";

/**
 * Hero atmosphere — the measurement language the rest of the site is built on,
 * rendered as depth behind the headline rather than as decoration in front of it.
 *
 * Four layers, all `aria-hidden` and all cheap:
 *   1. dot matrix      a fine coordinate field
 *   2. grid lines      the existing 88px technical grid
 *   3. edge ruler      tick marks down the right edge, like an instrument scale
 *   4. sweep           one slow horizontal line, the only thing that moves
 *
 * Deliberately carries NO numbers. Every figure on this site has to be verified,
 * and a decorative "98.4" in the hero would be an invented performance metric.
 * The instrumentation reads through form — ticks, axes, registration marks.
 *
 * Everything is transform/opacity only, and the sweep is removed entirely under
 * reduced motion rather than left frozen mid-travel.
 */
export function HeroBackdrop() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 1 — dot matrix */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.16) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(120% 90% at 20% 60%, black 0%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 20% 60%, black 0%, transparent 72%)",
        }}
      />

      {/* 2 — technical grid */}
      <div className="ke-grid-lines absolute inset-0 opacity-40" />

      {/* 3 — instrument scale down the right edge */}
      <div className="absolute inset-y-0 right-0 hidden w-16 md:block lg:w-24">
        <div className="absolute inset-y-[12%] right-8 w-px bg-white/12 lg:right-12" />
        {Array.from({ length: 13 }).map((_, i) => (
          <span
            key={i}
            className="absolute right-8 block h-px bg-white/20 lg:right-12"
            style={{
              top: `${12 + i * (76 / 12)}%`,
              // Every third tick is a major graduation.
              width: i % 3 === 0 ? "18px" : "9px",
              opacity: i % 3 === 0 ? 0.5 : 0.28,
            }}
          />
        ))}
      </div>

      {/* Corner registration marks */}
      {[
        "left-5 top-24 border-l border-t lg:left-10",
        "right-5 top-24 border-r border-t lg:right-10",
      ].map((pos) => (
        <span
          key={pos}
          className={`absolute hidden h-5 w-5 border-white/20 md:block ${pos}`}
        />
      ))}

      {/* 4 — the single moving element.
             Always rendered, so server and client markup match; `animate` holds
             it at its initial state under reduced motion and the CSS class
             removes it entirely. */}
      <m.span
        className="ke-motion-only absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-ke-blue/45 to-transparent"
        initial={{ top: "18%", opacity: 0 }}
        animate={
          reduce
            ? { top: "18%", opacity: 0 }
            : { top: ["18%", "88%"], opacity: [0, 1, 1, 0] }
        }
        transition={
          reduce
            ? { duration: 0 }
            : {
                duration: 7,
                times: [0, 0.15, 0.85, 1],
                repeat: Infinity,
                repeatDelay: 3.5,
                ease: "linear",
              }
        }
      />
    </div>
  );
}
