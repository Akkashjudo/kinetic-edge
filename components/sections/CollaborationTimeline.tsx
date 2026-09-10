import { collaborationYears } from "@/data/collaborations";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Collaborations & events, 2023–2025.
 *
 * A record of camps, workshops, assessments and representations actually
 * delivered — the closest thing this site has to third-party credibility while
 * athlete results are still unavailable.
 *
 * No attendance figures, outcomes or feedback appear, because none were
 * supplied. Each entry is exactly what the source document states.
 */
const KIND_TONE: Record<string, string> = {
  Camp: "text-accent-ink",
  Workshop: "text-steel",
  Assessment: "text-accent-ink",
  Representation: "text-steel",
};

export function CollaborationTimeline({ index = "09" }: { index?: string }) {
  return (
    <section data-accent="performance" className="ke-section bg-paper">
      <Container>
        <Reveal>
          <SectionHeading
            index={index}
            label="Collaborations"
            title="Where the work has taken us."
            lead="Camps, workshops and assessments delivered with schools, networks and institutions since 2023."
          />
        </Reveal>

        <div className="mt-14 lg:mt-18">
          {collaborationYears.map((band, bandIndex) => (
            <Reveal key={band.year} delay={bandIndex * 0.06}>
              <div className="grid gap-6 border-t border-line py-8 lg:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] lg:gap-16 lg:py-10">
                <div>
                  <p className="font-display text-3xl font-extrabold tracking-[-0.04em] text-accent-ink lg:sticky lg:top-28 lg:text-4xl">
                    {band.year}
                  </p>
                </div>

                <ul className="space-y-0">
                  {band.events.map((event) => (
                    <li
                      key={event.title}
                      className="group flex flex-col gap-2 border-b border-line/70 py-4 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-6"
                    >
                      <p
                        className={cn(
                          "ke-label w-32 shrink-0",
                          KIND_TONE[event.kind] ?? "text-steel",
                        )}
                      >
                        {event.kind}
                      </p>

                      <div className="min-w-0 flex-1">
                        <p className="font-display text-[0.9375rem] font-semibold leading-snug tracking-[-0.02em] text-ink md:text-base">
                          {event.title}
                        </p>
                        {event.withWhom ? (
                          <p className="ke-body-sm mt-1 text-steel">
                            with {event.withWhom}
                          </p>
                        ) : null}
                      </div>

                      {event.date ? (
                        <p className="ke-body-sm shrink-0 font-mono text-[0.75rem] tabular-nums text-steel">
                          {event.date}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
