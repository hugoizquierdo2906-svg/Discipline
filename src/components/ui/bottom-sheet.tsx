'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

import './bottom-sheet.css'
import { Modal } from './modal'
import { Spinner } from './spinner'

/**
 * Bottom Sheet — DISCIPLINE's touch-first immersive surface: a panel that
 * rises from the bottom edge and is driven by the GESTURE (drag, swipe,
 * flick), resting at one of several detents and dismissed by a downward
 * throw. Where the frozen Drawer is a WORKSPACE (an edge-anchored space you
 * open, work in, and close by a button/overlay), the Bottom Sheet is an
 * INTERACTION: the finger owns it — you pull it up to see more, push it down
 * to see less, throw it away to dismiss. That gesture physics is the whole
 * reason it exists, and it is exactly what the Drawer forbids itself.
 *
 * Why it exists / why Drawer is not enough: a Drawer has two positions
 * (open, closed) and no in-between; its bottom side shares only the
 * placement. A Bottom Sheet has a CONTINUUM — its height follows the finger
 * pixel for pixel, it rests at content/small/medium/large/full detents,
 * resists past the top with a rubber band, and dismisses on velocity, not
 * just on a button. None of that belongs in a Drawer (its frozen doc
 * explicitly reserves these behaviors for "a future BottomSheet").
 * Behaviors exclusively the Bottom Sheet's — forbidden in Drawer: drag /
 * swipe / flick, velocity-based dismissal, snap points & detents,
 * rubber-band overscroll, scroll coordination (the inner list scrolls until
 * its top, then the sheet takes the drag), inertial settle, keyboard
 * avoidance and safe-area insets.
 *
 * Not Dialog / Modal (a centered moment, no gesture), not AlertDialog (a
 * blocking question), not Popover (anchored to a trigger, non-blocking),
 * not Command Palette (a searchable command surface), not Navigation Drawer
 * / Sidebar (a Drawer use-case / a persistent region), not iOS Action Sheet
 * (a fixed list of choices — one detent, no drag continuum; it is a CONTENT
 * PATTERN this component hosts, not a rival), not Material Bottom Sheet /
 * vaul (those ARE this species — this is DISCIPLINE's native, token-only
 * take, vaul used only as a technical reference for the drag mechanics,
 * never a visual one).
 *
 *   the frozen optical-layer stack → .ds-immersive → ImmersiveSurface
 *   → Modal (the Dialog foundation) → Bottom Sheet
 *
 * Composes the Modal COMPONENT only — portal, focus trap, scroll lock,
 * Escape, overlay, inert background and the Title/Description ARIA wiring
 * are all inherited verbatim; this file contains ZERO focus / overlay /
 * portal / scroll-lock code. Bottom Sheet owns ONLY the physics: the drag
 * gesture, the detent geometry, the state transitions and the touch
 * constraints. The settle (transform + height glide) lives in
 * bottom-sheet.css (token-only); the material is the frozen Immersive
 * glass, untouched. The pane is bottom-pinned and its HEIGHT is the detent,
 * so a sticky header and footer stay put while the body scrolls between.
 */

export type BottomSheetDetent =
  'content' | 'small' | 'medium' | 'large' | 'full' | number

export type BottomSheetState =
  'closed' | 'opening' | 'open' | 'dragging' | 'snapping' | 'dismissed'

const NAMED_FRACTION: Record<
  Exclude<BottomSheetDetent, number | 'content'>,
  number
> = {
  small: 0.35,
  medium: 0.6,
  large: 0.9,
  full: 0.98,
}

// Physics constants — the sheet's own gesture tuning (not material, not
// tokens: these are dynamics, the component's exclusive responsibility).
const RUBBER_BAND = 0.5 // resistance factor when dragged past the tallest detent
const FLICK_VELOCITY = 0.6 // px/ms downward throw that dismisses / steps down
const DISMISS_OVERSHOOT = 80 // px dragged below the shortest detent that dismisses
const MIN_VISIBLE = 96 // px the sheet can shrink to before a drag reads as dismiss

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

function namedFraction(detent: Exclude<BottomSheetDetent, number | 'content'>) {
  return NAMED_FRACTION[detent]
}

function readSettleMs() {
  if (typeof window === 'undefined') return 240
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--ds-dur-standard')
    .trim()
  if (raw.endsWith('ms')) return parseFloat(raw)
  if (raw.endsWith('s')) return parseFloat(raw) * 1000
  return 240
}

export interface BottomSheetProps {
  /** Uncontrolled trigger (rendered via Modal.Trigger asChild). */
  trigger?: React.ReactElement
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Modal (default) dims + traps + locks; non-modal leaves the page live. */
  modal?: boolean
  /** Master switch — when false the sheet can never be dismissed by the
   * user (no overlay tap, no Escape, no swipe-away); only an explicit close
   * action or a controlled `open` change closes it. */
  dismissible?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
  /** Resting heights, given lowest to highest; resolved and sorted. */
  detents?: BottomSheetDetent[]
  /** Which detent the sheet opens at (defaults to the lowest). */
  defaultDetent?: BottomSheetDetent
  /** Snap to the nearest detent on release (true) or rest where let go. */
  snap?: boolean
  onSnapChange?: (detent: BottomSheetDetent) => void
  /** Custom node in the grab-handle row (replaces the default bar). */
  dragHandle?: React.ReactNode
  showHandle?: boolean
  disableDrag?: boolean
  disableSwipeToDismiss?: boolean
  /** Lift the sheet above the on-screen keyboard (VisualViewport). */
  avoidKeyboard?: boolean
  /** Pad the bottom by the device safe-area inset. */
  safeArea?: boolean
  loading?: boolean
  disabled?: boolean
  title: string
  description?: string
  icon?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  onStateChange?: (state: BottomSheetState) => void
  className?: string
  'data-testid'?: string
}

export function BottomSheet({
  trigger,
  open,
  defaultOpen,
  onOpenChange,
  modal = true,
  dismissible = true,
  closeOnOverlay = true,
  closeOnEscape = true,
  detents = ['medium', 'full'],
  defaultDetent,
  snap = true,
  onSnapChange,
  dragHandle,
  showHandle = true,
  disableDrag = false,
  disableSwipeToDismiss = false,
  avoidKeyboard = true,
  safeArea = true,
  loading = false,
  disabled = false,
  title,
  description,
  icon,
  header,
  footer,
  children,
  onStateChange,
  className,
  'data-testid': dataTestId,
}: BottomSheetProps) {
  const autoId = useId()
  const titleId = `${autoId}-title`

  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false)
  const wantOpen = isControlled ? open : internalOpen

  // Presence: Radix stays mounted through the close glide, then unmounts.
  const [present, setPresent] = useState(wantOpen)
  const [ready, setReady] = useState(false) // measured + at a detent
  const [raised, setRaised] = useState(false) // false = sliding off-screen
  const [height, setHeight] = useState(0) // current detent height, px
  const [slide, setSlide] = useState(0) // downward translate for dismissal
  const [kbInset, setKbInset] = useState(0)
  const [dragging, setDragging] = useState(false)

  const shellRef = useRef<HTMLDivElement | null>(null)
  const columnRef = useRef<HTMLDivElement | null>(null)
  const bodyRef = useRef<HTMLDivElement | null>(null)
  const heightsRef = useRef<number[]>([]) // ascending
  const detentIndexRef = useRef(0)
  const vhRef = useRef(0)
  const settleTimer = useRef<number | undefined>(undefined)
  const dragAbort = useRef<AbortController | null>(null)
  const dragRef = useRef<{
    startY: number
    startHeight: number
    lastY: number
    lastT: number
    velocity: number
    fromScroll: boolean
    active: boolean
  } | null>(null)

  const emitState = useCallback(
    (s: BottomSheetState) => onStateChange?.(s),
    [onStateChange],
  )

  const setWantOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  // Resolve every detent to a pixel HEIGHT. Measured while the shell height
  // is auto (so `content` reads the natural column height).
  const measure = useCallback(() => {
    const vh = window.visualViewport?.height ?? window.innerHeight
    vhRef.current = vh
    const columnH = columnRef.current?.scrollHeight ?? vh
    const heights = detents
      .map((d) => {
        if (d === 'content') return clamp(columnH, MIN_VISIBLE, vh * 0.96)
        const f = typeof d === 'number' ? clamp(d, 0.1, 1) : namedFraction(d)
        return clamp(f * vh, MIN_VISIBLE, vh * 0.98)
      })
      .sort((a, b) => a - b)
    heightsRef.current = heights
    return heights
  }, [detents])

  const nearestIndex = useCallback((heights: number[], target: number) => {
    let best = 0
    let bestDist = Infinity
    heights.forEach((h, i) => {
      const dist = Math.abs(h - target)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    })
    return best
  }, [])

  const indexOfDetent = useCallback(
    (heights: number[], detent: BottomSheetDetent) => {
      const vh = vhRef.current || window.innerHeight
      const target =
        detent === 'content'
          ? clamp(columnRef.current?.scrollHeight ?? vh, MIN_VISIBLE, vh * 0.96)
          : (typeof detent === 'number'
              ? clamp(detent, 0.1, 1)
              : namedFraction(detent)) * vh
      return nearestIndex(heights, target)
    },
    [nearestIndex],
  )

  // Open / close presence machine.
  useEffect(() => {
    if (wantOpen) {
      setPresent(true)
    } else if (present) {
      emitState('dismissed')
      setRaised(false)
      window.clearTimeout(settleTimer.current)
      settleTimer.current = window.setTimeout(
        () => setPresent(false),
        readSettleMs() + 20,
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wantOpen])

  // Once mounted, defer one tick so the column is laid out (its natural
  // height readable for `content`), then measure and raise to the opening
  // detent — the settle glides from off-screen up to the detent height.
  useEffect(() => {
    if (!present) {
      setReady(false)
      return
    }
    emitState('opening')
    const t = window.setTimeout(() => {
      const heights = measure()
      const openIndex =
        defaultDetent !== undefined ? indexOfDetent(heights, defaultDetent) : 0
      detentIndexRef.current = openIndex
      setReady(true)
      setRaised(true)
      setSlide(0)
      setHeight(heights[openIndex] ?? 0)
      emitState('open')
      onSnapChange?.(detents[openIndex] ?? detents[0] ?? 'medium')
    }, 0)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [present])

  // Keyboard avoidance via VisualViewport.
  useEffect(() => {
    if (!avoidKeyboard || typeof window === 'undefined') return
    const vv = window.visualViewport
    if (!vv) return
    const onResize = () => {
      setKbInset(Math.max(0, window.innerHeight - vv.height - vv.offsetTop))
    }
    vv.addEventListener('resize', onResize)
    vv.addEventListener('scroll', onResize)
    onResize()
    return () => {
      vv.removeEventListener('resize', onResize)
      vv.removeEventListener('scroll', onResize)
    }
  }, [avoidKeyboard])

  // Re-measure on viewport resize while open.
  useEffect(() => {
    if (!present) return
    const onResize = () => {
      const heights = measure()
      if (raised) setHeight(heights[detentIndexRef.current] ?? 0)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [present, raised, measure])

  useEffect(
    () => () => {
      window.clearTimeout(settleTimer.current)
      dragAbort.current?.abort()
    },
    [],
  )

  // ─── Drag mechanics ───────────────────────────────────────────────
  // The pane's HEIGHT follows the finger 1:1; dragging below the shortest
  // detent converts the excess into a downward slide toward dismissal.
  const paintDrag = useCallback((h: number, down: number) => {
    const node = shellRef.current
    if (!node) return
    node.style.height = `${h}px`
    node.style.transform = `translate(-50%, ${down}px)`
  }, [])

  const settleTo = useCallback(
    (index: number) => {
      const heights = heightsRef.current
      detentIndexRef.current = index
      setRaised(true)
      setSlide(0)
      setHeight(heights[index] ?? 0)
      window.clearTimeout(settleTimer.current)
      settleTimer.current = window.setTimeout(() => {
        emitState('open')
        onSnapChange?.(detents[index] ?? detents[0] ?? 'medium')
      }, readSettleMs())
    },
    [detents, emitState, onSnapChange],
  )

  const endDrag = useCallback(() => {
    const drag = dragRef.current
    if (!drag) return
    dragRef.current = null
    dragAbort.current?.abort()

    const heights = heightsRef.current
    const shortest = heights[0] ?? 0
    const dragged = drag.startHeight + (drag.startY - drag.lastY)
    const throwingDown = drag.velocity > FLICK_VELOCITY

    setDragging(false)
    emitState('snapping')

    const dismissByDistance = dragged < shortest - DISMISS_OVERSHOOT
    if (
      dismissible &&
      !disableSwipeToDismiss &&
      (throwingDown || dismissByDistance)
    ) {
      setWantOpen(false)
      return
    }

    let index = detentIndexRef.current
    if (snap) {
      index = nearestIndex(heights, dragged)
      if (drag.velocity > 0.25 && index > 0) index -= 1 // throw down → step down
      if (drag.velocity < -0.25 && index < heights.length - 1) index += 1
    }
    settleTo(index)
  }, [
    dismissible,
    disableSwipeToDismiss,
    emitState,
    nearestIndex,
    setWantOpen,
    settleTo,
    snap,
  ])

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      const drag = dragRef.current
      if (!drag) return
      const now = performance.now()
      const dt = now - drag.lastT || 1
      // Coordinated start: a body drag only becomes a sheet drag once the
      // list is at its top and the finger moves DOWN.
      if (drag.fromScroll && !drag.active) {
        const atTop = (bodyRef.current?.scrollTop ?? 0) <= 0
        if (!atTop || e.clientY <= drag.startY) {
          drag.lastY = e.clientY
          drag.lastT = now
          return
        }
        drag.active = true
        drag.startY = e.clientY
        drag.startHeight = heightsRef.current[detentIndexRef.current] ?? 0
        setDragging(true)
        emitState('dragging')
      }
      drag.velocity = (e.clientY - drag.lastY) / dt
      drag.lastY = e.clientY
      drag.lastT = now

      const heights = heightsRef.current
      const tallest = heights[heights.length - 1] ?? 0
      const shortest = heights[0] ?? 0
      let h = drag.startHeight + (drag.startY - e.clientY)
      let down = 0
      if (h > tallest) h = tallest + (h - tallest) * RUBBER_BAND // rubber band
      if (h < shortest) {
        down = shortest - h // slide the sheet down toward dismissal
        h = shortest
      }
      e.preventDefault()
      paintDrag(h, down)
    },
    [emitState, paintDrag],
  )

  const beginDrag = useCallback(
    (e: React.PointerEvent, fromScroll: boolean) => {
      if (disableDrag || disabled) return
      if (fromScroll && (bodyRef.current?.scrollTop ?? 0) > 0) return
      dragRef.current = {
        startY: e.clientY,
        startHeight: heightsRef.current[detentIndexRef.current] ?? 0,
        lastY: e.clientY,
        lastT: performance.now(),
        velocity: 0,
        fromScroll,
        active: !fromScroll,
      }
      if (!fromScroll) {
        setDragging(true)
        emitState('dragging')
      }
      dragAbort.current?.abort()
      const ac = new AbortController()
      dragAbort.current = ac
      window.addEventListener('pointermove', onPointerMove, {
        passive: false,
        signal: ac.signal,
      })
      window.addEventListener('pointerup', endDrag, { signal: ac.signal })
      window.addEventListener('pointercancel', endDrag, { signal: ac.signal })
    },
    [disableDrag, disabled, emitState, endDrag, onPointerMove],
  )

  if (!present && !wantOpen) {
    return (
      <Modal
        open={false}
        onOpenChange={(o) => o && !disabled && setWantOpen(true)}
      >
        {trigger && <Modal.Trigger asChild>{trigger}</Modal.Trigger>}
      </Modal>
    )
  }

  const lift = raised ? kbInset : 0
  const transform =
    ready && raised
      ? `translate(-50%, ${slide - lift}px)`
      : `translate(-50%, 100%)`

  return (
    <Modal
      open={present}
      onOpenChange={(next) => {
        if (next) {
          if (!disabled) setWantOpen(true)
          return
        }
        // A close request reaching here is an explicit action (a
        // Modal.Close / BottomSheet.Close button); Escape/overlay are
        // guarded in onEscapeKeyDown/onInteractOutside, which preventDefault
        // when blocked so Radix never calls this. Explicit actions always
        // close, even on a non-dismissible sheet.
        setWantOpen(false)
      }}
      modal={modal}
    >
      {trigger && <Modal.Trigger asChild>{trigger}</Modal.Trigger>}
      <Modal.Content
        ref={shellRef}
        aria-labelledby={titleId}
        aria-modal={modal || undefined}
        {...(description ? {} : { 'aria-describedby': undefined })}
        data-testid={dataTestId}
        data-state={dragging ? 'dragging' : raised ? 'open' : 'closed'}
        style={{ transform, height: ready ? `${height}px` : undefined }}
        onEscapeKeyDown={(e) => {
          if (!closeOnEscape || !dismissible) e.preventDefault()
        }}
        onInteractOutside={(e) => {
          if (!closeOnOverlay || !dismissible || !modal) e.preventDefault()
        }}
        className={cn(
          'left-1/2 right-auto bottom-0 top-auto max-h-[98dvh] w-full max-w-[480px] translate-x-0 translate-y-0 will-change-transform',
          !dragging && 'ds-sheet-settle',
          className,
        )}
        paneClassName="h-full w-full max-w-none rounded-b-none rounded-t-[var(--ds-radius-xl)] p-0"
        contentClassName="h-full min-h-0 gap-0"
      >
        <div ref={columnRef} className="flex h-full min-h-0 flex-col">
          {/* Grab handle — always a drag origin. */}
          {showHandle && (
            <div
              data-testid={dataTestId ? `${dataTestId}-handle` : undefined}
              onPointerDown={(e) => beginDrag(e, false)}
              className="flex shrink-0 touch-none cursor-grab justify-center py-3 active:cursor-grabbing"
            >
              {dragHandle ?? (
                <span aria-hidden className="h-1 w-9 rounded-pill bg-border" />
              )}
            </div>
          )}

          {/* Header — also a drag origin. */}
          {header ? (
            <>
              <Modal.Title id={titleId} className="sr-only">
                {title}
              </Modal.Title>
              <div
                onPointerDown={(e) => beginDrag(e, false)}
                className="shrink-0 touch-none"
              >
                {header}
              </div>
            </>
          ) : (
            <div
              onPointerDown={(e) => beginDrag(e, false)}
              className={cn(
                'flex shrink-0 touch-none items-start gap-3 px-6',
                showHandle ? 'pb-4' : 'py-5',
              )}
            >
              {icon && (
                <span aria-hidden className="mt-0.5 shrink-0">
                  {icon}
                </span>
              )}
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <Modal.Title id={titleId} className="text-h4">
                  {title}
                </Modal.Title>
                {description && (
                  <Modal.Description className="text-body-sm">
                    {description}
                  </Modal.Description>
                )}
              </div>
            </div>
          )}

          {/* Scroll-coordinated body. */}
          <div
            ref={bodyRef}
            data-testid={dataTestId ? `${dataTestId}-body` : undefined}
            onPointerDown={(e) => beginDrag(e, true)}
            className="min-h-0 flex-1 touch-pan-y overflow-y-auto px-6 pb-5"
          >
            {loading ? (
              <div className="flex min-h-24 items-center justify-center py-6">
                <Spinner size="md" label="Loading" />
              </div>
            ) : (
              children
            )}
          </div>

          {/* Sticky footer, safe-area padded. */}
          {footer && (
            <div
              data-testid={dataTestId ? `${dataTestId}-footer` : undefined}
              className={cn(
                'shrink-0 border-t border-border px-6 pt-4',
                safeArea
                  ? 'pb-[max(1rem,env(safe-area-inset-bottom))]'
                  : 'pb-4',
              )}
            >
              {footer}
            </div>
          )}
          {!footer && safeArea && (
            <div
              aria-hidden
              className="shrink-0 pb-[env(safe-area-inset-bottom)]"
            />
          )}
        </div>
      </Modal.Content>
    </Modal>
  )
}

/** Re-exported so consumers can close from custom headers/footers. */
BottomSheet.Close = Modal.Close
