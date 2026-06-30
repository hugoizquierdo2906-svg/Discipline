import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import { GlassSurface } from './glass-surface'

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Primary intent folds a low, diffuse violet into the core (Grammar §4). */
  intent?: 'neutral' | 'primary'
  /** Render as a different element (e.g. <section>, <article>, <a>). */
  as?: React.ElementType
}

/**
 * GlassCard — the base Structural Surface. First official consumer of the frozen
 * `.ds-card` role expression (src/styles/glass.css), promoted verbatim from the
 * validated /dev/card reference: a thick, calm glass plane (high refraction +
 * depth, quiet rim, diffuse sheen, content breathing through). It renders the
 * shared <GlassSurface/> optical layers and places its children on the content
 * plane (z-3). No material is redefined here — geometry/material live in
 * `.ds-card`; this component only composes them.
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  function GlassCard(
    { className, intent = 'neutral', as: As = 'div', children, ...props },
    ref,
  ) {
    return (
      <As
        ref={ref}
        className={cn('ds-glass ds-card', className)}
        data-glass-intent={intent === 'primary' ? 'primary' : undefined}
        {...props}
      >
        <GlassSurface />
        <div className="relative z-[3]">{children}</div>
      </As>
    )
  },
)
