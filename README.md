# Garrett Head — Portfolio

Personal portfolio of Garrett Head, Senior Software Engineer. Live at **https://garretthead00.github.io/garretthead-portfolio/**.

A single page with three sections (Home, About, Experience), in LSU purple and gold with the tiger mark. It's prerendered at build time, works without JavaScript, meets WCAG 2.2 AA, and loads in about 250 KB.

## Stack

- **React 19** and **TypeScript 7** (strict), built with **Vite 8**, prerendered with `react-dom/server`
- **Tailwind CSS 4** (theme tokens in `src/index.css`; official LSU palette only)
- **Motion 14** for entrance animations, with a visitor-controlled "Reduce motion" toggle
- **vite-imagetools** for AVIF/WebP images; self-hosted **Fontsource** fonts (Inter, Orbitron, JetBrains Mono)
- **Vitest**, **Playwright** + **axe-core** and **Lighthouse** for tests and quality gates
- **GitHub Actions** and **GitHub Pages** for CI, deploys and live checks

## Getting started

Requires Node.js 24 or newer (26 recommended; see `.nvmrc`).

```sh
npm install
npm run dev   # http://localhost:5173/garretthead-portfolio/
```

## Scripts

| Command                    | What it does                                                        |
| -------------------------- | ------------------------------------------------------------------- |
| `npm run dev`              | Start the dev server                                                |
| `npm run build`            | Type-check, build and prerender the site into `dist/`               |
| `npm run preview`          | Serve the production build locally                                  |
| `npm run typecheck`        | Type-check only (TypeScript 7)                                      |
| `npm run lint`             | Lint with ESLint (TypeScript, React Hooks, React Refresh, jsx-a11y) |
| `npm run format`           | Format with Prettier (sorts Tailwind classes)                       |
| `npm run format:check`     | Check formatting without writing                                    |
| `npm test`                 | Content, metadata and motion-rule unit tests (Vitest)               |
| `npm run check:budgets`    | Check the build against the size budgets                            |
| `npm run check:lighthouse` | Run Lighthouse (mobile and desktop) against the build               |
| `npm run test:e2e`         | Accessibility and smoke tests on the build in Chrome                |
| `npm run test:browsers`    | The same, plus smoke tests in Firefox and WebKit                    |

`build` must run before `check:budgets`, `check:lighthouse`, `test:e2e` and `test:browsers`. The Chrome tests and Lighthouse use your installed Google Chrome; `test:browsers` also needs `npx playwright install firefox webkit` once.

## Project structure

```
src/
  content/          All copy and résumé data, as typed data (profile, skills, experience, site metadata)
  features/         Hero, About, Experience (RoleCard)
  components/       Picture, Icon, SocialLinks, TechLabels, layout/, navigation/, motion/
  hooks/            useActiveSection (marks the nav link for the section in view)
  seo/              Head tags (title, description, Open Graph, structured data) built from content
  main.tsx          Browser entry: hydrates the prerendered page
  entry-server.tsx  Build-time render
scripts/            prerender.ts, check-budgets.ts, lighthouse.ts (run by Node directly)
e2e/                Playwright accessibility and smoke tests
public/             Icons, share image, manifest, sitemap
docs/               Phase 0 baseline and the accessibility checklist
```

## Updating content

Everything on the page comes from `src/content/`. When a role changes, update `experience.ts` and `resume.snapshot.json` together; `npm test` checks that the roles, dates and links match the résumé. The page title, description and link-preview tags come from `profile.ts` and `site.ts`.

## Quality gates

Every pull request runs, in order: formatting, lint, unit tests, type-check and build, size budgets, Playwright + axe in Chrome, smoke tests in Firefox and WebKit, and Lighthouse.

| Gate                            | Requirement                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------- |
| Initial JavaScript              | ≤ 90 KB gzip                                                                    |
| First visit, all assets         | ≤ 400 KB                                                                        |
| Lighthouse (mobile and desktop) | Accessibility, best practices and SEO 100; performance ≥ 90 (target 95)         |
| axe-core                        | No WCAG 2.2 AA violations at 320, 390, 768 and 1440 px                          |
| Smoke (Chrome, Firefox, WebKit) | No errors or failed requests, no sideways scrolling, nav and motion toggle work |

Manual screen-reader and display-settings passes are in `docs/accessibility/checklist.md`.

## TypeScript versions

Type-checking uses TypeScript 7 (installed as `typescript-7`). `typescript-eslint` doesn't support TypeScript 7 yet, so the `typescript` package stays on 6.0 for ESLint and editors. Use `npm run typecheck`, not `npx tsc`, which runs 6.0.

## Deploy and monitoring

- **Deploy:** on every push to `main`, `.github/workflows/deploy.yml` runs the quality gates and then commits `dist/` to the `gh-pages` branch, which GitHub Pages serves (Settings → Pages → **Deploy from a branch**, `gh-pages`, `/ (root)`). Don't edit `gh-pages` by hand.
- **Live check:** `.github/workflows/live-check.yml` runs the smoke tests against the live site after each deploy, every Monday, and on demand. A failed run emails the repository owner.
- **Security:** a Content-Security-Policy `<meta>` tag (Pages can't send headers) and weekly Dependabot updates.
- **Releases:** versions are tagged `vX.Y.Z` on `main`.
