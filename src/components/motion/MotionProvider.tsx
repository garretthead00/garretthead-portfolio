import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * Loads only the DOM animation features up front (`strict` makes any full
 * `motion.*` component throw, so every animated element uses `m.*`) and
 * follows the visitor's reduced-motion setting.
 */
export const MotionProvider = ({ children }: MotionProviderProps) => (
  <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </LazyMotion>
);
