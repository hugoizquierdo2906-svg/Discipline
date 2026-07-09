'use client'

import { Heading } from '@/components/ui/heading'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
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
        <Heading as="h3" level={5}>
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

/** Progress proof — every required demo case, on the standard page surface. */
export function ProgressScene() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
      <div className="flex flex-col gap-2">
        <Heading as="h2" level={3}>
          Progress
        </Heading>
        <Text tone="secondary">
          The known fraction of completion (0 → max) of one continuous operation
          happening right now — never named steps (Stepper), never a placeholder
          for unknown content (Skeleton), never a pure indeterminate wait with
          no fraction at all (Spinner).
        </Text>
      </div>

      <Section title="Basic" data-testid="progress-basic">
        <Progress value={40} />
      </Section>

      <Separator />

      <Section
        title="Determinate"
        description="value=64, max=100 — a known fraction, exposed via aria-valuenow=64."
        data-testid="progress-determinate"
      >
        <Progress value={64} />
      </Section>

      <Separator />

      <Section
        title="Indeterminate"
        description="No known fraction yet — aria-valuenow is never set; the track pulses to signal activity (Tailwind's built-in animate-pulse, same as the frozen Skeleton)."
        data-testid="progress-indeterminate"
      >
        <Progress indeterminate aria-label="Loading" />
      </Section>

      <Separator />

      <Section
        title="Custom max"
        description="value=30, max=50 — 60%, aria-valuemax=50."
        data-testid="progress-custom-max"
      >
        <Progress value={30} max={50} showLabel />
      </Section>

      <Separator />

      <Section title="Small" data-testid="progress-small">
        <Progress value={64} size="sm" />
      </Section>

      <Separator />

      <Section title="Medium" data-testid="progress-medium">
        <Progress value={64} size="md" />
      </Section>

      <Separator />

      <Section title="Large" data-testid="progress-large">
        <Progress value={64} size="lg" />
      </Section>

      <Separator />

      <Section
        title="Label"
        description="A custom label overrides the auto percentage caption."
        data-testid="progress-label"
      >
        <Progress value={64} label="Uploading 3 of 5 files" />
      </Section>

      <Separator />

      <Section
        title="Percentage"
        description="showLabel — auto {percent}% caption, no custom label."
        data-testid="progress-percentage"
      >
        <Progress value={64} showLabel />
      </Section>

      <Separator />

      <Section
        title="Disabled"
        description="Dimmed, aria-disabled — determinate and indeterminate (pulse frozen)."
        data-testid="progress-disabled"
      >
        <div className="flex flex-col gap-4">
          <Progress value={64} showLabel disabled />
          <Progress indeterminate disabled aria-label="Paused" />
        </div>
      </Section>

      <Separator />

      <Section
        title="Loading screen"
        description="Indeterminate + a custom label — the full-page 'getting things ready' pattern."
        data-testid="progress-loading-screen"
      >
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="w-full max-w-sm">
            <Progress indeterminate label="Loading your dashboard…" />
          </div>
        </div>
      </Section>

      <Separator />

      <Section
        title="Responsive"
        description="The component itself never changes across breakpoints — only the width its container gives it does."
        data-testid="progress-responsive"
      >
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <Progress value={64} showLabel />
          </div>
          <div className="mx-auto w-1/2">
            <Progress value={64} showLabel />
          </div>
        </div>
      </Section>

      <Separator />

      <Section
        title="RTL"
        description='dir="rtl" on the wrapper — the fill anchors to the inline-start edge (flexbox), which flips natively; the caption text reverses too.'
        data-testid="progress-rtl"
      >
        <div dir="rtl">
          <Progress value={64} label="جارٍ الرفع" />
        </div>
      </Section>
    </div>
  )
}
