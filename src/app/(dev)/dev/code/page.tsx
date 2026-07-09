import { notFound } from 'next/navigation'

import { CodeScene } from './code-demo'

/**
 * Code proof — development only (404 in production). The Data Display
 * primitive for a verbatim technical value: basic, command, variable,
 * endpoint, HTTP methods, CSS token, keyboard shortcut (via asChild kbd),
 * inline sentence, long value, responsive and RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function CodePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Code proof</h1>
      <CodeScene />
    </main>
  )
}
