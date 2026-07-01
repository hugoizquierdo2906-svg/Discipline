import { notFound } from 'next/navigation'

import { GlassPanel } from '@/components/ui/glass-panel'
import { Sidebar } from '@/components/ui/sidebar'

import '../card/card.css'

/**
 * Sidebar proof — development only (404 in production). Places a generic
 * GlassPanel beside the Sidebar (expanded + collapsed) on the standard capture
 * background and a rich panel, so the Sidebar reads as a SPECIALIZED GlassPanel —
 * identical material, geometry the only difference. No frozen role is touched.
 */
export const metadata = { robots: { index: false, follow: false } }

function j(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const sections = [
  { label: 'Main', items: ['Dashboard', 'Training', 'Nutrition'] },
  { label: 'Progress', items: ['Photos', 'Messages', 'Calendar'] },
]

function SidebarSample({
  collapsed,
  dark,
}: {
  collapsed?: boolean
  dark?: boolean
}) {
  const head = dark ? 'text-white' : 'text-text'
  const muted = dark ? 'text-white/65' : 'text-text-secondary'
  const faint = dark ? 'text-white/45' : 'text-text-tertiary'
  return (
    <Sidebar collapsed={collapsed}>
      <Sidebar.Header>
        <span className={j('text-body-sm font-semibold tracking-tight', head)}>
          {collapsed ? 'D' : 'DISCIPLINE'}
        </span>
      </Sidebar.Header>
      <Sidebar.Content>
        {sections.map((sec) => (
          <Sidebar.Section key={sec.label}>
            {!collapsed && (
              <span
                className={j(
                  'px-2 pb-1 text-caption font-semibold uppercase tracking-wide',
                  faint,
                )}
              >
                {sec.label}
              </span>
            )}
            {sec.items.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={j(
                  'rounded-md px-2 py-2 text-body-sm transition-colors',
                  muted,
                  dark ? 'hover:text-white' : 'hover:text-text',
                )}
              >
                {collapsed ? item.charAt(0) : item}
              </a>
            ))}
          </Sidebar.Section>
        ))}
      </Sidebar.Content>
      <Sidebar.Footer>
        <span className={j('px-2 text-caption', faint)}>
          {collapsed ? 'AR' : 'Alex Rivera'}
        </span>
      </Sidebar.Footer>
    </Sidebar>
  )
}

function Scene({ bg }: { bg: 'proof-canvas' | 'proof-media' }) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col items-center justify-center gap-8 p-8`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Capture background'} — GlassPanel vs Sidebar
      </p>
      <div className="flex w-full max-w-4xl flex-col gap-8 md:flex-row md:items-start">
        <div className="flex flex-1 flex-col gap-8">
          <GlassPanel className="py-6">
            <span
              className={j(
                'text-body-sm',
                dark ? 'text-white/70' : 'text-text-secondary',
              )}
            >
              GlassPanel — the generic Structural panel (same material, no rail
              geometry).
            </span>
          </GlassPanel>
        </div>
        <div className="flex h-[420px] gap-6">
          <SidebarSample dark={dark} />
          <SidebarSample collapsed dark={dark} />
        </div>
      </div>
    </section>
  )
}

export default function SidebarPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Sidebar proof</h1>
      <Scene bg="proof-canvas" />
      <Scene bg="proof-media" />
    </main>
  )
}
