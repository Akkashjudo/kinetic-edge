import type { Accent, FaqItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FaqSection({
  items,
  index = "10",
  label = "FAQ",
  title = "Questions, answered.",
  lead,
  accent = "performance",
  surface = "bone",
}: {
  items: FaqItem[];
  index?: string;
  label?: string;
  title?: React.ReactNode;
  lead?: string;
  accent?: Accent;
  surface?: "bone" | "paper";
}) {
  return (
    <section
      data-accent={accent}
      className={cn("ke-section", surface === "bone" ? "bg-bone" : "bg-paper")}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <SectionHeading
              index={index}
              label={label}
              title={title}
              lead={lead}
              className="lg:sticky lg:top-28"
            />
          </Reveal>

          <Reveal delay={0.06}>
            <FAQAccordion items={items} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
