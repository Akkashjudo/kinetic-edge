import Image from "next/image";
import { blurFor } from "@/data/blur";
import type { TeamMember } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Shared by every 4:5 portrait on the site — the team grid here and the
 * founders' pair in the 2020 story chapter.
 *
 * It is one constant on purpose. The two render at slightly different widths,
 * and when they declared `16vw` and `22vw` separately a 1440px /about page
 * downloaded Deepak twice and Priyanka twice, at 256w and 640w. Declaring the
 * same hint puts both on one candidate that is sharp in the larger slot.
 */
export const PORTRAIT_SIZES =
  "(min-width: 1280px) 20vw, (min-width: 640px) 30vw, 45vw";

/** Initials from a verified name — never a generated or stock portrait. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Name, role, and — only where the client content states one — a short line of
 * expertise. No biographies, credentials or years of experience; none are
 * verified.
 */
export function TeamCard({
  member,
  className,
  headingLevel = "h3",
}: {
  member: TeamMember;
  className?: string;
  /** h4 where the card sits under a department heading. */
  headingLevel?: "h3" | "h4";
}) {
  const Name = headingLevel;

  return (
    <article className={cn("group", className)}>
      <div className="relative aspect-4/5 overflow-hidden bg-mist">
        {member.image ? (
          <Image
            src={member.image}
            alt={`${member.name}, ${member.role}, Kinetic Edge`}
            fill
            sizes={PORTRAIT_SIZES}
            placeholder={blurFor(member.image) ? "blur" : "empty"}
            blurDataURL={blurFor(member.image)}
            className="object-cover object-top transition-transform duration-700 ease-[var(--ease-ke)] group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-mist"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-63deg, rgba(10,22,38,0.04) 0px, rgba(10,22,38,0.04) 1px, transparent 1px, transparent 13px)",
              }}
            />
            <span className="relative font-display text-4xl font-bold tracking-[-0.04em] text-ink/15 md:text-5xl">
              {initials(member.name)}
            </span>
          </div>
        )}

        {/* Accent rule on hover */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-ke)] group-hover:scale-x-100"
        />
      </div>

      <Name className="mt-4 font-display text-[1.0625rem] font-bold leading-snug tracking-[-0.022em] text-ink md:text-[1.125rem]">
        {member.name}
      </Name>
      {/* Roles are long. Set in mono at a smaller size, they read as metadata
          rather than as a headline competing with the name. */}
      <p className="mt-2 font-mono text-[0.6875rem] uppercase leading-[1.5] tracking-[0.1em] text-accent-ink md:text-[0.75rem]">
        {member.role}
      </p>
      {member.expertise ? (
        <p className="ke-body-sm mt-2 text-steel">{member.expertise}</p>
      ) : null}
    </article>
  );
}
