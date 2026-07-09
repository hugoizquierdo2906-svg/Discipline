import { notFound } from 'next/navigation'

import { AccordionScene } from './accordion-demo'

/**
 * Accordion proof — development only (404 in production). The Disclosure
 * primitive: basic, multiple, single, collapsible/non-collapsible,
 * controlled/uncontrolled, disabled item/accordion, long content, nested,
 * icons, RTL, responsive and keyboard navigation.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function AccordionPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Accordion proof</h1>
      <AccordionScene />
    </main>
  )
}
