'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ChevronDown } from 'lucide-react'
import { forwardRef, useId, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

import { Checkbox } from './checkbox'
import {
  ControlSurface,
  controlChevronMotionClass,
  controlPanelClass,
  controlPanelPaddingClass,
  controlStateClass,
} from './control-surface'
import { Icon } from './icon'
import { Label } from './label'
import { Spinner } from './spinner'

/**
 * MultiSelect — a list of values, several of which may be selected at once,
 * open/select/deselect/close while keeping context:
 *
 *   the frozen optical-layer stack → Control Surface → MultiSelect → Checkbox
 *
 * Not Select: Select carries exactly one value and closes the instant you
 * pick — visibility trades for density. MultiSelect keeps several values and
 * stays open across many toggles — you are comparing and adjusting a set,
 * not making one decision. Not Dropdown Menu: a menu is commands (things
 * that fire); MultiSelect is a form field (a value that persists and
 * participates in a form) — same reason it does not compose the Dropdown
 * Menu primitive even though both open a panel. Not Command Palette: the
 * palette is a global, searchable command surface layered over the whole
 * app; MultiSelect is a scoped field anchored to one label. Not Checkbox
 * Group: a group is always-visible, every option printed on the page;
 * MultiSelect trades that visibility for density behind a trigger, exactly
 * where Select sits relative to Radio. Not Tag Input: a tag input's value is
 * free-text tokens the user types and can create; MultiSelect's value is a
 * closed set of predefined options — nothing is typed or created. Not
 * Combobox: a combobox filters a list by typing and picks ONE item with
 * `role="option"`; MultiSelect never filters and every item keeps real
 * Checkbox semantics (`role="checkbox"`, `aria-checked`), not `option`.
 *
 * The trigger is the exact `.ds-glass .ds-control` well Input/Select/
 * Textarea already use (`<ControlSurface/>` — zero new material). The open
 * panel reuses the frozen Select menu's OWN recipe verbatim
 * (`controlPanelClass`/`controlPanelPaddingClass`, extracted from Select
 * without touching it) — a raised token surface, not a second glass. Every
 * row is the real, frozen `<Checkbox/>` component — not its classes
 * recreated, the component itself — so the item language can never drift
 * from Checkbox. MultiSelect owns only behavior: open/close (Radix
 * Popover), the value set, Arrow Up/Down roving reachability across the
 * rows (Radix has no bundled roving-reachability for a plain Popover —
 * hand-rolled here, entirely in ref/keyboard code, zero material),
 * loading/empty/disabled/readOnly/invalid/required, and the trigger
 * summary text.
 */

export type MultiSelectSize = 'sm' | 'md' | 'lg'

export interface MultiSelectOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

const triggerSizeClass: Record<MultiSelectSize, string> = {
  sm: 'h-[40px] px-[12px] gap-[8px] text-body-sm',
  md: 'h-[48px] px-[16px] gap-[12px] text-body',
  lg: 'h-[56px] px-[20px] gap-[12px] text-body',
}

export interface MultiSelectProps {
  label?: string
  description?: string
  placeholder?: string
  helperText?: string
  error?: string
  required?: boolean
  disabled?: boolean
  /** Static: reachable, shows the current values, never opens. */
  readOnly?: boolean
  /** Error rim without a message. */
  invalid?: boolean
  /** Swap the chevron for a spinner and block opening while options load. */
  loading?: boolean
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  options: MultiSelectOption[]
  size?: MultiSelectSize
  className?: string
  id?: string
  /** Accessible name when there is no visible `label`. */
  'aria-label'?: string
  'data-testid'?: string
}

export const MultiSelect = forwardRef<HTMLButtonElement, MultiSelectProps>(
  function MultiSelect(
    {
      label,
      description,
      placeholder = 'Select…',
      helperText,
      error,
      required,
      disabled,
      readOnly,
      invalid,
      loading = false,
      value,
      defaultValue,
      onValueChange,
      options,
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
    const helpId = `${fieldId}-help`
    const errorId = `${fieldId}-error`
    const describedBy =
      cn(description && descId, helperText && helpId, error && errorId) ||
      undefined
    const isInvalid = Boolean(invalid || error)
    const isDisabled = Boolean(disabled || loading)

    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue ?? [])
    const currentValue = isControlled ? value : internalValue

    const [open, setOpen] = useState(false)
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

    function toggle(optionValue: string) {
      if (readOnly) return
      const next = currentValue.includes(optionValue)
        ? currentValue.filter((v) => v !== optionValue)
        : [...currentValue, optionValue]
      if (!isControlled) setInternalValue(next)
      onValueChange?.(next)
    }

    function moveToItem(index: number) {
      const count = options.length
      if (count === 0) return
      const wrapped = ((index % count) + count) % count
      itemRefs.current[wrapped]?.focus()
    }

    function handleListKeyDown(e: React.KeyboardEvent) {
      const current = itemRefs.current.findIndex(
        (el) => el === document.activeElement,
      )
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        moveToItem(current + 1)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        moveToItem(current - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        moveToItem(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        moveToItem(options.length - 1)
      }
    }

    const selectedLabels = options
      .filter((o) => currentValue.includes(o.value))
      .map((o) => o.label)
    const displayText =
      selectedLabels.length === 0
        ? placeholder
        : selectedLabels.length <= 2
          ? selectedLabels.join(', ')
          : `${selectedLabels.length} selected`

    if (readOnly) {
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
          <div
            id={fieldId}
            data-testid={dataTestId}
            aria-label={label ? undefined : ariaLabel}
            aria-describedby={describedBy}
            className={cn(
              'ds-glass ds-control relative flex w-full items-center justify-between rounded-md',
              triggerSizeClass[size],
              'cursor-default',
              className,
            )}
          >
            <ControlSurface />
            <span
              className={cn(
                'relative z-[3] min-w-0 flex-1 truncate text-left',
                selectedLabels.length ? 'text-text' : 'text-text-tertiary',
              )}
            >
              {displayText}
            </span>
            <Icon
              icon={ChevronDown}
              className="relative z-[3] shrink-0 text-text-tertiary"
            />
          </div>
          {error ? (
            <span id={errorId} className="text-body-sm text-error">
              {error}
            </span>
          ) : helperText ? (
            <span id={helpId} className="text-caption text-text-tertiary">
              {helperText}
            </span>
          ) : null}
        </div>
      )
    }

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
        <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
          <PopoverPrimitive.Trigger asChild>
            <button
              ref={ref}
              type="button"
              id={fieldId}
              data-testid={dataTestId}
              disabled={isDisabled}
              aria-label={label ? undefined : ariaLabel}
              aria-describedby={describedBy}
              aria-haspopup="true"
              aria-expanded={open}
              className={cn(
                'ds-glass ds-control group relative flex w-full items-center justify-between rounded-md',
                triggerSizeClass[size],
                'disabled:cursor-not-allowed',
                controlStateClass({ error: isInvalid, disabled: isDisabled }),
                className,
              )}
            >
              <ControlSurface />
              <span
                className={cn(
                  'relative z-[3] min-w-0 flex-1 truncate text-left',
                  selectedLabels.length ? 'text-text' : 'text-text-tertiary',
                )}
              >
                {displayText}
              </span>
              <span className="relative z-[3] inline-flex shrink-0 items-center">
                {loading ? (
                  <Spinner size="sm" label="Loading options" />
                ) : (
                  <Icon
                    icon={ChevronDown}
                    className={cn(
                      'text-text-tertiary group-data-[state=open]:rotate-180',
                      controlChevronMotionClass,
                    )}
                  />
                )}
              </span>
            </button>
          </PopoverPrimitive.Trigger>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              sideOffset={8}
              align="start"
              onOpenAutoFocus={(e) => {
                e.preventDefault()
                itemRefs.current[0]?.focus()
              }}
              className={cn(
                controlPanelClass,
                'w-[var(--radix-popover-trigger-width)]',
                'max-h-[min(var(--radix-popover-content-available-height),20rem)]',
              )}
            >
              {options.length === 0 ? (
                <p
                  className={cn(
                    controlPanelPaddingClass,
                    'text-body-sm text-text-tertiary',
                  )}
                >
                  No options.
                </p>
              ) : (
                <div
                  role="group"
                  aria-label={label ?? ariaLabel ?? 'Options'}
                  className={cn(
                    controlPanelPaddingClass,
                    'flex max-h-[inherit] flex-col gap-1 overflow-y-auto',
                  )}
                >
                  {options.map((option, index) => (
                    <div
                      key={option.value}
                      className="rounded-sm px-2 py-1.5 hover:bg-[color-mix(in_srgb,var(--ds-color-accent-subtle)_45%,transparent)]"
                    >
                      <Checkbox
                        ref={(el) => {
                          itemRefs.current[index] = el
                        }}
                        label={option.label}
                        description={option.description}
                        disabled={option.disabled}
                        checked={currentValue.includes(option.value)}
                        onCheckedChange={() => toggle(option.value)}
                        onKeyDown={handleListKeyDown}
                      />
                    </div>
                  ))}
                </div>
              )}
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
        {error ? (
          <span id={errorId} className="text-body-sm text-error">
            {error}
          </span>
        ) : helperText ? (
          <span id={helpId} className="text-caption text-text-tertiary">
            {helperText}
          </span>
        ) : null}
      </div>
    )
  },
)
