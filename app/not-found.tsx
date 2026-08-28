import type { Metadata } from "next";
import Link from "next/link";
import { navigation } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { KEMark } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section
      data-accent="performance"
      className="surface-dark relative isolate flex min-h-[100svh] items-center overflow-hidden bg-night text-white"
    >
      <div aria-hidden="true" className="ke-grid-lines absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 65% at 12% 100%, rgba(19,133,214,0.28) 0%, transparent 62%)",
        }}
      />

      <KEMark
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-0 w-[55%] max-w-2xl text-white/[0.035]"
      />

      <Container className="relative py-32">
        <p className="ke-label mb-8 flex items-center gap-2 text-steel-400">
          <span className="text-ke-blue">404</span>
          <span aria-hidden="true" className="text-white/25">/</span>
          Page not found
        </p>

        <h1 className="ke-display max-w-[10ch] text-white">Off course.</h1>

        <p className="ke-lead mt-7 max-w-md text-steel-400">
          The page you&rsquo;re looking for isn&rsquo;t here.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <CTAButton href="/" variant="light" size="lg">
            Return Home
          </CTAButton>
          <CTAButton href="/services" variant="outlineLight" size="lg">
            Explore Services
          </CTAButton>
        </div>

        <nav aria-label="Site" className="mt-16 border-t border-white/10 pt-8">
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="ke-label ke-tap text-steel-400 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
