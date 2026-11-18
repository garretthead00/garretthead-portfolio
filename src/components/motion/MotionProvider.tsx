import { useCallback, useEffect, useMemo, type ReactNode } from "react";
import { LazyMotion, MotionConfig } from "motion/react";
import {
  MotionPreferenceContext,
  resolveReducedMotion,
  toMotionConfig,
  useStoredPreference,
  useSystemReducedMotion,
  writeStoredPreference,
} from "./motionPreference";

/** Animation features load in their own chunk, after first paint. */
const loadFeatures = () =>
  import("./features").then((module) => module.default);

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * Loads only the DOM animation features, on demand (`strict` makes any full
 * `motion.*` component throw, so every animated element uses `m.*`) and
 * applies the motion preference: the visitor's on-page choice, otherwise
 * their system setting. It also turns smooth scrolling on or off through
 * `data-motion` on the root element.
 */
export const MotionProvider = ({ children }: MotionProviderProps) => {
  const stored = useStoredPreference();
  const systemPrefersReduced = useSystemReducedMotion();
  const reduceMotion = resolveReducedMotion(stored, systemPrefersReduced);

  useEffect(() => {
    document.documentElement.dataset.motion = reduceMotion ? "reduce" : "full";
  }, [reduceMotion]);

  const toggle = useCallback(() => {
    writeStoredPreference(reduceMotion ? "full" : "reduce");
  }, [reduceMotion]);

  const value = useMemo(
    () => ({ reduceMotion, toggle }),
    [reduceMotion, toggle],
  );

  return (
    <MotionPreferenceContext value={value}>
      <LazyMotion features={loadFeatures} strict>
        <MotionConfig reducedMotion={toMotionConfig(stored)}>
          {children}
        </MotionConfig>
      </LazyMotion>
    </MotionPreferenceContext>
  );
};
