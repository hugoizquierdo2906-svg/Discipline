import { cn } from '@/lib/cn'

import { GlassSurface } from './glass-surface'

/**
 * Control Surface — shared scaffolding for the DISCIPLINE Liquid Glass form
 * family (Input · Textarea · Select · DatePicker · Search · FileInput). Every
 * member renders the SAME optical layers as the frozen Button (<GlassSurface/>)
 * inside a `.ds-glass .ds-control` host, then places its content above them.
 * The recessed Control Surface material lives in `glass.css` (`.ds-control`,
 * frozen from the validated /dev/input reference); here we only standardize the
 * host geometry and the content layer so the whole family is visually identical.
 *
 * Single-line members use `controlHostClass` (48px well). Multi-line / bespoke
 * members (Textarea, FileInput) reuse `ds-glass ds-control` with their own
 * geometry. Content must sit on the content plane (z-3) so it reads above the
 * machined edge (z-2).
 */

/** Host classes for a single-line Control Surface (Input, Search, Select &
 * DatePicker triggers). Add state via `controlStateClass`. */
export const controlHostClass =
  'ds-glass ds-control relative flex h-12 items-center gap-3 rounded-md px-4'

/** The content plane — above every optical layer (edge is z-2). */
export const controlContentClass = 'relative z-[3] min-w-0'

/** The text entry element shared by Input/Textarea/Search. */
export const controlFieldClass =
  'relative z-[3] min-w-0 flex-1 bg-transparent text-body text-text outline-none placeholder:text-text-tertiary disabled:cursor-not-allowed'

/** Leading/trailing adornment (icon, prefix, suffix). */
export const controlAdornmentClass =
  'relative z-[3] inline-flex shrink-0 items-center text-text-tertiary'

/** State modifiers on the `.ds-control` host. */
export function controlStateClass({
  error,
  focus,
  disabled,
}: {
  error?: boolean
  focus?: boolean
  disabled?: boolean
} = {}) {
  return cn(
    error && 'ds-control--error',
    focus && 'ds-control--focus',
    disabled && 'ds-control--disabled',
  )
}

/** The optical layer stack — placed as the first child of any `.ds-control`. */
export function ControlSurface() {
  return <GlassSurface />
}

/** The Control family's popup recipe — a raised token surface, NOT glass
 * ("a suspended, independent floating sheet: not more blur, not more glass;
 * a stronger elevation shadow so the plane clearly hovers above the field").
 * Pure extraction from the frozen Select's own menu (`SelectPrimitive.Content`
 * className) so any other Control Surface popup (e.g. MultiSelect) reuses the
 * exact same recipe instead of composing GlassSurface a second time. Select
 * itself is untouched — this only gives the recipe a shared name. Geometry
 * (width, max-height) stays with each consumer. */
export const controlPanelClass =
  'z-dropdown overflow-hidden rounded-md border border-border bg-surface-raised shadow-4'

/** The frozen Select menu's inner padding, extracted the same way. */
export const controlPanelPaddingClass = 'p-1.5'

/** The frozen Select trigger's chevron-rotate recipe, extracted the same
 * way, so a sibling Control Surface trigger (e.g. MultiSelect) reuses the
 * exact same motion instead of writing its own. */
export const controlChevronMotionClass =
  'transition-transform duration-fast ease-standard'
