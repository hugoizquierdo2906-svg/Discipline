'use client'

import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
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
      <div className="rounded-lg border border-border bg-surface-raised px-5 py-4">
        {children}
      </div>
    </section>
  )
}

/** Skeleton proof — every required demo case, on the standard page surface. */
export function SkeletonScene() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
      <div className="flex flex-col gap-2">
        <Heading as="h2" level="h3">
          Skeleton
        </Heading>
        <Text tone="secondary">
          A silent layout placeholder — reserves the exact space real content
          will occupy, eliminating layout shift, never signaling activity or a
          fraction.
        </Text>
      </div>

      <Section title="Basic" data-testid="skeleton-basic">
        <Skeleton />
      </Section>

      <Separator />

      <Section title="Rectangle" data-testid="skeleton-rectangle">
        <Skeleton width={240} height={80} />
      </Section>

      <Separator />

      <Section title="Circle" data-testid="skeleton-circle">
        <Skeleton circle width={48} height={48} />
      </Section>

      <Separator />

      <Section title="Text" data-testid="skeleton-text">
        <Skeleton width={200} height={16} radius="sm" />
      </Section>

      <Separator />

      <Section
        title="Multiple lines"
        description="lines=4 — the last line renders at 60% width, the near-universal skeleton-text convention."
        data-testid="skeleton-multiple-lines"
      >
        <Skeleton lines={4} radius="sm" />
      </Section>

      <Separator />

      <Section title="Avatar" data-testid="skeleton-avatar">
        <div className="flex items-center gap-3">
          <Skeleton circle width={40} height={40} />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton width="40%" height={14} radius="sm" />
            <Skeleton width="60%" height={12} radius="sm" />
          </div>
        </div>
      </Section>

      <Separator />

      <Section title="Card" data-testid="skeleton-card">
        <div className="flex w-64 flex-col gap-3">
          <Skeleton height={120} radius="lg" />
          <Skeleton width="70%" height={16} radius="sm" />
          <Skeleton lines={2} radius="sm" />
        </div>
      </Section>

      <Separator />

      <Section title="Table" data-testid="skeleton-table">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <Skeleton width={80} height={14} radius="sm" />
            <Skeleton width={140} height={14} radius="sm" />
            <Skeleton width={100} height={14} radius="sm" />
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton width={80} height={14} radius="sm" />
              <Skeleton width={140} height={14} radius="sm" />
              <Skeleton width={100} height={14} radius="sm" />
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      <Section title="List" data-testid="skeleton-list">
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton circle width={32} height={32} />
              <Skeleton width="50%" height={14} radius="sm" />
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      <Section title="Dashboard" data-testid="skeleton-dashboard">
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-md border border-border p-3"
            >
              <Skeleton width="50%" height={12} radius="sm" />
              <Skeleton width="70%" height={24} radius="sm" />
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      <Section title="Article" data-testid="skeleton-article">
        <div className="flex flex-col gap-4">
          <Skeleton width="80%" height={24} radius="sm" />
          <Skeleton lines={3} radius="sm" />
          <Skeleton height={160} radius="lg" />
          <Skeleton lines={4} radius="sm" />
        </div>
      </Section>

      <Separator />

      <Section title="Image" data-testid="skeleton-image">
        <Skeleton width={320} height={180} radius="lg" />
      </Section>

      <Separator />

      <Section
        title="Responsive"
        description="Respects the available width — no JS measuring."
        data-testid="skeleton-responsive"
      >
        <Skeleton width="100%" height={16} radius="sm" />
      </Section>

      <Separator />

      <Section
        title="RTL"
        description='dir="rtl" on the wrapper — rectangles have no direction.'
        data-testid="skeleton-rtl"
      >
        <div dir="rtl">
          <Skeleton lines={3} radius="sm" />
        </div>
      </Section>

      <Separator />

      <Section
        title="Animated"
        description="animated (default) — animate-pulse, the one authorized exception."
        data-testid="skeleton-animated"
      >
        <Skeleton width={200} height={16} radius="sm" animated />
      </Section>

      <Separator />

      <Section
        title="Static"
        description="animated={false} — frozen, for contexts that must stay still."
        data-testid="skeleton-static"
      >
        <Skeleton width={200} height={16} radius="sm" animated={false} />
      </Section>
    </div>
  )
}
