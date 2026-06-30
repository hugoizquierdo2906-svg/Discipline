import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

const skeletonVariants = cva(
  'animate-pulse bg-surface motion-reduce:animate-none',
  {
    variants: {
      shape: {
        rect: 'rounded-md',
        circle: 'rounded-pill',
        text: 'h-4 rounded-sm',
      },
    },
    defaultVariants: { shape: 'rect' },
  },
)

export interface SkeletonProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

/**
 * Skeleton — shimmer placeholder for loading content. Uses the built-in
 * `animate-pulse` (transform/opacity only); disabled under reduced motion.
 * Marked aria-hidden — announce loading via a sibling status region.
 */
export function Skeleton({ shape, className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(skeletonVariants({ shape }), className)}
      {...props}
    />
  )
}
