import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import { GlassPanel, type GlassPanelProps } from './glass-panel'

type SidebarVariant = 'floating' | 'attached'

// Radius geometry ONLY — never touches the Structural material.
const sidebarRadius: Record<SidebarVariant, string> = {
  floating: '', // keep the Structural default radius (a rounded rail)
  attached: 'rounded-none', // flush to a viewport edge (app shells, desktop chrome)
}

export interface SidebarProps extends GlassPanelProps {
  /**
   * Radius geometry only. `floating` (default) keeps the Structural radius;
   * `attached` squares every corner (flush to the viewport edge). Neither changes
   * the material. Placement (sticky/fixed) stays with the consumer (Invariant A1).
   */
  variant?: SidebarVariant
  /**
   * Collapses the rail to an icon-only width. Geometry only — a `data-collapsed`
   * attribute is set on the host so children (labels, text) can respond via CSS;
   * Sidebar never decides what content hides, only the width it has to work with.
   */
  collapsed?: boolean
}

/**
 * Sidebar — the vertical counterpart of Navbar. A DIRECT specialization of
 * GlassPanel (GlassSurface → .ds-card → GlassCard → GlassPanel → Sidebar; no
 * hierarchy jump, never composes GlassSurface directly, never recreates a glass
 * layer). The material — transmission, refraction, blur, Fresnel, internal
 * reflections, incident light, specular, edge and shadow — is inherited from
 * GlassPanel UNCHANGED. Sidebar adds nothing optical: its only visual difference
 * from a GlassPanel is geometry — a persistent vertical rail (width, adaptable
 * height, internal vertical stack, section grouping, scroll region, collapsed
 * width state) and a radius variant. No new material, no new shadow.
 *
 * The host carries the material and fills its parent's height (`h-full`, adaptable
 * — the consumer decides page height via `min-h-screen`/`sticky`/`fixed`, per
 * Invariant A1) with its padding neutralized (`p-0`); the inner column owns the
 * rail geometry and breathing space. Width is Sidebar's own intrinsic dimension
 * (the vertical equivalent of Navbar owning height): 272px expanded, 72px
 * collapsed, both driven by the `collapsed` prop.
 *
 * Open compound API, no business assumptions: `Sidebar.Header` · `Sidebar.Content`
 * · `Sidebar.Section` · `Sidebar.Footer` are generic vertical clusters — place a
 * logo, nav items, grouped sections, or a user menu wherever they belong.
 * `Sidebar.Content` is the scrollable region.
 */
const SidebarRoot = forwardRef<HTMLDivElement, SidebarProps>(function Sidebar(
  {
    className,
    variant = 'floating',
    collapsed = false,
    as = 'aside',
    children,
    ...props
  },
  ref,
) {
  return (
    <GlassPanel
      ref={ref}
      as={as}
      data-collapsed={collapsed || undefined}
      className={cn(
        // GlassCard wraps children in a plain (non-flex) content div with no
        // explicit height, so a percentage-height chain inside it is otherwise
        // inert — tall content would overflow the visible glass box instead of
        // scrolling. This targets ONLY that wrapper (geometry, not material) so
        // Sidebar's internal flex column can actually stretch to the rail height.
        'h-full p-0 [&>div]:flex [&>div]:h-full [&>div]:min-h-0 [&>div]:flex-col',
        collapsed ? 'w-[72px]' : 'w-[272px]',
        sidebarRadius[variant],
        className,
      )}
      {...props}
    >
      <div className="flex h-full w-full flex-col gap-6 overflow-hidden px-3 py-6">
        {children}
      </div>
    </GlassPanel>
  )
})

/** Top cluster — logo / wordmark, or a workspace switcher. Shrinks to content. */
const SidebarHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SidebarHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('flex shrink-0 items-center gap-2 px-2', className)}
      {...props}
    />
  )
})

/** The scrollable navigation region — fills the remaining rail height. */
const SidebarContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SidebarContent({ className, ...props }, ref) {
  return (
    <nav
      ref={ref as React.Ref<HTMLElement>}
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto',
        className,
      )}
      {...props}
    />
  )
})

/** A labeled group of nav items. The label is optional (e.g. icon-only groups). */
const SidebarSection = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SidebarSection({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-1', className)}
      {...props}
    />
  )
})

/** Bottom cluster — user menu, settings, collapse toggle. Pinned to the rail's
 * trailing edge. */
const SidebarFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SidebarFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('mt-auto flex shrink-0 flex-col gap-2 px-2', className)}
      {...props}
    />
  )
})

SidebarRoot.displayName = 'Sidebar'
SidebarHeader.displayName = 'Sidebar.Header'
SidebarContent.displayName = 'Sidebar.Content'
SidebarSection.displayName = 'Sidebar.Section'
SidebarFooter.displayName = 'Sidebar.Footer'

export const Sidebar = Object.assign(SidebarRoot, {
  Header: SidebarHeader,
  Content: SidebarContent,
  Section: SidebarSection,
  Footer: SidebarFooter,
})
