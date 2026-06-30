import * as LabelPrimitive from '@radix-ui/react-label'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

export interface LabelProps extends React.ComponentPropsWithoutRef<
  typeof LabelPrimitive.Root
> {
  /** Renders a subtle required marker after the text. */
  required?: boolean
}

/**
 * Label — form label built on Radix Label. Always associate with a control via
 * `htmlFor` (or by wrapping the control). Canonical §12.5: body-sm / 500.
 */
export const Label = forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(function Label({ className, children, required, ...props }, ref) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 text-body-sm font-medium text-text',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-40',
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span aria-hidden className="text-error">
          *
        </span>
      )}
    </LabelPrimitive.Root>
  )
})
