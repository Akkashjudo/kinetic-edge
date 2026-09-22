import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "light" | "outlineLight" | "quiet";
type Size = "md" | "lg";

/* `active:scale-[0.98]` is the site's press state — every button acknowledges
   the tap, which is most of what makes an interface feel responsive on touch. */
const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-[2px] font-display font-semibold tracking-[-0.01em] transition-all duration-200 ease-[var(--ease-ke)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  /** Filled in the text-safe accent so the white label clears AA contrast. */
  primary:
    "bg-accent-ink text-white shadow-[0_1px_0_0_rgba(10,22,38,0.08)] hover:bg-accent-ink-hover",
  /** Ink outline for light surfaces. */
  outline:
    "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
  /** Solid light button for dark surfaces. */
  light: "bg-white text-ink hover:bg-mist",
  /** Outline for dark surfaces. */
  outlineLight:
    "border border-white/25 text-white hover:border-white hover:bg-white hover:text-ink",
  /** Text-only, used inside cards and panels. */
  quiet:
    "text-ink underline-offset-4 hover:text-accent-ink focus-visible:underline px-0",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-8 text-base",
};

interface CTAButtonProps {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Shows the sliding arrow. Defaults on for primary/light buttons. */
  arrow?: boolean;
  className?: string;
  /** Set for links leaving the site — adds rel and target. */
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow,
  className,
  external,
  type = "button",
  disabled,
  ...rest
}: CTAButtonProps) {
  const showArrow = arrow ?? (variant === "primary" || variant === "light");

  const classes = cn(
    base,
    variants[variant],
    variant === "quiet" ? "h-auto gap-2 text-[0.9375rem]" : sizes[size],
    className,
  );

  // inline-flex, not a bare span: Tailwind's preflight makes <svg> a block,
  // which pushed a leading icon (WhatsApp, phone) onto its own line above
  // the label.
  const content = (
    <>
      <span className="inline-flex items-center gap-2.5">{children}</span>
      {showArrow ? (
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 shrink-0 transition-transform duration-200 ease-[var(--ease-ke)] group-hover:translate-x-1"
        />
      ) : null}
    </>
  );

  if (!href) {
    return (
      <button type={type} className={classes} disabled={disabled} {...rest}>
        {content}
      </button>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
