/// <reference types="node" />
/**
 * Runs Lighthouse (mobile and desktop) against dist/, served gzipped under
 * /garretthead-portfolio/ the way GitHub Pages serves it, and fails below the
 * plan's scores: accessibility, best practices and SEO 100, performance 90.
 * Performance aims for 95, but shared CI machines vary by a few points, so
 * a run under 95 only prints a warning.
 */
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import * as chromeLauncher from "chrome-launcher";
import lighthouse, { desktopConfig } from "lighthouse";

const base = "/garretthead-portfolio/";
const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const types: Record<string, string> = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".xml": "application/xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};
const compressible = new Set([".html", ".js", ".css", ".json", ".xml"]);

const server = createServer((request, response) => {
  const { pathname } = new URL(request.url ?? "/", "http://localhost");
  if (!pathname.startsWith(base)) {
    response.writeHead(404).end();
    return;
  }
  const relative = normalize(decodeURIComponent(pathname.slice(base.length)));
  if (relative.startsWith("..")) {
    response.writeHead(404).end();
    return;
  }
  const file = join(dist, relative === "." ? "index.html" : relative);

  void stat(file)
    .then(async (info) => {
      const path = info.isDirectory() ? join(file, "index.html") : file;
      const body = await readFile(path);
      const extension = extname(path);
      const headers: Record<string, string> = {
        "content-type": types[extension] ?? "application/octet-stream",
      };
      if (compressible.has(extension)) {
        headers["content-encoding"] = "gzip";
        response.writeHead(200, headers).end(gzipSync(body));
      } else {
        response.writeHead(200, headers).end(body);
      }
    })
    .catch(() => response.writeHead(404).end());
});

await new Promise<void>((resolve) => server.listen(0, resolve));
const { port } = server.address() as AddressInfo;
const url = `http://localhost:${port}${base}`;

const minimums = {
  performance: 0.9,
  accessibility: 1,
  "best-practices": 1,
  seo: 1,
} as const;
const performanceTarget = 0.95;

const chrome = await chromeLauncher.launch({
  chromeFlags: ["--headless=new", "--no-sandbox"],
});
const failures: string[] = [];

try {
  for (const formFactor of ["mobile", "desktop"] as const) {
    const result = await lighthouse(
      url,
      { port: chrome.port, output: "json", logLevel: "error" },
      formFactor === "desktop" ? desktopConfig : undefined,
    );
    if (!result)
      throw new Error(`Lighthouse returned no result (${formFactor})`);
    const { categories, audits } = result.lhr;

    const scores = Object.entries(minimums).map(([id, minimum]) => {
      const score = categories[id]?.score ?? 0;
      if (score < minimum) {
        failures.push(
          `${formFactor} ${id}: ${Math.round(score * 100)} < ${minimum * 100}`,
        );
      }
      return `${id} ${Math.round(score * 100)}`;
    });
    console.log(
      `${formFactor.padEnd(7)}  ${scores.join("  ")}  |  LCP ${audits["largest-contentful-paint"]?.displayValue ?? "?"}  CLS ${audits["cumulative-layout-shift"]?.displayValue ?? "?"}`,
    );

    const performance = categories.performance?.score ?? 0;
    if (performance < performanceTarget) {
      console.warn(
        `  warning: ${formFactor} performance ${Math.round(performance * 100)} is under the ${performanceTarget * 100} target`,
      );
    }
    for (const category of ["accessibility", "best-practices", "seo"]) {
      for (const ref of categories[category]?.auditRefs ?? []) {
        const audit = audits[ref.id];
        if (
          ref.weight > 0 &&
          audit?.score !== null &&
          (audit?.score ?? 1) < 1
        ) {
          console.log(`  ${category}: ${audit?.title ?? ref.id}`);
        }
      }
    }
  }
} finally {
  chrome.kill();
  server.close();
}

if (failures.length > 0) {
  console.error(`\nBelow the minimum scores:\n${failures.join("\n")}`);
  process.exit(1);
}
