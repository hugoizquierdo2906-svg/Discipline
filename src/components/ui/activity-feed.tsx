import { createContext, forwardRef, useContext } from 'react'

import { cn } from '@/lib/cn'

import { Separator } from './separator'

/**
 * ActivityFeed — a Data Display primitive that answers exactly ONE
 * question: "what happened recently?" It only displays a list of
 * activities; it holds no business logic and no interaction state of any
 * kind. It does not know push notifications, real-time updates,
 * WebSockets, likes, comments, replies, reactions, bookmarks, unread
 * state, selection, pagination, infinite scroll, loading, filtering,
 * grouping, sorting or search — every one of those belongs to the
 * consuming business screen, never to ActivityFeed.
 *
 * Not Timeline (Timeline answers "in what order did these events
 * happen?" — a strict chronological AXIS, drawn as a connecting line
 * between dots, where the sequence itself is the point; ActivityFeed
 * answers "what happened recently?" — a list of activities read for
 * their own content, with no drawn axis at all. Timeline is historical
 * and read as a sequence; ActivityFeed is closer to "live" and read as a
 * set of individual happenings. A future screen MAY render the same
 * events in either component depending on which question it is
 * answering). Not Table (compares several objects across several ALIGNED
 * properties in named columns — ActivityFeed has no columns, no
 * cross-item property comparison, just one activity after another). Not
 * List (a generic, content-agnostic sequence of arbitrary items with no
 * fixed anatomy — ActivityFeed has a specific, opinionated anatomy: an
 * actor/icon, a title, an optional description, metadata and optional
 * actions, always in that reading order). Not Card (one object's own full
 * detail, read in isolation, usually with its own surface/border/padding
 * — an ActivityFeed.Item is a plain row with no surface of its own, meant
 * to be read as part of a list, never alone). Not Accordion (progressive
 * disclosure — content hidden until revealed; every ActivityFeed item is
 * always fully visible, nothing expands or collapses). Not TreeView
 * (hierarchical containment/nesting with expand/collapse and selection —
 * ActivityFeed is a flat list, one activity after another, never nested).
 * Not a Notification / Notification Center (a notification is actionable
 * and stateful — read/unread, dismissible, often transient/toast-like or
 * counted with a badge; ActivityFeed has no unread state, no dismiss, no
 * counting — it is a plain historical display, not an alert mechanism).
 * Not an Audit Log (a compliance-grade, immutable, often paginated/
 * filterable/searchable record with strict field-level structure —
 * ActivityFeed is a lightweight product-facing display with none of that
 * machinery; an audit log SCREEN could compose ActivityFeed as its
 * display layer, but ActivityFeed itself implements none of the log's own
 * responsibilities). Not Chat / Comment Thread (two-way, conversational,
 * reply-and-react content authored BETWEEN people, usually with its own
 * input composer — ActivityFeed is one-way and system-reported: things
 * that happened, never a conversation). Not History (often a synonym for
 * this same idea, but frequently implies a reversible/undoable log tied to
 * one specific object, e.g. version history of one document — ActivityFeed
 * is cross-object, unopinionated about undo). Not a social Feed
 * (Facebook/Twitter/Instagram/LinkedIn/Discord/Slack-style — reactions,
 * comments, reshares, threads, rich embeds, algorithmic ranking;
 * ActivityFeed must never grow toward any of that: no bubbles, no
 * reactions, no comment counts, no threads, no engagement metrics, ever).
 *
 * Category: Data Display (not Navigation, Feedback, Overlay, Layout,
 * Forms or Disclosure). A real compound (`ActivityFeed`/
 * `ActivityFeed.Item`/`ActivityFeed.Avatar`/`ActivityFeed.Icon`/
 * `ActivityFeed.Content`/`ActivityFeed.Title`/`ActivityFeed.Description`/
 * `ActivityFeed.Meta`/`ActivityFeed.Actions`). `ActivityFeed` renders a
 * real `<ul>` (a plain list of activities — unlike Timeline's `<ol>`,
 * order is not itself the semantic point) of `ActivityFeed.Item` `<li>`s.
 * `ActivityFeed.Avatar`/`ActivityFeed.Icon` are plain leading-column
 * slots, both the same fixed footprint, so a consumer's real, unmodified
 * `Avatar` or `Icon` lines up identically row after row regardless of
 * which one a given activity uses — the slot draws nothing itself and
 * imposes no material of its own. Rows are separated by the real, frozen
 * `Separator` (composed directly, at a quarter of its usual strength —
 * `divider/40`, identical to Table's own body-row fade — never a custom
 * div standing in for it); the last item's trailing Separator is hidden
 * via a structural `:last-child` selector on the root, never a JS index.
 * No GlassSurface, no Card, no shadow, no gradient, no animation, no
 * decorative element ActivityFeed draws itself — it only composes already
 * -frozen primitives and lets CSS spacing do the rest.
 *
 * `compact` (boolean, default false) tightens row padding for a denser
 * feed — a pure spacing change, identical rhythm otherwise. `align`
 * (`start` default · `center`) sets whether the leading Avatar/Icon slot
 * aligns to the top of a (usually multi-line) row or to its vertical
 * center (natural for a single-line row) — pure layout, no business
 * meaning. Both are read from context by `ActivityFeed.Item`, matching
 * Timeline's own `orientation`/`align` context pattern. On a narrow
 * viewport ActivityFeed stays vertical — it has no horizontal mode at all
 * (unlike Timeline), since a feed of variable-length text never reads
 * sideways.
 */

type Align = 'start' | 'center'

const ActivityFeedContext = createContext<{ compact: boolean; align: Align }>({
  compact: false,
  align: 'start',
})

export interface ActivityFeedProps extends React.HTMLAttributes<HTMLUListElement> {
  compact?: boolean
  align?: Align
}

const ActivityFeedRootElement = forwardRef<HTMLUListElement, ActivityFeedProps>(
  function ActivityFeed(
    { className, compact = false, align = 'start', children, ...props },
    ref,
  ) {
    return (
      <ActivityFeedContext.Provider value={{ compact, align }}>
        <ul
          ref={ref}
          className={cn(
            'flex flex-col [&>li:last-child_[data-activity-separator]]:hidden',
            className,
          )}
          {...props}
        >
          {children}
        </ul>
      </ActivityFeedContext.Provider>
    )
  },
)

const ActivityFeedItem = forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(function ActivityFeedItem({ className, children, ...props }, ref) {
  const { compact, align } = useContext(ActivityFeedContext)
  return (
    <li ref={ref} className={cn('flex flex-col', className)} {...props}>
      <div
        className={cn(
          'flex gap-3',
          align === 'center' ? 'items-center' : 'items-start',
          compact ? 'py-2' : 'py-4',
        )}
      >
        {children}
      </div>
      <Separator data-activity-separator className="bg-divider/40" />
    </li>
  )
})

const slotClass = 'flex h-8 w-8 shrink-0 items-center justify-center'

const ActivityFeedAvatar = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function ActivityFeedAvatar({ className, ...props }, ref) {
  return <span ref={ref} className={cn(slotClass, className)} {...props} />
})

const ActivityFeedIcon = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function ActivityFeedIcon({ className, ...props }, ref) {
  return <span ref={ref} className={cn(slotClass, className)} {...props} />
})

const ActivityFeedContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function ActivityFeedContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('flex min-w-0 flex-1 flex-col gap-1', className)}
      {...props}
    />
  )
})

const ActivityFeedTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function ActivityFeedTitle({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={cn('text-body-sm font-medium text-text', className)}
      {...props}
    />
  )
})

const ActivityFeedDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function ActivityFeedDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={cn('text-body-sm text-text-secondary', className)}
      {...props}
    />
  )
})

const ActivityFeedMeta = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function ActivityFeedMeta({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn('text-caption tabular-nums text-text-tertiary', className)}
      {...props}
    />
  )
})

const ActivityFeedActions = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function ActivityFeedActions({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('flex items-center gap-2 pt-1', className)}
      {...props}
    />
  )
})

export const ActivityFeedRoot = Object.assign(ActivityFeedRootElement, {
  Item: ActivityFeedItem,
  Avatar: ActivityFeedAvatar,
  Icon: ActivityFeedIcon,
  Content: ActivityFeedContent,
  Title: ActivityFeedTitle,
  Description: ActivityFeedDescription,
  Meta: ActivityFeedMeta,
  Actions: ActivityFeedActions,
})

export { ActivityFeedRoot as ActivityFeed }
