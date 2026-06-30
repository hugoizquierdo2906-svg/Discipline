import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

const textVariants = cva('', {
  variants: {
    size: {
      'body-lg': 'text-body-lg',
      body: 'text-body',
      'body-sm': 'text-body-sm',
      caption: 'text-caption',
    },
    tone: {
      default: 'text-text',
      secondary: 'text-text-secondary',
      tertiary: 'text-text-tertiary',
    },
    weight: {
      regular: 'font-regular',
      medium: 'font-medium',
      semibold: 'font-semibold',
    },
  },
  defaultVariants: { size: 'body', tone: 'default', weight: 'regular' },
})

export interface TextProps
  extends
    React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  /** Render as `p` (default) or inline `span`. */
  as?: 'p' | 'span'
}

/** Text — body copy primitive. Size/tone/weight all map to type tokens. */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { as: Tag = 'p', size, tone, weight, className, ...props },
  ref,
) {
  return (
    <Tag
      ref={ref as never}
      className={cn(textVariants({ size, tone, weight }), className)}
      {...props}
    />
  )
})
