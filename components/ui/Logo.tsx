import { cn } from "@/lib/utils";

/**
 * The KE monogram, vector-traced from the supplied brand artwork so it stays
 * crisp at every size and works on both light and dark surfaces.
 *
 * The mark carries the brand gradient wherever a `gradientId` is given — that is
 * the supplied artwork and it is what should appear in the header and footer.
 * `currentColor` is the fallback for places that genuinely need a flat single
 * colour (the 404 watermark, favicons). Gradient ids must be unique per page, so
 * they are passed in explicitly rather than generated.
 */
export function KEMark({
  className,
  gradientId,
}: {
  className?: string;
  gradientId?: string;
}) {
  const fill = gradientId ? `url(#${gradientId})` : "currentColor";

  return (
    <svg
      viewBox="0 0 196 111"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {gradientId ? (
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="111"
            x2="196"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#1E7CC2" />
            <stop offset="0.55" stopColor="#4FADDF" />
            <stop offset="1" stopColor="#74CBE9" />
          </linearGradient>
        </defs>
      ) : null}
      <g fill={fill}>
        <path d="M38.5 1.0L42.5 1.3L43.3 3.8L34.3 41.8L34.5 45.8L36.0 45.8L39.5 43.3L84.5 2.3L92.0 1.0L107.0 1.5L102.8 7.0L52.3 56.0L53.3 59.0L83.5 104.3L86.0 108.5L85.5 110.0L67.3 110.3L64.8 109.5L38.8 69.5L32.0 60.8L29.8 63.0L20.5 109.3L17.8 110.3L7.0 110.3L1.5 108.8L23.3 4.3L25.5 1.3L38.3 1.3Z" />
        <path d="M150.3 1.0L193.8 1.0L195.0 2.5L185.0 17.8L182.0 19.8L113.8 19.8L112.5 18.8L118.8 7.8L124.0 1.5L150.0 1.3Z" />
        <path d="M118.3 45.8L154.8 45.8L155.8 47.3L147.5 61.5L144.8 64.5L105.5 64.5L115.0 47.3L118.0 46.0Z" />
        <path d="M106.5 91.5L176.0 91.5L177.3 92.8L167.0 108.5L165.3 109.8L95.0 109.8L95.5 107.0L104.5 92.8L106.3 91.8Z" />
      </g>
    </svg>
  );
}

interface LogoProps {
  /** "full" shows the wordmark alongside the mark. */
  variant?: "full" | "mark";
  /** Adds the HIGH PERFORMANCE & FITNESS CENTRE descriptor beneath the wordmark. */
  withDescriptor?: boolean;
  /** Surface the logo sits on. */
  tone?: "dark" | "light";
  gradientId?: string;
  className?: string;
  markClassName?: string;
}

/**
 * `tone` describes the surface, and now only controls the wordmark. The mark
 * itself keeps its brand gradient on both light and dark grounds — it was
 * previously being flattened to white on dark surfaces, which is not the
 * supplied logo.
 */
export function Logo({
  variant = "full",
  withDescriptor = false,
  tone = "light",
  gradientId,
  className,
  markClassName,
}: LogoProps) {
  return (
    <span className={cn("flex items-center gap-2.5 sm:gap-3", className)}>
      <KEMark
        gradientId={gradientId}
        className={cn(
          "h-7 w-auto shrink-0 sm:h-8",
          !gradientId && (tone === "dark" ? "text-white" : "text-ke-blue"),
          markClassName,
        )}
      />

      {variant === "full" ? (
        <span className="flex flex-col justify-center leading-none">
          <span
            className={cn(
              "font-display text-[0.9375rem] font-bold tracking-[0.14em] sm:text-base",
              tone === "dark" ? "text-white" : "text-ink",
            )}
          >
            KINETIC EDGE
          </span>
          {withDescriptor ? (
            <span
              className={cn(
                "mt-1.5 font-mono text-[0.5625rem] tracking-[0.16em] sm:text-[0.625rem] sm:tracking-[0.2em]",
                tone === "dark" ? "text-steel-400" : "text-steel",
              )}
            >
              HIGH PERFORMANCE &amp; FITNESS CENTRE
            </span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}
