"use client";

import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { KEMark } from "@/components/ui/Logo";

/**
 * The entrance.
 *
 * Night ground → the KE mark resolves → a hairline draws under it → the whole
 * plate wipes upward off the hero. It is the same wipe `RevealMask` uses on
 * every photograph on the site, at full-screen scale, so arriving reads as the
 * first of the page's reveals rather than as a separate loading screen.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * RULES THIS THING HAS TO OBEY
 *
 * · It is never a wait. The plate leaves as soon as the document is ready, with
 *   a 700ms floor so the mark is not a flicker, and a hard 1.8s ceiling so a
 *   slow network can never hold the site shut. Nothing is fetched for it — the
 *   mark is inline SVG that is already in the bundle.
 * · Once per tab. `sessionStorage` plus the inline script in the root layout
 *   means a reload or a deep link does not replay it, and the plate is never
 *   painted for a returning visitor — not even for one frame.
 * · The rendered tree never branches on reduced motion (that is a hydration
 *   mismatch — see components/ui/Reveal.tsx). Reduced motion is honoured in CSS
 *   instead: the stylesheet in the root layout hides `.ke-entrance` outright,
 *   so the plate is never painted and there is no entrance at all.
 * · It is decorative and it is not a dialog: `aria-hidden`, no focus trap, no
 *   role. Keyboard focus and screen-reader order are untouched.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const SEEN_KEY = "ke:entered";
/** Long enough for the mark to read, short enough not to be a wait. */
const MIN_MS = 700;
/** The plate never holds the site shut for longer than this. */
const MAX_MS = 1800;
/** Must match the wipe duration below. */
const WIPE_MS = 760;

export function BrandLoader() {
  const [state, setState] = useState<"holding" | "leaving" | "gone">("holding");
  const reduce = useReducedMotion();

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Private mode or blocked storage — show it, it is only once.
    }

    if (seen || reduce) {
      // Not synchronously: a setState in an effect body cascades a render.
      // Neither case is visible anyway — the stylesheet in the root layout
      // already hides `.ke-entrance` for a returning visitor and under reduced
      // motion, so this only tidies the element out of the tree.
      const raf = requestAnimationFrame(() => setState("gone"));
      return () => cancelAnimationFrame(raf);
    }

    const started = performance.now();
    let leaveTimer: number | undefined;
    let goneTimer: number | undefined;
    let left = false;

    // Hold the page still underneath, so the wipe reveals the top of the hero
    // rather than wherever a restored scroll position happened to land.
    // `scrollbar-gutter: stable` is set in globals.css, so this does not shift
    // the layout sideways. Released the moment the wipe starts.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const unlock = () => {
      root.style.overflow = previousOverflow;
    };

    const leave = () => {
      if (left) return;
      left = true;
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // Nothing to do — the plate simply shows again next time.
      }
      unlock();
      setState("leaving");
      goneTimer = window.setTimeout(() => setState("gone"), WIPE_MS);
    };

    const onReady = () => {
      leaveTimer = window.setTimeout(
        leave,
        Math.max(0, MIN_MS - (performance.now() - started)),
      );
    };

    if (document.readyState === "complete") onReady();
    else window.addEventListener("load", onReady, { once: true });

    const ceiling = window.setTimeout(leave, MAX_MS);

    return () => {
      window.removeEventListener("load", onReady);
      window.clearTimeout(ceiling);
      if (leaveTimer) window.clearTimeout(leaveTimer);
      if (goneTimer) window.clearTimeout(goneTimer);
      unlock();
    };
  }, [reduce]);

  if (state === "gone") return null;

  const instant = { duration: 0 };

  return (
    <m.div
      aria-hidden="true"
      // `ke-entrance` is what the pre-paint guard in the root layout hides, so
      // a returning visitor never sees this plate flash.
      className="ke-entrance fixed inset-0 z-[100] flex items-center justify-center bg-night"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={{
        clipPath:
          state === "leaving" ? "inset(0% 0% 100% 0%)" : "inset(0% 0% 0% 0%)",
      }}
      transition={
        reduce
          ? instant
          : { duration: WIPE_MS / 1000, ease: [0.76, 0, 0.24, 1] }
      }
    >
      <div className="flex flex-col items-center">
        <m.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            reduce ? instant : { duration: 0.62, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <KEMark gradientId="ke-loader-mark" className="w-24 sm:w-28" />
        </m.div>

        {/* The hairline that runs under every mark on the site. */}
        <m.span
          className="mt-6 block h-px w-24 origin-left bg-ke-blue sm:w-28"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={
            reduce
              ? instant
              : { duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }
          }
        />
      </div>
    </m.div>
  );
}
