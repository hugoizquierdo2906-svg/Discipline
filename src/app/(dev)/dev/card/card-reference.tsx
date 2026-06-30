import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'

import './card.css'

/**
 * CardReference — the single Structural Surface reference (isolated dev page).
 * It now composes the library <GlassCard/> (first official consumer of the
 * frozen `.ds-card` role), so the reference and the component are the same code
 * by construction — proving the promotion is faithful. Only the content layout
 * (`.cd-card__*`) lives in card.css.
 */
export function CardReference({
  intent = 'neutral',
  eyebrow,
  title,
  body,
  cta,
}: {
  intent?: 'neutral' | 'primary'
  eyebrow?: string
  title: string
  body: string
  cta?: string
}) {
  return (
    <GlassCard intent={intent}>
      <div className="cd-card__content">
        {eyebrow && <span className="cd-card__eyebrow">{eyebrow}</span>}
        <h3 className="cd-card__title">{title}</h3>
        <p className="cd-card__body">{body}</p>
        {cta && (
          <div className="cd-card__footer">
            <Button variant={intent === 'primary' ? 'primary' : 'secondary'}>
              {cta}
            </Button>
          </div>
        )}
      </div>
    </GlassCard>
  )
}
