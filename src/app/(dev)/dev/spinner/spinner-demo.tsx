'use client'

import { Button } from '@/components/ui/button'
import { Drawer } from '@/components/ui/drawer'
import { FullscreenOverlay } from '@/components/ui/fullscreen-overlay'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { Text } from '@/components/ui/text'

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
      <div className="rounded-lg border border-border bg-surface px-5 py-4">
        {children}
      </div>
    </section>
  )
}

/** Spinner proof — every required demo case, on the standard page surface. */
export function SpinnerScene() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
      <div className="flex flex-col gap-2">
        <Heading as="h2" level="h3">
          Spinner
        </Heading>
        <Text tone="secondary">
          A purely indeterminate activity indicator — never a value, never a
          percentage, never role=&quot;progressbar&quot;. Signals
          &quot;something is happening, of unknown duration,&quot; nothing more.
        </Text>
      </div>

      <Section title="Basic" data-testid="spinner-basic">
        <Spinner />
      </Section>

      <Separator />

      <Section title="Sizes" data-testid="spinner-sizes">
        <div className="flex items-center gap-6">
          <Spinner size="xs" />
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </div>
      </Section>

      <Separator />

      <Section
        title="Colors"
        description="Omit `color` to inherit currentColor (the default every existing consumer relies on); pass it to override."
        data-testid="spinner-colors"
      >
        <div className="flex items-center gap-6">
          <Spinner color="accent" />
          <Spinner color="neutral" />
          <Spinner color="success" />
          <Spinner color="warning" />
          <Spinner color="error" />
          <Spinner color="info" />
        </div>
      </Section>

      <Separator />

      <Section
        title="Inline"
        description="Inside a sentence, matching the ambient text color via currentColor."
        data-testid="spinner-inline"
      >
        <Text>
          Fetching your results <Spinner size="xs" className="align-middle" />{' '}
          please wait…
        </Text>
      </Section>

      <Separator />

      <Section title="Centered" data-testid="spinner-centered">
        <div className="flex h-24 items-center justify-center">
          <Spinner size="lg" />
        </div>
      </Section>

      <Separator />

      <Section
        title="With label"
        description='label="Loading options" — sr-only, always accessible.'
        data-testid="spinner-with-label"
      >
        <Spinner label="Loading options" />
      </Section>

      <Separator />

      <Section
        title="Without label"
        description="Omitted — falls back to the default sr-only 'Loading'."
        data-testid="spinner-without-label"
      >
        <Spinner />
      </Section>

      <Separator />

      <Section
        title="Disabled"
        description="Dimmed, spin frozen (no animation)."
        data-testid="spinner-disabled"
      >
        <Spinner size="lg" disabled />
      </Section>

      <Separator />

      <Section
        title="Responsive"
        description="The component itself never changes across breakpoints — it is intrinsically sized by `size`."
        data-testid="spinner-responsive"
      >
        <Spinner size="lg" />
      </Section>

      <Separator />

      <Section
        title="RTL"
        description='dir="rtl" on the wrapper — the ring has no directional glyphs.'
        data-testid="spinner-rtl"
      >
        <div dir="rtl">
          <Text>
            جارٍ التحميل <Spinner size="sm" className="align-middle" />
          </Text>
        </div>
      </Section>

      <Separator />

      <Section
        title="Inside Button"
        description="Button composes Spinner for its own loading prop — never reinvents its own icon."
        data-testid="spinner-inside-button"
      >
        <Button loading>Saving</Button>
      </Section>

      <Separator />

      <Section title="Inside Card" data-testid="spinner-inside-card">
        <div className="flex h-32 items-center justify-center rounded-md border border-border bg-surface-raised">
          <Spinner size="lg" label="Loading card content" />
        </div>
      </Section>

      <Separator />

      <Section
        title="Inside Drawer"
        description="The frozen Drawer's own loading state."
        data-testid="spinner-inside-drawer"
      >
        <Drawer
          trigger={<Button variant="secondary">Open drawer</Button>}
          title="Loading"
          loading
        />
      </Section>

      <Separator />

      <Section
        title="Inside FullscreenOverlay"
        description="The frozen FullscreenOverlay's own loading state."
        data-testid="spinner-inside-fullscreen-overlay"
      >
        <FullscreenOverlay
          trigger={<Button variant="secondary">Open overlay</Button>}
          loading
          title="Loading"
        />
      </Section>
    </div>
  )
}
