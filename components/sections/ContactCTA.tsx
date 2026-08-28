import { primaryCta, site } from "@/data/site";
import type { Accent } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * Closing conversion block. Every page ends here.
 *
 * The phone number and location line that used to sit at the foot of this
 * section were removed: the footer carries both immediately below, and running
 * them twice in ~1,100px of continuous dark surface made the two blocks read as
 * one long undifferentiated ending.
 */
export function ContactCTA({
  title = "Ready to start?",
  body = "Whether the goal is better performance, structured rehabilitation or a return to sport, start with an assessment.",
  accent = "performance",
}: {
  title?: string;
  body?: string;
  accent?: Accent;
}) {
  return (
    <section
      data-accent={accent}
      className="surface-dark relative isolate overflow-hidden bg-night text-white"
    >
      <div aria-hidden="true" className="ke-grid-lines absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 65% at 15% 100%, color-mix(in srgb, var(--accent) 30%, transparent) 0%, transparent 62%)",
        }}
      />

      <Container className="relative py-20 md:py-28 lg:py-32">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
          <Reveal>
            <h2 className="ke-h1 max-w-[14ch] text-white">{title}</h2>
            <p className="ke-lead mt-6 max-w-xl text-steel-400">{body}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <CTAButton href={primaryCta.href} variant="light" size="lg">
                {primaryCta.label}
              </CTAButton>
              <CTAButton
                href={site.whatsapp.href}
                external
                variant="outlineLight"
                size="lg"
                arrow={false}
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp Us
              </CTAButton>
            </div>
          </Reveal>
        </div>

      </Container>
    </section>
  );
}
