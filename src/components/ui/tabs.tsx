'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

/**
 * Tabs — DISCIPLINE's control for switching between a SMALL, NAMED, always-
 * visible set of alternate content views for the SAME record or context,
 * without leaving the page: "which facet of THIS am I looking at" — never
 * "where am I in the hierarchy" (Breadcrumb), never "which page of THIS
 * list" (Pagination), never "what should happen next" (Stepper).
 *
 * Not an Accordion (stacks sections VERTICALLY in one flowing page, any
 * number open at once, growing height — Tabs shows EXACTLY one panel,
 * fully replacing the last, constant height), not a Navigation Menu (the
 * app's PRIMARY destinations, usually real page navigation/routing — Tabs
 * switches LOCAL content on the SAME view, no page change), not a
 * Segmented Control (frozen: changes an EXTERNAL value the consumer reacts
 * to, owns no panel at all — no `role="tabpanel"`, no built-in
 * `aria-controls`/`aria-labelledby` linkage; Tabs structurally OWNS the
 * panel via `TabsContent`, with that ARIA wiring built in — exactly the
 * distinction already on record in FullscreenOverlay's own docs: "Tabs...
 * owns a content panel" where Segmented Control does not), not a Sidebar
 * (a persistent LAYOUT region, often multi-level, always on screen — Tabs
 * is a compact strip local to one content block), not a Breadcrumb
 * (reports a STRUCTURAL position among ancestors, never panels), not a
 * Stepper (a SEQUENTIAL, usually validated progression — every tab is
 * freely reachable at any time, in any order, nothing to complete first),
 * not Pagination (structurally IDENTICAL pages of a large, often huge
 * sequence, collapsible — Tabs is a small, fixed, always-fully-visible set
 * of SEMANTICALLY DIFFERENT views, never collapsed), not a Select (a
 * value from a CLOSED but often LONG list, hidden behind a menu to save
 * space — Tabs keeps every option visible permanently, which only scales
 * to a handful), not a Dropdown Menu (transient commands, never a
 * permanently visible, panel-bound set of views), not a Command Palette
 * (a global search-and-act surface, orthogonal to displaying alternate
 * views of one record), not a Carousel (a SEQUENCE of slides/media
 * BROWSED in order, often auto-advancing/swiped/looped, no persistent
 * named identity per slide — Tabs is chosen EXPLICITLY by name, never
 * scrolled through, and each view has a durable label, not an ordinal
 * position).
 *
 * A FLAT primitive with NO Material Role (zero GlassSurface, zero
 * .ds-micro/.ds-control/.ds-card/.ds-floating/.ds-immersive, zero motion
 * budget) — but architecturally a DIFFERENT sub-family from the frozen
 * Breadcrumb/Pagination (plain lists of independent controls, native Tab
 * order, no roving tabindex). Tabs is a COMPOSITE ARIA WIDGET: the WAI-ARIA
 * Tabs pattern mandates roving tabindex among triggers with Arrow/Home/End
 * navigation — the same keyboard MODEL as the frozen RadioGroup/Segmented
 * Control, which is why the brief requires Arrow Keys/Home/End here
 * (mandatory), unlike Breadcrumb/Pagination (native Tab order was
 * sufficient and complete there). Despite that shared keyboard model,
 * Tabs does NOT derive from Control Surface / reuse Segmented Control's
 * glass: its universal, most-precedented visual identity — Material
 * Design 3's own "tab indicator," MUI, GitHub, Linear — is a text label
 * plus a thin indicator bar, never a glass pill; wearing Micro-tuned glass
 * on every trigger the way Segmented Control does would misrepresent a
 * pattern whose entire visual language is deliberately quiet. The
 * indicator here is a plain instant border-color swap on the active
 * trigger (`data-state=active`) — never an animated sliding bar, since
 * this file carries zero transition/animation.
 *
 * Composes `@radix-ui/react-tabs` DIRECTLY — unlike Breadcrumb/Pagination
 * (for which Radix ships no primitive at all), Tabs inherits its entire
 * behavioral contract verbatim: controlled/uncontrolled state,
 * `role="tablist"`/`"tab"`/`"tabpanel"`, `aria-selected`, `aria-controls`,
 * `aria-labelledby`, orientation-aware roving tabindex, `dir`-aware
 * Arrow-key direction (flips correctly in RTL), and a focusable tabpanel
 * (so Tab from the active trigger lands directly on the panel). This file
 * adds ONLY geometry, spacing and the token-only active-state styling —
 * zero behavioral code of its own.
 *
 * One deliberate divergence from Radix's own raw default: `activationMode`
 * defaults to `"manual"` here, not Radix's `"automatic"`. The WAI-ARIA APG
 * itself: "Authors should consider implementing automatic activation of
 * tabs only in circumstances where panels can be displayed instantly...
 * Otherwise, automatic activation slows focus movement, which
 * significantly hampers users' ability to navigate efficiently." As a
 * generic, reusable primitive, DISCIPLINE cannot guarantee a future
 * consumer's panel content has zero latency — manual (Space/Enter/click
 * to activate) is the universally safe default; automatic remains one
 * prop away for a consumer who knows their content is already cheap/
 * present. Future consumers: client-profile views (Overview/Progress/
 * Settings), settings screens, any multi-facet content block — including
 * as CONTENT inside the frozen Drawer/FullscreenOverlay/Card (never their
 * surface, per those components' own documented boundary).
 */

export type TabsProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Root
>

const TabsRoot = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(function Tabs({ className, activationMode = 'manual', ...props }, ref) {
  return (
    <TabsPrimitive.Root
      ref={ref}
      activationMode={activationMode}
      className={cn(
        'flex gap-4',
        'data-[orientation=horizontal]:flex-col',
        'data-[orientation=vertical]:flex-row',
        className,
      )}
      {...props}
    />
  )
})

export type TabsListProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.List
>

const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(function TabsList({ className, ...props }, ref) {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'group/list flex shrink-0 gap-1 overflow-x-auto border-b border-border',
        'data-[orientation=vertical]:flex-col data-[orientation=vertical]:overflow-x-visible data-[orientation=vertical]:overflow-y-auto data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r data-[orientation=vertical]:pr-2',
        className,
      )}
      {...props}
    />
  )
})

export type TabsTriggerProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
>

const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(function TabsTrigger({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'inline-flex shrink-0 items-center whitespace-nowrap border-b-2 border-transparent px-3 py-2 text-body-sm text-text-secondary outline-none hover:text-text',
        'data-[state=active]:border-accent-accessible data-[state=active]:font-medium data-[state=active]:text-text',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
        'focus-visible:ring-2 focus-visible:ring-accent-accessible',
        'group-data-[orientation=vertical]/list:w-full group-data-[orientation=vertical]/list:justify-start group-data-[orientation=vertical]/list:border-b-0 group-data-[orientation=vertical]/list:border-l-2 group-data-[orientation=vertical]/list:pl-3',
        className,
      )}
      {...props}
    />
  )
})

export type TabsContentProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Content
>

const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(function TabsContent({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        'min-w-0 flex-1 rounded-sm text-body-sm text-text outline-none',
        'focus-visible:ring-2 focus-visible:ring-accent-accessible',
        className,
      )}
      {...props}
    />
  )
})

TabsRoot.displayName = 'Tabs'
TabsList.displayName = 'Tabs.List'
TabsTrigger.displayName = 'Tabs.Trigger'
TabsContent.displayName = 'Tabs.Content'

/** Re-exported so every part is reachable both ways: `Tabs.List` (compound)
 * and `TabsList` (standalone named import). */
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
})

export { TabsList, TabsTrigger, TabsContent }
