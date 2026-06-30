# DISCIPLINE — GLASS MATERIAL CONSTRUCTION SPECIFICATION

Status: DRAFT (for approval) · Governed by DISCIPLINE_CONSTITUTION.md
Companion to: DISCIPLINE_GLASS_MATERIAL.md · PHASE_03_GLASS_REVERSE_ENGINEERING.md

> **Method only. No CSS. No values.** This document says *how the DISCIPLINE
> glass is constructed* — the ordered optical layers and the rules that govern
> them — so any component (Button, Card, Input, Navbar, Modal, Sidebar) is built
> the same way and reads as the same material. Numbers live in the canonical
> tokens; pixels live in the implementation. Here we define the **construction
> method** that both must obey.

---

## 0. Construction principle

The material is not "a stack of effects." It is a **simulation of light crossing
one thick glass capsule**. Every layer exists because a real optical phenomenon
exists. Build order = the path of light from behind the glass to the eye.

A component never invents a layer and never reorders the stack. It selects a
**thickness tier** and a **context tuning** of the *same* construction.

---

## 1. Exact order of the optical layers (back → front)

The canonical stack. Each layer is a distinct optical role, applied in this order:

1. **Cast shadow** — ambient (float) + contact (anchor), behind the glass.
2. **Refraction body** — transmits the background and **bends/displaces** it
   (the lens), with diffusion (scatter) and re-saturation of transmitted color.
3. **Transmission base** — the near-colorless body that sets how much background
   shows through (the core transparency).
4. **Volume zones** — the three readable depths: **top face**, **core**,
   **bottom face**; established as distinct, never merged into one gradient.
5. **Internal-reflection line (TIR)** — the bright "underline" on the lower /
   light-opposite inner edge.
6. **Violet caustic (capture)** — colored light folded **inside the core**
   (primary-intent surfaces only).
7. **Incident light** — the soft illumination of the top face from the global
   light.
8. **Fresnel edge** — the bright, non-uniform machined rim (brighter than the
   face; bright → break → dark).
9. **Specular highlight** — the small crisp glint on the **convex** top.
10. **Focus ring** — accessibility affordance, *around* the glass, never part of
    the material (added only on keyboard focus).
11. **Content** — label / icon, always on top.

> Order is invariant. Tiers and context change *parameters of* these layers,
> never their sequence.

---

## 2. Which layers modify LIGHT

- Refraction body (diffusion / scatter, transmitted re-saturation)
- Internal-reflection line (TIR)
- Incident light (top-face illumination)
- Fresnel edge (rim luminance)
- Specular highlight (mirror glint)

These create the "polished" reading. Their absence is what makes glass look matte.

## 3. Which layers modify GEOMETRY

- Refraction body — **displaces** the background (bends what is behind).
- Volume zones — establish apparent **thickness** (top/core/bottom) and the
  **bevel/side-wall**.
- Specular/convexity — implies a **domed** top surface (curved highlight).

These create the "thickness / touchable" reading. Their absence makes glass flat.

## 4. Which layers modify COLOR

- Violet caustic (capture) — the only **chromatic** layer; light trapped in the
  core (primary intent).
- Refraction body — *revives* transmitted background color (saturation), but adds
  no color of its own.
- Fresnel edge — may carry a **faint dispersion** (spectral hint) at the rim, but
  never a painted hue.

Color is always **light**, never paint. The body stays near-colorless.

## 5. Which layers NEVER change

- The **layer order** (§1).
- The **global light direction** (single soft upper-left source).
- The **existence** of: refraction-as-displacement, Fresnel edge, TIR line,
  specular, volume zones, violet-as-captured-light.
- The **rule** that color = light (never a fill/paint).

These are guaranteed everywhere — see Material Invariants (§10).

## 6. Which layers evolve by CONTEXT (light / dark / image / video)

Tuned, never restructured:

- **Transmission base** — opacity drops on dark/image/video so the background
  reads through; rises on the off-white canvas so the material separates.
- **Refraction body** — displacement and diffusion stay; their *visible strength*
  follows the background's contrast.
- **Internal-reflection line & Fresnel edge** — carry more of the read on
  dark/media (where fill is lower).
- **Violet caustic** — intensity re-balanced to stay subtle on every background.
- **Legibility floor** — on image/video, the zone under content densifies (or a
  thicker tier is used) so text contrast (AA) always holds. This floor overrides
  transparency.

The *model* is identical on all backgrounds; only magnitudes change.

## 7. Which layers evolve by SIZE (thickness tier)

Scale = thickness. Larger glass = thicker glass. Scaling together:

- Refraction body — blur/displacement radius.
- Volume zones — depth of the three faces and the bevel band.
- Internal-reflection line & Fresnel edge — sharpness/length.
- Cast shadow — spread and softness.

Tiers: `button` (thinnest) · `control` · `card` · `nav` · `modal` (thickest).
A tier is a **ratio of the same material**, never a new material.

## 8. Which layers evolve by STATE (rest / hover / active / focus / disabled)

The glass *meets the light* differently; it never recolors.

- **Rest** — baseline; calm.
- **Hover** — glass lifts toward the light: Fresnel edge and specular brighten,
  cast shadow grows (more float), violet caustic shifts slightly.
- **Active** — glass pressed toward the surface: it flattens, specular/edge dim,
  internal shadow deepens, cast shadow tightens, violet settles.
- **Focus** — the focus ring appears *around* the glass; the material is unchanged.
- **Disabled** — light stops interacting: specular, Fresnel and violet fade; the
  glass goes inert and recedes.
- **Loading** — the material holds its shape; only content changes (never spins).

State changes are limited to **light, depth and position** — never hue, never the
layer set, never the light direction.

## 9. Which layers stay IDENTICAL across the whole Design System

Every glass component, at every size, shares **exactly**:

- the global light direction,
- the layer order,
- the Fresnel behavior,
- the refraction (displacement) logic,
- the internal-reflection (TIR) logic,
- the specular logic,
- the thickness logic (the tier system),
- the violet-capture behavior.

If two glass components differ in any of these, they are not the same material —
and one of them is wrong (the coherence test, DISCIPLINE_GLASS_MATERIAL.md §6c).

## 10. DISCIPLINE visual signature (what makes this material *ours*)

- **The violet caustic**: a soft light **trapped inside the glass core**,
  upper-left, **asymmetric, never a full ring, never centered**, shifting with
  state but **never changing color** — light imprisoned in the thickness, never a
  painted button.
- **The quiet machined Fresnel edge** with real tension (bright → break → dark).
- **One soft upper-left light** unifying the entire product.
- **Material before color; calm before spectacle** (Constitution).
- **Touchable thickness** — a domed, polished capsule, not a flat plate.

---

## 11. Material Invariants (can never change)

These are absolute. Changing any of them changes the identity of DISCIPLINE:

1. **One global light.** A single soft light direction (upper-left, slightly
   frontal) for the entire interface. No second light, ever.
2. **One Fresnel behavior.** Edges are always brighter/shinier than faces, and
   the rim is non-uniform (bright → break → dark). Always.
3. **One refraction logic.** Refraction always **displaces** the background
   (lens), strongest at the rim — never "blur only" as the identity.
4. **One internal-reflection logic.** A bright TIR line always lives on the
   lower / light-opposite inner edge.
5. **One specular logic.** A small **crisp** specular on a **convex** top,
   positioned by the global light. Never a soft full-width wash.
6. **One thickness logic.** Apparent thickness is read through the three zones
   and a bevel; sizes are tiers of one material.
7. **One violet-light behavior.** Violet is always **captured light inside the
   core** — asymmetric, never a ring, never centered, never a fill, never
   changing hue.
8. **Color is light, never paint.** The body is near-colorless; all color is a
   refracted/captured light.
9. **The layer order is fixed** (§1).
10. **Accessibility is never traded for the effect.** Text contrast (AA) and a
    visible focus ring always win over transparency or glow.

---

## 12. Material Evolution (what may evolve, what may not)

**Allowed to evolve** (magnitudes / tuning, within the invariants):

- Opacity of the transmission base (per background).
- Intensity of diffusion, Fresnel brightness, specular strength, TIR brightness.
- Apparent thickness (tier) and shadow spread (per size).
- Violet caustic **intensity and position-within-the-rules** (still upper-left,
  still asymmetric, still inside the core).
- Motion magnitudes of state transitions (within the motion tokens).
- Token **values** (these are first approximations, tuned by visual validation).

**Forbidden** (changing the physics / identity):

- Adding or removing a light, or moving the global light direction.
- Reordering, adding, or removing optical layers.
- Replacing displacement refraction with blur-only as the identity.
- Removing the Fresnel edge, the TIR line, the specular, or the volume zones.
- Turning the violet into a background fill, a full ring, a centered glow, a
  neon glow, or a colored shadow — or changing its hue.
- Making the body a colored/opaque plate (losing transmission).
- Trading accessibility for the effect.
- Any "glossy / candy / Dribbble / neon" treatment (Constitution).

---

## 13. Status of this specification

Once approved, this becomes the **absolute construction reference** for every
DISCIPLINE Liquid Glass component. Implementation of the single Primary reference
button (and, after its visual validation, all other primitives) must follow this
method exactly. The reference button remains the material's ground truth; any
component is judged against it (DISCIPLINE_GLASS_MATERIAL.md §6d).

> No code, no token changes, no component changes were made. Awaiting validation.
