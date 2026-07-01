import { notFound } from 'next/navigation'

import { Footer } from '@/components/ui/footer'
import { GlassPanel } from '@/components/ui/glass-panel'

import '../card/card.css'

/**
 * Footer proof — development only (404 in production). Places a generic GlassPanel
 * beside the Footer on the standard capture background and a rich panel, so the
 * Footer reads as a SPECIALIZED GlassPanel — identical material, geometry the only
 * difference — plus the three radius variants. No frozen role is touched.
 */
export const metadata = { robots: { index: false, follow: false } }

/** Local join — the dev page needs no tailwind-merge, just a space join. */
function j(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const columns = [
  { h: 'Product', links: ['Overview', 'Method', 'Pricing', 'Coaching'] },
  { h: 'Company', links: ['About', 'Careers', 'Stories', 'Press'] },
  { h: 'Resources', links: ['Guides', 'Help', 'Community', 'Status'] },
  { h: 'Legal', links: ['Terms', 'Privacy', 'Cookies'] },
]

function FooterSample({
  variant,
  dark,
}: {
  variant?: 'floating' | 'attached' | 'inset'
  dark?: boolean
}) {
  const head = dark ? 'text-white' : 'text-text'
  const muted = dark ? 'text-white/65' : 'text-text-secondary'
  const faint = dark ? 'text-white/45' : 'text-text-tertiary'
  return (
    <Footer variant={variant}>
      <div className="flex flex-col gap-10 md:flex-row md:justify-between">
        <Footer.Brand>
          <span
            className={j('text-body-lg font-semibold tracking-tight', head)}
          >
            DISCIPLINE
          </span>
          <span className={j('max-w-xs text-body-sm', muted)}>
            Coaching built on structure, calm, and consistency.
          </span>
        </Footer.Brand>
        <Footer.Columns>
          {columns.map((col) => (
            <Footer.Column key={col.h}>
              <span
                className={j(
                  'text-caption font-semibold uppercase tracking-wide',
                  faint,
                )}
              >
                {col.h}
              </span>
              {col.links.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className={j(
                    'text-body-sm transition-colors',
                    muted,
                    dark ? 'hover:text-white' : 'hover:text-text',
                  )}
                >
                  {l}
                </a>
              ))}
            </Footer.Column>
          ))}
        </Footer.Columns>
      </div>
      <Footer.Bottom>
        <span className={j('text-caption', faint)}>
          © 2026 DISCIPLINE. All rights reserved.
        </span>
        <div className="flex gap-5">
          {['Terms', 'Privacy', 'Contact'].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className={j(
                'text-caption transition-colors',
                faint,
                dark ? 'hover:text-white' : 'hover:text-text',
              )}
            >
              {l}
            </a>
          ))}
        </div>
      </Footer.Bottom>
    </Footer>
  )
}

function Scene({ bg }: { bg: 'proof-canvas' | 'proof-media' }) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col justify-center gap-8 p-8`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-center text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Capture background'} — GlassPanel vs Footer
      </p>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <GlassPanel className="py-6">
          <span
            className={j(
              'text-body-sm',
              dark ? 'text-white/70' : 'text-text-secondary',
            )}
          >
            GlassPanel — the generic Structural panel (same material, no footer
            layout).
          </span>
        </GlassPanel>
        <FooterSample dark={dark} />
        {!dark && (
          <>
            <p className="proof-cap text-center text-caption uppercase tracking-widest">
              Radius variants — attached · inset
            </p>
            <FooterSample variant="attached" dark={dark} />
            <FooterSample variant="inset" dark={dark} />
          </>
        )}
      </div>
    </section>
  )
}

export default function FooterPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Footer proof</h1>
      <Scene bg="proof-canvas" />
      <Scene bg="proof-media" />
    </main>
  )
}
