import type { Profile } from "./types";

export const profile: Profile = {
  name: "Garrett Head",
  title: "Senior Software Engineer",
  tagline:
    "React, Next.js, TypeScript and Node.js. Platform architecture and applied AI & LLM integration.",
  about: {
    heading: "13 years building for the web",
    paragraphs: [
      "Senior full-stack engineer and technical lead specializing in React, Next.js, TypeScript, Node.js and web/mobile product development. I modernize legacy platforms, design GraphQL and data layers, ship revenue-critical checkout experiences and support large-scale authentication systems.",
      "Recent work includes Claude-powered application features, retrieval-augmented offer generation and AI-assisted engineering workflows.",
    ],
  },
  experienceSummary:
    "Full-stack engineer and technical lead across recommerce, travel, identity and enterprise collaboration products: modernizing platforms, owning architecture and shipping web and React Native experiences, most recently with Claude LLM integration and RAG.",
  socials: [
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/garretthead",
    },
    { id: "github", label: "GitHub", href: "https://github.com/garretthead00" },
  ],
};
