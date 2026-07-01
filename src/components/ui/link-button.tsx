import { type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import { buttonVariants } from './button'
import { GlassSurface } from './glass-surface'

export interface LinkButtonProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

/**
 * LinkButton — an anchor wearing the same glass material as Button. Use for
 * navigation (real hrefs); use Button for actions.
 */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton(
    {
      className,
      variant = 'primary',
      size,
      leadingIcon,
      trailingIcon,
      children,
      ...props
    },
    ref,
  ) {
    return (
      <a
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        data-glass-variant={variant}
        {...props}
      >
        <GlassSurface />
        <span className="relative z-10 inline-flex items-center gap-2">
          {leadingIcon}
          {children}
          {trailingIcon}
        </span>
      </a>
    )
  },
)
