# PROJECT STATE

> Living record of build progress against `DISCIPLINE_BUILD_PLAN.md`.
> Updated at the close of each phase.

**Last updated:** 2026-06-30
**Current phase:** Phase 02 — complete
**Next phase:** Phase 03 — Component Library (Level 1 Primitives) — not started

---

## Phase status

| # | Phase | Status |
|---|---|---|
| 01 | Repository & Toolchain Bootstrap | ✅ Complete |
| 02 | Design Token System | ✅ Complete |
| 03 | Component Library — Level 1 Primitives | ⏳ Not started |
| 04–44 | (see DISCIPLINE_BUILD_PLAN.md) | ⏳ Not started |

---

## Phase 01 — Repository & Toolchain Bootstrap ✅

**Objective:** Reproducible, deterministic development environment — the prerequisite for every later phase.

### Frozen technical decisions

| Decision | Value |
|---|---|
| Package manager | pnpm `10.33.0` (`packageManager` + `engines`) |
| Node.js | `22.22.2` (`.nvmrc` + `engines` + CI) |
| Next.js | `15.5.19` (exact) |
| React / React-DOM | `19.2.7` (exact) |
| TypeScript | strict mode, `any` forbidden, alias `@/` → `src/` |
| Versioning | All dependencies pinned to exact versions (no `^`/`~`) |
| Linting | ESLint flat config: next + typescript + jsx-a11y + import + prettier |
| Formatting | Prettier — single quotes, no semicolons, trailing commas |
| Pre-commit | Husky + lint-staged (`--no-verify` forbidden) |
| CI | GitHub Actions: install → lint → type-check → build + gitleaks scan |

### Delivered

- Config: `package.json`, `pnpm-lock.yaml`, `.npmrc`, `.nvmrc`, `tsconfig.json`,
  `next.config.ts`, `eslint.config.mjs`, `.prettierrc.json`, `.prettierignore`,
  `.editorconfig`, `.gitignore`, `.env.example`
- Editor: `.vscode/settings.json`, `.vscode/extensions.json`
- Hooks: `.husky/pre-commit`
- CI: `.github/workflows/ci.yml`
- Source skeleton: `src/{app,components/ui,components/shared,features,lib,styles,types,hooks,server}`
- Static skeleton: `public/{brand,images,videos,backgrounds,textures,mockups,og}`
- Minimal placeholder app (`src/app/layout.tsx`, `page.tsx`, `globals.css`) — reworked in Phase 02
- `README.md`, `CHANGELOG.md`

### Validation results

| Criterion | Result |
|---|---|
| `pnpm install` from clean state | ✅ Pass |
| `pnpm dev` boots on port 3000 | ✅ Pass (HTTP 200, ready ~1.6s) |
| `pnpm build` — zero TS / ESLint errors | ✅ Pass |
| `pnpm lint` exits 0 | ✅ Pass |
| `pnpm type-check` exits 0 | ✅ Pass |
| `pnpm format:check` clean | ✅ Pass |
| No real secrets committed | ✅ Pass (`.gitignore` + gitleaks in CI) |
| `.editorconfig` + `.vscode/` present | ✅ Pass |

### Adjustments applied (per validation feedback)

- Node, pnpm, Next.js, and React pinned to **exact** versions.
- Added `.editorconfig`, `.vscode/settings.json`, `.vscode/extensions.json`.
- **Deferred:** Bundle Analyzer → Phase 37 (Performance); Vercel configuration → Phase 43 (Deployment).

### Notes / deferrals

- **ESLint "no raw color values" rule deferred to Phase 02.** The Phase 01
  plan lists an ESLint rule forbidding raw color values outside the token
  files. It was intentionally **not** implemented in Phase 01 because the
  token files (`src/styles/tokens.css`) do not exist until Phase 02 — such a
  rule would have no target. It is carried as the **first item of Phase 02**
  (see `DISCIPLINE_BUILD_PLAN.md` → Phase 02 deliverables / implementation order).
- `next lint` is deprecated in Next 15.5; the `lint` script uses the ESLint CLI directly against the flat config.
- Cloudflare R2 image `remotePatterns` left empty until Phase 35.
- CSP intentionally minimal until third-party origins are known (later phases).

---

## Working agreements (apply from Phase 02 onward)

- **Evidence-backed reporting.** Every claim about a command's outcome must be
  accompanied by objective proof: the command run, its exit code, and (for
  builds) its duration. Example — instead of "Build OK", report:

  ```
  ✓ pnpm build
  Exit code: 0
  Duration: 6.3 s
  ```

  Applies to `pnpm build`, `pnpm lint`, `pnpm type-check`, and any equivalent
  validation command. Reports must be verifiable, not assertions.

---

## Phase 02 — Design Token System ✅

**Objective:** Translate `DISCIPLINE_CANONICAL_TOKENS.md` (v1.1.0) into the
project's styling infrastructure so every visual value derives from a token.

### Frozen technical decisions

| Decision | Value |
|---|---|
| Tailwind | `tailwindcss` v3.4.19 (config-file approach) + `postcss` + `autoprefixer` |
| Font | Geist + Geist Mono via the official `geist` package (self-hosted `next/font`) |
| Token source of truth | `src/styles/tokens.css` (CSS vars); `src/lib/tokens.ts` mirrors the subset needed by Framer Motion / GSAP |
| Raw-value lint | ESLint `no-restricted-syntax` forbids raw hex, `rgb/hsl(...)`, **and standalone `px`/`ms` literals** outside whitelisted token files (`tailwind.config.ts`, `src/lib/tokens.ts`) |

### Delivered

- `src/styles/tokens.css` — all canonical token groups (§1–§11) incl. responsive
  overrides for semantic spacing (§4.1) and display/heading type (§3.3).
- `src/styles/typography.css` — base type defaults, mono helper, reading measure.
- `src/lib/tokens.ts` — TS mirror (durations, easings, spring, breakpoints, z-index).
- `tailwind.config.ts` — every token mapped to a utility (colors, type, spacing,
  radii, shadows, blur, motion, z-index, breakpoints); safelist for the dev preview.
- `postcss.config.mjs` — Tailwind v3 + Autoprefixer pipeline.
- `src/app/globals.css` — imports tokens + typography + Tailwind layers; global
  focus-visible ring (§1.8) and `prefers-reduced-motion` handling (§8.4).
- `src/app/layout.tsx` — Geist/Geist Mono wired via `next/font` variables.
- `src/app/(dev)/dev/tokens/page.tsx` — dev-only visual verification surface.
- `eslint.config.mjs` — raw-color rule (carried over from Phase 01).

### Validation results (evidence)

| Criterion | Result |
|---|---|
| `pnpm lint` | ✅ exit 0 |
| `pnpm type-check` | ✅ exit 0 |
| `pnpm format:check` | ✅ exit 0 |
| `pnpm build` | ✅ exit 0 (~18.5 s) |
| `/dev/tokens` renders | ✅ HTTP 200, content present |
| ESLint raw-color rule (negative test) | ✅ flags `'#8B7CFF'` with the expected error |

### Notes / deferrals

- Carried-over Phase 01 raw-color ESLint rule: **implemented**, then extended
  (per Phase 02 plan item 11) to also flag standalone raw `px`/`ms` literals.
- `tokens.css` ↔ `lib/tokens.ts` sync is currently maintained by hand; an automated
  drift-check script is a candidate for a later hardening pass.
- `backdrop-filter` cross-browser fallback handled at component level (Phase 04).
