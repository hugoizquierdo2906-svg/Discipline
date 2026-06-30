import { GlassSurface } from '@/components/ui/glass-surface'

import './tooltip.css'

/**
 * TooltipReference — the single Floating Surface reference (isolated dev
 * component). Built from the SAME optical layers as the frozen Button (it
 * renders the shared <GlassSurface/>), re-tuned to the Floating role: a thin,
 * transient pane with almost no volume, medium transmission (it floats over
 * content), a medium Fresnel rim carrying the read, a quick specular and a
 * light detaching shadow. Neutral — no violet. The Floating expression lives in
 * tooltip.css, scoped to `.fl-tip`; the frozen roles are not modified.
 *
 * Rendered as a static, always-visible pane so the material can be judged in
 * isolation; the production Tooltip will wire this expression onto Radix.
 */
export function TooltipReference({ label }: { label: string }) {
  return (
    <span className="fl-tip ds-glass" role="tooltip">
      <GlassSurface />
      <span className="fl-tip__arrow" aria-hidden />
      <span className="fl-tip__label">{label}</span>
    </span>
  )
}
