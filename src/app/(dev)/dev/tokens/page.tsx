import { notFound } from 'next/navigation'

/**
 * Token preview — development only.
 * Renders a visual grid of every design-token category so broken references
 * surface immediately. Excluded from production via the NODE_ENV guard and
 * from indexing (the route lives under the (dev) group).
 */
export const metadata = { robots: { index: false, follow: false } }

const swatches = [
  ['bg', 'Background'],
  ['surface', 'Surface'],
  ['surface-raised', 'Surface raised'],
  ['accent', 'Accent (Brand)'],
  ['accent-accessible', 'Accent accessible'],
  ['accent-subtle', 'Accent subtle'],
  ['success', 'Success'],
  ['warning', 'Warning'],
  ['error', 'Error'],
  ['info', 'Info'],
] as const

const radii = ['xs', 'sm', 'md', 'lg', 'xl', 'pill'] as const
const shadows = [
  '1',
  '2',
  '3',
  '4',
  'contact',
  'ambient',
  'accent-glow',
] as const
const spaces = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
] as const
const texts = [
  'display-1',
  'display-2',
  'display-3',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'body-lg',
  'body',
  'body-sm',
  'caption',
] as const

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-12">
      <h2 className="mb-5 text-h4 font-semibold text-text">{title}</h2>
      {children}
    </section>
  )
}

export default function TokensPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main className="mx-auto max-w-container px-5 py-10">
      <h1 className="mb-2 text-h2 font-semibold text-text">
        DISCIPLINE — Design Tokens
      </h1>
      <p className="mb-10 text-body text-text-secondary">
        Visual verification surface. Source of truth:
        docs/DISCIPLINE_CANONICAL_TOKENS.md.
      </p>

      <Section title="Colors">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {swatches.map(([token, label]) => (
            <div key={token}>
              <div
                className={`h-20 rounded-md border border-border bg-${token}`}
              />
              <p className="mt-2 text-caption text-text-tertiary">{label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography scale">
        <div className="space-y-3">
          {texts.map((t) => (
            <p key={t} className={`text-${t} text-text`}>
              {t} — DISCIPLINE
            </p>
          ))}
        </div>
      </Section>

      <Section title="Radii">
        <div className="flex flex-wrap gap-4">
          {radii.map((r) => (
            <div key={r} className="text-center">
              <div className={`h-20 w-20 bg-accent-subtle rounded-${r}`} />
              <p className="mt-2 text-caption text-text-tertiary">{r}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Shadows">
        <div className="flex flex-wrap gap-6">
          {shadows.map((s) => (
            <div key={s} className="text-center">
              <div
                className={`h-20 w-20 rounded-lg bg-surface-raised shadow-${s}`}
              />
              <p className="mt-2 text-caption text-text-tertiary">{s}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Spacing scale">
        <div className="space-y-2">
          {spaces.map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`h-4 bg-accent w-${s}`} />
              <span className="text-caption text-text-tertiary">space-{s}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Glass">
        <div className="relative h-40 rounded-xl bg-accent p-5">
          <div className="h-full rounded-lg border border-glass-border bg-glass-regular shadow-2 backdrop-blur-glass" />
        </div>
      </Section>
    </main>
  )
}
