import * as SliderPrimitive from '@radix-ui/react-slider'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

export type SliderProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
>

/**
 * Slider — Radix Slider for numeric ranges. Keyboard accessible (arrows, Home/End).
 * Track uses surface; the filled range and thumb use the Brand accent.
 */
export const Slider = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(function Slider({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-pill bg-surface">
        <SliderPrimitive.Range className="absolute h-full rounded-pill bg-accent" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        aria-label="Value"
        className="block h-5 w-5 rounded-pill border border-border bg-surface-raised shadow-2 disabled:opacity-40"
      />
    </SliderPrimitive.Root>
  )
})
