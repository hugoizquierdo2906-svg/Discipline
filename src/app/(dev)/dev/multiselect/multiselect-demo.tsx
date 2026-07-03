'use client'

import { useState } from 'react'

import { GlassPanel } from '@/components/ui/glass-panel'
import {
  MultiSelect,
  type MultiSelectOption,
} from '@/components/ui/multiselect'

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

const sports: MultiSelectOption[] = [
  { value: 'fitness', label: 'Fitness' },
  { value: 'running', label: 'Running' },
  { value: 'swimming', label: 'Swimming' },
  { value: 'tennis', label: 'Tennis' },
  { value: 'cycling', label: 'Cycling' },
  { value: 'yoga', label: 'Yoga' },
]

const languages: MultiSelectOption[] = [
  { value: 'fr', label: 'French' },
  { value: 'es', label: 'Spanish' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: 'Japanese' },
  { value: 'de', label: 'German' },
]

const goals: MultiSelectOption[] = [
  { value: 'strength', label: 'Strength' },
  { value: 'hypertrophy', label: 'Hypertrophy' },
  { value: 'fat-loss', label: 'Fat loss' },
  { value: 'endurance', label: 'Endurance' },
  { value: 'mobility', label: 'Mobility' },
]

const permissions: MultiSelectOption[] = [
  { value: 'view', label: 'View sessions' },
  { value: 'edit', label: 'Edit sessions' },
  {
    value: 'billing',
    label: 'Manage billing',
    description: 'Workspace owner only',
  },
  { value: 'invite', label: 'Invite clients' },
  { value: 'export', label: 'Export data' },
]

const workoutFilters: MultiSelectOption[] = [
  { value: 'upper', label: 'Upper body' },
  { value: 'lower', label: 'Lower body' },
  { value: 'core', label: 'Core' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'mobility', label: 'Mobility' },
  { value: 'recovery', label: 'Recovery' },
]

const foodPreferences: MultiSelectOption[] = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-free' },
  { value: 'dairy-free', label: 'Dairy-free' },
  { value: 'halal', label: 'Halal' },
  { value: 'kosher', label: 'Kosher' },
]

const countries: MultiSelectOption[] = [
  { value: 'fr', label: 'France' },
  { value: 'es', label: 'Spain' },
  { value: 'us', label: 'United States' },
  { value: 'jp', label: 'Japan' },
  { value: 'de', label: 'Germany' },
  { value: 'br', label: 'Brazil' },
]

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'

  const [sportsValue, setSportsValue] = useState<string[]>([
    'fitness',
    'running',
  ])
  const [languagesValue, setLanguagesValue] = useState<string[]>(['fr', 'es'])
  const [goalsValue, setGoalsValue] = useState<string[]>([
    'strength',
    'hypertrophy',
  ])
  const [permissionsValue, setPermissionsValue] = useState<string[]>(['view'])
  const [filtersValue, setFiltersValue] = useState<string[]>([])
  const [foodValue, setFoodValue] = useState<string[]>(['vegetarian'])
  const [countriesValue, setCountriesValue] = useState<string[]>([])

  return (
    <GlassPanel className="w-full max-w-2xl px-8 py-10">
      <div
        className={`relative z-[3] flex flex-col gap-10 ${dark ? '[&_label]:text-white/95' : ''}`}
      >
        <p className={body}>
          MultiSelect — a list of values, several of which may be selected at
          once. The trigger is Control Surface glass (same well as Input/
          Select); the open panel is the frozen Select menu&apos;s own recipe;
          every row is the real, frozen Checkbox component. Arrow Up/Down move
          between rows, Space toggles, Escape closes.
        </p>

        {/* States. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>States</Head>
          <div className="flex flex-col gap-5">
            <MultiSelect
              label="Default"
              options={sports}
              defaultValue={['fitness']}
            />
            <MultiSelect
              label="Open"
              options={sports}
              defaultValue={['fitness', 'running']}
              data-testid="open-target"
            />
            <MultiSelect label="Disabled" options={sports} disabled />
            <MultiSelect
              label="Read only"
              options={sports}
              defaultValue={['fitness', 'running', 'swimming']}
              readOnly
            />
            <MultiSelect label="Invalid" options={sports} invalid />
            <MultiSelect label="Required" options={sports} required />
            <MultiSelect label="Loading" options={sports} loading />
            <MultiSelect label="Empty" options={[]} />
          </div>
        </section>

        {/* Examples. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Real examples</Head>
          <div className="flex flex-col gap-5">
            <MultiSelect
              label="Sports"
              description="Activities you coach or train in."
              options={sports}
              value={sportsValue}
              onValueChange={setSportsValue}
            />
            <MultiSelect
              label="Languages"
              options={languages}
              value={languagesValue}
              onValueChange={setLanguagesValue}
            />
            <MultiSelect
              label="Goals"
              options={goals}
              value={goalsValue}
              onValueChange={setGoalsValue}
            />
            <MultiSelect
              label="Permissions"
              description="What this client can see and do."
              options={permissions}
              value={permissionsValue}
              onValueChange={setPermissionsValue}
            />
            <MultiSelect
              label="Workout filters"
              helperText="Filter the exercise library by muscle group."
              options={workoutFilters}
              value={filtersValue}
              onValueChange={setFiltersValue}
            />
            <MultiSelect
              label="Food preferences"
              options={foodPreferences}
              value={foodValue}
              onValueChange={setFoodValue}
            />
            <MultiSelect
              label="Countries"
              placeholder="Select countries…"
              options={countries}
              value={countriesValue}
              onValueChange={setCountriesValue}
            />
          </div>
        </section>
      </div>
    </GlassPanel>
  )
}

export function MultiSelectScene({
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
        {dark ? 'Rich panel' : 'Capture background'} — MultiSelect (Control)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
