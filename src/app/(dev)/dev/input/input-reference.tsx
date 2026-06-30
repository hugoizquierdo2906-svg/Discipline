import { GlassSurface } from '@/components/ui/glass-surface'

import './input.css'

/**
 * InputReference — the single Control Surface reference (isolated dev component).
 * Built from the SAME optical layers as the frozen Button (it renders the shared
 * <GlassSurface/>), expressed as a recessed, discreet field: high transmission so
 * content reads, inverted light (encastré), and the button's violet caustic shown
 * only on focus — light caught inside the material, not an outline. The recessed
 * Control Surface expression lives in input.css, scoped to `.ci-field`; the
 * library material is not modified.
 */
export function InputReference({
  label,
  placeholder,
  defaultValue,
  helper,
  error,
  state,
  leadingIcon,
  id,
}: {
  label: string
  placeholder?: string
  defaultValue?: string
  helper?: string
  error?: string
  /** Force a visual state for the static proof (focus is otherwise interactive). */
  state?: 'focus' | 'error' | 'disabled'
  leadingIcon?: React.ReactNode
  id: string
}) {
  const helpId = `${id}-help`
  const fieldClass = [
    'ci-field ds-glass',
    state === 'focus' && 'ci-field--focus',
    (error || state === 'error') && 'ci-field--error',
    state === 'disabled' && 'ci-field--disabled',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="ci-group">
      <label className="ci-label" htmlFor={id}>
        {label}
      </label>
      <div className={fieldClass}>
        <GlassSurface />
        {leadingIcon && (
          <span className="ci-field__icon" aria-hidden>
            {leadingIcon}
          </span>
        )}
        <input
          id={id}
          className="ci-field__input"
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={state === 'disabled'}
          aria-invalid={error ? true : undefined}
          aria-describedby={helper || error ? helpId : undefined}
        />
      </div>
      {error ? (
        <span id={helpId} className="ci-error">
          {error}
        </span>
      ) : helper ? (
        <span id={helpId} className="ci-helper">
          {helper}
        </span>
      ) : null}
    </div>
  )
}
