import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { footerLinks, site, socialLinks } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * No email address is published anywhere in the footer — none exists.
 * Phone and WhatsApp are the contact routes.
 *
 * Grounded on --ink-lift rather than --night so it steps away from the closing
 * CTA above it instead of merging into one continuous dark band.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="surface-dark relative isolate overflow-hidden border-t border-white/10 bg-ink-lift text-white">
      <div aria-hidden="true" className="ke-grid-lines absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 100% 0%, rgba(15,154,171,0.16) 0%, transparent 55%), radial-gradient(70% 60% at 0% 100%, rgba(19,133,214,0.18) 0%, transparent 55%)",
        }}
      />

      <Container className="relative">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-16 lg:py-20">
          {/* Brand */}
          <div>
            <Logo tone="dark" withDescriptor gradientId="ke-grad-footer" />
            <p className="mt-7 max-w-xs font-display text-xl font-bold leading-tight tracking-[-0.028em] text-white sm:text-2xl">
              Built for Performance.
              <br />
              Engineered for Recovery.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton
                href={site.whatsapp.href}
                external
                variant="light"
                arrow={false}
                className="h-11 px-5 text-[0.875rem]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp Kinetic Edge
              </CTAButton>
            </div>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <h2 className="ke-label text-steel-400">Navigate</h2>
            <ul className="mt-6 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="ke-tap text-[0.9375rem] text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact — Centre 01 only */}
          <div>
            <h2 className="ke-label text-steel-400">Centre 01</h2>

            <address className="mt-6 not-italic">
              <p className="flex gap-3 ke-body text-white/70">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-ke-blue"
                  aria-hidden="true"
                />
                <span>
                  {site.address.street},<br />
                  {site.address.locality},<br />
                  {site.address.city}, {site.address.region}{" "}
                  {site.address.postalCode}
                </span>
              </p>

              <p className="mt-4">
                <a
                  href={site.phone.href}
                  className="flex min-h-6 items-center gap-3 text-[0.9375rem] text-white/70 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-ke-blue" aria-hidden="true" />
                  {site.phone.display}
                </a>
              </p>
            </address>

            <dl className="mt-6 space-y-1.5 border-t border-white/10 pt-5 text-[0.8125rem]">
              {site.hours.map((slot) => (
                <div key={slot.days} className="flex justify-between gap-4">
                  <dt className="text-steel-400">{slot.days}</dt>
                  <dd className="tabular-nums text-white/80">{slot.time}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
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

        <div className="flex flex-col gap-3 border-t border-white/10 py-7 text-[0.75rem] text-steel-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. Established {site.founded}.
          </p>
          <p className="ke-label">{site.address.short}</p>
        </div>
      </Container>
    </footer>
  );
}
