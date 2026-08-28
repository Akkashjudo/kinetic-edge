import { competitions, competitionsLabel } from "@/data/competitions";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Where Kinetic Edge athletes compete.
 *
 * ⚠ These are competitions, not partners. This component must never be
 * relabelled "Trusted Partners", "Clients" or "Associations", and must never be
 * merged with the partner section.
 *
 * Sits as a connective band rather than inside the athlete-proof section: while
 * results are unavailable it is the verified proof on the page, and once they
 * land it must not dilute them.
 */
/** Surfaces are a prop, not a className override — two background utilities of
 *  equal specificity would otherwise resolve by stylesheet order, not by
 *  call site, and silently ignore the caller's choice. */
const surfaces = {
  paper: "bg-paper",
  bone: "bg-bone",
  ink: "surface-dark bg-ink text-white",
} as const;

export function CompetitionMarquee({
  surface = "paper",
  className,
}: {
  surface?: keyof typeof surfaces;
  className?: string;
}) {
  const tone = surface === "ink" ? "dark" : "light";

  return (
    <div
      className={cn("ke-section-connective", surfaces[surface], className)}
    >
      <Container>
        <SectionLabel tone={tone} className="mb-8">
          {competitionsLabel}
        </SectionLabel>
      </Container>

      <Marquee items={competitions} tone={tone} duration={78} />
    </div>
  );
}
