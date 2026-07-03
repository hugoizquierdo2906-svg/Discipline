'use client'

import { useState } from 'react'

import { GlassPanel } from '@/components/ui/glass-panel'
import { OtpInput } from '@/components/ui/otp-input'

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

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'

  const [progressive, setProgressive] = useState('12')
  const [pasteValue, setPasteValue] = useState('')

  return (
    <GlassPanel className="w-full max-w-2xl px-8 py-10">
      <div
        className={`relative z-[3] flex flex-col gap-10 ${dark ? '[&_label]:text-white/95' : ''}`}
      >
        <p className={body}>
          OTP Input — several visual cells, one logical value. Each cell is the
          exact Control Surface well Input itself renders, compacted to a
          square. Typing auto-advances; Backspace on an empty cell moves back
          and clears the previous cell; pasting a full code anywhere splits it
          across the remaining cells.
        </p>

        {/* States. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>States</Head>
          <div className="flex flex-col gap-5">
            <OtpInput label="Empty" data-testid="empty-target" />
            <OtpInput
              label="Progressive typing"
              value={progressive}
              onValueChange={setProgressive}
              data-testid="progressive-target"
            />
            <OtpInput label="Filled" defaultValue="123456" />
            <OtpInput
              label="Error"
              defaultValue="1234"
              error="This code is invalid or has expired."
            />
            <OtpInput label="Disabled" defaultValue="123" disabled />
            <OtpInput label="Read only" defaultValue="654321" readOnly />
            <OtpInput
              label="Autofocus"
              // eslint-disable-next-line jsx-a11y/no-autofocus -- demo of an opt-in prop
              autoFocus
              data-testid="autofocus-target"
            />
            <OtpInput
              label="Paste a full code"
              value={pasteValue}
              onValueChange={setPasteValue}
              data-testid="paste-target"
            />
          </div>
        </section>

        {/* Lengths. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Lengths</Head>
          <div className="flex flex-col gap-5">
            <OtpInput label="4 digits" length={4} data-testid="length-4" />
            <OtpInput label="6 digits" length={6} data-testid="length-6" />
            <OtpInput label="8 digits" length={8} data-testid="length-8" />
          </div>
        </section>

        {/* Sizes. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Sizes</Head>
          <div className="flex flex-col gap-5">
            <OtpInput label="Small" size="sm" defaultValue="1234" length={4} />
            <OtpInput label="Medium" size="md" defaultValue="1234" length={4} />
            <OtpInput label="Large" size="lg" defaultValue="1234" length={4} />
          </div>
        </section>
      </div>
    </GlassPanel>
  )
}

export function OtpInputScene({ bg }: { bg: 'proof-canvas' | 'proof-media' }) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col items-center justify-center gap-8 p-8 py-24`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-center text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Capture background'} — OTP Input (Control)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
