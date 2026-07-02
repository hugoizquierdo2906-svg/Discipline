import { GlassSurface } from './glass-surface'

import './floating-surface.css'

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

/** The Floating base entrance (150ms opacity + translateY + slight scale,
 * system ease-out, no bounce). Driven by Radix `data-state="open"`. */
export const floatingEnterClass = 'ds-floating-enter'

/** The Floating arrow/tail — the frozen Tooltip-reference tail (same material,
 * same rim, same shadow; radius eased to a drop-tail at panel scale). Render
 * inside a popper Arrow slot. */
export const floatingArrowClass = 'ds-floating-arrow'

/** Elevation lift for anchored overlays — one soft added lower halo (~10%),
 * the frozen `.ds-floating` shadow layer untouched. */
export const floatingLiftClass = 'ds-floating-lift'

/** The Floating panel size scale — shared by every floating member (Popover,
 * UserMenu, Notifications, Command Palette, pickers) so no member invents its
 * own width. */
export const floatingSizeClass = {
  xs: 'w-56',
  sm: 'w-72',
  md: 'w-80',
  lg: 'w-96',
} as const
export type FloatingSize = keyof typeof floatingSizeClass

/** The optical layer stack — placed as the first child of any `.ds-floating`. */
export function FloatingSurface() {
  return <GlassSurface />
}
