'use client'

import { Check } from 'lucide-react'
import { forwardRef, useId } from 'react'

import { cn } from '@/lib/cn'

import { Icon } from './icon'
import { Spinner } from './spinner'

/**
 * Stepper — DISCIPLINE's indicator of PROGRESS through a sequence of
 * ordered, semantically DIFFERENT steps of ONE task being completed right
 * now (Account → Profile → Payment → Review): "where am I in THIS task,
 * how much is done, how much is left" — never "which facet of the same
 * record" (Tabs), never "where am I in a navigation hierarchy" (Breadcrumb),
 * never "which page of this list" (Pagination). The Stepper NEVER owns or
 * renders step content — it is purely the progress indicator a Wizard (or
 * any multi-step flow) composes above its own content.
 *
 * Not Tabs (interchangeable views, freely reachable in any order, no
 * required sequence, no completed/pending state at all — a Stepper's
 * entire point is ORDER + PROGRESS, which Tabs structurally lacks), not a
 * Breadcrumb (a navigation HIERARCHY of ancestors, never a completion
 * state — no "done/current/upcoming" distinction, no concept of finishing
 * anything), not Pagination (structurally IDENTICAL pages of a data
 * collection, no "done" semantics, no fixed small count — a Stepper is
 * always a small, fixed, KNOWN number of steps, never collapsed), not
 * Progress / Progress Ring (a single CONTINUOUS quantity, 0–100%, with no
 * named, discrete, individually-addressable steps — a Stepper's steps
 * each have their own label, description, icon and clickability), not a
 * Timeline (a read-only, often UNBOUNDED chronological record of PAST
 * events with timestamps — a Stepper is a small, fixed, forward-looking
 * set of steps for a task happening NOW, not a history log), not a
 * Navigation Menu (the app's independent, primary destinations, no order
 * or completion), not vertical Tabs (orientation never changes what a
 * component IS — vertical Tabs are still interchangeable views with no
 * order/progress; what distinguishes Stepper is the ORDER and the
 * completed/current/pending STATE machine, not its axis), not a Wizard
 * (a higher-level composition that OWNS step content, validation and
 * navigation flow — the Stepper is only the indicator a Wizard would
 * compose above that content, never a duplicate of it), not a plain
 * `<ol>` (no progress semantics, no `aria-current="step"`, no completed/
 * pending visual state, no connectors, no click/keyboard handling — an
 * ingredient Stepper uses internally, not a substitute).
 *
 * A FLAT primitive with NO Material Role (zero GlassSurface, zero motion
 * budget) — the sibling of the frozen Breadcrumb/Pagination, not Tabs:
 * MUI itself files Stepper under "Navigation" (the same precedent signal
 * already used for Breadcrumb/Pagination/Tabs). Unlike Tabs (a composite
 * ARIA widget with roving tabindex, `aria-selected`), Stepper structurally
 * matches Breadcrumb/Pagination's OWN sub-family: a plain list where
 * clickable steps are independent, native-Tab-order buttons and exactly
 * one item carries `aria-current` — here `aria-current="step"`, the
 * value the ARIA spec defines specifically for "the current step within a
 * process," explicitly distinct from `aria-selected` (confirmed: no
 * composite-widget role is appropriate). No WAI-ARIA APG pattern exists
 * for "Stepper" (unlike Tabs/Breadcrumb, which have dedicated APG
 * patterns) — this structure is DISCIPLINE's own, grounded directly in
 * `aria-current`'s own defined semantics. States are expressed ONLY by
 * typography, borders, the frozen Icon (a checkmark on completed steps)
 * and the frozen Spinner (`loading` only) — never GlassSurface, never a
 * sliding/animated connector (zero transition/animation in this file).
 *
 * A SINGLE, self-contained, non-compound component (no exported sub-parts)
 * — matching Pagination's own precedent for "une API très simple" over a
 * compound Breadcrumb-style API, since a Stepper's layout is far more
 * uniform across real usages. Per Material Design's own explicit mobile
 * guidance ("prefer vertical steppers... horizontal steppers typically
 * introduce horizontal scrolling" on narrow screens), the `responsive`
 * layer (default on, CSS-only, zero JS measuring — same technique as
 * Breadcrumb/Pagination) auto-switches horizontal to vertical below the
 * `md` breakpoint rather than ever scrolling a progress indicator
 * horizontally, by rendering BOTH structures and letting CSS pick one
 * (the two trees use distinct id namespaces so `aria-describedby` never
 * collides); an explicit `orientation="vertical"` skips it (already
 * vertical). Two additive props beyond the brief's literal list, both
 * indispensable: `onStepClick` (a `clickable` Stepper with no way to
 * observe a click would not be navigable — exactly why Pagination needed
 * `onPageChange` and Tabs needed `onValueChange`) and `responsive` (the
 * brief's own §6 explicitly requires the mobile adaptation this prop
 * implements). Future consumers: a Wizard (composes Stepper as its
 * progress indicator, owns content/validation/flow), onboarding, client
 * creation, program builder — any multi-step flow.
 *
 * `loading` justification: advancing FROM the current step in a real flow
 * (e.g. submitting Payment before Review can be shown) is almost always
 * gated on an async call the Stepper itself never owns or awaits — the
 * consuming Wizard does. `loading` is the one signal a Wizard needs to
 * freeze the WHOLE indicator (every step, not only the current one,
 * becomes non-interactive — jumping to an already-completed step mid-
 * submit would be as wrong as jumping ahead) while placing the transition-
 * in-flight feedback where the user is already looking: the current
 * step's own circle, via the frozen Spinner, replacing its number/icon
 * for that instant. This mirrors the frozen Pagination's own `loading`
 * (disables all controls while a page transition is in flight) adapted to
 * Stepper's shape — Pagination appends a standalone Spinner because it has
 * no single "current" focal element to reuse; Stepper's current-step
 * circle already IS that element.
 */

export interface StepperStep {
  id: string
  label: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export interface StepperProps extends Omit<
  React.ComponentPropsWithoutRef<'nav'>,
  'onClick'
> {
  /** Index (0-based) of the current step in `steps`. */
  currentStep: number
  steps: StepperStep[]
  /** Called when a clickable, non-disabled step is activated. */
  onStepClick?: (index: number, step: StepperStep) => void
  orientation?: 'horizontal' | 'vertical'
  /** Steps become real, focusable buttons. Default false (purely informative). */
  clickable?: boolean
  /**
   * Step ids to mark completed in addition to the default rule (every step
   * before `currentStep` is auto-completed) — for non-linear flows where a
   * later step was finished out of order.
   */
  completed?: string[]
  /** Disables interaction and shows a Spinner on the current step. */
  loading?: boolean
  disabled?: boolean
  /** Auto-switches to vertical below the `md` breakpoint (CSS-only, no
   * measuring). Default true; ignored when `orientation="vertical"`. */
  responsive?: boolean
}

type StepStatus = 'completed' | 'current' | 'pending'

function getStepStatus(
  index: number,
  step: StepperStep,
  currentStep: number,
  completed: string[] | undefined,
): StepStatus {
  if (index === currentStep) return 'current'
  if (completed?.includes(step.id) || index < currentStep) return 'completed'
  return 'pending'
}

const circleClass: Record<StepStatus, string> = {
  completed:
    'border-accent-accessible bg-accent-accessible text-text-on-accent',
  current: 'border-accent-accessible text-accent-accessible',
  pending: 'border-border text-text-tertiary',
}

function Indicator({
  status,
  loading,
  icon,
  index,
}: {
  status: StepStatus
  loading: boolean
  icon?: React.ReactNode
  index: number
}) {
  return (
    <span
      className={cn(
        'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border-2 text-body-sm font-medium',
        circleClass[status],
      )}
    >
      {loading ? (
        <Spinner size="sm" label="Loading" />
      ) : status === 'completed' ? (
        // The checkmark always wins once a step is done — the universal
        // "complete" signal takes priority over any per-step custom icon,
        // which only distinguishes step TYPE while pending/current.
        <Icon icon={Check} size="sm" />
      ) : (
        (icon ?? index + 1)
      )}
    </span>
  )
}

export const Stepper = forwardRef<HTMLElement, StepperProps>(function Stepper(
  {
    currentStep,
    steps,
    onStepClick,
    orientation = 'horizontal',
    clickable = false,
    completed,
    loading = false,
    disabled = false,
    responsive = true,
    className,
    'aria-label': ariaLabel = 'Progress',
    ...props
  },
  ref,
) {
  const autoId = useId()
  const inert = disabled || loading

  function renderStep(
    step: StepperStep,
    index: number,
    layout: 'horizontal' | 'vertical',
    idNamespace: string,
  ) {
    const status = getStepStatus(index, step, currentStep, completed)
    const isCurrent = status === 'current'
    const isFirst = index === 0
    const isLast = index === steps.length - 1
    // A connector segment sits BETWEEN two steps and is drawn from both
    // sides (this step's "after" + the next step's "before") — both must
    // agree, so each side reads whether the step at the SEGMENT'S START is
    // completed, never its own status alone (the step after a completed
    // one is not itself completed, but the segment leading to it is).
    const prevStatus =
      index > 0
        ? getStepStatus(index - 1, steps[index - 1]!, currentStep, completed)
        : undefined
    const beforeFilled = prevStatus === 'completed'
    const afterFilled = status === 'completed'
    const beforeConnectorClass = isFirst
      ? 'invisible'
      : beforeFilled
        ? 'bg-accent-accessible'
        : 'bg-border'
    const afterConnectorClass = isLast
      ? 'invisible'
      : afterFilled
        ? 'bg-accent-accessible'
        : 'bg-border'
    const stepDisabled = inert || Boolean(step.disabled)
    const descId = step.description
      ? `${autoId}-${idNamespace}-desc-${index}`
      : undefined
    // Element TYPE depends only on `clickable` — a disabled step stays a
    // real, natively-disabled `<button>` (matching the frozen Pagination/
    // Tabs convention: disabled never swaps the element type, just its
    // interactive state), never demoted to an inert span.
    const isInteractive = clickable
    const stateLabel =
      status === 'completed' ? ', completed' : isCurrent ? ', current' : ''

    const labelBlock = (
      <span
        className={cn(
          'flex flex-col',
          layout === 'horizontal'
            ? 'items-center text-center'
            : 'items-start text-left',
        )}
      >
        <span
          className={cn(
            'text-body-sm',
            isCurrent
              ? 'font-medium text-text'
              : status === 'completed'
                ? 'text-text'
                : 'text-text-tertiary',
          )}
        >
          {step.label}
          <span className="sr-only">{stateLabel}</span>
        </span>
        {step.description && (
          <span id={descId} className="text-caption text-text-tertiary">
            {step.description}
          </span>
        )}
      </span>
    )

    const indicator = (
      <Indicator
        status={status}
        loading={loading && isCurrent}
        icon={step.icon}
        index={index}
      />
    )

    const sharedA11yProps = {
      'aria-current': isCurrent ? ('step' as const) : undefined,
      'aria-disabled': stepDisabled || undefined,
      'aria-describedby': descId,
    }

    if (layout === 'horizontal') {
      // The connector row wraps ONLY the indicator (never the label) — the
      // two `flex-1` connectors must divide the FULL li width between
      // themselves and the fixed-size circle alone. Nesting the (often
      // long, multi-line) label inside this same row would give the label's
      // content width priority over the connectors, collapsing both toward
      // zero regardless of how wide the step column actually is.
      const connectorRow = (
        <span className="flex w-full items-center">
          <span
            aria-hidden="true"
            className={cn('h-px flex-1', beforeConnectorClass)}
          />
          {indicator}
          <span
            aria-hidden="true"
            className={cn('h-px flex-1', afterConnectorClass)}
          />
        </span>
      )
      return (
        <li key={step.id} className="flex flex-1 flex-col items-center gap-2">
          {isInteractive ? (
            <button
              type="button"
              {...sharedA11yProps}
              disabled={stepDisabled}
              onClick={() => onStepClick?.(index, step)}
              className={cn(
                'flex w-full flex-col items-center gap-2 rounded-md outline-none',
                'focus-visible:ring-2 focus-visible:ring-accent-accessible',
                stepDisabled && 'pointer-events-none opacity-40',
              )}
            >
              {connectorRow}
              {labelBlock}
            </button>
          ) : (
            <span
              {...sharedA11yProps}
              className={cn(
                'flex w-full flex-col items-center gap-2',
                stepDisabled && 'opacity-40',
              )}
            >
              {connectorRow}
              {labelBlock}
            </span>
          )}
        </li>
      )
    }

    return (
      <li key={step.id} className="flex gap-3">
        <span className="flex flex-col items-center">
          <span
            aria-hidden="true"
            className={cn('w-px min-h-6 flex-1', beforeConnectorClass)}
          />
          {indicator}
          <span
            aria-hidden="true"
            className={cn('w-px min-h-6 flex-1', afterConnectorClass)}
          />
        </span>
        {isInteractive ? (
          <button
            type="button"
            {...sharedA11yProps}
            disabled={stepDisabled}
            onClick={() => onStepClick?.(index, step)}
            className={cn(
              'flex flex-1 rounded-md pb-6 text-left outline-none',
              'focus-visible:ring-2 focus-visible:ring-accent-accessible',
              stepDisabled && 'pointer-events-none opacity-40',
            )}
          >
            {labelBlock}
          </button>
        ) : (
          <span
            {...sharedA11yProps}
            className={cn('flex flex-1 pb-6', stepDisabled && 'opacity-40')}
          >
            {labelBlock}
          </span>
        )}
      </li>
    )
  }

  function renderList(layout: 'horizontal' | 'vertical', idNamespace: string) {
    return (
      <ol
        className={cn(
          layout === 'horizontal' ? 'flex w-full items-start' : 'flex flex-col',
        )}
      >
        {steps.map((step, index) =>
          renderStep(step, index, layout, idNamespace),
        )}
      </ol>
    )
  }

  const showResponsiveFallback = orientation === 'horizontal' && responsive

  return (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={cn('w-full', className)}
      {...props}
    >
      {showResponsiveFallback ? (
        <>
          <div className="hidden md:block">
            {renderList('horizontal', 'desktop')}
          </div>
          <div className="md:hidden">{renderList('vertical', 'mobile')}</div>
        </>
      ) : (
        renderList(orientation, 'only')
      )}
    </nav>
  )
})

Stepper.displayName = 'Stepper'
