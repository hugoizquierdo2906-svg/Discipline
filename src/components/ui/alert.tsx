import { cva, type VariantProps } from 'class-variance-authority'
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react'

import { cn } from '@/lib/cn'

const alertVariants = cva('flex gap-3 rounded-md border p-4', {
  variants: {
    variant: {
      info: 'border-[var(--ds-color-info-border)] bg-[var(--ds-color-info-tint)] text-info',
      success:
        'border-[var(--ds-color-success-border)] bg-[var(--ds-color-success-tint)] text-success',
      warning:
        'border-[var(--ds-color-warning-border)] bg-[var(--ds-color-warning-tint)] text-warning',
      error:
        'border-[var(--ds-color-error-border)] bg-[var(--ds-color-error-tint)] text-error',
    },
  },
  defaultVariants: { variant: 'info' },
})

const iconFor = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleAlert,
} as const

export interface AlertProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title: string
  description?: string
  /** When provided, renders a dismiss button. */
  onDismiss?: () => void
}

/**
 * Alert — semantic banner (canonical §1.4). Always pairs an icon + text with
 * color, never color alone. `role="alert"` for error/warning, `status` otherwise.
 */
export function Alert({
  className,
  variant = 'info',
  title,
  description,
  onDismiss,
  ...props
}: AlertProps) {
  const LeadIcon = iconFor[variant ?? 'info']
  const assertive = variant === 'error' || variant === 'warning'
  return (
    <div
      role={assertive ? 'alert' : 'status'}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <LeadIcon size={20} className="mt-0.5 shrink-0" aria-hidden />
      <div className="flex-1">
        <p className="text-body-sm font-medium text-text">{title}</p>
        {description && (
          <p className="mt-1 text-body-sm text-text-secondary">{description}</p>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded-xs text-text-tertiary hover:text-text"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}
