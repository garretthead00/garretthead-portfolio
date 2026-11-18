import type { SkillGroup } from "./types";

/** The résumé's Core Skills groups. */
export const skillGroups: readonly SkillGroup[] = [
  {
    id: "frontend-mobile",
    name: "Frontend & Mobile",
    skills: [
      "React",
      "Next.js",
      "React Native",
      "TypeScript",
      "Redux",
      "RTK Query",
      "Zustand",
      "Tailwind CSS",
      "Accessibility",
    ],
  },
  {
    id: "backend-data",
    name: "Backend & Data",
    skills: [
      "Node.js",
      "Express",
      "GraphQL",
      "REST APIs",
      "Prisma",
      "PostgreSQL",
      "Elasticsearch",
      "Microservices",
    ],
  },
  {
    id: "applied-ai",
    name: "Applied AI",
    skills: [
      "Claude LLM integration",
      "Conversational AI",
      "RAG",
      "AI-assisted development",
      "Claude Code",
    ],
  },
  {
    id: "delivery-quality",
    name: "Delivery & Quality",
    skills: [
      "GitHub Actions",
      "CI/CD",
      "Google Cloud",
      "Playwright",
      "Maestro",
      "Jest",
      "Observability",
      "Incident response",
    ],
  },
];
