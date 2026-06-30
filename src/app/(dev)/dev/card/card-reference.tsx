import { Button } from '@/components/ui/button'
import { GlassSurface } from '@/components/ui/glass-surface'

import './card.css'

/**
 * CardReference — the single Structural Surface reference (isolated dev
 * component). Built from the SAME optical layers as the frozen Button (it
 * renders the shared <GlassSurface/>), re-tuned to the "card" thickness tier:
 * a thick, calm lens with high refraction and depth, a quiet rim, a diffuse
 * sheen, and content breathing through. Neutral by default; `intent='primary'`
 * folds a low, diffuse violet into the core. The Structural expression lives in
 * card.css, scoped to `.cd-card`; the library material is not modified.
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
    <div
      className="cd-card ds-glass"
      data-glass-intent={intent === 'primary' ? 'primary' : undefined}
    >
      <GlassSurface />
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
    </div>
  )
}
