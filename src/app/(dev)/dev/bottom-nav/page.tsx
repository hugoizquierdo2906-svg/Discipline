import { Calendar, Dumbbell, House, LineChart, User } from 'lucide-react'
import { notFound } from 'next/navigation'

import { BottomNav } from '@/components/ui/bottom-nav'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Icon } from '@/components/ui/icon'

import '../card/card.css'

/**
 * BottomNav proof — development only (404 in production). Places a generic
 * GlassPanel beside the BottomNav (floating / attached / inset) on the standard
 * capture background and a rich panel, at mobile width, so the bar reads as a
 * SPECIALIZED GlassPanel — identical material, geometry the only difference — the
 * mobile counterpart of Navbar. No frozen role is touched.
 */
export const metadata = { robots: { index: false, follow: false } }

function j(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const items = [
  { label: 'Home', icon: House, active: true },
  { label: 'Training', icon: Dumbbell },
  { label: 'Nutrition', icon: Calendar, badge: true },
  { label: 'Progress', icon: LineChart },
  { label: 'Profile', icon: User },
]

function Bar({
  variant,
  long,
}: {
  variant?: 'floating' | 'attached' | 'inset'
  long?: boolean
}) {
  return (
    <BottomNav variant={variant}>
      {items.map((it) => (
        <BottomNav.Item
          key={it.label}
          href={`#${it.label.toLowerCase()}`}
          active={it.active}
          icon={<Icon icon={it.icon} size="md" />}
          label={
            long && it.label === 'Nutrition'
              ? 'Nutrition & meal plan'
              : it.label
          }
          badge={
            it.badge ? (
              <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-pill bg-accent px-1 text-[10px] font-semibold text-text-on-accent">
                3
              </span>
            ) : undefined
          }
        />
      ))}
    </BottomNav>
  )
}

/** A ~390px mobile frame so the bar reads in its native context. */
function Phone({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-caption uppercase tracking-wide text-text-tertiary">
        {label}
      </span>
      <div className="w-[390px] max-w-full">{children}</div>
    </div>
  )
}

function Scene({ bg }: { bg: 'proof-canvas' | 'proof-media' }) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col items-center justify-center gap-10 p-8`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-center text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Capture background'} — GlassPanel vs BottomNav
      </p>

      <div className="w-full max-w-[390px]">
        <GlassPanel className="py-6">
          <span
            className={j(
              'text-body-sm',
              dark ? 'text-white/70' : 'text-text-secondary',
            )}
          >
            GlassPanel — the generic Structural panel (same material, no bar
            geometry).
          </span>
        </GlassPanel>
      </div>

      <div className="flex flex-wrap items-start justify-center gap-8">
        <Phone label="Floating">
          <Bar />
        </Phone>
        <Phone label="Attached">
          <Bar variant="attached" />
        </Phone>
        <Phone label="Inset · long label">
          <Bar variant="inset" long />
        </Phone>
      </div>

      {/* Desktop coherence — full width, still one calm Structural plane. */}
      <div className="w-full max-w-3xl">
        <span
          className={j(
            'mb-2 block text-center text-caption uppercase tracking-wide',
            dark ? 'text-white/45' : 'text-text-tertiary',
          )}
        >
          Desktop width — coherent
        </span>
        <Bar />
      </div>
    </section>
  )
}

export default function BottomNavPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">BottomNav proof</h1>
      <Scene bg="proof-canvas" />
      <Scene bg="proof-media" />
    </main>
  )
}
