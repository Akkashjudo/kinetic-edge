"use client";

import {
  useId,
  useRef,
  useSyncExternalStore,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LazyMotion, MotionConfig, m } from "framer-motion";
import { X } from "lucide-react";
import { useModal } from "@/lib/useModal";

/**
 * A card that grows into a full profile, and shrinks back when it closes.
 *
 * Adapted from "Morphing Dialog" by patrick-xin via 21st.dev —
 * https://21st.dev/@patrick-xin/components/morphing-dialog — rebuilt without
 * Base UI, Radix or shadcn. The card and the panel share a `layoutId`, so the
 * card itself becomes the panel rather than a new box fading in over it.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHY THIS LOADS ITS OWN FEATURE BUNDLE
 *
 * The app runs Framer Motion on `domAnimation`, which has no layout projection,
 * so `layoutId` would silently do nothing. The full bundle is loaded on demand
 * in its own chunk (lib/motion-features.ts), so pages without a gallery never
 * pay for it. Until it arrives the cards are ordinary markup, and a click that
 * beats it opens the profile without the morph.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * `layoutCrossfade={false}` makes whichever of the pair is leading hide the
 * other, so the card is never visible behind its own profile.
 *
 * Accessibility and reduced motion are handled here once, for every gallery:
 * scroll lock, focus trap, Escape and focus return come from `useModal`, and
 * `reducedMotion="user"` drops the morph while keeping the fades.
 */

const loadLayoutFeatures = () =>
  import("@/lib/motion-features").then((mod) => mod.default);

export const EASE = [0.22, 1, 0.36, 1] as const;
export const MORPH = { duration: 0.55, ease: EASE };

const subscribeNever = () => () => {};

/** Wraps a gallery: loads the layout features and honours reduced motion. */
export function MorphProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadLayoutFeatures}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

export function MorphDialog({
  open,
  layoutId,
  onClose,
  returnFocusRef,
  children,
}: {
  open: boolean;
  /** Matches the `layoutId` on the card that opened it. */
  layoutId: string | null;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  /** Receives the id to put on the panel's heading. */
  children: (titleId: string) => ReactNode;
}) {
  // False on the server and during hydration, true after — the portal target
  // only exists in the browser.
  const isClient = useSyncExternalStore(subscribeNever, () => true, () => false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useModal({
    open,
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
      {open && layoutId ? (
        <div key={layoutId} className="fixed inset-0 z-[60]">
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
                layoutId={layoutId}
                layoutCrossfade={false}
                transition={MORPH}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                data-accent="performance"
                className="surface-dark relative w-full max-w-4xl overflow-hidden bg-night text-white shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85)] focus:outline-none"
              >
                {children(titleId)}

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
 * The panel's text, faded in once the morph is most of the way there. `layout`
 * keeps it from being squashed by the panel's scale while that runs.
 */
export function MorphContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.div
      layout="position"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.22, duration: 0.45, ease: EASE } }}
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      className={className}
    >
      {children}
    </m.div>
  );
}
