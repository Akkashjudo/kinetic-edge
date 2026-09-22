import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { primaryCta } from "@/data/site";
import { programmes } from "@/data/programmes";
import { servicesFaq } from "@/data/faq";
import { BreadcrumbSchema, FaqSchema } from "@/components/StructuredData";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { PillarSystem } from "@/components/sections/PillarSystem";
import { MethodProcess } from "@/components/sections/MethodProcess";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Strength & conditioning, athlete performance training, physiotherapy & sports rehabilitation and distance coaching at Kinetic Edge, Chennai.",
  path: "/services",
});

/**
 * The services index.
 *
 * The four services first, then everything behind them — the six disciplines,
 * the programme formats, and the process — for a visitor who wants the detail
 * the homepage deliberately leaves out.
 */
export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <FaqSchema items={servicesFaq} />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        label="Services"
        title="How We Help You Perform Better"
        lead="Four services, one team and one process — for competitive athletes, developing athletes, fitness clients and anyone recovering from injury."
        actions={
          <>
            <CTAButton href={primaryCta.href} variant="light">
              {primaryCta.label}
            </CTAButton>
            <CTAButton href="/programmes" variant="outlineLight">
              Compare Programmes
            </CTAButton>
          </>
        }
      />

      <ServicesOverview
        index="01"
        title="Four Ways to Work With Us"
        lead="Each one starts with an assessment and is built around you."
      />

      {/* The full service list behind the four, including nutrition, mental
          performance and recovery. */}
      <PillarSystem index="02" />

      {/* ------------------------------------------------------ Programmes */}
      <section data-accent="performance" className="ke-section bg-paper">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                index="03"
                label="Programmes"
                title="Find the Format That Fits"
                lead="Train in a squad, a small group, one-to-one, or remotely. Five programmes, compared side by side."
              />
              <div className="mt-9">
                <CTAButton href="/programmes" variant="primary">
                  Compare Programmes
                </CTAButton>
              </div>
            </Reveal>

            <Reveal delay={0.06} className="lg:col-span-7">
              <ol className="border-t border-line">
                {programmes.map((programme) => (
                  <li
                    key={programme.slug}
                    className="flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b border-line py-4 sm:flex-nowrap sm:py-5"
                  >
                    <span className="ke-label w-6 shrink-0 text-accent-ink">
                      {programme.code}
                    </span>
                    <span className="font-display text-lg font-bold tracking-[-0.02em] text-ink">
                      {programme.title}
                    </span>
                    <span className="ke-body-sm w-full pl-11 text-steel sm:ml-auto sm:w-auto sm:pl-0 sm:text-right">
                      {[programme.specs.ratio, programme.remote && "Remote"]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>

      <MethodProcess index="04" variant="compact" tone="light" />

      <FaqSection items={servicesFaq} index="05" surface="paper" />
      <ContactCTA />
    </>
  );
}
