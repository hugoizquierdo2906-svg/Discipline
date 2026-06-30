import * as ProgressPrimitive from '@radix-ui/react-progress'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

export interface ProgressProps extends React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> {
  /** 0–100. */
  value?: number
  variant?: 'linear' | 'circular'
}

/**
 * Progress — determinate indicator, linear (Radix Progress) or circular (SVG).
 * Both expose the value to assistive tech via role/aria from Radix / SVG attrs.
 */
export const Progress = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(function Progress(
  { className, value = 0, variant = 'linear', ...props },
  ref,
) {
  const clamped = Math.max(0, Math.min(100, value))
  // Progressbars need an accessible name; default it when the caller omits one.
  const ariaLabel = props['aria-label'] ?? 'Progress'

  if (variant === 'circular') {
    const r = 20
    const c = 2 * Math.PI * r
    return (
      <ProgressPrimitive.Root
        ref={ref}
        value={clamped}
        className={cn('inline-flex', className)}
        {...props}
        aria-label={ariaLabel}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" className="-rotate-90">
          <circle
            cx="24"
            cy="24"
            r={r}
            className="fill-none stroke-surface"
            strokeWidth="4"
          />
          <circle
            cx="24"
            cy="24"
            r={r}
            className="fill-none stroke-accent transition-[stroke-dashoffset] duration-standard ease-standard"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c - (clamped / 100) * c}
          />
        </svg>
      </ProgressPrimitive.Root>
    )
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={clamped}
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-pill bg-surface',
        className,
      )}
      {...props}
      aria-label={ariaLabel}
    >
      <ProgressPrimitive.Indicator
        className="h-full rounded-pill bg-accent transition-transform duration-standard ease-standard"
        style={{ transform: `translateX(-${100 - clamped}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
