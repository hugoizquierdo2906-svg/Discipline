import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

/**
 * Accordion — a Disclosure primitive that answers exactly ONE question:
 * "what additional content can I reveal?" It never answers "where am I"
 * (Navigation), "what happened" (Feedback), "what's on top" (Overlay), "what
 * is this value" (Data Display) or "what do I submit" (Form) — it only
 * progressively reveals or hides content that stays in the page's own flow.
 * It holds no domain knowledge and no state beyond open/closed.
 *
 * Not Collapsible (a single togglable section with no relationship to
 * siblings; Accordion is a GROUP of Collapsibles with coordinated behaviour —
 * `type="single"` enforces at most one open at a time, `type="multiple"`
 * allows several, plus shared keyboard navigation across the whole group.
 * Radix's own Accordion is literally built on Collapsible internally).
 * Not Tabs (Tabs SWITCH the visible region — all inactive panels vanish
 * entirely, and the trigger row itself is a permanent, always-visible
 * strip; the user is looking at a DIFFERENT view). Accordion instead
 * reveals ADDITIONAL content in place — every trigger stays visible,
 * collapsed items are simply shorter, and the user is still looking at the
 * same list, now with more of it showing. Not TreeView (represents
 * hierarchical DATA — files, categories — usually with selection, often
 * nested arbitrarily deep and used for browsing/choosing a data node;
 * Accordion discloses independent CONTENT SECTIONS, not a data hierarchy,
 * and has no selection concept). Not Drawer/Sheet/BottomSheet (OVERLAY
 * surfaces: portaled, scrimmed, dismissible by Escape/outside-click,
 * transiently covering the page for one task; Accordion has no overlay, no
 * scrim, no portal, no dismiss gesture — it is a permanent part of the
 * page's own layout). Not Popover/Tooltip (transient, anchored to a
 * trigger, dismissed on blur/outside-click — momentary contextual info, not
 * a persistent expand/collapse of primary content). Not Dialog (a blocking,
 * modal overlay demanding a decision before the page becomes interactive
 * again; Accordion never blocks anything). Not NavigationMenu (triggers
 * flyouts that lead to different DESTINATIONS/pages; Accordion reveals
 * content INLINE on the current page — it navigates nowhere).
 *
 * Category: Disclosure (not Navigation, Feedback, Overlay, Data Display,
 * Form or Layout). Composes DIRECTLY `@radix-ui/react-accordion` — no
 * intermediate wrapper component, no `AccordionCard`/`AccordionPanel`/
 * `DisclosureCard`/`ExpandableCard`/`AccordionContainer`. `Accordion.Trigger`
 * internally pairs Radix's `Header` with its `Trigger` (Radix's own
 * accessibility contract requires the interactive control to sit inside a
 * heading element) — this is an implementation detail of `Trigger` itself,
 * never a separate piece of the public API. `Accordion.Item` decides no
 * border, no background and no spacing of its own (Invariant A1 — layout
 * between items, e.g. a divider, is the consumer's decision, composed with
 * the frozen `Separator` at the point of use, never baked into Item).
 * `Accordion.Content` draws no card and no new surface of any kind: the
 * content appears directly under the Trigger, on whatever surface already
 * contains the Accordion — never a `GlassSurface`. The Trigger's only
 * affordance is a flat, token-driven hover/focus background (never glass,
 * blur or a shadow) plus a small chevron that rotates a flat 180° on open
 * (the same calm, instant `duration-fast`/`ease-standard` transition already
 * used by the frozen Select/DropdownMenu chevrons — no bounce, no spring, no
 * exaggerated motion). `Accordion.Content` never constrains height: no
 * `max-h-*`, no fixed height, no internal scroll — long content grows the
 * page naturally. 100% of Radix's behaviour is kept as-is: ARIA
 * (`aria-expanded`, `aria-controls`, `aria-disabled`), full keyboard
 * (ArrowUp/ArrowDown/Home/End/Enter/Space), focus management, RTL (`dir`)
 * and `orientation` — no custom behaviour is layered on top.
 */

const AccordionItem = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(function AccordionItem({ className, ...props }, ref) {
  return <AccordionPrimitive.Item ref={ref} className={className} {...props} />
})

const AccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(function AccordionTrigger({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          'group flex flex-1 items-center justify-between gap-4 rounded-sm px-4 py-3 text-start text-body font-medium text-text outline-none data-[state=open]:rounded-b-none hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent-accessible disabled:cursor-not-allowed disabled:opacity-40',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          aria-hidden
          className="h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-fast ease-standard group-data-[state=open]:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})

const AccordionContent = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Content ref={ref} {...props}>
      <div className={cn('px-4 pb-3 text-body text-text-secondary', className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
})

export const Accordion = Object.assign(AccordionPrimitive.Root, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
})
