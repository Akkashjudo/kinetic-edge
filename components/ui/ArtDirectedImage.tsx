import { siteImages, type SiteImageKey } from "@/data/images";

/**
 * A photograph with a DIFFERENT FILE per breakpoint.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHY THIS IS NOT `next/image`
 *
 * `next/image` renders one `<img>`. Real art direction — a landscape frame on a
 * tablet, a portrait frame on a phone — needs `<picture>` with `media` on each
 * `<source>`, which is the only markup that makes a browser fetch exactly one
 * of them. The obvious alternative, three `<Image>`s with `hidden`/`block`,
 * does not work: Chrome fetches an eager image inside a `display:none`
 * ancestor, which is how the hero ended up preloading a candidate it never
 * painted.
 *
 * So the `<source>` sets are built against Next's image optimiser directly.
 * `/_next/image?url=…&w=…&q=…` is the same endpoint `next/image` points at, the
 * widths below are its default `deviceSizes`, and `images.formats` in
 * next.config.ts still makes it serve AVIF then WebP. Nothing is unoptimised
 * and nothing is served at its original size.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * The LAST entry in `sources` is the fallback `<img>` and therefore needs no
 * `media`; every entry before it is tried in order, exactly like CSS.
 *
 * Each frame has its own focal point, and one inline `object-position` cannot
 * serve three. Pass them as responsive utilities on `className` instead, e.g.
 * `object-cover object-[50%_58%] md:object-[50%_52%] lg:object-[center_45%]`.
 */

/** Next's default `deviceSizes`. A width above the file's own is clamped to it. */
const DEVICE_WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const QUALITY = 75;

function optimised(src: string, width: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${QUALITY}`;
}

function srcSet(src: string, intrinsicWidth: number) {
  // Anything past the file's own width returns the same bytes, so the list
  // stops at the first candidate that covers it.
  const widths: number[] = [];
  for (const w of DEVICE_WIDTHS) {
    widths.push(w);
    if (w >= intrinsicWidth) break;
  }
  return widths.map((w) => `${optimised(src, w)} ${w}w`).join(", ");
}

export interface ArtDirectedSource {
  imageKey: SiteImageKey;
  /**
   * MUST BE MUTUALLY EXCLUSIVE across the whole list, e.g.
   * `(max-width: 767.98px)` / `(min-width: 768px) and (max-width: 1023.98px)` /
   * `(min-width: 1024px)`.
   *
   * `<picture>` takes the first matching `<source>`, so overlapping ranges look
   * right on screen — but `<link rel="preload">` has no first-match rule and
   * every query that matches fires. With open-ended ranges a desktop visitor
   * preloaded all three frames while painting one.
   *
   * The final entry is the fallback `<img>` and gets no `<source>`, but it
   * still needs its `media` for the preload.
   */
  media?: string;
}

export function ArtDirectedImage({
  sources,
  alt,
  sizes = "100vw",
  priority = false,
  className,
}: {
  sources: ArtDirectedSource[];
  /** One description for every frame — they are the same subject. */
  alt: string;
  sizes?: string;
  /** Adds a per-frame preload and eager, high-priority fetching. */
  priority?: boolean;
  className?: string;
}) {
  const resolved = sources
    .map((source) => ({ ...source, image: siteImages[source.imageKey] }))
    .filter((source) => source.image.src && source.image.width);

  const fallback = resolved[resolved.length - 1];
  if (!fallback) return null;

  return (
    <>
      {/* React hoists these into <head>; `media` keeps each one to its own
          breakpoint, so a phone never preloads the desktop frame. */}
      {priority
        ? resolved.map((source) => (
            <link
              key={`preload-${source.imageKey}`}
              rel="preload"
              as="image"
              media={source.media}
              imageSrcSet={srcSet(source.image.src as string, source.image.width as number)}
              imageSizes={sizes}
              fetchPriority="high"
            />
          ))
        : null}

      <picture>
        {resolved.slice(0, -1).map((source) => (
          <source
            key={source.imageKey}
            media={source.media}
            sizes={sizes}
            srcSet={srcSet(source.image.src as string, source.image.width as number)}
          />
        ))}

        {/* A bare <img> on purpose — see the note at the top of this file.
            Art direction needs <picture>, and every candidate below still goes
            through Next's image optimiser. */}
        <img
          alt={alt}
          src={optimised(fallback.image.src as string, DEVICE_WIDTHS[0])}
          srcSet={srcSet(fallback.image.src as string, fallback.image.width as number)}
          sizes={sizes}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          className={className}
          // Matches what `next/image` with `fill` emits, so the desktop frame
          // is laid out exactly as it was before this component existed.
          style={{
            position: "absolute",
            inset: 0,
            height: "100%",
            width: "100%",
            color: "transparent",
          }}
        />
      </picture>
    </>
  );
}
