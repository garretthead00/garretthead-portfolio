# garretthead-portfolio

Garrett Head's personal portfolio: a React single-page site served from GitHub Pages at https://garretthead00.github.io/garretthead-portfolio/.

## Stack

- Vite 8, React 19.3, TypeScript 7 (strict, `noUncheckedIndexedAccess`), Node 26 (`.nvmrc`; `engines` allows 24+).
- Tailwind CSS 4 via `@tailwindcss/vite`. Theme tokens live in `@theme` in `src/index.css`; there is no `tailwind.config.js`. Colors are the official LSU palette only (`corporate-purple`, `lsu-purple`, `light-purple`, `lsu-gold`, `corporate-gold`, `light-gold`, `light-gray`, `white`); fonts are `font-display` (Orbitron: name, section titles, company names), `font-sans` (Inter) and `font-mono` (JetBrains Mono 500: labels, dates, tech). Fonts are self-hosted from Fontsource, Latin subset only, declared with `@font-face` in `src/index.css` next to size-matched local fallbacks (Capsize values); only Orbitron is preloaded (`preloadDisplayFont` in `vite.config.ts`). No Google Fonts. Shared classes (`.eyebrow`, `.section-title`, `.tech-label`, `.card`, `.container-page`) are in `@layer components` and can't take variants, so use plain utilities for responsive changes.
- Vitest (`npm test`) runs the résumé content contract and page-metadata checks in `src/content/content.test.ts` and the motion rules in `src/components/motion/motionPreference.test.ts`.
- Playwright (`e2e/`, shared helpers in `helpers.ts`) tests the production build and starts `npm run preview` itself, so build first. `a11y.e2e.ts` (axe, Chrome only): no WCAG 2.2 AA violations at 320, 390, 768 and 1440 px, skip link focus, a non-color active-nav marker, focused elements never hidden behind the header or phone tab bar (2.4.11). `smoke.e2e.ts` (Chrome, Firefox, WebKit): no errors or failed requests, no sideways scrolling, every section shown, nav marks the section jumped to, Reduce motion toggle persists. Chrome uses the installed browser (`channel: "chrome"`); Firefox and WebKit are downloaded in CI only. `BASE_URL` points the tests at the live site instead.
- Lighthouse (`npm run check:lighthouse`, `scripts/lighthouse.ts`) serves `dist/` gzipped and fails below accessibility, best practices and SEO 100 or performance 90 (mobile and desktop); under 95 performance it only warns.
- Images: `vite-imagetools` turns `src/assets/images/TigerLogo.png` into AVIF and WebP at several widths (`?w=…&format=avif;webp&as=picture`, typed in `src/images.d.ts`), rendered by `Picture`. Never import a raw PNG or JPEG into a component. App icons in `public/` are square, palette-compressed PNGs made from the same source.
- Prerender: `npm run build` also builds `src/entry-server.tsx` for Node and `scripts/prerender.ts` writes the rendered page into `dist/index.html`; `main.tsx` hydrates it (`createRoot` only on the empty dev page). Anything read from the browser (storage, media queries, dates) must render the same on the server and on first client render: use `useSyncExternalStore` with a server snapshot.
- Budgets: `npm run check:budgets` (`scripts/check-budgets.ts`) fails if the first visit needs more than 90 KB of gzip JavaScript or 400 KB in total.
- Head: the title, description, canonical URL, Open Graph and Twitter tags and Person JSON-LD come from `src/content/site.ts` and `profile.ts` via `src/seo/headTags.ts` and the `siteHead` plugin in `vite.config.ts`; never hardcode them in `index.html`. The share image is `public/og-image.jpg` (1200×630).
- Security: the build adds a Content-Security-Policy `<meta>` (`contentSecurityPolicy` in `vite.config.ts`): only same-origin scripts, fonts, images and connections; inline styles allowed for Motion's prerendered style attributes. Anything new loaded from another origin needs a policy change. Dependabot (`.github/dependabot.yml`) opens weekly update PRs.
- Motion 14 (`motion/react`). `MotionProvider` (in `Root.tsx`) loads `domAnimation` through `LazyMotion` in strict mode, as a separate chunk after hydration (`features.ts`), to keep the initial JavaScript under budget. Reduced motion follows the system setting until the footer's `ReduceMotionToggle` overrides it (saved in `localStorage` as `motion-preference`); the result goes to `MotionConfig reducedMotion` and to `<html data-motion>`, which gates smooth scrolling.
- ESLint 9 flat config (`eslint.config.js`): typescript-eslint type-checked rules, react-hooks, react-refresh, jsx-a11y; `eslint-config-prettier` turns off rules Prettier owns.
- Prettier 3 (`prettier.config.js`) with `prettier-plugin-tailwindcss` for class order. `docs/` is not formatted.
- Vite `base` is `/garretthead-portfolio/`. Keep it: the live URL must not change.
- Deploys: GitHub Actions (`.github/workflows/deploy.yml`) runs format, lint, unit tests, build (which type-checks and prerenders), the budgets, Playwright (Chrome, then smoke in Firefox and WebKit) and Lighthouse on every pull request and push. On pushes to `main` it commits `dist/` to the `gh-pages` branch, which GitHub Pages serves ("Deploy from a branch"). Never edit `gh-pages` by hand; there is no manual deploy script. `.github/workflows/live-check.yml` runs the smoke tests against the live site after each deploy, weekly and on demand.

## Commands

| Command                    | Use                                                        |
| -------------------------- | ---------------------------------------------------------- |
| `npm run dev`              | Dev server at http://localhost:5173/garretthead-portfolio/ |
| `npm run typecheck`        | Type-check with TypeScript 7                               |
| `npm test`                 | Content-contract and motion-rule tests (Vitest)            |
| `npm run test:e2e`         | Accessibility and smoke tests on the build (Chrome)        |
| `npm run test:browsers`    | The same, plus smoke tests in Firefox and WebKit           |
| `npm run lint`             | ESLint                                                     |
| `npm run format`           | Prettier, with Tailwind class sorting                      |
| `npm run format:check`     | Check formatting                                           |
| `npm run build`            | Type-check, build and prerender to `dist/`                 |
| `npm run check:budgets`    | Check first-visit JS and total size against the budgets    |
| `npm run check:lighthouse` | Lighthouse scores (mobile and desktop) on the build        |
| `npm run preview`          | Serve the production build                                 |

Two TypeScript versions are installed on purpose. `typescript-7` (an npm alias of TypeScript 7) does the type-checking; `typescript` stays on 6.0 because typescript-eslint and editors need its JavaScript API, which TypeScript 7 no longer ships. Use `npm run typecheck`, never `npx tsc` (that runs 6.0).

Run `npm run format`, then `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run check:budgets`, `npm run test:e2e` and `npm run check:lighthouse` before every commit. All must pass. Firefox and WebKit run in CI.

## Project layout

- `src/main.tsx`: browser entry (hydrates). `src/entry-server.tsx`: build-time render. `src/Root.tsx`: the tree both render. `src/App.tsx`: skip link, header, `<main>` (Hero, About, Experience), footer, phone tab bar.
- `src/content/`: all copy and résumé data as typed data (no JSX, no classes): `profile.ts`, `site.ts` (canonical URL, title, description, share image), `skills.ts`, `experience.ts`, `sections.ts` (feeds the nav and active-section tracking), `types.ts`, `resume.snapshot.json` (company, title, start, end per role) and `content.test.ts`.
- `src/features/<Section>/`: Hero, About, Experience (with `RoleCard`).
- `src/components/`: `Icon` (inline stroke icons), `Picture` (responsive `<picture>`), `SocialLinks`, `TechLabels`, `layout/` (`Section`, `SiteFooter`), `navigation/` (`SiteHeader` from `md` up, `MobileNav` below `md`), `motion/` (`MotionProvider`, `features`, `Reveal`, `ReduceMotionToggle`, `motionPreference`, `variants` with `motionRules`).
- `src/seo/headTags.ts`: builds the head tags from content.
- `scripts/`: `prerender.ts`, `check-budgets.ts` and `lighthouse.ts`, run by Node directly (type stripping).
- `src/hooks/useActiveSection.ts`: one IntersectionObserver that marks the nav link for the section in view with `aria-current="location"`.
- `e2e/`: Playwright accessibility and smoke tests (`*.e2e.ts`; Vitest only runs `*.test.ts`).
- `docs/accessibility/checklist.md`: Phase 5 manual screen-reader, keyboard and display-settings passes, signed off by Garrett.
- `docs/baseline/`: Phase 0 measurements of the original site. Don't edit except to correct facts.

## Code quality

Claude may create and edit files in this project without asking, so every change has to meet this bar on its own:

- **Types:** strict TypeScript. No `any`, no `@ts-ignore` or `@ts-expect-error`, no non-null `!` assertions; narrow with type guards instead. Props get a named `interface` or `type`. Content types live with the content in `src/content/`.
- **Components:** function components, one job each, named exports for feature components. Keep data out of JSX: content belongs in `src/content/`, not inline strings.
- **Lists:** `key` goes on the element returned by `map()` and uses a stable id from the data, never the array index.
- **Accessibility:** WCAG 2.2 AA. Semantic, native elements first (`button`, `a`, `nav`, `ul`), meaningful `alt` text, accessible names on icon-only links and buttons. Don't signal state with color alone (the active nav link is underlined). Text and UI pairs need 4.5:1 and 3:1; borders that identify a control use full `light-purple`, not a faded one. Support `forced-colors` (outline gold pills, no blend modes that hide images) and `prefers-contrast: more` (`contrast-more:` raises faint borders and footer text). jsx-a11y warnings are errors.
- **Animation:** wrap entrance animations in `Reveal` (`as`, `delay`, `amount`); it plays once. Keep to `motionRules`: 150–400 ms, ease-out, at most 24 px of travel, at most 60 ms between staggered items, and hover effects only for devices that can hover (Tailwind 4's `hover:` already does this). Use `m.*` from `motion/react`, never `motion.*` (strict `LazyMotion` throws).
- **Styling:** Tailwind utilities; reuse the `@theme` colors and fonts in `src/index.css` rather than new arbitrary values.
- **No leftovers:** no dead code, commented-out code, unused imports or files, `console.log` or debugging output.
- **Comments:** only for what the code can't say (a workaround, a constraint, a link to the reason). Keep them current.
- **Scope:** change only what the task needs, follow the existing patterns, and keep commits small, focused and described in the imperative.
- **Checks:** `npm run format`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run check:budgets`, `npm run test:e2e` and `npm run check:lighthouse` pass before every commit.

## Upgrade plan

The site is being upgraded in phases (full plan: the "Portfolio Architecture & Technical Review" doc). Phases 0 (baseline), 1 (toolchain), 2 (Tailwind 4 + Motion 14), 3 (redesign and content refresh), 4 (motion and UX), 5 (accessibility), 6 (performance) and 7 (QA and launch) are done; v2.0.0 is the launch release.

The approved design is the "Portfolio Redesign — Phase 3" canvas. Changes should match it at 390, 768 and 1440 px wide unless Garrett asks for something different.

## Git and pull requests

- Commits are authored and committed as `Garrett Head <garretthead@Garretts-MacBook-Pro.local>`.
- All credit goes to Garrett. Never mention Claude, AI or any assistant in commit messages, PR titles or descriptions, PR comments, code comments or docs. No co-author trailers, no "Generated with" lines, no session links.
- One branch and one PR per phase or fix, branched from the latest `main`. Never commit or push to `main` directly.
- Garrett approves the finished code before anything is pushed. After approval: push, open the PR, keep its title and description current. **Garrett merges; never merge a PR.**
- Before pushing, check `main` with `git ls-remote origin main`; Garrett may have merged in the meantime.
- After opening or editing a PR, re-read its description from GitHub and make sure it contains only the text you wrote.

## Content rules

- Employment facts come from Garrett's résumé; don't invent roles, dates, metrics or technologies. Keep the résumé's qualified wording ("reported") for metrics.
- Exactly five roles, March 2021 to present (FloorFound, Engine, CoPilot, Ping Identity, MURAL). Current title: Senior Software Engineer. Each role links to the company's LinkedIn page. Update `resume.snapshot.json` together with any role change; the content test fails otherwise.
- No earlier employers, education block, Projects section, contact form or résumé download.
- Social links are LinkedIn (https://www.linkedin.com/in/garretthead) and GitHub (https://github.com/garretthead00) only.
- About is written in first person. Technologies are text labels, not icons.
- Keep the tiger brand: tiger mark, LSU purple and gold.
