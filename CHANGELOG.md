# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **OfflineState — frozen (flat primitive, content-only).** Frozen-review
  pass found no dead code, no unused imports/props, and no internal
  duplication; the component was content-only from the start (mirroring
  the frozen ErrorState), so the freeze locks it unchanged. No functional,
  visual or architectural change again except an objective bug; the public
  API (`title`/`description`/`icon`/`action`/`size`/`align`/`className`)
  is locked — any future change requires an ADR.

- **ErrorState — frozen (flat primitive, content-only).** Frozen-review
  pass found no dead code, no unused imports/props, and no internal
  duplication (the `sizeConfig` shape it shares with the frozen EmptyState
  is a cross-component similarity, not extractable without an ADR); the
  component was already content-only after the real-glass-surface refactor,
  so the freeze locks it unchanged. No functional, visual or architectural
  change again except an objective bug; the public API (`title`/
  `description`/`icon`/`action`/`size`/`align`/`className`) is locked — any
  future change requires an ADR.

- **EmptyState — frozen (flat primitive, token system).** Frozen-review
  pass removed one genuine redundancy: the centered description carried
  both `items-center` (on the flex-col parent) and a redundant `mx-auto`
  on the `<p>` — two mechanisms centering the same block. Removed
  `mx-auto`; behavior byte-identical, re-verified (the centered
  description measures 0.008px off-center) with a full green proof run and
  an unchanged 6.84 kB build. No functional, visual or architectural
  change again except an objective bug; the public API (`title`/
  `description`/`icon`/`action`/`size`/`align`/`className`) is locked —
  any future change requires an ADR.

- **Skeleton — frozen (flat primitive, token system).** Frozen-review pass
  found and removed one genuine duplication: the `circle` branch and the
  single-line branch were two near-identical single-`<div>` returns
  differing only in the resolved width/height. Collapsed into one
  single-bar return (multi-line stays its own branch), computing width/
  height per case — behavior byte-identical, re-verified with a full green
  proof run and an unchanged 3.05 kB build. No functional, visual or
  architectural change again except an objective bug; the public API
  (`width`/`height`/`radius`/`circle`/`lines`/`animated`/`className`) is
  locked — any future change requires an ADR.

- **Stepper — frozen (Navigation, flat primitive, plain-list sub-family).**
  Frozen-review pass found and fixed one genuine layout bug (not
  cosmetic): the horizontal connector row nested the full label block,
  not just the indicator, as a flex sibling of the two `flex-1`
  connectors — with a long, multi-line label its content width dominated
  the row and collapsed both connectors to ~3px regardless of the step
  column's actual width (measured via `getBoundingClientRect`: 0–4px
  before the fix, 85px after, in the "Long labels" demo at 1280px). Fixed
  by restructuring the row to wrap only the indicator, with the label
  rendered as a separate full-width row beneath it inside the same
  button/span — re-verified visually and via measurement, full proof
  re-run green, build unchanged at 5.49 kB. The `loading` state's design
  was also reviewed and its justification written into the component's
  own doc comment: advancing from the current step is almost always
  gated on an async call the Stepper never owns (the consuming Wizard
  does), so `loading` freezes every step, not only the current one, while
  placing transition-in-flight feedback on the current step's own circle
  via the frozen Spinner — mirroring the frozen Pagination's own
  `loading`. No functional, visual or architectural change again except
  an objective bug; the public API (`currentStep`/`steps`/`onStepClick`/
  `orientation`/`clickable`/`completed`/`loading`/`disabled`/
  `responsive`/`className`) is locked — any future change requires an
  ADR.

- **Tabs — frozen (Navigation, flat primitive, composite ARIA widget).**
  Frozen-review pass found and removed one dead extraction: `orientation`
  was destructured in the Root and re-passed unchanged, even though the
  orientation-aware styling reads Radix's own runtime `data-orientation`
  attribute via CSS, never that JS variable. Now flows through
  `{...props}` like every other native prop — zero behavioral change,
  re-verified with a full green proof run and an unchanged 10 kB build.
  No functional, visual or architectural change again except an
  objective bug; the public API
  (`Tabs`/`Tabs.List`/`Tabs.Trigger`/`Tabs.Content` + their native Radix
  props) is locked — any future change requires an ADR.

- **Pagination — frozen (Navigation, flat primitive).** No functional,
  visual or architectural change again except an objective bug.

- **Breadcrumb — frozen (Navigation, flat primitive).** No functional,
  visual or architectural change again except an objective bug.

- **Breadcrumb — craft pass (owner visual review, 90-95%, geometry/contrast
  only, no architectural change).** Separators were reading as separate
  blocks instead of one phrase — an explicit `gap-x-1` now sets a tight,
  deterministic rhythm (was ambiguous/implicit); the ellipsis switched from
  a `MoreHorizontal` icon to the real Unicode "…" character (content-width,
  never a fixed square, never three periods); separator/ellipsis contrast
  raised one step (`text-text-tertiary` → `text-text-secondary`) with
  `leading-none` so the glyph's line-box doesn't add false vertical space;
  every icon-to-label gap tightened (`gap-1.5` → `gap-1`); trail text steps
  up to `body` (16px, was a flat `body-sm` 14px) below the `md` breakpoint
  for mobile legibility, settling back to `body-sm` from `md` up — both
  named type-scale tokens, never an invented literal. `maxItems` now
  defaults to 4 (Adobe Spectrum's own documented default, already cited in
  the original research) so a long hierarchy auto-collapses instead of
  growing into an unbounded, multi-line paragraph by accident;
  `collapse={false}` remains the explicit, documented escape hatch. Frozen
  after this pass (see the dedicated Freeze entry above).

- **Spotlight — REJECTED (ADR).** Source-grounded analysis against the
  official Apple Spotlight/HIG, Raycast, VS Code, Linear, Notion, Arc,
  Material Design and Radix documentation: Apple's Spotlight is an
  OS-level, cross-domain find-anything surface (apps, files, contacts,
  mail, definitions, calculations, conversions, the web) invoked from
  outside any application — a scope with no equivalent inside a single
  web app, since DISCIPLINE is not an operating system and the frozen
  Command Palette is already globally invocable (⌘K) from anywhere in
  the app. Every real product studied converges on one unified palette
  rather than two: Linear's Command Menu unifies navigation and action
  execution in one surface; Raycast bills itself as "Spotlight on
  steroids — same basic idea"; Notion's Quick Find is its singular
  jump-and-search surface; Arc's Command Bar merges navigation,
  organization, tools and settings into one searchable input (60+
  actions, confirmed on Arc's own docs). VS Code, the one product with
  two entry points (Quick Open for files, Command Palette for
  commands), documents them sharing the same underlying input — Quick
  Open accepts a `?` prefix to surface command suggestions in place — one
  widget, mode-switched by a leading character, not two components.
  Material has no "Spotlight" concept: its Search pattern is a
  page-scoped content filter, already the frozen SearchInput's job.
  Radix ships no Search/Spotlight/Command primitive at all (Dialog
  only). Nothing about Spotlight's remaining, product-scoped
  responsibility is behaviorally exclusive — heterogeneous row content
  and computed-answer rows are row-template concerns, not new focus/
  portal/scroll-lock/dismissal behavior — so nothing would be forbidden
  inside Command Palette either. Classified as a use case / data
  pattern of the already-frozen Command Palette (a "global entity
  search" `groups` configuration), fully covered by its existing
  data-driven, future-proofed `groups` API. No code was written.

- **Fullscreen Overlay — frozen (Immersive).** No functional, visual or
  architectural change again except an objective bug.

- **Sheet — REJECTED (ADR).** Source-grounded analysis against the
  official Radix, Ariakit, Material and shadcn documentation: Radix and
  Ariakit ship no Sheet/Drawer/Bottom-Sheet primitive (Dialog only);
  shadcn's Sheet "extends the Dialog component to display content that
  complements the main content of the screen" with a side prop and
  header/footer slots — exactly DISCIPLINE's frozen Drawer, feature for
  feature; Material has side sheets (≡ Drawer) and bottom sheets (a
  gesture-defined surface). "Sheet" therefore names no missing
  capability — it is the frozen Drawer under another library's name, and
  the design system never creates two components for one problem. The
  genuinely distinct surface is the Bottom Sheet (drag physics, detents,
  snap points, safe-area, touch-first), a separate future component
  already reserved in the frozen Drawer's documentation; its gesture
  behaviors remain forbidden in Drawer. No code was written.

- **Drawer — frozen (Immersive), after the official freeze pass.** No
  functional, visual or architectural change again except an objective
  bug. Freeze pass contents: in-file documentation completed (philosophy,
  Drawer vs Dialog vs Command Palette, when NOT to use a Drawer, six
  frozen invariants — composes Modal only, zero focus/overlay/portal/
  scroll-lock logic, owns only layout/slots/sizes/side, frozen material/
  radius/entrance verbatim, frozen size scales, title always required);
  `/dev/drawer` promoted to the official reference page with nine added
  reference cases (data table, timeline, markdown prose, graph, tabs via
  the frozen SegmentedControl, accordion via native disclosure, upload
  via the frozen FileInput, validation errors, very long form — composed
  from frozen primitives + semantic token-styled HTML since
  Tabs/Accordion/DataTable/Timeline do not exist yet as components). ADR:
  the two strictly additive `modal.tsx` extensions (`forceMount`
  forwarded to the Portal, `contentClassName` on the inner content
  plane) are part of the frozen contract. Full re-validation: lint,
  type-check, build, proof script — zero regressions.

- **Alert Dialog — frozen (Immersive).** No functional, visual or
  architectural change again except an objective bug.

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

- **OfflineState — a flat primitive (token system, no glass role),
  content-only, composing only the frozen Heading + Text (Built, not
  frozen).** A momentary inability to reach content because the app has no
  network connection — and (usually) a way to retry once it returns. Never
  a server error, a loading state, progress, an absence of data, a denied
  permission, maintenance, or an unknown failure. Not an ErrorState (a
  failure — the request reached the server and failed; OfflineState is the
  opposite, the request never left the device for lack of connection — a
  different cause and a different action, "reconnect"), an EmptyState
  (nothing loaded because there is no network, not because the collection
  is empty), a Spinner/Skeleton/Progress/CircularProgress (in-flight
  activity), an Alert (a message on a working view), a Toast (a transient
  ping), a NoPermission block, a MaintenanceState (planned server-side
  downtime), a Retry Banner (a thin strip), or a FullscreenOverlay (a
  surface that may contain one). Follows the exact frozen-ErrorState
  content-only contract: draws no surface of its own (no background,
  shadow, radius, border, glass or material) — all material comes from the
  parent Liquid Glass surface it fills; surfaces are architectural and
  states are content. Deliberately does not compose the frozen ErrorState
  despite the identical layout (distinct responsibilities; ErrorState is
  frozen). Composes only the frozen Heading and Text and renders a
  caller-supplied icon and Retry action verbatim. Its icon is tinted
  `text-warning` (amber) — a three-tier semantic read at a glance:
  EmptyState neutral (nothing here) → OfflineState amber (no network) →
  ErrorState red (failure). Purely informative and static: no role on the
  container (the Retry Button keeps its own semantics — no auto-focus, no
  keyboard trap), zero motion, zero glass, zero transition/animation.
  `align` uses logical `start`. Sizes sm/md/lg scale together. Responsive
  with no JS measuring. Its demos place it inside real Liquid Glass
  surfaces (GlassCard/GlassPanel/Drawer/Modal/FullscreenOverlay) on the
  shared capture wallpaper. API: `title` · `description` · `icon` ·
  `action` · `size` (sm/md/lg) · `align` (center/left) · `className`. Zero
  frozen files modified. Proof: `/dev/offline-state`.

- **ErrorState — a flat primitive (token system, no glass role),
  composing only the frozen Heading + Text (Built, not frozen).** A view
  or operation that failed to load — the user momentarily cannot proceed,
  and here is how to recover (typically Retry). Never an absence of data,
  a loading state, progress, a confirmation, a notification, a denied
  permission, or a lost connection. Not an EmptyState (a success whose
  result set is empty, or a pristine first-run — no failure; ErrorState is
  a failure, recovery is retrying not creating), an Alert (a message
  layered on a populated view), a Toast (a transient notification), a
  Spinner/Skeleton/Progress/CircularProgress (in-flight state — ErrorState
  is the terminal state after the attempt failed), an OfflineState (a
  narrower network-only sibling), a NoPermission block (the request
  succeeded, you may not see it), a MaintenanceState (planned downtime), or
  a bare empty Dashboard/Card/Search (those show an EmptyState in their
  empty branch — ErrorState is their failed branch). Its families — server
  error, load failed, not found, network, unknown — are one responsibility
  wearing different copy/icons. Does not compose Modal/Drawer/Alert/Toast,
  and deliberately does not compose the frozen EmptyState despite the
  adjacent layout (distinct responsibilities; EmptyState is frozen;
  coupling would block ErrorState's own evolution). Composes only the
  frozen Heading and Text and renders a caller-supplied icon and Retry
  action verbatim. Its one semantic distinction from EmptyState: the icon
  is tinted `text-error` (the universal failure signal), matching the
  frozen Alert's tone+icon precedent. A CONTENT primitive, not a surface:
  it draws no surface of its own (no background, shadow, radius, border,
  glass or material) — all visual material comes from the parent Liquid
  Glass surface it fills (GlassCard/GlassPanel/Drawer/Modal/
  FullscreenOverlay/Page); surfaces are an architectural level and states
  are a content level, so a state never carries its own surface. Its demos
  place it inside real Liquid Glass surfaces on the shared capture
  wallpaper, never a dedicated opaque card. Purely informative and static:
  no role on the container (the Retry Button keeps its own semantics — no
  auto-focus, no keyboard trap), zero motion, zero glass, zero transition/
  animation. `align` uses logical `start`. Sizes sm/md/lg scale the icon,
  title level, description size and padding together. Responsive with no JS
  measuring. API: `title` · `description` · `icon` · `action` · `size`
  (sm/md/lg) · `align` (center/left) · `className`. Zero frozen files
  modified. Proof: `/dev/error-state`.

- **EmptyState — a flat primitive (token system, no glass role),
  composing only the frozen Heading + Text (Built, not frozen).** A
  meaningful absence of content or result that also points the user at the
  next action — never a loading state, a blocking error, a notification,
  or progress. Not an Alert (a message about existing content), a Toast (a
  transient notification), a Skeleton (a placeholder for content that is
  coming), a Spinner/Progress/CircularProgress (activity / a known
  fraction in flight), an ErrorState (a failure — EmptyState is a success
  whose result set is empty, or a pristine first-run), an OfflineState, a
  NoPermission block, a Card (a container for content that exists —
  EmptyState is what it shows instead), or a bare empty Table/List/
  Dashboard/Search result (those render an EmptyState in their empty
  branch). Its many families — no results, no clients, no sessions, no
  programs, no notifications, first-run onboarding — are one
  responsibility wearing different copy/icons, content variations a
  consumer passes in. Does not compose Modal/Drawer/Card/Alert; composes
  only the frozen Heading and Text and renders a caller-supplied `icon`
  and `action` node verbatim. Purely informative and static: no role on
  the container (the optional action Button keeps its own semantics), zero
  motion, zero glass, zero transition/animation. `align` uses logical
  `start` so a left-aligned state follows `dir="rtl"` naturally. Sizes
  sm/md/lg scale the icon, title level, description size and padding
  together. Responsive with no JS measuring. API: `title` · `description`
  · `icon` · `action` · `size` (sm/md/lg) · `align` (center/left) ·
  `className`. Zero frozen files modified. Proof: `/dev/empty-state`.

- **Skeleton — a flat primitive (token system, no glass role), rebuilt
  onto the full analysis/build/proof process from a pre-methodology
  implementation (Built, not frozen).** A silent layout placeholder:
  reserves the exact space real content will occupy while it loads, so the
  page's structure is visible immediately and nothing shifts when data
  arrives — never signals activity (Spinner), never a known fraction
  (Progress/CircularProgress). Not Spinner, Progress/CircularProgress,
  FullscreenOverlay/Drawer loading (both compose Spinner, never Skeleton,
  since their content is arbitrary), a Loading Overlay (the opposite of
  Skeleton — hides structure rather than revealing it), placeholder text/
  "Lorem ipsum" (Skeleton is deliberately abstract, never legible), an
  empty Card/Empty State (a permanent absence vs. a transient wait), Alert/
  Toast, a Shimmer Loader (explicitly excluded — a sliding gradient is
  decorative motion this library does not ship), a Pulse Loader, or a
  Blur/Image Placeholder (an image-specific technique needing a
  pre-existing preview). Composes nothing — no Radix, no other component:
  a `div`, CSS, and tokens only. `circle` forces full/pill rounding;
  `lines > 1` stacks that many text-line bars with the last line at 60%
  width, the near-universal skeleton-text convention. `width`/`height`
  accept a number (px) or any CSS length string, defaulting to a
  full-width single line (`100%` × `var(--ds-space-4)`) or a
  `var(--ds-space-7)` square for a bare circle — never a raw literal.
  `animated` defaults to `true` (`animate-pulse motion-reduce:animate-none`,
  the one authorized animation). Marked `aria-hidden`, no role, no
  tabindex. Breadcrumb's single call site was updated as a mechanical,
  zero-visual-difference consequence of the new API replacing the old
  `shape` enum (`shape="text" className="h-4 w-16"` → `width={64}
  height={16} radius="sm"`, the exact same computed pixels). API: `width`
  · `height` · `radius` (none/sm/md/lg/full) · `circle` · `lines` ·
  `animated` · `className`. Proof: `/dev/skeleton`.

- **Spinner — a flat primitive (token system, no glass role), rebuilt onto
  the full analysis/build/proof process from a pre-methodology
  implementation (Built, not frozen).** The purely indeterminate activity
  indicator — "something is happening, of unknown duration" — never "how
  much is left." It never has, and never will have, a value. Not Progress/
  CircularProgress (a known fraction, `role="progressbar"`,
  `aria-valuenow` present the moment a fraction is determined — even their
  own `indeterminate` keeps that progressbar-shaped contract minus
  `aria-valuenow`; Spinner never had that contract), not a Skeleton, a
  Loading Overlay, FullscreenOverlay/Toast/Drawer/CommandPalette (each
  already composes Spinner internally — an ingredient, never a
  competitor), an Alert, a Badge, a Timeline, a Gauge/Meter, or
  CircularProgress's own indeterminate mode (visually close but still a
  progressbar candidate; Spinner never is). Already the internal loading
  affordance of 18 consumers before this rebuild, several frozen (Button,
  Pagination, Drawer, Toast, DropdownMenu, ContextMenu, Select,
  FullscreenOverlay, Stepper, CommandPalette, and more) — the overriding
  constraint was zero visual regression across every one of them, verified
  via a full production build (51/51 routes) and a pixel-identical capture
  of Stepper's own loading state. `role="status"` + `aria-live="polite"`,
  never `role="progressbar"`, never an `aria-value*` attribute. The ring
  color defaults to `border-current` (inherits the surrounding text
  color); the new `color` prop is optional with no default, so every
  existing consumer (which omits it) renders byte-identical to before.
  `sm`/`md`/`lg` are unchanged byte-for-byte; `xs`/`xl` are purely
  additive. `disabled` dims the ring and freezes the spin (no
  `aria-disabled`, since `role="status"` doesn't support it).
  `motion-reduce:animate-none` added (Skeleton/Progress/CircularProgress
  already carry it). `forwardRef` added. API: `size` (xs/sm/md/lg/xl) ·
  `color` (accent/neutral/success/warning/error/info, optional) · `label`
  · `disabled` · `className`. Zero frozen files modified (Spinner itself
  is not frozen; its 18 consumers' own source files were untouched).
  Proof: `/dev/spinner`.

- **CircularProgress — a flat primitive (token system, no glass role),
  direct sibling of Progress (Built, not frozen).** The same known
  fraction of completion as Progress, in a ring — reserved for compact/
  circular spaces (an avatar mid-upload, a sync tile, a dashboard KPI)
  where a linear bar has no natural home. A geometry choice, not a
  different UX problem: stroke-dasharray/circumference math is
  fundamentally different code from a bar's `width`, exactly why MUI/
  Chakra/Radix ship Linear and Circular as two separate components, never
  one `variant`. Not Progress, Spinner, Skeleton, Gauge, Meter, Chart,
  Badge, Stepper, Timeline, Counter, Toast, an Avatar progress ring, or a
  Donut Chart (each covers a different responsibility; see the component's
  own doc comment for the full comparison). Composes
  `@radix-ui/react-progress` directly for the identical ARIA contract
  Progress relies on: `role="progressbar"`, `aria-valuemin`/
  `aria-valuemax`, `aria-valuenow` set for a numeric value and never
  present for `indeterminate`. Two SVG `<circle>` elements (track +
  indicator) are the only new visual code. Determinate value changes are
  an instant `strokeDashoffset` change — zero transition/animation;
  `indeterminate` reuses the frozen Spinner's own `animate-spin` verbatim,
  rotating a constant-length arc, frozen when `disabled`. `label` is a
  plain boolean — a centered `{percent}%` inside the ring. API: `value` ·
  `max` · `indeterminate` · `size` (sm/md/lg) · `color`
  (accent/success/warning/error/info/neutral) · `label` · `disabled` ·
  `className`. Zero frozen files modified. Proof:
  `/dev/circular-progress`.

- **Progress — a flat primitive (token system, no glass role), sibling of
  Spinner/Skeleton/Badge, rebuilt onto the full analysis/build/proof
  process from a pre-methodology implementation (Built, not frozen).** The
  known fraction of completion (0 → max) of one continuous, unidimensional
  operation happening right now — never named steps (Stepper), never a
  placeholder for unknown content (Skeleton), never a pure indeterminate
  wait with no fraction at all (Spinner), never a circular presentation
  (Progress Ring — the identical semantics in SVG form, a geometry choice,
  not this component; a future, separate sibling, never a `variant` here,
  matching how MUI/Chakra/Radix all ship Linear and Circular as two
  separate components), not a Timeline, Badge, Counter, Gauge, Meter,
  Chart, or Status indicator (none represent a continuous, terminal,
  measured fraction with a known denominator). Composes
  `@radix-ui/react-progress` directly: `role="progressbar"`,
  `aria-valuemin`/`aria-valuemax`, `aria-valuenow` set for a numeric value
  and never present for `indeterminate`, `getValueLabel` defaulted to
  compute `aria-valuetext` matching the visible caption. Determinate value
  changes are an instant `width` change — zero transition/animation;
  `indeterminate` reuses the frozen Skeleton's own
  `animate-pulse motion-reduce:animate-none` verbatim (the one
  non-decorative, functionally-necessary exception, the same reasoning
  already covering the frozen Spinner's `animate-spin`), frozen when
  `disabled`. The track is a `flex` row with the indicator sized by
  `width` as a plain flex item so it anchors to the inline-start edge,
  which flexbox flips natively under `dir="rtl"`. The frozen Toast's and
  frozen FileInput's existing usage (`value`/`aria-label`/`className`
  only) renders byte-identical to before — zero visual regression. One
  non-frozen file updated as a direct consequence of dropping the legacy
  `variant="circular"` mode: the generic dev components gallery lost its
  circular demo line. API: `value` · `max` · `indeterminate` · `size`
  (sm/md/lg) · `showLabel` · `label` · `color`
  (accent/success/warning/error/info) · `disabled` · `className`. Zero
  frozen files modified. Proof: `/dev/progress`.

- **Stepper — a flat primitive with no Material Role, the plain-list
  sub-family sibling of Breadcrumb/Pagination (Built, not frozen).**
  Progress through a sequence of ordered, semantically different steps of
  one task being completed right now (Account → Profile → Payment →
  Review) — never which facet of the same record (Tabs), never a
  navigation hierarchy (Breadcrumb), never a page of a data collection
  (Pagination). Not Tabs (interchangeable views, freely reachable in any
  order, no completed/pending state), not a Breadcrumb (a navigation
  hierarchy, never a completion state), not Pagination (structurally
  identical pages, no "done" semantics), not Progress/Progress Ring (a
  single continuous quantity, no named discrete steps), not a Timeline (a
  read-only, often unbounded record of past events), not a Navigation
  Menu (independent primary destinations, no order or completion), not
  vertical Tabs (orientation never changes what a component is), not a
  Wizard (a higher-level composition that owns step content/validation/
  navigation flow — the Stepper is only the indicator a Wizard would
  compose above it), not a plain `<ol>` (no progress semantics, no
  `aria-current="step"`, no connectors). A flat primitive with no
  Material Role — the sibling of the frozen Breadcrumb/Pagination, not
  Tabs: MUI itself files Stepper under "Navigation"; unlike Tabs (a
  composite ARIA widget, `aria-selected`), Stepper matches Breadcrumb/
  Pagination's plain-list sub-family — clickable steps are independent,
  native-Tab-order buttons and exactly one item carries
  `aria-current="step"`, distinct from `aria-selected`. No WAI-ARIA APG
  pattern exists for Stepper (unlike Tabs/Breadcrumb) — this structure is
  grounded directly in `aria-current`'s defined semantics. States
  expressed only by typography, borders, the frozen Icon (a checkmark
  that always wins on completed steps, overriding any custom per-step
  icon) and the frozen Spinner (`loading` only) — never GlassSurface,
  never a sliding/animated connector. A single, self-contained,
  non-compound component, matching Pagination's own "very simple API"
  precedent. Per Material Design's own mobile guidance, the `responsive`
  layer (default on, CSS-only) auto-switches horizontal to vertical below
  the `md` breakpoint. Two additive props beyond the brief's literal
  list, both indispensable: `onStepClick` and `responsive`. Connector
  segments are computed from the shared boundary between two steps (not
  each step's own status independently) so both halves of the same
  visual line always agree. API: `currentStep` · `steps` (`id` · `label`
  · `description?` · `icon?` · `disabled?`) · `onStepClick` ·
  `orientation` · `clickable` · `completed` · `loading` · `disabled` ·
  `responsive` · `className`. Zero frozen files modified. Proof:
  `/dev/stepper`.

- **Tabs — a flat primitive with no Material Role, composing
  `@radix-ui/react-tabs` directly (Built, not frozen).** Switch between a
  small, named, always-visible set of alternate content views for the
  same record, without leaving the page. Not an Accordion (stacks
  sections vertically, any number open, growing height — Tabs shows
  exactly one panel, constant height), not a Navigation Menu (the app's
  primary destinations, usually real page navigation), not a Segmented
  Control (frozen: changes an external value, owns no panel at all — no
  `role="tabpanel"`, no built-in `aria-controls`/`aria-labelledby`; Tabs
  structurally owns the panel via `TabsContent`), not a Sidebar (a
  persistent layout region), not a Breadcrumb (reports a structural
  position, never panels), not a Stepper (sequential, validated
  progression — every tab is freely reachable at any time), not
  Pagination (structurally identical, collapsible pages of a large
  sequence — Tabs is a small, fixed, always-visible set of semantically
  different views), not a Select (hidden behind a menu to save space —
  Tabs keeps every option visible permanently), not a Dropdown Menu, not
  a Command Palette, not a Carousel (a browsed sequence with no
  persistent named identity per slide — Tabs is chosen explicitly by
  name). A flat primitive with no Material Role, but architecturally a
  different sub-family from the frozen Breadcrumb/Pagination (plain
  lists, native Tab order, no roving tabindex): Tabs is a composite ARIA
  widget (roving tabindex, Arrow/Home/End — the same keyboard model as
  the frozen RadioGroup/Segmented Control), yet it does not derive from
  Control Surface or reuse Segmented Control's glass, since its
  universal, most-precedented visual identity (Material Design 3's own
  "tab indicator," MUI, GitHub, Linear) is a text label plus a thin
  indicator bar, never a glass pill. The indicator is a plain instant
  border-color swap on the active trigger — never an animated sliding
  bar (zero transition/animation in this file). Composes
  `@radix-ui/react-tabs` directly — the first component this session for
  which Radix genuinely ships a primitive (Sheet/Spotlight/Breadcrumb/
  Pagination all had none) — inheriting its entire behavioral contract
  verbatim: controlled/uncontrolled state, full ARIA, orientation-aware
  roving tabindex, `dir`-aware Arrow-key direction, a focusable tabpanel.
  One deliberate divergence from Radix's own raw default:
  `activationMode` defaults to `"manual"` here, not Radix's
  `"automatic"`, per the WAI-ARIA APG's own explicit recommendation that
  automatic activation only suits panels displayable with zero latency —
  a guarantee a generic, reusable primitive cannot make. RTL: Radix's
  own `dir` prop flips Arrow-key semantics; flexbox reverses natively.
  Additive dependency: `@radix-ui/react-tabs@1.1.17` (exact-pinned,
  matching this repo's convention) — the first new package added this
  session, genuinely necessary. Zero literal `.focus()` calls anywhere.
  ZERO frozen files modified.

- **Pagination — a flat primitive with no Material Role, composing only the
  frozen Icon + Spinner (Built, not frozen).** Random-access navigation
  across a flat, ordered collection split into fixed-size pages — jump
  directly to page 47 of 900 without stepping through the 46 before it.
  Not a List (the paginated content itself), not a DataTable (the content
  Pagination is composed INTO), not Infinite Scroll (a continuous flow
  with no "page N of M" concept or random access), not a Virtual List (a
  rendering optimization, invisible to the user), not a Stepper (linear
  progress through semantically different steps — Carbon: "do not use it
  to display linear journeys, for example, in a form progression"), not
  Tabs, not a Segmented Control (frozen, capped at "2–6 visible options"
  — Pagination must handle an arbitrarily large page count), not a
  Navigation Menu, not a plain row of Buttons (no shared `nav` landmark,
  no `aria-current`, no reusable collapse algorithm). A flat, token-only
  Navigation primitive — the sibling of the frozen Breadcrumb, not a
  Control Surface member: despite a controlled `page`/`onPageChange` API
  resembling Slider/SegmentedControl's value+onChange shape, MUI itself
  files Pagination under "Navigation" (never "Inputs"), and the
  WAI-ARIA-recommended markup (`nav` + list + `aria-current`) matches
  Breadcrumb, not any Control Surface member. Radix ships no Pagination
  primitive (confirmed via their own open, unresolved feature requests —
  issues #1856, #886, discussion #831). Unlike Breadcrumb, Pagination is
  a single, self-contained, non-compound component — no exported
  sub-parts, per the brief's explicit "une API très simple." Collapse
  mirrors MUI's own published `siblingCount`/`boundaryCount` semantics
  (both default 1): boundary and sibling pages always shown, one ellipsis
  for any larger gap, never for a gap of exactly one page (IBM Carbon's
  own documented rule). The ellipsis is purely decorative (unlike
  Carbon's own interactive menu-opening ellipsis) since Prev/Next already
  guarantee every page stays reachable — unlike Breadcrumb, where a
  hidden ancestor has no other path to it. Two independent switches
  mirroring Breadcrumb's own `responsive`: `compact` (explicit override)
  and `responsive` (default on, CSS-only breakpoint switch, zero JS
  measuring). RTL: flexbox reverses natively; chevrons flip via
  `rtl:rotate-180`. No roving-tabindex/arrow-key model needed — native
  Tab order is the complete keyboard model, zero literal `.focus()`
  calls. ZERO files modified outside the new component files.

- **Breadcrumb — a flat primitive with no Material Role, composing only the
  frozen Icon + Skeleton (Built, not frozen).** DISCIPLINE's hierarchical
  position indicator: a trail of ancestors from the app's root down to the
  current view, answering exactly one question — "where am I?" Not primary
  navigation (a menu explored FROM, never a report of where you already
  ARE), not Tabs (siblings at the SAME level, each owning a content panel),
  not a Stepper (linear PROGRESS through a task being completed — Carbon:
  "use a progress indicator instead"), not Pagination (a flat numbered
  sequence within one collection), not a Tree View (the whole structure,
  every branch, persistently), not history/a back button (the ORDER pages
  were visited, one reversible step — Apple's own HIG: "the back button
  always performs a single action"; Breadcrumb always reflects the current
  page's fixed STRUCTURAL position, independent of how the user arrived),
  not a Filesystem Path (a static string — every ancestor here is an
  independently clickable destination), not a Menubar/Dropdown Menu/
  Command Palette (commands, never a position report). Forbidden on a flat
  single-level app, for linear-process progress, as a substitute for real
  primary navigation (always secondary), and for browser session history.
  Apple's HIG explicitly recommends against multisegment breadcrumb paths
  in iOS navigation bars, confirming Breadcrumb is a web/desktop
  hierarchical pattern, not a native-stack one. Carries NO Material Role
  (zero GlassSurface, zero `.ds-micro`/`.ds-control`/`.ds-card`/
  `.ds-floating`/`.ds-immersive`) and spends zero motion budget. Full
  WAI-ARIA Breadcrumb pattern: `nav aria-label="Breadcrumb"`, an ordered
  list, `aria-current="page"` on the current (never a link) item, a
  decorative separator excluded from the accessibility tree. No
  roving-tabindex/arrow-key model needed — native Tab order is the
  complete keyboard model, zero literal `.focus()` calls anywhere. Radix
  ships no Breadcrumb primitive (confirmed via their own open GitHub issue
  #2050) — pure semantic HTML. Two composition modes mirroring the frozen
  Select: a data-driven `items` array or full manual composition via the
  exported sub-parts (`Breadcrumb.List`/`.Item`/`.Link`/`.Page`/
  `.Separator`/`.Ellipsis`). Collapse (`maxItems`) preserves the first
  crumb + a trailing run (IBM Carbon's documented convention) and reveals
  the rest via a real, focusable `Ellipsis` button that expands the trail
  in place — no floating layer, no new material. A separate, CSS-only
  `responsive` layer (default on) collapses middle crumbs below the `md`
  breakpoint with zero JS measuring, scoped to skip the already-collapsed
  path so the interactive Ellipsis is never hidden on mobile. RTL:
  flexbox reverses natively; the optional chevron separator flips via
  `rtl:rotate-180`. Two real bugs found and fixed during the build: the
  Loading state initially nested `<li>` inside `<li>` (invalid HTML,
  hydration mismatch) — fixed by rendering separators as siblings; the
  `responsive` CSS rule initially hid the JS collapse's own Ellipsis
  button on mobile (structurally a "middle" entry too) — fixed by scoping
  it to the non-collapsed path, verified with a dedicated mobile
  assertion. ZERO files modified outside the new component files.

- **Fullscreen Overlay — composes the Modal foundation + the frozen
  IconButton/Spinner (Built, not frozen).** DISCIPLINE's maximal immersive
  surface: a temporary takeover of the ENTIRE viewport for a long, complex
  or focus-hungry task, without leaving the current page. Not a bigger
  Drawer (a Drawer keeps the page visible beside it as context — the
  overlay deliberately REMOVES that context so nothing competes for
  attention), not a fullscreen Dialog (a Dialog is a bounded moment sized to
  its content — a decision or a small form; the overlay is an environment
  with its own header, body, footer, sidebars and toolbars, inhabited for
  minutes not seconds), not a Bottom Sheet (gesture-driven mobile physics at
  detents; the overlay is always the whole screen, keyboard/pointer first),
  not a Command Palette (a search-to-jump surface), not a Sidebar/Navigation
  Drawer (persistent layout regions), not a Popover (anchored, non-blocking),
  not a Wizard (a multi-step flow — content that may live inside an overlay,
  not the surface itself), not a Page (a routed destination with a URL — the
  overlay is transient and returns you exactly where you were). It exists
  because some tasks — building a program, creating a client, onboarding, an
  AI-assistant session, a media viewer, a fullscreen search, a side-by-side
  comparison — need the whole canvas and zero distraction, yet must not
  become a routed page; forbidden for a confirmation, a short form, a menu,
  contextual info, anything the page can host inline, and anything that
  deserves its own URL. Composes the Modal COMPONENT only — focus trap,
  restore focus, scroll lock, Escape, overlay, portal, inert background and
  the Title/Description ARIA wiring inherited verbatim; fullscreen-overlay.tsx
  contains ZERO focus/overlay/portal/scroll-lock code. Owns only its geometry
  (edge-to-edge, 100dvh, no radius, no centering — `inset-0`/`w-screen`/
  `max-w-none`/`translate-0`), its slots (header · breadcrumb · search ·
  toolbar · sidebar · body · inspector · footer · status bar) and its layout:
  a flex column where the header/toolbar/footer/status bar are sticky
  (shrink-0), the middle band (flex-1, min-h-0) holds an optional left
  sidebar + the body + an optional right inspector, the body is the ONLY
  scroll region, and the viewport never scrolls (Modal's scroll lock).
  `loading` overlays the body with the frozen Spinner; `disabled` blocks
  opening (an already-open overlay still closes); modal/non-modal,
  closeOnEscape/closeOnOverlay/restoreFocus guard the dismissal paths; a
  custom `header` slot replaces the default bar (the Title stays, visually
  hidden, so ARIA is intact); nested by plain composition (per-layer Escape,
  verified). fullscreen-overlay.tsx grep: zero `GlassSurface`/`blur`/
  `backdrop-filter`/`rgba`/`shadow`/`transition`/`animation` string; zero
  focus/portal/scroll-lock code. ZERO files modified outside the new
  component files — Modal, ImmersiveSurface, IconButton, Icon and Spinner
  reused as-is (not even the additive Modal props were needed).

- **Bottom Sheet — composes the Modal foundation + the frozen Spinner
  (Built, not frozen).** DISCIPLINE's touch-first immersive surface: a
  panel that rises from the bottom edge and is driven by the gesture
  (drag/swipe/flick), resting at detents and dismissed by a downward
  throw. Where the frozen Drawer is a workspace (two positions, closed by
  a button/overlay), the Bottom Sheet is an interaction — the finger owns
  it; the gesture physics is the whole reason it exists and is exactly
  what the Drawer forbids (its frozen doc reserved these behaviors for
  "a future BottomSheet"). Not Dialog/Modal (centered, no gesture), not
  AlertDialog (a blocking question), not Popover (trigger-anchored), not
  Command Palette, not Navigation Drawer/Sidebar (a Drawer use-case / a
  persistent region), not iOS Action Sheet (a fixed choice list — a
  content pattern it hosts), not Material Bottom Sheet/vaul (this IS that
  species — DISCIPLINE's native token-only take; vaul a technical
  reference only, never visual). Composes the Modal COMPONENT only —
  portal, focus trap, scroll lock, Escape, overlay, inert background and
  Title/Description ARIA inherited verbatim; bottom-sheet.tsx contains
  ZERO focus/overlay/portal/scroll-lock code. Owns only the physics: the
  pane is bottom-pinned and its HEIGHT is the detent (sticky header/footer
  stay put while the body scrolls between), the height follows the finger
  1:1 with rubber-band resistance past the tallest detent, a downward
  overshoot below the shortest detent slides toward dismissal, a velocity
  flick dismisses else it snaps to the nearest detent. The settle
  (transform + height glide) lives in a token-only `bottom-sheet.css`
  (reduced-motion aware), toggled off during drag via a class — so the
  .tsx carries no `transition`/`animation` string and no
  `requestAnimationFrame`. Detents content/small/medium/large/full/custom
  %, viewport-clamped; `content` reads the natural column height.
  Responsive full-width mobile / width-capped centered desktop with no
  media query; keyboard avoidance via VisualViewport; safe-area insets.
  modal/non-modal, dismissible/closeOnOverlay/closeOnEscape guard the
  dismissal paths (an explicit BottomSheet.Close always closes, even on a
  non-dismissible sheet); nested by plain composition (per-layer Escape).
  bottom-sheet.tsx grep: zero `GlassSurface`/`blur`/`backdrop-filter`/
  `rgba`/`shadow`/`transition`/`animation` string. ZERO files modified
  outside the two new component files — not even the additive Modal
  extensions were needed (Modal, ImmersiveSurface and Spinner reused
  as-is).

- **Drawer — composes the Modal foundation + the frozen IconButton/Spinner
  (Built, not frozen).** An edge-anchored immersive panel: a secondary
  workspace sliding in from one side, holding real content (forms,
  settings, inspectors, navigation) — a dialog for a decision, a drawer
  for a task. Not Dialog/Modal (a centered moment vs. an edge-attached
  space), not Alert Dialog (a blocking question — the opposite), not Sheet
  (another library's name for the same species — one canonical name), not
  Bottom Sheet (drag/detent/swipe physics — a future component), not
  Popover/Tooltip/Hover Card, not Dropdown/Context Menu, not Navigation
  Menu, not Command Palette, not Sidebar (persistent vs. overlaying), not
  Accordion/Collapsible, not Card, not Form/Wizard, not Overlay, not
  Toast. Composes the Modal COMPONENT only — focus trap, restore focus,
  scroll lock, Escape, overlay, portal, inert background and
  Title/Description ARIA inherited verbatim; drawer.tsx contains ZERO
  focus code of any kind (the cleanest grep of the session). Adds only
  geometry and slots: side left/right/top/bottom; sizes xs→full per axis,
  viewport-clamped; the frozen CommandPalette pane neutralization verbatim
  with the pane's frozen radius kept whole via an 8px viewport gutter;
  sticky header / scrollable body / sticky footer with custom slots;
  modal/non-modal; closeOnEscape/closeOnOverlay; forceMount; nested
  drawers by plain composition (per-layer Escape, verified). TWO strictly
  additive extensions to modal.tsx were required and documented
  (`forceMount` forwarding to the Portal, `contentClassName` for the inner
  content plane — Modal's output is byte-identical when the new props are
  absent).

- **Alert Dialog — composes the Modal foundation + the frozen Button
  (Built, not frozen).** An interrupting confirmation: one question that
  must be answered — confirm or cancel — before anything else can happen;
  not Dialog/Modal (the generic immersive container, dismissible by
  outside click — Alert Dialog is a specialized message + binary choice on
  top: `role="alertdialog"`, outside click never dismisses, initial focus
  on the least destructive action), not Popover/Tooltip/Hover Card
  (anchored, flow-preserving/passive), not Toast (transient — informs vs.
  interrogates), not Banner/Alert/Notification (page-level information
  with no required answer), not Confirm Dialog (this component's neutral
  variant, not a sibling), not Sheet/Drawer, not Dropdown/Context Menu,
  not Command Palette (the other Immersive member — same Modal parent,
  different job), not Form (no fields), not Wizard, not Card, not Message
  Box (the OS `window.confirm` — this is its design-system-native
  replacement). Composes the Modal COMPONENT only (never the primitives
  underneath — Modal's own rule): scrim, frozen pane material, entrance,
  focus trap, scroll lock, Escape, inert background, focus return and the
  Title/Description ARIA wiring all inherited verbatim; adds only the
  alert semantics plus the two frozen Buttons (Cancel `secondary`, Confirm
  `primary`/frozen `destructive` — zero new recipe). `loading` locks every
  dismissal path while an action is in flight (Escape prevented, Cancel
  disabled). Uncontrolled closes itself; controlled leaves closing to the
  consumer, which is what enables async flows. alert-dialog.tsx grep: zero
  `GlassSurface`/`blur`/`backdrop-filter`/`rgba`/`shadow`/`transition`/
  `animation` string; ONE irreducible literal `.focus()` (WAI-ARIA initial
  focus on Cancel). ZERO files modified outside the new component — Modal
  and Button provided everything.

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
