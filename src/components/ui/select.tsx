import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import {
  ControlSurface,
  controlHostClass,
  controlStateClass,
} from './control-surface'

/**
 * Select — accessible dropdown on Radix Select. The trigger is a Control Surface
 * (Grammar §2): it renders the shared Liquid Glass optical layers as a recessed
 * well, identical to Input, with the value + chevron on the z-3 plane. The
 * violet caustic rises while the menu is open or the trigger is focused. The
 * content panel stays a raised surface (Structural, handled later). A simpler
 * NativeSelect is exported below.
 */
export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value
export const SelectGroup = SelectPrimitive.Group

export const SelectTrigger = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(function SelectTrigger({ className, children, disabled, ...props }, ref) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      disabled={disabled}
      className={cn(
        controlHostClass,
        'w-full justify-between',
        'text-body text-text data-[placeholder]:text-text-tertiary disabled:cursor-not-allowed',
        controlStateClass({ disabled }),
        className,
      )}
      {...props}
    >
      <ControlSurface />
      <span className="relative z-[3] min-w-0 flex-1 truncate text-left">
        {children}
      </span>
      <SelectPrimitive.Icon className="relative z-[3]">
        <ChevronDown size={18} className="text-text-tertiary" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})

export const SelectContent = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(function SelectContent(
  { className, children, position = 'popper', ...props },
  ref,
) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        className={cn(
          'z-dropdown overflow-hidden rounded-md border border-border bg-surface-raised shadow-3',
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})

export const SelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(function SelectItem({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex cursor-pointer items-center rounded-sm py-2 pl-8 pr-3 text-body-sm text-text outline-none',
        'data-[highlighted]:bg-accent-subtle data-[state=checked]:font-medium',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 inline-flex items-center">
        <SelectPrimitive.ItemIndicator>
          <Check size={16} className="text-accent-accessible" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
})

export type NativeSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

/** NativeSelect — token-styled native <select> as a Control Surface. The native
 * element sits transparent on the z-3 plane over the shared glass layers. */
export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  function NativeSelect({ className, disabled, ...props }, ref) {
    return (
      <div
        className={cn(
          controlHostClass,
          'w-full',
          controlStateClass({ disabled }),
        )}
      >
        <ControlSurface />
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            'relative z-[3] min-w-0 flex-1 appearance-none bg-transparent text-body text-text outline-none',
            'disabled:cursor-not-allowed',
            className,
          )}
          {...props}
        />
        <ChevronDown size={18} className="relative z-[3] text-text-tertiary" />
      </div>
    )
  },
)
