'use client'

import { Heading } from '@/components/ui/heading'
import { Label } from '@/components/ui/label'
import { Text } from '@/components/ui/text'

/**
 * Label is a Forms accessibility primitive — it names a control and binds to it
 * via a real `<label htmlFor>`. Each demo pairs a Label with a real field so the
 * binding (click-to-focus, announced name) is genuine and testable. The scene
 * sits on the shared capture wallpaper.
 */
const fieldClass =
  'h-9 w-full max-w-xs rounded-sm border border-border bg-surface-raised px-3 text-body-sm text-text outline-none'

function Section({
  title,
  description,
  children,
  'data-testid': dataTestId,
}: {
  title: string
  description?: string
  children: React.ReactNode
  'data-testid'?: string
}) {
  return (
    <section className="flex flex-col gap-3" data-testid={dataTestId}>
      <div className="flex flex-col gap-1">
        <Heading as="h3" level="h5">
          {title}
        </Heading>
        {description && (
          <Text size="body-sm" tone="secondary">
            {description}
          </Text>
        )}
      </div>
      {children}
    </section>
  )
}

export function LabelScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level="h3">
            Label
          </Heading>
          <Text tone="secondary">
            A Forms accessibility primitive. It answers only &ldquo;what is the
            name of this field?&rdquo; — a real <code>&lt;label&gt;</code> bound
            to its control. It never validates, never shows an error or helper
            text, and never knows the value.
          </Text>
        </div>

        <Section
          title="Basic"
          description="A real <label> bound via htmlFor — clicking it focuses the field."
          data-testid="lb-basic"
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lb-email">Email</Label>
            <input id="lb-email" type="email" className={fieldClass} />
          </div>
        </Section>

        <Section
          title="Required"
          description="A discreet, token-driven marker — never red, never animated."
          data-testid="lb-required"
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lb-req" required>
              Email
            </Label>
            <input id="lb-req" type="email" required className={fieldClass} />
          </div>
        </Section>

        <Section
          title="Disabled"
          description="Reflects the control's disabled state — dimmed, but never invisible."
          data-testid="lb-disabled"
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lb-dis" disabled>
              Email
            </Label>
            <input id="lb-dis" type="email" disabled className={fieldClass} />
          </div>
        </Section>

        <Section
          title="Long label"
          description="A long name wraps cleanly, with no strange truncation."
          data-testid="lb-long"
        >
          <div className="flex max-w-xs flex-col gap-1.5">
            <Label htmlFor="lb-long-input" required>
              Your primary contact email address for account recovery and
              billing notifications
            </Label>
            <input id="lb-long-input" type="email" className={fieldClass} />
          </div>
        </Section>

        <Section
          title="Multiline"
          description="Explicit line breaks and wrapping both work; the marker stays attached."
          data-testid="lb-multiline"
        >
          <div className="flex max-w-xs flex-col gap-1.5">
            <Label htmlFor="lb-multi" required>
              Delivery address
              <br />
              (including postal code)
            </Label>
            <input id="lb-multi" className={fieldClass} />
          </div>
        </Section>

        <Section
          title="Responsive"
          description="Same behaviour at any width — the label wraps, never changes role."
          data-testid="lb-responsive"
        >
          <div className="flex w-40 flex-col gap-1.5">
            <Label htmlFor="lb-resp" required>
              Company or organisation name
            </Label>
            <input id="lb-resp" className={fieldClass} />
          </div>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — the text and the required marker flow naturally.'
          data-testid="lb-rtl"
        >
          <div dir="rtl" className="flex flex-col gap-1.5">
            <Label htmlFor="lb-rtl-input" required>
              البريد الإلكتروني
            </Label>
            <input id="lb-rtl-input" type="email" className={fieldClass} />
          </div>
        </Section>

        <Section
          title="Icon — deliberately rejected"
          data-testid="lb-icon-rejected"
        >
          <Text size="body-sm" tone="secondary" className="max-w-md">
            A Label&apos;s single job is to NAME a control accessibly. An icon
            inside the <code>&lt;label&gt;</code> adds visual noise, competes
            with the field&apos;s own affordances, and would need{' '}
            <code>aria-hidden</code> to avoid a parasite screen-reader
            announcement. Per DISCIPLINE sobriety and &ldquo;nothing
            else&rdquo;, the icon variant is rejected — icons belong to the
            field or a higher-level component, not the Label.
          </Text>
        </Section>
      </div>
    </div>
  )
}
