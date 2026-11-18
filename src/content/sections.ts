import type { Section } from "./types";

/** Page sections in reading order. Feeds the navigation and the active-section tracking. */
export const sections: readonly Section[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "resume", label: "Experience" },
];
