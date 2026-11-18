import { defineConfig } from "@playwright/test";

const port = 4173;

// Runs the accessibility checks against the production build.
export default defineConfig({
  testDir: "e2e",
  testMatch: "**/*.e2e.ts",
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${port}/garretthead-portfolio/`,
    // GitHub's Ubuntu runners ship Google Chrome, so CI downloads no browser.
    channel: "chrome",
    reducedMotion: "reduce",
  },
  webServer: {
    command: `npm run preview -- --port ${port} --strictPort`,
    url: `http://localhost:${port}/garretthead-portfolio/`,
    reuseExistingServer: !process.env.CI,
  },
});
