import { GlassSurface } from './glass-surface'

import './immersive-surface.css'

/**
 * Immersive Surface — shared scaffolding for the DISCIPLINE Liquid Glass
 * immersive family (Modal · Dialog · Drawer · Command Palette). Every member
 * renders the SAME optical layers as the frozen Button (<GlassSurface/>)
 * inside a `.ds-glass .ds-immersive` host over a `.ds-scrim`, then places its
 * content above them. The Immersive material and the scrim live in `glass.css`
 * (frozen from the validated /dev/modal reference); here we only standardize
 * the host, the scrim and the content plane so the whole family is identical.
 *
 * The heaviest glass in the system + the background dim/blur. Consumers own
 * their geometry and placement (Invariant A1) — `.ds-immersive` carries the
 * frozen intrinsic geometry (max-width 440 · radius-xl · space-7 padding);
 * members may neutralize the padding (`p-0`) for bespoke internal layouts.
 * Content must sit on the content plane (z-3) so it reads above the machined
 * edge (z-2).
 */

/** Host classes for an Immersive pane. The material only; the consumer adds
 * placement (fixed/centering) per A1. */
export const immersiveHostClass = 'ds-glass ds-immersive'

/** The background scrim (dim + blur, frozen in glass.css). The consumer adds
 * `fixed inset-0` placement + z plane. */
export const immersiveScrimClass = 'ds-scrim'

/** The content plane — above every optical layer (edge is z-2). */
export const immersiveContentClass = 'relative z-[3]'

/** The Immersive base entrance (standard duration, system ease-out, no
 * bounce; entrance-only). */
export const immersiveEnterClass = 'ds-immersive-enter'

/** The scrim fade, matching the pane entrance. */
export const immersiveScrimEnterClass = 'ds-scrim-enter'

/** The optical layer stack — placed as the first child of any `.ds-immersive`. */
export function ImmersiveSurface() {
  return <GlassSurface />
}
