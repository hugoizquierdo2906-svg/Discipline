'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import {
  FloatingSurface,
  floatingArrowClass,
  floatingContentClass,
  floatingEnterClass,
  floatingHostClass,
} from './floating-surface'

/**
 * Popover — the first generalized Floating Surface: rich contextual content
 * anchored to a trigger, without interrupting the flow (unlike Modal) and
 * interactive (unlike Tooltip). Headless compound API on Radix Popover.
 *
 * Inheritance: GlassSurface → .ds-floating → FloatingSurface → Popover.
 * Popover declares NO material — no blur, shadow, border, reflection or color:
 * the pane is `floatingHostClass` + `<FloatingSurface/>`, the entrance is the
 * shared Floating base animation, the arrow is the shared Floating tail
 * (Tooltip-reference geometry, verbatim). Popover owns ONLY behavior: open/
 * close, portal, positioning/collision (Radix popper), alignment, arrow slot,
 * focus management (trap + scroll lock only when `modal`), Escape/outside
 * dismiss, focus return, keyboard navigation, ARIA. The same base serves the
 * future DropdownMenu / ContextMenu / Command Palette / UserMenu.
 */

/** Root — `open` · `defaultOpen` · `onOpenChange` · `modal` (focus trap +
 * scroll lock only when true). */
const PopoverRoot = PopoverPrimitive.Root

/** Trigger — use `asChild` to wrap your own element (Button, IconButton…). */
const PopoverTrigger = PopoverPrimitive.Trigger

/** Anchor — optional: position the content against this instead of the trigger. */
const PopoverAnchor = PopoverPrimitive.Anchor

/** Close — `asChild` wrapper that dismisses the popover. */
const PopoverClose = PopoverPrimitive.Close

export type PopoverArrowProps = Omit<
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow>,
  'asChild' | 'children'
>

/** Arrow — the shared Floating tail. Same material, same rim, same shadow as
 * the pane; the popper wrapper rotates it per side. */
const PopoverArrow = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Arrow>,
  PopoverArrowProps
>(function PopoverArrow({ className, width = 10, height = 5, ...props }, ref) {
  return (
    <PopoverPrimitive.Arrow
      ref={ref}
      asChild
      width={width}
      height={height}
      {...props}
    >
      <span className={cn(floatingArrowClass, className)} />
    </PopoverPrimitive.Arrow>
  )
})

export interface PopoverContentProps extends React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
> {
  /** Render the shared Floating arrow/tail. */
  arrow?: boolean
  /** Keep the content mounted while closed (CSS-driven visibility). */
  forceMount?: true
}

/** Content — portaled Floating pane. Radix handles focus scope, Escape,
 * outside click, collision detection (flip + shift), sticky and detach hiding;
 * the glass and the entrance come from the Floating base. Default intrinsic
 * geometry only (w-72 · rounded-md · p-4) — layout stays with the consumer. */
const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(function PopoverContent(
  {
    className,
    children,
    sideOffset = 8,
    collisionPadding = 8,
    arrowPadding = 12,
    arrow = false,
    forceMount,
    ...props
  },
  ref,
) {
  return (
    <PopoverPrimitive.Portal forceMount={forceMount}>
      <PopoverPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        arrowPadding={arrowPadding}
        forceMount={forceMount}
        className={cn(
          floatingHostClass,
          floatingEnterClass,
          'z-dropdown block w-72 rounded-md p-4 outline-none',
          className,
        )}
        {...props}
      >
        <FloatingSurface />
        <div className={floatingContentClass}>{children}</div>
        {arrow && <PopoverArrow />}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
})

/** `Popover` + `.Trigger` / `.Anchor` / `.Content` / `.Close` / `.Arrow`. */
export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Anchor: PopoverAnchor,
  Content: PopoverContent,
  Close: PopoverClose,
  Arrow: PopoverArrow,
})
