import { describe, expect, it } from "vitest";
import * as content from "./index";
import snapshot from "./resume.snapshot.json";

const { profile, roles, sections, skillGroups, formatYearMonth } = content;

describe("résumé content contract", () => {
  it("lists exactly the five résumé roles, matching the snapshot", () => {
    expect(roles).toHaveLength(5);
    expect(
      roles.map(({ company, title, start, end }) => ({
        company,
        title,
        start,
        end,
      })),
    ).toEqual(snapshot);
  });

  it("has no role starting before March 2021", () => {
    for (const role of roles) expect(role.start >= "2021-03").toBe(true);
  });

  it("orders roles newest first with valid date ranges", () => {
    for (const role of roles) expect(role.start <= role.end).toBe(true);
    const starts = roles.map((role) => role.start);
    expect(starts).toEqual([...starts].sort().reverse());
  });

  it("gives every role highlights, technologies and a LinkedIn company page", () => {
    for (const role of roles) {
      expect(role.highlights.length).toBeGreaterThan(0);
      expect(role.technologies.length).toBeGreaterThan(0);
      expect(role.companyUrl).toMatch(
        /^https:\/\/www\.linkedin\.com\/company\//,
      );
    }
  });

  it("keeps the résumé's qualified wording for reported metrics", () => {
    const text = roles.flatMap((role) => role.highlights).join(" ");
    expect(text).toContain("over $200M in reported revenue");
    expect(text).toContain("reported outcomes included approximately 30%");
  });

  it("uses the current title for the most recent role", () => {
    expect(roles[0]?.title).toBe(profile.title);
  });

  it("links only to LinkedIn and GitHub", () => {
    expect(profile.socials.map((social) => social.href)).toEqual([
      "https://www.linkedin.com/in/garretthead",
      "https://github.com/garretthead00",
    ]);
  });

  it("has no education, projects or contact content", () => {
    expect(Object.keys(content)).not.toEqual(
      expect.arrayContaining(["education"]),
    );
    expect(sections.map((section) => section.id)).toEqual([
      "home",
      "about",
      "resume",
    ]);
  });

  it("keeps the four Core Skills groups", () => {
    expect(skillGroups.map((group) => group.name)).toEqual([
      "Frontend & Mobile",
      "Backend & Data",
      "Applied AI",
      "Delivery & Quality",
    ]);
  });

  it("has unique ids", () => {
    const ids = [
      ...roles.map((role) => role.id),
      ...skillGroups.map((g) => g.id),
    ];
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("formatYearMonth", () => {
  it("formats year-month values", () => {
    expect(formatYearMonth("2026-02")).toBe("Feb 2026");
    expect(formatYearMonth("2021-03")).toBe("Mar 2021");
  });
});
