'use client'

import { useState } from 'react'

import { GlassPanel } from '@/components/ui/glass-panel'
import { Switch } from '@/components/ui/switch'

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

/** Master switch gates its children — nested switches. */
function NestedSwitches() {
  const [master, setMaster] = useState(true)
  return (
    <div className="flex flex-col gap-3">
      <Switch
        label="Notifications"
        description="Master switch for every channel."
        checked={master}
        onCheckedChange={setMaster}
        data-testid="master"
      />
      <div className="flex flex-col gap-3 pl-12">
        <Switch label="Email alerts" defaultChecked disabled={!master} />
        <Switch label="Push" disabled={!master} />
        <Switch label="Weekly digest" defaultChecked disabled={!master} />
      </div>
    </div>
  )
}

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'

  return (
    <GlassPanel className="w-full max-w-2xl px-8 py-10">
      <div
        className={`relative z-[3] flex flex-col gap-10 ${dark ? '[&_label]:text-white/95' : ''}`}
      >
        <p className={body}>
          Switch — an immediate on/off on the frozen micro-control foundation.
          Exactly the frozen Checkbox/Radio language; only the geometry changes
          — a 44×24 track and the dark glyph, sliding. Space/Enter toggle;
          readOnly stays focusable but never toggles.
        </p>

        {/* States. */}
        <section className="flex flex-col gap-4">
          <Head dark={dark}>States</Head>
          <div className="grid gap-3 sm:grid-cols-2">
            <Switch label="Unchecked" />
            <Switch label="Checked" defaultChecked />
            <Switch label="Disabled" disabled />
            <Switch label="Disabled checked" disabled defaultChecked />
            <Switch label="Read only" readOnly defaultChecked />
            <Switch label="Required" required />
            <Switch label="Invalid" invalid defaultChecked />
            <Switch
              label="Label on the left"
              labelPosition="left"
              defaultChecked
            />
            <Switch
              label="With description"
              description="A muted secondary line under the label."
              defaultChecked
            />
            <Switch
              label="With helper"
              helperText="You can change this later."
            />
            <Switch label="With error" error="This setting must stay on." />
          </div>
        </section>

        {/* Settings examples. */}
        <section className="flex flex-col gap-4">
          <Head dark={dark}>Preference panel</Head>
          <div className="flex flex-col gap-3">
            <Switch
              label="Dark mode"
              description="Match the system appearance."
            />
            <Switch
              label="Biometrics"
              description="Unlock with Face ID / fingerprint."
              defaultChecked
            />
            <Switch
              label="Auto sync"
              description="Sync sessions when on Wi-Fi."
              defaultChecked
            />
          </div>
        </section>

        {/* Permission + workout settings. */}
        <section className="flex flex-col gap-4">
          <Head dark={dark}>Permission panel · workout settings</Head>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <Switch label="Client can message you" defaultChecked />
              <Switch label="Client can edit sessions" />
              <Switch
                label="Client sees billing"
                readOnly
                description="Managed by the workspace owner."
              />
            </div>
            <div className="flex flex-col gap-3">
              <Switch label="Rest-day reminders" defaultChecked />
              <Switch label="RPE tracking" defaultChecked />
              <Switch label="Auto-progression" helperText="Beta feature." />
            </div>
          </div>
        </section>

        {/* Nested. */}
        <section className="flex flex-col gap-4">
          <Head dark={dark}>Nested switches</Head>
          <NestedSwitches />
        </section>
      </div>
    </GlassPanel>
  )
}

export function SwitchScene({ bg }: { bg: 'proof-canvas' | 'proof-media' }) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col items-center justify-center gap-8 p-8 py-24`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-center text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Capture background'} — Switch (Micro)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
