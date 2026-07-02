'use client'

import {
  Check,
  File as FileIcon,
  FileText,
  Film,
  Image as ImageIcon,
  Upload,
  X,
} from 'lucide-react'
import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ClipboardEvent,
  type DragEvent,
  type ReactNode,
} from 'react'

import { cn } from '@/lib/cn'

import { ControlSurface, controlStateClass } from './control-surface'
import { Icon } from './icon'
import { IconButton } from './icon-button'
import { Label } from './label'
import { Progress } from './progress'

export interface FileRejection {
  file: File
  reason: 'size' | 'type' | 'count'
}

export interface FileInputProps {
  label?: string
  description?: string
  helperText?: string
  error?: string
  success?: boolean
  disabled?: boolean
  required?: boolean
  readOnly?: boolean
  /** Allow selecting more than one file. */
  multiple?: boolean
  /** Native accept string — extensions (`.png`), mime types (`application/pdf`)
   * or wildcards (`image/*`), comma-separated. Drives validation too. */
  accept?: string
  /** Cap the total number of kept files (drops beyond it are rejected). */
  maxFiles?: number
  /** Max size per file, in bytes. */
  maxSize?: number
  /** Enable drop/paste targets on the well (click-to-browse always works). */
  dragAndDrop?: boolean
  showPreview?: boolean
  showFileSize?: boolean
  showFileType?: boolean
  showRemoveButton?: boolean
  /** Render the shared Progress primitive while `progress` < 100. */
  showProgress?: boolean
  /** 0–100 for the current upload batch. */
  progress?: number
  /** Controlled file list. */
  files?: File[]
  /** Initial file list (uncontrolled). */
  defaultFiles?: File[]
  onFilesChange?: (files: File[]) => void
  onReject?: (rejections: FileRejection[]) => void
  name?: string
  className?: string
  id?: string
  /** Accessible name when there is no visible `label`. */
  'aria-label'?: string
}

const rejectionCopy: Record<FileRejection['reason'], string> = {
  size: 'too large',
  type: 'wrong format',
  count: 'too many files',
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB', 'MB', 'GB']
  let value = bytes
  let unit = -1
  do {
    value /= 1024
    unit += 1
  } while (value >= 1024 && unit < units.length - 1)
  return `${value >= 10 ? Math.round(value) : value.toFixed(1)} ${units[unit]}`
}

function matchesAccept(file: File, accept?: string) {
  if (!accept) return true
  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()
  return accept
    .split(',')
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean)
    .some((rule) => {
      if (rule.startsWith('.')) return name.endsWith(rule)
      if (rule.endsWith('/*')) return type.startsWith(rule.slice(0, -1))
      return type === rule
    })
}

function fileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`
}

/** "PNG, PDF · up to 10 MB · max 3 files" — derived from the constraints so the
 * well documents itself without a bespoke prop. */
function constraintSummary({
  accept,
  maxSize,
  maxFiles,
  multiple,
}: Pick<FileInputProps, 'accept' | 'maxSize' | 'maxFiles' | 'multiple'>) {
  const parts: string[] = []
  if (accept) {
    const kinds = accept
      .split(',')
      .map((rule) =>
        rule
          .trim()
          .replace(/^\./, '')
          .split('/')
          .pop()!
          .replace('*', '')
          .toUpperCase(),
      )
      .filter(Boolean)
    if (kinds.length) parts.push(kinds.join(', '))
  }
  if (maxSize) parts.push(`up to ${formatBytes(maxSize)}`)
  if (multiple && maxFiles) parts.push(`max ${maxFiles} files`)
  return parts.join(' · ')
}

/** Thumbnail on the z-plane of a flat row: image/video render a real preview
 * from an object URL; PDF and unknown types fall back to a token icon. */
function FileThumb({ file }: { file: File }) {
  const isImage = file.type.startsWith('image/')
  const isVideo = file.type.startsWith('video/')
  const [url, setUrl] = useState<string>()
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!(isImage || isVideo) || file.size === 0) return
    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)
    setFailed(false)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file, isImage, isVideo])

  if (url && !failed && isImage) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element -- blob object URL
         preview; next/image cannot optimize in-memory files. */
      <img
        src={url}
        alt=""
        className="h-10 w-10 shrink-0 rounded-sm border border-border object-cover"
        onError={() => setFailed(true)}
      />
    )
  }
  if (url && !failed && isVideo) {
    return (
      <video
        src={url}
        muted
        preload="metadata"
        aria-hidden
        className="h-10 w-10 shrink-0 rounded-sm border border-border object-cover"
        onError={() => setFailed(true)}
      />
    )
  }

  const icon = isImage
    ? ImageIcon
    : isVideo
      ? Film
      : file.type === 'application/pdf'
        ? FileText
        : FileIcon
  return (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border text-text-tertiary">
      <Icon icon={icon} aria-hidden />
    </span>
  )
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
 * FileInput — the file-selection Control Surface, a SIBLING of Input / Textarea /
 * SearchInput / Select / DatePicker: GlassSurface → .ds-control → ControlSurface →
 * FileInput. The well composes the SAME `.ds-glass .ds-control` + `<ControlSurface/>`
 * as the rest of the family (Textarea precedent: same material, taller geometry) —
 * FileInput recreates NO glass, blur, shadow, border, focus ring or refraction.
 * Drag-over reuses the frozen `--focus` expression (the violet rises), never a new
 * visual language. It owns ONLY interaction: browse/drop/paste selection, accepted
 * formats, size/count validation, previews, removal (existing IconButton), upload
 * progress (existing Progress primitive), announcements, states.
 */
export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  function FileInput(
    {
      label,
      description,
      helperText,
      error,
      success = false,
      disabled,
      required,
      readOnly,
      multiple = false,
      accept,
      maxFiles,
      maxSize,
      dragAndDrop = true,
      showPreview = true,
      showFileSize = true,
      showFileType = false,
      showRemoveButton = true,
      showProgress = false,
      progress,
      files,
      defaultFiles,
      onFilesChange,
      onReject,
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
    const describedBy =
      cn(description && descId, helperText && helpId, error && errorId) ||
      undefined

    const [internal, setInternal] = useState<File[]>(defaultFiles ?? [])
    const current = files !== undefined ? files : internal
    const [dragging, setDragging] = useState(false)
    const dragDepth = useRef(0)
    const [liveMessage, setLiveMessage] = useState('')
    const [rejections, setRejections] = useState<FileRejection[]>([])

    const inert = disabled || readOnly
    const uploading =
      showProgress && typeof progress === 'number' && progress < 100

    function commit(next: File[]) {
      if (files === undefined) setInternal(next)
      onFilesChange?.(next)
    }

    function addFiles(incoming: File[]) {
      if (inert || incoming.length === 0) return
      const accepted: File[] = []
      const rejected: FileRejection[] = []
      const limit = multiple ? maxFiles : 1
      const existing = multiple ? current : []

      for (const file of incoming) {
        if (!matchesAccept(file, accept)) {
          rejected.push({ file, reason: 'type' })
        } else if (maxSize && file.size > maxSize) {
          rejected.push({ file, reason: 'size' })
        } else if (limit && existing.length + accepted.length >= limit) {
          rejected.push({ file, reason: 'count' })
        } else {
          accepted.push(file)
        }
      }

      if (accepted.length) commit([...existing, ...accepted])
      setRejections(rejected)
      if (rejected.length) onReject?.(rejected)

      const said: string[] = []
      if (accepted.length)
        said.push(
          `${accepted.length === 1 ? 'File added' : `${accepted.length} files added`}: ${accepted.map((f) => f.name).join(', ')}.`,
        )
      for (const r of rejected)
        said.push(`${r.file.name} rejected — ${rejectionCopy[r.reason]}.`)
      if (said.length) setLiveMessage(said.join(' '))
    }

    function removeFile(file: File) {
      commit(current.filter((f) => fileKey(f) !== fileKey(file)))
      setLiveMessage(`Removed ${file.name}.`)
    }

    function handleDrop(e: DragEvent<HTMLLabelElement>) {
      e.preventDefault()
      dragDepth.current = 0
      setDragging(false)
      if (!dragAndDrop || inert) return
      addFiles(Array.from(e.dataTransfer.files ?? []))
    }

    function handlePaste(e: ClipboardEvent<HTMLLabelElement>) {
      if (!dragAndDrop || inert) return
      const pasted = Array.from(e.clipboardData.files ?? [])
      if (pasted.length) {
        e.preventDefault()
        addFiles(pasted)
      }
    }

    const summary = constraintSummary({ accept, maxSize, maxFiles, multiple })

    const wellContent: ReactNode = (
      <>
        <Icon
          icon={Upload}
          className="relative z-[3] text-text-tertiary"
          aria-hidden
        />
        <span className="relative z-[3] text-body-sm font-medium text-text">
          {readOnly
            ? current.length
              ? `${current.length} ${current.length === 1 ? 'file' : 'files'}`
              : 'No file'
            : dragAndDrop
              ? 'Click to browse or drag files here'
              : 'Click to browse'}
        </span>
        {!readOnly && summary && (
          <span className="relative z-[3] text-caption text-text-tertiary">
            {summary}
          </span>
        )}
      </>
    )

    return (
      <div className={cn('flex flex-col gap-2', className)}>
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

        <label
          onDragEnter={(e) => {
            e.preventDefault()
            if (!dragAndDrop || inert) return
            dragDepth.current += 1
            setDragging(true)
          }}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={() => {
            dragDepth.current = Math.max(0, dragDepth.current - 1)
            if (dragDepth.current === 0) setDragging(false)
          }}
          onDrop={handleDrop}
          onPaste={handlePaste}
          className={cn(
            // Bespoke Control geometry (Textarea precedent): same glass, taller
            // centered well. Material only from ControlSurface.
            'ds-glass ds-control relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md px-6 py-8 text-center',
            // Drag-over reuses the frozen focus expression — the violet rises.
            controlStateClass({
              focus: dragging,
              error: Boolean(error),
              disabled,
            }),
            disabled && 'cursor-not-allowed',
            readOnly && 'cursor-default',
          )}
        >
          <ControlSurface />
          {wellContent}
          {!readOnly && (
            <input
              ref={ref}
              id={fieldId}
              type="file"
              className="sr-only"
              multiple={multiple}
              accept={accept}
              disabled={disabled}
              required={required && current.length === 0}
              name={name}
              aria-label={label ? undefined : ariaLabel}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  dragDepth.current = 0
                  setDragging(false)
                }
              }}
              onChange={(e) => {
                addFiles(Array.from(e.target.files ?? []))
                // Allow re-selecting the same file after a remove.
                e.target.value = ''
              }}
            />
          )}
        </label>

        {current.length > 0 && (
          <ul className="flex flex-col gap-2" aria-label="Selected files">
            {current.map((file) => (
              <li
                key={fileKey(file)}
                className="flex items-center gap-3 rounded-md border border-border bg-surface-raised px-3 py-2"
              >
                {showPreview && <FileThumb file={file} />}
                <div className="min-w-0 flex-1 text-left">
                  <span className="block truncate text-body-sm text-text">
                    {file.name}
                  </span>
                  {(showFileSize || showFileType) && (
                    <span className="block truncate text-caption text-text-tertiary">
                      {[
                        showFileSize ? formatBytes(file.size) : null,
                        showFileType ? file.type || 'unknown' : null,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  )}
                </div>
                {showRemoveButton && !inert && (
                  <IconButton
                    size="sm"
                    variant="ghost"
                    label={`Remove ${file.name}`}
                    icon={<Icon icon={X} size="sm" aria-hidden />}
                    onClick={() => removeFile(file)}
                  />
                )}
              </li>
            ))}
          </ul>
        )}

        {showProgress && typeof progress === 'number' && (
          <div className="flex items-center gap-3">
            <Progress
              value={progress}
              aria-label="Upload progress"
              className="flex-1"
            />
            <span className="text-caption text-text-tertiary">
              {uploading ? `Uploading… ${Math.round(progress)}%` : 'Uploaded'}
            </span>
          </div>
        )}

        {rejections.length > 0 && !error && (
          <span className="text-body-sm text-error">
            {rejections
              .map((r) => `${r.file.name} — ${rejectionCopy[r.reason]}`)
              .join(' · ')}
          </span>
        )}

        <MetaRow
          error={error}
          success={success}
          helperText={helperText}
          errorId={errorId}
          helpId={helpId}
        />

        <span role="status" aria-live="polite" className="sr-only">
          {liveMessage}
        </span>
      </div>
    )
  },
)
