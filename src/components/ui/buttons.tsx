import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Consistent button language: charcoal fill, gold accent, or hairline outline.
 * Uses plain elements (not shadcn Button) so hover states stay editorial.
 */
const base =
  "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap text-[13px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-50";

const sizes = {
  md: "h-12 px-7",
  lg: "h-14 px-9",
  sm: "h-10 px-5 text-[11px]",
} as const;

export function PrimaryButton({
  children,
  href,
  onClick,
  type = "button",
  size = "md",
  className,
  disabled,
  external,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  size?: keyof typeof sizes;
  className?: string;
  disabled?: boolean;
  external?: boolean;
}) {
  const cls = cn(
    base,
    sizes[size],
    "bg-charcoal text-ivory hover:bg-charcoal-soft",
    className
  );
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <ArrowRight
        className="relative z-10 size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
        aria-hidden
      />
    </>
  );
  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {inner}
    </button>
  );
}

export function GhostButton({
  children,
  href,
  onClick,
  size = "md",
  className,
  dark = false,
  external,
  ariaLabel,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  size?: keyof typeof sizes;
  className?: string;
  dark?: boolean;
  external?: boolean;
  ariaLabel?: string;
}) {
  const cls = cn(
    base,
    sizes[size],
    "border",
    dark
      ? "border-ivory/30 text-ivory hover:border-ivory/70 hover:bg-ivory/10"
      : "border-charcoal/20 text-charcoal hover:border-charcoal/60 hover:bg-charcoal/[0.04]",
    className
  );
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <ArrowRight
        className="relative z-10 size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
        aria-hidden
      />
    </>
  );
  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={ariaLabel}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}

export function GoldLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-deep transition-colors hover:text-charcoal",
        className
      )}
    >
      {children}
      <span className="relative block h-px w-8 bg-gold-deep transition-all duration-300 group-hover/link:w-12">
        <span className="absolute inset-0 -top-px h-[3px] -translate-y-1 bg-charcoal opacity-0 transition-opacity group-hover/link:opacity-100" />
      </span>
    </Link>
  );
}
