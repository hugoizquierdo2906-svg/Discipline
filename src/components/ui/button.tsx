import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import { Spinner } from './spinner'

/**
 * Button — the signature interactive primitive.
 * Canonical spec: DISCIPLINE_CANONICAL_TOKENS.md §12.3 (overrides Rulebook
 * numbers). Primary = Brand accent fill + dark label (locked v1.1.0).
 * Hover/active behaviour follows the Rulebook qualitatively (lift, glow,
 * tactile press) but with canonical magnitudes (translateY(-1px), scale 0.98).
 */
export const buttonVariants = cva(
  [
    'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill',
    'font-semibold transition-[transform,box-shadow,background-color] duration-fast ease-standard',
    'select-none outline-none disabled:pointer-events-none disabled:opacity-40',
    'active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-accent text-text hover:-translate-y-px hover:shadow-accent-glow',
        secondary:
          'bg-glass-regular text-text border border-glass-border backdrop-blur-glass hover:bg-surface-raised',
        ghost:
          'bg-transparent text-accent-accessible hover:underline underline-offset-4',
        outline:
          'bg-transparent text-text border border-border-strong hover:bg-surface',
        destructive: 'bg-error text-text-on-accent hover:-translate-y-px',
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
  /** Render as the child element (e.g. a Next.js Link) via Radix Slot. */
  asChild?: boolean
  /** Show a spinner and disable interaction while preserving the button width. */
  loading?: boolean
  /** Icon rendered before the label. */
  leadingIcon?: React.ReactNode
  /** Icon rendered after the label. */
  trailingIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant,
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
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled ?? loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <>
            {/* Spinner overlays; invisible label preserves the original width. */}
            <Spinner size={size === 'lg' ? 'md' : 'sm'} className="absolute" />
            <span className="invisible inline-flex items-center gap-2">
              {leadingIcon}
              {children}
              {trailingIcon}
            </span>
          </>
        ) : (
          <>
            {leadingIcon}
            {children}
            {trailingIcon}
          </>
        )}
      </Comp>
    )
  },
)
