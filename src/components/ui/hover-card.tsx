'use client'

import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import {
  FloatingSurface,
  floatingArrowClass,
  floatingContentClass,
  type FloatingSize,
} from './floating-surface'
import { popoverPaneClass, popoverPanePaddingClass } from './popover'

/**
 * HoverCard — a small contextual PREVIEW card (profile, exercise, book,
 * workout, session…) revealed by hover intent. NOT a menu — never menu
 * semantics; read-mostly rich content. It derives from the FROZEN Popover and
 * never restarts from FloatingSurface:
 *
 *   GlassSurface → .ds-floating → FloatingSurface → Popover (FROZEN) → HoverCard
 *
 * The pane IS the frozen Popover pane, verbatim: `popoverPaneClass` (same
 * glass, same `ds-floating-lift` suspension, same `ds-floating-enter`
 * entrance, same size scale) + `popoverPanePaddingClass` (same breathing
 * room) + the shared Floating arrow. HoverCard declares NO material, layout,
 * padding, radius, shadow, animation or transition of its own. It owns ONLY
 * how the pane OPENS: hover intent with `openDelay` / `closeDelay`, and the
 * forgiving pointer bridge — moving Trigger → Content never closes the pane
 * (Radix keeps a grace area; the content itself is hover-interactive).
 *
 * Note: hover is a pointer affordance — on touch the trigger does not open
 * (Radix by design); anything shown in a HoverCard must stay reachable
 * elsewhere (its trigger usually links to the full view).
 */

export type HoverCardProps = React.ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Root
>

/** Root — `open` · `defaultOpen` · `onOpenChange` · `openDelay` (default
 * 200ms: intent, not accident) · `closeDelay` (default 150ms: forgiveness,
 * no flicker). */
function HoverCardRoot({
  openDelay = 200,
  closeDelay = 150,
  ...props
}: HoverCardProps) {
  return (
    <HoverCardPrimitive.Root
      openDelay={openDelay}
      closeDelay={closeDelay}
      {...props}
    />
  )
}

/** Trigger — use `asChild` to wrap your own element (link, avatar, name…). */
const HoverCardTrigger = HoverCardPrimitive.Trigger

export interface HoverCardContentProps extends React.ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Content
> {
  /** Shared Floating width scale (xs · sm · md · lg) — same steps as Popover. */
  size?: FloatingSize
  /** Render the shared Floating arrow/tail. */
  arrow?: boolean
}

/** Content — the frozen Popover pane, opened by hover. Radix handles portal,
 * positioning (side/align/offsets), collision (flip + shift), sticky and the
 * trigger→content grace area. */
const HoverCardContent = forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(function HoverCardContent(
  {
    className,
    children,
    sideOffset = 10,
    collisionPadding = 8,
    arrowPadding = 12,
    size = 'sm',
    arrow = false,
    ...props
  },
  ref,
) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        arrowPadding={arrowPadding}
        className={cn(
          popoverPaneClass(size),
          popoverPanePaddingClass,
          className,
        )}
        {...props}
      >
        <FloatingSurface />
        <div className={floatingContentClass}>{children}</div>
        {arrow && (
          <HoverCardPrimitive.Arrow asChild width={10} height={5}>
            <span className={floatingArrowClass} />
          </HoverCardPrimitive.Arrow>
        )}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  )
})

/** `HoverCard` + `.Trigger` / `.Content`. */
export const HoverCard = Object.assign(HoverCardRoot, {
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
})
