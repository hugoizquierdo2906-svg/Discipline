import * as SwitchPrimitive from '@radix-ui/react-switch'
import { forwardRef, useId } from 'react'

import { cn } from '@/lib/cn'

export interface SwitchProps extends React.ComponentPropsWithoutRef<
  typeof SwitchPrimitive.Root
> {
  label?: string
}

/** Switch — Radix Switch toggle with optional label. Thumb animates transform only. */
export const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(function Switch({ className, label, id, ...props }, ref) {
  const autoId = useId()
  const fieldId = id ?? autoId
  return (
    <div className="inline-flex items-center gap-3">
      <SwitchPrimitive.Root
        ref={ref}
        id={fieldId}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-pill border border-border bg-surface transition-colors duration-fast ease-standard',
          'data-[state=checked]:border-accent data-[state=checked]:bg-accent',
          'disabled:cursor-not-allowed disabled:opacity-40',
          className,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            'block h-5 w-5 translate-x-0.5 rounded-pill bg-surface-raised shadow-1 transition-transform duration-fast ease-standard',
            'data-[state=checked]:translate-x-5 motion-reduce:transition-none',
          )}
        />
      </SwitchPrimitive.Root>
      {label && (
        <label htmlFor={fieldId} className="text-body-sm text-text">
          {label}
        </label>
      )}
    </div>
  )
})
