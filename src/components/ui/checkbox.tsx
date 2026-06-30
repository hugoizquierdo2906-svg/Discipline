import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'
import { forwardRef, useId } from 'react'

import { cn } from '@/lib/cn'

export interface CheckboxProps extends React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> {
  label?: string
}

/**
 * Checkbox — Radix Checkbox with label. Supports the indeterminate state
 * (`checked="indeterminate"`). Focus uses the global ring; checked fills with
 * the Brand accent and a dark glyph (matches the primary-button contrast logic).
 */
export const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(function Checkbox({ className, label, id, checked, ...props }, ref) {
  const autoId = useId()
  const fieldId = id ?? autoId
  return (
    <div className="inline-flex items-center gap-2">
      <CheckboxPrimitive.Root
        ref={ref}
        id={fieldId}
        checked={checked}
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-xs border border-border-strong bg-surface',
          'data-[state=checked]:border-accent data-[state=checked]:bg-accent',
          'data-[state=indeterminate]:border-accent data-[state=indeterminate]:bg-accent',
          'disabled:cursor-not-allowed disabled:opacity-40',
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="text-text">
          {checked === 'indeterminate' ? (
            <Minus size={14} />
          ) : (
            <Check size={14} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label htmlFor={fieldId} className="text-body-sm text-text">
          {label}
        </label>
      )}
    </div>
  )
})
