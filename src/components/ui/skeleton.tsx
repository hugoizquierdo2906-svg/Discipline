import { cn } from '@/lib/cn'

/**
 * Skeleton — DISCIPLINE's silent LAYOUT placeholder: reserves the exact
 * space real content will occupy while it loads, so the page's structure is
 * visible immediately and nothing shifts when data arrives (near-zero CLS).
 * It never signals activity (that's Spinner), never a known fraction
 * (Progress/CircularProgress) — it has no notion of "in progress" at all,
 * only "not here yet, but this shape is."
 *
 * Not Spinner (pure activity, a single point, reserves no space at all —
 * Skeleton is the opposite: multiple shaped zones, zero activity signal),
 * not Progress/CircularProgress (a known fraction of one task — Skeleton
 * has no fraction, no task, just "not yet"), not FullscreenOverlay/Drawer
 * loading (both compose Spinner, never Skeleton, for their own `loading` —
 * their content is arbitrary `children`, an unpredictable shape Skeleton
 * cannot pre-sketch; Skeleton requires knowing the final layout in
 * advance), not a Loading Overlay (blocks/dims a region and shows a
 * Spinner at its center — the OPPOSITE of Skeleton, which reveals structure
 * rather than hiding it under a veil), not placeholder text/"Lorem ipsum"
 * (fake, readable text that could be mistaken for real content — Skeleton
 * is deliberately ABSTRACT, a plain rectangle, never a legible word,
 * signaling unambiguously "this is not content"), not an empty Card/Empty
 * State (a PERMANENT, resolved absence of data, often with a CTA — Skeleton
 * signals a TRANSIENT "data is arriving, wait"), not Alert/Toast (a
 * permanent message / a transient notification, never a layout shape), not
 * a Shimmer Loader (an explicitly EXCLUDED pattern — a sliding gradient
 * `translateX` is decorative motion, never functionally necessary the way
 * Spinner's `animate-spin` is; Skeleton's mere geometric PRESENCE already
 * communicates "waiting," and this file spends its motion budget on
 * nothing more than `animate-pulse`), not a Pulse Loader (a spinner variant
 * signaling activity via pulsing dots — not to be confused with this file's
 * own `animate-pulse`, which only fades the opacity of an already
 * correctly-shaped/sized placeholder, never a substitute for Spinner), not
 * a Blur Placeholder / Image Placeholder (an image-specific technique
 * requiring a pre-existing low-res preview — a narrower case than Skeleton,
 * which needs no preview data and covers images as just one more
 * rectangle, generically, like any other content type).
 *
 * A FLAT primitive (token system, no glass role) — composes NOTHING (no
 * Radix, no other component): a `div`, CSS, and tokens only, the simplest
 * primitive in this library. `animate-pulse` is the ONE authorized
 * animation (Tailwind's own built-in, opacity-only, `motion-reduce:
 * animate-none` fallback) — never a shimmer, never a moving gradient,
 * never a custom keyframe, matching this file's own historical restraint
 * and the frozen Spinner/Progress/CircularProgress precedent of citing
 * this exact exception.
 *
 * `circle` forces full/pill rounding regardless of `radius` (a circle is
 * circular by definition); `lines > 1` stacks that many text-line bars,
 * with the LAST line rendered at 60% width — the near-universal skeleton-
 * text convention (MUI, Chakra, Ant, shadcn all do this) that reads as the
 * ragged end of a wrapped paragraph rather than a suspiciously uniform
 * block. `width`/`height` accept a number (px) or any CSS length string;
 * omitted, they default to a full-width, single-text-line shape (`100%` ×
 * `var(--ds-space-4)`, 16px) — the single, common case (a lone content
 * line skeleton) — or a `var(--ds-space-7)` (40px) square when `circle` is
 * set with neither dimension given (an avatar-sized default; both are
 * this project's own spacing tokens, never a raw literal). `animated`
 * defaults to `true`; `false` freezes the
 * pulse for contexts that must stay static (e.g. a print view, or a
 * caller-driven custom cadence). Marked `aria-hidden` — Skeleton represents
 * ABSENT content, is never focusable, never announces progress, and owns
 * no interactive role at all; a sibling live region is the caller's
 * responsibility if a loading announcement is needed (exactly as Progress/
 * Spinner already provide).
 */

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number | string
  height?: number | string
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  circle?: boolean
  lines?: number
  animated?: boolean
}

const radiusClass: Record<'none' | 'sm' | 'md' | 'lg' | 'full', string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-pill',
}

function toLength(value?: number | string): string | undefined {
  if (value === undefined) return undefined
  return typeof value === 'number' ? `${value}px` : value
}

export function Skeleton({
  width,
  height,
  radius = 'md',
  circle = false,
  lines = 1,
  animated = true,
  className,
  style,
  ...props
}: SkeletonProps) {
  const barClass = cn(
    'bg-surface',
    circle ? radiusClass.full : radiusClass[radius],
    animated && 'animate-pulse motion-reduce:animate-none',
  )

  if (circle) {
    const size = toLength(width) ?? toLength(height) ?? 'var(--ds-space-7)'
    return (
      <div
        aria-hidden
        className={cn(barClass, className)}
        style={{
          width: toLength(width) ?? size,
          height: toLength(height) ?? size,
          ...style,
        }}
        {...props}
      />
    )
  }

  const resolvedWidth = toLength(width) ?? '100%'
  const resolvedHeight = toLength(height) ?? 'var(--ds-space-4)'

  if (lines <= 1) {
    return (
      <div
        aria-hidden
        className={cn(barClass, className)}
        style={{ width: resolvedWidth, height: resolvedHeight, ...style }}
        {...props}
      />
    )
  }

  return (
    <div
      aria-hidden
      className={cn('flex flex-col gap-2', className)}
      style={style}
      {...props}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={barClass}
          style={{
            width:
              i === lines - 1 ? `calc(${resolvedWidth} * 0.6)` : resolvedWidth,
            height: resolvedHeight,
          }}
        />
      ))}
    </div>
  )
}
