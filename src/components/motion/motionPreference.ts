import { createContext, useContext, useSyncExternalStore } from "react";

/** The visitor's on-page choice; `null` means "follow the system setting". */
export type StoredMotionPreference = "reduce" | "full" | null;

export const MOTION_STORAGE_KEY = "motion-preference";

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

const isStoredPreference = (value: string | null): value is "reduce" | "full" =>
  value === "reduce" || value === "full";

/** Reads the saved choice; storage can be unavailable (private mode, blocked). */
export const readStoredPreference = (): StoredMotionPreference => {
  try {
    const value = window.localStorage.getItem(MOTION_STORAGE_KEY);
    return isStoredPreference(value) ? value : null;
  } catch {
    return null;
  }
};

export const writeStoredPreference = (
  preference: Exclude<StoredMotionPreference, null>,
): void => {
  try {
    window.localStorage.setItem(MOTION_STORAGE_KEY, preference);
  } catch {
    // Not saved; the choice still applies for this visit.
  }
};

/** An on-page choice wins; otherwise follow the system setting. */
export const resolveReducedMotion = (
  stored: StoredMotionPreference,
  systemPrefersReduced: boolean,
): boolean => (stored === null ? systemPrefersReduced : stored === "reduce");

/** Motion's `reducedMotion` setting for a stored choice. */
export const toMotionConfig = (
  stored: StoredMotionPreference,
): "user" | "always" | "never" => {
  if (stored === "reduce") return "always";
  if (stored === "full") return "never";
  return "user";
};

const subscribeToSystem = (onChange: () => void) => {
  const query = window.matchMedia(REDUCE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/** Whether the operating system asks for reduced motion. */
export const useSystemReducedMotion = (): boolean =>
  useSyncExternalStore(
    subscribeToSystem,
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false,
  );

export interface MotionPreferenceValue {
  reduceMotion: boolean;
  toggle: () => void;
}

export const MotionPreferenceContext =
  createContext<MotionPreferenceValue | null>(null);

export const useMotionPreference = (): MotionPreferenceValue => {
  const value = useContext(MotionPreferenceContext);
  if (value === null) {
    throw new Error("useMotionPreference must be used inside MotionProvider");
  }
  return value;
};
