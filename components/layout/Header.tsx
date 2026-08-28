"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { navigation, primaryCta, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui/CTAButton";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/icons";
import { ScrollProgress } from "./ScrollProgress";
import { MobileNav } from "./MobileNav";

/**
 * Fixed header. Transparent while it sits over a page's dark hero, then resolves
 * to a solid surface once the visitor scrolls — so contrast is never borrowed
 * from whatever happens to be underneath it.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();

  // 90px rather than 12px, so the transparent state over the hero is actually
  // seen before the header resolves to a surface.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 90);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Route changes close everything that was open. Adjusted during render rather
  // than in an effect, which avoids a cascading second render on every navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenDropdown(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Stable identity: MobileNav's focus-trap effect depends on this, and the
  // scroll listener re-renders Header often enough that an inline arrow would
  // tear the trap down and rebuild it several times a second.
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  }, [cancelClose]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const solid = scrolled || mobileOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ease-[var(--ease-ke)]",
          solid
            ? "border-b border-line bg-paper/95 backdrop-blur-md"
            : "surface-dark border-b border-transparent bg-transparent",
        )}
      >
        {/* Scrim behind the transparent header. Guarantees contrast for the
            white nav no matter how bright the hero photograph turns out to be. */}
        {!solid ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-night/75 via-night/35 to-transparent"
          />
        ) : null}

        <div
          className={cn(
            "ke-container flex items-center justify-between gap-4 transition-[height] duration-300 ease-[var(--ease-ke)] lg:gap-8",
            solid ? "h-14 lg:h-16" : "h-16 lg:h-20",
          )}
        >
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="flex min-h-11 shrink-0 items-center rounded-[2px]"
          >
            <span
              className={cn(
                "block origin-left transition-transform duration-300 ease-[var(--ease-ke)]",
                solid ? "scale-[0.88]" : "scale-100",
              )}
            >
              <Logo tone={solid ? "light" : "dark"} gradientId="ke-grad-header" />
            </span>
          </Link>

          {/* ---------------------------------------------------- Desktop nav */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => {
                const active = isActive(item.href);

                if (!item.children) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "relative rounded-[2px] px-3 py-2 text-[0.875rem] font-medium transition-colors xl:px-3.5",
                          solid
                            ? active
                              ? "text-ke-blue"
                              : "text-ink/75 hover:text-ink"
                            : active
                              ? "text-white"
                              : "text-white/75 hover:text-white",
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-ke-blue transition-transform duration-[180ms] ease-[var(--ease-ke)]",
                            active ? "scale-x-100" : "scale-x-0",
                          )}
                        />
                      </Link>
                    </li>
                  );
                }

                const isOpen = openDropdown === item.label;

                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => {
                      cancelClose();
                      setOpenDropdown(item.label);
                    }}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={dropdownId}
                      onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                      className={cn(
                        "relative flex items-center gap-1.5 rounded-[2px] px-3 py-2 text-[0.875rem] font-medium transition-colors xl:px-3.5",
                        solid
                          ? active
                            ? "text-ke-blue"
                            : "text-ink/75 hover:text-ink"
                          : active
                            ? "text-white"
                            : "text-white/75 hover:text-white",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-300",
                          isOpen && "rotate-180",
                        )}
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-ke-blue transition-transform duration-[180ms] ease-[var(--ease-ke)]",
                          active ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen ? (
                        <m.div
                          id={dropdownId}
                          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3"
                          onMouseEnter={cancelClose}
                          onMouseLeave={scheduleClose}
                        >
                          <div className="border border-line bg-paper p-2 shadow-[0_24px_60px_-24px_rgba(10,22,38,0.35)]">
                            <ul className="grid grid-cols-2 gap-0.5">
                              {item.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    data-accent={child.accent}
                                    className="group block rounded-[2px] p-3.5 transition-colors hover:bg-bone"
                                  >
                                    <span className="flex items-center gap-2">
                                      <span
                                        aria-hidden="true"
                                        className="h-1.5 w-1.5 shrink-0 bg-accent"
                                      />
                                      <span className="font-display text-[0.875rem] font-semibold tracking-[-0.015em] text-ink transition-colors group-hover:text-accent-ink">
                                        {child.label}
                                      </span>
                                    </span>
                                    {child.description ? (
                                      <span className="mt-1.5 block pl-3.5 text-[0.75rem] leading-snug text-steel">
                                        {child.description}
                                      </span>
                                    ) : null}
                                  </Link>
                                </li>
                              ))}
                            </ul>

                            <Link
                              href={item.href}
                              className="mt-1 flex items-center justify-between border-t border-line px-3.5 py-3 text-[0.8125rem] font-medium text-ink transition-colors hover:text-ke-blue"
                            >
                              <span>All services — performance and rehabilitation</span>
                              <span aria-hidden="true">→</span>
                            </Link>
                          </div>
                        </m.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* -------------------------------------------------- Desktop actions */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${site.name} on ${site.whatsapp.display}`}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-[2px] border transition-colors",
                solid
                  ? "border-line text-ink hover:border-ink/40 hover:bg-bone"
                  : "border-white/25 text-white hover:border-white/60 hover:bg-white/10",
              )}
            >
              <WhatsAppIcon className="h-[1.15rem] w-[1.15rem]" />
            </a>

            <CTAButton
              href={primaryCta.href}
              variant={solid ? "primary" : "light"}
              size="md"
              className="h-11 px-5 text-[0.875rem]"
            >
              {primaryCta.label}
            </CTAButton>
          </div>

          {/* --------------------------------------------------- Mobile trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-[2px] border transition-colors lg:hidden",
              solid
                ? "border-line text-ink"
                : "border-white/25 text-white",
            )}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <ScrollProgress visible={solid && !mobileOpen} />
      </header>

      <MobileNav open={mobileOpen} onClose={closeMobile} />
    </>
  );
}
