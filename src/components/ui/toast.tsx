'use client'

import * as ToastPrimitive from '@radix-ui/react-toast'
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { cn } from '@/lib/cn'

import {
  FloatingSurface,
  floatingContentClass,
  floatingEnterClass,
  floatingHostClass,
  floatingLiftClass,
  floatingSizeClass,
  type FloatingSize,
} from './floating-surface'
import { Icon } from './icon'
import { IconButton } from './icon-button'
import { Progress } from './progress'
import { Spinner } from './spinner'

/**
 * Toast — the transient feedback surface of DISCIPLINE. It communicates; it
 * never interrupts, asks or blocks. It derives ENTIRELY from FloatingSurface:
 *
 *   GlassSurface → .ds-floating → FloatingSurface → Toast
 *
 * The pane is the Floating base verbatim — `floatingHostClass` +
 * `<FloatingSurface/>` + `ds-floating-lift` + the shared size scale; the
 * entrance is `ds-floating-enter` and the exit is the SAME keyframes reversed
 * (one motion language, declared once in floating-surface.css). Toast
 * recreates NO glass, blur, backdrop, shadow, radius or animation. On Radix
 * Toast, which supplies timers, pause on hover/focus, swipe, Escape, F8 focus,
 * and aria-live (foreground = alert, background = status). Toast itself owns
 * ONLY: the queue (max 4 visible, overflow queued), duration, dismiss (auto ·
 * manual · swipe · Escape · action), stacking positions, the optional progress
 * timer (the existing Progress primitive, ticked in JS — no new animation),
 * variants and actions.
 */

export type ToastVariant =
  'default' | 'success' | 'warning' | 'error' | 'loading' | 'info'

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export interface ToastOptions {
  title?: ReactNode
  description?: ReactNode
  variant?: ToastVariant
  /** Override the leading icon (defaults per variant; `null` hides it). */
  icon?: ReactNode | null
  /** Auto-dismiss delay (ms). `Infinity` keeps it until dismissed. */
  duration?: number
  /** Show the × close button (default true). */
  dismissible?: boolean
  /** Show the remaining-time bar (the existing Progress primitive). */
  showProgress?: boolean
  action?: { label: string; onClick: () => void }
}

interface ToastRecord extends ToastOptions {
  id: string
}

interface ToastStore {
  toast: (options: ToastOptions) => string
  /** Update a live toast in place — the promise pattern (loading → success /
   * error) without a new API. */
  update: (id: string, options: ToastOptions) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastStore | null>(null)

/** Fire/refresh/dismiss toasts from anywhere under `ToastProvider`. */
export function useToast(): ToastStore {
  const store = useContext(ToastContext)
  if (!store) throw new Error('useToast must be used within <ToastProvider>')
  return store
}

const variantIcon: Record<ToastVariant, ReactNode> = {
  default: null,
  success: <Icon icon={CheckCircle2} size="sm" className="text-success" />,
  warning: <Icon icon={AlertTriangle} size="sm" className="text-warning" />,
  error: <Icon icon={AlertCircle} size="sm" className="text-error" />,
  info: <Icon icon={Info} size="sm" className="text-info" />,
  loading: <Spinner size="sm" label="Loading" />,
}

const positionClass: Record<ToastPosition, string> = {
  'top-left': 'top-0 left-0',
  'top-center': 'top-0 left-1/2 -translate-x-1/2',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-0 right-0',
}

/** One toast pane — the Floating base + feedback content. Exported for
 * declarative use; the provider renders it for queued toasts. */
export const Toast = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & {
    data: ToastRecord
    size?: FloatingSize
    onRemove: (id: string) => void
  }
>(function Toast({ data, size = 'sm', onRemove, ...props }, ref) {
  const {
    id,
    title,
    description,
    variant = 'default',
    icon,
    duration,
    dismissible = true,
    showProgress = false,
    action,
  } = data
  const leading = icon === null ? null : (icon ?? variantIcon[variant])
  const [progress, setProgress] = useState(100)
  const total = duration === Infinity ? null : (duration ?? 5000)

  // Remaining-time ticker for the optional progress bar. Radix pauses the
  // close timer on hover/focus; we pause the ticker via onPause/onResume.
  const timer = useMemo(
    () => ({ started: 0, remaining: total ?? 0, raf: 0 as unknown as number }),
    [total],
  )
  const tick = useCallback(() => {
    if (total == null) return
    const elapsed = Date.now() - timer.started
    const left = Math.max(0, timer.remaining - elapsed)
    setProgress((left / total) * 100)
    if (left > 0) timer.raf = window.setTimeout(tick, 100)
  }, [timer, total])
  const start = useCallback(() => {
    if (total == null || !showProgress) return
    timer.started = Date.now()
    tick()
  }, [timer, tick, total, showProgress])
  const pause = useCallback(() => {
    if (total == null || !showProgress) return
    window.clearTimeout(timer.raf)
    timer.remaining = Math.max(
      0,
      timer.remaining - (Date.now() - timer.started),
    )
  }, [timer, total, showProgress])

  // Start ticking when the toast mounts (queued toasts mount late); cleanup
  // stops the ticker on unmount.
  useEffect(() => {
    start()
    return () => window.clearTimeout(timer.raf)
  }, [start, timer])

  return (
    <ToastPrimitive.Root
      ref={ref}
      // setTimeout is 32-bit: anything above 2^31-1 fires IMMEDIATELY.
      // "Sticky" = the longest legal timeout (~24.8 days).
      duration={duration === Infinity ? 2 ** 31 - 1 : duration}
      type={variant === 'error' ? 'foreground' : 'background'}
      onOpenChange={(open) => {
        // Let the reversed ds-floating-in exit play, then drop from the queue.
        if (!open) window.setTimeout(() => onRemove(id), 180)
      }}
      onPause={pause}
      onResume={start}
      className={cn(
        floatingHostClass,
        floatingEnterClass,
        floatingLiftClass,
        'rounded-md p-0',
        floatingSizeClass[size],
        // Swipe follows the pointer (Radix CSS vars) — geometry, not animation.
        'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
        'data-[swipe=cancel]:translate-x-0',
      )}
      {...props}
    >
      <FloatingSurface />
      <div className={cn(floatingContentClass, 'flex flex-col')}>
        <div className="flex items-start gap-3 px-4 py-3">
          {leading && <span className="mt-0.5 shrink-0">{leading}</span>}
          <div className="min-w-0 flex-1">
            {title && (
              <ToastPrimitive.Title className="text-body-sm font-medium text-text">
                {title}
              </ToastPrimitive.Title>
            )}
            {description && (
              <ToastPrimitive.Description className="text-caption text-text-secondary">
                {description}
              </ToastPrimitive.Description>
            )}
          </div>
          {action && (
            <ToastPrimitive.Action altText={action.label} asChild>
              <button
                type="button"
                onClick={action.onClick}
                className="shrink-0 rounded-sm px-2 py-1 text-body-sm font-medium text-accent-accessible outline-none transition-colors duration-fast ease-standard hover:bg-[color-mix(in_srgb,var(--ds-color-accent-subtle)_45%,transparent)] focus-visible:bg-[color-mix(in_srgb,var(--ds-color-accent-subtle)_45%,transparent)]"
              >
                {action.label}
              </button>
            </ToastPrimitive.Action>
          )}
          {dismissible && (
            <ToastPrimitive.Close asChild>
              <IconButton
                size="sm"
                variant="ghost"
                label="Dismiss notification"
                icon={<Icon icon={X} size="sm" aria-hidden />}
                className="-mr-1 -mt-1 h-7 w-7 min-h-0 min-w-0"
              />
            </ToastPrimitive.Close>
          )}
        </div>
        {showProgress && total != null && (
          <div className="px-4 pb-3">
            <Progress
              value={progress}
              aria-label="Time remaining"
              className="h-1"
            />
          </div>
        )}
      </div>
    </ToastPrimitive.Root>
  )
})

export interface ToastProviderProps {
  children: ReactNode
  /** Stack corner/edge. Default bottom-right. */
  position?: ToastPosition
  /** Default auto-dismiss (ms). */
  duration?: number
  /** Panes on screen at once; extras wait in the queue. */
  maxVisible?: number
  /** Shared Floating width scale for the panes (xs · sm · md). */
  size?: FloatingSize
}

/** Provider + viewport: the queue lives here. Wrap the app (or a subtree). */
export function ToastProvider({
  children,
  position = 'bottom-right',
  duration = 5000,
  maxVisible = 4,
  size = 'sm',
}: ToastProviderProps) {
  const [queue, setQueue] = useState<ToastRecord[]>([])

  const store = useMemo<ToastStore>(() => {
    let seq = 0
    return {
      toast(options) {
        const id = `toast-${Date.now()}-${seq++}`
        setQueue((prev) => [...prev, { id, ...options }])
        return id
      },
      update(id, options) {
        setQueue((prev) =>
          prev.map((t) => (t.id === id ? { ...t, ...options } : t)),
        )
      },
      dismiss(id) {
        setQueue((prev) => prev.filter((t) => t.id !== id))
      },
    }
  }, [])

  const remove = useCallback(
    (id: string) => setQueue((prev) => prev.filter((t) => t.id !== id)),
    [],
  )

  const swipeDirection = position.endsWith('left')
    ? 'left'
    : position.endsWith('center')
      ? position.startsWith('top')
        ? 'up'
        : 'down'
      : 'right'

  // Max 4 visible; the rest stay queued and mount as slots free up.
  const visible = queue.slice(0, maxVisible)

  return (
    <ToastContext.Provider value={store}>
      <ToastPrimitive.Provider
        duration={duration}
        swipeDirection={swipeDirection}
        label="Notification"
      >
        {children}
        {visible.map((t) => (
          <Toast key={t.id} data={t} size={size} onRemove={remove} />
        ))}
        <ToastViewport position={position} />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  )
}

/** The fixed stack region (F8 reaches it; Escape dismisses the focused toast). */
export const ToastViewport = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> & {
    position?: ToastPosition
  }
>(function ToastViewport(
  { className, position = 'bottom-right', ...props },
  ref,
) {
  return (
    <ToastPrimitive.Viewport
      ref={ref}
      className={cn(
        'fixed z-toast flex w-[min(100vw,26rem)] max-w-full flex-col gap-3 p-6 outline-none',
        position.startsWith('top') && 'flex-col-reverse',
        positionClass[position],
        className,
      )}
      {...props}
    />
  )
})
