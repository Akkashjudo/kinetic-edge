import Link from "next/link";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({
  items,
  tone = "dark",
  className,
}: {
  items: Crumb[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="ke-label flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "ke-tap transition-colors",
                    tone === "dark"
                      ? "text-steel-400 hover:text-white"
                      : "text-steel hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={tone === "dark" ? "text-white" : "text-ink"}
                >
                  {item.label}
                </span>
              )}

              {!isLast ? (
                <span
                  aria-hidden="true"
                  className={tone === "dark" ? "text-white/25" : "text-line"}
                >
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
