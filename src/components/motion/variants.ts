import type { Variants } from "motion/react";

/** Motion rules: short, eased out, small travel, small stagger. */
export const motionRules = {
  /** Seconds. Entrance animations stay within 150–400 ms. */
  duration: 0.35,
  /** Pixels an element rises while it fades in (at most 24). */
  travel: 16,
  /** Seconds between items that enter together (at most 60 ms). */
  stagger: 0.06,
} as const;

/** Fade in while rising; `custom` is the delay in seconds. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: motionRules.travel },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: motionRules.duration, ease: "easeOut", delay },
  }),
};
