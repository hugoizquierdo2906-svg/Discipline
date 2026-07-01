import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import { GlassPanel, type GlassPanelProps } from './glass-panel'

type BottomNavVariant = 'floating' | 'attached' | 'inset'

// Radius geometry ONLY — never touches the Structural material.
const bottomNavRadius: Record<BottomNavVariant, string> = {
  floating: '', // keep the Structural default radius (a rounded bar)
  attached: 'rounded-none', // flush to the viewport bottom edge (all corners square)
  inset: 'rounded-t-none', // sits on the bottom edge, rounded only where it meets content
}

export interface BottomNavProps extends GlassPanelProps {
  /**
   * Radius geometry only. `floating` (default) keeps the Structural radius;
   * `attached` squares every corner (flush to the viewport bottom); `inset` rounds
   * only the top (the bar rises from the bottom edge). None change the material.
   * Placement (`fixed`/`sticky` to the viewport bottom) stays with the consumer
   * (Invariant A1) — BottomNav only offers the corner geometry each context needs.
   */
  variant?: BottomNavVariant
}

/**
 * BottomNav — the mobile counterpart of Navbar. A DIRECT specialization of
 * GlassPanel (GlassSurface → .ds-card → GlassCard → GlassPanel → BottomNav; no
 * hierarchy jump, never composes GlassSurface directly, never recreates a glass
 * layer). The material — transmission, refraction, blur, Fresnel, internal
 * reflections, incident light, specular, edge and shadow — is inherited from
 * GlassPanel UNCHANGED. BottomNav adds nothing optical: its only visual difference
 * from a GlassPanel (and from Navbar) is geometry and orientation — a bottom bar
 * that distributes a few primary destinations evenly across its width, within
 * thumb reach, with device safe-area support. No new material, no new shadow.
 *
 * The host carries the material and spans full width with its padding neutralized
 * (`p-0`); the inner row owns the bar geometry: a fixed comfortable height, evenly
 * distributed items, and bottom safe-area padding (`pb-[env(safe-area-inset-bottom)]`)
 * so the bar clears the home indicator when the consumer fixes it to the viewport
 * bottom. Placement (`fixed inset-x-0 bottom-0`) is the consumer's decision (A1).
 *
 * Open compound API, no business assumptions: `BottomNav.Item` is a destination
 * (icon + optional label, `active` state, optional `badge`); `BottomNav.Group`
 * evenly distributes a cluster of items (use it directly as the bar's only child,
 * or nest several groups). Items render as `<a>` by default, or `asChild` to wrap
 * a router link.
 */
const BottomNavRoot = forwardRef<HTMLDivElement, BottomNavProps>(
  function BottomNav(
    { className, variant = 'floating', as = 'nav', children, ...props },
    ref,
  ) {
    return (
      <GlassPanel
        ref={ref}
        as={as}
        aria-label="Primary"
        className={cn('w-full p-0', bottomNavRadius[variant], className)}
        {...props}
      >
        <div className="flex h-16 w-full items-stretch gap-1 px-2 pb-[env(safe-area-inset-bottom)]">
          {children}
        </div>
      </GlassPanel>
    )
  },
)

/** Evenly distributes a cluster of items across the available width. Use as the
 * bar's child (each item gets equal space) or nest multiple groups. */
const BottomNavGroup = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function BottomNavGroup({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-1 items-stretch justify-around gap-1',
        className,
      )}
      {...props}
    />
  )
})

export interface BottomNavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Render as the child element (e.g. a Next.js <Link>). */
  asChild?: boolean
  /** Marks the current destination — sets `aria-current="page"` and the active
   * styling. */
  active?: boolean
  icon?: React.ReactNode
  /** Optional text label under the icon. Truncates so long labels never break the
   * bar geometry. */
  label?: React.ReactNode
  /** Optional count/dot rendered at the icon's top-right (uses the shared Badge
   * language via tokens — no new visual). */
  badge?: React.ReactNode
}

/**
 * A single destination — an equal-width, ≥44px touch target with an icon, an
 * optional label, and an optional badge. Active state is a discreet colour/weight
 * shift (token-driven), never a new material or glass. Content only; the bar's
 * glass comes from GlassPanel.
 */
const BottomNavItem = forwardRef<HTMLAnchorElement, BottomNavItemProps>(
  function BottomNavItem(
    {
      className,
      asChild = false,
      active = false,
      icon,
      label,
      badge,
      ...props
    },
    ref,
  ) {
    const Comp = asChild ? Slot : 'a'
    return (
      <Comp
        ref={ref}
        aria-current={active ? 'page' : undefined}
        data-active={active || undefined}
        className={cn(
          'group relative flex min-h-target-min flex-1 select-none flex-col items-center justify-center gap-1 rounded-md px-1 py-1',
          'text-caption font-medium outline-none transition-colors duration-fast ease-standard',
          'focus-visible:ring-2 focus-visible:ring-accent-accessible',
          active
            ? 'text-accent-accessible'
            : 'text-text-tertiary hover:text-text',
          className,
        )}
        {...props}
      >
        {icon != null && (
          <span className="relative inline-flex h-6 w-6 items-center justify-center">
            {icon}
            {badge != null && (
              <span className="absolute -right-1.5 -top-1.5 inline-flex">
                {badge}
              </span>
            )}
          </span>
        )}
        {label != null && (
          <span className="max-w-full truncate leading-none">{label}</span>
        )}
      </Comp>
    )
  },
)

BottomNavRoot.displayName = 'BottomNav'
BottomNavGroup.displayName = 'BottomNav.Group'
BottomNavItem.displayName = 'BottomNav.Item'

export const BottomNav = Object.assign(BottomNavRoot, {
  Group: BottomNavGroup,
  Item: BottomNavItem,
})
