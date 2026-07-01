import { notFound } from 'next/navigation'

import { FloatingCard } from '@/components/ui/floating-card'
import { GlassCard } from '@/components/ui/glass-card'

import '../card/card.css'

/**
 * FloatingCard proof — development only (404 in production). Places a resting
 * GlassCard beside an elevated FloatingCard on a light canvas and over a rich
 * media panel, so the single changed axis (Depth / cast shadow) reads. Same
 * material, same geometry — only the float differs. No frozen role is touched.
 */
export const metadata = { robots: { index: false, follow: false } }

function Sample({
  as,
  label,
  title,
  body,
}: {
  as: typeof GlassCard | typeof FloatingCard
  label: string
  title: string
  body: string
}) {
  const Card = as
  return (
    <Card>
      <div className="cd-card__content">
        <span className="cd-card__eyebrow">{label}</span>
        <h3 className="cd-card__title">{title}</h3>
        <p className="cd-card__body">{body}</p>
      </div>
    </Card>
  )
}

export default function FloatingCardPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">FloatingCard proof</h1>

      <section className="proof-light flex min-h-screen flex-col items-center justify-center gap-8 p-12">
        <p className="proof-cap text-caption uppercase tracking-widest">
          Light canvas — resting Card vs FloatingCard
        </p>
        <div className="grid w-full max-w-3xl gap-10 sm:grid-cols-2">
          <Sample
            as={GlassCard}
            label="GlassCard"
            title="Resting Structural"
            body="The calm plane that sits on the surface. Cast shadow at the frozen Structural tier."
          />
          <Sample
            as={FloatingCard}
            label="FloatingCard"
            title="Elevated Structural"
            body="The same glass, lifted. Only the Depth axis changes — a deeper ambient shadow reads as float."
          />
        </div>
      </section>

      <section className="proof-media flex min-h-screen flex-col items-center justify-center gap-8 p-12">
        <p className="proof-cap-media text-caption uppercase tracking-widest">
          Media panel — resting Card vs FloatingCard
        </p>
        <div className="grid w-full max-w-3xl gap-10 sm:grid-cols-2">
          <Sample
            as={GlassCard}
            label="GlassCard"
            title="Resting Structural"
            body="Refraction and transmission read through the busy background at the resting tier."
          />
          <Sample
            as={FloatingCard}
            label="FloatingCard"
            title="Elevated Structural"
            body="Identical material and refraction; the deeper shadow separates it from the panel."
          />
        </div>
      </section>
    </main>
  )
}
