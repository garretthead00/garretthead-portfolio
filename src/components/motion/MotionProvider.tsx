import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import {
  MotionPreferenceContext,
  readStoredPreference,
  resolveReducedMotion,
  toMotionConfig,
  useSystemReducedMotion,
  writeStoredPreference,
  type StoredMotionPreference,
} from "./motionPreference";

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * Loads only the DOM animation features up front (`strict` makes any full
 * `motion.*` component throw, so every animated element uses `m.*`) and
 * applies the motion preference: the visitor's on-page choice, otherwise
 * their system setting. It also turns smooth scrolling on or off through
 * `data-motion` on the root element.
 */
export const MotionProvider = ({ children }: MotionProviderProps) => {
  const [stored, setStored] =
    useState<StoredMotionPreference>(readStoredPreference);
  const systemPrefersReduced = useSystemReducedMotion();
  const reduceMotion = resolveReducedMotion(stored, systemPrefersReduced);

  useEffect(() => {
    document.documentElement.dataset.motion = reduceMotion ? "reduce" : "full";
  }, [reduceMotion]);

  const toggle = useCallback(() => {
    const next = reduceMotion ? "full" : "reduce";
    writeStoredPreference(next);
    setStored(next);
  }, [reduceMotion]);

  const value = useMemo(
    () => ({ reduceMotion, toggle }),
    [reduceMotion, toggle],
  );

  return (
    <MotionPreferenceContext value={value}>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion={toMotionConfig(stored)}>
          {children}
        </MotionConfig>
      </LazyMotion>
    </MotionPreferenceContext>
  );
};
