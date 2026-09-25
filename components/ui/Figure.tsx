import Image from "next/image";
import { naturalRatio, siteImages, type SiteImageKey } from "@/data/images";
import { cn } from "@/lib/utils";
import { KEMark } from "./Logo";

interface FigureProps {
  imageKey: SiteImageKey;
  /**
   * CSS aspect-ratio, e.g. "16/9", "4/5", "21/9".
   *
   * `"natural"` uses the photograph's own ratio, so nothing is cropped at all.
   * Prefer it wherever the composition can take any shape — most of these are
   * phone photographs at 2:3, and a fixed landscape frame cuts them in half.
   * `fallbackRatio` is what a `"natural"` frame uses while the slot is still a
   * placeholder plate.
   */
  ratio?: string;
  fallbackRatio?: string;
  /** Responsive sizes hint — always set this for anything not full-bleed. */
  sizes?: string;
  /** Only for genuinely above-the-fold imagery. */
  priority?: boolean;
  /** Placeholder styling for the surface it sits on. */
  tone?: "dark" | "light";
  /** Overrides the registry alt text where context demands it. */
  alt?: string;
  className?: string;
  imageClassName?: string;
  /** Adds the subtle vignette used behind hero copy. */
  overlay?: boolean;
}

/**
 * Renders a registered photograph, or a branded placeholder plate while the
 * photograph is still to be supplied.
 *
 * The placeholder occupies the exact final crop, so dropping the real image into
 * data/images.ts changes nothing about the layout.
 */
export function Figure({
  imageKey,
  ratio = "4/3",
  fallbackRatio = "4/3",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  tone = "dark",
  alt,
  className,
  imageClassName,
  overlay = false,
}: FigureProps) {
  const image = siteImages[imageKey];
  const frame =
    ratio === "natural" ? (naturalRatio(imageKey) ?? fallbackRatio) : ratio;

  return (
    <div
      className={cn("relative overflow-hidden bg-ink", className)}
      style={{ aspectRatio: frame }}
    >
      {image.src ? (
        <Image
          src={image.src}
          alt={alt ?? image.alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={cn("object-cover", imageClassName)}
          style={{ objectPosition: image.position ?? "center" }}
        />
      ) : (
        <ImagePlaceholder tone={tone} />
      )}

      {overlay ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/35 to-night/10"
        />
      ) : null}
    </div>
  );
}

/**
 * The placeholder plate. Deliberately typographic and neutral — it never carries
 * an invented caption, name, statistic or credential.
 */
export function ImagePlaceholder({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        dark ? "bg-ink" : "bg-mist",
        className,
      )}
    >
      {/* Diagonal machine hatching */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(-63deg, ${
            dark ? "rgba(255,255,255,0.045)" : "rgba(10,22,38,0.045)"
          } 0px, ${
            dark ? "rgba(255,255,255,0.045)" : "rgba(10,22,38,0.045)"
          } 1px, transparent 1px, transparent 13px)`,
        }}
      />
      {/* Soft accent wash, bottom-left to top-right, echoing the mark */}
      <div
        className="absolute inset-0"
        style={{
          background: dark
            ? "radial-gradient(120% 100% at 15% 100%, rgba(19,133,214,0.24) 0%, transparent 62%)"
            : "radial-gradient(120% 100% at 15% 100%, rgba(19,133,214,0.14) 0%, transparent 62%)",
        }}
      />
      <KEMark
        className={cn(
          "relative w-[18%] min-w-14 max-w-28",
          dark ? "text-white/12" : "text-ink/12",
        )}
      />
    </div>
  );
}
