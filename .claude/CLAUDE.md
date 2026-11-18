# garretthead-portfolio

Garrett Head's personal portfolio: a React single-page site served from GitHub Pages at https://garretthead00.github.io/garretthead-portfolio/.

## Stack

- Vite 8, React 19.3, TypeScript 7 (strict, `noUncheckedIndexedAccess`), Node 26 (`.nvmrc`; `engines` allows 24+).
- Tailwind CSS 3.4 via PostCSS (moves to 4.x in Phase 2), framer-motion 11 (moves to `motion/react` 14 in Phase 2).
- ESLint 9 flat config (`eslint.config.js`): typescript-eslint type-checked rules, react-hooks, react-refresh, jsx-a11y; `eslint-config-prettier` turns off rules Prettier owns.
- Prettier 3 (`prettier.config.js`) with `prettier-plugin-tailwindcss` for class order. `docs/` is not formatted.
- Vite `base` is `/garretthead-portfolio/`. Keep it: the live URL must not change.
- Deploys: GitHub Actions (`.github/workflows/deploy.yml`) runs format, lint, type-check and build on every pull request and push. On pushes to `main` it commits `dist/` to the `gh-pages` branch, which GitHub Pages serves ("Deploy from a branch"). Never edit `gh-pages` by hand; there is no manual deploy script.

## Commands

| Command                | Use                                                        |
| ---------------------- | ---------------------------------------------------------- |
| `npm run dev`          | Dev server at http://localhost:5173/garretthead-portfolio/ |
| `npm run typecheck`    | Type-check with TypeScript 7                               |
| `npm run lint`         | ESLint                                                     |
| `npm run format`       | Prettier, with Tailwind class sorting                      |
| `npm run format:check` | Check formatting                                           |
| `npm run build`        | Type-check, then build to `dist/`                          |
| `npm run preview`      | Serve the production build                                 |

Two TypeScript versions are installed on purpose. `typescript-7` (an npm alias of TypeScript 7) does the type-checking; `typescript` stays on 6.0 because typescript-eslint and editors need its JavaScript API, which TypeScript 7 no longer ships. Use `npm run typecheck`, never `npx tsc` (that runs 6.0).

Run `npm run format`, then `npm run lint`, `npm run typecheck` and `npm run build` before every commit. All must pass.

## Project layout

- `src/main.tsx`: entry point. `src/App.tsx`: page composition.
- `src/features/<Section>/`: page sections (Banner, About, Resume, Contact) and their components.
- `src/components/`: shared components (NavBar).
- `src/data/index.tsx`: site content and its types (`Role`, `TechItem`, `Education`).
- `src/common/transitions.ts`: shared animation variants.
- `docs/baseline/`: Phase 0 measurements of the original site. Don't edit except to correct facts.

## Code quality

Claude may create and edit files in this project without asking, so every change has to meet this bar on its own:

- **Types:** strict TypeScript. No `any`, no `@ts-ignore` or `@ts-expect-error`, no non-null `!` assertions; narrow with type guards instead. Props get a named `interface` or `type`. Content types live with the content in `src/data/`.
- **Components:** function components, one job each, named exports for feature components. Keep data out of JSX: content belongs in `src/data/`, not inline strings.
- **Lists:** `key` goes on the element returned by `map()` and uses a stable id from the data, never the array index.
- **Accessibility:** semantic, native elements first (`button`, `a`, `nav`, `ul`), meaningful `alt` text, accessible names on icon-only links and buttons. jsx-a11y warnings are errors.
- **Styling:** Tailwind utilities; reuse the theme colors and fonts in `tailwind.config.js` rather than new arbitrary values.
- **No leftovers:** no dead code, commented-out code, unused imports or files, `console.log` or debugging output.
- **Comments:** only for what the code can't say (a workaround, a constraint, a link to the reason). Keep them current.
- **Scope:** change only what the task needs, follow the existing patterns, and keep commits small, focused and described in the imperative.
- **Checks:** `npm run format`, `npm run lint`, `npm run typecheck` and `npm run build` pass before every commit, and the site looks identical until Phase 3.

## Upgrade plan

The site is being upgraded in phases (full plan: the "Portfolio Architecture & Technical Review" doc). Phases 0 (baseline) and 1 (toolchain) are done; Phase 2 is next. Later phases: 2 Tailwind 4 + Motion 14, 3 redesign and content refresh, 4 motion and UX, 5 accessibility, 6 performance, 7 QA and launch.

Until Phase 3, changes must not alter how the site looks. Compare full-page screenshots against the live build at 390, 768 and 1440 px wide.

## Git and pull requests

- Commits are authored and committed as `Garrett Head <garretthead@Garretts-MacBook-Pro.local>`.
- All credit goes to Garrett. Never mention Claude, AI or any assistant in commit messages, PR titles or descriptions, PR comments, code comments or docs. No co-author trailers, no "Generated with" lines, no session links.
- One branch and one PR per phase or fix, branched from the latest `main`. Never commit or push to `main` directly.
- Garrett approves the finished code before anything is pushed. After approval: push, open the PR, keep its title and description current. **Garrett merges; never merge a PR.**
- Before pushing, check `main` with `git ls-remote origin main`; Garrett may have merged in the meantime.
- After opening or editing a PR, re-read its description from GitHub and make sure it contains only the text you wrote.

## Content rules

- Employment facts come from Garrett's résumé; don't invent roles, dates, metrics or technologies.
- From Phase 3: exactly five roles, March 2021 to present (FloorFound, Engine, CoPilot, Ping Identity, MURAL), with official titles. No earlier employers, education block, Projects section, contact form or résumé download.
- Social links are LinkedIn (https://www.linkedin.com/in/garretthead) and GitHub (https://github.com/garretthead00) only.
- Keep the tiger brand: tiger mark, purple and gold.
