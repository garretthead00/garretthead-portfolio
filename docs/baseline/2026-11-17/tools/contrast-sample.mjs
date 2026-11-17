// Phase 0 baseline: approximate WCAG text contrast over image/gradient backgrounds.
// axe-core can't judge text on background images, so this samples the rendered pixels:
// for each visible text element, the background is the median of screenshot pixels in its box
// that are not close to the text colour. Results are estimates; confirm borderline cases by eye.
// Usage: node contrast-sample.mjs <baseUrl> <outJson>
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const sharp = require(process.env.SHARP_PATH || 'sharp');
const [, , baseUrl, outJson] = process.argv;

const lum = ([r, g, b]) => {
  const f = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
const results = {};
for (const [label, width, height] of [['390x844', 390, 844], ['1366x768', 1366, 768]]) {
  const context = await browser.newContext({ viewport: { width, height } });
  const origin = new URL(baseUrl).origin;
  await context.route('**/*', (r) => (r.request().url().startsWith(origin) ? r.continue() : r.abort()));
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  const rows = [];
  for (const id of ['home', 'about', 'resume', 'contact', 'nav']) {
    if (id !== 'nav') {
      await page.evaluate((i) => document.getElementById(i)?.scrollIntoView({ block: 'start' }), id);
    }
    await page.waitForTimeout(2600);
    const shot = await page.screenshot();
    const { data, info } = await sharp(shot).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const items = await page.evaluate((sel) => {
      const root = sel === 'nav' ? document.querySelector('nav') : document.getElementById(sel);
      if (!root) return [];
      const out = [];
      const els = sel === 'nav' ? [...root.querySelectorAll('a')] : [...root.querySelectorAll('*')];
      for (const el of els) {
        const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        const isIcon = sel === 'nav';
        if (!hasText && !isIcon) continue;
        const r = el.getBoundingClientRect();
        if (r.width < 4 || r.height < 4 || r.bottom < 0 || r.top > innerHeight) continue;
        const cs = getComputedStyle(el);
        if (+cs.opacity === 0) continue;
        out.push({
          text: (el.textContent || el.getAttribute('placeholder') || '').trim().slice(0, 40) || '(icon)',
          tag: el.tagName.toLowerCase(),
          color: cs.color,
          webkitFill: cs.webkitTextFillColor,
          fontSize: parseFloat(cs.fontSize),
          fontWeight: +cs.fontWeight,
          box: [Math.max(0, r.left), Math.max(0, r.top), Math.min(innerWidth, r.right), Math.min(innerHeight, r.bottom)],
          active: el.classList.contains('active'),
        });
      }
      return out;
    }, id);
    for (const it of items) {
      const m = it.color.match(/[\d.]+/g).map(Number);
      const gradientText = it.webkitFill && /rgba\(0, 0, 0, 0\)|transparent/.test(it.webkitFill);
      const [x0, y0, x1, y1] = it.box.map(Math.round);
      const px = [];
      for (let y = y0; y < y1; y += 2)
        for (let x = x0; x < x1; x += 2) {
          const i = (y * info.width + x) * 3;
          px.push([data[i], data[i + 1], data[i + 2]]);
        }
      if (!px.length) continue;
      const alpha = m[3] ?? 1;
      const fg0 = m.slice(0, 3);
      const bgCandidates = px.filter((p) => dist(p, fg0) > 60);
      const pool = bgCandidates.length > px.length * 0.3 ? bgCandidates : px;
      const med = [0, 1, 2].map((c) => pool.map((p) => p[c]).sort((a, b) => a - b)[Math.floor(pool.length / 2)]);
      const fg = fg0.map((c, k) => Math.round(c * alpha + med[k] * (1 - alpha)));
      const large = it.fontSize >= 24 || (it.fontSize >= 18.66 && it.fontWeight >= 700);
      const need = it.text === '(icon)' ? 3 : large ? 3 : 4.5;
      const cr = +ratio(fg, med).toFixed(2);
      rows.push({
        section: id,
        text: it.text,
        tag: it.tag,
        fontSize: it.fontSize,
        fg: `rgb(${fg})`,
        bg: `rgb(${med})`,
        ratio: gradientText ? null : cr,
        required: need,
        pass: gradientText ? null : cr >= need,
        note: gradientText ? 'gradient text (background-clip:text): check by eye' : it.active ? 'active nav item' : undefined,
      });
    }
  }
  results[label] = rows;
  await context.close();
}
await browser.close();
fs.writeFileSync(outJson, JSON.stringify(results, null, 2));
for (const [label, rows] of Object.entries(results)) {
  const fails = rows.filter((r) => r.pass === false);
  console.log(`${label}: ${rows.length} samples, ${fails.length} below threshold`);
  for (const f of fails) console.log(`  ${f.section} ${f.tag} "${f.text}" ${f.ratio}:1 (needs ${f.required}) fg ${f.fg} bg ${f.bg}`);
}
