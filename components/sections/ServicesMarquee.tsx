import { serviceMarqueeItems } from "@/data/services";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/Marquee";

/**
 * Slow index of what happens across both environments.
 *
 * Grounded in --ink rather than saturated blue: this is connective tissue
 * between two heavier sections, and a full-width brand-blue band was the
 * loudest colour on the page spent on the least important content. The accent
 * now survives only in the separators.
 */
export function ServicesMarquee({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "ke-section-connective border-y border-white/10",
        tone === "dark" ? "surface-dark bg-ink text-white" : "bg-mist",
        className,
      )}
    >
      <Marquee
        items={serviceMarqueeItems}
        tone={tone}
        duration={92}
        variant="display"
      />
    </div>
  );
}
