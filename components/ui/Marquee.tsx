import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  /** Seconds for one full pass. Higher is slower. */
  duration?: number;
  tone?: "dark" | "light";
  /** Typographic treatment of each item. */
  variant?: "display" | "label";
  className?: string;
}

/**
 * Slow, continuous index of terms. CSS-driven, so it costs no client JavaScript,
 * pauses on hover, and falls back to a static wrapped list under
 * prefers-reduced-motion (see globals.css).
 */
export function Marquee({
  items,
  duration = 68,
  tone = "light",
  variant = "display",
  className,
}: MarqueeProps) {
  const dark = tone === "dark";

  const renderRun = (duplicate: boolean) => (
    <ul
      className={cn("flex shrink-0 items-center", duplicate && "ke-marquee-dup")}
      aria-hidden={duplicate ? "true" : undefined}
    >
      {items.map((item) => (
        <li key={item} className="flex shrink-0 items-center">
          <span
            className={cn(
              variant === "display"
                ? "font-display text-lg font-semibold tracking-[-0.02em] sm:text-xl lg:text-2xl"
                : "ke-label",
              dark ? "text-steel-400" : "text-ink/80",
            )}
          >
            {item}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "mx-5 inline-block h-1.5 w-1.5 rotate-45 shrink-0 sm:mx-7",
              dark ? "bg-accent" : "bg-accent/60",
            )}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn("ke-marquee relative overflow-hidden", className)}
      style={{
        // Fade the ends so terms enter and leave without a hard cut.
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div
        className="ke-marquee-track"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {renderRun(false)}
        {renderRun(true)}
      </div>
    </div>
  );
}
