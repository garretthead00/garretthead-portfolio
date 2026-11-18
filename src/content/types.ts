/** Year and month, e.g. "2026-02". */
export type YearMonth = `${number}-${number}`;

export type SocialId = "linkedin" | "github";

export interface SocialLink {
  id: SocialId;
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  /** Current title, shown in the hero and the Experience header. */
  title: string;
  /** One line on stack and focus, under the name. */
  tagline: string;
  about: {
    heading: string;
    paragraphs: readonly string[];
  };
  experienceSummary: string;
  socials: readonly SocialLink[];
}

export interface SkillGroup {
  id: string;
  name: string;
  skills: readonly string[];
}

export interface Role {
  id: string;
  company: string;
  title: string;
  start: YearMonth;
  end: YearMonth;
  /** The company's LinkedIn page. */
  companyUrl: string;
  highlights: readonly string[];
  technologies: readonly string[];
}

export type SectionId = "home" | "about" | "resume";

export interface Section {
  id: SectionId;
  label: string;
}
