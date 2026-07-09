'use client'

import { CircularProgress } from '@/components/ui/circular-progress'
import { Heading } from '@/components/ui/heading'
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

/** CircularProgress proof — every required demo case, on the standard page surface. */
export function CircularProgressScene() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
      <div className="flex flex-col gap-2">
        <Heading as="h2" level={3}>
          CircularProgress
        </Heading>
        <Text tone="secondary">
          The same known fraction of completion as Progress, in a compact ring —
          reserved for square/circular spaces (an avatar mid-upload, a sync
          tile, a dashboard KPI), never a general substitute for the linear bar.
        </Text>
      </div>

      <Section title="Basic" data-testid="cp-basic">
        <CircularProgress value={40} />
      </Section>

      <Separator />

      <Section
        title="Determinate"
        description="value=64, max=100 — aria-valuenow=64."
        data-testid="cp-determinate"
      >
        <CircularProgress value={64} label />
      </Section>

      <Separator />

      <Section
        title="Indeterminate"
        description="aria-valuenow never set; a constant-length arc rotates via animate-spin, the same functional exception the frozen Spinner already uses."
        data-testid="cp-indeterminate"
      >
        <CircularProgress indeterminate aria-label="Loading" />
      </Section>

      <Separator />

      <Section title="Sizes" data-testid="cp-sizes">
        <div className="flex items-end gap-6">
          <CircularProgress value={64} size="sm" label />
          <CircularProgress value={64} size="md" label />
          <CircularProgress value={64} size="lg" label />
        </div>
      </Section>

      <Separator />

      <Section title="Colors" data-testid="cp-colors">
        <div className="flex items-end gap-6">
          <CircularProgress value={64} color="accent" />
          <CircularProgress value={64} color="success" />
          <CircularProgress value={64} color="warning" />
          <CircularProgress value={64} color="error" />
          <CircularProgress value={64} color="info" />
          <CircularProgress value={64} color="neutral" />
        </div>
      </Section>

      <Separator />

      <Section
        title="Percentage"
        description="label — a centered {percent}% inside the ring."
        data-testid="cp-percentage"
      >
        <CircularProgress value={64} label />
      </Section>

      <Separator />

      <Section
        title="Custom max"
        description="value=30, max=50 — 60%, aria-valuemax=50."
        data-testid="cp-custom-max"
      >
        <CircularProgress value={30} max={50} label />
      </Section>

      <Separator />

      <Section title="0%" data-testid="cp-zero">
        <CircularProgress value={0} label />
      </Section>

      <Separator />

      <Section title="100%" data-testid="cp-hundred">
        <CircularProgress value={100} label />
      </Section>

      <Separator />

      <Section
        title="Disabled"
        description="Dimmed, aria-disabled — determinate and indeterminate (spin frozen)."
        data-testid="cp-disabled"
      >
        <div className="flex items-end gap-6">
          <CircularProgress value={64} label disabled />
          <CircularProgress indeterminate disabled aria-label="Paused" />
        </div>
      </Section>

      <Separator />

      <Section
        title="Loading"
        description="Indeterminate, no label — the compact loading affordance for a tile/widget."
        data-testid="cp-loading"
      >
        <CircularProgress indeterminate size="lg" aria-label="Loading" />
      </Section>

      <Separator />

      <Section
        title="Responsive"
        description="The component itself never changes across breakpoints — it is intrinsically sized by `size`, not the container."
        data-testid="cp-responsive"
      >
        <CircularProgress value={64} label />
      </Section>

      <Separator />

      <Section
        title="RTL"
        description={
          'dir="rtl" on the wrapper — the ring itself has no directional glyphs; the arc always sweeps clockwise from 12 o\'clock regardless of direction.'
        }
        data-testid="cp-rtl"
      >
        <div dir="rtl">
          <CircularProgress value={64} label />
        </div>
      </Section>

      <Separator />

      <Section
        title="Long values"
        description="value=8192, max=10000 — large numbers, arc math stays correct."
        data-testid="cp-long-values"
      >
        <CircularProgress value={8192} max={10000} label />
      </Section>
    </div>
  )
}
