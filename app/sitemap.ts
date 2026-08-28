import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { serviceSlugs } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.9 },
    ...serviceSlugs.map((slug) => ({
      path: `/services/${slug}`,
      priority: 0.8,
    })),
    { path: "/athletes", priority: 0.7 },
    { path: "/education", priority: 0.6 },
    { path: "/partners", priority: 0.5 },
    { path: "/contact", priority: 0.9 },
  ];

  return routes.map((route) => ({
    url: route.path === "/" ? site.url : site.url + route.path,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
}
