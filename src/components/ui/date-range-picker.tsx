'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { format as formatDate, type Locale } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Calendar } from 'lucide-react'
import {
  forwardRef,
  useId,
  useRef,
  useState,
  type ForwardedRef,
  type KeyboardEvent,
} from 'react'
import { DayPicker, type DateRange, type Matcher } from 'react-day-picker'

import { cn } from '@/lib/cn'

import 'react-day-picker/style.css'
import './date-picker.css'
import {
  FloatingSurface,
  floatingContentClass,
  floatingHostClass,
} from './floating-surface'
import { Icon } from './icon'
import { Input } from './input'
import { Label } from './label'
import { Spinner } from './spinner'

/**
 * Date Range Picker — select a START date and an END date that together
 * represent exactly ONE logical value: a continuous period. Not Date Picker:
 * a Date Picker commits ONE day and closes — a period is a different value
 * type entirely (two ordered anchors + everything between them), with its own
 * grammar (partial state, inversion, in-range band). Not Calendar: Calendar
 * is the day-grid a picker DELEGATES to; it renders days, it holds no field,
 * no popup, no committed value. Not Time Picker: hours/minutes inside one
 * day's 24h cycle vs. days across months. Not DateTime Picker: one instant
 * (day + time) vs. a span of days with no time component. Not Range Slider:
 * a slider picks two numbers on a continuous axis by dragging — no calendar
 * structure, no month navigation, no date grammar. Not Time Range Picker:
 * two times within a day vs. two dates across months. Not Month Picker /
 * Year Picker: those commit ONE coarser calendar unit — still a single
 * anchor, never a pair. Not MultiSelect: a set of INDEPENDENT, unordered
 * values — a range is two ORDERED anchors implying everything between them;
 * you cannot "deselect the middle". Not Combobox: nothing is searched or
 * matched against options. Not Scheduler / Booking Calendar / Availability
 * Calendar: page-level compositions (slots, conflicts, inventory,
 * availability data) built AROUND a field like this one. Not Timeline /
 * Gantt: read-oriented visualizations of many spans vs. one input field for
 * one span. Not Form Group: one field, one logical value — start and end
 * are the value's own internal structure, not two independent fields.
 *
 *   the frozen optical-layer stack → Control Surface → Date Range Picker
 *   → Input (trigger) → Popover surface (.ds-floating) → Calendar grid
 *   → Range
 *
 * The trigger is Input itself (not its classes rebuilt) — the
 * `.ds-glass .ds-control` well, error/helperText meta row, suffix slot all
 * inherited for free; the displayed text is the formatted period ("Jul 10,
 * 2026 – Jul 15, 2026", or "Jul 10, 2026 – …" while partial) and is never
 * free-typed (the calendar is the input surface, exactly like the frozen
 * DatePicker's field). The overlay is the SAME Floating Surface + calendar
 * language the frozen DatePicker validated: `floatingHostClass` +
 * `<FloatingSurface/>` + `ds-datepicker-content`/`ds-datepicker-calendar`
 * (its css reused verbatim — one strictly additive rule added for the
 * in-range band, reusing the site-wide accent-subtle highlight, no new
 * value). The grid is react-day-picker in `mode="range"` — the exact same
 * engine, keyboard model (Arrows/Home/End/PageUp/PageDown + Enter) and ARIA
 * the frozen DatePicker already ships.
 *
 * Selection grammar: first pick anchors the start (popup stays open,
 * field shows the partial period), second pick anchors the end and closes.
 * Picking an end EARLIER than the start never errors — the two anchors
 * swap, because a period has no invalid orientation, only two endpoints.
 * Picking any day while a complete period is committed starts a fresh
 * period from that day.
 */

export type DateRangeValue = DateRange

export interface DateRangePickerProps {
  label?: string
  description?: string
  placeholder?: string
  helperText?: string
  error?: string
  invalid?: boolean
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  /** Swap the calendar icon for a spinner and block opening while, e.g.,
   * availability loads. */
  loading?: boolean
  autoFocus?: boolean
  /** Controlled period. */
  value?: DateRange
  /** Initial period (uncontrolled). */
  defaultValue?: DateRange
  /** Earliest selectable date (inclusive). */
  minDate?: Date
  /** Latest selectable date (inclusive). */
  maxDate?: Date
  /** date-fns locale — weekday order, month names, default format. */
  locale?: Locale
  /** date-fns pattern for each endpoint in the closed field. */
  format?: string
  onChange?: (range: DateRange | undefined) => void
  /** Renders two hidden fields (`${name}-start` / `${name}-end`,
   * yyyy-MM-dd) for native form submission. */
  name?: string
  className?: string
  id?: string
  'aria-label'?: string
  'data-testid'?: string
}

export const DateRangePicker = forwardRef<
  HTMLInputElement,
  DateRangePickerProps
>(function DateRangePicker(
  {
    label,
    description,
    placeholder = 'Select a period',
    helperText,
    error,
    invalid,
    required,
    disabled,
    readOnly,
    loading = false,
    autoFocus,
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
    'data-testid': dataTestId,
  },
  ref: ForwardedRef<HTMLInputElement>,
) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const descId = `${fieldId}-desc`
  const calendarId = `${fieldId}-calendar`
  const isInvalid = Boolean(invalid || error)
  const isDisabled = Boolean(disabled || loading)

  const [open, setOpen] = useState(false)
  const [internal, setInternal] = useState<DateRange | undefined>(defaultValue)
  const selected = value !== undefined ? value : internal

  const inputRef = useRef<HTMLInputElement | null>(null)
  const anchorRef = useRef<HTMLDivElement | null>(null)

  function setRefs(node: HTMLInputElement | null) {
    inputRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }

  const resolvedLocale = locale ?? enUS
  const displayFormat =
    format ?? resolvedLocale.formatLong?.date({ width: 'medium' }) ?? 'PP'
  const display = selected?.from
    ? `${formatDate(selected.from, displayFormat, { locale: resolvedLocale })} – ${
        selected.to
          ? formatDate(selected.to, displayFormat, { locale: resolvedLocale })
          : '…'
      }`
    : ''

  const disabledMatchers: Matcher[] = []
  if (minDate) disabledMatchers.push({ before: minDate })
  if (maxDate) disabledMatchers.push({ after: maxDate })

  function commit(next: DateRange | undefined) {
    if (value === undefined) setInternal(next)
    onChange?.(next)
    if (next?.from && next?.to) setOpen(false)
  }

  // The grammar is driven from the committed state + the picked day, not
  // from react-day-picker's suggestion: v9's range mode returns
  // `{from: day, to: day}` on the very FIRST pick (both endpoints set),
  // which would read as an instantly complete single-day period — the
  // first pick must anchor the start only.
  function handleSelect(_suggested: DateRange | undefined, pickedDay: Date) {
    // Nothing selected yet, or a complete period already committed —
    // anchor a fresh start (a committed period is final; the next pick
    // never stretches it unpredictably).
    if (!selected?.from || selected.to) {
      commit({ from: pickedDay, to: undefined })
      return
    }
    // Second pick anchors the end. A period has no invalid orientation,
    // only two endpoints: an "end" picked earlier than the start swaps
    // into place instead of erroring.
    if (pickedDay < selected.from) {
      commit({ from: pickedDay, to: selected.from })
    } else {
      commit({ from: selected.from, to: pickedDay })
    }
  }

  function openPicker() {
    if (!isDisabled && !readOnly) setOpen(true)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (isDisabled || readOnly) return
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
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

      <PopoverPrimitive.Root
        open={open}
        onOpenChange={(next) => {
          if (next) openPicker()
          else setOpen(false)
        }}
      >
        <PopoverPrimitive.Anchor ref={anchorRef}>
          <Input
            ref={setRefs}
            id={fieldId}
            data-testid={dataTestId}
            type="text"
            role="combobox"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={calendarId}
            aria-describedby={description ? descId : undefined}
            aria-invalid={isInvalid || undefined}
            aria-required={required || undefined}
            aria-readonly={readOnly || undefined}
            aria-label={label ? undefined : ariaLabel}
            autoComplete="off"
            // The field displays the period; the calendar is the input
            // surface (frozen DatePicker convention) — never free-typed.
            readOnly
            // The consumer opts in explicitly (e.g. a booking screen
            // focusing its one period field on mount) — never on by
            // default.
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autoFocus}
            value={display}
            placeholder={placeholder}
            disabled={isDisabled}
            error={error}
            helperText={helperText}
            className={cn(
              'cursor-pointer disabled:cursor-not-allowed',
              className,
            )}
            onPointerDown={() => {
              if (!open) openPicker()
            }}
            onKeyDown={handleKeyDown}
            suffix={
              loading ? (
                <Spinner size="sm" label="Loading" />
              ) : (
                <Icon icon={Calendar} className="text-text-tertiary" />
              )
            }
          />
        </PopoverPrimitive.Anchor>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            id={calendarId}
            role="dialog"
            aria-label={label ?? ariaLabel ?? 'Choose a period'}
            align="start"
            sideOffset={8}
            onInteractOutside={(e) => {
              // Clicking the field while open must not close-and-reopen —
              // the field is this dialog's own anchor, not "outside".
              if (anchorRef.current?.contains(e.target as Node))
                e.preventDefault()
            }}
            onCloseAutoFocus={(e) => {
              // Reachability moved into the grid while open; hand it back
              // to the field on close (there is no Radix Trigger to do it
              // for us — the anchor is Input itself).
              e.preventDefault()
              inputRef.current?.focus()
            }}
            className={cn(
              floatingHostClass,
              'ds-datepicker-content z-dropdown rounded-md',
            )}
          >
            <FloatingSurface />
            <div
              className={cn(floatingContentClass, 'ds-datepicker-calendar p-3')}
            >
              <DayPicker
                mode="range"
                selected={selected}
                onSelect={handleSelect}
                disabled={
                  disabledMatchers.length ? disabledMatchers : undefined
                }
                startMonth={minDate}
                endMonth={maxDate}
                defaultMonth={selected?.from}
                locale={resolvedLocale}
                showOutsideDays
                // Move reachability into the grid when the dialog opens so
                // keyboard users land on a day and can navigate immediately
                // (Arrows/Home/End/PageUp/PageDown — frozen DatePicker
                // precedent). Scoped to an opened dialog, never page load.
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

      {name && (
        <>
          <input
            type="hidden"
            name={`${name}-start`}
            value={
              selected?.from ? formatDate(selected.from, 'yyyy-MM-dd') : ''
            }
          />
          <input
            type="hidden"
            name={`${name}-end`}
            value={selected?.to ? formatDate(selected.to, 'yyyy-MM-dd') : ''}
          />
        </>
      )}
    </div>
  )
})
