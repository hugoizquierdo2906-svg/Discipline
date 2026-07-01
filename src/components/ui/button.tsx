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
    'ds-glass ds-micro relative inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-semibold outline-none select-none transition-transform duration-fast ease-standard',
    'disabled:pointer-events-none disabled:opacity-40',
    'active:scale-[0.98] motion-reduce:active:scale-100',
  ],
  {
    variants: {
      // All variants share the SAME neutral glass. Primary is distinguished only
      // by a light SIGNATURE — a very discreet pastel-violet outer bloom (ambient
      // light energy, not a fill, not a hard ring, not a CSS border). The violet
      // never paints the body. Neutral variants carry no bloom.
      variant: {
        primary: 'text-text shadow-[0_2px_18px_rgba(139,124,255,0.22)]',
        secondary: 'text-text',
        ghost: 'text-accent-accessible',
        outline: 'text-text',
        destructive: 'text-text-on-accent',
      },
      // The single Micro Surface geometry: a premium lens / capsule silhouette.
      // Radius = half the height so the ends are perfectly tensed (no perceptible
      // angle, a continuous organic contour), yet driven by real values — never a
      // literal 9999px pill. Compact horizontal padding keeps the width dictated
      // by content. The silhouette alone reads as a piece of glass to press.
      // Material/optics are unchanged.
      size: {
        sm: 'h-[34px] px-4 text-body-sm rounded-[17px]',
        md: 'h-[40px] px-5 text-body rounded-[20px]',
        lg: 'h-[48px] px-6 text-body-lg rounded-[24px]',
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
