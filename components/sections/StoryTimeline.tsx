import { storyChapters } from "@/data/story";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealMask } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Photographs paired with each chapter, in order. */
const chapterImages = [
  "founder",
  "strengthTraining",
  "physiotherapy",
  "facilityInterior",
] as const;

/**
 * Brand story. The chapter text is verified and must not be embellished —
 * no athlete numbers, outcomes or claims are attached to any year.
 */
export function StoryTimeline() {
  return (
    <section data-accent="performance" className="ke-section bg-paper">
      <Container>
        <Reveal>
          <SectionHeading
            index="02"
            label="Story"
            title="How Kinetic Edge was built."
            lead="From one coach without a facility to two connected environments in Chennai."
          />
        </Reveal>

        <ol className="mt-14 lg:mt-20">
          {storyChapters.map((chapter, index) => {
            const flip = index % 2 === 1;
            // The last chapter is where the story arrives. Breaking the
            // alternating rhythm is what makes it read as a conclusion rather
            // than as a fourth row.
            const isFinal = index === storyChapters.length - 1;

            if (isFinal) {
              return (
                <li
                  key={chapter.year}
                  className="border-t border-line pt-10 lg:pt-16"
                >
                  <Reveal>
                    <div className="flex items-baseline gap-5">
                      <span className="font-display text-5xl font-extrabold tracking-[-0.04em] text-accent-ink sm:text-6xl lg:text-7xl">
                        {chapter.year}
                      </span>
                      <span aria-hidden="true" className="h-px flex-1 bg-line" />
                      <span className="ke-label text-steel">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-end lg:gap-16">
                      <h3 className="ke-h2 max-w-[14ch] text-ink">
                        {chapter.title}
                      </h3>
                      <p className="ke-lead max-w-xl">{chapter.body}</p>
                    </div>
                  </Reveal>

                  <RevealMask delay={0.08} className="mt-10 lg:mt-14">
                    <Figure
                      imageKey="facilityInterior"
                      ratio="21/9"
                      sizes="(min-width: 1280px) 1280px, 100vw"
                      tone="dark"
                    />
                  </RevealMask>
                </li>
              );
            }

            return (
              <li
                key={chapter.year}
                className="grid items-center gap-8 border-t border-line py-10 lg:grid-cols-2 lg:gap-20 lg:py-16"
              >
                <Reveal className={flip ? "lg:order-2" : undefined}>
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-4xl font-extrabold tracking-[-0.04em] text-accent-ink sm:text-5xl lg:text-6xl">
                      {chapter.year}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-line"
                    />
                    <span className="ke-label text-steel">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="ke-h3 mt-7 text-ink">{chapter.title}</h3>
                  <p className="mt-4 max-w-md ke-body text-steel">
                    {chapter.body}
                  </p>
                </Reveal>

                <RevealMask
                  delay={0.08}
                  className={flip ? "lg:order-1" : undefined}
                >
                  <Figure
                    imageKey={chapterImages[index] ?? "facility"}
                    ratio="16/10"
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    tone="dark"
                  />
                </RevealMask>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
