import type { NextConfig } from "next";

/**
 * Service pages retired when six services were consolidated into four.
 *
 * Kept inline rather than imported from data/services.ts: module resolution in
 * next.config.ts depends on the Node version doing the loading, and a failed
 * import here takes the whole build down with it.
 */
const RETIRED_SERVICES: Record<string, string> = {
  "athlete-development": "athlete-performance",
  "performance-testing": "athlete-performance",
  "sports-physiotherapy": "physiotherapy-rehabilitation",
  "sports-rehabilitation": "physiotherapy-rehabilitation",
  "online-coaching": "distance-coaching",
};

const nextConfig: NextConfig = {
  images: {
    // Photographs are served from /public — no remote patterns are needed.
    // AVIF first, WebP as the fallback, for the athlete and facility imagery
    // that will be dropped into data/images.ts.
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,

  async redirects() {
    return Object.entries(RETIRED_SERVICES).map(([from, to]) => ({
      source: `/services/${from}`,
      destination: `/services/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
