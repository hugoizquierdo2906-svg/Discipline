import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import { buttonVariants } from './button'
import { GlassSurface } from './glass-surface'

/**
 * IconButton — square, icon-only Micro Surface. Composes the same glass material
 * as Button. An accessible `label` is REQUIRED (aria-label); wrap with a Tooltip
 * at the call site. Keeps a ≥44px touch target on sm (canonical §11).
 */
// Icon buttons keep a circular footprint (square + pill radius) — a distinct,
// intentional Micro shape for icon targets, not a competing text-button capsule.
const iconButtonSize = cva('aspect-square p-0 rounded-pill', {
  variants: {
    size: {
      sm: 'h-9 w-9 min-h-target-min min-w-target-min',
      md: 'h-11 w-11',
      lg: 'h-14 w-14',
    },
  },
  defaultVariants: { size: 'md' },
})

export interface IconButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    Pick<VariantProps<typeof buttonVariants>, 'variant'>,
    VariantProps<typeof iconButtonSize> {
  label: string
  icon: React.ReactNode
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { className, variant = 'secondary', size, label, icon, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className={cn(
          buttonVariants({ variant }),
          iconButtonSize({ size }),
          className,
        )}
        data-glass-variant={variant}
        data-glass-intent={variant === 'primary' ? 'primary' : undefined}
        {...props}
      >
        <GlassSurface />
        <span className="relative z-10 inline-flex">{icon}</span>
      </button>
    )
  },
)
