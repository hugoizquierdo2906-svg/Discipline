import { Search, X } from 'lucide-react'
import { forwardRef, useId } from 'react'

import { cn } from '@/lib/cn'

import {
  ControlSurface,
  controlAdornmentClass,
  controlFieldClass,
  controlHostClass,
  controlStateClass,
} from './control-surface'

export interface SearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'prefix'
> {
  /** Accessible label (visually hidden if no visible label is used). */
  label?: string
  /** Called when the clear (×) affordance is pressed. */
  onClear?: () => void
}

/**
 * SearchInput — a Control Surface (Grammar §2) for search. Same material and
 * geometry as Input (the validated reference), with a leading search glyph and
 * an optional trailing clear affordance on the z-3 plane. type="search" for
 * platform semantics; the violet caustic rises on focus.
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    { className, label = 'Search', onClear, value, disabled, id, ...props },
    ref,
  ) {
    const autoId = useId()
    const inputId = id ?? autoId
    const hasValue =
      typeof value === 'string' ? value.length > 0 : value != null

    return (
      <div className={cn(controlHostClass, controlStateClass({ disabled }))}>
        <ControlSurface />
        <Search size={16} className={controlAdornmentClass} aria-hidden />
        <input
          ref={ref}
          id={inputId}
          type="search"
          value={value}
          disabled={disabled}
          aria-label={label}
          className={cn(
            controlFieldClass,
            '[&::-webkit-search-cancel-button]:appearance-none',
            className,
          )}
          {...props}
        />
        {onClear && hasValue && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            disabled={disabled}
            className={cn(controlAdornmentClass, 'cursor-pointer')}
          >
            <X size={16} aria-hidden />
          </button>
        )}
      </div>
    )
  },
)
