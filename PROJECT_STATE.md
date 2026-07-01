# PROJECT STATE

> Living record of build progress against `DISCIPLINE_BUILD_PLAN.md`.
> Updated at the close of each phase.

**Last updated:** 2026-07-01
**Current phase:** Phase 04 — Component Library (Level 2 Glass & Composite) — the five Material Roles are FROZEN and promoted to `glass.css`; library generalization has begun (GlassCard built).
**Next phase:** continue Phase 04 generalization (Structural family next), then Phase 05.

> ### ✅ Validated today — the material language is locked
> - **All FIVE Material Roles are DEFINITIVELY FROZEN** (reopen only for an
>   objective bug / accessibility / technical defect):
>   | Role | Reference | Shared class |
>   |---|---|---|
>   | Micro Surface | **Button** | `.ds-micro` (micro.css) |
>   | Control Surface | **Input family** | `.ds-control` (glass.css) |
>   | Structural Surface | **Card** | `.ds-card` (glass.css) |
>   | Floating Surface | **Tooltip** | `.ds-floating` (glass.css) |
>   | Immersive Surface | **Modal** | `.ds-immersive` + `.ds-scrim` (glass.css) |
> - **Cross-role calibration: PASSED.** `/dev/calibration` shows the five roles
>   coexisting/nested under one light; they read as one family with a coherent
>   physical hierarchy. F1 (Micro had two competing geometries) resolved; F2/F3
>   were a scene artifact / a usage rule (no material change).
> - **BUTTON OFFICIALLY VALIDATED & FROZEN — single source of truth:**
>   `docs/DISCIPLINE_BUTTON_REFERENCE.md` (geometry, invariants, material,
>   derivation, interactions, what may evolve, what is forbidden). Summary:
>   - **Geometry** — a premium lens/capsule, **radius = ½ height**, width dictated
>     by content: `h-[34/40/48px]` · `px-4/5/6` · `rounded-[17/20/24px]`. Icon
>     buttons stay circular. ONE Micro geometry everywhere.
>   - **Material** (`.ds-micro`) — reads as real glass: transmission + environment
>     capture (`blur(16) saturate(1.7) brightness(1)`), three-zone volume with a
>     legibility floor, concentrated reflections that slide over the glass.
>   - **Primary** — **neutral glass** (no violet fill, no `data-glass-intent`),
>     distinguished only by a discreet pastel-violet **outer light halo**
>     (`shadow 0 2px 18px rgba(139,124,255,.22)`). Violet = light, never paint.
> - **Roles promoted to `glass.css` — pure extraction (zero pixel change to the
>   surfaces).** `.ds-card`, `.ds-floating`, `.ds-immersive` + `.ds-scrim` were
>   moved verbatim from the `/dev` references; the references now consume the
>   shared classes (single definition, no drift). `.ds-control` and `.ds-micro`
>   were already shared.
> - **CSS scoping corrected (leak-free).** Container roles scope their layer
>   overrides to their OWN GlassSurface via the direct-child path
>   (`> .ds-glass__body > …`), so a Card/Modal's material never bleeds onto nested
>   glass. This removed a pre-existing dev-only leak: nested Buttons now render the
>   frozen Micro material, identical to standalone Buttons. (`.ds-immersive` keeps
>   `z-index:2` above `.ds-scrim`.)
> - **DS principle (binding):** *a Card invites you to read; a Button invites you
>   to click.* Same material, distinct proportions (a Button is low and wide; a
>   Card is a calm plane).
> - **Generalization status (Phase 04):** Structural family in progress.
>   - **GlassCard** — first consumer of `.ds-card` (the CardReference composes it).
>   - **GlassPanel** — the generic large Structural Surface, a DIRECT derivation of
>     GlassCard (reuses `.ds-card` verbatim; keeps the Structural default radius).
>     It defines ONLY a Structural panel — adaptable width, a default panel padding
>     (`w-full px-6 py-12`), `<section>` semantics — and imposes NO layout decision:
>     it never decides its radius, alignment, full-bleed mode or position. Geometry
>     specializations (full-bleed, corner radii, alignment) are DELEGATED to the
>     derived components (Navbar, Footer, Sidebar, BottomNav, marketing sections)
>     via className. No new material. *(Correction: dropped the imposed
>     `rounded-none` — full-bleed is a layout decision that belongs to the consumer,
>     not to the base Structural component.)*
>   - **Architecture invariant frozen (from the GlassPanel correction):**
>     **base components never make layout decisions** — they define only material
>     role, behavior, semantics, and intrinsic geometry (incl. adaptable width and a
>     default radius/padding); placement / full-bleed / alignment / page position /
>     responsive-context are always delegated to the consumer. Formalized as
>     **Invariant A1** in `docs/DISCIPLINE_COMPONENT_ARCHITECTURE.md` (cross-linked
>     from the Grammar §7 and `CLAUDE.md`). **Audit (2026-07-01): all base
>     components pass** — `w-full` defaults are adaptable width (not placement),
>     the `absolute` uses are internal part-positioning; no other component imposes
>     a `rounded-none`-style layout decision.
>   - **FloatingCard** — an elevated Structural Surface, DIRECT derivation of
>     GlassCard. Reuses `.ds-card` verbatim; shifts ONE optical axis (Depth) via a
>     deeper ambient cast shadow (`shadow-4`) added at the COMPONENT level, never in
>     glass.css — the Button-halo pattern. No new material, no layout decision.
>   - **Navbar — FROZEN (official Structural Navigation reference, 2026-07-01).**
>     Treat like Button / FloatingCard: no redesign; changes only for an objective
>     bug. The first navigation component, a DIRECT specialization of
>     GlassPanel (GlassSurface → .ds-card → GlassCard → GlassPanel → Navbar; no
>     hierarchy jump — never bypasses GlassPanel). Material/light/optics/refraction/
>     reflections/shadow all come from GlassPanel UNCHANGED — Navbar adds nothing
>     optical and NO new shadow (audited: no navbar-specific glass recipe, blur,
>     Fresnel or optical stack; material 100% inherited). Navbar owns ONLY geometry
>     (spacing, internal layout, navigation distribution, alignment, radius, height).
>     Its
>     only difference is geometry: a navigation row (height 56/64px, horizontal
>     padding, flex layout, vertical alignment, responsive) with the host padding
>     neutralized (`p-0`) so the glass is edge-to-edge. Radius is Navbar's own
>     decision: floating (keeps the Structural radius) by default, or `attached`
>     (`rounded-none`) — both always available, neither imposed. Placement
>     (sticky/fixed, scroll transitions) stays with the consumer per Invariant A1.
>     Open compound API: `Navbar.Brand` / `Navbar.Content` / `Navbar.Actions` —
>     generic flex clusters, no business assumptions; Content collapses below `md`
>     for a later mobile menu. Proof: `/dev/navbar` (GlassPanel vs Navbar on light +
>     rich panels) confirms identical material — geometry is the sole difference.
>   - **Footer — FROZEN (official Structural page footer, 2026-07-01).** Treat like
>     Button / Navbar / FloatingCard: no redesign; changes only for an objective
>     bug. Final visual validation PASS — on the capture background and a rich
>     photographic panel the Footer's glass is IDENTICAL to GlassPanel (transmission,
>     refraction, blur, Fresnel, internal reflections, incident, specular, edge,
>     shadow all match); only layout/geometry differs. Responsive: desktop row,
>     tablet grid, mobile 2-column stack — spacing coherent. The second major page
>     container (after Navbar). A DIRECT
>     specialization of GlassPanel (GlassSurface → .ds-card → GlassCard → GlassPanel
>     → Footer; no hierarchy jump, never composes GlassSurface, never recreates a
>     glass layer). Material is 100% inherited from GlassPanel — transmission,
>     refraction, blur, Fresnel, internal reflections, incident, specular, edge and
>     shadow all UNCHANGED (no footer glass recipe / blur / border / gradient /
>     optical layer). Footer owns ONLY layout: a calm full-width vertical column
>     (brand, nav columns, legal, copyright, optional newsletter/social) with
>     generous breathing space; host padding neutralized (`p-0`) so the glass is
>     edge-to-edge, the inner column carries responsive padding
>     (`px-6 py-12 md:px-8 md:py-16 lg:px-12`). Radius via geometry-only `variant`:
>     `floating` (Structural default, the rounded plane), `attached` (`rounded-none`,
>     flush edge), `inset` (`rounded-b-none`, rises from the page bottom) — placement
>     stays with the consumer (Invariant A1). Open compound API: `Footer.Brand` /
>     `Footer.Columns` / `Footer.Column` / `Footer.Bottom`, responsive (desktop row →
>     tablet grid → mobile stack). Proof page: `/dev/footer`. Proves the Structural
>     role can generate complete page architecture (Navbar + Footer) by derivation.
>   - **Sidebar — FROZEN (official Structural navigation rail, 2026-07-01).** Treat
>     like Button / Navbar / Footer / FloatingCard: no redesign; changes only for an
>     objective bug. Production-ready — geometry validated, material validated,
>     inheritance validated, responsive validated, compact mode validated, hierarchy
>     validated. Role: Structural. Parent: GlassPanel. Inheritance: GlassSurface →
>     .ds-card → GlassCard → GlassPanel → Sidebar. The vertical counterpart of
>     Navbar, a DIRECT specialization of
>     GlassPanel (no
>     hierarchy jump, never composes GlassSurface, never recreates a glass layer;
>     audited — the only glass/material tokens in sidebar.tsx are in its docstring).
>     Material 100% inherited from GlassPanel, UNCHANGED. Sidebar owns ONLY
>     geometry: width is its own intrinsic dimension (**264px expanded / 64px
>     collapsed**, narrow enough to read as a rail, not a vertical Card) via the
>     `collapsed` prop, which also sets `data-collapsed` for children to respond to;
>     height is adaptable (`h-full`, fills whatever the consumer's container gives —
>     placement stays with the consumer per Invariant A1); internal vertical stack;
>     scrollable nav region; a geometry-only `variant`: `floating` (Structural
>     default) / `attached` (`rounded-none`). Open compound API: `Sidebar.Header` /
>     `Sidebar.Content` (scrollable) / `Sidebar.Section` / `Sidebar.Footer`. Proof
>     page: `/dev/sidebar`.
>     **Objective bug found and fixed during Phase 4 review:** GlassCard's content
>     wrapper (`<div className="relative z-[3]">`) has no explicit height, so a
>     percentage-height chain inside it was inert — tall Sidebar content overflowed
>     past the visible glass box instead of scrolling internally. Fixed with a
>     `[&>div]:flex [&>div]:h-full [&>div]:min-h-0 [&>div]:flex-col` selector scoped
>     to Sidebar's own className (geometry only; GlassCard/GlassPanel/glass.css
>     untouched).
>     **Geometry-only refinement (2026-07-01, "navigation rail, not a vertical
>     Card"):** no material/architecture change. Narrowed both widths (272→264
>     expanded, 72→64 collapsed); lighter horizontal insets (`px-2`/`px-1.5`
>     collapsed, was `px-3`); a deliberately taller vertical gap (`gap-8`, was
>     `gap-6`) separates Header/Content/Footer as distinct blocks; Header carries
>     its own trailing whitespace (`pb-2`) so the brand reads as an anchor; section
>     groups inside Content get more air (`gap-7`, was `gap-6`); nav items within a
>     section breathe more (`gap-1.5`, was `gap-1`). Validated on the capture
>     background and a rich panel: material identical to GlassPanel in both cases;
>     the rail no longer reads as a Card — clear Header→Main→Progress→Footer
>     hierarchy, elegant slim compact mode. (The `/dev/sidebar` demo box height was
>     bumped 420→620px so the taller rhythm has room to show both nav groups without
>     scrolling — a proof-page adjustment only, not a component change.)
>   - **BottomNav** — the mobile counterpart of Navbar, a DIRECT specialization of
>     GlassPanel (GlassSurface → .ds-card → GlassCard → GlassPanel → BottomNav; no
>     hierarchy jump, never composes GlassSurface, never recreates a glass layer;
>     audited — the only glass/material tokens in bottom-nav.tsx are in its
>     docstring). Material 100% inherited from GlassPanel, UNCHANGED. BottomNav owns
>     ONLY geometry + interaction: bottom-bar geometry (fixed `h-16` height, evenly
>     distributed items, `px-2`), device safe-area padding
>     (`pb-[env(safe-area-inset-bottom)]` so it clears the home indicator), a
>     geometry-only `variant` (`floating` default / `attached` `rounded-none` /
>     `inset` `rounded-t-none`), and active-state logic. Host padding neutralized
>     (`p-0`) so the glass is edge-to-edge; placement (`fixed inset-x-0 bottom-0`)
>     stays with the consumer (Invariant A1). Open compound API: `BottomNav.Item`
>     (icon + optional label + optional badge, `active`→`aria-current="page"`,
>     `asChild` for router links, ≥44px touch target via `min-h-target-min`,
>     `focus-visible` ring, `truncate` for long labels) and `BottomNav.Group` (even
>     distribution). Mobile-primary but coherent at desktop width. Proof page:
>     `/dev/bottom-nav`. Reads as the mobile Navbar — same glass, geometry/orientation
>     the only difference; **geometry validated, material inherited, responsive
>     validated, safe-area supported, production-ready. Visual validation PASS
>     (2026-07-01):** on the capture background and a rich photographic panel the
>     bar's glass is IDENTICAL to GlassPanel (transmission, refraction, blur, Fresnel,
>     reflections, shadow all match); floating/attached/inset differ only in radius;
>     active item (violet), inactive items, icon+label balance, badge, long-label
>     truncation, and desktop/tablet/mobile all read correctly; reads as navigation
>     (mobile counterpart of Navbar), not a Card/Toolbar/CTA/floating widget.
>     **FROZEN (2026-07-01)** — treat like Navbar/Footer/Sidebar: no redesign; no
>     geometry/spacing/height/radius/material change; changes only for an objective
>     bug.
>   - **Next:** StatCard /
>     EmptyState / ErrorState / ChartWrapper (← GlassCard/Panel), then Floating
>     (Popover, DropdownMenu, ContextMenu, Toast) and Immersive (Drawer, Sheet,
>     ConfirmationDialog) — each derived from its frozen role, no new optical recipe.

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
>   quiet rim, diffuse sheen, content breathing through. (An exploratory
>   `.btn-embedded` capsule was later REMOVED during calibration once the single
>   canonical Micro geometry was frozen — buttons inside a Card now use the
>   canonical Micro.) Promoted to the shared `.ds-card` role class in `glass.css`.
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
> - **Cross-role calibration (PASSED — see the validated-today summary above).** A
>   `/dev/calibration` scene shows the five references coexisting/nested on shared
>   backgrounds under one light. Finding F1 (the Micro Surface had two competing
>   geometries — the
>   pill "balloon" vs the embedded capsule) was resolved by RE-SETTLING the Button
>   **geometry only** (material/optical layers unchanged): one machined horizontal
>   capsule at all sizes. Icon buttons stay circular. The dev card's
>   `.btn-embedded` (a competing 38px geometry) was removed so it uses the
>   canonical Micro. There is now ONE Micro geometry everywhere.
>   - **DS principle (binding):** *a Card invites you to read; a Button invites
>     you to click.* Same material language, but proportions must communicate
>     that difference immediately.
>   - The geometry then went through several owner-led calibration passes
>     (rounded-rectangle → elongated blade → compact → …). Those intermediate
>     values are **superseded**. The FINAL, definitively frozen Button (geometry,
>     material, neutral-glass Primary + violet light halo) is documented in
>     **`docs/DISCIPLINE_BUTTON_REFERENCE.md`** — the single source of truth.
> - **Cross-role calibration outcome:** the only real finding (F1, Micro had two
>   competing geometries) is resolved and the Micro geometry is frozen. F2 (modal
>   "grey" over a contained scrim) is a calibration-scene artifact; F3 (a Control
>   nested in a Structural over a very vivid background slightly over-brightens)
>   is handled by a usage rule (avoid stacking two backdrop-filters on the
>   brightest area). The five roles read as one family with a coherent hierarchy.
>   - **Optical refinements kept:** the validated glass-read improvements (radial
>     top reflection, three-zone volume, internal-reflection/TIR line, livelier
>     Fresnel) live in `src/styles/micro.css` scoped to `.ds-micro` (Button,
>     IconButton, LinkButton). (Update: the other roles have since been promoted
>     to `glass.css` too — see the validated-today summary above.)
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
| 04 | Component Library — Level 2 Glass & Composite | 🔄 In progress — 5 roles frozen & promoted to `glass.css`; GlassCard built |
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
