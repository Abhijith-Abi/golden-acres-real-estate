import { Reveal } from "@/components/ui/motion-primitives";
import { cn } from "@/lib/utils";
import Link from "next/link";

/** Consistent editorial page header for inner routes. */
export function PageHero({
  eyebrow,
  title,
  lede,
  breadcrumb,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  breadcrumb?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative bg-charcoal pb-20 pt-36 text-ivory sm:pb-24 lg:pb-28 lg:pt-44",
        className
      )}
    >
      {/* Subtle architectural texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(248,245,239,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(248,245,239,0.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="container-site relative">
        {breadcrumb && (
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6 text-[11px] uppercase tracking-[0.24em] text-ivory/45">
              <Link href="/" className="transition-colors hover:text-gold-soft">Home</Link>
              <span aria-hidden className="mx-2.5 text-ivory/25">/</span>
              <span className="text-gold-soft">{breadcrumb}</span>
            </nav>
          </Reveal>
        )}
        <Reveal>
          <p className="eyebrow text-gold-soft">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-4 max-w-3xl text-balance font-serif text-4xl font-light leading-[1.08] tracking-[-0.01em] sm:text-6xl">
            {title}
          </h1>
        </Reveal>
        {lede && (
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/65">
              {lede}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
