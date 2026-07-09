import { cn } from '@/lib/cn'

import { Heading } from './heading'
import { Text } from './text'

/**
 * ErrorState — DISCIPLINE's indicator that the user momentarily CANNOT
 * proceed because an operation or a view FAILED to load. Exactly one
 * responsibility: make the user understand that expected content could not
 * be loaded, and offer a recovery action (typically Retry). It NEVER
 * represents an absence of data (EmptyState), a loading state (Skeleton/
 * Spinner), progress, a confirmation, a notification, a denied permission,
 * or a lost connection.
 *
 * Not an EmptyState (a SUCCESS whose result set is simply empty, or a
 * pristine first-run — no failure occurred; ErrorState is a FAILURE, the
 * load did not complete, and recovery is usually retrying rather than
 * creating something), not an Alert (a message layered ON a populated view
 * — a warning/tip/confirmation strip; ErrorState IS the view when the view
 * itself failed, occupying the whole failed region, not a strip on top of
 * working content), not a Toast (a transient, auto-dismissing notification
 * of an event; ErrorState is permanent until the user retries or navigates
 * away, and it replaces the content it failed to show), not a Spinner/
 * Skeleton/Progress/CircularProgress (activity / a placeholder / a known
 * fraction while a task is IN FLIGHT — ErrorState is the terminal state
 * AFTER the attempt failed), not an OfflineState (a specific connectivity
 * failure — a narrower, network-only sibling; a generic ErrorState covers
 * the temporary-network case as one family, but a dedicated OfflineState
 * would own connectivity-detection UX ErrorState never claims), not a
 * NoPermission state (an authorization BLOCK — the content exists and the
 * request succeeded, you simply may not see it; ErrorState is a genuine
 * failure of the operation), not a MaintenanceState (a planned, whole-app
 * downtime with an ETA — ErrorState is an unplanned, local, retryable
 * failure), not a bare empty Dashboard/Card/Search (those show an
 * EmptyState in their empty branch — ErrorState is what they show in their
 * FAILED branch; the two branches are distinct).
 *
 * The families — server error (5xx), load failed, resource not found
 * (404), temporary network error, unknown error — are all ONE
 * responsibility (expected content could not be loaded + a way to recover)
 * wearing different copy and icons; they are content variations a consumer
 * passes in, never separate components.
 *
 * A CONTENT primitive, NOT a surface. ErrorState draws NO surface of its
 * own — no background, no shadow, no radius, no border, no glass, no
 * material whatsoever. It is not a Card. ALL visual material comes
 * exclusively from the parent surface it fills (a GlassCard, GlassPanel,
 * Drawer, Modal, FullscreenOverlay, or a plain page region). In DISCIPLINE,
 * surfaces are an ARCHITECTURAL level (the Liquid Glass material) and states
 * (EmptyState/ErrorState/OfflineState/NoPermission…) are a CONTENT level;
 * giving a state its own surface would duplicate material and weaken the
 * system's identity. ErrorState therefore renders only icon, title,
 * description and an optional action, aligned by tokens, and inherits
 * everything else from its container — the rendering stays coherent whether
 * the parent is a Card, Drawer, Dialog, FullscreenOverlay or Page. The root
 * is a transparent flex column: spacing/alignment tokens only, never a
 * `bg-*`/`shadow`/`rounded`/`border` class.
 *
 * A FLAT primitive (token system, no glass role) — it does NOT compose
 * Modal/Drawer/Alert/Toast (it is content those may contain, never the
 * other way round), and deliberately does NOT compose the frozen
 * EmptyState despite the visually adjacent layout: they are distinct
 * responsibilities (failure vs. empty), EmptyState is frozen (coupling
 * would block ErrorState's own evolution behind an ADR), and the brief
 * scopes this component's composition to the primitives directly. It
 * composes only the frozen Heading and Text, and renders a caller-supplied
 * `icon` and `action` node (typically the frozen Icon and a Retry Button)
 * verbatim — no icon/button logic of its own. Its ONE semantic distinction
 * from EmptyState: the icon is tinted `text-error` (the universal "failure"
 * signal, read at a glance) rather than the neutral tertiary of an empty
 * state — a meaningful, non-decorative token, matching the frozen Alert's
 * own precedent of pairing a semantic tone with an icon. Purely
 * informative and STATIC: no role on the container (the optional Retry
 * Button keeps its own native semantics, no auto-focus, no keyboard trap),
 * zero motion, zero glass, zero transition/animation. `align` uses logical
 * `start` so a left-aligned state follows `dir="rtl"` naturally with no
 * directional code. Future consumers: Dashboard, Search, Clients,
 * Programs, Calendar, Chat, Notifications, Drawer, Table, List, Gallery,
 * Analytics — any view with a failed-load branch.
 */

export interface ErrorStateProps extends Omit<
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
    description: string
    measure: string
  }
> = {
  sm: {
    padding: 'px-4 py-8',
    gap: 'gap-2',
    icon: '[&>svg]:h-7 [&>svg]:w-7',
    title: 5,
    description: 'text-body-sm',
    measure: 'max-w-sm',
  },
  md: {
    padding: 'px-6 py-12',
    gap: 'gap-3',
    icon: '[&>svg]:h-10 [&>svg]:w-10',
    title: 4,
    description: 'text-body',
    measure: 'max-w-md',
  },
  lg: {
    padding: 'px-8 py-16',
    gap: 'gap-4',
    icon: '[&>svg]:h-12 [&>svg]:w-12',
    title: 3,
    description: 'text-body-lg',
    measure: 'max-w-lg',
  },
}

export function ErrorState({
  title,
  description,
  icon,
  action,
  size = 'md',
  align = 'center',
  className,
  ...props
}: ErrorStateProps) {
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
      {icon && <div className={cn('text-error', config.icon)}>{icon}</div>}
      <Heading as="h3" level={config.title}>
        {title}
      </Heading>
      {description && (
        <Text
          className={cn(
            config.description,
            'text-text-secondary',
            config.measure,
          )}
        >
          {description}
        </Text>
      )}
      {action && <div className="pt-2">{action}</div>}
    </div>
  )
}
