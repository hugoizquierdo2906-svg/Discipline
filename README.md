# DISCIPLINE

Premium fitness coaching platform built on an Apple Liquid Glass aesthetic.

> Build sequencing lives in [`DISCIPLINE_BUILD_PLAN.md`](./DISCIPLINE_BUILD_PLAN.md).
> Current progress is tracked in [`PROJECT_STATE.md`](./PROJECT_STATE.md).

## Tech stack

- **Framework:** Next.js 15 (App Router) · React 19 · TypeScript (strict)
- **Package manager:** pnpm
- **Tooling:** ESLint (flat config) · Prettier · Husky · lint-staged

## Prerequisites

- **Node.js `22.22.2`** (see `.nvmrc` — run `nvm use`)
- **pnpm `10.33.0`** (pinned via `packageManager`; `corepack enable` is recommended)

## Getting started

```bash
pnpm install                 # install dependencies (frozen, exact versions)
cp .env.example .env.local   # then fill in values as phases require them
pnpm dev                     # start the dev server on http://localhost:3000
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server (port 3000) |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint |
| `pnpm type-check` | Run `tsc --noEmit` |
| `pnpm format` | Format with Prettier |
| `pnpm format:check` | Verify formatting |

## Project structure

```
src/
  app/                 Next.js App Router
  components/ui/        Level 1 primitives
  components/shared/    Level 2 composites
  features/             Feature slices
  lib/                  Utilities and adapters
  styles/               Global CSS and design tokens
  types/                Shared TypeScript interfaces
  hooks/                Shared React hooks
  server/               Server-only code (actions, services, db)
public/                 Static assets (see DISCIPLINE_MEDIA_MAP.md)
```

## Conventions

- All commits run lint + format via the Husky `pre-commit` hook. **Do not use `--no-verify`.**
- Dependencies are pinned to exact versions (no `^`/`~`) for deterministic builds.
- CI (`.github/workflows/ci.yml`) runs install → lint → type-check → build on every push and PR.
