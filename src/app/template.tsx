"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animations/variants";

/**
 * Route-level page transition — a quiet, short fade so navigation feels
 * instant on every device (no transform movement that can read as a jump
 * on mobile or while Lenis resets the scroll position).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
