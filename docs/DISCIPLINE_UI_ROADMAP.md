# DISCIPLINE — UI LIBRARY ROADMAP

Status of every component in the Design System. Governed by the Constitution and
the Glass Grammar (roles). Legend:

- **FROZEN** — validated + frozen; changes only for an objective bug.
- **Built** — implemented and in use; part of a validated role family, not yet
  individually frozen.
- **Reference** — a validated `/dev` reference exists, but no reusable library
  component is exported yet.
- **Planned** — not started.

Last updated: 2026-07-01.

---

## Material engine (shared by all glass roles)

| Component | Role | Status | Notes |
|---|---|---|---|
| `GlassSurface` | — (renders the frozen optical stack) | **FROZEN** | The single source of the Liquid Glass material. Never duplicated. |
| `.ds-micro` / `.ds-control` / `.ds-card` / `.ds-floating` / `.ds-immersive` | role expressions (glass.css / micro.css) | **FROZEN** | The five Material Roles, promoted verbatim. Never re-tuned per component. |

---

## Micro Surface — `.ds-micro`

Small tactile controls acted on directly (high Fresnel, concentrated light, low
transmission).

| Component | Status | Notes |
|---|---|---|
| `Button` | **FROZEN** | The official Micro reference (`docs/DISCIPLINE_BUTTON_REFERENCE.md`). |
| `IconButton` | Built | Shares `buttonVariants` — same frozen Micro impl. |
| `LinkButton` | Built | Shares `buttonVariants` — anchor variant. |
| `Checkbox` | Built (not frozen) | **Audited + minimal rebuild 2026-07-02** — the canonical small Micro control: GlassSurface → Micro Surface → Checkbox. The full Micro glass lives on Button (≥34px); at 20px the Glass Budget (§3) leaves near-zero presence, so the small members share ONE expression — new `micro-control.tsx` (token box · accent active fill · dark glyph · fast motion · disabled dim · invalid rim) + the GLOBAL `:focus-visible` ring. checkbox.tsx contains zero material/shadow/blur/focus/transition strings (grep-proof). On Radix Checkbox. API: label · description · error · helperText · invalid · readOnly · required · labelPosition · checked/defaultChecked (incl. `indeterminate`, now data-state-driven — uncontrolled-safe) · onCheckedChange + `CheckboxGroup` (fieldset: label · description · error · helperText · required · disabled/invalid propagated via context). Base for CheckboxGroup/TreeView/permissions/settings/filters/tables/forms/palette options. Proof: `/dev/checkbox` (states · groups · nested mixed parent · permissions matrix; desktop/tablet/mobile + focus/Space captures). |
| `Switch` | Built | Micro member. |
| `RadioGroup` / `RadioItem` | Built | Micro member. |
| `Slider` | Built | Micro member (thumb). |

## Control Surface — `.ds-control`

Controls you read and fill (maximum legibility; the glass recedes).

| Component | Status | Notes |
|---|---|---|
| `Input` | **FROZEN** | The official Control reference (`/dev/input`). Role fixed by Grammar §2/§5 — not Micro. |
| `Textarea` | **FROZEN** | Multiline sibling of Input (same parent `ControlSurface`, material verbatim). Production API: label · description · helperText · error · success · required · maxLength · showCharacterCount · autoResize (minRows/maxRows → grow then scroll) · disabled · readOnly. Proof: `/dev/textarea`. Visually validated + frozen 2026-07-01. |
| `Select` / `NativeSelect` | **FROZEN** | Field-level dropdown, **sibling of Input** (GlassSurface → .ds-control → ControlSurface → Select — NOT derived from Input). Closed trigger composes `controlHostClass` + `<ControlSurface/>` → indistinguishable from Input/Textarea/SearchInput. On Radix Select. API: label · description · placeholder · helperText · error · success · required · disabled · readOnly · loading · value · defaultValue · onValueChange · options[] (value/label/icon/description/disabled) or `Select.Item` children; chevron rotates on open; menu is a token raised surface (not glass) — suspended floating sheet (`shadow-4` + `sideOffset 8`), near-white selected row (violet ✓ + `font-medium`, whisper highlight), more air (`p-1.5` / `py-2.5` / `gap-3`). Proof: `/dev/select`. Visually validated + frozen 2026-07-01. |
| `DatePicker` | **FROZEN** | Visually validated + frozen 2026-07-01. Field is a Control Surface (**sibling of Input/Select**: GlassSurface → .ds-control → ControlSurface → DatePicker) — closed, indistinguishable from Input/Textarea/SearchInput/Select. The **calendar is a Floating Surface** (GlassSurface → .ds-floating → FloatingSurface — the reusable Floating glass base, first production consumer). Field owns value/placeholder/open; calendar (react-day-picker) owns grid/keyboard/nav. API: label · description · placeholder · helperText · error · success · required · disabled · readOnly · value · defaultValue · minDate · maxDate · locale · format · onChange · name. Full keyboard nav + ARIA (combobox trigger → dialog overlay → grid). Proof: `/dev/date-picker`. |
| `SearchInput` | **FROZEN** | Search **specialization of Input** (GlassSurface → .ds-control → ControlSurface → Input → SearchInput): renders `<Input>` + search affordances only. API: label · description · helperText · error · success · clearable · loading · shortcut · debounce · onSearch · onClear · disabled · readOnly; Escape clears; `role="search"`. Proof: `/dev/search-input`. Visually validated + frozen 2026-07-01 (quieter ⌘K chip + softer clear button). |
| `FileInput` | **FROZEN** | Visually validated + frozen 2026-07-02. Production file-selection Control Surface, **sibling of Input** (GlassSurface → .ds-control → ControlSurface → FileInput; Textarea precedent: same glass, taller centered well — no new material, drag-over reuses the frozen `--focus` violet). Owns only interaction: browse/drop/paste, accept/maxSize/maxFiles validation + `onReject`, previews (image/video object-URL thumb, PDF/generic icon), removal via existing `IconButton`, upload via existing `Progress`, sr-only live announcements. API: label · description · helperText · error · success · disabled · required · readOnly · multiple · accept · maxFiles · maxSize · dragAndDrop · showPreview · showFileSize · showFileType · showRemoveButton · showProgress · progress · files/defaultFiles (controlled/uncontrolled) · onFilesChange · onReject · name. Proof: `/dev/file-input` (desktop/tablet/mobile). |

## Structural Surface — `.ds-card`

Large planes that hold and organize content.

| Component | Status | Notes |
|---|---|---|
| `GlassCard` | **FROZEN** | Structural reference (the validated Card) + base consumer of `.ds-card`. |
| `GlassPanel` | Built | Generic large Structural panel. |
| `FloatingCard` | Built | Elevated card (Depth axis only). |
| `Navbar` | **FROZEN** | Top navigation. |
| `Footer` | **FROZEN** | Page footer. |
| `Sidebar` | **FROZEN** | Vertical navigation rail. |
| `BottomNav` | **FROZEN** | Mobile bottom navigation. |

## Floating Surface — `.ds-floating`

Transient glass that appears, informs, dismisses.

| Component | Status | Notes |
|---|---|---|
| `FloatingSurface` (helper) | Built | Reusable Floating glass base (`floating-surface.tsx`), mirrors `ControlSurface`: renders `.ds-floating` + `<GlassSurface/>`, no new material. Also owns the family geometry extensions (`floating-surface.css`): the shared entrance animation (`ds-floating-enter`), the shared arrow/tail (`ds-floating-arrow`, Tooltip-reference tail, drop-tail radius), the anchored-overlay lift (`ds-floating-lift`, one added soft lower halo — frozen shadow untouched) and the shared size scale (`floatingSizeClass` xs·224/sm·288/md·320/lg·384). Consumers: DatePicker calendar, Popover; DropdownMenu/ContextMenu/Command Palette next. |
| `Tooltip` | **FROZEN** | Floating reference (production Tooltip is the inverted §12.11 chip; the `.ds-floating` glass is validated in `/dev/tooltip`). |
| `Popover` | **FROZEN** | Visually validated + frozen 2026-07-02. First generalized Floating member: GlassSurface → .ds-floating → FloatingSurface → **Popover**. Headless compound API on Radix (`Popover` + `.Trigger`/`.Anchor`/`.Content`/`.Close`/`.Arrow`); declares NO material — pane = `floatingHostClass` + `<FloatingSurface/>`, entrance = shared `ds-floating-enter` (150ms opacity/translateY/scale, system ease-out), arrow = shared `ds-floating-arrow` (Tooltip-reference tail, radius eased to a drop-tail), lift = shared `ds-floating-lift` (one added soft lower halo, ~10%, frozen shadow untouched). Craft pass 2026-07-02: `sideOffset` 8→10, padding `p-4`→`px-4 py-5`, and the shared **Floating size scale** `size` xs·224 / sm·288 (default) / md·320 / lg·384 (`floatingSizeClass` — UserMenu/Notifications/CommandPalette/pickers reuse it). Owns only behavior: portal, side/align/offsets, collision (flip+shift, `collisionPadding`), `sticky`, `hideWhenDetached`, `modal` (focus trap + scroll lock), Escape/outside dismiss, focus return, `forceMount`. Proof: `/dev/popover` (placements · arrow · collision · scrollable · modal/non-modal · nested · long/interactive · size scale · Tooltip/Popover/Modal hierarchy; desktop/tablet/mobile). |
| `DropdownMenu` | **FROZEN** | Visually validated + frozen 2026-07-02. Objective-bug fix 2026-07-02 (post-freeze, per the freeze clause): the indicator column `pl-8` is 48px on the DISCIPLINE spacing scale and crushed labels beside shortcuts at the xs width (visible in the frozen proof) → `pl-6` (32px, the intended column) + shortcut gap `pl-4`; menu panes get `p-0` (the `.ds-floating` host padding doubled the viewport padding). Re-captured, no regression. Second Floating member — **derives from the FROZEN Popover, never from FloatingSurface directly**: GlassSurface → .ds-floating → FloatingSurface → Popover (FROZEN) → **DropdownMenu**. The pane IS the frozen Popover pane (`popoverPaneClass` — pure extraction from PopoverContent, output unchanged): same glass, lift, entrance (`ds-floating-enter`), size scale (default `xs`). Zero material, zero animation of its own. On Radix DropdownMenu; owns only the menu language: `Item` (icon · shortcut · disabled · destructive · loading), `Label`, `Group`, `Separator`, `CheckboxItem` (checked/onCheckedChange), `RadioGroup`/`RadioItem` (value/onValueChange), `Sub`/`SubTrigger`/`SubContent` (submenu composes the SAME pane — material/animation/collision/arrow inherited), `Shortcut` (right-aligned, never hard-coded). Item geometry mirrors the frozen Select menu (py-2.5 · gap-3 · pl-8 indicator column · whisper `bg-accent-subtle/45`). Long menus cap to popper available height and scroll. Proof: `/dev/dropdown-menu` (trio FloatingSurface·Popover·DropdownMenu, full language, checkbox/radio, nested, long, collision, hierarchy; desktop/tablet/mobile + interactive captures). |
| `ContextMenu` | **FROZEN** | Visually validated + frozen 2026-07-02. Third Floating member — **derives from the FROZEN DropdownMenu, never restarts from Popover or FloatingSurface**: FloatingSurface → Popover (FROZEN) → DropdownMenu (FROZEN) → **ContextMenu**. Not a new component: the same pane (`dropdownMenuPaneClass`), same items/labels/separators/checkbox/radio/submenu classes, same `Shortcut` component reused as-is, same entrance — ContextMenu owns ONLY the trigger: right-click / keyboard menu key / touch long-press, positioned at the cursor (native context menu suppressed only on the zone). On Radix ContextMenu. Radix constraints (documented): Root is not open-controllable, Content has no side/sideOffset (cursor-anchored). Proof: `/dev/context-menu` (chain trio, object zones: image/text/file-nested/workspace-checkbox-radio, long menu, edge collision, touch; desktop/tablet/mobile). |
| `HoverCard` | **FROZEN** | Visually validated + frozen 2026-07-02. Fourth Floating member — derives from the FROZEN Popover: FloatingSurface → Popover (FROZEN) → **HoverCard**. The pane is the frozen Popover pane VERBATIM (`popoverPaneClass` + `popoverPanePaddingClass` + `floatingSizeClass` + shared arrow + `ds-floating-enter`) — zero material/layout/animation of its own. Owns ONLY how it opens: hover intent (`openDelay` 200 / `closeDelay` 150 defaults), forgiving pointer bridge (Radix grace area — Trigger→Content never closes), hover-interactive content. NOT a menu — contextual previews (user · exercise · book · workout…). On touch the trigger stays a plain link (hover is pointer-only, by design). Proof: `/dev/hover-card`. |
| `Toast` | **FROZEN** | Visually validated + frozen 2026-07-02. The transient feedback surface — derives ENTIRELY from FloatingSurface: GlassSurface → .ds-floating → FloatingSurface → **Toast**. Pane = Floating base verbatim (host + lift + `ds-floating-enter`; exit = the SAME keyframes reversed, declared once in floating-surface.css — no new animation); sizes from the shared scale (default sm). On Radix Toast (timers, pause on hover/focus, swipe, Escape, F8, aria-live: error=foreground/alert, rest=background/status). Owns only: queue (max 4 visible, overflow queued), duration (`Infinity` = capped sticky), dismiss (auto·manual·swipe·Escape·action), 6 stack positions (default bottom-right), optional progress timer (existing `Progress`, JS-ticked, pause-aware), variants (default·success·warning·error·loading·info), actions. API: `ToastProvider` (position·duration·maxVisible·size) + `useToast()` → `toast/update/dismiss` (update = the promise pattern, loading→success, without new API) + `Toast`/`ToastViewport`. Proof: `/dev/toast`. |

## Immersive Surface — `.ds-immersive`

A volume that takes over focus (heaviest glass + scrim).

| Component | Status | Notes |
|---|---|---|
| Modal (reference) | **Reference** | `/dev/modal` — the validated Immersive reference (material frozen as `.ds-immersive` + `.ds-scrim`). |
| `ImmersiveSurface` (helper) | Built | Reusable Immersive base (`immersive-surface.tsx`), mirrors Control/Floating helpers: renders the frozen `.ds-immersive` + `<GlassSurface/>` over the frozen `.ds-scrim` — no new material. Owns the family entrance (`immersive-surface.css`: `ds-immersive-in` pane rise + `ds-scrim-in` fade, token timings only — the family had no frozen entrance; reduced-motion safe). |
| `Modal` | Built (not frozen) | Promoted from the reference onto Radix Dialog: GlassSurface → .ds-immersive → ImmersiveSurface → **Modal**. Scrim + centered pane (frozen intrinsic geometry: 440 max · radius-xl · space-7); Radix supplies focus trap · scroll lock · Escape · outside dismiss · inert background · portal · focus return · ARIA. Compound: `Modal` + `.Trigger`/`.Content` (`paneClassName` for pane geometry)/`.Title`/`.Description`/`.Close`. Derived members compose Modal, never the primitives. |
| `CommandPalette` | **FROZEN** | Visually validated + frozen 2026-07-02. First Immersive member: GlassSurface → .ds-immersive → ImmersiveSurface → Modal (Built) → **CommandPalette**. Composes Modal (everything immersive), the FROZEN SearchInput (verbatim — no new input) and the frozen menu-language rows (`dropdownMenuItemClass` etc. — one list language). Owns only: filtering, keyboard nav (↑↓ · Home/End · PageUp/Down · Enter · loop), groups (Recent/Navigation/Actions/Settings/AI), empty/loading/disabled states, ⌘K/Ctrl+K hotkey, Escape clears-then-closes. Data-driven `groups` API (async/streaming/AI later without breaking). Proof: `/dev/command-palette`. |
| `Dialog` | Planned | ← Immersive (compose `Modal`). |
| `Drawer` / `Sheet` | Planned | ← Immersive. |
| `ConfirmationDialog` | Planned | ← Immersive. |

---

## Flat primitives (token system, no glass role)

| Component | Status |
|---|---|
| `Alert` · `Avatar` · `Badge` · `Code` · `Heading` · `Icon` · `Label` · `Progress` · `Separator` · `Skeleton` · `Spinner` · `Text` | Built |

---

## Composite / business components (← frozen roles, no new material)

| Component | Derives from | Status |
|---|---|---|
| `StatCard` / `KPIWidget` | GlassCard | Planned |
| `EmptyState` | GlassCard | Planned |
| `ErrorState` | GlassCard | Planned |
| `ChartWrapper` | GlassCard | Planned |
| `MobileMenu` | GlassPanel + Immersive scrim | Planned (Navbar/BottomNav already reserve its place) |
| `Breadcrumb` · `Pagination` | flat / Micro | Planned |
| `CommandPalette` | Immersive + Control | Planned |
| `Tabs` · `Accordion` · `Table` | Structural / flat | Planned |
| Domain cards (Workout · Meal · Progress · Subscription · Coach · Notification · Exercise) | GlassCard | Planned |

---

## Next up (frozen-role generalization, no new material)

The Structural navigation family is complete and frozen (Navbar · Footer · Sidebar ·
BottomNav). The remaining unimplemented **role members** are the natural next steps:

1. **Immersive → `Modal`/`Dialog`** — promote the validated `/dev/modal` reference
   into a reusable component (the Immersive role has a reference but no component).
2. **Floating → `Popover` / `DropdownMenu` / `Toast`** — generalize the Tooltip
   (Floating) reference into the rest of the family.
3. **Structural → `StatCard` / `EmptyState` / `ErrorState` / `ChartWrapper`** —
   content consumers of GlassCard.

Each follows the standard protocol: architectural analysis → derive from the frozen
role (never a new material) → dev proof → type-check/lint/build → visual validation
→ freeze on explicit owner approval.
