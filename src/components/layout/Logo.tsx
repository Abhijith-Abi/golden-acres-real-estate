import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  dark?: boolean;
  className?: string;
  compact?: boolean;
  variant?: "default" | "mark" | "full";
}

/**
 * Official Golden Acres Real Estate logo component.
 * Features the official gold monogram emblem (G/A crest with skyline & architectural gable)
 * paired with refined typography or rendered as full brand lockup.
 */
export function Logo({
  dark = false,
  className,
  compact = false,
  variant = "default",
}: LogoProps) {
  if (variant === "full") {
    return (
      <Link
        href="/"
        aria-label="Golden Acres Real Estate — home"
        className={cn(
          "group inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
          className
        )}
      >
        <Image
          src={dark ? "/brand/logo-dark.png" : "/brand/logo-full.png"}
          alt="Golden Acres Real Estate"
          width={280}
          height={212}
          priority
          className="h-auto w-44 md:w-52 transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label="Golden Acres Real Estate — home"
      className={cn(
        "group inline-flex items-center gap-3.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
        className
      )}
    >
      {/* Official Golden Acres Crest Mark */}
      <span className="relative flex shrink-0 items-center justify-center">
        <Image
          src={dark ? "/brand/logo-mark.png" : "/brand/logo-mark-dark.png"}
          alt="Golden Acres emblem"
          width={52}
          height={39}
          priority
          className={cn(
            "h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105",
            dark
              ? "drop-shadow-[0_2px_12px_rgba(201,169,106,0.25)]"
              : "drop-shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
          )}
        />
      </span>

      {variant !== "mark" && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-serif text-[19px] font-medium tracking-[0.03em] transition-colors duration-300",
              dark
                ? "text-ivory group-hover:text-gold-soft"
                : "text-charcoal group-hover:text-gold-deep"
            )}
          >
            Golden Acres
          </span>
          {!compact && (
            <span
              className={cn(
                "mt-1 text-[9px] font-semibold uppercase tracking-[0.38em] transition-colors duration-300",
                dark
                  ? "text-ivory/60 group-hover:text-ivory/80"
                  : "text-muted-foreground group-hover:text-charcoal"
              )}
            >
              Real Estate
            </span>
          )}
        </span>
      )}
    </Link>
  );
}
