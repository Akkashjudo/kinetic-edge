"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { Plus } from "lucide-react";
import { athleteAlt, headlineAchievement } from "@/data/athletes";
import type { Athlete, AthleteAchievement } from "@/lib/types";
import {
  MORPH,
  MorphContent,
  MorphDialog,
  MorphProvider,
} from "@/components/ui/MorphDialog";

/**
 * The athletes, as cards that open a full result list.
 *
 * Every card leads with one achievement — the strongest, which is the first in
 * the data — so the grid stays readable at a glance. Athletes with more results
 * carry a count, and the rest of the list lives in the profile rather than
 * stretching the card.
 *
 * Photographs are real crops of the athletes' own photos from the client's
 * posters, and alt text is generated from the verified fields, never written by
 * hand (see data/athletes.ts).
 */
export function AthleteGallery({ athletes }: { athletes: Athlete[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement>());
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const active = athletes.find((a) => a.slug === activeSlug) ?? null;

  const open = useCallback((slug: string) => {
    returnFocusRef.current = triggers.current.get(slug) ?? null;
    setActiveSlug(slug);
  }, []);

  const close = useCallback(() => setActiveSlug(null), []);

  return (
    <MorphProvider>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-4">
        {athletes.map((athlete, i) => (
          <li key={athlete.slug} className="flex">
            <AthleteCard
              athlete={athlete}
              // Only the first row is likely to be above the fold anywhere.
              priority={i < 2}
              onOpen={() => open(athlete.slug)}
              registerTrigger={(node) => {
                if (node) triggers.current.set(athlete.slug, node);
                else triggers.current.delete(athlete.slug);
              }}
            />
          </li>
        ))}
      </ul>

      <MorphDialog
        open={active !== null}
        layoutId={active ? `athlete-${active.slug}` : null}
        onClose={close}
        returnFocusRef={returnFocusRef}
      >
        {(titleId) =>
          active ? <AthleteProfile athlete={active} titleId={titleId} /> : null
        }
      </MorphDialog>
    </MorphProvider>
  );
}

/** A quiet medal tone per placing. No glow, no gradient — just a marker. */
const RESULT_TONE: Record<string, string> = {
  Gold: "#c9a227",
  Silver: "#9aa3ac",
  Bronze: "#b07a48",
};

function resultTone(result: string) {
  return RESULT_TONE[result] ?? "var(--accent)";
}

function AthleteCard({
  athlete,
  priority,
  onOpen,
  registerTrigger,
}: {
  athlete: Athlete;
  priority: boolean;
  onOpen: () => void;
  registerTrigger: (node: HTMLButtonElement | null) => void;
}) {
  const top = headlineAchievement(athlete);
  const more = athlete.achievements.length - 1;

  return (
    <m.article
      layoutId={`athlete-${athlete.slug}`}
      layoutCrossfade={false}
      transition={MORPH}
      className="group relative flex flex-1 flex-col outline-offset-4 outline-accent has-[button:focus-visible]:outline-2"
    >
      <m.div
        layoutId={`athlete-image-${athlete.slug}`}
        layoutCrossfade={false}
        transition={MORPH}
        className="relative aspect-4/5 overflow-hidden bg-mist"
      >
        <Image
          src={athlete.image.src}
          alt={athleteAlt(athlete)}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 45vw"
          priority={priority}
          className="object-cover object-top transition-transform duration-[900ms] ease-[var(--ease-ke)] group-hover:scale-[1.04]"
        />

        <p className="ke-label absolute left-3 top-3 bg-paper/95 px-2.5 py-1.5 text-ink backdrop-blur-sm">
          {athlete.sport}
        </p>

        {more > 0 ? (
          <p className="ke-label absolute right-3 top-3 bg-ink/85 px-2.5 py-1.5 text-white backdrop-blur-sm">
            +{more}
            <span className="sr-only"> more results</span>
          </p>
        ) : null}

        {/* Accent rule draws in under the photograph on hover. */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-ke)] group-hover:scale-x-100"
        />
      </m.div>

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="font-display text-[1.0625rem] font-bold leading-snug tracking-[-0.022em] text-ink md:text-[1.1875rem]">
          {athlete.name}
        </h3>

        {/* Placing and category wrap as whole units — on a narrow card the
            category drops to its own line instead of stranding a separator. */}
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <p className="flex items-center gap-2 font-display text-[0.9375rem] font-semibold tracking-[-0.015em] text-ink">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0"
              style={{ backgroundColor: resultTone(top.result) }}
            />
            {top.result}
          </p>
          {top.category ? (
            <p className="ke-body-sm text-steel">{top.category}</p>
          ) : null}
        </div>

        <p className="ke-body-sm mt-1.5 text-steel">
          {top.competition}
          {top.year ? ` · ${top.year}` : ""}
        </p>

        <div className="mt-auto pt-4">
          <button
            ref={registerTrigger}
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="ke-tap gap-2.5 text-[0.875rem] font-medium text-ink transition-colors focus-visible:outline-none group-hover:text-accent-ink after:absolute after:inset-0 after:content-['']"
          >
            <span className="ke-underline">
              {more > 0 ? "All results" : "View profile"}
            </span>
            <span className="sr-only">: {athlete.name}</span>
            <Plus
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-ke)] group-hover:rotate-90"
            />
          </button>
        </div>
      </div>
    </m.article>
  );
}

function AthleteProfile({
  athlete,
  titleId,
}: {
  athlete: Athlete;
  titleId: string;
}) {
  return (
    <div className="grid lg:grid-cols-[minmax(0,38%)_minmax(0,1fr)]">
      <m.div
        layoutId={`athlete-image-${athlete.slug}`}
        layoutCrossfade={false}
        transition={MORPH}
        className="relative aspect-4/5 overflow-hidden bg-ink lg:aspect-auto lg:min-h-[32rem]"
      >
        <Image
          src={athlete.image.src}
          alt={athleteAlt(athlete)}
          fill
          sizes="(min-width: 1024px) 340px, 100vw"
          className="object-cover object-top"
        />
      </m.div>

      <MorphContent className="p-6 sm:p-10 lg:p-12">
        <p className="ke-label text-accent-on-dark">{athlete.sport}</p>
        <h2 id={titleId} className="ke-h2 mt-4 text-white">
          {athlete.name}
        </h2>

        <p className="ke-label mt-8 text-steel-400">
          {athlete.achievements.length === 1 ? "Result" : "Results"}
        </p>

        <ol className="mt-4 border-t border-white/10">
          {athlete.achievements.map((achievement, i) => (
            <AchievementRow key={`${achievement.competition}-${i}`} achievement={achievement} />
          ))}
        </ol>
      </MorphContent>
    </div>
  );
}

function AchievementRow({ achievement }: { achievement: AthleteAchievement }) {
  return (
    <li className="flex flex-col gap-1 border-b border-white/10 py-4 sm:flex-row sm:items-baseline sm:gap-5">
      <p className="flex shrink-0 items-center gap-2.5 font-display text-base font-bold tracking-[-0.02em] text-white sm:w-32">
        <span
          aria-hidden="true"
          className="h-2 w-2 shrink-0"
          style={{ backgroundColor: resultTone(achievement.result) }}
        />
        {achievement.result}
      </p>

      <div className="min-w-0 flex-1">
        {achievement.category ? (
          <p className="font-display text-[0.9375rem] font-semibold tracking-[-0.015em] text-white">
            {achievement.category}
          </p>
        ) : null}
        <p className="ke-body-sm mt-1 text-steel-400">{achievement.competition}</p>
      </div>

      {achievement.year ? (
        <p className="shrink-0 font-mono text-[0.75rem] tabular-nums text-steel-400">
          {achievement.year}
        </p>
      ) : null}
    </li>
  );
}
