'use client'

import { useState } from 'react'

import { Combobox, type ComboboxOption } from '@/components/ui/combobox'
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

const countries: ComboboxOption[] = [
  'France',
  'Spain',
  'Germany',
  'Japan',
  'United States',
  'United Kingdom',
  'Italy',
  'Portugal',
  'Netherlands',
  'Belgium',
  'Switzerland',
  'Austria',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Poland',
  'Brazil',
  'Mexico',
  'Canada',
  'Australia',
  'South Korea',
].map((label) => ({ value: label.toLowerCase().replace(/\s+/g, '-'), label }))

const languages: ComboboxOption[] = [
  'French',
  'Spanish',
  'English',
  'Japanese',
  'German',
  'Italian',
  'Portuguese',
  'Dutch',
  'Swedish',
  'Korean',
  'Mandarin',
  'Arabic',
  'Russian',
  'Polish',
  'Turkish',
].map((label) => ({ value: label.toLowerCase(), label }))

const exercises: ComboboxOption[] = [
  'Bench Press',
  'Squat',
  'Deadlift',
  'Lat Pulldown',
  'Overhead Press',
  'Barbell Row',
  'Pull-up',
  'Dip',
  'Leg Press',
  'Leg Curl',
  'Leg Extension',
  'Bicep Curl',
  'Tricep Pushdown',
  'Lateral Raise',
  'Face Pull',
  'Hip Thrust',
  'Romanian Deadlift',
  'Front Squat',
  'Incline Bench Press',
  'Cable Fly',
].map((label) => ({ value: label.toLowerCase().replace(/\s+/g, '-'), label }))

const foods: ComboboxOption[] = [
  'Chicken Breast',
  'Rice',
  'Eggs',
  'Potatoes',
  'Salmon',
  'Broccoli',
  'Oats',
  'Greek Yogurt',
  'Almonds',
  'Sweet Potato',
  'Tuna',
  'Spinach',
  'Avocado',
  'Cottage Cheese',
  'Lentils',
  'Quinoa',
  'Banana',
  'Peanut Butter',
  'Ground Beef',
  'Tofu',
].map((label) => ({ value: label.toLowerCase().replace(/\s+/g, '-'), label }))

const sports: ComboboxOption[] = [
  'Fitness',
  'Running',
  'Swimming',
  'Tennis',
  'Cycling',
  'Yoga',
  'Boxing',
  'Rowing',
  'Climbing',
  'CrossFit',
].map((label) => ({ value: label.toLowerCase(), label }))

const workoutTemplates: ComboboxOption[] = [
  'Push Pull Legs',
  'Upper Lower Split',
  'Full Body 3x',
  '5x5 Strength',
  'Hypertrophy Block',
  'Powerlifting Peak',
  'Bodyweight Circuit',
  'Marathon Base',
  'CrossFit WOD',
  'Mobility Reset',
].map((label) => ({ value: label.toLowerCase().replace(/\s+/g, '-'), label }))

const permissions: ComboboxOption[] = [
  'View sessions',
  'Edit sessions',
  'Manage billing',
  'Invite clients',
  'Export data',
  'View analytics',
  'Manage programs',
  'Send messages',
  'Delete records',
  'Admin access',
].map((label) => ({ value: label.toLowerCase().replace(/\s+/g, '-'), label }))

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'

  const [country, setCountry] = useState<string | undefined>('france')
  const [language, setLanguage] = useState<string | undefined>()
  const [exercise, setExercise] = useState<string | undefined>()
  const [food, setFood] = useState<string | undefined>()
  const [sport, setSport] = useState<string | undefined>()
  const [template, setTemplate] = useState<string | undefined>()
  const [permission, setPermission] = useState<string | undefined>()

  return (
    <GlassPanel className="w-full max-w-2xl px-8 py-10">
      <div
        className={`relative z-[3] flex flex-col gap-10 ${dark ? '[&_label]:text-white/95' : ''}`}
      >
        <p className={body}>
          Combobox — a single value found through search across dozens or
          hundreds of options. The trigger is Input itself; the popup is the
          frozen Control Surface popup; rows reuse the frozen Select row
          language. Arrow Up/Down move the active row, Enter commits, Escape
          closes.
        </p>

        {/* States. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>States</Head>
          <div className="flex flex-col gap-5">
            <Combobox
              label="Closed"
              options={countries}
              placeholder="Select a country…"
            />
            <Combobox
              label="Open"
              options={countries}
              placeholder="Select a country…"
              data-testid="open-target"
            />
            <Combobox
              label="Searching"
              options={countries}
              placeholder="Select a country…"
              data-testid="search-target"
            />
            <Combobox
              label="No result"
              options={countries}
              placeholder="Select a country…"
              data-testid="noresult-target"
            />
            <Combobox label="Loading" options={countries} loading />
            <Combobox label="Disabled" options={countries} disabled />
            <Combobox
              label="Read only"
              options={countries}
              defaultValue="france"
              readOnly
            />
            <Combobox label="Invalid" options={countries} invalid />
            <Combobox
              label="Invalid with message"
              options={countries}
              error="Pick a country to continue."
            />
            <Combobox label="Required" options={countries} required />
          </div>
        </section>

        {/* Examples. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Real examples</Head>
          <div className="flex flex-col gap-5">
            <Combobox
              label="Country"
              description="Where the client is based."
              options={countries}
              placeholder="Select a country…"
              value={country}
              onValueChange={setCountry}
            />
            <Combobox
              label="Language"
              options={languages}
              placeholder="Select a language…"
              value={language}
              onValueChange={setLanguage}
            />
            <Combobox
              label="Exercise"
              helperText="Search the exercise library."
              options={exercises}
              placeholder="Select an exercise…"
              value={exercise}
              onValueChange={setExercise}
            />
            <Combobox
              label="Food"
              options={foods}
              placeholder="Select a food…"
              value={food}
              onValueChange={setFood}
            />
            <Combobox
              label="Sport"
              options={sports}
              placeholder="Select a sport…"
              value={sport}
              onValueChange={setSport}
            />
            <Combobox
              label="Workout template"
              options={workoutTemplates}
              placeholder="Select a template…"
              value={template}
              onValueChange={setTemplate}
            />
            <Combobox
              label="Permission"
              options={permissions}
              placeholder="Select a permission…"
              value={permission}
              onValueChange={setPermission}
            />
          </div>
        </section>
      </div>
    </GlassPanel>
  )
}

export function ComboboxScene({ bg }: { bg: 'proof-canvas' | 'proof-media' }) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col items-center justify-center gap-8 p-8 py-24`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-center text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Capture background'} — Combobox (Control)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
