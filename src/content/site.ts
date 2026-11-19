import { profile } from "./profile";
import type { Site } from "./types";

export const site: Site = {
  url: "https://garretthead00.github.io/garretthead-portfolio/",
  title: `${profile.name} | ${profile.title}`,
  description: `${profile.name}, ${profile.title}: React, Next.js, TypeScript and Node.js, platform architecture and applied AI and LLM integration.`,
  shareImage: {
    path: "og-image.jpg",
    width: 1200,
    height: 630,
    alt: `${profile.name}, ${profile.title}, next to the purple and gold tiger.`,
  },
};
