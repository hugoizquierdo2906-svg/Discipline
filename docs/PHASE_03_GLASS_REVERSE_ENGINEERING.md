# Liquid Glass — Reverse Engineering of the References

> No code. No implementation. A product-designer / optics reading of the four
> references, then a precise gap analysis against our current reference button.
> Goal: understand **why our material does not yet read as glass**, before any
> further iteration. Mindset: *how does light travel through an 8 mm glass
> capsule?* — not *how do I reproduce this button in CSS?*

---

## 0. The optics a designer must hold in mind

Real glass produces five simultaneous phenomena. The brain reads "glass" only
when **most** of them are present and consistent with one light:

1. **Refraction (Snell).** Light bends entering/leaving the denser medium. A
   thick piece **displaces** what is behind it — strongest where the surface is
   curved (the rim/bevel), almost nil on the flat face. Real glass therefore
   shows a band near the edge where the background is **shifted, compressed, and
   sometimes magnified** — not merely blurred.
2. **Fresnel.** Reflectivity rises at grazing angles. The **face is transparent;
   the rim is bright and mirror-like.** Edges are always lighter/shinier than the
   center. This single fact is most of "polished vs matte."
3. **Total internal reflection (TIR).** Light bouncing inside reflects off the
   far inner wall, producing a **bright line along the lower / light-opposite
   inner edge** — the signature "underline" of a glass body.
4. **Specular highlight.** A small, **crisp, bright mirror image of the light
   source** on the convex top surface — a dot/streak, not a soft wash.
5. **Caustics & dispersion.** Light focused through the body concentrates into
   bright sheets *inside* the volume, and splits slightly into color at the rim.
   This is where a *captured* colored light can physically live.

And the **three zones** of a thick capsule the eye must separate:

- **Top face** — catches the sky/light: brightest, holds the specular and a
  convex gloss; slightly bulged (dome) so it looks touchable.
- **Core** — transmits the background, refracted/displaced, clearest here.
- **Bottom face** — catches the surface beneath + the TIR bright line; often a
  touch warmer/darker than the top.

When these three blend into one gradient, the brain reads **a gradient**, not a
**volume**. That is our current failure.

---

## 1. Reference #1 — "Focus" pill (violet gradient background)

- **Where light enters:** across the whole top rim, broadly.
- **Where it exits:** through the body — the purple background is visible,
  softened, behind the glass.
- **Refraction:** the rim **compresses and bends** the gradient behind; the edge
  band is a slightly displaced, brighter ring. The capsule subtly magnifies the
  background.
- **Internal reflection:** a soft bright band along the **bottom inner** edge.
- **Specular:** a thin, crisp bright line on the **upper rim**, brightest
  top-left.
- **Apparent thickness:** medium-thick; a visible bevel band reads as a few mm.
- **Densest:** at the rim and where it overlaps the opaque violet circle.
  **Thinnest:** the flat center face.
- **Lesson:** here the violet is mostly *transmitted background*, not internal
  capture — but it teaches **edge refraction + bottom internal-reflection band**.

## 2. Reference #2 — "Liquid Glass Kit" (beige)

- **Light enters** the top: each pill has a bright **gloss band across the top
  third** (the convex top face).
- **Exits / TIR:** the clear pills show a **bright crisp line along the bottom
  edge** — the lower face lit by internal reflection.
- **Refraction:** the small clear bubble visibly **acts as a lens**, magnifying
  and distorting the background — unmistakable refraction.
- **Thickness:** strong contact shadows = float; the gloss-top + bright-bottom
  pairing makes the two faces explicit.
- **Densest:** rim and bottom edge. **Thinnest:** upper-mid face under the gloss.
- **Lesson:** the **two faces must be explicit** — a bright convex top band and a
  bright bottom TIR line, with a clearer core between. (We keep the colorful
  candy fill out, per the Constitution.)

## 3. Reference #3 — "Flowly" sidebar (lavender wavy background)

- **Light enters** diffusely (frosted, high scatter).
- **Refraction (the key example):** the wavy vertical texture behind is **visibly
  displaced / warped** through the panels — the lines bend as they pass under the
  glass. This is **displacement**, not blur.
- **Internal reflection:** subdued (frosted), but edges stay lit; thickness reads
  through the soft edge + cast shadow.
- **Densest:** edges. **Thinnest:** center.
- **Lesson:** **true refraction distorts the background.** A blur alone never
  produces this. Our material has zero displacement today.

## 4. Reference #4 — "Source BTN v.02" (grey) — the masterclass

- **Where light enters:** top-left — a **bright, crisp specular rim** on the
  upper-left bevel.
- **Where it exits / refraction:** the **thick beveled edge behaves like a lens
  ring** — the grey background is compressed and wraps *inside* the contour; you
  read a real side-wall of glass.
- **Internal reflection:** a **bright line on the bottom-right inner edge**
  (opposite the light) — the lower wall reflecting.
- **Specular:** a **small, very bright, crisp glint** on the top edge.
- **Apparent thickness:** substantial. The **bevel is a distinct band** with its
  own bright-then-dark-then-bright tension — a real lens contour.
- **Densest:** the rim/bevel (most glass, most refraction, brightest Fresnel).
  **Thinnest:** the flat center face (most transparent, least distortion).
- **Edge tension:** the contour is **not uniform** — a very bright segment
  (light-facing), a **break**, then a darker segment, then a secondary catch.
- **Lesson:** this is our target — **Fresnel rim + lens-edge refraction + bottom
  TIR line + crisp specular + a real bevel with tension.**

---

## 5. Synthesis — what the brain needs to see

A convincing glass capsule shows, under one upper-left light:

1. A **transparent face** that **transmits** the real background (not a white fill).
2. A **rim that refracts** — displaces/compresses the background in an edge band.
3. A **Fresnel edge** brighter and shinier than the face, **non-uniform**
   (bright → break → dark).
4. A **bottom internal-reflection line** (the glass "underline").
5. A **small crisp specular** on a **convex** top (the dome that invites touch).
6. **Thickness**: a readable side-wall/bevel separating top face, core, bottom.
7. (For DISCIPLINE) a **violet caustic sheet trapped in the core** — light folded
   *between* the faces, with a brighter concentrated band and faint dispersion at
   the rim — not a soft blob laid on top.

---

## 6. Gap analysis — our current reference button vs the above

Mapped to the five problems you raised, plus the underlying optics:

| # | Missing phenomenon | Why ours fails | What it should read as |
|---|---|---|---|
| 1 | **Polished surface (the "matte" problem)** | No crisp specular, no Fresnel rim, no TIR line → the surface looks scattered/frosted. | A small **sharp** specular + a **bright mirror-like rim** = polished, touchable. |
| 2 | **Refraction / displacement** | Our "refraction" layer only **blurs + saturates** the background. It never **displaces** it. The edge does not bend what's behind. | The rim must **shift/compress the background** (a lens band), à la #3/#4. |
| 3 | **Volume (three zones)** | Our fill is **one top→bottom gradient**; top face, core and bottom face merge → the brain reads a gradient. | Three explicit zones: bright convex **top face**, clear **core**, **bottom face** with a TIR line. |
| 4 | **Violet too diffuse (a glow, not a sheet)** | The reflection is a soft blurred blob **over** the body. | A **caustic sheet trapped inside the thickness** — a concentrated band with falloff and faint rim dispersion. |
| 5 | **Edge lacks tension** | Our edge is a near-uniform 135° gradient ring. | A real lens contour: **very bright segment → break → darker segment**, tracking the light. |
| + | **Fresnel** (absent) | Edge and face are nearly equal in brightness. | Edge **clearly brighter** than face. |
| + | **Bottom TIR line** (absent) | No bright underline. | A bright thin line on the **lower inner** edge. |
| + | **Convexity** (absent) | The top is flat. | A subtle **dome** so the specular curves — "touchable." |
| + | **True transmission** (weak) | Fill alpha is high (white-ish) → opaque/milky, especially on dark. | Lower face opacity so the **background really shows through**, letting refraction read. |

### Root cause (your diagnosis, confirmed)
We were **reproducing a picture with CSS layers** instead of **simulating how
light crosses a thick glass body**. The missing pieces are all *optical
behaviors* (refraction-as-displacement, Fresnel, TIR, crisp specular,
caustic capture, convex thickness) — not more gradients. Adding gradients will
not fix it; only modeling these behaviors will.

---

## 7. Implications for the next attempt (concept only — no code here)

When we resume implementation, the material must be modeled as **light through an
~8 mm capsule**, providing at minimum:

- **Displacement refraction** at the rim (the background visibly bends) — a real
  distortion, not a blur. (On the web this is the domain of an SVG displacement /
  filter; that is the *concept*, to be specified later.)
- A **Fresnel edge** brighter than the face, **non-uniform** with a break.
- A **bottom internal-reflection line.**
- A **crisp, small specular** on a **convex** top.
- **Lower transmission opacity** so the background reads through (tuned per
  background, light vs dark).
- The **violet as a caustic sheet** inside the core (concentrated band + falloff
  + faint rim dispersion), never a surface glow.

---

> Next: on your go-ahead, I will turn this optical model into a precise build
> specification for the single reference button (still no other component), and
> only then implement. First, we agree on the **reading** we are chasing.
