'use client'

import { useState } from 'react'

import {
  ColorPicker,
  colorPickerDefaultPalette,
} from '@/components/ui/color-picker'
import { GlassPanel } from '@/components/ui/glass-panel'

function Head({
  dark,
  children,
}: {
  dark: boolean
  children: React.ReactNode
}) {
  return (
    <h2
      className={
        dark
          ? 'text-body font-medium text-white/95'
          : 'text-body font-medium text-text'
      }
    >
      {children}
    </h2>
  )
}

// Deterministic values for captures and the proof script — always drawn
// from the component's own default palette, never new literals.
const accent = colorPickerDefaultPalette[0]
const green = colorPickerDefaultPalette[6]
const blue = colorPickerDefaultPalette[11]
const neutrals = colorPickerDefaultPalette.slice(16)

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'

  const [brand, setBrand] = useState(accent ?? '')
  const [tag, setTag] = useState('')

  return (
    <GlassPanel className="w-full max-w-2xl px-8 py-10">
      <div
        className={`relative z-[3] flex flex-col gap-10 ${dark ? '[&_label]:text-white/95' : ''}`}
      >
        <p className={body}>
          Color Picker — one color value, chosen visually from a palette or
          entered as hex. The trigger is Input itself with the current color in
          its prefix slot; the panel is the frozen Popover holding the palette,
          the hex field and a copy action. Palette and hex are perfectly
          synchronized both ways, and the panel stays open across picks so a
          color can be adjusted while seeing the result.
        </p>

        {/* States. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>States</Head>
          <div className="flex flex-col gap-5">
            <ColorPicker label="Empty" data-testid="empty-target" />
            <ColorPicker
              label="Open"
              data-testid="open-target"
              defaultValue={accent}
            />
            <ColorPicker label="With value" defaultValue={green} />
            <ColorPicker
              label="Keyboard"
              data-testid="keyboard-target"
              defaultValue={accent}
            />
            <ColorPicker label="Hex entry" data-testid="hex-target" />
            <ColorPicker label="Loading" loading data-testid="loading-target" />
            <ColorPicker
              label="Disabled"
              defaultValue={blue}
              disabled
              data-testid="disabled-target"
            />
            <ColorPicker
              label="Read only"
              defaultValue={blue}
              readOnly
              data-testid="readonly-target"
            />
            <ColorPicker
              label="Error"
              defaultValue={accent}
              error="This color fails the contrast requirement."
              data-testid="error-target"
            />
            <ColorPicker label="Invalid" invalid data-testid="invalid-target" />
            <ColorPicker label="Required" required />
          </div>
        </section>

        {/* Custom palette. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Custom palette</Head>
          <div className="flex flex-col gap-5">
            <ColorPicker
              label="Neutrals only"
              palette={neutrals}
              helperText="A consumer-supplied palette — any hex stays typeable."
              data-testid="custom-palette-target"
            />
          </div>
        </section>

        {/* Real examples. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Real examples</Head>
          <div className="flex flex-col gap-5">
            <ColorPicker
              label="Brand color"
              description="Used across the coach's client-facing pages."
              value={brand}
              onValueChange={setBrand}
              name="brand-color"
            />
            <ColorPicker
              label="Tag color"
              helperText="Color of the “Mobility” tag."
              value={tag}
              onValueChange={setTag}
            />
          </div>
        </section>
      </div>
    </GlassPanel>
  )
}

export function ColorPickerScene({
  bg,
}: {
  bg: 'proof-canvas' | 'proof-media'
}) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col items-center justify-center gap-8 p-8 py-24`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-center text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Capture background'} — Color Picker (Control)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
