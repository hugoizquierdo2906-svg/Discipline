import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

/**
 * Grid — a Layout primitive that answers exactly ONE question: "how do I place
 * elements in a TWO-DIMENSIONAL grid — aligned rows AND columns — with
 * consistent spacing?" It is the 2-D counterpart to the frozen Stack: where
 * Stack distributes along a single axis (a flow, whose `wrap` produces ragged
 * rows), Grid lays a real matrix whose column tracks line up across EVERY row —
 * the alignment a gallery, a dashboard of equal cards, or a label/field layout
 * needs and a wrapping flow cannot guarantee. It knows no business, no data, no
 * design, no breakpoint and nothing about its children; it only creates the
 * track structure and spaces the cells.
 *
 * Not Stack / Flex (one axis — a flow, not a matrix; use those when items
 * simply follow one another), not a Container (a max-width, centered
 * page-width wrapper — width, not track structure), not Split / Columns (a
 * fractional, often resizable two-pane layout — Grid's tracks are equal or
 * content-sized, not draggable panes), not Cluster / Inline (a wrapping
 * tag-bag with no column alignment — Stack `wrap` already covers that), not a
 * Card or Section (surfaces with their own material and meaning — Grid draws
 * nothing, no background/border/radius/padding of its own), not a Table or
 * DataGrid (those carry tabular DATA semantics — a caption, header cells, rows,
 * `role="grid"`, sortable columns; Grid is pure VISUAL layout with zero
 * semantics, the thing you reach for when a `<table>` would lie about the
 * content), and not Bootstrap / MUI Grid (a 12-column system driven by
 * per-breakpoint arrays — Grid has NO breakpoint props at all: a responsive
 * column count is either the consumer's own `className` or, breakpoint-free,
 * `minColumnWidth` with CSS `auto-fit`/`auto-fill`). It is a typed, minimal
 * wrapper over native CSS Grid — the primitive that replaces the ad-hoc
 * `<div className="grid grid-cols-3 gap-4">` scattered across the app.
 *
 * Category: Layout. It renders a single `display:grid` element and nothing
 * else — no wrapper, no context, no child manipulation. `columns` (default 2)
 * lays that many EQUAL tracks (`repeat(N, minmax(0, 1fr))` — the `minmax(0,…)`
 * stops a wide child from blowing the track out). `minColumnWidth` (a length
 * the consumer chooses, e.g. `16rem`) OVERRIDES `columns` with a breakpoint-
 * free responsive track list — `repeat(auto-fit, minmax(minColumnWidth, 1fr))`
 * reflows the column count to the available width with no media query, while
 * `fill="fill"` keeps the empty trailing tracks (`auto-fill`) instead of
 * collapsing them (`auto-fit`). `gap` maps a named step to the shared
 * `--ds-space` scale (`xs` 4 · `sm` 8 · `md` 16 · `lg` 24 · `xl` 32, `none` 0)
 * so spacing is chosen from ONE ladder, never a raw pixel. `align`
 * (`align-items`) and `justify` (`justify-items`) place each cell's content
 * within its track. `as` renders a different element (`<ul>`, `<section>`…) so
 * the consumer keeps the correct semantics — Grid never invents them.
 * Deliberately NO `rows` / `flow` / `areas` props (advanced CSS-Grid needs a
 * consumer expresses via `className`, not this 95%-case primitive) and NO
 * responsive / breakpoint props. Composes ONLY layout utilities and one
 * computed `grid-template-columns` — zero colour, zero material, zero motion,
 * zero token beyond the spacing scale.
 *
 * Accessibility: Grid renders in SOURCE order and never reorders the DOM, so
 * DOM order, tab order and screen-reader order always match the markup (it has
 * no `reverse`, by design). The track flow is inline-direction-aware, so under
 * `dir="rtl"` columns run right-to-left natively with no directional code.
 */

type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type GridAlign = 'start' | 'center' | 'end' | 'stretch'

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  /** Number of equal columns. Ignored when `minColumnWidth` is set. Default 2. */
  columns?: number
  /**
   * A length (e.g. `16rem`) for breakpoint-free responsive columns: the grid
   * fits as many `minmax(minColumnWidth, 1fr)` tracks as the width allows.
   * Overrides `columns`.
   */
  minColumnWidth?: string
  /** With `minColumnWidth`: `fit` collapses empty tracks, `fill` keeps them. */
  fill?: 'fit' | 'fill'
  /** Space between cells, from the shared `--ds-space` scale. Default `md` (16). */
  gap?: GridGap
  /** Vertical placement of each cell's content (`align-items`). */
  align?: GridAlign
  /** Horizontal placement of each cell's content (`justify-items`). */
  justify?: GridAlign
  /** Render as a different element (e.g. `<ul>`, `<section>`, `<nav>`). */
  as?: React.ElementType
}

// Fixed column counts are emitted as real Tailwind classes (each is exactly
// `repeat(N, minmax(0, 1fr))`) rather than an inline style, so a consumer's own
// responsive override — `className="sm:grid-cols-3"` — can actually win via
// `cn`/tailwind-merge (an inline style would out-specify it). Counts beyond
// this map, and the `minColumnWidth` auto track list, fall back to inline
// style (no responsive class could express an arbitrary value anyway).
const columnsClass: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
}

const gapClass: Record<GridGap, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-5',
  xl: 'gap-6',
}

const alignClass: Record<GridAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
}

const justifyClass: Record<GridAlign, string> = {
  start: 'justify-items-start',
  center: 'justify-items-center',
  end: 'justify-items-end',
  stretch: 'justify-items-stretch',
}

export const Grid = forwardRef<HTMLElement, GridProps>(function Grid(
  {
    as: As = 'div',
    columns = 2,
    minColumnWidth,
    fill = 'fit',
    gap = 'md',
    align,
    justify,
    className,
    style,
    ...props
  },
  ref,
) {
  // Prefer a real class for fixed columns (overridable by the consumer); fall
  // back to an inline template only for the auto (`minColumnWidth`) case or a
  // column count outside the class map.
  const columnsAsClass = !minColumnWidth ? columnsClass[columns] : undefined
  const inlineColumns = minColumnWidth
    ? `repeat(auto-${fill}, minmax(${minColumnWidth}, 1fr))`
    : columnsAsClass
      ? undefined
      : `repeat(${columns}, minmax(0, 1fr))`

  return (
    <As
      ref={ref}
      className={cn(
        'grid',
        columnsAsClass,
        gapClass[gap],
        align && alignClass[align],
        justify && justifyClass[justify],
        className,
      )}
      style={
        inlineColumns ? { gridTemplateColumns: inlineColumns, ...style } : style
      }
      {...props}
    />
  )
})
