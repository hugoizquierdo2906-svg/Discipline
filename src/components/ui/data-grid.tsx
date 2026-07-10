import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import { Pagination } from './pagination'
import { Table } from './table'

/**
 * DataGrid — a Data Display primitive that answers exactly ONE question:
 * "how do I manipulate a large set of comparable data?" It is what the
 * frozen `Table` becomes once a dataset is large enough to need sorting,
 * row selection, pagination and a toolbar on top of plain comparison — but
 * it stays a UI orchestration surface, never a data engine. It does not
 * know APIs, backends, SQL, server-side search, permissions, business
 * rules, lazy loading, business-level virtualization, import/export,
 * CSV/Excel or GraphQL, and it has no idea what a Client, a Coach or any
 * other DISCIPLINE domain concept is. Sort direction, selected rows and
 * the current page are all CONTROLLED STATE the consumer owns (exactly
 * like the frozen Table, Pagination and Checkbox already work) — DataGrid
 * only renders the affordances (a clickable sortable header, a pagination
 * control, a toolbar slot) and forwards the interaction, never reorders,
 * filters or slices the actual data itself.
 *
 * Not Table (Table answers "how do these objects compare across these
 * properties?" and stops there — no sort, no selection, no pagination, no
 * toolbar; DataGrid is what a consumer reaches for once that dataset gets
 * large enough to need those UI affordances ON TOP of comparison, and
 * DataGrid is built BY COMPOSING Table directly, never duplicating its
 * markup). Not TreeView (a hierarchy of nested items — DataGrid is flat
 * rows × columns, no parent/child relationship). Not Timeline (a
 * chronological axis — DataGrid has no time dimension of its own). Not
 * ActivityFeed (a list of happenings, one anatomy per row — DataGrid rows
 * are arbitrary tabular records with named columns). Not a Spreadsheet /
 * Excel (free-form cell editing, formulas, arbitrary cell references — a
 * DataGrid cell is a fixed, typed, read-only display of one field; no
 * cell is ever directly editable by clicking into it, no formula
 * language, no cell-to-cell reference). Not List (an unstructured
 * sequence with no named columns at all). Not Card (one object's own full
 * detail in isolation — DataGrid is many objects read as comparable
 * rows).
 *
 * Category: Data Display (not Navigation, Feedback, Overlay, Layout,
 * Forms or Disclosure). A compound built by literally composing the
 * frozen `Table` — `DataGrid.Header`/`DataGrid.Body`/`DataGrid.Row`/
 * `DataGrid.Cell`/`DataGrid.Footer` are the exact same `Table.Header`/
 * `Table.Body`/`Table.Row`/`Table.Cell`/`Table.Footer` components,
 * re-exported under the DataGrid namespace rather than duplicated —
 * every native `<table>`/`<thead>`/`<tbody>`/`<tfoot>`/`<tr>`/`<td>`
 * semantic and RTL/responsive behaviour Table already earned is inherited
 * verbatim, at zero cost. `DataGrid.Column` is the one genuinely new
 * piece over `Table.Head`: it adds an OPTIONAL `sortable` affordance (a
 * clickable header with a chevron indicator and `aria-sort`) — pure UI,
 * the actual comparator and re-ordering of rows is the consumer's own
 * responsibility, exactly like `onPageChange` already works on the
 * frozen Pagination. `DataGrid.Empty` is a valid `<tr>`/`<td>` wrapper (a
 * real content row spanning every column) around the frozen `EmptyState`,
 * so "no rows" still renders inside a structurally valid `<tbody>`
 * instead of breaking out of the table. `DataGrid.Pagination` is the
 * real, frozen `Pagination` component itself, composed directly beneath
 * the table — never a second, competing pagination control. `DataGrid`
 * (the root) and `DataGrid.Toolbar` are plain flex layout slots (a column
 * stack, a horizontal row) with no material of their own: the actual
 * `<Table role="grid">` sits between them as its own element, since a
 * toolbar and a pagination control cannot legally live inside a
 * `<table>`. Setting `role="grid"` on the underlying `Table` is the ONLY
 * ARIA Grid wiring DataGrid needs to add by hand: per the HTML-ARIA
 * mapping, a `<td>`'s implicit role already becomes `gridcell` (instead
 * of the default `cell`) the moment its ancestor `<table>` carries
 * `role="grid"`, and `<th>`/`<tr>` already compute to `columnheader`/
 * `row` regardless — every ARIA Grid role DataGrid needs falls out of
 * real HTML semantics, never a hand-authored `role="gridcell"` on every
 * cell. Keyboard navigation (Tab reaches the sortable column buttons and
 * the Pagination's own buttons; Enter/Space activates them) is entirely
 * native, since every interactive surface is a real `<button>` — no
 * custom grid-navigation keyboard model is layered on top (arrow-key
 * cell-to-cell navigation is an editable-spreadsheet concern DataGrid
 * explicitly does not have). No GlassSurface, no heavy grid lines, no
 * Excel look: DataGrid inherits Table's own calm hairline rhythm
 * unchanged and adds nothing decorative of its own.
 */

export const DataGridRoot = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function DataGrid({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-4', className)}
      {...props}
    />
  )
})

const DataGridToolbar = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function DataGridToolbar({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-wrap items-center justify-between gap-3',
        className,
      )}
      {...props}
    />
  )
})

type SortDirection = 'asc' | 'desc'
type Align = 'start' | 'center' | 'end'

export interface DataGridColumnProps extends Omit<
  React.ThHTMLAttributes<HTMLTableCellElement>,
  'align'
> {
  align?: Align
  sortable?: boolean
  sortDirection?: SortDirection
  onSort?: () => void
}

const DataGridColumn = forwardRef<HTMLTableCellElement, DataGridColumnProps>(
  function DataGridColumn(
    { align, sortable, sortDirection, onSort, className, children, ...props },
    ref,
  ) {
    if (!sortable) {
      return (
        <Table.Head ref={ref} align={align} className={className} {...props}>
          {children}
        </Table.Head>
      )
    }

    const ariaSort =
      sortDirection === 'asc'
        ? ('ascending' as const)
        : sortDirection === 'desc'
          ? ('descending' as const)
          : ('none' as const)

    return (
      <Table.Head
        ref={ref}
        align={align}
        aria-sort={ariaSort}
        className={cn('p-0', className)}
        {...props}
      >
        <button
          type="button"
          onClick={onSort}
          className={cn(
            'flex w-full items-center gap-1.5 px-4 py-3 text-start outline-none hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent-accessible',
            align === 'end' && 'flex-row-reverse',
            align === 'center' && 'justify-center',
          )}
        >
          <span className="flex-1">{children}</span>
          {sortDirection === 'asc' ? (
            <ChevronUp
              aria-hidden
              className="h-3.5 w-3.5 shrink-0 text-text-secondary"
            />
          ) : sortDirection === 'desc' ? (
            <ChevronDown
              aria-hidden
              className="h-3.5 w-3.5 shrink-0 text-text-secondary"
            />
          ) : (
            <ChevronsUpDown
              aria-hidden
              className="h-3.5 w-3.5 shrink-0 text-text-tertiary"
            />
          )}
        </button>
      </Table.Head>
    )
  },
)

export interface DataGridEmptyProps extends React.HTMLAttributes<HTMLTableCellElement> {
  colSpan: number
}

const DataGridEmpty = forwardRef<HTMLTableCellElement, DataGridEmptyProps>(
  function DataGridEmpty({ colSpan, className, children, ...props }, ref) {
    return (
      <Table.Row>
        <Table.Cell
          ref={ref}
          colSpan={colSpan}
          className={cn('p-0', className)}
          {...props}
        >
          {children}
        </Table.Cell>
      </Table.Row>
    )
  },
)

export const DataGrid = Object.assign(DataGridRoot, {
  Toolbar: DataGridToolbar,
  Header: Table.Header,
  Body: Table.Body,
  Row: Table.Row,
  Cell: Table.Cell,
  Column: DataGridColumn,
  Footer: Table.Footer,
  Empty: DataGridEmpty,
  Pagination,
})
