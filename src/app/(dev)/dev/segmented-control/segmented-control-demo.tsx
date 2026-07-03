'use client'

import { useState } from 'react'

import { GlassPanel } from '@/components/ui/glass-panel'
import { SegmentedControl } from '@/components/ui/segmented-control'

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

  const [unit, setUnit] = useState('kg')

  return (
    <GlassPanel className="w-full max-w-3xl px-8 py-10">
      <div
        className={`relative z-[3] flex flex-col gap-10 ${dark ? '[&_label]:text-white/95' : ''}`}
      >
        <p className={body}>
          SegmentedControl — an exclusive choice among 2–6 options, all visible
          at once. Same underlying interaction model as the frozen Radio (Arrow
          keys move and select, Home/End, full ARIA); the strip is Control
          Surface glass, the selected segment is the exact illuminated accent
          already validated on the frozen Switch rail.
        </p>

        {/* States. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>States</Head>
          <div className="flex flex-col gap-5">
            <SegmentedControl label="Default" defaultValue="a">
              <SegmentedControl.Item value="a">Option A</SegmentedControl.Item>
              <SegmentedControl.Item value="b">Option B</SegmentedControl.Item>
            </SegmentedControl>
            <SegmentedControl label="Selected" defaultValue="b">
              <SegmentedControl.Item value="a">Option A</SegmentedControl.Item>
              <SegmentedControl.Item value="b">Option B</SegmentedControl.Item>
            </SegmentedControl>
            <SegmentedControl
              label="Hover"
              defaultValue="a"
              data-testid="hover-target"
            >
              <SegmentedControl.Item value="a">Option A</SegmentedControl.Item>
              <SegmentedControl.Item value="b" data-testid="hover-item">
                Option B
              </SegmentedControl.Item>
            </SegmentedControl>
            <SegmentedControl
              label="Focused"
              defaultValue="a"
              data-testid="focus-target"
            >
              <SegmentedControl.Item value="a">Option A</SegmentedControl.Item>
              <SegmentedControl.Item value="b">Option B</SegmentedControl.Item>
            </SegmentedControl>
            <SegmentedControl label="Disabled" defaultValue="a" disabled>
              <SegmentedControl.Item value="a">Option A</SegmentedControl.Item>
              <SegmentedControl.Item value="b">Option B</SegmentedControl.Item>
            </SegmentedControl>
            <SegmentedControl label="Read only" defaultValue="a" readOnly>
              <SegmentedControl.Item value="a">Option A</SegmentedControl.Item>
              <SegmentedControl.Item value="b">Option B</SegmentedControl.Item>
            </SegmentedControl>
            <SegmentedControl label="Invalid" defaultValue="a" invalid>
              <SegmentedControl.Item value="a">Option A</SegmentedControl.Item>
              <SegmentedControl.Item value="b">Option B</SegmentedControl.Item>
            </SegmentedControl>
            <SegmentedControl label="Required" defaultValue="a" required>
              <SegmentedControl.Item value="a">Option A</SegmentedControl.Item>
              <SegmentedControl.Item value="b">Option B</SegmentedControl.Item>
            </SegmentedControl>
          </div>
        </section>

        {/* Sizes. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Sizes</Head>
          <div className="flex flex-col gap-5">
            <SegmentedControl label="Small" defaultValue="a" size="sm">
              <SegmentedControl.Item value="a">Small</SegmentedControl.Item>
              <SegmentedControl.Item value="b">Medium</SegmentedControl.Item>
              <SegmentedControl.Item value="c">Large</SegmentedControl.Item>
            </SegmentedControl>
            <SegmentedControl label="Medium" defaultValue="a" size="md">
              <SegmentedControl.Item value="a">Small</SegmentedControl.Item>
              <SegmentedControl.Item value="b">Medium</SegmentedControl.Item>
              <SegmentedControl.Item value="c">Large</SegmentedControl.Item>
            </SegmentedControl>
            <SegmentedControl label="Large" defaultValue="a" size="lg">
              <SegmentedControl.Item value="a">Small</SegmentedControl.Item>
              <SegmentedControl.Item value="b">Medium</SegmentedControl.Item>
              <SegmentedControl.Item value="c">Large</SegmentedControl.Item>
            </SegmentedControl>
          </div>
        </section>

        {/* Orientation. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Orientation</Head>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-12">
            <SegmentedControl label="Horizontal" defaultValue="week">
              <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
              <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
              <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
            </SegmentedControl>
            <SegmentedControl
              label="Vertical"
              defaultValue="week"
              orientation="vertical"
            >
              <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
              <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
              <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
            </SegmentedControl>
          </div>
        </section>

        {/* Real examples. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Real examples</Head>
          <div className="flex flex-col gap-5">
            <SegmentedControl
              label={`Units — ${unit}`}
              value={unit}
              onValueChange={setUnit}
            >
              <SegmentedControl.Item value="kg">Kg</SegmentedControl.Item>
              <SegmentedControl.Item value="lb">Lb</SegmentedControl.Item>
            </SegmentedControl>
            <SegmentedControl label="System" defaultValue="metric">
              <SegmentedControl.Item value="metric">
                Metric
              </SegmentedControl.Item>
              <SegmentedControl.Item value="imperial">
                Imperial
              </SegmentedControl.Item>
            </SegmentedControl>
            <SegmentedControl label="Range" defaultValue="month">
              <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
              <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
              <SegmentedControl.Item value="year">Year</SegmentedControl.Item>
            </SegmentedControl>
            <SegmentedControl label="Appearance" defaultValue="system">
              <SegmentedControl.Item value="light">Light</SegmentedControl.Item>
              <SegmentedControl.Item value="dark">Dark</SegmentedControl.Item>
              <SegmentedControl.Item value="system">
                System
              </SegmentedControl.Item>
            </SegmentedControl>
            <SegmentedControl label="Sex" defaultValue="female">
              <SegmentedControl.Item value="male">Male</SegmentedControl.Item>
              <SegmentedControl.Item value="female">
                Female
              </SegmentedControl.Item>
            </SegmentedControl>
            <SegmentedControl label="Portfolio" defaultValue="coach">
              <SegmentedControl.Item value="coach">Coach</SegmentedControl.Item>
              <SegmentedControl.Item value="client">
                Client
              </SegmentedControl.Item>
            </SegmentedControl>
            <SegmentedControl label="Fitness level" defaultValue="intermediate">
              <SegmentedControl.Item value="beginner">
                Beginner
              </SegmentedControl.Item>
              <SegmentedControl.Item value="intermediate">
                Intermediate
              </SegmentedControl.Item>
              <SegmentedControl.Item value="advanced">
                Advanced
              </SegmentedControl.Item>
            </SegmentedControl>
            <SegmentedControl label="Program focus" defaultValue="hypertrophy">
              <SegmentedControl.Item value="strength">
                Strength
              </SegmentedControl.Item>
              <SegmentedControl.Item value="hypertrophy">
                Hypertrophy
              </SegmentedControl.Item>
              <SegmentedControl.Item value="fat-loss">
                Fat loss
              </SegmentedControl.Item>
            </SegmentedControl>
          </div>
        </section>
      </div>
    </GlassPanel>
  )
}

export function SegmentedControlScene({
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
        {dark ? 'Rich panel' : 'Capture background'} — SegmentedControl
        (Control)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
