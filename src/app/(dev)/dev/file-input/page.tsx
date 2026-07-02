import { notFound } from 'next/navigation'

import { FileInputScene } from './file-input-demo'
import '../card/card.css'

/**
 * FileInput proof — development only (404 in production). Shows the whole Control
 * family aligned (Input → Textarea → SearchInput → Select → DatePicker → FileInput,
 * one glass) plus every FileInput state: single/multiple, previews (image/PDF/video),
 * uploading (Progress primitive), error/success/disabled/readOnly and live
 * validation (accept/maxSize/maxFiles). The demo lives in a client component
 * (File objects are DOM constructors); this server page keeps the guard.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function FileInputPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">FileInput proof</h1>
      <FileInputScene bg="proof-canvas" />
      <FileInputScene bg="proof-media" />
    </main>
  )
}
