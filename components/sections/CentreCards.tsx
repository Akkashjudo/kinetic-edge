import { ArrowUpRight, MapPin } from "lucide-react";
import { centres } from "@/data/centres";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * The two centres — name, location, what happens there, and a way to find it.
 *
 * "View Centre" opens the centre's Google Maps listing: the one place that shows
 * the building, the street and directions together. It is labelled as leaving
 * the site so it never surprises anyone.
 *
 * Light by design. The previous dark split with its scroll-driven seam was one
 * of several dark bands stacked on the homepage; the photographs now carry the
 * weight on their own.
 */
export function CentreCards({
  index = "04",
  title = "Two Centres. One System.",
  lead = "One centre built for training, one built for recovery — both in Golden George Nagar, Chennai, and run by one team.",
  surface = "paper",
}: {
  index?: string;
  title?: string;
  lead?: string;
  surface?: "paper" | "bone";
}) {
  return (
    <section className={cn("ke-section", surface === "bone" ? "bg-bone" : "bg-paper")}>
      <Container>
        <Reveal>
          <SectionHeading index={index} label="Our Centres" title={title} lead={lead} />
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-18 lg:gap-8">
          {centres.map((centre, i) => (
            <Reveal key={centre.id} as="li" delay={i * 0.1} className="flex">
              <article
                data-accent={centre.accent}
                className="group relative flex flex-1 flex-col border border-line bg-paper transition-[box-shadow,border-color] duration-500 ease-[var(--ease-ke)] hover:border-accent-line hover:shadow-[0_28px_60px_-40px_rgba(10,22,38,0.45)] has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent"
              >
                <div className="relative overflow-hidden">
                  <Figure
                    imageKey={centre.imageKey}
                    ratio="16/10"
                    sizes="(min-width: 768px) 48vw, 100vw"
                    tone="dark"
                    imageClassName="transition-transform duration-[900ms] ease-[var(--ease-ke)] group-hover:scale-[1.04]"
                  />
                  <p className="ke-label absolute left-4 top-4 flex items-center gap-2 bg-paper/95 px-3 py-2 text-ink backdrop-blur-sm sm:left-5 sm:top-5">
                    <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
                    {centre.code}
                  </p>
                </div>

                <span aria-hidden="true" className="h-[3px] w-full bg-accent" />

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="ke-h3 text-ink">{centre.name}</h3>

                  <p className="mt-3 flex items-start gap-2.5 text-[0.9375rem] text-ink/85">
                    <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
                    <span>
                      {centre.street}
                      <span className="block text-steel">{centre.area}</span>
                    </span>
                  </p>

                  <p className="ke-body-sm mt-5 max-w-md text-steel">{centre.description}</p>

                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {centre.highlights.map((item) => (
                      <li
                        key={item}
                        className="bg-accent-tint px-2.5 py-1.5 text-[0.8125rem] leading-none text-ink/85"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <a
                      href={centre.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center gap-2.5 bg-accent-ink px-6 font-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-white transition-colors duration-200 hover:bg-accent-ink-hover focus-visible:outline-none active:scale-[0.98] after:absolute after:inset-0 after:content-['']"
                    >
                      View Centre
                      <span className="sr-only">
                        {" "}— {centre.fullName} on Google Maps (opens in a new tab)
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
