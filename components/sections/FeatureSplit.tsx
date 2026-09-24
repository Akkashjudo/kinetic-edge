import type { SiteImageKey } from "@/data/images";
import type { Accent } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealMask } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Alternating image / text composition, used to break up long service and about
 * pages without repeating the same card grid.
 */
export function FeatureSplit({
  imageKey,
  label,
  index,
  title,
  body,
  points,
  cta,
  flip = false,
  accent = "performance",
  surface = "paper",
}: {
  /**
   * Omit where no honest photograph exists for the subject. The block then
   * lays out as text and points across the full width, rather than parking a
   * placeholder plate next to it.
   */
  imageKey?: SiteImageKey;
  label: string;
  index?: string;
  title: string;
  body: string;
  points?: string[];
  cta?: { label: string; href: string };
  /** Places the image on the left. */
  flip?: boolean;
  accent?: Accent;
  surface?: "paper" | "bone";
}) {
  return (
    <section
      data-accent={accent}
      className={cn("ke-section", surface === "bone" ? "bg-bone" : "bg-paper")}
    >
      <Container>
        <div
          className={cn(
            "grid items-center gap-10 lg:gap-20",
            imageKey ? "lg:grid-cols-2" : "max-w-4xl",
          )}
        >
          {imageKey ? (
            <RevealMask className={cn(flip ? "lg:order-1" : "lg:order-2")}>
              <Figure
                imageKey={imageKey}
                ratio="4/3"
                sizes="(min-width: 1024px) 48vw, 100vw"
                tone="dark"
              />
            </RevealMask>
          ) : null}

          <Reveal className={cn(flip ? "lg:order-2" : "lg:order-1")}>
            <SectionLabel index={index} className="mb-6">
              {label}
            </SectionLabel>

            <h2 className="ke-h2 max-w-[18ch] text-ink">{title}</h2>

            <p className="ke-lead mt-5 max-w-xl">{body}</p>

            {points ? (
              <ul className="mt-8 grid gap-x-8 gap-y-0 border-t border-line sm:grid-cols-2">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 border-b border-line py-3.5 text-[0.875rem] text-ink/85"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.45rem] h-1 w-1 shrink-0 bg-accent"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}

            {cta ? (
              <div className="mt-9">
                <CTAButton href={cta.href} variant="outline">
                  {cta.label}
                </CTAButton>
              </div>
            ) : null}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
