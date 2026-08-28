import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { serviceCategories } from "@/data/services";
import { servicesFaq } from "@/data/faq";
import { BreadcrumbSchema, FaqSchema } from "@/components/StructuredData";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Figure } from "@/components/ui/Figure";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealMask } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MethodProcess } from "@/components/sections/MethodProcess";
import { ProgrammeGrid } from "@/components/sections/ProgrammeGrid";
import { ServicesMarquee } from "@/components/sections/ServicesMarquee";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Strength & conditioning, athlete development, performance testing, sports physiotherapy, sports rehabilitation and online coaching at Kinetic Edge, Chennai.",
  path: "/services",
});

const categoryImages = ["performanceCentre", "rehabCentre"] as const;

/**
 * How a single athlete moves between the two environments. Describes the
 * process only — no timelines, outcomes or clinical claims.
 */
const handover = [
  {
    environment: "Rehabilitation",
    accent: "rehab" as const,
    title: "Assessed in the clinic",
    body: "The injury, its irritability and the demands of the sport are established together.",
  },
  {
    environment: "Rehabilitation",
    accent: "rehab" as const,
    title: "Loaded progressively",
    body: "Capacity is rebuilt in the affected area while the rest of the body keeps training.",
  },
  {
    environment: "Performance",
    accent: "performance" as const,
    title: "Reconditioned on the floor",
    body: "Strength, power and conditioning are rebuilt to the level competition requires.",
  },
  {
    environment: "Performance",
    accent: "performance" as const,
    title: "Re-tested against baseline",
    body: "Readiness is judged against the athlete's own numbers, not against the calendar.",
  },
];

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
        index="02"
        label="Services"
        title="Performance and recovery under one system."
        lead="Two environments, one process. What changes between them is the goal — not the standard of assessment, prescription and re-testing behind it."
        actions={
          <CTAButton href="/contact" variant="light">
            Book an Assessment
          </CTAButton>
        }
      />

      <ServicesMarquee />

      {/* ------------------------------------------------ Category split */}
      <section className="ke-section bg-paper">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-px lg:border lg:border-line lg:bg-line">
            {serviceCategories.map((category, index) => (
              <Reveal
                key={category.title}
                delay={index * 0.08}
                className="bg-paper lg:p-10 xl:p-12"
              >
                <div data-accent={category.accent}>
                  <RevealMask className="mb-9">
                    <Figure
                      imageKey={categoryImages[index] ?? "facility"}
                      ratio="16/9"
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      tone="dark"
                    />
                  </RevealMask>

                  <SectionLabel index={category.code} className="mb-6">
                    {category.title}
                  </SectionLabel>

                  <h2 className="ke-h2 text-ink">
                    {category.title}
                    <span className="text-accent">.</span>
                  </h2>

                  <p className="ke-lead mt-4 max-w-lg">{category.description}</p>

                  <ul className="mt-9 border-t border-line">
                    {category.items.map((item) => (
                      <li key={item.label} className="border-b border-line">
                        <Link
                          href={item.href}
                          className="group flex items-center justify-between gap-4 py-4 transition-colors"
                        >
                          <span className="flex items-center gap-3.5">
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 shrink-0 bg-accent"
                            />
                            <span className="font-display text-base font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-accent-ink md:text-lg">
                              {item.label}
                            </span>
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-steel transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <MethodProcess index="03" variant="compact" />
      <ProgrammeGrid />

      {/* The handover between environments — the thing that actually
          distinguishes the two-centre model, shown rather than asserted. */}
      <section className="ke-section bg-paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <SectionHeading
                index="05"
                label="Between the two"
                title="One athlete, one plan."
                lead="An athlete rehabilitating a shoulder does not stop training their legs. Because both environments sit inside the same system, the rehabilitation plan and the training plan are written against each other rather than in isolation."
              />
            </Reveal>

            <Reveal delay={0.06}>
              <ol className="grid gap-px border border-line bg-line sm:grid-cols-2">
                {handover.map((stage, index) => (
                  <li
                    key={stage.title}
                    data-accent={stage.accent}
                    className="flex min-h-44 flex-col justify-between gap-6 bg-paper p-6 lg:p-7"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="ke-label text-accent-ink">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="ke-label text-steel">{stage.environment}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold tracking-[-0.02em] text-ink lg:text-lg">
                        {stage.title}
                      </h3>
                      <p className="ke-body-sm mt-2 text-steel">{stage.body}</p>
                    </div>
                    <span aria-hidden="true" className="h-0.5 w-10 bg-accent" />
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection items={servicesFaq} index="06" />
      <ContactCTA />
    </>
  );
}
