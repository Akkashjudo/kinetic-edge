"use client";

import { useRef, useState } from "react";
import { m, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { methodSteps } from "@/data/method";
import type { Accent, MethodStep } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface MethodProcessProps {
  steps?: MethodStep[];
  index?: string;
  label?: string;
  title?: React.ReactNode;
  lead?: string;
  accent?: Accent;
  tone?: "dark" | "light";
  /**
   * "signature" — full treatment with the scroll-activated rail. Homepage,
   * about and the services index only.
   * "compact"  — heading plus a single row of steps, no rail. For the interior
   * pages where the method is supporting context rather than the point.
   */
  variant?: "signature" | "compact";
  className?: string;
}

/**
 * The Kinetic Edge method: Assess → Prescribe → Monitor → Re-test.
 * Signature moment 03.
 *
 * The rail is not decoration — it drives the steps. As the fill passes each
 * node, that step activates: node fills, index takes the accent, title and body
 * lift to full emphasis. Steps ahead of the line stay quieter.
 *
 * ACCESSIBILITY  Inactive steps are dimmed with a *colour token* that still
 * meets AA (--steel-500 is 5.43:1 on --night), never with an opacity value that
 * would drop text below contrast. The written sequence is legible whether or not
 * the animation ever runs, and reduced motion renders every step active with the
 * rail complete.
 */
export function MethodProcess({
  steps = methodSteps,
  index = "03",
  label = "Method",
  title = (
    <>
      A system,
      <br />
      not random training.
    </>
  ),
  lead = "Everything at Kinetic Edge runs through the same four steps — in the gym and in the clinic, for a professional athlete and for someone training for their own goals.",
  accent = "performance",
  tone = "dark",
  variant = "signature",
  className,
}: MethodProcessProps) {
  /**
   * The variants are split into separate components rather than branched inside
   * one. `useScroll({ target })` must only run where the ref is actually
   * attached — calling it here and then early-returning the compact variant left
   * the hook pointing at an element that never mounts, which throws
   * "target ref is defined but not hydrated" on every compact instance.
   */
  if (variant === "compact") {
    return (
      <CompactMethod
        steps={steps}
        index={index}
        label={label}
        title={title}
        accent={accent}
        tone={tone}
        className={className}
      />
    );
  }

  return (
    <SignatureMethod
      steps={steps}
      index={index}
      label={label}
      title={title}
      lead={lead}
      accent={accent}
      tone={tone}
      className={className}
    />
  );
}

/**
 * The full treatment: a scroll-linked rail that activates each step as it
 * reaches it. Homepage, /about and the services index only.
 */
function SignatureMethod({
  steps,
  index,
  label,
  title,
  lead,
  accent,
  tone,
  className,
}: {
  steps: MethodStep[];
  index?: string;
  label: string;
  title: React.ReactNode;
  lead?: string;
  accent: Accent;
  tone: "dark" | "light";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const dark = tone === "dark";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });

  const smoothed = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // Both begin at 0, so SSR and the first client render agree.
  const progress = reduce ? scrollYProgress : smoothed;

  // How many steps the rail has reached. Starts at 0 on both the server and the
  // first client render, so hydration matches. Visitors who prefer reduced
  // motion get every step forced to its active state in CSS instead — see the
  // `.ke-step` block in globals.css.
  const [reached, setReached] = useState(0);

  useMotionValueEvent(progress, "change", (value) => {
    // A step lights as the rail arrives at it, with a small lead-in so the
    // activation reads as caused by the line rather than trailing it.
    const next = Math.min(steps.length, Math.floor(value * steps.length + 0.35));
    setReached((current) => (current === next ? current : next));
  });

  return (
    <section
      data-accent={accent}
      className={cn(
        "ke-section-lg relative overflow-hidden",
        dark ? "surface-dark bg-night text-white" : "bg-bone text-ink",
        className,
      )}
    >
      {dark ? (
        <>
          <div aria-hidden="true" className="ke-grid-lines absolute inset-0 opacity-70" />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 55% at 50% 0%, color-mix(in srgb, var(--accent) 20%, transparent) 0%, transparent 60%)",
            }}
          />
        </>
      ) : null}

      <Container className="relative">
        <SectionHeading index={index} label={label} title={title} lead={lead} tone={tone} />

        <div ref={ref} className="mt-14 lg:mt-20">
          {/* Desktop rail */}
          <div
            aria-hidden="true"
            className={cn(
              "relative hidden h-px w-full lg:block",
              dark ? "bg-white/12" : "bg-line",
            )}
          >
            <m.span
              className="ke-rail-fill absolute inset-y-0 left-0 block w-full origin-left bg-accent"
              style={{ scaleX: progress }}
            />
          </div>

          <ol
            className={cn(
              "relative grid",
              steps.length > 4
                ? "gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10"
                : "gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8",
            )}
          >
            {/* Mobile rail — the same logic, read vertically. */}
            <div
              aria-hidden="true"
              className={cn(
                "absolute bottom-2 left-[0.4375rem] top-2 w-px lg:hidden",
                dark ? "bg-white/12" : "bg-line",
              )}
            >
              <m.span
                className="ke-rail-fill absolute inset-x-0 top-0 block h-full origin-top bg-accent"
                style={{ scaleY: progress }}
              />
            </div>

            {steps.map((step, stepIndex) => {
              const active = stepIndex < reached;

              return (
                <li
                  key={step.index}
                  className="ke-step relative pl-8 sm:pl-9 lg:pl-0 lg:pt-8"
                  data-active={active}
                  data-tone={dark ? "dark" : "light"}
                >
                  {/* Node marker — fills as the rail arrives. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-0 top-1.5 h-[0.9375rem] w-[0.9375rem] rotate-45 border border-[var(--step-node-border)] lg:left-0 lg:top-[-0.4375rem]",
                      dark ? "bg-night" : "bg-bone",
                    )}
                  >
                    <span className="absolute inset-[3px] bg-[var(--step-node)]" />
                  </span>

                  <p className="ke-label mb-4 text-[var(--step-index)]">
                    {step.index}
                  </p>

                  <h3 className="font-display text-xl font-bold tracking-[-0.028em] text-[var(--step-title)] sm:text-2xl">
                    {step.title}
                  </h3>

                  <p className="ke-body-sm mt-3 max-w-[34ch] text-[var(--step-body)]">
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/**
 * Compact variant — the method as supporting context. No rail, no activation,
 * no scroll subscription. Used on interior pages so the full signature
 * treatment stays rare enough to still read as signature.
 */
function CompactMethod({
  steps,
  index,
  label,
  title,
  accent,
  tone,
  className,
}: {
  steps: MethodStep[];
  index?: string;
  label: string;
  title: React.ReactNode;
  accent: Accent;
  tone: "dark" | "light";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <section
      data-accent={accent}
      className={cn(
        "ke-section-tight relative overflow-hidden",
        dark ? "surface-dark bg-ink text-white" : "bg-bone text-ink",
        className,
      )}
    >
      {dark ? (
        <div aria-hidden="true" className="ke-grid-lines absolute inset-0 opacity-50" />
      ) : null}

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div>
            <p className="ke-label mb-4 flex items-center gap-2">
              {index ? (
                <>
                  <span className="text-accent">{index}</span>
                  <span aria-hidden="true" className={dark ? "text-white/25" : "text-line"}>
                    /
                  </span>
                </>
              ) : null}
              <span className={dark ? "text-steel-400" : "text-steel"}>{label}</span>
            </p>
            <h2
              className={cn(
                "ke-h3 max-w-[16ch]",
                dark ? "text-white" : "text-ink",
              )}
            >
              {title}
            </h2>
          </div>

          <ol className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.index}>
                <div
                  aria-hidden="true"
                  className={cn("h-0.5 w-full", "bg-accent")}
                />
                <p className="ke-label mt-4 text-accent">{step.index}</p>
                <h3
                  className={cn(
                    "mt-2 font-display text-base font-bold tracking-[-0.02em]",
                    dark ? "text-white" : "text-ink",
                  )}
                >
                  {step.title}
                </h3>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
