import type { Accent } from "@/lib/types";
import type { SiteImageKey } from "@/data/images";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealMask } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * The numbered body of a service page. Each block describes what is trained or
 * treated — never an outcome, timeline or guarantee.
 */
export function ServiceBlocks({
  blocks,
  index = "01",
  label = "What this covers",
  title,
  lead,
  accent = "performance",
  breakImage,
}: {
  blocks: { title: string; body: string }[];
  index?: string;
  label?: string;
  title: React.ReactNode;
  lead?: string;
  accent?: Accent;
  /** Breaks a long list with a photograph rather than running ten text rows. */
  breakImage?: SiteImageKey;
}) {
  // Only worth interrupting a genuinely long list.
  const breakAfter = blocks.length >= 8 ? 4 : -1;
  return (
    <section data-accent={accent} className="ke-section bg-paper">
      <Container>
        <Reveal>
          <SectionHeading index={index} label={label} title={title} lead={lead} />
        </Reveal>

        <ol className="mt-14 grid gap-x-10 gap-y-0 border-t border-line md:grid-cols-2 lg:mt-18 lg:gap-x-16">
          {blocks.map((block, blockIndex) => (
            <Reveal
              key={block.title}
              as="li"
              delay={Math.min(blockIndex % 4, 3) * 0.05}
              className="group flex gap-5 border-b border-line py-7 md:gap-7 md:py-8"
            >
              <span className="ke-label mt-1.5 w-6 shrink-0 text-steel transition-colors group-hover:text-accent-ink">
                {String(blockIndex + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="font-display text-lg font-bold tracking-[-0.025em] text-ink md:text-xl">
                  {block.title}
                </h3>
                <p className="mt-2.5 max-w-[46ch] ke-body text-steel">
                  {block.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* A photograph, at its own ratio, in a narrower column than the text.
            A full-bleed band forced every one of these into 16:9 and threw away
            a third of a 5:4 frame; centring it means no crop and no 1000px-tall
            slab either. */}
        {breakImage && breakAfter > 0 ? (
          <RevealMask className="mx-auto mt-14 max-w-4xl lg:mt-18">
            <Figure
              imageKey={breakImage}
              ratio="natural"
              fallbackRatio="3/2"
              sizes="(min-width: 1024px) 896px, 100vw"
              tone="dark"
            />
          </RevealMask>
        ) : null}
      </Container>
    </section>
  );
}
