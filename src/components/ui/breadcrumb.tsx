'use client'

import { Slot } from '@radix-ui/react-slot'
import { forwardRef, useState } from 'react'

import { cn } from '@/lib/cn'

import { Skeleton } from './skeleton'

/**
 * Breadcrumb — DISCIPLINE's hierarchical position indicator: a trail of
 * ancestors from the app's root down to the current view, answering exactly
 * one question — "where am I?" It is never primary navigation (a menu you
 * explore FROM, not report your place IN), never Tabs (siblings at the SAME
 * level, each owning a content panel), never a Stepper (linear PROGRESS
 * through a task being completed), never Pagination (a flat numbered
 * sequence within one collection), never a Tree View (the whole structure,
 * every branch, persistently), never history/a back button (the ORDER pages
 * were visited, one reversible step — Breadcrumb always reflects the
 * current page's fixed STRUCTURAL position, regardless of how the user
 * arrived there), never a Filesystem Path (a static string — every
 * ancestor here is an independently clickable destination), never a
 * Menubar/Dropdown Menu/Command Palette (commands, not a position report).
 * Forbidden on a flat single-level app, for linear-process progress (use a
 * Stepper), as a replacement for real primary navigation (always secondary),
 * and for browser session history.
 *
 * A FLAT, token-only primitive — it carries no Material Role (no
 * GlassSurface, no .ds-micro/.ds-control/.ds-card/.ds-floating/
 * .ds-immersive) and spends no motion budget (zero transition/animation
 * string in this file). It composes only the frozen Icon (never LinkButton
 * — a Button wearing glass; a crumb is plain inline text, not a button) and
 * the frozen Skeleton (loading placeholders only — its own file owns the
 * pulse, not this one) over plain semantic HTML styled with Text-level
 * tokens. The WAI-ARIA Breadcrumb pattern in full: a `nav` landmark labeled
 * "Breadcrumb", an ordered list of links, `aria-current="page"` on the
 * current (never a link) item, and a purely decorative separator kept out
 * of the accessibility tree (`role="presentation"` + `aria-hidden`). No
 * roving-tabindex/arrow-key model is needed — the APG breadcrumb pattern is
 * a plain link list, not a composite widget, so native Tab order is the
 * complete keyboard model.
 *
 * Two composition modes, mirroring the frozen Select: a data-driven `items`
 * array (auto-renders List/Item/Link/Page/Separator, with a `maxItems`
 * collapse that preserves the first crumb + a trailing run and reveals the
 * rest on demand) or full manual composition via the exported sub-parts
 * (Root/List/Item/Link/Page/Separator/Ellipsis) for bespoke layouts. Both
 * paths render the SAME exported parts — the data-driven mode is a
 * convenience layer, never a parallel implementation.
 */

export interface BreadcrumbItemData {
  label: React.ReactNode
  href?: string
  icon?: React.ReactNode
  /** Marks this crumb as the current page (rendered as text, never a link). */
  current?: boolean
  disabled?: boolean
}

export interface BreadcrumbProps extends Omit<
  React.ComponentPropsWithoutRef<'nav'>,
  'children'
> {
  /** Data-driven trail. Omit to compose the sub-parts manually via `children`. */
  items?: BreadcrumbItemData[]
  children?: React.ReactNode
  /** Overrides the default "/" separator (a string, icon, or node). */
  separator?: React.ReactNode
  /**
   * Once the trail exceeds this many crumbs, collapses to first + a
   * trailing run. Defaults to 4 (Adobe Spectrum's own default visible-crumb
   * count) so a long hierarchy never grows into an unbounded, multi-line
   * paragraph by accident — pass a higher number, or `collapse={false}`,
   * to opt out.
   */
  maxItems?: number
  /** Disables the `maxItems` collapse (falls back to wrapping). Default true. */
  collapse?: boolean
  /** Overrides the default ellipsis glyph. */
  ellipsis?: React.ReactNode
  /** Prepends a Home crumb. */
  showHome?: boolean
  home?: { label?: React.ReactNode; href?: string; icon?: React.ReactNode }
  /** Replaces the trail with placeholder Skeleton pills. */
  loading?: boolean
  loadingItems?: number
  /** Collapses middle crumbs below the `md` breakpoint (CSS-only, no measuring). */
  responsive?: boolean
  /** Truncates long labels with an ellipsis + native title tooltip. Default true. */
  truncate?: boolean
}

export type BreadcrumbListProps = React.OlHTMLAttributes<HTMLOListElement>

/**
 * Breadcrumb.List — the `ol` that holds the trail. Reads as ONE phrase, not
 * separate blocks: a tight, explicit `gap-x-1` between crumb/separator
 * pairs (never left to an ambiguous default). Text steps up to `body`
 * (16px) below the `md` breakpoint for mobile legibility, settling to the
 * quieter `body-sm` (14px) from `md` up — the same reference size Text/
 * Label use, never an invented literal.
 */
const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  function BreadcrumbList({ className, ...props }, ref) {
    return (
      <ol
        ref={ref}
        className={cn(
          'flex flex-wrap items-center gap-x-1 gap-y-1.5 text-body md:text-body-sm',
          className,
        )}
        {...props}
      />
    )
  },
)

export type BreadcrumbItemProps = React.LiHTMLAttributes<HTMLLIElement>

/** Breadcrumb.Item — a single `li` slot; holds one Link, Page or Ellipsis. */
const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ className, ...props }, ref) {
    return (
      <li
        ref={ref}
        className={cn('inline-flex items-center gap-1', className)}
        {...props}
      />
    )
  },
)

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Render as the child element (e.g. a Next.js `<Link>`). */
  asChild?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  truncate?: boolean
}

/**
 * Breadcrumb.Link — an ancestor crumb. Plain inline text with an underline-
 * free hover/focus tint — never GlassSurface, never a Button. Renders inert
 * (a `span`, `aria-disabled`) when `disabled` or missing an `href`, since an
 * anchor with no destination is not a real link.
 */
const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  function BreadcrumbLink(
    {
      asChild = false,
      disabled = false,
      icon,
      truncate = true,
      className,
      href,
      children,
      title,
      ...props
    },
    ref,
  ) {
    const inert = disabled || !href
    const labelClass = cn(
      'min-w-0',
      truncate && 'max-w-[10rem] truncate sm:max-w-[16rem]',
    )

    if (inert) {
      return (
        <span
          aria-disabled="true"
          className={cn(
            'inline-flex max-w-full items-center gap-1 text-text-tertiary',
            className,
          )}
        >
          {icon}
          <span className={labelClass}>{children}</span>
        </span>
      )
    }

    const Comp = asChild ? Slot : 'a'
    return (
      <Comp
        ref={ref}
        href={href}
        title={title ?? (typeof children === 'string' ? children : undefined)}
        className={cn(
          'inline-flex max-w-full items-center gap-1 rounded-sm text-text-secondary outline-none hover:text-text',
          'focus-visible:ring-2 focus-visible:ring-accent-accessible',
          className,
        )}
        {...props}
      >
        {icon}
        <span className={labelClass}>{children}</span>
      </Comp>
    )
  },
)

export interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon?: React.ReactNode
  truncate?: boolean
}

/**
 * Breadcrumb.Page — the current location. Text only, never a link
 * (`aria-current="page"`, no `href`, no interaction) — the one invariant
 * every source studied agrees on.
 */
const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  function BreadcrumbPage(
    { icon, truncate = true, className, children, title, ...props },
    ref,
  ) {
    return (
      <span
        ref={ref}
        aria-current="page"
        title={title ?? (typeof children === 'string' ? children : undefined)}
        className={cn(
          'inline-flex max-w-full items-center gap-1 font-medium text-text',
          className,
        )}
        {...props}
      >
        {icon}
        <span
          className={cn(
            'min-w-0',
            truncate && 'max-w-[10rem] truncate sm:max-w-[16rem]',
          )}
        >
          {children}
        </span>
      </span>
    )
  },
)

export type BreadcrumbSeparatorProps = React.LiHTMLAttributes<HTMLLIElement>

/**
 * Breadcrumb.Separator — purely decorative. `role="presentation"` +
 * `aria-hidden` keep it out of the accessibility tree entirely (the APG's
 * own stated goal), so it is never announced and never counted as a crumb.
 * Defaults to "/" (the WAI-ARIA APG's own reference glyph); pass any
 * string, icon or node to override. `text-text-secondary` (not the fainter
 * `-tertiary`) and `leading-none` keep the glyph legible enough for the eye
 * to reconstruct the hierarchy at a glance, without its line-box adding
 * false vertical space around it.
 */
const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
  function BreadcrumbSeparator({ className, children, ...props }, ref) {
    return (
      <li
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cn(
          'flex items-center leading-none text-text-secondary',
          className,
        )}
        {...props}
      >
        {children ?? '/'}
      </li>
    )
  },
)

export interface BreadcrumbEllipsisProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
}

/**
 * Breadcrumb.Ellipsis — the collapsed-run marker. A real, focusable button
 * (not a static glyph) so the hidden crumbs are never permanently
 * unreachable; the data-driven `items` mode wires it to reveal the full
 * trail in place — plain list state, no floating layer, no new material.
 * Defaults to the real Unicode ellipsis ("…", one character) rather than
 * three periods or an icon — content-width, not a fixed square, so it never
 * adds more surrounding space than the separators around it.
 */
const BreadcrumbEllipsis = forwardRef<
  HTMLButtonElement,
  BreadcrumbEllipsisProps
>(function BreadcrumbEllipsis(
  { label = 'Show hidden pages', className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={cn(
        'inline-flex items-center rounded-sm px-1 leading-none text-text-secondary outline-none hover:text-text',
        'focus-visible:ring-2 focus-visible:ring-accent-accessible',
        className,
      )}
      {...props}
    >
      {children ?? '…'}
    </button>
  )
})

const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb(
    {
      items,
      children,
      separator,
      maxItems = 4,
      collapse = true,
      ellipsis,
      showHome = false,
      home,
      loading = false,
      loadingItems = 3,
      responsive = true,
      truncate = true,
      className,
      'aria-label': ariaLabel = 'Breadcrumb',
      ...props
    },
    ref,
  ) {
    const [expanded, setExpanded] = useState(false)

    if (loading) {
      return (
        <nav
          ref={ref}
          aria-label={ariaLabel}
          className={cn('w-full', className)}
          {...props}
        >
          <BreadcrumbList>
            {Array.from({ length: loadingItems }).flatMap((_, i) => [
              <BreadcrumbItem key={`item-${i}`}>
                <Skeleton shape="text" className="h-4 w-16" />
              </BreadcrumbItem>,
              i < loadingItems - 1 && (
                <BreadcrumbSeparator key={`sep-${i}`}>
                  {separator}
                </BreadcrumbSeparator>
              ),
            ])}
          </BreadcrumbList>
        </nav>
      )
    }

    if (!items) {
      return (
        <nav
          ref={ref}
          aria-label={ariaLabel}
          className={cn('w-full', className)}
          {...props}
        >
          {children}
        </nav>
      )
    }

    const resolved: BreadcrumbItemData[] = showHome
      ? [
          {
            label: home?.label ?? 'Home',
            href: home?.href ?? '/',
            icon: home?.icon,
          },
          ...items,
        ]
      : items

    const willCollapse =
      collapse &&
      typeof maxItems === 'number' &&
      maxItems > 0 &&
      resolved.length > maxItems &&
      !expanded

    const tailCount = Math.max((maxItems ?? 0) - 1, 1)
    // `willCollapse` guarantees `resolved.length > maxItems > 0`, so index 0
    // always exists — the assertion is locally provable, not a type escape.
    const visible: Array<BreadcrumbItemData | 'ellipsis'> = willCollapse
      ? [resolved[0]!, 'ellipsis', ...resolved.slice(-tailCount)]
      : resolved

    const hiddenCount = willCollapse ? resolved.length - tailCount - 1 : 0

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn('w-full', className)}
        {...props}
      >
        <BreadcrumbList>
          {visible.flatMap((entry, i) => {
            const isLast = i === visible.length - 1
            const isFirst = i === 0
            const isMiddle = !isFirst && !isLast
            const nodes: React.ReactNode[] = []

            nodes.push(
              <BreadcrumbItem
                key={`item-${i}`}
                className={cn(
                  responsive && isMiddle && !willCollapse && 'max-md:hidden',
                )}
              >
                {entry === 'ellipsis' ? (
                  <BreadcrumbEllipsis
                    label={`Show ${hiddenCount} hidden ${hiddenCount === 1 ? 'page' : 'pages'}`}
                    onClick={() => setExpanded(true)}
                  >
                    {ellipsis}
                  </BreadcrumbEllipsis>
                ) : entry.current || isLast ? (
                  <BreadcrumbPage icon={entry.icon} truncate={truncate}>
                    {entry.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={entry.href}
                    disabled={entry.disabled}
                    icon={entry.icon}
                    truncate={truncate}
                  >
                    {entry.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>,
            )

            if (!isLast) {
              nodes.push(
                <BreadcrumbSeparator
                  key={`sep-${i}`}
                  className={cn(
                    responsive && isMiddle && !willCollapse && 'max-md:hidden',
                  )}
                >
                  {separator}
                </BreadcrumbSeparator>,
              )
            }

            if (responsive && isFirst && !willCollapse && visible.length > 2) {
              nodes.push(
                <li
                  key="responsive-ellipsis"
                  role="presentation"
                  aria-hidden="true"
                  data-slot="responsive-ellipsis"
                  className="hidden items-center gap-1 leading-none text-text-secondary max-md:flex"
                >
                  {ellipsis ?? '…'}
                  <span>/</span>
                </li>,
              )
            }

            return nodes
          })}
        </BreadcrumbList>
      </nav>
    )
  },
)

BreadcrumbRoot.displayName = 'Breadcrumb'
BreadcrumbList.displayName = 'Breadcrumb.List'
BreadcrumbItem.displayName = 'Breadcrumb.Item'
BreadcrumbLink.displayName = 'Breadcrumb.Link'
BreadcrumbPage.displayName = 'Breadcrumb.Page'
BreadcrumbSeparator.displayName = 'Breadcrumb.Separator'
BreadcrumbEllipsis.displayName = 'Breadcrumb.Ellipsis'

/** Re-exported so every sub-part is reachable both ways: `Breadcrumb.List`
 * (compound) and `BreadcrumbList` (standalone named import). */
export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator,
  Ellipsis: BreadcrumbEllipsis,
})

export {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
