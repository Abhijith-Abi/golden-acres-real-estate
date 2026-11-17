"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animations/variants";

/** Route-level page transition — a quiet fade-lift on every navigation. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
