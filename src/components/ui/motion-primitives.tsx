"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

/**
 * <Reveal> — the site's standard scroll-triggered content reveal.
 * Server-component friendly: render children as-is.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduced = useReducedMotion();
  const Comp = motion[as];
  if (reduced) {
    return <Comp className={className}>{children}</Comp>;
  }
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/**
 * Masked line reveal for editorial headlines — each line rises out of an
 * overflow-hidden mask. Wrap each line in a <span> child.
 */
export function LineReveal({
  children,
  className,
  delay = 0,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={cn("block overflow-hidden", className)}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: reduced ? 0 : "110%", opacity: reduced ? 1 : 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once, margin: "-8% 0px" }}
        transition={{ duration: 0.95, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Framed image reveal — a soft clip-path wipe with subtle scale settle. */
export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn("frame", className)}
      initial={
        reduced
          ? {}
          : { clipPath: "inset(8% 6% 8% 6% round 2px)", opacity: 0.5, scale: 1.03 }
      }
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: 1, scale: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
