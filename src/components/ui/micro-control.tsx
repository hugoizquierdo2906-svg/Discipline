import { cn } from '@/lib/cn'

/**
 * Micro control — the shared expression of the SMALL tactile Micro members
 * (Checkbox · Radio · Switch). The Micro role's full glass lives on Button
 * (the frozen reference, ≥34px); at ≤24px the Glass Budget (§3) is spent on
 * almost nothing: a crisp token box, the Brand accent as the active fill, the
 * GLOBAL `:focus-visible` ring (globals.css — never redeclared) and the fast
 * standard motion. One definition — Checkbox/Radio/Switch and every future
 * small control compose these constants, never their own recipe.
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

/** The sliding glyph (Switch thumb) — the SAME dark glyph philosophy as the
 * Checkbox check and the Radio dot, in motion. (Additive extraction: the
 * frozen Checkbox/Radio outputs are untouched.) */
export const microControlThumbClass = cn(
  'block rounded-pill bg-text',
  'transition-transform duration-fast ease-standard motion-reduce:transition-none',
)
