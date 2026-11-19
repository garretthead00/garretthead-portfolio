import { defineConfig } from "@playwright/test";

const port = 4173;
const localUrl = `http://localhost:${port}/garretthead-portfolio/`;
/** Set BASE_URL to check the deployed site instead of the local build. */
const liveUrl = process.env.BASE_URL;

export default defineConfig({
  testDir: "e2e",
  testMatch: "**/*.e2e.ts",
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: liveUrl ?? localUrl,
    reducedMotion: "reduce",
  },
  projects: [
    // GitHub's Ubuntu runners ship Google Chrome, so it needs no download.
    { name: "chrome", use: { channel: "chrome" } },
    {
      name: "firefox",
      testMatch: "smoke.e2e.ts",
      use: { browserName: "firefox" },
    },
    {
      name: "webkit",
      testMatch: "smoke.e2e.ts",
      use: { browserName: "webkit" },
    },
  ],
  ...(liveUrl
    ? {}
    : {
        webServer: {
          command: `npm run preview -- --port ${port} --strictPort`,
          url: localUrl,
          reuseExistingServer: !process.env.CI,
        },
      }),
});
