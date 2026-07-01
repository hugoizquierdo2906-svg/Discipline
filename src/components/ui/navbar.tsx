import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import { GlassPanel, type GlassPanelProps } from './glass-panel'

export interface NavbarProps extends GlassPanelProps {
  /**
   * `attached` removes the Structural radius (`rounded-none`) for a navbar flush
   * to an edge — the top of the viewport, desktop/mobile app chrome. The default
   * keeps GlassPanel's Structural radius: a floating, rounded bar (landing pages,
   * premium dashboards). Both cases are always available; neither is imposed.
   * Placement (`sticky`/`fixed`, scroll transitions) is NEVER decided here — per
   * Invariant A1 that belongs to the consumer.
   */
  attached?: boolean
}

/**
 * Navbar — the first navigation component, built ONLY by specializing GlassPanel
 * (GlassSurface → .ds-card → GlassCard → GlassPanel → Navbar; no hierarchy jump).
 * It is a Structural Surface: the material, light, refraction, reflections and
 * cast shadow all come from GlassPanel unchanged. Navbar adds nothing optical —
 * its ONLY visual difference from a GlassPanel is geometry: a navigation row
 * (height, horizontal padding, flex layout, vertical alignment, responsive) and a
 * choice of radius (floating vs `attached`). No new material, no new shadow: if a
 * navbar reads as more floating, that comes from its geometry / position / context
 * (set by the consumer), never from a new recipe here.
 *
 * The host carries the material and spans full width with its padding neutralized
 * (`p-0`) so the glass is edge-to-edge; the inner row owns the navigation geometry.
 *
 * Composition is open, with no business assumptions: `Navbar.Brand` ·
 * `Navbar.Content` · `Navbar.Actions` are generic flex clusters — place a logo,
 * links, a search field, a theme switch, buttons, dropdowns or an avatar wherever
 * they belong. Content collapses below `md` for a (later) mobile menu.
 */
const NavbarRoot = forwardRef<HTMLDivElement, NavbarProps>(function Navbar(
  { className, attached = false, as = 'nav', children, ...props },
  ref,
) {
  return (
    <GlassPanel
      ref={ref}
      as={as}
      className={cn('w-full p-0', attached && 'rounded-none', className)}
      {...props}
    >
      <div className="flex h-14 w-full items-center gap-4 px-4 md:h-16 md:px-6 lg:px-8">
        {children}
      </div>
    </GlassPanel>
  )
})

/** Left cluster — logo / wordmark. Shrinks to its content. */
const NavbarBrand = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function NavbarBrand({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('flex shrink-0 items-center gap-2', className)}
      {...props}
    />
  )
})

/** Primary navigation cluster — fills the middle and centers on desktop; hidden
 * below `md` so links can collapse into a future mobile menu. Overridable. */
const NavbarContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function NavbarContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        'hidden flex-1 items-center justify-center gap-1 md:flex',
        className,
      )}
      {...props}
    />
  )
})

/** Right cluster — actions (buttons, search, theme switch, avatar…). Pushed to
 * the trailing edge so it holds its place with or without Content. */
const NavbarActions = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function NavbarActions({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('ml-auto flex shrink-0 items-center gap-2', className)}
      {...props}
    />
  )
})

NavbarRoot.displayName = 'Navbar'
NavbarBrand.displayName = 'Navbar.Brand'
NavbarContent.displayName = 'Navbar.Content'
NavbarActions.displayName = 'Navbar.Actions'

export const Navbar = Object.assign(NavbarRoot, {
  Brand: NavbarBrand,
  Content: NavbarContent,
  Actions: NavbarActions,
})
