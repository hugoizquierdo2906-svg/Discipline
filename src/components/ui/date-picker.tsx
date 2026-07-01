'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { format as formatDate, type Locale } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Calendar, Check } from 'lucide-react'
import { forwardRef, useId, useState } from 'react'
import { DayPicker, type Matcher } from 'react-day-picker'

import { cn } from '@/lib/cn'

import {
  ControlSurface,
  controlHostClass,
  controlStateClass,
} from './control-surface'
import 'react-day-picker/style.css'
import './date-picker.css'
import {
  FloatingSurface,
  floatingContentClass,
  floatingHostClass,
} from './floating-surface'
import { Icon } from './icon'
import { Label } from './label'

export interface DatePickerProps {
  label?: string
  description?: string
  placeholder?: string
  helperText?: string
  error?: string
  success?: boolean
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  /** Controlled selected date. */
  value?: Date
  /** Initial selected date (uncontrolled). */
  defaultValue?: Date
  /** Earliest selectable date (inclusive). */
  minDate?: Date
  /** Latest selectable date (inclusive). */
  maxDate?: Date
  /** date-fns locale — drives weekday order, month names and the default format. */
  locale?: Locale
  /** date-fns pattern for the closed field (defaults to the locale's medium date). */
  format?: string
  onChange?: (date: Date | undefined) => void
  name?: string
  className?: string
  id?: string
  /** Accessible name when there is no visible `label`. */
  'aria-label'?: string
}

function MetaRow({
  error,
  success,
  helperText,
  errorId,
  helpId,
}: {
  error?: string
  success?: boolean
  helperText?: string
  errorId: string
  helpId: string
}) {
  if (!error && !success && !helperText) return null
  return (
    <div className="flex items-start justify-between gap-3">
      {error ? (
        <span id={errorId} className="text-body-sm text-error">
          {error}
        </span>
      ) : success ? (
        <span className="inline-flex items-center gap-1 text-body-sm text-success">
          <Icon icon={Check} size="sm" aria-hidden />
          {helperText}
        </span>
      ) : (
        <span id={helpId} className="text-caption text-text-tertiary">
          {helperText}
        </span>
      )}
    </div>
  )
}

/**
 * DatePicker — the calendar Control Surface. The closed FIELD is a Control Surface
 * (a SIBLING of Input/Select): it composes the SAME `controlHostClass` +
 * `<ControlSurface/>`, so closed it is indistinguishable from Input / Textarea /
 * SearchInput / Select — same glass, blur, refraction, Fresnel, depth and the
 * violet that rises on focus. The field owns only value · placeholder · open/close.
 *
 * The CALENDAR is a separate role: a Floating Surface. It composes the shared
 * `.ds-floating` glass (`<FloatingSurface/>`) — the same material the future
 * Popover / DropdownMenu / ContextMenu / Command Palette will use — never a new
 * one. Two roles, two materials, no mixing. Parsing, format, month/year navigation
 * and keyboard handling come from react-day-picker; the field never embeds the grid.
 *
 * Inheritance: GlassSurface → .ds-control → ControlSurface → DatePicker (field).
 * Calendar overlay: GlassSurface → .ds-floating → FloatingSurface.
 */
export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  function DatePicker(
    {
      label,
      description,
      placeholder = 'Select a date',
      helperText,
      error,
      success = false,
      required,
      disabled,
      readOnly,
      value,
      defaultValue,
      minDate,
      maxDate,
      locale,
      format,
      onChange,
      name,
      className,
      id,
      'aria-label': ariaLabel,
    },
    ref,
  ) {
    const autoId = useId()
    const fieldId = id ?? autoId
    const descId = `${fieldId}-desc`
    const helpId = `${fieldId}-help`
    const errorId = `${fieldId}-error`
    const calendarId = `${fieldId}-calendar`
    const describedBy =
      cn(description && descId, helperText && helpId, error && errorId) ||
      undefined

    const [open, setOpen] = useState(false)
    const [internal, setInternal] = useState<Date | undefined>(defaultValue)
    const selected = value !== undefined ? value : internal

    const resolvedLocale = locale ?? enUS
    const displayFormat =
      format ?? resolvedLocale.formatLong?.date({ width: 'medium' }) ?? 'PP'
    const display = selected
      ? formatDate(selected, displayFormat, { locale: resolvedLocale })
      : undefined

    const disabledMatchers: Matcher[] = []
    if (minDate) disabledMatchers.push({ before: minDate })
    if (maxDate) disabledMatchers.push({ after: maxDate })

    function handleSelect(next: Date | undefined) {
      if (value === undefined) setInternal(next)
      onChange?.(next)
      if (next) setOpen(false)
    }

    const header = (
      <>
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
      </>
    )

    const fieldInner = (
      <>
        <ControlSurface />
        <span
          className={cn(
            'relative z-[3] min-w-0 flex-1 truncate text-left text-body',
            display ? 'text-text' : 'text-text-tertiary',
          )}
        >
          {display ?? placeholder}
        </span>
        <Icon
          icon={Calendar}
          className="relative z-[3] shrink-0 text-text-tertiary"
        />
      </>
    )

    // ReadOnly — a static, full-opacity field that shows the value but never opens.
    if (readOnly) {
      return (
        <div className="flex flex-col gap-2">
          {header}
          <div
            ref={ref as React.Ref<HTMLDivElement>}
            id={fieldId}
            aria-label={label ? undefined : ariaLabel}
            aria-describedby={describedBy}
            className={cn(
              controlHostClass,
              'w-full cursor-default justify-between',
              className,
            )}
          >
            {fieldInner}
          </div>
          <MetaRow
            error={error}
            success={success}
            helperText={helperText}
            errorId={errorId}
            helpId={helpId}
          />
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-2">
        {header}

        <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
          <PopoverPrimitive.Trigger
            ref={ref}
            id={fieldId}
            role="combobox"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={calendarId}
            aria-label={label ? undefined : ariaLabel}
            aria-describedby={describedBy}
            disabled={disabled}
            className={cn(
              controlHostClass,
              'group w-full justify-between',
              'disabled:cursor-not-allowed',
              controlStateClass({ error: Boolean(error), disabled }),
              className,
            )}
          >
            {fieldInner}
          </PopoverPrimitive.Trigger>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              id={calendarId}
              role="dialog"
              aria-label={label ?? ariaLabel ?? 'Choose a date'}
              align="start"
              sideOffset={8}
              className={cn(
                floatingHostClass,
                'ds-datepicker-content z-dropdown rounded-md',
              )}
            >
              <FloatingSurface />
              <div
                className={cn(
                  floatingContentClass,
                  'ds-datepicker-calendar p-3',
                )}
              >
                <DayPicker
                  mode="single"
                  selected={selected}
                  onSelect={handleSelect}
                  disabled={
                    disabledMatchers.length ? disabledMatchers : undefined
                  }
                  startMonth={minDate}
                  endMonth={maxDate}
                  defaultMonth={selected}
                  locale={resolvedLocale}
                  showOutsideDays
                  // Move focus into the grid when the dialog opens so keyboard
                  // users land on a day and can navigate immediately (spec:
                  // Arrow/Home/End/PageUp/PageDown). Scoped to an opened dialog,
                  // never on page load.
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                />
              </div>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>

        {name && (
          <input
            type="hidden"
            name={name}
            value={selected ? formatDate(selected, 'yyyy-MM-dd') : ''}
          />
        )}

        <MetaRow
          error={error}
          success={success}
          helperText={helperText}
          errorId={errorId}
          helpId={helpId}
        />
      </div>
    )
  },
)
