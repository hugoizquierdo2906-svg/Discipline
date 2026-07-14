import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

/**
 * Stack — a Layout primitive that answers exactly ONE question: "how do I
 * distribute a set of elements along a SINGLE axis with consistent spacing?"
 * It is the typed, enforced replacement for the hundreds of
 * `<div className="flex flex-col gap-4">` (and `flex-row`, `items-center`,
 * `justify-between`…) scattered across the app — one primitive, one spacing
 * scale, so vertical rhythm stops being re-decided by hand at every call site.
 * It knows no business, no data, no design, no animation, no breakpoint and
 * nothing about its children; it only lays them on an axis and spaces them.
 *
 * Not Flex (the raw two-axis escape hatch with the full flexbox surface —
 * `flex-basis`, `flex-grow`, per-child alignment, both axes at once; Stack is
 * the opinionated single-axis 95% case, deliberately smaller), not Grid
 * (two-dimensional row × column placement — Stack is one dimension), not a
 * Container (a max-width, centered page-width wrapper — a different concern,
 * width not distribution), not a Spacer (a single gap inserted between two
 * things — Stack distributes N things and owns the whole rhythm), not
 * Split/Columns (a fractional two-pane layout with resize — Stack items keep
 * their intrinsic size), not Cluster/Inline (a wrapping tag-bag — Stack covers
 * that case with `wrap`, it is not a separate component), not a Card or
 * Section (surfaces with their own material, padding and meaning — Stack draws
 * nothing, has no background, border, radius or padding of its own), not a
 * List (a semantic `<ul>`/`<ol>` whose order and item-ness carry meaning —
 * Stack can RENDER AS one via `as` when the consumer wants that semantic, but
 * it never adds list roles or `<li>` wrapping itself), and not bare gap
 * utilities (untyped, unenforced, no single source of truth — the very
 * inconsistency Stack exists to remove).
 *
 * Category: Layout. It renders a single flex element and nothing else — no
 * wrapper, no context, no child manipulation. `direction` (`vertical`
 * default · `horizontal`) is the axis; `gap` maps a named step to the shared
 * `--ds-space` scale (`xs` 4 · `sm` 8 · `md` 16 · `lg` 24 · `xl` 32,
 * `none` 0) so spacing is chosen from ONE ladder, never a raw pixel; `align`
 * is cross-axis (`align-items`), `justify` is main-axis (`justify-content`),
 * `wrap` allows lines to wrap, `reverse` flips the visual order. `as` renders
 * a different element (`<ul>`, `<nav>`, `<section>`, `<ol>`…) so the consumer
 * keeps the correct semantics — Stack never overrides them (Phase 7). It
 * deliberately has NO `divider` prop (a divided stack is the consumer placing
 * the frozen `Separator` between items — inserting it would couple Stack to
 * child manipulation, beyond "distribute along an axis") and NO responsive /
 * breakpoint props (a responsive layout is the consumer's own `className`,
 * e.g. `className="sm:flex-row"`, merged over Stack's base by `cn` — Stack must
 * never know application breakpoints). Composes ONLY layout utilities — zero
 * colour, zero material, zero motion, zero token beyond the spacing scale.
 *
 * Accessibility: Stack renders in SOURCE order, so DOM order, tab order and
 * screen-reader order always match the markup — Stack never reorders the DOM.
 * `reverse` flips only the VISUAL order via `flex-*-reverse` (the DOM is
 * untouched); like any flex reversal it creates a deliberate mismatch between
 * visual and focus order, so it is for presentational sequences only, never to
 * reorder interactive content. `align`/`justify`/`direction` are all
 * flexbox-native and therefore RTL-correct with no directional code (a
 * horizontal Stack's main axis follows `dir` automatically).
 */

type StackDirection = 'vertical' | 'horizontal'
type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type StackJustify = 'start' | 'center' | 'end' | 'between'

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  /** The axis items are laid on. Default `vertical`. */
  direction?: StackDirection
  /** Space between items, from the shared `--ds-space` scale. Default `md` (16). */
  gap?: StackGap
  /** Cross-axis alignment (`align-items`). */
  align?: StackAlign
  /** Main-axis distribution (`justify-content`). */
  justify?: StackJustify
  /** Allow items to wrap onto multiple lines. */
  wrap?: boolean
  /** Reverse the VISUAL order (DOM order is preserved — see the a11y note). */
  reverse?: boolean
  /** Render as a different element (e.g. `<ul>`, `<nav>`, `<section>`). */
  as?: React.ElementType
}

const directionClass: Record<
  StackDirection,
  [normal: string, reversed: string]
> = {
  vertical: ['flex-col', 'flex-col-reverse'],
  horizontal: ['flex-row', 'flex-row-reverse'],
}

const gapClass: Record<StackGap, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-5',
  xl: 'gap-6',
}

const alignClass: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
}

const justifyClass: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
}

export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  {
    as: As = 'div',
    direction = 'vertical',
    gap = 'md',
    align,
    justify,
    wrap = false,
    reverse = false,
    className,
    ...props
  },
  ref,
) {
  return (
    <As
      ref={ref}
      className={cn(
        'flex',
        directionClass[direction][reverse ? 1 : 0],
        gapClass[gap],
        align && alignClass[align],
        justify && justifyClass[justify],
        wrap && 'flex-wrap',
        className,
      )}
      {...props}
    />
  )
})
