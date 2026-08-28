import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { programmes } from "@/data/programmes";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * P/01 – P/03. No prices are published anywhere, because none are verified.
 *
 * The three programmes are not equals: P/02 is the high-performance athlete
 * pathway and the commercial centre of the business. Three identical columns
 * gave it the same weight as the other two and made the section read as a
 * template, so it now spans the tall cell and carries the one photograph.
 */
export function ProgrammeGrid({ index = "04" }: { index?: string }) {
  const featured = programmes.find((programme) => programme.code === "P/02");
  const supporting = programmes.filter((programme) => programme.code !== "P/02");

  return (
    <section className="ke-section bg-bone">
      <Container>
        <Reveal>
          <SectionHeading
            index={index}
            label="Programmes"
            title={
              <>
                How you can work
                <br />
                with Kinetic Edge.
              </>
            }
            lead="Three ways in. The format changes with the athlete and the goal; the process behind it does not."
          />
        </Reveal>

        <ul className="mt-14 grid gap-px border border-line bg-line lg:mt-18 lg:grid-cols-12">
          {featured ? (
            <Reveal
              as="li"
              className="flex lg:col-span-5 lg:row-span-2"
              delay={0}
            >
              <article
                data-accent={featured.accent}
                className="group relative flex flex-1 flex-col overflow-hidden bg-paper transition-[background-color,box-shadow,transform] duration-300 ease-[var(--ease-ke)] hover:bg-white hover:shadow-[0_18px_40px_-28px_rgba(10,22,38,0.45)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 z-10 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-ke)] group-hover:scale-x-100"
                />

                <div className="relative overflow-hidden">
                  <Figure
                    imageKey="athleteDevelopment"
                    ratio="16/10"
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    tone="dark"
                    imageClassName="transition-transform duration-[900ms] ease-[var(--ease-ke)] group-hover:scale-[1.03]"
                  />
                  {/* Solid ground, white text. The chip sits over a photograph
                      that is not yet supplied, so contrast cannot be allowed to
                      depend on how bright that photograph turns out to be —
                      the accent is carried by the mark, not by the type. */}
                  <p className="ke-label absolute left-6 top-6 flex items-center gap-2.5 bg-night px-3 py-2 text-white">
                    <span aria-hidden="true" className="h-1.5 w-1.5 bg-ke-blue" />
                    {featured.code}
                    <span aria-hidden="true" className="text-white/30">/</span>
                    Featured
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-7 md:p-9 lg:p-10">
                  <h3 className="ke-h3 max-w-[18ch] text-ink">{featured.title}</h3>
                  <p className="ke-body mt-4 max-w-md text-steel">
                    {featured.description}
                  </p>

                  <ul className="mt-8 border-t border-line pt-2">
                    {featured.formats.map((format) => (
                      <li
                        key={format}
                        className="ke-body-sm flex items-center gap-3 border-b border-line/70 py-3 text-ink/85 last:border-b-0"
                      >
                        <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-accent" />
                        {format}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ) : null}

          {supporting.map((programme, cardIndex) => (
            <Reveal
              key={programme.code}
              as="li"
              delay={0.08 + cardIndex * 0.08}
              className="flex lg:col-span-7"
            >
              <article
                data-accent={programme.accent}
                className="group relative flex flex-1 flex-col bg-paper p-7 transition-[background-color,box-shadow,transform] duration-300 ease-[var(--ease-ke)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_40px_-28px_rgba(10,22,38,0.45)] md:p-9 lg:p-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-ke)] group-hover:scale-x-100"
                />

                <div className="flex items-start justify-between gap-4">
                  <p className="ke-label text-accent-ink">{programme.code}</p>
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rotate-45 bg-line transition-colors duration-300 group-hover:bg-accent"
                  />
                </div>

                <div className="mt-6 gap-x-10 lg:flex">
                  <div className="lg:w-1/2">
                    <h3 className="ke-h3 max-w-[16ch] text-ink">{programme.title}</h3>
                    <p className="ke-body mt-4 max-w-md text-steel">
                      {programme.description}
                    </p>
                  </div>

                  <ul className="mt-8 border-t border-line pt-2 lg:mt-0 lg:w-1/2 lg:border-t-0 lg:pt-0">
                    {programme.formats.map((format) => (
                      <li
                        key={format}
                        className={cn(
                          "ke-body-sm flex items-center gap-3 border-b border-line/70 py-3 text-ink/85 last:border-b-0",
                        )}
                      >
                        <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-accent" />
                        {format}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="ke-body mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-steel">
            Not sure which route fits?
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 font-medium text-ink underline-offset-4 transition-colors hover:text-ke-blue hover:underline"
            >
              Start with an assessment
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
