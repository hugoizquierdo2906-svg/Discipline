# DISCIPLINE — GLASS MATERIAL SPECIFICATION

Status: DRAFT (for approval) · Governed by DISCIPLINE_CONSTITUTION.md

> This is a **material specification**, not CSS and not an implementation. It
> describes how the DISCIPLINE Liquid Glass behaves as a physical material, so
> that every component (Button, Card, Navbar, Modal, Input, Sidebar…) is carved
> from the **same** material rather than styled independently. The canonical
> sub-tokens (added later, after approval) are merely the measurable parameters
> of the behaviors defined here.

---

## 1. Material philosophy

DISCIPLINE glass is a single, real, **near-colorless** optical material. It is
not a surface effect and not "glassmorphism." It has thickness, it bends light,
it catches a thin line of light on its machined edge, and it sits above the
content with honest depth.

Three principles govern it:

1. **Material before color.** The eye should read *glass* first, *tint* second.
   The material is neutral; color is an accident of the light it captures.
2. **Calm, never spectacle.** Per the Constitution, the interface must never
   become the center of attention. The glass is felt, not noticed. No neon, no
   gloss candy, no colored shadows, no saturation spikes.
3. **One material, many sizes.** A button and a modal are the same glass at
   different scales and thicknesses — never different "styles."

### The DISCIPLINE violet — light trapped in the glass

Primary (and other "primary-intent") components carry a **soft violet
luminescence** that is part of the brand identity. It must be understood as an
**optical property of the material**, not a paint:

- It is **not** a violet background.
- It is **not** a neon glow.
- It is **not** a colored shadow.
- It **is** a very soft violet light that the glass appears to *catch and hold* —
  concentrated where light enters the material (upper edge, specular zones,
  inner rim), fading into clarity elsewhere.

The violet reads as **light imprisoned inside the glass**: visible because the
material refracts it, never because a color was painted on the button. On a clear
glass control the violet is almost absent; on a primary control it is a quiet,
premium inner luminance. If a viewer would describe it as "a purple button," the
material is wrong. The correct description is "clear glass with a faint violet
light inside."

---

## 2. Optical behavior

The material exhibits five optical behaviors, in priority order:

1. **Transmission (transparency).** Background content passes through, softened.
   The material is genuinely see-through, not a frosted opaque plate.
2. **Refraction.** What is seen through the glass is gently bent, strongest near
   the edges (thicker glass refracts more at the rim). A faint positional shift
   at the contour, never a wobble or a "liquid" distortion.
3. **Diffusion (blur + saturation).** Transmitted light is blurred and slightly
   re-saturated, so colors behind feel alive rather than washed.
4. **Edge light (specular rim).** The machined edge catches a thin, bright line
   of light — brightest where the dominant light hits (upper-left by convention),
   dimming around the contour. This is the single most important "real glass" cue.
5. **Internal reflection (the violet capture).** A soft luminance lives *inside*
   the body of the glass — neutral-white for clear surfaces, faint violet for
   primary surfaces — concentrated at the top and along the inner rim.

Light direction is **consistent across the whole product**: a single implied
soft light from the **upper-left**, slightly in front. Highlights live top/upper-
left; inner shadow and contact shadow live bottom/lower-right. This consistency
is what makes separate components feel cut from one material.

---

## 3. Behavior by background

The same material must remain legible and "glassy" on every surface. It adapts
its **opacity and internal light**, never its identity.

| Background | Material behavior |
|---|---|
| **Light (off-white canvas #FAFAF8)** | Transparency reads weakly, so the material leans on a slightly higher fill opacity, a clear inner highlight, a crisp edge line, and the contact/diffuse shadow to separate from the canvas. The violet capture is the most visible here and must stay restrained. |
| **Dark** | The glass becomes more transparent (lower fill); the edge light and inner highlight carry the read. The violet capture glows a touch more naturally and must be dialed down to stay subtle. |
| **Image** | Refraction and diffusion do the work; fill drops so the image breathes through. A legibility floor applies: any text sits on a denser zone of the material (or a thicker glass tier) so contrast holds. |
| **Video / motion** | As image, plus motion safety: no distortion animation tied to the video; the material stays optically stable so moving content underneath never makes it shimmer. |

Rule: **the material chooses opacity to preserve legibility and depth**, in that
order. Text contrast (WCAG AA) is non-negotiable and overrides transparency.

---

## 4. Behavior by size / thickness

Scale changes the **thickness** of the glass, which changes blur radius, edge
sharpness, inner-shadow depth, and shadow spread — proportionally. Larger glass =
thicker glass = more diffusion and softer, deeper shadows.

| Component | Thickness & behavior |
|---|---|
| **Button** | Thinnest tier. Tight blur, crisp thin edge, shallow inner shadow, small diffuse shadow. The violet capture is concentrated and precise (primary only). |
| **Input / control** | Thin, quietest tier. Minimal edge, faint inner light, no specular glint at rest (clarity for reading/typing). |
| **Card** | Mid tier. More blur, softer edge, deeper inner shadow, broader ambient shadow — the glass feels like a thicker slab. |
| **Navbar / Sidebar** | Mid-thin, but **floating**: stronger ambient shadow and a longer edge line; transparency tuned so content scrolls visibly beneath. |
| **Modal** | Thickest tier. Maximum blur and the deepest ambient shadow; the background also dims behind it. The most "solid" glass, yet still translucent. |

The parameters scale together as one family; a component never invents a value —
it selects a thickness tier of the same material.

---

## 5. Behavior by interaction

Interactions change how the material **meets the light**, not its color.

- **Rest:** stable, calm; edge light present but quiet; specular minimal; violet
  capture at its baseline (primary).
- **Hover:** the glass lifts slightly toward the light → edge brightens, inner
  highlight strengthens, ambient shadow grows (more float), violet capture warms
  by a hair. Motion ≤ the hover ceiling (fast); transform/opacity/light only.
- **Active / pressed:** the glass is pushed toward the surface → it flattens,
  inner highlight dims, inner shadow deepens, shadow tightens (less float),
  scale settles slightly. It feels like pressing real glass into a soft surface.
- **Focus:** an accessibility ring (accent + white halo) is added *around* the
  glass — a separate, always-visible affordance, never replacing the material.
- **Disabled:** light stops interacting — edge, specular and violet capture fade;
  the glass becomes inert and recedes.
- **Loading / busy:** the material holds its shape (size preserved); only the
  content within changes. The glass never "spins."

All interaction light changes respect `prefers-reduced-motion`: transitions
collapse to a minimal opacity change; no sheen, no continuous motion.

---

## 6. Behavior under light (the light model)

- **One implied light source**, soft, upper-left, slightly frontal — shared by
  the entire product.
- **Edge light** is brightest at the light-facing corner and decays around the
  contour (the machined-rim gradient).
- **Inner highlight** sits on the top inner wall (light entering the top face).
- **Inner shadow** sits on the bottom inner wall (light occluded).
- **Specular glint** is a small, soft concentration near the top edge — present
  on buttons/primary, absent on reading controls.
- **The violet capture** behaves like a faint colored light *refracted within*
  the glass: it is strongest where light enters (top/inner rim) and dissolves
  toward the body and bottom. It never has a hard edge, never a flat fill.
- **Contact shadow** (tight) anchors the glass to the surface; **ambient shadow**
  (broad, diffuse) gives it float. Both are neutral (no colored shadows).

---

## 7. Physical layers of the material

From back (behind the glass) to front (toward the viewer):

1. **Cast shadow** — ambient (diffuse float) + contact (tight anchor). Neutral.
2. **Refractive body** — the transmission/refraction/diffusion of the background
   (blur · saturation · brightness · edge refraction).
3. **Fill** — the near-colorless translucent surface, as a top→bottom gradient
   (lit top, shaded bottom) that gives the curved-surface read.
4. **Violet capture (primary only)** — a soft internal violet luminance layered
   into the body/rim; an optical accent, low presence, no hard boundary.
5. **Inner shadow** — bottom inner wall; conveys thickness.
6. **Inner highlight** — top inner wall; the lit rim.
7. **Edge light** — the thin machined contour gradient (bright → dim).
8. **Specular glint** — the small soft highlight near the top edge.

A real glass component is the **ordered composition of all eight layers**. A
single translucent div is explicitly *not* this material.

---

## 8. Sub-token hierarchy (names & roles only — values added later)

This is the conceptual tree the canonical tokens will encode. **No values here**
(values are decided at the canonical step, after this spec is approved). All under
the additive `--ds-glass-*` material namespace; existing glass tokens untouched.

```
glass (material)
├── optics
│   ├── blur              · refractive diffusion radius (scales with thickness)
│   ├── saturation        · re-saturation of transmitted color
│   ├── brightness        · transmitted-light lift
│   ├── refraction        · edge refraction offset
│   └── distortion        · reserved displacement (off by default)
├── fill
│   ├── fill-top          · lit top stop of the surface gradient
│   └── fill-bottom       · shaded bottom stop
├── accent (the violet capture — primary intent only)
│   ├── capture           · core internal violet luminance
│   ├── capture-rim       · violet concentrated on the inner/top rim
│   └── capture-falloff   · how the violet dissolves into clarity
├── edge
│   ├── edge-light        · bright machined-rim stop (light-facing)
│   ├── edge-dim          · dim rim stop
│   └── edge-width        · contour thickness
├── inner-light
│   ├── inner-highlight   · top inner wall (lit rim)
│   └── inner-shadow      · bottom inner wall (thickness)
├── specular
│   ├── specular          · glint color
│   └── specular-opacity  · glint strength
└── depth
    ├── shadow-contact    · tight anchor shadow
    ├── shadow-ambient    · broad diffuse float shadow
    ├── shadow-hover      · elevated float (hover)
    └── glow              · very faint accent halo (hover/active, primary)
```

### Thickness tiers (one material, scaled)
The tree above is the base. Components select a **tier** — `button` (thinnest),
`control`, `card`, `nav`, `modal` (thickest) — which scales `optics.blur`,
`edge`, `inner-shadow`, and `depth` together. Tiers are ratios of the base, not
new materials.

---

## 9. Acceptance criteria for the material (how we'll judge it)

- Reads as **clear glass with depth**, not a colored or frosted plate.
- The violet on primary reads as **light inside the glass**, never a fill — if it
  looks like "a purple button," it fails.
- Identical light direction and material identity across sizes and backgrounds.
- Legible on light, dark, image and video backgrounds (AA holds).
- Calm: never the center of attention (Constitution).

---

> On approval of this material specification, the next steps are:
> 1. Encode these behaviors as additive sub-tokens in
>    `DISCIPLINE_CANONICAL_TOKENS.md` §2 (+ tokens.css / tailwind) — values then.
> 2. Build a **single Primary reference button** from this material.
> 3. Visual validation → it becomes the absolute reference of the Design System.
