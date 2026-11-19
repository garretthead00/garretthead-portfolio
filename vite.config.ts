import { defineConfig, type Plugin } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";
import { headTags } from "./src/seo/headTags";

const base = "/garretthead-portfolio/";

/**
 * Preloads the display face used for the hero name. Inter and JetBrains Mono
 * swap in over size-matched fallbacks, so preloading them would only compete
 * with the hero image for bandwidth.
 */
const preloadDisplayFont = (): Plugin => ({
  name: "preload-display-font",
  apply: "build",
  transformIndexHtml: {
    order: "post",
    handler: (_html, { bundle }) =>
      Object.keys(bundle ?? {})
        .filter((fileName) => /orbitron-.*\.woff2$/.test(fileName))
        .map((fileName) => ({
          tag: "link",
          attrs: {
            rel: "preload",
            href: `${base}${fileName}`,
            as: "font",
            type: "font/woff2",
            crossorigin: "",
          },
          injectTo: "head",
        })),
  },
});

/**
 * GitHub Pages can't send headers, so the policy ships as a <meta> tag, in the
 * build only (the dev server injects inline scripts). Inline styles stay
 * allowed: Motion writes style attributes into the prerendered HTML.
 */
const contentSecurityPolicy = (): Plugin => ({
  name: "content-security-policy",
  apply: "build",
  transformIndexHtml: () => [
    {
      tag: "meta",
      attrs: {
        "http-equiv": "Content-Security-Policy",
        content: [
          "default-src 'self'",
          "script-src 'self'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self'",
          "font-src 'self'",
          "connect-src 'self'",
          "manifest-src 'self'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'none'",
        ].join("; "),
      },
      injectTo: "head-prepend",
    },
  ],
});

/** Writes the title, description and link-preview tags from `src/content`. */
const siteHead = (): Plugin => ({
  name: "site-head",
  transformIndexHtml: () => headTags(),
});

// Served from https://garretthead00.github.io/garretthead-portfolio/
export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    imagetools(),
    contentSecurityPolicy(),
    siteHead(),
    preloadDisplayFont(),
  ],
});
