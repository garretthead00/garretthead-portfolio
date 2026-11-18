# Garrett Head — Portfolio

Personal portfolio site, live at https://garretthead00.github.io/garretthead-portfolio.

Built with React 19, TypeScript and Vite. Requires Node.js 24 or newer (26 recommended; see `.nvmrc`).

## Scripts

| Command                | What it does                                                         |
| ---------------------- | -------------------------------------------------------------------- |
| `npm install`          | Install dependencies                                                 |
| `npm run dev`          | Start the dev server at http://localhost:5173/garretthead-portfolio/ |
| `npm run build`        | Type-check, then build the site into `dist/`                         |
| `npm run preview`      | Serve the production build locally                                   |
| `npm run typecheck`    | Type-check only (TypeScript 7)                                       |
| `npm run lint`         | Lint with ESLint (TypeScript, React Hooks, React Refresh, jsx-a11y)  |
| `npm run format`       | Format with Prettier (sorts Tailwind classes)                        |
| `npm run format:check` | Check formatting without writing                                     |
| `npm run deploy`       | Build and publish `dist/` to the `gh-pages` branch                   |

## TypeScript versions

Type-checking uses TypeScript 7 (installed as `typescript-7`). `typescript-eslint` doesn't support TypeScript 7 yet, so the `typescript` package stays on 6.0 for ESLint and editors. Use `npm run typecheck`, not `npx tsc`, which runs 6.0.
