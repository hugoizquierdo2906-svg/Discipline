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
| `Checkbox` | Built | Micro member. |
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
| `DatePicker` | Built (not frozen) | Field is a Control Surface (**sibling of Input/Select**: GlassSurface → .ds-control → ControlSurface → DatePicker) — closed, indistinguishable from Input/Textarea/SearchInput/Select. The **calendar is a Floating Surface** (GlassSurface → .ds-floating → FloatingSurface — the reusable Floating glass base, first production consumer). Field owns value/placeholder/open; calendar (react-day-picker) owns grid/keyboard/nav. API: label · description · placeholder · helperText · error · success · required · disabled · readOnly · value · defaultValue · minDate · maxDate · locale · format · onChange · name. Full keyboard nav + ARIA (combobox trigger → dialog overlay → grid). Proof: `/dev/date-picker`. |
| `SearchInput` | **FROZEN** | Search **specialization of Input** (GlassSurface → .ds-control → ControlSurface → Input → SearchInput): renders `<Input>` + search affordances only. API: label · description · helperText · error · success · clearable · loading · shortcut · debounce · onSearch · onClear · disabled · readOnly; Escape clears; `role="search"`. Proof: `/dev/search-input`. Visually validated + frozen 2026-07-01 (quieter ⌘K chip + softer clear button). |
| `FileInput` | Built | Control family. |

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
| `FloatingSurface` (helper) | Built | Reusable Floating glass base (`floating-surface.tsx`), mirrors `ControlSurface`: renders `.ds-floating` + `<GlassSurface/>`, no new material. First consumer: the DatePicker calendar. Popover/DropdownMenu/ContextMenu/Command Palette compose it. |
| `Tooltip` | **FROZEN** | Floating reference (production Tooltip is the inverted §12.11 chip; the `.ds-floating` glass is validated in `/dev/tooltip`). |
| `Popover` | Planned | ← Floating (compose `FloatingSurface`). |
| `DropdownMenu` | Planned | ← Floating (compose `FloatingSurface`). |
| `ContextMenu` | Planned | ← Floating. |
| `Toast` | Planned | ← Floating. |

## Immersive Surface — `.ds-immersive`

A volume that takes over focus (heaviest glass + scrim).

| Component | Status | Notes |
|---|---|---|
| Modal (reference) | **Reference** | `/dev/modal` validated as the Immersive reference; **no reusable `Modal` component exported yet.** |
| `Modal` / `Dialog` | Planned | ← Immersive (first reusable component from the reference). |
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
