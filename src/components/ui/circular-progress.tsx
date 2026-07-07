'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

/**
 * CircularProgress — DISCIPLINE's ring presentation of the SAME known
 * fraction of completion (0 → max) as the frozen Progress, reserved for
 * compact, intrinsically square/circular spaces where a linear bar has no
 * natural home (an avatar mid-upload, a sync/import tile, a dashboard KPI).
 * Not a different UX problem — a GEOMETRY choice: its stroke-dasharray/
 * circumference math is fundamentally different code from a bar's `width`,
 * exactly why MUI/Chakra/Radix ship Linear and Circular as two SEPARATE
 * components, never one `variant` switch (the same reasoning already
 * recorded in Progress's own doc comment when its legacy `variant`-based
 * circular mode was dropped). A ring also reads via visual CLOSURE (Gestalt)
 * — "how much is left to complete the circle" grasped peripherally, at a
 * glance, unlike a bar's left-to-right directional read — which is why a
 * circle is preferred specifically around round/compact content, never a
 * general substitute for Progress.
 *
 * Not Progress (needs horizontal width; this is for square/circular
 * spaces), not a Spinner (PURELY indeterminate — no value, no `max`, no
 * `role="progressbar"` with a real fraction; CircularProgress's own
 * indeterminate mode still exposes a determinate-shaped ARIA contract
 * minus `aria-valuenow`, whereas Spinner never had one), not a Skeleton (a
 * layout placeholder, never a numeric measurement), not a Gauge (a
 * PERMANENT analog reading in a range with threshold zones, no start/
 * finish — this starts at 0%, advances, ends at 100%, then goes away), not
 * a Meter (a bounded current-state reading displayed indefinitely as
 * system state, never a terminal operation), not a Chart (multi-point,
 * often multi-dimensional data visualization — disproportionate for "this
 * task is 64% done"), not a Badge (a static label, no track, no evolving
 * value), not a Stepper (named, discrete, individually addressable steps —
 * this is one continuous quantity with no milestones), not a Timeline (a
 * read-only record of PAST events that does not itself progress), not a
 * Counter (a plain incrementing number, no track, no denominator), not a
 * Toast (an entire transient notification surface — Toast MAY compose a
 * CircularProgress internally for a circular countdown, but is never a
 * competing indicator itself), not an Avatar progress ring (a "ring around
 * an avatar" use case COMPOSES this component around an existing Avatar —
 * two stacked components — never a feature Avatar owns itself; adding
 * value/max/indeterminate to Avatar would violate ITS single
 * responsibility, identity display, exactly as much as it would violate
 * this one), not a Donut Chart (visualizes MULTIPLE comparative category
 * values with a legend — a dataviz concern; this has exactly one fraction,
 * done vs. remaining, never several compared series).
 *
 * A FLAT primitive (token system, no glass role) — direct sibling of the
 * frozen... Progress (itself Built, not frozen), never a variant of it.
 * Composes `@radix-ui/react-progress` DIRECTLY for the identical ARIA
 * contract Progress already relies on: `role="progressbar"`,
 * `aria-valuemin`/`aria-valuemax`, `aria-valuenow` set for a numeric value
 * and OMITTED entirely for `indeterminate` (Radix's own convention — no
 * custom ARIA code needed), `getValueLabel` defaulted to the visible
 * percentage. The two SVG `<circle>` elements (track + indicator) are the
 * only new visual code; no Icon/Spinner dependency (the indeterminate mode
 * reuses `animate-spin` — the exact Tailwind utility the frozen Spinner
 * already relies on — applied to a wrapper around the SVG, since
 * CircularProgress's own radius/stroke-width are parameterized by `size`,
 * which Spinner does not expose).
 *
 * Determinate value changes are an instant `strokeDashoffset` change —
 * zero transition/animation. `indeterminate` is the one place motion is
 * genuinely load-bearing: a static ring communicates nothing about
 * "activity, unknown duration." Rather than Material Design's own two-
 * keyframe expanding/contracting arc (a bespoke, arbitrary animation this
 * library does not ship), this reuses the frozen Spinner's own
 * `animate-spin` verbatim, rotating a short, constant-length arc
 * continuously — the same functional exception, not a new one — frozen
 * (no animation) when `disabled`, with the standard
 * `motion-reduce:animate-none` fallback.
 *
 * A single, self-contained, non-compound component (no exported
 * sub-parts). `label` is a plain boolean (unlike Progress's ReactNode
 * `label`/`showLabel` pair) — CircularProgress has no room for a custom
 * caption string beside the ring, only a centered `{percent}%` inside it;
 * suppressed automatically when `indeterminate` (no fraction to show).
 * `disabled` has no interactive surface to disable (read-only, nothing
 * focusable) — it only dims the ring/label, freezes the indeterminate
 * spin, and sets `aria-disabled`.
 */

export interface CircularProgressProps extends Omit<
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
  'value'
> {
  value?: number
  max?: number
  indeterminate?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  /** Centered `{percent}%` inside the ring. Ignored when `indeterminate`. */
  label?: boolean
  disabled?: boolean
}

const sizeMap: Record<
  'sm' | 'md' | 'lg',
  { diameter: number; radius: number; strokeWidth: number; text: string }
> = {
  sm: { diameter: 32, radius: 13, strokeWidth: 3, text: 'text-caption' },
  md: { diameter: 48, radius: 20, strokeWidth: 4, text: 'text-body-sm' },
  lg: { diameter: 64, radius: 27, strokeWidth: 5, text: 'text-body' },
}

const colorStrokeClass: Record<
  'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral',
  string
> = {
  accent: 'stroke-accent',
  success: 'stroke-success',
  warning: 'stroke-warning',
  error: 'stroke-error',
  info: 'stroke-info',
  neutral: 'stroke-text-secondary',
}

// The visible arc length for the indeterminate spin — a constant fraction
// of the circumference, rotated continuously. Not a percentage of `value`.
const INDETERMINATE_ARC_FRACTION = 0.25

export const CircularProgress = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CircularProgressProps
>(function CircularProgress(
  {
    value = 0,
    max = 100,
    indeterminate = false,
    size = 'md',
    color = 'accent',
    label = false,
    disabled = false,
    className,
    'aria-label': ariaLabel = 'Progress',
    ...props
  },
  ref,
) {
  const { diameter, radius, strokeWidth, text } = sizeMap[size]
  const clamped = Math.max(0, Math.min(max, value))
  const percent = max > 0 ? Math.round((clamped / max) * 100) : 0
  const circumference = 2 * Math.PI * radius
  const dashOffset = indeterminate
    ? circumference * (1 - INDETERMINATE_ARC_FRACTION)
    : circumference - (percent / 100) * circumference
  const center = diameter / 2

  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={indeterminate ? null : clamped}
      max={max}
      getValueLabel={() => `${percent}%`}
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      className={cn(
        'relative inline-flex items-center justify-center',
        disabled && 'opacity-50',
        className,
      )}
      style={{ width: diameter, height: diameter }}
      {...props}
    >
      <span
        className={cn(
          'absolute inset-0',
          indeterminate &&
            !disabled &&
            'animate-spin motion-reduce:animate-none',
        )}
      >
        <svg
          width={diameter}
          height={diameter}
          viewBox={`0 0 ${diameter} ${diameter}`}
          className="-rotate-90"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            className="fill-none stroke-border"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            className={cn('fill-none', colorStrokeClass[color])}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
      </span>
      {label && !indeterminate && (
        <span
          className={cn('relative font-medium tabular-nums text-text', text)}
        >
          {percent}%
        </span>
      )}
    </ProgressPrimitive.Root>
  )
})

CircularProgress.displayName = 'CircularProgress'
