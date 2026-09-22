import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { otherCollaborations, pastWorkshops } from "@/data/collaborations";
import {
  educationFocus,
  educationIntro,
  featuredEvent,
  upcomingEvents,
} from "@/data/education";
import { site } from "@/data/site";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkshopRecord } from "@/components/sections/EducationFeature";
import { CollaborationTimeline } from "@/components/sections/CollaborationTimeline";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = pageMetadata({
  title: "KE Education",
  description:
    "KE Education — workshops, seminars, coach education and collaborations from Kinetic Edge, Chennai, sharing practical knowledge in strength & conditioning, sports science and performance development.",
  path: "/education",
});

/**
 * KE Education → Workshops → Education Programmes → Collaborations.
 *
 * Collaborations moved here from /about. The record is split so nothing is
 * listed twice: workshops sit under Workshops, and camps, assessments and
 * representations under Collaborations.
 *
 * No upcoming event, attendee number, feedback or price is fabricated anywhere
 * on this page.
 */
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
        label="KE Education"
        title="From practice to education."
        lead={educationIntro}
        actions={
          <CTAButton href={site.links.instagram} external variant="outlineLight">
            Follow for announcements
          </CTAButton>
        }
      />

      {/* ------------------------------------------------------ Focus areas */}
      <section data-accent="performance" className="ke-section-tight bg-paper">
        <Container>
          <Reveal>
            <p className="ke-label mb-6 text-steel">What KE Education covers</p>
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
              {educationFocus.map((area, i) => (
                <li key={area} className="flex flex-col gap-6 bg-paper p-5 lg:p-6">
                  <span className="ke-label text-accent-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-bold leading-snug tracking-[-0.02em] text-ink">
                    {area}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* -------------------------------------------------------- Workshops */}
      <section
        id="workshops"
        data-accent="performance"
        className="ke-section bg-bone"
      >
        <Container>
          <Reveal>
            <SectionHeading
              index="01"
              label="Workshops"
              title="Hands-on, from the performance floor."
              lead="Practical sessions built from what is used with athletes every day."
              className="mb-14 lg:mb-18"
            />
          </Reveal>

          <WorkshopRecord event={featuredEvent} />

          {pastWorkshops.length > 0 ? (
            <Reveal>
              <div className="mt-14 lg:mt-18">
                <h3 className="ke-label mb-2 text-steel">Earlier workshops</h3>
                <ul className="border-t border-line">
                  {pastWorkshops.map((workshop) => (
                    <li
                      key={workshop.title}
                      className="flex flex-col gap-1.5 border-b border-line py-4 sm:flex-row sm:items-baseline sm:gap-8"
                    >
                      <p className="shrink-0 font-mono text-[0.75rem] tabular-nums text-steel sm:w-36">
                        {workshop.date ?? workshop.year}
                      </p>
                      <p className="flex-1 font-display text-base font-semibold leading-snug tracking-[-0.02em] text-ink">
                        {workshop.title}
                      </p>
                      {workshop.withWhom ? (
                        <p className="ke-body-sm shrink-0 text-steel">with {workshop.withWhom}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* ---------------------------------------------- Education programmes */}
      {/* Nothing is fabricated. When a programme is confirmed it is added to
          data/education.ts with status "upcoming" and appears here. */}
      <section data-accent="performance" className="ke-section bg-paper">
        <Container>
          <Reveal>
            <SectionHeading
              index="02"
              label="Education Programmes"
              title="New programmes are announced here."
              lead="Kinetic Edge does not list a programme until its date, venue and content are confirmed. Announcements go out on Instagram first."
            />
          </Reveal>

          {upcomingEvents.length === 0 ? (
            <Reveal delay={0.06}>
              <div className="mt-12 border border-dashed border-line bg-bone p-8 md:p-12">
                <p className="ke-label mb-5 text-steel">No dates currently scheduled</p>
                <p className="max-w-xl font-display text-xl font-bold leading-snug tracking-[-0.025em] text-ink md:text-2xl">
                  Workshops and programmes are announced as they are confirmed.
                </p>
                <p className="ke-body mt-4 max-w-xl text-steel">
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
          ) : (
            <div className="mt-12 space-y-10">
              {upcomingEvents.map((event) => (
                <WorkshopRecord key={event.slug} event={event} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ---------------------------------------------------- Collaborations */}
      <CollaborationTimeline
        index="03"
        events={otherCollaborations}
        title="Where the work has taken us."
        lead="Camps, assessments and representations delivered with schools, networks and institutions since 2023."
        surface="bone"
      />

      <ContactCTA
        title="Bring KE Education to Your Group"
        body="For workshops, coach education or applied sessions for your school, club or team, get in touch by phone or WhatsApp."
      />
    </>
  );
}
