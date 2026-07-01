'use client'

import { Check, Search, X } from 'lucide-react'
import { forwardRef, useEffect, useId, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

import { Icon } from './icon'
import { Input } from './input'
import { Label } from './label'
import { Spinner } from './spinner'

export interface SearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'prefix' | 'type'
> {
  label?: string
  /** Muted description under the label. */
  description?: string
  helperText?: string
  /** Error message — inherited from Input (turns the frozen `.ds-control--error`
   * rim). Takes precedence over `success`/`helperText`. */
  error?: string
  /** Discreet success affordance (token check) — never a glass change. */
  success?: boolean
  required?: boolean
  /** Show a clear (×) button while the field holds text. */
  clearable?: boolean
  /** Swap the trailing affordance for a spinner while results load. Geometry is
   * unchanged (the spinner occupies the same slot as the clear button). */
  loading?: boolean
  /** Optional keyboard-shortcut hint shown at rest (e.g. "⌘K"). Display-only,
   * hidden while typing so it never interferes; hidden on touch widths. */
  shortcut?: string
  /** Debounce the `onSearch` callback (ms). Never delays text rendering. */
  debounce?: number
  /** Called with the current query — debounced by `debounce`, and immediately on
   * clear/Escape. */
  onSearch?: (value: string) => void
  /** Called when the field is cleared (× or Escape) — reset a controlled value. */
  onClear?: () => void
}

/**
 * SearchInput — the search specialization of Input. A DIRECT derivation:
 * GlassSurface → .ds-control → ControlSurface → Input → SearchInput. It renders
 * `<Input>` and adds ONLY search affordances into Input's prefix/suffix slots (a
 * muted leading magnifier, and a trailing clear / loading / shortcut cluster) plus
 * search behaviour (debounced `onSearch`, Escape-to-clear, `role="search"`). It
 * recreates NO glass, blur, shadow, Fresnel or optical layer — the field, material,
 * states and validation all come from Input (which comes from ControlSurface).
 *
 * Typing is never delayed: only the `onSearch` callback is debounced; the input
 * renders every keystroke immediately. The clear button reuses the frozen Button
 * interaction language (press-scale, focus ring, standard easing) — no new button
 * style, no glass-on-glass. Loading swaps the same slot for a Spinner without
 * changing geometry. `success` / `description` are semantic (tokens), never glass.
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      className,
      label,
      description,
      helperText,
      error,
      success = false,
      required,
      clearable = false,
      loading = false,
      shortcut,
      debounce = 0,
      onSearch,
      onClear,
      value,
      defaultValue,
      onChange,
      onKeyDown,
      disabled,
      readOnly,
      id,
      ...props
    },
    ref,
  ) {
    const autoId = useId()
    const inputId = id ?? autoId
    const descId = `${inputId}-desc`

    const innerRef = useRef<HTMLInputElement | null>(null)
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
    const [internal, setInternal] = useState(() =>
      String(value ?? defaultValue ?? ''),
    )
    const current = value != null ? String(value) : internal
    const hasValue = current.length > 0

    useEffect(() => () => clearTimeout(timer.current), [])

    const fireSearch = (v: string, immediate = false) => {
      if (!onSearch) return
      clearTimeout(timer.current)
      if (immediate || !debounce) onSearch(v)
      else timer.current = setTimeout(() => onSearch(v), debounce)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value == null) setInternal(e.target.value)
      onChange?.(e)
      fireSearch(e.target.value)
    }

    const doClear = () => {
      if (value == null) setInternal('')
      onClear?.()
      fireSearch('', true)
      innerRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape' && hasValue) {
        e.preventDefault()
        doClear()
      }
      onKeyDown?.(e)
    }

    const cluster = loading ? (
      <Spinner size="sm" label="Searching" />
    ) : clearable && hasValue ? (
      <button
        type="button"
        onClick={doClear}
        aria-label="Clear search"
        disabled={disabled}
        className={cn(
          'inline-flex h-8 w-8 items-center justify-center rounded-pill text-text-tertiary opacity-80',
          'outline-none transition-transform duration-fast ease-standard hover:text-text hover:opacity-100',
          'focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-accent-accessible',
          'active:scale-90 motion-reduce:active:scale-100 disabled:pointer-events-none',
        )}
      >
        <Icon icon={X} size="sm" aria-hidden />
      </button>
    ) : shortcut && !hasValue ? (
      <kbd className="pointer-events-none hidden h-5 select-none items-center rounded-[3px] border border-border bg-surface px-1 text-[11px] font-medium text-text-tertiary opacity-70 sm:inline-flex">
        {shortcut}
      </kbd>
    ) : null

    return (
      <div className="flex flex-col gap-2" role="search">
        {label && (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        )}
        {description && (
          <span id={descId} className="text-caption text-text-tertiary">
            {description}
          </span>
        )}

        <Input
          ref={(node) => {
            innerRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          id={inputId}
          type="search"
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          readOnly={readOnly}
          error={error}
          helperText={success ? undefined : helperText}
          aria-label={label ? undefined : 'Search'}
          prefix={<Icon icon={Search} size="sm" aria-hidden />}
          suffix={cluster}
          className={cn(
            '[&::-webkit-search-cancel-button]:appearance-none',
            className,
          )}
          {...props}
        />

        {success && !error && (
          <span className="inline-flex items-center gap-1 text-body-sm text-success">
            <Icon icon={Check} size="sm" aria-hidden />
            {helperText}
          </span>
        )}
      </div>
    )
  },
)
