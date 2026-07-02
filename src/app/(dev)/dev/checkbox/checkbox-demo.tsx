'use client'

import { useState } from 'react'

import { Checkbox, CheckboxGroup } from '@/components/ui/checkbox'
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

/** Parent/children pattern — the parent shows indeterminate when mixed. */
function NestedSettings() {
  const [items, setItems] = useState([true, false, true])
  const all = items.every(Boolean)
  const none = items.every((v) => !v)
  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        label="Notifications"
        description="Email, push and in-app."
        checked={all ? true : none ? false : 'indeterminate'}
        onCheckedChange={(next) => setItems(items.map(() => next === true))}
        data-testid="parent"
      />
      <div className="flex flex-col gap-3 pl-7">
        {['Email', 'Push', 'In-app'].map((label, i) => (
          <Checkbox
            key={label}
            label={label}
            checked={items[i]}
            onCheckedChange={(next) =>
              setItems(items.map((v, j) => (j === i ? next === true : v)))
            }
          />
        ))}
      </div>
    </div>
  )
}

const roles = ['Coach', 'Client', 'Admin'] as const
const perms = ['View programs', 'Edit programs', 'Billing'] as const

/** Permissions matrix — checkboxes in a table, aria-labelled per cell. */
function PermissionsMatrix({ dark }: { dark: boolean }) {
  const head = dark ? 'text-white/60' : 'text-text-tertiary'
  return (
    <table className="w-full max-w-md border-separate border-spacing-y-2 text-left">
      <thead>
        <tr>
          <th className={`text-caption font-medium ${head}`}>Permission</th>
          {roles.map((r) => (
            <th key={r} className={`text-caption font-medium ${head}`}>
              {r}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {perms.map((p, pi) => (
          <tr key={p}>
            <td
              className={
                dark ? 'text-body-sm text-white/90' : 'text-body-sm text-text'
              }
            >
              {p}
            </td>
            {roles.map((r, ri) => (
              <td key={r}>
                <Checkbox
                  aria-label={`${p} — ${r}`}
                  defaultChecked={ri <= pi}
                  disabled={r === 'Admin'}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'

  return (
    <GlassPanel className="w-full max-w-2xl px-8 py-10">
      <div
        className={`relative z-[3] flex flex-col gap-10 ${dark ? '[&_label]:text-white/95 [&_legend_span]:text-white/95' : ''}`}
      >
        <p className={body}>
          Checkbox — the canonical small Micro control. Button carries the full
          Micro glass; at 20px the Glass Budget leaves a small control almost
          nothing to spend: token box · accent fill · dark glyph · global focus
          ring. One shared expression (micro-control.tsx) for Checkbox, Radio
          and Switch.
        </p>

        {/* States. */}
        <section className="flex flex-col gap-4">
          <Head dark={dark}>States</Head>
          <div className="grid gap-3 sm:grid-cols-2">
            <Checkbox label="Unchecked" />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Indeterminate" defaultChecked="indeterminate" />
            <Checkbox label="Disabled" disabled />
            <Checkbox label="Disabled checked" disabled defaultChecked />
            <Checkbox label="Read only" readOnly defaultChecked />
            <Checkbox label="Required" required />
            <Checkbox label="Invalid" invalid defaultChecked />
            <Checkbox
              label="Label on the left"
              labelPosition="left"
              defaultChecked
            />
            <Checkbox
              label="With description"
              description="A muted secondary line under the label."
              defaultChecked
            />
            <Checkbox
              label="With helper"
              helperText="You can change this later."
            />
            <Checkbox label="With error" error="This box must be checked." />
          </div>
        </section>

        {/* Group. */}
        <section className="flex flex-col gap-4">
          <Head dark={dark}>Group — multiple · error · disabled</Head>
          <div className="grid gap-6 sm:grid-cols-2">
            <CheckboxGroup
              label="Weekly focus"
              description="Pick as many as you like."
              helperText="Applied to next week's plan."
              required
            >
              <Checkbox label="Strength" defaultChecked />
              <Checkbox label="Conditioning" defaultChecked />
              <Checkbox label="Mobility" />
            </CheckboxGroup>
            <CheckboxGroup label="Consent" error="Select at least one option.">
              <Checkbox label="Terms of service" />
              <Checkbox label="Privacy policy" />
            </CheckboxGroup>
            <CheckboxGroup label="Integrations (disabled)" disabled>
              <Checkbox label="Apple Health" defaultChecked />
              <Checkbox label="Garmin" />
            </CheckboxGroup>
          </div>
        </section>

        {/* Nested + matrix. */}
        <section className="flex flex-col gap-4">
          <Head dark={dark}>Nested settings · permissions matrix</Head>
          <div className="grid gap-8 sm:grid-cols-2">
            <NestedSettings />
            <PermissionsMatrix dark={dark} />
          </div>
        </section>
      </div>
    </GlassPanel>
  )
}

export function CheckboxScene({ bg }: { bg: 'proof-canvas' | 'proof-media' }) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col items-center justify-center gap-8 p-8 py-24`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-center text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Capture background'} — Checkbox (Micro)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
