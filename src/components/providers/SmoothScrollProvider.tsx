"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * SmoothScrollProvider
 *
 * Route changes: instantly resets scroll to the top (Lenis + native), then
 * Lenis owns its animation frame loop. Content reveals use IntersectionObserver,
 * so no global animation ticker or scroll-trigger refresh loop is needed.
 * Disabled entirely for prefers-reduced-motion users (native scrolling).
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      autoResize: true,
      // Anchor links stop below the fixed navbar.
      anchors: { offset: 96 },
    });
    lenisRef.current = lenis;

    const handleResize = () => {
      lenis.resize();
    };

    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("load", handleResize);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
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
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return <>{children}</>;
}
