import type { Variants } from "framer-motion";

/**
 * Shared Framer Motion vocabulary for Golden Acres Real Estate.
 * Uses high-performance GPU transforms and refined editorial easing curves.
 */

/** Signature editorial easing curve: luxurious, silky deceleration */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

/** Shared whileInView settings so reveals fire once, smoothly */
export const viewportOnce = { once: true, margin: "-8% 0px" } as const;

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

export const maskLineVariant: Variants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1.15,
      ease: LUXURY_EASE,
    },
  },
};

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: LUXURY_EASE,
    },
  },
};

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: LUXURY_EASE,
    },
  },
};
