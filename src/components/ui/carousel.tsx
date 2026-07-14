'use client'

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'
import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'

import { cn } from '@/lib/cn'

import { Icon } from './icon'
import { IconButton, type IconButtonProps } from './icon-button'

/**
 * Carousel — a Data Display primitive that answers exactly ONE question:
 * "how do I browse SEQUENTIALLY through a series of items?" It only lays a
 * set of sibling items in a scroll-snapping track and lets the user step
 * from one to the next; it holds no business logic and no domain
 * knowledge. It does not know images, products, articles, coaches,
 * clients or any DISCIPLINE concept, and it never implements a lightbox,
 * zoom, fullscreen, infinite/virtualized scrolling, drag-and-drop reorder,
 * masonry/grid layout, a slideshow/autoplay timer, lazy loading, analytics
 * or any "swipe business logic" — every one of those belongs to a higher
 * component that would COMPOSE a Carousel, never to Carousel itself.
 *
 * Not ScrollArea (a generic scroll surface for arbitrary overflowing
 * content — no notion of discrete "slides", no snapping, no prev/next
 * stepping, no active index; a Carousel is a ScrollArea specialized into a
 * one-at-a-time sequential browser). Not Tabs (SWITCHES between a few
 * named, mutually-exclusive panels where exactly one is mounted/visible
 * and the rest are gone; a Carousel keeps every item in one continuous
 * track and slides ACROSS them — adjacent items are partly visible, order
 * is spatial, and there are no panel "names"). Not Pagination (random
 * access to numbered pages of a data collection that REPLACES the view;
 * a Carousel is continuous sequential travel along one track, and its
 * dots indicate position, they are not page numbers you jump a dataset
 * to). Not a Gallery / photo grid (a 2-D grid of many thumbnails read at
 * once; a Carousel is a 1-D sequence read one region at a time). Not Card
 * (one object's own surface — a Card is the kind of thing a Carousel.Item
 * commonly WRAPS, never the carousel itself). Not List (a static vertical
 * stack with no track, no snapping, no stepping controls). Not Timeline
 * (a chronological axis of past events) or ActivityFeed (a list of recent
 * happenings) — neither has a swept, snap-stepped track the user pages
 * through.
 *
 * Category: Data Display (not Navigation, Feedback, Overlay, Layout,
 * Forms or Disclosure). A real compound (`Carousel`/`Carousel.Content`/
 * `Carousel.Item`/`Carousel.Previous`/`Carousel.Next`/
 * `Carousel.Indicators`) built on a NATIVE CSS scroll-snap track — no
 * carousel engine dependency, no JS-driven transform animation. The track
 * is a plain `overflow` scroll container with `scroll-snap-type`; stepping
 * calls the browser's own `scrollIntoView` (which honours the container's
 * `scroll-behavior: smooth`, and — via `motion-reduce:scroll-auto` —
 * degrades to an instant jump under `prefers-reduced-motion`), so motion
 * is the browser's calm native smooth-scroll, never a bespoke spring or a
 * 3-D coverflow/tilt. Direction is fully native: a horizontal track
 * mirrors correctly under `dir="rtl"` because the scroll container and the
 * logical `scroll-snap-align` values (`start`/`center`/`end`) are
 * direction-aware, and the keyboard Arrow keys mirror with it. The active
 * index is read from geometry (the item whose centre is nearest the
 * viewport's centre — direction- and orientation-agnostic), never a prop
 * a consumer must feed. `Carousel.Previous`/`Carousel.Next` compose the
 * frozen `IconButton` verbatim (never a redrawn button) and disable
 * themselves at the ends unless `loop`. `Carousel.Indicators` is a thin
 * segmented progress bar — every step a short muted segment, the current
 * one a long accent capsule that morphs its width on a token-driven
 * `duration-standard`/`ease-out` transition (the same calm, discreet
 * motion budget the frozen Accordion/Collapsible chevrons use), never a
 * Material dot row or a flashy effect; each segment is a real button with
 * an enlarged invisible hit target. `Carousel.Item` carries `data-active`
 * on the current slide — a pure CSS styling HOOK (the Radix `data-state`
 * idiom, surfacing the index the component already tracks; not a prop, not
 * a new responsibility) so a consumer can compose a focus/peek treatment
 * (a bright centred slide, its neighbours quietly scaled/dimmed) entirely
 * in its own CSS, while the primitive itself still draws nothing and makes
 * no per-item layout decision (Invariant A1). Full WAI-ARIA Carousel
 * pattern:
 * the root is `aria-roledescription="carousel"` + `aria-label`, the track
 * is a `role="group"` with `aria-live="polite"` (manual carousel, no
 * autoplay to switch it off for), each item is
 * `aria-roledescription="slide"` + `aria-label="N of M"` (injected
 * structurally, never a prop), and the controls carry `aria-controls`
 * pointing at the track. Keyboard: ArrowLeft/ArrowRight (horizontal, RTL-
 * mirrored) or ArrowUp/ArrowDown (vertical) step, Home/End jump to the
 * first/last item, and Tab/Shift+Tab move through the real focusable
 * controls natively. Composes ONLY Typography tokens, the shared
 * `border`/`accent` tokens and the frozen IconButton/Icon — no
 * GlassSurface of its own, no shadow, no gradient, no tilt, no coverflow:
 * the component disappears and the content is what the eye follows.
 *
 * `orientation` (`horizontal` default · `vertical`) is a pure axis switch.
 * `loop` (default false) makes stepping past the last item wrap to the
 * first (and before the first wrap to the last), and keeps the controls
 * enabled at the ends — a wrap-around of the STEP, never a cloned-slide
 * infinite marquee. `align` (`start` default · `center` · `end`) is the
 * logical `scroll-snap-align` each item rests at — pure layout, RTL-aware,
 * no business meaning. Item width/height is the consumer's own layout
 * decision (Invariant A1): a `Carousel.Item` sizes to its content unless
 * the consumer gives it a width (`basis-full`, `basis-1/2`, `w-64`…),
 * exactly like every other base primitive that never dictates its own
 * placement.
 */

type Orientation = 'horizontal' | 'vertical'
type Align = 'start' | 'center' | 'end'

interface CarouselContextValue {
  orientation: Orientation
  align: Align
  activeIndex: number
  count: number
  contentId: string
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void
  canPrev: boolean
  canNext: boolean
  contentRef: React.RefObject<HTMLDivElement | null>
}

const CarouselContext = createContext<CarouselContextValue | null>(null)

function useCarousel() {
  const ctx = useContext(CarouselContext)
  if (!ctx)
    throw new Error('Carousel.* must be used within a <Carousel> parent.')
  return ctx
}

export interface CarouselProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: Orientation
  loop?: boolean
  align?: Align
}

const CarouselRootElement = forwardRef<HTMLElement, CarouselProps>(
  function Carousel(
    {
      className,
      orientation = 'horizontal',
      loop = false,
      align = 'start',
      children,
      onKeyDown,
      'aria-label': ariaLabel = 'Carousel',
      ...props
    },
    ref,
  ) {
    const contentRef = useRef<HTMLDivElement | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [count, setCount] = useState(0)
    const contentId = useId()

    // Active index and count are read from geometry: the item whose centre
    // is nearest the track's centre wins. Direction- and orientation-
    // agnostic (getBoundingClientRect is always physical), so RTL needs no
    // special case.
    useEffect(() => {
      const track = contentRef.current
      if (!track) return
      const update = () => {
        const items = Array.from(track.children) as HTMLElement[]
        setCount(items.length)
        if (items.length === 0) return
        const tr = track.getBoundingClientRect()
        const horizontal = orientation === 'horizontal'
        const centre = horizontal
          ? tr.left + tr.width / 2
          : tr.top + tr.height / 2
        let best = 0
        let bestDist = Infinity
        items.forEach((item, i) => {
          const r = item.getBoundingClientRect()
          const c = horizontal ? r.left + r.width / 2 : r.top + r.height / 2
          const dist = Math.abs(c - centre)
          if (dist < bestDist) {
            bestDist = dist
            best = i
          }
        })
        setActiveIndex(best)
      }
      update()
      track.addEventListener('scroll', update, { passive: true })
      const ro = new ResizeObserver(update)
      ro.observe(track)
      return () => {
        track.removeEventListener('scroll', update)
        ro.disconnect()
      }
    }, [orientation, children])

    const scrollTo = useCallback(
      (index: number) => {
        const track = contentRef.current
        if (!track) return
        const item = track.children[index] as HTMLElement | undefined
        if (!item) return
        if (orientation === 'horizontal')
          item.scrollIntoView({ inline: align, block: 'nearest' })
        else item.scrollIntoView({ block: align, inline: 'nearest' })
      },
      [orientation, align],
    )

    const canPrev = loop || activeIndex > 0
    const canNext = loop || activeIndex < count - 1

    const scrollPrev = useCallback(() => {
      const target = activeIndex > 0 ? activeIndex - 1 : loop ? count - 1 : 0
      scrollTo(target)
    }, [activeIndex, count, loop, scrollTo])

    const scrollNext = useCallback(() => {
      const target =
        activeIndex < count - 1 ? activeIndex + 1 : loop ? 0 : count - 1
      scrollTo(target)
    }, [activeIndex, count, loop, scrollTo])

    function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
      onKeyDown?.(event)
      if (event.defaultPrevented) return
      const horizontal = orientation === 'horizontal'
      const rtl =
        horizontal && getComputedStyle(event.currentTarget).direction === 'rtl'
      switch (event.key) {
        case 'ArrowLeft':
          if (!horizontal) break
          event.preventDefault()
          if (rtl) scrollNext()
          else scrollPrev()
          break
        case 'ArrowRight':
          if (!horizontal) break
          event.preventDefault()
          if (rtl) scrollPrev()
          else scrollNext()
          break
        case 'ArrowUp':
          if (horizontal) break
          event.preventDefault()
          scrollPrev()
          break
        case 'ArrowDown':
          if (horizontal) break
          event.preventDefault()
          scrollNext()
          break
        case 'Home':
          event.preventDefault()
          scrollTo(0)
          break
        case 'End':
          event.preventDefault()
          scrollTo(count - 1)
          break
        default:
          break
      }
    }

    return (
      <CarouselContext.Provider
        value={{
          orientation,
          align,
          activeIndex,
          count,
          contentId,
          scrollPrev,
          scrollNext,
          scrollTo,
          canPrev,
          canNext,
          contentRef,
        }}
      >
        {/* The section is the WAI-ARIA carousel region; the keydown handler
            implements the APG Arrow/Home/End slide navigation for focus
            anywhere within it (e.g. on a control) — it never makes the
            region itself a control. */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <section
          ref={ref}
          aria-roledescription="carousel"
          aria-label={ariaLabel}
          className={cn('relative flex flex-col gap-4', className)}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </section>
      </CarouselContext.Provider>
    )
  },
)

const CarouselContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CarouselContent({ className, children, ...props }, ref) {
  const { orientation, contentId, contentRef, activeIndex } = useCarousel()
  const items = Children.toArray(children).filter(isValidElement)
  const total = items.length
  return (
    <div
      ref={(node) => {
        contentRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      id={contentId}
      role="group"
      aria-live="polite"
      className={cn(
        'flex snap-mandatory scroll-smooth [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden',
        orientation === 'horizontal'
          ? 'snap-x flex-row overflow-x-auto'
          : 'snap-y flex-col overflow-y-auto',
        className,
      )}
      {...props}
    >
      {items.map((child, index) => {
        if (
          !isValidElement<{ 'aria-label'?: string; 'data-active'?: string }>(
            child,
          )
        )
          return child
        // `data-active` surfaces the already-computed active index as a pure
        // CSS styling hook (Radix `data-state` idiom) so a consumer can build
        // a focus/peek treatment — the primitive itself still draws nothing
        // and makes no per-item layout decision (Invariant A1).
        const needsLabel = child.props['aria-label'] === undefined
        return cloneElement(child, {
          ...(needsLabel ? { 'aria-label': `${index + 1} of ${total}` } : null),
          'data-active': index === activeIndex ? '' : undefined,
        })
      })}
    </div>
  )
})

const CarouselItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CarouselItem({ className, ...props }, ref) {
  const { align } = useCarousel()
  const snap =
    align === 'center'
      ? 'snap-center'
      : align === 'end'
        ? 'snap-end'
        : 'snap-start'
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn('shrink-0 grow-0', snap, className)}
      {...props}
    />
  )
})

const CarouselPrevious = forwardRef<
  HTMLButtonElement,
  Partial<Omit<IconButtonProps, 'ref'>>
>(function CarouselPrevious({ className, label, icon, ...props }, ref) {
  const { orientation, scrollPrev, canPrev, contentId } = useCarousel()
  const chevron = orientation === 'horizontal' ? ChevronLeft : ChevronUp
  return (
    <IconButton
      ref={ref}
      variant="secondary"
      label={label ?? 'Previous slide'}
      icon={icon ?? <Icon icon={chevron} />}
      onClick={scrollPrev}
      disabled={!canPrev}
      aria-controls={contentId}
      className={className}
      {...props}
    />
  )
})

const CarouselNext = forwardRef<
  HTMLButtonElement,
  Partial<Omit<IconButtonProps, 'ref'>>
>(function CarouselNext({ className, label, icon, ...props }, ref) {
  const { orientation, scrollNext, canNext, contentId } = useCarousel()
  const chevron = orientation === 'horizontal' ? ChevronRight : ChevronDown
  return (
    <IconButton
      ref={ref}
      variant="secondary"
      label={label ?? 'Next slide'}
      icon={icon ?? <Icon icon={chevron} />}
      onClick={scrollNext}
      disabled={!canNext}
      aria-controls={contentId}
      className={className}
      {...props}
    />
  )
})

const CarouselIndicators = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CarouselIndicators({ className, ...props }, ref) {
  const { count, activeIndex, scrollTo, contentId } = useCarousel()
  return (
    <div
      ref={ref}
      role="group"
      aria-label="Choose slide to display"
      aria-controls={contentId}
      className={cn('flex items-center justify-center gap-2', className)}
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => (
        // A thin segmented progress bar, not a Material dot row: every step is
        // a short muted segment, the current one a long accent capsule that
        // morphs its width on a calm token-driven transition. The visible bar
        // is only 4px tall; an invisible `::after` widens the hit target well
        // past the 24px minimum so the elegance never costs usability.
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === activeIndex ? 'true' : undefined}
          onClick={() => scrollTo(i)}
          className={cn(
            "relative h-1 rounded-pill outline-none transition-[width,background-color] duration-standard ease-out after:absolute after:-inset-x-1 after:-inset-y-3 after:content-[''] focus-visible:ring-2 focus-visible:ring-accent-accessible",
            i === activeIndex
              ? 'w-8 bg-accent-accessible'
              : 'w-4 bg-border hover:bg-border-strong',
          )}
        />
      ))}
    </div>
  )
})

export const Carousel = Object.assign(CarouselRootElement, {
  Content: CarouselContent,
  Item: CarouselItem,
  Previous: CarouselPrevious,
  Next: CarouselNext,
  Indicators: CarouselIndicators,
})
