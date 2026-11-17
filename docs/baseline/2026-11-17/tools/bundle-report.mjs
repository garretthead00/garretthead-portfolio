// Phase 0 baseline: size report for a static build directory.
// Usage: node bundle-report.mjs <buildDir> <outJson>
// Attributes minified JS bytes to source packages using the build's source maps.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { SourceMapConsumer } = require(process.env.SOURCE_MAP_PATH || 'source-map');

const [, , buildDir, outJson] = process.argv;
if (!buildDir || !outJson) {
  console.error('Usage: node bundle-report.mjs <buildDir> <outJson>');
  process.exit(1);
}

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

const sizes = (buf) => ({
  raw: buf.length,
  gzip: zlib.gzipSync(buf, { level: 9 }).length,
  brotli: zlib.brotliCompressSync(buf).length,
});

const files = walk(buildDir)
  .filter((f) => !f.endsWith('.map') && !f.endsWith('.LICENSE.txt'))
  .map((f) => ({ file: path.relative(buildDir, f), ...sizes(fs.readFileSync(f)) }))
  .sort((a, b) => b.raw - a.raw);

// Attribute each generated JS byte to its original source, grouped by package.
const packageOf = (src) => {
  const m = src.match(/node_modules\/((?:@[^/]+\/)?[^/]+)/);
  // react-intersection-observer ships maps whose sources point at node_modules/src/*.
  if (m) return m[1] === 'src' ? 'react-intersection-observer' : m[1];
  return src.startsWith('../webpack/') ? '(webpack runtime)' : '(app source)';
};

async function composition(jsFile) {
  const code = fs.readFileSync(jsFile, 'utf8');
  const map = JSON.parse(fs.readFileSync(`${jsFile}.map`, 'utf8'));
  const lines = code.split('\n');
  const totals = {};
  // Works with source-map 0.6 (sync constructor) and 0.7+ (async `with`).
  const withConsumer = SourceMapConsumer.with
    ? (fn) => SourceMapConsumer.with(map, null, fn)
    : async (fn) => fn(new SourceMapConsumer(map));
  await withConsumer((consumer) => {
    const mappings = [];
    consumer.eachMapping((m) => mappings.push(m));
    mappings.sort((a, b) => a.generatedLine - b.generatedLine || a.generatedColumn - b.generatedColumn);
    for (let i = 0; i < mappings.length; i++) {
      const m = mappings[i];
      const next = mappings[i + 1];
      const lineLen = lines[m.generatedLine - 1]?.length ?? 0;
      const end = next && next.generatedLine === m.generatedLine ? next.generatedColumn : lineLen;
      const bytes = Math.max(0, end - m.generatedColumn);
      const key = m.source ? packageOf(m.source) : '(unmapped)';
      totals[key] = (totals[key] || 0) + bytes;
    }
  });
  const sum = Object.values(totals).reduce((a, b) => a + b, 0);
  return Object.entries(totals)
    .map(([pkg, bytes]) => ({ pkg, bytes, share: +(bytes / sum).toFixed(4) }))
    .sort((a, b) => b.bytes - a.bytes);
}

const jsFiles = walk(buildDir).filter((f) => f.endsWith('.js') && fs.existsSync(`${f}.map`));
const js = {};
for (const f of jsFiles) js[path.relative(buildDir, f)] = await composition(f);

const total = (pred) =>
  files.filter(pred).reduce((a, f) => ({ raw: a.raw + f.raw, gzip: a.gzip + f.gzip }), { raw: 0, gzip: 0 });

const report = {
  generatedAt: new Date().toISOString(),
  buildDir,
  totals: {
    js: total((f) => f.file.endsWith('.js')),
    css: total((f) => f.file.endsWith('.css')),
    images: total((f) => /\.(png|jpe?g|webp|avif|svg|ico)$/.test(f.file)),
  },
  files,
  jsComposition: js,
};
fs.writeFileSync(outJson, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.totals, null, 2));
for (const [f, rows] of Object.entries(js)) {
  console.log(`\n${f}`);
  for (const r of rows.slice(0, 15)) console.log(`${(r.bytes / 1024).toFixed(1).padStart(8)} KB  ${(r.share * 100).toFixed(1).padStart(5)}%  ${r.pkg}`);
}
