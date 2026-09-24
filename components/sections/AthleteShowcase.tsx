import { athletes } from "@/data/athletes";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AthleteGallery } from "./AthleteGallery";

/**
 * Athletes and their verified results.
 *
 * "preview" shows the first few and hands over to /athletes; "full" shows
 * everyone. Both read from data/athletes.ts, so a new athlete appears in both
 * places with no code change.
 *
 * Nothing here is aggregated — no medal totals, no athlete counts, no success
 * rates. Only the results the client supplied, exactly as stated.
 */
export function AthleteShowcase({
  index = "06",
  variant = "full",
  /** How many to show in the preview. */
  limit = 4,
  title = variant === "preview" ? "Where the Work Shows Up" : "Verified competition results.",
  lead = variant === "preview"
    ? "Recent results from athletes who train at Kinetic Edge."
    : "Every result here is verified against the athlete's own certificate or trophy. Nothing is aggregated into medal totals or athlete counts.",
  surface = "bone",
}: {
  index?: string;
  variant?: "preview" | "full";
  limit?: number;
  title?: string;
  lead?: string;
  surface?: "paper" | "bone";
}) {
  if (athletes.length === 0) return null;

  const shown = variant === "preview" ? athletes.slice(0, limit) : athletes;

  return (
    <section
      data-accent="performance"
      className={cn("ke-section", surface === "paper" ? "bg-paper" : "bg-bone")}
    >
      <Container>
        <Reveal>
          <SectionHeading
            index={index}
            label="Athletes"
            title={title}
            lead={lead}
            aside={
              variant === "preview" ? (
                <CTAButton href="/athletes" variant="outline">
                  See all athletes
                </CTAButton>
              ) : undefined
            }
          />
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-14 lg:mt-18">
            <AthleteGallery athletes={shown} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
