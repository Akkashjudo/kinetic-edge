import { Check, Wifi } from "lucide-react";
import { programmes } from "@/data/programmes";
import { primaryCta } from "@/data/site";
import type { Programme } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * The five programmes.
 *
 * Presented as cards plus a specification table, because the thing a visitor
 * actually needs is to tell them apart — frequency, ratio and individualisation
 * are what differ, so those are the columns.
 *
 * A spec that was not stated for a programme renders as an em dash. It is never
 * filled with a plausible-looking value, and no prices appear anywhere because
 * none have been supplied.
 */
const SPEC_ROWS = [
  { key: "frequency", label: "Frequency" },
  { key: "duration", label: "Session length" },
  { key: "ratio", label: "Format" },
  { key: "individualisation", label: "Individualisation" },
] as const;

export function ProgrammeGrid({
  index = "05",
  items = programmes,
  title = "Five Ways to Work With Us",
  lead = "The format changes with the athlete, the goal and where they train. The process behind it does not.",
  showTable = true,
  surface = "bone",
}: {
  index?: string;
  /** A subset — e.g. only the remote programmes on the Distance Coaching page. */
  items?: Programme[];
  title?: string;
  lead?: string;
  showTable?: boolean;
  surface?: "paper" | "bone";
}) {
  return (
    <section
      data-accent="performance"
      className={cn("ke-section", surface === "paper" ? "bg-paper" : "bg-bone")}
    >
      <Container>
        <Reveal>
          <SectionHeading
            index={index}
            label="Programmes"
            title={title}
            lead={lead}
            aside={
              <CTAButton href={primaryCta.href} variant="outline">
                Find the right programme
              </CTAButton>
            }
          />
        </Reveal>

        {/* Cards */}
        <ul
          className={cn(
            "mt-14 grid gap-px border border-line bg-line lg:mt-18",
            items.length === 2 ? "md:grid-cols-2" : "lg:grid-cols-3",
          )}
        >
          {items.map((programme, i) => (
            <Reveal
              key={programme.slug}
              as="li"
              delay={Math.min(i, 4) * 0.06}
              className="flex"
            >
              <article
                data-accent={programme.accent}
                className="group relative flex flex-1 flex-col bg-paper p-7 transition-[background-color,box-shadow,transform] duration-300 ease-[var(--ease-ke)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_40px_-28px_rgba(10,22,38,0.45)] md:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-ke)] group-hover:scale-x-100"
                />

                <div className="flex items-start justify-between gap-4">
                  <p className="ke-label text-accent-ink">{programme.code}</p>
                  {programme.remote ? (
                    <p className="ke-label flex items-center gap-2 text-steel">
                      <Wifi aria-hidden="true" className="h-3.5 w-3.5" />
                      Remote
                    </p>
                  ) : null}
                </div>

                <h3 className="ke-h3 mt-6 max-w-[16ch] text-ink">
                  {programme.title}
                </h3>
                <p className="ke-label mt-3 text-steel">{programme.audience}</p>
                <p className="ke-body mt-4 text-steel">{programme.description}</p>

                <ul className="mt-7 space-y-0 border-t border-line pt-2">
                  {programme.inclusions.map((inclusion) => (
                    <li
                      key={inclusion}
                      className="ke-body-sm flex items-start gap-3 border-b border-line/70 py-3 text-ink/85 last:border-b-0"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-ink"
                      />
                      {inclusion}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* Specification comparison */}
        {showTable ? (
          <Reveal delay={0.08}>
            <div className="mt-14 lg:mt-18">
              <h3 className="ke-label mb-6 text-steel">At a glance</h3>

              {/* `relative` makes this the containing block for the sr-only
                  "Not specified" labels. They are absolutely positioned, and
                  without it they escaped the scroll container and pushed the
                  whole page 86px wider than a 360px phone. */}
              <div className="relative overflow-x-auto border border-line bg-paper">
                <table className="w-full min-w-[46rem] border-collapse text-left">
                  <caption className="sr-only">
                    Programme specifications compared. A dash means the
                    specification was not stated for that programme.
                  </caption>
                  <thead>
                    <tr className="border-b border-line">
                      <th
                        scope="col"
                        className="ke-label bg-bone px-5 py-4 font-medium text-steel"
                      >
                        Programme
                      </th>
                      {SPEC_ROWS.map((row) => (
                        <th
                          key={row.key}
                          scope="col"
                          className="ke-label bg-bone px-5 py-4 font-medium text-steel"
                        >
                          {row.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((programme) => (
                      <tr
                        key={programme.slug}
                        className="border-b border-line last:border-b-0"
                      >
                        <th
                          scope="row"
                          className="px-5 py-4 align-top font-display text-[0.9375rem] font-bold tracking-[-0.02em] text-ink"
                        >
                          <span className="ke-label mb-1.5 block text-steel">
                            {programme.code}
                          </span>
                          {programme.title}
                        </th>
                        {SPEC_ROWS.map((row) => {
                          const value = programme.specs[row.key];
                          return (
                            <td
                              key={row.key}
                              className={cn(
                                "ke-body-sm px-5 py-4 align-top",
                                value ? "text-ink/85" : "text-steel-400",
                              )}
                            >
                              {value ?? (
                                <>
                                  <span aria-hidden="true">—</span>
                                  <span className="sr-only">Not specified</span>
                                </>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
