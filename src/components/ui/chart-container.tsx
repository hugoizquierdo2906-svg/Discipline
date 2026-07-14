'use client'

import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useState,
} from 'react'

import { cn } from '@/lib/cn'

import { EmptyState, type EmptyStateProps } from './empty-state'
import { ErrorState, type ErrorStateProps } from './error-state'
import { GlassCard } from './glass-card'
import { Heading } from './heading'
import { Spinner } from './spinner'
import { Text } from './text'

/**
 * ChartContainer — a Data Display primitive that answers exactly ONE
 * question: "how do I host a data visualization CLEANLY?" It provides the
 * CONTAINER, never the content. It lays out a surface with a title, a
 * description, a render zone (with an optional aspect ratio), a legend, a
 * footer and the three resolution states (loading / empty / error) — and it
 * stops there. It never knows the data, the axes, the series, the scales,
 * the colours or the chart TYPE. It draws no line, no bar, no arc, no point,
 * no gridline, no tooltip: whatever renders inside the render zone — an SVG,
 * a `<canvas>`, an `<img>`, a Recharts/Chart.js/D3/ECharts tree, a bare div —
 * is the consumer's, passed in verbatim. This is what lets the SAME container
 * host any visualization technology for the next ten years without ever being
 * rewritten.
 *
 * Not a chart and NOT a chart library — it is deliberately the opposite: the
 * frame, not the drawing. Not a Card/GlassCard (those are generic surfaces
 * for arbitrary content; ChartContainer is the SPECIALIZED surface a
 * visualization sits in — it COMPOSES the frozen GlassCard for its material
 * and adds only the viz-hosting rhythm: caption block, ratio-controlled
 * render zone, legend, footer, load/empty/error zones). Not a Panel/Canvas
 * (a raw drawing surface with no caption, legend or state semantics). Not an
 * SVG or Image (the raw marks / a rasterized picture — those are things a
 * consumer PLACES in the render zone). Not a Table or DataGrid (exact values
 * compared cell by cell; a visualization shows shape/trend/proportion, and
 * when a consumer wants both they place a Table and a ChartContainer side by
 * side). Not a Timeline or ActivityFeed (an ordered/recent list of events,
 * no render zone, no legend). Not a Metric / Stat / KPI tile (a single
 * headline number with its delta — that is content a consumer may drop into
 * the render zone, or a sibling; ChartContainer hosts a *visualization*, not
 * a formatted number) — and not a Progress bar (one known fraction of one
 * task). Not a Dashboard or a dashboard widget (a dashboard ARRANGES many
 * ChartContainers/metrics into a grid and owns the data wiring — that is a
 * composing screen, business logic that lives far above this primitive).
 *
 * Category: Data Display. A real compound (`ChartContainer` /
 * `ChartContainer.Header` / `ChartContainer.Title` /
 * `ChartContainer.Description` / `ChartContainer.Content` /
 * `ChartContainer.Legend` / `ChartContainer.Footer` /
 * `ChartContainer.Empty` / `ChartContainer.Loading` /
 * `ChartContainer.Error`). The root renders the frozen GlassCard as a
 * `<figure>` (self-contained content referenced as one unit) and stacks its
 * regions on the content plane with one calm rhythm. When a `Title` is
 * present it labels the figure (`aria-labelledby`); a `Description` describes
 * it (`aria-describedby`) — both wired structurally through context and a
 * mount-time registration, so the references are never dangling when a slot
 * is omitted. `ChartContainer.Content` is the render zone: a bare, full-width
 * box whose only opinion is an optional `ratio` (any CSS `aspect-ratio`
 * value — `16 / 9`, `1`, `4 / 3`…), pure layout with no business meaning, so
 * the visualization keeps a stable shape as the card resizes. Item/viz sizing
 * beyond that is the consumer's decision (Invariant A1 — the container makes
 * no decision about the drawing it hosts). `ChartContainer.Legend`,
 * `ChartContainer.Footer` are quiet slots for consumer-supplied nodes (swatch
 * rows, source notes, timestamps). `ChartContainer.Loading` centres the
 * frozen Spinner (`role="status"`) in the render zone; `ChartContainer.Empty`
 * composes the frozen EmptyState; `ChartContainer.Error` composes the frozen
 * ErrorState — the container reimplements none of them, it only gives them a
 * centred render-zone box. Composes ONLY the frozen GlassCard / Heading /
 * Text / Spinner / EmptyState / ErrorState and Typography/`divider` tokens —
 * no chart engine, no data prop, no colour scale, no axis, ever. RTL falls
 * out of logical properties; motion is none of its own (only whatever the
 * composed Spinner already owns, itself `prefers-reduced-motion`-aware).
 */

interface ChartContainerContextValue {
  titleId: string
  descriptionId: string
  registerTitle: (present: boolean) => void
  registerDescription: (present: boolean) => void
}

const ChartContainerContext = createContext<ChartContainerContextValue | null>(
  null,
)

function useChartContainer(part: string) {
  const ctx = useContext(ChartContainerContext)
  if (!ctx)
    throw new Error(`${part} must be used within a <ChartContainer> parent.`)
  return ctx
}

export interface ChartContainerProps extends React.HTMLAttributes<HTMLElement> {
  /** Primary intent folds a low, diffuse violet into the surface (GlassCard). */
  intent?: 'neutral' | 'primary'
}

const ChartContainerRoot = forwardRef<HTMLElement, ChartContainerProps>(
  function ChartContainer({ className, intent, children, ...props }, ref) {
    const titleId = useId()
    const descriptionId = useId()
    const [hasTitle, setHasTitle] = useState(false)
    const [hasDescription, setHasDescription] = useState(false)

    return (
      <ChartContainerContext.Provider
        value={{
          titleId,
          descriptionId,
          registerTitle: setHasTitle,
          registerDescription: setHasDescription,
        }}
      >
        <GlassCard
          ref={ref as React.Ref<HTMLDivElement>}
          as="figure"
          intent={intent}
          aria-labelledby={hasTitle ? titleId : undefined}
          aria-describedby={hasDescription ? descriptionId : undefined}
          className={cn('m-0', className)}
          {...props}
        >
          <div className="flex flex-col gap-5">{children}</div>
        </GlassCard>
      </ChartContainerContext.Provider>
    )
  },
)

const ChartContainerHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function ChartContainerHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-1', className)}
      {...props}
    />
  )
})

const ChartContainerTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(function ChartContainerTitle({ className, ...props }, ref) {
  const { titleId, registerTitle } = useChartContainer('ChartContainer.Title')
  // Register presence so the figure is labelled only when a Title exists —
  // no dangling aria-labelledby when the slot is omitted.
  useEffect(() => {
    registerTitle(true)
    return () => registerTitle(false)
  }, [registerTitle])
  // Card-title scale (h5 — the canonical token's own "Titre de carte"), not
  // the larger block-title h4: a chart caption must stay quiet so the
  // visualization, not the Header, is the focal point. Semantic level stays
  // h3 for the document outline.
  return (
    <Heading
      ref={ref}
      as="h3"
      level={5}
      id={titleId}
      className={className}
      {...props}
    />
  )
})

const ChartContainerDescription = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(function ChartContainerDescription({ className, ...props }, ref) {
  const { descriptionId, registerDescription } = useChartContainer(
    'ChartContainer.Description',
  )
  useEffect(() => {
    registerDescription(true)
    return () => registerDescription(false)
  }, [registerDescription])
  return (
    <Text
      ref={ref}
      id={descriptionId}
      className={cn('text-body-sm text-text-secondary', className)}
      {...props}
    />
  )
})

export interface ChartContainerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Any CSS `aspect-ratio` value (`16 / 9`, `4 / 3`, `1`…) — pure layout. */
  ratio?: number | string
}

const ChartContainerContent = forwardRef<
  HTMLDivElement,
  ChartContainerContentProps
>(function ChartContainerContent({ className, ratio, style, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('relative w-full', className)}
      style={ratio != null ? { aspectRatio: String(ratio), ...style } : style}
      {...props}
    />
  )
})

const ChartContainerLegend = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function ChartContainerLegend({ className, ...props }, ref) {
  // A quiet row of consumer-supplied legend items (swatch + label). The
  // container never invents series — it only lays them out and wraps.
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-wrap items-center gap-x-4 gap-y-2 text-body-sm text-text-secondary',
        className,
      )}
      {...props}
    />
  )
})

const ChartContainerFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function ChartContainerFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('text-caption text-text-tertiary', className)}
      {...props}
    />
  )
})

/**
 * A centred render-zone box the state slots (Loading/Empty/Error) share, so a
 * spinner/empty/error resolution occupies the same space a chart would. The
 * forwarded ref anchors on this box, never on the ref-less flat state
 * primitives it wraps.
 */
const StateZone = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function StateZone({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex min-h-48 w-full items-center justify-center',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})

export interface ChartContainerLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible label for the spinner (visually hidden). */
  label?: string
}

const ChartContainerLoading = forwardRef<
  HTMLDivElement,
  ChartContainerLoadingProps
>(function ChartContainerLoading({ className, label, ...props }, ref) {
  return (
    <StateZone ref={ref} className={className} {...props}>
      <Spinner size="lg" label={label} />
    </StateZone>
  )
})

const ChartContainerEmpty = forwardRef<HTMLDivElement, EmptyStateProps>(
  function ChartContainerEmpty(props, ref) {
    return (
      <StateZone ref={ref}>
        <EmptyState {...props} />
      </StateZone>
    )
  },
)

const ChartContainerError = forwardRef<HTMLDivElement, ErrorStateProps>(
  function ChartContainerError(props, ref) {
    return (
      <StateZone ref={ref}>
        <ErrorState {...props} />
      </StateZone>
    )
  },
)

export const ChartContainer = Object.assign(ChartContainerRoot, {
  Header: ChartContainerHeader,
  Title: ChartContainerTitle,
  Description: ChartContainerDescription,
  Content: ChartContainerContent,
  Legend: ChartContainerLegend,
  Footer: ChartContainerFooter,
  Loading: ChartContainerLoading,
  Empty: ChartContainerEmpty,
  Error: ChartContainerError,
})
