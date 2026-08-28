import type { Metadata } from "next";
import { site } from "@/data/site";

/** Social sharing card. Replace /public/og.png to change it everywhere. */
export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: site.legalName + " — " + site.tagline,
};

interface PageMetaOptions {
  /** Page title without the brand suffix — the template adds it. */
  title: string;
  description: string;
  /** Route path, e.g. "/services/performance-testing". */
  path: string;
  /** Set false for pages that should not be indexed. */
  index?: boolean;
}

export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: PageMetaOptions): Metadata {
  const url = path === "/" ? site.url : site.url + path;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: index ? undefined : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: site.legalName,
      title: title + " — " + site.name,
      description,
      url,
      locale: "en_IN",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: title + " — " + site.name,
      description,
      images: [ogImage.url],
    },
  };
}
