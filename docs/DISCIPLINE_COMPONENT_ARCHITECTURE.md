# DISCIPLINE — COMPONENT ARCHITECTURE INVARIANTS

Status: **FROZEN** · Governed by DISCIPLINE_CONSTITUTION.md
Scope: every component in `src/components/` — glass and non-glass alike.

> The Grammar (`DISCIPLINE_GLASS_GRAMMAR.md`) governs the **material** a component
> wears. This document governs the **architecture** a component obeys: what a base
> component is allowed to decide, and what it must always delegate. These are
> library-wide invariants. They are not glass theory and they are not tokens —
> they are the composition contract every component honours.
>
> Each invariant here is **frozen**: it may be extended, never weakened. A change
> requires an explicit owner decision, recorded as a new revision of this file.

---

## Why this document exists

GlassPanel once imposed `rounded-none` on itself — encoding the decision "I am a
full-bleed, edge-to-edge band." That is a **layout decision**, and a base
Structural component has no business making it. A panel does not know whether it
sits flush against the viewport, inside a padded column, or floating with a
28px radius. Only the component that *places* it knows.

The fix (drop `rounded-none`, keep the Structural default radius) was correct.
But a one-off fix is not enough: in six months, nothing stops someone from
re-adding a placement decision to a base component "for convenience." This
document turns that single correction into a **permanent, frozen rule** so the
mistake cannot be reintroduced silently.

---

## Invariant A1 — Base components never make layout decisions

**Principle.** A base component of the Design System defines **only** its own
substance. It never decides where it lives on a page or how it relates to the
page around it.

### A base component DEFINES

- its **material role** (the Grammar expression it wears, if any);
- its **behavior** (states, interactions, accessibility);
- its **semantics** (the element/role it renders, e.g. `<section>`, `<button>`);
- its **intrinsic geometry** — its own height, its own default radius, its own
  internal padding, its own content arrangement, and an **adaptable width**
  (i.e. "fill the box my parent gives me").

### A base component NEVER defines

- a **placement** (where it sits on the page);
- a **full-bleed / edge-to-edge mode** (e.g. imposing `rounded-none`, negative
  margins, or a viewport-anchored width);
- an **alignment** relative to the page (centering itself, `mx-auto`, page-level
  `text-center`, `self-*`);
- a **position** in the document flow (`fixed`, `sticky`, viewport-anchored
  `absolute inset-0` / `top-0`, page-stacking `z-index`);
- a **responsive decision** that depends on where it is used (breakpoint layout,
  column spans, reflow rules);
- any **context-specific** decision that only the consumer can know.

> **The boundary, made precise.**
> - **Adaptable width is allowed.** `w-full` means "fill whatever width my parent
>   gives me" — the *parent* decides the actual width. That is delegation, not a
>   placement decision. A hard-coded page width (`max-w-screen-lg`, `mx-auto`,
>   `container`) is *not* allowed — that decides the page column.
> - **Internal geometry is allowed.** `absolute` used to place a component's *own*
>   parts inside its *own* box (a chevron inside a Select, the range fill inside a
>   Slider track, a centered loading Spinner inside a Button) is intrinsic. Only
>   positioning against the **page or viewport** is forbidden.
> - **A default radius is allowed.** A role's canonical radius (Structural
>   `--ds-radius-lg`) is intrinsic material geometry. **Removing** it to sit
>   edge-to-edge (`rounded-none`) is a layout decision and belongs to the consumer.

### Worked example — GlassPanel

GlassPanel **defines**:

- a **Structural Surface** (the frozen `.ds-card` material, verbatim);
- a default **panel padding** (`px-6 py-12`);
- an **adaptable width** (`w-full` — fills its parent);
- `<section>` **semantics**;
- the **Structural default radius** (inherited from `.ds-card`).

GlassPanel **never decides**:

- to be edge-to-edge / bord à bord;
- to be glued to the viewport;
- to have a null radius;
- to be centered or width-capped on the page.

Those decisions belong **exclusively** to the component that uses it — Navbar
(`rounded-none` bottom band), Footer, Sidebar (`rounded-none` vertical rail),
BottomNav (mobile bar), a marketing SectionPanel (padded, centered column). Each
consumer chooses its own geometry via `className`; GlassPanel supplies only the
Structural substance they all share.

---

## The general rule (library-wide invariant)

> **Low-level components never make layout-related decisions. Every decision that
> depends on context is always delegated to the consuming component.**

This applies to the whole library, not only to glass surfaces. A Button, an
Input, a Badge, a GlassCard — none of them positions itself on a page. They
define what they *are*; the page that uses them defines where they *go*.

Corollary for derivation: when a component is derived from a frozen role
(GlassPanel ← GlassCard, FloatingCard ← GlassCard, Navbar ← GlassPanel), the
derived component may add **behavior and intrinsic geometry**, but the *placement*
still travels one level further out — to whoever renders the derived component.
Layout always flows outward, never inward.

---

## Audit — existing base components (2026-07-01)

Every base component in `src/components/ui/` was reviewed against Invariant A1.
Method: scan for page-layout utilities (`fixed`, `sticky`, viewport-anchored
`absolute`/`inset-0`/`top-0`, `rounded-none`, `mx-auto`, `container`,
`max-w-screen`, page-level margins, `text-center`/`self-*`, grid placement),
then read each flagged file to separate intrinsic geometry from page layout.

**Result: no violations.** No base component imposes a placement decision
comparable to the old `rounded-none`. Cases considered and cleared:

| Component | Pattern | Verdict |
|---|---|---|
| `glass-panel` | `w-full px-6 py-12` | ✅ adaptable width + default padding (allowed) |
| `glass-card` | (no width/margin/position at all) | ✅ pure substance |
| `control-surface` | `h-12 rounded-md px-4` | ✅ intrinsic control geometry |
| `select`, `date-picker` triggers | `w-full` | ✅ form control fills its parent column |
| `textarea` | `min-h-24 w-full` | ✅ fills host; own min-height |
| `slider`, `progress`, `separator` | `w-full` / `h-full` | ✅ fills container (intrinsic span) |
| `avatar` (inner img/fallback) | `h-full w-full` | ✅ fills the avatar's own box |
| `select` (chevron), `slider` (range), `button` (spinner) | `absolute` | ✅ internal part placement |
| `glass-surface` | `position:absolute; w0 h0` | ✅ visually-hidden SVG filter host |

If a future component needs a placement to function, that is first treated as a
**design error to disprove** (per PROJECT_STATE "generalization, not invention"):
move the decision to the consumer before concluding the base component needs it.

---

## Status

Invariant A1 is **frozen**. It may be extended with further invariants (A2, A3…)
but not weakened. Any base component that imposes a layout decision is a defect
to be corrected by delegating that decision to the consumer.
