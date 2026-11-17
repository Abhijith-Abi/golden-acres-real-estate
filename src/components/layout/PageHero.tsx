import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/motion-primitives";
import { cn } from "@/lib/utils";

const DEFAULT_PAGE_HERO_BG =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  breadcrumb?: string;
  backgroundImage?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Editorial cinematic page header for inner routes.
 * Features a curated architectural photography backdrop, multi-tier luxury
 * dark vignette overlays, subtle grid texture, and high-legibility typography.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  breadcrumb,
  backgroundImage = DEFAULT_PAGE_HERO_BG,
  className,
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-charcoal pb-20 pt-36 text-ivory sm:pb-24 lg:pb-28 lg:pt-44 border-b border-ivory/10",
        className
      )}
    >
      {/* 1. Cinematic Architectural Backdrop Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
        />

        {/* Multi-layered luxury lighting overlays */}
        {/* Vertical gradient: grounds the top navbar and transitions cleanly into page content */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/95 via-charcoal/80 to-charcoal/95" />

        {/* Horizontal gradient: ensures pristine text contrast on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/50 to-transparent" />

        {/* Subtle warm golden ambient spotlight */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.08)_0%,_transparent_70%)]" />

        {/* Subtle architectural grid lines texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(248,245,239,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(248,245,239,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* 2. Content */}
      <div className="container-site relative z-10">
        {breadcrumb && (
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center text-[11px] font-medium uppercase tracking-[0.24em] text-ivory/50"
            >
              <Link href="/" className="transition-colors hover:text-gold-soft">
                Home
              </Link>
              <span aria-hidden className="mx-2.5 text-ivory/30">
                /
              </span>
              <span className="text-gold-soft font-semibold">{breadcrumb}</span>
            </nav>
          </Reveal>
        )}

        <Reveal>
          <p className="eyebrow text-gold font-medium tracking-[0.34em]">
            {eyebrow}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-4 max-w-3xl text-balance font-serif text-4xl font-light leading-[1.08] tracking-[-0.01em] sm:text-5xl lg:text-6xl text-ivory">
            {title}
          </h1>
        </Reveal>

        {lede && (
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/75 sm:text-[17px]">
              {lede}
            </p>
          </Reveal>
        )}

        {children}
      </div>
    </section>
  );
}
