import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

/**
 * Tooltip — Radix Tooltip. Keyboard-accessible (shows on focus), inverted
 * surface per canonical §12.11 (#111 bg / white text). Wrap the app (or a
 * subtree) in TooltipProvider once.
 */
export const TooltipProvider = TooltipPrimitive.Provider
export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger

export const TooltipContent = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(function TooltipContent(
  { className, sideOffset = 6, children, ...props },
  ref,
) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'z-tooltip rounded-sm bg-text px-3 py-2 text-caption text-surface-raised shadow-3',
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="fill-text" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
})
