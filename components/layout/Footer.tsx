import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { centres } from "@/data/centres";
import { services } from "@/data/services";
import { footerLinks, site, socialLinks } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * No email address is published anywhere in the footer — none exists.
 * Phone and WhatsApp are the contact routes.
 *
 * Both centres are listed. Opening hours are verified for Centre 01 only, so
 * they sit under Centre 01 and nowhere else.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="surface-dark relative isolate overflow-hidden bg-ink-lift text-white">
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
        {/* Two link columns sit side by side even on a phone; the brand and
            visit blocks span the full width around them. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 lg:grid-cols-[1.2fr_1fr_0.8fr_1.3fr] lg:gap-12 lg:py-20">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Logo tone="dark" withDescriptor gradientId="ke-grad-footer" />
            <p className="mt-7 max-w-xs font-display text-xl font-bold leading-tight tracking-[-0.028em] text-white sm:text-2xl">
              Train Better.
              <br />
              Perform Better.
            </p>

            <div className="mt-8">
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

          {/* Services */}
          <nav aria-label="Services">
            <h2 className="ke-label text-steel-400">Services</h2>
            <ul className="mt-6 space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="ke-tap text-[0.9375rem] text-white/70 transition-colors hover:text-white"
                  >
                    {service.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

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

          {/* Visit */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className="ke-label text-steel-400">Visit</h2>

            <ul className="mt-6 space-y-5">
              {centres.map((centre) => (
                <li key={centre.id} data-accent={centre.accent}>
                  <address className="not-italic">
                    <p className="text-[0.8125rem] font-medium text-white">
                      {centre.code} — {centre.name}
                    </p>
                    <a
                      href={centre.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 flex min-h-6 gap-2.5 text-[0.875rem] leading-relaxed text-white/70 transition-colors hover:text-white"
                    >
                      <MapPin
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-accent-on-dark"
                        aria-hidden="true"
                      />
                      <span>
                        {centre.street}, {centre.area}
                        <span className="sr-only"> (opens Google Maps)</span>
                      </span>
                    </a>
                  </address>
                </li>
              ))}
            </ul>

            <a
              href={site.phone.href}
              className="mt-6 flex min-h-6 items-center gap-2.5 text-[0.9375rem] text-white/80 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 shrink-0 text-accent-on-dark" aria-hidden="true" />
              {site.phone.display}
            </a>

            <p className="ke-label mt-5 border-t border-white/10 pt-4 text-steel-400">
              Centre 01 hours
            </p>
            <dl className="mt-3 space-y-1.5 text-[0.8125rem]">
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
          <p className="ke-label">Chennai · Tamil Nadu</p>
        </div>
      </Container>
    </footer>
  );
}
