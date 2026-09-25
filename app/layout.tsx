import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono, Inter } from "next/font/google";
import Script from "next/script";
import { site } from "@/data/site";
import { ogImage } from "@/lib/metadata";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { BrandLoader } from "@/components/motion/BrandLoader";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { PageTransition } from "@/components/motion/PageTransition";
import { RevealWatchdog } from "@/components/motion/RevealWatchdog";
import { LocalBusinessSchema } from "@/components/StructuredData";
import "./globals.css";

/**
 * Loaded as a variable font with its width axis exposed. The hero uses
 * `font-stretch` to hold each headline phrase on one authored line at small
 * widths, which is what removes the mid-phrase wrap without shrinking the type.
 */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} — Chennai`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "strength and conditioning Chennai",
    "sports performance centre Chennai",
    "athlete training Chennai",
    "sports physiotherapy Chennai",
    "sports rehabilitation Chennai",
    "performance testing Chennai",
    "strength and conditioning Mogappair",
    "sports physiotherapy Mogappair",
    "athlete development Chennai",
    "return to sport rehabilitation Chennai",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.legalName,
    title: `${site.legalName} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: "en_IN",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.legalName} — ${site.tagline}`,
    description: site.description,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#071320",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-scroll-behavior lets Next switch smooth scrolling off during route
    // changes, so a new page starts at the top instead of gliding up to it.
    // In-page anchors keep the smooth scroll set in globals.css.
    // suppressHydrationWarning covers the one attribute the entrance guard
    // below writes on <html> before React hydrates. It applies to this element
    // only, not to anything inside it.
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${archivo.variable} ${inter.variable} ${geistMono.variable}`}
    >
      <head>
        {/* The brand entrance plays once per tab. This runs before first paint,
            so a reload or a deep link never flashes it — see
            components/motion/BrandLoader.tsx. It must be next/script rather
            than a bare <script>: React does not execute a script tag it
            renders, and logs an error for it. */}
        <Script id="ke-entrance-guard" strategy="beforeInteractive">
          {`try{if(sessionStorage.getItem('ke:entered')==='1')document.documentElement.dataset.keEntered='1'}catch(e){}`}
        </Script>
        <style>{`html[data-ke-entered] .ke-entrance{display:none}@media (prefers-reduced-motion:reduce){.ke-entrance{display:none}}`}</style>

        {/* Entrance animations render at opacity 0 until Framer Motion runs.
            Without JavaScript, force every revealed element visible — and drop
            the entrance plate, which would otherwise never lift. */}
        <noscript>
          <style>{`[data-ke-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.ke-entrance{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen bg-paper antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[2px] focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>

        <MotionProvider>
          <BrandLoader />
          <RevealWatchdog />
          <PageTransition />
          <Header />

          {/* No permanent tabindex: a `tabindex="-1"` container captures focus
              on every click of the non-interactive content inside it. It is
              applied transiently instead — see PageTransition. */}
          <main id="main" className="focus:outline-none">
            {children}
          </main>

          <Footer />
          <WhatsAppFab />
        </MotionProvider>
        <LocalBusinessSchema />
      </body>
    </html>
  );
}
