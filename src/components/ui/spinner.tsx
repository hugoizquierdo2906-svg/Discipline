import { cn } from '@/lib/cn'

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-6 w-6 border-2',
} as const

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: keyof typeof sizeMap
  /** Accessible label announced to screen readers. */
  label?: string
}

/**
 * Indeterminate loading indicator. Animates `transform` only (animate-spin).
 * Renders an accessible status by default.
 */
export function Spinner({
  size = 'md',
  label = 'Loading',
  className,
  ...props
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn('inline-flex', className)}
      {...props}
    >
      <span
        className={cn(
          'animate-spin rounded-pill border-current border-t-transparent opacity-80',
          sizeMap[size],
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  )
}
