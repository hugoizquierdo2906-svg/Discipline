# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **MultiSelect — frozen (Control Surface). The Selection Controls are now
  officially complete and frozen: Checkbox, Radio, Switch, Slider,
  SegmentedControl, MultiSelect.** No functional, visual or architectural
  change again except an objective bug.

- **SegmentedControl — frozen (Control Surface).** No functional, visual or
  architectural change again except an objective bug.

- **Slider — frozen (Micro Surface). The Micro Surface family is now
  COMPLETE and FROZEN: Button, IconButton, LinkButton, Checkbox, Radio,
  Switch, Slider.** Rebuilt from the old Level-1 flat recipe (plain
  `bg-surface` track, flat `bg-accent` range, bordered `bg-surface-raised`
  thumb) onto the same real glass already validated on Switch: Track and
  Thumb each nest the frozen optical-layer stack, the Range reuses Switch's
  checked-rail illumination recipe unconditionally. `micro-control.tsx`
  gained three additive exports (`MicroGlass`, `microControlThumbMotionClass`,
  `microControlActiveGlassClass`) so `slider.tsx` never names the material,
  motion or shadow recipes directly (grep-provable: zero `GlassSurface`/
  `backdrop-filter`/`blur`/`box-shadow`/`rgba`/`transition`/`animation`/
  `focus` string in the file). Checkbox/Radio/Switch are untouched; the
  dead, zero-consumer `microControlThumbClass` (superseded by Switch's own
  visual-correction pass) was removed in the same pass.

- **Switch — frozen (Micro Surface).** After a dedicated visual-correction
  pass (rail material restored via the real `<GlassSurface/>` stack, checked
  state expressed as `color-mix(in_srgb, var(--ds-color-accent) 42%,
  transparent)` diffused through the existing backdrop-filter rather than a
  painted fill, thumb rebuilt as its own nested glass object rendered
  identically in both states), Switch is visually validated and frozen.
  Deliberate architectural divergence from Checkbox/Radio: Switch composes
  `<GlassSurface/>` directly instead of the flat `micro-control.tsx` recipe,
  since its 44×24 rail can spend more of the Micro Glass Budget than a 20px
  glyph. `micro-control.tsx` itself is unchanged.

### Added

- **Combobox — composes Input + the frozen Control Surface popup + the
  frozen Select row language (Built, not frozen).** A single value found
  through search across a very large list; not Select (a short,
  fully-legible list needs no search), not MultiSelect (several values,
  stays open), not Command Palette (a global surface vs a scoped field), not
  Search Input (filters the page, typed text is never the value here), not
  Autocomplete (suggests completions that stay free text; Combobox's value
  is always exactly one option), not Dropdown Menu/Menu (commands, not a
  value field), not Listbox (no search — the exact problem Combobox
  solves). The trigger is the real `<Input/>` component (not its classes
  rebuilt); the popup is the frozen Control Surface popup recipe already
  validated on Select/MultiSelect; rows reuse the frozen Select row's own
  visual language (three new additive exports in `control-surface.tsx`,
  extracted without touching Select). combobox.tsx grep: zero
  `GlassSurface`/`blur`/`backdrop-filter`/`rgba`/`shadow`/`transition`/
  `animation` string; `focus` appears only as `onFocus` and Radix's
  `onOpenAutoFocus` prop — zero literal `.focus()` calls, since Arrow
  Up/Down/Home/End move a pure `aria-activedescendant` pointer rather than
  real DOM reachability. Search is instant, case- and accent-insensitive
  (standard `String.normalize('NFD')`). Select, Input, Checkbox, RadioGroup,
  Switch, Slider, SegmentedControl and MultiSelect are all untouched.

- **MultiSelect — composes Control Surface + the frozen Checkbox (Built,
  not frozen).** A list of values, several selectable at once, open/select/
  deselect/close while keeping context; not Select (one value, closes on
  pick), not Dropdown Menu (commands, not a form field), not Command
  Palette (a global searchable surface), not Checkbox Group (always
  visible), not Tag Input (creatable free-text tokens), not Combobox
  (filters + `role="option"`). The trigger is the exact Control Surface
  glass Input/Select already use; the open panel reuses the frozen Select
  menu's own recipe verbatim (three new additive exports in
  `control-surface.tsx`, extracted without touching Select); every row is
  the real, frozen `<Checkbox/>` component. multiselect.tsx grep: zero
  `GlassSurface`/`blur`/`backdrop-filter`/`rgba`/`shadow`/`transition`/
  `animation` string; `focus` appears only as the irreducible native DOM
  `.focus()` calls + Radix's `onOpenAutoFocus` prop, since a raw Popover has
  no bundled roving-reachability (Arrow Up/Down/Home/End are hand-rolled in
  keyboard code, zero material). Select, Checkbox, Radio, Switch, Slider and
  SegmentedControl are all untouched.

- **SegmentedControl — first Control Surface member built on the frozen
  Micro foundation (Built, not frozen).** An exclusive choice among 2–6
  visible options; not RadioGroup (a form field), not Tabs (owns a content
  panel), not a Button Group (independent actions), not a Toggle Group
  (independently on/off), not Select (trades visibility for density). Built
  on the same Radix primitive as the frozen Radio
  (`@radix-ui/react-radio-group`) composed directly. The strip is the same
  Control Surface glass Input/Select already use; every segment nests its
  own Micro-tuned glass, invisible at rest and revealed only once selected
  via the new `microControlSelectedGlassClass` (additive in
  `micro-control.tsx`) — reading byte-identical to the frozen Switch rail.
  segmented-control.tsx grep: zero `GlassSurface`/`blur`/`backdrop-filter`/
  `rgba`/`shadow`/`transition`/`animation`/`focus` string. Checkbox, Radio,
  Switch and Slider are untouched.

- **Phase 03 — Component Library (Level 1 Primitives).** 28 generic,
  token-driven, accessible primitives in `src/components/ui` built on Radix UI +
  class-variance-authority, with a `cn()` class-merge utility:
  - Buttons (Button/IconButton/LinkButton), form inputs (Input, Textarea,
    Select, Checkbox, RadioGroup, Switch, Slider, DatePicker, FileInput),
    display (Badge, Avatar, Icon, Spinner, Skeleton, Separator), typography
    (Heading, Text, Label, Code), feedback (Alert, Progress, Tooltip).
  - Dev-only `/dev/components` showcase (404 in production) covering all states.
  - `scripts/visual-check.mjs` — Playwright screenshots (1440/1024/390) and an
    axe-core accessibility scan (0 violations).
  - `docs/PHASE_03_DESIGN_REVIEW.md` with captures, responsive and a11y checks,
    and Rulebook justification.
- **DISCIPLINE Constitution.** `docs/DISCIPLINE_CONSTITUTION.md` established as
  the supreme canonical authority, wired into the canon and the workflow.

- **Phase 02 — Design Token System.** Full translation of
  `DISCIPLINE_CANONICAL_TOKENS.md` into the styling infrastructure:
  - `src/styles/tokens.css` (all token groups + responsive overrides) and
    `src/styles/typography.css` base defaults.
  - `src/lib/tokens.ts` TypeScript mirror for Framer Motion / GSAP.
  - Tailwind CSS v3.4 wired to the tokens (`tailwind.config.ts`,
    `postcss.config.mjs`); every utility maps to a `--ds-*` token.
  - Geist + Geist Mono self-hosted via the `geist` package and `next/font`.
  - Global focus-visible ring and `prefers-reduced-motion` handling.
  - Dev-only `/dev/tokens` visual verification page.
  - ESLint rule forbidding raw color literals outside token files.

- **Phase 01 — Repository & Toolchain Bootstrap.** Reproducible, deterministic
  development environment:
  - Next.js 15.5.19 · React 19.2.7 project on the App Router with TypeScript strict mode.
  - Pinned toolchain: Node 22.22.2, pnpm 10.33.0, exact dependency versions.
  - ESLint (flat config) with `next`, `typescript`, `jsx-a11y`, `import`, and Prettier integration.
  - Prettier, EditorConfig, and shared VS Code settings/extensions.
  - Husky `pre-commit` hook running lint-staged.
  - GitHub Actions CI (install → lint → type-check → build) plus a gitleaks secret scan.
  - `src/` and `public/` directory structure; `.env.example` covering all future phases.
