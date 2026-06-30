# PHASE 03 — Liquid Glass Redesign Plan (buttons & primitives)

> **No code in this document.** Analysis → layer decomposition → reproduction
> method. Implementation starts only after explicit visual-approach validation.
> Trigger: the primitives are technically correct but read as generic Tailwind;
> they do not express the DISCIPLINE Liquid Glass material.

---

## 0. Constitution Check (mandatory)

- **Understanding / autonomy:** neutral — these are foundational primitives.
  A premium-but-quiet material does not distract from content if it stays calm.
- **Unnecessary complexity / attention:** real risk. The Constitution states
  "the interface should never become the center of attention" and "minimalism is
  evidence that nothing unnecessary remains." Reference image #2 (candy-colored,
  glossy, playful) **conflicts** with this. References #1 (Focus) and #4
  (machined Source BTN) — restrained, luminous, Apple-like — are **compatible**.
- **Resolution:** anchor the material on the **quiet / machined** end (#1 + #4),
  not the colorful/glossy end (#2). Glass is the brand material, used calmly:
  depth and light, never spectacle. This keeps both the canonical Liquid Glass
  identity and the Constitution's restraint.

---

## 1. Reference analysis

| Ref | What it shows | Take / leave |
|---|---|---|
| **#1 Focus pill** (violet gradient bg) | A clear glass capsule: visible background through it, bright luminous top-left rim, top inner highlight, soft bottom inner shadow, diffuse float shadow; contains an opaque violet circular icon button. | **Take:** luminous edge, inner highlight + inner shadow, transparency, float shadow. The opaque violet circle = our primary fill logic. |
| **#2 Liquid Glass Kit** (beige) | Saturated gradient candy pills, heavy gloss, strong colored shadows, toggles. | **Leave** the candy gloss and colored shadows (too playful, conflicts with Constitution). Keep only the idea of a subtle top sheen. |
| **#3 Flowly sidebar** (lavender wavy) | Large frosted panels with refraction/wave distortion seen through the glass; very low contrast. | **Take** the calm frosted refraction idea for large surfaces (Phase 04 cards), **not** for small buttons. |
| **#4 Source BTN v.02** (grey) | Near-colorless "machined" glass — thick beveled edge catching light, crisp specular rim, inner highlight, minimal. | **Take** as the primary reference for button material: machined edge, specular rim, thickness, restraint. |

**Synthesis for DISCIPLINE:** a *machined, luminous, quiet* glass — the Source
BTN edge quality (#4) + the Focus capsule layering (#1), tinted with the single
violet accent only where the canonical spec requires a filled control.

### Reality check — off-white canvas
The references sit on dark/vivid/grey backgrounds where glass pops. The
DISCIPLINE canvas is off-white `#FAFAF8`. On light backgrounds, transparency
reads weakly and edges wash out. Consequence: on the app canvas the glass must
lean on **opacity + inner shadow + a crisp luminous edge** to read as a material;
over media/hero (dark) it can become more transparent. The material must be
tuned for **both** backgrounds (validated on a light panel and a media panel).

---

## 2. Visual layer decomposition (the material stack)

Bottom → top, the button is built from ~8 layers:

1. **Outer depth** — diffuse drop shadow (float) + tight contact shadow (anchor).
   → "ombres diffuses", "profondeur importante".
2. **Backdrop refraction** — `backdrop-filter: blur() saturate()` so the real
   background is visibly bent through the control. → "transparence physique",
   "réfraction subtile".
3. **Base fill, multilayer** — a translucent base color plus a top→bottom
   gradient (lighter top, slightly darker bottom) that reads as a curved
   surface. Violet-tinted for primary; near-clear white for secondary/clear.
   → "fond multicouche", "véritable matériau en verre".
4. **Inner shadow (bottom inset)** — subtle inset dark at the lower inner edge →
   glass thickness / concavity. → "inner shadow".
5. **Inner highlight (top inset)** — inset light line at the top inner edge → the
   lit upper rim. → "inner highlight".
6. **Luminous edge** — 1px border whose color is a gradient: bright at top-left,
   dim at bottom-right → a machined, light-catching rim. → "bord en verre
   lumineux".
7. **Specular highlight** — one small soft bright glint near the top edge (static,
   low opacity). → "specular highlight".
8. **Glow (optional, very light)** — faint accent halo on hover/active only. →
   "glow très léger".

---

## 3. Reproduction method (CSS techniques, described)

| Layer | Technique |
|---|---|
| 1. Outer depth | A single composite `box-shadow` with two outer layers (diffuse + contact). New token `--ds-shadow-glass`. |
| 2. Backdrop refraction | `backdrop-filter: blur(var(--ds-blur-glass)) saturate(120%)` (+ `-webkit-`). `@supports` fallback to a more opaque fill where unsupported. |
| 3. Base fill | `background:` a `linear-gradient(180deg, lighter, darker)` over a translucent base var. Primary uses an accent-tinted translucent token; clear uses white translucency. |
| 4 + 5. Inner shadow + highlight | Added to the same `box-shadow` as **inset** layers: `inset 0 1px 0 rgba(255,255,255,a)` (top highlight) and `inset 0 -1px 2px rgba(16,16,16,a)` (bottom shadow). |
| 6. Luminous edge | A `::before` ring using the padding-box/border-box gradient-border trick (a `linear-gradient` masked so only the 1px border shows), bright→dim. Pure CSS, no image. |
| 7. Specular | A `::after` absolutely-positioned, `pointer-events:none`, soft white radial/linear highlight near the top, low opacity. |
| 8. Glow | Extra outer layer in `box-shadow` on hover/active using `--ds-shadow-accent-glow`, kept faint. |

**Interaction (per Rulebook, canonical magnitudes):** hover = `translateY(-1px)` +
edge brightens + glow appears; active = `scale(0.98)` + highlight dims (pressed
glass); all ≤ `--ds-dur-fast` (160ms), `transform`/`opacity`/`box-shadow` only.
`prefers-reduced-motion` disables the press scale and any sheen.

---

## 4. Token additions (require approval — touches the canonical layer)

To keep "no raw values", the material needs named tokens. Proposed addition to
`DISCIPLINE_CANONICAL_TOKENS.md` §2 (a new "Glass material layers" block), then
mirrored into `tokens.css` / `tailwind.config.ts`:

- `--ds-glass-fill-clear-top` / `--ds-glass-fill-clear-bottom` (surface gradient, clear)
- `--ds-glass-fill-violet-top` / `--ds-glass-fill-violet-bottom` (accent-tinted)
- `--ds-glass-inner-highlight` (top inset light)
- `--ds-glass-inner-shadow` (bottom inset dark)
- `--ds-glass-edge-bright` / `--ds-glass-edge-dim` (luminous edge gradient stops)
- `--ds-glass-specular` (glint color/opacity)
- `--ds-shadow-glass` (composite outer diffuse + contact)

> This is a **canonical token extension**, not a change to existing values, so it
> respects the Phase 02 lock (additions for a blocking need) and the Constitution's
> modification rule (deliberate, justified). It will be done **only after approval**.

---

## 5. Per-variant application

| Variant | Material |
|---|---|
| **Primary** | Violet-tinted glass (accent fill + gradient), dark `#111` label (canonical §12.3 locked), full layer stack, faint glow on hover. Reads as a solid-yet-translucent violet capsule. |
| **Secondary** | Clear glass (white translucency), dark label, full stack — the Focus-capsule look. |
| **Ghost** | Minimal: no fill, accent-accessible label, edge + highlight appear only on hover (quietest). |
| **Outline** | Clear, stronger luminous edge, transparent fill. |
| **Destructive** | Error-tinted glass, white label (already AA), restrained glow. |
| **IconButton** | Circular version of the same stack (the violet moon-circle in ref #1). |

Other primitives (Input, Select, Switch, Slider thumb, Tooltip, Badge) get the
*restrained* edge + highlight treatment so the family is coherent — but buttons
are the priority for this pass.

---

## 6. Accessibility & performance guardrails

- **Contrast:** labels keep canonical text colors; effective background on the
  tinted/clear glass over off-white stays light, so `#111` label passes AA.
  Re-run axe after redesign — target **0 violations** (non-negotiable).
- **Focus:** global accent ring + white halo retained (visible on glass).
- **Glass layer budget:** ≤ 3 stacked `backdrop-filter` layers (canonical §2).
- **GPU:** animate only transform/opacity/box-shadow; `will-change` on hover only.
- **Fallback:** `@supports not (backdrop-filter)` → more opaque fill, edges kept.

---

## 7. Validation method (the new ⭐ step)

After implementation + technical audit, produce **visual proof** before locking:
- `/dev/components` captures at 1440 / 1024 / 390 (existing script).
- **Plus** a dedicated glass proof: each button variant rendered over (a) the
  off-white canvas and (b) a dark/violet media panel, to prove real transparency
  and edge light on both. Side-by-side at rest / hover / active.
- axe-core: 0 violations.
- Then await **explicit visual validation** → only then lock Phase 03.

---

## 8. Workflow (now permanent)

```
Préparation → Validation → Implémentation → Audit technique → Validation visuelle ⭐ → Verrouillage
```

A phase is never locked on technical green alone; visual validation is a required
gate (recorded in DISCIPLINE_PROMPT.md and CLAUDE.md).

---

> **Awaiting your validation of this visual approach before writing any code.**
> Open decision: confirm the *quiet / machined* anchor (refs #1 + #4) over the
> colorful/glossy anchor (ref #2), and approval to extend canonical §2 with the
> glass-material tokens (§4).
