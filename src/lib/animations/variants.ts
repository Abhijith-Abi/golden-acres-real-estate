/**
 * Shared Framer Motion vocabulary — a long, gentle ease and a shared
 * in-view configuration. All components respect prefers-reduced-motion
 * via useReducedMotion.
 */

/** Signature easing curve used across the site's motion. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Shared whileInView settings so reveals fire once, slightly early. */
export const viewportOnce = { once: true, margin: "-12% 0px" } as const;
