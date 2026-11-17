/**
 * Shared Framer Motion variants — a small, consistent motion vocabulary:
 * gentle rises, long eases, staggered children. All respects
 * prefers-reduced-motion via useReducedMotion in <Reveal>.
 */
import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: i * 0.08 },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 1, ease: EASE, delay: i * 0.08 },
  }),
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(12% 6% 12% 6% round 4px)", opacity: 0.4, scale: 1.04 },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 0px)",
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: EASE },
  },
};

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: (i: number = 0) => ({
    y: "0%",
    transition: { duration: 0.9, ease: EASE, delay: i * 0.1 },
  }),
};

export const viewportOnce = { once: true, margin: "-12% 0px" } as const;
