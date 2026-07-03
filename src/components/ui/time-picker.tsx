'use client'

import { Clock } from 'lucide-react'
import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'

import { cn } from '@/lib/cn'

import {
  controlOptionDisabledClass,
  controlOptionHighlightClass,
  controlOptionRowClass,
} from './control-surface'
import { Icon } from './icon'
import { Input } from './input'
import { Label } from './label'
import { Popover } from './popover'
import { Spinner } from './spinner'

/**
 * Time Picker — select an hour (and optionally minutes) representing exactly
 * ONE point-in-time value. Not Date Picker: a date is a point on a calendar
 * grid (month/year navigation, a day matrix) — a time has no such structure,
 * it is two small bounded numbers (0-23, 0-59) best scanned as short scrolling
 * lists, not a grid. Not Calendar: Calendar IS the day-grid Date Picker
 * delegates to; Time Picker has no calendar concept at all. Not Select: a
 * Select's options are an arbitrary, often-unordered domain list; Time
 * Picker's two "lists" are a fixed numeric range with a single valid typed
 * format, and — unlike Select — the field is directly type-in-able. Not
 * Combobox/Autocomplete: neither resolves free text against a bounded 0-23/
 * 0-59 numeric grammar with automatic hour→minute progression; both exist to
 * search or complete arbitrary strings, not to parse a fixed clock format.
 * Not Input: a raw text Input has no popup, no keyboard-drivable scrolling
 * list, and no built-in 24h parsing/validation — Time Picker adds exactly
 * that behavior on top of Input, it does not replace it (the trigger IS an
 * Input). Not Number Input: a number has no format, no colon, no two-part
 * structure, and no popup metaphor. Not Clock: a Clock only DISPLAYS the
 * current time, read-only, ticking — it never accepts a value. Not Duration
 * Picker: a duration is an ELAPSED span (e.g. "45 min") with no fixed origin
 * and no AM/PM concept; a time is anchored to a single day's 24h cycle. Not
 * Scheduler: a Scheduler is a page-level composition (calendar + time slots +
 * conflicts) built AROUND fields like this one. Not Time Range Picker: a
 * range is two Time Pickers plus a start<end invariant — a layout/validation
 * concern for a consumer composing two of these, not this field's job.
 *
 *   the frozen optical-layer stack → Control Surface → Time Picker → Input
 *   → Popover → Scrollable hour/minute lists → Selectable row
 *
 * The trigger is Input itself (not its classes rebuilt) — label, description
 * (added by Time Picker, like Combobox/Autocomplete), error/helperText, the
 * `.ds-glass .ds-control` well, all inherited for free. The popup is the
 * frozen `<Popover/>` component (Floating Surface material) — unlike
 * Combobox/MultiSelect/Autocomplete, which reuse the raised Control Surface
 * popup recipe extracted from Select, Time Picker's popup is a genuinely
 * separate, self-contained picker (no relationship to Select's row list at
 * all beyond borrowing its highlight language), so composing the actual
 * frozen Popover is the more honest, more reused option. Rows reuse the
 * frozen Select row's own visual language (`controlOptionRowClass`/
 * `controlOptionHighlightClass`/`controlOptionDisabledClass`, already
 * extracted for Combobox/MultiSelect — zero new export needed).
 *
 * The canonical value is ALWAYS a 24h "HH:mm" string — the only format this
 * component parses, stores or emits. A future 12h/AM-PM DISPLAY mode is a
 * pure formatting concern layered on top of this same canonical value (an
 * eventual `hourCycle`/`period` prop would only change how the trigger text
 * and the hour column render — never the stored value, never the popup's
 * two-list architecture), so today's absence of AM/PM cannot break anything
 * later.
 */

export type TimePickerGranularity = 'hour' | 'minute'

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

function formatValue(hour: number, minute: number) {
  return `${pad2(hour)}:${pad2(minute)}`
}

/** Accepts "H", "HH", "H:MM", "HH:MM" — the only shapes a typed 24h time can
 * take. Returns undefined for anything else (out of range included). */
function parseTime(text: string) {
  const match = text.trim().match(/^(\d{1,2}):?(\d{2})?$/)
  if (!match) return undefined
  const hour = Number(match[1])
  const minute = match[2] ? Number(match[2]) : 0
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return undefined
  return { hour, minute }
}

function minutesSinceMidnight(hour: number, minute: number) {
  return hour * 60 + minute
}

export interface TimePickerProps {
  /** Canonical 24h "HH:mm" value. */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** `hour` hides the minute column and rounds to :00. */
  granularity?: TimePickerGranularity
  /** Minute list step (e.g. 5, 15, 30). Ignored when granularity is `hour`. */
  minuteStep?: number
  /** Earliest selectable "HH:mm" (inclusive). */
  minTime?: string
  /** Latest selectable "HH:mm" (inclusive). */
  maxTime?: string
  label?: string
  description?: string
  helperText?: string
  error?: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  /** Swap the clock icon for a spinner and block opening while, e.g., a
   * remote availability calendar loads. */
  loading?: boolean
  placeholder?: string
  className?: string
  id?: string
  name?: string
  'aria-label'?: string
  'data-testid'?: string
}

export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  function TimePicker(
    {
      value,
      defaultValue,
      onValueChange,
      granularity = 'minute',
      minuteStep = 5,
      minTime,
      maxTime,
      label,
      description,
      helperText,
      error,
      required,
      disabled,
      readOnly,
      loading = false,
      placeholder = 'HH:mm',
      className,
      id,
      name,
      'aria-label': ariaLabel,
      'data-testid': dataTestId,
    },
    ref,
  ) {
    const autoId = useId()
    const fieldId = id ?? autoId
    const descId = `${fieldId}-desc`
    const listboxId = `${fieldId}-listbox`
    const isDisabled = Boolean(disabled || loading)

    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue ?? '')
    const currentValue = isControlled ? value : internalValue
    const committed = currentValue ? parseTime(currentValue) : undefined

    const [draft, setDraft] = useState(currentValue ?? '')
    const [open, setOpen] = useState(false)

    // Resync the typed text whenever the committed value changes while the
    // popup is closed (mirrors the same open-gated resync used by the
    // frozen Combobox), so an external controlled update is reflected, and
    // closing (Escape/outside click/selection) always reverts any
    // never-committed keystrokes.
    useEffect(() => {
      if (!open) setDraft(currentValue ?? '')
    }, [currentValue, open])

    const minBound = minTime ? parseTime(minTime) : undefined
    const maxBound = maxTime ? parseTime(maxTime) : undefined

    function isHourDisabled(hour: number) {
      if (minBound && hour < minBound.hour) return true
      if (maxBound && hour > maxBound.hour) return true
      return false
    }

    function isMinuteDisabled(hour: number, minute: number) {
      const total = minutesSinceMidnight(hour, minute)
      if (
        minBound &&
        total < minutesSinceMidnight(minBound.hour, minBound.minute)
      )
        return true
      if (
        maxBound &&
        total > minutesSinceMidnight(maxBound.hour, maxBound.minute)
      )
        return true
      return false
    }

    const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), [])
    const minutes = useMemo(
      () =>
        Array.from(
          { length: Math.ceil(60 / minuteStep) },
          (_, i) => i * minuteStep,
        ),
      [minuteStep],
    )

    function commit(hour: number, minute: number) {
      const next = formatValue(hour, granularity === 'hour' ? 0 : minute)
      if (!isControlled) setInternalValue(next)
      onValueChange?.(next)
      // Keep the field's text live even while the popup stays open waiting
      // for the minute pick, so a partial selection is never invisible.
      setDraft(next)
    }

    function selectHour(hour: number) {
      if (isDisabled || readOnly || isHourDisabled(hour)) return
      if (granularity === 'hour') {
        commit(hour, 0)
        setOpen(false)
      } else {
        commit(hour, committed?.minute ?? 0)
      }
    }

    function selectMinute(minute: number) {
      if (isDisabled || readOnly) return
      const hour = committed?.hour ?? 0
      if (isMinuteDisabled(hour, minute)) return
      commit(hour, minute)
      setOpen(false)
    }

    function handleInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
      if (isDisabled || readOnly) return
      if (e.key === 'Enter') {
        const parsed = parseTime(draft)
        if (parsed) commit(parsed.hour, parsed.minute)
        setOpen(false)
      } else if (e.key === 'Escape') {
        setOpen(false)
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        if (!open) {
          setOpen(true)
          return
        }
        // Popup already open — a second Arrow press hands keyboard
        // reachability from the field to the hour column, landing on the
        // committed hour (or the first row).
        hourRefs.current[committed?.hour ?? 0]?.focus()
      }
    }

    const hourRefs = useRef<(HTMLButtonElement | null)[]>([])
    const minuteRefs = useRef<(HTMLButtonElement | null)[]>([])

    useEffect(() => {
      if (!open) return
      // The popup mounts through Radix's own Presence lifecycle one frame
      // after `open` flips true, so the row refs are not yet attached in
      // this same commit — defer one frame (irreducible browser scheduling
      // API, not a decorative motion effect).
      const raf = requestAnimationFrame(() => {
        hourRefs.current[committed?.hour ?? 0]?.scrollIntoView({
          block: 'center',
        })
        const minuteIndex = minutes.findIndex(
          (m) => m === (committed?.minute ?? 0),
        )
        if (minuteIndex >= 0)
          minuteRefs.current[minuteIndex]?.scrollIntoView({ block: 'center' })
      })
      return () => cancelAnimationFrame(raf)
    }, [open, committed?.hour, committed?.minute, minutes])

    function handleRowKeyDown(
      e: KeyboardEvent<HTMLButtonElement>,
      column: 'hour' | 'minute',
      index: number,
      length: number,
    ) {
      const refs = column === 'hour' ? hourRefs : minuteRefs
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        refs.current[Math.min(index + 1, length - 1)]?.focus()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        refs.current[Math.max(index - 1, 0)]?.focus()
      } else if (e.key === 'Home') {
        e.preventDefault()
        refs.current[0]?.focus()
      } else if (e.key === 'End') {
        e.preventDefault()
        refs.current[length - 1]?.focus()
      } else if (
        e.key === 'ArrowRight' &&
        column === 'hour' &&
        granularity === 'minute'
      ) {
        e.preventDefault()
        const minuteIndex = Math.max(
          minutes.findIndex((m) => m === (committed?.minute ?? 0)),
          0,
        )
        minuteRefs.current[minuteIndex]?.focus()
      } else if (e.key === 'ArrowLeft' && column === 'minute') {
        e.preventDefault()
        hourRefs.current[committed?.hour ?? 0]?.focus()
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
        <Popover
          open={open}
          onOpenChange={isDisabled || readOnly ? undefined : setOpen}
        >
          <Popover.Anchor>
            <Input
              ref={ref}
              id={fieldId}
              data-testid={dataTestId}
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-controls={listboxId}
              aria-describedby={description ? descId : undefined}
              aria-label={label ? undefined : ariaLabel}
              autoComplete="off"
              value={draft}
              placeholder={placeholder}
              disabled={isDisabled}
              readOnly={readOnly}
              aria-required={required || undefined}
              error={error}
              helperText={helperText}
              className={className}
              onFocus={() => {
                if (!isDisabled && !readOnly) setOpen(true)
              }}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleInputKeyDown}
              suffix={
                loading ? (
                  <Spinner size="sm" label="Loading" />
                ) : (
                  <Icon icon={Clock} className="text-text-tertiary" />
                )
              }
            />
          </Popover.Anchor>

          <Popover.Content
            size="xs"
            align="start"
            sideOffset={8}
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="w-auto p-2"
          >
            <div id={listboxId} className="flex max-h-64 gap-1">
              <div
                role="listbox"
                aria-label="Hour"
                className="flex max-h-64 flex-col overflow-y-auto"
              >
                {hours.map((hour, index) => (
                  <button
                    key={hour}
                    ref={(el) => {
                      hourRefs.current[index] = el
                    }}
                    type="button"
                    role="option"
                    aria-selected={hour === committed?.hour}
                    disabled={isHourDisabled(hour)}
                    onClick={() => selectHour(hour)}
                    onKeyDown={(e) =>
                      handleRowKeyDown(e, 'hour', index, hours.length)
                    }
                    className={cn(
                      controlOptionRowClass,
                      'justify-center pl-3 tabular-nums',
                      hour === committed?.hour && controlOptionHighlightClass,
                      isHourDisabled(hour) && controlOptionDisabledClass,
                    )}
                  >
                    {pad2(hour)}
                  </button>
                ))}
              </div>
              {granularity === 'minute' && (
                <div
                  role="listbox"
                  aria-label="Minute"
                  className="flex max-h-64 flex-col overflow-y-auto"
                >
                  {minutes.map((minute, index) => (
                    <button
                      key={minute}
                      ref={(el) => {
                        minuteRefs.current[index] = el
                      }}
                      type="button"
                      role="option"
                      aria-selected={minute === committed?.minute}
                      disabled={isMinuteDisabled(committed?.hour ?? 0, minute)}
                      onClick={() => selectMinute(minute)}
                      onKeyDown={(e) =>
                        handleRowKeyDown(e, 'minute', index, minutes.length)
                      }
                      className={cn(
                        controlOptionRowClass,
                        'justify-center pl-3 tabular-nums',
                        minute === committed?.minute &&
                          controlOptionHighlightClass,
                        isMinuteDisabled(committed?.hour ?? 0, minute) &&
                          controlOptionDisabledClass,
                      )}
                    >
                      {pad2(minute)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Popover.Content>
        </Popover>
        {name && <input type="hidden" name={name} value={currentValue ?? ''} />}
      </div>
    )
  },
)
