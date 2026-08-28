import { cn } from "@/lib/utils";

/**
 * Numbered section metadata — part of the Kinetic Edge visual language.
 *
 *   01 / PERFORMANCE     02 / REHABILITATION     03 / METHOD
 *
 * The index is set in the section accent; the label sits in muted steel.
 */
export function SectionLabel({
  index,
  children,
  tone = "light",
  className,
}: {
  index?: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p className={cn("ke-label flex items-center gap-2", className)}>
      {index ? (
        <>
          <span className={tone === "dark" ? "text-accent" : "text-accent-ink"}>
            {index}
          </span>
          <span
            aria-hidden="true"
            className={tone === "dark" ? "text-white/25" : "text-line"}
          >
            /
          </span>
        </>
      ) : (
        <span
          aria-hidden="true"
          className="mr-1 inline-block h-1.5 w-1.5 shrink-0 bg-accent"
        />
      )}
      <span className={tone === "dark" ? "text-steel-400" : "text-steel"}>
        {children}
      </span>
    </p>
  );
}
