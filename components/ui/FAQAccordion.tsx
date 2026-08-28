"use client";

import { useId, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Accessible disclosure list.
 *
 * Native buttons carry aria-expanded and aria-controls; panels are removed from
 * the DOM when closed, so collapsed answers are never reachable by keyboard or
 * announced by a screen reader.
 */
export function FAQAccordion({
  items,
  className,
}: {
  items: FaqItem[];
  className?: string;
}) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.question} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-accent-ink md:py-7"
              >
                <span className="font-display text-lg font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-accent-ink md:text-xl">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-line text-steel transition-all duration-300 ease-[var(--ease-ke)] group-hover:border-accent group-hover:text-accent-ink",
                    isOpen &&
                      "rotate-45 border-accent-ink bg-accent-ink text-white group-hover:text-white",
                  )}
                >
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <m.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.36, ease: [0.22, 1, 0.36, 1] }
                  }
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 pr-10 ke-body text-steel md:text-base">
                    {item.answer}
                  </p>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
