# Phase 0 baseline — live portfolio, November 17, 2026

This is the "before" picture for the 2026 upgrade (branch `upgrade/2026`). Every later phase is measured against it.

- **What was measured:** the deployed `gh-pages` build (commit `90d89c4`, Jan 22 2025), which is the build serving <https://garretthead00.github.io/garretthead-portfolio/>. It was built from `main` at `290597b`.
- **How:**
  - **Lab:** headless Chrome (Playwright) replaying the deployed build from a local GitHub-Pages-style server (gzip, same base path), three runs per profile, median reported.
  - **Live:** the same page opened in a real browser on a normal connection.
  - **Accessibility:** DOM checks, keyboard walk-through, the browser accessibility tree, and pixel-sampled contrast.

## Scorecard against the upgrade budgets

| Metric | Budget (plan §13) | Baseline | Status |
|---|---|---|---|
| LCP, mobile lab (390×844, 4× CPU, 1.6 Mbps / 150 ms) | ≤ 2.0 s | **19.4 s** (tiger PNG) | ❌ |
| LCP, desktop lab (1366×768, 10 Mbps / 40 ms) | ≤ 2.0 s | **3.3 s** (tiger PNG) | ❌ |
| LCP, live (Mac, ~10 Mbps / 100 ms) | ≤ 2.0 s | 2.0 s (tiger PNG) | ⚠️ borderline |
| CLS, mobile lab | ≤ 0.05 | **0.136** | ❌ |
| CLS, desktop lab / live | ≤ 0.05 | 0.054 / 0.003 | ⚠️ / ✅ |
| Blocking time (long tasks after FCP) | — | 0 ms | ✅ |
| Initial JS, gzip | ≤ 90 KB | **125.5 KB** | ❌ |
| Total transfer, first load | ≤ 400 KB | **3.88 MB** | ❌ |
| Keyboard access to navigation | all nav reachable | **0 of 4** nav links reachable | ❌ |
| Links/buttons without an accessible name | 0 | **10** | ❌ |
| Respects `prefers-reduced-motion` | yes | **no** (entrance and typing animations both ignore it) | ❌ |
| Layout holds at every matrix viewport | no overflow or overlap | **7 of 16** viewports have section overflow or covered controls | ❌ |

## 1. Performance

| Profile | FCP | LCP | LCP element | CLS | Fully loaded | Transfer |
|---|---|---|---|---|---|---|
| Mobile lab (median of 3) | 1.36 s | 19.39 s | `img` TigerLogo.png | 0.136 | 19.9 s | 3.88 MB |
| Desktop lab (median of 3) | 0.33 s | 3.31 s | `img` TigerLogo.png | 0.054 | 3.8 s | 3.88 MB |
| Live, real browser | 0.37 s | 2.04 s | `img` TigerLogo.png | 0.003 | — | 3.88 MB |

**Why:**
- **Two images make up 96% of the bytes.** `TigerLogo.png` (2.06 MB) is the LCP element, and the `Background.jpg` CSS background (1.63 MB) competes with it for bandwidth.
- **The tiger image is late.** React inserts it after the load event, with no width/height, so on mobile it also pushes the hero text down when it arrives — the likely source of most of the mobile CLS.
- **Third-party fonts.** The real site also loads a render-blocking Google Fonts stylesheet plus 9 font faces (Aldrich; Orbitron 400–700; Rajdhani 400–700). The lab replay blocked third-party requests, so font cost is excluded there and text renders in fallback fonts in the screenshots.

## 2. Bundle and assets

**JavaScript:** one chunk, `main.6dbd62ea.js` — 364 KB raw, 125.5 KB gzip. Composition, from the build's source maps:

| Package | Share | Minified KB | Fate in target |
|---|---|---|---|
| react-dom | 34.9% | 126.9 | upgraded (React 19.3) |
| framer-motion | 28.2% | 102.6 | `motion` 14 with `LazyMotion` |
| react-icons | 9.7% | 35.1 | per-icon imports via typed map |
| app source | 9.3% | 33.8 | rewritten (JSX in data inflates it) |
| react-scroll (+ lodash.throttle) | 7.9% | 28.8 | removed (native anchors) |
| react-type-animation | 2.2% | 7.9 | removed |
| react-countup + countup.js | 3.3% | 11.9 | removed |
| @emailjs/browser | 0.7% | 2.6 | removed |
| react-intersection-observer | 0.6% | 2.1 | removed (Motion `useInView`) |
| react, scheduler, prop-types, webpack runtime | 3.3% | 12.2 | — |

**Assets shipped:**

| File | Pixels | Bytes | Displayed at |
|---|---|---|---|
| TigerLogo.png | 1200×1250 | 2.01 MB | ≤ 482 px wide |
| Background.jpg | 3500×3500 | 1.60 MB | full-bleed background |
| logo512.png | 512×533 | 515 KB | PWA icon |
| Copilot.png | 437×437 | 144 KB | not rendered (imported by data, unused in UI) |
| logo192.png | 196×204 | 92 KB | PWA / apple-touch icon |
| lsu.png | 901×747 | 45 KB | 200 px wide (education block, to be removed) |
| InCentrik.png | 199×268 | 27 KB | not rendered |

## 3. Responsive layout

Screenshots: `screenshots/<viewport>--<section>.webp`. Every section was captured at 360×800, 390×844, 430×932, 844×390, 768×1024, 1024×768, 1366×768 and 1920×1080; the other viewports have the hero only. Text renders in fallback fonts (see above).

| Viewport | Problem found |
|---|---|
| 320×640 | About content is 89 px taller than its fixed-height section |
| 844×390 (phone landscape) | Hero content overflows by 184 px (the name is pushed off-screen); About by 20 px; Contact by 123 px; the fixed nav covers the **Send message** button |
| 1024×768 | Experience overflows its section by 149 px into Contact |
| 1280×720 | Experience overflows by 125 px |
| 1366×768 | Experience overflows by 101 px |
| 1536×864 | Experience overflows by 53 px |
| 360–430 portrait, 768/820 tablet portrait, 1920, 2560 | No overflow detected |

- **No horizontal scrolling** at any width. However, the root's `overflow: hidden` masks content that the 80 px slide-in animations park off-canvas.
- **Fixed-height sections.** All sections use `h-svh` / `lg:h-screen`, which is the root cause of the overflows.

## 4. Accessibility

- **Keyboard:**
  - The tab order is: Contact Me → LinkedIn → GitHub → four company links → three form fields → Send message, then back to the start.
  - The four bottom-nav links have no `href`, so they are **never reached by keyboard**.
  - The inputs use Tailwind v3 `outline-none` (a 2 px *transparent* outline), so focus is invisible apart from a border colour change.
- **Accessible names:**
  - 10 controls have no accessible name: 4 nav links, LinkedIn, GitHub, and 4 company arrow links.
  - "Contact Me" is a `<button>` that navigates.
- **Structure:**
  - There are no `main`, `header` or `footer` landmarks and no skip link.
  - Heading levels follow styling: an `h4` "Let's Geaux!" precedes the `h2` "Contact me", every role uses two `h4`s, and "Bachelor's in Computer Science" is a heading.
- **Forms:** name, email and message are labelled only by placeholders, and the email field is `type="text"`. (The form is removed in the target.)
- **Screen-reader output:** the years counters are announced as "yrs" with no number, and decorative tech-stack SVGs are exposed as unnamed images.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, the hero `h1` still starts at `opacity: 0; translateY(80px)` and animates in, and the typing loop keeps cycling ("E" → "Engin" → "I build things").
- **Contrast** (pixel-sampled, `contrast.json`):
  - The background renders as deep purple, so body text and gold headings pass comfortably (7–8:1 for gold headings).
  - **Failures:** white text on the gold gradient buttons, "Contact Me" (2.6:1) and "Send message" (2.5:1); 4.5:1 is required.
  - **Borderline:** inactive nav icons at 4.2–4.4:1 pass the 3:1 non-text minimum.
  - **Manual check:** gradient text ("Contact me", counter numbers) can't be measured automatically and needs a check by eye.
- **Not run:** an automated axe-core scan of the live page (injecting the third-party axe script wasn't permitted in this session). The checks above cover the same high-impact rules. Phase 7 adds `@axe-core/playwright` to CI against the built site.

## 5. Content vs. résumé

Compared with `senior_full_stack_resume.md` and `linkedin_profile_experience.md`:

| Area | Live site | Résumé / decisions |
|---|---|---|
| Experience summary | "Senior Software Engineer with 8+ years"; counters 8 / 6 / 4 / 5 yrs | 13 years of web development; Senior Lead Engineer is the current title |
| Roles shown | Copilot (1 yr), Ping Identity (1.5 yrs), MURAL (1.5 yrs), Incentrik (4 yrs) | FloorFound (Feb–Nov 2026), Engine (Jan 2025–Feb 2026), CoPilot (Mar 2024–Jan 2025, ~11 mo), Ping Identity (Jun 2022–Mar 2024, ~1 yr 10 mo), MURAL (Mar 2021–Jun 2022, ~1 yr 4 mo) |
| Pre-2021 roles | Incentrik shown | Excluded |
| Skills | React, VueJS, CSS3, TailwindCSS, NodeJS, ExpressJS, GraphQL, MongoDB, SQL | Four Core Skills groups led by TypeScript, Next.js, React Native, Node.js, GraphQL, Prisma, PostgreSQL, Claude/RAG |
| Education | LSU logo + "Bachelor's in Computer Science" | Removed from the site |
| Contact | EmailJS form + "Contact Me" button | Removed; LinkedIn and GitHub links only |
| Company name | "Copilot" | "CoPilot" |

## Files

| Path | Contents |
|---|---|
| `data/lab.json` | Lab performance runs, per-viewport layout probes, keyboard order, reduced-motion samples, DOM checks, ARIA snapshot |
| `data/live.json` | Live timing, transfer sizes, fonts, accessibility-tree findings |
| `data/bundle.json` | File sizes (raw/gzip/brotli) and JS composition by package |
| `data/contrast.json` | Pixel-sampled contrast for every visible text element and nav icon |
| `screenshots/` | 40 WebP screenshots across 16 viewports |
| `tools/` | Scripts used to produce the data (see below) |

## Reproduce

The scripts need Node 22+, Google Chrome, and the `playwright`, `sharp` and `source-map` packages. They are not app dependencies yet; Phase 7 moves them into proper dev tooling.

```bash
git archive origin/gh-pages | tar -x -C /tmp/site            # deployed build
node tools/serve-static.mjs /tmp/site garretthead-portfolio 8080 &
node tools/bundle-report.mjs /tmp/site data/bundle.json
CHROME=$(which google-chrome) RUNS=3 node tools/lab-audit.mjs http://localhost:8080/garretthead-portfolio/ .
CHROME=$(which google-chrome) node tools/contrast-sample.mjs http://localhost:8080/garretthead-portfolio/ data/contrast.json
```

`lab-audit.mjs` writes `lab.json` and `screens/` into the output directory; they were moved to `data/` and `screenshots/` here.
