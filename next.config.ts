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

/**
 * Everything under /public is served by Vercel with
 * `public, max-age=0, must-revalidate` by default, so a returning visitor
 * revalidates every photograph on every page view — and because the image
 * optimiser inherits the upstream header, the AVIF it generates was being
 * revalidated too. A week of freshness plus a month of stale-while-revalidate
 * costs nothing: a replaced photograph is picked up within the week, or
 * immediately if it lands at a new path. Do not use `immutable` here — these
 * files are swapped by hand as the client supplies better ones.
 */
const STATIC_CACHE = "public, max-age=604800, stale-while-revalidate=2592000";

const nextConfig: NextConfig = {
  images: {
    // Photographs are served from /public — no remote patterns are needed.
    // AVIF first, WebP as the fallback, for the athlete and facility imagery
    // that will be dropped into data/images.ts.
    formats: ["image/avif", "image/webp"],
    // How long the optimiser keeps a generated variant. The default is 60s,
    // which throws away the AVIF work almost immediately.
    minimumCacheTTL: 2592000,
  },
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: STATIC_CACHE }],
      },
      {
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: STATIC_CACHE }],
      },
      {
        source: "/og.png",
        headers: [{ key: "Cache-Control", value: STATIC_CACHE }],
      },
    ];
  },

  async redirects() {
    return Object.entries(RETIRED_SERVICES).map(([from, to]) => ({
      source: `/services/${from}`,
      destination: `/services/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
