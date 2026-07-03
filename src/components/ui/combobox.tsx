'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Check, ChevronDown } from 'lucide-react'
import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useState,
  type KeyboardEvent,
} from 'react'

import { cn } from '@/lib/cn'

import {
  controlChevronMotionClass,
  controlOptionDisabledClass,
  controlOptionHighlightClass,
  controlOptionRowClass,
  controlPanelClass,
  controlPanelPaddingClass,
} from './control-surface'
import { Icon } from './icon'
import { Input } from './input'
import { Label } from './label'
import { Spinner } from './spinner'

/**
 * Combobox — a single value selected from a very large list, found through
 * search:
 *
 *   the frozen optical-layer stack → Control Surface → Combobox → Input →
 *   Popup → Scrollable list → Selectable row
 *
 * Not Select: Select is built for a SHORT, fully-legible list (the whole
 * point is showing every option); Combobox exists because a list of dozens,
 * hundreds or thousands of options makes scanning impossible — search
 * replaces scanning. Not MultiSelect: MultiSelect keeps several values and
 * stays open across many toggles; Combobox carries exactly one value and
 * closes the instant it is chosen. Not Command Palette: the palette is a
 * global, app-wide command surface (actions, navigation, search all mixed);
 * Combobox is a single scoped field bound to one label, with one job — pick
 * a value. Not Search Input: SearchInput filters a page's own visible
 * content as a side effect of typing; a Combobox's typed text is never
 * itself the value — an option must be committed. Not Autocomplete: plain
 * autocomplete suggests completions for free text that stays free text (an
 * address line, a search query); a Combobox's final value is always exactly
 * one of `options`, never the raw typed string. Not Dropdown Menu: a menu is
 * commands; Combobox is a value field. Not Menu: same distinction, broader.
 * Not Listbox: a bare listbox has no search — once options exceed a
 * screenful a listbox is exactly the scanning problem Combobox solves.
 *
 * The trigger is Input itself — not Input's classes rebuilt, the component:
 * label, description, error/helperText, the `.ds-glass .ds-control` well,
 * all inherited for free, zero re-declaration. The popup is the frozen
 * Control Surface popup recipe (`controlPanelClass`, the same raised token
 * surface already validated on Select/MultiSelect, extracted once, reused
 * verbatim). Rows reuse the frozen Select row's own visual language
 * (`controlOptionRowClass`/`controlOptionHighlightClass`, extracted from
 * Select without touching it) — never a rebuilt checkbox, radio or menu
 * item. The list is a plain scrollable region (`overflow-y-auto` — no
 * dedicated ScrollArea primitive exists in this codebase; Select's own
 * menu uses the same plain technique). Combobox owns only behavior: the
 * committed value, the search query (a SEPARATE piece of state from the
 * value — typing filters, it never becomes the value until an option is
 * chosen), the active option via `aria-activedescendant` (a pure ARIA/CSS
 * pointer — real DOM reachability never leaves the input, so unlike
 * MultiSelect this file needs no reachability-moving code at all), loading/
 * empty/disabled/readOnly/invalid/required, and full combobox ARIA.
 */

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

export type ComboboxSize = 'sm' | 'md' | 'lg'

const optionSizeClass: Record<ComboboxSize, string> = {
  sm: 'py-[6px] pl-8 pr-3 text-body-sm',
  md: 'py-[10px] pl-8 pr-3 text-body-sm',
  lg: 'py-[12px] pl-9 pr-4 text-body',
}

/** Case-insensitive, accent-insensitive match — standard JS string
 * normalization, not a new utility. */
function normalize(input: string) {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export interface ComboboxProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  options: ComboboxOption[]
  placeholder?: string
  /** Placeholder shown once the list is open (defaults to `placeholder`). */
  searchPlaceholder?: string
  label?: string
  description?: string
  helperText?: string
  error?: string
  /** Error rim without a message — see the report: composing the frozen
   * Input as-is only exposes a rim through an actual message, matching
   * Select's own established limitation. This still sets `aria-invalid`. */
  invalid?: boolean
  required?: boolean
  disabled?: boolean
  /** Static: shows the selected label, reachable, never opens. */
  readOnly?: boolean
  /** Swap the chevron for a spinner and block opening while options load. */
  loading?: boolean
  emptyMessage?: string
  size?: ComboboxSize
  className?: string
  id?: string
  'aria-label'?: string
  'data-testid'?: string
}

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  function Combobox(
    {
      value,
      defaultValue,
      onValueChange,
      options,
      placeholder = 'Select…',
      searchPlaceholder,
      label,
      description,
      helperText,
      error,
      invalid,
      required,
      disabled,
      readOnly,
      loading = false,
      emptyMessage = 'No results.',
      size = 'md',
      className,
      id,
      'aria-label': ariaLabel,
      'data-testid': dataTestId,
    },
    ref,
  ) {
    const autoId = useId()
    const fieldId = id ?? autoId
    const descId = `${fieldId}-desc`
    const listboxId = `${fieldId}-listbox`
    const isInvalid = Boolean(invalid || error)
    const isDisabled = Boolean(disabled || loading)

    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue)
    const selectedValue = isControlled ? value : internalValue
    const selectedOption = options.find((o) => o.value === selectedValue)

    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState(selectedOption?.label ?? '')
    const [activeIndex, setActiveIndex] = useState(-1)

    // Keep the displayed text in sync with the committed value while
    // closed — never while open (that would clobber what the user types).
    useEffect(() => {
      if (!open) setQuery(selectedOption?.label ?? '')
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValue, open])

    const filteredOptions = useMemo(() => {
      if (!query) return options
      const q = normalize(query)
      return options.filter((o) => normalize(o.label).includes(q))
    }, [options, query])

    function moveActive(current: number, delta: number) {
      const count = filteredOptions.length
      if (count === 0) return -1
      const base = current < 0 ? (delta > 0 ? -1 : 0) : current
      const next = ((base + delta) % count) + (base + delta < 0 ? count : 0)
      return ((next % count) + count) % count
    }

    function commit(option: ComboboxOption) {
      if (option.disabled) return
      if (!isControlled) setInternalValue(option.value)
      onValueChange?.(option.value)
      setQuery(option.label)
      setOpen(false)
      setActiveIndex(-1)
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
      if (isDisabled || readOnly) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (!open) {
          setOpen(true)
          setActiveIndex(0)
          return
        }
        setActiveIndex((i) => moveActive(i, 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (!open) {
          setOpen(true)
          setActiveIndex(filteredOptions.length - 1)
          return
        }
        setActiveIndex((i) => moveActive(i, -1))
      } else if (e.key === 'Home' && open) {
        e.preventDefault()
        setActiveIndex(0)
      } else if (e.key === 'End' && open) {
        e.preventDefault()
        setActiveIndex(filteredOptions.length - 1)
      } else if (e.key === 'Enter') {
        if (open && activeIndex >= 0 && filteredOptions[activeIndex]) {
          e.preventDefault()
          commit(filteredOptions[activeIndex])
        }
      } else if (e.key === 'Escape' && open) {
        e.preventDefault()
        setOpen(false)
        setQuery(selectedOption?.label ?? '')
      }
    }

    const activeId =
      activeIndex >= 0 && filteredOptions[activeIndex]
        ? `${fieldId}-option-${activeIndex}`
        : undefined

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <Label htmlFor={fieldId} required={required}>
            {label}
          </Label>
        )}
        {description && (
          <span id={descId} className="text-caption text-text-tertiary">
            {description}
          </span>
        )}
        <PopoverPrimitive.Root open={open && !isDisabled && !readOnly}>
          <PopoverPrimitive.Anchor>
            <Input
              ref={ref}
              id={fieldId}
              data-testid={dataTestId}
              role="combobox"
              aria-expanded={open}
              aria-controls={listboxId}
              aria-activedescendant={activeId}
              aria-describedby={description ? descId : undefined}
              aria-invalid={isInvalid || undefined}
              aria-required={required || undefined}
              aria-label={label ? undefined : ariaLabel}
              autoComplete="off"
              value={query}
              placeholder={
                open ? (searchPlaceholder ?? placeholder) : placeholder
              }
              disabled={isDisabled}
              readOnly={readOnly}
              error={error}
              helperText={helperText}
              className={className}
              onFocus={() => {
                if (!isDisabled && !readOnly) setOpen(true)
              }}
              onChange={(e) => {
                if (readOnly) return
                setQuery(e.target.value)
                setOpen(true)
                setActiveIndex(0)
              }}
              onKeyDown={handleKeyDown}
              suffix={
                loading ? (
                  <Spinner size="sm" label="Loading options" />
                ) : (
                  <Icon
                    icon={ChevronDown}
                    className={cn(
                      'text-text-tertiary',
                      open && 'rotate-180',
                      controlChevronMotionClass,
                    )}
                  />
                )
              }
            />
          </PopoverPrimitive.Anchor>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              sideOffset={8}
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
              onInteractOutside={() => {
                setOpen(false)
                setQuery(selectedOption?.label ?? '')
              }}
              className={cn(
                controlPanelClass,
                'w-[var(--radix-popover-anchor-width)]',
                'max-h-[min(var(--radix-popover-content-available-height),20rem)]',
              )}
            >
              <ul
                id={listboxId}
                role="listbox"
                aria-label={label ?? ariaLabel ?? 'Options'}
                className={cn(
                  controlPanelPaddingClass,
                  'max-h-[inherit] overflow-y-auto',
                )}
              >
                {filteredOptions.length === 0 ? (
                  <li className="px-3 py-2.5 text-body-sm text-text-tertiary">
                    {emptyMessage}
                  </li>
                ) : (
                  filteredOptions.map((option, index) => (
                    // Pointer-only click: the ARIA combobox pattern keeps
                    // real keyboard reachability on the input alone (Enter
                    // commits the active option via aria-activedescendant),
                    // so this row is never independently a keyboard target.
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <li
                      key={option.value}
                      id={`${fieldId}-option-${index}`}
                      role="option"
                      aria-selected={option.value === selectedValue}
                      aria-disabled={option.disabled || undefined}
                      onMouseDown={(e) => e.preventDefault()}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => commit(option)}
                      className={cn(
                        controlOptionRowClass,
                        optionSizeClass[size],
                        index === activeIndex && controlOptionHighlightClass,
                        option.value === selectedValue && 'font-medium',
                        option.disabled && controlOptionDisabledClass,
                      )}
                    >
                      {option.value === selectedValue && (
                        <span className="absolute left-2 inline-flex items-center">
                          <Icon
                            icon={Check}
                            size="sm"
                            className="text-accent-accessible"
                          />
                        </span>
                      )}
                      {option.label}
                    </li>
                  ))
                )}
              </ul>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
      </div>
    )
  },
)
