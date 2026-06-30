import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import { buttonVariants } from './button'

/**
 * IconButton — square, icon-only Button. An accessible `label` is REQUIRED
 * (sets aria-label); a Tooltip should wrap it at the call site for sighted users.
 * Sizes keep a ≥44px touch target (canonical §11) via min size on sm.
 */
const iconButtonSize = cva('aspect-square p-0', {
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
  /** Required accessible name for the icon-only control. */
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
        {...props}
      >
        {icon}
      </button>
    )
  },
)
