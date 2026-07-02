'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { GlassPanel } from '@/components/ui/glass-panel'
import {
  ToastProvider,
  useToast,
  type ToastPosition,
} from '@/components/ui/toast'

function Buttons({ dark }: { dark: boolean }) {
  const { toast, update } = useToast()
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'

  return (
    <div className="flex flex-col gap-6">
      <p className={body}>
        Toast — the transient feedback surface. It derives entirely from
        FloatingSurface (same glass, lift, entrance — exit is the same keyframes
        reversed). It communicates; it never interrupts, asks or blocks. Hover
        pauses the timer; swipe right dismisses; Escape closes the focused toast
        (F8 reaches the stack).
      </p>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="secondary"
          size="sm"
          data-fire="default"
          onClick={() =>
            toast({ title: 'Workout saved', description: 'Synced to cloud.' })
          }
        >
          Default
        </Button>
        <Button
          variant="secondary"
          size="sm"
          data-fire="success"
          onClick={() =>
            toast({
              variant: 'success',
              title: 'Session completed',
              description: '5×5 back squat logged.',
            })
          }
        >
          Success
        </Button>
        <Button
          variant="secondary"
          size="sm"
          data-fire="warning"
          onClick={() =>
            toast({
              variant: 'warning',
              title: 'Unsaved changes',
              description: 'Your plan edits are local only.',
            })
          }
        >
          Warning
        </Button>
        <Button
          variant="secondary"
          size="sm"
          data-fire="error"
          onClick={() =>
            toast({
              variant: 'error',
              title: 'Sync failed',
              description: 'Check your connection and retry.',
              action: { label: 'Retry', onClick: () => {} },
            })
          }
        >
          Error + action
        </Button>
        <Button
          variant="secondary"
          size="sm"
          data-fire="info"
          onClick={() =>
            toast({
              variant: 'info',
              title: 'New program available',
              description:
                'Hybrid 12-week block v2 is out — a longer description that wraps onto several lines to prove the pane breathes.',
              duration: Infinity,
            })
          }
        >
          Info · long · sticky
        </Button>
        <Button
          variant="secondary"
          size="sm"
          data-fire="progress"
          onClick={() =>
            toast({
              variant: 'success',
              title: 'Uploading photo',
              description: 'progress-photo.jpg',
              duration: 8000,
              showProgress: true,
            })
          }
        >
          With progress
        </Button>
        <Button
          variant="secondary"
          size="sm"
          data-fire="promise"
          onClick={() => {
            const id = toast({
              variant: 'loading',
              title: 'Building workout…',
              description: 'Asking AI for a session.',
              duration: Infinity,
            })
            setTimeout(
              () =>
                update(id, {
                  variant: 'success',
                  title: 'Workout ready',
                  description: 'Upper/lower split · 60 min.',
                  duration: 4000,
                }),
              1500,
            )
          }}
        >
          Promise (loading → success)
        </Button>
        <Button
          variant="secondary"
          size="sm"
          data-fire="queue"
          onClick={() => {
            for (let i = 1; i <= 6; i++)
              toast({
                title: `Notification ${i} of 6`,
                description:
                  i > 4 ? 'Queued — waiting for a slot.' : 'Visible now.',
                duration: 30000,
              })
          }}
        >
          Queue ×6 (max 4 visible)
        </Button>
      </div>
    </div>
  )
}

function Scene({ bg }: { bg: 'proof-canvas' | 'proof-media' }) {
  const dark = bg === 'proof-media'
  const [position, setPosition] = useState<ToastPosition>('bottom-right')
  return (
    <ToastProvider position={position}>
      <section
        className={`${bg} flex min-h-screen flex-col items-center justify-center gap-8 p-8`}
      >
        <p
          className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-center text-caption uppercase tracking-widest`}
        >
          {dark ? 'Rich panel' : 'Capture background'} — Toast (Floating
          Surface)
        </p>
        <GlassPanel className="w-full max-w-2xl px-8 py-10">
          <div className="relative z-[3] flex flex-col gap-6">
            <Buttons dark={dark} />
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={
                  dark
                    ? 'text-caption text-white/60'
                    : 'text-caption text-text-tertiary'
                }
              >
                Stack position:
              </span>
              {(
                [
                  'top-left',
                  'top-center',
                  'top-right',
                  'bottom-left',
                  'bottom-center',
                  'bottom-right',
                ] as const
              ).map((p) => (
                <Button
                  key={p}
                  variant={p === position ? 'primary' : 'ghost'}
                  size="sm"
                  data-position={p}
                  onClick={() => setPosition(p)}
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>
        </GlassPanel>
      </section>
    </ToastProvider>
  )
}

export function ToastScenes() {
  return (
    <>
      <Scene bg="proof-canvas" />
      <Scene bg="proof-media" />
    </>
  )
}
