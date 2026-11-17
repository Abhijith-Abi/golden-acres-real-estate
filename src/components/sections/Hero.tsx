"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { imagery } from "@/data/imagery";
import { brand } from "@/config/brand";
import { EASE } from "@/lib/animations/variants";

/**
 * Cinematic full-screen hero.
 *  - Load: GSAP timeline unmasks each headline line (staggered, slow ease).
 *  - Scroll: GSAP ScrollTrigger drives a gentle parallax push on the image
 *    and fades the content out.
 *  - prefers-reduced-motion: everything renders in final state, no scrubbing.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        ".hero-line",
        { yPercent: 115 },
        { yPercent: 0, duration: 1.3, stagger: 0.12, delay: 0.35 }
      )
        .fromTo(
          ".hero-fade",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
          "-=0.7"
        )
        .fromTo(
          ".hero-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, transformOrigin: "left center" },
          "-=0.8"
        );

      gsap.to(".hero-img", {
        yPercent: 14,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-content", {
        yPercent: -18,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "70% top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative flex h-[100svh] min-h-[560px] flex-col overflow-hidden bg-charcoal"
      aria-label="Golden Acres Real Estates — introduction"
    >
      {/* Backdrop image with parallax wrapper */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-img absolute inset-[-12%] will-change-transform">
          <Image
            src={imagery.hero}
            alt={imagery.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/35 to-charcoal/80" />
        <div className="absolute inset-0 bg-charcoal/10" />
      </div>

      {/* Content */}
      <div className="hero-content container-site relative z-10 flex flex-1 flex-col justify-end pb-24 sm:pb-28 lg:pb-32">
        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="hero-fade eyebrow text-gold-soft"
        >
          Golden Acres Real Estates — Trivandrum
        </motion.p>

        <h1 className="mt-6 max-w-4xl font-serif text-[11.5vw] font-light leading-[1.06] tracking-[-0.015em] text-ivory sm:text-7xl sm:leading-[1.02] lg:text-[5.6rem]">
          <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
            <span className="hero-line block will-change-transform">
              Where your address
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.16em] -mb-[0.1em]">
            <span className="hero-line block will-change-transform">
              becomes a <em className="font-light italic text-gold-soft">legacy.</em>
            </span>
          </span>
        </h1>

        <p className="hero-fade mt-7 max-w-xl text-[15px] leading-relaxed text-ivory/70 sm:text-base">
          Residential and commercial property consultancy in Trivandrum —
          honest guidance from the Kazhakootam corridor to the city centre,
          for families and investors alike.
        </p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.15 }}
          className="hero-fade mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/properties"
            className="group inline-flex h-14 items-center gap-3 bg-gold-soft px-8 text-[12px] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors hover:bg-ivory"
          >
            Explore Properties
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-14 items-center gap-3 border border-ivory/30 px-8 text-[12px] font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:border-ivory/70 hover:bg-ivory/10"
          >
            Enquire Now
          </Link>
        </motion.div>

        {/* Areas strip */}
        <div className="hero-rule mt-14 hidden origin-left items-center gap-3 border-t border-ivory/15 pt-5 text-[10.5px] font-medium uppercase tracking-[0.3em] text-ivory/50 md:flex">
          <span className="text-gold-soft">Areas we serve</span>
          <span className="flex flex-wrap gap-x-3 gap-y-1">
            {brand.serviceAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </span>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        aria-hidden
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-ivory/50">
          Scroll
        </span>
        <span className="block h-10 w-px animate-scroll-cue bg-gradient-to-b from-ivory/60 to-transparent" />
      </motion.div>
    </section>
  );
}
