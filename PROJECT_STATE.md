# PROJECT STATE

> Living record of build progress against `DISCIPLINE_BUILD_PLAN.md`.
> Updated at the close of each phase.

**Last updated:** 2026-06-30
**Current phase:** Phase 03 — Component Library (Level 1 Primitives) — material reference VALIDATED; converging primitives to it
**Next phase:** Phase 04 — Component Library (Level 2 Glass & Composite) — not started

> ### Liquid Glass — frozen reference & working rules (permanent)
> - **The Primary reference button is visually VALIDATED and FROZEN.** It is the
>   official DISCIPLINE material reference and may not change except on an
>   explicit request for a material evolution.
> - **The Button family is the OFFICIAL FROZEN visual standard** of the Design
>   System, at the **"optical layers" reference material** (commit `19fbb37`;
>   `0046902` look): softer, more natural violet read as light trapped in the
>   glass; a more machined, less "balloon" capsule; a discreet, premium material;
>   well-balanced on light and dark backgrounds. **Do not modify it. Do not
>   iterate on it. Do not try to perfect it further.** It is the visual quality
>   bar every other component must reach.
> - **The Control Surface reference (Input) is visually VALIDATED and FROZEN.**
>   It is the official reference of the **Control Surface** role (Grammar §2),
>   built from the SAME optical layers as the button, re-tuned into a recessed,
>   high-transmission well (violet caught inside the material on focus, not an
>   outline). Promoted to the shared `.ds-control` role class in `glass.css`.
> - **The whole Control Surface family is generalized to that reference:** Input,
>   Textarea, SearchInput, Select (+ NativeSelect), DatePicker, FileInput all
>   render `<GlassSurface/>` inside a `.ds-glass .ds-control` host (shared
>   `control-surface.tsx`), adapting geometry/interaction only — one identical
>   material language. Family proof at `/dev/controls` (light + dark, axe 0).
> - **The Structural Surface reference (Card) is visually VALIDATED and FROZEN.**
>   It is the official reference of the **Structural Surface** role (Grammar §2):
>   the "card" thickness tier of the shared material — high refraction + depth,
>   quiet rim, diffuse sheen, content breathing through. An **Embedded Micro
>   Surface** expression (a machined horizontal capsule for buttons inside a
>   Card, same optical material) lives scoped to `.cd-card .btn-embedded` in the
>   dev reference; it is not yet a DS-wide rule.
> - **Three founding roles are now FROZEN — they do not reopen** except for a
>   functional bug, an accessibility issue, or an objective technical defect.
>   Future components converge to them; they never converge to future components:
>     - ✅ Micro Surface → **Button**
>     - ✅ Control Surface → **Input family**
>     - ✅ Structural Surface → **Card**
> - **The Floating Surface reference (Tooltip) is visually VALIDATED and FROZEN.**
>   It is the official reference of the **Floating Surface** role (Grammar §2):
>   the thinnest, transient pane — almost no volume, low refraction, medium
>   transmission, a medium Fresnel rim carrying the read, a quick specular, a
>   light detaching shadow, an arrow tail; neutral (no violet). Scoped to
>   `.fl-tip` in the dev reference.
> - **Four founding roles are now FROZEN — they do not reopen** except for a
>   functional bug, an accessibility issue, or an objective technical defect:
>     - ✅ Micro Surface → **Button**
>     - ✅ Control Surface → **Input family**
>     - ✅ Structural Surface → **Card**
>     - ✅ Floating Surface → **Tooltip**
> - **The Immersive Surface reference (Modal) is visually VALIDATED and FROZEN.**
>   It is the official reference of the **Immersive Surface** role (Grammar §2):
>   the thickest "modal" tier — heaviest volume + lens, deepest faces and cast
>   shadow, quiet rim, diffuse sheen, a legibility floor for AA text, and the
>   role-specific scrim that dims + blurs the background. Scoped to `.im-modal`.
> - **The FIVE founding roles are now COMPLETE and FROZEN** — the physical
>   language is finished. They do not reopen except for a functional bug, an
>   accessibility issue, or an objective technical defect:
>     - ✅ Micro Surface → **Button**
>     - ✅ Control Surface → **Input family**
>     - ✅ Structural Surface → **Card**
>     - ✅ Floating Surface → **Tooltip**
>     - ✅ Immersive Surface → **Modal**
> - **PHASE CHANGE — generalization, not invention.** Every remaining component
>   must derive from exactly one of the five frozen references; no sixth language,
>   no new material, no new optical recipe. Before each implementation, state
>   explicitly: which reference it derives from, which optical layers are reused,
>   which magnitudes change and why. A component that seems to need a new material
>   is first treated as a design error to be disproven.
> - **All components converge to the reference, never the reverse.** If a
>   component needs adaptation, adapt the component to the material.
> - **The glass theory is frozen:** Material, Construction, Grammar, Budget, Tests
>   do not change except on explicit request. **No new glass theory documents.**
>   All improvement happens in implementation.
> - **Work cycle:** Référence validée → Déclinaison → Validation → Phase suivante.
>   We are out of research and back on the Build Plan.
> - **Reporting:** never self-mark a test PASS/FAIL. Present a technical analysis
>   and state "validation visuelle requise." Final validation belongs to the owner.

> Phase 03 passed the technical audit but **failed visual validation**: the
> primitives (notably buttons) read as generic Tailwind, not the DISCIPLINE
> Liquid Glass material. Material spec: `docs/DISCIPLINE_GLASS_MATERIAL.md`
> (validated). Additive glass material sub-tokens encoded in canonical §2 +
> `tokens.css` (first-approximation values, visual calibration only).
>
> **Glass specification chain (complete — documentation phase closed):**
> Constitution → Canonical Tokens (§2 material sub-tokens) →
> `DISCIPLINE_GLASS_MATERIAL.md` → `..._REVERSE_ENGINEERING.md` →
> `..._CONSTRUCTION.md` → `..._GRAMMAR.md` → `..._BUDGET.md` → `..._TESTS.md` →
> Component Library. No further glass theory documents — next work is product.
>
> **Current step:** a single **Primary reference button** exists in isolation at
> `/dev/glass` (`src/app/(dev)/dev/glass/`) as a first material attempt; the
> reverse-engineering identified the gaps (displacement refraction, Fresnel rim,
> TIR line, crisp specular, convex thickness, violet caustic). **Next action (on
> go-ahead): re-implement that one button to the Construction model + Budget +
> Tests, validate it visually, then generalize role by role per the Grammar.**
> No library component is touched until the reference is visually validated.

---

## Governance — DISCIPLINE Constitution

- **`docs/DISCIPLINE_CONSTITUTION.md` is now the supreme reference of the project**
  — the highest canonical authority, above all other documents.
- **All future canonical documents must remain compatible with the Constitution.**
  In any conflict between canonical documents, the Constitution prevails.
- **Every future phase must begin with a Constitution Check** (see
  `docs/DISCIPLINE_PROMPT.md` → "Constitution Check (Mandatory)" and `CLAUDE.md`):
  verify the work reinforces understanding and autonomy, avoids unnecessary
  complexity, and that no more Constitution-faithful alternative exists.

Canonical hierarchy: Constitution → Master Context → Rulebook → Canonical Tokens
→ Component Library → Build Plan.

---

## Phase status

| # | Phase | Status |
|---|---|---|
| 01 | Repository & Toolchain Bootstrap | 🔒 Locked (complete) |
| 02 | Design Token System | 🔒 Locked (complete) |
| 03 | Component Library — Level 1 Primitives | 🔄 Converging to the validated glass reference |
| 04 | Component Library — Level 2 Glass & Composite | ⏳ Not started |
| 05–44 | (see DISCIPLINE_BUILD_PLAN.md) | ⏳ Not started |

### Governance backlog (deferred, to resolve in a dedicated documentation revision)

- **Documentary contradictions vs the Constitution** (recorded, not corrected):
  streaks / leaderboards / gamification, countdowns / urgency, motivational and
  conversion-centric language across Master Context, Rulebook, and Build Plan.
- **Badge §12.9 deviation** (Phase 03): semantic badges use a white raised
  surface + semantic border instead of the pale tint, because solid-on-tint at
  12px fell just under WCAG AA. See `docs/PHASE_03_DESIGN_REVIEW.md` §6.

> **Phase Lock Rule.** A validated phase is locked: no changes to a previous
> phase are permitted except for a bug fix, a security flaw, a blocking
> incompatibility, or an explicit request from the project owner. All functional
> evolution happens in the current phase. (Full rule in `docs/DISCIPLINE_PROMPT.md`.)

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

## Phase 03 — Component Library: Level 1 Primitives ✅

**Objective:** Generic, stateless, token-driven UI primitives composed by every
higher-level component. Accessibility baked in from this level.

### Frozen technical decisions

| Decision | Value |
|---|---|
| Primitive base | Radix UI + `class-variance-authority` + `cn()` (token-authored; no Shadcn CLI) |
| Icons | `lucide-react` |
| DatePicker | `react-day-picker` in a Radix Popover |
| Class merge | `cn()` uses `extendTailwindMerge` registering the DISCIPLINE font-size scale (prevents size/color collisions) |
| Captures & a11y | Playwright (pre-installed Chromium) + `@axe-core/playwright` via `scripts/visual-check.mjs` |

### Delivered

- 28 primitives in `src/components/ui/` (+ `index.ts` barrel): Button, IconButton,
  LinkButton, Input, Textarea, Select (+ NativeSelect), Checkbox, RadioGroup,
  Switch, Slider, DatePicker, FileInput, Badge, Avatar, Icon, Spinner, Skeleton,
  Separator, Heading, Text, Label, Code, Alert, Progress, Tooltip.
- `src/lib/cn.ts` class-merge utility.
- `/dev/components` showcase (dev-only, 404 in production) — every primitive, all states.
- `scripts/visual-check.mjs` — screenshots (1440/1024/390) + axe-core scan.
- `docs/PHASE_03_DESIGN_REVIEW.md` + `docs/phase-03-screenshots/`.

### Validation results (evidence)

| Criterion | Result |
|---|---|
| `pnpm lint` | ✅ exit 0 |
| `pnpm type-check` | ✅ exit 0 |
| `pnpm format:check` | ✅ exit 0 |
| `pnpm build` | ✅ exit 0 (~27.5 s) |
| axe-core `/dev/components` | ✅ 0 violations |
| `/dev/components` prod guard | ✅ HTTP 404 in production |

### Notes

- Two a11y issues found and fixed pre-closure: Progress accessible name, and a
  tailwind-merge size/color collision (fixed in `cn.ts`, hardening all components).
- Badge §12.9 deviation recorded in the governance backlog (accessibility-first).

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
