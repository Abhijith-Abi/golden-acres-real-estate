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

    // On pure mobile touch devices, native momentum scroll is 120Hz smooth
    // and immune to virtual scroll boundary clamping or viewport height freezing.
    const isTouchOnly = window.matchMedia("(pointer: coarse) and (hover: none)").matches;
    if (isTouchOnly) {
      const updateScroll = () => ScrollTrigger.update();
      window.addEventListener("scroll", updateScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", updateScroll);
      };
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      autoResize: true,
      // Anchor links stop below the fixed navbar.
      anchors: { offset: 96 },
    });
    lenisRef.current = lenis;

    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    // Crucial: lagSmoothing(0) prevents GSAP from delaying or dropping scroll frames
    gsap.ticker.lagSmoothing(0);

    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Keep Lenis limit and ScrollTrigger continuously updated as images/accordions load
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("load", handleResize);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      gsap.ticker.remove(raf);
      lenis.off("scroll", update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    // On every navigation: snap to top immediately, then re-measure the new page's triggers.
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.resize();
    } else {
      window.scrollTo(0, 0);
    }

    let rafId = 0;
    rafId = requestAnimationFrame(() => {
      lenis?.resize();
      ScrollTrigger.refresh();
    });
    // A second pass once images/fonts settle, so parallax origins are exact.
    const timeoutId = setTimeout(() => {
      lenis?.resize();
      ScrollTrigger.refresh();
    }, 350);

    return () => {
      cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [pathname]);

  return <>{children}</>;
}
