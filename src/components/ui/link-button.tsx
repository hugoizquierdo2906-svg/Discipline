import { type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import { buttonVariants } from './button'

export interface LinkButtonProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

/**
 * LinkButton — an anchor styled as a Button. Use for navigation (real hrefs);
 * use Button for actions. Shares the exact visual language via buttonVariants.
 */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton(
    { className, variant, size, leadingIcon, trailingIcon, children, ...props },
    ref,
  ) {
    return (
      <a
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {leadingIcon}
        {children}
        {trailingIcon}
      </a>
    )
  },
)
