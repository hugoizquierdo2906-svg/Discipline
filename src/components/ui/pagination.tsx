'use client'

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import { Icon } from './icon'
import { Spinner } from './spinner'

/**
 * Pagination — DISCIPLINE's control for random-access navigation across a
 * FLAT, ordered collection split into fixed-size pages (e.g. 900 clients,
 * 30 per page → 30 pages). Its one job: jump directly to page 47 of 900
 * without stepping through the 46 before it, while always showing where
 * you are relative to how much there is.
 *
 * Not a List (the paginated CONTENT itself, never the control that moves
 * between its pages), not a DataTable (the content Pagination is composed
 * INTO, not a substitute — a table still needs a page-navigation control
 * at its foot), not Infinite Scroll (a continuous flow with no "page N of
 * M" concept and no random access — you cannot jump to item 4700 without
 * loading everything before it; Pagination trades that continuity for an
 * explicit, numbered position), not a Virtual List (a rendering
 * OPTIMIZATION invisible to the user — still one continuous scroll, never
 * a page boundary), not a Stepper (linear PROGRESS through semantically
 * DIFFERENT steps of one task, usually blocking until the current step is
 * valid — Carbon: "do not use it to display linear journeys, for example,
 * in a form progression"; Pagination's pages are structurally IDENTICAL
 * subdivisions of one collection, freely reachable in any order, nothing
 * to validate), not Tabs (a small, always-visible set of SEMANTICALLY
 * DISTINCT panels, not numbered subdivisions of one data set), not a
 * Segmented Control (frozen, deliberately capped at "2–6 visible options"
 * — Pagination must handle an ARBITRARILY LARGE page count, which is
 * exactly the scale problem Segmented Control refuses by construction),
 * not a Navigation Menu (the app's PRIMARY, semantically distinct
 * destinations, not numbered pages of one collection), not a plain row of
 * Buttons (a row of buttons has no shared `nav` landmark, no
 * `aria-current`, no ordinal relationship, and — critically — no
 * REUSABLE collapse algorithm; every consumer would reinvent the
 * sibling/boundary/ellipsis math and its keyboard/ARIA wiring from
 * scratch, duplicating one responsibility everywhere it is needed).
 *
 * A FLAT, token-only Navigation primitive — the sibling of the frozen
 * Breadcrumb, not a Control Surface member. It carries no Material Role
 * (no GlassSurface, no .ds-micro/.ds-control/.ds-card/.ds-floating/
 * .ds-immersive) and spends no motion budget. This is a deliberate
 * placement, not an accident of convenience: the individual page controls
 * ARE buttons with a controlled value (`page` + `onPageChange`), which
 * superficially resembles Slider/SegmentedControl's own value+onChange
 * shape — but the controlled API is just an ergonomic convention (matching
 * MUI's own Pagination, which is controlled-only, no uncontrolled
 * `defaultPage`), not evidence of shared MATERIAL. The real signal is
 * classification precedent: MUI itself files Pagination under
 * "Navigation" (next to Breadcrumbs, Drawer, Link, Menu, Tabs), never
 * under "Inputs" (Slider, Switch); the WAI-ARIA-recommended markup is
 * `nav` + list + `aria-current` — structurally identical to the frozen
 * Breadcrumb, not to any Control Surface member; and wrapping potentially
 * thousands of page numbers in individual glass pills (as Segmented
 * Control does for its capped 2–6 options) would be visual and
 * performance nonsense at Pagination's scale. Composes only the frozen
 * Icon (chevrons) and the frozen Spinner (`loading` only) — never
 * GlassSurface, never LinkButton.
 *
 * Radix ships no Pagination primitive at all — confirmed via their own
 * open, unresolved feature requests (issues #1856, #886, discussion #831),
 * one of which states plainly that pagination is "tough and quite
 * opinionated." Unlike the frozen Breadcrumb (which offers a data-driven
 * `items` mode AND full manual sub-part composition for bespoke layouts),
 * Pagination is deliberately a SINGLE, self-contained, non-compound
 * component — no exported `.Item`/`.Ellipsis` sub-parts. This is not an
 * oversight: the brief calls for "une API très simple," Pagination's
 * layout is far more uniform across real usages than Breadcrumb's ever
 * is, and shadcn/ui's own compound Pagination API (Root/Content/
 * Ellipsis/Item/Link/Next/Previous) was deliberately NOT the model here.
 *
 * Collapse algorithm mirrors MUI's own published `siblingCount` +
 * `boundaryCount` semantics (both default 1): always show `boundaryCount`
 * pages at each end, always show `siblingCount` pages on each side of the
 * current page, and collapse anything else into a single ellipsis — never
 * for a gap of exactly one page (IBM Carbon: "never place the ellipsis
 * button at the beginning or end of a series"; a lone hidden page is shown
 * directly instead of wasting an ellipsis on it). Unlike Carbon's own
 * ellipsis (an interactive button opening a menu of the hidden pages),
 * DISCIPLINE's ellipsis is purely decorative: Prev/Next already guarantee
 * every page stays reachable (unlike the frozen Breadcrumb, where an
 * ancestor hidden behind its ellipsis has NO other path to it, which is
 * exactly why Breadcrumb's Ellipsis is a real button) — an interactive
 * menu here would compose Floating Surface machinery for a convenience,
 * not a necessity, contradicting "une API très simple."
 *
 * Two independent, layered switches, mirroring Breadcrumb's own
 * `responsive`: `compact` (explicit override — force the "‹ 7 / 24 ›"
 * reading, e.g. for a narrow sidebar widget on a wide viewport) and
 * `responsive` (default on; when `compact` is left unset, renders BOTH
 * markups and lets a `md`-breakpoint CSS rule pick one — no JS
 * measuring, same technique as Breadcrumb's own mobile collapse).
 */

export interface PaginationProps extends Omit<
  React.ComponentPropsWithoutRef<'nav'>,
  'onChange'
> {
  /** Current page, 1-indexed. */
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  disabled?: boolean
  /** Disables interaction and shows a Spinner; state (the page numbers)
   * stays visible while a transition is in flight. */
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  /** Pages always shown on each side of the current page. Default 1. */
  siblingCount?: number
  /** Pages always shown at each end of the range. Default 1. */
  boundaryCount?: number
  showFirst?: boolean
  showLast?: boolean
  showPrev?: boolean
  showNext?: boolean
  /** Forces the compact "‹ page / total ›" reading regardless of viewport.
   * Leave unset to let `responsive` decide automatically. */
  compact?: boolean
  /** Below the `md` breakpoint, renders the compact reading instead of
   * numbered pages (CSS-only, no measuring). Default true; ignored when
   * `compact` is explicitly set. */
  responsive?: boolean
}

type PageEntry = number | 'ellipsis'

function range(start: number, end: number): number[] {
  if (end < start) return []
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

/** MUI's own published sibling/boundary collapse algorithm. */
function getPageRange(
  page: number,
  totalPages: number,
  siblingCount: number,
  boundaryCount: number,
): PageEntry[] {
  const totalPageNumbers = siblingCount * 2 + 3 + boundaryCount * 2
  if (totalPageNumbers >= totalPages) return range(1, totalPages)

  const leftSiblingStart = Math.max(page - siblingCount, boundaryCount + 2)
  const rightSiblingEnd = Math.min(
    page + siblingCount,
    totalPages - boundaryCount - 1,
  )
  const showLeftEllipsis = leftSiblingStart > boundaryCount + 2
  const showRightEllipsis = rightSiblingEnd < totalPages - boundaryCount - 1

  const items: PageEntry[] = [...range(1, boundaryCount)]

  if (showLeftEllipsis) {
    items.push('ellipsis')
  } else {
    items.push(...range(boundaryCount + 1, leftSiblingStart - 1))
  }

  items.push(...range(leftSiblingStart, rightSiblingEnd))

  if (showRightEllipsis) {
    items.push('ellipsis')
  } else {
    items.push(...range(rightSiblingEnd + 1, totalPages - boundaryCount))
  }

  items.push(...range(totalPages - boundaryCount + 1, totalPages))

  return items
}

const sizeButtonClass = {
  sm: 'h-7 min-w-[1.75rem] px-1 text-caption',
  md: 'h-8 min-w-[2rem] px-1.5 text-body-sm',
  lg: 'h-9 min-w-[2.25rem] px-2 text-body',
} as const

const sizeTextClass = {
  sm: 'text-caption',
  md: 'text-body-sm',
  lg: 'text-body',
} as const

const sizeIconSize = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
} as const

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination(
    {
      page,
      totalPages,
      onPageChange,
      disabled = false,
      loading = false,
      size = 'md',
      siblingCount = 1,
      boundaryCount = 1,
      showFirst = false,
      showLast = false,
      showPrev = true,
      showNext = true,
      compact,
      responsive = true,
      className,
      'aria-label': ariaLabel = 'Pagination',
      ...props
    },
    ref,
  ) {
    const inert = disabled || loading
    const atFirst = page <= 1
    const atLast = page >= totalPages

    function goTo(next: number) {
      if (inert) return
      const clamped = Math.min(Math.max(next, 1), totalPages)
      if (clamped !== page) onPageChange(clamped)
    }

    const navButtonClass = cn(
      'inline-flex items-center justify-center rounded-md text-text-secondary outline-none hover:bg-surface-raised hover:text-text disabled:pointer-events-none disabled:opacity-40',
      'focus-visible:ring-2 focus-visible:ring-accent-accessible',
      sizeButtonClass[size],
    )

    const first = (
      <button
        type="button"
        aria-label="First page"
        disabled={atFirst || inert}
        onClick={() => goTo(1)}
        className={navButtonClass}
      >
        <Icon
          icon={ChevronsLeft}
          size={sizeIconSize[size]}
          className="rtl:rotate-180"
        />
      </button>
    )
    const prev = (
      <button
        type="button"
        aria-label="Previous page"
        disabled={atFirst || inert}
        onClick={() => goTo(page - 1)}
        className={navButtonClass}
      >
        <Icon
          icon={ChevronLeft}
          size={sizeIconSize[size]}
          className="rtl:rotate-180"
        />
      </button>
    )
    const next = (
      <button
        type="button"
        aria-label="Next page"
        disabled={atLast || inert}
        onClick={() => goTo(page + 1)}
        className={navButtonClass}
      >
        <Icon
          icon={ChevronRight}
          size={sizeIconSize[size]}
          className="rtl:rotate-180"
        />
      </button>
    )
    const last = (
      <button
        type="button"
        aria-label="Last page"
        disabled={atLast || inert}
        onClick={() => goTo(totalPages)}
        className={navButtonClass}
      >
        <Icon
          icon={ChevronsRight}
          size={sizeIconSize[size]}
          className="rtl:rotate-180"
        />
      </button>
    )

    function renderFull() {
      const items = getPageRange(page, totalPages, siblingCount, boundaryCount)
      return (
        <ul className="flex flex-wrap items-center gap-1">
          {showFirst && <li>{first}</li>}
          {showPrev && <li>{prev}</li>}
          {items.map((item, i) =>
            item === 'ellipsis' ? (
              <li
                key={`ellipsis-${i}`}
                role="presentation"
                aria-hidden="true"
                className={cn(
                  'flex items-center justify-center leading-none text-text-tertiary',
                  sizeButtonClass[size],
                )}
              >
                …
              </li>
            ) : (
              <li key={item}>
                <button
                  type="button"
                  aria-current={item === page ? 'page' : undefined}
                  aria-label={`Page ${item}`}
                  disabled={inert}
                  onClick={() => goTo(item)}
                  className={cn(
                    navButtonClass,
                    item === page &&
                      'bg-accent-subtle font-medium text-accent-accessible hover:bg-accent-subtle',
                  )}
                >
                  {item}
                </button>
              </li>
            ),
          )}
          {showNext && <li>{next}</li>}
          {showLast && <li>{last}</li>}
          {loading && (
            <li aria-hidden="true" className="flex items-center pl-1">
              <Spinner size="sm" label="Loading" />
            </li>
          )}
        </ul>
      )
    }

    function renderCompact() {
      return (
        <div className="flex items-center gap-2">
          {prev}
          <span
            aria-live="polite"
            className={cn(
              'tabular-nums text-text-secondary',
              sizeTextClass[size],
            )}
          >
            {page} / {totalPages}
          </span>
          {next}
          {loading && <Spinner size="sm" label="Loading" />}
        </div>
      )
    }

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn('w-full', className)}
        {...props}
      >
        {compact === true ? (
          renderCompact()
        ) : compact === false || !responsive ? (
          renderFull()
        ) : (
          <>
            <div className="hidden md:block">{renderFull()}</div>
            <div className="md:hidden">{renderCompact()}</div>
          </>
        )}
      </nav>
    )
  },
)

Pagination.displayName = 'Pagination'
