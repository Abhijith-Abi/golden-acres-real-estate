"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SmoothScrollProvider
 *
 * Wires Lenis into GSAP's ticker so both run on one frame loop:
 *  - lenis.on("scroll", ScrollTrigger.update) keeps ScrollTrigger in sync
 *  - gsap.ticker drives lenis.raf, avoiding double rAF loops
 *
 * Route changes: instantly resets scroll to the top (Lenis + native), then
 * refreshes ScrollTrigger once the new page has painted so reveal/parallax
 * triggers measure the new layout — no mid-page start, no stale triggers.
 * Disabled entirely for prefers-reduced-motion users (native scrolling).
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      // Anchor links stop below the fixed navbar.
      anchors: { offset: 96 },
    });
    lenisRef.current = lenis;

    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.off("scroll", update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    // On every navigation: snap to top immediately (no smooth glide from the
    // previous page's position), then re-measure the new page's triggers.
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }

    let rafId = 0;
    rafId = requestAnimationFrame(() => ScrollTrigger.refresh());
    // A second pass once images/fonts settle, so parallax origins are exact.
    const timeoutId = setTimeout(() => ScrollTrigger.refresh(), 350);

    return () => {
      cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [pathname]);

  return <>{children}</>;
}
