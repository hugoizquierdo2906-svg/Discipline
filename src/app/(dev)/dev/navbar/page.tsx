import { notFound } from 'next/navigation'

import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Navbar } from '@/components/ui/navbar'

import '../card/card.css'

/**
 * Navbar proof — development only (404 in production). Places a generic GlassPanel
 * beside the Navbar (floating + attached) on a light canvas and a rich panel, so
 * the Navbar reads as a SPECIALIZED GlassPanel — same material, geometry the only
 * difference — not a new material component. No frozen role is touched.
 */
export const metadata = { robots: { index: false, follow: false } }

const links = ['Overview', 'Method', 'Pricing', 'Stories']

function NavSample({ attached, dark }: { attached?: boolean; dark?: boolean }) {
  return (
    <Navbar attached={attached}>
      <Navbar.Brand>
        <span
          className={cnLike(
            'text-body-lg font-semibold tracking-tight',
            dark ? 'text-white' : 'text-text',
          )}
        >
          DISCIPLINE
        </span>
      </Navbar.Brand>
      <Navbar.Content>
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className={cnLike(
              'rounded-md px-3 py-2 text-body-sm transition-colors',
              dark
                ? 'text-white/70 hover:text-white'
                : 'text-text-secondary hover:text-text',
            )}
          >
            {l}
          </a>
        ))}
      </Navbar.Content>
      <Navbar.Actions>
        <Button variant="ghost" size="sm">
          Sign in
        </Button>
        <Button size="sm">Start</Button>
        <Avatar size="sm" name="Alex Rivera" />
      </Navbar.Actions>
    </Navbar>
  )
}

/** Local join — the dev page needs no tailwind-merge, just a space join. */
function cnLike(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function Scene({ bg }: { bg: 'proof-light' | 'proof-media' }) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col items-center justify-center gap-10 p-8`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Light canvas'} — GlassPanel vs Navbar
      </p>
      <div className="flex w-full max-w-4xl flex-col gap-8">
        <GlassPanel className="py-6">
          <span
            className={cnLike(
              'text-body-sm',
              dark ? 'text-white/70' : 'text-text-secondary',
            )}
          >
            GlassPanel — the generic Structural panel (same material, no
            navigation geometry).
          </span>
        </GlassPanel>
        <NavSample dark={dark} />
        <NavSample attached dark={dark} />
      </div>
    </section>
  )
}

export default function NavbarPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Navbar proof</h1>
      <Scene bg="proof-light" />
      <Scene bg="proof-media" />
    </main>
  )
}
