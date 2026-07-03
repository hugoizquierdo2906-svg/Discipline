'use client'

import { useState } from 'react'

import { GlassPanel } from '@/components/ui/glass-panel'
import { Slider } from '@/components/ui/slider'

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

/** A stateful demo row: label + live value readout, controlled locally. */
function ValueSlider({
  label,
  description,
  min,
  max,
  step,
  defaultValue,
  unit = '',
  size,
}: {
  label: string
  description?: string
  min: number
  max: number
  step: number
  defaultValue: number
  unit?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const [value, setValue] = useState([defaultValue])
  return (
    <Slider
      label={`${label} — ${value[0]}${unit}`}
      description={description}
      min={min}
      max={max}
      step={step}
      value={value}
      onValueChange={setValue}
      size={size}
    />
  )
}

function VerticalRow() {
  const [a, setA] = useState([30])
  const [b, setB] = useState([65])
  const [c, setC] = useState([85])
  return (
    <div className="flex items-end gap-10">
      <div className="flex h-40 flex-col items-center gap-3">
        <Slider
          orientation="vertical"
          value={a}
          onValueChange={setA}
          className="h-32"
        />
        <span className="text-caption text-text-tertiary">{a[0]}</span>
      </div>
      <div className="flex h-40 flex-col items-center gap-3">
        <Slider
          orientation="vertical"
          value={b}
          onValueChange={setB}
          className="h-32"
          size="lg"
        />
        <span className="text-caption text-text-tertiary">{b[0]}</span>
      </div>
      <div className="flex h-40 flex-col items-center gap-3">
        <Slider
          orientation="vertical"
          value={c}
          onValueChange={setC}
          className="h-32"
          size="sm"
        />
        <span className="text-caption text-text-tertiary">{c[0]}</span>
      </div>
    </div>
  )
}

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'

  return (
    <GlassPanel className="w-full max-w-3xl px-8 py-10">
      <div
        className={`relative z-[3] flex flex-col gap-10 ${dark ? '[&_label]:text-white/95' : ''}`}
      >
        <p className={body}>
          Slider — a continuous value manipulated by direct position. Same
          family, same material as Checkbox/Radio/Switch: the track and thumb
          are real glass, the filled range is the frozen illuminated accent.
          Arrow keys, Home/End, Page Up/Down; readOnly stays reachable but never
          changes the value.
        </p>

        {/* States. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>States</Head>
          <div className="flex flex-col gap-5">
            <Slider label="Default" defaultValue={[40]} />
            <Slider
              label="Focused"
              defaultValue={[55]}
              data-testid="focus-target"
            />
            <Slider label="Disabled" defaultValue={[30]} disabled />
            <Slider label="Read only" defaultValue={[70]} readOnly />
            <Slider label="Required" defaultValue={[20]} required />
            <Slider label="Invalid" defaultValue={[45]} invalid />
            <Slider
              label="Error"
              defaultValue={[15]}
              error="Volume is below the recommended minimum."
            />
            <Slider
              label="Helper"
              defaultValue={[60]}
              helperText="Drag or use the arrow keys."
            />
            <Slider
              label="Description"
              description="A muted secondary line under the label."
              defaultValue={[50]}
            />
          </div>
        </section>

        {/* Sizes. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Sizes</Head>
          <div className="flex flex-col gap-5">
            <Slider label="Small" defaultValue={[35]} size="sm" />
            <Slider label="Medium" defaultValue={[35]} size="md" />
            <Slider label="Large" defaultValue={[35]} size="lg" />
          </div>
        </section>

        {/* Orientation. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Orientation</Head>
          <div className="flex flex-col gap-6">
            <Slider label="Horizontal" defaultValue={[62]} />
            <VerticalRow />
          </div>
        </section>

        {/* Values. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Values</Head>
          <div className="flex flex-col gap-5">
            <ValueSlider
              label="0 → 100"
              min={0}
              max={100}
              step={1}
              defaultValue={40}
            />
            <ValueSlider
              label="Weight"
              min={40}
              max={150}
              step={0.5}
              defaultValue={72}
              unit=" kg"
            />
            <ValueSlider
              label="Body Fat"
              min={5}
              max={40}
              step={0.5}
              defaultValue={18}
              unit="%"
            />
            <ValueSlider
              label="Calories"
              min={1200}
              max={4000}
              step={50}
              defaultValue={2200}
              unit=" kcal"
            />
            <ValueSlider
              label="Protein"
              min={0}
              max={300}
              step={5}
              defaultValue={150}
              unit=" g"
            />
            <ValueSlider
              label="Hydration"
              min={0}
              max={5}
              step={0.1}
              defaultValue={2.5}
              unit=" L"
            />
            <ValueSlider
              label="Intensity"
              min={1}
              max={10}
              step={1}
              defaultValue={7}
            />
            <ValueSlider
              label="Recovery"
              min={0}
              max={100}
              step={1}
              defaultValue={85}
              unit="%"
            />
          </div>
        </section>

        {/* Real examples. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Real examples</Head>
          <div className="flex flex-col gap-5">
            <ValueSlider
              label="Workout intensity"
              description="Target RPE for today's session."
              min={1}
              max={10}
              step={1}
              defaultValue={8}
              size="lg"
            />
            <ValueSlider
              label="Training volume"
              description="Working sets per week."
              min={0}
              max={30}
              step={1}
              defaultValue={16}
            />
            <ValueSlider
              label="Nutrition — Calories"
              description="Daily target."
              min={1200}
              max={4000}
              step={50}
              defaultValue={2400}
              unit=" kcal"
            />
            <ValueSlider
              label="Daily steps"
              min={0}
              max={20000}
              step={500}
              defaultValue={8500}
            />
            <ValueSlider
              label="Macro split — protein"
              description="Share of daily calories from protein."
              min={0}
              max={100}
              step={5}
              defaultValue={30}
              unit="%"
            />
            <ValueSlider
              label="Recovery score"
              min={0}
              max={100}
              step={1}
              defaultValue={72}
              unit="%"
            />
            <ValueSlider
              label="Coach difficulty"
              min={1}
              max={5}
              step={1}
              defaultValue={3}
              size="sm"
            />
            <ValueSlider
              label="Program progression"
              description="Week 4 of 12."
              min={0}
              max={12}
              step={1}
              defaultValue={4}
            />
          </div>
        </section>
      </div>
    </GlassPanel>
  )
}

export function SliderScene({ bg }: { bg: 'proof-canvas' | 'proof-media' }) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col items-center justify-center gap-8 p-8 py-24`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-center text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Capture background'} — Slider (Micro)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
