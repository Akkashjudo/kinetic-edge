"use client";

import { useMemo, useState } from "react";
import type { AthleteResult } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AthleteResultCard } from "@/components/ui/AthleteResultCard";
import { Reveal, RevealMask } from "@/components/ui/Reveal";

/**
 * Verified competition results, as an editorial archive rather than a card wall.
 *
 * One featured record leads — full width, image-led, athlete name at heading
 * scale — and the rest follow as a denser grid. A uniform grid flattens a
 * national champion and a quarter-finalist into the same rectangle.
 *
 * Renders nothing at all when no results have been supplied. An empty grid is
 * never padded with placeholder athletes, and results are never rolled up into
 * medal totals or athlete counts.
 */
export function ResultsGrid({
  results,
  featuredFirst = true,
  showFilters = true,
  className,
}: {
  results: AthleteResult[];
  /** Promotes results flagged `featured` to the large editorial card. */
  featuredFirst?: boolean;
  showFilters?: boolean;
  className?: string;
}) {
  const sports = useMemo(
    () => Array.from(new Set(results.map((result) => result.sport))).sort(),
    [results],
  );

  const [sport, setSport] = useState<string>("All");

  const visible = useMemo(
    () => (sport === "All" ? results : results.filter((r) => r.sport === sport)),
    [results, sport],
  );

  if (results.length === 0) return null;

  const featured = featuredFirst ? visible.filter((r) => r.featured) : [];
  const rest = featuredFirst ? visible.filter((r) => !r.featured) : visible;

  return (
    <div className={className}>
      {showFilters && sports.length > 1 ? (
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <span className="ke-label mr-2 text-steel">Filter</span>
          {["All", ...sports].map((option) => {
            const active = sport === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setSport(option)}
                aria-pressed={active}
                className={cn(
                  "rounded-[2px] border px-4 py-2 text-[0.8125rem] font-medium transition-colors active:scale-[0.98]",
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-line text-steel hover:border-ink/40 hover:text-ink",
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : null}

      {featured.length > 0 ? (
        <ul className="mb-px grid gap-px bg-line">
          {featured.map((result, index) => (
            <li key={result.id} className="flex">
              <RevealMask className="flex flex-1" innerClassName="flex flex-1">
                <AthleteResultCard
                  result={result}
                  featured
                  priority={index === 0}
                  className="flex-1"
                />
              </RevealMask>
            </li>
          ))}
        </ul>
      ) : null}

      {rest.length > 0 ? (
        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rest.map((result, index) => (
            /* Stagger follows visual row order, capped so the last card in a
               long archive never waits on the whole sequence. */
            <Reveal
              key={result.id}
              as="li"
              delay={Math.min(index % 4, 3) * 0.06}
              y={18}
              className="flex"
            >
              <AthleteResultCard result={result} className="flex-1" />
            </Reveal>
          ))}
        </ul>
      ) : null}

      {visible.length === 0 ? (
        <p className="ke-body border border-line bg-bone px-6 py-10 text-center text-steel">
          No results listed for {sport}.
        </p>
      ) : null}
    </div>
  );
}
