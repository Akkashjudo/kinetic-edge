import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "./SectionLabel";

interface SectionHeadingProps {
  index?: string;
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  size?: "h1" | "h2";
  className?: string;
  /** Rendered to the right of the heading on large screens. */
  aside?: ReactNode;
}

export function SectionHeading({
  index,
  label,
  title,
  lead,
  tone = "light",
  align = "left",
  as: Tag = "h2",
  size = "h2",
  className,
  aside,
}: SectionHeadingProps) {
  const heading = (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center")}>
      {label ? (
        <SectionLabel
          index={index}
          tone={tone}
          className={cn("mb-5", align === "center" && "justify-center")}
        >
          {label}
        </SectionLabel>
      ) : null}

      <Tag
        className={cn(
          size === "h1" ? "ke-h1" : "ke-h2",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Tag>

      {lead ? (
        <p
          className={cn(
            "ke-lead mt-5 max-w-2xl",
            align === "center" && "mx-auto",
            tone === "dark" && "text-steel-400",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );

  if (!aside) {
    return <div className={className}>{heading}</div>;
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16",
        className,
      )}
    >
      {heading}
      <div className="shrink-0">{aside}</div>
    </div>
  );
}
