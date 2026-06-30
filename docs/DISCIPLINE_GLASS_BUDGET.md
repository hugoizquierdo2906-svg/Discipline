# DISCIPLINE — GLASS MATERIAL BUDGET

Status: DRAFT (for approval) · Governed by DISCIPLINE_CONSTITUTION.md
Builds on: DISCIPLINE_GLASS_MATERIAL.md · _CONSTRUCTION.md · _GRAMMAR.md

> Construction says *how to build*. Grammar says *which expression to use*.
> Budget says **how far to go**. Every component has a finite amount of visual
> presence to spend; it can never max every optical effect at once. The budget is
> what prevents a "Christmas tree." No CSS, no values — allocation rules only.

---

## 1. The budget principle

- Each component has a **maximum visual-presence budget**.
- It is **impossible** for a component to use 100% of every effect.
- Each component must **choose where to invest** its budget, in line with its
  Material Role (Grammar §2).
- Spending budget on one effect means **spending less** elsewhere. Trade-offs are
  mandatory, not optional.
- The budget caps **presence**, never **physics**: every Invariant (Construction
  §11) is still present — the budget governs *intensity/emphasis*, not existence.

Rating scale (allocation, not values): ★☆☆☆☆ (barely present) → ★★★★★ (dominant).

---

## 2. Budget axes

A component allocates across the same optical axes used by the Grammar:

- **Refraction** (background displacement / lens)
- **Fresnel** (edge brightness & tension)
- **Specular** (crisp top glint)
- **Volume / Depth** (thickness + cast shadow)
- **Transmission** (how much shows through)
- **Violet** (captured light — also intent-gated, Grammar §4)

**Spending rule:** at most **two axes** may reach ★★★★★ on any single component,
and **at most one** of those two may be Violet. Everything else recedes. This
single rule is what keeps the material calm (Constitution).

---

## 3. Role budgets (the default envelope per family)

These are the **maximum envelopes** a component of each role may spend. A specific
component may spend *less*, never more.

### Micro Surface (Button, IconButton, Checkbox, Switch)
```
★★★★★  Fresnel
★★★★☆  Specular
★★★☆☆  Volume / Depth
★★☆☆☆  Refraction
★★☆☆☆  Transmission
★☆☆☆☆  Violet (concentrated; primary intent only)
```
Invests in **edge + highlight** (instant, tactile read). Low refraction/volume.

### Control Surface (Input, Select, DatePicker, Search)
```
★★★☆☆  Fresnel
★★☆☆☆  Specular
★★☆☆☆  Volume / Depth
★★★☆☆  Refraction
★★★☆☆  Transmission
★☆☆☆☆  Violet (minimal)
```
Spends the **least overall** — clarity is the investment; the glass recedes.

### Structural Surface (Card, Sidebar, Navbar, Footer)
```
★★★★☆  Refraction
★★★★☆  Volume / Depth
★★★☆☆  Transmission
★★☆☆☆  Fresnel
★★☆☆☆  Specular
★☆☆☆☆  Violet (low, diffuse)
```
Invests in **refraction + depth** (honest size). Quiet edge.

### Floating Surface (Popover, Tooltip, Dropdown, Toast)
```
★★★☆☆  Fresnel
★★☆☆☆  Specular
★☆☆☆☆  Volume / Depth
★★☆☆☆  Refraction
★★★☆☆  Transmission
★☆☆☆☆  Violet (minimal)
```
Light and quick; **almost no volume**. Reads instantly, then leaves.

### Immersive Surface (Modal, Dialog, Drawer, Overlay)
```
★★★★★  Volume / Depth
★★★★★  Refraction
★★★☆☆  Transmission
★★☆☆☆  Specular
★★☆☆☆  Fresnel
★★☆☆☆  Violet (weak — volume commands, not color)
```
The only role that may spend ★★★★★ twice (Volume + Refraction) — its size earns
it. Even so, Violet and Fresnel stay restrained.

---

## 4. Worked examples (component-level)

```
Button
★★★★★ Fresnel · ★★★★☆ Specular · ★★★☆☆ Volume · ★★☆☆☆ Refraction · ★☆☆☆☆ Violet

Card
★★★★☆ Refraction · ★★★★☆ Volume · ★★☆☆☆ Fresnel · ★☆☆☆☆ Violet

Modal
★★★★★ Volume · ★★★★★ Refraction · ★★☆☆☆ Specular · ★★☆☆☆ Violet

Tooltip
★★★☆☆ Fresnel · ★☆☆☆☆ Volume · fast specular · ★☆☆☆☆ Violet
```

Note how **no component is strong everywhere**, and the **violet is never the
biggest spend** on any component (intent-gated and capped) — it is an accent, not
a headline.

---

## 5. Budget rules (binding)

1. A component may not exceed its **role envelope** (§3).
2. At most **two axes** at ★★★★★ per component; at most **one** may be Violet
   (and only on primary intent).
3. Spending more on one axis **requires** spending less on another.
4. Budget caps **presence/intensity only** — never removes an Invariant.
5. If a component feels "busy," it is **over budget** — reduce, do not add.
6. The **Primary reference button** defines the felt ceiling for a Micro Surface;
   other roles are balanced relative to it.

> Budget is the discipline that keeps a powerful material **calm**, exactly as the
> Constitution requires: "minimalism is evidence that nothing unnecessary
> remains."
