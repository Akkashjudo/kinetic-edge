"use client";

import { useEffect } from "react";

/**
 * Guarantees that no revealed element is ever left invisible.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHY THIS EXISTS
 *
 * Entrance animations start at `opacity: 0`. That makes every reveal a single
 * point of failure: if the animation does not run — for any reason — the content
 * is simply gone, with no error in the console, nothing in the build, and
 * nothing a typecheck or a geometry-based test would catch. This site has
 * already shipped that exact bug once, when `whileInView` turned out not to be
 * in the `domAnimation` feature bundle and fifty elements went dark.
 *
 * Rather than trust one mechanism, this watchdog verifies the outcome. It
 * watches every `[data-ke-reveal]` element, and if one has been on screen for
 * `GRACE_MS` and is *still* visually hidden, it forces it visible.
 *
 * That covers the whole class of causes at once — a missing feature bundle, an
 * observer throttled in a background tab, a fast scroll outrunning the
 * callback, a browser quirk — without needing to know which one occurred.
 *
 * The grace period is comfortably longer than the longest entrance (1s plus
 * delay), so it never interrupts an animation that is running normally. In
 * healthy operation it does nothing at all.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const GRACE_MS = 2000;

function isVisuallyHidden(el: HTMLElement) {
  const cs = getComputedStyle(el);
  if (parseFloat(cs.opacity) < 0.99) return true;
  // A clip-path still inset by any non-zero amount is hiding the frame.
  return cs.clipPath !== "none" && /inset\(\s*[1-9]/.test(cs.clipPath);
}

export function RevealWatchdog() {
  useEffect(() => {
    // Without IntersectionObserver nothing can ever report a reveal, so show
    // everything immediately rather than leaving the page blank.
    if (typeof IntersectionObserver === "undefined") {
      document
        .querySelectorAll<HTMLElement>("[data-ke-reveal]")
        .forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
          el.style.clipPath = "none";
        });
      return;
    }

    const timers = new Map<Element, number>();

    const reveal = (el: HTMLElement) => {
      if (!isVisuallyHidden(el)) return;
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.clipPath = "none";
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;

        if (entry.isIntersecting) {
          if (!timers.has(el)) {
            timers.set(
              el,
              window.setTimeout(() => {
                reveal(el);
                timers.delete(el);
                observer.unobserve(el);
              }, GRACE_MS),
            );
          }
        } else {
          const timer = timers.get(el);
          if (timer !== undefined) {
            window.clearTimeout(timer);
            timers.delete(el);
          }
        }
      }
    });

    const observeAll = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-ke-reveal]").forEach((el) => {
        observer.observe(el);
      });
    };

    observeAll(document);

    // Route changes and lazily-rendered sections add new elements after mount.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.hasAttribute("data-ke-reveal")) observer.observe(node);
          observeAll(node);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
