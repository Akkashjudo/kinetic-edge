import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";
import { contactFaq } from "@/data/faq";
import { BreadcrumbSchema, FaqSchema } from "@/components/StructuredData";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WhatsAppIcon } from "@/components/ui/icons";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { LocationSection } from "@/components/sections/LocationSection";
import { FaqSection } from "@/components/sections/FaqSection";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Book an assessment at Kinetic Edge, 253 Justice Rathinavel Pandian Road, Mogappair East, Chennai. Call or WhatsApp +91 70100 53659.",
  path: "/contact",
});

/** Enquiry routes. No email address is offered anywhere — none exists. */
const enquiryCards = [
  {
    code: "E/01",
    title: "Performance Training",
    body: "Strength & conditioning, athlete development and performance testing.",
    href: "/services/strength-conditioning",
    accent: "performance" as const,
  },
  {
    code: "E/02",
    title: "Physiotherapy & Rehabilitation",
    body: "Injury assessment, treatment, rehabilitation and return to sport.",
    href: "/services/sports-physiotherapy",
    accent: "rehab" as const,
  },
  {
    code: "E/03",
    title: "Online / Distance Coaching",
    body: "Structured coaching for athletes and general population training elsewhere.",
    href: "/services/online-coaching",
    accent: "performance" as const,
  },
  {
    code: "E/04",
    title: "General Enquiry",
    body: "Programmes, formats, KE Education or anything not covered above.",
    href: "/services",
    accent: "performance" as const,
  },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <FaqSchema items={contactFaq} />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        index="07"
        label="Contact"
        title="Start with an assessment."
        lead="An assessment sets the baseline. Whether the goal is performance, rehabilitation or a return to sport, that is where it begins."
        actions={
          <>
            <CTAButton
              href={site.whatsapp.href}
              external
              variant="light"
              arrow={false}
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Kinetic Edge
            </CTAButton>
            <CTAButton
              href={site.phone.href}
              variant="outlineLight"
              arrow={false}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.phone.display}
            </CTAButton>
          </>
        }
      />

      {/* --------------------------------------------------- Enquiry routes */}
      <section className="ke-section-tight bg-paper">
        <Container>
          <Reveal>
            <SectionLabel index="01" className="mb-8">
              What are you enquiring about?
            </SectionLabel>
          </Reveal>

          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {enquiryCards.map((card, index) => (
              <Reveal
                key={card.code}
                as="li"
                delay={index * 0.05}
                className="flex"
              >
                <Link
                  href={card.href}
                  data-accent={card.accent}
                  className="group relative flex flex-1 flex-col justify-between gap-10 bg-paper p-6 transition-[background-color,box-shadow,transform] duration-300 ease-[var(--ease-ke)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_40px_-28px_rgba(10,22,38,0.45)] lg:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-ke)] group-hover:scale-x-100"
                  />

                  <div className="flex items-start justify-between gap-3">
                    <span className="ke-label text-accent-ink">{card.code}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 text-steel transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink"
                    />
                  </div>

                  <div>
                    <h2 className="font-display text-lg font-bold leading-snug tracking-[-0.025em] text-ink transition-colors group-hover:text-accent-ink">
                      {card.title}
                    </h2>
                    <p className="mt-2.5 ke-body-sm text-steel">
                      {card.body}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ----------------------------------------------------------- Form */}
      <section data-accent="performance" className="ke-section bg-bone">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  index="02"
                  label="Enquiry"
                  title="Send an enquiry."
                  lead="Fill this in and it opens WhatsApp with your details ready to send. Prefer to talk? Call the number below."
                />

                <div className="mt-9 border-t border-line pt-8">
                  <a
                    href={site.phone.href}
                    className="group flex items-center gap-3 font-display text-xl font-bold tracking-[-0.025em] text-ink transition-colors hover:text-ke-blue md:text-2xl"
                  >
                    <Phone
                      className="h-5 w-5 shrink-0 text-ke-blue"
                      aria-hidden="true"
                    />
                    {site.phone.display}
                  </a>

                  <dl className="mt-7 space-y-2.5">
                    {site.hours.map((slot) => (
                      <div
                        key={slot.days}
                        className="flex items-baseline justify-between gap-6 border-b border-line pb-2.5 last:border-b-0"
                      >
                        <dt className="text-[0.875rem] text-steel">{slot.days}</dt>
                        <dd className="font-mono text-[0.8125rem] tabular-nums text-ink">
                          {slot.time}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="border border-line bg-paper p-6 md:p-9 lg:p-10">
                <EnquiryForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <LocationSection index="03" variant="compact" />
      <FaqSection
        items={contactFaq}
        index="04"
        label="Before you come in"
        title="What to expect."
        surface="bone"
      />
    </>
  );
}
