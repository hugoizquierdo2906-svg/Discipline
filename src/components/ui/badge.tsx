import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

/**
 * Badge — compact status/label pill. Canonical §12.9. Semantic variants pair a
 * tint background with a solid foreground (never color alone — a label is
 * always present). Sizes sm/md.
 */
const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-pill font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        // Solid semantic text on the white raised surface (AA ≥ 4.9:1 at 12px),
        // with a semantic border for the tinted feel. The pale tint backgrounds
        // from canonical §12.9 fall just under AA for 12px solid text, so the
        // accessibility-first surface is used (deviation logged for governance).
        default: 'bg-surface text-text-secondary',
        accent:
          'bg-surface-raised text-accent-accessible border border-accent-subtle',
        success:
          'bg-surface-raised text-success border border-[var(--ds-color-success-border)]',
        warning:
          'bg-surface-raised text-warning border border-[var(--ds-color-warning-border)]',
        error:
          'bg-surface-raised text-error border border-[var(--ds-color-error-border)]',
        info: 'bg-surface-raised text-info border border-[var(--ds-color-info-border)]',
      },
      size: {
        sm: 'h-5 px-2 text-caption',
        md: 'h-6 px-3 text-caption',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
)

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  leadingIcon?: React.ReactNode
}

export function Badge({
  className,
  variant,
  size,
  leadingIcon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {leadingIcon}
      {children}
    </span>
  )
}
