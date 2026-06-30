import { Button } from '@/components/ui/button'
import { GlassSurface } from '@/components/ui/glass-surface'

import './modal.css'

/**
 * ModalReference — the single Immersive Surface reference (isolated dev
 * component). Built from the SAME optical layers as the frozen Button (it
 * renders the shared <GlassSurface/>), re-tuned to the thickest "modal" tier:
 * the heaviest glass volume and lens in the system, a quiet rim, a diffuse
 * sheen, and the maximum cast shadow. The role-specific behaviour — the
 * background dims and blurs behind it — is the `.im-scrim`. Neutral: no violet.
 * The Immersive expression lives in modal.css, scoped to `.im-modal`; the four
 * frozen roles are not modified. Static and always-open so the material can be
 * judged in isolation; production will wire this onto Radix Dialog (focus trap,
 * Escape, labelledby).
 */
export function ModalReference() {
  return (
    <>
      <div className="ds-scrim" aria-hidden />
      <div
        className="ds-immersive ds-glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="im-title"
        aria-describedby="im-body"
      >
        <GlassSurface />
        <div className="im-modal__content">
          <h2 id="im-title" className="im-modal__title">
            Delete this program?
          </h2>
          <p id="im-body" className="im-modal__body">
            Your 12-week plan and all logged sessions will be permanently
            removed. This cannot be undone.
          </p>
          <div className="im-modal__actions">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Delete program</Button>
          </div>
        </div>
      </div>
    </>
  )
}
