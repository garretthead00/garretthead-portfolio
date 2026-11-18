import { createContext, useContext, useSyncExternalStore } from "react";

/** The visitor's on-page choice; `null` means "follow the system setting". */
export type StoredMotionPreference = "reduce" | "full" | null;

export const MOTION_STORAGE_KEY = "motion-preference";

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

const isStoredPreference = (value: string | null): value is "reduce" | "full" =>
  value === "reduce" || value === "full";

/** This visit's choice, used when storage is unavailable (private mode, blocked). */
let unsavedPreference: StoredMotionPreference = null;
const storedListeners = new Set<() => void>();

const readStoredPreference = (): StoredMotionPreference => {
  try {
    const value = window.localStorage.getItem(MOTION_STORAGE_KEY);
    if (isStoredPreference(value)) return value;
  } catch {
    // Storage is unavailable; fall back to this visit's choice.
  }
  return unsavedPreference;
};

export const writeStoredPreference = (
  preference: Exclude<StoredMotionPreference, null>,
): void => {
  unsavedPreference = preference;
  try {
    window.localStorage.setItem(MOTION_STORAGE_KEY, preference);
  } catch {
    // Not saved; the choice still applies for this visit.
  }
  storedListeners.forEach((listener) => listener());
};

const subscribeToStored = (onChange: () => void) => {
  storedListeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    storedListeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
};

/**
 * The saved choice. The prerendered HTML has no choice (`null`), so hydration
 * starts from that and then switches to the saved value.
 */
export const useStoredPreference = (): StoredMotionPreference =>
  useSyncExternalStore(subscribeToStored, readStoredPreference, () => null);

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
