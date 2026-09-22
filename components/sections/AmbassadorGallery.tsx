"use client";

import {
  useCallback,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, LazyMotion, MotionConfig, m } from "framer-motion";
import { Plus, X } from "lucide-react";
import { primaryCta } from "@/data/site";
import type { Ambassador } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useModal } from "@/lib/useModal";
import { CTAButton } from "@/components/ui/CTAButton";

/**
 * Athlete cards that open into a full profile.
 *
 * Adapted from "Morphing Dialog" by patrick-xin via 21st.dev —
 * https://21st.dev/@patrick-xin/components/morphing-dialog — rebuilt without
 * Base UI, Radix or shadcn: the card and the dialog share a `layoutId`, so the
 * card itself grows into the profile and shrinks back when it closes.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHY THIS LOADS ITS OWN FEATURE BUNDLE
 *
 * The app runs Framer Motion on `domAnimation`, which has no layout projection,
 * so `layoutId` would silently do nothing. The full bundle is loaded here, on
 * demand, in its own chunk (lib/motion-features.ts) — every other page keeps
 * the smaller one. Until it arrives the cards render as ordinary markup, and a
 * click that beats it simply opens the profile without the morph.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * `layoutCrossfade={false}` makes whichever of the pair is leading hide the
 * other, so the card is never visible behind its own profile and the profile
 * never lingers over the card on the way back.
 *
 * Reduced motion: `MotionConfig reducedMotion="user"` drops the morph and keeps
 * the fades. The markup is identical either way.
 */

const loadLayoutFeatures = () =>
  import("@/lib/motion-features").then((mod) => mod.default);

const EASE = [0.22, 1, 0.36, 1] as const;
const MORPH = { duration: 0.55, ease: EASE };

const subscribeNever = () => () => {};

export function AmbassadorGallery({
  ambassadors,
  tone = "dark",
}: {
  ambassadors: Ambassador[];
  tone?: "dark" | "light";
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement>());
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const single = ambassadors.length === 1;
  const active = ambassadors.find((a) => a.slug === activeSlug) ?? null;

  const open = useCallback((slug: string) => {
    returnFocusRef.current = triggers.current.get(slug) ?? null;
    setActiveSlug(slug);
  }, []);

  const close = useCallback(() => setActiveSlug(null), []);

  return (
    <LazyMotion features={loadLayoutFeatures}>
      <MotionConfig reducedMotion="user">
        <ul className={cn("grid gap-6", !single && "sm:grid-cols-2")}>
          {ambassadors.map((ambassador) => (
            <li key={ambassador.slug} className="flex">
              <AmbassadorCard
                ambassador={ambassador}
                single={single}
                tone={tone}
                onOpen={() => open(ambassador.slug)}
                registerTrigger={(node) => {
                  if (node) triggers.current.set(ambassador.slug, node);
                  else triggers.current.delete(ambassador.slug);
                }}
              />
            </li>
          ))}
        </ul>

        <AmbassadorDialog
          ambassador={active}
          onClose={close}
          returnFocusRef={returnFocusRef}
        />
      </MotionConfig>
    </LazyMotion>
  );
}

function AmbassadorCard({
  ambassador,
  single,
  tone,
  onOpen,
  registerTrigger,
}: {
  ambassador: Ambassador;
  single: boolean;
  tone: "dark" | "light";
  onOpen: () => void;
  registerTrigger: (node: HTMLButtonElement | null) => void;
}) {
  const { slug, name, sport, achievement, credentials, images } = ambassador;
  const dark = tone === "dark";
  // The card leads with the achievement; any other credential sits beneath.
  const level = credentials.find((credential) => credential !== achievement);

  return (
    <m.article
      layoutId={`ambassador-${slug}`}
      layoutCrossfade={false}
      transition={MORPH}
      className={cn(
        "group relative flex flex-1 flex-col overflow-hidden outline-offset-4",
        dark
          ? "bg-ink-lift has-[button:focus-visible]:outline-[#7cc6f2]"
          : "border border-line bg-paper has-[button:focus-visible]:outline-accent",
        "has-[button:focus-visible]:outline-2",
      )}
    >
      <m.div
        layoutId={`ambassador-image-${slug}`}
        layoutCrossfade={false}
        transition={MORPH}
        className="relative overflow-hidden bg-night"
        style={{ aspectRatio: single ? "5 / 4" : "4 / 5" }}
      >
        <Image
          src={images.card.src}
          alt={`${name}, ${credentials[0]}`}
          fill
          sizes={
            single
              ? "(min-width: 1024px) 55vw, 100vw"
              : "(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
          }
          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-ke)] group-hover:scale-[1.04]"
          style={{ objectPosition: images.card.position ?? "center" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night/70 to-transparent"
        />
        <p className="ke-label absolute left-4 top-4 flex items-center gap-2 bg-night/75 px-3 py-2 text-white backdrop-blur-sm sm:left-5 sm:top-5">
          <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
          {sport}
        </p>
      </m.div>

      <div className="flex flex-1 flex-col gap-6 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-7">
        <div>
          <h3
            className={cn(
              "font-display text-2xl font-bold tracking-[-0.03em] sm:text-3xl",
              dark ? "text-white" : "text-ink",
            )}
          >
            {name}
          </h3>
          <p
            className={cn(
              "mt-2 font-display text-base font-semibold tracking-[-0.015em]",
              dark ? "text-accent-on-dark" : "text-accent-ink",
            )}
          >
            {achievement}
          </p>
          {level ? (
            <p className={cn("ke-label mt-3", dark ? "text-steel-400" : "text-steel")}>
              {level}
            </p>
          ) : null}
        </div>

        {/* One control, stretched over the whole card. */}
        <button
          ref={registerTrigger}
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          className={cn(
            "inline-flex shrink-0 items-center gap-3 self-start font-display text-[0.9375rem] font-semibold tracking-[-0.01em] focus-visible:outline-none sm:self-auto after:absolute after:inset-0 after:content-['']",
            dark ? "text-white" : "text-ink",
          )}
        >
          <span className="ke-underline">View profile</span>
          <span className="sr-only">: {name}</span>
          <span
            aria-hidden="true"
            className={cn(
              "flex h-10 w-10 items-center justify-center border transition-colors duration-300",
              dark
                ? "border-white/25 group-hover:border-ke-blue group-hover:bg-ke-blue"
                : "border-line group-hover:border-accent-ink group-hover:bg-accent-ink group-hover:text-white",
            )}
          >
            <Plus className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-ke)] group-hover:rotate-90" />
          </span>
        </button>
      </div>
    </m.article>
  );
}

function AmbassadorDialog({
  ambassador,
  onClose,
  returnFocusRef,
}: {
  ambassador: Ambassador | null;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
}) {
  // False on the server and during hydration, true after — the portal target
  // only exists in the browser.
  const isClient = useSyncExternalStore(subscribeNever, () => true, () => false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useModal({
    open: ambassador !== null,
    onClose,
    containerRef: panelRef,
    initialFocusRef: closeRef,
    returnFocusRef,
  });

  if (!isClient) return null;

  // Clicks on the dimmed area close; clicks inside the panel do not.
  const onBackdrop = (event: MouseEvent) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <AnimatePresence>
      {ambassador ? (
        <div key={ambassador.slug} className="fixed inset-0 z-[60]">
          <m.div
            aria-hidden="true"
            className="absolute inset-0 bg-night/80 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          />

          <m.div
            layoutScroll
            className="absolute inset-0 overflow-y-auto overscroll-contain"
            onClick={onBackdrop}
          >
            <div
              className="flex min-h-full items-start justify-center p-3 sm:p-8 lg:items-center lg:p-10"
              onClick={onBackdrop}
            >
              <m.div
                ref={panelRef}
                layoutId={`ambassador-${ambassador.slug}`}
                layoutCrossfade={false}
                transition={MORPH}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                data-accent="performance"
                className="surface-dark relative w-full max-w-4xl overflow-hidden bg-night text-white shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85)] focus:outline-none"
              >
                <ProfileImage ambassador={ambassador} />
                <ProfileBody ambassador={ambassador} titleId={titleId} />

                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close profile"
                  className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center border border-white/20 bg-night/70 text-white backdrop-blur-sm transition-colors hover:bg-night sm:right-4 sm:top-4"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </m.div>
            </div>
          </m.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

/**
 * The designed poster carries its own lettering, which is only legible at size,
 * so below `sm` the clean frame is shown instead. Only one is ever displayed,
 * so only one is announced.
 */
function ProfileImage({ ambassador }: { ambassador: Ambassador }) {
  const { slug, name, credentials, role, images } = ambassador;

  return (
    <m.div
      layoutId={`ambassador-image-${slug}`}
      layoutCrossfade={false}
      transition={MORPH}
      className="relative overflow-hidden bg-night"
    >
      <div className={cn("relative aspect-[5/4]", images.poster ? "sm:hidden" : "sm:aspect-video")}>
        <Image
          src={images.card.src}
          alt={`${name}, ${credentials[0]}`}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: images.card.position ?? "center" }}
        />
      </div>

      {images.poster ? (
        <div className="relative hidden aspect-[3/2] sm:block">
          <Image
            src={images.poster.src}
            alt={`${name} — ${credentials.join(", ")}, ${role}`}
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-contain"
          />
        </div>
      ) : null}
    </m.div>
  );
}

function ProfileBody({
  ambassador,
  titleId,
}: {
  ambassador: Ambassador;
  titleId: string;
}) {
  const { name, credentials, role, statement, body, closing, testimonial } =
    ambassador;

  return (
    <m.div
      layout="position"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.22, duration: 0.45, ease: EASE } }}
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14 lg:p-12"
    >
      <div>
        <p className="ke-label flex items-center gap-2.5 text-accent-on-dark">
          <span aria-hidden="true" className="h-1.5 w-1.5 bg-ke-blue" />
          {role}
        </p>
        <h2 id={titleId} className="ke-h2 mt-5 text-white">
          {name}
        </h2>
        <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
          {credentials.map((credential, i) => (
            <li key={credential} className="ke-label flex items-center gap-3 text-steel-400">
              {i > 0 ? (
                <span aria-hidden="true" className="text-white/25">
                  /
                </span>
              ) : null}
              {credential}
            </li>
          ))}
        </ul>

        {/* The section's line, set as a headline — never in quotation marks,
            because it is not his quote. */}
        <p className="mt-8 border-t border-white/10 pt-7 font-display text-2xl font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-3xl">
          {statement}
        </p>
      </div>

      <div>
        <div className="space-y-4">
          {body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="ke-body text-steel-400">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Rendered only when an approved quote exists. */}
        {testimonial ? (
          <figure className="mt-8 border-l-2 border-ke-blue pl-6">
            <blockquote className="ke-lead text-white/90">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="ke-label mt-4 text-steel-400">
              {testimonial.attribution}
            </figcaption>
          </figure>
        ) : null}

        <p className="mt-8 font-display text-lg font-bold tracking-[-0.02em] text-white">
          {closing}
        </p>

        <div className="mt-8">
          <CTAButton href={primaryCta.href} variant="light">
            {primaryCta.label}
          </CTAButton>
        </div>
      </div>
    </m.div>
  );
}
