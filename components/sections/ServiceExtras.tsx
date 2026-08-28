import { onlinePathway, rehabPathway } from "@/data/method";
import { partners } from "@/data/partners";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureSplit } from "./FeatureSplit";
import { ProcessSteps } from "./ProcessSteps";
import { MethodProcess } from "./MethodProcess";

/**
 * Per-service sections. Each service page shares a common shell, then adds the
 * content that is genuinely specific to it rather than repeating the same grid
 * six times.
 */
export function ServiceExtras({ slug }: { slug: string }) {
  switch (slug) {
    case "strength-conditioning":
      return (
        <>
          <FeatureSplit
            imageKey="sprinting"
            index="02"
            label="Sports-specific conditioning"
            title="Conditioned for the sport, not for the treadmill."
            body="Conditioning is built from the work-to-rest patterns, distances and intensities of the sport itself. A badminton player, a sprinter and a footballer do not need the same engine, and they are not trained as though they do."
            points={[
              "Demands of the sport analysed first",
              "Position and event specific",
              "Planned around the competitive calendar",
              "Progressed and re-tested, not repeated",
            ]}
            surface="bone"
          />
          <MethodProcess index="03" variant="compact" />
        </>
      );

    case "athlete-development":
      return (
        <>
          <FeatureSplit
            imageKey="athleteDevelopment"
            index="02"
            label="Youth · Long-term athletic development"
            title="Young athletes are not small adults."
            body="Long-term athletic development treats training age and stage of development as the starting point. The priority is building broad athletic qualities and good movement first, so that heavier and more specific work has something to sit on later."
            points={[
              "Training age considered before training load",
              "Broad athletic base before specialisation",
              "Movement quality coached, not assumed",
              "Progression planned across seasons",
            ]}
            flip
            surface="bone"
          />
          <MethodProcess index="03" variant="compact" />
        </>
      );

    case "performance-testing":
      return (
        <>
          <FeatureSplit
            imageKey="forcePlate"
            index="02"
            label="Technology"
            title="Objective data, not impressions."
            body={`Testing at Kinetic Edge uses ${partners[0].name} technology to measure force production and jump characteristics. Numbers on their own are not the point — they are the reference the next block of training is written against, and the reference it is judged by.`}
            points={[
              "Force production measured, not estimated",
              "Jump characteristics beyond jump height",
              "Compared against the athlete's own baseline",
              "Re-tested on a schedule",
            ]}
            surface="bone"
          />

          <section data-accent="performance" className="ke-section-tight bg-paper">
            <Container>
              <Reveal>
                <SectionHeading
                  index="03"
                  label="Where testing is used"
                  title="Testing runs in both environments."
                  lead="The same measurements that set a training baseline are used to judge readiness during rehabilitation — which is what allows return-to-sport decisions to be made on criteria rather than on the calendar."
                />
              </Reveal>
            </Container>
          </section>
        </>
      );

    case "sports-physiotherapy":
      return (
        <>
          <FeatureSplit
            imageKey="mobility"
            index="02"
            label="Alongside the performance floor"
            title="Treatment that does not stop at the plinth."
            body="Because the clinical space and the performance floor belong to the same system, rehabilitation can be loaded properly and progressed under supervision. Treatment and training are planned against each other rather than in separate rooms."
            points={[
              "Assessment with the sport in view",
              "Loaded rehabilitation, supervised",
              "Prevention work carried forward",
              "Continuity between clinic and floor",
            ]}
            accent="rehab"
            flip
            surface="bone"
          />
          <MethodProcess index="03" accent="rehab" variant="compact" />
        </>
      );

    case "sports-rehabilitation":
      return (
        <>
          <ProcessSteps
            steps={rehabPathway}
            index="02"
            label="The rehabilitation pathway"
            title={
              <>
                Six stages,
                <br />
                each one earned.
              </>
            }
            lead="Progression is decided by criteria being met, not by weeks passing. Every stage has to hold up before the next one starts."
            accent="rehab"
          />

          <FeatureSplit
            imageKey="returnToSport"
            index="03"
            label="Return to sport"
            title="The last stage is the sport itself."
            body="Returning to training is not the same as returning to competition. The final stage rebuilds the specific qualities the sport demands and reintroduces them at competitive intensity, with prevention work continuing after the athlete is back."
            points={[
              "Criteria-based progression",
              "Sport-specific reconditioning",
              "Reintegration into full training",
              "Prevention work carried forward",
            ]}
            accent="rehab"
          />
        </>
      );

    case "online-coaching":
      return (
        <ProcessSteps
          steps={onlinePathway}
          index="02"
          label="How online coaching runs"
          title={
            <>
              The same process,
              <br />
              delivered remotely.
            </>
          }
          lead="Consultation, prescription, monitoring, feedback and progression — the process does not change because the athlete is not in the building."
          accent="performance"
        />
      );

    default:
      return <MethodProcess index="02" variant="compact" />;
  }
}
