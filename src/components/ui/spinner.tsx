import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

/**
 * Spinner — DISCIPLINE's PURELY indeterminate activity indicator: "something
 * is happening, of unknown duration" — never "how much is left." Its only
 * promise is that work is in progress; it never has, and never will have, a
 * value.
 *
 * Not Progress/CircularProgress (a KNOWN linear/circular fraction, `max`,
 * `role="progressbar"`, `aria-valuenow` present the moment a fraction is
 * determined — even their own `indeterminate` mode keeps that progressbar-
 * shaped ARIA contract, just without `aria-valuenow`; Spinner never had that
 * contract at all — `role="status"`, never `progressbar`, never a value),
 * not a Skeleton (a LAYOUT placeholder — the shape of content about to
 * appear — never an activity icon), not a Loading Overlay (a pattern that
 * blocks/dims a region and shows a Spinner at its center — Spinner is the
 * icon such an overlay displays, never the blocking/dimming itself), not
 * FullscreenOverlay/Toast/Drawer/CommandPalette (each already COMPOSES
 * Spinner internally for its own `loading` state — an ingredient, never a
 * competitor), not Alert (a permanent message with a title/description),
 * not Badge (a static label), not Stepper (composes Spinner on its current
 * step, but Spinner itself has no notion of "which step"), not Timeline (a
 * record of the past), not a Gauge/Meter (a permanent reading of a real
 * value), not CircularProgress's own indeterminate mode (visually close —
 * both rotate — but semantically disjoint: CircularProgress indeterminate
 * is still a `progressbar` candidate to become determinate any moment;
 * Spinner is never that, by construction), not Button's loading state
 * (Button never reinvents its own activity icon — it composes Spinner,
 * exactly as it already does).
 *
 * A FLAT primitive (token system, no glass role) — composes nothing; it is
 * the leaf every other Feedback primitive in this library cites as
 * precedent for its own one non-decorative motion exception (Progress's
 * `indeterminate`, CircularProgress's `indeterminate`, Skeleton's shimmer
 * all point back to Spinner's `animate-spin`, never the reverse). `role=
 * "status"` + `aria-live="polite"`, NEVER `role="progressbar"`, NEVER an
 * `aria-value*` attribute — the exact line this library draws between "a
 * value exists" and "no value exists, ever." `disabled` is purely visual
 * (dims the ring, freezes the spin) — `role="status"` is a live-region
 * role, not a widget role, and does not support `aria-disabled` (confirmed
 * via eslint-plugin-jsx-a11y's `role-supports-aria-props`), unlike
 * Progress/CircularProgress's `role="progressbar"` which does.
 *
 * The ring color defaults to `border-current` (inherits the surrounding
 * text color) rather than a fixed brand color — load-bearing for its 18
 * existing consumers (Button/Pagination/Drawer/Toast/DropdownMenu/
 * ContextMenu/Select/FullscreenOverlay/Stepper/CommandPalette and more),
 * several frozen, which rely on the Spinner automatically matching e.g. a
 * `destructive` button's own foreground color rather than a fixed accent
 * purple. The new `color` prop is therefore OPTIONAL with no default value
 * — omitted (as every existing consumer does), it renders byte-identical
 * to before; only an explicit `color` overrides `currentColor`.
 * `sm`/`md`/`lg` are unchanged byte-for-byte from before; `xs`/`xl` are
 * purely additive. `motion-reduce:animate-none` is added (Skeleton/
 * Progress/CircularProgress all already carry it; its absence here was an
 * oversight predating that convention, not a deliberate choice).
 */

const sizeMap = {
  xs: 'h-3 w-3 border',
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-6 w-6 border-2',
  xl: 'h-8 w-8 border-4',
} as const

const colorBorderClass = {
  accent: 'border-accent',
  neutral: 'border-text-secondary',
  success: 'border-success',
  warning: 'border-warning',
  error: 'border-error',
  info: 'border-info',
} as const

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: keyof typeof sizeMap
  /** Overrides the default `currentColor` inheritance. Omit to match ambient text color. */
  color?: keyof typeof colorBorderClass
  /** Accessible label announced to screen readers. */
  label?: string
  disabled?: boolean
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner(
    {
      size = 'md',
      color,
      label = 'Loading',
      disabled = false,
      className,
      ...props
    },
    ref,
  ) {
    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn('inline-flex', disabled && 'opacity-50', className)}
        {...props}
      >
        <span
          className={cn(
            'rounded-pill border-t-transparent opacity-80',
            color ? colorBorderClass[color] : 'border-current',
            sizeMap[size],
            !disabled && 'animate-spin motion-reduce:animate-none',
          )}
        />
        <span className="sr-only">{label}</span>
      </span>
    )
  },
)

Spinner.displayName = 'Spinner'
