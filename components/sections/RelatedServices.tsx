import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";

/**
 * Continues the journey at the foot of a service page.
 *
 * Ordered by relevance rather than by array position: from a rehabilitation
 * page the other rehabilitation services lead, and from a performance page the
 * other performance services do. Showing the same three on all six pages made
 * the block read as boilerplate.
 */
export function RelatedServices({ currentSlug }: { currentSlug: string }) {
  const current = services.find((service) => service.slug === currentSlug);

  const related = services
    .filter((service) => service.slug !== currentSlug)
    .sort((a, b) => {
      const score = (service: typeof a) =>
        current && service.accent === current.accent ? 0 : 1;
      return score(a) - score(b);
    })
    .slice(0, 3);

  return (
    <section data-accent="performance" className="ke-section-tight bg-bone">
      <Container>
        <Reveal>
          <SectionLabel className="mb-8">Continue</SectionLabel>
        </Reveal>

        <ul className="grid gap-px border border-line bg-line lg:grid-cols-3">
          {related.map((service, index) => (
            <Reveal key={service.slug} as="li" delay={index * 0.06} className="flex">
              <ServiceCard
                index={service.label.split(" ")[0]}
                title={service.title}
                summary={service.summary}
                href={service.href}
                accent={service.accent}
                className="flex-1"
              />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
