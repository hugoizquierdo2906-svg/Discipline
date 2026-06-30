'use client'

import { Upload } from 'lucide-react'
import { forwardRef, useState, type DragEvent } from 'react'

import { cn } from '@/lib/cn'

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
 * FileInput — drag-and-drop zone plus click-to-browse. The visible dropzone is
 * a label wrapping a visually-hidden native input, so it stays fully keyboard
 * and screen-reader accessible.
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
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center',
          'transition-colors duration-fast ease-standard focus-within:border-accent-accessible',
          dragging
            ? 'border-accent bg-accent-subtle'
            : 'border-border-strong bg-surface',
          disabled && 'cursor-not-allowed opacity-40',
          className,
        )}
      >
        <Upload size={24} className="text-text-tertiary" aria-hidden />
        <span className="text-body-sm font-medium text-text">{label}</span>
        {hint && (
          <span className="text-caption text-text-tertiary">{hint}</span>
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
