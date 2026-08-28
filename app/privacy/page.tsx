import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description:
    "How Kinetic Edge High Performance Centre handles enquiries and information submitted through this website.",
  path: "/privacy",
  index: false,
});

/**
 * Deliberately general.
 *
 * No certification, compliance framework, retention period, processor or legal
 * basis is claimed, because none has been supplied. Replace these sections with
 * the centre's actual policy once it exists.
 */
const sections = [
  {
    title: "What this page covers",
    body: [
      "This page explains, in general terms, how information reaches Kinetic Edge High Performance Centre through this website and how it is used. It is not a substitute for a formal privacy policy, and it will be replaced when the centre publishes one.",
    ],
  },
  {
    title: "Information you send us",
    body: [
      "This website does not require you to create an account and does not ask you to enter payment details.",
      "If you use the enquiry form, the details you type are used to compose a message that opens in WhatsApp on your own device. Nothing is submitted until you choose to send it. If you contact Kinetic Edge by phone or WhatsApp instead, the information you share in that conversation is held by the centre in the ordinary course of responding to you.",
      "Information sent through an enquiry is used to respond to that enquiry and to arrange an assessment or appointment.",
    ],
  },
  {
    title: "Third-party services",
    body: [
      "Some links on this site open services operated by other companies — WhatsApp, Google Maps, Instagram, LinkedIn and YouTube. Once you follow one of those links, the handling of your information is governed by that company's own terms and privacy policy rather than by this page.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You can contact Kinetic Edge by phone or WhatsApp to ask what information the centre holds about you, to correct it, or to ask that it no longer be used to contact you.",
    ],
  },
  {
    title: "Changes to this page",
    body: [
      "This page may be updated as the centre's practices are formalised. The version shown here is the current one.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
        label="Privacy"
        title="Privacy."
        lead="How information reaches Kinetic Edge through this website, and what happens to it."
      />

      <section className="ke-section bg-paper">
        <Container>
          <div className="max-w-2xl">
            {sections.map((section, index) => (
              <div
                key={section.title}
                className="border-b border-line py-9 first:pt-0 last:border-b-0"
              >
                <p className="ke-label mb-4 text-steel">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="ke-h3 text-ink">{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="mt-4 ke-body text-steel"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}

            <div className="pt-9">
              <p className="ke-label mb-4 text-steel">Contact</p>
              <p className="ke-body text-steel">
                Questions about this page can be raised by phone or WhatsApp on{" "}
                <a
                  href={site.phone.href}
                  className="ke-tap font-medium text-ink underline underline-offset-4 transition-colors hover:text-ke-blue"
                >
                  {site.phone.display}
                </a>
                , or in person at {site.address.full}.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
