import { notFound } from 'next/navigation'

import { StepperScene } from './stepper-demo'

/**
 * Stepper proof — development only (404 in production). DISCIPLINE's
 * progress indicator through an ordered sequence of steps of one task.
 * Basic, current/completed steps, clickable, disabled step, vertical/
 * horizontal, long labels, descriptions, icons, loading, responsive, RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function StepperPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Stepper proof</h1>
      <StepperScene />
    </main>
  )
}
