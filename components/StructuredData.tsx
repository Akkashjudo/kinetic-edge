import { site } from "@/data/site";
import type { FaqItem } from "@/lib/types";

const BUSINESS_ID = site.url + "/#organisation";

/**
 * VERIFIED FIELDS ONLY.
 *
 * Deliberately absent: email (none exists), aggregateRating and review (none
 * verified), a second location (no address supplied), awards, and any employee
 * or member count.
 */
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["SportsActivityLocation", "HealthAndBeautyBusiness"],
    "@id": BUSINESS_ID,
    name: site.legalName,
    alternateName: site.name,
    description: site.description,
    slogan: site.tagline,
    url: site.url,
    telephone: site.phone.e164,
    foundingDate: site.founded,
    priceRange: "₹₹",
    logo: site.url + "/brand/ke-mark.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: site.links.maps,
    openingHoursSpecification: site.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    areaServed: site.areasServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    sameAs: [site.links.instagram, site.links.linkedin, site.links.youtube],
  };

  return <JsonLd data={schema} />;
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: site.url + (item.path === "/" ? "" : item.path),
    })),
  };

  return <JsonLd data={schema} />;
}

export function ServiceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: site.url + path,
    serviceType: name,
    provider: { "@id": BUSINESS_ID },
    areaServed: site.areasServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
  };

  return <JsonLd data={schema} />;
}

export function FaqSchema({ items }: { items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return <JsonLd data={schema} />;
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is built from local constants only — no user input reaches it.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
