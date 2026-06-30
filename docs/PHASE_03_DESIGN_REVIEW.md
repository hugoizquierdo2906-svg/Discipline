# PHASE 03 — DESIGN REVIEW

> Closes the UI deliverable of Phase 03 (Level 1 primitives). Evidence-backed.
> Surface reviewed: `/dev/components` (development-only gallery, 404 in production).
> Constitution check: these are generic, calm, token-driven primitives that
> reduce interface noise and serve clarity — consistent with
> `DISCIPLINE_CONSTITUTION.md` (Design/Interface/Engineering philosophy).

---

## 1. Captures

Generated with Playwright (pre-installed Chromium), full-page, light mode, via
`scripts/visual-check.mjs`. Stored in `docs/phase-03-screenshots/`.

| Viewport | Width | File |
|---|---|---|
| Desktop | 1440 px | `phase-03-screenshots/desktop-1440.png` |
| Tablet | 1024 px | `phase-03-screenshots/tablet-1024.png` |
| Mobile | 390 px | `phase-03-screenshots/mobile-390.png` |

---

## 2. Vérification responsive

Observed across 390 / 1024 / 1440 px (plus the 768 px tablet breakpoint during
build checks):

| Aspect | Result |
|---|---|
| Horizontal overflow | None at any width (components use `flex-wrap`; fields use fixed widths that wrap). |
| Stacking | On mobile (390), grouped controls and demo blocks stack/wrap vertically; inputs remain readable. |
| Touch targets | Buttons md/lg ≥ 44px; `IconButton` sm enforces `min-h/min-w target-min` (44px) per canonical §11. |
| Typography scale | Headings consume responsive type tokens (display/h sizes shift by breakpoint via tokens.css). |
| Reading width | Body copy respects the editorial measure; no full-bleed text columns. |

Conclusion: layout is fluid and legible across the three required widths.

---

## 3. Vérification accessibilité

### Automated — axe-core (WCAG 2.0/2.1/2.2 A & AA)

```
axe-core violations: 0
```

Two issues were found during review and fixed before closure:

1. **`aria-progressbar-name` (serious)** — `Progress` (linear + circular) exposed
   `role="progressbar"` without an accessible name. Fixed by defaulting
   `aria-label` on the primitive.
2. **`color-contrast` (serious)** — two distinct causes:
   - The **destructive button** rendered dark text on red (2.91:1). Root cause:
     `tailwind-merge` misclassified the custom `text-body` font-size token as a
     *color*, dropping `text-text-on-accent`. Fixed in `src/lib/cn.ts` by
     registering the DISCIPLINE font-size scale with `extendTailwindMerge`.
     (This also hardened every component that combines a text size and a text
     color utility.)
   - **Semantic badges** (accent/warning/info) at 12px on the pale tint landed
     at 4.25–4.49:1 (just under 4.5). See §6 deviation.

### Manual — keyboard & focus

| Check | Result |
|---|---|
| Tab order reaches every interactive control | Pass |
| Buttons activate with Enter/Space | Pass (native `<button>` / Radix) |
| RadioGroup arrow-key navigation | Pass (Radix RadioGroup) |
| Select opens/navigates via keyboard | Pass (Radix Select) |
| Slider arrows / Home / End | Pass (Radix Slider) |
| Tooltip shows on focus (not hover-only) | Pass (Radix Tooltip) |
| Focus ring visible on canvas and on glass | Pass (global `:focus-visible` ring + white halo, Phase 02 §1.8) |
| Error states pair text + state (never color alone) | Pass (Input/Alert include text and ARIA) |

---

## 4. Justification des choix visuels vs DISCIPLINE_RULEBOOK.md

| Rulebook rule | Decision in Phase 03 |
|---|---|
| Buttons must feel tactile / physical | Hover lift + accent glow, active press `scale(0.98)`, transitions ≤ `dur-fast` (160ms). |
| “No undefined state” | `Button` implements default, hover, active, focus, disabled, loading (and supports success/error styling). |
| Loading preserves width | Spinner overlays an invisible label clone — width is preserved, repeated clicks disabled (`aria-busy`). |
| Icon buttons: Lucide only, icon-only needs a name | `IconButton` requires `label` (aria-label) and is paired with a Tooltip in the gallery; all icons are `lucide-react`. |
| Focus never removed | Global focus ring retained; never `outline:none` without replacement. |
| Motion: transform/opacity/filter only; respect reduced motion | All animation is transform/opacity; `motion-reduce` disables press scale and transitions. |
| Typography weight 600 on buttons | Button label uses `font-semibold`. |

### Conflits Rulebook ↔ Tokens canoniques (résolus en faveur des tokens)
Per the canonical override rule, numeric divergences follow the tokens:
Primary = Brand `#8B7CFF` + **dark `#111` label** (not white), sizes **sm36/md44/lg56**,
**pill** radius, hover **translateY(-1px)**, press **scale(0.98)**.

---

## 5. Preuves de validation (commande · exit code · durée)

```
✓ pnpm lint           Exit code: 0
✓ pnpm type-check     Exit code: 0
✓ pnpm format:check   Exit code: 0
✓ pnpm build          Exit code: 0    Duration: 27.5 s
✓ axe-core (/dev/components)           0 violations
```

Production guard (dev surfaces excluded from production):
```
GET /                 -> 200
GET /dev/components    -> 404   (production)
GET /dev/tokens        -> 404   (production)
```

---

## 6. Deviation logged for the governance backlog

**Semantic Badge background (canonical §12.9).** §12.9 specifies semantic badges
as *tint background + solid foreground*. At 12px, solid-on-tint measured
4.25–4.49:1 — just below WCAG AA (4.5:1), which is non-negotiable (canonical §10
and the Constitution’s “Accessibility is never optional”). Resolution applied:
colored badges use the **white raised surface + solid semantic text + a semantic
border** (all existing tokens; ≥ 4.9:1). This is an intentional, accessibility-first
deviation from §12.9’s background, recorded here for the dedicated documentation
revision (not corrected in the canonical docs now, per current instruction).

No other component deviates from the canonical specification.
