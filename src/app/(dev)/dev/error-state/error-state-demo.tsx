'use client'

import {
  CircleAlert,
  RefreshCw,
  ServerCrash,
  TriangleAlert,
  WifiOff,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ErrorState } from '@/components/ui/error-state'
import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
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
        <Heading as="h3" level="h5">
          {title}
        </Heading>
        {description && (
          <Text size="body-sm" tone="secondary">
            {description}
          </Text>
        )}
      </div>
      <div className="rounded-lg border border-border bg-surface-raised">
        {children}
      </div>
    </section>
  )
}

const RetryButton = () => (
  <Button variant="secondary" leadingIcon={<Icon icon={RefreshCw} size="sm" />}>
    Try again
  </Button>
)

/** ErrorState proof — every required demo case, on the standard page surface. */
export function ErrorStateScene() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
      <div className="flex flex-col gap-2">
        <Heading as="h2" level="h3">
          ErrorState
        </Heading>
        <Text tone="secondary">
          A view or operation that failed to load — the user momentarily cannot
          proceed, and here is how to recover. Never an absence of data, a
          loading state, or a notification.
        </Text>
      </div>

      <Section title="Basic" data-testid="error-basic">
        <ErrorState
          icon={<Icon icon={TriangleAlert} />}
          title="Something went wrong"
          description="We couldn't load this content. Please try again."
        />
      </Section>

      <Separator />

      <Section
        title="Retry"
        description="An icon, a title, a description, and a recovery action."
        data-testid="error-retry"
      >
        <ErrorState
          icon={<Icon icon={TriangleAlert} />}
          title="Couldn't load your dashboard"
          description="An unexpected error occurred while loading this page."
          action={<RetryButton />}
        />
      </Section>

      <Separator />

      <Section
        title="Without action"
        description="Purely informative — no recovery offered."
        data-testid="error-no-action"
      >
        <ErrorState
          icon={<Icon icon={CircleAlert} />}
          title="This content is unavailable"
          description="It may have been moved or deleted."
        />
      </Section>

      <Separator />

      <Section title="Small" data-testid="error-sm">
        <ErrorState
          size="sm"
          icon={<Icon icon={TriangleAlert} />}
          title="Failed to load"
          description="Try again in a moment."
          action={<RetryButton />}
        />
      </Section>

      <Separator />

      <Section title="Medium" data-testid="error-md">
        <ErrorState
          size="md"
          icon={<Icon icon={TriangleAlert} />}
          title="Failed to load"
          description="Try again in a moment."
          action={<RetryButton />}
        />
      </Section>

      <Separator />

      <Section title="Large" data-testid="error-lg">
        <ErrorState
          size="lg"
          icon={<Icon icon={TriangleAlert} />}
          title="Failed to load"
          description="Try again in a moment."
          action={<RetryButton />}
        />
      </Section>

      <Separator />

      <Section title="Centered (default)" data-testid="error-center">
        <ErrorState
          align="center"
          icon={<Icon icon={ServerCrash} />}
          title="Server error"
          description="Our servers hit a snag. We're on it — please try again."
          action={<RetryButton />}
        />
      </Section>

      <Separator />

      <Section
        title="Inline (left-aligned)"
        description='align="left" — follows dir automatically via logical start.'
        data-testid="error-inline"
      >
        <ErrorState
          align="left"
          size="sm"
          icon={<Icon icon={CircleAlert} />}
          title="Couldn't refresh"
          description="Showing the last loaded version."
          action={<RetryButton />}
        />
      </Section>

      <Separator />

      <Section
        title="Inside Card"
        description="Composed into a card's failed branch."
        data-testid="error-card"
      >
        <div className="m-5 rounded-md border border-border bg-surface p-2">
          <ErrorState
            size="sm"
            icon={<Icon icon={TriangleAlert} />}
            title="Couldn't load widget"
            description="This card failed to load its data."
            action={<RetryButton />}
          />
        </div>
      </Section>

      <Separator />

      <Section
        title="Inside Table (failed)"
        description="Composed into a table's failed branch."
        data-testid="error-table"
      >
        <div className="overflow-hidden rounded-md border border-border">
          <div className="flex items-center gap-4 border-b border-border bg-surface px-4 py-2">
            <Text size="caption" tone="tertiary" className="w-24">
              Name
            </Text>
            <Text size="caption" tone="tertiary" className="w-32">
              Date
            </Text>
            <Text size="caption" tone="tertiary">
              Status
            </Text>
          </div>
          <ErrorState
            size="sm"
            icon={<Icon icon={TriangleAlert} />}
            title="Couldn't load records"
            description="There was a problem fetching this data."
            action={<RetryButton />}
          />
        </div>
      </Section>

      <Separator />

      <Section
        title="Inside List (failed)"
        description="Composed into a list's failed branch."
        data-testid="error-list"
      >
        <ErrorState
          size="sm"
          icon={<Icon icon={TriangleAlert} />}
          title="Couldn't load items"
          description="Pull to refresh or try again."
          action={<RetryButton />}
        />
      </Section>

      <Separator />

      <Section title="Dashboard" data-testid="error-dashboard">
        <ErrorState
          icon={<Icon icon={ServerCrash} />}
          title="Dashboard unavailable"
          description="We couldn't load your metrics. Try again shortly."
          action={<RetryButton />}
        />
      </Section>

      <Separator />

      <Section title="Server error" data-testid="error-server">
        <ErrorState
          icon={<Icon icon={ServerCrash} />}
          title="500 — Server error"
          description="Something broke on our end. This isn't your fault."
          action={<RetryButton />}
        />
      </Section>

      <Separator />

      <Section title="Load failed (network)" data-testid="error-network">
        <ErrorState
          icon={<Icon icon={WifiOff} />}
          title="Connection lost"
          description="Check your network and try again."
          action={<RetryButton />}
        />
      </Section>

      <Separator />

      <Section title="Unknown error" data-testid="error-unknown">
        <ErrorState
          icon={<Icon icon={CircleAlert} />}
          title="Something went wrong"
          description="An unknown error occurred. Please try again."
          action={<RetryButton />}
        />
      </Section>

      <Separator />

      <Section
        title="RTL"
        description='dir="rtl" — text follows reading direction naturally.'
        data-testid="error-rtl"
      >
        <div dir="rtl">
          <ErrorState
            icon={<Icon icon={ServerCrash} />}
            title="خطأ في الخادم"
            description="تعذّر تحميل المحتوى. يرجى المحاولة مرة أخرى."
            action={
              <Button
                variant="secondary"
                leadingIcon={<Icon icon={RefreshCw} size="sm" />}
              >
                إعادة المحاولة
              </Button>
            }
          />
        </div>
      </Section>
    </div>
  )
}
