import { notFound } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { GlassSurface } from '@/components/ui/glass-surface'
import { Input } from '@/components/ui/input'

import '../card/card.css'
import '../tooltip/tooltip.css'
import '../modal/modal.css'
import './calibration.css'

/**
 * Cross-role calibration proof — development only (404 in production). The five
 * frozen references (Micro/Button, Control/Input, Structural/Card,
 * Floating/Tooltip, Immersive/Modal) coexist, nested, on shared backgrounds
 * under one light, so the material family, the physical hierarchy and any
 * light/refraction/volume/reflection incoherence can be judged before promotion.
 * Reuses the references unchanged.
 */
export const metadata = { robots: { index: false, follow: false } }

/** Structural Card holding a Control input and a Micro button, with a Floating
 * tooltip above the button — four roles coexisting in one nested composition. */
function NestedCluster() {
  return (
    <div className="calib__cluster">
      <div className="cd-card ds-glass" style={{ width: 340 }}>
        <GlassSurface />
        <div className="cd-card__content">
          <span className="calib__rolelabel calib__cardlabel">
            Structural · Card
          </span>
          <Input placeholder="Control · Input" aria-label="Control input" />
          <div className="calib__btnwrap">
            <span className="fl-tip ds-glass calib__tip" role="tooltip">
              <GlassSurface />
              <span className="fl-tip__arrow" aria-hidden />
              <span className="fl-tip__label">Floating · Tooltip</span>
            </span>
            <Button variant="primary" className="btn-embedded">
              Micro · Button
            </Button>
          </div>
        </div>
      </div>

      <div className="calib__modalframe">
        <div className="im-scrim" aria-hidden />
        <div className="im-modal ds-glass" role="group" aria-label="Immersive">
          <GlassSurface />
          <div className="im-modal__content">
            <span className="calib__rolelabel">Immersive · Modal</span>
            <p className="im-modal__body">
              The heaviest glass, over its own dimmed scrim.
            </p>
            <div className="im-modal__actions">
              <Button variant="primary">Confirm</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CalibrationPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Cross-role material calibration</h1>

      <section className="calib calib-media">
        <p className="calib__caption">Media panel — one light</p>
        <NestedCluster />
      </section>

      <section className="calib calib-gradient">
        <p className="calib__caption">Light gradient — one light</p>
        <NestedCluster />
      </section>
    </main>
  )
}
