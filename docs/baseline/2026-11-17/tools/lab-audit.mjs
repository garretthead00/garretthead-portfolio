// Phase 0 baseline: lab audit of the deployed build with headless Chrome (Playwright).
// Usage: node lab-audit.mjs <baseUrl> <outDir>
// Env: PLAYWRIGHT_PATH (module path), SHARP_PATH (module path), CHROME (executable), RUNS (default 3)
//
// Produces <outDir>/lab.json and <outDir>/screens/*.webp:
//   - throttled performance runs (mobile + desktop): FCP, LCP (+element), CLS, long-task blocking time, bytes
//   - per-viewport layout checks (horizontal overflow, section overflow, nav overlap) and screenshots
//   - keyboard tab order, reduced-motion behaviour, DOM accessibility checks, ARIA snapshot
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const sharp = require(process.env.SHARP_PATH || 'sharp');

const [, , baseUrl, outDir] = process.argv;
const RUNS = Number(process.env.RUNS || 3);
const screensDir = path.join(outDir, 'screens');
fs.mkdirSync(screensDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME || undefined,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

// The sandbox has no internet: abort third-party requests (Google Fonts) instead of letting them hang.
async function blockThirdParty(context) {
  const origin = new URL(baseUrl).origin;
  await context.route('**/*', (route) =>
    route.request().url().startsWith(origin) ? route.continue() : route.abort('internetdisconnected'),
  );
}

const SECTIONS = ['home', 'about', 'resume', 'contact'];

// ---------- performance ----------
const PROFILES = {
  mobile: {
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    cpu: 4,
    net: { latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 },
  },
  desktop: {
    viewport: { width: 1366, height: 768 },
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    cpu: 1,
    net: { latency: 40, downloadThroughput: (10 * 1024 * 1024) / 8, uploadThroughput: (10 * 1024 * 1024) / 8 },
  },
};

const vitalsInit = () => {
  window.__vitals = { lcp: null, lcpEl: null, cls: 0, fcp: null, longTasks: [] };
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) {
      window.__vitals.lcp = e.startTime;
      const el = e.element;
      window.__vitals.lcpEl = el ? `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''} ${(el.getAttribute('src') || el.textContent || '').slice(0, 60)}` : null;
    }
  }).observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) if (!e.hadRecentInput) window.__vitals.cls += e.value;
  }).observe({ type: 'layout-shift', buffered: true });
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) if (e.name === 'first-contentful-paint') window.__vitals.fcp = e.startTime;
  }).observe({ type: 'paint', buffered: true });
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) window.__vitals.longTasks.push({ start: e.startTime, duration: e.duration });
  }).observe({ type: 'longtask', buffered: true });
};

async function perfRun(name, p) {
  const context = await browser.newContext({
    viewport: p.viewport,
    deviceScaleFactor: p.deviceScaleFactor,
    isMobile: p.isMobile,
    hasTouch: p.hasTouch,
  });
  await blockThirdParty(context);
  const page = await context.newPage();
  await page.addInitScript(vitalsInit);
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Network.emulateNetworkConditions', { offline: false, ...p.net });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: p.cpu });
  const bytes = {};
  const reqType = {};
  cdp.on('Network.responseReceived', (e) => (reqType[e.requestId] = { type: e.type, url: e.response.url }));
  cdp.on('Network.loadingFinished', (e) => {
    const t = reqType[e.requestId]?.type || 'Other';
    bytes[t] = (bytes[t] || 0) + e.encodedDataLength;
  });
  const t0 = Date.now();
  await page.goto(baseUrl, { waitUntil: 'load', timeout: 120000 });
  const loadMs = Date.now() - t0;
  // React inserts the images after the load event, so wait for the network to go quiet
  // (all images downloaded) before reading LCP; otherwise a late, larger LCP is missed.
  await page.waitForLoadState('networkidle', { timeout: 120000 }).catch(() => {});
  const fullyLoadedMs = Date.now() - t0;
  await page.waitForTimeout(1500);
  const v = await page.evaluate(() => window.__vitals);
  const tbt = v.longTasks.filter((t) => v.fcp == null || t.start >= v.fcp).reduce((a, t) => a + Math.max(0, t.duration - 50), 0);
  await context.close();
  return {
    profile: name,
    fcpMs: Math.round(v.fcp),
    lcpMs: Math.round(v.lcp),
    lcpElement: v.lcpEl,
    cls: +v.cls.toFixed(4),
    blockingTimeMs: Math.round(tbt),
    loadEventMs: loadMs,
    fullyLoadedMs,
    transferBytes: bytes,
    transferTotal: Object.values(bytes).reduce((a, b) => a + b, 0),
  };
}

const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];
const perf = {};
for (const [name, p] of Object.entries(PROFILES)) {
  const runs = [];
  for (let i = 0; i < RUNS; i++) runs.push(await perfRun(name, p));
  perf[name] = {
    runs,
    median: {
      fcpMs: median(runs.map((r) => r.fcpMs)),
      lcpMs: median(runs.map((r) => r.lcpMs)),
      cls: median(runs.map((r) => r.cls)),
      blockingTimeMs: median(runs.map((r) => r.blockingTimeMs)),
      transferTotal: median(runs.map((r) => r.transferTotal)),
      fullyLoadedMs: median(runs.map((r) => r.fullyLoadedMs)),
    },
  };
  console.log(name, JSON.stringify(perf[name].median), runs[0].lcpElement);
}

// ---------- responsive layout + screenshots ----------
const VIEWPORTS = [
  ['320x640', 320, 640, true],
  ['360x800', 360, 800, true],
  ['375x812', 375, 812, true],
  ['390x844', 390, 844, true],
  ['412x915', 412, 915, true],
  ['414x896', 414, 896, true],
  ['430x932', 430, 932, true],
  ['844x390-landscape', 844, 390, true],
  ['768x1024', 768, 1024, true],
  ['820x1180', 820, 1180, true],
  ['1024x768', 1024, 768, true],
  ['1280x720', 1280, 720, false],
  ['1366x768', 1366, 768, false],
  ['1536x864', 1536, 864, false],
  ['1920x1080', 1920, 1080, false],
  ['2560x1440', 2560, 1440, false],
];
// Every section is captured at these sizes; the rest get the hero only.
const FULL_SET = new Set(['360x800', '390x844', '430x932', '844x390-landscape', '768x1024', '1024x768', '1366x768', '1920x1080']);

const layoutProbe = (ids) => {
  const vw = window.innerWidth;
  const de = document.documentElement;
  const offenders = [...document.querySelectorAll('body *')]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.right > vw + 1 || r.left < -1);
    })
    .slice(0, 8)
    .map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 3).join('.')}`);
  const sections = ids.map((id) => {
    const s = document.getElementById(id);
    if (!s) return { id, missing: true };
    const r = s.getBoundingClientRect();
    let bottom = r.top;
    s.querySelectorAll('*').forEach((c) => {
      const cr = c.getBoundingClientRect();
      if (cr.height > 0) bottom = Math.max(bottom, cr.bottom);
    });
    return { id, height: Math.round(r.height), contentHeight: Math.round(bottom - r.top), overflowPx: Math.max(0, Math.round(bottom - r.bottom)) };
  });
  return { scrollWidth: de.scrollWidth, innerWidth: vw, horizontalOverflowElements: offenders, sections };
};

// When the page is scrolled to the bottom, does the fixed nav cover any interactive element?
const navOverlapProbe = () => {
  const nav = document.querySelector('nav');
  if (!nav) return null;
  const n = nav.firstElementChild?.firstElementChild?.getBoundingClientRect() || nav.getBoundingClientRect();
  return [...document.querySelectorAll('a, button, input, textarea')]
    .filter((el) => !nav.contains(el))
    .filter((el) => {
      const r = el.getBoundingClientRect();
      return r.bottom > n.top && r.top < n.bottom && r.right > n.left && r.left < n.right;
    })
    .map((el) => `${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('placeholder') || '').trim().slice(0, 30)}"`);
};

const responsive = {};
for (const [label, width, height, mobile] of VIEWPORTS) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  await blockThirdParty(context);
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: 'load' });
  await page.waitForTimeout(3500); // let entrance animations finish
  const shots = [];
  const capture = async (name) => {
    const file = path.join(screensDir, `${label}--${name}.webp`);
    await sharp(await page.screenshot()).webp({ quality: 70 }).toFile(file);
    shots.push(path.basename(file));
  };
  await capture('home');
  const layout = await page.evaluate(layoutProbe, SECTIONS);
  if (FULL_SET.has(label)) {
    for (const id of SECTIONS.slice(1)) {
      await page.evaluate((i) => document.getElementById(i)?.scrollIntoView({ block: 'start' }), id);
      await page.waitForTimeout(2500);
      await capture(id);
    }
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(2000);
  const navOverlapAtBottom = await page.evaluate(navOverlapProbe);
  responsive[label] = { ...layout, navOverlapAtBottom, screenshots: shots };
  console.log(label, `scrollW=${layout.scrollWidth}`, layout.sections.map((s) => `${s.id}:+${s.overflowPx}`).join(' '), navOverlapAtBottom);
  await context.close();
}

// ---------- keyboard, reduced motion, DOM a11y ----------
const context = await browser.newContext({ viewport: { width: 1366, height: 768 } });
await blockThirdParty(context);
const page = await context.newPage();
await page.goto(baseUrl, { waitUntil: 'load' });
await page.waitForTimeout(2000);

const tabOrder = [];
for (let i = 0; i < 20; i++) {
  await page.keyboard.press('Tab');
  tabOrder.push(
    await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return '(body)';
      const name = el.getAttribute('aria-label') || el.textContent?.trim() || el.getAttribute('placeholder') || '';
      return `${el.tagName.toLowerCase()}${el.getAttribute('href') ? `[href=${el.getAttribute('href')}]` : ''} "${name.slice(0, 40)}"`;
    }),
  );
}
const focusVisible = await page.evaluate(() => {
  const el = document.querySelector('input');
  if (!el) return null;
  el.focus();
  const cs = getComputedStyle(el);
  return { outlineStyle: cs.outlineStyle, outlineWidth: cs.outlineWidth, boxShadow: cs.boxShadow };
});

const navReachable = await page.evaluate(() =>
  [...document.querySelectorAll('nav a')].map((a) => ({ hasHref: a.hasAttribute('href'), tabIndex: a.tabIndex, name: a.getAttribute('aria-label') || a.textContent.trim() })),
);

const domA11y = await page.evaluate(() => {
  const accName = (el) =>
    (el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent || [...el.querySelectorAll('img')].map((i) => i.alt).join(' ')).trim();
  return {
    lang: document.documentElement.lang,
    title: document.title,
    landmarks: Object.fromEntries(['header', 'nav', 'main', 'footer'].map((t) => [t, document.querySelectorAll(t).length])),
    headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => `${h.tagName.toLowerCase()}: ${h.textContent.trim().slice(0, 50)}`),
    unnamedLinksOrButtons: [...document.querySelectorAll('a, button')].filter((el) => !accName(el)).map((el) => el.outerHTML.slice(0, 120)),
    images: [...document.querySelectorAll('img')].map((i) => ({ src: i.getAttribute('src')?.split('/').pop(), alt: i.getAttribute('alt') })),
    formFieldsWithoutLabel: [...document.querySelectorAll('input, textarea, select')]
      .filter((f) => !(f.labels && f.labels.length) && !f.getAttribute('aria-label') && !f.getAttribute('aria-labelledby'))
      .map((f) => `${f.tagName.toLowerCase()}[name=${f.name}] placeholder="${f.placeholder}"`),
    skipLink: !!document.querySelector('a[href="#main"], a[href="#content"]'),
  };
});

let ariaSnapshot = null;
try {
  ariaSnapshot = await page.locator('body').ariaSnapshot();
} catch (e) {
  ariaSnapshot = `unavailable: ${e.message}`;
}
await context.close();

// Reduced motion: does anything still animate when the OS asks for less motion?
const rmContext = await browser.newContext({ viewport: { width: 1366, height: 768 }, reducedMotion: 'reduce' });
await blockThirdParty(rmContext);
const rm = await rmContext.newPage();
await rm.goto(baseUrl, { waitUntil: 'domcontentloaded' });
const sample = () =>
  rm.evaluate(() => {
    const h1 = document.querySelector('h1');
    const typed = document.querySelector('.text-accent');
    return { h1Opacity: h1 ? getComputedStyle(h1).opacity : null, h1Transform: h1 ? getComputedStyle(h1).transform : null, typedText: typed?.textContent };
  });
await rm.waitForTimeout(150);
const rmEarly = await sample();
await rm.waitForTimeout(2500);
const rmLate = await sample();
await rm.waitForTimeout(4000);
const rmLater = await sample();
await rmContext.close();

const reducedMotion = {
  early: rmEarly,
  late: rmLate,
  later: rmLater,
  entranceAnimationIgnoresPreference: rmEarly.h1Opacity !== rmLate.h1Opacity || rmEarly.h1Transform !== rmLate.h1Transform,
  typingLoopIgnoresPreference: rmLate.typedText !== rmLater.typedText,
};

await browser.close();

const result = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  note: 'Local replay of the deployed gh-pages build. Third-party requests (Google Fonts) were blocked, so text renders in fallback fonts and font cost is excluded; see live checks.',
  performance: perf,
  responsive,
  keyboard: { tabOrder, navLinks: navReachable, inputFocusStyle: focusVisible },
  reducedMotion,
  domA11y,
  ariaSnapshot,
};
fs.writeFileSync(path.join(outDir, 'lab.json'), JSON.stringify(result, null, 2));
console.log(JSON.stringify({ keyboard: result.keyboard.tabOrder.slice(0, 10), reducedMotion, domA11y }, null, 2));
