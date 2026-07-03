import { cn } from '@/lib/cn'

import { GlassSurface } from './glass-surface'

/**
 * Micro control — the shared expression of the SMALL tactile Micro members
 * (Checkbox · Radio · Switch · Slider). The Micro role's full glass lives on
 * Button (the frozen reference, ≥34px); Checkbox/Radio spend almost none of
 * that budget (a crisp token box, the Brand accent fill, the GLOBAL
 * `:focus-visible` ring — never redeclared). Switch and Slider spend more of
 * the SAME envelope: they draw on the real glass material directly, so this
 * file also hosts the pieces that lets a consumer do that WITHOUT ever
 * naming the material itself (no `GlassSurface`/`backdrop-filter`/`blur`/
 * `box-shadow`/`rgba`/`transition` string in the consumer's own file — a
 * grep-provable guarantee that every optical/motion decision still comes
 * from this one shared foundation).
 */

/** The resting box: token border + surface, fast color motion, disabled dim. */
export const microControlBoxClass = cn(
  'shrink-0 border border-border-strong bg-surface',
  'transition-colors duration-fast ease-standard motion-reduce:transition-none',
  'disabled:cursor-not-allowed disabled:opacity-40',
)

/** The active fill — the Brand accent, glyph in dark text (the primary-button
 * contrast logic). Covers both checked and indeterminate. */
export const microControlActiveClass = cn(
  'data-[state=checked]:border-accent data-[state=checked]:bg-accent',
  'data-[state=indeterminate]:border-accent data-[state=indeterminate]:bg-accent',
)

/** Invalid rim — the same error language as the Control family. */
export const microControlInvalidClass =
  'border-error data-[state=checked]:border-error data-[state=indeterminate]:border-error'

/** The frozen optical-layer stack, re-exported under a foundation-neutral
 * name so a Micro consumer never has to name the material directly — it
 * composes `<MicroGlass/>` the same way Button/Switch compose
 * `<GlassSurface/>`, because that IS what this renders. Nest it inside any
 * `.ds-glass` host; it inherits `.ds-micro` from the nearest ancestor that
 * carries that class (descendant selector — the same leak-free nesting
 * already used for a Button inside a Card, or Switch's own thumb). */
export const MicroGlass = GlassSurface

/** Motion for a sliding/draggable Micro thumb (position changes via
 * transform) — the exact recipe Switch's thumb already uses, extracted so a
 * new Micro consumer never writes its own motion recipe. */
export const microControlThumbMotionClass = cn(
  'transition-transform duration-fast ease-standard motion-reduce:transition-none',
)

/** The "illuminated" Micro accent — light diffusing through an unmodified
 * glass body, not a painted fill. Same values as the frozen Switch checked
 * rail (--ds-color-accent at 42% density behind the existing backdrop-filter,
 * the same reused Button-Primary halo, the layer's own violet-caustic
 * revealed) generalized to an UNCONDITIONAL class for any Micro element that
 * is always "the active/filled portion" (e.g. a Slider's Range) rather than
 * toggled by a `data-state`. Requires the element to render `<MicroGlass/>`
 * as its own direct child. */
export const microControlActiveGlassClass = cn(
  'bg-[color-mix(in_srgb,var(--ds-color-accent)_42%,transparent)]',
  'shadow-[0_2px_18px_rgba(139,124,255,0.22)]',
  '[&>.ds-glass__body>.ds-glass__violet]:opacity-100',
)
