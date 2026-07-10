import { createContext, forwardRef, useContext } from 'react'

import { cn } from '@/lib/cn'

/**
 * Table — a Data Display primitive that answers exactly ONE question: "how
 * do these several objects compare across several properties at once?" It
 * only displays; it holds no business logic and no interaction state of any
 * kind. It does not know pagination, sorting, filtering, editing, resizable
 * columns, drag, selection, virtualization, infinite scroll, loading
 * overlays, column menus or bulk actions — every one of those belongs to a
 * future, separate DataGrid, never to Table.
 *
 * Not DataGrid (Table's own future superset — sort/filter/edit/select/
 * resize/virtualize/paginate; Table is the pure display layer DataGrid will
 * be built ON, and stays exactly that even after DataGrid exists). Not List
 * (a single sequence of items — one property, or one whole object per row,
 * never several ALIGNED properties in named columns; List does not let you
 * compare property N of row A against property N of row B at a glance). Not
 * Card (one object's own full detail, read in isolation — Card does not
 * scale to comparing many objects side by side). Not TreeView (hierarchical
 * containment/nesting, browsed and expanded — not a flat grid of peer rows
 * meant for comparison). Not Timeline (a single chronological axis of past
 * events — one dimension, not a multi-property comparison). Not Chart
 * (a visual/quantitative trend or distribution — approximate reading by eye;
 * Table is for exact, discrete, cell-by-cell facts). Not Accordion
 * (progressive disclosure of sections, one revealed at a time in the page's
 * flow — not simultaneous side-by-side comparison of many rows). Not Tabs
 * (switches which single view is on screen — Table shows every row and
 * every column at once). Not Grid Layout (a pure CSS arrangement mechanism
 * for arbitrary blocks — no semantic meaning that "this row is one record"
 * and "this column is one property," no `<table>`/`<tr>`/`<td>` relationship
 * a screen reader can announce).
 *
 * Category: Data Display (not Navigation, Feedback, Overlay, Layout, Forms
 * or Disclosure). Composes DIRECTLY the native `table`/`thead`/`tbody`/
 * `tfoot`/`tr`/`th`/`td`/`caption` elements — never a `<div>` reimplementing
 * a table's semantics, so every native role (`table`/`rowgroup`/`row`/
 * `columnheader`/`cell`/`caption`) and every native behaviour (browser
 * zoom, text selection, screen-reader table navigation) is inherited for
 * free. The one necessary concession is a plain `overflow-x-auto` wrapper
 * around the `<table>` itself — required because a `<table>` cannot scroll
 * on its own — carrying no border, background or padding of its own. On a
 * narrow viewport the table scrolls horizontally; it never breaks its
 * columns and never reflows into a stack of Cards (a Data Display primitive
 * never makes that layout call for its consumer). Composes ONLY Typography
 * tokens and the `divider` colour token already shared with the frozen
 * Separator — no GlassSurface, no Card, no shadow, no thick gridlines, no
 * "spreadsheet" styling: the header is discreet (`text-body-sm`/
 * `font-medium`/`text-text-secondary`, one hairline rule beneath it — never
 * a heavy grey fill), and each row is separated from the next by the same
 * single hairline, never a full grid of vertical and horizontal rules.
 * `stickyHeader` is PURELY visual (`position: sticky` + a background so
 * scrolling body rows never show through) — it adds no scroll-tracking
 * logic, no shadow-on-scroll effect, nothing beyond that one CSS behaviour.
 * `align` (`start` (default) · `center` · `end`) is a logical, RTL-aware
 * text alignment on `Table.Head`/`Table.Cell` — the correct way to align a
 * numeric column without hard-coding "left"/"right".
 */

const TableContext = createContext<{ stickyHeader: boolean }>({
  stickyHeader: false,
})

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Purely visual: the header row stays pinned while the body scrolls. */
  stickyHeader?: boolean
}

const TableRootElement = forwardRef<HTMLTableElement, TableProps>(
  function Table({ className, stickyHeader = false, children, ...props }, ref) {
    return (
      <TableContext.Provider value={{ stickyHeader }}>
        <div className="w-full overflow-x-auto">
          <table
            ref={ref}
            className={cn('w-full border-collapse text-start', className)}
            {...props}
          >
            {children}
          </table>
        </div>
      </TableContext.Provider>
    )
  },
)

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableHeader({ className, ...props }, ref) {
  const { stickyHeader } = useContext(TableContext)
  return (
    <thead
      ref={ref}
      className={cn(
        '[&_tr]:border-b [&_tr]:border-divider',
        stickyHeader && 'sticky top-0 z-10 bg-bg',
        className,
      )}
      {...props}
    />
  )
})

const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableBody({ className, ...props }, ref) {
  return (
    <tbody
      ref={ref}
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
})

const TableFooter = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableFooter({ className, ...props }, ref) {
  return (
    <tfoot
      ref={ref}
      className={cn(
        'border-t border-divider text-body-sm text-text-secondary',
        className,
      )}
      {...props}
    />
  )
})

const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(function TableRow({ className, ...props }, ref) {
  return (
    <tr
      ref={ref}
      className={cn('border-b border-divider', className)}
      {...props}
    />
  )
})

type Align = 'start' | 'center' | 'end'
const alignClass: Record<Align, string> = {
  start: 'text-start',
  center: 'text-center',
  end: 'text-end',
}

export interface TableHeadProps extends Omit<
  React.ThHTMLAttributes<HTMLTableCellElement>,
  'align'
> {
  align?: Align
}

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  function TableHead({ className, align = 'start', ...props }, ref) {
    return (
      <th
        ref={ref}
        className={cn(
          'px-4 py-3 text-body-sm font-medium text-text-secondary',
          alignClass[align],
          className,
        )}
        {...props}
      />
    )
  },
)

export interface TableCellProps extends Omit<
  React.TdHTMLAttributes<HTMLTableCellElement>,
  'align'
> {
  align?: Align
}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell({ className, align = 'start', ...props }, ref) {
    return (
      <td
        ref={ref}
        className={cn(
          'px-4 py-3 text-body text-text',
          alignClass[align],
          className,
        )}
        {...props}
      />
    )
  },
)

const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(function TableCaption({ className, ...props }, ref) {
  return (
    <caption
      ref={ref}
      className={cn(
        'mb-2 text-start text-body-sm text-text-secondary',
        className,
      )}
      {...props}
    />
  )
})

export const TableRoot = Object.assign(TableRootElement, {
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Caption: TableCaption,
})

export { TableRoot as Table }
