'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

/**
 * Progress — DISCIPLINE's indicator of the KNOWN fraction of completion
 * (0 → max) of a CONTINUOUS, unidimensional operation happening right now
 * (an upload, a download, a long computation) — "how much of THIS single
 * task is done, how much is left." Read-only, system-driven, never
 * user-manipulated. `indeterminate` is its direct complement: the SAME
 * "activity in progress" role, used the moment the fraction isn't known yet.
 *
 * Not a Progress Ring (the identical semantics — a known 0–100% fraction —
 * in a circular SVG presentation instead of a linear bar: a GEOMETRY choice,
 * not a different UX problem. Its stroke-dasharray/circumference math is
 * fundamentally different code from a bar's width, exactly why MUI/Chakra/
 * Radix ship Linear and Circular as two SEPARATE components, never one
 * `variant` switch — Progress Ring is a future, separate sibling, never a
 * mode of this file), not a Spinner (PURELY indeterminate — no value, no
 * `max`, no measured track, can never say "64% done"; Progress covers the
 * case a fraction genuinely IS known, which is strictly more informative),
 * not a Skeleton (a LAYOUT placeholder — "content will appear here" — a
 * texture, never a numeric measurement of how much of an ACTIVE operation
 * remains), not a Stepper (NAMED, discrete, individually addressable steps
 * of one task — the granularity is the STEP; Progress is the opposite, one
 * continuous quantity with no named milestones — Stepper's own docs already
 * record this: "not Progress/Progress Ring — a single continuous quantity
 * 0–100%, no named discrete steps"), not a Timeline (a READ-ONLY,
 * chronological record of PAST, timestamped events that does not itself
 * progress — Progress represents an operation actively advancing NOW toward
 * a known end), not a Badge (a compact, STATIC label — "Active," "Beta" —
 * with no track and no value that evolves in real time), not a Counter (a
 * plain incrementing NUMBER with no known denominator and no visual track —
 * text, never a bar), not a Gauge (an analog reading in a range, often with
 * threshold zones — speed, a score — a PERMANENT instantaneous measurement
 * with no start/finish; Progress starts at 0%, advances, ends at 100%, then
 * goes away), not a Meter (a bounded CURRENT-STATE reading with semantic
 * thresholds — disk space, password strength — displayed indefinitely as
 * system state, never a temporal, terminal operation), not a Chart (a
 * multi-point, often multi-dimensional data visualization — disproportionate
 * for "this task is 64% done"; Progress is deliberately minimal and
 * one-dimensional), not a Status indicator (a discrete, instantaneous state
 * dot — online/offline — never a continuous fraction that advances).
 *
 * A FLAT primitive (token system, no glass role) — the sibling of Spinner/
 * Skeleton/Badge in that same family, never Navigation (Breadcrumb/
 * Pagination/Stepper/Tabs): zero GlassSurface, zero Material Role. Composes
 * `@radix-ui/react-progress` DIRECTLY (already an exact-pinned dependency) —
 * inheriting its entire ARIA contract verbatim: `role="progressbar"`,
 * `aria-valuemin`/`aria-valuemax`, `aria-valuenow` set automatically for a
 * numeric `value` and OMITTED entirely when `value` is `null` (Radix's own
 * indeterminate convention — exactly the brief's "never provide
 * aria-valuenow for indeterminate," satisfied natively, zero custom ARIA
 * code needed), and `getValueLabel(value, max)` to compute `aria-valuetext`
 * (an already-typed, inherited Radix prop — not a new one — defaulted here
 * to the visible caption text so the accessible description always matches
 * what's on screen, the same "pick a sane default for an existing primitive
 * prop" move as Tabs' own `activationMode` default).
 *
 * Determinate value changes are an INSTANT width change — zero
 * `transition`/`animation` — matching this file's zero motion budget for
 * the determinate case. `indeterminate` is the one place motion is
 * genuinely load-bearing, not decorative: a track that doesn't move
 * communicates nothing about "activity, unknown duration," the exact same
 * reasoning that already justifies the frozen Spinner's `animate-spin` and
 * the frozen Skeleton's `animate-pulse`. This file reuses Skeleton's own
 * `animate-pulse motion-reduce:animate-none` verbatim for indeterminate —
 * Tailwind's built-in utility, not a bespoke keyframe, with the same
 * reduced-motion fallback.
 *
 * A single, self-contained, non-compound component (no exported sub-parts).
 * `disabled` has no interactive surface to disable (Progress is read-only,
 * nothing is ever focusable) — it only dims the track/caption and freezes
 * the indeterminate pulse, signaling "this data is currently stale/paused,"
 * plus `aria-disabled` so that state reaches assistive tech too (the brief
 * lists `disabled` as an authorized prop; leaving it purely visual would
 * make it invisible to screen readers). The optional caption row (custom
 * `label`, or the auto `{percent}%` from `showLabel`) only wraps the
 * progressbar in an extra `<div>` when a caption actually renders — with no
 * caption (the frozen Toast/FileInput's exact existing usage: only `value`/
 * `aria-label`/`className`), the DOM is byte-identical in depth to before,
 * so their rendered layout is unaffected (`className` keeps landing on the
 * track itself, never a wrapper, so e.g. Toast's `className="h-1"` height
 * override and FileInput's `className="flex-1"` flex-sizing both keep
 * working exactly as before). The track is a `flex` row and the indicator a
 * plain flex item sized by `width` — not a positioned/transformed div —
 * specifically so it anchors to the INLINE-START edge, which flexbox flips
 * natively under `dir="rtl"` (a plain block child's percentage width would
 * not reliably flip); verified visually.
 */

export interface ProgressProps extends Omit<
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
  'value'
> {
  /** Current value. Ignored (a `null` value is passed to Radix) when `indeterminate`. */
  value?: number
  max?: number
  /** Activity in progress with no known fraction yet. Never sets `aria-valuenow`. */
  indeterminate?: boolean
  size?: 'sm' | 'md' | 'lg'
  /** Renders an auto `{percent}%` caption above the track. Ignored if `label` is set. */
  showLabel?: boolean
  /** Custom caption overriding the auto percentage (e.g. "3 of 5 files"). */
  label?: React.ReactNode
  color?: 'accent' | 'success' | 'warning' | 'error' | 'info'
  disabled?: boolean
}

const sizeTrackClass: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

const colorFillClass: Record<
  'accent' | 'success' | 'warning' | 'error' | 'info',
  string
> = {
  accent: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-info',
}

export const Progress = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(function Progress(
  {
    value = 0,
    max = 100,
    indeterminate = false,
    size = 'md',
    showLabel = false,
    label,
    color = 'accent',
    disabled = false,
    className,
    'aria-label': ariaLabel = 'Progress',
    ...props
  },
  ref,
) {
  const clamped = Math.max(0, Math.min(max, value))
  const percent = max > 0 ? Math.round((clamped / max) * 100) : 0
  const captionText =
    label ?? (!indeterminate && showLabel ? `${percent}%` : undefined)

  const track = (
    <ProgressPrimitive.Root
      ref={ref}
      value={indeterminate ? null : clamped}
      max={max}
      getValueLabel={() =>
        typeof captionText === 'string' ? captionText : `${percent}%`
      }
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      className={cn(
        'flex w-full overflow-hidden rounded-pill bg-surface',
        sizeTrackClass[size],
        disabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          'h-full rounded-pill',
          colorFillClass[color],
          indeterminate
            ? cn(
                'w-full',
                !disabled && 'animate-pulse motion-reduce:animate-none',
              )
            : undefined,
        )}
        style={indeterminate ? undefined : { width: `${percent}%` }}
      />
    </ProgressPrimitive.Root>
  )

  if (captionText == null) return track

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div
        className={cn(
          'flex items-center justify-between gap-2 text-body-sm text-text-secondary',
          disabled && 'opacity-50',
        )}
      >
        <span>{captionText}</span>
      </div>
      {track}
    </div>
  )
})

Progress.displayName = 'Progress'
