import { Calendar, Clock, MapPin, User } from "lucide-react";
import { featuredEvent } from "@/data/education";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealMask } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * KE Education.
 *
 * The workshop below has already taken place. It is labelled PAST WORKSHOP and
 * carries no registration, ticket link or capacity — and no upcoming event is
 * fabricated to fill the space.
 */
export function EducationFeature({
  index = "07",
  showHeading = true,
}: {
  index?: string;
  showHeading?: boolean;
}) {
  const event = featuredEvent;
  // Without the section heading above it, the event title is the section's own
  // heading — keeps the document outline free of skipped levels.
  const EventTitle = showHeading ? "h3" : "h2";
  const TopicsTitle = showHeading ? "h4" : "h3";

  // Date and status lead the record; the rest is supporting detail.
  const details = [
    { icon: Clock, label: "Time", value: event.time },
    { icon: User, label: "Instructor", value: event.instructor },
    { icon: MapPin, label: "Venue", value: event.venue },
  ];

  return (
    <section data-accent="performance" className="ke-section bg-paper">
      <Container>
        {showHeading ? (
          <Reveal>
            <SectionHeading
              index={index}
              label="KE Education"
              title="From practice to education."
              lead="What is used on the floor is also taught — to coaches, clinicians and students working in sport."
              aside={
                <CTAButton href="/education" variant="outline">
                  KE Education
                </CTAButton>
              }
              className="mb-14 lg:mb-18"
            />
          </Reveal>
        ) : null}

        <article className="border border-line">
          {/* Record header — status and date carry first, as they would on a
              filed archive entry. Past tense throughout; no registration. */}
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line bg-ink px-5 py-4 text-white md:px-8">
              <p className="ke-label flex items-center gap-2.5">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-steel-400" />
                Past Workshop
              </p>
              <p className="flex items-center gap-2.5 font-mono text-sm tabular-nums tracking-tight text-white md:text-base">
                <Calendar className="h-4 w-4 text-ke-blue" aria-hidden="true" />
                <time dateTime={event.isoDate}>{event.date}</time>
              </p>
            </div>
          </Reveal>

          <div className="grid gap-px bg-line lg:grid-cols-2">
          <RevealMask className="relative bg-paper">
            <Figure
              imageKey="workshop"
              ratio="4/3"
              sizes="(min-width: 1024px) 50vw, 100vw"
              tone="dark"
              className="h-full"
            />
          </RevealMask>

          <Reveal className="flex flex-col bg-paper p-7 md:p-10 lg:p-12">
            <div>
              <EventTitle className="ke-h3 max-w-[20ch] text-ink">
                {event.title}
              </EventTitle>
              <p className="mt-3 font-display text-lg font-semibold tracking-[-0.02em] text-accent-ink">
                {event.subtitle}
              </p>

              {event.partner ? (
                <p className="mt-5 inline-flex items-center gap-2 border border-line px-3 py-2 text-[0.8125rem] text-steel">
                  <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
                  In partnership with{" "}
                  <span className="font-medium text-ink">{event.partner}</span>
                </p>
              ) : null}

              <dl className="mt-8 grid gap-x-8 gap-y-5 border-t border-line pt-7 sm:grid-cols-3">
                {details.map((detail) => (
                  <div key={detail.label} className="flex gap-3">
                    <detail.icon
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="ke-label mb-1.5 text-steel">
                        {detail.label}
                      </dt>
                      <dd className="ke-body-sm leading-relaxed text-ink">
                        {detail.value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-8 border-t border-line pt-7">
                <TopicsTitle className="ke-label mb-4 text-steel">
                  Topics covered
                </TopicsTitle>
                <ul className="flex flex-wrap gap-2">
                  {event.topics.map((topic, topicIndex) => (
                    <Reveal
                      key={topic}
                      as="li"
                      y={10}
                      delay={Math.min(topicIndex, 5) * 0.04}
                      className="border border-line px-3 py-1.5 text-[0.8125rem] text-ink/80"
                    >
                      {topic}
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          </div>
        </article>
      </Container>
    </section>
  );
}
