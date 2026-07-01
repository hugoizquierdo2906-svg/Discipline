import { GlassSurface } from './glass-surface'

/**
 * Floating Surface — shared scaffolding for the DISCIPLINE Liquid Glass floating
 * family (Calendar overlay · Popover · DropdownMenu · ContextMenu · Command
 * Palette · Toast). Every member renders the SAME optical layers as the frozen
 * Button (<GlassSurface/>) inside a `.ds-glass .ds-floating` host, then places
 * its content above them. The transient Floating material lives in `glass.css`
 * (`.ds-floating`, frozen from the validated Tooltip reference); here we only
 * standardize the host + content plane so the whole family is visually identical.
 *
 * A thin, suspended pane: medium transmission (it floats over content), a medium
 * Fresnel rim carrying the read, a light detaching shadow, neutral (no violet).
 * Consumers own their geometry (radius, padding, block/flex layout, width) —
 * Invariant A1: the base never makes a layout decision. Content must sit on the
 * content plane (z-3) so it reads above the machined edge (z-2).
 */

/** Host classes for a Floating Surface (calendar overlay, popover, dropdown).
 * The material only; the consumer adds radius / padding / layout. */
export const floatingHostClass = 'ds-glass ds-floating relative'

/** The content plane — above every optical layer (edge is z-2). */
export const floatingContentClass = 'relative z-[3]'

/** The optical layer stack — placed as the first child of any `.ds-floating`. */
export function FloatingSurface() {
  return <GlassSurface />
}
