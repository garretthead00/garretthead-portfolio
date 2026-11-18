/// <reference types="node" />
/**
 * Writes the server-rendered page into dist/index.html so the first paint
 * and crawlers get the full content without waiting for JavaScript.
 * Runs after `vite build` and `vite build --ssr src/entry-server.tsx`.
 */
import { readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const indexPath = `${root}dist/index.html`;
const serverDir = `${root}dist-ssr`;
const placeholder = '<div id="root"></div>';

const isRenderer = (value: unknown): value is { render: () => string } =>
  typeof value === "object" &&
  value !== null &&
  "render" in value &&
  typeof value.render === "function";

const entry: unknown = await import(
  pathToFileURL(`${serverDir}/entry-server.js`).href
);
if (!isRenderer(entry)) throw new Error("entry-server.js has no render()");

const html = await readFile(indexPath, "utf8");
if (!html.includes(placeholder)) {
  throw new Error(`dist/index.html has no ${placeholder}`);
}

await writeFile(
  indexPath,
  html.replace(placeholder, `<div id="root">${entry.render()}</div>`),
);
await rm(serverDir, { recursive: true });
