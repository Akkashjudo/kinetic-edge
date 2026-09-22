import { ambassadors } from "@/data/ambassadors";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AmbassadorGallery } from "./AmbassadorGallery";

/**
 * Athletes who represent Kinetic Edge.
 *
 * Renders one card per entry in data/ambassadors.ts; a card opens the athlete's
 * full profile. With a single ambassador the card takes the whole right-hand
 * column rather than sitting alone in a grid built for several.
 *
 * Dark on the homepage, where it follows three light sections; light on
 * /athletes, where it would otherwise stack under the dark page hero.
 */
export function AthleteAmbassadors({
  index = "05",
  tone = "dark",
  showCta = true,
}: {
  index?: string;
  tone?: "dark" | "light";
  /** Link through to /athletes — off on /athletes itself. */
  showCta?: boolean;
}) {
  if (ambassadors.length === 0) return null;

  const dark = tone === "dark";

  return (
    <section
      data-accent="performance"
      className={cn(
        "ke-section relative overflow-hidden",
        dark ? "surface-dark bg-night text-white" : "bg-paper",
      )}
    >
      {dark ? (
        <>
          <div aria-hidden="true" className="ke-grid-lines absolute inset-0 opacity-50" />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 60% at 85% 20%, rgba(19,133,214,0.2) 0%, transparent 62%)",
            }}
          />
        </>
      ) : null}

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                index={index}
                label="Athlete Ambassadors"
                title="Athletes Who Represent Kinetic Edge"
                lead="Athletes who train with Kinetic Edge and carry its name into competition."
                tone={tone}
              />
            </Reveal>

            {showCta ? (
              <Reveal delay={0.08}>
                <div className="mt-9">
                  <CTAButton href="/athletes" variant={dark ? "outlineLight" : "outline"}>
                    Meet our athletes
                  </CTAButton>
                </div>
              </Reveal>
            ) : null}
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.06}>
              <AmbassadorGallery ambassadors={ambassadors} tone={tone} />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
