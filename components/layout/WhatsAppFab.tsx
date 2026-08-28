"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * Mobile-only WhatsApp shortcut.
 *
 * Held back until the visitor is past the hero so it never competes with the
 * primary call to action, and kept small enough not to sit over content.
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <m.a
          href={site.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp ${site.name} on ${site.whatsapp.display}`}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-[3px] bg-ke-blue text-white shadow-[0_12px_32px_-8px_rgba(19,133,214,0.6)] transition-colors hover:bg-ke-blue-600 lg:hidden"
        >
          <WhatsAppIcon className="h-6 w-6" />
        </m.a>
      ) : null}
    </AnimatePresence>
  );
}
