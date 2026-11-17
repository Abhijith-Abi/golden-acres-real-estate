import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Typographic logo lockup — a serif "GA" monogram over "GOLDEN ACRES · REAL ESTATES".
 * When the client supplies the official logo, replace the monogram block.
 */
export function Logo({
  dark = false,
  className,
  compact = false,
}: {
  dark?: boolean;
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Golden Acres Real Estates — home"
      className={cn(
        "group inline-flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "flex size-10 items-center justify-center border font-serif text-base font-medium tracking-tight transition-colors duration-300",
          dark
            ? "border-ivory/40 text-ivory group-hover:border-gold group-hover:text-gold-soft"
            : "border-charcoal/30 text-charcoal group-hover:border-gold-deep group-hover:text-gold-deep"
        )}
      >
        GA
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-lg font-medium tracking-[0.02em]",
            dark ? "text-ivory" : "text-charcoal"
          )}
        >
          Golden Acres
        </span>
        {!compact && (
          <span
            className={cn(
              "mt-1 text-[9px] font-semibold uppercase tracking-[0.42em]",
              dark ? "text-ivory/60" : "text-muted-foreground"
            )}
          >
            Real Estates
          </span>
        )}
      </span>
    </Link>
  );
}
