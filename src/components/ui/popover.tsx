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
  floatingLiftClass,
  floatingSizeClass,
  type FloatingSize,
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

/** The FROZEN Popover pane recipe — host + entrance + lift + overlay plane +
 * radius + the shared size scale. Floating members that DERIVE from Popover
 * (DropdownMenu → ContextMenu / UserMenu / Command Palette) compose this exact
 * recipe; padding stays per-member geometry. PURE EXTRACTION from
 * PopoverContent (its output is unchanged) so the pane has one definition. */
export function popoverPaneClass(size: FloatingSize = 'sm') {
  return cn(
    floatingHostClass,
    floatingEnterClass,
    floatingLiftClass,
    'z-dropdown block rounded-md outline-none',
    floatingSizeClass[size],
  )
}

/** The frozen Popover content padding (the craft-pass breathing room). PURE
 * EXTRACTION — PopoverContent's output is unchanged; HoverCard reuses it so no
 * derived pane re-declares padding. */
export const popoverPanePaddingClass = 'px-4 py-5'

export interface PopoverContentProps extends React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
> {
  /** Render the shared Floating arrow/tail. */
  arrow?: boolean
  /** Shared Floating width scale (xs · sm · md · lg) — the same steps the
   * future UserMenu / Notifications / Command Palette reuse. */
  size?: FloatingSize
  /** Keep the content mounted while closed (CSS-driven visibility). */
  forceMount?: true
}

/** Content — portaled Floating pane. Radix handles focus scope, Escape,
 * outside click, collision detection (flip + shift), sticky and detach hiding;
 * the glass, the lift and the entrance come from the Floating base. Default
 * intrinsic geometry only (shared size scale · rounded-md · px-4 py-5) —
 * layout stays with the consumer. */
const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(function PopoverContent(
  {
    className,
    children,
    sideOffset = 10,
    collisionPadding = 8,
    arrowPadding = 12,
    arrow = false,
    size = 'sm',
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
          popoverPaneClass(size),
          popoverPanePaddingClass,
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
