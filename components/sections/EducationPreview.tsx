import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { collaborations } from "@/data/collaborations";
import { educationFocus, educationIntro, featuredEvent } from "@/data/education";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * KE Education, on the homepage.
 *
 * What it covers, the most recent workshop, and the three most recent
 * collaborations — then one way through to the full record on /education.
 * Collaborations live under KE Education now, not under About.
 */
export function EducationPreview({ index = "08" }: { index?: string }) {
  const recent = collaborations.slice(0, 3);
  const event = featuredEvent;

  return (
    <section data-accent="performance" className="ke-section bg-bone">
      <Container>
        <Reveal>
          <SectionHeading
            index={index}
            label="Education"
            title="KE Education"
            lead={educationIntro}
            aside={
              <CTAButton href="/education" variant="outline">
                Explore KE Education
              </CTAButton>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:mt-18 lg:grid-cols-12">
          {/* What it covers */}
          <Reveal className="lg:col-span-4">
            <div className="h-full border border-line bg-paper p-6 sm:p-8">
              <h3 className="ke-label text-steel">What it covers</h3>
              <ol className="mt-5">
                {educationFocus.map((area, i) => (
                  <li
                    key={area}
                    className="flex items-baseline gap-4 border-b border-line py-3.5 last:border-b-0"
                  >
                    <span className="ke-label w-5 shrink-0 text-accent-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-base font-semibold tracking-[-0.015em] text-ink">
                      {area}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* Latest workshop */}
          <Reveal delay={0.06} className="lg:col-span-4">
            <article className="group relative flex h-full flex-col bg-ink p-6 text-white sm:p-8 surface-dark has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent">
              <p className="ke-label flex items-center gap-2.5 text-steel-400">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-steel-400" />
                Latest workshop
              </p>
              <h3 className="mt-6 font-display text-2xl font-bold leading-tight tracking-[-0.03em]">
                {event.title}
              </h3>
              <p className="mt-2 font-display text-base font-semibold text-accent-on-dark">
                {event.subtitle}
              </p>
              <p className="mt-6 flex items-center gap-2.5 font-mono text-sm tabular-nums text-white/85">
                <Calendar aria-hidden="true" className="h-4 w-4 text-accent-on-dark" />
                <time dateTime={event.isoDate}>{event.date}</time>
              </p>
              {event.partner ? (
                <p className="ke-body-sm mt-2 text-steel-400">
                  In partnership with {event.partner}
                </p>
              ) : null}

              <div className="mt-auto pt-8">
                <Link
                  href="/education#workshops"
                  className="inline-flex items-center gap-2 font-display text-[0.9375rem] font-semibold text-white focus-visible:outline-none after:absolute after:inset-0 after:content-['']"
                >
                  <span className="ke-underline">Workshop details</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          </Reveal>

          {/* Recent collaborations */}
          <Reveal delay={0.12} className="lg:col-span-4">
            <div className="h-full border border-line bg-paper p-6 sm:p-8">
              <h3 className="ke-label text-steel">Recent collaborations</h3>
              <ul className="mt-5">
                {recent.map((item) => (
                  <li key={item.title} className="border-b border-line py-4 first:pt-1 last:border-b-0">
                    <p className="ke-label text-accent-ink">
                      {item.kind}
                      {item.date ? (
                        <span className="text-steel"> · {item.date}</span>
                      ) : null}
                    </p>
                    <p className="mt-2 font-display text-[0.9375rem] font-semibold leading-snug tracking-[-0.015em] text-ink">
                      {item.title}
                    </p>
                    {item.withWhom ? (
                      <p className="ke-body-sm mt-1 text-steel">with {item.withWhom}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
