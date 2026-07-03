'use client'

import { ShieldAlert, Trash2, TriangleAlert } from 'lucide-react'
import { useState } from 'react'

import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Icon } from '@/components/ui/icon'

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

const longDescription =
  'Deleting this training block removes every session, exercise ' +
  'prescription, progression rule, note and client assignment it contains. ' +
  'Clients currently following this block will be moved back to their ' +
  'previous program at the start of their next week. Historical results ' +
  'already logged against these sessions stay in each client’s journal, ' +
  'but they will no longer link back to a program page. This cannot be ' +
  'undone — if you only want to stop assigning it, archive the block ' +
  'instead.'

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'

  const [lastAction, setLastAction] = useState('none')
  const [busyOpen, setBusyOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  return (
    <GlassPanel className="w-full max-w-2xl px-8 py-10">
      <div
        className={`relative z-[3] flex flex-col gap-10 ${dark ? '[&_label]:text-white/95' : ''}`}
      >
        <p className={body}>
          Alert Dialog — an interrupting confirmation on the frozen Modal: one
          question, answered explicitly by Confirm or Cancel. Outside click
          never dismisses; initial focus lands on Cancel (the least destructive
          action); the destructive variant confirms with the frozen destructive
          Button. Last action:{' '}
          <span data-testid="last-action" className="font-medium">
            {lastAction}
          </span>
        </p>

        {/* Variants. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Variants</Head>
          <div className="flex flex-wrap gap-4">
            <AlertDialog
              trigger={<Button variant="secondary">Publish program</Button>}
              title="Publish this program?"
              description="Clients assigned to it will see the new version immediately."
              confirmLabel="Publish"
              onConfirm={() => setLastAction('confirmed')}
              onCancel={() => setLastAction('cancelled')}
              data-testid="neutral-dialog"
            />
            <AlertDialog
              variant="destructive"
              trigger={<Button variant="secondary">Delete client</Button>}
              icon={<Icon icon={Trash2} className="text-error" />}
              title="Delete this client?"
              description="Their profile, programs and check-ins will be permanently removed."
              confirmLabel="Delete"
              onConfirm={() => setLastAction('deleted')}
              onCancel={() => setLastAction('cancelled')}
              data-testid="destructive-dialog"
            />
            <AlertDialog
              variant="destructive"
              trigger={<Button variant="secondary">Reset all data</Button>}
              icon={<Icon icon={ShieldAlert} className="text-error" />}
              title="Reset every workspace?"
              description="This action is irreversible. All programs, clients and settings will be wiped."
              confirmLabel="I understand, reset"
              cancelLabel="Keep my data"
              data-testid="irreversible-dialog"
            />
          </div>
        </section>

        {/* States. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>States</Head>
          <div className="flex flex-wrap gap-4">
            <AlertDialog
              open={busyOpen}
              onOpenChange={setBusyOpen}
              loading={busy}
              variant="destructive"
              trigger={<Button variant="secondary">Delete with loading</Button>}
              icon={<Icon icon={Trash2} className="text-error" />}
              title="Delete 12 sessions?"
              description="The sessions are removed on the server before this closes."
              confirmLabel="Delete sessions"
              onConfirm={() => {
                setBusy(true)
                setLastAction('deleting…')
                window.setTimeout(() => {
                  setBusy(false)
                  setBusyOpen(false)
                  setLastAction('deleted after loading')
                }, 1500)
              }}
              data-testid="loading-dialog"
            />
            <AlertDialog
              trigger={<Button variant="secondary">Disabled confirm</Button>}
              title="Transfer ownership?"
              description="The confirm action stays disabled until the transfer is allowed."
              confirmLabel="Transfer"
              disabled
              data-testid="disabled-dialog"
            />
            <AlertDialog
              variant="destructive"
              trigger={<Button variant="secondary">Long content</Button>}
              icon={<Icon icon={TriangleAlert} className="text-error" />}
              title="Delete this training block?"
              description={longDescription}
              confirmLabel="Delete block"
              cancelLabel="Archive instead"
              data-testid="long-dialog"
            />
          </div>
        </section>

        {/* Sizes. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Sizes</Head>
          <div className="flex flex-wrap gap-4">
            <AlertDialog
              size="sm"
              trigger={<Button variant="secondary">Small</Button>}
              title="Log out?"
              description="Unsaved edits are kept locally."
              confirmLabel="Log out"
              data-testid="sm-dialog"
            />
            <AlertDialog
              size="md"
              trigger={<Button variant="secondary">Medium</Button>}
              title="Archive this program?"
              description="It disappears from active lists but keeps its history."
              confirmLabel="Archive"
              data-testid="md-dialog"
            />
            <AlertDialog
              size="lg"
              trigger={<Button variant="secondary">Large</Button>}
              title="Regenerate all client schedules?"
              description="Every upcoming week is rebuilt from the latest program version. Sessions already completed are never touched."
              confirmLabel="Regenerate"
              data-testid="lg-dialog"
            />
          </div>
        </section>
      </div>
    </GlassPanel>
  )
}

export function AlertDialogScene({
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
        {dark ? 'Rich panel' : 'Capture background'} — Alert Dialog (Immersive)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
