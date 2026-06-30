# Liquid Glass — Material Token Proposal (for approval)

> **Awaiting validation before anything is added to the canonical tokens.**
> Rules honored: additive only · no existing token renamed/removed/changed ·
> tokens describe **physical material properties**, never components · the
> material is defined **once** and composed by every component (Button, Card,
> Input, Modal, Navbar, Sidebar…). Violet is only an **accent of** the material,
> never the material itself.
>
> Proposed home: a new sub-section in `DISCIPLINE_CANONICAL_TOKENS.md` §2
> ("Glass material") + mirror in `tokens.css` / `tailwind.config.ts`.
> Existing `--ds-glass-thin/regular/thick/border/highlight` stay untouched.
> Values below are starting points, to be fine-tuned during visual validation.

---

## A. Optics / refraction (how the background is bent through the glass)

| Token | Proposed value | Role |
|---|---|---|
| `--ds-glass-blur` | `16px` | Backdrop blur radius of the material (controls). Distinct from the heavier card blur (`--ds-blur-glass` 32px). |
| `--ds-glass-saturation` | `140%` | Backdrop `saturate()` — revives color seen through the glass. |
| `--ds-glass-brightness` | `105%` | Backdrop `brightness()` — faint lift so the material reads on the off-white canvas. |
| `--ds-glass-refraction` | `1.5px` | Edge refraction offset (subtle chromatic/positional shift hint at the rim). |
| `--ds-glass-distortion` | `0` | Reserved SVG displacement scale (progressive enhancement; off by default — no neon/Dribbble distortion). |

## B. Fill (the multilayer surface — near-colorless)

| Token | Proposed value | Role |
|---|---|---|
| `--ds-glass-fill-top` | `rgba(255,255,255,0.55)` | Top stop of the surface gradient (lit, brighter). |
| `--ds-glass-fill-bottom` | `rgba(255,255,255,0.30)` | Bottom stop (shaded) — gives a curved, physical surface. |

## C. Accent (violet only as a tint of the material)

| Token | Proposed value | Role |
|---|---|---|
| `--ds-glass-accent-tint` | `rgba(139,124,255,0.18)` | Faint Brand-violet wash overlaid on the fill for the Primary variant. Low alpha: material first, color second. |
| `--ds-glass-accent-tint-bottom` | `rgba(139,124,255,0.10)` | Lower stop of the accent wash (keeps the curved-surface read). |

## D. Edge (the thin luminous machined contour)

| Token | Proposed value | Role |
|---|---|---|
| `--ds-glass-edge-light` | `rgba(255,255,255,0.90)` | Bright edge stop (top-left) — light catching the bevel. |
| `--ds-glass-edge-dim` | `rgba(255,255,255,0.20)` | Dim edge stop (bottom-right). |
| `--ds-glass-edge-width` | `1px` | Edge thickness. |

## E. Inner light (depth inside the glass)

| Token | Proposed value | Role |
|---|---|---|
| `--ds-glass-inner-highlight` | `rgba(255,255,255,0.65)` | Top inset highlight — the lit upper rim. |
| `--ds-glass-inner-shadow` | `rgba(16,16,16,0.12)` | Bottom inset shadow — glass thickness / concavity. |

## F. Specular (the small bright glint)

| Token | Proposed value | Role |
|---|---|---|
| `--ds-glass-specular` | `rgba(255,255,255,0.75)` | Specular highlight color. |
| `--ds-glass-specular-opacity` | `0.5` | Specular strength (kept subtle). |

## G. Depth (realistic diffuse shadows + faint glow)

| Token | Proposed value | Role |
|---|---|---|
| `--ds-glass-shadow` | `0 1px 1px rgba(16,16,16,0.06), 0 2px 8px rgba(16,16,16,0.08), 0 8px 24px rgba(16,16,16,0.10)` | Resting depth: contact + diffuse float. |
| `--ds-glass-shadow-hover` | `0 1px 1px rgba(16,16,16,0.06), 0 4px 14px rgba(16,16,16,0.10), 0 14px 36px rgba(16,16,16,0.14)` | Elevated depth on hover. |
| `--ds-glass-glow` | `0 0 0 1px rgba(139,124,255,0.20), 0 6px 20px rgba(139,124,255,0.14)` | Very discreet accent halo (hover/active only). Lighter than the existing `--ds-shadow-accent-glow`. |

---

## How components compose these (one material, composed)

A glass surface = backdrop( `blur` · `saturation` · `brightness` ) + fill gradient
(`fill-top`→`fill-bottom`, plus `accent-tint` for Primary) + edge ring
(`edge-light`→`edge-dim` at `edge-width`) + inset(`inner-highlight` top,
`inner-shadow` bottom) + specular(`specular` at `specular-opacity`) + outer
`glass-shadow` (→ `glass-shadow-hover`, + `glass-glow` when accented).

Every glass component (Button, Card, Input, Modal, Navbar, Sidebar) references the
**same** tokens — defined once here, never redefined per component.

---

## Guardrails

- Additive: existing tokens untouched.
- Restraint: low alphas, no saturation spikes, no neon — "material before color".
- Accessibility: labels keep canonical text tokens; re-audited with axe (0 target).
- Performance: ≤ 3 stacked backdrop layers; `will-change` only during hover.
- Reduced motion: specular/animation disabled.

---

> **Please validate this token list.** On approval I will: (1) add these to
> canonical §2 + tokens.css + tailwind, then (2) build a **single Primary
> reference button** for visual validation — which, once approved, becomes the
> material reference for all other primitives.
