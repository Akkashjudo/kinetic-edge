"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Modal behaviour, shared by the mobile menu and the athlete profile.
 *
 * While `open`:
 *  · the page behind cannot scroll;
 *  · Tab and Shift+Tab cycle inside `containerRef` instead of escaping it;
 *  · Escape calls `onClose`;
 *  · focus starts on `initialFocusRef` (or the container), and on close it
 *    returns to whatever opened the modal.
 *
 * SCROLL LOCK goes on <html>, not <body>. The root element carries
 * `overflow-x: clip`, which stops the body's overflow being propagated to the
 * viewport — so `body { overflow: hidden }` left the page scrollable behind an
 * open panel. Locking the root is what the viewport actually reads.
 * `scrollbar-gutter: stable` on the root (globals.css) keeps the page from
 * shifting sideways when the scrollbar is taken away.
 *
 * `onClose` should be stable (useCallback) — the effect re-subscribes when it
 * changes, which would restart the focus handling.
 *
 * Pass `returnFocusRef` when the opener is known. Safari does not focus a
 * button when it is clicked, so "whatever was focused when the modal opened"
 * is <body> there, and focus would otherwise land back at the top of the page.
 */
export function useModal({
  open,
  onClose,
  containerRef,
  initialFocusRef,
  returnFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  containerRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    if (!open) return;

    const trigger =
      returnFocusRef?.current ?? (document.activeElement as HTMLElement | null);
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    // A frame later, so the panel has mounted before focus moves into it.
    const raf = requestAnimationFrame(() => {
      (initialFocusRef?.current ?? containerRef.current)?.focus({
        preventScroll: true,
      });
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      const container = containerRef.current;
      if (event.key !== "Tab" || !container) return;

      const nodes = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((node) => node.offsetParent !== null);
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !container.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !container.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      root.style.overflow = previousOverflow;

      // Deferred a frame: an exit animation is still running at cleanup time,
      // and focusing mid-unmount silently drops focus onto <body>.
      requestAnimationFrame(() => {
        if (trigger && trigger.isConnected) trigger.focus({ preventScroll: true });
      });
    };
  }, [open, onClose, containerRef, initialFocusRef, returnFocusRef]);
}
