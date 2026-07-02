'use client'

import { CornerDownLeft } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import { cn } from '@/lib/cn'

import {
  DropdownMenu,
  dropdownMenuItemClass,
  dropdownMenuLabelClass,
  dropdownMenuSeparatorClass,
  menuViewportBaseClass,
} from './dropdown-menu'
import { Icon } from './icon'
import { Modal } from './modal'
import { SearchInput } from './search-input'
import { Spinner } from './spinner'

export interface CommandItem {
  id: string
  label: string
  /** Secondary line under the label. */
  description?: string
  /** Leading slot — icon or avatar. */
  icon?: ReactNode
  /** Right-aligned keyboard shortcut, e.g. "⌘P" — never hard-coded. */
  shortcut?: string
  /** Small trailing badge (e.g. "AI", "Soon"). */
  badge?: ReactNode
  /** Extra strings the filter matches besides the label. */
  keywords?: string[]
  disabled?: boolean
  /** Row shows a spinner in the leading slot and cannot be selected. */
  loading?: boolean
  onSelect?: () => void
}

export interface CommandGroup {
  id: string
  /** Section heading (Recent · Navigation · Actions · Settings · AI …). */
  heading?: string
  items: CommandItem[]
}

export interface CommandPaletteProps {
  /** Controlled open state (uncontrolled + built-in ⌘K when omitted). */
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Listen for ⌘K / Ctrl+K globally (default true). */
  hotkey?: boolean
  /** Command sections, in display order. Recompute freely (async / streaming /
   * AI later — the data contract does not change). */
  groups: CommandGroup[]
  placeholder?: string
  emptyMessage?: string
  /** Replace the list with a loading state (async sources). */
  loading?: boolean
  /** Controlled query (uncontrolled when omitted). */
  query?: string
  onQueryChange?: (query: string) => void
  /** Trigger element (`asChild` semantics) — optional; ⌘K works without it. */
  children?: ReactNode
}

function matches(item: CommandItem, query: string) {
  if (!query) return true
  const q = query.trim().toLowerCase()
  return [item.label, item.description, ...(item.keywords ?? [])]
    .filter(Boolean)
    .some((s) => String(s).toLowerCase().includes(q))
}

/**
 * CommandPalette — the system's single command surface (global search ·
 * navigation · quick open · exercises/books/clients/pages · dev commands ·
 * quick actions · AI commands). An Immersive Surface that COMPOSES the Modal:
 *
 *   GlassSurface → .ds-immersive → ImmersiveSurface → Modal → CommandPalette
 *
 * Modal provides everything immersive — scrim, focus trap, scroll lock,
 * Escape, inert background, portal, entrance, glass, elevation. The search
 * field is the FROZEN SearchInput, verbatim (no new input, no new glass). The
 * rows/headings/separators compose the frozen menu-language classes from
 * DropdownMenu (one list language across the system). The palette itself owns
 * ONLY: filtering, keyboard navigation (↑↓ · Home/End · PageUp/Down · Enter ·
 * loop), groups, result/empty/loading states, and the ⌘K hotkey.
 * Escape clears the query first, then closes (SearchInput's Escape-to-clear +
 * Modal's Escape, sequenced).
 */
export function CommandPalette({
  open,
  defaultOpen = false,
  onOpenChange,
  hotkey = true,
  groups,
  placeholder = 'Type a command or search…',
  emptyMessage = 'No results.',
  loading = false,
  query,
  onQueryChange,
  children,
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = open !== undefined ? open : internalOpen
  const [internalQuery, setInternalQuery] = useState('')
  const q = query !== undefined ? query : internalQuery
  const listRef = useRef<HTMLDivElement>(null)

  const setOpen = useCallback(
    (next: boolean) => {
      if (open === undefined) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [open, onOpenChange],
  )

  function setQuery(next: string) {
    if (query === undefined) setInternalQuery(next)
    onQueryChange?.(next)
  }

  // ⌘K / Ctrl+K — global toggle.
  useEffect(() => {
    if (!hotkey) return
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(!isOpen)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [hotkey, isOpen, setOpen])

  // Visible groups + the flat keyboard order.
  const visible = useMemo(
    () =>
      groups
        .map((g) => ({ ...g, items: g.items.filter((i) => matches(i, q)) }))
        .filter((g) => g.items.length > 0),
    [groups, q],
  )
  const flat = useMemo(
    () => visible.flatMap((g) => g.items).filter((i) => !i.disabled),
    [visible],
  )
  const [activeId, setActiveId] = useState<string | undefined>(undefined)
  const active =
    flat.find((i) => i.id === activeId) ?? (flat.length ? flat[0] : undefined)

  // Reset the roving selection when the result set changes or on open.
  useEffect(() => {
    setActiveId(undefined)
  }, [q, isOpen])

  useEffect(() => {
    if (!active) return
    document
      .getElementById(`cmdk-${active.id}`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [active])

  function move(delta: number) {
    if (!flat.length) return
    const index = active ? flat.findIndex((i) => i.id === active.id) : 0
    const next = (index + delta + flat.length) % flat.length // loop
    setActiveId(flat[next]!.id)
  }

  function select(item: CommandItem | undefined) {
    if (!item || item.disabled || item.loading) return
    item.onSelect?.()
    setQuery('')
    setOpen(false) // selecting a command closes the palette
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        move(1)
        break
      case 'ArrowUp':
        e.preventDefault()
        move(-1)
        break
      case 'Home':
        e.preventDefault()
        if (flat[0]) setActiveId(flat[0].id)
        break
      case 'End':
        e.preventDefault()
        if (flat.length) setActiveId(flat[flat.length - 1]!.id)
        break
      case 'PageDown':
        e.preventDefault()
        move(8)
        break
      case 'PageUp':
        e.preventDefault()
        move(-8)
        break
      case 'Enter':
        e.preventDefault()
        select(active)
        break
    }
  }

  return (
    <Modal open={isOpen} onOpenChange={setOpen}>
      {children}
      <Modal.Content
        // Command band: higher on screen, wider than a dialog (palette-owned
        // geometry per A1); pane padding neutralized for the bespoke layout.
        // `translate-y-[0px]`, not `translate-y-0`: the DISCIPLINE scale's
        // `--ds-space-0: 0` is unitless, which invalidates the whole transform
        // (translate needs a length — the shell would lose its X centering too).
        className="top-[16vh] max-w-[640px] translate-y-[0px]"
        // Fill the wider command band (the frozen `.ds-immersive` intrinsic
        // max-width stays for dialogs; the palette band is its own geometry).
        paneClassName="w-full max-w-none p-0"
        // Escape clears the query first (SearchInput), then closes.
        onEscapeKeyDown={(e) => {
          if (q) e.preventDefault()
        }}
        aria-describedby={undefined}
      >
        <Modal.Title className="sr-only">Command palette</Modal.Title>

        {/* Search — the FROZEN SearchInput, verbatim. */}
        <div className="px-3 pt-3">
          <SearchInput
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-activedescendant={active ? `cmdk-${active.id}` : undefined}
            placeholder={placeholder}
            value={q}
            clearable
            loading={loading}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery('')}
            onKeyDown={onInputKeyDown}
          />
        </div>
        <div className={cn(dropdownMenuSeparatorClass, 'mx-3')} />

        {/* Results — the frozen menu-language rows. */}
        <div
          ref={listRef}
          id="cmdk-list"
          role="listbox"
          aria-label="Commands"
          className={cn(menuViewportBaseClass, 'max-h-[min(50vh,22rem)]')}
        >
          {loading ? (
            <div className="flex items-center gap-3 px-3 py-6 text-body-sm text-text-tertiary">
              <Spinner size="sm" label="Searching" /> Searching…
            </div>
          ) : visible.length === 0 ? (
            <p className="px-3 py-6 text-center text-body-sm text-text-tertiary">
              {emptyMessage}
            </p>
          ) : (
            visible.map((group, gi) => (
              <div key={group.id} role="group" aria-label={group.heading}>
                {gi > 0 && <div className={dropdownMenuSeparatorClass} />}
                {group.heading && (
                  <p className={dropdownMenuLabelClass}>{group.heading}</p>
                )}
                {group.items.map((item) => {
                  const isActive = active?.id === item.id
                  return (
                    // aria-activedescendant pattern: the keyboard lives on the
                    // combobox input; options are pointer targets only.
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <div
                      key={item.id}
                      id={`cmdk-${item.id}`}
                      role="option"
                      tabIndex={-1}
                      aria-selected={isActive}
                      aria-disabled={item.disabled || undefined}
                      data-disabled={item.disabled ? '' : undefined}
                      className={cn(
                        dropdownMenuItemClass,
                        isActive &&
                          'bg-[color-mix(in_srgb,var(--ds-color-accent-subtle)_45%,transparent)]',
                      )}
                      onPointerMove={() =>
                        !item.disabled && setActiveId(item.id)
                      }
                      onClick={() => select(item)}
                    >
                      {(item.icon != null || item.loading) && (
                        <span className="inline-flex shrink-0 text-text-tertiary">
                          {item.loading ? (
                            <Spinner size="sm" label="Loading" />
                          ) : (
                            item.icon
                          )}
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">{item.label}</span>
                        {item.description && (
                          <span className="block truncate text-caption text-text-tertiary">
                            {item.description}
                          </span>
                        )}
                      </span>
                      {item.badge != null && (
                        <span className="shrink-0">{item.badge}</span>
                      )}
                      {item.shortcut && (
                        <DropdownMenu.Shortcut>
                          {item.shortcut}
                        </DropdownMenu.Shortcut>
                      )}
                    </div>
                  )
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hints. */}
        <div className="flex items-center gap-4 border-t border-border px-4 py-2 text-caption text-text-tertiary">
          <span>↑↓ navigate</span>
          <span className="inline-flex items-center gap-1">
            <Icon icon={CornerDownLeft} size="sm" aria-hidden /> select
          </span>
          <span>esc close</span>
        </div>
      </Modal.Content>
    </Modal>
  )
}

/** Optional trigger — the Modal trigger, re-exported (`asChild`). */
CommandPalette.Trigger = Modal.Trigger
