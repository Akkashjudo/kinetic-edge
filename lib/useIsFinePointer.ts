"use client";

import { useCallback, useSyncExternalStore } from "react";

const QUERY = "(pointer: fine)";

/**
 * True when the visitor has a precise pointing device.
 *
 * Pointer-dependent effects — scroll scrubbing, hover previews — are gated on
 * this rather than on viewport width, so a touchscreen laptop at 1440px does
 * not receive interactions it cannot perform.
 *
 * Built on `useSyncExternalStore` rather than an effect: matchMedia is an
 * external store, the server snapshot is pinned to `false` so hydration matches,
 * and no state is set during an effect body.
 */
export function useIsFinePointer(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const query = window.matchMedia(QUERY);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const getSnapshot = useCallback(() => window.matchMedia(QUERY).matches, []);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
