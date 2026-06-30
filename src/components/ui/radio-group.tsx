import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { forwardRef, useId } from 'react'

import { cn } from '@/lib/cn'

export const RadioGroup = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(function RadioGroup({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn('flex flex-col gap-3', className)}
      {...props}
    />
  )
})

export interface RadioItemProps extends React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
> {
  label: string
}

/**
 * RadioGroup / RadioItem — Radix RadioGroup. Arrow-key navigable. The selected
 * dot uses the Brand accent; focus uses the global ring.
 */
export const RadioItem = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(function RadioItem({ className, label, id, ...props }, ref) {
  const autoId = useId()
  const itemId = id ?? autoId
  return (
    <div className="inline-flex items-center gap-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        id={itemId}
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-pill border border-border-strong bg-surface',
          'data-[state=checked]:border-accent disabled:cursor-not-allowed disabled:opacity-40',
          className,
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="h-2.5 w-2.5 rounded-pill bg-accent" />
      </RadioGroupPrimitive.Item>
      <label htmlFor={itemId} className="text-body-sm text-text">
        {label}
      </label>
    </div>
  )
})
