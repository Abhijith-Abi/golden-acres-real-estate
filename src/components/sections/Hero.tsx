"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { imagery } from "@/data/imagery";
import { brand } from "@/config/brand";
import {
  staggerContainer,
  maskLineVariant,
  fadeUpVariant,
  fadeInVariant,
  LUXURY_EASE,
} from "@/lib/animations/variants";

/**
 * Editorial cinematic full-screen hero.
 *  - High-performance GPU-composited animations with silky cubic-bezier deceleration.
 *  - Multi-tier luxury vignette overlay ensuring crisp typography contrast over illuminated villa architecture.
 *  - 100% accessible with full reduced-motion support.
 */
export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden bg-charcoal"
      aria-label="Golden Acres Real Estate — luxury real estate in Trivandrum"
    >
      {/* Cinematic backdrop image with subtle ambient settling */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={reduced ? false : { scale: 1.08, opacity: 0.8 }}
          animate={{ scale: 1.0, opacity: 1 }}
          transition={{ duration: 7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={imagery.hero}
            alt={imagery.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Multi-layered luxury lighting overlays */}
        {/* Vertical gradient: protects navbar legibility at top and grounds the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/45 to-charcoal/95" />

        {/* Horizontal gradient: ensures pristine text contrast on the left while letting the glowing villa on the right shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/40 to-transparent" />

        {/* Subtle warm golden ambient radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.09)_0%,_transparent_65%)]" />
      </div>

      {/* Main Hero Content */}
      <motion.div
        variants={staggerContainer}
        initial={reduced ? "visible" : "hidden"}
        animate="visible"
        className="container-site relative z-10 flex flex-1 flex-col justify-end pb-20 sm:pb-24 lg:pb-28"
      >
        {/* Eyebrow badge */}
        <motion.p
          variants={fadeUpVariant}
          className="eyebrow text-gold font-medium tracking-[0.34em]"
        >
          Golden Acres Real Estate · Trivandrum
        </motion.p>

        {/* Majestic Serif Headline with masked line entrance */}
        <h1 className="mt-5 max-w-4xl font-serif text-[11.5vw] font-light leading-[1.04] tracking-[-0.015em] text-ivory sm:text-7xl sm:leading-[1.02] lg:text-[5.5rem]">
          <span className="block overflow-hidden pb-[0.1em]">
            <motion.span
              variants={maskLineVariant}
              className="block will-change-transform"
            >
              Where your address{" "}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.16em]">
            <motion.span
              variants={maskLineVariant}
              className="block will-change-transform"
            >
              becomes a{" "}
              <em className="font-light italic text-gold-soft bg-gradient-to-r from-[#F6E2AA] via-[#D4AF37] to-[#ECC878] bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(212,175,55,0.35)]">
                legacy.
              </em>
            </motion.span>
          </span>
        </h1>

        {/* Subtitle description */}
        <motion.p
          variants={fadeUpVariant}
          className="mt-6 max-w-xl text-[15px] leading-relaxed text-ivory/80 sm:text-[16.5px]"
        >
          Residential and commercial property consultancy in Trivandrum —
          honest guidance from the Kazhakootam corridor to the city centre,
          for families and investors alike.
        </motion.p>

        {/* Luxury CTA Actions */}
        <motion.div
          variants={fadeUpVariant}
          className="mt-8 sm:mt-9 flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
        >
          <Link
            href="/properties"
            className="group relative inline-flex h-13 sm:h-14 items-center justify-center gap-3 overflow-hidden bg-gradient-to-r from-gold-soft via-gold to-gold-deep px-8 text-[11.5px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal shadow-[0_4px_22px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_6px_28px_rgba(212,175,55,0.5)] active:scale-[0.98] w-full sm:w-auto"
          >
            <span className="relative z-10">Explore Properties</span>
            <span
              aria-hidden
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex h-13 sm:h-14 items-center justify-center gap-3 border border-ivory/30 bg-charcoal/40 px-8 text-[11.5px] sm:text-[12px] font-medium uppercase tracking-[0.2em] text-ivory backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-charcoal/70 hover:text-gold-soft hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
          >
            Enquire Now
          </Link>
        </motion.div>

        {/* Areas ticker tape: silky infinite marquee with edge gradient fade masks */}
        <motion.div
          variants={fadeInVariant}
          className="mt-12 hidden items-center gap-5 border-t border-ivory/15 pt-5 md:flex overflow-hidden"
        >
          {/* Fixed Luxury Tag */}
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="flex size-6 items-center justify-center rounded-full bg-gold/15 text-gold border border-gold/30 shadow-[0_1px_8px_rgba(212,175,55,0.2)]">
              <MapPin className="size-3" />
            </span>
            <span className="text-gold font-semibold text-[11px] uppercase tracking-[0.25em]">
              Areas We Serve
            </span>
            <span className="h-3 w-px bg-ivory/20 mx-1" />
          </div>

          {/* Seamless Infinite Marquee with Optical Gradient Edge Masks */}
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-7 text-[11.5px] font-medium tracking-[0.2em] text-ivory/65">
              {[...brand.serviceAreas, ...brand.serviceAreas].map((area, index) => (
                <span key={`${area}-${index}`} className="inline-flex items-center gap-7 shrink-0">
                  <span className="transition-colors hover:text-gold-soft cursor-pointer">
                    {area}
                  </span>
                  <span className="text-gold/40 text-[8px]">✦</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Elegant scroll cue */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1, ease: LUXURY_EASE }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        aria-hidden
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.45em] text-ivory/50">
          Scroll
        </span>
        <span className="block h-9 w-px animate-scroll-cue bg-gradient-to-b from-gold/70 via-gold/40 to-transparent" />
      </motion.div>
    </section>
  );
}
