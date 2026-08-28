import type { Accent, MethodStep } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * A longer pathway rendered as a staircase — each step sits slightly lower than
 * the last, and the rule above it strengthens toward the accent as the sequence
 * progresses. Visually distinct from the four-step branded method.
 */
export function ProcessSteps({
  steps,
  index,
  label,
  title,
  lead,
  accent = "rehab",
  tone = "light",
}: {
  steps: MethodStep[];
  index?: string;
  label: string;
  title: React.ReactNode;
  lead?: string;
  accent?: Accent;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <section
      data-accent={accent}
      className={cn(
        "ke-section relative overflow-hidden",
        dark ? "surface-dark bg-night text-white" : "bg-bone",
      )}
    >
      {dark ? (
        <div aria-hidden="true" className="ke-grid-lines absolute inset-0 opacity-60" />
      ) : null}

      <Container className="relative">
        <Reveal>
          <SectionHeading
            index={index}
            label={label}
            title={title}
            lead={lead}
            tone={tone}
          />
        </Reveal>

        <ol className="mt-14 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-5">
          {steps.map((step, stepIndex) => {
            // The rule strengthens from a hairline to full accent across the run.
            const strength = 0.3 + (0.7 * stepIndex) / Math.max(steps.length - 1, 1);

            return (
              <Reveal
                key={step.index}
                as="li"
                delay={Math.min(stepIndex, 5) * 0.06}
              >
                <div
                  style={{ ["--step" as string]: stepIndex }}
                  className="xl:mt-[calc(var(--step)*1.5rem)]"
                >
                  <div
                    aria-hidden="true"
                    className="h-0.5 w-full"
                    style={{
                      backgroundColor: `color-mix(in srgb, var(--accent) ${Math.round(
                        strength * 100,
                      )}%, ${dark ? "#1a2c42" : "#dde4ec"})`,
                    }}
                  />

                  <p className={cn("ke-label mt-5", dark ? "text-accent" : "text-accent-ink")}>
                    {step.index}
                  </p>

                  <h3
                    className={cn(
                      "mt-3 font-display text-xl font-bold tracking-[-0.028em]",
                      dark ? "text-white" : "text-ink",
                    )}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={cn(
                      "mt-3 ke-body-sm",
                      dark ? "text-steel-400" : "text-steel",
                    )}
                  >
                    {step.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
