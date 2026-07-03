'use client'

import { Check, Copy, Palette } from 'lucide-react'
import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ForwardedRef,
  type KeyboardEvent,
} from 'react'

import { cn } from '@/lib/cn'

import { Icon } from './icon'
import { IconButton } from './icon-button'
import { Input } from './input'
import { Label } from './label'
import { Popover } from './popover'
import { Spinner } from './spinner'

/**
 * Color Picker — a form field committing exactly ONE color value, chosen
 * visually from a palette or entered as hex. Not Input: a raw text Input has
 * no swatch preview, no palette, no popup, no color grammar — Color Picker
 * adds exactly that ON TOP of Input (the trigger IS an Input), it does not
 * replace it. Not Select: Select's options are labeled text rows; a color is
 * chosen by SEEING it, not by reading a name, and free hex entry means the
 * domain is open, not a closed list. Not Combobox/Autocomplete: nothing is
 * searched or completed — hex entry is a FORMAT (a fixed 6-digit grammar),
 * not a query against candidates. Not Radio Group / Segmented Control: both
 * present a small closed set of labeled, always-visible choices; the palette
 * is only a shortcut inside an open value space. Not Palette / Swatch Grid:
 * those are the DISPLAY structures this field composes internally — a grid
 * of swatches holds no field, no popup, no committed value. Not Theme
 * Selector: a theme is an app-level MODE (a named bundle of many tokens);
 * this commits one literal color value into one field. Not Gradient Editor:
 * a gradient is a composition of several colors + stops + a direction — a
 * different value type built ON TOP of single-color picking. Not Opacity
 * Slider: alpha is one CHANNEL of a color, not a color; (see the alpha note
 * below). Not RGB Editor / HSL Editor: channel-by-channel numeric editing
 * surfaces for one color SPACE — alternate input formats a future extension
 * could add INSIDE this same panel, never siblings. Not Hex Input: the hex
 * field is one internal organ of this component — alone it has no palette,
 * no preview, no popup. Not Eyedropper: sampling a pixel from the screen is
 * a capture TOOL (needs `EyeDropper`/canvas access), not a form field. Not
 * Canvas Editor / Image Picker: free-form drawing or file selection —
 * entirely different value types. Not MultiSelect: ONE color, never a
 * collection. Not Form Group: one field, one logical value — the palette,
 * the hex field and the copy action are the value's own input organs, not
 * independent fields.
 *
 *   the frozen optical-layer stack → Control Surface → Color Picker
 *   → Input (trigger) → Popover (frozen Floating pane) → Palette listbox
 *   + Hex Input + Copy IconButton
 *
 * The trigger is Input itself (not its classes rebuilt) — the
 * `.ds-glass .ds-control` well, error/helperText meta row, prefix/suffix
 * slots all inherited for free; the current color sits in Input's own
 * prefix slot as a small swatch, the displayed text is the committed hex,
 * never free-typed (typing happens in the panel's dedicated hex field —
 * frozen DatePicker/DateRangePicker trigger convention). The panel is the
 * actual frozen `<Popover/>` component (Floating Surface material — the
 * TimePicker precedent); inside it: a palette of swatch options
 * (role="listbox"/"option" with the Select family's check-mark = selected
 * language), the real frozen Input for hex entry, and the real frozen
 * IconButton for copying the value. Palette and hex field are perfectly
 * synchronized both ways: picking a swatch rewrites the hex field; a valid
 * typed hex re-selects its swatch when the color is in the palette. The
 * panel STAYS OPEN across picks (color choice is iterative — you adjust
 * while seeing the result; MultiSelect precedent), closing on Escape /
 * outside interaction.
 *
 * The canonical value is ALWAYS a `#RRGGBB` uppercase string — the only
 * format this component parses, stores or emits ('' when empty). Alpha is
 * deliberately NOT implemented today: an opaque color and a translucent
 * color are the same value TYPE (an eventual `alpha` prop would extend the
 * canonical string to `#RRGGBBAA` and add one opacity row — the frozen
 * Slider — inside this same panel, changing neither the trigger, the
 * palette grammar nor the hex synchronization), so today's absence cannot
 * break anything later.
 *
 * Swatch backgrounds are set from the palette DATA (`style.backgroundColor`
 * = the candidate value itself) — they are the content being chosen, like a
 * Select option's label or an Avatar's image, never part of this
 * component's own material, which remains 100% frozen-token glass.
 */

/* eslint-disable no-restricted-syntax --
 * This palette is the field's VALUE DOMAIN: user-facing color DATA the
 * component exists to pick between (a Select's options, an Avatar's image).
 * None of these literals paints any part of the component's own material —
 * that stays token-pure. The Phase-02 rule exists to keep MATERIAL on
 * tokens; candidate values are the one legitimate home for color literals
 * outside token files. */
export const colorPickerDefaultPalette = [
  '#8B7CFF',
  '#EF4444',
  '#F97316',
  '#F59E0B',
  '#EAB308',
  '#84CC16',
  '#22C55E',
  '#10B981',
  '#14B8A6',
  '#06B6D4',
  '#0EA5E9',
  '#3B82F6',
  '#6366F1',
  '#A855F7',
  '#EC4899',
  '#F43F5E',
  '#FFFFFF',
  '#D1D5DB',
  '#9CA3AF',
  '#6B7280',
  '#4B5563',
  '#374151',
  '#1F2937',
  '#111827',
]
/* eslint-enable no-restricted-syntax */

const PALETTE_COLUMNS = 8

/** Accepts "RGB", "#RGB", "RRGGBB", "#RRGGBB" — the only shapes a typed hex
 * color can take. Returns the canonical `#RRGGBB` uppercase form, or
 * undefined for anything else. */
export function normalizeHex(text: string): string | undefined {
  const match = text.trim().match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)
  const captured = match?.[1]
  if (!captured) return undefined
  let hex = captured
  if (hex.length === 3)
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('')
  return `#${hex.toUpperCase()}`
}

/** Perceived-brightness check so the selected check-mark stays legible on
 * any swatch (the mark is drawn over DATA, not over material). */
function isLight(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 150
}

export interface ColorPickerProps {
  /** Canonical `#RRGGBB` value ('' when empty). */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Candidate swatches shown in the panel. Any valid hex remains typeable
   * regardless — the palette is a shortcut, not a constraint. */
  palette?: string[]
  label?: string
  description?: string
  placeholder?: string
  helperText?: string
  error?: string
  invalid?: boolean
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  /** Swap the trigger icon for a spinner and block opening. */
  loading?: boolean
  autoFocus?: boolean
  /** Renders a hidden field carrying the committed hex for native form
   * submission. */
  name?: string
  className?: string
  id?: string
  'aria-label'?: string
  'data-testid'?: string
}

export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(
  function ColorPicker(
    {
      value,
      defaultValue,
      onValueChange,
      palette = colorPickerDefaultPalette,
      label,
      description,
      placeholder = 'Select a color',
      helperText,
      error,
      invalid,
      required,
      disabled,
      readOnly,
      loading = false,
      autoFocus,
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
    const panelId = `${fieldId}-panel`
    const isInvalid = Boolean(invalid || error)
    const isDisabled = Boolean(disabled || loading)

    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue ?? '')
    const currentValue = isControlled ? value : internalValue

    const [open, setOpen] = useState(false)
    const [draft, setDraft] = useState(currentValue)
    const [copied, setCopied] = useState(false)

    const inputRef = useRef<HTMLInputElement | null>(null)
    const anchorRef = useRef<HTMLDivElement | null>(null)
    const swatchRefs = useRef<(HTMLButtonElement | null)[]>([])
    const copyTimer = useRef<number | undefined>(undefined)

    function setRefs(node: HTMLInputElement | null) {
      inputRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    }

    // Keep the hex field mirroring the committed value: on every commit
    // (swatch pick or valid typed hex) and whenever the panel opens or
    // closes. Partial typing never triggers this (currentValue only moves
    // on commits), so it can't clobber text mid-edit.
    useEffect(() => {
      setDraft(currentValue)
    }, [currentValue, open])

    function commitColor(next: string) {
      if (!isControlled) setInternalValue(next)
      onValueChange?.(next)
    }

    function openPicker() {
      if (!isDisabled && !readOnly) setOpen(true)
    }

    function handleTriggerKeyDown(e: KeyboardEvent<HTMLInputElement>) {
      if (isDisabled || readOnly) return
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setOpen(true)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    function handleSwatchKeyDown(
      e: KeyboardEvent<HTMLButtonElement>,
      index: number,
    ) {
      const count = palette.length
      let next = -1
      if (e.key === 'ArrowRight') next = Math.min(index + 1, count - 1)
      else if (e.key === 'ArrowLeft') next = Math.max(index - 1, 0)
      else if (e.key === 'ArrowDown')
        next = Math.min(index + PALETTE_COLUMNS, count - 1)
      else if (e.key === 'ArrowUp') next = Math.max(index - PALETTE_COLUMNS, 0)
      else if (e.key === 'Home') next = 0
      else if (e.key === 'End') next = count - 1
      else return
      e.preventDefault()
      swatchRefs.current[next]?.focus()
    }

    function handleDraftChange(text: string) {
      setDraft(text)
      // Live sync: a complete 6-digit hex commits as it is typed (the
      // 3-digit shorthand only commits on Enter, so typing the first three
      // digits of a full value never commits a wrong intermediate color).
      if (/^#?[0-9a-fA-F]{6}$/.test(text.trim())) {
        const parsed = normalizeHex(text)
        if (parsed) commitColor(parsed)
      }
    }

    function handleDraftKeyDown(e: KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Enter') {
        e.preventDefault()
        const parsed = normalizeHex(draft)
        if (parsed) {
          commitColor(parsed)
          setDraft(parsed)
        } else {
          setDraft(currentValue)
        }
      }
    }

    async function copyValue() {
      if (!currentValue) return
      try {
        await navigator.clipboard.writeText(currentValue)
      } catch {
        // Clipboard access denied — the visual confirmation simply doesn't
        // show; nothing else to do.
        return
      }
      setCopied(true)
      window.clearTimeout(copyTimer.current)
      copyTimer.current = window.setTimeout(() => setCopied(false), 1500)
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
          onOpenChange={(next) => {
            if (next) openPicker()
            else setOpen(false)
          }}
        >
          <Popover.Anchor ref={anchorRef}>
            <Input
              ref={setRefs}
              id={fieldId}
              data-testid={dataTestId}
              type="text"
              role="combobox"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls={panelId}
              aria-describedby={description ? descId : undefined}
              aria-invalid={isInvalid || undefined}
              aria-required={required || undefined}
              aria-readonly={readOnly || undefined}
              aria-label={label ? undefined : ariaLabel}
              autoComplete="off"
              // The field displays the committed hex; typing happens in the
              // panel's dedicated hex field (frozen DatePicker convention).
              readOnly
              // The consumer opts in explicitly — never on by default.
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={autoFocus}
              value={currentValue}
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
              onKeyDown={handleTriggerKeyDown}
              prefix={
                <span
                  aria-hidden
                  data-testid={dataTestId ? `${dataTestId}-preview` : undefined}
                  className="h-5 w-5 rounded-sm border border-border"
                  style={
                    currentValue ? { backgroundColor: currentValue } : undefined
                  }
                />
              }
              suffix={
                loading ? (
                  <Spinner size="sm" label="Loading" />
                ) : (
                  <Icon icon={Palette} className="text-text-tertiary" />
                )
              }
            />
          </Popover.Anchor>

          <Popover.Content
            id={panelId}
            role="dialog"
            aria-label={label ?? ariaLabel ?? 'Choose a color'}
            size="xs"
            align="start"
            sideOffset={8}
            onOpenAutoFocus={(e) => {
              // Land keyboard users directly on the current swatch (or the
              // first one). Deferred one frame: the pane mounts through
              // Radix's Presence lifecycle (TimePicker precedent).
              e.preventDefault()
              const index = Math.max(palette.indexOf(currentValue), 0)
              requestAnimationFrame(() => {
                swatchRefs.current[index]?.focus()
              })
            }}
            onInteractOutside={(e) => {
              // Clicking the field while open must not close-and-reopen —
              // the field is this panel's own anchor, not "outside".
              if (anchorRef.current?.contains(e.target as Node))
                e.preventDefault()
            }}
            onCloseAutoFocus={(e) => {
              // Reachability moved into the panel while open; hand it back
              // to the field on close (no Radix Trigger exists to do it —
              // the anchor is Input itself).
              e.preventDefault()
              inputRef.current?.focus()
            }}
            className="w-auto p-3"
          >
            <div className="flex flex-col gap-3">
              <div
                role="listbox"
                aria-label={
                  label ? `${label} palette` : (ariaLabel ?? 'Palette')
                }
                className="grid grid-cols-8 gap-1.5"
              >
                {palette.map((color, index) => (
                  <button
                    key={color}
                    ref={(el) => {
                      swatchRefs.current[index] = el
                    }}
                    type="button"
                    role="option"
                    aria-selected={color === currentValue}
                    aria-label={color}
                    data-testid={
                      dataTestId ? `${dataTestId}-swatch-${index}` : undefined
                    }
                    onClick={() => commitColor(color)}
                    onKeyDown={(e) => handleSwatchKeyDown(e, index)}
                    className="flex h-6 w-6 items-center justify-center rounded-sm border border-border"
                    style={{ backgroundColor: color }}
                  >
                    {color === currentValue && (
                      <Icon
                        icon={Check}
                        size="sm"
                        aria-hidden
                        className={isLight(color) ? 'text-black' : 'text-white'}
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Input
                  aria-label="Hex value"
                  data-testid={dataTestId ? `${dataTestId}-hex` : undefined}
                  autoComplete="off"
                  spellCheck={false}
                  value={draft}
                  placeholder="#RRGGBB"
                  className="uppercase"
                  onChange={(e) => handleDraftChange(e.target.value)}
                  onKeyDown={handleDraftKeyDown}
                />
                <IconButton
                  label={copied ? 'Copied' : 'Copy color'}
                  size="sm"
                  data-testid={dataTestId ? `${dataTestId}-copy` : undefined}
                  disabled={!currentValue}
                  onClick={copyValue}
                  icon={
                    <Icon
                      icon={copied ? Check : Copy}
                      size="sm"
                      className={copied ? 'text-success' : undefined}
                    />
                  }
                />
              </div>
            </div>
          </Popover.Content>
        </Popover>

        {name && <input type="hidden" name={name} value={currentValue} />}
      </div>
    )
  },
)
