import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { getService, serviceSlugs } from "@/data/services";
import { primaryCta, site } from "@/data/site";
import { BreadcrumbSchema, ServiceSchema } from "@/components/StructuredData";
import { CTAButton } from "@/components/ui/CTAButton";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceBlocks } from "@/components/sections/ServiceBlocks";
import { ServiceExtras } from "@/components/sections/ServiceExtras";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * Only the four defined services exist as routes. The six earlier slugs
 * redirect permanently — see next.config.ts.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: service.href,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const [index, , category] = service.label.split(" ");

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: service.href },
        ]}
      />
      <ServiceSchema
        name={service.title}
        description={service.metaDescription}
        path={service.href}
      />

      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        index={index}
        label={category ? category.charAt(0) + category.slice(1).toLowerCase() : service.title}
        title={service.headline}
        lead={service.intro}
        accent={service.accent}
        imageKey={service.imageKey}
        actions={
          <>
            <CTAButton href={primaryCta.href} variant="light">
              {primaryCta.label}
            </CTAButton>
            <CTAButton
              href={site.whatsapp.href}
              external
              variant="outlineLight"
              arrow={false}
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Us
            </CTAButton>
          </>
        }
      />

      <ServiceBlocks
        blocks={service.blocks}
        breakImage={service.breakImageKey}
        index="01"
        label="What this covers"
        title={
          <>
            Inside{" "}
            <span className="text-accent-ink">{service.title.toLowerCase()}</span>.
          </>
        }
        accent={service.accent}
      />

      <ServiceExtras slug={service.slug} />

      <RelatedServices currentSlug={service.slug} />

      <ContactCTA
        accent={service.accent}
        title={
          service.accent === "rehab"
            ? "Start With an Assessment"
            : "Ready to Take Your Performance Further?"
        }
        body={
          service.accent === "rehab"
            ? "Rehabilitation begins with understanding the injury, the sport and the timeline you are working to."
            : "Whether you're preparing for competition, returning from injury or simply looking to train better, our team can help build the right performance plan for you."
        }
      />
    </>
  );
}
