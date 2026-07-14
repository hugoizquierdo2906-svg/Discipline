# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **Grid — built to the full process, not frozen (Layout primitive).** New
  API: `Grid` with `columns` (fixed equal tracks, default 2), `minColumnWidth`
  (a length that switches to breakpoint-free responsive columns —
  `repeat(auto-fit, minmax(minColumnWidth, 1fr))`, overrides `columns`),
  `fill` (`fit`/`fill` — collapse or keep empty tracks), `gap` (the same
  `--ds-space` scale as Stack), `align` (align-items), `justify`
  (justify-items) and `as` (polymorphic). Answers exactly ONE question: "how
  do I place elements in a TWO-DIMENSIONAL grid — aligned rows AND columns —
  with consistent spacing?" — the 2-D counterpart to the frozen Stack (Stack
  is a single-axis flow whose `wrap` gives ragged rows; Grid lays a real
  matrix whose column tracks line up across every row). It knows no business,
  data, design, breakpoint or children; it renders a single `display:grid`
  element and nothing else — no surface, colour, material or motion. Not
  Stack/Flex (1-D), not a Container (page max-width), not Split/Columns
  (resizable panes), not a Table/DataGrid (those carry tabular DATA semantics
  — caption, header cells, `role="grid"`; Grid is pure visual layout with
  zero semantics), not Bootstrap/MUI Grid (12-column breakpoint-array systems
  — Grid has NO breakpoint props; a responsive column count is the consumer's
  own `className` or, breakpoint-free, `minColumnWidth` + auto-fit). Fixed
  column counts are emitted as real `grid-cols-N` classes (each is exactly
  `repeat(N, minmax(0,1fr))`) so a consumer's `className="sm:grid-cols-3"`
  actually overrides the base via `cn`/tailwind-merge (an inline style would
  out-specify it); only the arbitrary `minColumnWidth` track list uses an
  inline template. Deliberately NO `rows`/`flow`/`areas` props (advanced
  CSS-Grid needs a consumer expresses via `className`) and NO `reverse` (a
  grid has no meaningful reversal — DOM order always equals visual order).
  Accessibility: source-order DOM (tab/SR order matches markup), columns run
  inline-direction-aware so RTL flows right-to-left with no directional code.
  Proof `/dev/grid` + `scripts/grid-proof.mjs` green (display:grid, fixed
  2/3/4 column counts, auto-fit reflowing more tracks when wider, auto-fill
  reserving empty tracks, the gap scale mapped to `--ds-space`, align/justify,
  a nested Grid with DOM order preserved, responsive via consumer className
  overriding the base, RTL first-cell-on-the-right, composition with the real
  GlassCard/ChartContainer/Table/Input/Badge, no-regression sweep). Grep
  clean (only grid/gap/items/justify layout utilities — no colour, material,
  motion, hex or px). Built, not frozen — awaiting visual validation.

- **Stack — FROZEN (Layout primitive).** A full Frozen Review (component,
  API, architecture, responsibilities, accessibility, performance,
  responsive, RTL, Playwright proof, captures, imports, dead code, hardcoded
  tokens, colour, animation, business logic, dependencies) found **no
  objective defect** — zero code changed, frozen as-is. The public API —
  `Stack` (`direction`/`gap`/`align`/`justify`/`wrap`/`reverse`/`as`/
  `className`) — now requires an ADR to change. Validation green at freeze:
  type-check, lint, build (77/77 static pages, route registered),
  `scripts/stack-proof.mjs`, grep clean (only flex/gap/items/justify layout
  utilities), fresh desktop/tablet/mobile/RTL captures.

- **Stack — built to the full process, not frozen (Layout primitive).** New
  API: `Stack` with `direction` (`vertical` default · `horizontal`), `gap`
  (`none`/`xs`/`sm`/`md`/`lg`/`xl` → the shared `--ds-space` scale
  0/4/8/16/24/32, default `md`), `align` (`start`/`center`/`end`/`stretch`/
  `baseline`), `justify` (`start`/`center`/`end`/`between`), `wrap`, `reverse`
  and `as` (polymorphic element). Answers exactly ONE question: "how do I
  distribute a set of elements along a SINGLE axis with consistent spacing?"
  — the typed, enforced replacement for the hundreds of
  `<div className="flex flex-col gap-4">` across the app, so vertical rhythm
  is chosen from one ladder instead of re-decided by hand at every call site.
  It knows no business, data, design, animation, breakpoint or children; it
  renders a single flex element and nothing else — no wrapper, no context, no
  child manipulation, no surface/colour/material/motion. Not Flex (the raw
  two-axis escape hatch — Stack is the opinionated single-axis 95% case), not
  Grid (2-D placement), not a Container (page max-width), not a Spacer (one
  gap, not a distributor), not Split/Columns (fractional panes), not
  Cluster/Inline (covered by `wrap`), not a Card/Section (a drawn surface),
  not a List (Stack can render AS a `<ul>` via `as` but never adds list
  semantics), not bare gap utilities (untyped — the inconsistency Stack
  removes). Deliberately NO `divider` prop (a divided stack is the consumer
  composing the frozen Separator — inserting it would couple Stack to child
  manipulation) and NO responsive/breakpoint props (responsive is the
  consumer's own `className`, e.g. `className="sm:flex-row"`, merged over
  Stack's base by `cn`). Accessibility: renders in source order so DOM/tab/
  screen-reader order always match the markup; `reverse` flips only the
  VISUAL order (documented flex tradeoff, DOM untouched); `direction`/`align`/
  `justify` are flexbox-native and RTL-correct with no directional code.
  Proof `/dev/stack` + `scripts/stack-proof.mjs` green (direction, the gap
  scale mapped to `--ds-space` px-for-px, align/justify, wrap, reverse with
  DOM order preserved, responsive via consumer className, semantic `as="ul"`,
  RTL first-item-on-the-right, composition with the real GlassCard/Input/
  Separator/Avatar/Badge/Button/ChartContainer/Table, no-regression sweep).
  Grep clean (only flex/gap/items/justify layout utilities — no colour,
  material, motion, hex or px). Built, not frozen — awaiting visual
  validation.

- **ChartContainer — FROZEN (Data Display primitive).** A full Frozen Review
  (component re-read end to end, slots, responsibilities, props, captures,
  Playwright proof, accessibility, performance, tokens, dependencies,
  imports, dead code) found **no objective defect** — zero code changed,
  frozen as-is (like Carousel/Table/ActivityFeed/Separator before it). The
  public API — `ChartContainer` (`intent`/`className`), `ChartContainer.Content`
  (`ratio`/`className`), `ChartContainer.Loading` (`label`/`className`),
  `ChartContainer.Empty`/`ChartContainer.Error` (the frozen EmptyState/
  ErrorState props), and every other sub-part's `className` — now requires an
  ADR to change. Validation green at freeze: type-check, lint, build (76/76
  static pages, route registered), `scripts/chart-container-proof.mjs`, grep
  clean (no chart-engine/data/axis/series string, no hardcoded hex/rgba),
  fresh desktop/tablet/mobile/RTL captures.

- **ChartContainer — built to the full process, not frozen (Data Display
  primitive).** New compound API: `ChartContainer` / `ChartContainer.Header`
  / `ChartContainer.Title` / `ChartContainer.Description` /
  `ChartContainer.Content` / `ChartContainer.Legend` /
  `ChartContainer.Footer` / `ChartContainer.Loading` / `ChartContainer.Empty`
  / `ChartContainer.Error`. Answers exactly ONE question: "how do I host a
  data visualization CLEANLY?" It provides the CONTAINER, never the content
  — it never knows the data, axes, series, scales, colours or chart type,
  and draws no mark of its own; whatever renders in the render zone (an SVG,
  a `<canvas>`, an `<img>`, a Recharts/Chart.js/D3/ECharts tree, a bare div)
  is the consumer's, so the same container hosts any visualization
  technology for a decade without a rewrite. Not a chart or a chart library
  (the frame, not the drawing), not a Card/GlassCard (it COMPOSES the frozen
  GlassCard as its surface and adds only the viz-hosting rhythm), not a
  Table/DataGrid (exact values vs. shape/trend), not a Metric/Stat tile (a
  formatted number), not a Dashboard (a screen that ARRANGES many
  containers). The root is the frozen GlassCard rendered as a `<figure>`,
  labelled by its `Title` (`aria-labelledby`) and described by its
  `Description` (`aria-describedby`) — wired structurally via context + a
  mount-time registration so the references are never dangling when a slot
  is omitted. `Content` is the render zone with an optional `ratio` (any CSS
  `aspect-ratio` value — pure layout, Invariant A1). `Loading`/`Empty`/
  `Error` compose the frozen Spinner/EmptyState/ErrorState in a centred
  render-zone box, reimplementing none of them. Props: `intent`
  (`neutral`/`primary`, forwarded to GlassCard) on the root and `ratio` on
  `Content` — no data prop, no colour scale, no axis, ever. Proof
  `/dev/chart-container` + `scripts/chart-container-proof.mjs` green (figure
  semantics + labelledby/describedby wiring, no dangling refs on a bare
  container, header/legend/footer, render-zone aspect ratio, loading
  `role=status`, empty/error composing the frozen states with actions, `h3`
  title hierarchy, responsive, RTL, no-regression sweep across Carousel/
  DataGrid/Table/Timeline). Grep clean (no chart-engine/data/axis/series
  string, no hardcoded hex/rgba). Built, not frozen — awaiting visual
  validation. **Craft Review (2026-07-14, still not frozen):** one objective
  finish fix — `ChartContainer.Title` dropped from `level={4}` (`--ds-text-h4`
  32px, the canonical "Titre de bloc") to `level={5}` (`--ds-text-h5` 24px,
  the token's own "Titre de carte"): a chart caption must stay quiet so the
  visualization, not the Header, is the focal point (semantic `as="h3"`
  unchanged). Everything else was analysed and left untouched — Legend
  already reads secondary/small, Footer tertiary, one accent per card, the
  gap rhythm matches Card/Table/Carousel. Re-validated green.

- **Carousel — FROZEN (Data Display primitive).** A full Frozen Review
  (component re-read end to end, all variants, the demo, the captures and
  the Playwright proof; API, responsibilities, accessibility, performance,
  and coherence with Card/Drawer/Modal/FullscreenOverlay/GlassCard; the
  composition with Avatar/Badge/Heading/Button; responsive, RTL, animations,
  scroll snapping, keyboard navigation, indicators, previews, Hero, Loop,
  Vertical) found **no objective defect** — zero primitive code changed,
  frozen as-is (like Table/ActivityFeed/Separator before it). The public
  API — `Carousel` (`orientation`/`loop`/`align`/`className`),
  `Carousel.Content`/`Carousel.Item` (`className`), `Carousel.Previous`/
  `Carousel.Next` (IconButton props: `label`/`icon`/`variant`/`size`/
  `className`), `Carousel.Indicators` (`className`), plus the `data-active`
  styling hook surfaced on the active `Carousel.Item` — now requires an ADR
  to change. Validation green at freeze: type-check, lint, build (75/75
  static pages), `scripts/carousel-proof.mjs`, grep clean, fresh desktop/
  tablet/mobile/RTL captures.

- **Carousel — built to the full process, not frozen (Data Display
  primitive).** New compound API: `Carousel` / `Carousel.Content` /
  `Carousel.Item` / `Carousel.Previous` / `Carousel.Next` /
  `Carousel.Indicators`. Answers exactly ONE question: "how do I browse
  SEQUENTIALLY through a series of items?" Holds no business logic and no
  domain knowledge — no images/products/articles concept, no lightbox,
  zoom, fullscreen, infinite/virtualized scroll, drag-reorder, masonry/
  grid, autoplay/slideshow timer, lazy loading, analytics or swipe
  business logic; every one of those belongs to a higher component that
  would COMPOSE a Carousel. Not ScrollArea (a generic scroll surface with
  no discrete slides, snapping, stepping or active index), not Tabs
  (switches mutually-exclusive named panels where only one is mounted;
  a Carousel slides across one continuous track with adjacent items partly
  visible), not Pagination (random access to numbered pages that replace
  the view; a Carousel is continuous sequential travel and its dots
  indicate position, not page numbers), not a Gallery grid (2-D grid read
  at once vs 1-D sequence read one region at a time), not Card (the thing
  an Item commonly wraps), not List/Timeline/ActivityFeed (no swept snap
  track). Built on a NATIVE CSS scroll-snap track — no carousel-engine
  dependency, no JS transform animation: stepping calls the browser's own
  `scrollIntoView`, which honours the container's `scroll-behavior: smooth`
  and degrades to an instant jump under `prefers-reduced-motion` (via
  `motion-reduce:scroll-auto`). Direction is fully native — a horizontal
  track and the logical `scroll-snap-align` (`start`/`center`/`end`)
  mirror correctly under `dir="rtl"`, and the Arrow keys mirror with it.
  The active index is read from geometry (the item whose centre is nearest
  the viewport centre — direction/orientation-agnostic), never a consumer
  prop. `Carousel.Previous`/`Carousel.Next` compose the frozen `IconButton`
  verbatim and disable at the ends unless `loop` (matching the frozen
  Pagination's own edge-disable). `Carousel.Indicators` renders one
  position dot per item, the active one gently elongated via a token-driven
  `duration-standard`/`ease-out` width+colour transition (the same calm
  motion budget the frozen Accordion/Collapsible chevrons use). Full
  WAI-ARIA Carousel pattern: root `aria-roledescription="carousel"` +
  `aria-label`, track `role="group"` + `aria-live="polite"`, each item
  `aria-roledescription="slide"` + `aria-label="N of M"` (injected
  structurally), controls `aria-controls` the track. Keyboard: Arrow
  Left/Right (horizontal, RTL-mirrored) or Up/Down (vertical) step,
  Home/End jump to first/last, Tab/Shift+Tab move through the real
  focusable controls. `orientation` (`horizontal` default/`vertical`),
  `loop` (default false — wrap the STEP, never cloned-slide infinite
  marquee) and `align` (`start` default/`center`/`end` snap alignment) are
  the only props; item width/height stays the consumer's layout decision
  (Invariant A1). Composes ONLY Typography/`border`/`accent` tokens and the
  frozen IconButton/Icon — no GlassSurface, no shadow, no gradient, no
  tilt, no coverflow. Proof `/dev/carousel` + `scripts/carousel-proof.mjs`
  (ARIA structure, native snap track, basic stepping, indicators + active
  elongation, non-loop edge-disable, loop wrap-around, vertical axis,
  keyboard Arrow/Home/End, IconButton composition, responsive, RTL,
  no-regression sweep). Grep clean: zero GlassSurface/blur/backdrop-filter/
  rgba/shadow/coverflow/animation and zero hardcoded hex/px/ms outside
  doc-comment prose (the one `transition` is the token-driven indicator
  dot). Awaiting visual validation before any freeze.

- **Carousel — mobile Hero density fix (still not frozen).** A targeted
  Craft Review of the mobile Hero only; no new feature/API/responsibility/
  a11y/perf change, primitive untouched. Root cause: this design system's
  `sm` breakpoint is 390px (not Tailwind's default 640px), so a 390px phone
  was already inside `sm:` and received the roomy desktop treatment —
  `sm:p-10` padding and the equal-height `sm:items-stretch` track — which
  stretched every card to the tallest sibling's height and floated the CTA
  far below its content. Fix: the compact treatment is now the unprefixed
  base (phones) and the roomy keynote treatment moves to `md:` (768px+), so
  the Hero card sizes to its own content on phones (track `items-start`,
  no `flex-1` spacer, `p-6`/`gap-5`) while tablet and desktop keep the exact
  `md:` roomy layout. Measured: the active mobile card drops 766px → 654px
  and the CTA hugs its content, while tablet (528px) and desktop (546px)
  are pixel-identical to before — zero regression above 768px. Validation
  green: type-check, lint, build, proof, fresh desktop/tablet/mobile/RTL
  captures.

- **Carousel — final Editorial Review pass, declared freeze-ready (still
  not frozen).** No new feature/API/responsibility/a11y/perf change. The
  one objective improvement: the demo's peek treatment deepens its
  recession — a non-active slide moves from `scale-[0.94] opacity-40` to
  `scale-[0.9] opacity-30` (blur unchanged, no perf cost), so neighbours
  read as a distinct back plane ("the next chapter, waiting") instead of a
  card cut off at the edge — the foreground/background depth the two prior
  reviews left too flat. Everything else was analysed and deliberately left
  untouched: making the controls disappear further (opacity-0 until hover)
  was declined because it would break touch discoverability (an a11y
  regression), and the card border/shadow belong to the frozen GlassCard
  and are out of scope. Validation green: type-check, lint, build, proof,
  fresh desktop/tablet/mobile/RTL captures. Ready for freeze.

- **Carousel — Editorial Review pass (still not frozen).** A finishing
  pass before freeze, no new feature/API/responsibility/a11y/perf change.
  The one objective improvement: the demo's `Carousel.Previous`/`Next` move
  from the `secondary` IconButton (visible border + fill at rest) to the
  frozen `ghost` variant with a quiet `text-text-secondary` chevron, so the
  controls carry no material at rest and lift it only on hover — they float
  and all but disappear until needed (the chevron tone overrides ghost's
  accent tint so a control never competes with the single red accent the
  content owns). Pure demo composition (ghost is an existing frozen
  IconButton variant, passed through the primitive's overridable variant;
  the same `sm` target size and ARIA label are kept) — the primitive is
  untouched. Also hardened `scripts/carousel-proof.mjs`: the indicator-
  elongation assertion waited only 500 ms after a jump and could measure
  the active segment mid-width-morph (the width class flips only once the
  smooth scroll settles); the wait now clears both so the elongation is
  read at rest. Validation green: type-check, lint, build, proof, fresh
  desktop/tablet/mobile/RTL captures.

- **Carousel — Craft Review pass (still not frozen).** Elevated the visual
  finish toward an Apple/Linear "reading experience" without touching the
  API, the responsibilities, the accessibility contract or performance. The
  primitive gains only a pure CSS styling HOOK: `Carousel.Content` surfaces
  its already-computed active index as `data-active` on the current
  `Carousel.Item` (the Radix `data-state` idiom — no new prop, no new
  responsibility), and `Carousel.Indicators` is redesigned from position
  dots into a thin segmented progress bar (the active segment widens and
  takes the single accent, inactive segments stay neutral; invisible
  `after` hit-area preserves the a11y target size). All the premium
  composition — one dominant central card, dimmed/scaled/blurred side
  previews reading as "next chapters," staggered content reveal
  (eyebrow → title → body → CTA), floating controls, generous air — lives
  in the DEMO on top of the unchanged primitive, because baking focus/peek/
  choreography into a generic Data Display primitive would violate
  Invariant A1 (base components make no layout decisions). Validation green:
  type-check, lint, `scripts/carousel-proof.mjs` (ARIA, native snap,
  stepping, indicators active-wider-than-inactive, non-loop disable, loop
  wrap, vertical, keyboard, responsive, RTL, no-regression sweep), grep
  clean, fresh desktop/tablet/mobile/RTL captures.

- **DataGrid — frozen (Data Display primitive).** Visually validated
  2026-07-10 after a Frozen Review (component, captures, Playwright proof,
  API, architecture, tokens, dependencies) found and fixed one genuine
  objective defect: a **sortable** `DataGrid.Column` with `align="center"`
  or `align="end"` did not actually align its header. The label `<span>`
  was always `flex-1`, which absorbs every bit of free space — so the
  `justify-center` class was inert dead code, and the `flex-row-reverse`
  used for `end` mis-ordered the label and chevron rather than pushing the
  group to the end edge (only the default `start` alignment, the sole path
  the demo exercised, rendered correctly). Fixed by growing the label only
  for `start` (preserving that validated look byte-identically — the
  chevron still pins to the column's far edge) and, for `center`/`end`,
  keeping the label + chevron together as one group positioned by the
  flex container's RTL-aware `justify-center`/`justify-end`; the broken
  `flex-row-reverse` was removed. Covered by a new demo column (an
  `align="end"` sortable "Progress" column) and a new proof assertion. No
  other objective defect found. No functional, visual or architectural
  change again except an objective bug; the public API (`DataGrid`'s
  `className`, `DataGrid.Column`'s `align`/`sortable`/`sortDirection`/
  `onSort`/`className`, `DataGrid.Empty`'s `colSpan`/`className`, and the
  re-exported Table/Pagination parts' own APIs) requires an ADR to change.

- **DataGrid — built to the full process, not frozen (Data Display
  primitive).** New compound API: `DataGrid` / `DataGrid.Toolbar` /
  `DataGrid.Header` / `DataGrid.Body` / `DataGrid.Row` / `DataGrid.Cell` /
  `DataGrid.Column` / `DataGrid.Footer` / `DataGrid.Empty` /
  `DataGrid.Pagination`. Answers exactly ONE question: "how do I
  manipulate a large set of comparable data?" — what the frozen Table
  becomes once a dataset needs sorting, row selection, pagination and a
  toolbar on top of plain comparison, while staying a UI orchestration
  surface, never a data engine: it knows nothing about APIs, backends,
  SQL, server-side search, permissions, business rules, lazy loading,
  business-level virtualization, import/export, CSV/Excel or GraphQL, and
  nothing about any DISCIPLINE domain concept. Sort direction, selected
  rows and the current page are all CONTROLLED STATE the consumer owns —
  DataGrid only renders the affordance (a clickable sortable header, a
  pagination control, a toolbar slot) and forwards the interaction, never
  reorders, filters or slices the data itself. Not Table (no sort,
  selection, pagination or toolbar — DataGrid is built BY COMPOSING Table
  directly, never duplicating its markup: `DataGrid.Header`/`Body`/`Row`/
  `Cell`/`Footer` ARE `Table.Header`/`Body`/`Row`/`Cell`/`Footer`,
  re-exported, not reimplemented). Not TreeView (a hierarchy, no
  parent/child relationship in DataGrid). Not Timeline/ActivityFeed (no
  time axis, no per-row anatomy — DataGrid rows are arbitrary named-column
  records). Not a Spreadsheet/Excel (no free-form cell editing, no
  formulas, no cell-to-cell references — every cell is a fixed, read-only
  display of one field). Not List/Card (no named columns; one object's
  isolated detail, respectively). `DataGrid.Column` is the one genuinely
  new piece over `Table.Head`: an OPTIONAL `sortable` affordance (a
  clickable header, a chevron indicator, `aria-sort`) — the actual
  comparator and row re-ordering stay the consumer's job. `DataGrid.Empty`
  is a valid `<tr>`/`<td>` wrapper (spanning every column) around the
  frozen `EmptyState`, so "no rows" still renders inside a structurally
  valid `<tbody>`. `DataGrid.Pagination` is the real, frozen `Pagination`
  component itself, composed directly beneath the table. `DataGrid` (root)
  and `DataGrid.Toolbar` are plain flex layout slots with no material of
  their own — the actual `<Table role="grid">` sits between them as its
  own element, since a toolbar and a pagination control cannot legally
  live inside a `<table>`. Setting `role="grid"` on the underlying Table
  is the ONLY ARIA Grid wiring added by hand: per the HTML-ARIA mapping, a
  `<td>`'s implicit role already becomes `gridcell` (instead of `cell`)
  the moment its ancestor `<table>` carries `role="grid"`, and `<th>`/
  `<tr>` already compute to `columnheader`/`row` regardless — every ARIA
  Grid role falls out of real HTML semantics, never a hand-authored
  `role="gridcell"` on every cell. Keyboard navigation is entirely native
  (every interactive surface is a real `<button>` — no custom grid
  cell-to-cell arrow-key model, since that is an editable-spreadsheet
  concern DataGrid explicitly does not have). No GlassSurface, no heavy
  grid lines, no Excel look — DataGrid inherits Table's own calm hairline
  rhythm unchanged. Proof `/dev/data-grid` + `scripts/datagrid-proof.mjs`
  (ARIA Grid roles cascading from `role="grid"`, selection toggling real
  checked/indeterminate state, sorting toggling `aria-sort` and actually
  re-ordering consumer-owned rows, the real Pagination changing visible
  rows, the Toolbar's SearchInput filtering consumer-owned rows, Empty
  rendering the frozen EmptyState in a valid row, a Loading row composing
  the frozen Spinner, long content wrapping without truncation, responsive
  horizontal scroll inherited from Table, disabled Pagination truly
  disabling its buttons, RTL, keyboard reaching and activating the
  sortable header via a native button, no-regression sweep across
  Table/TreeView/ActivityFeed/Timeline). Grep clean: zero GlassSurface/
  blur/backdrop-filter/rgba/shadow/transition/animation and zero
  hardcoded hex/px/ms outside doc-comment prose. Awaiting visual
  validation before any freeze.

- **TreeView — frozen (Data Display primitive).** Visually validated
  2026-07-10 after a Frozen Review (component, captures, Playwright proof,
  API, architecture, tokens, dependencies) found and fixed one genuine
  dead-code defect: `focusTreeItem`'s `current` parameter was unused
  (silenced with a `void current` statement) since the function only ever
  acted on `next` — removed the parameter and updated every call site.
  No other objective defect found. No functional, visual or architectural
  change again except an objective bug; the public API (`TreeView.Item`'s
  `defaultOpen`/`open`/`onOpenChange`/`disabled`/`className`, every other
  sub-part's `className`) now requires an ADR to change.

- **TreeView — built to the full process, not frozen (Data Display
  primitive).** New compound API: `TreeView` / `TreeView.Item` /
  `TreeView.Trigger` / `TreeView.Content` / `TreeView.Icon` /
  `TreeView.Label`. Answers exactly ONE question: "what is the
  hierarchical structure of these items?" Holds no business logic — no
  routing, filesystem, permissions, lazy loading, remote data, drag & drop,
  checkboxes, multi-selection, editing, renaming, context menus, search,
  filter or virtualization; every one of those belongs to a future,
  separate File Explorer. Not List (no parent/child relationship at all),
  not Table (no columns, only containment), not Accordion (a flat group of
  independent sections at one single level, never arbitrary nesting), not
  Collapsible (the atom TreeView is built FROM — one region, no hierarchy,
  no levels, no roving focus), not Navigation Menu/Sidebar (destinations
  to navigate TO; TreeView reveals structure in place), not Tabs/Timeline/
  ActivityFeed (no containment concept at all), not a File Explorer (a
  business screen that would compose TreeView as its pure display layer).
  Built NATURALLY on top of the frozen `Collapsible` — every expand/
  collapse state machine (`open`/`defaultOpen`/`onOpenChange`/`disabled`,
  `aria-expanded`/`aria-controls`, Enter/Space activation) is Collapsible's
  own, reshaped via `asChild` into a tree row (leading chevron, optional
  icon, label, depth indentation) instead of Collapsible's own FAQ-row
  shape — the open/close mechanism itself is never reimplemented. A
  `TreeView.Item` with no `TreeView.Content` child is a leaf: no
  Collapsible, no chevron (an invisible same-width spacer keeps labels
  aligned regardless of depth), no `aria-expanded`. Depth is expressed
  ONLY as indentation (`calc(var(--ds-space-4) * (level - 1) + var(--ds-
  space-2))`, a token-driven inline calc, never a hardcoded pixel value)
  and `aria-level` — never a rendered vertical guide line, never a box or
  a Card. Full WAI-ARIA Tree View pattern: `role="tree"` on the root,
  `role="treeitem"` with `aria-level`/`aria-setsize`/`aria-posinset`
  (computed structurally from sibling position, never a consumer prop) on
  every row, `role="group"` on every nested list. Keyboard follows the APG
  model exactly, hand-rolled at the root via one delegated `keydown`
  handler and literal `.focus()` calls (the same justified exception
  already used by the frozen MultiSelect/TimePicker/DateRangePicker, since
  no bundled tree keyboard model exists to compose): ArrowDown/ArrowUp
  move a roving `tabIndex` across every currently rendered treeitem
  (Collapsible.Content unmounts a closed branch entirely, so "rendered"
  already means "visible"); Home/End jump to the first/last treeitem;
  ArrowRight opens a closed branch or moves into its first child; ArrowLeft
  closes an open branch or moves to its parent; Enter/Space need no
  handler at all since every row is a real `<button>`. Composes ONLY
  Typography tokens and the frozen Collapsible — no GlassSurface, no Card,
  no shadow, no gradient, no decorative line, no box around a node.
  Proof `/dev/tree-view` + `scripts/tree-view-proof.mjs` (ARIA structure,
  setsize/posinset, nesting depth without a guide line, default-open/
  controlled/uncontrolled/disabled behaviour, Icon/Badge/Avatar composing
  with zero adaptation, long-label truncation, responsive, RTL, full
  keyboard navigation verified end-to-end, no-regression sweep across
  Collapsible/Accordion/ActivityFeed/Timeline). Grep clean: zero
  GlassSurface/blur/backdrop-filter/rgba/shadow/animation and zero
  hardcoded hex/px/ms outside doc-comment prose (the sole
  `transition-transform duration-fast ease-standard` occurrence is the
  identical chevron-rotation string already frozen verbatim in Accordion
  and Collapsible). Awaiting visual validation before any freeze.

- **ActivityFeed — frozen (Data Display primitive).** Visually validated
  2026-07-10 after a Frozen Review (component, captures, Playwright proof,
  API, architecture, tokens, dependencies) found no objective defect — zero
  code changed, the freeze locks it as-is. No functional, visual or
  architectural change again except an objective bug; the public API
  (`ActivityFeed`'s `compact`/`align`/`className`, each sub-part's
  `className` + native attributes) requires an ADR to change.

- **ActivityFeed — built to the full process, not frozen (Data Display
  primitive).** New compound API: `ActivityFeed` / `ActivityFeed.Item` /
  `ActivityFeed.Avatar` / `ActivityFeed.Icon` / `ActivityFeed.Content` /
  `ActivityFeed.Title` / `ActivityFeed.Description` / `ActivityFeed.Meta` /
  `ActivityFeed.Actions`. Answers exactly ONE question: "what happened
  recently?" Holds no business logic — no push notifications, real-time,
  WebSockets, likes, comments, replies, reactions, bookmarks, unread state,
  selection, pagination, infinite scroll, loading, filtering, grouping,
  sorting or search; every one of those belongs to the consuming business
  screen, never to ActivityFeed. Not Timeline (Timeline answers "in what
  order did these events happen?" — a strict chronological axis drawn as a
  line between dots; ActivityFeed has no drawn axis at all, just a list of
  activities read for their own content), not Table (compares aligned
  properties in columns; ActivityFeed has none), not List (a
  content-agnostic sequence; ActivityFeed has a specific anatomy: actor/
  icon, title, description, metadata, actions, always in that order), not
  Card (isolated full detail with its own surface; an ActivityFeed.Item is
  a plain row read as part of a list), not Accordion (progressive
  disclosure; every item is always fully visible), not TreeView
  (hierarchical containment; ActivityFeed is flat), not a Notification
  (actionable/stateful, read/unread, dismissible; ActivityFeed has none of
  that), not an Audit Log (compliance-grade, immutable, filterable
  machinery ActivityFeed does not implement), not Chat/Comment Thread
  (two-way conversational content; ActivityFeed is one-way, system-
  reported), not History (often reversible/undoable, tied to one object;
  ActivityFeed is cross-object), not a social Feed (Facebook/Twitter/
  Instagram/LinkedIn/Discord/Slack-style reactions, comments, threads —
  forbidden absolutely). `ActivityFeed` renders a real `<ul>` (unlike
  Timeline's `<ol>` — order is not itself the semantic point here) of
  `ActivityFeed.Item` `<li>`s. `ActivityFeed.Avatar`/`ActivityFeed.Icon`
  are plain leading-column slots sharing one fixed footprint, so a
  consumer's real, unmodified `Avatar` or `Icon` lines up identically row
  after row. Rows are separated by the real, frozen `Separator` (composed
  directly at a quarter of its usual strength, `divider/40` — identical to
  Table's own body-row fade — never a custom div), the last item's
  trailing Separator hidden via a structural `:last-child` selector, never
  a JS index. `compact` (boolean) tightens row padding; `align`
  (`start` default/`center`) sets whether the leading slot aligns to the
  top or vertical center of the row — both pure layout, no business
  meaning. Composes ONLY Typography tokens, the shared `divider` token and
  whatever content a consumer places in its slots — no GlassSurface, no
  Card, no shadow, no gradient, no animation, no decorative element
  ActivityFeed draws itself. Proof `/dev/activity-feed` +
  `scripts/activity-feed-proof.mjs` (native `<ul>`/`<li>` structure, the
  frozen Separator between rows fading and disappearing after the last
  item, compact/comfortable rhythm, Avatar/Icon/Badge/Button/Code
  composing with zero adaptation, matching Avatar/Icon slot footprints,
  `tabular-nums` metadata, long content wrapping without truncation,
  always-vertical responsive behaviour, RTL, no fabricated live-region/
  unread/notification role, no-regression sweep across Timeline/Table/
  Accordion/Separator). Grep clean: zero GlassSurface/blur/backdrop-
  filter/rgba/shadow/transition/animation and zero hardcoded hex/px/ms
  outside doc-comment prose. Awaiting visual validation before any
  freeze.

- **Timeline — frozen (Data Display primitive).** Visually validated
  2026-07-10 after a Frozen Review (component, captures, Playwright proof,
  API, tokens, architecture, dependencies) found no objective defect — zero
  code changed since the Craft Review pass, the freeze locks it as-is. No
  functional, visual or architectural change again except an objective bug;
  the public API (`Timeline`'s `orientation`/`align`/`className`, each
  sub-part's `className` + native attributes) requires an ADR to change.

- **Timeline — Craft Review pass (Data Display primitive, still not
  frozen).** No new feature, variant or prop — visual finish only, ahead
  of freezing. (1) The connecting line faded from full-strength `divider`
  to a quarter of it (`divider/40`, the same fade the frozen Table already
  applies to its own body-row hairlines) — present enough to guide the eye
  down the events, faint enough to stop competing with them. (2) The plain
  `Timeline.Dot` shrank from a 10px, 2px-ringed circle to an 8px,
  hairline-ringed one (`h-2 w-2 border` instead of `h-2.5 w-2.5 border-2`)
  — a quiet mark, never the visual center of the row; the icon/Avatar-
  bearing Dot (`has-[>*]`) is untouched. Re-verified on screen: Avatar
  centers naturally on the now-faint line, icons still read as belonging
  to the Dot, and the horizontal orientation carries the exact same
  fade/scale so it still reads as "a Timeline turned 90°," never a Stepper
  or Progress bar. `scripts/timeline-proof.mjs` green, `pnpm type-check`/
  `lint`/`build` clean, grep clean. Still awaiting visual validation
  before any freeze.

- **Timeline — built to the full process, not frozen (Data Display
  primitive).** New compound API: `Timeline` / `Timeline.Item` /
  `Timeline.Separator` / `Timeline.Dot` / `Timeline.Content` /
  `Timeline.Title` / `Timeline.Description` / `Timeline.Time` — the same
  shape as MUI's own Timeline (Item/Separator/Dot/Content), the closest
  official precedent. Answers exactly ONE question: "in what order did
  these events happen?" Holds no business logic — no likes, comments,
  notifications, pagination, virtualization, real-time updates, filtering,
  grouping or sorting; every one of those belongs to a future, separate
  ActivityFeed, never to Timeline. Not ActivityFeed (Timeline's own future
  superset), not Stepper (a fixed, forward-looking task with a completed/
  current/pending state machine — Timeline has no "current" and is a
  read-only record of the past), not Progress (one continuous quantity, no
  discrete events), not Table (compares several ALIGNED properties across
  objects; Timeline has one axis, time), not List (arbitrary order vs
  chronology as the point), not Card (one object's detail vs a sequence),
  not TreeView (nested containment vs a flat sequence), not Calendar (a
  spatial grid you schedule INTO vs a linear read-only record), not Chart
  (an aggregated trend vs discrete legible events), not Accordion
  (independent disclosure sections, no chronological axis). `Timeline`
  renders a real `<ol>` of `Timeline.Item` `<li>`s — order is semantic. The
  connecting line is a plain 1px `divider` hairline (identical strength to
  the frozen Table's own row hairline), owned by the earlier event's own
  `Timeline.Separator` and drawn only after its Dot, toward the next one;
  the last item's trailing line is hidden via a structural `:last-child`
  CSS selector on the root, never a JS index. `Timeline.Dot` is a small
  outlined circle (`border-border`, matching the frozen Stepper's own
  pending-step ring) that grows only enough to fit an optional icon or
  Avatar child (CSS `has-[>*]`, zero extra prop). `Timeline.Time` uses
  `tabular-nums` (the same convention as Table's numeric cells). `orientation`
  (`vertical` default/`horizontal`) is a pure axis switch; `align`
  (`start` default/`end`) places `Timeline.Content` before or after the
  axis — both pure layout, RTL-aware via native logical flex-direction, no
  business meaning. Composes ONLY Typography tokens and the shared
  `divider`/`border` tokens — no GlassSurface, no Card, no shadow, no
  gradient, no animation. Proof `/dev/timeline` + `scripts/timeline-proof.mjs`
  (native `<ol>`/`<li>` structure, vertical/horizontal axis, the aria-hidden
  connecting line disappearing after the last item, Avatar/Badge/Icon
  composing into Dot/Content with zero adaptation, Dot growing for an icon
  child, `tabular-nums` on Time, Dense/Comfortable rhythm, long content
  wrapping without truncation, responsive, RTL, no-regression sweep across
  Table/Accordion/Collapsible/Separator). Grep clean: zero GlassSurface/
  blur/backdrop-filter/rgba/shadow/transition/animation and zero hardcoded
  hex/px/ms outside doc-comment prose. Awaiting visual validation before
  any freeze.

- **Table — frozen (Data Display primitive).** Visually validated 2026-07-10
  after a Frozen Review (component, captures, Playwright proof, tokens, API,
  dependencies) found no objective defect — zero code changed since the
  Craft Review pass, the freeze locks it as-is. No functional, visual or
  architectural change again except an objective bug; the public API
  (`Table`'s `stickyHeader`/`className`, each sub-part's `align`/
  `className` + native attributes) requires an ADR to change.

- **Table — Craft Review pass (Data Display primitive, still not frozen).**
  No new feature, variant or prop — visual hierarchy refinement only, ahead
  of freezing. (1) Header text weight `font-medium` → `font-semibold` (the
  same hierarchy weight Modal's title and Heading levels 1–3 already use)
  so the header reads immediately as column names, purely through
  contrast/weight — still `text-text-secondary`, no grey fill, no extra
  height. (2) The row-separator hairline moved off `Table.Row` (which now
  carries no border of its own) onto `Table.Header`/`Table.Body`: the
  header's own boundary stays full-strength `divider` (a clear top/bottom
  frame), while body rows fade to a quarter of that strength
  (`divider/40`) — the header/body distinction is now structural, and the
  body's internal rhythm barely registers, guiding the eye down the data
  instead of the grid. (3) `Table.Cell` gained `tabular-nums` so numeric/
  date columns share one fixed digit width, keeping them in vertical
  register for effortless comparison. (4) In the demo composition only,
  the Avatar–name gap opened from `gap-3` to `gap-4` (Avatar size and row
  height untouched). Re-verified: `scripts/table-proof.mjs` green (native
  semantics, RTL-aware alignment, sticky header, responsive scroll, mixed
  content, empty cells, long content), `pnpm type-check`/`lint`/`build`
  clean, grep clean. Still awaiting visual validation before any freeze.

- **Table — built to the full process, not frozen (Data Display primitive).**
  New compound API: `Table` / `Table.Header` / `Table.Body` / `Table.Footer` /
  `Table.Row` / `Table.Head` / `Table.Cell` / `Table.Caption`, composing
  DIRECTLY the native `table`/`thead`/`tbody`/`tfoot`/`tr`/`th`/`td`/`caption`
  elements — never a `<div>` reimplementing table semantics, so every native
  ARIA role and screen-reader table navigation behaviour is inherited for
  free. Answers exactly ONE question: "how do these several objects compare
  across several properties at once?" Holds no business logic and no
  interaction state — no pagination, sorting, filtering, editing, resizable
  columns, drag, selection, virtualization, infinite scroll, loading
  overlays, column menus or bulk actions; every one of those belongs to a
  future, separate DataGrid, never to Table. Not DataGrid (Table's own
  future superset), not List (a single sequence, no aligned multi-property
  columns), not Card (one object's full detail, doesn't scale to
  comparison), not TreeView (hierarchical containment, not flat peer
  comparison), not Timeline (a single chronological axis), not Chart
  (approximate visual trend vs exact discrete facts), not Accordion
  (progressive disclosure, not simultaneous comparison), not Tabs (switches
  a single view; Table shows every row/column at once), not Grid Layout
  (pure CSS arrangement, no semantic table role). The one necessary
  concession is a plain `overflow-x-auto` wrapper div (a `<table>` cannot
  scroll itself) carrying no border, background or padding of its own — on
  a narrow viewport the table scrolls horizontally and never breaks its
  columns or reflows into a stack of Cards. `stickyHeader` is purely visual
  (`position: sticky` + a background, threaded via a small React Context
  down to `Table.Header` — no scroll-tracking logic). `align`
  (`start`/`center`/`end`) is a logical, RTL-aware text alignment on
  `Table.Head`/`Table.Cell`, correctly rendering flush to the physical
  edge in both LTR and RTL. Styled with only Typography tokens and the
  `divider` colour token already shared with the frozen Separator: a
  discreet header (no heavy grey fill), one hairline rule per row, no
  vertical gridlines, no "spreadsheet" look. Proof `/dev/table` +
  `scripts/table-proof.mjs` (native semantics, caption, header/footer,
  numeric alignment in LTR and RTL, mixed content composing Avatar/Badge/
  Code with zero adaptation, long content wrapping, sticky header,
  responsive horizontal scroll, RTL, no-regression sweep across Accordion/
  Collapsible/Separator). Grep clean: zero GlassSurface/blur/backdrop-
  filter/rgba/shadow/transition/animation and zero hardcoded hex/px/ms
  outside doc-comment prose. Awaiting visual validation before any freeze.

- **Collapsible — frozen (Disclosure primitive).** Visually validated
  2026-07-09 after a Frozen Review found and fixed one genuine defect:
  `className` passed alongside `asChild` was silently dropped instead of
  merged onto the consumer's own custom trigger element via Radix's
  Slot — fixed by passing `className` through in the `asChild` branch
  too, verified by a new proof assertion. No other objective defect
  found. No functional, visual or architectural change again except an
  objective bug; the public API requires an ADR to change.

- **Accordion — frozen (Disclosure primitive).** Visually validated
  2026-07-09 after a craft pass (Trigger radius `rounded-md`→`rounded-sm`
  matching the DropdownMenu/Breadcrumb row precedent; focus ring
  `ring-accent`→`ring-accent-accessible` matching every other flat
  primitive; `data-[state=open]:rounded-b-none` so the open Trigger's
  hover/focus highlight flows into Content instead of reading as a
  disconnected pill) followed by a Frozen Review finding no further
  objective defect — the freeze locks it as-is. No functional, visual or
  architectural change again except an objective bug; the public API
  requires an ADR to change.

- **Separator — frozen (Layout primitive).** Visually validated 2026-07-09
  after a Frozen Review (component, dead code, unused imports/props/branches,
  captures, Playwright proof, API, tokens, dependencies) found no objective
  defect — zero code changed, the freeze locks it as-is. No functional,
  visual or architectural change again except an objective bug; the public
  API (`orientation`/`decorative`/`className`) requires an ADR to change.

- **Separator — built to the full process, not frozen (Layout primitive).**
  Took the pre-methodology component (previously bundled with Alert/Icon) —
  already Radix Separator with `orientation`/`decorative`/`className` and a
  `bg-divider` token — through the full analysis/build/proof process; the
  underlying logic is unchanged, only the doc-comment, demo and proof are
  new. Answers exactly ONE thing: "these two groups of content are visually
  distinct." Creates no spacing, no section, no surface, manages no layout —
  it only materializes a boundary; it can never carry children, a label or
  an icon. Not a bare `<hr>` (block-only, carries an implicit "thematic
  break" meaning per the HTML5 spec that misdescribes a UI-level divider,
  and ships default browser margin/border every consumer would reset by
  hand — Separator covers both orientations, zero margin by construction,
  the real WAI-ARIA Separator pattern). Not Divider (the name used
  elsewhere, e.g. Material Design 3 — DISCIPLINE names this after the
  ARIA/WAI-APG term its role implements). Not Border/Spacer/Card/Section/
  Stack/Grid/Heading (a CSS edge property, invisible space, a padded
  surface, a landmark with children, a gap-based arranger, pure column/row
  layout, and a typographic importance signal, respectively — none of them
  materialize a content-less visual boundary). Composes ONLY Radix
  Separator: `role="separator"` + `aria-orientation` when
  `decorative={false}`; `role="none"` (explicitly stripped, not merely
  omitted, per the APG's guidance for purely decorative dividers) when
  `decorative` is true, the default. No GlassSurface/Card/Badge/Button/
  Tooltip/Popover, no shadow/blur/gradient/glow, no transition or
  animation, no icon, no label or text, no children, no JS logic. API:
  `orientation` · `decorative` · `className` (+ native attributes) — no
  `color`/`variant`/`size`/`spacing`/`margin`/`padding`/`animated`/
  `gradient`/`icon`/`label`/`text`/`children`/`shadow`/`glass`. No
  production consumer existed beyond dev demos; zero other files modified.
  Proof `/dev/separator` + `scripts/separator-proof.mjs` (orientation, the
  decorative/semantic ARIA contract, zero content, rendering inside a real
  Card/Drawer/Modal, responsive width tracking, RTL, no-regression motion/
  interactivity sweep). Awaiting visual validation before any freeze.

- **Text — frozen (Typography primitive).** Visually validated 2026-07-09
  after a Frozen Review (component, captures, Playwright proof, API, tokens,
  dependencies) found no objective defect — zero code changed, the freeze
  locks it as-is. No functional, visual or architectural change again except
  an objective bug; the public API (`as`/`className`/`children`) requires an
  ADR to change.

- **Heading — frozen (Typography primitive).** Visually validated 2026-07-09
  after a Frozen Review (component, captures, Playwright proof, API, tokens,
  dependencies) found no objective defect — zero code changed, the freeze
  locks it as-is. No functional, visual or architectural change again except
  an objective bug; the public API (`level`/`as`/`className`/`children`)
  requires an ADR to change.

- **Text — built to the full process, not frozen (Typography primitive).**
  Rebuilt the pre-methodology
  `<Text size="body-lg"|"body"|"body-sm"|"caption" tone="default"|"secondary"|"tertiary" weight="regular"|"medium"|"semibold">`
  (previously bundled with Alert/Icon/Separator) to the full analysis/build/
  proof process. Answers exactly ONE thing: "this is textual content" — never
  a title, an action, a property, a technical value, a field name or a
  navigation position. Not a bare `<span>` (no relationship to DISCIPLINE's
  type tokens — every consumer would hand-roll its own font-size/color and
  drift as tokens evolve), not Heading (a structural, one-per-title outline
  role; Text is the un-numbered body that follows), not Label/Code/Badge
  (different axes — naming a field, a verbatim value, a property), not
  Paragraph (`<Text as="p">`, the default, already covers it), not Caption (a
  smaller, secondary annotation Text does not claim — a future sibling), not
  Link/Button (interactive), not HelperText (a Forms concern tied to a field
  via `aria-describedby`). **API change (rebuild): `size`/`tone`/`weight` are
  removed entirely** — Text renders the one canonical body style
  (`text-body text-text`) from tokens; a consumer needing a different token
  combination reaches for `className`, exactly like every other DISCIPLINE
  primitive. `as` selects the semantic tag only — `p` (default) · `span` ·
  `div` · `strong` · `em` · `small` — never the visual style (verified: every
  tag carries the identical computed font-size as the default paragraph).
  Zero margin, zero padding of its own (verified: `0px` on every side).
  **Consumer migration (large):** ~65 call sites across 23 files migrated
  from `size=`/`tone=`/`weight=` to `className` — including the THREE FROZEN
  Feedback banners (`SuccessBanner`/`ErrorBanner`/`WarningBanner`) and the
  three frozen state primitives (`EmptyState`/`ErrorState`/`OfflineState`),
  whose internal `sizeConfig` fields were retyped from bare token names to
  literal Tailwind classes (e.g. `'body-sm'` → `'text-body-sm'`) — a pure
  internal migration, zero visual/behavioural change to any of the six
  frozen components, verified against fresh full-page screenshots showing no
  regression. Proof `/dev/text` + `scripts/text-proof.mjs` (real p/span/
  strong/em/small tags with identical font-size, zero margin/padding,
  long-paragraph wrap, rendering inside a real Card/Drawer/Modal, Text/Code
  size parity, responsive stability, RTL, and a no-regression spot check
  across all six frozen consumers). Awaiting visual validation before any
  freeze.

- **Heading — rebuilt to the full process, not frozen (Typography primitive).**
  Rebuilt the pre-methodology `<Heading level="h1"..."h5"|"display-1"..."display-3">`
  (previously bundled with Alert/Icon/Separator/Text) to the full analysis/
  build/proof process. Answers exactly ONE thing: "this information is a
  title" — never a layout, a section, a business hierarchy, a navigation
  position or an action. Not a bigger Text (Text has no place in the document
  outline; erasing a title into styled prose is a semantic loss, not a size
  one), not Label/Code/Badge/Button (different axes entirely — naming a
  field, a verbatim value, a property, an action), not CardHeader/PageHeader
  (layout composites that USE a Heading), not Hero (a marketing layout
  section with background/CTA decisions Invariant A1 forbids a base
  component from making), not "Title" (ambiguous elsewhere; DISCIPLINE names
  the primitive Heading), not Caption (outside the heading hierarchy). **API
  change (rebuild): `level` changed from a string enum to a NUMBER 1–6**
  (`<Heading level={2}>`), decoupled from `as` (the semantic tag) exactly as
  Primer's `Heading` and Atlassian's `@atlaskit/heading` both do —
  `<Heading as="div" level={2}>` keeps the h2 visual size while opting out of
  heading semantics entirely. `display-1/2/3` are dropped from Heading's own
  scope (a Hero-scale display role is not a document heading). **A reported,
  not silently patched, conflict:** DISCIPLINE's canonical type scale defines
  only five heading sizes — there is no `--ds-text-h6` token, and the frozen
  visual identity forbids inventing one outside a strictly-necessary UX fix.
  Resolution: `level={6}` renders a real `<h6>` (correct semantic outline)
  reusing `h5`'s visual size, matching how Material Design 3 and Carbon do
  not keep inventing an ever-smaller step per level. Zero internal margin,
  ever — spacing is always the consumer's layout decision. **Consumer
  migration:** ~48 call sites across 23 dev-demo files migrated
  `level="hN"` → `level={N}`; the three frozen state primitives (EmptyState/
  ErrorState/OfflineState) had their internal `title: 'h5'|'h4'|'h3'` config
  field retyped to `title: 5|4|3` — a pure internal-type change, zero
  visual/behavioural change, all three still compile and their own frozen
  public APIs are untouched. Proof `/dev/heading` + `scripts/heading-proof.mjs`
  (real h1–h6 tags, strictly-decreasing scale, h6→h5 size reuse, level/as
  decoupling, zero margin, long-heading wrap, correct rendering inside a
  real Card/Drawer/Modal, responsive tag stability, RTL, no-regression spot
  check). Awaiting visual validation before any freeze.

- **Code — rebuilt to the full process, not frozen (Data Display primitive).**
  Rebuilt the pre-methodology `<Code variant="inline"|"block">` to the full
  analysis/build/proof process. A Data Display primitive for exactly ONE
  thing: "this run of text is a technical value, not prose" (a command, a
  variable, an endpoint, an HTTP method, a CSS token, a shortcut) — rendered
  verbatim, monospace, character-for-character. Not Text/Heading (proportional
  prose, no `<code>` semantics), not Badge (a property ATTACHED to a datum —
  Code IS the value, no colour-coded meaning, no surface), not Label (names a
  form field), not Link/Button (interactive), not Tooltip (transient), not a
  dedicated Keyboard-Shortcut/Kbd primitive (per the HTML spec `<code>` is "a
  fragment of computer code" and `<kbd>` is "user input" — two semantics;
  Code defaults to `<code>` and exposes `asChild` so a caller renders the
  identical material on a real `<kbd>` instead), not CodeBlock/Terminal/
  Monaco/CodeMirror (multi-line, scrollable, often syntax-highlighted
  SURFACES — a different, larger responsibility; a CodeBlock is a legitimate
  future sibling, never a mode of this component), not Markdown (a renderer
  that may itself use Code for its own inline spans). **API change (rebuild):**
  the `variant` prop (`inline`/`block`) is removed entirely — Code is always
  one line, never a `<pre>` wrapper; `asChild` (Radix Slot) replaces it as the
  only escape hatch. Sets no font-size of its own (kept at the browser default
  `font-size: inherit`), so it always matches whatever text context it sits
  inside — no `size`/`variant`/`color`/`weight` prop. Composes ONLY Typography
  tokens: a low-radius (`rounded-xs`), neutral (`bg-surface`) background and
  `font-mono` — no GlassSurface/Card/Badge/Tooltip/Popover/Dropdown/Button/
  Link, no hover/active/focus styling, no transition/animation, no icon, no
  copy button, no syntax highlighting, no language selector. Non-interactive:
  no role, not in the tab order, never a link. Long values wrap inside their
  container via `break-words` — never overflow, never truncate. The sole
  consumer using the dropped `variant="block"` (the generic dev components
  gallery, `showcase.tsx` — not a tracked/frozen component) had that example
  removed; the other consumers (`drawer-demo.tsx`'s `<Code>RPE 8</Code>`,
  `showcase.tsx`'s inline example) were already on the preserved default and
  are unaffected. Proof `/dev/code` + `scripts/code-proof.mjs` (basic,
  monospace + neutral background + non-interactive, font-size inheritance
  across three ambient sizes, `asChild` → real `<kbd>` with the identical
  material, HTTP methods as separate elements, long-value wrap with no
  overflow, responsive size inheritance, RTL). Awaiting visual validation
  before any freeze.

- **Label — polish pass, not frozen (no API/variant/behaviour change).** A
  pre-freeze craft pass, purely visual + test-hardening. (1) Slightly
  strengthened the label's presence with a hair of positive letter-spacing
  (`tracking-[0.01em]`) — a crisp form-label identity so it registers before its
  field — without changing its size, weight or colour (all already at their
  maximum useful value). (2) Bumped the required marker one step more legible,
  from `text-text-tertiary` to `text-text-secondary` — identifiable at a glance
  yet still secondary to the text, still neutral (never red), never animated.
  (3) Hardened the disabled demo + proof to prove a REAL accessibility relation:
  the `<label>` references, via `htmlFor`, a control that is genuinely `disabled`
  (asserted `control.disabled === true` and non-interactive), not merely lighter
  text. No new API, variant or behaviour; the icon rejection stands.

- **Label — built to the full process, not frozen (Forms accessibility
  primitive).** Took the pre-methodology Label to the full analysis/build/proof
  process and fixed two objective defects. A Forms ACCESSIBILITY primitive (not
  a presentation one): it answers only "what is the name of this field?" via a
  real `<label>` bound with `htmlFor` — never validates, shows an error/helper,
  manages state, or knows the value. **Fix 1: the required marker is no longer
  red** — red signalled an error before any error existed; it is now a discreet,
  token-driven `text-text-tertiary`, still `aria-hidden` (the required semantics
  live on the control, not the asterisk). **Fix 2: a real `disabled` prop** now
  reflects the control's disabled state (dimmed, cursor not-allowed, never
  invisible), alongside the kept `peer-disabled` support. Plain inline layout so
  long/multiline labels wrap naturally (no strange truncation) and the marker
  stays attached under `dir="rtl"`. The Icon variant is deliberately rejected
  (documented). API unchanged in spirit — `htmlFor` · `required` · `disabled`
  (new) · `className` · `children`; no sub-components, no domain props. The
  required-asterisk colour change applies across the ~28 Input-family consumers
  (all still compile). Proof `/dev/label` + `scripts/label-proof.mjs` (real
  `<label>`, htmlFor binding + click-to-focus + accessible name, non-red
  aria-hidden marker, disabled dim, long/multiline wrap, responsive, RTL).
  Awaiting visual validation before any freeze.

- **Avatar — frozen (compound Data Display primitive).** Visually validated
  2026-07-08 after a Frozen-review pass: no dead code, no duplication, no
  unused imports/props, no redundant logic, and no token/size/spacing/radius/
  fallback inconsistency — the component was already clean, so the freeze locks
  it unchanged (no code modified). Confirmed: the strict fallback (image →
  initials → user icon) holds, a broken image falls back automatically,
  initials never exceed two letters, groups and the `+N` overflow stay correct,
  sizes are monotone, shapes are coherent, responsive changes size only, and
  RTL is correct. It answers only "who is this object?" and holds no domain
  logic. No functional, visual or architectural change again except an
  objective bug; the public API (`Avatar` / `Avatar.Image` / `Avatar.Fallback`
  / `Avatar.Group`, plus `getInitials`) requires an ADR to change.

- **Avatar — rebuilt to a compound Data Display primitive.**
  Rebuilt the pre-methodology single-element `<Avatar name src size/>` into the
  proper compound (`Avatar` · `Avatar.Image` · `Avatar.Fallback` ·
  `Avatar.Group`) to the full analysis/build/proof process. A foundational Data
  Display primitive answering only "who is this object?" — no domain knowledge
  (it does not know DISCIPLINE, a client, a coach, an AI or a guide). It
  reserves a surface, shows a cropped image, and GUARANTEES a strict fallback
  (image → initials → generic user icon), so it is never empty. Strictly
  forbidden here (they belong to higher-level components): online presence,
  notification/AI badges, halo, pulse, launcher behaviour, integrated
  tooltip/menu, animation, coach/guide/chatbot. Composes only Avatar (Radix),
  Icon and Typography — no glass/floating/overlay. Sizes xs/sm/md/lg/xl are one
  monotonic token scale (24·32·40·48·64px); shapes circle/rounded/square; the
  shape never changes responsively, only the size. `Avatar.Group` is
  composition-only: RTL-correct overlap via a negative logical margin, a token
  ring, and a calm `+N` overflow chip. Exports `getInitials(name)` (≤2 upper
  letters). **API change (rebuild):** `<Avatar size shape className children>` +
  `<Avatar.Image>` / `<Avatar.Fallback>` / `<Avatar.Group max spacing>` — no
  domain props. Consumers on the old `<Avatar name src size/>` (AvatarLauncher +
  the command-palette/showcase/navbar/hover-card demos) were migrated to the
  compound form. Proof `/dev/avatar` + `scripts/avatar-proof.mjs` (image render,
  automatic fallback, initials, icon fallback, sizes, shapes, group overlap,
  overflow, responsive-size-only, RTL). Awaiting visual validation before any
  freeze.

### Added

- **Collapsible — built, not frozen (Disclosure primitive).** The
  Disclosure atom the frozen Accordion is literally built from: one region,
  one open/closed state, no group logic, no exclusivity, no coordination.
  Answers exactly ONE thing: "do I want to hide or reveal THIS region of
  content?" Not Accordion (a GROUP of Collapsibles with coordinated
  exclusivity and shared keyboard nav, each trigger wrapped in a heading;
  Collapsible is the atom, no siblings, no heading wrapper), not Tabs
  (switches between named views; Collapsible's one region is present or
  absent, no alternative shown in its place), not TreeView (hierarchical
  data with selection), not Drawer/BottomSheet (overlay, portaled,
  scrimmed; Collapsible stays in the page's own flow), not Dialog
  (blocking), not Popover (anchored, dismissed on outside-click;
  Collapsible has no positioning logic), not Tooltip (hover-triggered,
  transient), not NavigationMenu (leads to a different destination). A
  real compound (`Collapsible`/`Collapsible.Trigger`/`Collapsible.Content`)
  composing `@radix-ui/react-collapsible@1.1.16` (new pinned dependency)
  directly — no wrapper. Trigger shares the exact row material already
  established by the frozen Accordion (radius, hover/focus tokens, chevron
  transition, the `data-[state=open]:rounded-b-none` continuity fix) so the
  atom and the group it forms read as one material — but is NOT wrapped in
  a heading, verified. `asChild` lets a consumer's own element become the
  trigger verbatim, with no default chevron/className imposed, verified.
  Content draws no card/surface and never constrains height (no fixed
  height, no internal scroll, verified). 100% of Radix's ARIA/keyboard
  (Tab/Enter/Space)/focus behaviour kept as-is. Proof `/dev/collapsible` +
  `scripts/collapsible-proof.mjs` (controlled/uncontrolled/defaultOpen/
  disabled state machine, forceMount DOM presence, long-content height,
  nested independence, chevron rotation timing, the asChild verbatim-
  trigger contract, RTL, full keyboard, ARIA, no-regression spot check
  against the frozen Accordion). Awaiting visual validation before any
  freeze.

- **Accordion — craft pass, pre-freeze (no new feature/variant/prop).**
  Fixed three objective inconsistencies found in a Craft Review. The
  Trigger's hover/focus radius was `rounded-md` on a full-width row —
  every other row-shaped interactive element in the library (DropdownMenu
  item, Breadcrumb link) uses `rounded-sm` for this shape; switched to
  match. The focus ring used `ring-accent` while every other flat
  primitive (Tabs, Breadcrumb, Pagination, Stepper, BottomNav,
  SearchInput) uses `ring-accent-accessible`; switched to match. A genuine
  continuity defect: the Trigger kept all four rounded corners even when
  open, so its hover/focus highlight rendered as a pill floating above the
  flat Content below — fixed with `data-[state=open]:rounded-b-none`,
  verified via a hover screenshot showing one continuous block. Full proof
  re-run green.

- **Accordion — built, not frozen (Disclosure primitive).** The first
  component in a new Disclosure category. Answers exactly ONE thing: "what
  additional content can I reveal?" — never "where am I" (Navigation), "what
  happened" (Feedback), "what's on top" (Overlay), "what is this value"
  (Data Display) or "what do I submit" (Form). Not Collapsible (a single
  togglable section with no relationship to siblings; Accordion is a GROUP
  of Collapsibles with coordinated behaviour), not Tabs (SWITCHES the
  visible region, inactive panels vanish entirely; Accordion reveals
  ADDITIONAL content in place, every trigger stays visible), not TreeView
  (hierarchical data with selection; Accordion discloses independent content
  sections), not Drawer/Sheet/BottomSheet (overlay surfaces: portaled,
  scrimmed, dismissible; Accordion has none of that — a permanent part of
  the page), not Popover/Tooltip (transient, anchored), not Dialog
  (blocking modal), not NavigationMenu (leads to different destinations;
  Accordion reveals content inline on the current page). A real compound
  (`Accordion`/`Accordion.Item`/`Accordion.Trigger`/`Accordion.Content`)
  composing `@radix-ui/react-accordion@1.2.16` (new pinned dependency)
  directly — no wrapper, no `AccordionCard`/`AccordionPanel`/
  `DisclosureCard`/`ExpandableCard`/`AccordionContainer`. `Trigger`
  internally pairs Radix's `Header` with its `Trigger` (an implementation
  detail, never a separate public API piece). `Item` decides no border,
  background or spacing of its own (Invariant A1 — a divided list is
  composed with the frozen `Separator` at the point of use). `Content` draws
  no card and no new surface — content appears directly under the Trigger,
  never a `GlassSurface`, and never constrains height (no fixed height, no
  internal scroll — long content grows the page naturally). The chevron
  rotates a flat 180° with the same calm, instant transition already used by
  the frozen Select/DropdownMenu — no bounce, no spring. 100% of Radix's
  ARIA/keyboard (Arrow/Home/End/Enter/Space)/focus/RTL behaviour kept as-is,
  no custom behaviour layered on top. Proof `/dev/accordion` +
  `scripts/accordion-proof.mjs` (single/multiple/collapsible state machine,
  controlled/uncontrolled, disabled item/group, long-content height, nested
  independence, chevron rotation timing, RTL, full keyboard, ARIA, and a
  no-regression spot check). Awaiting visual validation before any freeze.

- **AvatarLauncher — built, not frozen (Avatar module, Sprint 1).** The single,
  calm entry point to the DISCIPLINE Guide — the first brick of the Avatar
  module (`src/components/avatar/`), not the Design System. It is the door, not
  the room: it opens nothing itself (no Drawer, no conversation, no AI) — only
  the persistent presence a member reaches for. Deliberately NOT a Floating
  Action Button (a per-screen primary action), NOT a bare IconButton (no
  identity or product states), NOT a Speed Dial (one entry point, not a fan),
  NOT a Help/Support button (not a utility or incident channel), NOT a Chat
  Launcher / Assistant Bubble / Notification FAB (it refuses the Messenger
  bubble, the alarm count and attention animations). Composes ONLY frozen
  primitives — IconButton (its glass), Icon (a compass = orient/guide, never a
  chat bubble), Spinner (loading), Badge (discreet neutral unread), Avatar (the
  coach's presence), Tooltip (a calm hint) — and creates no new material,
  surface or animation. State model: a single `state`
  (idle/loading/active/coach/unavailable) + `unread` + native `disabled`;
  hover/press/focus are native; "waiting" is a discreet unread Badge, never a
  colour-only dot. One considered size (a launcher stays a consistent
  thumb-target everywhere — responsiveness is placement, not shrinking), full
  keyboard + ARIA (`aria-haspopup="dialog"`, `aria-expanded`, `aria-busy`,
  descriptive accessible name), and RTL-correct corner markers via logical
  inset. API: `state` · `unread` · `coach` · `label` · `className` (+ native
  button attributes). Proof `/dev/avatar-launcher` +
  `scripts/avatar-launcher-proof.mjs` (every state, keyboard activation +
  no-trap, ARIA, touch target on desktop/mobile, RTL). Awaiting visual
  validation before any freeze.

### Changed

- **DISCIPLINE visual identity — officially FROZEN.** This version becomes the
  visual reference of DISCIPLINE. The art direction, palette, typography, global
  spacing, existing components, card style, animations and visual identity are
  locked — no change except one strictly necessary to fix a real UX problem. The
  project now enters a product-development phase: the goal is no longer to make
  the interface more beautiful, but to make the product smarter. First feature:
  the DISCIPLINE Avatar (product/UX/interaction spec in
  `docs/DISCIPLINE_AVATAR_EXPERIENCE.md`).

- **Badge — frozen (Data Display primitive).** Visually validated 2026-07-08
  after the rebuild + Liquid-Glass craft pass + simplification pass; the palette
  (neutral/success/warning/error), the always-pill geometry, the two sizes and
  the `.ds-badge` material are locked. No functional, visual or architectural
  change again except an objective bug; the public API (`variant`/`appearance`/
  `size`/`icon`/`className`) requires an ADR to change.

- **Badge — simplification pass (Data Display primitive).** A
  final craft pass dedicated to design-system coherence: fewer variants, fewer
  colours, a stronger identity. The palette is reduced to the four TRUE
  semantic colours — neutral, success, warning, error (`info` dropped);
  business properties (Coach, Premium, Draft, Hypertrophy…) now all wear the
  neutral glass, their meaning carried by the word, so a screen of badges reads
  as one restrained material rather than a swatch board. The `solid` fills were
  deepened and desaturated (near-black neutral, deep forest, deep amber, deep
  oxblood — Apple/Linear/GitHub, never Bootstrap). The `shape` prop was removed
  — the Badge is ALWAYS a pill (DISCIPLINE's natural micro-geometry); identity
  over API surface. Sizes were cut to two (`sm`/`md`, covering 99% of usages).
  The icon is ~1px larger for presence while the text stays dominant. The demo
  page was pruned to only behaviourally-distinct sections. **API reduced (this
  is the intentional simplification, not a break):** `variant`
  neutral/success/warning/error · `appearance` soft/solid/outline · `size`
  sm/md · `icon` · `className` — `info`, `shape`, and the `xs`/`lg` sizes are
  gone. The one demo consumer on the dropped `variant="info"` (the
  `/dev/components` gallery) was migrated to neutral; no other consumer used
  the removed surface. Responsibilities, composition, accessibility, logic and
  the non-interactive contract are unchanged. Proof re-run green (34 badges
  verified non-interactive; variants/appearances/sizes/always-pill/RTL pass).
  Awaiting visual validation before any freeze.

- **Badge — Liquid-Glass craft pass, not frozen (Data Display primitive).**
  A complete visual refonte so the Badge reads as a micro-fragment of
  DISCIPLINE's Liquid Glass — cut from the same material as the Drawers /
  Banners — rather than a Tailwind/Bootstrap/shadcn pill. The material was
  moved out of the component into a dedicated `.ds-badge` class in the new
  `src/styles/badge.css` (the Construction rule, exactly like `.ds-glass` and
  `.ds-micro`): a translucent, faintly-lit glass surface with a hairline
  machined edge (inset top highlight + lower inner wall + a barely-there
  contact shadow) and a light backdrop `blur(5px) saturate(1.3)`. The colour is
  now carried mostly by the text/icon and a whisper of tint, never an
  aggressive fill: `soft` (default) keeps the surface near-neutral; `outline`
  is the bare translucent glass with a coloured hairline; `solid` is the single
  strong voice — a deep, confident fill (near-black neutral, deep red error;
  GitHub/Linear/Apple). The semantic palette is desaturated; `info` is the
  restrained DISCIPLINE primary. Geometry now breathes (taller box, more
  horizontal padding), the type is `font-semibold` for presence, and `rounded`
  is a crisp 8px (no more "candy" 20px). **The public API, props, logic,
  behaviour, accessibility and variants are unchanged** — this is purely the
  visual language. The component only carries `.ds-badge` + `data-variant` +
  `data-appearance` and stays grep-clean (no glass/blur/shadow/rgba in the
  `.tsx`; all in `badge.css`). Proof re-run green (54 badges verified
  non-interactive; appearances/sizes/shapes/RTL all pass). Awaiting visual
  validation before any freeze.

- **Badge — rebuilt to the full process, not frozen (Data Display
  primitive).** Rebuilt from a pre-methodology implementation (previously
  undocumented, bundled with Alert/Avatar/Code/…) to the full analysis/build/
  proof process. A small, static property attached to a datum (Active,
  Premium, Draft, a role, a priority, a count). Purely informative, NEVER
  interactive, never alone. Deliberately NOT a Chip (interactive/removable),
  NOT a Tag (input), NOT a Pill (a shape), NOT a Label (a form caption), NOT a
  StatusDot (no text — Badge always labels, color is never alone), NOT a
  Counter/Notification badge (a floating overlay), NOT an Avatar/Button/Tabs/
  Stepper/Progress. Built only from color + typography tokens; three orthogonal
  token-driven axes — `variant` (neutral/success/warning/error/info),
  `appearance` (soft/solid/outline), `shape` (rounded/pill/square) — plus
  `size` (xs/sm/md/lg) and an optional `icon`. Entirely static: no glass, no
  shadow, no transition/animation, no role, no tabindex, not focusable (a
  `<span>` that must never be made clickable; verified across 54 badges). The
  icon sits before the label and flips under `dir="rtl"` via flex. **API
  change (rebuild):** the pre-methodology `variant` set (`default`/`accent`/
  success/warning/error/info) + `size` (sm/md) + `leadingIcon` becomes
  `variant` (neutral/success/warning/error/info) + `appearance` + `size`
  (xs/sm/md/lg) + `shape` + `icon`. The only consumer on the dropped surface —
  the `/dev/components` gallery's `variant="accent"` — was migrated to `info`
  (same `#6c5ce7` token); all other consumers already used only the preserved
  surface and are unaffected. Proof `/dev/badge` + `scripts/badge-proof.mjs`
  (rendering, variants, appearances, sizes, shapes, icon presence, the
  non-interactive contract, size-stability, RTL). Awaiting visual validation
  before any freeze.

- **ErrorBanner — frozen (Feedback primitive that owns its surface).**
  Visually validated 2026-07-08; Frozen-review pass found no dead code, no
  unused imports/props, no internal duplication, and no arbitrary style —
  token-clean from the build, so the freeze locks it unchanged. The third
  sibling of the Feedback banner family (SuccessBanner + WarningBanner, both
  frozen). A PERSISTENT, IN-FLOW, NON-MODAL error: an important failure about
  the current context, surfaced in the flow, that does NOT warrant a modal
  interruption (couldn't publish, payment declined, sync failed, import
  interrupted, save failed, quota exceeded). Like its banner siblings it OWNS
  its surface, built ONLY from error tokens; `role="alert"` (assertive) — the
  appropriate role for a persistent, non-modal error, completing the three-tier
  semantic (Success/Warning polite `role="status"` → Error assertive
  `role="alert"`). No functional, visual or architectural change again except
  an objective bug; the public API (`title`/`description`/`icon`/`action`/
  `dismissible`/`onDismiss`/`size`/`align`/`className`) is locked — any future
  change requires an ADR.

- **WarningBanner — frozen (Feedback primitive that owns its surface).**
  Visually validated 2026-07-08; Frozen-review pass found no dead code, no
  unused imports/props, no internal duplication, and no arbitrary style —
  token-clean from the build, so the freeze locks it unchanged. The frozen
  SuccessBanner's sibling — same Feedback family, same in-flow banner
  behavior, opposite polarity. A PERSISTENT, IN-FLOW warning: a situation that
  needs the user's ATTENTION without immediately blocking their work
  (subscription about to expire, incomplete profile, storage almost full,
  payment renewing soon, unpublished program, partially synced data). Like the
  content-only states it OWNS nothing extra — but unlike them it OWNS its
  surface, built ONLY from warning tokens; `role="status"` (polite,
  non-blocking). No functional, visual or architectural change again except an
  objective bug; the public API (`title`/`description`/`icon`/`action`/
  `dismissible`/`onDismiss`/`size`/`align`/`className`) is locked — any future
  change requires an ADR.

- **SuccessBanner — frozen (Feedback primitive that owns its surface).**
  Visually validated 2026-07-08; Frozen-review pass found no dead code, no
  unused imports/props, no internal duplication, and no arbitrary style — the
  component was token-clean from the build, so the freeze locks it unchanged.
  A PERSISTENT, IN-FLOW confirmation that an operation the user just took
  SUCCEEDED and deserves to stay visible (program published, session saved,
  client created, payment confirmed, profile updated) — it pushes surrounding
  content and persists until dismissed or the state changes. Unlike the
  content-only states, it OWNS its surface, built ONLY from success tokens.
  No functional, visual or architectural change again except an objective
  bug; the public API (`title`/`description`/`icon`/`action`/`dismissible`/
  `onDismiss`/`size`/`align`/`className`) is locked — any future change
  requires an ADR.

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
