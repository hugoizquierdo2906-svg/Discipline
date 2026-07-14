# PROJECT STATE

> Living record of build progress against `DISCIPLINE_BUILD_PLAN.md`.
> Updated at the close of each phase.

**Last updated:** 2026-07-14
**Current phase:** **VISUAL IDENTITY OFFICIALLY FROZEN (2026-07-08).** This version is the visual reference of DISCIPLINE — art direction, palette, typography, global spacing, existing components, card style, animations and identity are locked (change only for a strictly necessary UX fix). We now enter **product development**: the goal is no longer a more beautiful interface, but a smarter product. First feature: the **DISCIPLINE Avatar** — product/UX/interaction specification in `docs/DISCIPLINE_AVATAR_EXPERIENCE.md` (design-only, no code).
**Next phase:** build the Avatar experience from its specification, feature by feature. **Carousel (Data Display) FROZEN (2026-07-14)** — a full Frozen Review (component re-read end to end, all variants, demo, captures and Playwright proof; API/responsibilities/accessibility/performance; coherence with Card/Drawer/Modal/FullscreenOverlay/GlassCard; composition with Avatar/Badge/Heading/Button; responsive/RTL/animations/scroll-snap/keyboard/indicators/previews/Hero/Loop/Vertical) found **no objective defect** — zero primitive code changed, frozen as-is. Public API (`Carousel` `orientation`/`loop`/`align`/`className`; `Carousel.Content`/`Carousel.Item` `className`; `Carousel.Previous`/`Carousel.Next` IconButton props; `Carousel.Indicators` `className`; plus the `data-active` styling hook on the active `Carousel.Item`) now requires an ADR to change. Validation green at freeze: type-check, lint, build (75/75), proof, grep clean, fresh desktop/tablet/mobile/RTL captures. Built history: a compound (`Carousel`/`Carousel.Content`/`Carousel.Item`/`Carousel.Previous`/`Carousel.Next`/`Carousel.Indicators`) answering only "how do I browse sequentially through a series of items?" — no lightbox, zoom, fullscreen, autoplay, infinite/virtualized scroll, drag or business logic; all of that belongs to a higher composing component. Built on a NATIVE CSS scroll-snap track (no carousel-engine dependency): stepping calls the browser's `scrollIntoView`, honouring `scroll-behavior: smooth` and degrading to instant under `prefers-reduced-motion`. RTL-native (logical `scroll-snap-align`, mirrored Arrow keys). Active index read from geometry (nearest-centre item), never a prop. `Carousel.Previous`/`Next` compose the frozen IconButton and disable at the ends unless `loop` (like the frozen Pagination); `Carousel.Indicators` renders position dots with the active one gently elongated (token-driven `duration-standard`/`ease-out`). **Craft Review pass (2026-07-14, still not frozen):** the visual finish was elevated toward an Apple/Linear reading experience with the API, responsibilities, accessibility and performance all unchanged — the primitive gained only a pure CSS hook (`Carousel.Content` surfaces its active index as `data-active` on the current `Carousel.Item`, the Radix `data-state` idiom; no new prop) and the indicators were redesigned from dots into a thin segmented progress bar (active segment widens + takes the single accent). All the premium composition (one dominant card, dimmed/scaled/blurred side previews as "next chapters," staggered content reveal, floating controls, generous air) lives in the DEMO on top of the unchanged primitive, because focus/peek/choreography in a generic primitive would violate Invariant A1. **Editorial Review pass (2026-07-14, still not frozen):** a pre-freeze finishing pass with no new feature/API/responsibility/a11y/perf change — the one objective improvement was moving the demo's Prev/Next controls from the `secondary` IconButton (bordered, filled at rest) to the frozen `ghost` variant with a quiet `text-text-secondary` chevron, so they carry no material at rest and lift it only on hover (floating tools that all but disappear until needed, never competing with the single red content accent); pure demo composition, primitive untouched. Also hardened the proof's indicator-elongation assertion (it could measure the active segment mid-width-morph; the settle wait now clears the smooth-scroll + width transition). **Final Editorial Review pass (2026-07-14) — declared freeze-ready, still not frozen:** the one objective improvement was deepening the demo's peek recession (`scale-[0.94] opacity-40` → `scale-[0.9] opacity-30`, blur unchanged) so a neighbour reads as a distinct back plane ("the next chapter, waiting") rather than a card cut off at the edge; making the controls disappear further (opacity-0 until hover) was declined as a touch-discoverability a11y regression, and the card border/shadow belong to the frozen GlassCard (out of scope). **Mobile Hero density fix (2026-07-14, still not frozen):** the design system's `sm` breakpoint is 390px (not 640), so phones were already inside `sm:` and got the roomy desktop treatment (`sm:p-10` + equal-height `sm:items-stretch`), which stretched every Hero card to the tallest sibling and floated the CTA; the fix makes the compact treatment the unprefixed base and moves the roomy keynote layout to `md:` (768+), so the active mobile card drops 766→654px and the CTA hugs its content while tablet (528px)/desktop (546px) stay pixel-identical. Full WAI-ARIA Carousel pattern (`aria-roledescription` carousel/slide, `aria-live` track, `aria-controls`, "N of M" labels, Arrow/Home/End keyboard). Props: `orientation`/`loop`/`align` only; item sizing stays the consumer's decision (Invariant A1). Proof `/dev/carousel` + `scripts/carousel-proof.mjs` green (ARIA, native snap, stepping, indicators, non-loop disable, loop wrap, vertical, keyboard, responsive, RTL, no-regression sweep). Grep clean. Awaiting visual validation before any freeze. **DataGrid (Data Display) FROZEN (2026-07-10)** — a Frozen Review found and fixed one genuine objective defect: a sortable `DataGrid.Column` with `align="center"`/`"end"` did not actually align its header (the label span was always `flex-1`, making `justify-center` inert and `flex-row-reverse` mis-order the label; only `start` rendered correctly). Fixed by growing the label only for `start` (validated look unchanged) and grouping label+chevron via RTL-aware `justify-center`/`justify-end` for center/end; `flex-row-reverse` removed. Covered by a new `align="end"` sortable demo column + proof assertion. Public API (`DataGrid` `className`; `DataGrid.Column` `align`/`sortable`/`sortDirection`/`onSort`/`className`; `DataGrid.Empty` `colSpan`/`className`; re-exported Table/Pagination parts) now requires an ADR to change. **DataGrid (Data Display) built to the full process, not frozen (2026-07-10)** — a compound (`DataGrid`/`DataGrid.Toolbar`/`DataGrid.Header`/`DataGrid.Body`/`DataGrid.Row`/`DataGrid.Cell`/`DataGrid.Column`/`DataGrid.Footer`/`DataGrid.Empty`/`DataGrid.Pagination`) answering only "how do I manipulate a large set of comparable data?" — built by composing the frozen Table directly (`DataGrid.Header`/`Body`/`Row`/`Cell`/`Footer` ARE `Table.Header`/`Body`/`Row`/`Cell`/`Footer`, re-exported not reimplemented). No APIs, backends, SQL, permissions, business rules, lazy loading or import/export — sort direction, selected rows and the current page are all controlled state the CONSUMER owns; DataGrid only renders the affordance. `DataGrid.Column`'s `sortable` adds a clickable header + `aria-sort`, never the comparator itself. `DataGrid.Empty` wraps the frozen EmptyState in a valid tr/td. `DataGrid.Pagination` is the real, frozen Pagination composed directly. `role="grid"` on the underlying Table is the only ARIA Grid wiring needed — implicit gridcell/row/columnheader roles cascade from real HTML semantics. Proof `/dev/data-grid` + `scripts/datagrid-proof.mjs` green (ARIA Grid roles, selection, sorting with real row re-order, real Pagination page changes, Toolbar filtering, Empty/Loading rows, long content wrapping, responsive scroll inherited from Table, disabled Pagination, RTL, keyboard, no-regression sweep). Grep clean. Awaiting visual validation before any freeze. **TreeView (Data Display) FROZEN (2026-07-10)** — a Frozen Review found and fixed one genuine dead-code defect (`focusTreeItem`'s unused `current` parameter, silenced with `void current`, removed along with updating every call site) — no other objective defect found. Public API (`TreeView.Item` `defaultOpen`/`open`/`onOpenChange`/`disabled`/`className`; every other sub-part's `className`) now requires an ADR to change. **TreeView (Data Display) built to the full process, not frozen (2026-07-10)** — a real compound (`TreeView`/`TreeView.Item`/`TreeView.Trigger`/`TreeView.Content`/`TreeView.Icon`/`TreeView.Label`) answering only "what is the hierarchical structure of these items?" — no routing, filesystem, permissions, lazy loading, drag & drop, checkboxes, selection, editing, search or virtualization; all of that belongs to a future File Explorer. Built naturally on the frozen `Collapsible` — every expand/collapse state machine is Collapsible's own, reshaped via `asChild` into a tree row. A leaf `TreeView.Item` (no `TreeView.Content`) gets no Collapsible, no chevron, no `aria-expanded`. Depth is expressed only via token-driven indentation (`calc(var(--ds-space-4) * (level - 1) + var(--ds-space-2))`) and `aria-level` — never a vertical guide line. Full WAI-ARIA Tree View pattern: `role="tree"`/`"treeitem"`/`"group"`, `aria-level`/`aria-setsize`/`aria-posinset` computed structurally. Keyboard hand-rolled at the root (ArrowUp/Down roving tabIndex, Home/End, ArrowRight into a child, ArrowLeft to collapse/move to parent, Enter/Space free via native `<button>`) — same justified hand-rolled precedent as MultiSelect/TimePicker/DateRangePicker. Proof `/dev/tree-view` + `scripts/tree-view-proof.mjs` green (ARIA structure, setsize/posinset, no guide line, default-open/controlled/uncontrolled/disabled, Icon/Badge/Avatar composing with zero adaptation, long-label truncation, responsive, RTL, full keyboard navigation verified end-to-end, no-regression sweep). Grep clean (the sole transition-transform occurrence is the identical chevron string already frozen in Accordion/Collapsible). Awaiting visual validation before any freeze. **ActivityFeed (Data Display) FROZEN (2026-07-10)** — a Frozen Review (component, captures, Playwright proof, API, architecture, tokens, dependencies) found no objective defect — zero code changed, frozen as-is. Public API (`ActivityFeed` `compact`/`align`/`className`; every sub-part's `className`) now requires an ADR to change. **ActivityFeed (Data Display) built to the full process, not frozen (2026-07-10)** — a real compound (`ActivityFeed`/`ActivityFeed.Item`/`ActivityFeed.Avatar`/`ActivityFeed.Icon`/`ActivityFeed.Content`/`ActivityFeed.Title`/`ActivityFeed.Description`/`ActivityFeed.Meta`/`ActivityFeed.Actions`) answering only "what happened recently?" — no push notifications, real-time, WebSockets, likes, comments, replies, reactions, bookmarks, unread state, selection, pagination, infinite scroll, filtering, grouping, sorting or search; all of that belongs to the consuming business screen. Distinct from Timeline (Timeline draws a chronological AXIS as a line between dots; ActivityFeed has no drawn axis, just a list of activities). Renders a real `<ul>`/`<li>` (order is not itself the semantic point, unlike Timeline's `<ol>`). `ActivityFeed.Avatar`/`ActivityFeed.Icon` are plain leading-column slots sharing one fixed footprint. Rows are separated by the real, frozen `Separator` at a quarter strength (`divider/40`, matching Table's own fade), hidden after the last item via a structural `:last-child` selector. `compact` (boolean) and `align` (`start` default/`center`) are pure layout props. Composes only Typography/`divider` tokens and whatever a consumer places in its slots — no GlassSurface, no Card, no shadow, no decoration ActivityFeed draws itself. Proof `/dev/activity-feed` + `scripts/activity-feed-proof.mjs` green (native structure, Separator fade/last-item hiding, compact/comfortable rhythm, Avatar/Icon/Badge/Button/Code composing with zero adaptation, matching slot footprints, tabular-nums metadata, long content wrapping, always-vertical responsive, RTL, no fabricated live-region/notification role, no-regression sweep). Grep clean. Awaiting visual validation before any freeze. **Timeline (Data Display) FROZEN (2026-07-10)** — a Frozen Review (component, captures, Playwright proof, API, tokens, architecture, dependencies) found no objective defect after the prior Craft Review pass (connecting line faded to `divider/40`; plain `Timeline.Dot` shrunk to an 8px hairline-ringed mark) — zero code changed, frozen as-is. Public API (`Timeline` `orientation`/`align`/`className`; every sub-part's `className`) now requires an ADR to change. **Timeline (Data Display) built to the full process, not frozen (2026-07-10)** — a real compound (`Timeline`/`Timeline.Item`/`Timeline.Separator`/`Timeline.Dot`/`Timeline.Content`/`Timeline.Title`/`Timeline.Description`/`Timeline.Time`, the same shape as MUI's own Timeline) answering only "in what order did these events happen?" — no likes, comments, notifications, pagination, virtualization, real-time or filtering; all of that belongs to a future ActivityFeed. Renders a real `<ol>`/`<li>` — order is semantic. The connecting line is a plain 1px `divider` hairline owned by the earlier event's own `Timeline.Separator`, hidden after the last item via a structural `:last-child` selector, never a JS index. `Timeline.Dot` is a small outlined circle (`border-border`, matching the frozen Stepper's pending-step ring) that grows to fit an icon/Avatar child via CSS `has-[>*]`, zero extra prop. `Timeline.Time` uses `tabular-nums`. `orientation` (vertical default/horizontal) and `align` (start default/end) are pure layout, RTL-aware via native flex-direction. Proof `/dev/timeline` + `scripts/timeline-proof.mjs` green (native structure, both axes, line disappearing after the last item, Avatar/Badge/Icon composing with zero adaptation, Dot growing for an icon, tabular-nums, dense/comfortable rhythm, long content wrapping, responsive, RTL, no-regression sweep). Grep clean. Awaiting visual validation before any freeze. **Table (Data Display) FROZEN (2026-07-10)** — a Frozen Review (component, captures, Playwright proof, tokens, API, dependencies) found no objective defect after the prior Craft Review pass (header weight to `font-semibold`; row separators moved off `Table.Row` onto `Table.Header`/`Table.Body`, header boundary full-strength `divider`, body rows faded to `divider/40`; `tabular-nums` on cells) — zero code changed, frozen as-is. Public API (`Table` `stickyHeader`/`className`; `Table.Header`/`Table.Body`/`Table.Footer`/`Table.Row` `className`; `Table.Head`/`Table.Cell` `align`/`className`; `Table.Caption` `className`) now requires an ADR to change. **Table (Data Display) built to the full process, not frozen (2026-07-10)** — the first component in the new Data Display category. A real compound (`Table`/`Table.Header`/`Table.Body`/`Table.Footer`/`Table.Row`/`Table.Head`/`Table.Cell`/`Table.Caption`) composing the native `table`/`thead`/`tbody`/`tfoot`/`tr`/`th`/`td`/`caption` elements directly — never a `<div>` reimplementing table semantics. Answers only "how do these several objects compare across several properties at once?" — no pagination, sorting, filtering, editing, resizable columns, drag, selection, virtualization, infinite scroll, loading overlays, column menus or bulk actions; all of that belongs to a future, separate DataGrid. The one necessary concession is a plain `overflow-x-auto` wrapper (a `<table>` cannot scroll itself), with no border/background/padding of its own. `stickyHeader` is purely visual (`position: sticky`, threaded via React Context to `Table.Header`); `align` (`start`/`center`/`end`) is logical and RTL-aware on `Table.Head`/`Table.Cell`. Styled only with Typography tokens and the `divider` token already shared with the frozen Separator — a discreet header, one hairline per row, no vertical gridlines, no "spreadsheet" look. Proof `/dev/table` + `scripts/table-proof.mjs` (native semantics, caption, header/footer, numeric alignment verified in both LTR and RTL, mixed content composing the frozen Avatar/Badge/Code with zero adaptation, long content wrapping, sticky header, responsive horizontal scroll without collapsing into Cards, RTL, no-regression sweep across Accordion/Collapsible/Separator). Grep clean. Awaiting visual validation before any freeze. **Collapsible (Disclosure) FROZEN (2026-07-09)** — a Frozen Review found and fixed one genuine defect (`className` passed alongside `asChild` was silently dropped instead of merged onto the consumer's custom trigger element via Radix Slot; fixed and covered by a new proof assertion). The Disclosure atom Accordion is literally built from: one region, one open/closed state, no group logic, no exclusivity, no coordination. A real compound (`Collapsible`/`Collapsible.Trigger`/`Collapsible.Content`) composing `@radix-ui/react-collapsible@1.1.16` directly. Trigger shares the exact row material already established by the frozen Accordion. Public API now requires an ADR to change. **Accordion (Disclosure) FROZEN (2026-07-09)**, after a craft pass fixing three objective inconsistencies (Trigger radius `rounded-md`→`rounded-sm` to match DropdownMenu/Breadcrumb row precedent; focus ring `ring-accent`→`ring-accent-accessible` to match every other flat primitive; `data-[state=open]:rounded-b-none` so the open Trigger's hover/focus highlight flows into Content instead of reading as a disconnected pill) followed by a Frozen Review finding no further objective defect. The first component in a new Disclosure category — answers only "what additional content can I reveal?" — never navigation, feedback, overlay, data display or a form value. A real compound (`Accordion`/`Accordion.Item`/`Accordion.Trigger`/`Accordion.Content`) composing `@radix-ui/react-accordion@1.2.16` directly, no wrapper. `Item` decides no border of its own (Invariant A1 — a divided list is composed with the frozen `Separator`); `Content` draws no card/surface, never a fixed height. Public API now requires an ADR to change. **Separator (Layout) FROZEN (2026-07-09)** — a Frozen Review (component, dead code, unused imports/props/branches, captures, proof, API, tokens, dependencies) found no objective defect; zero code changed, frozen as-is. Answers only "these two groups of content are visually distinct"; `decorative` (default) carries `role="none"` (explicitly stripped, not merely omitted); `decorative={false}` exposes `role="separator"` + `aria-orientation`. Zero content ever (no children/label/icon). Public API (`orientation`/`decorative`/`className`) now requires an ADR to change. **Text (Typography) FROZEN (2026-07-09)** — a Frozen Review found no objective defect; zero code changed, frozen as-is. Answers only "this is textual content," one canonical body style from tokens only; `size`/`tone`/`weight` removed entirely, `as` selects the semantic tag only (p/span/div/strong/em/small, never the visual style); zero margin/padding of its own. Large consumer migration (previous session): ~65 call sites across 23 files moved from `size=`/`tone=`/`weight=` to `className`, including the THREE FROZEN Feedback banners and the three frozen state primitives (their internal `sizeConfig` fields retyped to literal Tailwind classes) — zero visual change, verified via fresh screenshots of all six frozen references. Public API (`as`/`className`/`children`) now requires an ADR to change. **Heading (Typography) FROZEN (2026-07-09)** — a Frozen Review (component, captures, proof, API, tokens, dependencies) found no objective defect; zero code changed, frozen as-is. Answers only "this information is a title," never a layout/section/business-hierarchy decision; `level` (1–6, visual, from the canonical type scale) decoupled from `as` (semantic tag), matching Primer/Atlassian's Heading; `level` changed from a string enum to a number (`level={2}`), `display-1/2/3` dropped from Heading's scope; zero internal margin, ever. A reported conflict: DISCIPLINE's type scale defines only five heading sizes, no `--ds-text-h6` — `level={6}` renders a real `<h6>` reusing `h5`'s visual size rather than inventing a token outside the frozen scale. Public API (`level`/`as`/`className`/`children`) now requires an ADR to change. **Code (Data Display) rebuilt to the full process (2026-07-09)** — a verbatim technical value (command/variable/endpoint/HTTP method/CSS token/shortcut), monospace, no font-size of its own (inherits ambient context), never interactive, never a surface beyond a discreet neutral background; `variant="inline"|"block"` removed (Code is always one line) in favour of `asChild` (Radix Slot, e.g. rendering a real `<kbd>` for the shortcut case); one non-frozen consumer (`showcase.tsx`) migrated off the dropped `block` mode. Built, not frozen — awaiting visual validation. **Avatar (Data Display) rebuilt to a compound primitive and FROZEN (2026-07-08)** (`Avatar`·`Avatar.Image`·`Avatar.Fallback`·`Avatar.Group`) — foundational, no domain knowledge, strict image→initials→icon fallback, one monotonic token size scale, RTL-correct Group overflow; consumers migrated; Frozen-review found nothing to change; public API locked (ADR to change). **Label (Forms accessibility) built to the full process, then polished** — a real `<label>` bound via `htmlFor`; fixed two objective defects (the required marker is no longer red — now `text-text-secondary` after a polish pass, aria-hidden; a real `disabled` prop, dimmed-not-invisible, with a hardened DOM-relationship proof); long/multiline wrap; icon variant rejected; ~28 Input-family consumers still compile; Built, not frozen. **Sprint 1 (in progress): AvatarLauncher** — the single, calm entry point to the Guide (`src/components/avatar/avatar-launcher.tsx`), composed only from frozen primitives (IconButton/Icon/Spinner/Badge/Avatar/Tooltip); states idle/loading/active/coach/unavailable + unread; one considered size; full keyboard/ARIA; RTL-correct. **Built, not frozen** — awaiting visual validation. No other Avatar brick (Drawer/Conversation/Composer/AI) is to be built until the Launcher is frozen.

> _Historical (component-library phase):_ Phase 04 — the five Material Roles are FROZEN and promoted to `glass.css`; the component library was built and progressively frozen (the Feedback banner family and Badge frozen 2026-07-08).

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
>   - **Pagination — Navigation, a FLAT primitive with NO Material Role
>     (composes the frozen Icon + Spinner only). FROZEN (visually
>     validated 2026-07-06).** No functional, visual or architectural
>     change again — objective bugs only.
>     ```text
>     Navigation (flat, no Material Role) — sibling of the frozen Breadcrumb
>     no GlassSurface / .ds-micro / .ds-control / .ds-card / .ds-floating / .ds-immersive
>     → Pagination (Icon + Spinner + Typography tokens)
>     Status: FROZEN
>     ```
>     Random-access navigation across a FLAT, ordered collection split into
>     fixed-size pages — jump directly to page 47 of 900 without stepping
>     through the 46 before it. Not a List (the paginated content itself,
>     never the control that moves between pages), not a DataTable (the
>     content Pagination is composed INTO, not a substitute), not Infinite
>     Scroll (a continuous flow with no "page N of M" concept and no random
>     access — you cannot jump to item 4700 without loading everything
>     before it), not a Virtual List (a rendering OPTIMIZATION invisible to
>     the user, still one continuous scroll, never a page boundary), not a
>     Stepper (linear PROGRESS through semantically DIFFERENT steps of one
>     task, usually blocking until valid — Carbon: "do not use it to
>     display linear journeys, for example, in a form progression";
>     Pagination's pages are structurally IDENTICAL subdivisions, freely
>     reachable in any order, nothing to validate), not Tabs (a small,
>     always-visible set of semantically DISTINCT panels, not numbered
>     subdivisions of one data set), not a Segmented Control (frozen,
>     deliberately capped at "2–6 visible options" — Pagination must
>     handle an ARBITRARILY LARGE page count, exactly the scale problem
>     Segmented Control refuses by construction), not a Navigation Menu
>     (the app's PRIMARY, semantically distinct destinations, not numbered
>     pages of one collection), not a plain row of Buttons (no shared `nav`
>     landmark, no `aria-current`, no ordinal relationship, and no
>     REUSABLE collapse algorithm — every consumer would reinvent the
>     sibling/boundary/ellipsis math and its keyboard/ARIA wiring from
>     scratch).
>
>     A FLAT, token-only Navigation primitive — the sibling of the frozen
>     Breadcrumb, NOT a Control Surface member. This is a deliberate
>     placement: the individual page controls ARE buttons with a
>     controlled value (`page` + `onPageChange`), superficially resembling
>     Slider/SegmentedControl's own value+onChange shape, but the
>     controlled API is just an ergonomic convention (matching MUI's own
>     Pagination, which is controlled-only — no uncontrolled `defaultPage`,
>     deliberately NOT added here either, since pagination state is almost
>     always externally owned, tied to routing/data-fetching). The real
>     signal is classification precedent: MUI itself files Pagination
>     under "Navigation" (next to Breadcrumbs, Drawer, Link, Menu, Tabs),
>     never under "Inputs" (Slider, Switch); the WAI-ARIA-recommended
>     markup is `nav` + list + `aria-current` — structurally identical to
>     the frozen Breadcrumb, not to any Control Surface member; and
>     wrapping potentially thousands of page numbers in individual glass
>     pills (as Segmented Control does for its capped 2–6 options) would be
>     visual and performance nonsense at Pagination's scale. Composes only
>     the frozen Icon (chevrons) and the frozen Spinner (`loading` only) —
>     never GlassSurface, never LinkButton. Radix ships no Pagination
>     primitive at all — confirmed via their own open, unresolved feature
>     requests (issues #1856, #886, discussion #831), one stating plainly
>     that pagination is "tough and quite opinionated." Unlike the frozen
>     Breadcrumb (data-driven `items` mode AND full manual sub-part
>     composition), Pagination is deliberately a SINGLE, self-contained,
>     non-compound component — no exported `.Item`/`.Ellipsis` sub-parts,
>     per the brief's explicit "une API très simple" (shadcn/ui's own
>     compound Pagination API — Root/Content/Ellipsis/Item/Link/Next/
>     Previous — was deliberately not the model here).
>
>     Collapse algorithm mirrors MUI's own published `siblingCount` +
>     `boundaryCount` semantics (both default 1): always show
>     `boundaryCount` pages at each end, always show `siblingCount` pages
>     on each side of the current page, collapse anything else into a
>     single ellipsis — never for a gap of exactly one page (IBM Carbon:
>     "never place the ellipsis button at the beginning or end of a
>     series"; a lone hidden page is shown directly instead of wasting an
>     ellipsis on it). Unlike Carbon's own ellipsis (an interactive button
>     opening a menu of hidden pages), DISCIPLINE's ellipsis is purely
>     decorative: Prev/Next already guarantee every page stays reachable
>     (unlike the frozen Breadcrumb, where a hidden ancestor has no other
>     path to it — exactly why Breadcrumb's Ellipsis is a real button) — an
>     interactive menu here would compose Floating Surface machinery for a
>     convenience, not a demonstrated necessity, contradicting "une API
>     très simple." Two independent, layered switches mirroring
>     Breadcrumb's own `responsive`: `compact` (explicit override — forces
>     the "‹ 7 / 24 ›" reading, e.g. for a narrow sidebar widget on a wide
>     viewport) and `responsive` (default on; when `compact` is left
>     unset, renders BOTH markups and lets an `md`-breakpoint CSS rule pick
>     one — zero JS measuring, same technique as Breadcrumb's own mobile
>     collapse). RTL: flexbox reverses natively; the chevrons flip via
>     `rtl:rotate-180` so Prev/Next still point the semantically correct
>     reading direction — verified visually: page numbers ascend 1→24 in
>     natural right-to-left reading order, and the flipped icons land on
>     the semantically correct side (Previous reads as a right-pointing
>     chevron, sitting toward the RTL reading start; Next reads as a
>     left-pointing chevron, toward the reading end). No roving-tabindex/
>     arrow-key model needed (a plain list of independent buttons, not a
>     composite ARIA widget, unlike RadioGroup/Slider/Tablist) — native Tab
>     order is the complete keyboard model, zero literal `.focus()` calls
>     anywhere. pagination.tsx grep: zero `GlassSurface`/`blur`/
>     `backdrop-filter`/`rgba`/`shadow`/`transition`/`animation` string
>     outside prose doc comments. ZERO files modified outside the new
>     component files. API: `page` · `totalPages` · `onPageChange` ·
>     `disabled` · `loading` · `size` sm/md/lg · `siblingCount` ·
>     `boundaryCount` · `showFirst` · `showLast` · `showPrev` · `showNext`
>     · `compact` · `responsive`. Proof: `/dev/pagination` — minimal ·
>     first/middle/last page · large dataset (1000 pages) · few pages ·
>     disabled · loading · compact · sibling counts 0/1/2 · responsive ·
>     RTL · keyboard · sizes; desktop/tablet/mobile + RTL captures;
>     programmatic assertions for nav landmark/list structure/
>     aria-current/page-change/first-last boundary disabling/First-Last
>     jump buttons/smart collapse (boundary+siblings+ellipsis, never a
>     single-page gap)/disabled/loading (state stays visible, Spinner
>     shown)/compact/sibling-count scaling/responsive breakpoint/keyboard
>     (Tab+Enter, native)/RTL. `'use client'`. **FROZEN (2026-07-06)** — no
>     further redesign; changes only for an objective bug from here on.
>   - **Tabs — Navigation, a FLAT primitive with NO Material Role, the
>     first component this session to compose a real Radix primitive
>     directly (`@radix-ui/react-tabs`). FROZEN (visually validated
>     2026-07-06, after a Frozen-review pass).** No functional, visual or
>     architectural change again — objective bugs only. Frozen-review
>     finding: `orientation` was destructured in the Root and re-passed
>     unchanged — dead extraction, since the orientation-aware styling
>     reads Radix's own runtime `data-orientation` attribute via CSS, not
>     this JS variable. Removed; `orientation` now flows through
>     `{...props}` like every other native prop. Zero behavioral change
>     (re-verified: full proof green, build unchanged at 10 kB).
>     ```text
>     Navigation (flat, no Material Role) — composite ARIA widget sub-family
>     (distinct from Breadcrumb/Pagination's plain-list sub-family)
>     no GlassSurface / .ds-micro / .ds-control / .ds-card / .ds-floating / .ds-immersive
>     → Tabs (@radix-ui/react-tabs + Typography tokens)
>     Status: FROZEN
>     ```
>     Switch between a small, named, always-visible set of alternate
>     content views for the SAME record, without leaving the page: "which
>     facet of THIS am I looking at" — never "where am I in the
>     hierarchy" (Breadcrumb), never "which page of THIS list"
>     (Pagination). Not an Accordion (stacks sections VERTICALLY in one
>     flowing page, any number open at once, growing height — Tabs shows
>     EXACTLY one panel, fully replacing the last, constant height), not a
>     Navigation Menu (the app's PRIMARY destinations, usually real page
>     navigation/routing — Tabs switches LOCAL content on the same view),
>     not a Segmented Control (frozen: changes an EXTERNAL value the
>     consumer reacts to, owns no panel at all — no `role="tabpanel"`, no
>     built-in `aria-controls`/`aria-labelledby`; Tabs structurally OWNS
>     the panel via `TabsContent`, exactly the distinction already on
>     record in FullscreenOverlay's own docs: "Tabs... owns a content
>     panel" where Segmented Control does not), not a Sidebar (a
>     persistent LAYOUT region, often multi-level, always on screen —
>     Tabs is a compact strip local to one content block), not a
>     Breadcrumb (reports a STRUCTURAL position among ancestors, never
>     panels), not a Stepper (a SEQUENTIAL, usually validated progression
>     — every tab is freely reachable at any time, in any order, nothing
>     to complete first), not Pagination (structurally IDENTICAL pages of
>     a large, often huge sequence, collapsible — Tabs is a small, fixed,
>     always-fully-visible set of SEMANTICALLY DIFFERENT views, never
>     collapsed), not a Select (a value from a CLOSED but often LONG
>     list, hidden behind a menu to save space — Tabs keeps every option
>     visible permanently, which only scales to a handful), not a
>     Dropdown Menu (transient commands, never a permanently visible,
>     panel-bound set of views), not a Command Palette (a global
>     search-and-act surface, orthogonal), not a Carousel (a SEQUENCE of
>     slides/media BROWSED in order, often auto-advancing/swiped/looped,
>     no persistent named identity per slide — Tabs is chosen EXPLICITLY
>     by name, never scrolled through, and each view has a durable label,
>     not an ordinal position).
>
>     A FLAT primitive with NO Material Role (zero GlassSurface, zero
>     `.ds-micro`/`.ds-control`/`.ds-card`/`.ds-floating`/`.ds-immersive`,
>     zero motion budget) — but architecturally a DIFFERENT sub-family
>     from the frozen Breadcrumb/Pagination (plain lists of independent
>     controls, native Tab order, no roving tabindex). Tabs is a
>     COMPOSITE ARIA WIDGET: the WAI-ARIA Tabs pattern mandates roving
>     tabindex among triggers with Arrow/Home/End navigation — the SAME
>     keyboard model as the frozen RadioGroup/Segmented Control. Despite
>     that shared keyboard model, Tabs does NOT derive from Control
>     Surface / reuse Segmented Control's glass: its universal, most-
>     precedented visual identity — Material Design 3's own "tab
>     indicator," MUI, GitHub, Linear — is a text label plus a thin
>     indicator bar, never a glass pill; wearing Micro-tuned glass on
>     every trigger the way Segmented Control does would misrepresent a
>     pattern whose entire visual language is deliberately quiet. The
>     indicator is a plain instant border-color swap on the active
>     trigger (`data-state=active`) — never an animated sliding bar,
>     since this file carries zero transition/animation.
>
>     Composes `@radix-ui/react-tabs` DIRECTLY — the first component this
>     session for which Radix genuinely ships a primitive (Sheet/
>     Spotlight/Breadcrumb/Pagination all had none) — inheriting its
>     entire behavioral contract verbatim: controlled/uncontrolled state,
>     `role="tablist"`/`"tab"`/`"tabpanel"`, `aria-selected`,
>     `aria-controls`, `aria-labelledby`, orientation-aware roving
>     tabindex, `dir`-aware Arrow-key direction (flips correctly in RTL),
>     and a focusable tabpanel (Tab from the active trigger lands
>     directly on the panel). This file adds ONLY geometry, spacing and
>     token-only active-state styling — zero behavioral code, zero
>     literal `.focus()` calls anywhere. One deliberate divergence from
>     Radix's own raw default: `activationMode` defaults to `"manual"`
>     here, not Radix's `"automatic"` — the WAI-ARIA APG itself:
>     "Authors should consider implementing automatic activation of tabs
>     only in circumstances where panels can be displayed instantly...
>     Otherwise, automatic activation slows focus movement, which
>     significantly hampers users' ability to navigate efficiently." As a
>     generic, reusable primitive, DISCIPLINE cannot guarantee a future
>     consumer's panel content has zero latency — manual is the
>     universally safe default; automatic remains one prop away. RTL:
>     Radix's own `dir` prop flips Arrow-key semantics to match reading
>     direction; flexbox reverses the row natively — verified visually
>     (DOM/logical order preserved: the first tab, Overview, renders
>     rightmost in a `dir="rtl"` container).
>
>     Additive dependency: `@radix-ui/react-tabs@1.1.17` (exact-pinned,
>     matching this repo's dependency convention) — genuinely necessary
>     since Radix ships no Tabs substitute; the first new package added
>     this session. tabs.tsx grep: zero `GlassSurface`/`blur`/
>     `backdrop-filter`/`rgba`/`shadow`/`transition`/`animation` string
>     outside prose doc comments. API: `Tabs` (value · defaultValue ·
>     onValueChange · orientation · activationMode · dir · className) ·
>     `Tabs.List` (className) · `Tabs.Trigger` (value · disabled ·
>     className) · `Tabs.Content` (value · forceMount · className) — plus
>     each part's native HTML/Radix attributes, matching how every other
>     component in this library extends its host element's attributes.
>     ZERO frozen files modified. Proof: `/dev/tabs` — basic · controlled
>     · uncontrolled · horizontal · vertical · automatic/manual
>     activation · disabled trigger · force mount · long labels ·
>     responsive · RTL · keyboard; desktop/tablet/mobile + RTL captures;
>     programmatic assertions for tablist/tab/tabpanel structure, tab
>     change, aria-selected/aria-controls/aria-labelledby linkage,
>     automatic vs manual activation (Enter required in manual), Home/End,
>     Arrow-key loop, vertical Arrow Up/Down, disabled trigger skipped by
>     keyboard, forceMount panel present-but-hidden in the DOM, and RTL
>     Arrow-key direction. `'use client'`. **FROZEN (2026-07-06)** — public
>     API locked (`Tabs`/`Tabs.List`/`Tabs.Trigger`/`Tabs.Content` + their
>     native Radix props); no further redesign or API change without an
>     ADR; changes only for an objective bug from here on.
>   - **Stepper — Navigation, a FLAT primitive with NO Material Role, the
>     plain-list sub-family sibling of Breadcrumb/Pagination (native Tab
>     order, one item marked `aria-current`, NOT the composite-widget
>     sub-family Tabs belongs to). FROZEN (visually validated 2026-07-07,
>     after a Frozen-review pass).** No functional, visual or
>     architectural change again — objective bugs only. Frozen-review
>     finding (a genuine layout bug, not cosmetic): the horizontal
>     connector row nested the FULL label block, not just the indicator,
>     as a flex sibling of the two `flex-1` connectors — with a long,
>     multi-line label its content width dominated the row and collapsed
>     both connectors to ~3px regardless of the step column's actual
>     width (measured via `getBoundingClientRect`: 0–4px before the fix,
>     85px after, in the "Long labels" demo at 1280px). Fixed by
>     restructuring the row to wrap ONLY the indicator, with the label
>     rendered as a separate full-width row beneath it inside the same
>     button/span. Re-verified visually (screenshot + measurement) and
>     via a full green proof re-run, build unchanged at 5.49 kB. The
>     `loading` state's design was also reviewed and its justification
>     written into the component's own doc comment: advancing from the
>     current step is almost always gated on an async call the Stepper
>     never owns (the consuming Wizard does), so `loading` freezes every
>     step — not only the current one, since jumping to an already-
>     completed step mid-submit would be as wrong as jumping ahead — while
>     placing transition-in-flight feedback on the current step's own
>     circle via the frozen Spinner, mirroring the frozen Pagination's own
>     `loading` (disables all controls during a page transition) adapted
>     to Stepper's shape.
>     ```text
>     Navigation (flat, no Material Role) — plain-list sub-family
>     (Breadcrumb, Pagination, Stepper — native Tab order, aria-current)
>     no GlassSurface / .ds-micro / .ds-control / .ds-card / .ds-floating / .ds-immersive
>     → Stepper (frozen Icon + frozen Spinner only)
>     Status: FROZEN
>     ```
>     Progress through a sequence of ordered, semantically DIFFERENT steps
>     of ONE task being completed right now (Account → Profile → Payment →
>     Review) — never which facet of the same record (Tabs), never a
>     navigation hierarchy (Breadcrumb), never a page of a data collection
>     (Pagination). Not Tabs (interchangeable views, freely reachable in
>     any order, no required sequence, no completed/pending state — a
>     Stepper's entire point is ORDER + PROGRESS), not a Breadcrumb (a
>     navigation hierarchy of ancestors, never a completion state), not
>     Pagination (structurally identical pages of a data collection, no
>     "done" semantics, no fixed small count), not Progress/Progress Ring
>     (a single continuous quantity 0–100%, no named discrete steps), not
>     a Timeline (a read-only, often unbounded chronological record of
>     PAST events — a Stepper is a small, fixed, forward-looking set of
>     steps for a task happening NOW), not a Navigation Menu (independent
>     primary destinations, no order or completion), not vertical Tabs
>     (orientation never changes what a component IS — what distinguishes
>     Stepper is the order and the completed/current/pending state
>     machine, not its axis), not a Wizard (a higher-level composition
>     that OWNS step content/validation/navigation flow — the Stepper is
>     only the indicator a Wizard would compose above that content), not a
>     plain `<ol>` (no progress semantics, no `aria-current="step"`, no
>     completed/pending state, no connectors — an ingredient Stepper uses
>     internally). A FLAT primitive with NO Material Role — the sibling of
>     the frozen Breadcrumb/Pagination, not Tabs: MUI itself files Stepper
>     under "Navigation" (the same precedent signal already used for
>     Breadcrumb/Pagination/Tabs); unlike Tabs (a composite ARIA widget,
>     `aria-selected`), Stepper structurally matches Breadcrumb/
>     Pagination's plain-list sub-family — clickable steps are
>     independent, native-Tab-order buttons and exactly one item carries
>     `aria-current="step"`, the value the ARIA spec defines specifically
>     for "the current step within a process," explicitly distinct from
>     `aria-selected`. No WAI-ARIA APG pattern exists for "Stepper" (unlike
>     Tabs/Breadcrumb) — this structure is DISCIPLINE's own, grounded
>     directly in `aria-current`'s defined semantics. States expressed
>     only by typography, borders, the frozen Icon (a checkmark that
>     always wins on completed steps, overriding any custom per-step icon)
>     and the frozen Spinner (`loading` only) — never GlassSurface, never
>     a sliding/animated connector (zero transition/animation). A single,
>     self-contained, non-compound component (no exported sub-parts),
>     matching Pagination's own "une API très simple" precedent. Per
>     Material Design's own explicit mobile guidance ("prefer vertical
>     steppers... horizontal steppers typically introduce horizontal
>     scrolling"), the `responsive` layer (default on, CSS-only, zero JS
>     measuring) auto-switches horizontal to vertical below the `md`
>     breakpoint by rendering both structures with distinct id namespaces
>     (so `aria-describedby` never collides) and letting CSS pick one;
>     explicit `orientation="vertical"` skips it. Two additive props
>     beyond the brief's literal list, both indispensable: `onStepClick`
>     (a `clickable` Stepper with no way to observe a click would not be
>     navigable) and `responsive` (the brief's own mobile-adaptation
>     requirement). Connector segments are computed from the shared
>     boundary between two steps (not each step's own status
>     independently) so both halves of the same visual line always agree
>     — fixed during self-review after an initial draft let each side
>     compute its own color and could visually disagree at a
>     completed→current boundary. `forwardRef` added (initially missed);
>     `isInteractive` now depends only on `clickable`, never on
>     `disabled`, matching the frozen Pagination/Tabs convention that
>     `disabled` toggles only the native attribute/styling, never the
>     element's type. grep: zero `GlassSurface`/`blur`/`backdrop-filter`/
>     `rgba`/`shadow`/`transition`/`animation` string outside prose doc
>     comments; zero literal `.focus()` calls. API: `currentStep` ·
>     `steps` (`id` · `label` · `description?` · `icon?` · `disabled?`) ·
>     `onStepClick` · `orientation` · `clickable` · `completed` (step ids,
>     additive to the auto-derived "before currentStep" rule) · `loading`
>     · `disabled` · `responsive` · `className`. ZERO frozen files
>     modified. Proof: `/dev/stepper` — basic · current step · completed
>     steps · clickable · disabled step · vertical · horizontal · long
>     labels · descriptions · icons · loading · responsive · RTL;
>     desktop/tablet/mobile + RTL captures; programmatic assertions for
>     nav/ordered-list structure, exactly one `aria-current="step"`,
>     completed-checkmark count, click-to-jump, disabled step (native
>     `disabled` + `aria-disabled`, still a real button), loading Spinner,
>     horizontal/vertical `flex-direction`, native Tab+Enter keyboard
>     activation, responsive breakpoint switch, and the RTL wrapper.
>     `'use client'`. **FROZEN (2026-07-07)** — public API locked
>     (`currentStep`/`steps`/`onStepClick`/`orientation`/`clickable`/
>     `completed`/`loading`/`disabled`/`responsive`/`className`); no
>     further redesign or API change without an ADR; changes only for an
>     objective bug from here on.
>   - **Progress — Flat primitive (token system, no glass role), sibling of
>     Spinner/Skeleton/Badge, never Navigation. Rebuilt from a
>     pre-methodology implementation onto the full analysis/build/proof
>     process. Built, not frozen.**
>     ```text
>     Flat primitives (token system, no glass role)
>     no GlassSurface / .ds-micro / .ds-control / .ds-card / .ds-floating / .ds-immersive
>     → Progress (@radix-ui/react-progress, exact-pinned dependency)
>     Status: Built (not frozen)
>     ```
>     The known fraction of completion (0 → max) of ONE continuous,
>     unidimensional operation happening right now — never named steps
>     (Stepper), never a placeholder for unknown content (Skeleton), never
>     a pure indeterminate wait with no fraction at all (Spinner), never a
>     circular presentation (Progress Ring — the identical semantics in
>     SVG form, a geometry choice, not this component: MUI/Chakra/Radix
>     all ship Linear and Circular as two SEPARATE components, never one
>     `variant`, since their geometry — width vs stroke-dasharray — is
>     fundamentally different code; Progress Ring is a future, separate
>     sibling, never a mode here), not a Timeline (a read-only
>     chronological record of PAST events that does not itself progress),
>     not a Badge (a static label, no track, no value that evolves), not a
>     Counter/Gauge/Meter/Chart/Status (a raw number with no track; a
>     permanent analog/threshold reading with no start-finish; a bounded
>     current-state reading displayed indefinitely; a multi-point/
>     multi-dimensional visualization; a discrete instantaneous state dot
>     — none represent a continuous, terminal, measured fraction).
>     Composes `@radix-ui/react-progress` DIRECTLY (already an
>     exact-pinned dependency): `role="progressbar"`, `aria-valuemin`/
>     `aria-valuemax`, `aria-valuenow` set for a numeric value and OMITTED
>     entirely for `indeterminate` (Radix's own convention, verified:
>     `aria-valuenow` is absent from the DOM when indeterminate),
>     `getValueLabel` defaulted here to compute `aria-valuetext` matching
>     the visible caption. Determinate value changes are an instant
>     `width` change — zero transition/animation; `indeterminate` reuses
>     the frozen Skeleton's own `animate-pulse motion-reduce:animate-none`
>     verbatim (the one non-decorative, functionally-necessary exception —
>     signaling "activity, unknown duration," the same reasoning already
>     covering the frozen Spinner's `animate-spin`), frozen when
>     `disabled` (verified: `animation-name: none`). The track is a `flex`
>     row with the indicator sized by `width` as a plain flex item — not a
>     positioned/transformed div — so it anchors to the INLINE-START edge,
>     which flexbox flips natively under `dir="rtl"` (verified: the fill's
>     right edge touches the track's right edge in RTL, extending left).
>     `disabled` has no interactive surface to disable (Progress is
>     read-only, nothing focusable) — it only dims the track/caption,
>     freezes the indeterminate pulse, and sets `aria-disabled`. Optional
>     caption row (custom `label`, or auto `{percent}%` from `showLabel`)
>     only wraps the progressbar in an extra `<div>` when a caption
>     actually renders — with no caption (the frozen Toast's and frozen
>     FileInput's exact existing usage: only `value`/`aria-label`/
>     `className`), the DOM stays byte-identical in depth to before, so
>     `className` keeps landing on the track itself (Toast's `h-1` height
>     override, FileInput's `flex-1` sizing both verified unaffected). One
>     non-frozen file updated as a direct consequence of dropping the
>     legacy `variant="circular"` mode: the generic dev components gallery
>     (`src/app/(dev)/dev/components/showcase.tsx`, not a tracked/frozen
>     component) had its circular demo line removed. grep: zero
>     `GlassSurface`/`blur`/`backdrop-filter`/`rgba`/`shadow`/`transition`
>     string outside prose doc comments; the sole `animate-pulse`
>     occurrence is the documented, precedented indeterminate exception;
>     zero literal `.focus()` calls. API: `value` · `max` ·
>     `indeterminate` · `size` (sm/md/lg) · `showLabel` · `label` ·
>     `color` (accent/success/warning/error/info) · `disabled` ·
>     `className`. ZERO frozen files modified. Proof: `/dev/progress` —
>     basic · determinate · indeterminate · custom max · small/medium/
>     large · label · percentage · disabled · loading screen · responsive
>     · RTL; desktop/tablet/mobile + RTL captures; programmatic assertions
>     for role/aria-valuemin/aria-valuemax/aria-valuenow/aria-valuetext,
>     indeterminate never setting aria-valuenow, custom max, strictly
>     increasing size heights, custom label vs auto percentage caption,
>     disabled `aria-disabled` + frozen pulse, responsive width following
>     the container, and the RTL fill anchor. **Built, not frozen** — no
>     automatic freeze; awaiting explicit visual validation before any
>     Freeze phase.
>   - **CircularProgress — Flat primitive (token system, no glass role),
>     direct sibling of Progress. Built, not frozen.**
>     ```text
>     Flat primitives (token system, no glass role)
>     no GlassSurface / .ds-micro / .ds-control / .ds-card / .ds-floating / .ds-immersive
>     → CircularProgress (@radix-ui/react-progress, exact-pinned dependency)
>     Status: Built (not frozen)
>     ```
>     The same known fraction of completion as Progress, in a ring —
>     reserved for compact/circular spaces (an avatar mid-upload, a sync
>     tile, a dashboard KPI) where a linear bar has no natural home. A
>     GEOMETRY choice, not a different UX problem: stroke-dasharray/
>     circumference math is fundamentally different code from a bar's
>     `width`, exactly why MUI/Chakra/Radix ship Linear and Circular as two
>     SEPARATE components, never one `variant` — the same reasoning
>     already recorded when Progress's own legacy circular mode was
>     dropped. Not Progress (needs horizontal width), not a Spinner
>     (purely indeterminate, no real fraction), not a Skeleton (a layout
>     placeholder), not a Gauge (a permanent analog reading with no
>     start/finish), not a Meter (a bounded current-state reading
>     displayed indefinitely), not a Chart (multi-point/multi-dimensional
>     visualization), not a Badge (a static label), not a Stepper (named
>     discrete steps vs one continuous quantity), not a Timeline (a
>     read-only record of past events), not a Counter (a plain number, no
>     track), not a Toast (an entire notification surface that MAY compose
>     this internally, never a competing indicator), not an Avatar
>     progress ring (a "ring around an avatar" use case composes this
>     AROUND an existing Avatar — never a feature Avatar owns itself), not
>     a Donut Chart (multiple comparative category values with a legend —
>     a dataviz concern). Composes `@radix-ui/react-progress` DIRECTLY for
>     the identical ARIA contract Progress relies on: `role="progressbar"`,
>     `aria-valuemin`/`aria-valuemax`, `aria-valuenow` set for a numeric
>     value and OMITTED entirely for `indeterminate` (verified: absent
>     from the DOM), `getValueLabel` defaulted to the visible percentage.
>     Two SVG `<circle>` elements (track + indicator) are the only new
>     visual code — no Icon/Spinner dependency. Determinate value changes
>     are an instant `strokeDashoffset` change — zero transition/
>     animation; `indeterminate` reuses the frozen Spinner's own
>     `animate-spin` verbatim (not Material's bespoke two-keyframe
>     expanding arc), rotating a constant-length arc via a wrapper around
>     the SVG (the static `-rotate-90` base transform on the SVG itself
>     would conflict with an animation targeting the same `transform`
>     property on the same element), frozen when `disabled` (verified:
>     `animation-name: none`). `label` is a plain boolean (unlike
>     Progress's ReactNode `label`/`showLabel` pair) — a centered
>     `{percent}%` inside the ring, suppressed automatically when
>     `indeterminate`. `disabled` has no interactive surface to disable —
>     it only dims the ring/label, freezes the spin, and sets
>     `aria-disabled`. Zero additive props beyond the brief's own literal
>     list. grep: zero `GlassSurface`/`blur`/`backdrop-filter`/`rgba`/
>     `shadow`/`transition` string outside prose doc comments; the sole
>     `animate-spin` occurrence is the documented, precedented
>     indeterminate exception; zero literal `.focus()` calls; zero
>     TODO/FIXME/`console.*`/unused imports. API: `value` · `max` ·
>     `indeterminate` · `size` (sm/md/lg) · `color`
>     (accent/success/warning/error/info/neutral) · `label` · `disabled` ·
>     `className`. ZERO frozen files modified. Proof:
>     `/dev/circular-progress` — basic · determinate · indeterminate ·
>     sizes · colors · percentage · custom max · 0%/100% · disabled ·
>     loading · responsive · RTL · long values; desktop/tablet/mobile +
>     RTL captures; programmatic assertions for role/aria-valuemin/
>     aria-valuemax/aria-valuenow/aria-valuetext, indeterminate never
>     setting aria-valuenow, custom max, 0%/100% edges, strictly
>     increasing size diameters, 6 distinct color strokes, disabled
>     `aria-disabled` + frozen spin, intrinsic size independent of
>     viewport, and large-number percentage math. **Built, not frozen** —
>     no automatic freeze; awaiting explicit visual validation before any
>     Freeze phase.
>   - **Spinner — Flat primitive (token system, no glass role). Rebuilt
>     from a pre-methodology implementation onto the full analysis/build/
>     proof process. Built, not frozen.**
>     ```text
>     Flat primitives (token system, no glass role)
>     no GlassSurface / .ds-micro / .ds-control / .ds-card / .ds-floating / .ds-immersive
>     → Spinner (composes nothing — the leaf every other Feedback primitive cites as precedent)
>     Status: Built (not frozen)
>     ```
>     The PURELY indeterminate activity indicator — "something is
>     happening, of unknown duration" — never "how much is left." Its only
>     promise is that work is in progress; it never has, and never will
>     have, a value. Not Progress/CircularProgress (a KNOWN fraction,
>     `max`, `role="progressbar"`, `aria-valuenow` present the moment a
>     fraction is determined — even their own `indeterminate` keeps that
>     progressbar-shaped contract, just without `aria-valuenow`; Spinner
>     never had that contract at all), not a Skeleton (a layout
>     placeholder, never an activity icon), not a Loading Overlay (a
>     pattern that shows a Spinner at its center, never the Spinner
>     itself), not FullscreenOverlay/Toast/Drawer/CommandPalette (each
>     already composes Spinner internally — an ingredient, never a
>     competitor), not Alert/Badge/Timeline/Gauge/Meter (a permanent
>     message, a static label, a record of the past, a permanent reading
>     of a real value), not Stepper (composes Spinner on its current step,
>     but Spinner has no notion of "which step"), not CircularProgress's
>     own indeterminate mode (visually close but semantically disjoint —
>     still a `progressbar` candidate to become determinate; Spinner never
>     is), not Button's loading state (Button composes Spinner, never
>     reinvents its own icon — exactly as it already does). Already the
>     internal loading affordance of 18 consumers before this rebuild,
>     several frozen (Button, Pagination, Drawer, Toast, DropdownMenu,
>     ContextMenu, Select, FullscreenOverlay, Stepper, CommandPalette, and
>     more) — this rebuild's overriding constraint was ZERO visual
>     regression across every one of them. Composes nothing — the leaf
>     every other Feedback primitive in this library cites as precedent
>     for its own one non-decorative motion exception (Progress's
>     `indeterminate`, CircularProgress's `indeterminate`, Skeleton's
>     shimmer all point back to Spinner's `animate-spin`, never the
>     reverse). `role="status"` + `aria-live="polite"`, NEVER `role=
>     "progressbar"`, NEVER an `aria-value*` attribute. The ring color
>     defaults to `border-current` (inherits the surrounding text color)
>     rather than a fixed brand color — load-bearing for all 18 existing
>     consumers; the new `color` prop is OPTIONAL with no default value —
>     omitted (as every existing consumer does), it renders byte-identical
>     to before (verified: omitting `color` produces a border color
>     matching the ambient text color); only an explicit `color` overrides
>     `currentColor`. `sm`/`md`/`lg` are unchanged byte-for-byte from
>     before (the exact same Tailwind class strings); `xs`/`xl` are purely
>     additive, at both ends of this project's own sizing scale (12px/
>     16px/24px/32px/48px — this project's tokens, not stock Tailwind's
>     default spacing scale, verified via computed style). `disabled` is
>     purely visual (dims the ring, freezes the spin — verified:
>     `animation-name: none`) — `role="status"` is a live-region role and
>     does not support `aria-disabled` (confirmed via `eslint-plugin-jsx-
>     a11y`'s `role-supports-aria-props`), unlike Progress/CircularProgress's
>     `role="progressbar"` which does. `motion-reduce:animate-none` added
>     (Skeleton/Progress/CircularProgress all already carry it; its
>     absence here predated that convention). `forwardRef` added
>     (previously a plain function component). Zero visual regression
>     verified: full production build succeeds across all 51 routes, and
>     Stepper's own `loading` capture (Spinner `sm`, `border-current`
>     inherited accent color) renders pixel-identical to its prior frozen
>     capture. grep: zero `GlassSurface`/`blur`/`backdrop-filter`/`rgba`/
>     `shadow`/`transition` string; the sole `animate-spin` occurrence is
>     the one documented, authorized exception; zero literal `.focus()`
>     calls; zero TODO/FIXME/`console.*`/unused imports. API: `size`
>     (xs/sm/md/lg/xl) · `color` (accent/neutral/success/warning/error/
>     info, optional, no default) · `label` · `disabled` · `className`.
>     ZERO frozen files modified (Spinner itself is not frozen; its 18
>     consumers' own source files were untouched). Proof: `/dev/spinner` —
>     basic · sizes · colors · inline · centered · with/without label ·
>     disabled · responsive · RTL · inside Button/Card/Drawer/
>     FullscreenOverlay; desktop/tablet/mobile + RTL captures;
>     programmatic assertions for role="status"/aria-live="polite", the
>     absence of role="progressbar"/aria-valuenow, strictly increasing
>     sizes (measured on the outer wrapper, not the spinning ring itself,
>     since a rotating element's own bounding rect is rotation-angle-
>     dependent even at a fixed layout size), 6 distinct colors plus the
>     `currentColor` default, custom vs default label, disabled dimming +
>     frozen spin, intrinsic size independent of viewport, and the RTL
>     wrapper. **Built, not frozen** — no automatic freeze; awaiting
>     explicit visual validation before any Freeze phase.
>   - **Skeleton — Flat primitive (token system, no glass role). Rebuilt
>     from a pre-methodology implementation onto the full analysis/build/
>     proof process. FROZEN (visually validated 2026-07-07, after a
>     Frozen-review pass).** No functional, visual or architectural change
>     again — objective bugs only; API changes require an ADR.
>     Frozen-review finding: the `circle` branch and the single-line
>     branch were two near-identical single-`<div>` returns differing only
>     in the resolved width/height — a genuine duplication. Collapsed into
>     one single-bar return (multi-line stays its own branch); behavior
>     byte-identical (re-verified: full proof green, build unchanged at
>     3.05 kB).
>     ```text
>     Flat primitives (token system, no glass role)
>     no GlassSurface / .ds-micro / .ds-control / .ds-card / .ds-floating / .ds-immersive
>     → Skeleton (composes nothing — a div, CSS, and tokens only)
>     Status: FROZEN
>     ```
>     A silent LAYOUT placeholder: reserves the exact space real content
>     will occupy while it loads, so the page's structure is visible
>     immediately and nothing shifts when data arrives — never signals
>     activity (Spinner), never a known fraction (Progress/
>     CircularProgress). Not Spinner (pure activity, reserves no space),
>     not Progress/CircularProgress (a known fraction of one task), not
>     FullscreenOverlay/Drawer loading (both compose Spinner, never
>     Skeleton, since their `children` content is arbitrary — Skeleton
>     needs to know the final layout in advance), not a Loading Overlay
>     (blocks/dims a region and shows a Spinner at its center — the
>     opposite of Skeleton, which reveals structure), not placeholder
>     text/"Lorem ipsum" (fake, readable text — Skeleton is deliberately
>     abstract, never a legible word), not an empty Card/Empty State (a
>     permanent, resolved absence of data — Skeleton signals a transient
>     "data is arriving"), not Alert/Toast (a permanent message / a
>     transient notification), not a Shimmer Loader (explicitly EXCLUDED —
>     a sliding gradient is decorative, never functionally necessary),
>     not a Pulse Loader (an activity-signaling spinner variant, not this
>     file's own `animate-pulse`), not a Blur/Image Placeholder (an
>     image-specific technique needing a pre-existing low-res preview —
>     narrower than Skeleton). Composes NOTHING — no Radix, no other
>     component: a `div`, CSS, and tokens only, the simplest primitive in
>     this library. `circle` forces full/pill rounding regardless of
>     `radius`; `lines > 1` stacks that many text-line bars with the LAST
>     line at 60% width (verified: uniform width for all but the last,
>     ~60% for the last) — the near-universal skeleton-text convention.
>     `width`/`height` accept a number (px) or any CSS length string;
>     omitted, they default to a full-width single-text-line shape (`100%`
>     × `var(--ds-space-4)`, 16px) or a `var(--ds-space-7)` (40px) square
>     when `circle` is set with neither dimension given — never a raw
>     literal (ESLint's `no-restricted-syntax` caught and corrected two
>     initial raw-px defaults during validation). `animated` defaults to
>     `true` (`animate-pulse motion-reduce:animate-none`, the ONE
>     authorized animation — verified: `animation-name` is `pulse` when
>     animated, `none` when not); no shimmer, no gradient, no custom
>     keyframe. Marked `aria-hidden`, no role, no tabindex (verified) —
>     represents absent content, never focusable, never announces
>     progress. One frozen file's single call site updated as a direct,
>     mechanical, zero-visual-difference consequence of the new API
>     replacing the old `shape` enum: Breadcrumb's
>     `<Skeleton shape="text" className="h-4 w-16" />` (64×16px,
>     `rounded-sm`) became `<Skeleton width={64} height={16} radius="sm" />`
>     (the exact same computed pixels — verified via a byte-for-byte
>     visual comparison of Breadcrumb's own loading capture, before and
>     after). One non-frozen file (`showcase.tsx`, the generic dev
>     components gallery) updated for the same reason. grep: zero
>     `GlassSurface`/`blur`/`backdrop-filter`/`rgba`/`shadow`/`transition`
>     string; the sole `animate-pulse` occurrence is the one authorized
>     exception; zero literal `.focus()` calls; zero TODO/FIXME/
>     `console.*`/unused imports. API: `width` · `height` · `radius`
>     (none/sm/md/lg/full) · `circle` · `lines` · `animated` ·
>     `className`. ZERO other frozen files modified. Proof:
>     `/dev/skeleton` — basic · rectangle · circle · text · multiple
>     lines · avatar · card · table · list · dashboard · article · image
>     · responsive · RTL · animated · static; desktop/tablet/mobile + RTL
>     captures; programmatic assertions for aria-hidden/no role/no
>     tabindex, exact width/height, circle equal dimensions + full
>     rounding, 4 distinct radius values, multi-line count + the 60%
>     last-line rule, animated vs static `animation-name`, responsive
>     width following the container at any viewport, and the RTL
>     wrapper. **FROZEN (2026-07-07)** — public API locked (`width`/
>     `height`/`radius`/`circle`/`lines`/`animated`/`className`); no
>     further redesign or API change without an ADR; changes only for an
>     objective bug from here on.
>   - **EmptyState — Flat primitive (token system, no glass role),
>     composes only the frozen Heading + Text. FROZEN (visually validated
>     2026-07-07, after a Frozen-review pass).** No functional, visual or
>     architectural change again — objective bugs only; API changes
>     require an ADR. Frozen-review finding: the centered description
>     carried both `items-center` (on the flex-col parent) and a redundant
>     `mx-auto` on the `<p>` — two mechanisms centering the same block.
>     Removed `mx-auto`; behavior byte-identical (verified: centered
>     description 0.008px off-center, full proof green, build unchanged at
>     6.84 kB).
>     ```text
>     Flat primitives (token system, no glass role)
>     no GlassSurface / .ds-micro / .ds-control / .ds-card / .ds-floating / .ds-immersive
>     → EmptyState (frozen Heading + Text; caller's Icon/Button rendered verbatim)
>     Status: FROZEN
>     ```
>     A MEANINGFUL absence of content or result, that also points the user
>     at the next action: "there is deliberately nothing here (yet), and
>     here is what to do about it." NEVER a loading state, a blocking
>     error, a notification, or progress. Not an Alert (a message ABOUT
>     existing content — a strip layered onto a populated view; EmptyState
>     IS the view when there is no content), not a Toast (a transient
>     auto-dismissing notification — EmptyState is permanent for as long
>     as the region stays empty), not a Skeleton (a placeholder for
>     content that IS coming, milliseconds away — EmptyState is the
>     resolved, final answer that nothing is there), not a Spinner/
>     Progress/CircularProgress (activity / a known fraction in flight —
>     EmptyState is the opposite: the task is done and its result is
>     empty), not an ErrorState (a FAILURE, often retryable — EmptyState
>     is a SUCCESS whose result set happens to be empty, or a pristine
>     first-run), not an OfflineState (a connectivity failure, a kind of
>     ErrorState), not a NoPermission state (an authorization BLOCK — the
>     content exists but you may not see it), not a Card (a container for
>     content that exists — EmptyState is what a Card shows INSTEAD of
>     content), not a bare empty Table/List/Dashboard/Search result (those
>     are the CONTEXTS that render an EmptyState in their empty branch —
>     EmptyState is the reusable body they share), not placeholder text
>     (fake filler — EmptyState is honest, purpose-built copy). The many
>     families (no results, no data, no clients, no sessions, no programs,
>     no notifications, no conversations, first-run) are ONE
>     responsibility wearing different copy/icons — content variations a
>     consumer passes in, never separate components. Does NOT compose
>     Modal/Drawer/Card/Alert (it is content those may contain, never the
>     reverse). Composes only the frozen Heading and Text; renders a
>     caller-supplied `icon` and `action` node (typically the frozen Icon
>     and Button) verbatim — no icon/button logic of its own. Purely
>     informative and STATIC: no role on the container (the optional
>     `action` Button keeps its own semantics), zero motion, zero glass,
>     zero transition/animation. `align` uses logical `start` so a
>     left-aligned state follows `dir="rtl"` naturally with no directional
>     code (verified: computed `direction: rtl`, left-aligned icon hugs
>     the start edge). Sizes sm/md/lg scale the icon, title level (h5/h4/
>     h3), description size and padding together (verified: title
>     font-size strictly increases). Responsive: `w-full`, content
>     re-centers with no JS measuring (verified: the centered icon stays
>     within 2px of the container center at 1280px and 390px). grep: zero
>     `GlassSurface`/`blur`/`backdrop-filter`/`rgba`/`shadow`/`transition`/
>     `animation`/`animate-`/`.focus()` string; zero TODO/FIXME/
>     `console.*`/unused imports. API: `title` · `description` · `icon` ·
>     `action` · `size` (sm/md/lg) · `align` (center/left) · `className`
>     (+ native div attributes). ZERO frozen files modified. Proof:
>     `/dev/empty-state` — basic · icon · with/without action · sm/md/lg ·
>     centered/left · inside table · inside list · no results · no
>     sessions · no programs · gallery · first use · RTL; desktop/tablet/
>     mobile + RTL captures; programmatic assertions for title/description
>     rendering, icon present/absent, action present/absent, strictly
>     increasing title sizes, center vs logical-start alignment, responsive
>     centering at two viewports, RTL direction, and the static (no
>     animation) guarantee. **FROZEN (2026-07-07)** — public API locked
>     (`title`/`description`/`icon`/`action`/`size`/`align`/`className`);
>     no further redesign or API change without an ADR; changes only for
>     an objective bug from here on.
>   - **ErrorState — Flat primitive (token system, no glass role),
>     composes only the frozen Heading + Text. FROZEN (visually validated
>     2026-07-07, after a Frozen-review pass and the content-only/
>     real-glass-surface refactor).** No functional, visual or
>     architectural change again — objective bugs only; API changes
>     require an ADR. Frozen-review found no dead code, no unused imports/
>     props, no internal duplication (the sizeConfig shape shared with the
>     frozen EmptyState is a cross-component similarity, not extractable
>     without an ADR); the component was already content-only, so the
>     freeze locks it unchanged.
>     ```text
>     Flat primitives (token system, no glass role)
>     no GlassSurface / .ds-micro / .ds-control / .ds-card / .ds-floating / .ds-immersive
>     → ErrorState (frozen Heading + Text; caller's Icon/Button rendered verbatim; text-error icon tint)
>     Status: FROZEN
>     ```
>     A view or operation that FAILED to load — the user momentarily
>     cannot proceed, and here is how to recover (typically Retry). NEVER
>     an absence of data, a loading state, progress, a confirmation, a
>     notification, a denied permission, or a lost connection. Not an
>     EmptyState (a SUCCESS whose result set is simply empty, or a pristine
>     first-run — no failure occurred; ErrorState is a FAILURE, recovery is
>     usually retrying not creating), not an Alert (a message layered ON a
>     populated view; ErrorState IS the view when the view itself failed),
>     not a Toast (a transient auto-dismissing notification; ErrorState is
>     permanent until retry/navigation), not a Spinner/Skeleton/Progress/
>     CircularProgress (activity / placeholder / a fraction while IN
>     FLIGHT — ErrorState is the terminal state AFTER the attempt failed),
>     not an OfflineState (a narrower network-only sibling), not a
>     NoPermission state (an authorization BLOCK — the request succeeded,
>     you simply may not see it), not a MaintenanceState (planned whole-app
>     downtime with an ETA — ErrorState is unplanned, local, retryable),
>     not a bare empty Dashboard/Card/Search (those show an EmptyState in
>     their empty branch — ErrorState is their FAILED branch). The
>     families — server error (5xx), load failed, not found (404),
>     temporary network error, unknown error — are ONE responsibility
>     (expected content could not be loaded + a way to recover) wearing
>     different copy/icons, never separate components. **A CONTENT
>     primitive, NOT a surface: ErrorState draws NO surface of its own —
>     no background, no shadow, no radius, no border, no glass, no
>     material. It is not a Card. ALL visual material comes from the
>     parent surface it fills (GlassCard/GlassPanel/Drawer/Modal/
>     FullscreenOverlay/Page). In DISCIPLINE, surfaces are an
>     ARCHITECTURAL level (Liquid Glass material) and states
>     (EmptyState/ErrorState/OfflineState/NoPermission…) are a CONTENT
>     level — giving a state its own surface would duplicate material and
>     weaken the identity. The root is a transparent flex column
>     (spacing/alignment tokens only, never `bg-*`/`shadow`/`rounded`/
>     `border`). Demos place it inside REAL Liquid Glass surfaces
>     (GlassCard/GlassPanel/a real Drawer/a real FullscreenOverlay) on the
>     shared capture wallpaper, never a dedicated opaque card — the glass
>     material and the wallpaper refracting through it produce the
>     "embedded on a real screen" reading.** Does NOT compose
>     Modal/Drawer/Alert/Toast, and deliberately does NOT compose the
>     frozen EmptyState despite the adjacent layout: distinct
>     responsibilities (failure vs. empty), EmptyState is frozen (coupling
>     would block ErrorState's own evolution behind an ADR), and the brief
>     scopes composition to the primitives directly. Composes only the
>     frozen Heading and Text; renders a caller-supplied `icon` and Retry
>     `action` (typically the frozen Icon and Button) verbatim. Its ONE
>     semantic distinction from EmptyState: the icon is tinted `text-error`
>     (the universal "failure" signal, read at a glance) rather than the
>     neutral tertiary of an empty state — a meaningful, non-decorative
>     token, matching the frozen Alert's own tone+icon precedent (verified:
>     the icon's computed color differs from the body color). Purely
>     informative and STATIC: no role on the container (the optional Retry
>     Button keeps its own native semantics — no auto-focus, no keyboard
>     trap), zero motion, zero glass, zero transition/animation. `align`
>     uses logical `start` so a left-aligned state follows `dir="rtl"`
>     naturally (verified: computed `direction: rtl`). Sizes sm/md/lg scale
>     the icon, title level (h5/h4/h3), description size and padding
>     together (verified: title font-size strictly increases). Responsive:
>     `w-full`, re-centers with no JS measuring (verified: centered icon
>     within 2px of the container center at 1280px and 390px). grep: zero
>     `GlassSurface`/`blur`/`backdrop-filter`/`rgba`/`shadow`/`transition`/
>     `animation`/`animate-`/`.focus()` string; zero TODO/FIXME/
>     `console.*`/unused imports. API: `title` · `description` · `icon` ·
>     `action` · `size` (sm/md/lg) · `align` (center/left) · `className`
>     (+ native div attributes). ZERO frozen files modified. Proof:
>     `/dev/error-state` — basic · retry · without action · sm/md/lg ·
>     centered · inline · inside card/table/list · dashboard · server
>     error · load failed (network) · unknown error · RTL; desktop/tablet/
>     mobile + RTL captures; programmatic assertions for title/description
>     rendering, the error-tinted icon (computed color ≠ body color), Retry
>     present/absent, strictly increasing title sizes, center vs
>     logical-start alignment, responsive centering at two viewports, RTL
>     direction, and the static (no animation) guarantee. **FROZEN
>     (2026-07-07)** — public API locked (`title`/`description`/`icon`/
>     `action`/`size`/`align`/`className`); no further redesign or API
>     change without an ADR; changes only for an objective bug from here
>     on.
>   - **OfflineState — Flat primitive (token system, no glass role),
>     content-only, composes only the frozen Heading + Text. FROZEN
>     (visually validated 2026-07-07, after a Frozen-review pass —
>     content-only from the start, mirroring the frozen ErrorState; no
>     dead code, no unused imports/props, no internal duplication; locked
>     unchanged).**
>     ```text
>     Flat primitives (token system, no glass role)
>     no GlassSurface / .ds-micro / .ds-control / .ds-card / .ds-floating / .ds-immersive
>     → OfflineState (frozen Heading + Text; caller's Icon/Button verbatim; text-warning icon tint)
>     Status: FROZEN
>     ```
>     A momentary inability to reach content because the APPLICATION HAS NO
>     NETWORK CONNECTION — and (usually) a way to retry once it returns.
>     NEVER a server error, a loading state, progress, an absence of data,
>     a denied permission, maintenance, or an unknown failure. Not an
>     ErrorState (a FAILURE — the request actually reached and failed;
>     OfflineState is the opposite: the request never left the device for
>     lack of connection — a different cause, a different action:
>     "reconnect" not "our servers are broken"), not an EmptyState
>     (a success with no data / a first-run — here nothing loaded BECAUSE
>     there is no network), not a Spinner/Skeleton/Progress/
>     CircularProgress (in-flight activity — OfflineState is terminal:
>     nothing can happen until connectivity returns), not an Alert (a
>     message on a working view; OfflineState IS the view when the region
>     can't load), not a Toast (a transient "you went offline" ping —
>     momentary), not a NoPermission (an authorization BLOCK — the network
>     is fine, the request succeeded), not a MaintenanceState (planned
>     server-side downtime with an ETA — here it's the user's OWN
>     connectivity), not a Retry Banner (a thin strip — OfflineState is the
>     full-region take), not a FullscreenOverlay (a SURFACE that may
>     CONTAIN one). Variants (connection lost, airplane mode, no
>     connection, reconnection pending) collapse to ONE responsibility:
>     absence of connectivity. **A CONTENT primitive, NOT a surface — the
>     exact frozen-ErrorState contract: draws no background/shadow/radius/
>     border/glass/material/Card; all material comes from the parent
>     surface it fills (GlassCard/GlassPanel/Drawer/Modal/
>     FullscreenOverlay/Page/Dashboard). Surfaces are architectural
>     (Liquid Glass), states are content — a state never carries its own
>     surface. Root is a transparent flex column (spacing/alignment tokens
>     only). Demos place it inside REAL glass surfaces (GlassCard/
>     GlassPanel/a real Drawer/a real Modal-Dialog/a real
>     FullscreenOverlay) on the shared capture wallpaper.** Does NOT
>     compose Modal/Drawer/Alert/Toast, and deliberately does NOT compose
>     the frozen ErrorState despite the identical layout (distinct
>     responsibilities: no-network vs. failure; ErrorState frozen —
>     coupling would block its evolution behind an ADR). Composes only the
>     frozen Heading and Text; renders a caller-supplied `icon` and Retry
>     `action` verbatim. Icon tinted `text-warning` (amber) — a deliberate
>     three-tier semantic: EmptyState neutral (nothing here) → OfflineState
>     amber (no network) → ErrorState red (failure), read at a glance
>     (verified: icon color ≠ body color, and ≠ ErrorState's red). Purely
>     informative and STATIC: no role on the container (Retry Button keeps
>     its native semantics — no auto-focus, no keyboard trap), zero motion,
>     zero glass, zero transition/animation. `align` uses logical `start`
>     (verified: `direction: rtl`). Sizes sm/md/lg scale together
>     (verified: title font-size strictly increases). Responsive: `w-full`,
>     re-centers with no JS measuring (verified: centered icon within 2px
>     at 1280px and 390px). grep: zero `GlassSurface`/`blur`/
>     `backdrop-filter`/`rgba`/`shadow`/`transition`/`animation`/`animate-`/
>     `.focus()` string; zero TODO/FIXME/`console.*`/unused imports. API:
>     `title` · `description` · `icon` · `action` · `size` (sm/md/lg) ·
>     `align` (center/left) · `className` (+ native div attributes). ZERO
>     frozen files modified. Proof: `/dev/offline-state` (on the capture
>     wallpaper, every example inside a real GlassCard/GlassPanel/Drawer/
>     Modal/FullscreenOverlay) — basic · retry · without action · sm/md/lg
>     · centered (GlassPanel) · inline · inside a real Drawer · inside a
>     real Dialog · inside a real FullscreenOverlay · dashboard · chat ·
>     gallery · files · RTL; desktop/tablet/mobile + RTL captures;
>     programmatic assertions for title/description rendering, the
>     warning-tinted icon (computed color ≠ body color), Retry present/
>     absent, strictly increasing title sizes, center vs logical-start
>     alignment, responsive centering at two viewports, RTL direction, and
>     the static (no animation) guarantee. **FROZEN (2026-07-07)** —
>     public API locked (`title`/`description`/`icon`/`action`/`size`/
>     `align`/`className`); no further redesign or API change without an
>     ADR; changes only for an objective bug from here on.
>   - **SuccessBanner — Feedback primitive that OWNS its surface. FROZEN
>     (visually validated 2026-07-08, after a Frozen-review pass — token-clean
>     from the build; no dead code, no unused imports/props, no internal
>     duplication, no arbitrary style; locked unchanged).**
>     ```text
>     Feedback (owns its surface — built from success tokens, not a glass role)
>     success-tint fill + success-border + text-success icon (all tokens)
>     → SuccessBanner (frozen Icon + Text + IconButton; caller's icon/action verbatim)
>     Status: FROZEN
>     ```
>     A PERSISTENT, IN-FLOW confirmation that an operation the user just
>     took SUCCEEDED and deserves to stay visible (a program published, a
>     session saved, a client created, a payment confirmed, a profile
>     updated). Exactly ONE responsibility: a standing, positive "this is
>     done" that lives in the page, pushes surrounding content, and
>     persists until the user dismisses it or the state changes. NEVER a
>     server error, a loading state, progress, an absence of data, a denied
>     permission, maintenance, or an unknown failure. Not a Toast (a
>     TRANSIENT, floating, auto-dismissing notification outside the flow —
>     SuccessBanner lives IN the flow and persists), not an Alert (the
>     generic multi-variant strip ABOUT the view — SuccessBanner is the
>     single positive success-only confirmation OF an action just taken;
>     the brief scopes it to NOT be/compose an Alert), not a Dialog
>     (blocking/modal — SuccessBanner never blocks or traps focus), not the
>     content-only states (EmptyState/ErrorState/OfflineState REPLACE a
>     region that could not show content — SuccessBanner sits ALONGSIDE
>     content that IS present), not a Progress/Spinner (in-flight —
>     SuccessBanner is the terminal positive outcome AFTER the work), not a
>     Snackbar/inline message or Notification Center. Variants (save,
>     publish, import, sync, payment) collapse to ONE responsibility.
>     **A Feedback primitive that OWNS its surface — the deliberate inverse
>     of the content-only states: a banner IS a surface element, a
>     success-tinted strip built ONLY from success tokens
>     (`bg-[var(--ds-color-success-tint)]`,
>     `border-[var(--ds-color-success-border)]`, `text-success` icon), a
>     token radius (`rounded-lg`) and token spacing — never a hard-coded
>     color, never GlassSurface/blur/backdrop-filter/shadow, never
>     motion.** Composes only the frozen Icon (caller supplies the check
>     icon), Text, and IconButton (dismiss) — never Toast/Alert/Card/
>     Dialog. `w-full` (follows parent width, no JS — verified: full vs.
>     half column tracked exactly); `role="status"` (aria-live polite)
>     announces success without an alert's urgency; horizontal flex so the
>     dismiss control flips under `dir="rtl"` (verified: `direction: rtl`,
>     action + dismiss still render); the dismiss IconButton keeps native
>     button semantics (no auto-focus, no trap) and self-hides the banner
>     (verified) + fires `onDismiss`. Two additive props, both justified:
>     `align` (left/center, the brief's Alignement section) and `onDismiss`
>     (a dismissible banner needs to observe dismissal). Sizes sm/md/lg
>     scale icon/title/description/padding together (verified: title
>     font-size strictly increases). Static: zero animation on the root,
>     ignoring composed buttons (verified). grep: zero `GlassSurface`/
>     `blur`/`backdrop-filter`/`rgba`/`shadow`/`transition`/`animation`/
>     `animate-`/`.focus()` string in the component (only in doc-comment
>     prose describing what it is NOT); zero TODO/FIXME/`console.*`/unused
>     imports; zero hard-coded hex/px/ms. API: `title` · `description` ·
>     `icon` · `action` · `dismissible` · `onDismiss` · `size` (sm/md/lg) ·
>     `align` (left/center) · `className` (+ native div attributes). ZERO
>     frozen files modified. Proof: `/dev/success-banner` (on the capture
>     wallpaper, shown directly in flow since it owns its surface) — basic
>     · with/without description · dismissible · with/without action ·
>     dismissible+action · sm/md/lg · program published · payment confirmed
>     · import completed · settings saved · responsive width · RTL, plus
>     `scripts/success-banner-proof.mjs` (desktop/tablet/mobile + RTL
>     captures; assertions for rendering, `role="status"`, tinted surface,
>     dismiss self-hide, action button, strictly increasing sizes,
>     responsive width, RTL direction, static). **FROZEN (2026-07-08)** —
>     public API locked (`title`/`description`/`icon`/`action`/`dismissible`/
>     `onDismiss`/`size`/`align`/`className`); no further redesign or API
>     change without an ADR; changes only for an objective bug from here on.
>   - **WarningBanner — Feedback primitive that OWNS its surface, the frozen
>     SuccessBanner's sibling. FROZEN (visually validated 2026-07-08, after a
>     Frozen-review pass — token-clean from the build; no dead code, no unused
>     imports/props, no internal duplication, no arbitrary style; locked
>     unchanged).**
>     ```text
>     Feedback (owns its surface — built from warning tokens, not a glass role)
>     warning-tint fill + warning-border + text-warning icon (all tokens)
>     → WarningBanner (frozen Icon + Text + IconButton; caller's icon/action verbatim)
>     Status: FROZEN
>     ```
>     Same Feedback family, same in-flow banner behavior as SuccessBanner,
>     opposite polarity. A PERSISTENT, IN-FLOW warning: a situation that
>     needs the user's ATTENTION without immediately blocking their work (a
>     subscription about to expire, an incomplete profile, storage almost
>     full, a payment renewing soon, an unpublished program, partially
>     synced data). Exactly ONE responsibility: warn of a RISK or a
>     recommended action, in the flow, without blocking. NEVER a failure,
>     never a block, never transient. Not a Toast/Snackbar (TRANSIENT,
>     floating, auto-dismissing, outside the flow — WarningBanner lives IN
>     the flow and persists until the risk is resolved or dismissed), not an
>     Alert (the generic multi-variant strip ABOUT the view — WarningBanner
>     is the single warning-only signal with its own warning tokens and an
>     optional recommended action; the brief scopes it to NOT be/compose an
>     Alert), not an Error Banner/ErrorState (a FAILURE, often blocking/
>     retryable — WarningBanner is the opposite: nothing failed, the work
>     continues), not an Info Banner (a neutral note with no notion of risk
>     — WarningBanner carries the amber "attention" charge and usually a
>     next step), not a Dialog (blocking/modal — never blocks or traps
>     focus), not an OfflineState (a CONTENT state that REPLACES a region —
>     WarningBanner sits ALONGSIDE content that IS present), not a Spinner
>     (in-flight — a stable condition), not an EmptyState (a meaningful
>     absence — accompanies present content), not a Notification Center (a
>     historical list — a single present warning in situ). Variants
>     (subscription expiring, storage almost full, profile incomplete, email
>     unverified, partial sync, program unpublished) collapse to ONE
>     responsibility. **A Feedback primitive that OWNS its surface — like
>     the frozen SuccessBanner and unlike the content-only states: a
>     warning-tinted strip built ONLY from warning tokens
>     (`bg-[var(--ds-color-warning-tint)]`,
>     `border-[var(--ds-color-warning-border)]`, `text-warning` icon), a
>     token radius (`rounded-lg`) and token spacing — never a hard-coded
>     color, never GlassSurface/blur/backdrop-filter/shadow, never
>     motion.** Composes only the frozen Icon (caller supplies the warning
>     icon), Text, and IconButton (dismiss) — never Alert/Toast/Card/Dialog;
>     deliberately does NOT compose the frozen SuccessBanner despite the
>     identical layout (distinct polarity: success vs. risk; SuccessBanner
>     frozen — coupling would block its evolution behind an ADR). `w-full`
>     (follows parent width, no JS — verified: full vs. half column tracked
>     exactly); `role="status"` (aria-live polite) surfaces the warning
>     WITHOUT the interrupting urgency of `role="alert"`, matching its
>     non-blocking nature; horizontal flex so the dismiss control flips
>     under `dir="rtl"` (verified: `direction: rtl`, action + dismiss
>     render); the dismiss IconButton keeps native button semantics (no
>     auto-focus, no trap) and self-hides the banner (verified) + fires
>     `onDismiss`. Icon tinted `text-warning` (amber) — a meaningful,
>     non-decorative token distinct from the neutral body color (verified).
>     Two additive props, both justified: `align` (left/center, the brief's
>     Alignement section) and `onDismiss`. Sizes sm/md/lg scale icon/title/
>     description/padding together (verified: title font-size strictly
>     increases). Static: zero animation on the root, ignoring composed
>     buttons (verified). grep: zero `GlassSurface`/`blur`/`backdrop-filter`/
>     `rgba`/`shadow`/`transition`/`animation`/`animate-`/`.focus()` string
>     in the component (only in doc-comment prose describing what it is NOT);
>     zero TODO/FIXME/`console.*`/unused imports; zero hard-coded hex/px/ms.
>     API: `title` · `description` · `icon` · `action` · `dismissible` ·
>     `onDismiss` · `size` (sm/md/lg) · `align` (left/center) · `className`
>     (+ native div attributes). ZERO frozen files modified. Proof:
>     `/dev/warning-banner` (on the capture wallpaper, shown directly in
>     flow since it owns its surface) — basic · with/without description ·
>     dismissible · with/without action · dismissible+action · sm/md/lg ·
>     dashboard · subscription expiring · storage almost full · profile
>     incomplete · program unpublished · partial sync · responsive width ·
>     RTL, plus `scripts/warning-banner-proof.mjs` (desktop/tablet/mobile +
>     RTL captures; assertions for rendering, `role="status"`, tinted
>     surface + tinted icon, dismiss self-hide, action button, strictly
>     increasing sizes, responsive width, RTL direction, static). **FROZEN
>     (2026-07-08)** — public API locked (`title`/`description`/`icon`/
>     `action`/`dismissible`/`onDismiss`/`size`/`align`/`className`); no
>     further redesign or API change without an ADR; changes only for an
>     objective bug from here on.
>   - **ErrorBanner — Feedback primitive that OWNS its surface, the third
>     banner sibling. FROZEN (visually validated 2026-07-08, after a
>     Frozen-review pass — token-clean from the build; no dead code, no unused
>     imports/props, no internal duplication, no arbitrary style; locked
>     unchanged).**
>     ```text
>     Feedback (owns its surface — built from error tokens, not a glass role)
>     error-tint fill + error-border + text-error icon (all tokens)
>     → ErrorBanner (frozen Icon + Text + IconButton; caller's icon/action verbatim)
>     Status: FROZEN
>     ```
>     The third sibling of the Feedback banner family (SuccessBanner +
>     WarningBanner, both frozen); same in-flow banner behavior, a graver
>     polarity. A PERSISTENT, IN-FLOW, NON-MODAL error: an important failure
>     about the CURRENT context, surfaced in the flow, that does NOT warrant
>     a modal interruption (couldn't publish, payment declined, sync failed,
>     import interrupted, save failed, quota exceeded). Exactly ONE
>     responsibility: durably inform of an error tied to the current context
>     WITHOUT interrupting the flow. Not an ErrorState (a CONTENT state that
>     REPLACES a whole region that could not load — it IS the view;
>     ErrorBanner sits ALONGSIDE content that IS present and working,
>     reporting one failed operation, and unlike the surface-less ErrorState
>     it OWNS its error-tinted surface), not a WarningBanner (a RISK —
>     nothing failed yet; ErrorBanner is an actual failure), not a
>     SuccessBanner (opposite polarity), not a Toast/Snackbar (TRANSIENT,
>     floating, auto-dismissing, outside the flow — an error must not vanish
>     on its own; ErrorBanner persists until resolved or dismissed), not an
>     Alert (the generic multi-variant strip ABOUT the view — ErrorBanner is
>     the single error-only signal with its own error tokens and an optional
>     recovery action; the brief scopes it to NOT be/compose an Alert), not
>     an AlertDialog/Dialog (blocking/modal, demanding a decision first —
>     ErrorBanner never blocks or traps focus, important but NON-MODAL), not
>     an OfflineState (a connectivity CONTENT state that REPLACES a region),
>     not a Spinner (in-flight — ErrorBanner is the terminal state AFTER the
>     attempt failed), not a Notification Center (a historical list — a
>     single present error in situ). Variants (save failed, payment
>     declined, publish failed, import failed, sync failed, quota exceeded)
>     collapse to ONE responsibility. **A Feedback primitive that OWNS its
>     surface — like its frozen banner siblings and unlike the content-only
>     states: an error-tinted strip built ONLY from error tokens
>     (`bg-[var(--ds-color-error-tint)]`,
>     `border-[var(--ds-color-error-border)]`, `text-error` icon), a token
>     radius (`rounded-lg`) and token spacing — never a hard-coded color,
>     never GlassSurface/blur/backdrop-filter/shadow, never motion.**
>     Composes only the frozen Icon (caller supplies the error icon), Text,
>     and IconButton (dismiss) — never Toast/Alert/Card/Dialog; deliberately
>     does NOT compose the frozen SuccessBanner/WarningBanner despite the
>     identical layout (distinct polarity: failure vs. risk vs. success; both
>     frozen — coupling would block their evolution behind an ADR). `w-full`
>     (follows parent width, no JS — verified: full vs. half column tracked
>     exactly); horizontal flex so the dismiss control flips under `dir="rtl"`
>     (verified: `direction: rtl`, action + dismiss render). **`role="alert"`
>     (aria-live assertive) is the appropriate role for a persistent,
>     non-modal error — announced assertively without seizing focus or
>     blocking, completing the three-tier semantic (Success/Warning polite
>     `role="status"` → Error assertive `role="alert"`; verified the banner
>     uses `role="alert"`, NOT `role="status"`).** The dismiss IconButton
>     keeps native button semantics (no auto-focus, no trap) and self-hides
>     the banner (verified) + fires `onDismiss`. Icon tinted `text-error`
>     (red) — a meaningful, non-decorative token distinct from the neutral
>     body color (verified), the graver tier below WarningBanner's amber. Two
>     additive props, both justified: `align` (left/center, the brief's
>     Alignement section) and `onDismiss`. Sizes sm/md/lg scale icon/title/
>     description/padding together (verified: title font-size strictly
>     increases). Static: zero animation on the root, ignoring composed
>     buttons (verified). grep: zero `GlassSurface`/`blur`/`backdrop-filter`/
>     `rgba`/`shadow`/`transition`/`animation`/`animate-`/`.focus()` string
>     in the component (only in doc-comment prose describing what it is NOT);
>     zero TODO/FIXME/`console.*`/unused imports; zero hard-coded hex/px/ms.
>     API: `title` · `description` · `icon` · `action` · `dismissible` ·
>     `onDismiss` · `size` (sm/md/lg) · `align` (left/center) · `className`
>     (+ native div attributes). ZERO frozen files modified. Proof:
>     `/dev/error-banner` (on the capture wallpaper, shown directly in flow
>     since it owns its surface) — basic · with/without description ·
>     dismissible · with/without action · dismissible+action · sm/md/lg ·
>     dashboard · payment failed · import failed · publish failed · sync
>     failed · quota exceeded · responsive width · RTL, plus
>     `scripts/error-banner-proof.mjs` (desktop/tablet/mobile + RTL captures;
>     assertions for rendering, `role="alert"` not `role="status"`, tinted
>     surface + tinted icon, dismiss self-hide, action button, strictly
>     increasing sizes, responsive width, RTL direction, static). **FROZEN
>     (2026-07-08)** — public API locked (`title`/`description`/`icon`/
>     `action`/`dismissible`/`onDismiss`/`size`/`align`/`className`); no
>     further redesign or API change without an ADR; changes only for an
>     objective bug from here on.
>   - **Badge — Data Display primitive, REBUILT to the full process (Built,
>     not frozen).**
>     ```text
>     Data Display — a MICRO-FRAGMENT of Liquid Glass (material in badge.css)
>     .ds-badge (translucent glass + hairline machined edge) + data-variant/appearance
>     → Badge (caller's icon verbatim; static <span>, never interactive)
>     Status: FROZEN (visually validated 2026-07-08)
>     ```
>     **FROZEN (2026-07-08)** after the rebuild + Liquid-Glass craft pass +
>     simplification pass. Public API locked (`variant` neutral/success/
>     warning/error · `appearance` soft/solid/outline · `size` sm/md · `icon`
>     · `className`); no further redesign or API change without an ADR.
>     **Simplification pass (2026-07-08): coherence over API surface.**
>     Palette reduced to the four TRUE semantic colours (neutral/success/
>     warning/error; `info` dropped) — business properties (Coach/Premium/
>     Draft/Hypertrophy) all wear the neutral glass, so a screen reads as one
>     restrained material, not a swatch board. Solid fills deepened +
>     desaturated (near-black/deep forest/deep amber/deep oxblood —
>     Apple/Linear/GitHub). `shape` prop removed (ALWAYS a pill). Sizes cut to
>     `sm`/`md`. Icon ~1px larger, text still dominant. Demo pruned to
>     behaviourally-distinct sections. API now `variant` (neutral/success/
>     warning/error) · `appearance` (soft/solid/outline) · `size` (sm/md) ·
>     `icon` · `className`. Responsibilities/composition/accessibility/logic/
>     non-interactive contract unchanged. Proof re-run green (34 badges).
>
>     **Craft pass (2026-07-08): full Liquid-Glass refonte.** The material was
>     moved into a dedicated `.ds-badge` class in the new
>     `src/styles/badge.css` (Construction rule, like `.ds-glass`/`.ds-micro`)
>     — a translucent, faintly-lit glass surface with a hairline machined edge
>     and a light backdrop blur, colour carried by the text/icon + a whisper of
>     tint. `soft` near-neutral, `outline` bare glass + coloured hairline,
>     `solid` the one strong voice (near-black/deep). Desaturated palette;
>     `info` = restrained DISCIPLINE primary. Geometry breathes more,
>     `font-semibold` type, crisp 8px `rounded` (no candy). API/props/logic/
>     behaviour/accessibility/variants UNCHANGED; component stays grep-clean
>     (material in badge.css). Proof re-run green.
>     Rebuilt from a pre-methodology implementation (previously undocumented,
>     bundled with Alert/Avatar/Code/…) to the full analysis/build/proof
>     process. A SMALL, STATIC piece of information ATTACHED to a datum: a
>     short property that qualifies existing content (Active, Premium, Draft,
>     Paid, Coach, Beginner, Hypertrophy, "12 clients"). Exactly ONE
>     responsibility: display a compact property tied to a datum. Purely
>     informative, NEVER interactive, never stands alone. Not a Chip
>     (INTERACTIVE — selectable/removable/filter, focus+keyboard+close; Badge
>     is never clickable, no tabindex/focus/role), not a Tag (an input Chip —
>     typed keywords; Badge is not entered/removed), not a Pill (a SHAPE, not
>     a responsibility — Badge offers `shape="pill"` but isn't defined by it),
>     not a Label (a form caption `<label for>`; Badge describes a datum, not
>     a field), not a StatusDot (a bare dot with no text — Badge always
>     labels, color is never alone), not a Counter/Notification badge (a
>     number OVERLAID in a corner — a numeric Badge is inline, not a floating
>     overlay), not an Avatar (a person), not a Button (an ACTION), not
>     Tabs/Stepper/Breadcrumb (navigation/progression/position), not a
>     Progress (an evolving fraction — Badge is static, no track/value).
>     Families (status, category, numeric, role, priority, version) collapse
>     to ONE responsibility. Composes only typography tokens, a caller-
>     supplied `icon` (typically the frozen Icon), and color tokens — never
>     Button/Card/Alert/Toast/Chip. Three orthogonal token-driven axes:
>     `variant` (semantic color), `appearance` (soft tint / solid fill /
>     outline), `shape` (rounded / pill / square). Draws NO glass/blur/shadow,
>     never a hard-coded color, entirely STATIC — no transition, no animation,
>     no focus (verified: 54 badges carry no role, no tabindex, are `<span>`s,
>     not focusable, `animation-name: none`; a Badge must never be made
>     clickable). `inline-flex` on the datum's baseline; the optional icon
>     precedes the label and flips under `dir="rtl"` via flex (verified:
>     `direction: rtl`). Appearances verified (soft translucent 0<alpha<1,
>     solid opaque alpha 1, outline no bg + visible border); sizes xs/sm/md/lg
>     scale height (verified strictly increasing) and the Badge keeps its
>     exact size across viewports — never resizes (verified: identical height
>     at 1280px/390px); shapes verified (square ≈0 < rounded < pill). Rebuild
>     migration: the sole non-frozen demo on the dropped legacy
>     `variant="accent"` (`/dev/components` gallery) → `info` (same `#6c5ce7`
>     token); every other consumer used only the preserved surface and is
>     unaffected. grep: zero `GlassSurface`/`blur`/`backdrop-filter`/`rgba`/
>     `shadow`/`transition`/`animation`/`animate-`/`.focus()` string in the
>     component (only in doc-comment prose); zero TODO/FIXME/`console.*`/
>     unused imports; zero hard-coded hex/px/ms. API: `variant`
>     (neutral/success/warning/error/info) · `appearance` (soft/solid/outline)
>     · `size` (xs/sm/md/lg) · `shape` (rounded/pill/square) · `icon` ·
>     `className` (+ native span attributes). ONE non-frozen demo migrated
>     (showcase gallery); ZERO frozen files modified. Proof: `/dev/badge` (on
>     the capture wallpaper, badges inside real GlassCard/table/list surfaces)
>     — basic · variants · soft/solid/outline · with/without icon · sizes ·
>     shapes · status · role · priority · category · count · inside
>     Card/Table/List · responsive · RTL, plus `scripts/badge-proof.mjs`
>     (desktop/tablet/mobile + RTL captures; assertions for rendering,
>     variants, appearances, sizes, shapes, icon presence, the non-interactive
>     contract, size-stability, RTL). **Built, non frozen** — freeze forbidden
>     until explicit visual validation.
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
