'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ChevronDown } from 'lucide-react'
import { forwardRef, useId, useMemo, useState, type KeyboardEvent } from 'react'

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
 * Autocomplete — free text, assisted but never constrained by suggestions:
 *
 *   the frozen optical-layer stack → Control Surface → Autocomplete → Input →
 *   Popup → Scrollable list → Selectable row
 *
 * Not Combobox: a Combobox's final value is always exactly one of a CLOSED
 * set of `options` — typed text that matches nothing cannot be committed.
 * Autocomplete's value is always exactly what was typed; a suggestion only
 * speeds up typing, it never gates it. Not Search Input: SearchInput filters
 * the page's own visible content as a side effect of typing; Autocomplete
 * filters nothing outside its own field. Not Command Palette: a global,
 * app-wide command surface vs. a scoped free-text field. Not Select /
 * MultiSelect: both carry a value from a closed, predefined set — free text
 * is impossible by construction. Not Tag Input: a tag input CREATES discrete
 * tokens and accumulates them into a list of values; Autocomplete carries
 * ONE continuous string, never a collection. Not Dropdown Menu / Menu:
 * commands, not a text field. Not Listbox: a closed selection, never
 * arbitrary text.
 *
 * Same physical composition as the frozen Combobox — the trigger is Input
 * itself (not its classes rebuilt), the popup is the frozen Control Surface
 * popup recipe, rows reuse the frozen Select row's own visual language.
 * Zero new exports needed in control-surface.tsx: everything Autocomplete
 * needs was already extracted for Combobox. The one deliberate behavioral
 * difference: typing never auto-highlights a suggestion (`activeIndex`
 * stays -1 until the user explicitly presses an arrow key), so Enter's
 * default outcome is always "keep exactly what I typed" — accepting a
 * suggestion is something the user opts into, never something sprung on
 * them. Escape and outside interaction close the panel WITHOUT reverting
 * the typed text (unlike Combobox, which reverts to the last committed
 * option — here every typed string is already a valid value). No
 * `emptyMessage`/`invalid-because-unmatched` concept exists: not matching a
 * suggestion is a normal, expected outcome for free text, not an error.
 */

export interface AutocompleteOption {
  label: string
  disabled?: boolean
}

export type AutocompleteSize = 'sm' | 'md' | 'lg'

const optionSizeClass: Record<AutocompleteSize, string> = {
  sm: 'py-[6px] pl-3 pr-3 text-body-sm',
  md: 'py-[10px] pl-3 pr-3 text-body-sm',
  lg: 'py-[12px] pl-4 pr-4 text-body',
}

/** Case-insensitive, accent-insensitive match — standard JS string
 * normalization, not a new utility. */
function normalize(input: string) {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export interface AutocompleteProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  options: AutocompleteOption[]
  placeholder?: string
  label?: string
  description?: string
  helperText?: string
  error?: string
  invalid?: boolean
  required?: boolean
  disabled?: boolean
  /** Static: shows the current text, reachable, never opens. */
  readOnly?: boolean
  /** Swap the chevron for a spinner and block opening while suggestions
   * load. */
  loading?: boolean
  size?: AutocompleteSize
  className?: string
  id?: string
  'aria-label'?: string
  'data-testid'?: string
}

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  function Autocomplete(
    {
      value,
      defaultValue,
      onValueChange,
      options,
      placeholder = 'Type…',
      label,
      description,
      helperText,
      error,
      invalid,
      required,
      disabled,
      readOnly,
      loading = false,
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
    const [internalValue, setInternalValue] = useState(defaultValue ?? '')
    const currentValue = isControlled ? value : internalValue

    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)

    function setValue(next: string) {
      if (!isControlled) setInternalValue(next)
      onValueChange?.(next)
    }

    const filteredOptions = useMemo(() => {
      if (!currentValue) return options
      const q = normalize(currentValue)
      return options.filter((o) => normalize(o.label).includes(q))
    }, [options, currentValue])

    const showPanel =
      open && !isDisabled && !readOnly && filteredOptions.length > 0

    function moveActive(current: number, delta: number) {
      const count = filteredOptions.length
      if (count === 0) return -1
      const base = current < 0 ? (delta > 0 ? -1 : 0) : current
      const next = ((base + delta) % count) + (base + delta < 0 ? count : 0)
      return ((next % count) + count) % count
    }

    function acceptSuggestion(option: AutocompleteOption) {
      if (option.disabled) return
      setValue(option.label)
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
          acceptSuggestion(filteredOptions[activeIndex])
        } else {
          setOpen(false)
        }
      } else if (e.key === 'Escape' && open) {
        e.preventDefault()
        setOpen(false)
        setActiveIndex(-1)
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
        <PopoverPrimitive.Root open={showPanel}>
          <PopoverPrimitive.Anchor>
            <Input
              ref={ref}
              id={fieldId}
              data-testid={dataTestId}
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={showPanel}
              aria-controls={listboxId}
              aria-activedescendant={activeId}
              aria-describedby={description ? descId : undefined}
              aria-invalid={isInvalid || undefined}
              aria-required={required || undefined}
              aria-label={label ? undefined : ariaLabel}
              autoComplete="off"
              value={currentValue}
              placeholder={placeholder}
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
                setValue(e.target.value)
                setOpen(true)
                setActiveIndex(-1)
              }}
              onKeyDown={handleKeyDown}
              suffix={
                loading ? (
                  <Spinner size="sm" label="Loading suggestions" />
                ) : (
                  <Icon
                    icon={ChevronDown}
                    className={cn(
                      'text-text-tertiary',
                      showPanel && 'rotate-180',
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
                setActiveIndex(-1)
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
                aria-label={label ?? ariaLabel ?? 'Suggestions'}
                className={cn(
                  controlPanelPaddingClass,
                  'max-h-[inherit] overflow-y-auto',
                )}
              >
                {filteredOptions.map((option, index) => (
                  // Pointer-only click: reachability stays on the input
                  // alone (Enter accepts the active suggestion via
                  // aria-activedescendant), so this row is never
                  // independently a keyboard target.
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                  <li
                    key={option.label}
                    id={`${fieldId}-option-${index}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    aria-disabled={option.disabled || undefined}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => acceptSuggestion(option)}
                    className={cn(
                      controlOptionRowClass,
                      'pl-3',
                      optionSizeClass[size],
                      index === activeIndex && controlOptionHighlightClass,
                      option.disabled && controlOptionDisabledClass,
                    )}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
      </div>
    )
  },
)
