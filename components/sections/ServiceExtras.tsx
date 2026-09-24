import { onlinePathway, rehabPathway } from "@/data/method";
import { programmes } from "@/data/programmes";
import { FeatureSplit } from "./FeatureSplit";
import { ProcessSteps } from "./ProcessSteps";
import { MethodProcess } from "./MethodProcess";
import { ProgrammeGrid } from "./ProgrammeGrid";

/**
 * Per-service sections. Each service page shares a common shell, then adds the
 * content that is genuinely specific to it rather than repeating one grid four
 * times.
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
          <MethodProcess index="03" variant="compact" tone="dark" />
        </>
      );

    case "athlete-performance":
      return (
        <>
          {/* No photograph of testing has been supplied, so this block runs
              without one rather than showing a placeholder plate. */}
          <FeatureSplit
            index="02"
            label="Performance testing"
            title="Objective data, not impressions."
            body="Force production and jump characteristics are measured rather than estimated. The numbers are not the point on their own — they are the reference the next block of training is written against, and the reference it is judged by."
            points={[
              "Force production measured, not estimated",
              "Jump characteristics beyond jump height",
              "Compared against the athlete's own baseline",
              "Re-tested on a schedule",
            ]}
            surface="bone"
          />
          <FeatureSplit
            imageKey="coachTrack"
            index="03"
            label="Developing athletes"
            title="Young athletes are not small adults."
            body="Long-term athletic development treats training age and stage of development as the starting point. The priority is building broad athletic qualities and good movement first, so that heavier and more specific work has something to sit on later."
            points={[
              "Training age considered before training load",
              "Broad athletic base before specialisation",
              "Movement quality coached, not assumed",
              "Progression planned across seasons",
            ]}
            flip
          />
          <MethodProcess index="04" variant="compact" tone="dark" />
        </>
      );

    case "physiotherapy-rehabilitation":
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
            imageKey="strengthTraining"
            index="03"
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
          />
        </>
      );

    case "distance-coaching":
      return (
        <>
          <ProcessSteps
            steps={onlinePathway}
            index="02"
            label="How distance coaching runs"
            title={
              <>
                The same process,
                <br />
                delivered remotely.
              </>
            }
            lead="Consultation, prescription, monitoring, feedback and progression — the process does not change because you are not in the building."
            accent="performance"
          />
          <ProgrammeGrid
            index="03"
            items={programmes.filter((programme) => programme.remote)}
            title="Two ways to be coached remotely."
            lead="Coached one-to-one sessions online each week, or a written programme with a weekly review call and WhatsApp support."
            showTable={false}
            surface="paper"
          />
        </>
      );

    default:
      return <MethodProcess index="02" variant="compact" tone="dark" />;
  }
}
