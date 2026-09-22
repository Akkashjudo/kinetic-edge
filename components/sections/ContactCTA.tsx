import { contactCta, primaryCta } from "@/data/site";
import type { Accent } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Closing call to action. Every page ends here.
 *
 * Set as a dark panel inside a light section rather than a full-bleed dark
 * band, so a strip of light always separates it from the dark footer — the two
 * no longer read as one long undifferentiated ending.
 *
 * Two actions only: book a consultation (the enquiry form), or get in touch
 * another way (the contact page, with phone, WhatsApp and both centres).
 */
export function ContactCTA({
  title = "Ready to Take Your Performance Further?",
  body = "Whether you're preparing for competition, returning from injury or simply looking to train better, our team can help build the right performance plan for you.",
  accent = "performance",
  surface = "paper",
}: {
  title?: string;
  body?: string;
  accent?: Accent;
  surface?: "paper" | "bone";
}) {
  return (
    <section
      data-accent={accent}
      className={cn(
        "py-14 md:py-20 lg:py-24",
        surface === "bone" ? "bg-bone" : "bg-paper",
      )}
    >
      <Container>
        <Reveal>
          <div className="surface-dark relative isolate overflow-hidden bg-night px-6 py-14 text-white sm:px-10 md:px-14 md:py-20 lg:px-20 lg:py-24">
            <div aria-hidden="true" className="ke-grid-lines absolute inset-0 -z-10 opacity-70" />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(70% 80% at 0% 100%, color-mix(in srgb, var(--accent) 32%, transparent) 0%, transparent 62%)",
              }}
            />
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] w-1/4 bg-accent" />

            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
              <div>
                <h2 className="ke-h1 max-w-[20ch] text-white">{title}</h2>
                <p className="ke-lead mt-6 max-w-xl text-steel-400">{body}</p>
              </div>

              {/* Stacked from lg up, so the headline keeps the width it needs. */}
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <CTAButton href={primaryCta.href} variant="light" size="lg">
                  {primaryCta.label}
                </CTAButton>
                <CTAButton href={contactCta.href} variant="outlineLight" size="lg">
                  {contactCta.label}
                </CTAButton>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
