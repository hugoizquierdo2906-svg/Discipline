import { createContext, forwardRef, useContext } from 'react'

import { cn } from '@/lib/cn'

/**
 * Timeline — a Data Display primitive that answers exactly ONE question:
 * "in what order did these events happen?" It only displays a chronological
 * record; it holds no business logic and no interaction state of any kind.
 * It does not know likes, comments, notifications, pagination,
 * virtualization, real-time updates, filtering, grouping or sorting — every
 * one of those belongs to a future, separate ActivityFeed, never to
 * Timeline.
 *
 * Not ActivityFeed (Timeline's own future superset — real-time, social,
 * paginated, filterable; Timeline is the pure chronological display layer
 * ActivityFeed will be built ON, and stays exactly that even after
 * ActivityFeed exists). Not Stepper (a small, FIXED, forward-looking set of
 * steps for ONE task happening now, with a completed/current/pending STATE
 * MACHINE — Timeline has no "current" step and no notion of progress
 * through a task; it is a read-only, often unbounded record of the PAST).
 * Not Progress (a single continuous 0–100% quantity of ONE operation, no
 * discrete named events at all). Not Table (compares several objects across
 * several ALIGNED properties at once — Timeline has exactly one axis, time,
 * and no cross-row property comparison). Not List (an unordered or
 * arbitrarily-ordered sequence of independent items — Timeline's order is
 * never arbitrary, it IS the point: chronology is the only axis). Not Card
 * (one object's own full detail read in isolation — Timeline is many
 * events read as a sequence, never one object's whole state). Not TreeView
 * (hierarchical containment/nesting browsed and expanded — Timeline is
 * flat, one event after another, never nested). Not Calendar (a spatial
 * GRID of fixed time slots you can jump around in and schedule INTO —
 * Timeline is a linear, read-only record of what already happened, no
 * grid, no scheduling). Not Chart (an aggregated visual/quantitative trend
 * — Timeline shows discrete, individually-legible events, never an
 * aggregate curve). Not Accordion (progressive disclosure of independent
 * content sections, no chronological axis at all).
 *
 * Category: Data Display (not Navigation, Feedback, Overlay, Layout, Forms
 * or Disclosure). A real compound (`Timeline`/`Timeline.Item`/
 * `Timeline.Separator`/`Timeline.Dot`/`Timeline.Content`/`Timeline.Title`/
 * `Timeline.Description`/`Timeline.Time`) — the same shape as MUI's own
 * Timeline (Item/Separator/Dot/Content), the closest official precedent for
 * this exact primitive. `Timeline` renders a real `<ol>` (order is
 * semantic, not decorative) of `Timeline.Item` `<li>`s. Composes ONLY
 * Typography tokens and the `divider`/`border` colour tokens already shared
 * with the frozen Separator/Stepper — no GlassSurface, no Card, no shadow,
 * no gradient, no animation: the connecting line is a plain 1px `divider`
 * rule at a QUARTER of its usual strength (`divider/40`, the same fade the
 * frozen Table applies to its own body-row hairlines) — present enough to
 * guide the eye down the events, faint enough to never compete with them.
 * `Timeline.Dot` is a small, thin-ringed circle (`border-border`, a single
 * hairline weight) that punches through the line via a `bg-bg` fill,
 * growing only enough to fit an optional icon child (`has-[>*]`, zero
 * extra prop) — a plain event stays a quiet 8px mark, never the visual
 * center of the row.
 * The line between two events is owned by the EARLIER event's own
 * `Timeline.Separator` and only ever drawn AFTER its Dot, down toward the
 * next one — the last item's trailing line is hidden via a structural
 * `:last-child` selector on the root, never a JS index. `Timeline.Time`
 * uses `tabular-nums` (the same convention Table's numeric cells use) so a
 * column of timestamps stays in vertical register.
 *
 * `orientation` (`vertical` default · `horizontal`) is a pure axis switch —
 * the line runs top-to-bottom or left-to-right, nothing else changes.
 * `align` (`start` default · `end`) places `Timeline.Content` before or
 * after the axis column — for `vertical`, `start` reads axis-then-content
 * (natural reading order), `end` mirrors it; for `horizontal`, `start`
 * reads axis-then-content top-to-bottom, `end` mirrors it. Both are pure
 * layout, RTL-aware (logical `flex-row`/`row-reverse`, never hard-coded
 * left/right), no business meaning. On a narrow viewport a horizontal
 * Timeline is the CONSUMER's choice to keep or not — Timeline itself makes
 * no responsive decision, matching Invariant A1 (a Data Display primitive
 * never decides layout for its consumer); DISCIPLINE's own product usage
 * is documented (not enforced) to stay vertical on mobile.
 */

type Orientation = 'vertical' | 'horizontal'
type Align = 'start' | 'end'

const TimelineContext = createContext<{
  orientation: Orientation
  align: Align
}>({ orientation: 'vertical', align: 'start' })

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  orientation?: Orientation
  align?: Align
}

const TimelineRootElement = forwardRef<HTMLOListElement, TimelineProps>(
  function Timeline(
    {
      className,
      orientation = 'vertical',
      align = 'start',
      children,
      ...props
    },
    ref,
  ) {
    return (
      <TimelineContext.Provider value={{ orientation, align }}>
        <ol
          ref={ref}
          className={cn(
            orientation === 'vertical'
              ? 'flex flex-col [&>li:last-child_[data-timeline-line]]:invisible'
              : 'flex flex-row [&>li:last-child_[data-timeline-line]]:invisible',
            className,
          )}
          {...props}
        >
          {children}
        </ol>
      </TimelineContext.Provider>
    )
  },
)

const TimelineItem = forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(function TimelineItem({ className, ...props }, ref) {
  const { orientation, align } = useContext(TimelineContext)
  return (
    <li
      ref={ref}
      className={cn(
        orientation === 'vertical' ? 'flex' : 'flex flex-1 flex-col',
        align === 'end' &&
          (orientation === 'vertical'
            ? 'flex-row-reverse'
            : 'flex-col-reverse'),
        className,
      )}
      {...props}
    />
  )
})

const TimelineSeparator = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function TimelineSeparator({ className, children, ...props }, ref) {
  const { orientation } = useContext(TimelineContext)
  return (
    <span
      ref={ref}
      className={cn(
        'flex shrink-0 items-center',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        className,
      )}
      {...props}
    >
      {children}
      <span
        data-timeline-line
        aria-hidden="true"
        className={cn(
          'bg-divider/40',
          orientation === 'vertical'
            ? 'w-px min-h-6 flex-1'
            : 'h-px min-w-6 flex-1',
        )}
      />
    </span>
  )
})

const TimelineDot = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function TimelineDot({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn(
        'relative z-[1] grid h-2 w-2 shrink-0 place-items-center rounded-full border border-border bg-bg text-text-secondary',
        'has-[>*]:h-6 has-[>*]:w-6 has-[>*]:border-0 has-[>*]:bg-accent-subtle has-[>*]:text-accent-accessible [&>svg]:h-3.5 [&>svg]:w-3.5',
        className,
      )}
      {...props}
    />
  )
})

const TimelineContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function TimelineContent({ className, ...props }, ref) {
  const { orientation } = useContext(TimelineContext)
  return (
    <div
      ref={ref}
      className={cn(
        'flex min-w-0 flex-1 flex-col gap-1',
        orientation === 'vertical' ? 'px-4 pb-6' : 'px-0 py-4',
        className,
      )}
      {...props}
    />
  )
})

const TimelineTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function TimelineTitle({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={cn('text-body-sm font-medium text-text', className)}
      {...props}
    />
  )
})

const TimelineDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function TimelineDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={cn('text-body-sm text-text-secondary', className)}
      {...props}
    />
  )
})

const TimelineTime = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function TimelineTime({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn('text-caption tabular-nums text-text-tertiary', className)}
      {...props}
    />
  )
})

export const TimelineRoot = Object.assign(TimelineRootElement, {
  Item: TimelineItem,
  Separator: TimelineSeparator,
  Dot: TimelineDot,
  Content: TimelineContent,
  Title: TimelineTitle,
  Description: TimelineDescription,
  Time: TimelineTime,
})

export { TimelineRoot as Timeline }
