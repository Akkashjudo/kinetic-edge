import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealMask } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const pillars = [
  {
    code: "A",
    title: "Athletic preparation",
    body: "Training built around the physical qualities the sport actually demands.",
  },
  {
    code: "B",
    title: "Sport science",
    body: "Testing and monitoring that turn training decisions into informed ones.",
  },
  {
    code: "C",
    title: "Rehabilitation",
    body: "Clinical assessment and progressive loading, planned toward return to sport.",
  },
];

export function BrandIntro() {
  return (
    <section data-accent="performance" className="ke-section bg-paper">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="01" className="mb-8">
                The System
              </SectionLabel>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="ke-statement max-w-[24ch] text-ink">
                Most athletes are trained in one place, tested in another and
                rehabilitated somewhere else again.
              </h2>
              <p className="mt-6 max-w-[34ch] font-display text-[1.25rem] font-semibold leading-[1.32] tracking-[-0.025em] text-steel sm:text-[1.4375rem] lg:text-[1.625rem]">
                Kinetic Edge brings athletic preparation, sport science and
                rehabilitation inside one system — so the same information
                follows the athlete from assessment to competition.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-12 grid gap-px border-t border-line bg-line sm:grid-cols-3">
                {pillars.map((pillar) => (
                  <li key={pillar.code} className="bg-paper pt-6">
                    <p className="ke-label mb-3 text-accent-ink">{pillar.code}</p>
                    <h3 className="font-display text-[1.1875rem] font-bold tracking-[-0.022em] text-ink lg:text-[1.25rem]">
                      {pillar.title}
                    </h3>
                    <p className="ke-body-sm mt-2.5 max-w-[30ch] pb-6 pr-4 text-steel">
                      {pillar.body}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10">
                <CTAButton href="/about" variant="outline">
                  Inside Kinetic Edge
                </CTAButton>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <RevealMask className="lg:sticky lg:top-28">
              <Figure
                imageKey="brandIntro"
                ratio="4/5"
                sizes="(min-width: 1024px) 40vw, 100vw"
                tone="dark"
              />
            </RevealMask>
          </div>
        </div>
      </Container>
    </section>
  );
}
