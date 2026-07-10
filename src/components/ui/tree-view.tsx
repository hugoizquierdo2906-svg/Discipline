import { ChevronRight } from 'lucide-react'
import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useRef,
} from 'react'

import { cn } from '@/lib/cn'

import { Collapsible } from './collapsible'

/**
 * TreeView — a Data Display primitive that answers exactly ONE question:
 * "what is the hierarchical structure of these items?" It only displays a
 * hierarchy; it holds no business logic and no data model of its own. It
 * does not know routing, filesystem, permissions, lazy loading, remote
 * data, drag & drop, checkboxes, multi-selection, editing, renaming,
 * context menus, search, filter or virtualization — every one of those
 * belongs to a future, separate File Explorer / business screen, never to
 * TreeView.
 *
 * Not List (a flat sequence, no parent/child relationship at all —
 * TreeView's entire point is nesting). Not Table (compares ALIGNED
 * properties across peer rows — TreeView has no columns, only
 * containment). Not Accordion (a flat group of independent, mutually
 * exclusive-or-not SECTIONS at one single level, answering "what
 * additional content can I reveal?" — TreeView answers a structural
 * question, "how does this item relate to its parent/children?", and
 * nests to arbitrary depth, which Accordion never does). Not Collapsible
 * (the atom TreeView is built FROM — one region, one open/closed state,
 * no data model, no hierarchy, no siblings; TreeView is many Collapsibles
 * composed into a hierarchy with levels, positions and keyboard roving
 * focus). Not Navigation Menu / Sidebar (destinations to navigate TO —
 * clicking leads elsewhere; TreeView reveals structure IN PLACE, nothing
 * navigates). Not Tabs (switches which single view is on screen — no
 * containment concept at all). Not Timeline (a chronological axis of past
 * events — no hierarchy). Not ActivityFeed (a flat list of recent
 * happenings — no parent/child relationship). Not a File Explorer (a
 * business SCREEN composing a tree-shaped display ON TOP of routing,
 * lazy-loaded async nodes, drag & drop, rename, context menus and a real
 * filesystem/API — TreeView is the pure structural display layer such an
 * Explorer would be built on, and stays exactly that even after an
 * Explorer exists).
 *
 * Category: Data Display (not Navigation, Feedback, Overlay, Layout,
 * Forms or Disclosure). A real compound (`TreeView`/`TreeView.Item`/
 * `TreeView.Trigger`/`TreeView.Content`/`TreeView.Icon`/`TreeView.Label`)
 * built NATURALLY on top of the frozen `Collapsible` — every expand/
 * collapse state machine (open/defaultOpen/onOpenChange/disabled, ARIA
 * `aria-expanded`/`aria-controls`, Enter/Space activation) is Collapsible's
 * own, composed via `asChild` to reshape its trigger into a tree row
 * (leading chevron, optional icon, label, depth indentation) rather than
 * Collapsible's own FAQ-row shape — the open/close mechanism itself is
 * never reimplemented. `TreeView.Item` with no `TreeView.Content` child is
 * a LEAF: no Collapsible, no chevron (an invisible same-width spacer keeps
 * every label in the same column regardless of depth), no `aria-expanded`
 * — exactly what the WAI-ARIA Tree View pattern requires for a childless
 * treeitem. Depth is read from context and expressed ONLY as indentation
 * (`calc(var(--ds-space-4) * (level - 1) + var(--ds-space-2))`, a plain
 * token-driven inline calc, not a hardcoded pixel value) and `aria-level`
 * — never a rendered vertical guide line, never a box, a Card or a grey
 * fill. Full WAI-ARIA Tree View pattern: the root is `role="tree"`; every
 * row is `role="treeitem"` carrying `aria-level`/`aria-setsize`/
 * `aria-posinset` (computed structurally from sibling position, never a
 * prop a consumer sets); every `TreeView.Content` is `role="group"`.
 * Keyboard follows the APG model exactly, hand-rolled at the root via one
 * delegated `keydown` handler and literal `.focus()` calls (an
 * unavoidable exception, same precedent as the frozen MultiSelect/
 * TimePicker/DateRangePicker's own hand-rolled roving reachability, since
 * no bundled tree keyboard model exists to compose): ArrowDown/ArrowUp
 * move a single roving `tabIndex` across every currently rendered
 * treeitem (Radix's own Collapsible.Content UNMOUNTS a closed branch
 * entirely, so "every rendered treeitem" already IS "every visible
 * treeitem" — no extra visibility bookkeeping needed); Home/End jump to
 * the first/last treeitem; ArrowRight opens a closed branch or moves into
 * its first child if already open; ArrowLeft closes an open branch or
 * moves to its parent if already closed or a leaf; Enter/Space need no
 * handler at all, since every row is a real `<button>` and the browser
 * fires a native click on Enter/Space by itself. Composes ONLY
 * Typography tokens and the frozen Collapsible — no GlassSurface, no
 * Card, no shadow, no gradient, no decorative line, no box around a node,
 * ever.
 */

const TreeViewLevelContext = createContext(1)

interface ItemContextValue {
  level: number
  posinset: number | undefined
  setsize: number | undefined
  expandable: boolean
  disabled: boolean
}

const ItemContext = createContext<ItemContextValue>({
  level: 1,
  posinset: undefined,
  setsize: undefined,
  expandable: false,
  disabled: false,
})

interface InternalPositionProps {
  _posinset?: number
  _setsize?: number
}

function withPosition(children: React.ReactNode): React.ReactNode {
  const items = Children.toArray(children).filter(isValidElement)
  const setsize = items.length
  return items.map((child, index) =>
    child.type === TreeViewItem
      ? cloneElement(child as React.ReactElement<InternalPositionProps>, {
          _posinset: index + 1,
          _setsize: setsize,
        })
      : child,
  )
}

function focusTreeItem(
  root: HTMLElement,
  current: HTMLElement,
  next: HTMLElement | null,
) {
  if (!next) return
  root.querySelectorAll<HTMLElement>('[role="treeitem"]').forEach((item) => {
    item.tabIndex = -1
  })
  next.tabIndex = 0
  next.focus()
  void current
}

export type TreeViewProps = React.HTMLAttributes<HTMLUListElement>

const TreeViewRootElement = forwardRef<HTMLUListElement, TreeViewProps>(
  function TreeView({ className, children, onKeyDown, ...props }, ref) {
    const containerRef = useRef<HTMLUListElement | null>(null)

    useEffect(() => {
      const root = containerRef.current
      if (!root) return
      const first = root.querySelector<HTMLElement>('[role="treeitem"]')
      if (first && !root.querySelector('[role="treeitem"][tabindex="0"]')) {
        first.tabIndex = 0
      }
    }, [])

    function handleKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
      onKeyDown?.(event)
      if (event.defaultPrevented) return
      const root = containerRef.current
      if (!root) return
      const current = (event.target as HTMLElement).closest<HTMLElement>(
        '[role="treeitem"]',
      )
      if (!current || !root.contains(current)) return

      const items = Array.from(
        root.querySelectorAll<HTMLElement>('[role="treeitem"]'),
      )
      const index = items.indexOf(current)

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          focusTreeItem(root, current, items[index + 1] ?? null)
          break
        case 'ArrowUp':
          event.preventDefault()
          focusTreeItem(root, current, items[index - 1] ?? null)
          break
        case 'Home':
          event.preventDefault()
          focusTreeItem(root, current, items[0] ?? null)
          break
        case 'End':
          event.preventDefault()
          focusTreeItem(root, current, items[items.length - 1] ?? null)
          break
        case 'ArrowRight': {
          const expanded = current.getAttribute('aria-expanded')
          if (expanded === 'false') {
            event.preventDefault()
            current.click()
          } else if (expanded === 'true') {
            event.preventDefault()
            const group = current
              .closest('li')
              ?.querySelector<HTMLElement>('[role="group"]')
            const firstChild =
              group?.querySelector<HTMLElement>('[role="treeitem"]') ?? null
            focusTreeItem(root, current, firstChild)
          }
          break
        }
        case 'ArrowLeft': {
          const expanded = current.getAttribute('aria-expanded')
          if (expanded === 'true') {
            event.preventDefault()
            current.click()
          } else {
            event.preventDefault()
            const currentLi = current.closest('li')
            const parentLi = currentLi?.parentElement?.closest('li')
            const parentItem =
              parentLi?.querySelector<HTMLElement>('[role="treeitem"]') ?? null
            focusTreeItem(root, current, parentItem)
          }
          break
        }
        default:
          break
      }
    }

    return (
      <TreeViewLevelContext.Provider value={1}>
        <ul
          ref={(node) => {
            containerRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          role="tree"
          className={cn('flex flex-col', className)}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {withPosition(children)}
        </ul>
      </TreeViewLevelContext.Provider>
    )
  },
)

export interface TreeViewItemProps extends React.HTMLAttributes<HTMLLIElement> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
}

const TreeViewItem = forwardRef<
  HTMLLIElement,
  TreeViewItemProps & InternalPositionProps
>(function TreeViewItem(
  {
    className,
    children,
    defaultOpen,
    open,
    onOpenChange,
    disabled,
    _posinset,
    _setsize,
    ...props
  },
  ref,
) {
  const level = useContext(TreeViewLevelContext)
  const expandable = Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === TreeViewContent,
  )

  const value: ItemContextValue = {
    level,
    posinset: _posinset,
    setsize: _setsize,
    expandable,
    disabled: Boolean(disabled),
  }

  return (
    <li ref={ref} className={cn('list-none', className)} {...props}>
      <ItemContext.Provider value={value}>
        {expandable ? (
          <Collapsible
            open={open}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
            disabled={disabled}
          >
            {children}
          </Collapsible>
        ) : (
          children
        )}
      </ItemContext.Provider>
    </li>
  )
})

const rowClass =
  'group flex w-full items-center gap-2 rounded-sm py-1.5 text-start text-body-sm text-text outline-none hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent-accessible disabled:cursor-not-allowed disabled:opacity-40'

const TreeViewTrigger = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function TreeViewTrigger({ className, children, style, ...props }, ref) {
  const { level, posinset, setsize, expandable, disabled } =
    useContext(ItemContext)
  const indent: React.CSSProperties = {
    paddingInlineStart: `calc(var(--ds-space-4) * ${level - 1} + var(--ds-space-2))`,
    ...style,
  }
  const a11y = {
    role: 'treeitem' as const,
    'aria-level': level,
    'aria-setsize': setsize,
    'aria-posinset': posinset,
    tabIndex: -1,
  }

  if (expandable) {
    return (
      <Collapsible.Trigger asChild disabled={disabled}>
        <button
          ref={ref}
          type="button"
          className={cn(rowClass, className)}
          style={indent}
          disabled={disabled}
          {...a11y}
          {...props}
        >
          <ChevronRight
            aria-hidden
            className="h-3.5 w-3.5 shrink-0 text-text-tertiary transition-transform duration-fast ease-standard group-data-[state=open]:rotate-90"
          />
          {children}
        </button>
      </Collapsible.Trigger>
    )
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn(rowClass, className)}
      style={indent}
      disabled={disabled}
      {...a11y}
      {...props}
    >
      <span aria-hidden className="h-3.5 w-3.5 shrink-0" />
      {children}
    </button>
  )
})

export type TreeViewContentProps = React.HTMLAttributes<HTMLUListElement>

const TreeViewContent = forwardRef<HTMLUListElement, TreeViewContentProps>(
  function TreeViewContent({ className, children, ...props }, ref) {
    const level = useContext(TreeViewLevelContext)
    return (
      <Collapsible.Content className="px-0 pb-0">
        <TreeViewLevelContext.Provider value={level + 1}>
          <ul
            ref={ref}
            role="group"
            className={cn('flex flex-col', className)}
            {...props}
          >
            {withPosition(children)}
          </ul>
        </TreeViewLevelContext.Provider>
      </Collapsible.Content>
    )
  },
)

const TreeViewIcon = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function TreeViewIcon({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn(
        'flex h-4 w-4 shrink-0 items-center justify-center text-text-tertiary',
        className,
      )}
      {...props}
    />
  )
})

const TreeViewLabel = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function TreeViewLabel({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn('min-w-0 flex-1 truncate text-start', className)}
      {...props}
    />
  )
})

export const TreeViewRoot = Object.assign(TreeViewRootElement, {
  Item: TreeViewItem,
  Trigger: TreeViewTrigger,
  Content: TreeViewContent,
  Icon: TreeViewIcon,
  Label: TreeViewLabel,
})

export { TreeViewRoot as TreeView }
