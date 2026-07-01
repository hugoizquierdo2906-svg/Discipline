# DISCIPLINE — BUTTON REFERENCE (Micro Surface)

> **Single source of truth for the Micro Surface role.**
> The Button is officially VALIDATED and FROZEN. Every future button (and every
> Micro-Surface control) derives from this reference — never reinterprets it.
> Source files: `src/components/ui/button.tsx` (geometry + variants),
> `src/styles/micro.css` (`.ds-micro` material), `src/styles/glass.css`
> (shared `<GlassSurface/>` layers), `src/components/ui/icon-button.tsx`,
> `src/components/ui/link-button.tsx`.
> Authority: Constitution → Canonical Tokens → Glass Material → Construction →
> Grammar → **this document** for the Micro role.

---

## 1. Geometry (FROZEN)

A premium **lens / capsule** silhouette whose width is dictated **only by the
content** — there is no target aspect ratio.

| Size | Height | Horizontal padding | Radius (= ½ height) | Type scale |
|------|--------|--------------------|---------------------|------------|
| sm | 34px (`h-[34px]`) | 16px (`px-4`) | 17px (`rounded-[17px]`) | `text-body-sm` (14px) |
| md | 40px (`h-[40px]`) | 20px (`px-5`) | 20px (`rounded-[20px]`) | `text-body` (16px) |
| lg | 48px (`h-[48px]`) | 24px (`px-6`) | 24px (`rounded-[24px]`) | `text-body-lg` (18px) |

- **Radius = half the height** → ends perfectly tensed, a continuous organic
  contour, no perceptible angle. Real values, never a literal `9999px` pill.
- **Compact horizontal padding** → the glass hugs the label; a short `OK` and a
  long `Start your journey` stay the same family (same height, padding, radius).
- Base classes: `inline-flex items-center justify-center gap-2 whitespace-nowrap
  font-semibold`.
- **IconButton** keeps a **circular** footprint (square + `rounded-pill`),
  sizes `h-9/h-11/h-14` (36/44/56px) with a ≥44px touch target on sm.
- **LinkButton** is an `<a>` sharing the exact Button geometry.

## 2. Material (FROZEN) — the glass reads as glass

Scoped to `.ds-micro` (Button, IconButton, LinkButton); it re-tunes the shared
`<GlassSurface/>` layers — it never redefines them.

- **Transmission / environment capture** — `.ds-micro .ds-glass__body`:
  `backdrop-filter: blur(16px) saturate(1.7) brightness(1)`. The background lives
  inside the material: luminous on light, deeper on dark, tinted on colour.
- **Internal volume** — three readable zones (lit top face → transmissive core →
  lifted lower face) with a **legibility floor** under the label so dark text
  always holds AA. Top inner highlight + internal shadow + a fine
  internal-reflection (TIR) line.
- **Reflections** — a concentrated top **incident arc** that hugs the curvature,
  plus a discreet **specular** glint (opacity 0.42); the glass stays visible
  between them (reflections slide over the glass, never veil it).
- **Fresnel edge** — a livelier machined rim that emerges from the reflection,
  never a drawn line.
- **Refraction note:** true displacement would require the frozen `GlassSurface`
  SVG filter, so refraction is expressed through transmission + saturation +
  curved reflection — subtle (unnoticed at first glance, felt).

## 3. Primary — neutral glass + light signature (FROZEN)

- **All variants share the SAME neutral glass.** Primary is **not** a violet
  fill and emits **no** `data-glass-intent='primary'` (the body carries no
  painted colour).
- **Primary signature = a discreet pastel-violet OUTER bloom** (ambient light
  energy), `box-shadow: 0 2px 18px rgba(139,124,255,0.22)` on the primary
  variant. Not a fill, not a hard ring, not a CSS border. Almost invisible —
  seen only on close look.
- Reading hierarchy: **silhouette → light halo → volume → reflection → label.**
  Never *label → colour → button*.
- Variants: `primary` (neutral glass + halo), `secondary` (neutral glass),
  `ghost` (text only, material on hover), `outline` (transparent body, edge
  carries the read), `destructive` (solid semantic error fill, white label — the
  one intentional non-glass fill, for AA).

## 4. Invariants (NEVER change — Construction §11 + Micro)

1. One global light, upper-left; layer order fixed.
2. Neutral glass body for **all** variants (no violet fill on any button).
3. The violet exists **only as light** (the discreet Primary halo) — never a
   ring, never a fill, never a hue painted in the body.
4. Radius = half height (capsule ends); width dictated by content.
5. **Accessibility always wins:** the label holds AA (legibility floor) and the
   focus-visible ring is never removed.
6. The `<GlassSurface/>` stack, its order, and `glass.css` are shared and
   untouched by the Button.

## 5. Interaction rules (FROZEN)

- **Hover** — the glass lifts toward the light (shared `.ds-glass:hover` shadow +
  the discreet violet `--ds-glass-glow` bloom). Calm.
- **Active/press** — `active:scale-[0.98]` (disabled under `prefers-reduced-motion`).
- **Focus** — the global focus-visible ring appears around the glass (globals.css);
  the material is unchanged.
- **Disabled** — `pointer-events-none`, `opacity-0.40`.
- **Loading** — `<Spinner/>` shown, label hidden, `aria-busy`; the material holds
  its shape (never spins).

## 6. Derivation constraints (how to build the rest of the Micro family)

- Reuse the shared `<GlassSurface/>` + `.ds-micro` — **no new material, no new
  optical recipe**.
- Micro controls not yet converged (Checkbox, Switch, RadioGroup, Slider thumb)
  derive **geometry/interaction only** from this reference; the material is `.ds-micro`.
- Before building a Micro control, state which layers are reused and which
  magnitudes change and why.

## 7. What MAY still evolve

- Token **values** and layer **magnitudes** (transmission, saturation, reflection
  intensity) — tuned by visual validation, **within the invariants** (§4).
- New Micro **variants** or sizes, provided they keep the frozen geometry logic
  (radius = ½ height, content-driven width) and the neutral-glass + light-signature
  rule.

## 8. What is now FORBIDDEN to modify

Reopen only for an **objective bug**, an **accessibility** issue, or a **technical
defect** — never for taste:

- The geometry (heights, paddings, radii) and the lens silhouette.
- The neutral-glass rule and the Primary light-halo signature (colour + intensity).
- The Fresnel/outline behaviour, the reflection model, the layer order.
- `GlassSurface`, `glass.css` (shared base), the global light direction, the
  animations.
- The geometry/material of any **other role** (Control, Structural, Floating,
  Immersive).
