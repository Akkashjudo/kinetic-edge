import type { ReactNode } from "react";
import type { Accent } from "@/lib/types";
import type { SiteImageKey } from "@/data/images";
import { cn } from "@/lib/utils";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Container } from "./Container";
import { Figure } from "./Figure";
import { SectionLabel } from "./SectionLabel";
import { Reveal, RevealMask } from "./Reveal";

interface PageHeroProps {
  crumbs: Crumb[];
  label: string;
  index?: string;
  title: string;
  lead?: string;
  accent?: Accent;
  imageKey?: SiteImageKey;
  actions?: ReactNode;
  className?: string;
}

/**
 * Shared interior-page hero. Dark by design so the transparent header always has
 * contrast to sit against, and so the page opens on the brand rather than on a
 * heading floating in white space.
 */
export function PageHero({
  crumbs,
  label,
  index,
  title,
  lead,
  accent = "performance",
  imageKey,
  actions,
  className,
}: PageHeroProps) {
  return (
    <section
      data-accent={accent}
      className={cn(
        "surface-dark relative isolate overflow-hidden bg-night text-white",
        className,
      )}
    >
      <div aria-hidden="true" className="ke-grid-lines absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 8% 100%, color-mix(in srgb, var(--accent) 26%, transparent) 0%, transparent 60%)",
        }}
      />

      <Container className="relative pb-14 pt-28 sm:pt-32 lg:pb-20 lg:pt-40">
        <div
          className={cn(
            "grid items-end gap-12",
            imageKey && "lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)] lg:gap-16",
          )}
        >
          <div>
            <Breadcrumbs items={crumbs} tone="dark" className="mb-8 lg:mb-10" />

            <Reveal y={16}>
              <SectionLabel index={index} tone="dark" className="mb-5">
                {label}
              </SectionLabel>
            </Reveal>

            <Reveal y={22} delay={0.06}>
              <h1 className="ke-h1 max-w-[16ch] text-white">{title}</h1>
            </Reveal>

            {lead ? (
              <Reveal y={18} delay={0.12}>
                <p className="ke-lead mt-6 max-w-xl text-steel-400">{lead}</p>
              </Reveal>
            ) : null}

            {actions ? (
              <Reveal y={18} delay={0.18}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  {actions}
                </div>
              </Reveal>
            ) : null}
          </div>

          {imageKey ? (
            <RevealMask delay={0.1} className="hidden lg:block">
              <Figure
                imageKey={imageKey}
                ratio="4/5"
                sizes="(min-width: 1024px) 38vw, 0px"
                tone="dark"
              />
            </RevealMask>
          ) : null}
        </div>
      </Container>

      {/* Accent hairline closing the hero */}
      <div aria-hidden="true" className="relative h-px w-full bg-white/10">
        <div className="absolute inset-y-0 left-0 w-1/4 bg-accent" />
      </div>
    </section>
  );
}
