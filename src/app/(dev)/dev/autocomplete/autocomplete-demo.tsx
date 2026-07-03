'use client'

import { useState } from 'react'

import {
  Autocomplete,
  type AutocompleteOption,
} from '@/components/ui/autocomplete'
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

const cities: AutocompleteOption[] = [
  'Paris',
  'Marseille',
  'Lyon',
  'Toulouse',
  'Nice',
  'Nantes',
  'Strasbourg',
  'Montpellier',
  'Bordeaux',
  'Lille',
].map((label) => ({ label }))

const exercises: AutocompleteOption[] = [
  'Bench Press',
  'Squat',
  'Deadlift',
  'Lat Pulldown',
  'Overhead Press',
  'Barbell Row',
  'Pull-up',
  'Dip',
  'Hip Thrust',
  'Romanian Deadlift',
].map((label) => ({ label }))

const jobTitles: AutocompleteOption[] = [
  'Personal Trainer',
  'Strength Coach',
  'Nutrition Coach',
  'Physiotherapist',
  'Yoga Instructor',
  'Running Coach',
  'CrossFit Coach',
].map((label) => ({ label }))

const emailDomains: AutocompleteOption[] = [
  'gmail.com',
  'outlook.com',
  'yahoo.com',
  'icloud.com',
  'proton.me',
].map((label) => ({ label }))

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'

  const [city, setCity] = useState('')
  const [exercise, setExercise] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [domain, setDomain] = useState('')

  return (
    <GlassPanel className="w-full max-w-2xl px-8 py-10">
      <div
        className={`relative z-[3] flex flex-col gap-10 ${dark ? '[&_label]:text-white/95' : ''}`}
      >
        <p className={body}>
          Autocomplete — free text assisted, never constrained, by suggestions.
          The trigger is Input itself; the popup is the frozen Control Surface
          popup; rows reuse the frozen Select row language. Typing never
          auto-highlights a suggestion, so Enter always keeps exactly what you
          typed unless you explicitly arrow to a row — anything typed is a valid
          value, matched or not.
        </p>

        {/* States. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>States</Head>
          <div className="flex flex-col gap-5">
            <Autocomplete
              label="Closed"
              options={cities}
              placeholder="Type a city…"
            />
            <Autocomplete
              label="Open"
              options={cities}
              placeholder="Type a city…"
              data-testid="open-target"
            />
            <Autocomplete
              label="Typing (matches)"
              options={cities}
              placeholder="Type a city…"
              data-testid="typing-target"
            />
            <Autocomplete
              label="Free text (no match)"
              options={cities}
              placeholder="Type a city…"
              data-testid="freetext-target"
            />
            <Autocomplete label="Loading" options={cities} loading />
            <Autocomplete label="Disabled" options={cities} disabled />
            <Autocomplete
              label="Read only"
              options={cities}
              defaultValue="Paris"
              readOnly
            />
            <Autocomplete label="Invalid" options={cities} invalid />
            <Autocomplete
              label="Invalid with message"
              options={cities}
              error="This field is required."
            />
            <Autocomplete label="Required" options={cities} required />
          </div>
        </section>

        {/* Examples. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Real examples</Head>
          <div className="flex flex-col gap-5">
            <Autocomplete
              label="City"
              description="Where the client trains."
              options={cities}
              placeholder="Type a city…"
              value={city}
              onValueChange={setCity}
            />
            <Autocomplete
              label="Exercise"
              helperText="Any name is accepted — suggestions just speed up typing."
              options={exercises}
              placeholder="Type an exercise…"
              value={exercise}
              onValueChange={setExercise}
            />
            <Autocomplete
              label="Job title"
              options={jobTitles}
              placeholder="Type a job title…"
              value={jobTitle}
              onValueChange={setJobTitle}
            />
            <Autocomplete
              label="Email domain"
              options={emailDomains}
              placeholder="Type a domain…"
              value={domain}
              onValueChange={setDomain}
            />
          </div>
        </section>
      </div>
    </GlassPanel>
  )
}

export function AutocompleteScene({
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
        {dark ? 'Rich panel' : 'Capture background'} — Autocomplete (Control)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
