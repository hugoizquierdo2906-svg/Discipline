import { cn } from '@/lib/cn'

import { Heading } from './heading'
import { Text } from './text'

/**
 * EmptyState — DISCIPLINE's indicator of a MEANINGFUL absence of content or
 * result, that also points the user at the next action. Exactly one
 * responsibility: "there is deliberately nothing here (yet), and here is what
 * to do about it." It NEVER represents a loading state (Skeleton/Spinner), a
 * blocking error, a notification, or progress.
 *
 * Not an Alert (a message ABOUT existing content — a warning, a tip, a
 * confirmation layered onto a populated view; EmptyState IS the view when
 * there is no content, occupying the whole empty region, not a strip on top
 * of it), not a Toast (a transient, auto-dismissing notification of an event
 * that just happened; EmptyState is permanent for as long as the region
 * stays empty), not a Skeleton (a placeholder for content that IS coming,
 * milliseconds away — EmptyState is the resolved, final answer that nothing
 * is there), not a Spinner/Progress/CircularProgress (activity / a known
 * fraction of a task in flight — EmptyState is the opposite: the task is
 * done and its result is empty), not an ErrorState (a FAILURE — something
 * went wrong, often retryable; EmptyState is a SUCCESS whose result set
 * happens to be empty, or a pristine first-run — no failure occurred), not
 * an OfflineState (a specific connectivity failure, a kind of ErrorState),
 * not a NoPermission state (an authorization BLOCK — the content exists but
 * you may not see it; EmptyState is about content that genuinely is not
 * there), not a Card (a container for content that exists — EmptyState is
 * what a Card or region shows INSTEAD of content, composed inside it, never
 * a competing container), not a bare empty Table/List/Dashboard/Search
 * result (those are the CONTEXTS that render an EmptyState in their empty
 * branch — EmptyState is the reusable body they all share, so every empty
 * view doesn't reinvent the icon/title/description/action rhythm), not
 * placeholder text (fake filler pretending to be content — EmptyState is
 * honest, purpose-built copy that names the absence and the next step).
 *
 * The many "families" — no search results, no data yet, no clients, no
 * sessions, no programs, no notifications, no conversations, first-run
 * onboarding — are all ONE responsibility (a meaningful absence + a way
 * forward) wearing different copy and icons; they are content variations a
 * consumer passes in, never separate components.
 *
 * A FLAT primitive (token system, no glass role) — it does NOT compose
 * Modal/Drawer/Card/Alert (it is content those may contain, never the other
 * way round). It composes only the frozen Heading and Text for its typographic
 * hierarchy, and renders a caller-supplied `icon` and `action` node (typically
 * the frozen Icon and Button) verbatim — no icon/button logic of its own.
 * Purely informative and static: no role on the container (the optional
 * `action` Button keeps its own semantics), zero motion, zero glass. `align`
 * uses logical `start` so a left-aligned state follows `dir="rtl"` naturally
 * with no directional code. Future consumers: Dashboard, Search, Clients,
 * Programs, Calendar, Chat, Notifications, Library, Gallery, Files, Table,
 * List — any view with an empty branch.
 */

export interface EmptyStateProps extends Omit<
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
    title: 'h5' | 'h4' | 'h3'
    description: 'body-sm' | 'body' | 'body-lg'
    measure: string
  }
> = {
  sm: {
    padding: 'px-4 py-8',
    gap: 'gap-2',
    icon: '[&>svg]:h-7 [&>svg]:w-7',
    title: 'h5',
    description: 'body-sm',
    measure: 'max-w-sm',
  },
  md: {
    padding: 'px-6 py-12',
    gap: 'gap-3',
    icon: '[&>svg]:h-10 [&>svg]:w-10',
    title: 'h4',
    description: 'body',
    measure: 'max-w-md',
  },
  lg: {
    padding: 'px-8 py-16',
    gap: 'gap-4',
    icon: '[&>svg]:h-12 [&>svg]:w-12',
    title: 'h3',
    description: 'body-lg',
    measure: 'max-w-lg',
  },
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  size = 'md',
  align = 'center',
  className,
  ...props
}: EmptyStateProps) {
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
      {icon && (
        <div className={cn('text-text-tertiary', config.icon)}>{icon}</div>
      )}
      <Heading as="h3" level={config.title}>
        {title}
      </Heading>
      {description && (
        <Text
          size={config.description}
          tone="secondary"
          className={cn(config.measure, centered && 'mx-auto')}
        >
          {description}
        </Text>
      )}
      {action && <div className="pt-2">{action}</div>}
    </div>
  )
}
