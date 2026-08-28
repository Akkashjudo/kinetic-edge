import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { upcomingEvents } from "@/data/education";
import { site } from "@/data/site";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EducationFeature } from "@/components/sections/EducationFeature";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = pageMetadata({
  title: "KE Education",
  description:
    "KE Education — workshops and applied education from Kinetic Edge, Chennai, for coaches, clinicians and students working in sport.",
  path: "/education",
});

export default function EducationPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "KE Education", path: "/education" },
        ]}
      />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "KE Education" }]}
        index="05"
        label="KE Education"
        title="From practice to education."
        lead="What is used with athletes on the floor is also taught — to coaches, clinicians and students working in sport."
        actions={
          <CTAButton href={site.links.instagram} external variant="outlineLight">
            Follow for announcements
          </CTAButton>
        }
      />

      <EducationFeature index="01" showHeading={false} />

      {/* Nothing is fabricated here. When a real event is confirmed it is added
          to data/education.ts with status "upcoming" and appears in its place. */}
      <section data-accent="performance" className="ke-section bg-bone">
        <Container>
          <Reveal>
            <SectionHeading
              index="02"
              label="Upcoming"
              title="New programmes will be announced here."
              lead="Kinetic Edge does not list an event until the date, venue and content are confirmed. Announcements go out on Instagram first."
            />
          </Reveal>

          {upcomingEvents.length === 0 ? (
            <Reveal delay={0.06}>
              <div className="mt-12 border border-dashed border-line bg-paper p-8 md:p-12">
                <p className="ke-label mb-5 text-steel">
                  No dates currently scheduled
                </p>
                <p className="max-w-xl font-display text-xl font-bold leading-snug tracking-[-0.025em] text-ink md:text-2xl">
                  Workshops are announced as they are confirmed.
                </p>
                <p className="mt-4 max-w-xl ke-body text-steel">
                  To hear about the next one, follow Kinetic Edge on Instagram or
                  send a message on WhatsApp and ask to be told when dates open.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <CTAButton href={site.links.instagram} external variant="primary">
                    Instagram
                  </CTAButton>
                  <CTAButton href={site.whatsapp.href} external variant="outline">
                    WhatsApp Kinetic Edge
                  </CTAButton>
                </div>
              </div>
            </Reveal>
          ) : null}
        </Container>
      </section>

      <ContactCTA
        title="Bring KE Education to your group."
        body="For enquiries about workshops, teaching or applied education sessions, get in touch by phone or WhatsApp."
      />
    </>
  );
}
