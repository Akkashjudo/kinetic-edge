"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a media query.
 *
 * Built on `useSyncExternalStore` rather than an effect, for the same reason as
 * `useIsFinePointer`: matchMedia is an external store, the server snapshot is
 * pinned to `false` so hydration matches, and no state is set during an effect
 * body.
 *
 * Use it to gate BEHAVIOUR, never markup. Branching the rendered tree on a
 * value that is `false` on the server and `true` on the client is a hydration
 * mismatch — see the note at the top of components/ui/Reveal.tsx.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Tailwind's `lg` breakpoint, where the site switches to its desktop layouts. */
export const LG = "(min-width: 1024px)";
