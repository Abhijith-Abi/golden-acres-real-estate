import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/motion-primitives";

/** Editorial section heading: eyebrow label + serif headline + optional lede. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p
        className={cn(
          "eyebrow",
          align === "center" && "justify-center",
          dark && "text-gold-soft"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 text-balance font-serif text-4xl font-light leading-[1.08] tracking-[-0.01em] sm:text-5xl",
          dark ? "text-ivory" : "text-charcoal"
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed",
            dark ? "text-ivory/65" : "text-muted-foreground"
          )}
        >
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}
