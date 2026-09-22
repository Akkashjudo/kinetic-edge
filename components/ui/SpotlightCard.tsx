"use client";

import type { ComponentProps, PointerEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * A card with a pointer-follow spotlight and survey-mark corners.
 *
 * Adapted from "Feature Grid Spotlight Cards" by Mohammad Shehadeh (Hirael,
 * MIT) — https://21st.dev/@hirael/components/feature-08 — rebuilt on the
 * Kinetic Edge tokens: the warm glow becomes the card's accent, shadcn's Badge
 * and theme variables are gone, and the hairlines use --line.
 *
 * HOW IT STAYS CHEAP
 * Pointer movement writes two custom properties straight onto the element and
 * never touches React state, so there is no re-render per frame. Only a mouse
 * drives it — touch and pen skip the handler — and the layer's hover state is
 * gated on devices that can hover, so a tap never leaves it lit.
 *
 * LAYERING
 * The card is its own stacking context (`isolate`) and the decorative layers
 * sit at `-z-10`, behind the content but above the card's background. That
 * keeps the content unpositioned, so a stretched link inside can use the card
 * itself as its containing block.
 */
export function SpotlightCard({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      onPointerMove={onPointerMove}
      className={cn("group relative isolate", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="ke-spotlight pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Hairlines run just past each edge, so neighbouring cards read as one
          measured grid rather than as separate boxes. */}
      <span aria-hidden="true" className="pointer-events-none absolute -inset-y-3 -left-px -z-10 w-px bg-line" />
      <span aria-hidden="true" className="pointer-events-none absolute -inset-y-3 -right-px -z-10 w-px bg-line" />
      <span aria-hidden="true" className="pointer-events-none absolute -inset-x-3 -top-px -z-10 h-px bg-line" />
      <span aria-hidden="true" className="pointer-events-none absolute -inset-x-3 -bottom-px -z-10 h-px bg-line" />

      <CrossMark className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
      <CrossMark className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

      {children}
    </div>
  );
}

/** Corner crosshair, drawn half outside the edge like a survey mark. */
function CrossMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      className={cn(
        "pointer-events-none absolute z-10 h-3.5 w-3.5 text-steel-400",
        className,
      )}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
