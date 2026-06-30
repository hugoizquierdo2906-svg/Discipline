# DISCIPLINE — GLASS MATERIAL GRAMMAR

Status: DRAFT (for approval) · Governed by DISCIPLINE_CONSTITUTION.md
Builds on: DISCIPLINE_GLASS_MATERIAL.md · _REVERSE_ENGINEERING.md · _CONSTRUCTION.md

> Construction explains **how to make** the material. Grammar explains **when to
> use which expression** of it. Same glass everywhere — but a button, a card, a
> navbar and a modal are not the same *expression* of that glass. This document
> defines the **optical families (Material Roles)**, the **behaviors** each role
> expresses (never values), and the **component → role** mapping. After this, a
> component is no longer styled; it **inherits its role's material language**.
>
> No CSS. No values. Behaviors only.

---

## 0. Why grammar

A button is a **control**. A card is a **surface**. A navbar is an **optical
plane**. A modal is a **volume**. A tooltip is a **flash of glass**. They share
one material and one set of physical laws (Construction §11 Invariants), but each
*role* expresses those laws with a different emphasis — more refraction here,
more Fresnel there, more or less captured violet.

"Increase the values" is not an answer. The answer is: **identify the role, and
the role dictates the expression.** Grammar is what lets every future component be
designed from its optical role instead of by trial-and-error tuning.

---

## 1. The optical dimensions (the shared axes)

Every role is described on the same axes, drawn from the Construction stack.
Qualitative scale only: **minimal · low · medium · high · maximum**.

- **Thickness** — apparent depth of glass (tier).
- **Refraction** — how much the background is displaced/bent (lens strength).
- **Transmission** — how much background shows through (transparency).
- **Fresnel edge** — brightness/tension of the machined rim.
- **Internal reflection (TIR)** — presence of the bottom "underline."
- **Specular** — sharpness/presence of the crisp top glint.
- **Depth (cast shadow)** — float and ambient shadow.
- **Violet capture** — strength of the trapped violet light (intent-gated, §4).
- **Reading speed** — how immediately the component must be legible/usable.
- **Motion** — how quickly the light responds to interaction.

The **Invariants never change** across roles (one light, layer order, Fresnel
logic, refraction-as-displacement, TIR, specular, thickness logic, violet =
captured light, color = light, accessibility first). Roles only shift *emphasis*.

---

## 2. The five Material Roles

### Micro Surface
**Nature:** a small **control** you act on directly.
**Members:** Button · IconButton · Checkbox · Switch (+ Slider thumb, Radio).
**Behavior:** low refraction · **high Fresnel** · **strong reading** · low depth ·
**concentrated** light (tight specular, focused violet capture on primary intent).
**Why:** small and tactile — the eye must grab it instantly; the material reads
through a crisp edge and a concentrated highlight, not through deep refraction.

### Control Surface
**Nature:** a **control you read and fill** (text/values live inside).
**Members:** Input · Select · DatePicker · Search.
**Behavior:** low–medium refraction · medium Fresnel · **maximum reading
(clarity first)** · low depth · **quiet** light (minimal specular at rest) ·
violet capture **minimal** (legibility wins).
**Why:** content legibility dominates; the glass recedes so text and entry are
effortless. The edge guides; the surface never competes with the content.

### Structural Surface
**Nature:** a **surface** that holds and organizes content.
**Members:** Card · Sidebar · Navbar · Footer.
**Behavior:** **high refraction** · medium–high transmission · **low Fresnel** ·
**high depth** · **diffuse** light (soft, broad) · violet capture **low/diffuse**.
**Why:** large planes read as thick, calm glass that lets content breathe
through; the rim stays quiet (a bright edge at this scale would shout). Depth and
diffusion express the size honestly.
**Note:** Navbar/Sidebar are *floating* structural planes — same role, with more
cast shadow and tuned transmission so content scrolls visibly beneath.

### Floating Surface
**Nature:** a **transient flash of glass** that appears, informs, dismisses.
**Members:** Popover · Tooltip · Dropdown · Toast.
**Behavior:** **almost no volume** · low refraction · medium Fresnel · **immediate
reading** · **fast** light response (quick highlight) · violet capture minimal.
**Why:** it is on screen briefly; depth and slow optics would feel heavy. It must
read at a glance and feel light and quick, then leave.

### Immersive Surface
**Nature:** a **volume** that takes over focus.
**Members:** Modal · Dialog · Drawer · Overlay.
**Behavior:** **maximum depth/thickness** · **high transmission** · **large
surface** · low Fresnel · diffuse light · violet capture **weak** (the volume,
not color, commands attention) · the background **dims** behind it.
**Why:** the heaviest, most solid glass, yet still translucent; it asserts
presence through depth and scale, never through brightness or color.

---

## 3. Role behavior matrix (emphasis, not values)

| Axis | Micro | Control | Structural | Floating | Immersive |
|---|---|---|---|---|---|
| Thickness | low | low | high | minimal | maximum |
| Refraction | low | low–med | high | low | high |
| Transmission | low–med | medium | med–high | medium | high |
| Fresnel edge | **high** | medium | low | medium | low |
| Internal reflection | medium | low | medium | low | medium |
| Specular | concentrated | minimal | diffuse | quick | diffuse |
| Depth (shadow) | low | low | high | low–med | maximum |
| Violet capture | concentrated* | minimal* | low/diffuse* | minimal* | weak* |
| Reading speed | strong | maximum | medium | immediate | medium |
| Motion | crisp | quiet | calm | fast | calm |

\* Violet is also **intent-gated** — see §4.

---

## 4. The violet capture across roles (two controls)

The trapped violet light obeys **two** independent controls:

1. **Role** — how concentrated vs diffuse, how strong vs faint (table above).
2. **Intent** — it appears only on **primary-intent** surfaces (a primary button,
   a primary/active state, a primary CTA). Neutral surfaces (a plain input, a
   default card, a tooltip) carry **little or none**.

So a *primary* Micro Surface shows a concentrated violet caustic; a *neutral*
Control Surface shows essentially none. In every case the violet stays light
captured in the core — never a fill, ring, centered glow, or hue change
(Invariants §11.7).

---

## 5. Component → Role mapping

The Component Library declares only the role; the material language is inherited.

| Component | Role |
|---|---|
| Button, IconButton, LinkButton | Micro Surface |
| Checkbox, Switch, Radio, Slider (thumb) | Micro Surface |
| Input, Textarea, Select, DatePicker, Search/SearchInput | Control Surface |
| Card (+ all business cards), Sidebar, Navbar, Top Bar, Footer | Structural Surface |
| Popover, Tooltip, DropdownMenu, ContextMenu, Toast | Floating Surface |
| Modal, Dialog, Drawer, Sheet, Overlay/Scrim | Immersive Surface |

Components not glass by nature (Badge, Avatar, Icon, Spinner, Skeleton,
Separator, Progress, plain Text/Heading) are **not** assigned a glass role; they
use the flat token system. Only surfaces made of the material take a role.

---

## 6. How a component is designed from now on

```
"I am building a Tooltip."
   ↓
"Tooltip = Floating Surface."
   ↓
"Floating Surface expresses the material this way (almost no volume,
 immediate reading, fast light, minimal violet)."
   ↓
Done — no re-discussion of Liquid Glass.
```

A new component is never re-derived visually. It is **assigned a role**, and the
role supplies its material expression. If a component seems to need an expression
no role provides, the **role set** is revisited (here), not the component.

---

## 7. Grammar rules (binding)

1. Every glass component **must** belong to exactly one Material Role.
2. A component **inherits** its role's expression; it does not redefine the
   material.
3. Roles shift **emphasis only**; they never break the Material Invariants
   (Construction §11).
4. The violet capture is **role-modulated and intent-gated** (§4) — never painted.
5. The **Primary reference button** (Micro Surface, primary intent) remains the
   material ground truth; every role is calibrated to feel cut from the same
   glass as it (coherence test, Material §6c).
6. New roles are added here, deliberately, only when a genuinely new optical
   family appears — never for one-off convenience.

---

## 8. Canon placement

Order of authority for the glass:
Constitution → Canonical Tokens (§2 material sub-tokens) →
**Glass Material → Glass Construction → Glass Grammar** → Component Library.

The Component Library consumes the Grammar (component → role); it no longer
describes glass behavior itself.

---

> No code, no token changes, no component changes were made. Once approved, this
> Grammar — with Material and Construction — becomes the complete, reusable basis
> for every Liquid Glass component, starting with the validated Primary reference
> button and then generalizing role by role.
