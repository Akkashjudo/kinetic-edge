import Image from "next/image";
import { storyChapters } from "@/data/story";
import { team } from "@/data/team";
import type { SiteImageKey } from "@/data/images";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealMask } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Photographs paired with each chapter.
 *
 * 2020 is the exception: it is where two people started the practice, so it is
 * given their two portraits rather than a photograph of a building that did not
 * exist yet. The rest carry one frame each, at that photograph's own ratio —
 * several of these are 2:3 phone photographs and a 16:10 frame was throwing
 * away more than half of one of them.
 */
const chapterImages: Record<number, { key: SiteImageKey; ratio: string }> = {
  1: { key: "strengthTraining", ratio: "natural" },
  2: { key: "rehabCentre", ratio: "natural" },
};

/**
 * Brand story. The chapter text is verified and must not be embellished —
 * no athlete numbers, outcomes or claims are attached to any year.
 */
export function StoryTimeline() {
  return (
    <section data-accent="performance" className="ke-section bg-bone">
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
                      ratio="16/9"
                      sizes="(min-width: 1280px) 1280px, 100vw"
                      tone="dark"
                    />
                  </RevealMask>
                </li>
              );
            }

            const media = chapterImages[index];

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

                <div className={flip ? "lg:order-1" : undefined}>
                  {media ? (
                    <RevealMask delay={0.08}>
                      <Figure
                        imageKey={media.key}
                        ratio={media.ratio}
                        fallbackRatio="16/10"
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        tone="dark"
                      />
                    </RevealMask>
                  ) : (
                    <FoundersPair />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/**
 * The 2020 chapter's photograph: the two people the practice started as.
 *
 * Names, roles and portraits all come from `data/team.ts` — nothing is written
 * here — and the two frames are the portraits' own 4:5, so neither face is cut.
 * The offset is what makes it read as a founders' spread rather than a grid of
 * two.
 */
function FoundersPair() {
  const founders = team
    .filter((member) => member.group === "Leadership" && member.image)
    .slice(0, 2);

  if (founders.length < 2) return null;

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
      {founders.map((founder, i) => (
        <figure key={founder.name} className={i === 1 ? "mt-8 sm:mt-12" : undefined}>
          <RevealMask delay={0.08 + i * 0.08}>
            <div className="relative aspect-4/5 overflow-hidden bg-mist">
              <Image
                src={founder.image as string}
                alt={`${founder.name}, ${founder.role} of Kinetic Edge`}
                fill
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="object-cover object-top"
              />
            </div>
          </RevealMask>

          <figcaption className="mt-3.5">
            <p className="font-display text-[0.9375rem] font-bold leading-snug tracking-[-0.02em] text-ink">
              {founder.name}
            </p>
            <p className="ke-body-sm mt-1 text-steel">{founder.role}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
