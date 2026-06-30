import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import { GlassSurface } from './glass-surface'
import { Spinner } from './spinner'

/**
 * Button — the signature Micro Surface control. Converged to the frozen
 * Liquid Glass material: the element carries `.ds-glass` and renders the shared
 * <GlassSurface/> stack; `buttonVariants` only encodes geometry + label color
 * (the material lives in src/styles/glass.css). Primary intent carries the
 * violet caustic. Canonical §12.3 (dark label on primary).
 */
export const buttonVariants = cva(
  [
    'ds-glass relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill',
    'font-semibold outline-none select-none transition-transform duration-fast ease-standard',
    'disabled:pointer-events-none disabled:opacity-40',
    'active:scale-[0.98] motion-reduce:active:scale-100',
  ],
  {
    variants: {
      variant: {
        primary: 'text-text',
        secondary: 'text-text',
        ghost: 'text-accent-accessible',
        outline: 'text-text',
        destructive: 'text-text-on-accent',
      },
      size: {
        sm: 'h-9 px-4 text-body-sm',
        md: 'h-11 px-5 text-body',
        lg: 'h-14 px-6 text-body-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as the child element (e.g. a Next.js Link). Glass layers are omitted
   * in this rare path; prefer LinkButton for anchors. */
  asChild?: boolean
  loading?: boolean
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = 'primary',
      size,
      asChild = false,
      loading = false,
      leadingIcon,
      trailingIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) {
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(buttonVariants({ variant, size }), className)}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        data-glass-variant={variant}
        data-glass-intent={variant === 'primary' ? 'primary' : undefined}
        disabled={disabled ?? loading}
        aria-busy={loading || undefined}
        {...props}
      >
        <GlassSurface />
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {loading && (
            <Spinner size={size === 'lg' ? 'md' : 'sm'} className="absolute" />
          )}
          <span
            className={cn(
              'inline-flex items-center gap-2',
              loading && 'invisible',
            )}
          >
            {leadingIcon}
            {children}
            {trailingIcon}
          </span>
        </span>
      </button>
    )
  },
)
