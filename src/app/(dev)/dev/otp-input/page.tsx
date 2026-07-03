import { notFound } from 'next/navigation'

import { OtpInputScene } from './otp-input-demo'
import '../card/card.css'

/**
 * OTP Input proof — development only (404 in production). A specialized
 * field for entering a code split across several independent cells that
 * together represent one logical value. States, lengths. Neutral + rich
 * scenes.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function OtpInputPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">OTP Input proof</h1>
      <OtpInputScene bg="proof-canvas" />
      <OtpInputScene bg="proof-media" />
    </main>
  )
}
