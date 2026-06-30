'use client'

import { Upload } from 'lucide-react'
import { forwardRef, useState, type DragEvent } from 'react'

import { cn } from '@/lib/cn'

import { ControlSurface, controlStateClass } from './control-surface'

export interface FileInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: string
  /** Hint shown under the icon, e.g. "PNG or WEBP, up to 10MB". */
  hint?: string
  onFiles?: (files: FileList) => void
}

/**
 * FileInput — drag-and-drop zone plus click-to-browse, as a Control Surface
 * (Grammar §2). The dropzone is the shared Liquid Glass well (same material as
 * Input), expressed at a larger, centered geometry; the icon + labels sit on the
 * z-3 plane. While a file is dragged over it the control reads as active (the
 * violet caustic rises). The label wraps a visually-hidden native input, so it
 * stays fully keyboard and screen-reader accessible.
 */
export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  function FileInput(
    { className, label = 'Upload a file', hint, onFiles, disabled, ...props },
    ref,
  ) {
    const [dragging, setDragging] = useState(false)

    function handleDrop(e: DragEvent<HTMLLabelElement>) {
      e.preventDefault()
      setDragging(false)
      if (disabled) return
      if (e.dataTransfer.files?.length) onFiles?.(e.dataTransfer.files)
    }

    return (
      <label
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          'ds-glass ds-control relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md p-8 text-center',
          controlStateClass({ focus: dragging, disabled }),
          disabled && 'cursor-not-allowed',
          className,
        )}
      >
        <ControlSurface />
        <Upload
          size={24}
          className="relative z-[3] text-text-tertiary"
          aria-hidden
        />
        <span className="relative z-[3] text-body-sm font-medium text-text">
          {label}
        </span>
        {hint && (
          <span className="relative z-[3] text-caption text-text-tertiary">
            {hint}
          </span>
        )}
        <input
          ref={ref}
          type="file"
          className="sr-only"
          disabled={disabled}
          onChange={(e) => e.target.files?.length && onFiles?.(e.target.files)}
          {...props}
        />
      </label>
    )
  },
)
