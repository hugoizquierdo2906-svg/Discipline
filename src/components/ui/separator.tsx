import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

export type SeparatorProps = React.ComponentPropsWithoutRef<
  typeof SeparatorPrimitive.Root
>

/**
 * Separator — divider built on Radix Separator. Decorative by default; pass
 * `decorative={false}` when it semantically separates content for screen readers.
 */
export const Separator = forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(function Separator(
  { className, orientation = 'horizontal', decorative = true, ...props },
  ref,
) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      className={cn(
        'shrink-0 bg-divider',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      {...props}
    />
  )
})
