'use client'

import { Check } from 'lucide-react'
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import { cn } from '@/lib/cn'

import { ControlSurface, controlStateClass } from './control-surface'
import { Icon } from './icon'
import { Label } from './label'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  /** Muted description shown under the label, above the field. */
  description?: string
  helperText?: string
  /** Error message — sets aria-invalid, turns the machined rim, and takes
   * precedence over `success`/`helperText`. */
  error?: string
  /** Discreet success affordance (a token-coloured check). Never changes the glass
   * — the frozen `.ds-control` has no success rim, so success stays semantic. */
  success?: boolean
  required?: boolean
  /** Show a "current/max" counter (needs `maxLength`) or a bare count. */
  showCharacterCount?: boolean
  /** Grow with content between `minRows` and `maxRows`, then scroll internally. */
  autoResize?: boolean
  /** Minimum visible rows (the resting height). Default 3. */
  minRows?: number
  /** Cap for `autoResize` before the field scrolls. Default 8. */
  maxRows?: number
}

/**
 * Textarea — the multiline Control Surface. A SIBLING of Input (not a bigger
 * Input): both derive from the same parent — GlassSurface → .ds-control →
 * ControlSurface — and share its material verbatim (transmission, blur, refraction,
 * Fresnel, reflections, depth, the recessed well, the focus violet that rises via
 * `.ds-control:focus-within`). Textarea recreates NO glass, NO blur, NO shadow, NO
 * optical layer; the entire material comes from ControlSurface. It differs from
 * Input ONLY by geometry (taller, top-aligned, multiline spacing, vertical/auto
 * resize) and multiline interaction (auto-grow + internal scroll, character count).
 *
 * Typography matches Input (16px body — avoids iOS zoom) with an editorial
 * multiline line-height for reading comfort. The caret and text selection are left
 * to the shared defaults, exactly as Input — no new caret colour or selection
 * treatment is introduced, so the two read as one family. `success` is a semantic
 * indicator (token check), never a glass change: only `error` touches the rim, via
 * the frozen `.ds-control--error`.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      className,
      label,
      description,
      helperText,
      error,
      success = false,
      required,
      showCharacterCount,
      autoResize = false,
      minRows = 3,
      maxRows = 8,
      id,
      disabled,
      readOnly,
      maxLength,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) {
    const autoId = useId()
    const fieldId = id ?? autoId
    const descId = `${fieldId}-desc`
    const helpId = `${fieldId}-help`
    const errorId = `${fieldId}-error`

    const innerRef = useRef<HTMLTextAreaElement | null>(null)
    const [count, setCount] = useState(
      () => String(value ?? defaultValue ?? '').length,
    )

    // Auto-grow between minRows and maxRows, then scroll — never grow infinitely.
    const resize = useCallback(() => {
      const el = innerRef.current
      if (!el || !autoResize) return
      el.style.height = 'auto'
      const cs = getComputedStyle(el)
      const line = parseFloat(cs.lineHeight) || 20
      const maxH = maxRows * line
      const next = Math.min(el.scrollHeight, maxH)
      el.style.height = `${next}px`
      el.style.overflowY = el.scrollHeight > maxH ? 'auto' : 'hidden'
    }, [autoResize, maxRows])

    useLayoutEffect(() => {
      resize()
    }, [resize, value])

    useEffect(() => {
      if (value != null) setCount(String(value).length)
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (value == null) setCount(e.currentTarget.value.length)
      resize()
      onChange?.(e)
    }

    const describedBy =
      cn(description && descId, helperText && helpId, error && errorId) ||
      undefined

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
          className={cn(
            'ds-glass ds-control relative flex rounded-md p-4',
            controlStateClass({ error: Boolean(error), disabled }),
          )}
        >
          <ControlSurface />
          <textarea
            ref={(node) => {
              innerRef.current = node
              if (typeof ref === 'function') ref(node)
              else if (ref) ref.current = node
            }}
            id={fieldId}
            rows={minRows}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              'relative z-[3] w-full bg-transparent text-body leading-relaxed text-text outline-none',
              'placeholder:text-text-tertiary disabled:cursor-not-allowed read-only:cursor-default',
              autoResize ? 'resize-none overflow-hidden' : 'resize-y',
              className,
            )}
            {...props}
          />
        </div>

        {(error || helperText || success || showCharacterCount) && (
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
            ) : helperText ? (
              <span id={helpId} className="text-caption text-text-tertiary">
                {helperText}
              </span>
            ) : (
              <span />
            )}
            {showCharacterCount && (
              <span className="shrink-0 text-caption tabular-nums text-text-tertiary">
                {count}
                {maxLength != null && `/${maxLength}`}
              </span>
            )}
          </div>
        )}
      </div>
    )
  },
)
