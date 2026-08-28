import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Accent } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  index: string;
  title: string;
  summary: string;
  href: string;
  accent: Accent;
  className?: string;
}

/**
 * Editorial service tile: a numbered entry on a hairline grid rather than a
 * floating rounded card.
 */
export function ServiceCard({
  index,
  title,
  summary,
  href,
  accent,
  className,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      data-accent={accent}
      className={cn(
        "group relative flex flex-col justify-between gap-10 bg-paper p-7 transition-[background-color,box-shadow,transform] duration-300 ease-[var(--ease-ke)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_40px_-28px_rgba(10,22,38,0.45)] md:p-9",
        className,
      )}
    >
      {/* Accent rule that draws in on hover */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-ke)] group-hover:scale-x-100"
      />

      <div>
        <div className="mb-6 flex items-center justify-between">
          <span className="ke-label text-steel">{index}</span>
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 text-steel transition-all duration-300 ease-[var(--ease-ke)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink"
          />
        </div>

        <h3 className="ke-h3 text-ink transition-colors group-hover:text-accent-ink">
          {title}
        </h3>

        <p className="mt-3 max-w-sm ke-body text-steel">
          {summary}
        </p>
      </div>
    </Link>
  );
}
