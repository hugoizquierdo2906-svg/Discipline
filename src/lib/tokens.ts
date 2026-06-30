/**
 * DISCIPLINE — Design tokens (TypeScript mirror)
 * ---------------------------------------------------------------------------
 * SOURCE OF TRUTH: docs/DISCIPLINE_CANONICAL_TOKENS.md (v1.1.0).
 *
 * `src/styles/tokens.css` is the primary, canonical representation. This file
 * mirrors the subset of values needed where CSS custom properties cannot be
 * used directly — Framer Motion inline style objects and GSAP tweens.
 *
 * Keep this in exact sync with tokens.css. A value present in both files MUST
 * be identical. When a token changes, update the canonical doc, then tokens.css,
 * then this mirror.
 * ---------------------------------------------------------------------------
 */

/** Motion durations in milliseconds (§8.1). */
export const duration = {
  instant: 100,
  fast: 160,
  standard: 240,
  slow: 320,
  page: 480,
  scene: 720,
  hero: 1200,
} as const

/** Same durations expressed in seconds — Framer Motion expects seconds. */
export const durationSec = {
  instant: 0.1,
  fast: 0.16,
  standard: 0.24,
  slow: 0.32,
  page: 0.48,
  scene: 0.72,
  hero: 1.2,
} as const

/** Cubic-bezier easings as [x1, y1, x2, y2] tuples (§8.2). */
export const easing = {
  standard: [0.22, 1, 0.36, 1],
  out: [0, 0, 0.2, 1],
  in: [0.4, 0, 1, 1],
  inOut: [0.45, 0, 0.55, 1],
} as const

/** Spring reference for Framer (§8.3) — critically damped, no bounce. */
export const spring = {
  ui: { stiffness: 260, damping: 32 },
} as const

/** Breakpoint widths in pixels (§10). */
export const breakpoint = {
  sm: 390,
  md: 768,
  lg: 1024,
  xl: 1440,
  '2xl': 1920,
} as const

/** Z-index scale (§9). */
export const zIndex = {
  base: 0,
  media: 10,
  glass: 20,
  floating: 30,
  controls: 40,
  nav: 50,
  dropdown: 60,
  overlay: 90,
  modal: 100,
  toast: 110,
  tooltip: 120,
} as const

export type Duration = keyof typeof duration
export type Easing = keyof typeof easing
export type Breakpoint = keyof typeof breakpoint
export type ZIndex = keyof typeof zIndex
