import { describe, expect, it } from "vitest";
import { resolveReducedMotion, toMotionConfig } from "./motionPreference";
import { motionRules } from "./variants";

describe("motion preference", () => {
  it("follows the system setting when the visitor hasn't chosen", () => {
    expect(resolveReducedMotion(null, true)).toBe(true);
    expect(resolveReducedMotion(null, false)).toBe(false);
  });

  it("lets the on-page choice win over the system setting", () => {
    expect(resolveReducedMotion("reduce", false)).toBe(true);
    expect(resolveReducedMotion("full", true)).toBe(false);
  });

  it("maps the stored choice to Motion's reducedMotion setting", () => {
    expect(toMotionConfig(null)).toBe("user");
    expect(toMotionConfig("reduce")).toBe("always");
    expect(toMotionConfig("full")).toBe("never");
  });
});

describe("motion rules", () => {
  it("keeps entrances short, small and lightly staggered", () => {
    expect(motionRules.duration).toBeGreaterThanOrEqual(0.15);
    expect(motionRules.duration).toBeLessThanOrEqual(0.4);
    expect(motionRules.travel).toBeLessThanOrEqual(24);
    expect(motionRules.stagger).toBeLessThanOrEqual(0.06);
  });
});
