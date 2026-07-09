import { cn } from '@/lib/cn'

import { Heading } from './heading'
import { Text } from './text'

/**
 * OfflineState — DISCIPLINE's indicator that the user momentarily cannot
 * reach content because the APPLICATION HAS NO NETWORK CONNECTION. Exactly
 * one responsibility: communicate the absence of connectivity and (usually)
 * offer to retry once the network is back. It NEVER represents a server
 * error, a loading state, progress, an absence of data, a denied permission,
 * planned maintenance, or an unknown failure.
 *
 * Not an ErrorState (a FAILURE — "something went wrong," often server-side,
 * where the network was fine and the request actually reached and failed;
 * OfflineState is the opposite: the request never left the device because
 * there is no connection — a different cause and a different user action:
 * "reconnect," not "our servers are broken"), not an EmptyState (a SUCCESS
 * with no data, or a first-run — here nothing loaded BECAUSE there is no
 * network, not because the collection is genuinely empty), not a Spinner/
 * Skeleton/Progress/CircularProgress (in-flight activity — OfflineState is a
 * terminal environmental condition: nothing is happening because nothing
 * CAN until connectivity returns), not an Alert (a message layered ON a
 * working, connected view; OfflineState IS the view when the whole region
 * cannot load for lack of network), not a Toast (a transient, auto-
 * dismissing "you went offline" ping — useful too, but momentary; a full
 * OfflineState occupies the region that could not load and persists until
 * reconnection), not a NoPermission state (an authorization BLOCK — the
 * network is fine and the request succeeded, you simply may not see the
 * content), not a MaintenanceState (a planned, server-side, whole-app
 * downtime with an ETA — the user's network is fine; OfflineState is the
 * user's OWN connectivity that is gone), not a Retry Banner (a thin
 * persistent strip that keeps the failed view visible and offers retry —
 * a compact variant of this idea; OfflineState is the full-region take when
 * there is nothing to keep visible), not a FullscreenOverlay (a SURFACE that
 * may CONTAIN an OfflineState, never the other way round).
 *
 * The variants — connection lost, airplane mode, no connection at all,
 * reconnection pending, "the server is unreachable but your network is up"
 * (which is really an ErrorState, not this) — collapse to ONE
 * responsibility: absence of connectivity, expressed as content a consumer
 * passes in, never separate components.
 *
 * A CONTENT primitive, NOT a surface — the exact contract of the frozen
 * ErrorState. OfflineState draws NO surface of its own: no background, no
 * shadow, no radius, no border, no glass, no material, no Card. ALL visual
 * material comes exclusively from the parent surface it fills (a GlassCard,
 * GlassPanel, Drawer, Modal, FullscreenOverlay, Page or Dashboard). In
 * DISCIPLINE, surfaces are an ARCHITECTURAL level (the Liquid Glass
 * material) and states (EmptyState/ErrorState/OfflineState/NoPermission…)
 * are a CONTENT level; giving a state its own surface would duplicate
 * material and weaken the system's identity. The root is a transparent flex
 * column — spacing/alignment tokens only, never a `bg-*`/`shadow`/`rounded`/
 * `border` class. It renders only icon, title, description and an optional
 * action, and inherits everything else from its container.
 *
 * A FLAT primitive (token system, no glass role) — does NOT compose
 * Modal/Drawer/Alert/Toast, and deliberately does NOT compose the frozen
 * ErrorState despite the identical layout: distinct responsibilities
 * (no-network vs. failure), ErrorState is frozen (coupling would block
 * OfflineState's own evolution behind an ADR), and the brief scopes this
 * component's composition to the primitives directly. Composes only the
 * frozen Heading and Text, and renders a caller-supplied `icon` and Retry
 * `action` (typically the frozen Icon and Button) verbatim — no icon/button
 * logic of its own. Its icon is tinted `text-warning` (amber) — a
 * deliberate three-tier semantic: EmptyState's neutral tertiary (nothing
 * here), OfflineState's amber warning (no network — an environmental
 * condition, attention but not a crash), ErrorState's `text-error` red (a
 * genuine failure) — a meaningful, non-decorative token read at a glance.
 * Purely informative and STATIC: no role on the container (the optional
 * Retry Button keeps its own native semantics — no auto-focus, no keyboard
 * trap), zero motion, zero glass, zero transition/animation. `align` uses
 * logical `start` so a left-aligned state follows `dir="rtl"` naturally.
 * Future consumers: Dashboard, Search, Chat, Notifications, Drawer,
 * FullscreenOverlay, Gallery, Files, Programs, Clients — any view that can
 * lose connectivity.
 */

export interface OfflineStateProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> {
  title: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  action?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  align?: 'center' | 'left'
}

const sizeConfig: Record<
  'sm' | 'md' | 'lg',
  {
    padding: string
    gap: string
    icon: string
    title: 5 | 4 | 3
    description: 'body-sm' | 'body' | 'body-lg'
    measure: string
  }
> = {
  sm: {
    padding: 'px-4 py-8',
    gap: 'gap-2',
    icon: '[&>svg]:h-7 [&>svg]:w-7',
    title: 5,
    description: 'body-sm',
    measure: 'max-w-sm',
  },
  md: {
    padding: 'px-6 py-12',
    gap: 'gap-3',
    icon: '[&>svg]:h-10 [&>svg]:w-10',
    title: 4,
    description: 'body',
    measure: 'max-w-md',
  },
  lg: {
    padding: 'px-8 py-16',
    gap: 'gap-4',
    icon: '[&>svg]:h-12 [&>svg]:w-12',
    title: 3,
    description: 'body-lg',
    measure: 'max-w-lg',
  },
}

export function OfflineState({
  title,
  description,
  icon,
  action,
  size = 'md',
  align = 'center',
  className,
  ...props
}: OfflineStateProps) {
  const config = sizeConfig[size]
  const centered = align === 'center'

  return (
    <div
      className={cn(
        'flex w-full flex-col',
        centered ? 'items-center text-center' : 'items-start text-start',
        config.padding,
        config.gap,
        className,
      )}
      {...props}
    >
      {icon && <div className={cn('text-warning', config.icon)}>{icon}</div>}
      <Heading as="h3" level={config.title}>
        {title}
      </Heading>
      {description && (
        <Text
          size={config.description}
          tone="secondary"
          className={config.measure}
        >
          {description}
        </Text>
      )}
      {action && <div className="pt-2">{action}</div>}
    </div>
  )
}
