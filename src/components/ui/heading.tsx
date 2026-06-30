import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

const headingVariants = cva('text-text font-semibold', {
  variants: {
    level: {
      'display-1': 'text-display-1',
      'display-2': 'text-display-2',
      'display-3': 'text-display-3',
      h1: 'text-h1',
      h2: 'text-h2',
      h3: 'text-h3',
      h4: 'text-h4 font-medium',
      h5: 'text-h5 font-medium',
    },
  },
  defaultVariants: { level: 'h2' },
})

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface HeadingProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /** Semantic tag — decoupled from visual `level` so hierarchy stays correct. */
  as?: HeadingTag
}

/**
 * Heading — renders a semantic h1–h6 (via `as`) with a visual size from the
 * canonical type scale (via `level`). Keeping the two separate lets pages
 * preserve heading order without being forced into a matching visual size.
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading({ as: Tag = 'h2', level, className, ...props }, ref) {
    return (
      <Tag
        ref={ref}
        className={cn(headingVariants({ level }), className)}
        {...props}
      />
    )
  },
)
