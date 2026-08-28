"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ChevronDown, Phone, X } from "lucide-react";
import { navigation, primaryCta, site, socialLinks } from "@/data/site";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui/CTAButton";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/icons";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Full-height mobile panel.
 *
 * Locks background scroll, traps Tab inside the panel while open, closes on
 * Escape, and returns focus to whatever opened it.
 */
export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const [expanded, setExpanded] = useState<string | null>("Services");
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const raf = requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((node) => node.offsetParent !== null);
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      restoreRef.current?.focus?.();
    };
  }, [open, onClose]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={
            reduce ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
          }
          className="surface-dark fixed inset-0 z-[60] flex flex-col bg-night text-white lg:hidden"
        >
          <div
            aria-hidden="true"
            className="ke-grid-lines pointer-events-none absolute inset-0 opacity-60"
          />

          {/* Panel header mirrors the site header height so nothing jumps */}
          <div className="relative flex h-16 shrink-0 items-center justify-between px-5 sm:px-8">
            <Logo tone="dark" gradientId="ke-grad-mobilenav" />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-[2px] border border-white/25 text-white transition-colors hover:bg-white/10"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="relative flex-1 overflow-y-auto overscroll-contain px-5 pb-8 pt-4 sm:px-8">
            <nav aria-label="Primary">
              <ul className="border-t border-white/10">
                {navigation.map((item, itemIndex) => {
                  const active = isActive(item.href);
                  // Rows cascade in behind the panel. 40ms is short enough that
                  // the last row is in place before a thumb can reach it.
                  const rowMotion = {
                    initial: reduce ? false : { opacity: 0, y: 8 },
                    animate: { opacity: 1, y: 0 },
                    transition: reduce
                      ? { duration: 0 }
                      : {
                          duration: 0.32,
                          delay: 0.08 + itemIndex * 0.04,
                          ease: [0.22, 1, 0.36, 1] as const,
                        },
                  };

                  if (!item.children) {
                    return (
                      <m.li
                        key={item.href}
                        className="border-b border-white/10"
                        {...rowMotion}
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between py-4 font-display text-2xl font-bold tracking-[-0.03em] transition-colors",
                            active ? "text-ke-blue" : "text-white hover:text-ke-blue",
                          )}
                        >
                          {item.label}
                          <span aria-hidden="true" className="text-white/25">→</span>
                        </Link>
                      </m.li>
                    );
                  }

                  const isExpanded = expanded === item.label;

                  return (
                    <m.li
                      key={item.href}
                      className="border-b border-white/10"
                      {...rowMotion}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          href={item.href}
                          onClick={onClose}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex-1 py-4 font-display text-2xl font-bold tracking-[-0.03em] transition-colors",
                            active ? "text-ke-blue" : "text-white hover:text-ke-blue",
                          )}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          aria-controls={`mobile-${item.label}`}
                          aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.label}`}
                          onClick={() => setExpanded(isExpanded ? null : item.label)}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] border border-white/20 text-white transition-colors hover:bg-white/10"
                        >
                          <ChevronDown
                            aria-hidden="true"
                            className={cn(
                              "h-4 w-4 transition-transform duration-300",
                              isExpanded && "rotate-180",
                            )}
                          />
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {isExpanded ? (
                          <m.div
                            id={`mobile-${item.label}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={
                              reduce
                                ? { duration: 0 }
                                : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                            }
                            className="overflow-hidden"
                          >
                            <ul className="space-y-0.5 pb-4">
                              {item.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={onClose}
                                    data-accent={child.accent}
                                    className="flex items-center gap-3 rounded-[2px] py-2.5 text-[0.9375rem] text-white/70 transition-colors hover:text-white"
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="h-1.5 w-1.5 shrink-0 bg-accent"
                                    />
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </m.div>
                        ) : null}
                      </AnimatePresence>
                    </m.li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-8 space-y-3">
              <CTAButton
                href={primaryCta.href}
                variant="light"
                size="lg"
                className="w-full"
              >
                {primaryCta.label}
              </CTAButton>
              <CTAButton
                href={site.whatsapp.href}
                external
                variant="outlineLight"
                size="lg"
                arrow={false}
                className="w-full"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp Kinetic Edge
              </CTAButton>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <a
                href={site.phone.href}
                className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-[-0.02em] text-white"
              >
                <Phone className="h-4 w-4 text-ke-blue" aria-hidden="true" />
                {site.phone.display}
              </a>
              <p className="mt-3 text-[0.8125rem] text-steel-400">
                {site.address.short}
              </p>

              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ke-label ke-tap text-steel-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
