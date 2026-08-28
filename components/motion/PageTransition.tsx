"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Route transition.
 *
 * Deliberately close to invisible: a night-coloured panel wipes off the top of
 * the incoming page. If a visitor can describe it afterwards, it is too long.
 *
 * Driven by a CSS animation rather than by Framer Motion, for one reason that
 * matters: the panel's *resting* state is `scaleY(0)` in the stylesheet, so it
 * physically cannot end up stranded over the page if an animation is
 * interrupted, replaced mid-flight, or never runs at all. Changing the `key`
 * remounts the element, which restarts the animation.
 *
 * Three things it must never do:
 *  · block navigation — `pointer-events: none`, and the route has already
 *    changed by the time the wipe plays, so nothing waits on it;
 *  · trap focus — it renders no focusable content and is `aria-hidden`;
 *  · delay the incoming hero image — the panel sits above the page rather than
 *    gating it, so the LCP image decodes underneath while the wipe runs.
 *
 * After each transition focus moves to the main landmark, so keyboard and
 * screen-reader users land on the new page rather than on a consumed link.
 */
export function PageTransition() {
  const pathname = usePathname();

  // Compared against the path rather than tracking "have I rendered before":
  // React re-invokes effects on mount in development, which would make a
  // first-render flag fire the focus move on the initial page load.
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    const main = document.getElementById("main");
    if (!main) return;

    // Applied transiently and cleared on blur. A permanent `tabindex="-1"`
    // container captures focus on every click of the plain content inside it,
    // and clearing it immediately after focusing would drop the focus we just
    // moved — so it is removed the next time the element loses focus.
    main.setAttribute("tabindex", "-1");
    main.focus({ preventScroll: true });
    main.addEventListener(
      "blur",
      () => main.removeAttribute("tabindex"),
      { once: true },
    );
  }, [pathname]);

  return (
    <span
      key={pathname}
      aria-hidden="true"
      className="ke-page-wipe pointer-events-none fixed inset-0 z-[80] block bg-night"
    />
  );
}
