# DISCIPLINE — GLASS MATERIAL TESTS

Status: DRAFT (for approval) · Governed by DISCIPLINE_CONSTITUTION.md
Builds on: DISCIPLINE_GLASS_MATERIAL.md · _CONSTRUCTION.md · _GRAMMAR.md · _BUDGET.md

> Construction and Grammar say how to build and when. These are the tests that
> say when the material is **wrong**. A glass component is not "done" because its
> code is valid; it is done when it **passes these tests**. They are the gate of
> the Visual Validation step (workflow: … → Validation visuelle ⭐ → Verrouillage).
> No CSS, no values — pass/fail criteria only.

---

## How to use

Run every test against a component **before** it is considered finished, and
always **next to the Primary reference button**. A single failure means the
material is incorrect, even if lint/type/build are green and axe is clean.

---

## 1. Blind Test
**Method:** remove the text/content.
**Question:** is the shape still unmistakably **glass**?
**Pass:** the empty component still reads as a glass body (edge, depth, light).
**Fail:** without content it looks like a flat colored/white pill.

## 2. Silhouette Test
**Method:** view in grayscale (no color).
**Question:** is the **volume** still legible — top face, core, bottom face?
**Pass:** thickness and the three zones read without any color cue.
**Fail:** it collapses to a flat gradient; no volume survives the loss of color.

## 3. Blur Test
**Method:** view at ~50% zoom (or squint / downscale).
**Question:** does the material stay **credible** when small/soft?
**Pass:** it still reads as a coherent piece of glass with a lit edge.
**Fail:** it turns into a muddy blob or a plain shape; the material disappears.

## 4. Light Test
**Method:** move the implied light (mentally or by mirroring the layout).
**Question:** does the component stay **coherent** under the one global light?
**Pass:** highlights, edge and shadow all agree with a single light direction.
**Fail:** highlights point one way, shadows another — the light is inconsistent.

## 5. Consistency Test
**Method:** place Button, Card, Modal and Tooltip side by side.
**Question:** do all four look **cut from the same material**?
**Pass:** same light, same edge logic, same glass — only the expression differs.
**Fail:** any one looks like a different material (the coherence test, Material §6c).

## 6. Removal Test
**Method:** remove one optical layer.
**Question:** does the material **immediately** lose credibility?
**Pass (layer justified):** removing it visibly breaks the glass → the layer earns
its place.
**Fail (layer useless):** removing it changes almost nothing → **delete the
layer.** Every layer must be necessary (Construction §0; Constitution: "every
element must justify its existence").

## 7. Constitution Test
**Method:** for each layer / effect, ask the Fundamental Question.
**Question:** does this improve **understanding** or **autonomy** — or is it mere
decoration that pulls attention to the interface?
**Pass:** it serves clarity/calm and stays out of the way.
**Fail:** it exists to impress → it disappears (Constitution: "the interface
should never become the center of attention").

---

## Test outcome

- **All seven pass** → the material is correct; the component may proceed to
  Visual Validation and locking.
- **Any fail** → the material is wrong. Fix the optics (or remove the offending
  layer); re-run. Never lock a component that fails a test on "valid CSS" grounds.

> These tests, with the Reference Button, are the permanent guard against design
> regression. They replace opinion with a repeatable check: *is this still the
> DISCIPLINE glass?*
