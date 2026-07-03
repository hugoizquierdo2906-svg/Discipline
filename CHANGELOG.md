# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **Color Picker — frozen (Control Surface).** No functional, visual or
  architectural change again except an objective bug.

- **Date Range Picker — frozen (Control Surface).** No functional, visual
  or architectural change again except an objective bug.

- **Time Picker — frozen (Control Surface).** No functional, visual or
  architectural change again except an objective bug.

- **OTP Input — frozen (Control Surface), after a cell-geometry
  recalibration pass.** Behavior was validated as-is; the cells initially
  read as mini Cards instead of verification-code boxes, so
  `cellSizeClass` was recalibrated (sm 40×40 → 32×28, md 48×48 → 40×32, lg
  56×56 → 44×36) and the group gap tightened (`gap-2` → `gap-1.5`). Same
  material, same behavior, no logic touched.

- **Autocomplete — frozen (Control Surface).** No functional, visual or
  architectural change again except an objective bug.

- **Combobox — frozen (Control Surface).** No functional, visual or
  architectural change again except an objective bug.

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

- **Color Picker — composes Input + the frozen Popover + the frozen
  IconButton (Built, not frozen).** A form field committing exactly ONE
  color value, chosen visually from a palette or entered as hex; not Input
  (adds the color grammar ON TOP of Input — the trigger IS an Input), not
  Select (a color is chosen by seeing it; free hex = open domain), not
  Combobox/Autocomplete (a fixed format, not a query), not Radio Group/
  Segmented Control (closed always-visible sets), not Palette/Swatch Grid
  (internal display structures), not Theme Selector (an app-level mode),
  not Gradient Editor (a different value type built on top of this one),
  not Opacity Slider (alpha is a channel, not a color), not RGB/HSL Editor
  (future alternate input formats inside this same panel), not Hex Input
  (one internal organ), not Eyedropper (a capture tool), not Canvas
  Editor/Image Picker, not MultiSelect, not Form Group. Trigger = Input
  itself (current color as a swatch in the prefix slot); panel = the
  actual frozen `<Popover/>` holding a `role="listbox"` swatch grid
  (check-mark = selected, contrast-aware), the real frozen `<Input>` for
  hex entry and the real frozen `<IconButton>` for copy. Palette ↔ hex
  synchronized both ways and the panel stays open across picks (iterative
  choice — MultiSelect precedent); canonical value `#RRGGBB` uppercase;
  alpha deliberately deferred as a pure future extension (`#RRGGBBAA` +
  one frozen-Slider row in the same panel). Swatch backgrounds are palette
  DATA (the candidate values themselves), never material; the built-in
  24-color default palette is the one documented, narrowly-scoped
  exception to the Phase-02 no-raw-color-literals rule. color-picker.tsx
  grep: zero `GlassSurface`/`blur`/`backdrop-filter`/`rgba`/`shadow`/
  `transition` string; `requestAnimationFrame` (a scheduling API, not
  decorative motion) is the only `animation`-string occurrence; 3
  irreducible literal `.focus()` calls (grid roving reachability, initial
  landing on the current swatch, return-to-field on close). ZERO files
  modified outside the new component — Input, Popover, IconButton, Icon,
  Label and Spinner already provided everything.

- **Date Range Picker — composes Input + the frozen DatePicker calendar
  language in range mode (Built, not frozen).** A start and an end date
  representing exactly ONE logical value: a continuous period. Not Date
  Picker (one day, closes — a period is a different value type: two
  ordered anchors + everything between, with partial state, inversion and
  an in-range band), not Calendar (the day-grid a picker delegates to),
  not Time Picker/DateTime Picker/Time Range Picker (time-of-day
  concerns), not Range Slider (two numbers on an axis), not Month/Year
  Picker (one coarser single anchor), not MultiSelect (independent
  unordered values — you cannot deselect the middle of a period), not
  Combobox, not Scheduler/Booking/Availability Calendar (page-level
  compositions around a field like this), not Timeline/Gantt (read
  visualizations), not Form Group (one field, one value). Trigger is
  Input itself; overlay is the frozen DatePicker calendar (FloatingSurface
  + `ds-datepicker-*`, react-day-picker `mode="range"`). ONE strictly
  additive rule in `date-picker.css` (`.rdp-range_middle` in-range band =
  the site-wide accent-subtle highlight; pure insertion, frozen DatePicker
  renders byte-identical). Selection grammar driven from committed state +
  picked day — a real react-day-picker v9 behavior bug found and fixed
  during the build (its range mode returns `{from: day, to: day}` on the
  very first pick, which would instantly commit a complete single-day
  period and close): first pick anchors the start and stays open, second
  pick anchors the end and closes, an end picked before the start swaps
  into place, a pick over a complete period starts a fresh one (all
  verified programmatically). Focus enters the grid on open and returns to
  the field on close (one irreducible literal `.focus()` in
  `onCloseAutoFocus` — the anchor is Input, no Radix Trigger exists to
  restore it). date-range-picker.tsx grep: zero `GlassSurface`/`blur`/
  `backdrop-filter`/`rgba`/`shadow`/`transition`/`animation` string. All
  frozen components untouched.

- **Time Picker — composes Input + the frozen Popover (Built, not
  frozen).** Select an hour (and optionally minutes) representing exactly
  ONE point-in-time value; not Date Picker (a day-grid vs. two small
  bounded numbers), not Calendar (no day-grid concept), not Select
  (arbitrary domain list vs. a fixed 0-23/0-59 grammar with a type-in-able
  field), not Combobox/Autocomplete (neither resolves free text against a
  bounded numeric grammar with hour→minute progression), not Input (adds
  24h parsing/popup on top of Input, doesn't replace it), not Number Input
  (no format, no colon, no two-part structure), not Clock (read-only
  display, never accepts a value), not Duration Picker (an elapsed span
  with no fixed origin vs. a time anchored to a 24h cycle), not Scheduler
  (a page-level composition built around fields like this), not Time Range
  Picker (two Time Pickers plus a start<end invariant — a consumer's
  concern). The trigger is Input itself; the popup is the actual frozen
  `<Popover/>` component (Floating Surface) rather than the raised Control
  Surface popup recipe Combobox/MultiSelect/Autocomplete reuse, since Time
  Picker's picker is a genuinely separate surface. Rows reuse the frozen
  Select row language (zero new export). Canonical value is always a 24h
  "HH:mm" string; a future 12h/AM-PM mode is a pure display layer on the
  same value. time-picker.tsx grep: zero `GlassSurface`/`blur`/
  `backdrop-filter`/`rgba`/`shadow`/`transition` string; `focus` appears as
  7 literal `.focus()` calls (hand-rolled roving reachability between the
  hour/minute lists, same justified pattern as MultiSelect) plus native
  `onFocus`/`onOpenAutoFocus`; `requestAnimationFrame`/
  `cancelAnimationFrame` (a browser scheduling API, not decorative motion)
  are the only `animation`-string occurrences, needed because the popup's
  row refs attach one frame after Radix mounts its Presence-driven content
  — a real bug found and fixed during the build (the initial
  scroll-to-committed-value silently did nothing on first open). Input,
  Select, Checkbox, RadioGroup, Switch, Slider, SegmentedControl,
  MultiSelect, Combobox, Autocomplete, OtpInput and Popover are all
  untouched; zero shared-file diff anywhere.

- **OTP Input — composes the frozen Control Surface cell recipe (Built, not
  frozen).** A specialized field for a code made of several independent
  characters representing exactly ONE logical value; not Input (box count
  is the point — auto-advance/per-position Backspace/arrows are impossible
  on one field), not Autocomplete/Combobox/Select/MultiSelect (all resolve
  text against candidate options, a code is only received, never matched),
  not Search Input (nothing filtered), not Password Input (opaque string vs
  a legible, per-character-confirmable code), not Pin Display/Code Viewer
  (read-only presentation vs accepting input), not Verification Card (a
  page-level composition built around a field like this), not Form Group
  (one field, one logical value). Each cell is the exact Control Surface
  well Input renders, compacted to a square via the new `controlCellClass`
  (additive in `control-surface.tsx`, Input untouched — no fixed size,
  sizing stays with the consumer per Invariant A1); a real
  `<input maxLength={1}>` sits in every cell. Typing auto-advances;
  Backspace on an empty cell moves back and clears the previous cell;
  Arrow Left/Right/Home/End move between cells; pasting a full code splits
  it across the remaining cells. Gaps are structurally impossible: focusing
  a cell past an earlier empty one redirects there, keeping the joined
  string always position-correct (a real bug — found and fixed during the
  build — where a naive string join silently lost interior blanks).
  otp-input.tsx grep: zero `GlassSurface`/`blur`/`backdrop-filter`/`rgba`/
  `shadow`/`transition`/`animation` string; `focus` appears only as the
  component's own `focusCell` helper (one irreducible literal `.focus()`
  call, needed for the explicitly required automatic focus management
  between cells) plus the native `autoFocus`/`onFocus` props. Input,
  Select, Checkbox, RadioGroup, Switch, Slider, SegmentedControl,
  MultiSelect, Combobox and Autocomplete are all untouched.

- **Autocomplete — composes Input + the frozen Control Surface popup + the
  frozen Select row language, same foundation as Combobox (Built, not
  frozen).** Free text, assisted but never constrained by suggestions; not
  Combobox (a Combobox's value is always exactly one of a closed set —
  Autocomplete's value is always exactly what was typed), not Search Input
  (filters the page, not the field itself), not Command Palette, not
  Select/MultiSelect (closed sets), not Tag Input (discrete tokens vs one
  continuous string), not Dropdown Menu/Menu/Listbox. Zero new exports
  needed anywhere — every `control-surface.tsx` piece was already extracted
  for Combobox; `control-surface.tsx` shows an empty diff, the cleanest
  architectural result of the Control family so far. One deliberate
  behavioral divergence from Combobox: typing never auto-highlights a
  suggestion, so Enter's default keeps exactly what was typed unless the
  user explicitly arrows to a suggestion; Escape/outside-interaction never
  revert the typed text, and there is no no-match error state (verified
  programmatically). autocomplete.tsx grep: zero `GlassSurface`/`blur`/
  `backdrop-filter`/`rgba`/`shadow`/`transition`/`animation` string; `focus`
  appears only as `onFocus` and Radix's `onOpenAutoFocus` prop — zero
  literal `.focus()` calls. Select, Input, Checkbox, RadioGroup, Switch,
  Slider, SegmentedControl, MultiSelect and Combobox are all untouched.

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
