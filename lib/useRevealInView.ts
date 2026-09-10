"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Has this element scrolled into view yet?
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHY THIS EXISTS RATHER THAN FRAMER'S `whileInView` OR `useInView`
 *
 * Twice now, scroll reveals on this site have silently failed and left content
 * permanently invisible:
 *
 *   1. `whileInView` does nothing under `LazyMotion features={domAnimation}` —
 *      that bundle is animations + gestures, and the viewport feature is not in
 *      it. No error, no warning, just `initial` forever.
 *   2. Framer's `useInView` fixed most of it, but a consistent set of later
 *      grid siblings still never fired.
 *
 * Both failures are invisible in a build, in typechecking, and in any test that
 * checks geometry or text rather than computed opacity. The cost of getting it
 * wrong is the whole page below the fold going blank, so this is now twenty
 * lines we own outright.
 *
 * It also FAILS OPEN. If the observer has not reported within `failOpenMs`, the
 * element's own rect is checked once, and anything actually on screen is
 * revealed. Content is never left hidden because an observer misbehaved.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Returns `false` on the server and on the first client render, so markup at
 * hydration matches what the server sent.
 */
export function useRevealInView(
  ref: RefObject<Element | null>,
  { margin = "-72px", once = true, failOpenMs = 1200 } = {},
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (very old browser, some test runners): show it.
    // Deferred rather than set synchronously — a setState in an effect body
    // triggers a cascading render, and this must not run during hydration.
    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(id);
    }

    let done = false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            done = true;
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { rootMargin: margin },
    );

    observer.observe(el);

    // Fail open — if nothing has been reported and the element is on screen,
    // reveal it rather than leaving it invisible.
    const timer = window.setTimeout(() => {
      if (done) return;
      const rect = el.getBoundingClientRect();
      const onScreen =
        rect.bottom > 0 &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight);
      if (onScreen) {
        setInView(true);
        if (once) observer.disconnect();
      }
    }, failOpenMs);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [ref, margin, once, failOpenMs]);

  return inView;
}
