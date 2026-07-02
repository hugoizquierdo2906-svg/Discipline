'use client'

import { useState } from 'react'

import { GlassPanel } from '@/components/ui/glass-panel'
import { Radio, RadioGroup } from '@/components/ui/radio-group'

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

/** Choosing a permission level reveals its consequences — nested settings. */
function PermissionSelector() {
  const [level, setLevel] = useState('editor')
  return (
    <RadioGroup
      label="Client access"
      description="What this client can do in the workspace."
      value={level}
      onValueChange={setLevel}
      data-testid="permissions"
    >
      <Radio value="viewer" label="Viewer" description="Read-only access." />
      <Radio
        value="editor"
        label="Editor"
        description="Can log sessions and edit notes."
      />
      <Radio
        value="owner"
        label="Owner"
        description="Full control, including billing."
      />
    </RadioGroup>
  )
}

function TemplateSelector() {
  return (
    <RadioGroup
      label="Workout template"
      defaultValue="hybrid"
      helperText="You can switch templates any time."
    >
      <Radio
        value="strength"
        label="Strength block"
        description="Heavy compounds · low reps · 4 weeks"
      />
      <Radio
        value="hybrid"
        label="Hybrid block"
        description="Lifting + conditioning · 12 weeks"
      />
      <Radio
        value="endurance"
        label="Endurance block"
        description="Long steady sessions · 8 weeks"
      />
    </RadioGroup>
  )
}

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'

  return (
    <GlassPanel className="w-full max-w-2xl px-8 py-10">
      <div
        className={`relative z-[3] flex flex-col gap-10 ${dark ? '[&_label]:text-white/95 [&_span[id$="-label"]]:text-white/95' : ''}`}
      >
        <p className={body}>
          Radio — mutually exclusive selection on the frozen micro-control
          foundation. Exactly the frozen Checkbox language; the only difference
          is the shape: ○ circle, ● dot. Arrow keys move and select (loop),
          Home/End jump, Space selects.
        </p>

        {/* States. */}
        <section className="flex flex-col gap-4">
          <Head dark={dark}>States</Head>
          <div className="grid gap-6 sm:grid-cols-2">
            <RadioGroup label="Basic" defaultValue="b">
              <Radio value="a" label="Unselected" />
              <Radio value="b" label="Selected" />
              <Radio value="c" label="Disabled" disabled />
              <Radio value="d" label="Invalid" invalid />
              <Radio value="e" label="Label on the left" labelPosition="left" />
            </RadioGroup>
            <div className="flex flex-col gap-6">
              <RadioGroup
                label="Read only"
                readOnly
                defaultValue="locked"
                data-testid="readonly"
              >
                <Radio value="locked" label="Locked choice" />
                <Radio value="other" label="Cannot select" />
              </RadioGroup>
              <RadioGroup label="Required" required error="Choose one option.">
                <Radio value="x" label="Option X" />
                <Radio value="y" label="Option Y" />
              </RadioGroup>
              <RadioGroup label="Disabled group" disabled defaultValue="a">
                <Radio value="a" label="Apple Health" />
                <Radio value="b" label="Garmin" />
              </RadioGroup>
            </div>
          </div>
        </section>

        {/* Groups from the spec. */}
        <section className="flex flex-col gap-4">
          <Head dark={dark}>Groups — vertical · horizontal</Head>
          <div className="grid gap-6 sm:grid-cols-2">
            <RadioGroup label="Membership" defaultValue="discipline">
              <Radio value="order" label="Order" />
              <Radio value="rigueur" label="Rigueur" />
              <Radio value="discipline" label="Discipline" />
            </RadioGroup>
            <RadioGroup label="Goal" defaultValue="strength">
              <Radio value="strength" label="Strength" />
              <Radio value="hypertrophy" label="Hypertrophy" />
              <Radio value="fatloss" label="Fat loss" />
            </RadioGroup>
          </div>
          <RadioGroup
            label="Frequency"
            orientation="horizontal"
            defaultValue="4"
            helperText="Sessions per week."
            data-testid="frequency"
          >
            <Radio value="3" label="3 days" />
            <Radio value="4" label="4 days" />
            <Radio value="5" label="5 days" />
            <Radio value="6" label="6 days" />
          </RadioGroup>
          <RadioGroup label="Gender" orientation="horizontal" defaultValue="m">
            <Radio value="m" label="Male" />
            <Radio value="f" label="Female" />
          </RadioGroup>
        </section>

        {/* Real-world selectors. */}
        <section className="flex flex-col gap-4">
          <Head dark={dark}>Permission selector · template selector</Head>
          <div className="grid gap-8 sm:grid-cols-2">
            <PermissionSelector />
            <TemplateSelector />
          </div>
        </section>
      </div>
    </GlassPanel>
  )
}

export function RadioScene({ bg }: { bg: 'proof-canvas' | 'proof-media' }) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col items-center justify-center gap-8 p-8 py-24`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-center text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Capture background'} — Radio (Micro)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
