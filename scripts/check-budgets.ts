/// <reference types="node" />
/**
 * Fails the build when the first visit downloads more than the performance
 * budgets allow (see "Quality gates, budgets & device matrix" in the plan).
 * Text files count gzipped, as GitHub Pages serves them; images and fonts
 * count as-is. Each <picture> counts its largest AVIF candidate (worst case).
 */
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const KB = 1024;
const budgets = { javascript: 90 * KB, total: 400 * KB };

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const base = "/garretthead-portfolio/";

const sizeOf = async (path: string): Promise<number> => {
  const body = await readFile(`${dist}${path}`);
  return /\.(html|js|css|json|ico)$/.test(path)
    ? gzipSync(body).length
    : body.length;
};

const html = await readFile(`${dist}index.html`, "utf8");
const assetPath = (url: string) => url.replace(base, "");

const linked = [
  ...html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="([^"]+)"/g),
]
  .map((match) => match[1] ?? "")
  .filter((url) => url.startsWith(`${base}assets/`))
  .map(assetPath);

const largestAvif = [
  ...html.matchAll(/<source type="image\/avif" srcset="([^"]+)"/gi),
].map((match) => {
  const candidates = (match[1] ?? "").split(", ").map((candidate) => {
    const [url = "", width = "0w"] = candidate.split(" ");
    return { url, width: Number.parseInt(width, 10) };
  });
  const largest = candidates.reduce((a, b) => (b.width > a.width ? b : a));
  return assetPath(largest.url);
});

// Every chunk loads on the first visit (the Motion features chunk right after
// hydration), and every font is used above the fold, so count all of them.
const assets = await readdir(`${dist}assets`);
const loadedOnFirstVisit = assets
  .filter((file) => /\.(js|woff2)$/.test(file))
  .map((file) => `assets/${file}`);

const files = [
  ...new Set([
    "index.html",
    "favicon.ico",
    ...linked,
    ...loadedOnFirstVisit,
    ...largestAvif,
  ]),
];
const sizes = await Promise.all(
  files.map(async (file) => ({ file, size: await sizeOf(file) })),
);

const javascript = sizes
  .filter(({ file }) => linked.includes(file) && file.endsWith(".js"))
  .reduce((sum, { size }) => sum + size, 0);
const total = sizes.reduce((sum, { size }) => sum + size, 0);

const format = (bytes: number) => `${(bytes / KB).toFixed(1)} KB`;
for (const { file, size } of sizes) {
  console.log(`${format(size).padStart(9)}  ${file}`);
}
console.log(
  `\nInitial JavaScript: ${format(javascript)} (budget ${format(budgets.javascript)})`,
);
console.log(
  `First-visit total:  ${format(total)} (budget ${format(budgets.total)})`,
);

if (javascript > budgets.javascript || total > budgets.total) {
  console.error("\nOver budget.");
  process.exit(1);
}
