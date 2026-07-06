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
>   - **Full library roadmap (status of every component):
>     `docs/DISCIPLINE_UI_ROADMAP.md`.**
>   - **Select — Control Surface, SIBLING of Input. FROZEN (visually validated
>     2026-07-01).** No redesign again unless an objective bug appears.
>     ```text
>     Select — FROZEN
>     Role:        Control Surface
>     Parent:      ControlSurface
>     Inheritance: GlassSurface → .ds-control → ControlSurface → Select
>     ```
>     Descends from GlassSurface → .ds-control →
>     ControlSurface → Select (NOT derived from Input — Input and Select are
>     siblings). The closed trigger composes the SAME `controlHostClass` +
>     `<ControlSurface/>` as Input, so a closed Select is visually indistinguishable
>     from Input/Textarea/SearchInput (audited: select.tsx has no backdrop/blur/
>     box-shadow/optical layer — material only from ControlSurface). On Radix Select.
>     Owns only interaction: open/close, selected value, placeholder, options,
>     keyboard nav, states, a11y, chevron rotate-on-open (`duration-fast`). Field API:
>     label · description · placeholder · helperText · error (frozen
>     `.ds-control--error` rim) · success (token check) · required · disabled ·
>     readOnly (static full-opacity field) · loading (Spinner replaces chevron) ·
>     value · defaultValue · onValueChange · options[] (value/label/icon/description/
>     disabled) or `Select.Item` children. Menu = token raised surface
>     (`bg-surface-raised shadow-4`, popper-aligned `sideOffset={8}`, viewport-capped,
>     scroll buttons) — not glass. Dropdown-only polish pass (2026-07-01): reads as a
>     suspended floating sheet (stronger `shadow-4` + `sideOffset 8`, no extra
>     blur/glass); selected row is near-white with only the violet ✓ + `font-medium`
>     (highlight a whisper `bg-accent-subtle/45`, not a fill — like the Button Primary
>     halo); more air (viewport `p-1.5`, item `py-2.5`, `gap-3`, title↔description
>     `gap-0.5`). Field untouched. The old composable exports (SelectTrigger/Content/
>     Value/Group/Item) were removed; the two dev usages migrated to `<Select options>`.
>     Proof: `/dev/select` (family + all states + open menu). `'use client'`.
>   - **DatePicker — Control Surface field + Floating Surface calendar. FROZEN
>     (visually validated 2026-07-01).** No redesign again unless an objective bug
>     appears. Two roles, two materials, no mixing:
>     ```text
>     DatePicker — field
>     Role:        Control Surface
>     Parent:      ControlSurface
>     Inheritance: GlassSurface → .ds-control → ControlSurface → DatePicker
>
>     Calendar overlay
>     Role:        Floating Surface
>     Inheritance: GlassSurface → .ds-floating → FloatingSurface
>     ```
>     The closed FIELD composes the SAME `controlHostClass` + `<ControlSurface/>` as
>     Input/Select → indistinguishable when closed (audited: date-picker.tsx has no
>     blur/backdrop/box-shadow/optical layer — material only from ControlSurface +
>     FloatingSurface). The CALENDAR is a Radix Popover whose content composes the
>     NEW reusable **FloatingSurface** helper (`floating-surface.tsx`, mirrors
>     ControlSurface: renders `.ds-floating` + GlassSurface) — the first production
>     consumer of the Floating glass, and the base the future Popover/DropdownMenu/
>     Command Palette will share. Grid/keyboard/nav/ARIA (react-day-picker 9); the
>     field never embeds the grid. Field owns value/placeholder/open; calendar owns
>     layout/grid/animation. Calendar theming is token-only, scoped to
>     `.ds-datepicker-calendar` (date-picker.css) — no material. Overlay entrance:
>     150ms opacity + translateY + slight scale, ease-out, no bounce (respects
>     reduced-motion). API: label · description · placeholder · helperText · error ·
>     success · required · disabled · readOnly · value · defaultValue · minDate ·
>     maxDate · locale (date-fns) · format (date-fns pattern; defaults to the locale's
>     medium date) · onChange · name (hidden ISO input). ARIA: combobox trigger →
>     dialog overlay → grid/gridcell (aria-expanded/controls/selected). Proof:
>     `/dev/date-picker` (family + all states + min/max + locales + formats + open
>     calendar). `'use client'`.
>   - **FileInput — Control Surface, SIBLING of Input. FROZEN (visually validated
>     2026-07-02 — desktop/tablet/mobile).** No redesign again unless an objective
>     bug appears. **The Control family is now 100% frozen** (Input · Textarea ·
>     SearchInput · Select · DatePicker · FileInput).
>     ```text
>     FileInput
>     Role:        Control Surface
>     Parent:      ControlSurface
>     Inheritance: GlassSurface → .ds-control → ControlSurface → FileInput
>     ```
>     The well composes the SAME `.ds-glass .ds-control` + `<ControlSurface/>` as
>     the family (Textarea precedent: same material, taller centered geometry) —
>     audited: file-input.tsx has no blur/backdrop/box-shadow/optical layer/raw
>     color; no new CSS file. Drag-over reuses the frozen `--focus` expression
>     (the violet rises) — no new visual language, no glowing/animated borders.
>     Owns ONLY interaction: click-to-browse (sr-only native input inside the
>     label → `:focus-within` rises), drag & drop (depth-counted enter/leave, no
>     flicker), paste, Escape clears drag state; validation accept (ext/mime/
>     wildcard) + maxSize + maxFiles → `onReject` + inline rejection line + sr-only
>     live announcements (add/remove/reject); previews (image object-URL thumb,
>     video first-frame with icon fallback, PDF/generic icons); removal via the
>     existing **IconButton** (ghost/sm); upload via the existing **Progress**
>     primitive (`showProgress` + `progress`, "Uploading… n%" → "Uploaded").
>     Controlled (`files`) + uncontrolled (`defaultFiles`); `name` posts via the
>     native input. States: empty/hover/focus/dragging/uploading/uploaded/success/
>     error/disabled/readOnly (static well, "n files", rows without remove).
>     Constraint summary auto-derived from accept/maxSize/maxFiles ("PNG · up to
>     1.0 MB · max 2 files") — replaces the old `hint` prop; old `hint`/`onFiles`
>     API removed, both dev consumers migrated. Proof: `/dev/file-input`
>     (family + states + previews + validation, desktop/tablet/mobile).
>     `'use client'`.
>   - **SegmentedControl — Control Surface, first member built on top of the
>     now-frozen Micro foundation. FROZEN (visually validated 2026-07-03).**
>     No functional, visual or architectural change again — objective bugs
>     only. **The Selection Controls family is now officially complete and
>     frozen: Checkbox, Radio, Switch, Slider, SegmentedControl.**
>     ```text
>     Control
>     the frozen optical-layer stack → Control Surface (.ds-glass .ds-control)
>     → SegmentedControl
>     Status: FROZEN
>     ```
>     An exclusive choice among 2–6 visible options, optimized for instant
>     comparison — not RadioGroup (a form field: label + description per
>     option, a long list, read top to bottom), not Tabs (owns a content
>     panel — SegmentedControl only changes a value, nothing else on the page
>     is implied to change), not a Button Group (independent actions, each
>     fires something — a segment never fires, it only marks "this one"),
>     not a Toggle Group (items independently on/off — a segment is
>     exclusive by construction), not Select (trades visibility for density
>     on long lists — SegmentedControl trades density for visibility, never
>     hides an option). Built on the SAME Radix primitive as the frozen
>     Radio (`@radix-ui/react-radio-group`: roving reachability, Arrow keys
>     move AND select, full ARIA) — reused, not reinvented — but composed
>     directly rather than nesting the `<Radio>` component (entirely
>     different geometry: a compact strip, not a labeled list). The strip is
>     the SAME recessed Control Surface glass Input/Select already use
>     (`<ControlSurface/>` inside `.ds-glass .ds-control`). Every segment
>     nests its own glass layers (`.ds-glass ds-micro` — deliberately
>     Micro-tuned, not the Control-tuned recipe it would otherwise inherit
>     from its `.ds-control` ancestor, so a selected segment reads
>     byte-identical to the frozen Switch rail), kept invisible at rest and
>     revealed only once selected — new `microControlSelectedGlassClass` in
>     `micro-control.tsx`, the `data-state`-gated sibling of Slider's
>     `microControlActiveGlassClass` (additive; Checkbox/Radio/Switch/Slider
>     untouched, grep-verified). segmented-control.tsx grep: zero
>     `GlassSurface`/`blur`/`backdrop-filter`/`rgba`/`shadow`/`transition`/
>     `animation`/`focus` string — every optical/motion decision is imported
>     by name. Invalid state reuses the frozen `.ds-control--error` edge tint
>     (`controlStateClass`), NOT the Micro invalid rim — SegmentedControl is
>     a Control Surface member, so its error language matches Input/Select,
>     not Checkbox/Radio/Switch/Slider. readOnly: same controlled/no-handler
>     inert pattern as the frozen RadioGroup (verified programmatically:
>     click and Arrow keys are inert). API: value/defaultValue/onValueChange
>     · disabled · readOnly · invalid · required (marker + native) ·
>     orientation horizontal/vertical · size sm/md/lg · label · description ·
>     error · helperText. Compound API: `SegmentedControl` +
>     `SegmentedControl.Item` (children-based, mirroring RadioGroup/Radio).
>     Proof: `/dev/segmented-control` — states (default/selected/hover/
>     focused/disabled/readOnly/invalid/required), sizes, orientation
>     (horizontal + vertical), real examples (units, system, range,
>     appearance, sex, portfolio, fitness level, program focus);
>     desktop/tablet/mobile + rich-background + hover + focus + keyboard
>     captures. `'use client'`.
>   - **MultiSelect — Control Surface, composes Control Surface + the frozen
>     Checkbox. FROZEN (visually validated 2026-07-03).** No functional,
>     visual or architectural change again — objective bugs only. **The
>     Selection Controls are now officially complete and frozen: Checkbox,
>     Radio, Switch, Slider, SegmentedControl, MultiSelect.**
>     ```text
>     Control
>     the frozen optical-layer stack → Control Surface → MultiSelect → Checkbox
>     Status: FROZEN
>     ```
>     A list of values, several selectable at once — open/select/deselect/
>     close while keeping context. Not Select (exactly one value, closes the
>     instant you pick), not Dropdown Menu (a menu is commands that fire;
>     MultiSelect is a form field — same reason it does not compose the
>     Dropdown Menu primitive even though both open a panel), not Command
>     Palette (a global searchable command surface vs. a scoped field), not
>     Checkbox Group (always-visible, every option printed — MultiSelect
>     trades that visibility for density, exactly where Select sits relative
>     to Radio), not Tag Input (free-text creatable tokens vs. a closed set
>     of predefined options), not Combobox (filters a list and picks ONE
>     `role="option"` — MultiSelect never filters and every row keeps real
>     Checkbox semantics: `role="checkbox"`, `aria-checked`).
>     The trigger is the exact `.ds-glass .ds-control` well Input/Select/
>     Textarea already use (`<ControlSurface/>` — zero new material). The
>     open panel reuses the frozen Select menu's OWN recipe verbatim — three
>     new additive exports in `control-surface.tsx` (`controlPanelClass`,
>     `controlPanelPaddingClass`, `controlChevronMotionClass`, all pure
>     extractions from `SelectPrimitive.Content`'s existing className; Select
>     itself untouched) — a raised token surface, not a second glass. Every
>     row is the real, frozen `<Checkbox/>` component — not its classes
>     recreated, the component itself — so the item language can never
>     drift. multiselect.tsx grep: zero `GlassSurface`/`blur`/
>     `backdrop-filter`/`rgba`/`shadow`/`transition`/`animation` string.
>     TRANSPARENT EXCEPTION: `focus` appears 3 times — two native DOM
>     `.focus()` calls and Radix's own `onOpenAutoFocus` prop name — because
>     a raw `@radix-ui/react-popover` has no bundled roving-reachability the
>     way RadioGroup/Slider's own primitives do; Arrow Up/Down/Home/End are
>     hand-rolled in ref/keyboard code only (zero CSS, zero material, no
>     custom focus ring — the GLOBAL `:focus-visible` rule still applies
>     unmodified). Select/Checkbox/Radio/Switch/Slider/SegmentedControl are
>     all untouched (grep-verified). On Radix Popover (Escape, outside
>     click, positioning/collision) + Radix Checkbox (Space toggles, ARIA)
>     for every row. readOnly mirrors Select's own readOnly convention (a
>     static field showing the current values, never opens). API:
>     value/defaultValue/onValueChange · options[] (value/label/description/
>     disabled) · disabled · readOnly · invalid · required · placeholder ·
>     label · description · helperText · error · size sm/md/lg. Proof:
>     `/dev/multiselect` — states (default/open/disabled/readOnly/invalid/
>     required/loading/empty), real examples (sports, languages, goals,
>     permissions, workout filters, food preferences, countries);
>     desktop/tablet/mobile + rich-background + opened/closed/selection/
>     disabled/keyboard captures. `'use client'`.
>   - **Combobox — Control Surface, composes Input + the frozen Control
>     Surface popup + the frozen Select row language. FROZEN (visually
>     validated 2026-07-03).** No functional, visual or architectural change
>     again — objective bugs only.
>     ```text
>     Control
>     the frozen optical-layer stack → Control Surface → Combobox → Input →
>     Popup → Scrollable list → Selectable row
>     Status: FROZEN
>     ```
>     A single value found through search across a very large list — not
>     Select (built for a short, fully-legible list; no search needed), not
>     MultiSelect (several values, stays open across many toggles vs. one
>     value that closes on commit), not Command Palette (a global, app-wide
>     command surface vs. a scoped field bound to one label), not Search
>     Input (filters the page's own visible content — typed text there IS
>     the effect; here typed text is never itself the value), not
>     Autocomplete (suggests completions for free text that stays free text;
>     Combobox's final value is always exactly one of `options`), not
>     Dropdown Menu / Menu (commands that fire vs. a value field), not
>     Listbox (a bare listbox has no search — exactly the scanning problem
>     Combobox solves once options exceed a screenful).
>     The trigger is Input itself — not its classes rebuilt, the component:
>     label, description(added by Combobox itself, since Input has no
>     `description` prop), error/helperText, the `.ds-glass .ds-control`
>     well, all inherited for free. The popup is the frozen Control Surface
>     popup recipe (`controlPanelClass`, the exact same raised token surface
>     already validated on Select/MultiSelect). Rows reuse the frozen
>     Select row's own visual language — three new additive exports in
>     `control-surface.tsx` (`controlOptionRowClass`,
>     `controlOptionHighlightClass`, `controlOptionDisabledClass`, pure
>     extractions from `SelectItem`'s existing className; Select itself
>     untouched) — never a rebuilt checkbox, radio or menu item. The list is
>     a plain scrollable region (`overflow-y-auto`; no dedicated ScrollArea
>     primitive exists in this codebase — Select's own menu uses the same
>     plain technique).
>     combobox.tsx grep: zero `GlassSurface`/`blur`/`backdrop-filter`/
>     `rgba`/`shadow`/`transition`/`animation` string. TRANSPARENT
>     EXCEPTION: `focus` appears twice — `onFocus` (opens the list when the
>     field receives it) and Radix's own `onOpenAutoFocus` prop (prevented,
>     to keep reachability on the input instead of letting Radix pull it
>     into the popup) — both real DOM/Radix event-prop names, not material.
>     Zero literal `.focus()` calls anywhere (cleaner than MultiSelect's 3):
>     Arrow Up/Down/Home/End move a pure `aria-activedescendant` pointer, so
>     real DOM reachability never leaves the input at all — verified
>     programmatically (`document.activeElement` stays the combobox input
>     through open + two ArrowDown presses + Enter). Select, Input,
>     Checkbox, RadioGroup, Switch, Slider, SegmentedControl and MultiSelect
>     are all untouched (grep-verified). Full WAI-ARIA Combobox pattern:
>     `role="combobox"`, `aria-expanded`, `aria-controls`,
>     `aria-activedescendant`, `role="listbox"`/`role="option"`,
>     `aria-selected`. Search is instant (no debounce), case- and
>     accent-insensitive via the standard `String.prototype.normalize('NFD')`
>     technique (built-in JS, no new dependency) — verified programmatically
>     ("ger" → only Germany). KNOWN LIMITATION (documented, not silently
>     patched): Input's `error` prop needs an actual message to show the red
>     rim (same as Select's own established constraint); a message-less
>     `invalid` flag still sets `aria-invalid` correctly but has no visual
>     rim when composing the frozen Input as-is. API:
>     value/defaultValue/onValueChange · options[] · placeholder ·
>     searchPlaceholder · disabled · readOnly (native `readOnly`, shows the
>     selected label as static text) · required · invalid · loading
>     (spinner in Input's own suffix slot, blocks opening) · emptyMessage ·
>     label · description · helperText · error · size sm/md/lg. Proof:
>     `/dev/combobox` — states (closed/open/searching/filtered/loading/no
>     result/disabled/readOnly/invalid/required), real examples (countries,
>     languages, exercises, foods, sports, workout templates, permissions);
>     desktop/tablet/mobile + rich-background + opened/closed/searching/
>     filtered/no-result/keyboard captures. `'use client'`.
>   - **Autocomplete — Control Surface, composes Input + the frozen Control
>     Surface popup + the frozen Select row language (same foundation as
>     Combobox). FROZEN (visually validated 2026-07-03).**
>     ```text
>     Control
>     the frozen optical-layer stack → Control Surface → Autocomplete → Input
>     → Popup → Scrollable list → Selectable row
>     Status: FROZEN
>     ```
>     Free text, assisted but never constrained by suggestions — not
>     Combobox (a Combobox's final value is always exactly one of a CLOSED
>     `options` set; typed text matching nothing cannot be committed.
>     Autocomplete's value is always exactly what was typed — a suggestion
>     only speeds up typing, never gates it), not Search Input (filters the
>     page's own visible content; Autocomplete filters nothing outside its
>     own field), not Command Palette (a global command surface vs. a scoped
>     free-text field), not Select/MultiSelect (both carry a value from a
>     closed, predefined set — free text is impossible by construction), not
>     Tag Input (creates discrete tokens accumulated into a list of values;
>     Autocomplete carries ONE continuous string, never a collection), not
>     Dropdown Menu/Menu (commands, not a text field), not Listbox (a closed
>     selection, never arbitrary text).
>     Same physical composition as the frozen Combobox: the trigger is Input
>     itself, the popup is the frozen Control Surface popup recipe, rows
>     reuse the frozen Select row's own visual language. **Zero new exports
>     needed anywhere** — every `control-surface.tsx` piece was already
>     extracted for Combobox (`controlPanelClass`,
>     `controlPanelPaddingClass`, `controlChevronMotionClass`,
>     `controlOptionRowClass`, `controlOptionHighlightClass`,
>     `controlOptionDisabledClass`); `control-surface.tsx` itself shows an
>     EMPTY diff — the cleanest architectural result of the Control family
>     so far, pure reuse.
>     THE ONE DELIBERATE BEHAVIORAL DIVERGENCE from Combobox: typing never
>     auto-highlights a suggestion (`activeIndex` stays -1 until the user
>     explicitly presses an arrow key), so Enter's default outcome is always
>     "keep exactly what I typed" — accepting a suggestion is something the
>     user opts into, never sprung on them. Verified programmatically:
>     typing "Pa" + Enter (no arrow) keeps "Pa"; typing "Pa" + ArrowDown +
>     Enter accepts "Paris". Escape/outside-interaction close WITHOUT
>     reverting the typed text (unlike Combobox, which reverts to the last
>     committed option) since every typed string is already valid. No
>     `emptyMessage`/no-match-is-an-error concept exists: verified
>     programmatically that typing an unmatched string ("Nowhereville")
>     commits correctly with no forced empty-state panel — not matching a
>     suggestion is a normal outcome for free text, not an error.
>     autocomplete.tsx grep: zero `GlassSurface`/`blur`/`backdrop-filter`/
>     `rgba`/`shadow`/`transition`/`animation` string; `focus` appears only
>     as `onFocus` (opens the list on focus) and Radix's own
>     `onOpenAutoFocus` prop (prevented, keeping reachability on the input) —
>     zero literal `.focus()` calls, same clean pattern as Combobox. Select,
>     Input, Checkbox, RadioGroup, Switch, Slider, SegmentedControl,
>     MultiSelect and Combobox are all untouched (grep-verified). Search is
>     instant, case- and accent-insensitive via the same standard
>     `String.prototype.normalize('NFD')` technique as Combobox. API:
>     value/defaultValue/onValueChange · options[] (label/disabled) ·
>     placeholder · disabled · readOnly (native `readOnly`, shows current
>     text) · required · invalid · loading (spinner in Input's own suffix
>     slot) · label · description · helperText · error · size sm/md/lg.
>     Proof: `/dev/autocomplete` — states (closed/open/typing/free-text/
>     loading/disabled/readOnly/invalid/required), real examples (city,
>     exercise, job title, email domain); desktop/tablet/mobile +
>     rich-background + opened/typing/free-text/keyboard captures.
>     `'use client'`.
>   - **OTP Input — Control Surface, composes the frozen Control Surface cell
>     recipe. FROZEN (visually validated 2026-07-03, after the cell-geometry
>     recalibration pass).**
>     ```text
>     Control
>     the frozen optical-layer stack → Control Surface → OTP Input
>     Status: FROZEN
>     ```
>     A specialized field for a code made of several independent characters
>     that together represent exactly ONE logical value: several visual
>     cells, one logical string. Not Input (Input's box COUNT is the point of
>     OTP Input — a single `<Input maxLength={6}>` cannot do smart
>     per-position Backspace, per-position arrow navigation, or auto-advance
>     between cells), not Autocomplete/Combobox/Select/MultiSelect (all four
>     resolve typed or chosen text against a set of candidate strings; an OTP
>     code is never matched against options, only received), not Search
>     Input (nothing is filtered — the code IS the value, not a query), not
>     Password Input (a password is one opaque string in one field, revealed/
>     hidden as a whole; an OTP code is legible by construction and split
>     across boxes precisely so each character can be independently
>     confirmed), not Pin Display/Code Viewer (those present a code that
>     already exists, read-only; this component's job is to accept typed/
>     pasted input and produce a value), not Verification Card (a
>     page-level composition — heading, instructions, resend, submit — built
>     AROUND a field like this one, a layout concern for the consumer, not
>     the field), not Form Group (a Form Group lays out several independent
>     fields; here there is exactly one field, one logical value — the
>     cells are the value's own internal geometry, not independent fields).
>     Each cell is the exact Control Surface well Input itself renders
>     (`.ds-glass .ds-control` + `<ControlSurface/>`), compacted into a
>     square via the new `controlCellClass` (additive in
>     `control-surface.tsx`, Input untouched — no fixed height/width, sizing
>     stays a layout decision of OTP Input per Invariant A1). A real
>     `<input maxLength={1}>` sits in every cell — never a styled `<div>`
>     showing a character — so native text selection, screen readers and
>     mobile numeric keyboards keep working for free. Typing auto-advances
>     to the next empty cell; Backspace on an empty cell moves back and
>     clears the previous cell; Arrow Left/Right/Home/End move between
>     cells; pasting a full code anywhere splits it across the remaining
>     cells from that point on. A plain joined string can only represent a
>     CONTIGUOUS run of filled cells, so a cell focused directly by the user
>     past an earlier empty one redirects focus to that earlier cell instead
>     (gaps become structurally impossible, verified programmatically);
>     focus moves the component triggers itself (auto-advance/arrows/paste)
>     are exempt via a ref flag so they are never second-guessed against a
>     stale render. otp-input.tsx grep: zero `GlassSurface`/`blur`/
>     `backdrop-filter`/`rgba`/`shadow`/`transition`/`animation` string;
>     `focus` appears as `focusCell` (the component's own helper, containing
>     exactly one literal `.focus()` DOM call — irreducible, since automatic
>     focus management between cells was an explicit requirement), the
>     `autoFocus`/`onFocus` native DOM props. Input/Select/Checkbox/Radio/
>     Switch/Slider/SegmentedControl/MultiSelect/Combobox/Autocomplete
>     untouched (grep-verified); control-surface.tsx shows one small
>     additive export (`controlCellClass`), nothing else changed. API:
>     length (4/6/8…) · value/defaultValue/onValueChange · onComplete ·
>     numeric · disabled · readOnly · autoFocus · required · invalid ·
>     label/description/helperText/error · size sm/md/lg · name (hidden
>     field for form submission). Proof: `/dev/otp-input` — states (empty/
>     progressive typing/filled/error/disabled/readOnly/autofocus/paste),
>     lengths (4/6/8), sizes (sm/md/lg); desktop/tablet/mobile +
>     rich-background captures. `'use client'`.
>   - **Time Picker — Control Surface, composes Input + the frozen Popover.
>     FROZEN (visually validated 2026-07-03).**
>     ```text
>     Control
>     the frozen optical-layer stack → Control Surface → Time Picker → Input
>     → Popover → Scrollable hour/minute lists → Selectable row
>     Status: FROZEN
>     ```
>     Select an hour (and optionally minutes) representing exactly ONE
>     point-in-time value. Not Date Picker (a date is a day-grid with month/
>     year navigation; a time has no such structure — two small bounded
>     numbers best scanned as short scrolling lists), not Calendar (the
>     day-grid Date Picker delegates to; Time Picker has no calendar concept
>     at all), not Select (an arbitrary domain list vs. a fixed 0-23/0-59
>     numeric grammar with a directly type-in-able field), not Combobox/
>     Autocomplete (neither resolves free text against a bounded numeric
>     grammar with automatic hour→minute progression), not Input (a raw
>     text Input has no popup, no keyboard-drivable list, no 24h parsing —
>     Time Picker adds exactly that on top of Input, it does not replace
>     it), not Number Input (a number has no format, no colon, no two-part
>     structure), not Clock (only DISPLAYS the current time, read-only,
>     never accepts a value), not Duration Picker (an elapsed span with no
>     fixed origin and no AM/PM concept, vs. a time anchored to one day's
>     24h cycle), not Scheduler (a page-level composition built AROUND
>     fields like this one), not Time Range Picker (two Time Pickers plus a
>     start<end invariant — a consumer's layout/validation concern, not
>     this field's job). The trigger is Input itself (not its classes
>     rebuilt); the popup is the actual frozen `<Popover/>` component
>     (Floating Surface material) — unlike Combobox/MultiSelect/Autocomplete,
>     which reuse the raised Control Surface popup recipe extracted from
>     Select, Time Picker's picker is a genuinely separate, self-contained
>     surface, so composing the real frozen Popover is the more honest,
>     more reused choice. Rows reuse the frozen Select row's own visual
>     language (`controlOptionRowClass`/`controlOptionHighlightClass`/
>     `controlOptionDisabledClass`, already extracted for Combobox/
>     MultiSelect — zero new export needed anywhere). The canonical value is
>     ALWAYS a 24h "HH:mm" string; a future 12h/AM-PM display mode is a pure
>     formatting layer on the same canonical value and cannot break the
>     picker's two-list architecture. time-picker.tsx grep: zero
>     `GlassSurface`/`blur`/`backdrop-filter`/`rgba`/`shadow`/`transition`
>     string; `focus` appears as 7 literal `.focus()` calls (hand-rolled
>     roving reachability between the hour/minute button lists, since a raw
>     Popover has no bundled roving focus for a custom two-column grid —
>     same justified pattern as the frozen MultiSelect) plus the native
>     `onFocus`/`onOpenAutoFocus` props; `requestAnimationFrame`/
>     `cancelAnimationFrame` (a browser scheduling API, not a decorative
>     motion effect) are the only `animation`-string occurrences, needed
>     because the popup's row refs attach one frame after Radix mounts its
>     Presence-driven content. Input/Select/Checkbox/Radio/Switch/Slider/
>     SegmentedControl/MultiSelect/Combobox/Autocomplete/OtpInput/Popover
>     all untouched (grep-verified); zero shared-file diff anywhere (every
>     `control-surface.tsx`/`popover.tsx` export needed already existed).
>     A real bug found and fixed during the build: the popup's initial
>     scroll-to-committed-value silently did nothing on first open, because
>     the effect ran before Radix's Presence-driven content had actually
>     mounted the row refs — fixed by deferring the scroll one animation
>     frame. API: value/defaultValue/onValueChange · granularity hour/minute
>     · minuteStep · minTime/maxTime · disabled · readOnly · loading ·
>     required · label/description/helperText/error · name. Proof:
>     `/dev/time-picker` — states (closed/open/selected/keyboard/disabled/
>     readOnly/error/loading/required), granularities (hour-only/hour+
>     minutes), real examples; desktop/tablet/mobile + rich-background +
>     opened/keyboard/granularities captures. `'use client'`.
>   - **Date Range Picker — Control Surface, composes Input + the frozen
>     DatePicker calendar language in range mode. FROZEN (visually
>     validated 2026-07-03).**
>     ```text
>     Control
>     the frozen optical-layer stack → Control Surface → Date Range Picker
>     → Input (trigger) → Popover surface (.ds-floating) → Calendar grid
>     → Range
>     Status: FROZEN
>     ```
>     A start and an end date representing exactly ONE logical value: a
>     continuous period. Not Date Picker (commits ONE day and closes; a
>     period is a different value type — two ordered anchors + everything
>     between, with its own grammar: partial state, inversion, in-range
>     band), not Calendar (the day-grid a picker delegates to — renders
>     days, holds no field/popup/value), not Time Picker (hours inside one
>     day vs. days across months), not DateTime Picker (one instant vs. a
>     span of days), not Range Slider (two numbers on a continuous axis by
>     dragging — no calendar structure), not Time Range Picker (two times
>     within a day), not Month/Year Picker (one coarser unit, still a
>     single anchor, never a pair), not MultiSelect (independent unordered
>     values vs. two ORDERED anchors implying everything between — you
>     cannot deselect the middle), not Combobox (nothing searched or
>     matched), not Scheduler/Booking Calendar/Availability Calendar
>     (page-level compositions built AROUND a field like this), not
>     Timeline/Gantt (read-oriented visualizations of many spans vs. one
>     input for one span), not Form Group (one field, one value — start/end
>     are the value's own internal structure). The trigger is Input itself
>     (`.ds-glass .ds-control` well, meta row, suffix slot inherited; the
>     displayed text is the formatted period, never free-typed — frozen
>     DatePicker convention). The overlay is the SAME Floating Surface +
>     calendar language the frozen DatePicker validated (`floatingHostClass`
>     + `<FloatingSurface/>` + `ds-datepicker-content`/
>     `ds-datepicker-calendar`, react-day-picker in `mode="range"` — same
>     engine, keyboard model and ARIA). ONE strictly additive rule appended
>     to `date-picker.css` (`.rdp-range_middle`): the in-range band reuses
>     the site-wide accent-subtle highlight, no new color/opacity/material
>     value; the frozen DatePicker's own rendering is byte-identical (the
>     class never appears in single mode; pure insertion, zero existing
>     lines changed). Selection grammar (driven from committed state + the
>     picked day, NOT react-day-picker's suggestion — a real bug found and
>     fixed during the build: v9's range mode returns `{from: day, to: day}`
>     on the very FIRST pick, which would commit an instantly complete
>     single-day period and close): first pick anchors the start (popup
>     stays open, field shows "Jul 10, 2026 – …"), second pick anchors the
>     end and closes; an end picked EARLIER than the start swaps into place
>     (a period has no invalid orientation — verified programmatically:
>     picking 20 then 12 commits 12→20); picking any day over a complete
>     period starts a fresh one. Focus moves into the grid on open (frozen
>     DatePicker precedent) and is handed back to the field on close via
>     `onCloseAutoFocus` (ONE literal `.focus()` call — irreducible, there
>     is no Radix Trigger to restore it since the anchor is Input itself).
>     date-range-picker.tsx grep: zero `GlassSurface`/`blur`/
>     `backdrop-filter`/`rgba`/`shadow`/`transition`/`animation` string;
>     `focus` appears as that one `.focus()` call + the `autoFocus` props
>     (consumer opt-in on the field; DayPicker grid autofocus, both with
>     the frozen DatePicker's own precedent) + Radix's `onCloseAutoFocus`
>     prop name. Input/Select/DatePicker/Checkbox/Radio/Switch/Slider/
>     SegmentedControl/MultiSelect/Combobox/Autocomplete/OtpInput/
>     TimePicker/Popover all untouched (grep-verified). API:
>     value/defaultValue/onChange ({from, to}) · minDate/maxDate · locale ·
>     format · disabled · readOnly · loading · required · invalid ·
>     autoFocus · label/description/helperText/error · name (two hidden
>     yyyy-MM-dd fields `-start`/`-end`) · className · data-testid. Proof:
>     `/dev/date-range-picker` — states (empty/open/partial/complete/
>     keyboard/inversion/month-nav/loading/disabled/readOnly/error/invalid/
>     required), bounds, real examples; desktop/tablet/mobile +
>     rich-background + opened/partial/keyboard captures; programmatic
>     assertions for open/close, start/end, inversion, keyboard, month
>     navigation, focus return, ARIA, disabled/readOnly/loading,
>     validation. `'use client'`.
>   - **Color Picker — Control Surface, composes Input + the frozen Popover
>     + the frozen IconButton. FROZEN (visually validated 2026-07-03).**
>     ```text
>     Control
>     the frozen optical-layer stack → Control Surface → Color Picker
>     → Input (trigger) → Popover (frozen Floating pane) → Palette listbox
>     + Hex Input + Copy IconButton
>     Status: FROZEN
>     ```
>     A form field committing exactly ONE color value, chosen visually from
>     a palette or entered as hex. Not Input (no swatch preview, no palette,
>     no popup, no color grammar — Color Picker adds exactly that ON TOP of
>     Input, the trigger IS an Input), not Select (labeled text rows vs. a
>     color chosen by SEEING it, and free hex entry means the domain is
>     open, not a closed list), not Combobox/Autocomplete (nothing searched
>     or completed — hex is a fixed 6-digit FORMAT, not a query), not Radio
>     Group/Segmented Control (small closed sets of labeled, always-visible
>     choices; the palette is only a shortcut inside an open value space),
>     not Palette/Swatch Grid (the display structures this field composes
>     internally — no field, no popup, no committed value on their own),
>     not Theme Selector (an app-level MODE, a named bundle of many tokens,
>     vs. one literal color in one field), not Gradient Editor (several
>     colors + stops + direction — a different value type built ON TOP of
>     single-color picking), not Opacity Slider (alpha is one CHANNEL of a
>     color, not a color), not RGB/HSL Editor (channel-by-channel editing
>     surfaces — alternate input formats a future extension could add
>     INSIDE this same panel, never siblings), not Hex Input (one internal
>     organ of this component — alone it has no palette, preview or popup),
>     not Eyedropper (a screen-sampling capture TOOL, not a form field),
>     not Canvas Editor/Image Picker (drawing/file selection — different
>     value types), not MultiSelect (ONE color, never a collection), not
>     Form Group (one field, one logical value — palette, hex field and
>     copy action are the value's own input organs). The trigger is Input
>     itself: the current color sits in Input's own prefix slot as a small
>     swatch, the text is the committed hex, never free-typed (frozen
>     DatePicker/DateRangePicker convention); Palette icon / Spinner in the
>     suffix slot. The panel is the actual frozen `<Popover/>` (Floating
>     Surface — TimePicker precedent): a `role="listbox"` swatch grid using
>     the Select family's check-mark = selected language (contrast-aware
>     mark via a perceived-brightness check), the real frozen `<Input>` for
>     hex entry, the real frozen `<IconButton>` for copy (icon flips to a
>     ✓ for 1.5s). Palette ↔ hex perfectly synchronized both ways (verified
>     programmatically in both directions); the panel STAYS OPEN across
>     picks (color choice is iterative — MultiSelect precedent), closes on
>     Escape/outside. Canonical value: `#RRGGBB` uppercase, '' when empty;
>     "RGB"/"#RGB"/"RRGGBB"/"#RRGGBB" all accepted on entry (3-digit
>     shorthand commits on Enter only, so typing a full value never commits
>     a wrong intermediate color; a complete 6-digit value live-commits as
>     typed). Alpha deliberately NOT implemented: an eventual `alpha` prop
>     would extend the canonical string to #RRGGBBAA and add one opacity
>     row (the frozen Slider) inside this same panel — a pure extension,
>     nothing breaks later. Swatch backgrounds are set from palette DATA
>     (`style.backgroundColor` = the candidate value itself — a Select
>     option's label, an Avatar's image), never this component's own
>     material, which stays 100% frozen-token glass; the built-in default
>     palette (24 entries) is the one documented, narrowly-scoped exception
>     to the Phase-02 no-raw-color-literals rule (value domain = data, the
>     rule keeps MATERIAL token-pure). color-picker.tsx grep: zero
>     `GlassSurface`/`blur`/`backdrop-filter`/`rgba`/`shadow`/`transition`
>     string; `requestAnimationFrame` (a browser scheduling API, not
>     decorative motion — TimePicker precedent) is the only
>     `animation`-string occurrence; `focus` = 3 literal `.focus()` calls
>     (swatch grid roving reachability, initial landing on the current
>     swatch, return-to-field on close — all irreducible, same justified
>     patterns as MultiSelect/TimePicker/DateRangePicker) + the `autoFocus`
>     props. ZERO modified files outside the new component — not even an
>     additive shared-file extension was needed; Input, Popover,
>     IconButton, Icon, Label and Spinner already provided everything
>     (cleanest composition since Autocomplete). API:
>     value/defaultValue/onValueChange · palette (default
>     `colorPickerDefaultPalette`, 24 entries) · disabled · readOnly ·
>     loading · required · invalid · autoFocus ·
>     label/description/placeholder/helperText/error · name (hidden field)
>     · className · data-testid. Proof: `/dev/color-picker` — states
>     (empty/open/with-value/keyboard/hex-entry/loading/disabled/readOnly/
>     error/invalid/required), custom palette, real examples;
>     desktop/tablet/mobile + rich-background + opened/picked/keyboard
>     captures; programmatic assertions for open/close, mouse pick,
>     palette→hex and hex→palette sync, custom hex entry + normalization,
>     copy-to-clipboard, keyboard grid navigation, focus landing/return,
>     ARIA, disabled/readOnly/loading, validation. `'use client'`.
>   - **Alert Dialog — Immersive, composes the Modal foundation + the frozen
>     Button. FROZEN (visually validated 2026-07-03).**
>     ```text
>     Immersive
>     the frozen optical-layer stack → .ds-immersive → ImmersiveSurface
>     → Modal (the Dialog foundation) → Alert Dialog
>     Status: FROZEN
>     ```
>     An interrupting confirmation: the app stops and asks ONE question
>     that must be answered — confirm or cancel — before anything else can
>     happen. Not Dialog/Modal (the generic immersive container, any
>     content, dismissible by outside click; Alert Dialog is a specialized
>     MESSAGE + BINARY CHOICE on top: `role="alertdialog"`, outside click
>     never dismisses, initial focus on the least destructive action), not
>     Popover (anchored, flow-preserving, non-blocking), not Tooltip (a
>     hover label, never interactive), not Hover Card (passive preview),
>     not Toast (transient, self-dismissing, never blocks — a toast
>     informs, an alert dialog interrogates), not Banner/Alert (inline,
>     persistent, page-level information with no required answer), not
>     Notification (news about what already happened vs. a question about
>     what is ABOUT to happen), not Confirm Dialog (the same species — the
>     neutral variant of this component, not a sibling), not Sheet/Drawer
>     (edge-anchored secondary CONTENT), not Dropdown/Context Menu
>     (command lists), not Command Palette (the other Immersive member —
>     same Modal parent, different job), not Form (NO fields — the moment
>     it needs input it has become a form Dialog), not Wizard (multiple
>     steps vs. one question), not Card (static structural container), not
>     Message Box (the OS primitive `window.confirm` — this is its
>     design-system-native replacement). Composes the Modal COMPONENT only
>     (never the primitives underneath — Modal's own rule): scrim, pane
>     material (frozen `.ds-immersive`/`.ds-scrim`), entrance, focus trap,
>     scroll lock, Escape, inert background, portal, focus return and the
>     Title/Description ARIA wiring all inherited verbatim. Adds exactly
>     the alert semantics: `role="alertdialog"` + `aria-modal`,
>     outside-click dismissal disabled, initial focus on Cancel, and the
>     two frozen `<Button>`s — Cancel always `secondary`, Confirm `primary`
>     (neutral) or `destructive` (destructive variant; the frozen error
>     fill under the glass edge, zero new recipe). `loading` = the frozen
>     Button's own loading state on Confirm, with EVERY dismissal path
>     locked while in flight (Escape prevented, Cancel disabled — an
>     in-flight destructive action must not be abandonable halfway).
>     Uncontrolled (with `trigger`): confirm/cancel close by themselves;
>     controlled: closing after confirm belongs to the consumer (enables
>     async flows). Size prop sm/md/lg = pane max-width geometry only
>     (md IS Modal's own frozen intrinsic width, untouched — Invariant A1:
>     AlertDialog is the consumer making the layout decision).
>     alert-dialog.tsx grep: zero `GlassSurface`/`blur`/`backdrop-filter`/
>     `rgba`/`shadow`/`transition`/`animation` string; `focus` = ONE
>     literal `.focus()` call (initial focus on Cancel — the WAI-ARIA
>     alertdialog requirement; irreducible, Radix's default would land on
>     the first focusable instead) + Radix's `onOpenAutoFocus` prop name.
>     ZERO files modified outside the new component — Modal and Button
>     provided everything. API: trigger · open/defaultOpen/onOpenChange ·
>     title (required) · description · icon · variant neutral/destructive ·
>     confirmLabel/cancelLabel · onConfirm/onCancel · loading · disabled ·
>     size sm/md/lg · data-testid. Proof: `/dev/alert-dialog` — variants
>     (simple confirmation/destructive deletion/irreversible action),
>     states (loading/disabled/long content), sizes; desktop/tablet/mobile
>     + rich-background + neutral/destructive/long/loading/sizes/
>     mobile-open captures; programmatic assertions for open/close, Escape,
>     Cancel click, Confirm click (+ callbacks), initial focus on Cancel,
>     focus trap + TAB order (wrap both directions), focus return,
>     outside-click NON-dismissal, ARIA (role/aria-modal/labelledby/
>     describedby), the frozen destructive Button
>     (`data-glass-variant="destructive"`), loading locks every dismissal
>     path, disabled, increasing size scale. `'use client'`.
>   - **Fullscreen Overlay — Immersive, composes the Modal foundation + the
>     frozen IconButton/Spinner. FROZEN (visually validated 2026-07-06).**
>     No functional, visual or architectural change again — objective bugs
>     only.
>     ```text
>     Immersive
>     the frozen optical-layer stack → .ds-immersive → ImmersiveSurface
>     → Modal (the Dialog foundation) → Fullscreen Overlay
>     Status: FROZEN
>     ```
>     DISCIPLINE's maximal immersive surface: a temporary takeover of the
>     ENTIRE viewport for a long, complex or focus-hungry task, without
>     leaving the current page. Not a bigger Drawer (a Drawer keeps the page
>     visible beside it as context; the overlay deliberately REMOVES that
>     context so nothing competes), not a fullscreen Dialog (a Dialog is a
>     bounded MOMENT sized to its content — a decision or a small form; the
>     overlay is an ENVIRONMENT with header/body/footer/sidebars/toolbars, a
>     place you inhabit for minutes), not a Bottom Sheet (gesture-driven,
>     detents; the overlay is always the whole screen and keyboard/pointer
>     first), not AlertDialog (a blocking question), not Command Palette
>     (search-to-jump), not Popover/Tooltip (anchored, non-blocking), not
>     Sidebar/Navigation Drawer (persistent layout regions), not a Wizard (a
>     multi-step flow that may LIVE inside an overlay — content, not the
>     surface), not a Page (a routed destination with a URL — the overlay is
>     transient and returns you exactly where you were). Why not each
>     sibling: Dialog/AlertDialog interrupt for a decision; Drawer preserves
>     page context; Bottom Sheet is touch physics; Command Palette jumps;
>     Popover is anchored; Sidebar persists; a Page owns a URL. When to use:
>     a task that fills the screen and the mind — editor, program builder,
>     client creation, onboarding, AI assistant, media viewer, fullscreen
>     search, comparison. When FORBIDDEN: a confirmation, a short form, a
>     menu, contextual info, anything the page can host inline, and anything
>     that deserves its own URL (that is a Page). Composes the Modal
>     COMPONENT only — focus trap, restore focus, scroll lock, Escape,
>     overlay, portal, inert background and Title/Description ARIA inherited
>     verbatim (fullscreen-overlay.tsx contains ZERO focus/overlay/portal/
>     scroll-lock code, grep-verified). Owns ONLY its geometry (edge-to-
>     edge, 100dvh, `w-screen`, no centering, no radius — the frozen
>     CommandPalette pane neutralization `p-0`), its slots (header ·
>     breadcrumb · search · toolbar · sidebar · body · inspector · footer ·
>     status bar) and its layout: a flex column where the header, toolbar,
>     footer and status bar are sticky (`shrink-0`), the middle band is the
>     only growing row (`flex-1 min-h-0`), and the BODY is the only scroll
>     region (`overflow-y-auto`) — the VIEWPORT never scrolls (Modal's
>     scroll lock; asserted in the proof that `document.scrollingElement`
>     stays at 0). Sidebar and inspector are edge-to-edge-height columns with
>     their own scroll. The material and the open entrance are the frozen
>     Immersive ones, untouched — no `transition`/`animation` written here.
>     ZERO files modified outside the two new component files (Modal,
>     ImmersiveSurface, IconButton, Spinner reused as-is; no additive Modal
>     extension needed). States surfaced through the props: closed/opening/
>     open (Modal presence), loading (Spinner over the body), disabled
>     (blocks opening), plus busy/read-only/success/error expressible in the
>     consumer's own body/footer content. API: trigger · open/defaultOpen/
>     onOpenChange · modal · loading · disabled · showCloseButton ·
>     closeOnEscape · closeOnOverlay · restoreFocus · title · description ·
>     header · breadcrumb · search · toolbar · sidebar · inspector · footer ·
>     statusBar · data-testid. UX decision map documented in-file: yes/no →
>     AlertDialog · one bounded action → Dialog · info by a trigger →
>     Popover · a command → Command Palette · a workspace beside the page →
>     Drawer · a gesture-driven mobile surface → Bottom Sheet · a
>     full-screen focused task → Fullscreen Overlay. fullscreen-overlay.tsx
>     grep: zero `GlassSurface`/`blur`/`backdrop-filter`/`rgba`/`shadow`/
>     `transition`/`animation` string. Proof: `/dev/fullscreen-overlay` —
>     empty/simple/editor/long-form/AI-assistant/client-creation/program-
>     builder/fullscreen-search/gallery/split-view/inspector/sidebar/
>     toolbar/loading/disabled/nested; desktop/tablet/mobile + rich-
>     background captures; programmatic assertions for open/close, Escape,
>     portal, ARIA, edge-to-edge full-viewport geometry, single scroll
>     region with the viewport never scrolling, sticky header/footer, all
>     optional slots, loading, disabled, restore focus, nested per-layer
>     Escape, mobile full-viewport. `'use client'`.
>   - **Breadcrumb — Navigation, a FLAT primitive with NO Material Role
>     (composes the frozen Icon + Skeleton only). FROZEN (visually
>     validated 2026-07-06, after the craft pass below).** No functional,
>     visual or architectural change again — objective bugs only.
>     ```text
>     Navigation (flat, no Material Role)
>     no GlassSurface / .ds-micro / .ds-control / .ds-card / .ds-floating / .ds-immersive
>     → Breadcrumb (Icon + Skeleton + Typography tokens)
>     Status: FROZEN
>     ```
>     DISCIPLINE's hierarchical position indicator — a trail of ancestors from
>     the app's root down to the current view, answering exactly one
>     question: "where am I?" Not primary navigation (a menu explored FROM,
>     never a report of where you already ARE), not Tabs (siblings at the
>     SAME level, each owning a content panel), not a Stepper (linear
>     PROGRESS through a task being completed — Carbon's own guidance:
>     "If you are taking users through a multistep process use a progress
>     indicator instead"), not Pagination (a flat numbered sequence within
>     one collection), not a Tree View (the whole structure, every branch,
>     persistently), not history/a back button (the ORDER pages were
>     visited, one reversible step — Apple's own HIG: "The back button
>     always performs a single action"; Breadcrumb always reflects the
>     current page's fixed STRUCTURAL position, independent of how the user
>     arrived), not a Filesystem Path (a static string — every ancestor here
>     is an independently clickable destination), not a Menubar/Dropdown
>     Menu/Command Palette (commands, never a position report). Forbidden on
>     a flat single-level app (GOV.UK: "do not use... on websites with a
>     flat structure"), for linear-process progress, as a substitute for
>     real primary navigation (Carbon: "always treated as secondary... never
>     entirely replace the primary navigation"), and for browser session
>     history (NN/g: "not intended to show the history of pages traversed
>     during a session"). Apple's HIG explicitly recommends AGAINST
>     multisegment breadcrumb paths in iOS navigation bars — "consider
>     flattening your app's hierarchy instead of using breadcrumb
>     navigation" — confirming Breadcrumb is a WEB/DESKTOP hierarchical
>     pattern, not a native-stack one.
>
>     A FLAT, token-only primitive: carries NO Material Role at all (zero
>     GlassSurface, zero `.ds-micro`/`.ds-control`/`.ds-card`/`.ds-floating`/
>     `.ds-immersive`) and spends ZERO motion budget (zero `transition`/
>     `animation` string in breadcrumb.tsx outside prose doc comments
>     describing their absence). Composes only the frozen **Icon** (never
>     LinkButton — a Button wearing glass; a crumb is plain inline text) and
>     the frozen **Skeleton** (loading placeholders only — its own file
>     owns the pulse, not this one). Full WAI-ARIA Breadcrumb pattern
>     (confirmed against the W3C APG's own reference example): `nav
>     aria-label="Breadcrumb"`, an ordered list, `aria-current="page"` on
>     the current (NEVER a link) item, a purely decorative separator kept
>     out of the accessibility tree (`role="presentation"` + `aria-hidden`).
>     No roving-tabindex/arrow-key model needed — the APG pattern is a
>     plain link list, not a composite widget — so native Tab order is the
>     COMPLETE keyboard model: zero literal `.focus()` calls anywhere, the
>     cleanest focus story of any component built this session. Radix ships
>     no Breadcrumb primitive at all (confirmed via their own open feature
>     request, GitHub issue #2050) — pure semantic HTML, no interaction
>     primitive needed (no focus trap/portal/dismissal complexity to
>     inherit).
>
>     Two composition modes, mirroring the frozen Select: a data-driven
>     `items` array (auto-renders List/Item/Link/Page/Separator, sharing the
>     SAME exported parts as manual composition — zero duplication) or full
>     manual composition via the exported sub-parts (`Breadcrumb` +
>     `.List`/`.Item`/`.Link`/`.Page`/`.Separator`/`.Ellipsis`, every part
>     also individually named-exported). Collapse (`maxItems`) preserves the
>     first crumb + a trailing run — IBM Carbon's own documented convention
>     ("the first and last two page links should be shown... condensed into
>     an overflow menu") — and reveals the rest via a real, focusable
>     `Ellipsis` button that expands the trail in place (plain list state,
>     no floating layer, no new material), never a permanently-lost static
>     truncation. A SEPARATE, CSS-only `responsive` layer (default on)
>     collapses middle crumbs below the `md` breakpoint with zero JS
>     measuring (GOV.UK's own "collapse-on-mobile" precedent), deliberately
>     scoped to skip the already-`maxItems`-collapsed path so the
>     interactive Ellipsis is never hidden by the same rule that hides plain
>     crumbs. RTL: flexbox row direction reverses natively (no `rtl:`
>     variant needed for the layout itself); the optional chevron separator
>     flips via `rtl:rotate-180`. Truncation caps long labels (`truncate`,
>     default on) with a native `title` tooltip, never touching the
>     accessible name. breadcrumb.tsx grep: zero `GlassSurface`/`blur`/
>     `backdrop-filter`/`rgba`/`shadow`/`transition`/`animation` string
>     outside prose. API: `items` · `children` · `separator` · `maxItems` ·
>     `collapse` · `ellipsis` · `showHome` · `home` · `loading` ·
>     `loadingItems` · `responsive` · `truncate` (per item: `label` · `href`
>     · `icon` · `current` · `disabled`). ZERO files modified outside the
>     new component files.
>
>     Two real bugs found and fixed during the build: (1) the Loading state
>     nested `Breadcrumb.Separator` (its own `<li>`) INSIDE
>     `Breadcrumb.Item` (also an `<li>`) — invalid `<li><li>` nesting,
>     causing a real hydration mismatch (fixed by pushing them as siblings,
>     matching the main render path's own pattern); (2) the CSS `responsive`
>     layer's "hide middle crumbs" rule also matched the JS collapse's own
>     Ellipsis button (structurally a "middle" entry too), silently hiding
>     the only escape hatch to the hidden crumbs on mobile whenever
>     `maxItems` was ALSO set — fixed by scoping the CSS rule to the
>     not-`willCollapse` path only, verified with a dedicated mobile
>     assertion. Proof: `/dev/breadcrumb` — minimal · long hierarchy ·
>     collapsed · icons · disabled · loading · responsive mobile · very
>     long labels · RTL · custom/slash/chevron/dot separators · home icon;
>     desktop/tablet/mobile + RTL captures; programmatic assertions for nav
>     landmark/ARIA/last-item-never-a-link/separator accessibility-tree
>     exclusion/keyboard Tab order/collapse-expand/disabled/loading/
>     responsive breakpoint/mobile Ellipsis reachability. `'use client'`.
>     **Craft pass (2026-07-06, owner visual review — 90-95%, geometry/
>     contrast only, zero architectural change):** separators were reading
>     as separate blocks instead of one phrase — an explicit `gap-x-1` now
>     sets a tight, deterministic rhythm (was ambiguous/implicit); the
>     ellipsis switched from a `MoreHorizontal` icon to the real Unicode
>     `…` character (content-width, never a fixed square, never three
>     periods); separator/ellipsis contrast raised one step
>     (`text-text-tertiary` → `text-text-secondary`) with `leading-none` so
>     the glyph's line-box doesn't add false vertical space; every
>     icon-to-label gap tightened (`gap-1.5` → `gap-1`, closing the Home
>     icon's distance from its text); trail text now steps up to `body`
>     (16px, was a flat `body-sm` 14px) below the `md` breakpoint for
>     mobile legibility, settling back to the quieter `body-sm` from `md`
>     up — both named type-scale tokens, never an invented literal.
>     Behavioral addition: `maxItems` now DEFAULTS to 4 (Adobe Spectrum's
>     own documented default-visible-crumb count, already cited in the
>     original research) so a long hierarchy auto-collapses instead of
>     growing into an unbounded, multi-line paragraph by accident;
>     `collapse={false}` remains the explicit, documented escape hatch for
>     the rare case every level must stay visible (still wraps). **FROZEN
>     (2026-07-06)** — no further redesign; changes only for an objective
>     bug from here on.
>   - **Bottom Sheet — Immersive, composes the Modal foundation + the frozen
>     Spinner (Built, not frozen).**
>     ```text
>     Immersive
>     the frozen optical-layer stack → .ds-immersive → ImmersiveSurface
>     → Modal (the Dialog foundation) → Bottom Sheet
>     Status: Built (non frozen)
>     ```
>     DISCIPLINE's touch-first immersive surface: a panel that rises from the
>     bottom edge and is driven by the GESTURE (drag, swipe, flick), resting
>     at one of several detents and dismissed by a downward throw. Where the
>     frozen Drawer is a WORKSPACE (two positions, open/closed, closed by a
>     button/overlay), the Bottom Sheet is an INTERACTION: the finger owns it
>     — pull up to see more, push down to see less, throw to dismiss. That
>     gesture physics is the whole reason it exists and is exactly what the
>     Drawer forbids itself (the Drawer's frozen doc explicitly reserves
>     these behaviors for "a future BottomSheet"). Behaviors exclusively the
>     Bottom Sheet's, FORBIDDEN in Drawer: drag/swipe/flick, velocity
>     dismissal, snap points & detents, rubber-band overscroll, scroll
>     coordination (the inner list scrolls until its top, then the sheet
>     takes the drag), inertial settle, keyboard avoidance, safe-area insets.
>     Not Dialog/Modal (a centered moment, no gesture), not AlertDialog (a
>     blocking question), not Popover (trigger-anchored, non-blocking), not
>     Command Palette (searchable commands), not Navigation Drawer/Sidebar (a
>     Drawer use-case / a persistent region), not iOS Action Sheet (a fixed
>     list of choices — one detent, no continuum; a CONTENT PATTERN this
>     hosts, not a rival), not Material Bottom Sheet/vaul (those ARE this
>     species — this is DISCIPLINE's native token-only take; vaul used only
>     as a technical reference for the drag mechanics, never visual).
>     UX decision map (documented in-file): a yes/no question → AlertDialog;
>     one bounded action → Dialog; contextual info by a trigger → Popover;
>     jump to a command → Command Palette; a workspace beside the page →
>     Drawer; a gesture-driven mobile surface → Bottom Sheet. Composes the
>     Modal COMPONENT only — portal, focus trap, scroll lock, Escape,
>     overlay, inert background and Title/Description ARIA inherited verbatim
>     (bottom-sheet.tsx contains ZERO focus/overlay/portal/scroll-lock code,
>     grep-verified). Owns ONLY the physics: the pane is BOTTOM-PINNED and
>     its HEIGHT is the detent (so a sticky header/footer stay put while the
>     body scrolls between); during a drag the height follows the finger 1:1
>     with rubber-band resistance past the tallest detent; below the shortest
>     detent the excess becomes a downward slide toward dismissal; on release
>     a fast downward flick (velocity) dismisses, otherwise it snaps to the
>     nearest detent (biased by the throw). The settle (transform + height
>     glide) lives in `bottom-sheet.css` (token-only: `--ds-dur-standard`/
>     `--ds-ease-out`, reduced-motion collapses it), toggled off during drag
>     via a `ds-sheet-settle` class — so the .tsx carries no `transition`/
>     `animation` string and no `requestAnimationFrame`. Detents: content /
>     small(.35) / medium(.6) / large(.9) / full(.98) / custom fraction,
>     resolved to viewport-clamped heights; `content` reads the natural
>     column height (measured in a deferred tick once laid out). Responsive:
>     full-width on mobile, width-capped (480) and horizontally centered on
>     desktop, no media query (max-width + viewport clamp). Keyboard
>     avoidance lifts the sheet above the on-screen keyboard via
>     VisualViewport; safe-area pads the bottom by `env(safe-area-inset-*)`.
>     Modal/non-modal, closeOnEscape/closeOnOverlay/dismissible guard the
>     dismissal paths (an explicit `BottomSheet.Close` action always closes,
>     even on a non-dismissible sheet); nested by plain composition (per-
>     layer Escape, verified). ZERO files modified outside the two new
>     component files — not even the additive Modal extensions were needed
>     (`contentClassName`/`forceMount` from the Drawer already existed);
>     Modal, ImmersiveSurface, Spinner reused as-is. States surfaced via
>     `onStateChange`: closed/opening/open/dragging/snapping/dismissed. API:
>     trigger · open/defaultOpen/onOpenChange · modal · dismissible ·
>     closeOnOverlay · closeOnEscape · detents · defaultDetent · snap ·
>     onSnapChange · dragHandle · showHandle · disableDrag ·
>     disableSwipeToDismiss · avoidKeyboard · safeArea · loading · disabled ·
>     title · description · icon · header/footer · onStateChange ·
>     data-testid. bottom-sheet.tsx grep: zero `GlassSurface`/`blur`/
>     `backdrop-filter`/`rgba`/`shadow`/`transition`/`animation` string.
>     Proof: `/dev/bottom-sheet` — simple/action/share/filters/media/
>     settings/long-form/keyboard/long-list/loading/disabled/non-dismissible/
>     no-swipe/nested/snap/custom-detents/no-handle; mobile + desktop +
>     rich-background captures; programmatic assertions for open/close,
>     Escape, overlay, portal, ARIA, drag-to-resize, snap points, velocity
>     dismissal, non-dismissible guards + explicit close, disable-swipe,
>     scroll coordination, sticky footer, disabled, nested per-layer Escape,
>     desktop centering. `'use client'`.
>   - **Drawer — Immersive, composes the Modal foundation + the frozen
>     IconButton/Spinner. FROZEN (visually validated 2026-07-03; freeze
>     pass: documentation completed in-file — philosophy, Drawer vs Dialog
>     vs Command Palette, when NOT to use, six frozen invariants — and
>     `/dev/drawer` promoted to the official reference page with nine
>     added reference cases: data table, timeline, markdown, graph, tabs
>     via the frozen SegmentedControl, accordion via native disclosure,
>     upload via the frozen FileInput, validation errors, very long form —
>     all composed from frozen primitives + semantic token-styled HTML
>     since Tabs/Accordion/DataTable/Timeline do not exist yet as
>     components; ADR: the two strictly additive modal.tsx extensions
>     (`forceMount` Portal forwarding, `contentClassName`) are part of the
>     frozen contract).**
>     ```text
>     Immersive
>     the frozen optical-layer stack → .ds-immersive → ImmersiveSurface
>     → Modal (the Dialog foundation) → Drawer
>     Status: FROZEN
>     ```
>     An edge-anchored immersive panel: a secondary WORKSPACE that slides
>     in from one side, holds real content (forms, settings, inspectors,
>     navigation) and hands the screen back where the user left it. Not
>     Dialog/Modal (a centered, self-contained MOMENT sized to its content
>     vs. an edge-attached SPACE built for browsing/editing beside the
>     page — a dialog for a decision, a drawer for a task), not Alert
>     Dialog (a blocking question, zero content, maximum interruption —
>     the exact opposite), not Sheet (another library's name for this same
>     species; DISCIPLINE has one canonical name, no duplicate sibling),
>     not Bottom Sheet (defined by DRAG — detents, snap points, swipe;
>     Drawer's bottom side shares the placement, none of the gesture
>     physics), not Popover (anchored to a trigger vs. the viewport edge),
>     not Tooltip/Hover Card (hover, passive), not Dropdown/Context Menu
>     (command lists), not Navigation Menu (an always-visible bar — a
>     drawer may CONTAIN navigation but is a transient container), not
>     Command Palette (the searchable Immersive member), not Sidebar (a
>     PERSISTENT layout region sharing the screen; a drawer OVERLAYS and
>     leaves — the moment it stays it has become a Sidebar), not
>     Accordion/Collapsible (in-flow disclosure that pushes content), not
>     Card, not Form/Wizard (content KINDS it may host), not Overlay (the
>     scrim organ underneath), not Toast (transient, informs). Ergonomics:
>     preserves spatial context (the page stays visible beside it), edge
>     anchoring gives natural height for long scrolling content, maps to
>     the OS panel gesture vocabulary. Responsive: desktop → side drawers
>     as inspectors/settings at partial width; mobile → near-full width,
>     bottom side more thumb-reachable; every size viewport-clamped
>     (400px drawer on a 390px phone never overflows); `size="full"` turns
>     any side into a full-screen surface. Composes the Modal COMPONENT
>     only (never the primitives underneath — Modal's own rule): focus
>     trap, restore focus, scroll lock, Escape, overlay, portal, inert
>     background and Title/Description ARIA inherited VERBATIM, never
>     reimplemented — drawer.tsx contains ZERO focus code of any kind.
>     Adds only geometry and slots: edge placement per `side`
>     (left/right/top/bottom — Modal's centered shell repositioned via
>     className, the consumer's layout decision per Invariant A1), a size
>     scale per axis (xs·280/sm·320/md·400/lg·480/xl·600/full for widths;
>     200/280/360/460/580/full for heights), the frozen CommandPalette
>     pane neutralization verbatim (`w-full max-w-none p-0`) with the
>     pane's frozen radius kept whole thanks to an 8px viewport gutter (no
>     corner surgery), sticky header (icon + Title + Description + frozen
>     IconButton close) / scrollable body (frozen Spinner while `loading`)
>     / sticky footer, custom header/footer slots (title stays, visually
>     hidden, for ARIA), `Drawer.Close` re-export. modal/non-modal =
>     Radix's own mode passed through; closeOnEscape/closeOnOverlay =
>     prevented Radix callbacks; nested drawers = plain composition (Radix
>     layering — Escape closes the top one only, verified); forceMount +
>     contentClassName = TWO strictly additive extensions to modal.tsx
>     (indispensable: the Portal did not forward forceMount, and a
>     full-height column layout inside the pane was unreachable from
>     outside — output byte-identical when the new props are absent). The
>     entrance is the shared Immersive entrance verbatim (the family
>     declares ONE entrance). drawer.tsx grep: zero `GlassSurface`/`blur`/
>     `backdrop-filter`/`rgba`/`shadow`/`transition`/`animation`/`focus`
>     string of ANY kind — the cleanest grep of the session. API: trigger ·
>     open/defaultOpen/onOpenChange · side · size · modal · closeOnEscape ·
>     closeOnOverlay · forceMount · loading · disabled · title (required) ·
>     description · icon · header/footer (custom slots) · children ·
>     data-testid. Proof: `/dev/drawer` — sides, sizes, workspaces
>     (settings/navigation/inspector/destructive), long content, loading,
>     disabled, no-overlay-close, full screen, nested; desktop/tablet/
>     mobile + rich-background + right/bottom/xl/long-scrolled/loading/
>     nested/settings/mobile-open captures; programmatic assertions for
>     open/close, Escape, overlay (and closeOnOverlay=false), focus trap +
>     tab order, restore focus, internal scroll, sticky header/footer,
>     nested stacking + per-layer Escape, portal to <body>, ARIA
>     (role/aria-modal/labelledby/describedby), all four sides anchored,
>     all six sizes strictly increasing, mobile clamping. `'use client'`.
>   - **Popover — Floating Surface, first generalized Floating member. FROZEN
>     (visually validated 2026-07-02, after the 98/100 craft pass).** No redesign
>     again unless an objective bug appears.
>     ```text
>     Floating
>     GlassSurface → .ds-floating → FloatingSurface → Popover
>     Status: FROZEN
>     ```
>     Headless compound API on Radix Popover: `Popover` (open · defaultOpen ·
>     onOpenChange · modal) + `.Trigger` (asChild) / `.Anchor` / `.Content` /
>     `.Close` / `.Arrow`. Popover declares NO material (audited: popover.tsx has
>     no backdrop-filter/blur/box-shadow/rgba/GlassSurface/ds-glass/ds-floating —
>     only the FloatingSurface exports): the pane composes `floatingHostClass` +
>     `<FloatingSurface/>`; the entrance is the shared Floating base animation
>     (`ds-floating-enter`, 150ms opacity + translateY + light scale, system
>     ease-out, reduced-motion safe); the arrow is the shared Floating tail
>     (`ds-floating-arrow` — the frozen Tooltip-reference tail promoted VERBATIM
>     into `floating-surface.css`, same material/rim/shadow, popper-rotated per
>     side). Both now live with the FloatingSurface helper so DropdownMenu /
>     ContextMenu / Command Palette / UserMenu inherit ONE entrance + ONE arrow.
>     Popover owns only behavior: portal, side/align/sideOffset/alignOffset,
>     collision flip+shift (`avoidCollisions`, `collisionPadding`), `sticky`,
>     `hideWhenDetached`, `arrowPadding`, `forceMount`, focus scope (trap + scroll
>     lock ONLY when `modal`), Escape/outside dismiss, focus return, full
>     keyboard/ARIA (Radix). Default intrinsic geometry only (shared size scale ·
>     rounded-md · px-4 py-5) — layout via className (A1).
>     **Craft pass (2026-07-02, owner review 98/100 — geometry only, zero
>     architectural change):** (1) suspension +≈10% — `ds-floating-lift` (ONE soft
>     added lower halo on the host; the frozen `.ds-floating` shadow layer
>     untouched) + `sideOffset` 8→10; (2) arrow radius 2px→1px (a drop's tail, not
>     a puffed chip); (3) vertical padding +4px (`p-4`→`px-4 py-5`); (4) shared
>     **Floating size scale** — `size` prop xs·224 / sm·288 (default) / md·320 /
>     lg·384 via `floatingSizeClass` in the FloatingSurface base, so the future
>     UserMenu / Notifications / Command Palette / Calendar / Emoji picker reuse
>     the SAME widths. Untouched, per instruction: material, blur, transmission,
>     color, animation/speed/easing, collision, arrow behavior, placement, nested,
>     modal, responsive, API. Proof: `/dev/popover` — FloatingSurface
>     pane beside a live Popover (only behavior differs), placements side×align,
>     arrow/no-arrow, collision auto-flip at the panel edge, scrollable container,
>     modal vs non-modal, nested (side-arrow), long + interactive content (form/
>     links/Close), disabled trigger, and the hierarchy Tooltip (reads) · Popover
>     (converses) · Modal (takes over, contained ModalReference). Captured
>     desktop/tablet/mobile + nested interaction. `'use client'`.
>   - **DropdownMenu — Floating Surface, DERIVES FROM THE FROZEN POPOVER. FROZEN
>     (visually validated 2026-07-02).** No functional, visual or architectural
>     change again — objective bugs only.
>     ```text
>     Floating Surface
>     FloatingSurface
>             ↓
>     Popover (FROZEN)
>             ↓
>     DropdownMenu (FROZEN)
>     ```
>     Never restarts from FloatingSurface: the pane IS the frozen Popover pane via
>     `popoverPaneClass` — a PURE EXTRACTION from PopoverContent (its output is
>     unchanged; same glass, same `ds-floating-lift`, same `ds-floating-enter`
>     entrance, same size scale — menus default `xs`). Audited: dropdown-menu.tsx
>     contains no GlassSurface/ds-floating/blur(/backdrop-filter/box-shadow/rgba/
>     glass (only doc comments) — it imports ONLY FloatingSurface exports +
>     `popoverPaneClass`. No new CSS file, no new animation. On Radix DropdownMenu
>     (portal, positioning, collision, dismiss, focus, typeahead, full keyboard
>     ↑↓←→/Home/End/Enter/Space/Escape/Tab + ARIA menu semantics). Owns ONLY the
>     menu language: `Item` (icon · shortcut right-aligned never hard-coded ·
>     disabled · destructive = text-error + error-tinted highlight · loading =
>     Spinner + disabled), `Label`, `Group`, `Separator` (token h-px bg-border),
>     `CheckboxItem` (checked/defaultChecked/onCheckedChange, violet ✓ indicator),
>     `RadioGroup`/`RadioItem` (value/defaultValue/onValueChange, violet dot),
>     `Sub`/`SubTrigger` (chevron)/`SubContent` (composes the SAME pane —
>     material, animation, collision, arrow ALL inherited, zero duplication),
>     `Shortcut`. Item geometry mirrors the frozen Select menu verbatim (py-2.5 ·
>     gap-3 · pl-8 indicator column · `bg-accent-subtle/45` whisper highlight ·
>     data-disabled opacity-40) — every menu in the system is one family. Root
>     API: open/defaultOpen/onOpenChange/modal/dir; Content: side/align/offsets/
>     collisionPadding/avoidCollisions/loop/size/arrow. Long menus cap to
>     `--radix-dropdown-menu-content-available-height` (max 24rem) and scroll.
>     Proof: `/dev/dropdown-menu` — trio (FloatingSurface · Popover ·
>     DropdownMenu, one material three behaviors), full language, checkbox/radio,
>     nested submenu, long scrollable, collision flip, hierarchy vs the Immersive
>     reference; desktop/tablet/mobile + interactive captures (actions/checkbox/
>     radio/long/collision/nested). `'use client'`.
>   - **ContextMenu — Floating Surface, DERIVES FROM THE FROZEN DROPDOWNMENU.
>     FROZEN (visually validated 2026-07-02).** No functional, visual or
>     architectural change again — objective bugs only.
>     ```text
>     Floating
>     FloatingSurface
>             ↓
>     Popover (FROZEN)
>             ↓
>     DropdownMenu (FROZEN)
>             ↓
>     ContextMenu (FROZEN)
>     ```
>     NOT a new component — the DropdownMenu language with another trigger. Never
>     restarts from Popover or FloatingSurface: composes the exported frozen menu
>     language verbatim (`dropdownMenuPaneClass` = the frozen Popover pane ·
>     `dropdownMenuItemClass` · `dropdownMenuLabelClass` ·
>     `dropdownMenuSeparatorClass` · `menuViewportBaseClass` · the `Shortcut`
>     component reused as-is) onto Radix ContextMenu primitives. Audited:
>     context-menu.tsx contains no GlassSurface/ds-floating/blur(/backdrop-filter/
>     box-shadow/rgba/glass in code; no new CSS, no new animation, no new padding/
>     radius. Owns ONLY the trigger: right-click, keyboard menu key / Shift+F10,
>     touch long-press (Radix), positioned at the cursor; the native context menu
>     is suppressed only on the trigger zone. Full menu language inherited: Item
>     (icon/shortcut/disabled/destructive/loading), Label, Group, Separator,
>     CheckboxItem, RadioGroup/RadioItem, Sub/SubTrigger/SubContent (same pane),
>     Shortcut. Radix constraints (documented): Root has no open/defaultOpen (a
>     context menu needs pointer coordinates); Content has no side/sideOffset/
>     align (cursor-anchored); collision/alignOffset/loop fully supported. Proof:
>     `/dev/context-menu` — chain trio (FloatingSurface · Popover · DropdownMenu ·
>     ContextMenu), object zones (image · selected text · file with nested
>     submenu · workspace with checkbox/radio), long scrollable menu, edge
>     collision, touch path; desktop/tablet/mobile + interactive right-click
>     captures. `'use client'`.
>     **Objective-bug fix applied to the FROZEN DropdownMenu (freeze clause,
>     2026-07-02):** discovered while proving ContextMenu — (1) the indicator
>     column `pl-8` is 48px on the DISCIPLINE spacing scale (space-8 = 48px, not
>     Tailwind's 32px); beside a right-aligned shortcut at the xs width it
>     crushed labels to two characters, visible in the frozen DropdownMenu's own
>     checkbox proof → `pl-6` (32px = 8 + 16 icon + 8, the intended column) and
>     shortcut gap `pl-6`→`pl-4`; (2) menu panes kept the frozen `.ds-floating`
>     host padding (8/12px) UNDER the inner viewport padding (double padding) →
>     `p-0` on the pane (menus own their padding on the viewport, per A1).
>     Both proofs re-captured: labels fully legible, no other change. The shared
>     classes fix DropdownMenu and ContextMenu at once (single source of truth).
>   - **HoverCard — Floating Surface, DERIVES FROM THE FROZEN POPOVER. FROZEN
>     (visually validated 2026-07-02).** No functional, visual or architectural
>     change again — objective bugs only.
>     ```text
>     Floating
>     GlassSurface → .ds-floating → FloatingSurface → Popover (FROZEN) → HoverCard
>     Status: FROZEN
>     ```
>     A small contextual PREVIEW (user · exercise · book · workout · session),
>     never a menu. The pane is the frozen Popover pane VERBATIM: `popoverPaneClass`
>     (glass · `ds-floating-lift` · `ds-floating-enter` · size scale) +
>     `popoverPanePaddingClass` (new PURE EXTRACTION of the craft-pass `px-4 py-5`,
>     PopoverContent output unchanged) + the shared Floating arrow. Audited:
>     hover-card.tsx has no GlassSurface/backdrop-filter/blur/box-shadow/rgba/
>     color/animation/transition/floating-CSS — only Popover + FloatingSurface
>     exports. On Radix HoverCard. Owns ONLY how it opens: hover intent —
>     `openDelay` (default 200ms: intent, not accident) · `closeDelay` (default
>     150ms: forgiveness, no flicker) on the Root; forgiving pointer bridge
>     (Radix grace area: Trigger→Content never closes the pane; the content is
>     hover-interactive). Content: side/align/sideOffset/alignOffset/
>     collisionPadding/avoidCollisions/sticky + `size` (shared scale) + `arrow`.
>     Touch: the trigger does not open (hover is pointer-only by design) — the
>     preview's subject must stay reachable through its normal link. Proof:
>     `/dev/hover-card` — trio (FloatingSurface · Popover click · HoverCard
>     hover), previews (user/exercise/book/workout with Avatar · Badge · image),
>     delays 0/200/500 · 0/150/300, sides, aligns, arrow on/off, shared sizes,
>     scrollable container, edge collision; desktop/tablet/mobile + real-hover
>     captures incl. the pointer-bridge proof. `'use client'`.
>   - **CommandPalette — Immersive Surface, COMPOSES the new Modal. FROZEN
>     (visually validated 2026-07-02).** No functional, visual or architectural
>     change again — objective bugs only. (Modal itself remains Built — it will
>     be frozen with its first dedicated validation, e.g. Dialog.)
>     ```text
>     Immersive
>     GlassSurface → .ds-immersive → ImmersiveSurface → Modal → CommandPalette
>     Status: FROZEN (Modal: Built)
>     ```
>     The spec's dependency (a reusable Modal) did not exist — only the /dev/modal
>     reference. Following the FloatingSurface/DatePicker precedent, the base was
>     built first: **ImmersiveSurface** (helper mirroring Control/Floating: frozen
>     `.ds-immersive` + GlassSurface over the frozen `.ds-scrim`, plus the family
>     entrance `ds-immersive-in`/`ds-scrim-in` in immersive-surface.css — the
>     family had NO frozen entrance; token timings only, reduced-motion safe) and
>     **Modal** (Radix Dialog: scrim + centered pane, focus trap, scroll lock,
>     Escape, outside dismiss, inert background, portal, focus return, ARIA;
>     compound `Modal` + Trigger/Content(paneClassName)/Title/Description/Close).
>     CommandPalette recreates NOTHING (grep: no GlassSurface/FloatingSurface/
>     ImmersiveSurface/blur/backdrop/shadow/rgba in code — it imports ONLY Modal,
>     the FROZEN SearchInput, the frozen menu-language classes, Icon, Spinner).
>     It owns ONLY: instant local filtering (label+description+keywords),
>     keyboard navigation (↑↓ · Home/End · PageUp/PageDown ±8 · Enter · loop),
>     groups with headings (Recent · Navigation · Actions · Settings · AI),
>     empty/loading/disabled/selected states, ⌘K/Ctrl+K global hotkey, and the
>     Escape sequence (clears the query first — SearchInput's Escape-to-clear —
>     then closes). Items: icon · label · description · shortcut (right-aligned,
>     never hard-coded) · badge · avatar slot · disabled · loading. Data-driven
>     `groups` API (controlled/uncontrolled open + query) — async/streaming/AI
>     sources later without breaking the contract; virtualization-compatible.
>     Desktop: centered command band (top 16vh · 640px · inner scroll ≤ min(50vh,
>     22rem)); mobile: fluid width. Proof: `/dev/command-palette` — idle groups,
>     live filtering, keyboard selection, empty, loading, long scrollable list,
>     rich panel, tablet, mobile. `'use client'`.
>     **Objective bugs found while building (system-wide):**
>     1. `-translate-y-0` produces `calc(0 * -1)` from the unitless
>        `--ds-space-0: 0` → the WHOLE transform is invalid (the shell lost its X
>        centering too). Fixed locally with `translate-y-[0px]`; noted as a scale
>        hazard (any translate/space-0 utility).
>     2. **Alpha modifiers on token colors never generated**: the Tailwind colors
>        are `var(--ds-color-*)` strings without `<alpha-value>`, so utilities
>        like `bg-accent-subtle/45` and `bg-error/10` were silently ABSENT from
>        the CSS — the frozen Select/DropdownMenu/ContextMenu "whisper" highlight
>        was transparent all along (hover/keyboard rows showed no tint). Fixed
>        under the freeze clause with token-only `color-mix` arbitrary values
>        (`bg-[color-mix(in_srgb,var(--ds-color-accent-subtle)_45%,transparent)]`,
>        error 10% idem) in the shared menu classes + select.tsx; all menu proofs
>        re-captured — the whisper is now actually visible.
>   - **Toast — Floating Surface, derives ENTIRELY from FloatingSurface. FROZEN
>     (visually validated 2026-07-02).** No functional, visual or architectural
>     change again — objective bugs only. The Floating family is COMPLETE and
>     frozen: Tooltip · Popover · DropdownMenu · ContextMenu · HoverCard · Toast.
>     ```text
>     Floating
>     GlassSurface → .ds-floating → FloatingSurface → Toast
>     Status: FROZEN
>     ```
>     The transient feedback surface: it communicates, never interrupts/asks/
>     blocks. Pane = Floating base verbatim (floatingHostClass + FloatingSurface
>     + ds-floating-lift + shared size scale, default sm); entrance =
>     ds-floating-enter; EXIT = the SAME ds-floating-in keyframes with
>     `animation-direction: reverse` (one motion language, declared once in
>     floating-surface.css — zero new keyframes). Audited: toast.tsx has no
>     GlassSurface/blur/backdrop/shadow/rgba/keyframes in code — imports only
>     FloatingSurface exports + Icon/IconButton/Progress/Spinner. On Radix Toast:
>     timers, pause on hover/focus/window-blur, swipe (direction follows the
>     stack position), Escape on the focused toast, F8 to the viewport,
>     aria-live (error = foreground/alert, others = background/status),
>     reduced-motion safe. Toast owns ONLY: the queue (max 4 visible, overflow
>     waits and mounts as slots free), duration (Infinity = capped sticky),
>     dismiss (auto · manual × via the existing IconButton · swipe · Escape ·
>     action click), 6 stack positions (default bottom-right), the optional
>     remaining-time bar (the existing Progress primitive, JS-ticked at 100ms,
>     paused/resumed with the Radix timer — no new animation), 6 variants
>     (default/success/warning/error/loading/info — flat token icons), and an
>     optional action. API: ToastProvider (position · duration · maxVisible ·
>     size) + useToast() → toast()/update()/dismiss() — update() IS the promise
>     pattern (loading → success/error) with no extra API — + Toast +
>     ToastViewport. Proof: /dev/toast — variants, action, long+sticky,
>     progress, promise transition, queue ×6 (exactly 4 visible), top-center,
>     rich panel, mobile. 'use client'.
>     **Objective bug found: `duration: Infinity` mapped to MAX_SAFE_INTEGER
>     fired IMMEDIATELY** — setTimeout is 32-bit; anything above 2^31-1 fires at
>     once (the sticky toast vanished). Capped to 2^31-1 (~24.8 days).
>   - **Checkbox — Micro Surface, audited + minimal rebuild. FROZEN (visually
>     validated 2026-07-02).** No functional, visual or architectural change
>     again — objective bugs only. micro-control.tsx is now the frozen shared
>     foundation of the small Micro members.
>     ```text
>     Micro
>     GlassSurface → Micro Surface (Button reference) → Checkbox
>     Status: FROZEN
>     ```
>     AUDIT: the existing Checkbox already used the validated small-control
>     language (token box, accent fill, dark glyph — consistent with
>     Switch/Radio) and the Grammar §2/§5 lists Checkbox as Micro; the Glass
>     Budget (§3) explains why a 20px control spends near-zero presence (the
>     full Micro glass lives on Button). VERDICT: keep the visual language,
>     rebuild the minimum. Fixes: (1) indeterminate icon was chosen from the
>     `checked` PROP → wrong for uncontrolled `defaultChecked="indeterminate"`;
>     now data-state-driven (group-data variants). (2) No state motion (Switch
>     had one) → fast color transition. (3) Label not dimmed when disabled.
>     (4) Missing API. NEW `micro-control.tsx` — the shared expression of the
>     small tactile Micro members (box · active fill · invalid rim), composed by
>     Checkbox and by Radio/Switch on their next audit; the focus ring stays the
>     GLOBAL `:focus-visible` (never redeclared). checkbox.tsx grep: zero
>     GlassSurface/blur/backdrop/box-shadow/rgba/animation/transition/shadow
>     strings. API: label · description · error (implies invalid) · helperText ·
>     invalid · readOnly (focusable, never toggles — click swallowed) ·
>     required (marker + native) · labelPosition left/right · controlled +
>     uncontrolled incl. indeterminate + `CheckboxGroup` (fieldset/legend;
>     label · description · error · helperText · required; disabled/invalid
>     propagated via context). Backward compatible (old `label`/`checked`
>     usages untouched). Proof: `/dev/checkbox` — all states, groups
>     (multiple/error/disabled), nested settings with a mixed parent
>     (indeterminate), permissions matrix, desktop/tablet/mobile + keyboard
>     captures (focus ring on the mixed parent, Space → all checked).
>     `'use client'`.
>   - **Radio — Micro Surface, on the FROZEN micro-control foundation. FROZEN
>     (visually validated 2026-07-02).** No functional, visual or architectural
>     change again — objective bugs only. micro-control now has TWO frozen
>     consumers: Checkbox and Radio (Switch remains Built).
>     ```text
>     Micro
>     GlassSurface → Micro Surface → micro-control → Radio
>     Status: FROZEN
>     ```
>     EXACTLY the frozen Checkbox language — same 20px box, token border, accent
>     active fill + dark glyph, motion, disabled dim, invalid rim, GLOBAL
>     `:focus-visible` ring; the ONLY difference is the shape (○ circle, ● dot
>     `bg-current` on the dark glyph plane). AUDIT: the pre-rebuild selected
>     state was an accent dot on a white box — a second visual language vs the
>     frozen fill; re-aligned. radio-group.tsx grep: zero GlassSurface/blur/
>     backdrop/box-shadow/rgba/animation/transition/shadow/focus strings — it
>     composes micro-control.tsx verbatim. On Radix RadioGroup: roving focus,
>     Arrow keys move AND select (loop), Home/End, Space, Tab in/out, full ARIA,
>     touch. API: Radio — label · description · invalid · labelPosition ·
>     disabled; RadioGroup — label · description · error · helperText · invalid ·
>     readOnly (value locked: controlled with no change handler, so clicks AND
>     arrows are inert) · required (marker + native) · disabled · orientation
>     (layout + arrow axis) · value/defaultValue/onValueChange/name;
>     disabled/invalid/readOnly propagated via context. RadioItem kept as a
>     back-compat alias (existing usages untouched). Proof: /dev/radio — states,
>     Membership/Goal vertical groups, Frequency/Gender horizontal, permission +
>     template selectors with descriptions, desktop/tablet/mobile + keyboard
>     captures (focus on "4 days", ArrowRight ×2 → "6 days" selected).
>     'use client'.
>   - **Switch — Micro Surface. FROZEN (visually validated 2026-07-03, after a
>     dedicated visual-correction pass).** No functional, visual or
>     architectural change again — objective bugs only.
>     ```text
>     Micro
>     GlassSurface → Micro Surface (.ds-glass .ds-micro) → Switch
>     Status: FROZEN
>     ```
>     CORRECTED METAPHOR (supersedes the original build rationale): Checkbox and
>     Radio *appear* — a glyph drawn on a resting, glass-budget-free
>     micro-control box. Switch *moves* — motion replaces the glyph, so the
>     thumb does not imitate the glyph, it inherits the material. Track and
>     thumb both compose the real, frozen `<GlassSurface/>` stack directly
>     (`.ds-glass .ds-micro`) — the thumb is its own nested glass object inside
>     the rail, the same nested-glass pattern already used for a Button inside a
>     Card. This is a deliberate, documented divergence from Checkbox/Radio's
>     `micro-control.tsx` flat-recipe consumption: Switch's 44×24 rail can
>     legitimately spend more of the Micro Glass Budget (§3) than a 20px
>     Checkbox/Radio glyph ever needed, so it draws directly on the Micro Surface
>     material instead. Switch still imports `microControlInvalidClass` from
>     `micro-control.tsx` for its error rim — the ONLY point of contact with
>     that shared file, which remains otherwise exactly as Checkbox/Radio left
>     it (zero lines touched across all three visual-correction passes).
>     VISUAL LANGUAGE (final, three-pass correction from the original ship):
>     (1) rail material — restored via the real `<GlassSurface/>` stack (was a
>     flat `bg-accent`/`border` box); (2) checked-state light — the rail's own
>     `background-color` is `color-mix(in_srgb, var(--ds-color-accent) 42%,
>     transparent)`, sitting BEHIND the unmodified `.ds-glass__body`
>     backdrop-filter (blur 16px, saturate 1.7) so it reads as light diffused
>     through glass, not a painted fill; plus the rail's own existing
>     violet-caustic layer is revealed (`opacity-100`) and Button Primary's exact
>     halo value is reused (`shadow-[0_2px_18px_rgba(139,124,255,0.22)]`) — zero
>     new colors, every value traced to `--ds-color-accent` or an existing glass
>     token; (3) thumb — a second nested `<GlassSurface/>`, translucent/frosted,
>     rendered byte-identically in checked and unchecked (state is carried ONLY
>     by rail tint + thumb position, never by thumb color). switch.tsx grep:
>     zero redeclared `.ds-glass__*` layer, zero new hex, only token/var()
>     references and one reused Button-Primary rgba literal.
>     OBJECTIVE BUG (pre-rebuild): the old track used `h-6 w-11` = 32×96px on
>     the DISCIPLINE spacing scale (designed for Tailwind's 24×44) and
>     `translate-x-5` = 24px — the thumb never reached the right edge of the
>     96px track. Geometry is explicit px throughout (unchanged since; the
>     scale-hazard lesson from the command palette, applied). On Radix Switch:
>     Space/Enter toggle, Tab/Shift+Tab, ARIA switch role, touch,
>     reduced-motion. API: label · description · error (implies invalid) ·
>     helperText · invalid · readOnly (focusable, never toggles — click
>     swallowed) · required (marker + native) · labelPosition · controlled +
>     uncontrolled. Backward compatible (label/defaultChecked usages
>     untouched). Proof: /dev/switch — all states, preference panel (Dark mode
>     · Biometrics · Auto sync), permission + workout panels, nested master
>     switch gating children; desktop/tablet/mobile + rich-background +
>     keyboard captures (focus ring on the master, Space → off, children
>     disabled). 'use client'.
>   - **Slider — Micro Surface, last major Micro member. FROZEN (visually
>     validated 2026-07-03).** No functional, visual or architectural change
>     again — objective bugs only. **The Micro Surface family is now
>     COMPLETE and FROZEN: Button, IconButton, LinkButton, Checkbox, Radio,
>     Switch, Slider.**
>     ```text
>     Micro
>     the frozen optical-layer stack → Micro Surface (.ds-glass .ds-micro) →
>     micro-control → Slider
>     Status: FROZEN
>     ```
>     A continuous value manipulated by direct position — not Switch (binary,
>     no state at all vs a value), not Progress (system-driven/read-only vs
>     user-driven/read-write), not a Range Slider (two thumbs — a later,
>     separate primitive), not a Scrollbar (viewport position, not a business
>     value). Same family as Checkbox/Radio/Switch: Track and Thumb each nest
>     the real glass stack; the Range (filled portion) reuses the frozen
>     Switch checked-rail recipe verbatim, generalized to an UNCONDITIONAL
>     class (`microControlActiveGlassClass`, new in micro-control.tsx) since
>     Range has no on/off state. Grep-provable foundation discipline: slider.tsx
>     contains zero `GlassSurface`/`backdrop-filter`/`blur`/`box-shadow`/`rgba`/
>     `transition`/`animation`/`focus` string — every optical/motion decision
>     is imported by name from `micro-control.tsx` (`MicroGlass`,
>     `microControlThumbMotionClass`, `microControlActiveGlassClass`, plus the
>     already-frozen `microControlInvalidClass`). ADDITIVE-ONLY extension of
>     micro-control.tsx: Checkbox/Radio/Switch untouched (grep-verified);
>     the dead, zero-consumer `microControlThumbClass` (superseded by Switch's
>     own visual-correction pass) was removed in the same pass. On Radix
>     Slider: Arrow keys, Home/End, Page Up/Down, Tab/Shift+Tab, full ARIA,
>     reduced-motion. API: value/defaultValue/onValueChange (always
>     controlled internally so `readOnly` can pin the value regardless of
>     controlled/uncontrolled usage — the same inert-handler pattern as
>     RadioGroup) · min/max/step · disabled · readOnly (reachable, drag/arrows
>     inert — verified programmatically) · invalid · required (surfaced via
>     `aria-required`; Radix Slider has no native `required`) · orientation
>     horizontal/vertical · size sm/md/lg · label · description · error ·
>     helperText. Proof: `/dev/slider` — states, sizes, orientation
>     (horizontal + vertical), values (0→100, Weight, Body Fat, Calories,
>     Protein, Hydration, Intensity, Recovery), real examples (workout
>     intensity, training volume, nutrition, daily steps, macro split,
>     recovery score, coach difficulty, program progression);
>     desktop/tablet/mobile + rich-background + focus + keyboard captures.
>     'use client'.
>   - **SearchInput — Control Surface, search SPECIALIZATION of Input. FROZEN
>     (visually validated 2026-07-01).** No redesign again unless an objective bug
>     appears. Unlike Textarea (Input's
>     sibling), SearchInput derives FROM Input: GlassSurface → .ds-control →
>     ControlSurface → Input → SearchInput. It renders `<Input>` and adds ONLY search
>     affordances into Input's prefix/suffix slots — a muted leading magnifier and a
>     trailing clear/loading/shortcut cluster — plus search behaviour. Recreates no
>     glass/blur/shadow/Fresnel/optical layer (audited: only docstring mentions).
>     API: label · description · helperText · error (Input's frozen `.ds-control--error`
>     rim) · success (semantic token check) · clearable · loading (Spinner swaps the
>     same slot, no geometry change) · shortcut (⌘K kbd chip, hidden while typing &
>     on touch) · debounce (callback only — text never delayed) · onSearch · onClear ·
>     disabled · readOnly. Escape clears; `role="search"`; clear button reuses the
>     frozen Button interaction language (press-scale/focus-ring), no glass-on-glass.
>     Proof: `/dev/search-input` (all states + Input→Textarea→SearchInput family on
>     neutral + rich backgrounds). `'use client'`. Awaiting explicit freeze.
>   - **Textarea — Control Surface, FROZEN (visually validated 2026-07-01).** No
>     redesign again unless an objective bug appears. A SIBLING of Input (not a bigger Input): both
>     derive from GlassSurface → .ds-control → ControlSurface and share its material
>     VERBATIM (no glass/blur/shadow/Fresnel/optical layer recreated — audited).
>     Textarea differs only by geometry (taller, top-aligned, multiline spacing,
>     resize) and multiline interaction. API: label · description · helperText ·
>     error (turns the frozen `.ds-control--error` rim) · success (semantic token
>     check, never a glass change) · required · maxLength · showCharacterCount ·
>     autoResize (grows between minRows/maxRows then scrolls internally — never
>     infinite) · disabled · readOnly. Focus reuses `.ds-control:focus-within` (the
>     violet rises); caret + selection left to shared defaults exactly like Input;
>     16px body avoids iOS zoom with an editorial multiline line-height. Proof:
>     `/dev/textarea` (all states + Input↔Textarea sibling comparison on neutral +
>     rich backgrounds). `'use client'` (autoResize hooks). Awaiting explicit freeze.
>   - **Input — FROZEN (Control Surface).** Conflict resolved (2026-07-01): a task
>     proposed rebuilding Input as a Micro Surface (`.ds-micro`, Button proportions);
>     flagged as a violation — the Grammar §2/§5 fixes Input to **Control**, and Input
>     already exists/is validated. Owner chose to keep Input = Control, unchanged; no
>     role/material/architecture change. Input is definitively frozen.
>   - **Next (unimplemented role members, no new material):** Immersive → `Modal`/
>     `Dialog` (promote the frozen `/dev/modal` reference into a reusable component),
>     Floating → `Popover`/`DropdownMenu`/`Toast` (generalize the Tooltip reference),
>     Structural → StatCard / EmptyState / ErrorState / ChartWrapper (← GlassCard).
>     See the roadmap for the complete list.

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
