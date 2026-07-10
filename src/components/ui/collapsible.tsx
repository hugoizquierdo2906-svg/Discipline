import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

/**
 * Collapsible — a Disclosure primitive that answers exactly ONE question:
 * "do I want to hide or reveal THIS region of content?" It holds exactly one
 * state, open/closed, for exactly one region. It has no group logic, no
 * shared state and no coordination with any other element — unlike the
 * frozen Accordion, it does not know how many panels exist, does not enforce
 * exclusivity, and needs no roving-tabindex keyboard model across siblings
 * (there is only ever one trigger). It holds no domain knowledge: it does
 * not know "FAQ," "Settings," "Tree" or "Sidebar" — those are consumers that
 * will compose Collapsible later.
 *
 * Not Accordion (a GROUP of Collapsibles with coordinated behaviour —
 * `type="single"`/`"multiple"` exclusivity, shared Arrow/Home/End keyboard
 * navigation across every trigger in the group, each trigger wrapped in a
 * heading for the document outline. Collapsible is the atom Radix's own
 * Accordion is literally built from — one region, no siblings, no exclusion
 * rule, no heading wrapper). Not Tabs (SWITCHES between several named,
 * always-visible alternative views, exactly one replacing the last;
 * Collapsible has only one region that is either present or absent — there
 * is no "other view" shown in its place when closed). Not TreeView
 * (hierarchical DATA — files, categories — with selection and often
 * arbitrary nesting; Collapsible has no data model and no selection
 * concept). Not Drawer/BottomSheet (OVERLAY surfaces: portaled, scrimmed,
 * dismissible by Escape/outside-click, transiently covering the page;
 * Collapsible stays in the page's own flow, no overlay, no scrim, no
 * portal). Not Dialog (a blocking modal demanding a decision; Collapsible
 * never blocks). Not Popover (anchored, positioned relative to a trigger,
 * dismissed on outside-click/blur — Collapsible has no positioning logic and
 * no dismiss-on-outside-click; it is a plain in-flow toggle). Not Tooltip
 * (hover-triggered, transient, disappears on mouse-out; Collapsible is
 * click/keyboard-triggered and persists until explicitly toggled again). Not
 * NavigationMenu (leads to different DESTINATIONS/pages; Collapsible reveals
 * content INLINE on the current page).
 *
 * Category: Disclosure (not Navigation, Feedback, Overlay, Layout, Data
 * Display or Forms). Composes DIRECTLY `@radix-ui/react-collapsible` — no
 * intermediate wrapper, no `DisclosureCard`/`ExpandableCard`/
 * `CollapsePanel`/`CollapseCard`/`RevealPanel`/`ContentCard`.
 * `Collapsible.Trigger` shares the exact row material already established
 * by the frozen Accordion's own Trigger (token-driven hover/focus
 * background, a small chevron rotating a flat 180° with the same calm,
 * instant `duration-fast`/`ease-standard` transition, `rounded-sm` — not
 * `rounded-md`, reserved for compact/Card-shaped elements — and
 * `data-[state=open]:rounded-b-none` so an open Trigger's highlight flows
 * into Content instead of reading as a disconnected pill, exactly the
 * continuity fix already made on Accordion) for one deliberate reason:
 * Accordion is built FROM Collapsible, so the atom and the group it forms
 * must read as the same material, never two different ones. Unlike
 * Accordion's Trigger, Collapsible's is not wrapped in a heading element —
 * there is no group outline to preserve. `Collapsible.Content` draws no
 * card and no new surface: content appears directly under the Trigger, on
 * whatever surface already contains it — never a `GlassSurface`. Content
 * never constrains height: no `max-h-*`, no fixed height, no internal
 * scroll — long content grows the page naturally. 100% of Radix's
 * behaviour is kept as-is: ARIA (`aria-expanded`, `aria-controls`,
 * `data-disabled`), keyboard (Tab to focus, Space/Enter to toggle), focus
 * management and `asChild` (a custom trigger element) — no custom
 * behaviour is layered on top.
 */

const CollapsibleTrigger = forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>(function CollapsibleTrigger({ className, children, asChild, ...props }, ref) {
  if (asChild) {
    return (
      <CollapsiblePrimitive.Trigger
        ref={ref}
        asChild
        className={className}
        {...props}
      >
        {children}
      </CollapsiblePrimitive.Trigger>
    )
  }

  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      className={cn(
        'group flex w-full items-center justify-between gap-4 rounded-sm px-4 py-3 text-start text-body font-medium text-text outline-none data-[state=open]:rounded-b-none hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent-accessible disabled:cursor-not-allowed disabled:opacity-40',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        aria-hidden
        className="h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-fast ease-standard group-data-[state=open]:rotate-180"
      />
    </CollapsiblePrimitive.Trigger>
  )
})

const CollapsibleContent = forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(function CollapsibleContent({ className, children, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Content ref={ref} {...props}>
      <div className={cn('px-4 pb-3 text-body text-text-secondary', className)}>
        {children}
      </div>
    </CollapsiblePrimitive.Content>
  )
})

export const Collapsible = Object.assign(CollapsiblePrimitive.Root, {
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
})
