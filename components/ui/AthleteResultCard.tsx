import Image from "next/image";
import type { AthleteResult } from "@/lib/types";
import { resultAlt } from "@/data/athlete-results";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "./Figure";

/**
 * A verified competition result.
 *
 * Alt text is derived from the result object by `resultAlt`, never authored by
 * hand — this is what prevents one athlete being credited with another
 * athlete's result, which is how the previous site went wrong.
 *
 * Two sizes. `featured` is the editorial lead card: wide, image-led, athlete
 * name at heading scale. The default is the archive card beneath it.
 */
export function AthleteResultCard({
  result,
  featured = false,
  priority = false,
  className,
}: {
  result: AthleteResult;
  featured?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden bg-ink text-white",
        className,
      )}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: featured ? "16/9" : "4/5" }}
      >
        {result.image ? (
          <Image
            src={result.image}
            alt={resultAlt(result)}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes={
              featured
                ? "(min-width: 1024px) 68vw, 100vw"
                : "(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 92vw"
            }
            className="object-cover object-top transition-transform duration-[900ms] ease-[var(--ease-ke)] group-hover:scale-[1.03]"
          />
        ) : (
          <ImagePlaceholder tone="dark" />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-transparent"
        />

        {/* Metadata lifts very slightly on hover — enough to register as a
            response, not enough to read as movement. */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 transition-transform duration-500 ease-[var(--ease-ke)] group-hover:-translate-y-0.5",
            featured ? "p-6 md:p-10 lg:p-12" : "p-5 md:p-6",
          )}
        >
          <p className="ke-label mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-steel-400">
            <span className="text-accent">{result.sport}</span>
            {result.year ? (
              <>
                <span aria-hidden="true" className="text-white/25">/</span>
                <span>{result.year}</span>
              </>
            ) : null}
          </p>

          <h3
            className={cn(
              "font-display font-bold tracking-[-0.028em] text-white",
              featured ? "ke-h2" : "text-lg md:text-xl",
            )}
          >
            {result.athleteName}
          </h3>

          <p
            className={cn(
              "mt-2 leading-snug text-white/75",
              featured ? "ke-lead max-w-xl text-white/80" : "text-[0.8125rem]",
            )}
          >
            {result.competition}
            {result.category ? (
              <span className="text-white/55"> · {result.category}</span>
            ) : null}
          </p>
        </div>
      </div>

      {/* The result itself, held on its own line so it reads as the outcome */}
      <div
        className={cn(
          "flex items-center justify-between gap-4 border-t border-white/10",
          featured ? "px-6 py-5 md:px-10 lg:px-12" : "px-5 py-4 md:px-6",
        )}
      >
        <span
          className={cn(
            "font-display font-bold tracking-[-0.02em]",
            featured ? "text-xl md:text-2xl" : "text-[0.9375rem]",
          )}
        >
          {result.result}
        </span>
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rotate-45 bg-accent transition-transform duration-500 ease-[var(--ease-ke)] group-hover:rotate-[135deg]"
        />
      </div>
    </article>
  );
}
