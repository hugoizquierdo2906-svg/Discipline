import { Search } from 'lucide-react'
import { notFound } from 'next/navigation'

import { InputReference } from './input-reference'

/**
 * Control Surface (Input) reference proof — development only (404 in production).
 * Shows the single reference field on a light canvas and a dark media panel, in
 * its states (default, filled, focus, error, disabled). No other component.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function InputReferencePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <section className="proof-light flex min-h-[56vh] flex-col items-center justify-center gap-7 p-12">
        <p className="text-caption uppercase tracking-widest text-text-tertiary">
          Light canvas
        </p>
        <div className="flex w-72 flex-col gap-6">
          <InputReference
            id="l1"
            label="Email"
            placeholder="you@discipline.app"
            helper="We never share it."
          />
          <InputReference id="l2" label="Name" defaultValue="Hugo Izquierdo" />
          <InputReference
            id="l3"
            label="Focused"
            placeholder="Active field"
            state="focus"
          />
          <InputReference
            id="l4"
            label="Search"
            placeholder="Search…"
            leadingIcon={<Search size={16} />}
          />
          <InputReference
            id="l5"
            label="Error"
            defaultValue="bad"
            error="This value is invalid."
          />
          <InputReference
            id="l6"
            label="Disabled"
            placeholder="Unavailable"
            state="disabled"
          />
        </div>
      </section>

      <section className="proof-dark flex min-h-[56vh] flex-col items-center justify-center gap-7 p-12">
        <p className="proof-cap-dark text-caption uppercase tracking-widest">
          Dark media panel
        </p>
        <div className="flex w-72 flex-col gap-6">
          <InputReference
            id="d1"
            label="Email"
            placeholder="you@discipline.app"
            helper="We never share it."
          />
          <InputReference
            id="d2"
            label="Focused"
            placeholder="Active field"
            state="focus"
          />
          <InputReference
            id="d3"
            label="Search"
            placeholder="Search…"
            leadingIcon={<Search size={16} />}
          />
        </div>
      </section>
    </main>
  )
}
